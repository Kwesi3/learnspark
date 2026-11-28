// ═══════════════════════════════════════════════════════════════
// MORE: Practice Test, Detective Case Files, Map Quest, Timeline Dash,
// Who Am I?, Pizza Shop, Integer Elevator, word-problem helper,
// Sparky outfits, Family Challenge, certificates, reading fluency.
// ═══════════════════════════════════════════════════════════════
function xs(){if(!ST.extras)ST.extras={};const x=ST.extras,d={outfit:{hat:'',color:''},owned:[],tests:[],cases:{n:0,c:0},family:[],games:{}};
  for(const k in d)if(x[k]===undefined)x[k]=d[k];return x;}
function topBar(title,sub,color,back,right){
  return `<div class="topbar calm" style="--acc:${color}"><button class="tb-back" onclick="${back||'renderDash()'}" aria-label="Back">←</button>
    <div class="tb-user"><div class="tb-name" style="color:#fff">${title}</div>${sub?`<div class="tb-sub" style="color:rgba(255,255,255,.92)">${sub}</div>`:''}</div>${right||''}</div>`;}
function inPageConfirm(msg,yesLabel,onYes){
  closeSheet();const el=document.createElement('div');el.className='sheet-wrap';el.id='sheet';
  el.innerHTML=`<div class="sheet" role="dialog" aria-label="${esc(msg)}"><div class="sheet-h">${esc(msg)}</div>
    <div class="sheet-acts"><button class="btn btn-pri" id="cfYes" style="background:#2F6FE0">${yesLabel}</button><button class="btn btn-sec" onclick="closeSheet()">Not yet</button></div></div>`;
  document.body.appendChild(el);document.getElementById('cfYes').onclick=()=>{closeSheet();onYes();};
}

// ═════════════ SOL PRACTICE TEST ═════════════
const T={};
function testSubjects(){return ['math','read','sci','hist'];}
function renderTestSetup(){
  T.setup=T.setup||{subj:'mixed',n:10,timed:false};const s=T.setup;
  const last=xs().tests.slice(-3).reverse();
  setScreen(`<div class="screen active">${topBar('SOL Practice Test','Questions like the real test, with feedback at the end','#2F4B7C')}
    <div class="act-body"><div class="qc">
      <div class="les-art">${art('gen_test')}</div><p class="test-intro">Answer every question, then submit. Like the real SOL test, you won’t see right or wrong until the end. You can <b>flag</b> questions to come back to and <b>cross out</b> answers you know are wrong.</p>
      <div class="f-label">Subject</div>
      <div class="seg wide">${[['mixed','Mixed'],['math','Math'],['read','Reading'],['sci','Science'],['hist','History']].map(([k,l])=>`<button class="${s.subj===k?'on':''}" onclick="T.setup.subj='${k}';renderTestSetup()">${l}</button>`).join('')}</div>
      <div class="f-label">Number of questions</div>
      <div class="seg wide">${[10,20,30].map(n=>`<button class="${s.n===n?'on':''}" onclick="T.setup.n=${n};renderTestSetup()">${n}</button>`).join('')}</div>
      <div class="f-label">Timer</div>
      <div class="seg wide"><button class="${!s.timed?'on':''}" onclick="T.setup.timed=false;renderTestSetup()">No timer</button><button class="${s.timed?'on':''}" onclick="T.setup.timed=true;renderTestSetup()">1½ min per question</button></div>
      <div class="btns"><button class="btn btn-pri big" style="background:#2F4B7C" onclick="startTest()">Start test</button></div>
      <p class="muted" style="margin-top:10px">This is practice. Its score is not an official SOL score.</p>
    </div>
    ${last.length?`<div class="qc"><div class="les-k" style="color:#2F4B7C">Recent tests</div>${last.map(t=>`<div class="test-row"><span>${new Date(t.d).toLocaleDateString()}</span><span>${t.label}</span><b>${Math.round(t.c/t.n*100)}%</b></div>`).join('')}</div>`:''}
    </div></div>`);
}
function startTest(){
  const s=T.setup;const subs=s.subj==='mixed'?testSubjects():[s.subj];
  const pool=[];subs.forEach(sj=>skillsFor(sj).forEach(st=>pool.push({subj:sj,st})));
  const order=[];while(order.length<s.n){shuf(pool.slice()).forEach(p=>{if(order.length<s.n)order.push(p);});}
  const qs=order.map(p=>{let q;for(let i=0;i<12;i++){q=makeQ(p.st.gen);if(['mc','multi','order'].includes(q.type))break;}
    return {q,subj:p.subj,code:p.st.code,name:p.st.name};}).filter(x=>['mc','multi','order'].includes(x.q.type));
  Object.assign(T,{qs,ans:qs.map(()=>null),flags:new Set(),elim:qs.map(()=>new Set()),i:0,start:Date.now(),
    limit:s.timed?Math.round(qs.length*90):0,label:(s.subj==='mixed'?'Mixed':SUBJ[s.subj].short)+` · ${qs.length} questions`,done:false});
  testDraw();
  _tick=setInterval(()=>{const el=document.getElementById('tTime');if(!el)return;const e=(Date.now()-T.start)/1000;
    if(T.limit){const left=Math.max(0,T.limit-e);el.textContent='⏱ '+clock(left);el.classList.toggle('low',left<60);if(left<=0)submitTest(true);}
    else el.textContent='⏱ '+clock(e);},1000);
}
function testDraw(){
  const it=T.qs[T.i],q=it.q,a=T.ans[T.i];const col='#2F4B7C';
  let body='';
  const dg=q.type==='mc'?(q.dgSvg?{svg:q.dgSvg}:diagram(q,col)):null;
  if(q.type==='mc'){
    body=`${q.passage?`<div class="passage">${q.passage}</div>`:''}<div class="q-text">${String(dg&&dg.text||q.question).replace(/\n/g,'<br>')}</div>${dg?`<div class="dg-wrap">${dg.svg}</div>`:''}
      <div class="opts">${q.opts.map((o,i)=>`<div class="topt-row"><button class="opt${a===i?' sel':''}${T.elim[T.i].has(i)?' elim':''}" onclick="testPick(${i})"><span class="opt-l">${'ABCDEF'[i]}</span><span>${o}</span></button>
        <button class="x-btn${T.elim[T.i].has(i)?' on':''}" onclick="testElim(${i})" aria-label="Cross out choice ${'ABCDEF'[i]}" title="Cross out">✕</button></div>`).join('')}</div>`;
  } else if(q.type==='multi'){
    const sel=new Set(a||[]);
    body=`<div class="q-text">${esc(q.question)}</div><div class="sm-label">Select every correct answer.</div>
      <div class="opts">${q.opts.map((o,i)=>`<button class="opt multi${sel.has(i)?' sel':''}" onclick="testMulti(${i})"><span class="opt-l chk">✓</span><span>${o}</span></button>`).join('')}</div>`;
  } else {
    if(!it.words)it.words=shuf(q.items.slice());const placed=a||[];
    body=`<div class="q-text">${esc(q.question)}</div><div class="sm-label">Tap them in order — first to last</div>
      <div class="wbank order">${it.words.map((w,i)=>placed.includes(i)?`<span class="wchip used">${esc(w)}</span>`:`<button class="wchip" onclick="testOrd(${i})">${esc(w)}</button>`).join('')}</div>
      <div class="sm-label">Your order — tap one to take it back</div><div class="sdrop order">${placed.length?placed.map((wi,pi)=>`<button class="pchip" style="border-color:${col};color:${col}" onclick="testUnord(${pi})">${esc(it.words[wi])}</button>`).join(''):'<span class="ph">Tap the items above…</span>'}</div>`;
  }
  setScreenKeepTimer(`<div class="screen active">
    <div class="topbar calm" style="--acc:#2F4B7C"><button class="tb-back" onclick="inPageConfirm('Leave the test? Your answers will be lost.','Leave test',()=>renderDash())" aria-label="Leave test">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">Question ${T.i+1} of ${T.qs.length}</div><div class="tb-sub" style="color:rgba(255,255,255,.9)">${T.label}</div></div>
      <div class="t-time" id="tTime">${testClock()}</div></div>
    <div class="act-body">
      <div class="t-nav" aria-label="Question navigator">${T.qs.map((x,i)=>`<button class="t-dot${i===T.i?' cur':''}${answered(i)?' done':''}${T.flags.has(i)?' flag':''}" onclick="T.i=${i};testDraw()" aria-label="Question ${i+1}">${i+1}</button>`).join('')}</div>
      <div class="qc"><div class="q-top"><span class="q-badge" style="background:#2F4B7C18;color:#2F4B7C">${SUBJ[it.subj].short}</span><span class="sol-tag" style="background:#2F4B7C">SOL ${it.code}</span>
        <button class="speak-mini" onclick="testSpeak()" aria-label="Read the question aloud">${ic('speaker')}</button></div>${body}</div>
      <div class="btns t-btns"><button class="btn btn-sec" onclick="testGo(-1)" ${T.i===0?'disabled':''}>◀ Back</button>
        <button class="btn btn-sec${T.flags.has(T.i)?' flagged':''}" onclick="testFlag()">🚩 ${T.flags.has(T.i)?'Flagged':'Flag'}</button>
        ${T.i<T.qs.length-1?`<button class="btn btn-pri" style="background:#2F4B7C" onclick="testGo(1)">Next ▶</button>`:`<button class="btn btn-pri" style="background:#2F4B7C" onclick="testReview()">Review</button>`}</div>
    </div></div>`);
}
function testClock(){const e=(Date.now()-T.start)/1000;return '⏱ '+clock(T.limit?Math.max(0,T.limit-e):e);}
function setScreenKeepTimer(html){const t=_tick;_tick=null;setScreen(html);_tick=t;}
function answered(i){const a=T.ans[i];return a!==null&&a!==undefined&&!(Array.isArray(a)&&!a.length);}
function testPick(i){T.ans[T.i]=i;T.elim[T.i].delete(i);FX.click();testDraw();}
function testElim(i){const e=T.elim[T.i];if(e.has(i))e.delete(i);else{e.add(i);if(T.ans[T.i]===i)T.ans[T.i]=null;}testDraw();}
function testMulti(i){const s=new Set(T.ans[T.i]||[]);s.has(i)?s.delete(i):s.add(i);T.ans[T.i]=[...s];FX.click();testDraw();}
function testOrd(i){const a=(T.ans[T.i]||[]).slice();a.push(i);T.ans[T.i]=a;FX.click();testDraw();}
function testUnord(pi){const a=(T.ans[T.i]||[]).slice();a.splice(pi,1);T.ans[T.i]=a;testDraw();}
function testFlag(){T.flags.has(T.i)?T.flags.delete(T.i):T.flags.add(T.i);testDraw();}
function testGo(d){T.i=Math.max(0,Math.min(T.qs.length-1,T.i+d));testDraw();}
function testSpeak(){const q=T.qs[T.i].q;let t=plain(q.question);if(q.opts)t+='. '+q.opts.map((o,i)=>'ABCDEF'[i]+': '+plain(o)).join('. ');speak(t);}
function testReview(){
  const un=T.qs.map((_,i)=>i).filter(i=>!answered(i));
  setScreenKeepTimer(`<div class="screen active">
    <div class="topbar calm" style="--acc:#2F4B7C"><button class="tb-back" onclick="testDraw()" aria-label="Back to questions">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">Review your answers</div><div class="tb-sub" style="color:rgba(255,255,255,.9)">${T.label}</div></div><div class="t-time" id="tTime">${testClock()}</div></div>
    <div class="act-body"><div class="qc">
      <div class="t-nav big">${T.qs.map((x,i)=>`<button class="t-dot${answered(i)?' done':''}${T.flags.has(i)?' flag':''}" onclick="T.i=${i};testDraw()">${i+1}</button>`).join('')}</div>
      <div class="t-legend"><span><i class="t-dot done"></i> answered</span><span><i class="t-dot"></i> not answered</span><span><i class="t-dot flag"></i> flagged</span></div>
      <p>${un.length?`<b>${un.length} question${un.length===1?' is':'s are'} not answered:</b> ${un.map(i=>i+1).join(', ')}.`:'Every question has an answer.'} ${T.flags.size?`You flagged ${[...T.flags].map(i=>i+1).join(', ')}.`:''}</p>
      <div class="btns"><button class="btn btn-sec" onclick="T.i=${un.length?un[0]:0};testDraw()">${un.length?'Go to first unanswered':'Check my answers'}</button>
      <button class="btn btn-pri" style="background:#23845A" onclick="${un.length?`inPageConfirm('Submit with ${un.length} unanswered?','Submit test',()=>submitTest())`:'submitTest()'}">Submit test</button></div>
    </div></div></div>`);
}
function gradeItem(it,a){const q=it.q;
  if(q.type==='mc')return a!==null&&a!==undefined&&String(q.opts[a])===String(q.answer);
  if(q.type==='multi'){const s=new Set((a||[]).map(i=>q.opts[i]));return s.size===q.answers.length&&q.answers.every(x=>s.has(x));}
  const w=it.words||[];return (a||[]).length===q.items.length&&(a||[]).every((wi,k)=>w[wi]===q.items[k]);}
