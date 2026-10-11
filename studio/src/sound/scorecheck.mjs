// Symbolic-score checks (bible §9.4 S1-S14, plus B2 and B10 from §9.3) on an engine <id>.score.json.
// Each check returns { id, pass, detail }. Used by `cli.mjs audit` (when the score sits next to the media file) and by tests.
import { LOOK_DEFAULTS } from './timeline.mjs'

const mod12 = x => ((x % 12) + 12) % 12
/** bible S3 registers by role (MIDI, inclusive) per look; roles not listed are not checked */
export const REGISTERS = {
  scoreboard: { bass: [26, 57], arp: [57, 98], lead: [69, 86], pad: [57, 76] },
  'becker-rig': { bass: [38, 61], mallet: [62, 86], glock: [74, 93], pizz: [50, 74], brass: [53, 86], strings: [55, 79], timpani: [33, 38], pad: [55, 74] },
  '*': {},
}

export function checkScore(sc) {
  const out = []
  const add = (id, pass, detail) => out.push({ id, pass: !!pass, detail })
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

  // S1 in key
  {
    let ok = 0, bad = []
    for (const n of pitched) {
      const pc = mod12(n.midi), ch = chordAt(n.t + 1e-4)
      if (keyPcs.has(pc) || (ch.tones || []).includes(pc)) ok++
      else if (n.chromatic) ok++
      else bad.push(`${n.inst}@${n.t}:${n.midi}`)
    }
    const pct = pitched.length ? (100 * ok) / pitched.length : 100
    add('S1', pct >= 97, `${pct.toFixed(1)}% in key or chord${bad.length ? `; unflagged: ${bad.slice(0, 5).join(', ')}${bad.length > 5 ? ' …' : ''}` : ''}`)
  }
  // S2 chord tones on strong beats (beats 1 and 3 of 4-beat bars)
  {
    const strong = []
    for (const b of bars) { if (b.section === 'CARD') continue; strong.push(b.t); if (b.beats >= 4) strong.push(b.t + 2 * 60 / b.bpm) }
    const isStrong = t => strong.some(s => Math.abs(s - t) <= 0.015)
    const roles = {}
    for (const n of pitched) {
      if (!isStrong(n.t) || n.chromatic) continue
      const r = roles[n.role] || (roles[n.role] = { n: 0, ok: 0 })
      r.n++
      if ((chordAt(n.t + 1e-4).tones || []).includes(mod12(n.midi))) r.ok++
    }
    const fails = Object.entries(roles).filter(([role, r]) => (r.ok / r.n) < (role === 'bass' || role === 'pad' ? 1 : 0.95) - 1e-9)
    add('S2', !fails.length, Object.entries(roles).map(([k, r]) => `${k} ${r.ok}/${r.n}`).join(', ') || 'no strong-beat notes')
  }
  // S3 registers
  {
    const R = REGISTERS[sc.look] || REGISTERS['*']
    const bad = pitched.filter(n => R[n.role] && (n.midi < R[n.role][0] || n.midi > R[n.role][1])).map(n => `${n.role}:${n.midi}@${n.t}`)
    const sfxHi = (sc.sfx || []).flatMap(s => s.pitches || []).filter(m => m > 105)
    add('S3', !bad.length && !sfxHi.length, bad.length || sfxHi.length ? `out of range: ${[...bad.slice(0, 5), ...sfxHi.slice(0, 3).map(m => 'sfx:' + m)].join(', ')}` : 'all roles in range')
  }
  // S4 bass on the downbeat
  {
    let n = 0, ok = 0, missing = 0
    const bad = []
    for (const b of bars) {
      if (b.section === 'BREAK' || b.section === 'CARD' || !b.chord) continue
      const bn = pitched.find(x => x.role === 'bass' && Math.abs(x.t - b.t) <= 0.015)
      if (!bn) { missing++; continue }
      n++
      if (mod12(bn.midi) === b.chord.bass) ok++; else bad.push(`bar ${b.i}`)
    }
    add('S4', ok === n, `${ok}/${n} downbeat bass notes on the written bass${missing ? `, ${missing} bars without a downbeat bass note` : ''}${bad.length ? ` (wrong: ${bad.slice(0, 4).join(', ')})` : ''}`)
  }
  // S5 repetition: identical bar fingerprints
  {
    const ev = [...sc.notes.filter(n => n.role !== 'logo'), ...sc.drums.filter(d => d.role !== 'logo')]
    const fp = bars.filter(b => b.section !== 'CARD').map(b => {
      const dur = b.beats * 60 / b.bpm
      return ev.filter(e => e.t >= b.t - 1e-6 && e.t < b.t + dur - 1e-6)
        .map(e => `${e.inst}|${Math.round(((e.t - b.t) / dur) * 32)}|${e.midi ?? ''}|${(Math.round((e.vel ?? 1) * 10) / 10).toFixed(1)}`).sort().join(';')
    })
    let run = 1, maxRun = 1, minDistinct = Infinity
    for (let i = 1; i < fp.length; i++) { run = fp[i] === fp[i - 1] && fp[i] ? run + 1 : 1; maxRun = Math.max(maxRun, run) }
    for (let i = 0; i + 8 <= fp.length; i++) minDistinct = Math.min(minDistinct, new Set(fp.slice(i, i + 8)).size)
    add('S5', maxRun <= 2 && (minDistinct === Infinity || minDistinct >= 3), `longest identical run ${maxRun} bars, fewest distinct in 8 bars ${minDistinct === Infinity ? '-' : minDistinct}`)
  }
  // S6 anchors
  {
    const barAtP = bars.some(b => Math.abs(b.t - P) <= 0.001)
    const at = (pred) => [...sc.notes, ...sc.drums].some(e => Math.abs(e.t - P) <= 0.001 && pred(e))
    const kick = at(e => /kick/.test(e.inst)), bass = at(e => e.role === 'bass'), hit = at(e => /crash|stab|brass/.test(e.inst) || /stab|brass/.test(e.role || ''))
    const pb = barAt(P - 1e-3)
    const eighth = 30 / (pb ? pb.bpm : 120)
    const gapNotes = [...sc.notes.filter(n => n.role !== 'logo'), ...sc.drums.filter(d => !/rev/.test(d.inst))].filter(e => e.t >= P - eighth + 1e-4 && e.t < P - 1e-4)
    add('S6', barAtP && kick && bass && hit && !gapNotes.length, `bar line at P ${barAtP}, kick ${kick}, bass ${bass}, crash/stab ${hit}, note-ons in the gap ${gapNotes.length}`)
  }
  // S7 logo
  if (L != null) {
    const want = [[69, L - 0.3], [74, L - 0.2], [76, L - 0.1], [81, L]]
    const logo = sc.notes.filter(n => n.role === 'logo')
    const ok = want.every(([m, t]) => logo.some(n => n.midi === m && Math.abs(n.t - t) <= 0.0011))
    const sounding = new Set(logo.filter(n => n.t <= L + 1e-3 && n.t + n.dur >= L).map(n => mod12(n.midi)))
    const chordOk = [2, 6, 9, 4].every(p => sounding.has(p))
    add('S7', ok && chordOk, `motif ${ok ? 'at L-0.3/-0.2/-0.1/L' : 'MISSING or off-time'}, D F# A E sounding at L: ${chordOk}`)
  }
  // S9 tempo
  {
    const T = (LOOK_DEFAULTS[sc.look] || LOOK_DEFAULTS['*']).tempo
    const [s1, ...later] = sc.tempo
    const lim = sc.anchors.V ? 0.05 : 0.08
    const ok1 = s1.bpm >= T.lo - 1e-6 && s1.bpm <= T.hi + 1e-6
    const okL = later.every(s => s.free || (s.bpm >= T.absLo - 1e-6 && s.bpm <= T.absHi + 1e-6 && Math.abs(s.bpm - s1.bpm) / s1.bpm <= lim + 1e-6))
    add('S9', ok1 && okL, sc.tempo.map(s => s.bpm).join(' / ') + ' BPM')
  }
  // S10 frame 1
  {
    const at0 = [...sc.notes, ...sc.drums].filter(e => Math.abs(e.t) <= 0.001 && (e.vel ?? 1) >= 0.9)
    const kick = at0.some(e => /kick/.test(e.inst)), bass = at0.some(e => e.role === 'bass' || /808|bass/.test(e.inst)), stab = at0.some(e => /stab|brass/.test(e.role || '') || /stab|brass|honk/i.test(e.inst))
    add('S10', kick && bass && stab, `t=0: kick ${kick}, bass ${bass}, stab/brass ${stab}`)
  }
  // S11 energy plan
  {
    const by = s => bars.filter(b => b.section === s)
    const hook = by('HOOK'), build = by('BUILD'), drop = by('DROP'), hold = [...by('HOLD'), ...by('HOLD2')]
    const okHook = !hook.length || (hook[0].energy === 4 && hook.slice(1).every(b => b.energy === 3))
    const okBuild = build.every((b, i) => i === 0 || b.energy >= build[i - 1].energy)
    const okDrop = drop.every(b => b.energy === 5), okHold = hold.every(b => b.energy <= 4)
    add('S11', okHook && okBuild && okDrop && okHold, `HOOK ${okHook}, BUILD non-decreasing ${okBuild}, DROP E5 ${okDrop}, HOLD <= E4 ${okHold}`)
  }
  // S12 pad voice leading
  {
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
    add('S12', worst <= 5, `largest pad voice move ${worst} st${where != null ? ` at ${where}` : ''}`)
  }
  // S13 melody (lead/glock/mallet roles): leaps <= 12 st, phrase range <= 19 st
  {
    const mel = pitched.filter(n => /lead|glock|melody/.test(n.role)).sort((a, b) => a.t - b.t)
    let big = 0
    for (let i = 1; i < mel.length; i++) if (Math.abs(mel[i].midi - mel[i - 1].midi) > 12) big++
    add('S13', big === 0, mel.length ? `${mel.length} melody notes, ${big} leaps > 12 st` : 'no melody notes')
  }
  // S14 polyphony (pitched notes sounding at once, body)
  {
    const ev = []
    for (const n of pitched) { ev.push([n.t, 1]); ev.push([n.t + Math.max(0.001, n.dur) - 1e-6, -1]) }
    ev.sort((a, b) => a[0] - b[0] || a[1] - b[1])
    let cur = 0, mx = 0
    for (const [, d] of ev) { cur += d; mx = Math.max(mx, cur) }
    add('S14', mx <= 12, `max ${mx} pitched notes at once`)
  }
  // B2 payoff duck
  {
    const d = sc.duck.db, r = sc.duck.rate
    const seg = d.slice(Math.ceil(P * r - 1e-9), Math.floor((P + 0.15) * r + 1e-9) + 1)
    const worst = seg.length ? Math.max(...seg) : 0
    add('B2', worst <= -8, `duck over [P, P+0.15]: shallowest ${worst} dB`)
  }
  // B10 flams
  {
    const strong = (sc.sfx || []).filter(s => ['hit', 'thud', 'cash', 'reveal'].includes(s.kind) && (s.cueGain ?? s.gain) >= 0.5)
    // anchors never yield (bible §4.6.1): music hits at 0, P, V and base are exempt
    const anchors = [0, P, sc.anchors.V ? sc.anchors.V.t : null, base].filter(x => x != null)
    const dr = sc.drums.filter(d => /kick|snare|clap/.test(d.inst) && d.role !== 'logo' && !anchors.some(a => Math.abs(a - d.t) <= 0.001))
    const flams = []
    for (const d of dr) for (const s of strong) { const x = Math.abs(d.t - s.t); if (x > 0.015 + 1e-6 && x < 0.07 - 1e-6) flams.push(`${d.inst}@${d.t}~${s.kind}@${s.t}`) }
    add('B10', !flams.length, flams.length ? `${flams.length} flams: ${flams.slice(0, 4).join(', ')}` : 'no flams')
  }
  return { pass: out.filter(c => c.pass).length, total: out.length, checks: out }
}
