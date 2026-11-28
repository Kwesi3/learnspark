// ═══════════════════════════════════════════════════════════════
// STORY TIME — read a book out loud to Sparky.
// Listening: the browser's speech recognition (Chrome, Edge, Safari),
// or the claude.ai "dictation" capability when the page runs there.
// Sparky follows along word by word, waits, then helps with stuck words.
// ═══════════════════════════════════════════════════════════════
const READ={want:false,heard:[],partial:'',base:0,drop:0,cur:0,status:[],stuckAt:0,helpedAt:0,forced:0,forcedSpoken:0};
function rstate(){
  if(!ST.reading)ST.reading={};
  const r=ST.reading,d={books:{},words:0,sec:0,tricky:{},swapN:0,swapC:0,qN:0,qC:0,proofN:0,proofC:0};
  for(const k in d)if(r[k]===undefined)r[k]=d[k];
  return r;
}
const STICKER_VB={dog:'-56 -64 104 70',sunflower:'-42 -200 84 84',kite:'-32 -88 64 64',turtle:'-26 -36 52 40',djembe:'-36 -80 72 84',bee:'-24 -38 48 34',rover:'-42 -70 120 80',clock:'-32 -60 64 70',spider:'-46 -60 92 70'};
function myLevel(){return ST.grade<=2?1:ST.grade<=4?2:3;}
function bookById(id){return STORIES.find(b=>b.id===id);}
function starStr(n,of){of=of||3;return '★'.repeat(n)+'☆'.repeat(Math.max(0,of-n));}

// ── words: normalize, number words, fuzzy match ──
const NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function numWords(n){n=+n;if(n<20)return [NUMW[n]];if(n<100)return n%10?[TENS[Math.floor(n/10)],NUMW[n%10]]:[TENS[n/10]];
  if(n<1000){const h=[NUMW[Math.floor(n/100)],'hundred'];return n%100?h.concat(numWords(n%100)):h;}return [String(n)];}
