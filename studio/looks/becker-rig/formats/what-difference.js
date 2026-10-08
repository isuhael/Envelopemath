// becker-rig · what-difference (FORMATS.md §3, hook P5): one fixed debt handled 2-4 ways. "Guess which one."
//
// The debt is a crate, and the crate is the clock. Every option gets a lane: a floor line, the figure behind the
// same crate on the start line, and a title row above (the option's name and behaviour on the left, dim until its
// turn; its money result on the right, under a column head). The lane is a TIME axis shared by every lane: the crate
// travels as many months as the option takes to pay off, so the longest payoff reaches the far side (a dashed guide
// in every lane) and the winning lane's flag is the nearest: it got to "paid off" first.
//   Frame 1  the question: every lane named, every crate on its start line showing "?", the money slots empty
//            (dashed sockets), the stake in the working slot under the footer. Options with t <= 0 (or a resultT
//            <= 0) are already run: crate at its flag with its payoff on it, money in, coin pile full. The waiting
//            figures stand hand on chin, with a nod in the first second.
//   A run    at option.t the lane wakes (its name to ink, `step`) and he leans in, hands on the crate; on a long
//            lead-in (resultT well after t) he strains against it, wobbling, and it trembles but holds, until it
//            gives. Then he drives it along the lane, bent low, feet stepping on the floor, hands pinned to the
//            crate by 2-bone IK (`swipe` on the push-off, a `roll` under the run). The crate's face counts the
//            months up as it goes (grey digits, never the "≈"). Every few strides an interest coin flies off the
//            crate onto the lane's pile under the money column (pile height = that money value, one honest scale for
//            every lane). A flag drops in where the debt is gone, the crate slams into its pole (`thud`, squash, the
//            pole wobbles), turns from red (debt) to green (paid) and its face lands on the payoff's display
//            string. The money value then drops onto the title row (`pop`); a delta swaps in for the behaviour
//            (`pop`); he catches his breath, hands on knees, and reacts by tone (bad: slump; neutral: shrug; good and
//            goal: a fist pump).
//   Colour   the newest money value is green (heroInk) and settles to ink (a `bad` option's to red) when the next
//            lane lands: one focal number at a time. Crate faces are always ink (on red, green or gold).
//   Winner   at data.winnerT (default verdict.t): a gold plate opens behind the winner's money value (impact: hit
//            lines, shake, a 2% punch about it, `hit` + `cash`), its crate and pennant turn gold and its figure
//            jumps and celebrates (arms up when nothing readable is above him, else a fist pump); the others slump,
//            turn slate and their values settle grey. The chrome's verdict lands in the caption band (its `ding` is
//            skipped when it would land on the winner's hit).
//
// Nothing on screen is computed: every number is a spec display string; the crate's running counter lands exactly
// on its string, and so does a counted money value. Months are read out of the payoff strings only to place the
// crates ("≈ 4.8 years" = 57.6 months; a bare "72" takes its unit from the metric label, else months).
//
// Layout (measured at mount): the working slot (1-2 mono lines) under the footer, then the heads row (the crate
// metric as a legend over the start line: a little crate + its label; the money metric right-aligned over its
// column), then the lanes, bottom-up from the kit's floor line at y 1300. A lane is a title row (name 44 → 40 px,
// behaviour mono 40 px beside it or under it, the money value 64 → 44 px right-aligned at x 922) over a track band
// the figure fits in bent over: he only stands tall in the start gutter, where nothing is written above him, so his
// size comes from the band (4 lanes under a 3-line hook: ~0.4; 3 lanes ~0.55; 2 lanes 0.8). The crate is as tall as
// the band allows under the money column (its pennant stays clear of the value), its face 41-60 px. The fitter
// tries every money size, name size and one- or two-line titles and keeps the best of big money, a big figure and a
// big crate face; with long behaviours it moves them under the name, then drops them (the working lines carry them).
//
// data: FORMATS.md §3 exactly: stake { label, value, terms }, metrics [{ key, label }] (the first time-like one is
// the crate's; the first money one the title row's and the coin pile's; with no money metric the second metric
// takes the column and there is no pile), options [{ t, name, detail, values, delta?, tone? }] (2-4), winner,
// hold. Also read when present (other kits' extensions):
//   option.resultT   when that option's payoff lands (the run is timed to end there; <= 0: already run at frame 1)
//   option.valueEvery / data.valueEvery   gap between the payoff landing and the money value (default 0.45 s)
//   option.deltaT    when the delta swaps in (default 0.55 s after the money value)
//   option.note, option.noteT   a working line shown at noteT (default: when the money value lands)
//   data.winnerT     when the winner is crowned (default verdict.t, else 1.2 s after the last value)
//
// lookOpts (all optional; it renders fully without them):
//   formulas: [string | { t, text }]  a working line per option, shown in the slot from that option's t (a pre-run
//                       option's from its first `reads` time, else 2 s). "\n" breaks the line; numbers print in ink,
//                       `**x**` in green. The slot holds one line at a time and keeps it until the next one
//   steps: [{ t, text }]   extra working lines (the difference the VO speaks: "= $10,000 − $8,900\n≈ $1,100 less")
//   lever: { t, text, options: [i, j] }   the line that explains WHY: shown in the slot at t; the listed lanes'
//                       money values get a pale green band, their crates pulse and their figures nod (`swipe`),
//                       until the next slot line (3.6 s at most)
//   reads: [{ t, option, metric }]   the VO reads a result already on screen: that value (or crate, for the crate's
//                       metric) bumps 12% and the value flashes green (`tick`). option may be a list ([1, 2]: they
//                       flash together); metric = a metric key or 'delta'
//   scan: { t, every = 0.4, options }   "guess which one": from t the waiting lanes' figures hop in turn (`tick`)
//   countCell: { option, metric, from: 'base' | number }   the money value counts from the first option's value (or
//                       `from`) to its display over 0.8 s as it lands, then settles from 110% (may be a list; the
//                       crate's metric always counts)
//   stakeLine: false | string   the slot's frame-1 line (default "label · value · terms"; the value is left out when
//                       the hook already shows it)
//   heads: 'upper' | 'sentence' | false   heads style (default upper caps, sentence case when caps do not fit)
//   pile: false         no coin piles (no flying coins either)
//   race: 1.8           seconds the longest run takes (every run moves at that one speed; each >= 0.6 s)
//   figure: false       no figures (the crates slide by themselves)
//   figureScale: 0.5    the figure's size (capped by the band)
//   endPose: 'celebrate' | 'point' | 'pump'   the winner's pose after his jump (default celebrate when there is
//                       head room above him, else a low fist pump)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup,
  C, F, E, POSES, blendPose, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj, pinLimb,
  chromeParts, durationOf, numLike, fmtLike, measure, squashAt, fall, popIn, bump, hop, wobble, mix, mixOk, smooth,
} from '../lib.js'

const BAND = '#E6F6EE'      // lever band: a paler hero tint (heroInk text on it stays >= 3.5:1)

export const css = `
.wd-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.wd-slot { position: absolute; left: 62px; width: 878px; font: 700 40px/48px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; text-wrap: balance; transform-origin: 0 50%; }
.wd-slot b { color: ${C.ink}; font-weight: 800; }
.wd-slot .op { font-family: 'Inter Full', 'Inter', sans-serif; font-weight: 700; }
#stage .wd-slot em { font-style: normal; color: ${C.heroInk}; font-weight: 800; }
.wd-head { position: absolute; font: 800 40px/44px ${F.head}; letter-spacing: .07em; text-transform: uppercase; color: ${C.grey}; white-space: nowrap; }
.wd-head.r { text-align: right; }
.wd-head.two { white-space: normal; text-wrap: balance; }
.wd-head.sent { text-transform: none; letter-spacing: -0.01em; }
.wd-name { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; }
.wd-det { font-family: ${F.mono}; font-weight: 700; font-size: 40px; line-height: 48px; letter-spacing: -0.03em; color: ${C.grey}; }
.wd-val { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; word-spacing: 0.14em; }
.wd-delta { font-family: ${F.head}; font-weight: 800; font-size: 40px; line-height: 48px; letter-spacing: -0.01em; word-spacing: 0.1em; }
.wd-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 16px; transform-origin: 50% 50%; }
.wd-band { position: absolute; left: 0; top: 0; background: ${BAND}; border-radius: 14px; transform-origin: 50% 50%; }
.wd-crate-t { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.02em; word-spacing: 0.12em; }
.wd-glyph { position: absolute; overflow: visible; }
`

