// becker-rig · cost-counter (FORMATS.md §10): a dollar counter ticks at a fixed real rate over one continuous
// stretch; milestones flash as it passes them.
//
// The overheating counter (Alan Becker's "Clicks Per Second", research/v2/watch/alan-becker.md §4 and §6 idea 9).
//   panel     an ink readout panel hangs under the footer like a scoreboard: the label on top (with a live dot that
//             blinks once a real second), the counter in big mono digits, and a strip that shows the rate. The
//             counter runs linearly over data.counterT and locks on the spec's `final` display string.
//   NEXT      a ticker under the panel previews the milestone the counter is chasing ("NEXT  A median new house:
//             $393,700"; just the amount when the label will not fit one line), and that object's dashed ghost
//             waits on the floor, so frame 1 already has a target. The ticker ducks out while an object drops past it.
//   a pass    the panel kicks, its rim flashes, the strip rolls to "✓ <label>" (green check, amount in green) and the
//             milestone's object (house, car, coin, a wad of bills...) drops out from under the panel onto its ghost:
//             squash, dust lines, shake. Objects heap up right to left, each bigger than the last, creeping toward
//             the figure, who escalates: flinch + point, shocked jump, duck + step back.
//   heat      every pass heats the panel one notch: digits green -> orange -> yellow -> white, a glowing rim, then
//             vibration and steam. The lock is the white-hot peak: white impact frame, shake, side hit lines, camera
//             punch, and the last landing (or the lock itself) knocks him onto his butt, staring up at the counter.
//             The verdict lands in the caption band (chrome).
//   layout    the readout is sized to the widest string it will show and to the room left under the hook, footer
//             and labels; on a crowded top the figure shrinks (to 0.9) before the counter does.
//
// Numbers: the counter interpolates start + perSecond × elapsed with data.prefix / data.dp (a running counter) and
// shows `final` exactly from counterT[1] on. Milestone values are never printed; only their labels are.
//
// lookOpts (all optional; it renders fully without them):
//   figure: false            no figure (the heap sits centred under the panel)
//   figureScale: 1.1         size of the figure (default: 1.1, or less when the top of the frame is crowded)
//   finale: 'sit'            his pose once the counter locks: 'sit' (knocked down) | 'slump' | 'shrug' | 'celebrate' | 'shocked'
//   icons: ['car', ...]      object per milestone, by index (else guessed from the label: house, car, phone, pay -> a wad
//                            of bills, hour -> clock, anything else -> a coin); any lib icon name works
//   objects: false           no dropping objects (the strip still flashes)
//   ghosts: false            no dashed ghost of the next object
//   preview: false           no NEXT ticker
//   heat: [{ t, state }]     explicit heat keys instead of "one notch per milestone"; state: cool | warm | orange |
//                            hot | white | burst (or a number 0-1)
import {
  h, s, style, attr, setText, setHTML, markup, plain, prog, clamp, lerp, rng, fmtNum,
  C, F, L, S, E, poseTrack, fk, secondary, Figure, makeWorld, makeFx, camera, track,
  chromeParts, durationOf, numLike, measure, squashAt, fall, hop, wobble, icon,
} from '../lib.js'

// ---------------------------------------------------------------- layout constants
const PX = 60, PW = 880                 // the panel: x 60-940 (clear of the right rail below y 820)
const PCX = PX + PW / 2
const PAD = 22                          // panel padding (top/bottom)
const IN = 34                           // panel inner left/right margin
const LIGHT = '#AEB6C1'                 // secondary text on the ink panel (8.9:1)
const STRIP_LH = 52                     // strip line box (rate line / milestone flash)
const FLASH = 2.4                       // how long a passed milestone holds the strip
const OBJ_XR = 1050                     // objects pile leftwards from here (the right margin is decoration)
const OVERLAP = 0.84                    // each object advances the pile by this much of its width (a heap, not a row)
const FLOOR = L.floorY
const REST = FLOOR - S.thin / 2         // where an object's bottom rests

// heat ramp (on ink): green -> orange -> coin yellow -> pale -> white
const HEAT = [[0, '#12B76A'], [0.2, '#12B76A'], [0.48, '#FF8A1F'], [0.74, '#FFD34D'], [0.9, '#FFF3C9'], [1, '#FFFFFF']]
const HEAT_STATE = { cool: 0, warm: 0.3, orange: 0.5, hot: 0.72, yellow: 0.74, white: 0.95, burst: 1 }

