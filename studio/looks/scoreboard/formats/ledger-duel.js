// Scoreboard: ledger-duel — the "2 people invest" ledger duel (P4) as a two-team scoreboard.
//
// Same stake, two choices side by side; a year-by-year ledger fills both sides at once, often with a crash row
// mid-way; the winner lights up at the end (Jake's 11 s duel, played as HD Guy's live scoreboard).
//   Top bar   the hook and the footer (the assumption line, and lookOpts.footerSteps): the chrome's. No hero row:
//             the two panels are the heroes.
//   Stage     from the top:
//             - the TICKER, big in the top-left corner (x 140): the current row's key ("2008", "AGE 45"). A key's word
//               part ("AGE") is set small and grey before the number; when only the number moves it rolls on an
//               odometer (0.32 s) and bumps; any other change (text keys: "Start") is a hard cut (slam). Coral on a
//               bad row. A key too wide for its room shrinks (the pips keep theirs).
//             - the PIPS, right-aligned on the ticker's baseline: one LED bar per row (passed dim green, current lit,
//               ahead dark, bad rows coral), so the open loop is countable from frame 1 (decoration).
//             - the STRIP (the mini ledger of past rows): when a row cuts, the row it replaces ships out of the panels
//               into the strip's bottom slot (it rises out from behind them in 0.2 s, the older lines move up a slot,
//               the oldest fades off the top). Key on the left (grey), each value right-aligned over its own panel
//               (Anton 42-44 px, tabular digits, the person's colour; a value that fell is coral; a bad row keeps a
//               coral slot edge and key). Empty slots are LED-off skeletons from frame 1. 2-6 slots, as many as the
//               stage leaves (under 2 the strip is dropped, unless lookOpts.strip asks for it).
//             - the two PANELS, side by side (x 140-530 | 550-940; the kit's sb-panel box and lit border): a colour
//               stripe, the name (Anton caps in the person's colour, green | yellow; a name too long for 44 px takes
//               two balanced lines), the plan (Inter 40 grey; a " · " piece that names money or a rate is white; one
//               line when it fits, else one line per " · " piece, a long piece wrapping in balanced lines of its own),
//               a hairline, then the odometer (Anton, one size for both panels: the widest value either side ever
//               shows fits at the 1.1x landing bump, 56-112 px). Each row both odometers roll from the previous values
//               on one ease.out curve (the "≈" an unlit ghost until they land, exactly on the row's display strings)
//               and land with a bump and a glow flare. A value that falls rolls coral and stays coral until the next
//               row. A cell that is not a number ("—") is a hard cut. With lookOpts.leader the leading panel's border
//               is lit in its colour; a lead change bumps the new leader (swipe).
//   Rows      each row is a hard cut (thud): ticker, pips and strip move, then the roll (0.08 s later). Rows < 1.6 s
//             apart keep a thud-ding rhythm (no roll hiss). A row with tone "bad" (a crash) flashes coral across both
//             panels: a coral wash wipes left to right over both, both borders flare coral, the ticker turns coral
//             (thud + buzz). Other event rows flash in their tone (good/goal green, neutral white).
//   Last row  the climax (unless it is a crash): it rolls up to 2.4 s (lookOpts.finalRoll) over a riser and lands
//             with hit + cash, a 1.1x bump and full glow on the bigger value and a green floor bloom. An event on the
//             last row waits for that landing (a crash's still lands with its cut).
//   Summary   (lookOpts.summary, e.g. the final multiples) one line under each panel's number ("GREW ≈ 7.5×": label
//             grey caps, value in the person's colour or the tone's), its slot LED-off from frame 1. When label +
//             value don't fit one line at 40 px, it becomes the ledger's TOTALS line instead: it ships into the strip
//             after the last row (key = the label in white, a heavier slot edge in the tone's colour); with no strip,
//             the label sits over the value in the panel. It slams in at its t (pop).
//   Bottom    the label stack (the kit's): line 1 the working (data.stake at rest; lookOpts.working steps cut it),
//             line 2 the matchup "NAME VS NAME" in the panels' colours; an event cuts line 2 to the event (in its tone
//             colour), held 2.5 s (lookOpts.eventHold) or until the next event. Every change is a hard cut (slam),
//             centred in the slot. A working line that starts with a person's name ("Ava: ...") sets the name in that
//             person's colour.
//   Verdict   the chrome's, in the label slot at the foot of the frame (the stack yields). At verdict.t (or
//             lookOpts.winnerT, or 1.2 s after the last landing / mark) the WINNER panel floods neon: it fills with its
//             colour in 0.22 s, its type turns black, the border glows; the other panel steps back to 60%.
// Frame 1: the header, both panels named with their plans, the ticker on row 1's key and both odometers showing a
//   number. Row 1 at t <= 0.05 is landed on frame 1 (the whole bet: "$10,000 | $10,000"); a later row 1 (no start
//   row) has both odometers already counting up from 0 on frame 1, landing 0.6 s after its t (its key is in the
//   ticker from frame 1, no cut).
// Timing: rows without t start at rowsT (default 1.0) and come every rowEvery s (default 1.0), plus eventPause
//   (1.0 s) after an event row. A roll lasts 0.8-1.9 s by the jump, capped to land 0.12 s before the next cut.
// Layout: layoutFor(spec, { hero: false }). The ticker on the stage top, the panels on the stage foot, the strip
//   right above the panels in the room between (the ticker gives up size, down to 80 px, before the strip goes under
//   2 slots); room to spare grows the strip's pitch, then the ticker, and what is still left centres the block in the
//   stage. If the verdict must land on a band over the stage foot (a lookOpts.stageBottom), the block ends above it.
//   Below y 820 every text ends by x 918.
//
// data (FORMATS.md §7): { people: [{ name, plan }] x2, stake, rows: [{ t?, label, values: [a, b], event?, tone? }],
//   rowsT, rowEvery, winner, hold }. winner: the panel that floods (default: the better last row by
//   lookOpts.leader's rule; null: no flood).
// lookOpts (all optional; it renders fully without them):
//   leader: 'high' | 'low' | false   the leading panel's border lit in its colour (default 'high'; 'low' for a
//                                    cost or debt duel, where less is better; false: off). A lead change bumps it
//   colors: [a, b]                   the people's colours: theme keys ('green', 'yellow', 'white', 'red') or hex
//                                    (default green, yellow)
//   strip: 'auto' | true | false | n the mini ledger of past rows ('auto': 2-6 slots as the stage allows, else none;
//                                    true: also 1 slot; n: at most n slots; false: none)
//   pips: true | false               the row pips beside the ticker (default true)
//   working: [{ t, text }]           the working line (label stack line 1) over time; data.stake before the first.
//                                    formulaBar (the live sheet's) is read as an alias; a leading "= " is dropped
//   matchup: true | false            label stack line 2 rests on "NAME VS NAME" (default true)
//   eventHold: 2.5                   s an event holds label stack line 2
//   eventPause: 1.0                  extra s after an event row when rows have no t
//   marks: [{ t, row, person }]      the picture follows a VO that names one finished value: at t (once the row has
//                                    landed) that value takes the focus until the next mark or the winner beat. On
//                                    the panels: its border lights in the person's colour, the value bumps and
//                                    flares, the other panel's value steps back to 70%. In the strip: a ring in the
//                                    person's colour around that cell. (tick)
//   summary: { t?, label, values: [a, b], tone? }   see Summary above; t defaults to 0.5 s after the last landing
//   finalRoll: 2.4                   s the last row rolls (capped to land 1.3 s before the verdict with a summary,
//                                    0.6 s without, and before a mark on the last row)
//   winnerT: s                       the winner beat when there is no verdict (default: 1.2 s after the last
//                                    landing, or 1.6 s after the last mark; reveal)
//   footerSteps, stageBottom         kit-wide
//   (other looks' keys are ignored: the live sheet's rowLabelsAtStart, eventStyle, total and summary placement,
//   the becker rig's acting keys. The pips count the rows ahead and events always cut the label stack)
import { h, css as style, setHTML, attr, prog, ease, clamp, lerp } from '../../../runtime/core.js'
import { C, M, layoutFor, measureText } from '../theme.js'
import {
  esc, rich, richUI, bare, tabHTML, odometer, parseDisplay, slam, bump, flashAt, stageFlash, labelStack, durationOf,
  inkWidth, toneColor,
} from '../lib.js'

