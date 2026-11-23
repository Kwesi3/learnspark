// ═══════════════════════════════════════════════════════════════
// CONTENT EXPANSION — IXL-style depth
// Adds many question VARIANTS per strand + new strands + bigger banks
// ═══════════════════════════════════════════════════════════════

// Hardened multiple-choice builder:
//  • removes duplicate options (a distractor colliding with the answer)
//  • guarantees the correct answer is always present
//  • always leaves at least 3 choices
function mcq(badge,sol,question,opts,answer,expl,hint,extra){
  const A=String(answer);
  // dedupe by string value, preserving order
  const seen=new Set(); const clean=[];
  for(const o of opts){const k=String(o); if(!seen.has(k)){seen.add(k); clean.push(o);} }
  // guarantee the answer is in the list
  if(!seen.has(A)){clean.unshift(answer); seen.add(A);}
  // if dedupe left us short, invent safe distractors (handles "$12" and "88 cm²" too)
  let guard=0;
  const m=A.match(/^([^\d\-]*)(-?\d+(?:\.\d+)?)(.*)$/); // prefix, number, suffix
  while(clean.length<3 && guard<60){
    guard++;
    if(!m)break;
    const prefix=m[1], base=parseFloat(m[2]), suffix=m[3];
    const dec=(m[2].split('.')[1]||'').length;
    const delta=(1+Math.floor(Math.random()*9))*(Math.random()<.5?-1:1);
    let val=base+delta;
    if(val<0)val=base+Math.abs(delta);
    const k=prefix+val.toFixed(dec)+suffix;
    if(!seen.has(k)){seen.add(k); clean.push(k);}
  }
  return Object.assign({type:'mc',badge,sol,question,opts:shuf(clean),answer,explanation:expl,hint},extra||{});
}

// ───────── GRADE 4 MATH — expanded variants ─────────
GEN.g4_place=()=>{
  const t=rng(0,5);
  if(t===0){const n=rng(1000,999999);const s=n.toString();const pos=rng(0,s.length-1);
    const d=+s[pos];const place=Math.pow(10,s.length-1-pos);const val=d*place;
    const pn={1:'ones',10:'tens',100:'hundreds',1000:'thousands',10000:'ten-thousands',100000:'hundred-thousands'}[place];
    return mcq('Place Value','4.1',`What is the value of the digit ${d} in ${n.toLocaleString()}?`,
      [val.toLocaleString(),String(d),(val*10).toLocaleString(),place.toLocaleString()],val.toLocaleString(),
      `The ${d} sits in the ${pn} place, so its value is ${d} × ${place.toLocaleString()} = ${val.toLocaleString()}.`,
      `Find which place the ${d} is in. Each place is worth 10 times the place to its right.`);}
  if(t===1){const n=rng(1000,99999);const r=Math.round(n/1000)*1000;
    return mcq('Rounding','4.1',`Round ${n.toLocaleString()} to the nearest thousand.`,
      [r.toLocaleString(),(r+1000).toLocaleString(),(r-1000).toLocaleString(),(Math.round(n/100)*100).toLocaleString()],r.toLocaleString(),
      `Look at the hundreds digit (${Math.floor(n/100)%10}). ${Math.floor(n/100)%10>=5?'5 or more → round up':'Less than 5 → round down'}. Answer: ${r.toLocaleString()}.`,
      `Look at the hundreds digit — 5 or more rounds up, less than 5 rounds down.`);}
  if(t===2){const n=rng(100,9999);const r=Math.round(n/100)*100;
    return mcq('Rounding','4.1',`Round ${n.toLocaleString()} to the nearest hundred.`,
      [r.toLocaleString(),(r+100).toLocaleString(),(r-100).toLocaleString(),(Math.round(n/10)*10).toLocaleString()],r.toLocaleString(),
      `Look at the tens digit (${Math.floor(n/10)%10}). ${Math.floor(n/10)%10>=5?'Round up':'Round down'} → ${r.toLocaleString()}.`,
      `The tens digit decides: 5 or more rounds up.`);}
  if(t===3){const a=rng(1000,99999),b=rng(1000,99999);
    return mcq('Compare','4.1',`Which symbol makes this true?   ${a.toLocaleString()} ___ ${b.toLocaleString()}`,
      ['<','>','='],a<b?'<':a>b?'>':'=',
      `Compare from the left. ${a.toLocaleString()} ${a<b?'<':a>b?'>':'='} ${b.toLocaleString()}.`,
      `Compare digit by digit starting at the biggest place value.`);}
  if(t===4){const n=rng(1000,99999);const s=n.toString();
    const expanded=s.split('').map((d,i)=>+d*Math.pow(10,s.length-1-i)).filter(v=>v>0);
    const correct=expanded.join(' + ');
    const wrong1=s.split('').filter(d=>+d>0).join(' + ');
    const wrong2=expanded.map(v=>v*10).join(' + ');
    return mcq('Expanded Form','4.1',`Which shows ${n.toLocaleString()} in expanded form?`,
      [correct,wrong1,wrong2],correct,
      `Each digit's value: ${correct} = ${n.toLocaleString()}.`,
      `Break the number apart by each digit's place value.`);}
  const n=rng(10000,999999);const words=['ten thousands','thousands','hundreds','tens'];
  const s=n.toString();const d1=+s[0];
  return mcq('Place Value','4.1',`In ${n.toLocaleString()}, which digit is in the thousands place?`,
    [s[s.length-4],s[s.length-3],s[s.length-2],s[s.length-1]],s[s.length-4],
    `Count from the right: ones, tens, hundreds, thousands. The thousands digit is ${s[s.length-4]}.`,
    `Count places from the RIGHT: ones, tens, hundreds, then thousands.`);
};

GEN.g4_frac=()=>{
  const t=rng(0,5);
  if(t===0){const d=pick([2,3,4,5,6,8]);const n=rng(1,d-1);const m=rng(2,4);
    return mcq('Equivalent Fractions','4.2',`Which fraction is equivalent to ${n}/${d}?`,
      [`${n*m}/${d*m}`,`${n+1}/${d}`,`${n}/${d+m}`,`${n*m}/${d}`],`${n*m}/${d*m}`,
      `Multiply top AND bottom by ${m}: ${n}×${m}=${n*m}, ${d}×${m}=${d*m}. So ${n}/${d} = ${n*m}/${d*m}.`,
      `Multiply the top and the bottom by the SAME number.`);}
  if(t===1){const d=pick([4,6,8,10,12]);let n1=rng(1,d-1),n2=rng(1,d-1);while(n1===n2)n2=rng(1,d-1);
    return mcq('Compare Fractions','4.2',`Which symbol makes this true?   ${n1}/${d} ___ ${n2}/${d}`,
      ['<','>','='],n1<n2?'<':'>',
      `Same denominator — compare the numerators. ${n1} ${n1<n2?'<':'>'} ${n2}.`,
      `When the bottoms match, the bigger top is the bigger fraction.`);}
  if(t===2){const n=rng(1,3);const d1=pick([4,6,8]);const d2=pick([2,3]);
    const v1=n/d1,v2=n/d2;
    return mcq('Compare Fractions','4.2',`Which symbol makes this true?   ${n}/${d1} ___ ${n}/${d2}`,
      ['<','>','='],v1<v2?'<':v1>v2?'>':'=',
      `Same numerator: the SMALLER denominator makes the BIGGER piece. ${n}/${d1} ${v1<v2?'<':'>'} ${n}/${d2}.`,
      `Same top? Then more pieces (bigger bottom) means SMALLER pieces.`);}
  if(t===3){const d=pick([4,6,8,10]);const n=rng(2,d-1);const g=gcd(n,d);
    if(g===1)return GEN.g4_frac();
    return mcq('Simplify','4.2',`Write ${n}/${d} in simplest form.`,
      [`${n/g}/${d/g}`,`${n}/${d}`,`${n-1}/${d-1}`,`${n*2}/${d*2}`],`${n/g}/${d/g}`,
      `The GCF of ${n} and ${d} is ${g}. Divide both by ${g}: ${n/g}/${d/g}.`,
      `Find the biggest number that divides BOTH the top and bottom.`);}
  if(t===4){const whole=rng(1,4);const d=pick([2,3,4,5]);const n=rng(1,d-1);
    const imp=whole*d+n;
    return mcq('Mixed Numbers','4.2',`Write ${whole} ${n}/${d} as an improper fraction.`,
      [`${imp}/${d}`,`${whole+n}/${d}`,`${imp}/${d+whole}`,`${whole*n}/${d}`],`${imp}/${d}`,
      `Multiply whole × bottom, then add top: (${whole}×${d})+${n} = ${imp}. Keep the bottom: ${imp}/${d}.`,
      `Whole × denominator + numerator, all over the same denominator.`);}
  const d=pick([4,6,8]);const shaded=rng(1,d-1);
  return mcq('Fractions','4.2',`A shape is divided into ${d} equal parts. ${shaded} part${shaded>1?'s are':' is'} shaded. What fraction is shaded?`,
    [`${shaded}/${d}`,`${d}/${shaded}`,`${d-shaded}/${d}`,`${shaded}/${d-shaded}`],`${shaded}/${d}`,
    `Shaded parts on top (${shaded}), total parts on bottom (${d}): ${shaded}/${d}.`,
    `Numerator = parts shaded. Denominator = total equal parts.`);
};

GEN.g4_dec=()=>{
  const t=rng(0,5);
  if(t===0){const w=rng(1,9),te=rng(0,9),h=rng(0,9);const dec=`${w}.${te}${h}`;
    const pn=pick([['tenths',te],['hundredths',h]]);
    return mcq('Decimal Place Value','4.3',`In ${dec}, which digit is in the ${pn[0]} place?`,
      [String(pn[1]),String(w),String((pn[1]+1)%10),String((pn[1]+3)%10)],String(pn[1]),
      `After the decimal point: tenths first, hundredths second. The ${pn[0]} digit is ${pn[1]}.`,
      `First digit after the decimal = tenths. Second = hundredths.`);}
  if(t===1){const a=(rng(10,99)/10).toFixed(1),b=(rng(10,99)/10).toFixed(1);
    return mcq('Compare Decimals','4.3',`Which symbol makes this true?   ${a} ___ ${b}`,
      ['<','>','='],+a<+b?'<':+a>+b?'>':'=',
      `Line up the decimal points and compare: ${a} ${+a<+b?'<':+a>+b?'>':'='} ${b}.`,
      `Line up decimal points, then compare left to right.`);}
  if(t===2){const n=(rng(100,999)/100).toFixed(2);const r=(Math.round(+n*10)/10).toFixed(1);
    return mcq('Round Decimals','4.3',`Round ${n} to the nearest tenth.`,
      [r,(+r+0.1).toFixed(1),(+r-0.1).toFixed(1),Math.round(+n).toFixed(1)],r,
      `Look at the hundredths digit. ${n} rounds to ${r}.`,
      `The hundredths digit decides: 5 or more rounds the tenths up.`);}
  if(t===3){const pairs=[['1/2','0.5'],['1/4','0.25'],['3/4','0.75'],['1/10','0.1'],['3/10','0.3'],['1/5','0.2'],['7/10','0.7']];
    const p=pick(pairs);
    return mcq('Fraction → Decimal','4.3',`Write ${p[0]} as a decimal.`,
      [p[1],(+p[1]*10).toFixed(1),(+p[1]/10).toFixed(3),(+p[1]+0.1).toFixed(2)],p[1],
      `${p[0]} = ${p[1]}. Divide the top by the bottom.`,
      `Divide the numerator by the denominator.`);}
  if(t===4){const money=(rng(100,999)/100).toFixed(2);const paid=Math.ceil(+money);
    const change=(paid-+money).toFixed(2);
    return mcq('Money','4.3',`An item costs $${money}. You pay with $${paid}.00. How much change do you get?`,
      [`$${change}`,`$${(+change+0.1).toFixed(2)}`,`$${(+change+1).toFixed(2)}`,`$${money}`],`$${change}`,
      `$${paid}.00 − $${money} = $${change}.`,
      `Change = amount paid − cost. Line up the decimal points.`);}
  const vals=[(rng(10,99)/10).toFixed(1),(rng(10,99)/100).toFixed(2),(rng(10,99)/10).toFixed(1)];
  const sorted=[...vals].sort((a,b)=>+a-+b);
  return mcq('Order Decimals','4.3',`Order from LEAST to GREATEST:  ${vals.join(', ')}`,
    [sorted.join(', '),[...sorted].reverse().join(', '),vals.join(', ')],sorted.join(', '),
    `Compare place by place: ${sorted.join(' < ')}.`,
    `Add zeros so all have the same number of decimal places, then compare.`);
};

