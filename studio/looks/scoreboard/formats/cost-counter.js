// Scoreboard: cost-counter — the real-time cost counter (rank 10), HD Guy's F-16 grammar ("X Cost in Real Time").
//
// One continuous stretch, 0 cuts on the stage. A dollar counter ticks at a fixed real rate; milestones pop as
// they pass.
//   Top bar   the hook, the hero counter (set about 8% under its full fit: air under the header and above the
//             footer) and the footer (the rate's working, spec.footer). The hero is a debt-clock
//             counter: only the digits the count has reached are on the board (HD Guy's "$0.30", no leading zeros),
//             and the "$" hugs the leading digit, so the number grows a digit at a time and stays centred. The
//             counter is linear in real time (crisp digital ticks when it moves more than one unit a frame; a
//             mechanical roll on the last digit when it is slower). A "≈" in `final` is an unlit ghost while the
//             count runs and lights when the clock stops on `final` exactly (bump, glow flare, cash).
//   Stage     the next milestone as a big unit icon, a ghost that fills from the bottom with the real thing as the
//             count climbs (fill = count ÷ milestone value, so it tops out exactly as the counter passes it; a neon
//             level line rides the fill inside the icon's silhouette). When it passes: the icon pops (bump, glow,
//             floor bloom), the label stack slams the milestone in, a thud + ding, and the icon flies into its slot
//             on the milestone ladder (the left margin: one small icon per milestone, lit when passed, the next one
//             glowing, the rest unlit), while the next milestone's ghost drops in (already part full: every dollar
//             so far counts toward it). The last milestone stays big and lit in the centre (riser, hit + cash).
//   Bottom    the label stack. Its resting state is the rate and what is counted: line 1 data.rateDisplay ("≈ $30,800
//             every second", the words grey), line 2 data.label ("NEW US DEBT SINCE THE COUNTER STARTED"); without a
//             label, the rate split ("≈ $30,800" / "EVERY SECOND"). A milestone flashes in for `flash` s (or until the
//             next beat), then the resting state comes back. lookOpts.rateSteps add rate beats ("≈ $111 MILLION AN
//             HOUR").
// A long or two-line spec.footer gets a two-line footer row (the kit grid makes room).
// Frame 1: the header, the hero (the start value, or already running when counterT[0] < 0: the look's real-time
//   grammar, so samples start it at -0.4 s), the footer, the resting label stack and the first milestone's empty
//   ghost (the open loop), the ladder counting what's ahead.
//
// data (FORMATS.md §10): { label, perSecond, rateDisplay, counterT: [t0, t1], startValue = 0, prefix = '$', dp = 0,
//   milestones: [{ value, label, icon?, display?, name? }], final, hold }
//   (an icon that repeats gets a multiplier badge from the number its name leads with: "×10", "×40"; else a stacked
//   twin on the ladder, so rungs never look the same)
//   A milestone label "Name: $amount" splits into the label stack's two lines (l2 = name, l1 = amount); without a
//   colon the whole label is line 2. milestone.icon picks its icon (else a keyword guess: house, car, pay → bill …).
// lookOpts (all optional; README.md has the same list):
//   intro:     { l1, l2 }                    the label stack's resting state (default: rateDisplay split)
//   labels:    [{ l1, l2 }]                  per milestone, overrides the split label (e.g. "$1,251 × 52 = $65,052")
//   rateSteps: [{ t, l1, l2, d? }]           extra rate beats in the label stack (held d s, default 4 s / next beat)
//   icons:     ['house', ...]                per-milestone icon names
//   flash:     3.0                           seconds a milestone holds the label stack before the rate returns
//   pips:      true                          the milestone ladder on the left margin
//   ticks:     true                          a soft tick each real second while the counter runs
//   heroIcon:  false | '<icon>'              a unit icon beside the hero counter
//   tone:      'good' | 'bad' | 'neutral'    hero colour (default green: money)
//   pipLabels: ['$65,052', ...]              a price beside each ladder icon (display strings; grey ahead, white next,
//                                            green passed); the big icon then sits right of that column, a flying icon
//                                            ducks the labels it crosses, and the big icon carries its own as a tag
//   tags:      true                          with pipLabels: the big icon's target ("$250K") under its art, white
//                                            while it fills, green on the pass, gone when it flies (false: off)
//   pipPassed: ['≈ 2 weeks', ...]            with pipLabels: what a ladder label turns into once its milestone is
//                                            passed (as its icon lands in the slot, with the slot's bump): the target
//                                            ahead, the answer behind, so the passed rows read as a column of results
//                                            (null keeps that row's pipLabel); the column is sized for the wider text
//                                            A leading "≈ " (in either list) hangs in a fixed gutter at the column's
//                                            left edge, so the digits and words of every row align and the ≈ sits in
//                                            the margin (a column with no "≈" has no gutter)
//   badges:    true                          false: a repeated icon never takes a "×N" badge from its name (names that
//                                            lead with a time, "5 seconds", are not counts); it gets the stacked twin
//   climaxScale: false | true | 1.3          the last milestone's icon grows on its pass (the pop): true = to the art
//                                            width of the widest icon before it, a number = that factor; capped by the
//                                            stage room (top to the stage foot, or to the verdict band) at the pop's
//                                            peak. Its tag yields as it grows (the hero has just landed on the number)
//   tallVerdict: false | true                the verdict takes the kit's 196 px boxed slot over the stage foot (a black
//                                            band rises there), so a two-line verdict sets at about 78 px, above the
//                                            label lines, instead of about 70 px in the 170 px label slot
//   slot:      { label, empty, t, fill, tone }   an answer readout in the stage's top-right corner: `empty` ("$___")
//                                            from frame 1, `fill` slams in at t in the tone colour (buzz when bad)
//   stream:    14 | false                    dots a second in the money stream (false: off)
//   icon:      'coin'                        the stage icon when there are no milestones (it fills toward `final`)
// The big icons keep clear of the ladder column at their biggest frame: the pass bump's peak (1 + amp) plus the glow,
// so the art box shifts right of the region's centre (up to a resting right edge of x 960) or, past that, shrinks.
// The verdict is the chrome's (the kit's one verdict slot at the foot of the frame; lookOpts.tallVerdict its boxed one).
import { h, s, css as style, attr, prog, ease, clamp, lerp, rng, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, labelStack, stageFlash, flashAt, parseDisplay, bump, wobble, slam, slamFromFor, inkWidth, durationOf,
  ICONS, iconName, iconSVG, toneColor,
} from '../lib.js'

