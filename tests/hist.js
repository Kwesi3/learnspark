const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__S=SESSION;window.__ST=ST;window.__STR=STRANDS;window.__HB=HIST_BANK;\n</script></body>');
const fail=[];const ok=m=>console.log('  ✓',m);const bad=m=>{fail.push(m);console.log('  ✗',m);};
const errors=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0,exponentialRampToValueAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}},type:''}),createGain:()=>({connect(){},gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}}}),createBuffer:()=>({getChannelData:()=>new Float32Array(10)}),createBufferSource:()=>({connect(){},start(){},buffer:null}),destination:{},currentTime:0,sampleRate:44100};};
  w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.confirm=()=>true;w.HTMLElement.prototype.focus=function(){};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.addEventListener('error',e=>errors.push(e.error?e.error.stack.split('\n').slice(0,2).join(' '):e.message));}});
const w=dom.window,d=w.document;
// 1. generator validity
let n=0,kinds={};
for(const g of [4,6])for(const st of w.__STR[g].hist){for(let i=0;i<300;i++){n++;const q=w.makeQ(st.gen);kinds[q.type]=(kinds[q.type]||0)+1;
  if(q.sol!==st.code){bad(`${st.code} tagged ${q.sol}`);break;}
  if(!q.explanation||!q.hint){bad(st.code+' missing why/hint');break;}
  if(q.type==='mc'){if(!q.opts.some(o=>String(o)===String(q.answer))){bad(st.code+' answer missing: '+q.question);break;}
    if(new Set(q.opts.map(String)).size!==q.opts.length||q.opts.length<3){bad(st.code+' opts '+q.opts);break;}
    if(q.dgSvg&&/NaN|undefined/.test(q.dgSvg)){bad(st.code+' bad svg');break;}}
  if(q.type==='multi'&&!q.answers.every(a=>q.opts.includes(a))){bad(st.code+' multi');break;}
  if(q.type==='order'&&q.items.length<3){bad(st.code+' order');break;}}}
ok(`${n} History questions generated across ${w.__STR[4].hist.length+w.__STR[6].hist.length} strands: ${JSON.stringify(kinds)}`);
let bankN=0;for(const k in w.__HB)bankN+=w.__HB[k].length;ok(`${bankN} written questions in the bank, plus generated map and timeline questions`);
// 2. UI: practice every History strand to mastery in both grades, using all question types
for(const grade of [4,6]){
  const i=d.getElementById('nameIn');w.renderAddLearner();const ni=d.getElementById('nameIn');ni.value='H'+grade;ni.dispatchEvent(new w.Event('input'));w.formGrade(grade);w.formSave();
  d.querySelector('.cl-subj[onclick*=hist]')?ok(`grade ${grade}: History & Social Science card on home`):bad('no hist card');
  d.querySelector('.cl-strat-row')?ok(`grade ${grade}: Strategy of the day card shows`):bad('no strategy');
  w.openSubject('hist');d.querySelectorAll('.skill').length===w.__STR[grade].hist.length?ok(`grade ${grade}: skill map lists ${w.__STR[grade].hist.length} History strands`):bad('hist map');
  let wrongTried={multi:0,order:0};
  for(const st of w.__STR[grade].hist){
    w.startSkill('hist',st.code);if(d.querySelector('.sg'))w.eval('SGS.i=sgPages(STUDY[SGS.gen])-1;sgRender()');   // study guide: worked example is on the last page
    if(!d.getElementById('exArea')||!d.getElementById('exArea').innerHTML)bad(st.code+' no example');
    w.beginPractice('hist',st.code);let guard=0;
    while(w.getSkill('hist',st.code).score<100&&guard++<90){const q=w.__S.q;
      const wrong=(q.type!=='mc')&&wrongTried[q.type]<2;
      if(q.type==='mc')w.pickOpt(q.opts.findIndex(o=>String(o)===String(q.answer)));
      else if(q.type==='multi'){if(wrong){wrongTried.multi++;w.toggleMulti(q.opts.findIndex(o=>!q.answers.includes(o)));}else q.opts.forEach((o,i)=>{if(q.answers.includes(o))w.toggleMulti(i);});w.checkMulti();}
      else if(q.type==='order'){const order=wrong?[...q.items].reverse():q.items;wrongTried.order+=wrong?1:0;order.forEach(it=>{const i=w.__S.words.findIndex((x,j)=>x===it&&!w.__S.placed.includes(j));w.sAdd(i);});w.checkOrder();}
      w.afterAnswer();if(d.querySelector('.review-break'))w.nextQuestion();if(d.querySelector('.mastery'))break;}
    if(w.getSkill('hist',st.code).score!==100)bad(`grade ${grade} ${st.code} not mastered`);
  }
  ok(`grade ${grade}: every History strand practiced to SmartScore 100 (including ${wrongTried.multi} wrong select-all and ${wrongTried.order} wrong ordering answers)`);
  const missed=w.__ST.missed.filter(m=>m.subj==='hist');
  if(missed.length){w.startReview();let g2=0;while(w.__S.mode==='review'&&w.__ST.missed.length&&g2++<80){const q=w.__S.q;
    if(q.type==='mc')w.pickOpt(q.opts.findIndex(o=>String(o)===String(q.answer)));
    else if(q.type==='multi'){q.opts.forEach((o,i)=>{if(q.answers.includes(o))w.toggleMulti(i);});w.checkMulti();}
    else if(q.type==='order'){q.items.forEach(it=>{const i=w.__S.words.findIndex((x,j)=>x===it&&!w.__S.placed.includes(j));w.sAdd(i);});w.checkOrder();}
    else{w.showRaceModel&&w.showRaceModel();w.raceSelf&&w.raceSelf(true);}
    w.afterAnswer();}
   w.__ST.missed.length===0?ok(`grade ${grade}: missed History questions (incl. select-all/order) work in Review`):bad('review left '+w.__ST.missed.length);}
  w.renderReport();d.body.textContent.includes('History & Social Science')?ok(`grade ${grade}: parent report includes History`):bad('report');
  w.renderDash();w.strategyGo();(d.getElementById('activity')||d.querySelector('.lesson')||d.querySelector('.shelf'))?ok(`grade ${grade}: “Practice it” opens a matching activity`):bad('strategy go');
}
errors.length?bad('errors: '+[...new Set(errors)].slice(0,5).join(' | ')):ok('no runtime errors');
console.log(fail.length?`\nFAILED (${fail.length})`:'\nALL PASSED');
