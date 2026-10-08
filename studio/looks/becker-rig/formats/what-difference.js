// becker-rig · what-difference (FORMATS.md §3, hook P5): one fixed debt handled 2-4 ways. "Guess which one."
//
// The debt is a crate, and the crate is the clock. Every option gets a lane: a floor line, the figure behind the
// same crate on the start line, the option's name and behaviour (dim until its turn), and its money result on the
// right under a column head. The lane is a TIME axis shared by every lane, from 0 months at the start line: the crate
// travels as far as the option takes to pay off, so the longest payoff reaches the far side (a dashed guide in every
// lane), the winning lane's flag is the nearest (it got to "paid off" first), and the floor from each flag to the far
// side turns green (the time it saved).
//   Frame 1  the question: every lane named, every crate on its start line showing "?", the money slots empty
//            (dashed sockets), the stake in the working slot under the footer. Only an option whose t (or resultT) is
//            given and <= 0 is already run: crate at its flag with its payoff on it, money in, coin pile full. The
//            waiting figures stand with a hand on the chin and the other resting on their crate, a nod in the first
//            second.
//   A run    the lane wakes (its name to ink, `step`; his figure turns green: it is his turn) and he steps back and
//            leans in, both hands on the crate; on a long lead-in he strains against it and it trembles but holds,
//            until it gives. Then he drives it along the lane, bent low, feet stepping on the floor, hands pinned to
//            the crate by 2-bone IK (`swipe` on the push-off, a `roll` under the run). Every run moves at one shared
//            speed (lookOpts.race), so run time is payoff time too (unless resultT asks for a shorter run, or the next
//            lane wakes first: a run then ends 0.8 s before it, 0.6 s at the least, so two lanes never push at once).
//            The crate's face counts the months up as it goes (grey digits, never the "≈"; a compound payoff such as
//            "11 yrs 5 mo" counts whole years, "4 yrs", and pops its exact string on landing), and every few strides
//            an interest coin flies off its front face, low (under the money value and anything under it), onto the
//            lane's pile under the money column (pile height = that money value: one honest scale, from zero, for
//            every lane). A flag drops in where the debt is gone, the crate slams into its pole (`thud`, a squash, the
//            pole wobbles), turns from red (debt) to green (paid) and its face lands on the payoff's display string.
//            The money value then drops onto its row (`pop`), a third metric's line pops in under it (`tick`) and the
//            delta pops in (`pop`); he recoils, catches his breath hands on knees, reacts by tone (bad: slump;
//            neutral: shrug or a nod; good / goal: a fist), and 1.6 s later turns back to slate.
//   Colour   a money value lands in its tone's colour: green (heroInk) for good and goal, red for bad, ink (with a
//            bump) for neutral; a green one settles to ink when the next lane lands (one focal number at a time), a red
//            one stays red. A read flashes a value in its own colour and bumps it 12%. Crate faces are always ink (on
//            red, green or gold). Deltas are green (good, goal), red (bad) or ink (neutral). Figures are slate (the
//            kit's rival colour) while they wait or rest, and green only on their own turn, a scan hop, a lever beat
//            or a read of their lane, and for the winner: one figure in focus at a time.
//   Winner   at data.winnerT (default verdict.t): a gold plate opens behind the winner's money value, which grows to
//            1.15x on it (1.08x, or not at all, when the lanes are too tight for the headroom); impact: a mostly
//            vertical shake, a light flash, a 1.8% punch about the titles' left edge (x 922 then reaches 939), `hit` +
//            `cash`, and short rays fanning out of the plate's two ends only (the left fan only where the row is clear
//            of the titles and the deltas: a burst all round would cross the crate faces and the lane above). Its crate
//            and pennant turn gold, and when the verdict claims time (an emphasis with a time unit, "**14 months**"),
//            its time-saved strip thickens and pulses with the plate. He crouches, jumps and lands celebrating (arms up
//            in a wide V when that fits under whatever is above him, else the "yes!" pump or a punch from the crouch);
//            the others slump, their values, deltas and crate faces settle grey. The chrome's verdict lands in the
//            caption band (its `ding` is skipped when it would land on the winner's hit).
//
// Nothing on screen is computed: every number is a spec display string; the crate's running counter and a counted
// money value land exactly on theirs. Months are read out of the payoff strings only to place the crates ("≈ 4.8
// years" = 57.6 months; "11 yrs 5 mo" = 137, every number-and-unit pair summed; a bare "72" takes its unit from the
// metric label, else months). The parser is local: lib's num("60 months") reads the "m" of "months" as millions.
//
// Layout (measured at mount, every candidate scored; lookOpts.layout pins one). Top down: the working slot (1-2 mono
// lines) under the footer; the heads row (a little red crate + the crate metric's label at the left, the money
// metric's label right-aligned over its column; caps, else sentence case, else two lines; with a third metric shown,
// its label in grey mono under the money head); then the lanes, bottom-up from the kit's floor line at y 1300 (at
// most 300 px each). Two lane layouts:
//   row  the title (name 44/40 px + behaviour mono 40 px on one line, or on two) sits on a row over the track,
//        starting over the crate; the money value (72 → 44 px) ends the row at x 922. He passes under the title bent
//        over, so his size comes from the band under it (his pencil may not reach the text). Long runs.
//   col  the titles stand in a column at the left (name, then behaviour or delta, wrapping balanced; no word and no
//        delta may break); the track starts right of it, he has the lane's full height, but the run is shorter.
// Deltas go, in the fitter's order of preference: 'own' (in the title, in place of the behaviour), 'under' (a 40 px
// line right-aligned under the money value), 'beside' (col only: on the money row, right-aligned 24 px left of its
// own value, clear of his reach), and only as the last resort 'pop' (each pops over its title for 2.4 s, the title
// giving way, and again for a `reads` of it). All but 'pop' stay to the last frame.
// A third metric ("Total paid") is a grey mono 40 px line under the money value, its label under the money head; it
// lands 0.4 s after the value. When the lanes have no room for it (4 lanes with long payoff strings, say) it is left
// out with a console warning; a fourth metric is always left out (with a warning).
// The crate is as tall as the lane allows under the money column (its pennant beside its top stays clear of the
// value), and a crate that reaches up beside the lines under a money value stops short of them; its face is one line
// ("72", "≈ 65", "11 yrs 5 mo"; as big as its inside allows) or, when every payoff is one number and a unit word and
// the crate is tall enough, the number over its unit ("60" / "months"), 41-56 px. The far side stays clear of the
// coin pile, and the figure behind the longest crate stays left of the money column. The score puts the money value
// first (60 px and up; under 60 costs 50 points plus 3 a px, so the figure, the run or the behaviours give way first),
// then figure size (0.36 and up, 0.3 at the least), run length (180 px and up, 120 at the least), crate face, the
// winner's growth on its plate, and pays for every give-way: behaviours dropped (the working lines carry them),
// two-line titles, 40 px names, deltas without a place of their own, the third metric left out, no coin pile. The 03a
// teaser (4 lanes, 3-line hook, 2-line footer, 2-line working lines) lands in col: money 60 px, figure 0.46.
//
// data: FORMATS.md §3 exactly: stake { label, value, terms }, metrics [{ key, label }] (the first time-like one is
// the crate's; the first money one the money column's and the coin pile's, with no money metric another metric takes
// the column and there is no pile; a third one the line under the money value), options [{ t, name, detail, values,
// delta?, tone? }] (2-4), winner, hold. option.t is when the lane WAKES. Options without t (and without resultT) are
// paced by the kit: the first at 1.6 s, each next one 2.2 s after the previous lane's last landing (its money value,
// third metric or delta), or 5.4 s apart when no option has a time; squeezed (gaps down to 0.7 s) so the last lands
// 0.6 s before the winner beat. Also read when present (other kits' extensions):
//   option.resultT   when that option's payoff LANDS, always honoured: the run keeps the shared speed when the lead-in
//                    allows, else it shortens (0.35 s at the least), and when even that does not fit he wakes before
//                    t. Without t, the lane wakes in time to land on it. <= 0: already run at frame 1
//   option.valueEvery / data.valueEvery   gap between the payoff landing and the money value (default 0.45 s)
//   option.deltaT    when the delta pops in (default 0.55 s after the money value, 0.8 s with a third metric)
//   option.note, option.noteT   a working line shown at noteT (default: when the money value lands)
//   data.winnerT     when the winner is crowned (default verdict.t, else 1.2 s after the last landing)
//
// lookOpts (all optional; it renders fully without them. The live-sheet teaser's keys carry over as they are):
//   formulas: [string | { t, text }]  a working line per option, shown in the slot from that option's wake (a
//                       pre-run option's from its first `reads` time, else 2 s). "\n" breaks the line; numbers print in
//                       ink, `**x**` in green, "−" in Inter (the mono minus reads as a hyphen). One line at a time, each
//                       held until the next; a line too long for two lines steps down to 38, then 36 px
//   steps: [{ t, text }]   extra working lines (the difference the VO speaks: "= $10,000 − $8,900\n≈ $1,100 less")
//   lever: { t, text, options: [i, j] }   the line that explains WHY: shown in the slot at t; the listed lanes'
//                       money values get a pale green band and bump, their crates pulse and their figures turn green
//                       and nod (`swipe`), until the next slot line (3.6 s at most)
//   reads: [{ t, option, metric }]   the VO reads a result already on screen: that money value (or crate, for the
//                       crate's metric; the third metric's line; or 'delta') bumps 12% and flashes in its own colour,
//                       and the lane's figure turns green for a moment (`tick`). option may be a list ([1, 2]: together)
//   scan: { t, every = 0.4, options }   "guess which one": from t the waiting lanes' figures hop in turn (green for
//                       the hop), their "?" popping (`tick`)
//   countCell: { option, metric, from: 'base' | number }   that lane's money value counts from the first option's (or
//                       `from`) to its display over 0.8 s as it lands, then settles from 110% (may be a list). The
//                       crate's metric always counts
//   stakeLine: false | string   the slot's frame-1 line (default "label · value · terms", leaving out whatever the
//                       hook or the footer already says; when it would wrap while every other slot line fits on one,
//                       it drops the label, then keeps the value alone)
//   heads: 'upper' | 'sentence' | false   the heads row's style (default caps, sentence case when caps collide;
//                       false also leaves out a third metric, which would have no label)
//   layout: 'row' | 'col'   pin a lane layout (default: the fitter's best)
//   pile: false         no coin piles (and no flying coins)
//   race: 1.8           seconds the longest run takes (every run moves at that one speed; each run >= 0.6 s)
//   figure: false       no figures (the crates slide by themselves)
//   figureScale: 0.5    cap the figure's size (it is already capped by the lane)
//   endPose: 'celebrate' | 'pump' | 'point'   the winner's pose after his jump (default: the biggest that fits)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup, rng,
  C, F, E, POSES, blendPose, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj, pinLimb,
  chromeParts, durationOf, numLike, fmtLike, measure, squashAt, fall, popIn, bump, hop, wobble, mix, mixOk, smooth,
} from '../lib.js'

