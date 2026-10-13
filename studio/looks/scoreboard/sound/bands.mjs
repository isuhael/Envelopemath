// The reference-octave model (sound bible §9.2 BANDS): what the §9.2 octaves of the delivered mix will read over
// [0, base], relative to its 1 kHz octave, predicted from compose()'s final events and the fader's cues. It renders the
// body's music by group (the engine's own voices, levels, bus trim, energy curve, the clearance's dips, the kick
// sidechain, the glue compressor, and the event duck on the glued body only: the react and logo buses never duck), the
// cues at the levels the engine will play them (fader trim, clearance lift, cluster cap after both), and the returns of
// both through the engine's own reverbs and delay (src/sound/fx.mjs; the music's sends are taken where the engine takes
// them: after the gain automation and the sidechain, before the energy curve, the glue and the duck; their returns duck
// by half the music duck). predict() sums the groups as the engine does, as signals, with their cross terms
// (crossOctaves). What it leaves out (the SFX bus compressor, the master's filters and limiter, the AAC, the cues' cross
// terms with the music) is calibrate.mjs's residual per octave (BAND_FIT). The same renders give the payoff's momentary
// loudness in the frame B8 reads (payoffPre, for logo.mjs) and the music.dry stem's 100 ms blocks (dryBlocks: B7's view
// of the BUILD, energy.mjs b7Halves).
//
// The payoff window and the delivered blocks (2026-10-13, the condensed 07a-10c): the model also keeps every part of the
// window [P - 0.05, P + 1.2 s] as a signal (the glued body and the react routes by group, the returns, the cues with the
// hit at P apart, the cues' returns with the hit's apart) and the delivery's 100 ms K-weighted blocks by part. payoffBurst
// sums the window as the engine does (the music's HP 30 Hz, the SFX bus's HP 35 Hz and its compressor keyed to the loudest
// hit, the master's HP 25 Hz and low mono, the gain estimate, the true-peak limiter): how long the limiter works more than
// 1 dB at the payoff (A11; compose.mjs payoffLevel). Without the SFX bus compressor and the music's HP it read 08a's burst
// at 0.12 s for 0.38 s measured; with them 0.36 s. rangeEst reads the delivery's loudness range (A3) from the blocks, the
// limited payoff window and the card's template (CAL.RANGE; energy.mjs RANGE).
//
// The glue (2026-10-13, after the critic's review): the engine's glue compressor (2:1, its threshold set so the DROP
// shows mix.glue.targetGr dB of gain reduction) works on the whole body bus, and how much it takes from the body's
// average depends on how much of the body sits near the DROP's level: in 02c (a 7.6 s body that is a 3.5 s TENSION
// ramp and a 1.55 s DROP) it took 0.8 dB from the music stem, in a long BUILD-led body much less. Left to BAND_FIT (a
// mean over the teasers) it put 02c's 250 Hz octave 0.85 dB over its delivery (the music carries 250 Hz, the cues own
// 1 kHz), so the model now runs the engine's own compressor (fx.mjs compress, levelPercentile) on its body.
import * as D from '../../../src/sound/dsp.mjs'
import { ltas, BANDS } from '../../../src/sound/audit.mjs'
import { fdnReverb, pingPong, sidechainCurve, compress, levelPercentile, lowMono, limitTruePeak } from '../../../src/sound/fx.mjs'
import { mix } from './mix.mjs'
import { evalDb } from './energy.mjs'
import { CAL, acceptance } from './cal.mjs'
import { kfilter, LIFT_MAX } from './balance.mjs'

const SR = 48000
/** the P stack's air (the music's reverse crash into P and its crash at P): the payoff shelf's music part */
export const AIR = ['hat', 'crash', 'revcrash']
export const isPayAir = (e, P) => (e.inst === 'crash' || e.inst === 'revcrash') && Math.abs(e.t - P) <= 0.015
/** the music groups the levers act on ('stab' has no lever: the anchor stabs at P and V are budgeted against their cues,
 * clearance.mjs stabBudget, and the engine's gain automation would reach them on the react bus too) */
export const groupOf = (e, P = -1) => (/^logo/.test(e.inst) ? 'logo' : e.inst === 'b808' ? 'b808' : e.inst === 'kick' || e.inst === 'sub' ? 'low' : e.inst === 'pad' ? (e.padHi ? 'padHi' : 'pad') : e.inst === 'stab' ? 'stab' : AIR.includes(e.inst) ? (isPayAir(e, P) ? 'payAir' : 'air') : 'mid')
export const GROUPS = ['b808', 'low', 'pad', 'padHi', 'mid', 'stab', 'air', 'payAir', 'logo']
/** a cue whose top octaves the payoff shelf reaches: a hit at P (its crash layer, sfx.mjs hit) */
export const isPayHit = (c, P) => c.kind === 'hit' && !c.inCard && Math.abs(c.t - P) <= 0.015
export const OCT = BANDS   // 31.5 .. 16000
const IDX = Object.fromEntries(BANDS.map((f, i) => [f, i]))
/** octave powers (linear, sum of the LTAS bins) of a stereo buffer over [0, n) */
export function octaves(b, n) {
  const P = ltas(b.L, b.R, 0, Math.min(n, b.L.length))
  return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * 8192 / SR); k <= Math.floor(f * Math.SQRT2 * 8192 / SR); k++) x += P[k] || 0; return x })
}
/** in-place radix-2 FFT (as src/sound/audit.mjs's, which ltas uses) */
function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1
    for (; j & bit; bit >>= 1) j ^= bit
    j ^= bit
    if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang)
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti
        const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr
      }
    }
  }
}
/**
 * crossOctaves(bufs, n) -> per octave a K x K matrix (Float64Array, row-major) of the buffers' cross powers: the LTAS
 * of the mono sum (as ltas: Hann 8192, 50% overlap, (L + R) / 2) taken apart, so that for any gains a the octave power
 * of the sum of a_i x buf_i is sum_ij a_i a_j M_ij. The diagonal is each buffer's octaves(). The engine sums the groups
 * as signals: layers that start together (the kick, the 808 and the stab on the anchors, the pad's voices on a chord
 * change) are correlated, and their octave powers do not add (02c: the summed groups read 0.3 dB under the sum of their
 * powers at 250 Hz and 0.4 dB over it at 1 kHz).
 */
