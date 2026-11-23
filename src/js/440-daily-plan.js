// ── Fact Sprint (math facts warm-up) + Today's 15 minutes (daily plan) ──

// ---------- Fact Sprint ----------
const FS_N=20;
function fsStore(){const x=ST.extras||(ST.extras={});return x.facts||(x.facts={f:{},runs:[]});}
function fsKind(){return ST.grade<=2?'add':'mul';}
function fsMax(){return ST.grade<=1?10:ST.grade===2?20:ST.grade===3?10:12;}
function fsAll(){const out=[],k=fsKind(),M=fsMax();
  if(k==='add'){for(let a=0;a<=10;a++)for(let b=0;b<=10;b++){if(a+b<=M)out.push({k:`${a}+${b}`,t:`${a} + ${b}`,a:a+b});if(a+b<=M&&a>=b)out.push({k:`${a+b}-${b}`,t:`${a+b} − ${b}`,a:a});}}
  else{for(let a=2;a<=M;a++)for(let b=2;b<=M;b++){out.push({k:`${a}x${b}`,t:`${a} × ${b}`,a:a*b});out.push({k:`${a*b}/${b}`,t:`${a*b} ÷ ${b}`,a:a});}}
  return out;}
function fsWeight(f){const s=fsStore().f[f.k];if(!s)return 3;const acc=s.c/s.n;return 1+(acc<1?4*(1-acc):0)+(s.t>4000?2:s.t>2500?1:0);}
function fsPick(){const all=fsAll();const w=all.map(fsWeight);const out=[];const used=new Set();
  while(out.length<FS_N&&used.size<all.length){let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;while((r-=w[i])>0)i++;if(!used.has(i)){used.add(i);out.push(all[i]);}}
  return out;}
let FS=null;
function startFactSprint(){
  FS={qs:fsPick(),i:0,c:0,start:0,t0:0,miss:[],done:false};
  setScreen(`<div class="screen active"><div class="topbar calm" style="--acc:#2F6FE0"><button class="tb-back" onclick="fsQuit()" aria-label="Back">←</button>
    <div class="tb-user"><div class="tb-name" style="color:#fff">Fact Sprint</div><div class="tb-sub" style="color:rgba(255,255,255,.9)">${fsKind()==='add'?'Addition & subtraction':'Multiplication & division'} · ${FS_N} facts</div></div>
    <div class="t-time" id="fsTime">⏱ 0:00</div></div>
    <div class="act-body"><div class="qc fs-card" id="fsCard">
      <div class="fs-intro"><div class="fs-big">⚡</div><h2>Ready?</h2><p>Answer ${FS_N} facts as fast as you can. Accuracy counts more than speed — Sparky picks the facts you need most.</p>
      <button class="btn btn-pri big" style="background:#2F6FE0" onclick="fsGo()">Start</button></div></div></div></div>`);
}
function fsGo(){FS.start=Date.now();FS._tick=setInterval(()=>{const el=document.getElementById('fsTime');if(!el||FS.done){clearInterval(FS._tick);return;}el.textContent='⏱ '+clock((Date.now()-FS.start)/1000);},500);fsDraw();}
function fsDraw(){const f=FS.qs[FS.i];FS.t0=Date.now();
  const c=document.getElementById('fsCard');if(!c)return;
  c.innerHTML=`<div class="fs-prog"><i style="width:${FS.i/FS.qs.length*100}%"></i></div><div class="fs-n">${FS.i+1} / ${FS.qs.length}</div>
    <div class="fs-fact" aria-live="polite">${f.t} = <input id="fsIn" class="ti-in fs-in" type="text" ${(window.matchMedia&&matchMedia('(pointer:coarse)').matches)?'inputmode="none"':'inputmode="numeric"'} autocomplete="off" aria-label="Answer for ${f.t}"></div>
    <div class="fs-fb" id="fsFb"></div>${solKeypad('fsIn',['7','8','9','⌫','4','5','6','0','1','2','3'])}`;
  const el=document.getElementById('fsIn');el.addEventListener('input',fsInput);el.addEventListener('keydown',e=>{if(e.key==='Enter')fsSubmit();});
  if(!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))el.focus();
}
function fsInput(){const f=FS.qs[FS.i],el=document.getElementById('fsIn');const v=el.value.replace(/\D/g,'');el.value=v;
  if(v.length>=String(f.a).length)fsSubmit();}
