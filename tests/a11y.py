#!/usr/bin/env python3
"""Accessibility audit (WCAG 2.1 A/AA) with axe-core on the main screens, desktop and phone.
Fails on any 'serious' or 'critical' violation. Usage: python3 tests/a11y.py [--all]  (--all also lists minor ones)"""
import asyncio, os, sys
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from e2e_smoke import serve, STEPS, NEW, PORT, SITE

AXE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'node_modules', 'axe-core', 'axe.min.js')
SCREENS = [('who', None)] + STEPS
RUN = """async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']},resultTypes:['violations']});
  return r.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,n:v.nodes.length,ex:v.nodes.slice(0,2).map(n=>n.target.join(' ')+' :: '+(n.failureSummary||'').split('\\n').slice(0,2).join(' ')) }));}"""


async def run(show_all):
    found = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, opts in [('desktop', {'viewport': {'width': 1366, 'height': 900}}), ('phone', p.devices['Pixel 7'])]:
            ctx = await b.new_context(**opts)
            pg = await ctx.new_page()
            await pg.goto('http://127.0.0.1:%d/index.html' % PORT)
            await pg.wait_for_timeout(500)
            for step, js in SCREENS:
                if step == 'dashboard':
                    await pg.evaluate(NEW % 4)
                if js:
                    await pg.evaluate(js)
                await pg.wait_for_timeout(250)
                await pg.add_script_tag(path=AXE)
                for v in await pg.evaluate(RUN):
                    key = (v['id'], v['impact'])
                    f = found.setdefault(key, {'help': v['help'], 'screens': set(), 'n': 0, 'ex': v['ex']})
                    f['screens'].add('%s/%s' % (name, step))
                    f['n'] += v['n']
            await ctx.close()
        await b.close()
    bad = {k: v for k, v in found.items() if k[1] in ('serious', 'critical')}
    order = {'critical': 0, 'serious': 1, 'moderate': 2, 'minor': 3}
    for (rid, imp), f in sorted(found.items(), key=lambda kv: order.get(kv[0][1], 9)):
        if imp in ('serious', 'critical') or show_all:
            print('%s %-9s %-28s %4d nodes · %s' % ('✗' if imp in ('serious', 'critical') else '·', imp, rid, f['n'], f['help']))
            print('      screens: %s' % ', '.join(sorted(f['screens']))[:300])
            for e in f['ex']:
                print('      e.g. %s' % e[:230])
    print('\n%d serious/critical issue types, %d other' % (len(bad), len(found) - len(bad)))
    return not bad


if __name__ == '__main__':
    srv = serve()
    ok = asyncio.run(run('--all' in sys.argv))
    srv.shutdown()
    print('Accessibility audit passed' if ok else 'Accessibility audit FAILED')
    sys.exit(0 if ok else 1)
