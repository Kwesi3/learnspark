const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nObject.assign(window,{__S:SESSION,__ST:ST,__T:T,__CS:CS,__MQ:MQ,__TD:TD,__WA:WA,__PZ:PZ,__EL:EL,__FAM:FAM,__R:READ,__B:STORIES,__STR:STRANDS,GAMES});\n</script></body>');
const fail=[];const ok=m=>console.log('  ✓',m);const bad=m=>{fail.push(m);console.log('  ✗',m);};
const errors=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0,exponentialRampToValueAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}},type:''}),createGain:()=>({connect(){},gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}}}),createBuffer:()=>({getChannelData:()=>new Float32Array(10)}),createBufferSource:()=>({connect(){},start(){},buffer:null}),destination:{},currentTime:0,sampleRate:44100};};
  w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.print=()=>{w.__printed=1;};w.HTMLElement.prototype.focus=function(){};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.speechSynthesis={speak(u){setTimeout(()=>u.onend&&u.onend(),1);},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(t){this.text=t;};
  w.webkitSpeechRecognition=function(){w.__rec=this;this.start=()=>{};this.abort=()=>{this.onend&&this.onend();};};
  w.addEventListener('error',e=>errors.push(e.error?e.error.stack.split('\n').slice(0,2).join(' '):e.message));}});
