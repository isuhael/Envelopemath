// ledger-duel — the "2 people invest" ledger duel (P4) on the Clean Sheet.
//
// A typeset booktabs ledger with two money columns, one per person: the name in Archivo Black and the plan in grey
// underneath, both right-aligned over their numbers. The year column runs down the left. A caption line above the
// table states the stake (the money on yellow when the header does not already show it).
//
// Frame 1 is the empty ledger: names, plans and every year label (in grey) are on the page, so the viewer sees the
// bet and the time span before anything fills (rows with t <= 0, usually the starting stake, are already filled).
// Each row then lands in both columns at once: its year turns ink, a sand cursor band swipes across it and both
// values type in place (right-aligned, so nothing shifts while they type). The cursor moves down with every row.
// An event row (a crash, a recovery) swipes its tone instead (crash = coral) and opens a note line under its year
// (the empty rows below ease down to make room, so the frame-1 grid is even and gives nothing away); that tint stays
// (rested) as a record. The goal row is the ledger's total line: a rule above it and larger figures. At the winner
// beat (verdict.t, or just after the last row) the winner's final value takes the blue box and the winner's name
// gets the blue highlighter. The full ledger holds, then (lookOpts.loop, default on) the values clear back to the
// frame-1 state so the short loops.
//
// Layout engine (measured with the real fonts at mount): the largest figures that fit the work area win.
//   1. figures 60-48 px: drop lookOpts.formulas (a footnote), then the stake caption if the header already shows
//      its money;
//   2. figures 46-40 px, events still under their rows;
//   3. events move to one shared line under the table ([year on its tone] event, the latest one shown);
//   4. tighter rows at 40 px (pitch down to 1.08 em: line boxes touch, glyphs do not; rows marked data-overlap-ok).
// Past that the content is over budget (about 10 rows with two events, 12 rows with one-line plans) and the linter
// reports it. Year labels are nudged onto the figures' baseline; plans split at " · " when they need two lines.
//
// lookOpts: loop (true) · stake ('auto' | 'show' | 'hide') · labels ('ahead' | 'with-row') ·
//           formulas ([colA, colB]: grey mono footnote "Name: formula") · winnerT (seconds) · badge (ignored:
//           the Clean Sheet dropped the badge because it repeats the title)
import { h, css as style, prog, ease, clamp, lerp, plain } from '../../../runtime/core.js'
import { C, GRID, MOTION, md, hlBox, toneColor, fadeUp, fade, landing, durationOf, fitMarkup } from '../lib.js'

export const css = `
.ld > * { position: absolute; }
.ld-stake, .ld-plan, .ld-ev, .ld-evline-txt { font-variant-numeric: proportional-nums; font-feature-settings: normal; }
.ld-mask { background: #FAF8F3; border-radius: 8px; }
.ld-table > * { position: absolute; }
.ld-stake { white-space: nowrap; font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: #6B7280; letter-spacing: -.005em; }
.ld-stake.two { white-space: normal; text-wrap: balance; }
.ld-stake em { font-style: normal; font-weight: 800; color: #15171C; }
.ld-stake.fresh em { background: #FFE066; border-radius: .12em; padding: 0 .14em; margin: 0 -.02em;
  -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.ld-stake u.mark2 { text-decoration: none; color: #B42318; font-weight: 700; }
.ld-th { text-align: right; }
.ld-name { display: inline; font-family: 'Archivo Black', 'Inter Full', sans-serif; font-weight: 400; color: #15171C;
  line-height: 1.12; letter-spacing: -.01em; white-space: nowrap;
  background-image: linear-gradient(#A5D8FF, #A5D8FF); background-repeat: no-repeat; background-position: 0 0;
  background-size: var(--hw, 0%) 100%; padding: 0 .12em; margin-right: -.12em; border-radius: .12em; }
.ld-plan { font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 600; color: #6B7280; line-height: 1.15;
  letter-spacing: -.005em; text-wrap: balance; }
.ld-plan em { font-style: normal; color: #15171C; }
.ld-plan u.mark2 { text-decoration: none; color: #B42318; }
.ld-tr { left: 0; right: 0; }
.ld-tr > * { position: absolute; }
.ld-band { left: -14px; right: -14px; border-radius: 10px; opacity: 0; }
.ld-line { left: 0; right: 0; bottom: 0; height: 2px; background: #E3DFD4; }
.ld-sum { left: 0; right: 0; height: 3px; background: #15171C; border-radius: 2px; }
.ld-lab { left: 0; display: flex; align-items: center; white-space: nowrap; font-family: 'Inter Tight', 'Inter Full', sans-serif;
  font-weight: 700; letter-spacing: -.005em; }
.ld-td { display: flex; align-items: center; justify-content: flex-end; }
.ld-td .cs-hl { color: #15171C; }
.ld-td .cs-hl-txt { padding-top: .04em; }
.ld-ev { left: 0; font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 700; color: #15171C; line-height: 1.2;
  letter-spacing: -.005em; white-space: nowrap; }
.ld-ev.two { white-space: normal; text-wrap: balance; }
.ld-ev.bad { color: #B42318; }
.ld-ev em { font-style: normal; color: #1D4FC4; }
.ld-ev u.mark2 { text-decoration: none; color: #B42318; }
.ld-evline { display: flex; align-items: center; gap: 18px; white-space: nowrap; }
.ld-evline-txt { font: 700 40px/1.2 'Inter', 'Inter Full', sans-serif; color: #15171C; }
.ld-evline-txt.bad { color: #B42318; }
.ld-formula { white-space: nowrap; font: 500 40px/1.2 'IBM Plex Mono', 'Inter Full', monospace; color: #6B7280; letter-spacing: -.015em; }
`

