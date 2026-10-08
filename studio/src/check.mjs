// Linter: mounts a spec, samples it over time and audits every piece of visible text in the real DOM.
//
// Rules (errors fail the check, warnings don't):
//   safe-zone   readable text inside y 240-1480, x 60-1020, and x <= 940 below y 820 (right button rail)   error
//   type-floor  effective text size >= 34 px (error), >= 40 px (warning)                                    error/warn
//   overlap     two readable text runs overlap                                                              error
//   clipped     text partly cut off by an overflow/clip ancestor (mark rolling digits with data-roll)       warn
//   contrast    text vs. what is painted behind it: < 2.5:1 error, < 3.5:1 warning (while opacity >= 0.6)  error/warn
//   font        a text run's font family never loaded (it silently fell back)                              error
//   hook-number R1: a number is on screen at t = 0                                                         error
//   duration    5-90 s, the brand end card included                                                          error
//   page-error  any script error                                                                            error
// Mark decoration (brand mark, grid labels that repeat) with data-deco: exempt from zone/size/overlap rules.
// Mark intended overlaps with data-overlap-ok.
// The brand layer (#brand-layer: the CTA end card, above the stage) is audited with the stage. An element in it marked
// data-occlude (an opaque cover) hides the stage text under it: stage text whose box is at least half under a cover
// counts at (1 - cover opacity) of its opacity, so the held frame under an opaque end card is not linted against it.
import { openSpec } from './page.mjs'

