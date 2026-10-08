// becker-rig · unit-ladder (FORMATS.md §8): a price ladder in a unit you know ("Cost in Units of X", P8).
//
// One division, repeated on a cheap-to-huge ladder: cost ÷ unit price. Here the division is a verb the figure
// performs, and every answer is a pile you can see next to the ones before it.
//
//   frame 1   the rule is already running. If the first rung is not at t = 0 the figure holds up ONE unit
//             (a hot dog), the counter reads 1 under "$1.50 ÷ $1.50 =". Otherwise the first price coin is already
//             standing in front of him and the HUD shows the first rung. A first rung cut before frame 1 (t < 0) is
//             pre-filled: punched, piled and counted before t = 0, so frame 1 shows its pile, its count and the "≈"
//             working, with him pointing at it (no sound or shake from it); the camera frames him and the pile as one
//             group, centred, and pans back to his usual spot as the next cut pushes in.
//   per rung  the HUD swaps to the item and "cost ÷ price =", the counter becomes "?". The camera pushes in on
//             the figure and a gold coin (the price) drops in front of him with a thud. He winds up and punches it
//             (small coins: a karate chop). It bursts (hit + shake + hit lines) into units that arc over to the end
//             of a row of piles and stack into a brick pyramid; the counter rolls with every unit that lands. The
//             growing pile pushes the camera back until the whole row is in frame: the price ladder, cheap to
//             huge, left to right, with him at the far left (never under ~96 px on screen). The
//             count lands exactly on the spec's unitsDisplay and its "=" turns into "≈" when the result is
//             rounded. He reacts, escalating: point, shrug, shocked.
//   finale    the last count lands on a gold plate with the impact kit (hit + shake + flash + camera punch, hit
//             lines round the plate). He jumps, then slumps. The verdict lands in the caption band.
//   recap     (pileLabels) a table under the counter, one row per rung, biggest first: the "≈" in its own left-aligned
//             slot, the count right-aligned, the name after it (the "≈" is glued to its count only when its slot would
//             cost a name its line). Thin leaders run from the rows' ends to their piles' apexes only when every row
//             gets a clean one: a lone leader reads as a stray stroke.
//
// A pile is one path filled with a brick pattern of the unit icon, so a pile of 266,667 is exactly 266,667 icons
// and one DOM node; up close the units fly in one by one and squash as they land (big piles: an even sample of
// them), and a fractional last unit is drawn cut to size. Further out the brick pattern switches level of detail
// (2^k times bigger icons, cross-faded), so a pile always reads as a heap of the unit, never a flat shape.
// Every count, pile and zoom is closed-form in t.
//
// lookOpts (all optional; it renders fully without them):
//   figure: false             no figure: each coin cracks open by itself
//   figureScale: 1.1          size of the figure
//   unitLabel / unitLabelOne  the plural / singular label beside the counter (default: derived from unit.name)
//   intro: false              never open on the "1 unit" state, even when the first rung starts late
//   iconSize: 68              world size (px) of one unit icon's longer side
//   plate: false              no gold plate on the last count (a rung with tone "goal" always gets one)
//   pileLabels: false | [..]  the recap table after the last landing (one row per rung: count + name): false =
//                             none; an array = the name per rung (default: the item name, shortened: no article,
//                             no ", at ..." qualifier)
//   blank: { t, d = 1.6, text, calendar }  fills the hook's blank: the header's "___" ticks up through the ordinals
//                             (1st, 2nd, ... in grey, on a rule sized for the answer) from t and lands at t + d on
//                             `text` (a display string, printed exactly; it counts to the number in it) in hero green
//                             with a pop and a ding, while the figure points up at it. Ignored when the header has no
//                             "___". calendar: N (days) draws a month grid beside the counter whose days fill in step
//                             with the ordinals (1st .. the answer) and stays while that rung's pile is on (decoration).
//   morph: { t, working, display, label, approx = true }  at t (usually verdict.t) the HUD's last answer turns into
//                             the takeaway: the working line becomes `working` + "≈", the gold plate shrinks round
//                             `display` and the label beside it becomes `label` (one swap, like a rung's). A label too
//                             long to sit beside the plate on one line wraps to two balanced lines there.
//     + ask: s                the takeaway is asked first, like a rung's cut: at `ask` the item line becomes `item`
//     + item: '…'             (if given), the working "`working` =", the counter "?" flush left with the label after it
//     + compare: [i, j]       (as on a rung's cut) and the plate pops out; he thinks. The "?" squashes out just before
//     + beside: false         t; at t the answer pops in on the hit (hit + shake + flash + punch) at up to 1.2x the
//                             counts' size, on a fresh plate (the biggest number in the video; it stays clear of the
//                             working line, the recap table and x 938), hit lines round it, the label moves beside it,
//                             and the "=" turns into "≈" once the number is fully in. He hops (see hop), then slumps.
//                             compare: from the ask, the piles and recap rows of the other rungs dim (their leaders
//                             go), and (unless beside: false) the smaller compared pile hops over the piles between
//                             them to stand beside the bigger one (a squash and a thud as it lands), while those piles
//                             shuffle along into the room it left, every gap kept. If the moved piles would crowd the
//                             recap table, the camera also steps back a little (to 0.85) about the bigger pile's right
//                             foot; if even that cannot clear it, the piles stay put.
//   hop: true | false         a jump is a real hop: a crouch, take-off on the beat, an arc (lib's hop(), 56 px world on
//                             the last count, 70 on the asked takeaway), a squash on touchdown, then "whoa" with his feet
//                             down until the slump (1 s after take-off). false: the 'shocked' pose held in mid-air.
//                             Default: on when the takeaway is asked (morph.ask), else off
//   landAfter: s              every rung's count lands this long after its cut (coin drop, punch and fill keep their
//                             proportions; the lead never goes under 0.4 s). Default: the kit's pacing (≈ 2.2 s on a 4 s gap)
//   beats: [{ t, act, d }]    scripted reactions: a POSES name ('cheer' = celebrate) at t, back to idle after d s
//                             (default 1.2; d: null holds it)
//
// Cuts: when the camera pushes back in on the figure for a new rung, the piles already standing would be sliced by the
// top of the stage and the right frame edge; each earlier pile fades out as it leaves the frame and back in as the
// pull-back brings it home, so no pile is ever drawn cut flat. While a count rolls its digits are right-aligned in the
// final number's slot and the label sits where it lands (nothing slides when the count lands or the plate arrives).
import {
  h, s, style, attr, setText, setHTML, prog, clamp, lerp, rng,
  C, F, T, L, S, E, RIG, POSES, poseTrack, fk, secondary, pinLimb, blendJ, Figure, makeWorld, makeFx, camera, NumObj,
  chromeParts, durationOf, num, rollTo, measure, arc, squashAt, fall, popIn, wobble, coin, icon, lerp2, smooth, mix, hop,
} from '../lib.js'

const FLOOR = L.floorY
const XF = 150             // the figure's root x in the world
const FXS = 150            // where his feet stay on screen while the camera zooms (the zoom anchor)
const XR = 1012            // the row of piles is fitted up to here on screen
const HX = 62, HW = 878    // HUD text column: x 62-940 (clear of the right rail)
const FPOOL = 61           // flying units (every unit of a pile <= 60, an even sample of a bigger one)
const KF = 28
const SETTLE = 0.16        // a landed unit squashes this long before it joins its pile
const PLATE = [20, 12]     // gold plate padding round the final count
const LABPX = 48, LABLH = 52

export const css = `
.ul-hud { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.ul-item { position: absolute; left: ${HX}px; width: ${HW}px; font-family: ${F.head}; font-weight: 800; letter-spacing: -0.015em; color: ${C.ink}; transform-origin: 0 100%; }
.ul-div { position: absolute; left: ${HX}px; white-space: nowrap; font-family: ${F.mono}; font-weight: 700; letter-spacing: -0.03em; color: ${C.grey}; transform-origin: 0 50%; }
.ul-div b { color: ${C.ink}; font-weight: 800; }
.ul-div i { font-style: normal; color: ${C.ink}; font-weight: 800; }
.ul-div i.ap { color: ${C.heroInk}; }
.ul-num { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.035em; }
.ul-lab { font: 800 ${LABPX}px/${LABLH}px ${F.head}; letter-spacing: -0.01em; color: ${C.grey}; }
.ul-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 20px; transform-origin: 50% 50%; }
.ul-fx { position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none; }
.ul-row { position: absolute; left: 0; top: 0; white-space: nowrap; display: flex; align-items: flex-start; }
.ul-row .c { display: inline-block; text-align: right; font: 900 40px/50px ${F.head}; letter-spacing: -0.03em; color: ${C.ink}; }
.ul-row .a { display: inline-block; text-align: left; font: 900 40px/50px ${F.head}; color: ${C.ink}; }
.ul-row .n { display: inline-block; font: 800 40px/50px ${F.head}; letter-spacing: -0.01em; color: ${C.grey}; }
`

// the soft base under a far-away pile's icon pattern (it shows between the icons): pale coin for money units,
// otherwise the pale structure grey
const FLAT = { coin: '#FFE9A3', bill: '#FFE9A3', ticket: '#FFE9A3' }
const flatOf = name => FLAT[name] || C.lineSoft

// poses used only here (the shared library has the rest)
const P_PRESENT = { lean: -3, tilt: 4, aF: [116, 30], aB: [-14, 16], lF: [10, -4], lB: [-12, -2] }
const P_TOSSW = { lean: 10, tilt: 12, aF: [30, 96], aB: [-24, 20], lF: [18, -26], lB: [-16, -22] }
const P_TOSS = { lean: -8, tilt: -18, aF: [138, 8], aB: [-34, 20], lF: [12, -4], lB: [-12, -2], lift: 8 }
const P_FLINCH = { lean: -16, tilt: -16, aF: [64, 104], aB: [44, 112], lF: [18, -16], lB: [-20, -14] }
const P_WIND = { lean: -18, tilt: -4, aF: [-58, 118], aB: [58, 64], lF: [30, -36], lB: [-30, -22] }
const P_PUNCH = { lean: 24, tilt: -6, aF: [92, 4], aB: [-46, 36], lF: [36, -42], lB: [-30, -6] }
// the hop (lookOpts.hop): arms flung up and legs long in the air, knees giving on touchdown, then "whoa" with his
// feet down (the lift comes from lib's hop(), never from a held pose)
const P_AIR = { lean: -10, tilt: -18, aF: [152, 26], aB: [-152, -26], lF: [16, -18], lB: [-14, -26] }
const P_LAND = { lean: 12, tilt: -4, aF: [138, 34], aB: [-138, -34], lF: [46, -82], lB: [34, -76] }
const P_AGHAST = { lean: -10, tilt: -16, aF: [150, 30], aB: [-150, -30], lF: [12, -6], lB: [-12, -4] }

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// a pile's name tag: the rung's item without its article or trailing qualifier ("A year of rent at $1,700/mo" ->
// "Year of rent", "A $400,000 house, paid in cash" -> "$400,000 house"). Words are dropped, never changed.
function shortName(item) {
  let s2 = String(item).trim().replace(/^(?:a|an|the)\s+/i, '')
  s2 = s2.split(/,\s|\s(?:at|for|per|paid|in|on|with)\s/)[0].trim()
  return s2 ? (/^[a-z]+(?:-[a-z]+)*(\s|$)/.test(s2) ? s2[0].toUpperCase() + s2.slice(1) : s2) : String(item)
}
const Bc = n => (Math.sqrt(8 * Math.max(0, n) + 1) - 1) / 2          // pyramid base (continuous) for n units
const tri = B => (B * (B + 1)) / 2
const growth = u => 1 - (1 - u) * (1 - u)                             // pile size over the fill (ease-out)

