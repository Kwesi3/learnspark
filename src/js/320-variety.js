// ── QUESTION VARIETY & CHALLENGE ENGINE ──────────────────────
// Extra question banks (XB) and extra math templates (XG) are mixed in with the
// original questions. Items marked d:3 or generators marked hard are "Challenge"
// questions, served more often as a child's SmartScore rises.
// A per-learner history of recently seen questions keeps sessions from repeating.
const XB={},XG={};
function addQ(gen,items){(XB[gen]=XB[gen]||[]).push(...items);}
function addGen(gen,fn,hard){(XG[gen]=XG[gen]||[]).push({fn,hard:!!hard});}
function addGens(gen,fns,hard){fns.forEach(f=>addGen(gen,f,hard));}
function stFor(gen){
  for(const g of Object.keys(STRANDS))for(const s of Object.keys(STRANDS[g]))for(const st of STRANDS[g][s])if(st.gen===gen)return st;
  return {code:'',name:'Practice'};}
// distractor helper: unique wrong answers that differ from the answer
function wrongs(ans,cands,n=3){const A=String(ans),out=[],seen=new Set([A]);
  for(const c of cands){const k=String(c);if(!seen.has(k)&&c!==undefined&&c!==null&&k!=='NaN'){seen.add(k);out.push(c);}if(out.length>=n)break;}
  return out;}
// math helper for extra templates: mq(gen, question, answer, wrong candidates, explanation, hint, extra)
function mq(gen,question,answer,cands,expl,hint,extra){const st=stFor(gen);
  return mcq(st.name,st.code,question,[answer].concat(wrongs(answer,cands)),answer,expl,hint,extra||{});}
function nearby(n,spread=[1,-1,2,-2,10,-10]){return spread.map(d=>n+d).filter(x=>x>=0);}
function bankQ(gen,it){const st=stFor(gen);
  if(it.t==='multi')return {type:'multi',badge:'Select all',sol:st.code,question:it.q,opts:shuf(it.o.slice()),answers:it.a,explanation:it.e,hint:it.h};
  if(it.t==='order')return {type:'order',badge:'Put in order',sol:st.code,question:it.q,items:it.items,explanation:it.e,hint:it.h};
  const q=mcq(st.name,st.code,it.q,[it.a].concat(it.w),it.a,it.e,it.h);if(it.p)q.passage=it.p;return q;}
function baseSize(gen){
  const banks=[typeof MSB!=='undefined'&&MSB,typeof READ_BANK!=='undefined'&&READ_BANK,typeof SCI_BANK!=='undefined'&&SCI_BANK,
    typeof HIST_BANK!=='undefined'&&HIST_BANK,typeof WRITE_BANK!=='undefined'&&WRITE_BANK];
  for(const b of banks)if(b&&b[gen]&&b[gen].length)return b[gen].length;
  return GEN[gen]?8:0;}
// how much challenge this learner is ready for (0..1 share of hard questions)
function challengeShare(gen){
  if(typeof SESSION!=='undefined'&&SESSION.active&&SESSION.gen===gen&&SESSION.subj&&SESSION.code){
    const s=getSkill(SESSION.subj,SESSION.code);const sc=s?s.score:0;
    if(SESSION.challenge)return .7;
    return sc>=90?.6:sc>=70?.45:sc>=40?.15:0;}
  return .2;}
