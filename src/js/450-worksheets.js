// ── Printable worksheets with answer key ──
const WS={subj:null,codes:[],n:10,mix:true,key:true,qs:null};
function openWorksheets(subj){
  WS.subj=subj||WS.subj||'math';WS.codes=WS.codes.filter(c=>skillsFor(WS.subj).some(s=>s.code===c));
  if(!WS.codes.length){const r=recommended(3).find(x=>x.subj===WS.subj);WS.codes=[r?r.st.code:skillsFor(WS.subj)[0].code];}
  WS.qs=null;wsScreen();}
function wsScreen(){
  const sk=skillsFor(WS.subj);
  setScreen(`<div class="screen active ws-screen"><div class="topbar calm" style="--acc:#1B2A4A"><button class="tb-back" onclick="renderDash()" aria-label="Back">←</button>
    <div class="tb-user"><div class="tb-name" style="color:#fff">Printable worksheets</div><div class="tb-sub" style="color:rgba(255,255,255,.9)">Grade ${ST.grade} · questions change every time</div></div></div>
    <div class="act-body"><div class="qc ws-form">
      <div class="set-row"><div><b>Subject</b></div><div class="seg wide">${Object.entries(SUBJ).map(([k,s])=>`<button class="${WS.subj===k?'on':''}" onclick="WS.subj='${k}';WS.codes=[];openWorksheets('${k}')">${s.short}</button>`).join('')}</div></div>
      <div class="ws-sk"><b>Skills</b> <small>(pick up to 3)</small><div class="ws-sk-list">${sk.map(s=>`<label class="ws-ck"><input type="checkbox" ${WS.codes.includes(s.code)?'checked':''} onchange="wsToggle('${s.code}',this)"> <span>${esc(s.name)} <small>SOL ${s.code}</small></span></label>`).join('')}</div></div>
      <div class="set-row"><div><b>Questions</b></div><div class="seg">${[10,15,20].map(n=>`<button class="${WS.n===n?'on':''}" onclick="WS.n=${n};wsScreen()">${n}</button>`).join('')}</div></div>
      <div class="set-row"><div><b>SOL-style questions</b><small>Number lines, grids, sorting, and fill-in answers</small></div><button class="toggle ${WS.mix?'on':''}" onclick="WS.mix=!WS.mix;this.classList.toggle('on',WS.mix)"></button></div>
      <div class="set-row"><div><b>Answer key</b><small>Printed on its own page at the end</small></div><button class="toggle ${WS.key?'on':''}" onclick="WS.key=!WS.key;this.classList.toggle('on',WS.key)"></button></div>
      <div class="btns"><button class="btn btn-pri" style="background:#2F6FE0" onclick="wsMake()">${WS.qs?'Make a new set':'Make worksheet'}</button>${WS.qs?`<button class="btn btn-pri" style="background:#23845A" onclick="wsPrint()">🖨 Print</button>`:''}</div>
    </div>${WS.qs?`<div id="ws">${wsHTML()}</div>`:''}</div></div>`);
}
function wsToggle(code,cb){if(cb.checked){if(WS.codes.length>=3){cb.checked=false;return;}WS.codes.push(code);}else WS.codes=WS.codes.filter(c=>c!==code);}
function wsMake(){if(!WS.codes.length)return;const sts=WS.codes.map(c=>findSkill(WS.subj,c)).filter(Boolean);const seen=new Set();const qs=[];
  const prev=typeof SESSION!=='undefined'?SESSION.subj:null;if(typeof SESSION!=='undefined')SESSION.subj=WS.subj;
  for(let i=0,t=0;qs.length<WS.n&&t<WS.n*20;t++){const st=sts[i%sts.length];let q=makeQ(st.gen);
    if(WS.mix&&typeof solFormats==='function')q=solFormats(st.gen,q,true);
    const sig=(q.passage||'')+(q.question||q.correct||'');if(seen.has(sig)||q.type==='race')continue;
    const tpl=q.type+':'+sig.replace(/[−-]?\d[\d,./]*/g,'#').replace(/\b(Ama|Kofi|Maya|Luca|Zoe|Kwame|Sofia|Ben|Lily|Jamal|Nia|Tom|Aisha|Diego|Ella|Yaw)\b/g,'N');
    if(seen.has(tpl)&&t<WS.n*12)continue;seen.add(sig);seen.add(tpl);q._st=st;qs.push(q);i++;}
  if(typeof SESSION!=='undefined')SESSION.subj=prev;
  WS.qs=qs;wsScreen();setTimeout(()=>{const w=document.getElementById('ws');if(w)w.scrollIntoView({behavior:'smooth'});},50);}
