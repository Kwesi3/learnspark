// ═══════════════════════════════════════════════════════════════
// LEARNING PLATFORM — learners, skill map, SmartScore practice,
// lessons, review, awards, and the parent report.
// ═══════════════════════════════════════════════════════════════
const SUBJ={
  math:{label:'Mathematics',short:'Math',icon:'🔢',color:'#2F6FE0',dk:'#1D4AA8',lt:'#DCE8FF',band:'#4C8DF6'},
  read:{label:'Reading',short:'Reading',icon:'📖',color:'#17885A',dk:'#0F6142',lt:'#D7F5E7',band:'#2FB37A'},
  sci:{label:'Science',short:'Science',icon:'🔬',color:'#D35400',dk:'#9A3C00',lt:'#FFE6D3',band:'#FF8A3D'},
  write:{label:'Writing',short:'Writing',icon:'✍️',color:'#C9367C',dk:'#93235A',lt:'#FDE2EF',band:'#E8559A'},
};
const AVATARS=['🦊','🐼','🦁','🐯','🐸','🐙','🦄','🐢','🦉','🐬','🚀','⚽','🎨','🌻','🐝','🦖'];
const FAMILY={NS:'Number & Number Sense',CE:'Computation & Estimation',MG:'Measurement & Geometry',
  PS:'Probability & Statistics',PFA:'Patterns, Functions & Algebra'};
const G4_FAMILY={'4.1':'NS','4.2':'NS','4.3':'NS','4.4':'CE','4.5':'CE','4.6':'CE','4.7':'MG','4.8':'MG','4.9':'MG',
  '4.10':'MG','4.11':'MG','4.12':'MG','4.13':'PS','4.14':'PS','4.15':'PFA','4.16':'PFA'};