function fsSubmit(){if(FS.lock)return;const f=FS.qs[FS.i],el=document.getElementById('fsIn');if(!el.value)return;
  const ok=+el.value===f.a,ms=Date.now()-FS.t0;const s=fsStore().f[f.k]||(fsStore().f[f.k]={n:0,c:0,t:0});
  s.n++;if(ok){s.c++;s.t=s.t?Math.round(s.t*0.6+ms*0.4):ms;FS.c++;}else FS.miss.push(f);
  el.disabled=true;el.classList.add(ok?'ok':'bad');FS.lock=true;
  document.getElementById('fsFb').innerHTML=ok?'':`${f.t} = <b>${f.a}</b>`;ok?FX.correct():FX.wrong();
  setTimeout(()=>{FS.lock=false;FS.i++;if(FS.i<FS.qs.length)fsDraw();else fsEnd();},ok?250:1300);}
function fsQuit(){if(FS&&FS._tick)clearInterval(FS._tick);FS=null;renderDash();}
function fsEnd(){FS.done=true;clearInterval(FS._tick);const sec=Math.round((Date.now()-FS.start)/1000);
  const st=fsStore();const best=st.runs.filter(r=>r.k===fsKind()&&r.c===FS_N).reduce((m,r)=>Math.min(m,r.sec),Infinity);
  st.runs.push({d:Date.now(),day:todayKey(),k:fsKind(),c:FS.c,n:FS.qs.length,sec});if(st.runs.length>100)st.runs.shift();
  const pb=FS.c===FS_N&&sec<best;const fpm=Math.round(FS.c/sec*60);
  ST.xp+=FS.c;if(FS.c>=18)ST.stars++;save();if(pb||FS.c===FS_N)confetti(innerWidth/2,160,60);
  document.getElementById('fsCard').innerHTML=`<div class="fs-intro"><div class="fs-big">${FS.c===FS_N?'🏆':FS.c>=15?'⭐':'💪'}</div>
    <h2>${FS.c} of ${FS.qs.length} correct</h2><p><b>${clock(sec)}</b> · ${fpm} facts per minute${pb?' · <b class="fs-pb">New best time!</b>':isFinite(best)?` · best ${clock(best)}`:''}</p>
    ${FS.miss.length?`<div class="fs-miss"><b>Practice these:</b> ${FS.miss.map(f=>`<span>${f.t} = ${f.a}</span>`).join('')}</div>`:''}
    ${fsGrid()}
    <div class="btns"><button class="btn btn-sec" onclick="startFactSprint()">Go again</button><button class="btn btn-pri" style="background:#2F6FE0" onclick="fsQuit()">Done</button></div></div>`;
}
function fsGrid(){if(fsKind()!=='mul')return '';const M=fsMax(),f=fsStore().f;
  const cell=(a,b)=>{const s=f[`${a}x${b}`],d=f[`${a*b}/${b}`];const n=(s?s.n:0)+(d?d.n:0);if(!n)return 'u';
    const c=(s?s.c:0)+(d?d.c:0),t=Math.max(s&&s.c?s.t:0,d&&d.c?d.t:0);return c<n*0.8?'m':t>3500?'s':'f';};
  let h=`<div class="fs-gridt">Your times-table map</div><div class="fs-grid" style="--m:${M-1}" role="img" aria-label="Times table map: green is fast, yellow is slow, red needs practice, gray not tried yet"><span></span>`;
  for(let b=2;b<=M;b++)h+=`<b>${b}</b>`;
  for(let a=2;a<=M;a++){h+=`<b>${a}</b>`;for(let b=2;b<=M;b++)h+=`<i class="fs-${cell(a,b)}"></i>`;}
  return h+`</div><div class="fs-leg"><span><i class="fs-f"></i>fast</span><span><i class="fs-s"></i>slow</span><span><i class="fs-m"></i>needs practice</span><span><i class="fs-u"></i>not yet</span></div>`;}
