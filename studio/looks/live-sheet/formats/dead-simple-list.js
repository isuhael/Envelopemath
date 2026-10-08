// live-sheet · dead-simple-list (P1): "N dead simple numbers".
//
// One example number (data.input) sits in the mint header row of the sheet; every item is a numbered row.
// Frame 1: the question card, the input, slot 1's formula already mid-typing in the formula bar and the selection
// on slot 1's empty result cell (a dashed outline marks the input cell the formula is using). The other numbered
// rows are empty (lookOpts.labels 'always' shows every label from frame 1: the open-loop variant).
// Each item: the selection slides down to the row's result cell and its label drops in; the formula bar types the
// formula (each cell it references gets a dashed outline as its number is typed); the result snaps in (116% to
// 100%) with a yellow flash and a tick, and the formula rises into the row as its grey working line. The note
// opens as a dark tooltip under the row (the rows below make room) until the next item starts. The goal item
// (or the last) counts up and its row wipes yellow.
// Optional beats: a wrong guess (lookOpts.wrongGuess) lands first and is struck out before the real formula;
// a check line (data.check) types into the bar with the result column selected; the verdict retypes the bar or
// lands as a card in the caption band while the result column flashes top to bottom. The last 0.5 s clear back
// to frame 1 so the short loops.
//
// Layout engine: measured with the real fonts at mount. It tries, richest first, and keeps the first that fits:
//   formula + tips   label, then the formula as a grey working line (Inter 600, like the column sub-labels:
//                    mono belongs to the formula bar); notes as tooltips
//   formula          the same, notes left to the voice-over
//   note             label + note as the grey line; the formula lives only in the formula bar
//   bare + tips      label only; notes as tooltips
//   bare             label only
// each at a few type sizes (label 48 → 40, result 72 → 52; results stay >= 60 while a richer tier is possible),
// dropping the decorative A B row first, then trying slightly tighter rows. Last resort: dense rows (2-line labels
// on a 1.0 line height). If even that cannot fit above the caption band, the sheet takes the band (captions off,
// verdict in the formula bar) rather than ever running under the captions.
// Rows only stretch to 150 px to fill space (taller when 2-line labels plus a working line need it); the card
// ends there and the assumption line follows it.
//
// No spec field is ever dropped: when a tier shows neither tooltips nor note lines, each note is typed into the
// formula bar right after its result lands (the working continues: "= $2,500 × 26 = $65,000 · not $60,000", or
// the note alone when that will not fit one line). A row whose label fits one line keeps its working as a grey
// 40 px suffix on that line ("Your real yearly pay  = $2,500 × 26") once the formula bar moves on. Short lists
// (up to 4 items) may set a long label on three lines. The verdict is a card in the caption band whenever the list
// fits above it; otherwise it is retyped into the formula bar (Inter 800).
//
// lookOpts: loop (true) · labels ('reveal' | 'always') · countUp (true) · verdict ('auto' | 'band' | 'formula')
//           · formulaAt0 (0.7) · sub ('formula' | 'note' | 'none') · notes ('auto' | 'tip' | 'sub' | 'off')
//           · columns (['What', 'Answer'], header labels when there is no input) · startRow (1)
//           · wrongGuess ({ item, t, formula, result, strike, strikeT, resultT } or a list of them)
//           · check / checkT (same as data.check / data.checkT)
import {
  h, setStyle, setText, setHTML, clamp, prog, ease, plain, C, G, M, S,
  formulaBar, fitFormula, tipStrip, fitTips, tipWindow, mk, mkLen, typedMk, wordCut, caretOn, countText, parseDisplay,
  snapIn, dropIn, liftOut, popScale, flashAlpha, lerpRect, rgba, durationOf, hasCaptions, opt, layer,
  textW, font, toneColor, toneFill, footerHeight, HANDLE_PAD, fitBarVerdict, F, unitHTML,
} from '../lib.js'

export const css = `
.dsl .ls-cell.dsl-a { flex-direction: column; align-items: flex-start; justify-content: center; white-space: normal; }
.dsl-lab { font: 800 48px/1.08 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.014em; white-space: normal; text-wrap: balance; }
.dsl-lab em { background: #FFD60A; border-radius: 6px; padding: 0 0.08em; font-style: normal; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.dsl-lab u.mark2 { color: #D92D20; text-decoration: none; }
.dsl-sub { font: 600 40px/48px 'Inter', 'Inter Full', sans-serif; height: 48px; color: #667085; white-space: nowrap; letter-spacing: -0.01em; margin-top: 4px; }
.dsl-sub em { color: #101828; font-style: normal; }
.dsl-sub u.mark2 { color: #D92D20; text-decoration: none; }
.dsl .ls-hcell.dsl-hv { align-items: flex-end; }
.dsl-hval { font: 900 60px/1 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.02em; white-space: nowrap; }
.dsl-hval em { font-style: normal; }
.dsl .ls-v { position: relative; }
.dsl-strike { position: absolute; left: -6px; right: -4px; top: 50%; height: 7px; margin-top: -3px; background: #D92D20; border-radius: 4px; transform-origin: 0 50%; transform: scaleX(0); opacity: 0; pointer-events: none; }
.dsl-refs { position: absolute; inset: 0; z-index: 6; pointer-events: none; }
.dsl-ref { position: absolute; border: 3px dashed #2E90FA; background: transparent; border-radius: 4px; opacity: 0; }
.dsl-suf { display: inline-block; font: 600 40px/1 'Inter', 'Inter Full', sans-serif; color: #667085; letter-spacing: -0.01em; white-space: nowrap; }
.dsl-suf em { color: #101828; }
.dsl-tail { position: absolute; left: 0; right: 0; }
.dsl-ok { color: #058A4F; font-weight: 800; }
.dsl-per { font-size: max(40px, 0.62em); letter-spacing: -0.005em; }
`

// [label px, result px], largest first
const SIZES = [[48, 72], [46, 68], [44, 64], [44, 60], [42, 56], [40, 52]]
const MAX_ROW = 150        // rows don't stretch past this to fill space (the card ends instead)
// row density: label line height, air above/below a row's content, the grey working line (40 px text on a 48 px
// line + gap), header-row padding. 0 = normal, 1 = a touch tighter, 2 = dense (last resort)
const DENS = [
  { lh: 1.08, padY: 12, subH: 52, headPad: 24, headMin: 76 },
  { lh: 1.04, padY: 7, subH: 50, headPad: 20, headMin: 74 },
  { lh: 1.0, padY: 5, subH: 48, headPad: 14, headMin: 70 },
]
const TAIL = 30           // un-numbered sheet under the last row: keeps the selection off the card's rounded corner

