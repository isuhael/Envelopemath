// live-sheet · find-your-row (P7): one row per kind of viewer, denser than one pass can read.
//
// Frame 1: the question card, the formula bar mid-typing, every row's key (column A) already in place so each
// viewer can find their row, output cells empty except the first row (lookOpts.prefill rows, and any row with
// t <= 0, are pre-filled: a money answer at 0.0 s).
// Then the fill handle drags down the output columns and each row's values drop in with a highlight flash;
// the biggest result counts up if it lands after frame 1. A pick collapses the selection onto one result,
// lights the row and opens a tooltip strip under it (the rows below make room; the pill wipes out of its notch, a
// long label fits down to 40 px, then takes two lines, then wraps to as many as it needs). At the verdict the
// result column flashes top to bottom and the bar rewrites to the shortcut (lookOpts.shortcut, or the verdict's
// formula-like part: "≈ your hourly wage × 52") while the verdict lands as a card in the caption band; or the
// verdict itself is retyped into the formula bar (Inter 800).
// The last 0.5 s clears back to the frame-1 state so the short loops.
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
import {
  h, setStyle, clamp, prog, ease, C, G, M, S,
  sheet, tipStrip, fitTips, tipWindow, mk, mkLen, typedMk, typeDur, wordCut, countText, displayValue,
  popScale, flashAlpha, springRect, durationOf, hasCaptions, opt, layer, footerHeight, fitBarVerdict,
  toneColor, toneFill, hasUnits, barScript, shortcutOf, fitWarn,
} from '../lib.js'