const BAND = '#E6F6EE'      // lever band: a paler hero tint (heroInk text on it stays >= 3.5:1)
const GAP_H = 48, GAP_PADL = 9, GAP_PADR = 4, GAP_TIP = 11      // the gap label's banner: its height, the air left and right of its text, its point

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
.wd-ex { font-family: ${F.mono}; font-weight: 700; font-size: 40px; line-height: 48px; letter-spacing: -0.03em; color: ${C.grey}; white-space: nowrap; }
.wd-exhead { position: absolute; font: 700 40px/48px ${F.mono}; letter-spacing: -0.03em; color: ${C.grey}; text-align: right; white-space: nowrap; }
.wd-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 5px solid ${C.ink}; border-radius: 14px; transform-origin: 50% 50%; }
.wd-band { position: absolute; left: 0; top: 0; background: ${BAND}; border-radius: 14px; transform-origin: 50% 50%; }
.wd-crate-t { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.02em; word-spacing: 0.12em; }
.wd-glyph { position: absolute; overflow: visible; }
`

// ------------------------------------------------------------------------------------------------- constants
const XR = 922            // right edge of the money column (x <= 940 below y 820, with room for a shake)
const NAME_GAP = 24       // between the title (name + behaviour) and the money value
const FLOOR = 1300        // the last lane's floor = the kit's floor line
const S_MIN = 0.36, S_MAX = 0.8
const P_MAX = 300         // the most a lane is ever given (2 lanes): the rest stays above, under the slot
const KMAX = 7            // coins thrown by the most expensive lane
const SLOT_LH = 48
const PILE_RX = 23, PILE_RY = 7
const PILE_X = XR - PILE_RX     // the coin pile stands at the right edge, under the money value
const U_LH = 48, U_GAP = 8      // an under-line (a delta, an extra metric) under the money value: line box, gap

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// a pop for 40 px text that never dips under its size (an opacity ramp and a 6% overshoot): a pop from 0.82 would
// read under the 40 px floor for its first frames
const popUp = (t, t0, dur = 0.22, amp = 0.06) => (t < t0 ? { scale: 1, opacity: 0 } : { scale: 1 + amp * bump(t, t0, dur * 1.4), opacity: clamp(prog(t, t0, dur) * 3) })
const TONE_TXT = { bad: C.red, good: C.heroInk, goal: C.heroInk, neutral: C.ink }     // a delta's colour by tone

// local poses (lib.js §2 conventions; + = the way he faces, which is always right here)
const PZ = {
  think: { ...POSES.think, aF: [30, 140], tilt: 16 },
  wait: { lean: 8, tilt: 12, aF: [70, 30], aB: [34, 136], lF: [8, -4], lB: [-10, -2] },        // hand on chin, one on the crate
  airUp: { lean: -4, tilt: -18, aF: [150, 20], aB: [-150, -20], lF: [40, -70], lB: [-20, -50] },
  ready: { lean: 50, tilt: -22, aF: [92, 14], aB: [86, 20], lF: [40, -70], lB: [-36, -14] },
  strain: { lean: 52, tilt: -26, aF: [90, 8], aB: [84, 14], lF: [40, -64], lB: [-44, -6] },
  crouch: { lean: 54, tilt: -24, aF: [90, 10], aB: [84, 16], lF: [70, -120], lB: [30, -96] },
  push: { lean: 50, tilt: -24, aF: [90, 8], aB: [84, 14], lF: [40, -60], lB: [-40, -8] },
  recoil: { lean: 44, tilt: -16, aF: [70, 30], aB: [60, 36], lF: [44, -80], lB: [-20, -50] },
  knees: { lean: 44, tilt: 22, aF: [36, 8], aB: [30, 10], lF: [44, -78], lB: [26, -70] },      // hands on knees, panting
  slump: { lean: 40, tilt: 40, aF: [10, 6], aB: [4, 4], lF: [40, -76], lB: [22, -66] },
  pumpLow: { lean: 26, tilt: -4, aF: [70, 100], aB: [-40, 40], lF: [44, -80], lB: [-26, -46] },    // fist up, knees bent
  punch: { lean: 48, tilt: -14, aF: [104, 30], aB: [20, 20], lF: [44, -78], lB: [26, -70] },       // a fist forward, from the crouch
  shrugLow: { lean: 30, tilt: 12, aF: [50, 110], aB: [-40, -100], lF: [40, -74], lB: [-20, -50] },
  nod: { lean: 40, tilt: 34, aF: [36, 8], aB: [30, 10], lF: [44, -78], lB: [26, -70] },
  win: { lean: -6, tilt: -18, aF: [128, -10], aB: [-128, 10], lF: [16, -10], lB: [-16, -8] },      // a wide V: the head between
  winLow: { lean: -4, tilt: -18, aF: [126, -10], aB: [-126, 10], lF: [52, -96], lB: [-26, -64] },  // arms up, knees bent
  yes: { lean: 8, tilt: -8, aF: [62, 112], aB: [-34, 30], lF: [34, -60], lB: [-16, -20] },          // the "yes!" fist pump
  point: { lean: 4, tilt: -14, aF: [128, 6], aB: [-16, 22], lF: [10, -6], lB: [-12, -4] },
}
const BODY = ['hip', 'nk', 'sh', 'head', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']

// a pose's height at scale 1, feet planted: its body (limbs with half the stroke, head) and, separately, the top of
// the pencil behind his head (it rises as he leans forward; a thin line, it may brush a lane line, never text)
function poseTop(p, pencil = false, hipY = null) {
  const J = hipY == null ? fk(p, { x: 0, ground: 0, scale: 1 }) : fk(p, { x: 0, y: -hipY, scale: 1 })
  const body = -Math.min(J.head[1] - J.R, J.hF[1] - 6.5, J.hB[1] - 6.5, J.eF[1] - 6.5, J.eB[1] - 6.5)
  if (!pencil) return body
  const a = (J.headRot * Math.PI) / 180, R = J.R
  return Math.max(body, -(J.head[1] - 2.0 * R * Math.sin(a) - 1.35 * R * Math.cos(a) - 3))
}
// his heights under a title row (every pose he takes there; + the run's bob) and standing in the start gutter
// (the run's legs are procedural: his hips ride at 92 px, bobbing 3, whatever the push pose's legs say)
const LOW = ['ready', 'strain', 'crouch', 'recoil', 'knees', 'slump', 'nod', 'punch']
const PUSH_H = Math.ceil(Math.max(poseTop(PZ.push, false, 95), ...LOW.map(k => poseTop(PZ[k]))) + 4)
const PUSH_P = Math.ceil(Math.max(poseTop(PZ.push, true, 95), ...LOW.map(k => poseTop(PZ[k], true))) + 4)
const STAND_H = Math.ceil(Math.max(poseTop(PZ.wait), poseTop(PZ.think)) + 2)
const STAND_P = Math.ceil(Math.max(poseTop(PZ.wait, true), poseTop(PZ.think, true)) + 2)

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
/** "≈ 18.3 years" -> { n: "≈ 18.3", u: "years" }: ONE number, then unit words (no digits in them). Anything else
 *  ("11 yrs 5 mo", "72") -> { n: str, u: '' } (a compound payoff never splits over two lines) */
function splitUnit(str) {
  const m = /^([^\d]*\d(?:[\d,.]*\d)?)\s+([A-Za-z][A-Za-z .]*)$/.exec(String(str))
  return m ? { n: m[1], u: m[2] } : { n: String(str), u: '' }
}
/** "11 yrs 5 mo": more than one number-and-unit pair */
const PAIR = /(\d[\d,]*(?:\.\d+)?)\s*([A-Za-z]+)?/g
const pairsOf = str => [...String(str).split('(')[0].matchAll(PAIR)].map(m => ({ v: parseFloat(m[1].replace(/,/g, '')), u: m[2] ? unitOf(m[2]) : null, word: m[2] || '' }))
const isCompound = str => { const p = pairsOf(str); return p.length > 1 && p.every(x => x.u != null) }

/** running counter text in the style of `disp`, without its "≈" (the "≈" only comes with the landed string).
 *  A compound payoff ("11 yrs 5 mo") counts its leading unit only ("0 yrs" ... "11 yrs", whole units passed, from
 *  `months` of progress), and the exact string pops in on landing */
function rollText(p, from, disp, months = null) {
  if (p >= 1) return String(disp)
  if (months != null && isCompound(disp)) {
    const m = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\s*[A-Za-z]+)/.exec(String(disp))
    const lead = pairsOf(disp)[0]
    return m[1].replace(/≈\s*/g, '').replace(/^\s+/, '') + Math.floor(clamp(p) * months / lead.u + 1e-9) + m[3]
  }
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
  // a third metric ("Total paid") is shown as a smaller grey line under the money value, with its label under the
  // money head (when the fitter finds room; else it is left out with a warning). A fourth is always left out
  const exMs = metrics.filter(m => m !== barM && m !== sideM)
  const exM = exMs[0] || null
  if (exMs.length > 1) console.warn(`what-difference (becker-rig): metrics ${exMs.slice(1).map(m => `"${m.key}"`).join(', ')} not shown (at most 3 metrics)`)
  const barUnit = unitOf(barM.label) || 1
  // months, for geometry only: every number-and-unit pair counts ("11 yrs 5 mo" = 137); a bare number takes the
  // unit of the metric's label, else months
  const monthsOf = str => {
    const ps = pairsOf(str)
    if (!ps.length) return 1
    const sum = ps.length > 1 && ps.every(p => p.u != null) ? ps.reduce((a, p) => a + p.v * p.u, 0) : ps[0].v * (ps[0].u ?? unitOf(str) ?? barUnit)
    return Math.max(0, sum)
  }
  const wantPile = !!sideM && isMoney(valsOf(sideM)) && lo.pile !== false
  const showFig = lo.figure !== false
  const fin = x => x != null && x !== '' && Number.isFinite(+x)

  // ================================================================== timing
  // option.t is when its lane wakes, option.resultT when its payoff lands (always honoured). With neither, the kit
  // paces it: the first at 1.6 s, each next one 2.2 s after the previous lane's last landing (5.4 s apart when no
  // option has a time), squeezed (gaps down to 0.7 s) so the last lands before the winner beat
  const RACE = Number.isFinite(+lo.race) && +lo.race > 0.4 ? +lo.race : 1.8
  const dVal = fin(d.valueEvery) ? +d.valueEvery : 0.45
  const lanes = opts.map((o, i) => {
    const B = sideM ? numOf(String(o.values[sideM.key])) : 0
    return { i, o, name: String(o.name ?? ''), detail: o.detail != null ? String(o.detail) : '', delta: o.delta != null ? String(o.delta) : '',
      tone: o.tone || 'neutral', bar: String(o.values[barM.key]), side: sideM ? String(o.values[sideM.key]) : '',
      ex: exM ? String(o.values[exM.key]) : '', M: monthsOf(String(o.values[barM.key])), B: Number.isFinite(B) ? Math.abs(B) : 0 }
  })
  const Mmax = Math.max(1e-6, ...lanes.map(l => l.M))
  const Bmax = Math.max(1e-6, ...lanes.map(l => l.B))
  const secPerM = RACE / Mmax
  const LEAD = 0.42           // wake -> push-off: he steps back and leans in
  function timeLane(l, wake, nextWake) {
    const o = l.o
    let natural = Math.max(0.6, l.M * secPerM)
    const rT = fin(o.resultT) ? +o.resultT : null
    if (l.pre) {
      l.tLand = Math.min(rT ?? -0.6, -0.6); l.tStart = l.tLand - natural; l.actT = l.tStart - 0.5
    } else if (rT != null) {
      // the payoff lands on resultT: at the shared speed when the lead-in allows, else a shorter run (>= 0.35 s);
      // when even that does not fit he wakes before t
      const lead = clamp(rT - wake - 0.35, 0.3, LEAD)
      l.actT = Math.min(wake, rT - 0.35 - lead)
      l.tStart = Math.max(rT - natural, l.actT + lead)
      l.tLand = rT
    } else {
      l.actT = wake; l.tStart = wake + LEAD
      // two lanes never push at once: a run ends 0.8 s before the next lane wakes (0.6 s at the least)
      if (nextWake != null) natural = Math.min(natural, Math.max(0.6, nextWake - l.tStart - 0.8))
      l.tLand = l.tStart + natural
    }
    l.run = l.tLand - l.tStart
    const ve = fin(o.valueEvery) ? +o.valueEvery : dVal
    l.tVal = l.pre ? l.tLand : l.tLand + (sideM ? ve : 0)
    l.tEx = l.pre ? l.tLand : l.tVal + 0.4
    l.tDelta = l.delta ? (fin(o.deltaT) ? +o.deltaT : l.tVal + (exM ? 0.8 : 0.55)) : null
    if (l.pre && l.tDelta != null && !fin(o.deltaT)) l.tDelta = -0.1
    l.end = Math.max(l.tLand, l.tVal, exM ? l.tEx : -1, l.tDelta ?? -1)
  }
  const anyTime = opts.some(o => fin(o.t) || fin(o.resultT))
  const paced = opts.some(o => !fin(o.t) && !fin(o.resultT))
  const winTarget = fin(d.winnerT) ? +d.winnerT : vt
  for (const gap of anyTime ? [2.2, 1.8, 1.4, 1.0, 0.7] : [5.4, 4.6, 3.8, 3.2, 2.6, 2.0]) {
    let prev = null
    lanes.forEach((l, i) => {
      const o = l.o
      const tE = fin(o.t) ? +o.t : null, rT = fin(o.resultT) ? +o.resultT : null
      // already run at frame 1 only when its t (or resultT) says so
      l.pre = (tE != null && tE <= 0 && (rT == null || rT <= 0.05)) || (rT != null && rT <= 0.05)
      const wake = tE != null ? tE
        : rT != null ? Math.max(0, rT - Math.max(0.6, l.M * secPerM) - LEAD)
          : !anyTime ? 1.6 + gap * i
            : prev == null ? 1.6 : Math.max(1.6, prev.end + gap)
      // the next lane to wake (a given t, or the even pacing), for the run's cap
      const wakes = lanes.map((x, j) => (!anyTime ? 1.6 + gap * j : fin(x.o.t) && !fin(x.o.resultT) ? +x.o.t : null))
        .filter((w, j) => j !== i && w != null && w > wake + 0.05)
      timeLane(l, wake, wakes.length ? Math.min(...wakes) : null)
      prev = l
    })
    if (!paced || winTarget == null || Math.max(...lanes.map(l => l.end)) <= winTarget - 0.6) break
  }
  // the newest money value lands in its tone's colour; a good one settles to ink when the next lane lands
  const landOrder = lanes.map(l => l.tLand).sort((a, b) => a - b)
  for (const l of lanes) {
    const nxt = landOrder.find(x => x > l.tLand + 1e-6)
    l.settleT = l.pre ? -1 : (nxt != null ? Math.max(nxt, l.tVal + 0.6) : l.end + 1.6)
  }
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < n ? d.winner : null
  const lastVal = Math.max(...lanes.map(l => l.end))
  const winT = winner == null ? null : (fin(d.winnerT) ? +d.winnerT : vt != null ? vt : lastVal + 1.2)

  // ---- lookOpts beats
  const asList = x => (Array.isArray(x) ? x : x != null ? [x] : [])
  const okLane = i => Number.isInteger(i) && i >= 0 && i < n
  const reads = asList(lo.reads).filter(r => r && Number.isFinite(+r.t)).map(r => ({
    t: +r.t, lanes: asList(r.option).filter(okLane), key: r.metric || barM.key,
  })).filter(r => r.lanes.length)
  const lever = lo.lever && typeof lo.lever === 'object' && Number.isFinite(+lo.lever.t)
    ? { t: +lo.lever.t, text: String(lo.lever.text || ''), lanes: asList(lo.lever.options).filter(okLane), end: +lo.lever.t + 3.6,
      // (lever.beats: the VO's later words that drive the lever home, "13 ... payments": the lanes nod and bump again)
      beats: asList(lo.lever.beats).map(Number).filter(x => Number.isFinite(x) && x > +lo.lever.t + 0.3).sort((a, b) => a - b) } : null
  if (lever && lever.beats.length) lever.end = Math.max(lever.end, lever.beats[lever.beats.length - 1] + 0.9)
  const leverBeats = lever ? [lever.t, ...lever.beats] : []
  const counts = asList(lo.countCell).filter(c => c && okLane(c.option) && sideM && (c.metric == null || c.metric === sideM.key))
  // scan: the waiting lanes' figures hop in turn
  const hops = lanes.map(() => [])
  if (lo.scan && Number.isFinite(+lo.scan.t)) {
    const every = Number.isFinite(+lo.scan.every) && +lo.scan.every > 0.1 ? +lo.scan.every : 0.4
    const list = asList(lo.scan.options).filter(okLane)
    const order = list.length ? list : lanes.filter(l => !l.pre && l.actT > +lo.scan.t + 0.3).map(l => l.i)
    order.forEach((li, j) => { const tt = +lo.scan.t + j * every; if (lanes[li].actT > tt + 0.3) hops[li].push(tt) })
  }
  // pat: "this loan": the waiting figures pat their crates (the resting hand lifts and drops back on the crate's corner,
  // the crate swells a little on contact, a soft tick), top lane first, `every` apart
  const PAT = 0.34                 // a pat: the hand's lift and drop (contact at the end)
  const pats = lanes.map(() => [])
  if (lo.pat && Number.isFinite(+lo.pat.t)) {
    const every = Number.isFinite(+lo.pat.every) && +lo.pat.every >= 0 ? +lo.pat.every : 0.08
    const list = asList(lo.pat.options).filter(okLane)
    const order = list.length ? list : lanes.filter(l => !l.pre).map(l => l.i)
    order.forEach((li, j) => {
      const tt = +lo.pat.t + j * every
      // (only while he waits, clear of his scan hops)
      if (lanes[li].actT > tt + PAT + 0.2 && hops[li].every(th => Math.abs(th - tt) > PAT + 0.1)) pats[li].push(tt)
    })
  }

  // ---- working slot entries (one at a time; each holds until the next)
  const hookTxt = plain(spec.header || '')
  const slotIn = []
  // the stake line leaves out what the hook or the footer already says ("24% APR"), and every "·" binds to the word
  // before it (a no-break space), so a wrap never starts a line with a separator
  const said = (hookTxt + ' \n ' + plain(spec.footer || '')).toLowerCase()
  const stakeParts = [stake.label, stake.value, ...String(stake.terms || '').split(/\s*·\s*/)]
    .map(x => (x == null ? '' : String(x).trim())).filter(x => x && !said.includes(x.toLowerCase()))
  const stakeText = lo.stakeLine === false ? null : typeof lo.stakeLine === 'string' ? lo.stakeLine : stakeParts.join(' · ') || null
  // (shorter forms, for when the full line would wrap while every other slot line fits on one: without the label,
  // then the value alone)
  const stakeAlts = typeof lo.stakeLine === 'string' ? [] : [stakeParts.filter(x => x !== stake.label), stakeParts.filter(x => x === stake.value)]
    .map(ps => ps.join('\u00A0· ')).filter(x => x && x !== stakeText)
  if (stakeText) slotIn.push({ t: -1e9, text: stakeText, kind: 'stake', alts: stakeAlts })
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
  const slotHTML = text => (/\*\*|__/.test(text) ? markup(text)
    : esc(text).replace(/(≈\s*)?[−-]?\$?\d[\d,]*(\.\d+)?(%|[KMBT]\b)?/g, m => `<b>${m}</b>`).replace(/\n/g, '<br>')).replace(/−/g, '<span class="op">−</span>')
  const slotEls = slotE.map(x => {
    const el = h('div', { class: 'wd-slot', style: { top: top + 'px', opacity: '0', transform: 'none', display: 'none' } })
    el.innerHTML = slotHTML(x.text)
    fixed.append(el)
    el.style.display = ''
    let px = 40
    while (el.offsetHeight > 2 * SLOT_LH + 1 && px > 36) { px -= 2; style(el, { fontSize: px + 'px', lineHeight: Math.round(px * 1.2) + 'px' }) }
    x.lines = Math.max(1, Math.round(el.offsetHeight / SLOT_LH))
    el.style.display = 'none'
    return el
  })
  // the stake line gives way first: it never makes the slot taller than the working lines need
  const otherLines = Math.max(1, ...slotE.filter(x => x.kind !== 'stake').map(x => x.lines))
  slotE.forEach((x, j) => {
    if (x.kind !== 'stake' || x.lines <= otherLines) return
    const el = slotEls[j]
    el.style.display = ''
    for (const alt of x.alts) {
      style(el, { fontSize: '40px', lineHeight: SLOT_LH + 'px' })
      el.innerHTML = slotHTML(alt)
      if (el.offsetHeight <= otherLines * SLOT_LH + 1) { x.text = alt; x.lines = otherLines; break }
    }
    el.style.display = 'none'
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
  const monoW = txt => mw(String(txt), `700 40px ${F.mono}`, { letterSpacing: '-0.03em' })
  const exHeadW = exM ? monoW(plain(exM.label)) : 0
  // the heads row; with the third metric shown, its label (mono, grey, like its values) under the money head, and
  // the crate's head beside it (or up on the money head's line when they would collide)
  const headsFor = ex => {
    if (lo.heads === false) return { heads: null, headsH: 0 }
    const exH = ex ? U_LH : 0
    for (const st of lo.heads === 'sentence' ? ['sent'] : ['up', 'sent']) {
      const wl = GLYPH_W + headW(barM.label, st), wr = sideM ? headW(sideM.label, st) : 0
      if (62 + wl + 30 <= XR - Math.max(wr, ex ? exHeadW : 0)) return { heads: { st, lines: 1, wl, wr, ex, up: false }, headsH: 56 + exH }
      if (ex && 62 + wl + 30 <= XR - wr && 62 + 30 <= XR - exHeadW) return { heads: { st, lines: 1, wl, wr, ex, up: true }, headsH: 56 + exH }
    }
    const st = lo.heads === 'sentence' ? 'sent' : 'up'
    return { heads: { st, lines: 2, wl: Math.min(GLYPH_W + headW(barM.label, st), 520), wr: sideM ? Math.min(headW(sideM.label, st), 300) : 0, ex, up: true }, headsH: 100 + exH }
  }
  const UNITS = lanes.every(l => splitUnit(l.bar).u)
  const unitW = u => mw(u, `800 40px ${F.head}`, { letterSpacing: '-0.01em' })
  // dMode: where the deltas go. 'own': in the title (in place of the behaviour); 'under': a line under the money
  // value, right-aligned (it stays); 'pop': no room at all (each pops over its title for 2.4 s: the last resort).
  // exOn: the third metric's line under the money value. WS: the winner's money value grows to WS on its plate (the
  // money row keeps that much headroom in every lane)
  // a 'beside' delta's right edge: 24 px left of its own money value (38 px left of the winner's grown value: its
  // plate reaches 20 px past it, and opens with a ~10 px overshoot)
  const besideR = (l, VS, WS) => XR - (sideM ? valW(l.side, VS) * (l.i === winner ? WS : 1) : 0) - (l.i === winner && sideM ? 38 : 24)
  function geometry(mode, VS, NS, two, withDetail, TWc, dMode, exOn, WS) {
    const own = dMode === 'own'
    const dW = l => (own ? deltaW(l) : 0), dL = (l, w) => (own ? deltaLines(l, w) : 0)
    const valWL = l => (sideM ? valW(l.side, VS) * (l.i === winner ? WS : 1) + (l.i === winner && WS > 1 ? 10 : 0) : 0)
    const colW = Math.max(0, ...lanes.map(valWL))
    const colL = XR - colW
    const HD = headsFor(exOn)
    const P = Math.min(P_MAX, (FLOOR - top - HD.headsH) / n)
    const headR = sideM && winner != null ? Math.ceil(0.9 * VS * (WS - 1)) : 0
    const valB = 6 + headR + Math.max(sideM ? VS : 0, 48) + 2      // the money value's bottom, from the lane's top
    // the lines under the money value (a third metric, an 'under' delta): their count, their widest, their bottom
    const uLines = l => (exOn ? 1 : 0) + (dMode === 'under' && l.delta ? 1 : 0)
    const uW = l => Math.max(exOn ? monoW(l.ex) : 0, dMode === 'under' && l.delta ? deltaW(l) : 0)
    const uB = u => valB + U_GAP + U_LH * u
    let room, RH, figH, X0c, TW = 0, titleH = 0
    let ok = lanes.every(l => !uLines(l) || uB(uLines(l)) + 4 <= P)
    if (mode === 'row') {
      RH = (two ? 48 : 0) + valB - 6
      figH = P - RH - 16                                      // under the title row
      const sc0 = Math.min(S_MAX, (figH - 2) / PUSH_H, (figH + 2) / PUSH_P)
      X0c = Math.max(96, Math.round(24 + 84 * sc0 + 13 + 112 * sc0))
      room = (sideM ? colL - NAME_GAP : XR) - X0c
      ok = ok && lanes.every(l => {
        const rm = (sideM ? XR - valWL(l) - NAME_GAP : XR) - X0c
        const det = withDetail ? Math.max(detW(l), dW(l)) : dW(l)
        // (a second title line shares its height with the lines under the money value)
        const clear = !two || !det || !uLines(l) || X0c + det + 16 <= XR - uW(l)
        return clear && (two ? nameW(l, NS) <= rm && det <= rm : nameW(l, NS) + (det ? 16 + det : 0) <= rm)
      })
    } else {
      // the column: as wide as its longest name or behaviour, 150-330 px; wrapping balanced
      TW = Math.round(clamp(Math.max(...lanes.map(l => Math.max(nameW(l, NS), withDetail ? detW(l) : 0, dW(l)))), 150, 330))
      if (TWc) TW = Math.min(TW, TWc)
      titleH = Math.max(...lanes.map(l => 48 * (nameLines(l, NS, TW) + Math.max(withDetail ? detLines(l.detail, TW) : 0, dL(l, TW)))))
      // no single word may be wider than the column (it would overflow under the figure, not wrap)
      const words = l => [
        ...plain(l.name).split(/\s+/).map(w => mw(esc(w), `800 ${NS}px ${F.head}`, { letterSpacing: '-0.02em', html: true })),
        ...(withDetail ? l.detail.split(/\s+/).map(w => (w ? mw(w, `700 40px ${F.mono}`, { letterSpacing: '-0.03em' }) : 0)) : []),
        ...(own && l.delta ? l.delta.split(/\s+/).map(w => (w ? mw(w, `800 40px ${F.head}`, { letterSpacing: '-0.01em' }) : 0)) : []),
      ]
      // ... and a delta is one line (a lone "less" or "sooner" on a line of its own reads as a stray word)
      ok = ok && titleH <= P - 10 && (!sideM || 60 + TW + 30 <= colL) && lanes.every(l => Math.max(0, ...words(l)) <= TW + 0.5 && (!own || deltaW(l) <= TW + 0.5)
        && (!uLines(l) || 60 + TW + 30 <= XR - uW(l)))
      RH = valB - 6
      figH = P - 12
      const sc0 = Math.min(S_MAX, (figH - 2) / PUSH_H, (P - 12) / STAND_H, (P + 6) / STAND_P)
      X0c = Math.round(60 + TW + 30 + 112 * sc0)
      room = TW
    }
    let sc = Math.min(S_MAX, (figH - 2) / PUSH_H, (P - 12) / STAND_H, (P + 6) / STAND_P, mode === 'row' ? (figH + 2) / PUSH_P : 9)
    if (Number.isFinite(+lo.figureScale)) sc = Math.min(sc, +lo.figureScale)
    if (!showFig) sc = Math.max(0.4, sc)
    // the crate: as tall as the lane allows under the money column (the pennant beside its top stays clear)
    // Its face is one line ("72", "60 months"), or two when every payoff ends in a unit word and the crate is tall
    // enough: the number over its unit ("≈ 18.3" / "years"), which keeps a long string from making a long crate
    const Hc = Math.round(clamp(Math.min(P - valB - 14, mode === 'row' ? figH + 4 : P - 20), 46, Math.min(112, 180 * sc + 24)))
    // (one line: as big as the crate's inside allows, 7 px or more above and below its caps)
    let face = 1, CT = Math.round(clamp(Math.min(Hc * 0.7 + 8, Hc - 14), 40, 52))
    let crateW = Math.max(Hc * 1.15, ...lanes.map(l => valW(l.bar, CT)), valW('?', CT)) + 38
    if (UNITS && Hc >= 101) {
      const CT2 = Math.min(56, Math.floor((Hc - 8 - 49 + 5) / 1.22))
      const W2 = Math.max(Hc, ...lanes.map(l => Math.max(valW(splitUnit(l.bar).n, CT2), unitW(splitUnit(l.bar).u))), valW('?', CT2)) + 38
      if (W2 < crateW - 16) { face = 2; CT = CT2; crateW = W2 }
    }
    crateW = Math.round(crateW)
    // the coin pile (under the money value, at the right edge) stays under the lines below it: one scale for every
    // lane, and no pile at all when the tallest would be under 22 px
    let pileMax = wantPile ? P - valB - 16 : 0
    if (wantPile) for (const l of lanes) if (uLines(l) && l.B > 0) pileMax = Math.min(pileMax, (P - uB(uLines(l)) - 10) * Bmax / l.B)
    const pileOn = wantPile && pileMax >= 22
    // the far side: clear of the pile, and the figure behind the longest crate stays left of the money column
    let XF = Math.min(pileOn ? PILE_X - PILE_RX - 50 : 880, sideM ? colL - 14 + crateW : 880)
    // ... and a crate (with its pennant) that would reach up beside the lines under its money value stops short of them
    const X0f = X0c + crateW
    for (const l of lanes) {
      if (!uLines(l) || P - Hc - 12 >= uB(uLines(l)) + 4 || l.M <= 0) continue
      XF = Math.min(XF, X0f + (XR - uW(l) - 54 - X0f) * Mmax / l.M)
    }
    const RUN = XF - X0c - crateW
    // 'beside' (the column layout): each delta stands on the money row, right-aligned 24 px left of its own money
    // value (its plate, for the winner), clear of the title column and of his reach where his crate stops (crates
    // stay under the money row)
    if (dMode === 'beside') {
      ok = ok && mode === 'col' && lanes.every(l => {
        if (!l.delta) return true
        const xEnd = X0f + (l.M / Mmax) * Math.max(120, RUN), dL = besideR(l, VS, WS) - deltaW(l)
        // (his front reaches 100 x scale past his hip at the most: his head as he leans in, a fist; the winner steps
        // back before his jump)
        const back = l.i === winner ? clamp(xEnd - X0f - 12 * sc, 0, 18) : 0
        return dL >= 60 + TW + 30 && dL >= xEnd - crateW - 122 * sc + 100 * sc - back + 8
      })
    }
    return { mode, VS, NS, two, withDetail, dMode, exOn, WS, HD, colW, colL, P, valB, headR, uB, uLines, uW, RH, figH, sc, reach: 112 * sc,
      X0c, TW, titleH, Hc, CT, face, crateW, XF, RUN, room, pileOn, pileMax, ok }
  }
  let G = null, best = -Infinity
  // every combination, scored: big money first (60 px and up), then a big figure (0.36 and up; 0.3 at the least), a
  // long run (180 px and up; 120 at the least), a big crate face; behaviours kept when there are any; deltas with
  // room of their own; the third metric shown; the winner's value growing on its plate
  const anyDetail = lanes.some(l => l.detail), anyDelta = lanes.some(l => l.delta)
  const canEx = !!exM && !!sideM && lo.heads !== false
  for (const dMode of anyDelta ? ['own', 'under', 'beside', 'pop'] : ['own']) for (const exOn of canEx ? [true, false] : [false])
    for (const WS of sideM && winner != null ? [1.15, 1.08, 1] : [1]) for (const mode of ['row', 'col'])
      for (const withDetail of anyDetail ? [true, false] : [false]) for (const two of mode === 'row' ? [false, true] : [false])
        for (const TWc of mode === 'row' ? [0] : [0, 300, 260, 220, 180]) for (const VS of [72, 68, 64, 60, 56, 52, 48, 44]) for (const NS of [44, 40]) {
          if ((lo.layout && lo.layout !== mode) || (dMode === 'beside' && mode !== 'col')) continue
          const g = geometry(mode, VS, NS, two, withDetail, TWc, dMode, exOn, WS)
          if (!g.ok || g.RUN < 120 || (showFig && g.sc < 0.3) || g.CT < 41) continue
          const score = 2 * Math.min(VS, 64) + 0.5 * Math.max(0, VS - 64) - (VS < 60 ? 50 : 0)
            + 150 * Math.min(g.sc, 0.6) + 0.12 * Math.min(g.RUN, 560) + 0.6 * g.CT
            - (g.sc < S_MIN && showFig ? 30 : 0) - 0.3 * Math.max(0, 180 - g.RUN)
            - (two ? 4 : 0) - (NS < 44 ? 3 : 0) - (anyDetail && !withDetail ? 40 : 0)
            - (dMode === 'pop' ? 60 : dMode === 'beside' ? 5 : dMode === 'under' ? 2 : 0) - (exM && !exOn ? 45 : 0) + 80 * (WS - 1) - (wantPile && !g.pileOn ? 6 : 0)
          if (score > best) { best = score; G = g }
        }
  // nothing fits: the smallest layout (the linter will say why)
  if (!G) G = geometry('row', 44, 40, false, false, 0, anyDelta ? 'pop' : 'own', false, 1)
  if (exM && !G.exOn) console.warn(`what-difference (becker-rig): no room for the "${exM.key}" metric's line; it is not shown`)
  probe.remove()
  const { VS, NS, two, colL, P, X0c, Hc, CT, crateW, XF } = G
  const HEADS = G.HD
  const FACE2 = G.face === 2
  const COL = G.mode === 'col'
  const UNDER = G.dMode === 'under', BESIDE = G.dMode === 'beside', POP = G.dMode === 'pop', EX = G.exOn
  const WS = G.WS
  const showPile = G.pileOn
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
    l.pileH = showPile ? Math.max(18, G.pileMax) * l.B / Bmax : 0
    // the lines under the money value: the third metric, then an 'under' delta
    l.uN = G.uLines(l)
    l.exY = EX ? l.yT + G.uB(1) : null
    l.dUY = UNDER && l.delta ? l.yT + G.uB(EX ? 2 : 1) : null
    l.uBottom = l.yT + (l.uN ? G.uB(l.uN) : G.valB)
    l.dBx = besideR(l, VS, WS)
    if (COL) {
      l.nameXY = [60, l.yT + 8]
      l.detXY = [60, l.yT + 8 + 48 * nameLines(l, NS, G.TW)]
    } else {
      const rowB = l.yT + 6 + G.RH
      l.nameXY = [X0c, two ? rowB - 48 : rowB]
      l.detXY = two ? [X0c, rowB] : [X0c + nameW(l, NS) + 16, rowB]
    }
    l.poleH = poleH
  }

  // ---- the winner's plate: it hugs its value (the glyphs' ink box, its 6 px border and 2 px of air). The value grows
  // to WS on it only when the plate then keeps >= 14 px clear of the lane line above and of the crate and pennant under
  // it; else to 1.08x (or not at all, when 1.08x would leave under 4 px), and it shifts a few px to centre the plate
  // between them. The pennant under the plate then flies level with the crate's top instead of above it
  const inkCtx = document.createElement('canvas').getContext('2d')
  const inkV = (text, px) => {
    // ink top and bottom of a value, in px above the bottom of its line box (line-height = font size)
    inkCtx.font = `900 ${px}px ${F.head}`
    const m = inkCtx.measureText(text)
    const base = (px - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent
    return { top: px - (base - m.actualBoundingBoxAscent), bot: px - (base + m.actualBoundingBoxDescent) }
  }
  const PLATE_PAD = 6               // its 5 px border and 1 px of air
  const plateAt = (l, S, dy = 0) => {
    const ink = inkV(l.side, VS)
    return { x0: XR - valW(l.side, VS) * S - 20, x1: XR + 16, y0: l.yRowB + dy - ink.top * S - PLATE_PAD, y1: l.yRowB + dy - ink.bot * S + PLATE_PAD }
  }
  let WSe = 1, plateDY = 0
  if (winner != null && sideM) {
    const l = lanes[winner]
    const above = l.yT + 2                                 // the lane line above (or the heads' rule), its stroke's bottom
    const pen = (x0, x1) => x1 > l.xEnd + 3 && x0 < l.xEnd + 46
    const below = (p, poleTop) => Math.min(
      p.x1 > l.xEnd - crateW - 4 && p.x0 < l.xEnd + 4 ? l.yF - Hc - 4 : Infinity,      // the crate's top stroke
      pen(p.x0, p.x1) ? l.yF - poleTop - 3 : Infinity,                                   // the pennant
      l.uN ? l.yRowB + U_GAP : Infinity)                                                  // a line under the value
    const fit = S => {
      const p = plateAt(l, S)
      const lo_ = below(p, Math.min(poleH, Hc))
      const h_ = p.y1 - p.y0, room = lo_ - above
      // (centred, unless a line under the value pins it)
      const dy = l.uN ? 0 : clamp(above + (room - h_) / 2 - p.y0, -6, 6)
      return { S, dy, clear: Math.min(p.y0 + dy - above, lo_ - (p.y1 + dy)) }
    }
    const tries = [WS, 1.08, 1].filter((x, j, a) => x <= WS && a.indexOf(x) === j).map(fit)
    const pick = tries.find(f => f.clear >= 14) || tries.find(f => f.S <= 1.08 && f.clear >= 4) || tries[tries.length - 1]
    WSe = pick.S; plateDY = pick.dy
    l.plateB = plateAt(l, WSe, plateDY)
    // the pennant under the plate flies level with the crate's top (never above it, into the plate)
    if (pen(l.plateB.x0, l.plateB.x1)) l.poleH = clamp(Math.floor(l.yF - l.plateB.y1 - 6), Hc - 8, poleH)
  }
  for (const l of lanes) if (!l.plateB) l.plateB = sideM ? plateAt(l, 1) : null

  // ---- lookOpts.gapLabel: the time the winner saved, as an object. His flag's pennant unfurls into a banner that
  // carries the label (a spec display string, "≈ 12 mo") over his time-saved strip, toward the far side: it hangs from
  // the pole top, under his plate and clear of the coin pile; left out (with a warning) when it has no room there
  const gapSpec = lo.gapLabel == null || winner == null ? null : typeof lo.gapLabel === 'string' ? { text: lo.gapLabel }
    : lo.gapLabel.text ? { text: String(lo.gapLabel.text), t: Number.isFinite(+lo.gapLabel.t) ? +lo.gapLabel.t : null } : null
  let gapLab = null
  if (gapSpec) {
    const l = lanes[winner]
    const w = mw(gapSpec.text, `800 40px ${F.head}`, { letterSpacing: '-0.01em' }) + 0.1 * 40 * (gapSpec.text.split(' ').length - 1)
    const bx0 = l.xEnd + 5 + 2, bw = Math.ceil(GAP_PADL + w + GAP_PADR + GAP_TIP), bx1 = bx0 + bw
    const by0 = l.yF - l.poleH, by1 = by0 + GAP_H
    const right = showPile ? PILE_X - PILE_RX - 6 : XR
    const overPlate = l.plateB && bx1 > l.plateB.x0 ? l.plateB.y1 + 4 : -Infinity
    const overUnder = l.uN && bx1 > XR - G.uW(l) - 8 ? l.uBottom + 6 : -Infinity
    if (XF - l.xEnd > 14 && bx1 <= right && by0 >= Math.max(overPlate, overUnder, l.yT + 4) && by1 <= l.yF - 6)
      gapLab = { ...gapSpec, w, bw, tx: bx0 + GAP_PADL, ty: by1 }
    else console.warn(`what-difference (becker-rig): no room for gapLabel "${gapSpec.text}" on the winner's flag; it is left out`)
  }

  // ================================================================== build
  const world = makeWorld(ctx, { floor: false })
  const g = world.g
  const fxk = makeFx(world, ctx)
  const cam = camera(world)

  // heads (fixed: they never shake): a little crate + the crate's metric at the left; the money head right
  if (HEADS.heads) {
    const HD = HEADS.heads, H2 = HD.lines * 44, exH = HD.ex ? U_LH : 0
    const bL = headsBottom - (HD.up ? exH : 0), bR = headsBottom - exH      // the left and the money head's bottoms
    const cls = 'wd-head' + (HD.st === 'sent' ? ' sent' : '') + (HD.lines > 1 ? ' two' : '')
    // (over the titles' left edge: x 60 in the column layout, the crate's start in the row layout when it fits)
    const LX = !COL && HD.lines === 1 && X0c + HD.wl + 30 <= XR - Math.max(HD.wr, HD.ex && !HD.up ? exHeadW : 0) ? X0c : 62
    const gl = s('svg', { class: 'wd-glyph', width: 44, height: 34, 'data-deco': '', style: `left:${LX}px;top:${bL - H2 + 22 - 17}px` })
    gl.append(s('rect', { x: 3, y: 3, width: 38, height: 28, rx: 6, fill: C.redSoft, stroke: C.ink, 'stroke-width': 5 }))
    fixed.append(gl)
    const hl = h('div', { class: cls, style: { left: LX + GLYPH_W + 'px', width: Math.ceil(HD.wl - GLYPH_W + 4) + 'px' } }, plain(barM.label))
    fixed.append(hl)
    style(hl, { top: (bL - hl.offsetHeight) + 'px' })
    if (sideM) {
      const hr = h('div', { class: cls + ' r', style: { left: Math.floor(XR - HD.wr - 4) + 'px', width: Math.ceil(HD.wr + 4) + 'px' } }, plain(sideM.label))
      fixed.append(hr)
      style(hr, { top: (bR - hr.offsetHeight) + 'px' })
    }
    if (HD.ex) {
      const he = h('div', { class: 'wd-exhead', style: { left: Math.floor(XR - exHeadW - 4) + 'px', width: Math.ceil(exHeadW + 4) + 'px' } }, plain(exM.label))
      fixed.append(he)
      style(he, { top: (headsBottom - he.offsetHeight) + 'px' })
    }
  }

  // per-lane objects
  for (const l of lanes) {
    // floor line and the far-side guide (decoration)
    g.back.append(s('line', { x1: -20, x2: 1100, y1: l.yF, y2: l.yF, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.85 }))
    const gy = Math.max(sideM && XF > colL - 12 ? l.yRowB + 12 : l.yT + 12, l.uN && XF > XR - G.uW(l) - 12 ? l.uBottom + 8 : 0)
    g.back.append(s('line', { x1: XF, x2: XF, y1: gy.toFixed(1), y2: l.yF - 8, stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '8 10', 'stroke-linecap': 'round' }))
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
    l.pennant = s('path', { d: `M3,${-l.poleH}L38,${-l.poleH + 12}L3,${-l.poleH + 24}Z`, fill: C.hero, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' })
    l.flag.append(s('line', { x1: 0, x2: 0, y1: 0, y2: -l.poleH - 2, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }), l.pennant)
    // (the winner's pennant unfurls into the gap label's banner)
    if (gapLab && l.i === winner) {
      // (a long pennant: square at the pole, pointed at the far side)
      const y0 = -l.poleH, y1 = y0 + GAP_H, x1 = 2 + gapLab.bw
      l.banner = s('path', { d: `M2,${y0}L${x1 - GAP_TIP},${y0}L${x1},${y0 + GAP_H / 2}L${x1 - GAP_TIP},${y1}L2,${y1}Z`, fill: C.hero, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round', 'data-deco': '', opacity: 0 })
      l.flag.append(l.banner)
    }
    g.mid.append(l.flag)
    // the crate (its face is the clock)
    l.crate = s('g')
    l.crateR = s('rect', { x: (-crateW / 2).toFixed(1), y: -Hc, width: crateW, height: Hc, rx: 10, fill: C.redSoft, stroke: C.ink, 'stroke-width': 8, 'stroke-linejoin': 'round' })
    // one line centred, or the number over its unit
    // (two lines: the number's box and the unit's, 1.22 em each, stacked 5 px into each other, centred)
    const b1 = 1.22 * CT, b2 = 1.22 * 40, y0 = -Hc / 2 - (b1 + b2 - 5) / 2
    const yN = FACE2 ? y0 + b1 / 2 + 1 : -Hc / 2 + 2
    l.crateT = s('text', { class: 'wd-crate-t', x: 0, y: yN.toFixed(1), 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': CT, fill: C.ink })
    l.crate.append(l.crateR, l.crateT)
    l.unit = FACE2 ? splitUnit(l.bar) : null
    if (FACE2) {
      // (the unit sits tight under its number inside the crate: an intended overlap of their line boxes)
      l.crateU = s('text', { class: 'wd-crate-t', x: 0, y: (y0 + b1 - 5 + b2 / 2 + 1).toFixed(1), 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 40, 'font-weight': 800, fill: C.grey, 'data-overlap-ok': '' })
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
    // (in the column a delta wraps inside it, in place of the behaviour; 'under': one line under the money value)
    const dCol = TONE_TXT[l.tone] || C.ink
    l.deltaO = l.delta ? new NumObj(world.html, UNDER || BESIDE ? { cls: 'wd-delta', text: l.delta, ax: 1, ay: 1, style: { color: dCol, whiteSpace: 'nowrap' } }
      : { cls: 'wd-delta', text: l.delta, ax: 0, ay, style: { color: dCol, ...wrap } }) : null
    // the money value (+ the lever band and the winner's plate behind it), and the third metric's line under it
    l.band = sideM && lever && lever.lanes.includes(l.i) ? h('div', { class: 'wd-band' }) : null
    if (l.band) world.html.append(l.band)
    l.plate = sideM && winner === l.i ? h('div', { class: 'wd-plate' }) : null
    if (l.plate) world.html.append(l.plate)
    l.val = sideM ? new NumObj(world.html, { cls: 'wd-val', text: l.side, ax: 1, ay: 1, style: { fontSize: VS + 'px', lineHeight: VS + 'px' } }) : null
    l.exO = EX ? new NumObj(world.html, { cls: 'wd-ex', text: l.ex, ax: 1, ay: 1 }) : null
    l.cnt = counts.find(c => c.option === l.i) || null
    // the figure (slate while it waits or rests; green while it is his turn, and for the winner)
    l.fig = showFig ? new Figure(g.fig, { scale: k, outlineWidth: 10, color: C.grey }) : null
  }
  // the box behind a lane's money value (plate, band, impact), for the value at scale S
  const valBox = (l, S = 1) => ({ x0: XR - valW(l.side, VS) * S - 16, x1: XR + 12, y0: l.yRowB - VS * S * 0.9 - 6, y1: l.yRowB - VS * 0.1 + 10 })
  // the gap label (lookOpts.gapLabel) on its banner: unfurls after the winner beat (or at its own t)
  if (gapLab) {
    gapLab.o = new NumObj(world.html, { cls: 'wd-delta', text: gapLab.text, ax: 0, ay: 1, style: { color: C.ink, whiteSpace: 'nowrap' } })
    gapLab.t0 = gapLab.t != null ? gapLab.t : winT != null ? winT + 0.45 : lastVal + 0.6
    ctx.cue(gapLab.t0, 'pop', { gain: 0.5 })
  }

  // ================================================================== motion (pure)
  const runE = p => (p <= 0 ? 0 : p >= 1 ? 1 : p - (0.32 * Math.sin(2 * Math.PI * p)) / (2 * Math.PI))   // gentle accel/decel
  const frontAt = (l, t) => (t <= l.tStart ? X0f : t >= l.tLand ? l.xEnd : lerp(X0f, l.xEnd, runE(prog(t, l.tStart, l.run))))
  const FLY = 0.42
  const coinT = (l, j) => lerp(l.tStart + 0.08, Math.max(l.tStart + 0.1, l.tLand - FLY + 0.02), l.K === 1 ? 1 : j / (l.K - 1))
  const hip0 = X0c - reachX                     // his hip when his hands are on the crate at the start line
  const leverOn = (l, t) => (lever && lever.lanes.includes(l.i) ? clamp(prog(t, lever.t, 0.16)) * (1 - prog(t, lever.end - 0.2, 0.2)) : 0)

  // the winner's end pose: a full celebration when nothing readable is above him, else a low fist pump
  for (const l of lanes) {
    l.jumpH = 16; l.endPose = PZ.pumpLow; l.backStep = 0
    if (winner !== l.i) continue
    // he steps back a little before his jump (never behind his start line): room for his arms
    l.backStep = clamp(l.xEnd - X0f - 12 * k, 0, 18)
    const hx = l.xEnd - crateW - reachX - 10 * k - l.backStep
    const f0 = hx - 95 * k, f1 = hx + 95 * k
    let free, roomUp
    const rightOK = (!sideM || f1 < l.plateB.x0 - 10) && (!l.uN || f1 < XR - G.uW(l) - 10)
    if (COL) {
      free = rightOK
      roomUp = P - 4                                  // he stays inside his lane (the lane above has its own figure)
    } else {
      const dw = l.deltaO && G.dMode === 'own' ? deltaW(l) : 0, line2 = Math.max(l.detO ? detW(l) : 0, dw)
      const titleEnd = X0c + Math.max(Math.max(nameW(l, NS), POP ? deltaW(l) : 0) + (two ? 0 : line2 ? 16 + line2 : 0), two ? line2 : 0)
      free = (f0 > titleEnd + 10) && rightOK
      roomUp = P - 6
    }
    // arms up (standing, else knees bent) when that fits under whatever is above him, else the "yes!" pump
    const want = lo.endPose === 'point' ? PZ.point : lo.endPose === 'pump' ? PZ.yes : lo.endPose === 'celebrate' ? PZ.win : null
    const hWin = poseTop(PZ.win, true) * k + 4, hLow = poseTop(PZ.winLow, true) * k + 4, hYes = poseTop(PZ.yes, true) * k + 4, hPunch = poseTop(PZ.punch, true) * k + 2
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
      // a pat: the resting hand lifts off the crate and drops back on it; he looks down at it
      for (const tp of pats[l.i]) {
        const w = bump(t, tp, PAT)
        if (w > 0) { st.patLift = 36 * k * w; st.pose = { ...st.pose, tilt: st.pose.tilt + 10 * bump(t, tp - 0.04, PAT + 0.16) } }
      }
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
    let lv = 0
    if (lever && lever.lanes.includes(l.i)) for (const tb of leverBeats) lv = Math.max(lv, bump(t, tb + 0.05, 0.5))
    if (lv > 0) pz = blendPose(pz, PZ.nod, lv)
    st.pose = pz
    if (winT != null && t >= winT - 0.3) {
      if (l.i === winner) {
        const sb = E.inOut(prog(t, winT - 0.3, 0.2))
        st.hipX -= l.backStep * sb
        if (l.backStep > 0) st.lift = hop(t, winT - 0.3, 0.2, 5)
        st.pose = blendPose(st.pose, PZ.crouch, bump(t, winT - 0.26, 0.3) * 0.8)
        st.lift = Math.max(st.lift, hop(t, winT + 0.04, 0.46, l.jumpH))
        const air = E.inOut(prog(t, winT + 0.02, 0.12)) * (1 - E.inOut(prog(t, winT + 0.42, 0.14)))
        if (air > 0) st.pose = blendPose(st.pose, PZ.airUp, air * (l.endPose === PZ.win ? 1 : 0.4))
        // a read of his lane after the beat ("about a YEAR sooner"): a little hop
        for (const r of reads) if (r.lanes.includes(l.i) && r.t > winT + 0.6) st.lift = Math.max(st.lift, hop(t, r.t, 0.34, Math.min(12, l.jumpH)))
        const ew = E.inOut(prog(t, winT + 0.5, 0.18))
        if (ew > 0) {
          // (the wave settles to a smaller one that keeps going: the hold never freezes)
          const wave = 9 * Math.sin(2 * Math.PI * 1.5 * (t - winT - 0.5)) * Math.max(0.5, Math.exp(-(t - winT - 0.5) / 3))
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
    if (EX) ctx.cue(l.tEx, 'tick', { gain: 0.35 })
    if (l.tDelta != null && l.tDelta > 0) ctx.cue(l.tDelta, 'pop', { gain: 0.6 })
  }
  for (const r of reads) if (r.t > 0.05) ctx.cue(r.t, 'tick', { gain: 0.5 })
  for (const hs of hops) for (const th of hs) ctx.cue(th, 'tick', { gain: 0.45 })
  if (lever && lever.lanes.length) for (const tb of leverBeats) ctx.cue(tb, 'swipe', { gain: tb === lever.t ? 0.5 : 0.4 })
  for (const ps of pats) for (const tp of ps) ctx.cue(tp + PAT - 0.04, 'tick', { gain: 0.3 })
  // the climax: the winner's money value grows to WS on its gold plate (impact: a mostly vertical shake, a light
  // flash, a 1.8% punch, `hit` + `cash`), and short rays fan out of the plate's two ends only: a burst all round would
  // cross the crate faces below it and the lane above. The left fan only where the row is clear of the titles
  const rays = []
  // the verdict claims time ("**14 months** sooner"): the winner's time-saved strip thickens with the plate
  const verdictEm = spec.verdict && spec.verdict.text ? [...String(spec.verdict.text).matchAll(/\*\*(.+?)\*\*/g)].map(m => plain(m[1])) : []
  const timeClaim = winner != null && verdictEm.some(e => unitOf(e) != null || e.includes(lanes[winner].bar.replace(/^≈\s*/, '')))
  if (winner != null) {
    const l = lanes[winner]
    const b = sideM ? l.plateB : { x0: l.xEnd - crateW, x1: l.xEnd, y0: l.yF - Hc, y1: l.yF }
    fxk.impact(winT, { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2, shake: 11, flash: 0.22, punch: 0.018, burst: false, cue: 'hit', gain: 0.95 })
    ctx.cue(winT + 0.06, 'cash', { gain: 0.8 })
    const cy = (b.y0 + b.y1) / 2, hh = b.y1 - b.y0
    let titleEnd = BESIDE && l.delta ? l.dBx : 60 + G.TW
    if (!COL) {
      const dw = l.deltaO && G.dMode === 'own' ? deltaW(l) : 0, line2 = Math.max(l.detO ? detW(l) : 0, dw)
      titleEnd = X0c + Math.max(Math.max(nameW(l, NS), POP ? deltaW(l) : 0) + (two ? 0 : line2 ? 16 + line2 : 0), two ? line2 : 0)
    }
    const rnd = rng(613)
    const fan = (x, dir, nR, len) => {
      for (let j = 0; j < nR; j++) {
        const u = j / (nR - 1)
        const a = ((-22 + 44 * u + (rnd() - 0.5) * 6) * Math.PI) / 180
        const el = s('line', { stroke: C.ink, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0, 'data-deco': '' })
        g.fx.append(el)
        rays.push({ el, x, y: cy + (u - 0.5) * 0.5 * hh, c: dir * Math.cos(a), sn: Math.sin(a), len: len * (0.85 + 0.3 * rnd()) })
      }
    }
    fan(b.x1 + 6, 1, 5, 46)
    const leftRoom = b.x0 - 6 - (titleEnd + 16)
    if (leftRoom >= 40) fan(b.x0 - 6, -1, 4, Math.min(44, leftRoom - 4))
  }

  // ================================================================== seek
  const lastBeat = Math.max(lastVal, winT ?? 0, ...slotE.map(x => Math.max(0, x.t)), ...reads.map(r => r.t), lever ? lever.t : 0)
  const duration = durationOf(spec, lastBeat, d.hold ?? 3)
  const chromeOpts = { verdictCue: winT != null && vt != null && Math.abs(vt - winT) < 0.35 ? null : 'ding' }
  const readAt = (l, key, t) => { let b = 0; for (const r of reads) if (r.key === key && r.lanes.includes(l.i)) b = Math.max(b, bump(t, r.t, 0.42)); return b }

  // his colour: slate while he waits or rests, green while it is his lane's turn (from the wake to 1.6 s after its
  // money value lands), on a scan hop, a lever beat or a read of his lane, and for the winner from the winner beat
  const figGreen = (l, t) => {
    let w = l.pre ? 0 : clamp(prog(t, l.actT - 0.05, 0.2)) * (1 - prog(t, l.end + 1.6, 0.4))
    for (const th of hops[l.i]) w = Math.max(w, clamp(3 * bump(t, th, 0.44)))
    w = Math.max(w, leverOn(l, t))
    for (const r of reads) if (r.lanes.includes(l.i)) w = Math.max(w, clamp(3 * bump(t, r.t - 0.05, 0.8)))
    if (winT != null) w = l.i === winner ? Math.max(w, clamp(prog(t, winT - 0.3, 0.2))) : w * (1 - prog(t, winT + 0.1, 0.2))
    return w
  }

  function seekLane(l, t) {
    const active = t >= l.actT
    const winOn = winT != null && t >= winT
    const isWin = winOn && l.i === winner, loser = winOn && l.i !== winner
    // ---- title row
    const wake = COL || l.pre ? 0 : bump(t, l.actT, 0.3)
    const dT = l.tDelta
    // 'pop' (the deltas get no room at all; the last resort): each pops over its title for 2.4 s, the title giving
    // way, then gives it back (a read of the delta pops it again for 1.4 s)
    let popW = POP && dT != null ? prog(t, dT, 0.12) * (1 - prog(t, dT + 2.4, 0.15)) : 0
    if (POP && dT != null) for (const r of reads) if (r.key === 'delta' && r.lanes.includes(l.i) && r.t > dT + 2.5) popW = Math.max(popW, prog(t, r.t - 0.12, 0.12) * (1 - prog(t, r.t + 1.4, 0.15)))
    l.nameO.set({ x: l.nameXY[0], y: l.nameXY[1], color: active ? C.ink : C.dim, sx: 1 + 0.05 * wake, sy: 1 + 0.05 * wake, opacity: 1 - popW })
    l.nameO.overlap(popW > 0 && popW < 1)
    if (l.detO) {
      // ('own': the delta swaps in for the behaviour; 'under': the behaviour stays)
      const out = POP ? popW : G.dMode === 'own' && dT != null ? prog(t, dT, 0.12) : 0
      l.detO.set({ x: l.detXY[0], y: l.detXY[1] + 8 * out, opacity: 1 - out, color: active ? C.grey : C.dim })
    }
    if (l.deltaO) {
      const pi = dT != null ? popUp(t, dT + 0.1) : { scale: 1, opacity: 0 }
      const rb = readAt(l, 'delta', t), wb = l.i === winner && winT != null ? bump(t, winT + 0.04, 0.34) : 0
      const at = UNDER ? [XR, l.dUY] : BESIDE ? [l.dBx, l.yRowB] : POP ? l.nameXY : l.detXY
      const op = POP ? (t < dT + 2.4 ? pi.opacity * (1 - prog(t, dT + 2.4, 0.15)) : popW) : pi.opacity
      const sc = pi.scale * (1 + 0.12 * rb + 0.06 * wb)
      const dc = TONE_TXT[l.tone] || C.ink
      l.deltaO.set({ x: at[0], y: at[1], opacity: op, sx: sc, sy: sc, color: loser ? mixOk(dc, C.grey, prog(t, winT + 0.1, 0.16)) : dc })
      // (a bump is a passing emphasis: it may brush the line above or below for a few frames)
      l.deltaO.overlap((POP && op > 0 && op < 1) || sc > 1.03)
    }
    // ---- the money value: drops onto the row in its tone's colour (green kept, red lost, ink neutral); a green one
    // settles to ink when the next lane lands. A read flashes it in its own colour and bumps it 12%
    if (l.val) {
      const tIn = l.tVal
      const toneCol = TONE_TXT[l.tone] || C.ink
      const base = l.tone === 'bad' ? C.red : C.ink
      let col = l.pre ? base : mix(toneCol, base, E.inOut(prog(t, l.settleT, 0.3)))
      if (loser) col = mixOk(base, C.grey, prog(t, winT + 0.1, 0.16))
      // (ink from the moment its plate starts to open: green on gold would not read)
      if (l.i === winner && winT != null && t >= winT - 0.05) col = C.ink
      const rb = readAt(l, sideM.key, t)
      if (rb > 0 && !isWin) col = mix(loser ? C.grey : !l.pre && t < l.settleT ? toneCol : base, toneCol, Math.min(1, rb * 2.2))
      let text = l.side, sx = 1, sy = 1, op = 1, y = l.yRowB, inFlight = false
      if (t < tIn) op = 0
      else if (l.cnt && !l.pre) {
        const from = l.cnt.from === 'base' || l.cnt.from == null ? numOf(lanes[0].side) : numOf(String(l.cnt.from))
        const p = prog(t, tIn, 0.8)
        if (p < 1 && Number.isFinite(from)) text = rollText(E.out(p), from, l.side)
        const pi = popIn(t, tIn, 0.2), sc = 1 + 0.1 * bump(t, tIn + 0.8, 0.3)
        sx = sy = pi.scale * sc; op = pi.opacity
      } else if (!l.pre) {
        // falls the last few px and squashes on contact (never under 41 px); a neutral one (ink) bumps as it lands
        const f = fall(t, tIn - 0.11, 34)
        y = l.yRowB - f.y
        const q = f.landed ? squashAt(t, f.lastHit, Math.min(0.14, 1 - 41 / VS)) : { sx: 1, sy: 1 }
        const nb = l.tone === 'neutral' || !TONE_TXT[l.tone] ? 1 + 0.1 * bump(t, tIn + 0.08, 0.36) : 1
        sx = q.sx * nb; sy = q.sy * nb
        op = clamp((t - tIn + 0.11) / 0.06)
        inFlight = !f.landed
      }
      l.val.overlap(inFlight)
      let lvb = 0
      for (const tb of leverBeats) lvb = Math.max(lvb, bump(t, tb, 0.4))
      const lb = 1 + 0.12 * rb + 0.06 * lvb * (l.band ? 1 : 0)
      sx *= lb; sy *= lb
      // the winner's grows to WSe on its plate (a little past it first), shifting the few px that centre the plate
      if (l.i === winner && winT != null) {
        const gp = prog(t, winT - 0.02, 0.24)
        const gw = (1 + (WSe - 1) * E.back(gp, 1.6)) * (1 + 0.06 * bump(t, winT + 0.04, 0.34))
        sx *= gw; sy *= gw; y += plateDY * E.out(gp)
      }
      l.val.set({ x: XR, y, text, color: col, opacity: op, sx, sy })
      attr(l.sock, 'opacity', t < tIn ? (active ? '1' : '0.7') : '0')
      if (l.band) {
        const on = leverOn(l, t), b = valBox(l)
        style(l.band, { left: b.x0.toFixed(0) + 'px', top: b.y0.toFixed(0) + 'px', width: (b.x1 - b.x0).toFixed(0) + 'px', height: (b.y1 - b.y0).toFixed(0) + 'px',
          opacity: on.toFixed(3), transform: `scaleX(${(0.9 + 0.1 * E.out(clamp(prog(t, lever.t, 0.16)))).toFixed(3)})`, display: on > 0.001 ? '' : 'none' })
      }
      if (l.plate) {
        const b = l.plateB, p = prog(t, winT - 0.04, 0.2)
        style(l.plate, { left: b.x0.toFixed(0) + 'px', top: b.y0.toFixed(0) + 'px', width: (b.x1 - b.x0).toFixed(0) + 'px', height: (b.y1 - b.y0).toFixed(0) + 'px',
          transform: `scale(${(p <= 0 ? 0 : 0.2 + 0.8 * E.back(p, 1.8)).toFixed(3)},${(p <= 0 ? 0 : 0.6 + 0.4 * E.out(p)).toFixed(3)})`, display: p > 0 ? '' : 'none' })
      }
    }
    // ---- the third metric's line under it (grey mono; a read bumps it and turns it ink)
    if (l.exO) {
      const pi = popUp(t, l.tEx, 0.2), rb = readAt(l, exM.key, t), sc = pi.scale * (1 + 0.12 * rb)
      l.exO.set({ x: XR, y: l.exY, opacity: pi.opacity, sx: sc, sy: sc, color: rb > 0 ? mix(C.grey, C.ink, Math.min(1, rb * 2.2)) : C.grey })
      l.exO.overlap(sc > 1.03)
    }
    // ---- the crate: "?" until it moves, then the running months, then the payoff's string
    const xf = frontAt(l, t)
    let csx = 1, csy = 1, crot = 0
    // (the squash's rebound never narrows it: its 40 px unit word would read under 40)
    if (t >= l.tLand && !l.pre) { const q = squashAt(t, l.tLand, 0.06); csx = Math.max(1, q.sx); csy = q.sy }
    if (t >= l.tStart && t < l.tLand) crot = -1.2 * Math.sin(2 * Math.PI * 4 * (t - l.tStart)) * smooth(0, 0.15, t - l.tStart)
    if (t >= l.actT + 0.45 && t < l.tStart && l.tStart - l.actT > 1.3) crot = 0.8 * Math.sin(2 * Math.PI * 9 * t)     // strain
    let hopB = 0
    for (const th of hops[l.i]) hopB = Math.max(hopB, bump(t, th + 0.1, 0.3))
    let lvc = 0, patB = 0
    if (lever && lever.lanes.includes(l.i)) for (const tb of leverBeats) lvc = Math.max(lvc, bump(t, tb, 0.4))
    for (const tp of pats[l.i]) patB = Math.max(patB, bump(t, tp + PAT - 0.04, 0.22))
    const pulse = 1 + 0.08 * readAt(l, barM.key, t) + 0.07 * hopB + 0.05 * lvc + 0.05 * patB + (isWin ? 0.06 * bump(t, winT + 0.04, 0.34) : 0)
    attr(l.crate, 'transform', `translate(${(xf - crateW / 2).toFixed(1)},${l.yF.toFixed(1)}) rotate(${crot.toFixed(2)}) scale(${(csx * pulse).toFixed(3)},${(csy * pulse).toFixed(3)})`)
    let fill = t >= l.tLand ? mix(C.redSoft, C.heroSoft, l.pre ? 1 : prog(t, l.tLand, 0.2)) : C.redSoft
    if (isWin) fill = mix(C.heroSoft, C.coin, prog(t, winT, 0.2))
    attr(l.crateR, 'fill', fill)
    let face = '?', fcol = active ? C.grey : C.dim
    const barN = FACE2 ? l.unit.n : l.bar
    // (a compound payoff, "11 yrs 5 mo", counts its whole years and pops its exact string on landing)
    if (t >= l.tStart) { face = rollText(runE(prog(t, l.tStart, l.run)), 0, barN, l.M); fcol = t >= l.tLand ? C.ink : C.grey }
    if (l.crateU) attr(l.crateU, 'opacity', t >= l.tStart ? '1' : '0')
    if (loser) fcol = mixOk(C.ink, C.grey, prog(t, winT + 0.1, 0.16))
    setTextAttr(l.crateT, face, fcol)
    // ---- flag: drops in just before the crate arrives, wobbles when it is hit
    const tDrop = l.tLand - 0.3
    // (under a title row it drops from just below the row, never through the text)
    const f = fall(t, tDrop, COL ? 90 : clamp(l.yF - l.poleH - 2 - (l.yT + 6 + G.RH) - 6, 0, 90), { n: 2 })
    const wob = t >= l.tLand && !l.pre ? wobble(t, l.tLand, 7, 3.2, 5) : 0
    attr(l.flag, 'transform', `translate(${(l.xEnd + 5).toFixed(1)},${(l.yF - f.y).toFixed(1)}) rotate(${wob.toFixed(2)})`)
    attr(l.flag, 'opacity', t >= tDrop ? '1' : '0')
    attr(l.pennant, 'fill', isWin ? C.coin : C.hero)
    if (l.gap) {
      const gp = l.pre ? 1 : E.out(prog(t, l.tLand + 0.12, 0.35))
      attr(l.gap, 'x2', (l.xEnd + 12 + Math.max(0, XF - l.xEnd - 12) * gp).toFixed(1))
      attr(l.gap, 'opacity', gp > 0 ? '1' : '0')
      // the time it saved is the verdict's claim: the winner's strip thickens with the plate
      const sw = l.i === winner && timeClaim ? 11 + 7 * E.out(prog(t, winT, 0.2)) + 5 * bump(t, winT + 0.04, 0.34) + (t > winT ? 6 * readAt(l, barM.key, t) : 0) : 11
      attr(l.gap, 'stroke-width', sw.toFixed(1))
    }
    // ---- coins: fly off the crate's front face onto the pile, low (under the money value, the lines under it and a
    // second title line); the pile grows as they land
    let landedK = 0
    const capY = Math.max(l.uBottom, !COL && two ? l.yT + 6 + G.RH : 0) + 18
    l.coins.forEach((e, j) => {
      const t0 = coinT(l, j), p = prog(t, t0, FLY)
      if (t >= t0 + FLY) landedK++
      if (!(t >= t0 && t < t0 + FLY)) { attr(e, 'opacity', '0'); attr(e, 'cx', '0'); attr(e, 'cy', '0'); attr(e, 'rx', '13'); return }
      const xs = frontAt(l, t0) + 6, ys = l.yF - Hc * 0.55
      const ye = l.yF - 4 - l.pileH * (j / l.K) - 10, xe = PILE_X
      const apex = Math.max(capY, Math.min(ys, ye) - 30)
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
      const gw = figGreen(l, t)
      const pz = secondary({ ...st.pose, lift: 0 }, t + l.i * 1.13, { breathe: 0.45 + 0.35 * gw })
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
        pinLimb(Jp, 'hF', [bx + 14, l.yF - Hc - 1 - (st.patLift || 0)], 1)
        for (const key of ['eF', 'hF']) J[key] = [lerp(J[key][0], Jp[key][0], st.rest), lerp(J[key][1], Jp[key][1], st.rest)]
      }
      if (st.lift) for (const key of BODY) J[key] = [J[key][0], J[key][1] - st.lift]
      J.ground = l.yF
      const colF = gw <= 0.001 ? C.grey : gw >= 0.999 ? C.hero : mix(C.grey, C.hero, gw)
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
        if (!(t >= x.t && t < x.end)) { style(el, { opacity: '0', transform: 'none', display: 'none' }); return }
        const pi = x.t < 0 ? { scale: 1, opacity: 1 } : popUp(t, x.t, 0.18, 0.03)
        const out = Number.isFinite(x.end) ? 1 - prog(t, x.end - 0.1, 0.1) : 1
        style(el, { opacity: (pi.opacity * out).toFixed(3), transform: `translateY(${((1 - pi.opacity) * 10).toFixed(1)}px) scale(${pi.scale.toFixed(3)})`, display: '' })
      })
      for (const l of lanes) seekLane(l, t)
      if (gapLab) {
        // the pennant unfurls (scaled out from the pole) into the banner, then the label pops on it; both pulse with
        // the strip and the crate when the VO reads the winner's time
        const l = lanes[winner], u = E.back(prog(t, gapLab.t0, 0.2), 1.4)
        const rb = t > gapLab.t0 + 0.3 ? readAt(l, barM.key, t) : 0
        attr(l.banner, 'opacity', t >= gapLab.t0 ? '1' : '0')
        attr(l.banner, 'transform', `translate(2,${-l.poleH}) scale(${Math.max(0.001, u * (1 + 0.06 * rb)).toFixed(3)},${(1 + 0.06 * rb).toFixed(3)}) translate(-2,${l.poleH})`)
        attr(l.pennant, 'opacity', t >= gapLab.t0 + 0.06 ? '0' : '1')
        const pi = popUp(t, gapLab.t0 + 0.12, 0.2, 0.06), sc = pi.scale * (1 + 0.06 * rb)
        gapLab.o.set({ x: gapLab.tx, y: gapLab.ty, opacity: pi.opacity, sx: sc, sy: sc })
        gapLab.o.overlap(false)
      }
      // the climax rays: out of the plate's ends for 0.26 s (parked, invisible, the rest of the time)
      for (const ry of rays) {
        const dt = t - winT, on = dt >= 0 && dt < 0.26
        attr(ry.el, 'opacity', on ? (1 - E.inQuad(prog(dt, 0, 0.26))).toFixed(3) : '0')
        const pq = on ? E.out(prog(dt, 0, 0.22)) : 0
        const r0 = ry.len * (0.05 + 0.45 * pq), r1 = ry.len * (0.3 + 0.7 * pq)
        attr(ry.el, 'x1', (ry.x + ry.c * r0).toFixed(1)); attr(ry.el, 'y1', (ry.y + ry.sn * r0).toFixed(1))
        attr(ry.el, 'x2', (ry.x + ry.c * r1).toFixed(1)); attr(ry.el, 'y2', (ry.y + ry.sn * r1).toFixed(1))
      }
      const { shake, zoom } = fxk.seek(t)
      // the punch zooms about the titles' left edge (x 60 stays put, x 922 reaches 939), and the shake is mostly
      // vertical: the titles stand on the safe zone's left edge
      const sh = [shake[0] * 0.25, shake[1]]
      if (winner != null) {
        const cy = sideM ? (lanes[winner].plateB.y0 + lanes[winner].plateB.y1) / 2 : lanes[winner].yF - Hc / 2
        cam.set({ fx: 60, fy: cy, x: 60, y: cy, zoom, shake: sh })
      } else cam.set({ shake: sh, zoom })
    },
  }
}
