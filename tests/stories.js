const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__S={STORIES,BOOK_LEVELS,normW};\n</script></body>');
const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',pretendToBeVisual:true,beforeParse(w){w.AudioContext=function(){return{createGain:()=>({connect(){},gain:{}}),createOscillator:()=>({connect(){},frequency:{}})}};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.scrollTo=()=>{};w.requestAnimationFrame=()=>0;w.HTMLElement.prototype.scrollIntoView=function(){};w.addEventListener('error',e=>errs.push(e.message));}});
const w=dom.window,d=w.document,{STORIES,BOOK_LEVELS,normW}=w.__S;let bad=0;const B=m=>{bad++;console.log('  ✗',m);};
console.log('stories',STORIES.length,'by level',[1,2,3,4].map(l=>STORIES.filter(b=>b.level===l).length).join('/'));
const ids=new Set();for(const b of STORIES){if(ids.has(b.id))B('dup id '+b.id);ids.add(b.id);
 if(!BOOK_LEVELS[b.level])B(b.id+' level');
 const text=b.pages.map(p=>p.t.join(' ')).join(' ');
 for(const k of Object.keys(b.words||{}))if(!b.pages.some(p=>p.t.join(' ').split(/\s+/).some(t=>normW(t.replace(/[’']s$/,''))===k)))B(`${b.id} gloss word not in text: ${k}`);
 b.qs.forEach((q,i)=>{if(!q.o.includes(q.a))B(`${b.id} q${i} answer`);if(new Set(q.o).size!==q.o.length)B(`${b.id} q${i} dup`);
   (q.ev||[]).forEach(e=>{if(!b.pages[e[0]]||!b.pages[e[0]].t[e[1]])B(`${b.id} q${i} ev ${e}`);});if(!q.why||!q.hint)B(`${b.id} q${i} why/hint`);});}
// open every new book, every page, and the quiz
w.eval("(()=>{const p=blankLearner('Kid',8,'🦊');PROFILES.list[p.id]=p;activateProfile(p.id);renderDash();})()");
w.switchTab('stories');const chips=[...d.querySelectorAll('.chips .chip')].length;chips===4?console.log('  ✓ 4 level chips'):B('chips '+chips);
for(const b of STORIES.slice(9)){w.openBook(b.id);for(let i=0;i<b.pages.length;i++){w.eval(`READ.page=${i};drawPage()`);if(!d.querySelector('#rScene img, #rScene svg'))B(b.id+' no picture p'+i);}
  try{w.finishPages?w.finishPages():0;}catch(e){}}
console.log(errs.length?'runtime: '+errs.slice(0,3).join(' | '):'  ✓ no runtime errors');
console.log(bad?`FAILED ${bad}`:'ALL PASSED');process.exit(0);
