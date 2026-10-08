// becker-rig · pov-race (FORMATS.md §6): "POV: you invested in X instead of paying $Y for X's product".
//
// Two piles on one dollar scale, and the figure between them making the choice over and over:
//   left   SPENT: a ghost column (pale red, dashed outline, coin lines) as tall as the cumulative spend. The money
//          is gone; only its outline is left. Its counter (red) runs on the spend line and lands on spend.final.
//   right  OWN: a tower of real gold coins as tall as the same money in the stock. Coins drop onto it as it grows
//          (each lands with a squash), and tumble off the top when the stock falls (the tower wobbles, red hit
//          lines). Its counter (green, red while it is under what you paid) lands on own.final on a gold plate.
//   a dotted red "paid" line runs from the top of the spent column across the tower, so you see at a glance
//   whether the tower is above or below what the product cost you.
//   The spent column never shrinks to a sliver: below 60 px it is drawn as a 60 px slab labelled with the counter's
//   running number (inside it, or on top of it like a tag when the junk heap would touch it); the paid line keeps the
//   true height.
// The figure buys the product: a coin (the first one a big coin with the price on it, held out at frame 1) squashes
// into the item while a gold copy of it arcs onto the tower ("the same money, invested"; on the first purchase a red
// ghost copy also drifts onto the spent column, and both piles appear then). He uses the item, it cracks and greys,
// and he flings it over his shoulder onto a junk heap next to the spent column. One purchase cycle per rise of the
// spend line and per data.purchases entry (≥ 0.95 s apart; the first gets 1.9 s); a purchase entry also pops a price
// tag beside his head and fills its dot on the timeline. A single purchase (a phone) lives long: he holds it, it
// cracks twice, and he watches the tower while it ages. He hops in shock at crashes (a run of falling points is one
// crash) and when the tower drops below the paid line (keeping the item hand busy if he is mid-purchase), and ends
// by celebrating and pointing up at the tower (≥ 2.5×), shrugging (1-2.5×) or slumping (a loss).
// Scale: one px-per-dollar for both piles. When the tower outgrows the stage the camera pulls back (the piles shrink
// about the floor, the figure 62% as much; the header, timeline and counters stay put): the scale reveal.
// Counters: running values in the style of each final string (prefix, decimals, its trailing words such as " spent"
// as a small suffix), eased onto the final number in the last 0.5 s, then exactly the spec's final string.
//
// Layout (top to bottom): header + footer (chrome) · year + timeline rail (ticks every x.tickEvery, purchase
// dots) · the two counters with their labels (spent left-aligned, own right-aligned) · the stage on the floor.
//
// lookOpts (all optional; it renders fully without them):
//   prop: 'cup'                 the item icon (default data.spend.item; any lib.js icon name)
//   jarLabel: 'SBUX'            a ticker plate on a plinth under the tower (the spent column gets a ghost plinth)
//   endPose: 'celebrate' | 'shrug' | 'slump' | 'point'    the figure's reaction at the end (default from the ratio)
//   figure: false               no figure (the piles and counters only)
//   figureScale: 1              figure size at the start of the race
//   zoom: false                 no camera pull-back (the piles are fitted to the stage from the start)
import {
  h, s, style, attr, setText, setHTML, markup, fitText, prog, clamp, lerp, rng,
  C, F, L, E, poseTrack, poseOf, blendPose, secondary, fk, Figure, makeWorld, makeFx, camera,
  chromeParts, durationOf, num, numLike, fmtNum, measure, coin, icon, popIn, swapAt, squashAt, fall, toss, hop, wobble, arc, NumObj,
} from '../lib.js'

export const css = `
.pr-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.pr-year { position: absolute; font: 900 56px/56px ${F.head}; letter-spacing: -0.03em; color: ${C.grey}; white-space: nowrap; }
.pr-lab { position: absolute; font: 800 40px/44px ${F.head}; letter-spacing: -0.01em; color: ${C.grey}; text-wrap: balance; }
.pr-val { position: absolute; font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; white-space: nowrap; }
.pr-val small { font-size: 44px; line-height: 44px; font-weight: 800; letter-spacing: -0.01em; margin-left: 10px; }
.pr-plate { position: absolute; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 18px; box-sizing: border-box; }
.pr-tag { position: absolute; left: 0; top: 0; padding: 4px 18px 6px; background: ${C.white}; border: 5px solid ${C.ink}; border-radius: 14px;
  font: 800 44px/48px ${F.head}; letter-spacing: -0.01em; color: ${C.ink}; white-space: nowrap; transform-origin: 100% 100%; }
.pr-tag u { text-decoration: none; color: ${C.red}; }
.pr-jar { font-family: ${F.mono}; font-weight: 800; fill: ${C.white}; letter-spacing: 0.04em; }
.pr-sl { font: 900 40px/1 ${F.head}; letter-spacing: -0.02em; color: ${C.ink}; }
`

// ------------------------------------------------------------------------------------------------ helpers
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const smooth = p => { const q = clamp(p); return q * q * (3 - 2 * q) }
const f1 = v => v.toFixed(1)
const DT = 1 / 120                                       // precompute step (zoom follower, coin stack events)
const sampleAt = (arr, t) => {
  const f = clamp(t / DT, 0, arr.length - 1), i = Math.floor(f), p = f - i
  return i + 1 < arr.length ? arr[i] + (arr[i + 1] - arr[i]) * p : arr[i]
}
/** "≈ $24,900" -> { pre: '≈ ', num: '$24,900', post: '' }; "$17,532 spent" -> { pre: '', num: '$17,532', post: ' spent' } */
function splitDisplay(str) {
  const m = /^(.*?)([-−]?[$€£¥]?\d[\d,]*(?:\.\d+)?[KMBT]?)(.*)$/i.exec(String(str))
  return m ? { pre: m[1], num: m[2], post: m[3] } : null
}
/**
 * Running counter for one pile: prints an interpolated value in the style of its final display string (prefix,
 * decimals, compact unit) with the final's trailing words (" spent") as a small suffix, and the final string
 * itself, exactly, once the race is over.
 */
function runner(final, yo) {
  const sd = final != null ? splitDisplay(final) : null
  const tok = sd ? sd.num.replace(/^[-−]/, '') : null
  const compact = (tok && /[KMBT]$/i.test(tok)) || !!yo.compact
  const like = tok ? numLike(tok.replace(/[KMBT]$/i, '')) : null
  const prefix = like ? like.prefix : (yo.prefix ?? '$')
  const dp = like ? like.dp : (yo.dp ?? 0)
  return {
    dp, compact,
    post: sd ? sd.post.trim() : '',
    final: sd ? { big: (sd.pre + sd.num).trim(), small: sd.post.trim() } : (final != null ? { big: String(final), small: '' } : null),
    text: (v, dpo = dp) => fmtNum(v, { prefix, dp: compact ? dp : dpo, compact }),
  }
}