function plural(w) {
  if (/[^aeiou]y$/i.test(w)) return w.slice(0, -1) + 'ies'
  if (/(s|x|z|ch|sh)$/i.test(w)) return w + 'es'
  return w + 's'
}
/**
 * Counter labels from unit.name: "Costco hot dog" -> hot dog(s) (a leading brand word goes: the hook names it),
 * "Hour of work at $15 (≈ $13.10 kept)" -> hour(s) of work, "Big Mac" -> Big Mac(s), "Latte" -> latte(s).
 */
function unitLabels(name) {
  const base = String(name || 'unit').replace(/\s*\([^)]*\)/g, '').trim() || 'unit'
  const lc = w => (/^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w)
  const m = /^(\S+)\s+of\s+(.+)$/i.exec(base)
  if (m) {
    const rest = m[2].split(/\s+(?:at|for|per|in|on)\s+/i)[0]
    return { one: `${lc(m[1])} of ${rest}`, many: `${plural(lc(m[1]))} of ${rest}` }
  }
  let w = base.split(/\s+(?:at|for|per)\s+/i)[0].split(/\s+/)
  if (w.length >= 2 && /^[A-Z][a-z]+$/.test(w[0]) && w.slice(1).every(x => x === x.toLowerCase())) w = w.slice(1)
  if (w.length === 1) return { one: lc(w[0]), many: plural(lc(w[0])) }
  return { one: w.join(' '), many: [...w.slice(0, -1), plural(w[w.length - 1])].join(' ') }
}
/** greedy word wrap with real metrics; null if one word is wider than maxW */
function wrapWords(text, font, letterSpacing, maxW) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''
  for (const w of words) {
    if (measure(w, font, { letterSpacing }) > maxW + 0.5) return null
    const next = cur ? cur + ' ' + w : w
    if (!cur || measure(next, font, { letterSpacing }) <= maxW + 0.5) cur = next
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  return lines.length ? lines : ['']
}
/** squash the old text out, pop the new one in, never below ~41 px effective (the type floor) */
function swapK(t, t0, px, dur = 0.24) {
  const k = clamp(1 - 41.5 / px, 0, 0.28)
  if (t < t0) return { phase: 0, sx: 1, sy: 1, op: 1 }
  const p = prog(t, t0, dur)
  if (p < 0.4) { const q = E.in(p / 0.4); return { phase: 0, sx: 1 + 0.4 * k * q, sy: 1 - k * q, op: 1 - 0.9 * q } }
  const q = (p - 0.4) / 0.6
  const from = 1 - 0.8 * k
  const sc = from + (1 - from) * E.back(q, 2.4)
  return { phase: 1, sx: sc, sy: sc, op: clamp(q * 3) }
}
const STILL = { phase: 1, sx: 1, sy: 1, op: 1 }

const ordinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th')
/**
 * The hook's blank: the header's "___" fills in. The underscores stay as they are until bk.t; then they hand over to
 * a rule of the same weight, sized for the answer, while the ordinals tick up on it (grey), and at `land` the answer
 * pops in (hero green, the rule turns green). Lives inside the header (same font, same baseline), marked
 * data-overlap-ok: it is written on the blank on purpose.
 */
function hookBlank(header, bk, land, ctx) {
  const tw = document.createTreeWalker(header, NodeFilter.SHOW_TEXT)
  let node = null, at = -1
  while (tw.nextNode()) { const i = tw.currentNode.textContent.search(/_{3,}/); if (i >= 0) { node = tw.currentNode; at = i; break } }
  if (!node) return null
  const len = /_+/.exec(node.textContent.slice(at))[0].length
  const run = node.splitText(at)
  run.splitText(len)
  const us = h('span', {}, run.textContent)
  run.replaceWith(us)
  const text = String(bk.text)
  const target = Math.max(1, Math.round(num(text.replace(/[^\d.,]/g, '')) || 1))
  const t0 = +bk.t, d = Math.max(0.3, land - t0)
  const hr = header.getBoundingClientRect(), ur = us.getBoundingClientRect()
  const probe = () => h('span', { style: { display: 'inline-block', width: '0px', height: '0px' } })
  const pb = probe()
  us.append(pb)
  const base = pb.getBoundingClientRect().top
  pb.remove()
  const cs = getComputedStyle(header)
  const px = parseFloat(cs.fontSize)
  // the rule: the underscore's own ink band (below the baseline), as one bar
  const g2 = document.createElement('canvas').getContext('2d')
  g2.font = `${cs.fontWeight} ${px}px ${cs.fontFamily}`
  const mU = g2.measureText('_')
  const uTop = base - hr.top - mU.actualBoundingBoxAscent, uH = Math.max(4, mU.actualBoundingBoxAscent + mU.actualBoundingBoxDescent)
  const fill = h('div', { 'data-overlap-ok': '', style: { position: 'absolute', left: (ur.left - hr.left).toFixed(1) + 'px', top: '0px', whiteSpace: 'nowrap', lineHeight: '1', transformOrigin: '0 100%', color: C.grey } })
  header.append(fill)
  // the answer must end inside x 1016: shrink it (never under the type floor) if the blank sits far right
  setText(fill, text)
  const room = 1016 - ur.left
  let fs = px
  if (fill.offsetWidth > room) { fs = Math.max(T.small, px * room / fill.offsetWidth); style(fill, { fontSize: fs.toFixed(1) + 'px' }) }
  const pf = probe()
  fill.append(pf)
  const asc = pf.getBoundingClientRect().top - fill.getBoundingClientRect().top
  pf.remove()
  style(fill, { top: (base - hr.top - asc).toFixed(1) + 'px' })
  const wFinal = fill.offsetWidth
  const w0 = ur.width, w1 = Math.max(w0, wFinal + 0.06 * fs)
  const bar = h('div', { 'data-deco': '', style: { position: 'absolute', left: (ur.left - hr.left).toFixed(1) + 'px', top: uTop.toFixed(1) + 'px', height: uH.toFixed(1) + 'px', width: w0.toFixed(1) + 'px', background: C.ink, borderRadius: '2px', opacity: '0' } })
  header.append(bar)
  ctx.cue(t0, 'roll', { dur: d - 0.05, gain: 0.25 })
  ctx.cue(land, 'ding', { gain: 0.55 })
  return {
    seek(t) {
      if (t < t0) {
        style(us, { color: '' }); style(fill, { opacity: '0' }); style(bar, { opacity: '0' })
        return
      }
      style(us, { color: 'transparent' })
      const done = t >= land
      const grow = E.out(prog(t, t0, 0.22))
      style(bar, { opacity: '1', width: lerp(w0, w1, grow).toFixed(1) + 'px', background: done ? C.hero : C.ink })
      if (!done) {
        const day = 1 + Math.min(target - 1, Math.floor((target - 1) * prog(t, t0, d * 0.94)))
        setText(fill, ordinal(day))
        style(fill, { opacity: '1', color: C.grey, transform: 'none' })
      } else {
        const k = popIn(t, land, 0.26, 0.7).scale * (1 + wobble(t, land + 0.2, 0.04, 2.4, 6))
        setText(fill, text)
        style(fill, { opacity: '1', color: C.heroInk, transform: `scale(${k.toFixed(3)})` })
      }
    },
  }
}