GEN.g4_ops=()=>{
  const t=rng(0,5);
  if(t===0){const a=rng(100,999),b=rng(2,9);const ans=a*b;
    return mcq('Multiplication','4.4',`${a} × ${b} = ?`,
      [ans,ans+b,ans-b,ans+10],ans,
      `${a} × ${b} = ${ans}. Multiply ones, then tens, then hundreds — carrying as needed.`,
      `Multiply each digit by ${b} starting from the ones place. Carry when the product is 10 or more.`);}
  if(t===1){const a=rng(11,99),b=rng(11,49);const ans=a*b;
    return mcq('2-Digit × 2-Digit','4.4',`${a} × ${b} = ?`,
      [ans,ans+a,ans-b,ans+100],ans,
      `${a} × ${b}: multiply by the ones (${b%10}), then by the tens (${Math.floor(b/10)}0), then add. = ${ans}.`,
      `Break it up: multiply by the ones digit, then the tens digit, then add the two results.`);}
  if(t===2){const b=rng(3,9),q=rng(20,120),a=b*q+rng(0,b-1);const quo=Math.floor(a/b),rem=a%b;
    return mcq('Division','4.4',`${a} ÷ ${b} = ?`,
      [rem?`${quo} R${rem}`:`${quo}`,`${quo+1}${rem?' R'+rem:''}`,`${quo} R${(rem+1)%b}`,`${quo-1} R${rem}`],
      rem?`${quo} R${rem}`:`${quo}`,
      `${a} ÷ ${b} = ${quo}${rem?' remainder '+rem:''}. Check: ${b}×${quo}${rem?'+'+rem:''} = ${a}.`,
      `How many times does ${b} fit into ${a}? Whatever is left over is the remainder.`);}
  if(t===3){const n1=rn(),item=ri();const groups=rng(12,40),per=rng(4,12);const ans=groups*per;
    return mcq('Word Problem','4.4',`${n1} has ${groups} boxes. Each box holds ${per} ${item}. How many ${item} in all?`,
      [ans,groups+per,ans-per,ans+groups],ans,
      `Equal groups → multiply. ${groups} × ${per} = ${ans} ${item}.`,
      `"Each" with equal groups means MULTIPLY.`);}
  if(t===4){const n1=rn();const total=rng(60,300),parts=rng(4,9);
    const each=Math.floor(total/parts),rem=total%parts;
    return mcq('Word Problem','4.4',`${n1} shares ${total} stickers equally among ${parts} friends. How many does each friend get${rem?', and how many are left over':''}?`,
      [rem?`${each} each, ${rem} left`:`${each} each`,`${each+1} each`,`${total-parts} each`,`${parts} each`],
      rem?`${each} each, ${rem} left`:`${each} each`,
      `${total} ÷ ${parts} = ${each}${rem?' remainder '+rem:''}.`,
      `Sharing equally means DIVIDE.`);}
  const a=rng(20,60),b=rng(2,9);const est=Math.round(a/10)*10*b;
  return mcq('Estimation','4.4',`Estimate: ${a} × ${b} ≈ ?  (Round ${a} to the nearest ten first.)`,
    [est,est+50,est-30,a*b],est,
    `Round ${a} to ${Math.round(a/10)*10}. Then ${Math.round(a/10)*10} × ${b} = ${est}.`,
    `Round the bigger number to the nearest ten, then multiply.`);
};

GEN.g4_fracops=()=>{
  const t=rng(0,4);
  if(t===0){const d=pick([4,5,6,8,10]);let n1=rng(1,d-2),n2=rng(1,d-n1);
    const sum=n1+n2;const g=gcd(sum,d);
    return mcq('Add Fractions','4.5',`${n1}/${d} + ${n2}/${d} = ?`,
      [g>1?`${sum/g}/${d/g}`:`${sum}/${d}`,`${sum}/${d*2}`,`${sum+1}/${d}`,`${n1*n2}/${d}`],
      g>1?`${sum/g}/${d/g}`:`${sum}/${d}`,
      `Same bottom: add the tops. ${n1}+${n2}=${sum}, keep /${d}${g>1?`. Simplify: ${sum/g}/${d/g}`:''}.`,
      `Same denominator? Just add the numerators. Keep the denominator the same.`);}
  if(t===1){const d=pick([4,5,6,8,10]);let n1=rng(2,d-1),n2=rng(1,n1-1);
    const diff=n1-n2;const g=gcd(diff,d);
    return mcq('Subtract Fractions','4.5',`${n1}/${d} − ${n2}/${d} = ?`,
      [g>1?`${diff/g}/${d/g}`:`${diff}/${d}`,`${diff}/${d*2}`,`${n1+n2}/${d}`,`${diff+1}/${d}`],
      g>1?`${diff/g}/${d/g}`:`${diff}/${d}`,
      `Same bottom: subtract the tops. ${n1}−${n2}=${diff}${g>1?`. Simplify: ${diff/g}/${d/g}`:''}.`,
      `Same denominator? Subtract the numerators, keep the denominator.`);}
  if(t===2){const a=(rng(10,90)/10).toFixed(1),b=(rng(10,90)/10).toFixed(1);
    const ans=(+a + +b).toFixed(1);
    return mcq('Add Decimals','4.5',`${a} + ${b} = ?`,
      [ans,(+ans+0.1).toFixed(1),(+ans-1).toFixed(1),(+a * +b).toFixed(1)],ans,
      `Line up the decimal points: ${a} + ${b} = ${ans}.`,
      `Stack them so the decimal points line up, then add.`);}
  if(t===3){const a=(rng(30,90)/10).toFixed(1);const b=(rng(1,+a*10-1)/10).toFixed(1);
    const ans=(+a - +b).toFixed(1);
    return mcq('Subtract Decimals','4.5',`${a} − ${b} = ?`,
      [ans,(+ans+0.1).toFixed(1),(+ans-0.1).toFixed(1),(+a + +b).toFixed(1)],ans,
      `Line up the decimals: ${a} − ${b} = ${ans}.`,
      `Line up the decimal points before subtracting.`);}
  const d=pick([4,6,8]);const eaten=rng(1,d-2);const left=d-eaten;const g=gcd(left,d);
  return mcq('Fraction Word Problem','4.5',`A pizza is cut into ${d} equal slices. ${eaten} slice${eaten>1?'s are':' is'} eaten. What fraction is LEFT?`,
    [g>1?`${left/g}/${d/g}`:`${left}/${d}`,`${eaten}/${d}`,`${d}/${left}`,`${left}/${eaten}`],
    g>1?`${left/g}/${d/g}`:`${left}/${d}`,
    `${d} − ${eaten} = ${left} slices left, out of ${d}: ${left}/${d}${g>1?` = ${left/g}/${d/g}`:''}.`,
    `Find how many slices are LEFT, then put that over the total.`);
};

GEN.g4_area=()=>{
  const t=rng(0,4);const l=rng(3,15),w=rng(2,12);
  if(t===0)return mcq('Area','4.7',`A rectangle is ${l} cm long and ${w} cm wide. What is its AREA?`,
    [`${l*w} cm²`,`${2*(l+w)} cm²`,`${l+w} cm²`,`${l*w+4} cm²`],`${l*w} cm²`,
    `Area = length × width = ${l} × ${w} = ${l*w} cm².`,`Area of a rectangle = length × width.`);
  if(t===1)return mcq('Perimeter','4.7',`A rectangle is ${l} m long and ${w} m wide. What is its PERIMETER?`,
    [`${2*(l+w)} m`,`${l*w} m`,`${l+w} m`,`${2*l+w} m`],`${2*(l+w)} m`,
    `Perimeter = 2 × (${l} + ${w}) = ${2*(l+w)} m.`,`Perimeter = add all 4 sides: 2×(length + width).`);
  if(t===2){const s=rng(3,14);
    return mcq('Square','4.7',`A square has sides of ${s} inches. Find its area AND perimeter.`,
      [`Area ${s*s}, Perimeter ${4*s}`,`Area ${4*s}, Perimeter ${s*s}`,`Area ${s*s}, Perimeter ${s*s}`,`Area ${2*s}, Perimeter ${4*s}`],
      `Area ${s*s}, Perimeter ${4*s}`,
      `Square area = side × side = ${s}×${s} = ${s*s}. Perimeter = 4 × ${s} = ${4*s}.`,
      `All 4 sides of a square are equal.`);}
  if(t===3){const area=l*w;
    return mcq('Missing Side','4.7',`A rectangle has an area of ${area} cm² and a length of ${l} cm. What is its WIDTH?`,
      [`${w} cm`,`${l} cm`,`${area-l} cm`,`${w+2} cm`],`${w} cm`,
      `Area ÷ length = width. ${area} ÷ ${l} = ${w} cm.`,
      `Work backwards: if area = length × width, then width = area ÷ length.`);}
  const cost=rng(2,6);
  return mcq('Area Word Problem','4.7',`A room is ${l} ft long and ${w} ft wide. Carpet costs $${cost} per square foot. What is the total cost?`,
    [`$${l*w*cost}`,`$${(l+w)*cost}`,`$${l*w}`,`$${2*(l+w)*cost}`],`$${l*w*cost}`,
    `Area = ${l}×${w} = ${l*w} sq ft. Cost = ${l*w} × $${cost} = $${l*w*cost}.`,
    `First find the AREA, then multiply by the cost per square foot.`);
};

GEN.g4_measure=()=>{
  const t=rng(0,3);
  const conv=pick([['feet','inches',12,'1 foot = 12 inches'],['yards','feet',3,'1 yard = 3 feet'],
    ['meters','centimeters',100,'1 meter = 100 cm'],['kilometers','meters',1000,'1 km = 1000 m'],
    ['pounds','ounces',16,'1 pound = 16 ounces'],['gallons','quarts',4,'1 gallon = 4 quarts'],
    ['hours','minutes',60,'1 hour = 60 minutes'],['weeks','days',7,'1 week = 7 days']]);
  if(t===0){const q=rng(2,9);const ans=q*conv[2];
    return mcq('Convert Units','4.8',`Convert:  ${q} ${conv[0]} = ? ${conv[1]}`,
      [ans,ans+conv[2],ans-conv[2],q+conv[2]],ans,
      `${conv[3]}. So ${q} × ${conv[2]} = ${ans} ${conv[1]}.`,
      `${conv[3]}. Big units → small units means MULTIPLY.`);}
  if(t===1){const mult=rng(2,8);const big=mult*conv[2];
    return mcq('Convert Units','4.8',`Convert:  ${big} ${conv[1]} = ? ${conv[0]}`,
      [mult,mult*2,big-conv[2],mult+1],mult,
      `${conv[3]}. So ${big} ÷ ${conv[2]} = ${mult} ${conv[0]}.`,
      `Small units → big units means DIVIDE.`);}
  if(t===2){const items=[['a pencil','centimeters'],['a football field','yards'],['a bag of flour','pounds'],['a glass of milk','cups'],['the distance between cities','kilometers']];
    const it=pick(items);
    return mcq('Choose the Unit','4.8',`Which unit would you use to measure ${it[0]}?`,
      [it[1],'tons','miles','gallons'].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4),it[1],
      `${it[1]} is the most sensible unit for ${it[0]}.`,
      `Think about the SIZE of the object and pick a matching unit.`);}
  const a=rng(2,8),b=rng(1,11);const totalIn=a*12+b;
  return mcq('Mixed Units','4.8',`How many inches are in ${a} feet ${b} inches?`,
    [totalIn,a*12,totalIn+12,a+b],totalIn,
    `${a} feet = ${a*12} inches. Plus ${b} more = ${totalIn} inches.`,
    `Convert the feet to inches first, then add the extra inches.`);
};

