// Export all learning content for review: node tools/content/export.js [samplesPerGenerator]
// Writes dist/content/questions.csv (sampled from every generator, one row per question template),
// lessons.csv, stories.csv and skills.csv. Open them in Excel or Google Sheets.
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const N=+process.argv[2]||40;
const html=fs.readFileSync(path.join(__dirname,'../../dist/app.html'),'utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://example.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};
  w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.matchMedia=()=>({matches:false,addEventListener(){}});}});
const w=dom.window;const out=path.join(__dirname,'../../dist/content');fs.mkdirSync(out,{recursive:true});
const csv=rows=>rows.map(r=>r.map(v=>{v=v==null?'':String(v).replace(/<[^>]+>/g,'');return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}).join(',')).join('\n')+'\n';
const skills=w.eval(`Object.entries(STRANDS).flatMap(([g,o])=>Object.entries(o).flatMap(([subj,list])=>list.map(s=>({grade:+g,subj,code:s.code,name:s.name,gen:s.gen,lesson:(LESSONS[s.gen]||[]).join(' | ')}))))`);
fs.writeFileSync(path.join(out,'skills.csv'),csv([['grade','subject','sol','skill','generator','lesson']].concat(skills.map(s=>[s.grade,s.subj,s.code,s.name,s.gen,s.lesson]))));
const rows=[['id','grade','subject','sol','skill','type','difficulty','question','options','answer','explanation','hint']];
for(const s of skills){const seen=new Set();
  for(let i=0;i<N;i++){w.__g=s.gen;let q;try{q=w.eval('makeQ(__g)');w.__q=q;q=w.eval('solFormats(__g,__q,true)');}catch(e){rows.push(['ERROR',s.grade,s.subj,s.code,s.name,'','',String(e)]);break;}
    w.__q=q;const id=w.eval('qId(__q,__g)');if(seen.has(id))continue;seen.add(id);
    const opts=q.opts?q.opts.join(' | '):q.items?q.items.map(x=>x.t||x).join(' | '):'';
    const ans=['input','sort','nline','plot'].includes(q.type)?w.eval('solCorrectText(__q)'):q.answers?q.answers.join(' | '):q.type==='order'?q.items.join(' → '):q.correct||q.answer;
    rows.push([id,s.grade,s.subj,s.code,s.name,q.type,q.d||'',(q.passage?'[passage] ':'')+(q.question||''),opts,ans,q.explanation||q.expl||'',q.hint||'']);}}
fs.writeFileSync(path.join(out,'questions.csv'),csv(rows));
const st=w.eval('STORIES.map(b=>({id:b.id,title:b.title,level:b.level,pages:b.pages.length,words:b.pages.map(p=>p.t.join(" ")).join(" ").split(/\\s+/).length,qs:b.qs.map(q=>q.q+" → "+q.a).join(" | ")}))');
fs.writeFileSync(path.join(out,'stories.csv'),csv([['id','title','level','pages','words','questions']].concat(st.map(b=>[b.id,b.title,b.level,b.pages,b.words,b.qs]))));
console.log(`exported ${skills.length} skills, ${rows.length-1} question templates, ${st.length} stories → dist/content/`);
process.exit(0);
