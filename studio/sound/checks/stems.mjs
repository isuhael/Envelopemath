// §9.3 mix relations and timing on the stems, the report and the delivery: B1 (and B1w, the as-written Becker B1),
// B3-B9. B2 and B10 are symbolic (score.mjs). Each check is (ctx, lim) -> { pass, detail, value? }.
import { loudness } from '../../src/sound/loudness.mjs'
import { SR, fix, mean, inRange, powDb, rmsCh, db, momentaryAt, shortTermAt, fluxOnset, riseOnset } from './measure.mjs'
import { limits } from './acceptance.mjs'

const isCard = (sc, s) => !!s.card || s.t >= sc.base - 1e-9
const win = ([lo, hi]) => `${lo}..${hi}`

/** B1 against a set of windows: { music?, sfx?, sfxMinusMusic?, returnsMax? } -> { ok, detail } */
function stemBalance(rep, w) {
  const m = rep.stems.music.reMix, s = rep.stems.sfx.reMix, r = rep.stems.returns.reMix
  const lead = +(s - m).toFixed(2)
  const bad = []
  if (w.music && !inRange(m, w.music, 1e-9)) bad.push('music')
  if (w.sfx && !inRange(s, w.sfx, 1e-9)) bad.push('sfx')
  if (w.sfxMinusMusic && !inRange(lead, w.sfxMinusMusic, 1e-9)) bad.push('sfx-music')
  if (w.returnsMax != null && !(r <= w.returnsMax + 1e-9)) bad.push('returns')
  const parts = [`music ${m}${w.music ? ` (${win(w.music)})` : ''}`, `sfx ${s}${w.sfx ? ` (${win(w.sfx)})` : ''}`]
  if (w.sfxMinusMusic) parts.push(`sfx-music ${lead} (${win(w.sfxMinusMusic)})`)
  parts.push(`returns ${r}${w.returnsMax != null ? ` (≤ ${w.returnsMax})` : ''}`)
  return { ok: !bad.length, detail: parts.join(', ') + (bad.length ? `; out: ${bad.join(', ')}` : '') }
}