export const css = `
.cc-panel { position: absolute; left: 0; top: 0; background: ${C.ink}; border-radius: 26px; transform-origin: 50% 50%; }
.cc-dot { position: absolute; width: 18px; height: 18px; border-radius: 50%; }
.cc-lab { position: absolute; font: 800 42px/50px ${F.head}; letter-spacing: -0.01em; color: ${LIGHT}; }
.cc-lab em { color: ${C.hero}; }
.cc-lab u.mark2 { color: #FF8A8D; }
.cc-ro { position: absolute; left: 0; text-align: center; white-space: nowrap; font-family: ${F.mono}; font-weight: 800; letter-spacing: -0.02em; transform-origin: 50% 70%; }
.cc-strip { position: absolute; overflow: hidden; }
.cc-sl { position: absolute; left: 0; top: 0; width: 100%; display: flex; align-items: flex-start; gap: 14px; }
.cc-rate { font: 700 40px/${STRIP_LH}px ${F.mono}; letter-spacing: -0.02em; color: ${LIGHT}; white-space: nowrap; }
.cc-rate b { color: #FFFFFF; font-weight: 800; }
.cc-ms { flex: 1; min-width: 0; font: 800 44px/${STRIP_LH}px ${F.head}; letter-spacing: -0.012em; color: #FFFFFF; }
.cc-ms .v { color: ${C.hero}; }
.cc-ms em { color: ${C.hero}; }
.cc-chk { flex: none; width: 46px; height: 46px; margin-top: 3px; transform-origin: 50% 50%; }
.cc-next { position: absolute; left: 62px; display: flex; align-items: flex-start; gap: 16px; }
.cc-pill { flex: none; font: 800 40px/44px ${F.head}; letter-spacing: .06em; color: ${C.grey}; border: 4px solid ${C.line}; border-radius: 12px; padding: 0 12px; margin-top: 2px; }
.cc-nt { flex: 1; min-width: 0; font: 800 44px/52px ${F.head}; letter-spacing: -0.012em; color: ${C.grey}; }
`

// ---------------------------------------------------------------- helpers
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const smooth = p => p * p * (3 - 2 * p)
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mixRGB = (a, b, p) => a.map((v, i) => Math.round(v + (b[i] - v) * clamp(p)))
const rgb = (c, a = 1) => (a >= 1 ? `rgb(${c.join(',')})` : `rgba(${c.join(',')},${clamp(a).toFixed(3)})`)
const WHITE = [255, 255, 255]
function heatRGB(x) {
  for (let i = 1; i < HEAT.length; i++) {
    if (x <= HEAT[i][0]) return mixRGB(hex(HEAT[i - 1][1]), hex(HEAT[i][1]), (x - HEAT[i - 1][0]) / (HEAT[i][0] - HEAT[i - 1][0]))
  }
  return hex(HEAT[HEAT.length - 1][1])
}

// "Name: $393,700" -> ["Name", "$393,700"]; labels without a trailing number stay whole
function splitLabel(lab) {
  const m = /^([^]*\S)\s*:\s+((?:≈\s*)?\S*\d[^:]*)$/.exec(String(lab))
  return m ? [m[1], m[2]] : [String(lab), null]
}
// rate display: the first number run (with a leading ≈) is bold
function rateHTML(str) {
  const m = /^(.*?)((?:≈\s*)?[^\s\d]*\d[\d,.]*\S*)(.*)$/.exec(String(str || ''))
  return m ? `${esc(m[1])}<b>${esc(m[2])}</b>${esc(m[3])}` : esc(str || '')
}

