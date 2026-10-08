// Scoreboard: unit-ladder — "Cost in units of X" (P8). The flagship of the look.
//
// One division (cost ÷ unit price) repeated on a cheap → huge ladder. Each rung is a hard cut:
//   1. the label stack slams in (line 1: "$799 ÷ $5" in green/grey, line 2: the item in big white caps)
//   2. the pile re-packs into smaller cells (the camera "pulls back" without a camera move)
//   3. new unit icons rain onto the pile while the hero odometer rolls in sync (same ease.out curve)
//   4. the count lands exactly on rung.unitsDisplay with a bump + glow flash (the biggest rung fills the stage)
// Frame 1 shows the rule (header), the unit itself (hero "1", one icon dropping in: it lands at 0.2 s, "$5 / LATTE")
// and the footer.
// If the first rung starts before 0.5 s there is no unit intro: frame 1 is already mid-roll on rung 1.
//
// Overflow rungs: a rung too big for the pile at its density (cells under 5 px) would fill the stage just like the
// climax, so two huge rungs (a 1985 house and a 2026 house) would look the same. From the first such rung on, every
// LED dot stands for the same number of units as in the climax wall: an overflow rung fills the stage with bigger
// dots, and the next rung re-packs it into exactly units_prev / units_next of the stage before its own dots rain in
// (the area ratio on screen is the real ratio).
// Payoff (lookOpts.payoff, optional): after the ladder the hero cuts to `from` (default: the unit price) and rolls up
// to `display` (a display string, printed exactly), landing with the climax impact: "what the unit would cost" lands
// last in the hero. With `label`, the label stack cuts to it at the payoff (line 2, e.g. "ROSE LIKE A HOUSE?"; line 1
// `working`, optional), so the question sits under the rolling hero and the verdict (timed on the landing) answers it.
// Without a split the wall dims behind the payoff.
// Split (lookOpts.split, optional): once the last rung cuts, the previous rung's dots (re-packed into the last wall)
// turn a second tint (white), so the earlier share stays readable inside the climax wall; `tags` [prev, last] name the
// two parts with small pills (prev on its mound, last on the new dots). The wall then stays lit behind the payoff.
// Captions hide from verdict.t (the verdict carries that line; no copy of it under itself), or from the payoff cut
// when the payoff has a label (the label stack carries the question from there).
// introHero: 'price' shows the unit price in the hero on the unit intro (frame 1 reads "$1.50", not a bare "1").
//
// data: { unit: { name, price, icon }, rungs: [{ t, item, cost, units, unitsDisplay, tone? }], hold }
// lookOpts: { heroIcon = true, density = 0.62, climaxFill = 1, intro = 'auto' | true | false, pips = true,
//             introHero = 'count' | 'price',
//             payoff: { t = verdict.t, from = unit.price, display, roll = 1.4, label, working },
//             split: true | { tags: [prevTag, lastTag], tint } }
import { css as style, attr, h, prog, ease, clamp, lerp } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import { rich, esc, ax, heroRow, labelStack, unitStack, stageFlash, flashAt, ladderPips, parseDisplay, bump, slam, durationOf, beatTimes, toneColor } from '../lib.js'

export const css = `
#stage[data-ul-caps="off"] .sb-caps { visibility: hidden !important; }
.ul-tag { position: absolute; transform-origin: 50% 50%; padding: 2px 18px 4px; border-radius: 10px; background: #07090C;
  border: 2px solid #232B36; font: 400 46px/1.08 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.02em; text-transform: uppercase;
  white-space: nowrap; z-index: 6; }
`

