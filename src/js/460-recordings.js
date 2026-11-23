// ── Hear yourself read: save reading recordings on this device (opt-in), play them in the Parent Report ──
const REC_MAX=40;
const REC={db:null,stream:null,mr:null,chunks:[],book:null,page:null,t0:0};
function recSupported(){return !!(window.MediaRecorder&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.indexedDB);}
function recOn(){return !!(ST.settings&&ST.settings.recOK)&&recSupported()&&storeGet('ls_rec_conflict')!=='1';}
function recDB(){if(REC.db)return Promise.resolve(REC.db);
  return new Promise((res,rej)=>{const r=indexedDB.open('learnspark-rec',1);r.onupgradeneeded=()=>{const s=r.result.createObjectStore('clips',{keyPath:'id'});s.createIndex('pid','pid');};
    r.onsuccess=()=>{REC.db=r.result;res(REC.db);};r.onerror=()=>rej(r.error);});}
function recTx(mode){return recDB().then(db=>db.transaction('clips',mode).objectStore('clips'));}
function recAll(pid){return recTx('readonly').then(s=>new Promise(res=>{const out=[];const c=s.index('pid').openCursor(IDBKeyRange.only(pid));
  c.onsuccess=()=>{const cur=c.result;if(cur){out.push(cur.value);cur.continue();}else res(out.sort((a,b)=>b.at-a.at));};c.onerror=()=>res([]);}));}
function recDel(id){return recTx('readwrite').then(s=>new Promise(res=>{const r=s.delete(id);r.onsuccess=r.onerror=()=>res();}));}
async function recPut(clip){const s=await recTx('readwrite');s.put(clip);
  const all=await recAll(clip.pid);for(const c of all.slice(REC_MAX))if(!c.keep)await recDel(c.id);}

async function recStart(){
  if(!recOn()||REC.mr||!READ.book)return;
  try{REC.stream=REC.stream||await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});}
  catch(e){return;}
  if(!READ.want){recRelease();return;}
  recSegment();
}
function recSegment(){
  try{const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(m=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m))||'';
    const mr=new MediaRecorder(REC.stream,mime?{mimeType:mime,audioBitsPerSecond:32000}:{});
    REC.chunks=[];REC.book=READ.book.id;REC.title=READ.book.title;REC.page=READ.page;REC.t0=Date.now();REC.mr=mr;
    const meta={book:REC.book,title:REC.title,page:REC.page,t0:REC.t0,pid:ST.id};
    mr.ondataavailable=e=>{if(e.data&&e.data.size)REC.chunks.push(e.data);};
    const chunks=REC.chunks;
    mr.onstop=()=>{const dur=(Date.now()-meta.t0)/1000;if(dur<2||!chunks.length)return;
      const blob=new Blob(chunks,{type:mr.mimeType||'audio/webm'});
      recPut({id:'r'+meta.t0.toString(36)+Math.floor(Math.random()*1e3),pid:meta.pid,book:meta.book,title:meta.title,page:meta.page,at:meta.t0,dur:Math.round(dur),mime:blob.type,blob}).catch(()=>{});};
    mr.start(1000);
  }catch(e){REC.mr=null;}
}
function recStopSeg(){if(REC.mr){try{REC.mr.stop();}catch(e){}REC.mr=null;}}
function recRelease(){recStopSeg();if(REC.stream){REC.stream.getTracks().forEach(t=>t.stop());REC.stream=null;}}
function recConflict(){storeSet('ls_rec_conflict','1');recRelease();}

// Hooks into Story Time
const _micToggleRec=micToggle;
micToggle=function(){const was=READ.want;_micToggleRec.apply(this,arguments);if(!was&&READ.want)setTimeout(recStart,400);};
const _micStopRec=micStop;
micStop=function(){recRelease();return _micStopRec.apply(this,arguments);};
const _drawPageRec=drawPage;
drawPage=function(){const before=READ.page;_drawPageRec.apply(this,arguments);if(REC.mr&&READ.page!==REC.page){recStopSeg();if(READ.want&&REC.stream)recSegment();}};
// If a recorder and the speech recognizer can't share the microphone on this device, stop recording for good here.
if(typeof NativeSR==='function'&&NativeSR.prototype&&NativeSR.prototype.start){const _st=NativeSR.prototype.start;
  NativeSR.prototype.start=function(){try{this.addEventListener('error',e=>{if(e.error==='audio-capture'&&REC.stream){recConflict();setTimeout(()=>{if(READ.want)startNative();},300);}});}catch(e){}return _st.apply(this,arguments);};}