const app=document.getElementById('app');
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function pad(n){return String(n).padStart(2,'0');}
function todayKey(d){d=d||new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function fmtTime(sec){sec=Math.round(sec||0);if(sec<60)return sec+'s';const m=Math.floor(sec/60);
  if(m<60)return m+' min';return Math.floor(m/60)+'h '+(m%60)+'m';}
function clock(sec){sec=Math.floor(sec);return pad(Math.floor(sec/60))+':'+pad(sec%60);}
function plain(html){const d=document.createElement('div');d.innerHTML=String(html||'');return d.textContent||'';}

// ── screen plumbing: every screen change stops timers and speech ──
let _tick=null;
function setScreen(html){
  if(_tick){clearInterval(_tick);_tick=null;}
  try{if(window.speechSynthesis)speechSynthesis.cancel();}catch(e){}
  SESSION.active=false;
  const sh=document.getElementById('sheet');if(sh)sh.remove();
  if(typeof READ!=='undefined'){if(READ.want)micStop(true);stopTalking();}
  app.innerHTML=html;window.scrollTo(0,0);
}

// ── grade content & skills ──
function gradeContent(){return ST.grade<=4?4:6;}
function skillsFor(subj){return STRANDS[gradeContent()][subj]||[];}
function allSkills(){const out=[];Object.keys(SUBJ).forEach(s=>skillsFor(s).forEach(st=>out.push({subj:s,st})));return out;}
function findSkill(subj,code){return skillsFor(subj).find(s=>s.code===code);}
function skillKey(subj,code){return gradeContent()+':'+subj+':'+code;}
function getSkill(subj,code){return ST.skills[skillKey(subj,code)]||null;}
function ensureSkill(subj,code){const k=skillKey(subj,code);
  return ST.skills[k]||(ST.skills[k]={score:0,n:0,c:0,sec:0,best:0,last:0,mastered:0});}
function scoreOf(subj,code){const s=getSkill(subj,code);return s?s.score:0;}
function level(score,n){
  if(!n)return {t:'Not started',cls:'lv0'};
  if(score>=100)return {t:'Mastered',cls:'lv4'};
  if(score>=90)return {t:'Challenge zone',cls:'lv3'};
  if(score>=80)return {t:'Proficient',cls:'lv2'};
  return {t:'Practicing',cls:'lv1'};
}
// SmartScore: big gains early, small gains near the top; mistakes cost more in the challenge zone.
function smartGain(s){return s<40?12:s<60?9:s<80?6:s<90?4:2;}
function smartLoss(s){return s<50?4:s<80?7:s<90?9:12;}
function ring(score,size,color,label){
  const done=score>=100;
  return `<div class="ring${done?' ring-done':''}" style="--p:${score};--c:${done?'#F59E0B':color};width:${size}px;height:${size}px;font-size:${Math.round(size*.3)}px">
    <span>${done?ic('medal'):(label!==undefined?label:score)}</span></div>`;
}

// ── daily activity ──
function dayRec(k){k=k||todayKey();return ST.days[k]||(ST.days[k]={q:0,c:0,sec:0});}
function todayQ(){const d=ST.days[todayKey()];return d?d.q:0;}
function dayStreak(){
  const d=new Date();let n=0;
  if(!(ST.days[todayKey(d)]&&ST.days[todayKey(d)].q))d.setDate(d.getDate()-1);
  while(ST.days[todayKey(d)]&&ST.days[todayKey(d)].q){n++;d.setDate(d.getDate()-1);}
  return n;
}
function totalMastered(){return allSkills().filter(x=>scoreOf(x.subj,x.st.code)>=100).length;}

// ── toast / achievements ──
function toast(icon,kicker,title){
  const el=document.createElement('div');el.className='ach';el.setAttribute('role','status');
  el.innerHTML=`<div class="ach-i">${icon}</div><div><div class="ach-l">${kicker}</div><div class="ach-n">${title}</div></div>`;
  document.body.appendChild(el);setTimeout(()=>el.remove(),3600);
}
const ACH=[
  {id:'first',ic:'🌱',label:'First Question',d:'Answer your first question',t:()=>ST.totalQ>=1},
  {id:'ten',ic:'🔟',label:'Warming Up',d:'Answer 10 questions',t:()=>ST.totalQ>=10},
  {id:'fifty',ic:'💯',label:'Half Century',d:'Answer 50 questions',t:()=>ST.totalQ>=50},
  {id:'q250',ic:'📚',label:'Bookworm',d:'Answer 250 questions',t:()=>ST.totalQ>=250},
  {id:'streak5',ic:'🔥',label:'On Fire',d:'5 correct in a row',t:()=>ST.bestStreak>=5},
  {id:'streak10',ic:'⚡',label:'Unstoppable',d:'10 correct in a row',t:()=>ST.bestStreak>=10},
  {id:'m1',ic:'🏅',label:'First Mastery',d:'Master a skill (SmartScore 100)',t:()=>totalMastered()>=1},
  {id:'m5',ic:'🥈',label:'Skill Builder',d:'Master 5 skills',t:()=>totalMastered()>=5},
  {id:'m10',ic:'🥇',label:'Skill Champion',d:'Master 10 skills',t:()=>totalMastered()>=10},
  {id:'goal',ic:'🎯',label:'Goal Getter',d:'Reach your daily goal',t:()=>todayQ()>=ST.dailyGoal},
  {id:'days3',ic:'📅',label:'3-Day Streak',d:'Practice 3 days in a row',t:()=>dayStreak()>=3},
  {id:'days7',ic:'🗓️',label:'Week Warrior',d:'Practice 7 days in a row',t:()=>dayStreak()>=7},
  {id:'xp500',ic:'👑',label:'500 XP',d:'Earn 500 XP',t:()=>ST.xp>=500},
  {id:'gamer',ic:'🎮',label:'Arcade Player',d:'Play an arcade game',t:()=>Object.keys(ST.gameHi||{}).length>=1},
  {id:'book1',ic:'📖',label:'First Book',d:'Finish a Story Time book',t:()=>Object.keys(rstate().books).length>=1},
  {id:'book5',ic:'📚',label:'Book Lover',d:'Finish 5 different books',t:()=>Object.keys(rstate().books).length>=5},
  {id:'words300',ic:'🗣️',label:'Read Aloud Star',d:'Read 300 words out loud to Sparky',t:()=>rstate().words>=300},
  {id:'stars3',ic:'🌟',label:'Proof Detective',d:'Earn 3 stars on a book',t:()=>Object.values(rstate().books).some(b=>b.stars>=3)},
];
function checkAch(){ACH.forEach(a=>{if(!ST.achievements.includes(a.id)&&a.t()){ST.achievements.push(a.id);toast(badge(a,true),'Award unlocked!',a.label);}});}
function addXP(xp,stars){ST.xp+=xp;ST.stars+=stars;checkAch();save();}

// ═══════════════ WHO'S LEARNING ═══════════════
function renderWho(){
  const list=Object.values(PROFILES.list);
  if(!list.length)return renderAddLearner(null,true);
  setScreen(`<div class="screen active who">
    <div class="who-in">
      <div class="who-mascot">${mascot(110,'wave')}</div>
      <div class="brand">LearnSpark</div>
      <div class="brand-sub">Virginia SOL learning at home</div>
      <h1 class="who-h">Who's learning today?</h1>
      <div class="who-grid">
        ${list.map(p=>`<button class="who-card" onclick="pickLearner('${p.id}')">
          <span class="who-av">${avImg(p.avatar)}</span><span class="who-n">${esc(p.name)}</span>
          <span class="who-g">Grade ${p.grade} · ${p.xp} XP</span></button>`).join('')}
        <button class="who-card who-add" onclick="renderAddLearner()"><span class="who-av">＋</span><span class="who-n">Add learner</span><span class="who-g">New profile</span></button>
      </div>
    </div></div>`);
}
function pickLearner(id){activateProfile(id);FX.click();renderDash();}

let _form={};
function renderAddLearner(editId,first){
  const p=editId?PROFILES.list[editId]:null;
  _form={id:editId||null,name:p?p.name:'',grade:p?normGrade(p.grade):0,avatar:p?p.avatar:AVATARS[Object.keys(PROFILES.list).length%AVATARS.length]};
  setScreen(`<div class="screen active who">
    <div class="who-in">
      <div class="who-mascot">${mascot(96,'happy')}</div>
      <div class="brand">LearnSpark</div>
      <div class="brand-sub">${first?'Welcome! Let\'s set up your first learner.':(p?'Edit learner':'Add a learner')}</div>
      <div class="w-card">
        <div class="f-label">Pick an avatar</div>
        <div class="av-grid">${AVATARS.map(a=>`<button class="av-btn${a===_form.avatar?' sel':''}" onclick="formAvatar(this,'${a}')" aria-label="${AVATAR_FILE[a]||'picture'}">${avImg(a)}</button>`).join('')}</div>
        <div class="f-label">Name</div>
        <input class="f-input" id="nameIn" maxlength="24" placeholder="Type a name…" value="${esc(_form.name)}" oninput="_form.name=this.value.trim();formCheck()">
        <div class="f-label">Grade</div>
        <div class="g-grid">${LEVELS.map(([g,l,d])=>`<button class="g-btn${g===_form.grade?' sel':''}" data-g="${g}" onclick="formGrade(${g})">${l}<small>${d}</small></button>`).join('')}</div>
        <button class="go-btn" id="goBtn" disabled onclick="formSave()">${p?'Save changes':'Start learning ✨'}</button>
        ${Object.keys(PROFILES.list).length?`<button class="link-btn" onclick="${p?'renderDash()':'renderWho()'}">Cancel</button>`:''}
      </div>
    </div></div>`);
  formCheck();
}
function formAvatar(btn,a){_form.avatar=a;document.querySelectorAll('.av-btn').forEach(b=>b.classList.toggle('sel',b===btn));}
function formGrade(g){_form.grade=g;document.querySelectorAll('.g-btn').forEach(b=>b.classList.toggle('sel',+b.dataset.g===g));formCheck();}
function formCheck(){const b=document.getElementById('goBtn');if(b)b.disabled=!(_form.name&&_form.grade);}
function formSave(){
  if(!(_form.name&&_form.grade))return;
  if(_form.id){const p=PROFILES.list[_form.id];p.name=_form.name;p.grade=_form.grade;p.avatar=_form.avatar;
    if(ST.id===_form.id){ST.name=p.name;ST.grade=p.grade;ST.avatar=p.avatar;save();}else persistProfiles();
    return renderDash();}
  const p=blankLearner(_form.name,_form.grade,_form.avatar);PROFILES.list[p.id]=p;persistProfiles();
  activateProfile(p.id);renderDash();
}
// kept for compatibility with older calls
function startApp(){formSave();}

// ═══════════════ HOME ═══════════════
function recommended(n){
  const all=allSkills();const out=[];const seen=new Set();
  const add=x=>{const k=x.subj+'|'+x.st.code;if(!seen.has(k)&&out.length<n){seen.add(k);out.push(x);}};
  if(ST.lastSkill){const x=all.find(a=>a.subj===ST.lastSkill.subj&&a.st.code===ST.lastSkill.code);
    if(x&&scoreOf(x.subj,x.st.code)<100)add(x);}
  all.filter(x=>{const s=getSkill(x.subj,x.st.code);return s&&s.n&&s.score<80;})
     .sort((a,b)=>scoreOf(a.subj,a.st.code)-scoreOf(b.subj,b.st.code)).forEach(add);
  // then the first untouched skill in each subject, round-robin
  const fresh=Object.keys(SUBJ).map(s=>skillsFor(s).filter(st=>!getSkill(s,st.code)||!getSkill(s,st.code).n).map(st=>({subj:s,st})));
  for(let i=0;out.length<n&&i<20;i++)fresh.forEach(f=>{if(f[i])add(f[i]);});
  all.filter(x=>scoreOf(x.subj,x.st.code)<100).forEach(add);
  return out;
}
function renderDash(){
  if(!ST.id)return renderWho();
  const gc=gradeContent();const tq=todayQ();const goal=ST.dailyGoal;const gp=Math.min(100,Math.round(tq/goal*100));
  const streak=dayStreak();const acc=ST.totalQ?Math.round(ST.totalC/ST.totalQ*100)+'%':'—';
  setScreen(`<div id="dash" class="screen active home">
    <header class="home-top">${heroDeco()}
      <div class="home-row">
        <button class="me" onclick="renderWho()" title="Switch learner"><span class="me-av">${avImg(ST.avatar)}</span>
          <span><span class="me-hi">Hi, ${esc(ST.name)}!</span><span class="me-sub">Grade ${ST.grade} · Virginia SOL${ST.grade!==gc?` · Grade ${gc} skills`:''}</span></span></button>
        <div class="home-actions">
          <button class="icon-btn" onclick="renderReport()" title="Parent report" aria-label="Parent report">${ic('chart')}</button>
          <button class="icon-btn" onclick="openSettings()" title="Settings" aria-label="Settings">${ic('gear')}</button>
        </div>
      </div>
      <div class="hero-mid">
        <div class="hero-mascot">${mascot(92,tq>=goal?'cheer':'wave')}</div>
        <div class="bubble">${tq>=goal?`You hit today's goal, ${esc(ST.name)}! Everything now is bonus practice.`:tq?`Nice start! ${goal-tq} more question${goal-tq===1?'':'s'} to reach today's goal.`:`Ready to learn, ${esc(ST.name)}? Let's warm up with a skill below.`}</div>
      </div>
      <div class="today">
        <div class="today-ring">${ring(gp,76,'#10B981',`${tq}/${goal}`)}</div>
        <div class="today-txt">
          <div class="today-h">Today's goal: ${goal} questions</div>
          <div class="today-d">${tq} done${tq?` · ${(ST.days[todayKey()]||{}).c||0} correct · ${fmtTime((ST.days[todayKey()]||{}).sec)}`:''}. Change the goal in Settings.</div>
        </div>
        <div class="today-stats">
          <div><b>${streak}${ic('flame','c-flame')}</b><span>day streak</span></div>
          <div><b>${totalMastered()}${ic('medal','c-medal')}</b><span>mastered</span></div>
          <div><b>${ST.xp}</b><span>XP</span></div>
          <div><b>${acc}</b><span>accuracy</span></div>
        </div>
      </div>
    </header>
    <div class="dash-body">
      <div class="tabs" role="tablist">
        <button class="tab ${ST.tab==='learn'?'active':''}" onclick="switchTab('learn')">${ic('books')} Learn</button>
        <button class="tab ${ST.tab==='stories'?'active':''}" onclick="switchTab('stories')">${ic('book')} Stories</button>
        <button class="tab ${ST.tab==='arcade'?'active':''}" onclick="switchTab('arcade')">${ic('gamepad')} Arcade</button>
        <button class="tab ${ST.tab==='awards'?'active':''}" onclick="switchTab('awards')">${ic('trophy')} Awards</button>
      </div>
      <div id="tabContent"></div>
    </div>
  </div>`);
  renderTab();
}
function switchTab(t){ST.tab=t;document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.textContent.toLowerCase().includes(t)));renderTab();}
function skillChip(x){
  const s=SUBJ[x.subj];const sk=getSkill(x.subj,x.st.code);const sc=sk?sk.score:0;
  return `<button class="rec" onclick="startSkill('${x.subj}','${x.st.code}')">
    ${ring(sc,46,s.color)}
    <span class="rec-txt"><span class="rec-k" style="color:${s.color}">${subjIc(x.subj)} ${s.short} · ${x.st.code}</span>
    <span class="rec-n">${x.st.name}</span>
    <span class="rec-s">${sk&&sk.n?level(sc,sk.n).t:'New skill'}</span></span>
    <span class="rec-go" style="background:${s.color}">${sk&&sk.n?'Continue':'Start'}</span></button>`;
}
function renderTab(){
  const c=document.getElementById('tabContent');if(!c)return;
  if(ST.tab==='learn'){
    const rec=recommended(3);const miss=ST.missed.length;
    c.innerHTML=`
      <div class="sec-title">Recommended for you</div>
      <div class="rec-list">${rec.map(skillChip).join('')}</div>
      ${(()=>{const b=STORIES.filter(x=>x.level===myLevel()).find(x=>!rstate().books[x.id])||STORIES.find(x=>x.level===myLevel());
        return `<button class="story-promo" onclick="openBook('${b.id}')"><span class="sp-cover">${scene(b.cover,'')}</span>
        <span class="rec-txt"><span class="rec-k" style="color:#6D28D9">${ic('book')} Story Time</span><span class="rec-n">${b.title}</span>
        <span class="rec-s">Read it out loud to Sparky</span></span><span class="rec-go" style="background:#7E4BC9">Read</span></button>`;})()}
      ${miss?`<button class="review-card" onclick="startReview()">
        <span class="review-ic">${ic('refresh')}</span><span><b>Review your mistakes</b><br><small>${miss} question${miss===1?'':'s'} waiting — fix them to clear the list</small></span>
        <span class="rec-go" style="background:#7C3AED">Review</span></button>`:''}
      ${strategyCard()}
      <div class="duo">
        <button class="rec tool-card" onclick="renderTestSetup()"><span class="tool-ic" style="background:#E3EAF5;color:#2F6FE0">${ic('clipboard')}</span><span class="rec-txt"><span class="rec-n">SOL Practice Test</span><span class="rec-s">Flag, cross out, review, submit — like the real test</span></span></button>
        <button class="rec tool-card" onclick="startFamily()"><span class="tool-ic" style="background:#FDE3DC;color:#E36B4E">${ic('people')}</span><span class="rec-txt"><span class="rec-n">Family Challenge</span><span class="rec-s">Same 5 questions — kid vs. grown-up</span></span></button>
      </div>
      <div class="sec-title">Subjects</div>
      <div class="subj-grid">${Object.entries(SUBJ).map(([k,s])=>{
        const sk=skillsFor(k);const m=sk.filter(st=>scoreOf(k,st.code)>=100).length;
        const avg=sk.length?Math.round(sk.reduce((a,st)=>a+scoreOf(k,st.code),0)/sk.length):0;
        return `<button class="subj ${k}" onclick="openSubject('${k}')">
          <span class="subj-art-wrap" style="background:${s.lt}">${subjArt(k,110)}</span>
          <span class="subj-t" style="color:${s.color}">${s.card||s.label}</span>
          <span class="subj-d">${sk.length} SOL skills · ${m} mastered</span>
          <span class="subj-bar"><span class="subj-fill" style="width:${avg}%;background:${s.color}"></span></span>
          <span class="subj-n">${avg}% of the way to mastery</span></button>`;}).join('')}
      </div>`;
  } else if(ST.tab==='stories'){
    renderStoriesTab(c);
  } else if(ST.tab==='arcade'){
    c.innerHTML=`<div class="sec-title">Pick a game</div>
      <p class="muted" style="margin:-6px 0 12px">Games are a fun break. Real progress comes from practicing skills in Learn.</p>
      <div class="game-grid">${Object.entries(GAMES).map(([k,g])=>{const hi=ST.gameHi[k]||0;
        return `<button class="gcard" style="background:${g.grad}" onclick="launchGame('${k}')">
          ${hi>0?`<span class="gcard-hi">${ic('trophy')} ${hi}</span>`:''}<span class="gcard-ic">${gameImg(k)}</span>
          <span class="gcard-t">${g.title}</span><span class="gcard-d">${g.desc}</span></button>`;}).join('')}</div>`;
  } else {
    const mast=allSkills().filter(x=>scoreOf(x.subj,x.st.code)>=100);
    c.innerHTML=`${renderShop()}<div class="sec-title">Awards · ${ST.achievements.length}/${ACH.length}</div>
      <div class="award-grid">${ACH.map(a=>{const got=ST.achievements.includes(a.id);
        return `<div class="award${got?'':' locked'}"><div class="award-ic">${badge(a,got)}</div><div class="award-n">${a.label}</div><div class="award-d">${a.d}</div></div>`;}).join('')}</div>
      <div class="sec-title">Mastered skills · ${mast.length}</div>
      ${mast.length?`<div class="rec-list">${mast.map(skillChip).join('')}</div>`:
        `<div class="empty">${mascot(70,'think')}<br>No mastered skills yet. Reach a SmartScore of 100 in any skill to earn its medal</div>`}`;
  }
}

// ═══════════════ SKILL MAP ═══════════════
let _filter='all';
function familyOf(code){const m=code.match(/^\d\.([A-Z]+)\./);if(m)return m[1];return G4_FAMILY[code]||null;}
function openSubject(subj,filter){
  ST.subject=subj;if(filter)_filter=filter;const s=SUBJ[subj];const gc=gradeContent();
  const sk=skillsFor(subj);
  const keep=st=>{const r=getSkill(subj,st.code);const n=r?r.n:0,sc=r?r.score:0;
    return _filter==='all'||(_filter==='todo'&&!n)||(_filter==='doing'&&n&&sc<100)||(_filter==='done'&&sc>=100);};
  const row=st=>{const r=getSkill(subj,st.code);const n=r?r.n:0,sc=r?r.score:0;const lv=level(sc,n);
    return `<div class="skill">
      <button class="skill-main" onclick="startSkill('${subj}','${st.code}')">
        <span class="sk-thumb">${art(skArt(subj,st.code),1)}</span>${ring(sc,52,s.color)}
        <span class="skill-info"><span class="skill-code" style="background:${s.lt};color:${s.dk}">SOL ${st.code}</span>${typeof STUDY!=='undefined'&&STUDY[st.gen]?`<span class="sg-badge">📘 Study guide${sgDone(st.gen)?' ✓':''}</span>`:''}
        <span class="skill-name">${st.name}</span><span class="skill-desc">${st.desc}</span></span>
        <span class="lv ${lv.cls}">${lv.t}</span></button>
      <button class="skill-learn" onclick="openLesson('${subj}','${st.code}')" title="Learn it first" aria-label="${typeof STUDY!=='undefined'&&STUDY[st.gen]?'Study guide':'Lesson'} for ${esc(st.name)}">${ic('lesson')}</button>
    </div>`;};
  let body='';
  if(subj==='math'){
    const groups={};sk.filter(keep).forEach(st=>{const f=familyOf(st.code)||'other';(groups[f]=groups[f]||[]).push(st);});
    body=Object.keys(FAMILY).filter(f=>groups[f]).map(f=>`<div class="fam"><div class="fam-h"><span class="fam-code" style="background:${s.color}">${gc}.${f}</span>${FAMILY[f]}</div>${groups[f].map(row).join('')}</div>`).join('');
  } else body=sk.filter(keep).map(row).join('');
  const counts={all:sk.length,todo:sk.filter(st=>!(getSkill(subj,st.code)||{}).n).length,
    doing:sk.filter(st=>{const r=getSkill(subj,st.code);return r&&r.n&&r.score<100;}).length,
    done:sk.filter(st=>scoreOf(subj,st.code)>=100).length};
  setScreen(`<div id="strands" class="screen active">
    <div class="topbar calm" style="--acc:${s.band}">
      <button class="tb-back" onclick="renderDash()" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">${subjTitle(subj)}</div>
      <div class="tb-sub" style="color:rgba(255,255,255,.9)">Grade ${gc} · ${counts.done} of ${counts.all} skills mastered</div></div>
      <div class="tb-art">${subjArt(subj,96)}</div>
    </div>
    <div class="strand-body">
      <div class="chips">${[['all','All'],['todo','Not started'],['doing','In progress'],['done','Mastered']].map(([k,l])=>
        `<button class="chip${_filter===k?' on':''}" style="${_filter===k?`background:${s.color};border-color:${s.color}`:''}" onclick="openSubject('${subj}','${k}')">${l} <b>${counts[k]}</b></button>`).join('')}</div>
      ${body||`<div class="empty">Nothing here yet. Try another filter.</div>`}
      <p class="muted" style="margin-top:14px">Tap a skill to practice. The book button opens a quick lesson. Questions are made fresh every time, so practice as long as you like.</p>
    </div></div>`);
}

// ═══════════════ LESSON (learn it first) ═══════════════
function startSkill(subj,code){
  const r=getSkill(subj,code);
  if(!r||!r.n)return openLesson(subj,code,true);
  beginPractice(subj,code);
}
function openLesson(subj,code,firstTime){
  const st=findSkill(subj,code);if(!st)return renderDash();const s=SUBJ[subj];
  const ideas=LESSONS[st.gen]||[st.desc];
  setScreen(`<div class="screen active lesson">
    <div class="topbar calm" style="--acc:${s.band}">
      <button class="tb-back" onclick="openSubject('${subj}')" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">${st.name}</div>
      <div class="tb-sub" style="color:rgba(255,255,255,.9)">SOL ${st.code} · Learn it first</div></div>
    </div>
    <div class="act-body">
      <div class="qc">
        <div class="les-art">${art(skArt(subj,code))}</div><div class="les-k" style="color:${s.color}">Key ideas</div>
        <ul class="les-list">${ideas.map(i=>`<li>${i}</li>`).join('')}</ul>
        ${lessonArt(st.gen)?`<div class="dg-wrap" style="margin-top:14px">${lessonArt(st.gen)}</div>`:''}
        <button class="btn btn-sec speak" onclick="narrOrSay(lessonSprite('${st.gen}'),'L:${st.gen}',${esc(JSON.stringify(ideas.join(' ')))},.9)">${ic('speaker')} Read to me</button>
      </div>
      <div class="qc"><div class="les-k" style="color:${s.color}">Watch one worked out</div><div id="exArea"></div>
        <button class="btn btn-sec" style="margin-top:12px" onclick="drawExample('${subj}','${code}')">↻ Show another example</button></div>
      <div class="btns"><button class="btn btn-pri big" style="background:${s.color}" onclick="beginPractice('${subj}','${code}')">${firstTime?'Start practicing →':'Practice this skill →'}</button></div>
    </div></div>`);
  drawExample(subj,code);narrLoad(lessonSprite(st.gen));
}
function exampleHTML(q,color){
  if(q.type==='sentence')return `<div class="q-text">Put these words in order:</div>
    <div class="wbank">${shuf(q.words).map(w=>`<span class="wchip used">${esc(w)}</span>`).join('')}</div>
    <div class="ex-ans">✅ ${esc(q.correct)}.</div><div class="ex-why"><b>How:</b> ${q.hint}</div>`;
  if(q.type==='multi')return `<div class="q-text">${esc(q.question)}</div><div class="opts">${q.opts.map((o,i)=>`<div class="opt ${q.answers.includes(o)?'correct':'faded'}"><span class="opt-l">${q.answers.includes(o)?'✓':''}</span>${o}</div>`).join('')}</div><div class="ex-why"><b>Why:</b> ${q.explanation}</div>`;
  if(q.type==='order')return `<div class="q-text">${esc(q.question)}</div><ol class="ex-order">${q.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="ex-why"><b>Why:</b> ${q.explanation}</div>`;
  if(q.type==='race')return `${q.passage?`<div class="passage" style="border-color:${color}">${q.passage}</div>`:''}
    <div class="q-text">${q.question}</div>
    ${['R','A','C','E'].map(l=>`<div class="race-m"><b>${l}:</b> ${q.model[l]}</div>`).join('')}`;
  const dg=q.dgSvg?{svg:q.dgSvg}:diagram(q,color);
  return `${q.passage?`<div class="passage" style="border-color:${color}">${q.passage}</div>`:''}
    <div class="q-text">${String(dg&&dg.text||q.question).replace(/\n/g,'<br>')}</div>
    ${dg?`<div class="dg-wrap">${dg.svg}</div>`:''}
    <div class="opts">${q.opts.map((o,i)=>`<div class="opt ${String(o)===String(q.answer)?'correct':'faded'}"><span class="opt-l">${'ABCDEF'[i]}</span>${o}</div>`).join('')}</div>
    <div class="ex-why"><b>How to solve it:</b> ${q.explanation||''}</div>`;
}
function drawExample(subj,code){
  const st=findSkill(subj,code);const el=document.getElementById('exArea');if(!st||!el)return;
  el.innerHTML=exampleHTML(makeQ(st.gen),SUBJ[subj].color);
}

// ═══════════════ PRACTICE (SmartScore) ═══════════════
const SESSION={active:false};
function beginPractice(subj,code){
  const st=findSkill(subj,code);if(!st)return renderDash();
  const r=ensureSkill(subj,code);
  Object.assign(SESSION,{mode:'skill',subj,code,gen:st.gen,name:st.name,n:0,c:0,sec:0,start:Date.now(),
    startScore:r.score,run:0,wrongRun:0,recent:[],q:null,answered:false,needReview:false,justMastered:false});
  ST.subject=subj;ST.lastSkill={subj,code};save();
  renderPracticeShell();nextQuestion();
}
function startReview(){
  if(!ST.missed.length)return renderDash();
  Object.assign(SESSION,{mode:'review',subj:ST.missed[0].subj,code:null,name:'Review mistakes',n:0,c:0,sec:0,start:Date.now(),
    fixed:0,queue:ST.missed.map(m=>m.id),run:0,wrongRun:0,recent:[],q:null,answered:false,needReview:false,justMastered:false});
  renderPracticeShell();nextQuestion();
}
function sessColor(){return SESSION.mode==='review'?'#7C3AED':SUBJ[SESSION.subj].color;}
function renderPracticeShell(){
  const col=sessColor();const s=SUBJ[SESSION.subj];
  const dk=SESSION.mode==='review'?'#4C1D95':s.dk;
  const sub=SESSION.mode==='review'?'Fix them to clear the list':`SOL ${SESSION.code} · ${s.label}`;
  setScreen(`<div id="activity" class="screen active">
    <div class="act-top calm" style="--acc:${SESSION.mode==='review'?'#7C5CFA':s.band}">
      <button class="tb-back" style="background:rgba(255,255,255,.2);color:#fff" onclick="endSession()" aria-label="Finish">←</button>
      <div style="flex:1;min-width:0"><div class="act-t">${SESSION.mode==='review'?ic('refresh'):subjIc(SESSION.subj||ST.subject)} ${SESSION.name}</div>
      <div class="act-sub">${sub}</div></div>
      <button class="act-finish" onclick="endSession()">Finish</button>
    </div>
    <div class="prac">
      <main class="prac-main" id="actBody" aria-live="polite"></main>
      <aside class="side">
        ${SESSION.mode==='review'?`<div class="side-art">${art('gen_review',1)}</div>`:`<div class="side-art">${art(skArt(SESSION.subj,SESSION.code),1)}</div>`}
        <div class="side-box"><div class="side-l">Questions</div><div class="side-v" id="sQ">0</div></div>
        <div class="side-box"><div class="side-l">Time</div><div class="side-v" id="sT">00:00</div></div>
        ${SESSION.mode==='review'
          ?`<div class="side-box side-score"><div class="side-l">Left to fix</div><div class="side-v" id="sLeft">${SESSION.queue.length}</div></div>`
          :`<div class="side-box side-score"><div class="side-l">SmartScore</div><div id="sRing">${ring(scoreOf(SESSION.subj,SESSION.code),70,col)}</div><div class="side-lv" id="sLv"></div></div>`}
      </aside>
    </div></div>`);
  SESSION.active=true;
  _tick=setInterval(()=>{const el=document.getElementById('sT');if(el)el.textContent=clock((Date.now()-SESSION.start)/1000);},1000);
  updateSide();
}
function updateSide(){
  const q=document.getElementById('sQ');if(q)q.textContent=SESSION.n;
  if(SESSION.mode==='review'){const l=document.getElementById('sLeft');if(l)l.textContent=SESSION.queue.length;return;}
  const r=getSkill(SESSION.subj,SESSION.code)||{score:0,n:0};
  const rg=document.getElementById('sRing');if(rg)rg.innerHTML=ring(r.score,70,sessColor());
  const lv=document.getElementById('sLv');if(lv){const L=level(r.score,r.n||1);lv.textContent=L.t;lv.className='side-lv '+L.cls;}
}
function nextQuestion(){
  let q;
  if(SESSION.mode==='review'){
    if(!SESSION.queue.length)return endSession();
    const m=ST.missed.find(x=>x.id===SESSION.queue[0]);
    if(!m){SESSION.queue.shift();return nextQuestion();}
    SESSION.subj=m.subj;SESSION.reviewItem=m;q=JSON.parse(JSON.stringify(m.q));
    if(q.opts)q.opts=shuf(q.opts);
  } else {
    for(let i=0;i<15;i++){q=makeQ(SESSION.gen);const sig=(q.passage||'')+q.question+(q.correct||'');
      if(!SESSION.recent.includes(sig)){SESSION.recent.push(sig);if(SESSION.recent.length>10)SESSION.recent.shift();break;}}
  }
  SESSION.q=q;SESSION.answered=false;SESSION.qStart=Date.now();
  const body=document.getElementById('actBody');if(!body)return;
  body.innerHTML='';renderQuestion(q,body);
  if(ST.settings.autoRead&&q.type==='mc')speakQuestion();
}
function qHeader(q,col){
  const tag=SESSION.mode==='review'&&SESSION.reviewItem?`<span class="sol-tag" style="background:${SUBJ[SESSION.reviewItem.subj].color}">${SUBJ[SESSION.reviewItem.subj].short} · SOL ${SESSION.reviewItem.code}</span>`
    :(q.sol?`<span class="sol-tag" style="background:${col}">SOL ${q.sol}</span>`:'');
  return `<div class="q-top"><span class="q-badge" style="background:${col}18;color:${col}">${q.badge||'Question'}</span>${tag}
    ${voiceOK()?`<button class="speak-mini" onclick="speakQuestion()" title="Read the question to me" aria-label="Read the question aloud">${ic('speaker')}</button>`:''}</div>`;
}
function renderQuestion(q,body){
  const col=sessColor();
  const card=document.createElement('div');card.className='qc';
  if(q.type==='sentence'){
    card.innerHTML=`${qHeader(q,col)}<div class="q-text">Put the words in the correct order:</div>
      <div class="sm-label">Word bank — tap to add</div><div class="wbank" id="wbank"></div>
      <div class="sm-label">Your sentence — tap a word to remove it</div><div class="sdrop" id="sdrop"></div>
      <div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint}</div>`;
    body.appendChild(card);
    SESSION.words=shuf(q.words);SESSION.placed=[];drawSentence();
    actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button><button class="btn btn-pri" style="background:${col}" onclick="checkSentence()">Check</button>`);
    return;
  }
  if(q.type==='race'){
    const rc={R:'#2563EB',A:'#0891B2',C:'#059669',E:'#7C3AED'};
    const rl={R:'Restate the question',A:'Answer it directly',C:'Cite evidence from the text',E:'Explain how it proves your answer'};
    card.innerHTML=`${qHeader(q,col)}<div class="passage" style="border-color:${col}">${q.passage}</div>
      <div class="q-text">${q.question}</div><div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint}</div>
      ${['R','A','C','E'].map(l=>`<label class="race-l" style="color:${rc[l]}">${l} — ${rl[l]}</label>
        <textarea class="txt-in" id="race${l}" rows="2" placeholder="Write your ${l} here…"></textarea>`).join('')}`;
    body.appendChild(card);
    actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button><button class="btn btn-pri" style="background:${col}" onclick="showRaceModel()">Compare with model →</button>`);
    return;
  }
  if(q.type==='multi'){
    card.innerHTML=`${qHeader(q,col)}<div class="q-text">${esc(q.question)}</div><div class="sm-label">Select every correct answer, then tap Check.</div>
      <div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint||''}</div>
      <div class="opts" id="opts">${q.opts.map((o,i)=>`<button class="opt multi" data-i="${i}" aria-pressed="false" onclick="toggleMulti(${i})"><span class="opt-l chk">✓</span><span>${o}</span></button>`).join('')}</div>`;
    body.appendChild(card);SESSION.sel=new Set();
    actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button><button class="btn btn-pri" style="background:${col}" onclick="checkMulti()">Check</button>`);return;
  }
  if(q.type==='order'){
    card.innerHTML=`${qHeader(q,col)}<div class="q-text">${esc(q.question)}</div>
      <div class="sm-label">Tap them in order — first to last</div><div class="wbank order" id="wbank"></div>
      <div class="sm-label">Your order — tap one to take it back</div><div class="sdrop order" id="sdrop"></div>
      <div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint||''}</div>`;
    body.appendChild(card);SESSION.words=shuf(q.items.slice());SESSION.placed=[];drawSentence();
    actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button><button class="btn btn-pri" style="background:${col}" onclick="checkOrder()">Check</button>`);return;
  }
  const dg=q.dgSvg?{svg:q.dgSvg}:diagram(q,col);q._display=dg&&dg.text?dg.text:null;
  card.innerHTML=`${qHeader(q,col)}
    ${q.passage?`<div class="passage" style="border-color:${col}">${q.passage}</div>`:''}
    ${(()=>{SESSION.wp=!dg&&SESSION.subj==='math'&&ST.settings.wpHelp!==false&&isWordProblem(q);return SESSION.wp?wpWrap(q):`<div class="q-text">${String(q._display||q.question).replace(/\n/g,'<br>')}</div>`;})()}
    ${dg?`<div class="dg-wrap">${dg.svg}</div>`:''}
    <div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint||''}</div>
    <div class="opts${SESSION.wp?' wp-hide':''}" id="opts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}" onclick="pickOpt(${i})"><span class="opt-l">${'ABCDEF'[i]}</span><span>${o}</span></button>`).join('')}</div>
    ${SESSION.wp?`<button class="link-btn wp-skip" onclick="wpSkip();this.remove()">Skip the steps</button>`:''}`;
  body.appendChild(card);
  actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button>`);
}
function actionBar(body,inner){
  const fb=document.createElement('div');fb.id='fbCard';body.appendChild(fb);
  const b=document.createElement('div');b.className='btns';b.id='actBtns';b.innerHTML=inner;body.appendChild(b);
}
function showHint(){const h=document.getElementById('hintBox');if(h){h.classList.add('show');SESSION.hinted=true;}}
function pickOpt(i){
  if(SESSION.answered)return;const q=SESSION.q;const correct=String(q.opts[i])===String(q.answer);
  document.querySelectorAll('#opts .opt').forEach(btn=>{btn.disabled=true;const bi=+btn.dataset.i;
    if(String(q.opts[bi])===String(q.answer))btn.classList.add('correct');else if(bi===i)btn.classList.add('wrong');else btn.classList.add('faded');});
  record(correct,q.answer,q.explanation);
}
function toggleMulti(i){if(SESSION.answered)return;const b=document.querySelector(`#opts .opt[data-i="${i}"]`);
  if(SESSION.sel.has(i)){SESSION.sel.delete(i);b.classList.remove('sel');b.setAttribute('aria-pressed','false');}else{SESSION.sel.add(i);b.classList.add('sel');b.setAttribute('aria-pressed','true');}FX.click();}
