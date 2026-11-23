const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__X={STORIES,LESSONS,SWAPS,CASES,normW};\n</script></body>');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const X=dom.window.__X;const clean=s=>s.replace(/[“”"]/g,'').replace(/[’]/g,"'");
const out={books:[],lessons:{},swaps:[],cases:[]};
for(const b of X.STORIES){
  const words={};const pages=b.pages.map(p=>p.t.map(s=>{const toks=s.split(/\s+/);toks.forEach(t=>{const k=X.normW(t);if(k&&!words[k])words[k]=clean(t).replace(/[.,!?;:—–]+$/,'').replace(/^[^A-Za-z0-9]+/,'');});return {text:clean(s),toks};}));
  const gloss=Object.entries(b.words||{}).map(([k,v])=>[k,`${k}. ${k} means ${v}.`]);
  const qs=b.qs.map(q=>({q:clean(q.q),o:q.o.map(clean)}));
  out.books.push({id:b.id,level:b.level,pages,words:Object.entries(words),gloss,qs,title:clean(b.title)});
}
for(const [g,arr] of Object.entries(X.LESSONS))out.lessons[g]=arr.map(clean).join(' ');
for(const lv of [1,2])X.SWAPS[lv].forEach((s,i)=>out.swaps.push({key:`s${lv}:${i}`,text:`${s[0]}. Change ${s[0][s[1]]} to ${s[2]}.`,ans:s[3]}));
X.CASES.forEach((c,i)=>out.cases.push({key:`c${i}`,text:clean(c.c.join(' ')+' '+c.q)}));
fs.writeFileSync('content.json',JSON.stringify(out,null,1));
const nW=out.books.reduce((a,b)=>a+b.pages.flat().reduce((x,s)=>x+s.toks.length,0),0);
console.log('books',out.books.length,'page words',nW,'unique words',out.books.reduce((a,b)=>a+b.words.length,0),'lessons',Object.keys(out.lessons).length,'swaps',out.swaps.length,'cases',out.cases.length);
