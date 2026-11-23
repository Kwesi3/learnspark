#!/usr/bin/env python3
"""Merge narration made by gen2.py into the app. Each narrator lives in TTS_DIR/out_<voice>/
(man.json + audio/*.mp3). "heart" (default) is copied to audio/, others to audio/<voice>/.
Writes src/data/audio-map.json as {voice: {sprite: {...}}}.
Usage: TTS_DIR=~/learnspark-tts python3 tools/tts/merge_map.py"""
import glob, json, os, shutil
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TTS = os.environ.get('TTS_DIR', os.path.expanduser('~/learnspark-tts'))
out = {}
for v in os.environ.get('VOICES', 'heart,emma,warm').split(','):
    mf = os.path.join(TTS, 'out_%s/man.json' % v)
    if not os.path.exists(mf): continue
    man = json.load(open(mf))
    for e in man.values(): e.pop('dur', None)   # not used by the app
    dst = os.path.join(ROOT, 'audio') if v == 'heart' else os.path.join(ROOT, 'audio', v)
    os.makedirs(dst, exist_ok=True)
    for f in glob.glob(os.path.join(TTS, 'out_%s/audio/*.mp3' % v)): shutil.copy(f, dst)
    out[v] = man
    print(v, len(man), 'sprites')
open(os.path.join(ROOT, 'src/data/audio-map.json'), 'w').write(json.dumps(out, separators=(',', ':')))
