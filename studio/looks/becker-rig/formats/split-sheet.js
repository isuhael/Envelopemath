// becker-rig · split-sheet (FORMATS.md §5): one round sum, every percentage in dollars (P9).
//
// "The paycheck carve". The total is a gold slab of money hanging over a row of labelled bins, and the figure
// stands on top of it with a saw. Frame 1 already shows the whole sheet: the slab with the total, and one bin per
// part with its label (white on an ink plinth) and its percentage inside a dashed outline of how full the bin
// will get. Then he works along the slab, left to right, one part at a time: he saws through at the part's cut
// mark, the piece drops, squeezes into its bin (thud + squash) and fills it to the dashed line, and the dollar
// amount lands above the bin. The newest amount is green and settles to ink, so there is one focal number at a
// time; a goal part lands on a gold plate with the impact kit. Before the last piece drops he hops off the end
// of the slab onto the floor. Where the slab was, the sum check then assembles itself: copies of the amounts
// jump up out of the bins into "$a + $b + $c = $total".
//
// Layouts (picked from the content, measured with the real fonts at mount):
//   bins  up to 5 parts whose labels (<= 2 lines) and amounts fit a bin: the carve described above. The bins
//         leave the floor corner at the right free: the slab's post stands there and he hops down there at the end.
//   rows  more parts or long labels: a sheet of rows (label and percentage, a long label on 2 lines with the
//         percentage after it, or the percentage in the value column when space is short; the amount on the
//         right) with a thin track under each; the slab stands on its post above the sheet, every piece drops
//         straight down onto its own track (a waterfall of the total), and the figure stands on the floor in the
//         corner at the right and points. It degrades step by step (see rowsLayout) and throws only when 7
//         one-line rows cannot fit.
// The total's label is fitted to the slab (<= 2 lines, a non-breaking hyphen, 40 -> 34 px).
// A working line under the slab (mono, one at a time) carries each part's note, the "÷ 10" formula and the gag.
//
// lookOpts (all optional; it renders fully without them):
//   tenth: { t, formula, display, count }   cut the total into `count` equal bricks first ("$3,000 ÷ 10" = $300):
//            he raises a "÷ 10" cleaver while the formula types, slams it down at t, the slab cracks into bricks
//            showing the display, and each part then takes share × count bricks, which stack up in its bin.
//            Ignored unless every share × count is a whole number.
//   actions: [{ t, tool }]                  the first entry without "part": when the cleaver comes out, its label
//   envelopes: ["NEEDS", ...]               bin names (default: the part labels)
//   gag: { t, text }                        a closing working line, e.g. "$900 ÷ 30 = $30 a day"
//   layout: 'bins' | 'rows'                 force a layout
//   figure: false                           no figure (the pieces just drop on their beats)
//   figureScale: number                     override the figure size
import {
  h, s, style, attr, setHTML, markup, plain, prog, clamp, lerp, typed,
  C, F, L, S, E, track, poseTrack, poseOf, runPose, blendPose, secondary, fk, pinLimb, blendJ, Figure,
  makeWorld, makeFx, camera, NumObj, chromeParts, durationOf, num, measure, arc, hop, squashAt, popIn, toneOf, rng, wobble,
} from '../lib.js'

const X0 = 64, X1 = 936, W = X1 - X0       // the slab spans this in bins mode (text stays <= 940 below y 820)
const BX1 = 806                             // bins end here: the floor corner right of them is the figure's spot
const XR = 800                              // rows mode: the slab, trays and rows end here (same corner)
const FIG_X = { bins: 862, rows: 884 }      // where he stands on the floor at the end (bins) / all along (rows)
const FLOOR = L.floorY
const FALL = 0.3                            // a piece falls from the slab into its bin in this long
const STAGGER = 0.07                        // bricks of one part land this far apart
// The slab is a physical object: it stands on an ink post at its right end (a bracket under its last stretch),
// so the shrinking remainder he stands on is always held up, and the last piece tips off the bracket into its bin.
const PLATE = [14, 7]                       // gold plate padding around a goal amount
const WL_LH = 50                            // working line: 40 px mono on an integer 50 px line

export const css = `
.ss-totl { font: 800 40px/44px ${F.head}; letter-spacing: .06em; text-transform: uppercase; color: ${C.ink}; }
.ss-tot { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; color: ${C.ink}; }
.ss-seg { font: 800 40px/1 ${F.mono}; letter-spacing: -0.03em; color: ${C.ink}; }
.ss-brick { font: 900 34px/1 ${F.head}; letter-spacing: -0.04em; color: ${C.ink}; }
.ss-lab { position: absolute; text-align: center; font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; color: ${C.white}; white-space: nowrap; }
.ss-pct { font: 800 40px/1 ${F.mono}; letter-spacing: -0.03em; }
.ss-pct.tag { background: ${C.white}; border: 4px solid ${C.ink}; border-radius: 12px; padding: 4px 10px 3px; color: ${C.ink}; }
.ss-amt { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; }
.ss-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 16px; transform-origin: 50% 100%; }
.ss-wl { position: absolute; left: ${X0}px; width: ${W}px; text-align: center; font: 700 40px/${WL_LH}px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; transform-origin: 50% 50%; }
.ss-wl b { color: ${C.ink}; font-weight: 800; }
.ss-wl em { color: ${C.heroInk}; font-weight: 800; }
.ss-check { position: absolute; left: ${X0}px; width: ${W}px; text-align: center; font-family: ${F.head}; font-weight: 900; letter-spacing: -0.02em; color: ${C.ink}; }
.ss-check .tk { display: inline-block; transform-origin: 50% 100%; }
.ss-check .tk.op { color: ${C.grey}; }
.ss-rl { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; color: ${C.ink}; }
.ss-rl .p { font-family: ${F.mono}; font-weight: 800; letter-spacing: -0.03em; color: ${C.grey}; }
.ss-rl.wrap { white-space: normal; }
`

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fH = (w, px) => `${w} ${px}px ${F.head}`
const fM = (w, px) => `${w} ${px}px ${F.mono}`
const RAD = Math.PI / 180

// greedy word wrap into at most maxLines lines no wider than maxW (null if it does not fit)
function wrap(text, font, maxW, maxLines, mo = {}) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''
  for (const w of words) {
    const nx = cur ? cur + ' ' + w : w
    if (!cur || measure(nx, font, mo) <= maxW + 0.5) cur = nx
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  if (!lines.length) lines.push('')
  if (lines.length > maxLines || lines.some(l => measure(l, font, mo) > maxW + 0.5)) return null
  return lines
}

// a label in at most 2 lines: line 1 <= w1, line 2 <= w2 (balanced: the first line the longer one). With cut, a
// second line that still does not fit is cut at a word with an ellipsis. -> [lines] | null
function lines2(text, font, w1, w2, mo = {}, cut = false) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const W = s2 => measure(s2, font, mo)
  const whole = words.join(' ')
  if (W(whole) <= Math.min(w1, w2) + 0.5) return [whole]
  if (cut === 'one') {                                  // one line, cut at a word with an ellipsis
    for (let b = words.length - 1; b >= 1; b--) { const l = words.slice(0, b).join(' ').replace(/[,;:.\-–]+$/, '') + '…'; if (W(l) <= Math.min(w1, w2) + 0.5) return [l] }
    return null
  }
  let best = null
  for (let a = 1; a < words.length; a++) {
    const l1 = words.slice(0, a).join(' '), l2 = words.slice(a).join(' ')
    if (W(l1) > w1 + 0.5 || W(l2) > w2 + 0.5) continue
    const cost = Math.max(W(l1), W(l2)) + (W(l2) > W(l1) ? 30 : 0)
    if (!best || cost < best.c) best = { l: [l1, l2], c: cost }
  }
  if (best) return best.l
  if (!cut) return null
  for (let a = words.length - 1; a >= 1; a--) {
    const l1 = words.slice(0, a).join(' ')
    if (W(l1) > w1 + 0.5) continue
    const rest = words.slice(a)
    for (let b = rest.length; b >= 1; b--) {
      const l2 = rest.slice(0, b).join(' ').replace(/[,;:.\-–]+$/, '') + (b < rest.length ? '…' : '')
      if (W(l2) <= w2 + 0.5) return [l1, l2]
    }
  }
  return null
}

