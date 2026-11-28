// ═══════════════════════════════════════════════════════════════
// NARRATION & VOICES
// • Recorded natural AI narration (Kokoro TTS, generated ahead of time) for
//   Story Time, lessons, Sound Swap and Detective cases, played with Web Audio
//   from one "sprite" file per book. Works offline once cached.
// • Everything else (practice questions) uses the best voice available:
//   a Claude voice inside claude.ai, otherwise the device's most natural voice.
// ═══════════════════════════════════════════════════════════════
// One recorded map per narrator; the chosen one is AUDIO_MAP.
const AUDIO_VOICES=/*@audio-map*/;
const NARRATORS={heart:'Ava · American (recommended)',emma:'Emma · British',warm:'Grace · warm American'};
let AUDIO_MAP=AUDIO_VOICES.heart?AUDIO_VOICES.heart:AUDIO_VOICES;
let NARR_VOICE='heart';
function narrVoiceSync(){
  const v=(typeof ST!=='undefined'&&ST.settings&&ST.settings.narrator)||'heart';
  if(v===NARR_VOICE||!AUDIO_VOICES[v])return;
  NARR_VOICE=v;AUDIO_MAP=v==='heart'?AUDIO_VOICES[v]:Object.assign({},AUDIO_VOICES.heart||{},AUDIO_VOICES[v]);NARR.bufs={};NARR.loading={};}   // anything not yet recorded in this voice falls back to Ava