GEN.g4_time=()=>{
  const t=rng(0,2);
  const fmt=(h,m)=>`${h}:${m.toString().padStart(2,'0')}`;
  if(t===0){const sh=rng(1,10),sm=pick([0,15,30,45]);const dh=rng(1,3),dm=pick([0,15,30,45]);
    let eh=sh+dh,em=sm+dm;if(em>=60){em-=60;eh++;}
    return mcq('Elapsed Time','4.9',`A movie starts at ${fmt(sh,sm)} and lasts ${dh} hour${dh>1?'s':''} ${dm} minutes. What time does it END?`,
      [fmt(eh,em),fmt(eh+1,em),fmt(eh,(em+15)%60),fmt(eh-1,em)],fmt(eh,em),
      `Add ${dh}h ${dm}min to ${fmt(sh,sm)} → ${fmt(eh,em)}.`,
      `Add the hours first, then the minutes. If minutes reach 60, carry an hour.`);}
  if(t===1){const sh=rng(1,8),sm=pick([0,15,30,45]);const dh=rng(1,3),dm=pick([0,15,30]);
    let eh=sh+dh,em=sm+dm;if(em>=60){em-=60;eh++;}
    return mcq('Elapsed Time','4.9',`School starts at ${fmt(sh,sm)} and ends at ${fmt(eh,em)}. How much time passed?`,
      [`${dh} h ${dm} min`,`${dh+1} h ${dm} min`,`${dh} h ${dm+15} min`,`${dh} h`],`${dh} h ${dm} min`,
      `From ${fmt(sh,sm)} to ${fmt(eh,em)} is ${dh} hour${dh>1?'s':''} and ${dm} minutes.`,
      `Count the whole hours first, then the extra minutes.`);}
  const eh=rng(3,10),em=pick([0,15,30,45]);const dh=rng(1,2),dm=pick([0,15,30]);
  let sh=eh-dh,sm=em-dm;if(sm<0){sm+=60;sh--;}
  return mcq('Elapsed Time','4.9',`A game ENDED at ${fmt(eh,em)}. It lasted ${dh} hour${dh>1?'s':''} ${dm} minutes. What time did it START?`,
    [fmt(sh,sm),fmt(sh-1,sm),fmt(sh+1,sm),fmt(eh,sm)],fmt(sh,sm),
    `Work backwards: ${fmt(eh,em)} minus ${dh}h ${dm}min = ${fmt(sh,sm)}.`,
    `Work BACKWARDS from the end time — subtract the hours and minutes.`);
};

GEN.g4_angle=()=>{
  const t=rng(0,2);
  if(t===0){const deg=pick([rng(20,80),90,rng(100,170),rng(20,80)]);
    return mcq('Angles','4.10',`An angle measures ${deg}°. What type of angle is it?`,
      ['Acute','Right','Obtuse','Straight'],deg===90?'Right':deg<90?'Acute':'Obtuse',
      `${deg}° is ${deg===90?'exactly 90° → a RIGHT angle':deg<90?'less than 90° → an ACUTE angle':'between 90° and 180° → an OBTUSE angle'}.`,
      `Right = exactly 90°. Acute = smaller than 90°. Obtuse = bigger than 90°.`);}
  if(t===1){const a=rng(20,80);const b=180-a;
    return mcq('Supplementary Angles','4.10',`Two angles form a straight line. One is ${a}°. What is the other?`,
      [`${b}°`,`${90-a}°`,`${a}°`,`${b+10}°`],`${b}°`,
      `A straight line = 180°. So 180° − ${a}° = ${b}°.`,
      `Angles on a straight line always add up to 180°.`);}
  const terms=[['ray','has one endpoint and goes on forever in one direction'],
    ['line segment','has two endpoints'],['line','goes on forever in both directions'],
    ['point','an exact location with no size']];
  const term=pick(terms);
  return mcq('Lines & Points','4.10',`Which term describes something that ${term[1]}?`,
    ['Ray','Line segment','Line','Point'],term[0].charAt(0).toUpperCase()+term[0].slice(1),
    `A ${term[0]} ${term[1]}.`,`Think about endpoints — how many does it have?`);
};

GEN.g4_shape=()=>{
  const t=rng(0,3);
  if(t===0){const s=pick([['Equilateral','all 3 sides equal'],['Isosceles','exactly 2 sides equal'],
      ['Scalene','no sides equal'],['Right','one 90° angle']]);
    return mcq('Triangles','4.12',`A triangle with ${s[1]} is called what?`,
      ['Equilateral','Isosceles','Scalene','Right'],s[0],
      `A triangle with ${s[1]} is ${s[0].toLowerCase()}.`,
      `Look carefully at whether the clue describes SIDES or ANGLES.`);}
  if(t===1){const q=pick([['Square','4 equal sides and 4 right angles'],['Rectangle','4 right angles with opposite sides equal'],
      ['Rhombus','4 equal sides but not always right angles'],['Trapezoid','exactly one pair of parallel sides']]);
    return mcq('Quadrilaterals','4.12',`Which quadrilateral has ${q[1]}?`,
      ['Square','Rectangle','Rhombus','Trapezoid'],q[0],
      `A ${q[0].toLowerCase()} has ${q[1]}.`,`Focus on the exact properties described.`);}
  if(t===2){const a=rng(30,80),b=rng(30,80);const c=180-a-b;
    return mcq('Triangle Angles','4.12',`A triangle has angles of ${a}° and ${b}°. What is the THIRD angle?`,
      [`${c}°`,`${c+10}°`,`${180-a}°`,`${a+b}°`],`${c}°`,
      `All 3 angles of a triangle add to 180°. 180 − ${a} − ${b} = ${c}°.`,
      `The three angles of any triangle always add up to 180°.`);}
  const shapes=[['Square',4],['Rectangle',2],['Equilateral triangle',3],['Circle','infinite']];
  const s=pick(shapes.slice(0,3));
  return mcq('Symmetry','4.12',`How many lines of symmetry does a ${s[0].toLowerCase()} have?`,
    [String(s[1]),String(+s[1]+1),String(+s[1]-1),'0'],String(s[1]),
    `A ${s[0].toLowerCase()} has ${s[1]} line${s[1]===1?'':'s'} of symmetry.`,
    `A line of symmetry folds the shape into two matching halves.`);
};

GEN.g4_prob=()=>{
  const t=rng(0,2);
  const r=rng(2,6),b=rng(2,6),g=rng(1,4);const tot=r+b+g;
  if(t===0){const which=pick([['red',r],['blue',b],['green',g]]);const gd=gcd(which[1],tot);
    return mcq('Probability','4.13',`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of drawing a ${which[0]} marble?`,
      [gd>1?`${which[1]/gd}/${tot/gd}`:`${which[1]}/${tot}`,`${which[1]}/${which[1]}`,`${tot}/${which[1]}`,`${which[1]+1}/${tot}`],
      gd>1?`${which[1]/gd}/${tot/gd}`:`${which[1]}/${tot}`,
      `P(${which[0]}) = ${which[1]} favorable ÷ ${tot} total = ${which[1]}/${tot}${gd>1?` = ${which[1]/gd}/${tot/gd}`:''}.`,
      `Probability = (how many you want) ÷ (total number).`);}
  if(t===1){const which=pick([['red',r],['blue',b]]);const notCount=tot-which[1];const gd=gcd(notCount,tot);
    return mcq('Probability','4.13',`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of NOT drawing ${which[0]}?`,
      [gd>1?`${notCount/gd}/${tot/gd}`:`${notCount}/${tot}`,`${which[1]}/${tot}`,`${tot}/${notCount}`,`${notCount+1}/${tot}`],
      gd>1?`${notCount/gd}/${tot/gd}`:`${notCount}/${tot}`,
      `Not ${which[0]} = ${tot} − ${which[1]} = ${notCount}. So ${notCount}/${tot}${gd>1?` = ${notCount/gd}/${tot/gd}`:''}.`,
      `Count everything that is NOT that color, then put it over the total.`);}
  const events=[['certain','the sun will rise tomorrow'],['impossible','a rolled die shows a 7'],
    ['likely','you pull a red marble from a bag of 9 red and 1 blue'],['unlikely','you pull the 1 blue from a bag of 9 red and 1 blue']];
  const e=pick(events);
  return mcq('Likelihood','4.13',`How likely is this event: ${e[1]}?`,
    ['Certain','Impossible','Likely','Unlikely'],e[0].charAt(0).toUpperCase()+e[0].slice(1),
    `This event is ${e[0]}.`,`Certain = always happens. Impossible = can never happen.`);
};

GEN.g4_data=()=>{
  const cats=['Mon','Tue','Wed','Thu','Fri'];const vals=cats.map(()=>rng(2,20));
  const t=rng(0,4);
  const dataStr=cats.map((c,i)=>`${c}=${vals[i]}`).join(', ');
  if(t===0){const mi=vals.indexOf(Math.max(...vals));
    return mcq('Read a Graph','4.14',`A graph shows: ${dataStr}.\nWhich day had the MOST?`,
      cats,cats[mi],`${cats[mi]} had the highest value (${vals[mi]}).`,`Find the biggest number, then read its label.`);}
  if(t===1){const mi=vals.indexOf(Math.min(...vals));
    return mcq('Read a Graph','4.14',`A graph shows: ${dataStr}.\nWhich day had the FEWEST?`,
      cats,cats[mi],`${cats[mi]} had the lowest value (${vals[mi]}).`,`Find the smallest number, then read its label.`);}
  if(t===2){const total=vals.reduce((a,b)=>a+b,0);
    return mcq('Read a Graph','4.14',`A graph shows: ${dataStr}.\nWhat is the TOTAL?`,
      [total,total+3,total-4,total+10],total,`Add them all: ${vals.join(' + ')} = ${total}.`,`Add up every value shown.`);}
  if(t===3){const d=Math.abs(vals[0]-vals[1]);const bigger=vals[0]>vals[1]?cats[0]:cats[1];const smaller=vals[0]>vals[1]?cats[1]:cats[0];
    return mcq('Compare Data','4.14',`A graph shows: ${cats[0]}=${vals[0]}, ${cats[1]}=${vals[1]}.\nHow many MORE on ${bigger} than ${smaller}?`,
      [d,d+2,d-1,vals[0]+vals[1]],d,`Subtract: ${Math.max(vals[0],vals[1])} − ${Math.min(vals[0],vals[1])} = ${d}.`,
      `"How many more" means SUBTRACT.`);}
  const nums=[rng(2,10),rng(2,10),rng(2,10),rng(2,10)];const sum=nums.reduce((a,b)=>a+b,0);
  const mean=sum/nums.length;
  if(!Number.isInteger(mean))return GEN.g4_data();
  return mcq('Average','4.14',`Find the AVERAGE (mean) of: ${nums.join(', ')}`,
    [mean,mean+1,mean-1,sum],mean,
    `Add them: ${nums.join('+')} = ${sum}. Divide by ${nums.length}: ${sum} ÷ ${nums.length} = ${mean}.`,
    `Average = add all the numbers, then divide by how many there are.`);
};