const PX = [140, 550], PW = 390        // panels: x 140-530 | 550-940
const PAD = 20                         // panel inner padding (text x 160-510 | 570-920)
const SX = 140, SW = 800               // strip slots: x 140-940
const SKX = 22                         // strip key inset
const VR = [PX[0] + PW - 22, PX[1] + PW - 22]   // strip values' right edges: over each panel's inner right edge
const DIP = 0.08                       // a cut lands (thud, ticker, ship) before the roll starts
const LEAD = 0.45                      // intro: frame 1 is this far into the first count
const AFTER = 0.6                      // intro: the first count lands this long after row 1's t
const SHIFT = 0.2                      // a strip ship (rows move up one slot)
const TICK = 0.32                      // the ticker's roll
const EV_HOLD = 2.5
const PLAN_LH = 46
const FONT_PLAN = "600 40px 'Inter', 'Inter Full', sans-serif"
const FONT_ANTON = "400 100px 'Anton', 'Inter Full', sans-serif"

export const css = `
.ld-panel { display: block !important; padding: 0; overflow: visible; }
.ld-stripe { position: absolute; left: 22px; right: 22px; top: -3px; height: 7px; border-radius: 0 0 5px 5px; }
.ld-wash { position: absolute; left: 0; top: 0; right: 0; bottom: 0; border-radius: 15px; opacity: 0; }
.ld-flood { position: absolute; left: 0; top: 0; right: 0; bottom: 0; border-radius: 15px; opacity: 0; }
.ld-name { position: absolute; left: ${PAD}px; right: ${PAD}px; text-align: center; font: 400 56px/1 'Anton', 'Inter Full', sans-serif;
  text-transform: uppercase; letter-spacing: 0.01em; white-space: nowrap; }
.ld-name.two { white-space: normal; text-wrap: balance; }
.ld-plan { position: absolute; left: ${PAD - 6}px; right: ${PAD - 6}px; display: flex; flex-direction: column; justify-content: center; }
.ld-pl { display: block; text-align: center; font: 600 40px/${PLAN_LH}px 'Inter', 'Inter Full', sans-serif; color: ${C.grey}; white-space: nowrap; }
.ld-pl.wrap { white-space: normal; text-wrap: balance; }
.ld-pl b { font-weight: 700; color: ${C.white}; }
.ld-rule { position: absolute; left: ${PAD}px; right: ${PAD}px; height: 2px; background: ${C.edge}; }
.ld-vbox { position: absolute; left: 0; width: 100%; display: flex; align-items: center; justify-content: center; }
.ld-val { transform-origin: 50% 55%; }
.ld-val .sb-odo-fix { text-transform: uppercase; }
/* a bump scales the clipped digit columns: trim the clip a hair so the next digit's top never shows as a sliver
   (Anton's digits sit at 0.02-0.89em of the 1em column) */
.ld-val .sb-odo-col, .ld-tick-num .sb-odo-col { clip-path: inset(0.01em 0 0.07em 0); }
.ld-vtxt { font: 400 1em/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; white-space: nowrap; }
.ld-sum { position: absolute; left: ${PAD - 8}px; right: ${PAD - 8}px; display: flex; align-items: center; justify-content: center; gap: 14px; transform-origin: 50% 50%; }
.ld-sum.two { flex-direction: column; gap: 6px; }
.ld-sum-lab { font: 700 40px/1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.grey}; white-space: nowrap; }
.ld-sum-val { font: 400 48px/1 'Anton', 'Inter Full', sans-serif; letter-spacing: 0.01em; white-space: nowrap; }
.ld-tick { position: absolute; left: 0; top: 0; }
.ld-tick-pre { position: absolute; left: 0; top: 0; font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; text-transform: uppercase;
  letter-spacing: 0.02em; color: ${C.grey}; white-space: nowrap; }
.ld-tick-num { position: absolute; top: 0; transform-origin: 0 60%; }
.ld-tick-txt { position: absolute; left: 0; top: 0; font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; text-transform: uppercase;
  letter-spacing: 0.01em; white-space: nowrap; transform-origin: 0 60%; }
.ld-pips { position: absolute; }
.ld-pips i { position: absolute; top: 0; display: block; border-radius: 5px; transform-origin: 50% 100%; }
.ld-srow { position: absolute; left: ${SX}px; width: ${SW}px; }
.ld-sslot { position: absolute; left: 0; top: 0; width: ${SW}px; box-sizing: border-box; border-radius: 10px; border: 2px solid ${C.edge}; background: ${C.panel}; }
.ld-skel { position: absolute; border-radius: 99px; background: #131820; }
.ld-scell { position: absolute; top: 0; font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; white-space: nowrap; letter-spacing: 0.01em; text-transform: uppercase; }
.ld-scell .ax, .ld-scell .axo { font-size: max(0.86em, min(1em, 40px)); }
.ld-sslot.total { border-width: 3px; box-shadow: 0 -2px 0 rgba(255, 255, 255, 0.06); }
.ld-ring { position: absolute; box-sizing: border-box; border-radius: 10px; border: 3px solid; opacity: 0; }
.ld-vs { color: ${C.grey}; }
.ld-panel.fl .ld-pl, .ld-panel.fl .ld-pl b, .ld-panel.fl .ld-sum-lab, .ld-panel.fl .ld-sum-val { color: ${C.bar} !important; }
`

