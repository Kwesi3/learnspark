// ═══════════════════════════════════════════════════════════════
// EARLY ELEMENTARY MATH — 2023 Virginia Mathematics SOL, Grades 1–3
// ═══════════════════════════════════════════════════════════════
function dgClock(h,m){
  const cx=90,cy=90,r=72;let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${DG.ink}" stroke-width="4"/>`;
  for(let i=1;i<=12;i++){const a=(i/12)*2*Math.PI-Math.PI/2;s+=dgText(cx+Math.cos(a)*56,cy+Math.sin(a)*56+6,String(i),{s:16});}
  for(let i=0;i<60;i++){if(i%5)continue;const a=(i/60)*2*Math.PI-Math.PI/2;s+=`<line x1="${cx+Math.cos(a)*66}" y1="${cy+Math.sin(a)*66}" x2="${cx+Math.cos(a)*71}" y2="${cy+Math.sin(a)*71}" stroke="${DG.ink}" stroke-width="2"/>`;}
  const ma=(m/60)*2*Math.PI-Math.PI/2,ha=((h%12)+m/60)/12*2*Math.PI-Math.PI/2;
  s+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(ha)*38}" y2="${cy+Math.sin(ha)*38}" stroke="${DG.ink}" stroke-width="6" stroke-linecap="round"/>`;
  s+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(ma)*58}" y2="${cy+Math.sin(ma)*58}" stroke="#2D74DA" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="${DG.ink}"/>`;
  return dgSvg(180,180,s,`Clock showing ${h}:${String(m).padStart(2,'0')}`);
}
function dgBars(labels,counts,col,title){
  const W=360,H=210,x0=44,y0=172,bw=(W-70)/labels.length;const mx=Math.max(...counts,1);const step=mx>10?2:1;const sc=130/mx;
  let r=`<line x1="${x0}" y1="${y0}" x2="${W-12}" y2="${y0}" stroke="${DG.ink}" stroke-width="2.5"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="28" stroke="${DG.ink}" stroke-width="2.5"/>`;
  for(let v=0;v<=mx;v+=step){const y=y0-v*sc;r+=`<line x1="${x0}" y1="${y}" x2="${W-12}" y2="${y}" stroke="${DG.grid}"/>`+dgText(x0-8,y+5,String(v),{s:12,a:'end'});}
  counts.forEach((c,i)=>{const x=x0+i*bw+bw*.18;r+=`<rect x="${x}" y="${y0-c*sc}" width="${bw*.64}" height="${c*sc}" rx="3" fill="${col}" stroke="${DG.ink}" stroke-width="2"/>`+dgText(x+bw*.32,y0+20,labels[i],{s:12});});
  if(title)r+=dgText(W/2,18,title,{s:13});
  return dgSvg(W,H+10,r,title||'Bar graph');
}
function dgPicto(labels,counts,col,key){
  const W=360,rowH=34,H=labels.length*rowH+40;let r='';
  labels.forEach((l,i)=>{const y=24+i*rowH;r+=dgText(70,y+6,l,{s:13,a:'end'});
    for(let k=0;k<counts[i];k++)r+=`<circle cx="${92+k*24}" cy="${y}" r="9" fill="${col}" stroke="${DG.ink}" stroke-width="2"/>`;});
  r+=dgText(W/2,H-6,key||'Each ● = 1',{s:12});
  return dgSvg(W,H,r,'Picture graph');
}
const ORD=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const tm=(h,m)=>`${((h-1)%12+12)%12+1}:${String(m).padStart(2,'0')}`;

// ---------- GRADE 1 ----------
GEN.g1_ns1=()=>{const t=rng(0,3);
  if(t===0){const by=pick([2,5,10]);const s=by*rng(1,8);const seq=[s,s+by,s+2*by];
    return mcq('Skip Counting','1.NS.1',`Count by ${by}s. What comes next? ${seq.join(', ')}, ___`,[s+3*by,s+3*by+1,s+2*by+1,s+4*by],s+3*by,`Add ${by} each time: ${s+2*by} + ${by} = ${s+3*by}.`,`Count on by ${by}.`);}
  if(t===1){const tens=rng(1,11),ones=rng(0,9);const n=tens*10+ones;if(n>120)return GEN.g1_ns1();
    return mcq('Tens and Ones','1.NS.1',`What number is ${tens} tens and ${ones} ones?`,[n,ones*10+tens,tens+ones,n+10],n,`${tens} tens = ${tens*10}. ${tens*10} + ${ones} = ${n}.`,'Each ten is 10.');}
  if(t===2){const p=rng(0,4),nk=rng(0,3),d=rng(1,4);const v=p+5*nk+10*d;
    return mcq('Coins','1.NS.1',`You have ${d} dime${d>1?'s':''}, ${nk} nickel${nk!==1?'s':''}, and ${p} penn${p!==1?'ies':'y'}. How many cents is that?`,[`${v}¢`,`${d+nk+p}¢`,`${v+5}¢`,`${v-1}¢`],`${v}¢`,`Dimes are 10¢, nickels are 5¢, pennies are 1¢. Count: ${v}¢.`,'Count the dimes first, then nickels, then pennies.');}
  const n=rng(20,110);return mcq('Counting','1.NS.1',`What number comes right after ${n}?`,[n+1,n-1,n+10,n+2],n+1,`Counting on by one: ${n}, ${n+1}.`,'Count up by one.');};