function fsToday(){return fsStore().runs.some(r=>r.day===todayKey());}

// ---------- Today's 15 minutes ----------
function dpState(){const x=ST.extras||(ST.extras={});const k=todayKey();
  if(!x.daily||x.daily.day!==k||x.daily.grade!==ST.grade){
    const rec=recommended(3);const a=rec[0],b=rec.find(r=>a&&r.subj!==a.subj)||rec[1];
    const sk=a&&{subj:a.subj,code:a.st.code,name:a.st.name,base:(getSkill(a.subj,a.st.code)||{n:0}).n};
    const miss=ST.missed.length;
    const fix=miss?{type:'fix',base:x.fixedTotal||0,need:Math.min(3,miss)}:(b?{type:'skill',subj:b.subj,code:b.st.code,name:b.st.name,base:(getSkill(b.subj,b.st.code)||{n:0}).n}:null);
    const bk=STORIES.filter(s=>s.level===myLevel()).find(s=>!rstate().books[s.id])||STORIES.find(s=>s.level===myLevel());
    const vid=a&&(()=>{const st=findSkill(a.subj,a.st.code);return st&&typeof hasVideo==='function'&&hasVideo('lesson',st.gen)?st.gen:null;})();
    x.daily={day:k,grade:ST.grade,skill:sk,fix,book:bk&&bk.id,vid,bonus:false};
  }
  return x.daily;}
function dpDone(d){const x=ST.extras;const k=todayKey();
  const sn=s=>s?((getSkill(s.subj,s.code)||{n:0}).n-s.base):0;
  return {warm:fsToday(),
    skill:d.skill?sn(d.skill)>=8:true,
    fix:!d.fix?true:d.fix.type==='fix'?((x.fixedTotal||0)-d.fix.base>=d.fix.need||!ST.missed.length):sn(d.fix)>=8,
    read:Object.values(rstate().books).some(b=>b.last&&todayKey(new Date(b.last))===k)||x.vidDay===k};}
