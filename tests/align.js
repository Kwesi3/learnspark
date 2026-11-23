const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__R=READ;window.__B=STORIES;\n</script></body>');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
  w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const w=dom.window;
const page=(id,p)=>{const b=w.__B.find(x=>x.id===id);const names=new Set(b.names.map(w.normW));const exp=[];
  b.pages[p].t.join(' ').split(/\s+/).forEach(word=>word.split(/[-–—]+/).map(w.normW).filter(Boolean).forEach(s=>exp.push({w:s,free:names.has(s)})));return exp;};
const run=(id,p,said)=>{const e=page(id,p);const r=w.alignWords(e,w.spokenTokens(said),0,new Array(e.length).fill(0));return {done:r.cur>=e.length,cur:r.cur,n:e.length};};
const cases=[
 ['unrelated speech does not finish the page','pip',0,'I like pizza and video games a lot',r=>!r.done&&r.cur<=1],
 ['half the page → stops halfway','turtles',0,'Ama and her grandmother walked along the beach after sunset',r=>!r.done&&r.cur>5&&r.cur<r.n],
 ['skipping one word still finishes','pip',1,'Pip kicks ball the ball rolls and rolls',r=>r.done],
 ['“to” heard as “two” is fine','turtles',4,'Ama switched off the light in the silver moonlight the hatchlings scrambled two word the waves',r=>r.done],
 ['reading only the last sentence does not finish','bees',0,'It is looking for nectar a sweet liquid inside each flower',r=>!r.done],
 ['numbers spoken as digits','moonbase',0,'On Moon Base 9 12 year old Zara knew every hum and beep of the habitat so when the hallway lights flickered and the air fans went quiet she noticed before the alarms did',r=>r.done],
];
let f=0;for(const [name,id,p,said,test] of cases){const r=run(id,p,said);const pass=test(r);if(!pass)f++;console.log((pass?'  ✓ ':'  ✗ ')+name,JSON.stringify(r));}
console.log(f?'FAILED':'ALL PASSED');