GEN.g1_ns2=()=>{const t=rng(0,2);
  if(t===0){const a=rng(10,120),b=rng(10,120);if(a===b)return GEN.g1_ns2();
    return mcq('Compare Numbers','1.NS.2',`Which symbol makes this true?  ${a} ___ ${b}`,['>','<','='],a>b?'>':'<',`${a} is ${a>b?'greater':'less'} than ${b}. Compare the tens first.`,'The open side of the symbol faces the bigger number.');}
  if(t===1){const n=rng(10,109);const which=pick(['one more','one less','ten more','ten less']);const v={'one more':n+1,'one less':n-1,'ten more':n+10,'ten less':n-10}[which];
    return mcq('One More, Ten More','1.NS.2',`What is ${which} than ${n}?`,[v,n+(which.includes('more')?-1:1)*(which.includes('ten')?10:1),n+(which.includes('ten')?1:10)*(which.includes('more')?1:-1),n],v,`${which[0].toUpperCase()+which.slice(1)} than ${n} is ${v}.`,which.includes('ten')?'Change the tens digit.':'Change the ones digit.');}
  const s=shuf([rng(10,40),rng(41,80),rng(81,120)]);const mx=Math.max(...s);
  return mcq('Greatest Number','1.NS.2',`Which number is the greatest? ${s.join(', ')}`,s.slice(),mx,`${mx} has the most tens.`,'Look at the tens first.');};
GEN.g1_ns3=()=>{const t=rng(0,2);
  if(t===0){const p=pick([2,4]);const name=p===2?'half':'fourth';
    return mcq('Equal Shares','1.NS.3',`A sandwich is cut into ${p} equal parts. What is each part called?`,['One '+name,p===2?'One fourth':'One half','One whole','One third'],'One '+name,`${p} equal parts are ${p===2?'halves':'fourths'}, so each part is one ${name}.`,'Count the equal parts.');}
  if(t===1)return mcq('Equal Shares','1.NS.3','How many fourths make one whole?',['4','2','1','3'],'4','Four fourths make one whole.','Fourths means 4 equal parts.');
  return mcq('Equal Shares','1.NS.3','Two friends share a pizza fairly. How much does each friend get?',['One half','One fourth','The whole pizza','None'],'One half','Sharing equally between 2 people makes halves.','Fair shares are equal.');};
GEN.g1_ce1=()=>{const t=rng(0,2);
  if(t===0){const a=rng(1,10),b=rng(0,10);const op=Math.random()<.5;if(!op&&b>a)return GEN.g1_ce1();
    const v=op?a+b:a-b;return mcq('Add and Subtract','1.CE.1',`${a} ${op?'+':'−'} ${b} = ?`,[v,v+1,Math.max(0,v-1),op?Math.abs(a-b):a+b],v,`${a} ${op?'+':'−'} ${b} = ${v}.`,op?'Count on from the bigger number.':'Count back.');}
  if(t===1){const a=rng(4,12),b=rng(2,8);const thing=pick(['apples','stickers','blocks','shells']);
    return mcq('Word Problems','1.CE.1',`Mia has ${a} ${thing}. She gets ${b} more. How many ${thing} does she have now?`,[a+b,a-b,a+b+1,b],a+b,`${a} + ${b} = ${a+b}.`,'Getting more means add.');}
  const w=rng(6,18),p=rng(1,w-1);return mcq('Part-Part-Whole','1.CE.1',`${p} + ___ = ${w}`,[w-p,w+p,w-p+1,p],w-p,`${w} − ${p} = ${w-p}, so ${p} + ${w-p} = ${w}.`,'What do you add to the part to make the whole?');};
GEN.g1_mg1=()=>{const a=rng(3,9),b=rng(2,9);if(a===b)return GEN.g1_mg1();const t=rng(0,1);
  if(t===0)return mcq('Compare Length','1.MG.1',`A pencil is ${a} paper clips long. A crayon is ${b} paper clips long. Which is longer?`,['The pencil','The crayon','They are the same'],a>b?'The pencil':'The crayon',`${Math.max(a,b)} paper clips is more than ${Math.min(a,b)}.`,'More paper clips means longer.');
  return mcq('Compare Length','1.MG.1',`A pencil is ${Math.max(a,b)} paper clips long. A crayon is ${Math.min(a,b)} paper clips long. How much longer is the pencil?`,[`${Math.abs(a-b)} paper clips`,`${a+b} paper clips`,`${Math.max(a,b)} paper clips`,`1 paper clip`],`${Math.abs(a-b)} paper clips`,`${Math.max(a,b)} − ${Math.min(a,b)} = ${Math.abs(a-b)}.`,'Subtract to compare.');};