function wsQ(q,i){const n=`<span class="ws-n">${i+1}.</span>`;const qt=s=>`<div class="ws-qt">${n}<span>${String(s).replace(/\n/g,'<br>')}</span></div>`;
  const letters='ABCDEF';
  if(q.type==='sentence')return qt('Put the words in order to make a sentence:')+`<div class="ws-bank">${shuf(q.words).map(esc).join(' · ')}</div><div class="ws-line wide"></div>`;
  if(q.type==='input')return qt(esc(q.question))+`<div class="ws-ans">Answer: ${q.pre||''}<span class="ws-line"></span> ${esc(q.suf||'')}</div>`;
  if(q.type==='multi')return qt(esc(q.question))+`<div class="ws-opts">${q.opts.map(o=>`<div><span class="ws-box"></span>${o}</div>`).join('')}</div>`;
  if(q.type==='order'){q._sh=q._sh||shuf(q.items);return qt(esc(q.question)+' Write 1 for the first, 2 for the next, and so on.')+`<div class="ws-opts">${q._sh.map(o=>`<div><span class="ws-line short"></span> ${esc(o)}</div>`).join('')}</div>`;}
  if(q.type==='sort')return qt(esc(q.question)+' Write each item in the correct column.')+`<div class="ws-bank">${q.items.map(x=>esc(x.t)).join(' · ')}</div>
    <table class="ws-sort"><tr>${q.cats.map(c=>`<th>${esc(c)}</th>`).join('')}</tr><tr>${q.cats.map(()=>'<td></td>').join('')}</tr></table>`;
  if(q.type==='nline')return qt(esc(q.question).replace('Place','Mark')+' Draw a dot.')+`<div class="ws-fig">${solNlSVG(q,null,false)}</div>`;
  if(q.type==='plot')return qt(esc(q.question)+' Draw a dot on the grid.')+`<div class="ws-fig ws-grid">${solGridSVG(q,null,false)}</div>`;
  const dg=q.dgSvg?{svg:q.dgSvg}:(typeof diagram==='function'?diagram(q,'#1B2A4A'):null);
  return (q.passage?`<div class="ws-pass">${q.passage}</div>`:'')+qt(dg&&dg.text?dg.text:q.question)+(dg?`<div class="ws-fig">${dg.svg}</div>`:'')+
    `<div class="ws-opts mc">${q.opts.map((o,k)=>`<div><span class="ws-bub">${letters[k]}</span>${o}</div>`).join('')}</div>`;}
function wsKey(q){if(q.type==='mc'){const k=q.opts.findIndex(o=>String(o)===String(q.answer));return `${'ABCDEF'[k]}. ${q.answer}`;}
  if(q.type==='sentence')return esc(q.correct);if(q.type==='multi')return q.answers.join(', ');
  if(q.type==='order')return q._sh.map(x=>q.items.indexOf(x)+1).join(', ')+'  ('+q.items.join(' → ')+')';
  return esc(solCorrectText(q));}
function wsHTML(){const sts=WS.codes.map(c=>findSkill(WS.subj,c)).filter(Boolean);
  return `<div class="ws-page"><div class="ws-head"><div><b>LearnSpark worksheet</b> · ${SUBJ[WS.subj].label} · Grade ${ST.grade}</div>
      <div class="ws-name">Name <span class="ws-line"></span> Date <span class="ws-line short2"></span></div>
      <div class="ws-skills">${sts.map(s=>`${esc(s.name)} (SOL ${s.code})`).join(' · ')}</div></div>
    <ol class="ws-list">${WS.qs.map((q,i)=>`<li class="ws-q">${wsQ(q,i)}</li>`).join('')}</ol>
    <div class="ws-foot">Practice only — not an official SOL test. Not affiliated with the Virginia Department of Education.</div></div>
    ${WS.key?`<div class="ws-page ws-keypage"><div class="ws-head"><b>Answer key</b> · ${sts.map(s=>esc(s.name)).join(' · ')}</div>
      <ol class="ws-keys">${WS.qs.map(q=>`<li>${wsKey(q)}</li>`).join('')}</ol></div>`:''}`;}
function wsPrint(){document.body.classList.add('ws-mode');const done=()=>{document.body.classList.remove('ws-mode');window.removeEventListener('afterprint',done);};
  window.addEventListener('afterprint',done);try{window.print();}catch(e){}setTimeout(done,60000);}

// Entry points: sidebar (grown-ups), skill lesson screen, Settings
const _rdWS=renderDash;
renderDash=function(){_rdWS.apply(this,arguments);
  const rep=[...document.querySelectorAll('.cl-ni')].find(b=>/renderReport/.test(b.getAttribute('onclick')||''));
  if(rep&&!document.getElementById('wsNav'))rep.insertAdjacentHTML('afterend',`<button class="cl-ni" id="wsNav" onclick="openWorksheets()">${ic('clipboard')}<span>Worksheets</span></button>`);};
const _olWS=openLesson;
openLesson=function(subj,code){_olWS.apply(this,arguments);
  const qc=document.querySelector('.lesson .act-body .qc');if(qc)qc.insertAdjacentHTML('beforeend',`<div class="ws-les"><button class="link-btn" onclick="WS.subj='${subj}';WS.codes=['${code}'];WS.qs=null;wsScreen()">🖨 Print a worksheet for this skill</button></div>`);};
const _osWS=openSettings;
openSettings=function(){_osWS.apply(this,arguments);const acts=document.querySelector('#sheet .sheet-acts');
  if(acts)acts.insertAdjacentHTML('afterbegin',`<button class="btn btn-sec" onclick="closeSheet();openWorksheets()">🖨 Printable worksheets</button>`);};