export function crossOctaves(bufs, n) {
  const NF = 8192, K = bufs.length, w = new Float64Array(NF)
  for (let i = 0; i < NF; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / NF)
  const live = bufs.map(b => { if (!b) return false; for (let i = 0; i < n; i++) if (b.L[i] !== 0 || b.R[i] !== 0) return true; return false })
  const ks = BANDS.map(f => [Math.ceil(f / Math.SQRT2 * NF / SR), Math.min(NF / 2, Math.floor(f * Math.SQRT2 * NF / SR))])
  const M = BANDS.map(() => new Float64Array(K * K))
  const re = bufs.map(() => new Float64Array(NF)), im = bufs.map(() => new Float64Array(NF))
  let frames = 0
  for (let s = 0; s + NF <= n; s += NF / 2) {
    for (let g = 0; g < K; g++) {
      if (!live[g]) continue
      const b = bufs[g], r = re[g], q = im[g]
      for (let i = 0; i < NF; i++) { r[i] = 0.5 * (b.L[s + i] + b.R[s + i]) * w[i]; q[i] = 0 }
      fft(r, q)
    }
    for (let o = 0; o < BANDS.length; o++) {
      const [k0, k1] = ks[o], m = M[o]
      for (let g = 0; g < K; g++) {
        if (!live[g]) continue
        const rg = re[g], ig = im[g]
        for (let h = g; h < K; h++) {
          if (!live[h]) continue
          const rh = re[h], ih = im[h]
          let x = 0
          for (let k = k0; k <= k1; k++) x += rg[k] * rh[k] + ig[k] * ih[k]
          m[g * K + h] += x
        }
      }
    }
    frames++
  }
  for (const m of M) for (let g = 0; g < K; g++) for (let h = g; h < K; h++) { m[g * K + h] /= Math.max(1, frames); m[h * K + g] = m[g * K + h] }
  return M
}
/** piecewise-linear dB points -> value at t (held outside) */
function ptsAt(pts, t) {
  if (!pts || !pts.length) return 0
  if (t <= pts[0].t) return pts[0].db
  if (t >= pts[pts.length - 1].t) return pts[pts.length - 1].db
  let lo = 0, hi = pts.length - 1
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pts[m].t <= t) lo = m; else hi = m }
  const a = pts[lo], b = pts[hi]
  return a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t)
}
/** the engine's duck curve (fx.mjs duckCurve: 5 ms lookahead, held, exponential release; the deepest wins) at 100 Hz */
function duckCurve(events, K) {
  const d = new Float64Array(K)
  for (const e of events) {
    if (!(e.depth > 0)) continue
    const att = e.attack, t0 = att != null ? e.t : e.t - 0.005, tPeak = att != null ? e.t + att : e.t
    const tHold = Math.max(e.t + (e.hold || 0), e.until ?? -Infinity)
    for (let k = Math.max(0, Math.floor(t0 * 100)); k < K; k++) {
      const t = k / 100
      const v = t < tPeak ? -e.depth * (t - t0) / Math.max(1e-6, tPeak - t0) : t <= tHold ? -e.depth : -e.depth * Math.exp(-(t - tHold) / Math.max(1e-3, e.release))
      if (t > tHold && v > -0.01) break
      if (v < d[k]) d[k] = v
    }
  }
  return d
}
/** applyDip (instruments.mjs) on a copy: the 808 notes' clearance dips */
function dipGain(dips, t) {
  let db = 0
  for (const dip of dips) {
    const d = t < dip.at - 0.01 ? 0 : t < dip.at ? dip.depth * (t - dip.at + 0.01) / 0.01 : t < dip.at + dip.hold ? dip.depth : dip.depth * Math.exp(-(t - dip.at - dip.hold) / dip.release)
    db += d
  }
  return Math.pow(10, -db / 20)
}
/**
 * model(tl, { er, musicDb, gain, duckEvents, cues }) -> { music, ret, cues, cret, kp, pay, N }: the octaves (over
 * [0, base]) of the music by lever group, of each group's returns, of the cues and of their returns; the music's
 * K-weighted power by group (leverLoudness) and the payoff's B8 frame (payoffPre).
 * er: eventRenderer of the final events; gain: compose's automation.gain (dips, give-way); duckEvents: the duck events
 * the engine will build (cue ducks, automation.duck, the payoff duck); cues: [{ c, buf, g, meta }] the cues at their
 * final level, meta.sends the sends the wrapper gave them (sfx.mjs sendsFor, the sends lever at 0).
 */
