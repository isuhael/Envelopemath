// split-sheet — one round sum, every percentage in dollars (P9), on the Clean Sheet.
//
// The whole sheet is on the page at frame 1 (Yannick's finished sheet): the total on its yellow highlighter at the
// top ("Take-home pay ······ $4,000"), a split bar under it (one empty segment per part, sized by `share`), then
// one line per part: label (a grey note under it), its percentage in grey mono, a dotted leader, and an empty
// dashed slot where its dollars will land. A pointer walks down the right edge of the sheet, never over a number.
// Each part: the pointer lands on the row, its percentage turns accent and the leader traces in accent from the %
// toward the slot (percentage → dollars); the optional working (part.formula, "5 × $400") types in grey mono and
// ends in "=" right before the slot, then the highlighter swipes in and the amount pops. The working STAYS, so the
// finished page is a worked sheet ("50% ··· 5 × $400 = $2,000"). The bar segment fills in the colour its amount
// lands on (green, the goal blue, a bad part coral) and rests with it. The previous amount rests, so the newest is
// the only loud number. Then the sum rule and the accent check line: every
// amount comes back to full (a goal part stays the only loud one), the total lights up again, the pointer leaves,
// the finished sheet holds, and (lookOpts.loop, default on) the last 0.7 s clears back to frame 1.
//
// Layout engine (measured with the real fonts at mount). Labels share one column so the % column and the leaders
// line up (short labels keep their natural width; a label too long for the column wraps to 2 balanced lines).
// Candidates by cost, cheapest first: type size (1.16 / 1.08 only break ties on short sheets; then 4 per 4%), no
// notes (6), no bar (2), dense spacing (3), the wrong guess off its row (4), the working hung under its amount
// (20: "= 5.5 × $350" right-aligned under the box), no check line (30), the working typed in the slot and erased by
// the highlighter (60) or gone (80). Nothing fits: the candidate that misses by the least (never a fixed shape).
// lookOpts.debug logs every candidate and why it failed.
//
// Spec extensions (all optional): total.note (grey line under the total, e.g. "10% = $400"); part.formula (the
// mental shortcut); data.check / checkT (contract; always "check: …", hung under the sum when it breaks); data.hold.
// A part without a tone is neutral (its amount lands on green). lookOpts: loop (true), pointer (true), bar (auto;
// false hides it, true insists on it), notes (auto; false hides them), formulas (auto | 'line' | 'under' | 'slot' |
// false), debug,
// wrongGuess { part, t, formula, result, strike = true, strikeT, until }: a wrong answer whose working types under
// row `part` (or on the line under the sheet, where the check lands later, when there is no room) and whose result
// lands on coral at `t`, struck through at strikeT, gone by `until` (default: as the next part starts). t <= 0 puts
// the guess on the sheet already typed at frame 1 (the wrong answer as the hook); the loop restores it.
// maskPct: [part index, ...]: those percentages read "?" until their row activates (the goal row's % would otherwise
// answer the header at frame 1); a kit that ignores it simply shows the full sheet.
// activate: [t | null, ...] per part: the row activates (pointer lands, % turns accent, a masked % unmasks, the
// previous amount rests) at this t instead of just before its amount lands, so the walk follows the VO naming the row
// ("Crew pay: ... ≈ $2.51": the pointer is on the row from "Crew", the amount lands on "$2.51"). Never before the
// previous amount has landed + 0.5 s.
// bumps: [{ t, at }]: a VO-synced nudge (the box scales up ~8% and back over 0.42 s, a resting box re-lights for it, a
// soft tick) on 'total', 'guess' or a part index: e.g. the hook's "$10" and "$7.04?" as the first VO line says them.
import { h, css as style, prog, ease, clamp, lerp } from '../../../runtime/core.js'
import { C, SIZE, GRID, MOTION, md, hlBox, typeLine, pointer, pathAt, fade, show, blink, landing, durationOf, typeTime, toneColor, readCheck, breakLine } from '../lib.js'

export const css = `
.ss > * { position: absolute; }
.ss-label { white-space: nowrap; font: 700 46px/1.12 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.ss-label.wrap { white-space: normal; text-wrap: balance; }
.ss-label em { font-style: normal; color: #2F6FEB; }
.ss-label u.mark2 { text-decoration: none; color: #B42318; }
.ss-note { white-space: nowrap; font: 500 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.ss-note em { font-style: normal; color: #15171C; font-weight: 600; }
.ss-note u.mark2 { text-decoration: none; color: #B42318; }
.ss-pct { white-space: nowrap; font: 600 44px/1 'IBM Plex Mono', 'Inter Full', monospace; color: #6B7280; text-align: right; letter-spacing: -.02em; }
.ss-leader, .ss-trace { height: 6px; background-repeat: repeat-x; background-size: 16px 6px; }
.ss-leader { background-image: radial-gradient(circle at 3px 3px, #9AA1AC 0, #9AA1AC 2.4px, transparent 2.9px); }
.ss-trace { background-image: radial-gradient(circle at 3px 3px, #2F6FEB 0, #2F6FEB 2.8px, transparent 3.3px); }
.ss-slot { box-sizing: border-box; border: 3px dashed #C9D1DB; border-radius: 10px; }
.ss-rule { height: 3px; background: #15171C; border-radius: 2px; }
.ss-rule.thin { height: 2px; }
.ss-hair { height: 2px; background: #E3DFD4; border-radius: 1px; }
.ss-seg, .ss-seg-empty { position: absolute; box-sizing: border-box; border-radius: 7px; }
.ss-seg-empty { border: 2px dashed #C9D1DB; }
.ss-seg { border: 2px solid rgba(21, 23, 28, .16); }
.ss-strike { height: 5px; background: #B42318; border-radius: 3px; transform-origin: 0 50%; pointer-events: none; }
.ss-check, .ss-guess-f, .ss-f { white-space: pre; }
.ss-pct .ss-pq { position: absolute; right: 0; top: 0; }
.ss-check.wrap { white-space: pre-wrap; }
`