GEN.g1_mg2=()=>{const shapes=[['triangle',3,3],['square',4,4],['rectangle',4,4],['circle',0,0]];const s=pick(shapes);const t=rng(0,2);
  if(t===0)return mcq('Shapes','1.MG.2',`How many sides does a ${s[0]} have?`,['0','3','4','5'],String(s[1]),`A ${s[0]} has ${s[1]} sides.`,'Trace the sides with your finger.');
  if(t===1)return mcq('Shapes','1.MG.2','Which shape has no corners (vertices)?',['Circle','Square','Triangle','Rectangle'],'Circle','A circle is round and has no corners.','Which one is round?');
  return mcq('Right Angles','1.MG.2','Which shape always has 4 square corners (right angles)?',['Rectangle','Triangle','Circle','Oval'],'Rectangle','Rectangles and squares have four right angles.','A right angle looks like the corner of a page.');};
GEN.g1_mg3=()=>{const t=rng(0,2);
  if(t===0){const h=rng(1,12),m=pick([0,30]);return mcq('Tell Time','1.MG.3','What time does the clock show?',[tm(h,m),tm(h,m?0:30),tm(h%12+1,m),tm(h,15)],tm(h,m),
    m?`The long hand points to 6, which means 30 minutes. The short hand is just past ${h}. It is ${tm(h,m)}.`:`The long hand points to 12, so it is ${h} o’clock: ${tm(h,0)}.`,'The short hand shows the hour. The long hand shows the minutes.',{dgSvg:dgClock(h,m)});}
  if(t===1){const d=rng(0,6);return mcq('Calendar','1.MG.3',`What day comes right after ${DAYS[d]}?`,[DAYS[(d+1)%7],DAYS[(d+6)%7],DAYS[(d+2)%7],DAYS[d]],DAYS[(d+1)%7],`The days in order: … ${DAYS[d]}, ${DAYS[(d+1)%7]} …`,'Say the days of the week in order.');}
  const n=rng(2,6);const kids=shuf(['Ana','Ben','Cal','Dee','Eli','Fay']);
  return mcq('Ordinal Numbers','1.MG.3',`Kids are in line: ${kids.join(', ')}. Who is ${ORD[n-1]}?`,[kids[n-1]].concat(kids.filter((k,i)=>i!==n-1).slice(0,3)),kids[n-1],`Count from the front: ${kids.slice(0,n).join(', ')}. ${kids[n-1]} is ${ORD[n-1]}.`,'Start counting at the front of the line.');};
GEN.g1_ps1=()=>{const labels=shuf(['Apple','Pear','Grape','Plum']).slice(0,3);const counts=labels.map(()=>rng(1,7));const svg=dgPicto(labels,counts,'#FF8A3D','Each ● = 1 vote');const t=rng(0,1);
  if(t===0){const i=rng(0,2);return mcq('Picture Graphs','1.PS.1',`How many children chose ${labels[i]}?`,[counts[i],counts[i]+1,Math.max(0,counts[i]-1),counts[(i+1)%3]],counts[i],`Count the dots next to ${labels[i]}: ${counts[i]}.`,'Count the dots in that row.',{dgSvg:svg});}
  const a=counts.indexOf(Math.max(...counts)),b=counts.indexOf(Math.min(...counts));if(a===b||counts[a]===counts[b])return GEN.g1_ps1();
  return mcq('Picture Graphs','1.PS.1',`How many more chose ${labels[a]} than ${labels[b]}?`,[counts[a]-counts[b],counts[a]+counts[b],counts[a],1+counts[a]-counts[b]],counts[a]-counts[b],`${counts[a]} − ${counts[b]} = ${counts[a]-counts[b]}.`,'Subtract the smaller row from the bigger row.',{dgSvg:svg});};
GEN.g1_pfa1=()=>{const t=rng(0,1);
  if(t===0){const sets=[[['red','blue'],'green'],[['circle','square','square'],'triangle'],[['clap','stomp'],'jump'],[['A','B','B'],'C']];const ps=pick(sets);const p=ps[0];const seq=[];for(let i=0;i<p.length*2+1;i++)seq.push(p[i%p.length]);
    const nx=p[seq.length%p.length];return mcq('Patterns','1.PFA.1',`What comes next? ${seq.join(', ')}, ___`,[...new Set(p)].concat([ps[1]]),nx,`The part that repeats is: ${p.join(', ')}. Next is ${nx}.`,'Find the part that repeats.');}
  const by=pick([1,2,5,10]);const s=rng(1,20);return mcq('Growing Patterns','1.PFA.1',`What comes next? ${s}, ${s+by}, ${s+2*by}, ___`,[s+3*by,s+3*by+1,s+2*by,s+4*by],s+3*by,`It grows by ${by} each time.`,'How much does it grow each time?');};

