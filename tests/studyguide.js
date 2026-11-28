// Study guides: every guide is complete, quick checks are answerable, and the screens render.
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const w=new JSDOM(fs.readFileSync(path.join(__dirname,'../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.matchMedia=()=>({matches:false,addEventListener(){}});}}).window;
let fail=0;const ok=m=>console.log('  ✓',m),bad=m=>{fail++;console.log('  ✗',m);};
const gens=w.eval('Object.keys(STUDY)');
for(const g of gens){const G=w.eval(`STUDY['${g}']`);const probs=[];
  if(!(G.goals&&G.goals.length>=2))probs.push('goals');if(!(G.words&&G.words.length>=3))probs.push('words');
  if(!(G.pages&&G.pages.length>=3))probs.push('pages');if(!(G.watch&&G.watch.length>=2))probs.push('watch');if(!(G.sum&&G.sum.length>=3))probs.push('summary');
  G.pages.forEach((p,i)=>{if(!p.h||!p.p||!p.p.length)probs.push('page '+i);
    if(p.ex&&!(p.ex.q&&p.ex.steps.length&&p.ex.a))probs.push('example '+i);
    if(!p.chk)probs.push('no check on page '+i);else{const c=p.chk;
      if(!c.why||!c.w||c.w.length<2)probs.push('check '+i);
      if(c.w.map(String).includes(String(c.a)))probs.push('check '+i+' answer also listed as wrong');
      if(new Set(c.w.map(String)).size!==c.w.length)probs.push('check '+i+' duplicate choices');}
    if(p.dg){try{const svg=p.dg('#2F6FE0');if(!/^<svg/.test(svg))probs.push('diagram '+i);}catch(e){probs.push('diagram '+i+' '+e.message);}}});
  probs.length?bad(`${g}: ${probs.join(', ')}`):null;}
ok(`${gens.length} study guides complete (goals, key words, ≥3 steps with checks, watch-outs, summary)`);
// every grade 4 math standard has one, and each page renders
let pages=0,errs=[];
// subjects whose study guides are finished, per grade (grows batch by batch)
const DONE={4:['math','sci'],6:['math']};
for(const grade of [4,6])for(const subj of DONE[grade]){w.eval(`(()=>{const p=blankLearner('T',${grade},'🦊');PROFILES.list[p.id]=p;activateProfile(p.id);})()`);
const miss=w.eval(`skillsFor('${subj}').filter(s=>!STUDY[s.gen]).map(s=>s.code)`);
miss.length?bad(`grade ${grade} ${subj} without a guide: `+miss.join(' ')):ok(`every grade ${grade} ${subj} standard has a study guide`);
for(const c of w.eval(`skillsFor('${subj}').map(s=>s.code)`)){try{w.eval(`openLesson('${subj}','${c}',true)`);
  const n=w.eval('sgPages(STUDY[SGS.gen])');for(let i=0;i<n;i++){w.eval(`SGS.i=${i};sgRender()`);pages++;
    if(!w.document.querySelector('.sg-card'))errs.push(c+' p'+i);if(/undefined|NaN/.test(w.document.querySelector('.sg-card').textContent))errs.push(c+' p'+i+' shows undefined');}}catch(e){errs.push(c+' '+e.message);}}}
errs.length?bad('render: '+errs.slice(0,5).join('; ')):ok(`${pages} study-guide pages render`);
// finishing a guide is saved, and the speech text has no raw math symbols
w.eval("SGS.i=sgPages(STUDY[SGS.gen])-1;sgRender()");w.eval('sgDone(SGS.gen)')?ok('finishing a guide is saved in the profile'):bad('guide completion not saved');
const sp=w.eval("sgSpeech('2 1/4 − 3/4 = 1 2/4 and 6 × 4 ≈ 25 sq ft at 4:35 p.m.')");
/[×÷−=≈\/]/.test(sp)?bad('speech still has symbols: '+sp):ok('speech text: '+sp);
process.exit(fail?1:0);