export default function unitLadder(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const U = d.unit || {}
  const src = (d.rungs || []).filter(Boolean)
  const N = src.length
  if (!N) throw new Error('unit-ladder: data.rungs is empty')
  const hold = d.hold ?? 3
  const price = String(U.price ?? '')
  const FIGK = lo.figureScale ?? 1.1
  const showFig = lo.figure !== false
  const iconName = U.icon || 'token'
  // lookOpts.landAfter: every rung's count lands this long after its cut (coin drop, punch and fill keep their
  // proportions); default: the kit's own pacing (about 2.2 s on a 4 s gap)
  const LA = Number.isFinite(+lo.landAfter) && +lo.landAfter > 0 ? Math.max(0.9, +lo.landAfter) : null

  // ================================================================== rungs, labels, timing
  const Ts = []
  src.forEach((r, i) => Ts.push(r.t != null ? +r.t : i ? Ts[i - 1] + 4 : 1.2))
  const intro = lo.intro !== false && Ts[0] >= 0.9
  const lab = unitLabels(U.name)
  const labelMany = lo.unitLabel || lab.many, labelOne = lo.unitLabelOne || lab.one
  const R = src.map((r, i) => {
    const disp = String(r.unitsDisplay ?? r.units ?? '')
    const m = /^\s*≈\s*/.exec(disp)
    const digits = m ? disp.slice(m[0].length) : disp
    const units = Number.isFinite(+r.units) ? Math.max(0, +r.units) : Math.max(0, num(digits) || 0)
    const target = num(digits)
    const last = i === N - 1
    return {
      i, item: String(r.item ?? ''), cost: String(r.cost ?? ''), disp, digits, approx: !!m, units, target, T: Ts[i], last,
      e: N > 1 ? i / (N - 1) : 1, tone: r.tone, label: target === 1 ? labelOne : labelMany,
      plate: (last && lo.plate !== false) || r.tone === 'goal',
    }
  })
  const numColor = r => (r.plate ? C.ink : r.tone === 'bad' ? C.red : r.tone === 'neutral' ? C.ink : C.heroInk)

  // ================================================================== HUD layout (fixed, never zoomed)
  const mo = lo.morph && lo.morph.t != null && lo.morph.display != null ? lo.morph : null
  const moT = mo ? +mo.t : Infinity
  const moWork = mo ? String(mo.working || '') : ''
  const moOp = mo && mo.approx === false ? '=' : '≈'
  // morph.ask: the takeaway is asked first, like a rung's cut (item -> morph.item, working "… =", counter "?"),
  // and lands at morph.t; morph.compare: the piles it divides stay lit from the ask, the others dim
  const moAsk = mo && mo.ask != null && +mo.ask < moT ? +mo.ask : null
  const moItem = mo && mo.item != null ? String(mo.item) : null
  const moCmp = mo && Array.isArray(mo.compare) ? new Set(mo.compare.map(Number)) : null
  const moFrom = moAsk ?? moT
  const moLabel = mo ? String(mo.label || '') : ''
  const parts = chromeParts(spec, ctx)
  const introItem = String(U.name || '')
  const itemTexts = [...(intro ? [introItem] : []), ...R.map(r => r.item), ...(moItem ? [moItem] : [])]
  let itemPx = 54
  for (; itemPx > 42; itemPx -= 2) {
    const font = `800 ${itemPx}px ${F.head}`
    if (itemTexts.every(tx => { const w = wrapWords(tx, font, '-0.015em', HW); return w && w.length <= 2 })) break
  }
  const itemLinesOf = tx => { const w = wrapWords(tx, `800 ${itemPx}px ${F.head}`, '-0.015em', HW); return w ? Math.min(3, w.length) : 2 }
  const itemLines = Math.max(...itemTexts.map(itemLinesOf))
  const lhI = Math.round(itemPx * 1.16)
  // the intro states the unit's definition ("1 hot dog = $1.50"), not a division the spec never made
  const introDiv = `<i>1</i> ${esc(labelOne)} <i>=</i> <b>${esc(price)}</b>`
  const divHTML = (cost, op = '=', ap = false) => `<b>${esc(cost)}</b> ÷ ${esc(price)} <i class="${ap ? 'ap' : ''}">${op}</i>`
  const divTexts = [...(intro ? [`1 ${labelOne} = ${price}`] : []), ...R.map(r => `${r.cost} ÷ ${price} ≈`), ...(mo && moWork ? [`${moWork} ${moOp}`] : [])]
  let divPx = 46
  for (; divPx > 40; divPx -= 2) if (divTexts.every(tx => measure(tx, `800 ${divPx}px ${F.mono}`, { letterSpacing: '-0.03em' }) <= HW)) break
  const lhD = Math.round(divPx * 1.3)
  const digW = (str, px) => measure(str, `900 ${px}px ${F.head}`, { letterSpacing: '-0.035em' })
  const labW = str => measure(str, `800 ${LABPX}px ${F.head}`, { letterSpacing: '-0.01em' })
  const counters = [...(intro ? [{ digits: '1', label: labelOne, plate: false }] : []), ...R, ...(mo ? [{ digits: String(mo.display), label: moLabel, plate: true, morph: true }] : [])]
  const besideFits = px => counters.every(a => (a.plate ? 2 * PLATE[0] + 24 : 0) + digW(a.digits, px) + 28 + labW(a.label) <= HW)
  let cPx = 136
  while (cPx > 104 && !besideFits(cPx)) cPx -= 4
  let labelBelow = !besideFits(cPx)
  // a long takeaway label may wrap to two balanced lines beside its plate before every label goes below the counter
  let moLines = null
  if (labelBelow && mo) {
    const ws = moLabel.split(/\s+/).filter(Boolean)
    let best = null
    for (let k = 1; k < ws.length; k++) {
      const l2 = [ws.slice(0, k).join(' '), ws.slice(k).join(' ')], w = Math.max(labW(l2[0]), labW(l2[1]))
      if (!best || w < best.w) best = { l: l2, w }
    }
    if (best) {
      const fits2 = px => counters.every(a => (a.plate ? 2 * PLATE[0] + 24 : 0) + digW(a.digits, px) + 28 + (a.morph ? best.w : labW(a.label)) <= HW)
      let p2 = 136
      while (p2 > 104 && !fits2(p2)) p2 -= 4
      if (fits2(p2)) { cPx = p2; labelBelow = false; moLines = best.l }
    }
  }
  if (labelBelow) { cPx = 136; while (cPx > 96 && counters.some(a => (a.plate ? 2 * PLATE[0] + 12 : 0) + digW(a.digits, cPx) > HW)) cPx -= 4 }
  // vertical stack: item (bottom-aligned in its block), working line, counter (+ label)
  let yItem, yDiv, base, yLabBase, VPtop
  const stack = () => {
    yItem = parts.workTop + 2
    yDiv = yItem + itemLines * lhI + 6
    const yNum = yDiv + lhD + 22                                 // room for the landing bump
    base = yNum + 0.864 * cPx                                   // Inter Tight baseline at line-height 1
    yLabBase = labelBelow ? base + 0.241 * cPx + 52 : base        // below: clear of the digits' descent box
    const bottom = labelBelow ? yLabBase + 0.2 * LABLH : Math.max(yNum + cPx, base + PLATE[1] + 6)
    VPtop = Math.round(bottom + 16)
  }
  stack()
  while (FLOOR - VPtop < 330 && cPx > 96) { cPx -= 8; stack() }

  // ================================================================== world
  const world = makeWorld(ctx, { floor: false, clip: [VPtop, 1920] })
  const fade = 'linear-gradient(to bottom, transparent 0px, #000 30px)'
  style(world.viewport, { maskImage: fade, webkitMaskImage: fade })
  const g = world.g
  const defs = s('defs')
  world.svg.prepend(defs)
  const floorLn = s('line', { y1: FLOOR, y2: FLOOR, stroke: C.ink, 'stroke-linecap': 'round', opacity: 0.85 })
  g.back.append(floorLn)
  defs.append(s('clipPath', { id: 'ul-floor', clipPathUnits: 'userSpaceOnUse' }, s('rect', { x: -1e7, y: -1e7, width: 2e7, height: 1e7 + FLOOR })))
  attr(g.fx, 'clip-path', 'url(#ul-floor)')                    // hit lines stay above the floor

  // the unit icon, centred on (0, 0) at its world size; a cell of the stack is a little larger
  const probe = icon(g.back, iconName, { size: 100 })
  const bb = probe.getBBox()
  probe.remove()
  const bw = bb.width + 7, bh = bb.height + 7
  const sc = (lo.iconSize ?? 68) / Math.max(bw, bh)
  const cw = bw * sc * 1.07, ch = bh * sc * 1.05
  const icIn = s('g', { transform: `scale(${sc.toFixed(4)}) translate(${(-(bb.x + bb.width / 2)).toFixed(2)},${(-(bb.y + bb.height / 2)).toFixed(2)})` })
  icon(icIn, iconName, { size: 100 })
  defs.append(s('g', { id: 'ul-ic' }, icIn))
  const use = (props = {}) => s('use', { href: '#ul-ic', ...props })
  // brick pattern in pile-local space: row 0 (y -ch..0, i.e. ch..2ch of the tile) unshifted, row 1 half a cell over
  // Level 0 is the true brick pile (one icon = one unit). Further out, level k draws the same brick pattern 2^k times
  // bigger, so a pile always reads as a heap of the unit (each icon >= ~19 px on screen), never as a flat shape
  const lodPat = k => {
    const m = 2 ** k
    const pk = s('pattern', { id: `ul-pat${k}`, patternUnits: 'userSpaceOnUse', width: (cw * m).toFixed(3), height: (2 * ch * m).toFixed(3) })
    const at = (x, y) => use({ transform: `scale(${m}) translate(${x.toFixed(2)},${y.toFixed(2)})` })
    pk.append(at(cw / 2, 1.5 * ch), at(0, 0.5 * ch), at(cw, 0.5 * ch))
    defs.append(pk)
  }

  // cell m (fill order) -> centre in pile-local coordinates (x right of the pile's left edge, y up = negative):
  // a left-anchored brick pyramid that grows along its right slope, so it is a pyramid at every count
  const cellOf = m => {
    const B = Math.floor(Bc(m) + 1e-9), j = m - tri(B)
    return [j * cw / 2 + (B - j) * cw + cw / 2, -(j + 0.5) * ch]
  }
  const pathCache = new Map()
  function pilePath(n, smoothEdge = false) {
    n = Math.floor(n)
    if (n <= 0) return ''
    const key = smoothEdge ? -n : n
    if (pathCache.has(key)) return pathCache.get(key)
    const B = Math.floor(Bc(n) + 1e-9), r = n - tri(B)
    const xl = k => k * cw / 2, xr = k => k * cw / 2 + (B - k + (k < r ? 1 : 0)) * cw
    const f = v => v.toFixed(1)
    let p
    // far away (rows under ~9 px on screen) the staircase becomes its smooth outline: no stair-step aliasing
    if (B > 360 || smoothEdge) p = `M0,0H${f(xr(0))}L${f(xr(Math.max(0, B - 1)))},${f(-B * ch)}H${f(xl(Math.max(0, B - 1)))}Z`
    else {
      p = `M0,0H${f(xr(0))}V${f(-ch)}`
      for (let k = 1; k < B; k++) p += `H${f(xr(k))}V${f(-(k + 1) * ch)}`
      p += `H${f(xl(B - 1))}`
      for (let k = B - 1; k >= 1; k--) p += `V${f(-k * ch)}H${f(xl(k - 1))}`
      p += 'V0Z'
    }
    if (pathCache.size > 600) pathCache.clear()
    pathCache.set(key, p)
    return p
  }
  const pileW = n => (Math.max(1, Bc(n)) + 1) * cw
  const pileH = n => Math.max(1, Bc(n)) * ch

  // ================================================================== per-rung schedule + coins
  const reach = (RIG.upperArm + RIG.foreArm) * FIGK
  const shoulderH = (() => { const J = fk(P_PUNCH, { x: XF, scale: FIGK }); return FLOOR - J.sh[1] })()
  const maxR = Math.min(170, (FLOOR - VPtop - 44) / 2)
  for (const r of R) {
    const i = r.i
    const gap = i < N - 1 ? R[i + 1].T - r.T : Math.max(3.4, hold + 1.4)
    r.placed = i === 0 && !intro && r.T < 0.9                 // the first coin already stands there at t = 0
    // a first rung cut before frame 1 is pre-filled: punched, piled and counted before t = 0 (frame 1 shows it done)
    r.prefill = i === 0 && !intro && r.T < 0
    let lead = r.placed ? 0.45 : clamp(gap * 0.22, 0.45, 0.92)
    let fillDur
    if (r.last) {
      let fd = 1.9
      if (spec.verdict && spec.verdict.t != null) fd = Math.min(fd, spec.verdict.t - 0.5 - (Math.max(0, r.T) + lead + 0.05))
      fillDur = clamp(fd, 0.6, 2.2)
    } else fillDur = clamp(gap * 0.3, 0.5, 1.6)
    if (LA && !r.prefill) {                                    // lookOpts.landAfter: same beats, compressed (or eased) to fit
      const k = (LA - 0.05) / (lead + fillDur)
      lead = Math.max(0.4, lead * k)
      fillDur = Math.max(0.35, LA - 0.05 - lead)
    }
    const start = r.prefill ? Math.min(-0.4, r.T + lead + 0.05 + fillDur) - (lead + 0.05 + fillDur) : Math.max(0, r.T)
    r.punch = start + lead
    r.coinLand = r.placed ? -Infinity : r.T + lead * 0.64
    r.push = i > 0 ? [r.T, Math.min(0.5, lead * 0.6)] : null
    r.fill0 = r.punch + 0.05
    r.fillDur = fillDur
    r.land = r.fill0 + r.fillDur
    // the pull-back follows the growing pile closely, so the new pile never hangs off the right edge for long
    r.pull = clamp(r.fillDur * 0.32, 0.3, r.last ? 0.6 : 0.45)
    r.whole = Math.floor(r.units + 1e-9)
    r.frac = r.units - r.whole
    r.hasPart = r.frac > 0.04 && r.whole < 1000
    // the price coin: heavier rung by rung (it ends up towering over him)
    r.rw = lerp(70, maxR, Math.pow(r.e, 0.85))
    r.mode = 2 * r.rw >= shoulderH - 20 ? 'punch' : 'chop'   // a small coin gets a karate chop from above
    r.landT = k => {                                           // unit k lands when the count passes k + 1
      if (k >= r.whole) return r.land
      const gg = Math.sqrt((k + 1) / Math.max(1e-9, r.units))
      return r.fill0 + (1 - Math.sqrt(Math.max(0, 1 - gg))) * r.fillDur
    }
  }
  const nAt = (r, t) => { const gg = growth(prog(t, r.fill0, r.fillDur)); return r.units * gg * gg }

  // ================================================================== the figure's choreography
  const react = r => (r.last ? 'shocked' : r.e < 0.34 ? 'point' : r.e < 0.67 ? 'shrug' : 'shocked')
  // a pre-filled first rung: frame 1 has him already reacting to his pile (point), held while it is read
  const keys = [{ t: 0, pose: R[0].prefill ? react(R[0]) : intro ? P_PRESENT : 'lookUp' }]
  // lookOpts.hop: a jump is a real hop (crouch, take-off on the beat, an arc from lib's hop(), a squash on touchdown,
  // then "whoa" with his feet down) instead of the 'shocked' pose held in mid-air. Default: on when the takeaway is
  // asked (morph.ask), where both climaxes jump
  const hopOn = lo.hop != null ? lo.hop !== false : moAsk != null
  const hops = []
  const addHop = (t0, dur, hgt) => {
    keys.push({ t: t0 - 0.2, pose: 'crouch', d: 0.15, e: 'inOut' })
    keys.push({ t: t0 - 0.03, pose: P_AIR, d: 0.1, e: 'out' })
    keys.push({ t: t0 + dur - 0.05, pose: P_LAND, d: 0.06, e: 'out' })
    keys.push({ t: t0 + dur + 0.09, pose: P_AGHAST, d: 0.24, e: 'spring' })
    hops.push({ t0, dur, h: hgt })
  }
  if (intro) {
    const T0 = R[0].T
    keys.push({ t: 0.5, pose: { ...P_PRESENT, tilt: 16, aF: [108, 40] }, d: 0.22, e: 'inOut' })
    keys.push({ t: 0.8, pose: P_PRESENT, d: 0.3, e: 'spring' })
    keys.push({ t: T0 - 0.26, pose: P_TOSSW, d: 0.16, e: 'inOut' })
    keys.push({ t: T0 - 0.07, pose: P_TOSS, d: 0.09, e: 'out' })
  }
  for (const r of R) {
    if (r.prefill) {
      const nextT = N > 1 ? R[1].T : Infinity
      keys.push({ t: clamp(2.2, r.land + 1.0, Math.max(r.land + 1.0, nextT - 0.6)), pose: 'idle', d: 0.45, e: 'inOut' })
      continue
    }
    if (!r.placed) {
      keys.push({ t: r.T + (intro && r.i === 0 ? 0.22 : 0.1), pose: 'lookUp', d: 0.26, e: 'spring' })
      keys.push({ t: r.coinLand, pose: { ...P_FLINCH, lean: -8 - 12 * r.e }, d: 0.08, e: 'out' })
      keys.push({ t: r.coinLand + 0.1, pose: 'lookUp', d: 0.2, e: 'spring' })
    }
    keys.push({ t: r.punch - 0.25, pose: r.mode === 'punch' ? P_WIND : 'chopUp', d: 0.17, e: 'inOut' })
    keys.push({ t: r.punch - 0.06, pose: r.mode === 'punch' ? P_PUNCH : 'chopDown', d: 0.07, e: 'out' })
    keys.push({ t: r.punch + 0.2, pose: 'lookUp', d: 0.3, e: 'spring' })
    if (r.last && hopOn) {                                     // the count lands and knocks him into a hop
      addHop(r.land, 0.42, 56)
      keys.push({ t: r.land + 1.0, pose: 'slump', d: 0.4, e: 'spring' })
      continue
    }
    keys.push({ t: r.land, pose: react(r), d: 0.24, e: 'spring' })
    if (r.last) keys.push({ t: r.land + 0.8, pose: 'slump', d: 0.4, e: 'spring' })
    else keys.push({ t: r.land + 1.0, pose: 'idle', d: 0.45, e: 'inOut' })
  }
  // the hook's blank fills in (lookOpts.blank): he points up at it as it lands, between two rungs
  const bk = lo.blank && lo.blank.text != null && lo.blank.t != null && /_{3,}/.test(String(spec.header || '')) ? lo.blank : null
  const bkLand = bk ? +bk.t + (bk.d != null ? +bk.d : 1.6) : 0
  if (bk) {
    const nextT = Math.min(...R.filter(r => r.T > bkLand - 0.3).map(r => r.T), Infinity)
    const prevLand = Math.max(...R.filter(r => r.land < bkLand).map(r => r.land), -Infinity)
    if (nextT - bkLand > 0.9 && bkLand - prevLand > 0.6) {
      keys.push({ t: bkLand - 0.14, pose: 'pointUp', d: 0.24, e: 'spring' })
      keys.push({ t: Math.min(bkLand + 1.3, nextT - 0.5), pose: 'idle', d: 0.45, e: 'inOut' })
    }
  }
  // an asked takeaway (morph.ask): he thinks over the two piles, crouches, and the answer knocks him into a jump
  if (moAsk != null) {
    keys.push({ t: moAsk + 0.08, pose: 'think', d: 0.3, e: 'spring' })
    if (hopOn) {                                               // the bigger hop: the payoff outranks the last count
      addHop(moT, 0.46, 70)
      keys.push({ t: moT + 1.0, pose: 'slump', d: 0.4, e: 'spring' })
    } else {
      keys.push({ t: moT - 0.24, pose: 'crouch', d: 0.16, e: 'inOut' })
      keys.push({ t: moT - 0.04, pose: 'shocked', d: 0.14, e: 'out' })
      keys.push({ t: moT + 0.75, pose: 'slump', d: 0.4, e: 'spring' })
    }
  }
  // lookOpts.beats: scripted reactions [{ t, act, d }] (a POSES name; 'cheer' = celebrate), held d s (default 1.2)
  for (const b of Array.isArray(lo.beats) ? lo.beats : []) {
    const act = b && (b.act === 'cheer' ? 'celebrate' : b.act)
    if (!b || b.t == null || !POSES[act]) continue
    keys.push({ t: +b.t, pose: act, d: 0.24, e: 'spring' })
    if (b.d !== null) keys.push({ t: +b.t + (b.d != null ? +b.d : 1.2), pose: 'idle', d: 0.45, e: 'inOut' })
  }
  const tr = poseTrack(keys)
  // the hops lift him off the ground (a parabola) on top of whatever pose the track holds
  const trF = !hops.length ? tr : {
    keys: tr.keys,
    at: t => {
      let lift = 0
      for (const hp of hops) lift += hop(t, hp.t0, hp.dur, hp.h)
      const p = tr.at(t)
      return lift ? { ...p, lift: (p.lift || 0) + lift } : p
    },
  }

  // coins stand in front of him, placed so the punch (or the chop) lands on the rim
  const Jat = t => fk(secondary(tr.at(t), t, { prev: tr.at(t - 0.07) }), { x: XF, scale: FIGK })
  for (const r of R) {
    const J = Jat(r.punch)
    // how far right his body reaches while he hits (head, front knee and foot, hips): the coin stays clear of it
    let body = -Infinity
    for (let k = -2; k <= 6; k++) {
      const Jk = Jat(r.punch + 0.02 * k)
      body = Math.max(body, Jk.head[0] + (r.mode === 'chop' ? 0 : Jk.R), Jk.kF[0], Jk.fF[0], Jk.hip[0])
    }
    body += 10
    r.cy = FLOOR - r.rw
    if (r.mode === 'punch') {
      // the rim point nearest his shoulder sits at 0.88 of his reach: a clean side punch, clear of his legs
      const Lc = 0.88 * reach + r.rw
      const uy = clamp((r.cy - J.sh[1]) / Lc, -0.9, 0.9), ux = Math.sqrt(1 - uy * uy)
      r.cx = Math.max(J.sh[0] + Lc * ux, body + r.rw)
      const dx = r.cx - J.sh[0], dy = r.cy - J.sh[1], dl = Math.hypot(dx, dy)
      r.contact = [r.cx - (r.rw * dx) / dl, r.cy - (r.rw * dy) / dl]
    } else {
      const ox = -0.3 * r.rw, oy = -0.954 * r.rw
      const ys = r.cy + oy - J.sh[1]
      r.cx = Math.max(J.sh[0] - ox + Math.sqrt(Math.max(0, (0.86 * reach) ** 2 - ys * ys)), body + r.rw)
      r.contact = [r.cx + ox, r.cy + oy - 3]
    }
    if (!showFig) r.contact = null
    // the price is the coin: its label repeats the HUD's working line, so it is decoration (it shrinks with the
    // camera); dropped when it would be too small to read even up close
    const fitPx = Math.min(r.rw * 0.62, (1.5 * r.rw) / Math.max(1, [...r.cost].length * 0.6))
    r.label$ = fitPx >= 24 ? r.cost : ''
    r.coin = coin(g.mid, { r: r.rw, text: r.label$ })
    r.coin.g.setAttribute('data-deco', '')
    r.dropH = FLOOR - VPtop + 40 + r.rw * 2
    r.dropT0 = r.coinLand - Math.sqrt((2 * r.dropH) / 5200)
  }

  // the row of piles: cheapest first, starting clear of the biggest coin; each gap grows with its pile
  let px = Math.max(...R.map(r => r.cx + r.rw)) + 46
  for (const r of R) {
    const W = pileW(r.units)
    if (r.i > 0) px += Math.max(46, 0.09 * W)
    r.px = px
    r.W = W; r.H = pileH(r.units)
    px += W
  }
  // the camera: fit the figure and the whole row so far (and anything taller standing in it)
  const topFit = VPtop + 44
  const fitZ = (r, n) => {
    let hMax = 300
    for (let k = 0; k < r.i; k++) hMax = Math.max(hMax, R[k].H)
    hMax = Math.max(hMax, pileH(n))
    return Math.min(1, (XR - FXS) / (r.px + pileW(n) - XF + 12), (FLOOR - topFit) / (hMax + 6))
  }
  for (const r of R) r.zEnd = fitZ(r, r.units)

  // build the piles: a soft base (far away) < two pattern fills (the level of detail cross-fades between them)
  // < ink outline (far away) < fractional unit
  const zLow = Math.min(...R.map(r => r.zEnd)) * 0.4
  const KMAX = clamp(Math.ceil(Math.log2(22 / (cw * zLow))) + 1, 1, 18)
  for (let k = 0; k <= KMAX; k++) lodPat(k)
  for (const r of R) {
    const gp = s('g', { transform: `translate(${r.px.toFixed(1)},${FLOOR})` })
    r.gp = gp
    r.flat = s('path', { fill: flatOf(iconName) })
    r.fills = [s('path', { fill: 'url(#ul-pat0)' }), s('path', { fill: 'url(#ul-pat1)', opacity: 0 })]
    r.edge = s('path', { fill: 'none', stroke: C.ink, 'stroke-linejoin': 'round' })
    gp.append(r.flat, ...r.fills, r.edge)
    if (r.hasPart) {
      const id = `ul-part${r.i}`
      defs.append(s('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }, s('rect', { x: (-cw / 2).toFixed(2), y: (-ch).toFixed(2), width: (r.frac * cw).toFixed(2), height: (2 * ch).toFixed(2) })))
      r.partId = id
      const c = cellOf(r.whole)
      r.part = use({ transform: `translate(${c[0].toFixed(1)},${c[1].toFixed(1)})`, 'clip-path': `url(#${id})`, opacity: 0 })
      gp.append(r.part)
    }
    g.mid.append(gp)
  }
  const flights = Array.from({ length: FPOOL }, () => use({ opacity: 0 }))
  g.front.append(...flights)
  // the flights: every unit of a small pile, an even sample of a big one, from the burst coin to its cell
  for (const r of R) {
    const rnd = rng(31 + 17 * r.i)
    const nInd = r.whole + (r.hasPart ? 1 : 0)
    const idx = nInd <= FPOOL ? [...Array(nInd).keys()] : Array.from({ length: KF }, (_, j) => Math.min(r.whole - 1, Math.floor(((j + 0.5) / KF) * r.whole)))
    r.indiv = nInd <= FPOOL
    r.fl = idx.map(k => {
      const tl = r.landT(k)
      const td = Math.min(tl - 0.14, Math.max(r.punch + 0.01 + rnd() * 0.05, tl - 0.42))
      const from = [r.cx + (rnd() - 0.5) * r.rw * 0.9, r.cy + (rnd() - 0.5) * r.rw * 0.9]
      const c = cellOf(k), to = [r.px + c[0], FLOOR + c[1]]
      const dist = Math.hypot(to[0] - from[0], to[1] - from[1])
      return { k, td, tl, from, to, hgt: 0.22 * dist + 60, spin: rnd() < 0.5 ? -360 : 360, partial: k >= r.whole }
    })
  }

  // ================================================================== figure, held unit
  const fig = showFig ? new Figure(g.fig, { scale: FIGK }) : null
  // the pencil sits tucked behind the ear here (54 deg above the backward horizontal, not 30): at the presenting
  // pose on frame 1 the library angle read as an arrow through the back of his head
  // pose (he looks up a lot here) only partly tilts it: it counter-rotates against 60% of the head's rotation
  let pin = null
  if (fig && fig.pencil && fig.pencil.firstChild) {
    const el = fig.pencil.firstChild, m = /translate\(([-\d.]+),0\)\s*rotate\(210\)/.exec(el.getAttribute('transform') || '')
    if (m) pin = { el, x: m[1] }
  }
  const held = intro && showFig ? use({ opacity: 0 }) : null
  if (held) g.front.append(held)

  // ================================================================== impacts, cues
  const fx = makeFx(world, ctx)
  const cam = camera(world, { fx: FXS, fy: FLOOR })
  const hud = h('div', { class: 'ul-hud' })
  const hudSvg = s('svg', { class: 'ul-fx', width: 1080, height: 1920, viewBox: '0 0 1080 1920', 'data-deco': '' })
  const hudG = s('g')
  hudSvg.append(hudG)
  const hudFx = makeFx({ g: { fx: hudG }, flash: h('div') }, ctx)
  if (intro) ctx.cue(R[0].T - 0.04, 'swipe', { gain: 0.4, dur: 0.18 })
  for (const r of R) {
    if (r.prefill) continue                                     // all of it happened before frame 1: no sound, no shake
    const zPrev = r.i ? R[r.i - 1].zEnd : 1
    if (r.push && zPrev < 0.55) ctx.cue(r.T, 'whoosh', { dur: r.push[1] + 0.1, gain: 0.3 })
    if (!r.placed) fx.impact(r.coinLand, { x: r.cx, y: FLOOR, burst: false, shake: 2 + 6 * r.e, cue: 'thud', gain: 0.4 + 0.35 * r.e })
    fx.impact(r.punch, { x: r.cx, y: r.cy, rx: r.rw + 8, ry: r.rw + 8, r: 0.45 * r.rw, lines: 12, shake: 4 + 6 * r.e, cue: 'hit', gain: 0.45 + 0.3 * r.e })
    if (r.whole > 1) ctx.cue(r.fill0, 'roll', { dur: r.fillDur, gain: 0.28 })
    if (r.last) fx.impact(r.land, { burst: false, shake: 14, flash: 0.4, punch: 0.03, cue: 'hit', gain: 0.9 })
    else ctx.cue(r.land, 'pop', { gain: 0.6 })
  }

  // ================================================================== HUD elements
  const itemEl = h('div', { class: 'ul-item', style: { fontSize: itemPx + 'px', lineHeight: lhI + 'px' } })
  const divEl = h('div', { class: 'ul-div', style: { fontSize: divPx + 'px', lineHeight: lhD + 'px', top: yDiv + 'px' } })
  const plate = h('div', { class: 'ul-plate' })
  hud.append(plate)
  const numO = new NumObj(hud, { cls: 'ul-num', text: '', ax: 0, ay: 0.864, style: { fontSize: cPx + 'px' } })
  const qO = new NumObj(hud, { cls: 'ul-num', text: '?', ax: 0, ay: 0.864, style: { fontSize: cPx + 'px', color: C.dim } })
  const labO = new NumObj(hud, { cls: 'ul-lab', text: '', ax: 0, ay: 0.837 })
  // the takeaway's label on two lines (moLines): its second line sits on the counter's label baseline
  const moLabO = moLines ? new NumObj(hud, { cls: 'ul-lab', html: true, text: moLines.join('\n'), ax: 0, ay: (1 + 0.837) / 2, style: { opacity: '0' } }) : null
  hud.append(itemEl, divEl, hudSvg)
  ctx.stage.append(hud)
  const blank = bk ? hookBlank(parts.header, bk, bkLand, ctx) : null
  const itemTop = tx => yItem + (itemLines - itemLinesOf(tx)) * lhI
  const padOf = r => (r && r.plate ? PLATE[0] + 6 : 0)
  const labXFor = (r, txt) => (labelBelow ? HX : HX + 2 * padOf(r) + digW(txt, cPx) + (r && r.plate ? 40 : 28))
  // the final plate box (round the last rung's digits)
  const plR = R.find(r => r.plate && r.last) || null
  const plBox = plR ? { x: HX, y: base - 0.727 * cPx - PLATE[1] - 6, w: digW(plR.digits, cPx) + 2 * padOf(plR), h: 0.727 * cPx + 2 * PLATE[1] + 12 } : null
  if (plBox) {
    style(plate, { width: plBox.w.toFixed(0) + 'px', height: plBox.h.toFixed(0) + 'px' })
    hudFx.impact(plR.land, { x: plBox.x + plBox.w / 2, y: plBox.y + plBox.h / 2, rx: plBox.w / 2 + 8, ry: plBox.h / 2 + 2, r: 17, lines: 12, shake: 0, cue: null })
  }
  // the morph: the plate shrinks round the takeaway (a second burst of hit lines round it as it lands)
  const moDigits = mo ? String(mo.display) : ''
  const moBox = mo && plBox ? { ...plBox, w: digW(moDigits, cPx) + 2 * padOf(plR) } : null
  const moDiv = mo ? (() => {
    const k = moWork.indexOf(' ÷ ')
    const body = k > 0 ? `<b>${esc(moWork.slice(0, k))}</b> ÷ ${esc(moWork.slice(k + 3))}` : `<b>${esc(moWork)}</b>`
    return `${body} <i class="${moOp === '≈' ? 'ap' : ''}">${moOp}</i>`
  })() : ''
  const moDivQ = moAsk != null ? moDiv.replace(/<i class="[^"]*">[^<]*<\/i>$/, '<i class="">=</i>') : ''
  // an asked takeaway is the climax: its number lands bigger than any count (up to 1.2x) on a plate of its own,
  // centred where the last count's plate was, clear of the working line above and the recap table below, with its
  // label still inside x 938. Its "?" waits flush left like a rung's; at morph.t the "?" is already out, the number
  // pops in on the hit, and the working's "=" turns into "≈" once the number is fully in (never "≈ ?")
  let moPx = cPx, moBase = base, moGap = 40
  const MO_Q = 0.096, MO_FULL = 0.048, MO_POP = 0          // "?" out before the hit; the number fully in; plate pop
  if (moAsk != null && plBox && !labelBelow) {
    const cy = base - 0.3635 * cPx
    const labWd = moLines ? Math.max(...moLines.map(labW)) : labW(moLabel)
    for (let px = Math.round(1.2 * cPx); px > cPx; px -= 2) {
      const b2 = cy + 0.3635 * px
      if (b2 - 0.864 * px >= yDiv + lhD + 4 && b2 + 0.136 * px <= VPtop + 6 && HX + 2 * padOf(plR) + digW(moDigits, px) + 32 + labWd <= 938) {
        moPx = px; moBase = b2; moGap = 32
        break
      }
    }
  }
  const moBig = moAsk != null && plBox ? { x: HX, y: moBase - 0.727 * moPx - PLATE[1] - 6, w: digW(moDigits, moPx) + 2 * padOf(plR), h: 0.727 * moPx + 2 * PLATE[1] + 12 } : null
  const moLabX = labelBelow ? HX : HX + 2 * padOf(plR) + digW(moDigits, moPx) + moGap
  const moNumO = moBig ? new NumObj(hud, { cls: 'ul-num', text: moDigits, ax: 0, ay: 0.864, style: { fontSize: moPx + 'px', color: C.ink, opacity: '0' } }) : null
  if (moBox) {
    const hb = moBig || moBox
    hudFx.impact(moT + (moBig ? 0.04 : 0.16), { x: hb.x + hb.w / 2, y: hb.y + hb.h / 2, rx: hb.w / 2 + 8, ry: hb.h / 2 + 2, r: 17, lines: 12, shake: 0, cue: null })
    if (moAsk == null) ctx.cue(moT + 0.1, 'pop', { gain: 0.5 })
    else {
      // asked: the question swaps in like a rung's cut, the answer lands as the climax (hit, shake, flash, punch)
      ctx.cue(moAsk, 'whoosh', { dur: 0.3, gain: 0.3 })
      fx.impact(moT, { burst: false, shake: 10, flash: 0.3, punch: 0.025, cue: 'hit', gain: 0.85 })
    }
  }

  // the hook's month: a calendar grid beside the first count, its days filling in step with the header's ordinals
  let cal = null
  if (bk && bk.calendar) {
    const days = clamp(Math.round(+bk.calendar) || 30, 28, 31), COLS = 7, rows = Math.ceil(days / COLS)
    const cs = 26, cg = 6, pitch = cs + cg, bind = 14
    const w = COLS * pitch - cg, hh = rows * pitch - cg + bind
    const x0 = 934 - w, y0 = Math.round(base - hh)
    const gC = s('g', { 'data-deco': '', opacity: 0 })
    gC.append(s('rect', { x: x0, y: y0, width: w, height: 8, rx: 4, fill: C.ink }))
    const cells = []
    for (let k = 0; k < days; k++) {
      const c = s('rect', { x: x0 + (k % COLS) * pitch, y: y0 + bind + Math.floor(k / COLS) * pitch, width: cs, height: cs, rx: 6, fill: C.lineSoft, stroke: C.line, 'stroke-width': 2 })
      gC.append(c)
      cells.push(c)
    }
    hudSvg.append(gC)
    const target = Math.max(1, Math.min(days, Math.round(num(String(bk.text).replace(/[^\d.,]/g, '')) || 1)))
    const end = R[1] ? R[1].T : Infinity
    // the calendar clears the first count's label (else it stays off)
    const labEnd = labXFor(R[0], R[0].digits) + labW(R[0].label)
    cal = labEnd + 24 <= x0 ? { g: gC, cells, target, t0: +bk.t, d: Math.max(0.3, bkLand - +bk.t), end } : null
    if (!cal) gC.remove()
  }

  const duration = durationOf(spec, R[N - 1].land + 0.6, hold)

  // the figure never shrinks to a speck (see seekFigure)
  const FIG_MIN = 150, figPx = 262 * FIGK
  const figKAt = z => FIGK * Math.max(1, FIG_MIN / (figPx * z))
  const figXAt = z => XF - (1 - clamp(figPx * z / FIG_MIN)) * 48 / z

  // ================================================================== the asked takeaway's two piles, side by side
  // morph.ask + compare (morph.beside, default on): from the ask, the smaller compared pile hops over the piles between
  // the two to stand beside the bigger one, and those piles shuffle along into the room it left (every gap keeps its
  // width), so the two divided piles stand side by side. The recap table is fitted to both layouts.
  let beside = null
  if (moAsk != null && moCmp && mo.beside !== false) {
    const [a, b] = [...moCmp].filter(k => Number.isInteger(k) && k >= 0 && k < N).sort((x, y) => x - y)
    if (moCmp.size === 2 && b != null && b - a >= 2 && R[a].units < R[b].units) {
      const gapB = R[b].px - (R[b - 1].px + R[b - 1].W)
      beside = { a, b, delta: R[a + 1].px - R[a].px, to: R[b].px - gapB - R[a].W, t0: moAsk + 0.2, d: 0.55, hgt: 0, k: 1, S: FXS }
    }
  }
  const pxAfter = r => (!beside ? r.px : r.i === beside.a ? beside.to : r.i > beside.a && r.i < beside.b ? r.px - beside.delta : r.px)

  // ================================================================== the ladder recap: one complete list
  // Once the last pile has landed the camera steps back a little and a recap table pops in under the counter: one
  // row per rung, biggest first (a leaderboard: the piles below read right to left down the table), the count
  // right-aligned in its column (ink, 40 px) and the pile's name after it (grey, 40 px). A long name wraps to a
  // second line; only when even that does not fit is it cut at a word with an ellipsis. Every rung gets its row: a
  // count never appears without its name, and no rung is dropped. Thin leaders run from the rows' ends to their piles'
  // apexes only when every row's line is clean (it crosses no other row, leader, pile or the figure). The table takes one
  // column when it fits above the piles, else two (read row by row or column by column, whichever keeps the names
  // whole); the step back (1 -> 0.4) is the gentlest that clears every pile and the figure.
  const tags = []
  let tagStep = 1, recapBot = VPtop
  const RP = 40, RPITCH = 50, RGAP = 16, CGAP = 36, RTOP = 10
  if (lo.pileLabels !== false && N >= 2) {
    const custom = Array.isArray(lo.pileLabels) ? lo.pileLabels : null
    const order = R.map((_, k) => k).sort((a, b) => R[b].units - R[a].units || b - a)      // biggest first
    const fC = `900 ${RP}px ${F.head}`, fN = `800 ${RP}px ${F.head}`
    // the "≈" gets its own left-aligned slot before the right-aligned counts, so the signs line up in a column
    const memo = new Map()
    const wC = str => measure(str, fC, { letterSpacing: '-0.03em' })
    const aw = R.some(r => r.approx) ? Math.ceil(measure('≈', fC) + 10) : 0
    const wN = str => { if (!memo.has(str)) memo.set(str, measure(str, fN, { letterSpacing: '-0.01em' })); return memo.get(str) }
    const nameOf = k => (custom && custom[k] != null ? String(custom[k]) : shortName(R[k].item))
    // cut at a word boundary with an ellipsis (never mid-word); the first word alone as the very last resort
    const cut = (str, W) => {
      if (wN(str) <= W) return str
      const ws = str.split(/\s+/)
      for (let n = ws.length - 1; n >= 1; n--) { const c = ws.slice(0, n).join(' ').replace(/[,;:.\-–]+$/, '') + '…'; if (wN(c) <= W) return c }
      return ws[0] + (ws.length > 1 ? '…' : '')
    }
    // a name in width W: one line, else two balanced lines, else two lines with the second cut
    const nameLines = (str, W, maxL = 2) => {
      if (wN(str) <= W) return { lines: [str], ell: 0 }
      if (maxL < 2) return { lines: [cut(str, W)], ell: 1 }
      const ws = str.split(/\s+/)
      let best = null
      for (let a2 = 1; a2 < ws.length; a2++) {
        const l1 = ws.slice(0, a2).join(' '), l2 = ws.slice(a2).join(' ')
        if (wN(l1) > W || wN(l2) > W) continue
        // balanced, the first line the longer one, and no line starting with a little word ("Month / of Netflix")
        const cost = Math.max(wN(l1), wN(l2)) + (wN(l2) > wN(l1) ? 40 : 0) + (/^(of|at|for|in|on|the|a|an|to|and|per)$/i.test(ws[a2]) ? 200 : 0)
        if (!best || cost < best.m) best = { lines: [l1, l2], m: cost }
      }
      if (best) return { lines: best.lines, ell: 0 }
      for (let a2 = ws.length - 1; a2 >= 1; a2--) { const l1 = ws.slice(0, a2).join(' '); if (wN(l1) <= W) return { lines: [l1, cut(ws.slice(a2).join(' '), W)], ell: 1 } }
      return { lines: [cut(str, W)], ell: 1 }
    }
    const top = VPtop + RTOP
    // ---- candidate tables (they do not depend on the camera): one column, or two with every split and width share
    const cands = []
    // al: the "≈" in its own slot (in a column that has one); else glued to its count, as the fallback when the
    // slot costs a name its line
    const build = (colsK, x0 = HX, maxL = 2, al = false) => {
      const caw = colsK.map(ks => (al && ks.some(k => R[k].approx) ? aw : 0))
      const cws = colsK.map((ks, c) => caw[c] + Math.max(...ks.map(k => wC(caw[c] ? R[k].digits : R[k].disp))))
      const avail = 938 - x0 - (colsK.length - 1) * CGAP - cws.reduce((x, y) => x + y, 0) - colsK.length * RGAP
      const shares = colsK.length === 1 ? [[avail]] : (() => { const o = []; for (let w1 = 150; w1 <= avail - 150; w1 += 10) o.push([w1, avail - w1]); return o })()
      for (const nm of shares) {
        let x = x0, ell = 0, wraps = 0, hMax = 0
        const rows = []
        colsK.forEach((ks, c) => {
          let y = top, wMax = 0
          for (const k of ks) {
            const nl = nameLines(nameOf(k), nm[c], maxL)
            ell += nl.ell; wraps += nl.lines.length - 1
            const w = cws[c] + RGAP + Math.max(...nl.lines.map(wN))
            rows.push({ k, x, y, lines: nl.lines, cwid: cws[c], aw: caw[c], box: { x0: x, y0: y, x1: x + w, y1: y + nl.lines.length * RPITCH - 2 } })
            wMax = Math.max(wMax, w)
            y += nl.lines.length * RPITCH
          }
          hMax = Math.max(hMax, y - top)
          x += wMax + CGAP
        })
        cands.push({ cols: colsK.length, rows, ell, wraps, hMax, al: caw.some(Boolean) })
      }
    }
    for (const al of aw ? [true, false] : [false]) {
      for (const maxL of [2, 1]) {
        build([order], HX, maxL, al)
        build([order], FXS + 50, maxL, al)                    // one column beside the figure: it may reach lower
      }
      if (N >= 3) {
        const half = Math.ceil(N / 2)
        for (const s1 of [half, half - 1, half + 1].filter(v => v >= 1 && v < N)) {
          build([order.slice(0, s1), order.slice(s1)], HX, 2, al)                                     // column by column
          build([order.filter((_, j) => j % 2 === 0), order.filter((_, j) => j % 2 === 1)], HX, 2, al)    // row by row
        }
      }
    }
    // the gentlest wins: whole names first, then fewer lines, then the "≈" in its own slot, then fewer wraps
    cands.sort((p, q) => p.ell - q.ell || p.cols - q.cols || q.al - p.al || p.hMax - q.hMax || p.wraps - q.wraps)
    const figTopAt = z => FLOOR - Math.max(FIG_MIN, figPx * z) - 34
    const inTri = (p, [a2, b2, c2]) => {
      const sg = (p1, p2, p3) => (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
      const d1 = sg(p, a2, b2), d2 = sg(p, b2, c2), d3 = sg(p, c2, a2)
      return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
    }
    const boxHitsTri = (q, T) => {
      if (T[2][0] >= q.x0 - 8 && T[2][0] <= q.x1 + 8 && T[2][1] >= q.y0 && T[2][1] <= q.y1 + 10) return true
      for (let u = 0; u <= 16; u++) { const x = q.x0 - 8 + (q.x1 - q.x0 + 16) * u / 16; if (inTri([x, q.y1 + 10], T) || inTri([x, q.y0], T)) return true }
      return false
    }
    const segHitsBox = (a2, b2, q, m = 6) => { for (let u = 0; u <= 40; u++) { const x = lerp(a2[0], b2[0], u / 40), y = lerp(a2[1], b2[1], u / 40); if (x > q.x0 - m && x < q.x1 + m && y > q.y0 - m && y < q.y1 + m) return true } return false }
    const cross = (p1, p2, p3, p4) => {
      const d = (a2, b2, c2) => (b2[0] - a2[0]) * (c2[1] - a2[1]) - (b2[1] - a2[1]) * (c2[0] - a2[0])
      return d(p1, p2, p3) * d(p1, p2, p4) < 0 && d(p3, p4, p1) * d(p3, p4, p2) < 0
    }
    const trisAt = step => {
      tagStep = step
      const zF = zoomAt(R[N - 1].land + 1.4)
      return { zF, tris: R.map(r => triOf(r, r.px, FXS, zF)) }
    }
    // a pile's screen triangle [left foot, right foot, apex] with its left edge at world x px0 (camera fxs, z)
    const triOf = (r, px0, fxs, z) => {
      const scr = (wx, wy) => [fxs + (wx - XF) * z, FLOOR + (wy - FLOOR) * z]
      const B = Math.max(1, Bc(r.units)), W = (B + 1) * cw, H = pileH(r.units)
      return [scr(px0, FLOOR), scr(px0 + W, FLOOR), scr(px0 + B * cw / 2 + cw / 2, FLOOR - H)]
    }
    // morph.beside: the piles after the move must clear every row by a wide margin (a pile's apex beside a row's
    // end reads as its leader). If they do not, the camera also steps back about the bigger pile's right foot (k)
    const besideK = (cd, zF) => {
      const S = FXS + (R[beside.b].px + R[beside.b].W - XF) * zF
      for (const k of [1, 0.97, 0.94, 0.91, 0.88, 0.85]) {
        const ts = R.map(r => triOf(r, pxAfter(r), S - (S - FXS) * k, zF * k))
        if (cd.rows.every(row => { const q = { x0: row.box.x0 - 8, y0: row.box.y0 - 8, x1: row.box.x1 + 30, y1: row.box.y1 + 26 }; return !ts.some(T => boxHitsTri(q, T)) })) return k
      }
      return null
    }
    const fits = (cd, step) => {
      const { zF, tris } = trisAt(step)
      const fy = figTopAt(zF)
      for (const r of cd.rows) {
        if (r.box.y1 > FLOOR - 24) return null
        if (r.box.y1 > fy && r.box.x0 < FXS + 40) return null
        for (const T of tris) if (boxHitsTri(r.box, T)) return null
      }
      const bk = beside ? besideK(cd, zF) : 1
      if (bk == null) return null
      // leaders: from a row's end to its apex, only where the straight line is clean
      const tb = { x0: HX - 6, y0: top, x1: Math.max(...cd.rows.map(r => r.box.x1)) + 6, y1: Math.max(...cd.rows.map(r => r.box.y1)) }
      const figBox = { x0: 30, y0: fy, x1: FXS + 40, y1: FLOOR }
      const segs = [], leads = new Map()
      for (const r of cd.rows) {
        const T = tris[r.k], apex = [T[2][0], T[2][1] - 6]
        const a2 = [r.box.x1 + 12, r.y + RPITCH / 2 - 1]
        const len = Math.hypot(apex[0] - a2[0], apex[1] - a2[1])
        if (len < 24 || (apex[0] < a2[0] + 16 && apex[1] < a2[1] + 30)) continue
        if (cd.rows.some(q => q !== r && segHitsBox(a2, apex, q.box, 10))) continue
        if (segHitsBox(lerp2(a2, apex, Math.min(0.5, 14 / len)), apex, tb, 2)) continue      // never back through the table
        if (segHitsBox(a2, apex, figBox, 4)) continue
        if (tris.some((T2, j) => j !== r.k && (() => { for (let u = 1; u < 30; u++) if (inTri(lerp2(a2, apex, u / 30), T2)) return true; return false })())) continue
        if (segs.some(sg => cross(a2, apex, sg[0], sg[1]))) continue
        segs.push([a2, apex]); leads.set(r, [a2, apex])
      }
      // all or none: a lone leader reads as a stray stroke pointing at one pile
      if (leads.size < cd.rows.length) leads.clear()
      return { step, cd, leads, bk }
    }
    let pick = null
    const tiers = [[c => !c.ell && c.cols === 1, [1, 0.9, 0.8, 0.7, 0.6]], [c => !c.ell, [1, 0.9, 0.8, 0.7, 0.6]],
      [c => !c.ell, [0.52, 0.45, 0.4]], [() => true, [1, 0.9, 0.8, 0.7, 0.6, 0.52, 0.45, 0.4]]]
    const search = () => {
      for (const [ok, steps] of tiers) {
        for (const cd of cands) { if (!ok(cd)) continue; for (const st of steps) { pick = fits(cd, st); if (pick) return } }
      }
    }
    search()
    if (!pick && beside) { beside = null; search() }          // the moved piles would hit the table: they stay put
    if (!pick) { console.warn('unit-ladder: the recap table overlaps the piles at every step back'); pick = { step: 0.4, cd: cands[0], leads: new Map() } }
    tagStep = pick.step
    if (beside) beside.k = pick.bk
    recapBot = Math.max(...pick.cd.rows.map(r => r.box.y1))
    const t0 = R[N - 1].land + 1.0
    pick.cd.rows.forEach((r, j) => {
      const sg = r.aw ? h('span', { class: 'a', style: { width: r.aw + 'px' } }, R[r.k].approx ? '≈' : '') : null
      const cn = h('span', { class: 'c', style: { width: (r.cwid - r.aw).toFixed(0) + 'px' } }, r.aw ? R[r.k].digits : R[r.k].disp)
      const el = h('div', { class: 'ul-row', style: { opacity: '0', transform: `translate(${r.x}px,${r.y}px)` } },
        ...(sg ? [sg] : []), cn,
        h('span', { class: 'n', style: { marginLeft: RGAP + 'px' } }, ...r.lines.flatMap((ln, q) => (q ? [h('br'), ln] : [ln]))))
      hud.append(el)
      let line = null
      const ld = pick.leads.get(r)
      if (ld) {
        const [a2, b2] = ld, len = Math.hypot(b2[0] - a2[0], b2[1] - a2[1])
        line = s('line', { x1: a2[0].toFixed(1), y1: a2[1].toFixed(1), x2: b2[0].toFixed(1), y2: b2[1].toFixed(1), stroke: C.line, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-dasharray': len.toFixed(1), opacity: 0 })
        line.__len = len
        hudG.append(line)
      }
      tags.push({ el, cnt: sg ? [sg, cn] : [cn], line, k: r.k, t0: t0 + 0.08 * j })
    })
    ctx.cue(t0, 'tick', { gain: 0.3 })
  }
  if (beside) {
    // the hop: about 80 px high on screen, never up into the recap table; it lands with a squash and a thud
    const ra = R[beside.a], zA = zoomAt(beside.t0)
    beside.S = FXS + (R[beside.b].px + R[beside.b].W - XF) * zA         // the camera's step back keeps this x put
    const room = FLOOR - ra.H * zA - (recapBot + 14)
    beside.hgt = clamp(room, 24, 80) / zA
    beside.land = beside.t0 + beside.d
    g.mid.append(ra.gp)                                        // it travels in front of the piles it hops over
    fx.impact(beside.land, { x: beside.to + ra.W / 2, y: FLOOR, burst: false, shake: 3, cue: 'thud', gain: 0.35 })
  }
  // where a pile stands at t: [dx, lift, sx, sy] in world px (morph.beside moves them; else [0, 0, 1, 1])
  const STAY = [0, 0, 1, 1]
  const pileAt = (r, t) => {
    if (!beside || t < beside.t0) return STAY
    const p = prog(t, beside.t0, beside.d)
    if (r.i === beside.a) {
      if (p < 1) return [(beside.to - r.px) * E.inOutSine(p), 4 * beside.hgt * p * (1 - p), 1 - 0.05 * Math.sin(Math.PI * p), 1 + 0.08 * Math.sin(Math.PI * p)]
      const q = squashAt(t, beside.land, 0.2)
      return [beside.to - r.px, 0, q.sx, q.sy]
    }
    if (r.i > beside.a && r.i < beside.b) return [-beside.delta * E.inOut(p), 0, 1, 1]
    return STAY
  }
  // a pre-filled first pile: frame 1 frames him and his pile as one group, centred (same zoom); the camera pans back
  // to his usual spot as the next cut pushes in on him
  let pan0 = 0
  if (R[0].prefill) {
    const z0 = zoomAt(0)
    let x0w = R[0].px
    if (fig) x0w = Math.min(x0w, fig.extentX(fig.pose(0, trF, { x: figXAt(z0), ground: FLOOR, noDraw: true, scale: figKAt(z0), stroke: Math.max(S.figure, S.figure / z0) }))[0])
    const left = FXS + (x0w - XF) * z0, right = FXS + (R[0].px + R[0].W - XF) * z0
    pan0 = Math.max(0, Math.min(540 - (left + right) / 2, XR - right))
  }
  const panAt = t => (!pan0 ? 0 : N < 2 ? pan0 : pan0 * (1 - E.inOut(prog(t, R[1].push[0], R[1].push[1]))))
    + (beside && beside.k < 1 ? (beside.S - FXS) * (1 - besideCam(t)) : 0)

  // ================================================================== seek
  function zoomAt(t) {
    let z = 1
    for (const r of R) {
      if (t < r.T) break
      if (r.push) z = Math.exp(lerp(Math.log(z), 0, E.inOut(prog(t, r.push[0], r.push[1]))))
      else z = 1
      if (t >= r.punch) {   // pull back after the punch, following the units out to the end of the row
        const w = E.inOut(prog(t, r.punch + 0.06, r.pull))
        if (w > 0) z = Math.exp(lerp(Math.log(z), Math.log(Math.min(z, fitZ(r, nAt(r, t)))), w))
      }
    }
    // after the last pile lands the camera steps back once more, leaving sky above every pile for its tag
    const L2 = R[N - 1]
    if (tagStep < 1 && t > L2.land + 0.3) z *= lerp(1, tagStep, E.inOut(prog(t, L2.land + 0.3, 0.7)))
    return z * besideCam(t)
  }
  // morph.beside's camera: a small step back (k) about the bigger pile's right foot while the piles move
  function besideCam(t) {
    return beside && beside.k < 1 ? lerp(1, beside.k, E.inOut(prog(t, beside.t0, beside.d))) : 1
  }

  function seekPiles(t, z, cur, fxs) {
    // level of detail: the smallest level whose icon is >= 22 px on screen; just past a threshold the next level
    // cross-fades in (over 0.2 of a level, a fraction of a second of camera pull)
    const kf = Math.max(0, Math.log2(22 / (cw * z)))
    const a = Math.min(KMAX, Math.floor(kf)), wB = a >= KMAX ? 0 : smooth(0, 0.2, kf - Math.floor(kf))
    const far = clamp(kf / 0.6)                                    // 0 up close (the true brick pile) -> 1 one level out
    const smoothEdge = ch * z < 9
    for (const r of R) {
      const n = t < r.fill0 ? 0 : nAt(r, t - SETTLE)
      const p = pilePath(n, smoothEdge)
      attr(r.fills[0], 'd', p); attr(r.fills[1], 'd', p); attr(r.flat, 'd', p); attr(r.edge, 'd', p)
      attr(r.fills[0], 'fill', `url(#ul-pat${a})`); attr(r.fills[1], 'fill', `url(#ul-pat${Math.min(KMAX, a + 1)})`)
      attr(r.fills[0], 'opacity', (1 - wB).toFixed(3)); attr(r.fills[1], 'opacity', wB.toFixed(3))
      attr(r.flat, 'opacity', far.toFixed(3))
      attr(r.edge, 'opacity', (0.9 * far).toFixed(3))
      attr(r.edge, 'stroke-width', (3 / z).toFixed(2))
      if (r.part) attr(r.part, 'opacity', t >= r.land + SETTLE ? '1' : '0')
      // an earlier pile fades out as the camera's push-in takes it past the top of the stage or the right edge, and
      // back in as the pull-back brings it home (never sliced flat by the frame)
      const [dx, lift, psx, psy] = pileAt(r, t)
      if (beside) {
        const hw = r.W / 2
        attr(r.gp, 'transform', `translate(${(r.px + dx + hw).toFixed(1)},${(FLOOR - lift).toFixed(1)}) scale(${psx.toFixed(3)},${psy.toFixed(3)}) translate(${(-hw).toFixed(1)},0)`)
      }
      let fa = 1
      if (r.i < cur && n > 0) {
        const top = FLOOR - pileH(n) * z, right = fxs + (r.px + dx + pileW(n) - XF) * z
        fa = Math.min(smooth(VPtop - 8, VPtop + 44, top), smooth(1112, 1046, right))
      }
      // morph.compare: from the ask the piles it does not divide dim, so the two it does stand alone
      if (moCmp && !moCmp.has(r.i)) fa *= 1 - 0.8 * E.inOut(prog(t, moFrom, 0.35))
      attr(r.gp, 'opacity', fa.toFixed(3))
    }
  }

  function seekFlights(t, cur) {
    const r = cur >= 0 && t >= R[cur].punch && t < R[cur].land + SETTLE + 0.05 ? R[cur] : null
    for (let j = 0; j < FPOOL; j++) {
      const el = flights[j]
      const f = r && r.fl[j]
      if (!f || t < f.td || t >= f.tl + SETTLE) { attr(el, 'opacity', '0'); continue }
      let tf
      if (t < f.tl) {
        const p = prog(t, f.td, f.tl - f.td)
        const [x, y] = arc(E.inOutSine(p), f.from, f.to, f.hgt)
        const k = 0.6 + 0.4 * E.out(clamp(p * 3))
        tf = `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(f.spin * (1 - p)).toFixed(1)}) scale(${k.toFixed(3)})`
      } else {
        const q = squashAt(t, f.tl, 0.3)
        tf = `translate(${f.to[0].toFixed(1)},${(f.to[1] + ch / 2).toFixed(1)}) scale(${q.sx.toFixed(3)},${q.sy.toFixed(3)}) translate(0,${(-ch / 2).toFixed(1)})`
      }
      attr(el, 'transform', tf)
      attr(el, 'opacity', '1')
      attr(el, 'clip-path', f.partial ? `url(#${r.partId})` : 'none')
    }
  }

  function seekCoins(t, z) {
    for (const r of R) {
      const c = r.coin
      if (t >= r.punch + 0.09 || (!r.placed && t < r.dropT0)) { c.set({ opacity: 0 }); continue }
      let y = r.cy, sx = 1, sy = 1, op = 1, rot = 0, k = 1
      if (!r.placed) {
        const f = fall(t, r.dropT0, r.dropH, { e: 0.24, n: 2 })
        y = r.cy - f.y
        for (const hh of f.hits) if (t >= hh) { const q = squashAt(t, hh, 0.2); sx *= q.sx; sy *= q.sy }
        rot = wobble(t, r.coinLand, 5, 2.2, 5)
      }
      if (t >= r.punch) { const p = prog(t, r.punch, 0.09); k = 1 + 0.22 * p; op = 1 - p }
      else if (t > r.punch - 0.12) { const q = E.in(prog(t, r.punch - 0.12, 0.12)); sx *= 1 - 0.04 * q; sy *= 1 + 0.03 * q }
      const topS = FLOOR + z * (y - r.rw - FLOOR)                 // its label shows once it is fully in view
      c.set({ x: r.cx, y: y + r.rw * (1 - sy), r: r.rw * k, sx, sy, rot, opacity: op, text: topS >= VPtop + 30 ? r.label$ : '' })
    }
  }

  // He never shrinks to a speck: once the camera pulls back past the point where he would be under ~96 px on
  // screen, he is drawn bigger in the world (same pose, constant 13 px line on screen) and eases a little left, so
  // he stands at the foot of the row, looking up at the mountain he made.
  function seekFigure(t, z) {
    if (!fig) return
    const kz = figKAt(z), xz = figXAt(z)
    let J = fig.pose(t, trF, { x: xz, ground: FLOOR, noDraw: true, scale: kz, stroke: Math.max(S.figure, S.figure / z) })
    for (const r of R) {
      if (!r.contact || t < r.punch - 0.09 || t > r.punch + 0.17) continue
      const w = t < r.punch ? E.out(prog(t, r.punch - 0.09, 0.09)) : 1 - E.inOut(prog(t, r.punch + 0.05, 0.12))
      J = blendJ(J, pinLimb({ ...J }, 'hF', r.contact, 1), w)
    }
    // a hop's touchdown squashes him about his feet
    let sqx = 1, sqy = 1
    for (const hp of hops) { const q = squashAt(t, hp.t0 + hp.dur, 0.16); sqx *= q.sx; sqy *= q.sy }
    fig.draw(J, { stroke: Math.max(S.figure, S.figure / z), sx: sqx, sy: sqy })
    if (pin) attr(pin.el, 'transform', `translate(${pin.x},0) rotate(${(234 - 0.6 * J.headRot).toFixed(1)})`)
    if (held) {
      const rel = R[0].T - 0.02
      if (t < rel) {
        attr(held, 'transform', `translate(${(J.hF[0] + 6).toFixed(1)},${(J.hF[1] - ch * 0.42).toFixed(1)}) rotate(${(-8 + 4 * Math.sin(t * 2.4)).toFixed(1)})`)
        attr(held, 'opacity', '1')
      } else {
        const dt = t - rel
        const x = J.hF[0] + 6 + 520 * dt, y = J.hF[1] - ch * 0.42 - 2100 * dt + 0.5 * 3600 * dt * dt
        attr(held, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(-8 + 540 * dt).toFixed(1)})`)
        attr(held, 'opacity', dt < 0.7 ? '1' : '0')
      }
    }
  }

  function seekHud(t, cur) {
    // ---- item + working line: swap at the rung's beat
    const first = cur === 0 && !intro
    const sw = cur < 0 || first ? STILL : swapK(t, R[cur].T, itemPx)
    const prevItem = cur <= 0 ? introItem : R[cur - 1].item
    const it = cur < 0 ? introItem : sw.phase ? R[cur].item : prevItem
    setText(itemEl, it)
    style(itemEl, { top: itemTop(it) + 'px', opacity: sw.op.toFixed(3), transform: `scale(${sw.sx.toFixed(3)},${sw.sy.toFixed(3)})` })
    let dHTML = introDiv, ds = STILL
    if (cur >= 0) {
      const r = R[cur], pr = cur > 0 ? R[cur - 1] : null
      ds = first ? STILL : swapK(t, r.T, divPx)             // one swap timeline: item, working line, counter
      const landed = t >= r.land
      dHTML = ds.phase ? divHTML(r.cost, landed && r.approx ? '≈' : '=', landed && r.approx) : pr ? divHTML(pr.cost, pr.approx ? '≈' : '=', pr.approx) : introDiv
    }
    setHTML(divEl, dHTML)
    style(divEl, { opacity: ds.op.toFixed(3), transform: `scale(${ds.sx.toFixed(3)},${ds.sy.toFixed(3)})` })

    // ---- counter: old value -> "?" (at the beat) -> rolling count (at the punch) -> lands, bumps
    let numTxt = '', numOp = 0, nsx = 1, nsy = 1, ncol = C.heroInk, qOp = 0, qs = 1, labTxt = '', labOp = 0, nr = null, lx = HX
    if (cur < 0) { numTxt = '1'; numOp = 1; labTxt = labelOne; labOp = 1; lx = labXFor(null, '1') }
    else {
      const r = R[cur]
      if (t < r.punch) {
        const a = r.placed || first ? STILL : swapK(t, r.T, cPx)
        if (!a.phase) {
          const pr = cur > 0 ? R[cur - 1] : null
          nr = pr; numTxt = pr ? pr.digits : '1'; ncol = pr ? numColor(pr) : C.heroInk
          numOp = a.op; nsx = a.sx; nsy = a.sy
          labTxt = pr ? pr.label : labelOne; labOp = a.op; lx = labXFor(pr, numTxt)
        } else { qOp = a.op; qs = a.sx; labTxt = r.label; labOp = a.op; lx = labXFor(null, '?') }
      } else {
        const b = swapK(t, r.punch, cPx, 0.2)
        if (!b.phase) { qOp = b.op; qs = b.sx; labTxt = r.label; labOp = 1; lx = labXFor(null, '?') }
        else {
          nr = r
          numTxt = t >= r.land ? r.digits : rollTo(nAt(r, t) / Math.max(1e-9, r.units), 0, r.digits)
          const bump = 1 + wobble(t, r.land, r.last ? 0.08 : 0.06, 2.4, 7)
          numOp = b.op; nsx = b.sx * bump; nsy = b.sy * bump; ncol = r.plate && t < r.land ? C.heroInk : numColor(r)
          labTxt = r.label; labOp = 1; lx = labXFor(r, r.digits)     // where it lands (the digits roll in its slot)
        }
      }
    }
    // a rolling count is right-aligned in its final slot, so neither it nor its label slides when it lands
    let nx = HX + padOf(nr)
    if (nr && cur >= 0 && nr === R[cur] && t < nr.land && numTxt) nx += digW(nr.digits, cPx) - digW(numTxt, cPx)
    let qx = HX + (cur >= 0 ? padOf(R[cur]) : 0)
    // the morph: one swap from the last answer to the takeaway (working line, plate, label)
    let mw = 0, plOp = 1, plSc = 1, moOn = null, ly = yLabBase
    const asked = moAsk != null && t >= moAsk
    if (asked) {
      // the asked takeaway: a cut like a rung's (item, working "… =", "?" flush left with the label after it, the
      // plate pops out), then the answer lands on a fresh, bigger plate at morph.t and the label moves beside it (the
      // working's "=" turns into "≈" once the answer is fully in)
      if (moItem) {
        const si = swapK(t, moAsk, itemPx)
        const it2 = si.phase ? moItem : R[N - 1].item
        setText(itemEl, it2)
        style(itemEl, { top: itemTop(it2) + 'px', opacity: si.op.toFixed(3), transform: `scale(${si.sx.toFixed(3)},${si.sy.toFixed(3)})` })
      }
      const md = t < moT ? swapK(t, moAsk, divPx) : STILL
      if (t >= moT + MO_FULL) setHTML(divEl, moDiv)
      else if (md.phase) setHTML(divEl, moDivQ)
      style(divEl, { opacity: md.op.toFixed(3), transform: `scale(${md.sx.toFixed(3)},${md.sy.toFixed(3)})` })
      const mS = moT - MO_Q
      if (t < mS) {
        const a = swapK(t, moAsk, cPx)
        if (!a.phase) { numOp = a.op; nsx = a.sx; nsy = a.sy; labOp = a.op }
        else { numOp = 0; qOp = a.op; qs = a.sx; qx = HX; labTxt = moLabel; lx = labXFor(null, '?'); labOp = a.op }
        const out = prog(t, moAsk, 0.14)
        plOp = 1 - out; plSc = 1 - 0.25 * E.in(out)
      } else {
        // the "?" squashes out just before the hit; the answer pops in on it, on its own bigger plate
        const m = swapK(t, mS, moPx)
        numOp = 0; labTxt = moLabel; labOp = 1
        if (!m.phase) { qOp = m.op; qs = m.sx; qx = HX; lx = labXFor(null, '?') }
        else { moOn = m; lx = moLabX; ly = labelBelow ? yLabBase + moBase - base : moBase }
        plOp = 0
      }
    } else if (mo && t >= moT) {
      const m = swapK(t, moT, cPx)
      const md = swapK(t, moT, divPx)
      if (md.phase) setHTML(divEl, moDiv)
      style(divEl, { opacity: md.op.toFixed(3), transform: `scale(${md.sx.toFixed(3)},${md.sy.toFixed(3)})` })
      if (m.phase) {
        numTxt = moDigits; ncol = C.ink; nx = HX + padOf(plR); labTxt = String(mo.label || ''); labOp = m.op
        lx = labXFor(plR, moDigits)
      }
      numOp = m.op; nsx = m.sx; nsy = m.sy; labOp = m.op
      mw = E.inOut(prog(t, moT + 0.06, 0.26))
    }
    numO.set({ x: nx, y: base, sx: nsx, sy: nsy, opacity: numOp, text: numTxt, color: ncol })
    qO.set({ x: qx, y: base, sx: qs, sy: qs, opacity: qOp })
    // the takeaway's two-line label (moLines) stands in for the one-line label
    const two = moLabO && labTxt === moLabel && labOp > 0
    labO.set({ x: lx, y: ly, opacity: two ? 0 : labOp, text: two ? '' : labTxt })
    if (moLabO) moLabO.set({ x: lx, y: ly, opacity: two ? labOp : 0 })
    if (moNumO) moNumO.set({ x: HX + padOf(plR), y: moBase, sx: moOn ? moOn.sx : 1, sy: moOn ? moOn.sy : 1, opacity: moOn ? moOn.op : 0 })
    if (plBox && moBig) {
      // the asked takeaway's plate: out at the ask, then a fresh, bigger one pops with the answer
      const moPop = moT + MO_POP
      const big = asked && t >= moPop
      const box = big ? moBig : plBox
      const pp = big ? popIn(t, moPop, 0.24, 0.76) : popIn(t, plR.land - 0.01, 0.3, 0.6)
      const bump = big ? 1 + wobble(t, moT + 0.06, 0.07, 2.4, 7) : 1 + wobble(t, plR.land, 0.06, 2.4, 7)
      style(plate, {
        width: box.w.toFixed(1) + 'px', height: box.h.toFixed(1) + 'px',
        opacity: big ? '1' : asked ? (t >= moT - MO_Q ? '0' : clamp(plOp).toFixed(3)) : t >= plR.land - 0.01 ? '1' : '0',
        transform: `translate(${box.x.toFixed(1)}px,${box.y.toFixed(1)}px) scale(${(pp.scale * bump * (big ? 1 : plSc)).toFixed(3)})`,
      })
    } else if (plBox) {
      const moPop = moT + 0.08                                   // the asked plate pops with the answer, once the "?" is out
      const pp = asked && t >= moT ? popIn(t, moPop, 0.3, 0.6) : popIn(t, plR.land - 0.01, 0.3, 0.6)
      const bump = (1 + wobble(t, plR.land, 0.06, 2.4, 7)) * (moBox ? 1 + wobble(t, moT + 0.14, 0.07, 2.4, 7) : 1)
      if (moBox) style(plate, { width: lerp(plBox.w, moBox.w, mw).toFixed(1) + 'px' })
      style(plate, {
        opacity: asked ? (t >= moPop ? '1' : t >= moT ? '0' : clamp(plOp).toFixed(3)) : t >= plR.land - 0.01 ? '1' : '0',
        transform: `translate(${plBox.x.toFixed(1)}px,${plBox.y.toFixed(1)}px) scale(${(pp.scale * bump * plSc).toFixed(3)})`,
      })
    }
    if (cal) {
      const vis = t < cal.t0 - 0.12 ? 0 : t < cal.end ? clamp((t - cal.t0 + 0.12) / 0.2) : 1 - clamp((t - cal.end) / 0.22)
      attr(cal.g, 'opacity', vis.toFixed(3))
      if (vis > 0) {
        const day = t < cal.t0 ? 0 : t >= cal.t0 + cal.d ? cal.target : 1 + Math.min(cal.target - 1, Math.floor((cal.target - 1) * prog(t, cal.t0, cal.d * 0.94)))
        cal.cells.forEach((c, k) => {
          const on = k < day
          attr(c, 'fill', on ? C.hero : C.lineSoft)
          attr(c, 'stroke', on ? C.hero : C.line)
        })
      }
    }
  }

  function seek(t) {
    let cur = intro ? -1 : 0
    for (const r of R) if (t >= r.T) cur = r.i
    const f = fx.seek(t)
    const z = zoomAt(t) * f.zoom
    const fxs = FXS + panAt(t)
    cam.set({ fx: fxs, fy: FLOOR, x: XF, y: FLOOR, zoom: z, shake: f.shake })
    // the floor spans the screen at any zoom, 4 px thick on screen
    attr(floorLn, 'x1', (XF + (-40 - fxs) / z).toFixed(1)); attr(floorLn, 'x2', (XF + (1120 - fxs) / z).toFixed(1))
    attr(floorLn, 'stroke-width', (S.thin / z).toFixed(2))
    seekPiles(t, z, cur, fxs)
    seekFlights(t, cur)
    seekCoins(t, z)
    seekFigure(t, z)
    seekHud(t, cur)
    if (blank) blank.seek(t)
    hudFx.seek(t)
    for (const tg of tags) {
      const p = prog(t, tg.t0, 0.22)
      style(tg.el, { opacity: (p <= 0 ? 0 : clamp(p * 2)).toFixed(3) })
      // morph.compare: the rows of the piles it does not divide settle to the dim grey with their piles
      const dim = moCmp && !moCmp.has(tg.k) ? E.inOut(prog(t, moFrom, 0.35)) : 0
      if (moCmp) for (const c of tg.cnt) style(c, { color: dim > 0 ? mix(C.ink, C.dim, dim) : C.ink })
      if (tg.line) {
        const q = E.out(prog(t, tg.t0 + 0.12, 0.3))
        // from the ask a dimmed row's leader goes (it does not just dim), and every leader goes once piles move
        const gone = moCmp && (beside || !moCmp.has(tg.k)) ? E.inOut(prog(t, moFrom, 0.25)) : 0
        attr(tg.line, 'opacity', q > 0 && gone < 1 ? (1 - gone).toFixed(3) : '0')
        attr(tg.line, 'stroke-dashoffset', (tg.line.__len * (1 - q)).toFixed(1))
      }
    }
  }

  // the verdict rides 10 px high in the caption band so its entry slide never dips under y 1480
  return { duration, seek, chrome: { verdictTop: L.capTop - 10 } }
}
