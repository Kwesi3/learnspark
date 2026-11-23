// ═══════════════════════════════════════════════════════════════
// DIAGRAMS — a picture for each question, drawn from the question's own
// numbers: shapes, circles, clocks, angles, graphs, grids, number lines…
// diagram(q, color) → {svg, text} ; text (optional) replaces the question
// wording when the picture now carries the data (e.g. "Look at the bar graph").
// ═══════════════════════════════════════════════════════════════
const DG={ink:'#1F2A44',grid:'#E3E9F3',soft:'#F4F7FC',sun:'#FFC83D',leaf:'#2FB37A',ember:'#FF8A3D',berry:'#E8559A',sky:'#4C8DF6'};
function dgSvg(w,h,inner,label){
  return `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label||'diagram')}" font-family="Nunito,system-ui,sans-serif">${inner}</svg>`;
}
function dgText(x,y,t,opt){opt=opt||{};
  return `<text x="${x}" y="${y}" text-anchor="${opt.a||'middle'}" font-size="${opt.s||15}" font-weight="${opt.w||800}" fill="${opt.c||DG.ink}"${opt.bg?' paint-order="stroke" stroke="#fff" stroke-width="5"':''}>${esc(t)}</text>`;}
function num(s){return parseFloat(String(s).replace('−','-'));}

