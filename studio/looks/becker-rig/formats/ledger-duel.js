// becker-rig · ledger-duel (FORMATS.md §7): same stake, two choices side by side, a year-by-year ledger that fills
// both columns at once, often a crash row mid-way, then the winner.
//
// The duel is physical. On the left, two coin stacks stand side by side on the floor, one per person, each with
// its owner standing on top (green = the hero / winner-to-be, slate = the rival). Stack height is the money, on one
// honest linear scale shared by both, so the taller stack is always the richer person. On the right, the ledger:
// a right-aligned table (label | person A | person B) that builds bottom-up from the floor like the flagship's
// ladder, every label dim from frame 1, each row's two values dropping onto their dotted shelf together.
//
//   gain   the stack springs up under its owner (he rides it, knees giving); the value lands green
//   dip    a small loss: the stack sinks, he bends with it; the value lands red
//   crash  a big loss (>= 12%, or any loss on a "bad" row): an impact on the stack (red hit lines, shake, `hit`),
//          the lost coins burst off the top and roll to the floor (they stay there), he is blown up off the stack
//          and lands squashed on what is left, then slumps; the other one flinches and turns to look
//   lead   when the lead changes, the new leader pumps a fist
//   event  the row's event text pops as a pill right above the row (tone colour) until the next row lands;
//          the row label keeps the tone colour
//   final  the winner's last value lands on a gold plate (impact + camera punch + `cash`); the winner hops and
//          celebrates on the taller stack, then points at the ledger; the loser slumps (the right-hand one turns his
//          back on the ledger) and his column settles grey
// "Less is better" duels (debt: the winner ends LOWER) draw the stacks as red debt piles and flip the colours:
// paying down is green, nothing crashes. Row 0 is the start, never a crash.
//
// Layout (all measured at mount): values 64 → 40 px, labels ~0.8 of that, names 48 px, plans 40 px. When the rows
// do not fit, the fitter scores the alternatives and keeps the best: drop the stake line, drop the headroom for a
// last-row event (its pill then covers the column heads for 2.4 s, which dim), move long plans into a full-width
// legend ("● Name  plan", one line each, heads keep "● Name"), and as a last resort 36-38 px values (warns).
// The figures stand left of the ledger, so the tallest stack is capped to keep them under the stake line / legend.
//
// lookOpts (all optional; it renders fully without them):
//   figure: false                     no figures (the stacks still grow and get knocked down)
//   figureScale: 0.8                  size of the figures
//   figures: [{ person, color }]      'hero' | 'neutral' (slate) | 'ink'. Default: winner hero, other neutral
//   rowLabelsAtStart: false           hide the dim future labels (rows appear as they land)
//   stake: false                      hide the stake line under the footer
//   keyLabel: 'Year'                  a head over the label column
//   beats: [{ t, act, person, targets, d }]   extra acting: act = a POSES name (or cheer | peek) for `person`
//                                     (held d = 1.4 s), or 'impact' on `targets` (skipped where a crash already hits)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup, rng,
  C, F, L, E, RIG, POSES, poseTrack, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj,
  chromeParts, durationOf, num, measure, squashAt, popIn, toss, tossHit, coin, springStep, track,
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
.ld-plate { position: absolute; left: 0; top: 0; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 18px; transform-origin: 100% 50%; }
.ld-pill { position: absolute; left: 0; top: 0; box-sizing: border-box; padding: 0 20px; border-radius: 16px; border: 5px solid; background: ${C.white};
  font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; white-space: nowrap; transform-origin: 50% 100%; }
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
  lifted: { lean: -4, tilt: -14, aF: [62, 18], aB: [-62, -18], lF: [12, -4], lB: [-12, -4] },    // riding up, arms out
  pump:   { lean: 4, tilt: -14, aF: [164, -26], aB: [-52, -22], lF: [12, -6], lB: [-12, -3] },
  flinch: { lean: -14, tilt: -10, aF: [76, 92], aB: [-34, 64], lF: [16, -12], lB: [-16, -8] },
  squash: { lean: 6, tilt: 16, aF: [80, 24], aB: [-80, -24], lF: [62, -122], lB: [-38, -84] },   // landed hard, arms out
  down:   { lean: 18, tilt: 30, aF: [4, 10], aB: [-4, 8], lF: [16, -34], lB: [-6, -30] },         // dazed: bent over, arms hanging
  sink:   { lean: 8, tilt: 10, aF: [10, 14], aB: [-12, 12], lF: [24, -40], lB: [-6, -36] },
  look:   { lean: -2, tilt: -18, aF: [130, 96], aB: [-14, 16], lF: [10, -4], lB: [-12, -3] },      // hand over eyes
  glum:   { lean: 8, tilt: 34, aF: [6, 6], aB: [-6, 6], lF: [10, -16], lB: [-6, -12] },           // dejected, upright
}
const ACT = { cheer: 'celebrate', peek: PZ.look, look: PZ.look }

