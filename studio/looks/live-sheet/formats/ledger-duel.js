// live-sheet · ledger-duel (P4): "2 people invest". Same stake, two choices, one year-by-year ledger.
//
// The sheet: column A holds the row keys (years, ages), then one peach output column per person (the name, and the
// plan as a grey sub-label). Frame 1 is the whole bet: the question card, the stake mid-typing in the formula bar,
// both people named, every year waiting in column A, and the start row already filled when its t <= 0 (a money
// answer at 0.0 s). Then the ledger fills both columns at once, row by row: the fill handle drags the B:C range
// down, each value snaps in (cells 0.08 s apart) with a flash and a tick. A value that fell since the row above is
// red; in every row the leader is ink and the trailer grey, so the moment the lead flips is visible in the table.
// An event row (a crash) flashes coral as its fallen values drop in and bleed red, keeps a coral tint, and a slot
// opens under it (the rows below make room, the card grows) while a dark pill wipes out of a notch with the event
// ("crash −37%"); it closes before the next row lands. An event with no time to show that way (the last row, a
// summary right after it) or no room for the slot is typed into the formula bar instead. Other tones get a green
// (good) or plain (neutral) flash. The final row counts both values up from the
// row above, landing exactly on the display strings. An optional summary row (lookOpts.summary: the multiples)
// lands next. At verdict.t (or after the last row) the selection springs onto the winner's column, its header
// wipes yellow, the column washes yellow top to bottom and the winner's final cell takes the solid yellow (the
// answer); the verdict lands as a card in the caption band or is retyped into the formula bar. The last 0.5 s
// clear back to frame 1 so the short loops.
//
// Layout is automatic: the sheet first tries to end above the caption band (captions, or a verdict card when rows
// stay >= 62 px), dropping the decorative A B C row and then going to 50 px rows before it gives up captions (a
// ledger that dense runs silent, the format's own lane); otherwise it runs down to y 1476 (48 px rows at worst) and
// the verdict is retyped into the formula bar. Text never goes under 40 px.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//   · formulaAt0 (0.7) · rowLabelsAtStart (true: every row key visible at frame 1)
//   · formulaBar ([{ t, text }]: the bar's working over time; default: data.stake) · keyLabel (column A label;
//     default 'Year' for year rows, none when every key already names it ("Age 35"), else 'When')
//   · eventStyle ('auto' | 'tip' | 'bar': events as tooltips under their row, or typed into the formula bar)
//   · summary ({ label, values: [display strings], t, tone }: a totals row under the ledger, e.g. the multiples;
//     a tone colours it instead of the leader rule)
//   · eventPause (1.4 s: extra time after an event row when rows have no t)
//   · leader ('high': in each row the bigger value is ink and the rest grey · 'low' for a cost duel · false: off)
import {
  h, setStyle, clamp, prog, ease, fitText, C, G, M, S,
  sheet, tipStrip, fitTips, tipWindow, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn, parseDisplay, displayValue,
  popScale, flashAlpha, lerpRect, durationOf, hasCaptions, opt, layer, footerHeight, textW, font, toneColor, hasUnits,
} from '../lib.js'

