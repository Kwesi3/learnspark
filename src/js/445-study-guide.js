// ═══════════════════════════════════════════════════════════════
// STUDY GUIDES — a full "learn it" module for a standard, shown before practice.
// Path: Study guide → Practice → Quiz → SOL test. Recommended, never required.
//
// A guide is registered with SG.add(gen, {...}):
//   title  short name           goals  ["I can …"]
//   words  [[term, meaning, example]]
//   pages  [{h, p:[paragraphs], dg:()=>svg, ex:{q, steps:[…], a}, chk:{q, a, w:[wrongs], why}}]
//   watch  [[mistake, fix]]     tips   ["On the test …"]     sum   ["key fact"]
// Written from the VDOE Instructional Guides ("Understanding the Standard" and
// "Skills in Practice") for each standard.
// ═══════════════════════════════════════════════════════════════
const STUDY={};
const SG={add(gen,g){STUDY[gen]=g;}};
// Recorded narration: one audio sprite per batch (e.g. sg_g4math). Falls back to the device voice.
const SG_SPRITE={};
function sgSprite(gen){return SG_SPRITE[gen]||null;}
const SGS={gen:null,subj:null,code:null,i:0,tried:{}};

function sgStore(){ST.extras=ST.extras||{};return ST.extras.study=ST.extras.study||{};}
function sgDone(gen){const s=ST.extras&&ST.extras.study;return !!(s&&s[gen]&&s[gen].done);}
function sgPages(g){return 1+g.pages.length+1+1;}           // intro, teaching pages, watch-outs, summary
// Turn math symbols into words for the reader: 3/4 → "three fourths", × → "times", a.m. → "A M".
const SG_ORD={2:['half','halves'],3:['third','thirds'],4:['fourth','fourths'],5:['fifth','fifths'],6:['sixth','sixths'],7:['seventh','sevenths'],8:['eighth','eighths'],
  9:['ninth','ninths'],10:['tenth','tenths'],12:['twelfth','twelfths'],16:['sixteenth','sixteenths'],30:['thirtieth','thirtieths'],100:['hundredth','hundredths']};