// ------------------------------------------------------------------ props (SVG, ink, round caps)
// Saw: grip at the origin (inside the handle loop), blade along +x, teeth on the +y side.
function sawProp(parent) {
  const g = s('g', { class: 'ss-saw', 'data-deco': '' })
  const teeth = []
  for (let x = 26; x <= 160; x += 12) teeth.push(`L${x + 6},${25 - (x - 26) * 0.03}L${x + 12},${17 - (x - 26) * 0.03}`)
  g.append(
    s('path', { d: 'M20,-17L172,-8L172,13L20,18Z', fill: '#DCE1E7', stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }),
    s('path', { d: `M26,17${teeth.join('')}`, fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }),
    s('path', { d: 'M24,-25L-14,-27Q-30,-27 -30,-12L-30,13Q-30,28 -14,28L24,26Z', fill: C.coin, stroke: C.ink, 'stroke-width': 5, 'stroke-linejoin': 'round' }),
    s('rect', { x: -17, y: -12, width: 28, height: 25, rx: 9, fill: C.void, stroke: C.ink, 'stroke-width': 4 }),
  )
  parent.append(g)
  return g
}
// Cleaver with an operator on it (green mono on ink, like the kit's operator gate). Local frame for a figure
// facing left: grip at the origin, the handle runs back (+x), the blade sticks out in front (-x), edge down (+y).
const CLV = { bw: 158, top: -30, edge: 46, gap: 14 }
function cleaverProp(parent, label) {
  const g = s('g', { class: 'ss-cleaver', 'data-deco': '' })
  const shape = s('g')
  const bx = -CLV.gap - CLV.bw
  shape.append(
    s('rect', { x: -8, y: -10, width: 58, height: 20, rx: 10, fill: C.ink }),
    s('rect', { x: bx, y: CLV.top, width: CLV.bw, height: CLV.edge - CLV.top, rx: 10, fill: C.ink }),
    s('rect', { x: bx + 7, y: CLV.edge - 15, width: CLV.bw - 14, height: 9, rx: 4, fill: '#DCE1E7' }),
  )
  const cx = bx + CLV.bw / 2, cy = (CLV.top + CLV.edge - 15) / 2
  const tg = s('g')
  const tx = s('text', { x: cx, y: cy, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'br-gate-t', 'font-size': 42 })
  tx.textContent = label
  tg.append(tx)
  g.append(shape, tg)
  parent.append(g)
  return { g, shape, tg, cx }
}