// ---------- GRADE 2 ----------
GEN.g2_ns1=()=>{const t=rng(0,2);
  if(t===0){const by=pick([2,5,10,25,100]);const s=by*rng(1,6);return mcq('Skip Counting','2.NS.1',`Count by ${by}s: ${s}, ${s+by}, ${s+2*by}, ___`,[s+3*by,s+3*by+1,s+2*by+by/2|0,s+4*by],s+3*by,`Add ${by} each time.`,`Count on by ${by}.`);}
  if(t===1){const s=rng(5,9)*10+rng(0,9)+100;return mcq('Count Back by 10','2.NS.1',`Count back by 10s: ${s}, ${s-10}, ${s-20}, ___`,[s-30,s-21,s-3,s-40],s-30,`Subtract 10 each time.`,'The tens digit goes down by one.');}
  const n=rng(1,50);return mcq('Even and Odd','2.NS.1',`Is ${n} even or odd?`,['Even','Odd'],n%2?'Odd':'Even',`Look at the ones digit: ${n%10}. ${n%2?'It is odd.':'It is even.'}`,'Even numbers end in 0, 2, 4, 6, or 8.');};
GEN.g2_ns2=()=>{const n=rng(100,999);const d=String(n).split('').map(Number);const t=rng(0,2);
  if(t===0){const i=rng(0,2);const vals=[d[0]*100,d[1]*10,d[2]];return mcq('Place Value','2.NS.2',`In ${n}, what is the value of the digit ${d[i]} in the ${['hundreds','tens','ones'][i]} place?`,[vals[i],d[i],d[i]*(i===0?10:100),d[i]*1000],vals[i],`The ${d[i]} is in the ${['hundreds','tens','ones'][i]} place, so it is worth ${vals[i]}.`,'Look at the place of the digit.');}
  if(t===1)return mcq('Expanded Form','2.NS.2',`What is ${d[0]*100} + ${d[1]*10} + ${d[2]}?`,[n,d[0]+d[1]+d[2],Number(`${d[2]}${d[1]}${d[0]}`),n+100],n,`${d[0]} hundreds, ${d[1]} tens, ${d[2]} ones is ${n}.`,'Put the hundreds, tens, and ones together.');
  const m=rng(100,999);if(m===n)return GEN.g2_ns2();return mcq('Compare','2.NS.2',`Which symbol makes this true?  ${n} ___ ${m}`,['>','<','='],n>m?'>':'<',`Compare hundreds first, then tens, then ones.`,'Start with the hundreds.');};
GEN.g2_ns3=()=>{const t=rng(0,2);const dens=[2,3,4,6,8];
  if(t===0){const d=pick(dens);const n=rng(1,d-1);return mcq('Fractions','2.NS.3',`A shape is cut into ${d} equal parts. ${n} part${n>1?'s are':' is'} shaded. What fraction is shaded?`,[`${n}/${d}`,`${d}/${n}`,`${n}/${d+1}`,`${d-n}/${d}`],`${n}/${d}`,`${n} shaded out of ${d} equal parts is ${n}/${d}.`,'Top number: shaded parts. Bottom number: all equal parts.');}
  if(t===1){const a=pick(dens),b=pick(dens.filter(x=>x!==a));return mcq('Compare Unit Fractions','2.NS.3',`Which is greater: 1/${a} or 1/${b}?`,[`1/${a}`,`1/${b}`,'They are equal'],a<b?`1/${a}`:`1/${b}`,`Fewer equal parts means bigger pieces. 1/${Math.min(a,b)} is greater.`,'Would you rather have 1 of 2 pieces or 1 of 8 pieces of the same pizza?');}
  return mcq('Fractions','2.NS.3','Which fraction names one whole?',['4/4','1/4','3/4','2/4'],'4/4','All 4 of 4 equal parts make one whole.','The top and bottom numbers are the same.');};
GEN.g2_ns4=()=>{const q=rng(0,4),d=rng(0,5),n=rng(0,3),p=rng(0,4);const v=25*q+10*d+5*n+p;if(v===0||v>200)return GEN.g2_ns4();
  const f=c=>c>=100?`$${(c/100).toFixed(2)}`:`${c}¢`;
  return mcq('Money','2.NS.4',`How much money? ${q} quarter${q!==1?'s':''}, ${d} dime${d!==1?'s':''}, ${n} nickel${n!==1?'s':''}, ${p} penn${p!==1?'ies':'y'}`,[f(v),f(v+5),f(q+d+n+p),f(v+10)],f(v),`Quarters 25¢, dimes 10¢, nickels 5¢, pennies 1¢. Total: ${f(v)}.`,'Start with the coins worth the most.');};
