#!/usr/bin/env python3
"""Render picture-book story videos: slow pan over each page picture, narration, sentence captions.
Usage: python3 render.py <story_id> [--frames]   (frames = draw test stills only)"""
import json, os, subprocess, sys, textwrap, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS, SR = 1280, 720, 30, 24000
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ART = os.path.join(ROOT, 'assets/art')
TTS = os.environ.get('TTS_DIR', os.path.expanduser('~/learnspark-tts'))   # holds content.json and out/ from tools/tts/gen.py
FN = 'fonts/fontsource-nunito/files/nunito-latin-800-normal.woff'
FF = 'fonts/fontsource-fredoka/files/fredoka-latin-600-normal.woff'
NAVY = (27, 42, 74)
ENC = ['-c:v', 'libx264', '-crf', '24', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', str(FPS)]

def font(p, s): return ImageFont.truetype(p, s)

def wrap(draw, text, f, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=f) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def caption_png(text, path):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    size = 36
    while True:
        f = font(FN, size); lines = wrap(d, text, f, W - 220)
        if len(lines) <= 3 or size <= 26: break
        size -= 2
    lh = int(size * 1.32); bh = lh * len(lines) + 34
    x0, y0 = 70, H - bh - 28
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle((x0, y0 + 6, W - x0, H - 22), 22, fill=(0, 0, 0, 90))
    im = Image.alpha_composite(im, sh.filter(ImageFilter.GaussianBlur(8))); d = ImageDraw.Draw(im)
    d.rounded_rectangle((x0, y0, W - x0, H - 28), 22, fill=(255, 251, 242, 240), outline=NAVY, width=4)
    for i, ln in enumerate(lines):
        tw = d.textlength(ln, font=f)
        d.text(((W - tw) / 2, y0 + 15 + i * lh), ln, font=f, fill=NAVY)
    im.save(path)

def title_png(b, path):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    col = tuple(int(b['color'][i:i + 2], 16) for i in (1, 3, 5))
    size = 64
    while True:
        f = font(FF, size); lines = wrap(d, b['title'], f, W - 320)
        if len(lines) <= 2 or size <= 44: break
        size -= 4
    lh = int(size * 1.15); bh = 70 + lh * len(lines) + 40
    x0, y0 = 120, H - bh - 50
    d.rounded_rectangle((x0, y0 + 8, W - x0, y0 + bh + 8), 30, fill=(0, 0, 0, 70))
    d.rounded_rectangle((x0, y0, W - x0, y0 + bh), 30, fill=(255, 251, 242, 245), outline=NAVY, width=5)
    tag = f"LearnSpark Stories · Level {b['level']}"; ft = font(FN, 26)
    pw = d.textlength(tag, font=ft) + 40
    d.rounded_rectangle(((W - pw) / 2, y0 - 22, (W + pw) / 2, y0 + 22), 22, fill=col, outline=NAVY, width=3)
    d.text(((W - pw) / 2 + 20, y0 - 17), tag, font=ft, fill=(255, 255, 255))
    for i, ln in enumerate(lines):
        tw = d.textlength(ln, font=f); d.text(((W - tw) / 2, y0 + 50 + i * lh), ln, font=f, fill=NAVY)
    im.save(path)

def end_png(path):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    f1, f2 = font(FF, 76), font(FN, 32)
    t1, t2 = 'The End', 'Now answer the questions in LearnSpark!'
    bw = max(d.textlength(t2, font=f2), 400) + 100; x0 = (W - bw) / 2; y0 = H - 280
    d.rounded_rectangle((x0, y0 + 8, x0 + bw, y0 + 230), 30, fill=(0, 0, 0, 70))
    d.rounded_rectangle((x0, y0, x0 + bw, y0 + 222), 30, fill=(255, 251, 242, 245), outline=NAVY, width=5)
    d.text(((W - d.textlength(t1, font=f1)) / 2, y0 + 30), t1, font=f1, fill=NAVY)
    d.text(((W - d.textlength(t2, font=f2)) / 2, y0 + 140), t2, font=f2, fill=(227, 107, 78))
    im.save(path)

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-2000:]); sys.exit(1)

def scene(out, img, dur, overlays, direction, darken=False):
    """Pan over the picture for dur seconds; overlays = [(png, start, end)]."""
    tmp = out[:-4] + '.part.mp4'
    pan = f"(ih-{H})*(0.5-0.5*cos(PI*min(t/{dur:.3f}\\,1)))" if direction > 0 else f"(ih-{H})*(0.5+0.5*cos(PI*min(t/{dur:.3f}\\,1)))"
    base = f"[0:v]scale={W}:-2,format=yuv420p,loop=-1:1,trim=duration={dur:.3f},setpts=N/{FPS}/TB,fps={FPS},crop={W}:{H}:0:'{pan}'"
    if darken: base += ',eq=brightness=-0.06:saturation=0.9,boxblur=2:1'
    fl = [base + '[b0]']; ins = ['-framerate', str(FPS), '-i', img]; last = 'b0'
    for i, (png, a, e) in enumerate(overlays):
        ins += ['-i', png]
        fl.append(f"[{last}][{i+1}:v]overlay=0:0:enable='between(t,{a:.3f},{e:.3f})':eof_action=repeat[b{i+1}]"); last = f'b{i+1}'
    fl.append(f"[{last}]fade=t=in:st=0:d=0.35,fade=t=out:st={dur-0.35:.3f}:d=0.35,format=yuv420p[v]")
    run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', ';'.join(fl), '-map', '[v]', '-t', f'{dur:.3f}', *ENC, tmp])
    os.replace(tmp, out)