function checkMulti(){
  if(SESSION.answered)return;const q=SESSION.q;if(!SESSION.sel.size)return showHint();
  const want=new Set(q.answers);let ok=SESSION.sel.size===want.size;
  document.querySelectorAll('#opts .opt').forEach(b=>{const i=+b.dataset.i,o=q.opts[i],isA=want.has(o),picked=SESSION.sel.has(i);b.disabled=true;
    if(isA)b.classList.add('correct');else if(picked)b.classList.add('wrong');else b.classList.add('faded');if(isA!==picked)ok=false;});
  record(ok,q.answers.join(', '),q.explanation);
}
function checkOrder(){
  if(SESSION.answered)return;const q=SESSION.q;if(SESSION.placed.length<q.items.length)return showHint();
  const built=SESSION.placed.map(i=>SESSION.words[i]);const ok=built.every((x,i)=>x===q.items[i]);
  record(ok,q.items.join(' → '),q.explanation);
}
function drawSentence(){
  const bank=document.getElementById('wbank'),drop=document.getElementById('sdrop');if(!bank)return;
  bank.innerHTML=SESSION.words.map((w,i)=>SESSION.placed.includes(i)?`<span class="wchip used">${esc(w)}</span>`:
    `<button class="wchip" onclick="sAdd(${i})">${esc(w)}</button>`).join('');
  drop.innerHTML=SESSION.placed.length?SESSION.placed.map((wi,pi)=>`<button class="pchip" style="border-color:${sessColor()};color:${sessColor()}" onclick="sRemove(${pi})">${esc(SESSION.words[wi])}</button>`).join(''):
    '<span class="ph">Tap words above…</span>';
}
function sAdd(i){if(SESSION.answered)return;SESSION.placed.push(i);FX.click();drawSentence();}
function sRemove(pi){if(SESSION.answered)return;SESSION.placed.splice(pi,1);drawSentence();}
function checkSentence(){
  if(SESSION.answered)return;const q=SESSION.q;
  if(!SESSION.placed.length)return showHint();
  const built=SESSION.placed.map(i=>SESSION.words[i]).join(' ');
  const correct=built.trim().toLowerCase()===q.correct.trim().toLowerCase();
  record(correct,q.correct+'.',correct?'Every word is in the right place.':`You wrote: “${esc(built)}”. ${q.hint}`);
}
function showRaceModel(){
  if(SESSION.answered)return;const m=SESSION.q.model;const rc={R:'#2563EB',A:'#0891B2',C:'#059669',E:'#7C3AED'};
  document.querySelectorAll('.txt-in').forEach(t=>t.readOnly=true);
  const fb=document.getElementById('fbCard');
  fb.className='fb2 info';
  fb.innerHTML=`<div class="fb2-h">Model answer — compare with yours</div>
    <div class="fb2-b">The ideas matter, not the exact words.</div>
    ${['R','A','C','E'].map(l=>`<div class="race-m" style="border-color:${rc[l]}"><b style="color:${rc[l]}">${l}:</b> ${m[l]}</div>`).join('')}
    <div class="fb2-b" style="margin-top:10px"><b>Be honest — did your answer have all four parts?</b></div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-sec" onclick="raceSelf(false)">I missed a part</button>
    <button class="btn btn-pri" style="background:#10B981" onclick="raceSelf(true)">Yes, all 4 parts ✓</button>`;
}
function raceSelf(ok){SESSION.raceSelf=true;record(ok,null,ok?'Great RACE response!':'Look back at the model and notice the part you missed. You\'ll get it next time.');}

