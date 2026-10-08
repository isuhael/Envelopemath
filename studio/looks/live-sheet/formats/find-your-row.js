// live-sheet · find-your-row (P7): one row per kind of viewer, denser than one pass can read.
//
// Frame 1: the question card, the formula bar mid-typing, every row's key (column A) already in place so each
// viewer can find their row, output cells empty except the first row (lookOpts.prefill rows, and any row with
// t <= 0, are pre-filled: a money answer at 0.0 s).
// Then the fill handle drags down the output columns and each row's values drop in with a highlight flash;
// the biggest result counts up if it lands after frame 1. A pick lights its row and puts a selection on its result:
// the old selection fades out where it is and the new one lands on the cell (a cross-fade, so the blue outline never
// slides across the figures in between). Its tooltip floats over the row under it: that row fades out as the pill
// wipes out of its notch, in the same frames, so nothing reflows and no empty row ever shows (a long label fits down
// to 40 px, then takes two lines and covers two rows). A pick named in lookOpts.compare is drawn instead as a bracket
// from a reference row to the picked row, beside the keys, with its label on the bracket; the reference row stays
// tinted while it shows. At the verdict the result column flashes top to bottom and the bar rewrites to the shortcut
// (lookOpts.shortcut, or the verdict's formula-like part) while the verdict lands as a card in the caption band, as
// wide as the sheet: a `\n` in the verdict is its line break, and its **emphasis** is set large (84 px or more) on
// its line, the rest at the kicker size; or the verdict itself is retyped into the formula bar (Inter 800).
// The last 0.5 s clears back to the frame-1 state so the short loops.
//
// Cells: the kit's cellSizes() scales type with a 102 px row and floors at 40 px, which leaves a dense table's
// figures small on ~60 px rows. Here the cells are set to what the row holds (input ≈ 0.84, middle ≈ 0.78, result
// ≈ 0.9 of the row, never above the full-size 56 / 52 / 60), and the sheet is re-planned at that size.
//
// Layout is planned before it is kept: the sheet is built and measured, and when it does not end above its budget
// (the caption band with captions or a band verdict, else y 1476) it gives way in order: the A B C row and 22 px
// padding (to 12), then rows down to 46 px (the text is at the 40 px floor by then), then the picks' tooltips (their
// labels are typed into the formula bar instead), and last the band: captions off, the verdict retyped into the bar.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//           · emphTone ('good'; a 'goal' column is ink with the yellow on its biggest cell) · formulaAt0 (0.7)
//           · prefill (1: rows already filled at frame 1, whatever rowsT says) · pickStyle ('auto' | 'tip' | 'bar')
//           · formulaBar ([{ t, text }]: the bar's working over time; default data.formula from 0)
//           · shortcut (string or { t, text }: the bar's rewrite at the verdict; default the verdict's formula part,
//             false for none)
//           · compare ([{ pick, from }]: pick number `pick` (its index in data.pick) is drawn as a bracket from row
//             `from` to its own row, its label on the bracket; row `from` stays tinted while it shows)
//           · cellBoost (true: cells sized to the row, see above)
import {
  h, s, setStyle, clamp, prog, ease, C, G, M, S,
  sheet, fitTips, tipWindow, mk, mkLen, wordCut, countText, displayValue, textW, font,
  flashAlpha, durationOf, hasCaptions, opt, layer, footerHeight,
  toneColor, toneFill, hasUnits, barScript, shortcutOf, fitWarn, snapIn, verdictCard as libVerdictCard,
} from '../lib.js'

export const css = `
.fyr-cover { position: absolute; left: 0; top: 0; height: 0; opacity: 0; border-bottom: 2px solid #E4E7EC; }
.fyr-brk { position: absolute; left: 0; top: 0; overflow: visible; }
.fyr-bpill { position: absolute; display: flex; align-items: center; justify-content: center; background: #101828;
  border-radius: 14px; opacity: 0; box-sizing: border-box; padding: 0 14px; }
.fyr-bpill .ls-tiptxt { font-size: 40px; }
.fyr-v { position: absolute; background: #FFFFFF; border-radius: 22px; box-sizing: border-box; opacity: 0;
  display: flex; flex-direction: column; justify-content: center; transform-origin: 50% 50%; }
.fyr-vl { font: 800 48px/1.08 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.015em; white-space: nowrap;
  display: flex; align-items: center; }
.fyr-vl.punch { display: block; line-height: 1.04; }
.fyr-vl.punch em { font-size: var(--big, 84px); letter-spacing: -0.025em; line-height: 1; }
.fyr-vl em {
  background-image: linear-gradient(#FFD60A, #FFD60A); background-repeat: no-repeat; background-size: var(--hl, 100%) 1.02em;
  background-position: 0 55%; border-radius: 8px; padding: 0 0.08em; -webkit-box-decoration-break: clone; box-decoration-break: clone;
}
.fyr-vl u.mark2 { color: #D92D20; }
.fyr-vchip { position: relative; left: auto; top: auto; transform: none; flex: none; width: 52px; height: 48px; border-radius: 12px;
  font-size: 38px; margin-right: 18px; }
`