// type clamps at the floors below (labels 40, amounts 50, total 56); a short sheet (3 parts, short labels) may set its
// type a little larger rather than leave the lower page empty (a scale above 1 only breaks ties, never buys a feature)
const SCALES = [1.16, 1.08, 1, 0.96, 0.92, 0.88, 0.84]
const FLOOR = { label: 40, amount: 50, total: 56 }
const RAISE = 14   // tight (dense) sheets start this much closer to the footer
const SNUG = 10    // ...and a tight sheet that misses by at most this much starts that much higher still, rather than
                   // lose a feature (05a: the check line would otherwise go for 7 px; the footer gap stays >= 20 px)
const LEAD = 0.3   // the row activates (pointer lands, % turns accent, leader traces) this long before typing / landing
const F_GAP = 16   // gap either side of a formula on the line

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(p)))).join(',')})` }
const n3 = v => (Math.round(v * 1000) / 1000).toString()
const W = el => el.getBoundingClientRect().width
const H = el => el.getBoundingClientRect().height
/** right edge of the text actually set in el (a balanced wrap is narrower than its box) */
function inkRight(el) {
  const r = document.createRange()
  r.selectNodeContents(el)
  return Math.max(...[...r.getClientRects()].map(b => b.right), el.getBoundingClientRect().left)
}

export default function splitSheet(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const total = d.total || {}
  const parts = (d.parts || []).slice(0, 8)
  const n = parts.length
  const goalIdx = parts.findIndex(p => p.tone === 'goal')
  const wgSpec = LO.wrongGuess || d.wrongGuess || null
  const chk = readCheck(d, LO) // a string or { t, text }, in data or lookOpts; always "check: …" (one look kit-wide)
  const ACT = Array.isArray(LO.activate) ? LO.activate : null
  const BUMPS = Array.isArray(LO.bumps) ? LO.bumps.filter(b => b && b.at != null && Number.isFinite(+b.t)) : []
  const checkRaw = chk ? chk.text : ''

  // ---------------------------------------------------------------- DOM (built once)
  const root = h('div', { class: 'ss' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)
  const x0 = GRID.left, xR = P.right, width = xR - x0

  const tot = {
    label: h('div', { class: 'ss-label', html: md(total.label || 'Total') }),
    note: total.note ? h('div', { class: 'ss-note', html: md(total.note) }) : null,
    leader: h('div', { class: 'ss-leader', 'data-deco': '' }),
    box: hlBox({ html: md(total.display || ''), tone: 'input', px: 72 }),
  }
  for (const e of [tot.label, tot.note, tot.leader, tot.box.el]) if (e) root.append(e)
  style(tot.box.el, { position: 'absolute' })

  // split bar (decoration): one segment per part, sized by share
  const shares = parts.map(p => +p.share)
  const hasShares = n > 0 && shares.every(v => isFinite(v) && v > 0)
  const shareSum = hasShares ? shares.reduce((a, b) => a + b, 0) : 1
  const barRoot = h('div', { 'data-deco': '' })
  // each segment fills in the colour its amount lands on (green for neutral and good, blue for the goal, coral for a
  // bad part) and rests with it, so the bar and the amounts speak one colour grammar; the gaps keep neighbours apart
  const segs = parts.map((p, i) => {
    const empty = h('div', { class: 'ss-seg-empty', 'data-deco': '' })
    const fill = h('div', { class: 'ss-seg', 'data-deco': '' })
    style(fill, { background: toneColor(!p.tone || p.tone === 'neutral' ? 'good' : p.tone) })
    barRoot.append(empty, fill)
    return { empty, fill, share: hasShares ? shares[i] / Math.max(1, shareSum) : 0 }
  })
  const hairs = parts.slice(1).map(() => h('div', { class: 'ss-hair', 'data-deco': '' })) // between rows, dense mode
  const ruleTop = h('div', { class: 'ss-rule', 'data-deco': '' })
  const ruleSum = h('div', { class: 'ss-rule thin', 'data-deco': '' })
  root.append(barRoot, ruleTop, ruleSum, ...hairs)

  const maskSet = new Set(Array.isArray(LO.maskPct) ? LO.maskPct.map(Number) : [])
  const R = parts.map((p, i) => {
    const goal = p.tone === 'goal'
    const masked = !!p.pct && maskSet.has(i)
    const r = {
      p, i, goal,
      label: h('div', { class: 'ss-label', html: md(p.label || '') }),
      note: p.note ? h('div', { class: 'ss-note', html: md(p.note) }) : null,
      // a masked % keeps its real text for the layout (measured) and shows a right-aligned "?" over it until its turn
      pct: p.pct ? h('div', { class: 'ss-pct', html: masked ? `<span class="ss-pv">${md(p.pct)}</span><span class="ss-pq">?</span>` : md(p.pct) }) : null,
      leader: h('div', { class: 'ss-leader', 'data-deco': '' }),
      trace: h('div', { class: 'ss-trace', 'data-deco': '' }),
      slot: h('div', { class: 'ss-slot', 'data-deco': '' }),
      // a neutral amount lands on the green result highlighter (sand reads as a disabled field); tones keep theirs
      box: hlBox({ html: md(p.amount || ''), tone: !p.tone || p.tone === 'neutral' ? 'good' : p.tone, px: goal ? 66 : 60 }),
      // the working: on the line (stays, ends in "=") or in the slot (erased by the highlighter)
      fLine: p.formula ? typeLine({ text: p.formula, suffix: ' =', px: 42, cls: 'ss-f' }) : null,
      fSlot: p.formula ? typeLine({ text: p.formula, px: 42, cls: 'ss-f' }) : null,
      // dense sheets: the working hangs off the amount on the line under it, right-aligned ("$1,925 / = 5.5 × $350")
      fUnder: p.formula ? typeLine({ text: '= ' + p.formula, px: 42, cls: 'ss-f' }) : null,
    }
    if (masked) { r.pv = r.pct.querySelector('.ss-pv'); r.pq = r.pct.querySelector('.ss-pq') }
    if (r.fSlot) r.fSlot.el.setAttribute('data-overlap-ok', '') // erased by the highlighter's leading edge
    for (const e of [r.label, r.note, r.pct, r.leader, r.trace, r.slot, r.box.el, r.fLine && r.fLine.el, r.fSlot && r.fSlot.el, r.fUnder && r.fUnder.el]) if (e) root.append(e)
    style(r.box.el, { position: 'absolute' })
    return r
  })

  // check line, measured against the column (x 84 -> 940): "check: " + the sum on one line, else two (or three) lines
  // broken before "=" or an operator (" + ")
  const checks = []
  if (checkRaw) {
    const pick = breakLine(root, checkRaw, xR - x0)
    const k = typeLine({ text: pick.text, px: SIZE.check, color: C.accent, weight: 500, cls: 'ss-check' })
    k.lines = pick.lines
    root.append(k.el)
    checks.push(k)
  }
  let check = null

  const hasGuess = !!(wgSpec && wgSpec.formula && wgSpec.result)
  const guessPart = hasGuess && Number.isInteger(wgSpec.part) && wgSpec.part >= 0 && wgSpec.part < n ? wgSpec.part : 0
  let guess = null
  if (hasGuess) {
    const f = typeLine({ text: wgSpec.formula, suffix: ' =', px: 42, cls: 'ss-guess-f' })
    const box = hlBox({ html: md(wgSpec.result), tone: 'bad', px: 48 })
    const strike = h('div', { class: 'ss-strike', 'data-deco': '' })
    root.append(f.el, box.el, strike)
    style(box.el, { position: 'absolute' })
    guess = { f, box, strike }
  }

  const pt = LO.pointer !== false && n ? pointer({ dir: 'left', size: 56 }) : null
  if (pt) root.append(pt.el)

  // ---------------------------------------------------------------- layout engine
  const avail = P.bottom - P.top
  const hasNotes = R.some(r => r.note) && LO.notes !== false
  const hasFormulas = R.some(r => r.fLine)
  const barOK = hasShares && LO.bar !== false
  const debug = !!LO.debug

  // tight = the dense variant for long sheets: smaller gaps, boxes that hug their figures, a smaller total
  function metrics(sc, tight) {
    const g = tight ? 0.4 : 1
    return {
      lpx: Math.max(FLOOR.label, Math.round(SIZE.label * sc)), apx: Math.max(FLOOR.amount, Math.round(60 * sc)),
      gpx: Math.max(FLOOR.amount + 4, Math.round(66 * sc)), tpx: Math.max(FLOOR.total, Math.round((tight ? 64 : 72) * sc)),
      boxK: tight ? 1.2 : 1.3, wrapLH: tight ? 1.08 : 1.12, gpxGuess: tight ? 42 : 48,
      raise: tight ? RAISE : 0, // a dense sheet starts a little closer to the footer
      ppx: Math.max(40, Math.round(44 * sc)), fpx: Math.max(40, Math.round(42 * sc)), npx: SIZE.note,
      G: Math.round(20 * sc), lead: 40,
      rowGap: Math.round((tight ? 12 : 22) * sc), g1: Math.round(24 * sc * g), g2: Math.round(30 * sc * g),
      barH: Math.round(24 * sc), ruleGap: Math.round(22 * sc * g), checkGap: Math.round(16 * sc * g),
      noteGap: tight ? 0 : 2,
    }
  }
  const okFloors = m => m.lpx >= FLOOR.label && m.apx >= FLOOR.amount && m.tpx >= FLOOR.total

  // place everything for one candidate c = { sc, tight, formulas: 'line' | 'slot' | false, notes, bar, guessUnder }
  function place(c, extra = 0, lift = 0) {
    const m = metrics(c.sc, c.tight)
    const why = []
    const lineH = Math.round(m.lpx * 1.12)
    const wrapH = Math.round(m.lpx * m.wrapLH)
    const noteH = Math.round(m.npx * 1.15)
    for (const e of [tot.note, ...R.map(r => r.note)]) if (e) style(e, { lineHeight: noteH + 'px' })
    // ---- horizontal: measure every run at this size
    for (const r of R) {
      r.apx = r.goal ? m.gpx : m.apx
      r.boxH = Math.round(r.apx * m.boxK)
      r.box.setPx(r.apx, r.boxH)
      r.boxW = Math.ceil(r.box.width())
      r.padF = Math.round(14 * Math.sqrt(r.apx / SIZE.result))
      r.f = r.fLine ? ({ line: r.fLine, under: r.fUnder, slot: r.fSlot }[c.formulas] || null) : null
      if (r.fLine) for (const v of [r.fLine, r.fSlot, r.fUnder]) show(v.el, r.f === v)
      r.fW = 0
      if (r.f) { r.f.setPx(m.fpx); r.fW = Math.ceil(r.f.measure()) + 8 } // + caret
      r.slotW = c.formulas === 'slot' && r.f ? Math.max(r.boxW, r.fW + 2 * r.padF) : r.boxW
      r.fRes = c.formulas === 'line' && r.f ? F_GAP + r.fW + F_GAP : m.G // what sits between the leader and the slot
      if (r.pct) style(r.pct, { fontSize: m.ppx + 'px' })
      r.pctW = r.pct ? Math.ceil(W(r.pct)) : 0
      r.label.classList.remove('wrap')
      style(r.label, { fontSize: m.lpx + 'px', width: '', lineHeight: lineH + 'px' })
      r.labNat = Math.ceil(W(r.label))
      if (r.note) { show(r.note, c.notes); if (c.notes) { style(r.note, { fontSize: m.npx + 'px' }); r.noteW = Math.ceil(W(r.note)) } }
    }
    const PW = Math.max(0, ...R.map(r => r.pctW))
    const pctBlock = PW ? m.G + PW : 0
    let cap = Infinity
    for (const r of R) cap = Math.min(cap, width - pctBlock - m.G - m.lead - r.fRes - r.slotW)
    const labMax = Math.max(...R.map(r => r.labNat))
    const LW = Math.floor(Math.min(labMax, cap))
    // short labels (Live / Invest / Enjoy) are fine at their natural width; fail only when the column is squeezed
    if (cap < Math.min(150, labMax)) why.push('label column ' + Math.floor(cap))
    for (const r of R) {
      r.lines = 1
      r.labH = lineH
      if (r.labNat > LW + 0.5) {
        r.label.classList.add('wrap')
        style(r.label, { width: LW + 'px', lineHeight: wrapH + 'px' })
        r.lines = Math.round(H(r.label) / wrapH)
        r.labH = r.lines * wrapH
        if (r.lines > 2) why.push('label 3+ lines: ' + r.p.label)
        if (r.label.scrollWidth > LW + 1) why.push('label word too wide: ' + r.p.label)
      }
    }
    // total row
    const tBoxH = Math.round(m.tpx * m.boxK)
    tot.box.setPx(m.tpx, tBoxH)
    const tBoxW = Math.ceil(tot.box.width())
    tot.label.classList.remove('wrap')
    style(tot.label, { fontSize: m.lpx + 'px', width: '', lineHeight: lineH + 'px' })
    const tNat = Math.ceil(W(tot.label))
    const tAvail = width - m.G - m.lead - m.G - tBoxW
    let tLines = 1, tLW = tNat, tLabH = lineH
    if (tNat > tAvail) {
      tLW = Math.floor(tAvail)
      tot.label.classList.add('wrap')
      style(tot.label, { width: tLW + 'px', lineHeight: wrapH + 'px' })
      tLines = Math.round(H(tot.label) / wrapH)
      tLabH = tLines * wrapH
      if (tLines > 2 || tot.label.scrollWidth > tLW + 1) why.push('total label too long')
    }
    const tNoteOn = !!tot.note && (c.notes || !!c.formulas)
    if (tot.note) { show(tot.note, tNoteOn); style(tot.note, { fontSize: m.npx + 'px' }) }
    const tNoteW = tNoteOn ? Math.ceil(W(tot.note)) : 0

    // ---- vertical
    const top0 = P.top - m.raise - lift
    let y = top0
    let totEnd = y
    {
      const mainH = Math.max(tBoxH, tLabH)
      const yc = y + mainH / 2
      const lt = Math.round(yc - tLabH / 2)
      style(tot.label, { left: x0 + 'px', top: lt + 'px' })
      const boxLeft = xR - tBoxW
      style(tot.box.el, { left: boxLeft + 'px', top: Math.round(yc - tBoxH / 2) + 'px' })
      const ll = Math.ceil(inkRight(tot.label)) + m.G
      style(tot.leader, { left: ll + 'px', top: Math.round(yc - 1) + 'px', width: Math.max(0, boxLeft - m.G - ll) + 'px' })
      let bottom = y + mainH
      if (tNoteOn) {
        let nt = Math.round(lt + tLabH + m.noteGap)
        if (x0 + tNoteW > boxLeft - m.G) nt = Math.max(nt, Math.round(yc + tBoxH / 2) + 2)
        style(tot.note, { left: x0 + 'px', top: nt + 'px' })
        bottom = Math.max(bottom, nt + noteH)
      }
      tot.yc = yc
      totEnd = bottom
      y = Math.round(bottom) + m.g1 + Math.round(extra * 0.6)
    }
    show(barRoot, c.bar)
    show(ruleTop, !c.bar)
    if (c.bar) {
      let acc = 0
      for (const sg of segs) {
        const a = x0 + acc * width, b = x0 + (acc + sg.share) * width
        acc += sg.share
        const w = Math.max(6, Math.round(b - a) - (acc < 0.999 ? 6 : 0))
        for (const e of [sg.empty, sg.fill]) style(e, { left: Math.round(a) + 'px', top: y + 'px', width: w + 'px', height: m.barH + 'px' })
      }
      y += m.barH + m.g2 + Math.round(extra * 0.6)
    } else {
      style(ruleTop, { left: x0 + 'px', top: y + 'px', width: width + 'px' })
      y += 3 + m.g2 + Math.round(extra * 0.4)
    }
    const pctRight = x0 + LW + pctBlock
    const guessH = guess ? Math.round(m.gpxGuess * m.boxK) : 0
    const guessUnder = guess && c.guessUnder
    R.forEach((r, i) => {
      const mainH = Math.max(r.boxH, r.labH)
      r.yc = y + mainH / 2
      const bt = Math.round(r.yc - r.boxH / 2)
      const lt = Math.round(r.yc - r.labH / 2)
      style(r.label, { left: x0 + 'px', top: lt + 'px' })
      if (r.pct) style(r.pct, { left: Math.round(pctRight - r.pctW) + 'px', top: Math.round(r.yc - m.ppx / 2 + 1) + 'px' })
      r.slotLeft = xR - r.slotW
      r.boxLeft = xR - r.boxW
      style(r.slot, { left: r.slotLeft + 'px', top: bt + 'px', width: r.slotW + 'px', height: r.boxH + 'px' })
      style(r.box.el, { left: r.boxLeft + 'px', top: bt + 'px' })
      // leader: full length (to the slot) on frame 1; a formula on the line retracts it to make room
      // leader: frame 1 runs to the empty slot; finally it runs to the amount (or to the working on the line)
      r.ll = (PW ? pctRight : x0 + LW) + m.G
      r.lead1 = Math.max(0, r.slotLeft - m.G - r.ll)
      r.leadEnd = Math.max(0, (c.formulas === 'line' && r.f ? r.slotLeft - r.fRes : r.boxLeft - m.G) - r.ll)
      r.leadW = Math.max(r.lead1, r.leadEnd)
      if (Math.min(r.lead1, r.leadEnd) < m.lead - 0.5) why.push('leader ' + Math.round(Math.min(r.lead1, r.leadEnd)))
      style(r.leader, { left: r.ll + 'px', top: Math.round(r.yc - 1) + 'px', width: r.leadW + 'px' })
      style(r.trace, { left: r.ll + 'px', top: Math.round(r.yc - 1) + 'px', width: Math.min(r.lead1, r.leadEnd) + 'px' })
      let bottom = y + mainH
      let under = Math.round(lt + r.labH + m.noteGap) // the next free line under the label
      if (r.f) {
        if (c.formulas === 'under') {
          // the working hangs off the amount: "= 5.5 × $350" right-aligned under the box, ending at the rail, so the
          // finished row reads "Necessities 55% ···· $1,925 / = 5.5 × $350" (it stays). The note (left) shares that
          // line when they clear each other.
          const fH = Math.round(m.fpx * 1.2)
          const textW = r.fW - 8 // without the caret
          r.fLeft = Math.round(xR - textW)
          r.fTop = bt + r.boxH + 2
          style(r.f.el, { left: r.fLeft + 'px', top: r.fTop + 'px' })
          if (r.fLeft < x0) why.push('formula too wide: ' + r.p.formula)
          r.fBottom = r.fTop + fH
          bottom = Math.max(bottom, r.fBottom)
        } else {
          r.fLeft = c.formulas === 'line' ? r.slotLeft - F_GAP - r.fW : r.slotLeft + r.padF
          style(r.f.el, { left: r.fLeft + 'px', top: Math.round(r.yc - (m.fpx * 1.2) / 2) + 'px' })
        }
      }
      if (r.note && c.notes) {
        let nt = under
        if (x0 + r.noteW > r.ll - 4) nt = Math.max(nt, bt + r.boxH + 2) // a long note goes under the box
        // the hanging working (right) and the note (left) share a line only when they clear each other
        if (r.f && c.formulas === 'under' && nt + noteH > r.fTop && x0 + r.noteW > r.fLeft - 24) nt = Math.max(nt, r.fBottom)
        if (x0 + r.noteW > xR) why.push('note too wide: ' + r.p.note)
        style(r.note, { left: x0 + 'px', top: nt + 'px' })
        bottom = Math.max(bottom, nt + noteH)
      }
      bottom = Math.round(bottom)
      if (guessUnder && i === guessPart) {
        r.guessTop = bottom + Math.round(8 * c.sc)
        bottom = r.guessTop + guessH
      }
      y = bottom + (i < n - 1 ? m.rowGap + extra : 0)
      if (i < n - 1) {
        show(hairs[i], c.tight)
        style(hairs[i], { left: x0 + 'px', width: width + 'px', top: Math.round((bottom + y) / 2 - 1) + 'px' })
      }
    })
    const rowsEnd = y
    // sum rule + check line (the wrong guess uses this line when it has no room under its row)
    const ckOn = checks.length > 0 && c.check !== false
    check = ckOn ? checks[0] : null
    for (const k of checks) show(k.el, ckOn)
    show(ruleSum, ckOn)
    let lineTop = null
    if (ckOn || (guess && !guessUnder)) {
      y += m.ruleGap + Math.round(extra * 0.5)
      style(ruleSum, { left: x0 + 'px', top: y + 'px', width: width + 'px' })
      y += 2 + m.checkGap
      lineTop = y
      let lh = 0
      if (ckOn) {
        style(check.el, { left: x0 + 'px', top: y + 'px' })
        if (check.measure() > width + 1) why.push('check too wide')
        lh = Math.round(SIZE.check * 1.2) * check.lines
      }
      if (guess && !guessUnder) lh = Math.max(lh, guessH)
      y += Math.round(lh)
    }
    if (guess) {
      const top = guessUnder ? R[guessPart].guessTop : lineTop
      guess.box.setPx(m.gpxGuess, guessH)
      guess.f.setPx(Math.max(40, m.fpx))
      const fH = Math.round(Math.max(40, m.fpx) * 1.2)
      const fw = Math.ceil(guess.f.measure())
      style(guess.f.el, { left: x0 + 'px', top: Math.round(top + (guessH - fH) / 2) + 'px' })
      const bl = x0 + fw + 16
      style(guess.box.el, { left: bl + 'px', top: top + 'px' })
      const bw = Math.ceil(guess.box.width())
      if (bl + bw > xR) why.push('wrong guess too wide')
      style(guess.strike, { left: x0 - 8 + 'px', top: Math.round(top + guessH / 2 - 2) + 'px', width: bw + fw + 32 + 'px' })
    }
    const height = y - top0
    const over = Math.max(0, height - (avail + m.raise + lift))
    if (over > 0) why.push(`height ${Math.round(height)} > ${avail + m.raise + lift} (rows end ${Math.round(rowsEnd)}, total ${Math.round(totEnd)})`)
    // how bad a failing candidate is: overflow in px, plus a penalty per other failure (squeezed or too wide)
    return { fits: !why.length, height, raise: m.raise + lift, lift, over, why, bad: over + 400 * (why.length - (over > 0 ? 1 : 0)) }
  }

  // candidates, cheapest first. Cost: smaller type (4 per 4%), no notes (6), no bar (2), dense spacing (3), the wrong
  // guess off its row (4), the working hung under its amount (20), no check line (30), the working typed in the slot
  // and erased (60) or gone (80). The working outranks type size, notes and the check (under + no check = 50 still
  // beats an erased working). The first that fits wins.
  const fModes = !hasFormulas ? [false] : LO.formulas === false ? [false] : ['line', 'under', 'slot'].includes(LO.formulas) ? [LO.formulas] : ['line', 'under', 'slot', false]
  const cands = []
  for (const sc of SCALES) {
    if (!okFloors(metrics(sc, false))) continue
    for (const formulas of fModes) for (const notes of hasNotes ? [true, false] : [false]) for (const bar of barOK ? [true, false] : [false]) {
      if (!bar && barOK && LO.bar === true) continue
      for (const tight of [false, true]) for (const guessUnder of guess ? [true, false] : [false]) for (const ck of checks.length ? [true, false] : [true]) {
        // the working outranks the notes: notes go before the working leaves its line (slot) or the sheet (false)
        const cost = (sc > 1 ? -(sc - 1) * 10 : Math.round((1 - sc) * 100)) + (hasFormulas ? { line: 0, under: 20, slot: 60, false: 80 }[formulas] : 0) +
          (hasNotes && !notes ? 6 : 0) + (barOK && !bar ? 2 : 0) + (tight ? 3 : 0) + (guess && !guessUnder ? 4 : 0) +
          (ck ? 0 : 30) // the check line goes before the working leaves the sheet
        cands.push({ c: { sc, formulas, notes, bar, tight, guessUnder, check: ck }, cost, k: cands.length })
      }
    }
  }
  cands.sort((a, b) => a.cost - b.cost || a.k - b.k)
  let chosen = null, best = null
  for (const { c, cost } of cands) {
    let r = place(c)
    // a tight sheet whose only miss is a few px of height starts up to SNUG px higher (closer to the footer)
    if (!r.fits && c.tight && r.why.length === 1 && r.over > 0 && r.over <= SNUG) r = place(c, 0, Math.ceil(r.over))
    if (debug) console.log('split-sheet', cost, JSON.stringify(c), r.fits ? 'FITS' : r.why.join('; '))
    if (r.fits) { chosen = { c, height: r.height, raise: r.raise, lift: r.lift }; break }
    if (!best || r.bad < best.bad - 0.5 || (Math.abs(r.bad - best.bad) <= 0.5 && cost < best.cost)) best = { c, cost, bad: r.bad, height: r.height, raise: r.raise, lift: r.lift, why: r.why }
  }
  if (!chosen) {
    // nothing fits: the failing candidate that misses by the least (then the cheapest), so the check and the bar
    // survive whenever they can; the linter reports whatever still does not fit
    chosen = best
    console.warn('split-sheet: no layout fits; using', JSON.stringify(best.c), '(' + best.why.join('; ') + ')')
  }
  // breathe: spend spare height on the row gaps (top-aligned like a real sheet), capped so the rows stay one sheet
  const LC = chosen.c
  const spare = avail + chosen.raise - chosen.height
  const extra = n > 1 ? Math.max(0, Math.min(LC.tight ? 14 : n <= 4 ? 44 : 26, Math.floor((spare * 0.5) / (n - 1 + 1.6)))) : 0
  place(LC, extra, chosen.lift || 0)
  root.dataset.layout = [LC.notes ? 'notes' : 'bare', LC.bar && 'bar', LC.formulas && 'formulas-' + LC.formulas, LC.tight && 'tight', LC.guessUnder && 'guess-under', checks.length && !LC.check && 'no-check'].filter(Boolean).join(' ')
  root.dataset.scale = String(LC.sc)

  // ---------------------------------------------------------------- timing
  // part.t = the moment its amount lands (highlighter starts). Its working types just before (a formula in the
  // slot gets a longer read, since the highlighter erases it), and the row activates LEAD before that.
  const T = []
  R.forEach((r, i) => {
    const prev = T[i - 1]
    const t = r.p.t != null ? +r.p.t : prev ? prev.t + 3.0 : 1.6
    let typeD = r.f ? clamp(typeTime(r.f.full), 0.35, 0.85) : 0
    let typeStart = t - (LC.formulas === 'slot' ? 0.65 : 0.3) - typeD
    let arr = (r.f ? typeStart : t) - LEAD
    if (ACT && ACT[i] != null && Number.isFinite(+ACT[i])) arr = Math.min(arr, +ACT[i]) // as the VO names the row
    if (prev) arr = Math.max(arr, prev.t + 0.5)
    if (r.f) {
      typeStart = Math.max(typeStart, arr + 0.15)
      typeD = Math.max(0.15, Math.min(typeD, t - 0.12 - typeStart))
    }
    if (i === 0 && arr <= 1.5) arr = -1 // the first row is the active row on frame 1 (the pointer is on it)
    T.push({ t, typeD, typeStart, arr })
  })
  const last = T[n - 1] || { t: 1 }
  const checkT = chk && chk.t != null ? chk.t : last.t + 1.4
  const checkD = check ? typeTime(check.full) : 0

  let G = null
  if (guess) {
    const typeD = clamp(typeTime(guess.f.full), 0.35, 0.9)
    // t <= 0: the guess is on the sheet, typed and landed, from frame 1 (and the loop puts it back)
    const frame1 = wgSpec.t != null && +wgSpec.t <= 0
    const resT = frame1 ? -1 : wgSpec.t != null ? +wgSpec.t : (T[0] ? T[0].t + 2.0 : 2.5)
    const gt = frame1 ? resT - 0.25 - typeD : Math.max(T[0] ? T[0].t + 0.35 : 0, resT - 0.25 - typeD)
    const strike = wgSpec.strike !== false
    const strikeT = strike ? (wgSpec.strikeT != null ? +wgSpec.strikeT : resT + 1.2) : null
    const settled = strike ? strikeT + 0.25 : resT
    const nextPart = T.find(x => x.t > settled + 0.3)
    let until = wgSpec.until != null ? +wgSpec.until : nextPart ? Math.max(settled + 0.6, (nextPart.arr > 0 ? nextPart.arr : nextPart.t) - 0.1) : settled + 1.6
    if (check) until = Math.min(until, checkT - 0.4)
    G = { t: gt, typeD, resT, strike, strikeT, until, frame1 }
  }

  const lastBeat = Math.max(last.t + 0.6, check ? checkT + checkD : 0, G ? G.until + 0.3 : 0)
  const clearLen = MOTION.clear + 0.2
  const D = spec.duration || durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : MOTION.hold, tail: loop ? clearLen : 0 })
  const clearT0 = loop ? D - clearLen : Infinity
  const cleared = loop ? D - 0.2 : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }
  const restoreT = check ? checkT + 0.1 : last.t + 0.9 // the cheat-sheet moment: every amount back to full
  const pOut = check ? checkT - 0.1 : last.t + 1.2     // the walk is over: the pointer leaves

  // pointer: tip just right of the slots (x 940 + 14) on each row's centre line. It starts on the first row when
  // that row is active from frame 1, else on the total.
  const ptX = xR + 14
  const stops = []
  if (pt) {
    if (T[0].arr < 0) stops.push({ t: 0, x: ptX, y: R[0].yc })
    else stops.push({ t: 0, x: ptX, y: tot.yc }, { t: T[0].arr + 0.25, x: ptX, y: R[0].yc })
    for (let i = 1; i < n; i++) stops.push({ t: T[i].arr + 0.25, x: ptX, y: R[i].yc })
  }
  const ptStart = stops.length ? stops[0] : null

  // ---------------------------------------------------------------- sound (one cue per real event)
  T.forEach((x, i) => {
    if (R[i].f) ctx.cue(x.typeStart, 'type', { dur: x.typeD, gain: 0.45 })
    ctx.cue(x.t + MOTION.popDelay, R[i].goal ? 'ding' : 'pop', { gain: R[i].goal ? 0.6 : 0.5 })
  })
  if (G) {
    if (!G.frame1) {
      ctx.cue(G.t, 'type', { dur: G.typeD, gain: 0.4 })
      ctx.cue(G.resT + MOTION.popDelay, 'pop', { gain: 0.4 })
    }
    if (G.strike) ctx.cue(G.strikeT, 'swipe', { gain: 0.35 })
  }
  if (check) ctx.cue(checkT, 'type', { dur: checkD, gain: 0.4 })
  for (const b of BUMPS) ctx.cue(+b.t, 'tick', { gain: 0.35 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.3 })

  // ---------------------------------------------------------------- seek
  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      // the loop clear in two halves: the working fades first, then the leaders run back out to the slots
      const clearA = loop ? prog(t, clearT0, MOTION.clear / 2) : 0
      const clearB = loop ? ease.inOut(prog(t, clearT0 + MOTION.clear / 2, MOTION.clear / 2)) : 0
      const reset = t >= cleared // fully back to the frame-1 state
      const restore = goalIdx < 0 ? prog(t, restoreT, 0.45) : 0
      const sumP = check ? prog(t, restoreT, 0.45) : 0

      // VO-synced nudges (lookOpts.bumps): 0 -> 1 -> 0 over 0.42 s
      const bumpAt = target => { let b = 0; for (const x of BUMPS) if (String(x.at) === String(target)) b = Math.max(b, Math.sin(Math.PI * prog(t, +x.t, 0.42))); return b }
      const nudge = (el, b, origin, amp = 0.08) => style(el, { transformOrigin: origin, transform: b > 0 ? `scale(${n3(1 + amp * b)})` : 'none' })

      // total: loud on frame 1 (the anchor), rests once the first amount lands, loud again at the check
      const totRest = n ? prog(t, T[0].t + 0.1, MOTION.restIn) * (1 - sumP) : 0
      const tb = bumpAt('total')
      tot.box.seek(1, 1, totRest * keep * (1 - tb))
      nudge(tot.box.el, tb, '100% 50%')

      R.forEach((r, i) => {
        const x = T[i]
        // active: pointer on this row, % in accent, leader traced toward the slot
        const on = x.arr < 0 ? 1 : prog(t, x.arr, 0.25)
        const off = i + 1 < n ? prog(t, T[i + 1].arr, 0.25) : prog(t, pOut, 0.3)
        let act = on * (1 - off) * keep
        if (i === 0 && x.arr < 0) act = Math.max(act, clearP)
        if (r.pct) style(r.pct, { color: mix(C.grey, C.accent, act) })
        if (r.pv) {
          // masked %: "?" until the row activates; back to "?" with the loop reset (the frame-1 state)
          const hid = reset || (x.arr >= 0 && t < x.arr)
          style(r.pv, { visibility: hid ? 'hidden' : 'visible' })
          style(r.pq, { visibility: hid ? 'visible' : 'hidden' })
        }
        const tr = x.arr < 0 ? 1 : ease.out(prog(t, x.arr, 0.35))
        style(r.trace, { opacity: n3(act), clipPath: tr >= 1 || act <= 0 ? 'none' : `inset(0 ${((1 - tr) * 100).toFixed(1)}% 0 0)` })
        // a formula on the line: the leader retracts as the row activates, the working types and stays
        const L = landing(t, x.t)
        let lp = 0 // 0 = the frame-1 leader, 1 = the finished one
        let ret = 0
        if (r.f && LC.formulas === 'line') {
          const frame1 = i === 0 && x.arr < 0 ? 1 : 0 // the frame-1 state (and the loop's end state)
          ret = lp = reset ? frame1 : lerp(x.arr < 0 ? 1 : ease.out(prog(t, x.arr, 0.2)), frame1, clearB)
        } else if (!reset) lp = L.wipe * (1 - clearB)
        const cut = Math.round(r.leadW - lerp(r.lead1, r.leadEnd, lp))
        style(r.leader, { clipPath: cut > 0 ? `inset(0 ${cut}px 0 0)` : 'none' })
        if (r.f && (LC.formulas === 'line' || LC.formulas === 'under')) {
          // the working types (on the line, or under its label) and stays
          const tp = reset ? 0 : prog(t, x.typeStart, x.typeD)
          const typing = t >= x.typeStart && t < x.typeStart + x.typeD + 0.12 && t < clearT0
          const waiting = act > 0.5 && t < x.typeStart && (LC.formulas === 'under' || ret > 0.9)
          r.f.seek(tp, typing || (waiting && blink(t)) || (reset && i === 0 && x.arr < 0 && blink(t)))
          fade(r.f.el, reset ? 1 : 1 - clearA)
        } else if (r.f) {
          // a formula in the slot: types in the empty slot, then the highlighter's leading edge erases it
          const tp = reset ? 0 : prog(t, x.typeStart, x.typeD)
          const typing = t >= x.typeStart && t < x.typeStart + x.typeD + 0.12 && t < clearT0
          const waiting = act > 0.5 && t < x.typeStart
          r.f.seek(tp, typing || (waiting && blink(t)) || (reset && i === 0 && x.arr < 0 && blink(t)))
          let fo = 1
          if (!reset && L.wipe > 0) {
            const front = r.slotLeft + L.wipe * r.slotW - r.fLeft
            style(r.f.el, { clipPath: L.wipe < 1 ? `inset(0 0 0 ${Math.max(0, Math.round(front))}px)` : 'none' })
            fo = L.wipe >= 1 ? 0 : 1 - Math.min(1, L.wipe * 1.3)
          } else style(r.f.el, { clipPath: 'none' })
          fade(r.f.el, fo)
        }
        // the amount lands on its highlighter, then rests when the next row takes focus
        let rest = 0
        if (!r.goal) {
          if (i + 1 < n) rest = prog(t, T[i + 1].arr + 0.05, MOTION.restIn)
          if (goalIdx >= 0) rest = Math.max(rest, prog(t, restoreT, MOTION.restIn))
          rest *= 1 - restore
        }
        const rb = bumpAt(i)
        r.box.seek(L.wipe * keep, L.text * keep, rest * (1 - rb), keep * keep) // the figure fades out with its box at the clear
        nudge(r.box.el, rb, '100% 50%')
        fade(r.slot, Math.max(1 - L.wipe, reset ? 1 : clearP))
        // its bar segment fills in the same tone
        const sg = segs[i]
        if (LC.bar && sg) {
          const w = ease.out(prog(t, x.t, 0.32)) * keep
          // the segment rests with its amount, so the loud segment is always the loud amount
          style(sg.fill, { opacity: w > 0 ? n3(lerp(1, MOTION.rest, rest)) : '0', clipPath: w >= 1 ? 'none' : `inset(0 ${((1 - w) * 100).toFixed(1)}% 0 0 round 7px)` })
          fade(sg.empty, 1 - w)
        }
      })

      // wrong guess: types, lands on coral, is struck through, dims, then leaves before the next part
      if (guess && G) {
        // every property is set on every frame (shown or not), so the state is a pure function of t
        const live = !reset && t >= G.t && t < G.until + 0.3
        // a frame-1 guess comes back with the loop reset (after the check has cleared), so the last frame = frame 1
        const back = G.frame1 && loop && reset ? 1 : 0
        const on = live || back > 0
        for (const e of [guess.f.el, guess.box.el, guess.strike]) show(e, on)
        const typing = live && t < G.t + G.typeD + 0.12
        guess.f.seek(back ? 1 : on ? prog(t, G.t, G.typeD) : 0, typing || (live && t < G.resT && blink(t)))
        const L = landing(t, G.resT)
        guess.box.seek(back ? 1 : on ? L.wipe : 0, back ? 1 : on ? L.text : 0, 0)
        const st = G.strike && live ? ease.out(prog(t, G.strikeT, 0.25)) : 0
        style(guess.strike, { transform: st >= 1 ? 'none' : `scaleX(${n3(st)})` })
        const gone = 1 - prog(t, G.until, 0.3)
        const o = back ? 1 : (1 - (G.strike ? 0.45 * prog(t, G.strikeT + 0.25, 0.2) : 0)) * gone * keep
        for (const e of [guess.f.el, guess.box.el]) fade(e, o)
        fade(guess.strike, st > 0 ? gone * keep : 0)
        nudge(guess.box.el, live ? bumpAt('guess') : 0, '0 50%', 0.1)
      }

      // check line (accent mono): types under the sum rule
      if (check) {
        check.seek(reset ? 0 : prog(t, checkT, checkD), t >= checkT && t < checkT + checkD + 0.15 && t < clearT0)
        fade(check.el, keep)
      }

      // pointer: walks the rows, taps as each amount lands, leaves when the walk is over, returns with the reset
      if (pt && ptStart) {
        if (reset || clearP > 0) pt.seek({ x: ptStart.x, y: ptStart.y, o: reset ? 1 : clearP })
        else {
          const at = pathAt(stops, t)
          let press = 0
          for (const x of T) press = Math.max(press, 1 - Math.abs(t - (x.t + 0.08)) / 0.14)
          pt.seek({ x: at.x, y: at.y, o: 1 - prog(t, pOut, 0.3), press: clamp(press) })
        }
      }
    },
  }
}
