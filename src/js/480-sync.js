// ── Move progress between devices: progress file + transfer code (no accounts, no server) ──
if(!SAVE_FIELDS.includes('updated'))SAVE_FIELDS.push('updated');
const _saveSync=save;
save=function(){if(ST&&ST.id)ST.updated=Date.now();return _saveSync.apply(this,arguments);};

function syncLast(p){const ds=Object.keys(p.days||{}).sort();const d=ds.length?new Date(ds[ds.length-1]+'T12:00:00').getTime():0;return Math.max(p.updated||0,d,p.created||0);}
function syncPayload(){save();return {app:'LearnSpark',v:1,at:Date.now(),list:JSON.parse(JSON.stringify(PROFILES.list))};}
function syncSummary(p){return `${esc(p.name||'Learner')} · Grade ${p.grade} · ${p.totalQ||0} questions · ${Object.keys((p.reading||{}).books||{}).length} books`;}
async function b64z(str){
  if(typeof CompressionStream!=='undefined'){const cs=new Blob([str]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    const buf=new Uint8Array(await new Response(cs).arrayBuffer());let s='';for(let i=0;i<buf.length;i+=0x8000)s+=String.fromCharCode.apply(null,buf.subarray(i,i+0x8000));
    return 'LS1:'+btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
  return 'LS0:'+btoa(unescape(encodeURIComponent(str)));}
async function unb64z(code){code=code.trim().replace(/\s+/g,'');
  if(code.startsWith('LS0:'))return decodeURIComponent(escape(atob(code.slice(4))));
  if(!code.startsWith('LS1:'))throw new Error('not a LearnSpark code');
  let b=code.slice(4).replace(/-/g,'+').replace(/_/g,'/');while(b.length%4)b+='=';
  const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const ds=new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return await new Response(ds).text();}
function syncParse(txt){const d=JSON.parse(txt);if(!d||d.app!=='LearnSpark'||!d.list||typeof d.list!=='object')throw new Error('not a LearnSpark progress file');
  const list=Object.values(d.list).filter(p=>p&&p.id&&typeof p.name==='string');if(!list.length)throw new Error('no learners in file');return list;}

function openSync(){closeSheet();
  const n=Object.keys(PROFILES.list).length;
  const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';el.onclick=e=>{if(e.target===el)el.remove();};
  el.innerHTML=`<div class="sheet sync" role="dialog" aria-label="Move progress to another device">
    <div class="sheet-h">Move progress <button class="icon-btn" onclick="closeSheet()" aria-label="Close">✕</button></div>
    <p class="muted">Progress is saved on this device only. To use LearnSpark on another phone, tablet, or computer, send your progress there.</p>
    ${n?`<div class="sync-box"><b>1. On this device: send progress</b><small>${Object.values(PROFILES.list).map(syncSummary).join('<br>')}</small>
      <div class="sync-acts"><button class="btn btn-pri" style="background:#2F6FE0" onclick="syncSave()">⬇ Save a progress file</button>
      ${navigator.canShare&&navigator.canShare({files:[new File(['x'],'x.json',{type:'application/json'})]})?`<button class="btn btn-sec" onclick="syncShare()">📤 Send with share sheet</button>`:''}
      <button class="btn btn-sec" onclick="syncCode()">📋 Copy a transfer code</button></div><div id="syncOut"></div></div>`:''}
    <div class="sync-box"><b>${n?'2. On the other device: load progress':'Load progress from another device'}</b><small>Open LearnSpark there, go to Settings → Move progress, then load the file or paste the code.</small>
      <div class="sync-acts"><label class="btn btn-sec">📂 Load a progress file<input type="file" accept=".json,application/json" hidden onchange="syncFile(this)"></label></div>
      <textarea class="txt-in" id="syncIn" rows="3" placeholder="…or paste a transfer code here (it starts with LS1:)"></textarea>
      <div class="sync-acts"><button class="btn btn-sec" onclick="syncPaste()">Use this code</button></div><div id="syncPrev"></div></div>
    <p class="muted small">Reading recordings stay on the device where they were made.</p></div>`;
  document.body.appendChild(el);
}
function syncName(){return `learnspark-progress-${todayKey()}.json`;}
let SYNC_DL;
async function syncSave(){const json=JSON.stringify(syncPayload());const out=document.getElementById('syncOut');
  if(window.claude&&window.claude.use){if(SYNC_DL===undefined){try{SYNC_DL=await window.claude.use('downloads');}catch(e){SYNC_DL=null;}}
    if(SYNC_DL){try{await SYNC_DL.save({filename:syncName(),data:json});out.innerHTML=`<p class="sync-ok">✓ Saved <b>${syncName()}</b>. Send it to the other device, then load it there.</p>`;}
      catch(e){out.innerHTML=e&&e.code==='declined'?'<p class="muted">Not saved.</p>':'<p class="sync-bad">Saving a file isn’t available here. Use “Copy a transfer code” instead.</p>';}return;}}
  const blob=new Blob([json],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=syncName();document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
  document.getElementById('syncOut').innerHTML=`<p class="sync-ok">✓ Saved <b>${syncName()}</b>. Send it to the other device (email, AirDrop, a USB drive, or cloud storage), then load it there.</p>`;}
async function syncShare(){try{const f=new File([JSON.stringify(syncPayload())],syncName(),{type:'application/json'});await navigator.share({files:[f],title:'LearnSpark progress'});}catch(e){}}
async function syncCode(){const out=document.getElementById('syncOut');out.innerHTML='<p class="muted">Making code…</p>';
  try{const code=await b64z(JSON.stringify(syncPayload()));
    out.innerHTML=`<textarea class="txt-in sync-code" rows="3" readonly aria-label="Transfer code">${code}</textarea><p class="sync-ok" id="syncCopied"></p>`;
    const ta=out.querySelector('textarea');ta.select();
    try{await navigator.clipboard.writeText(code);document.getElementById('syncCopied').textContent=`✓ Copied (${Math.round(code.length/1024)} KB of text). Paste it into a message or email to yourself, then paste it on the other device.`;}
    catch(e){document.getElementById('syncCopied').textContent='Select the code above and copy it.';}
  }catch(e){out.innerHTML='<p class="sync-bad">Could not make a code on this browser. Use the progress file instead.</p>';}}
function syncFile(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>syncPreview(r.result);r.readAsText(f);}
async function syncPaste(){const v=document.getElementById('syncIn').value;if(!v.trim())return;
  try{syncPreview(await unb64z(v));}catch(e){document.getElementById('syncPrev').innerHTML='<p class="sync-bad">That code didn’t work. Make sure you copied all of it.</p>';}}
let SYNC_IN=null;
function syncPreview(txt){const box=document.getElementById('syncPrev');
  try{SYNC_IN=syncParse(txt);}catch(e){box.innerHTML='<p class="sync-bad">That isn’t a LearnSpark progress file.</p>';return;}
  box.innerHTML=`<div class="sync-prev">${SYNC_IN.map((p,i)=>{const mine=PROFILES.list[p.id];const fileNewer=!mine||syncLast(p)>=syncLast(mine);
    return `<label class="sync-row"><input type="checkbox" data-i="${i}" ${fileNewer?'checked':''}><span><b>${syncSummary(p)}</b><small>${!mine?'New on this device':fileNewer?`Newer than this device (${mine.totalQ||0} questions here) — will replace it`:`This device has newer progress (${mine.totalQ||0} questions) — unchecked to keep it`}</small></span></label>`;}).join('')}</div>
    <div class="sync-acts"><button class="btn btn-pri" style="background:#23845A" onclick="syncImport()">Load checked learners</button></div>`;}
function syncImport(){const picks=[...document.querySelectorAll('.sync-prev input:checked')].map(x=>SYNC_IN[+x.dataset.i]);if(!picks.length)return;
  save();const b=blankLearner();
  picks.forEach(p=>{for(const k of SAVE_FIELDS)if(p[k]===undefined)p[k]=JSON.parse(JSON.stringify(b[k]===undefined?null:b[k]));PROFILES.list[p.id]=p;});
  const cur=ST.id&&PROFILES.list[ST.id]?ST.id:picks[0].id;persistProfiles();activateProfile(cur);closeSheet();renderDash();
  setTimeout(()=>toast('✅','Progress loaded',picks.map(p=>p.name).join(', ')),300);}

// Settings: add the entry
const _osSync=openSettings;
openSettings=function(){_osSync.apply(this,arguments);
  const acts=document.querySelector('#sheet .sheet-acts');if(acts)acts.insertAdjacentHTML('afterbegin',`<button class="btn btn-sec" onclick="openSync()">📲 Move progress to another device</button>`);};
// Who's learning screen: offer loading on a fresh device
const _rwSync=renderWho;
renderWho=function(){_rwSync.apply(this,arguments);
  const host=document.querySelector('.screen.active .who-grid, .screen.active .who, .screen.active');
  if(host&&!document.getElementById('whoSync'))host.insertAdjacentHTML('beforeend',`<p class="who-sync" id="whoSync"><button class="link-btn" onclick="openSync()">Have progress on another device? Load it here</button></p>`);};
const _ralSync=renderAddLearner;
renderAddLearner=function(){_ralSync.apply(this,arguments);
  if(Object.keys(PROFILES.list).length)return;const sc=document.querySelector('.screen.active');
  if(sc&&!document.getElementById('whoSync'))sc.insertAdjacentHTML('beforeend',`<p class="who-sync" id="whoSync"><button class="link-btn" onclick="openSync()">Already use LearnSpark on another device? Load your progress</button></p>`);};

