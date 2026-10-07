// Audience-participation ops: multiple-choice index cards, a "pause & guess" countdown, the end card.
import { font, ink, INK } from '../theme.js'
import { handText, wobble, strokePartial, ellipsePts } from '../ink.js'
import { ease, prog, clamp, lerp, hash } from '../util.js'
import { stamp } from './marks.js'

/** choices: A/B/C index cards; at `revealAt` (absolute s) the answer is circled, others struck. */
export const choices = {
  fixed: true,
  duration: op => (op.revealAt ?? op.t) - op.t + 0.6,
  prepare(op) {
    op.x ??= 540
    op.y ??= 760
    op.w ??= 800
    op.ch ??= 136
    op.size ??= 70
    op.stagger ??= 0.22
  },
  draw(g, op, lt, env) {
    const revealK = op.revealAt != null ? prog(env.t, op.revealAt, 0.5) : 0
    op.options.forEach((txt, i) => {
      const k = ease.back(prog(lt, i * op.stagger, 0.3))
      if (k <= 0) return
      const cy = op.y + i * (op.ch + 30)
      const right = i === op.answer
      g.save()
      g.translate(op.x + (1 - clamp(k)) * 300, cy)
      g.rotate(((i % 2 ? 1 : -1) * 0.8 * Math.PI) / 180)
      g.globalAlpha *= clamp(k) * (revealK > 0 && !right ? lerp(1, 0.45, revealK) : 1)
      g.shadowColor = 'rgba(20,10,0,0.25)'; g.shadowBlur = 10; g.shadowOffsetY = 5
      g.fillStyle = '#fffdf7'
      g.fillRect(-op.w / 2, -op.ch / 2, op.w, op.ch)
      g.shadowColor = 'transparent'
      g.fillStyle = 'rgba(192,50,42,0.6)'; g.fillRect(-op.w / 2, -op.ch / 2 + 28, op.w, 3)
      g.font = font('type', 54)
      g.fillStyle = INK.ink
      g.textBaseline = 'middle'
      g.fillText(String.fromCharCode(65 + i), -op.w / 2 + 30, 8)
      handText(g, txt, -op.w / 2 + 110, op.size * 0.4, { size: op.size, color: 'ink', seed: i })
      if (revealK > 0) {
        if (right) strokePartial(g, ellipsePts(0, 4, op.w / 2 + 10, op.ch / 2 + 10, hash(txt)), ease.out(revealK), { color: 'green', width: 8 })
        else strokePartial(g, wobble([[-op.w / 2 + 20, 10], [op.w / 2 - 20, -6]], hash(txt), 2, 10), ease.out(revealK), { color: 'red', width: 7 })
      }
      g.restore()
    })
  },
  sfx: op => [
    ...op.options.map((_, i) => ({ at: op.t + i * op.stagger, kind: 'pop' })),
    ...(op.revealAt != null ? [{ at: op.revealAt, kind: 'ding' }] : []),
  ],
}

/**
 * pick: "Which envelope?" — 2–4 sealed envelopes, each labelled with an option.
 * At `revealAt` the `answer` envelope gets a stamp (default FIRST CLASS) and the rest dim.
 */
export const pick = {
  fixed: true,
  duration: op => (op.revealAt ?? op.t) - op.t + 0.6,
  prepare(op) {
    op.cols ??= op.options.length > 2 ? 2 : op.options.length
    op.x ??= 540
    op.y ??= 720
    op.ew ??= op.cols === 1 ? 760 : 380
    op.eh ??= 270
    op.size ??= 64
    op.stagger ??= 0.25
    op.stamp ??= 'FIRST CLASS'
    op._stampOp = { text: op.stamp, size: 44 }
    stamp.prepare(op._stampOp)
  },
  draw(g, op, lt, env) {
    const revealK = op.revealAt != null ? prog(env.t, op.revealAt, 0.4) : 0
    const gapX = op.ew + 30, gapY = op.eh + 40
    op.options.forEach((o, i) => {
      const opt = typeof o === 'string' ? { label: o } : o
      const k = ease.back(prog(lt, i * op.stagger, 0.3))
      if (k <= 0) return
      const col = i % op.cols, row = Math.floor(i / op.cols)
      const cx = op.x - ((op.cols - 1) * gapX) / 2 + col * gapX
      const cy = op.y + row * gapY
      const win = i === op.answer
      g.save()
      g.translate(cx, cy)
      g.rotate((((i * 37) % 5) - 2) * 0.006)
      const s = clamp(k) * (revealK > 0 && win ? 1 + 0.05 * Math.sin(revealK * Math.PI) : 1)
      g.scale(s, s)
      g.globalAlpha *= clamp(k) * (revealK > 0 && !win ? lerp(1, 0.4, revealK) : 1)
      g.shadowColor = 'rgba(20,10,0,0.3)'; g.shadowBlur = 14; g.shadowOffsetY = 6
      g.fillStyle = '#f7f2e6'
      g.fillRect(-op.ew / 2, -op.eh / 2, op.ew, op.eh)
      g.shadowColor = 'transparent'
      g.strokeStyle = 'rgba(80,60,30,0.28)'; g.lineWidth = 2.5
      g.beginPath(); g.moveTo(-op.ew / 2, -op.eh / 2); g.lineTo(0, -op.eh * 0.08); g.lineTo(op.ew / 2, -op.eh / 2); g.stroke()
      g.fillStyle = INK.red
      g.beginPath(); g.arc(-op.ew / 2 + 38, -op.eh / 2 + 38, 24, 0, 7); g.fill()
      g.fillStyle = '#fbf3e4'; g.font = font('type', 30); g.textAlign = 'center'; g.textBaseline = 'middle'
      g.fillText(String.fromCharCode(65 + i), -op.ew / 2 + 38, -op.eh / 2 + 40)
      g.textAlign = 'left'
      handText(g, opt.label, 0, op.eh * 0.18, { size: opt.size || op.size, color: 'ink', align: 'center', seed: i })
      if (opt.sub) handText(g, opt.sub, 0, op.eh * 0.18 + op.size * 0.95, { size: op.size * 0.7, color: 'red', align: 'center', seed: i + 7 })
      g.restore()
    })
    if (revealK > 0 && op.answer != null) {
      const i = op.answer, col = i % op.cols, row = Math.floor(i / op.cols)
      op._stampOp.x = op.x - ((op.cols - 1) * gapX) / 2 + col * gapX + op.ew * 0.08
      op._stampOp.y = op.y + row * gapY - op.eh * 0.26
      stamp.draw(g, op._stampOp, env.t - op.revealAt)
    }
  },
  sfx: op => [
    ...op.options.map((_, i) => ({ at: op.t + i * op.stagger, kind: 'pop' })),
    ...(op.revealAt != null ? [{ at: op.revealAt + 0.2, kind: 'stamp' }] : []),
  ],
  shake: op => (op.revealAt != null ? { at: op.revealAt + 0.22, amp: 10 } : null),
}