// object per milestone: an icon name guessed from the label
function guessIcon(label) {
  const x = plain(label).toLowerCase()
  const table = [
    [/house|home|condo|mortgage|rent\b/, 'house'], [/\bcar\b|truck|tesla|vehicle|suv/, 'car'], [/phone/, 'phone'],
    [/hot ?dog/, 'hotdog'], [/burger|big mac/, 'burger'], [/pizza/, 'pizza'], [/coffee|latte|starbucks|\bcup\b/, 'cup'],
    [/\bgas\b|fuel|tank/, 'gas'], [/ticket|movie|concert/, 'ticket'], [/grocer|shopping|\bbag\b/, 'bag'], [/\begg/, 'egg'],
    [/\bhour\b/, 'hour'], [/pay|salary|wage|income|paycheck|earn/, 'wad'],
  ]
  for (const [re, name] of table) if (re.test(x)) return name
  return 'coin'
}
// [half width, bottom, top] of each icon in its 100 px box (centre 0,0), stroke included
const BOX = {
  coin: [43, 43, 43], bill: [49, 30, 30], wad: [53, 30, 72], cup: [39, 45, 45], hotdog: [51, 33, 15], burger: [47, 41, 43],
  pizza: [41, 47, 48], phone: [29, 49, 49], car: [49, 25, 29], house: [52, 43, 50], gas: [41, 45, 43], ticket: [49, 29, 29],
  bag: [39, 45, 45], egg: [39, 47, 47], hour: [43, 43, 43], token: [48, 48, 48],
}
// draw an object so that its bottom centre is the group's origin
function objectProp(parent, name) {
  const g = s('g')
  if (name === 'wad') {
    // a wad of bills: three bills stacked, slightly skewed
    icon(g, 'bill', { x: 2, y: -30 })
    icon(g, 'bill', { x: -4, y: -51 })
    icon(g, 'bill', { x: 3, y: -72 })
  } else {
    const ic = icon(g, BOX[name] ? name : 'token', { x: 0, y: -(BOX[name] || BOX.token)[1] })
    if (name === 'coin') ic.append(s('path', { d: 'M12,-13 C10,-21 -12,-22 -12,-11 C-12,-1 12,-2 12,9 C12,21 -11,20 -13,12 M0,-27 V27', fill: 'none', stroke: C.coinDeep, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
  }
  parent.append(g)
  return g
}

// poses used only here (the shared library has the rest)
const POSE = {
  watch: { lean: 2, tilt: -20, aF: [14, 20], aB: [-16, 16], lF: [11, -5], lB: [-11, -3] },
  leanIn: { lean: 10, tilt: -26, aF: [26, 44], aB: [-6, 34], lF: [14, -10], lB: [-12, -6] },
  down: { lean: 0, tilt: 16, aF: [20, 30], aB: [-14, 22], lF: [11, -5], lB: [-11, -3] },
  flinch: { lean: -16, tilt: -10, aF: [64, 104], aB: [44, 112], lF: [18, -16], lB: [-20, -14] },
  shield: { lean: -18, tilt: 8, aF: [118, 74], aB: [104, 84], lF: [26, -22], lB: [-26, -12] },
  leanBack: { lean: -10, tilt: -24, aF: [8, 24], aB: [-22, 18], lF: [16, -6], lB: [-14, -2] },
  cower: { lean: 18, tilt: 26, aF: [150, 110], aB: [140, 120], lF: [64, -118], lB: [40, -110] },
  sit: { lean: -14, tilt: 10, aF: [-36, 10], aB: [-50, 6], lF: [86, -4], lB: [76, -14] },       // knocked onto his butt
  sitLook: { lean: -18, tilt: -20, aF: [-40, 6], aB: [-54, 4], lF: [84, -10], lB: [74, -24] },
}

export default function costCounter(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const rate = Number(d.perSecond) || 0
  const [t0, t1] = Array.isArray(d.counterT) && d.counterT.length === 2 ? d.counterT.map(Number) : [0.5, 20.5]
  const dur = Math.max(0.01, t1 - t0)
  const start = Number(d.startValue ?? 0)
  const finalStr = d.final != null ? String(d.final) : null
  const like = finalStr ? numLike(finalStr) : { prefix: '$', dp: 0 }
  const prefix = d.prefix ?? String(like.prefix || '').replace(/^\s*≈\s*/, '')
  const dp = Math.max(0, Math.min(6, d.dp ?? like.dp ?? 0))
  const Q = Math.pow(10, dp)
  // running counter: start + perSecond × elapsed (rounded toward zero, so it never shows money not yet counted)
  const textAt = t => {
    if (t >= t1 && finalStr) return finalStr
    const v = start + rate * clamp(t - t0, 0, dur)
    const vq = rate >= 0 ? Math.floor(v * Q + 1e-6) / Q : Math.ceil(v * Q - 1e-6) / Q
    return fmtNum(vq, { prefix, dp })
  }

  // milestones the counter actually passes during its run, in order
  const ms = (d.milestones || [])
    .map((m, i) => ({ ...m, i, tm: rate ? t0 + (Number(m.value) - start) / rate : Infinity }))
    .filter(m => Number.isFinite(m.tm) && m.tm >= t0 - 1e-6 && m.tm <= t1 + 1e-6)
    .sort((a, b) => a.tm - b.tm)
  const M = ms.length
  ms.forEach((m, k) => { m.k = k; m.last = k === M - 1; m.lv = M > 1 ? k / (M - 1) : 1 })

  // ================================================================== layout + DOM
  const parts = chromeParts(spec, ctx)
  const world = makeWorld(ctx)
  const g = world.g
  const P0 = Math.round(parts.workTop + 2)

  const panel = h('div', { class: 'cc-panel', style: { width: PW + 'px' } })
  const dot = h('div', { class: 'cc-dot' })
  const lab = h('div', { class: 'cc-lab' })
  const ro = h('div', { class: 'cc-ro', style: { width: PW + 'px' } })
  const strip = h('div', { class: 'cc-strip', 'data-roll': '' })
  const slots = [h('div', { class: 'cc-sl' }), h('div', { class: 'cc-sl' })]
  strip.append(...slots)
  panel.append(dot, lab, ro, strip)
  world.html.append(panel)

  // a state's html at 44 px, or at 40 px when that saves a line (labels that are long either way wrap)
  const fitState = (el, mk) => {
    setHTML(el, mk(44)); const h44 = el.offsetHeight
    if (h44 <= STRIP_LH + 4) return { html: mk(44), h: h44 }
    setHTML(el, mk(40)); const h40 = el.offsetHeight
    return h40 < h44 ? { html: mk(40), h: h40 } : { html: mk(44), h: h44 }
  }

  // counter label: 42 px, or 40 px when that saves a line
  let labH = 0
  if (d.label) {
    setHTML(lab, markup(d.label))
    style(lab, { left: IN + 32 + 'px', top: PAD + 'px', width: PW - IN - 32 - IN + 'px' })
    const h42 = lab.offsetHeight
    style(lab, { fontSize: '40px' })
    if (lab.offsetHeight >= h42) style(lab, { fontSize: '42px' })
    labH = Math.round(lab.offsetHeight)
  } else style(lab, { display: 'none' })

  // strip states: the rate and one flash per milestone. Height = the tallest state.
  const stripW = PW - 2 * IN
  style(strip, { left: IN + 'px', width: stripW + 'px' })                 // width first: the labels wrap in it
  const rateState = d.rateDisplay ? `<div class="cc-rate">${rateHTML(d.rateDisplay)}</div>` : ''
  const chk = `<svg class="cc-chk" viewBox="0 0 46 46"><circle cx="23" cy="23" r="23" fill="${C.hero}"/><path d="M12 24 L20 32 L34 15" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  ms.forEach(m => {
    const [nm, v] = splitLabel(m.label || '')
    const r = fitState(slots[0], px => `${chk}<div class="cc-ms" style="font-size:${px}px">${markup(nm)}${v ? `: <span class="v">${markup(v)}</span>` : ''}</div>`)
    m.html = r.html
    m.sh = Math.round(r.h)
  })
  setHTML(slots[0], '')
  const stripH = Math.max(rateState ? STRIP_LH : 0, ...ms.map(m => m.sh))

  // NEXT ticker under the panel: the full label on one line if it fits (44 or 40 px), else just its amount
  const preview = lo.preview !== false && M > 0
  const next = h('div', { class: 'cc-next' }, h('span', { class: 'cc-pill' }, 'NEXT'), h('div', { class: 'cc-nt' }))
  const nt = next.lastChild
  let nextH = 0
  if (preview) {
    world.html.append(next)
    const pillW = next.firstChild.offsetWidth
    style(nt, { width: 920 - 62 - pillW - 16 + 'px' })
    for (const m of ms) {
      const [, v] = splitLabel(m.label || '')
      let r = fitState(nt, px => `<span style="font-size:${px}px">${markup(m.label || '')}</span>`)
      if (r.h > STRIP_LH + 4 && v) r = fitState(nt, px => `<span style="font-size:${px}px">${markup(v)}</span>`)
      m.nextHTML = r.html
      nextH = Math.max(nextH, Math.round(r.h))
    }
    setHTML(nt, '')
  }

  // readout size: the widest string it will show fits the panel, and the panel + NEXT leave the floor to the
  // figure. Mono glyph boxes are ~1.32 em tall, so the line box is too (nothing readable may overlap it).
  const RO_LH = 1.32
  const roStrs = [textAt(t0 - 1), textAt(t1 - 1e-4), finalStr].filter(Boolean)
  const wpp = Math.max(...roStrs.map(x => measure(x, `800 100px ${F.mono}`, { letterSpacing: '-0.02em' }))) / 100
  const fsW = Math.floor((PW - 2 * 42) / wpp)
  const showFig = lo.figure !== false
  const roTop = PAD + labH + (labH ? 2 : 0)
  const fixedH = roTop + (stripH ? stripH : 0) + PAD
  const tkGap = 14
  const fsFor = k => Math.floor((FLOOR - (showFig ? 262 * k + 16 : 230) - (preview ? nextH + tkGap : 0) - 6 - P0 - fixedH) / RO_LH)
  // a dense top (3-line hook, 2-line footer, long labels): the figure gives up a little height before the counter does
  let FIGK = lo.figureScale ?? 1.1
  if (lo.figureScale == null && showFig) while (FIGK > 0.9 && fsFor(FIGK) < Math.min(104, fsW)) FIGK -= 0.02
  const fs = Math.max(Math.min(60, fsW), Math.min(128, fsW, fsFor(FIGK)))
  const roH = Math.ceil(fs * RO_LH)
  style(ro, { top: roTop + 'px', fontSize: fs + 'px', lineHeight: roH + 'px', height: roH + 'px' })
  const stripTop = roTop + roH
  style(strip, { top: stripTop + 'px', height: stripH + 'px', display: stripH ? '' : 'none' })
  const PH = stripH ? stripTop + stripH + PAD : roTop + roH + PAD
  style(panel, { height: PH + 'px' })
  style(dot, { left: IN + 'px', top: PAD + 16 + 'px', display: d.label ? '' : 'none' })
  const P1 = P0 + PH
  const PCY = P0 + PH / 2
  const NY = P1 + tkGap
  if (preview) style(next, { top: NY + 'px' })
  const objMaxH = FLOOR - (preview ? NY + nextH : P1) - 24      // the tallest object still clears the ticker

  // ================================================================== strip + NEXT timelines
  // strip: rate -> milestone k (FLASH s, or until the next pass) -> rate ...
  const segs = [{ t: -1e9, html: rateState }]
  ms.forEach((m, k) => {
    segs.push({ t: m.tm, html: m.html, m })
    const nextT = k < M - 1 ? ms[k + 1].tm : Infinity
    const back = m.tm + FLASH
    if (rateState && back < nextT - 0.5) segs.push({ t: back, html: rateState })
  })
  // ================================================================== objects
  const showObj = lo.objects !== false && M > 0
  const FX = 172
  const lnv = ms.map(m => Math.log(Math.max(1, Math.abs(Number(m.value)))))
  ms.forEach((m, k) => {
    m.icon = (Array.isArray(lo.icons) && lo.icons[m.i]) || m.icon || guessIcon(m.label || '')
    if (!BOX[m.icon]) m.icon = 'token'
    const fr = M > 1 ? clamp((lnv[k] - lnv[0]) / ((lnv[M - 1] - lnv[0]) || 1)) : 1
    m.size = Math.min(lerp(175, 300, M > 1 ? 0.3 * (k / (M - 1)) + 0.7 * fr : 1), (objMaxH * 100) / (BOX[m.icon][1] + BOX[m.icon][2]))
  })
  // pack right to left; shrink everything if the pile would reach the figure
  const xL = showFig ? FX + 120 : 90
  const wOf = m => (2 * BOX[m.icon][0] * m.size) / 100
  // the pile: the first object at the right, each next one advances it by OVERLAP of its width
  const span = kk => ms.reduce((a, m, k) => a + wOf(m) * kk * (k === M - 1 ? 1 : OVERLAP), 0)
  const kS = M && span(1) > OBJ_XR - xL ? Math.max(0.4, (OBJ_XR - xL) / span(1)) : 1
  // with the figure the pile hugs the right and creeps toward him; without him it sits centred under the panel
  let cur = showFig ? OBJ_XR : Math.min(OBJ_XR, PCX + span(kS) / 2)
  ms.forEach(m => {
    m.size *= kS
    m.w = wOf(m)
    m.hgt = ((BOX[m.icon][1] + BOX[m.icon][2]) * m.size) / 100
    m.cx = cur - m.w / 2
    cur -= m.w * OVERLAP
    m.sx0 = clamp(m.cx, PX + m.w / 2 + 6, PX + PW - m.w / 2 - 6)  // drops out from under the panel, drifts to its spot
    const spawn = Math.max(P1 - 6, P0 + 10 + m.hgt)               // starts hidden behind the panel
    m.H = REST - spawn
    m.tl0 = fall(m.tm, m.tm, m.H, { e: 0.26, n: 2 }).hits[0]       // first floor contact
  })
  // NEXT k: from just after the previous object has landed until just before its own pass
  const nexts = []
  if (preview) {
    ms.forEach((m, k) => {
      const from = k ? ms[k - 1].tl0 + 0.35 : -1e9
      const to = m.tm - 0.1
      if (to - from >= 0.8) nexts.push({ from, to, html: m.nextHTML })
    })
  }

  // ghosts: dashed outlines of what the counter is about to buy, on the floor from frame 1
  const ghosts = showObj && lo.ghosts !== false ? ms.map(m => {
    const gg = objectProp(g.back, m.icon)
    for (const el of gg.querySelectorAll('circle, rect, path, line, ellipse')) {
      el.setAttribute('fill', 'none'); el.setAttribute('stroke', C.line); el.setAttribute('stroke-width', '5')
      el.setAttribute('stroke-dasharray', '7 8'); el.removeAttribute('opacity')
    }
    attr(gg, 'transform', `translate(${m.cx.toFixed(1)},${REST.toFixed(1)}) scale(${(m.size / 100).toFixed(4)})`)
    return { m, g: gg }
  }) : []
  const objs = showObj ? ms.map(m => ({ m, g: objectProp(g.mid, m.icon) })) : []

  // dust lines + puffs at each landing (upper half only: nothing reaches below the floor)
  const dusts = objs.map(({ m }) => {
    const grp = s('g', { style: 'display: none' })
    const lines = []
    for (const side of [-1, 1]) for (const a of [14, 36, 58]) {
      const el = s('line', { stroke: C.ink, 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none' })
      grp.append(el); lines.push({ el, side, a: (a * Math.PI) / 180 })
    }
    const puffs = [-1, 1].map(side => { const c = s('circle', { fill: C.line }); grp.append(c); return { c, side } })
    g.fx.append(grp)
    return { grp, lines, puffs }
  })

  // ================================================================== impacts + cues
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const tLand = M ? ms[M - 1].tl0 : -1
  const merge = M && Math.abs(tLand - t1) < 0.3            // the last landing IS the lock
  ms.forEach(m => {
    ctx.cue(m.tm, 'pop', { gain: 0.45 })
    if (!showObj) return
    const e = m.lv
    fxk.impact(m.tl0, {
      x: m.cx, y: REST - m.hgt / 2, burst: false, shake: m.last ? 13 : 3 + 8 * e,
      punch: m.last && !merge ? 0.018 : 0, cue: merge && m.last ? null : e > 0.5 ? 'hit' : 'thud', gain: 0.45 + 0.4 * e,
    })
  })
  const specCueAtStart = (spec.sfx || []).some(x => Math.abs(Number(x.t) - t0) < 0.1)
  if (t0 > 0.05 && !specCueAtStart) ctx.cue(t0, 'tick', { gain: 0.6 })   // the counter starts (unless the spec cues it)
  ctx.cue(t0, 'roll', { dur: Math.min(1.4, dur), gain: 0.22 })
  if (dur > 4) ctx.cue(Math.max(t0 + 1, t1 - 1.7), 'riser', { dur: Math.min(1.6, dur - 1), gain: 0.28 })
  const tLock = merge ? Math.max(t1, tLand) : t1
  fxk.impact(tLock, { x: PCX, y: PCY, burst: false, shake: 15, flash: 0.55, punch: 0.022, cue: 'hit', gain: 0.95 })
  ctx.cue(tLock + 0.1, 'cash', { gain: 0.5 })
  // side hit lines at the lock, in the margins left and right of the panel
  const lockLines = []
  const lockG = s('g', { style: 'display: none' })
  for (const side of [-1, 1]) for (const a of [-34, -12, 10, 32]) {
    const el = s('line', { stroke: C.ink, 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none' })
    lockG.append(el); lockLines.push({ el, side, a: (a * Math.PI) / 180 })
  }
  g.fx.append(lockG)

  // steam wisps off the panel's sides once it runs hot (margins only)
  const wisps = []
  for (let j = 0; j < 6; j++) {
    const el = s('path', { fill: 'none', stroke: '#A3AAB4', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0 })
    g.back.append(el)
    wisps.push({ el, side: j < 3 ? -1 : 1, off: j * 0.43, y: P0 + PH * (0.3 + 0.22 * (j % 3)) })
  }

  // ================================================================== heat
  let heatTr = null
  if (Array.isArray(lo.heat) && lo.heat.length) {
    const keys = lo.heat.map(k => ({ t: Number(k.t), v: typeof k.state === 'number' ? k.state : (HEAT_STATE[k.state] ?? 0), d: 0.45, e: 'inOut' }))
    heatTr = track(keys)
  }
  const wTime = M ? 0.14 : 0.94
  const heatAt = t => {
    if (heatTr) return clamp(heatTr.at(t))
    let x = wTime * clamp((t - t0) / dur)
    for (const m of ms) x += (0.8 / M) * E.out(prog(t, m.tm, 0.4))
    return clamp(x + 0.06 * E.out(prog(t, tLock, 0.3)))
  }

  // ================================================================== the figure
  const fig = showFig ? new Figure(g.fig, { scale: FIGK }) : null
  const keys = [{ t: 0, pose: 'thinkUp' }]
  const hops = [], steps = [], sits = []
  keys.push({ t: Math.max(0.5, t0), pose: POSE.watch, d: 0.3 })
  if (t0 > 0.4) hops.push({ t0, dur: 0.24, h: 12 })
  let prevT = Math.max(0.5, t0)
  let back = 0
  // the knock-down: the last landing when it is (nearly) the lock, otherwise the lock's own white impact
  const tHit = M && tLock - tLand <= 1.2 ? Math.max(tLand, tLock) : tLock
  for (const m of ms) {
    const tm = m.tm, tl = m.tl0
    if (tm - prevT > 7) {                                        // a long wait: scratch his chin, then watch again
      const mid = (prevT + tm) / 2
      keys.push({ t: mid - 0.8, pose: 'thinkUp', d: 0.35 }, { t: mid + 0.9, pose: POSE.watch, d: 0.35 })
    }
    if (tm - prevT > 1.4) keys.push({ t: tm - 0.6, pose: POSE.leanIn, d: 0.45, e: 'inOut' })   // anticipation
    keys.push({ t: tm + 0.02, pose: POSE.down, d: 0.16, e: 'out' })                            // eyes on the drop
    if (m.last) {
      keys.push({ t: tl - 0.05, pose: 'shocked', d: 0.1, e: 'out' })
      back += 10; steps.push({ t: tl - 0.05, v: back })
      if (tHit - tl > 1.0) keys.push({ t: tl + 0.42, pose: POSE.leanBack, d: 0.28, e: 'out' })   // lands, keeps watching
    } else if (m.lv < 0.34) {
      keys.push({ t: tl - 0.04, pose: POSE.flinch, d: 0.08, e: 'out' })
      keys.push({ t: tl + 0.32, pose: 'point', d: 0.24 })
      keys.push({ t: tl + 1.15, pose: POSE.watch, d: 0.35 })
    } else if (m.lv < 0.67) {
      keys.push({ t: tl - 0.04, pose: 'shocked', d: 0.1, e: 'out' })
      keys.push({ t: tl + 0.42, pose: POSE.watch, d: 0.26, e: 'out' })
    } else {
      keys.push({ t: tl - 0.06, pose: POSE.cower, d: 0.1, e: 'out' })
      back += 12; steps.push({ t: tl - 0.04, v: back })
      keys.push({ t: tl + 0.7, pose: POSE.leanBack, d: 0.35 })
    }
    prevT = tl + 1.2
  }
  // finale: knocked onto his butt by the last landing (or the lock), then he stares up at the white-hot counter
  const finale = lo.finale || 'sit'
  if (finale === 'sit') {
    keys.push({ t: tHit + 0.36, pose: POSE.sit, d: 0.14, e: 'out' })
    keys.push({ t: tHit + 1.1, pose: POSE.sitLook, d: 0.5, e: 'inOut' })
    back += 16; steps.push({ t: tHit + 0.3, v: back, d: 0.2 })
    sits.push(tHit + 0.5)
    ctx.cue(tHit + 0.5, 'thud', { gain: 0.35 })
  } else keys.push({ t: Math.max(tLock, tLand) + 0.7, pose: { slump: 'slump', shrug: 'shrug', celebrate: 'celebrate', shocked: 'shocked' }[finale] || 'slump', d: 0.32 })
  const tr = poseTrack(keys)
  const xTr = track([{ t: 0, v: FX }, ...steps.map(st => ({ t: st.t, v: FX - st.v, d: st.d ?? 0.22, e: 'out' }))])

  // ================================================================== seek
  const lastBeat = Math.max(tLock, tLand) + 0.6
  const duration = durationOf(spec, lastBeat, d.hold ?? 3)

  function stripAt(t) {
    let j = 0
    for (let i = 0; i < segs.length; i++) if (segs[i].t <= t) j = i
    const p = j ? prog(t, segs[j].t, 0.24) : 1
    const A = slots[j % 2], B = slots[(j + 1) % 2]
    setHTML(A, segs[j].html)
    // a split-flap roll: both move in lockstep, so the outgoing line clears the incoming one
    const e = E.inOut(p)
    if (p < 1) {
      setHTML(B, segs[j - 1].html)
      style(B, { display: '', opacity: (1 - e).toFixed(3), transform: `translateY(${(-stripH * e).toFixed(1)}px)` })
      if (!B.__ov) { B.__ov = true; B.setAttribute('data-overlap-ok', '') }
    } else style(B, { display: 'none' })
    if (A.__ov) { A.__ov = false; A.removeAttribute('data-overlap-ok') }
    style(A, { display: '', opacity: clamp(e * 1.4).toFixed(3), transform: `translateY(${(stripH * (1 - e)).toFixed(1)}px)` })
    // the check disc pops when a milestone flips in
    const ck = A.querySelector('.cc-chk')
    if (ck) { const q = prog(t, segs[j].t + 0.06, 0.24); style(ck, { transform: `scale(${(0.5 + 0.5 * E.back(q, 2.6)).toFixed(3)})` }) }
  }

  function nextAt(t) {
    let on = null
    for (const n of nexts) if (t >= n.from - 0.3 && t < n.to + 0.3) on = n
    if (!on) { style(next, { display: 'none' }); return }
    const a = Math.min(on.from < -1e8 ? 1 : E.out(prog(t, on.from, 0.25)), 1 - E.in(prog(t, on.to - 0.12, 0.12)))
    if (a <= 0.001) { style(next, { display: 'none' }); return }
    setHTML(nt, on.html)
    style(next, { display: '', opacity: a.toFixed(3), transform: `translateX(${(-14 * (1 - a)).toFixed(1)}px)` })
  }

  function seek(t) {
    const hh = heatAt(t)
    const col = heatRGB(hh)
    // ---- panel: vibration once hot (stops after the lock), a kick per pass, a bigger one at the lock
    const amp = 3.4 * smooth(clamp((hh - 0.55) / 0.35)) * (1 - prog(t, tLock + 0.3, 0.5))
    const r = rng(911 + Math.floor(t * 30 + 1e-6))
    const jx = amp * (r() * 2 - 1), jy = 0.6 * amp * (r() * 2 - 1)
    let kick = 1, fl = 0
    for (const m of ms) if (t >= m.tm) { const dt = t - m.tm; kick *= 1 + 0.028 * Math.exp(-9 * dt) * Math.cos(2 * Math.PI * 4 * dt); fl = Math.max(fl, Math.exp(-10 * dt)) }
    if (t >= tLock) { const dt = t - tLock; kick *= 1 + 0.045 * Math.exp(-8 * dt) * Math.cos(2 * Math.PI * 3.5 * dt); fl = Math.max(fl, Math.exp(-6 * dt)) }
    const ring = 7 * smooth(clamp((hh - 0.12) / 0.3)) + 5 * fl
    const ringCol = mixRGB(col, WHITE, fl)
    style(panel, {
      transform: `translate(${(PX + jx).toFixed(1)}px,${(P0 + jy).toFixed(1)}px) scale(${kick.toFixed(4)})`,
      boxShadow: `0 0 0 ${ring.toFixed(1)}px ${rgb(ringCol)}, 0 0 ${(16 + 70 * hh).toFixed(0)}px ${(4 + 14 * hh).toFixed(0)}px ${rgb(col, 0.12 + 0.45 * hh * hh)}`,
    })
    // ---- readout: the running counter, then the spec's final display string with a stamp
    setText(ro, textAt(t))
    const sq = squashAt(t, tLock, 0.14)
    style(ro, {
      color: rgb(col),
      textShadow: hh > 0.35 ? `0 0 ${(30 * hh).toFixed(0)}px ${rgb(col, 0.6 * hh)}` : 'none',
      transform: `scale(${sq.sx.toFixed(3)},${sq.sy.toFixed(3)})`,
    })
    // ---- live dot: blinks once per real second while the counter runs
    const live = t >= t0 && t < t1
    const ph = ((t - t0) % 1 + 1) % 1
    style(dot, { background: rgb(t < t0 ? hex(C.grey) : col), opacity: (live ? (ph < 0.5 ? 1 : 0.3) : t < t0 ? 0.6 : 1).toFixed(2) })

    if (stripH) stripAt(t)
    if (preview) nextAt(t)

    // ---- ghost of the next target: from just after the previous landing until its own object lands on it
    for (const gh of ghosts) {
      const k = gh.m.k, from = k ? ms[k - 1].tl0 + 0.35 : -1e9
      const a = from > gh.m.tl0 - 0.4 ? 0 : Math.min(k ? E.out(prog(t, from, 0.3)) : 1, 1 - prog(t, gh.m.tl0 - 0.05, 0.08))
      attr(gh.g, 'opacity', a.toFixed(3))
      style(gh.g, { display: a > 0.001 ? '' : 'none' })
    }
    // ---- objects: drop out from under the panel, land, squash, settle
    objs.forEach(({ m, g: og }, k) => {
      if (t < m.tm) { style(og, { display: 'none' }); style(dusts[k].grp, { display: 'none' }); return }
      const f = fall(t, m.tm, m.H, { e: 0.26, n: 2 })
      let sq2 = { sx: 1, sy: 1 }
      for (const th of f.hits) { if (t >= th) { const q = squashAt(t, th, th === f.hits[0] ? 0.24 : 0.1); sq2 = { sx: sq2.sx * q.sx, sy: sq2.sy * q.sy } } }
      const side = k % 2 ? 1 : -1
      const rot = f.landed ? wobble(t, m.tl0, 4 * side, 3, 6) : side * 9 * (1 - prog(t, m.tm, m.tl0 - m.tm))
      const pop = 0.86 + 0.14 * E.out(prog(t, m.tm, 0.12))
      const k2 = (m.size / 100) * pop
      style(og, { display: '' })
      const ox = f.landed ? m.cx : lerp(m.sx0, m.cx, E.inOutSine(prog(t, m.tm, m.tl0 - m.tm)))
      attr(og, 'transform', `translate(${ox.toFixed(1)},${(REST - f.y).toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${(k2 * sq2.sx).toFixed(4)},${(k2 * sq2.sy).toFixed(4)})`)
      // dust: hit lines up and out from the base, and two puffs sliding along the floor
      const du = dusts[k]
      const dt = t - m.tl0
      const on = dt >= 0 && dt < 0.34
      style(du.grp, { display: on ? '' : 'none' })
      if (on) {
        const p = E.out(prog(dt, 0, 0.26)), fade = 1 - E.inQuad(prog(dt, 0.06, 0.28))
        const big = 0.7 + 0.6 * m.lv
        for (const ln of du.lines) {
          const bx = m.cx + ln.side * (m.w / 2 + 4), by = REST - 8
          const r0 = 10 + 30 * p * big, r1 = r0 + (16 + 34 * p) * big
          const c = Math.cos(ln.a) * ln.side, sn = -Math.sin(ln.a)
          attr(ln.el, 'x1', (bx + c * r0).toFixed(1)); attr(ln.el, 'y1', (by + sn * r0).toFixed(1))
          attr(ln.el, 'x2', (bx + c * r1).toFixed(1)); attr(ln.el, 'y2', (by + sn * r1).toFixed(1))
          attr(ln.el, 'opacity', fade.toFixed(3))
        }
        for (const pf of du.puffs) {
          attr(pf.c, 'cx', (m.cx + pf.side * (m.w / 2 + 10 + 60 * p * big)).toFixed(1))
          attr(pf.c, 'cy', (REST - 10 - 6 * p).toFixed(1))
          attr(pf.c, 'r', (8 + 12 * p * big).toFixed(1))
          attr(pf.c, 'opacity', (0.9 * fade).toFixed(3))
        }
      }
    })

    // ---- lock hit lines (margins only)
    {
      const dt = t - tLock, on = dt >= 0 && dt < 0.3
      style(lockG, { display: on ? '' : 'none' })
      if (on) {
        const p = E.out(prog(dt, 0, 0.24)), fade = 1 - E.inQuad(prog(dt, 0.05, 0.25))
        for (const ln of lockLines) {
          const bx = ln.side < 0 ? PX - 10 : PX + PW + 10
          const r0 = 6 + 20 * p, r1 = r0 + 30 + 40 * p
          const c = Math.cos(ln.a) * ln.side, sn = Math.sin(ln.a)
          attr(ln.el, 'x1', (bx + c * r0).toFixed(1)); attr(ln.el, 'y1', (PCY + sn * r0 * 2.2).toFixed(1))
          attr(ln.el, 'x2', (bx + c * r1).toFixed(1)); attr(ln.el, 'y2', (PCY + sn * r1 * 2.2).toFixed(1))
          attr(ln.el, 'opacity', fade.toFixed(3))
        }
      }
    }

    // ---- steam once hot
    const steam = smooth(clamp((hh - 0.5) / 0.3))
    for (const w of wisps) {
      const life = (((t + w.off) / 1.3) % 1 + 1) % 1
      const op = steam * Math.sin(Math.PI * life) * 0.85
      const x0 = w.side < 0 ? PX - 14 : PX + PW + 14
      const x = x0 + w.side * (6 + 34 * life), y = w.y - 110 * life
      const sway = 9 * Math.sin(2 * Math.PI * (life * 1.5 + w.off))
      attr(w.el, 'd', `M${x.toFixed(1)},${y.toFixed(1)} q${(w.side * 10 + sway).toFixed(1)},-16 ${(w.side * 2).toFixed(1)},-34 t${(w.side * 4 - sway).toFixed(1)},-30`)
      attr(w.el, 'opacity', op < 0.02 ? '0' : op.toFixed(3))
    }

    // ---- the figure
    if (fig) {
      let p = tr.at(t)
      const prev = tr.at(t - 0.07)
      p = secondary(p, t, { prev })
      let lift = p.lift || 0
      for (const hp of hops) lift += hop(t, hp.t0, hp.dur, hp.h)
      const J = fk({ ...p, lift }, { x: xTr.at(t), ground: FLOOR, face: 1, scale: FIGK })
      let sqf = { sx: 1, sy: 1 }
      for (const hp of hops) { const q = squashAt(t, hp.t0 + hp.dur, 0.14); sqf = { sx: sqf.sx * q.sx, sy: sqf.sy * q.sy } }
      for (const ts of sits) { const q = squashAt(t, ts, 0.2); sqf = { sx: sqf.sx * q.sx, sy: sqf.sy * q.sy } }
      fig.draw(J, sqf)
    }

    const { shake, zoom } = fxk.seek(t)
    cam.set({ fx: PCX, fy: PCY, x: PCX, y: PCY, zoom, shake })
  }

  return { duration, seek }
}
