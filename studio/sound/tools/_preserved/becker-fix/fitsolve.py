import json,sys,numpy as np
rows=[json.loads(l) for l in open(sys.argv[1]) if l.strip()]
p=lambda x: 10**(np.array(x)/10)
mix=p([r['mix'] for r in rows]); M=p([r['M'] for r in rows]); U=p([r['U'] for r in rows])
A=np.vstack([M,U]).T
coef,res,rk,sv=np.linalg.lstsq(A,mix,rcond=None)
print('1+a=%.3f b=%.3f'%tuple(coef))
pred=A@coef
print('fit err dB', np.round(10*np.log10(pred/mix),2))
# C and tiltUp: M = C + cost + tiltUp*max(0,tilt)
y=np.array([r['M']-r['cost'] for r in rows]); t=np.array([max(0,r['tilt']) for r in rows])
X=np.vstack([np.ones_like(t),t]).T
c2=np.linalg.lstsq(X,y,rcond=None)[0]
print('C=%.2f tiltUp=%.2f'%tuple(c2), 'resid', np.round(y-X@c2,2))
print('Upred-U', np.round(np.array([r['Upred'] for r in rows])-np.array([r['U'] for r in rows]),2))
for r in rows: print(r['id'], 'M-mix %.2f U-mix %.2f R-mix %.2f I-mix %.2f'%(r['M']-r['mix'],r['U']-r['mix'],r['R']-r['mix'],r['I']-r['mix']))
