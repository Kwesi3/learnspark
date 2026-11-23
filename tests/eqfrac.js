const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const w=dom.window;const gens=w.eval('[...new Set(Object.values(STRANDS).flatMap(o=>Object.values(o).flat().map(s=>s.gen)))]');
const val=s=>{s=String(s).trim();let m=/^(-?\d+) (\d+)\/(\d+)$/.exec(s);if(m)return +m[1]+m[2]/m[3];m=/^(-?\d+)\/(\d+)$/.exec(s);if(m)return m[1]/m[2];m=/^-?\d+(\.\d+)?$/.exec(s);if(m)return +s;return null;};
const bad={};
for(const g of gens){for(let i=0;i<150;i++){let q;try{q=w.eval(`makeQ(${JSON.stringify(g)})`);}catch(e){continue;}
  if(!q||!q.opts||/simplest|lowest terms|equivalent|same (value|amount)|equal to|NOT|unsimplified|form/i.test(q.question))continue;
  const va=val(q.answer);if(va==null)continue;
  const dup=q.opts.filter(o=>String(o)!==String(q.answer)&&val(o)!=null&&Math.abs(val(o)-va)<1e-9);
  if(dup.length){(bad[g]=bad[g]||[]).push(q.question.slice(0,90)+' | '+q.answer+' ~ '+dup.join(','));}}}
for(const [g,a] of Object.entries(bad))console.log(g,a.length,'\n   ',[...new Set(a)].slice(0,3).join('\n    '));
console.log('gens',gens.length,'bad',Object.keys(bad).length);
