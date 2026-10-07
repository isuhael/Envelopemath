// Napkin charts: hatched bars, a growth curve drawn by pen, and a dot/emoji grid.
import { ink } from '../theme.js'
import { handText, wobble, strokePartial, hatch } from '../ink.js'
import { ease, prog, fmtNum, hash } from '../util.js'

/** bars: hand-drawn hatched bars. items: [{label, value, color, display, at}] grow left to right (`at`: start, s after the op). */
export const bars = {
  duration: op => Math.max(...op.items.map((it, i) => (it.at ?? 0.2 + i * op.stagger) + op.dur)),
  prepare(op) {
    op.dur ??= 0.9
    op.stagger ??= 0.45
    op.w ??= 820
    op.h ??= 600
    op.max ??= Math.max(...op.items.map(i => i.value))
  },
  draw(g, op, lt) {
    const n = op.items.length
    const slot = op.w / n
    const bw = Math.min(220, slot * 0.6)
    // baseline
    strokePartial(g, wobble([[op.x - op.w / 2 - 20, op.y], [op.x + op.w / 2 + 20, op.y + 2]], 11, 2, 10), ease.out(prog(lt, 0, 0.3)), { color: 'ink', width: 5 })
    op.items.forEach((it, i) => {
      const k = ease.out(prog(lt, it.at ?? 0.2 + i * op.stagger, op.dur))
      if (k <= 0) return
      const cx = op.x - op.w / 2 + slot * (i + 0.5)
      const bh = Math.max(4, (op.h * it.value) / op.max)
      const x = cx - bw / 2, top = op.y - bh * k
      const col = it.color || (i === n - 1 ? 'red' : 'ink')
      hatch(g, x, op.y - bh, bw, bh, k, { color: col, seed: i + 3 })
      strokePartial(g, wobble([[x, op.y], [x, top], [x + bw, top], [x + bw, op.y]], hash(`b${i}`), 2.5, 6), 1, { color: col, width: 5 })
      const label = it.display ?? fmtNum(it.value * k, { ...op.format, ...it.format })
      handText(g, label, cx, top - 24, { size: it.valueSize || 64, color: col, align: 'center', jitter: 0.3 })
      handText(g, it.label, cx, op.y + 70, { size: it.labelSize || 50, color: 'ink', align: 'center', seed: i })
    })
  },
  sfx: op => op.items.map((it, i) => ({ at: op.t + (it.at ?? 0.2 + i * op.stagger), kind: 'scribble', dur: op.dur, n: 6 })),
}

// Series for common money curves, so specs don't have to hard-code points.
export function series(fn) {
  const out = []
  if (fn.type === 'compound') {
    const { principal = 0, rate, years, contrib = 0 } = fn
    let v = principal
    out.push(v)
    for (let y = 1; y <= years; y++) { v = v * (1 + rate) + contrib; out.push(v) }
  } else if (fn.type === 'linear') {
    for (let y = 0; y <= fn.years; y++) out.push((fn.principal || 0) + fn.contrib * y)
  } else throw new Error(`curve: unknown fn type "${fn.type}"`)
  return out
}

/** curve: axes + a value series drawn by pen; marks label chosen points (e.g. years). */
export const curve = {
  duration: op => 0.4 + op.dur,
  prepare(op) {
    op.dur ??= 2.2
    op.w ??= 820
    op.h ??= 620
    op.color ??= 'red'
    op._vals = op.values || series(op.fn)
    op._max = op.max ?? Math.max(...op._vals)
    const n = op._vals.length - 1
    op._pts = op._vals.map((v, i) => [op.x + (i / n) * op.w, op.y - (v / op._max) * op.h])
    if (op.compare) {
      op._cmp = (op.compare.values || series(op.compare.fn)).map((v, i, a) => [op.x + (i / (a.length - 1)) * op.w, op.y - (v / op._max) * op.h])
    }
  },
  draw(g, op, lt) {
    const ak = ease.out(prog(lt, 0, 0.4))
    strokePartial(g, wobble([[op.x, op.y - op.h - 30], [op.x, op.y], [op.x + op.w + 30, op.y]], 21, 2, 12), ak, { color: 'ink', width: 5 })
    if (op.xLabel) handText(g, op.xLabel, op.x + op.w, op.y + (op.ticks ? 108 : 62), { size: 44, color: 'ink', align: 'right' })
    if (op.ticks && ak >= 1) {
      const n = op._vals.length - 1
      for (const tk of op.ticks) {
        const tx = op.x + (tk.i / n) * op.w
        strokePartial(g, [[tx, op.y - 10], [tx, op.y + 10]], 1, { color: 'ink', width: 4 })
        handText(g, String(tk.label), tx, op.y + 54, { size: 40, color: 'pencil', align: 'center', jitter: 0.3 })
      }
    }
    if (op.yLabel) handText(g, op.yLabel, op.x + 16, op.y - op.h - 40, { size: 44, color: 'ink' })
    const k = ease.inOut(prog(lt, 0.4, op.dur))
    if (op._cmp) {
      strokePartial(g, op._cmp, k, { color: op.compare.color || 'pencil', width: 6 })
    }
    strokePartial(g, op._pts, k, { color: op.color, width: 8 })
    const n = op._pts.length - 1
    for (const m of op.marks || []) {
      if (k * n < m.i) continue
      const [px, py] = op._pts[m.i]
      g.save(); g.fillStyle = ink(m.color || op.color); g.beginPath(); g.arc(px, py, 11, 0, 7); g.fill(); g.restore()
      handText(g, m.text, px + (m.dx ?? -20), py + (m.dy ?? -30), { size: m.size || 52, color: m.color || op.color, align: m.align || 'right', jitter: 0.4 })
    }
    if (op.endLabel !== false && k >= 1) {
      const [ex, ey] = op._pts[n]
      handText(g, op.endLabel || fmtNum(op._vals[n], op.format), ex, ey - 34, { size: 72, color: op.color, align: 'right' })
    }
  },
  sfx: op => [{ at: op.t, kind: 'scribble', dur: 0.4, n: 4 }, { at: op.t + 0.4, kind: 'scribble', dur: op.dur, n: 20 }],
}

