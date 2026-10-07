// Scoreboard: split-sheet — one round sum, every percentage in dollars (P9).
//
// The total is the scoreboard number in the top bar; the stage holds the whole sheet from frame 1:
//   - THE BAR: one wide neon bar = the total, a pool of dim-green money with faint notches where it will split
//   - THE ROWS: one per part, in walk order: LABEL (+ note) · pct · "?" where the dollars will land. Under each
//     row a thin track shows that part's slice of the bar at the same x (the rows are the bar, exploded), so the
//     mapping needs no legend
// The walk (one hard cut per part):
//   1. cut (thud): the pointer jumps to the row, the row lights in its tone, the label stack slams in
//      (line 1: the working "$4,000 × 50%" in green, line 2: the part, line 3: its note when the sheet can't hold it)
//      and the bar SPLITS: a gap opens at the slice's right edge
//   2. roll: the slice drains out of the pool into its own colour (a wipe, left to right) while the row's track fills
//      and the row's dollar counter ticks up from $0 on the same ease.out curve
//   3. land (ding): the counter lands exactly on the part's `amount`, bumps; the slice locks in with a white flash;
//      a goal part lands with a hit, a cash register and a floor bloom
// The check (data.check at checkT): the label stack shows the sum line (two lines when it is long, broken before
// "=") over the total's label, the gaps close so the coloured slices re-join into one bar, and the total bumps (cash).
// The verdict (the chrome's: the kit's one verdict slot) replaces the label stack; the goal row (tone "goal") lights
// again and the pointer returns to it.
// The hero ends on the payoff: with deductions (any part with tone "bad") and a goal part, it counts the total down
// to the goal's amount as the goal row lands ("$10,000" → "$6,535": what you keep); and at verdict.t it rolls to the
// money figure the verdict leads with ("**$15,000** a year invested"), so the biggest number lands last up top.
// First part before 0.5 s: no intro, frame 1 is already 0.3 s into the first part's roll.
//
// Layout (measured, not guessed): the rows are built first and their label / pct / amount widths measured; the
// solver then picks ONE label size for the whole sheet (the largest that fits, 58 → 40 px), wraps a label that
// can't fit one line onto two balanced lines (that row grows; the others stay compact), and puts the notes on the
// sheet (under each label) when two-line rows still leave the label stack its room; otherwise the notes go to the
// label stack's third line. Amounts are the biggest text on the sheet (≈ 1.16 × the label size, 46-68 px).
// Bar, rows and tracks share x 140-940. Graphics are one canvas (decoration); text is DOM.
//
// data (FORMATS.md §5): { total: { label, display, value }, parts: [{ t, label, pct, amount, note, tone, share }],
//   check, checkT, hold }   share drives the bar (else pct, else amount ÷ total.value)
// lookOpts (all optional):
//   hero         "total" | "remaining": the hero counts down what is left, rolling to each `remaining[].display`
//                (synced with the part whose t matches; that row's amount slams in instead of rolling: one focal
//                number at a time). Default: "remaining" when there are deductions (tone "bad") and a goal part,
//                with the goal's amount as the one landing; else "total" (the total holds)
//   remaining    [{ t, display }]: the hero's landings in "remaining" mode
//   heroFinal    { t, display } | false: the hero's last roll (default: at verdict.t, to the verdict's first
//                emphasised money figure, when it differs from what the hero shows)
//   icon         a unit icon beside the hero number (theme icon names; e.g. "bag")
//   footerSteps  [{ t, text }]: kit-wide (the chrome draws it): the footer rewrites to a working line at each t
//   bonus        { t, label, amount, tone = "good" }: an extra row under the sheet (dashed: it is not part of the
//                total) that slams in at t; its amount rolls; the label stack shows it. Until then the sheet sits
//                centred without it, and moves up to make room as it lands
//   notes        "auto" (default: on the sheet when two-line rows fit, else in the label stack) | "sheet" | "label" | false
//   intro        true / false forces the total intro on or off (default: on when the first part starts ≥ 0.5 s)
//   stageBottom  y where the stage ends (overrides the solver; the label stack keeps what is left)
//   maskPct      [part index, ...]: those percentages read "?" until their part's cut (the goal row's % would
//                otherwise answer the header at frame 1); without it the whole sheet shows, as the contract asks
// Dense sheets (6-7 parts with captions on) are budgeted: the solver steps through roomy → tight → compact spacing
// (40 px labels, wrapped onto two balanced lines where needed), then a one-line label stack (the working only); notes
// go to the label stack (or off the sheet) before a label goes under 40 px. If the verdict then needs the band over
// the sheet's foot, the rows it covers are hidden while it is up.
import { h, css as style, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, bare, inkWidth, slamFromFor, heroRow, odometer, stageFlash, flashAt, parseDisplay, displayValue,
  bump, slam, durationOf, beatTimes, toneColor,
} from '../lib.js'

export const css = `
.ss-canvas { position: absolute; left: 0; pointer-events: none; }
.ss-row { position: absolute; }
.ss-name { position: absolute; left: 24px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.ss-label { max-width: 100%; font: 400 56px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; color: #FFFFFF; white-space: nowrap; }
.ss-label.wrap { white-space: normal; text-wrap: balance; line-height: 1.02; }
.ss-note { max-width: 100%; margin-top: 6px; font: 600 40px/1.1 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; white-space: nowrap; }
.ss-pct, .ss-amt { position: absolute; display: flex; align-items: center; justify-content: flex-end; white-space: nowrap; }
.ss-pct { font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; color: #9AA4B2; letter-spacing: 0.01em; }
.ss-amt { transform-origin: 100% 55%; will-change: transform; }   /* always its own layer: raster never depends on seek order */
.ss-amt .ax { font-size: 0.94em; }
.ss-plain { font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; }
.ss-pct .ss-pq { position: absolute; right: 0; top: 50%; transform: translateY(-50%); }
.ss-q { display: inline-block; font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; color: #6B7584; }
.ss-lab .sb-label { height: 100%; justify-content: center; }
.ss-lab .sb-l1.wrap { width: 100%; white-space: normal; text-wrap: balance; line-height: 1.06; }
.ss-l3 { max-width: 100%; font: 600 42px/1.15 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; text-align: center; white-space: nowrap; }
`