GEN.g4_pattern=()=>{
  const t=rng(0,3);const start=rng(2,9);
  if(t===0){const step=rng(2,9);const seq=[start,start+step,start+2*step,start+3*step];
    return mcq('Number Patterns','4.15',`What comes NEXT?   ${seq.join(', ')}, ___`,
      [start+4*step,start+5*step,start+3*step+1,start+4*step+step],start+4*step,
      `The rule is +${step} each time. ${seq[3]} + ${step} = ${start+4*step}.`,
      `Find the jump between each pair of numbers.`);}
  if(t===1){const mult=rng(2,3);const seq=[start,start*mult,start*mult**2,start*mult**3];
    return mcq('Number Patterns','4.15',`What comes NEXT?   ${seq.join(', ')}, ___`,
      [seq[3]*mult,seq[3]+start,seq[3]*mult+1,seq[3]+seq[2]],seq[3]*mult,
      `The rule is ×${mult} each time. ${seq[3]} × ${mult} = ${seq[3]*mult}.`,
      `Is it adding or multiplying? Check what happens between each number.`);}
  if(t===2){const step=rng(3,9);const first=rng(40,90);const seq=[first,first-step,first-2*step,first-3*step];
    return mcq('Number Patterns','4.15',`What comes NEXT?   ${seq.join(', ')}, ___`,
      [first-4*step,first-3*step,first-5*step,first-4*step-1],first-4*step,
      `The rule is −${step} each time. ${seq[3]} − ${step} = ${first-4*step}.`,
      `The numbers are getting smaller — find how much is subtracted.`);}
  const step=rng(2,7);const seq=[start,start+step,'?',start+3*step,start+4*step];
  return mcq('Missing Number','4.15',`Find the MISSING number:   ${seq.join(', ')}`,
    [start+2*step,start+2*step+1,start+step,start+3*step],start+2*step,
    `The rule is +${step}. So the missing number is ${start+step} + ${step} = ${start+2*step}.`,
    `Work out the rule from the numbers you CAN see.`);
};

GEN.g4_eq=()=>{
  const t=rng(0,4);const ans=rng(2,20);
  if(t===0){const b=rng(1,15);
    return mcq('Solve Equations','4.16',`Solve for □:   □ + ${b} = ${ans+b}`,
      [ans,ans+b,ans-1,ans+2],ans,
      `Undo the +${b}: ${ans+b} − ${b} = ${ans}.`,`To undo adding, SUBTRACT from both sides.`);}
  if(t===1){const b=rng(1,15);
    return mcq('Solve Equations','4.16',`Solve for □:   □ − ${b} = ${ans}`,
      [ans+b,ans-b,ans,b],ans+b,
      `Undo the −${b}: ${ans} + ${b} = ${ans+b}.`,`To undo subtracting, ADD to both sides.`);}
  if(t===2){const f=rng(2,9);
    return mcq('Solve Equations','4.16',`Solve for □:   ${f} × □ = ${f*ans}`,
      [ans,ans+1,ans*2,f],ans,
      `Undo the ×${f}: ${f*ans} ÷ ${f} = ${ans}.`,`To undo multiplying, DIVIDE both sides.`);}
  if(t===3){const f=rng(2,9);
    return mcq('Solve Equations','4.16',`Solve for □:   □ ÷ ${f} = ${ans}`,
      [ans*f,ans+f,ans-f,ans],ans*f,
      `Undo the ÷${f}: ${ans} × ${f} = ${ans*f}.`,`To undo dividing, MULTIPLY both sides.`);}
  const n1=rn();const start=rng(20,60),spent=rng(5,19);const left=start-spent;
  return mcq('Write an Equation','4.16',`${n1} had ${start} dollars and spent some. Now ${n1} has ${left} dollars. Which equation finds how much was spent (s)?`,
    [`${start} − s = ${left}`,`${start} + s = ${left}`,`s − ${start} = ${left}`,`${left} − ${start} = s`],`${start} − s = ${left}`,
    `Started with ${start}, spent s, has ${left} left: ${start} − s = ${left}. (s = ${spent})`,
    `Start amount minus what was spent equals what's left.`);
};

// ───────── GRADE 6 MATH — expanded variants ─────────
GEN.g6_ratio=()=>{
  const t=rng(0,4);
  if(t===0){const a=rng(2,9),b=rng(2,9);const n1=ri(),n2=ri();
    return mcq('Write a Ratio','6.PFA.1',`A basket has ${a} ${n1} and ${b} ${n2}. What is the ratio of ${n1} to ${n2}?`,
      [`${a}:${b}`,`${b}:${a}`,`${a}:${a+b}`,`${a+b}:${b}`],`${a}:${b}`,
      `Ratio of ${n1} to ${n2} = ${a} to ${b} = ${a}:${b} (order matters!).`,
      `Write the quantities in the order named: ${n1} first, then ${n2}.`);}
  if(t===1){const a=rng(2,6),b=rng(2,6);const g=gcd(a,b);const m=rng(2,4);
    return mcq('Equivalent Ratios','6.PFA.1',`Which ratio is EQUIVALENT to ${a}:${b}?`,
      [`${a*m}:${b*m}`,`${a+m}:${b+m}`,`${a}:${b*m}`,`${a*m}:${b}`],`${a*m}:${b*m}`,
      `Multiply BOTH parts by the same number: ${a}×${m}:${b}×${m} = ${a*m}:${b*m}.`,
      `Equivalent ratios come from multiplying (or dividing) BOTH numbers by the same value.`);}
  if(t===2){const a=rng(2,6),b=rng(2,6);const m=rng(2,4);
    return mcq('Ratio Tables','6.PFA.1',`A ratio table follows ${a}:${b}. If the first column grows to ${a*m}, what is the matching second value?`,
      [`${b*m}`,`${b+m}`,`${b*m+1}`,`${a*m}`],`${b*m}`,
      `${a} became ${a*m} (×${m}), so ${b} becomes ${b}×${m} = ${b*m}. The ratio stays ${a}:${b}.`,
      `Whatever you multiply the first value by, multiply the second value by the same amount.`);}
  if(t===3){const total=rng(3,9)*5;const r1=rng(1,4),r2=rng(1,4);const parts=r1+r2;
    if(total%parts!==0)return GEN.g6_ratio();
    const unit=total/parts;
    return mcq('Ratio Parts','6.PFA.1',`${total} students are split in a ${r1}:${r2} ratio of boys to girls. How many BOYS are there?`,
      [r1*unit,r2*unit,total/2,r1*2],r1*unit,
      `Total parts = ${r1}+${r2} = ${parts}. Each part = ${total}÷${parts} = ${unit}. Boys = ${r1} × ${unit} = ${r1*unit}.`,
      `Add the ratio parts, divide the total by that, then multiply.`);}
  const a=rng(2,8),b=rng(2,8),m=rng(2,5);
  return mcq('Ratios in Context','6.PFA.1',`A recipe uses ${a} cups of flour for every ${b} cups of sugar. How much flour is needed for ${b*m} cups of sugar?`,
    [`${a*m} cups`,`${a+m} cups`,`${b*m} cups`,`${a*m+2} cups`],`${a*m} cups`,
    `Sugar went from ${b} to ${b*m} — that's ×${m}. So flour: ${a} × ${m} = ${a*m} cups.`,
    `Find what the sugar was multiplied by, then do the same to the flour.`);
};

GEN.g6_fdp=()=>{
  const t=rng(0,4);
  if(t===0){const opts=[['1/2','50%'],['1/4','25%'],['3/4','75%'],['1/5','20%'],['1/10','10%'],['3/5','60%'],['2/5','40%'],['7/10','70%']];
    const c=pick(opts);const base=+c[1].replace('%','');
    return mcq('Fraction → Percent','6.NS.1',`What is ${c[0]} as a percent?`,
      [c[1],`${base+10}%`,`${base-5}%`,`${base*2}%`],c[1],
      `${c[0]} → divide top by bottom, then × 100 = ${c[1]}.`,
      `Divide the numerator by the denominator, then multiply by 100.`);}
  if(t===1){const p=pick([10,15,20,25,50,75]);const base=rng(2,20)*4;const ans=base*p/100;
    return mcq('Percent of a Number','6.NS.1',`What is ${p}% of ${base}?`,
      [ans,ans+p,ans-2,base-ans],ans,
      `${p}% = ${p/100}. Then ${base} × ${p/100} = ${ans}.`,
      `Turn the percent into a decimal, then multiply.`);}
  if(t===2){const d=(rng(1,99)/100).toFixed(2);
    return mcq('Decimal → Percent','6.NS.1',`Write ${d} as a percent.`,
      [`${+d*100}%`,`${+d*10}%`,`${+d*1000}%`,`${d}%`],`${+d*100}%`,
      `Move the decimal 2 places right: ${d} = ${+d*100}%.`,
      `Decimal → percent: move the decimal point 2 places RIGHT.`);}
  if(t===3){const orig=rng(4,20)*5;const p=pick([10,20,25,50]);const disc=orig*p/100;const sale=orig-disc;
    return mcq('Discount','6.NS.1',`A $${orig} jacket is ${p}% off. What is the SALE price?`,
      [`$${sale}`,`$${disc}`,`$${orig+disc}`,`$${sale-5}`],`$${sale}`,
      `Discount = ${p}% of $${orig} = $${disc}. Sale price = $${orig} − $${disc} = $${sale}.`,
      `Find the discount amount first, then SUBTRACT it from the original price.`);}
  const orig=rng(4,15)*10;const inc=rng(2,6)*5;const nw=orig+inc;
  const pct=Math.round(inc/orig*100);
  return mcq('Percent Change','6.NS.1',`A price rose from $${orig} to $${nw}. What is the percent increase?`,
    [`${pct}%`,`${pct+10}%`,`${inc}%`,`${pct-5}%`],`${pct}%`,
    `Change = $${inc}. Percent = (${inc} ÷ ${orig}) × 100 = ${pct}%.`,
    `Percent change = (change ÷ ORIGINAL) × 100.`);
};

GEN.g6_int=()=>{
  const t=rng(0,5);const a=rng(1,15),b=rng(1,15);
  if(t===0)return mcq('Add Integers','6.CE.2',`(−${a}) + (+${b}) = ?`,
    [b-a,a-b,-(a+b),a+b],b-a,
    `Different signs → subtract and keep the sign of the bigger number: ${b-a}.`,
    `Different signs? Subtract, then use the sign of the number farther from zero.`);
  if(t===1)return mcq('Subtract Integers','6.CE.2',`(−${a}) − (−${b}) = ?`,
    [b-a,-(a+b),a-b,a+b],b-a,
    `Subtracting a negative = adding: −${a} + ${b} = ${b-a}.`,
    `Two minuses make a plus: −(−${b}) becomes +${b}.`);
  if(t===2)return mcq('Multiply Integers','6.CE.2',`(−${a}) × (−${b}) = ?`,
    [a*b,-(a*b),a+b,-(a+b)],a*b,
    `Negative × Negative = Positive. ${a} × ${b} = ${a*b}.`,
    `Two negatives multiplied give a POSITIVE.`);
  if(t===3)return mcq('Divide Integers','6.CE.2',`(+${a*b}) ÷ (−${b}) = ?`,
    [-a,a,-(a*b),b],-a,
    `Positive ÷ Negative = Negative. ${a*b} ÷ ${b} = ${a}, so the answer is −${a}.`,
    `Different signs in division → NEGATIVE answer.`);
  if(t===4){const temp=-rng(2,15),drop=rng(3,12);
    return mcq('Integer Word Problem','6.CE.2',`The temperature is ${temp}°F. It drops ${drop} more degrees. What is the new temperature?`,
      [`${temp-drop}°F`,`${temp+drop}°F`,`${drop-Math.abs(temp)}°F`,`${temp}°F`],`${temp-drop}°F`,
      `${temp} − ${drop} = ${temp-drop}°F. Dropping means going MORE negative.`,
      `A drop means subtract — the number gets more negative.`);}
  const start=-rng(3,10),gain=rng(5,20);const end=start+gain;
  return mcq('Integer Word Problem','6.CE.2',`A diver is at ${start} m (below sea level) and rises ${gain} m. What is the diver's new position?`,
    [`${end} m`,`${start-gain} m`,`${-end} m`,`${gain} m`],`${end} m`,
    `${start} + ${gain} = ${end} m. Rising is adding a positive.`,
    `Rising/gaining is positive. Add it to the starting integer.`);
};