export const css = ''

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
  const picks = (d.pick || []).filter(p => p && p.row >= 0 && p.row < N).slice().sort((a, b) => a.t - b.t)
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

  // ---------- layout: build, measure, give way until it fits ----------
  const fH = footerHeight(spec.footer)
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const vOpt = opt(spec, 'verdict', 'auto')
  const pickOpt = opt(spec, 'pickStyle', 'auto')
  const lettersOpt = opt(spec, 'letters', 'auto')
  const tipW = G.width - G.gutter - 24
  const tipFit0 = fitTips(picks.map(p => p.label || ''), tipW)
  const pickModes = !picks.length ? ['none'] : pickOpt === 'bar' ? ['bar'] : pickOpt === 'tip' ? ['tip'] : ['tip', 'bar']
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
  const barStrings = pm => [...fe0.map(e => e.text), ...(scText ? [scText] : []), ...(pm === 'bar' ? picks.map(p => p.label || '') : [])]
  let sh = null, P = null
  for (const plan of plans) {
    L.replaceChildren()
    const slot = plan.pm === 'tip' ? tipFit0.slotH : 0
    sh = sheet(L, {
      columns: columns.map((c, j) => ({
        label: c.label, kind: j === 0 ? 'input' : j === emphCol ? 'output' : 'mid',
        tone: j === emphCol ? (c.tone || opt(spec, 'emphTone', 'good')) : c.tone,
        units: rows.some(r => hasUnits(r[j] ?? '')), // "11 yrs 5 mo": the numbers keep the size, the words drop to 40 px
      })),
      // the slot is planned for but not drawn: the card grows a row's height while a tooltip is open
      values: rows, rows: N, reserve: slot, grow: true, tail: 18,
      bottom: plan.band ? bandBottom : fullBottom, minRowH: plan.minRowH, pad: plan.pad,
      formula: { strings: barStrings(plan.pm), verdict: plan.vMode === 'formula' ? verdict.text : null },
      letters: plan.letters,
    })
    P = plan
    if (sh.maxBottom <= (plan.band ? bandBottom : fullBottom) + 1) break
  }
  fitWarn('find-your-row', sh.maxBottom + (fH ? G.gap + fH : 0), P.band ? G.workBottom : G.safeBottom - 4)
  if (capsWanted && !P.caps) console.warn('live-sheet find-your-row: too dense for captions; running silent with the verdict in the formula bar')
  const caps = P.caps, vMode = P.vMode, pickMode = P.pm
  const tipFit = pickMode === 'tip' ? tipFit0 : fitTips([], tipW)
  const slotH = pickMode === 'tip' ? tipFit.slotH : 0

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
  if (pickMode === 'bar') picks.forEach(p => fe.push({ t: pickAt(p), text: p.label || '', pick: true }))
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

  // pick tooltips: right-anchored under the result cell, never past x 948 (their text stays left of the rail)
  const tips = pickMode === 'tip' ? picks.map((p, i) => tipStrip(sh, { px: tipFit.px, html: tipFit.html[i], wrap: tipFit.wrap })) : []
  const tipBox = picks.map((p, i) => {
    const cell = sh.cellRect(p.row, emphCol)
    const wpx = tipFit.w[i] ?? tipW
    const x1 = Math.min(sh.x + sh.w - 12, Math.max(cell.x1 - 10, sh.x + sh.gutter + 12 + wpx))
    const x0 = Math.max(sh.x + sh.gutter + 12, x1 - wpx)
    return { x0, x1, notchX: clamp((cell.x0 + cell.x1) / 2, x0 + 34, x1 - 34) }
  })

  // ---------- pick windows: when each strip opens / closes ----------
  const pickWin = picks.map((p, i) => {
    const openAt = p.t + (i > 0 ? 0.24 : 0.06)
    const next = picks[i + 1] ? picks[i + 1].t : verdict ? verdict.t : loopT0
    const hiEnd = picks[i + 1] ? picks[i + 1].t : loopT0
    return { openAt, closeAt: Math.min(next, loopT0), hiEnd, win: tipWindow(openAt, Math.min(next, loopT0)) }
  })
  const openOf = (i, t) => (pickMode === 'tip' ? pickWin[i].win.open(t) : 0)
  const shiftAt = (r, t) => {
    let dy = 0
    picks.forEach((p, i) => { if (r > p.row) dy += slotH * openOf(i, t) })
    return dy
  }

  // ---------- selection keyframes ----------
  const landStep = (t, i) => (rowT[i] <= 0 ? 1 : ease.out(prog(t, rowT[i] - 0.07, 0.16)))
  const fillRows = t => { let b = 1; for (let i = 1; i < N; i++) b += landStep(t, i); return b }
  const K = [{ t: -Infinity, rect: t => sh.rangeRect(0, fillRows(t), outC0, outC1, r => shiftAt(r, t)), head: t => [0, Math.floor(fillRows(t) - 0.01), outC0, outC1] }]
  picks.forEach(p => K.push({
    t: p.t, dur: M.pick, spring: 1.6,
    rect: t => sh.cellRect(p.row, emphCol, shiftAt(p.row, t)), head: () => [p.row, p.row, emphCol, emphCol],
  }))
  if (verdict) K.push({ t: verdict.t, dur: 0.4, e: ease.inOut, rect: t => sh.rangeRect(0, N, emphCol, emphCol, r => shiftAt(r, t)), head: () => [0, N - 1, emphCol, emphCol] })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: () => sh.rangeRect(0, 1, outC0, outC1), head: () => [0, 0, outC0, outC1] })
  const rectAt = (k, t) => {
    if (k === 0) return K[0].rect(t)
    const a = rectAt(k - 1, t), b = K[k].rect(t), p = prog(t, K[k].t, K[k].dur)
    return K[k].spring ? springRect(a, b, p, K[k].spring) : { x0: a.x0 + (b.x0 - a.x0) * K[k].e(p), y0: a.y0 + (b.y0 - a.y0) * K[k].e(p), x1: a.x1 + (b.x1 - a.x1) * K[k].e(p), y1: a.y1 + (b.y1 - a.y1) * K[k].e(p) }
  }

  // ---------- sound ----------
  bar.cue(ctx)
  rows.forEach((_, i) => {
    if (rowT[i] <= 0) return
    if (i === countIdx) { ctx.cue(rowT[i], 'roll', { dur: M.count }); ctx.cue(rowT[i] + M.count, 'pop') }
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  picks.forEach((p, i) => { ctx.cue(p.t, 'pop', { gain: 0.8 }); if (pickMode === 'tip') ctx.cue(pickWin[i].openAt + 0.18, 'reveal', { gain: 0.5 }) })
  if (vEntry) ctx.cue(vEntry.end + 0.05, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const sweepAt = i => (verdict ? verdict.t + 0.18 + i * Math.min(0.06, 0.7 / N) : Infinity)
  return {
    duration,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      footerShift: t => shiftAt(N, t),
      captions: caps,
      captionHolds: countIdx >= 0 ? [{ text: rows[countIdx][emphCol], t: rowT[countIdx] + 0.08 * (emphCol - 1) + M.count }] : [],
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar: the verdict takes it over in ink, heavier, as the ≈ chip pops
      const fs = bar.at(t)
      sh.fbar.set(bar.html(fs), { caret: fs.caret })
      sh.fbar.verdictStyle(!!fs.verdict, vEntry ? prog(t, vEntry.t - 0.06, 0.2) : 0)
      const chipP = vEntry && t < loopT0 ? prog(t, vEntry.start - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // rows: shift (picks), highlight, cells
      for (let r = 0; r < N; r++) sh.rowShift(r, shiftAt(r, t))
      sh.setGrow(shiftAt(N, t))
      for (let r = 0; r < N; r++) {
        let hi = 0, wipe = 0
        picks.forEach((p, i) => {
          if (p.row !== r) return
          hi = Math.max(hi, 1 - ease.out(prog(t, pickWin[i].hiEnd, 0.2)))
          wipe = Math.max(wipe, ease.inOut(prog(t, p.t + 0.04, 0.3)))
        })
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
          sh.setCell(r, c, {
            text, p, out, flash: hi > 0.5 ? 0 : flash,
            color: isEmph ? emphColor : undefined, fill: isEmph && r === goalIdx && p >= 1 && out < 1 ? emphFill : undefined,
            scale,
          })
        }
      }

      // tooltips: the slot opens, then the pill wipes out of its notch with its label already in place
      tips.forEach((tp, i) => {
        const p = picks[i], w = pickWin[i].win
        tp.set({ ...tipBox[i], y: sh.rowTop(p.row, shiftAt(p.row, t)) + sh.rowH, ht: slotH, open: w.open(t), reveal: w.reveal(t) })
      })

      // selection
      let k = 0
      for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
      sh.select(rectAt(k, t), { handle: k === 0 || K[k].t === loopT0 })
      const hd = K[k].head(t)
      sh.headSel(hd[0], hd[1], hd[2], hd[3])
    },
  }
}