// Consent text and settings
const _micConsentRec=micConsent;
micConsent=function(){_micConsentRec.apply(this,arguments);
  const p=document.querySelector('#sheet .muted');if(p)p.innerHTML=p.innerHTML.replace('LearnSpark keeps no recordings','LearnSpark keeps no recordings unless you choose to below');
  if(p&&recSupported())p.insertAdjacentHTML('afterend',`<label class="rec-opt"><input type="checkbox" id="recChk" ${ST.settings.recOK?'checked':''} onchange="ST.settings.recOK=this.checked;save()"> <span>Also save recordings of my child reading, <b>on this device only</b>, so I can listen in the Parent Report.</span></label>`);};
const _osRec=openSettings;
openSettings=function(){_osRec.apply(this,arguments);
  if(!recSupported())return;const rows=document.querySelectorAll('#sheet .set-row');const last=rows[rows.length-1];
  if(last)last.insertAdjacentHTML('afterend',`<div class="set-row"><div><b>Save reading recordings</b><small>Kept on this device only. Listen in the Parent Report.</small></div>
    <button class="toggle ${ST.settings.recOK?'on':''}" onclick="toggleSet('recOK',this)"></button></div>`);};

// Parent Report section
let REC_URLS=[];
const _rrRec=renderReport;
renderReport=function(){_rrRec.apply(this,arguments);
  const host=[...document.querySelectorAll('.report h2')].find(h=>/Story Time/.test(h.textContent));if(!host||!recSupported())return;
  const box=document.createElement('div');box.className='rep-box rec-box';box.id='recBox';
  const anchor=[...document.querySelectorAll('.report .rep-box')].find(b=>/Words Sparky helped with/.test(b.textContent))||host;
  anchor.after(box);recDraw();};
async function recDraw(){const box=document.getElementById('recBox');if(!box)return;
  REC_URLS.forEach(u=>URL.revokeObjectURL(u));REC_URLS=[];
  if(!ST.settings.recOK){box.innerHTML=`<h3>🎙️ Hear ${esc(ST.name)} read</h3><p>Turn this on to save short recordings when ${esc(ST.name)} reads to Sparky. They stay on this device and are never uploaded. Listen back to hear reading grow over the year.</p>
    ${storeGet('ls_rec_conflict')==='1'?'<p class="muted">This device can’t record while Sparky listens, so recordings are off here.</p>':`<button class="btn btn-sec" onclick="ST.settings.recOK=true;save();recDraw()">Turn on reading recordings</button>`}`;return;}
  let all=[];try{all=await recAll(ST.id);}catch(e){}
  const byDay={};all.forEach(c=>{const k=new Date(c.at).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});(byDay[k]=byDay[k]||[]).push(c);});
  box.innerHTML=`<h3>🎙️ Hear ${esc(ST.name)} read</h3>
    ${all.length?Object.entries(byDay).map(([d,cs])=>`<div class="rec-day"><b>${d}</b>${cs.map(c=>{const u=URL.createObjectURL(c.blob);REC_URLS.push(u);
      return `<div class="rec-row"><span class="rec-t">${esc(c.title||c.book)} · page ${c.page+1} · ${c.dur}s</span><audio controls preload="none" src="${u}"></audio>
        <button class="rec-k${c.keep?' on':''}" onclick="recKeep('${c.id}')" aria-label="${c.keep?'Kept':'Keep'} this recording" title="Keep (won’t be cleared automatically)">★</button>
        <button class="rec-x" onclick="recDel('${c.id}').then(recDraw)" aria-label="Delete this recording">✕</button></div>`;}).join('')}</div>`).join('')
      :`<p>No recordings yet. They appear here after ${esc(ST.name)} reads a story to Sparky with the microphone on.</p>`}
    <p class="muted small">Only the newest ${REC_MAX} are kept, plus any you star. Stored on this device only.</p>
    <div class="sync-acts">${all.length?`<button class="btn btn-sec" onclick="inPageConfirm('Delete all of ${esc(ST.name).replace(/'/g,'')}’s recordings?','Delete all',recWipe)">Delete all recordings</button>`:''}
    <button class="btn btn-sec" onclick="ST.settings.recOK=false;save();recDraw()">Turn off recordings</button></div>`;}
async function recKeep(id){const s=await recTx('readwrite');const r=s.get(id);r.onsuccess=()=>{const c=r.result;if(c){c.keep=!c.keep;s.put(c);}setTimeout(recDraw,50);};}
async function recWipe(){const all=await recAll(ST.id);for(const c of all)await recDel(c.id);renderReport();}
const _dlRec=deleteLearner;
deleteLearner=function(){const id=ST.id;const was=!!PROFILES.list[id];_dlRec.apply(this,arguments);
  if(was&&!PROFILES.list[id]&&recSupported())recAll(id).then(a=>a.forEach(c=>recDel(c.id))).catch(()=>{});};

