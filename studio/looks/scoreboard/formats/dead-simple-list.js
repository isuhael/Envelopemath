// Scoreboard: dead-simple-list — "N dead simple numbers" (P1), Master Money's numbered list as a live scoreboard.
//
// One example number (data.input) is the score in the top bar: the hero odometer holds it from frame 1, tagged with
// what it is ("YOUR PAYCHECK / EVERY 2 WEEKS"), so the biggest number on the thumbnail is the viewer's own. The stage
// holds a numbered slot per item, all on the board from frame 1 and empty: a dark number cell (LED off), a skeleton
// where the label goes and a skeleton where the answer will roll. The viewer counts the numbers ahead.
// Each item is a hard cut:
//   1. cut (thud): the slot lights in the item's tone (border glow, its number cell a solid lit block, a pointer in
//      the left margin jumps to it), its label slams into the slot and its working slams into the slot's answer area
//      ("$2,500 × 26": the first operand in the tone colour, the rest grey; Anton at the row's answer size, fitted to
//      the room right of the label, >= 44 px; a working that can't fit shows its first operand alone). The label
//      stack slams the same working as its big line (the lit slot already names the item). When the working uses
//      the input, the hero bumps and flares (the working takes your number).
//   2. swap + roll: the working hard-cuts to the slot's odometer (a small pop), which rolls from the working's first
//      operand when that reads exactly like the answer would ($2,500 → $65,000; $65,000 → $5,000, rolling down), else
//      from 0, and ends exactly at resultT. The working holds typeDur, longer when the roll needs less time, shorter
//      (down to 0.4 s; the goal 0.5 s) so the roll keeps >= 0.8 s. Rolls take 0.8-1.9 s by jump size, the "≈" an
//      unlit ghost while it runs; a count within one unit of its answer shows the answer (no "$0,000" mid-carry).
//   3. land (ding): it lands exactly on the item's `result`: bump, glow flare, a floor bloom. A word answer ("Never")
//      slams in at resultT in the working's place.
//   4. note (tick): the item's note rises into the slot's sub-line at noteT (default 0.35 s after the landing) and
//      stays; until then the label sits centred in its row, and it steps up to make room just before. The
//      finished board is a cheat sheet of N answers with their working notes. (No room for sub-lines: at noteT the
//      label stack hard-cuts (thud) to the working (line 1) over the note instead; see Layout.)
// The goal (the first item with tone "goal", else the last item) is the climax: a taller slot, its answer about
// 1.3x bigger, a riser from its cut, a roll of >= 2.4 s when the timing allows, a landing with hit + cash, a big floor
// bloom, a neon green wash and a glow that stays lit. The previous slots settle (no glow): one focal number at a time.
// From the goal's landing the input hero steps back (white, 75% opacity, no glow, over 0.3 s), so the goal slot is
// the one lit green number. Then the payoff lands last in the hero (heroFinal, on by default): at verdict.t (no
// verdict: after the last beat) the hero hard-cuts to the goal's label as its tag (Inter 700 caps 42 px: one line,
// else two or three balanced lines as the row allows, <= 620 px and leaving the number >= 80% of its size; no tag
// fits: no payoff roll, console warning) and rolls to the goal's result (from the input when it reads like the
// answer, else from 0), green again, landing with a bump, a glow flare and a ding; it holds >= 1.8 s. The goal slot
// keeps its glow but does not flare again (the hero is the focal number). A word goal ("Never") has no payoff roll.
// Wrong guess (lookOpts.wrongGuess, or data.wrongGuess): before its item, the slot lights white, its naive working
// slams into the slot and the label stack (struck later), swaps to the odometer and rolls to the wrong answer, which
// lands (pop). At strikeT a coral line strikes it (and the working in the label stack), and it dims to coral (buzz).
// At the item's own cut the struck number moves into the slot's sub-line as a small coral struck tag (when the board
// has sub-lines), the real working slams into the answer area, and the real answer rolls like any other. The item's
// note, when it comes, replaces the struck tag.
// Check (data.check at checkT): a dashed check slot under the list (a ✓ cell, empty until then) slams the check line
// in ("10 × 2 + 2 × 3 = 26 PAYDAYS", the part after its last "=" in green, on one or two lines), the ✓ lights green,
// ding. When the board has no room for that slot, the label stack carries it instead: line 1 the sum (one line at the
// label stack's l1 size, else down to 40 px, else two balanced lines broken at the " + " nearest the middle), line 2
// "= 26 PAYDAYS" in green; a sum too long even for that becomes "Σ = …" (console warning). A sum that can't go on
// one line in the label stack weighs more in the layout solver: the board gives up notes-in-slot or padding first.
// Verdict: the chrome's (the kit's one verdict slot, the label slot at the foot of the frame; the label stack yields
// to it). At verdict.t the pointer returns to the goal slot (and, with heroFinal off, it flares again).
// Frame 1: the header, the hero (the input), the footer, the numbered slots. Item 1's t defaults to 0, and an item 1
// at t <= 0.3 is already cut at frame 1: its slot lit, its label and working in the slot and in the label stack (the
// research's "slot 1 already typing"); with typeDur 0 (no working in the slot) frame 1 is 0.35 s into its roll.
// Without data.input there is no hero row (the board takes the room); a late item 1 (t > 0.3) then leaves frame 1
// without a figure, and the kit warns in the console.
//
// Layout (measured with the real fonts, the richest that fits wins): slots span x 140-940; a number cell on the
// left, the label after it (Anton caps, one size for the board, 56 → 40 px, one line or two balanced lines), the
// answer right-aligned at x 918 (Anton odometer, 92 → 48 px; the goal ~1.3x, up to 118). Three row shapes:
//   side    the answer is centred on the row; the label and its sub-line (note / struck guess) stack on its left
//   under   the answer sits on the label's line; the sub-line runs under both (long notes)
//   stack   per row, when a wide answer ("≈ $2,184,480/TOTAL") leaves its label a column under 300 px that it would
//           wrap in: the label takes the full width on top, the answer its own line under it, right-aligned (its
//           note beside it on that line when it fits, else under it)
// Notes (Inter 600 40 px, grey, one line or two) go in the slot's sub-line when the board has room for them; else
// at noteT the label stack cuts to the item's working over its note (the lit slot names the item). The check slot
// goes on the board when it fits after that, else into the label stack. The answer column also holds a roll's start
// when that is wider than its answer ($65,000 rolling down to $5,000); when that costs the board its labels, those
// rolls start from 0 instead. A list too long for the top bar (e.g. 6 items with long labels, a 2-line header and a
// 2-line footer) first gets a compact hero (0.65x the row and number, the input's tag on one line, tighter slot
// padding allowed), and only then gives up the hero row (console warning) before its slots lose their labels
// (unless lookOpts.hero is set). Last resort: slots without labels (the label stack then names each item: line 1 the
// working, line 2 the label). Spare room grows the slot padding and gaps (capped), then centres the board in the
// stage. A word or unit
// after the answer's number ("2 a year", "$36/hr") is set small (>= 42 px) on the number's baseline, so the number
// carries the size.
//
// data (FORMATS.md §1): { input: { label, value, note }, typeDur = 0.6, items: [{ t, label, formula, result, tone,
//   note, resultT, noteT }], check, checkT, hold }
//   t: the cut (default 0 for item 1, then 1.6 s after the previous landing); resultT: the landing (default t +
//   typeDur + the roll's length, 0.8-1.9 s by jump size, the goal 2.4 s; a word answer t + typeDur + 0.3); noteT:
//   when the note shows (never before the landing). check / checkT: the check line and when it lands (default 1.2 s
//   after the last landing).
// lookOpts (all optional):
//   hero        'input' | false             the top-bar odometer: the input (default when data.input has a number),
//                                          or no hero row (the stage starts under the footer; the default without
//                                          an input). ('result', the old mirror of each slot's answer, is retired:
//                                          it showed the rolling number twice; it now means the default.)
//   heroTag     true | false                the input's label and note beside the hero (default true)
//   heroFinal   true | false | { t, display, tag }   the payoff lands last in the hero (default true): at t (default
//                                          verdict.t, else after the last beat) the hero rolls to `display` (default
//                                          the goal's result) under `tag` (default the goal's label; '' for none).
//                                          false keeps the input up to the last frame (the research's "the input is
//                                          the biggest number" variant; it still steps back at the goal's landing)
//   slotFormula true | false                the working shows in the slot's answer area before its roll (default
//                                          true; false, or typeDur 0: the roll starts at the cut, the working only
//                                          in the label stack)
//   labels      'reveal' | 'always' | 'none'   slot labels appear at their cut (default), or show grey from frame 1
//                                          and light up at their cut (the open-loop variant), or never (number +
//                                          answer only; the label stack names each item)
//   notes       'auto' | 'slot' | 'label' | false   where notes go (default: the slot when the board fits it)
//   checkRow    'auto' | 'board' | 'label'  where the check goes (default: the board when it fits)
//   check, checkT                          same as data.check / data.checkT (check may be { t, text })
//   wrongGuess  { item, t, formula, result, resultT, strike = true, strikeT, label } or a list of them: a wrong answer
//               lands in item's slot first (resultT, default t + typeDur + its roll, before the item's cut) and is
//               struck out at strikeT (default 0.5 s after it lands, or 0.45 s before the item's cut); strike: false
//               only replaces it; label: a line over its working in the label stack
//   goal        item index | false          the climax item (default: the first tone "goal", else the last)
//   intro       { l1, l2 }                  the label stack before the first cut (default: empty)
//   layout      'side' | 'under'            force a row shape (the stack shape still applies per row)
//   pointer     true | false                the pointer in the left margin (default true)
//   startNum    1                           the number on the first slot
//   stageBottom y                           move the stage / label split (kit-wide)
//   footerSteps [{ t, text }]               kit-wide (the chrome draws it)
import { h, s, css as style, attr, prog, ease, clamp, lerp } from '../../../runtime/core.js'
import { C, M, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, bare, inkWidth, slamFit, heroRow, labelStack, odometer, stageFlash, flashAt,
  parseDisplay, formatLike, bump, slam, rise, durationOf, toneColor,
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
/* the working in the slot's answer area (one inner span: never rich HTML straight into a flex box) */
.dsl-frm { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; white-space: nowrap;
  font: 400 60px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; text-transform: uppercase; transform-origin: 100% 50%; }
.dsl-frm .fi { display: inline-block; line-height: 1; }
.dsl-frm .op { color: #9AA4B2; }
.dsl-strike { position: absolute; right: -6px; border-radius: 4px; background: #FF4D5E; box-shadow: 0 0 14px rgba(255, 77, 94, 0.75);
  transform-origin: 0 50%; }
.dsl-chk { position: absolute; left: 0; top: 0; font: 400 48px/1.04 'Anton', 'Inter Full', sans-serif; text-transform: uppercase;
  letter-spacing: 0.01em; color: #FFFFFF; white-space: normal; text-wrap: balance; transform-origin: 0 50%; }
.dsl-chk em { font-style: normal; color: #2BFF88; }
.dsl-ptr { position: absolute; }
/* slamming / bumping text: its glyph patches keep >= 40 px at the undershoot (the kit's floor is 40 at rest) */
.dsl-lab .ax, .dsl-lab .axo, .dsl-chk .ax, .dsl-chk .axo, .dsl-res .ax, .dsl-res .axo, .dsl-frm .ax, .dsl-frm .axo { font-size: max(0.86em, min(1em, 42px)); }
.dsl-tag { position: absolute; top: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; gap: 2px;
  text-align: right; white-space: nowrap; font: 700 42px/1.08 'Inter', 'Inter Full', sans-serif; text-transform: uppercase;
  letter-spacing: 0.04em; }
.dsl-tag > span { display: block; }
.dsl-tag.tight { line-height: 45px; gap: 0px; }   /* Inter's 1.21em text boxes overlap by < 6 px at this pitch */
.dsl-tag .a { color: #FFFFFF; }
.dsl-tag .b { color: #9AA4B2; }
/* label stack: the working's operator part grey, a struck wrong working, a check sum on its own size / two lines */
.sb-labels .dsl-op { color: #9AA4B2; }
.sb-labels .dsl-wl { position: relative; display: inline-block; }
.sb-labels .dsl-wline { position: absolute; left: -6px; right: -6px; top: 44%; height: max(6px, 0.08em); border-radius: 4px; background: #FF4D5E;
  box-shadow: 0 0 12px rgba(255, 77, 94, 0.7); transform-origin: 0 50%; transform: scaleX(0); }
.sb-labels .dsl-chk1 { display: block; line-height: 1.06; text-align: center; white-space: nowrap; }
`

// ---------- geometry (frame px) ----------
const SX = 140, SW = 800, B = 3        // slot boxes x 140-940, border
const RX = 918                         // answers end here: inside the slot, clear of the right rail (x 940)
const SUB_LH = 44                      // sub-line: Inter 600 40 / 44
const LAB_LH = 1.02                    // slot label line height (em)
const CHK_LH = 1.04
const CUT = 0.18                       // a cut's slam lands before its roll starts (no working in the slot)
const PRE = 0.35                       // frame 1 is this far into the first roll (typeDur 0, first item at t <= 0.3)
const ROLL0_MAX = 3.2                  // the frame-1 roll may stretch to this, so it lands on its resultT
const MARGIN = 16                      // board inset from the stage edges
const RS_STEPS = [92, 84, 76, 70, 64, 58, 52, 48]
const LS_STEPS = [56, 52, 48, 46, 44, 42, 40]        // labels under 42 px enter without the slam's scale (its ~2% undershoot)
const PAD_STEPS = [[14, 14], [10, 10], [8, 8]]
const PAD_TIGHT = [[6, 6], [4, 4]]                   // a dense board keeps its (compact) hero before its slots get roomy
const STACK_W = 300                    // a label column narrower than this (that the label wraps in): the stack shape
const STACK_GAP = 6                    // stack shape: label → answer line
const FRM_MIN = 44                     // the working in the slot never sets under this (its slam undershoot stays >= 42)
const TAGGAP = 26, TAGMAX = 460        // hero tags: gap to the number, widest tag
const HERO_K = 0.65                    // the compact hero (a dense board): 0.65x the hero row and its number

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

// the working splits at its first operator: its first operand ("$2,500"), then the rest (" × 26", set grey)
const OP_RE = /\s*[×÷+−=*]|\s+[-/]\s/
function splitWorking(f) {
  const m = OP_RE.exec(f)
  if (!m || !f.slice(0, m.index).trim()) return { a: f.trim(), b: '' }
  return { a: f.slice(0, m.index).trim(), b: f.slice(m.index) }
}
// the first operand is where a roll starts when it reads exactly like the answer would at that value ("$2,500" for
// "$65,000", "$20" for "≈ $2,579"); else null (the roll starts at 0)
const normD = str => String(str).replace(/≈/g, '').replace(/\s+/g, '').toLowerCase()
function fromOf(a, tpl) {
  if (!a || !isNum(tpl)) return null
  const p = parseDisplay(a)
  if (!isNum(p) || p.scale !== tpl.scale) return null
  const v = p.value * p.scale
  return normD(formatLike(v, tpl)) === normD(a) ? v : null
}
// a running count within one unit of its last digit shows the landed value (no "$0,000" while the carry runs)
const snapTo = (v, to, tpl) => (Math.abs(to - v) < Math.pow(10, -Math.min(tpl.dp, 2)) * tpl.scale ? to : v)

export default function deadSimpleList(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const items = (Array.isArray(d.items) ? d.items : []).filter(it => it && it.result != null)
  if (!items.length) throw new Error('dead-simple-list: data.items is empty')
  const N = items.length
  const typeDur = Number.isFinite(+d.typeDur) ? Math.max(0, +d.typeDur) : 0.6
  const slotFrm = lo.slotFormula !== false && typeDur > 0
  const goalIdx = lo.goal === false ? -1 : Number.isInteger(lo.goal) && lo.goal >= 0 && lo.goal < N ? lo.goal
    : items.findIndex(it => it.tone === 'goal') >= 0 ? items.findIndex(it => it.tone === 'goal') : N - 1

  // ---------- the hero: the input (the viewer's number), or none ----------
  const input = d.input && d.input.value != null && isNum(parseDisplay(String(d.input.value))) ? { label: '', note: '', ...d.input, value: String(d.input.value) } : null
  if (lo.hero === 'result') console.warn("scoreboard dead-simple-list: lookOpts.hero 'result' is retired (it showed each rolling answer twice); the hero holds the input, or there is no hero row")
  let heroMode = lo.hero === false || lo.hero === 'none' ? 'none' : input ? 'input' : 'none'
  const layoutOf = withHero => layoutFor(spec, { hero: withHero, ...(lo.stageBottom ? { stageBottom: +lo.stageBottom } : {}) })
  let L = layoutOf(heroMode !== 'none')
  let heroCompact = false
  // the compact hero: the hero row and its number at 0.65x, the footer and the stage moved up by what it frees
  const compactOf = LL => {
    const hh = Math.round(LL.hero.h * HERO_K), dy = LL.hero.h - hh
    return {
      ...LL,
      hero: { ...LL.hero, h: hh, size: Math.round(LL.hero.size * HERO_K), icon: Math.round(LL.hero.icon * HERO_K) },
      footer: { ...LL.footer, y: LL.footer.y - dy },
      topBar: { ...LL.topBar, y1: LL.topBar.y1 - dy },
      stage: { ...LL.stage, y: LL.stage.y - dy, h: LL.stage.h + dy },
      inner: { ...LL.inner, y: LL.inner.y - dy, h: LL.inner.h + dy },
    }
  }

  // ---------- the working, the answers, and where each roll starts ----------
  const work = items.map(it => splitWorking(String(it.formula || '')))
  const tpls = items.map(it => parseDisplay(String(it.result)))
  const froms = items.map((it, i) => (isNum(tpls[i]) ? fromOf(work[i].a, tpls[i]) ?? 0 : 0))
  const rollWant = (from, to, big) => {
    const r = clamp(0.5 + 0.34 * Math.log10(Math.abs(to - from) + 1), M.rollMin, M.rollMax)
    return big ? Math.max(r, M.rollFinal) : r
  }
  // a phase (an item, or a wrong guess): the working holds in the slot from its cut, then the roll runs to its landing
  function sched(ph) {
    if (!ph.numeric) { ph.rs = ph.land; ph.dur = 0; return ph }
    const win = ph.land - ph.cut, want = rollWant(ph.from, ph.to, ph.big)
    if (ph.frm) {
      const holdMin = ph.big ? Math.min(typeDur, 0.5) : Math.min(typeDur, Math.max(0.4, win - M.rollMin))
      ph.rs = ph.cut + clamp(Math.max(holdMin, win - want), 0, Math.max(0, win - 0.3))
    } else {
      ph.rs = ph.land - Math.max(0.3, Math.min(want, ph.land - ph.cut - CUT))
      // frame 1 is already into the first roll (the thumbnail moves); the roll stretches to land on its resultT
      if (ph.first && ph.rs > -PRE && ph.land + PRE <= ROLL0_MAX) ph.rs = -PRE
    }
    ph.dur = ph.land - ph.rs
    return ph
  }

  // ---------- timing ----------
  const wgRaw = lo.wrongGuess ?? d.wrongGuess
  const wgList = (Array.isArray(wgRaw) ? wgRaw : wgRaw ? [wgRaw] : []).filter(w => w && typeof w === 'object')
  const wg0 = wgList.some(w => +w.item === 0 && w.result != null && w.t != null)
  const T = []
  items.forEach((it, i) => {
    const prev = T[i - 1]
    let t = it.t != null ? +it.t : prev ? prev.land + 1.6 : 0
    if (prev) t = Math.max(t, prev.cut + 0.3)
    if (i === 0 && !wg0 && t <= 0.3) t = 0           // frame 1 is already on item 1 (see the header)
    const frm = slotFrm && !!String(it.formula || '').trim()
    let land = it.resultT != null ? +it.resultT
      : t + (frm ? typeDur : CUT) + (isNum(tpls[i]) ? rollWant(froms[i], tpls[i].value * tpls[i].scale, i === goalIdx) : 0.3)
    land = Math.max(land, t + 0.45)
    T.push({ cut: t, land, frm })
  })

  // wrong guesses: a wrong answer lands in the slot first and is struck out before the real working
  const wrongOf = new Array(N).fill(null)
  for (const w of wgList) {
    const i = +w.item
    if (!Number.isInteger(i) || i < 0 || i >= N || wrongOf[i] || w.result == null || w.t == null) continue
    let t0 = +w.t
    if (i === 0 && t0 <= 0.3) t0 = 0
    if (!(t0 < T[i].cut - 0.3) || (i > 0 && t0 < T[i - 1].cut + 0.3)) {
      console.warn(`scoreboard dead-simple-list: wrongGuess for item ${i} at ${t0} s is skipped (it must start after the previous item's cut and >= 0.3 s before its own)`)
      continue
    }
    const formula = String(w.formula || ''), wk = splitWorking(formula)
    const wtpl = parseDisplay(String(w.result)), wn = isNum(wtpl), wv = wn ? wtpl.value * wtpl.scale : 0
    const wfrom = wn ? fromOf(wk.a, wtpl) ?? 0 : 0
    const frm = slotFrm && !!formula.trim()
    let land = w.resultT != null ? +w.resultT : t0 + (frm ? typeDur : CUT) + (wn ? rollWant(wfrom, wv, false) : 0.3)
    land = clamp(land, t0 + 0.3, T[i].cut - 0.2)
    let strikeT = w.strike === false ? Infinity : w.strikeT != null ? +w.strikeT : Math.max(land + 0.5, T[i].cut - 0.45)
    if (Number.isFinite(strikeT)) strikeT = clamp(strikeT, land + 0.1, T[i].cut - 0.05)
    wrongOf[i] = sched({
      t: t0, cut: t0, land, strikeT, formula, work: wk, disp: String(w.result), tpl: wtpl, numeric: wn, val: wv, to: wv,
      from: wfrom, big: false, frm, first: i === 0 && t0 === 0, label: w.label != null ? String(w.label) : null,
      fromDisp: wn && wfrom > wv ? formatLike(wfrom, wtpl) : '',
    })
  }

  const R = items.map((it, i) => {
    const tone = it.tone || 'neutral'
    const climax = i === goalIdx
    const col = climax ? (tone === 'bad' ? C.red : C.green) : toneColor(tone)
    const disp = String(it.result)
    const tpl = tpls[i], numeric = isNum(tpl)
    const to = numeric ? tpl.value * tpl.scale : 0
    const wrong = wrongOf[i]
    const { cut, land, frm } = T[i]
    const ph = sched({ cut, land, numeric, from: froms[i], to, big: climax, frm, first: i === 0 && !wrong && cut === 0 })
    const noteT = it.note ? Math.max(land + 0.15, it.noteT != null ? +it.noteT : land + 0.35) : Infinity
    return {
      i, it, tone, climax, col, disp, tpl, numeric, to, from: froms[i], cut, land, rs: ph.rs, dur: ph.dur, frm, wrong, noteT,
      cut0: wrong ? wrong.t : cut, label: String(it.label ?? ''), note: it.note ? String(it.note) : '',
      formula: String(it.formula || ''), work: work[i], wrongTag: !!wrong && Number.isFinite(wrong.strikeT),
      fromDisp: numeric && froms[i] > to ? formatLike(froms[i], tpl) : '',
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

  // ---------- the check in the label stack (when the board has no room for its slot) ----------
  // line 1 the sum: one line at the l1 size, else down to 40 px, else two balanced lines (broken at the " + " nearest
  // the middle, the "+" leading line 2); line 2 the tie-back ("= $6,000"); last resort "Σ = $6,000"
  let chkStack = null
  if (chkText) {
    const maxW = L.label.w - 24
    const wAt = (str, px) => widthOf(plainA(str), 'sb-l1', px)
    const sized = (px, lines) => `<span class="dsl-chk1" style="font-size:${px}px">${lines.map(plainA).join('<br>')}</span>`
    if (!chkR) chkStack = { l1: '', l2: richA(chkText), l2Color: C.white, hard: false }
    else {
      let l1 = null, hard = true
      if (wAt(chkL, L.type.l1) <= maxW) { l1 = plainA(chkL); hard = false }
      for (let px = L.type.l1 - 2; !l1 && px >= 40; px -= 2) if (wAt(chkL, px) <= maxW) l1 = sized(px, [chkL])
      if (!l1) {
        const terms = chkL.split(' + ')
        let split = null
        for (let k = 1; k < terms.length; k++) {
          const a = terms.slice(0, k).join(' + '), b = '+ ' + terms.slice(k).join(' + ')
          const ww = Math.max(wAt(a, 40), wAt(b, 40))
          if (!split || ww < split.ww) split = { a, b, ww }
        }
        const pxMax = Math.floor((L.label.h - 6 - L.type.l2Min) / (2 * 1.06))
        for (let px = Math.min(L.type.l1, pxMax); split && !l1 && px >= 40; px -= 2) {
          if (Math.max(wAt(split.a, px), wAt(split.b, px)) <= maxW) l1 = sized(px, [split.a, split.b])
        }
      }
      if (l1) chkStack = { l1, l2: richA(chkR), l2Color: C.green, hard }
      else {
        console.warn('scoreboard dead-simple-list: the check line is too long for the label stack; it shows as "Σ ' + chkR + '" (shorten data.check, or give the board room for its check slot)')
        chkStack = { l1: '', l2: richA('Σ ' + chkR), l2Color: C.green, hard: true }
      }
    }
  }

  // ---------- the layout solver (see the header): the richest board that fits the stage ----------
  const notesWanted = R.some(r => r.note) && lo.notes !== false
  const anyWrongTag = R.some(r => r.wrongTag)
  const labelsShown = lo.labels !== 'none'
  function evaluate(cfg, avail) {
    const { mode, LS, RS, noteSlot, chkBoard, pad, gap, bareRows } = cfg
    const GS = goalIdx >= 0 ? Math.min(Math.round(RS * 1.3), 118) : RS
    const NW = clamp(Math.round(RS * 0.9 + 8), 66, 92)
    const labelX = SX + NW + 20
    const fullW = RX - labelX
    const sm = smallOn(RS)
    const rows = []
    let total = 0, stacked = 0
    for (const r of R) {
      const rs = r.climax ? GS : RS
      const resW = Math.max(resWidth(r.disp, rs, sm), r.wrong ? resWidth(r.wrong.disp, rs, sm) : 0, rs * 1.2,
        useFrom && r.fromDisp ? resWidth(r.fromDisp, rs, sm) : 0, useFrom && r.wrong && r.wrong.fromDisp ? resWidth(r.wrong.fromDisp, rs, sm) : 0)
      if (resW > fullW) return null
      let shape = mode
      let labW = RX - resW - (26 + (r.climax ? 0.17 : 0.1) * resW) - labelX
      let labLines = 0
      if (!bareRows) {
        const lines = w => (r.label ? linesOf(labHTML(r.label), 'dsl-lab', LS, w, LS * LAB_LH) : 0)
        labLines = labW >= 150 ? lines(labW) : Infinity
        // a wide answer leaves the label a narrow column: the label takes the full width, the answer its own line
        if (labW < STACK_W && labLines > 1) { shape = 'stack'; labW = fullW; labLines = lines(labW); stacked++ }
        if (labLines > 2) return null
      }
      const labH = labLines * LS * LAB_LH
      const hasSub = !bareRows && noteSlot && (!!r.note || r.wrongTag)
      let subW = shape === 'side' ? labW : fullW, subLines = 0, beside = false
      const wtagW = r.wrongTag ? widthOf(ax(esc(r.wrong.disp)), 'dsl-wtag', 44) + 12 : 0
      if (hasSub) {
        if (shape === 'stack') {
          const bw = fullW - resW - 28
          const n = r.note ? linesOf(subHTML(r.note), 'dsl-sub', 40, bw, SUB_LH) : 1
          if (bw >= 220 && n <= Math.max(1, Math.floor((rs + 8) / SUB_LH)) && wtagW <= bw) { beside = true; subW = bw }
        }
        subLines = r.note ? linesOf(subHTML(r.note), 'dsl-sub', 40, subW, SUB_LH) : 1
        if (subLines > 2) return null
        if (wtagW > subW) return null
      }
      const subH = hasSub ? 4 + subLines * SUB_LH : 0
      let main, inner
      if (shape === 'side') { main = Math.max(rs, labH + subH); inner = main }
      else if (shape === 'under') { main = Math.max(rs, labH); inner = main + subH }
      else { main = beside ? Math.max(rs, subLines * SUB_LH) : rs; inner = labH + (labH ? STACK_GAP : 0) + main + (beside ? 0 : subH) }
      const hh = inner + 2 * pad + 2 * B
      rows.push({ rs, resW, shape, labW, labLines, labH, hasSub, subW, subLines, subH, beside, main, inner, h: hh })
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
    // a label that fits one line at a slightly smaller size reads better than a bigger one broken in two; a check that
    // can't sit on one line in the label stack keeps its slot on the board before the notes keep theirs
    const wrapped = rows.filter(rw => rw.labLines > 1).length
    const score = RS * 3 + (bareRows ? -2000 : LS * 2) + (noteSlot || !notesWanted ? 120 : 0) + (noteSlot && anyWrongTag ? 40 : 0)
      + (chkBoard || !chkText ? (chkStack && chkStack.hard ? 260 : 90) : 0) + pad + gap * 0.5 + (mode === 'side' ? 2 : 0) - 14 * wrapped - 12 * stacked
    return { ...cfg, GS, NW, labelX, sm, rows, chk, total, score }
  }
  const modes = lo.layout === 'under' ? ['under'] : lo.layout === 'side' ? ['side'] : ['side', 'under']
  const noteOpts = !notesWanted && !anyWrongTag ? [false] : lo.notes === 'label' ? [false] : lo.notes === 'slot' ? [true] : [true, false]
  const chkOpts = !chkText ? [false] : lo.checkRow === 'label' ? [false] : lo.checkRow === 'board' ? [true] : [true, false]
  function solve(LL, pads = PAD_STEPS) {
    const avail = LL.stage.h - 2 * MARGIN
    let best = null
    for (const bareRows of labelsShown ? [false] : [true]) for (const mode of modes) for (const LS of LS_STEPS) for (const RS of RS_STEPS) {
      if (RS < LS) continue
      for (const noteSlot of noteOpts) for (const chkBoard of chkOpts) for (const [pad, gap] of pads) {
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
  // a roll that starts from a bigger first operand ($6,000 → $900) needs the answer column to hold that operand:
  // when that costs the board its labels, those rolls start from 0 instead (before the hero gives anything up)
  let useFrom = true
  const anyFromDisp = R.some(r => r.fromDisp || (r.wrong && r.wrong.fromDisp))
  const fits = b => b && !b.bareRows
  const solveFrom = (LL, pads) => {
    useFrom = true
    const b = solve(LL, pads)
    if (fits(b) || !anyFromDisp || !labelsShown) return b
    useFrom = false
    const b2 = solve(LL, pads)
    if (fits(b2)) return b2
    useFrom = true
    return b
  }
  let best = solveFrom(L)
  // a list too long for the top bar: before its slots lose their labels, the hero shrinks to the compact row, then
  // gives its row to the board (the header and the workings still show the input), unless lookOpts.hero asks for it
  if (heroMode !== 'none' && lo.hero == null && labelsShown && !fits(best)) {
    const Lc = compactOf(L), bc = solveFrom(Lc, [...PAD_STEPS, ...PAD_TIGHT])
    if (fits(bc)) { best = bc; L = Lc; heroCompact = true }
    else {
      const L2 = layoutOf(false), b2 = solveFrom(L2)
      if (fits(b2)) {
        best = b2; L = L2; heroMode = 'none'
        console.warn('scoreboard dead-simple-list: the board needs the hero row, so the input is not in the top bar (shorten the header or the footer, or use fewer items)')
      }
    }
  }
  // the rolls the column can't hold start from 0 (and their slots show the whole working, never the operand alone)
  if (!useFrom) R.forEach(r => { if (r.fromDisp) { r.from = 0; r.fromDisp = '' } if (r.wrong && r.wrong.fromDisp) { r.wrong.from = 0; r.wrong.fromDisp = '' } })
  if (heroMode === 'none' && R[0].cut0 > 0.3) console.warn(`scoreboard dead-simple-list: no hero row and item 1 starts at ${R[0].cut0} s: frame 1 shows no figure (give data.input, or start item 1 at t <= 0.3)`)
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
  const resRight = SX + SW - B - RX
  const rowsEl = R.map((r, i) => {
    const rw = P.rows[i]
    const el = h('div', { class: 'dsl-row', 'data-band-unit': '', style: { top: rw.y.toFixed(1) + 'px', height: rw.h.toFixed(1) + 'px' } })
    if (i === 0) attr(el, 'data-solver', `${P.mode} RS${P.RS} LS${P.LS} pad${P.pad.toFixed(0)} gap${P.gap.toFixed(0)} notes:${noteSlot ? 'slot' : 'label'} check:${chkBoard ? 'board' : chkText ? 'label' : '-'} hero:${heroMode}${heroCompact ? ' compact' : ''} shapes:${P.rows.map(x => ({ side: 'S', under: 'U', stack: 'K' })[x.shape]).join('')}${bareRows ? ' bare' : ''}${useFrom ? '' : ' from0'}`)
    const innerH = rw.h - 2 * B
    const wash = h('div', { class: 'dsl-wash', 'data-deco': '' })
    const cell = h('div', { class: 'dsl-cell', style: { width: P.NW - B + 'px' } })
    const num = h('div', { class: 'dsl-num', style: { fontSize: NS + 'px' } }, String(startNum + i))
    cell.append(num)
    el.append(wash, cell)
    stage.append(el)
    // where things sit inside the row once its sub-line has content (side: answer centred, label + sub stacked on its
    // left; under: answer on the label's line, sub-line under both; stack: label on top, answer line under it)
    let labTop, resTop, subTop
    if (rw.shape === 'side') {
      resTop = (innerH - rw.rs) / 2
      labTop = (innerH - (rw.labH + rw.subH)) / 2
      subTop = labTop + rw.labH + 4
    } else if (rw.shape === 'under') {
      const top = (innerH - rw.inner) / 2
      labTop = top + (rw.main - rw.labH) / 2
      resTop = top + (rw.main - rw.rs) / 2
      subTop = top + rw.main + 4
    } else {
      const top = (innerH - rw.inner) / 2
      labTop = top
      const lineTop = top + rw.labH + (rw.labH ? STACK_GAP : 0)
      resTop = lineTop + (rw.main - rw.rs) / 2
      subTop = rw.beside ? lineTop + (rw.main - rw.subLines * SUB_LH) / 2 - 2 : lineTop + rw.main + 4
    }
    // until then the row is balanced without it: the label (and an answer beside or over the sub-line) sit lower
    const preLab = rw.hasSub && !rw.beside ? rw.subH / 2 : 0
    const preRes = rw.hasSub && !rw.beside && rw.shape !== 'side' ? rw.subH / 2 : 0
    const lx = P.labelX - IX
    let lab = null, lskel = null, sub = null, note = null, wtag = null
    if (!bareRows && r.label) {
      lab = h('div', { class: 'dsl-lab', html: labHTML(r.label), style: { left: lx + 'px', top: Math.round(labTop) + 'px', width: Math.floor(rw.labW) + 'px', fontSize: P.LS + 'px' } })
      el.append(lab)
      lskel = h('div', { class: 'dsl-skel', 'data-deco': '', style: { left: lx + 'px', top: Math.round(labTop + preLab + rw.labH / 2 - P.LS * 0.13) + 'px', width: Math.round(Math.min(rw.labW, 420) * 0.62) + 'px', height: Math.round(P.LS * 0.26) + 'px' } })
      el.append(lskel)
    }
    if (rw.hasSub) {
      sub = h('div', { class: 'dsl-sub', style: { left: lx + 'px', top: Math.round(subTop) + 'px', width: Math.floor(rw.subW) + 'px', height: rw.subLines * SUB_LH + 'px' } })
      if (r.note) { note = h('div', { html: subHTML(r.note) }); sub.append(note) }
      if (r.wrongTag) { wtag = h('div', { html: `<span class="dsl-wtag">${ax(esc(r.wrong.disp))}</span>` }); sub.append(wtag) }
      el.append(sub)
    }
    // the answer: right-aligned at x RX
    const resW = Math.ceil(rw.resW) + 4
    const rskel = h('div', { class: 'dsl-skel', 'data-deco': '', style: { right: resRight + 'px', top: Math.round(resTop + preRes + rw.rs * 0.4) + 'px', width: Math.round(Math.max(rw.rs * 1.1, resW * 0.62)) + 'px', height: Math.round(rw.rs * 0.2) + 'px' } })
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
    // the working in the answer area: right of the label's ink (and a struck tag's), at the answer size when it fits,
    // else smaller (>= 44 px), else its first operand alone (when the roll starts from it)
    const leftEdge = rw.shape === 'stack' || !lab ? P.labelX
      : P.labelX + Math.max(inkWidth(lab), wtag ? inkWidth(wtag.firstChild) : 0) + 28
    const frmRoom = RX - leftEdge
    const mkFrm = (wk, color, rollsFrom) => {
      if (!wk.a) return null
      const full = `<span class="fi"><span style="color:${color}">${plainA(wk.a)}</span>${wk.b ? `<span class="op">${plainA(wk.b)}</span>` : ''}</span>`
      const lone = `<span class="fi"><span style="color:${color}">${plainA(wk.a)}</span></span>`
      const box = h('div', { class: 'dsl-frm', style: { right: resRight + 'px', top: Math.round(resTop) + 'px', height: rw.rs + 'px', maxWidth: Math.floor(frmRoom) + 'px' } })
      el.append(box)
      for (const html of rollsFrom ? [full, lone] : [full]) {
        box.innerHTML = html
        const fi = box.firstChild
        style(fi, { fontSize: rw.rs + 'px' })
        const w = inkWidth(fi)
        const px = Math.min(rw.rs, Math.floor(rw.rs * (frmRoom - 4) / Math.max(1, w)))
        if (px >= FRM_MIN) {
          style(fi, { fontSize: px + 'px' })
          return { el: box, from: slamFit(inkWidth(fi), frmRoom, null, 1.1) }
        }
      }
      box.remove()
      return null
    }
    const frm = r.frm ? mkFrm(r.work, r.col, r.numeric && r.from !== 0) : null
    const wfrm = r.wrong && r.wrong.frm ? mkFrm(r.wrong.work, C.white, r.wrong.numeric && r.wrong.from !== 0) : null
    // slot label slam: grows right from its left edge, never past its column
    const labFrom = lab && P.LS >= 42 ? slamFit(inkWidth(lab), rw.labW, null, 1.1) : 1
    // the sub-line gets content (the struck guess at the item's cut, or the note): the label steps up to make room
    const subT = rw.hasSub ? Math.min(r.noteT, wtag ? r.cut : Infinity) : Infinity
    return { el, wash, cell, num, lab, lskel, sub, note, wtag, rskel, res, odo, txt, wtxt, strike, frm, wfrm, labFrom, rw, preLab, preRes, subT }
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

  // ---------- the payoff in the hero (heroFinal) ----------
  const vT = spec.verdict && spec.verdict.text && spec.verdict.t != null ? Math.max(0, +spec.verdict.t) : null
  const noteEnds = R.filter(r => Number.isFinite(r.noteT)).map(r => r.noteT + 0.5)
  const beatsEnd = Math.max(lastLand + (goalIdx >= 0 ? 0.5 : 0), ...noteEnds, Number.isFinite(checkT) ? checkT + 0.8 : 0)
  const G = goalIdx >= 0 ? R[goalIdx] : null
  let heroFinal = null
  if (heroMode === 'input' && G && lo.heroFinal !== false) {
    const hf = lo.heroFinal && typeof lo.heroFinal === 'object' ? lo.heroFinal : {}
    const display = hf.display != null ? String(hf.display) : G.disp
    const tpl = parseDisplay(display)
    if (isNum(tpl) && normD(display) !== normD(input.value)) {
      const val = tpl.value * tpl.scale
      const t0 = Math.max(G.land + 0.5, hf.t != null ? +hf.t : vT != null ? vT : beatsEnd + 0.2)
      const from = fromOf(input.value, tpl) ?? 0
      const roll = clamp(rollWant(from, val, false), 1.0, 1.4)
      heroFinal = { t: t0, start: t0 + 0.04, roll, land: t0 + 0.04 + roll, display, tpl, val, from, col: G.col,
        tag: hf.tag != null ? String(hf.tag) : G.label }
    }
  }

  // ---------- the hero ----------
  let hero = null
  const HS = { inPx: 0, inTag: null, finPx: 0, finTag: null }
  const itpl = input ? parseDisplay(input.value) : null
  if (heroMode !== 'none') {
    hero = heroRow(stage, L, { maxInt: 10, maxDp: 2 })
    const tagLines = heroCompact ? 1 : 2
    // a tag of n lines fits the row at 42/1.08 + 2 px (or, tight, at a 45 px pitch); tagRoom(n): false, 'normal', 'tight'
    const tagRoom = n => (n * 45.36 + (n - 1) * 2 <= L.hero.h - 6 ? 'normal' : n * 45 <= L.hero.h - 1 ? 'tight' : false)
    const mkTag = lines => {
      const el = h('div', { class: 'dsl-tag' + (tagRoom(lines.length) === 'tight' ? ' tight' : ''), html: lines.map(x => `<span class="${x.cls}">${x.html}</span>`).join('') })
      hero.el.append(el)
      style(el, { height: L.hero.h + 'px' })
      return { el, w: Math.ceil(el.getBoundingClientRect().width) }
    }
    const owAt = (display, px) => {
      style(hero.odo.el, { fontSize: px + 'px' })
      sufStyle(hero.odo, parseDisplay(display), px)
      hero.show(display)
      return hero.odo.el.getBoundingClientRect().width
    }
    // the input's tag: label (white) over note (grey); the note goes first, then the tag, before the number drops
    // under 75%; the number then fits what is left at the read bump (1.06) plus air
    {
      const maxRow = L.hero.w / 1.1
      const ow = owAt(input.value, L.hero.size)
      let lines = lo.heroTag === false ? [] : [input.label, input.note].filter(x => x && String(x).trim()).slice(0, tagLines)
      while (lines.length) {
        const tg = mkTag(lines.map((x, k) => ({ html: richUI(String(x)), cls: k ? 'b' : 'a' })))
        if (tg.w <= TAGMAX && tg.w + TAGGAP + ow * 0.75 <= maxRow) { HS.inTag = tg; break }
        tg.el.remove()
        lines = lines.slice(0, -1)
      }
      const room = maxRow - (HS.inTag ? HS.inTag.w + TAGGAP : 0)
      HS.inPx = ow > room ? Math.floor(L.hero.size * Math.max(0.45, room / ow)) : L.hero.size
    }
    // the payoff's tag: the goal's label, on one line, else two balanced lines, else three (as the row's height
    // allows), each at most 620 px and leaving the number >= 80% of the row's size (460 px always passes that width
    // test); no tag that fits: the hero keeps the input
    if (heroFinal) {
      let owF = owAt(heroFinal.display, L.hero.size)
      if (heroFinal.from > heroFinal.val) owF = Math.max(owF, owAt(formatLike(heroFinal.from, heroFinal.tpl), L.hero.size))
      const maxRow = L.hero.w / 1.12                    // the payoff's landing bump (1.1) plus air
      const fits = w => w <= 620 && w + TAGGAP + owF * 0.8 <= maxRow
      const text = heroFinal.tag.trim()
      let tg = null
      if (text) {
        tg = mkTag([{ html: richUI(text), cls: 'a' }])
        if (!fits(tg.w)) { tg.el.remove(); tg = null }
        const words = bare(text).split(/\s+/).filter(Boolean)
        const maxLines = tagRoom(3) ? 3 : tagRoom(2) ? 2 : 1
        const line = (a, b) => ({ html: esc(words.slice(a, b).join(' ')), cls: 'a' })
        for (let n = 2; !tg && n <= Math.min(3, maxLines, words.length); n++) {
          let bestC = null
          const splits = n === 2 ? words.slice(1).map((_, k) => [k + 1]) : words.slice(1).flatMap((_, a) => words.slice(a + 2).map((__, b) => [a + 1, a + b + 2]))
          for (const sp of splits) {
            const bounds = [0, ...sp, words.length]
            const c = mkTag(bounds.slice(0, -1).map((a, k) => line(a, bounds[k + 1])))
            if (!bestC || c.w < bestC.w) { if (bestC) bestC.el.remove(); bestC = c } else c.el.remove()
          }
          if (bestC && fits(bestC.w)) tg = bestC
          else if (bestC) bestC.el.remove()
        }
        if (!tg) {
          console.warn(`scoreboard dead-simple-list: the goal's label is too long for a hero tag; the hero keeps the input (give lookOpts.heroFinal.tag)`)
          heroFinal = null
        }
      }
      if (heroFinal) {
        HS.finTag = tg
        const room = maxRow - (tg ? tg.w + TAGGAP : 0)
        HS.finPx = owF > room ? Math.floor(L.hero.size * Math.max(0.45, room / owF)) : L.hero.size
      }
    }
    for (const tg of [HS.inTag, HS.finTag]) if (tg) style(tg.el, { display: 'none' })
    owAt(input.value, HS.inPx)
  }
  // the hero "reads" on a cut whose working uses the input (the working takes your number)
  const reads = heroMode === 'input' ? [
    ...R.filter(r => r.cut > 0.05 && r.formula.includes(input.value)).map(r => r.cut),
    ...R.filter(r => r.wrong && r.wrong.t > 0.05 && r.wrong.formula.includes(input.value)).map(r => r.wrong.t),
  ] : []

  // ---------- the label stack: one group per beat ----------
  // the slots name their items, so the stack's big line is the working (line 2); slots without labels: the working
  // in line 1 over the label in line 2 (the only place the item is named)
  const groups = [], beats = []   // beats: { t, g }
  const workHTML = (wk, struck) => {
    if (!wk.a) return ''
    const html = plainA(wk.a) + (wk.b ? `<span class="dsl-op">${plainA(wk.b)}</span>` : '')
    return struck ? `<span class="dsl-wl"><span class="dsl-wt">${html}</span><i class="dsl-wline" data-deco></i></span>` : html
  }
  const intro = lo.intro && (lo.intro.l1 || lo.intro.l2) ? groups.push({ l1: lo.intro.l1 ? richA(String(lo.intro.l1)) : '', l2: lo.intro.l2 ? richA(String(lo.intro.l2)) : '' }) - 1 : -1
  const l1Col = r => (r.tone === 'bad' ? C.red : C.green)
  R.forEach(r => {
    if (r.wrong) {
      const wl = workHTML(r.wrong.work, Number.isFinite(r.wrong.strikeT))
      r.wrong.g = groups.push(bareRows
        ? { l1: wl, l1Color: C.white, l2: richA(r.wrong.label ?? r.label) }
        : { l1: r.wrong.label ? richA(r.wrong.label) : '', l1Color: C.white, l2: wl, l2Color: C.white }) - 1
      beats.push({ t: r.wrong.t, g: r.wrong.g })
    }
    r.g = groups.push(bareRows
      ? { l1: workHTML(r.work), l1Color: l1Col(r), l2: richA(r.label) }
      : { l1: '', l2: workHTML(r.work), l2Color: l1Col(r) }) - 1
    beats.push({ t: r.cut, g: r.g })
    if (r.note && !noteSlot) {
      r.ng = groups.push({ l1: workHTML(r.work), l1Color: l1Col(r), l2: richA(r.note) }) - 1
      beats.push({ t: r.noteT, g: r.ng })
    }
  })
  if (chkText && !chkBoard) {
    const cg = groups.push({ l1: chkStack.l1, l1Color: C.green, l2: chkStack.l2, l2Color: chkStack.l2Color }) - 1
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
  if (heroFinal) { ctx.cue(heroFinal.start, 'roll', { dur: heroFinal.roll - 0.05, gain: 0.5 }); ctx.cue(heroFinal.land, 'ding', { gain: 0.5 }) }

  // ---------- timeline helpers ----------
  // the goal slot flares again at the verdict only when the hero does not take the payoff there
  const slotFlareT = vT != null && !(heroFinal && Math.abs(heroFinal.t - vT) < 0.5) ? vT : null
  // the active slot: the last cut (a wrong guess, an item, or the check slot); the goal again from the verdict
  const cuts = []
  R.forEach((r, i) => { if (r.wrong) cuts.push({ t: r.wrong.t, row: i }); cuts.push({ t: r.cut, row: i }) })
  if (chkBoard) cuts.push({ t: checkT, row: 'chk' })
  if (vT != null && goalIdx >= 0) cuts.push({ t: vT, row: goalIdx, verdict: true })
  cuts.sort((a, b) => a.t - b.t)
  const cutAt = t => { let k = -1; for (let j = 0; j < cuts.length; j++) if (t >= cuts[j].t) k = j; return k }
  const rowCY = row => (row === 'chk' ? P.chk.y + P.chk.h / 2 : P.rows[row].y + P.rows[row].h / 2)

  /** what slot r's answer area shows at t: { kind: 'none' | 'frm' | 'wfrm' | 'odo' | 'txt' | 'wtxt', v, tpl, ghost, color, strike, dim, wrongPhase } */
  function answerAt(r, t, E) {
    const w = r.wrong
    if (w && t < r.cut) {
      if (t < w.t) return { kind: 'none' }
      const struck = Number.isFinite(w.strikeT) && t >= w.strikeT
      const pre = { kind: E && E.wfrm ? 'wfrm' : 'none', color: C.white, wrongPhase: true }
      if (w.numeric) {
        if (t < w.rs) return pre
        const p = prog(t, w.rs, w.dur)
        const v = p >= 1 ? w.val : snapTo(lerp(w.from, w.val, ease.out(p)), w.val, w.tpl)
        return { kind: 'odo', v, tpl: w.tpl, ghost: p < 1, color: struck ? C.red : C.white,
          strike: struck ? ease.out(prog(t, w.strikeT, 0.22)) : 0, dim: struck ? 0.55 : 1, wrongPhase: true }
      }
      if (t < w.land) return pre
      return { kind: 'wtxt', color: struck ? C.red : C.white, strike: struck ? ease.out(prog(t, w.strikeT, 0.22)) : 0,
        dim: struck ? 0.55 : 1, wrongPhase: true }
    }
    if (t < Math.min(r.cut, r.rs)) return { kind: 'none' }
    if (r.numeric) {
      if (t < r.rs) return { kind: E && E.frm ? 'frm' : 'none', color: r.col }
      const p = prog(t, r.rs, r.dur)
      const v = p >= 1 ? r.to : snapTo(lerp(r.from, r.to, ease.out(p)), r.to, r.tpl)
      return { kind: 'odo', v, tpl: r.tpl, ghost: p < 1, color: r.col, strike: 0 }
    }
    if (t < r.land) return { kind: E && E.frm ? 'frm' : 'none', color: r.col }
    return { kind: 'txt', color: r.col, strike: 0 }
  }

  // ---------- duration ----------
  // the payoff in the hero holds >= 1.8 s
  const duration = Math.min(90, Math.max(durationOf(spec, beatsEnd, d.hold ?? M.hold), heroFinal ? +(heroFinal.land + 1.8).toFixed(2) : 0))

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
        const a = answerAt(r, t, E)
        // lit state and tone
        let lit = 0, tone = r.col
        if (isActive) {
          lit = 1
          if (a.wrongPhase || (r.wrong && t < r.cut)) tone = a.color === C.red ? C.red : C.white
        } else if (reached && r.climax && t >= r.land) lit = 0.5
        style(E.el, litStyle(lit, tone))
        // a pop on each cut of this slot (and the verdict's return to the goal)
        let sc = 1
        for (const tc of new Set([r.cut0, r.cut, ...(r.climax && slotFlareT != null ? [slotFlareT] : [])])) if (tc > 0.05) sc *= bump(t, tc, { amp: 0.025, dur: 0.3 })
        style(E.el, { transform: sc === 1 ? 'none' : `scale(${sc.toFixed(4)})` })
        // number cell: LED off (dim) → a solid lit block while active (the goal stays lit) → grey when done
        const cellOn = isActive || (r.climax && t >= r.land)
        style(E.cell, { background: cellOn ? tone : 'transparent', borderRightColor: cellOn ? tone : '#1E2530' })
        style(E.num, { color: cellOn ? C.panel : reached ? C.grey : C.dim })
        // the goal's neon wash
        if (r.climax) style(E.wash, { opacity: t >= r.land ? Math.min(1, 0.7 + 0.3 * flashAt(t, r.land, 0.9) + (slotFlareT != null ? 0.3 * flashAt(t, slotFlareT, 0.8) : 0)).toFixed(3) : '0' })
        // the sub-line's arrival: the label (and the answer, when the sub-line runs under it) step up to make room in
        // the 0.16 s before it, so the note rises into a clear line
        const qs = Number.isFinite(E.subT) ? ease.inOut(prog(t, E.subT - 0.16, 0.16)) : 0
        const dyLab = E.preLab * (1 - qs), dyRes = E.preRes * (1 - qs)
        // label
        // (every branch sets the same properties: a hidden element never keeps another frame's state)
        if (E.lab) {
          if (showLabelsAlways) {
            style(E.lab, { display: 'block', color: reached ? C.white : C.grey, opacity: '1', transform: dyLab === 0 ? 'none' : `translateY(${dyLab.toFixed(1)}px)` })
            style(E.lskel, { display: 'none' })
          } else if (reached) {
            const k2 = slam(t, r.cut0, { from: E.labFrom })
            style(E.lab, { display: 'block', color: C.white, opacity: String(k2.o), transform: dyLab === 0 && k2.s === 1 ? 'none' : `translateY(${dyLab.toFixed(1)}px) scale(${k2.s.toFixed(4)})` })
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
        // the working in the answer area (a hard cut to the odometer when its roll starts)
        for (const [fe, kind, t0] of [[E.frm, 'frm', r.cut], [E.wfrm, 'wfrm', r.wrong ? r.wrong.t : 0]]) {
          if (!fe) continue
          const on = a.kind === kind
          const k2 = slam(t, t0, { from: fe.from })
          style(fe.el, { display: on ? 'flex' : 'none', opacity: on ? String(k2.o) : '1', transform: on && (dyRes !== 0 || k2.s !== 1) ? `translateY(${dyRes.toFixed(1)}px) scale(${k2.s.toFixed(4)})` : 'none' })
        }
        // the answer
        const showNum = a.kind === 'odo' || a.kind === 'txt' || a.kind === 'wtxt'
        style(E.rskel, { display: a.kind === 'none' ? 'block' : 'none', transform: dyRes === 0 ? 'none' : `translateY(${dyRes.toFixed(1)}px)` })
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
        // the swap (a small pop as the working becomes the number), the landing bump + glow flare (the goal: bigger,
        // and its glow stays lit)
        let rsc = 1, glow = 0
        if (r.wrong) {
          if (E.wfrm && r.wrong.numeric) rsc *= bump(t, r.wrong.rs, { amp: 0.04, dur: 0.25 })
          rsc *= bump(t, r.wrong.land, { amp: 0.06 })
          if (t >= r.wrong.land && t < r.cut) glow = Math.max(glow, 0.4 * (1 - ease.out(prog(t, r.wrong.land, 0.5))))
        }
        if (E.frm && r.numeric) rsc *= bump(t, r.rs, { amp: 0.04, dur: 0.25 })
        if (r.climax) {
          rsc *= bump(t, r.land, { amp: 0.16, dur: 0.5 })
          if (slotFlareT != null) rsc *= bump(t, slotFlareT, { amp: 0.06, dur: 0.4 })
          if (t >= r.land) glow = Math.max(glow, 0.42 + 0.58 * (1 - ease.out(prog(t, r.land, 1.2))), slotFlareT != null && t >= slotFlareT ? 0.42 + 0.4 * (1 - ease.out(prog(t, slotFlareT, 0.8))) : 0)
        } else {
          rsc *= bump(t, r.land, { amp: 0.1 })
          if (t >= r.land) glow = Math.max(glow, 0.75 * (1 - ease.out(prog(t, r.land, 0.6))))
        }
        style(E.res, { transform: dyRes === 0 && rsc === 1 ? 'none' : `translateY(${dyRes.toFixed(1)}px)` + (rsc === 1 ? '' : ` scale(${rsc.toFixed(4)})`) })
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
        const cs = on ? bump(t, checkT, { amp: 0.3, dur: 0.4 }) : 1
        style(chkEl.svg, { transform: cs === 1 ? 'none' : `scale(${cs.toFixed(3)})` })
      }

      // ---- pointer ----
      if (ptr) {
        if (k < 0) { style(ptr, { display: 'none', top: '0px', transform: 'none' }); attr(ptr.firstChild, 'fill', C.white) }
        else {
          const prev = k > 0 ? cuts[k - 1].row : cur.row
          const mv = k > 0 ? ease.out(prog(t, cur.t, 0.2)) : 1
          const y = lerp(rowCY(prev), rowCY(cur.row), mv) - 22
          const col = cur.row === 'chk' ? C.green : (() => { const r = R[cur.row]; const a = answerAt(r, t, null); return a.wrongPhase || (r.wrong && t < r.cut) ? (a.color === C.red ? C.red : C.white) : r.col })()
          const ps = cur.t > 0.05 ? bump(t, cur.t, { amp: 0.3, dur: 0.4 }) : 1
          style(ptr, { display: 'block', top: y.toFixed(1) + 'px', transform: ps === 1 ? 'none' : `scale(${ps.toFixed(3)})` })
          attr(ptr.firstChild, 'fill', col)
        }
      }

      // ---- the hero: the input; it steps back as the goal lands; the payoff rolls in last (heroFinal) ----
      if (hero) {
        let sc = 1, glow = 0, back = 0
        const fin = !!heroFinal && t >= heroFinal.start
        let tg
        if (!fin) {
          style(hero.odo.el, { fontSize: HS.inPx + 'px' })
          sufStyle(hero.odo, itpl, HS.inPx)
          hero.show(input.value)
          for (const rt of reads) {
            sc *= bump(t, rt, { amp: 0.06, dur: M.bump })
            if (t >= rt) glow = Math.max(glow, 0.5 * (1 - ease.out(prog(t, rt, 0.6))))
          }
          if (G && t >= G.land) back = ease.out(prog(t, G.land, 0.3))
          tg = HS.inTag
        } else {
          style(hero.odo.el, { fontSize: HS.finPx + 'px' })
          sufStyle(hero.odo, heroFinal.tpl, HS.finPx)
          const p = prog(t, heroFinal.start, heroFinal.roll)
          if (p >= 1) hero.show(heroFinal.display)
          else hero.set(snapTo(lerp(heroFinal.from, heroFinal.val, ease.out(p)), heroFinal.val, heroFinal.tpl), heroFinal.tpl, true)
          sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, heroFinal.t, 0.28))
          sc *= bump(t, heroFinal.land, { amp: 0.1, dur: 0.45 })
          if (t >= heroFinal.land) glow = Math.max(glow, 1 - ease.out(prog(t, heroFinal.land, 1.1)))
          tg = HS.finTag
        }
        for (const x of [HS.inTag, HS.finTag]) if (x) style(x.el, { display: x === tg ? 'flex' : 'none' })
        style(hero.glow, { paddingLeft: (tg ? tg.w + TAGGAP : 0) + 'px' })
        if (tg) style(tg.el, { left: (L.hero.w / 2 - (hero.odo.el.offsetWidth + tg.w + TAGGAP) / 2).toFixed(1) + 'px' })
        style(hero.odo.el, { color: fin ? heroFinal.col : back > 0 ? mixHex(C.white, C.green, back) : C.green })
        style(hero.el, { transform: `scale(${sc.toFixed(4)})`, opacity: (1 - 0.25 * back).toFixed(3) })
        style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': ((0.38 + 0.45 * glow) * (1 - back)).toFixed(3) })
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