export function model(tl, { er, musicDb, gain = {}, duckEvents = [], cues = [], extra = [] }) {
  const base = tl.base, N = Math.max(8192, Math.round(base * SR)), P = tl.anchors.P.t
  const K = Math.ceil(base * 100) + 2
  const dk = duckCurve(duckEvents, K)
  const duckAt = i => { const k = i / 480, k0 = Math.min(K - 1, Math.floor(k)), k1 = Math.min(K - 1, k0 + 1); return dk[k0] + (dk[k1] - dk[k0]) * (k - k0) }
  // per group: the glued body (the music bus: musicDb, the glue, then the duck) and, where a group has any, the voices
  // on another route (the react bus via the logo path: no musicDb, no glue, no duck)
  const G = Object.fromEntries(GROUPS.map(g => [g, D.stereo(N)])), F = {}
  // the sends, by lever group and return path ('music' returns duck by half the music duck, 'free' ones do not)
  const SEND = {}
  const sendBuf = (g, path, k) => ((SEND[g] = SEND[g] || {})[path] = SEND[g][path] || {})[k] || (SEND[g][path][k] = D.stereo(N))
  // the kick sidechain (mix.sidechain): the engine pumps its targets on the music's kicks, before the sends
  const sc = mix.sidechain
  const kicks = er.all.filter(x => (sc?.triggers || ['kick']).includes(x.e.inst)).map(x => x.e.t)
  const scDb = sc ? sidechainCurve(N, kicks, sc) : null
  for (const x of er.all) {
    const e = x.e
    if (e.t >= base) continue
    if (x.bus === 'logo') continue
    const b = er.render(x)
    if (!b) continue
    const grp = groupOf(e, P), glued = !!x.route.glue
    // the anchor stabs were rendered before their budget (clearance.mjs stabBudget): the stab is linear in velocity
    const vk = e.inst === 'stab' && b.vel0 > 0 && e.vel != null ? e.vel / b.vel0 : 1
    const dst = glued ? G[grp] : (F[grp] = F[grp] || D.stereo(N))
    const lvl0 = D.dbToGain(mix.levels[e.inst] ?? 0)
    const at = Math.round(e.t * SR) - (b.offset || 0)
    const gp = gain[e.inst], dips = e.inst === 'b808' && e.dips ? e.dips : null
    const pump = scDb && x.route.sidechain && (sc.targets || []).includes(e.inst)
    const sends = Object.entries(mix.sends[e.inst] || {}).filter(([, db]) => db > -120).map(([k, db]) => [sendBuf(grp, x.route.sends === 'free' ? 'free' : 'music', k.toUpperCase()), D.dbToGain(db)])
    for (let i = Math.max(0, at); i < Math.min(N, at + b.L.length); i++) {
      const t = i / SR
      let pre = 0, db = 0
      if (gp) pre += ptsAt(gp, t)
      if (pump) pre += scDb[i]
      if (x.route.musicDb) db += evalDb(musicDb, t)
      // the glued body takes its duck after the glue (below)
      if (x.route.duck && !glued) db += duckAt(i)
        let g0 = lvl0 * vk * Math.pow(10, pre / 20)
      if (dips) g0 *= dipGain(dips, t - e.t)
      const g = g0 * x.fader * Math.pow(10, db / 20)
      const l = b.L[i - at], r = b.R[i - at]
      dst.L[i] += l * g; dst.R[i] += r * g
      for (const [sb, sg] of sends) { sb.L[i] += l * g0 * sg; sb.R[i] += r * g0 * sg }
    }
  }
  // the card's pre-roll (extra: [{ e, buf }], the logo bus: no musicDb, glue or duck): the sting's swell ends at L, 0.36 s
  // after base, so its first 0.24 s sound inside the body, which a 7.6 s body reads as 3% of its length (the 16 kHz
  // octave of the short bodies read 0.5-0.7 dB over the model without it)
  for (const { e, buf } of extra) {
    if (!buf) continue
    const dst = (F.logo = F.logo || D.stereo(N)), g = D.dbToGain(mix.levels[e.inst] ?? 0) * D.dbToGain(mix.logo || 0)
    const at = Math.round(e.t * SR) - (buf.offset || 0)
    for (let i = Math.max(0, at); i < Math.min(N, at + buf.L.length); i++) { dst.L[i] += buf.L[i - at] * g; dst.R[i] += buf.R[i - at] * g }
  }
  // the glue (engine.mjs: one detector over the body bus, its threshold targetGr x ratio / (ratio - 1) under the DROP's
  // 75th-percentile peak level), then the duck on the body; the music.dry stem is the glued body before the duck plus
  // the other routes (B7 reads its short-term loudness: dryBlocks)
  const det = D.stereo(N)
  for (const g of GROUPS) for (let i = 0; i < N; i++) { det.L[i] += G[g].L[i]; det.R[i] += G[g].R[i] }
  const nb = Math.round(base * SR)
  const gl = mix.glue
  let glueGain = null
  if (gl && gl.ratio > 1) {
    const dr = tl.section('DROP') || { t0: 0, t1: Math.min(base, 4) }
    const thr = levelPercentile(det, Math.round(dr.t0 * SR), Math.round(dr.t1 * SR), 0.75) - gl.targetGr * gl.ratio / (gl.ratio - 1)
    const { gr } = compress(det, { threshold: thr, ratio: gl.ratio, attack: gl.attack, release: gl.release, knee: gl.knee })
    glueGain = new Float32Array(N)
    for (let i = 0; i < N; i++) glueGain[i] = Math.pow(10, -gr[i] / 20)
  }
  const n = nb
  // music.dry's 100 ms K-weighted blocks: the sum (exact) and by group (dryBlocks scales the sum by the levers through
  // them). Both are taken after the glue (engine.mjs: musicDry is the glued body plus the react and logo buses)
  const dry = D.stereo(N)
  const out = { music: {}, ret: {}, kp: {}, N, dry: { sum: null, g: {} }, mix: { g: {}, f: {} } }
  // the delivered mix's 100 ms blocks (rangeEst, A3): the glued, ducked body (which the energy curve moves) apart from
  // the react and logo routes (which it does not), by group and summed
  const MG = D.stereo(N), MF = D.stereo(N)
  for (const g of GROUPS) {
    const b = G[g], f = F[g]
    if (glueGain) for (let i = 0; i < N; i++) { b.L[i] *= glueGain[i]; b.R[i] *= glueGain[i] }
    if (f) for (let i = 0; i < N; i++) { b.L[i] += f.L[i]; b.R[i] += f.R[i] }
    out.dry.g[g] = blocksOf(b, n)
    for (let i = 0; i < N; i++) { dry.L[i] += b.L[i]; dry.R[i] += b.R[i] }
    // the duck takes the glued body only: the react and logo buses never duck (engine.mjs, routing.mjs). Until
    // 2026-10-13 the model ducked them too, so the stab at P sat under the payoff duck (the payoff frame read 0.5-1.1 dB
    // low) and the reverse crash into P under the gap's duck (the 16 kHz octave read 0.4-1.1 dB low, most in the short
    // bodies); CAL.BAND_FIT, the top-octave cue weight of then (BAND_REF.w16) and PAY_LOSS/PAY_HIT carried the mean of
    // it and BAND_SD the rest
    for (let i = 0; i < N; i++) {
      const q = Math.pow(10, duckAt(i) / 20)
      if (f) { b.L[i] = (b.L[i] - f.L[i]) * q + f.L[i]; b.R[i] = (b.R[i] - f.R[i]) * q + f.R[i] } else { b.L[i] *= q; b.R[i] *= q }
    }
    const gd = f ? { L: b.L.map((v, i) => v - f.L[i]), R: b.R.map((v, i) => v - f.R[i]) } : b
    out.mix.g[g] = blocksOf(gd, n)
    if (f) out.mix.f[g] = blocksOf(f, n)
    for (let i = 0; i < N; i++) { MG.L[i] += gd.L[i]; MG.R[i] += gd.R[i] }
    if (f) for (let i = 0; i < N; i++) { MF.L[i] += f.L[i]; MF.R[i] += f.R[i] }
  }
  out.mix.sumG = blocksOf(MG, n)
  out.mix.sumF = blocksOf(MF, n)
  out.dry.sum = blocksOf(dry, n)
  // CS: the cues' sends by reverb; CSP: the hit at P's (the payoff hall lever moves them, lv.payHall)
  const S = D.stereo(N), SP = D.stereo(N), CS = {}, CSP = {}
  for (const { c, buf, g, meta } of cues) {
    if (c.inCard || c.t >= base) continue
    const st = buf.L ? buf : { L: buf, R: buf }, at = Math.round(c.t * SR) - (buf.offset || 0)
    const dst = isPayHit(c, P) ? SP : S, cs = isPayHit(c, P) ? CSP : CS
    const sends = Object.entries((meta && meta.sends) || mix.sfxSends[c.kind] || {}).filter(([, db]) => db > -120).map(([k, db]) => [cs[k.toUpperCase()] || (cs[k.toUpperCase()] = D.stereo(N)), D.dbToGain(db)])
    for (let j = Math.max(0, -at); j < st.L.length && at + j < N; j++) {
      const l = st.L[j] * g, r = st.R[j] * g
      dst.L[at + j] += l; dst.R[at + j] += r
      for (const [sb, sg] of sends) { sb.L[at + j] += l * sg; sb.R[at + j] += r * sg }
    }
  }
  // the returns: the engine's reverbs (tail 0: the body's own span) and its ping-pong delay, the music's ducked by half
  // the music duck, all through the returns trim (mix.returns)
  const RT = D.dbToGain(mix.returns || 0), dl = mix.delay || {}
  const wet = (sb, k) => (k === 'DELAY'
    ? (() => { const o = pingPong(sb, i => tl.beatLen(i / SR) * (dl.beats ?? 0.75), { ...dl, tail: 0 }), q = D.dbToGain(dl.returnDb ?? -14); return { L: o.L.subarray(0, N).map(v => v * q), R: o.R.subarray(0, N).map(v => v * q) } })()
    : fdnReverb(sb, k, { tail: 0 }))
  const RB = {}
  for (const g of GROUPS) {
    const R = D.stereo(N)
    for (const [path, ks] of Object.entries(SEND[g] || {})) for (const [k, sb] of Object.entries(ks)) {
      const w = wet(sb, k)
      for (let i = 0; i < N; i++) { const q = RT * (path === 'music' ? Math.pow(10, 0.5 * duckAt(i) / 20) : 1); R.L[i] += w.L[i] * q; R.R[i] += w.R[i] * q }
    }
    out.ret[g] = octaves(R, n)
    RB[g] = R
  }
  const CR = D.stereo(N), CRP = D.stereo(N)
  for (const [k, sb] of Object.entries(CS)) { const w = wet(sb, k); for (let i = 0; i < N; i++) { CR.L[i] += w.L[i] * RT; CR.R[i] += w.R[i] * RT } }
  for (const [k, sb] of Object.entries(CSP)) { const w = wet(sb, k); for (let i = 0; i < N; i++) { CRP.L[i] += w.L[i] * RT; CRP.R[i] += w.R[i] * RT } }
  out.cretPay = octaves(CRP, n)
  for (let i = 0; i < N; i++) { CR.L[i] += CRP.L[i]; CR.R[i] += CRP.R[i] }
  out.cret = octaves(CR, n)
  // the delivered mix's blocks, the rest: the returns by group, the cues (the hit at P with them) and their returns
  for (const g of GROUPS) out.mix[`r:${g}`] = blocksOf(RB[g], n)
  {
    out.mix.cues = blocksOf(S, n)
    out.mix.hit = blocksOf(SP, n)
    out.mix.cret = blocksOf(CR, n)
    out.mix.cretHit = blocksOf(CRP, n)
  }
  // the payoff window [P - PW_PRE, P + PW_POST] of every part, raw (pre-master), for the limiter estimate (payoffBurst):
  // the music by group (glued, ducked, plus its react route), its returns by group, the cues (the hit at P apart: the
  // payoff shelf and the SFX bus compressor's reference), the cues' returns; and the compressor's reference, the loudest
  // hit's peak at its level, as the engine takes it (engine.mjs: the SFX bus compressor gives it SC.maxGr)
  {
    const p0 = Math.max(0, Math.floor((P - PW_PRE) * 10) * 4800), p1 = Math.min(N, Math.ceil((P + PW_POST) * 10) * 4800)
    const sl = b => ({ L: b.L.slice(p0, p1), R: b.R.slice(p0, p1) })
    let ref = 0
    for (const { c, buf } of cues) {
      if (c.kind !== 'hit' || c.inCard) continue
      const st = buf.L ? buf : { L: buf, R: buf }
      let pk = 0
      for (let j = 0; j < st.L.length; j++) pk = Math.max(pk, Math.abs(st.L[j]), Math.abs(st.R[j]))
      ref = Math.max(ref, pk * c.gain)
    }
    out.pw = { t0: p0 / SR, h0: p0 / 4800, glued: {}, react: {}, ret: {}, cues: sl(S), cuesPay: sl(SP), cret: sl(CR), cretPay: sl(CRP), hitRef: ref }
    for (const g of GROUPS) {
      const f = F[g], b = sl(G[g])
      if (f) { const r = sl(f); for (let i = 0; i < r.L.length; i++) { b.L[i] -= r.L[i]; b.R[i] -= r.R[i] } out.pw.react[g] = r }
      out.pw.glued[g] = b
      out.pw.ret[g] = sl(RB[g])
    }
  }
  // the payoff's B8 frame: the 400 ms K-weighted window ending on the meter's hop nearest P + 0.2 s, each group filtered
  // from 1 s before it (the K filter settles), so payoffPre can sum them with the levers' gains
  const fe = Math.round((P + 0.2) / 0.1) * 0.1
  const w1 = Math.min(N, Math.round(fe * SR)), wn = Math.round(0.4 * SR), w0 = Math.max(0, w1 - wn - SR)
  const kwin = b => { const o = {}; for (const ch of ['L', 'R']) o[ch] = kfilter(b[ch].subarray(w0, w1)).subarray(Math.max(0, w1 - w0 - wn)); return o }
  const raw = b => ({ L: b.L.slice(w1 - wn, w1), R: b.R.slice(w1 - wn, w1) })
  // the hit at P apart (the payoff budget's lever, lv.payHit)
  out.pay = { music: {}, cues: kwin(S), hit: kwin(SP), raw: { music: {}, cues: raw(S), hit: raw(SP) } }
  for (let i = 0; i < N; i++) { S.L[i] += SP.L[i]; S.R[i] += SP.R[i] }
  for (const g of GROUPS) { out.pay.music[g] = kwin(G[g]); out.pay.raw.music[g] = raw(G[g]) }
  const kpow = b => { let e = 0; for (const ch of ['L', 'R']) { const y = kfilter(b[ch].subarray(0, n)); for (let i = 0; i < n; i++) e += y[i] * y[i] } return e / n }
  for (const g of GROUPS) { out.music[g] = octaves(G[g], n); out.kp[g] = kpow(G[g]) }
  // the groups (each its music and its returns, which one lever moves together) with their cross terms, per octave
  for (const g of GROUPS) { const R = RB[g]; for (let i = 0; i < N; i++) { R.L[i] += G[g].L[i]; R.R[i] += G[g].R[i] } }
  out.xm = crossOctaves(GROUPS.map(g => RB[g]), n)
  out.cues = octaves(S, n)
  out.cuesPay = octaves(SP, n)
  return out
}
/** the payoff window the model keeps (s before and after P, on the 100 ms block grid): the hit's body and the halls
 * ring for about a second */
