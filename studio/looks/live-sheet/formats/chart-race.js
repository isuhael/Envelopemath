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
// The value axis labels sit on the left (as in pov-race); on the right, each rival's live value cell (its short name
// in its colour over the value) rides at its tip's height (a dotted price line joins tip and cell) and ticks as the
// line moves. The cells keep the rivals' ranking, debounced (a near-tie never flickers) and stamped at the real
// crossing: when two lines cross for good,
// their cells slide past each other, and if the lead changed the yellow cross-fades and the blue selection
// springs across in the same beat. The race ends dead on the spec's final display strings: each cell snaps from
// its running value to its `final` string. The verdict lands in the caption band (or is retyped into the
// formula bar), and the last 0.5 s rewind the race to frame 1 so the short loops.
// The formula bar types one string per step; a string too long for one line breaks at its best seam (an author
// line break, " · ", " vs ", " = ", else the most balanced space) rather than wherever the text overflows.
//
// Frame 1: the question card, the formula bar mid-typing, the start year, every rival named, and the race already
// lookOpts.preroll years in (the lines have parted, the leader's cell is yellow), one value cell per rival (R1).
// Names: a header name wraps over two lines at 40 px, else the rivals' header cells merge into one legend; a value
// cell's name wraps over 2-3 lines in a lane that keeps the plot at 55% of the card, else is cut with an ellipsis.
// At raceT[1] each cell's text swaps in place to its final (no fade) and settles from 110% after any last slide.
//
// Colours: series[].color, else lookOpts.colors (a list by series, or { name: colour }), else a tone, else the
// palette C.series (blue, ink, orange, purple). Yellow is the accent: a gold series wants an amber such as C.amber.
// Running values follow the final's format: compact finals ("≈ $40.7K") run at 3 significant digits ("$9.80K").
//
// lookOpts: loop (true) · verdict ('auto' | 'band' | 'formula'; auto = the band unless the chart would fall under
//           420 px, then the formula bar) · colors · tipNames ([short names]; default: the name before " · ")
//           · letters ('auto' | true | false) · formulaAt0 (0.7) · stakeLine (true: the dashed "money in" line)
//           · formulaSteps ([{ t, text }]: the formula bar over time; default "= <stake>" from 0)
//           · ledger ({ columns, rows: [[label, v1, v2…]], rowT: [..] }: a sheet row under the header showing the
//             latest yearly return per rival; with a ledger the header's first cell is a static label)
//           · leadMargin (0.004: the first leader must lead by this share) · leadHold (0.45 s: a new ranking
//             must hold this long to count; it is then dated back to the crossing)
//           · preroll (years the race is already in at frame 1; default 6% of the span, under a year). Note: the
//             race then sweeps x.from + preroll → x.to over raceT, so a spec whose beats are timed on x.from →
//             x.to over raceT (ledger rowT, flags, VO) sets preroll: 0
//           · finalT ([t per series, in data.series order]: when the VO names each final; that value cell lands
//             again: its value re-pops from 118%, the cell flashes and a pop sounds. The finals still swap in at
//             raceT[1]; a time at or before it is ignored)
import {
  h, s, setStyle, setText, attr, clamp, lerp, prog, ease, fmtNum, plain, C, F, S, G, M,
  formulaBar, fitFormula, lineChart, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn, snapIn, liftOut,
  popScale, flashAlpha, rgba, lerpRect, durationOf, hasCaptions, opt, layer, footerHeight, textW, font, toneColor,
  graphemes, twoLines, springRect, wrapLines, verdictCard, parseDisplay, displayValue, setHTML,
} from '../lib.js'

