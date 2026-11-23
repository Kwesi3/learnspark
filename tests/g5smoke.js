const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(require('path').join(__dirname,'../dist/app.html'),'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{createGain:()=>({connect(){},gain:{}}),createOscillator:()=>({connect(){},frequency:{}})}};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.scrollTo=()=>{};w.requestAnimationFrame=()=>0;}});
const XG=dom.window.eval('XG');
for(const g of Object.keys(XG).filter(k=>k.startsWith('g5_')))XG[g].forEach((t,i)=>{fs.writeSync(1,g+'#'+i+'\n');for(let k=0;k<300;k++)t.fn();});
console.log('done');process.exit(0);
