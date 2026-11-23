// ── GRADE 7: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana','Kofi','Grace','Yaw','Ama','Diego','Priya'];
const gcd=(a,b)=>b?gcd(b,a%b):a;const fr=(n,d)=>{if(d<0){n=-n;d=-d;}const g=Math.abs(gcd(n,d));const N=n/g,D=d/g;return D===1?neg(N):(N<0?'−':'')+`${Math.abs(N)}/${D}`;};
const neg=n=>n<0?'−'+Math.abs(n):String(n);const r2=x=>Math.round(x*100)/100;const $=x=>'$'+r2(x).toFixed(2);
const SUP={'-1':'⁻¹','-2':'⁻²','-3':'⁻³','-4':'⁻⁴','-5':'⁻⁵','-6':'⁻⁶',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹'};
const sciS=(m,e)=>`${m} × 10${SUP[e]||'^'+e}`;
// 7.NS.1 scientific notation
addGens('g7_ns1',[
 ()=>{const m=rng(11,99)/10,e=rng(2,7);return mq('g7_ns1',`Write ${sciS(m,e)} in standard form.`,Math.round(m*10**e).toLocaleString('en-US'),[Math.round(m*10**(e-1)).toLocaleString('en-US'),Math.round(m*10**(e+1)).toLocaleString('en-US'),String(m)+'0'.repeat(e)],`Move the decimal ${e} places right.`,'Positive exponent: move right.');},
]);
addGens('g7_ns1',[
 ()=>{const m=rng(11,99)/10,e=-rng(2,5);const std=(m*10**e).toFixed(-e+1).replace(/0+$/,'');return mq('g7_ns1',`Write ${sciS(m,e)} in standard form.`,std,[(m*10**(e+1)).toFixed(-e).replace(/0+$/,''),(m*10**(e-1)).toFixed(-e+2).replace(/0+$/,''),String(m*10**-e)],`Negative exponent: move the decimal ${-e} places LEFT.`,'Negative exponent means a small number.');},
 ()=>{const n=rng(11,99),z=rng(2,4);const val='0.'+'0'.repeat(z)+n;return mq('g7_ns1',`Write ${val} in scientific notation.`,sciS(n/10,-(z+1)),[sciS(n/10,-z),sciS(n/10,z+1),sciS(n,-(z+2))],`Move the decimal ${z+1} places right to get ${n/10}, so the exponent is −${z+1}.`,'Count how far the decimal moves to make a number from 1 to 10.');},
 ()=>{const a=[rng(11,99)/10,rng(3,6)],b=[rng(11,99)/10,rng(-4,-1)],c=[rng(11,99)/10,rng(-6,-5)];const L=[a,b,c].sort((x,y)=>x[0]*10**x[1]-y[0]*10**y[1]);const s=L.map(x=>sciS(x[0],x[1]));return mq('g7_ns1','Order from LEAST to GREATEST: '+shuf(s.slice()).join(', '),s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2]].join(', '),[s[0],s[2],s[1]].join(', ')],'Compare exponents first: the smallest exponent is the smallest number.','Look at the exponents.');},
 ()=>{const e1=rng(6,9),e2=rng(2,4);return mq('g7_ns1',`About how many times larger is 10${SUP[e1]} than 10${SUP[e2]}?`,(10**(e1-e2)).toLocaleString('en-US'),[String(e1-e2),(10**(e1+e2)).toLocaleString('en-US'),String(e1*e2)],`10${SUP[e1]} ÷ 10${SUP[e2]} = 10${SUP[e1-e2]} = ${(10**(e1-e2)).toLocaleString('en-US')}.`,'Subtract the exponents.');},
],true);
// 7.NS.2 rational numbers
addGens('g7_ns2',[
 ()=>{const p=pick([[1,3],[2,3],[1,6],[5,6],[1,9]]);return mq('g7_ns2',`Write ${p[0]}/${p[1]} as a decimal.`,(p[0]/p[1]).toFixed(3).replace(/(\d)$/,'')+'…',[(p[1]/p[0]).toFixed(1),`0.${p[0]}${p[1]}`,(p[0]/p[1]).toFixed(1)],`${p[0]} ÷ ${p[1]} = ${(p[0]/p[1]).toFixed(4)}… (repeating).`,'Divide the numerator by the denominator.');},
]);
addGens('g7_ns2',[
 ()=>{const v=[[-3/4,'−3/4'],[-0.7,'−0.7'],[-0.8,'−80%'],[0.5,'1/2'],[-0.72,'−0.72']];const pick3=shuf(v).slice(0,4);const s=pick3.slice().sort((a,b)=>a[0]-b[0]).map(x=>x[1]);return mq('g7_ns2',`Order from LEAST to GREATEST: ${shuf(pick3.map(x=>x[1])).join(', ')}`,s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2],s[3]].join(', '),[s[0],s[1],s[3],s[2]].join(', ')],'Change to decimals. For negatives, the one farthest from zero is least.','−0.8 < −0.75 < −0.72 < −0.7.');},
 ()=>{const a=rng(2,9);let b=rng(2,9);if(b===a)b=a+rng(1,3);return mq('g7_ns2',`Which is greater: −${a}/${a+1} or −${b}/${b+1}?`,a===b?'They are equal':a<b?`−${a}/${a+1}`:`−${b}/${b+1}`,[a===b?`−${a}/${a+1}`:'They are equal',a<b?`−${b}/${b+1}`:`−${a}/${a+1}`],`${a}/${a+1} vs ${b}/${b+1}: the smaller fraction is closer to 0, so its negative is greater.`,'For negatives, closer to zero is greater.');},
 ()=>{const n=rng(1,99);return mq('g7_ns2',`What is ${n/10}% as a decimal?`,String(n/1000),[String(n/100),String(n/10),String(n/10000)],`${n/10}% = ${n/10} ÷ 100 = ${n/1000}.`,'Divide by 100.');},
],true);
// 7.NS.3 square roots
addGens('g7_ns3',[
 ()=>{const n=rng(11,20);return mq('g7_ns3',`What is √${n*n}?`,n,[n*2,n+1,n*n/2],`${n} × ${n} = ${n*n}.`,'What number times itself?');},
]);
addGens('g7_ns3',[
 ()=>{const n=rng(5,19);const x=n*n+rng(1,2*n);return mq('g7_ns3',`√${x} is between which two consecutive whole numbers?`,`${n} and ${n+1}`,[`${n-1} and ${n}`,`${n+1} and ${n+2}`,`${Math.floor(x/2)} and ${Math.floor(x/2)+1}`],`${n}² = ${n*n} < ${x} < ${(n+1)**2} = ${n+1}².`,'Find the perfect squares around it.');},
 ()=>{const a=rng(4,12),b=rng(4,12);return mq('g7_ns3',`Evaluate: √${a*a} + √${b*b}`,a+b,[Math.round(Math.sqrt(a*a+b*b)*100)/100,a*b,a+b+1],`${a} + ${b} = ${a+b}. (Note: √${a*a} + √${b*b} is not √${a*a+b*b}.)`,'Take each square root first.');},
 ()=>{const s=pick([169,196,225,256,289,324,361,400]);return mq('g7_ns3',`A square tile has area ${s} cm². What is its perimeter?`,`${4*Math.sqrt(s)} cm`,[`${Math.sqrt(s)} cm`,`${s/4} cm`,`${2*Math.sqrt(s)} cm`],`Side = √${s} = ${Math.sqrt(s)}. Perimeter = 4 × ${Math.sqrt(s)} = ${4*Math.sqrt(s)}.`,'Find the side first.');},
],true);
// 7.CE.1 multistep rational problems
addGens('g7_ce1',[
 ()=>{const t=rng(-8,-1),r=rng(2,5),h=rng(2,6);return mq('g7_ce1',`The temperature was ${neg(t)}°F and rose ${r}°F per hour for ${h} hours. What is the temperature now?`,`${neg(t+r*h)}°F`,[`${neg(t-r*h)}°F`,`${neg(t+r+h)}°F`,`${neg(r*h)}°F`],`${neg(t)} + ${r} × ${h} = ${neg(t+r*h)}.`,'Rate × time, then add.');},
]);
addGens('g7_ce1',[
 ()=>{const bal=rng(160,250),w=r2(rng(1500,4000)/100),d=r2(rng(500,2000)/100),k=rng(2,4);const end=r2(bal-k*w+d);return mq('g7_ce1',`${pick(NAMES)} has $${bal}. They buy ${k} shirts at ${$(w)} each and return one item for ${$(d)}. How much money now?`,$(end),[$(bal-k*w-d),$(bal-w+d),$(end+w)],`${bal} − ${k} × ${w} + ${d} = ${end}.`,'Spend = subtract, refund = add.');},
 ()=>{const L=pick([[3,4],[2,3],[5,8]]),total=L[1]*3*rng(1,3);const used=total*L[0]/L[1];const left=total-used;return mq('g7_ce1',`A ${total}-ft rope is cut. ${L[0]}/${L[1]} of it is used, and the rest is cut into 3 equal pieces. How long is each piece?`,`${r2(left/3)} ft`,[`${r2(used/3)} ft`,`${r2(left)} ft`,`${r2(total/3)} ft`],`Used ${used} ft, ${left} ft left, ÷ 3 = ${r2(left/3)}.`,'Find what is left first.');},
 ()=>{const a=r2(rng(-90,-10)/10),b=r2(rng(10,60)/10),c=rng(2,4);return mq('g7_ce1',`Evaluate: (${a} + ${b}) × ${c}`,String(r2((a+b)*c)).replace('-','−'),[String(r2(a+b*c)).replace('-','−'),String(r2(-(a+b)*c)).replace('-','−'),String(r2((a-b)*c)).replace('-','−')],`${a} + ${b} = ${r2(a+b)}, × ${c} = ${r2((a+b)*c)}.`,'Parentheses first.');},
],true);
// 7.CE.2 percents & proportions
addGens('g7_ce2',[
 ()=>{const p=rng(4,25)*4,t=pick([15,20,25]);return mq('g7_ce2',`A restaurant bill is $${p}. You leave a ${t}% tip. What is the tip?`,$(p*t/100),[$(p*t/10),$(p+t),$(p*(100-t)/100)],`${t}% of $${p} = ${$(p*t/100)}.`,'Multiply by the decimal.');},
]);
addGens('g7_ce2',[
 ()=>{const p=rng(4,20)*5,d=pick([20,25,30]),tax=pick([5,6]);const s=p*(100-d)/100;const tot=r2(s*(1+tax/100));return mq('g7_ce2',`A $${p} item is ${d}% off, then ${tax}% sales tax is added to the sale price. What is the total?`,$(tot),[$(s),$(p*(1+tax/100)-p*d/100),$(p*(100-d+tax)/100)],`Sale: $${p} × ${1-d/100} = ${$(s)}. Tax: × ${1+tax/100} = ${$(tot)}.`,'Discount first, then tax.');},
 ()=>{const o=rng(20,80),n=o+rng(5,40);const pct=r2((n-o)/o*100);return mq('g7_ce2',`A plant grew from ${o} cm to ${n} cm. What is the percent increase? (nearest hundredth)`,`${pct}%`,[`${n-o}%`,`${r2((n-o)/n*100)}%`,`${r2(n/o*100)}%`],`(${n} − ${o}) ÷ ${o} × 100 = ${pct}%.`,'Change ÷ ORIGINAL.');},
 ()=>{const p=pick([20,25]),o=rng(4,16)*20,s=o*(100-p)/100;return mq('g7_ce2',`After a ${p}% discount, a game costs $${s}. What was the original price?`,$(o),[$(s*(1+p/100)),$(s+p),$(s/(p/100))],`$${s} is ${100-p}% of the original. $${s} ÷ ${(100-p)/100} = ${$(o)}.`,'The sale price is what percent of the original?');},
],true);
// 7.MG.1 volume & surface area
addGens('g7_mg1',[
 ()=>{const l=rng(2,10),w=rng(2,8),h=rng(2,9);return mq('g7_mg1',`A box is ${l} cm by ${w} cm by ${h} cm. What is its volume?`,`${l*w*h} cm³`,[`${2*(l*w+l*h+w*h)} cm³`,`${l+w+h} cm³`,`${l*w} cm³`],`V = l × w × h = ${l*w*h}.`,'Multiply all three dimensions.');},
]);
addGens('g7_mg1',[
 ()=>{const r=rng(2,6),h=rng(3,10);const sa=r2(2*3.14*r*r+2*3.14*r*h);return mq('g7_mg1',`Find the surface area of a cylinder with radius ${r} cm and height ${h} cm. (π ≈ 3.14)`,`${sa} cm²`,[`${r2(3.14*r*r*h)} cm²`,`${r2(2*3.14*r*h)} cm²`,`${r2(3.14*r*r+2*3.14*r*h)} cm²`],`2πr² + 2πrh = ${r2(2*3.14*r*r)} + ${r2(2*3.14*r*h)} = ${sa}.`,'Two circles plus the curved side.');},
 ()=>{const l=rng(3,8),w=rng(2,6),h=rng(2,5);return mq('g7_mg1',`If every dimension of a ${l} × ${w} × ${h} box is doubled, what is the new volume?`,`${8*l*w*h} units³`,[`${2*l*w*h} units³`,`${4*l*w*h} units³`,`${l*w*h+8} units³`],`Doubling each dimension multiplies volume by 2 × 2 × 2 = 8.`,'Try the new dimensions.');},
 ()=>{const V=pick([[100.48,2,8],[150.72,2,12],[113.04,3,4],[254.34,3,9]]);return mq('g7_mg1',`A cylinder has volume ${V[0]} cm³ and radius ${V[1]} cm. What is its height? (π ≈ 3.14)`,`${V[2]} cm`,[`${V[2]*2} cm`,`${r2(V[0]/(3.14*V[1]))} cm`,`${V[2]+1} cm`],`h = V ÷ (πr²) = ${V[0]} ÷ ${r2(3.14*V[1]*V[1])} = ${V[2]}.`,'Divide volume by the base area.');},
],true);
// 7.MG.2 similar figures
addGens('g7_mg2',[
 ()=>{const k=rng(2,5),a=rng(2,8);return mq('g7_mg2',`Two figures are similar with scale factor ${k}. A side of the small figure is ${a} m. What is the matching side of the large figure?`,`${a*k} m`,[`${a+k} m`,`${a} m`,`${a*k*k} m`],`${a} × ${k} = ${a*k}.`,'Multiply by the scale factor.');},
]);
addGens('g7_mg2',[
 ()=>{const h=rng(4,7),s=rng(2,5),ts=rng(10,30);const H=r2(h*ts/s);return mq('g7_mg2',`A ${h}-ft person casts a ${s}-ft shadow. At the same time, a tree casts a ${ts}-ft shadow. How tall is the tree?`,`${H} ft`,[`${r2(ts*s/h)} ft`,`${ts+h-s} ft`,`${r2(h*ts)} ft`],`Set up ${h}/${s} = x/${ts}. x = ${H}.`,'Similar triangles: height/shadow.');},
 ()=>{const sc=pick([2,3,4]),w=rng(2,6),l=rng(3,8);return mq('g7_mg2',`A rectangle is ${w} by ${l}. It is enlarged by a scale factor of ${sc}. How many times larger is the new AREA?`,`${sc*sc} times`,[`${sc} times`,`${2*sc} times`,`${sc**3} times`],`Area scales by the square of the scale factor: ${sc}² = ${sc*sc}.`,'Find both areas and compare.');},
 ()=>{const cm=rng(3,9),k=pick([25,50,200]);return mq('g7_mg2',`A blueprint uses 1 cm = ${k} cm. A wall is ${cm} cm on the blueprint. How long is the real wall in meters?`,`${cm*k/100} m`,[`${cm*k} m`,`${cm*k/10} m`,`${cm+k} m`],`${cm} × ${k} = ${cm*k} cm = ${cm*k/100} m.`,'Convert cm to m at the end.');},
],true);
// 7.MG.3 quadrilaterals
addQ('g7_mg3',[
 QI('Which quadrilateral has both pairs of opposite sides parallel?','parallelogram',['trapezoid','kite','scalene quadrilateral'],'A parallelogram has two pairs of parallel sides.','Para = parallel.'),
 QI('The diagonals of which quadrilateral are always congruent?','rectangle',['rhombus that is not a square','trapezoid that is not isosceles','kite'],'Rectangles have congruent diagonals.','Think of a door frame.'),
 QH('Which is a rhombus but NOT a square?','a parallelogram with 4 equal sides and angles of 60° and 120°',['a rectangle with 4 equal sides','a trapezoid','a kite with no equal sides'],'A rhombus needs equal sides, not right angles.','Equal sides, no right angles.'),
 QH('In a parallelogram, one angle is 65°. What are the other three angles?','115°, 65° and 115°',['65°, 65° and 65°','25°, 65° and 25°','90°, 90° and 115°'],'Consecutive angles add to 180°; opposite angles are equal.','Opposite angles match.'),
 QH('Which statement is TRUE?','Every square is a rhombus.',['Every rhombus is a square.','Every trapezoid is a parallelogram.','Every rectangle is a square.'],'A square has 4 equal sides, so it is a rhombus.','Check the definitions.'),
 QH('A quadrilateral has angles x, 2x, 3x and 4x. What is x?','36°',['30°','45°','90°'],'x + 2x + 3x + 4x = 10x = 360°, so x = 36°.','Angles add to 360°.'),
 QH('Which quadrilateral has diagonals that are perpendicular bisectors of each other?','rhombus',['trapezoid','rectangle that is not a square','kite only'],'A rhombus’s diagonals bisect each other at right angles.','Equal sides.'),
]);
addGens('g7_mg3',[
 ()=>{const a=rng(60,120),b=rng(60,120),c=rng(60,120);const d=360-a-b-c;if(d<30||d>170)return mq('g7_mg3','In a trapezoid, the two angles along the same leg (between the parallel bases) add up to what?','180°',['90°','360°','270°'],'Same-side interior angles between parallel lines add to 180°.','Parallel bases.');return mq('g7_mg3',`A quadrilateral has angles ${a}°, ${b}° and ${c}°. What is the fourth angle?`,`${d}°`,[`${180-a}°`,`${d+10}°`,`${360-a-b}°`],`360 − ${a} − ${b} − ${c} = ${d}.`,'All four add to 360°.');},
],true);
// 7.MG.4 dilations
addGens('g7_mg4',[
 ()=>{const x=rng(-6,6)||2,y=rng(-6,6)||3,k=pick([2,3]);return mq('g7_mg4',`Point (${neg(x)}, ${neg(y)}) is dilated by scale factor ${k} from the origin. What is the image?`,`(${neg(x*k)}, ${neg(y*k)})`,[`(${neg(x+k)}, ${neg(y+k)})`,`(${neg(x*k)}, ${neg(y)})`,`(${neg(x/k)}, ${neg(y/k)})`],`Multiply each coordinate by ${k}.`,'Multiply both coordinates.');},
]);
addGens('g7_mg4',[
 ()=>{const x=rng(1,6)*4,y=rng(1,6)*4;return mq('g7_mg4',`A point (${x}, ${y}) is dilated to (${x*3/4}, ${y*3/4}). What is the scale factor?`,'3/4',['4/3','1/4','3'],`${x*3/4} ÷ ${x} = 3/4.`,'Image ÷ original.');},
 ()=>{const k=pick([2,3,0.5]),w=rng(2,6)*2,h=rng(2,6)*2;return mq('g7_mg4',`A ${w} × ${h} rectangle is dilated by scale factor ${k}. What is the new perimeter?`,String(2*(w+h)*k),[String(2*(w+h)),String(w*h*k),String(2*(w+h)*k*k)],`Perimeter ${2*(w+h)} × ${k} = ${2*(w+h)*k}.`,'Lengths scale by the factor.');},
 ()=>{return mq('g7_mg4','A dilation has a scale factor between 0 and 1. What happens to the figure?','It shrinks (a reduction).',['It grows (an enlargement).','It stays the same size.','It flips.'],'Scale factors less than 1 make figures smaller.','Multiply by a fraction.');},
],true);
// 7.PS.1 probability
addGens('g7_ps1',[
 ()=>{const r=rng(2,6),b=rng(2,6),g=rng(1,4);const t=r+b+g;return mq('g7_ps1',`A bag has ${r} red, ${b} blue and ${g} green tiles. What is P(not green)?`,fr(r+b,t),[fr(g,t),fr(r,t),`${r+b}/${g}`],`${r+b} of ${t} are not green.`,'Count the tiles that are not green.');},
]);
addGens('g7_ps1',[
 ()=>{const n=pick([60,120,300]);return mq('g7_ps1',`A number cube is rolled ${n} times. About how many times should you expect a number less than 3?`,n/3,[n/6,n/2,n*2/3],`P(1 or 2) = 2/6 = 1/3. 1/3 × ${n} = ${n/3}.`,'Theoretical probability × trials.');},
 ()=>{const t=rng(40,80),h=Math.round(t*rng(60,75)/100);return mq('g7_ps1',`A coin landed heads ${h} times out of ${t} flips. As the number of flips increases a lot, what should happen to the experimental probability?`,'It should get closer to 1/2.',['It should stay at '+fr(h,t)+'.','It should go to 1.','It should go to 0.'],'With more trials, experimental probability approaches theoretical probability.','Law of large numbers.');},
 ()=>{const r=rng(2,5),b=rng(2,5);const t=r+b;return mq('g7_ps1',`A bag has ${r} red and ${b} blue marbles. You draw one, replace it, then draw again. What is P(red, then red)?`,fr(r*r,t*t),[fr(r,t),fr(2*r,t),fr(r*r,t)],`${r}/${t} × ${r}/${t} = ${fr(r*r,t*t)}.`,'Multiply the two probabilities.');},
],true);
// 7.PS.2 histograms
addGens('g7_ps2',[
 ()=>{const c=[rng(2,8),rng(3,10),rng(4,12),rng(1,6)];const t=c.reduce((a,b)=>a+b,0);return mq('g7_ps2',`A histogram shows test scores: 60–69: ${c[0]}, 70–79: ${c[1]}, 80–89: ${c[2]}, 90–99: ${c[3]}. How many students scored 80 or higher?`,c[2]+c[3],[c[2],c[3],t],`${c[2]} + ${c[3]} = ${c[2]+c[3]}.`,'Add the bars from 80 up.');},
]);
addGens('g7_ps2',[
 ()=>{const c=[rng(2,8),rng(3,10),rng(4,12),rng(1,6)];const t=c.reduce((a,b)=>a+b,0);const p=Math.round((c[3]/t)*100);return mq('g7_ps2',`Scores: 60–69: ${c[0]}, 70–79: ${c[1]}, 80–89: ${c[2]}, 90–99: ${c[3]}. About what percent scored 90 or higher?`,`${p}%`,[`${c[3]}%`,`${Math.round(c[2]/t*100)}%`,`${100-p}%`],`${c[3]} ÷ ${t} ≈ ${p}%.`,'Part ÷ total.');},
 ()=>{return mq('g7_ps2','Why can’t you find the exact median from a histogram?','It shows how many values are in each interval, not the exact values.',['Histograms have no data.','The median is always the tallest bar.','Histograms only show one number.'],'Histograms group data into intervals.','What does each bar show?');},
 ()=>{const c=[rng(1,4),rng(5,9),rng(10,15),rng(5,9),rng(1,4)];const t=c.reduce((a,b)=>a+b,0);const mid=(t+1)/2;let cum=0,iv=0;for(let i=0;i<5;i++){cum+=c[i];if(cum>=mid){iv=i;break;}}const L=['0–9','10–19','20–29','30–39','40–49'];return mq('g7_ps2',`Minutes of reading: ${L.map((l,i)=>l+': '+c[i]).join(', ')}. Which interval contains the median?`,L[iv],L.filter(x=>x!==L[iv]).slice(0,3),`There are ${t} values; the median is the ${t%2?((t+1)/2)+'th':(t/2)+'th–'+(t/2+1)+'th'} value, which falls in ${L[iv]}.`,'Count from the left until you pass the middle.');},
],true);
// 7.PFA.1 proportional relationships
addGens('g7_pfa1',[
 ()=>{const k=rng(2,12);return mq('g7_pfa1',`y = ${k}x. What is y when x = 7?`,7*k,[7+k,k,7*k+k],`${k} × 7 = ${7*k}.`,'Substitute.');},
]);
addGens('g7_pfa1',[
 ()=>{const k=pick([0.5,1.5,2.5,0.25]),x=rng(2,9)*4;return mq('g7_pfa1',`A graph of a proportional relationship passes through (${x}, ${x*k}). What is the constant of proportionality?`,String(k),[String(1/k),String(x*k),String(k*2)],`k = y/x = ${x*k}/${x} = ${k}.`,'k = y ÷ x.');},
 ()=>{const k=rng(3,9);const t=[[1,k],[2,2*k],[3,3*k+1]];return mq('g7_pfa1',`Table: x = 1, 2, 3 and y = ${k}, ${2*k}, ${3*k+1}. Is it proportional?`,'No — y/x is not constant.',['Yes — k = '+k,'Yes — it goes up each time.','Cannot tell from a table.'],`${k}/1 = ${k}, ${2*k}/2 = ${k}, but ${3*k+1}/3 ≠ ${k}.`,'Check y ÷ x for each pair.');},
 ()=>{const a=rng(2,6),b=a+rng(1,4);return mq('g7_pfa1',`Car A: y = ${a}x (gallons → miles × 10). Car B: y = ${b}x. Which car’s graph is steeper?`,'Car B',['Car A','They are the same','Neither is proportional'],`The larger k (${b}) gives the steeper line.`,'Bigger slope = steeper.');},
],true);
// 7.PFA.2 expressions
addGens('g7_pfa2',[
 ()=>{const a=rng(2,9),b=rng(2,9);return mq('g7_pfa2',`Simplify: ${a}x − ${b} + ${b}x`,`${a+b}x − ${b}`,[`${a-b}x + ${b}`,`${a+b-b}x`,`${a}x`],`Combine like terms: ${a}x + ${b}x = ${a+b}x.`,'Combine the x terms.');},
]);
addGens('g7_pfa2',[
 ()=>{const a=rng(2,6),b=rng(2,9),c=rng(2,5),d=rng(1,9);return mq('g7_pfa2',`Simplify: ${a}(x + ${b}) − ${c}(x − ${d})`,`${a-c===1?'':a-c===-1?'−':neg(a-c)}${a-c===0?'':'x'}${a-c===0?neg(a*b+c*d):' + '+(a*b+c*d)}`,[`${a-c}x + ${a*b-c*d}`,`${a+c}x + ${a*b+c*d}`,`${a-c}x − ${a*b+c*d}`],`Distribute: ${a}x + ${a*b} − ${c}x + ${c*d}. Combine: ${a-c}x + ${a*b+c*d}.`,'Distribute the negative carefully.');},
 ()=>{const x=rng(-5,-1),y=rng(2,6);return mq('g7_pfa2',`Evaluate x² − 3y when x = ${neg(x)} and y = ${y}.`,neg(x*x-3*y),[neg(-x*x-3*y),neg(x*x+3*y),neg(2*x-3*y)],`(${neg(x)})² = ${x*x}. ${x*x} − ${3*y} = ${neg(x*x-3*y)}.`,'A negative squared is positive.');},
 ()=>{const a=rng(2,5),b=rng(2,5);return mq('g7_pfa2',`Which expression is equivalent to ${a*b}x + ${a*b*2}?`,`${a*b}(x + 2)`,[`${a}(x + ${b*2})`,`${a*b}(x + ${a*b*2})`,`${a*b*2}(x + 1)`],`Factor out ${a*b}: ${a*b}(x + 2).`,'Find the greatest common factor.');},
],true);
// 7.PFA.3 two-step equations
addGens('g7_pfa3',[
 ()=>{const x=rng(2,12),a=rng(2,9),b=rng(1,20);return mq('g7_pfa3',`Solve: ${a}x − ${b} = ${a*x-b}`,x,[x+1,(a*x-b+b)/a+b,a*x],`Add ${b}: ${a}x = ${a*x}. Divide: x = ${x}.`,'Undo subtraction, then multiplication.');},
]);
addGens('g7_pfa3',[
 ()=>{const x=rng(-9,-2),a=rng(2,7),b=rng(3,15);return mq('g7_pfa3',`Solve: ${a}x + ${b} = ${neg(a*x+b)}`,neg(x),[neg(-x),neg(x-1),neg(a*x)],`Subtract ${b}: ${a}x = ${neg(a*x)}. Divide by ${a}: x = ${neg(x)}.`,'The answer can be negative.');},
 ()=>{const x=rng(2,10)*3,b=rng(2,9);return mq('g7_pfa3',`Solve: x/3 + ${b} = ${x/3+b}`,x,[x/3,x/3+b,(x/3+b)*3],`Subtract ${b}: x/3 = ${x/3}. Multiply by 3: x = ${x}.`,'Undo the addition first.');},
 ()=>{const f=rng(15,40),p=rng(5,12),n=rng(3,8);return mq('g7_pfa3',`A gym charges a $${f} sign-up fee plus $${p} per month. ${pick(NAMES)} paid $${f+p*n}. How many months?`,n,[n+1,Math.round((f+p*n)/p),f],`${f} + ${p}m = ${f+p*n}. ${p}m = ${p*n}, m = ${n}.`,'Write the equation: fee + rate × months = total.');},
],true);
// 7.PFA.4 inequalities
addGens('g7_pfa4',[
 ()=>{const a=rng(2,6),x=rng(2,9),b=rng(1,12);return mq('g7_pfa4',`Solve: ${a}x − ${b} ≥ ${a*x-b}`,`x ≥ ${x}`,[`x ≤ ${x}`,`x ≥ ${x+1}`,`x > ${x}`],`Add ${b}, divide by ${a}: x ≥ ${x}.`,'Solve like an equation.');},
]);
addGens('g7_pfa4',[
 ()=>{const a=rng(2,6),x=rng(-5,6);const b=rng(1,9);return mq('g7_pfa4',`Solve: −${a}x + ${b} > ${neg(-a*x+b)}`,`x < ${neg(x)}`,[`x > ${neg(x)}`,`x < ${neg(-x)}`,`x ≥ ${neg(x)}`],`Subtract ${b}: −${a}x > ${neg(-a*x)}. Divide by −${a} and FLIP: x < ${neg(x)}.`,'Dividing by a negative flips the sign.');},
 ()=>{const m=rng(30,60),p=rng(4,9);const max=Math.floor(m/p);return mq('g7_pfa4',`${pick(NAMES)} has $${m} and buys snacks at $${p} each. What is the greatest number of snacks they can buy?`,max,[max+1,m-p,Math.ceil(m/p)+1].filter(x=>x!==max),`${p}s ≤ ${m} → s ≤ ${r2(m/p)}, so ${max}.`,'Round down — you cannot buy part of a snack.');},
 ()=>{const n=rng(-4,4);return mq('g7_pfa4',`Which inequality matches: a closed circle at ${neg(n)} with shading to the LEFT?`,`x ≤ ${neg(n)}`,[`x < ${neg(n)}`,`x ≥ ${neg(n)}`,`x > ${neg(n)}`],'Closed = included; left = less than.','Closed circle means “or equal to.”');},
],true);
// Grade 7 reading
addQ('r7_vocab',[
 QI('The root “spect” means to look. Which word means “a person who watches an event”?','spectator',['inspector of buildings','respect','spectacle-maker'],'A spectator watches.','Spect = look.'),
 QI('Which word has a more POSITIVE connotation?','curious',['nosy','meddling','prying'],'Curious suggests healthy interest.','Which is a compliment?'),
 QH('“Her words were daggers.” What type of figurative language is this?','metaphor',['simile','hyperbole','onomatopoeia'],'It compares without “like” or “as.”','No “like” or “as.”'),
 QH('“The city that never sleeps” is an example of…','personification',['alliteration','a simile','an oxymoron'],'Cities do not literally sleep.','Human trait given to a thing.'),
 QH('The prefix “bene-” means good and “mal-” means bad. Which pair are antonyms?','benevolent / malevolent',['benefit / benefactor','malfunction / malady','benign / benefit'],'Benevolent = kind; malevolent = wishing harm.','Bene vs. mal.'),
 QH('“Jamal was ambivalent about moving: excited for a new room, but sad to leave friends.” Ambivalent means…','having mixed feelings',['very angry','completely happy','not caring at all'],'He had two opposite feelings.','Ambi = both.'),
 QH('“Deafening silence” is an example of…','an oxymoron',['a simile','an idiom','alliteration'],'It combines contradictory words.','Opposites together.'),
 QH('Which word means “to make less severe”?','mitigate',['aggravate','escalate','intensify'],'Mitigate means to lessen.','The opposite of making worse.'),
]);
const F7A='Mara had always been the fastest runner on the team, but this season a new girl, Sienna, crossed the finish line first at every practice. Mara stopped joking with teammates. She skipped the team dinner. At the regional meet, Sienna stumbled at the start and fell behind. Mara could have run past her and won easily. Instead, she slowed for a step, shouted, “Get up — you’ve got this!” and then sprinted. Sienna caught her at the line. The clock showed a tie. That night, Mara sat next to Sienna at dinner.';
addQ('r7_fiction',[
 QP(F7A,'What is the main conflict?','Mara feels threatened by a faster new teammate.',['Sienna wants to quit the team.','The coach is unfair.','Mara is injured.'],'Sienna’s speed upsets Mara.','What changes Mara’s behavior?'),
 QP(F7A,'How does Mara’s behavior at the meet show a change in character?','She chooses sportsmanship over winning.',['She becomes more jealous.','She stops running.','She ignores Sienna.'],'She encourages Sienna instead of just winning.','What does she shout?',true),
 QP(F7A,'What is the significance of the final sentence?','It shows Mara has accepted Sienna as a teammate and friend.',['It shows Mara is hungry.','It shows the team lost.','It shows Sienna left the team.'],'Mara had skipped dinner earlier; now she sits by Sienna.','Compare it to the earlier dinner.',true),
 QP(F7A,'Which theme is best supported?','True competition can include respect for others.',['Winning is the only thing that matters.','New people should be avoided.','Running is easy.'],'Mara competes hard but encourages her rival.','What did Mara learn?',true),
 QP(F7A,'From what point of view is the story told?','third person',['first person','second person','the coach’s first-person view'],'The narrator uses “she” and names, not “I.”','Look at the pronouns.',true),
]);
const N7A='Many schools have started later morning start times for middle and high school students. Research from sleep scientists shows that teenagers’ internal clocks shift during puberty, making it hard to fall asleep before 11 p.m. When school starts at 7:30, many teens get far less than the 8 to 10 hours of sleep doctors recommend. Districts that moved start times later reported better attendance and fewer car accidents among teen drivers. Critics worry about bus schedules and after-school sports, but districts that planned carefully found workable solutions. The evidence suggests that later start times are worth the effort.';
addQ('r7_nonfic',[
 QP(N7A,'What is the author’s claim?','Later school start times are worth the effort.',['Teens are lazy.','Buses are expensive.','Sports should be canceled.'],'The last sentence states the claim.','Find the author’s conclusion.'),
 QP(N7A,'Which evidence best supports the claim?','Districts with later times reported better attendance and fewer car accidents.',['Critics worry about bus schedules.','School starts at 7:30.','Some districts have sports.'],'Positive outcomes support the claim.','Which shows benefits?',true),
 QP(N7A,'How does the author treat the opposing view?','acknowledges it and responds that solutions were found',['ignores it','agrees completely','calls critics foolish'],'“Critics worry… but districts… found solutions.”','Look for “but.”',true),
 QP(N7A,'Why does the author mention sleep scientists?','to give the argument credibility',['to tell a story','to add humor','to change the topic'],'Experts strengthen an argument.','Who are they?',true),
 QP(N7A,'Which text structure does sentence 2–3 use?','cause and effect',['chronological order','compare and contrast','description'],'Shifted clocks + early start → less sleep.','Because… so…',true),
]);
// Grade 7 Life Science
addQ('ls2',[
 QI('Which organelle makes proteins?','ribosome',['vacuole','cell wall','chloroplast'],'Ribosomes build proteins.','Tiny protein factories.'),
 QI('Which organelle stores water and materials, and is large in plant cells?','vacuole',['nucleus','mitochondrion','ribosome'],'Plant cells have a large central vacuole.','Storage.'),
 QH('Why do muscle cells have many mitochondria?','They need a lot of energy.',['They make food from sunlight.','They store water.','They divide constantly.'],'Mitochondria release energy.','Muscles work hard.'),
 QH('A cell is placed in very salty water. What happens?','Water moves out of the cell, and it shrinks.',['Water moves in, and it bursts.','Nothing happens.','The cell makes salt.'],'Water moves to where there is more solute.','Osmosis.'),
 QH('What is the main difference between prokaryotic and eukaryotic cells?','Eukaryotic cells have a nucleus; prokaryotic cells do not.',['Prokaryotes are always larger.','Eukaryotes have no DNA.','Prokaryotes have chloroplasts.'],'Bacteria are prokaryotes without a nucleus.','Nucleus or not.'),
 QH('Which scientist first observed and named “cells” in cork?','Robert Hooke',['Gregor Mendel','Charles Darwin','Isaac Newton'],'Hooke named cells in 1665.','He used an early microscope.'),
 QH('During mitosis, how does the number of chromosomes in each new cell compare to the parent cell?','It is the same.',['It is half.','It is double.','It is zero.'],'Mitosis makes identical cells.','Copies.'),
]);
addQ('ls3',[
 QI('Which kingdom includes organisms that make their own food and have cell walls made of cellulose?','plants',['animals','fungi','protists that hunt'],'Plants are autotrophs with cellulose walls.','Green.'),
 QI('What is the correct order of classification from broadest to most specific?','domain, kingdom, phylum, class, order, family, genus, species',['species, genus, family, order, class, phylum, kingdom, domain','kingdom, domain, class, phylum, family, order, species, genus','genus, species, family, order, class, kingdom, phylum, domain'],'Domain is broadest; species is most specific.','“Dear King Philip Came Over For Good Soup.”'),
 QH('Two organisms are in the same genus. What else must they share?','the same family',['the same species','nothing else','a different kingdom'],'Organisms in the same genus share every higher level.','Higher levels include lower ones.'),
 QH('Which pair is MOST closely related?','a lion and a tiger (same genus Panthera)',['a lion and a shark','a tiger and an oak tree','a mushroom and a dog'],'Same genus = closely related.','Share the most levels.'),
 QH('Why do scientists use scientific names instead of common names?','Scientific names are the same in every language and avoid confusion.',['They are shorter.','Common names are illegal.','Scientific names change every year.'],'One organism can have many common names.','Think of “puma” and “cougar.”'),
 QH('Which domain contains organisms with a nucleus?','Eukarya',['Bacteria','Archaea','Prokarya'],'Eukarya have nuclei.','Eu = true nucleus.'),
]);
addQ('ls4',[
 QI('What are the reactants (starting materials) of photosynthesis?','carbon dioxide, water and light energy',['glucose and oxygen','oxygen and water','sugar and light'],'Plants use CO₂, water and light.','What goes in?'),
 QI('Which gas do animals release during cellular respiration?','carbon dioxide',['oxygen','nitrogen','hydrogen'],'Respiration releases CO₂.','We breathe it out.'),
 QH('What is the role of chlorophyll?','to capture light energy',['to store water','to release carbon dioxide','to make DNA'],'Chlorophyll absorbs light.','Green pigment.'),
 QH('Why does a plant in the dark eventually die even with water?','It cannot make glucose without light.',['It has too much oxygen.','Water turns to sugar.','Roots stop working.'],'No light = no photosynthesis.','Food comes from light.'),
 QH('Which organelle is the site of cellular respiration?','mitochondrion',['chloroplast','nucleus','cell wall'],'Mitochondria release energy from glucose.','Powerhouse.'),
 QH('A sealed jar has a plant and a mouse in light. Why can both survive longer than either alone?','The plant gives oxygen; the mouse gives carbon dioxide.',['The mouse eats the plant.','The jar makes air.','They do not need gases.'],'Photosynthesis and respiration balance each other.','Gas exchange.'),
]);
addQ('ls5',[
 QI('Which is a biotic factor?','bacteria in the soil',['temperature','sunlight','water'],'Bacteria are living.','Bio = life.'),
 QI('What happens to energy as it moves up a food chain?','It decreases at each level.',['It increases.','It stays the same.','It is recycled perfectly.'],'About 90% is lost at each level.','Less at the top.'),
 QH('Why are there fewer top predators than producers in an ecosystem?','Less energy is available at higher trophic levels.',['Predators are lazy.','Producers eat predators.','Predators live longer.'],'Energy loss limits top levels.','Energy pyramid.'),
 QH('How do nitrogen-fixing bacteria help plants?','They change nitrogen gas into a form plants can use.',['They make oxygen.','They eat plant roots.','They create sunlight.'],'Plants cannot use N₂ directly.','Nitrogen cycle.'),
 QH('In the carbon cycle, which process RETURNS carbon to the air?','respiration and burning',['photosynthesis','evaporation','condensation'],'Respiration and combustion release CO₂.','Breathing out.'),
 QH('A lake receives fertilizer runoff and algae bloom. Fish begin to die. What is the cause?','Decomposing algae use up the oxygen in the water.',['Algae eat the fish.','The water gets too cold.','Fish are allergic to algae.'],'Decomposition depletes oxygen.','Oxygen.'),
]);
addQ('ls6',[
 QI('Clownfish live among sea anemones, and both benefit. This relationship is…','mutualism',['parasitism','commensalism','predation'],'Both benefit.','Mutual = both.'),
 QI('What is a limiting factor?','something that keeps a population from growing',['a kind of predator only','a type of habitat','an animal’s favorite food'],'Food, space and water can limit populations.','It limits.'),
 QH('A population of deer grows past the carrying capacity. What is likely to happen?','Food runs short and the population decreases.',['The population grows forever.','More food appears.','Predators disappear.'],'Above carrying capacity, resources run out.','Not enough food.'),
 QH('Barnacles on a whale get transportation; the whale is not affected. This is…','commensalism',['mutualism','parasitism','competition'],'One benefits, the other is unaffected.','One helped, one neutral.'),
 QH('Wolves were reintroduced to Yellowstone. Elk numbers dropped, and willows along rivers grew back. This is an example of…','a trophic cascade',['commensalism','mutualism','a limiting factor of sunlight'],'A predator’s effect cascades through the food web.','Effects ripple down.'),
 QH('Two species of warblers feed in different parts of the same tree. How does this help?','It reduces competition for food.',['It increases competition.','It makes them one species.','It helps predators.'],'Dividing resources reduces competition.','Different niches.'),
]);
addQ('ls7',[
 QI('A monarch butterfly tastes bad to birds. A viceroy butterfly looks like a monarch. This is…','mimicry',['camouflage','migration','hibernation'],'The viceroy copies the monarch’s look.','Copycat.'),
 QI('Which is a structural adaptation?','a duck’s webbed feet',['a bird migrating','a bear hibernating','a possum playing dead'],'Body parts are structural adaptations.','Body part.'),
 QH('Why do some desert plants open their pores (stomata) only at night?','to reduce water loss in the heat',['to catch more sunlight','to attract bats','to grow faster in the day'],'Cooler nights mean less evaporation.','Save water.'),
 QH('Arctic foxes have small ears; desert foxes have large ears. Why?','Small ears save heat; large ears release heat.',['Large ears help them swim.','Small ears help them hear better.','There is no reason.'],'Ear size helps control body temperature.','Heat.'),
 QH('How does a plant’s seed coat help it survive?','It protects the seed until conditions are right to sprout.',['It makes food from light.','It attracts pollinators.','It helps the seed swim.'],'The coat protects the embryo.','Protection.'),
 QH('Why are adaptations important over many generations?','Organisms with helpful traits survive and reproduce more.',['Adaptations happen to one animal overnight.','They make all animals the same.','They stop reproduction.'],'Natural selection favors helpful traits.','Survival and reproduction.'),
]);
addQ('ls10',[
 QI('What is a gene?','a section of DNA that codes for a trait',['a type of cell','an organ','a whole chromosome set'],'Genes are DNA segments.','DNA instructions.'),
 QI('An organism’s physical appearance is its…','phenotype',['genotype','allele','chromosome'],'Phenotype = what you can see.','Pheno = show.'),
 QH('Crossing TT (tall) with tt (short), where tall is dominant, gives what offspring?','all Tt — all tall',['all tt — all short','half tall, half short','all TT'],'Every offspring gets one T and one t.','Each parent gives one allele.'),
 QH('Crossing Tt × tt gives what ratio of tall to short?','1 tall : 1 short',['3 tall : 1 short','all tall','all short'],'Punnett square: Tt, Tt, tt, tt.','Draw the square.'),
 QH('What is a mutation?','a change in the DNA sequence',['a new organ','a type of cell division','a learned behavior'],'Mutations change DNA.','DNA change.'),
 QH('Which trait is inherited, not learned?','eye color',['riding a bike','speaking Spanish','a scar from a fall'],'Eye color comes from genes.','Genes vs. experience.'),
]);
addQ('ls11',[
 QI('What is a fossil?','preserved remains or traces of an ancient organism',['a living animal','a kind of rock with no life signs','a modern bone'],'Fossils are evidence of past life.','Ancient remains.'),
 QI('What does “extinct” mean?','no members of the species are alive',['the species is growing','the species moved','the species is young'],'Extinct species are gone.','Gone forever.'),
 QH('Similar bones in a human arm, a bat wing and a whale flipper suggest…','these animals share a common ancestor',['they all fly','they live in water','they evolved separately with no relation'],'Homologous structures show common ancestry.','Same bones, different uses.'),
 QH('Peppered moths: dark moths became more common when soot darkened trees. Why?','Dark moths were better hidden from birds, so more survived.',['Soot painted the moths.','Birds preferred dark moths.','Light moths moved away.'],'Natural selection favored camouflage.','Which were harder to see?'),
 QH('Why is variation within a species important for natural selection?','Different traits give some individuals a survival advantage.',['All individuals must be identical.','Variation prevents reproduction.','It only matters in plants.'],'Selection acts on differences.','Without differences…'),
 QH('Why are fossils found in the deepest undisturbed rock layers usually the oldest?','Layers form over time, with older layers on the bottom.',['Deep rocks are softer.','Fossils sink.','Scientists bury them.'],'The law of superposition.','Bottom first.'),
]);
// Grade 7 writing
addQ('w7_write',[
 QI('Which transition shows a cause-and-effect relationship?','consequently',['meanwhile','for instance','similarly'],'Consequently = as a result.','As a result.'),
 QI('Which sentence is the best hook for an essay about ocean pollution?','Every minute, a garbage truck’s worth of plastic enters the ocean.',['This essay is about pollution.','Oceans are big.','I will talk about plastic.'],'A striking fact grabs attention.','Which makes you want to read more?'),
 QH('Which thesis is MOST specific and arguable?','Our school should replace plastic lunch trays with reusable ones to reduce waste.',['Plastic exists.','Pollution is a topic.','Some trays are plastic.'],'A thesis takes a clear, arguable position.','Can someone disagree?'),
 QH('Which sentence uses parallel structure?','We hiked, swam and canoed all weekend.',['We hiked, swimming and went canoeing.','Hiking, we swam and to canoe.','We like hiking, to swim and canoes.'],'Parallel structure keeps the same form.','Same verb form.'),
 QH('Which is the best way to cite evidence from an article?','According to the article, “sleep improves memory by 20 percent.”',['Sleep is great, I think.','Everyone knows sleep matters.','The article said stuff about sleep.'],'Quote and attribute the source.','Name the source.'),
 QH('Which sentence is written in an objective, formal tone?','The data indicate that recycling rates increased.',['Recycling is super awesome!','Ugh, people never recycle.','Recycling rocks, obviously.'],'Formal tone avoids slang and emotion.','No exclamations or slang.'),
]);
addQ('w7_edit',[
 QP('The list of supplies are on the board.','Which is the CORRECT version?','The list of supplies is on the board.',['The list of supplies were on the board.','The lists of supplies is on the board.'],'The subject is “list” (singular).','Ignore the prepositional phrase.'),
 QP('After eating dinner, the dishes were washed by Sam.','Which revision fixes the modifier?','After eating dinner, Sam washed the dishes.',['After eating dinner the dishes, were washed by Sam.','The dishes, after eating dinner, were washed.'],'The dishes did not eat dinner.','Who ate dinner?',true),
 QP('My grandmother who lives in Norfolk visits every summer.','Which is the CORRECT version?','My grandmother, who lives in Norfolk, visits every summer.',['My grandmother who lives in Norfolk, visits every summer.','My grandmother, who lives in Norfolk visits every summer.'],'A nonessential clause is set off with commas.','Is the clause extra information?',true),
 QP('Everyone should bring their own lunch.','In formal writing, which revision keeps singular agreement?','Everyone should bring his or her own lunch.',['Everyone should bring they’re own lunch.','Everyone should brings their own lunch.'],'“Everyone” is singular in formal style.','Formal agreement.',true),
 QP('We visited three cities Boston, Philadelphia, and Baltimore.','Which is the CORRECT version?','We visited three cities: Boston, Philadelphia, and Baltimore.',['We visited three cities; Boston, Philadelphia, and Baltimore.','We visited: three cities Boston, Philadelphia, and Baltimore.'],'A colon introduces a list after a complete sentence.','Use a colon before a list.',true),
 QP('Lay down and rest for a while.','Which is the CORRECT version?','Lie down and rest for a while.',['Laid down and rest for a while.','Lain down and rest for a while.'],'“Lie” means to recline; “lay” needs an object.','Are you placing something?',true),
]);
// Grade 7 Civics & Economics
addQ('ce1',[
 QI('Which document begins with “We the People”?','the U.S. Constitution',['the Declaration of Independence','the Articles of Confederation','the Magna Carta'],'The Preamble starts with “We the People.”','The Preamble.'),
 QI('What is the Bill of Rights?','the first ten amendments to the Constitution',['the Declaration of Independence','a list of presidents','a tax law'],'The Bill of Rights is amendments 1–10.','Ten.'),
 QH('Which English document first limited the power of the king?','the Magna Carta (1215)',['the Mayflower Compact','the Bill of Rights (1791)','the Federalist Papers'],'The Magna Carta limited royal power.','1215.'),
 QH('How did the Mayflower Compact influence American government?','It was an early example of self-government by agreement.',['It created the presidency.','It ended slavery.','It set up the Supreme Court.'],'Colonists agreed to make laws together.','1620.'),
 QH('Which weakness of the Articles of Confederation led to the Constitution?','Congress could not tax or enforce laws.',['The president had too much power.','States had no power.','The courts were too strong.'],'The national government was too weak.','Could not tax.'),
 QH('Which principle limits the government by requiring it to follow the law?','rule of law',['popular sovereignty only','federalism only','monarchy'],'No one is above the law.','No one is above it.'),
]);
addQ('ce2',[
 QI('How long is a U.S. senator’s term?','6 years',['2 years','4 years','for life'],'Senators serve 6-year terms.','Longest elected term.'),
 QI('How many members are in the U.S. House of Representatives?','435',['100','50','538'],'The House has 435 voting members.','Based on population.'),
 QH('How can Congress override a presidential veto?','with a two-thirds vote in both houses',['with a simple majority','by asking the Supreme Court','it cannot'],'Two-thirds of each chamber is needed.','A supermajority.'),
 QH('Which power belongs to the Senate but not the House?','approving treaties and confirming appointments',['starting tax bills','impeaching officials','choosing the Speaker'],'The Senate gives “advice and consent.”','Treaties.'),
 QH('Who becomes president if the president can no longer serve?','the vice president',['the Speaker of the House','the Chief Justice','the Secretary of State'],'The VP is first in line.','First in line.'),
 QH('Federal judges serve for life (during good behavior). Why?','to keep them independent from political pressure',['so they never retire','to make them powerful','because elections are expensive'],'Life terms protect judicial independence.','Independence.'),
]);
addQ('ce3',[
 QI('What are the two houses of the Virginia General Assembly?','the Senate and the House of Delegates',['the Senate and the House of Representatives','the Council and the Court','the Assembly and the Cabinet'],'Virginia has a Senate and House of Delegates.','Delegates.'),
 QI('How long is a Virginia governor’s term?','4 years',['2 years','6 years','8 years'],'Virginia governors serve 4 years.','Four.'),
 QH('What is unusual about Virginia’s governor compared to most states?','The governor cannot serve two terms in a row.',['The governor is appointed.','The governor serves for life.','There is no governor.'],'Virginia bans consecutive terms.','Not back-to-back.'),
 QH('Which Virginia official is elected statewide and can break tie votes in the state Senate?','the lieutenant governor',['the attorney general','the Speaker','the Chief Justice'],'The lieutenant governor presides over the Senate.','Presides over the Senate.'),
 QH('What is the Virginia constitution’s Declaration of Rights based on?','George Mason’s 1776 Declaration of Rights',['the Magna Carta only','the Articles of Confederation','the Treaty of Paris'],'Mason’s work became part of Virginia’s constitution.','George Mason.'),
 QH('Which branch of Virginia government makes the state budget law?','the General Assembly',['the Supreme Court of Virginia','the governor alone','local school boards'],'The General Assembly passes the budget (the governor proposes it).','Legislative branch.'),
]);
addQ('ce4',[
 QI('Who usually leads a Virginia county’s government?','a board of supervisors',['a king','the governor','a federal judge'],'Counties have boards of supervisors.','Supervisors.'),
 QI('Which local service is typically provided by local government?','trash collection and schools',['printing money','declaring war','making treaties'],'Local governments run schools and trash pickup.','Close to home.'),
 QH('What is “Dillon’s Rule” in Virginia?','Local governments have only the powers the state grants them.',['Localities can make any law.','The federal government runs localities.','Cities can ignore state laws.'],'Virginia follows Dillon’s Rule.','Power comes from the state.'),
 QH('How is a Virginia independent city different from a town?','An independent city is not part of any county.',['A town has no government.','Cities are smaller than towns.','Towns are not in Virginia.'],'Virginia’s independent cities are separate from counties.','Independent.'),
 QH('Which is the BEST way for a citizen to influence a local ordinance?','speak at a public meeting of the local council',['write to the President','ignore it','call the Supreme Court'],'Local meetings are open to public comment.','Go local.'),
 QH('Where do local governments get most of their money?','property taxes and state funds',['tariffs on imports','printing money','selling land to other countries'],'Property taxes are a major local revenue.','Homes and land.'),
]);
addQ('ce5',[
 QI('What is the highest court in the United States?','the Supreme Court',['the Court of Appeals','the District Court','the Virginia Supreme Court'],'The U.S. Supreme Court is the highest.','Supreme = highest.'),
 QI('In a criminal case, who brings charges against the accused?','the government (prosecutor)',['the victim’s friends','the jury','the defendant'],'Prosecutors represent the government.','The state.'),
 QH('Which amendment protects against unreasonable searches and seizures?','the Fourth',['the First','the Fifth','the Eighth'],'The 4th Amendment requires warrants in most cases.','Search warrants.'),
 QH('What is the role of an appellate court?','to review a lower court’s decision for legal errors',['to hold the first trial','to make new laws','to arrest suspects'],'Appeals courts review cases.','Appeal = review.'),
 QH('What does “due process” mean?','The government must follow fair legal procedures.',['Courts must work quickly.','Police can do anything.','Trials are optional.'],'Due process protects fairness.','Fair procedures.'),
 QH('Which amendment protects against “cruel and unusual punishment”?','the Eighth',['the Fourth','the Sixth','the Second'],'The 8th Amendment limits punishments.','Eight.'),
]);
addQ('ce6',[
 QI('What is naturalization?','the process for an immigrant to become a U.S. citizen',['being born in the U.S.','moving to a new state','registering a car'],'Naturalization is the legal path to citizenship.','Becoming a citizen.'),
 QI('Which is a DUTY of citizens (required by law)?','paying taxes',['voting','volunteering','joining a party'],'Duties are required; responsibilities are encouraged.','Required.'),
 QH('Which is a RESPONSIBILITY (not required by law)?','voting in elections',['obeying laws','paying taxes','serving on a jury when called'],'Voting is a responsibility, not a legal duty.','Encouraged.'),
 QH('Which amendment says that people born in the U.S. are citizens?','the Fourteenth',['the First','the Fifth','the Nineteenth'],'The 14th Amendment defines citizenship.','Citizenship clause.'),
 QH('What does the First Amendment protect?','religion, speech, press, assembly and petition',['the right to bear arms','trial by jury','voting rights for women'],'Five freedoms.','RAPPS.'),
 QH('Why are rights not unlimited?','They must be balanced against the rights of others and public safety.',['The government can remove any right.','Rights expire.','Only adults have rights.'],'Example: you cannot falsely shout “fire” in a crowded theater.','Rights have limits.'),
]);
addQ('ce7',[
 QI('Which is an example of civility?','listening respectfully to someone you disagree with',['interrupting rudely','name-calling online','ignoring rules'],'Civility means respectful behavior.','Respect.'),
 QI('Which is community service?','volunteering at a food bank',['watching TV','playing video games','sleeping in'],'Helping your community voluntarily.','Helping.'),
 QH('Why is honesty important to a democracy?','It builds trust between citizens and leaders.',['It makes elections shorter.','It replaces laws.','It is not important.'],'Trust is essential.','Trust.'),
 QH('A student sees misinformation spreading online about an election. What is the most responsible action?','check reliable sources and share accurate information',['share it quickly','add more rumors','ignore all news'],'Responsible citizens verify information.','Verify.'),
 QH('Why is it important for citizens to be informed about public issues?','to make thoughtful decisions and participate effectively',['to win arguments','to avoid voting','to make news less important'],'Informed citizens strengthen democracy.','Good decisions.'),
]);
addQ('ce8',[
 QI('How old must a U.S. citizen be to vote in federal elections?','18',['16','21','25'],'The 26th Amendment set the voting age at 18.','26th Amendment.'),
 QI('What are the two major political parties in the U.S. today?','Democratic and Republican',['Federalist and Whig','Green and Libertarian','Liberal and Labour'],'These are the two major parties.','Two parties.'),
 QH('How many electoral votes are needed to win the presidency?','270',['538','218','100'],'A majority of 538 is 270.','Majority.'),
 QH('How is a state’s number of electoral votes determined?','its number of representatives plus two senators',['by its land area','by its age','it is the same for every state'],'Electors = House seats + 2.','House + Senate.'),
 QH('What is a primary election?','an election in which a party chooses its candidates',['the general election in November','a vote on a law','a school election'],'Primaries pick party nominees.','Choose candidates.'),
 QH('Which is a role of political parties?','recruit candidates and inform voters about positions',['write the Constitution','run the courts','print money'],'Parties organize campaigns.','Organize.'),
]);
addQ('ce9',[
 QI('What does freedom of the press allow?','the media to report news without government censorship',['the government to control news','only one newspaper','reporters to break any law'],'The First Amendment protects the press.','First Amendment.'),
 QI('What is bias?','a one-sided view that favors a certain side',['a fact','an equal view of both sides','a type of camera'],'Bias favors one side.','One-sided.'),
 QH('Which headline shows the MOST bias?','“Reckless Council Wastes Taxpayer Money on Park”',['“Council Approves $2 Million for Park”','“New Park Budget Passes 5–2”','“City Plans Park Renovation”'],'Loaded words like “reckless” and “wastes” show bias.','Look for loaded words.'),
 QH('What is the best way to check if a news story is reliable?','compare it with several trustworthy sources',['trust the first post you see','check how many likes it has','ask a random person'],'Cross-checking sources improves accuracy.','More than one source.'),
 QH('What is “agenda setting” by the media?','choosing which issues get attention',['writing laws','counting votes','running for office'],'Media influence what people think about.','What gets covered.'),
 QH('Why might a politician use social media to speak directly to voters?','to share messages without going through journalists',['because it is illegal otherwise','to avoid all voters','to write laws'],'Direct communication bypasses media filters.','Directly.'),
]);
addQ('ce11',[
 QI('What is scarcity?','limited resources and unlimited wants',['having too much of everything','a type of tax','free goods'],'Scarcity forces choices.','Not enough for everything.'),
 QI('If the price of a good rises, what usually happens to the quantity demanded?','It decreases.',['It increases.','It stays the same.','It doubles.'],'Higher prices → people buy less.','Law of demand.'),
 QH('A new phone is very popular but the company makes few. What happens to the price?','It tends to rise.',['It tends to fall.','It stays the same.','It becomes free.'],'High demand + low supply → higher price.','Supply and demand.'),
 QH('Which describes a market economy?','Individuals and businesses make most economic decisions.',['The government decides everything.','Tradition decides everything.','There is no money.'],'Markets rely on private choices.','Private decisions.'),
 QH('What is an incentive?','something that motivates people to act',['a punishment only','a type of resource','a government office'],'Incentives can be rewards or penalties.','Motivation.'),
 QH('The U.S. has a mixed economy. What does that mean?','It combines free markets with some government involvement.',['It has no businesses.','Everything is owned by the government.','It trades only with Mexico.'],'Markets plus regulation.','Mix of both.'),
]);
addQ('ce12',[
 QI('What is a public good?','a good or service provided for everyone, like roads or parks',['a product sold in stores','a private yacht','a secret service only for some'],'Public goods are shared by all.','For everyone.'),
 QI('What is fiscal policy?','government decisions about taxes and spending',['interest rates set by banks','prices set by stores','printing newspapers'],'Congress and the president set fiscal policy.','Taxes and spending.'),
 QH('Which agency controls monetary policy in the U.S.?','the Federal Reserve',['the Supreme Court','the Department of State','the Census Bureau'],'The Fed manages the money supply and interest rates.','The Fed.'),
 QH('Why might the Federal Reserve lower interest rates?','to encourage borrowing and spending in a slow economy',['to stop all spending','to raise taxes','to print fewer coins'],'Lower rates encourage borrowing.','Cheaper loans.'),
 QH('Why does the government regulate food and drug safety?','to protect consumers from harm',['to raise prices','to stop all trade','to compete with stores'],'Regulation protects public health.','Safety.'),
 QH('What is a budget deficit?','when the government spends more than it collects',['when it collects more than it spends','a type of tax','a bank account'],'Spending > revenue.','More out than in.'),
]);
addQ('ce13',[
 QI('What is a budget?','a plan for spending and saving money',['a type of loan','a bank','a credit card'],'Budgets plan income and expenses.','A plan.'),
 QI('What is interest on a savings account?','money the bank pays you for keeping money there',['a fee you always pay','a type of tax','a loan'],'Banks pay interest on savings.','Your money grows.'),
 QH('Why can using a credit card be risky?','Unpaid balances grow with high interest.',['You never have to pay it back.','It lowers prices.','It is the same as cash with no risk.'],'Credit card debt grows quickly.','Interest charges.'),
 QH('Which is the best example of an emergency fund?','savings set aside for unexpected expenses',['money spent on a vacation','a new phone','a car loan'],'Emergency funds cover surprises.','For surprises.'),
 QH('What does insurance do?','protects against large financial losses for a fee',['guarantees nothing bad happens','gives free money','replaces savings'],'You pay premiums to share risk.','Shares risk.'),
 QH('Investing $100 at 5% simple interest per year earns how much in 3 years?','$15',['$5','$105','$150'],'$100 × 0.05 × 3 = $15.','Principal × rate × time.'),
 QH('Why is a good credit score helpful?','It can help you borrow money at lower interest rates.',['It guarantees a job.','It means you have no debt ever.','It lowers taxes.'],'Lenders reward reliable borrowers.','Trust from lenders.'),
]);
})();

