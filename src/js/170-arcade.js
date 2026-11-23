// ═══════════════════════════════════════════════════════════════
// ARCADE GAMES v2 — polished, with sound + effects + new games
// ═══════════════════════════════════════════════════════════════
let _g={};
const GAMES={
  speedmath:{icon:'⚡',title:'Speed Math',desc:'Beat the clock',grad:'linear-gradient(135deg,#F59E0B,#EA580C)'},
  asteroids:{icon:'☄️',title:'Math Asteroids',desc:'Blast the answer',grad:'linear-gradient(135deg,#6366F1,#4338CA)'},
  ninja:{icon:'🥷',title:'Number Ninja',desc:'Slice, don\'t get bombed',grad:'linear-gradient(135deg,#EF4444,#B91C1C)'},
  codebot:{icon:'🤖',title:'CodeBot Quest',desc:'Program the robot',grad:'linear-gradient(135deg,#8B5CF6,#6D28D9)'},
  fracmatch:{icon:'🍕',title:'Fraction Match',desc:'Find the pairs',grad:'linear-gradient(135deg,#EC4899,#DB2777)'},
  wordwiz:{icon:'🔤',title:'Word Wizard',desc:'Vocab challenge',grad:'linear-gradient(135deg,#10B981,#059669)'},
  solquiz:{icon:'⚔️',title:'SOL Quiz Battle',desc:'Boss battle',grad:'linear-gradient(135deg,#3B82F6,#1D4ED8)'},
};

function launchGame(key){
  ST.currentGame=key;FX.click();
  ({speedmath:startSpeedMathIntro,asteroids:startAsteroidsIntro,ninja:startNinjaIntro,
    codebot:startCodeBotIntro,fracmatch:startFracMatchIntro,wordwiz:startWordWizIntro,
    solquiz:startSolQuizIntro}[key])();
}
function gameShell(inner,titleIcon,title){
  app.innerHTML=`<div id="game" class="screen active">
    <div class="game-top">
      <button class="tb-back" style="background:rgba(255,255,255,.15);color:#fff" onclick="FX.click();renderDash()">←</button>
      <div class="game-t">${titleIcon} ${title}</div>
      <button class="snd-btn" onclick="toggleSound(this)">${FX.isOn()?'🔊':'🔇'}</button>
      <div class="tb-chip tb-star">${ic('trophy')} ${ST.gameHi[ST.currentGame]||0}</div>
    </div>
    <div class="game-body" id="gameBody">${inner}</div>
  </div>`;
}
function toggleSound(btn){const on=FX.toggle();btn.textContent=on?'🔊':'🔇';if(on)FX.click();}
function intro(icon,title,desc,onPlay){
  gameShell(`<div class="game-start">
    <div class="game-start-ic">${icon}</div>
    <div class="game-start-t">${title}</div>
    <div class="game-start-d">${desc}</div>
    <button class="game-play-btn" id="playBtn">▶ Play</button>
  </div>`,icon,title);
  document.getElementById('playBtn').onclick=()=>{FX.powerup();onPlay();};
}
function saveHi(key,score){if(score>(ST.gameHi[key]||0))ST.gameHi[key]=score;checkAch();save();}
function gcNum(){return ST.grade<=4?4:6;}
function gameOverCard(icon,title,score,sub,onReplay,replayLabel){
  const hi=ST.gameHi[ST.currentGame]||0;const isNew=score>=hi&&score>0;
  gameShell(`<div class="game-over">
    <div class="go-emoji">${isNew?'🏆':icon}</div>
    <div class="go-t">${isNew?'New High Score!':title}</div>
    <div class="go-score">${score}</div>
    <div class="go-hi">${sub}</div>
    <button class="game-play-btn" id="replayBtn">${replayLabel||'🔄 Play Again'}</button>
    <div style="margin-top:14px"><button class="btn btn-sec" style="max-width:200px;margin:0 auto" onclick="FX.click();renderDash()">🏠 Home</button></div>
  </div>`,GAMES[ST.currentGame].icon,GAMES[ST.currentGame].title);
  document.getElementById('replayBtn').onclick=()=>{FX.powerup();onReplay();};
  if(isNew){FX.win();const r=app.getBoundingClientRect();confetti(window.innerWidth/2,window.innerHeight/2.5,60);}
  else FX.lose();
}

