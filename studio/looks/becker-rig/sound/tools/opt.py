# The Becker level optimiser: searches per-voice level offsets (dB, mix.mjs levels) and the tilt slopes (balance.mjs /
# compose.mjs) that keep every Becker teaser's §9.2 octave bands inside their windows with the most margin, while the
# marimba stays the BUILD's lead voice (MALLET). It works on dump.mjs's per-instrument band powers, so one dump covers
# thousands of trials; the result is a proposal to copy into mix.mjs / compose.mjs by hand, then re-render and verify.
# The band windows and the MALLET floor are read from sound/acceptance.json (the optimiser keeps 0.4 LU over the floor).
# usage (from studio/): node looks/becker-rig/sound/tools/dump.mjs > /tmp/dump.jsonl
#                       python3 looks/becker-rig/sound/tools/opt.py /tmp/dump.jsonl        (needs numpy)
import json, sys, os, numpy as np, itertools, random
rows = [json.loads(l) for l in open(sys.argv[1]) if l.strip()]
ACC = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..', 'sound', 'acceptance.json')))
BANDS = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
WIN = {float(f): tuple(v) for f, v in ACC['checks']['BANDS']['looks']['becker-rig']['bands'].items()}
MALLET_FLOOR = ACC['checks']['MALLET']['looks']['becker-rig']['minLu'] + 0.4
KW = np.array([-9, -1.5, -0.3, 0, 0, 0.3, 2.0, 3.7, 4.0, 4.0])  # approx K-weighting per octave band
GROUP = {'honk': 'brass', 'honkF': 'brass', 'honkR': 'brass', 'honkFR': 'brass', 'ghost': 'snare', 'roll': 'snare'}
PRES = {'snare', 'clap', 'ghost', 'roll', 'shaker', 'tamb', 'honk', 'honkF', 'honkR', 'honkFR'}
TOYS = {'mallet', 'glock', 'pizz'}

def xOf(t):
    return 2 - t / 0.2 if t >= 0 else 2 - t / 0.3

def tiltOf(x, up=0.2, upMax=2.5, dn=0.3, dnMax=3.5):
    return min(upMax, -up * (x - 2)) if x <= 2 else max(-dnMax, -dn * (x - 2))

def offs(inst, t, P):
    if inst == 'bass': return max(0, t) * P['bassT']
    if inst == 'kick': return max(0, t) * P['kickT']
    if inst == 'pad': return max(0, t) * P['padT']
    if inst in TOYS: return max(0, -t) * P['toyT']
    if inst in PRES: return t * P['presT'] if t < 0 else t * P['presTu']
    return 0

def evaluate(P, verbose=False):
    worst = 99; fails = []; mal = []; rank_ok = True; padrel = []
    for r in rows:
        x = xOf(r['tilt']); t = tiltOf(x, P['up'], P['upMax'])
        mus = np.zeros(10); musOld = np.zeros(10); bk = {}; b5 = {}
        for inst, d in r['inst'].items():
            key = GROUP.get(inst, inst)
            g = P['d'].get(key, 0) + offs(inst, t, P) - d['tiltOff']
            gp = 10 ** (g / 10)
            b = np.array(d['bands'])
            mus += gp * b; musOld += b
            if 'buildK' in d:
                bk[inst] = gp * d['buildK']; b5[inst] = gp * d['build5_12']
        sc = r['instScale']
        # renormalise: keep the music's K-weighted power
        kOld = (musOld * 10 ** (KW / 10)).sum(); kNew = (mus * 10 ** (KW / 10)).sum()
        mus *= kOld / kNew * 10 ** (P.get('disT', 0) * abs(t) / 10)
        mix = mus * sc + np.array(r['sfxBands']) + np.array(r['retBands'])
        rel = 10 * np.log10(mix / mix[5])
        for k, f in enumerate(BANDS):
            if f == 1000: continue
            lo, hi = WIN[f]
            m = min(rel[k] - lo, hi - rel[k])
            worst = min(worst, m)
            if m < 0: fails.append(f"{r['id']}:{f}:{rel[k]:.1f}")
        if bk:
            tot = sum(bk.values())
            ml = 10 * np.log10(bk.get('mallet', 1e-30) / tot); mal.append((r['id'], ml))
            if b5 and max(b5, key=b5.get) != 'mallet': rank_ok = False
            padrel.append(10 * np.log10(bk.get('pad', 1e-30) / tot))
        if verbose:
            print(r['id'], 'tilt %.2f' % t, ' '.join(f"{f}:{v:.1f}" for f, v in zip(BANDS, rel)), 'mallet %.1f' % ml)
    return worst, fails, mal, rank_ok, padrel

base = dict(d={}, bassT=1.7, kickT=0.5, padT=1.0, toyT=0.0, presT=1.0, presTu=1.0, up=0.2, upMax=2.5)
w, f, mal, rk, pr = evaluate(base, True)
print('BASE worst margin %.2f fails %d' % (w, len(f)), f[:12], 'mallet min %.1f' % min(m for _, m in mal), 'rank', rk)

best = None
random.seed(1)
space = {
    'mallet': [1.5, 2, 2.5, 3], 'pizz': [0, 1, 2, 3], 'bass': [-1.5, -1, -0.5, 0, 0.5, 1], 'pad': [-1, 0, 1, 2],
    'snare': [-2, -1.5, -1, -0.5, 0], 'kick': [-1.5, -1, -0.5, 0, 0.5], 'clap': [-1, 0], 'brass': [-1, 0, 1, 2], 'tom': [-3, -2, 0], 'shaker': [-3, -2, -1, 0], 'tamb': [-3, 0], 'glock': [-1, 0, 1],
}
tsp = {'disT': [0, 0.2, 0.3, 0.5], 'bassT': [0.5, 1.0, 1.7], 'padT': [0, 1, 1.5, 2], 'toyT': [0, 0.3, 0.5, 0.7, 1.0], 'presTu': [0.5, 1, 1.5], 'up': [0.2, 0.3], 'upMax': [2.5, 3, 3.5], 'kickT': [0, 0.5]}
def score(P):
    w, f, mal, rk, pr = evaluate(P)
    mm = min(m for _, m in mal)
    pen = 0
    if mm < MALLET_FLOOR: pen += (MALLET_FLOOR - mm) * 3
    if not rk: pen += 2
    pm = max(pr)
    if pm > mm - 0.5: pen += (pm - mm + 0.5)
    return w - pen, w, mm, rk, len(f)
for it in range(6000):
    P = dict(base); P['d'] = {k: random.choice(v) for k, v in space.items()}
    for k, v in tsp.items(): P[k] = random.choice(v)
    s = score(P)
    if best is None or s[0] > best[0][0]: best = (s, P)
print('BEST', best[0], json.dumps(best[1]))
# local refine
P = best[1]
for rnd in range(3):
    for k, v in list(space.items()):
        for val in v:
            Q = json.loads(json.dumps(P)); Q['d'][k] = val
            s = score(Q)
            if s[0] > best[0][0]: best = (s, Q); P = Q
    for k, v in tsp.items():
        for val in v:
            Q = json.loads(json.dumps(P)); Q[k] = val
            s = score(Q)
            if s[0] > best[0][0]: best = (s, Q); P = Q
print('REFINED', best[0], json.dumps(best[1]))
w, f, mal, rk, pr = evaluate(best[1], True)
print('fails', f, 'mallet', [(i, round(m, 1)) for i, m in mal], 'pad', [round(x, 1) for x in pr])