function dpHTML(){const d=dpState(),done=dpDone(d);const steps=[
  {k:'warm',ic:'⚡',t:'Warm up: Fact Sprint',s:`${FS_N} quick ${fsKind()==='add'?'addition and subtraction':'times-table'} facts · 2 min`,go:'startFactSprint()'},
  d.skill&&{k:'skill',ic:'🎯',t:`Practice: ${esc(d.skill.name)}`,s:`${SUBJ[d.skill.subj].short} · answer 8 questions${!done.skill?` · ${Math.max(0,(getSkill(d.skill.subj,d.skill.code)||{n:0}).n-d.skill.base)}/8 done`:''} · 6 min`,go:`DP_STEP='skill';startSkill('${d.skill.subj}','${d.skill.code}')`},
  d.fix&&(d.fix.type==='fix'?{k:'fix',ic:'🔁',t:'Fix past mistakes',s:`Get ${d.fix.need} missed question${d.fix.need>1?'s':''} right · 3 min`,go:'clReview()'}
    :{k:'fix',ic:'🧩',t:`Mix it up: ${esc(d.fix.name)}`,s:`${SUBJ[d.fix.subj].short} · answer 8 questions · 3 min`,go:`startSkill('${d.fix.subj}','${d.fix.code}')`}),
  {k:'read',ic:'📖',t:d.vid?'Read a story or watch the lesson':'Read a story to Sparky',s:d.book?`${esc((bookById(d.book)||{}).title||'')} · 4 min`:'4 min',go:d.book?`openBook('${d.book}')`:"switchTab('stories')",
    alt:d.vid?`<button class="dp-alt" onclick="openVideo('lesson','${d.vid}','${esc(d.skill.name).replace(/'/g,"\\'")}')">▶ Watch lesson</button>`:''}
  ].filter(Boolean);
  const n=steps.filter(s=>done[s.k]).length,all=n===steps.length;
  if(all&&!d.bonus){d.bonus=true;ST.stars+=2;ST.xp+=20;save();setTimeout(()=>{toast('🌟','Today’s plan complete!','+2 stars and 20 XP');confetti(innerWidth/2,120,80);},300);}
  return `<section class="cl-panel dp"><div class="cl-sh"><h2>Today’s 15 minutes</h2><span class="cl-sub">${all?'All done — great work!':`${n} of ${steps.length} done`}</span></div>
    <div class="dp-bar"><i style="width:${n/steps.length*100}%"></i></div>
    <ol class="dp-list">${steps.map((s,i)=>`<li class="dp-step${done[s.k]?' done':''}"><button class="dp-go" onclick="${s.go}" ${done[s.k]?'aria-label="Done: '+s.t.replace(/"/g,'')+'. Do it again"':''}>
      <span class="dp-ic" aria-hidden="true">${done[s.k]?'✓':s.ic}</span><span class="dp-b"><b>${s.t}</b><small>${s.s}</small></span><span class="dp-arr" aria-hidden="true">${done[s.k]?'':'›'}</span></button>${s.alt||''}</li>`).join('')}</ol></section>`;
}
let DP_STEP=null;
// count fixed mistakes
const _recDP=record;
record=function(correct){const wasReview=SESSION.mode==='review'&&!SESSION.answered;_recDP.apply(this,arguments);
  if(wasReview&&correct){ST.extras=ST.extras||{};ST.extras.fixedTotal=(ST.extras.fixedTotal||0)+1;save();}
  if(DP_STEP==='skill'&&SESSION.mode==='skill'){const d=ST.extras&&ST.extras.daily;if(d&&d.skill&&d.skill.code===SESSION.code&&(getSkill(d.skill.subj,d.skill.code)||{n:0}).n-d.skill.base===8){DP_STEP=null;setTimeout(()=>toast('✅','Plan step done','8 questions answered — keep going or tap Finish'),600);}}
};
// video watched today counts as reading/watching
document.addEventListener('ended',e=>{if(e.target&&e.target.classList&&e.target.classList.contains('vid-el')){ST.extras=ST.extras||{};ST.extras.vidDay=todayKey();save();}},true);
// show the plan at the top of the Learn tab
const _rtDP=renderTab;
renderTab=function(){_rtDP.apply(this,arguments);
  if(ST.tab!=='learn')return;const c=document.getElementById('tabContent');if(!c)return;
  const hero=c.querySelector('.cl-hero');try{const h=dpHTML();if(hero)hero.insertAdjacentHTML('afterend',h);else c.insertAdjacentHTML('afterbegin',h);}catch(e){console.error(e);}
};
// Fact Sprint in the Arcade
const _rtArc=renderTab;
renderTab=function(){_rtArc.apply(this,arguments);
  if(ST.tab!=='arcade')return;const c=document.getElementById('tabContent');const head=c&&c.querySelector('.cl-pagehead');if(!head)return;
  const best=fsStore().runs.filter(r=>r.k===fsKind()&&r.c===FS_N).reduce((m,r)=>Math.min(m,r.sec),Infinity);
  head.insertAdjacentHTML('afterend',`<button class="cl-panel fs-promo" onclick="startFactSprint()"><span class="fs-big" aria-hidden="true">⚡</span>
    <span><b>Fact Sprint</b><small>${fsKind()==='add'?'Addition & subtraction':'Times tables & division'} · ${isFinite(best)?'Best: '+clock(best):'Set your first record'}</small></span><span class="cl-btn">Play</span></button>`);
};