const SG_UNI={'½':'1/2','¼':'1/4','¾':'3/4','⅓':'1/3','⅔':'2/3','⅕':'1/5','⅖':'2/5','⅗':'3/5','⅘':'4/5','⅛':'1/8','⅜':'3/8','⅝':'5/8','⅞':'7/8'};
// Abbreviations read letter by letter; other ALL-CAPS words are emphasis and are read normally.
const SG_SPELL=['UN','NAACP','HBCU','FDR','ADA','FDIC','WAAC','USS','PQ','AB','CD','EF','XYZ','ABC','DC'];
function sgFrac(n,d){const o=SG_ORD[d];return o?`${n} ${+n===1?o[0]:o[1]}`:`${n} over ${d}`;}
function sgSpeech(t){
  t=t.replace(/\(([<>=≠])\)/g,'').replace(/\(([+−]), ([+−])\)/g,(m,a,b)=>`(x ${a==='+'?'positive':'negative'}, y ${b==='+'?'positive':'negative'})`);
  const SUP={'⁰':0,'¹':1,'²':2,'³':3,'⁴':4,'⁵':5,'⁶':6,'⁷':7,'⁸':8,'⁹':9};
  t=t.replace(/(?:[A-Z][a-z]?[₀-₉]*)+/g,m=>/[₀-₉]/.test(m)?' '+m.match(/[A-Z][a-z]?[₀-₉]*/g).map(el=>el.replace(/[₀-₉]+/,d=>' '+[...d].map(c=>c.charCodeAt(0)-8320).join(''))).join(' ')+' ':m);   // CO₂ → C O 2
  t=t.replace(/\|(?! )([^|\s](?:[^|]*[^|\s])?)\|/g,'the absolute value of $1');   // |−12|, |5 − 8| — not the “52 | 009” period bars
  t=t.replace(/([A-Za-z0-9])²/g,'$1 squared').replace(/([A-Za-z0-9])³/g,'$1 cubed').replace(/([A-Za-z0-9])([⁰¹⁴⁵⁶⁷⁸⁹])/g,(m,b,e)=>`${b} to the power of ${SUP[e]}`);
  t=t.replace(/(^|[\s(:,])[−-](\d)/g,'$1negative $2').replace(/≥/g,' is greater than or equal to ').replace(/≤/g,' is less than or equal to ')
     .replace(/≅/g,' is congruent to ').replace(/π/g,' pi ').replace(/°F/g,' degrees').replace(/½/g,' one half ');
  t=t.replace(/[½¼¾⅓⅔⅕⅖⅗⅘⅛⅜⅝⅞]/g,m=>' '+SG_UNI[m]);
  t=t.replace(/(\d+)\s+(\d+)\/(\d+)/g,(m,w,n,d)=>`${w} and ${sgFrac(n,d)}`).replace(/\b(\d+)\/(\d+)\b/g,(m,n,d)=>sgFrac(n,d));
  t=t.replace(/∠\s?([A-Z])([A-Z])([A-Z])/g,'angle $1 $2 $3').replace(/∠\s?([A-Z0-9])/g,'angle $1').replace(/∥/g,' parallel ').replace(/⊥/g,' perpendicular ');
  t=t.replace(/\bsq\.? ?(ft|in|cm|m)\b/g,(m,u)=>'square '+({ft:'feet',in:'inches',cm:'centimeters',m:'meters'})[u]);
  t=t.replace(/(\d) ?in\b(?=[.,;)]|\s+by|\s+=|\s*$)/g,'$1 inches');
  t=t.replace(/(\d)\s?(ft|cm|mm|m|oz|lb|qt|gal|mL|L|kg|g)\b/g,(m,n,u)=>n+' '+({ft:'feet',cm:'centimeters',mm:'millimeters',m:'meters',oz:'ounces',lb:'pounds',qt:'quarts',gal:'gallons',mL:'milliliters',L:'liters',kg:'kilograms',g:'grams'})[u]);
  t=t.replace(/(^|[^\d.])1 (feet|inches|centimeters|millimeters|meters|ounces|pounds|quarts|gallons|milliliters|liters|kilograms|grams)\b/g,(m,a,u)=>a+'1 '+({feet:'foot',inches:'inch'}[u]||u.slice(0,-1)));
  t=t.replace(/\ba\.m\./g,'A M').replace(/\bp\.m\./g,'P M').replace(/(\d) R(\d)/g,'$1 remainder $2').replace(/\bSOL\b/g,'S O L');
  t=t.replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/−/g,' minus ').replace(/ \+ /g,' plus ').replace(/≈/g,' is about ').replace(/≠/g,' is not equal to ')
     .replace(/ = /g,' equals ').replace(/ > /g,' is greater than ').replace(/ < /g,' is less than ').replace(/→/g,', ').replace(/[✓✗✅❌·|]/g,' ');
  t=t.replace(/\binput\/output\b/gi,m=>m[0]==='I'?'Input and output':'input and output').replace(/([a-z])\/([a-z])/gi,'$1 or $2')
     .replace(/\(([<>=])\)/g,'').replace(/>/g,' greater than ').replace(/</g,' less than ').replace(/=/g,' equals ').replace(/\+/g,' plus ')
     .replace(/°/g,' degrees').replace(/∠/g,'angle').replace(/…/g,'.').replace(/\.\.+/g,'.');
  t=t.replace(/\bWWII\b/g,'World War Two').replace(/\bWWI\b/g,'World War One').replace(/&/g,' and ')
     .replace(/\bQuadrants? I–IV\b/g,'quadrants 1 through 4').replace(/\bI, II, III, IV\b/g,'1, 2, 3, 4')
     .replace(/\b(Quadrant |quadrant )(IV|III|II|I)\b/g,(m,q,n)=>q+{I:1,II:2,III:3,IV:4}[n])
     .replace(/(^|[\s:])(IV|III|II|I) (?=\()/g,(m,a,n)=>a+'quadrant '+{I:1,II:2,III:3,IV:4}[n]+' ')
     .replace(/\b([A-Z]{2,5})(s?)\b/g,(m,a,pl)=>SG_SPELL.includes(a)?a.split('').join(' ')+(pl?"'s":''):a.length>2&&!/^(NATO|WASP)$/.test(a)?a.toLowerCase()+pl:m);
  return t.replace(/\s+([.,;:])/g,'$1').replace(/\s+/g,' ').trim();}
function sgText(h){return String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}

function openStudy(subj,code,i){
  const st=findSkill(subj,code);if(!st||!STUDY[st.gen])return openLesson(subj,code);
  if(SGS.gen!==st.gen)SGS.tried={};
  Object.assign(SGS,{gen:st.gen,subj,code,i:i||0});sgRender();}

function sgPath(step){const names=['Study guide','Practice','Quiz','SOL test'];
  return `<ol class="sg-path" aria-label="Learning path">${names.map((n,k)=>`<li class="${k<step?'done':k===step?'now':''}">${k<step?'✓ ':''}${n}</li>`).join('')}</ol>`;}