GEN.g6_exp=()=>{
  const t=rng(0,3);
  if(t===0){const b=rng(2,12);
    return mcq('Perfect Squares','6.NS.3',`What is ${b}²?`,
      [b*b,b*2,b*b+b,b*b-1],b*b,
      `${b}² means ${b} × ${b} = ${b*b}.`,`An exponent of 2 means multiply the number by ITSELF.`);}
  if(t===1){const squares=[[4,2],[9,3],[16,4],[25,5],[36,6],[49,7],[64,8],[81,9],[100,10],[121,11],[144,12]];
    const s=pick(squares);
    return mcq('Square Roots','6.NS.3',`What is √${s[0]}?`,
      [s[1],s[1]+1,s[1]-1,s[0]/2],s[1],
      `√${s[0]} = ${s[1]} because ${s[1]} × ${s[1]} = ${s[0]}.`,
      `Ask: what number times ITSELF equals ${s[0]}?`);}
  if(t===2){const b=rng(2,5),e=rng(2,4);const ans=Math.pow(b,e);
    return mcq('Exponents','6.NS.3',`What is ${b}${['','','²','³','⁴'][e]}?`,
      [ans,b*e,ans+b,ans-b],ans,
      `${b}^${e} = ${Array(e).fill(b).join(' × ')} = ${ans}.`,
      `The exponent tells you how many times to multiply the base by itself.`);}
  const n=rng(2,30);const isPerfect=[4,9,16,25].includes(n);
  const perfects=[4,9,16,25,36,49];const p=pick(perfects);
  return mcq('Perfect Squares','6.NS.3',`Which of these is a PERFECT SQUARE?`,
    [String(p),String(p+1),String(p+2),String(p-1)].filter((v,i,a)=>a.indexOf(v)===i),String(p),
    `${p} is a perfect square because √${p} = ${Math.sqrt(p)}, a whole number.`,
    `A perfect square is a whole number times itself.`);
};

GEN.g6_ops=()=>{
  const t=rng(0,3);
  if(t===0){const n1=rng(1,5),d1=pick([2,3,4]),n2=rng(1,5),d2=pick([2,3,4]);
    const rn2=n1*n2,rd=d1*d2;const g=gcd(rn2,rd);
    return mcq('Multiply Fractions','6.CE.1',`${n1}/${d1} × ${n2}/${d2} = ?`,
      [g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,`${n1+n2}/${d1+d2}`,`${rn2}/${d1}`,`${n1}/${rd}`],
      g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,
      `Multiply straight across: ${n1}×${n2}=${rn2}, ${d1}×${d2}=${rd}${g>1?`. Simplify: ${rn2/g}/${rd/g}`:''}.`,
      `Multiply the tops together, then the bottoms together.`);}
  if(t===1){const n1=rng(1,5),d1=pick([2,3,4,6]),n2=rng(1,4),d2=pick([2,3,4]);
    const rn2=n1*d2,rd=d1*n2;const g=gcd(rn2,rd);
    return mcq('Divide Fractions','6.CE.1',`${n1}/${d1} ÷ ${n2}/${d2} = ?`,
      [g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,`${n1*n2}/${d1*d2}`,`${n1+n2}/${d1+d2}`,`${rd}/${rn2}`],
      g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,
      `Keep-Change-Flip: ${n1}/${d1} × ${d2}/${n2} = ${rn2}/${rd}${g>1?` = ${rn2/g}/${rd/g}`:''}.`,
      `Keep the first, Change ÷ to ×, Flip the second fraction.`);}
  if(t===2){const a=(rng(10,99)/10).toFixed(1),b=(rng(2,9)/10).toFixed(1);const ans=(+a * +b).toFixed(2);
    return mcq('Multiply Decimals','6.CE.1',`${a} × ${b} = ?`,
      [ans,(+ans+0.1).toFixed(2),(+ans*10).toFixed(2),(+a + +b).toFixed(2)],ans,
      `Multiply as whole numbers, then count 2 decimal places total: ${ans}.`,
      `Count the decimal places in BOTH numbers — your answer needs that many.`);}
  const a=(rng(20,99)/10).toFixed(1);const b=pick([2,4,5]);const ans=(+a/b).toFixed(2);
  return mcq('Divide Decimals','6.CE.1',`${a} ÷ ${b} = ?`,
    [ans,(+ans+0.1).toFixed(2),(+ans*2).toFixed(2),(+a*b).toFixed(2)],ans,
    `${a} ÷ ${b} = ${ans}. Keep the decimal point lined up.`,
    `Divide as normal, keeping the decimal point in place.`);
};

GEN.g6_pemdas=()=>{
  const probs=[['3 + 4 × 2',11,'× before +: 4×2=8, then 3+8=11'],
    ['(5 + 3) × 4',32,'Parentheses first: (8)×4=32'],['20 − 2 × 6',8,'× first: 2×6=12, then 20−12=8'],
    ['2 × 3² − 4',14,'Exponent: 3²=9. Then 2×9=18. Then 18−4=14'],['(10 − 4) ÷ 2 + 5',8,'(6)÷2=3, then 3+5=8'],
    ['4² − 3 × 2',10,'4²=16, 3×2=6, 16−6=10'],['18 ÷ (3 + 3) × 2',6,'(6), 18÷6=3, 3×2=6'],
    ['5 + 2 × (8 − 3)',15,'(5), 2×5=10, 5+10=15'],['(4 + 2)² ÷ 4',9,'(6)²=36, 36÷4=9'],
    ['30 ÷ 5 + 2 × 3',12,'30÷5=6, 2×3=6, 6+6=12'],['2³ + 4 × 5',28,'2³=8, 4×5=20, 8+20=28'],
    ['(12 − 4) × (2 + 1)',24,'(8)×(3)=24']];
  const p=pick(probs);
  return mcq('Order of Operations','6.PFA.3',`Evaluate:   ${p[0]}`,
    [p[1],p[1]+2,p[1]-3,p[1]*2],p[1],`PEMDAS: ${p[2]}.`,
    `PEMDAS: Parentheses → Exponents → Multiply/Divide (left to right) → Add/Subtract (left to right).`);
};

GEN.g6_eq=()=>{
  const t=rng(0,4);const ans=rng(2,15);
  if(t===0){const b=rng(1,20);
    return mcq('Solve Equations','6.PFA.3',`Solve:   x + ${b} = ${ans+b}`,
      [ans,ans+b,ans-1,ans+2],ans,`Subtract ${b} from both sides: x = ${ans}.`,`Undo the +${b} by subtracting ${b} from BOTH sides.`);}
  if(t===1){const f=rng(2,9);
    return mcq('Solve Equations','6.PFA.3',`Solve:   ${f}x = ${f*ans}`,
      [ans,ans+1,ans*2,f],ans,`Divide both sides by ${f}: x = ${ans}.`,`Undo the ×${f} by dividing BOTH sides by ${f}.`);}
  if(t===2){const b=rng(1,10);
    return mcq('Solve Equations','6.PFA.3',`Solve:   x − ${b} = ${ans}`,
      [ans+b,ans-b,ans,b],ans+b,`Add ${b} to both sides: x = ${ans+b}.`,`Undo the −${b} by ADDING ${b} to both sides.`);}
  if(t===3){const n1=rn();const b=rng(3,15);const total=ans+b;
    return mcq('Write an Equation','6.PFA.3',`${n1} had some marbles, then found ${b} more, and now has ${total}. Which equation finds the starting amount x?`,
      [`x + ${b} = ${total}`,`x − ${b} = ${total}`,`${b}x = ${total}`,`x + ${total} = ${b}`],`x + ${b} = ${total}`,
      `Started with x, added ${b}, ended with ${total}: x + ${b} = ${total}. (x = ${ans})`,
      `"Found more" means addition. Start + change = end.`);}
  return mcq('Algebra Vocabulary','6.PFA.3',`In the expression  7y + 4 , what is the COEFFICIENT?`,
    ['7','4','y','7y'],'7',
    `A coefficient is the number multiplied by a variable. In 7y, the coefficient is 7.`,
    `The coefficient is the number attached to (multiplying) the variable.`);
};

GEN.g6_coord=()=>{
  const t=rng(0,3);const x=rng(-6,6)||1,y=rng(-6,6)||1;
  if(t===0)return mcq('Reflections','6.MG.3',`Point A is at (${x}, ${y}). Reflect it over the X-AXIS. What are the new coordinates?`,
    [`(${x}, ${-y})`,`(${-x}, ${y})`,`(${-x}, ${-y})`,`(${y}, ${x})`],`(${x}, ${-y})`,
    `Reflecting over the x-axis flips the sign of y: (${x}, ${-y}).`,
    `Over the x-axis: the y-value changes sign, x stays the same.`);
  if(t===1)return mcq('Reflections','6.MG.3',`Point B is at (${x}, ${y}). Reflect it over the Y-AXIS. What are the new coordinates?`,
    [`(${-x}, ${y})`,`(${x}, ${-y})`,`(${-x}, ${-y})`,`(${y}, ${x})`],`(${-x}, ${y})`,
    `Reflecting over the y-axis flips the sign of x: (${-x}, ${y}).`,
    `Over the y-axis: the x-value changes sign, y stays the same.`);
  if(t===2){const q=x>0&&y>0?'I':x<0&&y>0?'II':x<0&&y<0?'III':'IV';
    return mcq('Quadrants','6.MG.3',`In which quadrant is the point (${x}, ${y})?`,
      ['I','II','III','IV'],q,
      `(+,+)=I, (−,+)=II, (−,−)=III, (+,−)=IV. So (${x}, ${y}) is in Quadrant ${q}.`,
      `Quadrants go counterclockwise starting from the top-right.`);}
  const x2=rng(-6,6);const dist=Math.abs(x-x2);
  return mcq('Distance','6.MG.3',`Points at (${x}, 3) and (${x2}, 3). How far apart are they?`,
    [dist,dist+1,Math.abs(x+x2),dist*2],dist,
    `Same y-value, so count along the x-axis: |${x} − (${x2})| = ${dist} units.`,
    `Same y? Just find the difference between the x-values.`);
};

GEN.g6_geo=()=>{
  const t=rng(0,4);
  if(t===0){const b=rng(4,20),h=rng(3,15);const ans=b*h/2;
    return mcq('Triangle Area','6.MG.2',`A triangle has a base of ${b} cm and a height of ${h} cm. Find the AREA.`,
      [`${ans} cm²`,`${b*h} cm²`,`${b+h} cm²`,`${ans+b} cm²`],`${ans} cm²`,
      `Area = ½ × base × height = ½ × ${b} × ${h} = ${ans} cm².`,
      `Triangle area = (base × height) ÷ 2.`);}
  if(t===1){const l=rng(2,10),w=rng(2,8),h=rng(2,8);const ans=l*w*h;
    return mcq('Volume','6.MG.2',`A rectangular prism is ${l} × ${w} × ${h} cm. Find the VOLUME.`,
      [`${ans} cm³`,`${2*(l*w+l*h+w*h)} cm³`,`${l+w+h} cm³`,`${ans+10} cm³`],`${ans} cm³`,
      `Volume = l × w × h = ${l} × ${w} × ${h} = ${ans} cm³.`,
      `Volume of a box = length × width × height.`);}
  if(t===2){const l=rng(2,9),w=rng(2,8),h=rng(2,8);const ans=2*(l*w+l*h+w*h);
    return mcq('Surface Area','6.MG.2',`A box is ${l} × ${w} × ${h} cm. Find the SURFACE AREA.`,
      [`${ans} cm²`,`${l*w*h} cm²`,`${l+w+h} cm²`,`${ans-l} cm²`],`${ans} cm²`,
      `SA = 2(lw + lh + wh) = 2(${l*w} + ${l*h} + ${w*h}) = ${ans} cm².`,
      `Add up the areas of all 6 faces: 2×(lw + lh + wh).`);}
  if(t===3){const b1=rng(4,12),b2=rng(4,12),h=rng(3,10);const ans=(b1+b2)*h/2;
    return mcq('Trapezoid Area','6.MG.2',`A trapezoid has bases of ${b1} cm and ${b2} cm, and a height of ${h} cm. Find the AREA.`,
      [`${ans} cm²`,`${b1*b2} cm²`,`${(b1+b2)*h} cm²`,`${ans+h} cm²`],`${ans} cm²`,
      `Area = ½ × (b₁ + b₂) × h = ½ × (${b1} + ${b2}) × ${h} = ${ans} cm².`,
      `Trapezoid area = ½ × (base1 + base2) × height.`);}
  const b=rng(4,15),h=rng(3,12);const ans=b*h;
  return mcq('Parallelogram Area','6.MG.2',`A parallelogram has a base of ${b} m and a height of ${h} m. Find the AREA.`,
    [`${ans} m²`,`${ans/2} m²`,`${b+h} m²`,`${2*(b+h)} m²`],`${ans} m²`,
    `Area = base × height = ${b} × ${h} = ${ans} m².`,
    `Parallelogram area = base × height (NOT the slanted side).`);
};