GEN.g2_ce1=()=>{const t=rng(0,2);
  if(t===0){const a=rng(15,80),b=rng(5,99-a);return mcq('Add Within 100','2.CE.1',`${a} + ${b} = ?`,[a+b,a+b+10,a+b-10,a+b+1],a+b,`Add the tens, then the ones: ${a+b}.`,'Add tens and ones. Regroup 10 ones as a ten.');}
  if(t===1){const a=rng(30,99),b=rng(5,a-5);return mcq('Subtract Within 100','2.CE.1',`${a} − ${b} = ?`,[a-b,a-b+10,a+b,a-b-1],a-b,`${a} − ${b} = ${a-b}.`,'You may need to regroup a ten as 10 ones.');}
  const a=rng(12,40),b=rng(5,30),c=rng(3,15);return mcq('Two-Step Problems','2.CE.1',`A class has ${a} crayons. They buy ${b} more, then give away ${c}. How many crayons now?`,[a+b-c,a+b+c,a-b-c,a+b],a+b-c,`${a} + ${b} = ${a+b}. ${a+b} − ${c} = ${a+b-c}.`,'Do one step at a time.');};
GEN.g2_mg1=()=>{const t=rng(0,2);
  if(t===0){const it=pick([['the length of a pencil','inches'],['how heavy a dog is','pounds'],['how much milk a mug holds','cups']]);
    return mcq('Choose the Unit','2.MG.1',`Which unit would you use to measure ${it[0]}?`,['inches','pounds','cups'],it[1],`Use ${it[1]} to measure ${it[1]==='inches'?'length':it[1]==='pounds'?'weight':'liquid volume'}.`,'Is it length, weight, or how much it holds?');}
  if(t===1){const a=rng(6,12),b=rng(1,a-2);return mcq('Measure Length','2.MG.1',`A ribbon is ${a} inches long. Sam cuts off ${b} inches. How long is it now?`,[`${a-b} inches`,`${a+b} inches`,`${b} inches`,`${a} inches`],`${a-b} inches`,`${a} − ${b} = ${a-b} inches.`,'Cutting off means subtract.');}
  return mcq('Estimate','2.MG.1','Which is the best estimate for the length of a crayon?',['4 inches','40 inches','4 feet','1 inch'],'4 inches','A crayon is about as long as your finger, about 4 inches.','Think about how big a crayon is.');};
GEN.g2_mg2=()=>{const t=rng(0,1);
  if(t===0){const h=rng(1,12),m=pick([5,10,15,20,25,35,40,45,50,55]);return mcq('Tell Time','2.MG.2','What time does the clock show?',[tm(h,m),tm(h,(m+30)%60),tm(h%12+1,m),tm(h,m/5|0)],tm(h,m),`Count by 5s on the long hand: ${m} minutes. The hour is ${h}. It is ${tm(h,m)}.`,'Count by 5s around the clock for the minutes.',{dgSvg:dgClock(h,m)});}
  const it=pick([['How long does it take to brush your teeth?','minutes'],['How long do you sleep at night?','hours'],['How long does summer vacation last?','weeks'],['How long does it take to blink?','seconds']]);
  return mcq('Units of Time','2.MG.2',`${it[0]} Choose the best unit.`,['seconds','minutes','hours','weeks'],it[1],`The best unit is ${it[1]}.`,'Think about how long it really takes.');};
GEN.g2_mg3=()=>{const t=rng(0,1);
  if(t===0)return mcq('Symmetry','2.MG.3','A shape is folded on a line of symmetry. What is true about the two halves?',['They match exactly','One half is bigger','They are different shapes','They do not touch'],'They match exactly','A line of symmetry makes two halves that are the same size and shape (congruent).','Fold a heart in half.');
  const s=pick([['A','yes'],['M','yes'],['T','yes'],['F','no'],['G','no'],['R','no']]);
  return mcq('Symmetry','2.MG.3',`Does the capital letter ${s[0]} have a line of symmetry?`,['Yes','No'],s[1]==='yes'?'Yes':'No',s[1]==='yes'?`${s[0]} can be folded down the middle so both sides match.`:`No fold makes the two sides of ${s[0]} match.`,'Imagine folding it in half.');};
GEN.g2_mg4=()=>{const solids=[['cube',6,12,8],['rectangular prism',6,12,8],['sphere',0,0,0]];const s=pick(solids);const t=rng(0,2);
  if(t===0&&s[1])return mcq('Solid Figures','2.MG.4',`How many faces does a ${s[0]} have?`,['6','4','8','12'],String(s[1]),`A ${s[0]} has ${s[1]} flat faces.`,'Count every flat side, including top and bottom.');
  if(t===1)return mcq('Solid Figures','2.MG.4','Which solid figure can roll?',['Sphere','Cube','Rectangular prism'],'Sphere','A sphere is round all over, so it rolls.','Which one is like a ball?');
  return mcq('Solid Figures','2.MG.4','How many vertices (corners) does a cube have?',['8','6','12','4'],'8','A cube has 8 vertices, 12 edges, and 6 faces.','Count 4 on top and 4 on the bottom.');};
