#!/usr/bin/env python3
"""Merge narration made by gen.py into the app: copies out/audio/*.mp3 to audio/ and writes
src/data/audio-map.json from every out/man_*.json manifest.  Usage: TTS_DIR=~/learnspark-tts python3 tools/tts/merge_map.py"""
import glob, json, os, shutil
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TTS = os.environ.get('TTS_DIR', os.path.expanduser('~/learnspark-tts'))
man = {}
for f in sorted(glob.glob(os.path.join(TTS, 'out/man_*.json'))):
    man.update(json.load(open(f)))
for v in man.values():
    v.pop('dur', None)   # not used by the app
for f in glob.glob(os.path.join(TTS, 'out/audio/*.mp3')):
    shutil.copy(f, os.path.join(ROOT, 'audio'))
open(os.path.join(ROOT, 'src/data/audio-map.json'), 'w').write(json.dumps(man, separators=(',', ':')))
print('audio map:', len(man), 'sprites')
