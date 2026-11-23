const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8');
html=html.replace(/<\/script>\s*<\/body>/,'\nwindow.__R=READ;window.__B=STORIES;window.__ST=ST;window.__SW=SWAP;window.__STR=STRANDS;window.__S=SESSION;\n</script></body>');
const fail=[];const ok=m=>console.log('  ✓',m);const bad=m=>{fail.push(m);console.log('  ✗',m);};
function boot(store){const errors=[];const spoken=[];let lastRec=null;
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://example.github.io/learnspark/',beforeParse(w){
    for(const [k,v] of Object.entries(store||{}))w.localStorage.setItem(k,v);
    w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0,exponentialRampToValueAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}},type:''}),createGain:()=>({connect(){},gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}}}),createBuffer:()=>({getChannelData:()=>new Float32Array(10)}),createBufferSource:()=>({connect(){},start(){},buffer:null}),createBiquadFilter:()=>({connect(){},frequency:{value:0}}),destination:{},currentTime:0,sampleRate:44100};};
    w.requestAnimationFrame=()=>0;w.cancelAnimationFrame=()=>{};w.scrollTo=()=>{};w.prompt=()=>'3';w.confirm=()=>true;w.HTMLElement.prototype.focus=function(){};w.HTMLElement.prototype.scrollIntoView=function(){};
    w.speechSynthesis={speak(u){spoken.push(u.text);setTimeout(()=>u.onend&&u.onend(),5);},cancel(){},getVoices:()=>[{name:'Samantha',lang:'en-US'}]};
    w.SpeechSynthesisUtterance=function(t){this.text=t;};
    w.webkitSpeechRecognition=function(){lastRec=this;w.__rec=this;this.start=()=>{this.running=true;};this.abort=()=>{this.running=false;this.onend&&this.onend();};this.stop=this.abort;};
    w.addEventListener('error',e=>errors.push(e.error?e.error.stack.split('\n').slice(0,2).join(' '):e.message));}});
  return {w:dom.window,d:dom.window.document,errors,spoken};}
function typeName(w,n){const i=w.document.getElementById('nameIn');i.value=n;i.dispatchEvent(new w.Event('input'));}
// say text into the fake recognizer: interim chunks, then a final
function say(w,text){const r=w.__rec;if(!r||!r.onresult)return;r._res=r._res||[];
  const words=text.split(/\s+/);const half=words.slice(0,Math.ceil(words.length/2)).join(' ');
  const mk=(t,f)=>{const a=[{transcript:t}];a.isFinal=f;return a;};
  r.onresult({results:r._res.concat([mk(half,false)])});
  r._res.push(mk(text,true));r.onresult({results:r._res});}
