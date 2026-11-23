// ── GRADE 3: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana'];
const c=n=>n.toLocaleString('en-US');const $=x=>'$'+(x/100).toFixed(2);
// 3.NS.1 place value
addGens('g3_ns1',[
 ()=>{const n=rng(10000,999999);const s=String(n);const i=rng(0,s.length-1);const d=s[i];if(d==='0')return mq('g3_ns1',`Which digit is in the thousands place in ${c(n)}?`,s[s.length-4],['0','1','9'].filter(x=>x!==s[s.length-4]),`Count places from the right: ones, tens, hundreds, thousands.`,'Thousands is the 4th place from the right.');
  const names=['ones','tens','hundreds','thousands','ten thousands','hundred thousands'];const pl=names[s.length-1-i];return mq('g3_ns1',`In ${c(n)}, which place is the digit ${d} in? (the ${i+1}${['st','nd','rd'][i]||'th'} digit from the left)`,pl,names.filter(x=>x!==pl).slice(0,4),`Counting from the right, the ${i+1}${['st','nd','rd'][i]||'th'} digit from the left is in the ${pl} place.`,'Count the places from the right.');},
 ()=>{const n=rng(1000,9999);return mq('g3_ns1',`What is 100 more than ${c(n)}?`,c(n+100),[c(n+10),c(n+1000),c(n-100)],'Add 1 to the hundreds digit.','Only the hundreds change (unless you regroup).');},
]);
addGens('g3_ns1',[
 ()=>{const th=rng(10,99),h=rng(0,9),t=rng(0,9),o=rng(0,9);const n=th*1000+h*100+t*10+o;return mq('g3_ns1',`${th} thousands, ${h} hundreds, ${t} tens and ${o} ones is…`,c(n),[c(th*100+h*10+t+o),c(n+1000),c(th*1000+t*100+h*10+o)],`${c(th*1000)} + ${h*100} + ${t*10} + ${o} = ${c(n)}.`,'Write each part, then add.');},
 ()=>{const d=rng(2,9);return mq('g3_ns1',`In ${d},${d}00, the value of the first ${d} is how many times the value of the second ${d}?`,'10 times',[`${d} times`,'100 times','the same'],`${c(d*1000)} is 10 times ${d*100}.`,'Each place is 10 times the place to its right.');},
 ()=>{const n=rng(20000,99000);const r=Math.round(n/1000)*1000;return mq('g3_ns1',`Round ${c(n)} to the nearest thousand.`,c(r),[c(r+1000),c(r-1000),c(Math.round(n/100)*100)],`Look at the hundreds digit (${String(n).slice(-3,-2)}). ${c(n)} rounds to ${c(r)}.`,'5 or more rounds up.');},
],true);
// 3.NS.2 compare & order
addGens('g3_ns2',[
 ()=>{const a=rng(1000,9999),b=rng(1000,9999);const g=Math.max(a,b);return mq('g3_ns2',`Which number is greater: ${c(a)} or ${c(b)}?`,c(g),[c(Math.min(a,b)),'They are equal'].filter(x=>a!==b||x!=='They are equal'),'Compare the thousands, then hundreds, then tens.','Start with the biggest place.');},
]);
addGens('g3_ns2',[
 ()=>{const base=rng(3,8)*1000+rng(1,9)*100;const v=shuf([base+rng(10,99),base+rng(1,9),base-rng(50,99),base+rng(100,150)]);const sorted=v.slice().sort((x,y)=>y-x);return mq('g3_ns2',`Order from GREATEST to least: ${v.map(c).join(', ')}`,sorted.map(c).join(', '),[sorted.slice().reverse().map(c).join(', '),[sorted[1],sorted[0],sorted[2],sorted[3]].map(c).join(', '),[sorted[0],sorted[2],sorted[1],sorted[3]].map(c).join(', ')],'Compare place by place.','The thousands may match — then look at hundreds.');},
 ()=>{const a=rng(2,8)*1000+rng(0,9)*100+rng(0,9)*10;const lo=a,hi=a+100;const x=a+rng(1,99);return mq('g3_ns2',`Which number is between ${c(lo)} and ${c(hi)}?`,c(x),[c(lo-rng(1,50)),c(hi+rng(1,50)),c(lo+1000)],`${c(lo)} < ${c(x)} < ${c(hi)}.`,'It must be bigger than the first and smaller than the second.');},
 ()=>{const d=shuf([rng(1,2),rng(3,4),rng(5,6),rng(7,9)]);const small=Number(d.slice().sort((a,b)=>a-b).join(''));return mq('g3_ns2',`Use the digits ${d.join(', ')} once each. What is the SMALLEST 4-digit number you can make?`,c(small),[c(Number(d.slice().sort((a,b)=>b-a).join(''))),c(Number(d.join(''))),c(small+9)],'Put the smallest digit in the thousands place.','Smallest digit first.');},
],true);
// 3.NS.3 fractions
addGens('g3_ns3',[
 ()=>{const d=pick([3,4,6,8]),a=rng(1,d-1),b=rng(1,d-1);if(a===b)return mq('g3_ns3',`Which is equal to ${a}/${d}?`,`${a*2}/${d*2}`,[`${a}/${d*2}`,`${a+1}/${d+1}`,`${a*2}/${d}`],'Multiply top and bottom by the same number.','Double both.');
  const g=a>b?a:b;return mq('g3_ns3',`Which is greater: ${a}/${d} or ${b}/${d}?`,`${g}/${d}`,[`${a+b-g}/${d}`,'They are equal'],'Same size pieces: more pieces is greater.','Compare the top numbers.');},
]);
addGens('g3_ns3',[
 ()=>{const w=rng(1,3),d=pick([2,3,4,6,8]),n=rng(1,d-1);const imp=w*d+n;return mq('g3_ns3',`Write ${imp}/${d} as a mixed number.`,`${w} ${n}/${d}`,[`${w+1} ${n}/${d}`,`${n} ${w}/${d}`,`${w} ${d-n}/${d}`],`${imp} ÷ ${d} = ${w} R ${n}, so ${w} ${n}/${d}.`,'How many wholes fit?');},
 ()=>{const n=pick([1,2,3]);const p=pick([[2,4],[3,6],[4,8],[2,6],[2,8]]);return mq('g3_ns3',`Which symbol makes this true? ${n}/${p[0]} ___ ${n}/${p[1]}`,'>',['<','='],`Same top number: ${p[0]} equal pieces are bigger than ${p[1]} equal pieces, so ${n}/${p[0]} > ${n}/${p[1]}.`,'Same top number: fewer pieces means bigger pieces.');},
 ()=>{const d=pick([4,6,8]);const a=rng(1,d-2),b=rng(1,d-1-a);return mq('g3_ns3',`${pick(NAMES)} ate ${a}/${d} of a pizza and a friend ate ${b}/${d}. How much was eaten in all?`,`${a+b}/${d}`,[`${a+b}/${2*d}`,`${a*b}/${d}`,`${d-a-b}/${d}`],`${a}/${d} + ${b}/${d} = ${a+b}/${d}.`,'Add the tops; the bottom stays the same.');},
 ()=>{const d=pick([4,6,8]);return mq('g3_ns3',`Which fraction is closest to 1 whole?`,`${d-1}/${d}`,[`1/${d}`,`${d/2}/${d}`,`2/${d}`],`${d-1}/${d} is only 1/${d} away from a whole.`,'Which is almost all the pieces?');},
],true);
// 3.NS.4 money
addGens('g3_ns4',[
 ()=>{const a=rng(105,450);const d=rng(0,4),q=rng(0,3);const t=d*100+q*25+rng(1,4)*10;return mq('g3_ns4',`How much money? ${d} dollar bill${d!==1?'s':''}, ${q} quarter${q!==1?'s':''}, and ${(t-d*100-q*25)/10} dimes`,$(t),[$(t+25),$(t-10),$(t+100)].filter(x=>!x.includes('-')),'Count dollars, then quarters, then dimes.','Start with the biggest.');},
]);
addGens('g3_ns4',[
 ()=>{const a=rng(55,220),b=rng(40,180);const t=a+b;if(t>=500)return mq('g3_ns4','A snack costs $1.25. How much do 2 snacks cost?','$2.50',['$2.25','$1.50','$3.50'],'$1.25 + $1.25 = $2.50.','Add it twice.');return mq('g3_ns4',`A notebook costs ${$(a)} and a pen costs ${$(b)}. You pay with $5.00. How much change?`,$(500-t),[$(500-a),$(t),$(500-t+10)],`${$(a)} + ${$(b)} = ${$(t)}. $5.00 − ${$(t)} = ${$(500-t)}.`,'Add the prices first.');},
 ()=>{const p=pick([75,125,150,175,225]);const k=Math.floor(500/p);return mq('g3_ns4',`A toy costs ${$(p)}. What is the MOST toys you can buy with $5.00?`,k,[k+1,k-1,5],`${k} × ${$(p)} = ${$(k*p)}, and one more would cost ${$((k+1)*p)}.`,'Keep adding the price until you go over $5.00.');},
 ()=>{const t=rng(120,480);const d=Math.floor(t/100),q=Math.floor((t%100)/25);return mq('g3_ns4',`You need ${$(t)}. You have ${d} dollar bills and ${q} quarter${q===1?'':'s'}. How much MORE do you need?`,$(t-d*100-q*25),[$(t-d*100),$(25),$(t-q*25)].filter(x=>!x.includes('-')),`You have ${$(d*100+q*25)}. ${$(t)} − ${$(d*100+q*25)} = ${$(t-d*100-q*25)}.`,'Find what you have first.');},
],true);
// 3.CE.1 add & subtract
addGens('g3_ce1',[
 ()=>{const a=rng(200,700),b=rng(100,900-a),n=pick(NAMES);return mq('g3_ce1',`A school collected ${a} cans on Monday and ${b} cans on Tuesday. How many cans in all?`,a+b,[a+b+100,a+b-10,a+b+1],`${a} + ${b} = ${a+b}.`,'Line up the places.');},
]);
addGens('g3_ce1',[
 ()=>{const a=rng(600,999),b=rng(150,400),cc=rng(60,Math.min(a-b-50,999-(a-b)));return mq('g3_ce1',`A library had ${a} books. It gave away ${b} and then got ${cc} new ones. How many books now?`,a-b+cc,[a-b,a+b+cc,a-b-cc],`${a} − ${b} = ${a-b}. ${a-b} + ${cc} = ${a-b+cc}.`,'Two steps: subtract, then add.');},
 ()=>{const a=rng(301,900),b=rng(102,a-100);const r=a-b;return mq('g3_ce1',`${a} − ___ = ${r}`,b,[r,b+10,a+r],`${a} − ${r} = ${b}.`,'Subtract to find the missing number.');},
 ()=>{const a=rng(150,449),b=rng(150,449);const est=Math.round(a/100)*100+Math.round(b/100)*100;const ex=a+b;return mq('g3_ce1',`${pick(NAMES)} says ${a} + ${b} is about ${est}. The exact answer is ${ex}. Is the estimate reasonable?`,`Yes — ${ex} is close to ${est}.`,[`No — the answer should be about ${est+500}.`,`No — you cannot estimate sums.`,`Yes — they must be exactly equal.`],'Rounding each to the nearest hundred gives a close estimate.','Compare the estimate with the exact answer.');},
 ()=>{const a=rng(40,90)*10,b=a-rng(120,300);return mq('g3_ce1',`The red team scored ${a} points. The blue team scored ${b}. How many more points did red score?`,a-b,[a+b,a-b+100,a-b-10],`${a} − ${b} = ${a-b}.`,'"How many more" means subtract.');},
],true);
// 3.CE.2 multiply & divide
addGens('g3_ce2',[
 ()=>{const a=rng(2,10),b=rng(2,10);return mq('g3_ce2',`${a*b} ÷ ___ = ${b}`,a,[b,a+1,a*b-b],`${a} × ${b} = ${a*b}, so ${a*b} ÷ ${a} = ${b}.`,'Use a multiplication fact.');},
 ()=>{const r=rng(2,9),cc=rng(2,9);return mq('g3_ce2',`Chairs are in ${r} rows with ${cc} chairs in each row. How many chairs?`,r*cc,[r+cc,r*cc+r,r*(cc-1)],`${r} × ${cc} = ${r*cc}.`,'Rows × chairs in a row.');},
]);
addGens('g3_ce2',[
 ()=>{const b=rng(3,9),p=rng(3,9),eat=rng(2,b*p-5);return mq('g3_ce2',`There are ${b} boxes with ${p} crayons each. ${eat} crayons break. How many good crayons are left?`,b*p-eat,[b*p,b*p+eat,b+p-eat].filter(x=>x>0),`${b} × ${p} = ${b*p}. ${b*p} − ${eat} = ${b*p-eat}.`,'Multiply first, then subtract.');},
 ()=>{const g=rng(3,9),per=rng(2,8),n=pick(NAMES);return mq('g3_ce2',`${n} has ${g*per} stickers to share equally among ${g} friends. How many does each friend get?`,per,[g,per+1,g*per-g],`${g*per} ÷ ${g} = ${per}.`,'Share equally means divide.');},
 ()=>{const a=rng(3,9),b=rng(3,9);return mq('g3_ce2',`Which is the same as ${a} × ${b}?`,`${b} × ${a}`,[`${a} + ${b}`,`${a} × ${b+1}`,`${a*b} ÷ ${a+1}`],'You can multiply in any order.','Switch the factors.');},
 ()=>{const a=rng(2,5),b=rng(2,5),cc=rng(2,4);return mq('g3_ce2',`${a} × ${b} × ${cc} = ?`,a*b*cc,[a*b+cc,a+b+cc,a*b*cc+a],`${a} × ${b} = ${a*b}, × ${cc} = ${a*b*cc}.`,'Multiply two at a time.');},
 ()=>{const per=rng(4,8),t=per*rng(3,6)+rng(1,per-1);const full=Math.floor(t/per);return mq('g3_ce2',`${t} students ride in vans. Each van holds ${per}. How many vans are needed so everyone can ride?`,full+1,[full,full+2,per],`${t} ÷ ${per} = ${full} R ${t%per}. The extra ${t%per} need one more van: ${full+1}.`,'Leftover students still need a seat!');},
],true);
// 3.MG.1 measurement
addQ('g3_mg1',[
 QI('About how long is a paper clip?','3 centimeters',['3 meters','3 kilometers','3 millimeters'],'A paper clip is about 3 cm long.','Centimeters are small.'),
 QI('Which unit would you use to measure the distance between two cities?','miles',['inches','cups','ounces'],'Long distances are measured in miles.','It is very far.'),
 QI('How many inches are in 1 foot?','12',['10','100','3'],'1 foot = 12 inches.','A ruler is 1 foot.'),
 QI('Which holds about 1 liter?','a large water bottle',['a spoon','a swimming pool','a teacup that is tiny'],'A big water bottle holds about 1 liter.','A liter is a bit more than a quart.'),
 QH('How many feet are in 1 yard?','3',['12','10','36'],'1 yard = 3 feet = 36 inches.','A yardstick is 3 rulers.'),
 QH('A rope is 2 yards long. How many feet is that?','6 feet',['24 feet','2 feet','12 feet'],'1 yard = 3 feet, so 2 yards = 6 feet.','Multiply by 3.'),
 QH('How many centimeters are in 1 meter?','100',['10','1,000','12'],'1 meter = 100 centimeters.','Centi- means hundredth.'),
 QH('Which is heavier: 1 kilogram of feathers or 1 kilogram of rocks?','They weigh the same.',['the rocks','the feathers','you cannot tell'],'1 kilogram is 1 kilogram!','Read the amounts carefully.'),
 QH('A water jug holds 4 quarts. How many cups is that?','16 cups',['4 cups','8 cups','12 cups'],'1 quart = 4 cups, so 4 quarts = 16 cups.','Multiply by 4.'),
 QH('A bag of apples weighs 2 pounds. How many ounces is that?','32 ounces',['20 ounces','16 ounces','24 ounces'],'1 pound = 16 ounces, so 2 pounds = 32 ounces.','16 ounces in a pound.'),
]);
// 3.MG.2 area & perimeter
addGens('g3_mg2',[
 ()=>{const s=rng(2,10);return mq('g3_mg2',`A square has sides of ${s} cm. What is its perimeter?`,`${4*s} cm`,[`${s*s} cm`,`${2*s} cm`,`${s+4} cm`],`4 sides × ${s} = ${4*s} cm.`,'Perimeter is the distance around.');},
]);
addGens('g3_mg2',[
 ()=>{const w=rng(2,8),A=w*rng(3,10);const l=A/w;return mq('g3_mg2',`A rectangle has an area of ${A} square feet. It is ${w} feet wide. How long is it?`,`${l} feet`,[`${A-w} feet`,`${l+1} feet`,`${2*(l+w)} feet`],`Area = length × width. ${A} ÷ ${w} = ${l}.`,'Divide the area by the width.');},
 ()=>{const l=rng(4,12),w=rng(2,l-1);const P=2*(l+w);return mq('g3_mg2',`A garden has a perimeter of ${P} meters. It is ${l} meters long. How wide is it?`,`${w} meters`,[`${P-l} meters`,`${P/2} meters`,`${w+1} meters`],`Half the perimeter is ${l+w}. ${l+w} − ${l} = ${w}.`,'Length + width = half the perimeter.');},
 ()=>{const a=rng(3,6),b=rng(2,4),cc=rng(2,5),d=rng(2,4);return mq('g3_mg2',`An L-shaped floor is made of a ${a} × ${b} rectangle and a ${cc} × ${d} rectangle. What is the total area?`,`${a*b+cc*d} square units`,[`${a*b} square units`,`${(a+cc)*(b+d)} square units`,`${2*(a+b)+2*(cc+d)} square units`],`${a*b} + ${cc*d} = ${a*b+cc*d}.`,'Find each area, then add.');},
 ()=>{const s=rng(3,7);return mq('g3_mg2',`Two shapes: a ${s} × ${s} square and a ${s*2} × ${Math.max(1,Math.floor(s/2))} rectangle. Which has the larger AREA?`,s*s>(s*2)*Math.max(1,Math.floor(s/2))?'the square':s*s<(s*2)*Math.max(1,Math.floor(s/2))?'the rectangle':'They are equal',['the square','the rectangle','They are equal'],`Square: ${s*s}. Rectangle: ${s*2*Math.max(1,Math.floor(s/2))}.`,'Multiply length × width for each.');},
],true);
// 3.MG.3 time
addGens('g3_mg3',[
 ()=>{const h=rng(1,12),m=rng(1,59);if(m%5===0)return mq('g3_mg3','How many minutes are in 1 hour?',60,[100,30,24],'1 hour = 60 minutes.','Count the minute marks.');return mq('g3_mg3','What time does the clock show?',tm(h,m),[tm(h,(m+5)%60),tm(h%12+1,m),tm(h,(m+55)%60)],`The short hand is past ${h}. The long hand shows ${m} minutes.`,'Count by 5s, then by 1s.',{dgSvg:dgClock(h,m)});},
]);
addGens('g3_mg3',[
 ()=>{const h=rng(1,9),m=rng(5,50),dh=rng(1,2),dm=rng(10,45);const e=h*60+m+dh*60+dm;return mq('g3_mg3',`A trip starts at ${tm(h,m)} and lasts ${dh} hour${dh>1?'s':''} ${dm} minutes. When does it end?`,tm(Math.floor(e/60),e%60),[tm(Math.floor(e/60)+1,e%60),tm(h+dh,m),tm(Math.floor((e-10)/60),(e-10)%60)],`Add ${dh} hour${dh>1?'s':''}: ${tm(h+dh,m)}. Add ${dm} minutes: ${tm(Math.floor(e/60),e%60)}.`,'Add hours first, then minutes.');},
 ()=>{const h=rng(1,10),m=rng(0,40),d=rng(25,95);const s=h*60+m,e=s+d;return mq('g3_mg3',`Swim class runs from ${tm(h,m)} to ${tm(Math.floor(e/60),e%60)}. How long is it?`,`${d} minutes`,[`${d+10} minutes`,`${d-5} minutes`,`${d+60} minutes`],`Count from ${tm(h,m)} to ${tm(Math.floor(e/60),e%60)}: ${d} minutes.`,'Count on to the next hour, then add the rest.');},
 ()=>{const d=rng(2,5);return mq('g3_mg3',`How many minutes are in ${d} hours?`,d*60,[d*100,d*30,d*24],`${d} × 60 = ${d*60}.`,'1 hour = 60 minutes.');},
],true);
// 3.MG.4 polygons
addQ('g3_mg4',[
 QI('What do we call a polygon with 5 sides?','pentagon',['hexagon','octagon','quadrilateral'],'Penta means five.','A home plate in baseball.'),
 QI('Which polygon has 8 sides?','octagon',['hexagon','pentagon','decagon'],'Octo means eight, like an octopus.','A stop sign.'),
 QI('Which shape is a quadrilateral?','rectangle',['triangle','pentagon','circle'],'Quad means four: 4 sides.','4 sides.'),
 QH('Which is true about EVERY square?','It is also a rectangle and a rhombus.',['It has 5 sides.','It has no right angles.','Its sides are all different.'],'A square has 4 right angles (rectangle) and 4 equal sides (rhombus).','Think about its angles and sides.'),
 QH('A shape has 4 sides, but only one pair of parallel sides. What is it?','trapezoid',['square','rectangle','rhombus'],'A trapezoid has exactly one pair of parallel sides.','Only one pair.'),
 QH('How many sides do a hexagon and a triangle have together?','9',['8','10','11'],'6 + 3 = 9.','Hexagon has 6.'),
 QH('Which shape is NOT a polygon?','a shape with a curved side',['a triangle','a hexagon','a square'],'Polygons have only straight sides.','Polygons have straight sides.'),
 QH('Two angles of a triangle are right angles. Is that possible?','No — a triangle can have at most one right angle.',['Yes, always','Only in big triangles','Only in squares'],'Two right angles would make the sides never meet.','Try drawing it.'),
 QH('Which shape has the most vertices?','octagon',['hexagon','pentagon','square'],'An octagon has 8 vertices.','More sides = more vertices.'),
]);
// 3.PS.1 graphs
addGens('g3_ps1',[
 ()=>{const L=['Mon','Tue','Wed','Thu'],c=L.map(()=>rng(2,9)*2);const i=rng(0,3);return mq('g3_ps1',`How many books were read on ${L[i]}?`,c[i],[c[i]+2,c[i]-2,c[(i+1)%4]].filter(x=>x>0),`The ${L[i]} bar reaches ${c[i]}.`,'Read the scale carefully.',{dgSvg:dgBars(L,c,'#2D74DA','Books read')});},
]);
addGens('g3_ps1',[
 ()=>{const L=['Mon','Tue','Wed','Thu','Fri'],c=L.map(()=>rng(3,12));const tot=c.reduce((a,b)=>a+b,0),goal=tot+rng(3,12);return mq('g3_ps1',`The class goal was ${goal} books this week. How many more books do they need?`,goal-tot,[tot,goal,goal-tot+5],`Total read: ${tot}. ${goal} − ${tot} = ${goal-tot}.`,'Add all the bars, then subtract from the goal.',{dgSvg:dgBars(L,c,'#2FB37A','Books read')});},
 ()=>{const L=['Mon','Tue','Wed','Thu'],c=L.map(()=>rng(3,12));const j=rng(2,3);c[j]=rng(2,c[0]+c[1]-1);return mq('g3_ps1',`How many more books were read on Monday and Tuesday together than on ${L[j]}?`,c[0]+c[1]-c[j],[c[0]+c[1],c[0]+c[1]+c[j],Math.abs(c[0]-c[j])],`${c[0]} + ${c[1]} = ${c[0]+c[1]}. ${c[0]+c[1]} − ${c[j]} = ${c[0]+c[1]-c[j]}.`,'Two steps: add, then subtract.',{dgSvg:dgBars(L,c,'#9B5DE5','Books read')});},
 ()=>{const L=['Soccer','Swim','Dance','Art'],k=pick([2,5]);const c=L.map(()=>rng(1,6));const i=rng(0,3);return mq('g3_ps1',`Each ● stands for ${k} students. How many students chose ${L[i]}?`,c[i]*k,[c[i],c[i]*k+k,c[i]+k],`${c[i]} symbols × ${k} = ${c[i]*k}.`,'Multiply by the key.',{dgSvg:dgPicto(L,c,'#E36B4E',`Each ● = ${k} students`)});},
],true);
// 3.PFA.1 patterns
addGens('g3_pfa1',[
 ()=>{const s=rng(100,500),d=pick([25,50,100]);return mq('g3_pfa1',`What is the rule? ${s}, ${s+d}, ${s+2*d}, ${s+3*d}`,`add ${d}`,[`add ${d===100?50:100}`,`subtract ${d}`,`multiply by 2`],`Each number goes up by ${d}.`,'Subtract neighbors.');},
]);
addGens('g3_pfa1',[
 ()=>{const s=rng(1,5),m=pick([2,3]);const seq=[s,s*m,s*m*m,s*m*m*m];return mq('g3_pfa1',`What comes next? ${seq.join(', ')}, ___`,s*m**4,[seq[3]+seq[2],seq[3]+m,seq[3]*2+1],`Each number is multiplied by ${m}.`,'Is it adding the same amount? If not, try multiplying.');},
 ()=>{const s=rng(400,900),d=pick([15,25,45]);return mq('g3_pfa1',`The rule is “subtract ${d}.” Start at ${s}. What is the 4th number?`,s-3*d,[s-4*d,s-2*d,s-3*d+10],`${s} → ${s-d} → ${s-2*d} → ${s-3*d}.`,'The first number counts as number 1.');},
 ()=>{const a=rng(2,6),inp=[1,2,3,4].map(x=>x*a);const n=rng(6,9);return mq('g3_pfa1',`In → Out: 1 → ${inp[0]}, 2 → ${inp[1]}, 3 → ${inp[2]}, 4 → ${inp[3]}. What is the output for ${n}?`,n*a,[n+a,n*a+a,(n-1)*a],`The rule is multiply by ${a}: ${n} × ${a} = ${n*a}.`,'What do you do to the input?');},
],true);
// Grade 3 reading
addQ('r3_ffr',[
 QI('Which word has the suffix “-ly”?','quickly',['jelly','fly','lily'],'Quick + ly = quickly.','Find the base word + ly.'),
 QI('How many syllables are in “elephant”?','3',['2','4','1'],'el-e-phant has 3 syllables.','Clap it out.'),
 QI('Which word has the prefix “pre-”?','preheat',['press','pretty','prey'],'Pre + heat = preheat.','Find a base word after pre-.'),
 QH('Which word is divided into syllables correctly?','hel-i-cop-ter',['he-lic-op-ter','heli-copt-er','h-eli-copter'],'hel-i-cop-ter has 4 syllables.','Each syllable has one vowel sound.'),
 QH('What is the base word of “unhappiness”?','happy',['happiness','unhappy','hap'],'Un + happy + ness. The base is happy.','Take off the prefix and suffix.'),
 QH('Which word has a vowel team that makes the long e sound?','field',['fled','felt','fern'],'Ie in field says long e.','Look for two vowels together.'),
 QH('Which word has the same vowel sound as “boil”?','toy',['tool','toe','tall'],'Oi and oy make the same sound.','Oy, oi!'),
 QH('Add the suffix “-ing” to “run.” How is it spelled?','running',['runing','runeing','runnning'],'Double the final consonant: running.','Short vowel + one consonant: double it.'),
 QH('Which word has a silent letter?','knee',['need','tree','free'],'The k in knee is silent.','Say it — which letter do you not hear?'),
]);
addQ('r3_rv',[
 QI('Which word is a homophone for “knight”?','night',['knit','light','kite'],'Knight and night sound the same.','Same sound, different meaning.'),
 QI('What does “reheat” mean?','heat again',['not heat','heat before','heat a lot'],'Re- means again.','Re- = again.'),
 QI('Which word comes LAST in ABC order: snake, snail, snack?','snake',['snail','snack','they are equal'],'snac-, snai-, snak-: c, i, k — snake is last.','Look at the 4th letter.'),
 QH('“It’s raining cats and dogs.” What does this idiom mean?','It is raining very hard.',['Animals are falling from the sky.','It is a little sprinkle.','Pets are outside.'],'The idiom means heavy rain.','It is not about real animals.'),
 QH('“The brave firefighter rushed into the burning house.” What does brave mean?','not afraid of danger',['very tall','in a hurry','very tired'],'Rushing into a fire shows courage.','What kind of person runs into a fire?'),
 QH('Which pair are homophones?','pair, pear',['pair, pail','pear, peer','pore, pair'],'Pair and pear sound alike but mean different things.','Same sound, different spelling.'),
 QH('“Lucia was so hungry she could eat a horse.” This is an example of…','exaggeration (hyperbole)',['a fact','a question','a rhyme'],'She could not really eat a horse; it exaggerates.','Could she really do it?'),
 QH('What does “misunderstand” mean?','understand wrongly',['understand again','understand well','not care'],'Mis- means wrongly.','Mis- = wrong.'),
 QH('Which word best replaces “said” to show someone was upset? “Stop that!” she ___.','shouted',['whispered','giggled','mumbled happily'],'Shouted shows a strong feeling.','How would an upset person speak?'),
]);
const S3A='Jamal always picked the same seat on the bus, right by the window. One morning a new student, Eva, was sitting there. Jamal frowned and sat in the back. All day he felt grumpy. At lunch, he saw Eva eating alone. He remembered his first day at this school, when nobody talked to him. Jamal picked up his tray and sat across from her. “Want to trade cookies?” he asked. Eva smiled. The next morning, Jamal saved the window seat — for Eva.';
const S3B='The wind whispers through the trees,\nIt hums a song to all the leaves.\nThe moon peeks out, so round and bright,\nAnd tucks the world in for the night.';
addQ('r3_rl',[
 QP(S3A,'Why did Jamal feel grumpy at first?','Someone was in his favorite seat.',['He forgot his lunch.','He missed the bus.','He had a test.'],'Eva was sitting in his window seat.','What happened on the bus?'),
 QP(S3A,'What did Jamal remember at lunch?','his own first day, when nobody talked to him',['that he had homework','his favorite game','that he liked the back of the bus'],'He remembered feeling alone on his first day.','Look at the middle of the story.'),
 QP(S3A,'What is the theme of the story?','Kindness to others can turn a bad day around.',['Always sit by the window.','Cookies are the best snack.','Buses are crowded.'],'Jamal chose kindness and made a friend.','What did Jamal learn?',true),
 QP(S3A,'How does Jamal change from the beginning to the end?','from grumpy to kind and caring',['from kind to grumpy','from shy to loud','he does not change'],'He starts grumpy and ends by saving the seat for Eva.','Compare beginning and end.',true),
 QP(S3A,'Why did Jamal save the window seat for Eva?','to show he wanted to be her friend',['because he did not like the window','because the bus driver told him to','because Eva was mean'],'Saving the seat showed friendship.','What did he do at lunch?',true),
 QP(S3B,'What does the poet compare the wind to?','someone humming a song',['a growling dog','a car engine','a crying baby'],'The wind “hums a song.”','Read line 2.',true),
 QP(S3B,'Which words rhyme in the poem?','trees/leaves and bright/night',['wind/moon','song/leaves','peeks/round'],'Trees/leaves and bright/night end the lines with matching sounds.','Look at the ends of the lines.',true),
 QP(S3B,'What does “tucks the world in for the night” mean?','Night is gently arriving.',['The moon is making a bed.','It is morning.','The wind is cold.'],'It shows night coming, like being tucked into bed.','What happens at bedtime?',true),
]);
const N3A='Honeybees live in large groups called colonies. Each colony has one queen, many workers and some drones. The queen lays all the eggs — sometimes up to 2,000 in one day! Worker bees do many jobs. Young workers clean the hive and feed the babies. Older workers fly out to gather nectar and pollen. Without bees, many fruits and vegetables would not grow, because bees carry pollen from flower to flower.';
addQ('r3_ri',[
 QP(N3A,'What is a large group of honeybees called?','a colony',['a herd','a flock','a school'],'Honeybees live in colonies.','Read sentence 1.'),
 QP(N3A,'What job do YOUNG worker bees do?','clean the hive and feed the babies',['lay eggs','gather nectar far away','guard the queen only'],'Young workers clean and feed.','Find “young workers.”'),
 QP(N3A,'Which sentence tells why bees are important to people?','Without bees, many fruits and vegetables would not grow.',['Each colony has one queen.','Young workers clean the hive.','The queen lays all the eggs.'],'The last sentence explains bees’ importance to food.','Which sentence is about people’s food?',true),
 QP(N3A,'How is the information about worker bees organized?','by comparing jobs of young and older workers',['in time order from morning to night','as a problem and solution','as a story with characters'],'It compares what young and older workers do.','Look at “young” and “older.”',true),
 QP(N3A,'Why did the author include “sometimes up to 2,000 in one day!”?','to show how many eggs the queen can lay',['to tell how many colonies there are','to count the flowers','to show how far bees fly'],'The number shows how much the queen lays.','What is that number about?',true),
 QH('An article has the heading “How Bees Make Honey.” What will that section MOST likely explain?','the steps bees use to make honey',['how bears find honey','what flowers smell like','where to buy honey'],'Headings tell what the section is about.','Read the heading carefully.'),
 QH('Which is a FACT, not an opinion?','Bees have six legs.',['Bees are the coolest insects.','Honey is the best food.','Everyone should love bees.'],'A fact can be proven.','Can you check it?'),
]);
// Grade 3 science
addQ('sc3_2',[
 QI('What is friction?','a force that slows things when surfaces rub',['a kind of magnet','a type of weather','a push from wind only'],'Friction acts when surfaces rub together.','Rub your hands together.'),
 QI('Which surface has the MOST friction?','sandpaper',['ice','a smooth floor','glass'],'Rough surfaces have more friction.','Which is roughest?'),
 QI('A ball rolls down a ramp. What makes it roll down?','gravity',['friction','magnetism','light'],'Gravity pulls it down.','What pulls things down?'),
 QH('Two teams pull a rope with equal force. What happens to the rope?','It does not move — the forces are balanced.',['It moves toward the stronger team.','It breaks every time.','It floats up.'],'Equal opposite forces are balanced.','Equal pulls cancel out.'),
 QH('Why do people put sand on icy sidewalks?','to add friction so people do not slip',['to melt the ice instantly','to make it shiny','to make it colder'],'Sand adds friction.','Ice is slippery because it has little friction.'),
 QH('A soccer ball is still on the grass. What is needed to make it move?','an unbalanced force, like a kick',['nothing','balanced forces','more gravity only'],'Objects at rest need an unbalanced force to move.','Something must push it.'),
 QH('A heavy wagon and a light wagon get the same push. Which moves faster?','the light wagon',['the heavy wagon','they move the same','neither moves'],'The same force moves a lighter object more.','Which is easier to move?'),
]);
addQ('sc3_3',[
 QI('Which is a mixture?','trail mix',['pure water','a gold bar','a piece of salt'],'Trail mix is different things mixed together.','You can pick the parts out.'),
 QI('How can you separate sand from iron filings?','use a magnet',['add water and wait','shake it','bake it'],'A magnet pulls out the iron.','Iron is magnetic.'),
 QI('Which dissolves in water?','salt',['sand','rocks','plastic beads'],'Salt dissolves.','It seems to disappear.'),
 QH('How could you get salt back from salt water?','let the water evaporate',['use a magnet','freeze it and pick out salt','shake it hard'],'When water evaporates, salt is left behind.','Remove the water.'),
 QH('Which tool would best separate pebbles from sand?','a screen (sieve)',['a magnet','a thermometer','a ruler'],'A sieve lets small sand pass but not pebbles.','Different sizes.'),
 QH('Sugar dissolves faster when you…','stir and use warm water',['use ice water and wait','add sand','leave it still in cold water'],'Stirring and warmth speed up dissolving.','What do you do to hot cocoa?'),
 QH('Is a salad a mixture or a solution?','a mixture',['a solution','neither','a gas'],'You can see and separate the parts of a salad.','Can you pick out the parts?'),
]);
addQ('sc3_4',[
 QI('What is an adaptation?','a feature or behavior that helps a living thing survive',['a kind of food','a type of house','a weather tool'],'Adaptations help living things survive.','It helps them live.'),
 QI('How does a cactus’s spines help it?','They protect it from animals.',['They help it fly.','They catch rain like a bucket.','They make it grow faster.'],'Spines keep animals from eating it.','Ouch!'),
 QI('Why do some birds migrate?','to find food and warmer weather',['to visit friends','to get lost','to sleep'],'Migration helps them survive winter.','Food is hard to find in winter.'),
 QH('A walking stick insect looks like a twig. How does this help it?','It hides from predators (camouflage).',['It runs faster.','It finds water.','It stays warm.'],'Camouflage helps it blend in.','Can a bird see it?'),
 QH('Which is a BEHAVIORAL adaptation?','a bear hibernating in winter',['a duck’s webbed feet','a giraffe’s long neck','a polar bear’s white fur'],'Hibernating is something the bear does — a behavior.','Behavior = something an animal does.'),
 QH('Why do many desert animals come out at night?','It is cooler at night.',['There is more sun at night.','They are afraid of the moon.','Plants grow at night only.'],'Night is cooler in the desert.','Days are very hot.'),
 QH('Which body part helps a hawk catch prey?','sharp talons',['webbed feet','a long tail for swimming','thick fur'],'Sharp talons grab prey.','Think of claws.'),
]);
addQ('sc3_5',[
 QI('Which is a consumer?','a rabbit',['grass','a tree','the sun'],'Consumers eat other living things.','It eats.'),
 QI('What do decomposers do?','break down dead plants and animals',['make food from sunlight','hunt other animals','fly south'],'Decomposers recycle nutrients.','Mushrooms and worms.'),
 QI('Which animal is a predator?','a hawk',['a mouse','a leaf','a worm'],'A hawk hunts other animals.','It hunts.'),
 {t:'order',q:'Put this ocean food chain in order.',items:['sun','algae','small fish','shark'],e:'Energy goes from the sun to algae, to small fish, to sharks.',h:'Start with the sun.'},
 QH('If all the grass in a field died, what would happen to the rabbits?','They would have less food and might leave or die.',['They would get bigger.','Nothing would change.','They would eat rocks.'],'Rabbits depend on grass for food.','What do rabbits eat?'),
 QH('In a food web, what happens if the number of foxes goes down?','The number of rabbits may go up.',['The number of rabbits goes down.','The grass grows less.','The sun gets weaker.'],'Fewer predators means more prey survive.','Foxes eat rabbits.'),
 QH('Which is the role of a mushroom in a forest?','decomposer',['producer','predator','prey of the sun'],'Mushrooms break down dead material.','It grows on dead logs.'),
]);
addQ('sc3_6',[
 QI('What is soil made of?','bits of rock, humus, water and air',['only sand','only water','only plants'],'Soil is a mix of rock bits, humus, water and air.','It is a mixture.'),
 QI('Which soil has the largest grains?','sand',['clay','silt','humus'],'Sand grains are the biggest.','You can see the grains.'),
 QI('Where does humus come from?','decayed plants and animals',['melted rocks','rain clouds','plastic'],'Humus is made from rotting living things.','Leaves break down.'),
 QH('Why does water drain quickly through sand?','The large grains leave big spaces.',['Sand is magnetic.','Sand is sticky.','Sand freezes water.'],'Big gaps let water pass fast.','Picture marbles in a jar.'),
 QH('Which soil is best for growing most garden plants?','loam',['pure sand','pure clay','gravel'],'Loam is a mix of sand, silt, clay and humus.','A mix of everything.'),
 QH('Which soil layer is made mostly of solid rock?','bedrock',['topsoil','humus','subsoil'],'Bedrock is the bottom layer of solid rock.','The bottom.'),
 QH('How do plant roots help prevent soil erosion?','They hold the soil in place.',['They make soil wetter.','They push soil away.','They turn soil to rock.'],'Roots grip the soil.','Think of a hill with grass.'),
]);
addQ('sc3_7',[
 QI('What powers the water cycle?','the sun',['the moon','wind only','magnets'],'The sun heats water so it evaporates.','What gives heat?'),
 QI('Water that flows over the ground into rivers is called…','runoff',['evaporation','condensation','precipitation'],'Runoff flows across land.','It runs off.'),
 QI('Where is most of Earth’s water?','in the oceans',['in rivers','in clouds','in lakes'],'About 97% is in the oceans.','Salty water.'),
 QH('Why can’t people drink ocean water?','It is too salty.',['It is too cold.','It is too deep.','It is frozen.'],'Ocean water has too much salt.','Why is fresh water special?'),
 QH('Which step in the water cycle happens when clouds get heavy?','precipitation',['evaporation','condensation','collection only'],'Heavy clouds drop rain or snow.','Pre-cip-i-tation falls.'),
 QH('A glass of ice water gets wet on the outside. Which water cycle step is this like?','condensation',['evaporation','precipitation','runoff'],'Water vapor cools into droplets.','Gas to liquid.'),
 QH('Why is it important to keep rivers clean?','People, plants and animals need fresh water.',['Rivers are salty.','Rivers make clouds only.','Dirty water evaporates faster.'],'Fresh water is limited and needed by life.','Who uses river water?'),
]);
addQ('sc3_8',[
 QI('Which is a natural event that can change an ecosystem?','a drought',['building a playground','recycling','planting a garden'],'Droughts are natural.','No rain for a long time.'),
 QI('How can people harm an ecosystem?','polluting rivers',['planting trees','picking up trash','saving water'],'Pollution harms living things.','Which one hurts?'),
 QH('After a forest fire, which living things often grow back first?','grasses and small plants',['huge oak trees','whales','cactus only'],'Small plants grow quickly after fires.','Which grows fastest?'),
 QH('A new mall is built where a meadow used to be. What happens to the meadow animals?','They lose their habitat and must move.',['They are happier.','They turn into city animals right away.','Nothing changes.'],'Losing habitat forces animals to move.','Where will they live?'),
 QH('How can a long drought change a pond ecosystem?','The pond can shrink and fish may die.',['The pond gets deeper.','More fish appear.','Frogs grow bigger.'],'Less water means less habitat.','No rain for a long time.'),
 QH('Which action helps animals after their habitat is damaged?','creating protected parks',['cutting more trees','dumping trash','draining wetlands'],'Protected areas give animals safe homes.','Which one protects?'),
]);
// Grade 3 writing
addQ('w3_w',[
 QI('What is a supporting detail?','a sentence that tells more about the main idea',['the title','the last word','a question'],'Supporting details explain the main idea.','They support.'),
 QI('Which transition word shows the LAST step?','Finally',['First','Next','For example'],'Finally signals the end.','The end.'),
 QI('Which is the best topic sentence for a paragraph about why exercise is good?','Exercise helps keep our bodies and minds healthy.',['I ran yesterday.','My shoes are blue.','Some people like pizza.'],'A topic sentence states the main idea.','What is the paragraph mostly about?'),
 QH('Which detail does NOT support the topic “Owls are great hunters”?','Owls are sometimes on greeting cards.',['Owls can see well in the dark.','Owls fly silently.','Owls have sharp talons.'],'Greeting cards have nothing to do with hunting.','Which is off-topic?'),
 QH('Which sentence best combines “The dog was wet.” and “The dog was muddy.”?','The dog was wet and muddy.',['The dog was wet the dog was muddy.','Wet dog muddy dog.','The dog, wet, muddy, was.'],'Join the describing words with “and.”','Use “and.”'),
 QH('You are writing an opinion piece. Which is the strongest reason?','Reading every day builds your vocabulary.',['I like the color of my book.','Books are made of paper.','My friend has a book.'],'A strong reason explains a benefit.','Why should someone agree?'),
 QH('Which word best links these ideas? “I studied hard; ___, I did well on the test.”','as a result',['however','for example','in contrast'],'“As a result” shows cause and effect.','Studying caused doing well.'),
]);
addQ('w3_lu',[
 QI('Which is correct? “She ___ to the store yesterday.”','went',['go','goes','going'],'Yesterday = past tense: went.','Past tense of go.'),
 QI('Which word is a pronoun?','they',['table','quickly','green'],'They takes the place of a noun.','It replaces a name.'),
 QI('Which needs a comma? “Dear Grandma”','Dear Grandma,',['Dear, Grandma','Dear Grandma.','Dear Grandma!'],'Letter greetings end with a comma.','How do you start a letter?'),
 QH('Which sentence has correct subject–verb agreement?','The dogs bark at the cat.',['The dogs barks at the cat.','The dog bark at the cat.','The dogs is barking at the cat.'],'Plural dogs + bark.','More than one dog.'),
 QH('Which shows the plural possessive correctly?','the girls’ lockers',['the girl’s lockers (many girls)','the girls lockers','the girls’s lockers'],'Plural ending in s: add only an apostrophe.','Many girls own lockers.'),
 QH('Which sentence uses quotation marks correctly?','“Let’s go,” said Mom.',['"Let’s go, said Mom."','Let’s go, “said Mom.”','“Let’s go, said” Mom.'],'Quotation marks go around the exact words spoken.','Only the spoken words.'),
 QH('Which is the correct past tense of “bring”?','brought',['bringed','brang','broughten'],'Bring → brought.','It is irregular.'),
 QH('Which word is an adverb that tells HOW?','carefully',['careful','care','cared'],'Carefully tells how something is done.','Adverbs often end in -ly.'),
]);
// Grade 3 history & social science
addQ('h3_1',[
 QI('Which is a right of U.S. citizens?','freedom of religion',['the right to steal','the right to ignore laws','the right to vote at age 5'],'The First Amendment protects freedom of religion.','A freedom in the Bill of Rights.'),
 QI('Which is a responsibility of citizens?','obeying laws',['skipping jury duty','littering','ignoring neighbors'],'Citizens are expected to obey laws.','What must everyone do?'),
 QH('Why is it important for citizens to stay informed?','to make good choices when they vote',['to win games','to avoid school','to get presents'],'Informed citizens make better decisions.','Before voting…'),
 QH('Which person is showing good citizenship?','a student who volunteers at an animal shelter',['someone who litters','someone who cheats','someone who ignores rules'],'Volunteering helps the community.','Who helps others?'),
 QH('What does it mean to respect the rights of others?','let others have the same freedoms you have',['make others agree with you','take what you want','only care about yourself'],'Everyone deserves the same rights.','Treat others fairly.'),
 QH('Which document lists many rights of Americans, like freedom of speech?','the Bill of Rights',['the Declaration of Independence','a road map','the Mayflower Compact'],'The Bill of Rights lists freedoms.','The first ten amendments.'),
]);
addQ('h3_2',[
 QI('Which continent is the largest?','Asia',['Africa','Europe','Australia'],'Asia is the largest continent.','China and India are there.'),
 QI('Which ocean is between North America and Europe?','Atlantic Ocean',['Pacific Ocean','Indian Ocean','Arctic Ocean'],'The Atlantic separates them.','East of the U.S.'),
 QI('Which continent is also a country?','Australia',['Africa','Asia','Europe'],'Australia is both.','Kangaroos live there.'),
 QH('The equator divides Earth into which hemispheres?','Northern and Southern',['Eastern and Western','Upper and Lower','Land and Water'],'The equator splits north and south.','It runs east–west.'),
 QH('Which ocean is the smallest?','Arctic Ocean',['Indian Ocean','Atlantic Ocean','Pacific Ocean'],'The Arctic Ocean is the smallest.','Near the North Pole.'),
 QH('Which continent is south of Europe and has the Sahara Desert?','Africa',['Asia','South America','Australia'],'The Sahara is in northern Africa.','Huge desert.'),
 QH('The prime meridian divides Earth into which hemispheres?','Eastern and Western',['Northern and Southern','Arctic and Antarctic','Land and Sea'],'The prime meridian runs north–south.','It runs through England.'),
]);
addQ('h3_3',[
 QI('Ancient China grew along which river?','Huang He (Yellow River)',['Nile','Tiber','Mississippi'],'The Huang He is the Yellow River.','It is named for a color.'),
 QI('Why did early civilizations grow near rivers?','water for farming, drinking and travel',['to avoid water','to find snow','rivers kept out sunlight'],'Rivers made farming and travel possible.','What do farms need?'),
 QH('How did the mountains and sea affect ancient Greece?','Greeks became sailors and traders, and city-states stayed separate.',['Greeks never left home.','Greece had no coast.','Greece was flat desert.'],'Mountains separated city-states; the sea encouraged trade.','Mountains and coastlines.'),
 QH('Why was the Nile’s yearly flood important to Egypt?','It left rich soil for farming.',['It destroyed all farms.','It froze the land.','It made the desert bigger.'],'Floods left fertile silt.','What did the water leave behind?'),
 QH('Which landform made it hard to travel between Greek city-states by land?','mountains',['plains','deserts','glaciers'],'Greece is very mountainous.','Hard to cross.'),
 QH('Rome was built on hills near which sea?','Mediterranean Sea',['Red Sea','Caspian Sea','Arctic Sea'],'Rome is near the Mediterranean.','Between Europe and Africa.'),
]);
addQ('h3_4',[
 QI('What did ancient Egyptians build as tombs for pharaohs?','pyramids',['castles','skyscrapers','igloos'],'Pyramids were tombs.','Giant triangles.'),
 QI('Which river was the center of life in ancient Egypt?','the Nile',['the Amazon','the Thames','the James'],'Egypt grew along the Nile.','The longest river in Africa.'),
 QH('Why are hieroglyphics important to historians today?','They let us read Egyptians’ own records.',['They were used as money.','They were maps of the stars only.','They were toys.'],'Writing tells us about the past.','Writing = records.'),
 QH('What was a sphinx?','a statue with a lion’s body and a human head',['a type of boat','a river','a crown'],'The Great Sphinx guards the pyramids.','Part lion, part person.'),
 QH('Why did Egyptians farm along the Nile and not in the desert?','The Nile gave water and rich soil.',['The desert was too cold.','The desert had too much rain.','Farming was not allowed in Egypt.'],'Deserts are dry; the Nile gave water.','What do crops need?'),
]);
addQ('h3_5',[
 QI('What was the Silk Road?','trade routes connecting China to other lands',['a road made of silk','a river in Egypt','a type of boat'],'The Silk Road carried goods between China and the West.','Traders traveled it.'),
 QI('Why did China build the Great Wall?','to protect against invaders',['to keep out water','to grow rice','to mark a race track'],'It defended China’s northern border.','Walls protect.'),
 QH('Besides paper, which invention came from ancient China?','the compass',['the airplane','the telephone','the light bulb'],'China invented the compass.','It helps you find north.'),
 QH('How did the Silk Road help ideas spread?','Traders shared goods, beliefs and inventions as they traveled.',['It kept people apart.','Only animals used it.','It went underwater.'],'Trade moves ideas as well as goods.','Travelers meet new people.'),
 QH('Why was silk valuable?','It was soft, beautiful and only China knew how to make it.',['It was cheap and common.','It was used as food.','It grew on every tree.'],'China kept silk-making secret for a long time.','Rare things are valuable.'),
]);
addQ('h3_6',[
 QI('Which city-state was famous for democracy?','Athens',['Sparta','Rome','Cairo'],'Athens started democracy.','Named for Athena.'),
 QI('In honor of which god were the first Olympic Games held?','Zeus',['Thor','Ra','Jupiter only'],'The Games honored Zeus.','King of the Greek gods.'),
 QH('What does “democracy” mean?','rule by the people',['rule by one king','rule by the army','no rules'],'Demo = people, cracy = rule.','The people decide.'),
 QH('Which modern idea comes from ancient Greece?','citizens voting on laws',['printing money','using the compass','building pyramids'],'Our democracy borrows from Athens.','How do citizens decide?'),
 QH('Which city-state was known for its strong army?','Sparta',['Athens','Olympia','Corinth only for art'],'Sparta focused on military training.','Warrior city.'),
]);
addQ('h3_7',[
 QI('What were aqueducts used for?','carrying water to cities',['holding soldiers','making roads','storing food'],'Aqueducts carried water.','Aqua = water.'),
 QI('What was the Colosseum used for?','games and contests for crowds',['growing food','sailing ships','storing water'],'It was a huge arena.','Like a stadium.'),
 QH('In the Roman Republic, who chose leaders?','citizens voted for representatives',['one king chose everyone','priests chose them','nobody chose leaders'],'In a republic, citizens elect representatives.','Re-public = the public chooses.'),
 QH('How did Roman roads help the empire?','Armies and traders could move quickly.',['They kept people at home.','They were made of ice.','They were only for decoration.'],'Good roads connected the empire.','“All roads lead to Rome.”'),
 QH('Which part of the U.S. government is like the Roman Republic?','We elect representatives to make laws.',['We have a king.','Only soldiers vote.','There are no laws.'],'Both use elected representatives.','Who makes laws?'),
]);
addQ('h3_8',[
 QI('Mali became rich from trading which two goods?','gold and salt',['oil and coal','silk and paper','corn and wheat'],'Gold and salt were key.','One shines, one flavors food.'),
 QI('On which continent was the Empire of Mali?','Africa',['Asia','Europe','South America'],'Mali was in West Africa.','The Sahara is nearby.'),
 QH('Why was salt so valuable in West Africa?','People needed it to keep food from spoiling and for health in the heat.',['It was used for building.','It was rare everywhere in the world.','It was a toy.'],'Salt preserved food and was needed in hot climates.','Why do people need salt?'),
 QH('Why was Timbuktu important?','It was a center of trade and learning with libraries and schools.',['It was a farm.','It was an ice cave.','It was a pyramid.'],'Scholars and traders gathered there.','Books and trade.'),
 QH('How did traders cross the Sahara Desert?','in camel caravans',['by train','by airplane','by riverboat'],'Camels could travel far without water.','Desert animal.'),
]);
addQ('h3_9',[
 QI('What does the legislative branch do?','makes laws',['enforces laws','explains laws','writes stories'],'Congress makes laws.','Legislate = make laws.'),
 QI('Who is the head of the judicial branch?','the Supreme Court',['the President','Congress','the governor'],'The Supreme Court leads the judicial branch.','Judges.'),
 QH('Why does the U.S. have three branches of government?','so no one branch gets too much power',['to make more holidays','to have three presidents','because three is a lucky number'],'Checks and balances limit power.','Sharing power.'),
 QH('The President can say “no” to a law Congress passed. What is this called?','a veto',['a vote','a trial','an election'],'A veto is a check on Congress.','Saying no.'),
 QH('Which branch decides if a law follows the Constitution?','judicial',['legislative','executive','military'],'Courts interpret laws.','Judges decide.'),
]);
addQ('h3_10',[
 QI('What is a producer?','someone who makes goods or provides services',['someone who only buys','a kind of tree','a bank account'],'Producers make or provide things.','They produce.'),
 QI('Which is a human resource?','a teacher',['a tree','a tractor','a river'],'Human resources are people working.','A person.'),
 QH('When countries trade, what usually happens?','Each gets goods it cannot easily make itself.',['Both lose everything.','Trade stops all work.','Only one country benefits.'],'Trade helps both sides get what they need.','Why trade?'),
 QH('A baker only bakes bread and buys her vegetables from a farmer. This is an example of…','specialization',['scarcity','barter only','saving'],'Specializing means focusing on one job.','She focuses on one thing.'),
 QH('You have $10 and choose a book over a movie ticket. What is the opportunity cost?','the movie ticket',['the book','$10','nothing'],'The opportunity cost is the next-best choice you gave up.','What did you give up?'),
 QH('Why are capital resources important to producers?','Tools and machines help them make more, faster.',['They are free food.','They replace all workers.','They are natural resources.'],'Capital resources increase production.','Think of a tractor.'),
]);
})();