/** timer: a "pause & guess" countdown ring. Disappears when it hits zero. */
export const timer = {
  fixed: true,
  duration: op => op.seconds,
  prepare(op) {
    op.seconds ??= 3
    op.r ??= 86
    op.x ??= 540
    op.label ??= 'PAUSE & GUESS'
    op.until ??= op.t + op.seconds
  },
  draw(g, op, lt) {
    const rem = Math.max(0, op.seconds - lt)
    const k = rem / op.seconds
    g.save()
    g.translate(op.x, op.y)
    g.fillStyle = 'rgba(251,248,241,0.92)'
    g.beginPath(); g.arc(0, 0, op.r, 0, 7); g.fill()
    g.strokeStyle = 'rgba(28,45,94,0.18)'; g.lineWidth = 14
    g.beginPath(); g.arc(0, 0, op.r - 10, 0, 7); g.stroke()
    g.strokeStyle = INK.red; g.lineCap = 'round'
    g.beginPath(); g.arc(0, 0, op.r - 10, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); g.stroke()
    const num = String(Math.ceil(rem) || 0)
    const pulse = 1 + 0.12 * (1 - ((op.seconds - rem) % 1))
    g.scale(pulse, pulse)
    g.fillStyle = INK.ink; g.font = font('marker', op.r * 0.95); g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText(num, 0, 6)
    g.restore()
    handText(g, op.label, op.x, op.y + op.r + 64, { size: 50, color: 'red', align: 'center', font: 'type' })
  },
  sfx: op => Array.from({ length: op.seconds }, (_, i) => ({ at: op.t + i, kind: 'tick', gain: 1.6 })),
}

/** outro: the brand end card — a red "≈" seal, the channel name and a tagline. */
export const outro = {
  fixed: true,
  duration: () => 0.8,
  prepare(op) {
    op.tagline ??= 'rough math. real money.'
    op.cta ??= 'follow for the next envelope'
  },
  draw(g, op, lt) {
    const k = ease.out(prog(lt, 0, 0.35))
    g.save()
    g.fillStyle = `rgba(221,193,142,${0.94 * k})`
    g.fillRect(0, 0, 1080, 1920)
    g.globalAlpha *= k
    const s = ease.back(prog(lt, 0.1, 0.4))
    g.translate(540, 760)
    g.scale(s, s)
    g.fillStyle = '#9e1f1a'
    g.beginPath(); g.arc(0, 0, 150, 0, 7); g.fill()
    g.fillStyle = '#c8352d'
    g.beginPath(); g.arc(0, 0, 118, 0, 7); g.fill()
    g.fillStyle = '#fbf3e4'; g.font = font('hand', 220); g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText('≈', 0, 14)
    g.restore()
    g.save()
    g.globalAlpha *= k
    g.fillStyle = INK.black; g.font = font('marker', 82); g.textAlign = 'center'
    g.fillText('BACK OF THE', 540, 1030)
    g.fillText('ENVELOPE', 540, 1125)
    g.restore()
    if (lt > 0.4) handText(g, op.tagline, 540, 1235, { size: 70, color: 'red', align: 'center' }, (lt - 0.4) * 30)
    if (lt > 0.7) {
      g.save(); g.globalAlpha *= clamp((lt - 0.7) / 0.3)
      g.fillStyle = ink('ink'); g.font = font('type', 40); g.textAlign = 'center'
      g.fillText(op.cta, 540, 1330)
      g.restore()
    }
  },
  sfx: op => [{ at: op.t, kind: 'whoosh' }, { at: op.t + 0.45, kind: 'chime' }],
}
