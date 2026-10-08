// becker-rig · unit-ladder (FORMATS.md §8): a price ladder in a unit you know ("Cost in Units of X", P8).
//
// One division, repeated on a cheap-to-huge ladder: cost ÷ unit price. Here the division is a verb the figure
// performs, and every answer is a pile you can see next to the ones before it.
//
//   frame 1   the rule is already running. If the first rung is not at t = 0 the figure holds up ONE unit
//             (a hot dog), the counter reads 1 under "$1.50 ÷ $1.50 =". Otherwise the first price coin is already
//             standing in front of him and the HUD shows the first rung.
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
//
// A pile is one path filled with a brick pattern of the unit icon, so a pile of 266,667 is exactly 266,667 icons
// and one DOM node; up close the units fly in one by one and squash as they land (big piles: an even sample of
// them), and a fractional last unit is drawn cut to size. From far away a pile turns into its silhouette.
// Every count, pile and zoom is closed-form in t.
//
// lookOpts (all optional; it renders fully without them):
//   figure: false             no figure: each coin cracks open by itself
//   figureScale: 1.1          size of the figure
//   unitLabel / unitLabelOne  the plural / singular label beside the counter (default: derived from unit.name)
//   intro: false              never open on the "1 unit" state, even when the first rung starts late
//   iconSize: 68              world size (px) of one unit icon's longer side
//   plate: false              no gold plate on the last count (a rung with tone "goal" always gets one)
import {
  h, s, style, attr, setText, setHTML, prog, clamp, lerp, rng,
  C, F, L, S, E, RIG, poseTrack, fk, secondary, pinLimb, blendJ, Figure, makeWorld, makeFx, camera, NumObj,
  chromeParts, durationOf, num, rollTo, measure, arc, squashAt, fall, popIn, wobble, coin, icon,
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
.ul-tag { position: absolute; left: 0; top: 0; text-align: center; white-space: nowrap; }
.ul-tag .n { display: block; font: 800 40px/44px ${F.head}; letter-spacing: -0.01em; color: ${C.grey}; }
.ul-tag .c { display: block; font: 900 44px/48px ${F.head}; letter-spacing: -0.03em; color: ${C.ink}; }
.ul-tag.list { text-align: left; }
.ul-tag.list .ln { display: block; white-space: nowrap; line-height: 50px; }
.ul-tag.list .n, .ul-tag.list .c { display: inline; line-height: 50px; }
`

// what a pile reads as once one icon is too small to draw: a clean palette silhouette with an ink edge.
// Coin yellow only for money units; everything else is the neutral structure grey.
const FLAT = { coin: C.coin, bill: C.coin, ticket: C.coin }
const flatOf = name => FLAT[name] || C.line

// poses used only here (the shared library has the rest)
const P_PRESENT = { lean: -3, tilt: 4, aF: [116, 30], aB: [-14, 16], lF: [10, -4], lB: [-12, -2] }
const P_TOSSW = { lean: 10, tilt: 12, aF: [30, 96], aB: [-24, 20], lF: [18, -26], lB: [-16, -22] }
const P_TOSS = { lean: -8, tilt: -18, aF: [138, 8], aB: [-34, 20], lF: [12, -4], lB: [-12, -2], lift: 8 }
const P_FLINCH = { lean: -16, tilt: -16, aF: [64, 104], aB: [44, 112], lF: [18, -16], lB: [-20, -14] }
const P_WIND = { lean: -18, tilt: -4, aF: [-58, 118], aB: [58, 64], lF: [30, -36], lB: [-30, -22] }
const P_PUNCH = { lean: 24, tilt: -6, aF: [92, 4], aB: [-46, 36], lF: [36, -42], lB: [-30, -6] }

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// a pile's name tag: the rung's item without its article or trailing qualifier ("A year of rent at $1,700/mo" ->
// "Year of rent", "A $400,000 house, paid in cash" -> "$400,000 house"). Words are dropped, never changed.
function shortName(item) {
  let s2 = String(item).trim().replace(/^(?:a|an|the)\s+/i, '')
  s2 = s2.split(/,\s|\s(?:at|for|per|paid|in|on|with)\s/)[0].trim()
  return s2 ? (/^[a-z]+(\s|$)/.test(s2) ? s2[0].toUpperCase() + s2.slice(1) : s2) : String(item)
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
  const parts = chromeParts(spec, ctx)
  const introItem = String(U.name || '')
  const itemTexts = [...(intro ? [introItem] : []), ...R.map(r => r.item)]
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
  const divTexts = [...(intro ? [`1 ${labelOne} = ${price}`] : []), ...R.map(r => `${r.cost} ÷ ${price} ≈`)]
  let divPx = 46
  for (; divPx > 40; divPx -= 2) if (divTexts.every(tx => measure(tx, `800 ${divPx}px ${F.mono}`, { letterSpacing: '-0.03em' }) <= HW)) break
  const lhD = Math.round(divPx * 1.3)
  const digW = (str, px) => measure(str, `900 ${px}px ${F.head}`, { letterSpacing: '-0.035em' })
  const labW = str => measure(str, `800 ${LABPX}px ${F.head}`, { letterSpacing: '-0.01em' })
  const counters = [...(intro ? [{ digits: '1', label: labelOne, plate: false }] : []), ...R]
  const besideFits = px => counters.every(a => (a.plate ? 2 * PLATE[0] + 24 : 0) + digW(a.digits, px) + 28 + labW(a.label) <= HW)
  let cPx = 136
  while (cPx > 104 && !besideFits(cPx)) cPx -= 4
  const labelBelow = !besideFits(cPx)
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
  const pat = s('pattern', { id: 'ul-pat', patternUnits: 'userSpaceOnUse', width: cw.toFixed(3), height: (2 * ch).toFixed(3) })
  pat.append(use({ transform: `translate(${(cw / 2).toFixed(2)},${(1.5 * ch).toFixed(2)})` }), use({ transform: `translate(0,${(0.5 * ch).toFixed(2)})` }), use({ transform: `translate(${cw.toFixed(2)},${(0.5 * ch).toFixed(2)})` }))
  defs.append(pat)

  // cell m (fill order) -> centre in pile-local coordinates (x right of the pile's left edge, y up = negative):
  // a left-anchored brick pyramid that grows along its right slope, so it is a pyramid at every count
  const cellOf = m => {
    const B = Math.floor(Bc(m) + 1e-9), j = m - tri(B)
    return [j * cw / 2 + (B - j) * cw + cw / 2, -(j + 0.5) * ch]
  }
  const pathCache = new Map()
  function pilePath(n) {
    n = Math.floor(n)
    if (n <= 0) return ''
    if (pathCache.has(n)) return pathCache.get(n)
    const B = Math.floor(Bc(n) + 1e-9), r = n - tri(B)
    const xl = k => k * cw / 2, xr = k => k * cw / 2 + (B - k + (k < r ? 1 : 0)) * cw
    const f = v => v.toFixed(1)
    let p
    if (B > 360) p = `M0,0H${f(xr(0))}L${f(xr(B - 1))},${f(-B * ch)}H${f(xl(B - 1))}Z`   // rows are sub-pixel there
    else {
      p = `M0,0H${f(xr(0))}V${f(-ch)}`
      for (let k = 1; k < B; k++) p += `H${f(xr(k))}V${f(-(k + 1) * ch)}`
      p += `H${f(xl(B - 1))}`
      for (let k = B - 1; k >= 1; k--) p += `V${f(-k * ch)}H${f(xl(k - 1))}`
      p += 'V0Z'
    }
    if (pathCache.size > 600) pathCache.clear()
    pathCache.set(n, p)
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
    const lead = r.placed ? 0.45 : clamp(gap * 0.22, 0.45, 0.92)
    r.punch = Math.max(0, r.T) + lead
    r.coinLand = r.placed ? -Infinity : r.T + lead * 0.64
    r.push = i > 0 ? [r.T, Math.min(0.5, lead * 0.6)] : null
    r.fill0 = r.punch + 0.05
    if (r.last) {
      let fd = 1.9
      if (spec.verdict && spec.verdict.t != null) fd = Math.min(fd, spec.verdict.t - 0.5 - r.fill0)
      r.fillDur = clamp(fd, 0.6, 2.2)
    } else r.fillDur = clamp(gap * 0.3, 0.5, 1.6)
    r.land = r.fill0 + r.fillDur
    r.pull = clamp(r.fillDur * 0.62, 0.35, r.last ? 1.1 : 0.8)
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
  const keys = [{ t: 0, pose: intro ? P_PRESENT : 'lookUp' }]
  if (intro) {
    const T0 = R[0].T
    keys.push({ t: 0.5, pose: { ...P_PRESENT, tilt: 16, aF: [108, 40] }, d: 0.22, e: 'inOut' })
    keys.push({ t: 0.8, pose: P_PRESENT, d: 0.3, e: 'spring' })
    keys.push({ t: T0 - 0.26, pose: P_TOSSW, d: 0.16, e: 'inOut' })
    keys.push({ t: T0 - 0.07, pose: P_TOSS, d: 0.09, e: 'out' })
  }
  for (const r of R) {
    if (!r.placed) {
      keys.push({ t: r.T + (intro && r.i === 0 ? 0.22 : 0.1), pose: 'lookUp', d: 0.26, e: 'spring' })
      keys.push({ t: r.coinLand, pose: { ...P_FLINCH, lean: -8 - 12 * r.e }, d: 0.08, e: 'out' })
      keys.push({ t: r.coinLand + 0.1, pose: 'lookUp', d: 0.2, e: 'spring' })
    }
    keys.push({ t: r.punch - 0.25, pose: r.mode === 'punch' ? P_WIND : 'chopUp', d: 0.17, e: 'inOut' })
    keys.push({ t: r.punch - 0.06, pose: r.mode === 'punch' ? P_PUNCH : 'chopDown', d: 0.07, e: 'out' })
    keys.push({ t: r.punch + 0.2, pose: 'lookUp', d: 0.3, e: 'spring' })
    keys.push({ t: r.land, pose: react(r), d: 0.24, e: 'spring' })
    if (r.last) keys.push({ t: r.land + 0.8, pose: 'slump', d: 0.4, e: 'spring' })
    else keys.push({ t: r.land + 1.0, pose: 'idle', d: 0.45, e: 'inOut' })
  }
  const tr = poseTrack(keys)

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

  // build the piles: silhouette (far away) < pattern-filled staircase < outline (far away) < fractional unit
  for (const r of R) {
    const gp = s('g', { transform: `translate(${r.px.toFixed(1)},${FLOOR})` })
    r.flat = s('path', { fill: flatOf(iconName) })
    r.fill = s('path', { fill: 'url(#ul-pat)' })
    r.edge = s('path', { fill: 'none', stroke: C.ink, 'stroke-linejoin': 'round' })
    gp.append(r.flat, r.fill, r.edge)
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
  hud.append(itemEl, divEl, hudSvg)
  ctx.stage.append(hud)
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

  const duration = durationOf(spec, R[N - 1].land + 0.6, hold)

  // ================================================================== the ladder recap: a tag on every pile
  // Once the last pile has landed the camera steps back a little and each pile gets a tag: its name and count
  // (screen-fixed, 40 / 44 px), or the count alone where the name does not fit. A tag sits on its own pile when the
  // pile is big enough, otherwise in the sky nearest its apex without touching another tag, a pile or the figure,
  // with a thin leader to the apex. The step back is the smallest one (of 0.8 / 0.7 / 0.6 / 0.5) that tags every pile.
  const tags = []
  let tagStep = 1
  if (lo.pileLabels !== false && N >= 2) {
    const custom = Array.isArray(lo.pileLabels) ? lo.pileLabels : null
    // measure both variants of every tag once
    const variants = R.map((r, k) => [true, false].map(full => {
      const el = h('div', { class: 'ul-tag', style: { opacity: '0' } }, ...(full ? [h('span', { class: 'n' }, custom && custom[k] != null ? String(custom[k]) : shortName(r.item))] : []), h('span', { class: 'c' }, r.disp))
      hud.append(el)
      return { el, w: el.offsetWidth, hh: el.offsetHeight, full }
    }))
    const inTri = (p, [a, b, c]) => {
      const sgn = (p1, p2, p3) => (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
      const d1 = sgn(p, a, b), d2 = sgn(p, b, c), d3 = sgn(p, c, a)
      return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
    }
    const segHitsBox = (a, b, q, m = 4) => { for (let u = 0; u <= 24; u++) { const x = lerp(a[0], b[0], u / 24), y = lerp(a[1], b[1], u / 24); if (x > q.x0 - m && x < q.x1 + m && y > q.y0 - m && y < q.y1 + m) return true } return false }
    const segHitsTri = (a, b, T) => { for (let u = 1; u < 24; u++) if (inTri([lerp(a[0], b[0], u / 24), lerp(a[1], b[1], u / 24)], T)) return true; return false }
    const cross = (p1, p2, p3, p4) => {
      const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
      return d(p1, p2, p3) * d(p1, p2, p4) < 0 && d(p3, p4, p1) * d(p3, p4, p2) < 0
    }
    const boxHit = (b, q) => b.x0 < q.x1 + 10 && b.x1 > q.x0 - 10 && b.y0 < q.y1 + 6 && b.y1 > q.y0 - 6
    const listTag = ks => {
      const el = h('div', { class: 'ul-tag list', style: { opacity: '0' } }, ...ks.map(k => h('span', { class: 'ln' },
        h('span', { class: 'n' }, custom && custom[k] != null ? String(custom[k]) : shortName(R[k].item)), ' ', h('span', { class: 'c' }, R[k].disp))))
      hud.append(el)
      return { el, w: el.offsetWidth, hh: el.offsetHeight, group: ks }
    }
    const layoutTags = step => {
      tagStep = step
      const zF = zoomAt(R[N - 1].land + 1.4)
      const scr = (wx, wy) => [FXS + (wx - XF) * zF, FLOOR + (wy - FLOOR) * zF]
      const tris = R.map(r => {
        const B = Math.max(1, Bc(r.units)), W = (B + 1) * cw, H = pileH(r.units)
        return [scr(r.px, FLOOR), scr(r.px + W, FLOOR), scr(r.px + B * cw / 2 + cw / 2, FLOOR - H)]
      })
      const figBox = { x0: 40, y0: FLOOR - 120, x1: FXS + 24, y1: FLOOR }
      const placed = [], segs = [], out = []
      const hits = (b, own) => {
        for (const q of placed) if (boxHit(b, q)) return true
        if (b.x0 < figBox.x1 && b.x1 > figBox.x0 && b.y1 > figBox.y0) return true
        for (const sg of segs) if (segHitsBox(sg[0], sg[1], b)) return true
        for (let k = 0; k < tris.length; k++) {
          const T = tris[k]
          if (T[2][0] >= b.x0 && T[2][0] <= b.x1 && T[2][1] >= b.y0 && T[2][1] <= b.y1 + (k === own ? 6 : 0)) return true
          for (let u = 0; u <= 8; u++) for (const y of [b.y0, b.y1]) if (inTri([b.x0 + (b.x1 - b.x0) * u / 8, y], T)) return true
          for (const x of [b.x0, b.x1]) for (let u = 0; u <= 4; u++) if (inTri([x, b.y0 + (b.y1 - b.y0) * u / 4], T)) return true
        }
        return false
      }
      // the nearest free spot in the sky for a w x hh tag pointing at apex (own: the piles it may touch)
      const sky = (w, hh, apex, own) => {
        let best = null, bestCost = Infinity
        for (let y1 = FLOOR - 24; y1 - hh >= VPtop + 40; y1 -= 8) {
          for (let xx = HX; xx + w <= 938; xx += 16) {
            const b = { x0: xx, y0: y1 - hh, x1: xx + w, y1 }
            const anchor = apex[1] > y1 ? [clamp(apex[0], xx + 16, xx + w - 16), y1 + 4] : [apex[0] < xx ? xx - 4 : b.x1 + 4, clamp(apex[1], b.y0 + 10, y1 - 10)]
            const cost = Math.hypot(anchor[0] - apex[0], (anchor[1] - apex[1]) * 0.8) + (anchor[0] !== apex[0] ? 30 : 0) + (apex[1] <= y1 ? 60 : 0)
            if (cost >= bestCost || hits(b, own.length === 1 ? own[0] : -1)) continue
            const tip = [apex[0], apex[1] - 5]
            const long = Math.hypot(tip[0] - anchor[0], tip[1] - anchor[1]) > 18
            if (long && (placed.some(q => segHitsBox(anchor, tip, q)) || tris.some((T2, j) => !own.includes(j) && segHitsTri(anchor, tip, T2)) || segs.some(sg => cross(anchor, tip, sg[0], sg[1])))) continue
            best = { b, anchor, tip, long }; bestCost = cost
          }
        }
        return best
      }
      const commit = (k, best) => { placed.push(best.b); if (best.long) segs.push([best.anchor, best.tip]); out.push({ k, ...best }) }
      // a cluster of small piles side by side (the cheap end of the ladder) shares one list tag, placed first
      const small = R.map((_, k) => k).filter(k => tris[k][2][1] > FLOOR - 60)
      let cluster = []
      for (const k of small) {
        if (cluster.length && tris[k][2][0] - tris[cluster[cluster.length - 1]][2][0] > 90) break
        cluster.push(k)
      }
      // (it gives up its biggest members, which can carry their own tags, until it finds room)
      let done = false
      for (let n = cluster.length; n >= 2 && !done; n--) {
        const ks = cluster.slice(0, n)
        if (n * 50 > FLOOR - 24 - (VPtop + 40)) continue
        const V = listTag(ks)
        const ax = ks.reduce((a, k) => a + tris[k][2][0], 0) / n, ay = Math.min(...ks.map(k => tris[k][2][1]))
        const best = sky(V.w, V.hh, [ax, ay], ks)
        if (best) { commit(ks[0], { V, ...best, group: ks }); cluster = ks; done = true }
        else V.el.remove()
      }
      if (!done) cluster = []
      // then every other pile, biggest first (they have the least sky above them)
      const order = R.map((_, k) => k).filter(k => !cluster.includes(k)).sort((a, b) => R[b].units - R[a].units)
      for (const k of order) {
        let best = null
        for (const V of variants[k]) {
          const { w, hh } = V
          const T = tris[k], apex = T[2]
          // written on the pile itself, at its foot (a big pile has the room; no leader)
          const x0 = clamp(apex[0] - w / 2, HX, 938 - w), b0 = { x0, y0: FLOOR - 14 - hh, x1: x0 + w, y1: FLOOR - 14 }
          if ([[b0.x0 - 10, b0.y0 - 10], [b0.x1 + 10, b0.y0 - 10], [b0.x0 - 10, b0.y1], [b0.x1 + 10, b0.y1]].every(p => inTri(p, T)) && !placed.some(q => boxHit(b0, q))) { best = { V, b: b0, inside: true }; break }
          const sk = sky(w, hh, apex, [k])
          if (sk) { best = { V, ...sk }; break }
        }
        if (best) commit(k, best)
      }
      return out
    }
    let pick = null
    const covered = out => out.reduce((a, o) => a + (o.group ? o.group.length : 1), 0)
    const individual = out => out.filter(o => !o.group).length
    for (const step of [0.8, 0.7, 0.6]) {
      const out = layoutTags(step)
      const better = !pick || covered(out) > covered(pick.out) || (covered(out) === covered(pick.out) && individual(out) > individual(pick.out))
      if (better) { if (pick) for (const o of pick.out) if (o.group) o.V.el.remove(); pick = { step, out } }
      else for (const o of out) if (o.group) o.V.el.remove()
      if (individual(out) === N) break
    }
    tagStep = pick.step
    for (const { k, V, b, long, anchor, tip } of pick.out) {
      let line = null
      if (long) {
        line = s('line', { x1: anchor[0].toFixed(1), y1: anchor[1].toFixed(1), x2: tip[0].toFixed(1), y2: tip[1].toFixed(1), stroke: C.line, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0 })
        hudG.append(line)
      }
      style(V.el, { transform: `translate(${b.x0.toFixed(1)}px,${b.y0.toFixed(1)}px)` })
      tags.push({ el: V.el, line, k, t0: R[N - 1].land + 1.0 + 0.1 * k })
    }
    for (const vs of variants) for (const V of vs) if (!tags.some(tg => tg.el === V.el)) V.el.remove()
    tags.sort((a, b) => a.k - b.k)
    if (tags.length) ctx.cue(tags[0].t0, 'tick', { gain: 0.3 })
  }

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
    return z
  }

  function seekPiles(t, z) {
    const tile = cw * z
    const patOp = clamp((tile - 16) / 8)                          // icon texture only while one icon is >= ~18 px
    for (const r of R) {
      const n = t < r.fill0 ? 0 : nAt(r, t - SETTLE)
      const p = pilePath(n)
      attr(r.fill, 'd', p); attr(r.flat, 'd', p); attr(r.edge, 'd', p)
      attr(r.fill, 'opacity', patOp.toFixed(3))
      attr(r.flat, 'opacity', (1 - patOp).toFixed(3))
      attr(r.edge, 'opacity', (0.9 * (1 - patOp)).toFixed(3))
      attr(r.edge, 'stroke-width', (4 / z).toFixed(2))
      if (r.part) attr(r.part, 'opacity', t >= r.land + SETTLE ? '1' : '0')
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
  const FIG_MIN = 96, figPx = 262 * FIGK
  const figKAt = z => FIGK * Math.max(1, FIG_MIN / (figPx * z))
  const figXAt = z => XF - (1 - clamp(figPx * z / FIG_MIN)) * 48 / z
  function seekFigure(t, z) {
    if (!fig) return
    const kz = figKAt(z), xz = figXAt(z)
    let J = fig.pose(t, tr, { x: xz, ground: FLOOR, noDraw: true, scale: kz, stroke: Math.max(S.figure, S.figure / z) })
    for (const r of R) {
      if (!r.contact || t < r.punch - 0.09 || t > r.punch + 0.17) continue
      const w = t < r.punch ? E.out(prog(t, r.punch - 0.09, 0.09)) : 1 - E.inOut(prog(t, r.punch + 0.05, 0.12))
      J = blendJ(J, pinLimb({ ...J }, 'hF', r.contact, 1), w)
    }
    fig.draw(J, { stroke: Math.max(S.figure, S.figure / z) })
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
          labTxt = r.label; labOp = 1; lx = labXFor(r, numTxt)
        }
      }
    }
    numO.set({ x: HX + padOf(nr), y: base, sx: nsx, sy: nsy, opacity: numOp, text: numTxt, color: ncol })
    qO.set({ x: HX, y: base, sx: qs, sy: qs, opacity: qOp })
    labO.set({ x: lx, y: yLabBase, opacity: labOp, text: labTxt })
    if (plBox) {
      const pp = popIn(t, plR.land - 0.01, 0.3, 0.6)
      const bump = 1 + wobble(t, plR.land, 0.06, 2.4, 7)
      style(plate, {
        opacity: t >= plR.land - 0.01 ? '1' : '0',
        transform: `translate(${plBox.x.toFixed(1)}px,${plBox.y.toFixed(1)}px) scale(${(pp.scale * bump).toFixed(3)})`,
      })
    }
  }

  function seek(t) {
    let cur = intro ? -1 : 0
    for (const r of R) if (t >= r.T) cur = r.i
    const f = fx.seek(t)
    const z = zoomAt(t) * f.zoom
    cam.set({ fx: FXS, fy: FLOOR, x: XF, y: FLOOR, zoom: z, shake: f.shake })
    // the floor spans the screen at any zoom, 4 px thick on screen
    attr(floorLn, 'x1', (XF + (-40 - FXS) / z).toFixed(1)); attr(floorLn, 'x2', (XF + (1120 - FXS) / z).toFixed(1))
    attr(floorLn, 'stroke-width', (S.thin / z).toFixed(2))
    seekPiles(t, z)
    seekFlights(t, cur)
    seekCoins(t, z)
    seekFigure(t, z)
    seekHud(t, cur)
    hudFx.seek(t)
    for (const tg of tags) {
      const p = prog(t, tg.t0, 0.22)
      style(tg.el, { opacity: (p <= 0 ? 0 : clamp(p * 2)).toFixed(3) })
      if (tg.line) attr(tg.line, 'opacity', p > 0 ? '1' : '0')
    }
  }

  // the verdict rides 10 px high in the caption band so its entry slide never dips under y 1480
  return { duration, seek, chrome: { verdictTop: L.capTop - 10 } }
}