const GHOST_A = 0.1                         // the unlit "≈": the counter's colour at this alpha (not text to read)
const GHOST_ICON = 0.2                      // opacity of an unfilled milestone icon
const TAG_PX = 52                           // the big icon's target tag (its pip label, under the art)
const TAG_ROOM = 64                         // stage height the tag takes from the big icon's art box
const HERO_K = 0.92                         // the hero's cap height vs the board's fit (air above and below it)
const AMP_PASS = 0.12, AMP_LAST = 0.16      // the big icon's pop on a pass (bump peaks at 1 + amp), and on the last one
const GLOW_PAD = 16                         // how far the pop's glow reads past the art's edge
const CLEAR = 14                            // the art's least gap to the ladder column at its biggest frame
const ART_R = 960                           // the art's resting right edge may reach this (decoration)
const GROW = 0.5, AMP_GROW = 0.08           // climaxScale: the growth's duration and the bump riding on it
const AX_LEAD = /^≈\s+/                     // a leading "≈ " (hangs in the ladder column's gutter)

export const css = `
.cc-hero { position: absolute; transform-origin: 50% 55%; }
.cc-glow { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  filter: drop-shadow(0 0 var(--glow, 16px) rgba(var(--rgb), var(--glowA, 0.38))); }
.cc-odo .off { color: rgba(var(--rgb), ${GHOST_A}); }
.cc-odo .cc-ax { display: inline-block; height: 1em; line-height: 1; white-space: pre; }
.cc-final { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; white-space: nowrap; }
.cc-final .sp { display: inline-block; width: 0.13em; }
.cc-stage { position: absolute; left: 0; overflow: hidden; }
.cc-big { position: absolute; left: 0; top: 0; transform-origin: 50% 50%; }
.cc-big svg { display: block; overflow: visible; }
.cc-lad { position: absolute; transform-origin: 50% 50%; }
.cc-lad svg { display: block; }
.cc-lad .cc-twin { position: absolute; left: 10px; top: -10px; opacity: 0.5; }
.cc-badge { position: absolute; left: 2px; top: calc(100% - 24px); font: 400 40px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; color: #FFFFFF; background: #000000; padding: 3px 7px 1px; border-radius: 8px; white-space: nowrap; }
.cc-bbadge { position: absolute; font: 400 92px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; color: ${C.white}; background: ${C.bar}; padding: 6px 14px 2px; border-radius: 16px; white-space: nowrap; box-shadow: 0 0 0 3px ${C.panelLine}; }
.cc-stream { position: absolute; }
.cc-lad-pip { position: absolute; width: 8px; border-radius: 4px; background: ${C.green}; box-shadow: 0 0 12px rgba(43, 255, 136, 0.8); }
.cc-pl { position: absolute; font: 400 40px/1 'Anton', 'Inter Full', sans-serif; white-space: nowrap; letter-spacing: 0.01em; transform-origin: 0 50%; }
.cc-gut { display: inline-block; white-space: pre; }
.cc-tag { position: absolute; font: 400 ${TAG_PX}px/1 'Anton', 'Inter Full', sans-serif; white-space: nowrap; letter-spacing: 0.01em; transform-origin: 50% 50%;
  text-shadow: 0 0 10px #000, 0 2px 4px #000; }
.cc-slot { position: absolute; box-sizing: border-box; height: 96px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
  padding: 0 24px; background: ${C.panel}; border-radius: 14px; --lit: 0; --tone: ${C.red};
  border: 3px solid color-mix(in srgb, var(--tone) calc(var(--lit) * 100%), ${C.panelLine});
  box-shadow: 0 0 calc(var(--lit) * 36px) color-mix(in srgb, var(--tone) calc(var(--lit) * 50%), transparent); }
.cc-slot-label { font: 700 40px/1.1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.grey}; white-space: nowrap; }
.cc-slot-label em { font-style: normal; color: ${C.white}; }
.cc-slot-value { font: 400 72px/1 'Anton', 'Inter Full', sans-serif; white-space: nowrap; color: ${C.white}; transform-origin: 50% 55%; text-align: right; }
`

// keyword → icon (the kit's 15 icons); first match wins
const GUESS = [
  [/\b(house|home|mortgage|condo|apartment)/i, 'house'],
  [/\b(car|cars|truck|vehicle|tesla|suv)\b/i, 'car'],
  [/\b(i?phone|smartphone)/i, 'phone'],
  [/\b(coffee|latte|cup|starbucks)/i, 'cup'],
  [/\b(burger|big mac|mcdonald)/i, 'burger'],
  [/\bpizza/i, 'pizza'],
  [/\bhot ?dog/i, 'hotdog'],
  [/\b(gas|fuel|gallon)/i, 'gas'],
  [/\b(ticket|movie|concert|flight)/i, 'ticket'],
  [/\b(grocer|shopping|bag)/i, 'bag'],
  [/\begg/i, 'egg'],
  [/\b(hour|shift)\b/i, 'hour'],
  [/\b(pay|salary|wage|paycheck|income|earn)/i, 'bill'],
  [/(million|billion|trillion|cash|\$)/i, 'coin'],
]
const guessIcon = text => { for (const [re, name] of GUESS) if (re.test(text || '')) return name; return 'coin' }

// prefix/suffix HTML for an Anton counter: ≈/→ patched to Inter Full, narrow word spaces
const fixHTML = str => ax(esc(str).replace(/ /g, '\u0001')).replace(/\u0001/g, '<span class="sp"> </span>')

/** present/absent boolean attribute, cached like core's attr() */
function flag(el, name, on) {
  const c = el.__fl || (el.__fl = {})
  if (c[name] === on) return
  c[name] = on
  if (on) el.setAttribute(name, ''); else el.removeAttribute(name)
}

let uid = 0