/** a result's HTML: a per-unit tail ("/mo", "/hr") and the words after its number ("a year") are set small
 * (40 px floor), so the number carries the size; the text itself is the display string */
function resHTML(str) {
  const m = /^(.*\d)(\s*\/\s*[A-Za-z]+\.?)$/.exec(String(str))
  if (m) return `${unitHTML(m[1])}<span class="dsl-per">${m[2].replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`
  return unitHTML(String(str))
}
/** a quiet entrance from below: fade + whole-pixel rise, no overshoot */
function riseIn(p, dist = 10) {
  if (p <= 0) return { opacity: '0', transform: `translateY(${dist}px)` }
  if (p >= 1) return { opacity: '1', transform: 'none' }
  const e = ease.out(p)
  return { opacity: String(clamp(p * 2.5)).slice(0, 5), transform: `translateY(${Math.round((1 - e) * dist)}px)` }
}
/** where a hidden overlay waits: invisible, zero-sized, untransformed (frames must not depend on seek history) */
const PARK = { opacity: '0', left: '0px', top: '0px', width: '0px', height: '0px', transform: 'none', transformOrigin: '0px 0px' }
const isEq = s => /^\s*[=≈]/.test(plain(s))
/** the number a display string carries, as it would be typed in a formula: '≈ $3,467' → '$3,467' */
function numToken(str) {
  const m = /[−-]?\$?\d[\d,]*(?:\.\d+)?%?/.exec(plain(str || '').replace(/≈\s*/g, ''))
  if (!m) return null
  const tok = m[0]
  // a bare 1-2 digit number ('2', '26') is too ambiguous to call a reference
  return /[$,.%]/.test(tok) || tok.replace(/\D/g, '').length >= 3 ? tok : null
}
/** end index (in characters of the plain string) of the first standalone occurrence of tok, or -1 */
function tokenEnd(str, tok) {
  const p = plain(str)
  for (let i = p.indexOf(tok); i >= 0; i = p.indexOf(tok, i + 1)) {
    const before = p[i - 1] || ' ', after = p.slice(i + tok.length, i + tok.length + 2)
    if (/[\d,.$]/.test(before) || /^(\d|[,.]\d)/.test(after)) continue
    return i + tok.length
  }
  return -1
}