export const PW_PRE = 0.05, PW_POST = 1.2
/** a lever's linear gain on a group (dB -> amplitude) */
const ampOf = (g, lv) => Math.pow(10, leverDbOf(g, lv) / 20)
/**
 * The payoff window as the engine sums it (payoffBurst, rangeEst): the music by group at the levers' gains, the glued
 * body with the energy curve's extra lift (liftAt(t) dB, the range lift) and through the engine's HP 30 Hz with the react
 * routes, the returns by group, the cues through the SFX bus (HP 35 Hz, the compressor whose reference is the loudest
 * hit: engine.mjs gives it SC.maxGr) with the hit at P at the payoff budget (lv.payHit), the cues' returns. -> stereo
 * buffer, pre-master
 */
function payoffSum(m, lv = {}, liftAt = null) {
  const W = m.pw, n = W.cues.L.length, sum = D.stereo(n)
  for (const g of GROUPS) {
    const k = ampOf(g, lv)
    const b = W.glued[g]
    if (b) for (let i = 0; i < n; i++) { const q = liftAt ? k * Math.pow(10, liftAt(W.t0 + i / SR) / 20) : k; sum.L[i] += b.L[i] * q; sum.R[i] += b.R[i] * q }
    const r = W.react[g]
    if (r) for (let i = 0; i < n; i++) { sum.L[i] += r.L[i] * k; sum.R[i] += r.R[i] * k }
  }
  D.filter(sum, 'hp', 30, { q: 0.7071 })
  for (const g of GROUPS) { const b = W.ret[g], k = ampOf(g, lv); if (b) for (let i = 0; i < n; i++) { sum.L[i] += b.L[i] * k; sum.R[i] += b.R[i] * k } }
  const kh = Math.pow(10, (lv.payHit || 0) / 20), sfx = D.stereo(n)
  // the DROP's cues ride the lift (sfx.mjs rangeCueDb), the hit at P keeps the payoff's level (lv.payHit)
  const cueUp = i => (liftAt ? Math.pow(10, liftAt(W.t0 + i / SR) / 20) : 1)
  for (let i = 0; i < n; i++) { const q = cueUp(i); sfx.L[i] = W.cues.L[i] * q + W.cuesPay.L[i] * kh; sfx.R[i] = W.cues.R[i] * q + W.cuesPay.R[i] * kh }
  D.filter(sfx, 'hp', 35, { q: 0.7071 })
  const SC = mix.sfxComp
  // the compressor in place, its threshold from the loudest hit (the hit at P with its budget when it is the loudest)
  if (SC && W.hitRef > 0) compress(sfx, { threshold: 20 * Math.log10(W.hitRef) - SC.maxGr * SC.ratio / (SC.ratio - 1), ratio: SC.ratio, attack: SC.attack, release: SC.release, knee: SC.knee })
  // the cues' returns: the hit at P's at its level and its hall (lv.payHit + lv.payHall), the rest riding the lift
  const kpr = Math.pow(10, ((lv.payHit || 0) + (lv.payHall || 0)) / 20)
  for (let i = 0; i < n; i++) {
    const q = cueUp(i), pl = W.cretPay ? W.cretPay.L[i] : 0, pr = W.cretPay ? W.cretPay.R[i] : 0
    sum.L[i] += sfx.L[i] + (W.cret.L[i] - pl) * q + pl * kpr; sum.R[i] += sfx.R[i] + (W.cret.R[i] - pr) * q + pr * kpr
  }
  return sum
}
/**
 * payoffBurst(m, lv, { gainDb, ceiling, liftAt }) -> { s, maxGr, out }: how long (s) the master's true-peak limiter works
 * more than 1 dB in the payoff window and its deepest gain reduction: payoffSum through the master (HP 25 Hz, low mono
 * 120 Hz, the gain the master will apply, gainDb: logo.mjs gainEst) into the engine's limiter at `ceiling`. `out` is the
 * limited window at the master's level. A11 counts the samples over 1 dB in the whole file: a short body's payoff burst is
 * most of them (08a on its fresh record: 0.48 of 0.51 s, 3.1% of 16.4 s).
 */