export default function findYourRow(spec, ctx) {
  const d = spec.data || {}
  const columns = d.columns || []
  const rows = d.rows || []
  const N = rows.length
  const nC = columns.length
  let emphCol = columns.findIndex(c => c.emph)
  if (emphCol < 0) emphCol = nC - 1
  const outC0 = Math.min(1, nC - 1), outC1 = nC - 1

  // ---------- timing ----------
  const rowsT = d.rowsT ?? 0.4, every = d.rowEvery ?? 0.25
  const rowT = rows.map((_, i) => (d.rowT && d.rowT[i] != null ? d.rowT[i] : rowsT + i * every))
  // frame 1 always has a money answer: the first row(s) are already filled (the look's "row 2 is filled" rule)
  const prefill = Math.max(0, Math.floor(+opt(spec, 'prefill', 1) || 0))
  for (let i = 0; i < Math.min(prefill, N); i++) rowT[i] = Math.min(rowT[i], 0)
  // picks keep their spec index (lookOpts.compare names them by it)
  const picks = (d.pick || []).map((p, k) => (p ? { ...p, k } : null)).filter(p => p && p.row >= 0 && p.row < N).sort((a, b) => a.t - b.t)
  const cmpOpt = opt(spec, 'compare', [])
  const compareOf = p => {
    const c = (Array.isArray(cmpOpt) ? cmpOpt : []).find(x => x && +x.pick === p.k && x.from >= 0 && x.from < N && +x.from !== p.row)
    return c ? +c.from : null
  }
  picks.forEach(p => { p.from = compareOf(p) })
  const tipPicks = picks.filter(p => p.from == null)
  const brkPicks = picks.filter(p => p.from != null)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const loopOn = opt(spec, 'loop', true)
  const capsWanted = hasCaptions(spec)

  // the biggest result counts up (only if it lands after frame 1)
  let countIdx = -1
  if (opt(spec, 'countUp', true)) {
    let best = -Infinity
    rows.forEach((r, i) => { const v = displayValue(r[emphCol]); if (v > best) { best = v; countIdx = i } })
    if (countIdx >= 0 && rowT[countIdx] <= 0) countIdx = -1
  }
  const landEnd = i => rowT[i] + (i === countIdx ? M.count : M.drop) + 0.08 * (nC - 1)

  // ---------- the formula bar's entries ----------
  const formula = d.formula || ''
  let fe0 = opt(spec, 'formulaBar', null)
  if (typeof fe0 === 'string') fe0 = [{ t: 0, text: fe0 }]
  fe0 = (Array.isArray(fe0) ? fe0 : []).filter(e => e && e.text).map(e => ({ t: Number.isFinite(+e.t) ? +e.t : 0, text: String(e.text) }))
  if (!fe0.length || fe0[0].t > 0) fe0.unshift({ t: 0, text: formula || ' ' })
  // the payoff rewrite: the shortcut the verdict states ("≈ hourly × 52"), typed as the column flashes
  const scOpt = opt(spec, 'shortcut', null)
  const scText = scOpt === false ? null : scOpt ? (typeof scOpt === 'string' ? scOpt : scOpt.text) : verdict ? shortcutOf(verdict.text) : null
  const scT = scOpt && Number.isFinite(+scOpt.t) ? +scOpt.t : verdict ? verdict.t + 0.12 : null
  const pickAt = p => p.t + 0.1

  // ---------- bracket picks: the pill's width, and the key column's room for it ----------
  // (the pill sits at the card's left edge, over the gutter; the bracket's line runs under it, its ticks reach the keys)
  const BRK = { px: S.cellMin, padX: 13, pillX: 6, lineX: 14, gap: 10 }
  const brkW = brkPicks.map(p => Math.ceil(textW(mk(p.label || ''), font(800, BRK.px), { letterSpacing: '-0.01em' })) + 2 * BRK.padX + 4)
  const brkPillW = brkW.length ? Math.max(...brkW) : 0

  // ---------- layout: build, measure, give way until it fits ----------
  const fH = footerHeight(spec.footer)
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const vOpt = opt(spec, 'verdict', 'auto')
  const pickOpt = opt(spec, 'pickStyle', 'auto')
  const lettersOpt = opt(spec, 'letters', 'auto')
  const boostOn = opt(spec, 'cellBoost', true) !== false
  const tipW = G.width - G.gutter - 24
  const tipFit0 = fitTips(tipPicks.map(p => p.label || ''), tipW)
  const pickModes = !tipPicks.length ? ['none'] : pickOpt === 'bar' ? ['bar'] : pickOpt === 'tip' ? ['tip'] : ['tip', 'bar']
  const tiers = band => [
    { letters: lettersOpt, minRowH: band ? 50 : 48 },
    { letters: lettersOpt === true ? true : false, pad: 12, minRowH: band ? 50 : 48 },
    { letters: lettersOpt === true ? true : false, pad: 12, minRowH: 46 },
  ]
  const plans = []
  // with the band: captions (if any) and a band verdict; picks keep their tooltips as long as any tier fits
  if (capsWanted || (verdict && vOpt !== 'formula')) {
    for (const pm of pickModes) for (const tier of tiers(true)) plans.push({ ...tier, pm, band: true, caps: capsWanted, vMode: verdict ? (vOpt === 'formula' ? 'formula' : 'band') : 'none' })
  }
  // without it: silent, the verdict retyped into the formula bar, the sheet down to y 1476
  for (const pm of pickModes) for (const tier of tiers(false)) plans.push({ ...tier, pm, band: false, caps: false, vMode: verdict ? 'formula' : 'none' })

  const L = layer(ctx, 'fyr')
  const barStrings = pm => [...fe0.map(e => e.text), ...(scText ? [scText] : []), ...(pm === 'bar' ? tipPicks.map(p => p.label || '') : [])]
  // a bracket's pill sits in the gutter and the key column's empty left side: the key column keeps that room
  // (key column: the pill reaches pillX + width - gutter into it, then a gap, then the right-aligned keys at full size)
  const keyValW = Math.max(0, ...rows.map(r => textW(String(r[0] ?? ''), font(800, S.input), { letterSpacing: '-0.01em' })))
  const keyMinW = pad => (brkPicks.length ? Math.ceil(Math.max(BRK.lineX + 20, BRK.pillX + brkPillW - G.gutter) + BRK.gap + keyValW + (pad ?? G.padX)) : 0)
  // tooltips float over the row under the pick, so the card plans no slot: tail = a little air above the corner
  const build = (plan, px) => {
    L.replaceChildren()
    return sheet(L, {
      columns: columns.map((c, j) => ({
        label: c.label, kind: j === 0 ? 'input' : j === emphCol ? 'output' : 'mid',
        tone: j === emphCol ? (c.tone || opt(spec, 'emphTone', 'good')) : c.tone,
        units: rows.some(r => hasUnits(r[j] ?? '')), // "11 yrs 5 mo": the numbers keep the size, the words drop to 40 px
        ...(px ? { px: px[j] } : {}),
        ...(j === 0 && keyMinW(plan.pad) ? { minW: keyMinW(plan.pad) } : {}),
      })),
      values: rows, rows: N, tail: 12,
      bottom: plan.band ? bandBottom : fullBottom, minRowH: plan.minRowH, pad: plan.pad,
      formula: { strings: barStrings(plan.pm), verdict: plan.vMode === 'formula' ? verdict.text : null },
      letters: plan.letters,
    })
  }
  const fits = (s0, plan) => s0.maxBottom <= (plan.band ? bandBottom : fullBottom) + 1
  let sh = null, P = null, boosted = false, boostPx = null
  for (const plan of plans) {
    sh = build(plan, null)
    P = plan
    if (fits(sh, plan)) break
  }
  // cells sized to the row they sit in (the kit's floor-at-40 scale leaves ~60 px rows with 40 px figures); re-planned
  // until the row height settles, and kept only when the sheet still fits
  if (boostOn && fits(sh, P)) {
    // (never more than rh / 1.12: a figure's text box, ~1.2 em, stays within its row and its neighbours')
    const sizeFor = (rh, fs) => columns.map((c, j) => {
      const kind = j === 0 ? 'input' : j === emphCol ? 'output' : 'mid'
      const [k, cap, base] = kind === 'input' ? [0.84, S.input, fs.input] : kind === 'output' ? [0.9, S.result, fs.result] : [0.78, S.mid, fs.mid]
      return clamp(Math.min(Math.round(rh * k), Math.floor(rh / 1.12)), base, cap)
    })
    // every value fits its column at that size (a sheet that had to squeeze its columns is left alone)
    const valuesFit = (s2, px) => columns.every((c, j) => {
      const col = s2.cols[j], room = col.w - col.pad - col.padR
      return rows.every(r => !r[j] || hasUnits(r[j] ?? '') || textW(String(r[j]), font(j === 0 || j === emphCol ? 800 : 700, px[j]), { letterSpacing: '-0.01em' }) <= room + 0.5)
    })
    // the A B C row is decoration: bigger figures come first. Both cell paddings are tried (22 px, then 12 px, which
    // leaves right-aligned figures the room they need); the larger figures win, the 22 px padding on a tie
    const base = P.letters === 'auto' ? { ...P, letters: false } : P
    const cands = base.pad == null ? [base, { ...base, pad: 12 }] : [base]
    let best = null
    for (const PB of cands) {
      const s0 = build(PB, null) // the tallest rows the labels allow (cells at the kit's own size)
      if (!fits(s0, PB)) continue
      // the largest row height whose cells, set to it, keep the labels on as few lines and leave the rows that tall
      // (a wider column that pushes a label onto another line shortens the rows: that size is too big)
      for (let rh = s0.rowH; rh >= Math.max(PB.minRowH ?? 46, sh.rowH); rh -= 1) {
        if (best && rh <= best.rh) break
        const px = sizeFor(rh, s0.fs)
        const s2 = build(PB, px)
        if (fits(s2, PB) && s2.rowH >= rh - 1 && s2.labelH <= s0.labelH + 1 && valuesFit(s2, px)) { best = { rh, px, PB }; break }
      }
    }
    if (best) { P = best.PB; boostPx = best.px; sh = build(P, boostPx); boosted = true } else sh = build(P, null)
  }
  // `__x__` in a column label is the look's red (README §1: "`__x__` is red" everywhere). style.css colours it in the
  // banner, captions, tooltips and verdict but has no rule for the header cells (.ls-hl / .ls-hsub), so a label like
  // "__What you think__" read in ink; the label colours it here (local fix; the shared rule belongs in style.css)
  for (const el of sh.labelEls) for (const u of el.querySelectorAll('u.mark2')) setStyle(u, { color: C.bad })
  fitWarn('find-your-row', sh.maxBottom + (fH ? G.gap + fH : 0), P.band ? G.workBottom : G.safeBottom - 4)
  if (capsWanted && !P.caps) console.warn('live-sheet find-your-row: too dense for captions; running silent with the verdict in the formula bar')
  // a tooltip floats over the rows next to its own: when a long label needs more rows than the table has on either
  // side, the picks are typed into the formula bar instead (the row still lights up)
  if (P.pm === 'tip') {
    const nCover = Math.max(1, Math.ceil((tipFit0.lines * tipFit0.px * 1.08 + 6) / sh.rowH))
    if (tipPicks.some(p => p.row + nCover > N - 1 && p.row - nCover < 0)) { P = { ...P, pm: 'bar' }; sh = build(P, boosted ? boostPx : null) }
  }
  const caps = P.caps, vMode = P.vMode, pickMode = P.pm
  const tipFit = pickMode === 'tip' ? tipFit0 : fitTips([], tipW)

  const emphTone = columns[emphCol]?.tone || opt(spec, 'emphTone', 'good')
  const emphColor = toneColor(emphTone)
  const emphFill = toneFill(emphTone)
  // a 'goal' column is ink; only its biggest cell gets the yellow (one accent, one answer)
  let goalIdx = -1
  if (emphFill !== 'transparent') {
    let best = -Infinity
    rows.forEach((r, i) => { const v = displayValue(r[emphCol]); if (v > best) { best = v; goalIdx = i } })
  }

  // ---------- the bar's script: the working, picks typed in (bar mode), the shortcut or the verdict ----------
  const fe = fe0.slice()
  if (pickMode === 'bar') tipPicks.forEach(p => fe.push({ t: pickAt(p), text: p.label || '', pick: true }))
  if (vMode === 'formula') fe.push({ t: verdict.t + 0.16, text: sh.fbar.vfit.text, verdict: true })
  else if (scText && Number.isFinite(scT)) fe.push({ t: scT, text: scText, shortcut: true })
  const cut0 = wordCut(fe0[0].text, opt(spec, 'formulaAt0', 0.7))
  const cut = cut0 < 4 ? mkLen(fe0[0].text) : cut0
  const bar0 = barScript(fe, { cut })
  const vEntry = bar0.fx.find(e => e.verdict)
  const scEntry = bar0.fx.find(e => e.shortcut)
  // the working's own steps and the picks typed into the bar are beats; the verdict (or the shortcut typed with it)
  // stays readable 2.5 s once typed (durationOf's verdict rule)
  const beats = [...rows.map((_, i) => landEnd(i)), ...picks.map(p => p.t + M.pick)]
  const vEnd = vEntry ? vEntry.end : scEntry && verdict ? scEntry.end : null
  const barHold = Math.max(0, ...bar0.fx.filter(e => !e.verdict && !e.shortcut && e.t > 0).map(e => e.end + 1.5 + (loopOn ? M.loopOut : 0)))
  const duration = Math.max(durationOf(spec, { beats, hold: d.hold ?? 4, verdictEnd: vEnd, loop: loopOn }), Math.min(90, Math.round(barHold * 30) / 30))
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity
  const bar = barScript(fe, { cut, loopT0 })

  // ---------- pick windows ----------
  const pickWin = picks.map((p, i) => {
    const openAt = p.t + 0.12
    const next = picks[i + 1] ? picks[i + 1].t : verdict ? verdict.t : loopT0
    const hiEnd = picks[i + 1] ? picks[i + 1].t : loopT0
    return { openAt, closeAt: Math.min(next, loopT0), hiEnd, win: tipWindow(openAt, Math.min(next, loopT0)) }
  })

  // ---------- tooltips: a pill floating over the row(s) under its row (over the row above for the last row) ----------
  const tipH = Math.round(tipFit.lines * tipFit.px * 1.12 + 8)
  const coverN = Math.max(1, Math.ceil((tipFit.lines * tipFit.px * 1.08 + 6) / sh.rowH))
  const tips = pickMode !== 'tip' ? [] : tipPicks.map(p => {
    const i = tipFit.labels ? tipPicks.indexOf(p) : 0
    const below = p.row + coverN <= N - 1
    const r0 = below ? p.row + 1 : p.row - coverN
    const covered = Array.from({ length: coverN }, (_, k) => r0 + k).filter(r => r >= 0 && r < N)
    const cover = h('div', { class: 'fyr-cover', 'data-deco': '', style: { width: sh.w + 'px', backgroundImage: `linear-gradient(90deg, ${C.head} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter}px, ${C.sheet} ${sh.gutter}px)` } })
    const txt = h('div', { class: 'ls-tiptxt', html: tipFit.html[i], style: { fontSize: tipFit.px + 'px', ...(tipFit.wrap ? { whiteSpace: 'normal', textWrapStyle: 'balance' } : {}) } })
    const inner = h('div', { class: 'ls-tipin' }, txt)
    const pill = h('div', { class: 'ls-tip', 'data-roll': '' }, inner)
    const notch = h('i', { class: 'ls-notch' })
    sh.over.append(cover, notch, pill)
    const cell = sh.cellRect(p.row, emphCol)
    const wpx = tipFit.w[i] ?? tipW
    const x1 = Math.min(sh.x + sh.w - 12, Math.max(cell.x1 - 10, sh.x + sh.gutter + 12 + wpx))
    const x0 = Math.max(sh.x + sh.gutter + 12, x1 - wpx)
    const notchX = clamp((cell.x0 + cell.x1) / 2, x0 + 34, x1 - 34)
    const yTop = sh.rowTop(r0), ht = covered.length * sh.rowH
    const pillH = Math.min(ht - 6, tipH)
    const pillY = below ? yTop + Math.max(3, Math.round((ht - pillH) / 2 - 1)) : yTop + ht - Math.max(3, Math.round((ht - pillH) / 2 - 1)) - pillH
    setStyle(cover, { top: Math.round(yTop - sh.bodyTop) + 'px', height: ht + 'px' })
    setStyle(inner, { left: '0px', width: Math.round(x1 - x0) + 'px', height: Math.round(pillH) + 'px' })
    const pw = pickWin[picks.indexOf(p)]
    return { p, cover, pill, inner, txt, notch, covered, below, x0, x1, notchX, pillY, pillH, openAt: pw.openAt, closeAt: pw.closeAt, ok: pw.closeAt - pw.openAt > 0.45 }
  })
  const PARK = { opacity: '0', left: '0px', top: '0px', width: '0px', height: '0px' }
  const setTip = (tp, open, reveal) => {
    const ox = sh.x, oy = sh.bodyTop
    setStyle(tp.cover, { opacity: (open > 0.001 ? open : 0).toFixed(3) })
    const r = clamp(reveal)
    if (open <= 0.001 || r <= 0.001) {
      setStyle(tp.pill, PARK); setStyle(tp.notch, { opacity: '0', left: '0px', top: '0px' })
      return
    }
    // the pill wipes out of its notch (its width grows both ways) with its label already in place
    const nx = tp.notchX
    const l = Math.round(Math.max(tp.x0, nx - 20 - (nx - 20 - tp.x0) * r)), rr = Math.round(Math.min(tp.x1, nx + 20 + (tp.x1 - nx - 20) * r))
    setStyle(tp.pill, { opacity: '1', left: l - ox + 'px', top: Math.round(tp.pillY - oy) + 'px', width: rr - l + 'px', height: Math.round(tp.pillH) + 'px' })
    setStyle(tp.inner, { left: Math.round(tp.x0) - l + 'px' })
    const ny = tp.below ? tp.pillY - 9 : tp.pillY + tp.pillH - 13
    setStyle(tp.notch, { opacity: '1', left: Math.round(nx - 11 - ox) + 'px', top: Math.round(ny - oy) + 'px' })
  }

  // ---------- brackets: a reference row to the picked row, beside the keys, the label on the bracket ----------
  const brackets = brkPicks.map((p, bi) => {
    const a = Math.min(p.from, p.row), b = Math.max(p.from, p.row)
    const yOf = r => sh.rowTop(r) + sh.rowH / 2 - sh.bodyTop          // body-local
    const yp = yOf(p.row), yf = yOf(p.from), dir = yf < yp ? -1 : 1      // from the picked row toward the reference
    const keyCol = sh.cols[0]
    const keyPx = parseFloat(sh.cell(a, 0).el.style.fontSize) || sh.fs.input
    const keyTextL = r => keyCol.x + keyCol.w - keyCol.padR - textW(String(rows[r][0] ?? ''), font(800, keyPx), { letterSpacing: '-0.01em' })
    const lx = sh.gutter + BRK.lineX                                    // body-local x of the bracket's line
    // the ticks reach toward the two keys and stop a gap short of them
    const tx = Math.max(lx + 20, Math.min(keyTextL(a), keyTextL(b)) - sh.x - BRK.gap)
    const R = 10
    const path = `M ${tx.toFixed(1)} ${yp.toFixed(1)} H ${(lx + R).toFixed(1)} Q ${lx} ${yp.toFixed(1)} ${lx} ${(yp + dir * R).toFixed(1)}`
      + ` V ${(yf - dir * R).toFixed(1)} Q ${lx} ${yf.toFixed(1)} ${(lx + R).toFixed(1)} ${yf.toFixed(1)} H ${tx.toFixed(1)}`
    const len = 2 * (tx - lx) + Math.abs(yf - yp)
    const pathEl = s('path', { d: path, fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': `${len.toFixed(1)} ${len.toFixed(1)}`, 'stroke-dashoffset': len.toFixed(1) })
    // an arrowhead on the reference row's tick: "start here instead"
    const tipA = s('path', { d: `M ${(tx - 10).toFixed(1)} ${(yf - 9).toFixed(1)} L ${(tx + 1).toFixed(1)} ${yf.toFixed(1)} L ${(tx - 10).toFixed(1)} ${(yf + 9).toFixed(1)}`, fill: 'none', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0 })
    const svgW = Math.ceil(tx + 12), svgH = Math.ceil(sh.rowTop(N) - sh.bodyTop)
    const svg = s('svg', { class: 'fyr-brk', 'data-deco': '', width: svgW, height: svgH, viewBox: `0 0 ${svgW} ${svgH}` }, pathEl, tipA)
    const txt = h('div', { class: 'ls-tiptxt', html: mk(p.label || '') })
    const pill = h('div', { class: 'fyr-bpill' }, txt)
    sh.over.append(svg, pill)
    const pw = brkW[bi], ph = Math.min(Math.round(BRK.px * 1.12 + 12), Math.round(Math.abs(yf - yp) - 8))
    setStyle(pill, { left: BRK.pillX + 'px', top: Math.round((yp + yf) / 2 - ph / 2) + 'px', width: pw + 'px', height: ph + 'px' })
    return { p, svg, pathEl, tipA, pill, len, end: pickWin[picks.indexOf(p)].hiEnd }
  })

  // ---------- row highlights: each pick lights its row until the next pick; a bracket keeps its reference row lit ----------
  const hiWins = []
  picks.forEach((p, i) => {
    hiWins.push({ row: p.row, t0: p.t + 0.04, end: pickWin[i].hiEnd, a: 1 })
    if (p.from != null) hiWins.push({ row: p.from, t0: p.t + 0.04, end: pickWin[i].hiEnd, a: 0.55, lit: picks.some(q => q.row === p.from && q.t < p.t) })
  })

  // ---------- selection keyframes (each new selection cross-fades in; nothing slides across the figures) ----------
  const landStep = (t, i) => (rowT[i] <= 0 ? 1 : ease.out(prog(t, rowT[i] - 0.07, 0.16)))
  const fillRows = t => { let b = 1; for (let i = 1; i < N; i++) b += landStep(t, i); return b }
  const K = [{ t: -Infinity, rect: t => sh.rangeRect(0, fillRows(t), outC0, outC1), head: t => [0, Math.floor(fillRows(t) - 0.01), outC0, outC1], handle: true }]
  picks.forEach(p => K.push({ t: p.t, rect: () => sh.cellRect(p.row, emphCol), head: () => [p.row, p.row, emphCol, emphCol], handle: false }))
  if (verdict) K.push({ t: verdict.t, rect: () => sh.rangeRect(0, N, emphCol, emphCol), head: () => [0, N - 1, emphCol, emphCol], handle: false })
  if (loopOn) K.push({ t: loopT0, rect: () => sh.rangeRect(0, 1, outC0, outC1), head: () => [0, 0, outC0, outC1], handle: true })
  const sel2 = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  sh.body.append(sel2)
  const selEls = [sh.sel, sel2]
  const placeSel = (el, rect, { handle = true, alpha = 1 } = {}) => {
    if (!rect || alpha <= 0.001) { setStyle(el, { opacity: '0' }); return }
    const X = sh.x, Y = sh.bodyTop
    const x0 = Math.round(rect.x0 - X), y0 = Math.round(rect.y0 - Y)
    setStyle(el, { opacity: alpha.toFixed(3), left: x0 + 'px', top: y0 + 'px', width: Math.max(8, Math.round(rect.x1 - X) - x0) + 'px', height: Math.max(8, Math.round(rect.y1 - Y) - y0) + 'px' })
    const edge = rect.x1 > X + sh.w - 10
    const floor = rect.y1 > Y + parseFloat(sh.body.style.height) - 10
    setStyle(el.firstChild, { opacity: handle ? '1' : '0', right: edge ? '3px' : '-9px', bottom: floor ? '3px' : '-9px' })
  }
  const grow = (r, e) => ({ x0: r.x0 - e, y0: r.y0 - e, x1: r.x1 + e, y1: r.y1 + e })

  // ---------- the verdict card: as wide as the sheet, in the caption band; **x** set large on its line ----------
  const vCard = verdict && vMode === 'band' ? verdictCard(L, verdict) : null

  // ---------- sound ----------
  bar.cue(ctx)
  rows.forEach((_, i) => {
    if (rowT[i] <= 0) return
    if (i === countIdx) { ctx.cue(rowT[i], 'roll', { dur: M.count }); ctx.cue(rowT[i] + M.count, 'pop') }
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  picks.forEach((p, i) => { ctx.cue(p.t, 'pop', { gain: 0.8 }); if (pickMode === 'tip' || p.from != null) ctx.cue(pickWin[i].openAt + 0.12, 'reveal', { gain: 0.5 }) })
  if (vEntry) ctx.cue(vEntry.end + 0.05, 'ding')
  // (the chrome cued the band verdict's ding; a spec that already carries one at verdict.t keeps just that)
  if (vCard && !(spec.sfx || []).some(x => x && x.kind === 'ding' && Math.abs(x.t - verdict.t) < 0.05)) ctx.cue(verdict.t, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const sweepAt = i => (verdict ? verdict.t + 0.18 + i * Math.min(0.06, 0.7 / N) : Infinity)
  return {
    duration,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      captions: caps,
      captionHolds: countIdx >= 0 ? [{ text: rows[countIdx][emphCol], t: rowT[countIdx] + 0.08 * (emphCol - 1) + M.count }] : [],
      // the card is drawn here (sheet-wide, large emphasis); captions give way to it
      verdict: 'self',
      captionHidden: vCard ? t => t >= verdict.t : undefined,
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar: the verdict takes it over in ink, heavier, as the ≈ chip pops
      const fs = bar.at(t)
      sh.fbar.set(bar.html(fs), { caret: fs.caret })
      sh.fbar.verdictStyle(!!fs.verdict, vEntry ? prog(t, vEntry.t - 0.06, 0.2) : 0)
      const chipP = vEntry && t < loopT0 ? prog(t, vEntry.start - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? (0.86 + 0.14 * ease.back(chipP, 2.4)).toFixed(4) : 1})` })

      // tooltips first: a row under an open tooltip fades out as the pill wipes in (same frames)
      const coverOf = new Map()
      tips.forEach(tp => {
        // the row under goes in the first 0.1 s as the pill starts to wipe out of its notch; on close the pill goes
        // back into its notch and the row returns as it does (never an empty strip, never two texts on one row)
        const c = tp.ok ? ease.out(prog(t, tp.openAt, 0.1)) * (1 - ease.inOut(prog(t, tp.closeAt - 0.08, 0.12))) : 0
        const rv = tp.ok ? ease.out(prog(t, tp.openAt + 0.05, 0.24)) * (1 - ease.inOut(prog(t, tp.closeAt - 0.26, 0.2))) : 0
        setTip(tp, c, rv)
        for (const r of tp.covered) coverOf.set(r, Math.max(coverOf.get(r) || 0, c))
      })
      for (let r = 0; r < N; r++) setStyle(sh.rowEls[r], { opacity: (1 - (coverOf.get(r) || 0)).toFixed(3) })

      // rows: highlight, cells
      for (let r = 0; r < N; r++) {
        let hi = 0, wipe = 0
        for (const w of hiWins) {
          if (w.row !== r || t < w.t0) continue
          const a = w.a * (1 - ease.out(prog(t, w.end, 0.2)))
          if (a <= 0.001) continue
          hi = Math.max(hi, a)
          wipe = Math.max(wipe, w.lit ? 1 : ease.inOut(prog(t, w.t0, 0.3)))
        }
        sh.hiRow(r, hi, wipe)
        const pre = rowT[r] <= 0
        const out = !pre && loopOn ? prog(t, loopT0 + 0.02 + ((N - 1 - r) / Math.max(1, N - 1)) * 0.14, 0.2) : 0
        // key column: always there (find your row)
        sh.setCell(r, 0, { text: rows[r][0] })
        for (let c = 1; c < nC; c++) {
          const t0 = rowT[r] + (c - 1) * 0.08
          const val = rows[r][c] ?? ''
          const isEmph = c === emphCol
          let text = val, p = pre ? 1 : prog(t, t0, M.drop)
          if (isEmph && r === countIdx) {
            const q = prog(t, t0, M.count)
            text = countText(val, ease.out(q))
            p = pre ? 1 : prog(t, t0, 0.16)
          }
          const flash = pre ? 0 : Math.max(flashAlpha(t, t0 + 0.06), isEmph ? flashAlpha(t, sweepAt(r), 0.32) : 0)
          const pp = isEmph && r === countIdx ? prog(t, t0 + M.count - 0.02, 0.24) : 0
          const scale = pp > 0 && pp < 1 ? 1 + 0.1 * (1 - ease.out(pp)) : 1 // settles from 110%, never under 100%
          // larger figures land with a smaller snap (from ~105%, not 116%), so a landing value never runs into its
          // neighbours' rows
          const pv = boosted && p > 0 && p < 1 ? 0.6 + 0.4 * p : p
          sh.setCell(r, c, {
            text, p: pv, out, flash: hi > 0.5 ? 0 : flash,
            color: isEmph ? emphColor : undefined, fill: isEmph && r === goalIdx && p >= 1 && out < 1 ? emphFill : undefined,
            scale,
          })
        }
      }

      // brackets: the line draws from the picked row to the reference row, then the label pops on it
      brackets.forEach(bk => {
        const shut = 1 - ease.inOut(prog(t, Math.min(bk.end, loopT0), 0.2))
        const on = t >= bk.p.t + 0.06 && shut > 0.001
        const dp = on ? ease.inOut(prog(t, bk.p.t + 0.06, 0.32)) : 0
        bk.pathEl.setAttribute('stroke-dashoffset', (bk.len * (1 - dp)).toFixed(1))
        bk.svg.style.opacity = on && dp > 0.06 ? shut.toFixed(3) : '0' // (no round-cap dot before the line moves)
        bk.tipA.setAttribute('opacity', dp >= 0.98 ? '1' : '0')
        const q = prog(t, bk.p.t + 0.3, 0.24)
        const st = snapIn(q, 1.12)
        setStyle(bk.pill, { opacity: on && q > 0 ? (Math.min(+st.opacity, 1) * shut).toFixed(3) : '0', transform: on && q > 0 ? st.transform : 'none' })
      })

      // selection: the incoming selection fades in on its target as the outgoing one fades out where it is
      let k = 0
      for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
      const inP = k === 0 ? 1 : ease.out(prog(t, K[k].t + 0.02, 0.16))
      const outA = k === 0 ? 0 : 1 - ease.out(prog(t, K[k].t, 0.12))
      const cur = selEls[k % 2], prev = selEls[(k + 1) % 2]
      placeSel(cur, grow(K[k].rect(t), k === 0 ? 0 : 8 * (1 - ease.out(prog(t, K[k].t + 0.02, 0.22)))), { handle: K[k].handle, alpha: inP })
      if (k > 0 && outA > 0.001) placeSel(prev, K[k - 1].rect(K[k].t), { handle: K[k - 1].handle, alpha: outA })
      else placeSel(prev, null)
      const hd = K[k].head(t)
      sh.headSel(hd[0], hd[1], hd[2], hd[3])

      if (vCard) vCard.seek(t, { out: loopOn ? ease.inOut(prog(t, loopT0, 0.3)) : 0 })
    },
  }
}

/**
 * The verdict card, sheet-wide (x 60-960) in the caption band. Each `\n` line of the verdict is a line of the card;
 * the line that holds **emphasis** is the punch line: its emphasis is set large (96 → 72 px, the largest that fits;
 * 84 px or more on a sheet-wide card) on the yellow marker, the rest of the card at the kicker size (48 → 42 px). The ≈
 * chip leads the first line. A verdict with no emphasis keeps every line at the kicker size. Pops in with the column
 * flash; out = 0..1 fades it with the loop clear.
 */
function verdictCard(parent, verdict) {
  const X = G.left, Wd = G.width, top = G.bandTop, bottom = G.bandBottom
  const PADX = 30, PADY = 8, GAP = 2
  const raw = String(verdict.text).split('\n').map(x => x.trim()).filter(Boolean)
  const punchIdx = raw.findIndex(x => /\*\*[\s\S]+?\*\*/.test(x))
  const el = h('div', { class: 'fyr-v', 'data-overlap-ok': '', style: { left: X + 'px', width: Wd + 'px' } })
  const lines = raw.map((x, i) => {
    const ln = h('div', { class: 'fyr-vl' + (i === punchIdx ? ' punch' : ''), html: mk(x) })
    if (i === 0) ln.prepend(h('div', { class: 'ls-chip fyr-vchip', 'data-deco': '', text: '≈' }))
    el.append(ln)
    return ln
  })
  parent.append(el)
  const maxW = Wd - 2 * PADX, maxH = bottom - top
  let small = 48, big = punchIdx >= 0 ? 96 : 48
  const apply = () => {
    lines.forEach(ln => setStyle(ln, { fontSize: small + 'px', '--big': big + 'px' }))
    setStyle(el, { padding: `${PADY}px ${PADX}px`, gap: GAP + 'px' })
  }
  const over = () => lines.some(ln => ln.scrollWidth > maxW + 0.5) || el.offsetHeight > maxH
  apply()
  for (let k = 0; k < 40 && over(); k++) {
    if (punchIdx >= 0 && big > 84) big -= 2
    else if (small > 42) small -= 2
    else if (punchIdx >= 0 && big > 72) big -= 2
    else break
    apply()
  }
  if (over()) {
    // a verdict too long for a large punch line: the kit's own card (56 → 42 px, wrapped, balanced), sheet-wide
    el.remove()
    return libVerdictCard(parent, verdict, { top, bottom, x: X, w: Wd })
  }
  const ht = el.offsetHeight
  const y0 = Math.round(top + (maxH - ht) / 2)
  setStyle(el, { top: y0 + 'px' })
  // the landing overshoot never pushes the card past the band (y 1320-1480)
  const scMax = Math.max(1, Math.min(1.04, (G.safeBottom - 2 - (y0 + ht / 2)) / (ht / 2), ((y0 + ht / 2) - top + 2) / (ht / 2)))
  const ems = [...el.querySelectorAll('em')]
  return {
    el, big, small,
    seek(t, { out = 0 } = {}) {
      if (t < verdict.t || out >= 1) { setStyle(el, { opacity: '0', transform: 'scale(1)' }); ems.forEach(e => setStyle(e, { '--hl': '0.0%' })); return false }
      const p = prog(t, verdict.t, 0.34)
      // lands from 104% (never under 100%: the text stays above the type floor on every frame)
      const sc = p >= 1 ? 1 : 1 + (scMax - 1) * (1 - ease.out(p))
      setStyle(el, { opacity: String(clamp(p * 3) * (1 - out)), transform: sc === 1 ? 'none' : `scale(${sc.toFixed(4)})` })
      ems.forEach(e => setStyle(e, { '--hl': (ease.inOut(prog(t, verdict.t + 0.14, 0.32)) * 100).toFixed(1) + '%' }))
      return true
    },
  }
}
