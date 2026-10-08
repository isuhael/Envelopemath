// Scoreboard: dead-simple-list — "N dead simple numbers" (P1), Master Money's numbered list as a live scoreboard.
//
// One example number (data.input) is the score in the top bar: the hero odometer holds it from frame 1, tagged with
// what it is ("YOUR PAYCHECK / EVERY 2 WEEKS"), so the biggest number on the thumbnail is the viewer's own. The stage
// holds a numbered slot per item, all on the board from frame 1 and empty: a dark number cell (LED off), a skeleton
// where the label goes and a skeleton where the answer will roll. The viewer counts the numbers ahead.
// Each item is a hard cut:
//   1. cut (thud): the label stack slams the working in (line 1, green: "$2,500 × 26"; line 2, white caps: the
//      item's label); the slot lights in the item's tone (border glow, its number cell a solid lit block, a pointer
//      in the left margin jumps to it) and its label slams into the slot. When the working uses the input, the hero
//      bumps and flares (the working takes your number).
//   2. roll: the answer rolls up on the slot's own odometer (0.8-1.9 s by jump size, ending exactly at resultT, its
//      "≈" an unlit ghost while it runs).
//   3. land (ding): it lands exactly on the item's `result`: bump, glow flare, a floor bloom.
//   4. note (tick): the item's note rises into the slot's sub-line under the label, at noteT (default 0.35 s after
//      the landing), and stays: the finished board is a cheat sheet of N answers with their working notes. (No room
//      for sub-lines: at noteT the label stack hard-cuts (thud) to the working over the note instead; see Layout.)
// The goal (the first item with tone "goal", else the last item) is the climax: a taller slot, its answer about
// 1.3x bigger, a riser from its cut, a roll of >= 2.4 s when the timing allows, a landing with hit + cash, a big floor
// bloom, a neon green wash and a glow that stays lit. The previous slots settle (no glow): one focal number at a time.
// Wrong guess (lookOpts.wrongGuess, or data.wrongGuess): before its item, the slot lights white, the label stack slams
// the naive working, and the slot rolls up to the wrong answer and lands (pop). At strikeT a coral line strikes it
// (and the working in the label stack), and it dims to coral (buzz). At the item's own cut the struck number moves
// into the slot's sub-line as a small coral struck tag (when the board has sub-lines), the answer area empties, and
// the real answer rolls up like any other. The item's note, when it comes, replaces the struck tag.
// Check (data.check at checkT): a dashed check slot under the list (a ✓ cell, empty until then) slams the check line
// in ("10 × 2 + 2 × 3 = 26 PAYDAYS", the part after its last "=" in green), the ✓ lights green, ding. When the board
// has no room for that slot, the label stack carries it instead (line 1: the sum, line 2: "= 26 PAYDAYS").
// Verdict: the chrome's (the kit's one verdict slot, the label slot at the foot of the frame; the label stack yields
// to it). At verdict.t the pointer returns to the goal slot and it flares again.
// Frame 1: the header, the hero (the input), the footer, the empty numbered slots. With the first item at t <= 0.3,
// frame 1 is already 0.35 s into slot 1's roll (the roll stretches up to 3.2 s to land on its resultT), its working
// in the label stack: the thumbnail is in motion.
//
// Layout (measured with the real fonts, the richest that fits wins): slots span x 140-940; a number cell on the
// left, the label after it (Anton caps, one size for the board, 56 → 40 px, one line or two balanced lines), the
// answer right-aligned at x 918 (Anton odometer, 92 → 48 px; the goal ~1.3x, up to 118). Two row shapes:
//   side    the answer is centred on the row; the label and its sub-line (note / struck guess) stack on its left
//   under   the answer sits on the label's line; the sub-line runs under both (long notes)
// Notes (Inter 600 40 px, grey, one line or two) go in the slot's sub-line when the board has room for them; else
// at noteT the label stack cuts to the item's working over its note (the lit slot names the item). The check slot
// goes on the board when it fits after that, else into the label stack. A list too long for the compact top bar
// (e.g. 6 items, captions on, 2-line header and footer) then gives up the hero row before its slots lose their
// labels (unless lookOpts.hero is set): the header and the workings still show the input. Last resort: slots without
// labels (the label stack names each item as it cuts). Spare room grows the slot padding and gaps (capped), then
// centres the board in the stage. A word or unit after the answer's number ("2 a year", "$36/hr") is set small (>= 42 px) on
// the number's baseline, so the number carries the size.
//
// data (FORMATS.md §1): { input: { label, value, note }, typeDur = 0.6, items: [{ t, label, formula, result, tone,
//   note, resultT, noteT }], check, checkT, hold }
//   t: the cut (default 1.0 s, then 1.6 s after the previous landing); resultT: the landing (default t + typeDur +
//   0.3); noteT: when the note shows (never before the landing). check / checkT: the check line and when it lands
//   (default 1.2 s after the last landing).
// lookOpts (all optional):
//   hero        'input' | 'result' | false   what the top-bar odometer holds: the input (default when data.input
//                                          has a number), or each slot's answer rolling with it (default without
//                                          an input; the hero dips on each cut and lands with the slot), or no
//                                          hero row (the stage starts under the footer)
//   heroTag     true | false                the input's label and note beside the hero (default true)
//   labels      'reveal' | 'always' | 'none'   slot labels appear at their cut (default), or show grey from frame 1
//                                          and light up at their cut (the open-loop variant), or never (number +
//                                          answer only; the label stack names each item)
//   notes       'auto' | 'slot' | 'label' | false   where notes go (default: the slot when the board fits it)
//   checkRow    'auto' | 'board' | 'label'  where the check goes (default: the board when it fits)
//   check, checkT                          same as data.check / data.checkT (check may be { t, text })
//   wrongGuess  { item, t, formula, result, resultT, strike = true, strikeT, label } or a list of them: a wrong answer
//               lands in item's slot first (resultT, default t + typeDur + 0.3) and is struck out at strikeT
//               (default 0.5 s after it lands, or 0.45 s before the item's cut); strike: false only replaces it
//   goal        item index | false          the climax item (default: the first tone "goal", else the last)
//   intro       { l1, l2 }                  the label stack before the first cut (default: empty)
//   layout      'side' | 'under'            force a row shape
//   pointer     true | false                the pointer in the left margin (default true)
//   startNum    1                           the number on the first slot
//   stageBottom y                           move the stage / label split (kit-wide)
//   footerSteps [{ t, text }]               kit-wide (the chrome draws it)
import { h, s, css as style, attr, prog, ease, clamp, lerp } from '../../../runtime/core.js'
import { C, M, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, inkWidth, slamFit, heroRow, labelStack, odometer, stageFlash, flashAt,
  parseDisplay, bump, slam, rise, durationOf, toneColor,
} from '../lib.js'

