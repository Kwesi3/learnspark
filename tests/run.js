// Runs every test suite against dist/app.html (run `npm run build` first).
// A suite fails if it exits non-zero, prints FAIL/FAILED/✗, or reports problems.
const {spawnSync}=require('child_process');const path=require('path');const fs=require('fs');
const SUITES=['content','story','stories','daily','sync','sol','more','qa','eqfrac','onex','align','hist','ms','el','g5','g5smoke','load','variety'];
const only=process.argv.slice(2);
if(!fs.existsSync(path.join(__dirname,'../dist/app.html'))){console.error('dist/app.html missing: run npm run build first');process.exit(1);}
let failed=[];const t0=Date.now();
for(const s of SUITES){
  if(only.length&&!only.includes(s))continue;
  const t=Date.now();
  const r=spawnSync(process.execPath,[path.join(__dirname,s+'.js')],{encoding:'utf8',timeout:600000,maxBuffer:64<<20});
  const out=(r.stdout||'')+(r.stderr||'');
  const probs=/checked \d+ problems (\d+)/.exec(out);
  const bad=r.status!==0||r.error||/\bFAILED\b|\bFAIL\b|✗/.test(out)||(probs&&+probs[1]>0);
  const last=(r.stdout||'').trim().split('\n').pop()||'';
  console.log(`${bad?'✗':'✓'} ${s.padEnd(9)} ${((Date.now()-t)/1000).toFixed(1).padStart(5)}s  ${last.slice(0,90)}`);
  if(bad){failed.push(s);console.log(out.split('\n').filter(l=>/FAIL|✗|Error|at /.test(l)).slice(0,25).map(l=>'    '+l).join('\n'));}
}
console.log(`\n${failed.length?`FAILED: ${failed.join(', ')}`:'All suites passed'} (${((Date.now()-t0)/1000).toFixed(0)}s)`);
process.exit(failed.length?1:0);
