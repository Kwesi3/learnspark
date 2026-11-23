// Standards alignment: current codes per grade, new skills produce questions with the right SOL code,
// and saved progress under the old codes moves to the new ones.
const {JSDOM}=require('jsdom');const fs=require('fs');const path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../dist/app.html'),'utf8');
const mk=(store)=>new JSDOM(html,{runScripts:'dangerously',url:'https://example.github.io/',beforeParse(w){
  w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};
  w.matchMedia=()=>({matches:false,addEventListener(){}});if(store)for(const [k,v] of Object.entries(store))w.localStorage.setItem(k,v);}}).window;
let fail=0;const ok=m=>console.log('  ✓',m),bad=m=>{fail++;console.log('  ✗',m);};
const w=mk();
const codes=(g,s)=>w.eval(`(STRANDS[${g}].${s}||[]).map(x=>x.code).join(' ')`);
const expect={'4 math':'4.NS.1 4.NS.2 4.NS.3 4.NS.4 4.NS.5 4.CE.1 4.CE.2 4.CE.3 4.CE.4 4.MG.1 4.MG.2 4.MG.3 4.MG.4 4.MG.5 4.MG.6 4.PS.1 4.PS.2 4.PFA.1',
  '4 sci':'4.2 4.3 4.4 4.5 4.6 4.7 4.8','6 sci':'6.2 6.3 6.4 6.5 6.6 6.7 6.8 6.9','4 read':'4.RV 4.RL 4.RI','4 write':'4.W 4.LU',
  '6 read':'6.RV 6.RL 6.RI','6 write':'6.W 6.LU','7 read':'7.RV 7.RL 7.RI','8 write':'8.W 8.LU'};
for(const [k,v] of Object.entries(expect)){const [g,s]=k.split(' ');const got=codes(g,s);got===v?ok(`grade ${g} ${s}: ${v}`):bad(`grade ${g} ${s}: got ${got}`);}
for(const gen of ['g4_cmp','g4_fdrel','g4_addsub','g4_decops','g4_solid','g4_esm','g4_ocean','g4_vares','g6_esm','g6_atoms','g6_water','g6_bay']){
  let n=0,codeOK=true;const seen=new Set();
  for(let i=0;i<80;i++){w.__g=gen;const q=w.eval('makeQ(__g)');if(!q||!q.question){n=-1;break;}seen.add(q.question);if(!q.sol||/^\d\.\d+$/.test(q.sol)&&gen.startsWith('g4_')&&!gen.match(/esm|ocean|vares/))codeOK=false;n++;}
  n===80&&codeOK?ok(`${gen}: questions OK (${seen.size} different), SOL ${w.eval(`strandCode('${gen}')`)}`):bad(`${gen}: n=${n} codeOK=${codeOK}`);}
for(let i=0;i<60;i++){const q=w.eval("makeQ('g4_fracops')");if(/\d\.\d/.test(q.question)){bad('4.CE.3 still shows a decimal question: '+q.question);break;}if(i===59)ok('4.CE.3 is fractions only');}
// progress migration
const old={list:{p1:{id:'p1',name:'Test Kid',grade:4,avatar:'🦊',skills:{'4:math:4.1':{score:80,n:30,c:25},'4:math:4.16':{score:50,n:10,c:6},'4:sci:4.4':{score:70,n:20,c:15},'4:sci:4.2':{score:40,n:5,c:2},'4:read:4.5':{score:60,n:12,c:9}},
  missed:[{id:'m1',subj:'math',code:'4.2',q:{type:'mc',question:'x',opts:['a','b'],answer:'a'}}],extras:{}}},active:'p1'};
const w2=mk({lsva_profiles:JSON.stringify(old)});
const sk=w2.eval('JSON.stringify(PROFILES.list.p1.skills)');const S=JSON.parse(sk);
S['4:math:4.NS.1']&&S['4:math:4.NS.1'].n===30?ok('4.1 progress moved to 4.NS.1'):bad('math move '+sk);
S['4:sci:4.2']&&S['4:sci:4.2'].n===20?ok('old science 4.4 (plants) moved to 4.2, old 4.2 (force) retired'):bad('sci move '+sk);
S['4:read:4.RL']?ok('reading 4.5 moved to 4.RL'):bad('read move');
w2.eval('PROFILES.list.p1.missed[0].code')==='4.NS.3'?ok('missed question moved to 4.NS.3'):bad('missed move');
w2.eval('PROFILES.list.p1.extras.retiredSkills["4:sci:4.2"].n')===5?ok('retired skill kept in extras (nothing deleted)'):bad('retired');
console.log(fail?`FAILED ${fail}`:'ALL PASSED');process.exit(0);
