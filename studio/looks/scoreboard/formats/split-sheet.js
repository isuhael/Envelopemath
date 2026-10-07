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
//   3. land (ding): the counter lands exactly on the part's `amount`, bumps and flares; a goal part lands with a hit,
//      a cash register and a floor bloom
// The check (data.check at checkT): the label stack shows the sum line over the total's label, the gaps close so the
// coloured slices re-join into one bar, and the total in the top bar bumps (cash).
// The verdict replaces the label stack; the goal row (tone "goal") lights again and the pointer returns to it.
// First part before 0.5 s: no intro, frame 1 is already 0.3 s into the first part's roll.
//
// Layout: the sheet takes the height it needs (rows 46-96 px, or 120 px with the note on a second line) and the label
// stack keeps the rest above the caption band (≥ 128 px with captions on); the sheet is centred in the stage when
// there is room to spare. Bar, rows and tracks share x 140-940. Graphics are one canvas (decoration); text is DOM.
//
// data (FORMATS.md §5): { total: { label, display, value }, parts: [{ t, label, pct, amount, note, tone, share }],
//   check, checkT, hold }   share drives the bar (else pct, else amount ÷ total.value)
// lookOpts (all optional):
//   hero         "total" (default: the total holds in the top bar) | "remaining": the hero counts down what is left,
//                rolling to each `remaining[].display` (synced with the part whose t matches), and the row amounts
//                slam in when their slice lands instead of rolling (one focal number at a time)
//   remaining    [{ t, display }]: the hero's landings in "remaining" mode
//   icon         a unit icon beside the hero number (theme icon names; e.g. "bag")
//   footerSteps  [{ t, text }]: the footer rewrites to a one-line working at each t (spec.footer before the first);
//                keep each under ≈ 45 characters
//   bonus        { t, label, amount, tone = "good" }: an extra row under the sheet (dashed: it is not part of the
//                total) that slams in at t; its amount rolls; the label stack shows it
//   notes        "auto" (default: on the sheet when two-line rows fit, else in the label stack) | "sheet" | "label" | false
//   intro        true / false forces the total intro on or off (default: on when the first part starts ≥ 0.5 s)
//   stageBottom  y where the stage ends (overrides the solver; the label stack keeps what is left)
import { h, css as style, setHTML, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, inkWidth, slamFromFor, heroRow, odometer, stageFlash, flashAt, parseDisplay, displayValue,
  bump, slam, rise, durationOf, beatTimes, toneColor,
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
.ss-amt { transform-origin: 100% 55%; }
.ss-q { display: inline-block; font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; color: #6B7584; }
.ss-lab .sb-label { height: 100%; justify-content: center; }
.ss-l3 { max-width: 100%; font: 600 42px/1.15 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; text-align: center; white-space: nowrap; }
.ss-foot { position: absolute; font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; text-align: center; white-space: nowrap; }
.ss-foot em { font-style: normal; color: #FFFFFF; }
`

const CUT = 0.18          // a cut lands (pointer, row light, label slam, gap) before the roll starts
const GAP = 8             // px a split opens between two slices
const RX = 140, RW = 800  // bar, rows and tracks share x 140-940 (below y 820 text must end by 940)
const TOP = 680           // stage top (layoutFor with the hero row)

// slice colours per tone: neighbours of the same tone alternate shades so every split stays visible
const SHADES = { neutral: ['#E9EDF2', '#AEB8C6', '#7D8796'], bad: [C.red, '#C2384A'], good: [C.green, '#1FC46A'] }

const hexRGB = c => { const x = parseInt(String(c).slice(1), 16); return [x >> 16, (x >> 8) & 255, x & 255] }
const rgba = (c, a) => `rgba(${hexRGB(c).join(', ')}, ${clamp(a).toFixed(3)})`
const mix = (c1, c2, p) => { const a = hexRGB(c1), b = hexRGB(c2); return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * clamp(p))).join(', ')})` }
const pctOf = s => { const m = /(\d+(?:\.\d+)?)\s*%/.exec(String(s || '')); return m ? +m[1] / 100 : NaN }
const opened = (t, t0, dur = 0.18) => (t0 <= 0.001 ? 1 : t < t0 ? 0 : ease.out(prog(t, t0, dur)))

/** a working line for Anton line 1: tokens with digits (and ≈) stay money green, operators and words go grey */
function workHTML(str) {
  return String(str || '').split(/(\s+)/).map(tok => {
    if (!tok || /^\s+$/.test(tok)) return tok
    return /[\d≈]/.test(tok) ? ax(esc(tok)) : `<span class="op">${ax(esc(tok))}</span>`
  }).join('')
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
  const remList = lo.hero === 'remaining' && Array.isArray(lo.remaining) ? lo.remaining.filter(r => r && r.display != null) : []
  const heroMode = remList.length ? 'remaining' : 'total'
  const rowsRoll = heroMode === 'total'        // remaining mode: the hero rolls, the row amounts slam in
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
    if (best >= 0) { o.start = beats[best].start; o.roll = beats[best].roll } else { o.start = o.t + CUT; o.roll = 0.9 }
    o.land = o.start + o.roll
    return o
  }).sort((a, b) => a.start - b.start)
  const goalIdx = parts.reduce((g, p, i) => (tone(p) === 'goal' ? i : g), -1)
  const vT = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null

  // ---------- layout: the sheet takes what it needs; the label stack keeps the rest ----------
  const rowsN = n + (bonus ? 1 : 0)
  const limit = capsOn ? 1308 : 1472
  const span = limit - TOP                       // stage + 16 + label slot
  const dense = rowsN >= 6
  const G = { padT: dense ? 16 : 22, padB: dense ? 12 : 18, barGap: dense ? 18 : 24, rowGap: dense ? 7 : rowsN >= 5 ? 9 : 12 }
  const barH = rowsN <= 3 ? 72 : rowsN <= 5 ? 60 : 50
  const fixed = G.padT + barH + G.barGap + (rowsN - 1) * G.rowGap + G.padB
  const sheetH = rh => fixed + rowsN * rh
  const labelMin = capsOn ? 128 : 150
  const hasNotes = parts.some(p => p.note)
  const notesOpt = lo.notes === false ? 'off' : lo.notes || 'auto'
  const ROW2 = 120
  let rowMode = 'one', rowH
  if (hasNotes && (notesOpt === 'sheet' || (notesOpt === 'auto' && span - 16 - sheetH(ROW2) >= labelMin))) { rowMode = 'two'; rowH = ROW2 }
  else {
    const want = hasNotes && notesOpt !== 'off' ? 196 : 160      // three lines (working, part, note) or two
    rowH = Math.floor((span - 16 - Math.max(labelMin, want) - fixed) / rowsN)
    if (rowH < 60) rowH = Math.floor((span - 16 - labelMin - fixed) / rowsN)
    rowH = clamp(rowH, 46, 96)
  }
  const sbDefault = L0.stage.y + L0.stage.h
  const SB = Math.round(lo.stageBottom ?? Math.min(limit - 16 - 96, Math.max(sbDefault, TOP + sheetH(rowH))))
  const L = layoutFor(spec, { stageBottom: SB })
  const stageH = L.stage.h
  const slack = Math.max(0, stageH - sheetH(rowH))
  const barY = Math.round(slack / 2) + G.padT                 // relative to the stage top
  const rowsY = barY + barH + G.barGap
  const rowY = i => rowsY + i * (rowH + G.rowGap)
  const trackH = rowH >= 80 ? 10 : rowH >= 60 ? 8 : 6
  const band = rowH - 6 - trackH - 2                          // text band inside a row (above its track)
  const slot = { y: L.stage.y + stageH + 16, h: limit - (L.stage.y + stageH) - 16, w: 800 }

  // ---------- canvas: bar, row boxes, tracks, pointer (all decoration) ----------
  const cv = h('canvas', { class: 'ss-canvas', 'data-deco': '', width: W, height: stageH, style: { top: L.stage.y + 'px', width: W + 'px', height: stageH + 'px' } })
  stage.append(cv)
  const g = cv.getContext('2d')
  const flash = stageFlash(stage, L)

  // ---------- hero: the total (or what is left) ----------
  const heroDisplays = [total.display, ...rem.map(r => r.display)].filter(Boolean)
  const widest = heroDisplays.reduce((a, b) => (b.length > a.length ? b : a), '')
  const estEm = widest.replace(/[^\d]/g, '').length * 0.5 + (widest.match(/[,.]/g) || []).length * 0.22 + widest.replace(/[\d,.\s]/g, '').length * 0.5 + 0.3
  const icon = lo.icon || null
  const heroSize = Math.round(Math.min(SIZE.hero, (920 - (icon ? SIZE.heroIcon + 12 : 0)) / Math.max(1, estEm)))
  const hero = heroRow(stage, L, { icon, size: heroSize, iconSize: Math.round(SIZE.heroIcon * Math.min(1, heroSize / SIZE.hero + 0.1)) })
  const totalTpl = parseDisplay(total.display)

  // ---------- rows (text is DOM; the boxes and tracks are drawn on the canvas) ----------
  const amtPx = rowMode === 'two' ? 66 : clamp(Math.round(band * 0.92), 40, 64)
  const pctPx = clamp(Math.round(amtPx * 0.78), 40, 52)
  const labelPx = rowMode === 'two' ? 54 : clamp(Math.round(band * 0.8), 40, 58)
  const counters = {}
  const sliceCol = parts.map(p => {
    const k = tone(p) === 'goal' ? 'good' : tone(p)
    const j = (counters[k] = (counters[k] ?? -1) + 1)
    return SHADES[k][j % SHADES[k].length]
  })
  const textCol = p => toneColor(tone(p))
  const rowDefs = parts.map((p, i) => ({ label: p.label || '', note: p.note || '', pct: p.pct || '', amount: String(p.amount ?? ''), color: textCol(p), y: rowY(i), part: i }))
  if (bonus) rowDefs.push({ label: bonus.label || '', note: '', pct: '', amount: String(bonus.amount || ''), color: toneColor(bonus.tone), y: rowY(n), bonus: true })
  const rows = rowDefs.map(rd => {
    const top = L.stage.y + rd.y
    const el = h('div', { class: 'ss-row', style: { left: RX + 'px', top: top + 'px', width: RW + 'px', height: rowH + 'px' } })
    const label = h('div', { class: 'ss-label', html: rich(rd.label), style: { fontSize: labelPx + 'px' } })
    const note = rowMode === 'two' && rd.note ? h('div', { class: 'ss-note', html: richUI(rd.note) }) : null
    const name = h('div', { class: 'ss-name', style: { top: '3px', height: band + 'px' } }, label, note)
    const pct = h('div', { class: 'ss-pct', html: ax(esc(rd.pct)), style: { top: '3px', height: band + 'px', fontSize: pctPx + 'px' } })
    const amt = h('div', { class: 'ss-amt', style: { top: '3px', height: band + 'px', right: '22px' } })
    const q = h('span', { class: 'ss-q', style: { fontSize: amtPx + 'px' } }, '?')
    amt.append(q)
    const odo = odometer(amt, { size: amtPx, color: rd.color, maxInt: 10, maxDp: 2 })
    el.append(name, pct, amt)
    stage.append(el)
    const tpl = parseDisplay(rd.amount)
    return { ...rd, el, label, note, name, pct, amt, q, odo, tpl, val: tpl.value * tpl.scale }
  })
  // columns: the widest landed amount, then the widest pct, then the label gets the rest
  let amtW = 0
  for (const r of rows) { r.odo.show(r.amount); style(r.q, { display: 'none' }); amtW = Math.max(amtW, r.odo.el.offsetWidth) }
  const pctW = Math.max(0, ...rows.map(r => r.pct.offsetWidth))
  const pctRight = 22 + amtW + (pctW ? 30 : 0)
  rows.forEach(r => style(r.pct, { right: pctRight + 'px' }))
  const nameW = RW - 24 - pctRight - (pctW ? pctW + 26 : 8)
  for (const r of rows) {
    style(r.name, { width: nameW + 'px' })
    fitText(r.label, nameW, { minPx: 40 })
    if (r.label.scrollWidth > nameW + 0.5 && band >= 2 * 40 + 4 && !r.note) {
      // a long label wraps onto two balanced lines (only when the row is tall enough)
      r.label.classList.add('wrap')
      style(r.label, { fontSize: Math.min(labelPx, Math.floor((band - 4) / 2.04)) + 'px', width: nameW + 'px' })
      fitText(r.label, nameW, { maxH: band, minPx: 40 })
    }
    if (r.note) fitText(r.note, nameW, { minPx: 40 })
    style(r.q, { display: 'inline-block' })
    style(r.odo.el, { display: 'none' })
  }
  const notesOnSheet = rowMode === 'two'

  // ---------- label stack (bottom bar): working · part · note ----------
  const items = []
  const idx = { intro: -1, parts: [], check: -1, bonus: -1 }
  if (intro) { idx.intro = items.length; items.push(total.label ? { l2: rich(total.label) } : { l2: workHTML(total.display), l2Color: C.green }) }
  parts.forEach((p, i) => {
    idx.parts.push(items.length)
    items.push({
      l1: total.display && p.pct ? workHTML(`${total.display} × ${p.pct}`) : null,
      l2: rich(p.label || ''),
      l2Color: tone(p) === 'goal' ? C.green : C.white,
      l3: !notesOnSheet && notesOpt !== 'off' && p.note ? richUI(p.note) : null,
      prefer: notesOnSheet || !p.note ? 'l1' : 'l3',
    })
  })
  if (d.check) { idx.check = items.length; items.push({ l1: workHTML(d.check), l2: rich(total.label || ''), prefer: 'l1' }) }
  if (bonus) { idx.bonus = items.length; items.push({ l1: workHTML(bonus.amount), l2: rich(bonus.label || ''), prefer: 'l1' }) }
  const labels = labelBox(stage, slot, items)

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

  // ---------- verdict (drawn here, fitted while measurable, in the label slot) ----------
  const verd = verdictBox(stage, spec, slot)

  // ---------- footer steps ----------
  let foot = null
  if (Array.isArray(lo.footerSteps) && lo.footerSteps.length) {
    const fw = L.footer.w
    const mk = text => {
      const el = h('div', { class: 'ss-foot', html: richUI(text), style: { top: L.footer.y + 'px', left: (W - fw) / 2 + 'px', width: fw + 'px' } })
      stage.append(el)
      fitText(el, fw, { maxH: L.footer.h + 4, minPx: 34 })
      style(el, { display: 'none' })
      return el
    }
    foot = {
      base: spec.footer ? mk(spec.footer) : null,
      steps: lo.footerSteps.filter(x => x && x.text).map(x => ({ t: +x.t || 0, el: mk(x.text) })).sort((a, b) => a.t - b.t),
    }
  }

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
    if (b.land - r0 > 0.25) cue(r0, 'roll', { dur: Math.max(0.3, b.land - r0 - 0.05), gain: rowsRoll ? 0.6 : 0.5 })
    if (goal) { cue(b.land, 'hit', { gain: 0.8 }); cue(b.land + 0.06, 'cash', { gain: 0.55 }) }
    else cue(b.land, 'ding', { gain: 0.5 })
  })
  if (checkT != null) { cue(checkT, 'thud', { gain: 0.55 }); cue(checkT + 0.36, 'cash', { gain: 0.5 }) }
  if (bonus) { cue(bonus.t, 'thud', { gain: 0.6 }); cue(bonus.start, 'roll', { dur: bonus.roll - 0.05, gain: 0.5 }); cue(bonus.land, 'ding', { gain: 0.5 }) }
  if (verd) cue(verd.t + 0.06, 'reveal', { gain: 0.7 })

  const lastBeat = Math.max(lastLand, checkT != null ? checkT + 0.8 : 0, bonus ? bonus.land : 0, ...(foot ? foot.steps.map(s => s.t) : [0]))
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

  function rowLit(i, t, focus) {
    if (focus.row === i) return 1 - 0.0 * prog(t, focus.t, 0.2)
    return 0
  }

  function drawRows(t, focus) {
    rows.forEach((r, i) => {
      const y = r.y
      const isBonus = !!r.bonus
      let alpha = 1
      if (isBonus) alpha = t < bonus.t ? 0 : slam(t, bonus.t).o
      if (alpha <= 0.001) return
      const lit = rowLit(i, t, focus)
      const col = isBonus ? toneColor(bonus.tone) : r.color
      g.save()
      g.globalAlpha = alpha
      rrect(RX, y, RW, rowH, R)
      g.fillStyle = '#07090C'
      g.fill()
      // track: the part's slice of the total, at the bar's x (ghosted until its roll fills it)
      if (!isBonus) {
        g.save()
        rrect(RX, y, RW, rowH, R)
        g.clip()
        const ty = y + rowH - 3 - trackH
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
      rrect(RX + 1.5, y + 1.5, RW - 3, rowH - 3, R - 1.5)
      g.stroke()
      g.restore()
    })
  }

  function drawPointer(t, focus) {
    if (focus.row < 0 || focus.row >= rows.length) return
    const r = rows[focus.row]
    const k = slam(t, focus.t, { dur: 0.2, from: 1.45 })
    const cy = r.y + (r.bonus ? rowH / 2 : (rowH - trackH) / 2 + 1), cx = 110, s = 17 * k.s
    g.save()
    g.globalAlpha = k.o
    g.fillStyle = '#FFFFFF'
    g.shadowColor = 'rgba(255, 255, 255, 0.45)'
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
    footer: foot ? false : undefined,
    verdict: false,
    seek(t) {
      const focus = focusAt(t)

      // canvas
      g.clearRect(0, 0, W, stageH)
      drawBar(t, focus)
      drawRows(t, focus)
      drawPointer(t, focus)

      // row amounts: "?" until reached, then a counter that lands exactly on the display (or a slam on landing)
      rows.forEach((r, i) => {
        const isBonus = !!r.bonus
        if (isBonus) {
          const show = t >= bonus.t
          style(r.el, { display: show ? 'block' : 'none' })
          if (!show) return
          const k = slam(t, bonus.t)
          style(r.el, { opacity: String(k.o) })
          style(r.name, { transform: `scale(${k.s.toFixed(4)})`, transformOrigin: '0 50%' })
        }
        const b = isBonus ? bonus : beats[i]
        const roll = isBonus || rowsRoll
        let sc = 1
        if (roll ? t < b.start : t < b.land) {
          style(r.q, { display: 'inline-block' })
          style(r.odo.el, { display: 'none' })
        } else {
          style(r.q, { display: 'none' })
          style(r.odo.el, { display: 'inline-flex' })
          const p = prog(t, b.start, b.roll)
          if (roll && p < 1 && isFinite(r.val)) r.odo.set(lerp(0, r.val, ease.out(p)), r.tpl)
          else r.odo.show(r.amount)
          if (!roll) sc = slam(t, b.land, { from: 1.3 }).s
          sc *= bump(t, b.land, { amp: !isBonus && tone(parts[i]) === 'goal' ? 0.16 : 0.11, dur: 0.4 })
        }
        if (vT != null && !isBonus && i === goalIdx) sc *= bump(t, vT + 0.06, { amp: 0.12, dur: 0.45 })
        style(r.amt, { transform: `scale(${sc.toFixed(4)})` })
      })

      // hero: the total, or what is left (rolls on the same curve as the slice it follows)
      let heroScale = 1, glow = 0
      if (heroMode === 'remaining') {
        let k = -1
        for (let j = 0; j < rem.length; j++) if (t >= rem[j].start) k = j
        if (k < 0) hero.show(total.display)
        else {
          const r = rem[k], prev = k > 0 ? rem[k - 1] : { display: total.display, val: totalTpl.value * totalTpl.scale }
          const p = prog(t, r.start, r.roll)
          if (p >= 1) hero.show(r.display)
          else if (p <= 0) hero.show(prev.display)
          else hero.set(lerp(prev.val, r.val, ease.out(p)), r.tpl)
        }
        for (const r of rem) { heroScale *= bump(t, r.land, { amp: 0.07, dur: M.bump }); if (t >= r.land) glow = Math.max(glow, 0.6 * (1 - ease.out(prog(t, r.land, 0.6)))) }
        if (goalIdx >= 0) { const L1 = beats[goalIdx].land; heroScale *= bump(t, L1, { amp: 0.06, dur: M.bump }); if (t >= L1) glow = Math.max(glow, 0.8 * (1 - ease.out(prog(t, L1, 0.9)))) }
      } else hero.show(total.display)
      if (checkT != null) { const L1 = checkT + 0.36; heroScale *= bump(t, L1, { amp: 0.1, dur: 0.45 }); if (t >= L1) glow = Math.max(glow, 1 - ease.out(prog(t, L1, 1.0))) }
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

      // footer steps: a hard cut to each line of working
      if (foot) {
        let cur = foot.base
        for (const st of foot.steps) if (t >= st.t) cur = st.el
        for (const el of [foot.base, ...foot.steps.map(s => s.el)]) if (el) style(el, { display: el === cur ? 'block' : 'none' })
        const st = foot.steps.find(s => s.el === cur)
        if (cur && st) { const r = rise(t, st.t, { dur: 0.16, dist: 12 }); style(cur, { opacity: String(r.o), transform: `translateY(${r.y.toFixed(1)}px)` }) }
      }

      // verdict: replaces the label stack
      if (verd) {
        verd.seek(t)
        const y = verd.yieldAt(t)
        style(labels.el, { opacity: String(1 - y), transform: `translateY(${(14 * y).toFixed(1)}px)`, visibility: y >= 1 ? 'hidden' : 'visible' })
      }
    },
  }
}

