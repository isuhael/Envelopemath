// Scoreboard: pov-race — POV spend-vs-own race (P6). @investment_timeline's mechanic, played as a two-team scoreboard.
//
// "POV: you invested in X instead of paying $Y for X's product." The same money, two fates:
//   - the top bar is a split scoreboard: SPENT (white number, coral tag, the item's icon) | IN STOCK (neon number,
//     glow). Both counters run live off the race clock and land exactly on the spec's `final` display strings.
//     The stock number turns coral while it is under water (worth less than the money spent).
//   - the stage is the race: the spend line (white: money that is gone) against the own line (neon green: the same
//     money in the company's stock). The gap between them is filled green where owning is ahead, coral where it is
//     behind. Auto-rescaling y axis (dim, left margin), x ticks, a big faint year clock in the plot's top-left corner
//     (the same spot as chart-race), which dims further while a line or a tag passes through it. When the spend line
//     starts tiny (under 5% of where it ends: one $7.99 bill), the axis opens at 2× what frame 1 shows and rescales up
//     from there, so frame 1's dots sit mid-plot instead of on the floor of an empty grid.
//   - the year clock rolls to y + 1 one frame after year y's Dec-31 close, so each close shows under its own year.
//   - the scoreboard row, the footer and the stage sit 24 px lower than layoutFor's grid (air under the hook).
//   - the race clock is linear over raceT, except that it pauses on each answer-row hold (lookOpts.unit, below).
//   - purchases tick on the spend line: the item's icon drops onto the line as the race reaches it (gravity, squash);
//     one at the point where both lines start stands just left of it, so the own line never runs through it
//     with a price tag ("$8.99  MAY 2014") that holds until the next purchase; the icons stay on the line as markers
//     and the SPENT number bumps and flushes coral. Captions off: the tag is a hard cut in the label stack instead
//     (HD Guy grammar: the label stack is the caption). Between purchases (and with none) the stack rests on the
//     matchup: the spend label (coral) over the own label (green).
//   - the finish (raceT[1]): over the last 0.4 s both counters converge on their final values, then land exactly on
//     the display strings: the winning side bumps and flares, the stage blooms (a riser leads in, hit + cash; a loss
//     lands on a thud).
//   - verdict: the chrome's: the kit's one verdict slot at the foot of the frame (its rule is coral when owning lost).
//     With captions on it lands on the band over the stage foot, so the plot box compresses over the 0.3 s before
//     verdict.t: both lines (the spend line too), the icons and the x ticks stay above it. The header keeps the hook.
//   - footer: the chrome's (the assumption line, and lookOpts.footerSteps, the working line that rewrites at each
//     beat; a line too long for 960 px at 40 px breaks at its " · " into two lines and the grid makes room).
// Frame 1: the header (POV + the one price), both counters at the starting stake, the axis waiting at the start year,
// both tips parked at the first point, the footer; a purchase at the clock's start is already standing on the line
// with its tag (the receipt). raceT[0] < 0 opens mid-race. Every spot a tag can take is scored at mount, so seek(t)
// stays a pure function of t.
//
// data (FORMATS.md §6): { spend: { label, points, final, item }, own: { label, points, final },
//   purchases: [{ x, label, price }], x: { from, to, tickEvery }, y: { prefix, dp, compact?, log? }, raceT, hold }
// lookOpts (all optional):
//   spendTag / ownTag   scoreboard labels (default: spend.label, and "in … stock" taken from own.label)
//   footerSteps         [{ t, text }]: kit-wide: the footer rewrites to a working line at each t (spec.footer before)
//   tags                false: no price tags on the chart (icons only). A tag takes the best-scored spot, at mount, on
//                       the lines, tips and icons it would cover and the x-tick labels it would hide: around its icon
//                       (below, above, beside, or out in the empty future right of the tips), or the TOP BAND: the
//                       stage's strip over the plot (as chart-race's event flags), above the lines and tips, straight
//                       over its ticket (or ending just left / starting just right of it, to clear a tip right over
//                       it). Mid-race tags usually land there, which keeps the x-tick strip clear. When every spot
//                       crosses something, it parks in the plot's top band, detached, over the faint corner year
//                       (which dims under any tag)
//   pips                true: only the latest purchase stands on the line as a full icon; once the next purchase
//                       lands, a ticket shrinks down into a small pip on the spend line (0.25 s). Where the two lines
//                       run together, a full icon would be cut by the own line on every later frame
//   spendTip            false: no "$499 / SPENT" tag riding the spend line's right end (it shows only in stretches
//                       where it is clear of the own line, its tip and the icons, scored at mount)
//   gapFill             false: no green/coral fill between the lines
//   yearClock           false: no big year in the plot corner
//   stageBottom         y where the stage ends (default 1300 with captions, 1236 without; with `unit`, just above
//                       the answer row)
//   unit                the ANSWER ROW: the stake re-priced in the hook's own unit ("$19.99 Netflix, free for how many
//                       years?"), in the bottom bar where the label stack sits (HD Guy grammar: line 1 the working,
//                       line 2 the answer, big and green, the spend item's icon beside it). It yields to the verdict.
//                       { per, perMonth?, formula, empty = "? years", holds: [{ x, t?, hold?, work, display, tone? }],
//                         final, finalWork, hold = 1.3, pause = true, icon = spend.item }
//                       - frame 1: line 1 `formula` ("stock ÷ ($19.99 × 12)"), line 2 `empty` ("? YEARS"): the open
//                         slot. From raceT[0] line 2 counts the IN STOCK counter ÷ `per` live (its "≈" an unlit ghost):
//                         under a year in whole months (÷ perMonth), 1-10 years to 1 dp, then whole years.
//                       - each hold (a spoken year-end x): line 1 cuts to its `work` ("2020: $9,181 ÷ $239.88"),
//                         line 2 lands on `display` ("≈ 38 years") with a bump, a glow flare, a floor bloom and a ding
//                         (tone "bad", for a loss: coral, on a thud), and holds its own `hold` s (else unit.hold).
//                       - the race PAUSES on each hold (unless pause: false): the clock stops at the hold's x for its
//                         hold, so the board's counters, both tips, the lines and the year clock all show the year-end
//                         the row holds (a paused frame never sets "2012: $107" beside a board that moved on into 2013).
//                         A hold's `t` pins when the race reaches it (sync it to its VO line); holds without one share
//                         their gap's moving time in proportion to x. The stretches between holds run at their own
//                         rates and the race still ends at raceT[1]. (pause: false: the race runs on and the row
//                         catches up with it over 0.35 s after each hold.)
//                       - the finish (raceT[1]): no landing in the row: the board's dollars own the finish. Line 1
//                         cuts softly (no slam) to `finalWork` (use the board's own rounded figure, "≈ $17,700 ÷
//                         $239.88", never a second spelling of it), and line 2 rests on `final` with its "≈" still an
//                         unlit ghost, dimmed to half. The payoff lights it.
//   cover               "clean": frame 1 carries only the hook's own price: the board's counters wait LED-off, as
//                       unlit ghost digits at the counter's size in the shape of its first value ("$–.––", 16% white,
//                       decoration), and a purchase at the clock's start drops in with the race at raceT[0] (no
//                       receipt on the cover)
//   payoff              { t = verdict.t, display, icon = unit icon, dur = 1.4 }: the payoff lands last in the hero.
//                       At t the split board hard-cuts to ONE hero number (the icon + an odometer at the hero size).
//                       dur > 0: it rolls from 0 onto `display` ("≈ 74 years"), then a 1.13 bump, glow, a stage bloom
//                       and a hit. dur 0: no roll: the answer the row already holds is cut up into the hero whole, and
//                       the bump, glow, bloom and hit all land at t, so no frame ever shows a part-count under a
//                       verdict or a footer that already says the answer. The board does not come back.
import { h, s, css as style, setText, attr, prog, ease, clamp, lerp, fitText, fmtNum } from '../../../runtime/core.js'
import { C, SIZE, M, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, labelStack, stageFlash, flashAt, parseDisplay, odometer, bump, slam,
  wobble, durationOf, valueAt, iconSVG, iconName, slamFromFor, formatLike, heroRow,
} from '../lib.js'

export const css = `
.pr-root { position: absolute; }
.pr-svg { position: absolute; left: 0; top: 0; overflow: visible; }
.pr-layer { position: absolute; left: 0; top: 0; width: 0; height: 0; overflow: visible; }
.pr-axis { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #6B7584; white-space: nowrap; }
.pr-axis-x { transform: translateX(-50%); }
.pr-year { position: absolute; left: 12px; }
.pr-icon { position: absolute; left: 0; top: 0; overflow: visible; transform-origin: 50% 100%; }
.pr-tag { position: absolute; left: 0; top: 0; display: flex; align-items: baseline; gap: 14px; padding: 8px 16px 6px;
  border-radius: 12px; background: rgba(14, 17, 22, 0.9); box-shadow: 0 0 14px 8px rgba(14, 17, 22, 0.78);
  white-space: nowrap; transform-origin: 50% 100%; }
.pr-tag-price { font: 400 52px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; color: #FFFFFF; }
.pr-tag-label { font: 700 42px/1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; color: #9AA4B2; }
.pr-board { position: absolute; left: 0; width: 1080px; }
.pr-half { position: absolute; top: 0; width: 480px; height: 100%; transform-origin: 50% 62%; }
.pr-tagline { position: absolute; left: 0; top: 0; width: 480px; display: flex; align-items: center; justify-content: center; gap: 12px; }
.pr-vs { color: #9AA4B2; }
.pr-tagtext { display: block; font: 700 42px/1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; }
.pr-num { position: absolute; left: 0; width: 480px; display: flex; justify-content: center; align-items: flex-start; transform-origin: 50% 55%; }
.pr-div { position: absolute; left: 539px; width: 2px; background: #232B36; }
.pr-stag { position: absolute; left: 0; top: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
  padding: 7px 10px 5px; border-radius: 10px; background: rgba(14, 17, 22, 0.9); box-shadow: 0 0 10px 6px rgba(14, 17, 22, 0.7);
  white-space: nowrap; transform-origin: 100% 100%; }
.pr-stag-num { font: 400 44px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; color: #FFFFFF; }
.pr-stag-word { font: 700 40px/1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.02em; }
.pr-led { position: absolute; left: 0; width: 480px; display: flex; justify-content: center; font: 400 100px/1 'Anton', 'Inter Full', sans-serif; color: rgba(255, 255, 255, 0.16); }
.pr-ans { position: absolute; }
.pr-ans-l1 { position: absolute; left: 0; top: 0; width: 100%; font: 400 54px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase;
  text-align: center; white-space: nowrap; letter-spacing: 0.01em; color: #2BFF88; transform-origin: 50% 50%; }
.pr-ans-l1 .op { color: #9AA4B2; }
.pr-ans .sb-odo-fix, .pr-pay .sb-odo-fix { text-transform: uppercase; }
.pr-q { display: inline-block; font: 400 1em/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; white-space: pre; height: 1em; }
`

