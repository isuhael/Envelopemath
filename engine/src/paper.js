// Procedural "back of an envelope" backgrounds. Drawn once per render and cached.
import { createCanvas } from '@napi-rs/canvas'
import { W, H, INK } from './theme.js'
import { rng } from './util.js'

const STYLES = {
  kraft: { base: [221, 193, 142], fiber: [150, 110, 60], seam: true, flap: true, clasp: true },
  white: { base: [246, 242, 232], fiber: [170, 160, 140], seam: true, flap: true, clasp: false },
  airmail: { base: [247, 244, 236], fiber: [170, 160, 140], seam: false, flap: false, clasp: false, border: true },
}

const cache = new Map()

export function paper(style = 'kraft', seed = 7) {
  const key = `${style}:${seed}`
  if (cache.has(key)) return cache.get(key)
  const s = STYLES[style] || STYLES.kraft
  const c = createCanvas(W, H)
  const g = c.getContext('2d')
  const r = rng(seed)

  // base tone with a soft diagonal light falloff
  const [br, bg, bb] = s.base
  const grad = g.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, `rgb(${br + 8},${bg + 8},${bb + 8})`)
  grad.addColorStop(1, `rgb(${br - 10},${bg - 12},${bb - 14})`)
  g.fillStyle = grad
  g.fillRect(0, 0, W, H)

  // per-pixel grain + low-frequency blotches
  const img = g.getImageData(0, 0, W, H)
  const d = img.data
  const blot = []
  for (let i = 0; i < 24; i++) blot.push([r() * W, r() * H, 120 + r() * 380, (r() - 0.5) * 14])
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let n = (r() - 0.5) * 14
      if ((x + y) % 3 === 0) {
        for (const [bx, by, br2, amt] of blot) {
          const dx = x - bx, dy = y - by
          const dd = dx * dx + dy * dy
          if (dd < br2 * br2) n += amt * (1 - Math.sqrt(dd) / br2)
        }
      }
      const i = (y * W + x) * 4
      d[i] = Math.max(0, Math.min(255, d[i] + n))
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n))
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n * 0.9))
    }
  }
  g.putImageData(img, 0, 0)

  // paper fibres
  const [fr, fg, fb] = s.fiber
  for (let i = 0; i < 2600; i++) {
    const x = r() * W, y = r() * H, len = 6 + r() * 26, a = r() * Math.PI * 2
    g.strokeStyle = `rgba(${fr},${fg},${fb},${0.04 + r() * 0.1})`
    g.lineWidth = 0.6 + r() * 1.1
    g.beginPath()
    g.moveTo(x, y)
    g.quadraticCurveTo(x + Math.cos(a) * len * 0.5 + (r() - 0.5) * 6, y + Math.sin(a) * len * 0.5 + (r() - 0.5) * 6, x + Math.cos(a) * len, y + Math.sin(a) * len)
    g.stroke()
  }

  if (s.seam) drawSeam(g)
  if (s.flap) drawFlap(g, s)
  if (s.clasp) drawClasp(g)
  if (s.border) drawAirmailBorder(g)

  // vignette
  const v = g.createRadialGradient(W / 2, H * 0.48, H * 0.25, W / 2, H * 0.5, H * 0.75)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, 'rgba(40,25,10,0.28)')
  g.fillStyle = v
  g.fillRect(0, 0, W, H)

  cache.set(key, c)
  return c
}

// vertical centre seam of a catalog envelope: an overlap edge with a faint shadow
function drawSeam(g) {
  const x = W / 2 + 14
  const sh = g.createLinearGradient(x - 10, 0, x + 6, 0)
  sh.addColorStop(0, 'rgba(60,40,15,0)')
  sh.addColorStop(0.7, 'rgba(60,40,15,0.10)')
  sh.addColorStop(1, 'rgba(60,40,15,0)')
  g.fillStyle = sh
  g.fillRect(x - 10, 300, 16, H - 300)
  g.strokeStyle = 'rgba(255,255,255,0.18)'
  g.lineWidth = 1.5
  g.beginPath(); g.moveTo(x + 2, 300); g.lineTo(x + 2, H); g.stroke()
  // bottom fold
  const by = H - 70
  g.fillStyle = 'rgba(60,40,15,0.08)'
  g.fillRect(0, by, W, 3)
  g.fillStyle = 'rgba(255,255,255,0.15)'
  g.fillRect(0, by + 3, W, 2)
}