// poses, facing right (toward the tower). Arms: [shoulder angle from the torso's down direction, elbow bend].
const P = {
  present: { lean: -4, tilt: 6, aF: [98, -8], aB: [40, 136], lF: [10, -5], lB: [-10, -3] },     // big coin held out, hand on chin
  hold: { lean: -2, tilt: 8, aF: [58, 64], aB: [-14, 16], lF: [8, -6], lB: [-8, -4] },          // a coin in one hand
  use: { lean: 3, tilt: 16, aF: [96, 60], aB: [-12, 18], lF: [8, -6], lB: [-8, -4] },           // the item at his face
  drink: { lean: -9, tilt: -18, aF: [70, 120], aB: [-16, 18], lF: [8, -6], lB: [-10, -4] },     // cups: drinking
  wind: { lean: 12, tilt: 10, aF: [52, 24], aB: [-22, 18], lF: [16, -20], lB: [-12, -12] },     // dip before the fling
  fling: { lean: -16, tilt: -8, aF: [-152, -14], aB: [36, 24], lF: [24, -12], lB: [-26, -24] },  // over the shoulder
  watch: { lean: -5, tilt: -20, aF: [14, 22], aB: [-16, 14], lF: [12, -4], lB: [-10, -3] },     // looking up at the tower
  holdLow: { lean: -4, tilt: -16, aF: [34, 46], aB: [-16, 14], lF: [12, -4], lB: [-10, -3] },   // old item at his side
  dip: { lean: 16, tilt: 8, aF: [-30, 34], aB: [-42, 28], lF: [44, -74], lB: [22, -68] },       // anticipation for a hop
  ohno: { lean: -10, tilt: -14, aF: [150, 30], aB: [-150, -30], lF: [20, -30], lB: [-20, -26] },
}

