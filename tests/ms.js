const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__ST=ST;window.__STR=STRANDS;window.__MSB=MSB;window.__L=LESSONS;\n</script></body>');
const errors=[];const fail=[];const ok=m=>console.log('  ✓',m);const bad=m=>{fail.push(m);console.log('  ✗',m);};
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0,exponentialRampToValueAtTime(){},setValueAtTime(){},linearRampToValueAtTime(){}},type:''}),createGain:()=>({connect(){},gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}}}),createBuffer:()=>({getChannelData:()=>new Float32Array(10)}),createBufferSource:()=>({connect(){},start(){},buffer:null}),destination:{},currentTime:0,sampleRate:44100};};
  w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};w.HTMLElement.prototype.focus=function(){};
  w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.addEventListener('error',e=>errors.push(e.error?e.error.stack.split('\n').slice(0,2).join(' '):e.message));}});
const w=dom.window,d=w.document;
for(const g of [7,8]){let n=0,probs=0;
  for(const subj of Object.keys(w.__STR[g]))for(const st of w.__STR[g][subj]){
    if(!w.__L[st.gen])bad(`${g} ${st.code} no lesson`);
    for(let i=0;i<400;i++){n++;let q;try{q=w.makeQ(st.gen);}catch(e){bad(`${st.code} threw ${e.message}`);break;}
      if(q.sol!==st.code){bad(`${st.code} tagged ${q.sol}`);probs++;break;}
      const txt=JSON.stringify(q);if(/NaN|undefined|Infinity|null\b/.test(txt.replace(/"dgSvg":"[^"]*"/,''))){bad(`${st.code} bad text: ${txt.slice(0,200)}`);probs++;break;}
      if(q.type==='mc'){if(!q.opts.map(String).includes(String(q.answer))){bad(`${st.code} answer missing: ${q.question} | ${q.answer} | ${q.opts}`);probs++;break;}
        if(q.opts.length<2||new Set(q.opts.map(String)).size!==q.opts.length){bad(`${st.code} opts ${q.opts}`);probs++;break;}}
      if(q.type==='multi'&&!q.answers.every(a=>q.opts.includes(a))){bad(st.code+' multi');break;}}
  }
  console.log(`grade ${g}: ${n} questions generated`);
}
// grade switching + screens
w.eval("(()=>{const p=blankLearner('Kid',7,'🦊');PROFILES.list[p.id]=p;persistProfiles();activateProfile(p.id);renderDash();})()");
d.querySelector('.cl-subj')&&ok('grade 7 home renders');
const titles=[...d.querySelectorAll('.cl-subj-b b')].map(b=>b.textContent);titles.includes('Life Science')&&titles.includes('Civics & Economics')?ok('grade 7 subject titles: '+titles.join(', ')):bad('titles '+titles);
w.clGrade(8);[...d.querySelectorAll('.cl-subj-b b')].map(b=>b.textContent).includes('World Geography')?ok('grade 8 switch'):bad('grade 8 titles');
for(const g of [7,8]){w.clGrade(g);for(const s of ['math','read','sci','write','hist']){w.openSubject(s);const n=d.querySelectorAll('.skill').length;if(!n)bad(`${g} ${s} no skills`);
  const st=w.__STR[g][s][0];w.openLesson(s,st.code);if(!d.querySelector('.les-art'))bad('lesson '+st.code);
  w.startSkill(s,st.code);w.renderDash();}
  ok(`grade ${g}: subject maps, lessons, practice open`);
  w.renderTestSetup();w.startTest&&w.startTest();ok(`grade ${g}: practice test builds`);w.renderDash();
  for(const gm of ['timeline','whoami','speedmath','solquiz','wordwiz']){try{w.launchGame(gm);const b=d.getElementById('playBtn');if(b)b.onclick();}catch(e){bad(gm+' '+e.message);}}
  ok(`grade ${g}: games start`);w.renderDash();}
// old profile grade 2 normalizes
w.eval("(()=>{const q=blankLearner('Old',2,'🦊');PROFILES.list[q.id]=q;activateProfile(q.id);renderDash();})()");w.__ST.grade===2?ok('grade 2 kept'):bad('norm '+w.__ST.grade);
errors.length?bad('runtime errors: '+errors.slice(0,3).join(' | ')):ok('no runtime errors');
console.log(fail.length?`FAILED (${fail.length})`:'ALL PASSED');
w.close&&0;process.exit(fail.length?1:0);