GEN.g6_prop=()=>{
  const t=rng(0,4);
  if(t===0){const a=rng(2,8),m=rng(2,6),c=a*m;const b=rng(2,9),d=b*m;
    return mcq('Solve Proportions','6.PFA.2',`Solve the proportion:   ${a}/${b} = ${c}/x`,
      [d,d+m,d-1,c],d,
      `${a} → ${c} is ×${m}. So x = ${b} × ${m} = ${d}. (Or cross-multiply: ${a}x = ${b}×${c}.)`,
      `Find what the top was multiplied by, then do the same to the bottom.`);}
  if(t===1){const items=rng(2,8),cost=rng(2,9)*items;
    return mcq('Unit Rate','6.PFA.2',`${items} notebooks cost $${cost}. What is the cost per notebook (unit rate)?`,
      [`$${cost/items}`,`$${cost*items}`,`$${cost-items}`,`$${(cost/items+1)}`],`$${cost/items}`,
      `Unit rate = total ÷ quantity = $${cost} ÷ ${items} = $${cost/items} each.`,
      `Unit rate means "for ONE" — divide the total by the number of items.`);}
  if(t===2){const miles=rng(2,9)*30,hrs=rng(2,5);
    if(miles%hrs!==0)return GEN.g6_prop();
    return mcq('Rate','6.PFA.2',`A car travels ${miles} miles in ${hrs} hours. What is its speed in miles per hour?`,
      [`${miles/hrs} mph`,`${miles*hrs} mph`,`${miles-hrs} mph`,`${miles/hrs+10} mph`],`${miles/hrs} mph`,
      `Speed = distance ÷ time = ${miles} ÷ ${hrs} = ${miles/hrs} mph.`,
      `"Per hour" means divide the distance by the number of hours.`);}
  if(t===3){const scale=rng(10,50);const inches=rng(2,8);const miles=scale*inches;
    return mcq('Scale','6.PFA.2',`A map scale is 1 inch = ${scale} miles. Two cities are ${inches} inches apart on the map. What is the ACTUAL distance?`,
      [`${miles} miles`,`${scale+inches} miles`,`${scale} miles`,`${miles/2} miles`],`${miles} miles`,
      `${inches} inches × ${scale} miles per inch = ${miles} miles.`,
      `Multiply the map distance by the scale.`);}
  const b1=rng(2,6),unit=rng(2,8);const q1=b1*unit;const b2=rng(7,12);const q2=b2*unit;
  return mcq('Better Buy','6.PFA.2',`Which is the better buy: ${b1} items for $${q1}, or ${b2} items for $${q2}?`,
    ['They cost the same per item',`${b1} for $${q1}`,`${b2} for $${q2}`,'Cannot tell'],
    'They cost the same per item',
    `Unit price: $${q1}÷${b1} = $${unit} each, and $${q2}÷${b2} = $${unit} each. Same rate!`,
    `Find the price PER ITEM for each option, then compare.`);
};

GEN.g6_stat=()=>{
  const t=rng(0,4);
  const data=[rng(2,12),rng(2,15),rng(2,15),rng(2,12),rng(2,10)].sort((a,b)=>a-b);
  const sum=data.reduce((a,b)=>a+b,0);
  if(t===0){const mean=sum/data.length;
    if(!Number.isInteger(mean))return GEN.g6_stat();
    return mcq('Mean','6.PS.2',`Data: ${data.join(', ')}\nWhat is the MEAN (average)?`,
      [mean,mean+2,mean-1,sum],mean,
      `Add: ${data.join('+')} = ${sum}. Divide by ${data.length}: ${sum} ÷ ${data.length} = ${mean}.`,
      `Mean = add all values, then divide by how many there are.`);}
  if(t===1)return mcq('Median','6.PS.2',`Data: ${data.join(', ')}\nWhat is the MEDIAN?`,
    [data[2],data[1],data[3],sum],data[2],
    `Already sorted. The middle value (3rd of 5) is ${data[2]}.`,
    `Sort the data, then find the MIDDLE value.`);
  if(t===2)return mcq('Range','6.PS.2',`Data: ${data.join(', ')}\nWhat is the RANGE?`,
    [data[4]-data[0],data[4]+data[0],data[4],data[0]],data[4]-data[0],
    `Range = largest − smallest = ${data[4]} − ${data[0]} = ${data[4]-data[0]}.`,
    `Range = biggest value minus smallest value.`);
  if(t===3){const d2=[rng(2,9),rng(2,9),rng(2,9),rng(2,9)];const m=d2[rng(0,3)];
    const withMode=[...d2,m].sort((a,b)=>a-b);
    return mcq('Mode','6.PS.2',`Data: ${withMode.join(', ')}\nWhat is the MODE?`,
      [m,withMode[0],withMode[4],withMode[2]].filter((v,i,a)=>a.indexOf(v)===i),m,
      `The mode is the value that appears MOST often: ${m}.`,
      `Mode = the number that shows up the most times.`);}
  const outlier=data[4]+rng(30,60);
  return mcq('Outliers','6.PS.2',`Data: ${data.join(', ')}. Now an outlier of ${outlier} is added.\nWhich measure changes the MOST?`,
    ['The mean','The median','The mode','The range stays the same'],'The mean',
    `Outliers pull the MEAN strongly because every value affects the average. The median barely moves.`,
    `Which measure uses EVERY value in its calculation?`);
};

