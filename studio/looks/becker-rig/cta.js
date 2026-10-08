// becker-rig: the channel brand (kit.brand = { theme, mark, cta }; the contract is in studio/README.md, "Brand layer").
//
// MARK  the logo replaces the green "≈" disc in the top-left brand mark (lib.js brandMarkLogo). Only with a logo; without
//       one the mark is exactly what it always was.
// CARD  the end card is one more shot of the same show, laid out like a teaser frame (header, working area on the floor
//       line, verdict band). u = t - t0, dur 2.5 s:
//   0.00-0.14  the held verdict frame dims to a 10% ghost under the void (whoosh); the floor line stays
//   0.04-0.44  the figure dashes in from off-shot left (run cycle) and skids to a stop at x 190 (the dash starts once the
//              ghost is faint, so he never runs through a held figure that still reads)
//   ~0.06      the logo drops from above the frame (it starts out of shot)
//   0.50       it SLAMS onto the floor line (snapped to a frame, so the contact frame shows the squash): hit + shake +
//              burst + camera punch, one small bounce (the squash relaxes as soon as it leaves the floor). The figure
//              startles (a hop, arms up), then turns his arm on it: a point, held to the end
//   0.24-0.52  the ghost clears to the empty void before any card text arrives
//   0.58       the main line pops in word by word in the header slot (Inter Tight 900, the hook's 84 px, fitted >= 60) (pop)
//   0.82       the kicker rises in under it, in the footer's mono voice (grey)
//   0.92       the handle pops into the verdict band under the logo, green, and the green swoosh draws under it (ding)
//   1.32 on    everything settled; only the figure breathes: about 1.18 s of full hold
// Without a logo the same prop is the look's own mark: the green disc with "≈", at card size.
// Everything is built once into `root` (#brand-layer), never into the stage, and seek(t) is pure in t.
import { balanceSplit } from '../../runtime/core.js'
import {
  h, s, style, attr, prog, clamp, lerp, E, C, F, T, L,
  makeWorld, makeFx, camera, Figure, poseTrack, runPose, blendPose, poseOf, fall, squashAt, hop, smooth, measure,
  channelLogo, brandMarkLogo,
} from './lib.js'

// layout (px) and beats (s from t0)
const K = {
  logo: 540,              // the logo prop (its square; a badge stands on its own lowest opaque pixel). Left edge x 330:
  logoX: 600,             // centre x of the logo and of the handle under it; clear of his pointing hand (tip x ~313), <= 940
  figX0: -130, figX: 190, // the figure dashes in from off-shot left and stops here, facing the logo
  figScale: 1.2,
  stride: 230,            // px per run cycle at this scale
  lineMax: T.header, lineMin: 60, lineW: L.right - L.left,
  kickerMax: 46, kickerMin: 40,
  handleMax: 72, handleMin: 48, handleW: 860,
}
// (for a card of 2.5 s or longer; a shorter cta.dur, down to brand.json's 1.5 s, compresses every beat, pose move and
// the fall itself by dur / 2.5, so the card still settles with ~47% of its length to hold)
const U0 = {
  dim: 0.14, clear0: 0.24, clear: 0.28, // veil 0 -> 0.9 over [0, dim], then -> 1 over [clear0, clear0 + clear]
  run0: 0.04, run: 0.4,                 // the dash [run0, run0 + run]: the held frame is <= 12% before he is in shot
  stop0: 0.28, stop1: 0.42,             // where the run cycle blends out
  land: 0.5, g: 13500,                  // the logo lands at about `land` (snapped to a frame), falling from out of shot
                                        // under this gravity (px/s^2): it starts at ~0.06
  skid: 0.12, stand: 0.12, startle: 0.07, toPoint: 0.14, point: 0.24, hop: 0.2,   // pose moves
  line: 0.58, stagger: 0.03, word: 0.16,
  kicker: 0.82, kickerDur: 0.2, handle: 0.92, handleDur: 0.3, swoosh: 0.1, swooshDur: 0.3,
}
// poses for the beats (lib.js pose fields)
const SKID = { lean: -16, tilt: -6, aF: [34, 40], aB: [-44, 30], lF: [34, -4], lB: [-14, -36] }
const STARTLE = { lean: -12, tilt: -14, aF: [128, 36], aB: [-128, -30], lF: [18, -12], lB: [-18, -12] }

