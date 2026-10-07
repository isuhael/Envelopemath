// Props: the sealed-answer envelope, a thermal receipt, cash-stuffing envelopes, emoji.
import { font, INK } from '../theme.js'
import { handText } from '../ink.js'
import { ease, prog, clamp, lerp, fmtNum, rng } from '../util.js'

/**
 * envelope: the signature "sealed answer". Slides in sealed with a wax "≈",
 * wiggles while viewers guess, then opens at `openAt` (absolute seconds) and a card slides out.
 * Leave `openAt` out for a Sealed Answer that never opens in this post.
 */
export const envelope = {
  duration: op => (op.openAt != null ? op.openAt - op.t + 1.2 : 0.5),
  prepare(op) {
    op.x ??= 540
    op.y ??= 980
    op.w ??= 780
    op.h ??= Math.round(op.w * 0.6)
    op.label ??= 'SEALED ANSWER'
    op.card ??= []
    op._s = Math.min(1, op.w / 780) // seal, note and label shrink with small envelopes
    op.cardSize ??= Math.round(96 * op._s)
    op.paper ??= '#f5f0e4'
  },
  draw(g, op, lt, env) {
    const { w, h, _s: s } = op
    const sealed = op.openAt == null
    const openLt = sealed ? Infinity : op.openAt - op.t
    const inK = ease.out(prog(lt, 0, 0.45))
    const flapK = sealed ? 0 : ease.inOut(prog(lt, openLt + 0.15, 0.45)) // 0 closed -> 1 open
    const cardK = sealed ? 0 : ease.out(prog(lt, openLt + 0.45, 0.6))
    const sealK = sealed ? 0 : prog(lt, openLt, 0.25)
    const wig = lt < openLt ? Math.sin(lt * 9) * 0.012 * clamp((lt % 1.6) < 0.5 ? 1 : 0) : 0
    g.save()
    g.translate(op.x, op.y + (1 - inK) * 900)
    g.rotate(wig)
    g.globalAlpha *= clamp(inK * 1.5)
    const top = -h / 2
    // open flap sits behind everything, pointing up
    if (flapK > 0.5) flap(g, w, h, top, -(flapK - 0.5) * 2, op)
    // card
    if (cardK > 0) {
      const cw = w * 0.86, ch = h * 1.05
      const cy = lerp(top + 20 + ch / 2, top - ch / 2 + h * 0.32, cardK)
      g.save()
      g.beginPath(); g.rect(-w, -h * 3, w * 2, h * 3 + h / 2); g.clip()
      g.shadowColor = 'rgba(20,10,0,0.25)'; g.shadowBlur = 12
      g.fillStyle = '#fffdf7'
      g.fillRect(-cw / 2, cy - ch / 2, cw, ch)
      g.shadowColor = 'transparent'
      g.fillStyle = 'rgba(192,50,42,0.75)'; g.fillRect(-cw / 2, cy - ch / 2 + 46, cw, 3)
      g.fillStyle = 'rgba(28,45,94,0.18)'
      for (let ly = cy - ch / 2 + 46 + op.cardSize * 1.05; ly < cy + ch / 2; ly += op.cardSize * 1.05) g.fillRect(-cw / 2, ly, cw, 2)
      op.card.forEach((l, i) => {
        const L = typeof l === 'string' ? { text: l } : l
        handText(g, L.text, 0, cy - ch / 2 + 46 + op.cardSize * 1.05 * (i + 1) - 10, { size: L.size || op.cardSize, color: L.color || 'ink', font: L.font, align: 'center', seed: i, em: L.em })
      })
      g.restore()
    }
    // envelope body (back view) with the diagonal side seams
    g.save()
    g.shadowColor = 'rgba(20,10,0,0.35)'; g.shadowBlur = 24; g.shadowOffsetY = 12
    g.fillStyle = op.paper
    g.fillRect(-w / 2, top, w, h)
    g.restore()
    g.strokeStyle = 'rgba(80,60,30,0.25)'; g.lineWidth = 3
    g.beginPath(); g.moveTo(-w / 2, h / 2); g.lineTo(-w * 0.06, top + h * 0.52); g.lineTo(w * 0.06, top + h * 0.52); g.lineTo(w / 2, h / 2); g.stroke()
    g.font = font('type', 30 * s); g.fillStyle = 'rgba(28,45,94,0.75)'; g.textAlign = 'center'
    g.fillText(op.label, 0, h / 2 - 40 * s)
    if (op.note && lt < openLt) {
      g.textAlign = 'left'
      handText(g, op.note, 0, h / 2 - 90 * s, { size: 54 * s, color: 'red', align: 'center', em: op.em })
    }
    // closed flap + wax seal
    if (flapK <= 0.5) flap(g, w, h, top, 1 - flapK * 2, op)
    if (sealK < 1) {
      const sc = (1 + sealK * 0.6) * s
      g.save()
      g.globalAlpha *= 1 - sealK
      g.translate(0, top + h * 0.52)
      g.scale(sc, sc)
      g.fillStyle = '#9e1f1a'
      g.beginPath()
      const r = rng(5)
      for (let i = 0; i <= 18; i++) { const a = (i / 18) * Math.PI * 2; const rr = 58 + r() * 8; i ? g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : g.moveTo(Math.cos(a) * rr, Math.sin(a) * rr) }
      g.fill()
      g.fillStyle = '#c8352d'; g.beginPath(); g.arc(0, 0, 44, 0, 7); g.fill()
      g.fillStyle = '#7e1612'; g.font = font('hand', 70); g.textAlign = 'center'; g.textBaseline = 'middle'
      g.fillText('≈', 0, 4)
      g.restore()
    }
    g.restore()
  },
  sfx: op => [{ at: op.t, kind: 'whoosh' }, ...(op.openAt != null ? [{ at: op.openAt, kind: 'paper' }, { at: op.openAt + 0.9, kind: 'ding' }] : [])],
}

