// becker-rig · growth-ladder (FORMATS.md §9): one small monthly amount, one rung per year, biggest number last.
//
// The table IS a ladder. Rails on the left, one rung per row; each rung runs out to the right as a dotted shelf
// the row's numbers stand on. The ladder is drawn light ("not reached yet") and turns ink rung by rung.
// Every row lands as a physical object: the Worth drops the last few px onto its shelf and squashes; "You put
// in" slides in beside it; a composition meter draws under the Worth (grey = what you put in, green = growth),
// so the green visibly takes over as the ladder rises. The last Worth lands on a gold plate with an impact
// (hit + shake + burst + camera punch), and the verdict lands in the caption band.
//
// Two modes, picked automatically from the row count (override with lookOpts.mode):
//   throw  the whole ladder fits on screen (about <= 10 rows). The figure stands at its foot and throws a coin
//          up to each rung; the coin turns into that year's Worth as it lands. Coins get heavier rung by rung
//          (bigger coin, deeper wind-up). The last one he lifts overhead, wobbles, and heaves: impact, coins
//          spill off the plate, he celebrates and points at it.
//   climb  long ladders (11-21+ rows). The figure climbs, hands and feet pinned to the rungs with 2-bone IK,
//          and slaps each rung as its row lands; the camera follows him up inside a viewport under fixed column
//          heads. On the top rung he lets go with one hand and pumps his fist.
//
// lookOpts (all optional):
//   mode: 'throw' | 'climb'   force a mode
//   figure: false             no figure (the numbers just drop onto their rungs)
//   figureScale: 1.3 (throw) / 1.1 (climb)   size of the figure (throw mode: he stands clear of the ladder, the
//                             rails move right to make room, and his pencil stays >= 40 px inside the frame)
//   bars: false               no composition meters
//   heave: false              throw mode: the last row is thrown like the others. With room before it (>= 2.2 s
//                             after the previous rung), the heave is a long struggle that fills the gap: the heavy
//                             coin drops into his arms (he buckles), he tries to hitch it up and sags, then presses
//                             it overhead under a riser and strains, wobbling, until he heaves it onto the plate.
// The climax keeps clear of the table's chrome: the impact's hit lines are clipped to the band between the column
// heads and the row under the plate and to the right of the plate's left edge - 8 (they never graze the second
// column), and the coins spill down the right margin (x 940-1000), never over a label.
// Layout: a 1-2 line hook leaves the band down to L.footerTop empty, so the footer is lifted to 16 px under the hook
// and the ladder starts from its new bottom (a 3-line hook has no slack and is unchanged). Throw mode keeps the year
// head right of the rails; only when that leaves the values under 56 px (a wide head word such as YEAR over short
// years, beside a wide second column) may the head overhang the rails, above the ladder top.
// Kit workarounds kept here (reported to the kit owner): the header gets 0.1em word spacing (the heavy display face
// fuses "invested just" at phone size), and the Worth cells set "≈ $X" with a visible space (word spacing), as the
// verdict and captions do.
//   establish: true           climb mode: open on a wide shot of the whole ladder, then push in (rung labels
//                             appear as the push-in makes them legible)
//   cols: [0, 2, 3]           which three data columns the ladder prints, as [year, second, hero] (default [0, 1, 2]).
//                             A 4-column spec (09a: Year / You put in / Worth / Earns a month) cannot print four
//                             numbers a row beside the figure, so it picks three: the 4th column becomes the hero
//                             (it is what drops, turns green and gets the gold plate) and the Worth the second
//                             column. Columns left out stay in the data for other kits; they are not drawn here.
//   second: 'bold'            the second column in the hero face (Inter Tight 800, ink) instead of grey mono: for a
//                             second column that is a balance, not a deposit
//   target: "$100"            the meters become a target gauge instead of the put-in/growth composition: under each
//                             hero a soft track (9 px) as long as the target, ending in an upright tick at the
//                             column's right edge ("up to here = the target"), filled grey to hero ÷ target (never
//                             shorter than 20 px), snapping green with its tick (and a pulse) on the rows that reach
//                             it. The gold-plate row has no gauge (the plate already says "reached"). Needed whenever
//                             cols moves the hero off the Worth (a composition meter would compare the wrong columns;
//                             without a target it is off)
//   working: [{ t, text }]    working lines: one mono line at a time over the column heads, swapped in at t (hold,
//                             then snap), set in ink with `**x**` the result (heroInk), so it reads as the maths and
//                             not as more of the grey footer. A line at t <= 0 is on screen at frame 1
//   beats: [{ t, row, act, d, label, tone, impact, relight }]   scripted moments on a row (throw mode):
//       act      a POSES name, or a list of them shared out over d ('celebrate' adds a hop): the figure takes it
//                0.14 s after t and holds it for d (default 1.6 s), cut short by his next throw
//       label    a tag on an ink plate, dropped over the empty slot above the row's hero from t + 0.08 to t + d
//                (t + 0.24 on an impact beat, once its burst has faded; tone 'good' = green, 'bad' = red;
//                `**x**` = coin yellow). It must be gone before the next row's coin flies, so keep t + d under the
//                next row's time minus about 0.6 s
//       impact   true: the row's hero swells to 1.15x (anchored right, over 0.5 s) under a burst and a shake at t,
//                and the row below is ink by the time it lands, so it is the only green number (no sound: put a
//                cue in spec.sfx)
//       relight  true: from t the row's year and hero turn green again with a bump and stay green, and a green
//                outlined plate (the gold plate's pad and radius, no fill) pops in behind the row's year-to-hero
//                span, its edges riding on the gauge lines over and under the row (those two gauges hand over to
//                it). The gold plate then steps back (grey border, paler fill): the verdict pointing back at the
//                row that answers the hook is the one focal point of the end hold
//       (a beat with only act, no label: the figure acts on a row that has no other moment, e.g. to fill a gap)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup, bump,
  fitText, C, F, T, L, S, E, POSES, poseTrack, poseOf, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj, pinLimb, blendJ, shiftJ, floorLine,
  chromeParts, durationOf, num, measure, arc, squashAt, fall, toss, popIn, hop, wobble, hbar, ladder, coin, RIG, figStroke,
} from '../lib.js'

export const css = `
.gl-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.gl-head { position: absolute; font: 800 40px/1.04 ${F.head}; letter-spacing: .07em; text-transform: uppercase; color: ${C.grey}; text-align: right; }
.gl-year { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; }
.gl-in { font-family: ${F.mono}; font-weight: 700; letter-spacing: -0.03em; color: ${C.grey}; }
.gl-worth { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; word-spacing: 0.14em; }
.gl-plate { position: absolute; left: 0; top: 0; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 18px; transform-origin: 100% 50%; }
.gl-relit { position: absolute; left: 0; top: 0; border: 6px solid ${C.hero}; border-radius: 18px; transform-origin: 50% 50%; opacity: 0; }
.gl-input { position: absolute; left: 62px; font: 700 40px/1 ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; white-space: nowrap; }
.gl-input b { color: ${C.ink}; font-weight: 800; }
.gl-in2 { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; word-spacing: 0.14em; color: ${C.ink}; }
.gl-work { position: absolute; left: 62px; font: 700 40px/48px ${F.mono}; letter-spacing: -0.02em; color: ${C.ink}; white-space: nowrap; transform-origin: 0 50%; }
#stage .gl-work em { font-style: normal; font-weight: 800; color: ${C.heroInk}; }
.gl-tag { background: ${C.ink}; border-radius: 12px; padding: 7px 16px 7px; font: 800 40px/46px ${F.mono}; letter-spacing: -0.03em; white-space: nowrap; }
#stage .gl-tag em { font-style: normal; color: ${C.coin}; }
.gl-tag::after { content: ''; position: absolute; right: 34px; bottom: -11px; border: 12px solid transparent; border-bottom: 0; border-top-color: ${C.ink}; }
`

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const smooth = p => p * p * (3 - 2 * p)