// ------------------------------------------------------------------------------------------------- constants
const XR = 922            // right edge of the money column (x <= 940 below y 820, with room for a shake)
const NAME_GAP = 28       // between the title (name + behaviour) and the money value
const FLOOR = 1300        // the last lane's floor = the kit's floor line
const PUSH_H = 206        // his height bent over the crate at scale 1 (with the stroke and the run's bob)
const STAND_H = 276       // standing, at scale 1
const S_MIN = 0.36, S_MAX = 0.8
const P_MAX = 300         // the most a lane is ever given (2 lanes): the rest stays above, under the slot
const KMAX = 7            // coins thrown by the most expensive lane
const SLOT_LH = 48
const PILE_RX = 23, PILE_RY = 7
const PILE_X = XR - PILE_RX     // the coin pile stands at the right edge, under the money value

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const TONE_TXT = { bad: C.red, good: C.heroInk, goal: C.ink, neutral: C.ink }

// local poses (lib.js §2 conventions; + = the way he faces, which is always right here)
const PZ = {
  think: { ...POSES.think, aF: [30, 140], tilt: 16 },
  wait: { lean: 8, tilt: 12, aF: [70, 30], aB: [34, 136], lF: [8, -4], lB: [-10, -2] },        // hand on chin, one on the crate
  airUp: { lean: -4, tilt: -18, aF: [150, 20], aB: [-150, -20], lF: [40, -70], lB: [-20, -50] },
  ready: { lean: 34, tilt: -10, aF: [92, 14], aB: [86, 20], lF: [26, -46], lB: [-28, -20] },
  strain: { lean: 52, tilt: -26, aF: [90, 8], aB: [84, 14], lF: [40, -64], lB: [-44, -6] },
  crouch: { lean: 54, tilt: -24, aF: [90, 10], aB: [84, 16], lF: [70, -120], lB: [30, -96] },
  push: { lean: 50, tilt: -24, aF: [90, 8], aB: [84, 14], lF: [40, -60], lB: [-40, -8] },
  recoil: { lean: 30, tilt: -4, aF: [70, 30], aB: [60, 36], lF: [34, -56], lB: [-20, -30] },
  knees: { lean: 44, tilt: 22, aF: [36, 8], aB: [30, 10], lF: [44, -78], lB: [26, -70] },      // hands on knees, panting
  slump: { lean: 40, tilt: 40, aF: [10, 6], aB: [4, 4], lF: [40, -76], lB: [22, -66] },
  pumpLow: { lean: 26, tilt: -4, aF: [70, 100], aB: [-40, 40], lF: [44, -80], lB: [-26, -46] },    // fist up, knees bent
  punch: { lean: 44, tilt: -10, aF: [104, 30], aB: [20, 20], lF: [44, -78], lB: [26, -70] },       // a fist forward, from the crouch
  shrugLow: { lean: 30, tilt: 12, aF: [50, 110], aB: [-40, -100], lF: [40, -74], lB: [-20, -50] },
  nod: { lean: 40, tilt: 34, aF: [36, 8], aB: [30, 10], lF: [44, -78], lB: [26, -70] },
  win: { lean: -6, tilt: -18, aF: [144, -16], aB: [-144, 16], lF: [16, -10], lB: [-16, -8] },
  winLow: { lean: -6, tilt: -18, aF: [144, -16], aB: [-144, 16], lF: [40, -70], lB: [-20, -50] },  // arms up, knees bent
  yes: { lean: 8, tilt: -8, aF: [62, 112], aB: [-34, 30], lF: [34, -60], lB: [-16, -20] },          // the "yes!" fist pump
  point: { lean: 4, tilt: -14, aF: [128, 6], aB: [-16, 22], lF: [10, -6], lB: [-12, -4] },
}
const BODY = ['hip', 'nk', 'sh', 'head', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']

// time-unit of a payoff string (months per unit); null = no unit in it
function unitOf(str) {
  const x = String(str).toLowerCase()
  if (/\byears?\b|\byrs?\b/.test(x)) return 12
  if (/\bmonths?\b|\bmos?\b/.test(x)) return 1
  if (/\bweeks?\b|\bwks?\b/.test(x)) return 12 / 52
  if (/\bdays?\b/.test(x)) return 12 / 365
  return null
}
const isTimeLike = (m, vals) => /payoff|paid|month|year|week|time|term|long/i.test(m.key + ' ' + (m.label || '')) || vals.some(v => unitOf(v) != null)
const isMoney = vals => vals.length > 0 && vals.every(v => /[$€£]/.test(v))

/** numeric value of a display string, for geometry and running counters only. Like lib's num(), but a K/M/B/T
 *  suffix counts only as a whole token ("$1.2M", "5K"): lib's num("60 months") reads the "m" of "months" as millions */
function numOf(display) {
  const m = /(-|−)?\s*[^\d−-]*?(\d[\d,]*(?:\.\d+)?)\s*([KMBT](?![a-z]))?/i.exec(String(display))
  if (!m) return NaN
  const mult = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(m[3] || '').toUpperCase()] || 1
  return (m[1] ? -1 : 1) * parseFloat(m[2].replace(/,/g, '')) * mult
}
/** "≈ 18.3 years" -> { n: "≈ 18.3", u: "years" }; a string with no trailing unit word -> { n: str, u: '' } */
function splitUnit(str) {
  const m = /^(.*?\d(?:[\d,.]*\d)?)\s+([A-Za-z][A-Za-z .]*)$/.exec(String(str))
  return m ? { n: m[1], u: m[2] } : { n: String(str), u: '' }
}

/** running counter text in the style of `disp`, without its "≈" (the "≈" only comes with the landed string) */
function rollText(p, from, disp) {
  if (p >= 1) return String(disp)
  const like = numLike(disp)
  like.prefix = like.prefix.replace(/≈\s*/g, '').replace(/^\s+/, '')
  const target = numOf(disp), k = Math.pow(10, -like.dp)
  return fmtLike(Math.round(lerp(from, target, clamp(p)) / k) * k, like)
}

