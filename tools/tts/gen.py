
# Generate natural narration (Kokoro, voice af_heart) for LearnSpark:
# one audio "sprite" per book (pages, single words, glossary, questions),
# plus lessons, Sound Swap and Detective cases. Writes out/audio/*.mp3 and out/manifest.json.
import json, re, os, sys, subprocess, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
K = Kokoro('kokoro-v1.0.int8.onnx', 'voices-v1.0.bin')
VOICE, SR = 'af_heart', 24000
OUT = 'out/audio'; os.makedirs(OUT, exist_ok=True)
C = json.load(open('content.json'))
RESPELL = {"Anansi's": "Uh-nahn-see's", "Anansi’s": "Uh-nahn-see's", 'Anansi': 'Uh-nahn-see', 'Osei': 'Oh-say', 'Appomattox': 'Apuh-mattox',
           'Shenandoah': 'Shen-an-doe-uh', 'Werowocomoco': 'Wer-oh-woh-COM-oh-co', 'Ntikuma': 'En-tee-koo-mah', 'Powhatan': 'Pow-uh-tan'}
def respell(t):
    for a, b in RESPELL.items(): t = re.sub(r'\b' + re.escape(a) + r'\b', b, t)
    return t
def tts(text, speed=0.95):
    s, sr = K.create(respell(text), voice=VOICE, speed=speed, lang='en-us')
    return np.asarray(s, dtype=np.float32)
def frames(a, f=240):
    n = len(a) // f
    return np.sqrt((a[:n * f].reshape(n, f) ** 2).mean(1)) if n else np.zeros(1)
def trim(a, th=0.006):
    e = frames(a); idx = np.where(e > th)[0]
    if not len(idx): return a
    s = max(0, idx[0] * 240 - 480); t = min(len(a), (idx[-1] + 1) * 240 + 960)
    return a[s:t]
def nphon(w):
    p = K.tokenizer.phonemize(re.sub(r"[^A-Za-z0-9'\- ]", '', respell(w)) or 'a', 'en-us')
    return max(1, len(re.sub(r'[ˈˌː ]', '', p)))
def word_times(a, toks):
    """Estimate when each word starts/ends in a sentence: phoneme-weighted, then snapped to quiet frames."""
    dur = len(a) / SR; wts = [nphon(t) for t in toks]
    pause = [3.5 if re.search(r'[.!?]["”’]?$', t) else 2.5 if re.search(r'[,;:—–]["”’]?$', t) else 0.4 for t in toks]
    pause[-1] = 0; tot = sum(wts) + sum(pause); u = dur / tot; t = 0; out = []
    e = frames(a, 240)
    def snap(x):
        i = int(x * SR / 240); lo, hi = max(0, i - 6), min(len(e) - 1, i + 6)
        if hi <= lo: return x
        j = lo + int(np.argmin(e[lo:hi + 1])); return j * 240 / SR
    for w, p in zip(wts, pause):
        out.append([t, t + w * u]); t += (w + p) * u
    for i in range(1, len(out)):
        b = snap(out[i][0]); out[i][0] = b; out[i - 1][1] = min(out[i - 1][1], b) if out[i - 1][1] > b else out[i - 1][1]
    return out