export default function growthLadder(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const allCols = d.columns && d.columns.length >= 3 ? d.columns : ['Year', 'You put in', 'Worth']
  // which data columns are printed, as [year, second, hero] (lookOpts.cols; default the first three)
  const okCols = Array.isArray(lo.cols) && lo.cols.length === 3 && lo.cols.every(k => Number.isInteger(k) && k >= 0 && k < allCols.length)
    && (d.rows || []).every(r => lo.cols.every(k => r[k] != null))
  const SHOW = okCols ? lo.cols : [0, 1, 2]
  const custom = SHOW.join() !== '0,1,2'
  const rows = (d.rows || []).map(r => SHOW.map(k => r[k]))
  const N = rows.length
  if (!N) throw new Error('growth-ladder: data.rows is empty')
  const cols = SHOW.map(k => allCols[k])
  const times = rows.map((_, i) => (d.rowT && d.rowT[i] != null ? d.rowT[i] : (d.rowsT ?? 1.5) + i * (d.rowEvery ?? 1.2)))
  const hold = d.hold ?? 3
  const hl = d.highlightLast !== false
  const vals = rows.map(r => ({ inN: num(r[1]), worthN: num(r[2]) }))
  // meters: the put-in/growth composition (default), a target gauge (lookOpts.target), or none (a custom hero
  // without a target: the composition would compare the wrong columns)
  const tgtN = lo.target != null ? num(String(lo.target)) : NaN
  const meterMode = Number.isFinite(tgtN) && tgtN > 0 ? 'target' : (custom ? 'none' : 'composition')
  // the second column: grey mono (a deposit) or, with lookOpts.second 'bold', the hero face in ink (a balance)
  const BOLD2 = lo.second === 'bold'
  const IN = BOLD2 ? { w: 800, fam: F.head, ls: '-0.02em', ws: 0.14, cls: 'gl-in2' } : { w: 700, fam: F.mono, ls: '-0.03em', ws: 0, cls: 'gl-in' }
  // beats and working lines (validated once; times are seconds)
  const beatsIn = (Array.isArray(lo.beats) ? lo.beats : []).filter(b => b && Number.isFinite(+b.t) && Number.isInteger(b.row) && b.row >= 0 && b.row < N)
    .map(b => ({ ...b, t: +b.t, d: Number.isFinite(+b.d) && +b.d > 0 ? +b.d : 1.6 }))
  const WL = (Array.isArray(lo.working) ? lo.working : []).filter(x => x && x.text != null && Number.isFinite(+x.t))
    .map(x => ({ t: +x.t, text: String(x.text) })).sort((a, b) => a.t - b.t)

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  // kit workaround (reported): the header's heavy display face nearly fuses words at phone size ("investedjust");
  // open its word spacing and re-fit (fitText only ever shrinks it)
  if (parts.header && spec.header) {
    style(parts.header, { wordSpacing: '0.1em' })
    fitText(parts.header, L.right - L.left, { maxH: L.headerBottom - L.headerTop, minPx: T.headerMin })
  }
  const fixed = h('div', { class: 'gl-fixed' })          // column heads + input badge: never move with the camera
  let top = parts.workTop
  // a short (1-2 line) hook leaves the band down to L.footerTop empty: lift the footer to 16 px under the hook
  // and start the ladder from its new bottom, so the rows get that room (a 3-line hook has no slack: unchanged)
  if (parts.footer) {
    const hb = spec.header ? L.headerTop + parts.header.offsetHeight : L.headerTop
    const ft = Math.ceil(hb + 16)
    if (ft < parseFloat(parts.footer.style.top || L.footerTop)) {
      style(parts.footer, { top: ft + 'px' })
      top = ft + parts.footer.offsetHeight + 28
    }
  }
  if (d.input && d.input.amount && !plain(spec.header || '').includes(d.input.amount)) {
    const el = h('div', { class: 'gl-input', style: { top: top + 'px' } })
    el.innerHTML = `<b>${esc(d.input.amount)}</b> ${esc(d.input.per || '')}${d.input.rate ? ' · ' + esc(d.input.rate) : ''}`
    fixed.append(el)
    top += 40 + 24
  }
  // working lines (lookOpts.working): one slot, one line at a time, under the footer and over the column heads
  // (the working line is set in ink, with the result green: it reads as the maths, not as a third line of the grey
  // small print above it)
  const workEls = WL.map(x => {
    const el = h('div', { class: 'gl-work', style: { top: top + 'px', opacity: '0' } })
    el.innerHTML = markup(x.text)
    fixed.append(el)
    return el
  })
  if (workEls.length) {
    // never past x 940 (it sits above y 820, but the rail rule is kept for safety): shrink a long line, not below 40
    WL.forEach((x, k) => {
      const w = measure(x.text, `700 40px ${F.mono}`, { letterSpacing: '-0.02em', html: true })
      if (w > 940 - 62) style(workEls[k], { fontSize: Math.max(40, Math.floor(40 * (940 - 62) / w)) + 'px' })
    })
    top += 48 + 20
  }
  // the ladder stands in from the edge: in throw mode he stands left of it, clear of the rails
  const throwish = lo.mode === 'throw' || (lo.mode !== 'climb' && N <= 10)
  // (throw mode: the ladder is a little narrower and set 68 px further right, so the bigger figure stands clear)
  const RAIL = throwish && lo.figure !== false ? [208, 272] : [140, 220]
  const CX = (RAIL[0] + RAIL[1]) / 2
  const FIG_X = 96                 // throw mode: his root x, on clear void left of the rails (his pencil >= 40 px in)
  const PENCIL_IN = 40
  const CG = throwish ? 34 : 44     // the least gap between two columns' values (throw mode gives 10 px to the figure)
  const X0 = RAIL[1] + 40          // left edge of the year column
  const XR = 922                   // right edge of the Worth column (x <= 940 below y 820)
  const GAP = 13                   // text baseline sits this far above its shelf
  const PLATE_PAD = [16, 8]
  const HLS = 1.08                 // highlight scale of the final number
  const fontStr = (w, px, fam) => `${w} ${px}px ${fam}`
  // (the Worth cells set "≈ $X" with 0.14em word spacing, so the ≈ reads as a sign with a space, as in the verdict)
  const WS = 0.14
  const mW = (str, px) => measure(str, fontStr(900, px, F.head), { letterSpacing: '-0.03em' }) + (String(str).split(' ').length - 1) * WS * px

  // greedy word-wrap of a column head into lines no wider than A (null if a single word is wider)
  let HLS_ = '.07em'                // column-head letter-spacing (tightened to .04em to keep heads on one line)
  let OVER = false                  // throw mode: the year head may overhang the rails (see the throw-mode search)
  function wrapHead(text, px, A) {
    const font = fontStr(800, px, F.head), o = { letterSpacing: HLS_, upper: true }
    // (split at ordinary spaces only: a no-break space keeps "a month" together, so "Earns a month" wraps "Earns / a month")
    const words = String(text).split(/[ \t\r\n]+/).filter(Boolean)
    const lines = []
    let cur = ''
    for (const w of words) {
      if (measure(w, font, o) > A + 0.5) return null
      const next = cur ? cur + ' ' + w : w
      if (!cur || measure(next, font, o) <= A + 0.5) cur = next
      else { lines.push(cur); cur = w }
    }
    if (cur) lines.push(cur)
    // two lines: balance them ("YOU / PUT IN", not "YOU PUT / IN")
    if (lines.length === 2) {
      let best = lines, bw = Math.max(...lines.map(l => measure(l, font, o)))
      for (let k = 1; k < words.length; k++) {
        const a = words.slice(0, k).join(' '), b = words.slice(k).join(' ')
        const w = Math.max(measure(a, font, o), measure(b, font, o))
        if (w <= A + 0.5 && w < bw - 0.5) { best = [a, b]; bw = w }
      }
      return { lines: best, w: bw }
    }
    return { lines, w: Math.max(...lines.map(l => measure(l, font, o))) }
  }
  // horizontal layout for a given Worth size: column right edges + wrapped heads (null if it does not fit)
  function columns(worthPx, allowWrap = true) {
    const yearPx = Math.max(Math.min(40, worthPx), Math.round(worthPx * 0.84))
    const inPx = Math.max(Math.min(40, worthPx), Math.round(worthPx * 0.7))
    const vY = Math.max(...rows.map(r => measure(r[0], fontStr(800, yearPx, F.head), { letterSpacing: '-0.02em' })))
    const vI = Math.max(...rows.map(r => measure(r[1], fontStr(IN.w, inPx, IN.fam), { letterSpacing: IN.ls }) + (String(r[1]).split(' ').length - 1) * IN.ws * inPx))
    const wv = rows.map(r => mW(r[2], worthPx))
    const wLast = wv[N - 1]
    const vW = Math.max(...wv.slice(0, hl ? -1 : undefined), hl ? wLast * HLS + PLATE_PAD[0] : 0)
    for (let headPx = T.small; headPx >= (allowWrap ? 34 : T.small); headPx -= 2) {
      const yearWord = Math.max(...String(cols[0]).split(/\s+/).map(w => measure(w, fontStr(800, headPx, F.head), { letterSpacing: HLS_, upper: true })))
      // (OVER: the year head may overhang the rails, as it sits above the ladder top in throw mode; never past x 60)
      const xYear = Math.max(X0 + vY, OVER ? L.left + 4 + yearWord : RAIL[1] + 18 + yearWord)
      // single-line heads must fit beside each other too; wrapped heads only need their longest word to fit
      const hw = c => (allowWrap ? 0 : measure(c, fontStr(800, headPx, F.head), { letterSpacing: HLS_, upper: true }))
      const loI = Math.max(xYear + CG + vI, xYear + 36 + hw(cols[1])), hiI = Math.min(XR - vW - CG, XR - 36 - hw(cols[2]))
      if (loI > hiI) return null
      const xIn = clamp((xYear + vI + XR - vW) / 2, loI, hiI)
      const hs = [wrapHead(cols[0], headPx, xYear - (OVER ? L.left + 4 : RAIL[1] + 18)), wrapHead(cols[1], headPx, xIn - xYear - 36), wrapHead(cols[2], headPx, XR - xIn - 36)]
      if (hs.every(Boolean) && (allowWrap || hs.every(x => x.lines.length === 1))) {
        const nl = Math.max(...hs.map(x => x.lines.length))
        return { worthPx, yearPx, inPx, wLast, xYear, xIn, headPx, heads: hs, headH: nl * headPx * 1.04, hls: HLS_ }
      }
    }
    return null
  }
  const rowNeed = c => Math.max(1.21 * c.worthPx, 1.32 * c.inPx, 1.21 * c.yearPx) + 2   // text runs must not overlap

  // ---- throw mode: everything on one screen
  const bottomThrow = L.floorY - 18
  let mode = lo.mode, lay = null, pitch = 0
  // Prefer single-line column heads at 40 px; only if no reasonable size fits, let heads wrap (and shrink).
  // A short table (5 rows or fewer) gets bigger values (up to 84 px) and a taller pitch, and the block is centred in
  // the work area (the ladder keeps filler rungs down to the floor), so the hook frame is never half empty.
  let lift0 = 0
  if (mode !== 'climb') {
    const minPx = mode === 'throw' ? 34 : 44
    const few = N <= 5
    const search = () => {
      // (a short table prefers big values over single-line heads: its heads may wrap to reach 60-84 px)
      // (one-line heads first: at the house letter-spacing, then tightened to .04em; only then may they wrap)
      for (const [wrap, floorPx, startPx, hls] of [...(few ? [[false, 60, 84, '.07em'], [false, 60, 84, '.04em'], [true, 60, 84, '.07em']] : []), [false, 50, 76, '.07em'], [false, 50, 76, '.04em'], [true, minPx, 76, '.07em']]) {
        HLS_ = hls
        for (let px = startPx; px >= floorPx; px -= 2) {
          const c = columns(px, wrap)
          if (!c) continue
          const topExtra = hl ? 0.97 * px * HLS + PLATE_PAD[1] + 8 : 0.97 * px
          const room = bottomThrow - GAP - topExtra - (top + c.headH + 20)
          const avail = N > 1 ? room / (N - 1) : 999
          if (avail >= rowNeed(c)) {
            const p = Math.min(avail, few ? Math.max(rowNeed(c) + 60, 2.6 * px) : Math.max(rowNeed(c) + 40, 2 * px))
            return { c, hls, pitch: p, lift0: few ? Math.max(0, (room - (N - 1) * p) / 2) : 0 }
          }
        }
      }
      return null
    }
    // the year head stays right of the rails; only when that leaves the values under 56 px (a wide head word over
    // short years, e.g. YEAR over "30" beside a wide second column) may it overhang them, above the ladder top
    let best = search()
    if (!best || best.c.worthPx < 56) {
      OVER = true
      const b2 = search()
      if (b2 && (!best || b2.c.worthPx > best.c.worthPx)) best = b2
      else OVER = false
    }
    if (best) { lay = best.c; HLS_ = best.hls; pitch = best.pitch; lift0 = best.lift0; mode = 'throw' }
  }
  // ---- climb mode: fixed pitch, the camera scrolls
  if (!lay) {
    mode = 'climb'
    for (const [wrap, floorPx, hls] of [[false, 46, '.07em'], [false, 46, '.04em'], [true, 34, '.07em']]) { HLS_ = hls; for (let px = 60; px >= floorPx && !lay; px -= 2) lay = columns(px, wrap) }
    if (!lay) throw new Error('growth-ladder: the row values are too wide for the column layout')
    pitch = Math.ceil(rowNeed(lay) + 6)
  }
  const climb = mode === 'climb'
  const FIGK = lo.figureScale ?? (climb ? 1.1 : 1.3)
  const { worthPx, yearPx, inPx, wLast, xYear, xIn, headPx } = lay
  const xWorth = XR
  // vertical: rung r's y in world coordinates (r may be fractional or negative)
  const legLen = (RIG.thigh + RIG.shin) * FIGK
  const HIP_DROP = 172 * FIGK / 1.1                         // climb: the hip hangs this far below the gripped rung
  const y0 = climb ? L.floorY - legLen * 0.985 - HIP_DROP : bottomThrow - lift0
  const shelfY = r => y0 - r * pitch
  const baseY = i => shelfY(i) - GAP
  const boxBottom = (i, px) => baseY(i) + 0.14 * px
  const topShelf = shelfY(N - 1)
  // heads sit just above the top row (throw) or at the top of the viewport (climb)
  const topRowTop = topShelf - GAP - (hl ? 0.97 * worthPx * HLS + PLATE_PAD[1] + 8 : 0.97 * worthPx)
  const headTop = climb ? top : Math.max(top, topRowTop - 20 - lay.headH)
  const headBottom = headTop + lay.headH
  // (climb: the viewport ends at the floor line, and the floor line is pinned in screen space, so the ground plane
  // never pans away: the ladder rises out of it as the camera follows him up)
  const VP = climb ? [Math.round(headBottom + 14), L.floorY - 2] : null

  // ================================================================== build
  const world = makeWorld(ctx, { clip: VP })
  if (climb) {
    const fl = s('svg', { class: 'br-svg', width: 1080, height: 1920, viewBox: '0 0 1080 1920', 'data-deco': '' }, floorLine(L.floorY))
    ctx.stage.append(fl)
  }
  ctx.stage.append(fixed)
  const g = world.g
  const showBars = lo.bars !== false && pitch >= 56 && meterMode !== 'none'
  // (a target gauge is drawn at the thickest weight: with its end tick it must read as a gauge, not an underline)
  const barW = meterMode === 'target' ? 9 : clamp(Math.round(pitch * 0.09), 6, 9)

  // ladder: light structure (plus filler rungs down to the floor in climb mode) + an ink copy that climbs
  const fillers = []
  if (climb || lift0 > 0) for (let r = -1; shelfY(r) < L.floorY - pitch * 0.4; r--) fillers.push(shelfY(r))
  const ladTop = topShelf - Math.min(64, pitch * 0.65)
  ladder(g.back, { x0: RAIL[0], x1: RAIL[1], yBottom: L.floorY, yTop: ladTop, rungs: [...fillers, ...rows.map((_, i) => shelfY(i))], color: C.line })
  const inkFill = fillers.length ? fillers.map(y => { const el = s('line', { x1: RAIL[0], x2: RAIL[1], y1: y, y2: y, stroke: C.ink, 'stroke-width': S.rung, 'stroke-linecap': 'round', opacity: 0 }); g.back.append(el); return { el, y } }) : []
  const inkLad = ladder(g.back, { x0: RAIL[0], x1: RAIL[1], yBottom: L.floorY, yTop: L.floorY, rungs: rows.map((_, i) => shelfY(i)) })
  const guides = rows.map((_, i) => {
    const el = s('line', { x1: RAIL[1] + 18, x2: XR, y1: shelfY(i), y2: shelfY(i), stroke: C.line, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15' })
    g.back.append(el)
    return el
  })
  // composition meter under each Worth: grey = what you put in, green = growth
  const meterW = Math.max(160, ...rows.slice(0, hl ? -1 : undefined).map(r => mW(r[2], worthPx)))
  const M0 = XR - meterW
  // (target mode: the soft track is the target's length; the fill is grey until it reaches the end, then green)
  const tracks = meterMode === 'target' ? rows.map(() => hbar(g.back, { color: C.line, width: barW })) : []
  // ... and each track ends in a short upright tick at x = XR ("up to here = the target"); grey until the row
  // reaches it, then green with the fill
  const TICK = { x: XR + 6, up: 9, down: 10 }
  const ticks = meterMode === 'target' ? rows.map(() => { const el = s('line', { stroke: C.grey, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 }); g.mid.append(el); return el }) : []
  const FILL_MIN = 20                // a short fill (≈ $8 of $100) still reads as a fill, not a stray underscore
  const barsIn = rows.map(() => hbar(g.mid, { color: C.line, width: barW }))
  const barsGrow = rows.map(() => hbar(g.mid, { color: C.hero, width: barW }))
  const reach = vals.map(v => (meterMode === 'target' ? Math.max(0, v.worthN) / tgtN : 0))   // hero ÷ target
  if (meterMode === 'target') barsIn.forEach(b => attr(b.el, 'stroke', C.grey))
  // relight beats: from t the row's year and hero are green again (the first relight per row wins)
  const relightT = rows.map((_, i) => { const b = beatsIn.filter(x => x.relight && x.row === i).sort((a, c) => a.t - c.t)[0]; return b ? b.t : null })

  // column heads (fixed layer), right-aligned over their columns, wrapped to 1-2 lines
  lay.heads.forEach((hd, k) => {
    const el = h('div', { class: 'gl-head' })
    el.innerHTML = hd.lines.map(esc).join('<br>')
    const lh = Math.round(headPx * 1.04)               // integer line box: the linter reads px from rendered height
    style(el, { fontSize: headPx + 'px', lineHeight: lh + 'px', letterSpacing: lay.hls, top: (headBottom - hd.lines.length * lh).toFixed(1) + 'px', width: Math.ceil(hd.w + 2) + 'px' })
    fixed.append(el)
    style(el, { left: ([xYear, xIn, xWorth][k] - el.offsetWidth).toFixed(1) + 'px' })
  })

  // relight: a green outlined plate (the gold plate's pad and radius, no fill) behind the relit row's year-to-hero
  // span; its top and bottom edges ride on the gauge lines above and below the row, so it never cuts a value
  const relitBox = rows.map((_, i) => {
    if (relightT[i] == null || climb) return null
    const el = h('div', { class: 'gl-relit', 'data-deco': '' })
    world.html.append(el)
    const vYmax = Math.max(...rows.map(r => measure(r[0], fontStr(800, yearPx, F.head), { letterSpacing: '-0.02em' })))
    const x0 = xYear - vYmax - PLATE_PAD[0], x1 = xWorth + PLATE_PAD[0]
    // (with gauges: from the centre of the gauge over the row to the centre of the row's own gauge; without, the
    // plate's own pad around the digits)
    const yTop = showBars && i < N - 1 ? shelfY(i + 1) + 3 - 3 : baseY(i) - 0.86 * worthPx - PLATE_PAD[1]
    const yBot = showBars ? shelfY(i) + 3 + 3 : baseY(i) + 0.14 * worthPx + PLATE_PAD[1]
    style(el, { width: (x1 - x0).toFixed(0) + 'px', height: (yBot - yTop).toFixed(0) + 'px' })
    return { el, x0, y0: yTop, w: x1 - x0, h: yBot - yTop }
  })
  let plate = null
  const R = rows.map((r, i) => {
    const last = i === N - 1
    if (last && hl) { plate = h('div', { class: 'gl-plate' }); world.html.append(plate) }
    return {
      year: new NumObj(world.html, { cls: 'gl-year', text: r[0], ax: 1, ay: 1, style: { fontSize: yearPx + 'px' } }),
      inv: new NumObj(world.html, { cls: IN.cls, text: r[1], ax: 1, ay: 1, style: { fontSize: inPx + 'px' } }),
      worth: new NumObj(world.html, { cls: 'gl-worth', text: r[2], ax: 1, ay: 1, style: { fontSize: worthPx + 'px' } }),
      t: times[i], last,
    }
  })
  const pb = (() => {
    const w = wLast * HLS + 2 * PLATE_PAD[0], hh = worthPx * HLS + 2 * PLATE_PAD[1]
    const cy = baseY(N - 1) - worthPx * HLS * 0.36
    return { x: xWorth + PLATE_PAD[0] - w, y: cy - hh / 2, w, h: hh, cx: xWorth + PLATE_PAD[0] - w / 2, cy }
  })()
  if (plate) style(plate, { width: pb.w.toFixed(0) + 'px', height: pb.h.toFixed(0) + 'px' })

  // ================================================================== impacts, landings, cues
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const DROP = 30
  const dropDur = Math.sqrt((2 * DROP) / 5200)
  const squashAmt = Math.max(0, Math.min(0.2, 1 - 41 / worthPx))
  rows.forEach((_, i) => {
    const Tl = times[i]
    if (i === N - 1 && hl) {
      fxk.impact(Tl, { x: pb.cx, y: pb.cy, shake: 14, punch: 0.03, rx: pb.w / 2 + 14, ry: pb.h / 2 + 12, r: 46, lines: 14, cue: 'hit', gain: 0.95 })
      // the hit lines stay in the band between the column heads and the row under the plate: they never cross a
      // label or a value (throw mode; in climb mode the viewport already clips the world under the heads)
      const burst = world.g.fx.lastElementChild
      if (!climb && burst) {
        const y0 = headBottom + 10, y1 = N > 1 ? baseY(N - 2) - 0.8 * worthPx - 6 : L.floorY
        const id = 'gl-burst-clip-' + Math.round(pb.cx) + '-' + Math.round(pb.cy)
        // (and never left of the plate's left edge - 8: a hit line must not graze the row's second column)
        const cx0 = pb.x - 8
        const cp = s('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }, s('rect', { x: cx0.toFixed(1), y: y0.toFixed(1), width: (1280 - cx0).toFixed(1), height: Math.max(0, y1 - y0).toFixed(1) }))
        world.g.fx.append(cp)
        burst.setAttribute('clip-path', `url(#${id})`)
      }
      ctx.cue(Tl + 0.12, 'cash', { gain: 0.6 })
    } else if (Tl > 0) ctx.cue(Tl, 'thud', { gain: 0.45 })     // (a row at t <= 0 is already down at frame 1)
  })
  const spill = []
  if (hl) {
    const Tl = times[N - 1]
    // they spill off the plate's right end and drop down the right margin (x 940-1000) to the floor there: never
    // over a label or a value, never off the frame, never up into the column heads
    const right = pb.x + pb.w
    const vs = [[18, 10, -300, 18], [30, -6, -200, 16], [36, 6, -360, 14], [16, 12, -150, 17], [28, -10, -260, 15], [40, 2, -120, 14]]
    vs.forEach(([dx, vx, vy, r], k) => {
      const c = coin(g.top, { r, text: '' })
      spill.push({ c, t0: Tl + 0.03 + k * 0.025, p0: [Math.min(1000 - r - 8, right + dx), pb.cy + 4], v: [vx, vy], r })
    })
  }

  // ================================================================== beats: tags, impacts (lookOpts.beats)
  const heroBox = i => {                       // the row's hero cell: [left, right, top of the digits, baseline]
    const w = mW(rows[i][2], worthPx) * (i === N - 1 && hl ? HLS : 1)
    return { x0: xWorth - w, x1: xWorth, top: baseY(i) - 0.73 * worthPx * (i === N - 1 && hl ? HLS : 1), base: baseY(i) }
  }
  const tags = beatsIn.filter(b => b.label).map(b => {
    const n = new NumObj(world.html, { cls: 'gl-tag', text: b.label, html: true, ax: 1, ay: 1 })
    n.set({ opacity: 0, color: b.tone === 'bad' ? C.red : C.hero })
    return { b, n }
  })
  // an impact beat swells its row's hero to IMPACT_K (anchored right, over 0.5 s) under a burst sized to the swell
  const IMPACT_K = 1.15
  const impactT = rows.map((_, i) => beatsIn.filter(b => b.impact && b.row === i).map(b => b.t))
  beatsIn.filter(b => b.impact).forEach(b => {
    const hb = heroBox(b.row)
    const w = (hb.x1 - hb.x0) * IMPACT_K, hgt = (hb.base - hb.top) * IMPACT_K
    fxk.impact(b.t, { x: hb.x1 - w / 2, y: hb.base - hgt / 2, shake: 8, r: 34, lines: 12,
      rx: w / 2 + 12, ry: hgt / 2 + 14, cue: null })
    // its hit lines stay right of the row's second column and above its shelf (the rows below are filled)
    const burst = world.g.fx.lastElementChild
    if (burst) {
      const id = `gl-beat-clip-${b.row}-${Math.round(b.t * 100)}`
      const y0 = headBottom + 10, y1 = shelfY(b.row) + 4, x0 = xIn + 10
      world.g.fx.append(s('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }, s('rect', { x: x0.toFixed(1), y: y0.toFixed(1), width: (1080 - x0).toFixed(1), height: Math.max(0, y1 - y0).toFixed(1) })))
      burst.setAttribute('clip-path', `url(#${id})`)
    }
  })

  // ================================================================== the figure
  const showFig = lo.figure !== false
  const fig = showFig ? new Figure(g.fig, { scale: FIGK, outlineWidth: climb ? 5 : 12 }) : null
  const lastT = times[N - 1]
  const maxW = Math.max(...vals.map(v => v.worthN).filter(Number.isFinite), 1)
  // frame 1: hand on chin, looking up the ladder; a nod (throw mode: the hand tucked in, so he stands clear of the rail)
  const TU = climb ? poseOf('thinkUp') : { ...poseOf('thinkUp'), aF: [26, 146] }
  const intro = [{ t: 0, pose: TU }, { t: 0.35, pose: { ...TU, tilt: -6, aF: [TU.aF[0] - 4, TU.aF[1] + 6] }, d: 0.3, e: 'inOut' },
    { t: 0.75, pose: TU, d: 0.35, e: 'spring' }]
  let figSeek = () => {}

  if (showFig && !climb) {
    // ---------------- throw mode choreography
    const heaveOn = lo.heave !== false && hl && N >= 2
    const keys = [...intro]
    const coins = [], wob = [], hops = [], strain = [], buckles = []
    const slot = i => [xWorth - (i === N - 1 && hl ? wLast * HLS : mW(rows[i][2], worthPx)) / 2, baseY(i) - worthPx * 0.38]
    for (let i = 0; i < N; i++) {
      const Tl = times[i], prevT = i ? times[i - 1] : 0
      const room = Tl - prevT - (i ? 0.1 : 0.35)
      const e = N > 1 ? i / (N - 1) : 0
      if (!(heaveOn && i === N - 1)) {
        const cyc = clamp(room * 0.9, 0, 0.95)
        if (cyc < 0.42) continue                       // no time to throw: this number just drops in
        const a = Tl - cyc, w = Tl - 0.72 * cyc, r = Tl - 0.42 * cyc
        keys.push({ t: a, pose: 'hold', d: 0.16, e: 'out' })
        keys.push({ t: w, pose: { ...poseOf('windup'), lean: -12 - 10 * e, lF: [26 + 8 * e, -14 - 22 * e], lB: [-22, -28 - 10 * e] }, d: Math.max(0.12, 0.26 * cyc), e: 'inOut' })
        keys.push({ t: r, pose: 'release', d: 0.07, e: 'out' })
        keys.push({ t: r + 0.1, pose: 'follow', d: 0.14, e: 'out' })
        keys.push({ t: Tl + 0.06, pose: i === N - 1 ? 'celebrate' : 'idle', d: 0.34, e: 'spring' })
        coins.push({ i, r: lerp(20, 34, Math.sqrt(Math.max(0, vals[i].worthN) / maxW)), a, rel: r + 0.035, land: Tl - 0.115, heavy: false })
        ctx.cue(r, 'swipe', { gain: 0.5, dur: 0.2 })
      } else if (room >= 2.2) {
        // the long heave: it fills the gap after the previous rung with a struggle (no dead air before the climax)
        const cyc = clamp(room * 0.85, 2.2, 3.6)
        const a = Tl - cyc                               // the heavy coin lands in his arms
        const l = Tl - Math.max(1.6, 0.6 * cyc)          // he presses it overhead
        const c = Tl - 0.55, r = Tl - 0.42               // a last dip, then the heave
        const lowCarry = { ...poseOf('carry'), lean: 12, tilt: 10, aF: [40, 100], aB: [30, 108], lF: [34, -64], lB: [-8, -58] }
        keys.push({ t: a - 0.3, pose: 'carry', d: 0.2, e: 'out' })                                // hands out...
        keys.push({ t: a + 0.04, pose: lowCarry, d: 0.16, e: 'out' })                            // ...the coin: he buckles
        const hA = a + 0.42 * (l - a), hB = a + 0.72 * (l - a)
        keys.push({ t: hA, pose: { ...poseOf('lift'), lean: -2, aF: [112, 40], aB: [102, 46], lF: [22, -40], lB: [-16, -34] }, d: 0.3, e: 'inOut' })  // a hitch...
        keys.push({ t: hB, pose: lowCarry, d: 0.22, e: 'out' })                                 // ...and it sags back
        keys.push({ t: l, pose: { ...poseOf('lift'), lF: [22, -46], lB: [-20, -40] }, d: 0.45, e: 'spring' })
        keys.push({ t: c, pose: { ...poseOf('lift'), lean: 4, aF: [176, 26], aB: [168, 30], lF: [34, -86], lB: [-6, -80] }, d: 0.1, e: 'inOut' })
        keys.push({ t: r, pose: { ...poseOf('release'), lean: 8, aF: [158, -6], aB: [150, -2], lF: [18, -6], lB: [-16, -4], lift: 26 }, d: 0.08, e: 'out' })
        keys.push({ t: r + 0.16, pose: 'stand', d: 0.18, e: 'out' })
        keys.push({ t: Tl + 0.22, pose: 'celebrate', d: 0.24, e: 'spring' })
        keys.push({ t: Tl + 1.25, pose: 'pointUp', d: 0.32, e: 'spring' })
        strain.push({ t0: a + 0.12, t1: l, amp: 3.5, f: 2.2 })     // swaying under the weight at his waist
        strain.push({ t0: l + 0.35, t1: c, amp: 5.5, f: 6 })       // overhead: shaking with the strain, growing
        buckles.push(a)
        hops.push({ t0: Tl + 0.22, dur: 0.42, h: 48 })
        coins.push({ i, r: 54, a, rel: r + 0.03, land: Tl - 0.115, heavy: true })
        ctx.cue(a, 'thud', { gain: 0.5 })
        ctx.cue(hB, 'step', { gain: 0.4 })
        ctx.cue(l + 0.05, 'riser', { dur: Math.max(0.3, r - l - 0.05), gain: 0.35 })
        ctx.cue(r, 'whoosh', { dur: 0.3, gain: 0.5 })
        ctx.cue(Tl + 0.64, 'step', { gain: 0.6 })
      } else {
        const cyc = clamp(room * 0.92, 0.7, 1.5)
        const a = Tl - cyc, l = Tl - 0.8 * cyc, c = Tl - 0.4 * cyc, r = Tl - 0.3 * cyc
        keys.push({ t: a, pose: 'carry', d: 0.16, e: 'out' })
        keys.push({ t: l, pose: { ...poseOf('lift'), lF: [22, -46], lB: [-20, -40] }, d: 0.3, e: 'spring' })
        keys.push({ t: c, pose: { ...poseOf('lift'), lean: 4, aF: [176, 26], aB: [168, 30], lF: [34, -86], lB: [-6, -80] }, d: 0.1, e: 'inOut' })
        keys.push({ t: r, pose: { ...poseOf('release'), lean: 8, aF: [158, -6], aB: [150, -2], lF: [18, -6], lB: [-16, -4], lift: 26 }, d: 0.08, e: 'out' })
        keys.push({ t: r + 0.16, pose: 'stand', d: 0.18, e: 'out' })
        keys.push({ t: Tl + 0.22, pose: 'celebrate', d: 0.24, e: 'spring' })
        keys.push({ t: Tl + 1.25, pose: 'pointUp', d: 0.32, e: 'spring' })
        wob.push({ t0: l + 0.22, t1: c, amp: 5, f: 5.5 })
        hops.push({ t0: Tl + 0.22, dur: 0.42, h: 48 })
        coins.push({ i, r: 54, a, rel: r + 0.03, land: Tl - 0.115, heavy: true })
        ctx.cue(l + 0.05, 'riser', { dur: Math.max(0.3, r - l - 0.05), gain: 0.35 })
        ctx.cue(r, 'whoosh', { dur: 0.3, gain: 0.5 })
        ctx.cue(Tl + 0.64, 'step', { gain: 0.6 })
      }
    }
    if (!heaveOn) keys.push({ t: lastT + 0.9, pose: 'pointUp', d: 0.32, e: 'spring' })
    // scripted acts (lookOpts.beats[].act): 0.14 s after the beat, held for d, cut short by his next throw or heave
    const starts = coins.map(cn => cn.a - (cn.heavy ? 0.3 : 0)).sort((a, b) => a - b)
    for (const b of beatsIn) {
      const acts = (Array.isArray(b.act) ? b.act : b.act ? [b.act] : []).filter(p => typeof p === 'string' && POSES[p])
      if (!acts.length) continue
      const s0 = b.t + 0.14
      const nxt = starts.find(x => x > s0) ?? Infinity
      const end = Math.min(b.t + b.d, nxt - 0.02)
      if (end - s0 < 0.3) continue
      const step = (end - s0) / acts.length
      acts.forEach((p, k) => {
        keys.push({ t: s0 + k * step, pose: p, d: 0.24, e: 'spring' })
        if (p === 'celebrate' || p === 'win') hops.push({ t0: s0 + k * step, dur: 0.42, h: 40 })
      })
      if (nxt - end > 0.3) keys.push({ t: end, pose: 'idle', d: 0.3, e: 'inOut' })
    }
    keys.sort((a, b) => a.t - b.t)
    const tr = poseTrack(keys)
    const figPose = t => {
      let p = tr.at(t)
      const prev = tr.at(t - 0.07)
      for (const w of wob) if (t >= w.t0 && t < w.t1 + 0.15) p = { ...p, lean: p.lean + wobble(t, w.t0, w.amp, w.f, 1.2) * (1 - prog(t, w.t1, 0.15)) }
      // a sustained strain: the sway grows over its window (no decay) and settles out in 0.15 s
      for (const w of strain) if (t >= w.t0 && t < w.t1 + 0.15) {
        const k = (0.45 + 0.55 * prog(t, w.t0, w.t1 - w.t0)) * (1 - prog(t, w.t1, 0.15)) * prog(t, w.t0, 0.12)
        p = { ...p, lean: p.lean + w.amp * k * Math.sin(2 * Math.PI * w.f * (t - w.t0)), tilt: p.tilt + 0.6 * w.amp * k * Math.sin(2 * Math.PI * w.f * (t - w.t0) + 1.3) }
      }
      p = secondary(p, t, { prev })
      let lift = p.lift || 0
      for (const hp of hops) lift += hop(t, hp.t0, hp.dur, hp.h)
      return { ...p, lift }
    }
    const J = t => { const Jt = fk(figPose(t), { x: FIG_X, ground: L.floorY, face: 1, scale: FIGK }); return fig ? shiftJ(Jt, Math.max(0, PENCIL_IN - fig.extentX(Jt)[0])) : Jt }
    const inHand = (Jt, cn) => cn.heavy
      ? [(Jt.hF[0] + Jt.hB[0]) / 2 + 4, Math.min(Jt.hF[1], Jt.hB[1]) - cn.r * 0.82]
      : [Jt.hF[0] + 4, Jt.hF[1] - cn.r * 0.55]
    for (const cn of coins) {
      cn.c = coin(g.top, { r: cn.r, text: '' })
      cn.from = inHand(J(cn.rel), cn)
      cn.to = slot(cn.i)
      cn.hgt = cn.heavy ? 150 : clamp(90 + (cn.from[1] - cn.to[1]) * 0.18, 80, 200)
      // the arc's top (coin included) stays under the column heads: a coin never flies across a label
      const ceil = headBottom + 10 + cn.r
      for (let k = 0; k < 40 && cn.hgt > 0; k++) {
        let top = Infinity
        for (let q = 0; q <= 1; q += 0.05) top = Math.min(top, arc(q, cn.from, cn.to, cn.hgt)[1])
        if (top >= ceil) break
        cn.hgt = Math.max(0, cn.hgt - 8)
      }
    }
    figSeek = t => {
      const Jt = J(t)
      let sq = { sx: 1, sy: 1 }
      for (const hp of hops) { const s2 = squashAt(t, hp.t0 + hp.dur, 0.18); sq = { sx: sq.sx * s2.sx, sy: sq.sy * s2.sy } }
      for (const b of buckles) { const s2 = squashAt(t, b, 0.12); sq = { sx: sq.sx * s2.sx, sy: sq.sy * s2.sy } }
      fig.draw(Jt, sq)
      for (const cn of coins) {
        let x = 0, y = 0, op = 1, scl = 1, spin = 0, rot = 0
        if (t < cn.a) op = 0
        else if (t < cn.rel) {
          const pp = popIn(t, cn.a, 0.18, 0.4);[x, y] = inHand(Jt, cn); scl = pp.scale; op = pp.opacity
          if (cn.heavy) rot = wobble(t, cn.a, 6, 3, 2)
        } else if (t < cn.land) {
          const p = prog(t, cn.rel, cn.land - cn.rel);[x, y] = arc(E.inOutSine(p * 0.85 + 0.15 * p * p), cn.from, cn.to, cn.hgt)
          spin = Math.abs(Math.sin(p * Math.PI * (cn.heavy ? 1.5 : 2.5)))
          rot = p * (cn.heavy ? 200 : 320)
        } else { const p = prog(t, cn.land, 0.06);[x, y] = cn.to; scl = 1 + 0.6 * p; op = 1 - p }
        cn.c.set({ x, y, r: cn.r * scl, opacity: op, spin: spin * 0.85, rot })
      }
    }
  }

  // ---------------- climb mode: level(t) = the rung the top hand holds (fractional while climbing; -1 before)
  const D = times.map((T0, i) => (i ? Math.min(0.55, 0.75 * (T0 - times[i - 1])) : Math.min(0.55, Math.max(0.25, T0 - 0.5))))
  const level = t => { let v = -1; for (let i = 0; i < N; i++) v += E.inOut(prog(t, times[i] - D[i], D[i])); return v }
  if (showFig && climb) {
    const k = FIGK
    // staircase: a hand (parity 0 = right, 1 = left) rests on rung 2*floor(u)+p and moves up 2 rungs during the
    // second half of each 2-level period, i.e. while the body climbs toward the rung that hand is about to slap.
    const stair = (lv, p) => { const u = (lv - p) / 2, f = Math.floor(u), fr = u - f; return 2 * f + p + 2 * smooth(clamp((fr - 0.5) * 2)) }
    const frac1 = x => ((x % 1) + 1) % 1
    const FOOT = Math.max(2, Math.round((legLen * 0.9 + HIP_DROP - 20) / pitch))   // rungs between hands and feet
    const grip = (r, side) => [side > 0 ? RAIL[1] - 7 : RAIL[0] + 7, shelfY(r)]
    const climbJ = t => {
      const lv = level(t)
      const sway = 5 * Math.sin(lv * Math.PI)
      const hip = [CX + sway, Math.min(L.floorY - legLen * 0.9, shelfY(lv) + HIP_DROP)]
      const nk = [hip[0] + 2, hip[1] - RIG.torso * k], sh = [hip[0] + 1.6, hip[1] - RIG.torso * k * RIG.shoulder]
      const head = [nk[0] + 2, nk[1] - (RIG.headR + RIG.neck) * k]
      const J = { hip, nk, sh, head, eF: sh, hF: sh, eB: sh, hB: sh, kF: hip, fF: hip, kB: hip, fB: hip,
        R: RIG.headR * k, k, sw: figStroke(k) / 2, face: 1, headRot: -14 + 6 * Math.sin(lv * Math.PI * 2), sx: 1, sy: 1, ground: L.floorY }
      // hands: right on even rungs, left on odd ones; they bulge outward while travelling
      const hr = stair(lv, 0), hlv = stair(lv, 1)
      const bR = Math.sin(Math.PI * frac1(hr)), bL = Math.sin(Math.PI * frac1(hlv))
      const gR = grip(hr, 1), gL = grip(hlv, -1)
      gR[0] += 22 * bR; gR[1] -= 10 * bR; gL[0] -= 22 * bL; gL[1] -= 10 * bL
      // feet: opposite to the hands, a beat later, FOOT rungs lower; the floor below the first rungs
      const fy = r => Math.min(L.floorY - J.sw, shelfY(r) - 4)
      const fr = stair(lv - 0.25, 1) - FOOT, fl = stair(lv - 0.25, 0) - FOOT
      const bfr = Math.sin(Math.PI * frac1(fr)), bfl = Math.sin(Math.PI * frac1(fl))
      const fR = [CX + 24 + 16 * bfr, fy(fr) - 14 * bfr], fL = [CX - 24 - 16 * bfl, fy(fl) - 14 * bfl]
      pinLimb(J, 'hF', gR, -1); pinLimb(J, 'hB', gL, 1); pinLimb(J, 'fF', fR, 1); pinLimb(J, 'fB', fL, -1)
      // a knee never pokes out past a rail: fold it the other way when it would
      if (J.kB[0] < RAIL[0] - 4) pinLimb(J, 'fB', fL, 1)
      if (J.kF[0] > RAIL[1] + 4) pinLimb(J, 'fF', fR, -1)
      return J
    }
    const tr0 = poseTrack(intro)
    const t0c = times[0] - D[0]                          // the climb starts
    const tEnd = lastT + 0.3                             // let go with one hand: fist pump
    figSeek = t => {
      let J
      const stand = () => fk(secondary(tr0.at(t), t, { prev: tr0.at(t - 0.07) }), { x: CX - 2, ground: L.floorY, scale: k })
      if (t < t0c - 0.3) J = stand()
      else if (t < t0c) J = blendJ(stand(), climbJ(t), E.inOut(prog(t, t0c - 0.3, 0.3)))
      else J = climbJ(t)
      if (hl && t > tEnd) {
        // the hand that did not slap the top rung lets go and punches up and out; one leg kicks out
        // the hand that did not slap the top rung lets go and punches up and OUT (clear of his head, elbow to the
        // outside); both feet stay on their rungs
        const p = E.snap(prog(t, tEnd, 0.35))
        const freeR = (N - 1) % 2 === 1                  // the right hand is free when the left slapped the top rung
        const fist = [J.sh[0] + (freeR ? 1 : -1) * (100 * k / 1.1), J.sh[1] - 44 * k / 1.1 + 6 * Math.sin((t - tEnd) * 6)]
        const cur = freeR ? J.hF : J.hB
        pinLimb(J, freeR ? 'hF' : 'hB', [lerp(cur[0], fist[0], p), lerp(cur[1], fist[1], p)], freeR ? -1 : 1)
      }
      fig.draw(J)
    }
    times.forEach((T0, i) => { if (i !== N - 1 || !hl) fxk.impact(T0, { x: grip(i, i % 2 ? -1 : 1)[0], y: shelfY(i), r: 22, lines: 7, shake: 0, cue: null }) })
    ctx.cue(Math.max(0.05, t0c), 'step', { gain: 0.5 })
  }

  // camera (climb): the newest rung rides ~40% down the viewport; at the end the top row sits just under the heads
  const camY = t => {
    if (!climb) return 0
    const lv = Math.max(0, level(t))
    const vH = VP[1] - VP[0]
    // where the top rung ends up: its whole row (and the gold plate) just under the heads
    const endY = VP[0] + GAP + worthPx * (hl ? HLS : 1) + (hl ? PLATE_PAD[1] + 6 : 0) + 30
    const frac = lerp(0.4, (endY - VP[0]) / vH, smooth(clamp((lv - (N - 4)) / 3)))
    const ty = Math.max(0, VP[0] + frac * vH - shelfY(lv))
    return Math.min(ty, Math.max(0, endY - shelfY(N - 1)))
  }
  // climb, opt-in (lookOpts.establish): open on the whole ladder towering over him, push in before the first rung.
  // Off by default: in the wide shot the rung labels are too small to read, so frame 1 would lose its numbers.
  const Z0 = climb ? Math.min(1, (L.floorY - VP[0] - 26) / (L.floorY - ladTop)) : 1
  const pushT = [0.3, Math.min(times[0] - 0.2, 1.3)]
  const wide = climb && Z0 < 0.9 && pushT[1] - pushT[0] >= 0.5 && lo.establish === true
  const camZ = t => (wide ? lerp(Z0, 1, E.inOut(prog(t, pushT[0], pushT[1] - pushT[0]))) : 1)

  // ================================================================== seek
  // once the verdict relights the row that answers the hook, the gold plate steps back (grey border, paler fill):
  // the relit row is the one focal point of the end hold
  const quietT = hl ? Math.min(...relightT.filter((x, i) => x != null && i !== N - 1)) : Infinity
  const coinRGB = hex(C.coin).join(',')
  const reachY = t => {
    let y = L.floorY
    for (let i = 0; i < N; i++) y = lerp(y, shelfY(i), E.inOut(prog(t, times[i] - 0.25, 0.3)))
    return lerp(y, ladTop, E.out(prog(t, lastT + 0.05, 0.3)))
  }
  const duration = durationOf(spec, lastT + (hl ? 1.0 : 0.4), hold)

  function seek(t) {
    const ty = camY(t), z = camZ(t)
    const scr = yw => L.floorY + z * (yw - L.floorY) + ty          // world y -> screen y (climb camera)
    const ZX = (RAIL[0] + XR) / 2                                  // the push-in is centred on the table
    // in climb mode rows fade out at the viewport edges (nothing readable is ever half clipped), and stay hidden
    // in the establishing shot until the push-in makes them legible
    const zoomA = z >= 0.999 ? 1 : clamp((z * yearPx - 40.5) / 6)
    const vis = (yTop, yBot) => (climb ? clamp((scr(yTop) - VP[0]) / 22) * clamp((VP[1] - scr(yBot)) / 22) * zoomA : 1)
    const ry = reachY(t)
    for (const r of inkLad.rails) { attr(r, 'y2', ry.toFixed(1)); attr(r, 'opacity', L.floorY - ry > 3 ? '1' : '0') }
    for (const f of inkFill) attr(f.el, 'opacity', ry <= f.y + 1 ? '1' : '0')
    for (let i = 0; i < N; i++) {
      const row = R[i], Tl = row.t
      const next = i < N - 1 ? times[i + 1] : Infinity
      const isPlate = row.last && hl
      const a = vis(baseY(i) - worthPx * (isPlate ? HLS : 1) - (isPlate ? PLATE_PAD[1] + 6 : 0), shelfY(i) + 8)
      const rl = relightT[i] != null && t >= relightT[i] ? relightT[i] : null      // relit: green again, with a bump
      const rb = rl != null ? 1 + (relitBox[i] ? 0.06 : 0.1) * bump(t, rl, 0.4) : 1
      // an impact beat swells the hero (anchored right) for 0.5 s
      const ik = 1 + (IMPACT_K - 1) * Math.max(0, ...impactT[i].map(x => bump(t, x, 0.5)))
      row.year.set({ x: xYear, y: boxBottom(i, yearPx), sx: rb, sy: rb, color: rl != null ? mix(C.ink, C.heroInk, prog(t, rl, 0.12)) : mix(C.dim, C.ink, prog(t, Tl - 0.2, 0.2)), opacity: a })
      const pin = prog(t, Tl - 0.2, 0.2)
      row.inv.set({ x: xIn, y: boxBottom(i, inPx) - 16 * (1 - E.out(pin)), opacity: (pin <= 0 ? 0 : clamp(pin * 1.6)) * a })
      // worth: drops the last few px onto the shelf, squashes, settles; green while it is the newest
      // (a row timed at t <= 0 has already landed on frame 1: settled, not caught mid-squash on the cover frame)
      const pre = Tl <= 0
      const f = pre ? { y: 0 } : fall(t, Tl - dropDur, DROP, { e: 0.3, n: 2 })
      const sq = pre ? { sx: 1, sy: 1 } : squashAt(t, Tl, (isPlate ? 0.6 : 1) * squashAmt)
      const sc = isPlate ? HLS : 1
      row.worth.set({
        x: xWorth, y: boxBottom(i, worthPx) - f.y, sx: sc * sq.sx * rb * ik, sy: sc * sq.sy * rb * ik,
        opacity: (t >= Tl - 0.06 ? clamp((t - (Tl - 0.06)) / 0.03) : 0) * a,
        // (it settles to ink as the next row lands; before an impact row it is ink by the time that row lands, so
        // the impact's number is the only green one on screen)
        color: isPlate ? C.ink : rl != null ? mix(C.ink, C.heroInk, prog(t, rl, 0.12))
          : mix(C.ink, C.heroInk, 1 - (i < N - 1 && impactT[i + 1].length ? prog(t, next - 0.1, 0.1) : prog(t, next, 0.3))),
      })
      if (relitBox[i]) {
        const bx = relitBox[i], pp = popIn(t, rl ?? Infinity, 0.3, 0.9)
        style(bx.el, { transform: `translate(${bx.x0.toFixed(1)}px,${bx.y0.toFixed(1)}px) scale(${pp.scale.toFixed(3)})`, opacity: String(pp.opacity * a) })
      }
      if (isPlate && plate) {
        const pp = popIn(t, Tl - 0.01, 0.3, 0.55)
        const qp = prog(t, quietT, 0.3)
        style(plate, {
          transform: `translate(${pb.x.toFixed(1)}px,${(pb.y - f.y * 0.5).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
          opacity: t < Tl - 0.01 ? '0' : String(a),
          background: `rgba(${coinRGB},${(1 - 0.45 * qp).toFixed(3)})`, borderColor: mix(C.ink, C.grey, qp),
        })
      }
      if (showBars) {
        const pm = E.inOut(prog(t, Tl + 0.1, 0.55))
        const my = shelfY(i) + 3 + (isPlate ? Math.max(0, pb.y + pb.h + barW / 2 + 5 - shelfY(i) - 3) : 0)   // clear the plate
        if (meterMode === 'target' && isPlate) {
          // (the plate row has no gauge: the gold plate already says "reached", and a gauge under it would sit on the
          // row below)
          tracks[i].set({ opacity: 0 }); barsIn[i].set({ opacity: 0 }); barsGrow[i].set({ opacity: 0 }); attr(ticks[i], 'opacity', '0')
        } else if (meterMode === 'target') {
          // a gauge to the target: grey to hero ÷ target (never shorter than FILL_MIN); a row that reaches it snaps
          // green, with a pulse, as it fills. The track ends in an upright tick: "up to here = the target"
          const f = Math.min(1, reach[i]), done = reach[i] >= 1 && pm >= 0.999
          // (a relit row's plate rides on its own gauge line and the one over it: those two gauges and their ticks
          // hand over to its edges as it pops in, so its border is one even weight and its corners stay clean)
          const boxed = [relitBox[i] && relightT[i], i > 0 && relitBox[i - 1] && relightT[i - 1]].filter(x => x != null && x !== false)
          const op = prog(t, Tl, 0.12) * (1 - Math.max(0, ...boxed.map(x => prog(t, x + 0.1, 0.2))))
          tracks[i].set({ x0: M0, x1: XR, y: my, opacity: op })
          barsIn[i].set({ x0: M0, x1: done ? M0 : M0 + Math.max(f < 1 ? FILL_MIN : 0, meterW * f) * pm, y: my, opacity: op })
          barsGrow[i].set({ x0: M0, x1: done ? XR : M0, y: my, opacity: op })
          const rl = relightT[i]
          const pulse = bump(t, Tl + 0.65, 0.3) + (rl != null && !relitBox[i] ? bump(t, rl, 0.45) : 0)
          attr(barsGrow[i].el, 'stroke-width', (barW * (1 + 0.7 * pulse)).toFixed(2))
          const tickOp = op
          attr(ticks[i], 'x1', TICK.x.toFixed(1)); attr(ticks[i], 'x2', TICK.x.toFixed(1))
          attr(ticks[i], 'y1', (my - TICK.up).toFixed(1)); attr(ticks[i], 'y2', (my + TICK.down).toFixed(1))
          attr(ticks[i], 'stroke', done ? C.hero : C.grey)
          attr(ticks[i], 'opacity', tickOp.toFixed(3))
        } else {
          const xs = M0 + meterW * clamp(vals[i].inN / vals[i].worthN), x1 = M0 + meterW * pm
          barsIn[i].set({ x0: M0, x1: Math.min(x1, xs), y: my })
          barsGrow[i].set({ x0: xs, x1: Math.max(xs, x1), y: my })
        }
        attr(guides[i], 'x2', String(lerp(XR, M0 - 16, E.inOut(prog(t, Tl + 0.1, 0.3)))))
      }
      attr(guides[i], 'opacity', String(1 - 0.5 * prog(t, Tl, 0.4)))
      attr(inkLad.rungs[i], 'opacity', String(prog(t, Tl - 0.08, 0.1)))
      attr(inkLad.rungs[i], 'stroke-width', (S.rung * (1 + 0.6 * Math.sin(Math.PI * prog(t, Tl - 0.08, 0.3)))).toFixed(2))
    }
    // tags (beats with a label): dropped over the empty slot above the row's hero, pointing down at it
    for (const { b, n } of tags) {
      const hb = heroBox(b.row)
      // (an impact beat's tag waits until its burst has faded, so the hit lines never show through it as it fades in)
      const t0 = b.t + (b.impact ? 0.24 : 0.08), t1 = b.t + b.d
      if (t < t0 || t >= t1) { n.set({ opacity: 0 }); continue }
      // (a drop, a fade and the overshoot of a pop, never below scale 1: the tag is never under 40 px)
      const pp = popIn(t, t0, 0.22, 0.82), sc = Math.max(1, pp.scale)
      const lift = 0.87 * worthPx * (IMPACT_K - 1) * Math.max(0, ...impactT[b.row].map(x => bump(t, x, 0.5)))
      n.set({ x: xWorth + 4, y: hb.top - 16 - lift - 10 * (1 - E.out(prog(t, t0, 0.2))), sx: sc, sy: sc,
        opacity: pp.opacity * (1 - prog(t, t1 - 0.15, 0.15)), color: b.tone === 'bad' ? C.red : C.hero })
    }
    // working lines: one at a time; a hard swap (never a blank frame, never shrunk below 40 px) with a short
    // 12 px slide in from the right, so it never crosses x 60 (a line at t <= 0 is up at frame 1)
    let wk = -1
    for (let k = 0; k < WL.length; k++) if (t >= WL[k].t) wk = k
    workEls.forEach((el, k) => {
      if (k !== wk) { style(el, { opacity: '0' }); return }
      const dx = WL[k].t <= 0 ? 0 : 12 * (1 - E.out(prog(t, WL[k].t, 0.14)))
      style(el, { opacity: '1', transform: `translateX(${dx.toFixed(1)}px)` })
    })
    if (showFig) figSeek(t)
    for (const sp of spill) {
      if (t < sp.t0) { sp.c.set({ opacity: 0 }); continue }
      const [x, y, rr] = toss(t, sp.t0, sp.p0, sp.v, { r: sp.r, g: 3400, e: 0.42, friction: 0.55, n: 3 })
      sp.c.set({ x, y, r: sp.r, rot: rr * 57, opacity: x > 1080 + sp.r || x < -sp.r ? 0 : 1, spin: 0.15 * Math.abs(Math.sin(rr)) })
    }
    const { shake, zoom } = fxk.seek(t)
    if (z < 0.999) cam.set({ fx: ZX, fy: L.floorY, x: ZX, y: L.floorY, zoom: z, shake })   // zoom about the table's foot
    else cam.set({ fx: pb.cx, fy: pb.cy + ty, x: pb.cx, y: pb.cy, zoom, shake })                      // punch about the plate
  }

  return { duration, seek }
}
