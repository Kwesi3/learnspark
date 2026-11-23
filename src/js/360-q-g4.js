// ── GRADE 4: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana','Kofi','Grace'];
const c=n=>n.toLocaleString('en-US');const f1=x=>(Math.round(x*100)/100).toString();
const gcd=(a,b)=>b?gcd(b,a%b):a;const fr=(n,d)=>{const g=gcd(n,d);return d/g===1?String(n/g):`${n/g}/${d/g}`;};
// 4.1 place value
addGens('g4_place',[
 ()=>{const n=rng(1000000,9999999);const s=String(n);return mq('g4_place',`In ${c(n)}, which digit is in the millions place?`,s[0],[s[1],s[2],s[3]].filter(x=>x!==s[0]).concat(['0']),'The millions place is the 7th place from the right.','Count places from the right.');},
]);
addGens('g4_place',[
 ()=>{const n=rng(1000000,9999999);const r=Math.round(n/100000)*100000;return mq('g4_place',`Round ${c(n)} to the nearest hundred thousand.`,c(r),[c(r+100000),c(r-100000),c(Math.round(n/10000)*10000)],`Look at the ten-thousands digit. ${c(n)} rounds to ${c(r)}.`,'Underline the place, look one place right.');},
 ()=>{const r=rng(3,9)*1000;return mq('g4_place',`A number rounds to ${c(r)} when rounded to the nearest thousand. Which could be the number?`,c(r-rng(1,499)),[c(r+rng(500,900)),c(r-rng(501,900)),c(r+1500)],`Numbers from ${c(r-500)} up to ${c(r+499)} round to ${c(r)}.`,'Which is within 500 of the thousand?');},
 ()=>{const d=rng(2,9);const a=d*10000,b=d*100;return mq('g4_place',`How many times greater is the value of the ${d} in ${c(a+rng(0,9)*1000+b)} (ten thousands place) than the ${d} in the hundreds place?`,'100 times',['10 times','1,000 times',`${d} times`],`${c(a)} ÷ ${b} = 100.`,'Each place to the left is 10 times bigger.');},
 ()=>{const p=rng(100,999),t=rng(100,999);return mq('g4_place',`What number is ${p} thousand, ${t}?`,c(p*1000+t),[c(p*100+t),c(p*10000+t),c(p*1000+t*10)],`${p} thousand = ${c(p*1000)}. Add ${t}: ${c(p*1000+t)}.`,'Put the thousands before the comma.');},
],true);
// 4.2 fractions
addGens('g4_frac',[
 ()=>{const p=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5]]),k=rng(2,4);return mq('g4_frac',`${p[0]}/${p[1]} = ?/${p[1]*k}`,p[0]*k,[p[0]+k,p[0]*k+1,p[1]*k-p[0]],`Multiply top and bottom by ${k}: ${p[0]*k}/${p[1]*k}.`,'What did the bottom get multiplied by?');},
]);
addGens('g4_frac',[
 ()=>{const ps=shuf([[1,2],[1,3],[3,4],[2,3],[5,6],[1,4]]).slice(0,3);const v=ps.map(p=>p[0]/p[1]);const order=ps.map((p,i)=>[v[i],`${p[0]}/${p[1]}`]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);return mq('g4_frac',`Order from LEAST to GREATEST: ${ps.map(p=>p[0]+'/'+p[1]).join(', ')}`,order.join(', '),[order.slice().reverse().join(', '),[order[1],order[0],order[2]].join(', '),[order[0],order[2],order[1]].join(', ')],'Compare to 1/2 or use a common denominator.','Think of benchmarks: 0, 1/2, 1.');},
 ()=>{const p=pick([[2,3,3,4],[3,5,1,2],[5,8,2,3],[3,4,5,6],[2,5,1,3],[4,6,3,4]]);const a=p[0]/p[1],b=p[2]/p[3];return mq('g4_frac',`Which symbol makes this true? ${p[0]}/${p[1]} ___ ${p[2]}/${p[3]}`,a>b?'>':a<b?'<':'=',['>','<','='].filter(x=>x!==(a>b?'>':a<b?'<':'=')),`${p[0]}/${p[1]} ≈ ${a.toFixed(2)} and ${p[2]}/${p[3]} ≈ ${b.toFixed(2)}. Use a common denominator: ${p[0]*p[3]}/${p[1]*p[3]} vs ${p[2]*p[1]}/${p[1]*p[3]}.`,'Find a common denominator.');},
 ()=>{const d=pick([6,8,10,12]),n=pick([2,3,4]);const g=gcd(n,d);return mq('g4_frac',`${pick(NAMES)} says ${n}/${d} is in simplest form. Is that right?`,g>1?`No — it simplifies to ${fr(n,d)}.`:'Yes — it is already in simplest form.',[g>1?'Yes — it is already in simplest form.':`No — it simplifies to ${n}/${d+2}.`,`No — it simplifies to ${n*2}/${d*2}.`],`The greatest common factor of ${n} and ${d} is ${g}.`,'Can both numbers be divided by the same number?');},
 ()=>{const w=rng(2,4),d=pick([3,4,5,6]),n=rng(1,d-1);return mq('g4_frac',`Which is greater: ${w} ${n}/${d} or ${w*d+n+1}/${d}?`,`${w*d+n+1}/${d}`,[`${w} ${n}/${d}`,'They are equal'],`${w} ${n}/${d} = ${w*d+n}/${d}, which is less than ${w*d+n+1}/${d}.`,'Change the mixed number to an improper fraction.');},
],true);
// 4.3 decimals
addGens('g4_dec',[
 ()=>{const n=rng(1,99);return mq('g4_dec',`Which decimal equals ${n}/100?`,(n/100).toFixed(2),[(n/10).toFixed(1),(n/1000).toFixed(3),String(n)],`${n} hundredths = ${(n/100).toFixed(2)}.`,'Hundredths have two digits after the point.');},
]);
addGens('g4_dec',[
 ()=>{const a=rng(1,9),b=rng(1,9);const x=a/10,y=(a*10-rng(1,9))/100;return mq('g4_dec',`Which is greater: ${x.toFixed(1)} or ${y.toFixed(2)}?`,x.toFixed(1),[y.toFixed(2),'They are equal'],`${x.toFixed(1)} = ${(x).toFixed(2)}, which is more than ${y.toFixed(2)}.`,'Add a zero so both have hundredths.');},
 ()=>{const n=rng(10,99)/10+rng(1,9)/100;const r=Math.round(n);return mq('g4_dec',`Round ${n.toFixed(2)} to the nearest whole number.`,String(r),[String(r+1),String(r-1),n.toFixed(1)],`Look at the tenths digit. ${n.toFixed(2)} rounds to ${r}.`,'5 or more in the tenths place rounds up.');},
 ()=>{const n=rng(3,9),d=rng(1,9);const v=n+d/10;return mq('g4_dec',`Which fraction equals ${v.toFixed(1)}?`,`${n} ${d}/10`,[`${n} ${d}/100`,`${d} ${n}/10`,`${n*10+d}/100`],`${v.toFixed(1)} = ${n} and ${d} tenths.`,'One digit after the point = tenths.');},
 ()=>{const a=rng(11,49)/100,b=rng(51,99)/100;return mq('g4_dec',`Which decimal is between ${a.toFixed(2)} and ${b.toFixed(2)}?`,'0.5',[(b+0.1).toFixed(2),(a-0.05).toFixed(2),'1.5'],`0.50 is greater than ${a.toFixed(2)} and less than ${b.toFixed(2)}.`,'Think of 0.5 as 0.50.');},
],true);
// 4.4 operations
addGens('g4_ops',[
 ()=>{const a=rng(12,49),b=rng(12,39);return mq('g4_ops',`${a} × ${b} = ?`,a*b,[a*b+10,a*b-b,a*(b-1)+a+10],`Break apart: ${a} × ${b} = ${a*b}.`,'Multiply by the tens, then the ones, and add.');},
]);
addGens('g4_ops',[
 ()=>{const rows=rng(12,25),per=rng(14,28),sold=rng(30,120);return mq('g4_ops',`A theater has ${rows} rows with ${per} seats each. ${sold} tickets are sold. How many seats are still empty?`,rows*per-sold,[rows*per,rows*per+sold,rows+per-sold].filter(x=>x>0),`${rows} × ${per} = ${rows*per}. ${rows*per} − ${sold} = ${rows*per-sold}.`,'Find all seats first.');},
 ()=>{const per=rng(6,9),n=rng(100,250);const full=Math.floor(n/per),r=n%per;return mq('g4_ops',`${n} eggs go into cartons of ${per}. How many cartons can be FILLED?`,full,[full+1,full-1,r],`${n} ÷ ${per} = ${full} R ${r}. Only ${full} cartons are full.`,'The remainder cannot fill a carton.');},
 ()=>{const a=rng(4,9),b=rng(105,450);return mq('g4_ops',`${a} × ${b} = ?`,a*b,[a*b+100,a*(b-1),a*b-a*10],`${a} × ${b} = ${a*b}.`,'Multiply each place, then add.');},
 ()=>{const cost=rng(12,35),k=rng(3,7),money=cost*k+rng(5,40);return mq('g4_ops',`${pick(NAMES)} buys ${k} games at $${cost} each and pays with $${money}. How much change?`,`$${money-cost*k}`,[`$${cost*k}`,`$${money-cost}`,`$${money-cost*k+cost}`],`${k} × $${cost} = $${cost*k}. $${money} − $${cost*k} = $${money-cost*k}.`,'Multiply, then subtract.');},
],true);
// 4.5 fraction & decimal operations
addGens('g4_fracops',[
 ()=>{const d=pick([5,6,8,10,12]),a=rng(1,d-2),b=rng(1,d-1-a);return mq('g4_fracops',`${a}/${d} + ${b}/${d} = ?`,fr(a+b,d),[`${a+b}/${2*d}`,fr(a*b,d),fr(a+b+1,d)],`Add the numerators: ${a+b}/${d}${gcd(a+b,d)>1?' = '+fr(a+b,d):''}.`,'Same denominator: add the tops.');},
]);
addGens('g4_fracops',[
 ()=>{const p=pick([[1,2,1,4],[1,3,1,6],[1,2,3,8],[2,3,1,6],[3,4,1,8],[1,5,3,10]]);const L=p[1]*p[3]/gcd(p[1],p[3]);const s=p[0]*L/p[1]+p[2]*L/p[3];return mq('g4_fracops',`${p[0]}/${p[1]} + ${p[2]}/${p[3]} = ?`,fr(s,L),[`${p[0]+p[2]}/${p[1]+p[3]}`,fr(s+1,L),`${p[0]+p[2]}/${L}`],`Use denominator ${L}: ${p[0]*L/p[1]}/${L} + ${p[2]*L/p[3]}/${L} = ${fr(s,L)}.`,'Make the denominators the same first.');},
 ()=>{const w=rng(2,5),d=pick([4,6,8]),n=rng(2,d-1),w2=rng(1,w-1),n2=rng(1,n-1);const W=w-w2,F=fr(n-n2,d);return mq('g4_fracops',`${w} ${n}/${d} − ${w2} ${n2}/${d} = ?`,`${W} ${F}`,[`${W+1} ${F}`,`${W} ${fr(n+n2,d+d)}`,`${w+w2} ${F}`],`Wholes: ${w} − ${w2} = ${W}. Fractions: ${n}/${d} − ${n2}/${d} = ${F}.`,'Subtract the whole numbers and the fractions.');},
 ()=>{const a=rng(105,899)/100,b=rng(105,899)/100;return mq('g4_fracops',`${a.toFixed(2)} + ${b.toFixed(2)} = ?`,(a+b).toFixed(2),[(a+b+0.1).toFixed(2),(a+b-1).toFixed(2),(a+b+0.01).toFixed(2)],'Line up the decimal points and add.','Line up the points.');},
 ()=>{const a=rng(500,999)/100,b=rng(105,a*100-50)/100;return mq('g4_fracops',`A ribbon is ${a.toFixed(2)} m long. ${b.toFixed(2)} m is cut off. How much is left?`,`${(a-b).toFixed(2)} m`,[`${(a+b).toFixed(2)} m`,`${(a-b+0.1).toFixed(2)} m`,`${(a-b-0.01).toFixed(2)} m`],`${a.toFixed(2)} − ${b.toFixed(2)} = ${(a-b).toFixed(2)}.`,'Line up the decimal points.');},
],true);
// 4.7 area & perimeter
addGens('g4_area',[
 ()=>{const l=rng(5,15),w=rng(3,l);return mq('g4_area',`A rug is ${l} ft by ${w} ft. What is its area?`,`${l*w} sq ft`,[`${2*(l+w)} sq ft`,`${l+w} sq ft`,`${l*w+l} sq ft`],`${l} × ${w} = ${l*w}.`,'Area = length × width.');},
]);
addGens('g4_area',[
 ()=>{const L=rng(8,14),W=rng(6,10),l=rng(2,L-4),w=rng(2,W-3);return mq('g4_area',`A ${L} m by ${W} m yard has a ${l} m by ${w} m pool in it. What is the area of the yard NOT covered by the pool?`,`${L*W-l*w} m²`,[`${L*W} m²`,`${L*W+l*w} m²`,`${2*(L+W)-2*(l+w)} m²`],`${L*W} − ${l*w} = ${L*W-l*w} m².`,'Big area minus small area.');},
 ()=>{const s=rng(4,12);return mq('g4_area',`A square has a perimeter of ${4*s} cm. What is its area?`,`${s*s} cm²`,[`${4*s} cm²`,`${2*s} cm²`,`${s*s+s} cm²`],`Each side is ${4*s} ÷ 4 = ${s}. Area = ${s} × ${s} = ${s*s}.`,'Find the side first.');},
 ()=>{const opts=[[6,4],[8,3],[12,2],[5,5]];const a=pick(opts);const P=2*(a[0]+a[1]);return mq('g4_area',`Fence for a garden is ${P} m long. Which shape uses all the fence AND gives the BIGGEST area?`,P===20?'5 m by 5 m':`${P/4} m by ${P/4} m`,[`${P/2-2} m by 2 m`,`${P/2-3} m by 3 m`,`${P/2-1} m by 1 m`],'For the same perimeter, the closer to a square, the bigger the area.','Try the areas.');},
 ()=>{const l=rng(6,12),w=rng(3,8),cost=rng(2,6);return mq('g4_area',`A wall is ${l} ft by ${w} ft. Paint covers 1 square foot for $${cost}. What does it cost to paint the wall?`,`$${l*w*cost}`,[`$${l*w}`,`$${2*(l+w)*cost}`,`$${l*w+cost}`],`Area ${l*w} sq ft × $${cost} = $${l*w*cost}.`,'Find the area, then multiply by the cost.');},
],true);
// 4.8 measurement
addGens('g4_measure',[
 ()=>{const k=rng(2,9);return mq('g4_measure',`Convert: ${k} meters = ? centimeters`,k*100,[k*10,k*1000,k+100],`1 m = 100 cm, so ${k} m = ${k*100} cm.`,'Multiply by 100.');},
]);
addGens('g4_measure',[
 ()=>{const ft=rng(3,8),inch=rng(1,11);return mq('g4_measure',`A board is ${ft} ft ${inch} in long. ${pick(NAMES)} cuts off 1 ft 6 in. How long is it now?`,(()=>{let t=ft*12+inch-18;return `${Math.floor(t/12)} ft ${t%12} in`;})(),[`${ft-1} ft ${inch} in`,`${ft-2} ft ${inch} in`,(()=>{let t=ft*12+inch-16;return `${Math.floor(t/12)} ft ${t%12} in`;})()],`Change to inches: ${ft*12+inch} − 18 = ${ft*12+inch-18} in.`,'1 ft = 12 in. Change everything to inches.');},
 ()=>{const g=rng(2,5);return mq('g4_measure',`How many cups are in ${g} gallons?`,g*16,[g*4,g*8,g*32],`1 gallon = 4 quarts = 16 cups. ${g} × 16 = ${g*16}.`,'1 gallon = 16 cups.');},
 ()=>{const kg=rng(2,9),g=rng(100,900);return mq('g4_measure',`Which is heavier: ${kg} kg or ${c(kg*1000-g)} g?`,`${kg} kg`,[`${c(kg*1000-g)} g`,'They are equal'],`${kg} kg = ${c(kg*1000)} g, which is more than ${c(kg*1000-g)} g.`,'1 kg = 1,000 g.');},
 ()=>{const lb=rng(2,5),oz=rng(1,15);return mq('g4_measure',`A package weighs ${lb} lb ${oz} oz. How many ounces is that?`,`${lb*16+oz} oz`,[`${lb*10+oz} oz`,`${lb*12+oz} oz`,`${lb+oz} oz`],`${lb} × 16 + ${oz} = ${lb*16+oz}.`,'1 lb = 16 oz.');},
],true);
// 4.9 elapsed time
addGens('g4_time',[
 ()=>{const h=rng(1,9),m=pick([0,10,20,40,50]),d=pick([35,45,55,75,95]);const e=h*60+m+d;return mq('g4_time',`Practice starts at ${tm(h,m)} and lasts ${d} minutes. When does it end?`,tm(Math.floor(e/60),e%60),[tm(Math.floor(e/60)+1,e%60),tm(h,(m+d)%60),tm(Math.floor((e-10)/60),(e-10)%60)],`${tm(h,m)} + ${d} min = ${tm(Math.floor(e/60),e%60)}.`,'Count on to the next hour.');},
]);
addGens('g4_time',[
 ()=>{const h=rng(8,10),m=pick([10,25,40]),eh=rng(1,4)+12,em=pick([5,20,35,50]);const d=(eh*60+em)-(h*60+m);return mq('g4_time',`A field trip leaves at ${h}:${String(m).padStart(2,'0')} a.m. and returns at ${eh-12}:${String(em).padStart(2,'0')} p.m. How long was the trip?`,`${Math.floor(d/60)} hours ${d%60} minutes`,[`${Math.floor(d/60)+1} hours ${d%60} minutes`,`${eh-12-h<0?h-(eh-12):eh-12-h+12} hours ${Math.abs(em-m)} minutes`,`${Math.floor(d/60)} hours ${(d%60+10)%60} minutes`],`From ${h}:${String(m).padStart(2,'0')} to noon is ${12*60-(h*60+m)} min; then to ${eh-12}:${String(em).padStart(2,'0')} p.m. is ${(eh-12)*60+em} min. Total ${d} min.`,'Count to noon first.');},
 ()=>{const a=rng(20,45),b=rng(20,45),cc=rng(15,40);const t=a+b+cc;return mq('g4_time',`${pick(NAMES)} read ${a} min, practiced piano ${b} min and walked the dog ${cc} min. How long in all?`,`${Math.floor(t/60)} hr ${t%60} min`,[`${Math.floor(t/60)} hr ${(t%60+20)%60} min`,`${Math.floor(t/60)+1} hr ${t%60} min`,`${Math.floor(t/60)} hr ${(t%60+15)%60} min`],`${a} + ${b} + ${cc} = ${t} min = ${Math.floor(t/60)} hr ${t%60} min.`,'Add, then change 60 minutes to 1 hour.');},
 ()=>{const eh=rng(4,8),em=pick([5,15,25]),d=rng(70,150);const s=eh*60+em-d;return mq('g4_time',`A movie ended at ${tm(eh,em)}. It was ${Math.floor(d/60)} hr ${d%60} min long. When did it start?`,tm(Math.floor(s/60),s%60),[tm(Math.floor(s/60)+1,s%60),tm(eh-Math.floor(d/60),em),tm(Math.floor((s+10)/60),(s+10)%60)],`Count back ${Math.floor(d/60)} hr, then ${d%60} min.`,'Work backward from the end time.');},
],true);
// 4.10 lines & angles
addGens('g4_angle',[
 ()=>{const a=rng(10,170);const t=a<90?'acute':a===90?'right':'obtuse';return mq('g4_angle',`An angle measures ${a}°. What type of angle is it?`,t,['acute','right','obtuse','straight'].filter(x=>x!==t),`Acute < 90°, right = 90°, obtuse between 90° and 180°.`,'Compare to 90°.');},
]);
addQ('g4_angle',[
 QI('Two lines cross and make four right angles. What are they called?','perpendicular lines',['parallel lines','rays','line segments only'],'Perpendicular lines meet at right angles.','Like a plus sign.'),
 QI('Lines that never cross and are always the same distance apart are…','parallel',['perpendicular','intersecting','curved'],'Parallel lines never meet.','Like train tracks.'),
 QH('How many right angles make a full turn (360°)?','4',['2','3','6'],'4 × 90° = 360°.','A full turn is 360°.'),
 QH('The hands of a clock show 3:00. What kind of angle do they make?','right angle',['acute angle','obtuse angle','straight angle'],'At 3:00, the hands make a 90° angle.','Picture the clock.'),
 QH('The hands of a clock show 6:00. What angle do they make?','a straight angle (180°)',['a right angle','an acute angle','no angle'],'At 6:00, the hands point opposite ways.','They make a straight line.'),
 QH('Which letter has a pair of parallel line segments?','H',['V','L','T'],'The two sides of H are parallel.','Which letter has two lines that never meet?'),
 QH('An angle is made of two rays that share an endpoint. What is the endpoint called?','the vertex',['the side','the arc','the degree'],'The shared endpoint is the vertex.','Vertex = corner.'),
 QH('Three angles make a straight line. Two are 40° and 75°. What is the third?','65°',['55°','75°','105°'],'180 − 40 − 75 = 65.','A straight line is 180°.'),
]);
// 4.12 triangles & quadrilaterals
addQ('g4_shape',[
 QI('Which triangle has one angle greater than 90°?','obtuse triangle',['acute triangle','right triangle','equilateral triangle'],'An obtuse triangle has one angle over 90°.','Obtuse = more than 90°.'),
 QI('A parallelogram has how many pairs of parallel sides?','2',['1','0','4'],'Both pairs of opposite sides are parallel.','Para-llel-ogram.'),
 QH('Which statement is ALWAYS true?','A square is a rectangle.',['A rectangle is a square.','A rhombus is a square.','A trapezoid is a parallelogram.'],'A square has all the properties of a rectangle (4 right angles).','Check the definitions.'),
 QH('A quadrilateral has 4 equal sides and 4 right angles. Which names fit? Pick the BEST name.','square',['rhombus only','trapezoid','kite'],'4 equal sides + 4 right angles = square.','Both clues.'),
 QH('Can a triangle be both right and isosceles?','Yes — like a triangle with angles 90°, 45°, 45°.',['No, never','Only if it is equilateral','Only if it has 4 sides'],'A 90-45-45 triangle has two equal sides.','Think of half a square.'),
 QH('All four angles of any quadrilateral add up to…','360°',['180°','90°','270°'],'Split it into two triangles: 2 × 180° = 360°.','Two triangles.'),
 QH('A rectangle has 3 angles of 90°. What is the fourth angle?','90°',['180°','45°','270°'],'360 − 270 = 90°.','All angles add to 360°.'),
 QH('Which shape has exactly one pair of parallel sides?','trapezoid',['rectangle','rhombus','square'],'A trapezoid has exactly one pair.','Only one pair.'),
]);
addGens('g4_shape',[
 ()=>{const a=rng(30,80),b=rng(20,170-a-10);return mq('g4_shape',`A triangle has angles of ${a}° and ${b}°. Is it acute, right or obtuse?`,(()=>{const x=180-a-b,m=Math.max(a,b,x);return m>90?'obtuse':m===90?'right':'acute';})(),['acute','right','obtuse'],`The third angle is ${180-a-b}°. The largest angle tells the type.`,'Find the third angle first.');},
],true);
// 4.13 probability
addGens('g4_prob',[
 ()=>{const r=rng(1,6),b=rng(1,6),g=rng(1,6);const t=r+b+g;const most=r>=b&&r>=g?'red':b>=g?'blue':'green';if([r,b,g].filter(x=>x===Math.max(r,b,g)).length>1)return mq('g4_prob','A coin is flipped. What is the probability of heads?','1/2',['1/4','1','0'],'There are 2 equally likely outcomes.','Heads or tails.');return mq('g4_prob',`A bag has ${r} red, ${b} blue and ${g} green cubes. Which color are you MOST likely to pull?`,most,['red','blue','green'].filter(x=>x!==most),'The color with the most cubes is most likely.','Find the biggest number.');},
]);
addGens('g4_prob',[
 ()=>{const sides=pick([6,8]);const k=rng(2,sides-2);return mq('g4_prob',`A spinner has ${sides} equal parts numbered 1 to ${sides}. What is the probability of spinning a number greater than ${k}?`,fr(sides-k,sides),[fr(k,sides),`${sides-k}/${k}`,fr(sides-k-1,sides)],`${sides-k} numbers are greater than ${k}, out of ${sides}.`,'Count the winning outcomes.');},
 ()=>{const r=rng(2,5),b=rng(2,5);const t=r+b;const k=t*rng(4,10);return mq('g4_prob',`A bag has ${r} red and ${b} blue marbles. You pick one and put it back ${k} times. About how many times would you expect red?`,(k*r/t),[k*b/t,k/2+1,r*k].filter(x=>x!==k*r/t),`P(red) = ${r}/${t}. ${r}/${t} × ${k} = ${k*r/t}.`,'Multiply the probability by the number of tries.');},
 ()=>{return mq('g4_prob','A number cube (1–6) is rolled. Which is MORE likely: rolling an even number or rolling a 6?','an even number',['a 6','they are equally likely'],'Even: 3 of 6 outcomes. Six: 1 of 6.','Count outcomes for each.');},
 ()=>{const r=rng(2,6),b=rng(2,6),g=rng(1,4);const t=r+b+g;return mq('g4_prob',`A bag has ${r} red, ${b} blue and ${g} green marbles. What is the probability of picking red OR blue?`,fr(r+b,t),[fr(r,t),fr(g,t),`${r+b}/${g}`],`${r} + ${b} = ${r+b} out of ${t}.`,'Add the winning outcomes.');},
],true);
// 4.14 data & graphs
addGens('g4_data',[
 ()=>{const v=[rng(5,20),rng(5,20),rng(5,20),rng(5,20),rng(5,20)];const mx=Math.max(...v),mn=Math.min(...v);return mq('g4_data',`Daily temperatures (°F above 50): ${v.join(', ')}. What is the RANGE (greatest − least)?`,mx-mn,[mx,mn,mx+mn],`${mx} − ${mn} = ${mx-mn}.`,'Range = biggest − smallest.');},
]);
addGens('g4_data',[
 ()=>{const L=['Jan','Feb','Mar','Apr','May'];const v=L.map(()=>rng(10,60));let mi=1;for(let i=1;i<5;i++)if(v[i]-v[i-1]>v[mi]-v[mi-1])mi=i;const ties=L.slice(1).filter((x,i)=>v[i+1]-v[i]===v[mi]-v[mi-1]).length;if(ties>1||v[mi]-v[mi-1]<=0)return mq('g4_data',`Rainfall (mm): ${L.map((l,i)=>l+'='+v[i]).join(', ')}. What is the total for Jan and Feb?`,v[0]+v[1],[v[0]+v[2],v[1]+v[2],v[0]*2],`${v[0]} + ${v[1]} = ${v[0]+v[1]}.`,'Add the two months.');return mq('g4_data',`Rainfall (mm): ${L.map((l,i)=>l+'='+v[i]).join(', ')}. Between which two months did rainfall INCREASE the most?`,`${L[mi-1]} to ${L[mi]}`,L.slice(1).map((l,i)=>`${L[i]} to ${l}`).filter(x=>x!==`${L[mi-1]} to ${L[mi]}`).slice(0,3),`The biggest jump is ${L[mi-1]} to ${L[mi]}: +${v[mi]-v[mi-1]}.`,'Find each change.');},
 ()=>{const k=pick([2,5,10]),s=[rng(2,6),rng(2,6),rng(2,6)];const L=['Soccer','Tennis','Swim'];const i=rng(0,2),j=(i+1)%3;return mq('g4_data',`In a pictograph, each ⚽ = ${k} students. ${L[i]} has ${s[i]} symbols and ${L[j]} has ${s[j]}. How many students chose those two sports together?`,(s[i]+s[j])*k,[s[i]+s[j],(s[i]+s[j])*k+k,s[i]*k],`(${s[i]} + ${s[j]}) × ${k} = ${(s[i]+s[j])*k}.`,'Count symbols, then multiply by the key.');},
 ()=>{const v=[rng(10,30),rng(10,30),rng(10,30),rng(10,30)];const t=v.reduce((a,b)=>a+b,0);return mq('g4_data',`A line plot shows ${v.length} weeks of pages read: ${v.join(', ')}. If the class wants 100 pages total, how many more pages are needed?`,100-t>0?100-t:0,[t,100+t,Math.abs(100-t)+10].filter(x=>x!==(100-t>0?100-t:0)),`Total ${t}. ${t>=100?'They already reached the goal.':`100 − ${t} = ${100-t}.`}`,'Add first.');},
],true);
// 4.15 patterns
addGens('g4_pattern',[
 ()=>{const s=rng(100,300),d=rng(11,35);return mq('g4_pattern',`What is the rule? ${s}, ${s-d}, ${s-2*d}, ${s-3*d}`,`subtract ${d}`,[`add ${d}`,`subtract ${d+1}`,`divide by 2`],`Each term is ${d} less.`,'Find the difference.');},
]);
addGens('g4_pattern',[
 ()=>{const a=rng(2,5),b=rng(1,9);const t=[1,2,3,4].map(x=>a*x+b);return mq('g4_pattern',`Input → Output: 1→${t[0]}, 2→${t[1]}, 3→${t[2]}, 4→${t[3]}. What is the output for 10?`,a*10+b,[t[3]+6*a+1,10*a,10+b],`The rule is multiply by ${a}, then add ${b}: ${a} × 10 + ${b} = ${a*10+b}.`,'Two steps: multiply, then add.');},
 ()=>{const s=rng(2,6);const seq=[s,s+1,s+3,s+6,s+10];return mq('g4_pattern',`What comes next? ${seq.join(', ')}, ___`,s+15,[s+14,s+16,s+20],'The differences grow by 1: +1, +2, +3, +4, +5.','Look at the jumps.');},
 ()=>{const s=rng(3,9),m=2,a=1;const seq=[s];for(let i=0;i<3;i++)seq.push(seq[i]*m+a);return mq('g4_pattern',`Rule: multiply by 2, then add 1. Start: ${s}. What is the 5th number?`,seq[3]*2+1,[seq[3]*2,seq[3]+2,seq[3]*2+2],`${seq.join(' → ')} → ${seq[3]*2+1}.`,'Apply the rule four times.');},
],true);
// 4.16 equations
addGens('g4_eq',[
 ()=>{const x=rng(5,40),a=rng(5,40);return mq('g4_eq',`Solve: ${a} + n = ${a+x}`,x,[a+x,a,x+1],`n = ${a+x} − ${a} = ${x}.`,'Subtract to undo addition.');},
]);
addGens('g4_eq',[
 ()=>{const x=rng(3,12),a=rng(2,9),b=rng(1,20);return mq('g4_eq',`Solve: ${a} × n + ${b} = ${a*x+b}`,x,[x+1,a*x,(a*x+b)/a>>0===x?x-1:(a*x+b)/a>>0],`Subtract ${b}: ${a} × n = ${a*x}. Divide by ${a}: n = ${x}.`,'Undo the adding first, then the multiplying.');},
 ()=>{const n1=pick(NAMES),p=rng(3,9),k=rng(3,8),t=p*k+rng(5,20);return mq('g4_eq',`${n1} had $${t}. ${n1} bought ${k} books for $${p} each. Which equation shows the money left (m)?`,`m = ${t} − ${k} × ${p}`,[`m = ${t} + ${k} × ${p}`,`m = ${t} − ${k} + ${p}`,`m = ${k} × ${p} − ${t}`],`Money spent is ${k} × ${p}. Subtract that from ${t}.`,'Start with what was there, then subtract.');},
 ()=>{const a=rng(2,9),b=rng(2,9),cc=rng(2,9);return mq('g4_eq',`Which is equal to ${a} × (${b} + ${cc})?`,`${a} × ${b} + ${a} × ${cc}`,[`${a} × ${b} + ${cc}`,`${a} + ${b} × ${cc}`,`(${a} × ${b}) × ${cc}`],`The distributive property: ${a} × ${b+cc} = ${a*b} + ${a*cc} = ${a*(b+cc)}.`,'Multiply each part inside the parentheses.');},
 ()=>{const x=rng(4,12),y=x*rng(2,5);return mq('g4_eq',`Find the value that makes both true: n × ${y/x} = ${y} and n + 5 = ${x+5}.`,x,[y,x+5,y/x],`n = ${y} ÷ ${y/x} = ${x}. Check: ${x} + 5 = ${x+5}.`,'Solve one, then check the other.');},
],true);
// Grade 4 reading: vocabulary in context
addQ('g4_vocab',[
 QI('“The desert was so arid that no plants could grow.” What does arid mean?','very dry',['very cold','very crowded','very green'],'No plants could grow because it was so dry.','What do plants need?'),
 QI('Which word is a synonym for “brave”?','courageous',['fearful','timid','nervous'],'Brave and courageous mean the same.','Same meaning.'),
 QI('Which word is an antonym for “ancient”?','modern',['old','historic','aged'],'Ancient means very old; modern means new.','Opposite of very old.'),
 QI('“Dad was famished after hiking all day, so he ate three sandwiches.” What does famished mean?','extremely hungry',['very tired','sick','angry'],'He ate three sandwiches.','Use the clue.'),
 QH('“The witness gave a vague answer, so the detective could not tell what she meant.” What does vague mean?','unclear',['loud','true','funny'],'The detective could not tell what she meant.','Why was the detective confused?'),
 QH('The root “port” means carry. What does “portable” mean?','able to be carried',['a place for ships','to carry away illegally','very heavy'],'Port (carry) + able = able to be carried.','Use the root.'),
 QH('“Though the puppy was usually docile, it barked wildly at the vacuum.” What does docile mean?','calm and gentle',['loud and wild','tiny','sleepy'],'“Though” signals a contrast with barking wildly.','“Though” means the opposite is coming.'),
 QH('Which word has a prefix that means “not”?','impossible',['important','improve','imagine'],'Im- in impossible means not possible.','Which means “not ___”?'),
 QH('“Her voice was as smooth as silk.” What does this simile tell you?','Her voice was soft and pleasant.',['She was wearing silk.','Her voice was rough.','She was very quiet.'],'Silk is smooth and soft.','How does silk feel?'),
 QH('The Greek root “graph” means write. Which word means “a person’s written name”?','autograph',['photograph','paragraph','graphic'],'Auto (self) + graph (write): your own written name.','Self + write.'),
 QH('“The scientist was meticulous, checking every number three times.” Meticulous means…','very careful about details',['careless','in a hurry','very tall'],'Checking three times shows great care.','What does checking three times show?'),
]);
const F4A='The night before the science fair, Rosa’s volcano model collapsed. The clay had not dried. She stared at the gray lump and felt her eyes sting. Her grandfather sat beside her. “When I was a boy, my first boat sank,” he said. “The second one floated.” Rosa wiped her face. She grabbed cardboard, tape and newspaper and began again. At midnight the new volcano stood tall, a little lopsided but strong. The next day, the judges did not give her first place. But when a classmate asked how she had fixed it so fast, Rosa grinned and started explaining.';
const F4B='Deshawn hated being the new kid. At his old school, everyone knew he was the best goalie. Here, nobody knew him at all. On the first day of recess, he stood by the fence and watched a soccer game. The ball rolled toward him. He could have kicked it back. Instead, he stopped it with his foot, flicked it up, and caught it. The game stopped. “Can you play goalie?” a girl yelled. Deshawn tried not to smile too much.';
addQ('g4_fiction',[
 QP(F4A,'Why did Rosa’s volcano collapse?','The clay had not dried.',['Her brother broke it.','It fell off the table.','The judges dropped it.'],'The story says the clay had not dried.','Read the second sentence.'),
 QP(F4A,'Why does Grandfather tell the story about his boats?','to encourage Rosa to try again',['to change the subject','to show he was a better builder','to make her go to bed'],'His first boat sank, but the second floated — so try again.','What did Rosa do after listening?',true),
 QP(F4A,'What is the theme of the passage?','Mistakes can lead to success if you keep trying.',['Science fairs are unfair.','Clay is better than cardboard.','Grandparents tell long stories.'],'Rosa rebuilt her volcano after a failure.','What lesson does Rosa learn?',true),
 QP(F4A,'What does “a little lopsided but strong” suggest about the new volcano?','It was not perfect, but it worked.',['It was the best at the fair.','It fell over again.','It was very small.'],'Lopsided means uneven, but it was strong.','What does lopsided mean?',true),
 QP(F4A,'How does Rosa feel at the END of the passage?','proud',['embarrassed','angry','bored'],'She grins and explains how she fixed it.','Look at her actions at the end.',true),
 QP(F4B,'What is Deshawn’s problem at the beginning?','He is new and nobody knows him.',['He lost his soccer ball.','He broke the fence.','He is late for class.'],'He hates being the new kid.','Read the first sentences.'),
 QP(F4B,'Why does Deshawn flick the ball up and catch it instead of kicking it back?','to show his skill',['because he cannot kick','to steal the ball','because the girl told him to'],'He wants the others to notice his talent.','What happens after he does it?',true),
 QP(F4B,'What can you infer from “Deshawn tried not to smile too much”?','He is very happy but wants to seem calm.',['He is sad.','He does not want to play.','He has a toothache.'],'He is excited to be asked to play.','Why would he hide a smile?',true),
 QP(F4B,'Which word best describes Deshawn by the end?','hopeful',['lonely','angry','scared'],'He has a chance to make friends and play.','How might things change for him?',true),
]);
const N4A='Earthworms may look simple, but they are important to farmers and gardeners. As earthworms tunnel through soil, they make spaces for air and water to reach plant roots. They also eat dead leaves and other plant material. Their waste, called castings, is full of nutrients that help plants grow. Scientists estimate that one acre of healthy farmland can hold more than a million earthworms. Using too many chemicals on the soil can harm earthworms, so some farmers use natural methods to protect them.';
const N4B='In 1903, Orville and Wilbur Wright flew the first powered airplane at Kitty Hawk, North Carolina. The flight lasted only 12 seconds. Before that day, the brothers had spent years testing gliders. They studied how birds turn their wings. After each crash, they changed their design. Their success came from patience, careful testing and learning from failure.';
addQ('g4_nonfic',[
 QP(N4A,'What are earthworm castings?','waste that is full of nutrients',['tunnels in the soil','dead leaves','baby earthworms'],'Castings are earthworm waste full of nutrients.','Find the word “castings.”'),
 QP(N4A,'What is the main idea of the passage?','Earthworms help soil and plants in important ways.',['Earthworms are simple animals.','Farmers use chemicals.','An acre is a large area.'],'Most sentences tell how earthworms help.','What is most of the text about?',true),
 QP(N4A,'Which text structure does the passage MOSTLY use?','cause and effect',['chronological order','compare and contrast','problem and solution only'],'It explains what earthworms do and the effects on soil.','Earthworms do something → result.',true),
 QP(N4A,'Why do some farmers use natural methods?','to protect the earthworms',['to grow bigger worms to sell','because chemicals are cheaper','to scare away birds'],'Chemicals can harm earthworms.','Read the last sentence.',true),
 QP(N4B,'How long did the first powered flight last?','12 seconds',['12 minutes','1 hour','1903 seconds'],'The flight lasted only 12 seconds.','Find the number.'),
 QP(N4B,'Which text structure does this passage use?','chronological order (sequence)',['compare and contrast','description of a place','opinion'],'It tells events in time order.','Look for dates and “before,” “after.”',true),
 QP(N4B,'What does the author believe led to the Wright brothers’ success?','patience, testing and learning from failure',['luck','money from the king','a very strong wind'],'The last sentence states it directly.','Read the final sentence.',true),
 QP(N4B,'Why did the brothers study birds?','to learn how wings help with turning',['because they wanted pet birds','to race them','to paint them'],'They studied how birds turn their wings.','Find “birds.”',true),
]);
// Grade 4 science
addQ('g4_force',[
 QI('Which is an example of kinetic energy?','a rolling ball',['a book sitting on a shelf','a stretched rubber band held still','a battery in a drawer'],'Kinetic energy is energy of motion.','Is it moving?'),
 QI('A roller coaster at the top of a hill has the most…','potential energy',['kinetic energy','sound energy','light energy'],'Height gives stored (potential) energy.','It is high up and not moving yet.'),
 QI('What does a simple machine help us do?','make work easier',['create energy from nothing','stop gravity','make objects lighter'],'Simple machines change the force needed.','Think of a ramp.'),
 QH('As a roller coaster goes DOWN a hill, what happens to its energy?','Potential energy changes into kinetic energy.',['Kinetic energy changes into potential energy.','All energy disappears.','It gains potential energy.'],'Height turns into speed.','It speeds up going down.'),
 QH('Why is it easier to push a box up a long ramp than to lift it straight up?','You use less force over a longer distance.',['The box gets lighter.','Gravity turns off.','The ramp pushes for you.'],'An inclined plane trades distance for force.','More distance, less force.'),
 QH('A soccer player kicks a ball. Which force slows it as it rolls on grass?','friction',['magnetism','buoyancy','electricity'],'Friction between the ball and grass slows it.','The grass rubs against it.'),
 QH('Which change would make a toy car roll FARTHER down a ramp?','make the ramp higher',['add sandpaper to the ramp','make the ramp lower','put the car on carpet'],'A higher ramp gives more potential energy.','More height = more energy.'),
 QH('A lever is used to lift a heavy rock. Where should the fulcrum go to make lifting easiest?','close to the rock',['far from the rock','under your hands','it does not matter'],'A fulcrum near the load gives you more lifting power.','Think of a seesaw with a heavy person.'),
]);
addQ('g4_elec',[
 QI('What is static electricity?','a buildup of electric charge on a surface',['electricity in wires','a kind of magnet','sunlight'],'Rubbing can build up static charge.','Rub a balloon on your hair.'),
 QI('Which energy change happens in a light bulb?','electrical energy to light and heat',['light to electrical','sound to light','heat to electrical'],'Bulbs turn electricity into light and heat.','What does a bulb give off?'),
 QH('Why are electrical wires covered in plastic?','Plastic is an insulator that keeps people safe.',['Plastic conducts better than copper.','To make wires heavier.','To make the wire glow.'],'Insulators block current from escaping.','Plastic does not conduct.'),
 QH('In a series circuit with 3 bulbs, you add a 4th bulb. What happens to the brightness?','The bulbs get dimmer.',['They get brighter.','Nothing changes.','Only the new bulb lights.'],'In series, more bulbs share the same energy.','They share one path.'),
 QH('Which item would complete a circuit if used to connect a gap?','a metal spoon',['a wooden stick','a rubber band','a plastic straw'],'Metal is a conductor.','Which conducts electricity?'),
 QH('Why are homes wired with parallel circuits?','If one light goes out, the others stay on.',['They use only one path.','They are cheaper because they use less wire.','So all lights turn off at once.'],'Parallel circuits have separate paths.','Separate paths.'),
 QH('An electromagnet is made by wrapping wire around a nail and connecting a battery. How can you make it STRONGER?','add more coils of wire',['use a plastic nail','remove the battery','use fewer coils'],'More coils make a stronger magnetic field.','More wire wraps.'),
]);
addQ('g4_plants',[
 QI('What gas do plants take in from the air to make food?','carbon dioxide',['oxygen','nitrogen only','helium'],'Plants use carbon dioxide in photosynthesis.','We breathe it out.'),
 QI('Which part of a flower makes pollen?','stamen',['pistil','root','stem'],'The stamen is the male part that makes pollen.','Pollen comes from the stamen.'),
 QI('How do some seeds travel to new places?','by wind, water or animals',['by walking','by flying planes','they never move'],'Seeds are dispersed in many ways.','Think of dandelions.'),
 QH('What is pollination?','moving pollen from the stamen to the pistil',['making food from sunlight','a seed sprouting','losing leaves in fall'],'Pollination lets flowers make seeds.','Pollen moves.'),
 QH('Why do many flowers have bright colors and sweet smells?','to attract pollinators like bees',['to scare animals away','to store water','to make oxygen'],'Pollinators visit colorful, sweet flowers.','Who visits flowers?'),
 QH('A plant is placed near a window. After a week it bends toward the glass. Why?','Plants grow toward light.',['Plants avoid light.','Gravity pulled it.','The glass is magnetic.'],'This is called phototropism.','What is coming through the window?'),
 QH('What do plants release during photosynthesis that animals need?','oxygen',['carbon dioxide','salt','nitrogen'],'Photosynthesis releases oxygen.','We breathe it in.'),
 QH('Which plant structure protects the seed and helps spread it?','the fruit',['the root','the leaf','the stem'],'Fruits hold seeds and help disperse them.','Apples have seeds inside.'),
]);
addQ('g4_eco',[
 QI('A group of the same species living in one area is a…','population',['community','ecosystem','habitat'],'A population is one species in an area.','All the deer in a forest.'),
 QI('All the different populations living together in an area make a…','community',['population','organism','cell'],'A community includes many species.','Many kinds together.'),
 QI('Which is a nonliving part of an ecosystem?','sunlight',['a tree','a fox','a mushroom'],'Sunlight is not alive.','Abiotic = not living.'),
 QH('In a food web, what would MOST likely happen if snakes disappeared?','Mice populations would grow.',['Mice would disappear.','Grass would grow more.','Hawks would have more food.'],'Snakes eat mice; fewer snakes means more mice.','Who eats mice?'),
 QH('What is a niche?','an organism’s role in its ecosystem',['a type of habitat','a population','a weather pattern'],'A niche is the job or role an organism has.','Role.'),
 QH('Two species compete for the same food. What is likely to happen?','One may move, change its diet or decline.',['Both always grow.','They become one species.','Nothing changes.'],'Competition affects survival.','Not enough food for both.'),
 QH('An owl and a hawk both eat mice. One hunts at night and one in the day. How does this help?','They share the food source without competing as much.',['They fight more.','The mice disappear.','The owl eats the hawk.'],'Different times reduce competition.','Different schedules.'),
 QH('Which is an example of an animal adapting by mimicry?','a harmless fly that looks like a bee',['a bear hibernating','a bird migrating','a dog barking'],'Mimicry means looking like something dangerous.','Looks like something else.'),
]);
addQ('g4_weather',[
 QI('What does a barometer measure?','air pressure',['temperature','wind speed','rainfall'],'A barometer measures air pressure.','Baro = pressure.'),
 QI('A cold front often brings…','storms and cooler temperatures',['a hot, calm day','no change','fog all week'],'Cold fronts often cause storms and cooling.','Cold air pushes in.'),
 QI('Which cloud type is thin, wispy and high?','cirrus',['cumulus','stratus','cumulonimbus'],'Cirrus clouds are high and wispy.','Feathery.'),
 QH('Falling air pressure usually means…','stormy weather may be coming',['clear skies','snow will melt','the sun is setting'],'Low pressure is often linked with storms.','Low = stormy.'),
 QH('What makes hail form?','Raindrops are carried up into freezing air again and again.',['Snowflakes melt.','The sun heats clouds.','Wind blows ice from mountains.'],'Updrafts let ice layers build up.','Up and down in a storm cloud.'),
 QH('Why does the Chesapeake Bay area often have milder winters than the mountains of Virginia?','Large bodies of water and lower elevation keep it warmer.',['It is closer to the North Pole.','It has more snow.','The mountains are warmer.'],'Water and low elevation moderate temperature.','Height and water both matter.'),
 QH('Which tool would a meteorologist use to measure how fast the wind blows?','anemometer',['barometer','rain gauge','thermometer'],'An anemometer measures wind speed.','It has spinning cups.'),
 QH('Weather is what happens day to day. Climate is…','the average weather over many years',['tomorrow’s weather','a single storm','the temperature right now'],'Climate is long-term patterns.','Long term.'),
]);
addQ('g4_space',[
 QI('Which planet is closest to the sun?','Mercury',['Venus','Earth','Mars'],'Mercury is the closest planet.','The fastest-moving planet.'),
 QI('Which planet is known as the Red Planet?','Mars',['Jupiter','Venus','Saturn'],'Mars looks red from iron in its soil.','Rusty color.'),
 QI('What is the largest planet?','Jupiter',['Saturn','Earth','Neptune'],'Jupiter is the largest.','Gas giant with a Great Red Spot.'),
 QH('How long does it take the moon to go through all its phases?','about one month',['one day','one year','one week'],'The lunar cycle is about 29.5 days.','“Moon-th.”'),
 QH('Which planets are the gas giants?','Jupiter, Saturn, Uranus and Neptune',['Mercury, Venus, Earth and Mars','Earth and Mars','only Saturn'],'The outer planets are gas giants.','The big outer planets.'),
 QH('Why is it summer in Virginia when the Northern Hemisphere tilts toward the sun?','Sunlight hits more directly and days are longer.',['Earth is closest to the sun.','The sun gets hotter.','The moon blocks cold air.'],'Tilt, not distance, causes seasons.','Think about tilt.'),
 QH('Earth rotates once every…','24 hours',['365 days','one month','one week'],'One rotation = one day.','Day and night.'),
 QH('Why does the moon look like it changes shape?','We see different amounts of its sunlit side as it orbits Earth.',['Earth’s shadow covers it every night.','The moon changes size.','Clouds block part of it.'],'Phases come from the moon’s position.','The sun always lights half.'),
]);
// Grade 4 writing
addQ('g4_edit',[
 QP('The students was excited for the field trip.','Which is the CORRECT version?','The students were excited for the field trip.',['The students was excited for the field trip.','The student were excited for the field trip.'],'Plural subject “students” needs “were.”','More than one student.'),
 QP('we visited richmond, virginia last summer.','Which is the CORRECT version?','We visited Richmond, Virginia, last summer.',['we visited Richmond, Virginia last summer.','We visited richmond, virginia last summer.'],'Capitalize the first word and place names; use commas around the state.','Names of places get capitals.'),
 QP('My brother and me built a tree house.','Which is the CORRECT version?','My brother and I built a tree house.',['Me and my brother built a tree house.','My brother and myself built a tree house.'],'Use “I” as a subject.','Take away “my brother.”',true),
 QP('Its going to rain so bring you’re umbrella.','Which is the CORRECT version?','It’s going to rain, so bring your umbrella.',['Its going to rain, so bring you’re umbrella.','It’s going to rain so bring you’re umbrella.'],'It’s = it is; your shows ownership; add a comma before “so.”','Expand the contractions to check.',true),
 QP('The dog wagged it’s tail happily.','Which is the CORRECT version?','The dog wagged its tail happily.',['The dog wagged it’s tail happily.','The dog wagged its’ tail happily.'],'“Its” shows ownership; “it’s” means it is.','Does it mean “it is”?',true),
 QP('We bought apples, bananas, and grapes at the store, then we went home.','Which revision fixes the run-on?','We bought apples, bananas, and grapes at the store. Then we went home.',['We bought apples bananas and grapes at the store then we went home.','We bought apples, bananas, and grapes at the store, then, we went home.'],'Two complete thoughts need a period (or a conjunction).','Find the two complete sentences.',true),
 QP('Mrs. Lee said, “please sit down.”','Which is the CORRECT version?','Mrs. Lee said, “Please sit down.”',['Mrs. Lee said, please sit down.','Mrs. Lee said “please sit down”.'],'Capitalize the first word of a quotation.','A quote starts like a sentence.',true),
]);
// Grade 4 Virginia Studies
addQ('vs1',[
 QI('Which state borders Virginia to the north?','Maryland',['North Carolina','Tennessee','South Carolina'],'Maryland is north of Virginia.','Across the Potomac.'),
 QI('Which body of water separates the Eastern Shore from the rest of Virginia?','the Chesapeake Bay',['the James River','Lake Anna','the Gulf of Mexico'],'The Chesapeake Bay separates them.','A large bay.'),
 QI('Which river forms Virginia’s border with Maryland?','the Potomac River',['the James River','the York River','the Rappahannock River'],'The Potomac separates Virginia and Maryland.','Washington, D.C. is on it.'),
 QH('Why were early cities like Richmond built along the Fall Line?','Ships could not travel past the waterfalls, so goods were unloaded there.',['The land was too flat elsewhere.','It was the coldest place.','There were no rivers anywhere else.'],'The Fall Line stopped ships.','Waterfalls block boats.'),
 QH('Which region has the oldest, most worn-down mountains in Virginia?','the Blue Ridge Mountains',['the Coastal Plain','the Piedmont','the Eastern Shore'],'The Blue Ridge is an old mountain range.','Old mountains are rounded.'),
 QH('Which region has long ridges and valleys, including the Shenandoah Valley?','Valley and Ridge',['Appalachian Plateau','Piedmont','Coastal Plain'],'The Valley and Ridge region is west of the Blue Ridge.','Its name gives a clue.'),
 QH('Why is the Coastal Plain also called the Tidewater?','The ocean’s tides affect its rivers.',['It has no water.','It is in the mountains.','It floods every day.'],'Tides reach up the rivers.','Tide + water.'),
 QH('Which region is in the far southwest and has coal?','Appalachian Plateau',['Piedmont','Coastal Plain','Blue Ridge'],'Coal is mined in the Appalachian Plateau.','Southwest.'),
]);
addQ('vs2',[
 QI('What were the three main Indigenous language groups in Virginia?','Algonquian, Siouan and Iroquoian',['Spanish, French and English','Latin, Greek and Hebrew','Cherokee only'],'These were the three main groups.','Algonquian is one.'),
 QI('Who was the leader of the Powhatan paramount chiefdom when the English arrived?','Wahunsenaca (Chief Powhatan)',['Pocahontas','John Smith','Opechancanough only'],'Wahunsenaca led many tribes.','Also called Powhatan.'),
 QH('How did the geography of the Coastal Plain affect the Powhatan?','They used rivers and the bay for fishing and travel by canoe.',['They mined coal.','They herded buffalo.','They built stone castles.'],'Water shaped their life.','Rivers and bay.'),
 QH('Why are there still Virginia Indian tribes today?','Many tribes kept their culture and communities over time.',['All tribes disappeared.','They moved to Europe.','Only museums remain.'],'Virginia recognizes eleven tribes today.','They still live in Virginia.'),
 QH('What is a primary source about Indigenous life around 1600?','a tool or pot found by archaeologists',['a textbook written last year','a movie','a modern drawing'],'Artifacts from the time are primary sources.','Made at the time.'),
 QH('How did Indigenous peoples in Virginia use the environment?','They hunted, fished, farmed and gathered plants.',['They bought food at stores.','They only fished.','They did not farm.'],'They used many resources.','Many ways to get food.'),
]);
addQ('vs3',[
 QI('Which company paid for the Jamestown settlement?','the Virginia Company of London',['the East India Company','the Bank of England','the Spanish Navy'],'The Virginia Company funded Jamestown.','It is named after the colony.'),
 QI('Who was a leader at Jamestown who said “He that will not work shall not eat”?','John Smith',['John Rolfe','George Washington','Christopher Newport only'],'John Smith made the work rule.','Captain Smith.'),
 QI('Who introduced a sweeter type of tobacco to Jamestown?','John Rolfe',['John Smith','Pocahontas','Patrick Henry'],'John Rolfe brought a tobacco that sold well.','He married Pocahontas.'),
 QH('Why was the Jamestown site a poor choice in some ways?','The swampy land had bad water and mosquitoes.',['It was too far from water.','It was on a mountain.','It was too cold for crops.'],'Swamps caused disease.','Think of swamps.'),
 QH('What happened in 1619 that began representative government in the English colonies?','The General Assembly met at Jamestown.',['The Declaration of Independence was signed.','The capital moved to Richmond.','The Constitution was written.'],'The first General Assembly met in 1619.','Representatives met.'),
 QH('Why did women come to Jamestown in 1619?','to help build families and a permanent colony',['to fight in wars','to sail ships back','to mine gold'],'Families helped the colony last.','Permanent homes.'),
 QH('How did the arrival of Africans in 1619 change Virginia?','It began the history of African labor and later slavery in the colony.',['It ended tobacco farming.','It made Jamestown the capital of England.','It had no effect.'],'Africans were brought against their will.','Think about tobacco and labor.'),
]);
addQ('vs4',[
 QI('Why did the capital move from Jamestown to Williamsburg in 1699?','Jamestown had fires and unhealthy conditions.',['Williamsburg had gold.','The king lived there.','Jamestown was too far inland.'],'Williamsburg was healthier and safer.','Fire and disease.'),
 QI('What did colonial Virginians use instead of money in many trades?','tobacco',['gold coins only','paper cards','seashells only'],'Tobacco was used as money.','The cash crop.'),
 QH('Why did large plantations grow along rivers?','Rivers made it easy to ship crops to England.',['Rivers had gold.','Rivers kept crops cold.','Roads were better than rivers.'],'Ships traveled up rivers to plantations.','How did tobacco get to England?'),
 QH('Which group did much of the hard labor on large plantations by the 1700s?','enslaved Africans',['English lords','Spanish soldiers','French traders'],'Plantations relied on enslaved labor.','Forced labor.'),
 QH('How was life different for small farmers compared to plantation owners?','Small farmers did most work themselves and grew food for their families.',['They owned huge plantations.','They never farmed.','They lived in palaces.'],'Small farmers worked their own land.','Fewer workers.'),
 QH('How did geography affect where people settled in colonial Virginia?','Rich soil and rivers drew settlers; mountains slowed westward movement.',['Everyone lived in the mountains.','No one lived near rivers.','Deserts stopped settlement.'],'Land and water shaped settlement.','Rivers and soil.'),
]);
addQ('vs5',[
 QI('Which Virginian led the Continental Army?','George Washington',['Thomas Jefferson','Patrick Henry','James Madison'],'Washington was commander in chief.','Father of our Country.'),
 QI('Where did the last major battle of the Revolution take place?','Yorktown, Virginia',['Boston, Massachusetts','Jamestown, Virginia','Richmond, Virginia'],'The British surrendered at Yorktown in 1781.','In Virginia!'),
 QH('Which country helped the Americans win at Yorktown?','France',['Spain alone','Great Britain','Germany'],'French ships and soldiers helped trap the British.','Lafayette was from this country.'),
 QH('Why was James Armistead Lafayette important?','He spied on the British and gave valuable information.',['He wrote the Constitution.','He was the British general.','He led the navy.'],'His spying helped win at Yorktown.','A spy.'),
 QH('What did Patrick Henry’s speech help persuade Virginians to do?','prepare to fight for independence',['stay loyal to the king','move west','stop growing tobacco'],'“Give me liberty, or give me death!”','He wanted liberty.'),
 QH('Why did colonists protest the British taxes?','They had no representatives in Parliament.',['Taxes were too low.','They wanted to pay more.','They did not use the taxed goods.'],'No taxation without representation.','They had no say.'),
 QH('Which document listed reasons the colonies should be free?','the Declaration of Independence',['the Constitution','the Bill of Rights','the Virginia Company charter'],'It explained why they broke from Britain.','1776.'),
]);
addQ('vs6',[
 QI('Which Virginian is called the “Father of the Constitution”?','James Madison',['George Washington','Thomas Jefferson','George Mason'],'Madison planned the Constitution.','Fourth president.'),
 QI('Who wrote the Virginia Declaration of Rights?','George Mason',['James Madison','Patrick Henry','John Smith'],'George Mason wrote it in 1776.','Gunston Hall.'),
 QH('How did the Virginia Statute for Religious Freedom affect the First Amendment?','It inspired the idea that people may worship as they choose.',['It created a state church.','It ended voting.','It made the capital Richmond.'],'Jefferson’s statute influenced the Bill of Rights.','Freedom of religion.'),
 QH('Why did the U.S. replace the Articles of Confederation with the Constitution?','The national government was too weak.',['The Articles gave the king power.','The Articles were too strict.','The states wanted a monarchy.'],'The Constitution created a stronger government.','Too weak to work.'),
 QH('Which part of government did George Washington lead as the first president?','the executive branch',['the legislative branch','the judicial branch','the military only'],'The president leads the executive branch.','Carries out laws.'),
 QH('Why did the Bill of Rights get added to the Constitution?','to protect individual freedoms',['to make the president a king','to end the Revolution','to create new states'],'It lists citizens’ rights.','Rights!'),
]);
addQ('vs7',[
 QI('What year did the Civil War begin?','1861',['1776','1865','1619'],'The war began in 1861.','It ended in 1865.'),
 QI('Who led the Confederate Army of Northern Virginia?','Robert E. Lee',['Ulysses S. Grant','Abraham Lincoln','Thomas Jefferson'],'Robert E. Lee was a Virginian general.','He surrendered at Appomattox.'),
 QI('Who was President of the United States during the Civil War?','Abraham Lincoln',['George Washington','Jefferson Davis','Woodrow Wilson'],'Lincoln led the Union.','Honest Abe.'),
 QH('Why was Virginia so important during the Civil War?','Many battles were fought there and Richmond was the Confederate capital.',['It was far from the fighting.','It stayed neutral.','It was part of the Union the whole war.'],'Virginia was a major battleground.','Location and capital.'),
 QH('Thomas “Stonewall” Jackson got his nickname at which battle?','First Battle of Manassas (Bull Run)',['Yorktown','Appomattox','Gettysburg'],'He stood “like a stone wall” at Manassas.','The first big battle.'),
 QH('Why did western counties of Virginia break away to form West Virginia?','They disagreed with secession and had different economic interests.',['They wanted to join the Confederacy faster.','They were part of Maryland.','They wanted to grow tobacco.'],'They remained loyal to the Union.','They did not want to leave the Union.'),
 QH('How did the Civil War end in Virginia?','Lee surrendered to Grant at Appomattox Court House in 1865.',['The British invaded.','Richmond became the U.S. capital.','Lincoln surrendered.'],'The surrender came in April 1865.','Appomattox.'),
]);
addQ('vs8',[
 QI('What was Reconstruction?','the period of rebuilding the South after the Civil War',['the building of Jamestown','the American Revolution','the writing of the Constitution'],'Reconstruction followed the war.','Re-build.'),
 QI('Which amendment ended slavery?','the Thirteenth',['the First','the Nineteenth','the Fifteenth'],'The 13th Amendment ended slavery in 1865.','13.'),
 QH('What was the Freedmen’s Bureau?','an agency that helped formerly enslaved people with food, schools and jobs',['a bank for plantation owners','an army unit','a newspaper'],'It provided help after the war.','Helped freedmen.'),
 QH('How did Jim Crow laws affect African Americans?','They enforced segregation and limited rights.',['They gave equal rights.','They ended segregation.','They gave free land.'],'Jim Crow laws separated people by race.','Unfair laws.'),
 QH('What did the Fifteenth Amendment try to protect?','the right of African American men to vote',['freedom of religion','the right to bear arms','women’s right to vote'],'It said race could not stop men from voting.','Voting rights.'),
 QH('Why did many states, including Virginia, use poll taxes and literacy tests?','to keep African Americans from voting',['to raise money for schools','to help people vote','to count the population'],'These rules blocked voting.','Who was kept out?'),
]);
addQ('vs9',[
 QI('What helped Virginia’s economy grow after Reconstruction?','railroads and new industries',['more tobacco plantations only','gold mining','whaling'],'Railroads connected markets.','Trains!'),
 QI('Which city became a major shipping center at Hampton Roads?','Norfolk',['Roanoke','Charlottesville','Lynchburg'],'Norfolk is a busy port.','On the coast.'),
 QH('Why did Roanoke grow quickly in the late 1800s?','It became a railroad center.',['It was the state capital.','It had a big seaport.','It had gold mines.'],'Railroads made Roanoke grow.','Trains met there.'),
 QH('Why did people move from farms to cities around 1900?','to find jobs in factories and industries',['because farms paid more','to escape cities','to join the army'],'Cities had factory jobs.','Jobs.'),
 QH('How did railroads help coal mining in southwest Virginia?','They carried coal to factories and ports.',['They used no coal.','They ran only in cities.','They replaced coal with oil.'],'Trains moved coal to market.','Moving heavy goods.'),
 QH('Which change describes Virginia around 1900?','It became more industrial and urban.',['It became completely rural again.','It stopped building railroads.','It lost all its cities.'],'Industry and cities grew.','Factories and cities.'),
]);
addQ('vs10',[
 QI('Which Virginian was president during World War I?','Woodrow Wilson',['George Washington','Thomas Jefferson','John Tyler'],'Woodrow Wilson led the U.S. in WWI.','Born in Staunton.'),
 QI('Which Virginian created a plan to rebuild Europe after World War II?','George C. Marshall',['Richard E. Byrd','Arthur Ashe','Patrick Henry'],'The Marshall Plan helped Europe recover.','His name is in the plan.'),
 QH('Why did Virginia’s economy grow during World War II?','Shipyards and military bases expanded.',['Tobacco became illegal.','All factories closed.','The capital moved.'],'War needs boosted industry.','Ships and bases.'),
 QH('Richard E. Byrd is famous for exploring…','the North and South Pole regions by air',['the Moon','the Amazon','the Sahara'],'Byrd flew over polar regions.','Very cold places.'),
 QH('Why is Arthur Ashe remembered beyond tennis?','He worked for civil rights and fought for health education.',['He was a president.','He wrote the Constitution.','He founded Jamestown.'],'He used his fame for good causes.','More than a champion.'),
 QH('Which Virginian was the first African American elected governor in the U.S.?','L. Douglas Wilder',['Oliver Hill','Maggie L. Walker','Booker T. Washington'],'Wilder was elected in 1989.','1989.'),
]);
addQ('vs11',[
 QI('What did Brown v. Board of Education (1954) decide?','School segregation was unconstitutional.',['Schools must close.','Segregation was legal.','Only boys could attend school.'],'The Supreme Court ended legal school segregation.','Equal education.'),
 QI('Who led a student strike at Moton High School in 1951?','Barbara Johns',['Rosa Parks','Maggie L. Walker','Dolley Madison'],'Barbara Johns led the protest at age 16.','A high school student.'),
 QH('What did some Virginia leaders do during Massive Resistance?','They closed schools rather than integrate them.',['They built new schools for everyone together.','They ended segregation quickly.','They welcomed the Brown decision.'],'Some schools closed to avoid integration.','Resisting the ruling.'),
 QH('Why was Barbara Johns’s protest important?','It led to a court case that became part of Brown v. Board of Education.',['It ended World War II.','It created the Virginia Company.','It started the Revolution.'],'Her case joined Brown v. Board.','A court case.'),
 QH('What happened to schools in Prince Edward County during Massive Resistance?','Public schools were closed for five years.',['They became the best in the nation.','They integrated in 1954.','They moved to Richmond.'],'Schools closed from 1959 to 1964.','Closed.'),
 QH('How did Oliver Hill help end segregation?','He was a lawyer who argued civil rights cases in court.',['He was a governor who closed schools.','He was a general.','He was a baseball player.'],'He fought segregation in the courts.','Lawyer.'),
]);
addQ('vs12',[
 QI('Why is Virginia called the “Mother of Presidents”?','Eight presidents were born in Virginia.',['The first mom was president there.','All presidents lived there.','It has the most people.'],'Eight presidents were born in Virginia.','Count the presidents.'),
 QI('Which Virginia president wrote the Declaration of Independence?','Thomas Jefferson',['James Monroe','John Tyler','Zachary Taylor'],'Jefferson wrote it.','Monticello.'),
 QH('Which Virginia-born president created the Monroe Doctrine?','James Monroe',['James Madison','William Henry Harrison','Woodrow Wilson'],'The Monroe Doctrine warned Europe not to colonize the Americas.','His name is in it.'),
 QH('Which Virginia-born president served the shortest time, dying after about one month?','William Henry Harrison',['George Washington','John Tyler','Thomas Jefferson'],'Harrison died a month after taking office.','Short term.'),
 QH('Which Virginia-born president became president when Harrison died?','John Tyler',['James Monroe','Zachary Taylor','James Madison'],'Tyler was Harrison’s vice president.','The vice president.'),
 QH('Which Virginia-born president led the country in World War I?','Woodrow Wilson',['Zachary Taylor','George Washington','James Monroe'],'Wilson was president 1913–1921.','The 1910s.'),
]);
addQ('vs13',[
 QI('Which is an important industry in Northern Virginia today?','technology and government work',['whaling','gold mining','cotton plantations'],'Northern Virginia has tech companies and federal agencies.','Near Washington, D.C.'),
 QI('Which product is grown on many Virginia farms today?','soybeans and corn',['coffee','bananas','pineapples'],'Virginia farms grow soybeans, corn, wheat and more.','Field crops.'),
 QH('Why is the Port of Virginia important to the state’s economy?','Goods are shipped to and from countries around the world.',['It is only for fishing boats.','It is a theme park.','It is closed to trade.'],'International trade moves through Hampton Roads.','Ships carry goods.'),
 QH('How does tourism help Virginia’s economy?','Visitors spend money at historic sites, beaches and parks.',['It costs Virginia money only.','Tourists build factories.','It replaces all farms.'],'Tourism brings money and jobs.','Visitors spend money.'),
 QH('Why are there many military bases in the Hampton Roads area?','The harbor and coast are good for ships and the Navy.',['It is in the mountains.','There is no water.','It is the coldest area.'],'Coastal geography helps the Navy.','Ships need water.'),
 QH('Which describes Virginia’s economy today?','It is diverse, with farming, technology, ports, tourism and government.',['It depends only on tobacco.','It has no farms.','It is based only on coal.'],'Many different industries.','Diverse = many kinds.'),
]);
addQ('vs_sk',[
 QI('What is a primary source?','something made by a person who was there at the time',['a textbook written today','a video game','an encyclopedia summary'],'Diaries, letters and photos from the time are primary sources.','Made at the time.'),
 QI('On a timeline, which event comes first: 1607, 1776, 1865?','1607',['1776','1865','they happened together'],'The smallest year is earliest.','Smallest year first.'),
 QH('How many years passed between Jamestown (1607) and the Declaration of Independence (1776)?','169',['179','159','1,776'],'1776 − 1607 = 169.','Subtract.'),
 QH('Which is a secondary source about the Civil War?','a modern history book about the war',['a soldier’s letter from 1862','a photograph from 1864','a diary written in 1863'],'Secondary sources are written later.','Written later by someone who was not there.'),
 QH('A map shows a scale of 1 inch = 50 miles. Two cities are 3 inches apart. How far apart are they?','150 miles',['53 miles','50 miles','350 miles'],'3 × 50 = 150 miles.','Multiply by the scale.'),
 QH('What can historians learn by comparing two sources about the same event?','different points of view and what they agree on',['the event never happened','nothing new','only the dates'],'Comparing sources reveals perspectives.','Two views.'),
]);
})();
// fixes for original Grade 4 templates: no ties in "most/fewest" graph questions, and two grammar slips
(function(){
const vals=q=>(q.question.match(/=\d+/g)||[]).map(s=>+s.slice(1));
const _d=GEN.g4_data;GEN.g4_data=function(){let q;for(let i=0;i<30;i++){q=_d();const v=vals(q);
  if(/MOST/.test(q.question)&&v.filter(x=>x===Math.max(...v)).length>1)continue;
  if(/FEWEST/.test(q.question)&&v.filter(x=>x===Math.min(...v)).length>1)continue;
  if(/How many MORE/.test(q.question)&&v.length===2&&v[0]===v[1])continue;return q;}return q;};
const fix=q=>{if(q&&q.question)q.question=q.question.replace('something that an exact location','something that is an exact location').replace(/does a ([aeiou])/i,'does an $1');return q;};
['g4_angle','g4_shape'].forEach(g=>{const o=GEN[g];if(o)GEN[g]=function(){return fix(o.apply(this,arguments));};});
})();

