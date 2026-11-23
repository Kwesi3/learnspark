# Copy finished videos into the app's assets and write part_q_gz_vdata.js
import glob, os, shutil, subprocess, json
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = os.path.join(ROOT, 'assets/video'); os.makedirs(D, exist_ok=True)
V = {'story': {}, 'lesson': {}}
for f in sorted(glob.glob('out/*.mp4')):
    if f.endswith('.part.mp4'): continue
    n = os.path.basename(f)[:-4]; kind = 'lesson' if n.startswith('l_') else 'story'; key = n[2:] if kind == 'lesson' else n
    dst = f'{D}/{"l_" if kind == "lesson" else "s_"}{key}'
    shutil.copy(f, dst + '.mp4'); shutil.copy(f[:-4] + '.jpg', dst + '.jpg')
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
    V[kind][key] = {'d': round(d, 1), 'kb': os.path.getsize(f) // 1024}
open(os.path.join(ROOT, 'src/data/videos.json'), 'w').write(json.dumps(V, separators=(',', ':')))
print('stories', len(V['story']), 'lessons', len(V['lesson']), 'MB', round(sum(v['kb'] for k in V for v in V[k].values()) / 1024, 1))
