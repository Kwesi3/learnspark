const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__STR=STRANDS;\n</script></body>');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{createOscillator:()=>({connect(){},start(){},stop(){},frequency:{value:0}}),createGain:()=>({connect(){},gain:{value:0}}),destination:{},currentTime:0};};
  w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const w=dom.window;const N=+process.argv[2]||300;const rows=[];
for(const g of [1,2,3,4,6,7,8])for(const subj of Object.keys(w.__STR[g]))for(const st of w.__STR[g][subj]){
  const ex=new Set(),tp=new Set();
  for(let i=0;i<N;i++){const q=w.makeQ(st.gen);const s=(q.passage||'')+'|'+(q.question||'')+'|'+(q.correct||'')+(q.words||'');
    ex.add(s);tp.add(s.replace(/\d[\d,.]*/g,'#').replace(/\b[A-Z][a-z]+\b/g,'N').replace(/<svg[\s\S]*?<\/svg>/g,''));}
  rows.push({g,subj,code:st.code,gen:st.gen,exact:ex.size,tmpl:tp.size});}
const out=rows.map(r=>`${r.g}\t${r.subj}\t${r.code}\t${r.gen}\t${r.exact}\t${r.tmpl}`).join('\n');
fs.writeFileSync(''+require('path').join(__dirname,'../dist/variety.tsv')+'',out);
console.log('skills',rows.length);
const by={};for(const r of rows){const k=r.g+' '+r.subj;by[k]=by[k]||[];by[k].push(r);}
for(const k in by){const a=by[k];console.log(k.padEnd(10),'skills',a.length,'min exact',Math.min(...a.map(r=>r.exact)),'median exact',a.map(r=>r.exact).sort((x,y)=>x-y)[a.length>>1],'median tmpl',a.map(r=>r.tmpl).sort((x,y)=>x-y)[a.length>>1]);}
process.exit(0);