const NARR={ctx:null,bufs:{},loading:{},src:null,timer:null,token:0};
function narrCtx(){if(!NARR.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{NARR.ctx=new C();}catch(e){return null;}}return NARR.ctx;}
// iPhone: play sound even when the ring/silent switch is on, and unlock audio inside the first tap.
const AUDIO_UNLOCK={done:false};
function audioPlayback(){try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback';}catch(e){}}
audioPlayback();
function audioUnlock(){audioPlayback();
  try{const c=narrCtx();if(c){if(c.state!=='running')c.resume();
    if(!AUDIO_UNLOCK.done){const b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0);}}}catch(e){}
  if(!AUDIO_UNLOCK.done){AUDIO_UNLOCK.done=true;
    try{const a=new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAACAAAA/oAR0dHR0dHR0dHR0dHYmJiYmJiYmJiYmJifHx8fHx8fHx8fHx8fJaWlpaWlpaWlpaWlrGxsbGxsbGxsbGxsbHLy8vLy8vLy8vLy8vl5eXl5eXl5eXl5eXl////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQC1AAAAAAAAAP6yysejgAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==');a.setAttribute('playsinline','');a.volume=0.01;a.play().catch(()=>{});}catch(e){}}}
['touchend','pointerup','click','keydown'].forEach(ev=>document.addEventListener(ev,audioUnlock,{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden){try{narrStop();}catch(e){}}});
function narrOK(name,key){narrVoiceSync();return typeof AUDIO_MAP!=='undefined'&&location.protocol!=='file:'&&ST.settings.narration!==false&&!!AUDIO_MAP[name]&&(!key||!!AUDIO_MAP[name].map[key]);}
function narrLoad(name){
  if(!narrOK(name)||!narrCtx()||typeof fetch!=='function')return Promise.resolve(null);
  if(NARR.bufs[name])return Promise.resolve(NARR.bufs[name]);
  if(!NARR.loading[name])NARR.loading[name]=fetch(AUDIO_MAP[name].f).then(r=>r.ok?r.arrayBuffer():null)
    .then(ab=>ab?new Promise((res,rej)=>NARR.ctx.decodeAudioData(ab,res,rej)):null).then(b=>{NARR.bufs[name]=b;return b;})
    .catch(()=>{delete NARR.loading[name];return null;});
  return NARR.loading[name];
}
function narrStop(){NARR.token++;if(NARR.src){try{NARR.src.onended=null;NARR.src.stop();}catch(e){}NARR.src=null;}if(NARR.timer){clearInterval(NARR.timer);NARR.timer=null;}}
// Play one clip. Resolves true when it started (false = not available, so use a voice instead).
function narrPlay(name,key,opt){
  opt=opt||{};if(!narrOK(name,key))return Promise.resolve(false);
  const ctx=narrCtx();if(!ctx)return Promise.resolve(false);
  try{if(ctx.state!=='running')ctx.resume();}catch(e){}   // must run inside the tap, for iPad/iPhone
  narrStop();try{speechSynthesis.cancel();}catch(e){}if(CLAUDE_TTS){try{CLAUDE_TTS.stop();}catch(e){}}
  const tok=NARR.token;
  return narrLoad(name).then(buf=>{
    if(!buf||tok!==NARR.token)return false;
    const A=AUDIO_MAP[name],ent=A.map[key],off=A.off||0;
    const s=Math.max(0,ent.s+off-0.02),e=Math.min(buf.duration,ent.e+off+0.12);
    const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);
    const t0=ctx.currentTime;src.start(0,s,e-s);NARR.src=src;
    if(opt.onTick)NARR.timer=setInterval(()=>{if(NARR.src===src)opt.onTick(ctx.currentTime-t0-0.02);},50);
    src.onended=()=>{if(NARR.src!==src)return;NARR.src=null;if(NARR.timer){clearInterval(NARR.timer);NARR.timer=null;}opt.onEnd&&opt.onEnd();};
    return true;
  });
}
// Play several clips in a row (a question, then its answer choices).
function narrSeq(name,keys,onEnd){
  if(!keys.every(k=>narrOK(name,k)))return Promise.resolve(false);
  let i=0;const tok0=NARR.token+1;
  const next=()=>{if(i>=keys.length){onEnd&&onEnd();return;}
    narrPlay(name,keys[i++],{onEnd:()=>{if(NARR.token===tok0+i-1)setTimeout(next,220);}});};
  return narrLoad(name).then(b=>{if(!b)return false;next();return true;});
}
function lessonSprite(g){for(const n of ['lessons1','lessons2','lessons'])if(narrOK(n,'L:'+g))return n;return 'lessons1';}
// A recorded clip if there is one, otherwise a live voice.
function narrOrSay(name,key,text,rate){
  // no recording: speak right away, inside the tap (iPad/iPhone need that)
  if(!narrOK(name,key)||!narrCtx()||typeof fetch!=='function'){sayText(text,rate||.88);return;}
  narrPlay(name,key).then(ok=>{if(!ok)sayText(text,rate||.88);});}

// ── live voices for everything that isn't recorded ──
let CLAUDE_TTS=null;
(async()=>{try{if(window.claude&&window.claude.use)CLAUDE_TTS=await window.claude.use('tts');}catch(e){CLAUDE_TTS=null;}})();
const CLAUDE_VOICES={airy:'Airy',buttery:'Buttery',glassy:'Glassy',rounded:'Rounded'};
function voiceScore(v){
  const n=v.name||'';if(!/^en/i.test(v.lang||''))return -999;let s=/^en[-_]US/i.test(v.lang)?10:5;
  if(/natural|neural|online/i.test(n))s+=60;if(/premium|enhanced/i.test(n))s+=45;if(/^Google (US|UK) English/i.test(n))s+=40;
  if(/Samantha|Ava|Allison|Aria|Jenny|Michelle|Emma|Ana\b|Zoe|Nicky|Libby|Sonia/i.test(n))s+=15;
  if(/compact|eSpeak|Fred|Albert|Bad News|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Ralph|Kathy|Princess|Grandma|Grandpa|Rocko|Shelley|Sandy|Reed|Eddy|Flo\b/i.test(n))s-=80;
  return s;
}
function bestVoices(){try{return speechSynthesis.getVoices().map(v=>[voiceScore(v),v]).filter(x=>x[0]>-50).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);}catch(e){return [];}}
function niceVoice(){const p=ST.settings&&ST.settings.voicePick||'';const vs=bestVoices();
  return (p.startsWith('dev:')&&vs.find(v=>v.name===p.slice(4)))||vs[0]||null;}
function useClaudeVoice(){const p=ST.settings&&ST.settings.voicePick||'';return !!CLAUDE_TTS&&!p.startsWith('dev:');}
function voiceRate(r){return (r||.9)*(ST.settings&&ST.settings.slowVoice?.85:1);}
// replaces the earlier simple version: same arguments
sayText=function(text,rate,onEnd,onWord){
  text=String(text||'').replace(/[“”"]/g,'');narrStop();
  if(useClaudeVoice()&&!onWord){
    try{speechSynthesis.cancel();}catch(e){}
    const v=(ST.settings.voicePick||'claude:airy').replace('claude:','');
    CLAUDE_TTS.speak(text,{voice:CLAUDE_VOICES[v]?v:'airy',rate:Math.max(.7,Math.min(1.5,voiceRate(rate)/.9)),language:'en'})
      .then(()=>onEnd&&onEnd()).catch(()=>{onEnd&&onEnd();});
    return null;
  }
  if(typeof speechSynthesis==='undefined'){onEnd&&onEnd();return null;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);const v=niceVoice();if(v){u.voice=v;u.lang=v.lang;}else u.lang='en-US';
    u.rate=voiceRate(rate);u.pitch=1.02;
    if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name===undefined)onWord(e.charIndex);};
    u.onend=()=>onEnd&&onEnd();u.onerror=()=>onEnd&&onEnd();speechSynthesis.speak(u);return u;}catch(e){onEnd&&onEnd();return null;}
};
speak=function(text){if(!voiceOK()&&!useClaudeVoice())return;sayText(String(text).replace(/−/g,' minus ').replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/___/g,' blank '),.92);};
const _stopTalkingBase=stopTalking;
stopTalking=function(){narrStop();if(CLAUDE_TTS){try{CLAUDE_TTS.stop();}catch(e){}}_stopTalkingBase();};
voiceOK=function(){return ST.settings&&ST.settings.readAloud!==false&&(typeof window.speechSynthesis!=='undefined'||!!CLAUDE_TTS);};

