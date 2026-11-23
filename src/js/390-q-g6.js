// ── GRADE 6: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana','Kofi','Grace','Yaw','Ama'];
const gcd=(a,b)=>b?gcd(b,a%b):a;const fr=(n,d)=>{if(d<0){n=-n;d=-d;}const g=Math.abs(gcd(n,d));return d/g===1?String(n/g):`${n/g}/${d/g}`;};
const neg=n=>n<0?'−'+Math.abs(n):String(n);const sg=n=>n<0?`(−${Math.abs(n)})`:`(+${n})`;
const r2=x=>Math.round(x*100)/100;
// 6.NS.1 fractions, decimals, percents
addGens('g6_fdp',[
 ()=>{const p=pick([[1,8,12.5],[3,8,37.5],[2,5,40],[3,5,60],[7,10,70],[1,20,5],[3,20,15]]);return mq('g6_fdp',`Write ${p[0]}/${p[1]} as a percent.`,`${p[2]}%`,[`${p[0]}${p[1]}%`,`${p[2]/10}%`,`${p[2]+10}%`],`${p[0]} ÷ ${p[1]} = ${p[2]/100}, which is ${p[2]}%.`,'Divide, then multiply by 100.');},
]);
addGens('g6_fdp',[
 ()=>{const a=pick([[3,5],[5,8],[2,3],[7,10],[4,5]]);const pct=pick([55,62,68,72,85]);const d=r2(pick([0.58,0.66,0.7,0.81,0.63]));const items=[[`${a[0]}/${a[1]}`,a[0]/a[1]],[`${pct}%`,pct/100],[String(d),d]].sort((x,y)=>x[1]-y[1]);if(new Set(items.map(x=>x[1])).size<3)return mq('g6_fdp','Which is greatest: 0.6, 5/8, or 58%?','5/8',['0.6','58%'],'5/8 = 0.625, the largest.','Change all to decimals.');return mq('g6_fdp',`Order from least to greatest: ${shuf(items.map(x=>x[0])).join(', ')}`,items.map(x=>x[0]).join(', '),[items.slice().reverse().map(x=>x[0]).join(', '),[items[1][0],items[0][0],items[2][0]].join(', '),[items[0][0],items[2][0],items[1][0]].join(', ')],`As decimals: ${items.map(x=>x[0]+' = '+r2(x[1])).join(', ')}.`,'Change everything to decimals.');},
 ()=>{const price=rng(4,16)*5,pct=pick([10,20,25,30,40]);const sale=price*(100-pct)/100;const tax=0;return mq('g6_fdp',`A $${price} jacket is ${pct}% off. Then you use a $5 coupon. What do you pay?`,'$'+(sale-5).toFixed(2),['$'+sale.toFixed(2),'$'+(price-pct-5).toFixed(2),'$'+(price*pct/100+5).toFixed(2)],`${pct}% of $${price} is $${r2(price*pct/100)}. $${price} − $${r2(price*pct/100)} = $${r2(sale)}. Then − $5 = $${r2(sale-5)}.`,'Take the percent off first, then the coupon.');},
 ()=>{const n=pick([0.125,0.375,0.625,0.875]);const m={0.125:'1/8',0.375:'3/8',0.625:'5/8',0.875:'7/8'};return mq('g6_fdp',`Write ${n} as a fraction in simplest form.`,m[n],[`${n*1000}/100`,`${n*1000}/1000`,'1/4'],`${n} = ${n*1000}/1000 = ${m[n]}.`,'Write over 1,000 and simplify.');},
 ()=>{const t=rng(4,12)*10,p=pick([15,35,45,65]);return mq('g6_fdp',`${p}% of a class of ${t} students ride the bus. How many students do NOT ride the bus?`,t-t*p/100,[t*p/100,t-t*p/100+5,100-p],`${p}% of ${t} = ${t*p/100}. ${t} − ${t*p/100} = ${t-t*p/100}.`,'Find the bus riders first.');},
],true);
// 6.NS.2 integers
addGens('g6_intns',[
 ()=>{const a=rng(-20,-1),b=rng(-20,20);if(a===b)return mq('g6_intns','Which is greater: −3 or −8?','−3',['−8','They are equal'],'−3 is to the right of −8 on a number line.','Farther right is greater.');const g=Math.max(a,b);return mq('g6_intns',`Which is greater: ${neg(a)} or ${neg(b)}?`,neg(g),[neg(Math.min(a,b)),'They are equal'],`${neg(g)} is farther right on the number line.`,'Picture a number line.');},
]);
addGens('g6_intns',[
 ()=>{const a=rng(2,15),b=rng(2,15);return mq('g6_intns',`What is the distance between ${neg(-a)} and ${b} on a number line?`,a+b,[Math.abs(b-a),b,a],`|${neg(-a)}| + |${b}| = ${a+b}.`,'Distance to zero on each side, then add.');},
 ()=>{const v=shuf([-rng(1,5),rng(1,5),-rng(6,12),0]);const sorted=v.slice().sort((x,y)=>Math.abs(x)-Math.abs(y)||x-y);return mq('g6_intns',`Which number has the GREATEST absolute value? ${v.map(neg).join(', ')}`,neg(v.reduce((m,x)=>Math.abs(x)>Math.abs(m)?x:m)),v.filter(x=>x!==v.reduce((m,x)=>Math.abs(x)>Math.abs(m)?x:m)).map(neg),'Absolute value is distance from zero.','Ignore the signs.');},
 ()=>{const a=rng(3,9),b=rng(2,8);return mq('g6_intns',`True or false: −${a} > −${a+b}`,'true',['false','cannot tell'],`−${a} is closer to zero, so it is greater than −${a+b}.`,'Negative numbers closer to zero are greater.');},
 ()=>{const t=rng(-15,-2),d=rng(5,20);return mq('g6_intns',`At 6 a.m. it was ${neg(t)}°F. By noon it was ${d}°F. How many degrees did it rise?`,d-t,[d+t,d,Math.abs(t)],`From ${neg(t)} to 0 is ${-t}, then to ${d} is ${d}. Total ${d-t}.`,'Count up to zero, then past it.');},
],true);
// 6.NS.3 exponents
addGens('g6_exp',[
 ()=>{const b=rng(2,5),e=rng(2,4);return mq('g6_exp',`What is ${b}^${e}?`.replace('^'+e,['','','²','³','⁴'][e]),b**e,[b*e,b**e+b,b**(e-1)],`${b} multiplied by itself ${e} times = ${b**e}.`,'Not ${b} × ${e}!'.replace('${b}',b).replace('${e}',e));},
]);
addGens('g6_exp',[
 ()=>{const n=rng(5,15);const sq=n*n;return mq('g6_exp',`Between which two whole numbers is √${sq+rng(2,n)}?`,`${n} and ${n+1}`,[`${n-1} and ${n}`,`${n+1} and ${n+2}`,`${sq} and ${sq+1}`],`${n}² = ${sq} and ${n+1}² = ${(n+1)**2}.`,'Find the perfect squares around it.');},
 ()=>{const e=rng(3,6),k=rng(2,9);return mq('g6_exp',`What is ${k} × 10${['','','²','³','⁴','⁵','⁶'][e]}?`,(k*10**e).toLocaleString('en-US'),[(k*10**(e-1)).toLocaleString('en-US'),(k*10**(e+1)).toLocaleString('en-US'),String(k*10*e)],`10${['','','²','³','⁴','⁵','⁶'][e]} = ${(10**e).toLocaleString('en-US')}. ${k} × ${(10**e).toLocaleString('en-US')} = ${(k*10**e).toLocaleString('en-US')}.`,'The exponent tells how many zeros.');},
 ()=>{const a=rng(2,4),b=rng(2,3);return mq('g6_exp',`Evaluate: ${a}² + ${b}³`,a*a+b**3,[a*2+b*3,(a+b)**2,a*a*b**3],`${a*a} + ${b**3} = ${a*a+b**3}.`,'Do each power first.');},
 ()=>{const s=pick([36,49,64,81,100,121,144]);return mq('g6_exp',`A square garden has an area of ${s} m². What is the length of one side?`,`${Math.sqrt(s)} m`,[`${s/4} m`,`${s/2} m`,`${Math.sqrt(s)+1} m`],`√${s} = ${Math.sqrt(s)}.`,'Area of a square = side².');},
],true);
// 6.CE.1 fraction operations
addGens('g6_ops',[
 ()=>{const a=rng(1,5),b=rng(a+1,8),c=rng(1,5),d=rng(c+1,9);return mq('g6_ops',`${a}/${b} × ${c}/${d} = ?`,fr(a*c,b*d),[fr(a+c,b+d),fr(a*d,b*c),fr(a*c+1,b*d)],`Multiply tops and bottoms: ${a*c}/${b*d}${gcd(a*c,b*d)>1?' = '+fr(a*c,b*d):''}.`,'Multiply straight across.');},
]);
addGens('g6_ops',[
 ()=>{const w=rng(1,3),n=rng(1,3),d=4;const im=w*d+n;const k=pick([2,3]);return mq('g6_ops',`${w} ${n}/${d} × ${k} = ?`,(()=>{const t=im*k;return Math.floor(t/d)+(t%d?' '+fr(t%d,d):'');})(),[`${w*k} ${n}/${d}`,`${w+k} ${n}/${d}`,(()=>{const t=im*k+1;return Math.floor(t/d)+(t%d?' '+fr(t%d,d):'');})()],`${w} ${n}/${d} = ${im}/${d}. × ${k} = ${im*k}/${d}.`,'Change to an improper fraction first.');},
 ()=>{const total=pick([3,4,5,6]),part=pick([[1,2],[1,3],[1,4],[3,4],[2,3]]);const ans=total*part[1]/part[0];return mq('g6_ops',`How many ${part[0]}/${part[1]}-cup servings are in ${total} cups of rice?`,fr(total*part[1],part[0]),[fr(total*part[0],part[1]),String(total+part[1]),fr(total*part[1]+1,part[0])],`${total} ÷ ${part[0]}/${part[1]} = ${total} × ${part[1]}/${part[0]} = ${fr(total*part[1],part[0])}.`,'Dividing by a fraction: multiply by its reciprocal.');},
 ()=>{const a=pick([[2,3],[3,4],[5,6],[3,5]]),b=pick([[1,2],[1,4],[2,5]]);return mq('g6_ops',`${a[0]}/${a[1]} ÷ ${b[0]}/${b[1]} = ?`,fr(a[0]*b[1],a[1]*b[0]),[fr(a[0]*b[0],a[1]*b[1]),fr(a[1]*b[0],a[0]*b[1]),fr(a[0]*b[1]+1,a[1]*b[0])],`Keep, change, flip: ${a[0]}/${a[1]} × ${b[1]}/${b[0]} = ${fr(a[0]*b[1],a[1]*b[0])}.`,'Multiply by the reciprocal.');},
 ()=>{const len=pick([[7,2],[9,4],[11,3]]),k=pick([[1,2],[3,4]]);return mq('g6_ops',`A board is ${fr(len[0],len[1])} ft long. You use ${k[0]}/${k[1]} of it. How many feet do you use?`,fr(len[0]*k[0],len[1]*k[1]),[fr(len[0]+k[0],len[1]+k[1]),fr(len[0]*k[1],len[1]*k[0]),fr(len[0]*k[0]+1,len[1]*k[1])],`“Of” means multiply: ${fr(len[0],len[1])} × ${k[0]}/${k[1]} = ${fr(len[0]*k[0],len[1]*k[1])}.`,'“Of” means multiply.');},
],true);
// 6.CE.2 integer operations
addGens('g6_int',[
 ()=>{const a=rng(-12,12)||3,b=rng(-9,9)||-2;return mq('g6_int',`${sg(a)} × ${sg(b)} = ?`,neg(a*b),[neg(-a*b),neg(a+b),neg(a*b+1)],`${a*b<0?'Different signs give a negative.':'Same signs give a positive.'} ${neg(a*b)}.`,'Same signs: positive. Different signs: negative.');},
]);
addGens('g6_int',[
 ()=>{const a=rng(-15,-2),b=rng(-12,12)||4,c=rng(2,6);return mq('g6_int',`${sg(a)} − ${sg(b)} + ${sg(c)} = ?`,neg(a-b+c),[neg(a+b+c),neg(a-b-c),neg(-(a-b+c))].filter(x=>x!==neg(a-b+c)),`Subtracting ${sg(b)} is adding ${sg(-b)}: ${neg(a)} + ${neg(-b)} + ${c} = ${neg(a-b+c)}.`,'Change subtraction to adding the opposite.');},
 ()=>{const q=rng(-9,-2),d=rng(2,8);return mq('g6_int',`${neg(q*d)} ÷ ${sg(-d)} = ?`,neg(-q),[neg(q),neg(q*d+d),neg(d)],`Negative ÷ negative = positive: ${-q}.`,'Same signs give a positive.');},
 ()=>{const start=rng(-30,-5),moves=[rng(5,15),-rng(3,12),rng(2,10)];const end=start+moves[0]+moves[1]+moves[2];return mq('g6_int',`A submarine is at ${neg(start)} m. It rises ${moves[0]} m, dives ${-moves[1]} m, then rises ${moves[2]} m. Where is it now?`,`${neg(end)} m`,[`${neg(end+2*moves[1])} m`,`${neg(-end)} m`,`${neg(end-moves[2])} m`].filter(x=>x!==`${neg(end)} m`),`${neg(start)} + ${moves[0]} − ${-moves[1]} + ${moves[2]} = ${neg(end)}.`,'Rise = add, dive = subtract.');},
 ()=>{const a=rng(-6,-2),b=rng(2,5),c=rng(-4,-1);return mq('g6_int',`${sg(a)} × ${sg(b)} × ${sg(c)} = ?`,neg(a*b*c),[neg(-a*b*c),neg(a+b+c),neg(a*b-c)],`Two negatives multiply to a positive: ${neg(a*b*c)}.`,'Count the negative signs.');},
],true);
// 6.MG.1 circles
addGens('g6_circle',[
 ()=>{const d=rng(4,20);return mq('g6_circle',`Find the circumference of a circle with diameter ${d} cm. (Use π ≈ 3.14)`,`${r2(3.14*d)} cm`,[`${r2(3.14*d*d/4)} cm`,`${r2(3.14*d*2)} cm`,`${r2(3.14*d/2)} cm`],`C = πd = 3.14 × ${d} = ${r2(3.14*d)}.`,'C = π × diameter.');},
]);
addGens('g6_circle',[
 ()=>{const r=rng(2,10);const C=r2(2*3.14*r);return mq('g6_circle',`A circle has a circumference of ${C} cm. What is its radius? (π ≈ 3.14)`,`${r} cm`,[`${2*r} cm`,`${r2(C/3.14)} cm`.replace(`${2*r} cm`,`${r+1} cm`),`${r+2} cm`],`d = ${C} ÷ 3.14 = ${2*r}. r = ${r}.`,'Find the diameter first, then halve it.');},
 ()=>{const d=pick([10,14,20]);return mq('g6_circle',`A circular rug has a diameter of ${d} ft. What is its area? (π ≈ 3.14)`,`${r2(3.14*(d/2)**2)} ft²`,[`${r2(3.14*d*d)} ft²`,`${r2(3.14*d)} ft²`,`${r2(3.14*d/2)} ft²`],`r = ${d/2}. A = 3.14 × ${d/2}² = ${r2(3.14*(d/2)**2)}.`,'Use the radius in the area formula.');},
 ()=>{const r=rng(3,8);return mq('g6_circle',`A wheel has a radius of ${r} in. How far does it roll in 10 full turns? (π ≈ 3.14)`,`${r2(3.14*2*r*10)} in`,[`${r2(3.14*r*10)} in`,`${r2(3.14*r*r*10)} in`,`${r2(3.14*2*r)} in`],`One turn = circumference = 2 × 3.14 × ${r} = ${r2(6.28*r)}. × 10 = ${r2(62.8*r)}.`,'One turn covers the circumference.');},
 ()=>{const r=rng(2,6);return mq('g6_circle',`If you double the radius of a circle with radius ${r}, what happens to the area?`,'It becomes 4 times as large.',['It doubles.','It stays the same.','It becomes 8 times as large.'],`Area uses r². (2r)² = 4r².`,'Try it with numbers.');},
],true);
// 6.MG.2 area & perimeter
addGens('g6_geo',[
 ()=>{const b=rng(4,20),h=rng(3,15);return mq('g6_geo',`A parallelogram has base ${b} in and height ${h} in. What is its area?`,`${b*h} in²`,[`${b*h/2} in²`,`${2*(b+h)} in²`,`${b+h} in²`],`A = b × h = ${b*h}.`,'Parallelogram: base × height.');},
]);
addGens('g6_geo',[
 ()=>{const b=rng(4,12)*2,h=rng(3,10);return mq('g6_geo',`A triangle has area ${b*h/2} cm² and base ${b} cm. What is its height?`,`${h} cm`,[`${h*2} cm`,`${b*h/2-b} cm`,`${h+1} cm`],`A = ½bh → ${b*h/2} = ½ × ${b} × h → h = ${h}.`,'Work the formula backward.');},
 ()=>{const w=rng(6,12),l=rng(8,16),t=rng(2,4);return mq('g6_geo',`A rectangle ${l} m by ${w} m has a triangle cut off one corner with legs ${t} m and ${t*2} m. What area remains?`,`${l*w-t*t} m²`,[`${l*w} m²`,`${l*w-2*t*t} m²`,`${l*w-t*t*2/4} m²`].filter(x=>x!==`${l*w-t*t} m²`),`Triangle: ½ × ${t} × ${2*t} = ${t*t}. ${l*w} − ${t*t} = ${l*w-t*t}.`,'Rectangle minus triangle.');},
 ()=>{const a=rng(4,10),b=rng(a+2,16),h=rng(3,9);return mq('g6_geo',`A trapezoid has bases ${a} ft and ${b} ft and height ${h} ft. What is its area?`,`${(a+b)*h/2} ft²`,[`${(a+b)*h} ft²`,`${a*b*h/2} ft²`,`${(a+b)/2+h} ft²`],`A = ½(${a} + ${b}) × ${h} = ${(a+b)*h/2}.`,'Average the bases, times height.');},
],true);
// 6.MG.3 coordinate plane
addGens('g6_coord',[
 ()=>{const x=rng(-9,9)||2,y=rng(-9,9)||-3;return mq('g6_coord',`Point (${neg(x)}, ${neg(y)}) is reflected over the x-axis. Where is the image?`,`(${neg(x)}, ${neg(-y)})`,[`(${neg(-x)}, ${neg(y)})`,`(${neg(-x)}, ${neg(-y)})`,`(${neg(y)}, ${neg(x)})`],'Reflecting over the x-axis changes the sign of y.','Over the x-axis: flip up/down.');},
]);
addGens('g6_coord',[
 ()=>{const x1=rng(-8,-1),x2=rng(1,8),y=rng(-6,6);return mq('g6_coord',`How far apart are (${neg(x1)}, ${neg(y)}) and (${x2}, ${neg(y)})?`,x2-x1,[x2+x1,Math.abs(x1),x2],`Same y. Distance = |${x2} − (${neg(x1)})| = ${x2-x1}.`,'Points in different quadrants: add the distances from the axis.');},
 ()=>{const w=rng(3,8),h=rng(2,6),x=rng(-5,0),y=rng(-4,0);return mq('g6_coord',`A rectangle has corners (${neg(x)}, ${neg(y)}), (${neg(x+w)}, ${neg(y)}), (${neg(x+w)}, ${neg(y+h)}), (${neg(x)}, ${neg(y+h)}). What is its area?`,`${w*h} square units`,[`${2*(w+h)} square units`,`${w+h} square units`,`${w*h+w} square units`],`Width ${w}, height ${h}. Area ${w*h}.`,'Find the side lengths by subtracting coordinates.');},
 ()=>{const x=rng(1,8),y=rng(1,8);return mq('g6_coord',`Point (${x}, ${y}) is reflected over the y-axis, then over the x-axis. In which quadrant is the final point?`,'Quadrant III',['Quadrant I','Quadrant II','Quadrant IV'],`(${x}, ${y}) → (${neg(-x)}, ${y}) → (${neg(-x)}, ${neg(-y)}): both negative → Quadrant III.`,'Each reflection flips one sign.');},
],true);
// 6.MG.4 congruence
addQ('g6_congr',[
 QI('Two triangles are congruent. What must be true?','All matching sides and angles are equal.',['They have the same color.','Only one angle matches.','One is bigger than the other.'],'Congruent figures are the same size and shape.','Same size, same shape.'),
 QI('Which symbol means “is congruent to”?','≅',['=','≈','~'],'≅ means congruent.','It has a squiggle and lines.'),
 QH('Triangle ABC ≅ triangle DEF. AB = 7 cm. Which side must also be 7 cm?','DE',['EF','DF','AC'],'Matching order: A↔D, B↔E, so AB ↔ DE.','Match the letters in order.'),
 QH('Triangle PQR ≅ triangle XYZ. Angle Q = 64°. Which angle is also 64°?','angle Y',['angle X','angle Z','angle P'],'Q is the 2nd letter; Y is the 2nd letter.','Match positions.'),
 QH('Two squares each have a perimeter of 24 cm. Are they congruent?','Yes — both have sides of 6 cm and right angles.',['No, squares are never congruent.','Only if they are the same color.','Not enough information.'],'Each side is 24 ÷ 4 = 6 cm.','Find the side length.'),
 QH('Two rectangles both have an area of 24 cm². Must they be congruent?','No — one could be 4 × 6 and the other 3 × 8.',['Yes, always.','Only if they are squares.','Yes, if they are rectangles.'],'Same area does not mean same shape.','Try different dimensions.'),
 QH('A figure is slid 5 units right. Is the image congruent to the original?','Yes — a slide does not change size or shape.',['No, it gets bigger.','No, it flips.','Only if it is a triangle.'],'Translations keep figures congruent.','Does sliding change the size?'),
]);
// 6.PS.1 circle graphs
addGens('g6_circgraph',[
 ()=>{const t=pick([40,60,80,120,200]),p=pick([10,15,25,30,45]);return mq('g6_circgraph',`A circle graph of ${t} votes shows Pizza = ${p}%. How many votes for pizza?`,t*p/100,[p,t-t*p/100,t*p/10],`${p}% of ${t} = ${t*p/100}.`,'Multiply the total by the percent.');},
]);
addGens('g6_circgraph',[
 ()=>{const p=pick([25,50,75,10,20]);return mq('g6_circgraph',`A section of a circle graph is ${p}%. How many degrees is its central angle?`,`${360*p/100}°`,[`${p}°`,`${180*p/100}°`,`${360-p}°`],`${p}% of 360° = ${360*p/100}°.`,'A whole circle is 360°.');},
 ()=>{const a=rng(2,5)*5,b=rng(2,6)*5,c=rng(2,5)*5;const d=100-a-b-c;const t=pick([200,400,600]);return mq('g6_circgraph',`Sports: Soccer ${a}%, Swim ${b}%, Track ${c}%, Other ?. Out of ${t} students, how many chose Other?`,t*d/100,[d,t*(a+b+c)/100,t*d/10],`Other = 100 − ${a+b+c} = ${d}%. ${d}% of ${t} = ${t*d/100}.`,'All parts add to 100%.');},
 ()=>{const t=pick([80,120,160,240]);const k=pick([[1,4],[3,8],[1,8],[5,8]]);const n=t*k[0]/k[1];return mq('g6_circgraph',`${n} of ${t} students chose art. What percent of the circle should art be?`,`${100*k[0]/k[1]}%`,[`${n}%`,`${100*n/t+10}%`,`${100-100*k[0]/k[1]}%`],`${n} ÷ ${t} = ${k[0]/k[1]} = ${100*k[0]/k[1]}%.`,'Part ÷ whole.');},
],true);
// 6.PS.2 statistics
addGens('g6_stat',[
 ()=>{const v=[rng(2,9),rng(2,9),rng(2,9),rng(10,20)];const m=v.reduce((a,b)=>a+b,0)/4;if(m%1){v[3]+=4-(v.reduce((a,b)=>a+b,0)%4);}const mm=v.reduce((a,b)=>a+b,0)/4;return mq('g6_stat',`Find the mean: ${v.join(', ')}`,mm,[mm+1,mm-1,Math.max(...v)-Math.min(...v)],`Sum ${v.reduce((a,b)=>a+b,0)} ÷ 4 = ${mm}.`,'Add, then divide by how many.');},
]);
addGens('g6_stat',[
 ()=>{const target=rng(80,92),a=rng(75,95),b=rng(75,95),c=rng(75,95);const need=4*target-a-b-c;if(need>100||need<50)return mq('g6_stat','The mean of 4 tests is 85. What is the total of all 4 scores?',340,[85,325,345],'4 × 85 = 340.','Mean × count = total.');return mq('g6_stat',`${pick(NAMES)} scored ${a}, ${b} and ${c} on three tests. What score on the 4th test gives a mean of ${target}?`,need,[target,need+4,Math.round((a+b+c)/3)],`Total needed: 4 × ${target} = ${4*target}. ${4*target} − ${a+b+c} = ${need}.`,'Mean × number of tests = total needed.');},
 ()=>{const v=[rng(10,20),rng(10,20),rng(10,20),rng(10,20),rng(10,20)].sort((a,b)=>a-b);const out=rng(60,90);return mq('g6_stat',`Data: ${v.join(', ')}. The value ${out} is added. Which is the BEST measure of center now?`,'the median',['the mean','the range','the outlier'],'An outlier pulls the mean; the median stays close to the middle.','Which is not pulled by one big value?');},
 ()=>{const v=[rng(1,6),rng(1,6),rng(7,12),rng(7,12),rng(13,18)].sort((a,b)=>a-b);const m=v.reduce((a,b)=>a+b,0)/5;const dist=v.map(x=>Math.abs(x-m));return mq('g6_stat',`Data: ${v.join(', ')}. The mean is a “balance point.” What is the total distance of the values BELOW the mean from the mean?`,r2(v.filter(x=>x<m).reduce((s,x)=>s+m-x,0)),[r2(m),r2(v.filter(x=>x<m).reduce((s,x)=>s+m-x,0)+1),v.filter(x=>x<m).length],`The mean is ${r2(m)}. Distances below balance distances above: ${r2(v.filter(x=>x<m).reduce((s,x)=>s+m-x,0))}.`,'Find the mean first.');},
],true);
// 6.PFA.1 ratios
addGens('g6_ratio',[
 ()=>{const a=rng(2,9),b=rng(2,9);return mq('g6_ratio',`There are ${a} cats and ${b} dogs. What is the ratio of dogs to ALL pets?`,`${b}:${a+b}`,[`${b}:${a}`,`${a}:${a+b}`,`${a+b}:${b}`],`Dogs : total = ${b} : ${a+b}.`,'Part to whole.');},
]);
addGens('g6_ratio',[
 ()=>{const a=rng(2,5),b=rng(2,6),k=rng(3,8);return mq('g6_ratio',`The ratio of boys to girls is ${a}:${b}. There are ${(a+b)*k} students. How many girls?`,b*k,[a*k,(a+b)*k-a,b*(a+b)],`${a+b} parts = ${(a+b)*k}, so 1 part = ${k}. Girls = ${b} × ${k} = ${b*k}.`,'Find the value of one part.');},
 ()=>{const a=rng(2,5),b=rng(3,7),k=rng(2,5),d=rng(2,6);return mq('g6_ratio',`Paint is mixed ${a} parts blue to ${b} parts white. You use ${a*k} cups of blue. How much white do you need?`,`${b*k} cups`,[`${b+k} cups`,`${a*k+b} cups`,`${b*a} cups`],`Blue scaled by ${k}, so white = ${b} × ${k} = ${b*k}.`,'Scale both parts the same way.');},
 ()=>{const r=pick([[2,3],[3,4],[3,5]]);const k=rng(2,5);const opts=[[r[0]*k,r[1]*k],[r[0]+k,r[1]+k],[r[1],r[0]],[r[0]*k,r[1]*k+1]];return mq('g6_ratio',`Which ratio is equivalent to ${r[0]}:${r[1]}?`,`${opts[0][0]}:${opts[0][1]}`,opts.slice(1).map(o=>`${o[0]}:${o[1]}`),`Multiply both by ${k}.`,'Both parts must be multiplied by the same number.');},
],true);
// 6.PFA.2 proportional reasoning
addGens('g6_prop',[
 ()=>{const u=rng(2,9),n=rng(3,8);return mq('g6_prop',`${n} notebooks cost $${u*n}. What is the cost of 1 notebook?`,`$${u}`,[`$${u*n-n}`,`$${n}`,`$${u+1}`],`$${u*n} ÷ ${n} = $${u}.`,'Divide total by count.');},
]);
addGens('g6_prop',[
 ()=>{const a=rng(3,6),pa=a*rng(2,5)+0,b=rng(7,12),ub=rng(2,5);const ua=pa/a;if(ua===ub)return mq('g6_prop','Store A: 4 cans for $6. Store B: 6 cans for $8. Which is the better buy?','Store B',['Store A','They are the same'],'A: $1.50 each. B: about $1.33 each.','Find the unit price.');const better=ua<ub?'Store A':'Store B';return mq('g6_prop',`Store A: ${a} cans for $${pa}. Store B: ${b} cans for $${ub*b}. Which is the better buy?`,better,[better==='Store A'?'Store B':'Store A','They are the same'],`A: $${ua} per can. B: $${ub} per can.`,'Compare unit prices.');},
 ()=>{const mph=rng(40,65),h=rng(2,5),m=pick([15,30,45]);const d=r2(mph*(h+m/60));return mq('g6_prop',`A car drives at ${mph} mph for ${h} hours ${m} minutes. How far does it go?`,`${d} miles`,[`${mph*h} miles`,`${mph*(h+m/100)} miles`.replace(/(\.\d\d)\d+/,'$1'),`${mph*h+m} miles`],`${h} hr ${m} min = ${h+m/60} hr. ${mph} × ${h+m/60} = ${d}.`,'Change minutes to part of an hour.');},
 ()=>{const k=rng(2,6);const xs=[1,2,3,4];const ys=xs.map(x=>x*k);const bad=ys.slice();bad[2]+=1;return mq('g6_prop',`Which table shows a proportional relationship?`,`x: 1,2,3,4 → y: ${ys.join(',')}`,[`x: 1,2,3,4 → y: ${bad.join(',')}`,`x: 1,2,3,4 → y: ${xs.map(x=>x+k).join(',')}`,`x: 1,2,3,4 → y: ${xs.map(x=>x*x).join(',')}`],`y ÷ x is always ${k}.`,'Check if y ÷ x is the same every time.');},
],true);
// 6.PFA.3 equations
addGens('g6_eq',[
 ()=>{const x=rng(2,15),a=rng(2,9);return mq('g6_eq',`Solve: x ÷ ${a} = ${x}`,a*x,[x,x+a,a],`Multiply both sides by ${a}: x = ${a*x}.`,'Undo division with multiplication.');},
]);
addGens('g6_eq',[
 ()=>{const x=r2(rng(12,95)/10),a=r2(rng(12,60)/10);return mq('g6_eq',`Solve: x + ${a} = ${r2(x+a)}`,String(x),[String(r2(x+a+a)),String(r2(x+1)),String(a)],`Subtract ${a}: x = ${x}.`,'Undo the addition.');},
 ()=>{const p=rng(3,12),n=rng(3,9);return mq('g6_eq',`${pick(NAMES)} bought ${n} equal-priced tickets for $${p*n}. Which equation finds the price p of one ticket?`,`${n}p = ${p*n}`,[`p + ${n} = ${p*n}`,`p − ${n} = ${p*n}`,`p ÷ ${n} = ${p*n}`],`${n} tickets × p dollars = $${p*n}.`,'Equal groups: multiply.');},
 ()=>{const a=pick([[1,2],[2,3],[3,4]]),x=a[1]*rng(2,8);return mq('g6_eq',`Solve: (${a[0]}/${a[1]})x = ${x*a[0]/a[1]}`,x,[x*a[0]/a[1],x+a[1],x*a[0]],`Multiply both sides by ${a[1]}/${a[0]}: x = ${x}.`,'Multiply by the reciprocal.');},
],true);
// 6.PFA.4 inequalities
addGens('g6_ineq',[
 ()=>{const n=rng(-5,12);return mq('g6_ineq',`On a number line, an open circle at ${neg(n)} with an arrow pointing left shows…`,`x < ${neg(n)}`,[`x > ${neg(n)}`,`x ≤ ${neg(n)}`,`x ≥ ${neg(n)}`],'Open circle: not included. Left: less than.','Open = < or >. Closed = ≤ or ≥.');},
]);
addGens('g6_ineq',[
 ()=>{const n=rng(12,16);return mq('g6_ineq',`Riders must be at least ${n} years old. Which inequality shows the allowed ages a?`,`a ≥ ${n}`,[`a > ${n}`,`a ≤ ${n}`,`a < ${n}`],`“At least ${n}” includes ${n}: a ≥ ${n}.`,'“At least” includes the number.');},
 ()=>{const n=rng(40,80);return mq('g6_ineq',`A bag can hold no more than ${n} pounds. Which inequality shows the weight w it can hold?`,`w ≤ ${n}`,[`w < ${n}`,`w ≥ ${n}`,`w > ${n}`],`“No more than” means ≤.`,'Can it hold exactly the limit?');},
 ()=>{const n=rng(-6,-1);const vals=[n-2,n,n+1,n+3];return mq('g6_ineq',`Which value is NOT a solution to x > ${neg(n)}?`,neg(n),[neg(n+1),neg(n+3),neg(n+5)],`${neg(n)} is not greater than itself.`,'Is the number itself included?');},
],true);
// Grade 6 reading
addQ('g6_vocab',[
 QI('The Latin root “bene” means good. What does “benefit” mean?','something good or helpful',['something harmful','a type of bench','a loud sound'],'Bene = good.','Use the root.'),
 QI('Which word has a negative connotation?','stingy',['thrifty','careful','economical'],'Stingy suggests being mean with money.','Which sounds unkind?'),
 QI('“The mountain path was treacherous after the storm.” Treacherous means…','dangerous',['beautiful','crowded','straight'],'After a storm, paths become dangerous.','What do storms do to paths?'),
 QH('Which word has the most POSITIVE connotation for someone who is confident?','self-assured',['arrogant','cocky','boastful'],'Self-assured describes confidence positively.','Which sounds like a compliment?'),
 QH('The Greek root “chron” means time. What is a “chronic” problem?','one that lasts a long time',['one that is solved quickly','one about clocks','a very small problem'],'Chron = time; chronic = lasting a long time.','Think of time.'),
 QH('“Despite her trepidation, Ama stepped onto the stage.” What does trepidation mean?','fear or nervousness',['excitement','talent','boredom'],'“Despite” shows she acted even though she felt fear.','“Despite” signals a contrast.'),
 QH('Which pair are antonyms?','scarce — abundant',['scarce — rare','abundant — plentiful','rare — few'],'Scarce means few; abundant means many.','Opposites.'),
 QH('“The author’s argument was cogent; every point was supported with evidence.” Cogent means…','clear and convincing',['confusing','long','funny'],'Supported with evidence = convincing.','Use the second half of the sentence.'),
 QH('The prefix “mal-” means bad. What does “malfunction” mean?','to work badly or fail',['to work very well','to start over','to make larger'],'Mal (bad) + function = work badly.','Use the prefix.'),
 QH('Which word best completes the sentence? “The evidence was so ___ that no one could argue with it.”','compelling',['flimsy','vague','doubtful'],'Compelling evidence is convincing.','Which makes it hard to argue?'),
]);
const F6A='Ama had practiced the piano piece for months. At the recital, her hands trembled on the keys, and in the second line she played a wrong chord. The room seemed to go silent. She could have stopped. Instead, she took a breath, found the melody again and played to the end. Afterward, her teacher handed her a small card: “The best musicians are not the ones who never miss a note. They are the ones who keep playing.” Ama tucked the card into her music book, where she would see it every day.';
const F6B='The old lighthouse keeper had not spoken to anyone in weeks. Each night he climbed the 147 steps, lit the lamp and watched the ships pass safely. The town had sent a letter: an automatic light would replace him next month. He folded the letter into a tiny square and kept climbing. On his last night, the harbor filled with boats. Every captain sounded a horn.';
addQ('g6_fiction',[
 QP(F6A,'What does Ama do after she plays the wrong chord?','She keeps playing to the end.',['She runs off the stage.','She starts over from the beginning.','She asks for help.'],'She took a breath and played to the end.','What did she choose?'),
 QP(F6A,'What is the theme of the passage?','Perseverance matters more than perfection.',['Practice makes everything perfect.','Recitals are always scary.','Teachers give the best gifts.'],'The card’s message and Ama’s actions show perseverance.','What is the message of the card?',true),
 QP(F6A,'Why does Ama put the card where she will see it every day?','She wants to remember the lesson.',['She wants to hide it.','She forgot about it.','She plans to give it away.'],'Seeing it daily reminds her.','Why look at something every day?',true),
 QP(F6A,'What does “The room seemed to go silent” show about Ama’s feelings?','She felt very aware of her mistake.',['The audience left.','She could not hear.','The piano broke.'],'It shows how big the mistake felt to her.','Did the room really go silent?',true),
 QP(F6B,'What is the conflict in the passage?','The keeper’s job is being replaced by an automatic light.',['A ship crashes.','The lamp breaks.','The town forgets the keeper.'],'The letter says an automatic light will replace him.','What news does the letter bring?'),
 QP(F6B,'What does the keeper’s action of folding the letter and continuing to climb suggest?','He is loyal to his duty even though his job is ending.',['He is angry at the ships.','He did not read the letter.','He wants to move away.'],'He keeps working faithfully.','How does he respond?',true),
 QP(F6B,'What is the effect of the ending, when every captain sounds a horn?','It shows the community valued his work.',['It shows the ships were in danger.','It shows the captains were angry.','It shows the lamp was broken.'],'The horns are a tribute.','Why would captains honor him?',true),
 QP(F6B,'Why might the author include the exact number of steps (147)?','to emphasize the keeper’s hard, daily effort',['to give a math problem','because it is the keeper’s age','to show the tower was short'],'Specific details show his dedication.','Climbing that every night…',true),
]);
const N6A='Some cities are replacing traditional streetlights with LED lights. Supporters point out that LEDs use up to 75 percent less energy and can last more than 20 years. Over time, cities save money on electricity and repairs. Critics argue that very bright blue-white LEDs can disturb sleep and confuse migrating birds. However, newer warm-colored LEDs and shields that point light downward reduce these problems. With careful planning, cities can save energy while protecting people and wildlife.';
addQ('g6_nonfic',[
 QP(N6A,'What is the author’s main claim?','With careful planning, LED streetlights can save energy while protecting people and wildlife.',['LEDs should be banned.','Birds should avoid cities.','Streetlights are not needed.'],'The last sentence states the claim.','Where does the author sum up?',true),
 QP(N6A,'How does the author address critics?','by acknowledging their concerns and offering solutions',['by ignoring them','by saying they are lying','by agreeing LEDs are bad'],'The author mentions problems and then solutions.','Look for “However.”',true),
 QP(N6A,'Which evidence best supports the claim that LEDs save money?','They use up to 75 percent less energy and last more than 20 years.',['They can confuse migrating birds.','Some are blue-white.','Shields point light downward.'],'Less energy and longer life reduce costs.','Which detail is about cost?'),
 QP(N6A,'What is the purpose of the word “However” in sentence 5?','to shift from a problem to a response',['to begin a new topic','to give an example','to show time order'],'However signals a contrast.','What does “however” signal?',true),
 QP(N6A,'Which is an OPINION, not a fact?','With careful planning, cities can save energy while protecting people and wildlife.',['LEDs use up to 75 percent less energy.','LEDs can last more than 20 years.','Some cities are replacing streetlights.'],'The last sentence is the author’s judgment.','Which cannot be measured?',true),
 QH('An author writes, “Everyone knows that homework is useless.” Which weakness does this argument have?','It is a broad claim without evidence.',['It uses too many statistics.','It quotes an expert.','It gives both sides.'],'“Everyone knows” is a generalization with no support.','Is there any evidence?'),
 QH('Which source would be MOST credible for an article about vaccines?','a report from a national health agency',['an anonymous social media post','an advertisement','a celebrity blog'],'Experts and official agencies are credible.','Who is an expert?'),
]);
// Grade 6 science
addQ('g6_energy',[
 QI('Which energy transformation happens in a solar panel?','light to electrical',['electrical to light','chemical to sound','heat to chemical'],'Solar panels turn sunlight into electricity.','Solar = sun.'),
 QI('What kind of energy is stored in food?','chemical energy',['nuclear energy','sound energy','light energy'],'Food stores chemical energy.','Digestion releases it.'),
 QH('A battery-powered flashlight is turned on. Which shows the energy transformations in order?','chemical → electrical → light (and heat)',['light → chemical → electrical','electrical → chemical → sound','heat → light → chemical'],'The battery stores chemical energy that becomes electricity, then light.','Start with the battery.'),
 QH('Why does no machine turn 100% of its energy into useful work?','Some energy always changes to heat.',['Energy is destroyed.','Machines create energy.','Gravity removes energy.'],'Energy is conserved, but some becomes heat.','Where does the “lost” energy go?'),
 QH('A pendulum swings. At the lowest point, it has the most…','kinetic energy',['potential energy','chemical energy','nuclear energy'],'At the bottom, speed is highest.','Where is it fastest?'),
 QH('Which is the original source of the energy in fossil fuels?','the sun',['the moon','Earth’s core only','wind'],'Ancient plants captured sunlight; fossil fuels store that energy.','Plants need…'),
 QH('Thermal energy moves from…','warmer objects to cooler objects',['cooler objects to warmer objects','light objects to heavy objects','only through air'],'Heat flows from hot to cold.','Ice in a warm drink melts.'),
]);
addQ('g6_solar',[
 QI('What keeps the planets in orbit around the sun?','gravity',['magnetism','friction','wind'],'The sun’s gravity holds the planets.','The pull of mass.'),
 QI('What is a lunar eclipse?','Earth’s shadow falls on the moon.',['The moon blocks the sun.','The sun blocks the moon.','The moon disappears forever.'],'In a lunar eclipse, Earth is between the sun and moon.','Lunar = moon.'),
 QH('What causes ocean tides?','mainly the moon’s gravity pulling on Earth’s water',['wind only','earthquakes','the sun’s heat only'],'The moon’s gravity causes tides.','The moon pulls.'),
 QH('Why does the moon always show the same face to Earth?','It rotates once for every orbit around Earth.',['It does not rotate.','Earth blocks the other side.','The other side is invisible.'],'Its rotation and orbit take the same time.','Same time for spin and orbit.'),
 QH('During which moon phase can a solar eclipse happen?','new moon',['full moon','first quarter','waxing gibbous'],'The moon must be between Earth and the sun.','The moon is between Earth and the sun.'),
 QH('Why are the outer planets much colder than the inner planets?','They are much farther from the sun.',['They are smaller.','They have no gravity.','They spin faster.'],'Distance reduces energy received.','Distance.'),
 QH('About how long does light from the sun take to reach Earth?','about 8 minutes',['instantly','about 1 year','about 1 day'],'Sunlight takes about 8 minutes.','Very fast but not instant.'),
]);
addQ('g6_eco',[
 QI('What is a watershed?','an area of land that drains into a body of water',['a building for storing water','a type of cloud','a waterfall'],'All land drains somewhere.','Where does rain go?'),
 QI('Which organisms are at the bottom of most energy pyramids?','producers',['top predators','decomposers only','herbivores'],'Producers have the most energy.','Plants.'),
 QH('A food chain: grass → grasshopper → frog → snake. If the grass has 10,000 units of energy, about how much reaches the snake?','10 units',['1,000 units','100 units','10,000 units'],'Only about 10% passes to each level: 10,000 → 1,000 → 100 → 10.','10% each step.'),
 QH('Fertilizer runs off farms into a bay. What can happen?','Algae grow quickly and use up oxygen, harming fish.',['Fish grow larger.','Water becomes cleaner.','Nothing happens.'],'Excess nutrients cause algae blooms.','Too many nutrients.'),
 QH('Which relationship is commensalism?','a bird nesting in a tree without harming it',['a tick on a dog','a bee and a flower','a lion eating a zebra'],'One benefits, the other is unaffected.','One helped, one not affected.'),
 QH('Why are wetlands important to the Chesapeake Bay watershed?','They filter pollutants and provide habitat.',['They make the water saltier.','They cause floods.','They block all rivers.'],'Wetlands act like natural filters.','Filters and homes.'),
 QH('What happens to energy at each level of a food chain?','Most is used for life processes or lost as heat.',['It increases.','It is all passed on.','It turns into matter.'],'Organisms use energy to live.','Where does the 90% go?'),
]);
addQ('g6_atmo',[
 QI('In which layer of the atmosphere does weather happen?','troposphere',['stratosphere','mesosphere','thermosphere'],'Weather happens in the troposphere.','The lowest layer.'),
 QI('What does the ozone layer do?','absorbs harmful ultraviolet (UV) radiation',['makes rain','creates wind','reflects all heat'],'Ozone blocks UV rays.','Protection from the sun.'),
 QH('Why does air pressure decrease as you climb a mountain?','There is less air above you pressing down.',['The air gets heavier.','The mountain pushes the air.','It gets warmer.'],'Less air above = less pressure.','Think of a stack of air.'),
 QH('What causes a sea breeze during the day?','Land heats faster, warm air rises and cooler air from the sea moves in.',['The ocean heats faster than land.','The moon pulls the wind.','Clouds push the air.'],'Uneven heating causes wind.','Which heats faster: sand or water?'),
 QH('Which gas is increasing in the atmosphere mainly from burning fossil fuels?','carbon dioxide',['oxygen','nitrogen','argon'],'Burning fuels releases CO₂.','A greenhouse gas.'),
 QH('What is the greenhouse effect?','Gases in the atmosphere trap heat near Earth’s surface.',['Plants grow in glass houses.','The ozone layer reflects light.','Clouds make it rain.'],'Greenhouse gases keep heat in.','Like a blanket.'),
 QH('A warm, moist air mass meets a cold air mass. What often forms?','clouds and precipitation along the front',['clear skies','a desert','an earthquake'],'Fronts often bring precipitation.','Warm air rises over cold air.'),
]);
addQ('g6_resource',[
 QI('Which is a nonrenewable resource?','natural gas',['wind','sunlight','trees'],'Natural gas takes millions of years to form.','Fossil fuel.'),
 QI('Which resource does a hydroelectric dam use?','moving water',['coal','wind','sunlight'],'Hydro = water.','Hydro means water.'),
 QH('Why is solar power not available all the time?','The sun does not shine at night or as strongly on cloudy days.',['The sun runs out.','Solar panels are nonrenewable.','It only works in winter.'],'Sunlight varies.','Night and clouds.'),
 QH('Which is a trade-off of building a wind farm?','Clean energy, but it can affect birds and views.',['It causes air pollution.','It uses up wind forever.','It has no downsides.'],'Every choice has costs and benefits.','Think of both sides.'),
 QH('Trees are renewable. When could they become a problem resource?','when they are cut faster than they can regrow',['when they are planted','when they grow tall','never'],'Overuse can deplete renewable resources.','Faster than regrowth.'),
 QH('How does Virginia’s use of nuclear power affect air quality compared to coal?','Nuclear plants produce far less air pollution.',['Nuclear makes more smoke.','They are exactly the same.','Nuclear burns coal.'],'Nuclear power does not burn fuel.','No burning.'),
 QH('Which action conserves the MOST energy at home?','improving insulation to reduce heating and cooling',['charging a phone overnight','using one more lamp','opening windows in winter'],'Heating and cooling use the most energy.','What uses the most energy?'),
]);
// Grade 6 writing
addQ('g6_race',[
 QI('In a R.A.C.E. response, what does the “C” stand for?','Cite evidence from the text',['Count the words','Copy the question','Create a title'],'R.A.C.E. = Restate, Answer, Cite, Explain.','Use the text.'),
 QI('Which sentence best restates the question “Why are bees important?”','Bees are important for several reasons.',['I like bees.','Bees are yellow.','The answer is bees.'],'Restating uses the question’s words.','Turn the question into a statement.'),
 QH('Which is the strongest piece of evidence for the claim “Recess improves learning”?','A study found students focused 20% better after recess.',['Recess is fun.','My friend likes recess.','Recess happens at noon.'],'Data from a study is strong evidence.','Which can be measured?'),
 QH('What should the “Explain” part of a R.A.C.E. response do?','show how the evidence supports your answer',['repeat the evidence word for word','add a new topic','list more questions'],'Explanation connects evidence to the claim.','Connect the dots.'),
 QH('Which is a counterclaim?','Some people argue that recess wastes class time.',['Recess helps students focus.','Studies support recess.','Recess should be longer.'],'A counterclaim is the opposing view.','The other side.'),
 QH('Which transition best introduces evidence?','According to the article,',['In conclusion,','Once upon a time,','On the other hand,'],'“According to” introduces a source.','Point to the text.'),
 QH('Why should a writer respond to a counterclaim?','to show the argument is stronger than the other side',['to switch sides','to make the essay longer','to confuse the reader'],'Rebutting counterclaims strengthens arguments.','Answer the critics.'),
]);
addQ('g6_edit',[
 QP('Neither the coach nor the players was ready for the storm.','Which is the CORRECT version?','Neither the coach nor the players were ready for the storm.',['Neither the coach or the players were ready for the storm.','Neither the coach nor the players was ready, for the storm.'],'With neither/nor, the verb agrees with the closer subject (players → were).','Look at the noun nearest the verb.'),
 QP('Running to the bus, my backpack fell open.','Which revision fixes the dangling modifier?','Running to the bus, I felt my backpack fall open.',['Running to the bus, my backpack fell open quickly.','My backpack, running to the bus, fell open.'],'The backpack was not running; the person was.','Who was running?',true),
 QP('The team celebrated there victory with a pizza party.','Which is the CORRECT version?','The team celebrated their victory with a pizza party.',['The team celebrated they’re victory with a pizza party.','The team celebrated there victory, with a pizza party.'],'“Their” shows possession.','Whose victory?'),
 QP('I wanted to go to the game, however I had too much homework.','Which is the CORRECT version?','I wanted to go to the game; however, I had too much homework.',['I wanted to go to the game however, I had too much homework.','I wanted to go to the game, however, I had too much homework.'],'Use a semicolon before “however” joining two sentences, and a comma after.','However is not a conjunction.',true),
 QP('Each of the students need to bring their permission slip.','Which is the CORRECT version?','Each of the students needs to bring a permission slip.',['Each of the students need to bring a permission slip.','Each of the student need to bring their permission slip.'],'“Each” is singular, so use “needs.”','Each = one.',true),
 QP('Between you and I, the test was easy.','Which is the CORRECT version?','Between you and me, the test was easy.',['Between you and myself, the test was easy.','Among you and I, the test was easy.'],'After a preposition, use the object pronoun “me.”','“Between” is a preposition.',true),
 QP('The book that I borrowed from the library, was due yesterday.','Which is the CORRECT version?','The book that I borrowed from the library was due yesterday.',['The book, that I borrowed from the library was due yesterday.','The book that I borrowed, from the library was due yesterday.'],'Do not separate the subject and verb with a single comma.','Remove the comma before the verb.',true),
]);
// Grade 6 U.S. History 1865–present
addQ('us1',[
 QI('What did the Transcontinental Railroad connect?','the East and West coasts of the U.S.',['Canada and Mexico','Virginia and Maryland','Europe and America'],'It linked the country coast to coast.','Trans = across.'),
 QI('Who were cowboys in the late 1800s?','workers who herded cattle on long drives',['soldiers in World War I','factory owners','sailors'],'Cattle drives moved herds to railroads.','Cattle.'),
 QH('Why did the population of the Great Plains grow after 1865?','The Homestead Act and railroads made settling easier.',['Gold was found everywhere.','The land became forest.','The government closed it.'],'Free land and transportation drew settlers.','Free land + trains.'),
 QH('How did the near destruction of the buffalo affect Plains Indians?','It took away a main source of food, shelter and tools.',['It made them richer.','It had no effect.','It created more farmland for them.'],'The buffalo was central to Plains life.','What did they depend on?'),
 QH('What did the Battle of Little Bighorn (1876) show?','Some Plains nations strongly resisted U.S. expansion.',['The U.S. Army never lost.','Settlers welcomed reservations.','The war ended slavery.'],'Lakota and Cheyenne forces defeated Custer.','Resistance.'),
 QH('Which technology helped farmers in the dry Great Plains?','windmills to pump water',['steamboats','cotton gins','submarines'],'Windmills pumped groundwater.','Water was scarce.'),
]);
addQ('us2',[
 QI('Which amendment gave citizenship to people born in the U.S., including formerly enslaved people?','the Fourteenth',['the Thirteenth','the Fifteenth','the Nineteenth'],'The 14th Amendment defined citizenship.','Equal protection.'),
 QI('Who became president after Lincoln was assassinated?','Andrew Johnson',['Ulysses S. Grant','Rutherford B. Hayes','Theodore Roosevelt'],'Vice President Andrew Johnson took over.','The vice president.'),
 QH('What was the Compromise of 1877?','Federal troops left the South, ending Reconstruction.',['It ended slavery.','It started the Civil War.','It gave women the vote.'],'Removing troops ended Reconstruction.','1877 ended Reconstruction.'),
 QH('How did Booker T. Washington and W.E.B. Du Bois differ?','Washington stressed job training; Du Bois demanded full equal rights right away.',['They agreed on everything.','Both supported Jim Crow.','Du Bois only cared about farming.'],'They had different strategies.','Different approaches.'),
 QH('What did Ida B. Wells do?','She used journalism to expose lynching.',['She was a general.','She invented the telephone.','She led the Union Army.'],'She was a journalist and activist.','A writer.'),
 QH('Why were sharecroppers often trapped in poverty?','They owed landowners more than they earned.',['They owned large farms.','They were paid very well.','They had no rent.'],'Debt kept them tied to the land.','Debt.'),
]);
addQ('us3',[
 QI('Which inventor developed the assembly line for cars?','Henry Ford',['Thomas Edison','Alexander Graham Bell','Andrew Carnegie'],'Ford’s assembly line made cars affordable.','Model T.'),
 QI('Where did many Asian immigrants arrive on the West Coast?','Angel Island',['Ellis Island','Jamestown','Plymouth Rock'],'Angel Island was in San Francisco Bay.','West Coast.'),
 QH('Why did cities grow so fast after 1865?','Factories offered jobs to immigrants and people from farms.',['Farms paid more.','Cities had fewer people.','Railroads avoided cities.'],'Industry drew workers.','Jobs.'),
 QH('Why did workers form labor unions?','to fight for better pay, hours and safety',['to build railroads','to start wars','to lower wages'],'Unions bargained for workers.','Working conditions were hard.'),
 QH('What was a problem in crowded city tenements?','disease and fire danger',['too much open space','free healthcare','quiet streets'],'Crowding led to disease and fires.','Many people, small spaces.'),
 QH('How did the Chinese Exclusion Act reflect attitudes of the time?','It showed prejudice against Chinese immigrants.',['It welcomed all immigrants.','It gave Chinese immigrants land.','It ended immigration from Europe.'],'It banned Chinese laborers from entering.','Exclusion = keeping out.'),
]);
addQ('us4',[
 QI('Which canal did the U.S. build to connect the Atlantic and Pacific oceans?','the Panama Canal',['the Erie Canal','the Suez Canal','the James River Canal'],'The Panama Canal opened in 1914.','Central America.'),
 QI('Who was president during most of World War I?','Woodrow Wilson',['Theodore Roosevelt','Franklin D. Roosevelt','Abraham Lincoln'],'Wilson led the U.S. in WWI.','From Virginia.'),
 QH('Why was the sinking of the Lusitania important?','American deaths turned many people against Germany.',['It ended the war.','It started the Civil War.','It created the League of Nations.'],'A German submarine sank it in 1915.','Americans died.'),
 QH('Why did the U.S. Senate reject the League of Nations?','Many feared it would pull the U.S. into foreign wars.',['It cost too little.','Wilson opposed it.','It was in Canada.'],'Isolationists worried about entanglement.','Fear of more wars.'),
 QH('What did the U.S. gain after the Spanish-American War?','Puerto Rico, Guam and the Philippines',['Alaska and Hawaii','Texas and California','Canada'],'Spain gave up these territories.','Islands.'),
 QH('What was the Zimmermann Telegram?','a German message asking Mexico to fight the U.S.',['a peace treaty','a U.S. invention','a newspaper'],'It angered Americans and helped bring the U.S. into WWI.','Germany and Mexico.'),
]);
addQ('us5',[
 QI('What was the Dust Bowl?','severe drought and dust storms on the Great Plains',['a football game','a type of farm','a flood'],'Drought and poor farming caused dust storms.','Dust!'),
 QI('Which president created the New Deal?','Franklin D. Roosevelt',['Herbert Hoover','Woodrow Wilson','Harry Truman'],'FDR’s New Deal fought the Depression.','FDR.'),
 QH('Why did many African Americans move north during the Great Migration?','to find jobs and escape Jim Crow laws',['to start farms in the South','because of the Dust Bowl','to join the gold rush'],'Factory jobs and less discrimination drew them north.','Jobs and fairness.'),
 QH('Which New Deal program still exists today?','Social Security',['Prohibition','the Civilian Conservation Corps','the League of Nations'],'Social Security began in 1935.','Retirement benefits.'),
 QH('How did the stock market crash of 1929 affect people?','Banks failed and many lost jobs and savings.',['Everyone got richer.','Prices went up quickly.','It ended World War I.'],'The crash helped start the Great Depression.','Depression.'),
 QH('Which writer was part of the Harlem Renaissance?','Langston Hughes',['Mark Twain','Edgar Allan Poe','Henry Ford'],'Hughes was a leading poet.','A poet from Harlem.'),
]);
addQ('us6',[
 QI('What event brought the U.S. into World War II?','Japan’s attack on Pearl Harbor',['the sinking of the Lusitania','the stock market crash','the Cuban Missile Crisis'],'Japan attacked on December 7, 1941.','December 7, 1941.'),
 QI('Who led Nazi Germany?','Adolf Hitler',['Joseph Stalin','Winston Churchill','Benito Mussolini'],'Hitler led Germany.','Nazi leader.'),
 QH('Why was the Battle of Midway a turning point?','The U.S. destroyed Japanese aircraft carriers and stopped Japan’s advance.',['It ended the war in Europe.','Japan won easily.','It started the Cold War.'],'Midway shifted power in the Pacific.','Carriers lost.'),
 QH('What was the purpose of rationing on the home front?','to save resources for the military',['to make food free','to end the war','to help Germany'],'Rationing saved goods for troops.','Save for soldiers.'),
 QH('What happened to many Japanese Americans during World War II?','They were forced into internment camps.',['They were made generals.','They moved to Japan.','They were given free land.'],'Internment violated their rights.','Unfair treatment.'),
 QH('How did World War II change women’s roles in the U.S.?','Many women took jobs in factories while men fought.',['Women could no longer work.','Women stopped voting.','Nothing changed.'],'“Rosie the Riveter” symbolized this.','Rosie the Riveter.'),
 QH('Why did the U.S. drop atomic bombs on Japan in 1945?','to end the war quickly without an invasion',['to start the Cold War','to test new airplanes','to help Germany'],'Leaders hoped to avoid a costly invasion.','End the war.'),
]);
addQ('us7',[
 QI('Which two superpowers were rivals in the Cold War?','the United States and the Soviet Union',['the U.S. and Mexico','Britain and France','Japan and China'],'The U.S. and USSR competed.','Capitalism vs. communism.'),
 QI('What divided East and West Berlin from 1961 to 1989?','the Berlin Wall',['the Great Wall','the Iron Bridge','the Rhine River'],'The Berlin Wall split the city.','A wall.'),
 QH('What was the policy of containment?','stopping the spread of communism',['spreading communism','ending all trade','building walls in the U.S.'],'The U.S. aimed to contain communism.','Contain = hold back.'),
 QH('What was the space race?','Cold War competition to achieve firsts in space',['a car race','a race to build canals','a contest for oil'],'The U.S. and USSR competed in space.','Sputnik and the Moon.'),
 QH('Why did the Korean War and Vietnam War happen?','The U.S. fought to stop communism from spreading in Asia.',['To gain colonies.','To fight Germany.','To end slavery.'],'Both were part of containment.','Cold War conflicts.'),
 QH('What event marked the end of the Cold War?','the collapse of the Soviet Union in 1991',['the Cuban Missile Crisis','the Korean War','the building of the Berlin Wall'],'The USSR dissolved in 1991.','1991.'),
]);
addQ('us8',[
 QI('Who gave the “I Have a Dream” speech?','Martin Luther King Jr.',['Malcolm X','John F. Kennedy','Thurgood Marshall'],'Dr. King gave it in 1963.','March on Washington.'),
 QI('What did the Civil Rights Act of 1964 do?','banned discrimination based on race, color, religion, sex or national origin',['gave women the vote','ended slavery','started the space race'],'It outlawed many kinds of discrimination.','1964.'),
 QH('What did the Voting Rights Act of 1965 do?','banned unfair practices like literacy tests that blocked voters',['gave 18-year-olds the vote','ended Prohibition','created the UN'],'It protected voting rights.','Voting.'),
 QH('Who was the first African American Supreme Court justice?','Thurgood Marshall',['Martin Luther King Jr.','Oliver Hill','Barack Obama'],'Marshall argued Brown v. Board and joined the Court in 1967.','He argued Brown v. Board.'),
 QH('How did the internet change American life?','It made communication and information instant and global.',['It ended all mail.','It slowed business.','It replaced electricity.'],'The internet transformed society.','Instant information.'),
 QH('What was the goal of the women’s rights movement in the 1960s and 1970s?','equal opportunities and pay for women',['to end voting','to stop education','to build canals'],'It fought for equality.','Equality.'),
]);
addQ('us_sk',[
 QI('What is a cause?','something that makes another thing happen',['the result of an event','a date on a timeline','a map key'],'A cause leads to an effect.','Why it happened.'),
 QH('A political cartoon from 1898 shows Uncle Sam stretching across the ocean. What is it likely about?','U.S. expansion overseas',['farming in Kansas','the Civil War','the moon landing'],'1898 was the Spanish-American War era.','1898.'),
 QH('Which is the BEST primary source on daily life in a 1930s Dust Bowl town?','a farmer’s diary from 1935',['a 2010 documentary','a textbook chapter','a modern website summary'],'A diary from the time is primary.','Written then.'),
 QH('Which pair shows cause and effect?','Stock market crash → Great Depression',['Great Depression → stock market crash','Moon landing → Civil War','World War II → Reconstruction'],'The crash helped cause the Depression.','Cause comes first.'),
 QH('How many years passed between the end of the Civil War (1865) and the end of World War II (1945)?','80',['70','90','100'],'1945 − 1865 = 80.','Subtract.'),
 QH('Why should historians compare multiple sources?','to check for bias and get a fuller picture',['to save time','because sources always agree','to avoid reading'],'Different sources show different views.','Bias.'),
]);
// fixes for original Grade 6 templates: no identical points, no fractions like 2/2 as a divisor
(function(){
const fix=(g,bad)=>{const o=GEN[g];if(!o)return;GEN[g]=function(){let q;for(let i=0;i<30;i++){q=o();if(!bad(q))return q;}return q;};};
fix('g6_coord',q=>{const m=q.question.match(/\(([−\-]?\d+), ([−\-]?\d+)\) and \(([−\-]?\d+), ([−\-]?\d+)\)/);return m&&m[1]===m[3]&&m[2]===m[4];});
fix('g6_ops',q=>{const m=q.question.match(/÷ (\d+)\/(\d+)/);return m&&m[1]===m[2];});
})();
})();

