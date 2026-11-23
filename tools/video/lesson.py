#!/usr/bin/env python3
"""Lesson explainer videos: title → big ideas (one at a time) → try one (think pause) → answer → outro.
Usage: python3 lesson.py [gen ...]   (default: all in lessons.json)   --frames: stills only"""
import json, os, re, subprocess, sys, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont
TTS = os.environ.get('TTS_DIR', os.path.expanduser('~/learnspark-tts')); WORK = os.environ.get('VIDEO_DIR', os.path.expanduser('~/learnspark-video'))
sys.path.insert(0, TTS); os.chdir(TTS)
_g = open('gen.py').read().split('def nphon')[0].replace("C = json.load(open('content.json'))", '')
exec(_g)   # Kokoro, tts(), frames(), trim()
os.chdir(WORK)

W, H, FPS = 1280, 720, 30
FN = 'fonts/fontsource-nunito/files/nunito-latin-800-normal.woff'
FN6 = 'fonts/fontsource-nunito/files/nunito-latin-600-normal.woff'
FF = 'fonts/fontsource-fredoka/files/fredoka-latin-600-normal.woff'
NAVY, CREAM, YEL, GREEN, CORAL = (27, 42, 74), (255, 251, 242), (255, 216, 77), (34, 160, 90), (227, 107, 78)
ENC = ['-c:v', 'libx264', '-crf', '26', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-tune', 'stillimage']
F = lambda p, s: ImageFont.truetype(p, s)
DEN = {2: 'half', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 12: 'twelfth', 100: 'hundredth'}

def say(t):
    t = t.replace('’', "'").replace('“', '').replace('”', '').replace('"', '')
    t = re.sub(r'\b([A-Z]{2,})\b', lambda m: m.group(1).lower() if m.group(1) not in ('SOL', 'GCF', 'LCM', 'PEMDAS') else m.group(1), t)
    t = re.sub(r'(\d+) (\d+)/(\d+)', r'\1 and \2/\3', t)
    UN = {'g': 'grams', 'kg': 'kilograms', 'cm': 'centimeters', 'm': 'meters', 'mm': 'millimeters', 'km': 'kilometers', 'L': 'liters', 'mL': 'milliliters',
          'ft': 'feet', 'in': 'inches', 'yd': 'yards', 'oz': 'ounces', 'lb': 'pounds', 'gal': 'gallons', 'qt': 'quarts', 'hr': 'hours', 'h': 'hours', 'c': 'cups', 'pt': 'pints'}
    t = re.sub(r'\? (' + '|'.join(UN) + r')\b', lambda m: 'how many ' + UN[m.group(1)], t)
    t = re.sub(r'(^|· )([<>≤≥]) ', lambda m: m.group(1) + {'<': 'the less than sign means ', '>': 'the greater than sign means ', '≤': 'the less than or equal sign means ', '≥': 'the greater than or equal sign means '}[m.group(2)], t)
    t = t.replace('·', ',').replace('…', ', and so on').replace('½', 'one half').replace('¼', 'one fourth').replace('¾', 'three fourths').replace('π', 'pie')
    t = re.sub(r'√(\d+)', r'the square root of \1', t)
    t = re.sub(r'(\d)⁴', r'\1 to the fourth power', t); t = re.sub(r'(\d)⁵', r'\1 to the fifth power', t); t = re.sub(r'(\d)⁶', r'\1 to the sixth power', t)
    t = re.sub(r'(\d) \| (\d)', r'\1 stem and \2 leaf', t); t = t.replace('Absolute value |x|', 'The absolute value of x')
    t = re.sub(r'\|([^|]+)\|', r'the absolute value of \1', t)
    t = re.sub(r'(\d)–(\d)', r'\1 to \2', t); t = re.sub(r'([a-z])/([a-z])', r'\1 or \2', t)
    t = re.sub(r'\b(cm|mm|km|m|ft|in|yd)²', lambda m: 'square ' + UN[m.group(1)], t)
    t = re.sub(r'\b(\d[\d,.]*) (' + '|'.join(k for k in UN if k not in ('in',)) + r')\b(?![-²³])', lambda m: m.group(1) + ' ' + UN[m.group(2)], t)
    t = re.sub(r'\?/(\d+)', lambda m: 'how many ' + (DEN[int(m.group(1))] + 's' if int(m.group(1)) in DEN else 'over ' + m.group(1)), t)
    t = re.sub(r'(=\s*)\?', r'\1what?', t); t = re.sub(r'\?(\s*=)', r'what\1', t)
    t = t.replace('□', 'box').replace('⚽', 'star').replace('★', 'star').replace('●', 'dot')
    for u, nm in [('cm', 'centimeters'), ('mm', 'millimeters'), ('km', 'kilometers'), ('m', 'meters'), ('ft', 'feet'), ('in', 'inches'), ('yd', 'yards'), ('units', 'units')]:
        t = re.sub(r'\b(\d[\d,.]*) ' + u + '²', r'\1 square ' + nm, t); t = re.sub(r'\b(\d[\d,.]*) ' + u + '³', r'\1 cubic ' + nm, t)
    t = re.sub(r'\b(\d+) min\b', r'\1 minutes', t)
    def frac(m):
        a, b = int(m.group(1)), int(m.group(2))
        if b in DEN: w = DEN[b] if b != 2 else 'half'; return f"{a} {w}{'' if a == 1 else ('ves' if b == 2 else 's')}".replace('halfves', 'halves')
        return f'{a} over {b}'
    t = re.sub(r'\b(\d+)/(\d+)\b', frac, t)
    t = re.sub(r'\$(\d[\d,]*)\.(\d\d)\b', r'\1 dollars and \2 cents', t)
    t = re.sub(r'\$(\d[\d,]*)', r'\1 dollars', t)
    t = re.sub(r'(\d)\s*%', r'\1 percent', t)
    t = re.sub(r'(\d)\s*°F', r'\1 degrees Fahrenheit', t); t = re.sub(r'(\d)\s*°C', r'\1 degrees Celsius', t); t = re.sub(r'(\d)\s*°', r'\1 degrees', t)
    t = re.sub(r'([a-z0-9)])²', r'\1 squared', t); t = re.sub(r'([a-z0-9)])³', r'\1 cubed', t)
    t = re.sub(r'\(([+−-])(\d+)\)', lambda m: ('negative ' if m.group(1) in '−-' else 'positive ') + m.group(2), t)
    t = re.sub(r'(?<![\w)])[−-](\d)', r'negative \1', t)
    for a, b in [('×', ' times '), ('÷', ' divided by '), (' − ', ' minus '), (' - ', ' minus '), ('−', ' minus '), (' + ', ' plus '), ('+', ' plus '),
                 ('≈', ' is about '), ('≠', ' is not equal to '), ('≤', ' is less than or equal to '), ('≥', ' is greater than or equal to '),
                 (' < ', ' is less than '), (' > ', ' is greater than '), ('=', ' equals '), ('→', ', then '), ('___', 'blank'), ('...', ', ')]:
        t = t.replace(a, b)
    t = re.sub(r'\b(\d[\d,]*) kg\b', r'\1 kilograms', t); t = re.sub(r'\b(\d[\d,]*) g\b', r'\1 grams', t)
    t = re.sub(r'\b(\d[\d,]*) cm\b', r'\1 centimeters', t); t = re.sub(r'\b(\d[\d,]*) mm\b', r'\1 millimeters', t)
    t = re.sub(r'\b(\d[\d,]*) km\b', r'\1 kilometers', t); t = re.sub(r'\b(\d[\d,]*) m\b', r'\1 meters', t)
    t = re.sub(r'\b(\d[\d,]*) mL\b', r'\1 milliliters', t); t = re.sub(r'\b(\d[\d,]*) L\b', r'\1 liters', t)
    t = re.sub(r'\b(\d[\d,]*) (ft|in|yd|oz|lb)\b', lambda m: m.group(1) + ' ' + {'ft': 'feet', 'in': 'inches', 'yd': 'yards', 'oz': 'ounces', 'lb': 'pounds'}[m.group(2)], t)
    t = re.sub(r'\bsq\b', 'square', t)
    for pl, sg in [('feet', 'foot'), ('inches', 'inch'), ('yards', 'yard'), ('meters', 'meter'), ('pounds', 'pound'), ('ounces', 'ounce'), ('gallons', 'gallon'), ('quarts', 'quart'),
                   ('hours', 'hour'), ('liters', 'liter'), ('grams', 'gram'), ('kilograms', 'kilogram'), ('centimeters', 'centimeter'), ('kilometers', 'kilometer'), ('minutes', 'minute'), ('cups', 'cup'), ('pints', 'pint')]:
        t = re.sub(r'(?<![\d.,])\b1 ' + pl + r'\b', '1 ' + sg, t)
    return re.sub(r'\s+', ' ', t).strip()

SYM = set('π⁴→√≅≈≤≥□★⇒∠△≠')
DJ = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def _runs(t):
    out = []
    for ch in t:
        k = ch in SYM
        if out and out[-1][0] == k: out[-1][1] += ch
        else: out.append([k, ch])
    return out
class Draw:
    """ImageDraw with a symbol fallback font (the app font lacks √, ≤, π ...)."""
    def __init__(self, im): self.d = ImageDraw.Draw(im)
    def __getattr__(self, n): return getattr(self.d, n)
    def _fb(self, f): return ImageFont.truetype(DJ, int(f.size * 0.9))
    def textlength(self, t, font):
        t = t.replace('⚽', '★'); return sum(self.d.textlength(r, font=self._fb(font) if k else font) for k, r in _runs(t))
    def text(self, xy, t, font, fill):
        t = t.replace('⚽', '★'); x, y = xy
        for k, r in _runs(t):
            ff = self._fb(font) if k else font
            self.d.text((x, y + (font.size * 0.12 if k else 0)), r, font=ff, fill=fill); x += self.d.textlength(r, font=ff)

def wrap(d, text, f, maxw):
    lines, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = w
    return lines + ([cur] if cur else [])

def base(L, title_small=True):
    band = tuple(int(L['band'][i:i + 2], 16) for i in (1, 3, 5))
    im = Image.new('RGB', (W, H), CREAM); d = Draw(im)
    for (x, y, r, c) in [(1180, 90, 130, YEL), (60, 680, 90, (190, 230, 210)), (1230, 640, 60, (255, 205, 190))]:
        d.ellipse((x - r, y - r, x + r, y + r), fill=c)
    if title_small:
        d.rectangle((0, 0, W, 84), fill=band)
        d.text((40, 20), L['name'], font=F(FF, 38), fill=(255, 255, 255))
        tag = f"Grade {L['g']} · SOL {L['code']}"; ft = F(FN, 22); tw = d.textlength(tag, font=ft)
        d.rounded_rectangle((W - tw - 70, 22, W - 30, 62), 20, fill=(255, 255, 255)); d.text((W - tw - 50, 28), tag, font=ft, fill=NAVY)
    return im, d, band

def s_title(L):
    im, d, band = base(L, False)
    d.rounded_rectangle((110, 150, W - 110, 560), 34, fill=(255, 255, 255), outline=NAVY, width=5)
    tag = f"Grade {L['g']} {L.get('sname','Math')} · SOL {L['code']}"; ft = F(FN, 28); tw = d.textlength(tag, font=ft)
    d.rounded_rectangle(((W - tw) / 2 - 24, 125, (W + tw) / 2 + 24, 177), 26, fill=band, outline=NAVY, width=3)
    d.text(((W - tw) / 2, 132), tag, font=ft, fill=(255, 255, 255))
    f = F(FF, 76); lines = wrap(d, L['name'], f, W - 320)
    y = 360 - len(lines) * 45
    for ln in lines: d.text(((W - d.textlength(ln, font=f)) / 2, y), ln, font=f, fill=NAVY); y += 88
    s = 'A LearnSpark lesson'; fs = F(FN6, 30); d.text(((W - d.textlength(s, font=fs)) / 2, 480), s, font=fs, fill=CORAL)
    return im

def s_ideas(L, upto):
    im, d, band = base(L)
    d.text((70, 112), 'Big ideas', font=F(FF, 44), fill=NAVY)
    n = len(L['les']); size = 34 if n <= 3 else 30
    f = F(FN, size); lh = int(size * 1.3); y = 190
    for i, txt in enumerate(L['les'][:upto + 1]):
        lines = wrap(d, txt, f, W - 260); h = lh * len(lines) + 28; cur = i == upto
        d.rounded_rectangle((70, y, W - 70, y + h), 20, fill=(255, 244, 196) if cur else (255, 255, 255), outline=NAVY if cur else (200, 205, 215), width=4 if cur else 2)
        d.ellipse((92, y + 14, 140, y + 62), fill=band if cur else (200, 205, 215)); num = str(i + 1); fn = F(FF, 30)
        d.text((116 - d.textlength(num, font=fn) / 2, y + 18), num, font=fn, fill=(255, 255, 255))
        for k, ln in enumerate(lines): d.text((165, y + 14 + k * lh), ln, font=f, fill=NAVY if cur else (110, 118, 135))
        y += h + 16
    return im

def s_try(L, state, count=None):
    im, d, band = base(L); ex = L['ex']
    d.text((70, 112), "Let's try one!", font=F(FF, 44), fill=NAVY)
    f = F(FN, 36); lines = wrap(d, ex['q'], f, W - 220); y = 185
    d.rounded_rectangle((70, y, W - 70, y + 47 * len(lines) + 36), 22, fill=(255, 255, 255), outline=NAVY, width=4)
    for k, ln in enumerate(lines): d.text((105, y + 18 + k * 47), ln, font=f, fill=NAVY)
    y += 47 * len(lines) + 60
    fo = F(FN, 30); bw = (W - 140 - 30) // 2
    for i, o in enumerate(ex['opts']):
        x0 = 70 + (i % 2) * (bw + 30); y0 = y + (i // 2) * 84; right = str(o) == str(ex['a'])
        fill, col, out = (255, 255, 255), NAVY, NAVY
        if state == 'ans': fill, col, out = ((220, 245, 228), (21, 110, 60), GREEN) if right else ((245, 245, 245), (160, 165, 175), (210, 212, 218))
        d.rounded_rectangle((x0, y0, x0 + bw, y0 + 68), 18, fill=fill, outline=out, width=4)
        lab = chr(65 + i); d.text((x0 + 22, y0 + 15), lab, font=F(FF, 32), fill=band if state != 'ans' else col)
        d.text((x0 + 70, y0 + 16), str(o), font=fo, fill=col)
        if state == 'ans' and right:
            cx = x0 + 70 + d.textlength(str(o), font=fo) + 26; cy = y0 + 34
            d.line([(cx, cy), (cx + 10, cy + 11), (cx + 30, cy - 13)], fill=GREEN, width=7, joint='curve')
    if state == 'think' and count:
        d.ellipse((W - 190, 100, W - 80, 210), fill=YEL, outline=NAVY, width=4); fc = F(FF, 64); c = str(count)
        d.text((W - 135 - d.textlength(c, font=fc) / 2, 112), c, font=fc, fill=NAVY)
        tx = 'Think!'; d.text((W - 340, 130), tx, font=F(FF, 40), fill=CORAL)
    if state == 'ans':
        ye = y + ((len(ex['opts']) + 1) // 2) * 84 + 6; fe = F(FN6, 30); el = wrap(d, ex['e'], fe, W - 200)
        if ye + 40 * len(el) < H - 20:
            for k, ln in enumerate(el): d.text((90, ye + k * 40), ln, font=fe, fill=NAVY)
    return im

def s_end(L):
    im, d, band = base(L)
    d.rounded_rectangle((210, 220, W - 210, 520), 34, fill=(255, 255, 255), outline=NAVY, width=5)
    for t, f, y, c in [('Your turn!', F(FF, 80), 260, NAVY), ('Practice this skill in LearnSpark.', F(FN, 34), 390, CORAL)]:
        d.text(((W - d.textlength(t, font=f)) / 2, y), t, font=f, fill=c)
    return im

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-1500:]); sys.exit(1)

def make(L, frames_only=False):
    gen = L['gen']; wd = f'work/l_{gen}'; os.makedirs(wd, exist_ok=True); ex = L['ex']
    segs = []   # (image, audio array or None, seconds of silence after)
    sil = lambda s: np.zeros(int(s * SR), np.float32)
    A = (lambda t, sp=0.95: trim(tts(say(t), sp))) if not frames_only else (lambda t, sp=0: sil(1))
    segs.append((s_title(L), A(f"Let's learn: {L['name']}."), 1.0))
    for i, b in enumerate(L['les']): segs.append((s_ideas(L, i), A(b), 0.9))
    if ex:
        segs.append((s_try(L, 'q'), A("Let's try one. " + ex['q']), 0.4))
        for c in (3, 2, 1): segs.append((s_try(L, 'think', c), None, 1.0))
        segs.append((s_try(L, 'ans'), A(f"The answer is {ex['a']}. {ex['e']}"), 1.2))
    segs.append((s_end(L), A("Now it's your turn. Go practice this skill in LearnSpark!"), 1.2))
    if frames_only:
        for i, (im, a, p) in enumerate(segs): im.save(f'{wd}/f{i}.jpg', quality=88)
        return
    parts, aud = [], [sil(0.4)]
    for i, (im, a, pad) in enumerate(segs):
        dur = (len(a) / SR if a is not None else 0) + pad + (0.4 if i == 0 else 0)
        aud += ([a] if a is not None else []) + [sil(pad)]
        p = f'{wd}/f{i}.png'; im.save(p); o = f'{wd}/s{i}.mp4'; tmp = o[:-4] + '.part.mp4'
        fade = ',fade=t=in:st=0:d=0.3' if i == 0 else ''
        run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', p, '-vf', f'format=yuv420p,loop=-1:1,trim=duration={dur:.3f},setpts=N/{FPS}/TB{fade}', *ENC, tmp])
        os.replace(tmp, o); parts.append(o)
    open(f'{wd}/list.txt', 'w').write(''.join(f"file '{os.path.abspath(p)}'\n" for p in parts))
    pcm = (np.clip(np.concatenate(aud), -1, 1) * 32767).astype(np.int16)
    with wave.open(f'{wd}/a.wav', 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{wd}/list.txt', '-c', 'copy', f'{wd}/v.mp4'])
    os.makedirs('out', exist_ok=True); tmp = f'out/l_{gen}.part.mp4'
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{wd}/v.mp4', '-i', f'{wd}/a.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '64k', '-ac', '1', '-shortest', '-movflags', '+faststart', tmp])
    os.replace(tmp, f'out/l_{gen}.mp4')
    segs[0][0].resize((640, 360)).save(f'out/l_{gen}.jpg', quality=82)
    print(gen, os.path.getsize(f'out/l_{gen}.mp4') // 1024, 'KB', flush=True)

if __name__ == '__main__':
    LS = json.load(open('lessons.json')); want = [a for a in sys.argv[1:] if not a.startswith('--')]
    for L in LS:
        if want and L['gen'] not in want: continue
        if not want and os.path.exists(f"out/l_{L['gen']}.mp4"): continue
        make(L, '--frames' in sys.argv)