export const brand = {
  // colours and fonts for anything the runtime draws itself (the generic card is not used, but keep it in the look)
  theme: { bg: C.void, fg: C.ink, kicker: C.grey, accent: C.heroInk, ring: C.hero, display: F.head, body: F.head },
  mark: (spec, ctx, b) => brandMarkLogo(ctx.stage, b),
  cta: endCard,
}

function endCard(spec, ctx, b, { t0, dur, root }) {
  const cta = b.cta
  const floorY = L.floorY
  const k = Math.min(1, dur / 2.5)                     // time scale (gravity scales by 1 / k^2, so the fall does too)
  const U = Object.fromEntries(Object.entries(U0).map(([n, v]) => [n, n === 'g' ? v / (k * k) : v * k]))

  // ---- the set: a veil in the stage's own background over the held frame, then the world (floor, figure, logo)
  const veil = h('div', { class: 'br-cta-veil', 'data-occlude': '' })
  root.append(veil)
  const world = makeWorld({ stage: root })            // floor line at y 1300, camera-able layers, impact flash
  const fx = makeFx(world, ctx), cam = camera(world)
  const fig = new Figure(world.g.fig, { scale: K.figScale })

  // ---- the prop: the logo, or the look's own mark at card size
  const logo = channelLogo(b, K.logo)
  const prop = h('div', { class: 'br-cta-prop', 'data-deco': '', style: { width: K.logo + 'px', height: K.logo + 'px' } })
  if (logo) prop.append(logo.el)
  // (the mark's "≈" is a glyph: data-roll tells the linter it is cut by the frame edge on purpose while it drops in)
  else prop.append(h('div', { class: 'br-cta-mark' }, h('span', { 'data-roll': '', style: { fontSize: Math.round(K.logo * 0.7) + 'px', top: (-0.035 * K.logo).toFixed(0) + 'px' } }, '≈')))
  world.html.append(prop)
  const edge = () => (logo ? logo.edge() : { ring: false, inset: 0 })

  // the drop: from just above the frame to the floor, closed form (fall), one small bounce. The first contact is snapped
  // to a frame: the disc is on the floor for exactly one frame before it bounces, and that frame carries the squash
  const fps = spec.fps || 30
  const H0 = floorY + 24
  const tLand = Math.round((t0 + U.land) * fps) / fps, uLand = tLand - t0
  const drop = t => fall(t, tLand - Math.sqrt(2 * H0 / U.g), H0, { g: U.g, e: 0.2, n: 2 })
  const hits = drop(t0 + 9).hits
  // the burst rings the visible disc: a badge stands on its lowest opaque pixel, so its centre sits inset * size lower.
  // The edge is read from the decoded <img>, which is only certain by the first seek, so fx reads y on each seek
  const cy = () => floorY - K.logo / 2 + edge().inset * K.logo
  fx.impact(tLand, { x: K.logoX, y: cy, rx: K.logo / 2 + 14, ry: K.logo / 2 + 14, r: 46, lines: 14, shake: 12, punch: 0.02, cue: 'hit', gain: 0.9 })

  // the figure: dash in, skid, stand; startle at the slam; point at the logo
  const tr = poseTrack([
    { t: 0, pose: 'stand' },
    { t: U.stop0, pose: SKID, d: U.skid, e: 'out' },
    { t: U.stop1, pose: 'stand', d: U.stand },
    { t: uLand, pose: STARTLE, d: U.startle, e: 'out' },
    { t: uLand + U.toPoint, pose: 'point', d: U.point },
  ])

  // ---- text: one layer above the world (not shaken)
  const text = h('div', { class: 'br-cta-text' })
  root.append(text)

  // main line in the header slot: balanced into 2 lines (3 if it must), the hook's size fitted down to 60 px
  const lsp = '-0.025em'
  let rows = [cta.line], px = K.lineMin
  for (const n of [1, 2, 3]) {
    if (n === 1 && measure(cta.line, `900 ${K.lineMax}px ${F.head}`, { letterSpacing: lsp }) > K.lineW * 0.9) continue   // a short line may stay on one row
    const ls = balanceSplit(cta.line, n)
    let p = K.lineMax
    while (p > K.lineMin && ls.some(l => measure(l, `900 ${p}px ${F.head}`, { letterSpacing: lsp }) > K.lineW)) p -= 2
    rows = ls; px = p
    if (ls.every(l => measure(l, `900 ${p}px ${F.head}`, { letterSpacing: lsp }) <= K.lineW)) break
  }
  // per-word spans are separate text runs, so the linter compares line 1 with line 2: an Inter Tight run is ~1.2 em
  // tall and the overlap rule allows 6 px, so the pitch is 1.14 em (the captions' 1.12, not the hook's 1.02).
  // Two lines at 84 px fill the header band exactly (248-440)
  const lh = Math.round(px * 1.14)
  const line = h('div', { class: 'br-cta-line', style: { fontSize: px + 'px', lineHeight: lh + 'px' } })
  const words = []
  for (const r of rows) {
    const row = h('div')
    r.split(' ').forEach((w, i) => { const sp = h('span', { class: 'w' }, w); words.push(sp); if (i) row.append(' '); row.append(sp) })
    line.append(row)
  }
  text.append(line)
  const lineBottom = L.headerTop + rows.length * lh

  // kicker under it, in the footer's mono voice
  let kicker = null
  if (cta.kicker) {
    kicker = h('div', { class: 'br-cta-kicker', style: { top: lineBottom + 18 + 'px' } })
    let kp = K.kickerMax
    const kf = p => `700 ${p}px ${F.mono}`
    while (kp > K.kickerMin && measure(cta.kicker, kf(kp), { letterSpacing: '-0.02em' }) > L.railX - 62) kp -= 2
    const krows = measure(cta.kicker, kf(kp), { letterSpacing: '-0.02em' }) > L.railX - 62 ? balanceSplit(cta.kicker, 2) : [cta.kicker]
    style(kicker, { fontSize: kp + 'px', lineHeight: Math.round(kp * 1.22) + 'px' })
    krows.forEach(r => kicker.append(h('div', {}, ...r.split(' ').flatMap((w, i) => (i ? [' ', h('span', { class: 'w' }, w)] : [h('span', { class: 'w' }, w)])))))
    text.append(kicker)
  }

  // handle in the verdict band, centred under the logo, with the verdict's green swoosh under it
  let hd = null, hdRise = 0
  const sw = []
  if (b.handle) {
    hd = h('div', { class: 'br-cta-handle' }, b.handle)
    text.append(hd)
    let hp = K.handleMax
    const set = p => style(hd, { fontSize: p + 'px', lineHeight: Math.round(p * 1.1) + 'px' })
    set(hp)
    while (hp > K.handleMin && hd.offsetWidth > K.handleW) set(hp -= 2)
    const w = hd.offsetWidth, hh = hd.offsetHeight
    // baseline: a zero-size inline-block sits on it
    const probe = h('span', { style: { display: 'inline-block', width: '0px', height: '0px' } })
    hd.append(probe)
    const base = probe.offsetTop
    probe.remove()
    const SW = 9
    const yl = base + 0.30 * hp, yr = base + 0.24 * hp, yc = base + 0.46 * hp
    const inkBottom = Math.max(hh, 0.25 * yl + 0.5 * yc + 0.25 * yr + SW / 2)
    const top = Math.round(L.capTop + (L.capBottom - L.capTop - inkBottom) / 2)
    const left = Math.round(clamp(K.logoX - w / 2, L.capCX - L.capW / 2, L.capCX + L.capW / 2 - w))
    style(hd, { left: left + 'px', top: top + 'px' })
    hdRise = clamp(L.capBottom - 3 - (top + inkBottom), 0, 20)
    const svg = s('svg', { class: 'br-vsw', width: w, height: hh + 40, 'data-deco': '' })
    const path = s('path', { d: `M4,${yl.toFixed(1)} Q${(w / 2).toFixed(1)},${yc.toFixed(1)} ${(w - 4).toFixed(1)},${yr.toFixed(1)}`, fill: 'none', stroke: C.hero, 'stroke-width': SW, 'stroke-linecap': 'round' })
    const len = Math.hypot(w, 14) * 1.05
    attr(path, 'stroke-dasharray', len.toFixed(1))
    svg.append(path)
    hd.append(svg)
    sw.push({ path, len })
  }

  // ---- sound: one cue per event
  ctx.cue(t0, 'whoosh', { dur: 0.3, gain: 0.5 })          // the frame dims, he dashes in
  ctx.cue(t0 + U.line, 'pop', { gain: 0.4 })              // the main line
  if (hd) ctx.cue(t0 + U.handle, 'ding', { gain: 0.6 })   // the handle (the verdict's sound)

  return {
    seek(t) {
      const u = Math.max(0, t - t0)
      // (the slam's clock runs 1 us ahead, so the contact frame is never lost to rounding: it is on the floor, squashed,
      // and the burst and shake have started)
      const tc = Math.max(t, t0) + 1e-6
      // the held frame dims to a ghost, then clears before the text
      const v = 0.9 * E.out(prog(u, 0, U.dim)) + 0.1 * E.inOut(prog(u, U.clear0, U.clear))
      style(veil, { opacity: v.toFixed(3) })

      // the logo: falls, slams, squashes about its contact point. The squash lives on the floor: it relaxes as the disc
      // leaves it (gone by 12 px up), so the bounce is round and the next contact squashes it again
      const e = edge()
      const f = drop(tc)
      let sq = squashAt(tc, hits[0], 0.1)
      if (hits[1]) { const s2 = squashAt(tc, hits[1], 0.05); sq = { sx: sq.sx * s2.sx, sy: sq.sy * s2.sy } }
      const onFloor = clamp(1 - f.y / 12)
      sq = { sx: 1 + (sq.sx - 1) * onFloor, sy: 1 + (sq.sy - 1) * onFloor }
      const ay = 1 - e.inset
      style(prop, { transform: `translate(${K.logoX}px,${(floorY - 1 - f.y).toFixed(1)}px) scale(${sq.sx.toFixed(3)},${sq.sy.toFixed(3)}) translate(-50%,${(-ay * 100).toFixed(2)}%)` })

      // the figure
      const x = lerp(K.figX0, K.figX, E.out(prog(u, U.run0, U.run)))
      let pose = tr.at(u)
      const amt = 1 - smooth(U.stop0, U.stop1, u)
      if (amt > 0) pose = blendPose(pose, runPose((x - K.figX0) / K.stride, 1), amt)
      pose = { ...poseOf(pose), lift: (pose.lift || 0) + hop(u, uLand, U.hop, 24) / K.figScale }
      const fsq = squashAt(u, uLand + U.hop, 0.08)
      fig.pose(t, tr, { x, pose, sx: fsq.sx, sy: fsq.sy })

      const { shake, zoom } = fx.seek(tc)
      cam.set({ shake, zoom })

      // main line: words pop in fast, the captions' grammar at the hook's size
      words.forEach((w, i) => {
        const p = prog(u, U.line + i * U.stagger, U.word)
        style(w, { opacity: clamp(p * 2.2).toFixed(3), transform: `translateY(${((1 - E.out(p)) * 18).toFixed(1)}px)` })
      })
      if (kicker) {
        const p = prog(u, U.kicker, U.kickerDur)
        style(kicker, { opacity: clamp(p * 1.8).toFixed(3), transform: `translateY(${((1 - E.out(p)) * 14).toFixed(1)}px)` })
      }
      if (hd) {
        const p = prog(u, U.handle, U.handleDur)
        const sc = 0.86 + 0.14 * E.back(p, 2.4)
        style(hd, { opacity: clamp(p * 4).toFixed(3), transform: `translateY(${((1 - E.out(p)) * hdRise).toFixed(1)}px) scale(${sc.toFixed(3)})` })
        for (const x2 of sw) attr(x2.path, 'stroke-dashoffset', (x2.len * (1 - E.inOut(prog(u, U.handle + U.swoosh, U.swooshDur)))).toFixed(1))
      }
    },
  }
}