// ── individual drawings ──
function dgFractionBar(d,s,col){
  const W=320,w=W/d;let r='';
  for(let i=0;i<d;i++)r+=`<rect x="${10+i*w}" y="14" width="${w}" height="56" fill="${i<s?col:'#fff'}" stroke="${DG.ink}" stroke-width="3"/>`;
  return dgSvg(340,84,r,`A bar split into ${d} equal parts with ${s} shaded`);
}
function dgPizza(d,eaten){
  const cx=110,cy=100,R=82;let r='';
  for(let i=0;i<d;i++){
    const a0=-Math.PI/2+i*2*Math.PI/d,a1=a0+2*Math.PI/d,large=(a1-a0)>Math.PI?1:0;
    const p=`M${cx},${cy} L${cx+R*Math.cos(a0)},${cy+R*Math.sin(a0)} A${R},${R} 0 ${large} 1 ${cx+R*Math.cos(a1)},${cy+R*Math.sin(a1)} Z`;
    if(i<eaten)r+=`<path d="${p}" fill="none" stroke="#B8C3D6" stroke-width="2.5" stroke-dasharray="6 6"/>`;
    else{const am=(a0+a1)/2;r+=`<path d="${p}" fill="#FFD27A" stroke="${DG.ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="${cx+R*.55*Math.cos(am)}" cy="${cy+R*.55*Math.sin(am)}" r="${Math.max(5,26/Math.sqrt(d))}" fill="#E4573D"/>`;}
  }
  r+=dgText(250,86,`${d-eaten} left`,{s:18,a:'start'})+dgText(250,112,`${eaten} eaten`,{s:15,a:'start',c:'#8090AA'});
  return dgSvg(340,200,r,`A pizza cut into ${d} slices with ${eaten} eaten`);
}
function dgRect(L,W,unit,opts){
  opts=opts||{};const maxW=250,maxH=140;const ratio=Math.min(maxW/L,maxH/W);
  let w=L*ratio,h=W*ratio;w=Math.max(w,70);h=Math.max(h,46);
  const x=(320-w)/2,y=22;
  let r=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${opts.fill||'#DCE8FF'}" stroke="${DG.ink}" stroke-width="3.5"/>`;
  r+=dgText(x+w/2,y-6,opts.top||`${L} ${unit}`)+dgText(x+w+10,y+h/2+5,opts.side||`${W} ${unit}`,{a:'start'});
  if(opts.inside)r+=dgText(x+w/2,y+h/2+5,opts.inside,{s:14,c:'#3B4A66'});
  return dgSvg(360,y+h+16,r,opts.label||`A rectangle ${L} by ${W} ${unit}`);
}
function dgClock(h,m){
  const cx=100,cy=100,R=80;let r=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="${DG.ink}" stroke-width="5"/>`;
  for(let i=0;i<60;i++){const a=i*Math.PI/30,big=i%5===0;
    r+=`<line x1="${cx+(R-(big?12:6))*Math.sin(a)}" y1="${cy-(R-(big?12:6))*Math.cos(a)}" x2="${cx+(R-3)*Math.sin(a)}" y2="${cy-(R-3)*Math.cos(a)}" stroke="${DG.ink}" stroke-width="${big?3:1.2}"/>`;}
  for(let n=1;n<=12;n++){const a=n*Math.PI/6;r+=dgText(cx+(R-26)*Math.sin(a),cy-(R-26)*Math.cos(a)+6,String(n),{s:16});}
  const ha=((h%12)+m/60)*Math.PI/6,ma=m*Math.PI/30;
  r+=`<line x1="${cx}" y1="${cy}" x2="${cx+40*Math.sin(ha)}" y2="${cy-40*Math.cos(ha)}" stroke="${DG.ink}" stroke-width="7" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx+62*Math.sin(ma)}" y2="${cy-62*Math.cos(ma)}" stroke="${DG.sky}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${DG.ink}"/>`;
  r+=`<rect x="214" y="78" width="96" height="44" rx="10" fill="${DG.ink}"/>`+dgText(262,108,`${h}:${pad(m)}`,{s:22,c:'#fff'});
  return dgSvg(330,200,r,`A clock showing ${h}:${pad(m)}`);
}
function dgAngle(deg,col){
  const vx=deg>100?190:90,vy=150,L=130,a=deg*Math.PI/180;
  const x2=vx+L*Math.cos(a),y2=vy-L*Math.sin(a),ar=36;
  const large=deg>180?1:0;
  let r=`<path d="M${vx+ar},${vy} A${ar},${ar} 0 ${large} 0 ${vx+ar*Math.cos(a)},${vy-ar*Math.sin(a)}" fill="${col}33" stroke="${col}" stroke-width="3"/>`;
  if(deg===90)r=`<path d="M${vx+22},${vy} V${vy-22} H${vx}" fill="none" stroke="${col}" stroke-width="3"/>`;
  r+=`<line x1="${vx}" y1="${vy}" x2="${vx+L+20}" y2="${vy}" stroke="${DG.ink}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}" stroke="${DG.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${vx}" cy="${vy}" r="5" fill="${DG.ink}"/>`;
  const la=a/2;r+=dgText(vx+(ar+26)*Math.cos(la),vy-(ar+26)*Math.sin(la)+5,`${deg}°`,{c:col,s:17,bg:1});
  return dgSvg(380,170,r,`An angle of ${deg} degrees`);
}
function dgStraight(a,col){
  const vx=170,vy=120,ar=40,rad=a*Math.PI/180;
  let r=`<line x1="20" y1="${vy}" x2="320" y2="${vy}" stroke="${DG.ink}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${vx}" y1="${vy}" x2="${vx+120*Math.cos(rad)}" y2="${vy-120*Math.sin(rad)}" stroke="${DG.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M${vx+ar},${vy} A${ar},${ar} 0 0 0 ${vx+ar*Math.cos(rad)},${vy-ar*Math.sin(rad)}" fill="none" stroke="${col}" stroke-width="3"/>
    <path d="M${vx+ar*Math.cos(rad)},${vy-ar*Math.sin(rad)} A${ar},${ar} 0 0 0 ${vx-ar},${vy}" fill="none" stroke="${DG.berry}" stroke-width="3" stroke-dasharray="5 4"/>
    <circle cx="${vx}" cy="${vy}" r="5" fill="${DG.ink}"/>`;
  r+=dgText(vx+70*Math.cos(rad/2),vy-70*Math.sin(rad/2)+5,`${a}°`,{c:col,s:17,bg:1});
  const mid=(rad+Math.PI)/2;r+=dgText(vx+68*Math.cos(mid),vy-68*Math.sin(mid)+5,'?',{c:DG.berry,s:20,bg:1});
  return dgSvg(340,140,r,`A straight line split into ${a} degrees and an unknown angle`);
}
function dgTriAngles(a,b,col){
  const P=[[40,160],[300,160],[120,26]];
  let r=`<path d="M${P[0]} L${P[1]} L${P[2]} Z" fill="${col}22" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>`;
  r+=dgText(78,148,`${a}°`,{c:col})+dgText(262,148,`${b}°`,{c:col})+dgText(122,62,'?',{c:DG.berry,s:20});
  return dgSvg(340,180,r,`A triangle with angles ${a} degrees, ${b} degrees, and an unknown angle`);
}
function dgMarbles(counts){
  const cols={red:'#E4573D',blue:DG.sky,green:DG.leaf};const list=[];
  Object.entries(counts).forEach(([k,n])=>{for(let i=0;i<n;i++)list.push(k);});
  // fixed, scattered order so the picture stays the same for this question
  const order=list.map((c,i)=>({c,k:(i*37)%list.length})).sort((p,q)=>p.k-q.k).map(p=>p.c);
  let r=`<path d="M60 30 H220 V40 C236 48 240 64 240 80 V180 C240 196 228 206 212 206 H68 C52 206 40 196 40 180 V80 C40 64 44 48 60 40 Z" fill="#F4F7FC" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="54" y="18" width="172" height="16" rx="6" fill="${DG.ink}"/>`;
  const per=6;order.forEach((c,i)=>{const row=Math.floor(i/per),col=i%per;
    r+=`<circle cx="${70+col*28+(row%2)*12}" cy="${188-row*26}" r="11" fill="${cols[c]}" stroke="${DG.ink}" stroke-width="2.5"/>
      <circle cx="${66+col*28+(row%2)*12}" cy="${184-row*26}" r="3" fill="#fff" opacity=".7"/>`;});
  let ly=70;Object.entries(counts).forEach(([k,n])=>{r+=`<circle cx="268" cy="${ly-5}" r="9" fill="${cols[k]}" stroke="${DG.ink}" stroke-width="2.5"/>`+dgText(284,ly,`${n} ${k}`,{a:'start'});ly+=34;});
  return dgSvg(370,220,r,`A jar of marbles: ${Object.entries(counts).map(([k,n])=>n+' '+k).join(', ')}`);
}
function dgBars(pairs,col){
  const max=Math.max(...pairs.map(p=>p[1]));const top=Math.ceil(max/4)*4||4;
  const H=170,X0=44,Y0=200,bw=Math.min(44,250/pairs.length-14),gap=280/pairs.length;
  let r='';
  for(let v=0;v<=top;v+=2){const y=Y0-v/top*H;r+=`<line x1="${X0}" y1="${y}" x2="${X0+290}" y2="${y}" stroke="${DG.grid}" stroke-width="${v%4===0?2:1}"/>`;
    if(v%4===0)r+=dgText(X0-8,y+5,String(v),{a:'end',s:13,w:700,c:'#5B6B85'});}
  pairs.forEach((p,i)=>{const h=p[1]/top*H,x=X0+gap*i+(gap-bw)/2;
    r+=`<rect x="${x}" y="${Y0-h}" width="${bw}" height="${h}" rx="5" fill="${col}" stroke="${DG.ink}" stroke-width="3"/>`
      +dgText(x+bw/2,Y0-h-7,String(p[1]),{s:14})+dgText(x+bw/2,Y0+20,p[0],{s:14});});
  r+=`<line x1="${X0}" y1="${Y0}" x2="${X0+290}" y2="${Y0}" stroke="${DG.ink}" stroke-width="3"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0-H-8}" stroke="${DG.ink}" stroke-width="3"/>`;
  return dgSvg(350,228,r,'Bar graph: '+pairs.map(p=>p[0]+' '+p[1]).join(', '));
}
function dgCircle(r0,kind,unit,col){
  const cx=130,cy=110,R=86;
  let r=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${col}1f" stroke="${DG.ink}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="5" fill="${DG.ink}"/>`;
  if(kind==='d'){r+=`<line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="${col}" stroke-width="4"/>`+dgText(cx,cy-10,`d = ${r0} ${unit}`,{c:col,bg:1,s:16});}
  else{const a=-0.5;r+=`<line x1="${cx}" y1="${cy}" x2="${cx+R*Math.cos(a)}" y2="${cy+R*Math.sin(a)}" stroke="${col}" stroke-width="4"/>`+dgText(cx+R*.5*Math.cos(a)+4,cy+R*.5*Math.sin(a)-10,`r = ${r0} ${unit}`,{c:col,bg:1,s:16});}
  r+=dgText(250,60,'center',{a:'start',s:13,c:'#5B6B85',w:700})+`<path d="M246 56 Q190 70 ${cx+8} ${cy-4}" fill="none" stroke="#8090AA" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  return dgSvg(330,210,r,kind==='d'?`A circle with diameter ${r0} ${unit}`:`A circle with radius ${r0} ${unit}`);
}
function dgTriangleBH(b,h,unit,col){
  const x0=40,x1=280,y=170,ax=200,ay=30;
  let r=`<path d="M${x0},${y} L${x1},${y} L${ax},${ay} Z" fill="${col}22" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="${ax}" y1="${ay}" x2="${ax}" y2="${y}" stroke="${col}" stroke-width="3" stroke-dasharray="7 5"/>
    <path d="M${ax} ${y-14} H${ax+14} V${y}" fill="none" stroke="${col}" stroke-width="2.5"/>`;
  r+=dgText((x0+x1)/2,y+24,`base = ${b} ${unit}`)+dgText(ax+10,(ay+y)/2,`height = ${h} ${unit}`,{a:'start',c:col,bg:1});
  return dgSvg(360,204,r,`A triangle with base ${b} ${unit} and height ${h} ${unit}`);
}
function dgParallelogram(b,h,unit,col){
  const s=50,x=40,y=40,w=230,hh=120;
  let r=`<path d="M${x+s},${y} L${x+s+w},${y} L${x+w},${y+hh} L${x},${y+hh} Z" fill="${col}22" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="${x+s}" y1="${y}" x2="${x+s}" y2="${y+hh}" stroke="${col}" stroke-width="3" stroke-dasharray="7 5"/>
    <path d="M${x+s} ${y+hh-14} H${x+s+14} V${y+hh}" fill="none" stroke="${col}" stroke-width="2.5"/>`;
  r+=dgText(x+w/2,y+hh+24,`base = ${b} ${unit}`)+dgText(x+s+10,y+hh/2+5,`height = ${h} ${unit}`,{a:'start',c:col,bg:1});
  return dgSvg(340,196,r,`A parallelogram with base ${b} ${unit} and height ${h} ${unit}`);
}
function dgTrapezoid(b1,b2,h,unit,col){
  const y0=40,y1=160,cx=165,t=Math.max(90,Math.min(220,b1/Math.max(b1,b2)*230)),bt=Math.max(90,Math.min(240,b2/Math.max(b1,b2)*240));
  let r=`<path d="M${cx-t/2},${y0} L${cx+t/2},${y0} L${cx+bt/2},${y1} L${cx-bt/2},${y1} Z" fill="${col}22" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="${cx-t/2+12}" y1="${y0}" x2="${cx-t/2+12}" y2="${y1}" stroke="${col}" stroke-width="3" stroke-dasharray="7 5"/>`;
  r+=dgText(cx,y0-10,`b₁ = ${b1} ${unit}`)+dgText(cx,y1+24,`b₂ = ${b2} ${unit}`)+dgText(cx-t/2+20,(y0+y1)/2+5,`h = ${h} ${unit}`,{a:'start',c:col,bg:1});
  return dgSvg(340,194,r,`A trapezoid with bases ${b1} and ${b2} ${unit} and height ${h} ${unit}`);
}
function dgPrism(l,w,h,unit,col){
  const sc=Math.min(150/l,90/h,14),L=Math.max(70,l*sc),H=Math.max(50,h*sc),D=Math.max(30,w*sc*.6);
  const x=50,y=40+D;
  const front=`M${x},${y} h${L} v${H} h${-L} Z`,top=`M${x},${y} l${D},${-D} h${L} l${-D},${D} Z`,side=`M${x+L},${y} l${D},${-D} v${H} l${-D},${D} Z`;
  let r=`<path d="${top}" fill="${col}55" stroke="${DG.ink}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="${side}" fill="${col}88" stroke="${DG.ink}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="${front}" fill="${col}2a" stroke="${DG.ink}" stroke-width="3.5" stroke-linejoin="round"/>`;
  r+=dgText(x+L/2,y+H+22,`length ${l} ${unit}`)+dgText(x+L+D/2+10,y+H-D/2+4,`width ${w}`,{a:'start'})+dgText(x-8,y+H/2+5,`height ${h}`,{a:'end'});
  return dgSvg(Math.max(330,x+L+D+90),y+H+32,`<g transform="translate(70,0)">${r}</g>`,`A box ${l} by ${w} by ${h} ${unit}`);
}
function dgGrid(points,col){
  const N=7,c=17,O=N*c+30;let r='';
  for(let i=-N;i<=N;i++){r+=`<line x1="${O+i*c}" y1="${O-N*c}" x2="${O+i*c}" y2="${O+N*c}" stroke="${DG.grid}" stroke-width="1.3"/><line x1="${O-N*c}" y1="${O+i*c}" x2="${O+N*c}" y2="${O+i*c}" stroke="${DG.grid}" stroke-width="1.3"/>`;
    if(i&&i%2===0)r+=dgText(O+i*c,O+15,String(i),{s:10,w:700,c:'#5B6B85'})+dgText(O-6,O-i*c+4,String(i),{s:10,w:700,c:'#5B6B85',a:'end'});}
  r+=`<line x1="${O-N*c-8}" y1="${O}" x2="${O+N*c+8}" y2="${O}" stroke="${DG.ink}" stroke-width="2.5"/><line x1="${O}" y1="${O-N*c-8}" x2="${O}" y2="${O+N*c+8}" stroke="${DG.ink}" stroke-width="2.5"/>`
    +dgText(O+N*c+16,O+5,'x',{s:14})+dgText(O,O-N*c-14,'y',{s:14});
  points.forEach(p=>{r+=`<circle cx="${O+p.x*c}" cy="${O-p.y*c}" r="7" fill="${col}" stroke="${DG.ink}" stroke-width="2.5"/>`+dgText(O+p.x*c+10,O-p.y*c-9,p.label,{a:'start',s:13,bg:1});});
  return dgSvg(O*2+10,O*2,r,'Coordinate plane with '+points.map(p=>`${p.label}`).join(' and '));
}
function dgIneq(sym,v,col){
  const lo=v-6,X0=30,step=26;let r=`<line x1="12" y1="60" x2="${X0+12*step+18}" y2="60" stroke="${DG.ink}" stroke-width="3"/>
    <path d="M12 60 l10 -7 v14 Z M${X0+12*step+18} 60 l-10 -7 v14 Z" fill="${DG.ink}"/>`;
  for(let i=0;i<=12;i++){const x=X0+i*step;r+=`<line x1="${x}" y1="52" x2="${x}" y2="68" stroke="${DG.ink}" stroke-width="2"/>`+dgText(x,88,String(lo+i),{s:12,w:700});}
  const vx=X0+6*step,right=sym==='>'||sym==='≥',closed=sym==='≥'||sym==='≤';
  r+=`<line x1="${vx}" y1="40" x2="${right?X0+12*step+10:20}" y2="40" stroke="${col}" stroke-width="6" stroke-linecap="round"/>
    <path d="${right?`M${X0+12*step+18} 40 l-12 -9 v18 Z`:`M12 40 l12 -9 v18 Z`}" fill="${col}"/>
    <circle cx="${vx}" cy="40" r="8" fill="${closed?col:'#fff'}" stroke="${col}" stroke-width="4"/>`;
  r+=dgText(vx,20,`x ${sym} ${v}`,{c:col,s:16});
  return dgSvg(X0*2+12*step+10,100,r,`Number line showing x ${sym} ${v}`);
}
const PIE_COLS=['#4C8DF6','#FFC83D','#2FB37A','#E8559A','#FF8A3D'];
function dgPie(pairs){
  const cx=100,cy=100,R=82;let a0=-Math.PI/2,r='';
  pairs.forEach((p,i)=>{const a1=a0+p[1]/100*2*Math.PI,large=(a1-a0)>Math.PI?1:0;
    r+=`<path d="M${cx},${cy} L${cx+R*Math.cos(a0)},${cy+R*Math.sin(a0)} A${R},${R} 0 ${large} 1 ${cx+R*Math.cos(a1)},${cy+R*Math.sin(a1)} Z" fill="${PIE_COLS[i%5]}" stroke="${DG.ink}" stroke-width="3" stroke-linejoin="round"/>`;
    const am=(a0+a1)/2;r+=dgText(cx+R*.62*Math.cos(am),cy+R*.62*Math.sin(am)+5,p[1]+'%',{s:13,bg:1});a0=a1;});
  pairs.forEach((p,i)=>{r+=`<rect x="206" y="${40+i*32}" width="18" height="18" rx="4" fill="${PIE_COLS[i%5]}" stroke="${DG.ink}" stroke-width="2.5"/>`+dgText(232,54+i*32,`${p[0]} (${p[1]}%)`,{a:'start',s:14});});
  return dgSvg(370,200,r,'Circle graph: '+pairs.map(p=>p[0]+' '+p[1]+' percent').join(', '));
}
function dgDots(vals,col,outlier){
  const all=outlier!==undefined?vals.concat([outlier]):vals;const lo=Math.min(...all),hi=Math.max(...all);
  const span=Math.max(hi-lo,1),X0=30,W=300,sx=v=>X0+(v-lo)/span*W;const count={};let r='';
  r+=`<line x1="${X0-14}" y1="150" x2="${X0+W+14}" y2="150" stroke="${DG.ink}" stroke-width="3"/>`;
  const stepT=span>30?10:span>12?2:1;
  for(let v=Math.ceil(lo/stepT)*stepT;v<=hi;v+=stepT){r+=`<line x1="${sx(v)}" y1="144" x2="${sx(v)}" y2="156" stroke="${DG.ink}" stroke-width="2"/>`+dgText(sx(v),174,String(v),{s:12,w:700});}
  vals.forEach(v=>{count[v]=(count[v]||0)+1;r+=`<circle cx="${sx(v)}" cy="${150-count[v]*20}" r="8" fill="${col}" stroke="${DG.ink}" stroke-width="2.5"/>`;});
  if(outlier!==undefined)r+=`<circle cx="${sx(outlier)}" cy="130" r="8" fill="${DG.ember}" stroke="${DG.ink}" stroke-width="2.5"/>`+dgText(sx(outlier),108,'outlier',{s:12,c:'#C2410C'});
  return dgSvg(360,186,r,'Dot plot of '+all.join(', '));
}
function dgSquareGrid(b,col){
  const S=Math.min(190,b*22),c=S/b;let r=`<rect x="20" y="20" width="${S}" height="${S}" fill="${col}33" stroke="${DG.ink}" stroke-width="3.5"/>`;
  for(let i=1;i<b;i++)r+=`<line x1="${20+i*c}" y1="20" x2="${20+i*c}" y2="${20+S}" stroke="${DG.ink}" stroke-width="1.2" opacity=".55"/><line x1="20" y1="${20+i*c}" x2="${20+S}" y2="${20+i*c}" stroke="${DG.ink}" stroke-width="1.2" opacity=".55"/>`;
  r+=dgText(20+S/2,S+44,`${b} across`)+dgText(S+30,20+S/2+5,`${b} down`,{a:'start'});
  return dgSvg(S+120,S+56,r,`A ${b} by ${b} square of unit squares`);
}
function dgThermo(t){
  const lo=-30,hi=20,y=v=>200-(v-lo)/(hi-lo)*170;let r=`<rect x="70" y="20" width="30" height="190" rx="15" fill="#fff" stroke="${DG.ink}" stroke-width="4"/>
    <circle cx="85" cy="218" r="22" fill="#E4573D" stroke="${DG.ink}" stroke-width="4"/>
    <rect x="78" y="${y(t)}" width="14" height="${218-y(t)}" fill="#E4573D"/>`;
  for(let v=lo;v<=hi;v+=10){r+=`<line x1="100" y1="${y(v)}" x2="112" y2="${y(v)}" stroke="${DG.ink}" stroke-width="2.5"/>`+dgText(118,y(v)+5,`${v}°`,{a:'start',s:13,w:700});}
  r+=`<line x1="40" y1="${y(t)}" x2="70" y2="${y(t)}" stroke="#E4573D" stroke-width="3"/>`+dgText(36,y(t)+5,`${t}°F`,{a:'end',c:'#C2410C'});
  return dgSvg(220,250,`<g transform="translate(30,0)">${r}</g>`,`A thermometer at ${t} degrees`);
}