export function payoffBurst(m, lv = {}, { gainDb = 0, ceiling = -1.5, liftAt = null } = {}) {
  if (!m || !m.pw) return null
  const sum = payoffSum(m, lv, liftAt), n = sum.L.length
  D.filter(sum, 'hp', 25, { q: 0.7071 }); lowMono(sum, 120)
  const G = Math.pow(10, gainDb / 20)
  for (let i = 0; i < n; i++) { sum.L[i] *= G; sum.R[i] *= G }
  const { out, gr } = limitTruePeak(sum, { ceiling })
  let over = 0, mx = 0
  for (let i = 0; i < n; i++) { if (gr[i] > 1) over++; if (gr[i] > mx) mx = gr[i] }
  return { s: over / SR, maxGr: mx, out }
}
/**
 * The delivered body's 100 ms K-weighted block energies over [0, base] (pre-master) with the level levers and the range
 * lift (liftAt(t) dB on the glued body): the glued body's exact sum scaled block by block by how the levers move its
 * groups, the react routes, the returns (each group's at its lever), the cues (the hit at P at lv.payHit) and their
 * returns (the sends lever). The parts' cross terms are left out (they share no 100 ms block's phase). rangeEst replaces
 * the payoff window's blocks with the limited window (payoffBurst), where the SFX bus compressor and the limiter work.
 */
export function mixBlocks(m, lv = {}, liftAt = null) {
  if (!m || !m.mix || !m.mix.sumG) return null
  const X = m.mix, H = X.sumG.length, out = new Float64Array(H), sk = Math.pow(10, (lv.sends || 0) / 10), kh = Math.pow(10, (lv.payHit || 0) / 10), kp = Math.pow(10, ((lv.payHit || 0) + (lv.payHall || 0)) / 10)
  const k = Object.fromEntries(GROUPS.map(g => [g, Math.pow(10, leverDbOf(g, lv) / 10)]))
  for (let h = 0; h < H; h++) {
    let a = 0, b = 0, r = 0
    for (const g of GROUPS) { const e = X.g[g] ? X.g[g][h] : 0; a += e; b += e * k[g]; r += (X[`r:${g}`] ? X[`r:${g}`][h] : 0) * k[g] }
    const up = liftAt ? Math.pow(10, liftAt((h + 0.5) / 10) / 10) : 1
    // the DROP's cues ride the lift (sfx.mjs rangeCueDb), the hit at P apart
    const cr = (X.cret[h] - (X.cretHit ? X.cretHit[h] : 0)) * sk * up + (X.cretHit ? X.cretHit[h] * sk * kp : 0)
    out[h] = (a > 0 ? X.sumG[h] * b / a : X.sumG[h]) * up + X.sumF[h] + r + X.cues[h] * up + cr + X.hit[h] * kh
  }
  return out
}
/**
 * rangeEst(m, lv, { liftAt, gainDb, sting, card, fit }) -> the delivery's loudness range (A3, LU) as the meter reads it
 * (Tech 3342: 3 s windows every 100 ms, gated -70 / -20, 95th minus 10th percentile), predicted: the body's blocks
 * (mixBlocks, the payoff window limited by payoffBurst) at the master's level plus CAL.RANGE.body (what the AAC and the
 * meter's phase take), then the card: CAL.RANGE.card, the card's blocks relative to the sting's true level at L + 0.2
 * (the card is the same in every teaser but its level, which logo.mjs sets: `sting`, LUFS), from the first block that
 * ends after base. Plus CAL.RANGE.fit, the mean residual. Without a card template it returns null.
 */
export function rangeEst(m, lv = {}, { liftAt = null, gainDb = 0, sting = null, durationS = null, ceiling = -1.5 } = {}) {
  const R = CAL.RANGE
  if (!R || !R.card || sting == null || !m || !m.mix) return null
  const body = mixBlocks(m, lv, liftAt)
  if (!body) return null
  const G = Math.pow(10, gainDb / 10), off = Math.pow(10, (R.body || 0) / 10)
  const e = Array.from(body, v => v * G * off)
  // the payoff window as the limiter leaves it
  const pb = payoffBurst(m, lv, { gainDb, ceiling, liftAt })
  if (pb && m.pw) {
    const y = { L: kfilter(pb.out.L), R: kfilter(pb.out.R) }, h0 = Math.round(m.pw.h0)
    for (let j = 0; (j + 1) * 4800 <= y.L.length; j++) {
      const h = h0 + j
      if (h < 0 || h >= e.length) continue
      let s = 0
      for (let i = j * 4800; i < (j + 1) * 4800; i++) s += y.L[i] * y.L[i] + y.R[i] * y.R[i]
      e[h] = (s / 4800) * off
    }
  }
  const Hc = Math.floor(((durationS ?? 0) - m.N / SR) * 10 + 1e-6)
  for (let k = 0; k < Math.max(Hc, 0) && k < R.card.length; k++) e.push(Math.pow(10, (sting + R.card[k] + 0.691) / 10))
  const st = []
  for (let h = 29; h < e.length; h++) { let s = 0; for (let k = h - 29; k <= h; k++) s += e[k]; st.push(s / 30) }
  const LUk = x => (x > 0 ? -0.691 + 10 * Math.log10(x) : -Infinity)
  const a = st.filter(x => LUk(x) > -70)
  if (!a.length) return null
  const thr = LUk(a.reduce((x, y) => x + y, 0) / a.length) - 20
  const g = a.filter(x => LUk(x) > thr).map(LUk).sort((x, y) => x - y)
  const pct = p => g[Math.min(g.length - 1, Math.max(0, Math.round((p / 100) * (g.length - 1))))]
  return pct(95) - pct(10) + (R.fit || 0)
}
/** music.dry's 100 ms K-weighted block energies with the level levers applied: the exact sum, scaled block by block by
 * how the levers move the groups' energies (the groups' cross terms are left out of that ratio only) */