function sgRender(){
  const g=STUDY[SGS.gen],st=findSkill(SGS.subj,SGS.code),s=SUBJ[SGS.subj],n=sgPages(g),i=SGS.i;
  const dots=Array.from({length:n},(_,k)=>`<button class="sg-dot ${k===i?'on':k<i?'seen':''}" onclick="SGS.i=${k};sgRender()" aria-label="Page ${k+1} of ${n}"${k===i?' aria-current="step"':''}></button>`).join('');
  let body='',say='';
  if(i===0){
    body=`<div class="les-art">${art(skArt(SGS.subj,SGS.code))}</div>
      <div class="les-k" style="color:${s.color}">What you'll learn</div>
      <ul class="sg-goals">${g.goals.map(x=>`<li>${x}</li>`).join('')}</ul>
      <div class="les-k" style="color:${s.color}">Key words</div>
      <div class="sg-words">${g.words.map(w=>`<div class="sg-word"><b>${w[0]}</b><span>${w[1]}</span>${w[2]?`<small>${w[2]}</small>`:''}</div>`).join('')}</div>
      ${typeof lessonVidBtn==='function'?lessonVidBtn(SGS.gen,st.name):''}`;
    say=`What you'll learn. ${g.goals.join('. ')}. Key words. ${g.words.map(w=>w[0]+': '+w[1]+'.').join(' ')}`;
  }else if(i<=g.pages.length){
    const p=g.pages[i-1],k=i-1;
    body=`<div class="les-k" style="color:${s.color}">Step ${i} of ${g.pages.length}</div><h2 class="sg-h">${p.h}</h2>
      ${p.p.map(x=>`<p class="sg-p">${x}</p>`).join('')}
      ${p.dg?`<div class="dg-wrap">${p.dg(s.color)}</div>`:''}
      ${p.ex?`<div class="sg-ex"><div class="sg-ex-t">Worked example</div><div class="sg-ex-q">${p.ex.q}</div>
        <ol class="sg-steps" id="sgSteps">${p.ex.steps.map((x,j)=>`<li class="${j===0?'':'hide'}">${x}</li>`).join('')}</ol>
        <div class="sg-ex-a hide" id="sgAns">✅ ${p.ex.a}</div>
        <button class="btn btn-sec" id="sgNext" onclick="sgStep()">Show the next step</button></div>`:''}
      ${p.chk?sgCheck(p.chk,k):''}`;
    say=`${sgText(p.h)}. ${p.p.map(sgText).join(' ')}`+(p.ex?` Worked example. ${sgText(p.ex.q)} ${p.ex.steps.map(sgText).join(' ')} ${sgText(p.ex.a)}`:'');
  }else if(i===g.pages.length+1){
    body=`<div class="les-k" style="color:${s.color}">Watch out for these mistakes</div>
      <div class="sg-watch">${g.watch.map(w=>`<div class="sg-w"><div class="sg-w-x">✗ ${w[0]}</div><div class="sg-w-ok">✓ ${w[1]}</div></div>`).join('')}</div>
      ${g.tips&&g.tips.length?`<div class="les-k" style="color:${s.color}">On the SOL test</div><ul class="sg-tips">${g.tips.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}`;
    say=`Watch out for these mistakes. ${g.watch.map(w=>'Mistake: '+sgText(w[0])+' Instead: '+sgText(w[1])).join(' ')} ${g.tips?'On the S O L test. '+g.tips.map(sgText).join(' '):''}`;
  }else{
    body=`<div class="les-k" style="color:${s.color}">Remember</div><ul class="les-list">${g.sum.map(x=>`<li>${x}</li>`).join('')}</ul>
      <div class="les-k" style="color:${s.color};margin-top:14px">Try one from practice</div><div id="exArea"></div>
      <button class="btn btn-sec" style="margin-top:10px" onclick="drawExample('${SGS.subj}','${SGS.code}')">↻ Show another example</button>
      <div class="ws-les"><button class="link-btn" onclick="sgPrint()">🖨 Print this study sheet</button></div>`;
    say=`Remember. ${g.sum.map(sgText).join(' ')}`;
    const m=sgStore();m[SGS.gen]=Object.assign(m[SGS.gen]||{},{done:1,at:Date.now()});save();
  }
  const last=i===n-1;
  setScreen(`<div class="screen active lesson sg">
    <div class="topbar calm" style="--acc:${s.band}">
      <button class="tb-back" onclick="openSubject('${SGS.subj}')" aria-label="Back">←</button>
      <div class="tb-user"><div class="tb-name" style="color:#fff">${g.title||st.name}</div>
      <div class="tb-sub" style="color:rgba(255,255,255,.9)">SOL ${st.code} · Study guide</div></div>
    </div>
    <div class="act-body">${sgPath(0)}
      <div class="qc sg-card">${body}
        <button class="btn btn-sec speak" onclick="sgSay()">${ic('speaker')} Read to me</button></div>
      <div class="sg-dots">${dots}</div>
      <div class="btns sg-nav">
        ${i>0?`<button class="btn btn-sec" onclick="SGS.i--;sgRender()">← Back</button>`:''}
        ${last?`<button class="btn btn-pri big" style="background:${s.color}" onclick="narrStop();beginPractice('${SGS.subj}','${SGS.code}')">Start practicing →</button>`
              :`<button class="btn btn-pri big" style="background:${s.color}" onclick="SGS.i++;sgRender()">Next →</button>`}
      </div>
      ${i===0?`<div class="sg-skip"><button class="link-btn" onclick="beginPractice('${SGS.subj}','${SGS.code}')">I already know this — skip to practice</button></div>`:''}
    </div></div>`);
  SGS.say=sgSpeech(say);
  if(last)drawExample(SGS.subj,SGS.code);
  if(typeof narrLoad==='function'&&sgSprite(SGS.gen))narrLoad(sgSprite(SGS.gen));
  window.scrollTo(0,0);
}

function sgSay(){const key=`S:${SGS.gen}:${SGS.i}`,sp=sgSprite(SGS.gen);
  narrOrSay(sp,key,SGS.say,.92);}

function sgStep(){const li=[...document.querySelectorAll('#sgSteps li')];const nx=li.find(x=>x.classList.contains('hide'));
  if(nx){nx.classList.remove('hide');if(!li.some(x=>x.classList.contains('hide'))){document.getElementById('sgAns').classList.remove('hide');document.getElementById('sgNext').remove();}}}

// Quick check: ungraded. A wrong pick explains why and lets the child try again.
function sgCheck(c,k){const opts=SGS.tried['o'+k]||(SGS.tried['o'+k]=shuf([c.a,...c.w]));
  return `<div class="sg-chk" id="sgChk"><div class="sg-ex-t">Quick check</div><div class="sg-ex-q">${c.q}</div>
    <div class="opts">${opts.map((o,j)=>`<button class="opt" onclick="sgPick(${k},${j},this)"><span class="opt-l">${'ABCDEF'[j]}</span>${o}</button>`).join('')}</div>
    <div class="sg-fb" id="sgFb" aria-live="polite"></div></div>`;}
function sgPick(k,j,b){const g=STUDY[SGS.gen],c=g.pages[k].chk,o=SGS.tried['o'+k][j],fb=document.getElementById('sgFb');
  if(String(o)===String(c.a)){b.classList.add('correct');document.querySelectorAll('#sgChk .opt').forEach(x=>x.disabled=true);
    fb.className='sg-fb ok';fb.innerHTML=`<b>Yes!</b> ${c.why}`;FX.correct();}
  else{b.classList.add('wrong');b.disabled=true;fb.className='sg-fb no';fb.innerHTML=`<b>Not quite — try again.</b> ${c.hint||'Read the step above once more.'}`;FX.wrong();}}

// One-page printable study sheet (reuses the worksheet print layout).
function sgPrint(){const g=STUDY[SGS.gen],st=findSkill(SGS.subj,SGS.code);
  let el=document.getElementById('ws');if(!el){el=document.createElement('div');el.id='ws';document.querySelector('.act-body').appendChild(el);}
  el.innerHTML=`<div class="ws-page sg-sheet"><div class="ws-head"><div><b>LearnSpark study sheet</b> · ${esc(st.name)} · SOL ${st.code}</div>
    <div class="ws-name">Name <span class="ws-line"></span></div></div>
    <h3>I can…</h3><ul>${g.goals.map(x=>`<li>${x}</li>`).join('')}</ul>
    <h3>Key words</h3><ul>${g.words.map(w=>`<li><b>${w[0]}</b> — ${w[1]}${w[2]?` <i>(${w[2]})</i>`:''}</li>`).join('')}</ul>
    <h3>Worked examples</h3>${g.pages.filter(p=>p.ex).map(p=>`<p><b>${p.ex.q}</b><br>${p.ex.steps.join('<br>')}<br>Answer: ${p.ex.a}</p>`).join('')}
    <h3>Watch out</h3><ul>${g.watch.map(w=>`<li>✗ ${w[0]} → ✓ ${w[1]}</li>`).join('')}</ul>
    <h3>Remember</h3><ul>${g.sum.map(x=>`<li>${x}</li>`).join('')}</ul>
    <div class="ws-foot">Practice only — not an official SOL test. Not affiliated with the Virginia Department of Education.</div></div>`;
  wsPrint();}

