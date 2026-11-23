// ═══════════════════════════════════════════════════════════════
// FX ENGINE — Web Audio sounds + visual juice
// ═══════════════════════════════════════════════════════════════
const FX=(function(){
  let ctx=null, enabled=true;
  function ac(){ if(!ctx){ try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){enabled=false;} }
    if(ctx&&ctx.state!=='running'){try{ctx.resume();}catch(e){}} return ctx; }
  // Phones start Web Audio paused: wake it inside the first taps (and after calls or app switches).
  ['touchend','pointerup','click','keydown'].forEach(ev=>document.addEventListener(ev,()=>{if(enabled&&(!ctx||ctx.state!=='running'))ac();},{capture:true,passive:true}));
  function tone(freq,dur,type,vol,slideTo){
    if(!enabled)return; const c=ac(); if(!c)return;
    const o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine'; o.frequency.value=freq;
    if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,c.currentTime+dur);
    g.gain.setValueAtTime((vol||0.2),c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+dur);
    o.connect(g);g.connect(c.destination);
    o.start();o.stop(c.currentTime+dur);
  }
  function noise(dur,vol){
    if(!enabled)return; const c=ac(); if(!c)return;
    const sr=c.sampleRate, buf=c.createBuffer(1,sr*dur,sr), d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
    const src=c.createBufferSource(), g=c.createGain();
    src.buffer=buf; g.gain.value=vol||0.15;
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+dur);
    src.connect(g);g.connect(c.destination);src.start();
  }
  return {
    toggle(){enabled=!enabled;return enabled;},
    isOn(){return enabled;},
    click(){tone(600,0.06,'square',0.12);},
    move(){tone(420,0.09,'sine',0.13);},
    correct(){tone(660,0.09,'sine',0.18);setTimeout(()=>tone(880,0.12,'sine',0.18),90);},
    wrong(){tone(200,0.22,'sawtooth',0.16,120);},
    coin(){tone(988,0.07,'square',0.15);setTimeout(()=>tone(1319,0.14,'square',0.15),70);},
    win(){[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,0.16,'sine',0.2),i*110));},
    lose(){[392,330,262].forEach((f,i)=>setTimeout(()=>tone(f,0.2,'sawtooth',0.16),i*130));},
    laser(){tone(880,0.14,'square',0.14,180);},
    explosion(){noise(0.32,0.2);tone(120,0.3,'sawtooth',0.14,50);},
    slice(){tone(1200,0.05,'sine',0.13,400);},
    powerup(){[440,554,659,880].forEach((f,i)=>setTimeout(()=>tone(f,0.1,'triangle',0.16),i*55));},
    combo(n){tone(600+n*80,0.1,'square',0.15);},
    tick(){tone(800,0.03,'square',0.06);},
  };
})();

// ── Confetti ──
function confetti(x,y,count){
  const colors=['#F59E0B','#10B981','#3B82F6','#EC4899','#8B5CF6','#EF4444','#14B8A6'];
  const cont=document.createElement('div');
  cont.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:9998;overflow:hidden';
  document.body.appendChild(cont);
  for(let i=0;i<(count||40);i++){
    const p=document.createElement('div');
    const size=rng(6,12), color=pick(colors), ang=Math.random()*Math.PI*2, vel=rng(4,13);
    const vx=Math.cos(ang)*vel, vy=Math.sin(ang)*vel-rng(3,9);
    p.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>.5?'50%':'2px'};opacity:1`;
    cont.appendChild(p);
    let px=x,py=y,dvx=vx,dvy=vy,life=0;
    const anim=()=>{
      life++;dvy+=0.5;px+=dvx;py+=dvy;dvx*=0.98;
      p.style.transform=`translate(${px-x}px,${py-y}px) rotate(${life*18}deg)`;
      p.style.opacity=Math.max(0,1-life/55);
      if(life<55)requestAnimationFrame(anim); 
    };
    requestAnimationFrame(anim);
  }
  setTimeout(()=>cont.remove(),1100);
}
// ── Particle burst (small) ──
function burst(x,y,color,count){
  const cont=document.createElement('div');
  cont.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:9998';
  document.body.appendChild(cont);
  for(let i=0;i<(count||14);i++){
    const p=document.createElement('div');const size=rng(4,9);
    const ang=(Math.PI*2/count)*i+Math.random()*0.5, vel=rng(3,8);
    const vx=Math.cos(ang)*vel, vy=Math.sin(ang)*vel;
    p.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color||'#F59E0B'};border-radius:50%`;
    cont.appendChild(p);
    let px=x,py=y,life=0;
    const anim=()=>{life++;px+=vx;py+=vy;p.style.transform=`translate(${px-x}px,${py-y}px)`;p.style.opacity=Math.max(0,1-life/28);if(life<28)requestAnimationFrame(anim);};
    requestAnimationFrame(anim);
  }
  setTimeout(()=>cont.remove(),700);
}
// ── Floating score text ──
function floatText(x,y,text,color){
  const el=document.createElement('div');
  el.textContent=text;
  el.style.cssText=`position:fixed;left:${x}px;top:${y}px;transform:translate(-50%,-50%);font-family:'Fredoka',cursive;font-size:1.6rem;color:${color||'#F59E0B'};text-shadow:0 2px 8px rgba(0,0,0,.3);pointer-events:none;z-index:9999;transition:all .9s cubic-bezier(.2,.8,.3,1);opacity:1`;
  document.body.appendChild(el);
  requestAnimationFrame(()=>{el.style.top=(y-70)+'px';el.style.opacity='0';el.style.fontSize='2.2rem';});
  setTimeout(()=>el.remove(),950);
}
// ── Screen shake ──
function shake(intensity){
  const el=document.getElementById('app');if(!el)return;
  const i=intensity||6;let n=0;
  const iv=setInterval(()=>{n++;el.style.transform=`translate(${rng(-i,i)}px,${rng(-i,i)}px)`;if(n>6){clearInterval(iv);el.style.transform='';}},28);
}
// ── Flash overlay ──
function flash(color){
  const el=document.createElement('div');
  el.style.cssText=`position:fixed;inset:0;background:${color||'#10B981'};opacity:.35;pointer-events:none;z-index:9997;transition:opacity .4s`;
  document.body.appendChild(el);
  requestAnimationFrame(()=>el.style.opacity='0');
  setTimeout(()=>el.remove(),420);
}



