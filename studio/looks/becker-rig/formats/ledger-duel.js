// becker-rig · ledger-duel (FORMATS.md §7): same stake, two choices side by side, a year-by-year ledger that fills
// both columns at once, often a crash row mid-way, then the winner.
//
// The duel is physical. On the left, two coin stacks stand side by side on the floor, one per person, each with
// its owner standing on top (green = the hero / winner-to-be, slate = the rival). Stack height is the money, on one
// honest linear scale shared by both, so the taller stack is always the richer person; a stack is always whole
// coins. The rig owns the left of the frame: the stacks stand 130 px apart (so the figures never tangle), the
// left figure stays >= 40 px inside the frame, and the ledger starts 24 px right of the right-hand stack. When no
// column head hangs over the rig, the tallest stack may rise to just under the footer. On the right, the ledger:
// a table (label | person A | person B), labels left-aligned, values right-aligned, that builds bottom-up from the
// floor like the flagship's ladder, every label dim from frame 1, each row's two values dropping onto their dotted
// shelf together. Its right edge stays clear of the button rail even under the climax's camera punch.
//
//   gain   the stack springs up under its owner (he rides it, arms up); the value lands green and goes straight to
//          ink when the next row lands (one green on screen: the newest cell)
//   dip    a small loss: the stack sinks, he bends with it; the value lands red
//   crash  a big loss (>= 12%, or any loss on a "bad" row): an impact on the stack (red hit lines, a mostly vertical
//          shake, `hit`), the lost coins burst off the top and come to rest beside his stack (inside the frame), lie
//          there ~1.25 s and go; he is blown up off the stack and lands squashed on what is left, then slumps; the
//          other one flinches and turns to look. When both crash in the same row, each leans away from the other
//          with his inner arm kept down and his outer arm flailing up (no tangle, never into the edge or the labels)
//   lead   when the lead changes, the new leader pumps a fist
//   event  the row's event text pops as a pill in the slot above the row, with a caret pointing down at the
//          cell(s) that moved; while it is up, the label of the slot it sits in fades out completely (so it never
//          reads as the next year's note). It holds 1.6 s at most (lookOpts.pillHold) and is gone before the next
//          row. A loss row's label keeps its red; a good row's label is green while its pill is up, then ink
//   final  the winner's last value lands at 1.3x on a gold plate (the plate opens from its centre first; impact,
//          camera punch, a short fan of rays above the plate, `cash`); the winner hops and celebrates on the taller
//          stack, then points at the ledger; the loser slumps (the right-hand one turns his back on the ledger) and
//          his column settles grey. Half a second later the rows in between settle to 55% (the first row, the last
//          row and any row a pencil mark rings stay full), so the plate, the ringed cells and the verdict carry the
//          end frame
// "Less is better" duels (debt: the winner ends LOWER) draw the stacks as red debt piles and flip the colours:
// paying down is green, nothing crashes. Row 0 is the start, never a crash. The figures carry no pencil here
// (lookOpts.pencil: true brings it back).
//
// Layout (all measured at mount): values 64 → 40 px, labels ~0.8 of that, rows 1.15 em apart. Column heads are
// "● Name" with the plan under it (never a dropped name, never a cut plan; "\n" in a plan forces a break), and
// they stay over the ledger unless reaching left over the rig saves a line. When the rows do not fit, the fitter
// scores the alternatives and keeps the best: a smaller climax (1.2, 1.12, 1.06x), a tighter rig (stacks 112 or
// 96 px apart), drop the stake line, drop the headroom for a last-row event (its pill then covers the column heads
// for 2.4 s, which dim), 3-line or smaller (38 -> 34 px) plans, a full-width legend ("● Name  plan", up to 2 lines
// each) with plain name heads, and as a last resort 36-38 px values (warns).
//
// lookOpts (all optional; it renders fully without them):
//   figure: false                     no figures (the stacks still grow and get knocked down)
//   figureScale: 0.8                  size of the figures
//   figures: [{ person, color }]      'hero' | 'neutral' (slate) | 'ink'. Default: winner hero, other neutral
//   pencil: true                      the pencil behind each figure's head (off by default in this format)
//   pillHold: 1.6                     the longest an event / cash-out pill stays up (s)
//   rowLabelsAtStart: false           hide the dim future labels (rows appear as they land)
//   stake: false                      hide the stake line under the footer
//   keyLabel: 'Year'                  a head over the label column
//   beats: [{ t, act, person, targets, d }]   extra acting: act = a POSES name (or cheer | peek) for `person`
//                                     (held d = 1.4 s), or 'impact' on `targets` (skipped where a crash already hits),
//                                     or 'sell' (below). A scripted beat near the verdict replaces the default
//                                     verdict acting for that person. A beat whose hold runs into the same
//                                     person's sell skips its return pose (the sell's wind-up plays in full).
//          { t, act: 'sell', person, label }   the person cashes out: a chop on his stack, which turns from coins
//                                     into a cash brick (84 px wide, as tall as the money, a "$" on its band; it no
//                                     longer grows) and sweeps his lost coins off the floor; `label` pops as a pill
//                                     right-aligned over his column in the slot above the latest row, its caret on
//                                     his cell (an event pill in that slot closes first)
//   marks: [{ t, row, person }]       a pencil ring is drawn around one landed cell at t (the cell pops; `swipe`);
//                                     it holds until the next row, sell or later mark, or for good on the last row
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup, rng,
  C, F, L, E, RIG, POSES, poseTrack, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj,
  chromeParts, durationOf, num, measure, squashAt, popIn, toss, tossHit, coin, springStep, track, shiftJ, bump,
} from '../lib.js'

export const css = `
.ld-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.ld-stake { position: absolute; left: 62px; width: 878px; font: 700 40px/48px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; }
.ld-stake b { color: ${C.ink}; font-weight: 800; }
.ld-stake em { color: ${C.heroInk}; font-weight: 800; }
.ld-head { position: absolute; text-align: right; white-space: nowrap; }
.ld-name { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.02em; }
.ld-name i { display: inline-block; border-radius: 50%; }
.ld-plan { font-family: ${F.head}; font-weight: 700; font-size: 40px; line-height: 46px; letter-spacing: -0.01em; color: ${C.grey}; }
.ld-leg { position: absolute; left: 62px; width: 878px; font: 700 40px/46px ${F.head}; letter-spacing: -0.01em; color: ${C.grey}; }
.ld-leg.one { white-space: nowrap; }
.ld-leg b { font-weight: 900; letter-spacing: -0.02em; margin-right: 14px; }
.ld-leg i { display: inline-block; width: 26px; height: 26px; border-radius: 50%; margin-right: 12px; vertical-align: 0px; }
.ld-key { position: absolute; font: 800 40px/42px ${F.head}; letter-spacing: .07em; text-transform: uppercase; color: ${C.grey}; white-space: nowrap; }
.ld-label { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; }
.ld-val { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; }
.ld-plate { position: absolute; left: 0; top: 0; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 18px; transform-origin: 50% 50%; }
.ld-pill { position: absolute; left: 0; top: 0; box-sizing: border-box; padding: 0 20px; border-radius: 16px; border: 5px solid; background: ${C.white};
  font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; white-space: nowrap; transform-origin: 50% 100%; }
.ld-caret { position: absolute; top: 100%; margin-top: -5px; width: 30px; height: 26px; overflow: visible; }
.ld-pill em { color: inherit; text-decoration: underline; text-decoration-thickness: 4px; text-underline-offset: 6px; }
.ld-pill u.mark2 { color: inherit; }
`

// ---------------------------------------------------------------------------------------------- helpers
const PAL = {
  hero: { fig: C.hero, text: C.heroInk },
  neutral: { fig: C.grey, text: C.ink },
  ink: { fig: C.ink, text: C.ink },
}
PAL.grey = PAL.neutral
const hex = c => (c[0] === '#' ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : c.match(/[\d.]+/g).slice(0, 3).map(Number))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const TONE_C = { bad: C.red, good: C.heroInk, goal: C.ink, neutral: C.ink }

