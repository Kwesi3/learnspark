// Games must not give the answer away: nothing visible may depend on whether an option is correct
// until the child has answered.
const fs=require('fs');const path=require('path');
let fail=0;const ok=m=>console.log('  ✓',m),bad=m=>{fail++;console.log('  ✗',m);};
const src=fs.readdirSync(path.join(__dirname,'../src/js')).filter(f=>f.endsWith('.js'))
  .map(f=>[f,fs.readFileSync(path.join(__dirname,'../src/js',f),'utf8')]);
const leak=/\b(correct|isAns|isCorrect)\s*\?\s*['"`]#/;   // e.g. fillStyle = a.correct ? '#7C3AED' : ...
let hits=[];for(const [f,s] of src)s.split('\n').forEach((l,i)=>{if(leak.test(l))hits.push(`${f}:${i+1}`);});
hits.length?bad('colour depends on the right answer at '+hits.join(', ')):ok('no colour depends on the right answer');
const arc=src.find(([f])=>f==='170-arcade.js')[1];
/GAME_FILL\[a\.ci/.test(arc)&&/GAME_FILL\[o\.ci/.test(arc)?ok('Asteroids and Ninja use random colours'):bad('Asteroids/Ninja colours not random');
// right answer must not favour a position (first/last) in 4-option questions
const {JSDOM}=require('jsdom');
const w=new JSDOM(fs.readFileSync(path.join(__dirname,'../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.matchMedia=()=>({matches:false,addEventListener(){}});}}).window;
const gens=w.eval('Object.keys(XG).filter(g=>/^g[46]_/.test(g))');const pos=[0,0,0,0];let n=0;
for(const g of gens)for(let i=0;i<40;i++){w.__g=g;const q=w.eval('makeQ(__g)');if(!q||!q.opts||q.opts.length!==4)continue;
  const k=q.opts.findIndex(o=>String(o)===String(q.answer));if(k>=0){pos[k]++;n++;}}
const share=pos.map(x=>x/n);
share.every(x=>x>0.18&&x<0.32)?ok(`answer position is even (${share.map(x=>Math.round(x*100)+'%').join(' ')}, n=${n})`)
  :bad(`answer position is uneven: ${share.map(x=>Math.round(x*100)+'%').join(' ')}`);
process.exit(fail?1:0);