export const css = `
/* border colour and glow are set from seek() as plain values (a box-shadow driven by a custom property leaves a stale
   glow outside the box when the property changes, so the raster would depend on seek order) */
.dsl-row { position: absolute; left: 140px; width: 800px; box-sizing: border-box; border-radius: 14px; background: #07090C;
  transform-origin: 50% 50%; border: 3px solid #1E2530; box-shadow: none; }
.dsl-row.chk { border-style: dashed; }
.dsl-row.chk.on { border-style: solid; }
.dsl-wash { position: absolute; left: 0; top: 0; right: 0; bottom: 0; border-radius: 11px; opacity: 0;
  background: linear-gradient(90deg, rgba(43, 255, 136, 0.30), rgba(43, 255, 136, 0.13) 55%, rgba(43, 255, 136, 0.24)); }
.dsl-cell { position: absolute; left: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center;
  border-radius: 11px 0 0 11px; border-right: 2px solid #1E2530; box-sizing: border-box; }
.dsl-num { font: 400 56px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; color: #6B7584; }
.dsl-lab { position: absolute; left: 0; top: 0; font: 400 50px/1.02 'Anton', 'Inter Full', sans-serif; text-transform: uppercase;
  letter-spacing: 0.01em; color: #FFFFFF; white-space: normal; text-wrap: balance; transform-origin: 0 50%; }
.dsl-lab em { font-style: normal; color: #2BFF88; }
.dsl-sub { position: absolute; left: 0; top: 0; font: 600 40px/44px 'Inter', 'Inter Full', sans-serif; color: #9AA4B2;
  white-space: normal; text-wrap: balance; }
.dsl-sub em { font-style: normal; color: #FFFFFF; }
.dsl-wtag { position: relative; display: inline-block; font: 400 44px/44px 'Anton', 'Inter Full', sans-serif; color: #FF4D5E;
  letter-spacing: 0.01em; text-transform: uppercase; }
.dsl-wtag::after { content: ''; position: absolute; left: -4px; right: -4px; top: 45%; height: 5px; border-radius: 3px;
  background: #FF4D5E; box-shadow: 0 0 10px rgba(255, 77, 94, 0.7); }
.dsl-skel { position: absolute; border-radius: 99px; background: #151A22; }
.dsl-res { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; transform-origin: 100% 55%; }
.dsl-res .sb-odo-fix { text-transform: uppercase; }
.dsl-rtxt { font: 400 60px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; white-space: nowrap; letter-spacing: 0.01em; }
.dsl-strike { position: absolute; right: -6px; border-radius: 4px; background: #FF4D5E; box-shadow: 0 0 14px rgba(255, 77, 94, 0.75);
  transform-origin: 0 50%; }
.dsl-chk { position: absolute; left: 0; top: 0; font: 400 48px/1.04 'Anton', 'Inter Full', sans-serif; text-transform: uppercase;
  letter-spacing: 0.01em; color: #FFFFFF; white-space: normal; text-wrap: balance; transform-origin: 0 50%; }
.dsl-chk em { font-style: normal; color: #2BFF88; }
.dsl-ptr { position: absolute; }
/* slamming / bumping text: its glyph patches keep >= 40 px at the undershoot (the kit's floor is 40 at rest) */
.dsl-lab .ax, .dsl-lab .axo, .dsl-chk .ax, .dsl-chk .axo, .dsl-res .ax, .dsl-res .axo { font-size: max(0.86em, min(1em, 42px)); }
.dsl-tag { position: absolute; top: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; gap: 2px;
  text-align: right; white-space: nowrap; font: 700 42px/1.08 'Inter', 'Inter Full', sans-serif; text-transform: uppercase;
  letter-spacing: 0.04em; }
.dsl-tag > span { display: block; }
.dsl-tag .a { color: #FFFFFF; }
.dsl-tag .b { color: #9AA4B2; }
.sb-l1 .dsl-wl { position: relative; display: inline-block; }
.sb-l1 .dsl-wline { position: absolute; left: -6px; right: -6px; top: 44%; height: 6px; border-radius: 3px; background: #FF4D5E;
  box-shadow: 0 0 12px rgba(255, 77, 94, 0.7); transform-origin: 0 50%; transform: scaleX(0); }
`

// ---------- geometry (frame px) ----------
const SX = 140, SW = 800, B = 3        // slot boxes x 140-940, border
const RX = 918                         // answers end here: inside the slot, clear of the right rail (x 940)
const SUB_LH = 44                      // sub-line: Inter 600 40 / 44
const LAB_LH = 1.02                    // slot label line height (em)
const CHK_LH = 1.04
const CUT = 0.18                       // a cut's slam lands before its roll starts
const PRE = 0.35                       // frame 1 is this far into the first roll (first item at t <= 0.3)
const ROLL0_MAX = 3.2                  // the frame-1 roll may stretch to this, so it lands on its resultT
const MARGIN = 16                      // board inset from the stage edges
const RS_STEPS = [92, 84, 76, 70, 64, 58, 52, 48]
const LS_STEPS = [56, 52, 48, 46, 44, 42, 40]        // labels under 42 px enter without the slam's scale (its ~2% undershoot)
const PAD_STEPS = [[14, 14], [10, 10], [8, 8]]

const hexRGB = hex => { const x = parseInt(hex.slice(1), 16); return [x >> 16, (x >> 8) & 255, x & 255] }
const rgba = (hex, a) => `rgba(${hexRGB(hex).join(', ')}, ${clamp(a).toFixed(3)})`
const mixHex = (a, b, p) => { const x = hexRGB(a), y = hexRGB(b); return `rgb(${x.map((v, k) => Math.round(lerp(y[k], v, clamp(p)))).join(', ')})` }
/** a slot's lit state: border from the hairline to its tone, and a glow (plain values, see the CSS note) */
const litStyle = (lit, tone) => ({
  borderColor: mixHex(tone, '#1E2530', lit),
  boxShadow: lit > 0.005 ? `0 0 ${(34 * lit).toFixed(1)}px ${rgba(tone, 0.5 * lit)}` : 'none',
})
// a word or unit after the number ("2 a year", "$36/hr", "60 months") is set small; K/M/B/T and "%" stay full size
const smallSuffix = tpl => !!tpl.suffix.trim() && tpl.scale === 1 && /[a-z/]/i.test(tpl.suffix)
const isNum = tpl => Number.isFinite(tpl.value)
// Anton's "=" is tiny (like its × ÷ + −): set it as the kit's operator glyph (.axo, Inter Full ExtraBold)
const EQ = '\u0001'
const eqIn = str => String(str).replace(/=/g, EQ)
const eqOut = html => html.split(EQ).join('<span class="axo">=</span>')
const richA = str => eqOut(rich(eqIn(str)))            // spec markup for an Anton context
const plainA = str => eqOut(ax(esc(eqIn(str))))        // a plain string (working, display) for an Anton context

