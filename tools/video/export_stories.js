const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(require('path').join(__dirname,'../../dist/app.html'),'utf8').replace(/<\/script>\s*<\/body>/,'\nwindow.__X={STORIES,BOOK_LEVELS};\n</script></body>');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.github.io/',beforeParse(w){w.AudioContext=function(){return{}};w.scrollTo=()=>{};w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};w.SpeechSynthesisUtterance=function(){};}});
const X=dom.window.__X;
const out=X.STORIES.filter(b=>typeof b.cover==='string').map(b=>({id:b.id,title:b.title,level:b.level,cover:b.cover,color:X.BOOK_LEVELS[b.level].color,pages:b.pages.map(p=>({t:p.t,art:p.art}))}));
fs.writeFileSync('stories.json',JSON.stringify(out,null,1));console.log(out.length,out.map(b=>b.id+':'+b.cover).join(' '));
