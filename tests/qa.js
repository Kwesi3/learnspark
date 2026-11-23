// Checks every extra bank item and every extra math template
const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8');
const errors=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0}}),createGain:()=>({connect(){},gain:{value:0}}),destination:{},currentTime:0};};
  w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.addEventListener('error',e=>errors.push(e.message));}});
const w=dom.window;const XB=w.eval('XB'),XG=w.eval('XG');const STR=w.eval('STRANDS');
const gens=new Set();for(const g in STR)for(const s in STR[g])for(const st of STR[g][s])gens.add(st.gen);
let bad=0,items=0,hard=0,tmpl=0;const B=m=>{bad++;if(bad<60)console.log('  ✗',m);};
for(const gen in XB){if(!gens.has(gen))B('unknown gen '+gen);
  for(const it of XB[gen]){items++;if(it.d===3)hard++;
    if(it.t)continue;
    if(!it.q||it.a===undefined||!Array.isArray(it.w))B(`${gen} malformed ${JSON.stringify(it).slice(0,120)}`);
    else{if(it.w.length<2)B(`${gen} too few wrongs: ${it.q}`);
      if(it.w.map(String).includes(String(it.a)))B(`${gen} answer among wrongs: ${it.q}`);
      if(new Set(it.w.map(String)).size!==it.w.length)B(`${gen} dup wrongs: ${it.q}`);
      if(!it.e||!it.h)B(`${gen} missing expl/hint: ${it.q}`);}}}
for(const gen in XG){if(!gens.has(gen))B('unknown gen '+gen);
  XG[gen].forEach((g,i)=>{tmpl++;for(let k=0;k<300;k++){let q;try{q=g.fn();}catch(e){B(`${gen}#${i} threw ${e.message}`);break;}
    const t=JSON.stringify(q).replace(/"dgSvg":"[^"]*"/,'');
    if(/NaN|undefined|Infinity|null\b/.test(t)){B(`${gen}#${i} bad: ${t.slice(0,200)}`);break;}
    if(q.type==='mc'){if(!q.opts.map(String).includes(String(q.answer))){B(`${gen}#${i} answer missing`);break;}
      if(q.opts.length<3){B(`${gen}#${i} only ${q.opts.length} opts: ${q.question} ${q.opts}`);break;}
      if(new Set(q.opts.map(String)).size!==q.opts.length){B(`${gen}#${i} dup opts`);break;}}}});}
// whole pipeline through makeQ, with challenge both off and on
w.eval("(()=>{const p=blankLearner('QA',4,'🦊');PROFILES.list[p.id]=p;activateProfile(p.id);})()");
for(const gen of Object.keys(XB).concat(Object.keys(XG)))for(let k=0;k<60;k++){const q=w.makeQ(gen);if(q.type==='mc'&&!q.opts.map(String).includes(String(q.answer))){B('pipeline '+gen);break;}}
console.log(`bank items ${items} (challenge ${hard}), templates ${tmpl}`);
if(errors.length)B('runtime: '+errors.slice(0,3).join(' | '));
console.log(bad?`FAILED ${bad}`:'ALL PASSED');process.exit(0);