// ---------- local helpers ----------
const hex2rgb = hex => { const x = parseInt(hex.slice(1), 16); return [x >> 16, (x >> 8) & 255, x & 255] }
const rgba = (hex, a) => `rgba(${hex2rgb(hex).join(', ')}, ${a})`
const mix = (a, b, k) => { const p = hex2rgb(a), q = hex2rgb(b); return `rgb(${p.map((v, i) => Math.round(lerp(v, q[i], clamp(k)))).join(', ')})` }
const colorOf = (c, dflt) => {
  if (typeof c !== 'string' || !c) return dflt
  if (/^#[0-9a-f]{6}$/i.test(c)) return c.toUpperCase()
  return C[c] && /^#/.test(C[c]) ? C[c] : dflt
}
const toneCol = tone => (tone === 'bad' ? C.red : tone === 'good' || tone === 'goal' ? C.green : C.white)
// a key as an odometer-able "WORDS 45" (the number at the end, at most 4 digits, no grouping), else plain text
const keyParts = str => {
  const m = /^(.*?)(\d{1,4})$/.exec(String(str).trim())
  return m ? { pre: m[1].trim(), num: +m[2], digits: m[2], text: String(str) } : { pre: null, num: NaN, text: String(str) }
}
// a display string's running template (NaN value: not a number, shown as text)
const tplOf = str => parseDisplay(String(str))
// a plan as HTML blocks: one line when it fits; else the " · " pieces joined greedily, one block per line; else (a
// piece too wide for a line) one block per piece, a wide one wrapping in balanced lines of its own (a "·" never
// dangles at a line end). A piece that names money ("put in $24,000", "1% a year") is set in white: it is what the
// duel turns on.
function planBlocks(plan, w) {
  const s0 = String(plan || '').trim()
  if (!s0) return []
  const parts = s0.split(' · ')
  const pieceHTML = p => (/\$|\d%/.test(bare(p)) && parts.length > 1 ? `<b>${richUI(p)}</b>` : richUI(p))
  const wid = x => measureText(bare(x), FONT_PLAN)
  if (wid(s0) <= w) return [{ html: parts.map(pieceHTML).join(' · '), wrap: false }]
  if (parts.every(p => wid(p) <= w)) {
    const out = []
    let cur = []
    for (const p of parts) {
      if (cur.length && wid([...cur, p].join(' · ')) > w) { out.push(cur); cur = [p] } else cur.push(p)
    }
    if (cur.length) out.push(cur)
    return out.map(g => ({ html: g.map(pieceHTML).join(' · '), wrap: false }))
  }
  return parts.map(p => ({ html: pieceHTML(p), wrap: wid(p) > w }))
}

export default function ledgerDuel(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const L = layoutFor(spec, { hero: false, stageBottom: lo.stageBottom })
  const capsOn = L.captionsOn

  // ---------- data ----------
  const peopleIn = Array.isArray(d.people) ? d.people : []
  const people = [0, 1].map(p => {
    const x = peopleIn[p] || {}
    return { name: String(x.name ?? (p ? 'B' : 'A')), plan: String(x.plan ?? '') }
  })
  const rows = (Array.isArray(d.rows) ? d.rows : []).filter(r => r && Array.isArray(r.values)).map(r => ({
    label: String(r.label ?? ''),
    values: [0, 1].map(p => String(r.values[p] ?? '')),
    event: r.event ? String(r.event) : '',
    tone: r.tone || '',
    t: r.t,
  }))
  const N = rows.length
  if (!N) throw new Error('ledger-duel: data.rows is empty')
  const COL = [colorOf(lo.colors && lo.colors[0], C.green), colorOf(lo.colors && lo.colors[1], C.yellow)]
  const leaderMode = lo.leader === false ? null : lo.leader === 'low' ? 'low' : 'high'

  // ---------- times ----------
  const rowsT = d.rowsT ?? 1.0, every = d.rowEvery ?? 1.0, evPause = lo.eventPause ?? 1.0
  const cutT = []
  rows.forEach((r, i) => {
    let t = r.t != null && isFinite(+r.t) ? +r.t : i ? cutT[i - 1] + every + (rows[i - 1].event ? evPause : 0) : rowsT
    if (i) t = Math.max(t, cutT[i - 1] + 0.3)
    cutT.push(t)
  })
  const vT = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null
  const marksIn = (Array.isArray(lo.marks) ? lo.marks : [])
    .filter(m => m && isFinite(+m.t) && Number.isInteger(+m.row) && +m.row >= 0 && +m.row < N && (+m.person === 0 || +m.person === 1))
    .map(m => ({ t: +m.t, row: +m.row, person: +m.person })).sort((a, b) => a.t - b.t)
  const sumIn = lo.summary && Array.isArray(lo.summary.values) ? lo.summary : null

  // ---------- values: numerics drive the rolls; every printed number is a display string ----------
  const tpl = rows.map(r => r.values.map(tplOf))
  const isNum = tpl.map(r => r.map(x => isFinite(x.value)))
  const V = []
  rows.forEach((r, i) => V.push([0, 1].map(p => (isNum[i][p] ? tpl[i][p].value * tpl[i][p].scale : i ? V[i - 1][p] : 0))))
  const fell = rows.map((_, i) => [0, 1].map(p => i > 0 && isNum[i][p] && V[i][p] < V[i - 1][p] - 1e-9))
  // who leads each row (-1: tied or off)
  const leadOf = i => {
    if (!leaderMode || !isNum[i][0] || !isNum[i][1] || Math.abs(V[i][0] - V[i][1]) < 1e-9) return -1
    return (V[i][0] > V[i][1]) === (leaderMode === 'high') ? 0 : 1
  }
  const lead = rows.map((_, i) => leadOf(i))
  let winner = Number.isInteger(+d.winner) && (+d.winner === 0 || +d.winner === 1) ? +d.winner : null
  if (winner == null && d.winner !== null && d.winner !== -1) {
    const i = N - 1
    if (isNum[i][0] && isNum[i][1] && Math.abs(V[i][0] - V[i][1]) > 1e-9) winner = (V[i][0] > V[i][1]) === (lo.leader !== 'low') ? 0 : 1
  }

  // ---------- counts: one per row, both odometers on one curve ----------
  const quadOut = p => 1 - (1 - p) * (1 - p)
  const rollFor = (a, b) => {
    if (Math.abs(b - a) < 1e-9) return 0
    const lo2 = Math.min(a, b), hi = Math.max(a, b)
    return lo2 > 0 ? clamp(0.7 + 0.45 * Math.log2(hi / lo2), M.rollMin, M.rollMax) : 1.1
  }
  const intro = cutT[0] > 0.05
  const steps = rows.map((r, i) => {
    const from = i ? V[i - 1].slice() : [0, 0], to = V[i].slice()
    let cut, start, roll, curve = ease.out
    if (i === 0 && intro) {
      cut = 0; start = -LEAD; curve = quadOut
      roll = cutT[0] + AFTER + LEAD
      if (N > 1) roll = Math.min(roll, Math.max(0.6, cutT[1] - 0.15 - start))
      if (Math.abs(to[0]) < 1e-9 && Math.abs(to[1]) < 1e-9) roll = 0
    } else if (i === 0) {
      cut = Math.min(cutT[0], 0); start = cut; roll = 0        // landed on frame 1: the whole bet
    } else {
      cut = cutT[i]; start = cut + DIP
      roll = Math.max(rollFor(from[0], to[0]), rollFor(from[1], to[1]))
    }
    const last = i === N - 1 && N > 1 && r.tone !== 'bad'      // the climax (a crash last row lands as a crash)
    if (last && roll > 0) {
      let limit = Infinity
      const mk = marksIn.find(m => m.row === i && m.t > start)
      if (mk) limit = Math.min(limit, mk.t - 0.15)
      if (vT != null && vT > start) limit = Math.min(limit, vT - (sumIn ? 1.3 : 0.6))
      if (sumIn && isFinite(+sumIn.t) && +sumIn.t > start) limit = Math.min(limit, +sumIn.t - 0.4)
      roll = Math.min(+lo.finalRoll > 0 ? +lo.finalRoll : M.rollFinal, Math.max(Math.max(1.0, roll), limit - start))
    }
    if (i + 1 < N && i > 0) roll = Math.min(roll, Math.max(0.3, cutT[i + 1] - 0.12 - start))
    if (!isNum[i][0] && !isNum[i][1]) roll = 0
    return { cut, start, roll, land: start + roll, from, to, curve, last, moved: [0, 1].map(p => Math.abs(to[p] - from[p]) > 1e-9 || (i > 0 && rows[i].values[p] !== rows[i - 1].values[p])) }
  })
  const lastLand = steps[N - 1].land
  /** the count of person p at t: { k, v, done } (k: the row whose count owns t) */
  function countAt(p, t) {
    let k = 0
    for (let j = 1; j < N; j++) if (t >= steps[j].start) k = j
    const st = steps[k]
    if (t < st.start && k === 0) return { k, v: st.from[p], done: false }
    if (st.roll <= 0 || t >= st.land) return { k, v: st.to[p], done: true }
    return { k, v: lerp(st.from[p], st.to[p], st.curve(prog(t, st.start, st.roll))), done: false }
  }
  // lead changes (from the 2nd row on): bump + swipe on the new leader
  const leadChanges = []
  {
    let prev = lead[0]
    for (let i = 1; i < N; i++) {
      if (lead[i] >= 0 && prev >= 0 && lead[i] !== prev) leadChanges.push({ t: steps[i].land, p: lead[i] })
      if (lead[i] >= 0) prev = lead[i]
    }
  }

  // ---------- the winner beat, the summary, the marks ----------
  const lastMarkT = marksIn.length ? marksIn[marksIn.length - 1].t : -Infinity
  const winT = winner == null ? null : vT != null ? vT : isFinite(+lo.winnerT) ? +lo.winnerT : Math.max(lastLand + 1.2, lastMarkT + 1.6)
  const sum = sumIn ? {
    t: isFinite(+sumIn.t) ? +sumIn.t : lastLand + 0.5,
    label: String(sumIn.label ?? ''),
    values: [0, 1].map(p => String(sumIn.values[p] ?? '')),
    tone: sumIn.tone || null,
  } : null
  // a mark takes effect once its row has landed, and holds until the next mark or the winner beat
  const marks = marksIn.map(m => ({ ...m, on: Math.max(m.t, steps[m.row].land) }))
  marks.forEach((m, j) => { m.off = Math.min(j + 1 < marks.length ? marks[j + 1].on : Infinity, winT ?? Infinity) })

  // ---------- panels: measure the head (name, plan) and the value ----------
  const inner = PW - 6 - 2 * PAD                 // inside the 3 px border
  const NAME0 = capsOn ? 56 : 64
  const nameW100 = people.map(pp => measureText(bare(pp.name).toUpperCase(), FONT_ANTON) * 1.01)
  let nameSize = Math.floor(Math.min(NAME0, ...nameW100.map(w => (inner / w) * 100)))
  const nameTwo = nameSize < 44
  if (nameTwo) nameSize = 44
  const nameH = nameTwo ? Math.round(nameSize * 2 + 4) : nameSize
  const plans = people.map(pp => planBlocks(pp.plan, inner + 10))
  // a wrapping block is measured in a probe (balanced lines at 40 px)
  const planProbe = h('div', { class: 'ld-pl wrap', style: { position: 'absolute', left: '-3000px', top: '0px', width: inner + 12 + 'px' } })
  stage.append(planProbe)
  const planN = plans.map(pl => pl.reduce((n, b) => {
    if (!b.wrap) return n + 1
    setHTML(planProbe, b.html)
    return n + Math.max(1, Math.round(planProbe.offsetHeight / PLAN_LH))
  }, 0))
  planProbe.remove()
  const planH = Math.max(0, ...planN) * PLAN_LH

  // the odometer size: the widest display either side ever shows fits the panel at the landing bump (both panels
  // share it: a fair fight)
  const digitsOf = v => Math.max(1, String(Math.floor(Math.abs(v) + 1e-9)).length)
  const maxIntP = [0, 1].map(p => Math.min(10, Math.max(1, ...rows.map((_, i) => (isNum[i][p] ? digitsOf(tpl[i][p].value) : 1)))))
  const maxDpP = [0, 1].map(p => Math.min(2, Math.max(0, ...rows.map((_, i) => (isNum[i][p] ? tpl[i][p].dp : 0)))))
  const probe = odometer(stage, { size: 100, maxInt: Math.max(...maxIntP), maxDp: Math.max(...maxDpP), cls: 'ld-val' })
  const txtProbe = h('span', { class: 'ld-vtxt', style: { position: 'absolute', left: '-3000px', top: '0px', fontSize: '100px' } })
  stage.append(txtProbe)
  let w100 = 1
  rows.forEach((r, i) => [0, 1].forEach(p => {
    if (isNum[i][p]) { probe.show(r.values[p]); w100 = Math.max(w100, probe.el.getBoundingClientRect().width) }
    else { setHTML(txtProbe, rich(r.values[p])); w100 = Math.max(w100, txtProbe.getBoundingClientRect().width) }
  }))
  probe.el.remove(); txtProbe.remove()
  const VMAX = capsOn ? 100 : 112
  const BUMP_LAST = 1.1
  let VS = Math.floor(Math.min(VMAX, ((PW - 40) / BUMP_LAST / w100) * 100))
  VS = Math.max(56, VS)
  const vboxH = VS + 22
  // the summary: one line in the panel (label + value, value 48 → 40 px) when it fits; else a TOTALS line that ships
  // into the strip after the last row (a ledger's total row: key = the label); with no strip, the label over the value
  // in the panel
  let sumPx = 48, sumOne = false
  if (sum) {
    const pl = h('span', { class: 'ld-sum-lab', style: { position: 'absolute', left: '-3000px', top: '0px' }, html: esc(bare(sum.label)) })
    const pv = h('span', { class: 'ld-sum-val', style: { position: 'absolute', left: '-3000px', top: '0px', fontSize: '100px' } })
    stage.append(pl, pv)
    const labW = sum.label ? pl.getBoundingClientRect().width + 14 : 0
    const valW = Math.max(...sum.values.map(v => { setHTML(pv, tabHTML(v, { tight: true })); return pv.getBoundingClientRect().width / 100 }))
    pl.remove(); pv.remove()
    const room = PW - 6 - 2 * (PAD - 8)
    while (sumPx > 40 && labW + valW * sumPx > room) sumPx--
    sumOne = labW + valW * sumPx <= room
    if (!sumOne) sumPx = Math.floor(clamp(room / valW, 40, 52))
  }
  const PT = 22, PB = 14
  const headH = PT + nameH + 8 + planH + 14
  const panelH0 = headH + 2 + 8 + vboxH + PB

  // ---------- vertical plan: ticker on top, panels on the stage foot, the strip in between ----------
  // (a verdict that must land on the band over the stage foot, e.g. a lookOpts.stageBottom that leaves the label slot
  // too short, would hide the panels whole: the block then ends above the band)
  const footY = L.verdict.boxed && vT != null ? Math.min(L.stage.y + L.stage.h, L.verdict.y - 12) : L.stage.y + L.stage.h
  const top = L.stage.y + 16, bottom = footY - 16
  const T0 = capsOn ? 108 : 120
  const SP0 = capsOn ? 54 : 58                    // strip pitch (grows into spare room, up to SP_MAX)
  const SP_MAX = capsOn ? 62 : 68
  const SF = capsOn ? 42 : 44                     // strip type
  const stripOpt = lo.strip === false ? 0 : lo.strip === true || lo.strip == null || lo.strip === 'auto' ? 6 : clamp(Math.floor(+lo.strip) || 0, 0, 8)
  const GAP_T = 14, GAP_P = 16
  const planFor = (pH, extra = 0) => {
    // extra: strip rows beyond the data rows (the totals line)
    const maxK = Math.min(stripOpt, N - 1 + extra)
    const roomFor = T1 => bottom - top - T1 - GAP_T - GAP_P - pH
    let T = T0, SP = SP0
    let K = Math.min(maxK, Math.max(0, Math.floor(roomFor(T) / SP)))
    if (K < Math.min(2, maxK)) {
      // the ticker gives up some size before the strip goes under 2 slots
      T = clamp(roomFor(0) - Math.min(2, maxK) * SP, 80, T0)
      K = Math.min(maxK, Math.max(0, Math.floor(roomFor(T) / SP)))
    }
    if (K < 2 && (lo.strip == null || lo.strip === 'auto')) K = 0
    if (bottom - top < T + pH + 10) T = Math.max(64, bottom - top - pH - 10)
    // room left over goes to the strip's pitch first (taller slots), then to the ticker (up to its full size); the
    // rest stays between the ticker and the strip
    let spare = roomFor(T) - K * SP
    if (K && spare > 0) { const dp = Math.min(SP_MAX - SP, Math.floor(spare / K)); SP += dp; spare -= dp * K }
    if (spare > 0 && T < T0) { const dT = Math.min(T0 - T, Math.floor(spare)); T += dT; spare -= dT }
    return { T, K, SP, pH, spare: Math.max(0, spare) }
  }
  let sumMode = null, SUM_H = 0, VP
  if (!sum) VP = planFor(panelH0)
  else if (sumOne) { sumMode = 'panel'; SUM_H = 54; VP = planFor(panelH0 + 4 + SUM_H) }
  else {
    VP = planFor(panelH0, 1)
    if (VP.K >= 2) sumMode = 'strip'
    else { sumMode = 'panel2'; SUM_H = 44 + sumPx + 6; VP = planFor(panelH0 + 4 + SUM_H) }
  }
  const { K, SP } = VP
  let T = VP.T
  const panelH = VP.pH
  // what is still left centres the block (ticker, strip, panels) in the stage, so a short duel never leaves a hole
  // under the ticker
  const lift = Math.floor(VP.spare / 2)
  const panelY = Math.round(bottom - panelH - lift)
  const stripBottom = panelY - GAP_P
  const stripTop = stripBottom - K * SP
  const tickY = top + (VP.spare - lift)

  // ---------- strip (built before the panels: a shipped row rises from behind them) ----------
  const flash = stageFlash(stage, L)
  const slotH = SP - 8
  const skels = []
  for (let j = 0; j < K; j++) {
    const y = stripTop + j * SP
    const slot = h('div', { class: 'ld-sslot', 'data-deco': '', style: { left: SX + 'px', top: y + 'px', height: slotH + 'px', position: 'absolute' } })
    const bars = [
      h('div', { class: 'ld-skel', style: { left: SKX + 'px', width: '88px', top: slotH / 2 - 6 + 'px', height: '10px' } }),
      h('div', { class: 'ld-skel', style: { left: VR[0] - SX - 150 + 'px', width: '150px', top: slotH / 2 - 6 + 'px', height: '10px' } }),
      h('div', { class: 'ld-skel', style: { left: VR[1] - SX - 150 + 'px', width: '150px', top: slotH / 2 - 6 + 'px', height: '10px' } }),
    ]
    slot.append(...bars)
    stage.append(slot)
    skels.push(slot)
  }
  // the strip's lines: every row but the last (it stays in the panels), then the totals line (summary in the strip)
  const sumTone = sum && sum.tone ? toneColor(sum.tone) : null
  const lines = rows.slice(0, N - 1).map((r, i) => ({ key: r.label, values: r.values, bad: r.tone === 'bad', fell: fell[i], i }))
  if (sumMode === 'strip') lines.push({ key: sum.label, values: sum.values, total: true, fell: [false, false], i: N - 1 })
  // strip type: the key and value A never touch (Anton, tabular digits); smaller only if they would
  let sf = SF
  if (K) {
    const keyW = Math.max(...lines.map(l => measureText(bare(l.key).toUpperCase(), FONT_ANTON))) / 100
    const probeS = h('div', { class: 'ld-scell', style: { left: '-3000px', top: '0px', fontSize: '100px' } })
    stage.append(probeS)
    let valW = 0
    lines.forEach(l => { setHTML(probeS, tabHTML(l.values[0], { tight: true })); valW = Math.max(valW, probeS.getBoundingClientRect().width / 100) })
    probeS.remove()
    while (sf > 40 && SX + SKX + keyW * sf + 22 > VR[0] - valW * sf) sf--
  }
  const sRows = K ? lines.map(l => {
    const el = h('div', { class: 'ld-srow', 'data-band-unit': '', style: { top: '0px', height: slotH + 'px', display: 'none' } })
    const edge = l.total ? sumTone || C.white : l.bad ? rgba(C.red, 0.7) : C.edge
    const slot = h('div', { class: 'ld-sslot' + (l.total ? ' total' : ''), 'data-deco': '', style: { height: slotH + 'px', borderColor: edge } })
    const ty = Math.round(slotH / 2 - 0.47 * sf)
    const key = h('div', { class: 'ld-scell', html: rich(l.key), style: { left: SKX + 'px', top: ty + 'px', fontSize: sf + 'px', color: l.total ? C.white : l.bad ? C.red : C.grey } })
    const vals = [0, 1].map(p => h('div', { class: 'ld-scell', html: tabHTML(l.values[p], { tight: true }),
      style: { right: SX + SW - VR[p] + 'px', top: ty + 'px', fontSize: sf + 'px', color: l.total ? sumTone || COL[p] : l.fell[p] ? C.red : mix(COL[p], C.panel, 0.12) } }))
    const rings = [0, 1].map(() => h('div', { class: 'ld-ring', 'data-deco': '' }))
    el.append(slot, ...rings, key, ...vals)
    stage.append(el)
    return { el, key, vals, rings, total: !!l.total, i: l.i }
  }) : []
  // rings sit around the measured cells
  sRows.forEach(o => {
    style(o.el, { display: 'block' })
    o.rings.forEach((rg, p) => {
      const w = inkWidth(o.vals[p]) + 28
      style(rg, { left: VR[p] - SX + 14 - w + 'px', width: w + 'px', top: '-3px', height: slotH + 6 + 'px', borderColor: COL[p], boxShadow: `0 0 16px ${rgba(COL[p], 0.6)}` })
    })
    style(o.el, { display: 'none' })
  })

  // ---------- panels ----------
  const panels = [0, 1].map(p => {
    const pp = people[p], col = COL[p]
    const el = h('div', { class: 'sb-panel ld-panel', 'data-band-unit': '', style: { left: PX[p] + 'px', top: panelY + 'px', width: PW + 'px', height: panelH + 'px' } })
    style(el, { '--tone': col, '--lit': '0' })
    const wash = h('div', { class: 'ld-wash', 'data-deco': '' })
    const flood = h('div', { class: 'ld-flood', 'data-deco': '', style: { background: col } })
    const stripe = h('div', { class: 'ld-stripe', 'data-deco': '', style: { background: col, boxShadow: `0 0 14px ${rgba(col, 0.55)}` } })
    const name = h('div', { class: 'ld-name' + (nameTwo ? ' two' : ''), html: `<span>${rich(pp.name)}</span>`, style: { top: PT + 'px', fontSize: nameSize + 'px', color: col } })
    const plan = h('div', { class: 'ld-plan', style: { top: PT + nameH + 8 + 'px', height: planH + 'px' } },
      ...plans[p].map(b => h('span', { class: 'ld-pl' + (b.wrap ? ' wrap' : ''), html: b.html })))
    const rule = h('div', { class: 'ld-rule', 'data-deco': '', style: { top: headH + 'px' } })
    // the glow filter sits on the fixed value box (its raster region never changes with the number's width)
    const vbox = h('div', { class: 'ld-vbox', style: { top: headH + 2 + 8 + 'px', height: vboxH + 'px',
      filter: `drop-shadow(0 0 var(--glow, 16px) ${rgba(col, 'var(--glowA, 0.38)')})` } })
    const odo = odometer(vbox, { size: VS, color: col, maxInt: maxIntP[p], maxDp: maxDpP[p], cls: 'ld-val' })
    const txt = h('span', { class: 'ld-vtxt ld-val', style: { fontSize: VS + 'px', color: col, display: 'none' } })
    vbox.append(txt)
    let sumEl = null, sumVal = null, sumSkel = null
    if (sumMode === 'panel' || sumMode === 'panel2') {
      const sy = headH + 2 + 8 + vboxH + 4
      sumVal = h('span', { class: 'ld-sum-val', html: tabHTML(sum.values[p], { tight: true }), style: { fontSize: sumPx + 'px', color: sum.tone ? toneColor(sum.tone) : col } })
      sumEl = h('div', { class: 'ld-sum' + (sumMode === 'panel2' ? ' two' : ''), style: { top: sy + 'px', height: SUM_H + 'px' } },
        sum.label ? h('span', { class: 'ld-sum-lab', html: esc(bare(sum.label)) }) : null, sumVal)
      // LED off until it lands: the slot is on the board from frame 1
      sumSkel = h('div', { class: 'ld-skel', 'data-deco': '', style: { left: PW / 2 - 3 - 80 + 'px', width: '160px', top: sy + SUM_H / 2 - 6 + 'px', height: '10px' } })
    }
    el.append(wash, flood, stripe, name, plan, rule, vbox, ...(sumEl ? [sumSkel, sumEl] : []))
    stage.append(el)
    return { el, wash, flood, stripe, name, plan, vbox, odo, txt, sumEl, sumVal, sumSkel, col }
  })

  // ---------- ticker + pips ----------
  const keys = rows.map(r => keyParts(r.label))
  const tick = h('div', { class: 'ld-tick', style: { left: PX[0] + 'px', top: tickY + 'px', height: T + 'px' } })
  stage.append(tick)
  const PRE = Math.round(T * 0.46)
  const maxDig = Math.max(1, ...keys.map(k => (k.pre != null ? k.digits.length : 1)))
  const tPre = h('div', { class: 'ld-tick-pre', style: { fontSize: PRE + 'px', top: Math.round(0.89 * (T - PRE)) + 'px' } })
  const tNumBox = h('div', { class: 'ld-tick-num' })
  const tOdo = odometer(tNumBox, { size: T, color: C.white, maxInt: maxDig, maxDp: 0 })
  const tTxt = h('div', { class: 'ld-tick-txt', style: { fontSize: T + 'px', color: C.white } })
  tick.append(tPre, tNumBox, tTxt)
  // the pips: right-aligned on the ticker's line
  const pipsOn = lo.pips !== false && N > 1
  const pipW = 14, pipH = Math.round(T * 0.42)
  let pipGap = 12
  const pipRoom = 940 - (PX[0] + 420)
  while (pipGap > 4 && N * (pipW + pipGap) - pipGap > pipRoom) pipGap--
  const pipsW = N * (pipW + pipGap) - pipGap
  const pipsEl = pipsOn ? h('div', { class: 'ld-pips', 'data-deco': '', style: { left: 940 - pipsW + 'px', top: tickY + Math.round(0.89 * T) - pipH + 'px', width: pipsW + 'px', height: pipH + 'px' } }) : null
  const pips = pipsOn ? rows.map((_, i) => {
    const b = h('i', { style: { left: i * (pipW + pipGap) + 'px', width: pipW + 'px', height: pipH + 'px' } })
    pipsEl.append(b)
    return b
  }) : []
  if (pipsEl) stage.append(pipsEl)
  // the ticker never reaches the pips: measure the widest key and shrink the whole ticker if needed; then each key's
  // prefix width (the number sits after it) is measured once here, so seek never reads layout
  const tickRoom = (pipsOn ? 940 - pipsW - 36 : 940) - PX[0]
  const preWOf = (k, size) => { setHTML(tPre, esc(k.pre)); return k.pre ? tPre.getBoundingClientRect().width + 0.16 * size : 0 }
  let TN = T
  {
    let wMax = 0
    for (const k of keys) {
      if (k.pre != null) { tOdo.show(k.digits); wMax = Math.max(wMax, preWOf(k, T) + tOdo.el.getBoundingClientRect().width) }
      else { setHTML(tTxt, rich(k.text)); wMax = Math.max(wMax, tTxt.getBoundingClientRect().width) }
    }
    if (wMax > tickRoom) {
      TN = Math.max(40, Math.floor(T * (tickRoom / wMax)))
      const P2 = Math.round(TN * 0.46)
      style(tOdo.el, { fontSize: TN + 'px' }); style(tTxt, { fontSize: TN + 'px', top: T - TN + 'px' })
      style(tPre, { fontSize: P2 + 'px', top: Math.round(T - TN + 0.89 * (TN - P2)) + 'px' })
      style(tNumBox, { top: T - TN + 'px' })
    }
  }
  const preW = keys.map(k => (k.pre != null ? preWOf(k, TN) : 0))

  // ---------- label stack: line 1 the working, line 2 the matchup / the event ----------
  const nameRe = people.map(pp => bare(pp.name).trim()).map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const workHTML = str => {
    let s0 = String(str).replace(/^\s*=\s*/, '')
    for (let p = 0; p < 2; p++) {
      const m = new RegExp(`^(${nameRe[p]})(\\s*:)`, 'i').exec(s0)
      if (m && nameRe[p]) return `<span style="color:${COL[p]}">${rich(m[1] + m[2])}</span>${rich(s0.slice(m[0].length))}`
    }
    return rich(s0)
  }
  const workIn = Array.isArray(lo.working) ? lo.working : Array.isArray(lo.formulaBar) ? lo.formulaBar : []
  const working = workIn.filter(x => x && x.text != null && String(x.text).trim()).map(x => ({ t: Math.max(0, +x.t || 0), html: workHTML(x.text) })).sort((a, b) => a.t - b.t)
  const stakeHTML = d.stake ? rich(d.stake) : ''
  const matchup = lo.matchup === false ? '' : people.map((pp, p) => `<span class="nb" style="color:${COL[p]}">${rich(pp.name)}</span>`).join(' <span class="ld-vs">VS</span> ')
  const evHold = +lo.eventHold > 0 ? +lo.eventHold : EV_HOLD
  const evT = i => (i === 0 ? 0 : i === N - 1 && rows[i].tone !== 'bad' ? steps[i].land : cutT[i])
  const evs = rows.map((r, i) => (r.event ? { t: Math.max(0, evT(i)), html: rich(r.event), col: toneCol(r.tone) } : null)).filter(Boolean)
  evs.forEach((e, j) => { e.end = Math.min(e.t + evHold, j + 1 < evs.length ? evs[j + 1].t : Infinity) })
  const pts = [...new Set([0, ...working.map(w => w.t), ...evs.map(e => e.t), ...evs.map(e => e.end).filter(isFinite)])]
    .filter(x => vT == null || x < vT).sort((a, b) => a - b)
  const items = [], chapters = []
  const itemKey = new Map()
  for (const t0 of pts) {
    let l1 = stakeHTML
    for (const w of working) if (w.t <= t0 + 1e-6) l1 = w.html
    let l2 = matchup, l2c = C.white
    for (const e of evs) if (e.t <= t0 + 1e-6 && t0 < e.end - 1e-6) { l2 = e.html; l2c = e.col }
    const key = l1 + '|' + l2 + '|' + l2c
    if (!itemKey.has(key)) { itemKey.set(key, items.length); items.push({ l1, l2, l2Color: l2c }) }
    const idx = itemKey.get(key)
    if (!chapters.length || chapters[chapters.length - 1].idx !== idx) chapters.push({ t: t0, idx })
  }
  const labels = items.length && L.label.h > 40 ? labelStack(stage, L, items) : null
  if (labels) {
    // centred in the slot (labelStack top-aligns); the slam's biggest frame still ends above L.limit
    labels.groups.forEach(g => {
      style(g, { display: 'flex' })
      const hh = g.offsetHeight, from = g.__from || M.slamFrom
      const room = L.limit - L.label.y - hh * (0.4 + 0.6 * from)
      const dy = Math.max(0, Math.floor(Math.min((L.label.h - hh) / 2, room)))
      style(g, { top: dy + 'px', display: 'none' })
    })
  }

  // ---------- sound ----------
  steps.forEach((st, i) => {
    const r = rows[i]
    const anyMove = st.moved[0] || st.moved[1]
    if (i > 0) {
      ctx.cue(st.cut, 'thud', { gain: 0.6 })
      if (r.tone === 'bad') ctx.cue(st.cut + 0.02, 'buzz', { gain: 0.35 })
    }
    const fast = i + 1 < N && cutT[i + 1] - st.start < 1.6
    const r0 = Math.max(0, st.start)
    if (st.roll > 0 && st.land - r0 > 0.35 && (!fast || st.last)) ctx.cue(r0, 'roll', { dur: Math.max(0.3, st.land - r0 - 0.05), gain: st.last ? 0.75 : 0.55 })
    if (st.last && st.roll >= 0.8) ctx.cue(st.start, 'riser', { dur: Math.max(0.5, st.roll), gain: 0.5 })
    if (st.roll > 0 && anyMove) {
      ctx.cue(st.land, st.last ? 'hit' : 'ding', { gain: st.last ? 0.9 : 0.45 })
      if (st.last) ctx.cue(st.land + 0.06, 'cash', { gain: 0.65 })
    } else if (i > 0 && anyMove) ctx.cue(st.land, 'pop', { gain: 0.35 })
  })
  leadChanges.forEach(c => ctx.cue(c.t + 0.04, 'swipe', { gain: 0.45 }))
  marks.forEach(m => ctx.cue(m.on, 'tick', { gain: 0.55 }))
  if (sum) ctx.cue(sum.t, 'pop', { gain: 0.5 })
  if (winT != null && vT == null) ctx.cue(winT, 'reveal', { gain: 0.7 })

  const duration = durationOf(spec, Math.max(lastLand, sum ? sum.t + 1 : 0, winT ?? 0, isFinite(lastMarkT) ? lastMarkT + 1 : 0), d.hold ?? M.hold)

  // ---------- seek ----------
  return {
    duration,
    layout: L,
    seek(t) {
      // the active row: the latest cut at or before t (row 0 from frame 1)
      let a = 0
      for (let i = 1; i < N; i++) if (t >= cutT[i]) a = i
      const stA = steps[a]
      const landedA = t >= stA.land

      // ---- ticker: rolls when only the number moves, else a hard cut ----
      const kA = keys[a], kP = a > 0 ? keys[a - 1] : null
      const cutA = a > 0 ? cutT[a] : 0
      const tickCol = rows[a].tone === 'bad' ? C.red : C.white
      if (kA.pre != null) {
        style(tTxt, { display: 'none' })
        style(tPre, { display: kA.pre ? 'block' : 'none' })
        setHTML(tPre, esc(kA.pre))
        style(tNumBox, { display: 'block', left: preW[a].toFixed(1) + 'px' })
        const rolls = kP && kP.pre != null && kP.pre === kA.pre && kP.num !== kA.num
        const q = rolls ? ease.out(prog(t, cutA, TICK)) : 1
        if (q >= 1) tOdo.show(kA.digits)
        else tOdo.set(lerp(kP.num, kA.num, q), parseDisplay(kA.digits))
        style(tOdo.el, { color: tickCol })
        const k = rolls ? { o: 1, s: bump(t, cutA + TICK, { amp: 0.06 }) } : a > 0 ? slam(t, cutA) : { o: 1, s: 1 }
        style(tNumBox, { opacity: String(k.o), transform: k.s !== 1 ? `scale(${k.s.toFixed(4)})` : 'none' })
        style(tPre, { opacity: String(k.o), color: rows[a].tone === 'bad' ? C.red : C.grey })
      } else {
        style(tPre, { display: 'none' })
        style(tNumBox, { display: 'none' })
        style(tTxt, { display: 'block' })
        setHTML(tTxt, rich(kA.text))
        const k = a > 0 ? slam(t, cutA) : { o: 1, s: 1 }
        style(tTxt, { color: tickCol, opacity: String(k.o), transform: k.s !== 1 ? `scale(${k.s.toFixed(4)})` : 'none' })
      }

      // ---- pips ----
      pips.forEach((b, i) => {
        const bad = rows[i].tone === 'bad'
        let bg = '#232B36', glow = 'none', sc = 1
        if (i < a) bg = bad ? rgba(C.red, 0.5) : rgba(C.green, 0.42)
        else if (i === a) {
          const c0 = bad ? C.red : C.green
          bg = c0; glow = `0 0 14px ${rgba(c0, 0.8)}`
          sc = i > 0 ? bump(t, cutT[i], { amp: 0.35, dur: 0.4 }) : 1
        }
        style(b, { background: bg, boxShadow: glow, transform: sc !== 1 ? `scaleY(${sc.toFixed(3)})` : 'none' })
      })

      // ---- strip: rows ship out of the panels into the bottom slot; the oldest fade off the top ----
      if (K) {
        let off = 0
        for (let i = 1; i < N; i++) off += ease.out(prog(t, cutT[i], SHIFT))
        const totalIn = sumMode === 'strip' && t >= sum.t
        if (sumMode === 'strip') off += ease.out(prog(t, sum.t, SHIFT))
        skels.forEach((sk, j) => style(sk, { display: j < K - a - (totalIn ? 1 : 0) ? 'block' : 'none' }))
        sRows.forEach((o, r) => {
          const pos = K + r - off                       // slot index (K: still in the panels)
          const inOp = clamp(K - pos)                    // rising out of the panels
          const outOp = pos < 0 ? clamp(1 + 3 * pos) : 1 // fading off the top
          const op = Math.min(inOp, outOp)
          if (op <= 0.001) { style(o.el, { display: 'none' }); return }
          style(o.el, { display: 'block', opacity: op.toFixed(3), top: (stripTop + pos * SP).toFixed(1) + 'px' })
          o.rings.forEach((rg, p) => {
            let on = 0
            for (const m of marks) if (!o.total && m.row === o.i && m.person === p && t >= m.on && t < m.off && o.i < a) on = 1
            style(rg, { opacity: String(on) })
          })
        })
      }

      // ---- panels ----
      const focus = (() => { for (const m of marks) if (t >= m.on && t < m.off && m.row === a) return m.person; return -1 })()
      const evAt = a === N - 1 && rows[a].tone !== 'bad' ? stA.land : cutA
      const evFlash = a > 0 && (rows[a].event || rows[a].tone === 'bad') ? flashAt(t, evAt, rows[a].tone === 'bad' ? 1.0 : 0.7) : 0
      const evCol = rows[a].tone === 'bad' ? C.red : toneCol(rows[a].tone)
      const flood = winT != null ? ease.out(prog(t, winT, 0.22)) : 0
      let fl = 0
      panels.forEach((pn, p) => {
        const c = countAt(p, t)
        const k = c.k
        // the value: a running count (ghost "≈") or exactly the row's display string
        if (isNum[k][p]) {
          style(pn.txt, { display: 'none' }); style(pn.odo.el, { display: '' })
          if (c.done) pn.odo.show(rows[k].values[p])
          else pn.odo.set(c.v, tpl[k][p], true)
        } else {
          style(pn.odo.el, { display: 'none' }); style(pn.txt, { display: '' })
          setHTML(pn.txt, rich(rows[k].values[p]))
        }
        const st = steps[k]
        // colour: coral while a fall rolls and until the next row; black on the flood
        const won = winner === p && flood > 0
        const lost = winner != null && winner !== p
        let col = fell[k][p] && t >= st.start ? C.red : pn.col
        if (won && flood > 0.55) col = C.bar
        style(pn.odo.el, { color: col }); style(pn.txt, { color: col })
        // bumps: each landing that moved this side, a lead change, a mark, the climax
        let sc = 1, glow = 0
        steps.forEach((s2, i) => {
          if (i === 0 && !intro) return
          if (!s2.moved[p] || s2.roll <= 0) return
          const big = s2.last && V[i][p] >= V[i][1 - p]
          sc *= bump(t, s2.land, { amp: s2.last ? (big ? 0.1 : 0.05) : 0.06, dur: s2.last ? 0.5 : M.bump })
          if (t >= s2.land) glow = Math.max(glow, (s2.last ? (big ? 1 : 0.5) : 0.55) * (1 - ease.out(prog(t, s2.land, s2.last ? 1.1 : 0.6))))
          if (s2.last && big) fl = Math.max(fl, 0.6 * flashAt(t, s2.land, 0.9))
        })
        for (const lc of leadChanges) if (lc.p === p) { sc *= bump(t, lc.t, { amp: 0.06 }); if (t >= lc.t) glow = Math.max(glow, 0.45 * (1 - ease.out(prog(t, lc.t, 0.5)))) }
        for (const m of marks) if (m.person === p && m.row === a) { sc *= bump(t, m.on, { amp: 0.08 }); if (t >= m.on && t < m.off) glow = Math.max(glow, 0.35 + 0.65 * (1 - ease.out(prog(t, m.on, 0.7)))) }
        if (won) glow = 0
        style(pn.odo.el, { transform: sc !== 1 ? `scale(${sc.toFixed(4)})` : 'none' })
        style(pn.txt, { transform: sc !== 1 ? `scale(${sc.toFixed(4)})` : 'none' })
        style(pn.vbox, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': won ? '0' : (0.34 + 0.5 * glow).toFixed(3) })
        // the border: the leader (lit in its colour) < a mark's focus < an event flash < the winner's flood
        let lit = 0, tone = pn.col
        if (leaderMode && lead[a] === p && landedA) lit = 0.45
        if (focus === p) lit = 1
        if (evFlash > lit) { lit = evFlash; tone = evCol }
        if (won) { lit = 1; tone = pn.col }
        style(pn.el, { '--lit': lit.toFixed(3), '--tone': tone })
        // the event wash: wipes left to right across both panels, then fades
        if (evFlash > 0.001) {
          const wp = ease.out(prog(t, evAt + p * 0.06, 0.22))
          style(pn.wash, { background: evCol, opacity: ((rows[a].tone === 'bad' ? 0.26 : 0.14) * evFlash).toFixed(3), clipPath: `inset(0 ${(100 * (1 - wp)).toFixed(1)}% 0 0 round 15px)` })
        } else style(pn.wash, { opacity: '0' })
        // the winner floods neon; the other steps back; a mark's other side steps back a little
        style(pn.flood, { opacity: won ? flood.toFixed(3) : '0' })
        const head = won && flood > 0.55
        attr(pn.el, 'class', 'sb-panel ld-panel' + (head ? ' fl' : ''))
        style(pn.name, { color: head ? C.bar : pn.col })
        style(pn.stripe, { opacity: won ? '0' : '1' })
        const dimV = focus >= 0 && focus !== p ? 0.7 : 1
        const dim = lost ? 1 - 0.4 * ease.out(prog(t, winT, 0.25)) : 1
        style(pn.vbox, { opacity: dimV.toFixed(3) })
        style(pn.el, { opacity: dim.toFixed(3), boxShadow: won ? `0 0 ${(30 + 30 * flood).toFixed(0)}px ${rgba(pn.col, 0.55)}` : '' })
        // the summary line slams in under the number
        if (pn.sumEl) {
          const k2 = slam(t, sum.t, { from: sumMode === 'panel2' ? 1.06 : 1.12 })
          style(pn.sumEl, { display: t >= sum.t ? 'flex' : 'none', opacity: String(k2.o), transform: k2.s !== 1 ? `scale(${k2.s.toFixed(4)})` : 'none' })
          style(pn.sumSkel, { display: t >= sum.t || won ? 'none' : 'block' })
        }
      })
      flash.set(fl)

      // ---- label stack ----
      if (labels) {
        let ch = chapters[0]
        for (const c2 of chapters) if (t >= c2.t) ch = c2
        labels.seek(t, ch ? ch.idx : -1, ch ? ch.t : 0)
      }
      // (the header, footer, captions and verdict are the chrome's)
    },
  }
}