// ═══════════════════════════════════════════════════════════════
// 1. SPEED MATH (polished)
// ═══════════════════════════════════════════════════════════════
function startSpeedMathIntro(){intro('⚡','Speed Math','Solve as fast as you can! 3 lives, combo bonuses for streaks. One wrong answer or running out of time costs a life. How high can you score?',speedMathBegin);}
function speedMathBegin(){_g={score:0,lives:3,combo:0,timeLeft:6};renderSpeedMath();}
function makeSpeedQ(){
  const gc=gcNum();const t=rng(0,gc>=6?4:2);let a,b,ans,op;
  if(gc>=6){
    if(t===0){a=rng(2,12);b=rng(2,12);ans=a*b;op='×';}
    else if(t===1){a=rng(20,99);b=rng(10,50);ans=a+b;op='+';}
    else if(t===2){b=rng(2,12);ans=rng(2,12);a=b*ans;return{text:`${a} ÷ ${b}`,ans};}
    else if(t===3){a=rng(-9,9);b=rng(-9,9);ans=a+b;return{text:`(${a}) + (${b})`,ans};}
    else{a=rng(30,120);b=rng(10,a);ans=a-b;op='−';}
  }else{
    if(t===0){a=rng(2,25);b=rng(2,25);ans=a+b;op='+';}
    else if(t===1){a=rng(10,40);b=rng(1,a);ans=a-b;op='−';}
    else{a=rng(2,9);b=rng(2,9);ans=a*b;op='×';}
  }
  return{text:`${a} ${op} ${b}`,ans};
}
function renderSpeedMath(){
  _g.q=makeSpeedQ();_g.timeLeft=Math.max(3,6-Math.floor(_g.score/60));
  let opts=[...new Set([_g.q.ans,_g.q.ans+rng(1,5),_g.q.ans-rng(1,4),_g.q.ans+rng(6,12)])].slice(0,4);
  while(opts.length<4)opts.push(_g.q.ans+rng(13,25));
  opts=shuf(opts);
  gameShell(`
    <div class="game-stat-row">
      <div class="gstat"><div class="gstat-n" id="smScore">${_g.score}</div><div class="gstat-l">Score</div></div>
      <div class="gstat"><div class="gstat-n">${_g.combo}x</div><div class="gstat-l">Combo</div></div>
    </div>
    <div class="lives">${'❤️'.repeat(_g.lives)}${'🖤'.repeat(3-_g.lives)}</div>
    <div class="timer-bar"><div class="timer-fill" id="smTimer" style="width:100%"></div></div>
    <div class="game-card">
      ${_g.combo>=3?`<div class="combo">🔥 ${_g.combo} COMBO!</div>`:'<div class="combo"></div>'}
      <div class="gq">${_g.q.text}</div>
      <div class="g-opts">${opts.map(o=>`<button class="g-opt" onclick="smAnswer(${o},event)">${o}</button>`).join('')}</div>
    </div>`,'⚡','Speed Math');
  startSmTimer();
}
function startSmTimer(){
  clearInterval(_g.timer);const total=_g.timeLeft;let el=0;
  _g.timer=setInterval(()=>{el+=0.1;const pct=Math.max(0,100-el/total*100);
    const tf=document.getElementById('smTimer');if(tf)tf.style.width=pct+'%';
    if(el>=total){clearInterval(_g.timer);smLoseLife();}},100);
}
function smAnswer(v,e){
  clearInterval(_g.timer);const correct=v===_g.q.ans;
  document.querySelectorAll('.g-opt').forEach(b=>{b.disabled=true;
    if(+b.textContent===_g.q.ans)b.classList.add('correct');
    else if(+b.textContent===v&&!correct)b.classList.add('wrong');});
  if(correct){
    FX.correct();_g.combo++;const pts=10+(_g.combo>=3?_g.combo*2:0);_g.score+=pts;
    if(e){const r=e.target.getBoundingClientRect();floatText(r.left+r.width/2,r.top,`+${pts}`,'#10B981');if(_g.combo>=3)FX.combo(_g.combo);}
    setTimeout(renderSpeedMath,420);
  }else{FX.wrong();shake();_g.combo=0;setTimeout(smLoseLife,650);}
}
function smLoseLife(){_g.lives--;_g.combo=0;if(_g.lives<=0)return smGameOver();renderSpeedMath();}
function smGameOver(){
  clearInterval(_g.timer);const prevHi=ST.gameHi.speedmath||0;
  saveHi('speedmath',_g.score);addXP(Math.floor(_g.score/10),Math.floor(_g.score/50));
  gameOverCard('⚡','Game Over',_g.score,_g.score>prevHi?'A brand new record!':'Best: '+Math.max(prevHi,_g.score),speedMathBegin);
}

// ═══════════════════════════════════════════════════════════════
// 2. MATH ASTEROIDS (canvas space shooter) — NEW
// ═══════════════════════════════════════════════════════════════
function startAsteroidsIntro(){intro('☄️','Math Asteroids','Solve the problem, then tap the asteroid with the correct answer to blast it! Wrong asteroids cost a life. Speed increases as you score. Defend your ship! 🚀',asteroidsBegin);}
function asteroidsBegin(){
  _g={score:0,lives:3,level:1,asteroids:[],q:null,raf:null,spawnT:0,running:true,particles:[]};
  gameShell(`
    <div class="game-stat-row">
      <div class="gstat"><div class="gstat-n" id="asScore">0</div><div class="gstat-l">Score</div></div>
      <div class="gstat"><div class="gstat-n" id="asLives">❤️❤️❤️</div><div class="gstat-l">Lives</div></div>
    </div>
    <div class="ast-prompt" id="asPrompt">Solve: —</div>
    <canvas id="asCanvas" class="ast-canvas"></canvas>
    <div class="ast-hint">Tap the asteroid with the correct answer!</div>
  `,'☄️','Math Asteroids');
  const cv=document.getElementById('asCanvas');
  const wrap=cv.parentElement;
  cv.width=Math.min(wrap.clientWidth,560); cv.height=380;
  _g.cv=cv; _g.cx=cv.getContext('2d');
  cv.addEventListener('click',asClick);
  cv.addEventListener('touchstart',e=>{e.preventDefault();const r=cv.getBoundingClientRect();const t=e.touches[0];asHit(t.clientX-r.left,t.clientY-r.top);},{passive:false});
  asNewProblem();
  _g.last=performance.now();
  asLoop();
}
function asNewProblem(){
  const gc=gcNum();let a,b,ans,op;const t=rng(0,gc>=6?3:2);
  if(gc>=6){if(t===0){a=rng(3,12);b=rng(3,12);ans=a*b;op='×';}
    else if(t===1){b=rng(2,9);ans=rng(3,12);a=b*ans;op='÷';}
    else if(t===2){a=rng(-9,9);b=rng(-9,9);ans=a+b;op='+';a=`(${a})`;b=`(${b})`;}
    else{a=rng(40,99);b=rng(10,39);ans=a-b;op='−';}}
  else{if(t===0){a=rng(5,30);b=rng(5,30);ans=a+b;op='+';}
    else if(t===1){a=rng(10,40);b=rng(1,a);ans=a-b;op='−';}
    else{a=rng(2,9);b=rng(2,9);ans=a*b;op='×';}}
  _g.q={text:`${a} ${op} ${b}`,ans};
  document.getElementById('asPrompt').textContent=`Solve:  ${_g.q.text}`;
  // spawn 4 asteroids, one correct
  _g.asteroids=[];
  const vals=[...new Set([ans,ans+rng(1,6),ans-rng(1,5),ans+rng(7,14)])].slice(0,4);
  while(vals.length<4)vals.push(ans+rng(15,25));
  const cvw=_g.cv.width, slots=shuf([0,1,2,3]);
  shuf(vals).forEach((v,i)=>{
    _g.asteroids.push({val:v,correct:v===ans,x:60+slots[i]*(cvw-120)/3,y:-rng(10,120)-i*60,
      r:rng(26,32),vy:0.35+_g.level*0.12,rot:Math.random()*6,vr:(Math.random()-0.5)*0.05});
  });
}
function asLoop(){
  if(!_g.running)return;
  const now=performance.now(),dt=Math.min(2,(now-_g.last)/16.67);_g.last=now;
  const cx=_g.cx,cv=_g.cv;
  cx.fillStyle='#0B1120';cx.fillRect(0,0,cv.width,cv.height);
  // stars
  cx.fillStyle='rgba(255,255,255,.4)';
  for(let i=0;i<30;i++){const sx=(i*97+ (now/50))%cv.width, sy=(i*53)%cv.height;cx.fillRect(sx,sy,1.5,1.5);}
  // ship
  cx.save();cx.translate(cv.width/2,cv.height-24);
  cx.fillStyle='#3B82F6';cx.beginPath();cx.moveTo(0,-16);cx.lineTo(13,14);cx.lineTo(0,7);cx.lineTo(-13,14);cx.closePath();cx.fill();
  cx.fillStyle='#93C5FD';cx.beginPath();cx.arc(0,-2,4,0,7);cx.fill();cx.restore();
  // asteroids
  let allGone=true;
  _g.asteroids.forEach(a=>{
    if(a.dead)return; allGone=false;
    a.y+=a.vy*dt;a.rot+=a.vr*dt;
    cx.save();cx.translate(a.x,a.y);cx.rotate(a.rot);
    cx.fillStyle=a.correct?'#7C3AED':'#64748B';
    cx.strokeStyle=a.correct?'#A78BFA':'#94A3B8';cx.lineWidth=2;
    cx.beginPath();
    for(let i=0;i<8;i++){const ang=i/8*Math.PI*2,rr=a.r*(0.82+((i*37)%10)/28);cx.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}
    cx.closePath();cx.fill();cx.stroke();cx.restore();
    // value
    cx.fillStyle='#fff';cx.font='bold 17px Nunito, sans-serif';cx.textAlign='center';cx.textBaseline='middle';
    cx.fillText(a.val,a.x,a.y);
    // reached bottom
    if(a.y>cv.height-30){a.dead=true;if(a.correct){asMiss();}}
  });
  // particles
  _g.particles=_g.particles.filter(p=>{p.life--;p.x+=p.vx;p.y+=p.vy;p.vy+=0.15;
    cx.globalAlpha=Math.max(0,p.life/24);cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.s,0,7);cx.fill();cx.globalAlpha=1;
    return p.life>0;});
  if(allGone && _g.running){asNewProblem();}
  _g.raf=requestAnimationFrame(asLoop);
}
function asClick(e){const r=_g.cv.getBoundingClientRect();asHit(e.clientX-r.left,e.clientY-r.top);}
function asHit(mx,my){
  if(!_g.running)return;
  for(const a of _g.asteroids){
    if(a.dead)continue;
    if(Math.hypot(mx-a.x,my-a.y)<a.r+6){
      if(a.correct){
        FX.laser();setTimeout(()=>FX.explosion(),80);
        a.dead=true;_g.score+=10+_g.level;_g.level=1+Math.floor(_g.score/50);
        document.getElementById('asScore').textContent=_g.score;
        for(let i=0;i<16;i++)_g.particles.push({x:a.x,y:a.y,vx:(Math.random()-0.5)*7,vy:(Math.random()-0.5)*7,life:24,s:rng(2,5),c:pick(['#A78BFA','#F59E0B','#fff','#EC4899'])});
        // kill others
        _g.asteroids.forEach(o=>{if(!o.correct)o.dead=true;});
      }else{
        FX.wrong();shake(8);a.dead=true;asMiss();
        for(let i=0;i<10;i++)_g.particles.push({x:a.x,y:a.y,vx:(Math.random()-0.5)*5,vy:(Math.random()-0.5)*5,life:20,s:rng(2,4),c:'#EF4444'});
      }
      return;
    }
  }
}
function asMiss(){
  _g.lives--;const le=document.getElementById('asLives');
  if(le)le.textContent='❤️'.repeat(Math.max(0,_g.lives))+'🖤'.repeat(3-_g.lives);
  flash('#EF4444');
  if(_g.lives<=0){asGameOver();return;}
  // reset problem after brief pause
  _g.asteroids.forEach(a=>a.dead=true);
  setTimeout(()=>{if(_g.running)asNewProblem();},400);
}
function asGameOver(){
  _g.running=false;cancelAnimationFrame(_g.raf);
  const prevHi=ST.gameHi.asteroids||0;saveHi('asteroids',_g.score);
  addXP(Math.floor(_g.score/8),Math.floor(_g.score/40));
  gameOverCard('☄️','Ship Destroyed',_g.score,_g.score>prevHi?'New record, Commander!':'Best: '+Math.max(prevHi,_g.score),asteroidsBegin);
}