function audit(SAFE) {
  const stage = document.getElementById('stage')
  const layer = document.getElementById('brand-layer')
  const TOL = 4
  const parse = c => {
    const m = /rgba?\(([^)]+)\)/.exec(c || '')
    if (!m) return null
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number)
    return { r, g, b, a }
  }
  const lum = ({ r, g, b }) => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
  const inter = (a, b) => ({ x0: Math.max(a.x0, b.x0), y0: Math.max(a.y0, b.y0), x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1) })
  const area = b => Math.max(0, b.x1 - b.x0) * Math.max(0, b.y1 - b.y0)
  const loaded = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')))
  const declared = new Set([...document.fonts].map(f => f.family.replace(/["']/g, '')))

  // what is painted behind point (x, y), skipping the text's own element
  // cumulative opacity of an element and its ancestors (SVG groups fade their children)
  const opacityOf = e => { let o = 1; for (let a = e; a && a !== document.documentElement; a = a.parentElement) o *= parseFloat(getComputedStyle(a).opacity); return o }
  function bgAt(x, y, self) {
    // an element that paints its own background behind its own text (a highlighter <em>, a pill)
    const own = parse(getComputedStyle(self).backgroundColor)
    if (own && own.a > 0.5 && !(self instanceof SVGElement)) return own
    for (const e of document.elementsFromPoint(x, y)) {
      if (e === self || self.contains(e) || e.id === 'safe-overlay' || e.closest('#safe-overlay')) continue
      const cs = getComputedStyle(e)
      if (e instanceof SVGElement && !(e instanceof SVGSVGElement)) {
        if (e.tagName === 'text' || e.tagName === 'tspan') continue
        const f = parse(cs.fill)
        if (f && f.a > 0.5 && parseFloat(cs.fillOpacity) > 0.5 && opacityOf(e) > 0.5) return f
        continue
      }
      const c = parse(cs.backgroundColor)
      if (c && c.a > 0.5 && opacityOf(e) > 0.5) return c
    }
    return null
  }

  // opaque covers in the brand layer: { r, a (how much they hide), el }
  const covers = []
  if (layer) for (const e of layer.querySelectorAll('[data-occlude]')) {
    let shown = true
    for (let a = e; a && a !== document.documentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.display === 'none' || cs.visibility === 'hidden') { shown = false; break } }
    if (!shown) continue
    const bg = parse(getComputedStyle(e).backgroundColor)
    const a = (bg ? bg.a : 0) * opacityOf(e)
    const r = e.getBoundingClientRect()
    if (a > 0.05 && r.width > 0 && r.height > 0) covers.push({ r: { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom }, a, el: e })
  }

  const items = []
  const range = document.createRange()
  const roots = [stage, layer].filter(Boolean)
  for (const root of roots) {
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  while (tw.nextNode()) {
    const n = tw.currentNode
    const text = n.textContent.replace(/\s+/g, ' ').trim()
    if (!text) continue
    const el = n.parentElement
    if (!el || el.closest('#safe-overlay')) continue
    let op = 1, hidden = false, deco = false, roll = false, overlapOk = false
    let clip = { x0: -1e6, y0: -1e6, x1: 1e6, y1: 1e6 }
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e)
      if (cs.display === 'none' || cs.visibility === 'hidden') { hidden = true; break }
      op *= parseFloat(cs.opacity)
      if (e.hasAttribute('data-deco')) deco = true
      if (e.hasAttribute('data-roll')) roll = true
      if (e.hasAttribute('data-overlap-ok')) overlapOk = true
      if (e !== el && (cs.overflowX !== 'visible' || cs.overflowY !== 'visible' || (cs.clipPath && cs.clipPath !== 'none'))) {
        const r = e.getBoundingClientRect()
        clip = inter(clip, { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom })
      }
    }
    clip = inter(clip, { x0: 0, y0: 0, x1: 1080, y1: 1920 })
    if (hidden || op < 0.15) continue
    range.selectNodeContents(n)
    const rects = [...range.getClientRects()].filter(r => r.width > 0.5 && r.height > 0.5)
    if (!rects.length) continue
    const box = rects.reduce((b, r) => ({ x0: Math.min(b.x0, r.left), y0: Math.min(b.y0, r.top), x1: Math.max(b.x1, r.right), y1: Math.max(b.y1, r.bottom) }), { x0: 1e6, y0: 1e6, x1: -1e6, y1: -1e6 })
    const vis = inter(box, clip)
    if (area(vis) <= 1) continue // fully clipped away: not visible
    if (root === stage && covers.length) {
      for (const c of covers) if (area(inter(vis, c.r)) >= 0.5 * area(vis)) op *= 1 - c.a
      if (op < 0.15) continue // under the end card
    }
    const clipped = area(vis) < 0.92 * area(box)
    const cs = getComputedStyle(el)
    let scale = 1
    if (el instanceof SVGElement) { const m = el.getScreenCTM(); if (m) scale = Math.hypot(m.a, m.b) }
    else { const r = el.getBoundingClientRect(); if (el.offsetHeight > 0) scale = r.height / el.offsetHeight }
    const px = parseFloat(cs.fontSize) * scale
    const family = cs.fontFamily.split(',')[0].trim().replace(/["']/g, '')
    const fg = parse(el instanceof SVGElement ? cs.fill : cs.color)
    const cx = (vis.x0 + vis.x1) / 2, cy = (vis.y0 + vis.y1) / 2
    const bg = bgAt(Math.min(1079, Math.max(0, cx)), Math.min(1919, Math.max(0, cy)), el)
    items.push({ text: text.slice(0, 48), box: vis, px, op, deco, roll, overlapOk, clipped, family, fg, bg, el })
  }
  }

  const issues = []
  const add = (rule, level, it, msg) => issues.push({ rule, level, text: it ? it.text : '', msg, box: it ? [it.box.x0, it.box.y0, it.box.x1, it.box.y1].map(Math.round) : null })
  for (const it of items) {
    const b = it.box
    if (!it.deco) {
      if (b.y0 < SAFE.top - TOL) add('safe-zone', 'error', it, `top ${Math.round(b.y0)} < ${SAFE.top}`)
      if (b.y1 > SAFE.bottom + TOL) add('safe-zone', 'error', it, `bottom ${Math.round(b.y1)} > ${SAFE.bottom}`)
      if (b.x0 < SAFE.left - TOL) add('safe-zone', 'error', it, `left ${Math.round(b.x0)} < ${SAFE.left}`)
      if (b.x1 > SAFE.right + TOL) add('safe-zone', 'error', it, `right ${Math.round(b.x1)} > ${SAFE.right}`)
      else if (b.y1 > SAFE.railY + TOL && b.x1 > SAFE.railX + TOL) add('safe-zone', 'error', it, `in right rail: right ${Math.round(b.x1)} > ${SAFE.railX} below y ${SAFE.railY}`)
      // 0.5 px tolerance: offsetHeight is whole pixels, so fractional line-heights read a hair small
      if (it.px < 33.5) add('type-floor', 'error', it, `${it.px.toFixed(1)} px < 34`)
      else if (it.px < 39.5) add('type-floor', 'warn', it, `${it.px.toFixed(1)} px < 40`)
    }
    if (it.clipped && !it.roll) add('clipped', 'warn', it, 'partly clipped by an ancestor')
    if (declared.size && !loaded.has(it.family) && !/^(system-ui|sans-serif|serif|monospace)$/.test(it.family)) add('font', 'error', it, `font "${it.family}" not loaded`)
    if (it.fg && it.bg && it.op >= 0.6 && it.fg.a > 0.6) {
      const cr = ratio(it.fg, it.bg)
      if (cr < 2.5) add('contrast', 'error', it, `contrast ${cr.toFixed(2)}:1`)
      else if (cr < 3.5 && !it.deco) add('contrast', 'warn', it, `contrast ${cr.toFixed(2)}:1`)
    }
  }
  const readable = items.filter(i => !i.deco && !i.overlapOk && i.op >= 0.3)
  for (let i = 0; i < readable.length; i++) for (let j = i + 1; j < readable.length; j++) {
    const a = readable[i], c = readable[j]
    if (a.el.contains(c.el) || c.el.contains(a.el)) continue
    const x = inter(a.box, c.box)
    const w = x.x1 - x.x0, hh = x.y1 - x.y0
    if (w > 6 && hh > 6 && area(x) > 0.12 * Math.min(area(a.box), area(c.box))) add('overlap', 'error', a, `overlaps "${c.text}"`)
  }
  const hasNumber = items.some(i => !i.deco && /\d/.test(i.text))
  return { issues, hasNumber, count: items.length }
}

/**
 * Lint one spec. Returns { id, errors: [...], warnings: [...], duration }.
 * every: sampling step in seconds.
 */
export async function checkSpec(browser, spec, { every = 0.25 } = {}) {
  const { page, info, errors: pageErrors } = await openSpec(browser, spec)
  const seen = new Map()
  const SAFE = { top: 240, bottom: 1480, left: 60, right: 1020, railY: 820, railX: 940 }
  const out = { id: spec.id, duration: info.duration, base: info.base ?? info.duration, errors: [], warnings: [] }
  try {
    const last = info.duration - 1 / info.fps
    const times = []
    for (let t = 0; t < last; t += every) times.push(+t.toFixed(3))
    times.push(last)
    for (const t of times) {
      await page.evaluate(x => window.STUDIO.seek(x), t)
      const r = await page.evaluate(audit, SAFE)
      if (t === 0 && !r.hasNumber) out.errors.push({ rule: 'hook-number', t: 0, msg: 'R1: no number on screen at 0.0 s' })
      for (const i of r.issues) {
        const key = `${i.rule}|${i.text}|${i.msg.replace(/\d+(\.\d+)?/g, '#')}`
        const s = seen.get(key)
        if (s) { s.n++; s.t1 = t; continue }
        const rec = { ...i, t, t1: t, n: 1 }
        seen.set(key, rec)
        ;(i.level === 'error' ? out.errors : out.warnings).push(rec)
      }
    }
    if (info.duration < 5 || info.duration > 90) out.errors.push({ rule: 'duration', msg: `${info.duration.toFixed(1)} s outside 5-90 s` })
    for (const e of pageErrors) out.errors.push({ rule: 'page-error', msg: e.slice(0, 400) })
  } finally {
    await page.close()
  }
  return out
}

export function formatReport(r) {
  const card = r.base != null && r.duration - r.base > 0.001 ? ` = ${r.base.toFixed(1)} + ${(r.duration - r.base).toFixed(1)} s end card` : ''
  const lines = [`${r.errors.length ? '✗' : '✓'} ${r.id} (${r.duration.toFixed(1)} s${card}): ${r.errors.length} errors, ${r.warnings.length} warnings`]
  for (const [lvl, arr] of [['ERR ', r.errors], ['warn', r.warnings]]) for (const i of arr) {
    const when = i.t == null ? '' : i.t1 > i.t ? ` @${i.t.toFixed(2)}-${i.t1.toFixed(2)}s` : ` @${i.t.toFixed(2)}s`
    lines.push(`   ${lvl} ${i.rule}${when}: ${i.text ? `"${i.text}" ` : ''}${i.msg}${i.box ? ` [${i.box.join(',')}]` : ''}`)
  }
  return lines.join('\n')
}
