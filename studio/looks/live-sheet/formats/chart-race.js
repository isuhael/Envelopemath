// live-sheet · chart-race (P4): the same stake from the same date in 2 (max 3) named rivals, raced as a line chart.
//
// The card is a sheet with a chart embedded in it:
//   formula bar   the stake (or lookOpts.formulaSteps), mid-typing at frame 1, then retyped at each step
//   A B C         column letters (decoration; dropped when the chart would get short). The leader's letter is blue.
//   row 1         the header row: a mint cell holding the live year (the big year counter), then one peach
//                 cell per rival with a line-and-dot swatch in its colour (the legend)
//   row 2         optional ledger row (lookOpts.ledger): the latest yearly return per rival, landing on its rowT
//   chart         the embedded spreadsheet chart: gridlines, axis labels (decoration), a dashed "money in" line,
//                 the lines drawn progressively with a live y rescale, dashed event lines with flag pills
// The value axis is on the right, trading-terminal style: each rival's live value cell rides that axis at its
// tip's height (a dotted price line joins tip and cell) and ticks as the line moves. The leader's cell is yellow
// and carries the blue selection; when the lead changes the selection springs across (lead changes are
// debounced, so a near-tie never flickers). The race ends dead on the spec's final display strings: each cell
// snaps from its running value to its `final` string. The verdict lands in the caption band (or is retyped into
// the formula bar), and the last 0.5 s rewind the race to frame 1 so the short loops.
//
// Frame 1: the question card, the formula bar mid-typing, the start year, every rival named, and one value cell per
// rival already showing the stake (R1).
//
// lookOpts: loop (true) · verdict ('auto' | 'band' | 'formula'; auto = the band with captions, else the formula bar)
//           · letters ('auto' | true | false) · formulaAt0 (0.7) · stakeLine (true: the dashed "money in" line)
//           · formulaSteps ([{ t, text }]: the formula bar over time; default "= <stake>" from 0)
//           · ledger ({ columns, rows: [[label, v1, v2…]], rowT: [..] }: a sheet row under the header showing the
//             latest yearly return per rival; with a ledger the header's first cell is a static label)
//           · leadMargin (0.004: a rival must lead by this share to take the lead) · leadHold (0.45 s)
import {
  h, s, setStyle, setText, attr, clamp, lerp, prog, ease, fmtNum, plain, C, S, G, M,
  formulaBar, fitFormula, lineChart, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn, snapIn, liftOut,
  popScale, flashAlpha, rgba, lerpRect, durationOf, hasCaptions, opt, layer, footerHeight, textW, font, toneColor,
  graphemes,
} from '../lib.js'

export const css = `
.cr-card { position: absolute; background: #FFFFFF; border-radius: 26px 26px 0 0; overflow: hidden; }
.cr-chart.ls-chart.sheet { border-radius: 0 0 26px 26px; }
.cr-chart .ls-axis.y { left: var(--yl); width: auto !important; text-align: left; }
.cr-heads { position: absolute; left: 0; right: 0; border-bottom: 3px solid #D0D5DD; }
.cr-hcell { position: absolute; top: 0; padding: 0 22px; display: flex; flex-direction: column; justify-content: center; border-left: 2px solid #E4E7EC; background: #FFE4C2; }
.cr-hcell.input { background: #D1FADF; border-left: 0; }
.cr-hcell .ls-hl { display: flex; align-items: center; gap: 12px; }
/* style.css pairs white-space: nowrap with text-wrap: balance, and the latter re-enables wrapping in current
   Chromium (both set text-wrap-mode); pin nowrap here so the fit checks below see real overflow */
.cr-hcell .ls-hl, .cr-hcell .ls-hsub { text-wrap-mode: nowrap; }
.cr-sw { flex: none; display: block; }
.cr-year { font: 800 56px/1.05 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.02em; white-space: nowrap; display: inline-block; transform-origin: 0 55%; }
.cr-lrow { position: absolute; left: 0; right: 0; background: #FFFFFF; border-bottom: 2px solid #E4E7EC; }
.cr-lcell { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; padding: 0 22px; border-left: 2px solid #E4E7EC; white-space: nowrap; line-height: 1; letter-spacing: -0.01em; font-family: 'Inter', 'Inter Full', sans-serif; }
.cr-lcell.key { justify-content: flex-start; border-left: 0; font-weight: 800; }
.cr-lcell.val { font-weight: 800; }
.cr-lcell .ls-v { transform-origin: 100% 55%; }
.cr-lcell.key .ls-v { transform-origin: 0 55%; }
.cr-over { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
.cr-wires { position: absolute; left: 0; top: 0; overflow: visible; }
.cr-tip { position: absolute; display: flex; align-items: center; justify-content: flex-end; padding: 0 16px 0 14px; background: #FFFFFF; border: 2px solid #D0D5DD; border-left: 10px solid var(--c); border-radius: 9px; box-sizing: border-box; white-space: nowrap; }
.cr-tipv { display: inline-block; font: 800 46px/1 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.015em; transform-origin: 100% 55%; }
.cr-sel { position: absolute; border: 4px solid #2E90FA; border-radius: 12px; opacity: 0; box-sizing: border-box; }
.cr-sel > i { position: absolute; right: -10px; bottom: -10px; width: 16px; height: 16px; background: #2E90FA; border: 3px solid #FFFFFF; border-radius: 2px; }
.cr-flag { position: absolute; height: 58px; padding: 0 20px; background: #101828; border-radius: 12px; display: flex; align-items: center; opacity: 0; transform-origin: 50% 100%; box-sizing: border-box; }
.cr-flagt { font: 700 40px/1 'Inter', 'Inter Full', sans-serif; color: #FFFFFF; white-space: nowrap; letter-spacing: -0.01em; }
.cr-flagt em { color: #FFD60A; }
.cr-flagt u.mark2 { color: #FF6B5B; }
.cr-flag > b { position: absolute; bottom: -8px; width: 18px; height: 18px; background: #101828; transform: rotate(45deg); border-radius: 2px; }
.cr-money { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #7B8496; white-space: nowrap; text-align: right; }
`