const SPEND_COL = C.iconBody    // the spend line / number: white (money that is gone)
const OWN_COL = C.green         // the own line / number: neon (the same money, owned)
const K = 1.2                   // the y axis keeps the running max at 1/K of the plot height
const CONV = 0.4                // s: before raceT[1] both counters converge on their final values
const TAGHOLD = 1.7             // s: a price tag holds this long (or until the next purchase)
const FALL = 0.24               // s: a purchase icon's drop onto the line

const hex2rgb = hex => { const x = parseInt(hex.slice(1), 16); return [x >> 16, (x >> 8) & 255, x & 255] }
const mix = (a, b, k) => { const p = hex2rgb(a), q = hex2rgb(b); return `rgb(${p.map((v, i) => Math.round(lerp(v, q[i], clamp(k)))).join(', ')})` }
const rgba = (hex, a) => { const [r, g, b] = hex2rgb(hex); return `rgba(${r}, ${g}, ${b}, ${a})` }

function niceStep(range, target = 4) {
  const raw = range / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)))
  const n = raw / mag
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag
}
// axis tick text (decoration): compact, one decimal only when needed ("$1.5K", "$20K")
function axisText(v, prefix) {
  const a = Math.abs(v)
  const unit = a >= 1e12 ? 1e12 : a >= 1e9 ? 1e9 : a >= 1e6 ? 1e6 : a >= 1e3 ? 1e3 : 1
  const m = v / unit
  return fmtNum(v, { prefix, dp: Math.abs(m - Math.round(m)) < 1e-6 ? 0 : 1, compact: unit > 1 })
}
// ink box of each unit icon inside its 100 x 100 design box: [top, bottom] (so an icon stands ON the line)
const ICON_BOX = { cup: [7, 95], hotdog: [30, 81], burger: [12, 88], pizza: [3, 95], phone: [5, 95], car: [29, 85], house: [10, 92],
  coin: [6, 94], bill: [22, 78], gas: [12, 95], ticket: [25, 75], bag: [12, 95], egg: [6, 95], hour: [6, 94], token: [6, 94] }
// length of segment (x0,y0)-(x1,y1) inside rect R = [x0, y0, x1, y1] (Liang-Barsky)
function clipLen(x0, y0, x1, y1, R) {
  if (Math.max(x0, x1) < R[0] || Math.min(x0, x1) > R[2] || Math.max(y0, y1) < R[1] || Math.min(y0, y1) > R[3]) return 0
  const dx = x1 - x0, dy = y1 - y0
  let a = 0, b = 1
  for (const [p, q] of [[-dx, x0 - R[0]], [dx, R[2] - x0], [-dy, y0 - R[1]], [dy, R[3] - y0]]) {
    if (p === 0) { if (q < 0) return 0; continue }
    const u = q / p
    if (p < 0) { if (u > b) return 0; if (u > a) a = u } else { if (u < a) return 0; if (u < b) b = u }
  }
  return (b - a) * Math.hypot(dx, dy)
}
const digitsOf = n => Math.max(1, String(Math.floor(Math.abs(n) + 1e-9)).length)