function normW(w){return String(w).toLowerCase().replace(/[’‘`]/g,"'").replace(/[^a-z0-9']/g,'').replace(/^'+|'+$/g,'');}
function spokenTokens(text){
  const out=[];String(text).toLowerCase().replace(/[’‘]/g,"'").split(/[\s\-–—]+/).forEach(t=>{
    const m=t.match(/^(\d+)(?::\d+)?/);if(m&&+m[1]<1000){numWords(m[1]).forEach(x=>out.push(x));return;}
    const n=normW(t);if(n)out.push(n);});
  return out;
}
const SOUNDS_LIKE={two:['to','too'],to:['two','too'],too:['to','two'],four:['for','fore'],for:['four'],one:['won'],won:['one'],eight:['ate'],
  know:['no'],no:['know'],hole:['whole'],whole:['hole'],sun:['son'],son:['sun'],tail:['tale'],sea:['see','c'],see:['sea'],so:['sew'],
  there:['their',"they're"],their:['there'],hear:['here'],here:['hear'],by:['buy','bye'],red:['read'],read:['red','reed'],new:['knew'],knew:['new'],
  right:['write'],sees:['seas','seize'],whirred:['word','whirled','worried'],pats:["pat's",'paths'],pup:['pop','pub','pope'],ama:['amma','alma'],
  mia:['maya','mya'],sam:['psalm','some'],pip:['pep','pick','pit'],biscuit:['biscuits'],ntikuma:[],flippers:['flipper']};
function lev(a,b){if(a===b)return 0;const m=a.length,n=b.length;if(Math.abs(m-n)>2)return 9;
  let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[n];}
function wordMatch(exp,said){
  if(!said)return false;if(exp===said)return true;
  const a=exp.replace(/'/g,''),b=said.replace(/'/g,'');if(a===b)return true;
  if(a.length>=4&&a.replace(/s$/,'')===b.replace(/s$/,''))return true;
  if((SOUNDS_LIKE[exp]||[]).includes(said))return true;
  const tol=a.length>=8?2:a.length>=4?1:0;return tol>0&&lev(a,b)<=tol;
}
const STOP=new Set(['the','a','an','and','to','of','in','on','is','it','he','she','i','was','his','her','at','up','so','but','for','with','we','they','you','that','this','as','be','are','had','has']);
// Line up what was said with the words on the page. Greedy: each spoken word
// matches the next page word, or one a few words ahead (the reader skipped).
function alignWords(exp,spoken,start,prev){
  const n=exp.length;const st=prev.slice();for(let j=start;j<n;j++)st[j]=0;let e=start;
  const passFree=()=>{while(e<n&&exp[e].free){st[e]=1;e++;}};
  passFree();
  for(const s of spoken){
    if(e>=n)break;let hit=-1;
    for(let k=0;k<4&&e+k<n;k++){
      const x=exp[e+k];if(k>0&&(x.w.length<3||STOP.has(x.w)))continue;
      if(wordMatch(x.w,s)){hit=e+k;break;}
    }
    if(hit<0)continue;
    for(let j=e;j<hit;j++)st[j]=exp[j].free?1:2;
    st[hit]=1;e=hit+1;passFree();
  }
  return {st,cur:e};
}

// ── listening backends ──
const NativeSR=window.SpeechRecognition||window.webkitSpeechRecognition;
let CLAUDE_DICT=null;
(async()=>{try{if(window.claude&&window.claude.use){CLAUDE_DICT=await window.claude.use('dictation');
  if(CLAUDE_DICT){CLAUDE_DICT.onPartial(({text})=>{READ.partial=text||'';heardChanged();});
    CLAUDE_DICT.onFinal(({text})=>{pushFinal(text);READ.partial='';heardChanged();});
    CLAUDE_DICT.onState(({state,reason})=>{if(state==='idle'&&READ.want&&reason!=='stopped'){READ.want=false;micUI();}});}}}catch(e){CLAUDE_DICT=null;}})();
function canListen(){return !!(CLAUDE_DICT||NativeSR);}
function pushFinal(t){if(READ.drop){READ.drop=0;return;}if(t&&t.trim())READ.heard.push(t);}
function startNative(){
  const r=new NativeSR();r.lang='en-US';r.continuous=true;r.interimResults=true;r.maxAlternatives=1;
  const sess=READ.sess=(READ.sess||0)+1;let nFin=0;
  r.onresult=e=>{if(sess!==READ.sess)return;let part='';
    for(let i=nFin;i<e.results.length;i++){if(e.results[i].isFinal){pushFinal(e.results[i][0].transcript);nFin=i+1;}else part+=' '+e.results[i][0].transcript;}
    READ.partial=part;heardChanged();};
  r.onerror=e=>{if(sess!==READ.sess)return;
    if(e.error==='not-allowed'||e.error==='service-not-allowed'){READ.want=false;micUI();sparkySays('The microphone is blocked. Tap the lock icon in the address bar to allow it, or tap Read to me and I’ll read to you.');}
    else if(e.error==='network'){READ.want=false;micUI();sparkySays('I can’t reach the listening service. Check the internet, or tap Read to me.');}};
  r.onend=()=>{if(sess!==READ.sess)return;if(READ.partial){pushFinal(READ.partial);READ.partial='';}
    if(READ.want)setTimeout(()=>{if(READ.want&&sess===READ.sess)startNative();},250);else micUI();};
  try{r.start();READ.rec=r;}catch(e){READ.want=false;}
}
function micToggle(){
  if(READ.want)return micStop();
  if(!canListen()){sparkySays('This browser can’t listen. Use Chrome, Edge, or Safari — or read out loud to a grown-up and tap “Next page”.');return;}
  if(!ST.settings.micOK)return micConsent();
  stopTalking();READ.want=true;READ.lastProgress=Date.now();READ.stuckAt=0;
  if(CLAUDE_DICT){CLAUDE_DICT.start().catch(err=>{READ.want=false;micUI();
      sparkySays(String(err&&err.message||err).includes('not_granted')?'Listening is turned off for this page. Tap Read to me and I’ll read to you.':'I couldn’t start listening. Try the microphone again.');});}
  else startNative();
  micUI();sparkySays(pick(['I’m listening! Start reading when you’re ready.','Go ahead — I’m all ears! 🎧','Read the words out loud. I’ll follow along.']));
}
function micStop(quiet){
  READ.want=false;
  if(CLAUDE_DICT){try{CLAUDE_DICT.stop();}catch(e){}}
  if(READ.rec){READ.sess=(READ.sess||0)+1;try{READ.rec.abort();}catch(e){}READ.rec=null;}
  if(!quiet){micUI();sparkySays('Tap the microphone when you want to read to me again.');}
}
function micConsent(){
  const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';
  el.innerHTML=`<div class="sheet" role="dialog" aria-label="Turn on listening">
    <div class="sheet-h">Turn on listening?</div>
    <div class="consent">${mascot(70,'happy')}<p>Sparky listens while your child reads aloud, so he can follow along and help with tricky words.</p></div>
    <p class="muted">For grown-ups: speech is turned into text by the browser’s speech service (Google in Chrome, Microsoft in Edge, Apple in Safari, or Claude inside claude.ai). LearnSpark keeps no recordings — only which words were read, saved on this device.</p>
    <div class="sheet-acts"><button class="btn btn-pri" style="background:#23845A" onclick="ST.settings.micOK=true;save();closeSheet();micToggle()">Turn on listening</button>
    <button class="btn btn-sec" onclick="closeSheet();sparkySays('No problem! Tap Read to me and I’ll read to you.')">Not now</button></div></div>`;
  document.body.appendChild(el);
}
function micUI(){const b=document.getElementById('micBtn');if(!b)return;b.classList.toggle('on',READ.want);
  b.setAttribute('aria-pressed',READ.want);b.querySelector('.mic-l').textContent=READ.want?'Listening…':'Read to Sparky';}
function sparkySays(t,mood){const b=document.getElementById('rBubble');if(b)b.textContent=t;
  const m=document.getElementById('rMascot');if(m&&mood)m.innerHTML=mascot(64,mood);}

// ── read to me (browser voice, word highlighting) ──
let _voice=null;
function niceVoice(){
  if(_voice)return _voice;try{const vs=speechSynthesis.getVoices().filter(v=>/^en[-_]US/i.test(v.lang)||/^en/i.test(v.lang));
    const pref=['Samantha','Google US English','Microsoft Aria','Microsoft Jenny','Microsoft Ana','Ava','Allison','Karen','Microsoft Zira'];
    _voice=pref.map(p=>vs.find(v=>v.name.includes(p))).find(Boolean)||vs.find(v=>/en-US/i.test(v.lang))||vs[0]||null;}catch(e){}
  return _voice;
}
function sayText(text,rate,onEnd,onWord){
  if(typeof speechSynthesis==='undefined'){onEnd&&onEnd();return null;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);const v=niceVoice();if(v)u.voice=v;u.lang='en-US';u.rate=rate||.9;u.pitch=1.05;
    if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name===undefined)onWord(e.charIndex);};
    u.onend=()=>onEnd&&onEnd();u.onerror=()=>onEnd&&onEnd();speechSynthesis.speak(u);return u;}catch(e){onEnd&&onEnd();return null;}
}
function stopTalking(){READ.talking=false;if(READ.ttsTimer){clearInterval(READ.ttsTimer);READ.ttsTimer=null;}
  try{speechSynthesis.cancel();}catch(e){}document.querySelectorAll('.w.tts').forEach(x=>x.classList.remove('tts'));
  const b=document.getElementById('ttsBtn');if(b)b.classList.remove('on');}
function readToMe(){
  if(READ.talking)return stopTalking();
  if(READ.want)micStop(true);micUI();
  const key='p'+READ.page,bid=READ.book.id;
  if(narrOK(bid,key)){
    const W=AUDIO_MAP[bid].map[key].w;let last=-1;READ.talking=true;document.getElementById('ttsBtn').classList.add('on');
    const mark=i=>{document.querySelectorAll('.w.tts').forEach(x=>x.classList.remove('tts'));const el=document.querySelector(`.w[data-k="${i}"]`);if(el)el.classList.add('tts');};
    sparkySays('Follow the words with your eyes while I read.','happy');
    narrPlay(bid,key,{onTick:t=>{let i=-1;for(let k=0;k<W.length;k++){if(W[k][0]<=t)i=k;else break;}if(i!==last&&i>=0){last=i;mark(i);}},
      onEnd:()=>{stopTalking();sparkySays('Now you try! Tap the microphone and read it to me.','wave');}})
      .then(ok=>{if(!ok){READ.talking=false;readToMeVoice();}});
    return;
  }
  readToMeVoice();
}
function readToMeVoice(){
  if(READ.want)micStop(true);micUI();
  const toks=READ.toks;let text='';const starts=[];toks.forEach(t=>{starts.push(text.length);text+=t.text+' ';});
  READ.talking=true;document.getElementById('ttsBtn').classList.add('on');
  let lastIdx=-1,gotBoundary=false;
  const mark=i=>{if(i===lastIdx)return;lastIdx=i;document.querySelectorAll('.w.tts').forEach(x=>x.classList.remove('tts'));
    const el=document.querySelector(`.w[data-k="${i}"]`);if(el)el.classList.add('tts');};
  sparkySays('Follow the words with your eyes while I read.','happy');
  sayText(text,.85,()=>{stopTalking();sparkySays('Now you try! Tap the microphone and read it to me.','wave');},ci=>{
    gotBoundary=true;let i=0;while(i+1<starts.length&&starts[i+1]<=ci)i++;mark(i);});
  // some voices never report word positions — estimate the timing instead
  let i=0;const t0=Date.now();
  READ.ttsTimer=setInterval(()=>{if(gotBoundary||!READ.talking){if(!READ.talking)clearInterval(READ.ttsTimer);return;}
    const el=(Date.now()-t0)/1000;let acc=0;for(i=0;i<toks.length;i++){acc+=.28+toks[i].text.length*.055;if(acc>el)break;}mark(Math.min(i,toks.length-1));},120);
}

// ── bookshelf (Stories tab) ──
function bookCard(b){
  const rec=rstate().books[b.id];const L=BOOK_LEVELS[b.level];
  return `<button class="book" onclick="openBook('${b.id}')">
    <span class="book-cover">${scene(b.cover,'Cover of '+b.title)}${rec?`<span class="book-stars">${starStr(rec.stars)}</span>`:'<span class="book-new">New</span>'}</span>
    <span class="book-t">${b.title}</span>
    <span class="book-m"><span class="lvl-dot" style="background:${L.color}"></span>${L.label} · ${b.kind} · ${b.pages.length} pages</span></button>`;
}
let _shelfLevel=null;
function renderStoriesTab(c){
  const r=rstate();const lv=_shelfLevel||myLevel();
  const done=Object.keys(r.books).length;
  const stickers=STORIES.filter(b=>r.books[b.id]);
  c.innerHTML=`
    <div class="story-hero">${mascot(84,'wave')}<div>
      <div class="sh-t">Read a book to Sparky</div>
      <div class="sh-d">Pick a book and read it out loud. Sparky follows along, cheers you on, and helps with tricky words.</div>
      <div class="sh-stats"><span><b>${done}</b> book${done===1?'':'s'} read</span><span><b>${r.words}</b> words read aloud</span><span><b>${fmtTime(r.sec)}</b> reading</span></div></div></div>
    <div class="chips">${[1,2,3].map(l=>`<button class="chip${l===lv?' on':''}" style="${l===lv?`background:${BOOK_LEVELS[l].color};border-color:${BOOK_LEVELS[l].color}`:''}" onclick="_shelfLevel=${l};renderTab()">${BOOK_LEVELS[l].label} <b>${BOOK_LEVELS[l].grades}</b>${l===myLevel()?' · your level':''}</button>`).join('')}</div>
    <div class="shelf">${STORIES.filter(b=>b.level===lv).map(bookCard).join('')}</div>
    <div class="sec-title">Reading games</div>
    <button class="rec swap-card" onclick="launchGame('detective')"><span class="tool-ic" style="background:#EDE4FF;color:#6D28D9">${ic('search')}</span>
      <span class="rec-txt"><span class="rec-n">Detective Case Files</span><span class="rec-s">Read the clues, solve the case, then prove it.</span></span>
      <span class="rec-go" style="background:#6D28D9">Play</span></button>
    <button class="rec swap-card" onclick="startSwap()"><span class="swap-tiles"><i>c</i><i class="hi">a</i><i>t</i></span>
      <span class="rec-txt"><span class="rec-n">Sound Swap</span><span class="rec-s">Change one letter to make a new word. Cat → cut → cub!</span></span>
      <span class="rec-go" style="background:#7E4BC9">Play</span></button>
    <div class="sec-title">My stickers · ${stickers.length}/${STORIES.length}</div>
    <div class="sticker-book">${STORIES.map(b=>r.books[b.id]?`<div class="sticker" title="${esc(b.title)}"><svg viewBox="${STICKER_VB[b.sticker]}">${PROPS[b.sticker]({})}</svg></div>`:`<div class="sticker empty-st">?</div>`).join('')}</div>
    <p class="muted" style="margin-top:12px">Finish a book to earn its sticker.</p>`;
}

// ── the reader ──
function openBook(id,page){
  const b=bookById(id);if(!b)return renderDash();
  READ.book=b;READ.page=page||0;READ.started=Date.now();READ.helpedWords=[];READ.wordsRead=0;READ.pagesHeard=0;READ.fluW=0;READ.fluS=0;READ.wcpm=0;READ.wcpmPrev=0;
  setScreen(`<div class="screen active reader-screen">
    <div class="topbar rd-top" style="background:${BOOK_LEVELS[b.level].color}">
      <button class="tb-back" onclick="closeBook()" aria-label="Back to bookshelf">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">${b.title}</div><div class="tb-sub" style="color:#fff" id="rPageNo"></div></div>
      <div class="rd-size" role="group" aria-label="Text size"><button onclick="textSize(-1)" aria-label="Smaller text">A−</button><button onclick="textSize(1)" aria-label="Bigger text">A+</button></div>
    </div>
    <div class="reader">
      <div class="rd-scene" id="rScene"></div>
      <div class="rd-text" id="rText"></div>
      <div class="rd-def" id="rDef" hidden></div>
      <div class="rd-bar">
        <div class="rd-sparky"><span id="rMascot">${mascot(64,'happy')}</span><div class="rd-bubble" id="rBubble" aria-live="polite"></div></div>
        <div class="rd-ctrls">
          <button class="nav-btn" onclick="turnPage(-1)" id="prevBtn" aria-label="Previous page">‹</button>
          <button class="tts-btn" id="ttsBtn" onclick="readToMe()" aria-label="Read the page to me">${ic('speaker')}<span>Read to me</span></button>
          <button class="mic-btn" id="micBtn" onclick="micToggle()" aria-pressed="false"><span class="mic-ic">🎤</span><span class="mic-l">Read to Sparky</span></button>
          <button class="nav-btn next" onclick="turnPage(1)" id="nextBtn2" aria-label="Next page">›</button>
        </div>
      </div>
    </div></div>`);
  applyTextPrefs();drawPage();narrLoad(b.id);
  sparkySays(canListen()?'Tap the microphone and read the page out loud. I’ll follow along!':'Read the page out loud, then tap › for the next page. Tap Read to me to hear it first.','wave');
  _tick=setInterval(readerTick,500);
}
function closeBook(){spendReading();micStop(true);stopTalking();renderDash();switchTab('stories');}
function spendReading(){if(!READ.started)return;const sec=Math.min(3600,(Date.now()-READ.started)/1000);READ.started=Date.now();
  const r=rstate();r.sec+=sec;const d=dayRec();d.rsec=(d.rsec||0)+sec;save();}
function textSize(d){ST.settings.readSize=Math.max(0,Math.min(4,(ST.settings.readSize??1)+d));save();applyTextPrefs();}
function applyTextPrefs(){const el=document.getElementById('rText');if(!el)return;const lvl=READ.book?READ.book.level:2;
  const base=[1.55,1.3,1.18][lvl-1];const mult=[.82,1,1.18,1.36,1.56][ST.settings.readSize??1];
  el.style.fontSize=(base*mult).toFixed(2)+'rem';el.classList.toggle('wide',!!ST.settings.readWide);}
function drawPage(){
  const b=READ.book,p=b.pages[READ.page];stopTalking();
  document.getElementById('rScene').innerHTML=scene(p.art,p.alt);
  document.getElementById('rPageNo').textContent=`Page ${READ.page+1} of ${b.pages.length} · ${BOOK_LEVELS[b.level].label}`;
  const names=new Set((b.names||[]).map(normW));const gl=b.words||{};
  const toks=[];const exp=[];let html='';
  p.t.forEach((sent,si)=>{html+='<span class="sent">';sent.split(/\s+/).forEach(word=>{
      const k=toks.length;const subs=word.split(/[-–—]+/).map(normW).filter(Boolean).flatMap(s=>/^\d+$/.test(s)&&+s<1000?numWords(s):[s]);
      const free=!subs.length||subs.every(s=>names.has(s));const key=normW(word.replace(/[’']s$/,''));
      toks.push({text:word,subs,free,si,gloss:gl[key]?key:null});
      subs.forEach(s=>exp.push({w:s,tok:k,free:names.has(s)}));if(!subs.length)exp.push({w:'',tok:k,free:true});
      html+=`<button class="w${gl[key]?' gl':''}" data-k="${k}" onclick="tapWord(${k})">${esc(word)}</button> `;});html+='</span> ';});
  document.getElementById('rText').innerHTML=html;
  Object.assign(READ,{toks,exp,status:new Array(exp.length).fill(0),cur:0,forced:0,forcedSpoken:0,base:READ.heard.length,
    drop:READ.partial?1:0,partial:'',lastProgress:Date.now(),stuckAt:0,helpedAt:0,pageDone:false,pageWordsCounted:false,pageT0:0,pageHelped:0});
  const r0=alignWords(exp,[],0,READ.status);READ.status=r0.st;READ.cur=r0.cur;READ.forced=r0.cur;
  document.getElementById('rDef').hidden=true;
  document.getElementById('prevBtn').disabled=READ.page===0;
  paintWords();
}
function heardChanged(){
  if(!READ.exp||READ.pageDone||!READ.want)return;
  const said=spokenTokens(READ.heard.slice(READ.base).join(' ')+' '+READ.partial);
  const res=alignWords(READ.exp,said.slice(READ.forcedSpoken),READ.forced,READ.status);
  if(res.cur>READ.cur){if(!READ.pageT0)READ.pageT0=Date.now();READ.lastProgress=Date.now();READ.stuckAt=0;READ.helpedAt=0;clearStuck();
    if(Math.random()<.18&&res.cur<READ.exp.length)sparkySays(pick(['Nice!','You’re doing great!','Keep going!','Great reading!','Wow, smooth reading!']),'happy');}
  READ.status=res.st;READ.cur=res.cur;paintWords();
  if(READ.cur>=READ.exp.length)pageComplete(true);
}
function tokState(k){const idx=READ.exp.map((e,i)=>e.tok===k?i:-1).filter(i=>i>=0);const s=idx.map(i=>READ.status[i]);
  if(s.every(x=>x===1))return 'done';if(s.every(x=>x>0))return 'skip';return '';}
function paintWords(){
  const nextTok=READ.cur<READ.exp.length?READ.exp[READ.cur].tok:-1;
  let lastReal=-1;READ.toks.forEach((t,k)=>{if(!t.free&&tokState(k)!=='')lastReal=k;});
  document.querySelectorAll('#rText .w').forEach(el=>{const k=+el.dataset.k;let s=tokState(k);
    if(READ.toks[k].free&&k>lastReal&&!READ.pageDone)s='';
    el.classList.toggle('done',s==='done');el.classList.toggle('skip',s==='skip');el.classList.toggle('next',READ.want&&k===nextTok);});
}
function clearStuck(){document.querySelectorAll('.w.stuck').forEach(x=>x.classList.remove('stuck'));}
function readerTick(){
  if(!READ.want||READ.pageDone||!READ.exp)return;
  const idle=Date.now()-READ.lastProgress;const k=READ.exp[READ.cur]&&READ.exp[READ.cur].tok;if(k===undefined)return;
  const el=document.querySelector(`.w[data-k="${k}"]`);
  if(idle>7000&&!READ.stuckAt){READ.stuckAt=Date.now();if(el)el.classList.add('stuck');
    sparkySays(READ.cur===0?'Start whenever you’re ready! Tap the glowing word if you want help.':'Try sounding it out, one part at a time. Tap the glowing word and I’ll help.','think');}
  else if(READ.stuckAt&&!READ.helpedAt&&Date.now()-READ.stuckAt>7000){helpWord(k);}
  else if(READ.helpedAt&&Date.now()-READ.helpedAt>6000){forcePast(k);}
}
function helpWord(k){
  const t=READ.toks[k];READ.helpedAt=Date.now();
  const w=t.subs.join(' ')||t.text;narrOrSay(READ.book.id,'w:'+normW(t.text),plain(t.text).replace(/[“”"]/g,''),.75);
  READ.pageHelped=(READ.pageHelped||0)+1;
  if(!t.free&&!READ.helpedWords.includes(w)){READ.helpedWords.push(w);const r=rstate();r.tricky[w]=(r.tricky[w]||0)+1;save();}
  sparkySays(`That word is “${t.text.replace(/[“”".,!?;:]/g,'')}”. Now you say it!`,'happy');
}
function forcePast(k){
  // the listener didn't catch it after help: move on so reading keeps flowing
  const said=spokenTokens(READ.heard.slice(READ.base).join(' ')+' '+READ.partial);
  READ.exp.forEach((e,i)=>{if(e.tok===k)READ.status[i]=1;});
  let last=-1;READ.exp.forEach((e,i)=>{if(e.tok===k)last=i;});
  READ.forced=last+1;READ.forcedSpoken=said.length;READ.cur=READ.forced;
  READ.lastProgress=Date.now();READ.stuckAt=0;READ.helpedAt=0;clearStuck();paintWords();
  if(READ.cur>=READ.exp.length)pageComplete(true);else sparkySays('Let’s keep going!','happy');
}
function tapWord(k){
  const t=READ.toks[k];if(!t)return;
  if(READ.want&&!t.free&&READ.exp[READ.cur]&&READ.exp[READ.cur].tok===k){helpWord(k);}
  else narrOrSay(READ.book.id,'w:'+normW(t.text),t.text.replace(/[“”"]/g,''),.75);
  const box=document.getElementById('rDef');
  if(t.gloss){box.hidden=false;box.innerHTML=`<b>${esc(t.gloss)}</b> means ${esc(READ.book.words[t.gloss])}. <button class="speak-mini" data-w="${esc(t.gloss+' means '+READ.book.words[t.gloss])}" onclick="narrOrSay(READ.book.id,'g:${t.gloss}',this.dataset.w,.85)" aria-label="Read the meaning">🔊</button>`;}
  else box.hidden=true;
}
function pageComplete(byVoice){
  if(READ.pageDone)return;READ.pageDone=true;clearStuck();
  if(byVoice&&!READ.pageWordsCounted){READ.pageWordsCounted=true;READ.pagesHeard++;
    const n=READ.toks.filter((t,k)=>!t.free&&tokState(k)==='done').length;READ.wordsRead+=n;const r=rstate();r.words+=n;addXP(2,0);
    const sec=READ.pageT0?(Date.now()-READ.pageT0)/1000:0;if(sec>=2){READ.fluW+=Math.max(0,n-READ.pageHelped);READ.fluS+=sec;}}
  FX.correct();
  const last=READ.page>=READ.book.pages.length-1;
  sparkySays(last?'You read the whole story!':pick(['Great reading!','You did it! On to the next page.','Wonderful! Turning the page…']),'cheer');
  document.querySelectorAll('#rText .w').forEach(el=>el.classList.add('done'));
  setTimeout(()=>{if(!document.getElementById('rText')||READ.page!==READ.pageAt)return;turnPage(1);},1500);READ.pageAt=READ.page;
}
function turnPage(d){
  const b=READ.book;const np=READ.page+d;
  if(np<0)return;
  if(np>=b.pages.length){spendReading();micStop(true);stopTalking();return startBookQuiz();}
  READ.page=np;drawPage();
  if(READ.want)sparkySays(pick(['Ready for the next page!','I’m still listening. Go ahead!','New page — you’ve got this!']),'happy');
}

// ── after the story: questions + "find the proof" ──
function startBookQuiz(){
  READ.qi=0;READ.qC=0;READ.proofC=0;READ.qN=READ.book.qs.length;quizQuestion();
}
function quizShell(inner){
  const b=READ.book;const col=BOOK_LEVELS[b.level].color;
  setScreen(`<div class="screen active">
    <div class="topbar calm" style="--acc:${col}"><button class="tb-back" onclick="closeBook()" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">Think about the story</div><div class="tb-sub" style="color:rgba(255,255,255,.92)">${b.title} · Question ${READ.qi+1} of ${READ.qN}</div></div></div>
    <div class="act-body" id="qBody">${inner}</div></div>`);
}
function quizQuestion(){
  const q=READ.book.qs[READ.qi];READ.qAnswered=false;READ.order=shuf(q.o.slice());
  quizShell(`<div class="qc">
    <div class="q-top"><span class="q-badge" style="background:#9B5DE518;color:#6D28D9">${q.kind}</span>
    <button class="speak-mini" onclick="quizSpeak()" aria-label="Read the question to me">${ic('speaker')}</button></div>
    <div class="q-text">${esc(q.q)}</div><div class="hintbox" id="hintBox">${ic('bulb')} ${esc(q.hint)}</div>
    <div class="opts" id="opts">${READ.order.map((o,i)=>`<button class="opt" data-i="${i}" onclick="quizPick(${i})"><span class="opt-l">${'ABCDEF'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div></div>
    <div id="fbCard"></div>
    <div class="btns" id="actBtns"><button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button>
      <button class="btn btn-sec" onclick="peekStory()">${ic('book')} Look back at the story</button></div>`);
}
function peekStory(){
  const b=READ.book;const box=document.getElementById('fbCard');
  box.className='fb2 info';box.innerHTML=`<div class="fb2-h">The story</div>`+b.pages.map((p,i)=>`<p class="peek"><b>Page ${i+1}.</b> ${p.t.map(esc).join(' ')}</p>`).join('');
}
function quizSpeak(){const q=READ.book.qs[READ.qi];const keys=['q'+READ.qi].concat(READ.order.map(o=>'q'+READ.qi+'o'+q.o.indexOf(o)));
  if(!keys.every(k=>narrOK(READ.book.id,k))){sayText(q.q+' '+READ.order.join('. '),.88);return;}
  narrSeq(READ.book.id,keys).then(ok=>{if(!ok)sayText(q.q+' '+READ.order.join('. '),.88);});}
function quizPick(i){
  if(READ.qAnswered)return;READ.qAnswered=true;const q=READ.book.qs[READ.qi];const ok=READ.order[i]===q.a;
  document.querySelectorAll('#opts .opt').forEach(btn=>{btn.disabled=true;const bi=+btn.dataset.i;
    if(READ.order[bi]===q.a)btn.classList.add('correct');else if(bi===i)btn.classList.add('wrong');else btn.classList.add('faded');});
  const r=rstate();r.qN++;if(ok){r.qC++;READ.qC++;ST.xp+=5;FX.correct();}else FX.wrong();
  ST.totalQ++;if(ok)ST.totalC++;const d=dayRec();d.q++;if(ok)d.c++;
  ST.streak=ok?ST.streak+1:0;ST.bestStreak=Math.max(ST.bestStreak||0,ST.streak);
  const fb=document.getElementById('fbCard');
  fb.className='fb2 '+(ok?'ok':'err');
  fb.innerHTML=ok?`<div class="fb2-h">Yes! Now find the proof.</div><div class="fb2-b">Tap the sentence in the story that shows the answer.</div>`
    :`<div class="fb2-h">Good try! The answer is “${esc(q.a)}”.</div><div class="fb2-b">Let’s find the sentence in the story that shows it.</div>`;
  proofStep();save();checkAch();
}
function proofStep(){
  const b=READ.book;READ.proofTries=0;
  const list=document.createElement('div');list.className='proof qc';list.id='proofList';
  list.innerHTML=`<div class="les-k" style="color:#6D28D9">🔎 Find the proof</div>`+b.pages.map((p,pi)=>`<div class="proof-pg"><span class="proof-n">Page ${pi+1}</span>${p.t.map((s,si)=>`<button class="proof-s" data-p="${pi}" data-s="${si}" onclick="proofPick(this)">${esc(s)}</button>`).join('')}</div>`).join('');
  document.getElementById('qBody').insertBefore(list,document.getElementById('actBtns'));
  document.getElementById('actBtns').innerHTML='';
  list.scrollIntoView&&list.scrollIntoView({behavior:'smooth',block:'start'});
}
function proofPick(btn){
  const q=READ.book.qs[READ.qi];const p=+btn.dataset.p,s=+btn.dataset.s;
  const ok=q.ev.some(e=>e[0]===p&&e[1]===s);READ.proofTries++;
  const r=rstate();
  if(ok){btn.classList.add('ok');if(READ.proofTries===1){READ.proofC++;r.proofC++;ST.xp+=3;}r.proofN++;FX.correct();
    document.querySelectorAll('.proof-s').forEach(b=>b.disabled=true);
    const fb=document.getElementById('fbCard');fb.className='fb2 ok';
    fb.innerHTML=`<div class="fb2-h">🔎 That’s the proof!</div><div class="fb2-b">${esc(q.why)}</div>`;
    proofDone();}
  else{btn.classList.add('no');btn.disabled=true;FX.wrong();
    if(READ.proofTries>=2){r.proofN++;q.ev.forEach(e=>{const el=document.querySelector(`.proof-s[data-p="${e[0]}"][data-s="${e[1]}"]`);if(el)el.classList.add('ok');});
      document.querySelectorAll('.proof-s').forEach(b=>b.disabled=true);
      const fb=document.getElementById('fbCard');fb.className='fb2 info';
      fb.innerHTML=`<div class="fb2-h">Here’s the proof, in green.</div><div class="fb2-b">${esc(q.why)}</div>`;proofDone();}
    else{const fb=document.getElementById('fbCard');fb.className='fb2 err';fb.innerHTML=`<div class="fb2-h">Not that one — try again.</div><div class="fb2-b">${ic('bulb')} ${esc(q.hint)}</div>`;}}
  save();
}
function proofDone(){
  const last=READ.qi>=READ.qN-1;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:${BOOK_LEVELS[READ.book.level].color}" onclick="${last?'finishBook()':'READ.qi++;quizQuestion()'}">${last?'See my sticker':'Next question'}</button>`;
  document.getElementById('fbCard').scrollIntoView&&document.getElementById('fbCard').scrollIntoView({behavior:'smooth',block:'center'});
}
function finishBook(){
  const b=READ.book;const r=rstate();
  const need=Math.ceil(READ.qN*2/3);
  const stars=1+(READ.qC>=need?1:0)+(READ.proofC>=need?1:0);
  const prev=r.books[b.id];const first=!prev;
  r.books[b.id]={done:(prev?prev.done:0)+1,stars:Math.max(stars,prev?prev.stars:0),last:Date.now(),qC:READ.qC,qN:READ.qN};
  if(READ.fluS>=10&&READ.fluW>=20){READ.wcpm=Math.round(READ.fluW/READ.fluS*60);const fl=r.fluency=r.fluency||[];READ.wcpmPrev=fl.length?fl[fl.length-1].wcpm:0;
    fl.push({d:Date.now(),wcpm:READ.wcpm,book:b.id,level:b.level});if(fl.length>60)fl.shift();}
  addXP(first?30:10,stars);FX.win();confetti(window.innerWidth/2,140,70);
  const tricky=READ.helpedWords;
  setScreen(`<div class="screen active">
    <div class="topbar calm" style="--acc:${BOOK_LEVELS[b.level].color}"><div class="tb-user"><div class="tb-name" style="color:#fff">You finished the book!</div></div></div>
    <div class="act-body"><div class="qc mastery">
      <div class="sticker big-st"><svg viewBox="${STICKER_VB[b.sticker]}">${PROPS[b.sticker]({})}</svg></div>
      <div class="m-t">${first?'New sticker!':'Great reading!'}</div>
      <div class="m-s">${b.title}</div>
      <div class="big-stars" aria-label="${stars} of 3 stars">${starStr(stars)}</div>
      <div class="sum-grid">
        <div><b>${READ.wordsRead}</b><span>words read aloud</span></div><div><b>${READ.qC}/${READ.qN}</b><span>questions right</span></div>
        <div><b>${READ.proofC}/${READ.qN}</b><span>proofs found</span></div><div><b>${READ.pagesHeard}/${b.pages.length}</b><span>pages Sparky heard</span></div></div>
      ${tricky.length?`<div class="tricky"><div class="les-k" style="color:#6D28D9">Words to practice</div>${tricky.map(w=>`<button class="tw" data-w="${esc(w)}" onclick="narrOrSay('${b.id}','w:'+this.dataset.w,this.dataset.w,.75)">🔊 ${esc(w)}</button>`).join('')}</div>`:''}
      <p class="m-d">${stars===3?'Three stars! You read it and proved your answers.':'Read it again any time to earn more stars.'}</p>
      ${READ.wcpm?`<div class="flu">📈 Reading speed: <b>${READ.wcpm}</b> words per minute${READ.wcpmPrev?` (last time ${READ.wcpmPrev})`:''}</div>`:''}
      <div class="btns"><button class="btn btn-sec" onclick="showCertificate('Book Finished: ${esc(b.title).replace(/'/g,"\\'")}','read the whole book out loud and earned ${stars} star${stars===1?'':'s'}')">🎓 Certificate</button><button class="btn btn-sec" onclick="openBook('${b.id}')">Read again</button>
      <button class="btn btn-pri" style="background:${BOOK_LEVELS[b.level].color}" onclick="renderDash();switchTab('stories')">More books</button></div>
    </div></div></div>`);
  checkAch();save();
}

// ── Sound Swap ──
const SWAP={};
function startSwap(){
  const lv=Math.min(myLevel(),2);Object.assign(SWAP,{lv,items:shuf(SWAPS[lv].map((s,i)=>s.concat([i]))).slice(0,8),i:0,c:0});narrLoad('swap');swapRound();
}
function swapRound(){
  const it=SWAP.items[SWAP.i];const [w,idx,nl,ans,x1,x2]=it;SWAP.opts=shuf([ans,x1,x2]);SWAP.done=false;
  setScreen(`<div class="screen active">
    <div class="topbar calm" style="--acc:#9B5DE5"><button class="tb-back" onclick="renderDash();switchTab('stories')" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">Sound Swap</div><div class="tb-sub" style="color:rgba(255,255,255,.92)">Word ${SWAP.i+1} of ${SWAP.items.length} · ${SWAP.c} right</div></div></div>
    <div class="act-body"><div class="qc swap">
      <div class="swap-say">Read the word:</div>
      <div class="tiles" id="tiles">${w.split('').map((ch,i)=>`<span class="tile${i===idx?' hi':''}">${ch}</span>`).join('')}</div>
      <div class="q-text" style="text-align:center">Change <b class="lt">${w[idx]}</b> to <b class="lt new">${nl}</b>. What word do you make?</div>
      <button class="btn btn-sec speak" onclick="narrOrSay('swap','s${SWAP.lv}:${it[6]}','${w}. Change ${w[idx]} to ${nl}.',.8)">${ic('speaker')} Hear it</button>
      <div class="opts swap-opts" id="opts">${SWAP.opts.map((o,i)=>`<button class="opt" data-i="${i}" onclick="swapPick(${i})"><span>${o}</span></button>`).join('')}</div></div>
      <div id="fbCard"></div><div class="btns" id="actBtns"></div></div></div>`);
}
function swapPick(i){
  if(SWAP.done)return;SWAP.done=true;const it=SWAP.items[SWAP.i];const ok=SWAP.opts[i]===it[3];
  document.querySelectorAll('#opts .opt').forEach(b=>{b.disabled=true;const bi=+b.dataset.i;
    if(SWAP.opts[bi]===it[3])b.classList.add('correct');else if(bi===i)b.classList.add('wrong');else b.classList.add('faded');});
  const t=document.querySelectorAll('#tiles .tile')[it[1]];if(t){t.textContent=it[2];t.classList.add('swapped');}
  const r=rstate();r.swapN++;if(ok){r.swapC++;SWAP.c++;ST.xp+=2;FX.correct();}else FX.wrong();
  narrOrSay('swap','sw:'+it[3],it[3],.8);
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');
  fb.innerHTML=ok?`<div class="fb2-h">Yes — ${esc(it[0])} becomes ${esc(it[3])}!</div>`:`<div class="fb2-h">Look at the tiles: ${esc(it[0])} becomes ${esc(it[3])}.</div><div class="fb2-b">Only one letter changed. Read the new word slowly.</div>`;
  const last=SWAP.i>=SWAP.items.length-1;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#9B5DE5" onclick="${last?'swapEnd()':'SWAP.i++;swapRound()'}">${last?'Finish':'Next word'}</button>`;
  save();
}
function swapEnd(){
  addXP(5,SWAP.c>=6?2:0);FX.win();
  setScreen(`<div class="screen active"><div class="topbar calm" style="--acc:#9B5DE5"><div class="tb-user"><div class="tb-name" style="color:#fff">Sound Swap</div></div></div>
    <div class="act-body"><div class="qc mastery"><div class="mastery-art">${mascot(96,'cheer')}</div>
    <div class="m-t">${SWAP.c} of ${SWAP.items.length} words!</div><p class="m-d">Changing one sound makes a whole new word. Great ears and eyes!</p>
    <div class="btns"><button class="btn btn-sec" onclick="startSwap()">Play again</button><button class="btn btn-pri" style="background:#9B5DE5" onclick="renderDash();switchTab('stories')">Back to stories</button></div></div></div></div>`);
}





