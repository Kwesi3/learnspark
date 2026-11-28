#!/usr/bin/env python3
"""Build LearnSpark from src/ into dist/.

  python3 tools/build.py            # dist/site (GitHub Pages) + dist/LearnSpark.html (single file)
  python3 tools/build.py --check    # build, then fail if the generated app script has a syntax error

Inputs
  src/js/*.js         app code, joined in file-name order (one shared global scope, like classic scripts)
  src/css/*.css       styles, appended after the template's own <style> (reader, images, app order)
  src/index.html      page template (<!-- SCRIPT_PLACEHOLDER --> marks the script)
  src/data/*.json     generated data: narration timing map, video list
  src/static/         manifest and icons
  src/CACHE_VERSION   offline-cache version; bump it to make installed copies update
  assets/, audio/     pictures, videos and narration, copied as they are
Placeholders in the code: /*@art-keys*/ /*@audio-map*/ /*@videos*/ /*@version*/
"""
import base64, json, os, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, DIST = os.path.join(ROOT, 'src'), os.path.join(ROOT, 'dist')
CSS_ORDER = ['reader.css', 'images.css', 'app.css']


def read(p):
    with open(p, encoding='utf8') as f:
        return f.read()


def art_keys():
    keys = sorted(f[:-5] for f in os.listdir(os.path.join(ROOT, 'assets/art')) if f.endswith('.webp'))
    return '[' + ', '.join('"%s"' % k for k in keys) + ']'


def version():
    v = 'v' + read(os.path.join(SRC, 'CACHE_VERSION')).strip()
    try:
        sha = subprocess.run(['git', 'rev-parse', '--short', 'HEAD'], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        date = subprocess.run(['git', 'log', '-1', '--format=%cs'], cwd=ROOT, capture_output=True, text=True).stdout.strip()
    except Exception:
        sha = date = ''
    return json.dumps(' · '.join(x for x in (v, date, sha) if x), ensure_ascii=False)


def app_js():
    js = ''.join(read(os.path.join(SRC, 'js', f)) for f in sorted(os.listdir(os.path.join(SRC, 'js'))) if f.endswith('.js'))
    fills = {'/*@art-keys*/': art_keys(),
             '/*@audio-map*/': read(os.path.join(SRC, 'data/audio-map.json')).strip(),
             '/*@videos*/': read(os.path.join(SRC, 'data/videos.json')).strip(),
             '/*@version*/': version()}
    for k, v in fills.items():
        assert js.count(k) == 1, 'placeholder %s must appear once' % k
        js = js.replace(k, v)
    return js


def app_html(js):
    shell = read(os.path.join(SRC, 'index.html'))
    css = ''.join(read(os.path.join(SRC, 'css', f)) for f in CSS_ORDER)
    i = shell.index('</style>')
    shell = shell[:i] + css + shell[i:]
    return shell.replace('<!-- SCRIPT_PLACEHOLDER -->', '<script>\n' + js + '\n</scr' + 'ipt>')


HEAD = '''<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#4C8DF6">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="description" content="LearnSpark: Virginia SOL practice and read-aloud stories for kids. Works offline; progress stays on this device.">
'''
SW_REGISTER = '''<script>
// Offline support when hosted (GitHub Pages): cache the app after the first visit.
if('serviceWorker' in navigator && location.protocol==='https:'){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
</script>
</body>'''


def service_worker(assets, audio):
    ver = 'learnspark-v' + read(os.path.join(SRC, 'CACHE_VERSION')).strip()
    tpl = read(os.path.join(SRC, 'sw.template.js'))
    return (tpl.replace('/*@cache*/', ver)
               .replace('/*@assets*/', ','.join("'./%s'" % a for a in assets))
               .replace('/*@audio*/', ','.join("'./audio/%s'" % a for a in audio)))


def main():
    js = app_js()
    html = app_html(js)
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    site = os.path.join(DIST, 'site')
    os.makedirs(site)
    # site for GitHub Pages
    page = html.replace('</head>', HEAD + '</head>', 1).replace('</body>', SW_REGISTER, 1)
    audio = sorted(f for f in os.listdir(os.path.join(ROOT, 'audio')) if f.endswith('.mp3'))
    assets = sorted(os.path.relpath(os.path.join(dp, f), ROOT) for dp, _, fs in os.walk(os.path.join(ROOT, 'assets'))
                    for f in fs if f.endswith(('.svg', '.webp')))
    with open(os.path.join(site, 'index.html'), 'w', encoding='utf8') as f:
        f.write(page)
    with open(os.path.join(site, 'sw.js'), 'w', encoding='utf8') as f:
        f.write(service_worker(assets, audio))
    for f in os.listdir(os.path.join(SRC, 'static')):
        shutil.copy(os.path.join(SRC, 'static', f), site)
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(site, 'assets'))
    shutil.copytree(os.path.join(ROOT, 'audio'), os.path.join(site, 'audio'))
    # single file (claude.ai artifact): small pictures inlined
    inline = {a[len('assets/'):]: ('data:image/svg+xml;base64,' if a.endswith('.svg') else 'data:image/webp;base64,') +
              base64.b64encode(open(os.path.join(ROOT, a), 'rb').read()).decode()
              for a in assets if a.endswith('.svg') or '/sm/' in a}
    # The claude.ai copy has a file limit, so study-guide narration there is Ava only.
    single = html.replace('<script>\n', '<script>\nwindow.SG_AVA_ONLY=1;window.ASSET_INLINE=' + json.dumps(inline) + ';\n', 1)
    with open(os.path.join(DIST, 'LearnSpark.html'), 'w', encoding='utf8') as f:
        f.write(single)
    with open(os.path.join(DIST, 'app.js'), 'w', encoding='utf8') as f:
        f.write(js)
    with open(os.path.join(DIST, 'app.html'), 'w', encoding='utf8') as f:
        f.write(html)
    print('built dist/site (%d assets, %d audio) and dist/LearnSpark.html (%d KB)' % (len(assets), len(audio), len(single) // 1024))
    if '--check' in sys.argv:
        r = subprocess.run(['node', '--check', os.path.join(DIST, 'app.js')], capture_output=True, text=True)
        if r.returncode:
            print(r.stderr)
            sys.exit(1)
        print('syntax ok')


if __name__ == '__main__':
    main()