def split_list(a, n):
    """Split audio of 'w1. w2. w3.' into n pieces at the n-1 longest quiet gaps."""
    e = frames(a); quiet = e < 0.01; gaps = []; i = 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]: j += 1
            if i > 0 and j < len(quiet): gaps.append((j - i, i, j))
            i = j
        else: i += 1
    if len(gaps) < n - 1: return None
    cuts = sorted(sorted(gaps, reverse=True)[:n - 1], key=lambda g: g[1])
    if n > 1 and cuts and min(g[0] for g in cuts) < 8: return None   # gaps under 80 ms: not a clean split
    pts = [0] + [((g[1] + g[2]) // 2) * 240 for g in cuts] + [len(a)]
    return [trim(a[pts[k]:pts[k + 1]]) for k in range(n)]
def words_audio(pairs, speed=0.85):
    res = {}
    for k in range(0, len(pairs), 10):
        chunk = pairs[k:k + 10]
        a = tts('. '.join(t for _, t in chunk) + '.', speed)
        parts = split_list(a, len(chunk))
        if parts is None: parts = [trim(tts(t + '.', speed)) for _, t in chunk]
        for (key, _), p in zip(chunk, parts): res[key] = p
    return res
class Sprite:
    def __init__(s, name): s.name, s.parts, s.t, s.map = name, [], 0.0, {}
    def gap(s, sec): s.parts.append(np.zeros(int(sec * SR), np.float32)); s.t += sec
    def add(s, key, a, extra=None):
        s.gap(0.25); st = s.t; s.parts.append(a); s.t += len(a) / SR
        s.map[key] = dict(s=round(st, 3), e=round(s.t, 3), **(extra or {}))
    def save(s):
        s.gap(0.4); a = np.concatenate(s.parts); wav = f'/tmp/{s.name}.wav'; sf.write(wav, a, SR)
        mp3 = f'{OUT}/{s.name}.mp3'
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '48k', mp3], check=True)
        # measure decoder delay so timings line up after decoding
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', mp3, '-ar', str(SR), '-ac', '1', '/tmp/dec.wav'], check=True)
        d, _ = sf.read('/tmp/dec.wav', dtype='float32'); N = min(len(a), len(d), SR * 20)
        c = np.correlate(d[:N][2000:2000 + SR * 3], a[:N][2000:2000 + SR * 3] if N > 2000 + SR * 3 else a[:N], 'full') if False else None
        best, off = -1, 0
        for lag in range(-1500, 1500, 24):
            x = d[max(0, lag):N + min(0, lag)]; y = a[max(0, -lag):N - max(0, lag)]; m = min(len(x), len(y))
            if m < 1000: continue
            v = float(np.dot(x[:m], y[:m]))
            if v > best: best, off = v, lag
        return {'f': f'audio/{s.name}.mp3', 'off': round(off / SR, 4), 'map': s.map, 'dur': round(s.t, 2)}
MAN = os.environ.get('MAN','out/manifest.json')
manifest = json.load(open(MAN)) if os.path.exists(MAN) else {}
PART = os.environ.get('PART','')
def done(name, entry):
    manifest[name] = entry; json.dump(manifest, open(MAN, 'w')); print('saved', name, entry['dur'], 's', flush=True)
speeds = {1: 0.86, 2: 0.92, 3: 0.98, 4: 1.0}
for b in C['books']:
    if b['id'] in manifest: continue
    if os.environ.get('ONLY') and b['id']!=os.environ['ONLY']: continue
    if PART=='A' and b['id'] not in ('seed','kite','turtles','drum'): continue
    if PART=='B' and b['id'] not in ('bees','moonbase','school','anansi'): continue
    if PART=='S2' and b['id'] not in ('kente','puddle','library','market','yorktown','tornado','timbuktu','blackout','homefront','fair','volta','debate'): continue
    sp = Sprite(b['id']); sp_speed = speeds[b['level']]
    sp.add('title', trim(tts(b['title'] + '.', sp_speed)))
    for pi, page in enumerate(b['pages']):
        parts, words, t = [], [], 0.0
        for si, sent in enumerate(page):
            a = trim(tts(sent['text'], sp_speed))
            for w in word_times(a, sent['toks']): words.append([round(t + w[0], 3), round(t + w[1], 3)])
            parts.append(a); t += len(a) / SR
            if si < len(page) - 1: parts.append(np.zeros(int(0.35 * SR), np.float32)); t += 0.35
        sp.add(f'p{pi}', np.concatenate(parts), {'w': words})
    for k, a in words_audio(b['words']).items(): sp.add('w:' + k, a)
    for k, txt in b['gloss']: sp.add('g:' + k, trim(tts(txt, 0.9)))
    for qi, q in enumerate(b['qs']):
        sp.add(f'q{qi}', trim(tts(q['q'], 0.92)))
        for oi, o in enumerate(q['o']): sp.add(f'q{qi}o{oi}', trim(tts(o + '.', 0.92)))
    done(b['id'], sp.save())
if os.environ.get('ONLY') or PART=='S2': sys.exit(0)
if PART!='B' and 'lessons' not in manifest:
    sp = Sprite('lessons')
    for g, txt in C['lessons'].items(): sp.add('L:' + g, trim(tts(txt, 0.93)))
    done('lessons', sp.save())
if PART!='A' and 'swap' not in manifest:
    sp = Sprite('swap')
    for s in C['swaps']: sp.add(s['key'], trim(tts(s['text'], 0.85)))
    for k, a in words_audio([(s['ans'], s['ans']) for s in C['swaps']]).items(): sp.add('sw:' + k, a)
    done('swap', sp.save())
if PART!='A' and 'cases' not in manifest:
    sp = Sprite('cases')
    for c in C['cases']: sp.add(c['key'], trim(tts(c['text'], 0.92)))
    done('cases', sp.save())
print('ALL DONE', flush=True)
