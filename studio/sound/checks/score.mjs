// Symbolic-score checks on an engine <id>.score.json: bible §9.4 S1-S14 and §9.3 B2, B10. Pure functions of the score;
// thresholds from sound/acceptance.json (per look: sc.look). src/sound/scorecheck.mjs re-exports checkScore, so the
// audit command, the tests and the verify harness run the same code.
import { limits, gated, load } from './acceptance.mjs'
import { sd, straightGridErr, swingGridErr } from './measure.mjs'

const mod12 = x => ((x % 12) + 12) % 12

/** S3 registers by role per look, as acceptance.json gives them (the export the old scorecheck API had) */
export const REGISTERS = Object.fromEntries(Object.keys(load().checks.S3.looks).map(look => [look, limits('S3', look).registers || {}]))

/**
 * Run every symbolic check on a score. opts.look overrides sc.look; opts.only limits the IDs.
 * Returns { pass, total, checks: [{ id, pass, gate, detail }] } (pass/total count gated checks only).
 */
export function checkScore(sc, { look = sc.look, only = null } = {}) {
  const out = []
  const want = id => !only || only.includes(id)
  const add = (id, pass, detail) => out.push({ id, pass: !!pass, gate: gated(id, look), detail })
  const L_ = id => limits(id, look)
  const base = sc.base, P = sc.anchors.P.t, L = sc.anchors.L
  const bars = sc.bars
  const barAt = t => { let b = bars[0]; for (const x of bars) if (x.t <= t + 1e-6) b = x; return b }
  // the sounding chord at t: the harmony span containing t (from base on, the logo chord D(add9))
  const H = sc.harmony || []
  const chordAt = t => {
    if (t >= base - 1e-6) return { tones: [2, 6, 9, 4], sym: 'D(add9)' }
    let h = null
    for (const x of H) if (x.t0 <= t + 1e-6) h = x
    return h || (barAt(t).chord || { tones: [] })
  }
  const body = sc.notes.filter(n => n.role !== 'logo' && n.t < base - 1e-6)
  const pitched = body.filter(n => Number.isFinite(n.midi))
  const keyPcs = new Set(sc.key.pcs)

  if (want('S1')) {
    const lim = L_('S1')
    let ok = 0
    const bad = []
    for (const n of pitched) {
      const pc = mod12(n.midi), ch = chordAt(n.t + 1e-4)
      if (keyPcs.has(pc) || (ch.tones || []).includes(pc) || n.chromatic) ok++
      else bad.push(`${n.inst}@${n.t}:${n.midi}`)
    }
    const pct = pitched.length ? (100 * ok) / pitched.length : 100
    add('S1', pct >= lim.minPct, `${pct.toFixed(1)}% in key or chord (≥ ${lim.minPct})${bad.length ? `; unflagged: ${bad.slice(0, 5).join(', ')}${bad.length > 5 ? ' …' : ''}` : ''}`)
  }
  if (want('S2')) {
    const lim = L_('S2'), tol = lim.tolMs / 1000
    const strong = []
    for (const b of bars) { if (b.section === 'CARD') continue; strong.push(b.t); if (b.beats >= 4) strong.push(b.t + 2 * 60 / b.bpm) }
    const isStrong = t => strong.some(s => Math.abs(s - t) <= tol)
    const roles = {}
    for (const n of pitched) {
      if (!isStrong(n.t) || n.chromatic) continue
      const r = roles[n.role] || (roles[n.role] = { n: 0, ok: 0 })
      r.n++
      if ((chordAt(n.t + 1e-4).tones || []).includes(mod12(n.midi))) r.ok++
    }
    const fails = Object.entries(roles).filter(([role, r]) => (100 * r.ok / r.n) < (role === 'bass' || role === 'pad' ? lim.bassPadPct : lim.otherPct) - 1e-9)
    add('S2', !fails.length, Object.entries(roles).map(([k, r]) => `${k} ${r.ok}/${r.n}`).join(', ') || 'no strong-beat notes')
  }
  if (want('S3')) {
    const lim = L_('S3'), R = lim.registers || {}
    const bad = pitched.filter(n => R[n.role] && (n.midi < R[n.role][0] || n.midi > R[n.role][1])).map(n => `${n.role}:${n.midi}@${n.t}`)
    const sfxHi = (sc.sfx || []).flatMap(s => s.pitches || []).filter(m => m > lim.sfxMaxMidi)
    add('S3', !bad.length && !sfxHi.length, bad.length || sfxHi.length ? `out of range: ${[...bad.slice(0, 5), ...sfxHi.slice(0, 3).map(m => 'sfx:' + m)].join(', ')}` : 'all roles in range')
  }
  if (want('S4')) {
    const lim = L_('S4'), tol = lim.tolMs / 1000, exempt = new Set(lim.exemptSections)
    let n = 0, ok = 0, missing = 0
    const bad = []
    for (const b of bars) {
      if (exempt.has(b.section) || !b.chord) continue
      const bn = pitched.find(x => x.role === 'bass' && Math.abs(x.t - b.t) <= tol)
      if (!bn) { missing++; continue }
      n++
      if (mod12(bn.midi) === b.chord.bass) ok++; else bad.push(`bar ${b.i}`)
    }
    add('S4', ok === n, `${ok}/${n} downbeat bass notes on the written bass${missing ? `, ${missing} bars without a downbeat bass note` : ''}${bad.length ? ` (wrong: ${bad.slice(0, 4).join(', ')})` : ''}`)
  }
  if (want('S5')) {
    const lim = L_('S5')
    const ev = [...sc.notes.filter(n => n.role !== 'logo'), ...sc.drums.filter(d => d.role !== 'logo')]
    const fp = bars.filter(b => b.section !== 'CARD').map(b => {
      const dur = b.beats * 60 / b.bpm
      return ev.filter(e => e.t >= b.t - 1e-6 && e.t < b.t + dur - 1e-6)
        .map(e => `${e.inst}|${Math.round(((e.t - b.t) / dur) * lim.gridDiv)}|${e.midi ?? ''}|${(Math.round((e.vel ?? 1) * 10) / 10).toFixed(1)}`).sort().join(';')
    })
    let run = 1, maxRun = 1, minDistinct = Infinity
    for (let i = 1; i < fp.length; i++) { run = fp[i] === fp[i - 1] && fp[i] ? run + 1 : 1; maxRun = Math.max(maxRun, run) }
    for (let i = 0; i + lim.windowBars <= fp.length; i++) minDistinct = Math.min(minDistinct, new Set(fp.slice(i, i + lim.windowBars)).size)
    add('S5', maxRun <= lim.maxIdenticalRun && (minDistinct === Infinity || minDistinct >= lim.minDistinctInWindow), `longest identical run ${maxRun} bars (≤ ${lim.maxIdenticalRun}), fewest distinct in ${lim.windowBars} bars ${minDistinct === Infinity ? '-' : minDistinct} (≥ ${lim.minDistinctInWindow})`)
  }
  if (want('S6')) {
    const tol = L_('S6').tolMs / 1000
    const barAtP = bars.some(b => Math.abs(b.t - P) <= tol)
    const at = pred => [...sc.notes, ...sc.drums].some(e => Math.abs(e.t - P) <= tol && pred(e))
    const kick = at(e => /kick/.test(e.inst)), bass = at(e => e.role === 'bass'), hit = at(e => /crash|stab|brass/.test(e.inst) || /stab|brass/.test(e.role || ''))
    const pb = barAt(P - 1e-3)
    const eighth = 30 / (pb ? pb.bpm : 120)
    const gapNotes = [...sc.notes.filter(n => n.role !== 'logo'), ...sc.drums.filter(d => !/rev/.test(d.inst))].filter(e => e.t >= P - eighth + 1e-4 && e.t < P - 1e-4)
    add('S6', barAtP && kick && bass && hit && !gapNotes.length, `bar line at P ${barAtP}, kick ${kick}, bass ${bass}, crash/stab ${hit}, note-ons in the gap ${gapNotes.length}`)
  }
  if (want('S7') && L != null) {
    const lim = L_('S7'), tol = lim.tolMs / 1000
    const logo = sc.notes.filter(n => n.role === 'logo')
    const ok = lim.motif.every(([m, dt]) => logo.some(n => n.midi === m && Math.abs(n.t - (L + dt)) <= tol))
    const sounding = new Set(logo.filter(n => n.t <= L + 1e-3 && n.t + n.dur >= L).map(n => mod12(n.midi)))
    const chordOk = lim.chordPcs.every(p => sounding.has(p))
    add('S7', ok && chordOk, `motif ${ok ? 'at L-0.3/-0.2/-0.1/L' : 'MISSING or off-time'}, D F# A E sounding at L: ${chordOk}`)
  }
  if (want('S8')) {
    const lim = L_('S8')
    const bodyEv = [...sc.notes, ...sc.drums].filter(e => e.role !== 'logo' && e.t < base)
    const bad = [], info = []
    // velocity SD per instrument
    if (lim.velSd) {
      const v = lim.velSd, ex = new Set(v.exclude || []), byInst = {}
      for (const e of bodyEv) (byInst[e.inst] ||= []).push(e.vel ?? 1)
      const sds = Object.entries(byInst).filter(([k, a]) => a.length >= v.minEvents && !ex.has(k)).map(([k, a]) => [k, sd(a)])
      const out = sds.filter(([, s]) => s < v.min || s > v.max)
      info.push(`vel SD ${out.length ? `out of ${v.min}-${v.max}: ${out.map(([k, s]) => `${k} ${s.toFixed(3)}`).join(', ')}` : `all ${sds.length} in ${v.min}-${v.max}`}${v.gate === false ? ' (reported)' : ''}`)
      if (v.gate !== false && out.length) bad.push('vel SD')
    }
    // timing of hats / shaker against the look's grid
    if (lim.timing) {
      const tm = lim.timing
      const offs = sc.drums.filter(d => d.inst === tm.inst && d.role !== 'logo').map(d => 1000 * (tm.grid === 'swing' ? swingGridErr(sc, d.t, tm.swing) : straightGridErr(sc, d.t)))
      const s = offs.length ? sd(offs) : null
      info.push(`${tm.inst} timing SD ${s == null ? '-' : s.toFixed(2)} ms (${lim.timingSdMs[0]}-${lim.timingSdMs[1]}, ${tm.grid} grid, ${offs.length} hits)`)
      if (s != null && (s < lim.timingSdMs[0] || s > lim.timingSdMs[1])) bad.push('timing')
    }
    // kick, snare and clap exactly on the grid (a drum merged onto a cue onset is exempt: §4.6.1)
    if (lim.onGrid) {
      const g = lim.onGrid, set = new Set(g.drums), tm = lim.timing || { grid: 'straight' }
      const cueT = (sc.sfx || []).map(s => s.t)
      const offs = sc.drums.filter(d => set.has(d.inst) && d.role !== 'logo' && d.t < base)
        .filter(d => !cueT.some(t => Math.abs(t - d.t) <= g.exemptOnCueMs / 1000))
        .map(d => Math.abs(1000 * (tm.grid === 'swing' ? swingGridErr(sc, d.t, tm.swing) : straightGridErr(sc, d.t))))
      const mx = offs.length ? Math.max(...offs) : 0
      info.push(`${g.drums.join('/')} max off-grid ${mx.toFixed(3)} ms (≤ ${g.maxMs})`)
      if (mx > g.maxMs) bad.push('on-grid')
    }
    add('S8', !bad.length, info.join('; '))
  }
  if (want('S9')) {
    const lim = L_('S9')
    const [s1, ...later] = sc.tempo
    const dev = sc.anchors.V ? lim.maxDevV : lim.maxDev
    const ok1 = s1.bpm >= lim.lo - 1e-6 && s1.bpm <= lim.hi + 1e-6
    const okL = later.every(s => s.free || (s.bpm >= lim.absLo - 1e-6 && s.bpm <= lim.absHi + 1e-6 && Math.abs(s.bpm - s1.bpm) / s1.bpm <= dev + 1e-6))
    add('S9', ok1 && okL, sc.tempo.map(s => s.bpm).join(' / ') + ` BPM (segment 1 in ${lim.lo}-${lim.hi}, later within ±${Math.round(dev * 100)}%)`)
  }
  if (want('S10')) {
    const lim = L_('S10'), tol = lim.tolMs / 1000
    const at0 = [...sc.notes, ...sc.drums].filter(e => Math.abs(e.t) <= tol && (e.vel ?? 1) >= lim.minVel)
    const kick = at0.some(e => /kick/.test(e.inst)), bass = at0.some(e => e.role === 'bass' || /808|bass/.test(e.inst)), stab = at0.some(e => /stab|brass/.test(e.role || '') || /stab|brass|honk/i.test(e.inst))
    add('S10', kick && bass && stab, `t=0: kick ${kick}, bass ${bass}, stab/brass ${stab}`)
  }
  if (want('S11')) {
    const lim = L_('S11')
    const by = s => bars.filter(b => b.section === s)
    const hook = by('HOOK'), build = by('BUILD'), drop = by('DROP'), hold = [...by('HOLD'), ...by('HOLD2')]
    const okHook = !hook.length || (hook[0].energy === lim.hookFirst && hook.slice(1).every(b => b.energy === lim.hookRest))
    const okBuild = build.every((b, i) => i === 0 || b.energy >= build[i - 1].energy)
    const okDrop = drop.every(b => b.energy === lim.dropEnergy), okHold = hold.every(b => b.energy <= lim.holdMax)
    add('S11', okHook && okBuild && okDrop && okHold, `HOOK ${okHook}, BUILD non-decreasing ${okBuild}, DROP E${lim.dropEnergy} ${okDrop}, HOLD <= E${lim.holdMax} ${okHold}`)
  }
  if (want('S12')) {
    const lim = L_('S12')
    const pads = pitched.filter(n => n.role === 'pad')
    const groups = new Map()
    for (const n of pads) { const k = Math.round(n.t * 1000); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(n.midi) }
    const chords = [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([t, ms]) => ({ t: t / 1000, v: ms.sort((x, y) => x - y) }))
    let worst = 0, where = null
    for (let i = 1; i < chords.length; i++) {
      const a = chords[i - 1].v, b = chords[i].v
      if (a.length !== b.length || Math.abs(chords[i].t - P) < 0.002) continue
      for (let k = 0; k < a.length; k++) { const d = Math.abs(a[k] - b[k]); if (d > worst) { worst = d; where = chords[i].t } }
    }
    add('S12', worst <= lim.maxMoveSt, `largest pad voice move ${worst} st (≤ ${lim.maxMoveSt})${where != null ? ` at ${where}` : ''}`)
  }
  if (want('S13')) {
    // leaps <= maxLeapSt; after a leap >= recoveryLeapSt the next interval turns back by <= recoveryStepSt in >= the
    // share; each phrase (split at gaps > phraseGapS) spans <= phraseRangeSt
    const lim = L_('S13'), re = new RegExp(lim.roles)
    const mel = pitched.filter(n => re.test(n.role)).sort((a, b) => a.t - b.t)
    const phrases = []
    let cur = []
    for (const n of mel) { const prev = cur[cur.length - 1]; if (prev && n.t - (prev.t + prev.dur) > lim.phraseGapS) { phrases.push(cur); cur = [] } cur.push(n) }
    if (cur.length) phrases.push(cur)
    let big = 0, leaps = 0, rec = 0, wide = 0, range = 0
    for (const ph of phrases) {
      const ms = ph.map(n => n.midi)
      const r = Math.max(...ms) - Math.min(...ms)
      range = Math.max(range, r)
      if (r > lim.phraseRangeSt) wide++
      for (let i = 1; i < ms.length; i++) {
        const d = ms[i] - ms[i - 1]
        if (Math.abs(d) > lim.maxLeapSt) big++
        if (Math.abs(d) >= lim.recoveryLeapSt && i + 1 < ms.length) { leaps++; const d2 = ms[i + 1] - ms[i]; if (Math.sign(d2) === -Math.sign(d) && Math.abs(d2) <= lim.recoveryStepSt) rec++ }
      }
    }
    add('S13', big === 0 && wide === 0 && (leaps === 0 || rec / leaps >= lim.recoveryMinShare), mel.length ? `${mel.length} melody notes in ${phrases.length} phrases: ${big} leaps > ${lim.maxLeapSt} st, widest phrase ${range} st (≤ ${lim.phraseRangeSt}), leaps recovered ${rec}/${leaps}` : 'no melody notes')
  }
  if (want('S14')) {
    const lim = L_('S14')
    const ev = []
    for (const n of pitched) { ev.push([n.t, 1]); ev.push([n.t + Math.max(0.001, n.dur) - 1e-6, -1]) }
    ev.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    let c = 0, mx = 0
    for (const [, d] of ev) { c += d; mx = Math.max(mx, c) }
    add('S14', mx <= lim.maxNotes, `max ${mx} pitched notes at once (≤ ${lim.maxNotes})`)
  }
  if (want('B2')) {
    const lim = L_('B2')
    const d = sc.duck.db, r = sc.duck.rate
    const seg = d.slice(Math.ceil(P * r - 1e-9), Math.floor((P + lim.windowS) * r + 1e-9) + 1)
    const worst = seg.length ? Math.max(...seg) : 0
    add('B2', worst <= lim.maxDb, `duck over [P, P+${lim.windowS}]: shallowest ${worst} dB (≤ ${lim.maxDb})`)
  }
  if (want('B10')) {
    const lim = L_('B10'), kinds = new Set(lim.kinds), drums = new RegExp(lim.drums.join('|'))
    const strong = (sc.sfx || []).filter(s => kinds.has(s.kind) && (s.cueGain ?? s.gain) >= lim.minGain)
    // anchors never yield (bible §4.6.1): music hits at 0, P, V and base are exempt
    const anchors = lim.exemptAnchors ? [0, P, sc.anchors.V ? sc.anchors.V.t : null, base].filter(x => x != null) : []
    const dr = sc.drums.filter(d => drums.test(d.inst) && d.role !== 'logo' && !anchors.some(a => Math.abs(a - d.t) <= 0.001))
    const flams = []
    for (const d of dr) for (const s of strong) { const x = Math.abs(d.t - s.t); if (x > lim.minMs / 1000 + 1e-6 && x < lim.maxMs / 1000 - 1e-6) flams.push(`${d.inst}@${d.t}~${s.kind}@${s.t}`) }
    add('B10', !flams.length, flams.length ? `${flams.length} flams: ${flams.slice(0, 4).join(', ')}` : 'no flams')
  }
  const g = out.filter(c => c.gate)
  return { pass: g.filter(c => c.pass).length, total: g.length, checks: out }
}
/** the IDs checkScore runs */
export const SCORE_IDS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'B2', 'B10']
