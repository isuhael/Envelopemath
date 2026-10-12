// §9.1 and §9.2: loudness, dynamics, silence, stereo, phone proxy, limiter, delivery format, picture, determinism, octave
// bands, harshness. Each check is (ctx, lim) -> { pass, detail, value? }; `lim` comes from sound/acceptance.json.
// The decoded delivery audio is the AAC (the .m4a the mux copies, or the muxed MP4's audio stream).
import { loudness, truePeakDb } from '../../src/sound/loudness.mjs'
import { BANDS as OCTAVES, bandBalance, correlation, silence } from '../../src/sound/audit.mjs'
import { SR, fix, mean, momentaryAt, highpass, monoFold } from './measure.mjs'

/** the delivery's true peak: the worst of the JS meter and ffmpeg ebur128 (when the build recorded it) */
export function deliveryTp(ctx) {
  const js = truePeakDb(ctx.delivery)
  const pe = ctx.report.loudness && ctx.report.loudness.postEncode
  const ff = pe && pe.ffmpeg && Number.isFinite(pe.ffmpeg.TP) ? pe.ffmpeg.TP : -Infinity
  return { tp: Math.max(js, ff), js, ff: Number.isFinite(ff) ? ff : null }
}

export const checks = {
  A1(ctx, lim) {
    const I = ctx.loud.integrated, m = ctx.report.loudness.integrated
    const ok = Math.abs(I - lim.target) <= lim.tol + 1e-9 && Math.abs(m - lim.target) <= lim.masterTol + 1e-9
    return { pass: ok, value: +I.toFixed(2), detail: `delivery ${fix(I)} LUFS (±${lim.tol}), master ${fix(m)} (±${lim.masterTol})` }
  },
  A2(ctx, lim) {
    const t = deliveryTp(ctx)
    return { pass: t.tp <= lim.maxDbtp + 1e-9, value: +t.tp.toFixed(2), detail: `${fix(t.tp)} dBTP (JS ${fix(t.js)}${t.ff != null ? `, ffmpeg ${fix(t.ff, 1)}` : ''}; max ${lim.maxDbtp})` }
  },
  A3(ctx, lim) {
    const v = ctx.loud.lra
    return { pass: v >= lim.min - 1e-9 && v <= lim.max + 1e-9, value: +v.toFixed(2), detail: `LRA ${fix(v)} LU (${lim.min}-${lim.max})` }
  },
  A4(ctx, lim) {
    const L = ctx.loud
    return { pass: L.shortTermMax <= lim.shortTermMax + 1e-9 && L.momentaryMax <= lim.momentaryMax + 1e-9, detail: `ST max ${fix(L.shortTermMax)} (≤ ${lim.shortTermMax}), M max ${fix(L.momentaryMax)} (≤ ${lim.momentaryMax})` }
  },
  A5(ctx, lim) {
    const plr = deliveryTp(ctx).tp - ctx.loud.integrated
    return { pass: plr >= lim.min - 1e-9 && plr <= lim.max + 1e-9, value: +plr.toFixed(2), detail: `PLR ${fix(plr)} dB (${lim.min}-${lim.max})` }
  },
  A6(ctx, lim) {
    const d = ctx.delivery, dur = d.L.length / SR
    const s = silence(d.L, d.R, { thrDb: lim.thrDbfs, minDur: lim.minRunS, t1: Math.max(0, dur - lim.tailExcludeS) })
    return { pass: s.runs.length === 0, value: +s.pct.toFixed(1), detail: `${s.pct.toFixed(1)}% silent, longest quiet run ${s.longest} s${s.runs.length ? `; runs ${JSON.stringify(s.runs)}` : ''}` }
  },
  A7(ctx, lim) {
    const v = momentaryAt(ctx.loud, 0.4)
    return { pass: v != null && v >= lim.minLufs - 1e-9, value: v == null ? null : +v.toFixed(2), detail: `M(0-0.4 s) ${fix(v)} LUFS (≥ ${lim.minLufs})` }
  },
  A8(ctx, lim) {
    const d = ctx.delivery, c = correlation(d.L, d.R)
    const fold = loudness(monoFold(d)).integrated - ctx.loud.integrated
    const ok = c.mean >= lim.corrMeanMin - 1e-9 && c.min >= lim.corrWindowMin - 1e-9 && Math.abs(fold) <= lim.monoFoldMaxLu + 1e-9
    return { pass: ok, value: +c.mean.toFixed(3), detail: `corr mean ${fix(c.mean)} (≥ ${lim.corrMeanMin}), min ${fix(c.min)} (≥ ${lim.corrWindowMin}), mono fold ${fix(fold)} LU (±${lim.monoFoldMaxLu})` }
  },
  A9(ctx, lim) {
    const d = ctx.delivery
    const dcL = mean(Array.from(d.L)), dcR = mean(Array.from(d.R))
    return { pass: Math.abs(dcL) <= lim.maxAbs && Math.abs(dcR) <= lim.maxAbs, detail: `DC ${dcL.toExponential(1)} / ${dcR.toExponential(1)} (≤ ${lim.maxAbs})` }
  },
  A10(ctx, lim) {
    const drop = ctx.loud.integrated - loudness(highpass(ctx.delivery, lim.hpHz, 2)).integrated
    return { pass: drop <= lim.maxDropLu + 1e-9, value: +drop.toFixed(2), detail: `phone proxy drop ${fix(drop)} LU (≤ ${lim.maxDropLu})` }
  },
  A11(ctx, lim) {
    const l = ctx.report.limiter
    return { pass: l.pctOver1dB <= lim.maxPctOver1dB && l.maxGr <= lim.maxGrDb, detail: `> 1 dB on ${l.pctOver1dB}% (≤ ${lim.maxPctOver1dB}), max ${l.maxGr} dB (≤ ${lim.maxGrDb})` }
  },
  A12(ctx, lim) {
    const p = ctx.deliveryProbe
    if (!p) return { pass: null, detail: 'no delivery file to probe' }
    const a = p.streams.find(s => s.codec_type === 'audio'), v = p.streams.find(s => s.codec_type === 'video')
    if (!a) return { pass: false, detail: 'no audio stream' }
    const kbps = a.bit_rate ? a.bit_rate / 1000 : null, fps = ctx.fps
    const target = v ? +v.duration : ctx.report.duration
    const bad = []
    if (a.codec_name !== lim.codec) bad.push(`codec ${a.codec_name}`)
    if (lim.profile && a.profile !== lim.profile) bad.push(`profile ${a.profile}`)
    if (a.channels !== lim.channels) bad.push(`${a.channels} ch`)
    if (+a.sample_rate !== lim.rate) bad.push(`${a.sample_rate} Hz`)
    if (kbps == null || Math.abs(kbps - lim.kbps) > lim.kbps * lim.kbpsTol + 1e-9) bad.push(`${kbps == null ? '?' : kbps.toFixed(0)} kb/s`)
    if (Math.abs(+a.duration - target) > lim.durationTolFrames / fps + 1e-6) bad.push(`audio ${a.duration} s vs ${v ? 'video' : 'spec'} ${target} s`)
    return { pass: !bad.length, detail: `${a.codec_name} ${a.profile} ${a.channels} ch ${a.sample_rate} Hz ${kbps == null ? '?' : kbps.toFixed(0)} kb/s, ${(+a.duration).toFixed(3)} s vs ${v ? 'video' : 'spec'} ${(+target).toFixed(3)} s (${ctx.deliveryKind})${bad.length ? `; bad: ${bad.join(', ')}` : ''}` }
  },
  A13(ctx) {
    const m = ctx.picture
    if (!m) return { pass: null, detail: 'no muxed MP4 and source video (pass --video <dir> or build with the finished MP4s present)' }
    return { pass: m.same, detail: `video md5 ${m.same ? 'identical' : 'DIFFERENT'} (${m.md5.slice(0, 12)} vs source ${m.md5Src.slice(0, 12)})` }
  },
  A14(ctx, lim) {
    const d = ctx.determinism
    const bad = []
    if (lim.matchesReport && d.sha !== ctx.report.wavSha256) bad.push(`WAV sha ${d.sha.slice(0, 12)} != report ${String(ctx.report.wavSha256).slice(0, 12)}`)
    if (lim.distinct && d.sameAs.length) bad.push(`same master as ${d.sameAs.join(', ')}`)
    if (d.twice && d.twice !== d.sha) bad.push(`second render ${d.twice.slice(0, 12)} differs`)
    return { pass: !bad.length, detail: bad.length ? bad.join('; ') : `sha256 ${d.sha.slice(0, 16)} = report${lim.distinct ? ', unique' : ''}${d.twice ? ', = second render' : ''}${d.baseline ? `; baseline ${d.baseline === d.sha ? 'identical' : 'DIFFERS'}` : ''}` }
  },
  BANDS(ctx, lim) {
    if (!lim.bands) return { pass: null, detail: `no band windows for ${ctx.look}` }
    const bb = ctx.bands
    const out = OCTAVES.filter(f => lim.bands[f]).filter(f => !(bb.bands[f] >= lim.bands[f][0] - lim.eps && bb.bands[f] <= lim.bands[f][1] + lim.eps)).map(f => `${f}:${bb.bands[f]} (${lim.bands[f].join('..')})`)
    return { pass: !out.length, value: bb.bands, detail: `${out.length ? `OUT ${out.join(' ')}; ` : ''}${OCTAVES.map(f => `${f}:${bb.bands[f]}`).join(' ')} dB re 1 kHz` }
  },
  HARSH(ctx, lim) {
    const h = ctx.bands.harshDb
    return { pass: h <= lim.maxDb + 1e-9, value: h, detail: `2-5 kHz ${fix(h)} dB over the line (≤ ${lim.maxDb})` }
  },
}
/** the octave bands of the delivery over [0, base] (shared by BANDS and HARSH) */
export const bandsOf = ctx => bandBalance(ctx.delivery.L, ctx.delivery.R, 0, Math.round(Math.min(ctx.score.base, ctx.delivery.L.length / SR) * SR))