export function dryBlocks(m, lv = {}) {
  if (!m || !m.dry) return null
  const S = m.dry.sum, out = new Float64Array(S.length)
  for (let h = 0; h < S.length; h++) {
    let a = 0, b = 0
    for (const g of GROUPS) { const e = m.dry.g[g] ? m.dry.g[g][h] : 0; a += e; b += e * Math.pow(10, leverDbOf(g, lv) / 10) }
    out[h] = a > 0 ? S[h] * b / a : S[h]
  }
  return out
}
/** the 100 ms K-weighted block energies of a stereo buffer over [0, n) (BS.1770: the channels summed): the momentary
 * and short-term windows are means of 4 and 30 consecutive blocks */
function blocksOf(b, n) {
  const H = Math.floor(n / 4800), e = new Float64Array(H)
  for (const ch of ['L', 'R']) { const y = kfilter(b[ch].subarray(0, n)); for (let h = 0; h < H; h++) { let s = 0; for (let i = h * 4800; i < (h + 1) * 4800; i++) s += y[i] * y[i]; e[h] += s / 4800 } }
  return e
}
/**
 * predict(m, levers) -> { 31.5: dB re 1 kHz, ... } for the delivery, with the levers applied ({ sends, b808, mid,
 * padHi, padLo, air16, pay16 } dB): each group's music and returns at its lever's gain (a shelf at 10 kHz: in full at
 * 16 kHz, half at 8 kHz; air16 on the body's hats and crashes, pay16 on the P stack: the music's crash and reverse crash
 * at P and a hit's crash layer at P), the cues and their returns (the sends lever scales the returns) at CAL.BAND_REF.w
 * (the SFX bus compressor and HP), plus CAL.BAND_FIT, the measured residual per octave. calibrate.mjs fits them. One
 * weight serves every octave since 2026-10-13: a top-octave weight of its own (R.w16, the 8 and 16 kHz octaves, which
 * `predict` still takes when R holds one: calibrate.mjs --per tries it) was degenerate with BAND_FIT 8000/16000 (the
 * cues' share of the top octaves is about the same in every teaser) and wandered 0.81-1.13 from round to round.
 */
const shelfDb = (db, f) => (!db ? 0 : f >= 11000 ? db : f >= 5000 ? db / 2 : 0)
export function predict(m, lv = {}, R = CAL.BAND_REF || { w: 1 }, F = CAL.BAND_FIT || {}) {
  const pw = BANDS.map((f, o) => {
    let mu = 0
    const dbOf = g => leverDbOf(g, lv) + (g === 'air' ? shelfDb(lv.air16, f) : g === 'payAir' ? shelfDb(lv.pay16, f) : 0)
    if (m.xm) {
      // the groups summed as signals: sum_ij a_i a_j M_ij (crossOctaves)
      const a = GROUPS.map(g => Math.pow(10, dbOf(g) / 20)), X = m.xm[o], K = GROUPS.length
      for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) mu += a[i] * a[j] * X[i * K + j]
    } else for (const g of GROUPS) {
      if (!m.music[g]) continue
      mu += Math.pow(10, dbOf(g) / 10) * (m.music[g][o] + (m.ret && m.ret[g] ? m.ret[g][o] : 0))
    }
    const cu = m.cues[o] + (m.cuesPay ? m.cuesPay[o] * (Math.pow(10, (shelfDb(lv.pay16, f) + (lv.payHit || 0)) / 10) - 1) : 0)
    const w = f >= 5000 ? (R.w16 ?? R.w ?? 1) : (R.w ?? 1)
    // the hit at P's returns at its level and its hall (lv.payHit + lv.payHall)
    const cr = (m.cret ? m.cret[o] : 0) + (m.cretPay ? m.cretPay[o] * (Math.pow(10, ((lv.payHit || 0) + (lv.payHall || 0)) / 10) - 1) : 0)
    return mu + w * (cu + cr * Math.pow(10, (lv.sends || 0) / 10))
  })
  const ref = pw[IDX[1000]]
  return Object.fromEntries(BANDS.map((f, o) => [f, 10 * Math.log10(pw[o] / ref) + (F[f] || 0)]))
}
/** the model of each timeline compose() made (calibrate.mjs reads it) */
const MODELS = new WeakMap()
export const modelFor = tl => MODELS.get(tl) || null
export const keepModel = (tl, m) => MODELS.set(tl, m)

// ---------------------------------------------------------------- the band guard
// The §9.2 windows are read from sound/acceptance.json (BANDS, looks.scoreboard), the only place that holds them (§9.0).
let WIN = null
export function bandWindows() {
  if (WIN) return WIN
  try { WIN = ((acceptance().checks.BANDS.looks || {}).scoreboard || {}).bands || {} } catch { WIN = {} }
  return WIN
}
/**
 * How far inside its window the guard aims each octave it watches (dB): the margin the delivery should keep
 * (BAND_MARGIN) plus BAND_K times the model's measured spread for that octave (calibration.json BAND_SD: what the
 * model leaves out differs by teaser, the AAC encoder's top octave included: 02c's 16 kHz fell 0.4 dB from WAV to
 * AAC, 02b's none), never less than BAND_AIM_MIN
 */
export const BAND_MARGIN = 0.5, BAND_K = 3, BAND_AIM_MIN = 0.9
export const bandAim = f => Math.max(BAND_AIM_MIN, BAND_MARGIN + BAND_K * ((CAL.BAND_SD || {})[f] ?? 0.13))
/** the levers' ranges (dB): the cues' reverb sends, the mid layers, the pad's upper voices, the 808, the pad's lower
 * voices, the body's air shelf, the P stack's air shelf */
export const LEVER_RANGE = { sends: [-9, 0], mid: [-3, 0], padHi: [-4, 0], b808: [0, 3], padLo: [0, 3], air16: [-6, 0], pay16: [-6, 0] }
/** the most the level levers may add to the music's loudness (dB): the SFX fader (B1) planned the cues against the bed
 * before the guard ran, so the guard keeps the bed's loudness near where the fader left it. A lifted (sparse) teaser's
 * cues follow the bed's added loudness (compose.mjs), so its budget is what its lift can still follow (LIFT_MAX less
 * its trim), up to LEVER_DM_LIFTED; a cut (busy) teaser's fader cannot follow, so it keeps LEVER_DM_MAX */
