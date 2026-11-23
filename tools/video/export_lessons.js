const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../../dist/app.html'),'utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const w=dom.window;w.eval('Math.random=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})()');
const out=[];
const PLAN=[[4,'math'],[5,'math'],[6,'math'],[4,'sci'],[5,'sci'],[6,'sci'],[4,'read'],[5,'read'],[6,'read'],[4,'write'],[5,'write'],[6,'write'],[7,'math'],[8,'math']];
for(const [g,sj] of PLAN)for(const s of w.eval(`STRANDS[${g}].${sj}`)){
  let ex=null,tries=[];
  for(let i=0;i<80&&!ex;i++){const q=w.eval(`makeQ(${JSON.stringify(s.gen)})`);tries.push(q);
    const keys=Object.keys(q);const vis=keys.some(k=>/svg|visual|html|img|fig|grid|table|chart/i.test(k)&&q[k]);
    if(q.type==='mc'&&!q.passage&&!q.p&&!q.text&&!vis&&!/[<>|]|xx|—/i.test(q.question+q.explanation)&&q.question.length<170&&q.explanation&&q.explanation.length<170&&q.opts&&q.opts.every(o=>String(o).length<40))ex=q;}
  out.push({g,subj:sj,sname:w.eval(`SUBJ.${sj}.short`),code:s.code,name:s.name,gen:s.gen,band:w.eval(`SUBJ.${sj}.band`),les:w.eval(`LESSONS[${JSON.stringify(s.gen)}]`),ex:ex&&{q:ex.question,opts:ex.opts,a:ex.answer,e:ex.explanation}});
}
fs.writeFileSync('lessons.json',JSON.stringify(out,null,1));
process.exitCode=0;console.log(out.length,'no example:',out.filter(x=>!x.ex).map(x=>x.gen).join(','));
