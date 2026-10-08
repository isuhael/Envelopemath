// live-sheet · pov-race (P6): "POV: you invested in X instead of paying $Y for X's product."
//
// One sheet card, top to bottom:
//   formula bar   the working, typed in turn (lookOpts.formulaBar [{ t, text }]; default "= <start> → ?", then
//                 "= <spend final> → <own final>" once the race ends). Operators stay glued to the token after
//                 them, so a line (or the frame-1 cut) never ends on a dangling "≈" or "×".
//   A B C         column letters (decoration: only when the chart still keeps 420 px)
//   row 1         labels: Year (mint) · spend.label (grey, red key line) · own.label (peach, green key line);
//                 "\n" in a label starts the grey sub-label
//   row 2         the start, frozen under a freeze-pane line (when the chart keeps 360 px)
//   history       up to 3 landed years (when the chart keeps 380 px; the silent layouts get them). The live row
//                 fills down through these slots as the first years land (the fill handle drags down), then
//                 each new year scrolls the rows above up under the frozen pane. Unfilled slots are empty,
//                 numbered sheet rows, so frame 1 reads as a real sheet.
//   live row      the year being raced: Spent (red) and Owned (green; red while under water) count with the
//                 chart. Each year-end lands with a tick and a yellow flash (on the history row that received
//                 it, or on the live row when there is no history) and the year rolls on.
//   chart         the spend line against the owned line, the gap between them tinted green or red, a y axis that
//                 rescales with the running maximum, purchase rings, and a dark price tag that pops when the race
//                 passes a purchase. Tags hang over the side the race has not drawn yet, and are gone before
//                 the final values land.
// Frame 1: the question card, the formula bar mid-typing, the start row filled (a money number at 0.0 s), the
// empty row being raced, and the chart waiting with the stake's tag. At raceT[1] the live row lands on the spec's
// final display strings (a word after the number, "spent", drops to a smaller second line when it will not fit),
// the row wipes yellow and the selection springs onto Owned. The verdict is a card in the caption band or is
// retyped into the formula bar (ink, heavier, the ≈ chip pops). The last 0.5 s rewind the chart and clear back
// to frame 1, so the short loops.
//
// spend.item (an icon name in FORMATS) is not drawn in this look: the Spent column's red key line and the price
// tags carry the purchase.
//
// lookOpts: loop (true) · formulaBar ([{ t, text }]) · formulaAt0 (0.7) · verdict ('band' | 'formula'; a verdict
//           typed into the bar is set in Inter 800 and does not size the bar)
//           · startLabel ('Start' when the start shares its year with the first year-end, else the year)
//           · yearLabel ('Year') · frozen ('auto' | bool) · history ('auto' | 0-4) · letters ('auto' | bool)
//           · gap (true: tint the gap between the lines)
import {
  h, s, setStyle, setText, setHTML, attr, clamp, lerp, prog, ease, C, G, M, S,
  formulaBar, fitFormula, lineChart, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn,
  snapIn, liftOut, popScale, flashAlpha, lerpRect, springRect, rgba, durationOf, hasCaptions, opt, layer, footerHeight,
  textW, font, fmtNum, plain, displayValue, fitBarVerdict, HANDLE_PAD,
} from '../lib.js'

