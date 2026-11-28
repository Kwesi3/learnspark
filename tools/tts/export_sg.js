// Export the words each study-guide page reads aloud, grouped by narration sprite.
// Usage: node tools/tts/export_sg.js > sg.json   (then SGJSON=sg.json V=heart python3 gen2.py)
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const w=new JSDOM(fs.readFileSync(path.join(__dirname,'../../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){
  w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.matchMedia=()=>({matches:false,addEventListener(){}});}}).window;
const out={};
for(const g of [4,6]){w.eval(`(()=>{const p=blankLearner('Narration',${g},'🦊');PROFILES.list[p.id]=p;activateProfile(p.id);})()`);
  for(const subj of ['math','read','write','sci','hist']){const codes=w.eval(`skillsFor('${subj}').map(s=>s.code)`);
    for(const c of codes){const gen=w.eval(`(findSkill('${subj}','${c}')||{}).gen`);const sp=w.eval(`sgSprite('${gen}')`);if(!sp||!w.eval(`!!STUDY['${gen}']`))continue;
      const n=w.eval(`sgPages(STUDY['${gen}'])`);for(let i=0;i<n;i++){w.eval(`SGS.gen='${gen}';SGS.subj='${subj}';SGS.code='${c}';SGS.i=${i};SGS.tried={};sgRender()`);
        (out[sp]=out[sp]||{})[`S:${gen}:${i}`]=w.eval('SGS.say').replace(/\s+/g,' ').trim();}}}}
process.stdout.write(JSON.stringify(out,null,1));