export default function splitSheet(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const total = d.total || {}
  const PP = d.parts || []
  const n = PP.length
  if (!n) throw new Error('split-sheet: data.parts is empty')

  // ================================================================== content
  let shares = PP.map(p => (Number.isFinite(p.share) ? p.share : Number.isFinite(num(p.pct)) ? num(p.pct) / 100 : 1 / n))
  const sumS = shares.reduce((a, b) => a + b, 0)
  if (sumS > 1.0005) shares = shares.map(x => x / sumS)
  const cum = [0]
  for (const x of shares) cum.push(cum[cum.length - 1] + x)
  const leftover = 1 - cum[n] > 0.004                    // shares that do not add up leave a stub on the slab
  const times = []
  PP.forEach((p, i) => times.push(Number.isFinite(p.t) ? p.t : i ? times[i - 1] + 3 : 2.2))
  for (let i = 1; i < n; i++) times[i] = Math.max(times[i], times[i - 1] + 0.3)
  const tones = PP.map(p => p.tone || 'neutral')
  const goalI = tones.indexOf('goal')
  const labs = PP.map((p, i) => String((Array.isArray(lo.envelopes) && lo.envelopes[i]) || p.label || ''))
  const checkT = d.check ? (Number.isFinite(d.checkT) ? d.checkT : times[n - 1] + 1.8) : null
  const gag = lo.gag && lo.gag.text ? { t: Number.isFinite(lo.gag.t) ? lo.gag.t : (checkT ?? times[n - 1]) + 3, text: String(lo.gag.text) } : null
  const ext = spec.sfx || []
  // our own cues, minus any the spec already places (same kind within 0.15 s)
  const cue = (t, kind, o = {}) => { if (!(t >= 0)) return; if (ext.some(x => x.kind === kind && Math.abs(x.t - t) < 0.15)) return; ctx.cue(t, kind, o) }

  // ---- tenth mode: bricks
  let ten = null
  if (lo.tenth && lo.tenth.display && Math.round(lo.tenth.count) >= 2 && Math.round(lo.tenth.count) <= 24) {
    const cnt = Math.round(lo.tenth.count)
    const raw = shares.map(x => x * cnt), ks = raw.map(Math.round)
    if (raw.every((x, i) => Math.abs(x - ks[i]) < 0.04 && ks[i] >= 1) && ks.reduce((a, b) => a + b, 0) <= cnt) {
      const tt = Number.isFinite(lo.tenth.t) ? lo.tenth.t : Math.max(1.2, times[0] - FALL - 2.2)
      ten = { cnt, ks, t: tt, formula: String(lo.tenth.formula || ''), display: String(lo.tenth.display) }
    }
  }
  const act0 = (lo.actions || []).find(a => a && a.part == null && Number.isFinite(a.t))
  const toolT = ten ? clamp(act0 ? act0.t : ten.t - 1.4, 0.15, ten.t - 0.5) : 0
  const toolLabel = ten ? String((act0 && act0.tool) || ('÷ ' + ten.cnt)) : ''

  // units: the pieces that fall (one per part, or `count` bricks)
  const units = []
  if (ten) {
    let u = 0
    ten.ks.forEach((k, i) => { for (let j = 0; j < k; j++, u++) units.push({ part: i, j, k, a: u / ten.cnt, b: (u + 1) / ten.cnt }) })
  } else shares.forEach((x, i) => units.push({ part: i, j: 0, k: 1, a: cum[i], b: cum[i + 1] }))
  for (const u of units) { u.land = times[u.part] - (u.k - 1 - u.j) * STAGGER; u.drop = u.land - FALL }
  const partDrop = i => times[i] - FALL - (units.find(u => u.part === i).k - 1) * STAGGER
  let SW = W                                             // the slab's width (narrower in rows mode)
  const ux = v => X0 + v * SW

  // ---- working line (one string at a time): the ten formula, each note, the gag
  const wlStrings = [...(ten && ten.formula ? [`${ten.formula} = ${ten.display}`] : []), ...PP.map(p => p.note || '').filter(Boolean), ...(gag ? [gag.text] : [])]
  const wlFont = fM(700, 40), wlMo = { letterSpacing: '-0.02em' }
  const wlLines = wlStrings.length ? (wlStrings.some(x => measure(plain(x), wlFont, wlMo) > W - 4) ? 2 : 1) : 0
  let wlH = wlLines * WL_LH

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  const top = parts.workTop
  const showFig = lo.figure !== false
  const figHgt = k => { const J = fk(poseOf('stand'), { x: 0, ground: 1000, scale: k }); return 1000 - (J.head[1] - J.R) + 8 }
  // The slab carries the total's label and the total. The label is fitted to the slab: at most 2 lines, never
  // broken at a hyphen ("TAKE-HOME" uses a non-breaking hyphen), 40 -> 34 px, inside the slab's inner height; the
  // total gives way first (96 -> 64 px), then to 56. null when nothing fits that slab.
  const totDisp = String(total.display || '')
  const totLabTxt = String(total.label || '').replace(/-/g, '\u2011')
  const totW = px => measure(totDisp, fH(900, px), { letterSpacing: '-0.03em' })
  const totFit = (sw, slabH) => {
    // (capitals have no descenders: two lines set solid, line-height 1)
    for (const range of [[96, 64], [60, 56]]) {
      for (let lp = 40; lp >= 34; lp -= 2) {
        for (let tp = range[0]; tp >= range[1]; tp -= 4) {
          if (tp > slabH - 12) continue
          if (!totLabTxt) return { totPx: tp, labPx: 40, lines: [], lh: 40 }
          const maxW = sw - totW(tp) - 3 * 26
          const ls = lines2(totLabTxt.toUpperCase(), fH(800, lp), maxW, maxW, { letterSpacing: '.06em' })
          if (ls && ls.length * lp <= slabH - 16) return { totPx: tp, labPx: lp, lines: ls, lh: lp }
        }
      }
    }
    return null
  }

  function binsLayout() {
    if (n > 5) return null
    const gap = n <= 3 ? 26 : n === 4 ? 12 : 10
    const bw = (BX1 - X0 - (n - 1) * gap) / n
    let lab = null
    for (const px of [44, 40]) {
      const ls = labs.map(x => wrap(x, fH(800, px), bw + 2, 2, { letterSpacing: '-0.01em' }))   // the plinth is 10 px wider than the bin
      if (ls.every(Boolean)) { lab = { px, lines: ls, nl: Math.max(...ls.map(x => x.length)), lh: Math.round(px * 1.16) }; break }
    }
    if (!lab) return null
    let apx = 0
    // an amount may overhang its bin into the gutters (its landing squash is limited so it never touches a neighbour)
    for (let px = 72; px >= (n > 3 ? 48 : 52) && !apx; px -= 2) {
      if (PP.every((p, i) => measure(String(p.amount), fH(900, px), { letterSpacing: '-0.03em' }) + (tones[i] === 'goal' ? 2 * PLATE[0] + 14 : 0) <= bw + gap - 12)) apx = px
    }
    if (!apx) return null
    const plinthH = lab.nl * lab.lh + 18
    const binFloor = FLOOR - plinthH
    const slabH = totFit(W, 108) ? 108 : 124
    const tf = totFit(W, slabH)
    if (!tf) return null
    const amtH = apx + 2 * PLATE[1] + 4
    const below = slabH + 14 + (wlH ? wlH + 10 : 0) + amtH + 14         // slab top -> rim
    let k = lo.figureScale ?? 0.92, D = 0
    for (const kk of lo.figureScale ? [lo.figureScale] : [0.92, 0.86, 0.8]) {
      k = kk
      D = binFloor - top - (showFig ? figHgt(k) : 0) - below
      if (D >= 140) break
    }
    if (D < 96) return null
    D = Math.min(D, 236)
    const rim = binFloor - D
    const amtBot = rim - 12 - PLATE[1]
    const wlTop = amtBot - apx - PLATE[1] - 10 - wlH
    const slabBot = (wlH ? wlTop : amtBot - apx - PLATE[1]) - 14
    const slabTop = slabBot - slabH
    const maxS = Math.max(...shares)
    const bins = PP.map((p, i) => {
      const x0 = X0 + i * (bw + gap), x1 = x0 + bw
      const fillH = Math.max(14, (shares[i] / maxS) * (D - 22))
      return { x0, x1, cx: (x0 + x1) / 2, ix0: x0 + 12, ix1: x1 - 12, fillH }
    })
    return { mode: 'bins', gap, bw, lab, apx, plinthH, binFloor, D, rim, amtBot, wlTop, slabTop, slabH, k, bins, tf }
  }

  function rowsLayout() {
    // The sheet gives way step by step, densest content first, and throws only when 7 one-line rows cannot fit:
    //   1. labels 44 -> 40 px with the percentage after them (a long label on 2 lines), amounts 64 -> 44 px, a
    //      tray under each row, the slab 100 -> 88 px tall;
    //   2. the percentage moves into the value column ("28%  $1,680") so a label gets the full width, labels at
    //      40 px on a tighter 2-line leading, thin trays (the rows' pitch ~ 1.05 em x lines + 19), the slab down
    //      to 72 px, and the working line (the notes) goes;
    //   3. a label that still needs a third line is cut at a word on its second line, with an ellipsis.
    const RW = XR - X0
    const pctW = Math.max(...PP.map(p => measure(String(p.pct || ''), fM(800, 40), { letterSpacing: '-0.03em' })))
    const hasGoal = tones.includes('goal')
    const mo = { letterSpacing: '-0.01em' }
    let minLab = 40
    const tryOne = ({ useWL, slabH, lpx, lhK, apx, right, trackMin, cut, dense = false }) => {
      const tf0 = totFit(RW, slabH)
      if (!tf0 || tf0.labPx < minLab) return null
      const slabTop = top + 4
      const wlTop = slabTop + slabH + 14
      const rowsTop = wlTop + (useWL ? wlH + 12 : 0)
      const avail = FLOOR - 12 - rowsTop
      const aw = Math.max(...PP.map((p, i) => measure(String(p.amount), fH(900, apx), { letterSpacing: '-0.03em' }) * 1.1 + (tones[i] === 'goal' ? 2 * PLATE[0] + 8 : 0)))
      const room = right ? RW - aw - 28 - pctW - 24 : RW - aw - 28 - pctW - 16
      if (room < 200) return null
      const lh = Math.round(lpx * lhK)
      // after: the percentage follows the label's last line, so that line keeps room for it; right: full width
      const ls = labs.map(x => lines2(x, fH(800, lpx), right ? room : room + pctW + 16, room, mo, cut))
      if (ls.some(l => !l)) return null
      const textH = ls.map(l => Math.max(l.length * lh, apx + (hasGoal ? PLATE[1] + 2 : 0)))
      const sumT = textH.reduce((x, y) => x + y, 0)
      // dense: the track is a thin line right under the text (the piece lands on it as a slim bar)
      const trackH = dense ? 8 : clamp((avail - sumT) / n - 22, trackMin, 44)
      const g1 = dense ? 2 : 5, g2 = dense ? 4 : 8
      const rowH = textH.map(x => x + g1 + trackH + g2)
      const used = rowH.reduce((x, y) => x + y, 0)
      if (used > avail + 0.5) return null
      const pad = Math.min((avail - used) / n, 60)
      let y = rowsTop + (avail - used - pad * n) / 2
      const rows = PP.map((p, i) => {
        const y0 = y + pad / 2
        y += rowH[i] + pad
        return { textTop: y0, textBot: y0 + textH[i], trackTop: y0 + textH[i] + g1, trackH, lines: ls[i].length, ls: ls[i] }
      })
      return { mode: 'rows', slabTop, slabH, wlTop, rowsTop, lpx, lh, lines: Math.max(...ls.map(l => l.length)), apx, aw, rows, room, useWL, right, k: lo.figureScale ?? 0.86, tf: totFit(RW, slabH) }
    }
    const WLs = wlH ? [true, false] : [false]
    // (the total's label keeps 40 px if any rung of the ladder allows it; only then may it go down to 34)
    for (const ml of [40, 34]) {
      minLab = ml
      for (const useWL of WLs) for (const slabH of [100, 88]) for (const lpx of [44, 40]) for (let apx = 64; apx >= 44; apx -= 4) {
        const x = tryOne({ useWL, slabH, lpx, lhK: 1.16, apx, right: false, trackMin: 12, cut: false }); if (x) return x
      }
      for (const cut of [false, true]) for (const dense of [false, true]) for (const useWL of WLs) for (const slabH of [100, 88, 72, 116]) for (const lhK of [1.16, 1.05, 1]) for (let apx = 52; apx >= 40; apx -= 4) {
        const x = tryOne({ useWL, slabH, lpx: 40, lhK, apx, right: true, trackMin: 6, cut, dense }); if (x) return x
      }
      // last resort: every label on one line, cut at a word with an ellipsis
      for (const slabH of [100, 88, 72, 116]) for (let apx = 52; apx >= 40; apx -= 4) {
        const x = tryOne({ useWL: false, slabH, lpx: 40, lhK: 1.16, apx, right: true, trackMin: 6, cut: 'one', dense: true }); if (x) return x
      }
    }
    throw new Error('split-sheet: the parts do not fit the sheet (too many parts or labels too long)')
  }

  let lay = null
  if (lo.layout !== 'rows') lay = binsLayout()
  if (!lay) lay = rowsLayout()
  if (lay.mode === 'rows' && !lay.useWL) wlH = 0          // no room left for the working line: notes are dropped
  const bins = lay.mode === 'bins'
  if (!bins) SW = XR - X0
  const SX1 = X0 + SW                                     // the slab's right end
  const POST_X = bins ? X1 - 24 : XR + 24                 // the post that holds the slab up (in the floor corner)
  const ys = lay.slabTop, slabH = lay.slabH
  const k = lay.k

  // ================================================================== build
  const world = makeWorld(ctx)
  const g = world.g
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const html = world.html

  // ---- bins (bins mode): dashed fill outline + percentage inside, ink U outline on an ink plinth with the label
  const B = bins ? lay.bins : null
  const binEls = []
  if (bins) {
    PP.forEach((p, i) => {
      const b = B[i]
      const ph = s('rect', { x: b.ix0, y: lay.binFloor - 5 - b.fillH, width: b.ix1 - b.ix0, height: b.fillH, rx: 8, fill: 'none', stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '10 10' })
      g.back.append(ph)
      const bodyG = s('g')
      const lip = 9
      bodyG.append(
        s('path', { d: `M${b.x0 - lip},${lay.rim - 6}L${b.x0},${lay.rim}L${b.x0},${lay.binFloor}L${b.x1},${lay.binFloor}L${b.x1},${lay.rim}L${b.x1 + lip},${lay.rim - 6}`, fill: 'none', stroke: C.ink, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
        s('rect', { x: b.x0 - 5, y: lay.binFloor, width: b.x1 - b.x0 + 10, height: FLOOR - lay.binFloor - 2, rx: 10, fill: C.ink }),
      )
      g.front.append(bodyG)
      const lab = h('div', { class: 'ss-lab', style: { left: (b.x0 - 5) + 'px', width: (b.x1 - b.x0 + 10) + 'px', top: (lay.binFloor + 9 + (lay.lab.nl - lay.lab.lines[i].length) * lay.lab.lh / 2) + 'px', fontSize: lay.lab.px + 'px', lineHeight: lay.lab.lh + 'px' } })
      lab.innerHTML = lay.lab.lines[i].map(esc).join('<br>')
      html.append(lab)
      // the percentage is a tag, every bin's on one line: the bins' mid-height (whatever their fill level)
      const inside = true
      const pct = new NumObj(html, { cls: 'ss-pct tag', text: String(p.pct || ''), ax: 0.5, ay: 0.5 })
      const pctY = Math.round((lay.rim + lay.binFloor - 5) / 2)
      binEls.push({ ph, bodyG, lab, pct, pctY, inside })
    })
  }

  // ---- rows (rows mode): label + percentage, amount on the right, a tray under each row with the piece's slot
  const R = bins ? null : lay.rows
  const rowEls = []
  if (!bins) {
    PP.forEach((p, i) => {
      const r = R[i]
      // the tray: one soft track the row's piece drops onto (no hatching: a clean line at phone size)
      const tray = s('rect', { x: X0, y: r.trackTop + r.trackH / 2 - 2, width: SW, height: 4, rx: 2, fill: C.lineSoft })
      g.back.append(tray)
      const el = h('div', { class: 'ss-rl', style: { position: 'absolute', left: X0 + 'px', fontSize: lay.lpx + 'px', lineHeight: lay.lh + 'px', whiteSpace: 'nowrap' } })
      const pctHtml = `<span class="p" style="font-size:40px">${esc(p.pct || '')}</span>`
      el.innerHTML = r.ls.map(esc).join('<br>') + (lay.right ? '' : ' ' + pctHtml)
      html.append(el)
      style(el, { top: (r.textBot - el.offsetHeight + 4).toFixed(0) + 'px' })
      let pel = null
      if (lay.right && p.pct) {
        // in the value column, left of where the amount lands (it is there from frame 1)
        pel = new NumObj(html, { cls: 'ss-rl', html: true, text: '', ax: 1, ay: 1, style: { fontSize: '40px' } })
        pel.el.innerHTML = pctHtml
        pel.set({ x: SX1 - lay.aw - 20, y: r.textBot - (lay.apx - 40) * 0.12 })
      }
      rowEls.push({ tray, el, pel })
    })
  }

  // ---- amounts (+ gold plate for goal parts)
  const apx = lay.apx
  const amts = PP.map((p, i) => {
    let plate = null
    if (tones[i] === 'goal') { plate = h('div', { class: 'ss-plate' }); html.append(plate) }
    const o = new NumObj(html, { cls: 'ss-amt', text: String(p.amount), ax: bins ? 0.5 : 1, ay: 1, style: { fontSize: apx + 'px' } })
    const w = o.w, hh = apx
    const pw = w + (plate ? 2 * PLATE[0] + 12 : 0)                    // painted width (plate included)
    const room = bins ? lay.bw + lay.gap - 12 : 2 * w
    // squash widens it: keep it inside its lane (bins) and inside x 62-936
    const sqMax = clamp(((room / pw) - 1) / 0.6, 0, 0.18)
    const ax = bins ? clamp(B[i].cx, X0 + 6 + (pw * (1 + 0.6 * sqMax)) / 2, BX1 + 10 - (pw * (1 + 0.6 * sqMax)) / 2) : SX1 - (plate ? PLATE[0] + 6 : 0)
    const ay = bins ? lay.amtBot : R[i].textBot - (plate ? PLATE[1] + 2 : 0)
    if (plate) style(plate, { width: (w + 2 * PLATE[0]).toFixed(0) + 'px', height: (hh + 2 * PLATE[1]).toFixed(0) + 'px' })
    return { o, plate, x: ax, y: ay, w, cx: bins ? ax : ax - w / 2, sqMax: bins ? sqMax : 0.12 }
  })

  // ---- the slab and its pieces (all in g.mid; the tool sits behind it in g.back so a blade "bites" into it)
  const toolLayer = s('g')
  g.back.append(toolLayer)
  const slabG = s('g')
  const slabRect = s('rect', { y: ys, height: slabH, rx: 14, fill: C.coin, stroke: C.ink, 'stroke-width': 10 })
  const slabRing = s('rect', { y: ys + 12, height: slabH - 24, rx: 8, fill: 'none', stroke: C.coinDeep, 'stroke-width': 4, opacity: 0.75 })
  slabG.append(slabRect, slabRing)
  g.mid.append(slabG)
  // the post and its bracket: they hold the slab's right end up (drawn behind the slab and the pieces)
  const BRK = [Math.max(ux(cum[Math.max(0, n - 1)]) + 20, SX1 - 110), SX1]
  g.back.append(
    s('line', { x1: POST_X, x2: POST_X, y1: ys + slabH, y2: FLOOR - 2, stroke: C.ink, 'stroke-width': S.prop, 'stroke-linecap': 'round' }),
    s('line', { x1: BRK[0], x2: Math.max(BRK[1], POST_X + 6), y1: ys + slabH + 6, y2: ys + slabH + 6, stroke: C.ink, 'stroke-width': S.prop, 'stroke-linecap': 'round' }),
    s('line', { x1: POST_X - 34, x2: POST_X + 34, y1: FLOOR - 4, y2: FLOOR - 4, stroke: C.ink, 'stroke-width': S.prop, 'stroke-linecap': 'round' }),
  )
  // cut notches on the top and bottom edge at every part boundary (the plan, visible from frame 1)
  const notchG = s('g')
  const notches = []
  for (let i = 1; i < n + (leftover ? 1 : 0); i++) {
    const x = ux(cum[i])
    const el = s('path', { d: `M${x - 11},${ys - 3}L${x},${ys + 13}L${x + 11},${ys - 3}ZM${x - 11},${ys + slabH + 3}L${x},${ys + slabH - 13}L${x + 11},${ys + slabH + 3}Z`, fill: C.ink })
    notchG.append(el)
    notches.push({ el, x })
  }
  g.mid.append(notchG)
  const kerf = s('line', { stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0 })
  g.top.append(kerf)                                     // over the slab text: the saw cuts through the number
  const UE = units.map(u => {
    const gg = s('g', { opacity: 0 })
    const r = s('rect', { rx: 8, fill: C.coin, stroke: C.ink, 'stroke-width': ten ? 6 : 8 })
    const ring = s('rect', { rx: 5, fill: 'none', stroke: C.coinDeep, 'stroke-width': 3, opacity: 0.7 })
    gg.append(r, ring)
    g.mid.append(gg)
    return { g: gg, r, ring }
  })
  // slab text: total label + total, then (once carving starts) each segment's percentage or each brick's value
  const TF = lay.tf
  const totLab = totLabTxt ? new NumObj(html, { cls: 'ss-totl', text: '', ax: 0, ay: 0.5, style: { fontSize: TF.labPx + 'px', lineHeight: TF.lh + 'px', hyphens: 'none' } }) : null
  if (totLab) totLab.el.innerHTML = TF.lines.map(esc).join('<br>')
  const totPx = TF.totPx
  const tot = new NumObj(html, { cls: 'ss-tot', text: totDisp, ax: 1, ay: 0.5, style: { fontSize: totPx + 'px' } })
  const totLabX = X0 + 26, totX = SX1 - 26
  const segs = units.map(u => {
    const txt = ten ? ten.display : String(PP[u.part].pct || '')
    const o = new NumObj(html, { cls: ten ? 'ss-brick' : 'ss-seg', text: txt, ax: 0.5, ay: 0.5 })
    if (ten) o.el.setAttribute('data-deco', '')
    return { o, fits: o.w + (ten ? 22 : 36) <= ux(u.b) - ux(u.a) }
  })
  // percentages on the slab: every piece at least ~60 px wide carries its own, all at one size (40 -> 34 px);
  // narrower pieces carry none, so no piece is labelled while a wider neighbour is not
  if (!ten) {
    const wide = units.map(u => ux(u.b) - ux(u.a) >= 60)
    let px = 40
    const fitsAt = q => units.every((u, m) => !wide[m] || measure(segs[m].o.el.textContent, fM(800, q), { letterSpacing: '-0.03em' }) + 12 <= ux(u.b) - ux(u.a))
    while (px > 34 && !fitsAt(px)) px -= 2
    const ok = fitsAt(px)
    // under 40 px they are repeats of the percentages printed on the sheet: secondary, so decoration for the lint
    segs.forEach((sg, m) => { style(sg.o.el, { fontSize: px + 'px' }); if (px < 40) sg.o.el.setAttribute('data-deco', ''); sg.fits = ok ? wide[m] : wide[m] && measure(sg.o.el.textContent, fM(800, px), { letterSpacing: '-0.03em' }) + 12 <= ux(units[m].b) - ux(units[m].a) })
  }

  // ---- working line
  const wl = h('div', { class: 'ss-wl', style: { top: (bins ? lay.wlTop : lay.wlTop) + 'px', height: wlH + 'px' } })
  if (wlH) html.append(wl)

  // ---- sum check: assembles where the slab was
  // (a stub left on the slab by shares that do not add up keeps its place: the check takes the free part)
  const CW = leftover ? Math.max(300, ux(cum[n]) - 18 - X0) : SW
  const ghost = s('rect', { x: X0, y: ys, width: CW, height: slabH, rx: 14, fill: C.heroSoft, stroke: C.hero, 'stroke-width': 6, 'stroke-dasharray': '14 12', opacity: 0 })
  g.back.append(ghost)
  let chk = null
  if (checkT != null) {
    const el = h('div', { class: 'ss-check', style: { width: CW + 'px' } })
    const toks = String(d.check).split(/\s+/).filter(Boolean)
    const opRe = /^[+=×÷−-]$/
    el.innerHTML = toks.map((x, m) => `<span class="tk${opRe.test(x) ? ' op' : ''}" data-i="${m}">${esc(x)}</span>`).join(' ')
    html.append(el)
    const cstr = toks.join(' '), cmo = { letterSpacing: '-0.02em' }
    let px = 64, lines = 1
    while (px > 44 && measure(cstr, fH(900, px), cmo) > CW - 40) px -= 2
    if (measure(cstr, fH(900, px), cmo) > CW - 40) {
      lines = 2
      px = 50
      // two lines: break at the token boundary nearest the middle, both halves must fit
      const half = px2 => { let best = null; for (let m = 1; m < toks.length; m++) { const a = toks.slice(0, m).join(' '), b = toks.slice(m).join(' '); const w = Math.max(measure(a, fH(900, px2), cmo), measure(b, fH(900, px2), cmo)); if (!best || w < best.w) best = { w, m } } return best }
      while (px > 36 && half(px).w > CW - 40) px -= 2
      const m = half(px).m
      el.innerHTML = toks.map((x, q) => `${q === m ? '<br>' : q ? ' ' : ''}<span class="tk${opRe.test(x) ? ' op' : ''}" data-i="${q}">${esc(x)}</span>`).join('')
    }
    const lh = Math.round(px * (lines > 1 ? 1.12 : 1.16))
    // the ghost slab grows to hold a 2-line check: up into the free air first, then down over the working line
    const needH = lines * lh + 24
    if (needH > slabH) {
      const up = Math.min(needH - slabH, Math.max(0, ys - (parts.footerBottom || parts.headerBottom) - 14))
      attr(ghost, 'y', (ys - up).toFixed(0)); attr(ghost, 'height', needH.toFixed(0))
    }
    const gy = +ghost.getAttribute('y'), gh = +ghost.getAttribute('height')
    style(el, { top: (gy + gh / 2 - (lines * lh) / 2).toFixed(0) + 'px', fontSize: px + 'px', lineHeight: lh + 'px' })
    const spans = [...el.querySelectorAll('.tk')]
    const sr = ctx.stage.getBoundingClientRect()
    const used = new Set()
    const tk = spans.map((sp, m) => {
      const r = sp.getBoundingClientRect()
      const at = checkT + 0.32 + 0.11 * m
      let fly = null
      const pi = PP.findIndex((p, i) => !used.has(i) && String(p.amount) === toks[m])
      if (pi >= 0) {
        used.add(pi)
        // (rows: it swings out over the slab's post, so it flies as a chip with its own void backing)
        const o = new NumObj(html, { cls: 'ss-amt', text: toks[m], ax: 0.5, ay: 1, style: { fontSize: apx + 'px', color: C.ink, ...(bins ? {} : { background: C.void, borderRadius: '10px', padding: '0 8px' }) } })
        fly = { o, from: [amts[pi].cx, amts[pi].y], to: [r.left - sr.left + r.width / 2, r.bottom - sr.top - (r.height - px) / 2 + px * 0.02], s1: px / apx, t0: at - 0.42, pi }
      }
      return { sp, at, fly }
    })
    chk = { el, tk, px, end: tk.length ? tk[tk.length - 1].at + 0.2 : checkT }
  }

  // ================================================================== impacts and cues
  units.forEach(u => {
    if (u.k > 1) cue(u.land, 'tick', { gain: 0.32 })
  })
  PP.forEach((p, i) => {
    if (i === goalI) {
      const a = amts[i]
      fxk.impact(times[i], { x: a.cx, y: a.y - apx * 0.45, rx: a.w / 2 + PLATE[0] + 10, ry: apx / 2 + PLATE[1] + 10, r: 40, lines: 12, shake: 12, punch: 0.014, cue: null })
      cue(times[i], 'hit', { gain: 0.9 })
      cue(times[i] + 0.1, 'cash', { gain: 0.6 })
    } else cue(times[i], 'thud', { gain: 0.5 })
  })
  if (chk) {
    chk.tk.forEach(x => { if (x.fly) cue(x.fly.t0 + 0.02, 'swipe', { gain: 0.25, dur: 0.18 }) })
    cue(chk.end - 0.1, 'pop', { gain: 0.6 })
  }
  if (gag) cue(gag.t, 'pop', { gain: 0.5 })

  // ================================================================== the figure
  const fig = showFig ? new Figure(g.fig, { scale: k }) : null
  const saw = showFig && !ten && bins ? sawProp(toolLayer) : null
  const clv = showFig && ten && bins ? cleaverProp(toolLayer, toolLabel) : null
  const P = {
    sawing: { lean: 30, tilt: 18, aF: [70, 20], aB: [52, 40], lF: [34, -56], lB: [-22, -14] },
    carry: { lean: 4, tilt: 12, aF: [46, 60], aB: [36, 70], lF: [8, -6], lB: [-8, -4] },
    raise: { lean: -10, tilt: -8, aF: [60, 80], aB: [50, 90], lF: [18, -18], lB: [-16, -14] },
    slam: { lean: 34, tilt: 20, aF: [60, 20], aB: [50, 30], lF: [46, -92], lB: [-4, -80] },
    lookDown: { lean: 6, tilt: 26, aF: [20, 18], aB: [-16, 16], lF: [10, -4], lB: [-10, -2] },
    pointDown: { lean: 8, tilt: 26, aF: [46, 4], aB: [-14, 18], lF: [8, -4], lB: [-10, -2] },
    jump: { lean: -4, tilt: -10, aF: [124, 36], aB: [-116, -30], lF: [42, -84], lB: [-8, -66] },
    land: { lean: 22, tilt: 10, aF: [40, 40], aB: [-50, 30], lF: [62, -118], lB: [44, -108] },
  }
  const toolXOf = c => c + CLV.gap + CLV.bw / 2          // cleaver grip x when its blade is centred on the cut
  const lerpP = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)]
  // figure state: x track, ground, face, pose keys, and the special segments that drive the hands by IK
  const pk = [], xk = []
  const segs2 = { saw: [], tool: [], walk: [] }
  let hopSeg = null

  if (showFig && bins) {
    const standSaw = c => Math.min(c + 112 * k, SX1 - 34 * k)
    const standClv = c => Math.min(toolXOf(c) + 66 * k, SX1 - 30 * k)
    const cuts = []
    for (let i = 0; i < n; i++) if (i < n - 1 || leftover) cuts.push({ i, c: ux(cum[i + 1]), end: partDrop(i) - 0.02 })
    let cur = cuts.length ? (ten ? standClv(cuts[0].c) : standSaw(cuts[0].c)) : SX1 - 60
    xk.push({ t: 0, v: cur, d: 0.01 })
    pk.push({ t: 0, pose: 'think' })
    let free = 0.25
    const walkTo = (x1, tEnd, minStart) => {
      if (Math.abs(x1 - cur) < 3) return
      const dur = clamp(Math.abs(x1 - cur) / 330, 0.32, 1.0)
      const t0 = Math.max(minStart, tEnd - dur)
      const d1 = Math.max(0.2, tEnd - t0)
      xk.push({ t: t0, v: x1, d: d1, e: 'inOutSine' })
      segs2.walk.push({ t0, t1: t0 + d1, x0: cur, x1 })
      cur = x1
    }
    if (ten) {
      // the cleaver comes out, he raises it (strain), slams it down at ten.t: the slab cracks into bricks
      const c0 = cuts.length ? cuts[0].c : ux(0.5)
      segs2.tool.push({ kind: 'big', t0: toolT, tr: toolT + 0.32, th: ten.t, c: c0 })
      pk.push({ t: toolT - 0.05, pose: 'carry', d: 0.18 })
      pk.push({ t: toolT + 0.3, pose: 'raise', d: 0.3 })
      pk.push({ t: ten.t - 0.12, pose: 'slam', d: 0.1, e: 'out' })
      pk.push({ t: ten.t + 0.22, pose: 'carry', d: 0.4 })
      free = ten.t + 0.55
    }
    for (const ct of cuts) {
      const tEnd = ct.end
      if (ten) {
        const xs = standClv(ct.c)
        walkTo(xs, tEnd - 0.42, free)
        segs2.tool.push({ kind: 'tap', t0: tEnd - 0.38, th: tEnd, c: ct.c })
        pk.push({ t: tEnd - 0.4, pose: 'raise', d: 0.2 })
        pk.push({ t: tEnd - 0.09, pose: 'slam', d: 0.08, e: 'out' })
        pk.push({ t: tEnd + 0.2, pose: 'carry', d: 0.35 })
        cue(tEnd, 'hit', { gain: 0.45 })
      } else {
        const xs = standSaw(ct.c)
        // the first cut starts early (something moves inside the first second); later cuts take what time there is
        const first = !segs2.saw.length
        const sawDur = clamp(tEnd - (first ? 0.55 : free) - (Math.abs(xs - cur) > 3 ? Math.abs(xs - cur) / 330 + 0.1 : 0) - (first ? 0 : 0.1), 0.36, first ? 2.4 : 1.1)
        walkTo(xs, tEnd - sawDur - 0.1, free)
        segs2.saw.push({ t0: tEnd - sawDur, t1: tEnd, c: ct.c, xs })
        pk.push({ t: tEnd - sawDur - 0.12, pose: 'sawing', d: 0.14 })
        pk.push({ t: tEnd + 0.05, pose: 'stand', d: 0.24 })
        const strokes = Math.max(2, Math.round(sawDur * 3.4)), every = strokes > 5 ? 2 : 1
        for (let m = 0; m < strokes; m += every) cue(tEnd - sawDur + (m + 0.25) * sawDur / strokes, 'swipe', { gain: 0.22, dur: 0.12 })
      }
      // after the piece lands: look/point down at the bin it filled
      const tl = times[ct.i]
      pk.push({ t: tl + 0.08, pose: ct.i === goalI ? 'pointDown' : 'lookDown', d: 0.25 })
      free = tl + 0.2
    }
    if (!leftover) {
      // hop off the right end before the last piece drops
      const tDrop = partDrop(n - 1)
      const jt0 = tDrop - 0.1, jd = 0.5
      const edge = SX1 - 46 * k
      if (cur < edge - 3) walkTo(edge, jt0 - 0.2, free)
      pk.push({ t: jt0 - 0.2, pose: 'crouch', d: 0.14 })
      pk.push({ t: jt0, pose: 'jump', d: 0.12, e: 'out' })
      pk.push({ t: jt0 + jd - 0.06, pose: 'land', d: 0.08, e: 'out' })
      pk.push({ t: jt0 + jd + 0.14, pose: 'stand', d: 0.3 })
      hopSeg = { t0: jt0, t1: jt0 + jd, from: [cur, ys], to: [FIG_X.bins, FLOOR] }
      cue(jt0 + jd, 'step', { gain: 0.6 })
      const tl = times[n - 1]
      pk.push({ t: tl + 0.2, pose: n - 1 === goalI ? 'celebrate' : 'point', d: 0.3 })
    }
  }
  if (showFig && !bins) {
    // rows: he stands on the floor in the rail lane and points: at the slab as a piece breaks off, then at its row
    xk.push({ t: 0, v: FIG_X.rows, d: 0.01 })
    pk.push({ t: 0, pose: 'think' })
    PP.forEach((p, i) => {
      const tdp = partDrop(i)
      pk.push({ t: tdp - 0.3, pose: 'pointUp', d: 0.18 })
      const ry = R[i].textBot
      const shY = FLOOR - 170 * k
      pk.push({ t: times[i] - 0.05, pose: ry < shY - 160 ? 'pointUp' : 'point', d: 0.22 })
    })
    pk.push({ t: times[n - 1] + 0.6, pose: 'idle', d: 0.4 })
  }
  // closing poses (floor): point up at the check, celebrate on the verdict, point at the gag
  if (showFig && (hopSeg || !bins)) {
    if (checkT != null) pk.push({ t: checkT, pose: 'pointUp', d: 0.28 })
    if (chk) pk.push({ t: chk.end + 0.1, pose: 'idle', d: 0.4 })
    if (spec.verdict) { pk.push({ t: spec.verdict.t + 0.05, pose: 'celebrate', d: 0.24 }); pk.push({ t: spec.verdict.t + 1.4, pose: 'idle', d: 0.4 }) }
    if (gag) pk.push({ t: gag.t, pose: 'pointUp', d: 0.28 })
  }
  pk.sort((a, b) => a.t - b.t)
  const ptr = showFig ? poseTrack(pk.map(x => ({ ...x, pose: P[x.pose] || x.pose }))) : null
  const xtr = showFig ? track(xk.length ? xk : [{ t: 0, v: FIG_X.rows }]) : null

  const walkW = t => { for (const w of segs2.walk) if (t > w.t0 - 0.05 && t < w.t1 + 0.05) return w; return null }
  function figState(t) {
    let x = xtr.at(t), ground = bins ? ys : FLOOR, face = -1
    if (!bins) return { x, ground, face }
    if (hopSeg && t >= hopSeg.t0) {
      const p = prog(t, hopSeg.t0, hopSeg.t1 - hopSeg.t0)
      const [px, py] = arc(p, hopSeg.from, hopSeg.to, 150)
      x = px; ground = py
      if (t < hopSeg.t1 + 0.32) face = 1                 // he faces the way he jumps, then turns back to the sheet
    }
    const w = walkW(t)
    if (w && t >= w.t0 && t <= w.t1) face = w.x1 > w.x0 ? 1 : -1
    return { x, ground, face }
  }

  // tool grip G (world) and angle for a time t, or null (the saw then hangs from the back hand)
  function sawGrip(t) {
    for (const sg of segs2.saw) {
      if (t < sg.t0 - 0.12 || t > sg.t1 + 0.02) continue
      const p = prog(t, sg.t0, sg.t1 - sg.t0)
      const depth = slabH * E.inOutSine(p)
      const K = [sg.c, ys + Math.min(slabH - 4, depth)]
      const H0 = [sg.c + clamp((sg.xs - sg.c) * 0.52, 34, 66), ys - 40 * k]
      const u = [K[0] - H0[0], K[1] - H0[1]], ul = Math.hypot(u[0], u[1])
      const dir = [u[0] / ul, u[1] / ul]
      const stroke = t < sg.t0 ? 0 : 24 * Math.sin(2 * Math.PI * 3.4 * (t - sg.t0))
      const G = [K[0] - dir[0] * (ul + stroke), K[1] - dir[1] * (ul + stroke)]
      const blend = E.inOut(prog(t, sg.t0 - 0.12, 0.12))
      return { G, ang: Math.atan2(dir[1], dir[0]) / RAD, blend, depth, sg }
    }
    return null
  }
  function clvGrip(t, J) {
    // the cleaver is held from toolT on: carried low in front, raised, slammed onto a cut
    const rest = [J.hip[0] + 40 * k * J.face, J.hip[1] - 52 * k]   // carried low, in front of him
    for (const sg of segs2.tool) {
      if (sg.kind === 'big') {
        if (t < sg.t0 || t > sg.th + 0.5) continue
        const up = [toolXOf(sg.c) + 18, ys - 196 * k]
        const hit = [toolXOf(sg.c), ys - CLV.edge + 16]
        let G
        if (t < sg.tr) G = lerpP(rest, up, E.out(prog(t, sg.t0, sg.tr - sg.t0)))
        else if (t < sg.th - 0.09) G = [up[0] + wobble(t, sg.tr, 2.5, 6, 0.2), up[1] + wobble(t, sg.tr + 0.1, 3, 7, 0.1) - 6 * E.inOut(prog(t, sg.tr, sg.th - sg.tr))]
        else if (t < sg.th) G = lerpP(up, hit, E.in(prog(t, sg.th - 0.09, 0.09)))
        else if (t < sg.th + 0.22) G = [hit[0], hit[1] - 22 * Math.sin(Math.PI * prog(t, sg.th, 0.22))]
        else G = lerpP(hit, rest, E.inOut(prog(t, sg.th + 0.22, 0.28)))
        return { G, ang: t > sg.th - 0.09 && t < sg.th + 0.3 ? 0 : -6 * Math.sin(Math.PI * prog(t, sg.t0, sg.th - sg.t0)) }
      } else {
        if (t < sg.t0 - 0.02 || t > sg.th + 0.5) continue
        const up = [toolXOf(sg.c) + 16, ys - 150 * k]
        const hit = [toolXOf(sg.c), ys - CLV.edge + 14]
        let G
        if (t < sg.th - 0.08) G = lerpP(rest, up, E.out(prog(t, sg.t0, 0.22)))
        else if (t < sg.th) G = lerpP(up, hit, E.in(prog(t, sg.th - 0.08, 0.08)))
        else if (t < sg.th + 0.2) G = [hit[0], hit[1] - 16 * Math.sin(Math.PI * prog(t, sg.th, 0.2))]
        else G = lerpP(hit, rest, E.inOut(prog(t, sg.th + 0.2, 0.28)))
        return { G, ang: 0 }
      }
    }
    return { G: rest, ang: 0 }
  }

  // sawdust (closed form): a few grains per stroke falling from the kerf
  const dust = []
  if (saw) {
    const rnd = rng(77)
    for (const sg of segs2.saw) {
      const N = Math.round((sg.t1 - sg.t0) * 14)
      for (let m = 0; m < N; m++) {
        const el = s('circle', { r: 3 + rnd() * 3, fill: C.coinDeep, opacity: 0 })
        g.fx.append(el)
        dust.push({ el, t0: sg.t0 + (m / N) * (sg.t1 - sg.t0), vx: (rnd() - 0.5) * 220, vy: -60 - rnd() * 120, c: sg.c })
      }
    }
  }

  // ================================================================== working line states
  const WS = []
  if (ten && ten.formula) WS.push({ t0: toolT + 0.1, t1: partDrop(0) - 0.12, kind: 'ten' })
  PP.forEach((p, i) => { if (p.note) WS.push({ t0: times[i] + 0.06, t1: i < n - 1 ? partDrop(i + 1) - 0.12 : (checkT ?? Infinity), kind: 'note', i }) })
  if (gag) WS.push({ t0: gag.t, t1: Infinity, kind: 'gag' })
  // the gag's result (after its last "=") is green, like the ten formula's
  const gagHtml = () => { const m = gag.text.lastIndexOf(' = '); return m < 0 || /\*\*|__/.test(gag.text) ? `<b>${markup(gag.text)}</b>` : `<b>${esc(gag.text.slice(0, m))}</b> = <em>${esc(gag.text.slice(m + 3))}</em>` }
  for (const x of WS) x.full = x.kind === 'ten' ? `<b>${esc(ten.formula)}</b> = <em>${esc(ten.display)}</em>` : x.kind === 'gag' ? gagHtml() : markup(PP[x.i].note)

  // ================================================================== seek
  const tipLast = bins && !leftover && !ten
  const duration = durationOf(spec, Math.max(times[n - 1] + 0.8, chk ? chk.end + 0.6 : 0, gag ? gag.t + 1.2 : 0), d.hold ?? 3)
  const split = ten ? ten.t : partDrop(0) - 0.04         // the total stays on the slab until the first piece drops

  function seek(t) {
    // ---- slab: the remaining part is one rect (bricks after the ten chop)
    const firstLeft = (() => { for (const u of units) if (t < u.drop) return u.a; return leftover ? cum[n] : 1 })()
    const cracked = ten && t >= ten.t
    const remX0 = ux(firstLeft)
    const slabOn = firstLeft < 0.9999 && !cracked
    style(slabG, { display: slabOn ? '' : 'none' })
    if (slabOn) {
      attr(slabRect, 'x', remX0.toFixed(1)); attr(slabRect, 'width', Math.max(0, SX1 - remX0).toFixed(1))
      attr(slabRing, 'x', (remX0 + 12).toFixed(1)); attr(slabRing, 'width', Math.max(0, SX1 - remX0 - 24).toFixed(1))
    }
    for (const nt of notches) attr(nt.el, 'opacity', nt.x > remX0 + 2 && !(ten && t >= ten.t + 0.05) ? '1' : '0')
    // kerf while sawing
    const sgNow = saw ? sawGrip(t) : null
    if (sgNow && t >= sgNow.sg.t0) {
      attr(kerf, 'x1', sgNow.sg.c.toFixed(1)); attr(kerf, 'x2', sgNow.sg.c.toFixed(1))
      attr(kerf, 'y1', (ys + 3).toFixed(1)); attr(kerf, 'y2', (ys + Math.max(3, sgNow.depth)).toFixed(1)); attr(kerf, 'opacity', '1')
    } else attr(kerf, 'opacity', '0')

    // ---- units (pieces / bricks)
    units.forEach((u, m) => {
      const e = UE[m]
      const i = u.part
      const sx0 = ux(u.a), sx1 = ux(u.b)
      let x, y, w, hh, fill = C.coin
      // target
      let tx, ty, tw, th
      if (bins) {
        const b = B[i], lh = b.fillH / u.k
        tx = b.ix0; tw = b.ix1 - b.ix0; th = lh; ty = lay.binFloor - 5 - (u.j + 1) * lh
      } else {
        const r = R[i]
        tx = sx0 + 2; tw = Math.max(4, sx1 - sx0 - 4); th = Math.max(8, r.trackH - 6); ty = r.trackTop + r.trackH / 2 - th / 2
      }
      if (t < u.drop) {
        if (!cracked) { attr(e.g, 'opacity', '0'); return }
        // a brick still on the slab: jostles when the slab cracks
        const dly = Math.abs((sx0 + sx1) / 2 - (segs2.tool[0] ? segs2.tool[0].c : 540)) / 1400
        x = sx0; w = sx1 - sx0; hh = slabH; y = ys - hop(t, ten.t + dly, 0.2, 12)
      } else if (t < u.land) {
        const p = prog(t, u.drop, FALL)
        const py = E.inQuad(p), pw = E.inOut(p)
        x = lerp(sx0, tx, pw); w = lerp(sx1 - sx0, tw, pw); hh = lerp(slabH, th, pw); y = lerp(ys, ty, py)
      } else {
        const sq = squashAt(t, u.land, 0.22)
        w = tw * sq.sx; hh = th * sq.sy; x = tx + (tw - w) / 2; y = ty + (th - hh)
        fill = mix(C.coin, toneOf(tones[i] === 'goal' || tones[i] === 'neutral' ? 'goal' : tones[i]).fill, prog(t, u.land, 0.15))
      }
      attr(e.g, 'opacity', '1')
      // the last piece rests on the bracket: it tips off it (about its right foot) on the way into its bin
      if (tipLast && m === units.length - 1 && t >= u.drop && t < u.land) {
        const p = prog(t, u.drop, FALL)
        attr(e.g, 'transform', `rotate(${(-26 * Math.sin(Math.PI * p)).toFixed(1)} ${(x + w).toFixed(1)} ${(y + hh).toFixed(1)})`)
      } else attr(e.g, 'transform', '')
      attr(e.r, 'x', x.toFixed(1)); attr(e.r, 'y', y.toFixed(1)); attr(e.r, 'width', Math.max(0, w).toFixed(1)); attr(e.r, 'height', Math.max(0, hh).toFixed(1))
      attr(e.r, 'fill', fill)
      const ri = Math.min(10, hh * 0.18)
      attr(e.ring, 'x', (x + ri).toFixed(1)); attr(e.ring, 'y', (y + ri).toFixed(1)); attr(e.ring, 'width', Math.max(0, w - 2 * ri).toFixed(1)); attr(e.ring, 'height', Math.max(0, hh - 2 * ri).toFixed(1))
      attr(e.ring, 'opacity', hh > 30 && fill === C.coin ? '0.7' : '0')
      attr(e.r, 'rx', String(Math.min(8, hh / 3).toFixed(1)))
      attr(e.r, 'stroke-width', String(Math.min(ten ? 6 : 8, Math.max(3, hh * 0.18)).toFixed(1)))
    })

    // ---- slab text
    const preSplit = t < split
    const aTot = ten ? (t < ten.t ? 1 : 0) : preSplit ? 1 : 1 - prog(t, split, 0.12)
    if (totLab) totLab.set({ x: totLabX, y: ys + slabH / 2, opacity: aTot })
    tot.set({ x: totX, y: ys + slabH / 2, opacity: aTot })
    units.forEach((u, m) => {
      const sg = segs[m]
      const cx = (ux(u.a) + ux(u.b)) / 2
      let op = 0, y = ys + slabH / 2, sc = 1
      if (ten) {
        if (t >= ten.t && sg.fits) {
          const pp = popIn(t, ten.t + 0.02, 0.2, 0.82)
          op = pp.opacity * (t < u.drop ? 1 : 1 - prog(t, u.drop, 0.12)); sc = pp.scale
          const dly = Math.abs(cx - (segs2.tool[0] ? segs2.tool[0].c : 540)) / 1400
          y -= hop(t, ten.t + dly, 0.2, 12)
          if (t >= u.drop) { const p = prog(t, u.drop, FALL); y = lerp(ys, (bins ? lay.binFloor : R[u.part].trackTop), E.inQuad(p)) + slabH / 2 * (1 - p) }
        }
      } else if (!preSplit && sg.fits) {
        const pp = prog(t, split + 0.06, 0.2)
        op = clamp(pp * 2.5) * (t < u.drop ? 1 : 1 - prog(t, u.drop, 0.08)); sc = 1 + 0.12 * Math.sin(Math.PI * pp)
      }
      sg.o.set({ x: cx, y, sx: sc, sy: sc, opacity: op })
      sg.o.overlap(t >= u.drop)
    })

    // ---- bins: outline fades as the fill lands; % turns ink on the fill; amounts land
    PP.forEach((p, i) => {
      const lastLand = times[i]
      const firstDrop = partDrop(i)
      if (bins) {
        const be = binEls[i], b = B[i]
        attr(be.ph, 'opacity', String(1 - prog(t, lastLand - 0.05, 0.12)))
        const bump = 1 + 0.16 * Math.sin(Math.PI * prog(t, lastLand, 0.24))
        be.pct.set({ x: b.cx, y: be.pctY, sx: bump, sy: bump })
        be.pct.overlap(t >= firstDrop && t < lastLand + 0.02)
        // a small squash of the whole bin on landing
        const sq = squashAt(t, lastLand, 0.05)
        attr(be.bodyG, 'transform', sq.sy !== 1 ? `translate(${b.cx},${FLOOR}) scale(${sq.sx.toFixed(3)},${sq.sy.toFixed(3)}) translate(${-b.cx},${-FLOOR})` : '')
      }
      const a = amts[i]
      const dropY = t < lastLand ? 0 : 22 * (1 - E.out(prog(t, lastLand, 0.14)))   // drops the last few px onto the rim
      const isGoal = tones[i] === 'goal'
      const sq = squashAt(t, lastLand + 0.05, Math.min(a.sqMax, isGoal ? 0.12 : Math.max(0, 1 - 42 / apx)))
      const pp = popIn(t, lastLand, 0.22, 0.84)
      const nextT = i < n - 1 ? times[i + 1] : (checkT ?? Infinity)
      const tc = toneOf(tones[i]).text
      const col = isGoal ? C.ink : tones[i] === 'neutral' ? mix(C.heroInk, C.ink, prog(t, nextT, 0.3)) : tc
      a.o.set({ x: a.x, y: a.y - dropY, sx: pp.scale * sq.sx, sy: pp.scale * sq.sy, opacity: t < lastLand ? 0 : pp.opacity, color: col })
      if (a.plate) {
        const pl = popIn(t, lastLand - 0.02, 0.3, 0.6)
        const x = a.cx - a.w / 2 - PLATE[0], y = a.y - apx - PLATE[1] - dropY + 2
        style(a.plate, { transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(pl.scale * sq.sx).toFixed(3)},${(pl.scale * sq.sy).toFixed(3)})`, opacity: t < lastLand - 0.02 ? '0' : '1' })
      }
    })

    // ---- working line
    if (wlH) {
      let act = null
      for (const x of WS) if (t >= x.t0 && t < x.t1) act = x
      if (!act) { style(wl, { opacity: '0' }); setHTML(wl, '') }
      else {
        let str = act.full
        if (act.kind === 'ten') {
          const tf = clamp((t - act.t0) / Math.max(0.3, ten.t - 0.25 - act.t0))
          const typedS = typed(ten.formula, tf)
          str = t < ten.t ? `<b>${esc(typedS)}</b>` : act.full
        }
        setHTML(wl, str)
        const pin = prog(t, act.t0, 0.2), pout = act.t1 === Infinity ? 0 : prog(t, act.t1 - 0.12, 0.12)
        const bmp = act.kind === 'ten' ? 1 + 0.1 * Math.sin(Math.PI * prog(t, ten.t, 0.25)) : 1
        const pop = { sx: bmp, sy: bmp }
        style(wl, { opacity: (clamp(pin * 2) * (1 - pout)).toFixed(3), transform: `translateY(${((1 - E.out(pin)) * 14).toFixed(1)}px) scale(${pop.sx.toFixed(3)},${pop.sy.toFixed(3)})` })
      }
    }

    // ---- check: ghost slab, tokens pop in, amounts fly up from the bins into their slots
    if (chk) {
      const gOn = prog(t, checkT - 0.1, 0.25)
      attr(ghost, 'opacity', String(gOn))
      attr(ghost, 'fill', t >= chk.end ? C.heroSoft : C.void)
      attr(ghost, 'stroke-dasharray', t >= chk.end ? 'none' : '14 12')
      for (const x of chk.tk) {
        const pp = popIn(t, x.at, 0.2, 0.84)
        style(x.sp, { opacity: t < x.at ? '0' : pp.opacity.toFixed(3), transform: `scale(${pp.scale.toFixed(3)})` })
        if (x.fly) {
          const f = x.fly
          const on = t >= f.t0 && t < x.at
          if (!on) { f.o.set({ opacity: 0 }); f.o.overlap(false); continue }
          const p = E.inOutSine(prog(t, f.t0, x.at - f.t0))
          let [px, py] = arc(p, f.from, f.to, 90)
          if (!bins) {
            // rows: first it slides out right of the value column along its own row (never across another row's
            // amount), then it rises in the margin and curves in to its slot
            const xm = 936 - f.o.w / 2
            if (p < 0.28) { px = lerp(f.from[0], xm, E.out(p / 0.28)); py = f.from[1] - 8 * Math.sin(Math.PI * p / 0.28) }
            else {
              const q = (p - 0.28) / 0.72, r = 1 - q
              px = r * r * xm + 2 * r * q * xm + q * q * f.to[0]
              py = r * r * f.from[1] + 2 * r * q * f.to[1] + q * q * f.to[1]
            }
          }
          const sc = lerp(1, f.s1, p)
          f.o.set({ x: px, y: py, sx: sc, sy: sc, opacity: 1, rot: 6 * Math.sin(Math.PI * p) })
          f.o.overlap(true)
        }
      }
    }

    // ---- figure + tool
    if (fig) {
      const st = figState(t)
      let pose = ptr.at(t)
      const prev = ptr.at(t - 0.07)
      const w = walkW(t)
      if (w && t >= w.t0 && t <= w.t1) {
        const amt = Math.sin(Math.PI * prog(t, w.t0, w.t1 - w.t0))
        pose = blendPose(pose, runPose(st.x / (150 * k), 0.5), clamp(amt * 2.2))
      }
      if (saw) {
        // body bobs with the saw strokes
        for (const sg of segs2.saw) if (t > sg.t0 && t < sg.t1) pose = { ...pose, lean: pose.lean + 4 * Math.sin(2 * Math.PI * 3.4 * (t - sg.t0) + 0.6), tilt: pose.tilt + 3 * Math.sin(2 * Math.PI * 3.4 * (t - sg.t0)) }
      }
      pose = secondary(pose, t, { prev })
      let J = fk(pose, { x: st.x, ground: st.ground, face: st.face, scale: k })
      let sq = { sx: 1, sy: 1 }
      if (hopSeg) { const s2 = squashAt(t, hopSeg.t1, 0.16); sq = s2 }
      if (saw) {
        const sgr = sawGrip(t)
        if (sgr) {
          const J2 = { ...J }
          pinLimb(J2, 'hF', sgr.G, 1)
          pinLimb(J2, 'hB', [sgr.G[0] + 6, sgr.G[1] - 4], 1)
          J = blendJ(J, J2, sgr.blend)
          placeTool(saw, J.hF, sgr.ang, 1)
        } else {
          // hanging from the back hand, angled back and down
          const fa = Math.atan2(J.hB[1] - J.eB[1], J.hB[0] - J.eB[0]) / RAD
          const tail = J.face < 0 ? fa - 34 : fa + 34
          const shown = hopSeg ? 1 - prog(t, hopSeg.t0 - 0.26, 0.14) : 1
          placeTool(saw, J.hB, tail, shown)
        }
      }
      if (clv) {
        if (t < toolT) style(clv.g, { display: 'none' })
        else {
          const cg = clvGrip(t, J)
          const J2 = { ...J }
          const fl = J.face < 0 ? 1 : -1
          pinLimb(J2, 'hF', cg.G, 1)
          pinLimb(J2, 'hB', [cg.G[0] + 30 * fl, cg.G[1] + 2], 1)
          const gone = hopSeg ? prog(t, hopSeg.t0 - 0.26, 0.14) : 0
          J = blendJ(J, J2, E.out(prog(t, toolT, 0.12)) * (1 - E.inOut(gone)))
          const pin = popIn(t, toolT, 0.2, 0.5)
          placeClv(cg.G, cg.ang, fl, pin.scale * (1 - gone), pin.opacity * (1 - gone))
        }
      }
      fig.draw(J, sq)
    }
    for (const dz of dust) {
      const dt = t - dz.t0
      if (dt < 0 || dt > 0.6) { attr(dz.el, 'opacity', '0'); continue }
      attr(dz.el, 'cx', (dz.c + dz.vx * dt).toFixed(1)); attr(dz.el, 'cy', (ys + 4 + dz.vy * dt + 0.5 * 2600 * dt * dt).toFixed(1))
      attr(dz.el, 'opacity', String((1 - dt / 0.6).toFixed(2)))
    }

    // ---- camera (impact punch about the goal plate)
    // the sheet runs edge to edge, so the shake is mostly vertical and the punch is about the screen's centre line
    const { shake, zoom } = fxk.seek(t)
    const fy = goalI >= 0 ? amts[goalI].y - apx / 2 : 960
    cam.set({ fx: 500, fy, x: 500, y: fy, zoom, shake: [shake[0] * 0.3, shake[1]] })
  }

  function placeTool(el, at, ang, op) {
    const fy = Math.cos(ang * RAD) < 0 ? -1 : 1
    attr(el, 'transform', `translate(${at[0].toFixed(1)},${at[1].toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${(0.9 * k).toFixed(3)},${(0.9 * k * fy).toFixed(3)})`)
    attr(el, 'opacity', String(op))
    style(el, { display: op <= 0.001 ? 'none' : '' })
  }
  function placeClv(at, ang, fl, sc, op) {
    attr(clv.g, 'transform', `translate(${at[0].toFixed(1)},${at[1].toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${(sc * fl).toFixed(3)},${sc.toFixed(3)})`)
    attr(clv.tg, 'transform', fl < 0 ? `translate(${(2 * clv.cx).toFixed(1)},0) scale(-1,1)` : '')
    attr(clv.g, 'opacity', String(op))
    style(clv.g, { display: op <= 0.001 ? 'none' : '' })
  }

  // ten: the slab cracks with an impact where the cleaver lands
  if (ten && bins) {
    const c0 = segs2.tool[0] ? segs2.tool[0].c : ux(0.5)
    fxk.impact(ten.t, { x: c0, y: ys + slabH / 2, rx: CLV.bw / 2 + 20, ry: slabH / 2 + 18, r: 44, lines: 12, shake: 14, flash: 0.35, punch: 0.015, cue: null })
    cue(ten.t, 'hit', { gain: 0.95 })
    cue(toolT, 'whoosh', { dur: 0.3, gain: 0.4 })
    if (ten.formula) cue(toolT + 0.12, 'type', { dur: Math.max(0.3, ten.t - 0.35 - toolT), gain: 0.35 })
  } else if (ten && !bins) {
    fxk.impact(ten.t, { x: X0 + SW / 2, y: ys + slabH / 2, rx: SW / 2, ry: slabH / 2 + 14, r: 40, lines: 14, shake: 12, flash: 0.3, cue: null })
    cue(ten.t, 'hit', { gain: 0.9 })
  }

  // chrome: skip our verdict ding if the spec already places one there
  const vt = spec.verdict ? spec.verdict.t : null
  const verdictCue = vt != null && ext.some(x => x.kind === 'ding' && Math.abs(x.t - vt) < 0.15) ? null : 'ding'
  return { duration, seek, chrome: { verdictCue } }
}