// core scoring for every answer
function record(correct,answerText,expl){
  if(SESSION.answered)return;SESSION.answered=true;
  const sec=Math.min(120,(Date.now()-SESSION.qStart)/1000);
  SESSION.n++;SESSION.sec+=sec;if(correct)SESSION.c++;
  ST.totalQ++;if(correct)ST.totalC++;
  ST.streak=correct?ST.streak+1:0;ST.bestStreak=Math.max(ST.bestStreak||0,ST.streak);
  const d=dayRec();const before=d.q;d.q++;if(correct)d.c++;d.sec+=sec;
  ST.subjectN[SESSION.subj]=(ST.subjectN[SESSION.subj]||0)+1;
  let delta=0;
  if(SESSION.mode==='skill'){
    const r=ensureSkill(SESSION.subj,SESSION.code);const was=r.score;
    r.n++;if(correct)r.c++;r.sec+=sec;r.last=Date.now();
    r.score=correct?Math.min(100,r.score+smartGain(r.score)):Math.max(0,r.score-smartLoss(r.score));
    delta=r.score-was;r.best=Math.max(r.best,r.score);
    if(r.score>=100&&was<100){r.mastered=Date.now();SESSION.justMastered=true;}
    ST.strandN[SESSION.subj+'_'+SESSION.code]=(ST.strandN[SESSION.subj+'_'+SESSION.code]||0)+1;
    if(!correct&&SESSION.q.type!=='race')rememberMiss(SESSION.q,SESSION.subj,SESSION.code);
  } else {
    const id=SESSION.queue.shift();
    if(correct){ST.missed=ST.missed.filter(m=>m.id!==id);SESSION.fixed++;}
    else SESSION.queue.push(id);
  }
  SESSION.run=correct?SESSION.run+1:0;SESSION.wrongRun=correct?0:SESSION.wrongRun+1;
  if(SESSION.mode==='skill'&&SESSION.wrongRun>=2){SESSION.needReview=true;SESSION.wrongRun=0;}
  if(correct)ST.xp+=5;
  if(correct&&SESSION.run&&SESSION.run%5===0){ST.stars++;}
  // feedback
  const fb=document.getElementById('fbCard');
  const praise=pick(['Correct!','Nice work!','You got it!','Excellent!','Spot on!']);
  if(correct){
    fb.className='fb2 ok';
    fb.innerHTML=`<div class="fb2-h">${praise}${delta?` <span class="gain">+${delta}</span>`:''}${SESSION.run>=3?` <span class="fire">${ic('flame')} ${SESSION.run} in a row</span>`:''}</div>
      ${expl?`<div class="fb2-b">${expl}</div>`:''}`;
    FX.correct();if(SESSION.run>=3)FX.combo&&FX.combo();
  } else {
    fb.className='fb2 err';
    fb.innerHTML=`<div class="fb2-h">Not quite — let's learn from it${delta?` <span class="loss">${delta}</span>`:''}</div>
      ${answerText!==null&&answerText!==undefined?`<div class="fb2-ans">The correct answer is <b>${answerText}</b></div>`:''}
      ${expl?`<div class="fb2-b"><b>Why:</b> ${expl}</div>`:''}`;
    FX.wrong();
  }
  const label=SESSION.justMastered?'See your medal →':SESSION.needReview?'Let\'s review together →':correct?'Next question →':'Got it →';
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:${sessColor()}" onclick="afterAnswer()">${label}</button>`;
  setTimeout(()=>{const b=document.getElementById('nextBtn');if(b)b.focus({preventScroll:true});},30);
  updateSide();
  if(before<ST.dailyGoal&&d.q>=ST.dailyGoal){toast(ic('target'),'Daily goal reached!',`${ST.dailyGoal} questions today`);FX.win();confetti(window.innerWidth/2,120,50);}
  checkAch();save();
}
function rememberMiss(q,subj,code){
  const sig=(q.passage||'')+q.question;
  ST.missed=ST.missed.filter(m=>(m.q.passage||'')+m.q.question!==sig);
  const qc=Object.assign({},q);delete qc._display;ST.missed.push({id:'m'+Date.now().toString(36)+Math.floor(Math.random()*1e4),subj,code,q:qc,at:Date.now()});
  if(ST.missed.length>30)ST.missed=ST.missed.slice(-30);
}
function afterAnswer(){
  if(SESSION.justMastered){SESSION.justMastered=false;return showMastery();}
  if(SESSION.needReview){SESSION.needReview=false;return showReviewBreak();}
  nextQuestion();
}
function showReviewBreak(){
  const st=findSkill(SESSION.subj,SESSION.code);const col=sessColor();
  const body=document.getElementById('actBody');
  body.innerHTML=`<div class="qc review-break"><div class="rb-head">${mascot(64,'think')}<div class="les-k" style="color:${col}">Let's slow down and look at one together.</div></div>
    <ul class="les-list">${(LESSONS[st.gen]||[st.desc]).map(i=>`<li>${i}</li>`).join('')}</ul></div>
    <div class="qc"><div class="les-k" style="color:${col}">Worked example</div>${exampleHTML(makeQ(st.gen),col)}</div>
    <div class="btns"><button class="btn btn-pri big" id="nextBtn" style="background:${col}" onclick="nextQuestion()">I'm ready — next question →</button></div>`;
}
function showMastery(){
  const col=sessColor();addXP(50,10);FX.win();confetti(window.innerWidth/2,window.innerHeight/3,90);
  document.getElementById('actBody').innerHTML=`<div class="qc mastery">
    <div class="mast-img">${art('gen_mastered')}</div><div class="m-t">Skill mastered!</div>
    <div class="m-s">${SESSION.name} · SOL ${SESSION.code}</div>
    <div class="m-d">You reached a SmartScore of 100. That means you really know this skill. +50 XP · +10 stars</div>
    <div class="btns"><button class="btn btn-sec" onclick="showCertificate('Skill Mastered: ${esc(SESSION.name)}','reached a SmartScore of 100 in SOL ${SESSION.code}')">🎓 Certificate</button><button class="btn btn-sec" onclick="endSession()">See summary</button>
    <button class="btn btn-pri" style="background:${col}" onclick="goNextSkill()">Next skill →</button></div></div>`;
}
function goNextSkill(){const r=recommended(3).find(x=>!(x.subj===SESSION.subj&&x.st.code===SESSION.code));
  if(r)startSkill(r.subj,r.st.code);else renderDash();}