export default function whatDifference(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const opts = (d.options || []).filter(o => o && o.values).slice(0, 4)
  const n = opts.length
  if (!n) throw new Error('what-difference: data.options is empty')
  const stake = d.stake || {}
  const vt = spec.verdict && spec.verdict.t != null ? +spec.verdict.t : null

  // ================================================================== metrics: the crate's (time) and the column's (money)
  const metrics = (Array.isArray(d.metrics) && d.metrics.length ? d.metrics : Object.keys(opts[0].values).map(k => ({ key: k, label: k })))
    .map(m => (typeof m === 'string' ? { key: m, label: m } : { label: m.key, ...m }))
    .filter(m => opts.every(o => o.values[m.key] != null))
  if (!metrics.length) throw new Error('what-difference: no metric has a value in every option')
  const valsOf = m => opts.map(o => String(o.values[m.key]))
  const barM = metrics.find(m => isTimeLike(m, valsOf(m))) || metrics.find(m => valsOf(m).every(v => Number.isFinite(numOf(v)))) || metrics[0]
  const sideM = metrics.find(m => m !== barM && isMoney(valsOf(m))) || metrics.find(m => m !== barM) || null
  const barUnit = unitOf(barM.label) || 1
  const monthsOf = str => { const v = numOf(str); return Number.isFinite(v) ? Math.max(0, v * (unitOf(str) ?? barUnit)) : 1 }
  const showPile = !!sideM && isMoney(valsOf(sideM)) && lo.pile !== false
  const showFig = lo.figure !== false

  // ================================================================== timing
  const RACE = Number.isFinite(+lo.race) && +lo.race > 0.4 ? +lo.race : 1.8
  const dVal = Number.isFinite(+d.valueEvery) ? +d.valueEvery : 0.45
  const lanes = opts.map((o, i) => {
    const B = sideM ? numOf(String(o.values[sideM.key])) : 0
    return { i, o, name: String(o.name ?? ''), detail: o.detail != null ? String(o.detail) : '', delta: o.delta != null ? String(o.delta) : '',
      tone: o.tone || 'neutral', bar: String(o.values[barM.key]), side: sideM ? String(o.values[sideM.key]) : '',
      M: monthsOf(String(o.values[barM.key])), B: Number.isFinite(B) ? Math.abs(B) : 0, t0: Number.isFinite(+o.t) ? +o.t : 0 }
  })
  const Mmax = Math.max(1e-6, ...lanes.map(l => l.M))
  const Bmax = Math.max(1e-6, ...lanes.map(l => l.B))
  const secPerM = RACE / Mmax
  for (const l of lanes) {
    const o = l.o
    const natural = Math.max(0.6, l.M * secPerM)
    const rT = o.resultT != null && Number.isFinite(+o.resultT) ? +o.resultT : null
    l.pre = (l.t0 <= 0 && (rT == null || rT <= 0.05)) || (rT != null && rT <= 0.05)
    if (l.pre) {
      l.tLand = Math.min(rT ?? -0.6, -0.6); l.tStart = l.tLand - natural; l.actT = l.tStart - 0.5
    } else if (rT != null && rT > l.t0 + 0.9) {
      l.actT = l.t0; l.tLand = rT; l.tStart = Math.max(l.t0 + 0.42, rT - natural)
    } else {
      l.actT = l.t0; l.tStart = l.t0 + 0.42; l.tLand = l.tStart + natural
    }
    l.run = l.tLand - l.tStart
    const ve = Number.isFinite(+o.valueEvery) ? +o.valueEvery : dVal
    l.tVal = l.pre ? l.tLand : l.tLand + (sideM ? ve : 0)
    l.tDelta = l.delta ? (Number.isFinite(+o.deltaT) ? +o.deltaT : l.tVal + 0.55) : null
    if (l.pre && l.tDelta != null && !Number.isFinite(+o.deltaT)) l.tDelta = -0.1
  }
  // the newest money value is green until the next lane lands
  const landOrder = lanes.map(l => l.tLand).sort((a, b) => a - b)
  for (const l of lanes) {
    const nxt = landOrder.find(x => x > l.tLand + 1e-6)
    l.settleT = l.pre ? -1 : (nxt != null ? nxt : Math.max(l.tVal, l.tDelta ?? 0) + 1.6)
  }
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < n ? d.winner : null
  const lastVal = Math.max(...lanes.map(l => Math.max(l.tVal, l.tDelta ?? -1)))
  const winT = winner == null ? null : (Number.isFinite(+d.winnerT) ? +d.winnerT : vt != null ? vt : lastVal + 1.2)

  // ---- lookOpts beats
  const asList = x => (Array.isArray(x) ? x : x != null ? [x] : [])
  const okLane = i => Number.isInteger(i) && i >= 0 && i < n
  const reads = asList(lo.reads).filter(r => r && Number.isFinite(+r.t)).map(r => ({
    t: +r.t, lanes: asList(r.option).filter(okLane), key: r.metric || barM.key,
  })).filter(r => r.lanes.length)
  const lever = lo.lever && typeof lo.lever === 'object' && Number.isFinite(+lo.lever.t)
    ? { t: +lo.lever.t, text: String(lo.lever.text || ''), lanes: asList(lo.lever.options).filter(okLane), end: +lo.lever.t + 3.6 } : null
  const counts = asList(lo.countCell).filter(c => c && okLane(c.option) && sideM && (c.metric == null || c.metric === sideM.key))
  // scan: the waiting lanes' figures hop in turn
  const hops = lanes.map(() => [])
  if (lo.scan && Number.isFinite(+lo.scan.t)) {
    const every = Number.isFinite(+lo.scan.every) && +lo.scan.every > 0.1 ? +lo.scan.every : 0.4
    const list = asList(lo.scan.options).filter(okLane)
    const order = list.length ? list : lanes.filter(l => !l.pre && l.actT > +lo.scan.t + 0.3).map(l => l.i)
    order.forEach((li, j) => { const tt = +lo.scan.t + j * every; if (lanes[li].actT > tt + 0.3) hops[li].push(tt) })
  }

  // ---- working slot entries (one at a time; each holds until the next)
  const hookTxt = plain(spec.header || '')
  const slotIn = []
  const stakeText = lo.stakeLine === false ? null : typeof lo.stakeLine === 'string' ? lo.stakeLine
    : [stake.label, stake.value && !hookTxt.includes(String(stake.value)) ? stake.value : null, stake.terms].filter(Boolean).join(' · ') || null
  if (stakeText) slotIn.push({ t: -1e9, text: stakeText, kind: 'stake' })
  asList(lo.formulas).forEach((f, i) => {
    if (!f || i >= n) return
    const l = lanes[i]
    const firstRead = reads.filter(r => r.lanes.includes(i)).map(r => r.t).sort((a, b) => a - b)[0]
    const tt = typeof f === 'object' && Number.isFinite(+f.t) ? +f.t : l.pre ? (firstRead ?? 2.0) : l.actT
    const text = typeof f === 'object' ? f.text : f
    if (text) slotIn.push({ t: tt, text: String(text), kind: 'formula' })
  })
  for (const st of asList(lo.steps)) if (st && st.text && Number.isFinite(+st.t)) slotIn.push({ t: +st.t, text: String(st.text), kind: 'step' })
  if (lever && lever.text) slotIn.push({ t: lever.t, text: lever.text, kind: 'lever' })
  for (const l of lanes) if (l.o.note) slotIn.push({ t: Number.isFinite(+l.o.noteT) ? +l.o.noteT : l.tVal, text: String(l.o.note), kind: 'note' })
  const slotE = slotIn.map((x, j) => ({ ...x, j })).sort((a, b) => a.t - b.t || a.j - b.j)
  slotE.forEach((x, j) => { x.end = j + 1 < slotE.length ? slotE[j + 1].t : Infinity })
  if (lever) { const le = slotE.find(x => x.kind === 'lever'); if (le) lever.end = Math.min(lever.end, le.end) }

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  const fixed = h('div', { class: 'wd-fixed' })
  ctx.stage.append(fixed)
  let top = parts.workTop
  // the working slot: every line measured at 40 px (one too long for two lines steps down to 38, then 36)
  const slotEls = slotE.map(x => {
    const el = h('div', { class: 'wd-slot', style: { top: top + 'px', opacity: '0' } })
    el.innerHTML = /\*\*|__/.test(x.text) ? markup(x.text)
      : esc(x.text).replace(/(≈\s*)?[−-]?\$?\d[\d,]*(\.\d+)?(%|[KMBT]\b)?/g, m => `<b>${m}</b>`).replace(/\n/g, '<br>')
    el.innerHTML = el.innerHTML.replace(/−/g, '<span class="op">−</span>')
    fixed.append(el)
    let px = 40
    while (el.offsetHeight > 2 * SLOT_LH + 1 && px > 36) { px -= 2; style(el, { fontSize: px + 'px', lineHeight: Math.round(px * 1.2) + 'px' }) }
    x.lines = Math.max(1, Math.round(el.offsetHeight / SLOT_LH))
    return el
  })
  const slotLines = slotEls.length ? Math.max(...slotE.map(x => x.lines)) : 0
  if (slotLines) top += slotLines * SLOT_LH + 14

  // measuring (cached: the fitter asks for the same strings many times)
  const mcache = new Map()
  const mw = (text, font, o = {}) => {
    const key = text + '|' + font + '|' + JSON.stringify(o)
    if (!mcache.has(key)) mcache.set(key, measure(text, font, o))
    return mcache.get(key)
  }
  const headW = (label, st) => mw(plain(label), `800 40px ${F.head}`, st === 'up' ? { upper: true, letterSpacing: '.07em' } : { letterSpacing: '-0.01em' })
  const valW = (v, px) => mw(v, `900 ${px}px ${F.head}`, { letterSpacing: '-0.03em' }) + 0.14 * px * (v.split(' ').length - 1)
  const nameW = (l, px) => mw(markup(l.name), `800 ${px}px ${F.head}`, { letterSpacing: '-0.02em', html: true })
  const detW = l => (l.detail ? mw(l.detail, `700 40px ${F.mono}`, { letterSpacing: '-0.03em' }) : 0)
  const deltaW = l => (l.delta ? mw(l.delta, `800 40px ${F.head}`, { letterSpacing: '-0.01em' }) + 0.1 * 40 * (l.delta.split(' ').length - 1) : 0)
  const GLYPH_W = 56     // the legend's little crate, plus its gap

  // ---- fitter. Two layouts, every money size VS and name size NS, scored:
  //   row  each lane's title (name + behaviour, one line or two) sits on a row above its track, starting over the
  //        crate; he passes under it bent over, so his size comes from the band under the row
  //   col  the titles stand in a column at the left (name, behaviour under it, wrapping); the track starts right of
  //        it and he has the lane's full height, but the run is shorter
  const probe = h('div', { style: { position: 'absolute', left: '-9999px', top: '0px', visibility: 'hidden' } })
  fixed.append(probe)
  const hcache = new Map()
  const linesOf = (html, font, lh, w, ls) => {
    const key = html + '|' + font + '|' + w
    if (!hcache.has(key)) {
      const el = h('div', { style: { font, lineHeight: lh + 'px', letterSpacing: ls, width: w + 'px', textWrap: 'balance', fontVariantNumeric: 'tabular-nums' } })
      el.innerHTML = html
      probe.append(el)
      hcache.set(key, Math.round(el.offsetHeight / lh))
      el.remove()
    }
    return hcache.get(key)
  }
  const nameLines = (l, NS, w) => linesOf(markup(l.name), `800 ${NS}px ${F.head}`, 48, w, '-0.02em')
  const detLines = (txt, w) => (txt ? linesOf(esc(txt), `700 40px ${F.mono}`, 48, w, '-0.03em') : 0)
  const deltaLines = (l, w) => (l.delta ? linesOf(esc(l.delta), `800 40px ${F.head}`, 48, w, '-0.01em') : 0)
  const headsFor = () => {
    if (lo.heads === false) return { heads: null, headsH: 0 }
    for (const st of lo.heads === 'sentence' ? ['sent'] : ['up', 'sent']) {
      const wl = GLYPH_W + headW(barM.label, st), wr = sideM ? headW(sideM.label, st) : 0
      if (62 + wl + 30 <= XR - wr) return { heads: { st, lines: 1, wl, wr }, headsH: 56 }
    }
    const st = lo.heads === 'sentence' ? 'sent' : 'up'
    return { heads: { st, lines: 2, wl: Math.min(GLYPH_W + headW(barM.label, st), 520), wr: sideM ? Math.min(headW(sideM.label, st), 300) : 0 }, headsH: 100 }
  }
  const HEADS = headsFor()
  const UNITS = lanes.every(l => splitUnit(l.bar).u)
  const unitW = u => mw(u, `800 40px ${F.head}`, { letterSpacing: '-0.01em' })
  function geometry(mode, VS, NS, two, withDetail, TWc = 0) {
    const colW = sideM ? Math.max(...lanes.map(l => valW(l.side, VS))) : 0
    const colL = XR - colW
    const P = Math.min(P_MAX, (FLOOR - top - HEADS.headsH) / n)
    const valB = 6 + Math.max(sideM ? VS : 0, 48) + 2          // the money value's bottom, from the lane's top
    let room, RH, figH, X0c, TW = 0, titleH = 0, ok = true
    if (mode === 'row') {
      RH = (two ? 48 : 0) + valB - 6
      figH = P - RH - 16                                      // under the title row
      const sc0 = Math.min(S_MAX, (figH - 2) / PUSH_H)
      X0c = Math.max(96, Math.round(24 + 84 * sc0 + 13 + 112 * sc0))
      room = (sideM ? colL - NAME_GAP : XR) - X0c
      ok = lanes.every(l => {
        const det = withDetail ? Math.max(detW(l), deltaW(l)) : deltaW(l)
        return two ? nameW(l, NS) <= room && det <= room : nameW(l, NS) + (det ? 16 + det : 0) <= room
      })
    } else {
      // the column: as wide as its longest name or behaviour, 150-330 px; wrapping balanced
      TW = Math.round(clamp(Math.max(...lanes.map(l => Math.max(nameW(l, NS), withDetail ? detW(l) : 0, deltaW(l)))), 150, 330))
      if (TWc) TW = Math.min(TW, TWc)
      titleH = Math.max(...lanes.map(l => 48 * (nameLines(l, NS, TW) + Math.max(withDetail ? detLines(l.detail, TW) : 0, deltaLines(l, TW)))))
      ok = titleH <= P - 10 && (!sideM || 60 + TW + 30 <= colL)
      RH = valB - 6
      figH = P - 12
      const sc0 = Math.min(S_MAX, (figH - 2) / PUSH_H, (P - 12) / STAND_H)
      X0c = Math.round(60 + TW + 30 + 112 * sc0)
      room = TW
    }
    let sc = Math.min(S_MAX, (figH - 2) / PUSH_H, (P - 12) / STAND_H)
    if (Number.isFinite(+lo.figureScale)) sc = Math.min(sc, +lo.figureScale)
    if (!showFig) sc = Math.max(0.4, sc)
    // the crate: as tall as the lane allows under the money column (the pennant beside its top stays clear)
    // Its face is one line ("72", "60 months"), or two when every payoff ends in a unit word and the crate is tall
    // enough: the number over its unit ("≈ 18.3" / "years"), which keeps a long string from making a long crate
    const Hc = Math.round(clamp(Math.min(P - valB - 14, mode === 'row' ? figH + 4 : P - 20), 46, Math.min(112, 180 * sc + 24)))
    let face = 1, CT = Math.round(clamp(Hc * 0.7, 40, 52))
    let crateW = Math.max(Hc * 1.15, ...lanes.map(l => valW(l.bar, CT)), valW('?', CT)) + 38
    if (UNITS && Hc >= 101) {
      const CT2 = Math.min(56, Hc - 60)
      const W2 = Math.max(Hc, ...lanes.map(l => Math.max(valW(splitUnit(l.bar).n, CT2), unitW(splitUnit(l.bar).u))), valW('?', CT2)) + 38
      if (W2 < crateW - 16) { face = 2; CT = CT2; crateW = W2 }
    }
    crateW = Math.round(crateW)
    // the far side: clear of the pile, and the figure behind the longest crate stays left of the money column
    const XF = Math.min(showPile ? PILE_X - PILE_RX - 50 : 880, sideM ? colL - 14 + crateW : 880)
    const RUN = XF - X0c - crateW
    return { mode, VS, NS, two, withDetail, colW, colL, P, valB, RH, figH, sc, reach: 112 * sc, X0c, TW, titleH, Hc, CT, face, crateW, XF, RUN, room, ok }
  }
  let G = null, best = -Infinity
  const cands = []
  // first pass: a figure of 0.36 or more; only when nothing gives that, one down to 0.3
  for (const sMin of [S_MIN, 0.3]) {
    for (const mode of ['row', 'col']) for (const withDetail of [true, false]) for (const two of mode === 'row' ? [false, true] : [false])
      for (const TWc of mode === 'row' ? [0] : [0, 300, 260, 220, 180]) for (const VS of [64, 60, 56, 52, 48, 44]) for (const NS of [44, 40]) {
        const g = geometry(mode, VS, NS, two, withDetail, TWc)
        if (!g.ok || g.RUN < (sMin === S_MIN ? 180 : 130) || (showFig && g.sc < sMin) || g.CT < 41) continue
        const score = 0.5 * VS + 150 * Math.min(g.sc, 0.6) + 0.12 * Math.min(g.RUN, 560) + 0.6 * g.CT - (two ? 4 : 0) - (NS < 44 ? 3 : 0) - (withDetail ? 0 : 40)
        cands.push([mode, withDetail, two, TWc, VS, NS, +g.sc.toFixed(2), Math.round(g.RUN), g.CT, g.face, +score.toFixed(1)])
        if (lo.layout && lo.layout !== mode) continue
        if (score > best) { best = score; G = g }
      }
    if (G) break
  }
  if (!G) G = geometry('row', 44, 40, true, false)        // nothing fits: the smallest layout (the linter will say why)
  probe.remove()
  const { VS, NS, two, colL, P, X0c, Hc, CT, crateW, XF } = G
  const FACE2 = G.face === 2
  const COL = G.mode === 'col'
  if (lo.debug) window.__wd = { G, top, cands }
  const k = Math.max(0.3, G.sc), reachX = G.reach
  const lanesTop = FLOOR - n * P
  const headsBottom = lanesTop - 10
  const band = G.figH

  // ---- lane geometry (x is time: months from the start line)
  const X0f = X0c + crateW
  const RUN = Math.max(120, XF - X0f)
  const xFront = m => X0f + (m / Mmax) * RUN
  const poleH = Hc + 8
  for (const l of lanes) {
    l.yT = lanesTop + l.i * P
    l.yRowB = l.yT + G.valB                        // the money value's baseline row
    l.yF = l.yT + P
    l.xEnd = xFront(l.M)
    l.K = showPile ? Math.max(2, Math.round(KMAX * l.B / Bmax)) : 0
    l.pileH = showPile ? Math.max(18, l.yF - l.yRowB - 16) * l.B / Bmax : 0
    if (COL) {
      l.nameXY = [60, l.yT + 8]
      l.detXY = [60, l.yT + 8 + 48 * nameLines(l, NS, G.TW)]
    } else {
      const rowB = l.yT + 6 + G.RH
      l.nameXY = [X0c, two ? rowB - 48 : rowB]
      l.detXY = two ? [X0c, rowB] : [X0c + nameW(l, NS) + 16, rowB]
    }
  }

  // ================================================================== build
  const world = makeWorld(ctx, { floor: false })
  const g = world.g
  const fxk = makeFx(world, ctx)
  const cam = camera(world)

  // heads (fixed: they never shake): a little crate + the crate's metric at the left; the money head right
  if (HEADS.heads) {
    const HD = HEADS.heads, H2 = HD.lines * 44
    const cls = 'wd-head' + (HD.st === 'sent' ? ' sent' : '') + (HD.lines > 1 ? ' two' : '')
    const gl = s('svg', { class: 'wd-glyph', width: 44, height: 34, 'data-deco': '', style: `left:62px;top:${headsBottom - H2 + 22 - 17}px` })
    gl.append(s('rect', { x: 3, y: 3, width: 38, height: 28, rx: 6, fill: C.redSoft, stroke: C.ink, 'stroke-width': 5 }))
    fixed.append(gl)
    const hl = h('div', { class: cls, style: { left: 62 + GLYPH_W + 'px', width: Math.ceil(HD.wl - GLYPH_W + 4) + 'px' } }, plain(barM.label))
    fixed.append(hl)
    style(hl, { top: (headsBottom - hl.offsetHeight) + 'px' })
    if (sideM) {
      const hr = h('div', { class: cls + ' r', style: { left: Math.floor(XR - HD.wr - 4) + 'px', width: Math.ceil(HD.wr + 4) + 'px' } }, plain(sideM.label))
      fixed.append(hr)
      style(hr, { top: (headsBottom - hr.offsetHeight) + 'px' })
    }
  }

  // per-lane objects
  for (const l of lanes) {
    // floor line and the far-side guide (decoration)
    g.back.append(s('line', { x1: -20, x2: 1100, y1: l.yF, y2: l.yF, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.85 }))
    g.back.append(s('line', { x1: XF, x2: XF, y1: (sideM && XF > colL - 12 ? l.yRowB + 12 : l.yT + 12).toFixed(1), y2: l.yF - 8, stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '8 10', 'stroke-linecap': 'round' }))
    // a socket for the money value (dashed, decoration) until it lands
    if (sideM) {
      const w = Math.max(VS * 2, G.colW * 0.8), hh = VS * 0.76
      l.sock = s('rect', { x: (XR - w).toFixed(1), y: (l.yRowB - hh - VS * 0.1).toFixed(1), width: w.toFixed(1), height: hh.toFixed(1), rx: 10, fill: 'none', stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '10 9', 'data-deco': '' })
      g.back.append(l.sock)
    }
    // the pile (edge-on coins, bottom up; the top coin sits at the exact height)
    l.pile = []
    if (showPile) {
      const N = Math.max(1, Math.round(l.pileH / 9))
      for (let j = 0; j < N; j++) {
        const cy = l.yF - 2 - PILE_RY - Math.max(0, l.pileH - 2 * PILE_RY - 4) * (N === 1 ? 0 : j / (N - 1))
        const e = s('ellipse', { cx: PILE_X + ((j * 7) % 5) - 2, cy: cy.toFixed(1), rx: PILE_RX, ry: PILE_RY, fill: C.coin, stroke: C.ink, 'stroke-width': 4, opacity: 0 })
        g.mid.append(e)
        l.pile.push({ e, f: N === 1 ? 1 : (j + 1) / N })
      }
    }
    // the time it saved: a pale green strip on the floor from its flag to the far side (grows in after it lands)
    l.gap = XF - l.xEnd > 14 ? s('line', { x1: (l.xEnd + 12).toFixed(1), x2: (l.xEnd + 12).toFixed(1), y1: l.yF, y2: l.yF, stroke: C.hero, 'stroke-width': 11, 'stroke-linecap': 'round', 'data-deco': '' }) : null
    if (l.gap) g.back.append(l.gap)
    // flag (pole + pennant), dropped in where the debt is gone
    l.flag = s('g', { 'data-deco': '' })
    l.pennant = s('path', { d: `M3,${-poleH}L38,${-poleH + 12}L3,${-poleH + 24}Z`, fill: C.hero, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' })
    l.flag.append(s('line', { x1: 0, x2: 0, y1: 0, y2: -poleH - 2, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }), l.pennant)
    g.mid.append(l.flag)
    // the crate (its face is the clock)
    l.crate = s('g')
    l.crateR = s('rect', { x: (-crateW / 2).toFixed(1), y: -Hc, width: crateW, height: Hc, rx: 10, fill: C.redSoft, stroke: C.ink, 'stroke-width': 8, 'stroke-linejoin': 'round' })
    // one line centred, or the number over its unit
    const gapU = 6, blockH = CT * 0.74 + gapU + 40 * 0.74
    const yN = FACE2 ? -Hc / 2 - blockH / 2 + CT * 0.37 : -Hc / 2 + 2
    l.crateT = s('text', { class: 'wd-crate-t', x: 0, y: yN.toFixed(1), 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': CT, fill: C.ink })
    l.crate.append(l.crateR, l.crateT)
    l.unit = FACE2 ? splitUnit(l.bar) : null
    if (FACE2) {
      l.crateU = s('text', { class: 'wd-crate-t', x: 0, y: (-Hc / 2 + blockH / 2 - 40 * 0.37).toFixed(1), 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 40, 'font-weight': 800, fill: C.grey })
      l.crateU.textContent = l.unit.u
      l.crate.append(l.crateU)
    }
    g.mid.append(l.crate)
    // flying coins (one per K)
    l.coins = Array.from({ length: l.K }, () => {
      const e = s('ellipse', { rx: 13, ry: 13, fill: C.coin, stroke: C.ink, 'stroke-width': 4, opacity: 0, 'data-deco': '' })
      g.front.append(e)
      return e
    })
    // the title row
    // (col layout: top-left anchored, wrapping balanced in the title column)
    const wrap = COL ? { whiteSpace: 'normal', width: G.TW + 'px', textWrap: 'balance' } : {}
    const ay = COL ? 0 : 1
    l.nameO = new NumObj(world.html, { cls: 'wd-name', text: l.name, ax: 0, ay, html: true, style: { fontSize: NS + 'px', lineHeight: '48px', ...wrap } })
    l.detO = l.detail && G.withDetail ? new NumObj(world.html, { cls: 'wd-det', text: l.detail, ax: 0, ay, style: wrap }) : null
    l.deltaO = l.delta ? new NumObj(world.html, { cls: 'wd-delta', text: l.delta, ax: 0, ay, style: { color: TONE_TXT[l.tone] || C.ink, ...wrap } }) : null
    // the money value (+ the lever band and the winner's plate behind it)
    l.band = sideM && lever && lever.lanes.includes(l.i) ? h('div', { class: 'wd-band' }) : null
    if (l.band) world.html.append(l.band)
    l.plate = sideM && winner === l.i ? h('div', { class: 'wd-plate' }) : null
    if (l.plate) world.html.append(l.plate)
    l.val = sideM ? new NumObj(world.html, { cls: 'wd-val', text: l.side, ax: 1, ay: 1, style: { fontSize: VS + 'px', lineHeight: VS + 'px' } }) : null
    l.cnt = counts.find(c => c.option === l.i) || null
    // the figure
    l.fig = showFig ? new Figure(g.fig, { scale: k, outlineWidth: 10 }) : null
  }
  // the box behind a lane's money value (plate, band, impact)
  const valBox = l => ({ x0: G.colL - 16, x1: XR + 12, y0: l.yRowB - VS * 0.9 - 6, y1: l.yRowB - VS * 0.1 + 10 })

  // ================================================================== motion (pure)
  const runE = p => (p <= 0 ? 0 : p >= 1 ? 1 : p - (0.32 * Math.sin(2 * Math.PI * p)) / (2 * Math.PI))   // gentle accel/decel
  const frontAt = (l, t) => (t <= l.tStart ? X0f : t >= l.tLand ? l.xEnd : lerp(X0f, l.xEnd, runE(prog(t, l.tStart, l.run))))
  const FLY = 0.42
  const coinT = (l, j) => lerp(l.tStart + 0.08, Math.max(l.tStart + 0.1, l.tLand - FLY + 0.02), l.K === 1 ? 1 : j / (l.K - 1))
  const hip0 = X0c - reachX                     // his hip when his hands are on the crate at the start line
  const leverOn = (l, t) => (lever && lever.lanes.includes(l.i) ? clamp(prog(t, lever.t, 0.16)) * (1 - prog(t, lever.end - 0.2, 0.2)) : 0)

  // the winner's end pose: a full celebration when nothing readable is above him, else a low fist pump
  for (const l of lanes) {
    l.jumpH = 16; l.endPose = PZ.pumpLow
    if (winner !== l.i) continue
    const hx = l.xEnd - crateW - reachX - 10 * k
    const f0 = hx - 95 * k, f1 = hx + 95 * k
    let free, roomUp
    if (COL) {
      free = !sideM || f1 < colL - 10
      roomUp = P - 4                                  // he stays inside his lane (the lane above has its own figure)
    } else {
      const titleEnd = X0c + Math.max(nameW(l, NS) + (two ? 0 : (l.detO || l.deltaO ? 16 + Math.max(l.detO ? detW(l) : 0, deltaW(l)) : 0)), two ? Math.max(l.detO ? detW(l) : 0, deltaW(l)) : 0)
      free = (f0 > titleEnd + 10) && (!sideM || f1 < colL - 10)
      roomUp = P - 6
    }
    // arms up (standing, else knees bent) when that fits under whatever is above him, else the "yes!" pump
    const want = lo.endPose === 'point' ? PZ.point : lo.endPose === 'pump' ? PZ.yes : lo.endPose === 'celebrate' ? PZ.win : null
    const hWin = 274 * k + 8, hLow = 256 * k + 8, hYes = 267 * k + 8, hPunch = 214 * k + 8
    const capH = COL ? roomUp : free ? roomUp : band                    // under the title row he stays bent over
    l.endPose = want || (hWin <= capH ? PZ.win : hLow <= capH ? PZ.winLow : hYes <= capH ? PZ.yes : PZ.punch)
    const hEnd = l.endPose === PZ.win ? hWin : l.endPose === PZ.winLow ? hLow : l.endPose === PZ.yes ? hYes : hPunch
    l.jumpH = clamp(capH - hEnd, 4, 44)
  }

  // the figure's state: { pose, hipX, pin (0..1: hands on the crate), lift (px), legs (procedural stepping) }
  function figState(l, t) {
    const back = frontAt(l, t) - crateW
    const hipPush = back - reachX
    const hipWait = hipPush + 0.3 * reachX
    const st = { pose: PZ.wait, hipX: hipWait, pin: 0, rest: 0, lift: 0, legs: 0 }
    const tA = l.actT, tS = l.tStart, tL = l.tLand
    if (t < tA) {
      // waiting at the start: hand on chin, the other resting on the crate's corner; a nod in the first second;
      // scan hops (the hand leaves the crate for the hop)
      st.pose = { ...PZ.wait, tilt: PZ.wait.tilt + 12 * bump(t, 0.12, 0.7) }
      st.rest = 1
      for (const th of hops[l.i]) {
        const w = bump(t, th, 0.44)
        if (w > 0) { st.lift = hop(t, th + 0.06, 0.32, Math.min(20, Math.max(6, P - 12 - STAND_H * k))); st.pose = blendPose(st.pose, PZ.airUp, w * 0.75); st.rest = 1 - Math.min(1, 2 * w) }
      }
      return st
    }
    if (t < tS) {
      // steps back and leans in, both hands on the crate; a long lead-in becomes a strain (it trembles but holds)
      // until it gives
      const w = E.inOut(prog(t, tA, 0.26))
      st.hipX = lerp(hipWait, hipPush, w)
      st.pin = w; st.rest = 1 - w
      let pz = blendPose(PZ.wait, PZ.ready, w)
      if (tS - tA > 1.3) {
        const sw = E.inOut(prog(t, tA + 0.45, 0.3))
        const sh = Math.sin(2 * Math.PI * 7.5 * t) * 2.4
        pz = blendPose(pz, { ...PZ.strain, lean: PZ.strain.lean + sh, tilt: PZ.strain.tilt - sh }, sw)
      }
      st.pose = blendPose(pz, PZ.crouch, E.inOut(prog(t, tS - 0.24, 0.2)))
      return st
    }
    if (t < tL) { st.hipX = hipPush; st.pin = 1; st.legs = 1; st.pose = PZ.push; return st }
    // landed: recoil off the crate, hands on knees, react by tone; the lever nod; the winner beat
    const dt = t - tL
    st.hipX = hipPush - 12 * k * E.out(prog(t, tL, 0.3))
    st.pin = 1 - E.inOut(prog(t, tL + 0.06, 0.24))
    let pz = blendPose(PZ.push, PZ.recoil, E.out(prog(dt, 0, 0.16)))
    pz = blendPose(pz, PZ.knees, E.inOut(prog(dt, 0.3, 0.35)))
    if (!l.pre) {
      // (under a title row he stays bent over: a forward punch, not a raised fist)
      const react = l.tone === 'bad' ? PZ.slump : !COL ? (l.tone === 'neutral' ? PZ.nod : PZ.punch) : l.tone === 'neutral' ? PZ.shrugLow : PZ.pumpLow
      pz = blendPose(pz, react, E.inOut(prog(dt, 0.75, 0.25)) * (1 - E.inOut(prog(dt, 1.9, 0.35))))
    }
    const lv = lever && lever.lanes.includes(l.i) ? bump(t, lever.t + 0.05, 0.5) : 0
    if (lv > 0) pz = blendPose(pz, PZ.nod, lv)
    st.pose = pz
    if (winT != null && t >= winT - 0.3) {
      if (l.i === winner) {
        st.pose = blendPose(st.pose, PZ.crouch, bump(t, winT - 0.26, 0.3) * 0.8)
        st.lift = hop(t, winT + 0.04, 0.46, l.jumpH)
        const air = E.inOut(prog(t, winT + 0.02, 0.12)) * (1 - E.inOut(prog(t, winT + 0.42, 0.14)))
        if (air > 0) st.pose = blendPose(st.pose, PZ.airUp, air * (l.endPose === PZ.win ? 1 : 0.4))
        const ew = E.inOut(prog(t, winT + 0.5, 0.18))
        if (ew > 0) {
          const wave = 9 * Math.sin(2 * Math.PI * 1.5 * (t - winT - 0.5)) * Math.exp(-(t - winT - 0.5) / 3)
          const P2 = l.endPose
          st.pose = blendPose(st.pose, { ...P2, aF: [P2.aF[0] + wave, P2.aF[1]], aB: [P2.aB[0] - wave, P2.aB[1]] }, ew)
        }
      } else st.pose = blendPose(st.pose, PZ.slump, E.inOut(prog(t, winT + 0.1, 0.35)))
    }
    return st
  }
  // the push: hips low and bobbing, feet stepping on the floor (planted while they bear weight), hands on the crate
  const SL = 58 * k
  function runLegs(J, l, hipX) {
    const ph = (hipX - hip0) / (2 * SL)
    const LIFT = 16 * k
    const foot = off => {
      const c = ph + off, nn = Math.floor(c), u = c - nn
      const xp = n0 => hip0 + (n0 - off) * 2 * SL + 0.16 * SL
      if (u < 0.62) return [xp(nn), l.yF - J.sw]
      const q = (u - 0.62) / 0.38
      return [lerp(xp(nn), xp(nn + 1), E.inOut(q)), l.yF - J.sw - LIFT * Math.sin(Math.PI * q)]
    }
    pinLimb(J, 'fF', foot(0), 1)
    pinLimb(J, 'fB', foot(0.5), 1)
  }

  // ================================================================== cues
  for (const l of lanes) {
    if (l.pre) continue
    ctx.cue(l.actT + 0.04, 'step', { gain: 0.5 })
    ctx.cue(l.tStart, 'swipe', { gain: 0.6 })
    ctx.cue(l.tStart + 0.05, 'roll', { dur: Math.max(0.3, l.run - 0.1), gain: 0.4 })
    ctx.cue(l.tLand, 'thud')
    if (sideM) ctx.cue(l.tVal, 'pop', { gain: 0.75 })
    if (l.tDelta != null && l.tDelta > 0) ctx.cue(l.tDelta, 'pop', { gain: 0.6 })
  }
  for (const r of reads) if (r.t > 0.05) ctx.cue(r.t, 'tick', { gain: 0.5 })
  for (const hs of hops) for (const th of hs) ctx.cue(th, 'tick', { gain: 0.45 })
  if (lever && lever.lanes.length) ctx.cue(lever.t, 'swipe', { gain: 0.5 })
  if (winner != null) {
    const l = lanes[winner]
    const b = sideM ? valBox(l) : { x0: l.xEnd - crateW, x1: l.xEnd, y0: l.yF - Hc, y1: l.yF }
    fxk.impact(winT, { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2, shake: 10, punch: 0.02, rx: (b.x1 - b.x0) / 2 + 10, ry: (b.y1 - b.y0) / 2 + 8, r: 34, lines: 14, cue: 'hit', gain: 0.9 })
    ctx.cue(winT + 0.06, 'cash', { gain: 0.8 })
  }

  // ================================================================== seek
  const lastBeat = Math.max(lastVal, winT ?? 0, ...slotE.map(x => Math.max(0, x.t)), ...reads.map(r => r.t), lever ? lever.t : 0)
  const duration = durationOf(spec, lastBeat, d.hold ?? 3)
  const chromeOpts = { verdictCue: winT != null && vt != null && Math.abs(vt - winT) < 0.35 ? null : 'ding' }
  const readAt = (l, key, t) => { let b = 0; for (const r of reads) if (r.key === key && r.lanes.includes(l.i)) b = Math.max(b, bump(t, r.t, 0.42)); return b }

  function seekLane(l, t) {
    const active = t >= l.actT
    const winOn = winT != null && t >= winT
    const isWin = winOn && l.i === winner, loser = winOn && l.i !== winner
    // ---- title row
    const wake = COL || l.pre ? 0 : bump(t, l.actT, 0.3)
    l.nameO.set({ x: l.nameXY[0], y: l.nameXY[1], color: active ? C.ink : C.dim, sx: 1 + 0.05 * wake, sy: 1 + 0.05 * wake })
    const dT = l.tDelta
    if (l.detO) {
      const out = dT != null ? prog(t, dT, 0.12) : 0
      l.detO.set({ x: l.detXY[0], y: l.detXY[1], opacity: 1 - out, sx: 1 + 0.12 * out, sy: 1 - 0.3 * out, color: active ? C.grey : C.dim })
    }
    if (l.deltaO) {
      const pi = dT != null ? popIn(t, dT + 0.1, 0.22) : { scale: 1, opacity: 0 }
      const rb = readAt(l, 'delta', t)
      l.deltaO.set({ x: l.detXY[0], y: l.detXY[1], opacity: pi.opacity, sx: pi.scale * (1 + 0.12 * rb), sy: pi.scale * (1 + 0.12 * rb) })
    }
    // ---- the money value: drops onto the row; newest green, settling to ink (a bad option's to red)
    if (l.val) {
      const tIn = l.tVal
      const base = l.tone === 'bad' ? C.red : C.ink
      let col = l.pre ? base : mix(C.heroInk, base, E.inOut(prog(t, l.settleT, 0.3)))
      if (loser) col = mixOk(base, C.grey, prog(t, winT + 0.1, 0.16))
      if (isWin) col = C.ink
      const rb = readAt(l, sideM.key, t)
      if (rb > 0 && !isWin) col = mix(col.startsWith('#') ? col : base, C.heroInk, Math.min(1, rb * 2.2))
      let text = l.side, sx = 1, sy = 1, op = 1, y = l.yRowB
      if (t < tIn) op = 0
      else if (l.cnt && !l.pre) {
        const from = l.cnt.from === 'base' || l.cnt.from == null ? numOf(lanes[0].side) : numOf(String(l.cnt.from))
        const p = prog(t, tIn, 0.8)
        if (p < 1 && Number.isFinite(from)) text = rollText(E.out(p), from, l.side)
        const pi = popIn(t, tIn, 0.2), sc = 1 + 0.1 * bump(t, tIn + 0.8, 0.3)
        sx = sy = pi.scale * sc; op = pi.opacity
      } else if (!l.pre) {
        // falls the last few px and squashes on contact (never under 41 px)
        const f = fall(t, tIn - 0.11, 34)
        y = l.yRowB - f.y
        const q = f.landed ? squashAt(t, f.lastHit, Math.min(0.14, 1 - 41 / VS)) : { sx: 1, sy: 1 }
        sx = q.sx; sy = q.sy
        op = clamp((t - tIn + 0.11) / 0.06)
        l.val.overlap(!f.landed)
      }
      const lb = 1 + 0.12 * rb + 0.06 * bump(t, lever ? lever.t : -9, 0.4) * (l.band ? 1 : 0)
      sx *= lb; sy *= lb
      if (isWin) { const pb = 1 + 0.1 * bump(t, winT + 0.04, 0.34); sx *= pb; sy *= pb }
      l.val.set({ x: XR, y, text, color: col, opacity: op, sx, sy })
      attr(l.sock, 'opacity', t < tIn ? (active ? '1' : '0.7') : '0')
      if (l.band) {
        const on = leverOn(l, t), b = valBox(l)
        style(l.band, { left: b.x0.toFixed(0) + 'px', top: b.y0.toFixed(0) + 'px', width: (b.x1 - b.x0).toFixed(0) + 'px', height: (b.y1 - b.y0).toFixed(0) + 'px',
          opacity: on.toFixed(3), transform: `scaleX(${(0.9 + 0.1 * E.out(clamp(prog(t, lever.t, 0.16)))).toFixed(3)})`, display: on > 0.001 ? '' : 'none' })
      }
      if (l.plate) {
        const b = valBox(l), p = prog(t, winT - 0.04, 0.2)
        style(l.plate, { left: (b.x0 - 4).toFixed(0) + 'px', top: (b.y0 - 4).toFixed(0) + 'px', width: (b.x1 - b.x0 + 8).toFixed(0) + 'px', height: (b.y1 - b.y0 + 8).toFixed(0) + 'px',
          transform: `scale(${(p <= 0 ? 0 : 0.2 + 0.8 * E.back(p, 1.8)).toFixed(3)},${(p <= 0 ? 0 : 0.6 + 0.4 * E.out(p)).toFixed(3)})`, display: p > 0 ? '' : 'none' })
      }
    }
    // ---- the crate: "?" until it moves, then the running months, then the payoff's string
    const xf = frontAt(l, t)
    let csx = 1, csy = 1, crot = 0
    if (t >= l.tLand && !l.pre) { const q = squashAt(t, l.tLand, 0.06); csx = q.sx; csy = q.sy }
    if (t >= l.tStart && t < l.tLand) crot = -1.2 * Math.sin(2 * Math.PI * 4 * (t - l.tStart)) * smooth(0, 0.15, t - l.tStart)
    if (t >= l.actT + 0.45 && t < l.tStart && l.tStart - l.actT > 1.3) crot = 0.8 * Math.sin(2 * Math.PI * 9 * t)     // strain
    let hopB = 0
    for (const th of hops[l.i]) hopB = Math.max(hopB, bump(t, th + 0.1, 0.3))
    const pulse = 1 + 0.08 * readAt(l, barM.key, t) + 0.07 * hopB + 0.05 * (l.band || (lever && lever.lanes.includes(l.i)) ? bump(t, lever.t, 0.4) : 0) + (isWin ? 0.06 * bump(t, winT + 0.04, 0.34) : 0)
    attr(l.crate, 'transform', `translate(${(xf - crateW / 2).toFixed(1)},${l.yF.toFixed(1)}) rotate(${crot.toFixed(2)}) scale(${(csx * pulse).toFixed(3)},${(csy * pulse).toFixed(3)})`)
    let fill = t >= l.tLand ? mix(C.redSoft, C.heroSoft, l.pre ? 1 : prog(t, l.tLand, 0.2)) : C.redSoft
    if (isWin) fill = mix(C.heroSoft, C.coin, prog(t, winT, 0.2))
    attr(l.crateR, 'fill', fill)
    let face = '?', fcol = active ? C.grey : C.dim
    const barN = FACE2 ? l.unit.n : l.bar
    if (t >= l.tStart) { face = rollText(runE(prog(t, l.tStart, l.run)), 0, barN); fcol = t >= l.tLand ? C.ink : C.grey }
    if (l.crateU) attr(l.crateU, 'opacity', t >= l.tStart ? '1' : '0')
    if (loser) fcol = mixOk(C.ink, C.grey, prog(t, winT + 0.1, 0.16))
    setTextAttr(l.crateT, face, fcol)
    // ---- flag: drops in just before the crate arrives, wobbles when it is hit
    const tDrop = l.tLand - 0.3
    const f = fall(t, tDrop, 90, { n: 2 })
    const wob = t >= l.tLand && !l.pre ? wobble(t, l.tLand, 7, 3.2, 5) : 0
    attr(l.flag, 'transform', `translate(${(l.xEnd + 5).toFixed(1)},${(l.yF - f.y).toFixed(1)}) rotate(${wob.toFixed(2)})`)
    attr(l.flag, 'opacity', t >= tDrop ? '1' : '0')
    attr(l.pennant, 'fill', isWin ? C.coin : C.hero)
    if (l.gap) {
      const gp = l.pre ? 1 : E.out(prog(t, l.tLand + 0.12, 0.35))
      attr(l.gap, 'x2', (l.xEnd + 12 + Math.max(0, XF - l.xEnd - 12) * gp).toFixed(1))
      attr(l.gap, 'opacity', gp > 0 ? '1' : '0')
    }
    // ---- coins: fly from the crate's top to the pile; the pile grows as they land
    let landedK = 0
    l.coins.forEach((e, j) => {
      const t0 = coinT(l, j), p = prog(t, t0, FLY)
      if (t >= t0 + FLY) landedK++
      if (!(t >= t0 && t < t0 + FLY)) { attr(e, 'opacity', '0'); attr(e, 'cx', '0'); attr(e, 'cy', '0'); return }
      const xs = frontAt(l, t0) - crateW * 0.3, ys = l.yF - Hc - 10
      const ye = l.yF - 4 - l.pileH * (j / l.K) - 10, xe = PILE_X
      const apex = Math.min(ys, ye) - 30
      const yy = (1 - p) * (1 - p) * ys + 2 * p * (1 - p) * (2 * apex - (ys + ye) / 2) + p * p * ye
      attr(e, 'cx', lerp(xs, xe, p).toFixed(1)); attr(e, 'cy', yy.toFixed(1))
      attr(e, 'rx', (13 * Math.abs(Math.cos(Math.PI * 2.5 * p)) + 3).toFixed(1))
      attr(e, 'opacity', '1')
    })
    const pileF = l.pre ? 1 : l.K ? landedK / l.K : 0
    for (const pc of l.pile) attr(pc.e, 'opacity', pileF >= pc.f - 1e-6 ? '1' : '0')
    // ---- figure
    if (l.fig) {
      const st = figState(l, t)
      const pz = secondary({ ...st.pose, lift: 0 }, t + l.i * 0.7, { breathe: 0.8 })
      let J
      if (st.legs > 0) {
        const ph = (st.hipX - hip0) / (2 * SL)
        J = fk(pz, { x: st.hipX, y: l.yF - 92 * k + 3 * k * Math.sin(4 * Math.PI * ph), scale: k, stroke: 13 })
        runLegs(J, l, st.hipX)
      } else J = fk(pz, { x: st.hipX, ground: l.yF, scale: k, stroke: 13 })
      const bx = frontAt(l, t) - crateW - 2
      if (st.pin > 0) {
        const Jp = { ...J }
        pinLimb(Jp, 'hF', [bx, l.yF - Hc * 0.64], 1); pinLimb(Jp, 'hB', [bx, l.yF - Hc * 0.4], 1)
        for (const key of ['eF', 'hF', 'eB', 'hB']) J[key] = [lerp(J[key][0], Jp[key][0], st.pin), lerp(J[key][1], Jp[key][1], st.pin)]
      }
      if (st.rest > 0) {
        // the waiting hand rests on the crate's top corner
        const Jp = { ...J }
        pinLimb(Jp, 'hF', [bx + 14, l.yF - Hc - 1], 1)
        for (const key of ['eF', 'hF']) J[key] = [lerp(J[key][0], Jp[key][0], st.rest), lerp(J[key][1], Jp[key][1], st.rest)]
      }
      if (st.lift) for (const key of BODY) J[key] = [J[key][0], J[key][1] - st.lift]
      J.ground = l.yF
      const colF = loser ? mixOk(C.hero, C.grey, prog(t, winT + 0.1, 0.2)) : C.hero
      for (const kk in l.fig.limbs) attr(l.fig.limbs[kk], 'stroke', colF)
      attr(l.fig.head, 'fill', colF)
      l.fig.draw(J)
    }
  }
  function setTextAttr(el, text, fill) {
    if (el.__tx !== text) { el.__tx = text; el.textContent = text }
    attr(el, 'fill', fill)
  }

  return {
    duration,
    chrome: chromeOpts,
    seek(t) {
      // working slot: one line at a time (hold, then snap)
      slotE.forEach((x, j) => {
        const el = slotEls[j]
        if (!(t >= x.t && t < x.end)) { style(el, { opacity: '0', display: 'none' }); return }
        const pi = x.t < 0 ? { scale: 1, opacity: 1 } : popIn(t, x.t, 0.18, 0.94)
        const out = Number.isFinite(x.end) ? 1 - prog(t, x.end - 0.1, 0.1) : 1
        style(el, { display: '', opacity: (pi.opacity * out).toFixed(3), transform: `translateY(${((1 - pi.opacity) * 10).toFixed(1)}px) scale(${pi.scale.toFixed(3)})` })
      })
      for (const l of lanes) seekLane(l, t)
      const { shake, zoom } = fxk.seek(t)
      if (winner != null && sideM) {
        const b = valBox(lanes[winner]), cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2
        cam.set({ fx: cx, fy: cy, x: cx, y: cy, zoom, shake })
      } else cam.set({ shake, zoom })
    },
  }
}