export const LEVER_DM_MAX = 0.25, LEVER_DM_LIFTED = 0.5
export const leverDmMax = trim => (trim > 0 ? Math.max(LEVER_DM_MAX, Math.min(LEVER_DM_LIFTED, LIFT_MAX - trim)) : LEVER_DM_MAX)
/** the re-voice's reach past its range (r, step 3 of the guard: mid -4.5 dB, the pad's upper voices -6 dB) */
export const REVOICE_MAX = 1.5
/** how far the mid layers may come up for the 2 kHz floor (dB, step 5 of the guard) */
export const MID_UP_MAX = 3
/** the step of the 808 / lower-pad allocation and of the air shelves (dB) */
export const LEVER_STEP = 0.05, AIR_STEP = 0.1
/**
 * guard(m) -> levers { sends, mid, padHi, b808, padLo, air16, pay16 } (dB), each the least that brings the predicted
 * octaves inside their windows by bandAim, cheapest first:
 *   the low octaves read short (the cues crowd the 1 kHz reference, or the body's own low end is thin):
 *     1. the bed re-voices under the bells by r in [0, 1] (the least r that clears): the mid layers (arp, lead, clap,
 *        snare, music riser: they add to the reference and carry none of the low end) step back r x 3 dB and the pad's
 *        two upper voices r x 4 dB, and the 808 comes up by what keeps the bed's loudness where the fader left it (B1);
 *     2. still short with the bed fully re-voiced: the 808 (63 and 125 Hz) and the pad's two lower voices (most of
 *        250 Hz is theirs) share dmMax of added loudness (leverDmMax: 0.25 dB, more in a lifted teaser whose cues
 *        follow), step by step to whichever clears more;
 *     3. still short: the body cues' reverb sends come down, the least that clears (to -9 dB: in a dense body the
 *        bells' hall tails pile into the 1 kHz octave, and the SFX returns never duck);
 *     no lever lifts an octave over its ceiling, and the re-voice holds the 500 Hz and 2 kHz floors (it takes the mid
 *     layers and the pad's upper voices out of them): where it would push one of them under its aim it stops where the
 *     shortness is least over all five floors, and the lows that are still short go on to 2 and 3;
 *   the 2 kHz floor the shortest left, the mid layers not stepped back (since 2026-10-13, the condensed 07a-10c): the
 *     mid layers come up, up to MID_UP_MAX, the 808 holding the bed's loudness, to the balance of the five floors (the
 *     lows give back what 2 kHz takes). A body whose 1 kHz reference the bells own and whose music carries little 2 kHz
 *     (07a: two reveals and four dings) had no lever for that octave: the re-voice only takes the mid layers down, and
 *     the sends, which lower the bells' halls in the reference, were at their reach. 07a's 2 kHz octave read 0.58 dB over
 *     its floor on the master and 0.49-0.53 delivered (the AAC takes 0.05-0.09 dB off it, by the encode);
 *   too much air (16 kHz over its ceiling): a high shelf at 10 kHz on the source that owns more of the octave, a step at
 *     a time: the P stack (a hit's crash layer at P, the music's reverse crash and crash at P: a fixed ~1.5 s burst that
 *     a short body cannot dilute) or the body's hats and crashes (a long body's air).
 * Until 2026-10-13 the sends came first and took their full -9 dB whenever they could not clear alone, so all six
 * crowded short bodies played every cue 9 dB under its hall send; and the air shelf reached only the hats.
 */
export function guard(m, { dmMax = LEVER_DM_MAX } = {}) {
  const W = bandWindows(), lv = { sends: 0, mid: 0, padHi: 0, b808: 0, padLo: 0, air16: 0, pay16: 0 }
  if (!W['125'] || !W['16000']) return lv
  const p = () => predict(m, lv)
  const lows = [63, 125, 250].filter(f => W[f])
  const short = (q, fs = lows) => Math.max(0, ...fs.map(f => W[f][0] + bandAim(f) - q[f]))
  // and none of the octaves the levers lift may pass its ceiling (less its aim): the lows and 500 Hz rise together when
  // the reference comes down, and the 808 lifts 63 Hz most
  const ups = [63, 125, 250, 500].filter(f => W[f])
  const over0 = Math.max(0, ...ups.map(f => predict(m, lv)[f] - (W[f][1] - bandAim(f))))
  const over = q => Math.max(0, ...ups.map(f => q[f] - (W[f][1] - bandAim(f)))) - over0
  // the floors the levers move: the lows they lift and the 500 Hz and 2 kHz octaves the re-voice lowers (the pad's upper
  // voices and the mid layers carry 500 Hz-2 kHz: 05c's 500 Hz octave fell to 0.1 dB over its floor with the bed fully
  // re-voiced; 07a's 2 kHz octave, whose 1 kHz reference two reveals and four dings own, read 0.1-0.2 dB over its floor
  // with the mid layers 3 dB down, which bought its 250 Hz octave 0.05 dB: 2026-10-13, the condensed 07a-10c)
  const floors = [63, 125, 250, 500, 2000].filter(f => W[f])
  const shortAll = q => short(q, floors)
  // a lever that clears the shortness but lifts an octave over its ceiling stops where the ceiling begins
  const capOver = (key, from) => {
    if (over(p()) <= 0.01) return
    let a = from, b = lv[key]
    lv[key] = a
    if (over(p()) > 0.01) return
    for (let k = 0; k < 20; k++) { const mid = (a + b) / 2; lv[key] = mid; if (over(p()) > 0.01) b = mid; else a = mid }
    lv[key] = a
  }
  // the most a level lever may go before the bed's loudness passes dmMax (bisection; leverLoudness is monotone in it)
  const roomFor = (key, dmMax) => { let a = 0, b = LEVER_RANGE[key][1]; for (let k = 0; k < 20; k++) { const t = (a + b) / 2; if (leverLoudness(m, { ...lv, [key]: t }) <= dmMax) a = t; else b = t } return a }
  // bisection on one lever (monotone in its effect) within its range: the least move that clears `bad`, else the full move
  const tune = (key, bad, far = Math.abs(LEVER_RANGE[key][0]) > Math.abs(LEVER_RANGE[key][1]) ? LEVER_RANGE[key][0] : LEVER_RANGE[key][1]) => {
    lv[key] = far
    if (bad(p())) return
    let a = 0, b = far
    for (let k = 0; k < 20; k++) { const mid = (a + b) / 2; lv[key] = mid; if (bad(p())) a = mid; else b = mid }
    lv[key] = b
  }
  // the least r in [lo, hi] (on a grid of 0.025, then refined) at which f(r) is within 0.005 dB of its smallest value
  // there: the re-voice clears the lows where it can, and where the 500 Hz or 2 kHz floor stops it, it balances them
  const leastBest = (f, lo, hi) => {
    const n = Math.max(1, Math.round((hi - lo) / 0.025)), vs = []
    for (let k = 0; k <= n; k++) { const r = lo + (hi - lo) * k / n; vs.push([r, f(r)]) }
    const fmin = Math.min(...vs.map(v => v[1])), k = vs.findIndex(v => v[1] <= fmin + 0.005)
    if (k <= 0) return vs[Math.max(0, k)][0]
    let x = vs[k - 1][0], y = vs[k][0]
    for (let it = 0; it < 12; it++) { const mid = (x + y) / 2; if (f(mid) <= fmin + 0.005) y = mid; else x = mid }
    return y
  }
  if (short(p()) > 0.01) {
    // 1. the re-voice, r in [0, 1], the 808 holding the bed's loudness: the least r that clears the lows, or, where the
    // 500 Hz or 2 kHz floor stops it first, the r that leaves the least shortness over the five floors
    const at = r => { lv.mid = r * LEVER_RANGE.mid[0]; lv.padHi = r * LEVER_RANGE.padHi[0]; lv.b808 = 0; lv.b808 = roomFor('b808', 0); const q = p(); return over(q) > 0.01 ? 99 : Math.max(short(q), shortAll(q)) }
    at(leastBest(at, 0, 1))
    // 2. the 808 and the pad's lower voices share dmMax of added loudness (leverDmMax), a LEVER_STEP at a time to whichever
    // clears more of the octaves' total shortness, never past a ceiling
    const total = q => floors.reduce((s, f) => s + Math.max(0, W[f][0] + bandAim(f) - q[f]), 0)
    for (let it = 0; it < 80 && total(p()) > 0.01; it++) {
      const t0 = total(p())
      let best = null
      for (const key of ['b808', 'padLo']) {
        const v0 = lv[key]
        if (v0 + LEVER_STEP > LEVER_RANGE[key][1] + 1e-9) continue
        lv[key] = v0 + LEVER_STEP
        const gain = leverLoudness(m, lv) <= dmMax && over(p()) <= 0.01 ? t0 - total(p()) : 0
        lv[key] = v0
        if (gain > 1e-4 && (!best || gain > best.gain)) best = { key, gain }
      }
      if (!best) break
      lv[best.key] = +(lv[best.key] + LEVER_STEP).toFixed(3)
    }
    // 3. still short: the re-voice goes on past its range, up to REVOICE_MAX (the bed's loudness held by the 808, the
    // level levers' allocation kept), the least that clears, or the balance with the 500 Hz and 2 kHz floors as in 1
    if (lv.mid / LEVER_RANGE.mid[0] > 0.97 && short(p()) > 0.01) {
      const keep = { b808: lv.b808, padLo: lv.padLo }, dm0 = leverLoudness(m, lv)
      const at2 = r => { lv.mid = r * LEVER_RANGE.mid[0]; lv.padHi = r * LEVER_RANGE.padHi[0]; lv.padLo = keep.padLo; lv.b808 = keep.b808; let lo = keep.b808, hi = LEVER_RANGE.b808[1]; for (let k = 0; k < 20; k++) { const t = (lo + hi) / 2; if (leverLoudness(m, { ...lv, b808: t }) <= dm0) lo = t; else hi = t } lv.b808 = lo; const q = p(); return over(q) > 0.01 ? 99 : Math.max(short(q), shortAll(q)) }
      at2(leastBest(at2, 1, REVOICE_MAX))
    }
    // 4. the sends, the least that clears what the bed could not
    if (short(p()) > 0.01) { tune('sends', q => short(q) > 0.01); capOver('sends', 0) }
  }
  // 5. the 2 kHz floor the shortest one left, with the mid layers not stepped back: they come up (they carry the octave
  // and none of the lows), the 808 holding the bed's loudness (down to the floor of its range; past it the loudness may
  // rise to dmMax), by the u in [0, MID_UP_MAX] nearest 0 at which the shortness over the five floors is least, so the
  // lows give back what 2 kHz needs (the balance of steps 1 and 3, the other way)
  const short2k = q => (W['2000'] ? Math.max(0, W['2000'][0] + bandAim(2000) - q[2000]) : 0)
  if (lv.mid >= 0 && short2k(p()) > 0.01 && short2k(p()) >= shortAll(p()) - 1e-9) {
    const keep = lv.b808, dm0 = leverLoudness(m, lv), dmTop = Math.max(dm0, dmMax)
    const at5 = u => {
      lv.mid = u; lv.b808 = keep
      if (leverLoudness(m, lv) > dm0) { let lo = LEVER_RANGE.b808[0], hi = keep; for (let k = 0; k < 20; k++) { const t = (lo + hi) / 2; if (leverLoudness(m, { ...lv, b808: t }) <= dm0) lo = t; else hi = t } lv.b808 = lo }
      const q = p()
      return over(q) > 0.01 || leverLoudness(m, lv) > dmTop + 1e-6 ? 99 : shortAll(q)
    }
    at5(leastBest(at5, 0, MID_UP_MAX))
  }
  airShelves(m, lv)
  for (const k of Object.keys(lv)) lv[k] = Math.abs(lv[k]) < 0.05 ? 0 : +lv[k].toFixed(2)
  return lv
}
/**
 * The air (guard's last step, and compose.mjs again once the hit at P has its level, payoffLevel): while the 16 kHz octave
 * reads over its ceiling less its aim, a 10 kHz shelf a step at a time on the source that takes more off it, the P stack
 * (pay16: a hit's crash layer at P and the music's crash and reverse crash at P) or the body's hats and crashes (air16).
 * A hit at P raised for B8's room brings its crash layer with it: 05c's 16 kHz octave read 0.3 dB inside its ceiling with
 * the hit 1.5 dB up and the shelves set before it. -> lv (in place)
 */
