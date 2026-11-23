// ── Question IDs and "Report a problem" ──
// Every question gets a stable ID: <generator>.<template hash>. Numbers and names are ignored when
// hashing, so all versions of one question template share an ID (it's the template that gets fixed).
// Reports are kept on this device (not per learner) and are copied out from Settings → App info.
const QR_KEY='ls_qreports';
function qTemplate(q){return [q.type,q.question||q.correct||'',q.passage?'P':''].join('|')
  .replace(/<[^>]+>/g,'').replace(/[−-]?\d[\d,.\/]*/g,'#').replace(/\b[A-Z][a-z]+\b/g,'N').replace(/\s+/g,' ').trim();}
function qHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
function qId(q,gen){return (gen||q.gen||'q')+'.'+qHash(qTemplate(q));}
function qrRead(){try{return JSON.parse(localStorage.getItem(QR_KEY)||'[]');}catch(e){return [];}}
function qrWrite(a){try{localStorage.setItem(QR_KEY,JSON.stringify(a.slice(-50)));}catch(e){}}
const QR_REASONS=[['wrong','The answer is wrong'],['two','More than one answer is right'],['confusing','The question is confusing'],['typo','Spelling or grammar mistake'],['picture','Picture or diagram problem'],['grade','Too hard or easy for this grade'],['other','Something else']];
function qrOpen(){
  const q=SESSION.q;if(!q)return;closeSheet();
  const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';el.onclick=e=>{if(e.target===el)el.remove();};
  el.innerHTML=`<div class="sheet" role="dialog" aria-label="Report a problem with this question"><div class="sheet-h">Report a problem <button class="icon-btn" onclick="closeSheet()" aria-label="Close">✕</button></div>
    <p class="muted">Thanks for helping make LearnSpark better. What’s wrong with this question?</p>
    <div class="qr-q">${esc(plain(q.question||q.correct||''))}</div>
    <div class="qr-reasons" role="radiogroup" aria-label="Reason">${QR_REASONS.map(([k,l],i)=>`<label class="ws-ck"><input type="radio" name="qrR" value="${k}" ${i===0?'checked':''}> <span>${l}</span></label>`).join('')}</div>
    <textarea class="txt-in" id="qrNote" rows="2" maxlength="300" placeholder="Anything else? (optional — please don’t include names)"></textarea>
    <div class="sync-acts"><button class="btn btn-pri" style="background:#2F6FE0" onclick="qrSave()">Save report</button></div></div>`;
  document.body.appendChild(el);
}
function qrSave(){
  const q=SESSION.q,r=(document.querySelector('input[name=qrR]:checked')||{}).value||'other';
  const note=(document.getElementById('qrNote').value||'').slice(0,300);
  const opts=q.opts?q.opts.map(String):q.items?q.items.map(x=>x.t||x):q.cats?q.cats:null;
  const ans=typeof solCorrectText==='function'&&SOL_TYPES.includes(q.type)?solCorrectText(q):q.answers?q.answers.join(', '):q.correct||q.answer;
  const list=qrRead();list.push({t:Date.now(),id:qId(q,SESSION.gen),gen:SESSION.gen,sol:SESSION.code,grade:ST.grade,type:q.type,
    q:plain(q.question||'').slice(0,500),opts,ans:String(ans==null?'':ans).slice(0,200),r,note,v:APP_VERSION});
  qrWrite(list);closeSheet();toast('🚩','Thanks! Problem noted','A grown-up can send it from Settings → App info');
}
// the link under every answer explanation
const _recQR=record;
record=function(){_recQR.apply(this,arguments);
  const fb=document.getElementById('fbCard');if(fb&&!fb.querySelector('.qr-link'))fb.insertAdjacentHTML('beforeend',`<button class="link-btn qr-link" onclick="qrOpen()">🚩 Report a problem with this question</button>`);};
// show reports in App info, include them in the copied report
const _odQR=openDiag;
openDiag=function(){_odQR.apply(this,arguments);const l=qrRead();const acts=document.querySelector('#sheet .sync-acts');if(!acts)return;
  acts.insertAdjacentHTML('beforebegin',`<div class="qr-box"><b>Question reports:</b> ${l.length?`${l.length} saved`:'none yet'}${l.length?`<ol class="diag-list">${l.slice(-5).reverse().map(x=>`<li><small>${new Date(x.t).toLocaleDateString()} · ${esc((QR_REASONS.find(r=>r[0]===x.r)||['', x.r])[1])} · ${esc(x.id)}</small><span>${esc(x.q.slice(0,120))}</span></li>`).join('')}</ol>`:''}</div>`);
  if(l.length)acts.insertAdjacentHTML('beforeend',`<button class="btn btn-sec" onclick="qrWrite([]);openDiag()">Clear question reports</button>`);};
const _drQR=diagReport;
diagReport=function(){const l=qrRead();return _drQR()+(l.length?'\n\nQuestion reports:\n'+l.map(x=>`- ${x.id} (grade ${x.grade}, SOL ${x.sol}, ${x.type}) [${x.r}] ${x.q}${x.opts?'\n    options: '+x.opts.join(' | '):''}\n    answer: ${x.ans}${x.note?'\n    note: '+x.note:''}`).join('\n'):'');};