const w=dom.window,d=w.document;const $=s=>d.querySelector(s);
function newKid(name,grade){w.renderAddLearner();const ni=d.getElementById('nameIn');ni.value=name;ni.dispatchEvent(new w.Event('input'));w.formGrade(grade);w.formSave();}
for(const grade of [4,6]){
 newKid('K'+grade,grade);
 // ── Practice test ──
 $('.cl-link').click();$('.seg.wide button:nth-child(1)')&&ok(`grade ${grade}: practice test setup opens`);
 w.__T.setup.n=20;w.__T.setup.timed=true;w.startTest();
 const T=w.__T;T.qs.length===20?ok(`grade ${grade}: 20-question mixed test built (${[...new Set(T.qs.map(q=>q.subj))].join(', ')}; types ${[...new Set(T.qs.map(q=>q.q.type))].join(', ')})`):bad('test size '+T.qs.length);
 // answer: first 15 right, 16 wrong, leave 17-20 blank except 18; use eliminate and flag
 for(let i=0;i<T.qs.length;i++){T.i=i;w.testDraw();const it=T.qs[i],q=it.q;if(i>=16&&i!==17)continue;
   const right=i<15||i===17;
   if(q.type==='mc'){const ci=q.opts.findIndex(o=>String(o)===String(q.answer));const wi=q.opts.findIndex((o,j)=>j!==ci);
     w.testElim(wi);w.testPick(right?ci:wi);}
   else if(q.type==='multi'){q.opts.forEach((o,j)=>{if(right?q.answers.includes(o):!q.answers.includes(o))w.testMulti(j);});}
   else if(q.type==='order'){const words=it.words;const ord=right?q.items:[...q.items].reverse();ord.forEach(x=>w.testOrd(words.indexOf(x)));}
   else if(q.type==='input'){T.ans[i]=right?q.num:q.num+'1';}
   else if(q.type==='sort'){T.ans[i]=q.items.map(x=>right?x.c:(x.c+1)%q.cats.length);}
   else if(q.type==='nline'){T.ans[i]=right?q.ans:(q.ans===0?1:q.ans-1);}
   else if(q.type==='plot'){T.ans[i]=right?q.ans.slice():[q.ans[0]+1,q.ans[1]];}
   if(i===3)w.testFlag();}
 w.testReview();d.body.textContent.includes('not answered')?ok(`grade ${grade}: review screen lists unanswered questions`):bad('review');
 w.submitTest();
 const t=w.__ST.extras.tests.slice(-1)[0];t&&t.c===16&&t.n===20?ok(`grade ${grade}: test graded correctly (16/20), per-standard table + every-question review shown`):bad('grading '+JSON.stringify(t&&{c:t.c,n:t.n}));
 d.querySelectorAll('.t-item').length===20?0:bad('items');
 // ── games ──
 const games={detective:()=>{const CS=w.__CS;for(let k=0;k<CS.list.length;k++){const c=CS.list[CS.i];w.casePick(c.a);c.p.forEach(i=>w.caseClue(i));w.caseDone();w.caseDone();}return w.__ST.gameHi.detective>0;},
  mapquest:()=>{const MQ=w.__MQ;for(let i=0;i<5;i++){MQ.chip=i;w.mqTap(i);}w.mqCheck();$('#nextBtn').click();for(let k=0;k<MQ.list.length;k++){w.mqTap(MQ.list[MQ.i][1]);w.mqNext();}return w.__ST.gameHi.mapquest===30;},
  timeline:()=>{const TD=w.__TD;const order=TD.sorted.map(e=>TD.evs.indexOf(e));order.forEach(i=>w.tdTap(i));const s=TD.score;TD.end=Date.now();w.tdOver();return s===3;},
  whoami:()=>{const WA=w.__WA;for(let k=0;k<WA.list.length;k++){const it=WA.list[WA.i];w.waPick(WA.opts.indexOf(it[0]));w.waNext();}return w.__ST.gameHi.whoami===24;},
  pizza:()=>{const PZ=w.__PZ;for(let k=0;k<PZ.total;k++){const o=PZ.o;const need=o.num*o.cut/o.den;for(let i=0;i<need;i++)w.pzTap(i);w.pzServe();w.pzNext();}return w.__PZ.served===8;},
  elevator:()=>{const EL=w.__EL;for(let k=0;k<EL.total;k++){w.elPick(EL.t.ans);w.elNext();}return w.__EL.right===10;}};
 for(const [k,f] of Object.entries(games)){try{w.renderDash();w.switchTab('arcade');const card=[...d.querySelectorAll('.gcard')].find(c=>c.getAttribute('onclick').includes(`'${k}'`));
   if(!card){bad(k+' card missing');continue;}card.click();$('#playBtn').click();f()&&$('.game-over')?ok(`grade ${grade}: ${w.GAMES[k].title} plays through to the end`):bad(k+' result');}catch(e){bad(k+': '+e.message);}}
 // pizza wrong answer + elevator wrong
 w.startPizza();w.pzServe();d.body.textContent.includes('The order needed')?ok(`grade ${grade}: Pizza Shop explains a wrong order`):bad('pizza wrong');
 // ── word problem helper ──
 const ms=w.__STR[grade===4?4:6].math;let found=false;
 for(const st of ms){w.beginPractice('math',st.code);for(let k=0;k<40&&!found;k++){if(w.__S.wp){found=true;break;}w.nextQuestion();}if(found)break;}
 if(found){const hidden=$('#opts').classList.contains('wp-hide');d.querySelectorAll('.wp-num').forEach(b=>b.click());
   hidden&&!$('#opts').classList.contains('wp-hide')&&$('.wp-ask')?ok(`grade ${grade}: word-problem helper: tap numbers → shows the question → reveals answers`):bad('wp flow');}
 else bad('no word problem found');
 // ── shop ──
 w.__ST.stars=100;w.renderDash();w.switchTab('awards');w.shopTap('hat','crown');$('#cfYes').click();
 w.__ST.extras.outfit.hat==='crown'&&w.__ST.stars===60&&w.mascot(60).includes('#FFC83D')?ok(`grade ${grade}: bought a crown for Sparky (stars 100 → 60) and he wears it`):bad('shop');
 w.shopTap('color','gold');d.getElementById('sheet')?($('#cfYes').click(),0):0;w.__ST.extras.outfit.color==='gold'?ok(`grade ${grade}: color change works`):bad('color');
 // ── family ──
 w.startFamily();w.famBegin();for(let p=0;p<2;p++){for(let k=0;k<5;k++){const q=w.__FAM.qs[w.__FAM.qi];w.famPick(p===0?w.__FAM.order.findIndex(o=>String(o)===String(q.answer)):0);w.famNext();}if(p===0)w.famQ();}
 d.body.textContent.includes('Family Challenge results')&&w.__FAM.scores[0]===5?ok(`grade ${grade}: Family Challenge: two players, same questions, results shown`):bad('family');
 // ── certificate ──
 w.renderDash();w.showCertificate('Test','did a thing');$('.cert-name')&&$('.cert-name').textContent==='K'+grade?ok(`grade ${grade}: certificate shows the learner’s name`):bad('cert');w.certPrint();w.certBack();
 // ── fluency ──
 const b=w.__B.find(x=>x.level===2);w.openBook(b.id);w.micToggle();if(d.getElementById('sheet'))$('#sheet .btn-pri').click();
 for(let p=0;p<b.pages.length;p++){const r=w.__rec;r._res=r._res||[];w.__R.lastProgress=Date.now();
   const say=t=>{const a=[{transcript:t}];a.isFinal=true;r._res.push(a);r.onresult({results:r._res});};
   const words=b.pages[p].t.join(' ').replace(/[“”".,!?;:’]/g,'').split(' ');say(words.slice(0,2).join(' '));w.__R.pageT0=Date.now()-words.length*500;say(words.slice(2).join(' '));w.turnPage(1);}
 for(const q of b.qs){w.quizPick(w.__R.order.indexOf(q.a));const e=q.ev[0];$(`.proof-s[data-p="${e[0]}"][data-s="${e[1]}"]`).click();$('#nextBtn').click();}
 const fl=w.__ST.reading.fluency;fl&&fl.length&&$('.flu')?ok(`grade ${grade}: reading speed measured (${fl[fl.length-1].wcpm} words/min) and shown`):bad('fluency');
 // ── report ──
 w.renderReport();const txt=d.body.textContent;['Practice tests','Reading speed','Learning games','History & Social Science','Story Time'].every(s=>txt.includes(s))?ok(`grade ${grade}: parent report shows tests, reading speed, games`):bad('report');
 // awards
 w.renderDash();w.switchTab('awards');['Test Taker','Super Sleuth','Dressed Up','Family Night'].every(x=>[...d.querySelectorAll('.award:not(.locked) .award-n')].some(e=>e.textContent===x))?ok(`grade ${grade}: new awards unlock`):bad('awards');
 // reset via in-page confirm
 w.openSettings();w.resetLearner();$('#cfYes').click();w.__ST.totalQ===0?ok(`grade ${grade}: reset works with the in-page confirm`):bad('reset');
}
errors.length?bad('errors: '+[...new Set(errors)].slice(0,6).join(' | ')):ok('no runtime errors');
console.log(fail.length?`\nFAILED (${fail.length})`:'\nALL PASSED');