export const css = `
.cr-card { position: absolute; background: #FFFFFF; border-radius: 26px 26px 0 0; overflow: hidden; }
.cr-chart.ls-chart.sheet { border-radius: 0 0 26px 26px; }
.cr-heads { position: absolute; left: 0; right: 0; border-bottom: 3px solid #D0D5DD; }
.cr-hcell { position: absolute; top: 0; padding: 0 22px; display: flex; flex-direction: column; justify-content: center; border-left: 2px solid #E4E7EC; background: #FFE4C2; }
.cr-hcell.input { background: #D1FADF; border-left: 0; }
.cr-hcell .ls-hl { display: flex; align-items: center; gap: 12px; }
/* style.css pairs white-space: nowrap with text-wrap: balance, and the latter re-enables wrapping in current
   Chromium (both set text-wrap-mode); pin nowrap here so the fit checks below see real overflow */
.cr-hcell .ls-hl, .cr-hcell .ls-hsub { text-wrap-mode: nowrap; }
.cr-sw { flex: none; display: block; }
.cr-hcell .ls-hl.cr-wrap { align-items: flex-start; line-height: 1.1; }
.cr-hcell .ls-hl.cr-wrap .cr-sw { margin-top: 0.3em; }
.cr-legend { flex-direction: row; flex-wrap: wrap; align-items: center; align-content: center; justify-content: flex-start; gap: 4px 30px; padding: 10px 22px; }
.cr-legi { display: flex; align-items: center; gap: 12px; font: 800 40px/1.1 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.012em; max-width: 100%; }
.cr-legi > span { text-wrap-style: balance; }
.cr-year { font: 800 56px/1.05 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.02em; white-space: nowrap; display: inline-block; transform-origin: 0 55%; }
.cr-lrow { position: absolute; left: 0; right: 0; background: #FFFFFF; border-bottom: 2px solid #E4E7EC; }
.cr-lcell { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; padding: 0 22px; border-left: 2px solid #E4E7EC; white-space: nowrap; line-height: 1; letter-spacing: -0.01em; font-family: 'Inter', 'Inter Full', sans-serif; }
.cr-lcell.key { justify-content: flex-start; border-left: 0; font-weight: 800; }
.cr-lcell.val { font-weight: 800; }
.cr-lcell .ls-v { transform-origin: 100% 55%; }
.cr-lcell.key .ls-v { transform-origin: 0 55%; }
.cr-over { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
.cr-wires { position: absolute; left: 0; top: 0; overflow: visible; }
.cr-tip { position: absolute; display: flex; flex-direction: column; align-items: stretch; justify-content: center; padding: 0 16px 0 14px; background: #FFFFFF; border: 2px solid #D0D5DD; border-left: 10px solid var(--c); border-radius: 9px; box-sizing: border-box; white-space: nowrap; }
.cr-tipn { display: block; font: 800 40px/1 'Inter', 'Inter Full', sans-serif; letter-spacing: -0.012em; margin-bottom: 6px; }
.cr-tipv { display: block; align-self: flex-end; font: 800 46px/1 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.015em; transform-origin: 100% 55%; font-variant-numeric: tabular-nums; }
.cr-sel { position: absolute; border: 4px solid #2E90FA; border-radius: 12px; opacity: 0; box-sizing: border-box; }
.cr-sel > i { position: absolute; right: -10px; bottom: -10px; width: 16px; height: 16px; background: #2E90FA; border: 3px solid #FFFFFF; border-radius: 2px; }
.cr-flag { position: absolute; height: 58px; padding: 0 20px; background: #101828; border-radius: 12px; display: flex; align-items: center; opacity: 0; transform-origin: 50% 0; box-sizing: border-box; }
.cr-flagt { font: 700 40px/1 'Inter', 'Inter Full', sans-serif; color: #FFFFFF; white-space: nowrap; letter-spacing: -0.01em; }
.cr-flagt em { color: #FFD60A; }
.cr-flagt u.mark2 { color: #FF6B5B; }
.cr-flag > b { position: absolute; top: -8px; width: 18px; height: 18px; background: #101828; transform: rotate(45deg); border-radius: 2px; }
.cr-money { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #7B8496; white-space: nowrap; text-align: right; }
/* ---- the sheet race (lookOpts.valueRow) ---- */
.crv-row { position: absolute; left: 0; right: 0; background: #FFFFFF; border-bottom: 2px solid #E4E7EC; }
.crv-hook { position: absolute; left: 0; right: 0; background: #FFFFFF; border-bottom: 2px solid #E4E7EC; overflow: hidden; z-index: 3; }
.crv-hcell { position: absolute; top: 0; bottom: 0; display: flex; align-items: center; justify-content: flex-end; padding: 0 22px; border-left: 2px solid #E4E7EC; white-space: nowrap; font: 800 72px/1 'Inter', 'Inter Full', sans-serif; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.crv-hcell.key { justify-content: flex-start; border-left: 0; color: #101828; }
.crv-hcell .ls-v { display: inline-block; transform-origin: 100% 55%; }
.crv-hcell.key .ls-v { transform-origin: 0 55%; }
.crv-hero { position: absolute; left: 0; right: 0; overflow: hidden; z-index: 4; }
.crv-hrow { position: absolute; left: 0; right: 0; background: #FFFFFF; border-bottom: 2px solid #E4E7EC; }
.crv-hrow:last-child { border-bottom: 3px solid #D0D5DD; }
.crv-hname { position: absolute; display: flex; align-items: center; gap: 14px; font: 800 48px/1 'Inter', 'Inter Full', sans-serif; letter-spacing: -0.015em; white-space: nowrap; }
.crv-hname .cr-sw { flex: none; }
.crv-hnote { position: absolute; font: 700 40px/1.1 'Inter', 'Inter Full', sans-serif; white-space: nowrap; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; border-radius: 8px; padding: 0 8px; margin-left: -8px; }
.crv-hval { position: absolute; top: 0; bottom: 0; display: flex; align-items: center; justify-content: flex-end; padding-right: 40px; font: 800 94px/1 'Inter', 'Inter Full', sans-serif; letter-spacing: -0.02em; color: #101828; white-space: nowrap; font-variant-numeric: tabular-nums; }
.crv-hval > .ls-v { display: inline-block; transform-origin: 100% 55%; }
.crv-odo { display: inline-flex; align-items: flex-start; height: 1em; line-height: 1; white-space: nowrap; font-weight: 800; font-family: 'Inter', 'Inter Full', sans-serif; font-variant-numeric: tabular-nums; }
.crv-odo > span { display: inline-block; height: 1em; line-height: 1; white-space: pre; }
.crv-dc { position: relative; overflow: hidden; text-align: center; }
.crv-ds { display: block; white-space: pre; line-height: 1em; text-align: center; }
.crv-flag { position: absolute; height: 58px; padding: 0 20px; background: #101828; border-radius: 12px; display: flex; align-items: center; opacity: 0; transform-origin: 50% 100%; box-sizing: border-box; }
.crv-flag > b { position: absolute; bottom: -8px; width: 18px; height: 18px; background: #101828; transform: rotate(45deg); border-radius: 2px; }
.crv-rung { position: absolute; font: 800 40px/1 'Inter', 'Inter Full', sans-serif; color: #101828; white-space: nowrap; text-align: right; letter-spacing: -0.01em; }
.crv-ask { position: absolute; height: 76px; padding: 0 28px; background: #101828; color: #FFFFFF; border-radius: 16px; display: flex; align-items: center; justify-content: center; box-sizing: border-box; font: 800 46px/1 'Inter', 'Inter Full', sans-serif; letter-spacing: -0.012em; white-space: nowrap; transform-origin: 50% 50%; }
.crv-ask em { color: #FFD60A; }
.crv-tag { position: absolute; font: 800 40px/1 'Inter', 'Inter Full', sans-serif; white-space: nowrap; letter-spacing: -0.012em; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// a value cell: the rival's short name (40 px, in its colour) over its live value (46 px); padL includes the 10 px edge
const TIP = { px: 46, ht: 104, gap: 8, padL: 14 + 10, padR: 16 }
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

export default function chartRace(spec, ctx) {
  // lookOpts.valueRow: the values live in the sheet (no lane beside the plot), see sheetRace below
  if (opt(spec, 'valueRow', null)) return sheetRace(spec, ctx)
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
  // colour: series[].color, lookOpts.colors (a list, or { name: colour }), a tone, else the palette
  const colOpt = opt(spec, 'colors', null)
  const colorOf = (sr, i) => sr.color || (Array.isArray(colOpt) ? colOpt[i] : colOpt && typeof colOpt === 'object' ? colOpt[sr.name] ?? colOpt[String(sr.name || '').split(/\s+·\s+/)[0]] : null)
    || (sr.tone ? toneColor(sr.tone) : C.series[i % C.series.length])
  const colors = series.map(colorOf)
  // running values follow the final's format: a compact final ("≈ $40.7K") runs compact at 3 significant digits, a
  // full final ("≈ $300,000") runs in full, so the payoff never changes format
  const compactOf = str => /\d\s*[KMBT]\b/.test(String(str))
  const runCompact = finals.length ? finals.every(compactOf) : !!yo.compact
  const runFmt = v => {
    if (!runCompact) return fmtNum(v, { ...numOpts, compact: false })
    const a = Math.abs(v), u = a >= 1e12 ? 1e12 : a >= 1e9 ? 1e9 : a >= 1e6 ? 1e6 : a >= 1e3 ? 1e3 : 1
    const m = a / u
    return fmtNum(v, { ...numOpts, compact: true, dp: u === 1 ? numOpts.dp : m < 10 ? 2 : m < 100 ? 1 : 0 })
  }
  const yearOf = x => Math.floor(x + 1e-9)

  // ---------- time ↔ x ----------
  // frame 1 is never an empty chart: the race is already lookOpts.preroll years in (default 6% of the span, under a
  // year, so the year cell still reads the start year), and still lands dead on the finals at raceT[1]
  const preX = clamp(+opt(spec, 'preroll', Math.min(0.9, 0.06 * (x1 - x0))) || 0, 0, 0.2 * (x1 - x0))
  const xa = x0 + preX
  const xOfT = t => lerp(xa, x1, prog(t, r0, r1 - r0))
  const tOfX = x => r0 + ((x - xa) / (x1 - xa || 1)) * (r1 - r0)

  // ---------- formula bar strings (the verdict is placed once the chart's height is known) ----------
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  const stake = d.stake ? String(d.stake) : ''
  const defaultFormula = d.formula || (stake ? (/^[=≈]/.test(stake) ? stake : '= ' + stake) : '')
  // each step is measured as one line (author line breaks become spaces, "≈" stays with its number)
  const flow = str => String(str).replace(/\s*\n\s*/g, ' ').replace(/≈ /g, '≈\u00a0')
  const steps = (opt(spec, 'formulaSteps', null) || [{ t: 0, text: defaultFormula }])
    .filter(x => x && x.text).map(x => ({ t: x.t ?? 0, raw: String(x.text), text: flow(x.text) })).sort((a, b) => a.t - b.t)
  if (!steps.length) steps.push({ t: 0, raw: ' ', text: ' ' })
  const stepCps = 30

  // ---------- layout ----------
  const L = layer(ctx, 'cr')
  const fH = footerHeight(spec.footer)
  const cardTop = G.cardTop, X = G.left, W = G.width
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
  // a rival's name: one line with its swatch; "name · detail" split onto a grey sub-label when it won't fit; else
  // the name wraps over two balanced lines at 40 px. A name that still cannot fit its column (a long word, three
  // lines) turns the rivals' header cells into one merged legend cell, where every name has the room it needs.
  const nameFits = (str, inner, lines) => wrapLines(str, inner, font(800, S.labelMin), '-0.012em', lines)
  const labelOf = (name, j) => {
    // (a name may run up to 8 px into its cell's 22 px right padding)
    const inner = colW[j + 1] - 2 * G.padX - swW - swGap + 8
    const str = String(name || '')
    if (str.includes('\n') || textW(mk(str), font(800, S.label)) <= inner) return { parts: str.split('\n') }
    const m = /^(.+?)\s+(?:·|—|–|-|\()\s*(.+?)\)?$/.exec(str)
    if (m && textW(mk(m[1]), font(800, S.labelMin)) <= inner) return { parts: [m[1], m[2]] }
    const two = nameFits(str, inner, 2)
    return two ? { parts: [two.join('\n')], wrapped: true } : null
  }
  let labels = series.map((sr, i) => labelOf(sr.name, i))
  const legend = labels.some(x => !x)

  // ---------- DOM: the sheet card (the header row is built first, then measured) ----------
  const card = h('div', { class: 'cr-card', style: { left: X + 'px', top: cardTop + 'px', width: W + 'px' } })
  L.append(card)
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines, verdict: verdict ? verdict.text : null })
  const fline = fbar.txt.parentElement
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gutter + 'px' } })
  const heads = h('div', { class: 'cr-heads' }, headNum)
  card.append(heads)
  const yearEl = h('span', { class: 'cr-year', style: { fontSize: yearPx + 'px' } })
  const hcells = [h('div', { class: 'cr-hcell input', style: { left: colX[0] + 'px', width: colW[0] + 'px' } },
    ledger ? h('div', { class: 'ls-hl', html: mk(keyLabel) }) : yearEl)]
  heads.append(hcells[0])
  if (legend) {
    // one merged peach cell over the rivals' columns: swatch + full name per rival, flowing (a name wraps, balanced,
    // only if it is wider than the whole cell)
    const items = series.map((sr, i) => h('div', { class: 'cr-legi' }, swatch(colors[i], sr.dash, 42), h('span', { html: mk(String(sr.name || '')) })))
    const el = h('div', { class: 'cr-hcell cr-legend', style: { left: colX[1] + 'px', width: W - colX[1] + 'px' } }, ...items)
    heads.append(el)
    hcells.push(el)
  } else series.forEach((sr, i) => {
    const { parts: [name, sub], wrapped } = labels[i]
    const hl = h('div', { class: 'ls-hl' + (wrapped ? ' cr-wrap' : ''), style: { gap: swGap + 'px' } }, swatch(colors[i], sr.dash, swW), h('span', { html: name.split('\n').map(mk).join('<br>') }))
    const sl = sub ? h('div', { class: 'ls-hsub', html: mk(sub), style: { paddingLeft: swW + swGap + 'px' } }) : null
    const el = h('div', { class: 'cr-hcell', style: { left: colX[i + 1] + 'px', width: colW[i + 1] + 'px' } }, hl, sl)
    heads.append(el)
    hcells.push(el)
    // a long name shrinks to the 40 px label floor rather than spill into the next column; a long sub-label
    // drops its indent, then wraps
    const inner = colW[i + 1] - 2 * G.padX + 8
    if (wrapped) setStyle(hl, { fontSize: S.labelMin + 'px' })
    let px = wrapped ? S.labelMin : S.label
    while (px > S.labelMin && hl.scrollWidth > inner + 0.5) { px -= 1; setStyle(hl, { fontSize: px + 'px' }) }
    if (sl && sl.scrollWidth > inner + 0.5) setStyle(sl, { paddingLeft: '0px' })
    if (sl && sl.scrollWidth > inner + 0.5) setStyle(sl, { textWrapMode: 'wrap', textWrapStyle: 'balance' })
  })
  const headH = Math.max(84, Math.ceil(Math.max(...hcells.map(el => el.scrollHeight)) + 20))
  for (const el of [headNum, ...hcells]) setStyle(el, { height: headH + 'px' })

  const ledH = ledger ? 76 : 0
  let lettersH = opt(spec, 'letters', 'auto') === false ? 0 : G.lettersH
  // the verdict is a card in the caption band unless the chart would fall under 420 px; then it is retyped into the
  // formula bar (Inter 800) and the chart runs down to y 1476
  const bottomFor = band => (band ? G.workBottom : G.safeBottom - 4) - (fH ? fH + G.gap : 0)
  if (vMode === 'auto') vMode = caps || bottomFor(true) - cardTop - fbarH - headH - ledH >= 420 ? 'band' : 'formula'
  const bandUsed = caps || vMode === 'band'
  const bottom = bottomFor(bandUsed)
  if (vMode === 'formula') steps.push({ t: verdict.t, raw: String(verdict.text), text: fbar.vfit.text, verdict: true })

  // ---------- timing + duration ----------
  const vStep = steps.find(x => x.verdict)
  const D0 = durationOf(spec, {
    beats: [r1 + 0.6, ...steps.slice(1).filter(x => !x.verdict).map(x => x.t + 0.2 + typeDur(x.text, { cps: stepCps }) + 0.3), ...ledT.map(x => x + 0.4)],
    hold: d.hold ?? 4, loop: loopOn, verdictEnd: vStep ? vStep.t + 0.2 + typeDur(vStep.text, { cps: stepCps }) : null,
  })
  const D = spec.duration || D0
  const loopT0 = loopOn ? D - M.loopOut : Infinity
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
  // the value cells' lane on the right is as wide as the widest string a cell will show: its rival's short name
  // (in the rival's colour, so the cell says whose value it is without relying on a sliver of colour) over the value
  // The lane is kept narrow enough for the plot to keep 55% of the card: the values set at 46 px down to 42 px to
  // fit it, and a name wider than the lane wraps over two (then three) balanced lines rather than widen it (a name
  // that still cannot fit is cut to its first word). Every cell then gets the same height.
  const tipNames = series.map((sr, i) => String((opt(spec, 'tipNames', null) || [])[i] ?? sr.short ?? String(sr.name || '').split(/\s+·\s+|\s+\(|\s+[—–]\s+/)[0]))
  const candidates = series.flatMap((sr, i) => [finals[i], ...sr.points.map(p => runFmt(p[1]))])
  const startV = Math.max(...series.map(sr => sr.points[0][1])), startV0 = startV
  // the x-axis band holds the year labels, and the event flags when there are events (FLAG.ht + margins); the value
  // axis labels sit on the left, in a gutter as wide as the widest label they can show
  const allVals = series.flatMap(sr => sr.points.map(p => p[1]))
  // the value axis gutter: as wide as the widest tick label the rescaling axis will actually show
  const axisW = (() => {
    const lin = (pts, x) => { if (x <= pts[0][0]) return pts[0][1]; for (let k = 1; k < pts.length; k++) if (x <= pts[k][0]) return lerp(pts[k - 1][1], pts[k][1], (x - pts[k - 1][0]) / (pts[k][0] - pts[k - 1][0] || 1)); return pts[pts.length - 1][1] }
    const lo = Math.min(...allVals) * 0.8
    const nice = raw => { const q = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / q; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * q }
    const labels = new Set()
    for (let k = 0; k <= 40; k++) {
      const x = lerp(x0, x1, k / 40)
      const m = Math.max(...series.map(sr => Math.max(lin(sr.points, x), ...sr.points.filter(p => p[0] <= x).map(p => p[1]))))
      const ym = yo.log ? Math.max(startV0 * 2, m * Math.max(1.5, Math.pow(Math.max(1.0001, m / lo), 0.138 / 0.862))) : Math.max(startV0 * 1.6, m / 0.862)
      if (yo.log) { for (let e = Math.floor(Math.log10(lo)); e <= Math.ceil(Math.log10(ym)); e++) for (const f of [1, 2, 5]) { const v = f * 10 ** e; if (v >= lo && v <= ym) labels.add(v) } }
      else { const st = nice(ym / 4); for (let v = st; v <= ym + 1e-9; v += st) labels.add(+v.toPrecision(12)) }
    }
    return Math.max(40, ...[...labels].map(v => textW(esc(axisFmt(v, yo.prefix, yo.suffix)), font(600, 32))))
  })()
  const padL0 = Math.max(70, Math.ceil(axisW) + 34)
  const laneBudget = W - padL0 - LANE_GAP - (X + W - G.textRight) - Math.ceil(0.55 * W) - TIP.padL - TIP.padR - 6
  const valsW = px => Math.ceil(Math.max(...candidates.map(c => textW(mk(c), font(800, px), { letterSpacing: '-0.015em' }))))
  let tipPx = TIP.px
  while (tipPx > 42 && valsW(tipPx) > laneBudget) tipPx -= 2
  let laneMax = Math.max(valsW(tipPx), laneBudget, 200)
  const nameFont = font(800, 40)
  // the cells must stack inside the plot: that caps how many lines a name may take (else it is cut to its first word)
  const plotH0 = chartH - 22 - (events.length ? FLAG.top + FLAG.ht + 12 : 60)
  const maxL = clamp(Math.floor(((plotH0 + 14 - (nS - 1) * TIP.gap) / Math.max(1, nS) - (TIP.ht - 46 + tipPx)) / 40) + 1, 1, 3)
  // a word wider than the lane widens it (up to 300 px of text); past that a name is cut to its longest word
  const longest = n => Math.max(0, ...plain(n).split(/\s+/).filter(Boolean).map(w => textW(esc(w), nameFont, { letterSpacing: '-0.012em' })))
  laneMax = Math.max(laneMax, Math.min(300, Math.ceil(Math.max(0, ...tipNames.map(longest)))))
  const tipLines = tipNames.map(n => {
    for (let k = 1; k <= maxL; k++) { const ls = wrapLines(n, laneMax, nameFont, '-0.012em', k); if (ls) return ls }
    // still too long: the longest run of its first words that fits, with an ellipsis (the header has the full name)
    const ws = plain(n).split(/\s+/).filter(Boolean)
    for (let m = ws.length - 1; m >= 1; m--) {
      for (let k = 1; k <= maxL; k++) { const ls = wrapLines(ws.slice(0, m).join(' ') + '…', laneMax, nameFont, '-0.012em', k); if (ls) return ls }
    }
    return [ws[0] || n]
  })
  const nameLines = Math.max(1, ...tipLines.map(ls => ls.length))
  const tipTextW = Math.ceil(Math.max(valsW(tipPx), ...tipLines.flat().map(l => textW(mk(l), nameFont, { letterSpacing: '-0.012em' }))))
  const tipW = tipTextW + TIP.padL + TIP.padR + 6
  const tipHt = TIP.ht - 46 + tipPx + (nameLines - 1) * 40 // name lines + value + padding
  const tagX = G.textRight - tipW // value cells: x tagX … 938 (inside the button rail)
  const plotRight = tagX - LANE_GAP
  const pad = { l: padL0, r: X + W - plotRight, t: 22, b: events.length ? FLAG.top + FLAG.ht + 12 : 60 }
  // x ticks: the author's step, else whole years (about 5 labels); decimals only for a fractional step
  // (thinned when the plot is too narrow for them: neighbouring labels keep a 24 px gap, and at least two show)
  const plotW0 = W - pad.l - pad.r
  let xEvery = d.x?.tickEvery || Math.max(1, [1, 2, 5, 10, 20, 25, 50].find(st => (x1 - x0) / st <= 5.5) || 50)
  const dpOf = st => (Number.isInteger(st) ? 0 : Math.min(2, (String(st).split('.')[1] || '').length))
  const tickVals = st => { const v = []; for (let x = Math.ceil(x0 / st - 1e-9) * st; x <= x1 + 1e-9; x += st) v.push(x); return v }
  const roomy = st => {
    const vals = tickVals(st)
    const labW = Math.max(0, ...vals.map(v => textW(dpOf(st) ? v.toFixed(dpOf(st)) : String(Math.round(v)), font(600, 32))))
    return (plotW0 * st) / (x1 - x0 || 1) >= labW + 24
  }
  for (const st of [1, 2, 4, 5, 10, 20, 25, 50, 100]) if (st > xEvery && !roomy(xEvery) && tickVals(st).length >= 2) xEvery = st
  const xDp = dpOf(xEvery)
  // the start and end years are always labelled (when they are whole years); a middle label that would sit closer
  // than 24 px to a neighbour is dropped (never the first or the last)
  const xLabel = v => (xDp ? v.toFixed(xDp) : String(Math.round(v)))
  const xTicks = (() => {
    const v = tickVals(xEvery)
    if (Number.isInteger(x0) && (!v.length || v[0] - x0 > 1e-6)) v.unshift(x0)
    const xEnd = Math.floor(x1 + 1e-9) // a race to 2025.99 ends on the 2025 label
    if (!v.length || xEnd - v[v.length - 1] > 1e-6) v.push(xEnd)
    const pos = x => ((x - x0) / (x1 - x0 || 1)) * plotW0
    const half = x => textW(xLabel(x), font(600, 32)) / 2
    const kept = [v[0]]
    for (let k = 1; k < v.length - 1; k++) {
      const a = kept[kept.length - 1], x = v[k], z = v[v.length - 1]
      if (pos(x) - half(x) - (pos(a) + half(a)) >= 24 && pos(z) - half(z) - (pos(x) + half(x)) >= 24) kept.push(x)
    }
    if (v.length > 1) {
      const z = v[v.length - 1], a = kept[kept.length - 1]
      if (pos(z) - half(z) - (pos(a) + half(a)) < 24 && kept.length > 1) kept.pop()
      kept.push(z)
    }
    return kept
  })()
  // headroom over the running max (the flags live on the x axis, so the lines get the rest of the plot)
  const topFrac = 0.138
  const chart = lineChart(L, {
    x: X, y: chartTop, w: W, ht: chartH, pad,
    xr: [x0, x1], xEvery, xTicks, xFmt: xLabel,
    yFmt: v => axisFmt(v, yo.prefix, yo.suffix), log: !!yo.log, yTicks: 4,
    series: series.map((sr, i) => ({ points: sr.points, color: colors[i], width: 8, area: false, dash: sr.dash })),
    events: events.map(ev => ({ x: ev.x })),
  })
  chart.el.classList.add('cr-chart')
  const plot = chart.plot
  const valueAt = (i, x) => chart.valueAt(i, x)

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
    const n = h('span', { class: 'cr-tipn', html: tipLines[i].map(mk).join('<br>'), style: { color: colors[i], lineHeight: nameLines > 1 ? '1' : '' } })
    const v = h('span', { class: 'cr-tipv', style: { fontSize: tipPx + 'px' } })
    const el = h('div', { class: 'cr-tip', style: { left: tagX + 'px', width: tipW + 'px', height: tipHt + 'px' } }, n, v)
    setStyle(el, { '--c': colors[i] })
    over.append(el)
    return { el, n, v }
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
  const orders = [{ t: -Infinity, order: rankAt(xa + (x1 - x0) * 1e-6, series.map((_, i) => i)) }]
  let emergeT = Infinity
  if (nS >= 2) {
    // a lead that already shows at frame 1 (the preroll) counts from before it
    const v0 = series.map((_, i) => valueAt(i, xa)).sort((a, b) => b - a)
    let cur = orders[0].order, cand = null, candT = 0, eCand = preX > 0 && v0[0] - v0[1] > Math.abs(v0[0]) * margin * 3 ? -Infinity : -1
    const N = Math.max(1, Math.ceil((r1 - r0) * 60))
    for (let k = 0; k <= N; k++) {
      const t = r0 + (k / N) * (r1 - r0), x = xOfT(t)
      if (emergeT === Infinity) {
        const vs = series.map((_, i) => valueAt(i, x)).sort((a, b) => b - a)
        if (vs[0] - vs[1] > Math.abs(vs[0]) * margin) { if (eCand === -1) eCand = t; if (t - eCand >= holdT) emergeT = eCand } else eCand = -1
      }
      const raw = rankAt(x, cur)
      if (same(raw, cur)) { cand = null; continue }
      if (!cand || !same(raw, cand)) { cand = raw; candT = t }
      if (t - candT >= holdT) { orders.push({ t: candT, order: cand }); cur = cand; cand = null }
    }
    if (emergeT === Infinity && eCand !== -1) emergeT = eCand
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
  // the finals settle once the last slide (a photo finish) is over, so numbers never move and change at once
  const lastOrderT = orders.length > 1 ? orders[orders.length - 1].t : -Infinity
  const finT = Math.max(r1, lastOrderT + SWAP)
  // lookOpts.finalT: each final lands again when the VO names it (after the swap-in at finT)
  const emOpt = opt(spec, 'finalT', null)
  const emT = series.map((_, i) => { const v = Array.isArray(emOpt) ? +emOpt[i] : NaN; return isFinite(v) && v > finT + 0.3 ? v : null })

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
      if (t > 0.05 && t - lastTick >= 0.8) { ctx.cue(t, 'tick', { gain: 0.3 }); lastTick = t }
    }
  } else ledT.forEach(t => ctx.cue(t, 'tick', { gain: 0.6 }))
  flags.forEach(f => ctx.cue(f.t, 'thud', { gain: 0.7 }))
  leads.forEach((ld, k) => { if (k > 0) { ctx.cue(ld.t, 'pop', { gain: 0.8 }); ctx.cue(ld.t + 0.02, 'swipe', { gain: 0.35 }) } })
  ctx.cue(r1 + 0.02, 'pop', { gain: 0.9 })
  emT.forEach(t => { if (t != null && t < loopT0) ctx.cue(t, 'pop', { gain: 0.75 }) })
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const tipLo = plot.y - 6, tipHi = plot.y + plot.h - tipHt + 8
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
      const xNow = looping ? lerp(x1, xa, ease.inOut(prog(t, loopT0 + 0.02, 0.4))) : xOfT(t)

      // formula bar (the verdict takes it over in ink, heavier, as the ≈ chip pops)
      const fs = formulaState(t)
      fbar.set(fs.html, { caret: fs.caret })
      // a two-line string keeps both lines' height from its first keystroke (no jump when it reaches line 2)
      setStyle(fline, { minHeight: fs.src.includes('\n') && !fs.verdict ? '2.4em' : '0px' })
      fbar.verdictStyle(!!fs.verdict, vMode === 'formula' ? prog(t, verdict.t, 0.2) : 0)
      const chipP = vMode === 'formula' && !looping ? prog(t, verdict.t + 0.1, 0.34) : 0
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // the year counter: it lands a touch large on each new year
      if (!ledger) {
        const yr = clamp(yearOf(xNow), yr0, yr1)
        setText(yearEl, String(yr))
        const since = (xNow - yr) * ((r1 - r0) / (x1 - xa || 1))
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
          if (k < 0) { setText(c.v, ''); setStyle(c.v, { opacity: '0', transform: 'none', color: C.ink }); setStyle(c.el, { backgroundColor: 'transparent' }); continue }
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
      const finP = fin ? prog(t, finT, M.drop) : 1

      // value cells ride the value axis at their tips' height, stacked in rank order; when the order changes
      // they slide past each other (and the rewind slides them back to frame 1's order)
      const wants = tipPts.map(p => p.y)
      const packed = order => stackOrd(wants, order, tipHt, TIP.gap, tipLo, tipHi)
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
      const rects = tops.map((y, i) => { const y0 = Math.round(y), x0 = tagX + nudge[i]; return { x0, y0, x1: x0 + tipW, y1: y0 + tipHt } })
      tipPts.forEach((p, i) => {
        const tp = tips[i], r = rects[i]
        setStyle(tp.el, { top: r.y0 + 'px', left: r.x0 + 'px' })
        // cells passing each other overlap on purpose, for SWAP s
        mark(tp.el, 'data-overlap-ok', sliding)
        // the running value at r1 already reads the final's number: the text swaps in place (no fade), then the
        // cell settles from 110% once any last slide has finished
        setText(tp.v, fin ? finals[i] : runFmt(p.v))
        // the final lands again when the VO names it (lookOpts.finalT): a bigger re-pop and a flash, leader or not
        const emP = fin && emT[i] != null && t >= emT[i] ? prog(t, emT[i], 0.5) : 1
        const sc = (finP > 0 && finP < 1 ? 1 + 0.1 * (1 - ease.out(finP)) : 1) * (emP < 1 ? 1 + 0.18 * (1 - ease.out(emP)) : 1)
        setStyle(tp.v, { opacity: '1', transform: sc > 1.0005 ? `scale(${sc.toFixed(4)})` : 'none' })
        // yellow for the leader (cross-faded on a change); a pale flash as a final lands
        let a = i === leader ? swapP : i === prevLeader ? 1 - swapP : 0
        a *= 1 - fadeOut
        const emF = fin && emT[i] != null ? flashAlpha(t, emT[i], 0.6) : 0
        const aName = a
        if (emF > 0.001) a *= 1 - emF
        const flash = Math.max(fin && i !== leader ? flashAlpha(t, finT + 0.04, 0.5) : 0, emF)
        const under = flash > 0.001 ? mix(C.rowHi, C.sheet, flash) : C.sheet
        const bg = a >= 0.999 ? C.accent : a > 0.001 ? mix(C.accent, flash > 0.001 ? C.rowHi : C.sheet, a) : under
        setStyle(tp.el, { backgroundColor: bg, zIndex: String(i === leader ? 4 : nudge[i] ? 3 : 2) })
        // on the leader's yellow the name is ink (a coloured name would lose contrast); the edge keeps the colour
        setStyle(tp.n, { color: aName > 0.5 ? C.ink : colors[i] })
        // the dotted price line from the tip to its cell (with an elbow when the cell had to move)
        const cy = r.y0 + tipHt / 2, xw = p.x + 16, xb = r.x0 - 2
        if (xb - xw < 4 && Math.abs(cy - p.y) < 3) { attr(wireEls[i], 'd', ''); return }
        const xm = Math.max(xw, xb - 12)
        attr(wireEls[i], 'd', Math.abs(cy - p.y) < 3
          ? `M${xw.toFixed(1)} ${p.y.toFixed(1)} L${xb} ${p.y.toFixed(1)}`
          : `M${xw.toFixed(1)} ${p.y.toFixed(1)} L${xm.toFixed(1)} ${p.y.toFixed(1)} L${xb} ${cy.toFixed(1)}`)
      })


      // selection: around every value cell until a leader emerges, then on the leader (springs across on a change)
      const group = { x0: tagX, y0: Math.min(...rects.map(r => r.y0)), x1: tagX + tipW, y1: Math.max(...rects.map(r => r.y1)) }
      let selR
      if (looping) selR = lerpRect(leads.length ? rects[orders[orders.length - 1].order[0]] : group, group, ease.inOut(prog(t, loopT0, 0.34)))
      else if (leader < 0) selR = group
      else selR = springRect(prevLeader >= 0 ? rects[prevLeader] : group, rects[leader], prog(t, leads[lk].t, M.pick), 1.6)
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

// =====================================================================================================
// The sheet race (lookOpts.valueRow). The values live in the sheet, so the chart gets the card's full width:
//   formula bar   one line: the selected cell's working, retyped as each year lands (lookOpts.formulaSteps)
//   row 1         header: the year key (mint), one peach cell per rival (swatch, name, grey sub-label)
//   row 2         ledger: the latest closed year and each rival's return that year (lookOpts.ledger)
//   row 3         value: each rival's money at that close (in its line colour). It steps with the ledger row
//                 (a 0.35 s roll from the last close), so the value and the ledger always name the same year
//   chart         full width under the sheet: the lines race with a live y rescale; event flags slam into a strip
//                 at the top of the plot (never on the year labels) and their dashed rules fade with them;
//                 doubling rungs (lookOpts.rungs) wipe in at their values, labelled in the axis margin
// Opening (lookOpts.hook): frame 1 shows one ledger row (the hook's year) as a tall row with large values, the
// hooked rival's cell yellow under the selection; at hook.until it rewinds (its year counts back to the first
// row's, its values lift out, the row splits back into the ledger and value rows) and the race starts.
// Finale (lookOpts.finale + finalT): the value row holds the last close it showed while the last ledger row
// lands; at finale.t the header and both rows give way to one hero row per rival (name, its last-year return,
// its value at ~94 px). Each hero value rolls as an odometer from that held close to its `final` display string,
// landing at finalT[i] (when the VO names it), with the selection on the cell being named. At the verdict the
// decade winner's value turns yellow and the best last-year return gets a yellow marker.
// lookOpts (this mode): valueRow ({ label: 'Value' }) · hook ({ row, until, series }) · finale ({ t, roll: s or
// [s per series] }) · finalT · focus ([{ t, series }]: the selection's cell over time) · rungs ([{ t, value, label }])
// · flagHold (3.6) · xEven (even year ticks only; the end year is not forced) · formulaSteps · formulaAt0 (1 = the
// first step fully typed at frame 1) · ledger · colors · tipNames · preroll (0) · loop · stakeLine.
// The verdict card spans the sheet's width (x 60-960) in the caption band.
// =====================================================================================================
function sheetRace(spec, ctx) {
  const d = spec.data || {}
  const series = (d.series || []).filter(sr => sr && Array.isArray(sr.points) && sr.points.length).slice(0, 3)
  const nS = series.length
  const allX = series.flatMap(sr => sr.points.map(p => p[0]))
  const x0 = d.x?.from ?? Math.min(...allX), x1 = d.x?.to ?? Math.max(...allX)
  const yo = { prefix: '$', suffix: '', dp: 0, ...(d.y || {}) }
  const numOpts = { prefix: yo.prefix, suffix: yo.suffix, dp: yo.dp, compact: false }
  const [r0, r1] = Array.isArray(d.raceT) && d.raceT.length === 2 ? d.raceT : [1, 1 + Math.max(8, (x1 - x0) * 1.6)]
  const events = (d.events || []).filter(ev => ev && ev.x >= x0 && ev.x <= x1).slice().sort((a, b) => a.x - b.x)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const caps = hasCaptions(spec)
  const loopOn = opt(spec, 'loop', true)
  const ledger = opt(spec, 'ledger', null)
  const ledRows = ledger && Array.isArray(ledger.rows) ? ledger.rows : []
  const ledT = ledRows.map((_, i) => (ledger.rowT && ledger.rowT[i] != null ? +ledger.rowT[i] : r0 + ((i + 1) / ledRows.length) * (r1 - r0)))
  const finals = series.map(sr => (sr.final != null ? String(sr.final) : fmtNum(sr.points[sr.points.length - 1][1], numOpts)))
  const colOpt = opt(spec, 'colors', null)
  const colors = series.map((sr, i) => sr.color
    || (Array.isArray(colOpt) ? colOpt[i] : colOpt && typeof colOpt === 'object' ? colOpt[sr.name] ?? colOpt[String(sr.name || '').split(/\s+·\s+/)[0]] : null)
    || (sr.tone ? toneColor(sr.tone) : C.series[i % C.series.length]))
  const runFmt = v => fmtNum(v, numOpts)
  const shortName = (sr, i) => String((opt(spec, 'tipNames', null) || [])[i] ?? sr.short ?? String(sr.name || '').split(/\s+·\s+|\s+\(|\s+[—–]\s+/)[0])

  // ---------- clock ----------
  const preX = clamp(+opt(spec, 'preroll', 0) || 0, 0, 0.2 * (x1 - x0))
  const xa = x0 + preX
  const xOfT = t => lerp(xa, x1, prog(t, r0, r1 - r0))
  const tOfX = x => r0 + ((x - xa) / (x1 - xa || 1)) * (r1 - r0)

  // ---------- options ----------
  const VR = opt(spec, 'valueRow', {})
  const valueLabel = String((VR && VR.label) || 'Value')
  const HK = opt(spec, 'hook', null)
  const hookRow = HK && ledRows[HK.row] ? ledRows[HK.row] : null
  const hookEnd = hookRow ? (isFinite(+HK.until) ? +HK.until : r0) : -Infinity
  const hookSer = hookRow ? clamp(Math.round(+HK.series || 0), 0, nS - 1) : -1
  const RW = 0.5 // the rewind
  const FN = opt(spec, 'finale', null)
  const finaleT = FN && isFinite(+FN.t) ? +FN.t : Infinity
  const FIN_IN = 0.45 // old rows clear (0.15 s), then the hero rows wipe in
  const landOpt = opt(spec, 'finalT', null)
  const landT = series.map((_, i) => {
    const v = Array.isArray(landOpt) ? +landOpt[i] : NaN
    return finaleT === Infinity ? Infinity : isFinite(v) ? Math.max(v, finaleT + FIN_IN + 0.3) : finaleT + 1.2 + i * 1.6
  })
  const rollOf = i => { const r = FN && FN.roll; const v = Array.isArray(r) ? +r[i] : +r; return isFinite(v) && v > 0 ? v : 1.2 }
  const rollT0 = series.map((_, i) => Math.max(finaleT + FIN_IN, landT[i] - rollOf(i)))
  const focus = (opt(spec, 'focus', []) || []).filter(f => f && isFinite(+f.t))
    .map(f => ({ t: +f.t, i: clamp(Math.round(+f.series || 0), 0, nS - 1) })).sort((a, b) => a.t - b.t)
  const rungs = (opt(spec, 'rungs', []) || []).filter(r => r && isFinite(+r.t) && isFinite(+r.value) && r.label != null)
    .map(r => ({ t: +r.t, v: +r.value, label: String(r.label) }))
  const flagHold = Math.max(0.8, +opt(spec, 'flagHold', 3.6) || 3.6)
  const xEven = !!opt(spec, 'xEven', false)

  // ---------- formula bar strings ----------
  const stake = d.stake ? String(d.stake) : ''
  const flow = str => String(str).replace(/\s*\n\s*/g, ' ').replace(/≈ /g, '≈ ')
  const steps = (opt(spec, 'formulaSteps', null) || [{ t: 0, text: d.formula || (stake ? (/^[=≈]/.test(stake) ? stake : '= ' + stake) : '') }])
    .filter(x => x && x.text).map(x => ({ t: x.t ?? 0, raw: String(x.text), text: flow(x.text) })).sort((a, b) => a.t - b.t)
  if (!steps.length) steps.push({ t: 0, raw: ' ', text: ' ' })
  const stepCps = 40, ERASE = 0.15

  // ---------- layout ----------
  const L = layer(ctx, 'cr')
  const fH = footerHeight(spec.footer)
  const cardTop = G.cardTop, X = G.left, W = G.width
  const fFit = fitFormula(steps.map(x => x.text), W)
  const fbarH = fFit.ht
  if (fFit.lines > 1) {
    const avail = W - 102 - 22 - 8
    const wOf = str => textW(mk(str), font(700, fFit.px, F.mono))
    for (const st of steps) if (wOf(st.text) > avail) st.text = twoLines(st.raw, wOf, avail) || st.text
  }
  const gutter = G.gutter
  const keyLabel = ledger ? String((ledger.columns && ledger.columns[0]) || 'Year') : 'Year'
  const KEYPX = 44
  const keyW = Math.ceil(Math.max(90,
    ...[keyLabel, ...ledRows.map(r => String(r[0] ?? ''))].map(k => textW(mk(k), font(800, KEYPX), { letterSpacing: '-0.02em' })),
    textW(mk(valueLabel), font(700, 40))) + 2 * G.padX + 6)
  const serW = Math.floor((W - gutter - keyW) / Math.max(1, nS))
  const colX = [gutter, gutter + keyW]
  for (let i = 1; i < nS; i++) colX.push(gutter + keyW + i * serW)
  colX.push(W)
  const colW = colX.slice(0, -1).map((cx, j) => colX[j + 1] - cx)
  const swW = nS >= 3 ? 30 : 42, swGap = nS >= 3 ? 10 : 12

  // ---------- DOM: card, formula bar, header ----------
  const card = h('div', { class: 'cr-card', style: { left: X + 'px', top: cardTop + 'px', width: W + 'px' } })
  L.append(card)
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines })
  const fline = fbar.txt.parentElement
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gutter + 'px' } })
  const heads = h('div', { class: 'cr-heads' }, headNum)
  card.append(heads)
  const hcells = [h('div', { class: 'cr-hcell input', style: { left: colX[0] + 'px', width: colW[0] + 'px' } }, h('div', { class: 'ls-hl', html: mk(keyLabel) }))]
  heads.append(hcells[0])
  series.forEach((sr, i) => {
    const str = String(sr.name || '')
    const inner = colW[i + 1] - 2 * G.padX - swW - swGap + 8
    const m = /^(.+?)\s+(?:·|—|–|-|\()\s*(.+?)\)?$/.exec(str)
    const parts = textW(mk(str), font(800, S.label)) <= inner || !m ? [str] : [m[1], m[2]]
    const hl = h('div', { class: 'ls-hl', style: { gap: swGap + 'px' } }, swatch(colors[i], sr.dash, swW), h('span', { html: mk(parts[0]) }))
    const sl = parts[1] ? h('div', { class: 'ls-hsub', html: mk(parts[1]), style: { paddingLeft: swW + swGap + 'px' } }) : null
    const el = h('div', { class: 'cr-hcell', style: { left: colX[i + 1] + 'px', width: colW[i + 1] + 'px' } }, hl, sl)
    heads.append(el)
    hcells.push(el)
    let px = S.label
    while (px > S.labelMin && hl.scrollWidth > colW[i + 1] - 2 * G.padX + 8.5) { px -= 1; setStyle(hl, { fontSize: px + 'px' }) }
    if (sl && sl.scrollWidth > colW[i + 1] - 2 * G.padX + 8.5) setStyle(sl, { paddingLeft: '0px' })
  })
  const headH = Math.max(84, Math.ceil(Math.max(...hcells.map(el => el.scrollHeight)) + 20))
  for (const el of [headNum, ...hcells]) setStyle(el, { height: headH + 'px' })

  const ledH = ledger ? 66 : 0, valH = 74
  const headTop = fbarH, ledTop = headTop + headH, valTop = ledTop + ledH
  const cardH = valTop + valH
  const chartTop = cardTop + cardH
  setStyle(card, { height: cardH + 'px' })
  setStyle(heads, { top: headTop + 'px', height: headH + 'px' })
  const bottom = (caps || verdict ? G.workBottom : G.safeBottom - 4) - (fH ? fH + G.gap : 0)
  const chartH = bottom - chartTop

  // a sheet row: row number, key cell, one cell per rival
  const sheetRow = (top, ht, num, keyPx, valPx) => {
    const row = h('div', { class: 'cr-lrow', style: { top: top + 'px', height: ht + 'px' } },
      h('div', { class: 'ls-rn', 'data-deco': '', text: String(num), style: { width: gutter + 'px', height: ht + 'px' } }))
    const cells = colW.map((w, j) => {
      const v = h('span', { class: 'ls-v' })
      const el = h('div', { class: `cr-lcell ${j ? 'val' : 'key'}`, style: { left: colX[j] + 'px', width: w + 'px', height: ht + 'px', fontSize: (j ? valPx : keyPx) + 'px' } }, v)
      row.append(el)
      return { el, v }
    })
    card.append(row)
    return { row, cells }
  }
  const led = ledger ? sheetRow(ledTop, ledH, 2, KEYPX, 46) : null
  const vrow = sheetRow(valTop, valH, ledger ? 3 : 2, 40, 52)
  setStyle(vrow.cells[0].el, { fontWeight: '700', color: C.slate })
  setText(vrow.cells[0].v, valueLabel)

  // ---------- the opening hook row (one ledger row, tall, large) ----------
  let hook = null
  if (hookRow) {
    const ht = ledH + valH
    const el = h('div', { class: 'crv-hook', style: { top: ledTop + 'px', height: ht + 'px' } })
    const num = h('div', { class: 'ls-rn', 'data-deco': '', text: '2', style: { width: gutter + 'px', height: '100%' } })
    el.append(num)
    const vals = hookRow.slice(1, nS + 1).map(String)
    let px = 76
    while (px > 46 && vals.some((v, j) => textW(mk(v), font(800, px), { letterSpacing: '-0.02em' }) > colW[j + 1] - 2 * G.padX - 4)) px -= 2
    const keyPx = Math.min(60, Math.floor((colW[0] - 2 * G.padX - 4) / Math.max(1, textW(mk(String(hookRow[0])), font(800, 1), { letterSpacing: '-0.02em' }))))
    const cells = colW.map((w, j) => {
      const v = h('span', { class: 'ls-v' })
      const c = h('div', { class: 'crv-hcell' + (j ? '' : ' key'), style: { left: colX[j] + 'px', width: w + 'px', fontSize: (j ? px : keyPx) + 'px' } }, v)
      el.append(c)
      return { el: c, v }
    })
    card.append(el)
    hook = { el, ht, cells, px, vals }
  }

  // ---------- the finale: one hero row per rival ----------
  let hero = null
  if (FN && finaleT < Infinity) {
    const ht = headH + ledH + valH
    const rowH = Math.floor(ht / Math.max(1, nS))
    const el = h('div', { class: 'crv-hero', style: { top: headTop + 'px', height: ht + 'px' } })
    card.append(el)
    const last = ledRows[ledRows.length - 1]
    const nameX = gutter + 22
    const rows = series.map((sr, i) => {
      const top = i * rowH, rh = i === nS - 1 ? ht - top : rowH
      const r = h('div', { class: 'crv-hrow', style: { top: top + 'px', height: rh + 'px' } })
      r.append(h('div', { class: 'ls-rn', 'data-deco': '', text: String(i + 1), style: { width: gutter + 'px', height: rh + 'px' } }))
      const nm = h('div', { class: 'crv-hname', style: { left: nameX + 'px', color: colors[i] } }, swatch(colors[i], sr.dash, 42), h('span', { html: mk(shortName(sr, i)) }))
      const noteTxt = last ? `${last[0]}: ${last[i + 1]}` : ''
      const note = noteTxt ? h('div', { class: 'crv-hnote', html: mk(noteTxt), style: { left: nameX + 'px' } }) : null
      const val = h('div', { class: 'crv-hval', style: { left: '0px', right: '0px' } })
      const vtxt = h('span', { class: 'ls-v' })
      val.append(vtxt)
      r.append(nm)
      if (note) r.append(note)
      r.append(val)
      el.append(r)
      // name over note, centred as a block
      const blockH = 48 + (note ? 12 + 44 : 0)
      const y0 = Math.round((rh - blockH) / 2)
      setStyle(nm, { top: y0 + 'px', height: '48px' })
      if (note) setStyle(note, { top: y0 + 48 + 12 + 'px' })
      const ret = last ? displayValue(String(last[i + 1])) : NaN
      return { el: r, top, rh, nm, note, val, vtxt, ret, leftW: Math.max(textW(mk(shortName(sr, i)), font(800, 48)) + 56, note ? textW(mk(noteTxt), font(700, 40)) : 0) }
    })
    // the values: as large as fits right of the widest name block (94 px, at most 104)
    const avail = W - 40 - (nameX + Math.max(...rows.map(r => r.leftW)) + 36)
    const widest = px => Math.max(...finals.map(f => textW(mk(f), font(800, px), { letterSpacing: '-0.02em' })), ...series.map(sr => textW(mk(runFmt(Math.max(...sr.points.map(p => p[1])))), font(800, px), { letterSpacing: '-0.02em' })))
    let vpx = 104
    while (vpx > 60 && widest(vpx) > avail) vpx -= 2
    rows.forEach(r => setStyle(r.val, { fontSize: vpx + 'px' }))
    // odometers (integer finals): one rolling column per digit of the final, clipped (data-roll)
    const odos = series.map((sr, i) => {
      const tpl = parseDisplay(finals[i])
      if (!tpl || tpl.dp > 0) return null
      const pre = String(tpl.pre).replace(/^≈\s*/, '')
      const nd = String(Math.round(tpl.n)).length
      const dw = textW('0', font(800, vpx), { letterSpacing: '-0.02em' }), cw = textW(',', font(800, vpx), { letterSpacing: '-0.02em' })
      const root = h('span', { class: 'crv-odo', style: { letterSpacing: '-0.02em', color: C.ink } })
      root.append(h('span', { text: pre }))
      const cols = []
      for (let k = nd - 1; k >= 0; k--) {
        const strip = h('span', { class: 'crv-ds', text: '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0' })
        const col = h('span', { class: 'crv-dc', 'data-roll': '', style: { width: dw.toFixed(2) + 'px' } }, strip)
        root.append(col)
        cols.push({ k, col, strip })
        if (tpl.grouped && k > 0 && k % 3 === 0) root.append(h('span', { text: ',', style: { width: cw.toFixed(2) + 'px' } }))
      }
      if (tpl.post) root.append(h('span', { text: tpl.post }))
      rows[i].val.append(root)
      return { root, cols, n: tpl.n }
    })
    hero = { el, ht, rows, odos, vpx }
  }

  // ---------- the chart ----------
  const allVals = series.flatMap(sr => sr.points.map(p => p[1]))
  const startV = Math.max(...series.map(sr => sr.points[0][1]))
  const STRIP = events.length ? FLAG.ht + 22 : 0
  const nice = raw => { const q = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / q; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * q }
  const axisW = Math.max(40, ...(() => {
    const out = [], ymax = Math.max(...allVals) * 1.4
    const st = nice(ymax / 4)
    for (let v = st; v <= ymax * 1.2; v += st) out.push(textW(esc(axisFmt(v, yo.prefix, yo.suffix)), font(600, 32)))
    return out
  })(), ...rungs.map(r => textW(esc(r.label), font(800, 40)) - 8))
  const pad = { l: Math.max(70, Math.ceil(axisW) + 34), r: 30, t: 14, b: 56 }
  const plotW0 = W - pad.l - pad.r
  const plotH0 = chartH - pad.t - pad.b
  const topFrac = clamp((STRIP + 22) / Math.max(1, plotH0), 0.12, 0.3)
  let xEvery = d.x?.tickEvery || Math.max(1, [1, 2, 5, 10, 20, 25, 50].find(st => (x1 - x0) / st <= 5.5) || 50)
  const tickVals = st => { const v = []; for (let x = Math.ceil(x0 / st - 1e-9) * st; x <= x1 + 1e-9; x += st) v.push(x); return v }
  const roomy = st => (plotW0 * st) / (x1 - x0 || 1) >= Math.max(...tickVals(st).map(v => textW(String(Math.round(v)), font(600, 32)))) + 24
  for (const st of [1, 2, 4, 5, 10, 20, 25, 50, 100]) if (st > xEvery && !roomy(xEvery) && tickVals(st).length >= 2) xEvery = st
  let xTicks = tickVals(xEvery)
  if (!xEven) {
    const xEnd = Math.floor(x1 + 1e-9)
    if (Number.isInteger(x0) && (!xTicks.length || xTicks[0] - x0 > 1e-6)) xTicks.unshift(x0)
    if (!xTicks.length || xEnd - xTicks[xTicks.length - 1] > 1e-6) xTicks.push(xEnd)
  }
  const chart = lineChart(L, {
    x: X, y: chartTop, w: W, ht: chartH, pad,
    xr: [x0, x1], xEvery, xTicks, xFmt: v => String(Math.round(v)),
    yFmt: v => axisFmt(v, yo.prefix, yo.suffix), yTicks: 4,
    series: series.map((sr, i) => ({ points: sr.points, color: colors[i], width: 8, area: false, dash: sr.dash })),
    events: [],
  })
  chart.el.classList.add('cr-chart')
  const plot = chart.plot, box = chart.box
  const lx = x => x - box.x, ly = y => y - box.y
  const yLabEls = [...chart.el.querySelectorAll('.ls-axis.y')]
  const valueAt = (i, x) => chart.valueAt(i, x)
  // a ledger row's values are the data points at that close (rowT is rounded to 0.01 s: never read the line there)
  const closeVal = (i, x) => {
    let best = null
    for (const p of series[i].points) if (Math.abs(p[0] - x) < 0.05 && (!best || Math.abs(p[0] - x) < Math.abs(best[0] - x))) best = p
    return best ? best[1] : valueAt(i, x)
  }
  const rowVal = ledT.map(t => series.map((_, i) => closeVal(i, xOfT(t))))
  const start = series.map(sr => sr.points[0][1])
  // with a finale, the value row holds the close before the race end (the finals are the finale's)
  const steps2 = ledT.map(t => !(FN && finaleT < Infinity && t >= r1 - 0.05))
  const heldIdx = (() => { let k = -1; ledT.forEach((t, j) => { if (steps2[j]) k = j }); return k })()
  const held = series.map((_, i) => (heldIdx >= 0 ? rowVal[heldIdx][i] : start[i]))

  // the "money in" line at the stake
  const sameStart = series.every(sr => Math.abs(sr.points[0][1] - series[0].points[0][1]) < 1e-9)
  const stakeLine = sameStart && opt(spec, 'stakeLine', true) ? s('line', { stroke: '#98A2B3', 'stroke-width': 3, 'stroke-dasharray': '3 11', 'stroke-linecap': 'round' }) : null
  if (stakeLine) chart.svg.insertBefore(stakeLine, chart.svg.children[1])
  const moneyLbl = stakeLine ? h('div', { class: 'cr-money', 'data-deco': '', text: 'money in' }) : null
  if (moneyLbl) chart.el.append(moneyLbl)
  // event rules (drawn here, from the flag strip down to the axis) and doubling rungs
  const gRules = s('g', {})
  chart.svg.insertBefore(gRules, chart.svg.children[2] || null)
  const ruleEls = events.map(ev => { const l = s('line', { stroke: '#98A2B3', 'stroke-width': 3, 'stroke-dasharray': '10 10' }); gRules.append(l); return l })
  const rungEls = rungs.map(() => { const l = s('line', { stroke: '#475467', 'stroke-width': 3, 'stroke-dasharray': '14 10', 'stroke-linecap': 'round' }); gRules.append(l); return l })

  // ---------- overlay: selection, flags, rung labels, start tags ----------
  const over = h('div', { class: 'cr-over' })
  L.append(over)
  const sel = h('div', { class: 'cr-sel' }, h('i'))
  over.append(sel)
  const flags = events.map((ev, k) => {
    const txt = h('span', { class: 'cr-flagt', html: mk(ev.label || '') })
    const notch = h('b')
    const el = h('div', { class: 'crv-flag' }, notch, txt)
    over.append(el)
    const w = Math.ceil(textW(mk(ev.label || ''), font(700, 40), { letterSpacing: '-0.01em' }) + 42)
    const cx = chart.X(ev.x)
    const top = Math.round(plot.y + 8)
    const left = Math.round(clamp(cx - w / 2, plot.x + 8, Math.min(plot.x + plot.w, G.railX) - 4 - w))
    const nx = Math.round(clamp(cx - left - 9, 12, w - 30))
    setStyle(el, { left: left + 'px', top: top + 'px', width: w + 'px', transformOrigin: `${nx + 9}px 100%` })
    setStyle(notch, { left: nx + 'px' })
    attr(ruleEls[k], 'x1', lx(cx).toFixed(1)); attr(ruleEls[k], 'x2', lx(cx).toFixed(1))
    attr(ruleEls[k], 'y1', ly(top + FLAG.ht + 4).toFixed(1)); attr(ruleEls[k], 'y2', ly(plot.y + plot.h).toFixed(1))
    return { el, t: tOfX(ev.x), cx }
  })
  const runMax0 = Math.max(...series.map(sr => sr.points[0][1]))
  // the hook's question (lookOpts.hook.ask) waits over the empty race until the rewind
  const askTxt = hookRow && HK.ask ? String(HK.ask) : ''
  let ask = null
  if (askTxt) {
    const w = Math.ceil(textW(mk(askTxt), font(800, 46), { letterSpacing: '-0.012em' }) + 56)
    const el = h('div', { class: 'crv-ask', html: mk(askTxt) })
    over.append(el)
    const cx = plot.x + plot.w / 2
    // under the stake line, clear of the start tags (the lines have not left the line yet)
    const stakeY = plot.y + plot.h * (1 - startV / Math.max(startV * 1.6, runMax0 / (1 - topFrac)))
    setStyle(el, { left: Math.round(clamp(cx - w / 2, plot.x + 8, Math.min(plot.x + plot.w, G.railX) - w)) + 'px', top: Math.round(clamp(stakeY + 70, stakeY + 56, plot.y + plot.h - 90)) + 'px', width: w + 'px' })
    ask = { el }
  }
  const rungLbls = rungs.map(r => { const el = h('div', { class: 'crv-rung', text: r.label, style: { width: pad.l - 14 + 'px', left: box.x + 'px' } }); over.append(el); return el })
  // the start: each rival's name beside its dot while the race has not begun (frame 1: two runners at the line)
  const tags = series.map((sr, i) => { const el = h('div', { class: 'crv-tag', text: shortName(sr, i), style: { color: colors[i] } }); over.append(el); return el })

  // ---------- timing + duration ----------
  const D0 = durationOf(spec, { beats: [r1 + 0.6, ...landT.filter(isFinite).map(x => x + 0.6), ...ledT.map(x => x + 0.4)], hold: d.hold ?? 4, loop: loopOn })
  const D = spec.duration || D0
  const loopT0 = loopOn ? D - M.loopOut : Infinity
  const flagWin = flags.map((f, k) => ({ t0: f.t, t1: Math.min(f.t + flagHold, flags[k + 1] ? flags[k + 1].t - 0.02 : Infinity, loopT0) }))
  // once the last flag has gone, the strip's headroom goes back to the lines (over 1 s, so the rescale reads as one)
  const stripFree = flagWin.length ? flagWin[flagWin.length - 1].t1 : -Infinity
  const topAt = t => (t >= loopT0 ? topFrac : lerp(topFrac, Math.min(topFrac, 0.1), ease.inOut(prog(t, stripFree, 1.0))))

  // ---------- y scale: a running max (and any rung on show), under the flag strip ----------
  const runMax = x => {
    let m = -Infinity
    series.forEach((sr, i) => { for (const p of sr.points) if (p[0] <= x) m = Math.max(m, p[1]); m = Math.max(m, valueAt(i, x)) })
    return m
  }
  const yMaxAt = (x, t) => {
    let m = runMax(x)
    for (const r of rungs) { const w = t < loopT0 ? ease.inOut(prog(t, r.t, 0.4)) : 0; if (w > 0) m = Math.max(m, lerp(m, r.v * 1.04, w)) }
    return Math.max(startV * 1.6, m / (1 - topAt(t)))
  }

  // ---------- formula bar ----------
  const f0 = +opt(spec, 'formulaAt0', 0.7)
  const cut = steps[0].t <= 0 ? (f0 >= 1 ? mkLen(steps[0].text) : cutAt(steps[0].text, f0)) : 0
  function formulaState(t) {
    const first = steps[0]
    if (t >= loopT0) {
      let k = 0
      for (let j = 1; j < steps.length; j++) if (steps[j].t <= loopT0) k = j
      const showing = steps[k].text
      const len = k === 0 ? Math.max(cut, typedCount(loopT0, first.t, first.text, { from: cut })) : mkLen(showing)
      const e1 = 0.18
      if (t < loopT0 + e1) return { html: typedMk(showing, Math.round(len * (1 - prog(t, loopT0, e1)))), caret: true, src: showing }
      return { html: typedMk(first.text, Math.round(cut * prog(t, loopT0 + e1, 0.22))), caret: true, src: first.text }
    }
    let k = 0
    for (let j = 1; j < steps.length; j++) if (t >= steps[j].t) k = j
    if (k === 0) {
      const n = typedCount(t, Math.max(0, first.t), first.text, { from: cut })
      return { html: typedMk(first.text, n), caret: caretOn(t, t >= first.t && n < mkLen(first.text)), src: first.text }
    }
    const st = steps[k], prev = steps[k - 1]
    if (t < st.t + ERASE) return { html: typedMk(prev.text, Math.round(mkLen(prev.text) * (1 - prog(t, st.t, ERASE)))), caret: true, src: prev.text }
    const n = typedCount(t, st.t + ERASE, st.text, { cps: stepCps })
    return { html: typedMk(st.text, n), caret: caretOn(t, n < mkLen(st.text)), src: st.text }
  }

  // ---------- the selection: which cell, over time ----------
  const valRect = i => ({ x0: X + colX[i + 1], y0: cardTop + valTop, x1: X + colX[i + 2], y1: cardTop + valTop + valH })
  const hookRect = i => ({ x0: X + colX[i + 1], y0: cardTop + ledTop, x1: X + colX[i + 2], y1: cardTop + ledTop + ledH + valH })
  const heroRect = i => {
    const r = hero.rows[i], vw = widthOfHero(i)
    return { x0: Math.round(X + W - 40 - vw - 26), y0: cardTop + headTop + r.top, x1: X + W, y1: cardTop + headTop + r.top + r.rh }
  }
  const widthOfHero = i => Math.max(textW(mk(finals[i]), font(800, hero.vpx), { letterSpacing: '-0.02em' }), textW(mk(runFmt(held[i])), font(800, hero.vpx), { letterSpacing: '-0.02em' }))
  const focusAt = t => { let f = hookSer >= 0 ? hookSer : 0; for (const x of focus) if (x.t <= t) f = x.i; return f }
  const heroOn = t => hero && t >= finaleT + 0.15 && t < loopT0
  const selTarget = t => {
    if (t >= loopT0 + 0.2 || (hook && t < hookEnd)) return hook ? hookRect(hookSer) : valRect(focusAt(t))
    if (heroOn(t)) return heroRect(focusAt(t))
    return valRect(focusAt(t))
  }
  const selChanges = [hookEnd, ...focus.map(f => f.t), finaleT + 0.15, loopT0 + 0.2].filter(isFinite).sort((a, b) => a - b)

  // ---------- sound ----------
  steps.slice(1).forEach(st => { if (st.t < loopT0) ctx.cue(st.t + ERASE, 'type', { dur: Math.max(0.15, typeDur(st.text, { cps: stepCps })) }) })
  if (hook) { ctx.cue(hookEnd, 'whoosh', { dur: 0.45, gain: 0.45 }); ctx.cue(hookEnd + 0.05, 'swipe', { gain: 0.4 }) }
  ledT.forEach(t => { if (t < loopT0) ctx.cue(t, 'tick', { gain: 0.6 }) })
  flags.forEach(f => ctx.cue(f.t, 'thud', { gain: 0.7 }))
  rungs.forEach(r => ctx.cue(r.t, 'pop', { gain: 0.55 }))
  if (hero) {
    ctx.cue(finaleT, 'swipe', { gain: 0.5 })
    series.forEach((_, i) => { ctx.cue(rollT0[i], 'roll', { dur: Math.max(0.3, landT[i] - rollT0[i]) }); ctx.cue(landT[i], 'pop', { gain: 0.95 }) })
  }
  if (verdict) ctx.cue(verdict.t, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- the verdict card: the sheet's width, in the caption band ----------
  let vcard = null
  if (verdict) {
    vcard = verdictCard(L, verdict, { top: G.bandTop, bottom: G.bandBottom, x: X, w: W })
    setStyle(vcard.el, { left: X + 'px', width: W + 'px', justifyContent: 'center', zIndex: '6' })
  }

  const tipLo = plot.y
  const odoSet = (o, v) => {
    for (const { k, col, strip } of o.cols) {
      const unit = Math.pow(10, k)
      const on = k === 0 || v >= unit - 0.5
      setStyle(col, { display: on ? 'inline-block' : 'none' })
      let pos
      if (k === 0) { const f = v - Math.floor(v); pos = (Math.floor(v) % 10) + ease.inOut(f) }
      else {
        const q = Math.floor(v / unit + 1e-9) % 10
        const lower = v - Math.floor(v / unit + 1e-9) * unit
        pos = q + (lower > unit - 1 ? ease.inOut(lower - (unit - 1)) : 0)
      }
      setStyle(strip, { transform: `translateY(${(-Math.round(pos * 1000) / 1000)}em)` })
    }
  }

  return {
    duration: D0,
    chrome: {
      footer: { top: chartTop + chartH + G.gap },
      captions: caps,
      verdict: 'self',
      captionHidden: t => !!verdict && t >= verdict.t && t < loopT0 + 0.3,
      captionHolds: hero ? finals.map((f, i) => ({ text: f, t: landT[i] })) : [],
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      const looping = t >= loopT0
      const xNow = looping ? lerp(x1, xa, ease.inOut(prog(t, loopT0 + 0.02, 0.4))) : xOfT(t)

      // ---- formula bar ----
      const fs = formulaState(t)
      fbar.set(fs.html, { caret: fs.caret })
      setStyle(fline, { minHeight: fs.src.includes('\n') ? '2.4em' : '0px' })
      fbar.verdictStyle(false, 0)

      // ---- the hook row (frame 1) and its rewind; the loop brings it back ----
      const hookIn = hook ? (looping ? prog(t, loopT0 + 0.22, 0.24) : t < hookEnd ? 1 : 0) : 0
      const rw = hook && !looping ? prog(t, hookEnd, RW) : 1 // 0..1 through the rewind
      const hookShown = hook && (looping ? hookIn > 0 : t < hookEnd + RW)
      if (hook) {
        if (!hookShown) {
          setStyle(hook.el, { opacity: '0', height: hook.ht + 'px' })
          hook.cells.forEach(c => { setText(c.v, ''); setStyle(c.v, { opacity: '0', transform: 'none' }); setStyle(c.el, { backgroundColor: 'transparent' }) })
        } else {
          const rewinding = !looping && t >= hookEnd
          // the row shrinks back to a ledger row in the rewind's second half, uncovering the value row
          const shrink = rewinding ? ease.inOut(prog(t, hookEnd + 0.22, RW - 0.22)) : 0
          setStyle(hook.el, { opacity: '1', height: Math.round(lerp(hook.ht, ledH, shrink)) + 'px' })
          // the key counts back from the hook's year to the first row's
          const ya = parseInt(hookRow[0], 10), yb = parseInt((ledRows[0] || [])[0], 10)
          const keyTxt = rewinding && isFinite(ya) && isFinite(yb) ? String(Math.round(lerp(ya, yb, ease.inOut(prog(t, hookEnd, 0.4))))) : String(hookRow[0])
          setText(hook.cells[0].v, keyTxt)
          setStyle(hook.cells[0].el, { backgroundColor: 'transparent' })
          const kp = rewinding ? Math.round(lerp(hook.cells[0].el.style.fontSize ? parseFloat(hook.cells[0].el.style.fontSize) : KEYPX, KEYPX, shrink)) : null
          setStyle(hook.cells[0].v, { opacity: String(looping ? hookIn : 1), transform: kp ? `scale(${(kp / parseFloat(hook.cells[0].el.style.fontSize)).toFixed(4)})` : 'none' })
          for (let j = 1; j < hook.cells.length; j++) {
            const c = hook.cells[j], val = hook.vals[j - 1] ?? ''
            setText(c.v, val)
            const out = rewinding ? prog(t, hookEnd, 0.2) : 0
            const st = looping ? snapIn(hookIn) : { opacity: String(1 - ease.out(out)), transform: 'none' }
            const lit = j - 1 === hookSer
            setStyle(c.v, { ...st, color: lit ? C.ink : signColor(val) })
            const fillA = lit ? (looping ? hookIn : 1 - ease.out(prog(t, hookEnd, 0.25))) : 0
            setStyle(c.el, { backgroundColor: fillA > 0.001 ? (fillA >= 0.999 ? C.accent : mix(C.accent, C.sheet, fillA)) : 'transparent' })
          }
        }
      }
      // the rows under the hook row stay blank while it covers them
      // (through the loop clear they stay blank: the hero rows clear, then the hook row is back over them)
      const rowsHidden = looping || (!!hook && t < hookEnd + RW)
      const valHidden = looping || (!!hook && t < hookEnd + RW)
      const valIn = hook && !looping ? snapIn(prog(t, hookEnd + RW, M.drop)) : { opacity: '1', transform: 'none' }

      // ---- the finale's hero rows (they cover the header and both rows) ----
      const heroIn = hero ? (looping ? 0 : t < finaleT ? 0 : prog(t, finaleT + 0.15, FIN_IN - 0.15)) : 0
      const heroOut = hero && looping ? prog(t, loopT0, 0.2) : 0
      const sheetOut = hero && !looping && t >= finaleT ? 1 - prog(t, finaleT, 0.15) : 1 // the old rows clear first
      const heroVis = hero && !looping ? t >= finaleT + 0.15 : hero && looping && heroOut < 1 && t >= finaleT
      if (hero) {
        if (!heroVis) {
          setStyle(hero.el, { opacity: '0', clipPath: 'inset(0 0 100% 0)' })
        } else {
          const p = looping ? 1 : ease.inOut(heroIn)
          setStyle(hero.el, { opacity: String(looping ? 1 - heroOut : 1), clipPath: p >= 1 ? 'none' : `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)` })
        }
        const win = verdict ? finals.map(displayValue).reduce((b, v, i, a) => (v > a[b] ? i : b), 0) : -1
        const best = verdict ? hero.rows.map(r => r.ret).reduce((b, v, i, a) => (isFinite(v) && (!isFinite(a[b]) || v > a[b]) ? i : b), 0) : -1
        const vOn = verdict && !looping && t >= verdict.t ? ease.out(prog(t, verdict.t, 0.3)) : 0
        hero.rows.forEach((r, i) => {
          const o = hero.odos[i]
          const rolling = heroVis && o && t >= rollT0[i] && t < landT[i]
          const landed = t >= landT[i]
          if (o) setStyle(o.root, { opacity: rolling ? '1' : '0', display: rolling ? 'inline-flex' : 'none' })
          if (rolling) odoSet(o, lerp(held[i], o.n, ease.inOut(prog(t, rollT0[i], landT[i] - rollT0[i]))))
          setText(r.vtxt, rolling ? '' : landed ? finals[i] : runFmt(held[i]))
          const sn = landed && !looping ? snapIn(prog(t, landT[i], 0.3), 1.12) : { opacity: '1', transform: 'none' }
          setStyle(r.vtxt, { ...sn, color: landed ? C.ink : C.mute })
          // a pale flash as it lands; the decade winner turns yellow at the verdict
          const fl = landed && !looping ? flashAlpha(t, landT[i], 0.6) : 0
          const y = i === win ? vOn : 0
          const vw = widthOfHero(i)
          setStyle(r.val, {
            left: Math.round(W - 40 - vw - 26) + 'px',
            backgroundColor: y > 0.001 ? (y >= 0.999 ? C.accent : mix(C.accent, fl > 0.001 ? C.rowHi : C.sheet, y)) : fl > 0.001 ? mix(C.rowHi, C.sheet, fl) : 'transparent',
          })
          if (r.note) {
            const m = i === best ? vOn : 0
            setStyle(r.note, { backgroundColor: m > 0.001 ? (m >= 0.999 ? C.accent : mix(C.accent, C.sheet, m)) : 'transparent', color: m > 0.5 ? C.ink : signColor(r.note.textContent.split(': ').pop()) })
          }
        })
      }

      // ---- header, ledger row, value row ----
      const sheetA = hero && t >= finaleT && !looping ? sheetOut : hero && looping ? prog(t, loopT0 + 0.2, 0.2) : 1
      heads.querySelectorAll('.ls-hl, .ls-hsub').forEach(el => setStyle(el, { opacity: String(sheetA) }))
      if (led) {
        let k = -1
        if (!looping) for (let j = 0; j < ledRows.length; j++) if (ledT[j] <= t) k = j
        const row = ledRows[Math.max(0, k)] || []
        const keyOn = rowsHidden || sheetA < 0.15 ? 0 : sheetA
        setText(led.cells[0].v, String(row[0] ?? ''))
        setStyle(led.cells[0].v, { ...(k <= 0 ? { opacity: String(keyOn), transform: 'none' } : { ...snapIn(prog(t, ledT[k], M.drop)), opacity: String(Math.min(keyOn, +snapIn(prog(t, ledT[k], M.drop)).opacity)) }) })
        setStyle(led.cells[0].el, { color: k < 0 ? C.mute : C.ink })
        for (let j = 1; j < led.cells.length; j++) {
          const c = led.cells[j]
          if (k < 0 || rowsHidden) { setText(c.v, ''); setStyle(c.v, { opacity: '0', transform: 'none', color: C.ink }); setStyle(c.el, { backgroundColor: 'transparent' }); continue }
          const t0 = ledT[k] + 0.08 * (j - 1)
          const val = String(row[j] ?? '')
          setText(c.v, val)
          const st = snapIn(prog(t, t0, M.drop))
          setStyle(c.v, { ...st, opacity: String(Math.min(+st.opacity, sheetA)), color: signColor(val) })
          const fl = flashAlpha(t, t0 + 0.06)
          setStyle(c.el, { backgroundColor: fl > 0.001 && sheetA > 0.5 ? rgba(C.rowHi, fl) : 'transparent' })
        }
      }
      {
        let k = -1
        if (!looping) for (let j = 0; j < ledT.length; j++) if (ledT[j] <= t && steps2[j]) k = j
        const heldNow = !looping && FN && finaleT < Infinity && ledT.some((x, j) => !steps2[j] && x <= t)
        const keyA = valHidden ? 0 : sheetA
        setStyle(vrow.cells[0].v, { opacity: String(keyA) })
        for (let i = 0; i < nS; i++) {
          const c = vrow.cells[i + 1]
          const from = k >= 1 ? rowVal[k - 1][i] : start[i], to = k >= 0 ? rowVal[k][i] : start[i]
          const p = k >= 0 ? ease.out(prog(t, ledT[k], 0.35)) : 1
          setText(c.v, runFmt(lerp(from, to, p)))
          let accN = 0
          for (const r of rungs) if (!looping && t >= r.t && k >= 0 && to >= r.v && from < r.v) accN = Math.max(accN, 1 - ease.inOut(prog(t, r.t + 0.6, 0.9)))
          setStyle(c.v, { opacity: String(Math.min(keyA, +valIn.opacity)), transform: valIn.transform, color: heldNow ? C.mute : accN > 0.25 ? C.ink : colors[i] })
          // a pale flash as each close lands; a rung the value just crossed flashes it yellow
          let fl = k >= 0 && !looping ? flashAlpha(t, ledT[k] + 0.05, 0.5) : 0
          let acc = 0
          for (const r of rungs) if (!looping && t >= r.t && k >= 0 && to >= r.v && from < r.v) acc = Math.max(acc, 1 - ease.inOut(prog(t, r.t + 0.6, 0.9)))
          const bg = acc > 0.001 ? (acc >= 0.999 ? C.accent : mix(C.accent, C.sheet, acc)) : fl > 0.001 ? mix(C.rowHi, C.sheet, fl) : 'transparent'
          setStyle(c.el, { backgroundColor: keyA > 0.5 ? bg : 'transparent' })
        }
      }

      // ---- chart ----
      const tipPts = chart.draw(xNow, { yMax: yMaxAt(xNow, t) })
      if (stakeLine) {
        const yy = chart.Y(startV) - box.y
        attr(stakeLine, 'x1', lx(plot.x).toFixed(1)); attr(stakeLine, 'x2', lx(plot.x + plot.w).toFixed(1))
        attr(stakeLine, 'y1', yy.toFixed(1)); attr(stakeLine, 'y2', yy.toFixed(1))
        const mo = looping ? prog(t, loopT0 + 0.2, 0.25) : 1 - prog(t, Math.max(r0, hookEnd) + 2.0, 0.4)
        setStyle(moneyLbl, { left: Math.round(lx(plot.x + plot.w) - 130) + 'px', top: Math.round(yy + 12) + 'px', opacity: String(mo) })
      }
      // start tags: the rivals' names beside their dots until the race leaves the line
      const tagA = looping ? prog(t, loopT0 + 0.25, 0.2) : 1 - prog(t, Math.max(r0, hookEnd), 0.3)
      const tagOrder = series.map((_, i) => i).sort((a, b) => start[b] - start[a] || a - b)
      tags.forEach((el, i) => {
        const p = tipPts[i], kk = tagOrder.indexOf(i)
        setStyle(el, { left: Math.round(p.x + 24) + 'px', top: Math.round(p.y - 50 + kk * 52) + 'px', opacity: String(tagA > 0.01 ? tagA : 0) })
      })
      if (ask) {
        const a = looping ? prog(t, loopT0 + 0.25, 0.2) : 1 - prog(t, hookEnd, 0.25)
        setStyle(ask.el, { opacity: String(+a.toFixed(3)), transform: !looping && t >= hookEnd && a > 0 ? `translateY(${-Math.round(16 * (1 - a))}px)` : 'none' })
      }
      // rungs: dashed lines wipe in left to right at their values; labels in the axis margin
      const rungY = []
      rungs.forEach((r, k) => {
        const on = !looping && t >= r.t
        const yy = chart.Y(r.v)
        const p = on ? ease.out(prog(t, r.t, 0.45)) : 0
        attr(rungEls[k], 'x1', lx(plot.x).toFixed(1)); attr(rungEls[k], 'x2', lx(plot.x + plot.w * p).toFixed(1))
        attr(rungEls[k], 'y1', ly(yy).toFixed(1)); attr(rungEls[k], 'y2', ly(yy).toFixed(1))
        attr(rungEls[k], 'opacity', on ? 1 : 0)
        const st = on ? snapIn(prog(t, r.t, 0.24), 1.14) : { opacity: '0', transform: 'none' }
        setStyle(rungLbls[k], { ...st, top: Math.round(yy - 20) + 'px' })
        if (on && yy >= plot.y - 4) rungY.push(yy)
      })
      // axis labels give way to a rung label beside them
      yLabEls.forEach(el => {
        const yy = box.y + parseFloat(el.style.top || '0')
        if (rungY.some(ry => Math.abs(ry - yy) < 34)) setStyle(el, { opacity: '0' })
      })

      // ---- event flags in the strip at the plot's top; each rule fades with its flag ----
      flags.forEach((f, k) => {
        const w = flagWin[k]
        if (looping || t < w.t0 || t >= w.t1) { setStyle(f.el, { opacity: '0', transform: 'none' }); attr(ruleEls[k], 'opacity', 0); return }
        const st = snapIn(prog(t, w.t0, 0.22), 1.12)
        const a = Math.min(+st.opacity, 1 - prog(t, w.t1 - 0.25, 0.25))
        setStyle(f.el, { opacity: String(a), transform: st.transform })
        attr(ruleEls[k], 'opacity', +a.toFixed(3))
      })

      // ---- the selection ----
      let tc = -Infinity
      for (const c of selChanges) if (c <= t) tc = c
      const target = selTarget(t)
      let selR = target
      if (tc > -Infinity) selR = springRect(selTarget(tc - 1e-3), target, prog(t, tc, M.pick), 1.4)
      const o = 6
      const sx0 = Math.round(selR.x0 - o), sy0 = Math.round(selR.y0 - o)
      setStyle(sel, { opacity: hero && looping && t < loopT0 + 0.2 ? '0' : '1', left: sx0 + 'px', top: sy0 + 'px', width: Math.round(selR.x1 + o) - sx0 + 'px', height: Math.round(selR.y1 + o) - sy0 + 'px' })

      // ---- verdict ----
      if (vcard) vcard.seek(t, { out: loopOn ? ease.inOut(prog(t, loopT0, 0.3)) : 0 })
      void tipLo
    },
  }
}