GEN.g2_ps1=()=>{const labels=shuf(['Soccer','Art','Music','Swim']).slice(0,4);const counts=labels.map(()=>rng(2,10));const svg=dgBars(labels,counts,'#4C8DF6','Favorite club');const t=rng(0,1);
  if(t===0){const i=rng(0,3);return mcq('Bar Graphs','2.PS.1',`How many students chose ${labels[i]}?`,[counts[i],counts[i]+1,Math.max(0,counts[i]-1),counts[(i+1)%4]],counts[i],`The ${labels[i]} bar reaches ${counts[i]}.`,'Follow the top of the bar to the numbers.',{dgSvg:svg});}
  const tot=counts.reduce((a,b)=>a+b,0);return mcq('Bar Graphs','2.PS.1','How many students voted in all?',[tot,tot-1,tot+2,Math.max(...counts)],tot,`${counts.join(' + ')} = ${tot}.`,'Add all the bars.',{dgSvg:svg});};
GEN.g2_pfa1=()=>{const by=pick([2,5,10,3,4]);const s=rng(1,40);return mcq('Number Patterns','2.PFA.1',`What is the next number? ${s}, ${s+by}, ${s+2*by}, ${s+3*by}, ___`,[s+4*by,s+4*by+1,s+3*by+1,s+5*by],s+4*by,`The rule is “add ${by}.”`,'Find how much it grows each time.');};

// ---------- GRADE 3 ----------
GEN.g3_ns1=()=>{const t=rng(0,1);const n=rng(1000,999999);const s=String(n);const places=['ones','tens','hundreds','thousands','ten thousands','hundred thousands'];
  if(t===0){const i=rng(0,s.length-1);const dg=Number(s[s.length-1-i]);if(!dg)return GEN.g3_ns1();const v=dg*Math.pow(10,i);
    return mcq('Place Value','3.NS.1',`What is the value of the ${dg} in ${n.toLocaleString()}?`,[v.toLocaleString(),String(dg),(v*10).toLocaleString(),(v/10>=1?v/10:v*100).toLocaleString()],v.toLocaleString(),`The ${dg} is in the ${places[i]} place, so its value is ${v.toLocaleString()}.`,'Name the place, then find the value.');}
  const m=rng(1000,9999);const d=String(m).split('').map(Number);
  return mcq('Expanded Form','3.NS.1',`Which shows ${m.toLocaleString()} in expanded form?`,[`${d[0]*1000} + ${d[1]*100} + ${d[2]*10} + ${d[3]}`,`${d[0]} + ${d[1]} + ${d[2]} + ${d[3]}`,`${d[0]*100} + ${d[1]*10} + ${d[2]} + ${d[3]}`,`${d[0]*1000} + ${d[1]*10} + ${d[2]*100} + ${d[3]}`],`${d[0]*1000} + ${d[1]*100} + ${d[2]*10} + ${d[3]}`,'Expanded form shows the value of each digit.','Write each digit times its place.');};
GEN.g3_ns2=()=>{const t=rng(0,1);
  if(t===0){const a=rng(1000,9999),b=rng(1000,9999);if(a===b)return GEN.g3_ns2();return mcq('Compare Numbers','3.NS.2',`Which symbol makes this true?  ${a.toLocaleString()} ___ ${b.toLocaleString()}`,['>','<','='],a>b?'>':'<','Line up the digits and compare from the left.','Start with the thousands.');}
  const s=[rng(1000,3000),rng(3001,6000),rng(6001,9999)];const o=shuf(s.slice());return mcq('Order Numbers','3.NS.2',`Which list is in order from least to greatest?`,[s.map(x=>x.toLocaleString()).join(', '),s.slice().reverse().map(x=>x.toLocaleString()).join(', '),[s[1],s[0],s[2]].map(x=>x.toLocaleString()).join(', '),[s[0],s[2],s[1]].map(x=>x.toLocaleString()).join(', ')],s.map(x=>x.toLocaleString()).join(', '),'Compare the thousands first.','Find the smallest number first.');};
