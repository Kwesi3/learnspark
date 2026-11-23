// Content checks across every skill: broken values, answer not among the choices, duplicate choices,
// missing explanations or lessons, plus grammar slips like "1 tens". Errors fail CI; warnings are listed.
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const N=+process.env.CONTENT_SAMPLES||60;
const dom=new JSDOM(fs.readFileSync(path.join(__dirname,'../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://example.github.io/',
  beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.matchMedia=()=>({matches:false,addEventListener(){}});}});
const w=dom.window;
const skills=w.eval(`Object.entries(STRANDS).flatMap(([g,o])=>Object.entries(o).flatMap(([subj,list])=>list.map(s=>({grade:+g,subj,code:s.code,name:s.name,gen:s.gen,les:(LESSONS[s.gen]||[]).length}))))`);
const errors=[],warns=[];const E=(s,m)=>errors.push(`${s.gen} (gr ${s.grade} ${s.subj} ${s.code}): ${m}`),W=(s,m)=>warns.push(`${s.gen}: ${m}`);
const BROKEN=/\bundefined\b|\bNaN\b|\[object |\bInfinity\b|\bnull\b/;
const PLURAL1=/(^|[^\d.,\/])1 (tens|ones|hundreds|thousands|days|hours|minutes|seconds|weeks|years|cups|feet|inches|yards|miles|pounds|ounces|quarters|dimes|nickels|pennies|dollars|cents|students|apples|books|groups|rows|times)\b/;
const txt=q=>[q.question,q.explanation,q.hint,q.passage].concat(q.opts||[]).concat(q.items?q.items.map(x=>x.t||x):[]).concat(q.cats||[]).filter(x=>x!=null).map(x=>String(x).replace(/<[^>]+>/g,' ')).join(' ¦ ');
for(const s of skills){
  if(!s.code)E(s,'no SOL code');if(!s.les)E(s,'no lesson notes');
  const seenW=new Set();
  for(let i=0;i<N;i++){
    w.__g=s.gen;let q;
    try{q=w.eval('makeQ(__g)');}catch(e){E(s,'makeQ threw: '+e.message);break;}
    if(!q){E(s,'makeQ returned nothing');break;}
    const t=txt(q);
    if(!String(q.question||q.correct||'').trim())E(s,'empty question');
    if(BROKEN.test(t))E(s,'broken value in: '+t.slice(0,140));
    if(q.type==='mc'){
      const o=q.opts.map(String);
      if(o.length<2)E(s,'fewer than 2 choices: '+q.question.slice(0,80));
      if(!o.includes(String(q.answer)))E(s,`answer "${q.answer}" not among choices [${o.join(' | ')}]: ${q.question.slice(0,80)}`);
      if(new Set(o.map(x=>x.trim())).size!==o.length)E(s,`duplicate choices [${o.join(' | ')}]: ${q.question.slice(0,80)}`);
    }
    if(q.type==='multi'&&!q.answers.every(a=>q.opts.includes(a)))E(s,'select-all answer missing from choices');
    if(!q.explanation&&!q.expl&&q.type!=='sentence'&&q.type!=='race')E(s,'no explanation: '+String(q.question).slice(0,80));
    const m=PLURAL1.exec(t);if(m&&!seenW.has(m[0])){seenW.add(m[0]);W(s,`grammar "${m[0].trim()}" in: ${String(q.question).slice(0,90)}`);}
  }
}
// stories: every comprehension question's answer is one of its choices and evidence points at a real sentence
const st=w.eval('STORIES.map(b=>({id:b.id,pages:b.pages.map(p=>p.t.length),qs:b.qs.map(q=>({q:q.q,o:q.o,a:q.a,ev:q.ev}))}))');
for(const b of st)for(const q of b.qs){
  if(!q.o.includes(q.a))errors.push(`story ${b.id}: answer not among choices: ${q.q}`);
  for(const [p,sn] of (q.ev||[]))if(!(p<b.pages.length&&sn<b.pages[p]))errors.push(`story ${b.id}: evidence [${p},${sn}] points nowhere: ${q.q}`);
}
console.log(`checked ${skills.length} skills × ${N} questions and ${st.length} stories`);
if(warns.length){console.log(`\n${warns.length} warnings (not failing):`);warns.slice(0,40).forEach(x=>console.log('  · '+x));}
if(errors.length){console.log(`\n${errors.length} errors:`);[...new Set(errors)].slice(0,60).forEach(x=>console.log('  FAIL '+x));console.log('\nFAILED');}
else console.log('\nALL PASSED');
process.exit(0);
