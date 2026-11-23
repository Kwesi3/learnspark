#!/usr/bin/env python3
"""Browser smoke test: serve dist/site, click through the main screens on desktop and phone,
fail on any page error. Optional: --axe runs an accessibility audit (see tests/a11y.py).
Needs: pip install playwright && python -m playwright install chromium"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright

SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist', 'site')
PORT = 8799
NEW = "(()=>{const p=blankLearner('Test Kid',%d,'🦊');PROFILES.list[p.id]=p;persistProfiles();activateProfile(p.id);save();renderDash();})()"
FORCE = """(t,gen)=>{for(let i=0;i<400;i++){const q=solFormats(gen,makeQ(gen),true);if(q.type===t){SESSION.q=q;SESSION.answered=false;
  const b=document.getElementById('actBody');b.innerHTML='';renderQuestion(q,b);return true;}}return false;}"""
STEPS = [
    ('dashboard', "ST.tab='learn';renderDash()"),
    ('practice', "beginPractice('math',skillsFor('math')[0].code)"),
    ('type-in', "(%s)('input','g4_area')" % FORCE),
    ('sort', "(%s)('sort','g4_frac')" % FORCE),
    ('number line', "(%s)('nline','g4_frac')" % FORCE),
    ('grid', "(%s)('plot','g6_coord')" % FORCE),
    ('lesson', "openLesson('math',skillsFor('math')[0].code,true)"),
    ('stories', "renderDash();switchTab('stories')"),
    ('reader', "openBook('kente')"),
    ('arcade', "closeBook();renderDash();switchTab('arcade')"),
    ('fact sprint', "startFactSprint();fsGo()"),
    ('report', "fsQuit();renderReport()"),
    ('settings', "renderDash();openSettings()"),
    ('move progress', "openSync()"),
    ('worksheets', "closeSheet();openWorksheets('math');WS.n=10;wsMake()"),
    ('practice test', "renderDash();T.setup={subj:'math',n:10,timed:false};startTest()"),
]


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    h = functools.partial(Quiet, directory=SITE)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def run():
    failures = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, opts in [('desktop', {'viewport': {'width': 1366, 'height': 900}}), ('phone', p.devices['Pixel 7'])]:
            ctx = await b.new_context(**opts)
            pg = await ctx.new_page()
            errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto('http://127.0.0.1:%d/index.html' % PORT)
            await pg.wait_for_timeout(500)
            for grade in (4, 6):
                await pg.evaluate(NEW % grade)
                for step, js in STEPS:
                    try:
                        await pg.evaluate(js)
                        await pg.wait_for_timeout(150)
                    except Exception as e:
                        errs.append('%s: %s' % (step, str(e).split('\n')[0]))
            if errs:
                failures += ['%s: %s' % (name, e) for e in errs]
            print('%s %s: %d screens, %d errors' % ('✗' if errs else '✓', name, 2 * len(STEPS), len(errs)))
            await ctx.close()
        await b.close()
    for f in failures[:20]:
        print('   ', f)
    return not failures


if __name__ == '__main__':
    if not os.path.exists(os.path.join(SITE, 'index.html')):
        sys.exit('dist/site missing: run npm run build first')
    srv = serve()
    ok = asyncio.run(run())
    srv.shutdown()
    print('Smoke test passed' if ok else 'Smoke test FAILED')
    sys.exit(0 if ok else 1)