function endSession(){
  if(!SESSION.n){return SESSION.mode==='review'?renderDash():openSubject(SESSION.subj);}
  const col=sessColor();const pct=Math.round(SESSION.c/SESSION.n*100);
  const bonus=Math.min(20,SESSION.c*2);addXP(bonus,SESSION.c>=SESSION.n*0.8&&SESSION.n>=5?2:0);
  const sk=SESSION.mode==='skill'?getSkill(SESSION.subj,SESSION.code):null;
  const from=SESSION.startScore,to=sk?sk.score:0;
  const msg=SESSION.mode==='review'
    ?(SESSION.fixed?`You fixed ${SESSION.fixed} mistake${SESSION.fixed===1?'':'s'}. That's how real learning happens.`:'Mistakes are how we learn. Try these again soon.')
    :to>=100?'Mastered! Time to take on a new skill.':to>from?`Your SmartScore went up by ${to-from}. Keep going to reach 100!`:
     'Some questions were tricky today. A quick lesson can help — then try again.';
  const s=SUBJ[SESSION.subj];
  setScreen(`<div class="screen active" style="background:var(--bg)">
    <div class="act-top calm" style="--acc:${SESSION.mode==='review'?'#7C5CFA':s.band}">
      <div class="act-t" style="text-align:center">Session summary</div></div>
    <div class="act-body"><div class="qc summary">
      ${SESSION.mode==='skill'?`<div class="sum-rings"><div>${ring(from,74,'#94A3B8')}<small>Before</small></div><div class="sum-arrow">→</div><div>${ring(to,96,col)}<small>Now</small></div></div>`:
        `<div class="medal medal-ic">${ic('refresh')}</div>`}
      <div class="m-t">${SESSION.name}</div>
      <div class="m-d">${msg}</div>
      <div class="sum-grid">
        <div><b>${SESSION.n}</b><span>questions</span></div><div><b>${SESSION.c}</b><span>correct</span></div>
        <div><b>${pct}%</b><span>accuracy</span></div><div><b>${fmtTime(SESSION.sec)}</b><span>time</span></div></div>
      <div class="xp-pop">+${bonus} bonus XP</div>
      <div class="btns">
        ${SESSION.mode==='skill'?`<button class="btn btn-sec" onclick="openLesson('${SESSION.subj}','${SESSION.code}')">${ic('lesson')} Lesson</button>
          <button class="btn btn-sec" onclick="beginPractice('${SESSION.subj}','${SESSION.code}')">Keep practicing</button>`:
          (ST.missed.length?`<button class="btn btn-sec" onclick="startReview()">Review again</button>`:'')}
        <button class="btn btn-pri" style="background:${col}" onclick="renderDash()">🏠 Home</button></div>
    </div></div></div>`);
  SESSION.n=0;
}