GEN.g3_ns3=()=>{const dens=[2,3,4,5,6,8,10];const t=rng(0,3);const d=pick(dens);
  if(t===0){const a=rng(1,d-1),b=rng(1,d-1);if(a===b)return GEN.g3_ns3();return mcq('Compare Fractions','3.NS.3',`Which is greater: ${a}/${d} or ${b}/${d}?`,[`${a}/${d}`,`${b}/${d}`,'They are equal'],a>b?`${a}/${d}`:`${b}/${d}`,'Same denominator: the bigger numerator is the bigger fraction.','The pieces are the same size. Who has more pieces?');}
  if(t===1){const w=rng(1,3),n=rng(1,d-1);const imp=w*d+n;return mcq('Mixed Numbers','3.NS.3',`Which improper fraction equals ${w} ${n}/${d}?`,[`${imp}/${d}`,`${w+n}/${d}`,`${w*n}/${d}`,`${imp}/${d+1}`],`${imp}/${d}`,`${w} whole${w>1?'s':''} = ${w*d}/${d}. Add ${n}/${d} to get ${imp}/${d}.`,'Change the whole number to parts first.');}
  if(t===2){const pairs=[['1/2','2/4'],['1/2','3/6'],['1/2','4/8'],['1/3','2/6'],['2/3','4/6'],['1/4','2/8'],['3/4','6/8'],['1/5','2/10']];const p=pick(pairs);
    return mcq('Equivalent Fractions','3.NS.3',`Which fraction is equal to ${p[0]}?`,[p[1],'1/3','3/4','2/3'].filter((v,i,a)=>a.indexOf(v)===i&&v!==p[0]).slice(0,4),p[1],`${p[0]} and ${p[1]} cover the same amount of a whole.`,'Draw both fractions with same-size wholes.');}
  const n=rng(1,9);return mcq('Compare Fractions','3.NS.3',`Which is greater: ${n}/4 or ${n}/8?`,[`${n}/4`,`${n}/8`,'They are equal'],`${n}/4`,'Same numerator: fourths are bigger pieces than eighths.','Bigger pieces win when the number of pieces is the same.');};
GEN.g3_ns4=()=>{const price=rng(50,450);const paid=Math.ceil((price+1)/100)*100;const ch=paid-price;const $=c=>`$${(c/100).toFixed(2)}`;
  return mcq('Making Change','3.NS.4',`A book costs ${$(price)}. You pay with ${$(paid)}. How much change do you get?`,[$(ch),$(ch+10),$(price),$(Math.abs(ch-5))],$(ch),`${$(paid)} − ${$(price)} = ${$(ch)}. You can count up from ${$(price)} to check.`,'Count up from the price to the amount paid.');};
GEN.g3_ce1=()=>{const t=rng(0,2);
  if(t===0){const a=rng(100,600),b=rng(100,999-a);return mcq('Add','3.CE.1',`${a} + ${b} = ?`,[a+b,a+b+100,a+b-10,a+b+1],a+b,`Line up the places and add: ${a+b}.`,'Add ones, then tens, then hundreds. Regroup when needed.');}
  if(t===1){const a=rng(300,999),b=rng(100,a-50);return mcq('Subtract','3.CE.1',`${a} − ${b} = ?`,[a-b,a-b+100,a-b-10,a+b],a-b,`${a} − ${b} = ${a-b}. Check: ${a-b} + ${b} = ${a}.`,'Regroup if the top digit is smaller.');}
  const a=rng(200,800),b=rng(100,900);return mcq('Estimate','3.CE.1',`About how much is ${a} + ${b}? Round each number to the nearest hundred.`,[Math.round(a/100)*100+Math.round(b/100)*100,a+b,Math.round(a/100)*100+Math.round(b/100)*100+100,Math.floor(a/100)*100+Math.floor(b/100)*100-100],Math.round(a/100)*100+Math.round(b/100)*100,`${a} → ${Math.round(a/100)*100}, ${b} → ${Math.round(b/100)*100}. The estimate is ${Math.round(a/100)*100+Math.round(b/100)*100}.`,'Round first, then add.');};
GEN.g3_ce2=()=>{const t=rng(0,2);const a=rng(2,10),b=rng(2,10);
  if(t===0)return mcq('Multiplication','3.CE.2',`${a} × ${b} = ?`,[a*b,a+b,a*b+a,a*(b-1)],a*b,`${a} groups of ${b} is ${a*b}.`,`Skip count by ${b}, ${a} times.`);
  if(t===1)return mcq('Division','3.CE.2',`${a*b} ÷ ${a} = ?`,[b,a,a*b-a,b+1],b,`${a} × ${b} = ${a*b}, so ${a*b} ÷ ${a} = ${b}.`,'Think of the multiplication fact.');
  const thing=pick(['muffins','cards','marbles']);return mcq('Equal Groups','3.CE.2',`There are ${a} bags with ${b} ${thing} in each bag. How many ${thing} in all?`,[a*b,a+b,a*b-b,b],a*b,`${a} × ${b} = ${a*b}.`,'Equal groups means multiply.');};