const EVENT_PAUSE = 1.2       // default pacing: extra pause after an event row (when rows carry no "t")
const AIR = 0.42              // crash: time in the air before he lands on what is left
const SLAB = 15               // coin thickness in a stack (px)

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
  const PW = 66, PG = 18, PL = 36
  const PX = [PL + PW / 2, PL + PW + PG + PW / 2]       // stack centres (decoration may sit left of x 60)
  const X0 = PL + 2 * PW + PG + 30                      // left edge of the ledger
  const XR = 922                                        // right edge of the last column (x <= 940 below y 820)
  const floorY = L.floorY
  const GAP = 13                                        // text baseline sits this far above its shelf
  const HLS = 1.06, PLATE = [14, 8]
  const fnt = (w, px) => `${w} ${px}px ${F.head}`
  const wVal = (str, px) => measure(str, fnt(900, px), { letterSpacing: '-0.03em' })
  const wLab = (str, px) => measure(str, fnt(800, px), { letterSpacing: '-0.02em' })
  const mW = (str, font, ls) => measure(str, font, { letterSpacing: ls })

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

  // legend (fallback for long plans): one line per person, "● Name  plan", full width under the stake line
  let legEls = [], legH = 0, legH1 = 0
  if (people.some(x => x.plan)) {
    legEls = [0, 1].map(p => {
      const el = h('div', { class: 'ld-leg' })
      el.innerHTML = `<i style="background:${pal[p].fig}"></i><b style="color:${pal[p].text}">${esc(nameOf(p))}</b>${esc(plain(people[p].plan || ''))}`
      fixed.append(el)
      return el
    })
    if (!fixed.parentNode) ctx.stage.append(fixed)
    legH = legEls.reduce((a, el) => a + el.offsetHeight, 0) + 6
    legH1 = legEls.length * 46 + 6                       // one line each, the plan cut with an ellipsis (last resort)
  }

  function wrap(text, font, ls, maxW) {
    const words = String(text).split(/\s+/).filter(Boolean)
    const lines = []
    let cur = ''
    for (const w of words) {
      const next = cur ? cur + ' ' + w : w
      if (!cur || mW(next, font, ls) <= maxW + 0.5) cur = next
      else { lines.push(cur); cur = w }
    }
    if (cur) lines.push(cur)
    const ws = lines.map(l => mW(l, font, ls))
    return { lines, w: Math.max(0, ...ws), over: ws.some(x => x > maxW + 0.5) }
  }

  const pillPx = 42, pillH = 50 + 10                    // 42 px text on a 50 px line + 2 x 5 px border
  const keyLabel = lo.keyLabel ? String(lo.keyLabel) : ''
  // one candidate layout: value size vp + config { st: stake line, hr: headroom for a last-row event, pl: plan lines }
  function tryLayout(vp, cf) {
    const yp = Math.min(vp, clamp(Math.round(vp * 0.8), 40, 52))   // vp < 40 only as the last resort (warns)
    const yW = Math.max(...rows.map(r => wLab(String(r.label ?? ''), yp)), keyLabel ? mW(keyLabel.toUpperCase(), fnt(800, 40), '.07em') : 0)
    const vW = [0, 1].map(p => Math.max(...rows.map((r, i) => {
      const w = wVal(r.values[p], vp)
      return i === last && p === winner && plateOn ? w * HLS + PLATE[0] : w
    })))
    const G = 32
    const need = yW + G + vW[0] + G + vW[1]
    if (X0 + need > XR) return null
    const slack = XR - X0 - need
    const xYear = X0 + yW, xB = XR
    // where the A column ends inside the slack: the split that wraps the heads into the fewest lines
    let best = null
    for (const f of [0.5, 0.35, 0.65, 0.2, 0.8, 0, 1]) {
      const xA = xYear + G + vW[0] + slack * f
      const headW = [xA - (keyLabel ? xYear + 24 : X0), xB - xA - 26]
      const names = [0, 1].map(p => {
        for (let px = 48; px >= 40; px -= 2) { const w = mW(nameOf(p), fnt(900, px), '-0.02em') + px * 0.6 + 12; if (w <= headW[p]) return { px, w } }
        // with the legend on screen (it names both people), a head too narrow for the name keeps only its dot
        if (cf.lg) return { px: 40, w: 30, dotOnly: true }
        return { px: 40, w: Infinity }
      })
      const plans = [0, 1].map(p => (people[p].plan && !cf.lg ? wrap(plain(people[p].plan), fnt(700, 40), '-0.01em', headW[p]) : { lines: [], w: 0, over: false }))
      if (names.some((n, p) => n.w > headW[p] + 0.5) || plans.some(x => x.over)) continue
      const nl = Math.max(...plans.map(x => x.lines.length))
      if (!best || nl < best.nl) best = { xA, names, plans, nl }
    }
    if (!best || best.nl > cf.pl) return null
    // heads that kept only their dot need just the dot's height
    const nameLH = best.names.every(n => n.dotOnly) ? 30 : Math.max(...best.names.map(n => n.px)) + 4
    const headH = nameLH + best.nl * 46
    // vertical: rows from the floor up; heads just above the top row (and the stake line above them)
    const legTop = top0 + (cf.st ? stakeH + 18 : 0)
    const top = legTop + (cf.lg ? (cf.lg === 1 ? legH1 : legH) + 18 : cf.st ? 4 : 0)
    const rowNeed = 1.2 * Math.max(vp, yp) + 1
    const topExtra = plateOn ? 0.97 * vp * HLS + PLATE[1] + 8 : 0.97 * vp
    const headroom = cf.hr ? pillH + 14 : 0
    const shelf0 = floorY - 16
    const avail = N > 1 ? (shelf0 - GAP - topExtra - headroom - (top + headH + 20)) / (N - 1) : 999
    if (avail < rowNeed) return null
    const pitch = Math.min(avail, Math.max(rowNeed + 26, 1.9 * vp))
    return { vp, yp, yW, vW, xYear, xA: best.xA, xB, names: best.names, plans: best.plans, nameLH, headH, pitch, shelf0, topExtra, headroom, top, legTop, cf }
  }
  // score every config by its best value size; the stake line and the last-row headroom are worth a few px
  let lay = null
  for (const st of stakeEl ? [true, false] : [false]) for (const hr of rows[last].event ? [true, false] : [false])
  for (const [pl, lg] of legEls.length ? [[2, false], [3, false], [0, true], [0, 1]] : [[2, false]]) {
    for (let vp = 64; vp >= 36; vp -= 2) {
      const l = tryLayout(vp, { st, hr, pl, lg })
      if (!l) continue
      l.score = vp + (st ? 8 : 0) + (hr ? 4 : 0) - (pl === 3 ? 5 : 0) - (lg ? 4 : 0) - (lg === 1 ? 10 : 0) - (vp < 40 ? 12 : 0)
      if (!lay || l.score > lay.score) lay = l
      break
    }
  }
  if (!lay) throw new Error('ledger-duel: the rows do not fit (too many rows, or values/labels too wide)')
  if (stakeEl && !lay.cf.st) { stakeEl.remove(); stakeEl = null }
  if (lay.cf.lg) {
    let y = lay.legTop
    legEls.forEach((el, p) => {
      if (lay.cf.lg === 1) {
        // one line: the plan is cut at a word (or a letter) and ends with an ellipsis, measured, never CSS-clipped
        el.classList.add('one')
        const head = `<i style="background:${pal[p].fig}"></i><b style="color:${pal[p].text}">${esc(nameOf(p))}</b>`
        let plan = plain(people[p].plan || '')
        el.innerHTML = head + esc(plan)
        while (plan.length > 1 && el.scrollWidth > 878) { plan = plan.slice(0, -1).trimEnd(); el.innerHTML = head + esc(plan) + '…' }
      }
      style(el, { top: y + 'px' }); y += el.offsetHeight + 6
    })
  }
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
      + `<i style="width:${dot}px;height:${dot}px;margin-right:${nm.dotOnly ? 0 : 12}px;vertical-align:${Math.round(nm.px * 0.02)}px;background:${pal[p].fig}"></i>${nm.dotOnly ? '' : esc(plain(people[p].name || ''))}</div>`
      + lay.plans[p].lines.map(l => `<div class="ld-plan">${esc(l)}</div>`).join('')
    fixed.append(el)
    style(el, { top: headTop + 'px', left: (xCol[p] - el.offsetWidth).toFixed(1) + 'px' })
    heads.push(el)
  }
  if (keyLabel) {
    const el = h('div', { class: 'ld-key' }, keyLabel)
    fixed.append(el)
    heads.push(el)
    style(el, { top: (headTop + lay.headH - 46) + 'px', left: (xYear - el.offsetWidth).toFixed(1) + 'px' })
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
      label: new NumObj(world.html, { cls: 'ld-label', text: String(r.label ?? ''), ax: 1, ay: 1, style: { fontSize: yp + 'px' } }),
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

  // event pills: right above their row, in the slot the next row will land in; gone before it lands
  const pills = []
  rows.forEach((r, i) => {
    if (!r.event) return
    const tn = r.tone && TONE_C[r.tone] ? r.tone : 'neutral'
    const el = h('div', { class: 'ld-pill' })
    el.innerHTML = markup(String(r.event))
    world.html.append(el)
    let px = pillPx
    const maxW = XR - X0
    style(el, { fontSize: px + 'px', lineHeight: '50px', color: TONE_C[tn], borderColor: tn === 'goal' ? C.ink : TONE_C[tn], background: tn === 'goal' ? C.coin : C.white })
    while (px > 36 && el.offsetWidth > maxW) { px -= 2; style(el, { fontSize: px + 'px' }) }
    const w = el.offsetWidth, ph = el.offsetHeight
    const bottom = rowTop(i) - 8
    const cx = Math.min(XR - w / 2, Math.max(X0 + w / 2, (X0 + XR) / 2))
    const box = { x0: cx - w / 2, x1: cx + w / 2, y0: bottom - ph, y1: bottom }
    // dim future labels the pill would sit on
    const under = []
    for (let j = i + 1; j < N; j++) {
      const ly0 = boxBottom(j, yp) - yp, ly1 = boxBottom(j, yp)
      if (ly1 > box.y0 - 2 && ly0 < box.y1 + 2) under.push(j)
    }
    const t0 = times[i] + 0.06
    // the last row's pill stays for good when the layout kept headroom for it; otherwise it sits over the
    // column heads (they dim) for a couple of seconds
    const overHeads = i === last && !lay.cf.hr
    const t1 = i < last ? Math.max(t0 + 0.3, nextT(i) - 0.32) : overHeads ? t0 + 2.4 : Infinity
    pills.push({ i, el, box, w, ph, t0, t1, under, overHeads, tone: tn, from: Math.max(0.86, 41 / px) })
  })

  // ---- coin stacks: edge-on coins, height = money on one shared scale
  const figH = (2 * RIG.headR + RIG.neck + RIG.torso + RIG.thigh + RIG.shin) * FIGK
  // the figures stand left of the ledger, under everything that starts at the left margin (stake line, legend)
  const leftBottom = lay.cf.lg ? lay.top - 18 : stakeEl ? stakeBottom : parts.workTop - 28
  const topClear = leftBottom + 16
  const H_MAX = Math.max(160, floorY - topClear - figH * 1.12 - 26)
  const maxV = Math.max(1, ...V.flat(), ...startV)
  const scale = H_MAX / maxV
  const HV = V.map(r => r.map(v => Math.max(0, v) * scale))
  const h0 = startV.map(v => Math.max(0, v) * scale)
  const nSlab = Math.ceil(H_MAX / SLAB) + 3
  const stacks = [0, 1].map(p => {
    const sg = s('g', { 'data-deco': '' })
    const rnd = rng(31 + p * 17)
    const slabs = []
    for (let k = 0; k < nSlab; k++) {
      const jx = (rnd() - 0.5) * 6
      // money is a coin stack; in a "less is better" duel the stack is debt: a red pile
      const el = s('rect', { x: (PX[p] - PW / 2 + jx).toFixed(1), width: PW, height: SLAB, rx: SLAB / 2 - 0.5,
        fill: lessIsBetter ? C.redSoft : C.coin, stroke: lessIsBetter ? C.red : C.ink, 'stroke-width': 3.5 })
      sg.append(el)
      slabs.push(el)
    }
    g.mid.append(sg)
    return { sg, slabs }
  })
  function drawStack(p, hh) {
    const n = hh < 0.5 ? 0 : Math.ceil(hh / SLAB - 1e-6)
    const sl = stacks[p].slabs
    for (let k = 0; k < sl.length; k++) {
      const on = k < n
      style(sl[k], { display: on ? '' : 'none' })
      if (!on) continue
      const top = k < n - 1 ? floorY - (k + 1) * SLAB : floorY - hh
      attr(sl[k], 'y', top.toFixed(1))
      attr(sl[k], 'height', (k === n - 1 ? Math.min(SLAB, hh) : SLAB).toFixed(1))
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
      // the lost coins burst off the top and roll to the floor in front of the stacks
      const rnd = rng(400 + i * 13 + p * 7)
      const cnt = clamp(Math.round((a.from - a.to) / SLAB) + 3, 4, 9)
      for (let k = 0; k < cnt; k++) {
        const cr = 14 + rnd() * 6
        const y0 = floorY - lerp(a.to, a.from, (k + 0.5) / cnt)
        const p0 = [PX[p] + (rnd() - 0.5) * 30, y0]
        const vy = -(380 + rnd() * 320)
        const target = p === 0 ? lerp(-26, PX[0] - PW / 2 - 4, rnd()) : (k % 2 ? lerp(PX[1] - PW / 2 - PG + 2, PX[1] - PW / 2 - 4, rnd()) : lerp(PX[1] + PW / 2 + 6, X0 - 18, rnd()))
        const tHit = tossHit(Ti, p0, [0, vy], { g: 3200, floor: floorY, r: cr })
        const vx = (target - p0[0]) / Math.max(0.1, tHit - Ti)
        debris.push({ c: coin(g.front, { r: cr, text: '' }), t0: Ti + k * 0.012, p0, v: [vx, vy], r: cr, i })
      }
    })
    if (i === last && plateOn) {
      fxk.impact(Ti, { x: pb.cx, y: pb.cy, shake: 13, punch: 0.025, rx: pb.w / 2 + 14, ry: pb.h / 2 + 12, r: 44, lines: 13, cue: 'hit', gain: 0.95 })
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

  // ================================================================== figures
  const showFig = lo.figure !== false
  const figs = showFig ? [0, 1].map(p => new Figure(g.fig, { scale: FIGK, color: pal[p].fig })) : []
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
  for (let i = 1; i < N; i++) {
    const Ti = times[i]
    for (let p = 0; p < 2; p++) {
      const k = KIND[i][p], ko = KIND[i][1 - p], sg = SIGN[i][p]
      const back = (tt, pose = 'idle', dd = 0.4) => { if (tt < nextT(i) - 0.12) addK(p, tt, pose, dd) }
      if (k === 'crash') {
        addK(p, Ti - 0.02, 'shocked', 0.08, 'out')
        addK(p, Ti + AIR - 0.04, PZ.squash, 0.07, 'out')
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
    // the loser: the right-hand one turns his back on the ledger and slumps; the left-hand one droops in place
    // (a forward slump would put his head on the ledger labels)
    const away = l === 1
    const glum = away ? 'slump' : PZ.glum
    if (KIND[last][l] !== 'crash') addK(l, TW + 0.45, glum, 0.4)
    faceK[l].push({ t: TW + 0.4, v: away ? -1 : 1 })
    const vt = spec.verdict && spec.verdict.t
    if (vt != null && vt > TW + 1.8) {
      addK(w, vt, 'celebrate', 0.2)
      addK(w, vt + 1.1, 'point', 0.3)
      addK(l, vt + 0.1, 'shrug', 0.25)
      addK(l, vt + 1.0, glum, 0.4)
    }
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
    if (!pose || !(p === 0 || p === 1)) continue
    addK(p, b.t, pose, 0.25)
    addK(p, b.t + (b.d ?? 1.4), p === loser && b.t > TW ? (loser === 1 ? 'slump' : PZ.glum) : 'idle', 0.4)
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
    let c = mix(fresh, settled, prog(t, nextT(i), 0.3))
    if (i === last) c = mix(fresh, settled, prog(t, TW + 0.5, 0.4))
    if (p === loser && sg >= 0) c = mix(c, C.grey, prog(t, TW + 0.5, 0.5))
    return c
  }
  const duration = durationOf(spec, lastT + 1.6, d.hold ?? 3)

  function seek(t) {
    // pills first: they dim the future labels they sit on
    const dimUnder = new Map()
    let headDim = 0
    for (const pl of pills) {
      const on = t >= pl.t0 && t < pl.t1 + 0.1
      if (!on) { style(pl.el, { opacity: '0', display: 'none' }); continue }
      const pp = popIn(t, pl.t0, 0.24, pl.from)
      const out = 1 - prog(t, pl.t1, 0.1)
      const sq = squashAt(t, pl.t0 + 0.12, 0.08)
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
      const lc = tn === 'bad' ? C.red : tn === 'good' ? C.heroInk : C.ink
      const ghost = rowLabelsAtStart ? 1 : reach
      row.label.set({ x: xYear, y: boxBottom(i, yp), color: mix(C.dim, lc, reach), opacity: ghost * (1 - 0.9 * clamp(3 * (dimUnder.get(i) || 0))) })
      const isPlateRow = i === last && plateOn
      const f = t >= Ti - dropDur ? Math.max(0, DROP - 0.5 * 5200 * Math.pow(Math.min(t, Ti) - (Ti - dropDur), 2)) : DROP
      const fy = t >= Ti ? 0 : f
      for (let p = 0; p < 2; p++) {
        const plateVal = isPlateRow && p === winner
        const sq = squashAt(t, Ti, (plateVal ? 0.6 : 1) * squashAmt)
        const sc = plateVal ? HLS : 1
        row.vals[p].set({
          x: xCol[p], y: boxBottom(i, vp) - fy, sx: sc * sq.sx, sy: sc * sq.sy,
          opacity: t >= Ti - dropDur ? clamp((t - (Ti - dropDur)) / 0.03) : 0,
          color: plateVal ? C.ink : valColor(i, p, t),
        })
      }
      if (isPlateRow && plate) {
        const pp = popIn(t, Ti - 0.01, 0.3, 0.55)
        const sq = squashAt(t, Ti, 0.6 * squashAmt)
        style(plate, {
          transform: `translate(${pb.x.toFixed(1)}px,${(pb.y - fy * 0.5).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
          opacity: t < Ti - 0.01 ? '0' : '1',
        })
      }
      attr(shelves[i], 'opacity', String(+(1 - 0.55 * prog(t, Ti, 0.4)).toFixed(3)))
    }
    for (let p = 0; p < 2; p++) drawStack(p, hStack(p, t))
    if (showFig) for (let p = 0; p < 2; p++) drawFig(p, t)
    for (const db of debris) {
      if (t < db.t0) { db.c.set({ opacity: 0 }); continue }
      const [x, y, rr] = toss(t, db.t0, db.p0, db.v, { r: db.r, g: 3200, e: 0.38, friction: 0.35, n: 3 })
      db.c.set({ x, y, r: db.r, rot: rr * 57, opacity: x < -db.r ? 0 : 1, spin: 0.2 * Math.abs(Math.sin(rr)) })
    }
    const { shake, zoom } = fxk.seek(t)
    cam.set({ fx: pb.cx, fy: pb.cy, x: pb.cx, y: pb.cy, zoom, shake })
  }

  return { duration, seek }
}