def main(sid, frames_only=False):
    B = {b['id']: b for b in json.load(open('stories.json'))}[sid]
    C = {b['id']: b for b in json.load(open(f'{TTS}/content.json'))['books']}[sid]
    man = {}
    for fn in os.listdir(f'{TTS}/out'):
        if fn.startswith('man_') or fn == 'manifest.json': man.update(json.load(open(f'{TTS}/out/{fn}')))
    E = man[sid]; M = dict(E['map']); off = E.get('off', 0)
    wd = f'work/{sid}'; os.makedirs(wd, exist_ok=True)
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f"{TTS}/out/{E['f']}", '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
    pcm = np.frombuffer(raw, np.float32)
    clip = lambda k: pcm[int((M[k]['s'] + off) * SR):int((M[k]['e'] + off) * SR)]
    sil = lambda s: np.zeros(int(s * SR), np.float32)
    img = lambda k: f'{ART}/{k}.webp'
    # convert webp -> png once (ffmpeg webp decoder is fine, but png is safest)
    def png(k):
        p = f'{wd}/{k}.png'
        if not os.path.exists(p): Image.open(img(k)).convert('RGB').save(p)
        return p
    scenes, audio = [], []
    # title
    t_a = clip('title'); tdur = 0.9 + len(t_a) / SR + 1.4
    title_png(B, f'{wd}/title.png')
    scenes.append(('title', png(B['cover']), tdur, [(f'{wd}/title.png', 0, tdur)], 1, True))
    audio += [sil(0.9), t_a, sil(tdur - 0.9 - len(t_a) / SR)]
    for pi, page in enumerate(B['pages']):
        a = clip(f'p{pi}'); words = M[f'p{pi}']['w']; lead, tail = 0.6, 0.9
        dur = lead + len(a) / SR + tail
        toks = [len(s['toks']) for s in C['pages'][pi]]
        ovs, k = [], 0
        starts = []
        for n in toks: starts.append(words[k][0] if k < len(words) else 0); k += n
        for si, sent in enumerate(page['t']):
            s = lead + starts[si] - (0.15 if si else lead)
            e = lead + starts[si + 1] - 0.05 if si + 1 < len(starts) else dur
            p = f'{wd}/c{pi}_{si}.png'; caption_png(sent, p); ovs.append((p, max(0, s), e))
        scenes.append((f'p{pi}', png(page['art']), dur, ovs, -1 if pi % 2 else 1, False))
        audio += [sil(lead), a, sil(tail)]
    end_png(f'{wd}/end.png')
    scenes.append(('end', png(B['pages'][-1]['art']), 3.5, [(f'{wd}/end.png', 0, 3.5)], 1, True))
    audio.append(sil(3.5))
    if frames_only:
        for name, im, dur, ovs, dr, dk in scenes[:3]:
            base = Image.open(im).convert('RGBA').resize((W, int(W * Image.open(im).height / Image.open(im).width)))
            fr = base.crop((0, (base.height - H) // 2, W, (base.height - H) // 2 + H))
            for p, a, e in ovs[:1]: fr = Image.alpha_composite(fr, Image.open(p))
            fr.convert('RGB').save(f'{wd}/frame_{name}.jpg', quality=90)
        return
    parts = []
    for name, im, dur, ovs, dr, dk in scenes:
        o = f'{wd}/s_{name}.mp4'; scene(o, im, dur, ovs, dr, dk); parts.append(o)
    open(f'{wd}/list.txt', 'w').write(''.join(f"file '{os.path.abspath(p)}'\n" for p in parts))
    pcm_out = np.concatenate(audio); pcm_i = (np.clip(pcm_out, -1, 1) * 32767).astype(np.int16)
    with wave.open(f'{wd}/a.wav', 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm_i.tobytes())
    run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{wd}/list.txt', '-c', 'copy', f'{wd}/v.mp4'])
    os.makedirs('out', exist_ok=True); tmp = f'out/{sid}.part.mp4'
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{wd}/v.mp4', '-i', f'{wd}/a.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '64k', '-ac', '1', '-shortest', '-movflags', '+faststart', tmp])
    os.replace(tmp, f'out/{sid}.mp4')
    # poster
    Image.open(f'{wd}/{B["cover"]}.png').resize((640, 427)).save(f'out/{sid}.jpg', quality=82)
    print(sid, f'{sum(s[2] for s in scenes):.1f}s', os.path.getsize(f'out/{sid}.mp4') // 1024, 'KB')

if __name__ == '__main__':
    main(sys.argv[1], '--frames' in sys.argv)
