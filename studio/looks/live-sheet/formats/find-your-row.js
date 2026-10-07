// live-sheet · find-your-row (P7): one row per kind of viewer, denser than one pass can read.
//
// Frame 1: the question card, the formula bar mid-typing, every row's key (column A) already in place so each
// viewer can find their row, output cells empty (rows with t <= 0 are pre-filled: a money answer at 0.0 s).
// Then the fill handle drags down the output columns and each row's values drop in with a highlight flash;
// the biggest result counts up if it lands after frame 1. A pick collapses the selection onto one result,
// lights the row and opens a tooltip strip under it (the rows below make room). The verdict either rewrites
// the formula bar or lands as a card in the caption band, while the result column flashes top to bottom.
// The last 0.5 s clears back to the frame-1 state so the short loops.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//           · emphTone ('good'; a 'goal' column is ink with the yellow on its biggest cell) · formulaAt0 (0.7)
import {
  h, setStyle, clamp, prog, ease, C, G, M, S,
  sheet, tipStrip, mk, mkLen, typedMk, typedCount, typeDur, wordCut, caretOn, countText, displayValue,
  popScale, flashAlpha, lerpRect, durationOf, hasCaptions, opt, layer, footerHeight, fitFormula, textW, font,
  toneColor, toneFill, rgba,
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
  const picks = (d.pick || []).filter(p => p && p.row >= 0 && p.row < N).slice().sort((a, b) => a.t - b.t)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const loopOn = opt(spec, 'loop', true)
  const caps = hasCaptions(spec)
  const lastLand = Math.max(...rowT)

  // the biggest result counts up (only if it lands after frame 1)
  let countIdx = -1
  if (opt(spec, 'countUp', true)) {
    let best = -Infinity
    rows.forEach((r, i) => { const v = displayValue(r[emphCol]); if (v > best) { best = v; countIdx = i } })
    if (countIdx >= 0 && rowT[countIdx] <= 0) countIdx = -1
  }
  const landEnd = i => rowT[i] + (i === countIdx ? M.count : M.drop) + 0.08 * (nC - 1)
  const beats = [...rows.map((_, i) => landEnd(i)), ...picks.map(p => p.t + M.pick)]
  const duration = durationOf(spec, { beats, hold: d.hold ?? 4 })
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------- layout ----------
  const formula = d.formula || ''
  const fH = footerHeight(spec.footer)
  // pick tooltips: one font size that fits every label; the sheet keeps a slot of empty rows for the strip
  const tipW = G.width - G.gutter - 24
  let tipPx = S.tip
  while (picks.length && tipPx > 40 && Math.max(...picks.map(p => textW(mk(p.label || ''), font(800, tipPx)))) > tipW - 58) tipPx -= 2
  const slotH = picks.length ? Math.round(tipPx * 1.2 + 26) : 0
  const labelLines = Math.max(1, ...columns.map(c => String(c.label || '').split('\n').length))
  const estRowH = bottom => {
    const fb = fitFormula([formula, verdict ? verdict.text : ''], G.width).ht
    return (bottom - G.cardTop - fb - G.lettersH - (labelLines > 1 ? 116 : 76) - slotH) / N
  }
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  else if (vMode === 'auto') vMode = caps || estRowH(bandBottom) >= 62 ? 'band' : 'formula'
  const bandUsed = caps || vMode === 'band'

  const L = layer(ctx, 'fyr')
  const sh = sheet(L, {
    columns: columns.map((c, j) => ({
      label: c.label, kind: j === 0 ? 'input' : j === emphCol ? 'output' : 'mid',
      tone: j === emphCol ? (c.tone || opt(spec, 'emphTone', 'good')) : c.tone,
    })),
    values: rows, rows: N, reserve: slotH,
    bottom: bandUsed ? bandBottom : fullBottom,
    formula: { strings: [formula, vMode === 'formula' ? verdict.text : ''] },
    letters: opt(spec, 'letters', 'auto'),
  })
  const emphTone = columns[emphCol]?.tone || opt(spec, 'emphTone', 'good')
  const emphColor = toneColor(emphTone)
  const emphFill = toneFill(emphTone)
  // a 'goal' column is ink; only its biggest cell gets the yellow (one accent, one answer)
  let goalIdx = -1
  if (emphFill !== 'transparent') {
    let best = -Infinity
    rows.forEach((r, i) => { const v = displayValue(r[emphCol]); if (v > best) { best = v; goalIdx = i } })
  }

  // pick tooltips: right-anchored under the result cell
  const tips = picks.map(() => tipStrip(sh, { px: tipPx }))
  const tipBox = picks.map(p => {
    const cell = sh.cellRect(p.row, emphCol)
    const wpx = Math.min(sh.w - sh.gutter - 24, textW(mk(p.label || ''), font(800, tipPx)) + 58)
    const x1 = Math.min(sh.x + sh.w - 12, Math.max(cell.x1 - 10, sh.x + sh.gutter + 12 + wpx))
    const x0 = Math.max(sh.x + sh.gutter + 12, x1 - wpx)
    return { x0, x1, notchX: clamp((cell.x0 + cell.x1) / 2, x0 + 34, x1 - 34) }
  })

  // ---------- pick windows: when each strip opens / closes ----------
  const pickWin = picks.map((p, i) => {
    const openAt = p.t + (i > 0 ? 0.24 : 0.06)
    const next = picks[i + 1] ? picks[i + 1].t : verdict ? verdict.t : loopT0
    const hiEnd = picks[i + 1] ? picks[i + 1].t : loopT0
    return { openAt, closeAt: Math.min(next, loopT0), hiEnd }
  })
  const openOf = (i, t) => {
    const w = pickWin[i]
    return ease.inOut(prog(t, w.openAt, 0.3)) * (1 - ease.inOut(prog(t, w.closeAt + 0.06, 0.24)))
  }
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
    t: p.t, dur: M.pick, e: x => ease.back(x, 1.6),
    rect: t => sh.cellRect(p.row, emphCol, shiftAt(p.row, t)), head: () => [p.row, p.row, emphCol, emphCol],
  }))
  if (verdict) K.push({ t: verdict.t, dur: 0.4, e: ease.inOut, rect: t => sh.rangeRect(0, N, emphCol, emphCol, r => shiftAt(r, t)), head: () => [0, N - 1, emphCol, emphCol] })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: () => sh.rangeRect(0, 1, outC0, outC1), head: () => [0, 0, outC0, outC1] })
  const rectAt = (k, t) => (k === 0 ? K[0].rect(t) : lerpRect(rectAt(k - 1, t), K[k].rect(t), K[k].e(prog(t, K[k].t, K[k].dur))))

  // ---------- formula bar ----------
  const cut = wordCut(formula, opt(spec, 'formulaAt0', 0.7))
  const fLen = mkLen(formula)
  const vText = vMode === 'formula' ? verdict.text : ''
  const vLen = mkLen(vText)
  const vType0 = verdict ? verdict.t + 0.32 : Infinity
  const vCps = 26
  function formulaState(t) {
    if (t >= loopT0) {
      // erase whatever is showing, then retype the frame-1 prefix
      const showing = vMode === 'formula' && t >= vType0 ? vText : formula
      const len = showing === vText ? vLen : fLen
      const e1 = 0.22
      if (t < loopT0 + e1) {
        const n = Math.round(len * (1 - prog(t, loopT0, e1)))
        return { html: typedMk(showing, showing === formula ? Math.max(cut, n) : n), caret: true }
      }
      if (showing === formula) return { html: typedMk(formula, cut), caret: true }
      return { html: typedMk(formula, Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true }
    }
    if (vMode === 'formula' && t >= verdict.t) {
      if (t < vType0) return { html: typedMk(formula, Math.round(fLen * (1 - prog(t, verdict.t, vType0 - verdict.t - 0.04)))), caret: true }
      const n = typedCount(t, vType0, vText, { cps: vCps })
      return { html: typedMk(vText, n), caret: caretOn(t, n < vLen), verdict: true }
    }
    const n = typedCount(t, 0, formula, { from: cut })
    return { html: typedMk(formula, n), caret: caretOn(t, n < fLen) }
  }

  // ---------- sound ----------
  ctx.cue(0, 'type', { dur: Math.max(0.2, typeDur(formula, { from: cut })) })
  rows.forEach((_, i) => {
    if (rowT[i] <= 0) return
    if (i === countIdx) { ctx.cue(rowT[i], 'roll', { dur: M.count }); ctx.cue(rowT[i] + M.count, 'pop') }
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  picks.forEach((p, i) => { ctx.cue(p.t, 'pop', { gain: 0.8 }); ctx.cue(pickWin[i].openAt + 0.18, 'reveal', { gain: 0.5 }) })
  if (vMode === 'formula') {
    ctx.cue(vType0, 'type', { dur: vLen / vCps })
    ctx.cue(vType0 + vLen / vCps + 0.05, 'ding')
  }
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const sweepAt = i => (verdict ? verdict.t + 0.18 + i * Math.min(0.06, 0.7 / N) : Infinity)
  return {
    duration,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      captions: caps,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar
      const fs = formulaState(t)
      sh.fbar.set(fs.html, { caret: fs.caret })
      // the verdict takes the bar over: ink, heavier, and the ≈ chip pops as it lands
      setStyle(sh.fbar.txt, fs.verdict ? { color: C.ink, fontWeight: '800' } : { color: C.fbarText, fontWeight: '700' })
      const chipP = verdict && vMode === 'formula' ? prog(t, vType0 - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // rows: shift (picks), highlight, cells
      for (let r = 0; r < N + sh.spare; r++) sh.rowShift(r, shiftAt(r, t))
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
      // spare rows sink out of view when a strip pushes them
      for (let r = N; r < N + sh.spare; r++) setStyle(sh.numEls[r], { opacity: String(clamp(1 - shiftAt(r, t) / (sh.rowH * 0.5))) })

      // tooltips
      picks.forEach((p, i) => {
        const o = openOf(i, t)
        const w = pickWin[i]
        // the pill pops out of its notch (overshoot), its text arrives once it is full size, and it all
        // shrinks back into the notch before the slot closes
        const inP = prog(t, w.openAt + 0.04, 0.34), outP = prog(t, w.closeAt - 0.04, 0.18)
        const k = outP > 0 ? 1 - ease.in(outP) : inP < 1 ? Math.max(0, ease.back(inP, 2)) : 1
        const alpha = prog(t, w.openAt + 0.3, 0.1) * (1 - prog(t, w.closeAt - 0.1, 0.06))
        tips[i].set({ ...tipBox[i], y: sh.rowTop(p.row, shiftAt(p.row, t)) + sh.rowH, ht: slotH, open: o, scale: inP <= 0 ? 0 : k, html: mk(p.label || ''), textAlpha: alpha })
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