// ── match a question to its picture ──
function diagram(q,col){
  if(!q||q.type!=='mc'||!q.question)return null;
  const t=String(q.question);let m;
  try{
    if((m=t.match(/divided into (\d+) equal parts\. (\d+) part/)))return {svg:dgFractionBar(+m[1],+m[2],col)};
    if((m=t.match(/cut into (\d+) equal slices\. (\d+) slice/)))return {svg:dgPizza(+m[1],+m[2])};
    if((m=t.match(/(?:rectangle|room) is (\d+) (cm|m|in|ft) long and (\d+) \w+ wide/)))return {svg:dgRect(+m[1],+m[3],m[2])};
    if((m=t.match(/area of (\d+) cm² and a length of (\d+) cm/)))return {svg:dgRect(+m[2],Math.max(1,+m[1]/+m[2]),'cm',{side:'?',inside:`Area = ${m[1]} cm²`})};
    if((m=t.match(/square has sides of (\d+) (\w+)/)))return {svg:dgRect(+m[1],+m[1],m[2]==='inches'?'in':m[2],{fill:'#FFF1C9'})};
    if((m=t.match(/(\d{1,2}):(\d{2})/))&&/time|starts|ENDED|ends|movie|School|game/i.test(t))return {svg:dgClock(+m[1],+m[2])};
    if((m=t.match(/An angle measures (\d+)°/)))return {svg:dgAngle(+m[1],col)};
    if((m=t.match(/straight line\. One is (\d+)°/)))return {svg:dgStraight(+m[1],col)};
    if((m=t.match(/triangle has angles of (\d+)° and (\d+)°/)))return {svg:dgTriAngles(+m[1],+m[2],col)};
    if((m=t.match(/bag has (\d+) red, (\d+) blue, and (\d+) green marbles/)))return {svg:dgMarbles({red:+m[1],blue:+m[2],green:+m[3]})};
    if(/A graph shows:/.test(t)){const pairs=[...t.matchAll(/([A-Z][a-z]{2})=(\d+)/g)].map(x=>[x[1],+x[2]]);
      if(pairs.length)return {svg:dgBars(pairs,col),text:t.replace(/A graph shows:[^\n]*\n?/,'Look at the bar graph.\n')};}
    if((m=t.match(/diameter of (\d+) cm/)))return {svg:dgCircle(+m[1],'d','cm',col)};
    if((m=t.match(/circle (?:has a |with )radius (?:of )?(\d+) cm/)))return {svg:dgCircle(+m[1],'r','cm',col)};
    if((m=t.match(/triangle has a base of (\d+) (cm|m) and a height of (\d+)/)))return {svg:dgTriangleBH(+m[1],+m[3],m[2],col)};
    if((m=t.match(/parallelogram has a base of (\d+) (cm|m) and a height of (\d+)/)))return {svg:dgParallelogram(+m[1],+m[3],m[2],col)};
    if((m=t.match(/trapezoid has bases of (\d+) cm and (\d+) cm, and a height of (\d+)/)))return {svg:dgTrapezoid(+m[1],+m[2],+m[3],'cm',col)};
    if((m=t.match(/(?:prism|box) is (\d+) × (\d+) × (\d+) cm/)))return {svg:dgPrism(+m[1],+m[2],+m[3],'cm',col)};
    if(/\((-?\d+), (-?\d+)\)/.test(t)&&/Point|point|Points/.test(t)){
      const pts=[...t.matchAll(/\((-?\d+), (-?\d+)\)/g)].slice(0,2).map((x,i)=>({x:+x[1],y:+x[2]}));
      const lab=(t.match(/Point ([A-Z])/)||[])[1];
      pts.forEach((p,i)=>p.label=lab||(pts.length>1?'PQ'[i]:'P')+` (${p.x}, ${p.y})`);
      if(lab)pts[0].label=`${lab} (${pts[0].x}, ${pts[0].y})`;
      if(pts.every(p=>Math.abs(p.x)<=7&&Math.abs(p.y)<=7))return {svg:dgGrid(pts,col)};}
    if((m=t.match(/SOLUTION to\s+x ([<>≤≥]) (\d+)/)))return {svg:dgIneq(m[1],+m[2],col)};
    if(/circle graph shows:/.test(t)){const pairs=[...t.matchAll(/([A-Z][a-z]+) (\d+)%/g)].map(x=>[x[1],+x[2]]);
      if(pairs.length>=3)return {svg:dgPie(pairs),text:t.replace(/A circle graph shows:[^.]*%\./,'Look at the circle graph.')};}
    if((m=t.match(/Data: ([\d, ]+)/))){const vals=m[1].split(',').map(s=>+s.trim()).filter(n=>!isNaN(n));
      const o=t.match(/outlier of (\d+)/);if(vals.length>=3)return {svg:dgDots(vals,col,o?+o[1]:undefined)};}
    if((m=t.match(/^What is (\d+)²\?/))&&+m[1]<=12)return {svg:dgSquareGrid(+m[1],col)};
    if((m=t.match(/temperature is (−?-?\d+)°F/)))return {svg:dgThermo(num(m[1]))};
  }catch(e){return null;}
  return null;
}

