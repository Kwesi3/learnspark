const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.matchMedia=()=>({matches:false,addEventListener(){}});}});
const w=dom.window;let fail=0;const F=(m)=>{fail++;if(fail<40)console.log('FAIL',m);};
const gens=w.eval('[...new Set(Object.values(STRANDS).flatMap(o=>Object.values(o).flat().map(s=>s.gen)))]');
const cnt={};let inputs=0,inputWrong=0;
for(const g of gens){for(let i=0;i<120;i++){const q0=w.eval(`makeQ(${JSON.stringify(g)})`);w.__q0=q0;
  const q=w.eval(`solFormats(${JSON.stringify(g)},__q0,${i%2?'true':'false'})`);cnt[q.type]=(cnt[q.type]||0)+1;w.__q=q;
  if(q.type==='sort'){if(q.cats.length<2)F(g+' sort <2 cats '+q.question);const t=q.items.map(x=>x.t);if(new Set(t).size!==t.length)F(g+' dup items '+t);
    q.cats.forEach((c,ci)=>{if(!q.items.some(x=>x.c===ci))F(g+' empty cat '+c);});
    if(!w.eval('solSortOK(__q,__q.items.map(x=>x.c))'))F(g+' sort check');}
  if(q.type==='multi'){if(new Set(q.opts).size!==q.opts.length)F(g+' multi dup');if(!q.answers.every(a=>q.opts.includes(a)))F(g+' multi ans');if(q.answers.length===q.opts.length)F(g+' all correct');}
  if(q.type==='nline'){if(!(q.ans>0&&q.ans<=q.steps)&&q.ans!==0)F(g+' nl ans');if(q.names.length!==q.steps+1||q.labels.length!==q.steps+1)F(g+' nl len');if(!q.labels[0]||!q.labels[q.steps])F(g+' nl ends '+q.question);}
  if(q.type==='plot'){if(Math.abs(q.ans[0])>q.R||Math.abs(q.ans[1])>q.R)F(g+' plot R');}
  if(q.type==='input'){inputs++;if(!w.eval('solCheckInput(__q,__q.num)'))F(g+' input self '+q.num+' | '+q.question);
    const full=(q.pre||'')+q.num+(q.suf?' '+q.suf:'');if(!w.eval(`solCheckInput(__q,${JSON.stringify(full)})`))F(g+' input full '+full);
    for(const o of q0.opts){if(String(o)===String(q0.answer))continue;w.__o=String(o).replace(/^\$/,'').replace(/\s*[a-zA-Z²³°%].*$/,'');if(w.eval('solCheckInput(__q,__o)')){inputWrong++;F(g+' wrong accepted '+o+' vs '+q0.answer+' | '+q.question);}}}
}}
console.log(cnt,'inputs',inputs);console.log(fail?`FAILED ${fail}`:'ALL PASSED');process.exit(0);