// the top flap with its gum strip and drop shadow
function drawFlap(g, s) {
  const pts = [[0, 0], [W, 0], [W, 150], [W - 170, 318], [170, 318], [0, 150]]
  g.save()
  g.shadowColor = 'rgba(40,25,5,0.35)'
  g.shadowBlur = 18
  g.shadowOffsetY = 6
  g.beginPath()
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
  g.closePath()
  const [r0, g0, b0] = s.base
  g.fillStyle = `rgba(${r0 + 4},${g0 + 2},${b0 - 2},1)`
  g.fill()
  g.restore()
  // gum strip just inside the flap edge
  g.save()
  g.beginPath()
  pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)))
  g.closePath()
  g.clip()
  g.strokeStyle = 'rgba(120,80,30,0.16)'
  g.lineWidth = 46
  g.beginPath()
  g.moveTo(0, 150); g.lineTo(170, 318); g.lineTo(W - 170, 318); g.lineTo(W, 150)
  g.stroke()
  g.strokeStyle = 'rgba(255,255,255,0.10)'
  g.lineWidth = 6
  g.beginPath()
  g.moveTo(0, 128); g.lineTo(160, 292); g.lineTo(W - 160, 292); g.lineTo(W, 128)
  g.stroke()
  g.restore()
}

// brass clasp: reinforced hole + two bent prongs
function drawClasp(g) {
  const cx = W / 2, cy = 300
  g.save()
  g.fillStyle = 'rgba(120,80,30,0.14)'
  g.beginPath(); g.ellipse(cx, cy + 4, 46, 30, 0, 0, Math.PI * 2); g.fill()
  const brass = g.createLinearGradient(cx - 70, cy - 10, cx + 70, cy + 10)
  brass.addColorStop(0, '#8a6a2a'); brass.addColorStop(0.45, '#e6c46a'); brass.addColorStop(1, '#7a5a20')
  g.shadowColor = 'rgba(30,20,5,0.45)'; g.shadowBlur = 6; g.shadowOffsetY = 3
  g.fillStyle = brass
  for (const dir of [-1, 1]) {
    g.beginPath()
    g.moveTo(cx, cy - 8)
    g.lineTo(cx + dir * 78, cy - 5)
    g.quadraticCurveTo(cx + dir * 90, cy + 1, cx + dir * 78, cy + 7)
    g.lineTo(cx, cy + 8)
    g.closePath()
    g.fill()
  }
  g.fillStyle = '#5a4114'
  g.beginPath(); g.ellipse(cx, cy, 16, 11, 0, 0, Math.PI * 2); g.fill()
  g.restore()
}

function drawAirmailBorder(g) {
  const bw = 34, stripe = 60
  g.save()
  g.beginPath()
  g.rect(0, 0, W, H)
  g.rect(bw, bw, W - 2 * bw, H - 2 * bw)
  g.clip('evenodd')
  for (let i = -H; i < W + H; i += stripe) {
    g.fillStyle = (Math.floor(i / stripe) & 1) ? '#c0322a' : '#1c3f8a'
    g.beginPath()
    g.moveTo(i, 0); g.lineTo(i + stripe * 0.5, 0); g.lineTo(i + stripe * 0.5 - H, H); g.lineTo(i - H, H)
    g.closePath(); g.fill()
  }
  g.restore()
  g.save()
  g.fillStyle = '#1c3f8a'
  g.font = '700 30px "Special Elite"'
  g.fillText('PAR AVION · BY AIR MAIL', 70, 110)
  g.restore()
}

export const DESK = INK.black
