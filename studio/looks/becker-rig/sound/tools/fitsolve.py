# Refit balance.mjs's MODEL, step 2 of 2: least squares on the lines fit.mjs printed (trim 0).
#   mix power = (1 + a)·M + b·Upred        -> a, b      (the master-gain prediction, on the plan's own U: the value
#                                                         musicTrim feeds it, so the plan's render carries no bias in)
#   M = C + cost + tiltUp·max(0, tilt) + tiltDn·max(0, -tilt)
#                                           -> C, tiltUp, tiltDn (the music stem before the trim)
#   iBias = mean(I - Ipred)                 (the engine's SFX stem vs the plan's render of it: the merges' loss)
# usage (from studio/): python3 looks/becker-rig/sound/tools/fitsolve.py /tmp/fit.jsonl   (needs numpy)
import json, sys
import numpy as np
rows = [json.loads(l) for l in open(sys.argv[1]) if l.strip()]
p = lambda x: 10 ** (np.array(x) / 10)
mix = p([r['mix'] for r in rows]); M = p([r['M'] for r in rows]); U = p([r.get('Upred', r['U']) for r in rows])
A = np.vstack([M, U]).T
coef, res, rk, sv = np.linalg.lstsq(A, mix, rcond=None)
print('1+a=%.3f b=%.3f' % tuple(coef), '-> MODEL.a = %.3f, MODEL.b = %.3f' % (coef[0] - 1, coef[1]))
pred = A @ coef
print('fit err dB', np.round(10 * np.log10(pred / mix), 2))
y = np.array([r['M'] - r['cost'] for r in rows]); t = np.array([max(0, r['tilt']) for r in rows]); tn = np.array([max(0, -r['tilt']) for r in rows])
X = np.vstack([np.ones_like(t), t, tn]).T
c2 = np.linalg.lstsq(X, y, rcond=None)[0]
# The tilt terms are lifts (a dull tilt lifts the presence voices, the bass and the pad; a bright one the toys): neither
# can make the band quieter, so they are fitted non-negative (the best least-squares fit over the active sets with
# tiltUp >= 0 and tiltDn >= 0). Since 2026-10-13 (the condensed 07b-10b): without the long dull teasers (07c, 09b and
# 10b's long cuts read tilt 1.4-1.9) the free fit put tiltUp at -0.25, a term today's records cannot identify
best = None
for keep in ([0, 1, 2], [0, 1], [0, 2], [0]):
    c = np.zeros(3); c[keep] = np.linalg.lstsq(X[:, keep], y, rcond=None)[0]
    if (c[1:] < 0).any(): continue
    sse = float(((y - X @ c) ** 2).sum())
    if best is None or sse < best[0] - 1e-12: best = (sse, c)
c2 = best[1]
print('C=%.2f tiltUp=%.2f tiltDn=%.2f' % tuple(c2), '(tilt lifts >= 0; free fit C=%.2f tiltUp=%.2f tiltDn=%.2f)' % tuple(np.linalg.lstsq(X, y, rcond=None)[0]),
      'resid', np.round(y - X @ c2, 2), 'sd %.2f' % (y - X @ c2).std())
print('Upred-U', np.round(np.array([r['Upred'] for r in rows]) - np.array([r['U'] for r in rows]), 2))
if all('Ipred' in r for r in rows):
    d = np.array([r['I'] - r['Ipred'] for r in rows])
    print('iBias (mean I - Ipred) %.2f, sd %.2f' % (d.mean(), d.std()), np.round(d, 2))
for r in rows: print(r['id'], 'M-mix %.2f U-mix %.2f R-mix %.2f I-mix %.2f' % (r['M'] - r['mix'], r['U'] - r['mix'], r['R'] - r['mix'], r['I'] - r['mix']))