export default function deadSimpleList(spec, ctx) {
  const d = spec.data || {}
  const items = (d.items || []).slice(0, 8)
  const N = Math.max(1, items.length)
  if (!items.length) items.push({ label: '', formula: '', result: '' })
  const typeDur = d.typeDur != null ? +d.typeDur : 0.6
  const input = d.input && d.input.value != null && d.input.value !== '' ? d.input : null
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const loopOn = opt(spec, 'loop', true)
  const caps = hasCaptions(spec)
  const labelsAlways = opt(spec, 'labels', 'reveal') === 'always'
  const startRow = +opt(spec, 'startRow', 1)

  // ---------------------------------------------------------------- timing
  const T = []
  items.forEach((it, i) => {
    const prev = T[i - 1]
    const t0 = it.t != null ? +it.t : prev ? prev.res + 2.6 : 0.3
    const pre = it.resultT != null && +it.resultT <= 0 // already filled at frame 1
    let res = it.resultT != null ? +it.resultT : t0 + typeDur + 0.3
    if (!pre && res < t0 + 0.2) res = t0 + 0.2
    T.push({ t0, res, pre, typeD: Math.max(0.15, Math.min(typeDur, res - t0 - 0.12)) })
  })
  // a wrong guess lands in the slot first, then is struck out before the real formula types
  const wgRaw = opt(spec, 'wrongGuess', null)
  const wrongs = (Array.isArray(wgRaw) ? wgRaw : wgRaw ? [wgRaw] : [])
    .filter(w => w && w.item >= 0 && w.item < items.length && w.formula && w.result != null && w.t != null && +w.t < T[w.item].t0)
    .map(w => {
      const t0 = +w.t
      const res = w.resultT != null ? +w.resultT : t0 + typeDur + 0.3
      const strikeT = w.strike === false ? Infinity : w.strikeT != null ? +w.strikeT : Math.max(res + 0.5, T[w.item].t0 - 0.45)
      return { ...w, t0, res, strikeT, typeD: Math.max(0.15, Math.min(typeDur, res - t0 - 0.12)) }
    })
  const wrongOf = items.map((_, r) => wrongs.find(w => w.item === r) || null)

  // the goal item (or the last) counts up, when its display string is a plain number
  let countIdx = -1
  if (opt(spec, 'countUp', true) !== false) {
    const goal = items.findIndex(it => it.tone === 'goal')
    const cand = goal >= 0 ? goal : items.length - 1
    const pd = parseDisplay(items[cand].result || '')
    if (pd && pd.n >= 10 && !/\d/.test(pd.post) && !T[cand].pre) countIdx = cand
  }
  const goalIdx = items.findIndex(it => it.tone === 'goal')
  const landEnd = r => T[r].res + (r === countIdx ? M.count + 0.24 : M.drop)
  const lastLand = Math.max(0, ...items.map((_, r) => landEnd(r)), ...wrongs.map(w => w.res + M.drop))

  // optional check line, typed into the formula bar
  const checkRaw = d.check != null ? d.check : opt(spec, 'check', null)
  const check = checkRaw ? String(checkRaw).replace(/^\s*check:\s*/i, '') : null
  const checkT = check ? +(d.checkT ?? opt(spec, 'checkT', lastLand + 1.2)) : Infinity
  const checkHTML = check && /✓/.test(check) ? '' : ' <b class="dsl-ok">✓</b>'

  // ---------------------------------------------------------------- formula-bar events
  const base = []
  items.forEach((it, r) => base.push({ kind: 'item', row: r, t: T[r].t0, str: it.formula ? (isEq(it.formula) ? it.formula : '= ' + it.formula) : '', dur: T[r].typeD, res: T[r].res }))
  wrongs.forEach(w => base.push({ kind: 'wrong', row: w.item, t: w.t0, str: isEq(w.formula) ? w.formula : '= ' + w.formula, dur: w.typeD, res: w.res }))
  if (check) base.push({ kind: 'check', t: checkT, str: check, cps: 26 })
  // (the verdict has its own fit, fitBarVerdict: it never shrinks the working's type); note strings typed into
  // the bar (when no tier shows them on the sheet) join the list once they are known
  let noteStrs = []
  const fitFor = () => fitFormula([...base.map(e => e.str + (e.kind === 'check' && checkHTML ? ' ✓' : '')), ...noteStrs], G.width)

  // ---------------------------------------------------------------- layout planning
  const L = layer(ctx, 'dsl')
  const meas = h('div', { 'aria-hidden': 'true' })
  L.append(meas)
  const lMemo = new Map(), wMemo = new Map()
  /** lines a block of html takes at a width (class gives the font, px overrides the size) */
  function linesOf(html, cls, px, width, lh) {
    const key = [html, cls, px, Math.round(width)].join('|')
    if (!lMemo.has(key)) {
      meas.className = cls
      meas.style.cssText = `position:absolute;left:-6000px;top:0;visibility:hidden;white-space:normal;width:${width}px;font-size:${px}px;line-height:${lh}`
      meas.innerHTML = html
      lMemo.set(key, Math.max(1, Math.round(meas.offsetHeight / (px * lh))))
    }
    return lMemo.get(key)
  }
  const tw = (html, f, ls = 'normal') => {
    const key = html + '|' + f + '|' + ls
    if (!wMemo.has(key)) wMemo.set(key, textW(html, f, { letterSpacing: ls }))
    return wMemo.get(key)
  }

  const W = G.width, X = G.left, Y = G.cardTop, gut = G.gutter, PAD = G.padX
  const innerW = W - gut
  const colLabels = opt(spec, 'columns', null) || ['What', 'Answer']
  const hLabelA = input ? input.label || '' : colLabels[0] || ''
  const hNoteA = input ? input.note || '' : ''
  const hLabelB = input ? '' : colLabels[1] || ''
  const resultStrs = [...items.map(it => it.result || ''), ...wrongs.map(w => String(w.result))].filter(Boolean)
  const anyNote = items.some(it => it.note)
  const anyFormula = items.some(it => it.formula)
  const notesMode = opt(spec, 'notes', 'auto')
  const subForced = opt(spec, 'sub', null)

  // tooltip size: one size that fits every note (one line down to 40 px, else two)
  const tipW = W - gut - 24
  const tipFit = fitTips(items.map(it => it.note || ''), tipW)
  const tipPx = tipFit.px
  const slotH = tipFit.slotH

  // notes a later row's working relies on (a number no cell shows: "so you borrow $16,800" → "$16,800 × 0.024"):
  // they stay on the sheet as the row's grey line (see keep, below), so a formula tier must leave room for them
  const amounts = str => (plain(str || '').match(/[−-]?\$\d[\d,]*(?:\.\d+)?|\d{1,3}(?:,\d{3})+(?:\.\d+)?/g) || [])
  const shownNums = new Set([...items.flatMap(it => amounts(it.result)), ...(input ? amounts(input.value) : [])])
  const keepNeed = items.map((it, r) => !!it.note && amounts(it.note).some(n => !shownNums.has(n) && items.some((x, k) => k > r && amounts(x.formula).includes(n))))
  function plan(cfg, bottom, fFit, force = false) {
    const { sub, tips, letters, lab, res, density = 0 } = cfg
    const { lh, padY, subH, headPad, headMin } = DENS[density]
    const wRes = Math.max(0, ...resultStrs.map(r => tw(resHTML(r), font(800, res), '-0.01em')))
    const wHead = input ? tw(mk(input.value), font(900, res), '-0.02em') : tw(mk(hLabelB), font(800, S.label), '-0.012em')
    const wB = Math.max(230, Math.ceil(Math.max(wRes, wHead)) + 2 * PAD + 10)
    const wA = innerW - wB, inA = wA - 2 * PAD
    if (!force && inA < 260) return null
    const labLines = items.map(it => (it.label ? linesOf(mk(it.label), 'dsl-lab', lab, inA, lh) : 1))
    const maxLines = Math.max(1, ...labLines)
    if (!force && maxLines > (N <= 4 ? 3 : 2)) return null // a short list may set a long label on three lines
    const subW = str => tw(mk(str), font(600, 40), '-0.01em')
    if (!force && sub === 'formula' && items.some(it => it.formula && subW(it.formula) > inA)) return null
    if (!force && sub === 'note' && items.some(it => it.note && subW(it.note) > inA)) return null
    const hasSub = sub === 'formula' ? anyFormula : sub === 'note' ? anyNote : false
    const need = Math.ceil(Math.max(res * (density ? 1.2 : 1.3), maxLines * lab * lh + (hasSub ? subH : 0)) + 2 * padY)
    const hlA = hLabelA ? linesOf(mk(hLabelA), 'ls-hl', S.label, inA, 1.1) : 0
    const hsA = hNoteA ? linesOf(mk(hNoteA), 'ls-hsub', S.sub, inA, 1.1) : 0
    const headH = Math.max(headMin, Math.ceil((hlA * S.label + hsA * S.sub) * 1.1 + headPad), input ? Math.ceil(res * 1.1 + headPad + 4) : 0)
    const top = Y + fFit.ht + (letters ? G.lettersH : 0) + headH
    const avail = bottom - top - (tips ? Math.max(slotH, TAIL) : TAIL)
    let rowH = Math.min(Math.max(MAX_ROW, need), Math.floor(avail / N))
    if (rowH < need) { if (!force) return null; rowH = need }
    return { ...cfg, density, lh, hasSub, wA, wB, inA, rowH, headH, hlA, hsA, labLines, maxLines, bottom: top + N * rowH + (tips ? Math.max(slotH, TAIL) : TAIL) }
  }
  function choose(bottom, fFit) {
    const tipsOk = anyNote && notesMode !== 'off' && notesMode !== 'sub'
    const tiers = []
    const add = (sub, tips, sizes, dens = [0, 1]) => {
      if (subForced && sub !== subForced) return
      if (tips && !tipsOk) return
      if (notesMode === 'tip' && anyNote && !tips) return
      if (notesMode === 'sub' && sub !== 'note') return
      tiers.push({ sub, tips, sizes, dens })
    }
    // results stay >= 60 px (primary text) while the richer tiers are tried
    if (anyFormula) { add('formula', true, SIZES.slice(0, 4)); add('formula', false, SIZES.slice(0, 4)) }
    if (anyNote && notesMode !== 'off') add('note', false, SIZES.slice(0, 4))
    add('none', true, SIZES.slice(0, 4))
    if (anyFormula) add('formula', false, SIZES.slice(4))
    add('none', false, SIZES)
    if (anyNote) add('note', false, SIZES.slice(4))
    // last resort, dense rows (2-line labels on a 1.0 line height, 5 px of air), no decorative letter row
    if (anyFormula) add('formula', false, SIZES.slice(2), [2])
    add('none', true, SIZES.slice(3), [2])
    add('none', false, SIZES.slice(3), [2])
    for (const [ti, tier] of tiers.entries()) {
      for (const [si, [lab, res]] of tier.sizes.entries()) {
        // the decorative A B row goes before any air does
        for (const density of tier.dens) {
          for (const letters of density === 2 ? [false] : [true, false]) {
            const p = plan({ sub: tier.sub, tips: tier.tips, letters, lab, res, density }, bottom, fFit)
            if (p) return { ...p, tier: ti, size: si }
          }
        }
      }
    }
    return null
  }
  const forced = (bottom, fFit) => ({ ...plan({ sub: subForced === 'formula' ? 'formula' : 'none', tips: false, letters: false, lab: 40, res: 52, density: 2 }, bottom, fFit, true), tier: 99, size: 99 })

  const fH = footerHeight(spec.footer) // measured: a long footer can take 3 lines
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  let vMode = opt(spec, 'verdict', 'auto')
  if (!verdict) vMode = 'none'
  // the verdict is a card in the caption band whenever the list fits above it (any tier); else the formula bar
  else if (vMode === 'auto') vMode = caps || choose(bandBottom, fitFor()) ? 'band' : 'formula'
  let capsOn = caps
  let fFit = fitFor()
  let P
  const layout = () => {
    P = choose(caps || vMode === 'band' ? bandBottom : fullBottom, fFit)
    if (!P && (caps || vMode === 'band')) {
      // last resort: the sheet takes the caption band (captions off, verdict retyped in the formula bar) rather
      // than ever running under the captions. Shorten labels or set "captions": false to choose this yourself.
      const P2 = choose(fullBottom, fFit)
      if (P2) { P = P2; capsOn = false; if (verdict) vMode = 'formula' }
    }
    if (!P) P = forced(capsOn || vMode === 'band' ? bandBottom : fullBottom, fFit)
  }
  layout()

  // ---------------------------------------------------------------- notes the sheet does not show: the formula bar
  // A note goes to a tooltip (tips tiers, when it has time to show) or the grey line (the 'note' tier); any other
  // note is typed into the formula bar right after its result lands, continuing the working when that fits one
  // line ("= $2,500 × 26 = $65,000 · not $60,000"), else on its own.
  const itemStr = r => (items[r].formula ? (isEq(items[r].formula) ? items[r].formula : '= ' + items[r].formula) : '')
  const noteT = r => T[r].res + (r === countIdx ? M.count + 0.12 : 0.3)
  const fAvail = () => G.width - 102 - 22 - 6
  const fitsBar = str => textW(mk(str), font(700, fFit.px, F.mono)) <= fAvail()
  const tipWin = r => {
    const openAt = T[r].res + (r === countIdx ? M.count + 0.36 : 0.28)
    const leave = Math.min(...base.filter(e => e.t - 0.22 > T[r].res + 0.05).map(e => e.t - 0.22), verdict ? verdict.t : Infinity)
    return { openAt, closeAt: leave - 0.28 }
  }
  const tipNote = r => P.tips && !!items[r].note && !T[r].pre && tipWin(r).closeAt - tipWin(r).openAt >= 0.8
  const noteShown = r => !items[r].note || tipNote(r) || (P.hasSub && P.sub === 'note')
  let barNotes = []
  const planNotes = () => {
    barNotes = items.map((it, r) => {
      if (noteShown(r)) return null
      const ext = itemStr(r) && !T[r].pre ? `${itemStr(r)} = ${it.result} · ${it.note}` : ''
      if (ext && fitsBar(ext)) return { kind: 'note', row: r, t: noteT(r), str: ext, from: mkLen(itemStr(r)), erase: noteT(r), cps: 26 }
      return { kind: 'note', row: r, t: Math.max(0, noteT(r)), str: String(it.note), from: T[r].pre && r === 0 ? mkLen(String(it.note)) : 0, cps: 26 }
    }).filter(Boolean)
  }
  planNotes()
  if (barNotes.some(n => !fitsBar(n.str))) {
    // a note too long for the bar's one line: the bar takes two lines and the layout is planned again
    noteStrs = barNotes.map(n => n.str)
    fFit = fitFor()
    layout()
    planNotes()
  }
  meas.remove()
  const rowH = P.rowH

  // ---------------------------------------------------------------- events (formula bar, selection)
  const vType0 = verdict ? verdict.t + 0.32 : Infinity
  const vfit = vMode === 'formula' ? fitBarVerdict(verdict.text, G.width) : null
  const evs = [...base, ...barNotes]
  if (vMode === 'formula') evs.push({ kind: 'verdict', t: vType0, erase: verdict.t, str: vfit.text, cps: 26 })
  evs.sort((a, b) => a.t - b.t || (a.kind === 'note') - (b.kind === 'note'))
  const E = evs.map((e, k) => {
    const len = mkLen(e.str)
    const cps = e.cps ?? Math.max(8, len / Math.max(0.15, e.dur || typeDur))
    return { ...e, len, cps, dur: len / cps, from: e.from ?? 0, eraseAt: k === 0 ? -Infinity : e.erase ?? e.t - 0.22 }
  })
  const first = E[0]
  const firstRow = first && first.row != null ? first.row : 0
  // frame 1: slot 1 is already mid-formula (at a word boundary near formulaAt0)
  const cut = !first ? 0 : first.kind === 'item' && T[first.row].pre ? first.len : wordCut(first.str, opt(spec, 'formulaAt0', 0.7))
  if (first) first.from = cut
  const typedAt = (e, t) => (t < e.t ? Math.min(e.from, e.len) : Math.min(e.len, e.from + Math.floor((t - e.t) * e.cps + 1e-6)))
  const typeEnd = e => e.t + Math.max(0, e.len - e.from) / e.cps
  // when each row's label drops in (reveal mode): as the selection first arrives
  const rowStart = items.map((_, r) => {
    if (r === firstRow) return -Infinity
    const e = E.find(x => x.row === r)
    return e ? e.eraseAt : T[r].t0 - 0.22
  })

  // ---------------------------------------------------------------- duration
  const vEv = E.find(e => e.kind === 'verdict')
  const beats = [lastLand, ...E.filter(e => e.kind !== 'verdict').map(typeEnd)]
  const duration = durationOf(spec, { beats, hold: d.hold ?? 3, loop: loopOn, verdictEnd: vEv ? typeEnd(vEv) : null })
  const D = spec.duration || duration
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------------------------------------------------------------- DOM
  const colX = [gut, gut + P.wA, W]
  const colW = [P.wA, W - gut - P.wA]
  const card = h('div', { class: 'ls-card', style: { left: X + 'px', top: Y + 'px', width: W + 'px' } })
  L.append(card)
  const fbar = formulaBar(card, { x: 0, y: 0, w: W, ht: fFit.ht, px: fFit.px, lines: fFit.lines, verdict: vMode === 'formula' ? verdict.text : null })

  const lettersH = P.letters ? G.lettersH : 0
  let letterEls = []
  if (lettersH) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fFit.ht + 'px', height: lettersH + 'px' } },
      h('i', { class: 'ls-corner', style: { width: gut + 'px' } }))
    letterEls = [0, 1].map(j => h('b', { text: 'AB'[j], style: { left: colX[j] + 'px', width: colW[j] + 'px' } }))
    row.append(...letterEls)
    card.append(row)
  }

  // header row = the input (mint): label + note on the left, the viewer's number on the right
  const headY = fFit.ht + lettersH
  const headH = P.headH
  const heads = h('div', { class: 'ls-heads', style: { top: headY + 'px', height: headH + 'px' } })
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: '', style: { width: gut + 'px', height: headH + 'px' } })
  const hA = h('div', { class: 'ls-hcell input', style: { left: colX[0] + 'px', width: colW[0] + 'px', height: headH + 'px' } },
    h('div', { class: 'ls-hl', html: mk(hLabelA), style: P.hlA > 1 ? { whiteSpace: 'normal' } : {} }),
    hNoteA ? h('div', { class: 'ls-hsub', html: mk(hNoteA), style: P.hsA > 1 ? { whiteSpace: 'normal' } : {} }) : null)
  const hB = input
    ? h('div', { class: 'ls-hcell input dsl-hv', style: { left: colX[1] + 'px', width: colW[1] + 'px', height: headH + 'px' } },
      h('div', { class: 'dsl-hval', html: mk(input.value), style: { fontSize: P.res + 'px' } }))
    : h('div', { class: 'ls-hcell output', style: { left: colX[1] + 'px', width: colW[1] + 'px', height: headH + 'px' } },
      h('div', { class: 'ls-hl', html: mk(hLabelB) }))
  heads.append(headNum, hA, hB)
  card.append(heads)

  const bodyY = headY + headH
  // the tooltip slot is planned for (P.bottom) but not drawn: the card grows while a tooltip is open
  const bodyH = N * rowH + TAIL
  const body = h('div', { class: 'ls-body', style: { top: bodyY + 'px', height: bodyH + 'px' } })
  card.append(body)
  setStyle(card, { height: bodyY + bodyH + 'px' })
  const bodyTop = Y + bodyY
  // un-numbered sheet under the last row (and the room a tooltip opens into)
  const tailEl = h('div', { class: 'dsl-tail', style: { top: N * rowH + 'px', height: TAIL + 'px', backgroundImage: `linear-gradient(90deg, ${C.head} ${gut - 2}px, ${C.grid} ${gut - 2}px, ${C.grid} ${gut}px, ${C.sheet} ${gut}px)` } })
  body.append(tailEl)
  const setGrow = px => { const g = Math.round(px); setStyle(card, { height: bodyY + bodyH + g + 'px' }); setStyle(body, { height: bodyH + g + 'px' }); setStyle(tailEl, { height: TAIL + g + 'px' }) }

  const rowEls = [], numEls = [], labEls = [], subEls = [], sufEls = [], res = []
  items.forEach((it, r) => {
    const num = h('div', { class: 'ls-rn', 'data-deco': '', text: String(startRow + r), style: { width: gut + 'px', height: rowH + 'px' } })
    // the working stays on the sheet once the formula bar moves on (when no tier shows it): as a grey line under a
    // label that leaves the row room for one, else as a grey suffix on a one-line label
    const fs0 = itemStr(r)
    const workFree = fs0 && !(P.hasSub && P.sub === 'formula')
    const lineOK = workFree && !P.hasSub && P.labLines[r] * P.lab * P.lh + DENS[P.density].subH <= rowH - 2 * DENS[P.density].padY && tw(mk(fs0), font(600, 40), '-0.01em') <= P.inA
    const sufOK = workFree && !lineOK && P.labLines[r] === 1 &&
      tw(mk(it.label || ''), font(800, P.lab), '-0.014em') + tw(mk(fs0), font(600, 40), '-0.01em') + 40 <= P.inA
    const suf = sufOK ? h('span', { class: 'dsl-suf', html: mk(fs0) }) : lineOK ? h('div', { class: 'dsl-sub', html: mk(fs0) }) : null
    const lab = h('div', { class: 'dsl-lab', html: mk(it.label || ''), style: { fontSize: P.lab + 'px', lineHeight: String(P.lh), width: P.inA + 'px' } })
    if (sufOK) lab.append(' ', suf)
    const subText = P.sub === 'formula' ? it.formula : P.sub === 'note' ? it.note : ''
    const sub = P.hasSub ? h('div', { class: 'dsl-sub', html: subText ? mk(subText) : '' }) : null
    const cellA = h('div', { class: 'ls-cell input left dsl-a words', style: { left: colX[0] + 'px', width: colW[0] + 'px', height: rowH + 'px' } }, lab, sub, lineOK ? suf : null)
    const rt = h('span', { class: 'dsl-rt' })
    const strike = h('i', { class: 'dsl-strike' })
    const v = h('span', { class: 'ls-v' }, rt, strike)
    const cellB = h('div', { class: 'ls-cell output right', style: { left: colX[1] + 'px', width: colW[1] + 'px', height: rowH + 'px', fontSize: P.res + 'px', paddingRight: PAD + HANDLE_PAD + 'px' } }, v)
    const row = h('div', { class: 'ls-row', style: { top: r * rowH + 'px', height: rowH + 'px' } }, num, cellA, cellB)
    body.append(row)
    rowEls.push(row); numEls.push(num); labEls.push(lab); subEls.push(sub); sufEls.push(suf)
    res.push({ el: cellB, v, rt, strike })
  })
  const sel = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  const over = h('div', { class: 'ls-over' })
  body.append(over, sel)
  const refLayer = h('div', { class: 'dsl-refs' })
  card.append(refLayer)

  // geometry (stage px)
  const rowTop = (r, dy = 0) => bodyTop + r * rowH + dy
  const cellRect = (r, c, dy = 0) => ({ x0: X + colX[c], y0: rowTop(r, dy), x1: X + colX[c] + colW[c], y1: rowTop(r, dy) + rowH })
  const inputRect = { x0: X + colX[1], y0: Y + headY, x1: X + W, y1: Y + headY + headH }

  // ---------------------------------------------------------------- tooltips (notes)
  const shApi = { over, w: W, gutter: gut, x: X, bodyTop }
  const tips = []
  items.forEach((it, r) => {
    if (!tipNote(r)) return
    const openAt = T[r].res + (r === countIdx ? M.count + 0.36 : 0.28) // after a count-up, clear of its landing pop
    const leave = Math.min(...E.filter(e => e.eraseAt > T[r].res + 0.05).map(e => e.eraseAt), verdict ? verdict.t : Infinity, loopT0)
    const closeAt = leave - 0.28
    const cell = cellRect(r, 1)
    const wpx = tipFit.w[r]
    const x1 = Math.min(X + W - 12, Math.max(cell.x1 - 10, X + gut + 12 + wpx))
    const x0 = Math.max(X + gut + 12, x1 - wpx)
    // the label is written once, so a hidden pill's DOM never depends on what was shown before
    const strip = tipStrip(shApi, { px: tipPx, html: tipFit.html[r], wrap: tipFit.wrap })
    tips.push({ r, openAt, closeAt, strip, win: tipWindow(openAt, closeAt), box: { x0, x1, notchX: clamp((cell.x0 + cell.x1) / 2, x0 + 34, x1 - 34) } })
  })
  const openOf = (tp, t) => tp.win.open(t)
  // a row's working suffix rises in when the formula bar moves on (or 0.5 s after the result when nothing follows)
  const sufT = items.map((_, r) => { const nx = E.find(e => e.eraseAt > T[r].res && e.row !== r); return nx ? nx.eraseAt + 0.1 : T[r].res + 0.5 })
  const shiftAt = (r, t) => { let dy = 0; for (const tp of tips) if (r > tp.r) dy += slotH * openOf(tp, t); return dy }

  // ---------------------------------------------------------------- notes a later row's working relies on
  // A note that carries a number no cell shows ("so you borrow $16,800") but a later formula uses ("$16,800 × 0.024")
  // stays on the sheet once its tooltip (or the bar) moves on: the row's grey working line becomes "working · note"
  // when that fits, else the note alone, so the finished table explains itself.
  const keep = items.map((it, r) => {
    const el = subEls[r] && P.sub === 'formula' ? subEls[r] : sufEls[r]
    if (!it.note || !el || (P.hasSub && P.sub === 'note')) return null
    if (!keepNeed[r]) return null
    const isSuf = el === sufEls[r] && el.classList.contains('dsl-suf')
    const room = isSuf ? P.inA - tw(mk(it.label || ''), font(800, P.lab), '-0.014em') - 40 : P.inA
    // the working and the note; else the note; else the note without its lead-in words ("so you borrow $16,800"
    // → "borrow $16,800"), as long as its number stays
    const note = String(it.note), cands = [`${itemStr(r).replace(/^=\s*/, '')} · ${note}`, note]
    let rest = note
    for (let k = 0; k < 2; k++) {
      const m = /^(?:so|and|then|which|that's|thats|you|we|i)\s+(.+)$/i.exec(rest)
      if (!m || !amounts(m[1]).length) break
      rest = m[1]; cands.push(rest)
    }
    const pick = cands.find(x => tw(mk(x), font(600, 40), '-0.01em') <= room)
    if (!pick) return null
    const tp = tips.find(x => x.r === r)
    const bn = barNotes.find(x => x.row === r)
    const nextE = bn ? E.find(e => e.eraseAt > bn.t + 0.05) : null
    const at = tp ? tp.closeAt + 0.3 : nextE ? nextE.eraseAt + 0.1 : sufT[r] + 0.6
    return { el, html0: el.innerHTML, html1: mk(pick), at }
  })

  // ---------------------------------------------------------------- reference outlines
  // while a formula types, every cell whose number it uses gets a dashed outline (from the moment the number is typed)
  const inTok = input ? numToken(input.value) : null
  const refs = []
  E.forEach((e, k) => {
    if (e.kind === 'verdict' || e.kind === 'note' || !e.str) return
    const targets = new Map()
    if (inTok) { const end = tokenEnd(e.str, inTok); if (end > 0) targets.set('in', end) }
    items.forEach((it, r) => {
      if (r === e.row || T[r].res > e.t + 1e-6) return
      const tok = numToken(it.result)
      if (!tok) return
      const end = tokenEnd(e.str, tok)
      if (end > 0) targets.set(r, end) // later rows win: the most recent cell holding that number
    })
    const next = E[k + 1]
    const done = e.kind === 'check' ? typeEnd(e) + 1.2 : (e.res ?? typeEnd(e)) + 0.35
    const end = Math.min(done, next ? next.eraseAt : Infinity)
    for (const [target, chars] of targets) {
      const appear = chars <= e.from ? -Infinity : e.t + (chars - e.from) / e.cps
      refs.push({ target, appear, end, frame1: k === 0 && appear === -Infinity, el: refLayer.appendChild(h('div', { class: 'dsl-ref' })) })
    }
  })

  // ---------------------------------------------------------------- selection keyframes
  const cellR = (r, t) => cellRect(r, 1, shiftAt(r, t))
  const colR = t => ({ x0: X + colX[1], x1: X + W, y0: rowTop(0, shiftAt(0, t)), y1: rowTop(N - 1, shiftAt(N - 1, t)) + rowH })
  const K = [{ t: -Infinity, rect: t => cellR(firstRow, t), head: [firstRow, firstRow, 1, 1] }]
  for (const e of E.slice(1)) {
    if (e.row != null) K.push({ t: e.eraseAt, dur: M.move, e: ease.inOut, rect: t => cellR(e.row, t), head: [e.row, e.row, 1, 1] })
    else K.push({ t: e.eraseAt, dur: 0.34, e: ease.inOut, rect: colR, head: [0, N - 1, 1, 1] })
  }
  if (vMode === 'band') K.push({ t: verdict.t, dur: 0.34, e: ease.inOut, rect: colR, head: [0, N - 1, 1, 1] })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: t => cellR(firstRow, t), head: [firstRow, firstRow, 1, 1] })
  K.sort((a, b) => a.t - b.t)
  const rectAt = (k, t) => (k === 0 ? K[0].rect(t) : lerpRect(rectAt(k - 1, t), K[k].rect(t), K[k].e(prog(t, K[k].t, K[k].dur))))

  // ---------------------------------------------------------------- formula bar state
  const htmlOf = (e, n, t) => typedMk(e.str, n) + (e.kind === 'check' && checkHTML && n >= e.len && t >= typeEnd(e) + 0.08 ? checkHTML : '')
  function barState(t) {
    if (!first) return { html: '', caret: caretOn(t, false) }
    let k = 0
    for (let i = 1; i < E.length; i++) if (t >= E[i].eraseAt) k = i
    if (t >= loopT0) {
      // erase whatever shows, then retype the frame-1 prefix
      let kk = 0
      for (let i = 1; i < E.length; i++) if (loopT0 >= E[i].eraseAt) kk = i
      const cur = E[kk], shown = typedAt(cur, loopT0), e1 = 0.22
      if (t < loopT0 + e1) {
        const n = Math.round(shown * (1 - prog(t, loopT0, e1)))
        return { html: typedMk(cur.str, cur === first ? Math.max(cut, n) : n), caret: true, verdict: cur.kind === 'verdict' }
      }
      return { html: typedMk(first.str, cur === first ? cut : Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true }
    }
    const e = E[k]
    if (t < e.t && k > 0) {
      // backspacing the previous formula
      const p = E[k - 1], n0 = typedAt(p, e.eraseAt)
      const n = Math.round(n0 * (1 - prog(t, e.eraseAt, Math.max(0.05, e.t - e.eraseAt - 0.03))))
      return { html: typedMk(p.str, n), caret: true, verdict: p.kind === 'verdict' }
    }
    const n = typedAt(e, t)
    return { html: htmlOf(e, n, t), caret: caretOn(t, t >= e.t && n < e.len), verdict: e.kind === 'verdict' }
  }

  // ---------------------------------------------------------------- sound
  E.forEach((e, k) => {
    const dur = Math.max(0, e.len - e.from) / e.cps
    if (dur > 0.06) ctx.cue(Math.max(0, e.t), 'type', { dur, gain: 0.55 })
    if (e.kind === 'check') ctx.cue(typeEnd(e) + 0.08, 'pop', { gain: 0.6 })
    if (e.kind === 'verdict') ctx.cue(typeEnd(e) + 0.05, 'ding')
  })
  items.forEach((_, r) => {
    if (T[r].pre) return
    if (r === countIdx) { ctx.cue(T[r].res, 'roll', { dur: M.count }); ctx.cue(T[r].res + M.count, 'pop') }
    else ctx.cue(T[r].res, 'tick', { gain: 0.6 })
  })
  wrongs.forEach(w => { ctx.cue(w.res, 'tick', { gain: 0.5 }); if (Number.isFinite(w.strikeT)) ctx.cue(w.strikeT, 'buzz', { gain: 0.5 }) })
  tips.forEach(tp => ctx.cue(tp.openAt + 0.12, 'pop', { gain: 0.45 }))
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------------------------------------------------------------- frame
  const sweepAt = r => (verdict ? verdict.t + 0.18 + r * Math.min(0.12, 0.7 / N) : Infinity)
  const withOut = (st, out) => { const lo = liftOut(out); return lo ? { opacity: String(Math.min(+st.opacity, +lo.opacity)), transform: lo.transform } : st }
  function hiRow(r, a, wipe) {
    if (a <= 0.001 || wipe <= 0.001) { setStyle(rowEls[r], { backgroundColor: C.sheet, backgroundImage: 'none' }); return }
    if (wipe >= 1) { setStyle(rowEls[r], { backgroundColor: rgba(C.rowHi, a), backgroundImage: 'none' }); return }
    const x = (wipe * 100).toFixed(2)
    setStyle(rowEls[r], { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(C.rowHi, a)} ${x}%, ${C.sheet} ${x}%)` })
  }

  return {
    duration,
    chrome: {
      footer: { top: Y + bodyY + bodyH + G.gap },
      footerShift: t => shiftAt(N, t),
      captionHolds: countIdx >= 0 ? [{ text: items[countIdx].result, t: T[countIdx].res + M.count }] : [],
      captions: capsOn,
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar: the verdict takes it over in ink, heavier, as the ≈ chip pops
      const fs = barState(t)
      fbar.set(fs.html, { caret: fs.caret })
      fbar.verdictStyle(!!fs.verdict, vEv ? prog(t, verdict.t, 0.2) : 0)
      const chipP = vMode === 'formula' ? prog(t, vType0 - 0.1, 0.34) : 0
      setStyle(fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      for (let r = 0; r < N; r++) {
        const dy = Math.round(shiftAt(r, t))
        setStyle(rowEls[r], { transform: dy ? `translateY(${dy}px)` : 'none' })
      }
      for (let r = 0; r < N; r++) {
        const it = items[r], tm = T[r]
        const out = !tm.pre && loopOn ? prog(t, loopT0 + 0.02 + ((N - 1 - r) / Math.max(1, N - 1)) * 0.14, 0.2) : 0
        // label: drops in when the selection first reaches the row (or always there)
        const keepLab = labelsAlways || r === firstRow
        setStyle(labEls[r], keepLab ? { opacity: '1', transform: 'none' } : withOut(dropIn(prog(t, rowStart[r], 0.24), 14), out))
        // the working line rises in under the label as the result lands (from below: it never crosses the label)
        const kp = keep[r]
        const swapped = kp && t >= kp.at && t < loopT0
        if (kp) setHTML(kp.el, swapped ? kp.html1 : kp.html0)
        if (subEls[r]) setStyle(subEls[r], withOut(riseIn(tm.pre ? 1 : prog(t, swapped && kp.el === subEls[r] ? kp.at : tm.res + 0.12, 0.26), 10), out))
        // the working suffix arrives once the formula bar moves on from this row (it keeps the maths visible)
        if (sufEls[r]) setStyle(sufEls[r], withOut(riseIn(tm.pre ? 1 : prog(t, swapped && kp.el === sufEls[r] ? kp.at : sufT[r], 0.26), 8), out))
        // goal row: yellow wipes in once its answer is in
        const goalT = tm.res + (r === countIdx ? M.count : 0.1)
        if (r === goalIdx) hiRow(r, 1 - (loopOn ? ease.out(prog(t, loopT0, 0.2)) : 0), tm.pre ? 1 : ease.inOut(prog(t, goalT, 0.3)))
        else hiRow(r, 0, 0)

        // result cell
        const w = wrongOf[r]
        let text = '', p = 0, color = toneColor(it.tone), fill = 'transparent', flash = 0, scale = 1, strike = 0, gone = out
        if (w && t >= w.res && t < tm.res) {
          text = String(w.result)
          p = prog(t, w.res, M.drop)
          strike = Number.isFinite(w.strikeT) ? ease.out(prog(t, w.strikeT, 0.26)) : 0
          color = strike > 0 ? C.bad : C.slate
          flash = flashAlpha(t, w.res + 0.06)
          gone = Math.max(out, prog(t, tm.res - 0.14, 0.14)) // it lifts out just before the real answer lands
        } else if (tm.pre || t >= tm.res) {
          text = it.result || ''
          p = tm.pre ? 1 : prog(t, tm.res, M.drop)
          if (r === countIdx) {
            text = countText(it.result, ease.out(prog(t, tm.res, M.count)))
            p = prog(t, tm.res, 0.16)
            const pp = prog(t, tm.res + M.count - 0.02, 0.24)
            scale = pp > 0 && pp < 1 ? 1 + 0.1 * (1 - ease.out(pp)) : 1 // settles from 110%, never under 100%
          }
          flash = tm.pre ? 0 : Math.max(flashAlpha(t, tm.res + 0.06), flashAlpha(t, sweepAt(r), 0.32))
          // a goal answer sits on the yellow; it fades with its text in the loop clear
          if (toneFill(it.tone) !== 'transparent' && p >= 1 && out < 1) fill = out > 0 ? rgba(toneFill(it.tone), 1 - ease.out(out)) : toneFill(it.tone)
        }
        const c = res[r]
        setHTML(c.rt, resHTML(text))
        // an empty or hidden value parks at its rest transform (no scaled, invisible layer under the selection tint)
        let st = p <= 0 || !text ? { opacity: '0', transform: 'none' } : withOut(snapIn(p), gone)
        if (scale !== 1 && st.transform === 'none') st = { ...st, transform: `scale(${scale.toFixed(4)})` }
        setStyle(c.v, { ...st, color })
        setStyle(c.el, { backgroundColor: fill !== 'transparent' ? fill : flash > 0.001 ? rgba(C.rowHi, flash) : 'transparent' })
        setStyle(c.strike, { opacity: strike > 0 ? '1' : '0', transform: `scaleX(${strike.toFixed(3)})` })
      }

      // note tooltips: the slot opens (the card grows), then the pill wipes out of its notch with its text in place
      setGrow(shiftAt(N, t))
      for (const tp of tips) tp.strip.set({ ...tp.box, y: rowTop(tp.r, shiftAt(tp.r, t)) + rowH, ht: slotH, open: tp.win.open(t), reveal: tp.win.reveal(t) })

      // reference outlines
      for (const rf of refs) {
        let a = (rf.appear === -Infinity ? 1 : prog(t, rf.appear, 0.1)) * (1 - prog(t, rf.end, 0.18))
        if (loopOn) a = Math.max(a * (1 - prog(t, loopT0, 0.15)), rf.frame1 ? prog(t, loopT0 + 0.32, 0.12) : 0)
        if (a <= 0.001) { setStyle(rf.el, PARK); continue }
        const b = rf.target === 'in' ? inputRect : cellRect(rf.target, 1, shiftAt(rf.target, t))
        setStyle(rf.el, {
          opacity: a.toFixed(3), transform: 'none', transformOrigin: '0px 0px', left: (b.x0 - X + 3).toFixed(1) + 'px', top: (b.y0 - Y + 3).toFixed(1) + 'px',
          width: (b.x1 - b.x0 - 6).toFixed(1) + 'px', height: (b.y1 - b.y0 - 6).toFixed(1) + 'px',
        })
      }

      // selection (with its fill handle) and the blue row number / column letter
      let k = 0
      for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
      const rc = rectAt(k, t)
      setStyle(sel, {
        opacity: '1', left: (rc.x0 - X).toFixed(2) + 'px', top: (rc.y0 - bodyTop).toFixed(2) + 'px',
        width: (rc.x1 - rc.x0).toFixed(2) + 'px', height: (rc.y1 - rc.y0).toFixed(2) + 'px',
      })
      // the fill handle straddles the bottom gridline (below the value's baseline, never read as a full stop)
      setStyle(sel.firstChild, { right: '3px', bottom: rc.y1 > bodyTop + N * rowH + shiftAt(N, t) - 2 ? '3px' : '-9px' })
      const [r0, r1, c0, c1] = K[k].head
      numEls.forEach((el, r) => { const on = r >= r0 && r <= r1; setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
      letterEls.forEach((el, j) => { const on = j >= c0 && j <= c1; setStyle(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
    },
  }
}