const TONE_KEYS = ['neutral', 'good', 'bad', 'goal']

/**
 * The bottom-bar label stack with an optional third line (HD Guy's description line, Inter grey): one group per beat,
 * built and fitted at mount; seek shows one with the kit's slam. Each item: { l1?, l2, l3?, l1Color?, l2Color?,
 * prefer: 'l1' | 'l3' } — when the slot is short, the line not preferred goes first, then the other.
 */
function labelBox(parent, slot, items) {
  const el = h('div', { class: 'sb-labels ss-lab', 'data-yield': '', style: { top: slot.y + 'px', left: (W - slot.w) / 2 + 'px', width: slot.w + 'px', height: slot.h + 'px' } })
  parent.append(el)
  const GAP = 6, L2MIN = 58
  const groups = items.map(it => {
    const grp = h('div', { class: 'sb-label' })
    el.append(grp)
    const line = (cls, html, color) => { const e = h('div', { class: cls, html }); if (color) e.style.color = color; grp.append(e); return e }
    let l1 = it.l1 ? line('sb-l1', it.l1, it.l1Color || C.green) : null
    const l2 = line('sb-l2', it.l2 || '', it.l2Color || C.white)
    let l3 = it.l3 ? line('ss-l3', it.l3) : null
    if (l1) fitText(l1, slot.w, { minPx: 44 })
    if (l3) fitText(l3, slot.w, { minPx: 40 })
    if (l3 && l3.scrollWidth > slot.w + 0.5) { l3.remove(); l3 = null }
    const room = () => slot.h - (l1 ? l1.offsetHeight + GAP : 0) - (l3 ? l3.offsetHeight + GAP : 0)
    for (const k of it.prefer === 'l3' ? ['l1', 'l3'] : ['l3', 'l1']) {
      if (room() >= L2MIN) break
      if (k === 'l1' && l1) { l1.remove(); l1 = null }
      if (k === 'l3' && l3) { l3.remove(); l3 = null }
    }
    fitText(l2, slot.w, { maxH: room(), minPx: 44 })
    grp.__from = slamFromFor(Math.max(1, ...[l1, l2, l3].filter(Boolean).map(inkWidth)), slot.w - 8)
    style(grp, { display: 'none' })
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

/**
 * The closing line in the label slot (the kit's verdict look: a green rule over Anton caps), fitted while the box is
 * measurable so a two-line verdict always stays inside the slot, with a slam scale that keeps it inside x 140-940.
 */
function verdictBox(parent, spec, slot) {
  const v = spec.verdict
  if (!v || !v.text) return null
  const box = h('div', { class: 'sb-verdict', style: { top: slot.y + 'px', left: (W - slot.w) / 2 + 'px', width: slot.w + 'px', height: slot.h + 'px' } })
  const rule = h('div', { class: 'sb-verdict-rule', 'data-deco': '' })
  const txt = h('div', { class: 'sb-verdict-text', html: rich(v.text) })
  box.append(rule, txt)
  parent.append(box)
  const gap = slot.h < 180 ? 12 : 20
  style(box, { display: 'flex', gap: gap + 'px' })
  fitText(txt, slot.w, { maxH: slot.h - 8 - gap - 6, minPx: SIZE.verdictMin })
  const from = slamFromFor(inkWidth(txt), slot.w - 8, 1.12)
  style(box, { display: 'none' })
  const t0 = Math.max(0, +v.t || 0)
  return {
    t: t0,
    yieldAt: t => prog(t, t0 - 0.04, 0.14),
    seek(t) {
      if (t < t0) { style(box, { display: 'none' }); return }
      const k = slam(t, t0 + 0.06, { from })
      style(box, { display: 'flex' })
      style(txt, { opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
      style(rule, { transform: `scaleX(${ease.out(prog(t, t0 + 0.1, 0.35)).toFixed(4)})` })
    },
  }
}