export function airShelves(m, lv) {
  const W = bandWindows()
  if (!W['16000']) return lv
  const p = () => predict(m, lv)
  const over16 = q => q[16000] - (W['16000'][1] - bandAim(16000))
  for (let it = 0; it < 200 && over16(p()) > 0.01; it++) {
    const q0 = p()[16000]
    let best = null
    for (const key of ['pay16', 'air16']) {
      const v0 = lv[key] || 0
      if (v0 - AIR_STEP < LEVER_RANGE[key][0] - 1e-9) continue
      lv[key] = v0 - AIR_STEP
      const d = q0 - p()[16000]
      lv[key] = v0
      if (d > 1e-5 && (!best || d > best.d + 1e-9)) best = { key, d }
    }
    if (!best) break
    lv[best.key] = +((lv[best.key] || 0) - AIR_STEP).toFixed(2)
  }
  return lv
}
/** the music's K-weighted power change (dB) the level levers make: the master gain model adds it (logo.mjs gainEst) */
export function leverLoudness(m, lv) {
  if (!m || !lv) return 0
  let a = 0, b = 0
  for (const g of GROUPS) { const k = m.kp[g] || 0; a += k; b += k * Math.pow(10, leverDbOf(g, lv) / 10) }
  return a > 0 ? 10 * Math.log10(b / a) : 0
}
/** a group's level lever (dB) */
const leverDbOf = (g, lv) => (g === 'b808' ? lv.b808 : g === 'mid' ? lv.mid : g === 'padHi' ? lv.padHi : g === 'pad' ? lv.padLo : 0) || 0
/**
 * payoffPre(m, levers) -> the payoff's momentary loudness (LUFS, pre-master) in the frame B8 reads: the music by group
 * (ducked under the payoff, the levers' gains) and the cues, K-weighted, summed over the channels as BS.1770 does.
 * logo.mjs adds the master gain estimate and takes off CAL.PAY_LOSS (and CAL.PAY_HIT under a hit).
 */
export function payoffPre(m, lv = {}) {
  if (!m || !m.pay) return null
  const gs = GROUPS.map(g => [m.pay.music[g], Math.pow(10, leverDbOf(g, lv) / 20)])
  if (m.pay.hit) gs.push([m.pay.hit, Math.pow(10, (lv.payHit || 0) / 20)])
  let e = 0, n = 0
  for (const ch of ['L', 'R']) {
    const c = m.pay.cues[ch]
    n = c.length
    for (let i = 0; i < c.length; i++) { let v = c[i]; for (const [b, k] of gs) v += b[ch][i] * k; e += v * v }
  }
  return n ? -0.691 + 10 * Math.log10(Math.max(1e-30, e / n)) : null
}
/** the payoff frame's sample peak (dBFS, pre-master): the music by group at the levers' gains and the cues */
export function payoffPeak(m, lv = {}) {
  if (!m || !m.pay || !m.pay.raw) return null
  const gs = GROUPS.map(g => [m.pay.raw.music[g], Math.pow(10, leverDbOf(g, lv) / 20)])
  if (m.pay.raw.hit) gs.push([m.pay.raw.hit, Math.pow(10, (lv.payHit || 0) / 20)])
  let pk = 0
  for (const ch of ['L', 'R']) {
    const c = m.pay.raw.cues[ch]
    for (let i = 0; i < c.length; i++) { let v = c[i]; for (const [b, k] of gs) v += b[ch][i] * k; pk = Math.max(pk, Math.abs(v)) }
  }
  return 20 * Math.log10(Math.max(1e-12, pk))
}
