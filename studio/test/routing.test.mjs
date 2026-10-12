// The react bus (src/sound/routing.mjs, sound/README.md "The react bus"): events exempt from the event duck. A one-voice
// synthetic pack holds a 220 Hz tone through a hit (which ducks the music and becomes the payoff P) and the test reads
// the music stem before and under the duck.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderMix, normalizePack, loadPack } from '../src/sound/engine.mjs'
import { routeOf, reactSettings, busOf, BUS_RANK, REACT_DEFAULTS } from '../src/sound/routing.mjs'

test('routing: routeOf, reactSettings and busOf', () => {
  assert.deepEqual(Object.keys(BUS_RANK).sort((a, b) => BUS_RANK[a] - BUS_RANK[b]), ['logo', 'react', 'music'])
  const music = routeOf('music', 'pad', {})
  assert.equal(music.sum, 'body'); assert.ok(music.duck && music.musicDb && music.glue && music.sidechain && music.gate)
  const logo = routeOf('logo', 'logoLead', {})
  assert.equal(logo.sum, 'logo'); assert.ok(!logo.duck && !logo.musicDb && !logo.glue && !logo.sidechain && !logo.gate); assert.equal(logo.sends, 'free')
  // the default react route: the music path minus the duck
  const r = routeOf('react', 'stab', {})
  assert.deepEqual(reactSettings({}, 'stab'), { ...REACT_DEFAULTS })
  assert.equal(r.sum, 'react'); assert.ok(!r.duck && r.musicDb && r.glue && r.sidechain && r.gate); assert.equal(r.sends, 'music'); assert.equal(r.fader, 'music')
  // via 'logo' is the logo route (only the bus name differs)
  assert.deepEqual({ ...routeOf('react', 'stab', { react: { via: 'logo' } }), bus: 'logo' }, logo)
  // per-instrument overrides win over the pack's settings
  const mix = { react: { glue: false, inst: { revcrash: { via: 'logo' }, honk: { sends: 'free', musicDb: false } } } }
  assert.equal(routeOf('react', 'revcrash', mix).sum, 'logo')
  assert.equal(routeOf('react', 'stab', mix).glue, false)
  const h = routeOf('react', 'honk', mix)
  assert.equal(h.sends, 'free'); assert.equal(h.musicDb, false); assert.equal(h.fader, null)
  assert.throws(() => routeOf('react', 'x', { react: { via: 'body' } }), /via/)
  assert.throws(() => routeOf('react', 'x', { react: { sends: 'nowhere' } }), /sends/)
  assert.equal(busOf({ inst: 'x', role: 'logo' }), 'logo'); assert.equal(busOf({ inst: 'x' }), 'music'); assert.equal(busOf({ inst: 'x', bus: 'react' }), 'react')
  assert.throws(() => busOf({ inst: 'x', t: 1, bus: 'loud' }), /unknown bus/)
})

const REC = { id: 't-routing', look: 'scoreboard', format: 'test', fps: 30, duration: 6, base: 5.5, brand: null, sfx: [{ t: 2.0, kind: 'hit', gain: 1 }], vo: [], verdict: null, beats: [] }
const tone = ev => {
  const n = Math.round(ev.dur * 48000), x = new Float32Array(n)
  for (let i = 0; i < n; i++) x[i] = ev.vel * 0.5 * Math.sin(2 * Math.PI * 220 * i / 48000) * Math.min(1, i / 480, (n - i) / 480)
  return x
}
/** a pack with one sustained tone 0.5-4.5 s on `bus`, a -6 dB musicDb step at 3 s, and a plate send */
function pack(bus, react, { musicDb = false } = {}) {
  return normalizePack({
    name: 'routing-test', look: 'scoreboard', instruments: { tone },
    compose: () => ({ notes: [{ t: 0.5, dur: 4, midi: 57, vel: 1, inst: 'tone', role: 'pad', ...(bus ? { bus } : {}) }], drums: [], automation: musicDb ? { musicDb: [{ t: 2.9, db: 0 }, { t: 3.0, db: -6 }] } : {} }),
    mix: { levels: { tone: -6 }, sends: { tone: { plate: -10 } }, react, glue: { ratio: 2, attack: 0.01, release: 0.12, knee: 6, targetGr: 0 } },
  })
}
const rms = (b, t0, t1) => { let s = 0; const a = Math.round(t0 * 48000), z = Math.round(t1 * 48000); for (let i = a; i < z; i++) s += b.L[i] ** 2 + b.R[i] ** 2; return 10 * Math.log10(s / (2 * (z - a)) + 1e-30) }

test('routing: a react voice is not ducked; via logo is bit-identical to the logo bus; musicDb and sends follow mix.react', async () => {
  const fallback = await loadPack('no-such-look')
  const run = (bus, react, o) => renderMix(REC, pack(bus, react, o), { overrides: {}, fallback })
  const m = run(undefined, {}), r = run('react', {})
  assert.equal(m.tl.anchors.P.t, 2.0, 'the hit is the payoff')
  // the body ducks >= 8 dB under the hit (its own duck and the payoff duck); the react voice keeps its level
  const duckM = rms(m.stems.music, 2.03, 2.12) - rms(m.stems.music, 1.0, 1.9)
  const duckR = rms(r.stems.music, 2.03, 2.12) - rms(r.stems.music, 1.0, 1.9)
  assert.ok(duckM < -8, `music bus ducked ${duckM.toFixed(2)} dB`)
  assert.ok(Math.abs(duckR) < 0.1, `react bus moved ${duckR.toFixed(2)} dB under the hit`)
  // the score marks it
  assert.equal(r.score.notes[0].bus, 'react'); assert.equal(m.score.notes[0].bus, undefined)
  // via 'logo' sums into the logo bus itself: every stem identical to bus 'logo'
  const viaLogo = run('react', { via: 'logo' }), onLogo = run('logo', {})
  for (const k of ['musicDry', 'music', 'sfx', 'returns']) {
    assert.deepEqual(Buffer.from(viaLogo.stems[k].L.buffer), Buffer.from(onLogo.stems[k].L.buffer), `${k} L`)
    assert.deepEqual(Buffer.from(viaLogo.stems[k].R.buffer), Buffer.from(onLogo.stems[k].R.buffer), `${k} R`)
  }
  // musicDb: the react route follows the -6 dB step, musicDb: false does not (glue off: its gain reduction moves with level)
  const withDb = run('react', { glue: false }, { musicDb: true }), noDb = run('react', { musicDb: false, glue: false }, { musicDb: true })
  const step = x => rms(x.stems.music, 3.3, 3.9) - rms(x.stems.music, 1.0, 1.9)
  assert.ok(Math.abs(step(withDb) + 6) < 0.05, `musicDb step ${step(withDb).toFixed(2)}`)
  assert.ok(Math.abs(step(noDb)) < 0.05, `no musicDb step ${step(noDb).toFixed(2)}`)
  // sends: 'music' feeds the music returns (half the duck), 'free' the un-ducked ones
  const free = run('react', { sends: 'free' })
  const retDuck = x => rms(x.stems.returns, 2.06, 2.14) - rms(x.stems.returns, 1.6, 1.9)
  assert.ok(retDuck(r) < -3, `music returns ducked ${retDuck(r).toFixed(2)} dB`)
  assert.ok(retDuck(free) > -1.5, `free returns ${retDuck(free).toFixed(2)} dB`)
})