// ── read aloud (built-in browser speech; nothing is sent anywhere) ──
function voiceOK(){return ST.settings&&ST.settings.readAloud!==false&&typeof window.speechSynthesis!=='undefined';}
function speak(text){
  if(!voiceOK())return;try{speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(text).replace(/−/g,' minus ').replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/___/g,' blank '));
    u.rate=.9;speechSynthesis.speak(u);}catch(e){}
}
function speakQuestion(){
  const q=SESSION.q;if(!q)return;let t=plain(q._display||q.question);
  if(q.opts)t+='. '+q.opts.map((o,i)=>'ABCDEF'[i]+': '+plain(o)).join('. ');
  speak(t);
}

// ── keyboard: 1–4 or A–D picks an answer, Enter goes on ──
document.addEventListener('keydown',e=>{
  if(!SESSION.active)return;const tag=(e.target.tagName||'').toLowerCase();
  if(tag==='textarea'||tag==='input')return;
  if(e.key==='Enter'){const b=document.getElementById('nextBtn');if(b){e.preventDefault();b.click();}return;}
  if(!SESSION.answered&&SESSION.q&&SESSION.q.type==='mc'&&!document.querySelector('#opts.wp-hide')){
    const k=e.key.toLowerCase();const i='1234'.indexOf(k)>=0?'1234'.indexOf(k):'abcd'.indexOf(k);
    if(i>=0&&i<SESSION.q.opts.length)pickOpt(i);
  }
});