/**
 * stack: a pile of banded cash bricks growing to `h` px, with a dimension line + label and an
 * optional reference figure for scale (ref: {char: '🧍', h: px, label: 'you'}).
 */
export const stack = {
  duration: op => op.dur + 0.4,
  prepare(op) {
    op.w ??= 240
    op.units ??= 10
    op.dur ??= 1.6
    op.x ??= 600
  },
  draw(g, op, lt) {
    const k = ease.out(prog(lt, 0, op.dur))
    const bh = op.h / op.units
    const shown = op.units * k
    strokePartial(g, wobble([[op.x - op.w - 220, op.y], [op.x + op.w / 2 + 160, op.y + 2]], 31, 2, 12), ease.out(prog(lt, 0, 0.3)), { color: 'ink', width: 5 })
    for (let i = 0; i < Math.ceil(shown); i++) {
      const f = Math.min(1, shown - i)
      const top = op.y - (i + 1) * bh
      g.save()
      g.globalAlpha *= f
      g.fillStyle = i % 2 ? '#86b07f' : '#7aa673'
      g.fillRect(op.x - op.w / 2, top + (1 - f) * -30, op.w, bh - 2)
      g.fillStyle = '#e9e0c4'
      g.fillRect(op.x - 18, top + (1 - f) * -30, 36, bh - 2)
      g.strokeStyle = 'rgba(40,70,40,0.6)'; g.lineWidth = 2
      g.strokeRect(op.x - op.w / 2, top + (1 - f) * -30, op.w, bh - 2)
      g.restore()
    }
    if (op.ref) {
      g.save()
      g.globalAlpha *= ease.out(prog(lt, 0.2, 0.3))
      g.font = `${op.ref.h}px "Noto Color Emoji"`
      g.textAlign = 'center'; g.textBaseline = 'bottom'
      g.fillText(op.ref.char, op.x - op.w / 2 - 120, op.y + op.ref.h * 0.06)
      g.restore()
      if (op.ref.label) handText(g, op.ref.label, op.x - op.w / 2 - 120, op.y + 60, { size: 44, color: 'pencil', align: 'center' })
    }
    if (k >= 1) {
      const dx = op.x + op.w / 2 + 40, top = op.y - op.h
      const lk = ease.out(prog(lt, op.dur, 0.35))
      strokePartial(g, [[dx, op.y], [dx, top]], lk, { color: 'red', width: 5 })
      strokePartial(g, [[dx - 14, top], [dx + 14, top]], lk, { color: 'red', width: 5 })
      strokePartial(g, [[dx - 14, op.y], [dx + 14, op.y]], lk, { color: 'red', width: 5 })
      if (op.heightLabel) handText(g, op.heightLabel, dx - 10, top - 26, { size: 60, color: 'red', align: 'right' }, (lt - op.dur) * 30)
      if (op.label) handText(g, op.label, op.x, op.y + 70, { size: 54, color: 'ink', align: 'center' })
    }
  },
  sfx: op => [{ at: op.t, kind: 'ticks', dur: op.dur }, { at: op.t + op.dur, kind: 'scribble', dur: 0.4, n: 6 }],
}

/** grid: rows x cols of hand-drawn dots (or emoji); `filled` of them fill in over `dur` (`prefilled` start filled). */
export const grid = {
  duration: op => 0.3 + op.dur,
  prepare(op) {
    op.cell ??= 70
    op.dur ??= 1.6
    op.color ??= 'red'
  },
  draw(g, op, lt) {
    const total = op.rows * op.cols
    const show = ease.out(prog(lt, 0, 0.3))
    const pre = op.prefilled ?? 0
    const filled = pre + Math.round((op.filled - pre) * ease.inOut(prog(lt, 0.3, op.dur)))
    const x0 = op.x - ((op.cols - 1) * op.cell) / 2
    for (let i = 0; i < total; i++) {
      const cx = x0 + (i % op.cols) * op.cell
      const cy = op.y + Math.floor(i / op.cols) * op.cell
      const on = i < filled
      g.save()
      g.globalAlpha *= show
      if (op.emoji) {
        g.globalAlpha *= on ? 1 : 0.22
        g.font = `${op.cell * 0.78}px "Noto Color Emoji"`
        g.textAlign = 'center'; g.textBaseline = 'middle'
        g.fillText(op.emoji, cx, cy)
      } else {
        g.strokeStyle = ink(on ? op.color : 'pencil')
        g.fillStyle = ink(op.color)
        g.lineWidth = 3
        g.globalAlpha *= on ? 1 : 0.45
        g.beginPath(); g.arc(cx, cy, op.cell * 0.32, 0, 7)
        on ? g.fill() : g.stroke()
      }
      g.restore()
    }
    if (op.label && lt > 0.3) handText(g, op.label, op.x, op.y + op.rows * op.cell + 30, { size: 56, color: op.color, align: 'center' })
  },
  sfx: op => [{ at: op.t + 0.3, kind: 'ticks', dur: op.dur }],
}