// how a kid + recognizer might render a page: digits, misheard names, a dropped "the"
function garble(page,names){let s=page.t.join(' ').replace(/[“”"’]/g,m=>m==='’'?"'":'').replace(/[.,!?;:]/g,'');
  s=s.replace(/\btwelve\b/gi,'12').replace(/\beight\b/gi,'8').replace(/\bone, two, three, four\b/gi,'1 2 3 4').replace(/\bto\b/,'too');
  names.forEach(n=>{s=s.replace(new RegExp('\\b'+n+'\\b','g'),'blah');});
  s=s.replace(/\bthe (\w+)/,'$1');return s.toLowerCase();}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function answerRight(w){const q=w.__S.q,S=w.__S;
  if(q.type==='mc')return w.pickOpt(q.opts.findIndex(o=>String(o)===String(q.answer)));
  if(q.type==='input'){w.document.getElementById('solIn').value=q.num;return w.solCheck();}
  if(q.type==='sort'){S.sp.place=q.items.map(x=>x.c);return w.solCheck();}
  if(q.type==='nline'){S.sp.pick=q.ans;return w.solCheck();}
  if(q.type==='plot'){S.sp.pt=q.ans.slice();return w.solCheck();}
  if(q.type==='multi'){q.opts.forEach((o,j)=>{if(q.answers.includes(o))w.toggleMulti(j);});return w.checkMulti();}
  if(q.type==='order'){S.words.forEach(()=>{});q.items.forEach(x=>w.sAdd(S.words.indexOf(x)));return w.checkOrder();}
  if(q.type==='sentence'){q.correct.split(' ').forEach(x=>{const i=S.words.findIndex((wd,k)=>wd===x&&!S.placed.includes(k));w.sAdd(i);});return w.checkSentence();}
}
(async()=>{
 for(const grade of [1,4,6]){
  const {w,d,errors,spoken}=boot();typeName(w,'Kid'+grade);w.formGrade(grade);w.formSave();
  w.switchTab('stories');
  const lv=grade<=2?1:grade<=4?2:3;
  d.querySelectorAll('.book').length===w.eval(`STORIES.filter(b=>b.level===${lv}).length`)?ok(`grade ${grade}: shelf shows all Level ${lv} books`):bad('shelf count '+d.querySelectorAll('.book').length);
  d.querySelector('.cl-thumb')||(w.switchTab('learn'),d.querySelector('.cl-thumb'))?ok(`grade ${grade}: Story Time card on Learn tab`):bad('promo');
  for(const b of w.__B){
    w.openBook(b.id);
    if(!d.getElementById('rText')||!d.querySelector('.rd-scene svg, .rd-scene img')){bad(b.id+' reader missing');continue;}
    // first time: consent sheet, accept it
    w.micToggle();if(d.getElementById('sheet')){d.querySelector('#sheet .btn-pri').click();}
    if(!w.__R.want){bad(b.id+' not listening');continue;}
    for(let p=0;p<b.pages.length;p++){
      if(w.__R.page!==p){bad(`${b.id} on page ${w.__R.page}, expected ${p}`);break;}
      say(w,garble(b.pages[p],b.names||[]));
      if(!w.__R.pageDone){
        const miss=w.__R.toks.filter((t,k)=>!t.free&&w.tokState(k)==='');
        bad(`${b.id} p${p+1} not finished by voice; unread: ${miss.map(t=>t.text).join(' ')}`);
        w.turnPage(1);continue;}
      w.turnPage(1);
    }
    if(!d.getElementById('opts')){bad(b.id+' quiz did not open');continue;}
    for(let qi=0;qi<b.qs.length;qi++){
      const q=b.qs[qi];const i=w.__R.order.indexOf(q.a);w.quizPick(i);
      const e=q.ev[0];const btn=d.querySelector(`.proof-s[data-p="${e[0]}"][data-s="${e[1]}"]`);
      if(!btn){bad(b.id+' proof btn');break;}btn.click();
      d.getElementById('nextBtn').click();
    }
    const rec=w.__ST.reading.books[b.id];
    if(!rec||rec.stars!==3||!d.querySelector('.big-st'))bad(`${b.id} finish: ${JSON.stringify(rec)}`);
  }
  const R=w.__ST.reading;
  Object.keys(R.books).length===w.__B.length&&R.words>500?ok(`grade ${grade}: all books read by voice to the end, 3 stars each (${R.words} words)`):bad('books '+Object.keys(R.books).length+' words '+R.words);
  // stuck → glow → help → move on
  const b=w.__B[3];w.openBook(b.id);w.micToggle();
  w.__R.lastProgress=Date.now()-8000;w.readerTick();
  d.querySelector('.w.stuck')?ok(`grade ${grade}: stuck word glows after a pause`):bad('no stuck glow');
  w.__R.stuckAt=Date.now()-8000;spoken.length=0;w.readerTick();
  spoken.length&&w.__R.helpedWords.length?ok(`grade ${grade}: Sparky reads the stuck word (“${spoken[0]}”) and saves it to practice`):bad('no help');
  w.__R.helpedAt=Date.now()-7000;const before=w.__R.cur;w.readerTick();
  w.__R.cur>before?ok(`grade ${grade}: reading moves on if the word still isn’t heard`):bad('no force');
  // tap a glossary word
  w.turnPage(1);const glw=d.querySelector('.w.gl');glw.click();!d.getElementById('rDef').hidden?ok(`grade ${grade}: tapping a highlighted word shows its meaning`):bad('gloss');
  // read to me highlights
  w.readToMe();await sleep(400);d.querySelector('.w.tts')||spoken.length?ok(`grade ${grade}: “Read to me” speaks and highlights`):bad('tts');
  w.stopTalking();
  // wrong answer + 2 wrong proofs
  w.startBookQuiz();const q=b.qs[0];w.quizPick(w.__R.order.findIndex(o=>o!==q.a));
  const wrongs=[...d.querySelectorAll('.proof-s')].filter(x=>!q.ev.some(e=>e[0]==+x.dataset.p&&e[1]==+x.dataset.s));
  wrongs[0].click();wrongs[1].click();
  d.querySelector('.proof-s.ok')&&d.getElementById('nextBtn')?ok(`grade ${grade}: after two wrong tries the proof is shown`):bad('proof reveal');
  // sound swap
  w.startSwap();for(let i=0;i<8;i++){const it=w.__SW.items[w.__SW.i];w.swapPick(w.__SW.opts.indexOf(it[3]));d.getElementById('nextBtn').click();}
  w.__ST.reading.swapC===8&&d.querySelector('.mastery')?ok(`grade ${grade}: Sound Swap round of 8 works`):bad('swap '+w.__ST.reading.swapC);
  // report
  w.renderReport();const t=d.body.textContent;
  t.includes('Story Time')&&t.includes('Words Sparky helped with')&&t.includes('not affiliated')?ok(`grade ${grade}: parent report has Story Time + disclaimer`):bad('report');
  w.renderDash();w.switchTab('awards');['First Book','Book Lover','Proof Detective'].every(x=>[...d.querySelectorAll('.award:not(.locked) .award-n')].some(e=>e.textContent===x))?ok(`grade ${grade}: reading awards unlock`):bad('awards');
  // regression: practice and games still work
  const subj='math';const st=w.__STR[grade][subj][0];w.beginPractice(subj,st.code);
  for(let i=0;i<5;i++){answerRight(w);w.afterAnswer();}
  w.getSkill(subj,st.code).n===5?ok(`grade ${grade}: SOL practice still works`):bad('practice');
  w.renderDash();w.switchTab('arcade');['speedmath','fracmatch','wordwiz','solquiz'].forEach(k=>{try{w.launchGame(k);d.getElementById('playBtn').click();}catch(e){bad('game '+k+' '+e.message);}});w.renderDash();
  // reload keeps reading progress
  const b2=boot({lsva_profiles:w.localStorage.getItem('lsva_profiles')});
  Object.keys(b2.w.__ST.reading.books).length===b2.w.__B.length?ok(`grade ${grade}: reading progress survives reload`):bad('reload');
  errors.length?bad(`grade ${grade} errors: `+[...new Set(errors)].slice(0,4).join(' | ')):ok(`grade ${grade}: no runtime errors`);
 }
 // browser without speech recognition
 {const {w,d,errors}=boot();delete w.webkitSpeechRecognition;}
 console.log(fail.length?`\nFAILED (${fail.length})`:'\nALL PASSED');process.exit(fail.length?1:0);
})();