GEN.g3_mg1=()=>{const it=pick([['the length of a pencil','15 centimeters',['15 meters','15 kilometers','15 millimeters']],['the weight of an apple','150 grams',['150 kilograms','150 pounds','15 tons']],['the water in a bathtub','40 gallons',['40 cups','40 milliliters','4 teaspoons']],['the height of a door','2 meters',['2 centimeters','2 kilometers','20 meters']]]);
  return mcq('Estimate Measurements','3.MG.1',`What is the best estimate for ${it[0]}?`,[it[1]].concat(it[2]),it[1],`${it[1]} is a sensible size for ${it[0]}.`,'Picture each unit. Which makes sense?');};
GEN.g3_mg2=()=>{const l=rng(3,10),w=rng(2,8);const t=rng(0,1);
  if(t===0)return mcq('Area','3.MG.2',`A rectangle is ${l} units long and ${w} units wide. What is its area?`,[`${l*w} square units`,`${2*(l+w)} square units`,`${l+w} square units`,`${l*w+l} square units`],`${l*w} square units`,`Area counts square units: ${l} × ${w} = ${l*w}.`,'Area = how many squares cover it.');
  return mcq('Perimeter','3.MG.2',`A rectangle is ${l} feet long and ${w} feet wide. What is its perimeter?`,[`${2*(l+w)} feet`,`${l*w} feet`,`${l+w} feet`,`${2*l+w} feet`],`${2*(l+w)} feet`,`Add all four sides: ${l} + ${w} + ${l} + ${w} = ${2*(l+w)} feet.`,'Perimeter is the distance around.');};
GEN.g3_mg3=()=>{const t=rng(0,1);
  if(t===0){const h=rng(1,12),m=rng(1,59);return mcq('Tell Time','3.MG.3','What time does the clock show?',[tm(h,m),tm(h,(m+5)%60),tm(h%12+1,m),tm(h,(m+30)%60)],tm(h,m),`The hour hand is past ${h}. Count the minutes on the long hand: ${m}. It is ${tm(h,m)}.`,'Count by 5s, then by 1s.',{dgSvg:dgClock(h,m)});}
  const h=rng(1,8),m=pick([0,15,30,45]),d=rng(1,4);return mcq('Elapsed Time','3.MG.3',`A movie starts at ${tm(h,m)} and lasts ${d} hour${d>1?'s':''}. When does it end?`,[tm(h+d,m),tm(h+d+1,m),tm(h,m+d>59?m:m+d),tm(h+d,(m+30)%60)],tm(h+d,m),`Add ${d} hour${d>1?'s':''} to ${tm(h,m)}: ${tm(h+d,m)}.`,'Count forward one hour at a time.');};
GEN.g3_mg4=()=>{const p=pick([['triangle',3],['quadrilateral',4],['pentagon',5],['hexagon',6],['octagon',8]]);const t=rng(0,1);
  if(t===0)return mcq('Polygons','3.MG.4',`How many sides does a ${p[0]} have?`,['3','4','5','6','8'].slice(0,5),String(p[1]),`A ${p[0]} has ${p[1]} sides.`,'Tri = 3, quad = 4, penta = 5, hexa = 6, octa = 8.');
  return mcq('Polygons','3.MG.4','Which shape is NOT a polygon?',['Circle','Square','Triangle','Hexagon'],'Circle','A polygon is a closed shape with straight sides. A circle is curved.','Polygons have only straight sides.');};
GEN.g3_ps1=()=>{const labels=['Mon','Tue','Wed','Thu'];const counts=labels.map(()=>rng(2,12)*2);const svg=dgBars(labels,counts,'#2FB37A','Books read');const t=rng(0,1);
  if(t===0){const i=rng(0,3),j=(i+1+rng(0,2))%4;return mcq('Bar Graphs','3.PS.1',`How many more books were read on ${labels[i]} than on ${labels[j]}?`,[counts[i]-counts[j],counts[i]+counts[j],counts[i],counts[j]],counts[i]-counts[j],`${counts[i]} − ${counts[j]} = ${counts[i]-counts[j]}.`,'Read both bars, then subtract.',{dgSvg:svg});}
  const tot=counts.reduce((a,b)=>a+b,0);return mcq('Bar Graphs','3.PS.1','How many books were read in all four days?',[tot,tot-2,tot+2,Math.max(...counts)*4],tot,`${counts.join(' + ')} = ${tot}.`,'Add all four bars.',{dgSvg:svg});};
GEN.g3_pfa1=()=>{const by=pick([2,3,5,10,25,100]);const up=Math.random()<.5;const s=up?rng(1,50):by*rng(6,12);const sq=[s,s+(up?by:-by),s+(up?2:-2)*by,s+(up?3:-3)*by];const nx=s+(up?4:-4)*by;
  return mcq('Patterns','3.PFA.1',`What is the next number? ${sq.join(', ')}, ___`,[nx,nx+(up?by:-by),nx+1,sq[3]],nx,`The rule is “${up?'add':'subtract'} ${by}.”`,'Is it growing or shrinking? By how much?');};


