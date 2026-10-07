// Scoreboard: cost-counter — the real-time cost counter (rank 10), HD Guy's F-16 grammar ("X Cost in Real Time").
//
// One continuous stretch, 0 cuts on the stage. A dollar counter ticks at a fixed real rate; milestones pop as
// they pass.
//   Top bar   the hook, the hero counter and the footer (the rate's working, spec.footer). The hero is a debt-clock
//             board: every digit slot the final value will need is on the board from frame 1 as an unlit LED (a
//             ghost "0"), and slots light up green as the count reaches them. The counter is linear in real time
//             (crisp digital ticks when it moves more than one unit a frame; a mechanical roll on the last digit
//             when it is slower). A "≈" in `final` is an unlit ghost while the count runs and lights when the clock
//             stops on `final` exactly (bump, glow flare, cash).
//   Stage     the next milestone as a big unit icon, a ghost that fills from the bottom with the real thing as the
//             count climbs (fill = count ÷ milestone value, so it tops out exactly as the counter passes it; a neon
//             level line rides the fill inside the icon's silhouette). When it passes: the icon pops (bump, glow,
//             floor bloom), the label stack slams the milestone in, a thud + ding, and the icon flies into its slot
//             on the milestone ladder (the left margin: one small icon per milestone, lit when passed, the next one
//             glowing, the rest unlit), while the next milestone's ghost drops in (already part full: every dollar
//             so far counts toward it). The last milestone stays big and lit in the centre (riser, hit + cash).
//   Bottom    the label stack. Its resting state is the rate ("≈ $30,800" / "EVERY SECOND", split from
//             data.rateDisplay); a milestone flashes in for `flash` s (or until the next beat), then the rate comes
//             back. lookOpts.rateSteps add rate beats ("≈ $111 MILLION AN HOUR").
// A two-line spec.footer gets a two-line footer row: the hero row gives up 18 px and the stage starts at y 700.
// Frame 1: the header, the hero (the start value, or already running when counterT[0] < 0), the footer, the rate
//   in the label stack and the first milestone's empty ghost (the open loop), the ladder counting what's ahead.
//
// data (FORMATS.md §10): { label, perSecond, rateDisplay, counterT: [t0, t1], startValue = 0, prefix = '$', dp = 0,
//   milestones: [{ value, label, icon?, display?, name? }], final, hold }
//   A milestone label "Name: $amount" splits into the label stack's two lines (l2 = name, l1 = amount); without a
//   colon the whole label is line 2. milestone.icon picks its icon (else a keyword guess: house, car, pay → bill …).
// lookOpts (all optional; this list is the reference until the kit README gets a cost-counter section):
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
//                                            green passed); the big icon then sits right of that column
//   slot:      { label, empty, t, fill, tone }   an answer readout in the stage's top-right corner: `empty` ("$___")
//                                            from frame 1, `fill` slams in at t in the tone colour (buzz when bad)
//   stream:    14 | false                    dots a second in the money stream (false: off)
//   icon:      'coin'                        the stage icon when there are no milestones (it fills toward `final`)
// The verdict is drawn here (body.verdict = false), fitted while visible: lib verdict() fits its text while the box
// is still display:none, so a long verdict never shrinks there.
import { h, s, css as style, attr, prog, ease, clamp, lerp, rng, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, labelStack, stageFlash, flashAt, parseDisplay, bump, wobble, slam, slamFromFor, inkWidth, durationOf,
  ICONS, iconName, iconSVG, toneColor,
} from '../lib.js'

const GHOST_A = 0.085                       // an unlit LED slot: the counter's colour at this alpha (not text to read)
const GHOST_ICON = 0.2                      // opacity of an unfilled milestone icon

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
.cc-stream { position: absolute; }
.cc-lad-pip { position: absolute; width: 8px; border-radius: 4px; background: ${C.green}; box-shadow: 0 0 12px rgba(43, 255, 136, 0.8); }
.cc-pl { position: absolute; font: 400 40px/1 'Anton', 'Inter Full', sans-serif; white-space: nowrap; letter-spacing: 0.01em; transform-origin: 0 50%; }
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

/** layoutFor, plus room for a two-line footer: the hero row gives up 18 px, the footer takes two lines, the stage starts at 700 */
function layoutCC(spec) {
  const L = layoutFor(spec)
  if (!L.hero || String(spec.footer || '').split('\n').length < 2) return L
  const top = 700, sb = L.stage.y + L.stage.h
  L.hero = { ...L.hero, y: 442, h: 150 }
  L.footer = { ...L.footer, y: 594, h: 96 }
  L.topBar = { y0: 0, y1: top }
  L.stage = { x: 0, y: top, w: W, h: sb - top }
  L.inner = { x: 140, y: top + 20, w: 800, h: L.stage.h - 36 }
  return L
}