// local poses (arms relative to the torso; see lib.js §2 for the angle conventions)
const PZ = {
  ready:  { lean: 2, tilt: -8, aF: [24, 40], aB: [-22, 26], lF: [12, -6], lB: [-12, -3] },
  bob:    { lean: 12, tilt: 6, aF: [6, 34], aB: [-28, 28], lF: [30, -54], lB: [-8, -48] },       // knees give
  lifted: { lean: -4, tilt: -14, aF: [140, 16], aB: [-140, -16], lF: [12, -4], lB: [-12, -4] },  // riding up, arms up in a V
                                                                                                  // (arms out would reach his neighbour)
  pump:   { lean: 4, tilt: -14, aF: [164, -26], aB: [-52, -22], lF: [12, -6], lB: [-12, -3] },
  flinch: { lean: -14, tilt: -10, aF: [76, 92], aB: [-34, 64], lF: [16, -12], lB: [-16, -8] },
  squash: { lean: 6, tilt: 16, aF: [80, 24], aB: [-80, -24], lF: [62, -122], lB: [-38, -84] },   // landed hard, arms out
  down:   { lean: 18, tilt: 30, aF: [4, 10], aB: [-4, 8], lF: [16, -34], lB: [-6, -30] },         // dazed: bent over, arms hanging
  sink:   { lean: 8, tilt: 10, aF: [10, 14], aB: [-12, 12], lF: [24, -40], lB: [-6, -36] },
  look:   { lean: -2, tilt: -18, aF: [130, 96], aB: [-14, 16], lF: [10, -4], lB: [-12, -3] },      // hand over eyes
  glum:   { lean: 8, tilt: 34, aF: [6, 6], aB: [-6, 6], lF: [10, -16], lB: [-6, -12] },           // dejected, upright
  glumBack: { lean: 1, tilt: 30, aF: [4, 6], aB: [-4, 6], lF: [8, -12], lB: [-6, -10] },         // the same, head over his own stack
  stamp:  { lean: 14, tilt: 24, aF: [34, 8], aB: [26, 12], lF: [22, -44], lB: [-14, -30] },       // both hands chop down at his feet
}
const ACT = { cheer: 'celebrate', peek: PZ.look, look: PZ.look }

const EVENT_PAUSE = 1.2       // default pacing: extra pause after an event row (when rows carry no "t")
const AIR = 0.42              // crash: time in the air before he lands on what is left
const SLAB = 15               // coin thickness in a stack (px); a stack is always whole coins (thickness 13-17 px)
const CASH = { fill: '#D9DEE5', stroke: C.grey }   // a sold stack: a grey brick of cash (between C.lineSoft and C.line)
const PILL_HOLD = 1.6         // an event / cash-out pill holds at most this long (s), then the slot is clear again
const DEBRIS_HOLD = 1.25      // lost coins lie on the floor this long after the crash, then go (s)

