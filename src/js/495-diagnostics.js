// ── Problem log (part 2): show it in Settings, copy it for a bug report ──
function deviceLabel(){const u=navigator.userAgent;const os=/iPhone|iPad|iPod/.test(u)?'iOS':/Android/.test(u)?'Android':/Mac/.test(u)?'Mac':/Windows/.test(u)?'Windows':/CrOS/.test(u)?'Chromebook':/Linux/.test(u)?'Linux':'Other';
  const br=/Edg\//.test(u)?'Edge':/CriOS|Chrome\//.test(u)?'Chrome':/FxiOS|Firefox\//.test(u)?'Firefox':/Safari\//.test(u)?'Safari':'Browser';
  const where=/github\.io$/.test(location.hostname)?'website':location.protocol==='file:'?'file':'claude.ai';return `${os} · ${br} · ${where}`;}
function diagReport(){const l=ERRLOG.read();
  return [`LearnSpark ${APP_VERSION}`,deviceLabel(),`Screen ${innerWidth}×${innerHeight}`,`Problems logged: ${l.length}`,'']
    .concat(l.map(e=>`${new Date(e.t).toISOString().slice(0,16).replace('T',' ')} [${e.k}${e.n>1?' ×'+e.n:''}] ${e.w?'('+e.w+') ':''}${e.m}${e.s?'\n    '+e.s.replace(/\n/g,'\n    '):''}`)).join('\n');}
function openDiag(){closeSheet();const l=ERRLOG.read();
  const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';el.onclick=e=>{if(e.target===el)el.remove();};
  el.innerHTML=`<div class="sheet" role="dialog" aria-label="App info and problem log"><div class="sheet-h">App info <button class="icon-btn" onclick="closeSheet()" aria-label="Close">✕</button></div>
    <div class="diag-grid"><b>Version</b><span>${esc(APP_VERSION)}</span><b>Device</b><span>${esc(deviceLabel())}</span><b>Problems</b><span>${l.length?l.length+' logged on this device':'None logged'}</span></div>
    ${l.length?`<ol class="diag-list">${l.slice(-8).reverse().map(e=>`<li><small>${new Date(e.t).toLocaleString()}${e.n>1?` · ${e.n} times`:''}</small><code>${esc(e.m)}</code></li>`).join('')}</ol>`:''}
    <p class="muted small">If something isn’t working, tap <b>Copy report</b> and send it to whoever looks after LearnSpark. It lists what went wrong and the device type only — no names, answers or progress.</p>
    <div class="sync-acts"><button class="btn btn-pri" style="background:#2F6FE0" onclick="diagCopy(this)">📋 Copy report</button>${l.length?`<button class="btn btn-sec" onclick="ERRLOG.clear();openDiag()">Clear log</button>`:''}</div></div>`;
  document.body.appendChild(el);}
async function diagCopy(b){const t=diagReport();try{await navigator.clipboard.writeText(t);b.textContent='✓ Copied';}
  catch(e){const ta=document.createElement('textarea');ta.className='txt-in';ta.rows=8;ta.value=t;b.parentNode.after(ta);ta.select();b.textContent='Select the text and copy it';}}
const _osDiag=openSettings;
openSettings=function(){_osDiag.apply(this,arguments);const acts=document.querySelector('#sheet .sheet-acts');
  if(acts)acts.insertAdjacentHTML('beforeend',`<button class="btn btn-sec" onclick="openDiag()">ℹ️ App info & problem log</button>`);};
