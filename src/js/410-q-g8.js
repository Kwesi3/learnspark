// ── GRADE 8: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana','Kofi','Grace','Yaw','Ama','Diego','Priya'];
const gcd=(a,b)=>b?gcd(b,a%b):a;const neg=n=>n<0?'−'+Math.abs(n):String(n);const r2=x=>Math.round(x*100)/100;
const fr=(n,d)=>{if(d<0){n=-n;d=-d;}const g=Math.abs(gcd(n,d));const N=n/g,D=d/g;return D===1?neg(N):(N<0?'−':'')+`${Math.abs(N)}/${D}`;};
const $=x=>'$'+r2(x).toFixed(2);const lin=(m,b)=>`y = ${m===1?'':m===-1?'−':neg(m)}x${b===0?'':b<0?' − '+(-b):' + '+b}`;
const TRIPLES=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[7,24,25],[9,12,15],[12,16,20],[20,21,29]];
// 8.NS.1 real numbers
addGens('g8_ns1',[
 ()=>{const n=rng(2,12);return mq('g8_ns1',`Which is greater: √${n*n+1} or ${n}?`,`√${n*n+1}`,[String(n),'They are equal'],`√${n*n} = ${n}, so √${n*n+1} is a little more than ${n}.`,'Compare to a perfect square.');},
]);
addGens('g8_ns1',[
 ()=>{const n=rng(3,11),x=n*n+Math.round((2*n+1)*0.3);const est=r2(n+(x-n*n)/(2*n+1));return mq('g8_ns1',`Estimate √${x} to the nearest tenth.`,String(Math.round(Math.sqrt(x)*10)/10),[String(Math.round(Math.sqrt(x)*10)/10+0.3).replace(/(\.\d)\d+/,'$1'),String(n+1),String(Math.round(x/2))],`${n}² = ${n*n} and ${n+1}² = ${(n+1)**2}. √${x} ≈ ${Math.round(Math.sqrt(x)*10)/10}.`,'Find the two perfect squares around it, then see where it falls.');},
 ()=>{const v=[['√50',Math.sqrt(50)],['7.2',7.2],['22/3',22/3],['7.1',7.1],['√48',Math.sqrt(48)]];const s=shuf(v).slice(0,4).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);return mq('g8_ns1',`Order from least to greatest: ${shuf(s.slice()).join(', ')}`,s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2],s[3]].join(', '),[s[0],s[1],s[3],s[2]].join(', ')],'√48 ≈ 6.93, √50 ≈ 7.07, 7.1, 7.2, 22/3 ≈ 7.33.','Change each to a decimal.');},
 ()=>{const x=rng(20,99);if(Math.sqrt(x)%1===0)return mq('g8_ns1','What are the square roots of 49?','7 and −7',['7 only','−7 only','24.5'],'Both 7² and (−7)² equal 49.','Positive and negative.');const lo=Math.floor(Math.sqrt(x));return mq('g8_ns1',`Between which two consecutive integers is −√${x}?`,`${neg(-lo-1)} and ${neg(-lo)}`,[`${lo} and ${lo+1}`,`${neg(-lo)} and ${neg(-lo+1)}`,`${neg(-lo-2)} and ${neg(-lo-1)}`],`${lo}² = ${lo*lo} < ${x} < ${(lo+1)**2}, so √${x} is between ${lo} and ${lo+1}, and −√${x} is between ${neg(-lo-1)} and ${neg(-lo)}.`,'Find √ first, then make it negative.');},
],true);
// 8.NS.2 real number system
addQ('g8_ns2',[
 QI('Which number is irrational?','π',['3.14','22/7','√36'],'π never ends or repeats.','Non-repeating, non-ending.'),
 QI('Which set does −8 belong to?','integers, rationals and reals',['natural numbers only','irrationals','whole numbers'],'−8 is an integer, so also rational and real.','Negative whole numbers are integers.'),
 QH('Which statement is TRUE?','Every integer is a rational number.',['Every rational number is an integer.','Every real number is rational.','Every irrational number is an integer.'],'Integers can be written as n/1.','Can −5 be written as a fraction?'),
 QH('Is 0.121212… (repeating) rational or irrational?','rational',['irrational','neither','both'],'Repeating decimals are rational: 12/99 = 4/33.','Repeating = rational.'),
 QH('Is 0.1010010001… (the pattern of zeros keeps growing) rational or irrational?','irrational',['rational','an integer','a whole number'],'It never repeats a fixed block.','Does a block repeat?'),
 QH('Which number is a whole number but NOT a natural number?','0',['1','−1','1/2'],'Whole numbers include 0; natural numbers start at 1.','Where do natural numbers start?'),
 QH('What is √2 × √2?','2 (rational)',['√4 (irrational)','2√2','4'],'√2 × √2 = 2.','Square root times itself.'),
 QH('Which is irrational?','√20',['√25','√0.25','√(4/9)'],'20 is not a perfect square.','Is it a perfect square?'),
]);
// 8.CE.1 percents in context
addGens('g8_ce1',[
 ()=>{const p=rng(20,80)*5,t=pick([4,5,6,7]);return mq('g8_ce1',`A $${p} item has ${t}% sales tax. What is the total cost?`,$(p*(1+t/100)),[$(p*t/100),$(p+t),$(p*(1-t/100))],`$${p} × ${1+t/100} = ${$(p*(1+t/100))}.`,'Multiply by 1 + rate.');},
]);
addGens('g8_ce1',[
 ()=>{const P=rng(5,30)*100,r=pick([2,3,4,5]),t=rng(2,6);const I=P*r*t/100;return mq('g8_ce1',`${pick(NAMES)} borrows $${P.toLocaleString('en-US')} at ${r}% simple interest for ${t} years. What is the total amount repaid?`,'$'+(P+I).toLocaleString('en-US'),['$'+I.toLocaleString('en-US'),'$'+(P+P*r/100).toLocaleString('en-US'),'$'+(P*(1+r/100)**t).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')],`I = ${P} × ${r/100} × ${t} = ${I}. Total = ${P} + ${I} = ${P+I}.`,'Interest + principal.');},
 ()=>{const a=rng(40,90)*10,u=pick([10,20,25]),d=pick([10,20]);const after=a*(1+u/100)*(1-d/100);return mq('g8_ce1',`A price of $${a} rises ${u}%, then falls ${d}%. What is the final price?`,$(after),[$(a*(1+(u-d)/100)),$(a),$(a*(1+u/100))],`$${a} × ${1+u/100} = ${$(a*(1+u/100))}. × ${1-d/100} = ${$(after)}.`,'Apply each change one at a time.');},
 ()=>{const o=rng(40,120),n=rng(10,o-5);const pct=r2((o-n)/o*100);return mq('g8_ce1',`Attendance fell from ${o} to ${n}. What is the percent decrease (nearest hundredth)?`,`${pct}%`,[`${r2((o-n)/n*100)}%`,`${o-n}%`,`${r2(n/o*100)}%`],`(${o} − ${n}) ÷ ${o} × 100 = ${pct}%.`,'Divide by the ORIGINAL amount.');},
],true);
// 8.MG.1 angle relationships
addGens('g8_mg1',[
 ()=>{const a=rng(20,70);return mq('g8_mg1',`Two angles are complementary. One is ${a}°. What is the other?`,`${90-a}°`,[`${180-a}°`,`${a}°`,`${90+a}°`],`90 − ${a} = ${90-a}.`,'Complementary angles add to 90°.');},
]);
addGens('g8_mg1',[
 ()=>{const x=rng(10,30);const a=2*x+10,b=180-a;return mq('g8_mg1',`Two supplementary angles measure (2x + 10)° and ${b}°. What is x?`,x,[b,(180-b)/2,x+10],`2x + 10 + ${b} = 180 → 2x = ${170-b} → x = ${x}.`,'Set the sum equal to 180.');},
 ()=>{const x=rng(8,25);return mq('g8_mg1',`Vertical angles measure (3x − 5)° and (2x + ${x-5})°. What is x?`,x,[x+5,3*x-5,x-5],`3x − 5 = 2x + ${x-5} → x = ${x}.`,'Vertical angles are equal.');},
 ()=>{const a=rng(25,65);return mq('g8_mg1',`An angle’s complement is ${a}°. What is its supplement?`,`${90+a}°`,[`${180-a}°`,`${90-a}°`,`${a}°`],`The angle is 90 − ${a} = ${90-a}°. Its supplement is 180 − ${90-a} = ${90+a}°.`,'Find the angle first.');},
],true);
// 8.MG.2 cones & pyramids
addGens('g8_mg2',[
 ()=>{const r=rng(2,6),h=rng(3,12);const V=r2(3.14*r*r*h/3);return mq('g8_mg2',`Find the volume of a cone with radius ${r} cm and height ${h} cm. (π ≈ 3.14)`,`${V} cm³`,[`${r2(3.14*r*r*h)} cm³`,`${r2(3.14*r*h/3)} cm³`,`${r2(3.14*2*r*h/3)} cm³`],`V = ⅓πr²h = ⅓ × 3.14 × ${r*r} × ${h} = ${V}.`,'A cone is ⅓ of a cylinder.');},
]);
addGens('g8_mg2',[
 ()=>{const s=rng(3,10),h=rng(3,12);return mq('g8_mg2',`A cube and a square pyramid have the same ${s}-in base, and the pyramid’s height is ${s} in. How many pyramids would fill the cube?`,'3',['2','4','6'],'A pyramid’s volume is ⅓ of a prism with the same base and height.','⅓ rule.');},
 ()=>{const t=pick([[3,4,5],[6,8,10],[5,12,13]]);const r=t[0],h=t[1],l=t[2];return mq('g8_mg2',`A cone has radius ${r} and height ${h}. What is its slant height?`,String(l),[String(r+h),String(h),String(r2(Math.sqrt(r*h)))],`Use the Pythagorean theorem: ${r}² + ${h}² = ${l}².`,'Radius, height and slant height make a right triangle.');},
 ()=>{const b=rng(4,10),l=rng(5,12);const sa=b*b+2*b*l;return mq('g8_mg2',`A square pyramid has base edge ${b} m and slant height ${l} m. What is its surface area?`,`${sa} m²`,[`${b*b+4*b*l} m²`,`${2*b*l} m²`,`${r2(b*b*l/3)} m²`],`Base ${b*b} + 4 triangles × ½ × ${b} × ${l} = ${b*b} + ${2*b*l} = ${sa}.`,'Base + 4 triangles.');},
],true);
// 8.MG.3 transformations
addGens('g8_mg3',[
 ()=>{const x=rng(-6,6),y=rng(-6,6),dx=rng(-5,5)||3,dy=rng(-5,5)||-2;return mq('g8_mg3',`Point (${neg(x)}, ${neg(y)}) is translated by (x + ${neg(dx)}, y + ${neg(dy)}). Where is the image?`,`(${neg(x+dx)}, ${neg(y+dy)})`,[`(${neg(x-dx)}, ${neg(y-dy)})`,`(${neg(x+dy)}, ${neg(y+dx)})`,`(${neg(x*dx)}, ${neg(y*dy)})`],'Add to each coordinate.','Add dx to x and dy to y.');},
]);
addGens('g8_mg3',[
 ()=>{const x=rng(1,7),y=rng(1,7),dx=rng(1,4);return mq('g8_mg3',`Point (${x}, ${y}) is reflected over the y-axis and then translated ${dx} units right. Where is the image?`,`(${neg(-x+dx)}, ${y})`,[`(${x+dx}, ${y})`,`(${neg(-x-dx)}, ${y})`,`(${neg(-x+dx)}, ${neg(-y)})`],`Reflect: (${neg(-x)}, ${y}). Translate: (${neg(-x+dx)}, ${y}).`,'Do the steps in order.');},
 ()=>{return mq('g8_mg3','Which transformation does NOT always produce a congruent image?','dilation',['translation','reflection','rotation'],'Dilations change size unless the scale factor is 1.','Which changes size?');},
 ()=>{const x=rng(2,8),y=rng(2,8);return mq('g8_mg3',`A triangle has vertex A(${x}, ${y}). After a reflection, A′ is (${x}, ${neg(-y)}). What was the line of reflection?`,'the x-axis',['the y-axis','the line y = x','the origin'],'Only the y-coordinate changed sign.','Which coordinate flipped?');},
],true);
// 8.MG.4 Pythagorean theorem
addGens('g8_mg4',[
 ()=>{const t=pick(TRIPLES);return mq('g8_mg4',`A right triangle has legs ${t[0]} and ${t[1]}. What is the hypotenuse?`,t[2],[t[0]+t[1],t[2]+1,t[1]],`${t[0]}² + ${t[1]}² = ${t[0]**2+t[1]**2} = ${t[2]}².`,'a² + b² = c².');},
]);
addGens('g8_mg4',[
 ()=>{const t=pick(TRIPLES);return mq('g8_mg4',`A right triangle has hypotenuse ${t[2]} and one leg ${t[0]}. What is the other leg?`,t[1],[t[2]-t[0],t[2]+t[0],t[0]],`${t[2]}² − ${t[0]}² = ${t[2]**2-t[0]**2} = ${t[1]}².`,'Subtract squares to find a leg.');},
 ()=>{const t=pick(TRIPLES);return mq('g8_mg4',`A TV screen is ${t[0]*2} in wide and ${t[1]*2} in tall. What is its diagonal?`,`${t[2]*2} in`,[`${(t[0]+t[1])*2} in`,`${t[2]} in`,`${t[2]*2+2} in`],`√(${t[0]*2}² + ${t[1]*2}²) = ${t[2]*2}.`,'The diagonal is the hypotenuse.');},
 ()=>{const s=pick([[5,6,8],[7,8,10],[6,8,10],[9,12,15],[5,12,14]]);const right=s[0]**2+s[1]**2===s[2]**2;return mq('g8_mg4',`Can sides ${s[0]}, ${s[1]} and ${s[2]} form a right triangle?`,right?'Yes':'No',[right?'No':'Yes','Only if it is isosceles'],`${s[0]}² + ${s[1]}² = ${s[0]**2+s[1]**2}; ${s[2]}² = ${s[2]**2}. ${right?'They are equal.':'They are not equal.'}`,'Check a² + b² = c².');},
 ()=>{const t=pick([[3,4,5],[6,8,10],[5,12,13]]);const x1=rng(-3,3),y1=rng(-3,3);return mq('g8_mg4',`What is the distance between (${neg(x1)}, ${neg(y1)}) and (${neg(x1+t[0])}, ${neg(y1+t[1])})?`,t[2],[t[0]+t[1],t[2]+1,t[1]],`Horizontal ${t[0]}, vertical ${t[1]}: √(${t[0]}² + ${t[1]}²) = ${t[2]}.`,'Make a right triangle.');},
],true);
// 8.MG.5 composite figures
addGens('g8_mg5',[
 ()=>{const l=rng(6,14),w=rng(4,10),c=rng(1,3);return mq('g8_mg5',`A ${l} × ${w} rectangle has a ${c} × ${c} square cut from one corner. What is the remaining area?`,`${l*w-c*c} units²`,[`${l*w} units²`,`${l*w-c} units²`,`${l*w+c*c} units²`],`${l*w} − ${c*c} = ${l*w-c*c}.`,'Subtract the cut-out.');},
]);
addGens('g8_mg5',[
 ()=>{const l=rng(6,14),w=rng(4,10),c=rng(1,3);return mq('g8_mg5',`A ${l} × ${w} rectangle has a ${c} × ${c} square cut from one corner. What is the PERIMETER of the new shape?`,`${2*(l+w)} units`,[`${2*(l+w)-2*c} units`,`${2*(l+w)+2*c} units`,`${l*w-c*c} units`],'Cutting a corner square removes two edges of length c but adds two new edges of length c, so the perimeter is unchanged.','Trace the new outline.');},
 ()=>{const s=rng(4,10);const A=r2(s*s+3.14*(s/2)**2/2*2);return mq('g8_mg5',`A square with side ${s} has a semicircle on two opposite sides. What is the total area? (π ≈ 3.14)`,`${r2(s*s+3.14*(s/2)**2)} units²`,[`${r2(s*s+3.14*(s/2)**2/2)} units²`,`${r2(s*s+3.14*s*s)} units²`,`${r2(s*s)} units²`],`Two semicircles make one circle of radius ${s/2}: ${r2(3.14*(s/2)**2)}. Total ${r2(s*s+3.14*(s/2)**2)}.`,'Two halves make a whole circle.');},
 ()=>{const b=rng(4,10),h=rng(3,8),H=rng(3,8);return mq('g8_mg5',`A house shape is a ${b} × ${H} rectangle with a triangle roof (base ${b}, height ${h}). What is the total area?`,`${b*H+b*h/2} units²`,[`${b*H+b*h} units²`,`${b*(H+h)} units²`,`${b*H} units²`],`${b*H} + ½ × ${b} × ${h} = ${b*H+b*h/2}.`,'Rectangle + triangle.');},
],true);
// 8.PS.1 compound probability
addGens('g8_ps1',[
 ()=>{return mq('g8_ps1','You flip a coin and roll a number cube. What is P(heads and a 6)?','1/12',['1/6','1/2','2/8'],'1/2 × 1/6 = 1/12.','Independent: multiply.');},
]);
addGens('g8_ps1',[
 ()=>{const r=rng(3,6),b=rng(2,5);const t=r+b;return mq('g8_ps1',`A bag has ${r} red and ${b} blue tiles. You draw two WITHOUT replacement. What is P(both blue)?`,fr(b*(b-1),t*(t-1)),[fr(b*b,t*t),fr(b,t),fr(b*(b-1),t*t)],`${b}/${t} × ${b-1}/${t-1} = ${fr(b*(b-1),t*(t-1))}.`,'The second draw has one fewer tile.');},
 ()=>{const k=pick([2,3]);return mq('g8_ps1',`You roll two number cubes. What is P(both show a number less than ${k+1})?`,fr(k*k,36),[fr(k,6),fr(2*k,12),fr(k*k,12)],`(${k}/6) × (${k}/6) = ${fr(k*k,36)}.`,'Multiply the probabilities.');},
 ()=>{const n=pick([3,4]);return mq('g8_ps1',`A quiz has ${n} true/false questions. If you guess on all, what is P(all correct)?`,`1/${2**n}`,[`1/${2*n}`,'1/2',`${n}/${2**n}`],`(1/2)${n===3?'³':'⁴'} = 1/${2**n}.`,'Multiply 1/2 for each question.');},
],true);
// 8.PS.2 boxplots
addGens('g8_ps2',[
 ()=>{const mn=rng(5,20),q1=mn+rng(2,8),md=q1+rng(2,8),q3=md+rng(2,8),mx=q3+rng(2,10);return mq('g8_ps2',`A boxplot: min ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3}, max ${mx}. What is the range?`,mx-mn,[q3-q1,mx-md,md-mn],`${mx} − ${mn} = ${mx-mn}.`,'Range = max − min.');},
]);
addGens('g8_ps2',[
 ()=>{const d=[rng(2,6),rng(7,10),rng(11,14),rng(15,18),rng(19,22),rng(23,26),rng(27,30)];const q1=(d[1]),q3=(d[5]);return mq('g8_ps2',`Data: ${d.join(', ')}. What is the interquartile range (IQR)?`,q3-q1,[d[6]-d[0],q3-d[3],d[3]-q1],`Median ${d[3]}. Lower half median (Q1) = ${q1}. Upper half median (Q3) = ${q3}. IQR = ${q3-q1}.`,'Find Q1 and Q3 by taking medians of each half.');},
 ()=>{return mq('g8_ps2','Two boxplots have the same median, but Class A’s box is much wider than Class B’s. What does this show?','Class A’s middle 50% of scores is more spread out.',['Class A has a higher median.','Class B has more students.','Class A has no outliers.'],'Box width shows the IQR (spread of the middle half).','What does the box show?');},
 ()=>{const q1=rng(20,30),q3=q1+rng(8,14);const iqr=q3-q1;const fence=q3+1.5*iqr;return mq('g8_ps2',`Q1 = ${q1} and Q3 = ${q3}. Using the 1.5 × IQR rule, values above what number are outliers?`,String(fence),[String(q3+iqr),String(q3+1.5),String(q1-1.5*iqr)],`IQR = ${iqr}. Upper fence = ${q3} + 1.5 × ${iqr} = ${fence}.`,'Q3 + 1.5 × IQR.');},
],true);
// 8.PS.3 scatterplots
addQ('g8_ps3',[
 QI('A scatterplot shows that as temperature rises, ice cream sales rise. What kind of relationship is this?','positive',['negative','no relationship','constant'],'Both increase together.','Same direction.'),
 QI('Which pair of data would most likely show NO relationship?','height and birth month',['hours studied and test score','age of a car and its value','temperature and heating bill'],'Birth month does not affect height.','Is one likely to affect the other?'),
 QH('A line of best fit is y = −3x + 90 for days since watering (x) and soil moisture (y). What does −3 mean?','Moisture drops about 3 units each day.',['Moisture starts at 3.','Moisture rises 3 each day.','There are 3 days.'],'Slope is the rate of change.','Slope = change per day.'),
 QH('Why can a strong correlation still NOT prove that one thing causes another?','A third factor might cause both.',['Correlation always means causation.','Scatterplots are never accurate.','Strong correlations are random.'],'Example: ice cream sales and sunburns both rise in summer.','Is there a hidden cause?'),
 QH('A line of best fit is y = 2.5x + 10. Predict y when x = 12.','40',['22.5','30','34.5'],'2.5 × 12 + 10 = 40.','Substitute x.'),
 QH('Which is the BEST reason not to use a line of best fit to predict far outside the data?','The trend may not continue beyond the data.',['Lines cannot be extended.','It is illegal.','It always gives zero.'],'Extrapolation can be unreliable.','Will the pattern hold forever?'),
]);
// 8.PFA.1 expressions
addGens('g8_pfa1',[
 ()=>{const a=rng(2,6),b=rng(2,9),c=rng(2,6);return mq('g8_pfa1',`Simplify: ${a}(${b}x + ${c})`,`${a*b}x + ${a*c}`,[`${a*b}x + ${c}`,`${b}x + ${a*c}`,`${a+b}x + ${a+c}`],'Distribute to both terms.','Multiply each term inside.');},
]);
addGens('g8_pfa1',[
 ()=>{const a=rng(2,5),b=rng(3,6),c=rng(2,5),d=rng(1,6);const X=a*b-c,K=-a*d+2*c;const T=(m,k)=>`${m===1?'':m===-1?'−':neg(m)}x${k===0?'':k<0?' − '+(-k):' + '+k}`;return mq('g8_pfa1',`Simplify: ${a}(${b}x − ${d}) − ${c}(x − 2)`,T(X,K),[T(X,-a*d-2*c),T(a*b+c,K),T(X,-a*d)],`${a*b}x − ${a*d} − ${c}x + ${2*c} = ${T(X,K)}.`,'Distribute −'+c+' to both terms.');},
 ()=>{const a=rng(2,4),b=rng(2,4);return mq('g8_pfa1',`Which is equivalent to ${a*b}x² + ${a*b*3}x?`,`${a*b}x(x + 3)`,[`${a*b}(x² + 3)`,`${a*b}x(x + ${a*b*3})`,`x(${a*b}x + 3)`],`Factor out ${a*b}x.`,'Find the GCF of both terms.');},
 ()=>{const w=rng(3,8);return mq('g8_pfa1',`A rectangle has width x and length x + ${w}. Which expression is its perimeter?`,`4x + ${2*w}`,[`2x + ${w}`,`x² + ${w}x`,`4x + ${w}`],`2(x) + 2(x + ${w}) = 4x + ${2*w}.`,'Add all four sides.');},
],true);
// 8.PFA.2 functions
addGens('g8_pfa2',[
 ()=>{const m=rng(2,5),b=rng(-5,5);const x=rng(-3,4);return mq('g8_pfa2',`If f(x) = ${m}x ${b<0?'− '+(-b):'+ '+b}, what is f(${neg(x)})?`,neg(m*x+b),[neg(m+x+b),neg(m*x-b),neg(m*(x+b))],`${m} × ${neg(x)} ${b<0?'− '+(-b):'+ '+b} = ${neg(m*x+b)}.`,'Substitute x.');},
]);
addGens('g8_pfa2',[
 ()=>{const xs=shuf([1,2,3,4,5]).slice(0,4);const dup=xs[0];const pairs=xs.map(x=>`(${x}, ${rng(-5,9)})`);pairs.push(`(${dup}, ${rng(10,15)})`);return mq('g8_pfa2',`Is this relation a function? {${pairs.join(', ')}}`,'No — an input has two different outputs.',['Yes — every output is different.','Yes — there are five pairs.','No — outputs repeat.'],`x = ${dup} is paired with two different y-values.`,'Look for a repeated x.');},
 ()=>{return mq('g8_pfa2','A graph passes the vertical line test. What does that tell you?','It is a function.',['It is linear.','It is not a function.','It has no domain.'],'Each x has only one y.','One output per input.');},
 ()=>{const ys=[rng(1,5),rng(6,9),rng(-4,0)];return mq('g8_pfa2',`f(x) is defined for x = 0, 1, 2 with outputs ${ys.join(', ')}. What is the range?`,`{${ys.slice().sort((a,b)=>a-b).map(neg).join(', ')}}`,['{0, 1, 2}',`{${ys.map(neg).join(', ')}, 0}`,`{${Math.min(...ys)}…${Math.max(...ys)}}`],'The range is the set of outputs.','Range = outputs.');},
],true);
// 8.PFA.3 linear functions
addGens('g8_pfa3',[
 ()=>{const m=rng(-5,5)||2,b=rng(-8,8);return mq('g8_pfa3',`What is the slope of ${lin(m,b)}?`,neg(m),[neg(b),neg(-m),neg(m+b)],`In y = mx + b, m is the slope: ${neg(m)}.`,'The number in front of x.');},
]);
addGens('g8_pfa3',[
 ()=>{const x1=rng(-4,2),y1=rng(-5,5),m=pick([-3,-2,2,3,1/2]),dx=m===1/2?4:rng(1,4);const x2=x1+dx,y2=y1+m*dx;return mq('g8_pfa3',`What is the slope of the line through (${neg(x1)}, ${neg(y1)}) and (${neg(x2)}, ${neg(y2)})?`,m===1/2?'1/2':neg(m),[m===1/2?'2':fr(1,m),m===1/2?'−1/2':neg(-m),neg(y2-y1)],`(${neg(y2)} − ${neg(y1)}) ÷ (${neg(x2)} − ${neg(x1)}) = ${m===1/2?'1/2':neg(m)}.`,'Rise over run.');},
 ()=>{const m=rng(2,5),b=rng(-6,6);const x=rng(1,4);return mq('g8_pfa3',`A line has slope ${m} and passes through (${x}, ${neg(m*x+b)}). What is its y-intercept?`,neg(b),[neg(m*x+b),neg(m),neg(b+m)],`${neg(m*x+b)} = ${m}(${x}) + b → b = ${neg(b)}.`,'Plug the point into y = mx + b.');},
 ()=>{const c=rng(15,40),r=rng(5,15);return mq('g8_pfa3',`A plumber charges $${c} to visit plus $${r} per hour. Which function gives the cost y for x hours?`,`y = ${r}x + ${c}`,[`y = ${c}x + ${r}`,`y = ${r+c}x`,`y = ${r}x − ${c}`],`Rate ${r} is the slope; the fee ${c} is the y-intercept.`,'Rate = slope, starting fee = intercept.');},
],true);
// 8.PFA.4 multistep equations
addGens('g8_pfa4',[
 ()=>{const x=rng(-6,9),a=rng(4,9),c=rng(1,a-1),b=rng(-10,10);const d=a*x+b-c*x;return mq('g8_pfa4',`Solve: ${a}x ${b<0?'− '+(-b):'+ '+b} = ${c===1?'':c}x ${d<0?'− '+(-d):'+ '+d}`,neg(x),[neg(-x),neg(x+1),neg(d-b)],`${a-c}x = ${neg(d-b)} → x = ${neg(x)}.`,'Get the x terms on one side.');},
]);
addGens('g8_pfa4',[
 ()=>{const x=rng(-5,8),a=rng(2,4),b=rng(1,6),c=rng(2,5);const R=a*(x+b)-c;const k=rng(1,a-1)||1;const L=R-k*x;return mq('g8_pfa4',`Solve: ${a}(x + ${b}) − ${c} = ${k===1?'':k}x ${L<0?'− '+(-L):'+ '+L}`,neg(x),[neg(x+2),neg(-x),neg(x*a)],`${a}x + ${a*b-c} = ${k}x + ${L}. ${a-k}x = ${L-(a*b-c)}. x = ${neg(x)}.`,'Distribute first.');},
 ()=>{const a=rng(2,6),b=rng(1,9);return mq('g8_pfa4',`How many solutions does ${a}x + ${b} = ${a}x + ${b+rng(1,5)} have?`,'no solution',['one solution','infinitely many','two solutions'],`Subtracting ${a}x leaves ${b} = a different number — false.`,'What happens when you subtract the x terms?');},
 ()=>{const a=rng(2,6),b=rng(1,9);return mq('g8_pfa4',`How many solutions does ${a}(x + ${b}) = ${a}x + ${a*b} have?`,'infinitely many',['no solution','one solution','exactly two'],`Both sides simplify to ${a}x + ${a*b}.`,'Simplify both sides.');},
],true);
// 8.PFA.5 multistep inequalities
addGens('g8_pfa5',[
 ()=>{const x=rng(-5,8),a=rng(2,6),b=rng(1,10);return mq('g8_pfa5',`Solve: ${a}x + ${b} < ${neg(a*x+b)}`,`x < ${neg(x)}`,[`x > ${neg(x)}`,`x < ${neg(x+1)}`,`x ≤ ${neg(x)}`],`${a}x < ${neg(a*x)} → x < ${neg(x)}.`,'Solve like an equation.');},
]);
addGens('g8_pfa5',[
 ()=>{const x=rng(-4,6),a=rng(2,5),b=rng(1,9),c=rng(1,3);const K=-a*x+b-c*x;return mq('g8_pfa5',`Solve: −${a}x + ${b} ≥ ${c===1?'':c}x${K===0?'':K<0?' − '+(-K):' + '+K}`,`x ≤ ${neg(x)}`,[`x ≥ ${neg(x)}`,`x ≤ ${neg(-x)}`,`x < ${neg(x)}`],`Move the x terms: −${a+c}x ≥ ${neg(K-b)}. Divide by −${a+c} and flip: x ≤ ${neg(x)}.`,'Dividing by a negative flips the sign.');},
 ()=>{const f=rng(20,60),r=rng(8,15),B=rng(150,300);const max=Math.floor((B-f)/r);return mq('g8_pfa5',`A party room costs $${f} plus $${r} per guest. The budget is $${B}. What is the most guests?`,max,[max+1,Math.floor(B/r),max-1].filter(x=>x!==max),`${f} + ${r}g ≤ ${B} → g ≤ ${r2((B-f)/r)} → ${max}.`,'Round down to a whole guest.');},
 ()=>{const n=rng(-3,3);return mq('g8_pfa5',`Which value is in the solution set of 2(x − 1) > ${2*n}?`,neg(n+2),[neg(n+1),neg(n),neg(n-2)],`2x − 2 > ${2*n} → x > ${n+1}. Only ${neg(n+2)} works.`,'Solve, then test each value.');},
],true);
// fix original Grade 8 expressions written as “1x”
(function(){const tidy=s=>typeof s==='string'?s.replace(/(^|[^\d.])1x/g,'$1x'):s;
['g8_pfa1','g8_pfa4','g8_pfa5','g7_pfa2','g7_pfa3'].forEach(g=>{const o=GEN[g];if(!o)return;GEN[g]=function(){const q=o();q.question=tidy(q.question);q.explanation=tidy(q.explanation);if(q.opts){q.opts=q.opts.map(tidy);q.answer=tidy(q.answer);}return q;};});})();
// Grade 8 reading
addQ('r8_vocab',[
 QI('The Latin root “cred” means believe. What does “credible” mean?','believable',['unbelievable','very loud','dangerous'],'Cred = believe.','Use the root.'),
 QI('Which word has a NEGATIVE connotation?','scheme',['plan','strategy','proposal'],'Scheme suggests a sneaky plan.','Which sounds sneaky?'),
 QH('“The politician’s speech was so verbose that the audience grew restless.” Verbose means…','using too many words',['very short','inspiring','whispered'],'The audience got restless from the length.','Why were they restless?'),
 QH('Which is an example of situational irony?','A fire station burns down.',['A sunny day at the beach.','A dog barks at a cat.','A student studies and passes.'],'The opposite of what you’d expect happens.','Unexpected outcome.'),
 QH('“Time is a thief.” What does this metaphor suggest?','Time takes things away from us without our noticing.',['Clocks are stolen often.','Time moves backward.','People steal watches.'],'Time “steals” moments.','What does a thief do?'),
 QH('The Greek root “phil” means love and “anthrop” means human. What is a philanthropist?','someone who helps others, often by donating money',['someone who studies insects','someone who hates people','a type of doctor'],'Love of humanity.','Love + human.'),
 QH('Which word is the best synonym for “meticulous”?','painstaking',['careless','hasty','sloppy'],'Both mean extremely careful.','Very careful.'),
 QH('“The news hit him like a ton of bricks.” This is a…','simile',['metaphor','personification','alliteration'],'It uses “like.”','Like or as.'),
]);
const F8A='Every afternoon, Mr. Okafor sat on his porch and waved at the kids walking home. Most ignored him. Tanya thought he was strange. One rainy day, Tanya’s bike chain snapped two blocks from home. She was struggling to push it uphill when a voice called out, “Bring it here.” Mr. Okafor had a toolbox open before she reached the steps. As he worked, she noticed photos on the wall: a younger Mr. Okafor in a mechanic’s uniform, holding a trophy. “Forty years fixing engines,” he said, handing back the bike. The next day, Tanya waved first.';
addQ('r8_fiction',[
 QP(F8A,'What does the detail about the photos reveal?','Mr. Okafor has a rich past and real skills.',['He likes to take pictures.','He used to race bikes.','He is lonely because he has no family.'],'The photos show his career as a mechanic.','What do the photos show?',true),
 QP(F8A,'How does Tanya’s attitude change?','from suspicious to friendly',['from friendly to suspicious','from angry to bored','it does not change'],'She thought he was strange; at the end she waves first.','Compare beginning and end.'),
 QP(F8A,'What is the theme?','People are often more than they first appear.',['Bikes break easily.','Rainy days are dangerous.','Never talk to neighbors.'],'Tanya misjudged Mr. Okafor.','What did Tanya learn about him?',true),
 QP(F8A,'What is the effect of the final sentence?','It shows Tanya’s change through action rather than telling.',['It shows she was rude.','It introduces a new conflict.','It explains how bikes work.'],'Waving first shows her new respect.','Show, don’t tell.',true),
 QP(F8A,'Which detail foreshadows that Mr. Okafor might help?','He waved at the kids every afternoon.',['Most kids ignored him.','It was raining.','The chain snapped.'],'His friendliness hints he would help.','Early hint of kindness.',true),
]);
const N8A='Article A: A town council proposes banning cars from Main Street on weekends. Supporters say pedestrian zones in other cities increased shop sales by up to 30 percent. Article B: Local shop owners argue that customers from outside town need parking close to stores. A survey of 50 shop owners found 32 opposed the plan. Both articles agree that Main Street needs more visitors.';
addQ('r8_nonfic',[
 QP(N8A,'What do Article A and Article B agree on?','Main Street needs more visitors.',['Cars should be banned.','Shop sales will fall.','Parking is unnecessary.'],'The last sentence states their agreement.','Look for “Both.”'),
 QP(N8A,'Which evidence supports Article B’s position?','32 of 50 shop owners opposed the plan.',['Sales rose 30 percent in other cities.','Main Street needs visitors.','Pedestrian zones exist elsewhere.'],'The survey supports the shop owners.','Which is B’s data?',true),
 QP(N8A,'What is a weakness of Article A’s evidence?','It comes from other cities that may differ from this town.',['It uses a survey.','It has no numbers.','It agrees with Article B.'],'Results elsewhere may not apply here.','Does other cities’ data fit this town?',true),
 QP(N8A,'How do the two articles mainly differ?','They disagree about whether banning cars helps businesses.',['One is fiction.','They are about different towns.','One supports more parking garages.'],'They take opposing positions.','What is each side’s claim?',true),
 QH('Which persuasive technique is used in “Join the thousands who already switched!”?','bandwagon',['expert testimony','statistics','rhetorical question'],'It urges you to join the crowd.','Everyone’s doing it.'),
 QH('A source is a website ending in .gov. What does that suggest?','It is a government source, often reliable for official data.',['It is always biased.','It is a personal blog.','It is a store.'],'.gov sites are official.','Government.'),
]);
// Grade 8 Physical Science
addQ('ps2',[
 QI('What is in the nucleus of an atom?','protons and neutrons',['electrons only','protons and electrons','only neutrons'],'The nucleus holds protons and neutrons.','Center.'),
 QI('What is an element’s atomic number?','the number of protons',['the number of neutrons','the mass','the number of shells'],'Atomic number = protons.','Protons define the element.'),
 QH('An atom has 11 protons, 12 neutrons and 11 electrons. What is its mass number?','23',['11','12','34'],'Mass number = protons + neutrons = 23.','Add the nucleus particles.'),
 QH('An atom gains an electron. What does it become?','a negative ion',['a positive ion','a new element','a neutron'],'Extra electron = negative charge.','Electrons are negative.'),
 QH('Two atoms have the same number of protons but different numbers of neutrons. They are…','isotopes',['ions','compounds','different elements'],'Isotopes vary in neutrons.','Same element, different mass.'),
 QH('Why do particles in a solid stay in place?','They are packed tightly and vibrate in fixed positions.',['They do not move at all.','They are larger.','They have no energy.'],'Solid particles vibrate in place.','Tight packing.'),
 QH('What happens to particle motion when a substance is heated?','Particles move faster.',['Particles stop.','Particles shrink.','Particles disappear.'],'Heat increases kinetic energy.','More energy.'),
]);
addQ('ps3',[
 QI('Which is a physical change?','ice melting',['wood burning','iron rusting','milk souring'],'Melting changes state, not substance.','Same substance.'),
 QI('What is density?','mass per unit volume',['weight times height','the color of matter','temperature'],'D = m/V.','Mass ÷ volume.'),
 QH('A block has mass 60 g and volume 20 cm³. What is its density?','3 g/cm³',['1,200 g/cm³','40 g/cm³','0.33 g/cm³'],'60 ÷ 20 = 3.','Mass ÷ volume.'),
 QH('Which is evidence of a chemical change?','a gas forms and the temperature changes',['the object changes shape','water evaporates','sugar dissolves'],'New substances often produce gas, heat or color changes.','New substance.'),
 QH('20 g of baking soda reacts with 50 g of vinegar in a sealed bag. What is the total mass after?','70 g',['less than 70 g','more than 70 g','0 g'],'Mass is conserved in a closed system.','Nothing escapes.'),
 QH('Will an object with density 0.8 g/cm³ float in water (1.0 g/cm³)?','Yes, it floats.',['No, it sinks.','It dissolves.','It depends on its color.'],'Less dense than water floats.','Compare densities.'),
 QH('Which is a mixture, not a compound?','air',['water','table salt','carbon dioxide'],'Air is a mix of gases.','Can it be separated physically?'),
]);
addQ('ps4',[
 QI('Rows on the periodic table are called…','periods',['groups','families','columns'],'Horizontal rows are periods.','Rows.'),
 QI('What is the chemical symbol for iron?','Fe',['Ir','I','In'],'Fe comes from the Latin “ferrum.”','Latin name.'),
 QH('Why do elements in Group 1 react strongly with water?','They have one valence electron they lose easily.',['They have full outer shells.','They are noble gases.','They have no electrons.'],'Alkali metals lose one electron easily.','One outer electron.'),
 QH('Which element is a metalloid?','silicon',['sodium','oxygen','neon'],'Silicon is along the staircase line.','Staircase.'),
 QH('Which group contains the halogens, such as chlorine?','Group 17',['Group 1','Group 2','Group 18'],'Halogens are in Group 17.','Next to the noble gases.'),
 QH('Moving left to right across a period, what generally increases?','the number of protons (atomic number)',['the number of shells','metallic properties','the size of the atom'],'Atomic number increases by one each step.','Count up.'),
 QH('What does the formula H₂O tell you?','Each molecule has 2 hydrogen atoms and 1 oxygen atom.',['2 oxygen and 1 hydrogen','It is an element','It has 3 molecules'],'Subscripts show atom counts.','Read the subscripts.'),
]);
addQ('ps5',[
 QI('Which transfers heat through a vacuum (empty space)?','radiation',['conduction','convection','insulation'],'Radiation needs no matter.','Sunlight reaches Earth.'),
 QI('Which is an insulator?','foam',['copper','aluminum','iron'],'Foam slows heat transfer.','Coolers.'),
 QH('A 2 kg ball moves at 3 m/s. What is its kinetic energy? (KE = ½mv²)','9 J',['6 J','18 J','3 J'],'½ × 2 × 3² = 9.','Square the speed.'),
 QH('If you double an object’s speed, what happens to its kinetic energy?','It becomes 4 times as large.',['It doubles.','It stays the same.','It halves.'],'KE depends on v².','Speed is squared.'),
 QH('Why does a metal spoon feel colder than a wooden spoon at the same temperature?','Metal conducts heat away from your hand faster.',['Metal is actually colder.','Wood makes heat.','Metal has no heat.'],'Conductors move heat quickly.','Heat flows out of your hand.'),
 QH('Which describes temperature?','the average kinetic energy of particles',['the total energy of an object','the mass of particles','the speed of light'],'Temperature measures average particle motion.','Average.'),
]);
addQ('ps6',[
 QI('What is amplitude related to in sound?','loudness',['pitch','speed','color'],'Bigger amplitude = louder.','Volume.'),
 QI('In which medium does sound travel fastest?','solids',['gases','a vacuum','liquids always'],'Particles are closest in solids.','Tightly packed.'),
 QH('A wave has frequency 5 Hz and wavelength 2 m. What is its speed?','10 m/s',['2.5 m/s','7 m/s','0.4 m/s'],'v = f × λ = 5 × 2 = 10.','Speed = frequency × wavelength.'),
 QH('Why can’t sound travel in outer space?','There are no particles to carry the vibrations.',['It is too cold.','It is too bright.','Sound is too slow.'],'Sound is a mechanical wave.','Needs matter.'),
 QH('If frequency increases and speed stays the same, what happens to wavelength?','It decreases.',['It increases.','It stays the same.','It doubles.'],'v = fλ; higher f means shorter λ.','Inverse.'),
 QH('Which type of wave moves particles back and forth in the same direction the wave travels?','longitudinal',['transverse','electromagnetic only','surface only'],'Sound is longitudinal.','Compression waves.'),
]);
addQ('ps7',[
 QI('Which color of visible light has the shortest wavelength?','violet',['red','yellow','green'],'Violet is at the short end.','ROYGBIV.'),
 QI('Which EM waves are used in microwave ovens?','microwaves',['X-rays','gamma rays','ultraviolet'],'Microwaves heat food.','In the name.'),
 QH('Why does a red apple look red?','It reflects red light and absorbs other colors.',['It absorbs red light.','It makes red light.','It reflects all colors.'],'We see reflected colors.','Reflection.'),
 QH('Which EM radiation can cause sunburn?','ultraviolet',['radio waves','infrared','microwaves'],'UV damages skin.','Sunscreen blocks it.'),
 QH('A concave lens…','spreads light rays apart',['brings light rays together','reflects all light','stops light completely'],'Concave lenses diverge light.','Caves in.'),
 QH('Which EM wave has the highest energy?','gamma rays',['radio waves','visible light','infrared'],'Shortest wavelength = highest energy.','Shortest wavelength.'),
]);
addQ('ps8',[
 QI('What is inertia?','the tendency of an object to resist changes in motion',['a force that speeds things up','gravity','friction only'],'Inertia is Newton’s first law idea.','Resists change.'),
 QI('Which unit measures force?','newton',['joule','watt','meter'],'Force is measured in newtons.','Named after Newton.'),
 QH('A 50 N force pushes a box 4 m. How much work is done?','200 J',['12.5 J','54 J','46 J'],'W = F × d = 50 × 4 = 200.','Force × distance.'),
 QH('Why do passengers lurch forward when a car stops suddenly?','Their bodies keep moving due to inertia.',['The seat pushes them.','Gravity increases.','The car speeds up.'],'Objects in motion stay in motion.','First law.'),
 QH('The same force pushes a 2 kg cart and a 4 kg cart. Which accelerates more?','the 2 kg cart',['the 4 kg cart','they accelerate equally','neither moves'],'a = F/m; smaller mass, larger acceleration.','Second law.'),
 QH('What is the difference between speed and velocity?','Velocity includes direction.',['Speed includes direction.','They are exactly the same.','Velocity has no units.'],'Velocity is speed in a direction.','Direction.'),
 QH('A runner goes 400 m in 80 s. What is the average speed?','5 m/s',['320 m/s','0.2 m/s','480 m/s'],'400 ÷ 80 = 5.','Distance ÷ time.'),
]);
addQ('ps9',[
 QI('What is electric current?','the flow of electric charge',['stored charge only','a type of magnet','light energy'],'Current is moving charge.','Flow.'),
 QI('What does a generator do?','converts mechanical energy into electrical energy',['converts electricity into motion','stores energy','creates magnets from light'],'Generators use motion and magnets.','Spinning makes electricity.'),
 QH('Using Ohm’s law (V = I × R), what is the current with 12 V across 4 Ω?','3 A',['48 A','16 A','8 A'],'I = V/R = 12/4 = 3.','Divide voltage by resistance.'),
 QH('How is an electric motor different from a generator?','A motor turns electrical energy into motion.',['A motor makes electricity from motion.','They are identical.','A motor stores charge.'],'Motors and generators do opposite conversions.','Opposites.'),
 QH('Why does adding more batteries in series make a bulb brighter?','It increases the voltage.',['It lowers the voltage.','It removes resistance.','It creates static.'],'Series batteries add voltages.','Voltages add.'),
 QH('What surrounds every current-carrying wire?','a magnetic field',['a gravitational field only','a sound wave','nothing'],'Current creates magnetism.','Electromagnetism.'),
]);
// Grade 8 writing
addQ('w8_write',[
 QI('What is a counterclaim?','an opposing argument',['the thesis','a citation','a conclusion'],'Counterclaims present the other side.','The other side.'),
 QI('Which signal phrase best introduces an expert quote?','As Dr. Lee, a marine biologist, explains,',['Somebody said,','I heard that,','Everyone knows,'],'Identify the expert’s credentials.','Who is the expert?'),
 QH('Which sentence is the strongest rebuttal?','While some say uniforms limit expression, students can still express themselves through clubs, art and speech.',['Uniforms are good.','Critics are wrong.','I don’t care what others think.'],'A rebuttal acknowledges and answers the counterclaim.','Acknowledge, then answer.'),
 QH('Which in-text citation is formatted correctly (MLA style)?','“Recycling rates doubled” (Smith 12).',['“Recycling rates doubled” Smith, page 12.','(12 Smith) “Recycling rates doubled.”','“Recycling rates doubled” [Smith].'],'MLA uses (Author page).','Author and page in parentheses.'),
 QH('Which is an example of a logical fallacy?','“If we allow phones at lunch, soon students will use them during tests.”',['“A study of 500 students found…”','“According to the CDC…”','“Data from 2023 show…”'],'This is a slippery slope.','Does one step really lead to the extreme?'),
 QH('What is the purpose of a conclusion in an argument essay?','to restate the claim and leave a lasting impression',['to add new evidence','to start a new topic','to list sources'],'Conclusions reinforce the argument.','Wrap up.'),
]);
addQ('w8_edit',[
 QP('The cake was eaten by the children.','Which revision uses ACTIVE voice?','The children ate the cake.',['The cake had been eaten.','The cake was eaten.'],'Active voice puts the doer first.','Who did the action?'),
 QP('If I was taller, I would play basketball.','Which uses the correct subjunctive mood?','If I were taller, I would play basketball.',['If I am taller, I would play basketball.','If I be taller, I would play basketball.'],'Hypotheticals use “were.”','Contrary to fact.',true),
 QP('She likes hiking, to swim, and riding bikes.','Which revision is parallel?','She likes hiking, swimming, and riding bikes.',['She likes to hike, swimming, and riding bikes.','She likes hiking, to swim, and to ride bikes.'],'All items should be the same form.','Match the -ing forms.',true),
 QP('When Jake met Omar, he was nervous.','Why is this sentence unclear?','“He” could mean Jake or Omar.',['It has no verb.','It is a fragment.','It uses passive voice.'],'The pronoun reference is ambiguous.','Who was nervous?',true),
 QP('Each of the players have their own locker.','Which is the CORRECT version?','Each of the players has his or her own locker.',['Each of the players have his own locker.','Each of the player has their own locker.'],'“Each” is singular.','Each = one.',true),
 QP('Close the door!','What is the purpose of the imperative mood in this sentence?','give a command',['ask a question','state a fact','express a wish'],'Imperatives command or request.','Command.'),
]);
// Grade 8 World Geography (extra items)
addQ('wg1',[
 QI('What do lines of latitude measure?','distance north or south of the equator',['distance east or west of the prime meridian','elevation','time zones only'],'Latitude runs parallel to the equator.','Like rungs of a ladder.'),
 QI('What is GIS?','a computer system for layering and analyzing map data',['a type of compass','a weather balloon','a globe'],'Geographic Information Systems layer data.','Computer maps.'),
 QH('Why does a Mercator projection make Greenland look as large as Africa?','It stretches areas near the poles.',['Greenland really is that big.','It shrinks the equator only.','It is a globe.'],'Mercator distorts size at high latitudes.','Distortion near poles.'),
 QH('What is a formal region?','an area defined by a shared characteristic, like a language or climate',['an area connected by a center, like a delivery zone','an area based on feelings','a single city block'],'Formal regions share traits.','Shared trait.'),
 QH('What is a functional region?','an area organized around a central place, like a newspaper’s delivery area',['an area with one climate','an imaginary region','a mountain range'],'Functional regions have a hub.','Hub and links.'),
 QH('Which coordinates are closest to Virginia?','38°N, 78°W',['38°S, 78°E','0°, 0°','78°N, 38°W'],'Virginia is in the Northern and Western Hemispheres.','North and West.'),
]);
addQ('wg2',[
 QI('Which is a capital resource?','a factory machine',['a forest','a worker','oil underground'],'Capital resources are human-made tools.','Made by people.'),
 QI('Which is a renewable natural resource?','timber that is replanted',['coal','natural gas','iron ore'],'Trees can regrow.','Can it regrow?'),
 QH('Why do countries with few natural resources, like Japan, still have strong economies?','They invest in human and capital resources such as education and technology.',['They have hidden oil.','They do not trade.','They mine gold everywhere.'],'Skills and technology drive growth.','People and tools.'),
 QH('Why is fresh water a growing global concern?','Demand is rising while supplies are limited and uneven.',['Oceans are shrinking.','Rain stopped worldwide.','Ice is a nonrenewable resource.'],'Population growth strains water.','Supply and demand.'),
 QH('What does “resource distribution” mean?','where resources are found around the world',['how resources are recycled','who owns stores','the price of resources'],'Resources are unevenly spread.','Where.'),
 QH('How can a country gain resources it lacks?','through trade',['by printing money','by ignoring them','by renaming them'],'Trade connects resources.','Exchange.'),
]);
addQ('wg3',[
 QI('Which river forms part of the U.S.–Canada border and connects the Great Lakes to the Atlantic?','the St. Lawrence River',['the Mississippi','the Rio Grande','the Colorado'],'The St. Lawrence Seaway links the Great Lakes to the ocean.','Seaway.'),
 QI('Which two languages are official in Canada?','English and French',['English and Spanish','French and German','English and Inuktitut only'],'Canada is officially bilingual.','Quebec.'),
 QH('Why is the Canadian Shield important?','It is rich in minerals.',['It is the best farmland.','It is a desert.','It is a volcano chain.'],'The Shield has ancient mineral-rich rock.','Mining.'),
 QH('Why do most Canadians live near the U.S. border?','The climate is milder and the land better for farming and cities.',['The north has more jobs.','Laws require it.','The north is too hot.'],'Southern Canada is warmer.','Climate.'),
 QH('How did the Mississippi River system help U.S. economic growth?','It moved farm and industrial goods to the Gulf of Mexico.',['It blocked trade.','It connects to the Pacific.','It flows north to Canada.'],'A major shipping route.','Barges.'),
 QH('Which landform region covers much of the central U.S. and Canada and is known for grain farming?','the Great Plains (Interior Plains)',['the Rocky Mountains','the Appalachian Mountains','the Coastal Plain'],'Flat, fertile land grows wheat.','Breadbasket.'),
]);
addQ('wg4',[
 QI('Which river carries the most water in the world?','the Amazon',['the Nile','the Mississippi','the Orinoco'],'The Amazon has the greatest flow.','Rainforest.'),
 QI('What is the main language of Brazil?','Portuguese',['Spanish','French','English'],'Brazil was a Portuguese colony.','Not Spanish!'),
 QH('How does elevation affect farming in the Andes?','Different crops grow at different heights because temperature changes.',['Only one crop grows anywhere.','Higher is always warmer.','Elevation does not matter.'],'Vertical climate zones.','Altitude zones.'),
 QH('Why is the Panama Canal important?','It shortens shipping routes between the Atlantic and Pacific.',['It connects Brazil to Mexico.','It is a river in Argentina.','It brings water to deserts.'],'Ships avoid going around South America.','Shortcut.'),
 QH('Why is deforestation of the Amazon a global concern?','The rainforest absorbs carbon dioxide and holds huge biodiversity.',['It makes the river longer.','It increases rainfall worldwide.','It creates new mountains.'],'The Amazon affects climate and species.','Carbon and species.'),
 QH('Which European countries colonized most of Latin America?','Spain and Portugal',['France and Germany','England and Italy','Russia and Norway'],'Hence Spanish and Portuguese languages.','Languages.'),
]);
addQ('wg5',[
 QI('Which river flows through many European countries and empties into the Black Sea?','the Danube',['the Thames','the Seine','the Volga'],'The Danube crosses many nations.','Central Europe.'),
 QI('What is the European Union?','a group of European countries that cooperate economically and politically',['a single country','a mountain range','a military alliance only'],'The EU shares trade rules and many use the euro.','Cooperation.'),
 QH('Why does Western Europe have milder winters than places at the same latitude in Canada?','The North Atlantic Drift (Gulf Stream) brings warm water.',['It is closer to the equator.','It has more mountains.','It is at a lower elevation everywhere.'],'Warm ocean currents moderate climate.','Ocean current.'),
 QH('How did the Alps affect European history?','They formed a natural barrier between regions.',['They made travel easy.','They are in Spain only.','They caused the Industrial Revolution.'],'Mountains divide regions.','Barrier.'),
 QH('Why did the Industrial Revolution begin in Great Britain?','It had coal, iron, capital and a good transportation network.',['It had no resources.','It was isolated from trade.','It had no rivers.'],'Resources and capital came together.','Coal and iron.'),
 QH('What does the euro show about the EU?','Many members share a common currency to make trade easier.',['All EU countries use the dollar.','No EU countries share money.','It is a language.'],'A common currency.','Money.'),
]);
addQ('wg6',[
 QI('Which mountains divide European Russia from Asian Russia?','the Ural Mountains',['the Alps','the Himalayas','the Andes'],'The Urals are the traditional boundary.','Urals.'),
 QI('What is the taiga?','a vast coniferous forest',['a desert','a grassland','an ocean'],'The taiga is the world’s largest forest biome.','Evergreens.'),
 QH('Why are many of Russia’s ports frozen for part of the year?','Most of its coastline is in the far north.',['It has no coastline.','It is near the equator.','Its ports are in deserts.'],'Arctic coasts freeze.','North.'),
 QH('What happened to the Aral Sea?','It shrank dramatically after rivers were diverted for irrigation.',['It grew larger.','It became a river.','It froze permanently.'],'Irrigation drained its sources.','Human change.'),
 QH('Why is the Trans-Siberian Railway important?','It connects distant parts of a huge country.',['It goes to Africa.','It is underwater.','It is the shortest railway.'],'It links Moscow to the Pacific.','Distance.'),
 QH('What is permafrost?','ground that stays frozen all year',['a type of rainfall','a warm desert','a river'],'Found in tundra.','Permanent frost.'),
]);
addQ('wg7',[
 QI('What is the Sahel?','a semiarid strip south of the Sahara',['a rainforest','an island','a mountain'],'The Sahel is a transition zone.','Edge.'),
 QI('Which is Africa’s highest mountain?','Mount Kilimanjaro',['Mount Everest','Mont Blanc','Mount Kenya only'],'Kilimanjaro is in Tanzania.','Tanzania.'),
 QH('What is desertification?','fertile land turning into desert, often from drought and overuse',['deserts turning into forests','making sand into glass','a type of rain'],'A major issue in the Sahel.','Spreading desert.'),
 QH('Why are many African rivers hard to use for long-distance shipping?','Waterfalls and rapids block travel.',['They flow uphill.','They are always frozen.','They are too wide.'],'Plateaus cause falls near coasts.','Waterfalls.'),
 QH('How did European colonization affect African borders?','Borders were drawn without regard to ethnic groups, causing conflicts.',['Borders followed every ethnic group exactly.','There were no borders.','Borders were drawn by Africans only.'],'Colonial borders split groups.','Arbitrary lines.'),
 QH('Which biome covers much of East Africa and supports large herds of animals?','savanna',['tundra','taiga','polar desert'],'Grasslands with scattered trees.','Grassland.'),
]);
addQ('wg8',[
 QI('Which is the world’s largest hot desert?','the Sahara',['the Gobi','the Atacama','the Kalahari'],'The Sahara covers much of North Africa.','North Africa.'),
 QI('Which resource is most abundant in the Persian Gulf region?','oil',['coal','timber','gold'],'The region holds huge oil reserves.','Petroleum.'),
 QH('Why is the Suez Canal strategically important?','It connects the Mediterranean and Red Sea, shortening routes between Europe and Asia.',['It brings water to farms only.','It is in Turkey.','It connects to the Pacific.'],'A key global chokepoint.','Shortcut.'),
 QH('Why do most Egyptians live near the Nile?','The river provides water and fertile land in a desert.',['The desert is cooler.','The Nile is salty.','Laws require it.'],'Water in the desert.','Oasis effect.'),
 QH('What is a major challenge for countries in this region?','scarce fresh water',['too much rainfall','too much farmland','frozen soil'],'Desalination and conflicts over water.','Water.'),
 QH('Which city is sacred to Judaism, Christianity and Islam?','Jerusalem',['Cairo','Dubai','Istanbul'],'Jerusalem holds holy sites for all three.','Three faiths.'),
]);
addQ('wg9',[
 QI('What is a monsoon?','a seasonal wind that brings heavy rain or dry weather',['a type of mountain','a desert storm only','an earthquake'],'Monsoons shape South Asian farming.','Seasonal winds.'),
 QI('Which river is sacred in Hinduism?','the Ganges',['the Mekong','the Yangtze','the Nile'],'The Ganges is holy in Hinduism.','India.'),
 QH('Why do the Himalayas affect climate in South Asia?','They block cold air from the north and force monsoon rains to fall.',['They create deserts in India.','They have no effect.','They warm the ocean.'],'Mountains shape rainfall.','Barrier.'),
 QH('Why is rice a major crop in Southeast Asia?','Heavy rains and river deltas create flooded fields ideal for rice.',['The region is very dry.','Rice needs snow.','It grows only in mountains.'],'Rice needs lots of water.','Wet fields.'),
 QH('The Strait of Malacca is important because…','it is one of the busiest shipping lanes in the world',['it is a mountain pass','it is a desert','it is a frozen sea'],'A chokepoint between the Indian and Pacific oceans.','Shipping.'),
 QH('Which country is made of thousands of islands in Southeast Asia?','Indonesia',['India','Nepal','Laos'],'Indonesia has over 17,000 islands.','Archipelago.'),
]);
addQ('wg10',[
 QI('What is the Ring of Fire?','an area around the Pacific with many volcanoes and earthquakes',['a desert in China','a ring of islands in Africa','a festival'],'Tectonic plates meet around the Pacific.','Pacific.'),
 QI('Which river is the longest in Asia?','the Yangtze',['the Huang He','the Ganges','the Mekong'],'The Yangtze flows across China.','China.'),
 QH('Why does Japan import many natural resources?','It has few mineral and energy resources.',['It has too many.','It refuses to trade.','It is very large.'],'Japan relies on imports.','Few resources.'),
 QH('What was a purpose of the Three Gorges Dam?','to control flooding and generate hydroelectric power',['to drain the Yangtze','to build a canal to India','to create a desert'],'It is the world’s largest power station.','Flooding and power.'),
 QH('Why is most of western China sparsely populated?','It has deserts and high mountains.',['It is all coastline.','It is too warm.','It has the most rainfall.'],'Harsh terrain limits settlement.','Terrain.'),
 QH('Which landform region of China is the world’s highest plateau?','the Plateau of Tibet',['the North China Plain','the Gobi','the Loess Plateau'],'Called the “roof of the world.”','Roof of the world.'),
]);
addQ('wg11',[
 QI('What is the Outback?','the dry interior of Australia',['a rainforest in New Zealand','a coral reef','a mountain range'],'Most of Australia is arid.','Interior.'),
 QI('What is the Great Barrier Reef?','the world’s largest coral reef system',['a mountain','a desert','a river'],'Off northeast Australia.','Coral.'),
 QH('Why do most Australians live along the coasts?','The interior is very dry and hot.',['The coasts are colder.','Laws require it.','The interior is all water.'],'Water and climate shape settlement.','Water.'),
 QH('What threatens the Great Barrier Reef?','warming oceans that cause coral bleaching',['too many mountains','cold weather','volcanic dust only'],'Heat stresses coral.','Warming.'),
 QH('How did New Zealand’s islands form?','volcanic and tectonic activity',['glaciers only','sand deposits','coral only'],'Plate boundaries created them.','Ring of Fire.'),
 QH('Why are Australia’s animals, like kangaroos, found nowhere else?','The continent was isolated for millions of years.',['They were brought from Europe.','They migrate yearly.','They live in all continents.'],'Isolation led to unique species.','Isolation.'),
]);
addQ('wg12',[
 QI('What is population density?','the number of people per unit of area',['the total population','birth rate only','the size of a country'],'People per square mile or km.','Per area.'),
 QI('Which factor usually indicates a high standard of living?','high literacy rate',['high infant mortality','low life expectancy','low income'],'Literacy reflects education.','Education.'),
 QH('A country has 50 million people and 250,000 square miles. What is its population density?','200 people per square mile',['5,000 per square mile','2 per square mile','12,500 per square mile'],'50,000,000 ÷ 250,000 = 200.','Divide people by area.'),
 QH('Why do some countries have rapidly growing populations?','high birth rates and falling death rates',['low birth rates','high emigration only','very cold climates'],'Better health lowers death rates.','Births vs. deaths.'),
 QH('What is GDP per capita?','the value of goods and services produced divided by the population',['the number of people','the size of land','the number of cities'],'It measures average economic output.','Per person.'),
 QH('An aging population can cause which challenge?','fewer workers to support retirees',['too many schools','too many babies','more farmland'],'Retirees outnumber workers.','Workers vs. retirees.'),
]);
addQ('wg13',[
 QI('A war forces people to leave their country. This is a…','push factor',['pull factor','natural barrier','trade route'],'Push factors drive people away.','Away from.'),
 QI('Good jobs in another country are a…','pull factor',['push factor','refugee','barrier'],'Pull factors attract people.','Toward.'),
 QH('What is a refugee?','a person forced to flee their country because of danger',['a tourist','a person who moves for vacation','a business traveler'],'Refugees flee war or persecution.','Forced.'),
 QH('How can migration benefit the receiving country?','It can bring workers and new skills.',['It always reduces jobs.','It stops trade.','It shrinks cities.'],'Migrants contribute labor and ideas.','Workers.'),
 QH('What is internal migration?','moving within the same country',['moving to another country','traveling for a day','a type of trade'],'Like moving from a farm to a city.','Within.'),
 QH('Which is an example of a physical barrier to migration?','a large desert or mountain range',['a job offer','family overseas','a new school'],'Physical features can block movement.','Geography.'),
]);
addQ('wg14',[
 QI('What is cultural diffusion?','the spread of ideas and customs from one place to another',['the end of a culture','a kind of map','a mountain'],'Trade and migration spread culture.','Spread.'),
 QI('Which is an example of cultural diffusion?','pizza becoming popular around the world',['a mountain eroding','rain falling','a river freezing'],'Food spread from Italy.','Spread of a custom.'),
 QH('How has the internet changed cultural diffusion?','It spreads ideas instantly across the globe.',['It stopped it.','It made it slower.','It only spreads weather.'],'Global and instant.','Speed.'),
 QH('What is a lingua franca?','a common language used between speakers of different languages',['a type of food','a holiday','a country'],'English is often used this way.','Shared language.'),
 QH('Why might a culture resist diffusion?','to protect traditions and identity',['to grow faster','because diffusion is illegal everywhere','to learn more languages'],'Some groups preserve traditions.','Identity.'),
 QH('What is an example of an artifact of culture?','traditional clothing',['a hurricane','the equator','a fault line'],'Artifacts are things people make.','Made by people.'),
]);
addQ('wg15',[
 QI('What is urbanization?','the growth of cities as people move from rural areas',['the growth of farms','building roads only','a type of climate'],'Cities grow.','Urban = city.'),
 QI('Where do cities often develop?','near rivers, coasts and trade routes',['on mountain peaks only','in deserts far from water','in the middle of oceans'],'Access to water and trade.','Water and trade.'),
 QH('What is a megacity?','a city with more than 10 million people',['a city with 10,000 people','a farm town','a capital city only'],'Examples: Tokyo, Lagos.','10 million.'),
 QH('Which problem often comes with rapid urbanization?','overcrowding and informal housing',['too much farmland','fewer jobs everywhere','cleaner air'],'Growth outpaces services.','Crowding.'),
 QH('Why do people move from rural areas to cities in developing countries?','for jobs, schools and health care',['for more farmland','to avoid all services','for colder weather'],'Opportunity draws people.','Opportunity.'),
 QH('What is a site factor for a city?','the physical features of its location, like a harbor',['its distance to other cities only','its population','its government'],'Site = physical setting.','Physical.'),
]);
addQ('wg16',[
 QI('What is globalization?','the increasing connection of the world through trade, travel and communication',['a type of map','one country ruling the world','a weather pattern'],'Interconnection.','Connected.'),
 QI('What is a multinational corporation?','a company that operates in many countries',['a company in one town','a government','a charity only'],'Many countries.','Multi = many.'),
 QH('How can globalization help consumers?','More goods at lower prices.',['Fewer choices.','Higher prices always.','No trade.'],'Competition and trade.','Choices.'),
 QH('What is one criticism of globalization?','Some workers lose jobs when factories move overseas.',['It reduces trade.','It ends the internet.','It stops all travel.'],'Jobs can shift.','Jobs move.'),
 QH('Why are container ships important to globalization?','They move huge amounts of goods cheaply.',['They carry only people.','They are faster than planes for small packages.','They stopped being used.'],'Shipping containers transformed trade.','Cheap shipping.'),
 QH('What does interdependence mean?','countries rely on each other for goods and services',['countries never trade','one country makes everything','trade is banned'],'Mutual reliance.','Rely on each other.'),
]);
addQ('wg17',[
 QI('What is a chokepoint?','a narrow passage that controls access between larger areas',['a large ocean','a mountain peak','a capital city'],'Example: Strait of Hormuz.','Narrow passage.'),
 QI('What is a natural boundary?','a border formed by a physical feature like a river',['a straight line drawn on a map','a road','a fence'],'Rivers and mountains often form borders.','Physical feature.'),
 QH('Why might countries that share a river have conflicts?','They may disagree about dams and water use.',['Rivers are always frozen.','Rivers cannot cross borders.','Rivers have no value.'],'Upstream dams affect downstream countries.','Upstream vs. downstream.'),
 QH('The Strait of Hormuz is important because…','much of the world’s oil passes through it',['it is a desert','it is in South America','it is a freshwater lake'],'A key oil chokepoint.','Oil.'),
 QH('What is a geometric boundary?','a border drawn along latitude, longitude or straight lines',['a border along a river','a mountain range','a coastline'],'Example: much of the U.S.–Canada border.','Straight lines.'),
 QH('Why do nations cooperate through organizations like the United Nations?','to solve shared problems such as conflict, disease and climate',['to stop all trade','to erase borders','to choose one language'],'Cooperation on global issues.','Shared problems.'),
]);
})();

