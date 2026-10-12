import json,sys
src=open('opt.py').read().split("base = dict(")[0]
sys.argv=['x',sys.argv[1]]+sys.argv[2:]
exec(src)
P0={"d": {"mallet": 3, "pizz": 3, "bass": 1, "pad": -1, "snare": 0, "kick": -1.5, "clap": 0, "brass": 0, "tom": -3, "shaker": -3, "tamb": -3, "glock": -1}, "bassT": 1.7, "kickT": 0, "padT": 1, "toyT": 0.3, "presT": 1.0, "presTu": 0.5, "up": 0.2, "upMax": 2.5, "disT": 0.5}
import copy
for name,ch in [('P0',{}),('padT2',{'padT':2}),('padT1.5',{'padT':1.5}),('disT.7',{'disT':0.7}),('disT1',{'disT':1.0}),('pres1',{'presTu':1.0}),('shaker-5',{'d':{'shaker':-5}}),('snare-1',{'d':{'snare':-1}}),('mallet2',{'d':{'mallet':2}})]:
  P=copy.deepcopy(P0)
  for k,v in ch.items():
    if k=='d': P['d'].update(v)
    else: P[k]=v
  w,f,mal,rk,pr=evaluate(P)
  print(name.ljust(10),'worst %.2f'%w,len(f),f,'mallet min %.1f'%min(m for _,m in mal),'rank',rk)
