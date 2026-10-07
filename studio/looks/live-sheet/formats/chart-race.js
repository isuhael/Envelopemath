// live-sheet · chart-race (P4): the same stake from the same date in 2 (max 3) named rivals, raced as a line chart.
//
// The card is a sheet with a chart embedded in it:
//   formula bar   the stake (or lookOpts.formulaSteps), mid-typing at frame 1, then retyped at each step
//   A B C         column letters (decoration; dropped when the chart would get short). The leader's letter is blue.
//   row 1         the header row: a mint cell holding the live year (the big year counter), then one peach
//                 cell per rival with a line-and-dot swatch in its colour (the legend)
//   row 2         optional ledger row (lookOpts.ledger): the latest yearly return per rival, landing on its rowT
//   chart         the embedded spreadsheet chart: gridlines, axis labels (decoration), a dashed "money in" line,
//                 the lines drawn progressively with a live y rescale, and dashed event lines whose flag pills
//                 sit on the x axis (notch up), so they never need headroom over the lines
// The value axis is on the right, trading-terminal style: each rival's live value cell rides that axis at its
// tip's height (a dotted price line joins tip and cell) and ticks as the line moves. The cells keep the rivals'
// ranking, debounced (a near-tie never flickers) and stamped at the real crossing: when two lines cross for good,
// their cells slide past each other, and if the lead changed the yellow cross-fades and the blue selection
// springs across in the same beat. The race ends dead on the spec's final display strings: each cell snaps from
// its running value to its `final` string. The verdict lands in the caption band (or is retyped into the
// formula bar), and the last 0.5 s rewind the race to frame 1 so the short loops.
// The formula bar types one string per step; a string too long for one line breaks at its best seam (an author
// line break, " · ", " vs ", " = ", else the most balanced space) rather than wherever the text overflows.
//
// Frame 1: the question card, the formula bar mid-typing, the start year, every rival named, and one value cell per
// rival already showing the stake (R1).
//
// lookOpts: loop (true) · verdict ('auto' | 'band' | 'formula'; auto = the band with captions, else the formula bar)
//           · letters ('auto' | true | false) · formulaAt0 (0.7) · stakeLine (true: the dashed "money in" line)
//           · formulaSteps ([{ t, text }]: the formula bar over time; default "= <stake>" from 0)
//           · ledger ({ columns, rows: [[label, v1, v2…]], rowT: [..] }: a sheet row under the header showing the
//             latest yearly return per rival; with a ledger the header's first cell is a static label)
//           · leadMargin (0.004: the first leader must lead by this share) · leadHold (0.45 s: a new ranking
//             must hold this long to count; it is then dated back to the crossing)
import {
  h, s, setStyle, setText, attr, clamp, lerp, prog, ease, fmtNum, plain, C, F, S, G, M,
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
.cr-flag { position: absolute; height: 58px; padding: 0 20px; background: #101828; border-radius: 12px; display: flex; align-items: center; opacity: 0; transform-origin: 50% 0; box-sizing: border-box; }
.cr-flagt { font: 700 40px/1 'Inter', 'Inter Full', sans-serif; color: #FFFFFF; white-space: nowrap; letter-spacing: -0.01em; }
.cr-flagt em { color: #FFD60A; }
.cr-flagt u.mark2 { color: #FF6B5B; }
.cr-flag > b { position: absolute; top: -8px; width: 18px; height: 18px; background: #101828; transform: rotate(45deg); border-radius: 2px; }
.cr-money { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #7B8496; white-space: nowrap; text-align: right; }
`

const TIP = { px: 46, ht: 64, gap: 8, padL: 14 + 10, padR: 16 } // padL includes the 10 px colour edge
const LANE_GAP = 18 // plot's right edge → value cells
const FLAG = { ht: 58, top: 0 } // event flag pill: height, and offset under the x axis (flush: its text centres on the year labels)
const SWAP = 0.3 // value cells slide past each other over this long when the ranking changes
const NUDGE = 18 // px the rising cell steps left as it passes
/** set or remove a boolean attribute (cached, like the runtime's setters) */
const mark = (el, name, on) => { const c = el.__mk || (el.__mk = {}); if (c[name] !== on) { c[name] = on; if (on) el.setAttribute(name, ''); else el.removeAttribute(name) } }
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
 * 1-D label placement in a fixed order: boxes of height ht, stacked top to bottom in `order` (series indices,
 * highest value first), at least gap apart, each as close as it can get to being centred on want[i] (least
 * squares: pool-adjacent-violators on wish − k·step), tops inside [lo, hi]. A bunched pack of cells straddles
 * its tips instead of hanging off them, and a pack whose order disagrees with its wishes (a crossing not yet
 * adopted) simply centres on their mean. Returns each series' box top.
 */
function stackOrd(want, order, ht, gap, lo, hi) {
  const step = ht + gap, n = order.length
  const blocks = []
  order.forEach((i, k) => {
    blocks.push({ sum: want[i] - ht / 2 - k * step, cnt: 1 })
    while (blocks.length > 1) {
      const b = blocks[blocks.length - 1], a = blocks[blocks.length - 2]
      if (a.sum / a.cnt <= b.sum / b.cnt) break
      a.sum += b.sum; a.cnt += b.cnt; blocks.pop()
    }
  })
  const tops = []
  for (const b of blocks) for (let c = 0; c < b.cnt; c++) tops.push(b.sum / b.cnt + tops.length * step)
  // keep the pack inside [lo, hi] (both passes preserve the spacing)
  for (let k = 0; k < n; k++) tops[k] = Math.max(tops[k], lo + k * step)
  for (let k = n - 1; k >= 0; k--) tops[k] = Math.min(tops[k], hi - (n - 1 - k) * step)
  const out = new Array(want.length)
  order.forEach((i, k) => { out[i] = tops[k] })
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
 * Break a formula-bar string onto two lines at its best seam. Seam kinds in order of preference: the author's
 * line break, " · " (dropped), " vs ", " = ", " → " (each starts line 2), ", " (ends line 1), then any space.
 * Among the seams of the first kind where both lines fit `avail`, the most balanced wins. A seam never splits
 * **x** / __x__ markup and never leaves "≈" without its number. Returns "line 1\nline 2", or null.
 */
function twoLines(raw, wOf, avail) {
  const nb = str => str.replace(/≈ /g, '≈ ').trim()
  const balanced = str => (str.split('**').length - 1) % 2 === 0 && (str.split('__').length - 1) % 2 === 0
  const str = String(raw)
  const kinds = []
  const nl = str.indexOf('\n')
  if (nl > 0) kinds.push([[str.slice(0, nl), str.slice(nl + 1).replace(/\s*\n\s*/g, ' ')]])
  const flat = nb(str.replace(/\s*\n\s*/g, ' '))
  for (const [sep, keep] of [[' · ', ''], [' vs ', 'b'], [' = ', 'b'], [' → ', 'b'], [', ', 'a'], [' ', '']]) {
    const opts = []
    for (let i = flat.indexOf(sep); i > 0; i = flat.indexOf(sep, i + 1)) {
      opts.push([flat.slice(0, i) + (keep === 'a' ? sep.trim() : ''), (keep === 'b' ? sep.trim() + ' ' : '') + flat.slice(i + sep.length)])
    }
    if (opts.length) kinds.push(opts)
  }
  for (const opts of kinds) {
    let best = null, bw = Infinity
    for (const [a0, b0] of opts) {
      const a = nb(a0), b = nb(b0)
      if (!a || !b || !balanced(a) || /≈$/.test(a)) continue
      const w = Math.max(wOf(a), wOf(b))
      if (w <= avail && w < bw) { best = a + '\n' + b; bw = w }
    }
    if (best) return best
  }
  return null
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
  // each step is measured as one line (author line breaks become spaces, "≈" stays with its number)
  const flow = str => String(str).replace(/\s*\n\s*/g, ' ').replace(/≈ /g, '≈\u00a0')
  const steps = (opt(spec, 'formulaSteps', null) || [{ t: 0, text: defaultFormula }])
    .filter(x => x && x.text).map(x => ({ t: x.t ?? 0, raw: String(x.text), text: flow(x.text) })).sort((a, b) => a.t - b.t)
  if (!steps.length) steps.push({ t: 0, raw: ' ', text: ' ' })
  if (vMode === 'formula') steps.push({ t: verdict.t, raw: String(verdict.text), text: flow(verdict.text), verdict: true })

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
  // a two-line bar: every string that overflows one line breaks at its best seam, not mid-formula
  if (fFit.lines > 1) {
    const avail = W - 102 - 22 - 8
    const wOf = str => textW(mk(str), font(700, fFit.px, F.mono))
    for (const st of steps) if (wOf(st.text) > avail) st.text = twoLines(st.raw, wOf, avail) || st.text
  }

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
  const fline = fbar.txt.parentElement
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
  // the x-axis band holds the year labels, and the event flags when there are events (FLAG.ht + margins)
  const pad = { l: 54, r: X + W - plotRight, t: 22, b: events.length ? FLAG.top + FLAG.ht + 12 : 60 }
  // x ticks: the author's step, else whole years (about 5 labels); decimals only for a fractional step
  const xEvery = d.x?.tickEvery || Math.max(1, [1, 2, 5, 10, 20, 25, 50].find(st => (x1 - x0) / st <= 5.5) || 50)
  const xDp = Number.isInteger(xEvery) ? 0 : Math.min(2, (String(xEvery).split('.')[1] || '').length)
  // headroom over the running max (the flags live on the x axis, so the lines get the rest of the plot)
  const topFrac = 0.138
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
  // year labels on the x axis (decoration): a flag covers the ones under it while it shows
  const xLabs = [...chart.el.querySelectorAll('.ls-axis.x')].map(el => ({
    el, cx: chart.box.x + parseFloat(el.style.left), w: textW(el.textContent, font(600, 32)),
  }))
  const flags = events.map(ev => {
    const txt = h('span', { class: 'cr-flagt', html: mk(ev.label || '') })
    const notch = h('b')
    const el = h('div', { class: 'cr-flag' }, notch, txt)
    over.append(el)
    const w = Math.ceil(textW(mk(ev.label || ''), font(700, 40), { letterSpacing: '-0.01em' }) + 42)
    const cx = chart.X(ev.x)
    // the flag sits on the x axis under its dashed line, notch up; it stays clear of the card's rounded
    // corner and never enters the value lane
    const top = Math.round(plot.y + plot.h + FLAG.top)
    const left = Math.round(clamp(cx - w / 2, X + 24, plotRight - 4 - w))
    const nx = Math.round(clamp(cx - left - 9, 12, w - 30))
    setStyle(el, { left: left + 'px', top: top + 'px', width: w + 'px', transformOrigin: `${nx + 9}px 0px` })
    setStyle(notch, { left: nx + 'px' })
    const hides = xLabs.filter(lb => lb.cx + lb.w / 2 > left - 10 && lb.cx - lb.w / 2 < left + w + 10)
    return { el, t: tOfX(ev.x), hides }
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

  // ---------- the ranking (debounced) and the leader ----------
  // The value cells stack in rank order. A new order counts once it has held for leadHold s and is then dated
  // back to the moment it began (the crossing), so the cells slide, the yellow moves and the selection springs
  // as the lines cross, while a near-tie that undoes itself never flickers. There is no leader until one rival
  // leads by leadMargin (frame 1: every rival at the stake, the selection wraps them all).
  const margin = opt(spec, 'leadMargin', 0.004), holdT = opt(spec, 'leadHold', 0.45)
  const same = (a, b) => a.every((v, k) => v === b[k])
  const rankAt = (x, prev) => {
    const vs = series.map((_, i) => valueAt(i, x))
    return prev.slice().sort((a, b) => vs[b] - vs[a] || prev.indexOf(a) - prev.indexOf(b))
  }
  // { t, order: series indices, highest first }. Frame 1 already uses the order the race opens with (at the
  // stake every order is true), so the cells don't shuffle as the lines leave the start.
  const orders = [{ t: -Infinity, order: rankAt(x0 + (x1 - x0) * 1e-6, series.map((_, i) => i)) }]
  let emergeT = Infinity
  if (nS >= 2) {
    let cur = orders[0].order, cand = null, candT = 0, eCand = -1
    const N = Math.max(1, Math.ceil((r1 - r0) * 60))
    for (let k = 0; k <= N; k++) {
      const t = r0 + (k / N) * (r1 - r0), x = xOfT(t)
      if (emergeT === Infinity) {
        const vs = series.map((_, i) => valueAt(i, x)).sort((a, b) => b - a)
        if (vs[0] - vs[1] > Math.abs(vs[0]) * margin) { if (eCand < 0) eCand = t; if (t - eCand >= holdT) emergeT = eCand } else eCand = -1
      }
      const raw = rankAt(x, cur)
      if (same(raw, cur)) { cand = null; continue }
      if (!cand || !same(raw, cand)) { cand = raw; candT = t }
      if (t - candT >= holdT) { orders.push({ t: candT, order: cand }); cur = cand; cand = null }
    }
    if (emergeT === Infinity && eCand >= 0) emergeT = eCand
    // the race always ends in the true final order (a photo finish inside the debounce still counts)
    const end = rankAt(x1, cur)
    if (!same(end, cur)) orders.push({ t: cand && same(cand, end) ? candT : r1, order: end })
  }
  const orderIdx = t => { let k = 0; for (let j = 1; j < orders.length; j++) if (orders[j].t <= t) k = j; return k }
  // lead events: the first leader, then every order change that puts a new rival on top
  const leads = [] // { t, i, prev }
  if (emergeT < Infinity) {
    leads.push({ t: emergeT, i: orders[orderIdx(emergeT)].order[0], prev: -1 })
    for (let k = 1; k < orders.length; k++) {
      if (orders[k].t <= emergeT) continue
      const a = orders[k - 1].order[0], b = orders[k].order[0]
      if (a !== b) leads.push({ t: orders[k].t, i: b, prev: a })
    }
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
        return { html: typedMk(showing, k === 0 ? Math.max(cut, n) : n), caret: true, src: showing }
      }
      if (k === 0) return { html: typedMk(first.text, cut), caret: true, src: first.text }
      return { html: typedMk(first.text, Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true, src: first.text }
    }
    let k = 0
    for (let j = 1; j < steps.length; j++) if (t >= steps[j].t) k = j
    if (k === 0) {
      const n = typedCount(t, Math.max(0, first.t), first.text, { from: cut })
      return { html: typedMk(first.text, n), caret: caretOn(t, t >= first.t && n < mkLen(first.text)), src: first.text }
    }
    const st = steps[k], prev = steps[k - 1]
    const eraseDur = 0.2
    if (t < st.t + eraseDur) {
      const plen = mkLen(prev.text)
      return { html: typedMk(prev.text, Math.round(plen * (1 - prog(t, st.t, eraseDur)))), caret: true, verdict: !!prev.verdict, src: prev.text }
    }
    const n = typedCount(t, st.t + eraseDur, st.text, { cps: stepCps })
    return { html: typedMk(st.text, n), caret: caretOn(t, n < mkLen(st.text)), verdict: !!st.verdict, src: st.text }
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
      // a two-line string keeps both lines' height from its first keystroke (no jump when it reaches line 2)
      setStyle(fline, { minHeight: fs.src.includes('\n') ? '2.4em' : '0px' })
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
      const prevLeader = lk >= 0 ? leads[lk].prev : -1
      const swapP = lk >= 0 ? ease.out(prog(t, leads[lk].t, 0.2)) : 1
      const fadeOut = looping ? prog(t, loopT0, 0.2) : 0
      const fin = t >= r1 && !looping

      // value cells ride the value axis at their tips' height, stacked in rank order; when the order changes
      // they slide past each other (and the rewind slides them back to frame 1's order)
      const wants = tipPts.map(p => p.y)
      const packed = order => stackOrd(wants, order, TIP.ht, TIP.gap, tipLo, tipHi)
      let tops, sliding = false
      const nudge = series.map(() => 0) // a rising cell passes in front, nudged left
      if (looping) {
        const a = packed(orders[orders.length - 1].order), b = packed(orders[0].order)
        const p = ease.inOut(prog(t, loopT0 + 0.02, 0.4))
        tops = a.map((v, i) => lerp(v, b[i], p))
        sliding = p < 1
      } else {
        const k = orderIdx(t)
        tops = packed(orders[k].order)
        if (k >= 1 && t < orders[k].t + SWAP) {
          const a = packed(orders[k - 1].order), p = ease.inOut(prog(t, orders[k].t, SWAP))
          tops = a.map((v, i) => lerp(v, tops[i], p))
          sliding = true
          series.forEach((_, i) => {
            if (orders[k - 1].order.indexOf(i) > orders[k].order.indexOf(i)) nudge[i] = -Math.round(NUDGE * Math.sin(Math.PI * p))
          })
        }
      }
      const rects = tops.map((y, i) => { const y0 = Math.round(y), x0 = tagX + nudge[i]; return { x0, y0, x1: x0 + tipW, y1: y0 + TIP.ht } })
      tipPts.forEach((p, i) => {
        const tp = tips[i], r = rects[i]
        setStyle(tp.el, { top: r.y0 + 'px', left: r.x0 + 'px' })
        // cells passing each other overlap on purpose, for SWAP s
        mark(tp.el, 'data-overlap-ok', sliding)
        setText(tp.v, fin ? finals[i] : fmtNum(p.v, numOpts))
        setStyle(tp.v, snapIn(fin ? prog(t, r1, M.drop) : 1))
        // yellow for the leader (cross-faded on a change); a pale flash as a final lands
        let a = i === leader ? swapP : i === prevLeader ? 1 - swapP : 0
        a *= 1 - fadeOut
        const flash = fin && i !== leader ? flashAlpha(t, r1 + 0.04, 0.5) : 0
        const under = flash > 0.001 ? mix(C.rowHi, C.sheet, flash) : C.sheet
        const bg = a >= 0.999 ? C.accent : a > 0.001 ? mix(C.accent, flash > 0.001 ? C.rowHi : C.sheet, a) : under
        setStyle(tp.el, { backgroundColor: bg, zIndex: String(i === leader ? 4 : nudge[i] ? 3 : 2) })
        // the dotted price line from the tip to its cell (with an elbow when the cell had to move)
        const cy = r.y0 + TIP.ht / 2, xa = p.x + 16, xb = r.x0 - 2
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
      if (looping) selR = lerpRect(leads.length ? rects[orders[orders.length - 1].order[0]] : group, group, ease.inOut(prog(t, loopT0, 0.34)))
      else if (leader < 0) selR = group
      else selR = lerpRect(prevLeader >= 0 ? rects[prevLeader] : group, rects[leader], ease.back(prog(t, leads[lk].t, M.pick), 1.6))
      const o = 6
      // whole pixels: crisp borders, and rounded corners rasterise the same however the frame was reached
      const sx0 = Math.round(selR.x0 - o), sy0 = Math.round(selR.y0 - o)
      setStyle(sel, {
        opacity: '1', left: sx0 + 'px', top: sy0 + 'px',
        width: Math.round(selR.x1 + o) - sx0 + 'px', height: Math.round(selR.y1 + o) - sy0 + 'px',
      })
      // the selected column's letter turns blue (the year until a leader emerges)
      letterEls.forEach((el, j) => {
        const on = j === 0 ? leader < 0 : j - 1 === leader
        setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText })
      })

      // event flags on the x axis (an event's dashed line is darker while its flag shows); the year labels
      // under a flag fade out as it pops in and come back as it goes
      const labA = xLabs.map(() => 1)
      flags.forEach((f, k) => {
        const w = flagWin[k]
        attr(chart.events[k].el, 'stroke', !looping && t >= w.t0 && t < w.t1 ? '#98A2B3' : '#D5DAE1')
        if (looping || t < w.t0 || t >= w.t1) { setStyle(f.el, { opacity: '0', transform: 'none' }); return }
        const st = snapIn(prog(t, w.t0, 0.22), 1.12)
        const a = Math.min(+st.opacity, 1 - prog(t, w.t1 - 0.25, 0.25))
        setStyle(f.el, { opacity: String(a), transform: st.transform })
        for (const lb of f.hides) { const j = xLabs.indexOf(lb); labA[j] = Math.min(labA[j], 1 - clamp(a * 1.5)) }
      })
      xLabs.forEach((lb, j) => setStyle(lb.el, { opacity: String(+labA[j].toFixed(3)) }))
    },
  }
}