export default function povRace(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const SP = d.spend || {}, OW = d.own || {}

  // ============================================================================ data
  const cleanPts = arr => (arr || []).map(p => [+p[0], +p[1]]).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1])).sort((a, b) => a[0] - b[0])
  const spP = cleanPts(SP.points), owP = cleanPts(OW.points)
  if (!spP.length || !owP.length) throw new Error('pov-race: data.spend.points and data.own.points need at least one point each')
  const xf = d.x?.from ?? Math.min(spP[0][0], owP[0][0])
  const xt = d.x?.to ?? Math.max(spP[spP.length - 1][0], owP[owP.length - 1][0])
  const span = Math.max(1e-6, xt - xf)
  const [T0, T1] = Array.isArray(d.raceT) && d.raceT.length === 2 ? d.raceT.map(Number) : [1.5, 1.5 + clamp(span * 1.4, 10, 30)]
  const RT = Math.max(0.5, T1 - T0)
  const hold = d.hold ?? 4
  const yo = d.y || {}
  const valueAt = (p, x) => {
    if (x <= p[0][0]) return p[0][1]
    const n = p.length - 1
    if (x >= p[n][0]) return p[n][1]
    let a = 0, b = n
    while (b - a > 1) { const m = (a + b) >> 1; if (p[m][0] <= x) a = m; else b = m }
    return p[a][1] + (p[b][1] - p[a][1]) * (x - p[a][0]) / Math.max(1e-9, p[b][0] - p[a][0])
  }
  const xNow = t => xf + span * clamp((t - T0) / RT)
  const tOfX = x => T0 + (clamp(x, xf, xt) - xf) / span * RT
  const spendAt = t => valueAt(spP, xNow(t)), ownAt = t => valueAt(owP, xNow(t))
  const runL = runner(SP.final, yo), runR = runner(OW.final, yo)
  const spEnd = SP.final != null && Number.isFinite(num(SP.final)) ? num(SP.final) : valueAt(spP, xt)
  const owEnd = OW.final != null && Number.isFinite(num(OW.final)) ? num(OW.final) : valueAt(owP, xt)
  const win = owEnd >= spEnd
  const ratio = owEnd / Math.max(1e-9, spEnd)
  const calendar = xf >= 1000
  const yearText = x => (calendar ? String(Math.floor(x + 1e-6)) : `Year ${Math.floor(x + 1e-6)}`)
  const showFig = lo.figure !== false
  const FIGK = lo.figureScale ?? 1
  const itemName = lo.prop || SP.item || 'token'
  const duration = durationOf(spec, T1 + 1.2, hold)

  // ============================================================================ layout
  const parts = chromeParts(spec, ctx)
  const top = parts.workTop
  const world = makeWorld(ctx)
  const g = world.g
  const hud = h('div', { class: 'pr-fixed' })          // timeline text, counters, tags: never shaken or zoomed
  ctx.stage.append(hud)
  const RIGHT = 922                                     // right edge of the own column (x <= 940 below y 820)

  // ---- row 1: the year + a timeline rail
  const YPX = 56
  const yearW = Math.max(...[xf, xt].map(x => measure(yearText(x), `900 ${YPX}px ${F.head}`, { letterSpacing: '-0.03em' })))
  const yearEl = h('div', { class: 'pr-year', style: { left: '62px', top: top + 'px' } })
  hud.append(yearEl)
  const RX0 = 62 + yearW + 40, RX1 = RIGHT - 8, RY = top + Math.round(YPX * 0.55)
  const railX = x => lerp(RX0, RX1, (clamp(x, xf, xt) - xf) / span)
  g.back.append(s('line', { x1: RX0, x2: RX1, y1: RY, y2: RY, stroke: C.lineSoft, 'stroke-width': 10, 'stroke-linecap': 'round' }))
  const tickEvery = d.x?.tickEvery > 0 ? d.x.tickEvery : Math.max(1, Math.round(span / 6))
  for (let x = Math.ceil(xf / tickEvery - 1e-9) * tickEvery; x <= xt + 1e-9; x += tickEvery) {
    g.back.append(s('line', { x1: railX(x), x2: railX(x), y1: RY - 15, y2: RY + 15, stroke: C.line, 'stroke-width': 4, 'stroke-linecap': 'round' }))
  }
  const railFill = s('line', { x1: RX0, y1: RY, y2: RY, stroke: C.hero, 'stroke-width': 10, 'stroke-linecap': 'round' })
  g.back.append(railFill)
  const purchases = (d.purchases || []).filter(p => p && Number.isFinite(+p.x)).map(p => ({ ...p, x: +p.x }))
  const railDots = purchases.map(p => {
    const el = s('circle', { cx: f1(railX(p.x)), cy: RY, r: 9, fill: C.void, stroke: C.red, 'stroke-width': 4 })
    g.back.append(el)
    return { el, x: p.x }
  })
  const railMark = s('circle', { cy: RY, r: 15, fill: C.hero, stroke: C.void, 'stroke-width': 5 })
  g.back.append(railMark)

  // ---- row 2: the two counters (labels over running values)
  const hudTop = top + YPX + 22
  const LBW = 430, RBW = 410
  const labL = h('div', { class: 'pr-lab', style: { left: '62px', top: hudTop + 'px', width: LBW + 'px' } })
  const labR = h('div', { class: 'pr-lab', style: { left: RIGHT - RBW + 'px', top: hudTop + 'px', width: RBW + 'px', textAlign: 'right' } })
  const glue = str => markup(str).replace(/(\d) (?=[A-Za-z%])/g, '$1\u00a0')   // keep "4 GB" together when it wraps
  setHTML(labL, glue(SP.label || 'Spent'))
  setHTML(labR, glue(OW.label || 'Invested'))
  hud.append(labL, labR)
  for (const [el, w] of [[labL, LBW], [labR, RBW]]) fitText(el, w, { maxH: 3 * 44 + 4, minPx: 34 })   // up to 3 lines at 40 px
  const labH = Math.max(labL.offsetHeight, labR.offsetHeight)
  const valTop = hudTop + labH + 14                    // room for the gold plate's border under the label
  // one value size for both counters: the largest that fits every string either of them will print
  const maxSp = Math.max(...spP.map(p => p[1]), valueAt(spP, xt)), maxOw = Math.max(...owP.map(p => p[1]), valueAt(owP, xt))
  const SMALL = 44
  const wVal = (big, small, px) => measure(big, `900 ${px}px ${F.head}`, { letterSpacing: '-0.03em' }) +
    (small ? 10 + measure(small, `800 ${SMALL}px ${F.head}`, { letterSpacing: '-0.01em' }) : 0)
  const PLATE = [16, 7]
  const fitsAt = px => {
    const dpJ = Math.max(runL.dp, runR.dp)
    const cl = [[runL.text(maxSp), runL.post], [runL.text(99.99, dpJ), runL.post], runL.final && [runL.final.big, runL.final.small]].filter(Boolean)
    const cr = [[runR.text(maxOw), runR.post], [runR.text(99.99, dpJ), runR.post], runR.final && [runR.final.big, runR.final.small]].filter(Boolean)
    return cl.every(([b, sm]) => wVal(b, sm, px) <= LBW) && cr.every(([b, sm]) => wVal(b, sm, px) <= RBW - 2 * PLATE[0])
  }
  let VPX = 76
  while (VPX > 48 && !fitsAt(VPX)) VPX -= 2
  const mkVal = (side) => {
    const el = h('div', { class: 'pr-val', style: side === 'L' ? { left: '62px', top: valTop + 'px', fontSize: VPX + 'px', lineHeight: VPX + 'px', transformOrigin: '0 60%' }
      : { right: 1080 - RIGHT + 'px', top: valTop + 'px', fontSize: VPX + 'px', lineHeight: VPX + 'px', transformOrigin: '100% 60%', textAlign: 'right' } })
    const big = h('span'), sm = h('small')
    el.append(big, sm)
    return { el, big, sm }
  }
  const plate = h('div', { class: 'pr-plate' })
  hud.append(plate)
  const vL = mkVal('L'), vR = mkVal('R')
  hud.append(vL.el, vR.el)
  const finRW = runR.final ? wVal(runR.final.big, runR.final.small, VPX) : wVal(runR.text(valueAt(owP, xt)), runR.post, VPX)
  const pb = { w: finRW + 2 * PLATE[0], h: VPX + 2 * PLATE[1] + 4 }
  pb.x = RIGHT + PLATE[0] - pb.w; pb.y = valTop - PLATE[1] - 4; pb.cx = pb.x + pb.w / 2; pb.cy = pb.y + pb.h / 2
  style(plate, { left: f1(pb.x) + 'px', top: f1(pb.y) + 'px', width: f1(pb.w) + 'px', height: f1(pb.h) + 'px', transformOrigin: '100% 50%' })
  const hudBottom = valTop + VPX
  const stageTop = hudBottom + 30

  // ============================================================================ the stage
  const FLOOR = L.floorY
  const jar = lo.jarLabel ? String(lo.jarLabel) : ''
  const PLH = jar ? 50 : 0
  const BASE = FLOOR - PLH                              // both piles stand on the same base line
  const Hs = Math.max(160, BASE - stageTop - 8)        // the tallest a pile may be on screen
  const SX = 170, SW = 184                              // spent column (centre, width)
  const TX = 754, TW = 224                              // tower
  const FX = 490                                        // the figure's feet
  const HX = 360                                        // the junk heap behind him, next to the spent column

  // one px-per-dollar for both piles. If fitting the whole race would make the first purchases invisible, start
  // closer and pull the camera back as the tower grows (down to ZMIN).
  const maxV = Math.max(1e-9, maxSp, maxOw)
  const early = Math.max(spP[0][1], valueAt(spP, xf + 0.08 * span))
  const ZMIN = lo.zoom === false ? 1 : 0.36
  let K = Hs / maxV
  if (K * early < 18 && ZMIN < 1) K = Math.min(18 / Math.max(1e-9, early), Hs / (ZMIN * maxV))
  let PITCH = 24                                        // coin thickness at zoom 1
  if ((K * maxV) / PITCH > 90) PITCH = (K * maxV) / 90

  // precompute (pure): zoom follower and the tower's coin count over time
  const NS = Math.ceil((duration + 0.5) / DT) + 2
  const mx = new Float64Array(NS), zA = new Float64Array(NS), cnt = new Int32Array(NS)
  for (let i = 0; i < NS; i++) {
    const tt = i * DT
    mx[i] = Math.max(spendAt(tt), ownAt(tt))
    cnt[i] = Math.max(0, Math.floor((K * ownAt(tt)) / PITCH + 0.5))
  }
  {
    const LA = Math.round(0.4 / DT), a = 1 - Math.exp(-DT / 0.16)
    let pm = 0, zs = 1
    for (let i = 0; i < NS; i++) {
      pm = Math.max(pm, mx[Math.min(NS - 1, i + LA)])
      const zt = Math.min(1, Hs / (K * Math.max(1e-9, pm)))
      zs = i === 0 ? zt : zs + (zt - zs) * a
      zA[i] = Math.min(1, zs, Hs / (K * Math.max(1e-9, mx[i])))
    }
  }
  const zAt = t => sampleAt(zA, t)

  // coin stack events: coin k sits on the tower during [ta, tb); it drops in at ta and tumbles off at tb
  const stack = []
  {
    let prev = cnt[0]
    for (let k = 0; k < prev; k++) stack[k] = { iv: [[-10, Infinity]] }
    let lastDrop = -1
    for (let i = 1; i < NS; i++) {
      const c = cnt[i], tt = i * DT
      if (c > prev) for (let k = prev; k < c; k++) {
        const ta = Math.max(tt, lastDrop + 0.035)                // a burst of coins drops one after another
        lastDrop = ta;(stack[k] ||= { iv: [] }).iv.push([ta, Infinity])
      } else if (c < prev) for (let k = c; k < prev; k++) { const iv = stack[k].iv[stack[k].iv.length - 1]; iv[1] = Math.max(iv[0] + 0.02, tt) }
      prev = c
    }
  }
  const jit = stack.map((_, k) => (rng(311 + k * 7)() - 0.5) * 12)

  // ---- SVG: plinths, empty slots, spent column, paid line, tower
  const slotOutline = () => s('rect', { rx: 8, fill: 'none', stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '10 10' })
  if (jar) {
    g.back.append(s('rect', { x: SX - SW / 2 - 14, y: BASE, width: SW + 28, height: PLH, rx: 8, fill: C.void, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '10 10', opacity: 0.7 }))
    g.back.append(s('rect', { x: TX - TW / 2 - 14, y: BASE, width: TW + 28, height: PLH, rx: 8, fill: C.ink }))
    const jt = s('text', { class: 'pr-jar', x: TX, y: BASE + PLH / 2 + 1, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 34, 'data-deco': '' })
    jt.textContent = jar
    g.back.append(jt)
  }
  const slots = [[SX, SW, slotOutline()], [TX, TW, slotOutline()]]
  for (const sl of slots) g.back.append(sl[2])
  const spRect = s('rect', { fill: C.redSoft, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '14 10', rx: 8 })
  const MINS = 60
  // the slab label: the number only ("$2,037.32"; the counter above carries " spent"). It always shows the counter's
  // running number, so it is sized for the widest string the counter will show
  const spLab = new NumObj(world.html, { cls: 'pr-sl', text: runL.final ? runL.final.big : '', ax: 0.5, ay: 0.5 })
  const spLabW = spLab.w
  const spLines = s('path', { fill: 'none', stroke: C.red, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.45 })
  g.mid.append(spRect, spLines)
  const paid = s('line', { stroke: C.red, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15', opacity: 0.9 })
  const towerG = s('g')
  g.mid.append(towerG, paid)                            // the paid line runs across the tower, behind the figure
  const sliver = s('rect', { fill: C.coin, stroke: C.ink, 'stroke-width': 3, rx: 3 })   // the tower while it is under one coin
  towerG.append(sliver)
  const coinEls = stack.map((_, k) => {
    const el = s('rect', { fill: k % 2 ? '#F7C736' : C.coin, stroke: C.ink, 'stroke-width': 3.5 })
    towerG.append(el)
    return el
  })
  const tumbles = []
  stack.forEach((cn, k) => cn.iv.forEach((iv, n) => { if (iv[1] < duration && tumbles.length < 160) tumbles.push({ k, tb: iv[1], n }) }))
  const tumbleG = s('g')
  g.front.append(tumbleG)
  for (const tu of tumbles) {
    const R = rng(1201 + tu.k * 31 + tu.n * 7)
    const z = zAt(tu.tb)
    tu.z = z
    tu.w = TW * (0.62 + 0.38 * z); tu.h = PITCH * z
    tu.p0 = [TX + jit[tu.k] * z, BASE - z * PITCH * (tu.k + 0.5)]
    const dir = R() < 0.72 ? 1 : -1                      // most fall off the far side, away from him
    tu.v = [dir * (110 + 210 * R()), -(120 + 230 * R())]
    tu.tilt = dir * (35 + 45 * R())                      // the coin tips over as it slides off ...
    tu.flip = (5 + 6 * R()) * (R() < 0.5 ? -1 : 1)       // ... and flips end over end (rad/s): an ellipse that opens and closes
    tu.el = s('g')
    tu.disc = s('ellipse', { fill: C.coin, stroke: C.ink })
    tu.ring = s('ellipse', { fill: 'none', stroke: C.coinDeep, 'stroke-width': 3 })
    tu.el.append(tu.disc, tu.ring)
    tumbleG.append(tu.el)
  }

  // ============================================================================ purchases (the figure's cycles)
  const cyc = []
  if (spP[0][1] > 0) cyc.push({ x: spP[0][0] })
  for (let j = 1; j < spP.length; j++) if (spP[j][1] > spP[j - 1][1] + 1e-9) cyc.push({ x: spP[j - 1][0] })
  for (const pu of purchases) cyc.push({ x: pu.x, pu })
  for (const c of cyc) c.t = Math.max(0.5, tOfX(c.x))
  cyc.sort((a, b) => a.t - b.t || (b.pu ? 1 : 0) - (a.pu ? 1 : 0))
  const MINGAP = 0.95, FIRSTGAP = 1.9                    // the first purchase is the establishing beat: give it room
  const cycles = []
  for (const c of cyc) {
    const last = cycles[cycles.length - 1]
    if (c.t > T1 - 0.9) { if (last && c.pu && !last.pu && c.t - last.t < 1.6) last.pu = c.pu; continue }
    if (last && c.t - last.t < (cycles.length === 1 ? FIRSTGAP : MINGAP)) { if (c.pu && !last.pu) last.pu = c.pu; continue }
    if (cycles.length < 40) cycles.push({ ...c })
  }
  const maxLife = Math.max(1.6, 0.34 * RT)
  cycles.forEach((c, i) => {
    const prevT = i ? cycles[i - 1].t : null, nextT = i < cycles.length - 1 ? cycles[i + 1].t : Infinity
    c.i = i
    c.big = i === 0
    c.pre = i === 0 ? null : Math.min(0.34, 0.32 * (c.t - prevT))
    c.life = Math.max(0.42, Math.min((nextT - c.t) * 0.6, maxLife, T1 - 0.5 - c.t))
    c.rel = c.t + c.life
    c.long = c.life > 2.2
    c.fl = 0.42                                          // flight from the hand to the heap
    c.land = c.rel + c.fl
    c.cracks = c.long ? [c.t + 0.42 * c.life, c.t + 0.72 * c.life] : [c.t + 0.5 * c.life]
    c.next = nextT
  })
  // heap slots: a mound behind him. With only one or two items each stays big on screen (>= ~120 px however far
  // the camera pulls back): the money spent is still a thing you can see, cracked and grey, next to the tower.
  const few = cycles.length <= 2
  const heapScale = zf => Math.max(0.66, (few ? 1.2 : 0.6) / Math.max(0.05, zf))
  const heapY = (c, sc) => (sc > 0.66 + 1e-6 ? FLOOR - 46 * sc - 4 : c.slot.y)
  const heapSlot = j => {
    const rows = [5, 4, 3, 2]
    let r = 0, i = j
    while (r < rows.length - 1 && i >= rows[r]) { i -= rows[r]; r++ }
    const n = rows[r], R = rng(500 + j * 31)
    return { x: HX + ((i % n) - (n - 1) / 2) * 40 + (R() - 0.5) * 12, y: FLOOR - 26 - r * 28 - Math.max(0, j - 13) * 3, rot: (R() - 0.5) * 90 }
  }
  const near = s('g')
  const nearBack = s('g'), nearFig = s('g'), nearFront = s('g')
  near.append(nearBack, nearFig, nearFront)
  g.fig.append(near)
  const crackD = ['M-6,-46L6,-20L-10,-4L10,16L-2,46', 'M44,-12L22,-2L32,12L12,26']
  for (const c of cycles) {
    // the coin he pays with (the first one is big and carries the purchase price)
    const price = c.big && c.pu && c.pu.price ? String(c.pu.price) : ''
    const r = c.big ? clamp(16.4 * [...(price || '$00')].length, 66, 100) : 26
    c.coinR = r
    c.coin = coin(nearFront, { r, text: price })
    // the item: icon + two cracks (revealed with a dash offset) + shards for the landing
    const outer = s('g'), body = s('g')
    icon(body, itemName, { x: 0, y: 0, size: 100 })
    const cracks = crackD.slice(0, c.long ? 2 : 1).map(dd => s('path', { d: dd, fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': '140', 'stroke-dashoffset': '140' }))
    outer.append(body, ...cracks)
    nearFront.append(outer)
    c.item = { outer, body, cracks }
    c.slot = heapSlot(c.i)
    const R = rng(900 + c.i * 13)
    c.shards = [0, 1, 2, 3].map(k => {
      const el = s('path', { d: 'M0,-9L8,6L-7,5Z', fill: C.grey, opacity: 0 })
      nearFront.append(el)
      return { el, v: [(k < 2 ? -1 : 1) * (120 + 220 * R()), -(260 + 260 * R())], spin: (R() - 0.5) * 900 }
    })
    // the same money, invested: a gold copy of the coin flies from his hand onto the tower at the swap
    c.dep = coin(g.front, { r: 26, text: '' })
    c.dep0 = c.t + 0.02
    c.dep1 = c.t + (c.big ? 0.62 : 0.5)
    // ... and on the first purchase, the money that is gone: a red ghost of the coin drifts onto the spent column
    if (c.big) {
      c.ghost = s('g', { opacity: 0 })
      c.ghost.append(s('circle', { r: 1, fill: C.redSoft, stroke: C.red, 'stroke-width': 4, 'stroke-dasharray': '12 9' }))
      g.front.append(c.ghost)
      c.gh1 = c.t + 0.58
    }
  }
  // the piles start with the first purchase (frame 1 shows the empty slots and the coin in his hand)
  const revealSp = showFig && cycles.length ? cycles[0].gh1 : -1e9
  const revealOw = showFig && cycles.length ? cycles[0].dep1 : -1e9
  // the minimum slab's label goes inside the slab unless the junk heap would touch it there (the heap is widest on
  // screen at zoom 1); then it sits on top of the slab like a tag
  const heapLeft = Math.min(1e9, ...(showFig ? cycles : []).map(c => {
    let bb = { width: 100, height: 100 }
    try { bb = c.item.body.getBBox() } catch (e) { /* not laid out: assume the full icon box */ }
    const a = (few ? c.slot.rot * 0.2 : c.slot.rot) * Math.PI / 180
    return c.slot.x - 6 - 0.5 * heapScale(1) * (bb.width * Math.abs(Math.cos(a)) + bb.height * Math.abs(Math.sin(a)))
  }))
  const labIn = Math.max(SX, 66 + Math.max(SW, spLabW + 28) / 2) + spLabW / 2 + 10 <= heapLeft

  // tags: "May 2014 · $8.99" over his head while a labelled purchase is made
  const tags = cycles.filter(c => c.pu).map((c, i, arr) => {
    const el = h('div', { class: 'pr-tag' })
    const lbl = c.pu.label != null && String(c.pu.label).trim() ? esc(c.pu.label) : ''
    const pr = c.pu.price != null ? esc(c.pu.price) : ''
    el.innerHTML = lbl && pr ? `${lbl} · <u>${pr}</u>` : (lbl || `<u>${pr}</u>`)
    hud.append(el)
    if (lbl && pr && el.offsetWidth > FX - 64 - 70 * FIGK) { el.innerHTML = `${lbl}<br><u>${pr}</u>`; style(el, { textAlign: 'right' }) }
    const nextT = i < arr.length - 1 ? arr[i + 1].t : Infinity
    return { el, t0: c.t - 0.06, t1: Math.min(c.t + 1.8, nextT - 0.12, T1 - 0.1), w: el.offsetWidth, hh: el.offsetHeight }
  })

  // ============================================================================ events: crashes, crossings, the end
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const reacts = [], hops = []
  const busy = t => cycles.some(c => (t > c.t - 0.45 && t < c.t + 0.5) || (t > c.rel - 0.35 && t < c.land + 0.05))
  const towerTop = t => BASE - zAt(t) * K * ownAt(t)
  // crashes: a point-to-point drop of 15% or more (the first of a run of drops), biggest three
  const drops = []
  for (let j = 1; j < owP.length; j++) {
    const a = owP[j - 1][1], b = owP[j][1]
    if (b < a * 0.85 && owP[j][0] > xf && owP[j - 1][0] < xt) drops.push({ j, x: owP[j - 1][0], mag: 1 - b / a, t: tOfX(owP[j - 1][0]) + 0.12 * (tOfX(owP[j][0]) - tOfX(owP[j - 1][0])) })
  }
  // a run of falling segments is one crash (its first segment), so he is not shocked every year of a slide
  const crashes = drops.filter((dr, i) => !(i && drops[i - 1].j === dr.j - 1))
    .sort((a, b) => b.mag - a.mag).slice(0, 3).filter(c => c.t > 0.3 && c.t < T1 + 0.2).sort((a, b) => a.t - b.t)
  for (const c of crashes) {
    fxk.impact(c.t, { x: TX, y: towerTop(c.t), r: 34, rx: TW * 0.55, ry: 22, lines: 9, shake: 6, cue: 'buzz', gain: 0.32, color: C.red })
    reacts.push({ t: c.t + 0.05, pose: 'shocked', d: 0.75, keepF: busy(c.t) || busy(c.t + 0.5) })
  }
  // the tower crossing the paid line
  const crossings = []
  {
    let sgn = Math.sign(ownAt(T0) - spendAt(T0)) || 1
    for (let tt = T0; tt <= T1; tt += DT) {
      const sg = Math.sign(ownAt(tt) - spendAt(tt))
      if (sg && sg !== sgn) { crossings.push({ t: tt, below: sg < 0 }); sgn = sg }
    }
  }
  for (const cr of crossings) {
    if (crashes.some(c => Math.abs(c.t - cr.t) < 0.7)) continue
    if (cr.below) {
      ctx.cue(cr.t, 'buzz', { gain: 0.26 })
      if (!reacts.some(r => Math.abs(r.t - cr.t) < 0.9)) reacts.push({ t: cr.t, pose: P.ohno, d: 0.7, keepF: busy(cr.t) || busy(cr.t + 0.5) })
    } else ctx.cue(cr.t, 'tick', { gain: 0.3 })
  }
  // tower coin landings: a soft tick now and then (never on top of a purchase's pop or thud)
  {
    const lands = []
    for (const cn of stack) for (const iv of cn.iv) if (iv[0] > 0.2 && iv[0] < T1 - 0.3) lands.push(iv[0])
    lands.sort((a, b) => a - b)
    const quiet = tl => cycles.every(c => Math.abs(tl - c.t) > 0.35 && Math.abs(tl - c.land) > 0.35)
    let last = -9
    for (const tl of lands) if (tl - last >= 0.9 && quiet(tl)) { ctx.cue(tl, 'tick', { gain: 0.14 }); last = tl }
  }
  // the end
  const endPose = lo.endPose || (ratio >= 2.5 ? 'celebrate' : ratio >= 1 ? 'shrug' : 'slump')
  if (win) {
    fxk.impact(T1, { x: pb.cx, y: pb.cy, rx: pb.w / 2 + 12, ry: pb.h / 2 + 10, r: 44, lines: 14, shake: 12, punch: 0.025, cue: 'hit', gain: 0.9 })
    ctx.cue(T1 + 0.1, 'cash', { gain: 0.6 })
    ctx.cue(T1 - 1.0, 'riser', { dur: 0.95, gain: 0.22 })
  } else {
    fxk.impact(T1, { x: TX, y: towerTop(T1), r: 34, rx: TW * 0.55, ry: 22, lines: 9, shake: 8, cue: 'thud', gain: 0.6, color: C.red })
  }

  // ============================================================================ the figure's pose track
  const fig = showFig ? new Figure(nearFig, { scale: FIGK }) : null
  const keys = [{ t: 0, pose: cycles.length && cycles[0].big ? P.present : P.watch }]
  const useP = itemName === 'cup' ? P.drink : P.use
  for (const c of cycles) {
    if (c.i > 0) keys.push({ t: c.t - c.pre - 0.1, pose: P.hold, d: 0.18, e: 'out' })
    keys.push({ t: c.t + (c.big ? 0.22 : 0.1), pose: useP, d: c.big ? 0.32 : 0.24, e: 'spring' })
    if (c.long) keys.push({ t: c.t + 1.5, pose: P.holdLow, d: 0.4, e: 'inOut' })
    keys.push({ t: c.rel - 0.22, pose: P.wind, d: 0.13, e: 'inOut' })
    keys.push({ t: c.rel - 0.08, pose: P.fling, d: 0.09, e: 'out' })
    const after = c.next - c.rel < 0.75 ? P.hold : P.watch
    keys.push({ t: c.rel + 0.14, pose: after, d: 0.3, e: 'spring' })
    ctx.cue(c.t + 0.03, 'pop', { gain: c.big ? 0.5 : 0.3 })
    ctx.cue(c.land, 'thud', { gain: 0.24 })
    if (c.long) c.cracks.forEach(tc => ctx.cue(tc, 'tick', { gain: 0.35 }))
  }
  if (endPose === 'celebrate') {
    keys.push({ t: T1 - 0.24, pose: P.dip, d: 0.16, e: 'inOut' })
    keys.push({ t: T1 + 0.02, pose: 'celebrate', d: 0.24, e: 'spring' })
    keys.push({ t: T1 + 1.35, pose: 'pointUp', d: 0.32, e: 'spring' })
    hops.push({ t0: T1 + 0.02, dur: 0.42, h: 52 })
    ctx.cue(T1 + 0.44, 'step', { gain: 0.5 })
  } else if (endPose === 'point') {
    keys.push({ t: T1 + 0.1, pose: 'pointUp', d: 0.3, e: 'spring' })
  } else {
    keys.push({ t: T1 + 0.25, pose: endPose === 'slump' ? 'slump' : 'shrug', d: 0.3, e: 'spring' })
  }
  const base = poseTrack(keys)
  const reactW = (t, r) => (t < r.t || t > r.t + r.d ? 0 : Math.min(E.out(prog(t, r.t, 0.1)), 1 - E.inOut(prog(t, r.t + r.d - 0.3, 0.3))))
  for (const r of reacts) if (r.pose === 'shocked') hops.push({ t0: r.t, dur: 0.4, h: 30 })
  const poseAt = t => {
    let p = base.at(t)
    for (const r of reacts) {
      const w = reactW(t, r)
      if (w <= 0) continue
      const q = blendPose(p, r.pose, w)
      if (r.keepF) q.aF = p.aF                         // the hand with the item keeps doing its job
      p = q
    }
    return p
  }
  const figJ = (t) => {
    const p = secondary(poseAt(t), t, { prev: poseAt(t - 0.07) })
    let lift = p.lift || 0
    for (const hp of hops) lift += hop(t, hp.t0, hp.dur, hp.h)
    return fk({ ...p, lift }, { x: FX, ground: FLOOR, face: 1, scale: FIGK })
  }
  // where a held thing sits: the big coin held out at arm's length (gripped at its edge), a small coin or the item
  // just above the front hand
  const inHand = (J, what, c) => {
    if (what === 'bigcoin') return [J.hF[0] + c.coinR * 0.74, J.hF[1] - c.coinR * 0.12]
    if (what === 'coin') return [J.hF[0] + 4, J.hF[1] - c.coinR * 0.75]
    return [J.hF[0] + 12, J.hF[1] - 16]
  }
  const J0 = fk(poseOf('stand'), { x: FX, ground: FLOOR, scale: FIGK })
  const HEAD0 = [J0.head[0], J0.head[1] - J0.R]
  const ZF = 0.62                                       // the figure shrinks with the camera, but only this much of it
  const zfOf = z => lerp(1, z, ZF)
  const toScreen = (p, zf) => [FX + (p[0] - FX) * zf, FLOOR + (p[1] - FLOOR) * zf]

  // ============================================================================ seek
  function seek(t) {
    const x = xNow(t), z = zAt(t)
    const spV = spendAt(t), owV = ownAt(t)
    const done = t >= T1

    // ---- timeline + year
    setText(yearEl, yearText(x))
    const rx = railX(x)
    attr(railFill, 'x2', f1(rx)); attr(railFill, 'opacity', rx - RX0 > 1 ? '1' : '0')
    attr(railMark, 'cx', f1(rx))
    for (const rd of railDots) {
      const on = x >= rd.x - 1e-9
      attr(rd.el, 'fill', on ? C.red : C.void)
      attr(rd.el, 'r', on ? f1(9 + 5 * Math.sin(Math.PI * prog(t, tOfX(rd.x), 0.25))) : '9')
    }

    // ---- counters: running values that land exactly on the spec's final strings
    const landP = smooth(prog(t, T1 - 0.5, 0.5))
    const vSp = lerp(spV, spEnd, landP), vOw = lerp(owV, owEnd, landP)
    const below = owV < spV - 1e-9
    // the same stake prints the same way on both sides: before the race and under $100 both counters use the
    // larger number of decimals of the two finals ("$7.99" twice, not "$7.99" against "$8")
    const dpJ = Math.max(runL.dp, runR.dp)
    const dpOf = (run, v) => (t < T0 || Math.abs(v) < 100 ? dpJ : run.dp)
    // the spent counter's number: the slab label below always shows this same string (never the final early)
    const bigL = done && runL.final ? runL.final.big : runL.text(vSp, dpOf(runL, vSp))
    setText(vL.big, bigL); setText(vL.sm, done && runL.final ? runL.final.small : runL.post)
    const sw = swapAt(t, T1, 0.3)
    if (sw.phase && runR.final) { setText(vR.big, runR.final.big); setText(vR.sm, runR.final.small) }
    else { setText(vR.big, runR.text(vOw, dpOf(runR, vOw))); setText(vR.sm, runR.post) }
    style(vL.el, { color: C.red, transform: (() => { const q = squashAt(t, T1, 0.08); return `scale(${q.sx.toFixed(3)},${q.sy.toFixed(3)})` })() })
    const ownCol = done ? (win ? C.ink : C.red) : below ? C.red : C.heroInk
    style(vR.el, { color: ownCol, transform: `scale(${sw.sx.toFixed(3)},${sw.sy.toFixed(3)})`, opacity: sw.opacity.toFixed(3) })
    if (win) {
      const pp = popIn(t, T1 + 0.08, 0.3, 0.6)
      style(plate, { display: t < T1 + 0.08 ? 'none' : '', transform: `scale(${pp.scale.toFixed(3)})`, opacity: pp.opacity.toFixed(3) })
    } else style(plate, { display: 'none' })

    // ---- spent column (ghost money) + the paid line
    const spOn = t >= revealSp
    const sqS = squashAt(t, revealSp, 0.35).sy
    const hs = spOn ? z * K * spV * sqS : 0, swd0 = SW * (0.62 + 0.38 * z), zP = z * PITCH
    const twd = TW * (0.62 + 0.38 * z)
    // the spent money never shrinks to a sliver: it is drawn as a slab at least MINS px tall, labelled with the
    // counter's own running number (spend.final only once the counter lands on it); the dotted paid line still
    // marks its true height on the shared scale. A taller column needs no label: the counter says it.
    const minMode = spOn && hs < MINS
    const hsD = spOn ? Math.max(hs, MINS * sqS) : 0, swd = minMode && labIn ? Math.max(swd0, spLabW + 28) : swd0
    const scx = minMode && labIn ? Math.max(SX, 66 + swd / 2) : SX
    attr(spRect, 'x', f1(scx - swd / 2)); attr(spRect, 'width', f1(swd))
    attr(spRect, 'y', f1(BASE - hsD)); attr(spRect, 'height', f1(Math.max(0, hsD)))
    attr(spRect, 'opacity', hsD > 1.5 ? '1' : '0')
    spLab.set({ text: bigL, x: labIn ? scx : Math.max(scx, 64 + spLabW / 2), y: labIn ? BASE - hsD / 2 + 2 : BASE - hsD - 28, opacity: minMode && t >= revealSp + 0.2 ? clamp((t - revealSp - 0.2) / 0.2) : 0 })
    const step = Math.max(1, Math.ceil(7 / zP))
    let dd = ''
    for (let j = step; j * zP < hsD - 4; j += step) if (!minMode) dd += `M${f1(SX - swd / 2 + 8)},${f1(BASE - j * zP)}H${f1(SX + swd / 2 - 8)}`
    attr(spLines, 'd', dd || 'M0,0')
    attr(spLines, 'opacity', dd ? '0.45' : '0')
    attr(paid, 'x1', f1(scx + swd / 2 + 12)); attr(paid, 'x2', f1(TX + twd / 2 + 18))
    attr(paid, 'y1', f1(BASE - hs)); attr(paid, 'y2', f1(BASE - hs))
    attr(paid, 'opacity', (0.9 * clamp((hs - 8) / 10)).toFixed(3))
    for (const [cx, w0, el] of slots) {                 // the empty slots shrink with the camera; a pile covers its own
      const w = w0 * (0.62 + 0.38 * z)
      attr(el, 'x', f1(cx - w / 2)); attr(el, 'width', f1(w)); attr(el, 'y', f1(BASE - zP)); attr(el, 'height', f1(zP))
    }

    // ---- the tower: coins drop on, tumble off; it wobbles when the stock falls
    let wob = 0
    for (const c of crashes) wob += wobble(t, c.t, 2.6, 2.6, 3.2)
    attr(towerG, 'transform', Math.abs(wob) > 0.01 ? `rotate(${wob.toFixed(2)},${TX},${BASE})` : '')
    const swk = clamp(3.5 * Math.sqrt(z), 1.6, 3.5).toFixed(2)
    {
      const hw = K * owV, show = hw > 0.5 && hw < PITCH * 0.5 && t >= (cycles.length ? cycles[0].dep1 : 0)
      const hh = Math.max(5, hw * z)
      attr(sliver, 'x', f1(TX - twd / 2)); attr(sliver, 'width', f1(twd)); attr(sliver, 'y', f1(BASE - hh)); attr(sliver, 'height', f1(hh))
      attr(sliver, 'opacity', show ? '1' : '0')
    }
    for (let k = 0; k < stack.length; k++) {
      const el = coinEls[k]
      let on = null
      for (const iv of stack[k].iv) if (t < iv[1] && t >= iv[0] - 0.3) { on = iv; break }
      if (!on) { style(el, { display: 'none' }); continue }
      const y0 = BASE - zP * (k + 1)
      const dropH = clamp(y0 - stageTop - 6, 0, 64)
      const tau = Math.sqrt((2 * dropH) / 4200)
      if (t < on[0] - tau && on[0] > revealOw) { style(el, { display: 'none' }); continue }
      if (t < revealOw) { style(el, { display: 'none' }); continue }
      const pre = on[0] <= revealOw                      // already there when the first deposit lands
      const f = pre ? { y: 0 } : fall(t, on[0] - tau, dropH, { g: 4200, e: 0.22, n: 1 })
      const q = squashAt(t, pre ? revealOw : on[0], 0.3)
      const w = twd * q.sx, hh = zP * q.sy
      style(el, { display: '' })
      attr(el, 'x', f1(TX + jit[k] * z - w / 2)); attr(el, 'width', f1(w))
      attr(el, 'y', f1(y0 + zP - hh - f.y)); attr(el, 'height', f1(hh))
      attr(el, 'rx', f1(Math.min(7, hh / 2))); attr(el, 'stroke-width', swk)
    }
    for (const tu of tumbles) {
      const dt = t - tu.tb
      if (dt < 0 || dt > 1.4) { style(tu.el, { display: 'none' }); continue }
      const fl = Math.abs(Math.sin(tu.flip * Math.min(dt, 0.75)))
      const rx = (tu.w / 2) * (1 - 0.18 * prog(dt, 0, 0.8)), ry = Math.max(tu.h / 2, rx * 0.42 * fl)
      let [px, py] = toss(t, tu.tb, tu.p0, tu.v, { g: 3000, floor: FLOOR, r: tu.h / 2 + 2, e: 0.3, friction: 0.5, n: 2 })
      const tilt = tu.tilt * E.out(prog(dt, 0, 0.3)) * (1 - fl * 0.3)
      py = Math.min(py, FLOOR - Math.abs(rx * Math.sin(tilt * Math.PI / 180)) - ry * Math.abs(Math.cos(tilt * Math.PI / 180)) + 2)
      style(tu.el, { display: '' })
      attr(tu.el, 'transform', `translate(${f1(px)},${f1(py)}) rotate(${tilt.toFixed(1)})`)
      attr(tu.el, 'opacity', (1 - prog(dt, 0.95, 0.4)).toFixed(3))
      attr(tu.disc, 'rx', f1(rx)); attr(tu.disc, 'ry', f1(ry)); attr(tu.disc, 'stroke-width', clamp(3.5 * Math.sqrt(tu.z), 1.6, 3.5).toFixed(2))
      attr(tu.ring, 'rx', f1(rx * 0.76)); attr(tu.ring, 'ry', f1(Math.max(0, ry - rx * 0.24))); attr(tu.ring, 'opacity', fl > 0.35 ? '0.8' : '0')
    }

    // ---- the near group (figure, coins, items, heap) zooms about his feet
    const zf = zfOf(z)
    attr(near, 'transform', zf < 0.999 ? `translate(${FX},${FLOOR}) scale(${zf.toFixed(4)}) translate(${-FX},${-FLOOR})` : '')
    let J = null
    if (showFig) {
      J = figJ(t)
      let sq = { sx: 1, sy: 1 }
      for (const hp of hops) { const q = squashAt(t, hp.t0 + hp.dur, 0.16); sq = { sx: sq.sx * q.sx, sy: sq.sy * q.sy } }
      fig.draw(J, sq)
    }
    for (const c of cycles) {
      // coin: in hand from its pop (or frame 1) until it squashes into the item
      const tPop = c.big ? -1 : c.t - c.pre
      const csw = swapAt(t, c.t, 0.26)
      if (!showFig || t < tPop || csw.phase === 1) c.coin.set({ opacity: 0 })
      else {
        const pp = c.big ? { scale: 1, opacity: 1 } : popIn(t, tPop, 0.18, 0.5)
        const pos = inHand(J, c.big ? 'bigcoin' : 'coin', c)
        c.coin.set({ x: pos[0], y: pos[1], r: c.coinR * pp.scale, sx: csw.sx, sy: csw.sy, opacity: pp.opacity * csw.opacity })
      }
      // deposit: the gold copy arcs onto the tower top and sinks into it
      if (!showFig || t < c.dep0 || t > c.dep1 + 0.12) c.dep.set({ opacity: 0 })
      else {
        const zf0 = zfOf(zAt(c.dep0))
        const from = toScreen(inHand(figJ(c.dep0), c.big ? 'bigcoin' : 'coin', c), zf0)
        const to = [TX, Math.min(towerTop(c.dep1), BASE - 6) - 18]
        const p = prog(t, c.dep0, c.dep1 - c.dep0)
        const [dx, dy] = arc(E.inOutSine(p), from, to, c.big ? 150 : 110)
        const r0 = c.big ? c.coinR * zf0 : 26 * zf0, r1 = 24 * zAt(c.dep1) + 6
        const sink = prog(t, c.dep1, 0.12)
        c.dep.set({ x: dx, y: dy + 14 * sink, r: lerp(r0, r1, E.out(p)) * (1 - 0.5 * sink), rot: 300 * p, spin: 0.7 * Math.abs(Math.sin(p * Math.PI * 2.5)), opacity: 1 - sink })
      }
      if (c.ghost) {
        if (!showFig || t < c.dep0 || t > c.gh1 + 0.15) attr(c.ghost, 'opacity', '0')
        else {
          const zf0 = zfOf(zAt(c.dep0))
          const from = toScreen(inHand(figJ(c.dep0), 'bigcoin', c), zf0)
          const to = [SX, BASE - Math.max(10, zAt(c.gh1) * K * spendAt(c.gh1)) - 12]
          const p = prog(t, c.dep0, c.gh1 - c.dep0)
          const [gx, gy] = arc(E.inOutSine(p), from, to, 130)
          const sink = prog(t, c.gh1, 0.15)
          attr(c.ghost, 'transform', `translate(${f1(gx)},${f1(gy)}) scale(${lerp(c.coinR * zf0, 30, E.out(p)).toFixed(2)}) rotate(${(-200 * p).toFixed(1)})`)
          attr(c.ghost.firstChild, 'stroke-width', (4 / lerp(c.coinR * zf0, 30, E.out(p))).toFixed(4))
          attr(c.ghost.firstChild, 'stroke-dasharray', `${(12 / lerp(c.coinR * zf0, 30, E.out(p))).toFixed(4)} ${(9 / lerp(c.coinR * zf0, 30, E.out(p))).toFixed(4)}`)
          attr(c.ghost, 'opacity', ((1 - sink) * clamp(p * 6)).toFixed(3))
        }
      }
      // item: pops in at the swap, used, cracks, flung over his shoulder onto the heap, then stays there grey
      const it = c.item
      if (!showFig || t < c.t || csw.phase === 0) {
        style(it.outer, { display: 'none' })
        for (const sh of c.shards) attr(sh.el, 'opacity', '0')
        continue
      }
      style(it.outer, { display: '' })
      let ix, iy, rot = 0, sc = 1, grey = smooth(prog(t, c.cracks[0], c.rel - c.cracks[0]))
      if (t < c.rel) {
        ;[ix, iy] = inHand(J, 'item', c)
        if (c.big) {                                     // the item pops in where the big coin was, then comes to hand
          const cp = inHand(J, 'bigcoin', c), q = E.inOut(prog(t, c.t + 0.1, 0.32))
          ix = lerp(cp[0], ix, q); iy = lerp(cp[1], iy, q)
        }
        sc = csw.sx * 0.92
        rot = wobble(t, c.cracks[c.cracks.length - 1], 9, 5, 5) + (c.long && t > c.t + 1.5 ? -14 : 0)
      } else if (t < c.land) {
        const p = prog(t, c.rel, c.fl)
        const from = inHand(figJ(c.rel), 'item', c)
        const s1 = heapScale(zf)
        ;[ix, iy] = arc(E.inOutSine(p), from, [c.slot.x, heapY(c, s1)], 120)
        rot = -400 * p
        sc = lerp(0.92, s1, p)
        grey = 1
      } else {
        const q = squashAt(t, c.land, 0.28)
        sc = heapScale(zf)
        ix = c.slot.x; iy = heapY(c, sc); rot = few ? c.slot.rot * 0.2 : c.slot.rot; grey = 1
        attr(it.body, 'transform', `scale(${q.sx.toFixed(3)},${q.sy.toFixed(3)})`)
      }
      if (t < c.land) attr(it.body, 'transform', '')
      attr(it.outer, 'transform', `translate(${f1(ix)},${f1(iy)}) rotate(${rot.toFixed(1)}) scale(${sc.toFixed(3)})`)
      style(it.outer, { filter: grey > 0.01 ? `grayscale(${grey.toFixed(2)})` : 'none', opacity: (1 - 0.3 * grey).toFixed(3) })
      it.cracks.forEach((cr, k) => attr(cr, 'stroke-dashoffset', (140 * (1 - E.out(prog(t, c.cracks[k] ?? c.rel, 0.14)))).toFixed(1)))
      // shards burst from the heap landing
      for (const sh of c.shards) {
        const dt = t - c.land
        if (dt < 0 || dt > 0.9) { attr(sh.el, 'opacity', '0'); continue }
        const [sx, sy] = toss(t, c.land, [c.slot.x, c.slot.y - 10], sh.v, { g: 3200, floor: FLOOR - 4, e: 0.3, n: 1 })
        attr(sh.el, 'transform', `translate(${f1(sx)},${f1(sy)}) rotate(${(sh.spin * dt).toFixed(1)})`)
        attr(sh.el, 'opacity', (1 - prog(dt, 0.45, 0.45)).toFixed(3))
      }
    }

    // ---- purchase tags over his head
    const hd = toScreen(HEAD0, zf)                     // tags hang beside his standing head (steady while he moves)
    for (const tg of tags) {
      if (t < tg.t0 || t > tg.t1) { style(tg.el, { display: 'none' }); continue }
      const pp = popIn(t, tg.t0, 0.22, 0.92)
      const out = 1 - prog(t, tg.t1 - 0.18, 0.18)
      const tx = Math.max(64, hd[0] - 52 * zf - tg.w), ty = clamp(hd[1] + 30 * zf - 0.5 * tg.hh, stageTop + 4, FLOOR - 120 - tg.hh)
      style(tg.el, { display: '', transform: `translate(${f1(tx)}px,${f1(ty)}px) scale(${pp.scale.toFixed(3)})`, opacity: (pp.opacity * out).toFixed(3) })
    }

    // ---- impacts + camera (shake; the punch zooms about the plate)
    const { shake, zoom } = fxk.seek(t)
    cam.set({ fx: pb.cx, fy: pb.cy, x: pb.cx, y: pb.cy, zoom, shake })
  }

  return { duration, seek }
}