export default function povRace(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage

  // ---------- the two series ----------
  const norm = (sr, key) => {
    sr = sr || {}
    const points = (sr.points || []).map(p => [+p[0], +p[1]]).filter(p => isFinite(p[0]) && isFinite(p[1])).sort((a, b) => a[0] - b[0])
    if (!points.length) throw new Error(`pov-race: data.${key}.points is empty`)
    const final = sr.final != null ? String(sr.final) : null
    const ft = final ? parseDisplay(final) : null
    const finalTpl = ft && isFinite(ft.value) ? { ...ft, suffix: ft.suffix.replace(/\s+[A-Za-z][\s\S]*$/, '') } : null   // "$499 spent" → "$499" (the word is the tag)
    const approx = /≈/.test(final || '')
    return {
      key, label: String(sr.label || ''), item: iconName(sr.item || 'token'), points, final, finalTpl,
      x0: points[0][0], first: points[0][1], last: points[points.length - 1][1],
      endV: finalTpl ? finalTpl.value * finalTpl.scale : points[points.length - 1][1],
      baseDp: finalTpl && !approx && finalTpl.scale === 1 ? Math.min(2, finalTpl.dp) : null,
      cents: Math.abs(points[0][1] - Math.round(points[0][1])) > 1e-9,
    }
  }
  const SP = norm(d.spend, 'spend'), OW = norm(d.own, 'own')
  SP.color = SPEND_COL; OW.color = OWN_COL
  const both = [SP, OW]
  const vAt = (sr, x) => valueAt(sr.points, x)
  const ownWins = OW.endV >= SP.endV

  // ---------- clock: x sweeps linearly over raceT ----------
  const xs = both.flatMap(sr => sr.points.map(p => p[0]))
  const X = { from: Math.min(...xs), to: Math.max(...xs), ...(d.x || {}) }
  X.from = +X.from; X.to = +X.to
  if (!(X.to > X.from)) X.to = X.from + 1
  const span = X.to - X.from
  const calendar = X.from >= 1800 && X.to <= 2300
  X.tickEvery = +X.tickEvery > 0 ? +X.tickEvery : Math.max(1, niceStep(span, 5))
  const Y = { prefix: '$', suffix: '', dp: 0, compact: false, log: false, min: 0, ...(d.y || {}) }
  Y.dp = Math.max(0, Math.min(2, +Y.dp || 0))
  SP.baseDp = SP.baseDp ?? Y.dp; OW.baseDp = OW.baseDp ?? Y.dp
  const rt = Array.isArray(d.raceT) && d.raceT.length === 2 && +d.raceT[1] > +d.raceT[0] ? d.raceT.map(Number) : [1.2, 1.2 + clamp(span * 1.2, 8, 40)]
  const [R0, R1] = rt
  const TF = R1                                   // the finish: counters land on the final display strings

  // the answer row (lookOpts.unit): the stake in the hook's unit, in the label stack's slot under the stage. Parsed
  // before the clock: its holds pause the race.
  const U = lo.unit && +lo.unit.per > 0 ? (() => {
    const u = lo.unit
    const hold = +u.hold > 0 ? +u.hold : 1.3
    return {
      per: +u.per, perMonth: +u.perMonth > 0 ? +u.perMonth : +u.per / 12,
      formula: String(u.formula || ''), empty: String(u.empty || '? years'),
      final: u.final != null ? String(u.final) : null, finalWork: String(u.finalWork || ''),
      hold, pause: u.pause !== false,
      icon: u.icon === false ? null : iconName(u.icon || (d.spend && d.spend.item) || 'token'),
      holds: (Array.isArray(u.holds) ? u.holds : []).filter(q => q && isFinite(+q.x) && q.display != null)
        .map(q => ({
          x: +q.x, t: q.t != null && isFinite(+q.t) ? +q.t : null, hold: +q.hold > 0 ? +q.hold : hold,
          work: String(q.work || ''), display: String(q.display), bad: q.tone === 'bad',
        })).sort((a, b) => a.x - b.x),
    }
  })() : null

  // ---------- clock: x sweeps linearly over raceT, pausing on each answer-row hold ----------
  // knots [t, x]: x is linear between knots. Each hold (lookOpts.unit.holds, unless unit.pause is false) stops the
  // clock at its x for its `hold` s, so the board's counters, both tips, the lines and the year clock all show the
  // year-end the answer row is holding (a paused frame never sets a year-end figure against values that moved on).
  // A hold's `t` pins when the race reaches it; holds without one share their gap's moving time in proportion to x.
  let knots = [[R0, X.from], [R1, X.to]]
  const pz = U && U.pause ? U.holds.filter(q => q.x > X.from + 1e-6 && q.x < X.to - 1e-6) : []
  if (pz.length) {
    const ks = [[R0, X.from]]
    let i = 0
    while (i <= pz.length) {
      const [ta, xa] = ks[ks.length - 1]
      let j = i
      while (j < pz.length && pz[j].t == null) j++
      const tb = j < pz.length ? pz[j].t : R1, xb = j < pz.length ? pz[j].x : X.to
      const move = tb - ta - pz.slice(i, j).reduce((a, q) => a + q.hold, 0)
      let acc = 0
      for (let k = i; k < j; k++) {
        const tk = ta + ((pz[k].x - xa) / Math.max(1e-9, xb - xa)) * move + acc
        ks.push([tk, pz[k].x], [tk + pz[k].hold, pz[k].x]); acc += pz[k].hold
      }
      if (j < pz.length) ks.push([pz[j].t, pz[j].x], [pz[j].t + pz[j].hold, pz[j].x])
      i = j + 1
    }
    ks.push([R1, X.to])
    // every moving stretch must take time (x never jumps) and the clock never runs backwards
    const ok = ks.every((k, n) => n === 0 || (k[0] >= ks[n - 1][0] - 1e-9 && (k[1] <= ks[n - 1][1] + 1e-9 || k[0] - ks[n - 1][0] > 0.05)))
    if (ok) knots = ks
    else console.warn('pov-race: lookOpts.unit.holds cannot pause the race in order (check holds[].t and hold); the clock runs straight')
  }
  const xAt = t => {
    if (t <= knots[0][0]) return knots[0][1]
    for (let k = 1; k < knots.length; k++) {
      const [t1, x1] = knots[k]
      if (t <= t1) { const [t0, x0] = knots[k - 1]; return t1 > t0 ? lerp(x0, x1, (t - t0) / (t1 - t0)) : x1 }
    }
    return knots[knots.length - 1][1]
  }
  // the time the race reaches x (at a hold's x: when the hold starts); outside the race, the plain linear clock
  const tAtX = x => {
    if (x > X.from && x <= X.to) {
      for (let k = 1; k < knots.length; k++) {
        const [t0, x0] = knots[k - 1], [t1, x1] = knots[k]
        if (x1 > x0 + 1e-12 && x <= x1 + 1e-9) return t0 + ((x - x0) / (x1 - x0)) * (t1 - t0)
      }
    }
    return R0 + ((x - X.from) / span) * (R1 - R0)
  }
  const paused = knots.reduce((a, k, n) => a + (n && k[1] === knots[n - 1][1] ? k[0] - knots[n - 1][0] : 0), 0)
  const secPerYear = (R1 - R0 - paused) / span

  // ---------- layout ----------
  const L0 = layoutFor(spec)
  const capsOn = L0.captionsOn
  // the answer row's type: line 1 (the working) 48 px with captions on (its ÷ stays ≥ 40 px through a slam's
  // undershoot), so the plot keeps every px it can
  const UT = U ? { l1: capsOn ? 48 : 62, v: capsOn ? 96 : 120, gap: 8 } : null
  const L = layoutFor(spec, { stageBottom: lo.stageBottom ?? (U ? L0.limit - 16 - (UT.l1 + UT.gap + UT.v) - 4 : capsOn ? 1300 : 1236) })
  // breathing room under the hook: the header is bottom-aligned in its band, so its last line sat ~20 px over the
  // scoreboard's labels. The scoreboard row, the footer and the stage top move TOP_GAP down (the plot gives it up).
  const TOP_GAP = L.hero ? 24 : 0
  if (TOP_GAP) {
    L.hero.y += TOP_GAP
    L.footer.y += TOP_GAP
    L.stage.y += TOP_GAP; L.stage.h -= TOP_GAP
    L.topBar.y1 += TOP_GAP
    L.inner.y += TOP_GAP; L.inner.h -= TOP_GAP
  }

  // the footer (and lookOpts.footerSteps) is the chrome's; layoutFor already made room for a two-line one
  const footSteps = (Array.isArray(lo.footerSteps) ? lo.footerSteps : []).filter(x => x && x.text).map(x => ({ t: +x.t || 0 }))
  const P = { x: 160, w: 740 }                    // plot x 160-900: tip halos and icons clear the rail
  P.y = L.stage.y + 44
  P.h = L.stage.y + L.stage.h - 58 - P.y          // x tick labels below it
  const pxOf = x => ((x - X.from) / span) * P.w
  // the verdict never covers the race: when it lands on a band over the stage foot (L.verdict.boxed), the plot box
  // compresses over the 0.3 s before verdict.t so both lines (the spend line too), the icons and the x ticks end above
  // the band (the y range is unchanged, only squeezed)
  const vT0 = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null
  const PH0 = P.h
  const PH1 = vT0 != null && L.verdict.boxed ? clamp(L.verdict.y - 10 - 54 - P.y, PH0 * 0.45, PH0) : PH0
  const phAt = t => (PH1 >= PH0 ? PH0 : lerp(PH0, PH1, ease.inOut(prog(t, vT0 - 0.3, 0.3))))

  // ---------- purchases ----------
  const purchases = (d.purchases || []).filter(p => p && isFinite(+p.x))
    .map(p => ({ x: clamp(+p.x, X.from, X.to), label: String(p.label || ''), price: p.price != null ? String(p.price) : '' }))
    .sort((a, b) => a.x - b.x)
  // a purchase at the clock's start is the stake itself: already on the line at frame 1 (the receipt in the hook),
  // its tag holding until shortly after the race starts
  // (one landing in the first 0.3 s is landed at frame 1 too: frame 1 never shows an entrance half-way)
  // lookOpts.cover "clean": no receipt on the cover; a purchase at the clock's start drops in as the race starts
  const clean = lo.cover === 'clean' && R0 > 0.1
  purchases.forEach((p, i) => {
    p.i = i; p.t = tAtX(p.x)
    if (clean && p.t < R0 + 1e-6) p.t = R0
    else if (p.x <= X.from + 1e-6 || p.t < 0.3) p.t = Math.min(p.t, 0)
  })
  purchases.forEach((p, i) => {
    const hold = p.t <= 0 ? Math.max(R0, 0) + 1.0 : p.t + TAGHOLD
    const next = i + 1 < purchases.length ? purchases[i + 1].t : Infinity
    p.end = Math.min(next, hold); p.cut = next <= hold
  })
  // lookOpts.pips: only the latest purchase stands on the line as a full icon; once the next purchase lands, a ticket
  // shrinks into a small pip on the spend line (where the two lines run together, a full icon is cut by the own line)
  const pipsOn = lo.pips === true
  purchases.forEach((p, i) => { p.retire = pipsOn && i + 1 < purchases.length ? purchases[i + 1].t : Infinity })
  const PIP_R = 8, PIP_DUR = 0.25
  const stackMode = !U && !capsOn && L.label.h >= 150      // the answer row takes the label stack's slot
  const chartTags = lo.tags !== false && !stackMode

  // ---------- crossings (own vs spend), exact on the union of breakpoints ----------
  const xStart = Math.max(SP.x0, OW.x0)
  const breaks = [...new Set([xStart, X.to, ...xs.filter(x => x > xStart && x < X.to)])].sort((a, b) => a - b)
  const diff = x => vAt(OW, x) - vAt(SP, x)
  const crossings = []
  {
    let sgn = 0
    for (let k = 0; k < breaks.length; k++) {
      const a = breaks[k], da = diff(a)
      if (k > 0) {
        const b0 = breaks[k - 1], d0 = diff(b0)
        if (sgn !== 0 && Math.sign(da) === -sgn && Math.abs(da) > 1e-9) {
          const cx = d0 !== da && Math.sign(d0) === sgn ? b0 + ((a - b0) * d0) / (d0 - da) : b0
          crossings.push({ x: cx, t: tAtX(cx), up: da > 0 })
        }
      }
      if (Math.abs(da) > 1e-9) sgn = Math.sign(da)
    }
  }
  const passes = crossings.filter((c, i) => c.t > R0 + 0.05 && c.t < R1 - 0.3 && (i === 0 || c.t - crossings[i - 1].t > 0.3))

  // ---------- y scale: auto-rescaling (smoothed, monotonic), or a fixed log axis ----------
  const allVals = both.flatMap(sr => sr.points.map(p => p[1]))
  const allMax = Math.max(...allVals, ...both.map(sr => sr.endV))
  const startMax = Math.max(...both.map(sr => vAt(sr, X.from)))
  function runMax(x) {
    let m = -Infinity
    for (const sr of both) {
      for (const p of sr.points) { if (p[0] > x) break; if (p[1] > m) m = p[1] }
      m = Math.max(m, vAt(sr, x))
    }
    return m
  }
  // a true auto-rescale (ChartOrbit): the axis follows the running max, so a 1,000× race still shows its early years;
  // it never zooms in past the stake or the first ~12% of the race
  // a spend line that starts tiny (under 5% of its end) opens the axis at 2× what frame 1 shows instead (no empty grid)
  const tinyStart = SP.first < 0.05 * Math.max(SP.endV, SP.last)
  const yFloor = tinyStart ? Math.max(runMax(xAt(0)) * 2, startMax * 1.6, 1e-6) : Math.max(startMax * 1.6, runMax(X.from + span * 0.12) * 1.25, 1e-6)
  const yMaxAt = t => {
    if (Y.max != null) return +Y.max
    let acc = 0
    for (let k = 0; k < 6; k++) acc += runMax(xAt(t - k * 0.07))
    return Math.max(yFloor, (acc / 6) * K, runMax(xAt(t)) * 1.06)   // the smoothing lags a steep climb: never let a line run off the top
  }
  const pos = allVals.filter(v => v > 0)
  const logMin = Y.min > 0 ? +Y.min : (pos.length ? Math.min(...pos) : 1) * 0.8
  const logMax = Y.max != null ? +Y.max : allMax * 1.3
  const pyFor = (ymax, ph = P.h) => (Y.log
    ? v => ph - ((Math.log10(Math.max(v, logMin)) - Math.log10(logMin)) / (Math.log10(logMax) - Math.log10(logMin))) * ph
    : v => ph - ((v - Y.min) / (ymax - Y.min)) * ph)

  // ---------- running counter templates (finals are display strings; only running values are formatted) ----------
  function runTpl(sr, v) {
    if (Y.compact) {
      const a = Math.abs(v)
      const [scale, suffix] = a >= 1e9 ? [1e9, 'B'] : a >= 1e6 ? [1e6, 'M'] : a >= 1e3 ? [1e3, 'K'] : [1, '']
      return { prefix: Y.prefix, suffix: suffix + Y.suffix, dp: scale > 1 ? Math.max(1, Y.dp) : Y.dp, group: true, scale, value: 0 }
    }
    const dp = sr.cents && Math.abs(v) < 1000 ? Math.max(2, sr.baseDp) : sr.baseDp
    return { prefix: Y.prefix, suffix: Y.suffix, dp, group: true, scale: 1, value: 0 }
  }
  const snap = (v, tpl) => { const q = Math.pow(10, tpl.dp) / tpl.scale; return Math.round(v * q) / q }
  // a counter at t: live while the race runs, converging on the final value over the last CONV s, then exactly `final`
  function counter(sr, t) {
    if (t >= TF && sr.finalTpl) return { v: sr.endV, tpl: sr.finalTpl, landed: true }
    let v = vAt(sr, xAt(t))
    if (sr.finalTpl && t > R1 - CONV) v = lerp(v, sr.endV, ease.inOut(prog(t, R1 - CONV, CONV)))
    const tpl = runTpl(sr, v)
    return { v: snap(v, tpl), tpl }
  }

  // =============================================================================================== DOM
  const flash = stageFlash(stage, L)
  const root = h('div', { class: 'pr-root', style: { left: P.x + 'px', top: P.y + 'px', width: P.w + 'px', height: P.h + 'px' } })
  stage.append(root)

  // big faint year clock, plot top-left (decoration: the x axis and the VO carry the year)
  let yearOdo = null, yearBox = null
  const YS = 160
  const yearTpl = { prefix: calendar ? '' : 'YEAR ', suffix: '', dp: 0, group: false, scale: 1, value: 0 }
  if (lo.yearClock !== false) {
    yearBox = h('div', { class: 'pr-year', 'data-deco': '', style: { top: Math.round(-0.02 * YS) + 'px' } })
    root.append(yearBox)
    yearOdo = odometer(yearBox, { size: YS, color: 'rgba(255, 255, 255, 0.14)', maxInt: calendar ? 4 : 3, maxDp: 0 })
  }
  // the year rolls into y + 1 just AFTER year y's close (a Dec-31 close sits at x = y + 0.99), so every year-end
  // value lands under its own year; the roll takes one frame or so (≤ 0.1 s), so a beat early in the new year (a
  // crossing a few days after New Year) never catches it half-rolled. Never past the clock's last year (x.to = 2025
  // or 2025.99 holds "2025").
  const ROLL_AT = 0.992
  const rollF = clamp(0.1 / Math.max(1e-6, secPerYear), 0.004, 0.03)
  const yearEnd = Math.floor(X.to + 1e-6)
  const yearV = x => {
    const y = Math.floor(x - ROLL_AT)
    return Math.max(Math.floor(X.from + 1e-6), Math.min(yearEnd, y + clamp((x - (y + ROLL_AT)) / rollF)))
  }

  const svg = s('svg', { class: 'pr-svg', width: P.w, height: P.h, viewBox: `0 0 ${P.w} ${P.h}`, 'data-deco': '' })
  svg.append(s('defs', {}, s('filter', { id: 'prGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' }, s('feGaussianBlur', { stdDeviation: 7 }))))
  const gFill = s('g'), gGrid = s('g'), gLine = s('g'), gPip = s('g'), gTip = s('g')
  svg.append(gGrid, gFill, gLine, gPip, gTip)
  root.append(svg)
  // layers above the plot: purchase icons, then the own line (the hero line is never interrupted by an icon), then tags
  const iconLayer = h('div', { class: 'pr-layer', 'data-deco': '' })
  const svgTop = s('svg', { class: 'pr-svg', width: P.w, height: P.h, viewBox: `0 0 ${P.w} ${P.h}`, 'data-deco': '' })
  const gLineTop = s('g'), gTipTop = s('g')
  svgTop.append(gLineTop, gTipTop)
  const tagLayer = h('div', { class: 'pr-layer' })
  root.append(iconLayer, svgTop, tagLayer)

  // y grid + labels in the left margin (decoration)
  const grid = Array.from({ length: 9 }, () => {
    const line = s('line', { x1: 0, x2: P.w, stroke: C.edge, 'stroke-width': 2, opacity: 0 })
    gGrid.append(line)
    const lab = h('div', { class: 'pr-axis', 'data-deco': '', style: { right: P.w + 16 + 'px', display: 'none' } })
    root.append(lab)
    return { line, lab }
  })
  const baseLine = s('line', { x1: 0, x2: P.w, y1: P.h, y2: P.h, stroke: '#2A3340', 'stroke-width': 3 })
  gGrid.append(baseLine)
  const logTicks = []
  if (Y.log) {
    const py = pyFor(logMax)
    const vals = []
    for (let e = Math.floor(Math.log10(logMin)); e <= Math.ceil(Math.log10(logMax)); e++) for (const m of [1, 2, 5]) vals.push(m * Math.pow(10, e))
    let lastY = Infinity, k = 0
    for (const v of vals) {
      if (v < logMin || v > logMax * 0.97 || k >= grid.length) continue
      const yy = py(v)
      if (lastY - yy < 56) continue
      lastY = yy
      const g = grid[k++]
      attr(g.line, 'opacity', '1'); attr(g.line, 'y1', yy.toFixed(1)); attr(g.line, 'y2', yy.toFixed(1))
      setText(g.lab, axisText(v, Y.prefix))
      style(g.lab, { display: 'block', top: (yy - 15).toFixed(1) + 'px' })
      logTicks.push({ g, v })
    }
  }
  // x ticks under the plot (decoration): passed years bright, future years dim
  const xTicks = []
  for (let k = Math.ceil(X.from / X.tickEvery - 1e-9); k * X.tickEvery <= X.to + 1e-9; k++) {
    const xv = +(k * X.tickEvery).toFixed(6)
    const lab = h('div', { class: 'pr-axis pr-axis-x', 'data-deco': '', style: { left: pxOf(xv).toFixed(1) + 'px', top: P.h + 12 + 'px' } }, String(Math.round(xv * 100) / 100))
    root.append(lab)
    xTicks.push({ xv, lab })
  }

  // the gap between the lines: green where owning is ahead, coral where it is behind
  const fillUp = lo.gapFill === false ? null : s('path', { fill: OWN_COL, opacity: 0.11, d: 'M0 0' })
  const fillDn = lo.gapFill === false ? null : s('path', { fill: C.red, opacity: 0.2, d: 'M0 0' })
  if (fillUp) gFill.append(fillUp, fillDn)

  // lines + tips (spend under own)
  const lineOf = (sr, w, glowA) => {
    const glow = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': w * 2.6, opacity: glowA, filter: 'url(#prGlow)', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M0 0' })
    const path = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M0 0' })
    ;(sr === OW ? gLineTop : gLine).append(glow, path)
    const halo = s('circle', { r: 24, fill: sr.color, opacity: 0.26, filter: 'url(#prGlow)' })
    const dot = s('circle', { r: sr === OW ? 11 : 9, fill: sr.color })
    const core = s('circle', { r: 4.5, fill: sr === OW ? '#FFFFFF' : C.stage })
    ;(sr === OW ? gTipTop : gTip).append(halo, dot, core)
    return { sr, glow, path, halo, dot, core }
  }
  const lines = [lineOf(SP, 7, 0.14), lineOf(OW, 9, 0.3)]

  // purchases: the item's icon standing on the spend line, with a price tag (chart mode)
  const ICON = Math.round(clamp((P.w / Math.max(1, purchases.length)) * 0.9, 34, 42))
  const [ibTop, ibBot] = (ICON_BOX[SP.item] || [6, 94]).map(v => v / 100)   // the glyph's ink inside its 100 box
  // a purchase where both lines start (the stake itself) stands just LEFT of that point, level with the line, so
  // the own line leaving the point is never drawn through it; every other purchase stands on its point
  const xLead = Math.max(SP.x0, OW.x0)
  for (const p of purchases) p.lead = p.x <= xLead + 1e-6
  const iconAt = (p, py) => {                                                 // the line point the icon stands on
    const lx = pxOf(p.x), ly = py(vAt(SP, p.x)) + 2
    return { lx, ly, cx: p.lead ? lx - ICON / 2 - 10 : lx, top: ly - ICON * (ibBot - ibTop) }
  }
  // what a purchase covers at t: its icon, or (retired, lookOpts.pips) its pip on the line
  const iconBox = (p, py, t) => {
    const a = iconAt(p, py)
    if (t >= p.retire + PIP_DUR * 0.5) return [a.lx - PIP_R - 2, a.ly - 2 - PIP_R - 2, a.lx + PIP_R + 2, a.ly - 2 + PIP_R + 2]
    return [a.cx - ICON / 2, a.top, a.cx + ICON / 2, a.ly]
  }
  for (const p of purchases) {
    p.icon = iconSVG(SP.item, ICON, { cls: 'pr-icon' })
    style(p.icon, { display: 'none' })
    iconLayer.append(p.icon)
    if (p.retire < Infinity) {
      p.pip = s('g', { opacity: 0 }, s('circle', { r: PIP_R, fill: SPEND_COL }), s('circle', { r: 3.5, fill: C.stage }))
      gPip.append(p.pip)
    }
    p.end = Math.min(p.end, TF - 0.05)                     // the finish is the one focal moment
    if (chartTags && (p.price || p.label) && p.end - Math.max(p.t, 0) > 0.35) {
      p.tag = h('div', { class: 'pr-tag' },
        p.price ? h('span', { class: 'pr-tag-price', html: ax(esc(p.price)) }) : null,
        p.label ? h('span', { class: 'pr-tag-label', html: richUI(p.label) }) : null)
      tagLayer.append(p.tag)
      // fit: the tag may span the plot plus the y-axis margin (x 70-930)
      const lab = p.tag.querySelector('.pr-tag-label')
      let px = 42
      while (p.tag.offsetWidth > 860 && px > 34 && lab) { px -= 2; lab.style.fontSize = px + 'px' }
      p.tw = p.tag.offsetWidth; p.th = p.tag.offsetHeight
      p.tagFrom = slamFromFor(p.tw, 860, 1.12)
      style(p.tag, { display: 'none' })
    }
  }
  // where a tag sits around its icon: below the spend line (the empty side when owning is ahead), above the icon, or
  // out in the empty future right of the tips; centred, right or left; at a stand-off of 0, 50 or 110 px. Chosen once
  // per purchase at mount, scored on the geometry at the tag's own moments (line ink under it, tips and icons
  // covered, how far clamping drags it), so a tag never hops while it is up.
  const SPOTS = []
  for (const v of ['b', 'a']) for (const hz of ['c', 'r', 'l', 'R']) for (const dd of [0, 50, 110])
    SPOTS.push({ v, hz, dd, pref: (v === 'b' ? 0 : 10) + { c: 0, r: 8, l: 12, R: 34 }[hz] + 0.35 * dd })
  SPOTS.push({ v: 'm', hz: 'R', dd: 0, pref: 40 })
  // parked: in the plot's top band, detached from the icon (over the faint corner year, which dims under a tag as it
  // does for any tag passing it). For a purchase whose own spots all cross a line (a late hike right under a dip and
  // its recovery on a short plot); they cost more, so a tag parks only when every attached spot scores clearly worse
  for (const fx of [0, 0.5, 1]) SPOTS.push({ v: 'P', fx, pref: 120 + 40 * (1 - fx) })
  // the top band: in the stage's strip over the plot (as chart-race's event flags), above the lines and the tips
  // (the axis keeps the running max at 1/K of the plot), straight over its ticket (centred, or reaching right or left
  // from it). It keeps the x-tick strip clear, so it is the default for mid-race tags; a lagging axis on a steep
  // climb can bring a tip up into it, and then the tag scores elsewhere.
  // ('L' / 'R': ending just left of, or starting just right of, its ticket, to clear a tip right over it)
  for (const hz of ['c', 'r', 'l', 'L', 'R']) SPOTS.push({ v: 'T', hz, pref: { c: 0, r: 6, l: 6, L: 14, R: 14 }[hz] })
  const TICK_COST = 30                              // per x-tick label a tag would hide (every sampled moment)
  function tagXY(p, sp, a) {
    if (sp.v === 'P') return { left: clamp(sp.fx * (P.w - p.tw), 70 - P.x, 930 - P.x - p.tw), top: 8, drag: 0 }
    if (sp.v === 'T') {
      const l0 = { c: a.lx - p.tw / 2, r: a.lx - 34, l: a.lx - p.tw + 34, L: a.lx - 56 - p.tw, R: a.lx + 56 }[sp.hz]
      const left = clamp(l0, 70 - P.x, 930 - P.x - p.tw)
      // clamping is cheap here; what costs is how far the tag ends up from its ticket's x
      const gap = Math.max(0, left - a.lx, a.lx - (left + p.tw))
      return { left, top: L.stage.y + 8 - P.y, drag: 0.3 * Math.abs(left - l0) + gap }
    }
    let top = sp.v === 'b' ? a.ly + 18 + sp.dd : sp.v === 'a' ? a.top - 12 - p.th - sp.dd : a.ly - p.th / 2
    let left = sp.hz === 'c' ? a.lx - p.tw / 2 : sp.hz === 'r' ? a.lx - 34 : sp.hz === 'l' ? a.lx - p.tw + 34 : a.lx + ICON / 2 + 80
    const l0 = left, t0 = top
    left = clamp(left, 70 - P.x, 930 - P.x - p.tw)
    top = clamp(top, L.stage.y + 8 - P.y, L.stage.y + L.stage.h - 4 - P.y - p.th)   // may drop into the x-tick strip
    return { left, top, drag: Math.abs(left - l0) + Math.abs(top - t0) }
  }
  function geomAt(t) {
    const x = xAt(t), py = pyFor(Y.log ? logMax : yMaxAt(t))
    const segs = both.map(sr => {
      const a = []
      if (x < sr.x0) return a
      for (const q of sr.points) { if (q[0] > x + 1e-9) break; a.push(pxOf(q[0]), py(q[1])) }
      a.push(pxOf(x), py(vAt(sr, x)))
      return a
    })
    const tips = both.map(sr => [pxOf(Math.max(x, sr.x0)), py(vAt(sr, Math.max(x, sr.x0)))])
    return { t, py, segs, tips }
  }
  const hit = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]
  for (const p of purchases) {
    if (!p.tag) continue
    const tA = Math.max(p.t, 0), tB = p.end
    const geoms = [tA, lerp(tA, tB, 0.5), tB - 0.03].map(geomAt)
    let best = SPOTS[0], bestC = Infinity
    for (const sp of SPOTS) {
      let c = sp.pref
      for (const g of geoms) {
        const a = iconAt(p, g.py)
        const r = tagXY(p, sp, a)
        const R = [r.left - 6, r.top - 6, r.left + p.tw + 6, r.top + p.th + 6]
        c += 0.3 * r.drag
        g.segs.forEach((sg, m) => { for (let i = 2; i < sg.length; i += 2) c += (m ? 1.4 : 0.6) * clipLen(sg[i - 2], sg[i - 1], sg[i], sg[i + 1], R) })
        for (const tp of g.tips) if (tp[0] > R[0] - 14 && tp[0] < R[2] + 14 && tp[1] > R[1] - 14 && tp[1] < R[3] + 14) c += 400
        if (R[3] > P.h + 10) for (const tk of xTicks) {           // x-tick labels it would hide
          const cx = pxOf(tk.xv), w = String(tk.xv).length * 18
          if (hit(R, [cx - w / 2, P.h + 10, cx + w / 2, P.h + 44])) c += TICK_COST
        }
        if (hit(R, [a.cx - ICON / 2, a.top, a.cx + ICON / 2, a.ly])) c += 600
        for (const q of purchases) {
          if (q === p || q.t > tA + 0.01) continue
          if (hit(R, iconBox(q, g.py, g.t))) c += 40
        }
      }
      if (c < bestC) { bestC = c; best = sp }
    }
    p.spot = best
  }

  // ---------- the spend tip's tag ("$499" over "SPENT") ----------
  // Once the axis has rescaled past it, a flat or slow spend line lies on the x axis and reads as the baseline; this
  // tag names it. It rides just above the spend line, its right edge left of the spend tip, while it stays clear of
  // the own line (no ink within 4 px), the own tip and the icons, scored at mount on this race's own
  // geometry, so seek stays a pure function of t (a steep late climb can squeeze older years under it: then it bows
  // out and returns once there is room again). Its number is the spend counter's (the final display string's number
  // from the finish on); its word is the final's trailing word ("$499 spent" → SPENT).
  let sTag = null
  if (lo.spendTip !== false && SP.finalTpl) {
    const wm = /\d[\d,.]*[KMBT]?\s+([A-Za-z][\s\S]*)$/.exec(SP.final || '')
    const num = h('span', { class: 'pr-stag-num' })
    const el = h('div', { class: 'pr-stag' }, num, h('span', { class: 'pr-stag-word', text: wm ? wm[1] : 'spent', style: { color: C.red } }))
    tagLayer.append(el)
    let w = 0
    for (const v of [SP.first, SP.endV, Math.max(...SP.points.map(q => q[1]))]) {
      const tpl = runTpl(SP, v)
      setText(num, formatLike(snap(v, tpl), tpl)); w = Math.max(w, el.offsetWidth)
    }
    setText(num, formatLike(SP.endV, SP.finalTpl)); w = Math.max(w, el.offsetWidth)
    sTag = { el, num, w, h: el.offsetHeight, runs: [] }
    style(el, { display: 'none' })
  }
  const sTagAt = (t, py) => {                       // [left, top, right, bottom] in plot px
    const xx = clamp(xAt(t), SP.x0, X.to)
    const right = pxOf(xx) - 30, bottom = py(t >= TF ? SP.endV : vAt(SP, xx)) - 10
    return [right - sTag.w, bottom - sTag.h, right, bottom]
  }
  if (sTag) {
    const clearAt = t => {
      const x = xAt(t), ph = phAt(t), py = pyFor(Y.log ? logMax : yMaxAt(t), ph)
      const R = sTagAt(t, py), Rp = [R[0] - 8, R[1] - 8, R[2] + 8, R[3] + 8]
      if (R[0] + P.x < 70 || R[1] < 0) return false
      if (x >= OW.x0) {
        // no own-line stroke on the tag (the line's centre stays 7 px off it: half its 9 px stroke, plus air)
        const R4 = [R[0] - 7, R[1] - 7, R[2] + 7, R[3] + 7]
        let ink = 0
        const segs = []
        for (const q of OW.points) { if (q[0] > x + 1e-9) break; segs.push([pxOf(q[0]), py(q[1])]) }
        segs.push([pxOf(x), py(vAt(OW, x))])
        for (let k = 1; k < segs.length; k++) {
          ink += clipLen(segs[k - 1][0], segs[k - 1][1], segs[k][0], segs[k][1], R4)
        }
        if (ink > 0) return false
        const tx = pxOf(x), ty = py(vAt(OW, x))
        if (tx > Rp[0] - 24 && tx < Rp[2] + 24 && ty > Rp[1] - 24 && ty < Rp[3] + 24) return false
      }
      for (const p of purchases) if (hit(Rp, iconBox(p, py, t))) return false
      return true
    }
    // the tag's stints: every clear stretch of the race (0.05 s grid) at least 1.5 s long, or one running to the
    // end; each fades in over 0.25 s and out over the 0.25 s before its room closes
    const tEnd = Math.max(TF + 1, durationOf(spec, TF, d.hold ?? M.hold))
    let run = null
    for (let k = 0, t0 = Math.max(R0, 0); t0 + k * 0.05 <= tEnd + 1e-9; k++) {
      const t = t0 + k * 0.05
      if (clearAt(t)) { if (!run) run = { on: t, off: t }; run.off = t }
      else if (run) { if (run.off - run.on >= 1.5) sTag.runs.push(run); run = null }
    }
    if (run && run.off - run.on >= 0.6) { run.off = Infinity; sTag.runs.push(run) }
  }

  // ---------- the scoreboard (top bar): SPENT | IN STOCK ----------
  const HY = L.hero ? L.hero.y : 444, HH = L.hero ? L.hero.h : 168
  const board = h('div', { class: 'pr-board', style: { top: HY + 'px', height: HH + 'px' } })
  board.append(h('div', { class: 'pr-div', 'data-deco': '', style: { top: '10px', height: HH - 20 + 'px' } }))
  stage.append(board)
  const ownTagDefault = (() => { const m = /\bin\s+(.+)$/i.exec(OW.label); return m ? 'in ' + m[1] : OW.label || 'Invested' })()
  const trendSVG = () => s('svg', { viewBox: '0 0 40 40', width: 34, height: 34, 'data-deco': '' },
    s('path', { d: 'M4 32L15 20L22 26L36 9', fill: 'none', stroke: OWN_COL, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    s('path', { d: 'M27 8H37V18', fill: 'none', stroke: OWN_COL, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
  const maxIntOf = sr => Math.min(10, Math.max(Y.compact ? 3 : digitsOf(Math.max(allMax, sr.endV) * 1.05), sr.finalTpl ? digitsOf(sr.finalTpl.value) : 1))
  const half = (sr, cx, tagText, tagCol, fallback, glyph) => {
    const el = h('div', { class: 'pr-half', style: { left: cx - 240 + 'px' } })
    const text = h('span', { class: 'pr-tagtext', html: richUI(tagText), style: { color: tagCol } })
    const line = h('div', { class: 'pr-tagline' }, glyph, text)
    const num = h('div', { class: 'pr-num', style: { top: '52px' } })
    if (sr === OW) num.classList.add('sb-glow')
    const odo = odometer(num, { size: 100, color: sr.color, maxInt: maxIntOf(sr), maxDp: 2 })
    el.append(line, num)
    board.append(el)
    // the tag fits 440 px (20 px clear of the divider) at 40-42 px. Too long: drop the decorative glyph, then a
    // leading "in " ("IN STARBUCKS STOCK" → "STARBUCKS STOCK"), then fall back to one short word
    const MAXW = 440, GW = 46
    const fits = withGlyph => {
      for (let px = 42; px >= 40; px--) { text.style.fontSize = px + 'px'; if (text.offsetWidth + (withGlyph ? GW : 0) <= MAXW) return true }
      return false
    }
    let done = false
    // ("SPENT ON GAMING PCS" → "GAMING PCS": the coral colour and the SPENT side already say it was spent)
    const alts = [tagText, String(tagText).replace(/^\s*in\s+/i, ''), String(tagText).replace(/^\s*(spent|paid|money)\s+(on|to|for)\s+/i, ''), fallback]
    for (const alt of alts.filter((a, i) => a && alts.indexOf(a) === i)) {
      text.innerHTML = richUI(alt)
      for (const g of [true, false]) if (!done && fits(g)) { done = true; if (!g) glyph.remove() }
      if (done) break
    }
    return { sr, el, odo, num, text }
  }
  const spendGlyph = iconSVG(SP.item, 40, { cls: 'pr-glyph' })
  const H_SP = half(SP, 300, lo.spendTag || SP.label || 'Spent', C.red, 'Spent', spendGlyph)
  const H_OW = half(OW, 780, lo.ownTag || ownTagDefault, OWN_COL, 'Invested', trendSVG())
  // one number size for both sides: the widest value either side ever shows fits 410 px (bumps stay in the half)
  {
    let wmax = 1
    for (const hf of [H_SP, H_OW]) {
      const sr = hf.sr
      const vals = [sr.first, Math.max(...sr.points.map(p => p[1])), sr.endV]
      if (sr.cents && !Y.compact && Math.max(...vals) >= 1000) vals.push(999.99)
      for (const v of vals) { const tpl = runTpl(sr, v); hf.odo.set(snap(v, tpl), tpl); wmax = Math.max(wmax, hf.odo.el.offsetWidth) }
      if (sr.finalTpl) { hf.odo.set(sr.endV, sr.finalTpl); wmax = Math.max(wmax, hf.odo.el.offsetWidth) }
    }
    const S = Math.floor(clamp(100 * 410 / wmax, 56, Math.min(116, HH - 52)))
    // the glow box is padded so the drop-shadow's spill stays inside the element (no stale filter strips on re-seek)
    for (const hf of [H_SP, H_OW]) { style(hf.odo.el, { fontSize: S + 'px' }); style(hf.num, { top: 52 - 48 + 'px', height: S + 96 + 'px', paddingTop: '48px', boxSizing: 'border-box' }) }
    // clean cover: each counter waits LED-off until the race starts: unlit ghost digits at the counter's size, in
    // the shape of its first value ("$–.––" for "$7.99"), so it reads as a scoreboard waiting, never as a price
    if (clean) for (const hf of [H_SP, H_OW]) {
      const tpl0 = runTpl(hf.sr, hf.sr.first)
      const ghost = formatLike(snap(hf.sr.first, tpl0), tpl0).replace(/\d/g, '–')
      hf.led = h('div', { class: 'pr-led', 'data-deco': '', text: ghost, style: { top: '52px', fontSize: S + 'px' } })
      hf.el.append(hf.led)
    }
  }

  const vt = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null

  // ---------- the answer row (lookOpts.unit): line 1 the working, line 2 the stake in the hook's unit ----------
  // working markup: a leading "2020:" grey, the money green, everything from the first ÷ on grey (".op")
  const workHTML = str => {
    const k = str.indexOf(' ÷ ')
    let head = k >= 0 ? str.slice(0, k) : str
    const tail = k >= 0 ? str.slice(k) : ''
    const yr = /^(\d{4}:\s*)/.exec(head)
    if (yr) head = head.slice(yr[0].length)
    return `<span>${yr ? `<span class="op">${ax(esc(yr[1]))}</span>` : ''}${ax(esc(head))}${tail ? `<span class="op">${ax(esc(tail))}</span>` : ''}</span>`
  }
  let ans = null
  if (U) {
    const box = h('div', { class: 'pr-ans', 'data-yield': '', style: { top: L.label.y + 'px', left: (1080 - L.label.w) / 2 + 'px', width: L.label.w + 'px', height: L.label.h + 'px' } })
    stage.append(box)
    const line = str => {
      const el = h('div', { class: 'pr-ans-l1', html: workHTML(str), style: { fontSize: UT.l1 + 'px' } })
      box.append(el)
      fitText(el, L.label.w, { minPx: 44 })
      el.__from = slamFromFor(el.firstChild.offsetWidth, L.label.w - 8, 1.12)
      style(el, { display: 'none' })
      return el
    }
    const formulaEl = U.formula ? line(U.formula) : null
    const holds = U.holds.map(q => ({ ...q, t: tAtX(q.x), v: vAt(OW, q.x), tpl: parseDisplay(q.display), el: q.work ? line(q.work) : formulaEl }))
    const finalEl = U.finalWork ? line(U.finalWork) : formulaEl
    const iconSize = Math.round(UT.v * 0.84)
    const hero = heroRow(box, { hero: { y: UT.l1 + UT.gap, h: UT.v, w: L.label.w, size: UT.v, icon: iconSize } }, { icon: U.icon, size: UT.v, iconSize, gap: 18, maxInt: 3, maxDp: 1 })
    style(hero.el, { left: '0px' })
    const q = h('span', { class: 'pr-q', html: ax(esc(U.empty)), style: { fontSize: UT.v + 'px', color: OWN_COL } })
    hero.glow.append(q)
    const chapters = [{ t: -Infinity, el: formulaEl }]
    for (const hq of holds) { chapters.push({ t: hq.t, el: hq.el }); chapters.push({ t: hq.t + hq.hold, el: formulaEl }) }
    // the finish's working is a soft cut (no slam): the board's landing owns the finish
    if (U.final) chapters.push({ t: TF, el: finalEl, soft: true })
    chapters.sort((a, b) => a.t - b.t)
    const lines = [...new Set([formulaEl, finalEl, ...holds.map(hq => hq.el)].filter(Boolean))]
    const finalTpl = U.final ? parseDisplay(U.final) : null
    if (finalTpl && !isFinite(finalTpl.value)) throw new Error('pov-race: lookOpts.unit.final has no number')
    ans = { box, hero, q, holds, chapters, lines, iconSize, finalTpl }
  }
  // the live count in the hook's unit: under a year in whole months, 1-10 years to 1 dp, then whole years
  const unitTpl = v => {
    const m = v / U.perMonth, y = v / U.per
    if (y < 1) return m < 1 ? null : { prefix: '≈ ', suffix: Math.round(m) === 1 ? ' month' : ' months', dp: 0, group: false, scale: 1, n: m }
    return { prefix: '≈ ', suffix: ' years', dp: Math.round(y * 10) / 10 < 10 ? 1 : 0, group: false, scale: 1, n: y }
  }

  // ---------- the payoff (lookOpts.payoff): the board hard-cuts to one hero number that rolls onto the answer ----------
  let pay = null
  if (lo.payoff && lo.payoff.display != null && L.hero) {
    const po = lo.payoff
    const tpl = parseDisplay(String(po.display))
    const icon = po.icon === false ? null : iconName(po.icon || (U && U.icon) || SP.item)
    const hero = heroRow(stage, L, { icon, maxInt: Math.max(1, digitsOf(tpl.value)), maxDp: tpl.dp })
    hero.el.classList.add('pr-pay')
    hero.show(String(po.display))
    // the number shrinks so icon + number fit 900 px at the 1.13 landing bump
    const w0 = hero.odo.el.offsetWidth + (icon ? L.hero.icon + 12 : 0)
    if (w0 * 1.13 > 900) {
      const k = 900 / (w0 * 1.13)
      style(hero.odo.el, { fontSize: Math.floor(L.hero.size * k) + 'px' })
      hero.show(String(po.display))
    }
    style(hero.el, { display: 'none' })
    // dur 0: no roll: the answer lands whole at t (a hard cut, then the 1.13 bump, glow, bloom and hit at t)
    const dur = po.dur != null && isFinite(+po.dur) && +po.dur >= 0 ? +po.dur : 1.4
    pay = { t: po.t != null ? +po.t : vt ?? TF + 2, dur, tpl, display: String(po.display), hero }
  }

  // ---------- label stack (captions off): the matchup at rest; each purchase is a hard cut held to its tag's end ----------
  let labels = null
  const chapters = []
  if (stackMode) {
    const rest = { l1: `<span style="color:${C.red}; text-transform: uppercase">${rich(lo.spendTag || SP.label || 'Spent')}</span> <span class="pr-vs">VS</span>`, l2: rich(OW.label || lo.ownTag || 'Invested'), l2Color: OWN_COL }
    const items = [rest, ...purchases.map(p => ({ l1: p.price ? ax(esc(p.price)) : '', l1Color: C.red, l2: rich(p.label) }))]
    labels = labelStack(stage, L, items)
    chapters.push({ t: -1e9, idx: 0 })                  // a purchase standing at frame 1 (the receipt) wins over it
    purchases.forEach((p, i) => {
      if (!(p.price || p.label)) return
      chapters.push({ t: i === 0 ? Math.min(p.t, 0) : p.t, idx: i + 1 })
      const next = purchases.slice(i + 1).find(q => q.price || q.label)
      const end = Math.max(p.t, 0) + TAGHOLD
      if (!next || end < next.t) chapters.push({ t: end, idx: 0 })        // back to the matchup
    })
    chapters.sort((a, b) => a.t - b.t)
  }

  // ---------- sound: whoosh at the start, a pop per purchase, swipe on a pass, riser → hit + cash ----------
  // a cue the spec already places (same kind within 0.25 s) is not doubled
  const specSfx = spec.sfx || []
  const cue = (t, kind, o) => {
    if (!(t >= 0)) return
    if (specSfx.some(x => x.kind === kind && Math.abs(+x.t - t) < 0.25)) return
    ctx.cue(t, kind, o)
  }
  if (R0 > 0.05) cue(R0, 'whoosh', { dur: 0.6, gain: 0.45 })
  for (const p of purchases) if (p.t > 0.02 && p.t < TF - 0.2) cue(p.t, stackMode ? 'thud' : 'pop', { gain: stackMode ? 0.6 : 0.45 })
  for (const c of passes) cue(c.t, 'swipe', { gain: 0.4 })
  const riseDur = Math.min(2.4, (R1 - R0) * 0.2)
  if (riseDur > 0.6) cue(TF - riseDur, 'riser', { dur: riseDur, gain: 0.4 })
  cue(TF, ownWins ? 'hit' : 'thud', { gain: ownWins ? 0.85 : 0.7 })
  if (ownWins) cue(TF + 0.06, 'cash', { gain: 0.55 })
  for (const st of footSteps) if (st.t > 0.05 && Math.abs(st.t - TF) > 0.3 && !(vt != null && Math.abs(st.t - vt) < 0.3)) cue(st.t, 'tick', { gain: 0.35 })
  // the answer row: a ding as each spoken year-end lands (a thud for a loss); the payoff: a roll, then a hit as it lands
  if (ans) for (const hq of ans.holds) cue(hq.t, hq.bad ? 'thud' : 'ding', { gain: hq.bad ? 0.65 : 0.45 })   // a loss lands on a thud
  if (pay) { if (pay.dur > 0) cue(pay.t, 'roll', { dur: pay.dur, gain: 0.45 }); cue(pay.t + pay.dur, 'hit', { gain: 0.75 }) }

  const duration = durationOf(spec, TF, d.hold ?? M.hold)

  // the gap fill polygon(s) between own and spend up to x, exact (crossings inserted)
  function gapPaths(x, py) {
    if (x <= xStart + 1e-9) return ['M0 0', 'M0 0']
    const xsUp = breaks.filter(b => b < x - 1e-9)
    xsUp.push(x)
    const pts = []
    for (let k = 0; k < xsUp.length; k++) {
      const b = xsUp[k]
      if (k > 0) {
        const a = xsUp[k - 1], da = diff(a), db = diff(b)
        if (da * db < 0) { const c = a + ((b - a) * da) / (da - db); pts.push(c) }
      }
      pts.push(b)
    }
    let up = '', upBack = '', dn = '', dnBack = ''
    pts.forEach((b, k) => {
      const o = vAt(OW, b), sp = vAt(SP, b)
      const X0 = pxOf(b).toFixed(1)
      const ys = py(sp).toFixed(1), yhi = py(Math.max(o, sp)).toFixed(1), ylo = py(Math.min(o, sp)).toFixed(1)
      up += (k ? 'L' : 'M') + X0 + ' ' + yhi
      upBack = 'L' + X0 + ' ' + ys + upBack
      dn += (k ? 'L' : 'M') + X0 + ' ' + ys
      dnBack = 'L' + X0 + ' ' + ylo + dnBack
    })
    return [up + upBack + 'Z', dn + dnBack + 'Z']
  }

  return {
    duration,
    layout: L,
    verdictTone: ownWins ? 'good' : 'bad',
    seek(t) {
      const x = xAt(t)
      const ymax = Y.log ? logMax : yMaxAt(t)
      const ph = phAt(t)
      const py = pyFor(ymax, ph)
      // ---- the plot box (compresses before a boxed verdict) ----
      attr(baseLine, 'y1', ph.toFixed(1)); attr(baseLine, 'y2', ph.toFixed(1))
      for (const tk of xTicks) style(tk.lab, { top: (ph + 12).toFixed(1) + 'px' })
      for (const lt of logTicks) {
        const yy = py(lt.v)
        attr(lt.g.line, 'y1', yy.toFixed(1)); attr(lt.g.line, 'y2', yy.toFixed(1))
        style(lt.g.lab, { top: (yy - 15).toFixed(1) + 'px' })
      }

      // ---- y grid (linear: rescales with the race) ----
      if (!Y.log) {
        const step = niceStep(ymax - Y.min, 4)
        grid.forEach((g, k) => {
          const v = Y.min + step * (k + 1)
          const on = v < ymax * 0.97
          attr(g.line, 'opacity', on ? '1' : '0')
          style(g.lab, { display: on ? 'block' : 'none' })
          if (!on) return
          const yy = py(v)
          attr(g.line, 'y1', yy.toFixed(1)); attr(g.line, 'y2', yy.toFixed(1))
          setText(g.lab, axisText(v, Y.prefix))
          style(g.lab, { top: (yy - 15).toFixed(1) + 'px' })
        })
      }
      for (const tk of xTicks) style(tk.lab, { opacity: tk.xv <= x + 1e-6 ? '1' : '0.4' })
      if (yearOdo) yearOdo.set(yearV(x), yearTpl)

      // ---- lines + tips (a tip waits at its first point until the race reaches it) ----
      for (const ln of lines) {
        const sr = ln.sr
        const started = x >= sr.x0 - 1e-9
        let dd = ''
        if (started) {
          let k = 0
          for (const p of sr.points) { if (p[0] > x + 1e-9) break; dd += (k++ ? 'L' : 'M') + pxOf(p[0]).toFixed(1) + ' ' + py(p[1]).toFixed(1) }
          dd += (k ? 'L' : 'M') + pxOf(x).toFixed(1) + ' ' + py(vAt(sr, x)).toFixed(1)
        }
        attr(ln.path, 'd', started ? dd : 'M0 0'); attr(ln.glow, 'd', started ? dd : 'M0 0')
        const tx = pxOf(Math.max(x, sr.x0)), ty = py(vAt(sr, Math.max(x, sr.x0)))
        const win = (sr === OW) === ownWins ? flashAt(t, TF, 0.9) : 0
        for (const c of [ln.halo, ln.dot, ln.core]) { attr(c, 'cx', tx.toFixed(1)); attr(c, 'cy', ty.toFixed(1)) }
        attr(ln.halo, 'r', (24 + 24 * win).toFixed(1))
        attr(ln.halo, 'opacity', (0.26 + 0.2 * win).toFixed(3))
      }
      if (fillUp) { const [a, b] = gapPaths(x, py); attr(fillUp, 'd', a); attr(fillDn, 'd', b) }

      // ---- purchases: icon drops onto the spend line, tag holds until the next purchase ----
      let spendHit = 0
      const tagRects = [], iconRects = []
      for (const p of purchases) {
        const a = iconAt(p, py)
        const t0 = p.t - FALL
        if (t < t0 && p.t > 0.001) {
          style(p.icon, { display: 'none' }); if (p.tag) style(p.tag, { display: 'none' }); if (p.pip) attr(p.pip, 'opacity', '0')
          continue
        }
        let dy = 0, sx = 1, sy = 1, op = 1
        if (p.t > 0.001 && t < p.t) {
          const q = prog(t, t0, FALL)
          dy = -80 * (1 - ease.in(q)); op = clamp(q / 0.3); sx = 0.94; sy = 1.08
        } else if (p.t > 0.001) {
          const w = wobble(prog(t, p.t, 0.26))
          sy = 1 - 0.18 * w; sx = 1 + 0.12 * w
          spendHit = Math.max(spendHit, 1 - ease.out(prog(t, p.t, 0.45)))
        }
        // retired (lookOpts.pips): the icon shrinks down into its point on the line and a pip pops up there
        const rq = prog(t, p.retire, PIP_DUR)
        let dx = 0
        if (rq > 0) { const e = ease.in(rq); sx *= 1 - 0.7 * e; sy *= 1 - 0.7 * e; op *= 1 - rq; dx = (a.lx - a.cx) * ease.inOut(rq) }
        style(p.icon, {
          display: rq >= 1 ? 'none' : 'block', opacity: op.toFixed(3),
          transform: `translate(${(a.cx - ICON / 2 + dx).toFixed(1)}px, ${(a.ly - ICON * ibBot + dy).toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`,
        })
        if (p.pip) {
          const pk = ease.out(prog(t, p.retire + PIP_DUR * 0.4, PIP_DUR * 0.6))
          attr(p.pip, 'opacity', pk.toFixed(3))
          attr(p.pip, 'transform', `translate(${a.lx.toFixed(1)} ${(a.ly - 2).toFixed(1)}) scale(${(0.4 + 0.6 * pk).toFixed(3)})`)
        }
        if (t >= t0 || p.t <= 0.001) iconRects.push(iconBox(p, py, t))
        if (!p.tag) continue
        const on = t >= p.t && t < p.end
        if (!on) { style(p.tag, { display: 'none' }); continue }
        const k = slam(t, p.t, { from: p.tagFrom })
        const fade = p.cut ? 1 : 1 - prog(t, p.end - 0.22, 0.22)
        const r = tagXY(p, p.spot, a)
        style(p.tag, {
          display: 'flex', left: r.left.toFixed(1) + 'px', top: r.top.toFixed(1) + 'px',
          opacity: (k.o * fade).toFixed(3), transform: `scale(${k.s.toFixed(4)})`, transformOrigin: p.spot.v === 'b' || p.spot.v === 'T' ? '50% 0%' : p.spot.v === 'a' ? '50% 100%' : p.spot.v === 'P' ? '50% 50%' : '0% 50%',
        })
        tagRects.push([r.left - 8, r.top - 8, r.left + p.tw + 8, r.top + p.th + 8])
      }
      // the spend tip's tag: fades in once it stays clear, bumps with the finish (and bows out before a squeeze)
      if (sTag) {
        let a = 0
        for (const r of sTag.runs) if (t >= r.on && t <= r.off) a = Math.max(a, Math.min(ease.out(prog(t, r.on, 0.25)), 1 - prog(t, r.off - 0.25, 0.25)))
        if (a <= 0.001) style(sTag.el, { display: 'none' })
        else {
          const c = counter(SP, t)
          setText(sTag.num, formatLike(c.v, c.tpl))
          style(sTag.el, { display: 'flex' })
          const R = sTagAt(t, py), w = sTag.el.offsetWidth
          const k = bump(t, TF, { amp: 0.1, dur: 0.45 })
          style(sTag.el, {
            left: (R[2] - w).toFixed(1) + 'px', top: R[1].toFixed(1) + 'px', opacity: a.toFixed(3),
            transform: `translateY(${(10 * (1 - a)).toFixed(1)}px) scale(${k.toFixed(4)})`,
          })
          tagRects.push([R[2] - w - 8, R[1] - 8, R[2] + 8, R[3] + 8])
        }
      }

      // the year clock dims while a line or a tag runs through it (a pure function of this frame's geometry)
      if (yearBox) {
        const yr = [12, 0, 12 + yearBox.offsetWidth, YS * 0.88]
        let ink = 0
        for (const ln of lines) {
          const sr = ln.sr
          if (x < sr.x0) continue
          let px0 = null, py0 = null
          for (const q of sr.points) {
            if (q[0] > x + 1e-9) break
            const X1 = pxOf(q[0]), Y1 = py(q[1])
            if (px0 != null) ink += clipLen(px0, py0, X1, Y1, yr)
            px0 = X1; py0 = Y1
          }
          if (px0 != null) ink += clipLen(px0, py0, pxOf(x), py(vAt(sr, x)), yr)
        }
        for (const R of tagRects) {
          const ox = Math.min(R[2], yr[2]) - Math.max(R[0], yr[0]), oy = Math.min(R[3], yr[3]) - Math.max(R[1], yr[1])
          if (ox > 0 && oy > 0) ink += (ox * oy) / 40
        }
        style(yearBox, { opacity: (1 - 0.6 * clamp(ink / 160)).toFixed(3) })
      }

      // axis labels step aside under a tag (or a lead purchase's icon standing in the margin)
      if (!Y.log) grid.forEach(g => {
        if (g.lab.style.display === 'none') return
        const yy = parseFloat(g.lab.style.top), w = g.lab.textContent.length * 18
        const box = [-16 - w, yy + 4, -16, yy + 28]
        style(g.lab, { visibility: tagRects.some(R => hit(R, box)) || iconRects.some(R => hit(R, box)) ? 'hidden' : 'visible' })
      })
      for (const tk of xTicks) {
        const cx = pxOf(tk.xv), w = String(tk.xv).length * 18
        style(tk.lab, { visibility: tagRects.some(R => hit(R, [cx - w / 2, ph + 10, cx + w / 2, ph + 44])) ? 'hidden' : 'visible' })
      }

      // ---- the scoreboard: both counters, live; the stock number goes coral while under water ----
      const cS = counter(SP, t), cO = counter(OW, t)
      H_SP.odo.set(cS.v, cS.tpl)
      H_OW.odo.set(cO.v, cO.tpl)
      const vS = t >= TF ? SP.endV : vAt(SP, x), vO = t >= TF ? OW.endV : vAt(OW, x)
      const under = clamp((vS - vO) / Math.max(1e-9, Math.abs(vS) * 0.03))
      const ownCol = under > 0 ? mix(OWN_COL, C.red, under) : OWN_COL
      style(H_OW.odo.el, { color: ownCol })
      style(H_OW.num, { filter: `drop-shadow(0 0 var(--glow, 16px) ${under > 0.5 ? rgba(C.red, 'var(--glowA, 0.38)') : rgba(OWN_COL, 'var(--glowA, 0.38)')})` })
      style(H_SP.odo.el, { color: spendHit > 0 ? mix(SPEND_COL, C.red, spendHit) : SPEND_COL })

      // bumps: a purchase bumps SPENT; a pass bumps the side taking the lead; the finish bumps the winner
      let sS = 1, sO = 1, glow = 0, fl = 0
      for (const p of purchases) if (p.t > 0.001) sS *= bump(t, p.t, { amp: 0.06, dur: 0.32 })
      for (const c of passes) {
        if (c.up) sO *= bump(t, c.t, { amp: 0.07 }); else sS *= bump(t, c.t, { amp: 0.05 })
        if (c.up && t >= c.t) glow = Math.max(glow, 0.45 * (1 - ease.out(prog(t, c.t, 0.5))))
        if (c.up) fl = Math.max(fl, 0.12 * flashAt(t, c.t, 0.45))
      }
      if (ownWins) {
        sO *= bump(t, TF, { amp: 0.1, dur: 0.5 })
        if (t >= TF) glow = Math.max(glow, 1 - ease.out(prog(t, TF, 1.1)))
        fl = Math.max(fl, 0.55 * flashAt(t, TF, 0.9))
      } else sS *= bump(t, TF, { amp: 0.08, dur: 0.45 })
      // clean cover: the counters wait LED-off, then slam in as the race starts
      let numO = 1
      if (clean) {
        const k = slam(t, R0)
        numO = t < R0 ? 0 : k.o
        if (t >= R0) { sS *= k.s; sO *= k.s }
        for (const hf of [H_SP, H_OW]) style(hf.led, { display: t < R0 ? 'flex' : 'none' })
      }
      style(H_SP.num, { transform: sS !== 1 ? `scale(${sS.toFixed(4)})` : 'none', opacity: String(numO) })
      style(H_OW.num, { transform: sO !== 1 ? `scale(${sO.toFixed(4)})` : 'none', opacity: String(numO) })
      style(H_OW.num, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.36 + 0.45 * glow).toFixed(3) })

      // ---- the answer row: line 1 the working (hard cuts), line 2 the stake in the hook's unit ----
      if (ans) {
        let ch = ans.chapters[0]
        for (const c of ans.chapters) if (t >= c.t) ch = c
        for (const el of ans.lines) {
          if (el !== ch.el) { style(el, { display: 'none' }); continue }
          const k = ch.t > 0 ? (ch.soft ? { o: 0.6 + 0.4 * prog(t, ch.t, 0.12), s: 1 } : slam(t, ch.t, { from: el.__from })) : { o: 1, s: 1 }
          style(el, { display: 'block', opacity: k.o.toFixed(3), transform: k.s !== 1 ? `scale(${k.s.toFixed(4)})` : 'none' })
        }
        const hr = ans.hero
        let held = null
        for (const hq of ans.holds) if (t >= hq.t && t < hq.t + hq.hold) held = hq
        let mode = null, tp = null, bad = false
        if (U.final && t >= TF) mode = 'final'
        else if (held) { mode = 'held'; bad = held.bad }
        else if (t >= R0) {
          let v = counter(OW, t).v
          let last = null
          for (const hq of ans.holds) if (t >= hq.t + hq.hold) last = hq
          if (last) { const p = prog(t, last.t + last.hold, 0.35); if (p < 1) v = lerp(last.v, v, ease.out(p)) }
          tp = unitTpl(v)
          if (tp) mode = 'live'
        }
        // show the right piece BEFORE setting it: the icon is placed from the number's laid-out width
        style(hr.odo.el, { display: mode ? '' : 'none' })
        style(ans.q, { display: mode ? 'none' : 'inline-block' })
        // the finish: no landing here (the board's dollars own the finish, the payoff lights the answer): the count
        // rests on `final` with its "≈" still an unlit ghost, and line 2 dims to half
        if (mode === 'final') hr.set(ans.finalTpl.value * ans.finalTpl.scale, ans.finalTpl, true)
        else if (mode === 'held') hr.show(held.display)
        else if (mode === 'live') hr.set(tp.n, tp, true)
        else if (hr.icon) style(hr.icon, { left: (L.label.w / 2 - (ans.q.offsetWidth + ans.iconSize + 18) / 2).toFixed(1) + 'px' })
        // landings: bump, glow flare and a floor bloom on each spoken year-end (none at the finish)
        let sc = 1, g = 0
        for (const hq of ans.holds) {
          sc *= bump(t, hq.t, { amp: 0.09 })
          if (t >= hq.t) g = Math.max(g, 1 - ease.out(prog(t, hq.t, 0.9)))
          fl = Math.max(fl, 0.2 * flashAt(t, hq.t, 0.6))
        }
        const dim = mode === 'final' ? 1 - 0.5 * ease.out(prog(t, TF, 0.3)) : 1
        style(hr.el, { transform: sc !== 1 ? `scale(${sc.toFixed(4)})` : 'none', opacity: dim.toFixed(3) })
        style(hr.odo.el, { color: bad ? C.red : OWN_COL })
        style(hr.glow, {
          filter: bad ? `drop-shadow(0 0 var(--glow, 16px) ${rgba(C.red, 'var(--glowA, 0.38)')})` : '',
          '--glow': (16 + 26 * g).toFixed(1) + 'px', '--glowA': (0.36 + 0.4 * g).toFixed(3),
        })
      }

      // ---- the payoff: the board hard-cuts to one hero number that rolls onto the answer ----
      if (pay) {
        const y = prog(t, pay.t - 0.067, 0.067)
        style(board, { opacity: String(1 - y), transform: y > 0 ? `translateY(${(14 * y).toFixed(1)}px)` : 'none', visibility: y >= 1 ? 'hidden' : 'visible' })
        const hr = pay.hero
        if (t < pay.t) style(hr.el, { display: 'none' })
        else {
          const p = prog(t, pay.t, pay.dur), tLand = pay.t + pay.dur
          style(hr.el, { display: 'block' })            // visible before set: the icon is placed from the number's width
          if (p < 1) hr.set(pay.tpl.value * pay.tpl.scale * ease.out(p), pay.tpl, true)
          else hr.show(pay.display)
          // a roll slams in, then lands; a hard cut (dur 0) lands as it appears: the bump is its only scale move
          const k = pay.dur > 0 ? slam(t, pay.t) : { o: 0.6 + 0.4 * prog(t, pay.t, 0.08), s: 1 }
          const sc = k.s * bump(t, tLand, { amp: 0.13, dur: 0.5 })
          const g = t >= tLand ? 1 - ease.out(prog(t, tLand, 1.1)) : 0
          style(hr.el, { opacity: k.o.toFixed(3), transform: `scale(${sc.toFixed(4)})` })
          style(hr.glow, { '--glow': (16 + 30 * g).toFixed(1) + 'px', '--glowA': (0.36 + 0.45 * g).toFixed(3) })
          fl = Math.max(fl, 0.55 * flashAt(t, tLand, 0.9))
        }
      }
      flash.set(fl)

      // ---- label stack (captions off) ----
      if (labels) {
        let ch = chapters[0]
        for (const c2 of chapters) if (t >= c2.t) ch = c2
        labels.seek(t, ch.idx, ch.t)
      }

      // (the verdict, the label stack's yield and the footer are the chrome's)
    },
  }
}