export default function deadSimpleList(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const items = (Array.isArray(d.items) ? d.items : []).filter(it => it && it.result != null)
  if (!items.length) throw new Error('dead-simple-list: data.items is empty')
  const N = items.length
  const typeDur = Number.isFinite(+d.typeDur) ? +d.typeDur : 0.6

  // ---------- the hero: the input (the viewer's number), or each slot's answer ----------
  const input = d.input && d.input.value != null && isNum(parseDisplay(String(d.input.value))) ? { label: '', note: '', ...d.input, value: String(d.input.value) } : null
  let heroMode = lo.hero === false || lo.hero === 'none' ? 'none' : lo.hero === 'result' ? 'result' : input ? 'input' : 'result'
  const layoutOf = withHero => layoutFor(spec, { hero: withHero, ...(lo.stageBottom ? { stageBottom: +lo.stageBottom } : {}) })
  let L = layoutOf(heroMode !== 'none')

  // ---------- timing ----------
  const T = []
  items.forEach((it, i) => {
    const prev = T[i - 1]
    let t = it.t != null ? +it.t : prev ? prev.land + 1.6 : 1.0
    if (prev) t = Math.max(t, prev.cut + 0.3)
    let land = it.resultT != null ? +it.resultT : t + typeDur + 0.3
    land = Math.max(land, t + 0.45)
    T.push({ cut: t, land })
  })
  const goalIdx = lo.goal === false ? -1 : Number.isInteger(lo.goal) && lo.goal >= 0 && lo.goal < N ? lo.goal
    : items.findIndex(it => it.tone === 'goal') >= 0 ? items.findIndex(it => it.tone === 'goal') : N - 1

  // wrong guesses: a wrong answer lands in the slot first and is struck out before the real working
  const wgRaw = lo.wrongGuess ?? d.wrongGuess
  const wrongOf = new Array(N).fill(null)
  for (const w of (Array.isArray(wgRaw) ? wgRaw : wgRaw ? [wgRaw] : [])) {
    const i = +w?.item
    if (!w || !Number.isInteger(i) || i < 0 || i >= N || wrongOf[i] || w.result == null || w.t == null) continue
    const t0 = +w.t
    if (!(t0 < T[i].cut - 0.3) || (i > 0 && t0 < T[i - 1].cut + 0.3)) {
      console.warn(`scoreboard dead-simple-list: wrongGuess for item ${i} at ${t0} s is skipped (it must start after the previous item's cut and >= 0.3 s before its own)`)
      continue
    }
    let land = w.resultT != null ? +w.resultT : t0 + typeDur + 0.3
    land = clamp(land, t0 + 0.3, T[i].cut - 0.2)
    let strikeT = w.strike === false ? Infinity : w.strikeT != null ? +w.strikeT : Math.max(land + 0.5, T[i].cut - 0.45)
    if (Number.isFinite(strikeT)) strikeT = clamp(strikeT, land + 0.1, T[i].cut - 0.05)
    wrongOf[i] = { t: t0, land, strikeT, formula: String(w.formula || ''), disp: String(w.result), label: w.label != null ? String(w.label) : null }
  }

  // rolls: 0.8-1.9 s by jump size (the goal >= 2.4 s), ending exactly at the landing; a short beat squeezes it
  const rollFor = (from, to, start, land, big) => {
    let r = clamp(0.5 + 0.34 * Math.log10(Math.abs(to - from) + 1), M.rollMin, M.rollMax)
    if (big) r = Math.max(r, M.rollFinal)
    return Math.max(0.3, Math.min(r, land - start))
  }
  const R = items.map((it, i) => {
    const tone = it.tone || 'neutral'
    const climax = i === goalIdx
    const col = climax ? (tone === 'bad' ? C.red : C.green) : toneColor(tone)
    const disp = String(it.result)
    const tpl = parseDisplay(disp)
    const wr = wrongOf[i]
    let wrong = null
    if (wr) {
      const wtpl = parseDisplay(wr.disp)
      const wn = isNum(wtpl)
      const wv = wn ? wtpl.value * wtpl.scale : 0
      const start = wr.t + CUT
      const dur = wn ? rollFor(0, wv, start, wr.land, false) : 0
      wrong = { ...wr, tpl: wtpl, numeric: wn, val: wv, rs: wr.land - dur, dur }
    }
    const numeric = isNum(tpl)
    const to = numeric ? tpl.value * tpl.scale : 0
    const cut = T[i].cut, land = T[i].land
    let dur = numeric ? rollFor(0, to, cut + CUT, land, climax) : 0
    let rs = land - dur
    // frame 1 is already into the first roll (the thumbnail moves); the roll stretches to land on its resultT
    if (i === 0 && !wrong && numeric && cut <= 0.3 && rs > -PRE && land + PRE <= ROLL0_MAX) { rs = -PRE; dur = land + PRE }
    if (i === 0 && wrong && wrong.numeric && wrong.t <= 0.3 && wrong.rs > -PRE && wrong.land + PRE <= ROLL0_MAX) { wrong.rs = -PRE; wrong.dur = wrong.land + PRE }
    const noteT = it.note ? Math.max(land + 0.15, it.noteT != null ? +it.noteT : land + 0.35) : Infinity
    return {
      i, it, tone, climax, col, disp, tpl, numeric, to, cut, land, rs, dur, wrong, noteT,
      cut0: wrong ? wrong.t : cut, label: String(it.label ?? ''), note: it.note ? String(it.note) : '',
      formula: String(it.formula || ''),
    }
  })
  const lastLand = Math.max(...R.map(r => r.land))

  // the check line (data.check / lookOpts.check)
  const chkRaw = d.check ?? lo.check
  const chkText = chkRaw == null ? '' : String(typeof chkRaw === 'object' ? chkRaw.text ?? '' : chkRaw).replace(/^\s*check:\s*/i, '').replace(/\s*[✓✔]\s*$/, '').trim()
  const checkT = chkText ? +(d.checkT ?? (typeof chkRaw === 'object' ? chkRaw.t : null) ?? lo.checkT ?? lastLand + 1.2) : Infinity
  // the part after the last "=" is the tie-back: green
  let chkL = chkText, chkR = ''
  if (chkText && !/\*\*|__/.test(chkText)) {
    const k = chkText.lastIndexOf('=')
    if (k > 0) { chkL = chkText.slice(0, k).trim(); chkR = chkText.slice(k).trim() }
  }
  const chkMarkup = chkR ? `${chkL} **${chkR}**` : chkText

  // ---------- measuring (real fonts, memoised) ----------
  const probe = h('div', { style: { position: 'absolute', left: '0px', top: '0px', width: '2000px', visibility: 'hidden' } })
  stage.append(probe)
  const memo = new Map()
  const linesOf = (html, cls, px, w, lhPx) => {
    const key = `${cls}|${px}|${Math.round(w)}|${html}`
    if (memo.has(key)) return memo.get(key)
    const el = h('div', { class: cls, html, style: { position: 'static', fontSize: px + 'px', width: Math.round(w) + 'px' } })
    probe.append(el)
    const n = el.scrollWidth > Math.round(w) + 1 ? Infinity : Math.max(1, Math.round(el.offsetHeight / lhPx))
    el.remove()
    memo.set(key, n)
    return n
  }
  const widthOf = (html, cls, px) => {
    const key = `w|${cls}|${px}|${html}`
    if (memo.has(key)) return memo.get(key)
    const el = h('span', { class: cls, html, style: { position: 'static', display: 'inline-block', whiteSpace: 'nowrap', fontSize: px + 'px' } })
    probe.append(el)
    const w = el.getBoundingClientRect().width
    el.remove()
    memo.set(key, w)
    return w
  }
  // small: the board's decision (every slot sets its unit the same way): the board's answer size leaves room for a
  // >= 42 px unit under 82% of the number
  const sufStyle = (odo, tpl, px, small = true) => {
    const suf = odo.el.lastChild
    if (small && smallSuffix(tpl)) {
      const sp = Math.max(42, Math.round(px * 0.5))
      if (sp <= px * 0.82) { style(suf, { fontSize: sp + 'px', marginTop: (0.89 * (px - sp)).toFixed(1) + 'px', marginLeft: '0.12em' }); return }
    }
    style(suf, { fontSize: '1em', marginTop: '0px', marginLeft: '0px' })
  }
  const smallOn = RS => Math.max(42, Math.round(RS * 0.5)) <= RS * 0.82
  const probeRes = h('div', { style: { position: 'static', display: 'inline-flex' } })
  probe.append(probeRes)
  const probeOdo = odometer(probeRes, { size: 100, maxInt: 10, maxDp: 2 })
  const resWidth = (disp, px, small) => {
    const key = `r|${px}|${small}|${disp}`
    if (memo.has(key)) return memo.get(key)
    const tpl = parseDisplay(disp)
    let w
    if (isNum(tpl)) {
      style(probeOdo.el, { fontSize: px + 'px' })
      sufStyle(probeOdo, tpl, px, small)
      probeOdo.show(disp)
      w = probeOdo.el.getBoundingClientRect().width
    } else w = widthOf(ax(esc(disp)), 'dsl-rtxt', px)
    memo.set(key, w)
    return w
  }
  const labHTML = str => `<span>${richA(str)}</span>`
  const subHTML = str => `<span>${richUI(str)}</span>`

  // ---------- the layout solver (see the header): the richest board that fits the stage ----------
  const notesWanted = R.some(r => r.note) && lo.notes !== false
  const anyWrongTag = R.some(r => r.wrong && Number.isFinite(r.wrong.strikeT))
  const labelsShown = lo.labels !== 'none'
  function evaluate(cfg, avail) {
    const { mode, LS, RS, noteSlot, chkBoard, pad, gap, bareRows } = cfg
    const GS = goalIdx >= 0 ? Math.min(Math.round(RS * 1.3), 118) : RS
    const NW = clamp(Math.round(RS * 0.9 + 8), 66, 92)
    const labelX = SX + NW + 20
    const sm = smallOn(RS)
    const rows = []
    let total = 0
    for (const r of R) {
      const rs = r.climax ? GS : RS
      const resW = Math.max(resWidth(r.disp, rs, sm), r.wrong ? resWidth(r.wrong.disp, rs, sm) : 0, rs * 1.2)
      const labW = RX - resW - (26 + (r.climax ? 0.17 : 0.1) * resW) - labelX
      if (labW < 150 && !bareRows) return null
      let labLines = 0
      if (!bareRows && r.label) {
        labLines = linesOf(labHTML(r.label), 'dsl-lab', LS, labW, LS * LAB_LH)
        if (labLines > 2) return null
      }
      const labH = labLines * LS * LAB_LH
      const hasSub = !bareRows && noteSlot && (r.note || (r.wrong && Number.isFinite(r.wrong.strikeT)))
      const subW = mode === 'side' ? labW : RX - labelX
      let subLines = 0
      if (hasSub) {
        subLines = r.note ? linesOf(subHTML(r.note), 'dsl-sub', 40, subW, SUB_LH) : 1
        if (subLines > 2) return null
        if (r.wrong && widthOf(ax(esc(r.wrong.disp)), 'dsl-wtag', 44) + 12 > subW) return null
      }
      const subH = hasSub ? 4 + subLines * SUB_LH : 0
      const main = mode === 'side' ? Math.max(rs, labH + subH) : Math.max(rs, labH)
      const inner = mode === 'side' ? main : main + subH
      const hh = inner + 2 * pad + 2 * B
      rows.push({ rs, resW, labW, labLines, labH, hasSub, subW, subLines, subH, main, inner, h: hh })
      total += hh
    }
    total += gap * (N - 1)
    let chk = null
    if (chkText && chkBoard) {
      const CS = clamp(LS, 44, 52)
      const cw = RX - labelX
      const lines = linesOf(`<span>${richA(chkMarkup)}</span>`, 'dsl-chk', CS, cw, CS * CHK_LH)
      if (lines > 2) return null
      const ch = lines * CS * CHK_LH
      chk = { CS, w: cw, lines, inner: ch, h: ch + 2 * Math.max(pad, 10) + 2 * B }
      total += gap + chk.h
    }
    if (total > avail) return null
    // a label that fits one line at a slightly smaller size reads better than a bigger one broken in two
    const wrapped = rows.filter(rw => rw.labLines > 1).length
    const score = RS * 3 + (bareRows ? -2000 : LS * 2) + (noteSlot || !notesWanted ? 120 : 0) + (noteSlot && anyWrongTag ? 40 : 0)
      + (chkBoard || !chkText ? 90 : 0) + pad + gap * 0.5 + (mode === 'side' ? 2 : 0) - 14 * wrapped
    return { ...cfg, GS, NW, labelX, sm, rows, chk, total, score }
  }
  const modes = lo.layout === 'under' ? ['under'] : lo.layout === 'side' ? ['side'] : ['side', 'under']
  const noteOpts = !notesWanted && !anyWrongTag ? [false] : lo.notes === 'label' ? [false] : lo.notes === 'slot' ? [true] : [true, false]
  const chkOpts = !chkText ? [false] : lo.checkRow === 'label' ? [false] : lo.checkRow === 'board' ? [true] : [true, false]
  function solve(LL) {
    const avail = LL.stage.h - 2 * MARGIN
    let best = null
    for (const bareRows of labelsShown ? [false] : [true]) for (const mode of modes) for (const LS of LS_STEPS) for (const RS of RS_STEPS) {
      if (RS < LS) continue
      for (const noteSlot of noteOpts) for (const chkBoard of chkOpts) for (const [pad, gap] of PAD_STEPS) {
        const ev = evaluate({ mode, LS, RS, noteSlot, chkBoard, pad, gap, bareRows }, avail)
        if (ev && (!best || ev.score > best.score)) best = ev
      }
    }
    if (!best) {
      // last resort: slots without labels (the label stack names each item as it cuts), then the tightest board
      for (const RS of [...RS_STEPS, 44]) for (const [pad, gap] of [...PAD_STEPS, [6, 6]]) {
        const ev = evaluate({ mode: 'side', LS: 40, RS, noteSlot: false, chkBoard: false, pad, gap, bareRows: true }, avail)
        if (ev && (!best || ev.score > best.score)) best = ev
      }
    }
    if (best) best.avail = avail
    return best
  }
  let best = solve(L)
  // a list too long for the compact top bar: before its slots lose their labels, the hero row (the input, which the
  // header and the workings also show) gives its room to the board, unless lookOpts.hero asks for it
  if (heroMode !== 'none' && lo.hero == null && labelsShown && (!best || best.bareRows)) {
    const L2 = layoutOf(false), b2 = solve(L2)
    if (b2 && !b2.bareRows) { best = b2; L = L2; heroMode = 'none' }
  }
  if (!best) {
    console.warn('scoreboard dead-simple-list: the board does not fit the stage; it runs tight')
    best = evaluate({ mode: 'side', LS: 40, RS: 44, noteSlot: false, chkBoard: false, pad: 4, gap: 4, bareRows: true }, Infinity)
    best.avail = L.stage.h - 2 * MARGIN
  }
  const P = best
  const avail = P.avail
  // the struck guess's width (the strike line spans the landed wrong answer)
  R.forEach((r, i) => { if (r.wrong) r.wrong.w = resWidth(r.wrong.disp, P.rows[i].rs, P.sm) })
  probe.remove()
  const noteSlot = P.noteSlot, chkBoard = !!P.chk, bareRows = P.bareRows
  // spare room: grow the slot padding (<= 12 px more a side), then the gaps (<= 24 px), then centre the board
  {
    let extra = avail - P.total
    const nRows = N + (P.chk ? 1 : 0), nGaps = nRows - 1
    const addPad = Math.min(12, extra / (2 * nRows))
    P.pad += addPad; extra -= 2 * addPad * nRows
    for (const rw of P.rows) rw.h += 2 * addPad
    if (P.chk) P.chk.h += 2 * addPad
    const addGap = nGaps > 0 ? Math.min(24 - P.gap, extra / nGaps) : 0
    if (addGap > 0) { P.gap += addGap; extra -= addGap * nGaps }
    P.top = L.stage.y + MARGIN + Math.max(0, extra) / 2
  }
  // whole pixels (crisp hairlines and rounded corners)
  let yy = P.top
  P.rows.forEach(rw => { rw.h = Math.round(rw.h); rw.y = Math.round(yy); yy += rw.h + P.gap })
  if (P.chk) { P.chk.h = Math.round(P.chk.h); P.chk.y = Math.round(yy) }

  // ---------- DOM: the board ----------
  const NS = clamp(Math.round(Math.min(P.RS, Math.min(...P.rows.map(rw => rw.h)) - 2 * B - 8) * 0.74), 42, 66)
  const IX = SX + B                               // a row's padding box starts here (children are placed from it)
  const startNum = Number.isFinite(+lo.startNum) ? +lo.startNum : 1
  const showLabelsAlways = lo.labels === 'always'
  const rowsEl = R.map((r, i) => {
    const rw = P.rows[i]
    const el = h('div', { class: 'dsl-row', 'data-band-unit': '', style: { top: rw.y.toFixed(1) + 'px', height: rw.h.toFixed(1) + 'px' } })
    const innerH = rw.h - 2 * B
    const wash = h('div', { class: 'dsl-wash', 'data-deco': '' })
    const cell = h('div', { class: 'dsl-cell', style: { width: P.NW - B + 'px' } })
    const num = h('div', { class: 'dsl-num', style: { fontSize: NS + 'px' } }, String(startNum + i))
    cell.append(num)
    el.append(wash, cell)
    // where things sit inside the row: side = answer centred, label + sub stacked on its left; under = answer on the
    // label's line, sub-line under both
    const mainTop = P.mode === 'side' ? (innerH - rw.main) / 2 : (innerH - rw.inner) / 2
    const lx = P.labelX - IX
    let lab = null, lskel = null, sub = null, note = null, wtag = null
    if (!bareRows && r.label) {
      const blockH = P.mode === 'side' ? rw.labH + rw.subH : rw.labH
      const labTop = P.mode === 'side' ? (innerH - blockH) / 2 : mainTop + (rw.main - rw.labH) / 2
      lab = h('div', { class: 'dsl-lab', html: labHTML(r.label), style: { left: lx + 'px', top: Math.round(labTop) + 'px', width: Math.floor(rw.labW) + 'px', fontSize: P.LS + 'px' } })
      el.append(lab)
      lskel = h('div', { class: 'dsl-skel', 'data-deco': '', style: { left: lx + 'px', top: Math.round(innerH / 2 - P.LS * 0.13) + 'px', width: Math.round(Math.min(rw.labW, 420) * 0.62) + 'px', height: Math.round(P.LS * 0.26) + 'px' } })
      el.append(lskel)
      if (rw.hasSub) {
        const subTop = labTop + rw.labH + 4
        sub = h('div', { class: 'dsl-sub', style: { left: lx + 'px', top: Math.round(subTop) + 'px', width: Math.floor(rw.subW) + 'px', height: rw.subLines * SUB_LH + 'px' } })
        if (r.note) { note = h('div', { html: subHTML(r.note) }); sub.append(note) }
        if (r.wrong && Number.isFinite(r.wrong.strikeT)) { wtag = h('div', { html: `<span class="dsl-wtag">${ax(esc(r.wrong.disp))}</span>` }); sub.append(wtag) }
        el.append(sub)
      }
    }
    // the answer: right-aligned at x RX, vertically centred in the main band
    const resTop = mainTop + (rw.main - rw.rs) / 2
    const resRight = SX + SW - B - RX
    const resW = Math.ceil(rw.resW) + 4
    const rskel = h('div', { class: 'dsl-skel', 'data-deco': '', style: { right: resRight + 'px', top: Math.round(resTop + rw.rs * 0.4) + 'px', width: Math.round(Math.max(rw.rs * 1.1, resW * 0.62)) + 'px', height: Math.round(rw.rs * 0.2) + 'px' } })
    const res = h('div', { class: 'dsl-res', style: { right: resRight + 'px', top: Math.round(resTop) + 'px', width: resW + 'px', height: rw.rs + 'px' } })
    let odo = null, txt = null, wtxt = null
    if (r.numeric || (r.wrong && r.wrong.numeric)) {
      odo = odometer(res, { size: rw.rs, color: r.col, maxInt: 10, maxDp: 2 })
    }
    if (!r.numeric) { txt = h('div', { class: 'dsl-rtxt', html: ax(esc(r.disp)), style: { fontSize: rw.rs + 'px', color: r.col } }); res.append(txt) }
    if (r.wrong && !r.wrong.numeric) { wtxt = h('div', { class: 'dsl-rtxt', html: ax(esc(r.wrong.disp)), style: { fontSize: rw.rs + 'px', color: C.white } }); res.append(wtxt) }
    const strike = r.wrong ? h('i', { class: 'dsl-strike', 'data-deco': '', style: { top: (rw.rs * 0.455 - Math.max(5, rw.rs * 0.07) / 2).toFixed(1) + 'px', height: Math.max(5, Math.round(rw.rs * 0.07)) + 'px' } }) : null
    if (strike) res.append(strike)
    el.append(rskel, res)
    stage.append(el)
    // slot label slam: grows right from its left edge, never past its column
    const labFrom = lab && P.LS >= 42 ? slamFit(inkWidth(lab), rw.labW, null, 1.1) : 1
    return { el, wash, cell, num, lab, lskel, sub, note, wtag, rskel, res, odo, txt, wtxt, strike, labFrom, rw }
  })

  // the check slot (dashed until its line lands)
  let chkEl = null
  if (chkBoard) {
    const c = P.chk
    const el = h('div', { class: 'dsl-row chk', 'data-band-unit': '', style: { top: c.y.toFixed(1) + 'px', height: c.h.toFixed(1) + 'px' } })
    const innerH = c.h - 2 * B
    const cell = h('div', { class: 'dsl-cell', style: { width: P.NW - B + 'px' } })
    const ic = Math.round(clamp(innerH * 0.6, 34, 56))
    const svg = s('svg', { viewBox: '0 0 48 48', width: ic, height: ic, 'data-deco': '' },
      s('path', { d: 'M9 25L20 36L39 13', fill: 'none', stroke: C.dim, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
    cell.append(svg)
    const lx = P.labelX - IX
    const txt = h('div', { class: 'dsl-chk', html: `<span>${richA(chkMarkup)}</span>`, style: { left: lx + 'px', top: Math.round((innerH - c.inner) / 2) + 'px', width: Math.floor(c.w) + 'px', fontSize: c.CS + 'px' } })
    const skel = h('div', { class: 'dsl-skel', 'data-deco': '', style: { left: lx + 'px', top: Math.round(innerH / 2 - c.CS * 0.13) + 'px', width: Math.round(c.w * 0.55) + 'px', height: Math.round(c.CS * 0.26) + 'px' } })
    el.append(cell, skel, txt)
    stage.append(el)
    chkEl = { el, cell, svg, path: svg.firstChild, txt, skel, from: slamFit(inkWidth(txt), c.w, null, 1.1) }
  }

  // pointer (decoration): a chevron in the left margin on the active slot
  const showPtr = lo.pointer !== false
  const ptr = showPtr ? s('svg', { class: 'dsl-ptr', 'data-deco': '', width: 34, height: 44, viewBox: '0 0 34 44', style: { left: SX - 50 + 'px', display: 'none' } },
    s('path', { d: 'M4 4L30 22L4 40Z', fill: C.white })) : null
  if (ptr) stage.append(ptr)
  const flash = stageFlash(stage, L)

  // ---------- the hero ----------
  let hero = null, tag = null
  const TAGGAP = 26
  if (heroMode !== 'none') {
    hero = heroRow(stage, L, { maxInt: 10, maxDp: 2 })
    if (heroMode === 'input') {
      const itpl = parseDisplay(input.value)
      sufStyle(hero.odo, itpl, L.hero.size)
      hero.show(input.value)
      const owFull = hero.odo.el.getBoundingClientRect().width
      const maxRow = L.hero.w / 1.1                     // the group at the read bump (1.06) plus air
      // the tag: label (white) over note (grey); the note goes first, then the tag, before the number drops under 75%
      let lines = lo.heroTag === false ? [] : [input.label, input.note].filter(x => x && String(x).trim())
      while (lines.length) {
        const el = h('div', { class: 'dsl-tag', html: lines.map((x, k) => `<span class="${k ? 'b' : 'a'}">${richUI(String(x))}</span>`).join('') })
        hero.el.append(el)
        style(el, { height: L.hero.h + 'px' })
        const w = Math.ceil(el.getBoundingClientRect().width)
        if (w <= 460 && w + TAGGAP + owFull * 0.75 <= maxRow) { tag = { el, w }; break }
        el.remove()
        lines = lines.slice(0, -1)
      }
      const room = maxRow - (tag ? tag.w + TAGGAP : 0)
      const ow = owFull
      if (ow > room) {
        const px = Math.floor(L.hero.size * Math.max(0.45, room / ow))
        style(hero.odo.el, { fontSize: px + 'px' })
        sufStyle(hero.odo, itpl, px)
      }
      if (tag) {
        style(hero.glow, { paddingLeft: tag.w + TAGGAP + 'px' })
        style(tag.el, { left: (L.hero.w / 2 - (hero.odo.el.getBoundingClientRect().width + tag.w + TAGGAP) / 2).toFixed(1) + 'px' })
      }
    } else {
      // result mode: the widest answer at the biggest landing bump fits the row
      let f = 1
      for (const r of R) for (const dsp of [r.disp, r.wrong && r.wrong.disp].filter(Boolean)) {
        if (!isNum(parseDisplay(dsp))) continue
        hero.show(dsp)
        const ow = hero.odo.el.getBoundingClientRect().width
        if (ow > L.hero.w / 1.16) f = Math.min(f, L.hero.w / 1.16 / ow)
      }
      if (f < 1) style(hero.odo.el, { fontSize: Math.floor(L.hero.size * Math.max(0.45, f)) + 'px' })
      style(hero.el, { opacity: '0' })
    }
  }
  // result mode: the template the hidden hero rests on (no state from another frame)
  const heroRest = (R.find(r => r.numeric) || {}).tpl || parseDisplay('0')
  // the hero "reads" on a cut whose working uses the input (the working takes your number)
  const reads = heroMode === 'input' ? [
    ...R.filter(r => r.cut > 0.05 && r.formula.includes(input.value)).map(r => r.cut),
    ...R.filter(r => r.wrong && r.wrong.t > 0.05 && r.wrong.formula.includes(input.value)).map(r => r.wrong.t),
  ] : []

  // ---------- the label stack: one group per beat ----------
  const groups = [], beats = []   // beats: { t, g }
  const working = (f, struck) => {
    if (!f) return ''
    const html = plainA(f)
    return struck ? `<span class="dsl-wl"><span class="dsl-wt">${html}</span><i class="dsl-wline" data-deco></i></span>` : html
  }
  const intro = lo.intro && (lo.intro.l1 || lo.intro.l2) ? groups.push({ l1: lo.intro.l1 ? richA(String(lo.intro.l1)) : '', l2: lo.intro.l2 ? richA(String(lo.intro.l2)) : '' }) - 1 : -1
  const l1Col = r => (r.tone === 'bad' ? C.red : C.green)
  R.forEach(r => {
    if (r.wrong) {
      r.wrong.g = groups.push({ l1: working(r.wrong.formula, Number.isFinite(r.wrong.strikeT)), l1Color: C.white, l2: richA(r.wrong.label ?? r.label) }) - 1
      beats.push({ t: r.wrong.t, g: r.wrong.g })
    }
    r.g = groups.push({ l1: working(r.formula), l1Color: l1Col(r), l2: richA(r.label) }) - 1
    beats.push({ t: r.cut, g: r.g })
    if (r.note && !noteSlot) {
      r.ng = groups.push({ l1: working(r.formula), l1Color: l1Col(r), l2: richA(r.note) }) - 1
      beats.push({ t: r.noteT, g: r.ng })
    }
  })
  if (chkText && !chkBoard) {
    const cg = groups.push({ l1: chkR ? plainA(chkL) : '', l1Color: C.green, l2: richA(chkR || chkText), l2Color: chkR ? C.green : C.white }) - 1
    beats.push({ t: checkT, g: cg })
  }
  beats.sort((a, b) => a.t - b.t)
  const labels = labelStack(stage, L, groups)
  R.forEach(r => {
    if (!r.wrong) return
    r.wrong.line = labels.groups[r.wrong.g].querySelector('.dsl-wline')
    r.wrong.txt = labels.groups[r.wrong.g].querySelector('.dsl-wt')
  })

  // ---------- sound: a thud per cut, a roll while a slot counts, a ding when it lands (the goal: riser, hit, cash) ----------
  R.forEach(r => {
    const w = r.wrong
    if (w) {
      if (w.t > 0.05) ctx.cue(w.t, 'thud', { gain: 0.65 })
      if (w.numeric && w.dur > 0.25) ctx.cue(Math.max(0, w.rs), 'roll', { dur: Math.max(0.25, w.land - Math.max(0, w.rs) - 0.05), gain: 0.55 })
      ctx.cue(w.land, 'pop', { gain: 0.45 })
      if (Number.isFinite(w.strikeT)) ctx.cue(w.strikeT, 'buzz', { gain: 0.5 })
    }
    if (r.cut > 0.05) ctx.cue(r.cut, 'thud', { gain: 0.65 })
    if (r.numeric && r.land - Math.max(0, r.rs) > 0.25) ctx.cue(Math.max(0, r.rs), 'roll', { dur: Math.max(0.25, r.land - Math.max(0, r.rs) - 0.05), gain: r.climax ? 0.7 : 0.6 })
    if (r.climax) {
      ctx.cue(Math.max(0, r.cut), 'riser', { dur: Math.max(0.5, r.land - Math.max(0, r.cut)), gain: 0.5 })
      ctx.cue(r.land, 'hit', { gain: 0.9 })
      ctx.cue(r.land + 0.06, 'cash', { gain: 0.65 })
    } else ctx.cue(r.land, 'ding', { gain: 0.5 })
    if (Number.isFinite(r.noteT)) ctx.cue(r.noteT, noteSlot ? 'tick' : 'thud', { gain: noteSlot ? 0.4 : 0.45 })
  })
  if (chkText && Number.isFinite(checkT)) ctx.cue(checkT, 'ding', { gain: 0.45 })

  // ---------- timeline helpers ----------
  const vT = spec.verdict && spec.verdict.text && spec.verdict.t != null ? Math.max(0, +spec.verdict.t) : null
  // the active slot: the last cut (a wrong guess, an item, or the check slot); the goal again from the verdict
  const cuts = []
  R.forEach((r, i) => { if (r.wrong) cuts.push({ t: r.wrong.t, row: i }); cuts.push({ t: r.cut, row: i }) })
  if (chkBoard) cuts.push({ t: checkT, row: 'chk' })
  if (vT != null && goalIdx >= 0) cuts.push({ t: vT, row: goalIdx, verdict: true })
  cuts.sort((a, b) => a.t - b.t)
  const cutAt = t => { let k = -1; for (let j = 0; j < cuts.length; j++) if (t >= cuts[j].t) k = j; return k }
  const rowCY = row => (row === 'chk' ? P.chk.y + P.chk.h / 2 : P.rows[row].y + P.rows[row].h / 2)

  /** what slot r's answer shows at t: { kind: 'none' | 'odo' | 'txt' | 'wtxt', v, tpl, ghost, color, strike, wrongPhase, landAt } */
  function answerAt(r, t) {
    const w = r.wrong
    if (w && t < r.cut) {
      if (w.numeric) {
        if (t < w.rs) return { kind: 'none' }
        const p = prog(t, w.rs, w.dur)
        const struck = Number.isFinite(w.strikeT) && t >= w.strikeT
        return { kind: 'odo', v: p >= 1 ? w.val : lerp(0, w.val, ease.out(p)), tpl: w.tpl, ghost: p < 1, color: struck ? C.red : C.white,
          strike: struck ? ease.out(prog(t, w.strikeT, 0.22)) : 0, dim: struck ? 0.55 : 1, wrongPhase: true }
      }
      if (t < w.land) return { kind: 'none' }
      const struck = Number.isFinite(w.strikeT) && t >= w.strikeT
      return { kind: 'wtxt', color: struck ? C.red : C.white, strike: struck ? ease.out(prog(t, w.strikeT, 0.22)) : 0,
        dim: struck ? 0.55 : 1, wrongPhase: true }
    }
    if (r.numeric) {
      if (t < r.rs) return { kind: 'none' }
      const p = prog(t, r.rs, r.dur)
      return { kind: 'odo', v: p >= 1 ? r.to : r.to * ease.out(p), tpl: r.tpl, ghost: p < 1, color: r.col, strike: 0 }
    }
    if (t < r.land) return { kind: 'none' }
    return { kind: 'txt', color: r.col, strike: 0 }
  }

  // ---------- duration ----------
  const lastBeat = Math.max(lastLand + (goalIdx >= 0 ? 0.5 : 0), ...R.filter(r => Number.isFinite(r.noteT)).map(r => r.noteT + 0.5), Number.isFinite(checkT) ? checkT + 0.8 : 0)
  const duration = durationOf(spec, lastBeat, d.hold ?? M.hold)

  return {
    duration,
    layout: L,
    seek(t) {
      const k = cutAt(t)
      const cur = k >= 0 ? cuts[k] : null
      const active = cur ? cur.row : -1

      // ---- slots ----
      R.forEach((r, i) => {
        const E = rowsEl[i]
        const reached = t >= r.cut0
        const isActive = active === i
        const a = answerAt(r, t)
        // lit state and tone
        let lit = 0, tone = r.col
        if (isActive) {
          lit = 1
          if (a.wrongPhase || (r.wrong && t < r.cut)) tone = a.color === C.red ? C.red : C.white
        } else if (reached && r.climax && t >= r.land) lit = 0.5
        style(E.el, litStyle(lit, tone))
        // a pop on each cut of this slot (and the verdict's return to the goal)
        let sc = 1
        for (const tc of [r.cut0, r.cut, ...(r.climax && vT != null ? [vT] : [])]) if (tc > 0.05) sc *= bump(t, tc, { amp: 0.025, dur: 0.3 })
        style(E.el, { transform: sc === 1 ? 'none' : `scale(${sc.toFixed(4)})` })
        // number cell: LED off (dim) → a solid lit block while active (the goal stays lit) → grey when done
        const cellOn = isActive || (r.climax && t >= r.land)
        style(E.cell, { background: cellOn ? tone : 'transparent', borderRightColor: cellOn ? tone : '#1E2530' })
        style(E.num, { color: cellOn ? C.panel : reached ? C.grey : C.dim })
        // the goal's neon wash
        if (r.climax) style(E.wash, { opacity: t >= r.land ? Math.min(1, 0.7 + 0.3 * flashAt(t, r.land, 0.9) + (vT != null ? 0.3 * flashAt(t, vT, 0.8) : 0)).toFixed(3) : '0' })
        // label
        // (every branch sets the same properties: a hidden element never keeps another frame's state)
        if (E.lab) {
          if (showLabelsAlways) {
            style(E.lab, { display: 'block', color: reached ? C.white : C.grey, opacity: '1', transform: 'none' })
            style(E.lskel, { display: 'none' })
          } else if (reached) {
            const k2 = slam(t, r.cut0, { from: E.labFrom })
            style(E.lab, { display: 'block', color: C.white, opacity: String(k2.o), transform: `scale(${k2.s.toFixed(4)})` })
            style(E.lskel, { display: 'none' })
          } else {
            style(E.lab, { display: 'none', color: C.white, opacity: '1', transform: 'none' })
            style(E.lskel, { display: 'block' })
          }
        }
        // sub-line: the struck wrong answer (from the item's cut), then the note (from noteT)
        if (E.sub) {
          const noteOn = t >= r.noteT
          const tagOn = !!E.wtag && t >= r.cut && !noteOn
          if (E.note) {
            const q = rise(t, r.noteT, { dur: 0.18, dist: 12 })
            style(E.note, { display: noteOn ? 'block' : 'none', opacity: String(q.o), transform: `translateY(${q.y.toFixed(1)}px)` })
          }
          if (E.wtag) {
            const q = rise(t, r.cut, { dur: 0.16, dist: 10 })
            style(E.wtag, { display: tagOn ? 'block' : 'none', opacity: String(q.o), transform: `translateY(${q.y.toFixed(1)}px)` })
          }
        }
        // the answer
        const showNum = a.kind !== 'none'
        style(E.rskel, { display: showNum ? 'none' : 'block' })
        if (E.odo) style(E.odo.el, { display: a.kind === 'odo' ? 'inline-flex' : 'none' })
        if (E.txt) style(E.txt, { display: a.kind === 'txt' ? 'block' : 'none', opacity: a.kind === 'txt' ? String(slam(t, r.land, { from: 1.12 }).o) : '1' })
        if (E.wtxt) style(E.wtxt, { display: a.kind === 'wtxt' ? 'block' : 'none', color: a.color || C.white, opacity: String(a.dim ?? 1) })
        if (E.odo) {
          // hidden, the odometer rests on 0 in the slot's template (no state from another frame)
          const on = a.kind === 'odo', tpl = on ? a.tpl : r.numeric ? r.tpl : r.wrong.tpl
          sufStyle(E.odo, tpl, E.rw.rs, P.sm)
          E.odo.set(on ? a.v : 0, tpl, on ? a.ghost : false)
          style(E.odo.el, { color: on ? a.color : r.col, opacity: String(on ? a.dim ?? 1 : 1) })
        }
        if (E.strike) {
          const on = a.strike > 0
          style(E.strike, { display: on ? 'block' : 'none', width: (r.wrong.w + 12).toFixed(1) + 'px', transform: `scaleX(${(a.strike || 0).toFixed(3)})` })
        }
        // landing bump + glow flare (the goal: bigger, and its glow stays lit)
        let rsc = 1, glow = 0
        if (r.wrong) { rsc *= bump(t, r.wrong.land, { amp: 0.06 }); if (t >= r.wrong.land && t < r.cut) glow = Math.max(glow, 0.4 * (1 - ease.out(prog(t, r.wrong.land, 0.5)))) }
        if (r.climax) {
          rsc *= bump(t, r.land, { amp: 0.16, dur: 0.5 })
          if (vT != null) rsc *= bump(t, vT, { amp: 0.06, dur: 0.4 })
          if (t >= r.land) glow = Math.max(glow, 0.42 + 0.58 * (1 - ease.out(prog(t, r.land, 1.2))), vT != null && t >= vT ? 0.42 + 0.4 * (1 - ease.out(prog(t, vT, 0.8))) : 0)
        } else {
          rsc *= bump(t, r.land, { amp: 0.1 })
          if (t >= r.land) glow = Math.max(glow, 0.75 * (1 - ease.out(prog(t, r.land, 0.6))))
        }
        style(E.res, { transform: rsc === 1 ? 'none' : `scale(${rsc.toFixed(4)})` })
        const gc = a.color || r.col
        style(E.res, { filter: glow > 0.01 && showNum ? `drop-shadow(0 0 ${(6 + 22 * glow).toFixed(1)}px ${rgba(gc === C.white ? C.white : gc, 0.25 + 0.5 * glow)})` : 'none' })
      })

      // ---- the check slot ----
      if (chkEl) {
        const on = t >= checkT
        const k2 = slam(t, checkT, { from: chkEl.from })
        style(chkEl.txt, { display: on ? 'block' : 'none', opacity: String(k2.o), transform: `scale(${k2.s.toFixed(4)})` })
        style(chkEl.skel, { display: on ? 'none' : 'block' })
        attr(chkEl.el, 'class', 'dsl-row chk' + (on ? ' on' : ''))
        const lit = on ? (active === 'chk' ? 1 - 0.55 * ease.out(prog(t, checkT + 0.5, 0.8)) : 0.3) : 0
        style(chkEl.el, { ...litStyle(lit, C.green), transform: on && checkT > 0.05 ? `scale(${bump(t, checkT, { amp: 0.025, dur: 0.3 }).toFixed(4)})` : 'none' })
        attr(chkEl.path, 'stroke', on ? C.green : C.dim)
        style(chkEl.svg, { transform: on ? `scale(${bump(t, checkT, { amp: 0.3, dur: 0.4 }).toFixed(3)})` : 'none' })
      }

      // ---- pointer ----
      if (ptr) {
        if (k < 0) { style(ptr, { display: 'none', top: '0px', transform: 'none' }); attr(ptr.firstChild, 'fill', C.white) }
        else {
          const prev = k > 0 ? cuts[k - 1].row : cur.row
          const mv = k > 0 ? ease.out(prog(t, cur.t, 0.2)) : 1
          const y = lerp(rowCY(prev), rowCY(cur.row), mv) - 22
          const col = cur.row === 'chk' ? C.green : (() => { const r = R[cur.row]; const a = answerAt(r, t); return a.wrongPhase || (r.wrong && t < r.cut) ? (a.color === C.red ? C.red : C.white) : r.col })()
          style(ptr, { display: 'block', top: y.toFixed(1) + 'px', transform: `scale(${(cur.t > 0.05 ? bump(t, cur.t, { amp: 0.3, dur: 0.4 }) : 1).toFixed(3)})` })
          attr(ptr.firstChild, 'fill', col)
        }
      }

      // ---- the hero ----
      if (hero) {
        let sc = 1, glow = 0
        if (heroMode === 'input') {
          for (const rt of reads) {
            sc *= bump(t, rt, { amp: 0.06, dur: M.bump })
            if (t >= rt) glow = Math.max(glow, 0.5 * (1 - ease.out(prog(t, rt, 0.6))))
          }
        } else {
          // result mode: the hero mirrors the active slot's answer (or the last one that landed)
          let src = -1
          if (typeof active === 'number' && active >= 0) src = active
          else for (let j = N - 1; j >= 0; j--) if (t >= R[j].cut0) { src = j; break }
          let a = src >= 0 ? answerAt(R[src], t) : { kind: 'none' }
          if (a.kind !== 'odo' && src > 0) { const b = answerAt(R[src - 1], t); if (b.kind === 'odo') a = b }
          const on = a.kind === 'odo', htpl = on ? a.tpl : heroRest
          style(hero.el, { opacity: on ? '1' : '0' })
          sufStyle(hero.odo, htpl, parseFloat(hero.odo.el.style.fontSize) || L.hero.size)
          hero.set(on ? a.v : 0, htpl, on ? a.ghost : false)
          style(hero.odo.el, { color: on ? a.color : C.green })
          R.forEach(r => {
            for (const tc of [r.cut0, r.cut]) if (tc > 0.05) sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, tc, 0.28))
            sc *= bump(t, r.land, { amp: r.climax ? 0.13 : 0.08, dur: r.climax ? 0.5 : M.bump })
            if (t >= r.land) glow = Math.max(glow, (r.climax ? 1 : 0.6) * (1 - ease.out(prog(t, r.land, r.climax ? 1.1 : 0.6))))
          })
        }
        style(hero.el, { transform: `scale(${sc.toFixed(4)})` })
        style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })
      }

      // ---- floor bloom: small on each landing, big for the goal ----
      let fl = 0
      R.forEach(r => { fl = Math.max(fl, (r.climax ? 0.7 : 0.18) * flashAt(t, r.land, r.climax ? 0.9 : 0.45)) })
      flash.set(fl)

      // ---- label stack ----
      let gi = intro, g0 = 0
      for (const b of beats) if (t >= b.t) { gi = b.g; g0 = b.t }
      labels.seek(t, gi, g0)
      // the wrong working is struck with its answer
      R.forEach(r => {
        if (!r.wrong || !r.wrong.line) return
        const q = Number.isFinite(r.wrong.strikeT) ? ease.out(prog(t, r.wrong.strikeT, 0.22)) : 0
        style(r.wrong.line, { transform: `scaleX(${q.toFixed(3)})` })
        style(r.wrong.txt, { opacity: t >= r.wrong.strikeT ? '0.5' : '1' })
      })
    },
  }
}