let uid = 0

export default function costCounter(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const L = layoutCC(spec)
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
    dp: d.dp != null ? Math.max(0, Math.min(2, +d.dp)) : finalOk ? Math.min(2, finalTpl.dp) : 0,
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
      tp: rate > 0 ? T0 + (value - start) / rate : Infinity,   // when the counter passes it
    }
  }).sort((a, b) => a.value - b.value)
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
  const ladder = ms.map((m, i) => {
    const el = h('div', { class: 'cc-lad', style: { left: ladX - lsz / 2 + 'px', top: slotY(i) - lsz / 2 + 'px', width: lsz + 'px', height: lsz + 'px' } }, iconSVG(m.icon, lsz))
    const pip = h('div', { class: 'cc-lad-pip', style: { left: ladX + lsz / 2 + 10 + 'px', top: slotY(i) - lsz * 0.3 + 'px', height: lsz * 0.6 + 'px' } })
    const pl = showLadder && m.pip ? h('div', { class: 'cc-pl', html: ax(esc(m.pip)), style: { left: plLeft + 'px', top: L.stage.y + slotY(i) - 20 + 'px', color: C.grey } }) : null
    if (showLadder) box.append(el, pip)
    if (pl) stage.append(pl)
    return { el, pip, pl }
  })
  const colRight = Math.max(showLadder ? ladX + lsz / 2 + 18 : 0, ...ladder.map(l => (l.pl ? plLeft + l.pl.offsetWidth : 0)))

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
  const ART_W = Math.min(560, regR - regL - 16), ART_H = Math.min(400, SH - regT - (sl ? 44 : 80))
  const bigCX = (regL + regR) / 2, bigCY = regT + (SH - regT) / 2 + 2

  const parts = name => ICONS[name]
  const draw = (g, name) => {
    for (const p of parts(name)) g.append(p.stroke
      ? s('path', { d: p.d, fill: 'none', stroke: p.stroke, 'stroke-width': p.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
      : s('path', { d: p.d, fill: p.fill }))
    return g
  }
  const bigs = ms.map((m, i) => {
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
    box.append(el)
    let bb = { x: 5, y: 5, width: 90, height: 90 }
    try { const b = ghost.getBBox(); if (b.height > 1 && b.width > 1) bb = { x: b.x, y: b.y, width: b.width, height: b.height } } catch (e) { /* keep default */ }
    const k = Math.min(ART_W / bb.width, ART_H / bb.height)        // px per design unit
    const size = 100 * k, acx = (bb.x + bb.width / 2) * k, acy = (bb.y + bb.height / 2) * k
    attr(svg, 'width', size.toFixed(1)); attr(svg, 'height', size.toFixed(1))
    style(el, { width: size + 'px', height: size + 'px', left: bigCX - acx + 'px', top: bigCY - acy + 'px', transformOrigin: `${acx}px ${acy}px` })
    // where its art sits in the ladder slot (an iconSVG of lsz px), and the scale that matches it
    const to = { x: ladX + ((bb.x + bb.width / 2) / 100 - 0.5) * lsz, y: (i2 => slotY(i2))(i) + ((bb.y + bb.height / 2) / 100 - 0.5) * lsz, s: lsz / size }
    return { el, svg, ghost, full, fillRect, level, glowLine, top: bb.y, hgt: bb.height, size, to, artH: bb.height * k, artW: bb.width * k, kpx: k, elTop: bigCY - acy }
  })

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
  const odo = h('div', { class: 'sb-odo cc-odo', style: { fontSize: SIZE.hero + 'px', color } })
  glow.append(odo)
  hero.append(glow)
  const heroIcon = typeof lo.heroIcon === 'string' ? iconSVG(lo.heroIcon, SIZE.heroIcon, { cls: 'sb-hero-icon' }) : null
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
  const iconW = heroIcon ? SIZE.heroIcon + 14 : 0
  const w168 = odo.offsetWidth || 1
  const heroSize = Math.round(Math.min(SIZE.hero, (SIZE.hero * (920 - iconW)) / w168))
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
    style(heroIcon, { left: (heroBox.w / 2 - (ow + iconW) / 2).toFixed(1) + 'px', top: (heroBox.h - SIZE.heroIcon) / 2 + 'px' })
  }

  // ---------- label stack: the rate at rest, milestone flashes, rate steps ----------
  const rd = String(d.rateDisplay || '')
  const rtpl = parseDisplay(rd)
  let intro
  if (lo.intro && (lo.intro.l1 != null || lo.intro.l2 != null)) intro = { l1: lo.intro.l1 || '', l2: lo.intro.l2 || '' }
  else if (isFinite(rtpl.value) && rtpl.suffix.trim()) {
    const cut = rd.length - rtpl.suffix.length
    intro = { l1: rd.slice(0, cut).trim(), l2: rd.slice(cut).trim() }
  } else intro = { l1: rd, l2: d.label || '' }
  const items = [{ l1: ax(esc(intro.l1)), l2: rich(intro.l2) }]
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

  // ---------- verdict: drawn here, not by the chrome, so it is fitted while visible (see the header note) ----------
  const vd = spec.verdict && spec.verdict.text ? (() => {
    const v = spec.verdict
    const vbox = h('div', { class: 'sb-verdict' + (L.verdict.boxed ? ' boxed' : ''), style: { top: L.verdict.y + 'px', left: (W - L.verdict.w) / 2 + 'px', width: L.verdict.w + 'px', height: L.verdict.h + 'px', display: 'flex' } })
    const rule = h('div', { class: 'sb-verdict-rule', 'data-deco': '' })
    const txt = h('div', { class: 'sb-verdict-text', html: rich(v.text) })
    vbox.append(rule, txt)
    stage.append(vbox)
    fitText(txt, L.verdict.w, { maxH: L.verdict.h - 30, minPx: SIZE.verdictMin })
    const from = slamFromFor(inkWidth(txt), L.verdict.w - 8, 1.12)
    style(vbox, { display: 'none' })
    return { t0: Math.max(0, +v.t || 0), vbox, rule, txt, from }
  })() : null

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
  if (vd && !loud.some(x => Math.abs(x - vd.t0) < 0.6)) cue(vd.t0 + 0.06, 'reveal', { gain: 0.7 })
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
      const on = c.k < 0 || c.k < n
      attr(c.col, 'class', 'sb-odo-col' + (on ? '' : ' off'))
      flag(c.col, 'data-deco', !on)
      style(c.strip, { transform: `translateY(${-Math.round((on ? pos : 0) * 1000) / 1000}em)` })
    }
    for (const sp of seps) attr(sp.el, 'class', 'sb-odo-sep' + (sp.k < n ? '' : ' off'))
  }

  return {
    duration,
    layout: L,
    verdict: false,
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
      ms.forEach((m, i) => {
        const b = bigs[i]
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
        if (t < m.ta || !m.reached) {
          // dropping in (the previous milestone just passed), then squash on landing
          if (enterAt > 0.001 && isFinite(enterAt)) {
            const tl = enterAt + m.fall
            if (t < tl) { ty = -(bigCY + b.artH * 0.6) * (1 - ease.in(prog(t, enterAt, m.fall))); sx = 0.95; sy = 1.06 }
            else if (t < tl + M.squash) { const w = wobble(prog(t, tl, M.squash)); sy = 1 - 0.12 * w; sx = 1 + 0.08 * w }
          }
        } else {
          // passed: pop (bump + glow), then fly into the ladder slot (the last one stays, lit)
          const k = bump(t, m.ta, { amp: m.last ? 0.16 : 0.12, dur: m.last ? 0.55 : 0.4 })
          sx = sy = k
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
          if (pl) style(pl, { color: done ? C.green : cur ? C.white : C.grey, transform: `scale(${(1 + Math.max(0, k - 1) * 0.5).toFixed(4)})` })
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

      // verdict: slams into the label stack's slot; the label stack fades and drops out of its way
      if (vd) {
        if (t < vd.t0) style(vd.vbox, { display: 'none' })
        else {
          const k = slam(t, vd.t0 + 0.06, { from: vd.from })
          style(vd.vbox, { display: 'flex' })
          style(vd.txt, { opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
          style(vd.rule, { transform: `scaleX(${ease.out(prog(t, vd.t0 + 0.1, 0.35)).toFixed(4)})` })
        }
        const y = prog(t, vd.t0 - 0.04, 0.14)
        style(labels.el, { opacity: String(1 - y), transform: `translateY(${(14 * y).toFixed(1)}px)`, visibility: y >= 1 ? 'hidden' : 'visible' })
      }
    },
  }
}