// ───────── READING — expanded banks ─────────
READ_BANK.g4_vocab.push(
  {s:"The <b>fragile</b> glass ornament shattered the moment it hit the floor.",q:"What does 'fragile' mean?",o:["Easily broken","Very strong","Extremely heavy"],a:"Easily broken",h:"It shattered the moment it fell. Is it strong or delicate?",e:"'Fragile' means easily broken. The clue is that it shattered immediately."},
  {s:"She was <b>reluctant</b> to speak, staring at her shoes and shaking her head.",q:"What does 'reluctant' mean?",o:["Eager and excited","Unwilling or hesitant","Angry and loud"],a:"Unwilling or hesitant",h:"She stares at her shoes and shakes her head. Does she want to speak?",e:"'Reluctant' means unwilling. Looking down and shaking her head shows she doesn't want to."},
  {s:"The <b>vast</b> desert stretched farther than the eye could see in every direction.",q:"What does 'vast' mean?",o:["Very small","Extremely large","Very colorful"],a:"Extremely large",h:"It stretches farther than you can see. How big is that?",e:"'Vast' means huge. Stretching beyond sight is the clue."},
  {s:"He gave a <b>sincere</b> apology, and everyone could tell he truly meant it.",q:"What does 'sincere' mean?",o:["Fake or pretend","Honest and genuine","Rushed and careless"],a:"Honest and genuine",h:"Everyone could tell he TRULY meant it. What does that show?",e:"'Sincere' means genuine and honest. 'Truly meant it' is the clue."},
  {s:"The instructions were so <b>complex</b> that even the adults could not follow them.",q:"What does 'complex' mean?",o:["Simple and easy","Complicated and hard to understand","Short and clear"],a:"Complicated and hard to understand",h:"Even ADULTS could not follow them. Easy or hard?",e:"'Complex' means complicated. If even adults can't follow them, they're difficult."},
  {s:"The cat's <b>curiosity</b> led it to explore every corner of the new house.",q:"What does 'curiosity' mean?",o:["A strong desire to explore and learn","A feeling of fear","A need for sleep"],a:"A strong desire to explore and learn",h:"It made the cat EXPLORE everything. What feeling does that?",e:"'Curiosity' is the desire to investigate and learn. Exploring every corner is the clue."},
);
READ_BANK.g4_fiction.push(
  {p:"Kofi practiced the drum every day after school. His fingers grew sore, and sometimes he wanted to quit. But on the night of the festival, when the whole village clapped along to his rhythm, he knew every hour had been worth it.",
   q:"What is the THEME of this passage?",o:["Drums are difficult instruments","Hard work and persistence lead to reward","Festivals are fun to attend"],a:"Hard work and persistence lead to reward",
   h:"He almost quit, but kept going — and then what happened?",e:"Kofi practiced despite pain and doubt, and it paid off at the festival. The theme is persistence being rewarded."},
  {p:"'It's just a small crack,' said Nia, looking at the dam. But by morning, water was seeping through in three places. By noon, the villagers were filling sandbags. By evening, everyone understood that small problems do not stay small.",
   q:"What can you INFER from this passage?",o:["Dams are poorly built","Ignoring small problems allows them to become big ones","Nia caused the flood"],a:"Ignoring small problems allows them to become big ones",
   h:"The crack was 'just small' — then what happened over the day?",e:"The passage traces a small crack growing into an emergency, showing that small problems, ignored, become large."},
  {p:"Every child in the class raised their hand except Malik. He knew the answer — he had known it before anyone else. But his voice always seemed to get stuck somewhere between his brain and his mouth.",
   q:"What can you infer about Malik?",o:["He does not know the answer","He knows the answer but struggles to speak up","He is not paying attention"],a:"He knows the answer but struggles to speak up",
   h:"The passage says he KNEW the answer. So what is stopping him?",e:"The passage says he knew it first, but his voice 'gets stuck' — he struggles to express himself, not to understand."},
  {p:"The storm had taken the roof, the fence, and the old mango tree. Ama walked through the wreckage in silence. Then she bent down, picked up a single green seedling that had survived, and began to dig.",
   q:"What does Ama's action at the end suggest?",o:["She is giving up","She is choosing to rebuild and hope","She is angry at the storm"],a:"She is choosing to rebuild and hope",
   h:"She finds something that SURVIVED and starts to dig. What is she doing?",e:"Planting the surviving seedling is an act of rebuilding and hope after loss."},
);
READ_BANK.g4_nonfic.push(
  {p:"Sea turtles have existed for more than 100 million years. Female turtles return to the very beach where they were born to lay their eggs. Sadly, plastic pollution, fishing nets, and beachfront lights now threaten their survival. Conservation groups work to protect nesting beaches and reduce ocean plastic.",
   q:"What is the MAIN IDEA?",o:["Sea turtles lay eggs on beaches","Sea turtles are ancient animals now threatened by humans, and people are working to protect them","Plastic pollution is increasing"],a:"Sea turtles are ancient animals now threatened by humans, and people are working to protect them",
   h:"The passage covers their history, the threats, AND the response. Which answer includes all of it?",e:"The passage moves from the turtles' long history → the threats → conservation efforts. Only one option captures the whole arc."},
  {p:"The Great Wall of China stretches over 13,000 miles. It was not built all at once — different dynasties added sections across many centuries. Contrary to a popular myth, it cannot be seen from space with the naked eye.",
   q:"Which statement is a FACT from the passage?",o:["The Great Wall is the most beautiful structure on Earth","The Great Wall stretches over 13,000 miles","Everyone should visit the Great Wall"],a:"The Great Wall stretches over 13,000 miles",
   h:"A fact can be proven. An opinion is what someone believes. Which one can be measured?",e:"The 13,000-mile length is a measurable fact. The other options are opinions."},
  {p:"To make compost, start by collecting fruit peels, vegetable scraps, and dry leaves. Next, layer them in a bin, alternating wet and dry materials. Then turn the pile every week to add air. Finally, after several months, the material breaks down into rich soil.",
   q:"What TEXT STRUCTURE does this passage use?",o:["Sequence / step-by-step","Compare and contrast","Problem and solution"],a:"Sequence / step-by-step",
   h:"Look for the signal words: start, next, then, finally.",e:"The words 'start, next, then, finally' signal a sequence (step-by-step) structure."},
  {p:"Bicycles are better for short trips than cars. They produce no pollution, cost far less to maintain, and provide daily exercise. Cities that build protected bike lanes see fewer traffic injuries. Every family should consider cycling for short journeys.",
   q:"What is the AUTHOR'S PURPOSE?",o:["To entertain with a story about bikes","To persuade readers that cycling is better for short trips","To explain how a bicycle is built"],a:"To persuade readers that cycling is better for short trips",
   h:"Does the author just give facts, or are they trying to convince you to DO something?",e:"The author lists benefits and ends with 'every family should consider cycling' — that's persuasion."},
);
READ_BANK.g6_vocab.push(
  {s:"The council's decision was <b>unilateral</b> — no other members were consulted at all.",q:"What does 'unilateral' mean?",o:["Made by one side alone","Agreed by everyone","Reversed after debate"],a:"Made by one side alone",h:"'No other members were consulted.' How many sides made the decision?",e:"'Unilateral' means done by one side without others' input. The clue is that nobody else was consulted."},
  {s:"Her explanation was <b>ambiguous</b>; half the class thought she meant one thing, and half thought the opposite.",q:"What does 'ambiguous' mean?",o:["Perfectly clear","Open to more than one interpretation","Extremely detailed"],a:"Open to more than one interpretation",h:"Half the class understood it one way, half the other. Was it clear?",e:"'Ambiguous' means unclear or open to multiple meanings. The split reaction is the clue."},
  {s:"Despite the <b>adversity</b> she faced — poverty, illness, and loss — she finished her degree.",q:"What does 'adversity' mean?",o:["Good fortune","Hardship and difficulty","Boredom"],a:"Hardship and difficulty",h:"The dash lists poverty, illness, and loss. What category are those?",e:"'Adversity' means hardship. The list (poverty, illness, loss) defines it right in the sentence."},
  {s:"The evidence was <b>irrefutable</b>; not a single expert could argue against it.",q:"What does 'irrefutable' mean?",o:["Impossible to disprove","Easily disputed","Completely fake"],a:"Impossible to disprove",h:"'Not a single expert could argue against it.' Can it be disproven?",e:"'Irrefutable' means it cannot be proven wrong. The clue: nobody could argue against it."},
  {s:"He spoke with such <b>conviction</b> that even the doubters began to nod along.",q:"What does 'conviction' mean?",o:["Strong belief and certainty","Confusion","Quiet shyness"],a:"Strong belief and certainty",h:"He convinced even the doubters. What quality in his voice did that?",e:"'Conviction' means firm belief. Speaking with certainty is what won over the doubters."},
  {s:"The new policy was <b>detrimental</b> to small businesses, forcing dozens to close within a year.",q:"What does 'detrimental' mean?",o:["Harmful or damaging","Helpful and supportive","Neutral, with no effect"],a:"Harmful or damaging",h:"Dozens of businesses CLOSED because of it. Good or bad?",e:"'Detrimental' means harmful. Businesses closing shows the damage it caused."},
);
READ_BANK.g6_fiction.push(
  {p:"The lighthouse keeper had not spoken to another person in eleven weeks. He kept a log, noting the weather, the ships, the birds. On the day the supply boat finally came, he found he had to clear his throat twice before any sound would come out at all.",
   q:"What does the final detail reveal about the keeper?",o:["He was ill with a sore throat","His long isolation has physically affected his ability to speak","He was afraid of the supply boat crew"],a:"His long isolation has physically affected his ability to speak",
   h:"He hasn't spoken in eleven weeks. What happens to a voice that is never used?",e:"Needing to clear his throat twice shows how deeply the isolation has affected him — even his voice has gone unused."},
  {p:"Everyone praised Dara's painting. 'Stunning,' they said. 'Remarkable.' Dara smiled and thanked them, and later, alone in her room, she looked at the canvas for a long time and saw only the places where she had failed.",
   q:"What does this passage reveal about Dara?",o:["She dislikes receiving compliments","She holds herself to standards far harsher than others do","She did not actually paint the picture"],a:"She holds herself to standards far harsher than others do",
   h:"Everyone else sees success. What does SHE see?",e:"Others see a masterpiece; Dara sees only flaws. The contrast reveals her harsh self-criticism."},
  {p:"The old farmer never planted the same crop twice in the same field. His neighbors called him superstitious and planted their corn year after year in identical rows. After six seasons, their soil was exhausted and their yields had collapsed. His fields were still thriving.",
   q:"What is the central IRONY of this passage?",o:["The farmer was lucky, not wise","The practice the neighbors mocked as superstition turned out to be sound science","The neighbors had better soil to begin with"],a:"The practice the neighbors mocked as superstition turned out to be sound science",
   h:"They mocked him — but who ended up with healthy soil?",e:"The irony: what the neighbors dismissed as superstition (crop rotation) was actually good agricultural practice."},
);
READ_BANK.g6_nonfic.push(
  {p:"Advocates of school uniforms argue that they reduce bullying and eliminate visible class differences. However, research on the topic is far from conclusive. Some studies find modest improvements in attendance; others find no measurable effect on behavior or achievement. What the evidence does suggest is that uniforms are neither the solution nor the disaster that either side claims.",
   q:"What is the author's position?",o:["Uniforms clearly improve schools","The evidence on uniforms is mixed and both sides overstate their case","Uniforms should be banned"],a:"The evidence on uniforms is mixed and both sides overstate their case",
   h:"Does the author take a strong side, or point out that both sides exaggerate?",e:"The author explicitly says uniforms are 'neither the solution nor the disaster that either side claims' — a balanced position."},
  {p:"For decades, students were told that they had a fixed 'learning style' — visual, auditory, or kinesthetic — and that teaching to that style would improve results. It is an appealing idea. It is also, according to a large body of research, unsupported. Studies repeatedly show no benefit from matching instruction to a student's supposed style.",
   q:"What is the author's PURPOSE?",o:["To promote learning-style teaching","To debunk a widely believed but unsupported educational idea","To explain how to identify your learning style"],a:"To debunk a widely believed but unsupported educational idea",
   h:"The author calls it 'appealing' but then says what about the research?",e:"The author sets up the popular belief, then dismantles it with research — the purpose is to debunk it."},
  {p:"Coral reefs cover less than 1% of the ocean floor, yet they support roughly 25% of all marine species. Rising ocean temperatures cause coral bleaching, in which corals expel the algae that feed them and turn white. Without intervention, scientists warn, most reefs could be lost within decades.",
   q:"Which detail BEST supports the claim that coral reefs are disproportionately important?",o:["Corals turn white when bleached","They cover under 1% of the ocean floor but support 25% of marine species","Ocean temperatures are rising"],a:"They cover under 1% of the ocean floor but support 25% of marine species",
   h:"'Disproportionately important' means small size, huge impact. Which detail shows that contrast?",e:"The 1%-vs-25% contrast directly demonstrates that reefs matter far more than their size suggests."},
);