function correctText(q){return q.type==='mc'?q.answer:q.type==='multi'?q.answers.join(', '):q.items.join(' → ');}
function yourText(it,a){const q=it.q;if(!answered(T.qs.indexOf(it)))return 'No answer';
  if(q.type==='mc')return q.opts[a];if(q.type==='multi')return a.map(i=>q.opts[i]).join(', ');return a.map(i=>it.words[i]).join(' → ');}
function submitTest(timeUp){
  if(T.done)return;T.done=true;if(_tick){clearInterval(_tick);_tick=null;}
  const sec=Math.round((Date.now()-T.start)/1000);const res=T.qs.map((it,i)=>gradeItem(it,T.ans[i]));
  const c=res.filter(Boolean).length,n=T.qs.length,pct=Math.round(c/n*100);
  const by={};T.qs.forEach((it,i)=>{const k=it.subj+'|'+it.code;by[k]=by[k]||{subj:it.subj,code:it.code,name:it.name,n:0,c:0};by[k].n++;if(res[i])by[k].c++;});
  T.qs.forEach((it,i)=>{if(!res[i])rememberMiss(it.q,it.subj,it.code);});
  ST.totalQ+=n;ST.totalC+=c;const d=dayRec();d.q+=n;d.c+=c;
  xs().tests.push({d:Date.now(),label:T.label,n,c,sec,by:Object.values(by)});if(xs().tests.length>40)xs().tests.shift();
  addXP(c*3,pct>=80?5:pct>=60?2:0);
  const weak=Object.values(by).filter(b=>b.c<b.n).sort((a,b)=>a.c/a.n-b.c/b.n)[0];
  setScreen(`<div class="screen active">${topBar('Test results',T.label,'#2F4B7C')}
    <div class="act-body"><div class="qc summary">
      ${timeUp?'<p class="muted">Time ran out, so the test was submitted.</p>':''}
      <div class="sum-rings"><div>${ring(pct,110,pct>=80?'#2FB37A':pct>=60?'#F59E0B':'#F06A4D',pct+'%')}</div></div>
      <div class="m-t">${c} of ${n} correct</div>
      <div class="m-d">${pct>=80?'Excellent work! You’re showing real understanding.':pct>=60?'Good effort. Review the questions below and practice your weakest standard.':'Every test shows what to practice next. Let’s look at what to work on.'}</div>
      <div class="sum-grid"><div><b>${pct}%</b><span>score</span></div><div><b>${fmtTime(sec)}</b><span>time</span></div><div><b>${T.flags.size}</b><span>flagged</span></div><div><b>${n-c}</b><span>to review</span></div></div>
      <div class="btns">${weak?`<button class="btn btn-pri" style="background:#2F4B7C" onclick="startSkill('${weak.subj}','${weak.code}')">Practice ${esc(weak.name)}</button>`:''}
        ${pct>=80?`<button class="btn btn-sec" onclick="showCertificate('Practice Test Star','scored ${pct}% on a ${esc(T.label)} practice test')">🎓 Certificate</button>`:''}
        <button class="btn btn-sec" onclick="renderDash()">Home</button></div>
      <p class="muted">Missed questions were added to “Review your mistakes.” This practice score is not an official SOL score.</p>
    </div>
    <div class="qc"><div class="les-k" style="color:#2F4B7C">By standard</div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>SOL</th><th>Skill</th><th>Correct</th></tr></thead><tbody>
      ${Object.values(by).sort((a,b)=>a.c/a.n-b.c/b.n).map(b=>`<tr><td>${SUBJ[b.subj].short} ${b.code}</td><td>${b.name}</td><td>${b.c}/${b.n} ${b.c===b.n?ic('check','c-ok'):''}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="qc"><div class="les-k" style="color:#2F4B7C">Every question</div>
      ${T.qs.map((it,i)=>`<details class="t-item ${res[i]?'ok':'no'}"><summary><span>${res[i]?ic('check','c-ok'):ic('x','c-no')} ${i+1}. ${esc(plain(it.q.question).slice(0,90))}${plain(it.q.question).length>90?'…':''}</span></summary>
        <div class="t-det"><div><b>Your answer:</b> ${yourText(it,T.ans[i])}</div><div><b>Correct answer:</b> ${correctText(it.q)}</div><div class="ex-why">${it.q.explanation||''}</div></div></details>`).join('')}
    </div></div></div>`);
  if(pct>=80){FX.win();confetti(window.innerWidth/2,120,60);}
  checkAch();save();
}

// ═════════════ DETECTIVE CASE FILES ═════════════
const CASES=[
 {lv:1,t:'The Muddy Mystery',c:['Max’s sneakers by the door are covered in mud.','His raincoat is dripping on the floor.','A soccer ball in the hall is wet and grassy.','The kitchen smells like cookies.'],q:'What was Max doing before he came inside?',o:['Playing soccer outside in the rain','Baking cookies','Sleeping in his room'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'The Empty Bowl',c:['Whiskers the cat is licking her lips.','Her food bowl was full this morning.','Now the bowl is empty.','A ball of yarn is under the couch.'],q:'What happened to the food?',o:['Whiskers ate it','The dog hid it','It was never there'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'Shh! A Secret',c:['Mom hides a wrapped box behind her back.','Balloons are tied to Lena’s chair.','Everyone stops talking when Lena walks in.','It is raining outside.'],q:'What is probably happening?',o:['The family is planning a surprise for Lena','Lena is in trouble','The family is moving away'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'The Droopy Garden',c:['The soil is dry and cracked.','The watering can in the shed is still full.','It has not rained in two weeks.','A bird sings in the apple tree.'],q:'Why are the tomato plants drooping?',o:['They have not had enough water','They have too much water','A bird ate them'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'Science Fair Day',c:['Ana’s poster has a big blue ribbon on it.','She is smiling and holding a trophy.','Her teacher shakes her hand.','The gym lights are bright.'],q:'What happened at the science fair?',o:['Ana won a prize','Ana forgot her poster','The fair was canceled'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'Running Late',c:['Jamal’s shoelaces are untied.','He has toothpaste on his chin.','He grabs his backpack and runs out the door.','His goldfish swims in its bowl.'],q:'What can you tell about Jamal?',o:['He is in a hurry','He is feeling sick','He is going to bed'],a:0,p:[0,1,2],ok:[]},
 {lv:1,t:'The Snowy Morning',c:['The school bus did not come today.','Dad is shoveling the driveway.','Kids are building a snowman in the park.','The TV says “All schools closed.”','Grandma is reading a book.'],q:'Why is there no school today?',o:['Snow closed the schools','It is Saturday','The bus broke down'],a:0,p:[1,2,3],ok:[0]},
 {lv:2,t:'The Locked Lab',c:['The lab door was locked all night, and only Ms. Ortiz has a key.','This morning, the window is open and the screen is torn.','Small muddy paw prints lead from the window to the snack cabinet.','A granola bar wrapper lies on the floor, chewed at the edges.','The class hamster is asleep in its closed cage.'],q:'Who most likely got into the lab?',o:['A small animal that came in through the window','Ms. Ortiz, using her key','The class hamster'],a:0,p:[1,2,3],ok:[4]},
 {lv:2,t:'The Bean Plant Test',c:['Priya put one bean plant by a sunny window and one in a dark closet.','She gave both plants the same amount of water every day.','After two weeks, the window plant was tall and green.','The closet plant was pale yellow and thin.','Priya’s brother practices piano after school.'],q:'What can Priya conclude?',o:['Plants need light to grow healthy','Plants need more water in closets','Plants grow better in the dark'],a:0,p:[0,2,3],ok:[1]},
 {lv:2,t:'The Old Letter',c:['The letter is written with a quill pen on yellowed paper.','It is dated March 1775.','The writer complains about new taxes on paper and tea.','He signs it, “Your loving son, in Williamsburg.”','A museum visitor left a coffee cup beside it today.'],q:'What is the best conclusion about the letter?',o:['A colonist in Virginia wrote it before the Revolution','A soldier wrote it during the Civil War','A student wrote it last week'],a:0,p:[1,2,3],ok:[0]},
 {lv:2,t:'The Missing Medal',c:['Coach Lee set the gold medal on top of the equipment bag before practice.','Rain started halfway through practice, and everyone hurried to the bus.','Devon says he saw something shiny slide into the equipment bag.','The equipment bag was carried onto the bus with the balls.','The bus driver honked twice.'],q:'Where is the medal most likely now?',o:['In the equipment bag on the bus','Still on the field','In the coach’s car'],a:0,p:[2,3],ok:[0,1]},
 {lv:2,t:'Lights Out on Oak Street',c:['Every house on Oak Street went dark at 6:15 p.m.','Houses on Maple Street, one block away, still had lights.','A large branch is lying across the power line on Oak Street.','The wind was very strong that evening.','Someone on Maple Street was cooking spaghetti.'],q:'What most likely caused the outage?',o:['Wind blew a branch onto the Oak Street power line','The whole city lost power','Someone on Maple Street used too much power'],a:0,p:[2,3],ok:[0,1]},
 {lv:2,t:'The Field Trip Vote',c:['The class voted on a trip: the history museum or the zoo.','Most students wrote “animals!” on their idea cards.','The teacher handed out permission slips with a lion on them.','The museum is closed for repairs that week.','Lunch will be pizza.'],q:'Where is the class most likely going?',o:['To the zoo','To the history museum','To a pizza restaurant'],a:0,p:[1,2,3],ok:[0]},
 {lv:2,t:'The Quiet Neighbor',c:['Mr. Grant’s newspapers have piled up on his porch for a week.','His car is gone from the driveway.','A neighbor is watering his plants each evening.','He mentioned planning a trip to see his grandchildren.','The street was repaved last month.'],q:'What is the most likely explanation?',o:['Mr. Grant is away visiting family','Mr. Grant moved away for good','Mr. Grant stopped reading newspapers'],a:0,p:[0,1,3],ok:[2]},
];
const CS={};
function startDetective(){
  const pool=CASES.filter(c=>c.lv===(ST.grade<=4?1:2));const extra=ST.grade===4?CASES.filter(c=>c.lv===2).slice(0,3):[];
  Object.assign(CS,{list:shuf(pool.concat(extra)).slice(0,5),i:0,score:0,solved:0});narrLoad('cases');ST.currentGame='detective';caseDraw();}
function caseDraw(){
  const k=CS.list[CS.i];CS.stage='pick';CS.picked=new Set();CS.order=shuf(k.o.map((o,i)=>i));
  gameShell(`<div class="game-card case">
    <div class="case-head"><span class="case-no">Case ${CS.i+1} of ${CS.list.length}</span><span class="case-sc">${ic('star','c-star')} ${CS.score}</span></div>
    <div class="case-t">${k.t}</div>
    <div class="case-sub">Read the clues.</div>
    <div class="clues">${k.c.map((c,i)=>`<button class="clue" data-i="${i}" onclick="caseClue(${i})" disabled><span class="clue-n">🔍</span>${esc(c)}</button>`).join('')}</div>
    <button class="btn btn-sec speak" onclick="narrOrSay('cases','c${CASES.indexOf(k)}',${esc(JSON.stringify(k.c.join(' ')+' '+k.q))},.88)">${ic('speaker')} Read the case to me</button>
    <div class="q-text" style="margin-top:14px">${esc(k.q)}</div>
    <div class="opts" id="opts">${CS.order.map(oi=>`<button class="opt" data-o="${oi}" onclick="casePick(${oi})"><span>${esc(k.o[oi])}</span></button>`).join('')}</div>
    <div id="fbCard"></div><div class="btns" id="actBtns"></div></div>`,'🕵️','Detective Case Files');
}
function casePick(oi){
  if(CS.stage!=='pick')return;const k=CS.list[CS.i];const ok=oi===k.a;CS.stage='clues';CS.right=ok;
  document.querySelectorAll('#opts .opt').forEach(b=>{b.disabled=true;const o=+b.dataset.o;if(o===k.a)b.classList.add('correct');else if(o===oi)b.classList.add('wrong');else b.classList.add('faded');});
  if(ok){CS.score+=2;FX.correct();}else FX.wrong();
  document.querySelectorAll('.clue').forEach(b=>b.disabled=false);
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');
  fb.innerHTML=`<div class="fb2-h">${ok?'Case cracked! +2':'Not quite — the answer is: '+esc(k.o[k.a])}</div><div class="fb2-b">Now tap the clues that <b>prove</b> it, then tap Done.</div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#4C1D95" onclick="caseDone()">Done</button>`;
}
function caseClue(i){if(CS.stage!=='clues')return;const b=document.querySelector(`.clue[data-i="${i}"]`);
  CS.picked.has(i)?(CS.picked.delete(i),b.classList.remove('sel')):(CS.picked.add(i),b.classList.add('sel'));FX.click();}
function caseDone(){
  if(CS.stage==='clues'){const k=CS.list[CS.i];let good=0,bad=0;
    document.querySelectorAll('.clue').forEach(b=>{const i=+b.dataset.i;b.disabled=true;
      if(k.p.includes(i)){b.classList.add(CS.picked.has(i)?'hit':'miss');if(CS.picked.has(i))good++;}
      else if(CS.picked.has(i)&&!k.ok.includes(i)){b.classList.add('wrongclue');bad++;}});
    const pts=Math.max(0,good-bad);CS.score+=pts;const solved=CS.right&&good>=Math.min(2,k.p.length)&&bad===0;if(solved)CS.solved++;
    const x=xs().cases;x.n++;if(solved)x.c++;
    const fb=document.getElementById('fbCard');fb.className='fb2 '+(bad?'err':'ok');
    fb.innerHTML=`<div class="fb2-h">${good} proof clue${good===1?'':'s'} found${bad?`, ${bad} that don’t prove it`:''} · +${pts}</div>
      <div class="fb2-b">The clues with a gold border prove the answer. ${k.c.filter((c,i)=>!k.p.includes(i)&&!k.ok.includes(i)).length?'The others are true, but they don’t help solve the case — good detectives ignore them!':''}</div>`;
    CS.stage='done';FX[bad?'wrong':'correct']();
    document.getElementById('nextBtn').textContent=CS.i<CS.list.length-1?'Next case':'Finish';return;}
  if(CS.i<CS.list.length-1){CS.i++;caseDraw();}
  else{saveHi('detective',CS.score);addXP(CS.score,CS.solved);gameOverCard('🕵️','Case files closed!',CS.score,`${CS.solved} of ${CS.list.length} cases solved with proof`,startDetective);}
}

// ═════════════ MAP QUEST (Virginia regions) ═════════════
const MAPQ=[['Coal mines',0],['The smallest region, in the far southwest',0],['The Shenandoah Valley',1],['Roanoke',1],['Natural Bridge',1],
 ['Skyline Drive and the Blue Ridge Parkway',2],['Mount Rogers, Virginia’s highest point',2],['Rolling hills — Virginia’s largest region',3],['Charlottesville and Monticello',3],['Lynchburg',3],
 ['Jamestown and Williamsburg',4],['Norfolk and Virginia Beach',4],['Flat land where tides rise and fall',4],['The Chesapeake Bay shoreline',4]];
const MQ={};
function vaMapSvg(labels,clickable){
  const xs_=[20,90,170,215,300,410];const fills=['#C9B79C','#9FD18F','#6CAF6A','#CDE7B0','#F2E2A8'];const top=x=>Math.max(20,150-x*0.42);
  let r='';for(let i=0;i<5;i++){const a=xs_[i],b=xs_[i+1];
    r+=`<path class="mq-reg${clickable?' click':''}" data-r="${i}" ${clickable?`onclick="mqTap(${i})" role="button" tabindex="0" aria-label="Region ${i+1}"`:''} d="M${a} 180 L${a} ${top(a)} L${b} ${top(b)} L${b} 180Z" fill="${fills[i]}" stroke="${INK}" stroke-width="2.5"/>`;
    if(labels&&labels[i])r+=dgText((a+b)/2,150,labels[i],{s:labels[i].length>2?11:20,bg:1});}
  r+=`<rect x="410" y="20" width="110" height="160" fill="#BFE0FF"/>`+dgText(465,104,'Atlantic',{s:13,c:'#2F6FE0'})+dgText(465,120,'Ocean',{s:13,c:'#2F6FE0'})+
    dgText(30,200,'West',{s:12,c:'#5B6B85',a:'start'})+dgText(400,200,'East',{s:12,c:'#5B6B85',a:'end'});
  return `<svg class="dg mq-map" viewBox="0 0 530 210" role="img" aria-label="Map of Virginia’s five regions">${r}</svg>`;
}
function startMapQuest(){ST.currentGame='mapquest';Object.assign(MQ,{stage:'label',placed:[null,null,null,null,null],chip:null,score:0,i:0,list:shuf(MAPQ.slice()).slice(0,10),miss:0});mqDraw();}
function mqDraw(){
  if(MQ.stage==='label'){
    const names=VA_REGIONS;const used=new Set(MQ.placed.filter(x=>x!==null));
    gameShell(`<div class="game-card"><div class="case-t">🗺️ Round 1: Label the regions</div>
      <div class="case-sub">Tap a name, then tap the region where it belongs.</div>
      <div class="dg-wrap">${vaMapSvg(MQ.placed.map(p=>p===null?'?':VA_REGIONS[p].replace(' Mountains','').replace('Appalachian ','App. ')),true)}</div>
      <div class="chips">${names.map((n,i)=>used.has(i)?'':`<button class="chip${MQ.chip===i?' on':''}" style="${MQ.chip===i?'background:#14A394;border-color:#14A394':''}" onclick="MQ.chip=${i};mqDraw()">${n}</button>`).join('')}</div>
      <div class="btns"><button class="btn btn-sec" onclick="MQ.placed=[null,null,null,null,null];MQ.chip=null;mqDraw()">Clear</button>
      <button class="btn btn-pri" style="background:#14A394" ${used.size<5?'disabled':''} onclick="mqCheck()">Check</button></div><div id="fbCard"></div></div>`,'🗺️','Map Quest');
  } else {
    const it=MQ.list[MQ.i];
    gameShell(`<div class="game-card"><div class="case-head"><span class="case-no">Round 2 · ${MQ.i+1} of ${MQ.list.length}</span><span class="case-sc">${ic('star','c-star')} ${MQ.score}</span></div>
      <div class="case-t">Tap the region with…</div><div class="mq-ask">${it[0]}</div>
      <div class="dg-wrap">${vaMapSvg(null,true)}</div><div id="fbCard"></div><div class="btns" id="actBtns"></div></div>`,'🗺️','Map Quest');
  }
}
function mqTap(r){
  if(MQ.stage==='label'){if(MQ.chip===null)return;const prev=MQ.placed.indexOf(MQ.chip);if(prev>=0)MQ.placed[prev]=null;MQ.placed[r]=MQ.chip;MQ.chip=null;FX.click();mqDraw();return;}
  if(MQ.answered)return;MQ.answered=true;const it=MQ.list[MQ.i];const ok=r===it[1];
  document.querySelectorAll('.mq-reg').forEach(p=>{const i=+p.dataset.r;if(i===it[1])p.classList.add('right');else if(i===r)p.classList.add('wrongr');});
  if(ok){MQ.score+=2;FX.correct();}else{MQ.miss++;FX.wrong();}
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');fb.innerHTML=`<div class="fb2-h">${ok?'Yes!':'It’s in the '+VA_REGIONS[it[1]]+'.'}</div><div class="fb2-b">${it[0]}: ${VA_REGIONS[it[1]]}.</div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#14A394" onclick="mqNext()">${MQ.i<MQ.list.length-1?'Next':'Finish'}</button>`;
}
function mqCheck(){const ok=MQ.placed.every((p,i)=>p===i);const right=MQ.placed.filter((p,i)=>p===i).length;MQ.score+=right*2;
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');
  fb.innerHTML=`<div class="fb2-h">${ok?'All five regions correct!':right+' of 5 correct'}</div><div class="fb2-b">West to east: Appalachian Plateau, Valley and Ridge, Blue Ridge Mountains, Piedmont, Coastal Plain.</div>
    <div class="btns"><button class="btn btn-pri" id="nextBtn" style="background:#14A394" onclick="MQ.stage='find';MQ.answered=false;mqDraw()">Round 2 →</button></div>`;
  ok?FX.correct():FX.wrong();}
function mqNext(){MQ.answered=false;if(MQ.i<MQ.list.length-1){MQ.i++;mqDraw();}else{saveHi('mapquest',MQ.score);addXP(MQ.score,MQ.miss<=1?2:0);gameOverCard('🗺️','Map Quest complete!',MQ.score,`${MQ.list.length-MQ.miss} of ${MQ.list.length} places found`,startMapQuest);}}

// ═════════════ TIMELINE DASH ═════════════
const TD={};
function startTimeline(){ST.currentGame='timeline';Object.assign(TD,{score:0,rounds:0,end:Date.now()+75000});tdRound();
  _tick=setInterval(()=>{const el=document.getElementById('tdTime');if(!el)return;const left=Math.max(0,(TD.end-Date.now())/1000);el.textContent=Math.ceil(left)+'s';
    if(left<=0){clearInterval(_tick);_tick=null;tdOver();}},250);}
function tdRound(){
  const evs=shuf(HIST_EVENTS[gradeContent()].slice()).slice(0,4);TD.evs=evs;TD.sorted=evs.slice().sort((a,b)=>a[0]-b[0]);TD.pick=[];
  const t=_tick;_tick=null;
  gameShell(`<div class="game-card"><div class="case-head"><span class="case-no">⏱ <b id="tdTime"></b></span><span class="case-sc">${ic('star','c-star')} ${TD.score}</span></div>
    <div class="case-t">⏳ Tap the events from earliest to latest</div>
    <div class="td-list">${evs.map((e,i)=>`<button class="td-ev" data-i="${i}" onclick="tdTap(${i})"><span class="td-n"></span>${esc(e[1])}</button>`).join('')}</div>
    <div id="fbCard"></div></div>`,'⏳','Timeline Dash');_tick=t;
}
function tdTap(i){
  if(TD.pick.includes(i)||TD.lock)return;TD.pick.push(i);const b=document.querySelector(`.td-ev[data-i="${i}"]`);b.classList.add('picked');b.querySelector('.td-n').textContent=TD.pick.length;FX.click();
  if(TD.pick.length===4){const ok=TD.pick.every((pi,k)=>TD.evs[pi]===TD.sorted[k]);TD.rounds++;TD.lock=true;
    document.querySelectorAll('.td-ev').forEach(el=>{const e=TD.evs[+el.dataset.i];el.insertAdjacentHTML('beforeend',`<span class="td-y">${e[0]}</span>`);});
    if(ok){TD.score+=3;FX.correct();}else FX.wrong();
    const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');fb.innerHTML=`<div class="fb2-h">${ok?'⚡ Perfect order! +3':'Correct order: '+TD.sorted.map(e=>e[0]).join(' → ')}</div>`;
    setTimeout(()=>{TD.lock=false;if(Date.now()<TD.end&&document.querySelector('.td-list'))tdRound();},ok?900:2200);}
}
function tdOver(){TD.lock=false;saveHi('timeline',TD.score);addXP(TD.score,TD.score>=12?2:0);gameOverCard('⏳','Time’s up!',TD.score,`${TD.rounds} timeline${TD.rounds===1?'':'s'} tried`,startTimeline);}

// ═════════════ WHO AM I? ═════════════
const WHO={4:[
 ['Pocahontas',['I was the daughter of a powerful Powhatan chief.','I helped keep peace between my people and the Jamestown colonists.','I married John Rolfe and traveled to England.']],
 ['John Smith',['I was a leader at Jamestown.','I said, “He who does not work shall not eat.”','I traded with the Powhatan people for food.']],
 ['Patrick Henry',['I was a lawyer and a powerful speaker.','I spoke at St. John’s Church in Richmond in 1775.','I said, “Give me liberty, or give me death!”']],
 ['Thomas Jefferson',['I wrote the Virginia Statute for Religious Freedom.','I later became the third president.','I wrote the Declaration of Independence.']],
 ['George Washington',['I was born in Westmoreland County, Virginia.','I commanded the Continental Army.','I was the first president of the United States.']],
 ['James Madison',['I was the fourth president.','My wife Dolley saved a famous painting.','I am called the “Father of the Constitution.”']],
 ['Harriet Tubman',['I escaped from slavery.','I went back many times to lead others to freedom.','I was a famous conductor on the Underground Railroad.']],
 ['Robert E. Lee',['I was born in Virginia.','I led the Confederate army in the Civil War.','I surrendered at Appomattox Court House in 1865.']],
 ['Maggie L. Walker',['I lived in Richmond’s Jackson Ward.','I helped Black families save and borrow money.','I was the first woman to charter a bank in the U.S.']],
 ['Barbara Johns',['I was a high school student in Farmville.','In 1951 I led a student strike for better school buildings.','My protest became part of Brown v. Board of Education.']],
 ['James Armistead Lafayette',['I was enslaved in Virginia.','During the Revolution, I pretended to help the British.','My spying helped the Americans win at Yorktown.']],
 ['L. Douglas Wilder',['I grew up in Richmond.','I served in the Korean War and became a lawyer.','In 1989 I was elected the first African American governor of a U.S. state.']]],
 6:[
 ['Thomas Edison',['I was an inventor with a lab in Menlo Park, New Jersey.','I invented the phonograph.','I developed a practical electric light bulb.']],
 ['Theodore Roosevelt',['I led the Rough Riders in the Spanish-American War.','As president, I protected land in national parks.','I pushed to build the Panama Canal.']],
 ['Woodrow Wilson',['I was born in Staunton, Virginia.','I led the U.S. during World War I.','I proposed the League of Nations.']],
 ['Franklin D. Roosevelt',['I was elected president four times.','I created the New Deal.','I led the U.S. after the attack on Pearl Harbor.']],
 ['Ida B. Wells',['I was born into slavery in Mississippi.','I became a journalist and teacher.','I wrote to expose lynching and fight injustice.']],
 ['Frederick Douglass',['I escaped slavery and became a famous speaker.','I published an antislavery newspaper.','I advised President Lincoln.']],
 ['Susan B. Anthony',['I worked for women’s rights.','I was arrested for voting in 1872.','The 19th Amendment is sometimes named after me.']],
 ['Rosa Parks',['I lived in Montgomery, Alabama.','In 1955 I refused to give up my seat on a bus.','My arrest sparked a bus boycott.']],
 ['Martin Luther King Jr.',['I was a Baptist minister.','I led the Montgomery Bus Boycott.','I gave the “I Have a Dream” speech in 1963.']],
 ['Neil Armstrong',['I was a test pilot and astronaut.','I commanded Apollo 11.','I was the first person to walk on the moon.']],
 ['Andrew Carnegie',['I came to America from Scotland as a boy.','I built a giant steel company.','I gave away much of my fortune to build libraries.']],
 ['Jane Addams',['I started Hull House in Chicago.','I helped immigrants with classes and child care.','I won the Nobel Peace Prize in 1931.']],
 ['Langston Hughes',['I was a poet and writer.','I was part of the Harlem Renaissance.','My poems celebrated Black life and culture.']]]};
const WA={};
function startWhoAmI(){ST.currentGame='whoami';const g=gradeContent();Object.assign(WA,{list:shuf(WHO[g].slice()).slice(0,8),i:0,score:0,right:0,all:WHO[g]});waDraw();}
function waDraw(){
  const it=WA.list[WA.i];WA.shown=1;WA.done=false;
  const wrong=shuf(WA.all.filter(x=>x[0]!==it[0])).slice(0,3).map(x=>x[0]);WA.opts=shuf([it[0]].concat(wrong));
  gameShell(`<div class="game-card"><div class="case-head"><span class="case-no">Person ${WA.i+1} of ${WA.list.length}</span><span class="case-sc">${ic('star','c-star')} ${WA.score}</span></div>
    <div class="case-t">🎭 Who am I?</div><div class="wa-clues" id="waClues"></div>
    <div class="wa-pts" id="waPts"></div>
    <div class="opts" id="opts">${WA.opts.map((o,i)=>`<button class="opt" data-i="${i}" onclick="waPick(${i})"><span>${esc(o)}</span></button>`).join('')}</div>
    <div id="fbCard"></div><div class="btns" id="actBtns"><button class="btn btn-sec" id="moreBtn" onclick="waMore()">Another clue</button></div></div>`,'🎭','Who Am I?');
  waClues();
}
function waClues(){const it=WA.list[WA.i];document.getElementById('waClues').innerHTML=it[1].slice(0,WA.shown).map((c,i)=>`<div class="wa-clue">Clue ${i+1}: ${esc(c)}</div>`).join('');
  document.getElementById('waPts').textContent=`Worth ${4-WA.shown} point${4-WA.shown===1?'':'s'} if you guess now`;const m=document.getElementById('moreBtn');if(m)m.disabled=WA.shown>=it[1].length;}
function waMore(){if(WA.done)return;WA.shown=Math.min(3,WA.shown+1);FX.click();waClues();}
function waPick(i){
  if(WA.done)return;WA.done=true;const it=WA.list[WA.i];const ok=WA.opts[i]===it[0];
  document.querySelectorAll('#opts .opt').forEach(b=>{b.disabled=true;const bi=+b.dataset.i;if(WA.opts[bi]===it[0])b.classList.add('correct');else if(bi===i)b.classList.add('wrong');else b.classList.add('faded');});
  const pts=ok?4-WA.shown:0;WA.score+=pts;if(ok){WA.right++;FX.correct();}else FX.wrong();WA.shown=3;waClues();
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');fb.innerHTML=`<div class="fb2-h">${ok?`Yes, ${esc(it[0])}! +${pts}`:`It was ${esc(it[0])}.`}</div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#9B5DE5" onclick="waNext()">${WA.i<WA.list.length-1?'Next person':'Finish'}</button>`;
}
function waNext(){if(WA.i<WA.list.length-1){WA.i++;waDraw();}else{saveHi('whoami',WA.score);addXP(WA.score,WA.right>=6?2:0);gameOverCard('🎭','Great guessing!',WA.score,`${WA.right} of ${WA.list.length} people named`,startWhoAmI);}}

// ═════════════ PIZZA SHOP (fractions) ═════════════
const PZ={};
const CUSTOMERS=['🐻','🦊','🐰','🐸','🐼','🦁','🐨','🐯','🐵','🐧'];
function pzOrder(level){
  const d=pick([2,3,4,6,8]);let n=rng(1,d-1);
  if(level===0)return {txt:`${n}/${d}`,n,d,cut:d,num:n,den:d};
  if(level===1){const dd=pick([2,3,4]);const nn=rng(1,dd-1);const m=pick([2,3]);return {txt:`${nn}/${dd}`,n:nn,d:dd,cut:dd*m,num:nn,den:dd};}
  const dd=pick([4,6,8]);const a=rng(1,dd-2),b=rng(1,dd-1-a);return {txt:`${a}/${dd} + ${b}/${dd}`,n:a+b,d:dd,cut:dd,num:a+b,den:dd,sum:true};
}
function startPizza(){ST.currentGame='pizza';Object.assign(PZ,{i:0,score:0,served:0,total:8});pzDraw();}
function pzDraw(){
  const level=PZ.i<3?0:PZ.i<6?1:2;const o=PZ.o=pzOrder(level);PZ.sel=new Set();PZ.done=false;
  gameShell(`<div class="game-card pz"><div class="case-head"><span class="case-no">Customer ${PZ.i+1} of ${PZ.total}</span><span class="case-sc">${ic('star','c-star')} ${PZ.score}</span></div>
    <div class="pz-order"><span class="pz-cust">${pick(CUSTOMERS)}</span><div class="pz-bubble">“I’d like <b>${o.txt}</b> of a pizza, please!”</div></div>
    <div class="pz-hint">This pizza is cut into <b>${o.cut}</b> equal slices. Tap the slices to serve.</div>
    <div class="pz-wrap" id="pzWrap">${pzSvg()}</div>
    <div class="pz-count" id="pzCount">0 of ${o.cut} slices</div>
    <div id="fbCard"></div><div class="btns" id="actBtns"><button class="btn btn-pri big" style="background:#E36B4E" onclick="pzServe()">Serve 🍕</button></div></div>`,'🍕','Pizza Shop');
}
function pzSvg(){const c=PZ.o.cut;const cx=120,cy=120,R=100;let s='';
  for(let i=0;i<c;i++){const a0=-Math.PI/2+i*2*Math.PI/c,a1=a0+2*Math.PI/c;const large=c===1?1:0;const on=PZ.sel.has(i);
    s+=`<path class="pz-sl${on?' on':''}" data-i="${i}" onclick="pzTap(${i})" role="button" aria-label="Slice ${i+1}${on?', selected':''}" d="M${cx},${cy} L${cx+R*Math.cos(a0)},${cy+R*Math.sin(a0)} A${R},${R} 0 ${large} 1 ${cx+R*Math.cos(a1)},${cy+R*Math.sin(a1)} Z"/>`;
    if(on){const am=(a0+a1)/2;s+=`<circle cx="${cx+R*.55*Math.cos(am)}" cy="${cy+R*.55*Math.sin(am)}" r="${Math.max(6,30/Math.sqrt(c))}" fill="#E4573D" pointer-events="none"/>`;}}
  return `<svg viewBox="0 0 240 240" class="pz-svg"><circle cx="120" cy="120" r="108" fill="#E9B872" stroke="${INK}" stroke-width="4"/>${s}</svg>`;}
function pzTap(i){if(PZ.done)return;PZ.sel.has(i)?PZ.sel.delete(i):PZ.sel.add(i);FX.click();document.getElementById('pzWrap').innerHTML=pzSvg();document.getElementById('pzCount').textContent=`${PZ.sel.size} of ${PZ.o.cut} slices`;}
function pzServe(){
  if(PZ.done)return;PZ.done=true;const o=PZ.o;const ok=PZ.sel.size*o.den===o.num*o.cut;
  if(ok){PZ.score+=o.sum?3:o.cut!==o.den?3:2;PZ.served++;FX.coin();}else FX.wrong();
  const need=o.num*o.cut/o.den;
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');
  fb.innerHTML=ok?`<div class="fb2-h">😋 Yum! ${PZ.sel.size}/${o.cut} = ${o.sum?o.num+'/'+o.den:o.txt}</div>`
    :`<div class="fb2-h">The order needed ${need} of ${o.cut} slices.</div><div class="fb2-b">${o.sum?`${o.txt} = ${o.num}/${o.den}. `:''}${o.cut!==o.den?`Each 1/${o.den} is ${o.cut/o.den} slices here, so ${o.num}/${o.den} = ${need}/${o.cut}.`:`${o.num}/${o.den} means ${o.num} of ${o.den} equal slices.`}</div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#E36B4E" onclick="pzNext()">${PZ.i<PZ.total-1?'Next customer':'Close the shop'}</button>`;
}
function pzNext(){if(PZ.i<PZ.total-1){PZ.i++;pzDraw();}else{saveHi('pizza',PZ.score);addXP(PZ.score,PZ.served>=7?2:0);gameOverCard('🍕','Shop closed!',PZ.score,`${PZ.served} of ${PZ.total} orders served right`,startPizza);}}

// ═════════════ INTEGER ELEVATOR ═════════════
const EL={};
function sgn(n){return n<0?'−'+Math.abs(n):String(n);}
function elTask(){
  const t=rng(0,3);let s=rng(-6,6);
  if(t===0){const d=rng(2,8);const down=Math.random()<.5;const e=down?s-d:s+d;if(e<-10||e>10)return elTask();
    return {start:s,txt:`You’re on floor ${sgn(s)}. Go ${down?'down':'up'} ${d} floor${d>1?'s':''}.`,ans:e,why:`${sgn(s)} ${down?'−':'+'} ${d} = ${sgn(e)}`};}
  if(t===1){const a=rng(-8,8),b=rng(-8,8);const e=a+b;if(e<-10||e>10||!b)return elTask();
    return {start:0,txt:`(${sgn(a)}) + (${sgn(b)}) = ?`,ans:e,why:`Start at ${sgn(a)} and move ${b>0?'up':'down'} ${Math.abs(b)}: ${sgn(e)}.`};}
  if(t===2){const a=rng(-6,6),b=rng(-6,6);const e=a-b;if(e<-10||e>10||!b)return elTask();
    return {start:0,txt:`(${sgn(a)}) − (${sgn(b)}) = ?`,ans:e,why:`Subtracting ${sgn(b)} means moving ${b>0?'down':'up'} ${Math.abs(b)}: ${sgn(a)} − (${sgn(b)}) = ${sgn(e)}.`};}
  const d=rng(1,6);return {start:-d,txt:`The parking garage is ${d} floor${d>1?'s':''} below the lobby (0). Which floor is it?`,ans:-d,why:`Below 0 means negative: −${d}.`};
}
function startElevator(){ST.currentGame='elevator';Object.assign(EL,{i:0,score:0,right:0,total:10,floor:0,streak:0});elDraw();}
function elDraw(){
  const t=EL.t=elTask();EL.done=false;if(t.start!==undefined)EL.floor=t.start;
  const floors=[];for(let f=10;f>=-10;f--)floors.push(f);
  gameShell(`<div class="game-card"><div class="case-head"><span class="case-no">Ride ${EL.i+1} of ${EL.total}</span><span class="case-sc">${ic('star','c-star')} ${EL.score}</span></div>
    <div class="el-task">🛗 ${esc(t.txt)}</div>
    <div class="el-wrap"><div class="el-shaft">${floors.map(f=>`<div class="el-fl${f===0?' lobby':''}${f<0?' below':''}"><span>${f>0?'+'+f:f===0?'0 Lobby':'−'+Math.abs(f)}</span></div>`).join('')}
      <div class="el-car" id="elCar" style="top:${(10-EL.floor)*28}px">🛗</div></div>
      <div class="el-pad">${floors.map(f=>`<button class="el-btn${f===0?' zero':''}" onclick="elPick(${f})" aria-label="Floor ${f}">${sgn(f)}</button>`).join('')}</div></div>
    <div id="fbCard"></div><div class="btns" id="actBtns"></div></div>`,'🛗','Integer Elevator');
}
function elPick(f){
  if(EL.done)return;EL.done=true;const ok=f===EL.t.ans;const car=document.getElementById('elCar');car.style.top=((10-f)*28)+'px';EL.floor=f;
  if(ok){EL.right++;EL.streak++;EL.score+=2+(EL.streak>=3?1:0);FX.correct();}else{EL.streak=0;FX.wrong();}
  const fb=document.getElementById('fbCard');fb.className='fb2 '+(ok?'ok':'err');fb.innerHTML=`<div class="fb2-h">${ok?'Ding! Floor '+sgn(f):'The answer is '+sgn(EL.t.ans)}</div><div class="fb2-b">${esc(EL.t.why)}</div>`;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#2F6FE0" onclick="elNext()">${EL.i<EL.total-1?'Next ride':'Finish'}</button>`;
}
function elNext(){if(EL.i<EL.total-1){EL.i++;elDraw();}else{saveHi('elevator',EL.score);addXP(EL.score,EL.right>=8?2:0);gameOverCard('🛗','Last stop!',EL.score,`${EL.right} of ${EL.total} floors reached`,startElevator);}}

// ═════════════ SPARKY OUTFITS ═════════════
const HATS={'':{n:'No hat',c:0,svg:''},
  cap:{n:'Ball cap',c:10,svg:`<path d="M40 22 Q60 -8 80 22Z" fill="#E4573D" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M78 20 h24 q-4 7 -24 7Z" fill="#E4573D" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`},
  phones:{n:'Headphones',c:15,svg:`<path d="M36 54 A24 24 0 0 1 84 54" fill="none" stroke="${INK}" stroke-width="6"/><rect x="28" y="46" width="12" height="20" rx="5" fill="#9B5DE5" stroke="${INK}" stroke-width="3"/><rect x="80" y="46" width="12" height="20" rx="5" fill="#9B5DE5" stroke="${INK}" stroke-width="3"/>`},
  party:{n:'Party hat',c:20,svg:`<path d="M46 20 L60 -20 L74 20Z" fill="#E8559A" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="M52 4 L68 4 M49 12 L71 12" stroke="#FFC83D" stroke-width="3"/><circle cx="60" cy="-20" r="5" fill="#FFC83D" stroke="${INK}" stroke-width="2.5"/>`},
  wizard:{n:'Wizard hat',c:30,svg:`<path d="M42 22 L62 -24 L78 22Z" fill="#6D28D9" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="60" cy="22" rx="26" ry="5" fill="#6D28D9" stroke="${INK}" stroke-width="3"/><path d="M58 0 l2 4 l4 .5 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 -.5Z" fill="#FFC83D"/>`},
  crown:{n:'Crown',c:40,svg:`<path d="M42 18 L42 -4 L51 6 L60 -12 L69 6 L78 -4 L78 18Z" fill="#FFC83D" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="60" cy="8" r="3.5" fill="#E8559A"/><circle cx="49" cy="10" r="2.5" fill="#4C8DF6"/><circle cx="71" cy="10" r="2.5" fill="#2FB37A"/>`},
  grad:{n:'Graduation cap',c:50,svg:`<path d="M28 2 L60 -12 L92 2 L60 16Z" fill="${INK}"/><path d="M44 8 v10 q16 8 32 0 v-10" fill="${INK}"/><path d="M86 4 v16" stroke="#FFC83D" stroke-width="3"/><circle cx="86" cy="22" r="4" fill="#FFC83D"/>`}};
const COLORS={'':{n:'Sky blue',c:0,v:'#4C8DF6'},green:{n:'Leaf green',c:15,v:'#2FB37A'},purple:{n:'Purple',c:15,v:'#9B5DE5'},orange:{n:'Sunset orange',c:15,v:'#FF8A3D'},pink:{n:'Bubblegum',c:15,v:'#E8559A'},gold:{n:'Gold',c:60,v:'#F5B800'}};
function mascotBody(){try{const o=ST.extras&&ST.extras.outfit;return (o&&COLORS[o.color]||COLORS['']).v;}catch(e){return '#4C8DF6';}}
function mascotHat(){try{const o=ST.extras&&ST.extras.outfit;return o&&HATS[o.hat]?HATS[o.hat].svg:'';}catch(e){return '';}}
function renderShop(){
  const x=xs();const own=new Set(x.owned);const tile=(kind,k,it)=>{const has=it.c===0||own.has(kind+':'+k);const on=x.outfit[kind]===k;
    return `<button class="shop-it${on?' on':''}" onclick="shopTap('${kind}','${k}')">
      <span class="shop-pre">${shopPreview(kind==='hat'?k:x.outfit.hat,kind==='color'?k:x.outfit.color)}</span>
      <span class="shop-n">${it.n}</span><span class="shop-c">${on?'Wearing':has?'Owned · tap to wear':ic('star','c-star')+' '+it.c}</span></button>`;};
  return `<div class="sec-title">Sparky’s closet · ${ST.stars} stars to spend</div>
    <div class="shop-grid">${Object.entries(HATS).map(([k,it])=>tile('hat',k,it)).join('')}</div>
    <div class="shop-grid" style="margin-top:10px">${Object.entries(COLORS).map(([k,it])=>tile('color',k,it)).join('')}</div>
    <p class="muted" style="margin:8px 0 20px">Earn stars by practicing, finishing books, and winning games.</p>`;
}
function shopPreview(hat,color){const keep=ST.extras.outfit;ST.extras.outfit={hat,color};const s=mascot(54,'happy');ST.extras.outfit=keep;return s;}
function shopTap(kind,k){
  const x=xs();const it=(kind==='hat'?HATS:COLORS)[k];const key=kind+':'+k;
  if(it.c>0&&!x.owned.includes(key)){
    if(ST.stars<it.c){toast('⭐','Not enough stars yet',`${it.n} costs ${it.c} stars`);return;}
    inPageConfirm(`Buy ${it.n} for ${it.c} stars?`,'Buy it',()=>{ST.stars-=it.c;x.owned.push(key);x.outfit[kind]=k;FX.coin();save();checkAch();renderDash();switchTab('awards');});return;}
  x.outfit[kind]=k;FX.click();save();renderDash();switchTab('awards');
}

// ═════════════ FAMILY CHALLENGE ═════════════
const FAM={};
function startFamily(){
  FAM.p2=FAM.p2||'Grown-up';
  setScreen(`<div class="screen active">${topBar('Family Challenge','Same 5 questions — who scores higher?','#E36B4E')}
    <div class="act-body"><div class="qc">
      <div class="les-art">${art('gen_family')}</div><p>${esc(ST.name)} answers 5 questions, then passes the device. The next player gets the <b>same</b> questions.</p>
      <div class="f-label">Player 1</div><div class="fam-p">${avImg(ST.avatar,'av-sm')} ${esc(ST.name)}</div>
      <div class="f-label">Player 2</div><input class="f-input fam-in" id="p2In" maxlength="20" value="${esc(FAM.p2)}" aria-label="Player 2 name">
      <div class="f-label">Questions from</div>
      <div class="seg wide">${[['mixed','Mixed'],['math','Math'],['hist','History'],['sci','Science']].map(([k,l])=>`<button class="${(FAM.subj||'mixed')===k?'on':''}" onclick="FAM.subj='${k}';FAM.p2=document.getElementById('p2In').value;startFamily()">${l}</button>`).join('')}</div>
      <div class="btns"><button class="btn btn-pri big" style="background:#E36B4E" onclick="famBegin()">Start</button></div></div></div></div>`);
}
function famBegin(){
  FAM.p2=(document.getElementById('p2In').value||'Grown-up').trim();const sj=FAM.subj||'mixed';
  const subs=sj==='mixed'?['math','hist','sci','read']:[sj];const qs=[];
  while(qs.length<5){const s=pick(subs);const st=pick(skillsFor(s));const q=makeQ(st.gen);if(q.type==='mc'&&!q.passage)qs.push(q);}
  Object.assign(FAM,{qs,player:0,qi:0,scores:[0,0],picks:[[],[]]});famQ();
}
function famQ(){
  const q=FAM.qs[FAM.qi];const who=FAM.player===0?`${avImg(ST.avatar,'av-sm')} ${esc(ST.name)}`:`🧑 ${esc(FAM.p2)}`;FAM.done=false;FAM.order=shuf(q.opts.slice());
  const dg=q.dgSvg?{svg:q.dgSvg}:diagram(q,'#E36B4E');
  setScreen(`<div class="screen active">${topBar(`${who}’s turn`,`Question ${FAM.qi+1} of 5 · Score ${FAM.scores[FAM.player]}`,'#E36B4E')}
    <div class="act-body"><div class="qc"><div class="q-text">${String(dg&&dg.text||q.question).replace(/\n/g,'<br>')}</div>${dg?`<div class="dg-wrap">${dg.svg}</div>`:''}
      <div class="opts" id="opts">${FAM.order.map((o,i)=>`<button class="opt" data-i="${i}" onclick="famPick(${i})"><span class="opt-l">${'ABCDEF'[i]}</span><span>${o}</span></button>`).join('')}</div></div>
      <div id="fbCard"></div><div class="btns" id="actBtns"></div></div></div>`);
}
function famPick(i){
  if(FAM.done)return;FAM.done=true;const q=FAM.qs[FAM.qi];const ok=String(FAM.order[i])===String(q.answer);
  document.querySelectorAll('#opts .opt').forEach(b=>{b.disabled=true;const bi=+b.dataset.i;if(String(FAM.order[bi])===String(q.answer))b.classList.add('correct');else if(bi===i)b.classList.add('wrong');else b.classList.add('faded');});
  if(ok){FAM.scores[FAM.player]++;FX.correct();}else FX.wrong();FAM.picks[FAM.player].push(ok);
  const last=FAM.qi>=4;
  document.getElementById('actBtns').innerHTML=`<button class="btn btn-pri big" id="nextBtn" style="background:#E36B4E" onclick="famNext()">${!last?'Next question':FAM.player===0?`Pass to ${esc(FAM.p2)}`:'See who won'}</button>`;
}
function famNext(){
  if(FAM.qi<4){FAM.qi++;return famQ();}
  if(FAM.player===0){FAM.player=1;FAM.qi=0;
    setScreen(`<div class="screen active">${topBar('Pass the device','','#E36B4E')}<div class="act-body"><div class="qc mastery"><div class="medal">🤝</div>
      <div class="m-t">${esc(ST.name)} scored ${FAM.scores[0]} of 5</div><p class="m-d">Hand the device to <b>${esc(FAM.p2)}</b>. No peeking at the answers!</p>
      <div class="btns"><button class="btn btn-pri big" style="background:#E36B4E" onclick="famQ()">I’m ${esc(FAM.p2)} — start</button></div></div></div></div>`);return;}
  const [a,b]=FAM.scores;const win=a>b?ST.name:b>a?FAM.p2:null;
  xs().family.push({d:Date.now(),p2:FAM.p2,a,b});if(xs().family.length>30)xs().family.shift();addXP(a*2,a>b?2:1);
  setScreen(`<div class="screen active">${topBar('Family Challenge results','','#E36B4E')}<div class="act-body"><div class="qc mastery">
    <div class="medal">${win?'🏆':'🤝'}</div><div class="m-t">${win?esc(win)+' wins!':'It’s a tie!'}</div>
    <div class="fam-score"><div><b>${a}</b><span>${avImg(ST.avatar,'av-sm')} ${esc(ST.name)}</span></div><div><b>${b}</b><span>🧑 ${esc(FAM.p2)}</span></div></div>
    <div class="fam-qs">${FAM.qs.map((q,i)=>`<div class="fam-q"><span>${FAM.picks[0][i]?'✅':'❌'}</span><span>${FAM.picks[1][i]?'✅':'❌'}</span><span>${esc(plain(q.question).slice(0,70))}… <b>${q.answer}</b></span></div>`).join('')}</div>
    <div class="btns"><button class="btn btn-sec" onclick="famBegin()">Rematch (new questions)</button><button class="btn btn-pri" style="background:#E36B4E" onclick="renderDash()">Home</button></div></div></div></div>`);
  FX.win();checkAch();save();
}

// ═════════════ CERTIFICATES ═════════════
function showCertificate(title,line){
  const back=document.getElementById('app').innerHTML;CERT_BACK=back;
  const date=new Date().toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  setScreen(`<div class="screen active cert-screen">
    <div class="cert-bar no-print"><button class="btn btn-sec" onclick="certBack()">← Back</button><button class="btn btn-pri" style="background:#2F6FE0" onclick="certPrint()">🖨️ Print</button></div>
    <div class="cert"><div class="cert-in">
      <div class="cert-k">Certificate of Achievement</div>
      <div class="cert-m">${mascot(90,'cheer')}</div>
      <div class="cert-p">This certifies that</div>
      <div class="cert-name">${esc(ST.name)}</div>
      <div class="cert-p">${esc(line)}</div>
      <div class="cert-t">${esc(title)}</div>
      <div class="cert-f"><div><span>${date}</span><small>Date</small></div><div><span>LearnSpark</span><small>Awarded by</small></div></div>
    </div></div>
    <p class="muted no-print" style="text-align:center;margin:10px">If printing doesn’t open here, open LearnSpark from its web address, or take a screenshot.</p></div>`);
}
let CERT_BACK='';
function certBack(){app.innerHTML=CERT_BACK;window.scrollTo(0,0);}
function certPrint(){try{window.print();}catch(e){}}

// ═════════════ WORD-PROBLEM HELPER ═════════════
function isWordProblem(q){if(!q||q.type!=='mc'||q.passage)return false;const t=plain(q.question);
  const nums=t.match(/(?<![A-Za-z\d.,])-?\$?\d+(?:[.,]\d+)?(?:\/\d+)?/g)||[];return t.length>55&&nums.length>=2&&/[?]/.test(t)&&/[a-z]{4,}/i.test(t)&&!/^Solve|^Evaluate|=\s*\?/.test(t);}
function wpWrap(q){
  const t=plain(q.question);let k=0;
  const html=esc(t).replace(/(?<![A-Za-z\d.,])(-?\$?\d+(?:[.,]\d+)?(?:\/\d+)?(?:\s?(?:cm²|m²|cm|m|ft|in|miles|mph|°F|%))?)/g,m=>`<button class="wp-num" data-k="${k++}" onclick="wpTap(this)">${m}</button>`);
  SESSION.wpNeed=k;SESSION.wpGot=0;
  return `<div class="wp"><div class="wp-step" id="wpStep">${ic('target')} <b>Step 1:</b> Tap every number in the problem.</div><div class="q-text wp-text">${html.replace(/\n/g,'<br>')}</div></div>`;
}
function wpTap(b){if(b.classList.contains('got'))return;b.classList.add('got');FX.click();SESSION.wpGot++;
  if(SESSION.wpGot>=SESSION.wpNeed){const t=plain(SESSION.q.question);const qs=(t.match(/[^.!?\n]*\?/g)||[t]).pop().trim();
    document.getElementById('wpStep').innerHTML=`🎯 <b>Step 2: What is the question asking?</b><div class="wp-ask">${esc(qs)}</div>Now choose your answer.`;
    document.getElementById('opts').classList.remove('wp-hide');}}
function wpSkip(){document.getElementById('opts').classList.remove('wp-hide');const s=document.getElementById('wpStep');if(s)s.innerHTML='Choose your answer.';}

// ═════════════ register games ═════════════
Object.assign(GAMES,{
  detective:{icon:'🕵️',title:'Detective Cases',desc:'Solve it, then prove it',grad:'linear-gradient(135deg,#6D28D9,#4C1D95)'},
  mapquest:{icon:'🗺️',title:'Map Quest',desc:'Virginia’s regions',grad:'linear-gradient(135deg,#14A394,#0A6158)'},
  timeline:{icon:'⏳',title:'Timeline Dash',desc:'Order history fast',grad:'linear-gradient(135deg,#D97706,#92400E)'},
  whoami:{icon:'🎭',title:'Who Am I?',desc:'Guess from clues',grad:'linear-gradient(135deg,#9B5DE5,#6D28D9)'},
  pizza:{icon:'🍕',title:'Pizza Shop',desc:'Serve fractions',grad:'linear-gradient(135deg,#E36B4E,#B5543A)'},
  elevator:{icon:'🛗',title:'Integer Elevator',desc:'Up and down with negatives',grad:'linear-gradient(135deg,#2F6FE0,#1D4AA8)'},
});
const _launchBase=launchGame;
launchGame=function(key){
  const m={detective:startDetective,mapquest:startMapQuest,timeline:startTimeline,whoami:startWhoAmI,pizza:startPizza,elevator:startElevator};
  if(m[key]){ST.currentGame=key;FX.click();const g=GAMES[key];
    const desc={detective:'Read the clues, decide what happened, then tap the clues that PROVE it. Ignore clues that don’t help!',
      mapquest:'Label Virginia’s five regions, then find famous places on the map.',
      timeline:'You have 75 seconds. Tap four history events from earliest to latest. How many timelines can you finish?',
      whoami:'Clues appear one at a time. Guess the person early for more points!',
      pizza:'Customers order fractions of a pizza. Tap the right number of slices and serve!',
      elevator:'Ride up and down floors above and below the lobby (0) to solve integer problems.'}[key];
    return intro(g.icon,g.title,desc,m[key]);}
  return _launchBase(key);
};
// ═════════════ achievements ═════════════
ACH.push(
  {id:'test1',ic:'📝',label:'Test Taker',d:'Finish a practice test',t:()=>xs().tests.length>=1},
  {id:'test80',ic:'🎯',label:'Test Ready',d:'Score 80% or more on a 20-question practice test',t:()=>xs().tests.some(t=>t.n>=20&&t.c/t.n>=.8)},
  {id:'detective',ic:'🕵️',label:'Super Sleuth',d:'Solve 5 cases with proof',t:()=>xs().cases.c>=5},
  {id:'closet',ic:'🎩',label:'Dressed Up',d:'Buy something for Sparky',t:()=>xs().owned.length>=1},
  {id:'family',ic:'👨‍👩‍👧',label:'Family Night',d:'Play a Family Challenge',t:()=>xs().family.length>=1});