// The triangular back flap; `fold` 1 = closed (pointing down), -1 = fully open (pointing up).
function flap(g, w, h, top, fold, op) {
  g.save()
  g.translate(0, top)
  g.scale(1, fold)
  g.fillStyle = fold > 0 ? shade(op.paper, -10) : shade(op.paper, -28)
  g.strokeStyle = 'rgba(80,60,30,0.3)'; g.lineWidth = 3
  g.beginPath(); g.moveTo(-w / 2, 0); g.lineTo(0, h * 0.56); g.lineTo(w / 2, 0); g.closePath()
  g.fill(); g.stroke()
  g.restore()
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const c = v => Math.max(0, Math.min(255, v + amt))
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`
}

const money = v => {
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/**
 * receipt: a thermal receipt that prints line by line.
 * items: [[label, value], ...] or [{label, value, at, color, highlight, strike}, ...] where `at` is
 * seconds after the op starts (default: one row every 1/lps s). `compact: true` prints the header
 * and its rule together; `instant: true` shows every row at once; `running: {label, prefix,
 * decimals}` adds a live subtotal under the printed rows until the total prints.
 */
export const receipt = {
  duration: op => op._rows[op._rows.length - 1].at + 0.25,
  prepare(op) {
    op.w ??= 640
    op.size ??= 40
    op.lps ??= 4
    op.rot ??= -2
    const item = it => (Array.isArray(it) ? { a: it[0], b: it[1] } : { ...it, a: it.label ?? it.a, b: it.value ?? it.b })
    const total = op.total && (Array.isArray(op.total) ? { a: op.total[0], b: op.total[1] } : { ...op.total, a: op.total.label, b: op.total.value })
    op._rows = [
      ...(op.header ? [{ kind: 'head', text: op.header }, { kind: 'rule', withHead: op.compact }] : []),
      ...(op.items || []).map(it => ({ kind: 'item', ...item(it) })),
      ...(total ? [{ kind: 'rule' }, { kind: 'total', ...total }] : []),
      ...(op.footer ? [{ kind: 'foot', text: op.footer }] : []),
    ]
    let prev = -1 / op.lps
    for (const row of op._rows) {
      row.at = op.instant ? 0 : row.at ?? (row.withHead ? Math.max(0, prev) : prev + 1 / op.lps)
      prev = row.at
    }
  },
  draw(g, op, lt) {
    const rowH = op.size * 1.45
    const rows = op._rows.filter(r => lt >= r.at)
    const totalShown = rows.some(r => r.kind === 'total')
    const runRow = op.running && !totalShown && rows.some(r => r.kind === 'item')
    const h = 50 + (rows.length + (runRow ? 1 : 0)) * rowH
    g.save()
    g.translate(op.x, op.y)
    g.rotate((op.rot * Math.PI) / 180)
    g.shadowColor = 'rgba(20,10,0,0.3)'; g.shadowBlur = 14; g.shadowOffsetY = 6
    g.fillStyle = '#fdfcf8'
    g.beginPath()
    g.moveTo(-op.w / 2, 0); g.lineTo(op.w / 2, 0); g.lineTo(op.w / 2, h)
    for (let x = op.w / 2; x > -op.w / 2; x -= 20) { g.lineTo(x - 10, h + 12); g.lineTo(x - 20, h) }
    g.closePath(); g.fill()
    g.shadowColor = 'transparent'
    g.fillStyle = '#2a2a2a'
    g.textBaseline = 'middle'
    rows.forEach((row, i) => {
      const y = 40 + i * rowH + rowH / 2
      const sz = row.kind === 'total' ? op.size * 1.25 : op.size
      g.font = font('type', sz)
      if (row.highlight) {
        g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = INK.highlight
        g.fillRect(-op.w / 2 + 16, y - rowH / 2 + 4, op.w - 32, rowH - 8); g.restore()
      }
      if (row.kind === 'rule') {
        g.fillText('-'.repeat(Math.floor(op.w / (op.size * 0.62))), -op.w / 2 + 24, y)
      } else if (row.kind === 'head' || row.kind === 'foot') {
        g.textAlign = 'center'; g.fillText(row.text, 0, y); g.textAlign = 'left'
      } else {
        const col = row.color ? (INK[row.color] || row.color) : row.kind === 'total' ? INK.red : '#2a2a2a'
        g.fillStyle = '#2a2a2a'
        g.textAlign = 'left'; g.fillText(row.a, -op.w / 2 + 28, y)
        g.fillStyle = col
        g.textAlign = 'right'; g.fillText(row.b, op.w / 2 - 28, y)
        g.textAlign = 'left'; g.fillStyle = '#2a2a2a'
        if (row.strike) {
          const k = clamp((lt - row.at - 0.3) / 0.3)
          g.save(); g.strokeStyle = INK.red; g.lineWidth = 4; g.lineCap = 'round'
          g.beginPath(); g.moveTo(-op.w / 2 + 20, y + 2); g.lineTo(-op.w / 2 + 20 + (op.w - 40) * k, y - 2); g.stroke(); g.restore()
        }
      }
    })
    if (runRow) {
      const R = op.running
      const sum = rows.filter(r => r.kind === 'item').reduce((a, r) => a + money(r.b), 0)
      const y = 40 + rows.length * rowH + rowH / 2
      g.font = font('type', op.size * 1.1)
      g.fillStyle = INK.red
      g.textAlign = 'left'; g.fillText(R.label ?? 'SO FAR', -op.w / 2 + 28, y)
      g.textAlign = 'right'; g.fillText(fmtNum(sum, { prefix: R.prefix ?? '$', decimals: R.decimals ?? 2 }), op.w / 2 - 28, y)
    }
    g.restore()
  },
  sfx: op => (op.instant ? [{ at: op.t, kind: 'print' }] : op._rows.map(r => ({ at: op.t + r.at, kind: 'print' }))),
}

/**
 * stuff: cash-stuffing envelopes. items: [{label, amount}] — bills drop into each labelled
 * envelope while its amount counts up. Up to 3 per row.
 */
export const stuff = {
  duration: op => op.items.length * op.stagger + 0.9,
  prepare(op) {
    op.stagger ??= 0.45
    op.cols ??= Math.min(3, op.items.length)
    op.ew ??= 250
    op.eh ??= 160
    op.prefix ??= '$'
    op.instant ??= op.t <= 0.05
  },
  draw(g, op, lt) {
    const gapX = (op.w ?? 840) / op.cols
    op.items.forEach((it, i) => {
      const col = i % op.cols, row = Math.floor(i / op.cols)
      const cx = op.x - ((op.cols - 1) * gapX) / 2 + col * gapX
      const cy = op.y + row * (op.eh + 150)
      const k0 = i * op.stagger
      const appear = op.instant ? 1 : ease.back(prog(lt, k0, 0.3))
      if (appear <= 0) return
      g.save()
      g.translate(cx, cy)
      g.scale(appear, appear)
      // bills dropping in (behind the front of the envelope)
      for (let b = 0; b < 3; b++) {
        const bk = op.instant ? 1 : ease.in(prog(lt, k0 + 0.2 + b * 0.12, 0.25))
        if (bk <= 0) continue
        const by = lerp(-op.eh * 1.6, -op.eh * 0.15, bk)
        g.save()
        g.translate((b - 1) * 10, by)
        g.rotate((b - 1) * 0.06)
        g.fillStyle = '#7fae7a'; g.fillRect(-op.ew * 0.4, -op.eh * 0.32, op.ew * 0.8, op.eh * 0.64)
        g.strokeStyle = '#3d6e3a'; g.lineWidth = 3; g.strokeRect(-op.ew * 0.4 + 8, -op.eh * 0.32 + 8, op.ew * 0.8 - 16, op.eh * 0.64 - 16)
        g.fillStyle = '#2f5a2c'; g.font = font('type', 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', 0, 0)
        g.restore()
      }
      g.shadowColor = 'rgba(20,10,0,0.3)'; g.shadowBlur = 10; g.shadowOffsetY = 5
      g.fillStyle = '#f7f2e6'
      g.fillRect(-op.ew / 2, -op.eh * 0.2, op.ew, op.eh * 0.7)
      g.shadowColor = 'transparent'
      g.strokeStyle = 'rgba(80,60,30,0.3)'; g.lineWidth = 2
      g.beginPath(); g.moveTo(-op.ew / 2, -op.eh * 0.2); g.lineTo(0, op.eh * 0.16); g.lineTo(op.ew / 2, -op.eh * 0.2); g.stroke()
      handText(g, it.label, 0, op.eh * 0.38, { size: 46, color: 'ink', align: 'center', seed: i })
      g.restore()
      const ck = op.instant ? 1 : prog(lt, k0 + 0.2, 0.6)
      if (ck > 0) handText(g, fmtNum(Math.round(it.amount * ease.out(ck)), { prefix: op.prefix }), cx, cy + op.eh * 0.5 + 70, { size: 56, color: it.color || 'green', align: 'center', jitter: 0.3 })
    })
  },
  sfx: op => (op.instant ? [] : op.items.flatMap((_, i) => [0, 1, 2].map(b => ({ at: op.t + i * op.stagger + 0.3 + b * 0.12, kind: 'cash' })))),
}

/** emoji: a big colour emoji that pops in (e.g. ☕ 🏠 🚗). */
export const emoji = {
  duration: () => 0.35,
  prepare(op) {
    op.size ??= 160
    op.instant ??= op.t <= 0.05
  },
  draw(g, op, lt) {
    const k = op.instant ? 1 : ease.back(prog(lt, 0, 0.35))
    g.save()
    g.translate(op.x, op.y + (op.bob ? Math.sin(lt * 3) * 8 : 0))
    g.rotate(((op.rot || 0) * Math.PI) / 180)
    g.scale(k, k)
    g.font = `${op.size}px "Noto Color Emoji"`
    g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText(op.char, 0, 0)
    g.restore()
  },
  sfx: op => (op.instant ? [] : [{ at: op.t, kind: 'pop' }]),
}