// ═══════════════ SETTINGS ═══════════════
function openSettings(){
  const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';
  el.onclick=e=>{if(e.target===el)el.remove();};
  el.innerHTML=`<div class="sheet" role="dialog" aria-label="Settings">
    <div class="sheet-h">Settings <button class="icon-btn" onclick="document.getElementById('sheet').remove()" aria-label="Close">✕</button></div>
    <div class="set-row"><div><b>Daily goal</b><small>Questions per day</small></div>
      <div class="seg">${[10,20,30,50].map(g=>`<button class="${ST.dailyGoal===g?'on':''}" onclick="setGoal(${g},this)">${g}</button>`).join('')}</div></div>
    ${voiceSettingsRows()}
    <div class="set-row"><div><b>Read-aloud button</b><small>Show the speaker button on questions</small></div>
      <button class="toggle ${ST.settings.readAloud!==false?'on':''}" onclick="toggleSet('readAloud',this)"></button></div>
    <div class="set-row"><div><b>Auto read questions</b><small>Read each question as it appears</small></div>
      <button class="toggle ${ST.settings.autoRead?'on':''}" onclick="toggleSet('autoRead',this)"></button></div>
    <div class="set-row"><div><b>Word problem helper</b><small>Tap the numbers and find the question first</small></div>
      <button class="toggle ${ST.settings.wpHelp!==false?'on':''}" onclick="ST.settings.wpHelp=ST.settings.wpHelp===false?true:false;save();this.classList.toggle('on',ST.settings.wpHelp!==false)"></button></div>
    <div class="set-row"><div><b>Story text size</b><small>Size of words in Story Time</small></div>
      <div class="seg">${['S','M','L','XL','XXL'].map((l,i)=>`<button class="${(ST.settings.readSize??1)===i?'on':''}" onclick="ST.settings.readSize=${i};save();this.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===this))">${l}</button>`).join('')}</div></div>
    <div class="set-row"><div><b>Extra letter spacing</b><small>Wider gaps can make words easier to read</small></div>
      <button class="toggle ${ST.settings.readWide?'on':''}" onclick="toggleSet('readWide',this)"></button></div>
    <div class="set-row"><div><b>Sparky can listen</b><small>Use the microphone in Story Time</small></div>
      <button class="toggle ${ST.settings.micOK?'on':''}" onclick="toggleSet('micOK',this)"></button></div>
    <div class="set-row"><div><b>Sound effects</b><small>Dings and celebrations</small></div>
      <button class="toggle ${FX.isOn()?'on':''}" onclick="FX.toggle();this.classList.toggle('on',FX.isOn())"></button></div>
    <div class="sheet-acts">
      <button class="btn btn-sec" onclick="closeSheet();renderAddLearner('${ST.id}')">✏️ Edit ${esc(ST.name)}</button>
      <button class="btn btn-sec" onclick="closeSheet();renderWho()">👥 Switch learner</button>
      <p class="muted about">LearnSpark is an independent practice app. It is not affiliated with or endorsed by the Virginia Department of Education. SmartScores are practice indicators, not SOL scores. Progress is saved only in this browser on this device.</p>
      <button class="btn btn-danger" onclick="resetLearner()">Reset ${esc(ST.name)}'s progress</button>
      <button class="btn btn-danger" onclick="deleteLearner()">Delete ${esc(ST.name)}</button>
    </div></div>`;
  document.body.appendChild(el);
}
function setGoal(g,btn){ST.dailyGoal=g;save();btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===btn));}
function toggleSet(k,btn){const cur=k==='readAloud'?ST.settings[k]!==false:!!ST.settings[k];ST.settings[k]=!cur;save();btn.classList.toggle('on',!cur);}
function closeSheet(){const s=document.getElementById('sheet');if(s)s.remove();}
function resetLearner(){
  if(!window.__ok){return inPageConfirm(`Reset all of ${ST.name}'s progress? This can't be undone.`,'Reset progress',()=>{window.__ok=1;resetLearner();window.__ok=0;});}
  const b=blankLearner(ST.name,ST.grade,ST.avatar);b.id=ST.id;b.dailyGoal=ST.dailyGoal;b.settings=ST.settings;
  PROFILES.list[ST.id]=b;persistProfiles();activateProfile(ST.id);closeSheet();renderDash();
}
function deleteLearner(){
  if(!window.__ok){return inPageConfirm(`Delete ${ST.name}'s profile and all progress?`,'Delete',()=>{window.__ok=1;deleteLearner();window.__ok=0;});}
  delete PROFILES.list[ST.id];PROFILES.active=null;persistProfiles();
  for(const k of Object.keys(ST))delete ST[k];closeSheet();renderWho();
}