const CUT = 0.18          // a cut lands (pointer, row light, label slam, gap) before the roll starts
const GAP = 8             // px a split opens between two slices
const RX = 140, RW = 800  // bar, rows and tracks share x 140-940 (below y 820 text must end by 940)
const REF = 50            // px size the row texts are measured at (widths scale linearly)
const TRACK = 8           // px height of a row's slice track (6 in the compact geometry)
const NOTE_H = 50         // a note line under a row label (40 px Inter + its 6 px gap)

// slice colours per tone: neighbours of the same tone alternate shades so every split stays visible
const SHADES = { neutral: ['#E9EDF2', '#AEB8C6', '#7D8796'], bad: [C.red, '#C2384A'], good: [C.green, '#1FC46A'] }
const TONE_KEYS = ['neutral', 'good', 'bad', 'goal']

const hexRGB = c => { const x = parseInt(String(c).slice(1), 16); return [x >> 16, (x >> 8) & 255, x & 255] }
const rgba = (c, a) => `rgba(${hexRGB(c).join(', ')}, ${clamp(a).toFixed(3)})`
const mix = (c1, c2, p) => { const a = hexRGB(c1), b = hexRGB(c2); return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * clamp(p))).join(', ')})` }
const pctOf = s => { const m = /(\d+(?:\.\d+)?)\s*%/.exec(String(s || '')); return m ? +m[1] / 100 : NaN }
const opened = (t, t0, dur = 0.18) => (t0 <= 0.001 ? 1 : t < t0 ? 0 : ease.out(prog(t, t0, dur)))

/** "≈ $1.94" never breaks after the ≈ (works on ax()-wrapped and plain HTML) */
const glue = html => String(html).replace(/≈(<\/span>)? +/g, '≈$1&nbsp;')
const richG = str => glue(rich(str))
const richUIG = str => glue(richUI(str))

/** a working line for Anton line 1: tokens with digits (and ≈) stay money green, operators and words go grey */
function workHTML(str) {
  return String(str || '').replace(/≈ +/g, '≈ ').split(/( +)/).map(tok => {
    if (!tok || /^ +$/.test(tok)) return tok
    return /[\d≈]/.test(tok) ? ax(esc(tok)) : `<span class="op">${ax(esc(tok))}</span>`
  }).join('')
}
/** the same working broken before its last " = " (for a check line too long for one line), or null */
function workLines(str) {
  const s = String(str || ''), k = s.lastIndexOf(' = ')
  return k > 0 ? `${workHTML(s.slice(0, k))}<br>${workHTML(s.slice(k + 1))}` : null
}

export default function splitSheet(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const total = { label: '', display: '', ...(d.total || {}) }
  const parts = (d.parts || []).filter(p => p && (p.label != null || p.amount != null))
  if (!parts.length) throw new Error('split-sheet: data.parts is empty')
  const n = parts.length
  const L0 = layoutFor(spec)
  const capsOn = L0.captionsOn
  const specSfx = Array.isArray(spec.sfx) ? spec.sfx : []
  const tone = p => (p && TONE_KEYS.includes(p.tone) ? p.tone : 'neutral')

  // ---------- shares (numeric: they drive the bar, never printed) ----------
  const totalV = +total.value > 0 ? +total.value : displayValue(total.display)
  let shares = parts.map(p => {
    if (p.share != null && isFinite(+p.share)) return Math.max(0, +p.share)
    const a = pctOf(p.pct)
    if (isFinite(a)) return a
    const b = displayValue(p.amount) / totalV
    return isFinite(b) && b >= 0 ? b : 1 / n
  })
  const sumS = shares.reduce((a, b) => a + b, 0)
  if (sumS > 1.0005) shares = shares.map(x => x / sumS)
  const cum = [0]
  shares.forEach((x, i) => cum.push(cum[i] + x))
  const restShare = Math.max(0, 1 - cum[n])

  // ---------- timing ----------
  const times = beatTimes(parts, { first: 1.4, every: 3.0 })
  const intro = lo.intro === true || (lo.intro !== false && times[0] >= 0.5)
  // the hero counts down what is left: lookOpts.remaining, or (by default, when parts are deductions) one landing on
  // the goal part's amount, synced with the goal row
  const goalIdx0 = parts.reduce((g, p, i) => (tone(p) === 'goal' ? i : g), -1)
  const deductions = parts.some(p => tone(p) === 'bad')
  let remList = lo.hero !== 'total' && Array.isArray(lo.remaining) ? lo.remaining.filter(r => r && r.display != null) : []
  if (!remList.length && lo.hero !== 'total' && (lo.hero === 'remaining' || deductions) && goalIdx0 >= 0 && isFinite(displayValue(parts[goalIdx0].amount)))
    remList = [{ t: times[goalIdx0], display: String(parts[goalIdx0].amount) }]
  const heroMode = remList.length ? 'remaining' : 'total'
  const beats = parts.map((p, i) => {
    const first = i === 0 && !intro
    const cut = first ? Math.min(times[0], 0) : times[i]
    const big = tone(p) === 'goal' || i === n - 1
    const next = i + 1 < n ? times[i + 1] : Infinity
    const roll = Math.max(0.45, Math.min(big ? 1.35 : 1.0, next - cut - CUT - 0.35))
    const start = first ? -0.3 : cut + CUT
    return { cut, start, roll, land: start + roll }
  })
  const lastLand = beats[n - 1].land
  const checkT = d.check ? (d.checkT != null ? +d.checkT : lastLand + 0.9) : null
  const bonus = lo.bonus && (lo.bonus.amount || lo.bonus.label) ? { label: '', amount: '', tone: 'good', ...lo.bonus } : null
  if (bonus) {
    bonus.t = bonus.t != null ? +bonus.t : Math.max(lastLand, checkT ?? 0) + 1.2
    bonus.start = bonus.t + CUT
    bonus.roll = 0.8
    bonus.land = bonus.start + bonus.roll
  }
  // hero landings in remaining mode, each synced to the part that starts at (about) the same time
  const rem = remList.map(r => {
    const tpl = parseDisplay(r.display)
    const o = { t: +r.t || 0, display: String(r.display), tpl, val: tpl.value * tpl.scale }
    let best = -1, bd = 0.35
    times.forEach((tt, i) => { const dd = Math.abs(tt - o.t); if (dd < bd) { bd = dd; best = i } })
    o.part = best
    if (best >= 0) { o.start = beats[best].start; o.roll = beats[best].roll } else { o.start = o.t + CUT; o.roll = 0.9 }
    o.land = o.start + o.roll
    return o
  }).sort((a, b) => a.start - b.start)
  const goalIdx = goalIdx0
  const vT = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null
  // a row whose part the hero rolls with slams its amount in on landing (one focal number at a time); the rest roll
  const rowRolls = i => !rem.some(r => r.part === i)
  // the hero's last roll: lookOpts.heroFinal, or at verdict.t to the verdict's first emphasised money figure
  let heroFinal = null
  if (lo.heroFinal !== false) {
    let hf = lo.heroFinal && lo.heroFinal.display != null ? { t: lo.heroFinal.t != null ? +lo.heroFinal.t : vT, display: String(lo.heroFinal.display) } : null
    if (!hf && vT != null) {
      const vt = String(spec.verdict.text)
      const ems = [...vt.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1])
      const money = str => { const m = /≈?\s?\$\s?\d[\d,]*(?:\.\d+)?(?:\s?[KMBT](?![a-z]))?/.exec(str); return m ? m[0] : null }
      const pick = ems.map(money).find(Boolean) || money(bare(vt))
      if (pick) hf = { t: vT, display: pick }
    }
    const lastShown = rem.length ? rem[rem.length - 1].display : total.display
    if (hf && hf.t != null && isFinite(displayValue(hf.display)) && displayValue(hf.display) !== displayValue(lastShown)) {
      const tpl = parseDisplay(hf.display)
      heroFinal = { t: hf.t, display: hf.display, tpl, val: tpl.value * tpl.scale, start: hf.t + 0.04, roll: 1.1 }
      heroFinal.land = heroFinal.start + heroFinal.roll
    }
  }

  // ---------- rows: built first and measured; the solver below sizes and places them ----------
  const counters = {}
  const sliceCol = parts.map(p => {
    const k = tone(p) === 'goal' ? 'good' : tone(p)
    const j = (counters[k] = (counters[k] ?? -1) + 1)
    return SHADES[k][j % SHADES[k].length]
  })
  const rowDefs = parts.map((p, i) => ({ label: p.label || '', note: p.note || '', pct: p.pct || '', amount: String(p.amount ?? ''), color: toneColor(tone(p)), part: i }))
  if (bonus) rowDefs.push({ label: bonus.label || '', note: '', pct: '', amount: String(bonus.amount || ''), color: toneColor(bonus.tone), bonus: true })
  const maskSet = new Set(Array.isArray(lo.maskPct) ? lo.maskPct.map(Number) : [])
  const rows = rowDefs.map(rd => {
    const el = h('div', { class: 'ss-row', style: { left: RX + 'px', top: '0px', width: RW + 'px' } })
    const label = h('div', { class: 'ss-label', html: richG(rd.label), style: { fontSize: REF + 'px' } })
    const note = rd.note ? h('div', { class: 'ss-note', html: richUIG(rd.note) }) : null
    const name = h('div', { class: 'ss-name' }, label, note)
    const masked = !rd.bonus && !!rd.pct && maskSet.has(rd.part)
    const pct = h('div', { class: 'ss-pct', html: masked ? `<span class="ss-pv">${ax(esc(rd.pct))}</span><span class="ss-pq">?</span>` : ax(esc(rd.pct)), style: { fontSize: REF + 'px' } })
    const pv = masked ? pct.querySelector('.ss-pv') : null, pq = masked ? pct.querySelector('.ss-pq') : null
    const amt = h('div', { class: 'ss-amt' })
    const q = h('span', { class: 'ss-q' }, '?')
    amt.append(q)
    const tpl = parseDisplay(rd.amount)
    const val = tpl.value * tpl.scale
    // an amount with no digits can't roll: it slams in as plain text
    const plain = !isFinite(val) ? h('span', { class: 'ss-plain', html: glue(ax(esc(rd.amount))), style: { color: rd.color } }) : null
    const odo = plain ? null : odometer(amt, { size: REF, color: rd.color, maxInt: 10, maxDp: 2 })
    if (plain) amt.append(plain)
    el.append(name, pct, amt)
    stage.append(el)
    // natural widths at REF px
    let aw
    if (odo) { odo.show(rd.amount); aw = odo.el.offsetWidth } else { style(plain, { fontSize: REF + 'px' }); aw = plain.offsetWidth }
    style(q, { display: 'none' })
    return { ...rd, el, label, note, name, pct, pv, pq, amt, q, odo, plain, tpl, val, w: inkWidth(label), pw: rd.pct ? inkWidth(pct) : 0, aw, nw: note ? inkWidth(note) : 0 }
  })
  const rowsN = rows.length

  // ---------- layout solver: one label size for the sheet; rows take the height their text needs ----------
  const limit = L0.limit, TOP = L0.stage.y
  const span = limit - TOP                       // stage + 16 + label slot
  // label slot heights: two lines (working + part), three (+ the note), what a squeezed stack can still use, one line
  const T = L0.type
  const LABEL_TWO = T.l1 + 6 + T.l2, LABEL_THREE = LABEL_TWO + 32, labelMin = capsOn ? 112 : 150, LABEL_ONE = T.l1 + 8
  // sheet spacing: roomy by default; tight (a slimmer bar, smaller gaps) when a dense sheet needs the room; compact
  // (thin tracks, minimal padding) as the last resort, e.g. 7 rows with captions on
  const spacing = mode => {
    const dense = mode !== 'roomy' || rowsN >= 6
    const sp = mode === 'compact'
      ? { padT: 10, padB: 8, barGap: 12, rowGap: 5, barH: 40, trk: 6, pad: 2, aMin: 44 }
      : { padT: dense ? 14 : 22, padB: dense ? 10 : 18, barGap: dense ? 16 : 24, rowGap: dense ? 7 : rowsN >= 5 ? 9 : 12,
        barH: mode === 'tight' ? Math.min(48, rowsN <= 3 ? 72 : 60) : rowsN <= 3 ? 72 : rowsN <= 5 ? 60 : 50, trk: TRACK, pad: 8, aMin: 46 }
    sp.fixed = sp.padT + sp.barH + sp.barGap + (rowsN - 1) * sp.rowGap + sp.padB
    sp.mode = mode
    return sp
  }
  const maxAW = Math.max(1, ...rows.map(r => r.aw)), maxPW = Math.max(0, ...rows.map(r => r.pw))
  function geom(S, notesOn, mode = 'roomy') {
    const sp = spacing(mode)
    const A = clamp(Math.round(S * 1.16), sp.aMin, 68)       // amounts: the biggest text on the sheet (≈ stays ≥ 40 px)
    const P = clamp(Math.round(A * 0.8), 40, 54)
    const amtW = (maxAW * A) / REF, pctW = (maxPW * P) / REF
    const pctRight = 22 + amtW + (pctW ? 28 : 0)
    const nameW = Math.floor(RW - 24 - pctRight - (pctW ? pctW + 24 : 8))
    const nameWide = Math.floor(RW - 24 - 22 - amtW - 26)     // a row with no pct (the bonus row)
    let ok = nameW >= 160, sum = 0
    const per = rows.map(r => {
      const nw = r.pw ? nameW : nameWide
      const w = (r.w * S) / REF
      const lines = w <= nw ? 1 : w <= nw * 1.85 ? 2 : 3
      if (lines > 2) ok = false
      const note = notesOn && r.note ? 1 : 0
      if (note && r.nw > nw) ok = false
      const text = (lines === 1 ? S : lines * S * 1.02) + note * NOTE_H
      const hh = Math.round(Math.max(A, text) + sp.pad + 9 + sp.trk)  // text band (+ padding) + rims + track
      sum += hh
      return { lines, note, h: hh, nw }
    })
    return { S, A, P, amtW, pctW, pctRight, nameW, per, sp, sheetH: sp.fixed + sum, ok }
  }
  const hasNotes = parts.some(p => p.note)
  const notesOpt = lo.notes === false ? 'off' : lo.notes || 'auto'
  const fits = (gm, want) => gm.ok && span - 16 - gm.sheetH >= want
  // the label size S in [hi, lo] for this pass: among the sizes that fit and are within 4 px of the largest that
  // fits, the one that wraps the fewest labels onto two lines (then the largest)
  const search = (sHi, sLo, notesOn, mode, want) => {
    const ok = []
    for (let S = sHi; S >= sLo; S -= 2) { const x = geom(S, notesOn, mode); if (fits(x, want)) ok.push(x) }
    if (!ok.length) return null
    const wraps = x => x.per.filter(p => p.lines > 1).length
    return ok.filter(x => x.S >= ok[0].S - 4).reduce((a, b) => (wraps(b) < wraps(a) ? b : a))
  }
  let gm = null, notesOnSheet = false
  if (hasNotes && (notesOpt === 'auto' || notesOpt === 'sheet')) {
    // notes under the labels: the label stack then needs two lines only (working + part)
    gm = search(58, 44, true, 'roomy', notesOpt === 'sheet' ? labelMin : LABEL_TWO)
    notesOnSheet = !!gm
  }
  const labelWant = hasNotes && notesOpt !== 'off' ? LABEL_THREE : LABEL_TWO   // three lines (working, part, note) or two
  gm = gm || search(58, 44, false, 'roomy', labelWant)
  // dense: tight spacing, keeping two label lines (working + part), then whatever the label stack can still have
  gm = gm || search(56, 40, false, 'tight', Math.min(labelWant, LABEL_TWO)) || search(56, 40, false, 'tight', labelMin)
  // last resort (6-7 rows with captions on): compact rows; the label stack may shrink to its one working line
  gm = gm || search(48, 40, false, 'compact', labelMin) || search(48, 40, false, 'compact', LABEL_ONE)
  if (!gm) gm = geom(40, false, 'compact')                        // overflow: the linter will say where
  const G = gm.sp, barH = G.barH, trackH = G.trk

  const sbDefault = L0.stage.y + L0.stage.h
  const SB = Math.round(lo.stageBottom ?? Math.min(limit - 16 - LABEL_ONE, Math.max(sbDefault, TOP + gm.sheetH)))
  const L = layoutFor(spec, { stageBottom: SB })
  const stageH = L.stage.h
  const slack = Math.max(0, stageH - gm.sheetH)
  const barY = Math.round(slack / 2) + G.padT                    // relative to the stage top
  let yy = barY + barH + G.barGap
  rows.forEach((r, i) => { r.y = yy; r.h = gm.per[i].h; yy += r.h + G.rowGap })
  const slot = { y: L.stage.y + stageH + 16, h: limit - (L.stage.y + stageH) - 16, w: 800 }
  // a bonus row arrives late: until then the sheet sits centred without it, then moves up to make room
  const bonusShift = bonus ? (rows[rowsN - 1].h + G.rowGap) / 2 : 0
  const shiftAt = t => (bonus ? bonusShift * (1 - ease.inOut(prog(t, bonus.t - 0.1, 0.34))) : 0)

  // place and size the rows
  for (const [i, r] of rows.entries()) {
    const geo = gm.per[i]
    const band = r.h - 9 - trackH                                  // text band inside a row (above its track)
    r.band = band
    style(r.el, { top: L.stage.y + r.y + 'px', height: r.h + 'px' })
    style(r.name, { top: '3px', height: band + 'px', width: geo.nw + 'px' })
    style(r.label, { fontSize: gm.S + 'px' })
    if (geo.lines > 1) { r.label.classList.add('wrap'); style(r.label, { width: geo.nw + 'px' }) }
    if (r.note && !geo.note) { r.note.remove(); r.note = null }
    style(r.pct, { top: '3px', height: band + 'px', fontSize: gm.P + 'px', right: gm.pctRight + 'px' })
    style(r.amt, { top: '3px', height: band + 'px', right: '22px' })
    style(r.q, { fontSize: gm.A + 'px' })
    if (r.odo) r.odo.el.style.fontSize = gm.A + 'px'
    if (r.plain) style(r.plain, { fontSize: gm.A + 'px' })
    // safety net: anything the estimate missed shrinks (never below the 40 px floor)
    fitText(r.label, geo.nw, { maxH: band - (r.note ? NOTE_H : 0), minPx: 40 })
    if (r.note) fitText(r.note, geo.nw, { minPx: 40 })
    style(r.q, { display: 'inline-block' })
    if (r.odo) style(r.odo.el, { display: 'none' })
    if (r.plain) style(r.plain, { display: 'none' })
  }

  // an amount scales from its right edge: its landing bump may grow it by ≈ 22 px at most (the pct column is 28 px away)
  const ampCap = 22 / Math.max(60, gm.amtW)

  // ---------- canvas: bar, row boxes, tracks, pointer (all decoration) ----------
  const cv = h('canvas', { class: 'ss-canvas', 'data-deco': '', width: W, height: stageH,
    'data-solver': `S${gm.S} A${gm.A} P${gm.P} ${G.mode} notes:${notesOnSheet ? 'sheet' : 'label'} wraps:${gm.per.filter(p => p.lines > 1).length} slot:${slot.h}`, style: { top: L.stage.y + 'px', width: W + 'px', height: stageH + 'px' } })
  stage.insertBefore(cv, rows[0].el)
  const g = cv.getContext('2d')
  const flash = stageFlash(stage, L)
  stage.insertBefore(flash.el, rows[0].el)                      // the floor bloom sits under the row text

  // ---------- hero: the total (or what is left) ----------
  const heroDisplays = [total.display, ...rem.map(r => r.display), ...(heroFinal ? [heroFinal.display] : [])].filter(Boolean)
  const widest = heroDisplays.reduce((a, b) => (b.length > a.length ? b : a), '')
  const estEm = widest.replace(/[^\d]/g, '').length * 0.5 + (widest.match(/[,.]/g) || []).length * 0.22 + widest.replace(/[\d,.\s]/g, '').length * 0.5 + 0.3
  const icon = lo.icon || null
  const HS = L.hero.size, HI = L.hero.icon
  const heroSize = Math.round(Math.min(HS, (920 - (icon ? HI + 12 : 0)) / Math.max(1, estEm)))
  const hero = heroRow(stage, L, { icon, size: heroSize, iconSize: Math.round(HI * Math.min(1, heroSize / HS + 0.1)) })
  const totalTpl = parseDisplay(total.display)

  // ---------- label stack (bottom bar): working · part · note ----------
  const items = []
  const idx = { intro: -1, parts: [], check: -1, bonus: -1 }
  if (intro) { idx.intro = items.length; items.push(total.label ? { l2: richG(total.label) } : { l2: workHTML(total.display), l2Color: C.green }) }
  parts.forEach((p, i) => {
    idx.parts.push(items.length)
    items.push({
      l1: total.display && p.pct ? workHTML(`${total.display} × ${p.pct}`) : null,
      l2: richG(p.label || ''),
      l2Color: tone(p) === 'goal' ? C.green : C.white,
      l3: !notesOnSheet && notesOpt !== 'off' && p.note ? richUIG(p.note) : null,
      prefer: 'l1',                                               // short slot: the note goes before the working
    })
  })
  if (d.check) { idx.check = items.length; items.push({ l1: workHTML(d.check), l1Lines: workLines(d.check), l2: total.label ? richG(total.label) : '', l2Optional: true, prefer: 'l1' }) }
  if (bonus) { idx.bonus = items.length; items.push({ l1: workHTML(bonus.amount), l2: richG(bonus.label || ''), prefer: 'l1' }) }
  const labels = labelBox(stage, slot, items, T)

  // the label timeline: intro, each part, the check, the bonus (in time order)
  const labelEvents = []
  if (idx.intro >= 0) labelEvents.push({ t: 0, i: idx.intro })
  beats.forEach((b, i) => labelEvents.push({ t: Math.max(0, b.cut), i: idx.parts[i] }))
  if (idx.check >= 0) labelEvents.push({ t: checkT, i: idx.check })
  if (idx.bonus >= 0) labelEvents.push({ t: bonus.t, i: idx.bonus })
  labelEvents.sort((a, b) => a.t - b.t)

  // the focus timeline: which row the pointer is on (-1: none)
  const focusEvents = beats.map((b, i) => ({ t: Math.max(0, b.cut), row: i }))
  if (checkT != null) focusEvents.push({ t: checkT, row: -1 })
  if (bonus) focusEvents.push({ t: bonus.t, row: n })
  if (vT != null) focusEvents.push({ t: vT, row: goalIdx })
  focusEvents.sort((a, b) => a.t - b.t)
  const focusAt = t => { let f = { t: 0, row: -1 }; for (const e of focusEvents) if (t >= e.t) f = e; return f }

  // ---------- sound (a spec cue of the same kind within 0.2 s replaces the kit's) ----------
  const cue = (t, kind, opts) => {
    if (t == null || !isFinite(t) || t < 0) return
    if (specSfx.some(x => x && x.kind === kind && Math.abs(+x.t - t) < 0.2)) return
    ctx.cue(t, kind, opts)
  }
  beats.forEach((b, i) => {
    const goal = tone(parts[i]) === 'goal'
    if (b.cut > 0.05) cue(b.cut, 'thud', { gain: 0.6 })
    const r0 = Math.max(0, b.start)
    if (b.land - r0 > 0.25) cue(r0, 'roll', { dur: Math.max(0.3, b.land - r0 - 0.05), gain: rowRolls(i) ? 0.6 : 0.5 })
    if (goal) { cue(b.land, 'hit', { gain: 0.8 }); cue(b.land + 0.06, 'cash', { gain: 0.55 }) }
    else cue(b.land, 'ding', { gain: 0.5 })
  })
  if (checkT != null) { cue(checkT, 'thud', { gain: 0.55 }); cue(checkT + 0.36, 'cash', { gain: 0.5 }) }
  if (bonus) { cue(bonus.t, 'thud', { gain: 0.6 }); cue(bonus.start, 'roll', { dur: bonus.roll - 0.05, gain: 0.5 }); cue(bonus.land, 'ding', { gain: 0.5 }) }
  if (heroFinal) { cue(heroFinal.start, 'roll', { dur: heroFinal.roll - 0.05, gain: 0.5 }); cue(heroFinal.land, 'ding', { gain: 0.5 }) }

  const footT = Array.isArray(lo.footerSteps) ? lo.footerSteps.map(x => +(x && x.t) || 0) : []
  const lastBeat = Math.max(lastLand, checkT != null ? checkT + 0.8 : 0, bonus ? bonus.land : 0, heroFinal ? heroFinal.land : 0, ...footT)
  const duration = durationOf(spec, lastBeat, d.hold ?? M.hold)

  // ---------- drawing ----------
  const R = 12
  function rrect(x, y, w, hh, r) {
    r = Math.max(0, Math.min(r, w / 2, hh / 2))
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + hh, r)
    g.arcTo(x + w, y + hh, x, y + hh, r)
    g.arcTo(x, y + hh, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
  }
  const xAt = f => RX + clamp(f) * RW
  const fracAt = (i, t) => (t < beats[i].start ? 0 : ease.out(prog(t, beats[i].start, beats[i].roll)))

  function drawBar(t, focus) {
    const join = checkT != null && t >= checkT ? ease.inOut(prog(t, checkT + 0.12, 0.3)) : 0
    // boundary j (1..n) sits between slice j-1 and slice j (or the remainder); it opens when slice j-1 is cut
    const gapAt = j => (j <= 0 || j > n || (j === n && restShare < 0.002) ? 0 : GAP * opened(t, beats[j - 1].cut) * (1 - join))
    let k = 0
    while (k < n && t >= beats[k].cut) k++
    const y = barY, bh = barH
    // the pool: money not yet split off (dim green, neon rim, notches where the next splits will come)
    const px0 = k > 0 ? xAt(cum[k]) + gapAt(k) / 2 : RX
    const px1 = RX + RW
    if (px1 - px0 > 1.5 && (k < n || restShare >= 0.002)) {
      g.save()
      rrect(px0, y, px1 - px0, bh, R)
      g.fillStyle = C.greenDeep
      g.shadowColor = rgba(C.green, 0.5)
      g.shadowBlur = 20
      g.fill()
      g.shadowBlur = 0
      g.lineWidth = 3
      g.strokeStyle = rgba(C.green, 0.9)
      rrect(px0 + 1.5, y + 1.5, px1 - px0 - 3, bh - 3, R - 1.5)
      g.stroke()
      g.fillStyle = rgba(C.green, 0.32)
      for (let j = k + 1; j <= n; j++) {
        if (j === n && restShare < 0.002) continue
        const x = xAt(cum[j])
        if (x > px0 + 6 && x < px1 - 6) g.fillRect(x - 1, y + 12, 2, bh - 24)
      }
      g.restore()
    }
    // the split slices
    for (let i = 0; i < k; i++) {
      const x0 = xAt(cum[i]) + gapAt(i) / 2
      const x1 = (i === n - 1 && restShare < 0.002 ? RX + RW : xAt(cum[i + 1]) - gapAt(i + 1) / 2)
      const w = Math.max(4, x1 - x0)
      const fr = fracAt(i, t)
      const active = focus.row === i
      g.save()
      rrect(x0, y, w, bh, Math.min(R, 9))
      g.fillStyle = C.greenDeep
      g.fill()
      g.clip()
      if (fr > 0) {
        g.fillStyle = sliceCol[i]
        if (active) { g.shadowColor = rgba(sliceCol[i], 0.9); g.shadowBlur = 24 }
        g.fillRect(x0, y, w * fr, bh)
        g.shadowBlur = 0
        if (fr < 1) {   // the wipe's leading edge
          g.fillStyle = '#FFFFFF'
          g.fillRect(x0 + w * fr - 3, y, 4, bh)
        }
        // lock-in: the slice flashes white as its amount lands
        const lf = flashAt(t, beats[i].land, 0.4)
        if (lf > 0.01) { g.fillStyle = rgba('#FFFFFF', 0.6 * lf); g.fillRect(x0, y, w, bh) }
      }
      g.restore()
      if (active && fr > 0) {   // the active slice glows outside its box too
        g.save()
        g.shadowColor = rgba(sliceCol[i], 0.75)
        g.shadowBlur = 26
        g.strokeStyle = rgba(sliceCol[i], 0.9)
        g.lineWidth = 2
        rrect(x0 + 1, y + 1, w - 2, bh - 2, Math.min(R, 8))
        g.stroke()
        g.restore()
      }
    }
    // the check: the slices re-join into one bar; its rim flashes white
    if (join > 0) {
      const a = 0.9 * flashAt(t, checkT + 0.42, 0.9)
      if (a > 0.01) {
        g.save()
        g.strokeStyle = rgba('#FFFFFF', a)
        g.shadowColor = rgba(C.green, a)
        g.shadowBlur = 28
        g.lineWidth = 4
        rrect(RX - 3, y - 3, RW + 6, bh + 6, R + 3)
        g.stroke()
        g.restore()
      }
    }
  }

  function drawRows(t, focus) {
    rows.forEach((r, i) => {
      const y = r.y, rh = r.h
      const isBonus = !!r.bonus
      let alpha = 1
      if (isBonus) alpha = t < bonus.t ? 0 : slam(t, bonus.t).o
      if (alpha <= 0.001) return
      const lit = focus.row === i ? 1 : 0
      const col = r.color
      g.save()
      g.globalAlpha = alpha
      rrect(RX, y, RW, rh, R)
      g.fillStyle = '#07090C'
      g.fill()
      // track: the part's slice of the total, at the bar's x (ghosted until its roll fills it)
      if (!isBonus) {
        g.save()
        rrect(RX, y, RW, rh, R)
        g.clip()
        const ty = y + rh - 3 - trackH
        g.fillStyle = '#10151C'
        g.fillRect(RX + 3, ty, RW - 6, trackH)
        const a0 = Math.max(RX + 3, xAt(cum[i])), a1 = Math.min(RX + RW - 3, Math.max(xAt(cum[i + 1]), a0 + 4))
        g.fillStyle = rgba('#FFFFFF', 0.14)
        g.fillRect(a0, ty, a1 - a0, trackH)
        const fr = fracAt(i, t)
        if (fr > 0) {
          g.fillStyle = sliceCol[i]
          g.fillRect(a0, ty, (a1 - a0) * fr, trackH)
        }
        g.restore()
      }
      // rim: hairline, lit in the part's tone while the walk is on it
      g.lineWidth = 3
      if (isBonus) g.setLineDash([12, 9])
      g.strokeStyle = isBonus ? rgba(col, 0.55 + 0.45 * lit) : mix(C.panelLine, col, lit)
      if (lit > 0) { g.shadowColor = rgba(col, 0.55 * lit); g.shadowBlur = 30 * lit }
      rrect(RX + 1.5, y + 1.5, RW - 3, rh - 3, R - 1.5)
      g.stroke()
      g.restore()
    })
  }

  function drawPointer(t, focus) {
    if (focus.row < 0 || focus.row >= rows.length) return
    const r = rows[focus.row]
    const k = slam(t, focus.t, { dur: 0.2, from: 1.45 })
    const cy = r.y + 3 + r.band / 2, cx = 110, s = 17 * k.s
    g.save()
    g.globalAlpha = k.o
    g.fillStyle = r.color                               // the pointer takes the row's tone (as in the kit's other boards)
    g.shadowColor = rgba(r.color, 0.45)
    g.shadowBlur = 10
    g.beginPath()
    g.moveTo(cx - s * 0.75, cy - s)
    g.lineTo(cx + s * 0.95, cy)
    g.lineTo(cx - s * 0.75, cy + s)
    g.closePath()
    g.fill()
    g.restore()
  }

  // ---------- seek ----------
  return {
    duration,
    layout: L,
    seek(t) {
      const focus = focusAt(t)
      const dy = shiftAt(t)

      // canvas
      g.clearRect(0, 0, W, stageH)
      g.save()
      g.translate(0, dy)
      drawBar(t, focus)
      drawRows(t, focus)
      drawPointer(t, focus)
      g.restore()

      // row amounts: "?" until reached, then a counter that lands exactly on the display (or a slam on landing)
      rows.forEach((r, i) => {
        const isBonus = !!r.bonus
        if (bonus) style(r.el, { transform: `translateY(${dy.toFixed(2)}px)` })
        if (isBonus) {
          const show = t >= bonus.t
          style(r.el, { display: show ? 'block' : 'none' })
          if (!show) return
          const k = slam(t, bonus.t)
          style(r.el, { opacity: String(k.o) })
          style(r.name, { transform: `scale(${Math.max(1, k.s).toFixed(4)})`, transformOrigin: '0 50%' })
        }
        const b = isBonus ? bonus : beats[i]
        if (r.pv) { const hid = t < b.cut; style(r.pv, { visibility: hid ? 'hidden' : 'visible' }); style(r.pq, { visibility: hid ? 'visible' : 'hidden' }) }
        const roll = (isBonus || rowRolls(i)) && !!r.odo
        let sc = 1
        if (roll ? t < b.start : t < b.land) {
          style(r.q, { display: 'inline-block' })
          if (r.odo) style(r.odo.el, { display: 'none' })
          if (r.plain) style(r.plain, { display: 'none' })
        } else {
          style(r.q, { display: 'none' })
          if (r.plain) style(r.plain, { display: 'inline-block' })
          else {
            style(r.odo.el, { display: 'inline-flex' })
            const p = prog(t, b.start, b.roll)
            if (roll && p < 1) r.odo.set(lerp(0, r.val, ease.out(p)), r.tpl)
            else r.odo.show(r.amount)
          }
          if (!roll) sc = slam(t, b.land, { from: 1.3 }).s
          sc *= bump(t, b.land, { amp: Math.min(!isBonus && tone(parts[i]) === 'goal' ? 0.16 : 0.11, ampCap), dur: 0.4 })
        }
        if (vT != null && !isBonus && i === goalIdx) sc *= bump(t, vT + 0.06, { amp: Math.min(0.12, ampCap), dur: 0.45 })
        style(r.amt, { transform: `scale(${Math.min(sc, 1 + ampCap).toFixed(4)})` })
      })

      // hero: the total, or what is left (rolls on the same curve as the slice it follows)
      let heroScale = 1, glow = 0
      if (heroFinal && t >= heroFinal.start) {
        // the payoff: the verdict's money figure rolls in last (from what the hero showed) and lands exactly on it
        const prevDisp = rem.length ? rem[rem.length - 1].display : total.display, pv = displayValue(prevDisp)
        const p = prog(t, heroFinal.start, heroFinal.roll)
        if (p >= 1) hero.show(heroFinal.display)
        else hero.set(lerp(pv, heroFinal.val, ease.out(p)), heroFinal.tpl, true)
        heroScale *= 1 - 0.03 * Math.sin(Math.PI * prog(t, heroFinal.t, 0.28))
        heroScale *= bump(t, heroFinal.land, { amp: 0.1, dur: 0.45 })
        if (t >= heroFinal.land) glow = Math.max(glow, 1 - ease.out(prog(t, heroFinal.land, 1.1)))
      } else if (heroMode === 'remaining') {
        let k = -1
        for (let j = 0; j < rem.length; j++) if (t >= rem[j].start) k = j
        if (k < 0) hero.show(total.display)
        else {
          const r = rem[k], prev = k > 0 ? rem[k - 1] : { display: total.display, val: totalTpl.value * totalTpl.scale }
          const p = prog(t, r.start, r.roll)
          if (p >= 1) hero.show(r.display)
          else if (p <= 0) hero.show(prev.display)
          else hero.set(lerp(prev.val, r.val, ease.out(p)), r.tpl, true)
        }
        for (const r of rem) { heroScale *= bump(t, r.land, { amp: 0.07, dur: M.bump }); if (t >= r.land) glow = Math.max(glow, 0.6 * (1 - ease.out(prog(t, r.land, 0.6)))) }
        if (goalIdx >= 0) { const L1 = beats[goalIdx].land; heroScale *= bump(t, L1, { amp: 0.06, dur: M.bump }); if (t >= L1) glow = Math.max(glow, 0.8 * (1 - ease.out(prog(t, L1, 0.9)))) }
      } else {
        hero.show(total.display)
        // the total gives up a slice on each cut: a small dip (the kit's anticipation move), no roll
        for (const b of beats) if (b.cut > 0.05) heroScale *= 1 - 0.02 * Math.sin(Math.PI * prog(t, b.cut, 0.28))
      }
      // the check sums back to the total: the hero bumps only when it is the total
      if (checkT != null && heroMode === 'total' && !(heroFinal && t >= heroFinal.start)) { const L1 = checkT + 0.36; heroScale *= bump(t, L1, { amp: 0.1, dur: 0.45 }); if (t >= L1) glow = Math.max(glow, 1 - ease.out(prog(t, L1, 1.0))) }
      style(hero.el, { transform: `scale(${heroScale.toFixed(4)})` })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })

      // floor bloom: the goal landing and the check
      let fl = 0
      if (goalIdx >= 0) fl = Math.max(fl, 0.5 * flashAt(t, beats[goalIdx].land, 0.8))
      if (checkT != null) fl = Math.max(fl, 0.35 * flashAt(t, checkT + 0.36, 0.8))
      if (bonus) fl = Math.max(fl, 0.25 * flashAt(t, bonus.land, 0.6))
      flash.set(fl)

      // label stack
      let ev = labelEvents[0]
      for (const e of labelEvents) if (t >= e.t) ev = e
      labels.seek(t, ev ? ev.i : -1, ev ? ev.t : 0)

      // (the footer steps, the verdict and the label stack's yield are the chrome's)
    },
  }
}

/**
 * The bottom-bar label stack with an optional third line (HD Guy's description line, Inter grey): one group per beat,
 * built and fitted at mount; seek shows one with the kit's slam. Each item: { l1?, l1Lines?, l2, l2Optional?, l3?,
 * l1Color?, l2Color?, prefer: 'l1' | 'l3' }. A line 1 too wide at 44 px switches to `l1Lines` (two lines, ≥ 40 px).
 * When the slot is short, the line not preferred goes first, then the other (an optional line 2 goes before both).
 */
function labelBox(parent, slot, items, T) {
  const el = h('div', { class: 'sb-labels ss-lab', 'data-yield': '', style: { top: slot.y + 'px', left: (W - slot.w) / 2 + 'px', width: slot.w + 'px', height: slot.h + 'px' } })
  parent.append(el)
  const GAP = 6, L2MIN = Math.min(58, T.l2Min + 4)
  const groups = items.map(it => {
    const grp = h('div', { class: 'sb-label' })
    el.append(grp)
    const line = (cls, html, color) => { const e = h('div', { class: cls, html }); if (color) e.style.color = color; grp.append(e); return e }
    let l1 = it.l1 ? line('sb-l1', it.l1, it.l1Color || C.green) : null
    let l2 = line('sb-l2', it.l2 || '', it.l2Color || C.white)
    if (l1) l1.style.fontSize = T.l1 + 'px'
    l2.style.fontSize = T.l2 + 'px'
    let l3 = it.l3 ? line('ss-l3', it.l3) : null
    if (l1 && slot.h < T.l1 + GAP + L2MIN) {
      // a one-line slot (the densest sheets): the working only; the lit row already names the part
      l2.remove(); l2 = null
      if (l3) { l3.remove(); l3 = null }
    }
    if (l1) {
      fitText(l1, slot.w, { maxH: slot.h, minPx: Math.min(44, T.l1) })
      if (l1.scrollWidth > slot.w + 0.5) {
        // too long for one line: two lines (broken before "=" when given), the largest size that fits
        if (it.l1Lines) l1.innerHTML = it.l1Lines
        l1.classList.add('wrap')
        let px = T.l1
        const tooBig = () => l1.scrollWidth > slot.w + 0.5 || l1.scrollHeight > Math.min(px * 2.25, slot.h)
        for (style(l1, { fontSize: px + 'px' }); px > 40 && tooBig(); px -= 2) style(l1, { fontSize: px - 2 + 'px' })
        if (tooBig() && it.l1Lines) {   // a side of the "=" is still too wide: balance-wrap the whole line instead
          l1.innerHTML = it.l1
          px = T.l1
          for (style(l1, { fontSize: px + 'px' }); px > 40 && tooBig(); px -= 2) style(l1, { fontSize: px - 2 + 'px' })
        }
      }
    }
    if (l3) fitText(l3, slot.w, { minPx: 40 })
    if (l3 && l3.scrollWidth > slot.w + 0.5) { l3.remove(); l3 = null }
    const room = () => slot.h - (l1 ? l1.offsetHeight + GAP : 0) - (l3 ? l3.offsetHeight + GAP : 0)
    if (l2 && it.l2Optional && (!it.l2 || room() < L2MIN)) { l2.remove(); l2 = null }
    if (l2) {
      // fit line 2 to what is left; if it still can't fit (a long name at the 44 px floor), drop a line and refit
      const fitL2 = () => { l2.style.fontSize = T.l2 + 'px'; fitText(l2, slot.w, { maxH: Math.max(1, room()), minPx: 44 }) }
      fitL2()
      for (const k of it.prefer === 'l3' ? ['l1', 'l3'] : ['l3', 'l1']) {
        if (room() >= L2MIN && l2.scrollHeight <= room() + 0.5) break
        if (k === 'l1' && l1) { l1.remove(); l1 = null; fitL2() }
        if (k === 'l3' && l3) { l3.remove(); l3 = null; fitL2() }
      }
    }
    // the slam scales about the content's centre and never pushes it more than 8 px outside the slot (y or x)
    const kids = [l1, l2, l3].filter(Boolean)
    const top = kids[0].offsetTop, bot = kids[kids.length - 1].offsetTop + kids[kids.length - 1].offsetHeight
    const cy = (top + bot) / 2
    grp.__from = Math.min(slamFromFor(Math.max(1, ...kids.map(inkWidth)), slot.w - 8), Math.max(1, Math.min(slot.h + 8 - cy, cy + 8) / Math.max(1, (bot - top) / 2)))
    style(grp, { transformOrigin: `50% ${cy.toFixed(1)}px`, display: 'none' })
    return grp
  })
  return {
    el, groups,
    seek(t, index, t0 = 0) {
      groups.forEach((gr, i) => {
        if (i !== index) { style(gr, { display: 'none' }); return }
        const k = slam(t, t0, { from: gr.__from })
        style(gr, { display: 'flex', opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
      })
    },
  }
}