export const css = `
.ls-row.ld-sum { box-shadow: inset 0 3px 0 #D0D5DD; }
.ls-row.ld-sum .ls-cell.left .ls-v { color: #344054; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const rgbOf = c => { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
/** hex colour between a and b (p 0..1), opaque, so the linter reads the real tint */
const mix = (a, b, p) => {
  const q = clamp(p)
  if (q <= 0) return a
  if (q >= 1) return b
  const x = rgbOf(a), y = rgbOf(b)
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * q).toString(16).padStart(2, '0')).join('')
}
const UNIT = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }
const unitOf = str => { const d = parseDisplay(str); return d ? UNIT[d.post.trim()[0]] || 1 : 1 }
/** trailing zeros of a whole display number ("≈ $75,300" → 2); 0 counts as any precision */
const zerosOf = str => {
  const d = parseDisplay(str)
  if (!d || d.dp) return 0
  if (d.n === 0) return Infinity
  const m = /0+$/.exec(String(Math.round(d.n)))
  return m ? m[0].length : 0
}
const group3 = str => str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
/**
 * a count from `from` to a display string that ticks at the string's own precision (a "≈ $75,300" counter runs in
 * hundreds, never "≈ $69,937"); p >= 1 returns the display string exactly
 */
function countAt(display, p, from, step) {
  if (p >= 1) return display
  const d = parseDisplay(display)
  if (!d) return display
  const v0 = from + (d.n - from) * clamp(p)
  const v = d.dp ? v0 : Math.round(v0 / step) * step // decimals keep their own precision
  const [i, f] = v.toFixed(d.dp).split('.')
  return d.pre + (d.grouped ? group3(i) : i) + (f ? '.' + f : '') + d.post
}

export default function ledgerDuel(spec, ctx) {
  const d = spec.data || {}
  const people = (d.people && d.people.length ? d.people : [{ name: 'A' }, { name: 'B' }]).slice(0, 3)
  const nP = people.length
  const rows = (d.rows && d.rows.length ? d.rows : [{ label: '', values: [] }]).map(r => ({
    ...r, label: String(r.label ?? ''), values: people.map((_, j) => String((r.values || [])[j] ?? '')),
  }))
  const N = rows.length
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const loopOn = opt(spec, 'loop', true)
  const labelsAt0 = opt(spec, 'rowLabelsAtStart', true)
  const leaderOpt = opt(spec, 'leader', 'high') // who leads a row: 'high' (more is better), 'low' (a cost duel), or off
  const leaderOn = leaderOpt !== false && leaderOpt !== 'off'
  const lowWins = leaderOpt === 'low'
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < nP ? d.winner : -1
  const sumOpt = opt(spec, 'summary', null)
  const summary = sumOpt && Array.isArray(sumOpt.values)
    ? { label: String(sumOpt.label ?? ''), values: people.map((_, j) => String(sumOpt.values[j] ?? '')), t: sumOpt.t, tone: sumOpt.tone }
    : null
  const NR = N + (summary ? 1 : 0) // sheet rows with content (the summary row is the last)
  const lineVals = r => (r < N ? rows[r].values : summary.values)

  // ---------- what each value means (comparisons only; nothing displayed is computed) ----------
  const num = v => { const x = displayValue(v); return Number.isFinite(x) ? x : null }
  const fell = rows.map((r, i) => r.values.map((v, j) => {
    if (i === 0) return false
    const a = num(rows[i - 1].values[j]), b = num(v)
    return a != null && b != null && b < a
  }))
  const tone = rows.map((r, i) => r.tone || (r.event ? (fell[i].some(Boolean) ? 'bad' : 'neutral') : null))
  const crash = tone.map(x => x === 'bad')
  // per row, who leads (null on a tie or text values): the trailing value reads grey
  const leadOf = vals => {
    const xs = vals.map(num)
    if (xs.some(x => x == null)) return null
    const mx = lowWins ? Math.min(...xs) : Math.max(...xs)
    return xs.filter(x => x === mx).length === 1 ? xs.indexOf(mx) : null
  }
  // a summary with a tone (e.g. 'bad': what fees took) is coloured by it instead of by who leads
  const lead = [...rows.map(r => leadOf(r.values)), ...(summary ? [summary.tone ? null : leadOf(summary.values)] : [])]
  let answerRow = rows.findIndex(r => r.tone === 'goal')
  if (answerRow < 0) answerRow = N - 1

  // ---------- timing ----------
  const rowsT = d.rowsT ?? 1.0, every = d.rowEvery ?? 0.8, pause = opt(spec, 'eventPause', 1.4)
  const rowT = []
  rows.forEach((r, i) => {
    const given = Number.isFinite(r.t) ? r.t : d.rowT && Number.isFinite(d.rowT[i]) ? d.rowT[i] : null
    rowT.push(given != null ? given : i === 0 ? rowsT : rowT[i - 1] + every + (rows[i - 1].event ? pause : 0))
  })
  const pre = rowT.map(x => x <= 0)
  const countRow = opt(spec, 'countUp', true) && !pre[answerRow] && answerRow > 0 ? answerRow : -1
  const STAG = 0.08 // cells in one row land this far apart, left to right
  const landEnd = i => rowT[i] + (i === countRow ? M.count + 0.24 : M.drop) + STAG * (nP - 1)
  const lastLand = Math.max(...rows.map((_, i) => landEnd(i)))
  const sumT = summary ? (Number.isFinite(summary.t) ? summary.t : lastLand + 0.45) : Infinity
  const sumEnd = summary ? sumT + M.drop + STAG * (nP - 1) : lastLand
  const hiT = winner >= 0 ? (verdict ? verdict.t : Math.max(lastLand, sumEnd) + 0.7) : Infinity
  const beats = [lastLand, summary ? sumEnd : 0, Number.isFinite(hiT) ? hiT + 0.9 : 0]
  // provisional length (the layout below decides where the verdict goes, which may lengthen it)
  const D0 = spec.duration || durationOf(spec, { beats, hold: d.hold ?? 3, loop: loopOn })
  const loop0 = loopOn ? D0 - M.loopOut : Infinity
  const tOf = r => (r < N ? rowT[r] : sumT) // when row r's first value lands
  const isPre = r => (r < N ? pre[r] : sumT <= 0)

  // ---------- events: a tooltip under the row while it has time to show, else typed into the formula bar ----------
  const evStyle = opt(spec, 'eventStyle', 'auto')
  const events = rows.map((r, i) => (r.event ? i : -1)).filter(i => i >= 0).map(i => {
    const openAt = pre[i] ? -Infinity : rowT[i] + (i === countRow ? M.count : 0) + STAG * (nP - 1) + 0.16
    // it closes (and its slot with it) before the next row or the summary lands
    const nextT = i + 1 < N ? rowT[i + 1] : summary ? sumT : Infinity
    const closeAt = Math.min(nextT - 0.34, Number.isFinite(hiT) ? hiT - 0.05 : Infinity, verdict ? verdict.t - 0.05 : Infinity, loop0)
    return { row: i, text: String(rows[i].event), openAt, closeAt, tip: evStyle !== 'bar' && (evStyle === 'tip' || closeAt - Math.max(0, openAt) >= 1.0) }
  })

  // ---------- formula bar: the stake, optional working keyframes, bar events, maybe the verdict ----------
  let kfs = opt(spec, 'formulaBar', null)
  if (typeof kfs === 'string') kfs = [{ t: 0, text: kfs }]
  const flat = str => String(str).replace(/\s*\n\s*/g, ' ') // the bar is one line of working (it wraps itself)
  kfs = (Array.isArray(kfs) ? kfs : []).filter(k => k && k.text).map(k => ({ t: Number.isFinite(k.t) ? k.t : 0, text: flat(k.text) })).sort((a, b) => a.t - b.t)
  const k0 = kfs.filter(k => k.t <= 0).pop()
  const f0 = k0 ? k0.text : flat(d.stake ?? '')
  const vBar = verdict ? flat(verdict.text) : ''
  const laterKfs = () => [...kfs.filter(k => k.t > 0), ...events.filter(e => !e.tip && e.openAt > 0).map(e => ({ t: e.openAt, text: flat(e.text), event: e }))].sort((x, y) => x.t - y.t)

  // ---------- layout ----------
  const fH = footerHeight(spec.footer)
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const labels = rows.map(r => r.label.trim())
  const firstWords = labels.map(l => l.split(/\s+/)[0])
  // column A's label: 'Year' for year rows; none when every key already says it ("Age 35"); else 'When'
  const keyLabel = opt(spec, 'keyLabel',
    labels.filter(l => /^(1[89]|20)\d{2}$/.test(l)).length >= Math.max(1, N - 1) ? 'Year'
      : firstWords.every(w => w && w === firstWords[0]) && labels.every(l => /\s/.test(l)) && !/\d/.test(firstWords[0]) ? '' : 'When')
  // the person columns are sized alike (a duel is symmetric): every one is measured against the widest value
  const valFont = font(800, S.result)
  const allVals = [...rows.flatMap(r => r.values), ...(summary ? summary.values : [])].filter(Boolean)
  const widest = allVals.reduce((a, v) => (textW(esc(v), valFont, { letterSpacing: '-0.01em' }) > textW(esc(a), valFont, { letterSpacing: '-0.01em' }) ? v : a), '0')
  // ... and against the widest name and plan: the sheet is built with that label in every person column (so each
  // gets the same width and the label row the height the longest needs), then the real labels go in
  const widestOf = (strs, f) => strs.reduce((a, x) => (textW(mk(x), f) > textW(mk(a), f) ? x : a), '')
  const anyPlan = people.some(p => p.plan)
  // (a plan's " · " is where it breaks onto a second line: "DIY index fund" / "0.05% a year")
  const sizeLabel = widestOf(people.map(p => String(p.name ?? '')), font(800, S.label)) + (anyPlan ? '\n' + widestOf(people.map(p => String(p.plan ?? '')), font(600, S.sub)).split(' · ').join('\n') : '')
  const unitsCol = j => [...rows.map(r => r.values[j]), ...(summary ? [summary.values[j]] : [])].some(v => hasUnits(v || ''))
  const L = layer(ctx, 'ld')
  const lettersOpt = opt(spec, 'letters', 'auto')
  const tipW = G.width - G.gutter - 24
  let tipFit = fitTips(events.filter(e => e.tip).map(e => e.text), tipW)
  const slotOf = () => (events.some(e => e.tip) ? tipFit.slotH : 0)
  const build = (bottom, inBar, { minRowH = 52, letters = lettersOpt } = {}) => sheet(L, {
    columns: [{ label: keyLabel, kind: 'input', align: 'left' }, ...people.map((_, j) => ({ label: sizeLabel, kind: 'output', align: 'right', units: unitsCol(j), group: 'people' }))],
    values: [...rows.map(r => [r.label, ...r.values]), ...(summary ? [[summary.label, ...summary.values]] : []), ['', ...people.map(() => widest)]],
    rows: NR, bottom, reserve: slotOf(), grow: true, tail: 16,
    formula: { strings: [f0, ...laterKfs().map(k => k.text)], verdict: inBar ? vBar : null },
    letters, minRowH,
  })
  // Layout: try the sheet above the caption band first and keep it when it fits there. Captions need the band and
  // rows of at least 50 px (a ledger denser than that runs silent, the format's own lane); an 'auto' verdict takes
  // the band too when rows stay >= 50 px, else it is retyped into the formula bar and the sheet runs down to y 1476.
  // The tooltips' slot is planned in; when even 48 px rows cannot make room for it, the events go to the bar.
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  let sh, fitsBand, capsOn
  for (let attempt = 0; attempt < 2; attempt++) {
    L.replaceChildren()
    const inBar = vMode === 'formula'
    sh = build(bandBottom, inBar)
    fitsBand = sh.maxBottom <= bandBottom + 1
    const retry = o => { L.replaceChildren(); sh = build(bandBottom, inBar, o); fitsBand = sh.maxBottom <= bandBottom + 1 }
    // sheet() settles 'auto' letters before it measures a tall label row: drop the decorative A B C row ourselves
    if (!fitsBand && lettersOpt === 'auto') retry({ letters: false })
    // a band (captions or the verdict card) is worth 2 px a row (the cell text stays at 40 px)
    if (!fitsBand && (hasCaptions(spec) || (verdict && vMode !== 'formula'))) retry({ letters: lettersOpt === 'auto' ? false : lettersOpt, minRowH: 50 })
    capsOn = hasCaptions(spec) && fitsBand
    if (vMode === 'auto') vMode = capsOn || fitsBand ? 'band' : 'formula'
    else if (vMode === 'band' && !fitsBand) vMode = 'formula' // a card in the band would sit on the sheet
    if (!capsOn && vMode !== 'band') {
      const full = o => { L.replaceChildren(); sh = build(fullBottom, vMode === 'formula', o) }
      full()
      // still too tall: drop the A B C row, then let rows go to 48 px (cell text stays at 40 px)
      if (sh.maxBottom > fullBottom + 1 && lettersOpt === 'auto') full({ letters: false })
      if (sh.maxBottom > fullBottom + 1) full({ letters: lettersOpt === 'auto' ? false : lettersOpt, minRowH: 48 })
    } else if (sh.rowH < 58 && lettersOpt === 'auto' && sh.letterEls.length) retry({ letters: false })
    const roomy = (vMode === 'band' || capsOn ? sh.maxBottom <= bandBottom + 1 : sh.maxBottom <= fullBottom + 1)
    if (roomy || !events.some(e => e.tip) || evStyle === 'tip') break
    // no room for the tooltips' slot: every event is typed into the formula bar instead
    events.forEach(e => { e.tip = false })
    tipFit = fitTips([], tipW)
    if (opt(spec, 'verdict', 'auto') === 'auto' && verdict) vMode = 'auto'
  }
  const kLater = laterKfs()
  const slotH = slotOf()
  if (summary) sh.rowEls[N].classList.add('ld-sum')
  people.forEach((p, j) => {
    const el = sh.labelEls[j + 1], inner = sh.cols[j + 1].w - 2 * sh.cols[j + 1].pad
    const parts = [String(p.name ?? ''), String(p.plan ?? '')]
    ;[...el.children].forEach((part, i) => {
      const fit = html => {
        part.innerHTML = html
        setStyle(part, { fontSize: (i ? S.sub : S.label) + 'px', whiteSpace: 'nowrap' })
        if (part.scrollWidth > inner + 0.5) fitText(part, inner, { minPx: i ? S.sub : S.labelMin })
        if (part.scrollWidth > inner + 0.5) setStyle(part, { whiteSpace: 'normal' })
      }
      fit(mk(parts[i] ?? ''))
      // a plan that has to wrap breaks at its " · " first ("DIY index fund" / "0.05% a year"), unless that
      // needs more lines than the label row has
      if (i === 1 && part.style.whiteSpace === 'normal' && parts[1].includes(' · ')) {
        const room = sh.labelH - 24 - el.children[0].offsetHeight + 1
        fit(parts[1].split(' · ').map(mk).join('<br>'))
        if (part.scrollHeight > room) fit(mk(parts[1]))
      }
    })
  })
  const outC0 = 1, outC1 = nP
  const wc = winner + 1 // the winner's sheet column

  // the final length: a verdict typed into the bar stays readable 2.5 s once it is typed
  const vTypeEnd = vMode === 'formula' ? verdict.t + 0.3 + mkLen(sh.fbar.vfit.text) / 26 : null
  const duration = durationOf(spec, { beats, hold: d.hold ?? 3, verdictEnd: vTypeEnd, loop: loopOn })
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------- event tooltips: a slot opens under the event row (the rows below make room) ----------
  const spanX0 = sh.cols[outC0].x, spanX1 = sh.cols[outC1].x + sh.cols[outC1].w
  const toneTxt = { bad: C.badDark, good: C.goodDark }
  const strips = []
  events.filter(e => e.tip).forEach((e, k) => {
    const i = e.row
    // the notch points at the cell the event is about: the first value that fell on a bad row, the leader on a
    // good one, else the middle of the value columns; the pill centres on it, kept inside the sheet
    const fj = tone[i] === 'bad' ? fell[i].indexOf(true) : tone[i] === 'good' ? lead[i] ?? -1 : -1
    const tc = fj >= 0 ? sh.cols[fj + 1] : null
    const notchX = Math.round(tc ? tc.x + tc.w / 2 : (spanX0 + spanX1) / 2)
    const w = tipFit.w[k]
    const lo = sh.x + sh.gutter + 12, hi = sh.x + sh.w - 12
    const x0 = Math.round(clamp(notchX - w / 2, lo, hi - w))
    const html = toneTxt[tone[i]] ? `<span style="color:${toneTxt[tone[i]]}">${tipFit.html[k]}</span>` : tipFit.html[k]
    const strip = tipStrip(sh, { px: tipFit.px, html, wrap: tipFit.wrap })
    strips.push({ row: i, strip, box: { x0, x1: x0 + w, notchX }, win: tipWindow(e.openAt, Math.min(e.closeAt, loopT0)) })
  })
  const shiftAt = (r, t) => { let dy = 0; for (const st of strips) if (r > st.row) dy += slotH * st.win.open(t); return dy }

  // ---------- selection keyframes: the fill handle drags down, then the winner's column ----------
  const landStep = (t, r) => (isPre(r) ? 1 : ease.out(prog(t, tOf(r) - 0.07, 0.16)))
  const fillRows = t => { let b = 1; for (let r = 1; r < NR; r++) b += landStep(t, r); return b }
  const dyFn = t => r => shiftAt(r, t)
  const K = [{ t: -Infinity, rect: t => sh.rangeRect(0, fillRows(t), outC0, outC1, dyFn(t)), head: t => [0, Math.floor(fillRows(t) - 0.01), outC0, outC1], handle: true }]
  if (Number.isFinite(hiT)) K.push({ t: hiT, dur: M.pick, e: x => ease.back(x, 1.4), rect: t => sh.rangeRect(0, NR, wc, wc, dyFn(t)), head: () => [0, NR - 1, wc, wc], handle: false })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: () => sh.rangeRect(0, fillRows(0), outC0, outC1), head: () => [0, Math.floor(fillRows(0) - 0.01), outC0, outC1], handle: true })
  const rectAt = (k, t) => (k === 0 ? K[0].rect(t) : lerpRect(rectAt(k - 1, t), K[k].rect(t), K[k].e(prog(t, K[k].t, K[k].dur))))

  // ---------- formula bar states ----------
  const cut0 = wordCut(f0, opt(spec, 'formulaAt0', 0.7))
  const cut = cut0 < 4 ? mkLen(f0) : cut0
  const segs = [{ t0: -Infinity, str: f0, start: 0, from: cut, cps: M.cps, erase: 0 }]
  for (const k of kLater) segs.push({ t0: k.t, str: k.text, from: 0, cps: Math.max(M.cps, mkLen(k.text) / 0.9), erase: 0.16 })
  if (vMode === 'formula') segs.push({ t0: verdict.t, str: sh.fbar.vfit.text, from: 0, cps: 26, erase: 0.3, verdict: true })
  segs.sort((a, b) => a.t0 - b.t0)
  segs.forEach(sg => { if (sg.t0 > -Infinity) sg.start = sg.t0 + sg.erase })
  const typedAt = (sg, t) => (t < sg.start ? (sg.t0 === -Infinity ? sg.from : 0) : typedCount(t, sg.start, sg.str, { cps: sg.cps, from: sg.from }))
  function barAt(t) {
    let k = 0
    for (let i = 1; i < segs.length; i++) if (t >= segs[i].t0) k = i
    const sg = segs[k]
    if (k > 0 && t < sg.start) {
      // erasing what the previous state showed
      const pv = segs[k - 1], n0 = typedAt(pv, sg.t0)
      return { str: pv.str, n: Math.round(n0 * (1 - prog(t, sg.t0, sg.erase))), caret: true, verdict: pv.verdict }
    }
    const n = typedAt(sg, t), len = mkLen(sg.str)
    return { str: sg.str, n, caret: caretOn(t, t >= sg.start && n < len), verdict: sg.verdict }
  }
  function formulaState(t) {
    if (t < loopT0) return barAt(t)
    // the loop: erase whatever shows, then retype frame 1's prefix
    const s0 = barAt(loopT0 - 1e-6), e1 = 0.22
    if (s0.str === f0) return { str: f0, n: Math.max(cut, Math.round(s0.n * (1 - prog(t, loopT0, e1)))), caret: true }
    if (t < loopT0 + e1) return { str: s0.str, n: Math.round(s0.n * (1 - prog(t, loopT0, e1))), caret: true, verdict: s0.verdict }
    return { str: f0, n: Math.round(cut * prog(t, loopT0 + e1, 0.2)), caret: true }
  }
  const vSeg = segs.find(sg => sg.verdict)

  // ---------- sound: one cue per real event ----------
  ctx.cue(0, 'type', { dur: Math.max(0.2, typeDur(f0, { from: cut })) })
  for (const sg of segs) if (sg.t0 > 0 && !sg.verdict) ctx.cue(sg.start, 'type', { dur: Math.max(0.2, mkLen(sg.str) / sg.cps) })
  rows.forEach((r, i) => {
    if (pre[i]) return
    if (i === countRow) { ctx.cue(rowT[i], 'roll', { dur: M.count }); ctx.cue(rowT[i] + M.count, crash[i] && r.event ? 'thud' : 'pop') }
    else if (tone[i] === 'bad' && r.event) ctx.cue(rowT[i], 'thud', { gain: 0.9 })
    else if (r.event) ctx.cue(rowT[i], tone[i] === 'good' ? 'reveal' : 'pop', { gain: 0.7 })
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  if (summary && sumT > 0) ctx.cue(sumT, 'pop', { gain: 0.7 })
  if (Number.isFinite(hiT)) ctx.cue(hiT, 'swipe', { gain: 0.45 })
  if (vSeg) { ctx.cue(vSeg.start, 'type', { dur: mkLen(vSeg.str) / vSeg.cps }); ctx.cue(vSeg.start + mkLen(vSeg.str) / vSeg.cps + 0.05, 'ding') }
  else if (Number.isFinite(hiT) && vMode !== 'band') ctx.cue(hiT + 0.3, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- per-frame pieces ----------
  const STEP = Math.min(0.06, 0.6 / NR) // the winner's wash, top to bottom
  const loopFade = t => (t < loopT0 ? 1 : 1 - ease.inOut(prog(t, loopT0, 0.3)))
  const washAt = (r, t) => ease.out(prog(t, hiT + 0.14 + r * STEP, 0.22)) * loopFade(t)
  const accentT = hiT + 0.14 + answerRow * STEP + 0.12
  const accentAt = t => ease.out(prog(t, accentT, 0.24)) * loopFade(t)
  const outAt = r => (t => (!loopOn || isPre(r) ? 0 : prog(t, loopT0 + 0.02 + ((NR - 1 - r) / Math.max(1, NR - 1)) * 0.14, 0.2)))
  const outFns = Array.from({ length: NR }, (_, r) => outAt(r))
  // a row's own background: the crash row's coral flash settles into a tint; a good row flashes green
  function rowBg(r, t) {
    if (r >= N || isPre(r) && !crash[r]) return C.sheet
    const t0 = rowT[r] + (r === countRow ? M.count : 0)
    if (t < t0 && !isPre(r)) return C.sheet
    const live = 1 - outFns[r](t)
    if (crash[r]) return mix(C.sheet, C.badDark, (isPre(r) ? 0.18 : 0.18 + 0.3 * (1 - ease.out(prog(t, t0, 0.75)))) * live)
    if (tone[r] === 'good' && rows[r].event) return mix(C.sheet, C.goodDark, 0.3 * (1 - ease.out(prog(t, t0, 0.8))) * live)
    return C.sheet
  }
  const winHead = winner >= 0 ? sh.labelEls[wc] : null
  const winSub = winHead ? winHead.querySelector('.ls-hsub') : null

  return {
    duration,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      footerShift: t => shiftAt(NR, t),
      captions: capsOn,
      captionHolds: countRow >= 0 ? rows[countRow].values.map((v, j) => ({ text: v, t: rowT[countRow] + j * STAG + M.count })) : [],
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar (the verdict takes it over: ink, heavier, and the ≈ chip pops)
      const fs = formulaState(t)
      sh.fbar.set(typedMk(fs.str, fs.n), { caret: fs.caret })
      sh.fbar.verdictStyle(!!fs.verdict, vSeg ? prog(t, vSeg.t0, 0.2) : 0)
      const chipP = vSeg ? prog(t, vSeg.start - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // event tooltips: the slot opens under the row (the rows below make room, the card grows), then the pill
      // wipes out of its notch; it all closes before the next row lands
      for (let r = 0; r < NR; r++) sh.rowShift(r, shiftAt(r, t))
      sh.setGrow(shiftAt(NR, t))
      for (const st of strips) st.strip.set({ ...st.box, y: sh.rowTop(st.row, shiftAt(st.row, t)) + sh.rowH, ht: slotH, open: st.win.open(t), reveal: st.win.reveal(t) })

      // rows
      for (let r = 0; r < NR; r++) {
        setStyle(sh.rowEls[r], { backgroundColor: rowBg(r, t), backgroundImage: 'none' })
        const out = outFns[r](t)
        const t0r = tOf(r), preR = isPre(r)
        const key = r < N ? rows[r].label : summary.label
        const keyP = labelsAt0 || preR ? 1 : prog(t, t0r - 0.1, M.drop)
        sh.setCell(r, 0, { text: key, p: keyP, out: labelsAt0 || preR ? 0 : out })
        const vals = lineVals(r)
        for (let j = 0; j < nP; j++) {
          const c = j + 1, t0 = t0r + j * STAG, val = vals[j]
          const isFell = r < N && fell[r][j]
          let text = val, p = preR ? 1 : prog(t, t0, M.drop), scale = 1, flashT = t0 + 0.06
          if (r === countRow) {
            // the final row: both values run up (or down) from the row above and land on their display strings
            const prev = rows[r - 1].values[j]
            const from = num(prev) != null && num(val) != null ? Math.max(0, num(prev) / unitOf(val)) : 0
            const step = 10 ** Math.min(6, zerosOf(val), num(prev) != null ? zerosOf(prev) : Infinity)
            text = countAt(val, ease.out(prog(t, t0, M.count)), from, step)
            p = prog(t, t0, 0.16)
            const pp = prog(t, t0 + M.count - 0.02, 0.24)
            scale = pp > 0 && pp < 1 ? 1 + 0.1 * (1 - ease.out(pp)) : 1 // settles from 110%, never under 100%
            flashT = t0 + M.count
          }
          // colour: red for a fall (it bleeds in on a crash row), grey for the trailer, ink for the leader
          // on a crash row the text stays ink (or bleeds red) while the coral flashes, and greys after
          const flashAt = r === countRow ? t0 + M.count : t0
          const landed = r < N && crash[r] && !preR ? prog(t, flashAt + 0.3, 0.4) : r === countRow ? prog(t, t0 + M.count * 0.6, 0.2) : 1
          let color = leaderOn && lead[r] != null && lead[r] !== j ? mix(C.ink, C.mute, landed) : C.ink
          if (r === N && summary.tone) color = toneColor(summary.tone)
          // (a counted crash value bleeds red once it lands, with its row's flash)
          if (isFell) color = crash[r] && !preR ? mix(color, C.bad, prog(t, flashAt + 0.14, 0.4)) : C.bad
          // the winner's column washes yellow; its final value is the answer (ink on the solid yellow)
          let fill
          if (j === winner && Number.isFinite(hiT)) {
            const w = washAt(r, t)
            const acc = r === answerRow ? accentAt(t) : 0
            if (acc > 0.001) { fill = mix(C.rowHi, C.accent, acc); color = mix(color, C.ink, acc) }
            else if (w > 0.001) fill = mix(rowBg(r, t), C.rowHi, w)
            if (r === answerRow) {
              const ap = prog(t, accentT, 0.3)
              if (ap > 0 && ap < 1 && out <= 0) scale = Math.max(scale, 1 + 0.08 * (1 - ease.out(ap)))
            }
          }
          const flash = preR || (crash[r] && r < N) || (r < N && tone[r] === 'good' && rows[r].event) ? 0 : flashAlpha(t, flashT)
          sh.setCell(r, c, { text, p, out, flash, color, fill, scale, enter: isFell && crash[r] ? 'drop' : 'snap' })
        }
      }

      // the winner's header wipes yellow
      if (winHead) {
        let bg = C.outputHead, img = 'none', hp = 0
        if (t >= loopT0) { hp = loopFade(t); bg = mix(C.outputHead, C.accent, hp) }
        else {
          hp = ease.inOut(prog(t, hiT + 0.04, 0.3))
          if (hp >= 0.999) bg = C.accent
          else if (hp > 0.001) img = `linear-gradient(90deg, ${C.accent} ${(hp * 100).toFixed(2)}%, ${C.outputHead} ${(hp * 100).toFixed(2)}%)`
        }
        setStyle(winHead, { backgroundColor: bg, backgroundImage: img })
        if (winSub) setStyle(winSub, { color: hp > 0.001 ? C.slate : C.mute })
      }

      // selection
      let k = 0
      for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
      sh.select(rectAt(k, t), { handle: K[k].handle })
      const hd = K[k].head(t)
      sh.headSel(hd[0], hd[1], hd[2], hd[3])
    },
  }
}