// ═══════════════ PARENT REPORT ═══════════════
function renderReport(){
  const gc=gradeContent();const now=new Date();
  const days=[];for(let i=13;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const k=todayKey(d);
    days.push({k,lab:['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()],q:(ST.days[k]||{}).q||0,c:(ST.days[k]||{}).c||0,sec:(ST.days[k]||{}).sec||0});}
  const maxQ=Math.max(5,...days.map(d=>d.q));const wk=days.slice(7);
  const wkQ=wk.reduce((a,d)=>a+d.q,0),wkC=wk.reduce((a,d)=>a+d.c,0),wkSec=wk.reduce((a,d)=>a+d.sec,0);
  const totSec=Object.values(ST.skills).reduce((a,s)=>a+(s.sec||0),0);
  const rows=allSkills().map(x=>{const r=getSkill(x.subj,x.st.code)||{score:0,n:0,c:0,sec:0,last:0};return Object.assign({subj:x.subj,st:x.st},r);});
  const attention=rows.filter(r=>r.n>=8&&r.score<100&&(r.c/r.n<0.65||(r.score<50&&r.n>=12))).sort((a,b)=>a.c/a.n-b.c/b.n);
  const strengths=rows.filter(r=>r.score>=90).sort((a,b)=>b.score-a.score);
  const lastDate=t=>t?new Date(t).toLocaleDateString(undefined,{month:'short',day:'numeric'}):'—';
  const pill=r=>{const L=level(r.score,r.n);return `<span class="lv ${L.cls}">${L.t}</span>`;};
  setScreen(`<div class="screen active report">
    <div class="topbar no-print">
      <button class="tb-back" onclick="renderDash()" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name">📊 Parent report</div><div class="tb-sub">${esc(ST.name)} · Grade ${ST.grade}</div></div>
      <button class="print-btn" onclick="window.print()">🖨️ Print</button>
    </div>
    <div class="rep">
      <div class="rep-head"><div class="rep-av">${avImg(ST.avatar)}</div><div><h1>${esc(ST.name)}'s learning report</h1>
        <p>Grade ${ST.grade} · Virginia SOL (Grade ${gc} skills) · ${now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p></div></div>
      <div class="rep-tiles">
        <div><b>${wkQ}</b><span>questions this week</span></div>
        <div><b>${wkQ?Math.round(wkC/wkQ*100)+'%':'—'}</b><span>accuracy this week</span></div>
        <div><b>${fmtTime(wkSec)}</b><span>practice time this week</span></div>
        <div><b>${totalMastered()}/${allSkills().length}</b><span>skills mastered</span></div>
        <div><b>${dayStreak()}</b><span>day streak</span></div>
        <div><b>${ST.totalQ}</b><span>questions all time · ${fmtTime(totSec)}</span></div>
      </div>
      <h2>Last 14 days</h2>
      <div class="bars" role="img" aria-label="Questions answered per day for the last 14 days">${days.map(d=>
        `<div class="bar-col" title="${d.k}: ${d.q} questions, ${d.c} correct"><div class="bar-v">${d.q||''}</div>
          <div class="bar"><div class="bar-c" style="height:${d.q/maxQ*100}%"><div class="bar-ok" style="height:${d.q?d.c/d.q*100:0}%"></div></div></div>
          <div class="bar-l">${d.lab}</div></div>`).join('')}</div>
      <div class="legend"><span><i style="background:#10B981"></i>correct</span><span><i style="background:#CBD5E1"></i>missed</span></div>
      <div class="rep-two">
        <div class="rep-box warn"><h3>Needs attention</h3>${attention.length?`<ul>${attention.slice(0,6).map(r=>
          `<li><b>${SUBJ[r.subj].short} ${r.st.code}</b> ${r.st.name} — ${Math.round(r.c/r.n*100)}% correct over ${r.n} questions</li>`).join('')}</ul>`:
          '<p>Nothing flagged. Skills show up here after 8+ questions with low accuracy.</p>'}</div>
        <div class="rep-box good"><h3>Strengths</h3>${strengths.length?`<ul>${strengths.slice(0,6).map(r=>
          `<li><b>${SUBJ[r.subj].short} ${r.st.code}</b> ${r.st.name} — SmartScore ${r.score}</li>`).join('')}</ul>`:
          '<p>Skills appear here once they reach a SmartScore of 90 or more.</p>'}</div>
      </div>
      ${Object.entries(SUBJ).map(([k,s])=>`<h2 style="color:${s.dk}">${subjIc(k)} ${s.label}</h2>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>SOL</th><th>Skill</th><th>SmartScore</th><th>Status</th><th>Questions</th><th>Accuracy</th><th>Time</th><th>Last</th></tr></thead>
        <tbody>${rows.filter(r=>r.subj===k).map(r=>`<tr class="${r.n?'':'dim'}"><td>${r.st.code}</td><td>${r.st.name}</td>
          <td><div class="mini"><div style="width:${r.score}%;background:${r.score>=100?'#F59E0B':s.color}"></div></div>${r.score}</td>
          <td>${pill(r)}</td><td>${r.n}</td><td>${r.n?Math.round(r.c/r.n*100)+'%':'—'}</td><td>${r.n?fmtTime(r.sec):'—'}</td><td>${lastDate(r.last)}</td></tr>`).join('')}</tbody></table></div>`).join('')}
      ${(()=>{const r=rstate();const done=STORIES.filter(b=>r.books[b.id]);
        const wk=days.slice(7).reduce((a,d)=>a+((ST.days[d.k]||{}).rsec||0),0);
        const tw=Object.entries(r.tricky).sort((a,b)=>b[1]-a[1]).slice(0,16);
        return `<h2 style="color:#6D28D9">${ic('book')} Story Time</h2>
        <div class="rep-tiles"><div><b>${done.length}/${STORIES.length}</b><span>books finished</span></div>
          <div><b>${r.words}</b><span>words read aloud to Sparky</span></div>
          <div><b>${fmtTime(wk)}</b><span>reading time this week</span></div>
          <div><b>${r.qN?Math.round(r.qC/r.qN*100)+'%':'—'}</b><span>story questions right</span></div>
          <div><b>${r.proofN?Math.round(r.proofC/r.proofN*100)+'%':'—'}</b><span>proof found on first try</span></div>
          <div><b>${r.swapN?r.swapC+'/'+r.swapN:'—'}</b><span>Sound Swap words</span></div></div>
        ${done.length?`<div class="tbl-wrap" style="margin-top:12px"><table class="tbl"><thead><tr><th>Book</th><th>Level</th><th>Stars</th><th>Questions</th><th>Times read</th><th>Last</th></tr></thead><tbody>
          ${done.map(b=>{const x=r.books[b.id];return `<tr><td>${b.title}</td><td>${BOOK_LEVELS[b.level].label}</td><td>${starStr(x.stars)}</td><td>${x.qC}/${x.qN}</td><td>${x.done}</td><td>${lastDate(x.last)}</td></tr>`;}).join('')}</tbody></table></div>`:''}
        <div class="rep-box warn" style="margin-top:12px"><h3>Words Sparky helped with</h3>${tw.length?`<p>${tw.map(([w,n])=>`<span class="tw-chip">${esc(w)}${n>1?` ×${n}`:''}</span>`).join(' ')}</p><p class="muted">Practicing these out loud together is a great way to use a few spare minutes.</p>`:'<p>None yet. Words show up here when your child gets stuck and Sparky reads them.</p>'}</div>`;})()}
      ${(()=>{const x=xs();const t=x.tests.slice(-8).reverse();const fl=(rstate().fluency||[]).slice(-12);
        const chart=fl.length>=2?(()=>{const W=520,H=150,mx=Math.max(...fl.map(f=>f.wcpm))*1.15,mn=0;const px=i=>30+i*(W-50)/(fl.length-1),py=v=>H-24-(v-mn)/(mx-mn)*(H-40);
          return `<svg viewBox="0 0 ${W} ${H}" class="flu-chart" role="img" aria-label="Reading speed over time: ${fl.map(f=>f.wcpm).join(', ')} words per minute">
            <polyline points="${fl.map((f,i)=>px(i)+','+py(f.wcpm)).join(' ')}" fill="none" stroke="#9B5DE5" stroke-width="3"/>
            ${fl.map((f,i)=>`<circle cx="${px(i)}" cy="${py(f.wcpm)}" r="4.5" fill="#9B5DE5"/><text x="${px(i)}" y="${py(f.wcpm)-9}" text-anchor="middle" font-size="12" font-weight="800" fill="#4C1D95">${f.wcpm}</text>`).join('')}
            <line x1="20" y1="${H-24}" x2="${W-10}" y2="${H-24}" stroke="#CBD6E8"/></svg>`;})():'';
        const gnames={detective:'Detective Cases',mapquest:'Map Quest',timeline:'Timeline Dash',whoami:'Who Am I?',pizza:'Pizza Shop',elevator:'Integer Elevator'};
        const gs=Object.keys(gnames).filter(k=>ST.gameHi[k]);
        return `<h2 style="color:#2F4B7C">${ic('clipboard')} Practice tests</h2>${t.length?`<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Time</th><th>Weakest standard</th></tr></thead><tbody>
          ${t.map(r=>{const w=(r.by||[]).filter(b=>b.c<b.n).sort((a,b)=>a.c/a.n-b.c/b.n)[0];return `<tr><td>${lastDate(r.d)}</td><td>${r.label}</td><td><b>${Math.round(r.c/r.n*100)}%</b> (${r.c}/${r.n})</td><td>${fmtTime(r.sec)}</td><td>${w?SUBJ[w.subj].short+' '+w.code+' '+w.name:'—'}</td></tr>`;}).join('')}</tbody></table></div>`:'<p class="muted">No practice tests yet. Start one from the Learn tab.</p>'}
          <h2 style="color:#6D28D9">📈 Reading speed</h2>${fl.length?`${chart}<p class="muted">Words read correctly per minute when reading a whole book aloud to Sparky${fl.length<2?' (one book so far)':''}. Most recent: <b>${fl[fl.length-1].wcpm}</b>. Watch the trend over weeks rather than any single number: speech recognition isn’t a formal fluency test.</p>`:'<p class="muted">Appears after your child reads a whole book aloud to Sparky.</p>'}
          ${gs.length||x.cases.n?`<h2>🎮 Learning games</h2><div class="rep-tiles">${x.cases.n?`<div><b>${x.cases.c}/${x.cases.n}</b><span>detective cases solved with proof</span></div>`:''}${gs.map(k=>`<div><b>${ST.gameHi[k]}</b><span>best score · ${gnames[k]}</span></div>`).join('')}</div>`:''}`;})()}
      <p class="rep-note"><b>How SmartScore works:</b> each skill starts at 0. Correct answers raise the score (quickly at first, slowly near the top) and mistakes lower it, more so above 90. 80 = proficient, 90–99 = challenge zone, 100 = mastered. ${ST.missed.length} missed question${ST.missed.length===1?' is':'s are'} saved for review.<br><br>LearnSpark is an independent practice app. It is not affiliated with or endorsed by the Virginia Department of Education, and SmartScores are practice indicators, not official SOL scores.</p>
    </div></div>`);
}