export const checks = {
  B1(ctx, lim) {
    const b = stemBalance(ctx.report, lim)
    return { pass: b.ok, detail: b.detail }
  },
  B1w(ctx) {
    const w = (limits('B1', ctx.look) || {}).asWritten
    if (!w) return { pass: null, detail: 'no as-written windows' }
    const b = stemBalance(ctx.report, w)
    return { pass: b.ok, detail: `as written: ${b.detail}` }
  },
  B3(ctx, lim) {
    const sc = ctx.score, sfx = ctx.stem('sfx'), music = ctx.stem('music')
    const kinds = new Set(lim.kinds)
    const low = [], lowCard = []
    let n = 0, worst = Infinity
    for (const s of sc.sfx) {
      if (!kinds.has(s.kind) || (s.cueGain ?? s.gain) < lim.minGain) continue
      const d = powDb(sfx, s.t, s.t + lim.windowS) - powDb(music, s.t, s.t + lim.windowS)
      const card = isCard(sc, s)
      if (card && lim.exemptCard) { if (d < lim.marginDb) lowCard.push(`${s.kind}@${s.t}:${d.toFixed(1)}`); continue }
      n++
      worst = Math.min(worst, d)
      if (d < lim.marginDb) low.push(`${s.kind}@${s.t}:${d.toFixed(1)}`)
    }
    const more = a => a.slice(0, 8).join(' ') + (a.length > 8 ? ` +${a.length - 8}` : '')
    return { pass: !low.length, value: Number.isFinite(worst) ? +worst.toFixed(2) : null, detail: `${n - low.length}/${n} cues ≥ ${lim.marginDb} dB over the music (closest ${fix(worst, 1)} dB)${low.length ? `; low: ${more(low)}` : ''}${lowCard.length ? `; card (exempt): ${more(lowCard)}` : ''}` }
  },
  B4(ctx, lim) {
    const rep = ctx.report
    const pre = rep.cueStart.filter(c => c.preroll > 0)
    const badPre = pre.filter(c => !(lim.prerollS[c.kind] != null && c.preroll <= lim.prerollS[c.kind] + 1e-6)).map(c => `${c.kind}@${c.t} pre-roll ${c.preroll}`)
    const missing = rep.cueStart.filter(c => c.start == null).map(c => `${c.kind}@${c.t}`)
    const ok = rep.cueStartMaxErrMs <= lim.maxErrMs && !badPre.length && !missing.length
    return { pass: ok, value: rep.cueStartMaxErrMs, detail: `max onset error ${rep.cueStartMaxErrMs} ms (≤ ${lim.maxErrMs}) over ${rep.cueStart.length - pre.length} cues; ${pre.length} pre-rolled${badPre.length ? `; bad pre-roll: ${badPre.join(' ')}` : ''}${missing.length ? `; silent: ${missing.join(' ')}` : ''}` }
  },
  B5(ctx, lim) {
    const P = ctx.score.anchors.P.t, music = ctx.stem('music')
    const o = lim.method === 'rise' ? riseOnset(music, P, lim.searchS) : fluxOnset(music, P, lim.searchS)
    const ms = o ? (o.t - P) * 1000 : null
    return { pass: o != null && Math.abs(ms) <= lim.maxMs + 1e-9, value: ms == null ? null : +ms.toFixed(1), detail: o ? `${lim.method} onset ${ms.toFixed(1)} ms from P (±${lim.maxMs})` : `no ${lim.method} onset within ±${lim.searchS * 1000} ms of P` }
  },
  B6(ctx, lim) {
    const L = ctx.loudOf('music.dry'), base = ctx.score.base
    let worst = Infinity, at = null
    for (let h = 29; h < L.shortTerm.length; h++) {
      const t = (h + 1) * 0.1
      if (t > base + 1e-6) break
      const v = L.shortTerm[h]
      if (v != null && !Number.isNaN(v) && v < worst) { worst = v; at = t }   // -Infinity (digital silence) counts
    }
    const below = L.integrated - worst
    return { pass: below <= lim.maxBelowLu + 1e-9, value: +below.toFixed(1), detail: `lowest short-term ${fix(worst, 1)} LUFS at ${fix(at, 1)} s, ${fix(below, 1)} LU under music.dry's ${fix(L.integrated, 1)} (≤ ${lim.maxBelowLu})` }
  },
  B7(ctx, lim) {
    const sc = ctx.score, L = ctx.loudOf('music.dry'), P = sc.anchors.P.t, base = sc.base
    const first = n => sc.sections.find(s => s.name === n)
    // mean short-term loudness sampled every 100 ms over [t0, t1]: windows ending at t (edge) or centred on t (ending at
    // t + 1.5 s, clipped at base)
    const mST = (t0, t1, centred) => {
      const v = []
      for (let t = t0; t <= t1 + 1e-9; t += 0.1) { const x = shortTermAt(L, centred ? Math.min(base, t + 1.5) : t); if (x != null) v.push(x) }
      return v.length ? mean(v) : null
    }
    const bP = sc.bars.find(x => Math.abs(x.t - P) < 0.002)
    const span = bP ? lim.dropBars * bP.beats * 60 / bP.bpm : lim.dropBars * 2
    const B = first('BUILD'), H = first('HOLD'), Dr = first('DROP')
    const bad = [], info = []
    for (const centred of [false, true]) {
      const tag = centred ? 'centred' : 'edge'
      const drop = mST(P, Math.min(base, P + span), centred)
      const build = B ? mST(B.t0, B.t1, centred) : null
      const hold = H ? mST(H.t0, H.t1, centred) : null, dropSec = Dr ? mST(Dr.t0, Dr.t1, centred) : drop
      let h1 = null, h2 = null
      if (B) { const mid = (B.t0 + B.t1) / 2; h1 = mST(B.t0, mid, centred); h2 = mST(mid, B.t1, centred) }
      if (build != null && drop != null && drop < build + lim.dropOverBuildLu - 1e-9) bad.push(`${tag}: drop ${fix(drop, 1)} < build ${fix(build, 1)} + ${lim.dropOverBuildLu}`)
      if (hold != null && dropSec != null && hold > dropSec - lim.holdUnderDropLu + 1e-9) bad.push(`${tag}: hold ${fix(hold, 1)} > drop ${fix(dropSec, 1)} - ${lim.holdUnderDropLu}`)
      if (lim.buildHalvesRise && h1 != null && h2 != null && h2 < h1 - 1e-9) bad.push(`${tag}: build 2nd half ${fix(h2, 1)} < 1st ${fix(h1, 1)}`)
      info.push(`${tag} drop-build ${fix(drop - build, 1)}${hold != null ? `, drop-hold ${fix(dropSec - hold, 1)}` : ''}${h1 != null ? `, build halves ${fix(h1, 1)}→${fix(h2, 1)}` : ''}`)
    }
    return { pass: !bad.length, detail: bad.length ? bad.join('; ') : info.join('; ') }
  },
  B8(ctx, lim) {
    const sc = ctx.score
    if (sc.anchors.L == null) return { pass: null, detail: 'no end card (no L)' }
    const mL = momentaryAt(ctx.loud, sc.anchors.L + lim.atS), mP = momentaryAt(ctx.loud, sc.anchors.P.t + lim.atS)
    const ok = mL != null && mL >= lim.minLufs - 1e-9 && (!lim.notOverPayoff || (mP != null && mL <= mP + 1e-9))
    return { pass: ok, value: mL == null ? null : +mL.toFixed(2), detail: `M(L+${lim.atS}) ${fix(mL)} LUFS (≥ ${lim.minLufs}), M(P+${lim.atS}) ${fix(mP)}` }
  },
  B9(ctx, lim) {
    const m = ctx.master, base = ctx.score.base, dur = m.L.length / SR
    let low = 0, worst = Infinity
    for (let t = base; t + lim.windowS <= dur - lim.fadeS + 1e-9; t += lim.windowS) {
      const v = db(Math.max(rmsCh(m.L, t, t + lim.windowS), rmsCh(m.R, t, t + lim.windowS)))
      worst = Math.min(worst, v)
      if (v < lim.thrDbfs) low++
    }
    const n = m.L.length, last = [m.L[n - 1], m.R[n - 1]]
    const zero = !lim.lastSampleZero || (last[0] === 0 && last[1] === 0)
    return { pass: low === 0 && zero, detail: `${low} windows under ${lim.thrDbfs} dBFS in [base, end - ${lim.fadeS}] (quietest ${fix(worst, 1)}), last sample ${last.join('/')}` }
  },
}