const TIP = { px: 46, ht: 64, gap: 8, padL: 14 + 10, padR: 16 } // padL includes the 10 px colour edge
const LANE_GAP = 18 // plot's right edge → value cells
/** a short line with a dot: the legend swatch for a series colour (w = 42, or 30 when three columns share the row) */
const swatch = (color, dash, w = 42) =>
  s('svg', { class: 'cr-sw', width: w, height: 20, viewBox: `0 0 ${w} 20` },
    s('line', { x1: 4, y1: 10, x2: w - 12, y2: 10, stroke: color, 'stroke-width': 7, 'stroke-linecap': 'round', ...(dash ? { 'stroke-dasharray': dash } : {}) }),
    s('circle', { cx: w - 9, cy: 10, r: 8, fill: color }))

/** compact axis label: 25000 → $25K, 1250000 → $1.25M (decoration only) */
function axisFmt(v, prefix = '$', suffix = '') {
  const a = Math.abs(v)
  for (const [d, u] of [[1e12, 'T'], [1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) {
    if (a >= d) return (v < 0 ? '−' : '') + prefix + String(+(a / d).toFixed(2)) + u + suffix
  }
  return (v < 0 ? '−' : '') + prefix + String(+a.toFixed(2)) + suffix
}

/**
 * 1-D label placement: boxes of height ht that want to be centred on want[i], kept gap apart, tops inside
 * [lo, hi]. Overlapping boxes merge into clusters, and each cluster centres on the mean of its members'
 * wishes (the least total displacement), so a bunched pack of cells straddles its tips instead of hanging off them.
 */
function stack(want, ht, gap, lo, hi) {
  const step = ht + gap
  let cl = want.map((w, i) => ({ ids: [i], sum: w - ht / 2 })).sort((a, b) => a.sum - b.sum)
  const top = c => clamp(c.sum / c.ids.length - ((c.ids.length - 1) * step) / 2, lo, hi - (c.ids.length - 1) * step)
  for (let merged = true; merged;) {
    merged = false
    for (let k = 0; k + 1 < cl.length; k++) {
      const a = cl[k], b = cl[k + 1]
      if (top(a) + a.ids.length * step > top(b) + 0.01) {
        // members keep their order (by wish); top() centres the pack on their mean wish
        cl.splice(k, 2, { ids: [...a.ids, ...b.ids].sort((i, j) => want[i] - want[j] || i - j), sum: a.sum + b.sum })
        merged = true
        break
      }
    }
  }
  const out = new Array(want.length)
  for (const c of cl) { const t0 = top(c); c.ids.forEach((i, n) => { out[i] = t0 + n * step }) }
  return out
}

const signColor = v => (/^\s*[−-]/.test(v) ? C.bad : /^\s*\+/.test(v) ? C.good : C.ink)
const hexRGB = hex => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
/** opaque mix of two hex colours (p = share of a), as rgb(): the linter reads rgb()/rgba() backgrounds only */
const mix = (a, b, p) => { const A = hexRGB(a), B = hexRGB(b); return `rgb(${A.map((v, k) => Math.round(v * p + B[k] * (1 - p))).join(',')})` }

/** frame-1 cut: a word boundary near f, never right after a lone operator or separator ("= $10,000 each ·") */
function cutAt(str, f) {
  let n = wordCut(str, f)
  const g = graphemes(plain(str))
  for (let k = 0; k < 4; k++) {
    const head = g.slice(0, n).join('').trimEnd()
    const last = head.split(/\s+/).pop() || ''
    if (!last || /[\p{L}\p{N}]/u.test(last)) break
    n = graphemes(head.slice(0, head.length - last.length).trimEnd()).length
  }
  return n
}

/**
 * The assumption line's real height at the chrome's width. lib's footerHeight() models 1 or 2 lines; a long
 * footer can wrap to 3, so this measures the same element the chrome will build.
 */
function footerH(parent, text, w = G.railX - G.left) {
  if (!text) return 0
  const el = h('div', { class: 'ls-footer', html: mk(text), style: { left: '0px', top: '0px', width: w + 'px', fontSize: S.footer + 'px', visibility: 'hidden' } })
  parent.append(el)
  if (textW(mk(text), font(600, S.footer)) > w) setStyle(el, { whiteSpace: 'normal' })
  const ht = el.offsetHeight
  el.remove()
  return Math.max(ht, footerHeight(text, w))
}

export default function chartRace(spec, ctx) {
  const d = spec.data || {}
  const series = (d.series || []).filter(sr => sr && Array.isArray(sr.points) && sr.points.length).slice(0, 3)
  const nS = series.length
  const allX = series.flatMap(sr => sr.points.map(p => p[0]))
  const x0 = d.x?.from ?? Math.min(...allX), x1 = d.x?.to ?? Math.max(...allX)
  const yo = { prefix: '$', suffix: '', dp: 0, compact: false, log: false, ...(d.y || {}) }
  const numOpts = { prefix: yo.prefix, suffix: yo.suffix, dp: yo.dp, compact: yo.compact }
  const [r0, r1] = Array.isArray(d.raceT) && d.raceT.length === 2 ? d.raceT : [1, 1 + Math.max(8, (x1 - x0) * 1.6)]
  const events = (d.events || []).filter(ev => ev && ev.x >= x0 && ev.x <= x1).slice().sort((a, b) => a.x - b.x)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const caps = hasCaptions(spec)
  const loopOn = opt(spec, 'loop', true)
  const ledger = opt(spec, 'ledger', null)
  const ledRows = ledger && Array.isArray(ledger.rows) ? ledger.rows : []
  const ledT = ledRows.map((_, i) => (ledger.rowT && ledger.rowT[i] != null ? ledger.rowT[i] : r0 + ((i + 1) / ledRows.length) * (r1 - r0)))
  const finals = series.map(sr => (sr.final != null ? String(sr.final) : fmtNum(sr.points[sr.points.length - 1][1], numOpts)))
  const colors = series.map((sr, i) => sr.color || (sr.tone ? toneColor(sr.tone) : C.series[i % C.series.length]))
  const yearOf = x => Math.floor(x + 1e-9)

  // ---------- time ↔ x ----------
  const xOfT = t => lerp(x0, x1, prog(t, r0, r1 - r0))
  const tOfX = x => r0 + ((x - x0) / (x1 - x0 || 1)) * (r1 - r0)

  // ---------- verdict placement, formula bar strings ----------
  // 'auto': the band when captions run; otherwise the formula bar
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  else if (vMode === 'auto') {
    // a silent race keeps the band free for the chart: the verdict is retyped into the bar if it fits two lines
    const avail = G.width - 102 - 22
    vMode = !caps && textW(mk(plain(verdict.text)), font(700, S.formulaMin, "'JetBrains Mono', monospace")) <= avail * 1.8 ? 'formula' : 'band'
  }
  const bandUsed = caps || vMode === 'band'
  const stake = d.stake ? String(d.stake) : ''
  const defaultFormula = d.formula || (stake ? (/^[=≈]/.test(stake) ? stake : '= ' + stake) : '')
  // the bar is one text flow (it wraps to two lines when it must), so author line breaks become spaces
  const flow = str => String(str).replace(/\s*\n\s*/g, ' ').replace(/≈ /g, '≈\u00a0') // and "≈" stays with its number
  const steps = (opt(spec, 'formulaSteps', null) || [{ t: 0, text: defaultFormula }])
    .filter(x => x && x.text).map(x => ({ t: x.t ?? 0, text: flow(x.text) })).sort((a, b) => a.t - b.t)
  if (!steps.length) steps.push({ t: 0, text: ' ' })
  if (vMode === 'formula') steps.push({ t: verdict.t, text: flow(verdict.text), verdict: true })

  // ---------- timing + duration ----------
  const stepCps = 30
  const D0 = durationOf(spec, {
    beats: [r1 + 0.6, ...steps.slice(1).map(x => x.t + 0.2 + typeDur(x.text, { cps: stepCps }) + 0.3), ...ledT.map(x => x + 0.4)],
    hold: d.hold ?? 4,
  })
  const D = spec.duration || D0
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------- layout ----------
  const L = layer(ctx, 'cr')
  const fH = footerH(L, spec.footer)
  const cardTop = G.cardTop, X = G.left, W = G.width
  const bottom = (bandUsed ? G.workBottom : G.safeBottom - 4) - (fH ? fH + G.gap : 0)
  const fFit = fitFormula(steps.map(x => x.text), W)
  const fbarH = fFit.ht
  const gutter = G.gutter

  // header columns: the year (or the ledger's first label), then one per rival
  const keyLabel = ledger ? String((ledger.columns && ledger.columns[0]) || 'Year') : null
  const keyTexts = ledger ? [keyLabel, ...ledRows.map(r => String(r[0] ?? ''))] : [x0, x1].map(x => String(yearOf(x)))
  const yearPx = nS >= 3 ? 50 : 56
  const keyW = Math.ceil(Math.max(90, ...keyTexts.map(k => textW(mk(k), font(800, ledger ? 44 : yearPx), { letterSpacing: '-0.02em' }))) + 2 * G.padX + 6)
  const serW = Math.floor((W - gutter - keyW) / Math.max(1, nS))
  const colX = [gutter, gutter + keyW]
  for (let i = 1; i < nS; i++) colX.push(gutter + keyW + i * serW)
  colX.push(W)
  const colW = colX.slice(0, -1).map((cx, j) => colX[j + 1] - cx)
  const swW = nS >= 3 ? 30 : 42, swGap = nS >= 3 ? 10 : 12
  // a rival's name: one line with its swatch, or "name · detail" split onto a grey sub-label when it won't fit
  const labelOf = (name, j) => {
    const inner = colW[j + 1] - 2 * G.padX - swW - swGap
    const str = String(name || '')
    if (str.includes('\n') || textW(mk(str), font(800, S.label)) <= inner) return str.split('\n')
    const m = /^(.+?)\s+(?:·|—|–|-|\()\s*(.+?)\)?$/.exec(str)
    return m ? [m[1], m[2]] : [str]
  }
  const labels = series.map((sr, i) => labelOf(sr.name, i))

  // ---------- DOM: the sheet card (the header row is built first, then measured) ----------
  const card = h('div', { class: 'cr-card', style: { left: X + 'px', top: cardTop + 'px', width: W + 'px' } })
  L.append(card)
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines })
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gutter + 'px' } })
  const heads = h('div', { class: 'cr-heads' }, headNum)
  card.append(heads)
  const yearEl = h('span', { class: 'cr-year', style: { fontSize: yearPx + 'px' } })
  const hcells = [h('div', { class: 'cr-hcell input', style: { left: colX[0] + 'px', width: colW[0] + 'px' } },
    ledger ? h('div', { class: 'ls-hl', html: mk(keyLabel) }) : yearEl)]
  heads.append(hcells[0])
  series.forEach((sr, i) => {
    const [name, sub] = labels[i]
    const hl = h('div', { class: 'ls-hl', style: { gap: swGap + 'px' } }, swatch(colors[i], sr.dash, swW), h('span', { html: mk(name) }))
    const sl = sub ? h('div', { class: 'ls-hsub', html: mk(sub), style: { paddingLeft: swW + swGap + 'px' } }) : null
    const el = h('div', { class: 'cr-hcell', style: { left: colX[i + 1] + 'px', width: colW[i + 1] + 'px' } }, hl, sl)
    heads.append(el)
    hcells.push(el)
    // a long name shrinks to the 40 px label floor rather than spill into the next column; a long sub-label
    // drops its indent, then wraps
    const inner = colW[i + 1] - 2 * G.padX
    let px = S.label
    while (px > S.labelMin && hl.scrollWidth > inner + 0.5) { px -= 1; setStyle(hl, { fontSize: px + 'px' }) }
    if (sl && sl.scrollWidth > inner + 0.5) setStyle(sl, { paddingLeft: '0px' })
    if (sl && sl.scrollWidth > inner + 0.5) setStyle(sl, { textWrapMode: 'wrap', textWrapStyle: 'balance' })
  })
  const headH = Math.max(84, Math.ceil(Math.max(...hcells.map(el => el.scrollHeight)) + 20))
  for (const el of [headNum, ...hcells]) setStyle(el, { height: headH + 'px' })

  const ledH = ledger ? 76 : 0
  let lettersH = opt(spec, 'letters', 'auto') === false ? 0 : G.lettersH
  const chartHFor = lh => bottom - cardTop - fbarH - lh - headH - ledH
  if (opt(spec, 'letters', 'auto') === 'auto' && chartHFor(lettersH) < 560) lettersH = 0
  const chartH = chartHFor(lettersH)
  const headTop = fbarH + lettersH
  const ledTop = headTop + headH
  const cardH = ledTop + ledH
  const chartTop = cardTop + cardH
  setStyle(card, { height: cardH + 'px' })
  setStyle(heads, { top: headTop + 'px', height: headH + 'px' })
  let letterEls = []
  if (lettersH) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fbarH + 'px', height: lettersH + 'px' } },
      h('i', { class: 'ls-corner', style: { width: gutter + 'px' } }))
    letterEls = colW.map((w, j) => h('b', { text: 'ABCD'[j], style: { left: colX[j] + 'px', width: w + 'px' } }))
    row.append(...letterEls)
    card.append(row)
  }

  // optional ledger row
  let led = null
  if (ledger) {
    const row = h('div', { class: 'cr-lrow', style: { top: ledTop + 'px', height: ledH + 'px' } },
      h('div', { class: 'ls-rn', 'data-deco': '', text: '2', style: { width: gutter + 'px', height: ledH + 'px' } }))
    const cells = colW.map((w, j) => {
      const v = h('span', { class: 'ls-v' })
      const el = h('div', { class: `cr-lcell ${j ? 'val' : 'key'}`, style: { left: colX[j] + 'px', width: w + 'px', height: ledH + 'px', fontSize: (j ? 46 : 44) + 'px' } }, v)
      row.append(el)
      return { el, v }
    })
    card.append(row)
    led = { row, cells }
  }

  // ---------- the embedded chart ----------
  // the value axis is on the right: its lane is as wide as the widest string a value cell will show
  const tipFont = font(800, TIP.px)
  const candidates = series.flatMap((sr, i) => [finals[i], ...sr.points.map(p => fmtNum(p[1], numOpts))])
  const tipTextW = Math.ceil(Math.max(...candidates.map(c => textW(mk(c), tipFont, { letterSpacing: '-0.015em' }))))
  const tipW = tipTextW + TIP.padL + TIP.padR + 6
  const tagX = G.textRight - tipW // value cells: x tagX … 938 (inside the button rail)
  const plotRight = tagX - LANE_GAP
  const startV = Math.max(...series.map(sr => sr.points[0][1]))
  const pad = { l: 54, r: X + W - plotRight, t: 22, b: 60 }
  // x ticks: the author's step, else whole years (about 5 labels); decimals only for a fractional step
  const xEvery = d.x?.tickEvery || Math.max(1, [1, 2, 5, 10, 20, 25, 50].find(st => (x1 - x0) / st <= 5.5) || 50)
  const xDp = Number.isInteger(xEvery) ? 0 : Math.min(2, (String(xEvery).split('.')[1] || '').length)
  // headroom over the running max: room for the event flags (they sit in the plot's top band), never under 16%
  const flagBand = events.length ? 4 + 58 + 8 + 26 : 0
  const topFrac = Math.min(0.45, Math.max(0.138, flagBand / Math.max(1, chartH - pad.t - pad.b)))
  const chart = lineChart(L, {
    x: X, y: chartTop, w: W, ht: chartH, pad,
    xr: [x0, x1], xEvery, xFmt: v => (xDp ? v.toFixed(xDp) : String(Math.round(v))),
    yFmt: v => axisFmt(v, yo.prefix, yo.suffix), log: !!yo.log, yTicks: 4,
    series: series.map((sr, i) => ({ points: sr.points, color: colors[i], width: 8, area: false, dash: sr.dash })),
    events: events.map(ev => ({ x: ev.x })),
  })
  chart.el.classList.add('cr-chart')
  setStyle(chart.el, { '--yl': (tagX - X + TIP.padL - 8) + 'px' })
  const plot = chart.plot
  const valueAt = (i, x) => chart.valueAt(i, x)
  const yLabEls = [...chart.el.querySelectorAll('.ls-axis.y')] // value-axis labels: hidden where a value cell sits

  // the "money in" line at the stake (when every rival starts from the same amount)
  const sameStart = series.every(sr => Math.abs(sr.points[0][1] - series[0].points[0][1]) < 1e-9)
  const stakeLine = sameStart && opt(spec, 'stakeLine', true)
    ? s('line', { stroke: '#98A2B3', 'stroke-width': 3, 'stroke-dasharray': '3 11', 'stroke-linecap': 'round' })
    : null
  if (stakeLine) chart.svg.insertBefore(stakeLine, chart.svg.children[1])
  const moneyLbl = stakeLine ? h('div', { class: 'cr-money', 'data-deco': '', text: 'money in' }) : null
  if (moneyLbl) chart.el.append(moneyLbl)

  // ---------- overlay: price lines, value cells, selection, event flags ----------
  const over = h('div', { class: 'cr-over' })
  L.append(over)
  const wires = s('svg', { class: 'cr-wires', width: 1080, height: 1920, viewBox: '0 0 1080 1920' })
  over.append(wires)
  const wireEls = series.map((sr, i) => {
    const p = s('path', { fill: 'none', stroke: colors[i], 'stroke-width': 3, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.75 })
    wires.append(p)
    return p
  })
  const tips = series.map((sr, i) => {
    const v = h('span', { class: 'cr-tipv' })
    const el = h('div', { class: 'cr-tip', style: { left: tagX + 'px', width: tipW + 'px', height: TIP.ht + 'px' } }, v)
    setStyle(el, { '--c': colors[i] })
    over.append(el)
    return { el, v }
  })
  const sel = h('div', { class: 'cr-sel' }, h('i'))
  over.append(sel)
  const flags = events.map(ev => {
    const txt = h('span', { class: 'cr-flagt', html: mk(ev.label || '') })
    const notch = h('b')
    const el = h('div', { class: 'cr-flag' }, notch, txt)
    over.append(el)
    const w = Math.ceil(textW(mk(ev.label || ''), font(700, 40), { letterSpacing: '-0.01em' }) + 42)
    const cx = chart.X(ev.x)
    const top = Math.round(plot.y + 4)
    // flags live in the plot's headroom and never enter the value lane
    const left = Math.round(clamp(cx - w / 2, X + 14, plotRight - 4 - w))
    setStyle(el, { left: left + 'px', top: top + 'px', width: w + 'px' })
    setStyle(notch, { left: Math.round(clamp(cx - left - 9, 12, w - 30)) + 'px' })
    return { el, t: tOfX(ev.x) }
  })
  // each flag shows until the next one arrives (or 3.6 s); its dashed line stays
  const flagWin = flags.map((f, k) => ({ t0: f.t, t1: Math.min(f.t + 3.6, flags[k + 1] ? flags[k + 1].t - 0.02 : Infinity, loopT0) }))

  // ---------- y scale: a running max, so the axis grows as the leader climbs ----------
  const runMax = x => {
    let m = -Infinity
    series.forEach((sr, i) => {
      for (const p of sr.points) if (p[0] <= x) m = Math.max(m, p[1])
      m = Math.max(m, valueAt(i, x))
    })
    return m
  }
  const logMin = yo.log ? Math.min(...series.flatMap(sr => sr.points.map(p => p[1]))) * 0.8 : 0 // lineChart's log floor
  const yMaxAt = x => {
    const m = runMax(x)
    // linear: the max sits topFrac below the top; log: solve ln k / (ln R + ln k) = topFrac for the factor k
    const k = yo.log ? Math.max(1.5, Math.pow(Math.max(1.0001, m / logMin), topFrac / (1 - topFrac))) : 1 / (1 - topFrac)
    return Math.max(startV * (yo.log ? 2 : 1.6), m * k)
  }

  // ---------- the leader (debounced) ----------
  const margin = opt(spec, 'leadMargin', 0.004), holdT = opt(spec, 'leadHold', 0.45)
  const leads = [] // { t, i }
  if (nS >= 2) {
    let cur = -1, cand = -1, candT = 0
    const dt = 1 / 60
    for (let t = r0; t <= r1 + 1e-9; t += dt) {
      const vs = series.map((_, i) => valueAt(i, xOfT(t)))
      let bi = 0
      vs.forEach((v, i) => { if (v > vs[bi]) bi = i })
      const second = Math.max(...vs.filter((_, i) => i !== bi))
      const raw = vs[bi] - second > Math.abs(vs[bi]) * margin ? bi : -1
      if (raw === -1 || raw === cur) { cand = -1; continue }
      if (raw !== cand) { cand = raw; candT = t }
      if (t - candT >= holdT) { leads.push({ t: candT, i: cand }); cur = cand; cand = -1 }
    }
    if (cand !== -1) { leads.push({ t: candT, i: cand }); cur = cand }
    // the race always ends on the true winner (a photo finish inside the debounce still counts)
    const fin = series.map((_, i) => valueAt(i, x1))
    let win = 0
    fin.forEach((v, i) => { if (v > fin[win]) win = i })
    if (cur !== win && fin[win] > Math.max(...fin.filter((_, i) => i !== win))) leads.push({ t: r1, i: win })
  }
  const leaderAt = t => { let k = -1; for (let j = 0; j < leads.length; j++) if (leads[j].t <= t) k = j; return k }

  // ---------- formula bar ----------
  const cut = steps[0].t <= 0 ? cutAt(steps[0].text, opt(spec, 'formulaAt0', 0.7)) : 0
  function formulaState(t) {
    const first = steps[0]
    if (t >= loopT0) {
      // erase whatever is showing, then put back the frame-1 prefix
      let k = 0
      for (let j = 1; j < steps.length; j++) if (steps[j].t <= loopT0) k = j
      const showing = steps[k].text
      const len = k === 0 ? Math.max(cut, typedCount(loopT0, first.t, first.text, { from: cut })) : mkLen(showing)
      const e1 = 0.22
      if (t < loopT0 + e1) {
        const n = Math.round(len * (1 - prog(t, loopT0, e1)))
        return { html: typedMk(showing, k === 0 ? Math.max(cut, n) : n), caret: true }
      }
      if (k === 0) return { html: typedMk(first.text, cut), caret: true }
      return { html: typedMk(first.text, Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true }
    }
    let k = 0
    for (let j = 1; j < steps.length; j++) if (t >= steps[j].t) k = j
    if (k === 0) {
      const n = typedCount(t, Math.max(0, first.t), first.text, { from: cut })
      return { html: typedMk(first.text, n), caret: caretOn(t, t >= first.t && n < mkLen(first.text)) }
    }
    const st = steps[k], prev = steps[k - 1]
    const eraseDur = 0.2
    if (t < st.t + eraseDur) {
      const plen = mkLen(prev.text)
      return { html: typedMk(prev.text, Math.round(plen * (1 - prog(t, st.t, eraseDur)))), caret: true, verdict: !!prev.verdict }
    }
    const n = typedCount(t, st.t + eraseDur, st.text, { cps: stepCps })
    return { html: typedMk(st.text, n), caret: caretOn(t, n < mkLen(st.text)), verdict: !!st.verdict }
  }

  // ---------- sound ----------
  ctx.cue(0, 'type', { dur: Math.max(0.2, typeDur(steps[0].text, { from: cut })) })
  steps.slice(1).forEach(st => { if (st.t < loopT0) ctx.cue(st.t + 0.2, 'type', { dur: Math.max(0.15, typeDur(st.text, { cps: stepCps })) }) })
  if (vMode === 'formula') ctx.cue(verdict.t + 0.2 + typeDur(verdict.text, { cps: stepCps }) + 0.05, 'ding')
  ctx.cue(r0, 'whoosh', { dur: 0.5, gain: 0.35 })
  if (!ledger) {
    let lastTick = -Infinity
    for (let y = yearOf(x0) + 1; y <= x1 + 1e-9; y++) {
      const t = tOfX(y)
      if (t - lastTick >= 0.8) { ctx.cue(t, 'tick', { gain: 0.3 }); lastTick = t }
    }
  } else ledT.forEach(t => ctx.cue(t, 'tick', { gain: 0.6 }))
  flags.forEach(f => ctx.cue(f.t, 'thud', { gain: 0.7 }))
  leads.forEach((ld, k) => { if (k > 0) { ctx.cue(ld.t, 'pop', { gain: 0.8 }); ctx.cue(ld.t + 0.02, 'swipe', { gain: 0.35 }) } })
  ctx.cue(r1 + 0.02, 'pop', { gain: 0.9 })
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const tipLo = plot.y - 6, tipHi = plot.y + plot.h - TIP.ht + 8
  const yr0 = yearOf(x0), yr1 = yearOf(x1)
  return {
    duration: D0,
    chrome: {
      footer: { top: chartTop + chartH + G.gap },
      captions: caps,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      const looping = t >= loopT0
      const xNow = looping ? lerp(x1, x0, ease.inOut(prog(t, loopT0 + 0.02, 0.4))) : xOfT(t)

      // formula bar (the verdict takes it over in ink, heavier, as the ≈ chip pops)
      const fs = formulaState(t)
      fbar.set(fs.html, { caret: fs.caret })
      setStyle(fbar.txt, fs.verdict ? { color: C.ink, fontWeight: '800' } : { color: C.fbarText, fontWeight: '700' })
      const chipP = vMode === 'formula' && !looping ? prog(t, verdict.t + 0.1, 0.34) : 0
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // the year counter: it lands a touch large on each new year
      if (!ledger) {
        const yr = clamp(yearOf(xNow), yr0, yr1)
        setText(yearEl, String(yr))
        const since = (xNow - yr) * ((r1 - r0) / (x1 - x0 || 1))
        const k = !looping && t > r0 && yr > yr0 && since < 0.22 ? 1 + 0.08 * (1 - ease.out(since / 0.22)) : 1
        setStyle(yearEl, { transform: k > 1.0005 ? `scale(${k.toFixed(4)})` : 'none' })
      }

      // ledger row: the latest landed row (frame 1: the first row's label, values empty)
      if (led) {
        let k = -1
        if (!looping || t < loopT0 + 0.2) for (let j = 0; j < ledRows.length; j++) if (ledT[j] <= t) k = j
        const out = looping ? prog(t, loopT0, 0.2) : 0
        const row = ledRows[Math.max(0, k)] || []
        setText(led.cells[0].v, String(row[0] ?? ''))
        setStyle(led.cells[0].v, snapIn(k <= 0 ? 1 : prog(t, ledT[k], M.drop)))
        setStyle(led.cells[0].el, { color: k < 0 ? C.mute : C.ink })
        for (let j = 1; j < led.cells.length; j++) {
          const c = led.cells[j]
          if (k < 0) { setText(c.v, ''); setStyle(c.v, { opacity: '0', transform: 'none' }); setStyle(c.el, { backgroundColor: 'transparent' }); continue }
          const t0 = ledT[k] + 0.08 * (j - 1)
          const val = String(row[j] ?? '')
          setText(c.v, val)
          let st = snapIn(prog(t, t0, M.drop))
          const lo = liftOut(out)
          if (lo) st = { opacity: String(Math.min(+st.opacity, +lo.opacity)), transform: lo.transform }
          setStyle(c.v, { ...st, color: signColor(val) })
          const fl = looping ? 0 : flashAlpha(t, t0 + 0.06)
          setStyle(c.el, { backgroundColor: fl > 0.001 ? rgba(C.rowHi, fl) : 'transparent' })
        }
      }

      // chart
      const tipPts = chart.draw(xNow, { yMax: yMaxAt(xNow) })
      if (stakeLine) {
        const yy = chart.Y(startV) - chart.box.y
        attr(stakeLine, 'x1', (plot.x - chart.box.x).toFixed(1)); attr(stakeLine, 'x2', (plot.x + plot.w - chart.box.x).toFixed(1))
        attr(stakeLine, 'y1', yy.toFixed(1)); attr(stakeLine, 'y2', yy.toFixed(1))
        // it names the line around frame 1, then gets out of the race's way (and is back for the loop)
        const mo = looping ? prog(t, loopT0 + 0.2, 0.25) : 1 - prog(t, r0 + 2.4, 0.4)
        setStyle(moneyLbl, { left: (plot.x - chart.box.x + 24) + 'px', top: Math.round(yy + 12) + 'px', opacity: String(mo) })
      }

      // the leader, and the finals once the race is over
      const lk = looping ? -1 : leaderAt(t)
      const leader = lk >= 0 ? leads[lk].i : -1
      const prevLeader = lk >= 1 ? leads[lk - 1].i : -1
      const swapP = lk >= 0 ? ease.out(prog(t, leads[lk].t, 0.2)) : 1
      const fadeOut = looping ? prog(t, loopT0, 0.2) : 0
      const fin = t >= r1 && !looping

      // value cells ride the value axis at their tips' height
      const tops = stack(tipPts.map(p => p.y), TIP.ht, TIP.gap, tipLo, tipHi)
      const rects = tops.map(y => { const y0 = Math.round(y); return { x0: tagX, y0, x1: tagX + tipW, y1: y0 + TIP.ht } })
      tipPts.forEach((p, i) => {
        const tp = tips[i], r = rects[i]
        setStyle(tp.el, { top: r.y0 + 'px' })
        setText(tp.v, fin ? finals[i] : fmtNum(p.v, numOpts))
        setStyle(tp.v, snapIn(fin ? prog(t, r1, M.drop) : 1))
        // yellow for the leader (cross-faded on a change); a pale flash as a final lands
        let a = i === leader ? swapP : i === prevLeader ? 1 - swapP : 0
        a *= 1 - fadeOut
        const flash = fin && i !== leader ? flashAlpha(t, r1 + 0.04, 0.5) : 0
        const under = flash > 0.001 ? mix(C.rowHi, C.sheet, flash) : C.sheet
        const bg = a >= 0.999 ? C.accent : a > 0.001 ? mix(C.accent, flash > 0.001 ? C.rowHi : C.sheet, a) : under
        setStyle(tp.el, { backgroundColor: bg, zIndex: String(i === leader ? 3 : 2) })
        // the dotted price line from the tip to its cell (with an elbow when the cell had to move)
        const cy = r.y0 + TIP.ht / 2, xa = p.x + 16, xb = tagX - 2
        if (xb - xa < 4 && Math.abs(cy - p.y) < 3) { attr(wireEls[i], 'd', ''); return }
        const xm = Math.max(xa, xb - 12)
        attr(wireEls[i], 'd', Math.abs(cy - p.y) < 3
          ? `M${xa.toFixed(1)} ${p.y.toFixed(1)} L${xb} ${p.y.toFixed(1)}`
          : `M${xa.toFixed(1)} ${p.y.toFixed(1)} L${xm.toFixed(1)} ${p.y.toFixed(1)} L${xb} ${cy.toFixed(1)}`)
      })

      // value-axis labels never peek out from behind a value cell or the selection
      for (const el of yLabEls) {
        if (el.style.opacity === '0') continue
        const yc = parseFloat(el.style.top) + chart.box.y
        if (rects.some(r => yc + 18 > r.y0 - 10 && yc - 18 < r.y1 + 10)) setStyle(el, { opacity: '0' })
      }

      // selection: around every value cell until a leader emerges, then on the leader (springs across on a change)
      const group = { x0: tagX, y0: Math.min(...rects.map(r => r.y0)), x1: tagX + tipW, y1: Math.max(...rects.map(r => r.y1)) }
      let selR
      if (looping) selR = lerpRect(leads.length ? rects[leads[leads.length - 1].i] : group, group, ease.inOut(prog(t, loopT0, 0.34)))
      else if (leader < 0) selR = group
      else selR = lerpRect(prevLeader >= 0 ? rects[prevLeader] : group, rects[leader], ease.back(prog(t, leads[lk].t, M.pick), 1.6))
      const o = 6
      setStyle(sel, {
        opacity: '1', left: (selR.x0 - o).toFixed(1) + 'px', top: (selR.y0 - o).toFixed(1) + 'px',
        width: (selR.x1 - selR.x0 + 2 * o).toFixed(1) + 'px', height: (selR.y1 - selR.y0 + 2 * o).toFixed(1) + 'px',
      })
      // the selected column's letter turns blue (the year until a leader emerges)
      letterEls.forEach((el, j) => {
        const on = j === 0 ? leader < 0 : j - 1 === leader
        setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText })
      })

      // event flags (an event's dashed line is darker while its flag shows)
      flags.forEach((f, k) => {
        const w = flagWin[k]
        attr(chart.events[k].el, 'stroke', !looping && t >= w.t0 && t < w.t1 ? '#98A2B3' : '#D5DAE1')
        if (looping || t < w.t0 || t >= w.t1) { setStyle(f.el, { opacity: '0', transform: 'none' }); return }
        const st = snapIn(prog(t, w.t0, 0.22), 1.12)
        const fade = 1 - prog(t, w.t1 - 0.25, 0.25)
        setStyle(f.el, { opacity: String(Math.min(+st.opacity, fade)), transform: st.transform })
      })
    },
  }
}