const PAD = 14           // column inner padding: text sits PAD inside its column
const REF = 40           // reference size for measuring
const PLAN_PX = 40
const EV_PX = 40
const LINE = { plan: 1.15, ev: 1.2, stake: 1.2 }
const n3 = v => (Math.round(v * 1000) / 1000).toString()
const padOf = px => 12 * Math.sqrt(px / 66) // hlBox horizontal padding (padX 12)
const MONEY = /(≈\s?)?[$€£]\s?\d[\d,.]*(\s?(K|M|B|k|million|billion|trillion))?/

// ink <-> grey for the year labels (12 steps so the css cache hits)
const rgb = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const GREY = rgb(C.grey), INK = rgb(C.ink)
const labelColor = p => {
  const q = Math.round(clamp(p) * 12) / 12
  return q >= 1 ? C.ink : q <= 0 ? C.grey : `rgb(${GREY.map((v, i) => Math.round(lerp(v, INK[i], q))).join(',')})`
}

export default function ledgerDuel(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const labelsAhead = LO.labels !== 'with-row'
  const people = [0, 1].map(j => {
    const p = (d.people || [])[j] || {}
    return typeof p === 'string' ? { name: p, plan: '' } : { name: String(p.name || ''), plan: String(p.plan || '') }
  })
  const rows = (d.rows || []).map(r => ({
    label: String(r.label == null ? '' : r.label),
    values: [0, 1].map(j => String(r.values && r.values[j] != null ? r.values[j] : '')),
    event: r.event ? String(r.event) : '',
    tone: r.tone || (r.event ? 'neutral' : ''),
    t: r.t,
  }))
  const N = rows.length
  const W0 = d.winner === 0 || d.winner === 1 ? d.winner : null
  const goalIdx = rows.map(r => r.tone).lastIndexOf('goal')
  const finalIdx = goalIdx >= 0 ? goalIdx : W0 != null && N ? N - 1 : -1

  // ---------------------------------------------------------------- timing
  const rowsT = d.rowsT != null ? +d.rowsT : 1.0
  const every = d.rowEvery != null ? +d.rowEvery : 0.6
  const T = []
  rows.forEach((r, i) => T.push(r.t != null ? +r.t : i === 0 ? rowsT : T[i - 1] + every))
  const pre = T.map(x => x <= 0.001) // landed before frame 1: shown complete at t = 0 and kept through the loop
  const nextOf = i => { let n = Infinity; for (const x of T) if (x > T[i] + 1e-6 && x < n) n = x; return n }
  const NEXT = T.map((_, i) => nextOf(i))
  const typeD = T.map((x, i) => Math.round(clamp(Math.min(0.42, (NEXT[i] - x) * 0.55), 0.14, 0.42) * 100) / 100)
  const lastLand = N ? Math.max(...T.map((x, i) => x + (pre[i] ? 0 : typeD[i] + 0.06))) : 0
  const hasVerdict = !!(spec.verdict && spec.verdict.text && spec.verdict.t != null)
  const finalReady = finalIdx >= 0 ? T[finalIdx] + typeD[finalIdx] + 0.35 : lastLand
  let winT = Infinity
  if (W0 != null && finalIdx >= 0) {
    winT = LO.winnerT != null ? +LO.winnerT : hasVerdict ? +spec.verdict.t : lastLand + 0.9
    winT = Math.max(winT, finalReady)
  }
  const lastBeat = Math.max(lastLand + 0.3, isFinite(winT) ? winT + 0.6 : 0)
  const clearLen = MOTION.clear + 0.2
  const computed = durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : 3.0, tail: loop ? clearLen : 0 })
  const D = spec.duration || computed
  const clearT0 = loop ? D - clearLen : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }

  // ---------------------------------------------------------------- DOM (built once)
  const root = h('div', { class: 'ld' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)
  const mask = h('div', { class: 'ld-mask', 'data-deco': '' })
  root.append(mask)

  // stake caption: the first money figure in ink (on yellow when the header does not show it already)
  let stakeEl = null, stakeFresh = false
  if (d.stake) {
    let s0 = String(d.stake)
    if (!/\*\*|__/.test(s0)) {
      const m = MONEY.exec(s0)
      if (m) {
        stakeFresh = !plain(spec.header || '').includes(m[0])
        s0 = s0.slice(0, m.index) + '**' + m[0] + '**' + s0.slice(m.index + m[0].length)
      }
    } else stakeFresh = true
    stakeEl = h('div', { class: 'ld-stake' + (stakeFresh ? ' fresh' : ''), html: md(s0) })
    root.append(stakeEl)
  }
  const stakeMode = LO.stake || 'auto'
  const stakeDroppable = stakeEl && stakeMode !== 'show' && !stakeFresh

  const tableEl = h('div', { class: 'cs-table ld-table' })
  const ruleTop = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  const ruleMid = h('div', { class: 'cs-rule-thin', 'data-deco': '' })
  const ruleBot = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  tableEl.append(ruleTop, ruleMid)
  const TH = people.map(p => {
    const name = h('span', { class: 'ld-name', html: md(p.name) })
    const nameRow = h('div', { class: 'ld-name-row' }, name)
    const segs = p.plan.split(/\s+·\s+/).filter(Boolean)
    const plan = p.plan ? h('div', { class: 'ld-plan', html: md(p.plan) }) : null
    const el = h('div', { class: 'ld-th' }, nameRow, plan)
    tableEl.append(el)
    return { el, name, nameRow, plan, src: p.plan, plainSegs: segs, split: segs.length > 1, lines: 1 }
  })

  const R = rows.map((r, i) => {
    const el = h('div', { class: 'ld-tr' })
    const band = h('div', { class: 'ld-band' })
    const lab = h('div', { class: 'ld-lab' }, h('span', { html: md(r.label) }))
    el.append(band, lab)
    const cells = r.values.map(v => {
      const hb = hlBox({ html: md(v), tone: 'goal', px: 52, padX: 12 })
      hb.seek(0, 1, 0)
      const wrap = h('div', { class: 'ld-td' }, hb.el)
      el.append(wrap)
      return { el: wrap, hl: hb, full: md(v), tw: 0 }
    })
    const ev = r.event ? h('div', { class: 'ld-ev' + (r.tone === 'bad' ? ' bad' : ''), html: md(r.event) }) : null
    if (ev) el.append(ev)
    const line = h('div', { class: 'ld-line', 'data-deco': '' })
    if (i < N - 1 && i + 1 !== finalIdx) el.append(line)
    tableEl.append(el)
    return { r, el, band, lab, cells, ev, line, evLines: 1 }
  })
  const sum = finalIdx >= 0 ? h('div', { class: 'ld-sum', 'data-deco': '' }) : null
  if (sum) tableEl.append(sum)
  tableEl.append(ruleBot)
  root.append(tableEl)

  // fallback: one shared event line under the table ([year on its tone] event)
  const evRows = R.filter(x => x.ev)
  const evLines = evRows.map(x => {
    const key = hlBox({ html: md(x.r.label), tone: x.r.tone, px: 44, padX: 12 })
    const txt = h('div', { class: 'ld-evline-txt' + (x.r.tone === 'bad' ? ' bad' : ''), html: md(x.r.event) })
    const el = h('div', { class: 'ld-evline' }, key.el, txt)
    root.append(el)
    return { x, el, key, txt }
  })

  // optional working footnote (lookOpts.formulas): "Name: formula", grey mono
  const fTexts = Array.isArray(LO.formulas) ? LO.formulas.map((f, j) => (f ? (people[j] && people[j].name ? `${plain(people[j].name)}: ${f}` : String(f)) : '')).filter(Boolean) : []
  const fEls = fTexts.map(s0 => { const el = h('div', { class: 'ld-formula', html: md(s0) }); root.append(el); return el })

  // ---------------------------------------------------------------- measuring (real fonts, reference size)
  const range = document.createRange()
  const textW = el => { range.selectNodeContents(el); return range.getBoundingClientRect().width }
  for (const row of R) for (const c of row.cells) { c.hl.setPx(REF); c.tw = c.hl.txt.getBoundingClientRect().width - 2 * padOf(REF) }
  const valW = [0, 1].map(j => Math.max(0, ...R.filter((_, i) => i !== finalIdx).map(row => row.cells[j].tw)))
  const finW = [0, 1].map(j => (finalIdx >= 0 ? R[finalIdx].cells[j].tw : 0))
  for (const row of R) style(row.lab, { fontSize: REF + 'px' })
  const labWs = R.map(row => textW(row.lab))
  const labW = Math.max(0, ...labWs)
  for (const th of TH) style(th.name, { fontSize: REF + 'px' })
  const nameW = TH.map(th => textW(th.name))
  for (const row of R) if (row.ev) style(row.ev, { fontSize: EV_PX + 'px' })
  const evW = R.map(row => (row.ev ? textW(row.ev) : 0))
  if (stakeEl) style(stakeEl, { fontSize: '40px' })
  const stakeW = stakeEl ? textW(stakeEl) : 0
  const fW = fEls.map(el => textW(el))
  const evlTxtW = evLines.map(e => textW(e.txt))
  const evlW = evLines.map((e, k) => { e.key.setPx(44); return e.key.width() + 18 + evlTxtW[k] })

  // ---------------------------------------------------------------- layout engine
  const tableW = P.right - GRID.left // 856: x 84 -> 940
  const avail = P.bottom - P.top
  const hasPlans = TH.some(th => th.plan)
  const labLH = 1.08

  // a plan set as explicit balanced lines (40 px) in the column's inner width: { lines, html, fitsW }
  const planMemo = new Map()
  function planFit(th, inner, maxLines) {
    if (!th.plan) return { lines: 0, html: '', fitsW: true }
    const key = TH.indexOf(th) + ':' + Math.floor(inner) + ':' + maxLines
    if (planMemo.has(key)) return planMemo.get(key)
    style(th.plan, { width: '', fontSize: PLAN_PX + 'px' })
    const fit = (src, split) => {
      const r = fitMarkup(th.plan, src, { maxW: Math.floor(inner), maxPx: PLAN_PX, minPx: PLAN_PX, lh: LINE.plan, maxLines, maxSplit: split, linePenalty: 0 })
      return { lines: r.lines, html: th.plan.innerHTML, fitsW: r.fits && r.lines <= maxLines }
    }
    // one line; else whole " · " pieces grouped onto the fewest lines; else balanced word breaks
    let out = fit(th.src, 1)
    if (!out.fitsW && th.split) {
      const segs = th.plainSegs, n = segs.length
      const parts = []
      const walk = (i, acc) => { if (i === n) { parts.push(acc.slice()); return } for (let j = i + 1; j <= n && acc.length < maxLines; j++) { acc.push(segs.slice(i, j).join(' · ')); walk(j, acc); acc.pop() } }
      walk(0, [])
      parts.sort((a, b) => a.length - b.length)
      for (const g of parts) { const o = fit(g.join('\n'), 1); if (o.fitsW) { out = o; break } }
    }
    if (!out.fitsW) out = fit(th.src, maxLines)
    planMemo.set(key, out)
    return out
  }
  // a year label that needs two lines (balanced) in a narrowed label column: its lines and html
  const labMemo = new Map()
  function labelFit(row, px, w) {
    const key = R.indexOf(row) + ':' + px + ':' + Math.floor(w)
    if (labMemo.has(key)) return labMemo.get(key)
    const span = row.lab.firstChild
    style(row.lab, { fontSize: px + 'px' })
    const r = fitMarkup(span, row.r.label, { maxW: Math.floor(w), maxPx: px, minPx: px, lh: labLH, maxLines: 2, maxSplit: 2, linePenalty: 0 })
    const out = { lines: r.lines, html: span.innerHTML, fitsW: r.fits && r.lines <= 2 }
    span.innerHTML = md(row.r.label); style(span, { whiteSpace: '', fontSize: '' })
    labMemo.set(key, out)
    return out
  }

  // one candidate layout for (figure size, content level); null when it does not fit
  function tryLayout(cellPx, lv) {
    const labelPx = clamp(Math.round(cellPx * 0.9), 40, 48)
    // the total line: up to 64 px, never smaller than the other rows
    let finalPx = finalIdx >= 0 ? Math.max(cellPx, Math.min(64, cellPx + (lv.gap < 0 ? 6 : 10))) : cellPx
    // value columns: as wide as their widest figure (≈ included) and their name at 40 px; equal, for symmetry
    const needIn = fp => Math.max(...[0, 1].map(j => Math.max((valW[j] * cellPx) / REF, (finW[j] * fp) / REF, (nameW[j] * 40) / REF)))
    while (finalPx > cellPx && needIn(finalPx) + 2 * PAD > (tableW - 120) / 2) finalPx -= 2
    const colMin = Math.ceil(needIn(finalPx)) + 2 * PAD
    // the year column: its natural width, or what the value columns leave (labels then wrap to two lines)
    const labNat = Math.ceil((labW * labelPx) / REF) + 2 * PAD
    let labelColW = labNat
    const labLines = R.map(() => 1), labHTML = R.map(() => null)
    if (labNat + 2 * colMin > tableW) {
      labelColW = tableW - 2 * colMin
      if (labelColW < 2 * PAD + 60) return null
      for (const [i, row] of R.entries()) {
        if ((labWs[i] * labelPx) / REF <= labelColW - 2 * PAD) continue
        const f = labelFit(row, labelPx, labelColW - 2 * PAD)
        if (!f.fitsW) return null
        labLines[i] = f.lines; labHTML[i] = f.html
      }
    }
    const colW = (tableW - labelColW) / 2
    const inner = colW - 2 * PAD
    // names: as large as fits (60 -> 40 px)
    let namePx = clamp(Math.round(cellPx * 1.06), 44, 60)
    while (namePx > 40 && Math.max(...nameW) * namePx / REF > inner) namePx -= 2
    if ((Math.max(...nameW) * namePx) / REF > inner + 0.5) return null
    // head: name, then the plan (balanced lines, up to lv.planLines; dropped only at the plans: false levels)
    let planLines = 0
    const plans = TH.map(th => (lv.plans ? planFit(th, inner, lv.planLines) : { lines: 0, html: '', fitsW: true }))
    for (const pf of plans) { if (!pf.fitsW) { if (LO.debug) console.log('ld plan', cellPx, JSON.stringify(lv), Math.round(inner), JSON.stringify(pf)); return null } planLines = Math.max(planLines, pf.lines) }
    const nameH = Math.round(namePx * 1.1)
    const planLH = Math.round(PLAN_PX * LINE.plan)
    const hh = 10 + nameH + (planLines ? 2 + planLines * planLH : 0) + 12
    // vertical budget. A plain row needs its figures' line plus a little air (no box is drawn on it); the total
    // line needs room for the blue box; an event writes one line (two if long) under its row; a two-line year
    // label makes its row taller.
    const lineH = Math.round(cellPx * 1.2)
    const minPitch = lineH + lv.gap
    const finBoxH = Math.round(finalPx * 1.3)
    const goalNeed = finBoxH + (lv.gap < 0 ? 6 : 10)
    const evLH = Math.round(EV_PX * LINE.ev)
    let fixed = hh + 2 + 6
    let stakeH = 0, stakeTwo = false
    if (lv.stake && stakeEl) {
      stakeTwo = stakeW > tableW
      stakeH = Math.round(40 * LINE.stake) * (stakeTwo ? 2 : 1)
      fixed += stakeH + 16
    }
    const evExtra = R.map((row, i) => (row.ev && lv.evInline ? evLH * (evW[i] > tableW - PAD ? 2 : 1) + 2 : 0))
    fixed += evExtra.reduce((a, b) => a + b, 0)
    let evlH = 0, evlTwo = false
    if (lv.evLine && !lv.evInline && evLines.length) {
      evlTwo = Math.max(...evlW) > tableW
      if (evlTwo && Math.max(...evLines.map((e, k) => evlW[k] - evlTxtW[k])) > tableW * 0.4) return null
      evlH = evlTwo ? 2 * 48 : Math.round(44 * 1.3)
      fixed += 18 + evlH
    }
    let fH = 0
    if (lv.formulas && fEls.length) {
      if (Math.max(...fW) > tableW - PAD) return null
      fH = fEls.length * 48
      fixed += 16 + fH
    }
    const rest = avail - fixed
    if (N <= 0) return null
    const lab2 = labLines.map(n => (n > 1 ? Math.round(2 * labelPx * labLH) + 6 : 0))
    const rowsH = p => R.reduce((a, _, i) => a + Math.max(i === finalIdx ? Math.max(p, goalNeed) : p, lab2[i]), 0)
    let pitch = Math.min(lineH + 34, 96)
    while (pitch >= minPitch && rowsH(pitch) > rest) pitch--
    if (pitch < Math.max(minPitch, 34)) return null
    const goalPitch = finalIdx >= 0 ? Math.max(pitch, goalNeed) : pitch
    const boxH = Math.min(Math.round(cellPx * 1.3), pitch - 4)
    return { cellPx, labelPx, namePx, finalPx, labelColW, colW, inner, plans, planLines, nameH, planLH, hh, boxH, finBoxH,
      evLH, evExtra, stakeH, stakeTwo, evlH, evlTwo, fH, pitch, goalPitch, lab2, labLines, labHTML, lv }
  }

  const lv = (stake, formulas, evInline, gap = 10, planLines = 3, plans = true, evLine = true) => ({ stake, formulas, evInline, gap, planLines, plans, evLine })
  const stakeOn = !!stakeEl && stakeMode !== 'hide'
  const withF = fEls.length > 0
  const sizes = (a, b) => { const out = []; for (let px = a; px >= b; px -= 2) out.push(px); return out }
  const plan = []
  const add = (levels, pxs) => { for (const l of levels) for (const px of pxs) plan.push([px, l]) }
  const evs = !!evRows.length
  // 1. comfortable figures (>= 48 px), dropping the optional extras one by one
  add([lv(stakeOn, withF, true), lv(stakeOn, false, true)], sizes(60, 48))
  if (stakeOn && stakeDroppable) add([lv(false, false, true)], sizes(60, 48))
  // 2. denser figures (>= 40 px), events still under their rows; then plans on two lines at most
  for (const pl of [3, 2]) {
    add([lv(stakeOn, false, true, 10, pl)], sizes(46, 40))
    if (stakeOn && stakeDroppable) add([lv(false, false, true, 10, pl)], sizes(46, 40))
  }
  // 3. events move to one shared line under the table; then tighter rows (the glyphs still clear each other)
  if (evs) for (const pl of [3, 2]) {
    add([lv(stakeOn, false, false, 10, pl)], sizes(46, 40))
    if (stakeOn && stakeDroppable) add([lv(false, false, false, 10, pl)], sizes(46, 40))
  }
  add([lv(stakeOn, false, !evs, 2, 2)], [40])
  if (stakeOn && stakeDroppable) add([lv(false, false, !evs, 2, 2)], [40])
  add([lv(stakeOn, false, !evs, -5, 2)], [40])
  if (stakeOn && stakeDroppable) add([lv(false, false, !evs, -5, 2)], [40])
  // 4. over the content budget: the plans go, then the event line (the rows keep their tone), then the stake
  add([lv(stakeOn && !stakeDroppable, false, false, -5, 2, false)], [40])
  if (evs) add([lv(stakeOn && !stakeDroppable, false, false, -5, 2, false, false)], [40])
  add([lv(false, false, false, -6, 2, false, false)], [40])
  let L = null
  for (const [px, l] of plan) { L = tryLayout(px, l); if (L) break }
  if (!L) {
    // still over: the smallest layout, rows packed at what is left (the linter reports any overflow)
    for (const g of [-8, -10, -12]) { L = tryLayout(40, lv(false, false, false, g, 2, false, false)); if (L) break }
    if (!L) {
      const labelColW = Math.min(Math.ceil(labW) + 2 * PAD, Math.round(tableW * 0.3))
      const colW = (tableW - labelColW) / 2
      const hh = 10 + 48 + 12
      const pitch = Math.max(34, Math.floor((avail - hh - 8) / Math.max(1, N)))
      L = { cellPx: 40, labelPx: 40, namePx: 40, finalPx: 40, labelColW, colW, inner: colW - 2 * PAD, plans: TH.map(() => ({ lines: 0, html: '' })), planLines: 0, nameH: 44,
        planLH: 46, hh, boxH: Math.min(52, pitch - 4), finBoxH: Math.min(52, pitch - 4), evLH: 48, evExtra: R.map(() => 0),
        stakeH: 0, stakeTwo: false, evlH: 0, fH: 0, pitch, goalPitch: pitch, lab2: R.map(() => 0), labLines: R.map(() => 1), labHTML: R.map(() => null),
        lv: lv(false, false, false, -12, 2, false, false) }
    }
    L.fallback = true
  }

  // ---------------------------------------------------------------- place
  let y = P.top
  if (stakeEl) {
    if (L.lv.stake) {
      stakeEl.classList.toggle('two', L.stakeTwo)
      style(stakeEl, { left: GRID.left + 'px', top: y + 'px', width: L.stakeTwo ? tableW + 'px' : '', fontSize: '40px' })
      y += L.stakeH + 14
    } else style(stakeEl, { display: 'none' })
  }
  const top = Math.round(y)
  const cols = [
    { x: 0, w: L.labelColW },
    { x: L.labelColW, w: L.colW },
    { x: L.labelColW + L.colW, w: L.colW },
  ]
  // head
  style(ruleTop, { top: '0px' })
  TH.forEach((th, j) => {
    const col = cols[j + 1]
    style(th.el, { left: Math.round(col.x + PAD) + 'px', top: '10px', width: Math.floor(col.w - 2 * PAD) + 'px' })
    style(th.nameRow, { height: L.nameH + 'px', lineHeight: L.nameH + 'px' })
    style(th.name, { fontSize: L.namePx + 'px' })
    if (th.plan) {
      if (L.plans[j].lines) {
        th.plan.innerHTML = L.plans[j].html
        style(th.plan, { display: '', marginTop: '2px', width: Math.floor(col.w - 2 * PAD) + 'px', fontSize: PLAN_PX + 'px', lineHeight: L.planLH + 'px', whiteSpace: 'nowrap' })
      } else style(th.plan, { display: 'none' })
    }
  })
  style(ruleMid, { top: L.hh - 2 + 'px' })
  // rows
  // every row's main line has a fixed slot; an event row also owns a note line that opens (the rows below ease
  // down) when the row lands, so the empty ledger on frame 1 is an even grid and gives nothing away
  let ry = L.hh
  const tight = L.pitch < Math.round(L.cellPx * 1.2)
  R.forEach((row, i) => {
    const isFinal = i === finalIdx
    const main = Math.max(isFinal ? L.goalPitch : L.pitch, L.lab2[i])
    const extra = L.evExtra[i] || 0
    row.main = main
    row.extra = extra
    row.base = ry
    style(row.el, { top: ry + 'px', height: main + extra + 'px' })
    if (tight) row.el.setAttribute('data-overlap-ok', '')
    const px = isFinal ? L.finalPx : L.cellPx
    const boxH = isFinal ? L.finBoxH : L.boxH
    const pad = padOf(px)
    const lpx = isFinal ? Math.max(L.labelPx, Math.min(48, L.labelPx + 2)) : L.labelPx
    if (L.labHTML[i]) {
      row.lab.firstChild.innerHTML = L.labHTML[i]
      style(row.lab, { width: L.labelColW - 2 * PAD + 'px' })
      style(row.lab.firstChild, { whiteSpace: 'nowrap', lineHeight: String(labLH) })
    }
    style(row.lab, { left: PAD + 'px', top: '0px', height: main + 'px', fontSize: (L.labHTML[i] ? L.labelPx : lpx) + 'px' })
    row.cells.forEach((c, j) => {
      const col = cols[j + 1]
      c.hl.setPx(px, boxH)
      c.hl.setHTML(c.full)
      // the text's right edge sits PAD inside the column; the box overhangs by its own padding
      style(c.el, { left: Math.round(col.x + PAD - pad - 6) + 'px', width: Math.round(col.w - 2 * PAD + 2 * pad + 6) + 'px', top: '0px', height: main + 'px' })
    })
    if (row.ev) {
      if (L.lv.evInline) {
        const two = (L.evExtra[i] || 0) > L.evLH + 2
        row.ev.classList.toggle('two', two)
        style(row.ev, { left: PAD + 'px', top: main - 4 + 'px', width: two ? tableW - PAD + 'px' : '', fontSize: EV_PX + 'px', lineHeight: L.evLH + 'px' })
      } else style(row.ev, { display: 'none' })
    }
    const inset = clamp(Math.round((main - (isFinal ? boxH : px * 1.2)) / 2) - 3, 2, 10)
    style(row.band, { top: inset + 'px', bottom: (extra ? 2 : inset) + 'px' })
    ry += main
  })
  // year labels share the figures' baseline (Inter Tight and Archivo Black sit differently in their line boxes)
  const baseline = el => {
    const probe = h('span', { style: { display: 'inline-block', width: '0px', height: '0px', verticalAlign: 'baseline' } })
    el.append(probe)
    const y0 = probe.getBoundingClientRect().top
    probe.remove()
    return y0
  }
  const nudge = {}
  for (const kind of ['row', 'final']) {
    const i = kind === 'final' ? finalIdx : R.findIndex((_, k) => k !== finalIdx && !L.labHTML[k])
    if (i < 0) continue
    const row = R[i]
    style(row.lab, { top: '0px' })
    nudge[kind] = Math.round(baseline(row.cells[1].hl.txt) - baseline(row.lab.firstChild))
  }
  R.forEach((row, i) => style(row.lab, { top: (L.labHTML[i] ? 0 : nudge[i === finalIdx ? 'final' : 'row'] || 0) + 'px' }))
  const extraAll = R.reduce((a, row) => a + row.extra, 0)
  const mainEnd = ry
  ry += extraAll
  if (sum) style(sum, { top: R[finalIdx].base - 2 + 'px' })
  style(ruleBot, { top: ry + 2 + 'px' })
  const tableH = ry + 6
  style(tableEl, { left: GRID.left + 'px', top: top + 'px', width: tableW + 'px', height: tableH + 'px' })
  y = top + tableH
  const evLineOn = evLines.length > 0 && !L.lv.evInline && L.lv.evLine !== false
  if (evLines.length) {
    if (evLineOn) {
      evLines.forEach((e, k) => {
        style(e.el, { left: Math.round(GRID.left + PAD - padOf(44)) + 'px', top: Math.round(y + 18) + 'px', height: L.evlH + 'px' })
        if (L.evlTwo) style(e.txt, { whiteSpace: 'normal', textWrap: 'balance', width: Math.floor(tableW - (evlW[k] - evlTxtW[k]) - 4) + 'px' })
      })
      y += 18 + L.evlH
    } else for (const e of evLines) style(e.el, { display: 'none' })
  }
  if (fEls.length) {
    if (L.lv.formulas) {
      fEls.forEach((el, k) => style(el, { left: GRID.left + PAD + 'px', top: Math.round(y + 18 + k * 48) + 'px' }))
      y += 18 + L.fH
    } else for (const el of fEls) style(el, { display: 'none' })
  }
  style(mask, { left: GRID.left - 22 + 'px', width: tableW + 44 + 'px', top: top - 14 + 'px', height: Math.round(y - top + 26) + 'px' })
  Object.assign(root.dataset, {
    cell: String(L.cellPx), pitch: String(L.pitch), stake: String(!!L.lv.stake), formulas: String(!!L.lv.formulas),
    events: L.lv.evInline ? 'inline' : evLineOn ? 'line' : 'none', plans: String(L.lv.plans), fallback: String(!!L.fallback),
  })

  // ---------------------------------------------------------------- sound: one cue per real beat
  // each row ticks as its values pop in; an event row adds its accent (crash = thud), the total line a pop; the winner
  // a ding unless the verdict's reveal lands with it. An accent the spec already cues at that beat is not doubled.
  const specCue = x => (spec.sfx || []).some(c => Math.abs(+c.t - x) < 0.15)
  R.forEach((row, i) => {
    if (pre[i]) return
    ctx.cue(T[i], 'tick', { gain: 0.32 }) // the row's values pop in
    const at = T[i] + 0.05
    if (specCue(at)) return
    if (row.ev && row.r.tone === 'bad') ctx.cue(at, 'thud', { gain: 0.55 })
    else if (row.ev || i === finalIdx) ctx.cue(at, 'pop', { gain: 0.45 })
  })
  if (isFinite(winT)) {
    const vt = hasVerdict ? +spec.verdict.t : -Infinity
    if (Math.abs(winT - vt) > 0.35 && !specCue(winT + MOTION.popDelay)) ctx.cue(winT + MOTION.popDelay, 'ding', { gain: 0.55 })
  }
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.25 })

  // ---------------------------------------------------------------- seek helpers
  const SAND = toneColor('neutral')
  const accBefore = i => { let a = 0; for (let k = 0; k < i; k++) a += Math.round(R[k].extra * (R[k].open || 0)); return a }

  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      const cleared = loop && t >= clearT0 + MOTION.clear
      const winP = isFinite(winT) ? landing(t, winT) : { wipe: 0, text: 0 }
      // rows: an event row's note line opens as it lands (and closes again with the loop clear)
      let acc = 0
      R.forEach((row, i) => {
        const open = !row.extra ? 0 : pre[i] ? 1 : ease.inOut(prog(t, T[i], 0.28)) * keep
        const grow = Math.round(row.extra * open)
        style(row.el, { top: row.base + acc + 'px', height: row.main + grow + 'px' })
        row.open = open
        acc += grow
      })
      style(ruleBot, { top: mainEnd + acc + 2 + 'px' })
      if (sum) style(sum, { top: R[finalIdx].base + accBefore(finalIdx) - 2 + 'px' })
      R.forEach((row, i) => {
        const r = row.r
        const isPre = pre[i]
        const land = T[i]
        const rowKeep = isPre ? 1 : keep
        // year label: grey while the row waits, ink once it lands (hidden until then with labels: 'with-row')
        const lp = isPre ? 1 : t >= land ? prog(t, land, 0.18) * keep : 0
        style(row.lab, { color: labelColor(lp) })
        if (!labelsAhead && !isPre) fade(row.lab, t >= land ? Math.min(1, prog(t, land, 0.12) * 1.0) * keep : 0)
        // each whole value pops into place, both columns at once (the right one a beat later): a half-typed figure
        // is never on screen
        row.cells.forEach((c, j) => {
          const p = isPre ? 1 : cleared ? 0 : prog(t, land + j * 0.06, Math.max(MOTION.pop, typeD[i]))
          const isWin = i === finalIdx && j === W0
          c.hl.seek(isWin ? winP.wipe * keep : 0, p, 0)
          fade(c.el, isPre ? 1 : t < land ? 1 : rowKeep)
        })
        // band: tone rows swipe their tone and keep a rested tint; plain rows get the moving sand cursor
        const next = NEXT[i]
        const wipe = isPre ? 1 : ease.out(prog(t, land, MOTION.wipe))
        let color, op
        if (r.tone && r.tone !== 'goal') {
          color = toneColor(r.tone)
          op = wipe > 0 ? lerp(1, MOTION.rest, prog(t, next + 0.05, MOTION.restIn)) : 0
        } else {
          color = SAND
          let off = prog(t, next, 0.25)
          if (i === finalIdx && isFinite(winT)) off = Math.max(off, prog(t, winT, 0.3))
          op = wipe > 0 ? 1 - off : 0
        }
        style(row.band, {
          background: color,
          opacity: n3(op * rowKeep),
          clipPath: wipe >= 1 ? 'none' : `inset(0 ${n3((1 - wipe) * 100)}% 0 0 round 10px)`,
        })
        if (row.ev && L.lv.evInline) fadeUp(row.ev, (isPre ? 1 : prog(t, land + 0.24, MOTION.fade)) * rowKeep * (row.open >= 0.9 ? 1 : 0), 8)
      })
      // shared event line (fallback layout): the latest event, replaced by the next one
      if (evLineOn) {
        evLines.forEach((e, k) => {
          const i = R.indexOf(e.x)
          const land = T[i]
          const nextEv = evLines[k + 1] ? T[R.indexOf(evLines[k + 1].x)] : Infinity
          const on = pre[i] ? 1 : prog(t, land + 0.12, MOTION.fade)
          const off = prog(t, nextEv, 0.18)
          fadeUp(e.el, on * (1 - off) * keep, 8)
          const L2 = pre[i] ? { wipe: 1 } : landing(t, land + 0.12)
          e.key.seek(L2.wipe, 1, 0)
        })
      }
      // the winner: blue under the name with the final value's box
      TH.forEach((th, j) => {
        const p = j === W0 && isFinite(winT) ? ease.out(prog(t, winT + 0.12, 0.38)) * keep : 0
        style(th.name, { '--hw': n3(p * 100) + '%' })
      })
    },
  }
}