// ── labeled teaching pictures for science lessons ──
function lblLine(x1,y1,x2,y2,t,anchor){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8090AA" stroke-width="2" stroke-dasharray="4 3"/>`+dgText(x2+(anchor==='end'?-6:6),y2+5,t,{a:anchor||'start',s:15});}
const LESSON_ART={
  plants:()=>dgSvg(380,260,`
    <circle cx="320" cy="42" r="24" fill="${DG.sun}" stroke="${DG.ink}" stroke-width="3.5"/>
    <path d="M60 210 H300" stroke="#8B5A2B" stroke-width="5"/><rect x="40" y="210" width="280" height="44" fill="#E9D3B4"/>
    <path d="M180 210 C176 230 160 240 150 252 M180 214 C186 232 204 240 214 252 M180 212 V252" stroke="#8B5A2B" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M180 210 V90" stroke="#2E8B57" stroke-width="7" stroke-linecap="round"/>
    <path d="M180 150 C150 132 124 140 114 156 C140 166 164 162 180 150 Z" fill="${DG.leaf}" stroke="${DG.ink}" stroke-width="3"/>
    <path d="M180 124 C210 106 236 114 246 130 C220 140 196 136 180 124 Z" fill="${DG.leaf}" stroke="${DG.ink}" stroke-width="3"/>
    ${[0,72,144,216,288].map(a=>`<ellipse cx="${180+16*Math.cos(a*Math.PI/180)}" cy="${76+16*Math.sin(a*Math.PI/180)}" rx="12" ry="8" transform="rotate(${a} ${180+16*Math.cos(a*Math.PI/180)} ${76+16*Math.sin(a*Math.PI/180)})" fill="${DG.berry}" stroke="${DG.ink}" stroke-width="2.5"/>`).join('')}
    <circle cx="180" cy="76" r="9" fill="${DG.sun}" stroke="${DG.ink}" stroke-width="2.5"/>
    ${lblLine(194,70,260,40,'flower')}${lblLine(124,150,40,128,'leaf','end')}${lblLine(180,180,262,180,'stem')}${lblLine(206,244,262,234,'roots')}`,'Parts of a plant: flower, leaf, stem, roots'),
  circuit:()=>dgSvg(380,230,`
    <path d="M70 60 H310 V180 H70 Z" fill="none" stroke="${DG.ink}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="40" y="96" width="60" height="50" rx="6" fill="${DG.sky}" stroke="${DG.ink}" stroke-width="3.5"/>${dgText(70,128,'+  −',{s:16,c:'#fff'})}
    <circle cx="190" cy="60" r="22" fill="#FFF3B0" stroke="${DG.ink}" stroke-width="3.5"/><path d="M182 66 l4 -12 l4 10 l4 -10 l4 12" stroke="${DG.ink}" stroke-width="2" fill="none"/>
    <circle cx="160" cy="180" r="6" fill="${DG.ink}"/><circle cx="220" cy="180" r="6" fill="${DG.ink}"/><line x1="160" y1="180" x2="214" y2="162" stroke="${DG.ink}" stroke-width="5" stroke-linecap="round"/>
    <rect x="150" y="174" width="80" height="12" fill="#fff"/><circle cx="160" cy="180" r="6" fill="${DG.ink}"/><circle cx="220" cy="180" r="6" fill="${DG.ink}"/><line x1="160" y1="180" x2="216" y2="164" stroke="${DG.ink}" stroke-width="5" stroke-linecap="round"/>
    ${dgText(70,174,'battery',{s:14})}${dgText(190,26,'bulb',{s:14})}${dgText(190,214,'switch (open = off)',{s:14})}${dgText(330,124,'wire',{s:14,a:'start'})}`,'A simple circuit with a battery, wire, bulb and switch'),
  water:()=>dgSvg(400,250,`
    <rect x="0" y="190" width="400" height="60" fill="${DG.sky}" opacity=".5"/><path d="M0 190 Q50 182 100 190 T200 190 T300 190 T400 190" stroke="${DG.sky}" stroke-width="3" fill="none"/>
    <circle cx="350" cy="44" r="24" fill="${DG.sun}" stroke="${DG.ink}" stroke-width="3.5"/>
    <g fill="#fff" stroke="${DG.ink}" stroke-width="3"><circle cx="160" cy="58" r="22"/><circle cx="188" cy="48" r="26"/><circle cx="218" cy="60" r="20"/><rect x="150" y="58" width="76" height="22" stroke="none"/></g>
    <path d="M150 80 H228" stroke="${DG.ink}" stroke-width="3"/>
    ${[166,186,206].map(x=>`<path d="M${x} 96 l-5 12 a5 5 0 0 0 10 0 Z" fill="${DG.sky}" stroke="${DG.ink}" stroke-width="2"/>`).join('')}
    <path d="M90 180 C70 140 80 100 130 72" stroke="${DG.ember}" stroke-width="4" fill="none" stroke-dasharray="8 6" marker-end="url(#ar)"/>
    <path d="M250 70 C300 90 320 130 300 176" stroke="${DG.sky}" stroke-width="4" fill="none" marker-end="url(#ar2)"/>
    <defs><marker id="ar" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 Z" fill="${DG.ember}"/></marker><marker id="ar2" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 Z" fill="${DG.sky}"/></marker></defs>
    ${dgText(46,150,'evaporation',{s:14,a:'start',bg:1})}${dgText(140,44,'condensation',{s:14,a:'end'})}${dgText(196,134,'precipitation',{s:14,bg:1})}${dgText(330,150,'collection',{s:14,bg:1})}`,'The water cycle: evaporation, condensation, precipitation, collection'),
  space:()=>dgSvg(400,220,`
    <circle cx="70" cy="110" r="52" fill="${DG.sun}" stroke="${DG.ink}" stroke-width="4"/>
    ${[0,45,90,135,180,225,270,315].map(a=>`<line x1="${70+60*Math.cos(a*Math.PI/180)}" y1="${110+60*Math.sin(a*Math.PI/180)}" x2="${70+72*Math.cos(a*Math.PI/180)}" y2="${110+72*Math.sin(a*Math.PI/180)}" stroke="${DG.ember}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <ellipse cx="250" cy="110" rx="130" ry="70" fill="none" stroke="#B8C3D6" stroke-width="2" stroke-dasharray="6 5"/>
    <g transform="rotate(-23 300 70)"><circle cx="300" cy="70" r="26" fill="${DG.sky}" stroke="${DG.ink}" stroke-width="3.5"/><path d="M288 60 q10 -6 18 2 q-4 10 -12 8 Z M300 82 q8 -2 10 4" fill="${DG.leaf}"/><line x1="300" y1="36" x2="300" y2="104" stroke="${DG.ink}" stroke-width="2" stroke-dasharray="4 3"/></g>
    <circle cx="350" cy="36" r="9" fill="#E5E7EB" stroke="${DG.ink}" stroke-width="2.5"/>
    ${dgText(70,200,'Sun',{s:15})}${dgText(300,128,'Earth (tilted)',{s:15})}${dgText(350,18,'Moon',{s:13})}${dgText(250,200,'1 orbit = 1 year · 1 spin = 1 day',{s:13,c:'#5B6B85'})}`,'The Sun, Earth and Moon. Earth spins once a day and orbits once a year'),
  food:()=>dgSvg(420,170,`
    ${[['🌿','grass','producer'],['🐇','rabbit','herbivore'],['🦊','fox','carnivore'],['🍄','fungi','decomposer']].map((x,i)=>`
      <circle cx="${55+i*105}" cy="70" r="40" fill="#fff" stroke="${DG.ink}" stroke-width="3.5"/>
      <text x="${55+i*105}" y="84" text-anchor="middle" font-size="38">${x[0]}</text>
      ${dgText(55+i*105,132,x[1],{s:15})}${dgText(55+i*105,152,x[2],{s:12,c:'#5B6B85',w:700})}
      ${i<3?`<path d="M${97+i*105} 70 h18" stroke="${DG.ember}" stroke-width="4" marker-end="url(#fa)"/>`:''}`).join('')}
    <defs><marker id="fa" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 Z" fill="${DG.ember}"/></marker></defs>`,'A food chain: grass, rabbit, fox, decomposers. Arrows show energy moving'),
  energy:()=>dgSvg(400,170,`
    <rect x="20" y="40" width="90" height="70" rx="12" fill="${DG.sun}" stroke="${DG.ink}" stroke-width="3.5"/>${dgText(65,82,'stored',{s:15})}
    <rect x="155" y="40" width="90" height="70" rx="12" fill="${DG.sky}" stroke="${DG.ink}" stroke-width="3.5"/>${dgText(200,82,'motion',{s:15,c:'#fff'})}
    <rect x="290" y="40" width="90" height="70" rx="12" fill="${DG.ember}" stroke="${DG.ink}" stroke-width="3.5"/>${dgText(335,82,'heat/light',{s:14})}
    <path d="M112 75 h38 M247 75 h38" stroke="${DG.ink}" stroke-width="4" marker-end="url(#ea)"/>
    <defs><marker id="ea" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 Z" fill="${DG.ink}"/></marker></defs>
    ${dgText(65,136,'potential',{s:13,c:'#5B6B85',w:700})}${dgText(200,136,'kinetic',{s:13,c:'#5B6B85',w:700})}${dgText(335,136,'thermal / radiant',{s:13,c:'#5B6B85',w:700})}
    ${dgText(200,22,'Energy changes form — the total stays the same',{s:14})}`,'Energy changes from stored to motion to heat and light'),
};
const LESSON_ART_FOR={g4_plants:'plants',g4_elec:'circuit',g4_weather:'water',g6_atmo:'water',g4_space:'space',g6_solar:'space',
  g4_eco:'food',g6_eco:'food',g4_force:'energy',g6_energy:'energy'};
function lessonArt(gen){const k=LESSON_ART_FOR[gen];return k?LESSON_ART[k]():'';}