// ── settings: choose the voice ──
function voiceSettingsRows(){
  const pick=ST.settings.voicePick||'';const dev=bestVoices().slice(0,10);
  const opts=(CLAUDE_TTS?Object.entries(CLAUDE_VOICES).map(([k,l])=>`<option value="claude:${k}" ${pick==='claude:'+k||(!pick&&k==='airy')?'selected':''}>Claude voice · ${l}</option>`).join(''):'')+
    dev.map((v,i)=>`<option value="dev:${esc(v.name)}" ${pick==='dev:'+v.name||(!pick&&!CLAUDE_TTS&&i===0)?'selected':''}>${esc(v.name.replace(/Microsoft |Google /,''))}${i===0?' (recommended)':''}</option>`).join('');
  return `<div class="set-row"><div><b>Story narrator</b><small>${typeof AUDIO_MAP!=='undefined'&&location.protocol!=='file:'?'Recorded voice for books, lessons and reading games':'Recorded voice plays when LearnSpark is opened from its web address'}</small></div>
      <button class="toggle ${ST.settings.narration!==false?'on':''}" onclick="ST.settings.narration=ST.settings.narration===false?true:false;save();this.classList.toggle('on',ST.settings.narration!==false)"></button></div>
    ${Object.keys(AUDIO_VOICES).filter(k=>NARRATORS[k]).length>1?`<div class="set-row voice-row"><div><b>Who reads the stories</b><small>Pick the reader your child likes best</small></div>
      <div class="voice-pick"><select id="narrSel" aria-label="Story reader" onchange="ST.settings.narrator=this.value;save();narrStop()">${Object.keys(NARRATORS).filter(k=>AUDIO_VOICES[k]).map(k=>`<option value="${k}" ${(ST.settings.narrator||'heart')===k?'selected':''}>${NARRATORS[k]}</option>`).join('')}</select>
      <button class="btn btn-sec" onclick="narrPlay('pip','p0')">▶ Test</button></div></div>`:''}
    <div class="set-row voice-row"><div><b>Voice for questions</b><small>Used for everything that isn’t recorded</small></div>
      <div class="voice-pick">${opts?`<select id="voiceSel" onchange="ST.settings.voicePick=this.value;save()" aria-label="Voice">${opts}</select>`:'<small>No voices found on this device</small>'}
      <button class="btn btn-sec" onclick="sayText('Hi! I am Sparky. Let us read together!',.9)">▶ Test</button></div></div>
    <div class="set-row"><div><b>Slower voice</b><small>Speak a little more slowly</small></div>
      <button class="toggle ${ST.settings.slowVoice?'on':''}" onclick="toggleSet('slowVoice',this)"></button></div>`;
}
try{if(typeof speechSynthesis!=='undefined')speechSynthesis.onvoiceschanged=()=>{const s=document.getElementById('voiceSel');if(s&&document.getElementById('sheet')){closeSheet();openSettings();}};}catch(e){}

// ═══════════════ BOOT (runs last, after games are defined) ═══════════════
// ── BOOT ──

