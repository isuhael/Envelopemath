// live-sheet · cost-counter: a dollar counter ticking at a fixed real rate, with milestone rows underneath.
//
// One sheet card. The formula bar shows the working: by default the live formula "≈ $rate × 12.4 s" (the
// seconds tick with the counter), or the spec's own working steps (lookOpts.formulaSteps). Row 1 is the
// counter's label (peach output header) with the rate as its grey sub-label; row 2 is ONE giant active
// cell (merged across the sheet) whose value ticks live and lands exactly on data.final, where a yellow
// ≈ chip pops in front of it. Under it, a small table: one row per milestone (key column mint, amount,
// "passed at" output in peach). Frame 1 already shows every milestone's label and amount with its output
// cell empty (the open loop), and a thin yellow progress line runs under the next target as the counter nears it.
// When the counter passes a milestone the big cell flashes and pulses, the output snaps in (116% → 100%)
// with a tick of yellow, and the row's yellow wipes in from the left, holds, and fades. An optional
// "kept" row (lookOpts.kept) lands later with its own live counter and the selection springs onto it.
// The verdict goes to the caption band (card) or is retyped in the formula bar. The last 0.5 s rewind
// the counter and clear the rows back to frame 1, so the short loops.
//
// Frame 1 is never "$0": the counter starts lookOpts.preroll seconds in (default 1 s, at most a fifth of the run),
// so the thumbnail already shows a second's worth (≈ the rate), and it still lands exactly on data.final at
// counterT[1]; the formula bar's live seconds read the same clock ("≈ $30,800 × 1.0 s" at frame 1), so the working
// always matches the cell. With no milestones the counter cell takes the room the table would have used.
// The verdict is a card in the caption band whenever the counter keeps 150 px with the band reserved; else it is
// retyped into the formula bar (Inter 800; the bar keeps its frame-1 height until the verdict).
//
// lookOpts (all optional):
//   loop (true) · preroll (1: seconds already counted at frame 1) · reveal (false: rows appear only as they are
//   passed) · bars (true: progress line under the next milestone) · tone ('neutral': counter colour, good | bad |
//   neutral) · verdict ('auto' | 'band' | 'formula')
//   · letters ('auto' | true | false) · formulaAt0 (0.7) · roll (true: soft ticking meter sound)
//   · formulaSteps [{ t, text }]: working typed into the formula bar at t (replaces the live formula from t)
//   · columns [key, amount, output]: table header labels (default Milestone / Amount / Passed at | Passed)
//   · rows [{ label, amount, at }]: display strings per milestone (same order as data.milestones);
//     without them a label "A median new house: $393,700" is split at its ": " into label and amount, and
//     the output column shows "✓" when the milestone is passed (no computed times are ever printed)
//   · kept { t, label, final, startValue, tone ('good') }: a second live row, counting over the same
//     counterT from startValue (0) to its own display string `final`; it lands at t
import {
  h, setStyle, setText, clamp, prog, ease, C, G, M, S,
  formulaBar, fitFormula, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn,
  countText, parseDisplay, snapIn, liftOut, popScale, flashAlpha, lerpRect, rgba, fitText,
  durationOf, hasCaptions, opt, layer, font, toneColor, isNumeric, fmtNum, footerHeight, HANDLE_PAD,
} from '../lib.js'