export default function costCounter(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const L = layoutFor(spec)
  const stage = ctx.stage
  const id = 'cc' + ++uid

  // ---------- the clock ----------
  const rate = +d.perSecond || 0
  const [T0, T1] = Array.isArray(d.counterT) && d.counterT.length === 2 ? d.counterT.map(Number) : [1.0, 25.0]
  const start = +d.startValue || 0
  const valueAt = t => start + rate * (clamp(t, T0, T1) - T0)
  const finalStr = d.final != null ? String(d.final) : null
  const finalTpl = parseDisplay(finalStr || '')
  const finalOk = finalStr && isFinite(finalTpl.value)
  const finalV = finalOk ? finalTpl.value * finalTpl.scale : valueAt(T1)
  // the running counter's format: the spec's prefix/dp (FORMATS §10); `final` pins the landing
  const stripAx = p => p.replace(/≈\s*/g, '')
  const run = {
    prefix: d.prefix != null ? String(d.prefix) : finalOk ? stripAx(finalTpl.prefix) : '$',
    dp: d.dp != null ? Math.max(0, Math.min(4, +d.dp)) : finalOk ? Math.min(4, finalTpl.dp) : 0,   // sub-cent rates keep their digits
    suffix: d.suffix != null ? String(d.suffix) : '',
  }
  // the board can land on `final` in place when final = [≈ ]prefix + grouped digits (same dp) + suffix
  const approx = finalOk && /≈/.test(finalTpl.prefix)
  const inPlace = finalOk && finalTpl.scale === 1 && finalTpl.dp === run.dp && stripAx(finalTpl.prefix) === run.prefix &&
    finalTpl.suffix.trim() === run.suffix.trim() && finalTpl.group
  const nInt = Math.max(1, String(Math.floor(Math.max(finalV, valueAt(T1), start) + 1e-9)).length)
  const perFrame = (Math.abs(rate) * Math.pow(10, run.dp)) / (spec.fps || 30)
  const crisp = perFrame >= 1   // a fast counter ticks digitally; a slow one rolls its last digit

  // ---------- milestones ----------
  const ms = (d.milestones || []).filter(m => m && isFinite(+m.value) && +m.value > 0).map((m, i) => {
    const raw = String(m.label || '')
    const k = raw.lastIndexOf(': ')
    const name = m.name != null ? String(m.name) : k > 0 ? raw.slice(0, k) : raw
    const amount = m.display != null ? String(m.display) : k > 0 ? raw.slice(k + 2) : ''
    const lab = (lo.labels && lo.labels[i]) || null
    const value = +m.value
    return {
      value, name, amount,
      icon: iconName(m.icon || (lo.icons && lo.icons[i]) || guessIcon(name + ' ' + raw)),
      l1: lab ? lab.l1 : amount, l2: lab ? lab.l2 : name,
      pip: lo.pipLabels && lo.pipLabels[i] != null ? String(lo.pipLabels[i]) : null,
      pipDone: lo.pipPassed && lo.pipPassed[i] != null ? String(lo.pipPassed[i]) : null,
      tp: rate > 0 ? T0 + (value - start) / rate : Infinity,   // when the counter passes it
    }
  }).sort((a, b) => a.value - b.value)
  // a repeated icon is told apart: a multiplier badge from the number its name leads with ("10 years of median pay"
  // → "×10"), else a stacked twin behind it on the ladder
  {
    const seen = new Map()
    ms.forEach(m => {
      const n = seen.get(m.icon) || 0
      seen.set(m.icon, n + 1)
      if (!n) return
      const num = lo.badges === false ? null : /(?:^|[^$\d.,])(\d[\d,]*(?:\.\d+)?)(?!\s*%)/.exec(m.name)
      if (num) m.badge = '×' + num[1]
      else m.twin = true
    })
  }
  // no milestones: the stage fills one coin toward the final value (no label beat)
  const silent = !ms.length
  if (silent) ms.push({ value: finalV, name: '', amount: '', icon: iconName(lo.icon || 'coin'), l1: '', l2: '', tp: T1 })
  const N = ms.length
  ms.forEach((m, i) => {
    m.passed0 = m.tp <= 0.001                                     // already passed at frame 1: lit, no animation
    m.reached = m.tp <= T1 + 1e-6
    const gap = i + 1 < N ? ms[i + 1].tp - m.tp : Infinity
    m.pop = m.passed0 ? 0 : Math.min(0.3, Math.max(0.06, gap * 0.4))
    m.fly = m.passed0 ? 0 : Math.min(0.42, Math.max(0.08, gap * 0.5))
    m.last = i === N - 1
    m.ta = m.passed0 ? -100 : m.tp                               // animation anchor of its pass
  })
  // when each big icon drops in (as the previous one starts to fly) and how long its fall takes
  ms.forEach((m, i) => {
    const prev = ms[i - 1]
    m.enter = i === 0 ? -Infinity : prev.tp + prev.pop
    m.fall = i === 0 ? 0 : Math.max(0.08, Math.min(M.fall, (m.tp - m.enter) * 0.6))
    m.arrive = m.passed0 ? -100 : m.last ? m.tp : m.tp + m.pop + m.fly   // lands in its ladder slot
  })

  // ---------- DOM: stage (big icons + ladder), flash ----------
  const box = h('div', { class: 'cc-stage', style: { top: L.stage.y + 'px', width: W + 'px', height: L.stage.h + 'px' } })
  stage.append(box)
  const SH = L.stage.h
  const pad = 20
  const pitch = Math.min(86, (SH - 2 * pad) / N)
  const lsz = Math.round(Math.min(64, pitch - 12))
  const ladX = 60 + lsz / 2
  const slotY = i => SH - pad - (i + 0.5) * pitch
  const showLadder = lo.pips !== false && N > 1

  // milestone ladder (left margin): one small icon per milestone, an optional price label beside it (readable text,
  // so it lives outside the decorative stage box)
  const plLeft = ladX + lsz / 2 + 26
  // a leading "≈ " hangs in a gutter as wide as "≈ ", so the rows' digits align (a column with no "≈" has none)
  const hang = showLadder && ms.some(m => AX_LEAD.test(m.pip || '') || AX_LEAD.test(m.pipDone || ''))
  let gutW = 0
  if (hang) {
    const probe = h('div', { class: 'cc-pl', 'data-deco': '', style: { left: '0px', top: '0px', visibility: 'hidden' } }, h('span', { class: 'cc-gut', html: ax(esc('≈ ')) }))
    stage.append(probe)
    gutW = probe.firstChild.offsetWidth
    probe.remove()
  }
  const plHTML = str => {
    if (!hang) return ax(esc(str))
    const lead = AX_LEAD.test(str)
    return `<span class="cc-gut" style="width: ${gutW}px">${lead ? ax('≈') : ''}</span>${ax(esc(str.replace(AX_LEAD, '')))}`
  }
  const ladder = ms.map((m, i) => {
    const twin = m.twin ? iconSVG(m.icon, lsz, { cls: 'cc-twin' }) : null
    const badge = m.badge ? h('div', { class: 'cc-badge', html: ax(esc(m.badge)) }) : null
    const el = h('div', { class: 'cc-lad', style: { left: ladX - lsz / 2 + 'px', top: slotY(i) - lsz / 2 + 'px', width: lsz + 'px', height: lsz + 'px' } }, twin, iconSVG(m.icon, lsz), badge)
    const pip = h('div', { class: 'cc-lad-pip', style: { left: ladX + lsz / 2 + 10 + 'px', top: slotY(i) - lsz * 0.3 + 'px', height: lsz * 0.6 + 'px' } })
    const pl = showLadder && m.pip ? h('div', { class: 'cc-pl', style: { left: plLeft + 'px', top: L.stage.y + slotY(i) - 20 + 'px', color: C.grey } }) : null
    // the target ahead (pipLabels) and, with pipPassed, the answer it turns into once passed: two spans, one shown
    const plA = pl ? h('span', { html: plHTML(m.pip) }) : null
    const plB = pl && m.pipDone ? h('span', { html: plHTML(m.pipDone) }) : null
    if (pl) pl.append(plA)
    if (plB) pl.append(plB)
    if (showLadder) box.append(el, pip)
    let plw = null
    if (pl) {
      stage.append(pl)
      if (plB) style(plB, { display: 'none' })
      plw = pl.offsetWidth
      if (plB) {
        style(plA, { display: 'none' }); style(plB, { display: 'inline' })
        plw = Math.max(plw, pl.offsetWidth)
        style(plB, { display: 'none' }); style(plA, { display: 'inline' })
      }
    }
    return { el, pip, pl, plA, plB, plw }
  })
  const colRight = Math.max(showLadder ? ladX + lsz / 2 + 18 : 0, ...ladder.map(l => (l.pl ? plLeft + l.plw : 0)))

  // answer slot (lookOpts.slot): a second readout in the stage's top-right corner, empty from frame 1, filled at slot.t
  const sl = lo.slot && (lo.slot.empty != null || lo.slot.fill != null) ? (() => {
    const o = lo.slot
    const el = h('div', { class: 'cc-slot', style: { top: L.stage.y + 14 + 'px', '--tone': toneColor(o.tone || 'bad') } })
    const lab = h('div', { class: 'cc-slot-label', html: richUI(o.label || '') })
    const val = h('div', { class: 'cc-slot-value' })
    const empty = h('span', { html: ax(esc(o.empty ?? '')) })
    const fill = h('span', { html: ax(esc(o.fill ?? '')) })
    val.append(empty, fill)
    el.append(lab, val)
    stage.append(el)
    style(empty, { display: 'none' })
    const wFill = val.offsetWidth
    style(empty, { display: 'inline' }); style(fill, { display: 'none' })
    const wEmpty = val.offsetWidth
    style(val, { minWidth: Math.max(wFill, wEmpty) + 'px' })
    const w = el.offsetWidth
    style(el, { left: 920 - w + 'px', width: w + 'px' })
    style(el, { '--tone': toneColor(o.tone || 'bad') })
    return { el, val, empty, fill, t: o.t != null ? +o.t : T1, color: toneColor(o.tone || 'bad'), bottom: 14 + 96 }
  })() : null

  // the big icon's region: right of the ladder column, below the slot; its art (bounding box) fits ART_W x ART_H
  const hasPL = ladder.some(l => l.pl)
  const regL = hasPL ? Math.max(140, colRight + 28) : 140, regR = hasPL ? 920 : 940
  const regT = sl ? sl.bottom + 10 : 0
  // a target tag under the big icon (its pip label: "$250K", "$1M") when the ladder is labelled; the art gives it room
  const tagged = hasPL && lo.tags !== false && !silent
  const tagRoom = tagged ? TAG_ROOM : 0
  const ART_W = Math.min(560, regR - regL - 16), ART_H = Math.min(400, SH - regT - (sl ? 44 : 80)) - tagRoom
  let bigCX = (regL + regR) / 2
  const bigCY = regT + (SH - regT) / 2 + 2 - tagRoom / 2

  const parts = name => ICONS[name]
  const draw = (g, name) => {
    for (const p of parts(name)) g.append(p.stroke
      ? s('path', { d: p.d, fill: 'none', stroke: p.stroke, 'stroke-width': p.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
      : s('path', { d: p.d, fill: p.fill }))
    return g
  }
  const bigs0 = ms.map((m, i) => {
    const shapeId = `${id}-shape-${i}`, fillId = `${id}-fill-${i}`
    const fillRect = s('rect', { x: -10, y: 0, width: 120, height: 120 })
    const shape = s('clipPath', { id: shapeId })
    for (const p of parts(m.icon)) if (!p.stroke) shape.append(s('path', { d: p.d }))   // filled parts only: an open stroke's implicit fill would leak
    const ghost = draw(s('g', { opacity: GHOST_ICON }), m.icon)
    const full = draw(s('g', { 'clip-path': `url(#${fillId})` }), m.icon)
    const level = s('rect', { x: -10, y: 0, width: 120, height: 2.4, fill: C.green, 'clip-path': `url(#${shapeId})` })
    const glowLine = s('rect', { x: -10, y: 0, width: 120, height: 7, fill: C.green, opacity: 0.22, 'clip-path': `url(#${shapeId})` })
    const svg = s('svg', { viewBox: '0 0 100 100', width: 100, height: 100 },
      s('defs', {}, shape, s('clipPath', { id: fillId }, fillRect)), ghost, full, glowLine, level)
    const el = h('div', { class: 'cc-big', 'data-deco': '' }, svg)
    const bigBadge = m.badge ? h('div', { class: 'cc-bbadge', html: ax(esc(m.badge)) }) : null
    if (bigBadge) el.append(bigBadge)
    box.append(el)
    let bb = { x: 5, y: 5, width: 90, height: 90 }
    try { const b = ghost.getBBox(); if (b.height > 1 && b.width > 1) bb = { x: b.x, y: b.y, width: b.width, height: b.height } } catch (e) { /* keep default */ }
    const k = Math.min(ART_W / bb.width, ART_H / bb.height)        // px per design unit
    return { m, i, el, svg, ghost, full, fillRect, level, glowLine, bigBadge, bb, k }
  })
  // room for the pop: at its biggest frame (the bump's peak, 1 + amp, plus the glow) the art keeps CLEAR px off the
  // ladder column. The art box shifts right of the region's centre for that (its resting right edge up to ART_R);
  // an icon that still doesn't clear shrinks. The climax icon's growth (climaxScale) is sized against the same bound.
  const peakOf = m => 1 + (m.last ? AMP_LAST : AMP_PASS)
  const leftBound = showLadder ? colRight + CLEAR + GLOW_PAD : 8
  if (showLadder) {
    const want = Math.max(...bigs0.map(b => leftBound + (peakOf(b.m) * b.bb.width * b.k) / 2))
    bigCX = Math.max(bigCX, Math.min(want, ART_R - Math.max(...bigs0.map(b => (b.bb.width * b.k) / 2))))
    for (const b of bigs0) b.k = Math.min(b.k, (2 * Math.min((bigCX - leftBound) / peakOf(b.m), ART_R - bigCX)) / b.bb.width)
  }
  const bigs = bigs0.map(({ m, i, el, svg, ghost, full, fillRect, level, glowLine, bigBadge, bb, k }) => {
    const size = 100 * k, acx = (bb.x + bb.width / 2) * k, acy = (bb.y + bb.height / 2) * k
    attr(svg, 'width', size.toFixed(1)); attr(svg, 'height', size.toFixed(1))
    style(el, { width: size + 'px', height: size + 'px', left: bigCX - acx + 'px', top: bigCY - acy + 'px', transformOrigin: `${acx}px ${acy}px` })
    // the badge sits on the art's bottom-right corner, kept left of the rail (x <= 930)
    if (bigBadge) {
      const bw = bigBadge.offsetWidth, bh = bigBadge.offsetHeight
      style(bigBadge, { left: Math.min((bb.x + bb.width) * k - bw * 0.6, 930 - (bigCX - acx) - bw) + 'px', top: Math.min((bb.y + bb.height) * k - bh * 0.55, SH - 10 - (bigCY - acy) - bh) + 'px' })
    }
    // where its art sits in the ladder slot (an iconSVG of lsz px), and the scale that matches it
    const to = { x: ladX + ((bb.x + bb.width / 2) / 100 - 0.5) * lsz, y: (i2 => slotY(i2))(i) + ((bb.y + bb.height / 2) / 100 - 0.5) * lsz, s: lsz / size }
    // the target tag: readable text, so it lives on the stage (outside the clipped decorative box), centred under the art
    let tag = null
    if (tagged && m.pip) {
      tag = h('div', { class: 'cc-tag', html: ax(esc(m.pip)), style: { color: C.white } })
      stage.append(tag)
      style(tag, { left: (bigCX - tag.offsetWidth / 2).toFixed(1) + 'px', top: (L.stage.y + bigCY + (bb.height * k) / 2 + 12).toFixed(1) + 'px', display: 'none' })
    }
    return { el, svg, ghost, full, fillRect, level, glowLine, top: bb.y, hgt: bb.height, size, to, artH: bb.height * k, artW: bb.width * k, kpx: k, elTop: bigCY - acy, badge: bigBadge, tag }
  })

  // the verdict's slot: the kit's boxed 196 px one over the stage foot (lookOpts.tallVerdict), else the chrome's default
  const vslot = lo.tallVerdict && spec.verdict && spec.verdict.text ? { y: L.limit - 196, h: 196, w: 800, boxed: true } : null
  // climaxScale: the last icon grows on its pass, from 1 to S, on ease.back with a small bump riding on it, toward
  // the widest earlier icon's art width (or the given factor). S is capped so its biggest frame (S × PF, PF the
  // curve's own peak) fits the stage room, top to foot (or to the verdict band), and keeps off the ladder column.
  const growAt = (t, ta, S) => {
    const p = prog(t, ta, GROW)
    return (1 + (S - 1) * ease.back(p, 1.4)) * bump(t, ta, { amp: AMP_GROW, dur: GROW })
  }
  const climax = (() => {
    if (!lo.climaxScale || silent || N < 2) return null
    const m = ms[N - 1], b = bigs[N - 1]
    if (!m.reached || m.passed0) return null
    const widest = Math.max(...bigs.slice(0, -1).map(x => x.artW))
    const want = lo.climaxScale === true ? widest / b.artW : +lo.climaxScale
    if (!(want > 1)) return null
    // the curve's peak relative to its rest (numerically, for the S in play: the overshoot scales with S - 1)
    const pf = S => { let mx = 1; for (let k = 0; k <= 120; k++) mx = Math.max(mx, growAt(k / 100, 0.0001, S) / S); return mx }
    const top = 14, bottom = (vslot ? vslot.y - 10 - L.stage.y : SH) - 14
    let S = want
    for (let it = 0; it < 4; it++) {
      const P = pf(S)
      S = Math.min(want, (bottom - top) / (P * b.artH), (bigCX - leftBound) / ((P * b.artW) / 2), (ART_R - bigCX) / (b.artW / 2))
    }
    S = Math.max(1, S)
    if (S < 1.02) return null
    const half = (pf(S) * S * b.artH) / 2
    // the art's centre once grown: where it was, moved just enough to keep its biggest frame inside the room
    const cy = top + half >= bottom - half ? (top + bottom) / 2 : clamp(bigCY, top + half, bottom - half)
    return { S, dy: cy - bigCY, ta: m.ta }
  })()

  // money stream: green LED dots pour into the icon that is filling (decoration; a pure function of t).
  // Dot k leaves the top of the stage at s_k and lands on the fill level of the icon that is filling when it arrives.
  const P_RATE = lo.stream === false ? 0 : +(lo.stream ?? 14), P_FALL = 0.55, P_SIZE = 15, P_START = T0 - 0.4
  const stream = h('canvas', { class: 'cc-stream', 'data-deco': '', width: W, height: SH, style: { left: '0px', top: '0px', width: W + 'px', height: SH + 'px' } })
  box.append(stream)
  const sg = stream.getContext('2d')
  const filling = tt => {   // index of the icon being filled at time tt, or -1 (between icons, or all passed)
    for (let i = 0; i < N; i++) {
      const m = ms[i]
      if (tt >= m.tp) continue
      return tt >= m.enter + m.fall + 0.05 ? i : -1
    }
    return -1
  }
  function drawStream(t) {
    sg.clearRect(0, 0, W, SH)
    if (!P_RATE || silent) return
    const k0 = Math.max(0, Math.ceil((t - P_FALL - P_START) * P_RATE)), k1 = Math.floor((t - P_START) * P_RATE)
    sg.fillStyle = C.green
    sg.shadowColor = 'rgba(43, 255, 136, 0.8)'
    sg.shadowBlur = 10
    for (let k = k0; k <= k1; k++) {
      const s0 = P_START + k / P_RATE, l0 = s0 + P_FALL
      if (l0 > T1) break
      const i = filling(l0)
      if (i < 0) continue
      const b = bigs[i], m = ms[i]
      const r = rng(9001 + k * 7919)
      const fill = clamp(valueAt(l0) / m.value)
      const yLand = b.elTop + (b.top + b.hgt * (1 - fill)) * b.kpx
      const x = bigCX + (r() - 0.5) * Math.min(220, b.artW * 0.34)
      const p = prog(t, s0, P_FALL)
      const y = lerp(regT - P_SIZE, yLand - P_SIZE * 0.6, p * p)
      const sz = P_SIZE * (0.8 + 0.4 * r())
      sg.globalAlpha = clamp(p / 0.12) * 0.95
      sg.fillRect(x - sz / 2, y - sz / 2, sz, sz)
    }
    sg.globalAlpha = 1
  }
  const flash = stageFlash(stage, L)

  // ---------- DOM: hero board ----------
  const heroBox = L.hero
  const hero = h('div', { class: 'cc-hero', style: { top: heroBox.y + 'px', height: heroBox.h + 'px', left: (W - heroBox.w) / 2 + 'px', width: heroBox.w + 'px' } })
  const glow = h('div', { class: 'cc-glow' })
  const color = lo.tone ? toneColor(lo.tone) : C.green
  const rgb = [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16)).join(', ')
  style(hero, { '--rgb': rgb })
  const HS = L.hero.size, HI = L.hero.icon
  const odo = h('div', { class: 'sb-odo cc-odo', style: { fontSize: HS + 'px', color } })
  glow.append(odo)
  hero.append(glow)
  const heroIcon = typeof lo.heroIcon === 'string' ? iconSVG(lo.heroIcon, HI, { cls: 'sb-hero-icon' }) : null
  // ≈ (ghost while running, lit on landing), the run prefix, digit slots with group commas, decimals, suffix
  const axEl = approx && inPlace ? h('span', { class: 'cc-ax', html: fixHTML('≈ ') }) : null
  if (axEl) odo.append(axEl)
  const pre = h('span', { class: 'sb-odo-fix', html: fixHTML(run.prefix) })
  odo.append(pre)
  const cols = []   // { col, strip, k } k = place value index of the integer part (0 = ones), negative = decimals
  const seps = []   // { el, k } comma left of column k-1 (lit when column k is lit)
  for (let k = nInt - 1; k >= -run.dp; k--) {
    if (k === -1) odo.append(h('span', { class: 'sb-odo-sep' }, '.'))
    const strip = h('span', { class: 'sb-odo-strip' }, '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0')
    const col = h('span', { class: 'sb-odo-col', 'data-roll': '' }, strip)
    odo.append(col)
    cols.push({ col, strip, k })
    if (k > 0 && k % 3 === 0) { const sp = h('span', { class: 'sb-odo-sep' }, ','); odo.append(sp); seps.push({ el: sp, k }) }
  }
  const suf = run.suffix ? h('span', { class: 'sb-odo-fix', html: fixHTML(run.suffix) }) : null
  if (suf) odo.append(suf)
  // final display that doesn't fit the board (compact "$1.2M", another dp): a hard cut to static Anton text
  const finalEl = finalOk && !inPlace ? h('div', { class: 'cc-final', html: `<span>${fixHTML(finalStr)}</span>`, style: { color, display: 'none' } }) : null
  if (finalEl) glow.append(finalEl)
  if (heroIcon) hero.append(heroIcon)
  stage.append(hero)
  // fit: the whole board (all slots) inside 920 px, next to the icon if any
  const iconW = heroIcon ? HI + 14 : 0
  const w168 = odo.offsetWidth || 1
  // (HERO_K: about 8% under the full fit, so the board keeps air under the header and above the footer)
  const heroSize = Math.round(Math.min(HS, (HS * (920 - iconW)) / w168) * HERO_K)
  style(odo, { fontSize: heroSize + 'px' })
  if (finalEl) {
    style(finalEl, { fontSize: heroSize + 'px', display: 'flex', width: 'auto' })
    const fw = finalEl.scrollWidth
    if (fw > 920 - iconW) style(finalEl, { fontSize: Math.floor((heroSize * (920 - iconW)) / fw) + 'px' })
    style(finalEl, { display: 'none', width: '100%' })
  }
  if (heroIcon) {
    const ow = odo.offsetWidth
    style(glow, { paddingLeft: iconW + 'px', boxSizing: 'border-box' })
    style(heroIcon, { left: (heroBox.w / 2 - (ow + iconW) / 2).toFixed(1) + 'px', top: (heroBox.h - HI) / 2 + 'px' })
  }

  // ---------- label stack: the rate at rest, milestone flashes, rate steps ----------
  const rd = String(d.rateDisplay || '')
  const rtpl = parseDisplay(rd)
  let intro
  let introL1 = null
  if (lo.intro && (lo.intro.l1 != null || lo.intro.l2 != null)) intro = { l1: lo.intro.l1 || '', l2: lo.intro.l2 || '' }
  else if (d.label) {
    // the rate on line 1 (its words grey), what is being counted on line 2
    intro = { l1: rd, l2: d.label }
    if (isFinite(rtpl.value) && rtpl.suffix.trim()) {
      const cut = rd.length - rtpl.suffix.length
      introL1 = `${ax(esc(rd.slice(0, cut).trim()))}<span class="op"> ${ax(esc(rd.slice(cut).trim()))}</span>`
    }
  } else if (isFinite(rtpl.value) && rtpl.suffix.trim()) {
    const cut = rd.length - rtpl.suffix.length
    intro = { l1: rd.slice(0, cut).trim(), l2: rd.slice(cut).trim() }
  } else intro = { l1: rd, l2: '' }
  const items = [{ l1: introL1 || ax(esc(intro.l1)), l2: rich(intro.l2) }]
  const beats = []
  if (!silent) ms.forEach((m, i) => {
    if (!m.reached || m.passed0) return
    items.push({ l1: ax(esc(m.l1)), l2: rich(m.l2) })
    beats.push({ t: m.tp, idx: items.length - 1, kind: 'milestone', hold: lo.flash ?? 3.0, i })
  })
  for (const st of lo.rateSteps || []) {
    if (st == null || st.t == null) continue
    items.push({ l1: ax(esc(st.l1 || '')), l2: rich(st.l2 || '') })
    beats.push({ t: +st.t, idx: items.length - 1, kind: 'step', hold: st.d ?? 4.0 })
  }
  beats.sort((a, b) => a.t - b.t)
  beats.forEach((b, k) => { b.end = Math.min(b.t + b.hold, k + 1 < beats.length ? beats[k + 1].t : Infinity) })
  const labels = labelStack(stage, L, items)

  const vd = spec.verdict && spec.verdict.text ? { t0: Math.max(0, +spec.verdict.t || 0) } : null
  if (T0 >= 0 && T0 < 0.05) console.warn(`cost-counter: counterT[0] = ${T0}: frame 1 shows the start value standing still (start it at -0.4 s to open already running)`)

  // ---------- sound ----------
  const own = (spec.sfx || [])
  const cue = (t, kind, opts = {}) => {
    if (!(t >= 0)) return
    if (own.some(c => c.kind === kind && Math.abs(c.t - t) < 0.3)) return   // the spec already asks for it
    ctx.cue(t, kind, opts)
  }
  const passes = silent ? [] : ms.filter(m => m.reached && !m.passed0)
  const landT = T1
  const nearPass = t => passes.some(m => Math.abs(m.tp - t) < 0.6)
  if (T0 > 0.05) cue(T0, 'whoosh', { dur: 0.3, gain: 0.5 })
  // the clock's heartbeat: one soft tick per real second of counting (skipped next to a louder beat)
  if (lo.ticks !== false) for (let k = 1; T0 + k < T1 - 0.3; k++) {
    const tk = T0 + k
    if (tk > 0.1 && !passes.some(m => Math.abs(m.tp - tk) < 0.25) && !beats.some(b => Math.abs(b.t - tk) < 0.2)) cue(tk, 'tick', { gain: 0.22 })
  }
  for (const m of passes) {
    if (m.last) {
      const prevT = Math.max(T0, ...ms.filter(x => x !== m).map(x => x.tp).filter(x => x < m.tp), ...beats.filter(b => b.t < m.tp).map(b => b.t))
      const rd2 = Math.min(2.4, m.tp - prevT - 0.4)
      if (rd2 >= 0.8) cue(m.tp - rd2, 'riser', { dur: rd2, gain: 0.5 })
      cue(m.tp, 'hit', { gain: 0.9 })
      cue(m.tp + 0.06, 'cash', { gain: 0.65 })
    } else {
      cue(m.tp, 'thud', { gain: 0.5 })
      cue(m.tp + 0.02, 'ding', { gain: 0.5 })
    }
  }
  for (const b of beats) if (b.kind === 'step') cue(b.t, 'thud', { gain: 0.6 })
  const bigLand = !nearPass(landT) && landT > 0.05
  if (bigLand) cue(landT, 'cash', { gain: 0.6 })
  const loud = [...passes.filter(m => m.last).map(m => m.tp), ...(bigLand ? [landT] : [])]
  if (vd && !loud.some(x => Math.abs(x - vd.t0) < 0.6)) cue(vd.t0, 'reveal', { gain: 0.7 })
  if (sl && sl.t > 0.05) cue(sl.t + 0.18, (lo.slot.tone || 'bad') === 'bad' ? 'buzz' : 'ding', { gain: 0.5 })

  const lastBeat = Math.max(T1, ...passes.map(m => m.tp), ...beats.filter(b => b.kind === 'step').map(b => b.t + 1.5))
  const duration = durationOf(spec, lastBeat, d.hold ?? M.hold)

  // ---------- seek ----------
  function setBoard(v, landed) {
    const x = Math.max(0, v)
    let V = x * Math.pow(10, run.dp)
    if (crisp && !landed) V = Math.floor(V + 1e-6)
    else if (landed) V = Math.round(V)
    const n = Math.max(1, String(Math.floor(x + 1e-9)).length)
    for (const c of cols) {
      const j = c.k + run.dp
      let pos
      if (j === 0) { const f = V - Math.floor(V); pos = (Math.floor(V) % 10) + ease.inOut(f) }
      else {
        const unit = Math.pow(10, j)
        const q = Math.floor(V / unit + 1e-9) % 10
        const lower = V - Math.floor(V / unit + 1e-9) * unit
        pos = q + (lower > unit - 1 ? ease.inOut(lower - (unit - 1)) : 0)
      }
      // only the digits the count has reached are on the board: the "$" hugs the leading digit
      const on = c.k < 0 || c.k < n
      style(c.col, { display: on ? 'inline-block' : 'none' })
      if (on) style(c.strip, { transform: `translateY(${-Math.round(pos * 1000) / 1000}em)` })
    }
    for (const sp of seps) style(sp.el, { display: sp.k < n ? 'inline-block' : 'none' })
    if (heroIcon) {
      // the group (icon + number) stays centred as the number grows a digit
      const ow = odo.offsetWidth
      style(heroIcon, { left: (heroBox.w / 2 - (ow + iconW) / 2).toFixed(1) + 'px' })
    }
  }

  return {
    duration,
    layout: L,
    ...(vslot ? { verdictSlot: vslot } : {}),
    verdictCue: null,                                   // cued above (skipped next to a louder beat)
    seek(t) {
      const v = valueAt(t)
      const landed = finalOk && t >= T1

      // hero board
      if (finalEl) {
        style(odo, { visibility: landed ? 'hidden' : 'visible' })
        style(finalEl, { display: landed ? 'flex' : 'none' })
      }
      if (landed && inPlace) setBoard(finalV, true)
      else setBoard(v, false)
      if (axEl) {
        attr(axEl, 'class', 'cc-ax' + (landed ? '' : ' off'))
        flag(axEl, 'data-deco', !landed)
      }

      // hero bump + glow: a small kick on every pass, a big one on the last milestone and on the landing
      let sc = 1, gl = 0
      for (const m of passes) {
        sc *= bump(t, m.tp, { amp: m.last ? 0.11 : 0.06, dur: m.last ? 0.5 : M.bump })
        if (t >= m.tp) gl = Math.max(gl, (m.last ? 1 : 0.6) * (1 - ease.out(prog(t, m.tp, m.last ? 1.1 : 0.6))))
      }
      if (bigLand) {
        sc *= bump(t, landT, { amp: 0.1, dur: 0.5 })
        if (t >= landT) gl = Math.max(gl, 1 - ease.out(prog(t, landT, 1.1)))
      }
      style(hero, { transform: `scale(${sc.toFixed(4)})` })
      style(glow, { '--glow': (16 + 30 * gl).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * gl).toFixed(3) })

      // stage: big icons
      const flying = []
      ms.forEach((m, i) => {
        const b = bigs[i]
        // the target tag: stands under the art once it has landed (never mid-drop), white while it fills, green on the
        // pass (with the icon's bump), and gone when the icon flies to the ladder (the last one stays, lit)
        if (b.tag) {
          const tl = isFinite(m.enter) && m.enter > 0.001 ? m.enter + m.fall : -Infinity
          const flyAt = m.last || !m.reached ? Infinity : m.tp + m.pop
          if (t < tl || t >= flyAt) style(b.tag, { display: 'none' })
          else if (m.last && climax && t >= m.tp) {
            // climaxScale: the tag yields as the icon grows over its place (the hero has just landed on the number)
            const o = 1 - prog(t, m.tp, 0.1)
            style(b.tag, { display: o > 0 ? 'block' : 'none', color: C.green, opacity: o.toFixed(3), transform: 'none' })
          } else {
            const k2 = isFinite(tl) ? slam(t, tl, { from: 1.3 }) : { o: 1, s: 1 }
            const passed = m.reached && t >= m.tp
            const kb = passed ? bump(t, m.tp, { amp: m.last ? AMP_LAST : AMP_PASS, dur: m.last ? 0.55 : 0.4 }) : 1
            // it rides the art's bottom edge down as the icon bumps (the same bump), so the pop never covers it
            const dy = (kb - 1) * (b.artH / 2 + 12)
            style(b.tag, { display: 'block', color: passed ? C.green : C.white, opacity: String(k2.o), transform: `translateY(${dy.toFixed(1)}px) scale(${(k2.s * kb).toFixed(4)})` })
          }
        }
        const enterAt = m.enter
        let vis = t >= enterAt || i === 0
        if (!m.last && t >= m.arrive) vis = false
        if (!m.reached && i > 0 && t < enterAt) vis = false
        if (!vis) { style(b.el, { display: 'none' }); return }
        const fill = clamp(v / m.value)
        // fill: the real icon revealed from the bottom of its art; the level line rides inside the silhouette
        const ly = b.top + b.hgt * (1 - fill)
        attr(b.fillRect, 'y', ly.toFixed(2))
        const showLine = fill > 0.002 && fill < 0.998
        attr(b.level, 'y', (ly - 1.2).toFixed(2)); attr(b.level, 'opacity', showLine ? '1' : '0')
        attr(b.glowLine, 'y', (ly - 3.5).toFixed(2)); attr(b.glowLine, 'opacity', showLine ? '0.22' : '0')
        let tx = 0, ty = 0, sx = 1, sy = 1, f = ''
        // the badge pops on once the icon stands in place (never clipped mid-drop)
        if (b.badge) {
          const tl = enterAt > 0.001 && isFinite(enterAt) ? enterAt + m.fall : -1
          const k2 = slam(t, tl, { from: 1.3 })
          style(b.badge, { display: t >= tl ? 'block' : 'none', opacity: String(k2.o), transform: `scale(${k2.s.toFixed(4)})` })
        }
        if (t < m.ta || !m.reached) {
          // dropping in (the previous milestone just passed), then squash on landing
          if (enterAt > 0.001 && isFinite(enterAt)) {
            const tl = enterAt + m.fall
            if (t < tl) { ty = -(bigCY + b.artH * 0.6) * (1 - ease.in(prog(t, enterAt, m.fall))); sx = 0.95; sy = 1.06 }
            else if (t < tl + M.squash) { const w = wobble(prog(t, tl, M.squash)); sy = 1 - 0.12 * w; sx = 1 + 0.08 * w }
          }
        } else {
          // passed: pop (bump + glow), then fly into the ladder slot (the last one stays, lit)
          // (climaxScale: the last one grows to S instead, moving into the room it needs as it goes)
          const k = m.last && climax ? growAt(t, m.ta, climax.S) : bump(t, m.ta, { amp: m.last ? AMP_LAST : AMP_PASS, dur: m.last ? 0.55 : 0.4 })
          sx = sy = k
          if (m.last && climax) ty = climax.dy * ease.out(prog(t, m.ta, GROW))
          const ga = (m.last ? 1 : 0.8) * (1 - ease.out(prog(t, m.ta, m.last ? 1.2 : 0.6)))
          const rest = m.last ? 0.35 : 0
          f = `drop-shadow(0 0 ${(10 + 26 * ga).toFixed(1)}px rgba(43, 255, 136, ${(rest + 0.5 * ga).toFixed(3)}))`
          if (!m.last && showLadder && t >= m.tp + m.pop) {
            const p = ease.inOut(prog(t, m.tp + m.pop, m.fly))
            tx = (b.to.x - bigCX) * p; ty = (b.to.y - bigCY) * p
            sx = sy = lerp(1, b.to.s, p)
          } else if (!m.last && !showLadder && t >= m.tp + m.pop) {
            const p = ease.in(prog(t, m.tp + m.pop, m.fly))
            sx = sy = lerp(1, 0.4, p)
            style(b.el, { opacity: (1 - p).toFixed(3) })
          }
        }
        style(b.el, { display: 'block', transform: `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`, filter: f || 'none' })
        if (showLadder || m.last || t < m.tp + m.pop) style(b.el, { opacity: '1' })
        // a flying icon: its art rect (box coords) dims the ladder labels it crosses
        if (!m.last && m.reached && t >= m.tp + m.pop && t < m.arrive) {
          const hw = (b.artW * Math.abs(sx)) / 2, hh = (b.artH * Math.abs(sy)) / 2, cx = bigCX + tx, cy = bigCY + ty
          flying.push([cx - hw, cy - hh, cx + hw, cy + hh])
        }
      })
      // ladder labels under a flying icon duck (a light bill passing over grey text would be unreadable)
      ladder.forEach((l, i) => {
        if (!l.pl) return
        if (l.plw == null) l.plw = l.pl.offsetWidth
        const x0 = plLeft - 6, x1 = plLeft + l.plw + 6, y0 = slotY(i) - 26, y1 = slotY(i) + 26
        const hit = flying.some(r => r[0] < x1 && r[2] > x0 && r[1] < y1 && r[3] > y0)
        l.duck = hit
      })

      // ladder: passed = lit, next = glowing ghost + pip, later = unlit
      if (showLadder) {
        let active = N
        for (let i = 0; i < N; i++) if (t < ms[i].tp || !ms[i].reached) { active = i; break }
        ms.forEach((m, i) => {
          const { el, pip, pl } = ladder[i]
          const done = t >= m.arrive && m.reached
          const cur = i === active || (!done && i < active)   // the next one (and one still flying in)
          const k = done ? bump(t, m.arrive, { amp: 0.25, dur: 0.4 }) : 1
          style(el, {
            opacity: done ? '1' : cur ? '0.42' : '0.16',
            transform: `scale(${k.toFixed(4)})`,
            filter: done || !cur ? 'none' : 'drop-shadow(0 0 8px rgba(43, 255, 136, 0.55))',
          })
          style(pip, { display: i === active ? 'block' : 'none' })
          if (pl) style(pl, { color: done ? C.green : cur ? C.white : C.grey, opacity: ladder[i].duck ? '0.25' : '1', transform: `scale(${(1 + Math.max(0, k - 1) * 0.5).toFixed(4)})` })
          // pipPassed: the target turns into its answer as the icon lands (the slot's bump carries the swap)
          if (ladder[i].plB) {
            style(ladder[i].plA, { display: done ? 'none' : 'inline' })
            style(ladder[i].plB, { display: done ? 'inline' : 'none' })
          }
        })
      }

      // answer slot: empty until slot.t, then the fill slams in (tone colour) and the panel lights
      if (sl) {
        const on = t >= sl.t
        style(sl.empty, { display: on ? 'none' : 'inline' })
        style(sl.fill, { display: on ? 'inline' : 'none' })
        const k = on ? slam(t, sl.t, { from: 1.25 }) : { o: 1, s: 1 }
        style(sl.val, { color: on ? sl.color : C.white, opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
        style(sl.el, { '--lit': (on ? 0.55 + 0.45 * flashAt(t, sl.t, 1.0) : 0).toFixed(3) })
      }

      // floor bloom
      let fl = 0
      for (const m of passes) fl = Math.max(fl, (m.last ? 0.7 : 0.26) * flashAt(t, m.tp, m.last ? 0.9 : 0.5))
      if (bigLand) fl = Math.max(fl, 0.5 * flashAt(t, landT, 0.8))
      flash.set(fl)

      // label stack: the active beat, else the rate (slams back in when a beat ends)
      let idx = 0, t0 = 0
      for (const b of beats) {
        if (t >= b.t && t < b.end) { idx = b.idx; t0 = b.t }
        else if (t >= b.end) { idx = 0; t0 = b.end }
      }
      labels.seek(t, idx, t0)

      // money stream
      drawStream(t)

      // (the verdict and the label stack's yield are the chrome's)
    },
  }
}