function qSig(q){const s=(q.passage||'')+'|'+(q.question||'')+'|'+(q.correct||'');let h=5381;
  for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
function seenList(gen){if(typeof ST==='undefined'||!ST.id)return null;
  ST.extras=ST.extras||{};const S=ST.extras.seen=ST.extras.seen||{};return S[gen]=S[gen]||[];}
function drawQ(gen){
  const xb=XB[gen]||[],xg=XG[gen]||[];
  const hardB=xb.filter(i=>i.d===3),normB=xb.filter(i=>i.d!==3),hardG=xg.filter(g=>g.hard),normG=xg.filter(g=>!g.hard);
  const wantHard=(hardB.length||hardG.length)&&Math.random()<challengeShare(gen);
  let q;
  if(wantHard){const wB=hardB.length,wG=hardG.length*6;
    q=Math.random()*(wB+wG)<wB?bankQ(gen,pick(hardB)):pick(hardG).fn();
    q.hard=true;q.badge='★ Challenge';}
  else{const wBase=baseSize(gen),wB=normB.length,wG=normG.length*5,r=Math.random()*(wBase+wB+wG||1);
    if(r<wBase||!(wB+wG))q=_makeQPrev(gen);
    else if(r<wBase+wB)q=bankQ(gen,pick(normB));
    else q=pick(normG).fn();}
  return q;}
const _makeQPrev=makeQ;
makeQ=function(gen){
  if(!XB[gen]&&!XG[gen])return _makeQPrev(gen);
  const seen=seenList(gen);let q,sig;
  for(let i=0;i<30;i++){q=drawQ(gen);sig=qSig(q);if(!seen||!seen.includes(sig))break;}
  if(seen&&sig){seen.push(sig);
    const pool=baseSize(gen)+(XB[gen]||[]).length+(XG[gen]||[]).length*20;
    const cap=Math.max(4,Math.min(120,Math.floor(pool*.75)));while(seen.length>cap)seen.shift();}
  return tidyQ(q);};
// math text tidy: “1x” → “x”, “-1x” → “−x”, hyphen-minus → “−” before numbers and x
function tidyText(t){return typeof t!=='string'?t:t.replace(/(^|[\s(,=+−{\[])-(?=[\dx])/g,'$1−').replace(/(^|[^\d.])1x/g,'$1x').replace(/\+ −/g,'− ');}
function tidyQ(q){if(!q||q.type!=='mc')return q;q.question=tidyText(q.question);if(q.opts){q.opts=q.opts.map(tidyText);q.answer=tidyText(q.answer);}return q;}
// shorthand for bank items: QI normal, QH challenge, QP with a reading passage
function QI(q,a,w,e,h){return {q,a,w,e,h};}
function QH(q,a,w,e,h){return {q,a,w,e,h,d:3};}
function QP(p,q,a,w,e,h,hard){const o={p,q,a,w,e,h};if(hard)o.d=3;return o;}
// ── Challenge in the practice screen ──
// a "Challenge me" switch in the practice side panel, a gold badge on Challenge questions, and bonus XP for getting them right
function hasChallenge(gen){return (XB[gen]||[]).some(i=>i.d===3)||(XG[gen]||[]).some(g=>g.hard);}
function challengeBox(){if(SESSION.mode!=='skill'||!hasChallenge(SESSION.gen))return '';
  const on=!!SESSION.challenge,sc=scoreOf(SESSION.subj,SESSION.code);
  const note=on?'Lots of harder questions':(sc>=70?'Harder questions are mixed in now':'Turns on a little at SmartScore 40, more at 70');
  return `<div class="side-box ch-box"><div class="side-l">Challenge</div>
    <button class="ch-tog${on?' on':''}" role="switch" aria-checked="${on}" onclick="toggleChallenge()"><span class="ch-k"></span><span>${on?'On':'Off'}</span></button>
    <div class="ch-note">${note}</div></div>`;}
function toggleChallenge(){SESSION.challenge=!SESSION.challenge;ST.settings=ST.settings||{};ST.settings.challenge=SESSION.challenge;save();
  const b=document.querySelector('.ch-box');if(b)b.outerHTML=challengeBox();FX.click&&FX.click();
}
const _rpsV=renderPracticeShell;
renderPracticeShell=function(){if(SESSION.mode==='skill'&&SESSION.challenge===undefined)SESSION.challenge=!!(ST.settings&&ST.settings.challenge);
  _rpsV.apply(this,arguments);const side=document.querySelector('#activity .side');
  if(side&&SESSION.mode==='skill'){const h=challengeBox();if(h)side.insertAdjacentHTML('beforeend',h);}};
const _bpV=beginPractice;beginPractice=function(){SESSION.challenge=undefined;return _bpV.apply(this,arguments);};
const _nqV=nextQuestion;
nextQuestion=function(){_nqV.apply(this,arguments);
  if(SESSION.q&&SESSION.q.hard){const b=document.querySelector('#actBody .q-badge');if(b){b.classList.add('q-hard');b.removeAttribute('style');}}};
const _recV=record;
record=function(correct){const hard=SESSION.q&&SESSION.q.hard;_recV.apply(this,arguments);
  if(correct&&hard){ST.xp+=5;save();const fb=document.getElementById('fbCard');
    if(fb&&!fb.querySelector('.ch-bonus'))fb.insertAdjacentHTML('afterbegin','<div class="ch-bonus">★ Challenge solved · +5 bonus XP</div>');}};