// ───────── SCIENCE — expanded banks ─────────
SCI_BANK.g4_force.push(
  {q:"Which of these is a PUSH force?",o:["Pulling a wagon toward you","Pressing a doorbell","Lifting a book upward"],a:"Pressing a doorbell",e:"Pressing means pushing away from you. Pulling and lifting bring things toward you.",h:"A push moves something AWAY from you."},
  {q:"A heavier object requires ___ force to move than a lighter one.",o:["More","Less","The same"],a:"More",e:"More mass means more force is needed to change its motion.",h:"Think about pushing a shopping cart that's empty vs. full."},
  {q:"What happens to a moving object if no force acts on it?",o:["It keeps moving","It stops immediately","It speeds up"],a:"It keeps moving",e:"Objects in motion stay in motion unless a force (like friction) acts on them.",h:"Something must ACT on an object to change its motion."},
);
SCI_BANK.g4_elec.push(
  {q:"Which material is an INSULATOR (does not let electricity pass easily)?",o:["Copper","Rubber","Aluminum"],a:"Rubber",e:"Rubber blocks electricity — that's why wires are coated in it. Copper and aluminum are metals that conduct.",h:"Insulators BLOCK electricity. Which one isn't a metal?"},
  {q:"In a parallel circuit, one bulb burns out. What happens to the others?",o:["They all go out","They stay lit","They get dimmer"],a:"They stay lit",e:"In a parallel circuit, each bulb has its own path, so the others keep working.",h:"Parallel means multiple separate paths for the electricity."},
  {q:"What does a switch do in a circuit?",o:["Opens or closes the circuit to control the flow","Creates electricity","Stores electricity"],a:"Opens or closes the circuit to control the flow",e:"A switch breaks (opens) or completes (closes) the circuit path.",h:"What happens when you flip a light switch?"},
);
SCI_BANK.g4_plants.push(
  {q:"What three things do plants need for photosynthesis?",o:["Sunlight, water, and carbon dioxide","Soil, wind, and rocks","Oxygen, sugar, and darkness"],a:"Sunlight, water, and carbon dioxide",e:"Plants combine sunlight, water, and CO₂ to make sugar and release oxygen.",h:"Think about what goes IN to make plant food."},
  {q:"What is the job of the plant's STEM?",o:["Carries water and nutrients, and supports the plant","Absorbs sunlight","Attracts insects"],a:"Carries water and nutrients, and supports the plant",e:"The stem transports water and food between roots and leaves, and holds the plant up.",h:"What connects the roots to the leaves?"},
  {q:"What is the purpose of a flower?",o:["To make seeds through reproduction","To absorb water","To store food"],a:"To make seeds through reproduction",e:"Flowers are the reproductive part — they produce seeds after pollination.",h:"What part of the plant makes new plants possible?"},
);
SCI_BANK.g4_eco.push(
  {q:"An animal that eats ONLY plants is called a:",o:["Herbivore","Carnivore","Omnivore"],a:"Herbivore",e:"Herbivores eat only plants. Carnivores eat meat; omnivores eat both.",h:"'Herb' relates to plants."},
  {q:"What happens to a food chain if all the producers disappear?",o:["The whole chain collapses because there is no energy source","Only the top predators are affected","Nothing changes"],a:"The whole chain collapses because there is no energy source",e:"Producers are the base of every food chain — without them, no energy enters the system.",h:"Where does ALL the energy in a food chain start?"},
  {q:"A camel storing fat in its hump to survive without food is a(n):",o:["Adaptation","Food chain","Habitat"],a:"Adaptation",e:"An adaptation is a feature that helps an organism survive in its environment.",h:"A body feature that helps survival has a special name."},
);
SCI_BANK.g4_weather.push(
  {q:"What forms when water vapor cools and turns back into liquid droplets?",o:["Clouds (condensation)","Evaporation","Runoff"],a:"Clouds (condensation)",e:"When water vapor cools, it condenses into tiny droplets that form clouds.",h:"What's the opposite of evaporation?"},
  {q:"Which instrument measures TEMPERATURE?",o:["Thermometer","Anemometer","Rain gauge"],a:"Thermometer",e:"A thermometer measures temperature. An anemometer measures wind speed; a rain gauge measures rainfall.",h:"'Thermo' means heat."},
  {q:"What is the difference between weather and climate?",o:["Weather is what's happening now; climate is the long-term pattern","They mean the same thing","Climate changes every day"],a:"Weather is what's happening now; climate is the long-term pattern",e:"Weather = today's conditions. Climate = the average over many years.",h:"One is short-term, one is long-term."},
);
SCI_BANK.g4_space.push(
  {q:"What causes the seasons on Earth?",o:["Earth's tilt on its axis","Earth getting closer to the sun","The moon's shadow"],a:"Earth's tilt on its axis",e:"Earth's tilt means different hemispheres get more direct sunlight at different times of year.",h:"It's about the ANGLE Earth leans at, not distance."},
  {q:"How long does it take Earth to orbit the sun ONCE?",o:["One year (about 365 days)","One day","One month"],a:"One year (about 365 days)",e:"One full orbit around the sun takes about 365¼ days — one year.",h:"One trip around the sun = one what?"},
  {q:"Why does the moon shine?",o:["It reflects light from the sun","It produces its own light","It is on fire"],a:"It reflects light from the sun",e:"The moon has no light of its own — it reflects sunlight.",h:"The moon is not a star. Where does its light come from?"},
);
SCI_BANK.g6_energy.push(
  {q:"Which best describes the Law of Conservation of Energy?",o:["Energy cannot be created or destroyed, only transformed","Energy disappears when it is used","Energy can be created from nothing"],a:"Energy cannot be created or destroyed, only transformed",e:"Energy only changes form — the total amount stays constant.",h:"What happens to energy when it seems to 'disappear'?"},
  {q:"A light bulb converts electrical energy mainly into:",o:["Light and thermal (heat) energy","Sound and chemical energy","Nuclear energy"],a:"Light and thermal (heat) energy",e:"Bulbs give off light plus heat — which is why they get warm.",h:"Why does a bulb feel hot after being on?"},
  {q:"Which is a form of POTENTIAL energy?",o:["A stretched rubber band","A rolling ball","A blowing wind"],a:"A stretched rubber band",e:"A stretched band stores elastic potential energy, ready to be released.",h:"Potential = STORED energy, not moving yet."},
);
SCI_BANK.g6_solar.push(
  {q:"Why does Earth have day and night?",o:["Earth rotates on its axis once every 24 hours","Earth orbits the sun","The moon blocks the sun"],a:"Earth rotates on its axis once every 24 hours",e:"As Earth spins, the side facing the sun has day and the other side has night.",h:"What motion takes 24 hours to complete?"},
  {q:"What is a solar eclipse?",o:["The moon passes between the sun and Earth, blocking sunlight","Earth passes between the sun and moon","The sun burns out temporarily"],a:"The moon passes between the sun and Earth, blocking sunlight",e:"In a solar eclipse, the moon's shadow falls on Earth, blocking our view of the sun.",h:"'Solar' means the SUN is being blocked. What gets in the way?"},
  {q:"Which is the largest planet in our solar system?",o:["Jupiter","Earth","Saturn"],a:"Jupiter",e:"Jupiter is by far the largest planet — a gas giant more massive than all others combined.",h:"It's a gas giant famous for its Great Red Spot."},
);
SCI_BANK.g6_eco.push(
  {q:"What is a trophic cascade?",o:["A change at one level of a food web that ripples through the whole ecosystem","The daily migration of fish","The process of photosynthesis"],a:"A change at one level of a food web that ripples through the whole ecosystem",e:"Removing or adding a top predator can change plants, rivers, and every level below — a cascade.",h:"Think about what happened when wolves returned to Yellowstone."},
  {q:"A tick feeding on a dog's blood, harming the dog, is an example of:",o:["Parasitism","Mutualism","Commensalism"],a:"Parasitism",e:"One organism benefits (the tick) while the other is harmed (the dog) = parasitism.",h:"One benefits, one is HARMED."},
  {q:"In the water cycle, what process moves water from plants into the air?",o:["Transpiration","Condensation","Erosion"],a:"Transpiration",e:"Transpiration is water evaporating from plant leaves into the atmosphere.",h:"It's like evaporation, but from PLANTS."},
);
SCI_BANK.g6_atmo.push(
  {q:"What causes wind?",o:["Differences in air pressure","The rotation of the moon","Ocean tides"],a:"Differences in air pressure",e:"Air moves from high-pressure areas to low-pressure areas, creating wind.",h:"Air moves from where there's MORE of it to where there's less."},
  {q:"Which layer of the atmosphere contains the ozone layer?",o:["Stratosphere","Troposphere","Exosphere"],a:"Stratosphere",e:"The ozone layer sits in the stratosphere and absorbs harmful UV radiation.",h:"It's the second layer up — above where weather happens."},
  {q:"A cold front moving in typically brings:",o:["Cooler temperatures and often storms","A long dry spell","Warmer, calmer weather"],a:"Cooler temperatures and often storms",e:"Cold air pushes warm air up quickly, often causing storms followed by cooler weather.",h:"Cold air pushing under warm air forces it UP quickly — what does that create?"},
);
SCI_BANK.g6_resource.push(
  {q:"Which of these is NOT a renewable resource?",o:["Petroleum (oil)","Wind","Solar"],a:"Petroleum (oil)",e:"Oil takes millions of years to form and is being used far faster than it forms.",h:"Which one will eventually run out?"},
  {q:"What does 'sustainable' use of resources mean?",o:["Using resources in a way that doesn't use them up for future generations","Using as much as possible right now","Never using any resources"],a:"Using resources in a way that doesn't use them up for future generations",e:"Sustainability means meeting today's needs without preventing future generations from meeting theirs.",h:"Think about leaving enough for the FUTURE."},
  {q:"Which action reduces your carbon footprint the MOST?",o:["Using public transport instead of driving alone","Leaving lights on","Buying more plastic bottles"],a:"Using public transport instead of driving alone",e:"Transportation is a major source of carbon emissions — sharing rides greatly reduces it.",h:"Which choice actually REDUCES emissions?"},
);

// ───────── WRITING — expanded banks ─────────
WRITE_BANK.g4_sentence.push(
  {words:["The","curious","kitten","climbed","the","tall","tree"],correct:"The curious kitten climbed the tall tree"},
  {words:["After","dinner","we","washed","the","dishes","together"],correct:"After dinner we washed the dishes together"},
  {words:["Our","team","won","the","championship","last","year"],correct:"Our team won the championship last year"},
  {words:["The","noisy","birds","woke","me","up","early"],correct:"The noisy birds woke me up early"},
  {words:["She","carefully","painted","a","beautiful","picture"],correct:"She carefully painted a beautiful picture"},
  {words:["My","grandmother","tells","wonderful","stories","every","evening"],correct:"My grandmother tells wonderful stories every evening"},
);
WRITE_BANK.g4_edit.push(
  {passage:"the childrens toys was all over the floor",q:"Which is the CORRECT version?",
   o:["The childrens toys was all over the floor.","The children's toys were all over the floor.","the children's toys was all over the floor"],
   a:"The children's toys were all over the floor.",h:"Toys (plural) needs 'were'. Children's needs an apostrophe. Capital + period.",
   e:"'Children's' shows possession, 'were' matches the plural 'toys', plus a capital and a period."},
  {passage:"i seen the movie last night",q:"Which is the CORRECT version?",
   o:["I seen the movie last night.","I saw the movie last night.","i saw the movie last night"],
   a:"I saw the movie last night.",h:"'Seen' needs a helper verb (have seen). Alone, use 'saw'. Also capitalize I.",
   e:"'Saw' is the correct simple past tense. 'Seen' requires a helper verb like 'have'."},
  {passage:"the dog wagged it's tail happily",q:"Which is the CORRECT version?",
   o:["The dog wagged it's tail happily.","The dog wagged its tail happily.","the dog wagged its tail happily"],
   a:"The dog wagged its tail happily.",h:"'It's' = it is. 'Its' = belonging to it. Which fits here?",
   e:"'Its' (no apostrophe) shows possession. 'It's' means 'it is', which doesn't fit."},
  {passage:"we was going to the beach on saturday",q:"Which is the CORRECT version?",
   o:["We was going to the beach on saturday.","We were going to the beach on Saturday.","we were going to the beach on saturday"],
   a:"We were going to the beach on Saturday.",h:"'We' takes 'were'. Days of the week are capitalized.",
   e:"'We were' is correct, 'Saturday' is a proper noun needing a capital, plus a capital W and a period."},
  {passage:"my favorite subjects are math science and art",q:"Which is the CORRECT version?",
   o:["My favorite subjects are math science and art.","My favorite subjects are math, science, and art.","my favorite subjects are math, science and art"],
   a:"My favorite subjects are math, science, and art.",h:"A list of three or more items needs commas between them.",
   e:"Items in a list are separated by commas, plus a capital M and a period."},
);
WRITE_BANK.g6_edit.push(
  {passage:"Neither of the boys were ready for the test.",q:"Which is the CORRECT version?",
   o:["Neither of the boys were ready for the test.","Neither of the boys was ready for the test.","Neither of the boys are ready for the test."],
   a:"Neither of the boys was ready for the test.",h:"'Neither' is singular, even when followed by a plural phrase.",
   e:"'Neither' is a singular subject, so it takes the singular verb 'was'."},
  {passage:"The book, which I borrowed from Maya was excellent.",q:"Which is the CORRECT version?",
   o:["The book, which I borrowed from Maya was excellent.","The book, which I borrowed from Maya, was excellent.","The book which I borrowed from Maya, was excellent."],
   a:"The book, which I borrowed from Maya, was excellent.",h:"A clause set off by commas needs a comma on BOTH sides.",
   e:"Non-essential clauses need commas on both sides — opening AND closing."},
  {passage:"Running quickly, the finish line came into view.",q:"Which is the CORRECT version?",
   o:["Running quickly, the finish line came into view.","Running quickly, she saw the finish line come into view.","The finish line, running quickly, came into view."],
   a:"Running quickly, she saw the finish line come into view.",h:"Who is running? The finish line can't run — this is a dangling modifier.",
   e:"'Running quickly' must describe a person, not the finish line. This is a dangling modifier error."},
  {passage:"Its important to bring you're notebook to class.",q:"Which is the CORRECT version?",
   o:["Its important to bring you're notebook to class.","It's important to bring your notebook to class.","Its important to bring your notebook to class."],
   a:"It's important to bring your notebook to class.",h:"It's = it is. Your = belonging to you. You're = you are.",
   e:"'It's' (it is) is correct here, and 'your' (possessive) is correct before 'notebook'."},
  {passage:"The effect of the new rule was that less students arrived late.",q:"Which is the CORRECT version?",
   o:["...less students arrived late.","...fewer students arrived late.","...lesser students arrived late."],
   a:"...fewer students arrived late.",h:"'Fewer' for things you can COUNT. 'Less' for amounts you can't count.",
   e:"Students can be counted, so 'fewer' is correct. Use 'less' for uncountable things (less water)."},
);
WRITE_BANK.g6_race.push(
  {passage:"Bees pollinate roughly one-third of the food crops humans consume. In recent decades, bee populations have declined sharply due to pesticides, habitat loss, and disease. Some regions now hand-pollinate crops at enormous cost. Scientists warn that without healthy bee populations, global food security is at risk.",
   q:"Why are bees essential to human food supply? Write a R.A.C.E. response.",
   model:{R:"The question asks why bees are essential to the human food supply.",
     A:"Bees are essential because they pollinate a huge portion of the crops people rely on, and without them food production would collapse or become extremely expensive.",
     C:"The passage states that bees pollinate 'roughly one-third of the food crops humans consume' and that some regions now hand-pollinate 'at enormous cost.'",
     E:"This shows bees do work that is nearly impossible to replace. The fact that humans must pay enormous sums to do by hand what bees do for free proves how essential they are — their decline is not just an environmental problem but a direct threat to our food."},
   h:"R=restate, A=answer, C=cite from the passage, E=explain how the evidence proves your answer."},
  {passage:"When a volcano erupted in Iceland in 2010, it released an ash cloud that grounded over 100,000 flights across Europe. Millions of travelers were stranded. Businesses lost billions. Yet the eruption itself was, by geological standards, quite small.",
   q:"What does this event reveal about the modern world? Write a R.A.C.E. response.",
   model:{R:"The question asks what the 2010 Iceland eruption reveals about the modern world.",
     A:"It reveals that our modern, globally connected systems are surprisingly fragile — a small natural event in one place can disrupt life across an entire continent.",
     C:"The passage notes the eruption grounded 'over 100,000 flights,' stranded millions, and cost billions, even though the eruption was 'by geological standards, quite small.'",
     E:"The contrast between the small size of the eruption and the enormous scale of the disruption is the key. It shows that because so much of modern life depends on interconnected systems like air travel, even a minor disturbance can cascade into a massive crisis."},
   h:"Focus on the CONTRAST between the small eruption and the huge disruption."},
);

