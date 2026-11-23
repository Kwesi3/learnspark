// ── Problem log (part 1): catch errors from the very start. Stored only on this device. ──
// Entries hold what broke and where, never names, answers or progress.
window.APP_VERSION=/*@version*/;
window.ERRLOG=(function(){
  const KEY='ls_errlog',MAX=30;
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]');}catch(e){return [];}};
  const write=a=>{try{localStorage.setItem(KEY,JSON.stringify(a.slice(-MAX)));}catch(e){}};
  const clean=s=>String(s||'').replace(/https?:\/\/[^\s)]*\/([^\/\s)]*)/g,'$1').replace(/data:[^\s)]{20,}/g,'data:…').slice(0,300);
  function add(kind,msg,stack){
    const list=read(),last=list[list.length-1],m=clean(msg);
    const where=(()=>{try{return (window.ST&&ST.tab)||(document.querySelector('.screen.active')||{}).className||'';}catch(e){return '';}})();
    if(last&&last.m===m&&Date.now()-last.t<60000){last.n=(last.n||1)+1;last.t=Date.now();write(list);return;}
    list.push({t:Date.now(),k:kind,m,s:clean((stack||'').split('\n').slice(0,5).join('\n')),v:window.APP_VERSION,w:String(where).slice(0,40)});write(list);
  }
  window.addEventListener('error',e=>{if(e&&e.message)add('error',e.message+(e.lineno?` (line ${e.lineno}:${e.colno})`:''),e.error&&e.error.stack);});
  window.addEventListener('unhandledrejection',e=>{const r=e&&e.reason;add('promise',r&&r.message||String(r),r&&r.stack);});
  return {add,read,clear:()=>write([])};
})();
