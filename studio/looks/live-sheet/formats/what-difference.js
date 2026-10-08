// live-sheet · what-difference (P5): one fixed stake (a debt or a pot of money) handled 2-4 ways.
//
// The sheet is a comparison card, one column per option:
//   formula bar   the working of the option being worked ("= $293.50 × 26 = $7,631 a year")
//   A B C         column letters (decoration; dropped when the card gets tight)
//   row 1         the stake: a merged mint input row ("Car loan / $30,000" · "6.5% APR / 60 months")
//   row 2         one peach header per option: its name and, as a grey sub-label, the behaviour ("$587 a month")
//   then          per metric, a merged grey label row ("Paid off in") over a value row (one cell per option),
//                 and a last "vs <baseline>" group for the deltas (the difference, green or red by tone)
//
// Frame 1 is the whole question: the stake, every option named (the viewer can guess before the maths), the
// baseline column already filled (options with t <= 0) with the selection on it and its working finishing in the
// formula bar (with no baseline, the first option's working, mid-typing). option.t is when that option's first value
// lands: its working types into the bar just before (it completes as the values land, and the working before it
// stays readable at least 1 s), the selection springs onto its column, then the values snap in down the column, the
// selection stepping cell by cell, and the delta pops last (the biggest delta counts up). An optional lever line
// (lookOpts.lever) is retyped into the bar to explain why. At verdict.t the selection springs onto the winner's
// whole column and it wipes yellow top to bottom while the verdict lands (a card in the caption band, or retyped
// into the formula bar). The last 0.5 s clear back to frame 1 so the short loops.
//
// The winner's yellow covers its header and value cells; the grey metric-label rows stay grey across it, so a label
// never reads half on yellow. Fitting, densest last: values take one size for the table (80 → 40 px); then their
// tracking tightens, then the cell padding (to 10 px) and the row-number gutter (to 46 px), then the columns are
// sized to their content (the widest value, or the name's longest word) instead of equal shares. A sign or "≈" is
// glued to its number. Option names fit 42 → 40 px, then wrap balanced; a behaviour breaks after its amount. When
// the card is too tall for its budget, the behaviours leave the header (each is in its option's working in the bar
// anyway), and last the band goes: captions off, the verdict retyped into the bar, the card down to y 1476.
// A sparse table (2 options, 1-2 metrics) sets its values larger (up to 80 px) instead of leaving the card half
// empty.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//           · formulas ([per option], default "= <detail>") · lever (string or { t, text }) · deltaLabel
//           ("vs <baseline name>") · formulaAt0 (0.7)
import {
  h, setStyle, setText, setHTML, clamp, prog, ease, plain, C, G, M, S,
  formulaBar, fitFormula, mk, mkLen, typedMk, typeDur, caretOn, countText, displayValue, snapIn, liftOut, popScale,
  flashAlpha, lerpRect, springRect, rgba, durationOf, hasCaptions, opt, layer, footerHeight, textW, font, toneColor,
  toneFill, wordCut, unitHTML, fitText, fitWarn,
} from '../lib.js'

