const {JSDOM}=require('jsdom');const fs=require('fs');
const f=process.argv[2]||require('path').join(__dirname,'../dist/app.html');
const dom=new JSDOM(fs.readFileSync(f,'utf8'),{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{createGain:()=>({connect(){},gain:{}}),createOscillator:()=>({connect(){},frequency:{}})}};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};w.scrollTo=()=>{};w.requestAnimationFrame=()=>0;w.addEventListener('error',e=>console.log('ERR',e.message));}});
console.log('loaded');process.exit(0);