export const css = `
.pov-card .ls-chart.sheet { border-radius: 0; }
.pov-card .ls-sel { z-index: 6; }
.pov-card .ls-v { text-align: right; }
.pov-card .ls-cell.left .ls-v { text-align: left; }
.pov-sep { position: absolute; left: 0; right: 0; height: 3px; background: #D0D5DD; z-index: 2; }
.ls-row.pov-frozen { border-bottom: 4px solid #C4CAD4; z-index: 2; }
.pov-hist { position: absolute; left: 0; right: 0; overflow: hidden; z-index: 1; }
.ls-row.pov-live { z-index: 2; }
.ls-cell.pov-yc { display: grid; align-items: center; justify-items: start; overflow: hidden; }
.pov-yc > span { grid-area: 1 / 1; }
.ls-cell.right.pov-yc { justify-items: end; }
.pov-u { font-size: 40px; font-weight: 700; letter-spacing: -0.005em; }
.pov-two .pov-u { display: block; line-height: 1; margin-top: 6px; }
.ls-cell.pov-lift { padding-bottom: 46px; }
.pov-card .ls-cell.mid { font-weight: 800; }
.pov-key { position: absolute; left: 0; right: 0; bottom: 0; height: 7px; }
.pov-tag {
  position: absolute; top: 0; left: 0; height: 60px; padding: 0 20px; border-radius: 14px; background: #101828;
  display: flex; align-items: center; gap: 12px; white-space: nowrap; opacity: 0; z-index: 3;
  font: 600 40px/1 'Inter', 'Inter Full', sans-serif; color: #FFFFFF; letter-spacing: -0.01em;
}
.pov-tag b { color: #FF6B5B; font-weight: 800; }
.pov-tag i { position: absolute; width: 20px; height: 20px; background: #101828; border-radius: 3px; transform: rotate(45deg); }
.pov-tag.two { height: 112px; padding: 12px 20px; align-items: flex-start; }
.pov-tag.two > span { display: flex; flex-direction: column; gap: 4px; line-height: 42px; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LETTERS = 'ABC'
/**
 * Glue every operator to the token after it (a no-break space), so the working never ends a line, or the
 * frame-1 cut, on a dangling "≈" / "×" / "=": "… × $93.76 / ≈ $17,700", not "… × $93.76 ≈ / $17,700".
 * The visible text is unchanged.
 */
const glueOps = str => String(str).replace(/(^|\s)([=≈×÷→+−-])[ ]/g, '$1$2 ')

/** linear interpolation through [[x, v]…] (held flat outside the points) */
function valAt(pts, x) {
  if (!pts.length) return 0
  if (x <= pts[0][0]) return pts[0][1]
  for (let k = 1; k < pts.length; k++) {
    if (x <= pts[k][0]) {
      const [x0, v0] = pts[k - 1], [x1, v1] = pts[k]
      return lerp(v0, v1, (x - x0) / (x1 - x0 || 1))
    }
  }
  return pts[pts.length - 1][1]
}

/** a value display string split into the number part and trailing words ("$499 spent" → "$499" + "spent") */
function splitValue(str) {
  const v = String(str), m = /\d/.exec(v)
  if (!m) return { main: v, suf: '' }
  const re = /\s+(?=[A-Za-z])/g
  re.lastIndex = m.index
  const r = re.exec(v)
  return r ? { main: v.slice(0, r.index), suf: v.slice(r.index + r[0].length) } : { main: v, suf: '' }
}
/** a value cell's HTML; the text content stays exactly the display string */
const valueHTML = str => {
  const { main, suf } = splitValue(str)
  return suf ? `${esc(main)} <span class="pov-u">${esc(suf)}</span>` : esc(main)
}

export default function povRace(spec, ctx) {
  const d = spec.data || {}
  const SP = d.spend || {}, OW = d.own || {}
  const byX = (a, b) => a[0] - b[0]
  const sp = (SP.points || []).filter(p => p && isFinite(p[0]) && isFinite(p[1])).slice().sort(byX)
  const ow = (OW.points || []).filter(p => p && isFinite(p[0]) && isFinite(p[1])).slice().sort(byX)
  if (!sp.length) sp.push([0, 0])
  if (!ow.length) ow.push([0, 0])
  const xo = d.x || {}, yo = d.y || {}
  const firstX = Math.min(sp[0][0], ow[0][0]), lastX = Math.max(sp[sp.length - 1][0], ow[ow.length - 1][0])
  const xFrom = xo.from ?? Math.floor(firstX), xTo = xo.to ?? lastX
  const xs = Math.max(xFrom, firstX)
  let xe = Math.min(xTo, lastX)
  if (!(xe > xs)) xe = xs + 1
  const [r0, r1] = Array.isArray(d.raceT) && d.raceT.length === 2 ? d.raceT : [1.5, 18]
  const raceDur = Math.max(0.5, r1 - r0)
  const tOfX = x => r0 + ((x - xs) / (xe - xs)) * raceDur
  const xRace = t => lerp(xs, xe, prog(t, r0, raceDur))
  const fmtV = v => fmtNum(v, { prefix: yo.prefix ?? '$', suffix: yo.suffix ?? '', dp: yo.dp ?? 0 })
  const caps = hasCaptions(spec)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const vMode = verdict ? (opt(spec, 'verdict', 'band') === 'formula' ? 'formula' : 'band') : 'none'
  const loopOn = opt(spec, 'loop', true)

  // ---------- the ledger rows: the start, then every point (year-end) the race passes ----------
  let X = [...new Set([...sp, ...ow].map(p => p[0]))].filter(x => x > xs + 0.02 && x <= xe + 1e-9).sort((a, b) => a - b)
  X = X.filter((x, i) => i === 0 || x - X[i - 1] > 0.02)
  if (!X.length || X[X.length - 1] < xe - 0.02) X.push(xe)
  // keep at least ~0.5 s per row: thin out dense data (the first and the last year-end always stay)
  const maxRows = Math.max(1, Math.floor(raceDur / 0.5))
  if (X.length > maxRows) {
    const keep = []
    for (let i = 0; i < maxRows; i++) keep.push(X[Math.round(((i + 1) * X.length) / maxRows) - 1])
    X = [...new Set(keep)]
  }
  X.unshift(xs)
  const N = X.length
  const T = X.map((x, k) => (k === 0 ? -Infinity : k === N - 1 ? r1 : tOfX(x)))
  const spV = X.map(x => valAt(sp, x)), owV = X.map(x => valAt(ow, x))
  const year = x => Math.floor(x + 1e-6)
  // a year with one row reads "2016"; a year with several rows labels each with its month ("Apr 2016")
  const perYear = new Map()
  for (let k = 1; k < N; k++) perYear.set(year(X[k]), (perYear.get(year(X[k])) || 0) + 1)
  const labels = X.map((x, k) => (k > 0 && perYear.get(year(x)) > 1 ? `${MON[Math.min(11, Math.floor((x - year(x)) * 12 + 1e-6))]} ${year(x)}` : String(year(x))))
  labels[0] = String(opt(spec, 'startLabel', N > 1 && year(X[1]) === year(X[0]) ? 'Start' : labels[0]))

  // the start row shows the purchase's own price string when the race starts on a purchase
  const purchases = (d.purchases || []).filter(p => p && isFinite(p.x) && p.x >= xs - 0.02 && p.x <= xe + 0.02).sort((a, b) => a.x - b.x)
  const p0 = purchases.find(p => Math.abs(p.x - xs) <= 0.02)
  const spStart = p0 && p0.price && Math.abs(displayValue(p0.price) - spV[0]) < 0.005 ? p0.price : fmtV(spV[0])
  const owStart = p0 && p0.price && Math.abs(owV[0] - spV[0]) < 0.005 ? spStart : fmtV(owV[0])
  const spFinal = SP.final || fmtV(spV[N - 1]), owFinal = OW.final || fmtV(owV[N - 1])
  const histText = (k, which) => (k === 0 ? (which ? owStart : spStart) : fmtV(which ? owV[k] : spV[k]))
  const ownBad = (a, b) => a < b - 1e-9
  const ownColor = (a, b) => (ownBad(a, b) ? C.bad : C.good)

  // ---------- formula bar entries ----------
  let fe = opt(spec, 'formulaBar', null)
  if (!Array.isArray(fe) || !fe.length) {
    fe = [{ t: 0, text: d.formula || `= ${spStart} → ?` }]
    fe.push({ t: r1 + 0.5, text: `= ${spFinal} → ${owFinal}` })
  }
  fe = fe.map(e => (typeof e === 'string' ? { t: 0, text: e } : { t: +e.t || 0, text: String(e.text || '') }))
  if (vMode === 'formula') fe.push({ t: verdict.t, text: fitBarVerdict(verdict.text, G.width).text, verdict: true })
  fe = fe.filter(e => e.text).map(e => ({ ...e, text: glueOps(e.text) })).sort((a, b) => a.t - b.t || !!a.verdict - !!b.verdict)
  if (!fe.length) fe.push({ t: 0, text: glueOps(`= ${spStart} → ?`) })

  // ---------- duration ----------
  const cut = fe[0].t <= 0 ? wordCut(fe[0].text, opt(spec, 'formulaAt0', 0.7)) : 0
  const fx = fe.map((e, i) => {
    const erase = i > 0 ? 0.16 : 0
    const start = e.t + erase
    const len = mkLen(e.text)
    const next = fe[i + 1] ? fe[i + 1].t : Infinity
    const from = i === 0 ? cut : 0
    const room = next - start - 0.8
    const cps = isFinite(room) && room > 0.3 ? Math.max(M.cps, (len - from) / room) : M.cps
    return { ...e, erase, start, len, from, cps: e.verdict ? Math.max(26, cps) : cps, end: start + Math.max(0, len - from) / cps }
  })
  const beats = [r1 + 0.6, ...fx.map(e => e.end)]
  const vfx = fx.find(e => e.verdict)
  const duration = durationOf(spec, { beats: beats.filter((b, i) => !fx[i - 1] || !fx[i - 1].verdict), hold: d.hold ?? 4, loop: loopOn, verdictEnd: vfx ? vfx.end : null })
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------- column widths and type sizes ----------
  const Wd = G.width, gutter = G.gutter, padX = G.padX
  const avail = Wd - gutter
  const ls = { letterSpacing: '-0.01em' }
  const lo = Math.min(...sp.map(p => p[1]), ...ow.map(p => p[1])), hi = Math.max(...sp.map(p => p[1]), ...ow.map(p => p[1]))
  const spStrs = [spStart, spFinal, ...X.map((_, k) => histText(k, 0)), fmtV(hi), fmtV(lo)]
  const owStrs = [owStart, owFinal, ...X.map((_, k) => histText(k, 1)), fmtV(hi), fmtV(lo)]
  const mainW = (strs, px) => Math.max(...strs.map(x => textW(esc(splitValue(x).main), font(800, px), ls)))
  const sufW = strs => Math.max(0, ...strs.map(x => { const sv = splitValue(x); return sv.suf ? textW(esc(sv.suf), font(700, 40)) : 0 }))
  const yearW = px => Math.max(...labels.map(l => textW(esc(l), font(800, px), ls)))
  let vPx = S.result, yPx = 52
  const needFor = () => [
    Math.max(yearW(yPx), textW(mk(String(opt(spec, 'yearLabel', 'Year'))), font(800, S.label))) + 2 * padX + 6,
    Math.max(mainW(spStrs, vPx), sufW([spFinal])) + 2 * padX + 6,
    Math.max(mainW(owStrs, vPx), sufW([owFinal])) + 2 * padX + 6 + HANDLE_PAD, // the Owned column keeps the fill handle's clearance
  ]
  let need = needFor()
  for (let k = 0; k < 8 && need.reduce((a, b) => a + b, 0) > avail; k++) {
    const f = avail / need.reduce((a, b) => a + b, 0)
    vPx = Math.max(44, Math.floor(vPx * f)); yPx = Math.max(40, Math.floor(yPx * f))
    need = needFor()
  }
  // labels: the width each needs on one line, and on two (split at its best word break, at the 40 px floor)
  const labelTexts = [String(opt(spec, 'yearLabel', 'Year')), SP.label || 'Spent', OW.label || 'Owned']
  const labelNeed = labelTexts.map(lab => {
    const parts = String(lab).split('\n')
    const sub = parts.slice(1).join(' ')
    const wSub = sub ? textW(mk(sub), font(600, S.sub)) : 0
    const words = plain(parts[0]).split(/\s+/).filter(Boolean)
    const one = Math.max(textW(mk(parts[0]), font(800, S.label)), wSub)
    let two = textW(mk(parts[0]), font(800, S.labelMin))
    for (let i = 1; i < words.length; i++) {
      two = Math.min(two, Math.max(textW(esc(words.slice(0, i).join(' ')), font(800, S.labelMin)), textW(esc(words.slice(i).join(' ')), font(800, S.labelMin))))
    }
    return { one: one + 2 * padX + 4, two: Math.max(two, sub ? Math.min(wSub, one) : 0) + 2 * padX + 4 }
  })
  const colW = (() => {
    // every column gets its values, and its label in two lines if the card allows; the spare width goes first to
    // labels that would still wrap, then evenly to the two value columns
    let base = need.map((n, j) => Math.max(n, labelNeed[j].two))
    if (base.reduce((a, b) => a + b, 0) > avail) base = need.slice()
    let left = avail - base.reduce((a, b) => a + b, 0)
    const want = base.map((b, j) => Math.max(0, labelNeed[j].one - b))
    const wantSum = want.reduce((a, b) => a + b, 0)
    const w = base.map((b, j) => b + (wantSum ? Math.min(want[j], (want[j] * left) / wantSum) : 0))
    left = avail - w.reduce((a, b) => a + b, 0)
    // even out the two value columns where possible (Spent and Owned side by side read as a pair)
    const diff = w[2] - w[1]
    const give = Math.min(Math.abs(diff), left)
    if (diff > 0) w[1] += give; else w[2] += give
    left -= give
    w[1] += left / 2; w[2] += left / 2
    const r = w.map(Math.floor)
    r[2] = avail - r[0] - r[1]
    return r
  })()
  const colX = [gutter, gutter + colW[0], gutter + colW[0] + colW[1]]
  const inner = j => colW[j] - 2 * padX - 4
  // a final with a word after its number ("$9,000 spent") takes two lines when one will not fit
  const oneLine = (str, j) => { const sv = splitValue(str); return !sv.suf || mainW([str], vPx) + textW(' ' + esc(sv.suf), font(700, 40)) <= inner(j) }
  const twoSp = !oneLine(spFinal, 1), twoOw = !oneLine(owFinal, 2)
  const liveH = twoSp || twoOw ? Math.max(118, vPx + 64) : Math.max(100, vPx + 44)
  const histH = 84
  const hValPx = Math.min(vPx, 48), hYearPx = Math.min(yPx, 44)

  // ---------- vertical layout ----------
  const fH = footerHeight(spec.footer)
  const bandUsed = caps || vMode === 'band'
  const cardBottom = (bandUsed ? G.workBottom : G.safeBottom - 4) - (fH ? fH + G.gap : 0)
  const cardH = cardBottom - G.cardTop
  const fFit = fitFormula(fe.filter(e => !e.verdict).map(e => e.text), Wd)
  const fbarH = fFit.ht

  const L = layer(ctx, 'pov')
  const card = h('div', { class: 'ls-card pov-card', style: { left: G.left + 'px', top: G.cardTop + 'px', width: Wd + 'px', height: cardH + 'px' } })
  L.append(card)
  const fbar = formulaBar(card, { x: 0, y: 0, w: Wd, ht: fbarH, px: fFit.px, lines: fFit.lines, verdict: vMode === 'formula' ? verdict.text : null })

  // label row (built first so its height is known; placed once the rest of the layout is decided)
  const kinds = ['input', 'mid', 'output']
  const keyColor = [null, C.bad, C.good]
  const heads = h('div', { class: 'ls-heads' })
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gutter + 'px' } })
  heads.append(headNum)
  const labelEls = labelTexts.map((lab, j) => {
    const parts = String(lab).split('\n')
    const el = h('div', { class: `ls-hcell ${kinds[j]}`, style: { left: colX[j] + 'px', width: colW[j] + 'px' } },
      h('div', { class: 'ls-hl', html: mk(parts[0]) }),
      parts.length > 1 ? h('div', { class: 'ls-hsub', html: mk(parts.slice(1).join(' ')) }) : null,
      keyColor[j] ? h('i', { class: 'pov-key', style: { background: keyColor[j] } }) : null)
    heads.append(el)
    return el
  })
  card.append(heads)
  // a label part stays on one line at full size when it fits, else it wraps (balanced) at the 40 px floor.
  // (style.css pairs white-space: nowrap with text-wrap: balance, which turns wrapping back on, so set both here)
  let labelH = 0
  labelEls.forEach((el, j) => {
    const w = colW[j] - 2 * padX
    for (const part of el.querySelectorAll('.ls-hl, .ls-hsub')) {
      const sub = part.classList.contains('ls-hsub')
      const fits = textW(part.innerHTML, font(sub ? 600 : 800, sub ? S.sub : S.label), { letterSpacing: sub ? '-0.01em' : '-0.012em' }) <= w
      setStyle(part, fits ? { whiteSpace: 'nowrap' } : { whiteSpace: 'normal', fontSize: (sub ? S.sub : S.labelMin) + 'px' })
    }
    labelH = Math.max(labelH, el.scrollHeight)
  })
  labelH = Math.max(76, Math.ceil(labelH + 24))

  // what fits: the chart keeps its room first, then the frozen start row, history rows (content: the last
  // landed years) and, last, the column letters (decoration)
  const chartMin = 360, chartHist = 380, chartIdeal = 420
  let rest = cardH - fbarH - labelH - liveH
  const fOpt = opt(spec, 'frozen', 'auto')
  const frozen = fOpt === true || (fOpt === 'auto' && rest - histH >= chartMin)
  if (frozen) rest -= histH
  const lOpt = opt(spec, 'letters', 'auto')
  const hOpt = opt(spec, 'history', 'auto')
  let H = 0
  const hMax = hOpt === 'auto' ? 3 : clamp(+hOpt || 0, 0, 4)
  const lettersFirst = lOpt === true ? G.lettersH : 0
  while (H < hMax && N - 2 > H && rest - lettersFirst - histH >= (hOpt !== 'auto' ? 200 : chartHist)) { H++; rest -= histH }
  const letters = lOpt === true || (lOpt === 'auto' && rest - G.lettersH >= chartIdeal)
  if (letters) rest -= G.lettersH
  const chartH = rest

  const lettersH = letters ? G.lettersH : 0
  const headY = fbarH + lettersH
  const frozenY = headY + labelH
  const histY = frozenY + (frozen ? histH : 0)
  const liveY = histY + H * histH
  const chartY = liveY + liveH
  setStyle(heads, { top: headY + 'px', height: labelH + 'px' })
  labelEls.forEach(el => setStyle(el, { height: labelH + 'px' }))
  setStyle(headNum, { height: labelH + 'px' })

  let letterEls = []
  if (letters) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fbarH + 'px', height: lettersH + 'px' } },
      h('i', { class: 'ls-corner', style: { width: gutter + 'px' } }))
    letterEls = colX.map((x, j) => h('b', { text: LETTERS[j], style: { left: x + 'px', width: colW[j] + 'px' } }))
    row.append(...letterEls)
    card.append(row)
  }

  // ---------- rows ----------
  function mkRow(ht, cls = '', { yearRoll = false } = {}) {
    const num = h('div', { class: 'ls-rn', 'data-deco': '', style: { width: gutter + 'px', height: ht + 'px' } })
    const cells = colX.map((x, j) => {
      const v = h('span', { class: 'ls-v', style: { color: C.ink } })
      const old = j === 0 && yearRoll ? h('span', { class: 'ls-v pov-old' }) : null
      const el = h('div', {
        class: `ls-cell ${kinds[j]} ${j === 0 ? 'left' : 'right'}${j === 0 && yearRoll ? ' pov-yc' : ''}`,
        ...(j === 0 && yearRoll ? { 'data-roll': '' } : {}),
        style: { left: x + 'px', width: colW[j] + 'px', height: ht + 'px', ...(j === 2 ? { paddingRight: padX + HANDLE_PAD + 'px' } : {}) },
      }, old, v)
      return { el, v, old }
    })
    const row = h('div', { class: 'ls-row ' + cls, style: { height: ht + 'px' } }, num, ...cells.map(c => c.el))
    return { row, num, cells }
  }
  const setFonts = (r, yp, vp) => r.cells.forEach((c, j) => setStyle(c.el, { fontSize: (j ? vp : yp) + 'px' }))

  // frozen start row
  let fz = null
  if (frozen) {
    fz = mkRow(histH, 'pov-frozen')
    setStyle(fz.row, { top: frozenY + 'px' })
    setFonts(fz, hYearPx, hValPx)
    setText(fz.num, '2')
    setText(fz.cells[0].v, labels[0])
    setText(fz.cells[1].v, spStart); setStyle(fz.cells[1].v, { color: C.bad })
    setText(fz.cells[2].v, owStart); setStyle(fz.cells[2].v, { color: ownColor(owV[0], spV[0]) })
    card.append(fz.row)
  }
  // history: the landed years. The live row fills down through these H slots as the first years land (the
  // fill handle drags down), then each new year scrolls the rows above it up under the frozen pane. Until a slot
  // is filled, it shows as an empty, numbered sheet row under the live row.
  const hist = []
  let histBox = null
  const future = []
  for (let m = 1; m <= H; m++) {
    const r = mkRow(histH, 'pov-future')
    setStyle(r.row, { top: chartY - m * histH + 'px' })
    card.append(r.row)
    future.push(r)
  }
  if (H > 0) {
    histBox = h('div', { class: 'pov-hist', 'data-roll': '', style: { top: histY + 'px', height: H * histH + 'px' } })
    for (let p = 0; p <= H; p++) {
      const r = mkRow(histH)
      setFonts(r, hYearPx, hValPx)
      histBox.append(r.row)
      hist.push(r)
    }
    card.append(histBox)
  }
  // the live row
  const lv = mkRow(liveH, 'pov-live', { yearRoll: true })
  setStyle(lv.row, { top: liveY + 'px' })
  setFonts(lv, yPx, vPx)
  card.append(lv.row)
  const sel = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  card.append(sel)

  // ---------- chart ----------
  const pad = { l: 128, r: 48, t: 34, b: 66 }
  const startMax = Math.max(spV[0], owV[0])
  const yFloor = Math.max(startMax * 2.2, Math.max(spV[1] ?? 0, owV[1] ?? 0) * 1.3, 1)
  const near = (a, b) => Math.abs(a - b) < 1e-6
  const yFmt = v => {
    const a = Math.abs(v), pre = yo.prefix ?? '$'
    for (const [u, k] of [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) if (a >= u) return fmtNum(v / u, { prefix: pre, dp: near(v / u, Math.round(v / u)) ? 0 : 1 }) + k
    return fmtNum(v, { prefix: pre, dp: near(v, Math.round(v)) ? 0 : 1 })
  }
  const chart = lineChart(card, {
    x: 0, y: chartY, w: Wd, ht: chartH, pad,
    xr: [xFrom, xTo], xEvery: xo.tickEvery, xFmt: v => String(Math.round(v)),
    yr: [0, yFloor], yTicks: 4, yFmt,
    series: [
      { points: sp, color: C.bad, width: 7, area: false },
      { points: ow, color: C.good, width: 8, area: false },
    ],
    events: d.events || [],
  })
  card.append(h('div', { class: 'pov-sep', style: { top: chartY - 1 + 'px' } }))
  const svgY = y => (y - chartY).toFixed(1)
  // the gap between the lines: green while owning beats spending, red while it does not
  const gapOn = opt(spec, 'gap', true)
  const gapG = s('g', {})
  const gapPos = s('path', { fill: C.good, 'fill-opacity': 0.13 })
  const gapNeg = s('path', { fill: C.bad, 'fill-opacity': 0.1 })
  gapG.append(gapPos, gapNeg)
  chart.svg.insertBefore(gapG, chart.svg.childNodes[2])
  // purchase markers (rings on the spend line) and the price tag of the latest one
  const markG = s('g', {})
  const marks = purchases.map(() => { const c = s('circle', { r: 9, fill: C.sheet, stroke: C.bad, 'stroke-width': 5, opacity: 0 }); markG.append(c); return c })
  chart.svg.insertBefore(markG, chart.svg.lastChild)
  const tagNotch = h('i')
  const tagTxt = h('span')
  const tag = h('div', { class: 'pov-tag' }, tagNotch, tagTxt)
  card.append(tag)
  const tagHTML = purchases.map(p => `${p.label ? esc(p.label) + ' ' : ''}<b>${esc(p.price || '')}</b>`)
  const tagW = tagHTML.map(x => textW(x, font(600, 40), ls) + 40)
  const tagT = purchases.map(p => (p.x <= xs + 0.02 ? 0 : tOfX(p.x)))
  const startTag = tagT.lastIndexOf(0)
  // a tag shows for ~1.7 s, but is gone before the final values land (one focal number at a time)
  // (the frame-1 tag names the stake, and leaves as the race starts drawing into it)
  const tagOut = i => {
    if (tagT[i] <= 0) return r0 + 0.3
    const t0 = Math.max(tagT[i], r0)
    return Math.max(t0 + 0.8, Math.min(t0 + 1.7, r1 - 0.3))
  }
  const xAll = [...new Set([...sp, ...ow].map(p => p[0]))].sort((a, b) => a - b)
  const runMax = x => {
    let m = Math.max(valAt(sp, x), valAt(ow, x))
    for (const p of sp) if (p[0] <= x) m = Math.max(m, p[1])
    for (const p of ow) if (p[0] <= x) m = Math.max(m, p[1])
    return m
  }
  const yMaxAt = x => Math.max(runMax(x) * 1.18, yFloor)
  function gapPaths(xEnd) {
    if (!gapOn || xEnd <= xs + 1e-6) return ['', '']
    const xsS = [xs, ...xAll.filter(x => x > xs && x < xEnd), xEnd]
    const pts = xsS.map(x => ({ x, a: valAt(ow, x), b: valAt(sp, x) }))
    const pos = [], neg = []
    const P = (x, v) => `${chart.X(x).toFixed(1)} ${svgY(chart.Y(v))}`
    const poly = run => 'M' + run.map(p => P(p.x, p.a)).join('L') + 'L' + run.slice().reverse().map(p => P(p.x, p.b)).join('L') + 'Z'
    let cur = [pts[0]], sign = Math.sign(pts[0].a - pts[0].b)
    const flush = () => { if (cur.length >= 2 && sign) (sign > 0 ? pos : neg).push(poly(cur)) }
    for (let i = 1; i < pts.length; i++) {
      const q = pts[i - 1], p = pts[i]
      const sq = Math.sign(q.a - q.b), sg = Math.sign(p.a - p.b)
      if (sq && sg && sq !== sg) {
        const f = (q.a - q.b) / ((q.a - q.b) - (p.a - p.b))
        const c = { x: lerp(q.x, p.x, f), a: lerp(q.a, p.a, f), b: lerp(q.a, p.a, f) }
        cur.push(c); flush(); cur = [c, p]; sign = sg
      } else { cur.push(p); if (!sign) sign = sg }
    }
    flush()
    return [pos.join(''), neg.join('')]
  }

  // ---------- timing helpers ----------
  const landedIdx = t => { let n = 0; for (let k = 1; k < N; k++) if (t >= T[k]) n = k; return n }
  const liveIdxAt = t => (!frozen && t < r0 ? 0 : Math.min(N - 1, landedIdx(t) + 1))
  const changeT = i => (i <= 0 ? -Infinity : i === 1 ? (frozen ? -Infinity : r0) : T[i - 1])
  // history entries: the rows that scroll up out of the live row, and when each one is pushed
  const entries = []
  for (let k = frozen ? 1 : 0; k <= N - 2; k++) entries.push({ k, t: k === 0 ? r0 : T[k] })
  const scrollAt = t => entries.reduce((a, e) => a + ease.out(prog(t, e.t + 0.04, 0.3)), 0)
  const finalP = t => prog(t, r1, M.drop)
  const wipeT = r1 + 0.16, springT = r1 + 0.34

  // ---------- formula bar ----------
  const fbarState = t => {
    if (t >= loopT0) {
      const cur = fbarState(loopT0 - 1e-4)
      const e1 = 0.22
      if (t < loopT0 + e1) return { html: typedMk(cur.str, Math.round(cur.n * (1 - prog(t, loopT0, e1)))), caret: true, str: cur.str, n: cur.n }
      return { html: typedMk(fe[0].text, Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true, str: fe[0].text, n: cut }
    }
    let i = -1
    for (let k = 0; k < fx.length; k++) if (t >= fx[k].t || (k === 0 && fx[0].t <= 0)) i = k
    if (i < 0) return { html: '', caret: caretOn(t, false), str: '', n: 0 }
    const e = fx[i]
    if (i > 0 && t < e.start) {
      const pe = fx[i - 1]
      const n0 = typedCount(e.t, pe.start, pe.text, { cps: pe.cps, from: pe.from })
      const n = Math.round(n0 * (1 - prog(t, e.t, e.erase)))
      return { html: typedMk(pe.text, n), caret: true, str: pe.text, n }
    }
    const n = typedCount(t, e.start, e.text, { cps: e.cps, from: e.from })
    return { html: typedMk(e.text, n), caret: caretOn(t, n < e.len), str: e.text, n, verdict: !!e.verdict }
  }

  // ---------- sound ----------
  fx.forEach((e, i) => { if (e.len > e.from) ctx.cue(i === 0 ? Math.max(0, e.start) : e.start, 'type', { dur: Math.max(0.15, (e.len - e.from) / e.cps) }) })
  let lastTick = -Infinity
  for (let k = 1; k < N - 1; k++) if (T[k] - lastTick >= 0.35) { ctx.cue(T[k], 'tick', { gain: 0.5 }); lastTick = T[k] }
  ctx.cue(r1, 'pop', { gain: 0.9 })
  ctx.cue(springT, 'reveal', { gain: 0.4 })
  const vf = fx.find(e => e.verdict)
  if (vf) ctx.cue(vf.end + 0.05, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const landedN = t => entries.reduce((a, e) => a + (t >= e.t ? 1 : 0), 0)
  function liveValues(t, idx) {
    // → [spend text, own text, own colour, entrance p, two-line?]
    if (idx === 0) return [spStart, owStart, ownColor(owV[0], spV[0]), 1]
    if (t < r0) return ['', '', C.good, 0]
    if (t >= r1) return [spFinal, owFinal, ownColor(owV[N - 1], spV[N - 1]), finalP(t), true]
    const x = xRace(t), a = valAt(sp, x), b = valAt(ow, x)
    return [fmtV(a), fmtV(b), ownColor(b, a), frozen ? clamp((t - r0) / 0.12) : 1]
  }
  return {
    duration,
    chrome: {
      footer: { top: cardBottom + G.gap },
      captions: caps,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      const inLoop = t >= loopT0
      const tt = inLoop ? loopT0 - 1e-4 : t // the state the loop clears away from
      const back = inLoop ? ease.inOut(prog(t, loopT0 + 0.02, 0.42)) : 0 // rewind progress
      const xNow = inLoop ? lerp(xe, xs, back) : xRace(t)

      // formula bar (a verdict typed into it is ink, heavier, and the ≈ chip pops)
      const fs = fbarState(t)
      fbar.set(fs.html, { caret: fs.caret })
      fbar.verdictStyle(!!fs.verdict, vf ? prog(t, vf.t, 0.2) : 0)
      const chipP = vf ? prog(t, vf.start - 0.1, 0.34) : 0
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 && !inLoop ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // live row: the year rolls on at each landing, the values count with the race
      const idx = liveIdxAt(tt)
      const tc = changeT(idx)
      // the year rolls on in place; while the live row is still filling down it just moves (one motion per beat)
      const roll = inLoop || landedN(tt) <= H ? 1 : ease.out(prog(t, tc + 0.06, 0.28))
      const outQ = inLoop ? prog(t, loopT0, 0.2) : 0
      const inQ = inLoop ? prog(t, loopT0 + 0.24, M.drop) : 1
      const idx0 = frozen ? 1 : 0 // the frame-1 live row
      const yearNow = inLoop && outQ >= 1 ? labels[idx0] : labels[idx]
      const numNow = 2 + (inLoop && outQ >= 1 ? idx0 : idx)
      setText(lv.cells[0].v, yearNow)
      lv.cells[0].el.classList.toggle('pov-lift', twoSp || twoOw)
      setText(lv.num, String(numNow))
      // where the live row sits: it fills down through the H history slots, and climbs back for the loop
      const fPlay = Math.min(H, scrollAt(tt))
      const liveTop = Math.round(histY + (inLoop ? lerp(fPlay, 0, back) : fPlay) * histH)
      setStyle(lv.row, { top: liveTop + 'px' })
      const nFill = inLoop && outQ >= 1 ? 0 : Math.min(H, landedN(tt))
      future.forEach((r, i) => setText(r.num, String(numNow + H - i - nFill)))
      if (!inLoop && roll < 1 && idx > 0) {
        setText(lv.cells[0].old, labels[idx - 1])
        setStyle(lv.cells[0].old, { opacity: '1', transform: `translateY(${Math.round(-roll * liveH)}px)` })
        setStyle(lv.cells[0].v, { opacity: '1', transform: `translateY(${Math.round((1 - roll) * liveH)}px)` })
      } else {
        setText(lv.cells[0].old, ''); setStyle(lv.cells[0].old, { opacity: '0', transform: 'none' })
        const st = inLoop ? (outQ < 1 ? liftOut(outQ) || { opacity: '1', transform: 'none' } : snapIn(inQ)) : { opacity: '1', transform: 'none' }
        setStyle(lv.cells[0].v, inLoop && idx === idx0 && !frozen ? { opacity: '1', transform: 'none' } : st)
      }
      let [tS, tO, cO, pV, fin] = liveValues(tt, idx)
      if (inLoop && outQ >= 1) [tS, tO, cO, pV, fin] = [...liveValues(-1, idx0).slice(0, 3), frozen ? 0 : inQ, false]
      const flashT = (() => { let f = -Infinity; for (let k = 1; k < N; k++) if (tt >= T[k]) f = T[k]; return f })()
      // with history rows the landed row flashes instead; the final landing always flashes here
      const fl = inLoop || (H > 0 && t < r1) ? 0 : flashAlpha(t, flashT, 0.34) * (idx === N - 1 && t >= r1 ? 1 : 0.85)
      ;[[1, tS, C.bad, fin && twoSp], [2, tO, cO, fin && twoOw]].forEach(([j, txt, col, two]) => {
        const c = lv.cells[j]
        setHTML(c.v, fin ? valueHTML(txt) : esc(txt))
        c.el.classList.toggle('pov-two', !!two)
        // when a final takes two lines ("$1,545" over "spent"), every number in the live row sits on that first
        // line's baseline all race long, so nothing jumps at the landing and the answer never floats
        c.el.classList.toggle('pov-lift', !two && (twoSp || twoOw))
        let st = snapIn(pV)
        if (inLoop && outQ < 1) { const q = liftOut(outQ); st = q ? { opacity: String(Math.min(+st.opacity, +q.opacity)), transform: q.transform } : st }
        setStyle(c.v, { ...st, color: col })
        setStyle(c.el, { backgroundColor: fl > 0.001 ? rgba(C.rowHi, fl) : 'transparent' })
      })
      // the final row wipes yellow (it is the answer); the loop fades it away
      const wipe = ease.inOut(prog(t, wipeT, 0.3)), hiA = 1 - ease.out(prog(t, loopT0, 0.2))
      if (t < wipeT || hiA <= 0.001) setStyle(lv.row, { backgroundColor: C.sheet, backgroundImage: 'none' })
      else if (wipe >= 1) setStyle(lv.row, { backgroundColor: rgba(C.rowHi, hiA), backgroundImage: 'none' })
      else { const w = (wipe * 100).toFixed(2); setStyle(lv.row, { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(C.rowHi, hiA)} ${w}%, ${C.sheet} ${w}%)` }) }

      // history rows: entry j sits in slot j while the live row fills down (sc ≤ H), then everything scrolls up
      // under the frozen pane by one row per landing (the newest year emerging from behind the live row)
      if (H > 0) {
        const sc = scrollAt(tt)
        const fadeH = inLoop ? clamp(1 - prog(t, loopT0, 0.24)) : 1
        const off = Math.max(0, sc - H)
        hist.forEach((r, p) => {
          let j = -1
          for (let q = p; q < entries.length; q += H + 1) if (q < sc - 1e-6) j = q
          const top = (j - off) * histH
          if (j < 0 || top <= -histH || fadeH <= 0) {
            // parked: empty and in one place, so a hidden row never depends on the frame before
            setStyle(r.row, { opacity: '0', top: H * histH + 'px' }); setText(r.num, '')
            for (const c of r.cells) { setText(c.v, ''); setStyle(c.v, { color: C.ink }); setStyle(c.el, { backgroundColor: 'transparent' }) }
            return
          }
          const k = entries[j].k
          setStyle(r.row, { opacity: String(fadeH), top: Math.round(top) + 'px' })
          setText(r.num, String(2 + k))
          setText(r.cells[0].v, labels[k])
          setText(r.cells[1].v, histText(k, 0)); setStyle(r.cells[1].v, { color: C.bad })
          setText(r.cells[2].v, histText(k, 1)); setStyle(r.cells[2].v, { color: ownColor(owV[k], spV[k]) })
          // the row that just landed flashes (its values arrived there)
          const hf = inLoop ? 0 : flashAlpha(t, entries[j].t, 0.4)
          for (const c of [r.cells[1], r.cells[2]]) setStyle(c.el, { backgroundColor: hf > 0.001 ? rgba(C.rowHi, hf) : 'transparent' })
        })
      }

      // selection: the live row's B:C range with its fill handle, then (once the race lands) the Owned cell
      const selRange = { x0: colX[1], x1: Wd, y0: liveTop, y1: liveTop + liveH }
      const selOwn = { x0: colX[2], x1: Wd, y0: liveTop, y1: liveTop + liveH }
      let rect = selRange, handle = true
      if (!inLoop && t >= springT) { rect = springRect(selRange, selOwn, prog(t, springT, M.pick), 1.6); handle = false }
      if (inLoop) { rect = lerpRect(t >= springT ? selOwn : selRange, selRange, ease.inOut(prog(t, loopT0, 0.34))); handle = true }
      setStyle(sel, { opacity: '1', left: rect.x0.toFixed(2) + 'px', top: rect.y0.toFixed(2) + 'px', width: (rect.x1 - rect.x0).toFixed(2) + 'px', height: (rect.y1 - rect.y0).toFixed(2) + 'px' })
      setStyle(sel.firstChild, { opacity: handle ? '1' : '0', right: '3px', bottom: '-9px' }) // straddles the bottom gridline
      const onOwn = !inLoop && t >= springT + M.pick * 0.5
      const nums = [headNum, fz && fz.num, ...hist.map(r => r.num)].filter(Boolean)
      for (const el of nums) setStyle(el, { backgroundColor: C.head, color: C.headText })
      setStyle(lv.num, { backgroundColor: C.headSel, color: C.headSelText })
      letterEls.forEach((el, j) => { const on = onOwn ? j === 2 : j >= 1; setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })

      // chart: lines up to xNow, live y rescale, the gap, purchase markers and the latest price tag
      chart.draw(xNow, { yMax: yMaxAt(xNow), yMin: 0 })
      const [gp, gn] = gapPaths(xNow)
      attr(gapPos, 'd', gp || 'M0 0'); attr(gapNeg, 'd', gn || 'M0 0')
      purchases.forEach((p, i) => {
        const on = xNow >= p.x - 1e-6
        attr(marks[i], 'opacity', on ? 1 : 0)
        attr(marks[i], 'cx', on ? chart.X(p.x).toFixed(1) : '0'); attr(marks[i], 'cy', on ? svgY(chart.Y(valAt(sp, p.x))) : '0')
      })
      let ti = -1, tagA = 0
      if (!inLoop) {
        purchases.forEach((p, i) => { if (t >= tagT[i]) ti = i })
        if (ti >= 0) tagA = (tagT[ti] <= 0 ? 1 : prog(t, tagT[ti], 0.18)) * (1 - prog(t, tagOut(ti), 0.25))
      } else if (startTag >= 0) {
        // the loop ends on frame 1, start tag included
        ti = startTag; tagA = prog(t, loopT0 + 0.3, 0.14)
      }
      if (tagA <= 0.001) { setStyle(tag, { opacity: '0', left: '0px', top: '0px', transformOrigin: '0px 0px', transform: 'none' }); setStyle(tagNotch, { left: '0px', top: '0px' }); setHTML(tagTxt, '') }
      else {
        const p = purchases[ti]
        const mx = chart.X(p.x), my = chart.Y(valAt(sp, p.x))
        const plotL = chart.plot.x, plotR = Math.min(chart.plot.x + chart.plot.w, G.railX - G.left - 6)
        const plotT = chart.plot.y, plotB = chart.plot.y + chart.plot.h
        const w = tagW[ti], th = 60, gap = 20
        // above the marker and hanging to its right, over the part of the chart the race has not drawn yet (so
        // the lines already drawn stay in view); beside it (notch on the near edge) when the marker sits at a
        // plot edge
        let mode = 'above', x0 = mx - 34, y0 = my - gap - th
        if (mx - 24 < plotL) { mode = 'right'; x0 = mx + gap }
        else if (mx + 24 > plotR) { mode = 'left'; x0 = mx - gap - w }
        else x0 = clamp(x0, plotL, plotR - w)
        if (mode !== 'above') y0 = clamp(my - th / 2, plotT, plotB - th)
        else if (y0 < plotT) { mode = 'below'; y0 = my + gap }
        const nx = mode === 'right' ? -9 : mode === 'left' ? w - 11 : clamp(mx - x0 - 10, 14, w - 34)
        const ny = mode === 'above' ? th - 11 : mode === 'below' ? -9 : clamp(my - y0 - 10, 10, th - 30)
        setHTML(tagTxt, tagHTML[ti])
        const pop = tagT[ti] <= 0 || inLoop ? 1 : ease.back(prog(t, tagT[ti], 0.26), 1.8)
        setStyle(tag, {
          opacity: String(clamp(tagA)), left: Math.round(x0) + 'px', top: Math.round(y0) + 'px',
          transformOrigin: `${nx + 10}px ${ny + 10}px`, transform: pop >= 1 ? 'none' : `scale(${Math.max(1, pop).toFixed(4)})`,
        })
        setStyle(tagNotch, { left: Math.round(nx) + 'px', top: Math.round(ny) + 'px' })
      }
    },
  }
}