export const css = `
.wd-stake { position: absolute; left: 0; right: 0; background: #D1FADF; border-bottom: 2px solid #E4E7EC; }
.wd-sk { position: absolute; top: 0; bottom: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 22px; gap: 28px; }
.wd-skl { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.wd-sklab { font: 700 40px/48px 'Inter', 'Inter Full', sans-serif; color: #344054; white-space: nowrap; letter-spacing: -0.01em; }
.wd-skval { font: 900 64px/1.1 'Inter', 'Inter Full', sans-serif; color: #101828; white-space: nowrap; letter-spacing: -0.02em; }
.wd-skr { font: 700 40px/46px 'Inter', 'Inter Full', sans-serif; color: #344054; white-space: nowrap; text-align: right; letter-spacing: -0.01em; }
.wd-sklab em, .wd-skval em, .wd-skr em { background: #FFD60A; color: #101828; border-radius: 6px; padding: 0 0.1em; }
.wd-sklab u.mark2, .wd-skval u.mark2, .wd-skr u.mark2 { color: #B42318; }
.wd-hcell > .ls-hl, .wd-hcell > .ls-hsub { position: relative; }
.wd-hfill { position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: #FFD60A; transform-origin: 50% 0; opacity: 0; }
.ls-row.wd-lab { background: #F2F4F7; }
.wd-labtxt { position: absolute; top: 0; bottom: 0; z-index: 6; background: #F2F4F7; display: flex; align-items: center; padding: 0 22px; font: 700 40px/1.1 'Inter', 'Inter Full', sans-serif; color: #344054; white-space: nowrap; letter-spacing: -0.01em; }
.wd-labtxt em { background: #FFD60A; color: #101828; border-radius: 6px; padding: 0 0.1em; }
.wd-labtxt u.mark2 { color: #D92D20; }
.wd-val .ls-v { text-align: right; }
.wd-delta .ls-v { font-weight: 900; }
.wd-delta .ls-u { font-weight: 800; }
.wd-wash { position: absolute; top: 0; height: 0; background: #FFF3A3; opacity: 0; }
.wd-card .ls-sel { z-index: 5; }
.wd-tight .ls-v { letter-spacing: -0.02em; }
.wd-tight .wd-num .ls-v { word-spacing: -0.12em; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const LETTERS = 'ABCDEFGHIJ'
/** a sign or "≈" never parts from its number: "≈ −$540" breaks nowhere, "≈ 54 mo" only before "mo" */
const glue = str => String(str).replace(/(^|\s)([≈~±+−=×÷-])[ ]+(?=[\d$€£−(-])/g, '$1$2 ').replace(/(^|\s)([≈~±+−=×÷-])[ ]+(?=[\d$€£−(-])/g, '$1$2 ')
const valueHTML = (str, brAt = null) => unitHTML(glue(str), brAt)

export default function whatDifference(spec, ctx) {
  const d = spec.data || {}
  const stake = d.stake || {}
  const metrics = (d.metrics || []).slice(0, 4)
  const options = (d.options || []).slice(0, 4)
  const nO = options.length, nM = metrics.length
  const hasDelta = options.some(o => o && o.delta)
  const nG = nM + (hasDelta ? 1 : 0) // value groups: one per metric, plus the delta group
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  let caps = hasCaptions(spec)
  const loopOn = opt(spec, 'loop', true)
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < nO ? d.winner : -1

  // ---------- content strings ----------
  const valueOf = (i, k) => (k < nM ? String((options[i].values || {})[metrics[k].key] ?? '') : String(options[i].delta ?? ''))
  const fList = opt(spec, 'formulas', null)
  const fStr = i => {
    const f = Array.isArray(fList) ? fList[i] : null
    if (f) return String(f)
    const o = options[i]
    return o.detail ? `= ${String(o.detail).replace(/\s*\n\s*/g, ' ')}` : `= ${o.name || ''}`
  }
  const leverOpt = opt(spec, 'lever', null)
  const lever = leverOpt ? (typeof leverOpt === 'string' ? { text: leverOpt } : leverOpt) : null
  const baseIdx = Math.max(0, options.findIndex(o => !o.delta))
  const baseName = options[baseIdx] ? String(options[baseIdx].name || '') : ''
  const deltaLabel = opt(spec, 'deltaLabel', baseName ? `vs ${baseName}` : 'Difference')

  // ---------- timing ----------
  // option.t = when its first value lands. Omitted: the first option is the baseline (t = 0), then every 3 s.
  const T = options.map((o, i) => (Number.isFinite(o.t) ? o.t : i === 0 ? 0 : 1.6 + (i - 1) * 3))
  const pre = i => T[i] <= 0
  const order = options.map((_, i) => i).sort((a, b) => T[a] - T[b] || a - b)
  const GAP = 0.42 // one cell to the next, down a column (the selection steps 0.2 s between them)
  const HOLD = 1.0 // a finished working stays readable at least this long before the next one types over it
  const cellsOf = i => [...metrics.map((_, k) => k), ...(options[i].delta ? [nM] : [])]
  // the biggest delta that lands after frame 1 counts up
  let countI = -1
  if (opt(spec, 'countUp', true) && hasDelta) {
    let best = -Infinity
    options.forEach((o, i) => { const v = Math.abs(displayValue(o.delta)); if (o.delta && !pre(i) && v > best) { best = v; countI = i } })
  }
  // frame 1: the working of the column already filled (the baseline), finishing as the short opens, with the
  // selection on that column; with nothing filled yet, the first option's working, mid-typing
  const preOrder = order.filter(pre)
  const cur0 = preOrder.length ? preOrder[preOrder.length - 1] : order[0] ?? 0
  const cut0 = wordCut(fStr(cur0), opt(spec, 'formulaAt0', 0.7))
  const cut = cut0 < 4 ? mkLen(fStr(cur0)) : cut0

  // formula-bar segments and landing times, in time order
  const ERASE = 0.16
  const land = options.map(() => [])   // land[i][k] (k = group index), Infinity when the cell stays empty
  const segs = [{ t0: 0, str: fStr(cur0), from: cut, cps: M.cps, erase: 0, i: cur0 }] // { t0, str, from, cps, erase, upto, style, chip }
  const done = {}                       // time an option's last cell has settled
  const cpsFor = str => Math.max(M.cps, mkLen(str) / 0.9)
  let prevDone = 0, prevTyped = typeDur(fStr(cur0), { from: cut })
  for (const i of order) {
    const cells = cellsOf(i)
    const str = fStr(i)
    let t0
    if (pre(i)) t0 = -Infinity // already on the sheet
    else if (i === cur0) t0 = Math.max(T[i], prevTyped + 0.1)
    else {
      const td = mkLen(str) / cpsFor(str)
      const start = Math.max(prevDone + 0.2, prevTyped + HOLD, T[i] - 0.12 - td - ERASE)
      segs.push({ t0: start, str, from: 0, cps: cpsFor(str), erase: ERASE, i })
      prevTyped = start + ERASE + td
      t0 = Math.max(T[i], prevTyped + 0.12)
    }
    for (let k = 0; k < nG; k++) land[i][k] = Infinity
    cells.forEach((k, n) => { land[i][k] = t0 + n * GAP })
    const lastK = cells.length ? cells[cells.length - 1] : null
    done[i] = pre(i) ? 0 : lastK == null ? t0 : land[i][lastK] + (i === countI && lastK === nM ? M.count : M.drop)
    if (!pre(i)) prevDone = Math.max(prevDone, done[i])
  }
  const lastDone = Math.max(0, ...Object.values(done))
  const leverT = lever ? (Number.isFinite(lever.t) ? lever.t : verdict ? verdict.t : lastDone + 0.6) : Infinity
  const hiT = winner >= 0 ? (verdict ? verdict.t : Math.max(lastDone + 0.8, Number.isFinite(leverT) ? leverT + 1.5 : 0)) : Infinity
  const beats = [lastDone, verdict ? verdict.t + 0.5 : 0, Number.isFinite(hiT) ? hiT + 0.5 : 0, Number.isFinite(leverT) ? leverT + 1.2 : 0]

  // ---------- layout: columns ----------
  const W = G.width
  const fH = footerHeight(spec.footer)
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  const formulaStrings = [...options.map((_, i) => fStr(i)), lever ? lever.text : '']
  let fFit = fitFormula(formulaStrings, W)
  const valFont = (k, px) => font(k === nM ? 900 : 800, px)
  // tight: the tracking closes up, and a value with no words closes its "≈ " gap a little too
  const hasWords = v => /[A-Za-z]/.test(v)
  const trk = (tight, v) => (tight ? { letterSpacing: '-0.02em', wordSpacing: hasWords(v) ? 'normal' : '-0.12em' } : { letterSpacing: '-0.01em' })
  const strW = (v, k, px, tight) => textW(valueHTML(v), valFont(k, px), trk(tight, v))
  const vW = (i, k, px, tight) => { const v = valueOf(i, k); return v ? strW(v, k, px, tight) : 0 }
  // the spaces a value may break at: never right after a sign or "≈" (those are glued)
  const breaks = v => [...glue(v).matchAll(/ /g)].map(m => m.index)
  // the narrowest a value can be set: one line, or two lines at its most balanced break
  const vMin = (i, k, px, tight) => {
    const v = valueOf(i, k)
    if (!v) return 0
    let best = strW(v, k, px, tight)
    const g = glue(v)
    for (const b of breaks(v)) best = Math.min(best, Math.max(strW(g.slice(0, b), k, px, tight), strW(g.slice(b + 1), k, px, tight)))
    return best
  }
  const valNeed = (i, px, tight) => Math.max(0, ...[...Array(nG).keys()].map(k => vW(i, k, px, tight)))
  const valMin = (i, px, tight) => Math.max(0, ...[...Array(nG).keys()].map(k => vMin(i, k, px, tight)))
  const wordsW = (str, f, ls) => Math.max(0, ...plain(String(str || '')).split(/\s+/).filter(Boolean).map(w => textW(esc(w), f, { letterSpacing: ls })))
  const nameWord = options.map(o => wordsW(o.name, font(800, S.labelMin), '-0.012em'))
  // candidates, roomiest first: [gutter, pad, tight tracking, content-sized columns]
  const shapes = [[64, null, false, false], [64, null, true, false], [46, 10, true, false], [46, 10, true, true]]
  let cols = null
  for (const [gut, pad0, tight, content] of shapes) {
    const avail = W - gut
    const padsOf = ws => ws.map((w, i) => [pad0 ?? (w < 240 ? 14 : G.padX), i === nO - 1 ? G.padX : pad0 ?? (w < 240 ? 14 : G.padX)])
    let ws
    if (!content) {
      const w0 = Math.floor(avail / nO)
      ws = options.map((_, i) => (i === nO - 1 ? avail - w0 * (nO - 1) : w0))
    } else {
      const ps = padsOf(options.map(() => 0))
      const need = options.map((_, i) => Math.ceil(Math.max(valMin(i, S.cellMin, tight) + 4, nameWord[i] + 2)) + ps[i][0] + ps[i][1])
      const spare = avail - need.reduce((a, b) => a + b, 0)
      if (spare < 0) continue
      ws = need.map(x => x + Math.floor(spare / nO))
      ws[nO - 1] = avail - ws.slice(0, -1).reduce((a, b) => a + b, 0)
    }
    const ps = padsOf(ws)
    const inner = i => ws[i] - ps[i][0] - ps[i][1]
    const fitsAt = px => options.every((o, i) => valNeed(i, px, tight) <= inner(i) - 4)
    let px = 80
    while (px > S.cellMin && !fitsAt(px)) px -= 2
    // at the 40 px floor a value with words may take two lines ("11 yrs" / "5 mo"); a number never breaks
    // (a header cell may tighten its own padding to 12 px for a long name)
    const ok = (fitsAt(px) || options.every((o, i) => valMin(i, px, tight) <= inner(i) - 4)) && options.every((o, i) => nameWord[i] <= Math.max(inner(i), ws[i] - 24) + 0.5)
    cols = { gutter: gut, w: ws, pads: ps, tight, px, ok }
    if (ok) break
  }
  if (!cols.ok) console.warn('live-sheet what-difference: values or names too wide for their columns at 40 px')
  const gutter = cols.gutter, colW = cols.w, tight = cols.tight
  const colX = []
  colW.reduce((x, w, i) => { colX[i] = x; return x + w }, gutter)
  const padL = cols.pads.map(p => p[0]), padR = cols.pads.map(p => p[1])
  const inner = i => colW[i] - padL[i] - padR[i]
  const valW = i => inner(i) - 4
  let fitPx = cols.px
  // a value still too wide at 40 px wraps at its most balanced break (never after a sign: glued above)
  const wrapAt = {}
  options.forEach((o, i) => { for (let k = 0; k < nG; k++) {
    const v = valueOf(i, k)
    if (!v || vW(i, k, fitPx, tight) <= valW(i)) continue
    const g = glue(v)
    let best = null, bw = Infinity
    for (const b of breaks(v)) { const w = Math.max(strW(g.slice(0, b), k, fitPx, tight), strW(g.slice(b + 1), k, fitPx, tight)); if (w < bw) { bw = w; best = b } }
    if (best != null) wrapAt[i + ',' + k] = best
  } })
  const wrapRows = new Set(Object.keys(wrapAt).map(x => +x.split(',')[1]))

  const L = layer(ctx, 'wd')
  const card = h('div', { class: 'ls-card wd-card' + (tight ? ' wd-tight' : ''), style: { left: G.left + 'px', top: G.cardTop + 'px', width: W + 'px' } })
  L.append(card)

  // row 2 first (its height is measured): one header per option, its name and behaviour
  const heads = h('div', { class: 'ls-heads' })
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '2', style: { width: gutter + 'px' } })
  heads.append(headNum)
  const hFill = [], hSub = []
  // a header: the option's name over its behaviour as a grey sub-label, each on one line (an author "\n" is kept)
  const headEls = options.map((o, i) => {
    const fill = h('i', { class: 'wd-hfill' })
    const sub = o.detail ? h('div', { class: 'ls-hsub', html: String(o.detail).split('\n').map(mk).join('<br>') }) : null
    const el = h('div', { class: 'ls-hcell output wd-hcell', style: { left: colX[i] + 'px', width: colW[i] + 'px', padding: `0 ${padR[i]}px 0 ${padL[i]}px` } },
      fill, h('div', { class: 'ls-hl', html: mk(o.name || '') }), sub)
    heads.append(el)
    hFill.push(fill); hSub.push(sub)
    return el
  })
  card.append(heads)
  // fit: each part shrinks to 40 px on one line; only then does it wrap (balanced, at a space: a behaviour breaks
  // after its amount, and never mid-number)
  headEls.forEach((el, i) => {
    let room = inner(i)
    // a name or behaviour that does not fit at 40 px first takes the room of a tighter padding (12 px)
    const parts = [...el.querySelectorAll('.ls-hl, .ls-hsub')]
    for (const part of parts) if (part.scrollWidth > room + 0.5) fitText(part, room, { minPx: part.classList.contains('ls-hsub') ? S.sub : S.labelMin })
    if (room < colW[i] - 24 && parts.some(p => p.scrollWidth > room + 0.5)) { room = colW[i] - 24; setStyle(el, { padding: '0 12px' }) }
    for (const part of parts) {
      if (part.scrollWidth > room + 0.5) fitText(part, room, { minPx: part.classList.contains('ls-hsub') ? S.sub : S.labelMin })
      if (part.scrollWidth <= room + 0.5) continue
      const raw = part.classList.contains('ls-hsub') ? String(options[i].detail || '') : ''
      const wOf = str => textW(mk(str), font(600, S.sub), { letterSpacing: '-0.01em' })
      const sp = raw.includes('\n') ? [] : [...raw.matchAll(/ /g)].map(m => m.index)
      const at = sp.find(x => wOf(raw.slice(0, x)) <= room - 2 && wOf(raw.slice(x + 1)) <= room - 2 && !/[≈=×÷+−-]$/.test(raw.slice(0, x)))
      if (at != null) part.innerHTML = mk(raw.slice(0, at)) + '<br>' + mk(raw.slice(at + 1))
      else setStyle(part, { whiteSpace: 'normal' })
    }
  })
  const measureHead = () => Math.max(76, Math.ceil(Math.max(0, ...headEls.map(el => el.scrollHeight)) + 24))
  const headWith = measureHead()
  hSub.forEach(sb => sb && setStyle(sb, { display: 'none' }))
  const headWithout = measureHead()
  hSub.forEach(sb => sb && setStyle(sb, { display: '' }))

  // the stake row: label over value on the left, the terms (split on " · ") stacked on the right
  const terms = stake.terms ? String(stake.terms).split(/\s+·\s+/) : []
  const skInner = W - gutter - 2 * G.padX
  const termsW = terms.length ? Math.max(...terms.map(x => textW(mk(x), font(700, 40)))) : 0
  const skFit = max => { let px = max; while (px > 44 && textW(mk(stake.value || ''), font(900, px), { letterSpacing: '-0.02em' }) > skInner - termsW - 28) px -= 2; return px }
  const stakeHFor = px => Math.max((stake.label ? 48 : 0) + Math.round(px * 1.1), terms.length * 46) + 22

  const labTexts = [...metrics.map(m => m.label || ''), ...(hasDelta ? [deltaLabel] : [])]
  const labRoom = G.railX - G.left - gutter - 2 * G.padX
  const labExtra = labTexts.map(x => (textW(mk(x), font(700, 40), { letterSpacing: '-0.01em' }) > labRoom ? 46 : 0))
  // ---------- layout: the vertical budget ----------
  // Dense tables give way in this order: the A B C row, the stake's size, the label rows, then the behaviours
  // leave the header, then the band (captions off, the verdict in the bar). Value rows keep at least 60 px.
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const lineH = px => Math.round(px * 1.12)
  const wrapLineH = px => Math.round(px * 1.22) // two lines of a wrapped value must not overlap
  const plan = (bottom, fbarH, headH) => {
    const lp = { lettersH: opt(spec, 'letters', 'auto') === false ? 0 : G.lettersH, skPx: skFit(64), labH: 54 }
    // a sparse table (one or two value groups) lets its rows grow past 116 px and its values past 64 px
    const maxRow = nG <= 2 ? 150 : 116
    const rowFor = () => {
      const avail = bottom - G.cardTop - fbarH - lp.lettersH - stakeHFor(lp.skPx) - headH - nG * lp.labH - labExtra.reduce((a, b) => a + b, 0)
      let rh = maxRow
      for (let it = 0; it < 4; it++) {
        const px = Math.max(S.cellMin, Math.min(fitPx, rh - 22))
        const extra = [...wrapRows].reduce(a => a + Math.max(0, 2 * wrapLineH(px) + 16 - rh), 0)
        rh = Math.floor(Math.min(maxRow, (avail - extra) / Math.max(1, nG)))
      }
      return rh
    }
    lp.rowH = rowFor()
    if (opt(spec, 'letters', 'auto') === 'auto' && lp.rowH < 88) { lp.lettersH = 0; lp.rowH = rowFor() }
    if (lp.rowH < 72) { lp.skPx = skFit(52); lp.rowH = rowFor() }
    if (lp.rowH < 72) { lp.labH = 48; lp.rowH = rowFor() }
    if (lp.rowH > 116) { lp.labH = 62; lp.rowH = rowFor() } // roomy: the metric labels grow a little too
    lp.raw = lp.rowH
    lp.rowH = Math.max(60, lp.rowH)
    lp.headH = headH
    return lp
  }
  const fbarH = fFit.ht
  const bandWanted = caps || (vMode === 'band') || (vMode === 'auto' && plan(bandBottom, fbarH, headWith).raw >= 60)
  const tries = [
    ...(bandWanted ? [[true, true], [true, false]] : []),
    [false, true], [false, false],
  ]
  let LP = null, band = false, details = true
  for (const [b, det] of tries) {
    LP = plan(b ? bandBottom : fullBottom, fbarH, det ? headWith : headWithout)
    band = b; details = det
    if (LP.raw >= 60) break
  }
  if (!band) { if (caps) console.warn('live-sheet what-difference: too tall for captions; running silent'); caps = false; if (vMode !== 'none') vMode = 'formula' }
  else if (vMode === 'auto') vMode = 'band'
  if (!details) hSub.forEach((sb, i) => { if (sb) { sb.remove(); hSub[i] = null } })
  const { lettersH, skPx, labH, rowH } = LP
  const headH = LP.headH
  const stakeH = stakeHFor(skPx)
  const valPx = Math.max(S.cellMin, Math.min(fitPx, rowH - 22, rowH > 116 ? 80 : 64))
  const wrapH = 2 * wrapLineH(valPx) + 16
  const rowHk = k => (wrapRows.has(k) ? Math.max(rowH, wrapH) : rowH)

  // ---------- DOM ----------
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines, verdict: vMode === 'formula' ? verdict.text : null })
  const vText = vMode === 'formula' ? fbar.vfit.text : ''
  const duration = durationOf(spec, { beats, hold: d.hold ?? 3, loop: loopOn, verdictEnd: vMode === 'formula' ? verdict.t + 0.3 + mkLen(vText) / 26 : null })
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity
  let letterEls = []
  if (lettersH) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fbarH + 'px', height: lettersH + 'px' } },
      h('i', { class: 'ls-corner', style: { width: gutter + 'px' } }))
    letterEls = options.map((_, i) => h('b', { text: LETTERS[i], style: { left: colX[i] + 'px', width: colW[i] + 'px' } }))
    row.append(...letterEls)
    card.append(row)
  }
  const numEls = [] // row numbers: 0 stake, 1 heads, then label/value per group

  // row 1: the stake
  const stakeTop = fbarH + lettersH
  const skNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gutter + 'px', height: stakeH + 'px' } })
  numEls.push(skNum, headNum)
  const skVal = h('div', { class: 'wd-skval', html: mk(stake.value || ''), style: { fontSize: skPx + 'px', lineHeight: Math.round(skPx * 1.1) + 'px' } })
  card.append(h('div', { class: 'wd-stake', style: { top: stakeTop + 'px', height: stakeH + 'px' } }, skNum,
    h('div', { class: 'wd-sk', style: { left: gutter + 'px' } },
      h('div', { class: 'wd-skl' }, stake.label ? h('div', { class: 'wd-sklab', html: mk(stake.label) }) : null, skVal),
      terms.length ? h('div', { class: 'wd-skr', html: terms.map(mk).join('<br>') }) : null)))

  // row 2: place the headers
  const headTop = stakeTop + stakeH
  setStyle(heads, { top: headTop + 'px', height: headH + 'px' })
  for (const el of headEls) setStyle(el, { height: headH + 'px' })
  setStyle(headNum, { height: headH + 'px' })

  // the groups: a merged label row over a value row
  const bodyTop = headTop + headH
  const groupTop = [0]
  const labHk = k => labH + labExtra[k]
  for (let k = 0; k < nG; k++) groupTop.push(groupTop[k] + labHk(k) + rowHk(k))
  const bodyH = groupTop[nG]
  const body = h('div', { class: 'ls-body', style: { top: bodyTop + 'px', height: bodyH + 'px' } })
  card.append(body)
  const cells = options.map(() => [])
  const washes = [] // { el, top, ht }: the winner's column, one segment per body row (under the text)
  const wash = (top, ht) => { const el = h('i', { class: 'wd-wash' }); washes.push({ el, top, ht }); return el }
  for (let k = 0; k < nG; k++) {
    const isDelta = k === nM
    // (the label sits in a span: a flex container would drop the space after an inline element)
    const two = labExtra[k] > 0
    const lab = h('div', { class: 'wd-labtxt', html: `<span>${mk(isDelta ? deltaLabel : metrics[k].label || '')}</span>`, style: { left: gutter + 'px', maxWidth: labRoom + 2 * G.padX + 'px', ...(labH > 54 && !two ? { fontSize: '44px' } : {}), ...(two ? { whiteSpace: 'normal', textWrap: 'balance', lineHeight: '1.08' } : {}) } })
    const ln = h('div', { class: 'ls-rn', 'data-deco': '', text: String(3 + 2 * k), style: { width: gutter + 'px', height: labHk(k) + 'px' } })
    // the grey label row stays grey across the winner's column: the wash covers value rows only
    body.append(h('div', { class: 'ls-row wd-lab', style: { top: groupTop[k] + 'px', height: labHk(k) + 'px' } }, ln, lab))
    const rh = rowHk(k)
    const vn = h('div', { class: 'ls-rn', 'data-deco': '', text: String(4 + 2 * k), style: { width: gutter + 'px', height: rh + 'px' } })
    const row = h('div', { class: 'ls-row' + (isDelta ? ' wd-delta' : ''), style: { top: groupTop[k] + labHk(k) + 'px', height: rh + 'px' } }, vn, wash(groupTop[k] + labHk(k), rh))
    numEls.push(ln, vn)
    options.forEach((o, i) => {
      const wrapped = wrapAt[i + ',' + k] != null
      const v = h('span', { class: 'ls-v', style: { lineHeight: (wrapped ? wrapLineH(valPx) : lineH(valPx)) + 'px' } })
      const el = h('div', { class: 'ls-cell right wd-val' + (hasWords(valueOf(i, k)) ? '' : ' wd-num'), style: { left: colX[i] + 'px', width: colW[i] + 'px', height: rh + 'px', fontSize: valPx + 'px', padding: `0 ${padR[i]}px 0 ${padL[i]}px` } }, v)
      row.append(el)
      cells[i][k] = { el, v }
    })
    body.append(row)
  }
  const cardH = bodyTop + bodyH
  setStyle(card, { height: cardH + 'px' })
  fitWarn('what-difference', G.cardTop + cardH + (fH ? G.gap + fH : 0), band ? G.workBottom : G.safeBottom - 4)
  const sel = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  card.append(sel)

  // ---------- geometry (stage px) ----------
  const X0 = G.left, Y0 = G.cardTop
  const cellRect = (i, k) => {
    const x0 = X0 + colX[i], y0 = Y0 + bodyTop + groupTop[k] + labHk(k)
    return { x0, y0, x1: x0 + colW[i], y1: y0 + rowHk(k) }
  }
  const colRect = i => ({ x0: X0 + colX[i], y0: Y0 + headTop, x1: X0 + colX[i] + colW[i], y1: Y0 + cardH })

  // ---------- selection keyframes ----------
  const firstEmpty = i => cellsOf(i).find(k => land[i][k] > 0) ?? cellsOf(i)[cellsOf(i).length - 1] ?? 0
  const f1k = pre(cur0) ? cellsOf(cur0)[0] ?? 0 : firstEmpty(cur0)
  const K = [{ t: -Infinity, rect: cellRect(cur0, f1k), head: { rows: [valNumIdx(f1k)], col: cur0 } }]
  function valNumIdx(k) { return 3 + 2 * k } // index into numEls of group k's value row
  for (const i of order) {
    if (pre(i)) continue
    const cs = cellsOf(i)
    if (i !== cur0) {
      const sg = segs.find(x => x.i === i)
      K.push({ t: sg.t0, dur: 0.3, spring: 1.4, rect: cellRect(i, cs[0]), head: { rows: [valNumIdx(cs[0])], col: i } })
    }
    cs.forEach((k, n) => {
      if (n === 0) return
      K.push({ t: land[i][k] - 0.24, dur: 0.2, e: ease.inOut, rect: cellRect(i, k), head: { rows: [valNumIdx(k)], col: i } })
    })
  }
  if (winner >= 0) K.push({ t: hiT, dur: M.pick, spring: 1.6, rect: colRect(winner), head: { rows: numEls.map((_, r) => r).slice(1), col: winner } })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: K[0].rect, head: K[0].head })
  K.sort((a, b) => a.t - b.t)
  const rectAt = (k, t) => {
    if (k === 0) return K[0].rect
    const a = rectAt(k - 1, t), p = prog(t, K[k].t, K[k].dur)
    return K[k].spring ? springRect(a, K[k].rect, p, K[k].spring) : lerpRect(a, K[k].rect, K[k].e(p))
  }

  // ---------- formula bar ----------
  if (lever) segs.push({ t0: leverT, str: lever.text, from: 0, cps: 26, erase: 0.22, chip: true })
  if (vMode === 'formula') segs.push({ t0: verdict.t, str: vText, from: 0, cps: 26, erase: 0.3, style: 'verdict', chip: true })
  else if (winner >= 0 && !lever) {
    // the bar follows the selection onto the winner's column (unless its working is already showing)
    const before = segs.filter(x => x.t0 <= hiT).sort((a, b) => a.t0 - b.t0).pop()
    if (!before || before.str !== fStr(winner)) segs.push({ t0: hiT, str: fStr(winner), from: 0, cps: cpsFor(fStr(winner)), erase: ERASE })
  }
  if (loopOn) segs.push({ t0: loopT0, str: segs[0] ? segs[0].str : '', from: 0, cps: Math.max(1, cut) / 0.2, erase: 0.22, upto: cut, loop: true })
  segs.sort((a, b) => a.t0 - b.t0)
  const fullLen = sg => (sg.upto != null ? sg.upto : mkLen(sg.str))
  const shown = (sg, t) => (t < sg.t0 + sg.erase ? Math.min(sg.from, fullLen(sg)) : Math.min(fullLen(sg), sg.from + Math.floor((t - sg.t0 - sg.erase) * sg.cps + 1e-6)))
  function formulaState(t) {
    let k = -1
    for (let j = 0; j < segs.length; j++) if (t >= segs[j].t0) k = j
    if (k < 0) return { html: '', caret: false }
    const sg = segs[k]
    if (k > 0 && t < sg.t0 + sg.erase) {
      const pv = segs[k - 1]
      const n0 = shown(pv, sg.t0)
      return { html: typedMk(pv.str, Math.round(n0 * (1 - prog(t, sg.t0, sg.erase)))), caret: true, style: pv.style }
    }
    const n = shown(sg, t)
    const typing = n < fullLen(sg)
    return { html: typedMk(sg.str, n), caret: sg.loop || caretOn(t, typing), style: sg.style }
  }
  const chipSeg = segs.filter(sg => sg.chip)

  // ---------- sound ----------
  if (segs[0] && segs[0].t0 === 0 && mkLen(segs[0].str) > cut) ctx.cue(0, 'type', { dur: Math.max(0.2, (mkLen(segs[0].str) - cut) / M.cps) })
  for (const sg of segs) {
    if (sg.t0 <= 0 || sg.loop) continue
    ctx.cue(sg.t0 + sg.erase, 'type', { dur: Math.max(0.15, mkLen(sg.str) / sg.cps) })
  }
  for (const i of order) {
    if (pre(i)) continue
    cellsOf(i).forEach(k => {
      const t0 = land[i][k]
      if (k === nM && i === countI) { ctx.cue(t0, 'roll', { dur: M.count }); ctx.cue(t0 + M.count, 'pop') }
      else if (k === nM) ctx.cue(t0, 'pop', { gain: 0.8 })
      else ctx.cue(t0, 'tick', { gain: 0.6 })
    })
  }
  if (vMode === 'formula') ctx.cue(verdict.t + 0.3 + mkLen(vText) / 26 + 0.05, 'ding')
  if (winner >= 0 && vMode !== 'band') ctx.cue(hiT + 0.12, 'reveal', { gain: 0.6 })
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  return {
    duration,
    chrome: {
      footer: { top: G.cardTop + cardH + G.gap },
      captions: caps,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar
      const fs = formulaState(t)
      fbar.set(fs.html, { caret: fs.caret })
      fbar.verdictStyle(fs.style === 'verdict', vMode === 'formula' ? prog(t, verdict.t, 0.2) : 0)
      let chipP = 0
      for (const s of chipSeg) if (t >= s.t0 + s.erase - 0.1) chipP = prog(t, s.t0 + s.erase - 0.1, 0.34)
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // winner highlight: header fill, then the column wash wipes down; both fade in the loop clear
      const loopFade = loopOn ? 1 - ease.inOut(prog(t, loopT0, 0.3)) : 1
      const hA = winner >= 0 ? ease.out(prog(t, hiT + 0.04, 0.16)) * loopFade : 0
      const wipe = winner >= 0 ? ease.inOut(prog(t, hiT + 0.14, 0.42)) : 0
      options.forEach((o, i) => {
        const on = i === winner && hA > 0.001
        setStyle(hFill[i], { opacity: on ? String(Math.min(1, hA * 1.2).toFixed(3)) : '0', transform: on && hA < 1 ? `scaleY(${hA.toFixed(4)})` : 'none' })
        if (hSub[i]) setStyle(hSub[i], { color: on && hA > 0.4 ? C.slate : C.mute })
      })
      // the wash wipes down the winner's column, row by row, under the text (the gridlines stay)
      const front = bodyH * wipe
      for (const w of washes) {
        const ht = winner >= 0 && loopFade > 0.001 ? Math.round(clamp(front - w.top, 0, w.ht)) : 0
        setStyle(w.el, ht > 0 ? { opacity: loopFade.toFixed(3), left: colX[winner] + 'px', width: colW[winner] + 'px', height: ht + 'px' } : { opacity: '0', left: '0px', width: '0px', height: '0px' })
      }
      // values
      options.forEach((o, i) => {
        for (let k = 0; k < nG; k++) {
          const { el, v } = cells[i][k]
          const raw = valueOf(i, k)
          const t0 = land[i][k]
          if (!raw || t0 === Infinity) { setText(v, ''); setStyle(v, { opacity: '0', transform: 'none' }); setStyle(el, { backgroundColor: 'transparent' }); continue }
          const isDelta = k === nM
          const counting = isDelta && i === countI
          let text = raw, p = pre(i) ? 1 : prog(t, t0, M.drop)
          if (counting) { text = countText(raw, ease.out(prog(t, t0, M.count))); p = prog(t, t0, 0.16) }
          setHTML(v, valueHTML(text, text === raw ? wrapAt[i + ',' + k] ?? null : null))
          let st = snapIn(p)
          const out = pre(i) || !loopOn ? 0 : prog(t, loopT0 + 0.02 + ((nG - 1 - k) / Math.max(1, nG)) * 0.1 + ((nO - 1 - i) / Math.max(1, nO)) * 0.06, 0.2)
          const lo = liftOut(out)
          if (lo) st = { opacity: String(Math.min(+st.opacity, +lo.opacity)), transform: lo.transform }
          // a counted delta settles from 110% once it lands (never under 100%)
          const pp = counting ? prog(t, t0 + M.count - 0.02, 0.24) : isDelta ? prog(t, t0 + 0.02, 0.3) : 0
          const sc = pp > 0 && pp < 1 ? 1 + (counting ? 0.1 : 0.06) * (1 - ease.out(pp)) : 1
          if (st.transform === 'none' && sc !== 1) st.transform = `scale(${sc.toFixed(4)})`
          const color = isDelta ? toneColor(o.tone) : C.ink
          setStyle(v, { ...st, color })
          const fill = isDelta && toneFill(o.tone) !== 'transparent' && p >= 1 && out < 1 ? toneFill(o.tone) : null
          const flash = pre(i) ? 0 : flashAlpha(t, (counting ? t0 + M.count : t0) + 0.06, isDelta ? 0.5 : M.flash)
          setStyle(el, { backgroundColor: fill || (flash > 0.001 ? rgba(C.rowHi, flash) : 'transparent') })
        }
      })

      // selection
      let k = 0
      for (let j = 1; j < K.length; j++) if (t >= K[j].t) k = j
      const r = rectAt(k, t)
      setStyle(sel, {
        // whole pixels: the outline's anti-aliased corners rasterise the same however the frame was reached
        opacity: '1', left: Math.round(r.x0 - X0) + 'px', top: Math.round(r.y0 - Y0) + 'px',
        width: Math.round(r.x1 - r.x0) + 'px', height: Math.round(r.y1 - r.y0) + 'px',
        backgroundColor: 'transparent',
      })
      // at the card's edges the fill handle tucks inside the outline (the card clips anything outside)
      // a single-cell selection has no fill handle (it would sit right after the value, like a full stop)
      setStyle(sel.firstChild, { opacity: '0' })
      const hd = K[k].head
      numEls.forEach((el, n) => { const on = hd.rows.includes(n); setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
      letterEls.forEach((el, j) => { const on = j === hd.col; setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
    },
  }
}