export default function ledgerDuel(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const rows = (d.rows || []).filter(r => r && Array.isArray(r.values) && r.values.length >= 2)
  const N = rows.length
  if (!N) throw new Error('ledger-duel: data.rows is empty')
  const last = N - 1
  const people = [0, 1].map(i => ({ name: '', plan: '', ...((d.people || [])[i] || {}) }))

  // ---- timing: per-row t wins; otherwise rowsT + rowEvery, with a pause after event rows
  const times = []
  for (let i = 0; i < N; i++) {
    if (rows[i].t != null) times.push(+rows[i].t)
    else if (i === 0) times.push(d.rowsT ?? 1.0)
    else times.push(times[i - 1] + (d.rowEvery ?? 0.6) + (rows[i - 1].event ? EVENT_PAUSE : 0))
  }
  // the stake row (equal values, no explicit t) and any row at t <= 0 are already standing at frame 1: they land
  // before the video starts, so the thumbnail never catches a number mid-squash
  if (N > 1 && rows[0].t == null && String(rows[0].values[0]) === String(rows[0].values[1])) times[0] = 0
  const landT = times.map(x => (x <= 0 ? -0.6 : x))
  const lastT = times[last]
  const nextT = i => (i < last ? times[i + 1] : Infinity)
  const rowAt = t => { let j = 0; for (let i = 0; i < N; i++) if (times[i] <= t + 1e-6) j = i; return j }   // latest landed row
  // scripted cash-outs (lookOpts.beats act 'sell') and pencil marks (lookOpts.marks)
  const sells = (lo.beats || []).filter(b => b && b.act === 'sell' && b.t != null && (b.person === 0 || b.person === 1))
    .map(b => ({ t: +b.t, p: b.person, label: b.label != null ? String(b.label) : '', row: rowAt(+b.t) }))
  const soldAt = [0, 1].map(p => Math.min(Infinity, ...sells.filter(x => x.p === p).map(x => x.t)))
  const marks = (Array.isArray(lo.marks) ? lo.marks : [])
    .filter(m => m && m.t != null && Number.isInteger(m.row) && m.row >= 0 && m.row < N && (m.person === 0 || m.person === 1))
    .map(m => ({ t: +m.t, i: m.row, p: m.person }))
  for (const m of marks) {
    // a mark holds until the next focus: the next row to land, a sell, or a later mark
    const after = [...times.filter(x => x > m.t + 0.01), ...sells.map(x => x.t).filter(x => x > m.t + 0.01),
      ...marks.map(x => x.t).filter(x => x > m.t + 0.01)]
    m.end = after.length ? Math.min(...after) - 0.05 : Infinity
  }

  // ---- numbers (geometry and logic only; every number on screen is a display string from the spec)
  const V = rows.map(r => r.values.slice(0, 2).map(num))
  for (let i = 0; i < N; i++) for (let p = 0; p < 2; p++) if (!Number.isFinite(V[i][p])) V[i][p] = i ? V[i - 1][p] : 0
  const stakeN = num(d.stake)
  const startV = [0, 1].map(p => (Number.isFinite(stakeN) && times[0] > 0.3 ? stakeN : V[0][p]))
  const winner = d.winner === 0 || d.winner === 1 ? d.winner : (V[last][0] >= V[last][1] ? 0 : 1)
  const loser = 1 - winner
  const lessIsBetter = V[last][winner] < V[last][loser]          // debt duels: the winner ends lower
  const TW = lastT                                                 // the winner is crowned as the last row lands
  const plateOn = true
  const prevV = (i, p) => (i ? V[i - 1][p] : startV[p])
  // change class per row and person: kind (motion) and sign (good +1 / bad -1 / 0)
  const KIND = rows.map((r, i) => [0, 1].map(p => {
    const pv = prevV(i, p), dv = V[i][p] - pv
    if (dv === 0) return 'flat'
    if (dv > 0) return 'grow'
    const drop = pv > 0 ? -dv / pv : 0
    if (i > 0 && !lessIsBetter && (drop >= 0.12 || (r.tone === 'bad' && drop > 0.03))) return 'crash'
    return 'dip'
  }))
  const SIGN = rows.map((r, i) => [0, 1].map(p => { const dv = V[i][p] - prevV(i, p); return dv === 0 || i === 0 ? 0 : ((dv > 0) !== lessIsBetter ? 1 : -1) }))
  // lead changes (the new leader pumps a fist)
  const leadOf = i => { const dv = V[i][0] - V[i][1]; return dv === 0 ? -1 : ((dv > 0) !== lessIsBetter ? 0 : 1) }
  const leadChange = rows.map(() => -1)
  { let cur = leadOf(0); for (let i = 1; i < N; i++) { const l = leadOf(i); if (l >= 0 && cur >= 0 && l !== cur) leadChange[i] = l; if (l >= 0) cur = l } }

  // ---- colours: figure + name per person
  const pal = [0, 1].map(p => {
    const f = (lo.figures || []).find(x => x && x.person === p)
    return PAL[f && f.color] || (p === winner ? PAL.hero : PAL.neutral)
  })

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  const fixed = h('div', { class: 'ld-fixed' })
  const FIGK = lo.figureScale ?? 0.8
  // the rig: two stacks PW wide whose centres stand SPACING apart (the figures on top never tangle), the left
  // figure kept >= EDGE px inside the frame; a sold stack is a cash brick BRICK_W wide. The ledger starts 24 px
  // right of the right-hand stack.
  // A ledger too wide for the room left (long labels, 6-digit values) tightens the rig (spacing 112, then 96)
  // before its values drop under 40 px.
  const PW = 76, EDGE = 40, BRICK_W = 84, SPACINGS = [130, 112, 96]
  const rigFor = sp => ({ sp, PX: [EDGE + 44, EDGE + 44 + sp], X0: EDGE + 44 + sp + Math.max(PW, BRICK_W) / 2 + 24 })
  let { PX, X0 } = rigFor(SPACINGS[0])                  // stack centres 84, 214; the ledger (labels) from x 280
  // right edge of the last column: x <= 940 below y 820, with room for the climax's camera punch and a 3 px
  // sideways shake (the impacts shake the world mostly up and down)
  const XR = 934, SHAKE_X = 3
  const floorY = L.floorY
  const GAP = 13                                        // text baseline sits this far above its shelf
  // the winner's last value is the climax: 1.3x the other cells, on a gold plate (it may grow into the gap under
  // the column heads; the fitter reserves its height). A ledger too wide or too tall for that steps the climax
  // down (1.2, 1.12, 1.06) before it shrinks every value.
  const HLS_TRY = [1.3, 1.2, 1.12, 1.06], PLATE = [14, 8]
  let HLS = HLS_TRY[0]
  const fnt = (w, px) => `${w} ${px}px ${F.head}`
  const mCache = new Map()                              // the fitter measures the same strings many times
  const mW = (str, font, ls) => { const k = font + '|' + ls + '|' + str; let w = mCache.get(k); if (w == null) { w = measure(str, font, { letterSpacing: ls }); mCache.set(k, w) } return w }
  const wVal = (str, px) => mW(str, fnt(900, px), '-0.03em')
  const wLab = (str, px) => mW(str, fnt(800, px), '-0.02em')

  const nameOf = p => plain(people[p].name || '')
  // stake line (mono, the first amount in ink) under the footer; dropped when the rows need the room
  const top0 = parts.workTop
  let stakeEl = null, stakeH = 0
  if (d.stake && lo.stake !== false) {
    stakeEl = h('div', { class: 'ld-stake', style: { top: top0 + 'px' } })
    const st = String(d.stake)
    stakeEl.innerHTML = /\*\*|__/.test(st) ? markup(st)
      : esc(st).replace(/(≈\s*)?[−-]?\$[\d,.]+[KMBT]?/, m => `<b>${m}</b>`)
    fixed.append(stakeEl)
    ctx.stage.append(fixed)
    stakeH = stakeEl.offsetHeight
  }

  // legend (when it gives the rows more room): one block per person, "● Name  plan", full width under the stake
  // line, wrapping to 2 lines (never cut). The column heads then show the plain names only, no dots.
  let legEls = []
  if (people.some(x => x.plan)) {
    legEls = [0, 1].map(p => {
      const el = h('div', { class: 'ld-leg' })
      el.innerHTML = `<i style="background:${pal[p].fig}"></i><b style="color:${pal[p].text}">${esc(nameOf(p))}</b>${esc(plain(people[p].plan || ''))}`
      fixed.append(el)
      return el
    })
    if (!fixed.parentNode) ctx.stage.append(fixed)
  }
  const legLines = legEls.map(el => Math.round(el.offsetHeight / 46))
  const legH = legEls.reduce((a, el) => a + el.offsetHeight, 0) + 6

  // greedy wrap; a "\n" in the text is a forced break (a plan can set its own two balanced lines)
  function wrap(text, font, ls, maxW) {
    const lines = []
    for (const seg of String(text).split('\n')) {
      const words = seg.split(/\s+/).filter(Boolean)
      let cur = ''
      for (const w of words) {
        const next = cur ? cur + ' ' + w : w
        if (!cur || mW(next, font, ls) <= maxW + 0.5) cur = next
        else { lines.push(cur); cur = w }
      }
      if (cur) lines.push(cur)
    }
    const ws = lines.map(l => mW(l, font, ls))
    return { lines, w: Math.max(0, ...ws), over: ws.some(x => x > maxW + 0.5) }
  }

  const pillPx = 42, pillH = 50 + 10                    // 42 px text on a 50 px line + 2 x 5 px border
  const keyLabel = lo.keyLabel ? String(lo.keyLabel) : ''
  // one candidate layout: value size vp + config { st: stake line, hr: headroom for a last-row event, pl: plan lines }
  function tryLayout(vp, cf) {
    const HLS = cf.hls, X0 = cf.rig.X0
    const yp = Math.min(vp, clamp(Math.round(vp * 0.8), 40, 52))   // vp < 40 only as the last resort (warns)
    // labels are left-aligned at X0, so a short label leaves its row room (the climax plate uses it)
    const labW = rows.map(r => wLab(String(r.label ?? ''), yp))
    const yW = Math.max(...labW, keyLabel ? mW(keyLabel.toUpperCase(), fnt(800, 40), '.07em') : 0)
    const tw = rows.map(r => [0, 1].map(p => wVal(r.values[p], vp)))
    const isPlate = (i, p) => i === last && p === winner && plateOn
    // how far a cell reaches left / right of its column's right edge (a plate: its scaled text + padding)
    const reachL = (i, p) => (isPlate(i, p) ? tw[i][p] * HLS + PLATE[0] : tw[i][p])
    const reachR = (i, p) => (isPlate(i, p) ? PLATE[0] : 0)
    const G = 32, GP = 18                                 // gap between texts; between a label and the plate
    const xB = XR
    // A's right edge xA: every row's A cell clears its label, and B's cell clears A's
    let aLo = -Infinity, aHi = Infinity
    for (let i = 0; i < N; i++) {
      aLo = Math.max(aLo, X0 + labW[i] + (isPlate(i, 0) ? GP : G) + reachL(i, 0))
      aHi = Math.min(aHi, xB - reachL(i, 1) - G - reachR(i, 0))
    }
    if (aLo > aHi + 0.01) return null
    const xYear = X0 + yW                                 // the label column's right edge
    const vW = [0, 1].map(p => Math.max(...rows.map((_, i) => reachL(i, p))))
    // the split that wraps the heads into the fewest lines
    let best = null
    // Each column head is "● Name" with the plan under it in grey (no separate legend: every name appears once).
    // A head stays over the ledger (it reaches left over the label column, to X0 - 4, and only past it, over the
    // rig, at a cost: it then caps the stacks); a name is never dropped (48 -> 40 px, else on two lines); a plan
    // wraps to as many lines as the config allows at cf.pp px (40, else down to 34), "\n" forcing a break.
    // (the split between the two heads may move left over A's values, up to 3/4 of their width: B's head then
    // right-aligns over B's column and A's head ends a little left of its column's edge)
    const xAs = aHi - aLo < 1 ? [aLo] : [0, 0.25, 0.5, 0.75, 1].map(f => aLo + (aHi - aLo) * f)
    for (const xA of xAs) for (const sh of [0, 0.1, 0.2, 0.3, 0.45, 0.6, 0.75]) for (const far of [false, true]) {
      const aR = xA - sh * tw.reduce((m, r) => Math.min(m, r[0]), Infinity)
      const leftLim = keyLabel ? xYear + 24 : far ? 62 : X0 - 4
      const headW = [aR - leftLim, xB - aR - 24]
      // with the legend on screen the heads are plain names (the legend has the dots); a head too narrow for
      // "● Name" drops its dot (the name keeps its colour), then wraps the name; it never drops the name
      const names = [0, 1].map(p => {
        if (!cf.lg) for (let px = 48; px >= 40; px -= 2) { const w = mW(nameOf(p), fnt(900, px), '-0.02em') + px * 0.6 + 12; if (w <= headW[p]) return { px, w, lines: [nameOf(p)] } }
        for (let px = 48; px >= 40; px -= 2) { const w = mW(nameOf(p), fnt(900, px), '-0.02em'); if (w <= headW[p]) return { px, w, lines: [nameOf(p)], noDot: true } }
        const wr = wrap(nameOf(p), fnt(900, 40), '-0.02em', headW[p])
        return wr.lines.length <= 2 && !wr.over ? { px: 40, w: wr.w, lines: wr.lines, noDot: true } : { px: 40, w: Infinity, lines: [] }
      })
      // both names at one size (the smaller of the two fits)
      const npx = Math.min(...names.map(n => n.px))
      for (const n of names) if (n.px > npx && n.w < Infinity) { n.w *= npx / n.px; n.px = npx }
      const plans = [0, 1].map(p => (people[p].plan && !cf.lg ? wrap(plain(people[p].plan), fnt(700, cf.pp), '-0.01em', headW[p]) : { lines: [], w: 0, over: false }))
      if (names.some((n, p) => n.w > headW[p] + 0.5) || plans.some(x => x.over)) continue
      const nl = Math.max(...plans.map(x => x.lines.length)), nn = Math.max(...names.map(n => n.lines.length))
      const dots = names.filter(n => !n.noDot).length
      // A's head reaching left past the ledger (over the rig) costs a little, so it only does when it saves a line
      const overRig = aR - Math.max(names[0].w, plans[0].w) < X0 - 4.5
      if (far && !overRig) continue                       // (the same layout as the near pass)
      const cost = 10 * (nl + nn) - 2 * dots + 3 * sh + (overRig ? 6 : 0)
      if (!best || cost < best.cost - 1e-9) best = { xA, aR, names, plans, nl, nn, headW, dots, cost }
    }
    if (!best || best.nl > cf.pl) return null
    const nameLH = Math.max(...best.names.map(n => n.px)) + 4
    const planLH = Math.round(cf.pp * 1.15)
    const headH = best.nn * nameLH + best.nl * planLH
    // vertical: rows from the floor up; heads just above the top row (and the stake line above them)
    const legTop = top0 + (cf.st ? stakeH + 18 : 0)
    if (cf.lg && legLines.some(n => n > 2)) return null
    const top = legTop + (cf.lg ? legH + 18 : cf.st ? 4 : 0)
    // (rows may sit 1.15 em apart: the text runs' boxes then touch by ~3 px of empty line box, no ink)
    const rowNeed = Math.ceil(1.15 * Math.max(vp, yp))
    const topExtra = plateOn ? 0.97 * vp * HLS + PLATE[1] + 8 : 0.97 * vp
    const headroom = cf.hr ? pillH + 14 : 0
    const shelf0 = floorY - 16
    const avail = N > 1 ? (shelf0 - GAP - topExtra - headroom - (top + headH + 20)) / (N - 1) : 999
    if (avail < rowNeed) return null
    const pitch = Math.min(avail, Math.max(rowNeed + 26, 1.9 * vp))
    return { vp, yp, yW, vW, xYear, xA: best.xA, aR: best.aR, xB, names: best.names, plans: best.plans, nameLH, planLH, headH, pitch, shelf0, topExtra, headroom, top, legTop, cf, hls: HLS, rig: cf.rig }
  }
  // score every config by its best value size; the stake line and the last-row headroom are worth a few px
  let lay = null
  for (const hls of plateOn ? HLS_TRY : [1]) for (const rig of SPACINGS.map(rigFor))
  for (const st of stakeEl ? [true, false] : [false]) for (const hr of rows[last].event ? [true, false] : [false])
  for (const [pl, pp, lg] of people.some(x => x.plan) ? [[2, 40, false], [3, 40, false], [0, 40, true], [2, 38, false], [3, 38, false], [3, 36, false], [3, 34, false], [4, 34, false]] : [[0, 40, false]]) {
    for (let vp = 64; vp >= 36; vp -= 2) {
      const l = tryLayout(vp, { st, hr, pl, pp, lg, hls, rig })
      if (!l) continue
      // a small plan costs less than small values; the legend (names twice) costs a little; a value under 40 px
      // is the last resort; a name without its dot costs a little; a smaller climax costs about as much as 4 px
      // of value size at 1.06x
      l.score = vp + (st ? 8 : 0) + (hr ? 4 : 0) - (pl >= 3 ? 5 : 0) - (pp < 40 ? 6 + 1.5 * (40 - pp) : 0) - (lg ? 6 : 0) - (vp < 40 ? 30 : 0)
        - (lg ? 0 : 2 * l.names.filter(n => n.noDot).length) + 20 * (hls - 1.06) - 0.25 * (SPACINGS[0] - rig.sp)
      if (!lay || l.score > lay.score) lay = l
      break
    }
  }
  if (!lay) throw new Error('ledger-duel: the rows do not fit (too many rows, or values/labels too wide)')
  HLS = lay.hls; ({ PX, X0 } = lay.rig)
  if (stakeEl && !lay.cf.st) { stakeEl.remove(); stakeEl = null }
  if (lay.cf.lg) { let y = lay.legTop; for (const el of legEls) { style(el, { top: y + 'px' }); y += el.offsetHeight + 6 } }
  else for (const el of legEls) el.remove()
  const top = lay.top
  const stakeBottom = stakeEl ? top0 + stakeH : top0 - 28
  const { vp, yp, xYear, xA, xB, pitch, shelf0 } = lay
  const xCol = [xA, xB]
  const shelfY = i => shelf0 - i * pitch
  const baseY = i => shelfY(i) - GAP
  const boxBottom = (i, px) => baseY(i) + 0.14 * px
  const rowTop = i => baseY(i) - 0.97 * vp * (i === last && plateOn ? HLS : 1) - (i === last && plateOn ? PLATE[1] + 6 : 0)
  const topRowTop = rowTop(last) - lay.headroom
  const headTop = Math.max(top, topRowTop - 20 - lay.headH)

  // ================================================================== build
  const world = makeWorld(ctx)
  if (!fixed.parentNode) ctx.stage.append(fixed)
  ctx.stage.append(fixed)                                     // above the world
  const g = world.g

  // column heads (fixed layer): "● Name" + plan, right-aligned over each value column
  const heads = []
  for (let p = 0; p < 2; p++) {
    const el = h('div', { class: 'ld-head' })
    const nm = lay.names[p], dot = Math.round(nm.px * 0.6)
    el.innerHTML = `<div class="ld-name" style="font-size:${nm.px}px;line-height:${lay.nameLH}px;color:${pal[p].text}">`
      + (nm.noDot ? '' : `<i style="width:${dot}px;height:${dot}px;margin-right:12px;vertical-align:${Math.round(nm.px * 0.02)}px;background:${pal[p].fig}"></i>`) + `${nm.lines.map(esc).join('<br>')}</div>`
      + lay.plans[p].lines.map(l => `<div class="ld-plan" style="font-size:${lay.cf.pp}px;line-height:${lay.planLH}px">${esc(l)}</div>`).join('')
    fixed.append(el)
    style(el, { top: headTop + 'px', left: ((p ? xCol[p] : lay.aR) - el.offsetWidth).toFixed(1) + 'px' })
    heads.push(el)
  }
  if (keyLabel) {
    const el = h('div', { class: 'ld-key' }, keyLabel)
    fixed.append(el)
    heads.push(el)
    style(el, { top: (headTop + lay.headH - 46) + 'px', left: X0 + 'px' })
  }

  // shelves (dotted, like the flagship's rungs)
  const shelves = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 4, x2: XR, y1: shelfY(i), y2: shelfY(i), stroke: C.line, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15' })
    g.back.append(el)
    return el
  })

  // the ledger: label + two values per row (+ the gold plate under the winner's last value)
  let plate = null
  const R = rows.map((r, i) => {
    const row = {
      label: new NumObj(world.html, { cls: 'ld-label', text: String(r.label ?? ''), ax: 0, ay: 1, style: { fontSize: yp + 'px' } }),
      vals: [0, 1].map(p => {
        if (i === last && p === winner && plateOn) { plate = h('div', { class: 'ld-plate' }); world.html.append(plate) }
        return new NumObj(world.html, { cls: 'ld-val', text: r.values[p], ax: 1, ay: 1, style: { fontSize: vp + 'px' } })
      }),
    }
    return row
  })
  const pb = (() => {
    const w = wVal(rows[last].values[winner], vp) * HLS + 2 * PLATE[0], hh = vp * HLS + 2 * PLATE[1]
    const cy = baseY(last) - vp * HLS * 0.36
    return { x: xCol[winner] + PLATE[0] - w, y: cy - hh / 2, w, h: hh, cx: xCol[winner] + PLATE[0] - w / 2, cy }
  })()
  if (plate) style(plate, { width: pb.w.toFixed(0) + 'px', height: pb.h.toFixed(0) + 'px' })

  // event pills: right above their row, in the slot the next row will land in, with a caret pointing down into
  // the row's cells (so the pill reads as that row's note, not the next row's). While a pill is up, the dim label
  // of the slot it sits in (and any other label it covers) fades out completely, so the eye never pairs the pill
  // with the next year ("2025 · dip"). A pill holds PILL_HOLD s at most (lookOpts.pillHold), and is gone before
  // the next row lands.
  const pillHold = Number.isFinite(+lo.pillHold) && +lo.pillHold > 0.3 ? +lo.pillHold : PILL_HOLD
  const pills = []
  const cellCx = (i, p) => (i === last && p === winner && plateOn ? pb.cx : xCol[p] - wVal(rows[i].values[p], vp) / 2)
  // the labels a pill takes over: its own slot's (always) and any other future label its box covers
  const labelsUnder = (i, box) => {
    const out = []
    for (let j = i + 1; j < N; j++) {
      const ly0 = boxBottom(j, yp) - 0.86 * yp, ly1 = boxBottom(j, yp)
      const lx0 = X0, lx1 = X0 + wLab(String(rows[j].label ?? ''), yp)
      const vOver = Math.min(ly1, box.y1) - Math.max(ly0, box.y0)
      if (j === i + 1 || (vOver > 4 && box.x0 < lx1 + 4 && box.x1 > lx0 - 4)) out.push(j)
    }
    return out
  }
  // a pill element (tone colours) with its caret; px shrinks (42 -> 36) until it fits maxW
  function pillEl(html, { color, border, bg, maxW }) {
    const el = h('div', { class: 'ld-pill' })
    el.innerHTML = html
    world.html.append(el)
    let px = pillPx
    style(el, { fontSize: px + 'px', lineHeight: '50px', color, borderColor: border, background: bg })
    while (px > 36 && el.offsetWidth > maxW) { px -= 2; style(el, { fontSize: px + 'px' }) }
    // caret: the pill's fill over its bottom border, two strokes down to a point 10 px under the pill
    const caret = s('svg', { class: 'ld-caret', viewBox: '0 0 30 26', 'data-deco': '' })
    caret.append(
      s('path', { d: 'M1,0 L15,23 L29,0 Z', fill: bg, stroke: 'none' }),
      s('path', { d: 'M3.5,7.5 L15,21.5 L26.5,7.5', fill: 'none', stroke: border, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    )
    el.append(caret)
    return { el, px, caret }
  }
  // place the caret over x (stage px) inside a pill whose box starts at x0
  const aimCaret = (pl, x) => style(pl.caret, { left: (clamp(x - pl.box.x0, 30, pl.w - 30) - 15 - 5).toFixed(1) + 'px' })
  rows.forEach((r, i) => {
    if (!r.event) return
    const tn = r.tone && TONE_C[r.tone] ? r.tone : 'neutral'
    const bg = tn === 'goal' ? C.coin : C.white
    const { el, px, caret } = pillEl(markup(String(r.event)), { color: TONE_C[tn], border: tn === 'goal' ? C.ink : TONE_C[tn], bg, maxW: XR - X0 })
    const w = el.offsetWidth, ph = el.offsetHeight
    const bottom = rowTop(i) - 8
    // the last row's pill stays for good when the layout kept headroom for it; otherwise it sits over the
    // column heads (they dim) for a couple of seconds
    const overHeads = i === last && !lay.cf.hr
    // centred over the cells that changed in this row (the caret points at them), kept inside the ledger
    const moved = [0, 1].filter(p => KIND[i][p] !== 'flat')
    const aim = moved.length === 1 ? cellCx(i, moved[0]) : (cellCx(i, 0) + cellCx(i, 1)) / 2
    const cx = overHeads ? (X0 + XR) / 2 : Math.min(XR - w / 2, Math.max(X0 + w / 2, aim))
    const box = { x0: cx - w / 2, x1: cx + w / 2, y0: bottom - ph, y1: bottom }
    const t0 = times[i] + 0.06
    let t1 = i < last ? Math.max(t0 + 0.3, Math.min(nextT(i) - 0.32, t0 + pillHold)) : overHeads ? t0 + 2.4 : Infinity
    // a cash-out in the same slot closes this pill first
    for (const sl of sells) if (sl.row === i && sl.t > t0 && sl.t < t1) t1 = Math.max(t0 + 0.3, sl.t - 0.12)
    // ... and so does a pencil mark on this row (one focus at a time; the ring needs the room above the row)
    for (const m of marks) if (m.i === i && m.t > t0 && m.t < t1) t1 = Math.max(t0 + 0.3, m.t - 0.05)
    const pl = { i, el, caret, box, w, ph, t0, t1, under: labelsUnder(i, box), overHeads, tone: tn, from: Math.max(0.86, 41 / px), sq: clamp(1 - 41.5 / px, 0, 0.08) }
    aimCaret(pl, aim)
    pills.push(pl)
  })
  // cash-out pills: right-aligned over the seller's column, in the slot above the latest landed row, the caret on
  // his cell
  for (const sl of sells) {
    if (!sl.label) continue
    const { el, px, caret } = pillEl(markup(sl.label), { color: C.grey, border: C.grey, bg: C.white, maxW: XR - X0 })
    const w = el.offsetWidth, ph = el.offsetHeight, i = sl.row
    const bottom = rowTop(i) - 8
    const x1 = sl.p === 1 ? XR : Math.min(XR, xCol[0] + 12)
    const box = { x0: Math.max(X0, x1 - w), x1: Math.max(X0, x1 - w) + w, y0: bottom - ph, y1: bottom }
    const t0 = sl.t + 0.04
    const t1 = i < last ? Math.max(t0 + 0.3, Math.min(nextT(i) - 0.32, t0 + pillHold)) : Infinity
    const pl = { i, el, caret, box, w, ph, t0, t1, under: labelsUnder(i, box), overHeads: false, tone: 'neutral', from: Math.max(0.86, 41 / px), sq: clamp(1 - 41.5 / px, 0, 0.08) }
    aimCaret(pl, cellCx(i, sl.p))
    pills.push(pl)
  }

  // pencil marks: a hand-drawn loop around one cell (red on a loss, ink otherwise), drawn on in ~0.28 s
  const rings = marks.map((m, k) => {
    const { i, p } = m
    const onPlate = i === last && p === winner && plateOn
    const tw = wVal(rows[i].values[p], vp) * (onPlate ? HLS : 1)
    const cx = onPlate ? pb.cx : xCol[p] - tw / 2
    const cy = onPlate ? pb.cy : baseY(i) - 0.38 * vp
    const rx = onPlate ? pb.w / 2 + 14 : tw / 2 + 22
    const ry = onPlate ? pb.h / 2 + 10 : 0.42 * vp + 11
    // one loop and a bit around a squarish oval (a superellipse, so the corners of the figures stay inside), starting
    // upper-left, with a slight wobble and a widening spiral (a pencil, not a compass)
    const pts = [], a0 = Math.PI * 1.1, span = Math.PI * 2.14, n = 120
    const se = v => Math.sign(v) * Math.pow(Math.abs(v), 0.7)
    for (let q = 0; q <= n; q++) {
      const u = q / n, a = a0 + span * u
      const g = 1 + 0.025 * Math.sin(2 * a + 0.7 + k) + 0.05 * u
      pts.push([cx + rx * g * se(Math.cos(a)), cy + ry * g * se(Math.sin(a)) - 3 * u])
    }
    let len = 0
    for (let q = 1; q < pts.length; q++) len += Math.hypot(pts[q][0] - pts[q - 1][0], pts[q][1] - pts[q - 1][1])
    const red = SIGN[i][p] < 0                                    // the cell is red (a loss)
    const el = s('path', { d: 'M' + pts.map(x => x[0].toFixed(1) + ',' + x[1].toFixed(1)).join(' L'), fill: 'none',
      stroke: red ? C.red : C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'stroke-dasharray': len.toFixed(1), 'stroke-dashoffset': len.toFixed(1), opacity: 0, 'data-deco': '' })
    g.top.append(el)
    return { ...m, el, len }
  })

  // ---- coin stacks: edge-on coins, height = money on one shared scale
  const figH = (2 * RIG.headR + RIG.neck + RIG.torso + RIG.thigh + RIG.shin) * FIGK
  // the figures stand left of the ledger, under everything that starts at the left margin (stake line, legend,
  // footer). A column head that reaches left over the rig caps only the figure it actually hangs over, so the
  // taller stack can use the full height when the heads stay over the ledger.
  const headLeft = Math.min(...heads.filter(el => el.classList.contains('ld-head')).map(el => el.offsetLeft))
  const baseBottom = lay.cf.lg ? lay.top - 18 : stakeEl ? stakeBottom : parts.workTop - 28
  const reachX = (RIG.upperArm + RIG.foreArm) * FIGK + 14
  const capBottom = p => (headLeft < PX[p] + reachX ? Math.max(baseBottom, headTop + lay.headH) : baseBottom)
  const roomFor = p => Math.max(160, floorY - (capBottom(p) + 16) - figH * 1.12 - 26)
  const maxVp = [0, 1].map(p => Math.max(1, ...V.map(r => r[p]), startV[p]))
  const scale = Math.min(...[0, 1].map(p => roomFor(p) / maxVp[p]))   // one honest scale for both
  const H_MAX = scale * Math.max(...maxVp)
  const HV = V.map(r => r.map(v => Math.max(0, v) * scale))
  const h0 = startV.map(v => Math.max(0, v) * scale)
  const nSlab = Math.ceil(H_MAX / (SLAB - 2)) + 3
  const stacks = [0, 1].map(p => {
    const sg = s('g', { 'data-deco': '' })
    const rnd = rng(31 + p * 17)
    const slabs = []
    for (let k = 0; k < nSlab; k++) {
      const jx = (rnd() - 0.5) * 5
      // money is a coin stack; in a "less is better" duel the stack is debt: a red pile
      const el = s('rect', { x: (PX[p] - PW / 2 + jx).toFixed(1), width: PW, height: SLAB, rx: SLAB / 2 - 0.5,
        fill: lessIsBetter ? C.redSoft : C.coin, stroke: lessIsBetter ? C.red : C.ink, 'stroke-width': 3.5 })
      sg.append(el)
      slabs.push(el)
    }
    g.mid.append(sg)
    return { sg, slabs }
  })
  // a sold stack becomes a cash brick, as tall as the money it holds and BRICK_W wide: a bundle of grey notes
  // (their edges drawn on both ends) with a white paper band and a "$" on it. It never grows again.
  const bricks = [0, 1].map(p => {
    if (lessIsBetter || !Number.isFinite(soldAt[p])) return null
    const bg = s('g', { 'data-deco': '', style: 'display:none' })
    const body = s('rect', { x: -BRICK_W / 2, width: BRICK_W, rx: 7, fill: CASH.fill, stroke: C.ink, 'stroke-width': 3.5 })
    const edges = [0, 1, 2, 3].map(() => s('line', { stroke: C.grey, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.6 }))
    const band = s('rect', { x: -16, width: 32, fill: C.white, stroke: C.grey, 'stroke-width': 2.5 })
    const mark = s('text', { x: 0, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.grey, 'font-family': F.head, 'font-weight': 900 })
    mark.textContent = '$'
    bg.append(body, ...edges, band, mark)
    g.mid.append(bg)
    let hk = null
    return {
      g: bg,
      draw(hh, sx, sy, on) {
        style(bg, { display: on && hh > 1 ? '' : 'none' })
        if (!on) return
        attr(bg, 'transform', `translate(${PX[p]},${floorY}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`)
        const k = hh.toFixed(1)
        if (k === hk) return
        hk = k
        attr(body, 'y', (-hh).toFixed(1)); attr(body, 'height', hh.toFixed(1))
        attr(band, 'y', (-hh + 1.75).toFixed(1)); attr(band, 'height', Math.max(0, hh - 3.5).toFixed(1))
        // note edges: two thin lines on each side of the band, at a third and two thirds of the height
        const xs = [[-BRICK_W / 2 + 9, -16 - 7], [16 + 7, BRICK_W / 2 - 9]]
        edges.forEach((el, j) => {
          const [x1, x2] = xs[j >> 1], y = -hh * ((j & 1) ? 2 / 3 : 1 / 3)
          attr(el, 'x1', x1); attr(el, 'x2', x2); attr(el, 'y1', y.toFixed(1)); attr(el, 'y2', y.toFixed(1))
          attr(el, 'opacity', hh >= 26 ? '0.6' : '0')
        })
        attr(mark, 'y', (-hh / 2 + 1).toFixed(1)); attr(mark, 'font-size', Math.min(34, hh * 0.74).toFixed(1))
      },
    }
  })
  function drawStack(p, hh, t) {
    // whole coins only: the stack's height is the money, split into round(h / SLAB) coins of equal thickness
    const n = hh < 0.5 ? 0 : Math.max(1, Math.round(hh / SLAB))
    const th = n ? hh / n : SLAB
    const sold = bricks[p] && t >= soldAt[p]
    const sl = stacks[p].slabs
    for (let k = 0; k < sl.length; k++) {
      const on = k < n && !sold
      style(sl[k], { display: on ? '' : 'none' })
      if (!on) continue
      attr(sl[k], 'y', (floorY - (k + 1) * th).toFixed(1))
      attr(sl[k], 'height', th.toFixed(2))
      attr(sl[k], 'rx', (th / 2 - 0.5).toFixed(2))
    }
    // the cash brick pops in as the chop lands (from the floor up) and gives a little under his landing
    if (bricks[p]) {
      const pp = popIn(t, soldAt[p], 0.22, 0.7)
      const sq = squashAt(t, soldAt[p] + 0.02, 0.1)
      bricks[p].draw(hh, pp.scale * sq.sx, pp.scale * sq.sy, sold)
    }
  }

  // stack motion per person: a list of transitions; each starts from wherever the previous one had got to
  const trans = [[], []]
  const evalTr = (tr, t) => {
    if (tr.kind === 'grow') return springStep(t, tr.ts, tr.from, tr.to, { freq: 2.3, damp: 0.42 })
    if (tr.kind === 'dip') return lerp(tr.from, tr.to, E.inOut(prog(t, tr.ts, 0.34)))
    return tr.to                                                  // crash: the top is gone at once
  }
  const hStack = (p, t, upto = trans[p].length - 1) => {
    let k = -1
    for (let j = 0; j <= upto; j++) if (trans[p][j].ts <= t) k = j
    return k < 0 ? h0[p] : evalTr(trans[p][k], t)
  }
  const airs = [[], []]
  for (let i = 0; i < N; i++) for (let p = 0; p < 2; p++) {
    const kind = KIND[i][p]
    if (kind === 'flat') continue
    const ts = kind === 'grow' ? times[i] - 0.05 : kind === 'dip' ? times[i] - 0.04 : times[i]
    const from = hStack(p, ts, trans[p].length - 1)
    trans[p].push({ ts, kind, from, to: HV[i][p], i })
    if (kind === 'crash') airs[p].push({ t0: times[i], dur: AIR, from, to: HV[i][p], boost: 42, i })
  }

  // ================================================================== impacts, debris, cues
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const debris = []
  rows.forEach((r, i) => {
    const Ti = times[i]
    const crashed = [0, 1].filter(p => KIND[i][p] === 'crash')
    crashed.forEach((p, n) => {
      const a = airs[p].find(x => x.i === i)
      fxk.impact(Ti, { x: PX[p], y: floorY - a.from, shake: crashed.length > 1 ? 8 : 11, r: 34, lines: 9, color: C.red, cue: n ? null : 'hit', gain: 0.85 })
      // the lost coins burst off the top and come to rest on the floor beside his own stack (inside the frame,
      // clear of the ledger), lie there DEBRIS_HOLD s, then go: the floor is clean again, so the stacks read on
      // their own. A cash-out sweeps the seller's coins at once.
      const rnd = rng(400 + i * 13 + p * 7)
      const cnt = clamp(Math.round((a.from - a.to) / SLAB) + 3, 4, 9)
      const mid = (PX[0] + PX[1]) / 2
      for (let k = 0; k < cnt; k++) {
        const cr = 14 + rnd() * 6
        const y0 = floorY - lerp(a.to, a.from, (k + 0.5) / cnt)
        const p0 = [PX[p] + (rnd() - 0.5) * 30, y0]
        const vy = -(380 + rnd() * 320)
        const target = p === 0
          ? (k % 2 ? lerp(8 + cr, PX[0] - PW / 2 + 2, rnd()) : lerp(PX[0] + PW / 2 - 2, mid - cr, rnd()))
          : (k % 2 ? lerp(mid + cr, PX[1] - PW / 2 + 2, rnd()) : lerp(PX[1] + PW / 2 - 2, X0 - 12 - cr, rnd()))
        // the resting x is linear in vx (the bounces only scale it), so solve vx for the target
        const unit = toss(Ti + 3, Ti, [0, p0[1]], [1, vy], { r: cr, g: 3200, e: 0.38, friction: 0.35, n: 3, floor: floorY })[0]
        const vx = (target - p0[0]) / Math.max(0.05, unit)
        const t0 = Ti + k * 0.012
        const sale = sells.find(x => x.p === p && x.t > Ti)
        const tEnd = Math.min(Ti + DEBRIS_HOLD + 0.03 * k, sale ? sale.t + 0.04 * (k % 3) : Infinity)
        debris.push({ c: coin(g.front, { r: cr, text: '' }), t0, p0, v: [vx, vy], r: cr, i, tEnd })
      }
    })
    if (i === last && plateOn) {
      // the climax: shake, camera punch and a short fan of rays into the free space above the plate (never over
      // the neighbouring cells or labels)
      fxk.impact(Ti, { x: pb.cx, y: pb.cy, shake: 13, punch: 0.025, burst: false, cue: 'hit', gain: 0.95 })
      ctx.cue(Ti + 0.12, 'cash', { gain: 0.6 })
    } else if (!crashed.length && Ti > 0) ctx.cue(Ti, 'thud', { gain: 0.42 })
    if (r.event && !crashed.length && !(i === last)) ctx.cue(Ti + 0.08, 'pop', { gain: 0.5 })
    else if (leadChange[i] >= 0 && !r.event) ctx.cue(Ti + 0.1, 'pop', { gain: 0.45 })
  })
  // one tick per crash, when its first coin hits the floor
  for (const i of new Set(debris.map(x => x.i))) {
    const first = Math.min(...debris.filter(x => x.i === i).map(x => tossHit(x.t0, x.p0, x.v, { g: 3200, floor: floorY, r: x.r })))
    ctx.cue(first, 'tick', { gain: 0.5 })
  }
  // a cash-out: the chop lands on the stack (small grey burst, a thud), the pill pops
  for (const sl of sells) {
    fxk.impact(sl.t, { x: PX[sl.p], y: floorY - hStack(sl.p, sl.t), shake: 4, r: 24, lines: 8, color: C.grey, cue: null })
    ctx.cue(sl.t, 'thud', { gain: 0.5 })
    if (sl.label) ctx.cue(sl.t + 0.06, 'pop', { gain: 0.45 })
  }
  // pencil marks: one swipe per mark time
  for (const mt of new Set(marks.map(m => m.t))) ctx.cue(mt, 'swipe', { gain: 0.4 })
  // the climax rays: 7 short strokes fanning up from the plate's top edge, as long as the room under the heads
  // allows (<= 28 px), drawn for 0.26 s
  const plateRays = []
  if (plateOn) {
    const room = pb.y - (headTop + lay.headH)
    const len = clamp(room - 14, 12, 28)
    const rnd = rng(733)
    for (let k = 0; k < 7; k++) {
      const u = k / 6
      const el = s('line', { stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', opacity: 0, 'data-deco': '' })
      g.fx.append(el)
      plateRays.push({ el, x: pb.x + pb.w * (0.1 + 0.8 * u), y: pb.y - 7, a: ((-128 + 76 * u + (rnd() - 0.5) * 6) * Math.PI) / 180, len: len * (0.8 + 0.25 * rnd()) })
    }
  }

  // ================================================================== figures
  const showFig = lo.figure !== false
  // no pencil behind the head here: nothing in this format draws with it (the rings draw themselves), and at phone
  // size it reads as an arrow through the head. lookOpts.pencil: true brings it back.
  const figs = showFig ? [0, 1].map(p => new Figure(g.fig, { scale: FIGK, color: pal[p].fig, detail: lo.pencil === true ? 'pencil' : null })) : []
  const keys = [[], []], faceK = [[{ t: 0, v: 1 }], [{ t: 0, v: 1 }]], hops = [[], []], squashes = [[], []]
  const addK = (p, t, pose, dd = 0.2, e = 'spring') => keys[p].push({ t, pose, d: dd, e })
  // frame 1: the hero ponders the ledger, hand on chin; the rival stands ready. A nod in the first second.
  const hero = pal[0].fig === C.hero ? 0 : pal[1].fig === C.hero ? 1 : winner
  addK(hero, 0, 'thinkUp', 0.2)
  addK(1 - hero, 0, PZ.ready, 0.2)
  if (times[Math.min(1, last)] > 1.1 || N === 1) {
    addK(hero, 0.35, { ...POSES.thinkUp, tilt: -4, aF: [40, 142] }, 0.3, 'inOut')
    addK(hero, 0.75, 'thinkUp', 0.35)
  }
  // the way a figure faces at time tt (1 = toward the ledger), from the face keys added so far
  const faceAt = (p, tt) => { let v = 1, bt = -Infinity; for (const x of faceK[p]) if (x.t <= tt && x.t >= bt) { v = x.v; bt = x.t } return v }
  // a shared crash (both blown up off their stacks in the same row): they stand SPACING px apart, so each one leans and
  // flails AWAY from the other (only the outer arm flails; the inner arm stays down, so it never sweeps across his
  // neighbour; the inner leg tucks in on landing) and the left one keeps his head level, so the frame-edge clamp
  // does not push him into his neighbour
  const apart = (p, pose, f, land) => {
    const P = { ...(typeof pose === 'string' ? POSES[pose] : pose) }
    const away = p === 0 ? -1 : 1                                   // screen direction away from the other one
    const inner = away * f < 0                                      // his front limbs point at the other one
    if (p === 0) { P.lean = f > 0 ? -3 : 3; P.tilt = land ? 10 : 2 } else P.lean = away * f * 8
    P[inner ? 'aF' : 'aB'] = inner ? [14, 14] : [-14, -14]          // the inner arm stays down (never sweeps across)
    // the outer arm flails up, not out: out it would hit the frame edge (left) or the ledger's labels (right), and
    // the clamps that keep him off those would push him into his neighbour
    const up = land ? [140, 18] : [162, 8]
    P[inner ? 'aB' : 'aF'] = inner ? [-up[0], -up[1]] : up
    if (land) P[inner ? 'lF' : 'lB'] = inner ? [24, -96] : [-14, -70]
    return P
  }
  for (let i = 1; i < N; i++) {
    const Ti = times[i]
    for (let p = 0; p < 2; p++) {
      const k = KIND[i][p], ko = KIND[i][1 - p], sg = SIGN[i][p]
      const back = (tt, pose = 'idle', dd = 0.4) => { if (tt < nextT(i) - 0.12) addK(p, tt, pose, dd) }
      if (k === 'crash') {
        const both = ko === 'crash', f = faceAt(p, Ti)
        addK(p, Ti - 0.02, both ? apart(p, 'shocked', f, false) : 'shocked', 0.08, 'out')
        addK(p, Ti + AIR - 0.04, both ? apart(p, PZ.squash, f, true) : PZ.squash, 0.07, 'out')
        squashes[p].push({ t: Ti + AIR, amt: 0.32 })
        back(Ti + AIR + 0.22, PZ.down, 0.32)
        back(Ti + AIR + 1.2, 'idle', 0.45)
      } else if (ko === 'crash') {
        addK(p, Ti + 0.04, PZ.flinch, 0.1, 'out')
        if (p === 1) { faceK[p].push({ t: Ti + 0.06, v: -1 }); faceK[p].push({ t: Math.min(Ti + 1.5, nextT(i) - 0.2), v: 1 }) }
        back(Ti + 0.85, 'idle', 0.4)
      } else if (leadChange[i] === p) {
        addK(p, Ti - 0.12, PZ.bob, 0.08, 'out')
        addK(p, Ti + 0.04, PZ.pump, 0.14)
        back(Ti + 0.95, 'idle', 0.4)
      } else if (sg > 0) {
        const rel = Math.abs(V[i][p] - prevV(i, p)) / Math.max(1, Math.abs(prevV(i, p)))
        addK(p, Ti - 0.12, PZ.bob, 0.08, 'out')
        addK(p, Ti + 0.03, rel >= 0.25 ? PZ.lifted : 'idle', 0.16)
        if (rel >= 0.25) back(Ti + 0.6, 'idle', 0.35)
      } else if (sg < 0) {
        addK(p, Ti - 0.02, PZ.sink, 0.14, 'inOut')
        back(Ti + 0.4, 'idle', 0.35)
      }
    }
  }
  // the end: the winner hops and celebrates on his stack, then points at the ledger; the loser slumps
  {
    const w = winner, l = loser
    if (KIND[last][w] !== 'crash') {
      addK(w, TW + 0.16, PZ.bob, 0.1, 'out')
      addK(w, TW + 0.3, 'celebrate', 0.14)
      hops[w].push({ t0: TW + 0.3, dur: 0.44, h: 52 })
      squashes[w].push({ t: TW + 0.74, amt: 0.18 })
      addK(w, TW + 1.45, 'point', 0.3)
      ctx.cue(TW + 0.74, 'step', { gain: 0.55 })
    }
    // the loser: the right-hand one turns his back on the ledger, the left-hand one stays facing it; both droop
    // upright (a forward slump would put the left one's head on the ledger labels, and the right one's over the
    // winner's tall stack)
    const away = l === 1
    const glum = away ? PZ.glumBack : PZ.glum
    if (KIND[last][l] !== 'crash') addK(l, TW + 0.45, glum, 0.4)
    faceK[l].push({ t: TW + 0.4, v: away ? -1 : 1 })
    const vt = spec.verdict && spec.verdict.t
    // a scripted beat for a person close to the verdict replaces his default verdict acting
    const scripted = p => (lo.beats || []).some(b => b && b.t != null && b.act !== 'impact' && b.person === p && b.t > vt - 0.6 && b.t < vt + 1.6)
    if (vt != null && vt > TW + 1.8) {
      if (!scripted(w)) { addK(w, vt, 'celebrate', 0.2); addK(w, vt + 1.1, 'point', 0.3) }
      if (!scripted(l)) { addK(l, vt + 0.1, 'shrug', 0.25); addK(l, vt + 1.0, glum, 0.4) }
    }
  }
  // cash-outs: a wind-up, a chop down onto his own stack (it turns to cash), a small squash, then he stands
  for (const sl of sells) {
    addK(sl.p, sl.t - 0.3, 'chopUp', 0.14, 'out')
    addK(sl.p, sl.t - 0.06, PZ.stamp, 0.07, 'out')
    squashes[sl.p].push({ t: sl.t, amt: 0.12 })
    addK(sl.p, sl.t + 0.75, 'idle', 0.4)
  }
  // lookOpts.beats: extra acting for scripted moments
  for (const b of lo.beats || []) {
    if (!b || b.t == null) continue
    if (b.act === 'impact') {
      for (const p of (b.targets || [b.person]).filter(x => x === 0 || x === 1)) {
        if (airs[p].some(a => Math.abs(a.t0 - b.t) < 0.35)) continue
        fxk.impact(b.t, { x: PX[p], y: floorY - hStack(p, b.t) - figH * 0.5, shake: 7, r: 30, lines: 8, color: C.red, cue: null })
        addK(p, b.t, PZ.flinch, 0.1, 'out'); addK(p, b.t + 0.8, 'idle', 0.4)
      }
      continue
    }
    const pose = ACT[b.act] || (POSES[b.act] ? b.act : null)
    const p = b.person
    if (b.act === 'sell' || !pose || !(p === 0 || p === 1)) continue
    addK(p, b.t, pose, 0.25)
    // the beat's return pose is skipped when his own cash-out follows (it would land on the sell's wind-up and
    // swallow it; the sell returns him to idle itself)
    const rt = b.t + (b.d ?? 1.4)
    if (sells.some(sl => sl.p === p && sl.t > b.t && sl.t - 0.3 < rt + 0.45)) continue
    addK(p, rt, p === loser && b.t > TW ? (loser === 1 ? PZ.glumBack : PZ.glum) : 'idle', 0.4)
  }
  const tracks = keys.map(k => poseTrack(k))
  const faces = faceK.map(k => track(k.map(x => ({ t: x.t, v: x.v, d: 0.12, e: 'inOut' }))))

  const figGround = (p, t) => {
    let hh = hStack(p, t)
    for (const a of airs[p]) if (t >= a.t0 && t < a.t0 + a.dur) { const q = (t - a.t0) / a.dur; hh = lerp(a.from, a.to, q * q) + 4 * a.boost * q * (1 - q) }
    for (const hp of hops[p]) if (t > hp.t0 && t < hp.t0 + hp.dur) { const q = (t - hp.t0) / hp.dur; hh += 4 * hp.h * q * (1 - q) }
    return floorY - hh
  }
  function drawFig(p, t) {
    const tr = tracks[p]
    const P0 = secondary(tr.at(t), t, { prev: tr.at(t - 0.07) })
    const J = fk(P0, { x: PX[p], ground: figGround(p, t), face: faces[p].at(t), scale: FIGK })
    // never cut by (or crowding) the frame edge, and never over the ledger's labels
    const [ex0, ex1] = figs[p].extentX(J)
    shiftJ(J, Math.max(EDGE - ex0, Math.min(0, X0 - 14 - ex1)))
    let sq = { sx: 1, sy: 1 }
    for (const q of squashes[p]) { const z = squashAt(t, q.t, q.amt); sq = { sx: sq.sx * z.sx, sy: sq.sy * z.sy } }
    figs[p].draw(J, sq)
  }

  // ================================================================== seek
  const DROP = 30, dropDur = Math.sqrt((2 * DROP) / 5200)
  const squashAmt = Math.max(0, Math.min(0.2, 1 - 41 / vp))
  const rowLabelsAtStart = lo.rowLabelsAtStart !== false
  const valColor = (i, p, t) => {
    const sg = SIGN[i][p]
    const fresh = sg > 0 ? C.heroInk : sg < 0 ? C.red : C.ink
    const settled = sg < 0 ? C.red : C.ink
    let c = mix(fresh, settled, prog(t, nextT(i), 0.08))   // the previous cell goes straight to its settled colour
    if (i === last) c = mix(fresh, settled, prog(t, TW + 0.5, 0.4))
    if (p === loser && sg >= 0) c = mix(c, C.grey, prog(t, TW + 0.5, 0.5))
    return c
  }
  const duration = durationOf(spec, lastT + 1.6, d.hold ?? 3)
  // the end frame belongs to the payoff: once the winner's value has landed, the rows in between (all but the
  // first row, the last row and any row a pencil mark rings) settle to 55%
  const focusRows = new Set([0, last, ...marks.map(m => m.i)])
  const labelSettle = rows.map((r, i) => { const pl = pills.find(x => x.i === i && x.tone !== 'neutral'); return pl ? pl.t1 : nextT(i) })
  const endDim = (i, t) => (focusRows.has(i) || N < 4 ? 1 : 1 - 0.45 * E.inOut(prog(t, TW + 0.5, 0.5)))

  function seek(t) {
    // pills first: they dim the future labels they sit on
    const dimUnder = new Map()
    let headDim = 0
    for (const pl of pills) {
      const on = t >= pl.t0 && t < pl.t1 + 0.1
      if (!on) { style(pl.el, { opacity: '0', display: 'none' }); continue }
      const pp = popIn(t, pl.t0, 0.24, pl.from)
      const out = 1 - prog(t, pl.t1, 0.1)
      const sq = squashAt(t, pl.t0 + 0.12, pl.sq)
      style(pl.el, {
        display: '',
        transform: `translate(${pl.box.x0.toFixed(1)}px,${(pl.box.y0 - 14 * (1 - out)).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
        opacity: (pp.opacity * out).toFixed(3),
      })
      const vis = pp.opacity * out
      for (const j of pl.under) dimUnder.set(j, Math.max(dimUnder.get(j) || 0, vis))
      if (pl.overHeads) headDim = Math.max(headDim, vis)
    }
    for (const el of heads) style(el, { opacity: (1 - headDim).toFixed(3) })          // gone, never a ghost
    for (let i = 0; i < N; i++) {
      const row = R[i], Ti = landT[i]
      const reach = prog(t, Ti - 0.2, 0.2)
      const tn = rows[i].tone && rows[i].event ? rows[i].tone : null
      // a loss row's label stays red (its cells do); a good row's label is green only while its pill is up, then
      // settles to ink like its cells (one green on screen at a time: the newest cell)
      const lc = tn === 'bad' ? C.red : tn === 'good' ? mix(C.heroInk, C.ink, prog(t, labelSettle[i], 0.25)) : C.ink
      const ghost = rowLabelsAtStart ? 1 : reach
      // a label under a pill is gone while the pill is up (it comes back as the pill closes)
      const fade = endDim(i, t)
      row.label.set({ x: X0, y: boxBottom(i, yp), color: mix(C.dim, lc, reach), opacity: ghost * fade * (1 - clamp(3 * (dimUnder.get(i) || 0))) })
      const isPlateRow = i === last && plateOn
      const f = t >= Ti - dropDur ? Math.max(0, DROP - 0.5 * 5200 * Math.pow(Math.min(t, Ti) - (Ti - dropDur), 2)) : DROP
      const fy = t >= Ti ? 0 : f
      for (let p = 0; p < 2; p++) {
        const plateVal = isPlateRow && p === winner
        const sq = squashAt(t, Ti, (plateVal ? 0.6 : 1) * squashAmt)
        let sc = plateVal ? HLS : 1
        for (const m of rings) if (m.i === i && m.p === p) sc *= 1 + 0.1 * bump(t, m.t, 0.34)   // a marked cell pops
        row.vals[p].set({
          x: xCol[p], y: boxBottom(i, vp) - fy, sx: sc * sq.sx, sy: sc * sq.sy,
          opacity: fade * (t >= Ti - dropDur ? clamp((t - (Ti - dropDur)) / 0.03) : 0),
          color: plateVal ? C.ink : valColor(i, p, t),
        })
      }
      if (isPlateRow && plate) {
        // the plate opens from its centre just before the number lands (>= 90% open by the time the number shows),
        // so the number lands on a whole plate
        const t0 = Ti - dropDur - 0.07
        const pp = popIn(t, t0, 0.24, 0.6)
        const sq = squashAt(t, Ti, 0.6 * squashAmt)
        style(plate, {
          transform: `translate(${pb.x.toFixed(1)}px,${pb.y.toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
          opacity: t < t0 ? '0' : '1',
        })
      }
      attr(shelves[i], 'opacity', String(+(1 - 0.55 * prog(t, Ti, 0.4)).toFixed(3)))
    }
    for (let p = 0; p < 2; p++) drawStack(p, hStack(p, t), t)
    for (const m of rings) {
      const on = t >= m.t && t < m.end + 0.2
      attr(m.el, 'opacity', on ? (1 - prog(t, m.end, 0.2)).toFixed(3) : '0')
      attr(m.el, 'stroke-dashoffset', (m.len * (1 - E.out(prog(t, m.t, 0.28)))).toFixed(1))
    }
    if (showFig) for (let p = 0; p < 2; p++) drawFig(p, t)
    for (const db of debris) {
      if (t < db.t0 || t >= db.tEnd + 0.3) { db.c.set({ opacity: 0 }); continue }
      const [x, y, rr] = toss(t, db.t0, db.p0, db.v, { r: db.r, g: 3200, e: 0.38, friction: 0.35, n: 3 })
      // gone: a quick shrink and fade where it lies
      const q = prog(t, db.tEnd, 0.3), r = db.r * (1 - 0.45 * q)
      db.c.set({ x, y: y + (db.r - r), r, rot: rr * 57, opacity: 1 - q, spin: 0.2 * Math.abs(Math.sin(rr)) })
    }
    for (const ry of plateRays) {
      const dt = t - TW, on = dt >= 0 && dt < 0.26
      attr(ry.el, 'opacity', on ? String(+(1 - E.inQuad(prog(dt, 0, 0.26))).toFixed(3)) : '0')
      const pq = on ? E.out(prog(dt, 0, 0.22)) : 0
      const r0 = ry.len * (0.05 + 0.45 * pq), r1 = ry.len * (0.3 + 0.7 * pq)
      const c = Math.cos(ry.a), sn = Math.sin(ry.a)
      attr(ry.el, 'x1', (ry.x + c * r0).toFixed(1)); attr(ry.el, 'y1', (ry.y + sn * r0).toFixed(1))
      attr(ry.el, 'x2', (ry.x + c * r1).toFixed(1)); attr(ry.el, 'y2', (ry.y + sn * r1).toFixed(1))
    }
    const { shake, zoom } = fxk.seek(t)
    // the punch zooms about the plate's right half, so the ledger's right edge stays clear of the button rail
    const fx = pb.cx + pb.w / 4
    cam.set({ fx, fy: pb.cy, x: fx, y: pb.cy, zoom, shake: [clamp(shake[0], -SHAKE_X, SHAKE_X), shake[1]] })
  }

  return { duration, seek }
}