export default function unitLadder(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const L = layoutFor(spec)
  const stage = ctx.stage
  const unit = { name: 'unit', price: '', icon: 'token', ...(d.unit || {}) }
  const rungs = (d.rungs || []).filter(r => r && r.units != null)
  if (!rungs.length) throw new Error('unit-ladder: data.rungs is empty')
  const times = beatTimes(rungs, { first: 1.0, every: 3.4 })
  const intro = lo.intro === true || (lo.intro !== false && times[0] >= 0.5)

  // ---------- targets: what the hero lands on, per rung ----------
  const targets = rungs.map(r => {
    const disp = r.unitsDisplay != null ? String(r.unitsDisplay) : String(r.units)
    const tpl = parseDisplay(disp)
    const val = isFinite(tpl.value) ? tpl.value * tpl.scale : +r.units
    return { disp, tpl, val }
  })
  const priceHero = lo.introHero === 'price' && unit.price && isFinite(parseDisplay(String(unit.price)).value)
  const introTpl = priceHero ? parseDisplay(String(unit.price)) : parseDisplay('1')
  const introVal = introTpl.value * introTpl.scale

  // ---------- stack plan (one step per rung; the intro is a single icon already landed) ----------
  const steps = []
  // the lone unit is a big hero object; it drops in across frame 1 (mid-fall at 0.0 s, lands at INTRO_LAND with its
  // squash): the thumbnail is already in motion, and the hero reads "1" (the unit) throughout
  const INTRO_LAND = 0.2
  if (intro) steps.push({ t: INTRO_LAND - 0.7, n: 1, roll: 0.7, delay: 0, max: 230, fall: 0.45, drop: 300 })
  rungs.forEach((r, i) => {
    const prevN = i ? +rungs[i - 1].units : intro ? 1 : 0
    const last = i === rungs.length - 1
    let roll = clamp(0.5 + 0.34 * Math.log10(Math.abs(+r.units - prevN) + 1), M.rollMin, M.rollMax)
    if (last) roll = Math.max(roll, M.rollFinal)
    const gapToNext = i + 1 < rungs.length ? times[i + 1] - times[i] : Infinity
    roll = Math.min(roll, Math.max(0.45, gapToNext - M.regrid - 0.5))
    const first = i === 0 && !intro
    steps.push({
      t: first ? Math.min(times[0], 0) - 0.45 : times[i],   // no intro: frame 1 is already 0.45 s into the roll
      n: +r.units, roll, delay: first ? 0 : M.regrid,
      occ: last ? (lo.climaxFill ?? 1) : (lo.density ?? 0.62),
    })
  })
  const off = intro ? 1 : 0
  const landAt = k => steps[k].t + steps[k].delay + steps[k].roll

  // ---------- overflow rungs share the climax wall's dot scale (see the header) ----------
  const BASE_MIN = 5, DOT_MAX = 9.6
  const box = { x: 120, y: L.stage.y + 6, w: 820, h: L.stage.h - 10 }
  const capAt = c => Math.floor(box.w / c) * Math.floor(box.h / c)
  const lastU = +rungs[rungs.length - 1].units
  const dens = lo.density ?? 0.62
  const over = rungs.map((r, i) => i < rungs.length - 1 && Math.sqrt((box.w * box.h * dens) / Math.max(1, +r.units)) < BASE_MIN)
  const firstOver = over.indexOf(true)
  const minCell = firstOver < 0 ? BASE_MIN : clamp(DOT_MAX / Math.sqrt(lastU / +rungs[firstOver].units), 2.5, BASE_MIN)
  const pileSteps = steps.map((st, k) => {
    const ri = k - off
    if (ri < 0 || !over[ri]) return st
    const c = clamp(minCell * Math.sqrt(lastU / +rungs[ri].units), minCell, DOT_MAX)
    return { ...st, n: capAt(c), occ: 1, max: c }
  })

  // ---------- DOM ----------
  const po = lo.payoff && lo.payoff.display != null ? lo.payoff : null
  const payDisp = po ? [String(po.display), String(po.from ?? unit.price ?? '')] : []
  const widest = [...targets.map(x => x.disp), priceHero ? String(unit.price) : '1', ...payDisp].reduce((a, b) => (b.length > a.length ? b : a), '')
  const estEm = widest.replace(/[^\d]/g, '').length * 0.5 + (widest.match(/,/g) || []).length * 0.22 + widest.replace(/[\d,.\s]/g, '').length * 0.5 + 0.3
  const showIcon = lo.heroIcon !== false
  const HS = L.hero.size, HI = L.hero.icon
  const heroSize = Math.round(Math.min(HS, (920 - (showIcon ? HI + 12 : 0)) / estEm))
  // the pile may use x 60-940 (no readable text in it): the climax wall reaches the left margin
  const stack = unitStack(stage, {
    box, icon: unit.icon, maxCell: 150, minCell, seed: 23,
  }).plan(pileSteps)
  const flash = stageFlash(stage, L)
  const hero = heroRow(stage, L, { icon: showIcon ? unit.icon : null, size: heroSize, iconSize: Math.round(HI * Math.min(1, heroSize / HS + 0.1)) })

  const price = ax(esc(unit.price))
  const items = []
  // (a price hero already says the price: the intro label is just the unit's name)
  if (intro) items.push({ l1: priceHero ? '' : price, l2: rich(unit.label || unit.name) })
  rungs.forEach(r => items.push({
    l1: `${ax(esc(r.cost))}${unit.price ? `<span class="op"> ÷ ${price}</span>` : ''}`,
    l1Color: r.tone && r.tone !== 'neutral' ? toneColor(r.tone) : C.green,
    l2: rich(r.item),
  }))
  const payIdx = po && (po.label || po.working) ? items.length : -1
  if (payIdx >= 0) items.push({ l1: po.working ? ax(esc(String(po.working))) : '', l2: rich(String(po.label || '')) })
  const labels = labelStack(stage, L, items)
  const pips = lo.pips === false ? null : ladderPips(stage, { x: 76, bottom: L.stage.y + L.stage.h - 22, n: rungs.length, gap: Math.min(30, (L.stage.h - 60) / rungs.length) })

  // ---------- sound: a thud on each cut, ticks while the count rolls, a ding when it lands ----------
  if (intro) ctx.cue(INTRO_LAND, 'pop', { gain: 0.35 })
  rungs.forEach((r, i) => {
    const k = i + off, st = steps[k], last = i === rungs.length - 1
    if (st.t > 0.05) ctx.cue(st.t, 'thud', { gain: 0.65 })
    const r0 = Math.max(0, st.t + st.delay)
    const added = stack.steps()[k].land
    if (added.length && added.length <= 12 && !last) for (const L1 of added) ctx.cue(Math.max(0, L1), 'pop', { gain: 0.32 })   // few icons: one pop each
    else ctx.cue(r0, 'roll', { dur: Math.max(0.3, landAt(k) - r0 - 0.05), gain: 0.75 })
    if (last) ctx.cue(Math.max(0, st.t), 'riser', { dur: Math.max(0.5, landAt(k) - st.t), gain: 0.5 })
    ctx.cue(landAt(k), last ? 'hit' : 'ding', { gain: last ? 0.9 : 0.5 })
    if (last) ctx.cue(landAt(k) + 0.06, 'cash', { gain: 0.65 })
  })

  const lastLand = landAt(steps.length - 1)

  // ---------- payoff: the hero cuts to the unit price and rolls up to what it would cost ----------
  let pay = null
  if (po) {
    const pt = po.t != null ? +po.t : spec.verdict && spec.verdict.t != null ? +spec.verdict.t : lastLand + 1.5
    const fromTpl = parseDisplay(String(po.from ?? unit.price ?? '0'))
    const toTpl = parseDisplay(String(po.display))
    pay = { t: Math.max(pt, lastLand + 0.3), delay: 0.2, roll: po.roll != null ? +po.roll : 1.4,
      from: fromTpl.value * fromTpl.scale, to: toTpl.value * toTpl.scale, toTpl }
    pay.land = pay.t + pay.delay + pay.roll
    ctx.cue(pay.t + pay.delay, 'roll', { dur: pay.roll - 0.05, gain: 0.6 })
    ctx.cue(pay.land, 'hit', { gain: 0.9 })
    ctx.cue(pay.land + 0.06, 'cash', { gain: 0.7 })
  }
  const duration = durationOf(spec, pay ? Math.max(lastLand, pay.land + 1.5 - (d.hold ?? M.hold)) : lastLand, d.hold ?? M.hold)
  const vT = spec.verdict && spec.verdict.text && spec.verdict.t != null ? Math.max(0, +spec.verdict.t) : null
  const capsOff = pay && payIdx >= 0 ? (vT != null ? Math.min(vT, pay.t) : pay.t) : vT

  // ---------- split: the previous rung's share of the last wall in a second tint, tagged (see the header) ----------
  const lastK = steps.length - 1
  const SPLIT_GAP = 0.12                                  // unitStack's default cell gap
  let split = null
  if (lo.split && rungs.length >= 2) {
    const so = lo.split === true ? {} : lo.split
    const st = stack.steps()[lastK], prev = st && st.prev
    const keep = prev ? Math.min(st.prevCount, st.lay.count) : 0
    // only where both walls are LED dots (cells under 10 px): the tint redraws the same dots, nothing else
    if (keep > 0 && prev.lay.sz < 10 && st.lay.sz < 10) {
      let top = Infinity
      for (let j = 0; j < keep; j++) top = Math.min(top, st.lay.pos[j * 2 + 1])
      const bottom = box.h
      const tags = (Array.isArray(so.tags) ? so.tags : []).map((tx, k) => {
        if (tx == null || tx === '') return null
        const el = h('div', { class: 'ul-tag', html: ax(esc(String(tx))) })
        style(el, { color: k === 0 ? C.white : C.green })
        stage.append(el)
        const w = el.offsetWidth, hh = el.offsetHeight
        // prev: in the middle of its mound; last: centred in the new dots above it
        const cy = k === 0 ? box.y + top + (bottom - top) * 0.52 : box.y + top * 0.5
        style(el, { left: (540 - w / 2).toFixed(1) + 'px', top: (cy - hh / 2).toFixed(1) + 'px', display: 'none' })
        return { el, t0: k === 0 ? st.t + M.regrid + 0.05 : landAt(lastK) }
      }).filter(Boolean)
      split = { st, prev, keep, tint: so.tint || '#E4E9EF', tags, g: stack.el.getContext('2d') }
    }
  }
  function drawSplit(t) {
    const { st, prev, keep, g } = split
    if (t < st.t) return
    const rp = ease.inOut(prog(t, st.t, M.regrid))
    const cell = lerp(prev.lay.sz, st.lay.sz, rp)
    const dd = Math.max(2, cell * 0.64)
    g.globalAlpha = 0.96 * rp
    g.fillStyle = split.tint
    for (let j = 0; j < keep; j++) {
      const x = lerp(prev.lay.pos[j * 2] + prev.lay.sz / 2, st.lay.pos[j * 2] + st.lay.sz / 2, rp)
      const yb = lerp(prev.lay.pos[j * 2 + 1] + prev.lay.sz, st.lay.pos[j * 2 + 1] + st.lay.sz, rp) - (cell * SPLIT_GAP) / 2
      g.fillRect(x - dd / 2, yb - dd - cell * 0.06, dd, dd)
    }
    g.globalAlpha = 1
  }

  return {
    duration,
    layout: L,
    seek(t) {
      stack.seek(t)
      if (split) {
        drawSplit(t)
        for (const tg of split.tags) {
          const on = t >= tg.t0
          style(tg.el, { display: on ? 'block' : 'none' })
          if (on) {
            const k = slam(t, tg.t0, { from: 1.25 })
            style(tg.el, { opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
          }
        }
      }
      // the payoff label, then the verdict, carry the last lines: no caption copy under them
      if (capsOff != null) attr(stage, 'data-ul-caps', t >= capsOff ? 'off' : 'on')

      // active rung (label + hero)
      let i = -1
      for (let j = 0; j < rungs.length; j++) if (t >= times[j]) i = j
      if (!intro && i < 0) i = 0
      let labelIndex = i < 0 ? 0 : i + off
      let labelT0 = i < 0 || (i === 0 && !intro) ? 0 : times[i]
      if (pay && payIdx >= 0 && t >= pay.t) { labelIndex = payIdx; labelT0 = pay.t }
      labels.seek(t, labelIndex, labelT0)
      if (pips) pips.seek(t, i, labelT0)

      // hero odometer, synced to the pile's landing curve
      let k = -1
      for (let j = 0; j < steps.length; j++) if (t >= steps[j].t) k = j
      if (pay && t >= pay.t) {
        // the payoff: from the unit price (an unlit ≈ while it runs) up to the answer, landing exactly on it
        const p = prog(t, pay.t + pay.delay, pay.roll)
        if (p >= 1) hero.set(pay.to, pay.toTpl)
        else hero.set(lerp(pay.from, pay.to, ease.out(p)), pay.toTpl, true)
      } else if (k < 0 || (intro && k === 0)) hero.set(introVal, introTpl)
      else {
        const ri = k - off, st = steps[k], tg = targets[ri]
        const from = ri > 0 ? targets[ri - 1].val : intro ? 1 : 0
        const p = prog(t, st.t + st.delay, st.roll)
        if (p >= 1) hero.set(tg.val, tg.tpl)
        else if (p <= 0) {
          // between the cut and the first landing the hero holds the previous rung's exact display
          if (ri > 0) hero.set(targets[ri - 1].val, targets[ri - 1].tpl)
          else if (intro) hero.set(introVal, introTpl)
          else hero.set(0, introTpl)
        } else hero.set(lerp(from, tg.val, ease.out(p)), tg.tpl)
      }

      // landing bump + glow flash (bigger on the last rung); a small dip on each cut (anticipation)
      let sc = 1, glow = 0
      for (let j = off; j < steps.length; j++) {
        const st = steps[j], L1 = landAt(j), last = j === steps.length - 1
        if (st.t > 0.05) sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, st.t, 0.28))
        sc *= bump(t, L1, { amp: last ? 0.13 : 0.08, dur: last ? 0.5 : M.bump })
        if (t >= L1) glow = Math.max(glow, (last ? 1 : 0.6) * (1 - ease.out(prog(t, L1, last ? 1.1 : 0.6))))
      }
      if (pay) {
        sc *= 1 - 0.05 * Math.sin(Math.PI * prog(t, pay.t, 0.3))
        sc *= bump(t, pay.land, { amp: 0.15, dur: 0.55 })
        if (t >= pay.land) glow = Math.max(glow, 1 - ease.out(prog(t, pay.land, 1.2)))
      }
      style(hero.el, { transform: `scale(${sc.toFixed(4)})` })
      let fl = 0
      for (let j = off; j < steps.length; j++) {
        const last = j === steps.length - 1
        fl = Math.max(fl, (last ? 0.75 : 0.22) * flashAt(t, landAt(j), last ? 0.9 : 0.45))
      }
      if (pay) fl = Math.max(fl, 0.75 * flashAt(t, pay.land, 0.9))
      flash.set(fl)
      // the wall steps back behind the payoff
      if (pay && !split) style(stack.el, { opacity: (1 - 0.62 * ease.inOut(prog(t, pay.t, 0.45))).toFixed(3) })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })
    },
  }
}
