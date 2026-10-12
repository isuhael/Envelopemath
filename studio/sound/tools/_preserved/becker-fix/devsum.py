import sys,json
B={'63':(-2,7),'125':(1,7),'250':(0,6),'500':(-1,4),'2k':(-5,0),'4k':(-8,-2),'8k':(-13,-5),'16k':(-25,-12),'31':(-16,-4)}
names=['63','125','250','500','1k','2k','4k','8k','16k','31']
for l in open(sys.argv[1]):
  r=json.loads(l)
  b=dict(zip(names,[float(x) for x in r['bands'].split()]))
  bad=' '.join(f"{k}:{b[k]}" for k,(lo,hi) in B.items() if b[k]<lo or b[k]>hi)
  print(r['id'],'mus',r['music'],'sG',r['sfxG'],'sU',r['sfxU'],'ret',r['ret'],'trim',r['trim'],'glk',r.get('glockPre'),'| B3',r['B3'][:100],'| B8',r['B8'],'| B7',r['B7'],'| BANDS',bad or 'ok')
  print('    foley',r['foley'],'| click',r.get('click'),'| d6%',r['duck6pct'],'dips/min',r['dips6PerMin'],'react',r['react'])