export const css = `
.cc .ls-v { position: relative; z-index: 1; }
.cc .cc-big { padding: 0 36px; justify-content: flex-end; }
.cc .cc-vwrap { display: inline-flex; align-items: center; transform-origin: 100% 55%; white-space: nowrap; }
.cc .cc-num { display: inline-block; font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 900; line-height: 1; letter-spacing: -0.02em; }
.cc .cc-chip {
  display: inline-flex; align-items: center; justify-content: center; flex: none; transform-origin: 100% 50%;
  background: #FFD60A; color: #0D0E11; font-family: 'Inter Full', 'Inter', sans-serif; font-weight: 900; line-height: 1;
}
.cc .cc-bar { position: absolute; bottom: -2px; height: 6px; width: 0; opacity: 0; background: #FFD60A; border-radius: 0 3px 3px 0; z-index: 2; }
.cc .ls-cell.center { justify-content: center; }
.cc .ls-cell.input { font-variant-numeric: normal; } /* labels are words: proportional hyphens and digits */
.cc .cc-wrap .ls-v { white-space: normal; line-height: 1.04; text-wrap: balance; }
.cc .ls-row.cc-spare { border-bottom: 0; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const LETTERS = 'ABCDEF'

/** "A median new house: $393,700" → { label: 'A median new house', amount: '$393,700' } (verbatim halves) */
function splitLabel(str = '') {
  const m = /^(.*\S)\s*:\s+(\S.*)$/s.exec(String(str))
  if (m && /\d/.test(m[2]) && isNumeric(m[2])) return { label: m[1], amount: m[2] }
  return { label: String(str), amount: '' }
}
/** the rate part of a rate display: "≈ $22,700 every second" → "≈ $22,700" (a verbatim prefix) */
function rateHead(str = '') {
  const m = /^(.*?\d[\d,]*(?:\.\d+)?(?:\s*(?:thousand|million|billion|trillion)\b|[KMBT]\b)?)/i.exec(String(str))
  return m ? m[1] : ''
}
// textW() sets the font shorthand, which resets font-feature-settings: it measures proportional figures while
// the stage renders tabular ones. This meter measures with the features the text really renders with.
let meterEl = null
function tw(html, weight, px, { tnum = true, ls = '-0.01em' } = {}) {
  if (!meterEl || !meterEl.isConnected) {
    meterEl = h('div', { 'aria-hidden': 'true', style: { position: 'absolute', left: '-6000px', top: '0px', whiteSpace: 'nowrap', visibility: 'hidden' } })
    document.getElementById('stage').append(meterEl)
  }
  meterEl.style.font = font(weight, px)
  meterEl.style.fontFeatureSettings = tnum ? "'tnum' 1, 'cv11' 1" : "'cv11' 1"
  meterEl.style.letterSpacing = ls
  meterEl.innerHTML = html
  const w = meterEl.getBoundingClientRect().width
  meterEl.innerHTML = ''
  return w
}
/** px height of the assumption line: explicit "\n" breaks plus any line too wide for one line */
function footerH(text, w = G.railX - G.left) {
  if (!text) return 0
  const lines = String(text).split('\n').reduce((n, l) => n + (tw(mk(l), 600, S.footer, { ls: '-0.005em' }) > w ? 2 : 1), 0)
  return Math.round(S.footer * 1.25 * lines)
}

export default function costCounter(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}

  // ---------- the counter ----------
  const [t0, t1] = Array.isArray(d.counterT) && d.counterT.length === 2 ? d.counterT.map(Number) : [0, 20]
  const run = Math.max(0.1, t1 - t0)
  const start = Number.isFinite(d.startValue) ? d.startValue : 0
  const finalStr = d.final != null ? String(d.final) : fmtNum(start + (d.perSecond || 0) * run, { prefix: d.prefix ?? '$', dp: d.dp ?? 0 })
  const fin = parseDisplay(finalStr)
  const approx = /≈/.test(fin ? fin.pre : finalStr)
  // the rate the counter actually runs at (start → final over counterT): milestones are timed on it, so the
  // cell always reads at least the milestone's value on the frame it is passed
  const rate = fin && fin.n > start ? (fin.n - start) / run : Math.max(1e-9, d.perSecond || 1)
  const runP = t => prog(t, t0, run)
  // the counter's own clock: it starts `preroll` seconds in (frame 1 already shows a second's worth) and reaches
  // `run` at counterT[1], so it lands exactly on the final display string; the bar's seconds read this clock too
  const preroll = clamp(+opt(spec, 'preroll', 1) || 0, 0, run * 0.2)
  const clockAt = t => preroll + (run - preroll) * runP(t)
  const cP = t => clockAt(t) / run
  const tOfClock = vs => t0 + ((vs - preroll) * run) / Math.max(1e-9, run - preroll)
  // the running text without the ≈ (the ≈ chip joins the value when it lands)
  const bodyOf = (str, p, from) => (p >= 1 ? str : countText(str, p, { from })).replace(/^\s*≈\s*/, '')
  const tone = opt(spec, 'tone', 'neutral')
  const numColor = toneColor(tone)

  // ---------- milestones (+ the optional kept row) ----------
  const loRows = Array.isArray(lo.rows) ? lo.rows : []
  const ms = (d.milestones || []).map((m, i) => {
    const r = loRows[i] || {}
    const sp = splitLabel(m.label)
    const tp = Number.isFinite(m.t) ? m.t : tOfClock(((m.value ?? 0) - start) / rate)
    return { type: 'm', label: r.label ?? sp.label, amount: r.amount ?? sp.amount, at: r.at ?? '', tp, value: m.value }
  }).sort((a, b) => a.tp - b.tp)
  for (const m of ms) { m.pre = m.tp <= Math.max(0, t0) + 1e-6; m.passes = !m.pre && m.tp <= t1 + 1e-6 }
  const K = lo.kept && lo.kept.final != null ? {
    t: Number.isFinite(lo.kept.t) ? lo.kept.t : t0, label: String(lo.kept.label || ''), final: String(lo.kept.final),
    from: Number.isFinite(lo.kept.startValue) ? lo.kept.startValue : 0, color: toneColor(lo.kept.tone || 'good'),
  } : null
  const rows = [...ms, ...(K ? [{ type: 'k', label: K.label, amount: K.final, at: '' }] : [])]
  const nM = ms.length, nR = rows.length, kIdx = K ? nM : -1

  // ---------- table columns ----------
  const hasAmount = rows.some(r => r.amount)
  const hasAt = ms.some(m => m.at)
  const keys = hasAmount ? ['label', 'amount', 'out'] : ['label', 'out']
  const loCols = Array.isArray(lo.columns) ? lo.columns : []
  const heads = keys.map((k, j) => {
    if (loCols.length === keys.length && loCols[j]) return String(loCols[j])
    if (loCols.length === 3 && keys.length === 2 && loCols[j ? 2 : 0]) return String(loCols[j ? 2 : 0])
    return { label: 'Milestone', amount: 'Amount', out: hasAt ? 'Passed at' : 'Passed' }[k]
  })
  const kinds = keys.map(k => ({ label: 'input', amount: 'mid', out: 'output' }[k]))
  const cA = keys.indexOf('amount'), cO = keys.indexOf('out')
  const outText = r => (r.type === 'k' ? '' : r.at || '✓')
  const textOf = (r, k) => (k === 'out' ? outText(r) : r[k] || '')
  const weightOf = (r, k) => (k === 'amount' && r.type !== 'k' ? 700 : 800)
  const avail = G.width - G.gutter
  const PADX = 16, CPAD = 2 * PADX + 4
  // right padding: the last column keeps the sheet's 22 px, so its values end at x 938 like every other format's
  // (the kept row's selection is a single cell: it shows no fill handle, so it needs no clearance)
  const padRt = j => PADX + (j === keys.length - 1 ? G.padX - PADX : 0)
  const labelMaxW = px => Math.max(0, ...rows.map(r => (r.label ? tw(mk(r.label), 800, px, { tnum: false }) : 0)))
  function colWidths(fs) {
    const w = keys.map((k, j) => {
      if (k === 'label') return 0
      const v = Math.max(0, ...rows.map(r => (textOf(r, k) ? tw(esc(textOf(r, k)), weightOf(r, k), fs.num) : 0)))
      const hd = tw(mk(heads[j]), 800, S.labelMin, { ls: '-0.012em' })
      return Math.ceil(Math.max(v + CPAD + padRt(j) - PADX, hd + 2 * PADX + 2, 96))
    })
    w[0] = avail - w.reduce((a, b) => a + b, 0)
    return w
  }
  // the biggest table type that keeps every label on one line; else 40 px labels that wrap to two lines
  const fsTry = [{ label: 46, num: 48 }, { label: 44, num: 46 }, { label: 42, num: 44 }, { label: S.cellMin, num: 42 }, { label: S.cellMin, num: S.cellMin }]
  let fs = fsTry[0], colW = colWidths(fs)
  for (const f of fsTry) { fs = f; colW = colWidths(f); if (labelMaxW(f.label) + CPAD <= colW[0]) break }
  const wrap = labelMaxW(fs.label) + CPAD > colW[0]
  const colX = [G.gutter]
  for (let j = 0; j < keys.length; j++) colX.push(colX[j] + colW[j])
  // how many lines the longest wrapped label really takes (a probe with the cell's own type and width)
  let labelLines = 1
  if (wrap) {
    const probe = h('div', { class: 'cc-probe', style: { position: 'absolute', left: '-4000px', top: '0px', width: colW[0] - 2 * PADX + 'px', font: font(800, fs.label), lineHeight: '1.04', letterSpacing: '-0.01em', fontFeatureSettings: "'cv11' 1", whiteSpace: 'normal', textWrap: 'balance' } })
    ctx.stage.append(probe)
    for (const r of rows) { probe.innerHTML = mk(r.label || ''); labelLines = Math.max(labelLines, Math.round(probe.offsetHeight / (fs.label * 1.04))) }
    probe.remove()
  }
  const wrapH = Math.ceil(labelLines * fs.label * 1.04 + 8)
  const rowTarget = wrap ? Math.max(100, wrapH + 10) : 80, rowMin = wrap ? Math.max(90, wrapH) : 60, rowMax = wrap ? rowTarget + 8 : 92

  // ---------- formula bar items ----------
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const caps = hasCaptions(spec)
  const head = rateHead(d.rateDisplay)
  const secsAt = t => clockAt(t).toFixed(1)
  const liveStr = t => `${/^\s*≈/.test(head) ? '' : '= '}${head || 'rate'} × ${secsAt(t)} s`
  const steps = (Array.isArray(lo.formulaSteps) ? lo.formulaSteps : []).filter(x => x && x.text)
    .map(x => ({ t: Math.max(0, Number(x.t) || 0), text: String(x.text) })).sort((a, b) => a.t - b.t)
  const fItems = []
  if (!steps.length || steps[0].t > 0) fItems.push({ t: 0, live: true })
  fItems.push(...steps)
  fItems[0] = { ...fItems[0], t: 0 }
  const fStrings = fItems.map(it => (it.live ? liveStr(t1) : it.text))

  // ---------- layout ----------
  const W = G.width, X = G.left, Y = G.cardTop, gut = G.gutter
  const fH = footerHeight(spec.footer)
  const lettersOpt = opt(spec, 'letters', 'auto')
  // an empty strip under the rows keeps the selection off the card's rounded corner (only needed when the
  // kept row's selected cell is in the last column)
  const reserve = K && cA < 0 ? 20 : 0
  const L = layer(ctx, 'cc')
  const card = h('div', { class: 'ls-card cc-card', style: { left: X + 'px', top: Y + 'px', width: W + 'px' } })
  L.append(card)

  // row 1: the counter's label (peach, merged) with the rate as its sub-label; measured before planning
  // (inline white-space: the class's text-wrap: balance would switch wrapping back on)
  const bigHl = h('div', { class: 'ls-hl', html: mk(d.label || ''), style: { whiteSpace: 'nowrap' } })
  // the rate is the hook's number: ink at 44 px under the label (not the usual grey 40 px sub-label)
  const bigSub = d.rateDisplay ? h('div', { class: 'ls-hsub', html: mk(d.rateDisplay), style: { whiteSpace: 'nowrap', color: C.ink, fontSize: '44px', fontWeight: '700' } }) : null
  const bigHcell = h('div', { class: 'ls-hcell output', style: { left: gut + 'px', width: W - gut + 'px' } }, bigHl, bigSub)
  const bigRn1 = h('div', { class: 'ls-rn', 'data-deco': '', text: '1', style: { width: gut + 'px' } })
  const bigHead = h('div', { class: 'ls-heads cc-bighead' }, bigRn1, bigHcell)
  card.append(bigHead)
  for (const el of [bigHl, bigSub].filter(Boolean)) {
    const inner = W - gut - 2 * G.padX
    if (el.scrollWidth > inner + 0.5) fitText(el, inner, { minPx: el === bigSub ? S.sub : S.labelMin })
    if (el.scrollWidth > inner + 0.5) setStyle(el, { whiteSpace: 'normal' })
  }
  const bigLabelH = Math.max(76, Math.ceil(bigHcell.scrollHeight + 24))
  // without the rate sub-label (dropped when the counter would get too small; the formula bar shows the rate)
  const bigLabelH1 = Math.max(76, Math.ceil(bigHl.scrollHeight + 24))

  // row 3: the table's header (mint key, grey amount, peach output)
  const tHeadEls = keys.map((k, j) => h('div', { class: `ls-hcell ${kinds[j]}`, style: { left: colX[j] + 'px', width: colW[j] + 'px', padding: `0 ${j === keys.length - 1 ? G.padX : PADX}px 0 ${PADX}px` } },
    h('div', { class: 'ls-hl', html: mk(heads[j]), style: { whiteSpace: 'nowrap' } })))
  const tRn = h('div', { class: 'ls-rn', 'data-deco': '', text: '3', style: { width: gut + 'px' } })
  const tHead = h('div', { class: 'ls-heads' }, tRn, ...tHeadEls)
  card.append(tHead)
  let headH = 0
  tHeadEls.forEach((el, j) => {
    const hl = el.firstChild, inner = colW[j] - 2 * PADX
    if (hl.scrollWidth > inner + 0.5) fitText(hl, inner, { minPx: S.labelMin })
    if (hl.scrollWidth > inner + 0.5) setStyle(hl, { whiteSpace: 'normal' })
    if (kinds[j] !== 'input') setStyle(el, { alignItems: 'flex-end', textAlign: 'right' })
    headH = Math.max(headH, hl.scrollHeight)
  })
  headH = Math.max(76, Math.ceil(headH + 24))
  if (!nR) { tHead.remove(); headH = 0 } // no milestones: just the counter

  // vertical plan: the counter gets the room first (up to 230 px), then rows, then the decorative A B C row
  const fitBase = fitFormula(fStrings, W) // (a verdict typed into the bar has its own fit: it never sizes the bar)
  const vMaxH = nR ? 230 : 320 // with no milestones the counter takes the table's room
  function plan(bottom, fit, withSub = !!bigSub) {
    const labelH = withSub ? bigLabelH : bigLabelH1
    const rest = bottom - Y - fit.ht - labelH - headH - reserve
    const tries = []
    const lt = lettersOpt === false ? [0] : lettersOpt === true ? [G.lettersH] : [G.lettersH, 0]
    for (const l of lt) tries.push({ letters: l, rowH: rowTarget, vMin: 200 })
    const l0 = lettersOpt === true ? G.lettersH : 0
    for (let r = rowTarget; r >= rowMin; r -= 2) tries.push({ letters: l0, rowH: r, vMin: 190 })
    for (let v = 184; v >= 100; v -= 4) tries.push({ letters: l0, rowH: rowMin, vMin: v })
    const pick = tries.find(x => rest - x.letters - nR * x.rowH >= x.vMin) || tries[tries.length - 1]
    const valueH = Math.min(vMaxH, rest - pick.letters - nR * pick.rowH)
    let rowH = pick.rowH
    // spare room once the counter is full size: let the rows breathe a little
    const spare = rest - pick.letters - nR * rowH - valueH
    if (valueH >= vMaxH && spare > 0 && nR) rowH = Math.min(rowMax, rowH + Math.floor(spare / nR))
    const out = { fit, letters: pick.letters, valueH: Math.max(96, valueH), rowH, labelH, sub: withSub }
    // a counter squeezed under ~176 px loses the rate sub-label first (the formula bar carries the rate)
    if (withSub && valueH < 176) { const alt = plan(bottom, fit, false); if (alt.valueH > out.valueH) return alt }
    return out
  }
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  // the verdict is a card in the caption band whenever the counter keeps 150 px with the band reserved
  else if (vMode === 'auto') vMode = caps || plan(bandBottom, fitBase).valueH >= 150 ? 'band' : 'formula'
  const bandUsed = caps || vMode === 'band'
  const P = plan(bandUsed ? bandBottom : fullBottom, fitBase)
  const { valueH, rowH } = P
  const fbarH = P.fit.ht, lettersH = P.letters, labelH = P.labelH
  if (bigSub && !P.sub) bigSub.remove()

  // ---------- build: formula bar, letters, the big cell, the rows ----------
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: P.fit.px, lines: P.fit.lines, verdict: vMode === 'formula' ? verdict.text : null })
  if (vMode === 'formula') fItems.push({ t: verdict.t, text: fbar.vfit.text, verdict: true })
  let y = fbarH
  const letterEls = []
  if (lettersH) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: y + 'px', height: lettersH + 'px' } }, h('i', { class: 'ls-corner', style: { width: gut + 'px' } }))
    const spans = nR ? keys.map((k, j) => [colX[j], colW[j]]) : [[gut, W - gut]] // no table: one column
    spans.forEach(([x, w], j) => { const b = h('b', { text: LETTERS[j], style: { left: x + 'px', width: w + 'px' } }); row.append(b); letterEls.push(b) })
    card.append(row)
    y += lettersH
  }
  setStyle(bigHead, { top: y + 'px', height: labelH + 'px' })
  setStyle(bigHcell, { height: labelH + 'px' }); setStyle(bigRn1, { height: labelH + 'px' })
  y += labelH
  const yBig = y
  // row 2: the giant live cell
  const chip = approx ? h('span', { class: 'cc-chip', text: '≈' }) : null
  const num = h('span', { class: 'cc-num' })
  const vwrap = h('span', { class: 'cc-vwrap' }, chip, num)
  const bigCell = h('div', { class: 'ls-cell cc-big', style: { left: gut + 'px', width: W - gut + 'px', height: valueH + 'px' } }, vwrap)
  const bigRn = h('div', { class: 'ls-rn', 'data-deco': '', text: '2', style: { width: gut + 'px', height: valueH + 'px' } })
  const bigRow = h('div', { class: 'ls-row', style: { top: y + 'px', height: valueH + 'px' } }, bigRn, bigCell)
  card.append(bigRow)
  y += valueH
  // one font size so the widest value (the final, with its ≈ chip) fits the cell and its height
  const maxW = W - gut - 72
  let px = nR ? S.big : 190 // a counter alone may be set larger (width allowing)
  // (the chip's ≈ never goes under 40 px: it is read as part of the answer)
  const chipDims = p => ({ w: Math.max(52, Math.round(p * 0.6)), h: Math.max(54, Math.round(p * 0.62)), fs: Math.max(40, Math.round(p * 0.46)), gap: Math.round(p * 0.1), r: Math.round(p * 0.12) })
  const finalBody = bodyOf(finalStr, 1, start)
  const widthAt = p => tw(esc(finalBody), 900, p, { ls: '-0.02em' }) + (approx ? chipDims(p).w + chipDims(p).gap : 0)
  while (px > 64 && (widthAt(px) > maxW || px > valueH - 40)) px -= 2
  setStyle(num, { fontSize: px + 'px', color: numColor })
  if (chip) { const cd = chipDims(px); setStyle(chip, { width: cd.w + 'px', height: cd.h + 'px', fontSize: cd.fs + 'px', marginRight: cd.gap + 'px', borderRadius: cd.r + 'px' }) }

  setStyle(tHead, { top: y + 'px', height: headH + 'px' })
  for (const el of [tRn, ...tHeadEls]) setStyle(el, { height: headH + 'px' })
  y += headH
  const yRows = y
  const body = h('div', { class: 'ls-body', style: { top: y + 'px', height: nR * rowH + reserve + 'px' } })
  if (nR) card.append(body)
  const rowEls = [], numEls = [], cells = [], bars = []
  rows.forEach((r, i) => {
    const n = h('div', { class: 'ls-rn', 'data-deco': '', text: String(4 + i), style: { width: gut + 'px', height: rowH + 'px' } })
    const row = h('div', { class: 'ls-row', style: { top: i * rowH + 'px', height: rowH + 'px' } }, n)
    const rc = keys.map((k, j) => {
      const v = h('span', { class: 'ls-v' })
      const align = k === 'label' ? 'left' : k === 'out' && !hasAt ? 'center' : 'right'
      const el = h('div', { class: `ls-cell ${kinds[j]} ${align}${k === 'label' ? ' words' : ''}`, style: { left: colX[j] + 'px', width: colW[j] + 'px', height: rowH + 'px', padding: `0 ${padRt(j)}px 0 ${PADX}px`, fontSize: (k === 'label' ? fs.label : fs.num) + 'px', fontWeight: String(weightOf(r, k)) } }, v)
      const color = k === 'label' ? C.ink : k === 'amount' ? (r.type === 'k' ? K.color : C.slate) : C.ink
      setStyle(v, { color })
      if (k === 'label' && wrap) { el.classList.add('cc-wrap'); setStyle(v, { maxWidth: colW[j] - 2 * PADX + 'px' }) }
      row.append(el)
      return { el, v, color }
    })
    // the progress line (how close the counter is to this milestone) runs along the row's bottom edge
    const bar = h('i', { class: 'cc-bar', style: { left: gut + 'px' } })
    row.append(bar)
    body.append(row)
    rowEls.push(row); numEls.push(n); cells.push(rc); bars.push(bar)
  })
  if (reserve) {
    const sp = h('div', { class: 'ls-row cc-spare', style: { top: nR * rowH + 'px', height: reserve + 'px' } }, h('div', { class: 'ls-rn', 'data-deco': '', style: { width: gut + 'px', height: reserve + 'px' } }))
    keys.forEach((k, j) => sp.append(h('div', { class: 'ls-cell', style: { left: colX[j] + 'px', width: colW[j] + 'px', height: reserve + 'px' } })))
    body.append(sp)
  }
  const cardH = y + nR * rowH + reserve
  setStyle(card, { height: cardH + 'px' })
  // a lone counter (no milestone table) sits centred in the working area rather than over a void
  const lift = nR ? 0 : Math.max(0, Math.round(((bandUsed ? bandBottom : G.workBottom - (fH ? fH + G.gap : 0)) - Y - cardH) / 2))
  if (lift) setStyle(card, { top: Y + lift + 'px' })
  const cardBottom = Y + lift + cardH
  const sel = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  card.append(sel)
  if (meterEl) { meterEl.remove(); meterEl = null }

  // ---------- timing ----------
  const verdictT = verdict ? verdict.t : Infinity
  const beats = [t1, ...(K ? [K.t + 0.6] : []), ...ms.filter(m => m.passes).map(m => m.tp + 0.6)]
  const vItem = fItems.find(it => it.verdict)
  const duration = durationOf(spec, { beats, hold: d.hold ?? 3, loop: opt(spec, 'loop', true), verdictEnd: vItem ? vItem.t + 0.2 + mkLen(vItem.text) / 26 : null })
  const D = spec.duration || duration
  const loopOn = opt(spec, 'loop', true)
  const loopT0 = loopOn ? D - M.loopOut : Infinity
  const HOLD = 2.4 // a passed milestone's row stays yellow this long (or until the next event)
  const events = [...ms.filter(m => m.passes).map(m => m.tp), ...(K ? [K.t] : [])].sort((a, b) => a - b)
  const nextEvent = tt => { const e = events.find(x => x > tt + 1e-6); return e == null ? Infinity : e }
  ms.forEach((m, i) => {
    const nx = nextEvent(m.tp)
    m.hiEnd = Math.min(Number.isFinite(nx) ? Math.min(m.tp + HOLD, nx) : Infinity, loopT0)
    const prev = ms.slice(0, i).reverse().find(x => x.tp <= m.tp)
    m.barFrom = Math.max(t0, prev ? prev.tp : t0)
  })
  const reveal = !!opt(spec, 'reveal', false)
  const barsOn = opt(spec, 'bars', true) && !reveal
  const nextIdx = tt => ms.findIndex(m => m.passes && m.tp > tt)

  // ---------- formula bar state ----------
  const cut0 = wordCut(fItems[0].live ? liveStr(0) : fItems[0].text, opt(spec, 'formulaAt0', 0.7))
  const ERASE = 0.2, V_CPS = 26
  const strOf = (it, t) => (it.live ? liveStr(t) : it.text)
  const typeStart = k => (k === 0 ? 0 : fItems[k].t + ERASE)
  const cpsOf = k => (fItems[k].verdict ? V_CPS : M.cps)
  const typedAt = (k, t) => typedCount(t, typeStart(k), strOf(fItems[k], t), { cps: cpsOf(k), from: k === 0 ? cut0 : 0 })
  function formulaState(t) {
    let k = 0
    for (let i = 1; i < fItems.length; i++) if (t >= fItems[i].t) k = i
    if (t >= loopT0) {
      // erase what is showing, then retype the frame-1 prefix
      const tt = Math.min(t, loopT0), str = strOf(fItems[k], tt), n0 = typedAt(k, tt)
      if (t < loopT0 + 0.22) return { html: typedMk(str, Math.round(n0 * (1 - prog(t, loopT0, 0.22)))), caret: true }
      const s0 = strOf(fItems[0], 0)
      return { html: typedMk(s0, Math.round(cut0 * prog(t, loopT0 + 0.22, 0.2))), caret: true }
    }
    const it = fItems[k], str = strOf(it, t)
    if (k > 0 && t < it.t + ERASE) {
      const prev = strOf(fItems[k - 1], it.t), n0 = typedAt(k - 1, it.t)
      return { html: typedMk(prev, Math.round(n0 * (1 - prog(t, it.t, ERASE)))), caret: true }
    }
    const n = typedAt(k, t)
    return { html: typedMk(str, n), caret: caretOn(t, n < mkLen(str)), verdict: !!it.verdict }
  }

  // ---------- sound ----------
  ctx.cue(0, 'type', { dur: Math.max(0.2, typeDur(strOf(fItems[0], 0), { from: cut0 })) })
  fItems.forEach((it, k) => {
    if (k === 0 || it.t >= loopT0) return
    const dur = typeDur(strOf(it, it.t), { cps: cpsOf(k) })
    ctx.cue(typeStart(k), 'type', { dur: Math.max(0.2, dur) })
    if (it.verdict) ctx.cue(typeStart(k) + dur + 0.05, 'ding')
  })
  if (opt(spec, 'roll', true)) {
    // a soft meter tick under the running counter, one stretch per milestone gap
    const marks = [t0, ...ms.filter(m => m.passes).map(m => m.tp), t1].filter((x, i, a) => i === 0 || x - a[i - 1] > 0.3)
    for (let i = 1; i < marks.length; i++) ctx.cue(marks[i - 1], 'roll', { dur: marks[i] - marks[i - 1], rate: 12, gain: 0.5 })
  }
  ms.forEach(m => { if (m.passes) ctx.cue(m.tp, 'pop', { gain: 0.9 }) })
  if (K && K.t > 0) { ctx.cue(K.t, 'pop', { gain: 0.8 }); ctx.cue(K.t + 0.1, 'tick', { gain: 0.6 }) }
  if (t1 > 0 && !(Math.abs(t1 - verdictT) < 0.35)) ctx.cue(t1, 'thud', { gain: 0.55 })
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- selection ----------
  const bigRect = { x0: gut, y0: yBig, x1: W, y1: yBig + valueH }
  const keptRect = K ? { x0: colX[cA >= 0 ? cA : cO], y0: yRows + kIdx * rowH, x1: colX[cA >= 0 ? cA : cO] + colW[cA >= 0 ? cA : cO], y1: yRows + (kIdx + 1) * rowH } : null
  const SK = [{ t: -Infinity, rect: bigRect, on: 'big' }]
  if (K && K.t > 0) SK.push({ t: K.t, dur: M.pick, e: x => ease.back(x, 1.6), rect: keptRect, on: 'kept' })
  else if (K) SK[0] = { t: -Infinity, rect: keptRect, on: 'kept' }
  if (loopOn && K && K.t > 0) SK.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: bigRect, on: 'big' })
  const rectAt = (k, t) => (k === 0 ? SK[0].rect : lerpRect(rectAt(k - 1, t), SK[k].rect, SK[k].e(prog(t, SK[k].t, SK[k].dur))))
  const tint = (el, on) => setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText })

  const sweepAt = i => (verdict ? verdictT + 0.18 + i * Math.min(0.08, 0.6 / Math.max(1, nR)) : Infinity)
  const L0 = loopT0 + 0.02

  return {
    duration,
    chrome: {
      footer: { top: cardBottom + G.gap },
      captions: caps,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      const rw = t >= loopT0 ? ease.inOut(prog(t, loopT0, 0.36)) : 0 // the loop rewind

      // formula bar (the verdict, when it lives here, is ink and heavier; the ≈ chip pops as it lands)
      const fsx = formulaState(t)
      fbar.set(fsx.html, { caret: fsx.caret })
      fbar.verdictStyle(!!fsx.verdict, vItem ? prog(t, vItem.t, 0.2) : 0)
      const chipP = vMode === 'formula' ? prog(t, verdictT + ERASE - 0.1, 0.34) : 0
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 && t < loopT0 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // the giant cell: live value, ≈ chip on landing, flash + pulse on every milestone
      const p = rw > 0 ? cP(Math.min(t, loopT0)) + (cP(0) - cP(Math.min(t, loopT0))) * rw : cP(t) // the loop rewinds to frame 1
      setText(num, bodyOf(finalStr, p, start))
      if (chip) {
        const cp = prog(t, t1, 0.3)
        const st = t < t1 ? { opacity: '0', transform: 'none' } : snapIn(cp, 1.3)
        setStyle(chip, rw > 0 ? { opacity: String(Math.max(0, 1 - rw * 3)).slice(0, 5), transform: 'none' } : st)
      }
      let flash = t1 > 0 && t >= t1 && rw === 0 ? flashAlpha(t, t1, 0.45) : 0
      let pulse = 1
      for (const m of ms) {
        if (!m.passes) continue
        flash = Math.max(flash, flashAlpha(t, m.tp, 0.4))
        const q = prog(t, m.tp, 0.3)
        if (q > 0 && q < 1) pulse = Math.max(pulse, 1 + 0.06 * (1 - ease.out(q)))
      }
      const lq = prog(t, t1, 0.32)
      if (t1 > 0 && lq > 0 && lq < 1) pulse = Math.max(pulse, 1 + 0.08 * (1 - ease.out(lq)))
      if (verdict && t < loopT0) flash = Math.max(flash, flashAlpha(t, verdictT, 0.4) * 0.8)
      setStyle(vwrap, { transform: pulse > 1.0001 ? `scale(${pulse.toFixed(4)})` : 'none' })
      setStyle(bigCell, { backgroundColor: flash > 0.001 ? rgba(C.rowHi, flash) : 'transparent' })

      // milestone rows
      const nxt = barsOn ? nextIdx(t) : -1
      rows.forEach((r, i) => {
        const rc = cells[i]
        const out = loopOn && !r.pre ? prog(t, L0 + ((nR - 1 - i) / Math.max(1, nR - 1)) * 0.14, 0.2) : 0
        const tLand = r.type === 'k' ? K.t : r.tp
        const landed = r.type === 'k' ? K.t <= 0 || t >= K.t : r.pre || (r.passes && t >= r.tp)
        // highlight: wipes in from the left as the row lands, holds, then fades (the kept row holds to the loop)
        let hi = 0, wipe = 0
        if (r.type === 'k') { hi = 1 - ease.out(prog(t, loopT0, 0.2)); wipe = K.t <= 0 ? 0 : ease.inOut(prog(t, K.t + 0.04, 0.3)) }
        else if (r.passes) { hi = 1 - ease.out(prog(t, r.hiEnd, 0.45)); wipe = ease.inOut(prog(t, r.tp, 0.3)) }
        if (hi <= 0.001 || wipe <= 0.001) setStyle(rowEls[i], { backgroundColor: C.sheet, backgroundImage: 'none' })
        else if (wipe >= 1) setStyle(rowEls[i], { backgroundColor: rgba(C.rowHi, hi), backgroundImage: 'none' })
        else { const x = (wipe * 100).toFixed(2); setStyle(rowEls[i], { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(C.rowHi, hi)} ${x}%, ${C.sheet} ${x}%)` }) }

        keys.forEach((k, j) => {
          const c = rc[j]
          let text = textOf(r, k), pp = 1, o = out, fl = 0
          const showsAtStart = r.type === 'm' && !reveal && k !== 'out'
          if (r.type === 'k') {
            pp = K.t <= 0 ? 1 : prog(t, K.t + 0.08 * j, M.drop)
            // the kept counter runs on the same clock as the big one (frame 1 already shows its preroll)
            if (k === 'amount') { const kp = rw > 0 ? cP(Math.min(t, loopT0)) + (cP(0) - cP(Math.min(t, loopT0))) * rw : cP(t); text = kp >= 1 ? K.final : bodyOf(K.final, kp, K.from) }
            if (k === 'out') text = ''
            o = K.t <= 0 ? 0 : out
          } else if (showsAtStart) {
            o = 0 // frame 1 shows these: the loop keeps them
          } else if (!r.pre) {
            pp = r.passes ? prog(t, r.tp + (k === 'out' ? 0.04 : 0.08 * j), M.drop) : 0
          }
          if (k === 'out' && landed && tLand > 0) fl = flashAlpha(t, tLand + 0.06)
          if (k === 'out' && t < loopT0) fl = Math.max(fl, flashAlpha(t, sweepAt(i), 0.32))
          if (hi > 0.5) fl = 0
          setText(c.v, text)
          let st = snapIn(pp)
          const lq2 = liftOut(o)
          if (lq2) st = { opacity: String(Math.min(+st.opacity, +lq2.opacity)), transform: lq2.transform }
          setStyle(c.v, st)
          setStyle(c.el, { backgroundColor: fl > 0.001 ? rgba(C.rowHi, fl) : 'transparent' })
        })

        // progress line: how close the counter is to the next milestone
        let bw = 0, ba = 0
        if (i === nxt && t < loopT0) {
          const m = ms[i]
          bw = prog(t, m.barFrom, m.tp - m.barFrom)
          ba = Math.min(prog(t, m.barFrom + 0.1, 0.25), 1 - prog(t, m.tp - 0.04, 0.08))
        }
        setStyle(bars[i], { width: Math.round(bw * (W - gut)) + 'px', opacity: ba > 0.001 ? String(ba).slice(0, 5) : '0' })
      })

      // the selection: the live cell (the counter, then the kept row), back to the counter for the loop
      let k = 0
      for (let i = 1; i < SK.length; i++) if (t >= SK[i].t) k = i
      const rc = rectAt(k, t)
      setStyle(sel, { backgroundColor: 'transparent', opacity: '1', left: Math.round(rc.x0) + 'px', top: Math.round(rc.y0) + 'px', width: Math.round(rc.x1) - Math.round(rc.x0) + 'px', height: Math.round(rc.y1) - Math.round(rc.y0) + 'px' })
      // the fill handle shows on the live counter cell only (far below its baseline); a single kept cell has none
      setStyle(sel.firstChild, { right: '3px', bottom: '3px', opacity: SK[k].on === 'big' && rc.y1 - rc.y0 > 140 ? '1' : '0' })
      const onBig = SK[k].on === 'big'
      tint(bigRn, onBig)
      letterEls.forEach((el, j) => tint(el, onBig || j === (cA >= 0 ? cA : cO)))
      numEls.forEach((el, i) => tint(el, !onBig && i === kIdx))
    },
  }
}