// ═══════════════════════════════════════════════════════════════
// 3. NUMBER NINJA (slice correct answers) — NEW
// ═══════════════════════════════════════════════════════════════
function startNinjaIntro(){intro('🥷','Number Ninja','A problem appears — slice the flying answers that are CORRECT, and DODGE the bombs 💣! Correct slices build combos. Slicing a bomb or missing too many correct answers ends the run. Ready, ninja?',ninjaBegin);}
function ninjaBegin(){
  _g={score:0,lives:3,combo:0,objects:[],q:null,raf:null,spawnT:0,running:true,slices:[],misses:0};
  gameShell(`
    <div class="game-stat-row">
      <div class="gstat"><div class="gstat-n" id="njScore">0</div><div class="gstat-l">Score</div></div>
      <div class="gstat"><div class="gstat-n" id="njLives">❤️❤️❤️</div><div class="gstat-l">Lives</div></div>
    </div>
    <div class="ast-prompt" id="njPrompt">—</div>
    <canvas id="njCanvas" class="ast-canvas" style="background:linear-gradient(180deg,#1E1B4B,#0B1120)"></canvas>
    <div class="ast-hint">Swipe/tap the CORRECT answers · avoid 💣</div>
  `,'🥷','Number Ninja');
  const cv=document.getElementById('njCanvas');const wrap=cv.parentElement;
  cv.width=Math.min(wrap.clientWidth,560);cv.height=380;
  _g.cv=cv;_g.cx=cv.getContext('2d');
  const hit=(x,y)=>njHit(x,y);
  cv.addEventListener('click',e=>{const r=cv.getBoundingClientRect();hit(e.clientX-r.left,e.clientY-r.top);});
  cv.addEventListener('touchmove',e=>{e.preventDefault();const r=cv.getBoundingClientRect();for(const t of e.touches)hit(t.clientX-r.left,t.clientY-r.top);},{passive:false});
  njNewProblem();_g.last=performance.now();njLoop();
}
function njNewProblem(){
  const gc=gcNum();let a,b,ans,op;const t=rng(0,2);
  if(gc>=6){if(t===0){a=rng(3,12);b=rng(3,12);ans=a*b;op='×';}
    else if(t===1){b=rng(2,9);ans=rng(3,12);a=b*ans;op='÷';}
    else{a=rng(40,99);b=rng(10,39);ans=a-b;op='−';}}
  else{if(t===0){a=rng(5,30);b=rng(5,30);ans=a+b;op='+';}
    else if(t===1){a=rng(10,40);b=rng(1,a);ans=a-b;op='−';}
    else{a=rng(2,9);b=rng(2,9);ans=a*b;op='×';}}
  _g.q={text:`${a} ${op} ${b}`,ans};
  const pr=document.getElementById('njPrompt');if(pr)pr.textContent=`${_g.q.text} = ?`;
}
function njSpawn(){
  const cv=_g.cv;const isBomb=Math.random()<0.28;
  const correct=!isBomb && Math.random()<0.55;
  let val;
  if(isBomb)val='💣';
  else if(correct)val=_g.q.ans;
  else{do{val=_g.q.ans+rng(-8,8);}while(val===_g.q.ans);}
  const x=rng(50,cv.width-50);
  _g.objects.push({val,bomb:isBomb,correct,x,y:cv.height+30,
    vx:(cv.width/2-x)/90+(Math.random()-0.5)*1.5,vy:-(rng(80,105)/10),r:26,sliced:false,rot:0,vr:(Math.random()-0.5)*0.1});
}
function njLoop(){
  if(!_g.running)return;
  const now=performance.now(),dt=Math.min(2,(now-_g.last)/16.67);_g.last=now;
  const cx=_g.cx,cv=_g.cv;
  cx.clearRect(0,0,cv.width,cv.height);
  cx.fillStyle='rgba(255,255,255,.25)';
  for(let i=0;i<24;i++){const sx=(i*83)%cv.width,sy=(i*61+now/60)%cv.height;cx.fillRect(sx,sy,1.5,1.5);}
  _g.spawnT-=dt;
  if(_g.spawnT<=0){njSpawn();_g.spawnT=rng(38,66);}
  _g.objects=_g.objects.filter(o=>{
    if(o.sliced){o.sliceLife--;return o.sliceLife>0;}
    o.x+=o.vx*dt;o.y+=o.vy*dt;o.vy+=0.14*dt;o.rot+=o.vr*dt;
    cx.save();cx.translate(o.x,o.y);cx.rotate(o.rot);
    if(o.bomb){cx.font='34px serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('💣',0,0);}
    else{cx.beginPath();cx.arc(0,0,o.r,0,7);
      cx.fillStyle=o.correct?'#10B981':'#F59E0B';cx.fill();
      cx.strokeStyle=o.correct?'#6EE7B7':'#FCD34D';cx.lineWidth=3;cx.stroke();
      cx.fillStyle='#fff';cx.font='bold 18px Nunito, sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(o.val,0,0);}
    cx.restore();
    // fell off bottom
    if(o.y>cv.height+40){if(o.correct&&!o.sliced){njMissCorrect();}return false;}
    return true;
  });
  // slice trails
  _g.slices=_g.slices.filter(s=>{s.life--;cx.globalAlpha=s.life/10;cx.fillStyle='#fff';cx.beginPath();cx.arc(s.x,s.y,4,0,7);cx.fill();cx.globalAlpha=1;return s.life>0;});
  _g.raf=requestAnimationFrame(njLoop);
}
function njHit(mx,my){
  if(!_g.running)return;
  _g.slices.push({x:mx,y:my,life:10});
  for(const o of _g.objects){
    if(o.sliced)continue;
    if(Math.hypot(mx-o.x,my-o.y)<o.r+8){
      if(o.bomb){FX.explosion();shake(9);flash('#EF4444');o.sliced=true;o.sliceLife=1;njLoseLife();return;}
      if(o.correct){FX.slice();o.sliced=true;o.sliceLife=12;_g.combo++;
        const pts=10+(_g.combo>=3?_g.combo*2:0);_g.score+=pts;
        document.getElementById('njScore').textContent=_g.score;
        floatText(_g.cv.getBoundingClientRect().left+o.x,_g.cv.getBoundingClientRect().top+o.y,`+${pts}`,'#10B981');
        if(_g.combo>=3)FX.combo(_g.combo);
      }else{FX.wrong();o.sliced=true;o.sliceLife=1;_g.combo=0;njLoseLife();}
      return;
    }
  }
}
function njMissCorrect(){_g.misses++;if(_g.misses>=3){/* soft penalty */_g.misses=0;njLoseLife();}}
function njLoseLife(){
  _g.lives--;_g.combo=0;const le=document.getElementById('njLives');
  if(le)le.textContent='❤️'.repeat(Math.max(0,_g.lives))+'🖤'.repeat(3-_g.lives);
  if(_g.lives<=0)njGameOver();
}
function njGameOver(){
  _g.running=false;cancelAnimationFrame(_g.raf);
  const prevHi=ST.gameHi.ninja||0;saveHi('ninja',_g.score);
  addXP(Math.floor(_g.score/8),Math.floor(_g.score/40));
  gameOverCard('🥷','Run Over',_g.score,_g.score>prevHi?'A legendary run!':'Best: '+Math.max(prevHi,_g.score),ninjaBegin);
}

// ═══════════════════════════════════════════════════════════════
// 4. CODEBOT QUEST (professional coding) — REBUILT
// ═══════════════════════════════════════════════════════════════
const CB_LEVELS=[
  {grid:6,walls:[],gems:[],start:{x:0,y:0,dir:'right'},goal:{x:5,y:0},par:5,loop:false,
   concept:'SEQUENCE',desc:'Move Forward to reach the goal. Chain commands in order!'},
  {grid:6,walls:[],gems:[{x:3,y:0}],start:{x:0,y:0,dir:'right'},goal:{x:5,y:0},par:5,loop:false,
   concept:'COLLECT',desc:'Grab the gem 💎 on your way to the goal!'},
  {grid:6,walls:[{x:2,y:0},{x:2,y:1}],gems:[{x:3,y:2}],start:{x:0,y:0,dir:'right'},goal:{x:5,y:2},par:8,loop:false,
   concept:'TURNS',desc:'Use Turn Left / Turn Right to go around walls.'},
  {grid:7,walls:[{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:3,y:3}],gems:[{x:6,y:0},{x:0,y:4}],start:{x:0,y:0,dir:'right'},goal:{x:6,y:6},par:16,loop:true,
   concept:'LOOPS',desc:'Use Repeat to run commands multiple times — work smarter!'},
  {grid:7,walls:[{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:5,y:3},{x:5,y:4},{x:5,y:5}],gems:[{x:6,y:1},{x:3,y:5}],start:{x:0,y:0,dir:'right'},goal:{x:0,y:6},par:18,loop:true,
   concept:'LOOPS+',desc:'Collect all gems, then reach the goal. Plan your route!'},
  {grid:8,walls:[{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:5,y:4},{x:5,y:5},{x:5,y:6},{x:5,y:7}],gems:[{x:7,y:0},{x:0,y:7},{x:4,y:4}],start:{x:0,y:0,dir:'right'},goal:{x:7,y:7},par:24,loop:true,
   concept:'MASTERY',desc:'A real challenge. Use loops to keep your program short!'},
  {grid:8,walls:[{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2},{x:5,y:3},{x:5,y:4},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5}],gems:[{x:7,y:2},{x:0,y:5},{x:6,y:6}],start:{x:0,y:0,dir:'right'},goal:{x:3,y:7},par:28,loop:true,
   concept:'EXPERT',desc:'Wind through the maze. Efficiency earns 3 stars!'},
  {grid:8,walls:[{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:5,y:0},{x:5,y:1},{x:5,y:2},{x:5,y:3},{x:2,y:4},{x:2,y:5},{x:2,y:6},{x:2,y:7},{x:5,y:5},{x:6,y:5},{x:7,y:5}],gems:[{x:7,y:0},{x:0,y:4},{x:7,y:7},{x:4,y:6}],start:{x:0,y:0,dir:'right'},goal:{x:6,y:7},par:34,loop:true,
   concept:'LEGEND',desc:'The ultimate quest. Collect 4 gems and conquer the maze!'},
];
function startCodeBotIntro(){
  const done=ST.gameHi.codebot||0;
  gameShell(`<div class="game-start">
    <div class="game-start-ic">🤖</div>
    <div class="game-start-t">CodeBot Quest</div>
    <div class="game-start-d">Write real programs to guide your robot! Chain commands, use <b>Repeat loops</b>, collect gems 💎, and reach the goal. The fewer commands you use, the more stars you earn. ${done>0?`You've mastered ${done} level${done>1?'s':''}!`:'Learn to think like a coder!'}</div>
    <button class="game-play-btn" id="cbPlay">▶ Choose Level</button>
  </div>`,'🤖','CodeBot Quest');
  document.getElementById('cbPlay').onclick=()=>{FX.click();cbPickLevel();};
}
function cbPickLevel(){
  const done=ST.gameHi.codebot||0;
  gameShell(`<div style="padding:4px 0">
    <div style="text-align:center;color:#fff;font-family:'Fredoka',cursive;font-size:1.2rem;margin-bottom:14px">Select a Level</div>
    ${CB_LEVELS.map((l,i)=>{const unlocked=i<=done;const stars=(ST.gameHi['codebot_stars_'+i]||0);
      return `<div class="cb-lvl${unlocked?'':' locked'}" ${unlocked?`onclick="FX.click();cbStart(${i})"`:''}>
        <div class="cb-lvl-num" style="background:${unlocked?'var(--game)':'#475569'}">${unlocked?i+1:'🔒'}</div>
        <div style="flex:1">
          <div class="cb-lvl-name">Level ${i+1} · <span style="color:var(--game);font-size:.8rem">${l.concept}</span></div>
          <div class="cb-lvl-desc">${l.desc}</div>
        </div>
        <div style="text-align:right;font-size:.85rem;white-space:nowrap">${i<=done&&stars?'⭐'.repeat(stars):unlocked?'▶':''}</div>
      </div>`;}).join('')}
  </div>`,'🤖','CodeBot Quest');
}
function cbStart(idx){
  const l=CB_LEVELS[idx];
  _g={level:JSON.parse(JSON.stringify(l)),idx,seq:[],robot:{...l.start},running:false,collected:[]};
  renderCodeBot();
}
function renderCodeBot(){
  const l=_g.level;
  gameShell(`<div class="cb-wrap">
    <div class="cb-head">
      <span class="cb-concept">${l.concept}</span>
      <span class="cb-par">Goal: ≤ ${l.par} commands for ⭐⭐⭐</span>
    </div>
    <div class="cb-desc">${l.desc}</div>
    <div class="grid-wrap"><div class="grid" id="cbGrid" style="grid-template-columns:repeat(${l.grid},${l.grid>7?32:36}px)"></div></div>
    <div class="lc-msg" id="cbMsg"></div>
    <div class="cmd-panel">
      <div class="cmd-title">Blocks — tap to build your program</div>
      <div class="cmd-btns">
        <button class="cmd-b" onclick="cbAdd('forward')">▶ Forward</button>
        <button class="cmd-b" onclick="cbAdd('left')">↰ Left</button>
        <button class="cmd-b" onclick="cbAdd('right')">↱ Right</button>
        ${l.loop?`<button class="cmd-b cmd-loop" onclick="cbAddLoop()">🔁 Repeat…</button>`:''}
      </div>
      <div class="cmd-title">Program <span id="cbCount" style="color:var(--game)">(0)</span> — tap a block to remove:</div>
      <div class="seq-wrap"><div class="seq-list" id="cbSeq"><span class="seq-e">Empty — add blocks above</span></div></div>
      <div class="lc-actions">
        <button class="run-b" id="cbRun" onclick="cbRun()">▶ Run Program</button>
        <button class="clr-b" onclick="cbClear()">✕ Clear</button>
      </div>
    </div>
  </div>`,'🤖','CodeBot Quest');
  cbDraw();cbSeqDraw();
}
function cbLabel(c){return c==='forward'?'▶ Fwd':c==='left'?'↰ Left':c==='right'?'↱ Right':c.startsWith('loop')?`🔁 ×${c.split(':')[1]}`:c;}
function cbFlatten(seq){
  // expand loops into a flat command list. loop:N:cmd,cmd,...  (we store loops as objects)
  const out=[];
  seq.forEach(item=>{
    if(typeof item==='string')out.push(item);
    else if(item.loop){for(let i=0;i<item.n;i++)out.push(...item.cmds);}
  });
  return out;
}
function cbCount(){return _g.seq.reduce((a,it)=>a+(typeof it==='string'?1:it.n*it.cmds.length),0);}
function cbAdd(c){if(_g.running)return;FX.click();_g.seq.push(c);cbSeqDraw();}
function cbAddLoop(){
  if(_g.running)return;
  // take the last up-to-3 simple commands and wrap them
  const simple=[];let i=_g.seq.length-1;
  while(i>=0&&typeof _g.seq[i]==='string'&&simple.length<3){simple.unshift(_g.seq[i]);i--;}
  if(!simple.length){cbMsg('Add 1–3 commands first, then wrap them in a Repeat!','run');return;}
  const n=prompt('Repeat how many times? (2–6)','3');
  const times=Math.max(2,Math.min(6,parseInt(n)||3));
  _g.seq.splice(i+1);
  _g.seq.push({loop:true,n:times,cmds:simple});
  FX.powerup();cbSeqDraw();
}
function cbSeqDraw(){
  const list=document.getElementById('cbSeq');if(!list)return;list.innerHTML='';
  const cnt=document.getElementById('cbCount');if(cnt)cnt.textContent=`(${cbCount()})`;
  if(!_g.seq.length){list.innerHTML='<span class="seq-e">Empty — add blocks above</span>';return;}
  _g.seq.forEach((it,idx)=>{
    if(typeof it==='string'){
      const s=document.createElement('span');s.className='seq-i';s.textContent=cbLabel(it);
      s.onclick=()=>{if(!_g.running){_g.seq.splice(idx,1);cbSeqDraw();}};list.appendChild(s);
    }else{
      const wrap=document.createElement('span');wrap.className='seq-loop';
      wrap.innerHTML=`<span class="seq-loop-h">🔁 ×${it.n}</span>`+it.cmds.map(c=>`<span class="seq-i seq-i-in">${cbLabel(c)}</span>`).join('');
      wrap.onclick=()=>{if(!_g.running){_g.seq.splice(idx,1);cbSeqDraw();}};list.appendChild(wrap);
    }
  });
}
function cbClear(){if(_g.running)return;FX.click();_g.seq=[];_g.robot={..._g.level.start};_g.collected=[];cbSeqDraw();cbDraw();cbMsg('','');}
function cbMsg(m,t){const el=document.getElementById('cbMsg');if(!el)return;el.textContent=m;el.className='lc-msg'+(m?' show ':' ')+(t||'');}
function cbDraw(){
  const l=_g.level,grid=document.getElementById('cbGrid');if(!grid)return;grid.innerHTML='';
  const dirArrow={right:'▶',down:'▼',left:'◀',up:'▲'};
  for(let y=0;y<l.grid;y++)for(let x=0;x<l.grid;x++){
    const c=document.createElement('div');c.className='cell';
    const wall=l.walls.some(w=>w.x===x&&w.y===y);
    const gem=l.gems.some(g=>g.x===x&&g.y===y)&&!_g.collected.some(g=>g.x===x&&g.y===y);
    const goal=l.goal.x===x&&l.goal.y===y;
    const robot=_g.robot.x===x&&_g.robot.y===y;
    if(wall){c.className='cell cell-wall';c.textContent='🧱';}
    else if(robot){c.className='cell cell-char';c.innerHTML=`<span style="filter:drop-shadow(0 0 4px #A78BFA)">🤖</span>`;}
    else if(gem){c.className='cell cell-goal';const s=document.createElement('span');s.className='goal-ring';s.textContent='💎';c.appendChild(s);}
    else if(goal){c.className='cell cell-goal';const s=document.createElement('span');s.className='goal-ring';s.textContent='🏁';c.appendChild(s);}
    else c.className='cell cell-empty';
    grid.appendChild(c);
  }
}
async function cbRun(){
  if(_g.running)return;
  const cmds=cbFlatten(_g.seq);
  if(!cmds.length){cbMsg('Add some commands first!','run');return;}
  _g.running=true;_g.robot={..._g.level.start};_g.collected=[];
  const rb=document.getElementById('cbRun');if(rb)rb.disabled=true;
  cbMsg('🤖 Running your program...','run');cbDraw();
  const dirs=['right','down','left','up'];
  const mv={right:{x:1,y:0},down:{x:0,y:1},left:{x:-1,y:0},up:{x:0,y:-1}};
  for(const cmd of cmds){
    await new Promise(r=>setTimeout(r,300));
    if(cmd==='forward'){
      const m=mv[_g.robot.dir];const nx=_g.robot.x+m.x,ny=_g.robot.y+m.y;
      const ib=nx>=0&&nx<_g.level.grid&&ny>=0&&ny<_g.level.grid;
      const wall=_g.level.walls.some(w=>w.x===nx&&w.y===ny);
      if(ib&&!wall){_g.robot.x=nx;_g.robot.y=ny;FX.move();}
      else{FX.wrong();}
    }else if(cmd==='left'){_g.robot.dir=dirs[(dirs.indexOf(_g.robot.dir)+3)%4];FX.tick();}
    else if(cmd==='right'){_g.robot.dir=dirs[(dirs.indexOf(_g.robot.dir)+1)%4];FX.tick();}
    // gem?
    const gem=_g.level.gems.find(g=>g.x===_g.robot.x&&g.y===_g.robot.y&&!_g.collected.some(c=>c.x===g.x&&c.y===g.y));
    if(gem){_g.collected.push(gem);FX.coin();const gr=document.getElementById('cbGrid').getBoundingClientRect();burst(gr.left+gr.width/2,gr.top+gr.height/2,'#22D3EE',12);}
    cbDraw();
  }
  const atGoal=_g.robot.x===_g.level.goal.x&&_g.robot.y===_g.level.goal.y;
  const allGems=_g.level.gems.length===_g.collected.length;
  _g.running=false;const rb2=document.getElementById('cbRun');if(rb2)rb2.disabled=false;
  if(atGoal&&allGems){
    const used=cbFlatten(_g.seq).length;
    const stars=used<=_g.level.par?3:used<=_g.level.par*1.4?2:1;
    if(_g.idx+1>(ST.gameHi.codebot||0))ST.gameHi.codebot=_g.idx+1;
    if(stars>(ST.gameHi['codebot_stars_'+_g.idx]||0))ST.gameHi['codebot_stars_'+_g.idx]=stars;
    addXP(15+stars*5,stars);checkAch();save();
    FX.win();const gr=document.getElementById('cbGrid').getBoundingClientRect();confetti(gr.left+gr.width/2,gr.top+gr.height/2,50);
    setTimeout(()=>{
      const nextExists=_g.idx+1<CB_LEVELS.length;
      gameShell(`<div class="game-over">
        <div class="go-emoji">🏆</div><div class="go-t">Level ${_g.idx+1} Complete!</div>
        <div class="res-stars" style="font-size:2.4rem">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
        <div class="xp-pop">+${15+stars*5} XP</div>
        <div class="go-hi" style="margin-top:8px">Used ${used} commands ${stars===3?'— perfectly efficient! 🎯':stars===2?'— nice work!':'— try using loops to shorten it!'}</div>
        ${nextExists?`<button class="game-play-btn" id="cbNext">▶ Next Level</button>`:`<div style="color:#FCD34D;font-family:'Fredoka',cursive;font-size:1.3rem;margin:16px 0">🎉 You beat every level!</div>`}
        <div style="margin-top:14px"><button class="btn btn-sec" style="max-width:200px;margin:0 auto" onclick="FX.click();cbPickLevel()">📋 Levels</button></div>
      </div>`,'🤖','CodeBot Quest');
      const nb=document.getElementById('cbNext');if(nb)nb.onclick=()=>{FX.powerup();cbStart(_g.idx+1);};
    },950);
  }else if(atGoal&&!allGems){
    FX.wrong();cbMsg(`🤔 You reached the goal but missed ${_g.level.gems.length-_g.collected.length} gem(s)! Collect them all first.`,'lose');
  }else{
    FX.lose();cbMsg('🤔 Not at the goal yet. Adjust your program and try again!','lose');
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. FRACTION MATCH (polished)
// ═══════════════════════════════════════════════════════════════
const FRAC_PAIRS=[['1/2','2/4'],['1/3','2/6'],['1/4','2/8'],['3/4','6/8'],['2/3','4/6'],['1/5','2/10'],['3/5','6/10'],['1/2','3/6']];
function startFracMatchIntro(){intro('🍕','Fraction Match','Flip cards to find matching equivalent fractions! ½ matches 2/4, ⅓ matches 2/6, and so on. Match all 6 pairs in as few moves as possible!',fracMatchBegin);}
function fracMatchBegin(){
  const pairs=shuf(FRAC_PAIRS).slice(0,6);let cards=[];
  pairs.forEach((p,i)=>{cards.push({v:p[0],id:i},{v:p[1],id:i});});
  _g={cards:shuf(cards),flipped:[],matched:[],moves:0,done:0};renderFracMatch();
}
function renderFracMatch(){
  gameShell(`
    <div class="game-stat-row">
      <div class="gstat"><div class="gstat-n">${_g.moves}</div><div class="gstat-l">Moves</div></div>
      <div class="gstat"><div class="gstat-n">${_g.done}/6</div><div class="gstat-l">Pairs</div></div>
    </div>
    <div class="game-card">
      <div style="text-align:center;color:var(--neutral);font-size:.85rem;margin-bottom:10px">Match equivalent fractions!</div>
      <div class="match-grid">
        ${_g.cards.map((c,i)=>{const f=_g.flipped.includes(i),m=_g.matched.includes(i);
          return `<div class="mcard${f?' flipped':''}${m?' matched':''}" onclick="fmFlip(${i})">${f||m?c.v:'?'}</div>`;}).join('')}
      </div>
    </div>`,'🍕','Fraction Match');
}
function fmFlip(i){
  if(_g.flipped.includes(i)||_g.matched.includes(i)||_g.flipped.length>=2)return;
  FX.click();_g.flipped.push(i);renderFracMatch();
  if(_g.flipped.length===2){_g.moves++;const [a,b]=_g.flipped;
    if(_g.cards[a].id===_g.cards[b].id){
      _g.matched.push(a,b);_g.done++;_g.flipped=[];FX.coin();
      setTimeout(()=>{renderFracMatch();if(_g.done===6)fmWin();},380);
    }else{FX.wrong();setTimeout(()=>{_g.flipped=[];renderFracMatch();},850);}
  }
}
function fmWin(){
  const score=Math.max(100,300-_g.moves*15);const prevHi=ST.gameHi.fracmatch||0;
  saveHi('fracmatch',score);addXP(20,3);
  gameOverCard('🍕','Complete!',score,`Solved in ${_g.moves} moves!`,fracMatchBegin);
}

// ═══════════════════════════════════════════════════════════════
// 6. WORD WIZARD (polished)
// ═══════════════════════════════════════════════════════════════
const WORD_BANK={
  4:[{w:'enormous',syn:'huge',opts:['huge','tiny','fast']},{w:'ancient',syn:'very old',opts:['very old','brand new','shiny']},
    {w:'timid',syn:'shy',opts:['shy','brave','loud']},{w:'generous',syn:'giving',opts:['giving','selfish','angry']},
    {w:'exhausted',syn:'very tired',opts:['very tired','excited','hungry']},{w:'brave',syn:'courageous',opts:['courageous','fearful','sleepy']},
    {w:'rapid',syn:'fast',opts:['fast','slow','quiet']},{w:'gigantic',syn:'huge',opts:['huge','little','warm']},
    {w:'delighted',syn:'very happy',opts:['very happy','upset','bored']},{w:'chilly',syn:'cold',opts:['cold','hot','wet']},
    {w:'furious',syn:'very angry',opts:['very angry','calm','joyful']},{w:'weary',syn:'tired',opts:['tired','energetic','curious']}],
  6:[{w:'persuasive',syn:'convincing',opts:['convincing','confusing','boring']},{w:'skeptical',syn:'doubtful',opts:['doubtful','trusting','excited']},
    {w:'reluctant',syn:'unwilling',opts:['unwilling','eager','happy']},{w:'compelling',syn:'convincing',opts:['convincing','weak','dull']},
    {w:'abundant',syn:'plentiful',opts:['plentiful','scarce','empty']},{w:'diminish',syn:'decrease',opts:['decrease','increase','stay same']},
    {w:'benevolent',syn:'kind',opts:['kind','cruel','lazy']},{w:'inevitable',syn:'unavoidable',opts:['unavoidable','optional','unlikely']},
    {w:'meticulous',syn:'very careful',opts:['very careful','careless','quick']},{w:'obscure',syn:'unclear',opts:['unclear','obvious','bright']},
    {w:'resilient',syn:'able to recover',opts:['able to recover','fragile','weak']},{w:'candid',syn:'honest',opts:['honest','secretive','shy']}]
};
function startWordWizIntro(){intro('🔤','Word Wizard','Pick the correct synonym before the timer runs out! Correct answers add points and speed. Three misses ends the game. Grow your vocabulary!',wordWizBegin);}
function wordWizBegin(){_g={score:0,wrong:0,bank:shuf(WORD_BANK[gcNum()]),idx:0};renderWordWiz();}
function renderWordWiz(){
  if(_g.idx>=_g.bank.length){_g.bank=shuf(WORD_BANK[gcNum()]);_g.idx=0;}
  const q=_g.bank[_g.idx];_g.q=q;
  gameShell(`
    <div class="game-stat-row">
      <div class="gstat"><div class="gstat-n">${_g.score}</div><div class="gstat-l">Score</div></div>
      <div class="gstat"><div class="gstat-n">${'❤️'.repeat(3-_g.wrong)}${'🖤'.repeat(_g.wrong)}</div><div class="gstat-l">Lives</div></div>
    </div>
    <div class="timer-bar"><div class="timer-fill" id="wwTimer" style="width:100%"></div></div>
    <div class="game-card">
      <div class="ww-word">${q.w}</div>
      <div class="ww-prompt">Which word means the SAME?</div>
      <div class="ww-opts">${shuf(q.opts).map(o=>`<button class="ww-opt" onclick="wwAnswer('${o}',event)">${o}</button>`).join('')}</div>
    </div>`,'🔤','Word Wizard');
  wwTimer();
}
function wwTimer(){clearInterval(_g.timer);let el=0;const total=10;
  _g.timer=setInterval(()=>{el+=0.1;const pct=Math.max(0,100-el/total*100);
    const t=document.getElementById('wwTimer');if(t)t.style.width=pct+'%';
    if(el>=total){clearInterval(_g.timer);wwWrong();}},100);}
function wwAnswer(o,e){
  clearInterval(_g.timer);const correct=o===_g.q.syn;
  document.querySelectorAll('.ww-opt').forEach(b=>{b.disabled=true;
    if(b.textContent===_g.q.syn)b.classList.add('correct');
    else if(b.textContent===o&&!correct)b.classList.add('wrong');});
  if(correct){FX.correct();_g.score+=15;_g.idx++;
    if(e){const r=e.target.getBoundingClientRect();floatText(r.left+r.width/2,r.top,'+15','#10B981');}
    setTimeout(renderWordWiz,480);}
  else{FX.wrong();shake();setTimeout(wwWrong,650);}
}
function wwWrong(){_g.wrong++;if(_g.wrong>=3)return wwOver();_g.idx++;renderWordWiz();}
function wwOver(){const prevHi=ST.gameHi.wordwiz||0;saveHi('wordwiz',_g.score);
  addXP(Math.floor(_g.score/10),Math.floor(_g.score/45));
  gameOverCard('🔤','Game Over',_g.score,_g.score>prevHi?'A new record!':'Best: '+Math.max(prevHi,_g.score),wordWizBegin);}

// ═══════════════════════════════════════════════════════════════
// 7. SOL QUIZ BATTLE (polished)
// ═══════════════════════════════════════════════════════════════
function startSolQuizIntro(){intro('⚔️','SOL Quiz Battle','Battle the boss with your brain! Answer questions from EVERY subject. Each correct answer damages the boss; wrong answers let it strike back. Chain correct answers for extra-damage combos. Defeat the boss!',solQuizBegin);}
function solQuizBegin(){
  const gc=gcNum();const allGens=[];
  ['math','read','sci','write'].forEach(s=>(STRANDS[gc][s]||[]).forEach(st=>allGens.push(st.gen)));
  _g={playerHP:100,bossHP:100,gens:shuf(allGens),idx:0,score:0,streak:0};renderSolQuiz();
}
function renderSolQuiz(){
  if(_g.idx>=_g.gens.length){_g.gens=shuf(_g.gens);_g.idx=0;}
  let q=makeQ(_g.gens[_g.idx]),guard=0;
  while(q.type!=='mc'&&guard<12){_g.idx++;if(_g.idx>=_g.gens.length)_g.idx=0;q=makeQ(_g.gens[_g.idx]);guard++;}
  _g.q=q;
  gameShell(`
    <div style="display:flex;justify-content:space-between;gap:12px;margin-bottom:12px">
      <div style="flex:1"><div style="color:#fff;font-size:.72rem;font-weight:800;margin-bottom:4px">🦸 YOU</div>
        <div class="hp-bar"><div class="hp-fill" style="width:${_g.playerHP}%;background:linear-gradient(90deg,#10B981,#34D399)"></div></div></div>
      <div style="flex:1"><div style="color:#fff;font-size:.72rem;font-weight:800;margin-bottom:4px;text-align:right">👹 BOSS</div>
        <div class="hp-bar"><div class="hp-fill" style="width:${_g.bossHP}%;background:linear-gradient(90deg,#EF4444,#F87171);margin-left:auto"></div></div></div>
    </div>
    <div id="bossFace" style="text-align:center;font-size:3.6rem;margin-bottom:6px">${_g.bossHP>60?'😈':_g.bossHP>30?'😰':'😵'}</div>
    <div class="game-card">
      <div style="display:flex;gap:6px;margin-bottom:10px;align-items:center;flex-wrap:wrap">
        <span class="q-badge" style="background:var(--game-lt);color:var(--game)">${q.badge}</span>
        ${q.sol?`<span class="sol-tag" style="background:var(--game)">SOL ${q.sol}</span>`:''}
        ${_g.streak>=2?`<span style="margin-left:auto;color:var(--game);font-weight:800;font-size:.82rem">🔥 ${_g.streak} combo</span>`:''}
      </div>
      ${q.passage?`<div class="passage" style="border-color:var(--game);font-size:.9rem">${q.passage}</div>`:''}
      <div class="q-text" style="font-size:1rem">${String(q.question).replace(/\n/g,'<br>')}</div>
      <div class="opts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}" onclick="sqAnswer(${i})"><span class="opt-l">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>
    </div>`,'⚔️','SOL Quiz Battle');
}
function sqAnswer(i){
  const q=_g.q;const correct=String(q.opts[i])===String(q.answer);
  document.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const bi=+b.dataset.i;
    if(String(q.opts[bi])===String(q.answer))b.classList.add('correct');
    else if(bi===i&&!correct)b.classList.add('wrong');});
  if(correct){FX.correct();_g.streak++;const dmg=15+(_g.streak>=3?10:0);_g.bossHP=Math.max(0,_g.bossHP-dmg);_g.score+=dmg;
    const bf=document.getElementById('bossFace');if(bf){bf.style.transform='scale(1.2)';setTimeout(()=>bf.style.transform='',200);}
    if(_g.streak>=3)FX.combo(_g.streak);
    if(_g.bossHP<=0)return setTimeout(sqWin,500);}
  else{FX.wrong();shake(7);flash('#EF4444');_g.streak=0;_g.playerHP=Math.max(0,_g.playerHP-20);
    if(_g.playerHP<=0)return setTimeout(sqLose,700);}
  _g.idx++;setTimeout(renderSolQuiz,correct?550:800);
}
function sqWin(){const prevHi=ST.gameHi.solquiz||0;saveHi('solquiz',_g.score);addXP(30,4);
  gameOverCard('⚔️','Boss Defeated!',_g.score,`Won with ${_g.playerHP}% health left!`,solQuizBegin,'⚔️ Battle Again');}
function sqLose(){saveHi('solquiz',_g.score);addXP(Math.floor(_g.score/10),1);
  gameOverCard('💪','Defeated',_g.score,`Boss had ${_g.bossHP}% left. Try again!`,solQuizBegin,'⚔️ Try Again');}






