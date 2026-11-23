// ═══════════════════════════════════════════════════════════════
// MATH GENERATORS — GRADE 4
// ═══════════════════════════════════════════════════════════════
function mcq(badge,sol,question,opts,answer,expl,hint,extra={}){
  return {type:'mc',badge,sol,question,opts:shuf(opts),answer,explanation:expl,hint,...extra};
}
function G(){return{}}

const GEN={};

GEN.g4_place=()=>{
  const t=rng(0,2);
  if(t===0){const n=rng(1000,999999);const digits=n.toString();const pos=rng(0,digits.length-1);
    const d=+digits[pos];const place=Math.pow(10,digits.length-1-pos);const val=d*place;
    const pn={1:'ones',10:'tens',100:'hundreds',1000:'thousands',10000:'ten-thousands',100000:'hundred-thousands'}[place];
    return mcq('Place Value','4.1',`What is the value of the digit ${d} in ${n.toLocaleString()}?`,
      [val.toLocaleString(),(d).toString(),(d*place*10).toLocaleString(),(place).toLocaleString()],
      val.toLocaleString(),`The ${d} is in the ${pn} place. ${d} × ${place.toLocaleString()} = ${val.toLocaleString()}.`,
      `Find where the ${d} sits. Each place is worth 10× the one to its right.`);}
  if(t===1){const n=rng(1000,99999);const r=Math.round(n/1000)*1000;
    return mcq('Rounding','4.1',`Round ${n.toLocaleString()} to the nearest thousand.`,
      [r.toLocaleString(),(r+1000).toLocaleString(),(r-1000).toLocaleString(),(Math.round(n/100)*100).toLocaleString()],
      r.toLocaleString(),`Look at the hundreds digit. If 5 or more, round up. ${n.toLocaleString()} rounds to ${r.toLocaleString()}.`,
      `Look at the hundreds digit — is it 5 or more (round up) or less (round down)?`);}
  const a=rng(1000,99999),b=rng(1000,99999);
  return mcq('Compare','4.1',`Which symbol makes this true?   ${a.toLocaleString()} ___ ${b.toLocaleString()}`,
    ['<','>','='],a<b?'<':a>b?'>':'=',`Compare digit by digit from the left. ${a.toLocaleString()} ${a<b?'<':'>'} ${b.toLocaleString()}.`,
    `Compare the digits starting from the biggest place value (left side).`);
};

GEN.g4_frac=()=>{
  const t=rng(0,1);
  if(t===0){const d=pick([2,3,4,5,6,8]);const n=rng(1,d-1);const m=rng(2,3);
    return mcq('Equivalent Fractions','4.2',`Which fraction is equivalent to ${n}/${d}?`,
      [`${n*m}/${d*m}`,`${n+1}/${d}`,`${n}/${d+m}`,`${n*m}/${d}`],
      `${n*m}/${d*m}`,`Multiply top AND bottom by the same number. ${n}/${d} × ${m}/${m} = ${n*m}/${d*m}.`,
      `To make an equivalent fraction, multiply the top and bottom by the SAME number.`);}
  const d=pick([4,6,8,10,12]);let n1=rng(1,d-1),n2=rng(1,d-1);while(n1===n2)n2=rng(1,d-1);
  return mcq('Compare Fractions','4.2',`Which symbol makes this true?   ${n1}/${d} ___ ${n2}/${d}`,
    ['<','>','='],n1<n2?'<':'>',`Same denominator — just compare the tops. ${n1} ${n1<n2?'<':'>'} ${n2}.`,
    `When bottoms are the same, the bigger top = the bigger fraction.`);
};

GEN.g4_dec=()=>{
  const t=rng(0,2);
  if(t===0){const w=rng(1,9),te=rng(0,9),h=rng(0,9);const dec=`${w}.${te}${h}`;
    const pn=pick([['tenths',te],['hundredths',h]]);
    return mcq('Decimal Place Value','4.3',`In ${dec}, what digit is in the ${pn[0]} place?`,
      [pn[1].toString(),w.toString(),((pn[1]+1)%10).toString(),((pn[1]+2)%10).toString()],
      pn[1].toString(),`After the decimal: first digit=tenths, second=hundredths. The ${pn[0]} digit is ${pn[1]}.`,
      `After the decimal point: tenths come first, then hundredths.`);}
  if(t===1){const a=(rng(10,99)/10).toFixed(1),b=(rng(10,99)/10).toFixed(1);
    return mcq('Compare Decimals','4.3',`Which symbol makes this true?   ${a} ___ ${b}`,
      ['<','>','='],+a<+b?'<':+a>+b?'>':'=',`Line up the decimal points and compare. ${a} ${+a<+b?'<':+a>+b?'>':'='} ${b}.`,
      `Line up the decimal points, then compare digit by digit.`);}
  const n=(rng(100,999)/100).toFixed(2);const r=(Math.round(+n*10)/10).toFixed(1);
  return mcq('Round Decimals','4.3',`Round ${n} to the nearest tenth.`,
    [r,(+r+0.1).toFixed(1),(+r-0.1).toFixed(1),Math.round(+n).toFixed(1)],
    r,`Look at the hundredths digit. If 5+, round up. ${n} → ${r}.`,
    `Look at the hundredths digit to decide whether to round up or down.`);
};

GEN.g4_ops=()=>{
  const t=rng(0,1);
  if(t===0){const a=rng(100,999),b=rng(2,9);const ans=a*b;
    return mcq('Multiplication','4.4',`${a} × ${b} = ?`,
      [ans,ans+b,ans-b,ans+10],ans,`${a} × ${b} = ${ans}. Multiply ones, tens, hundreds — carry as needed.`,
      `Multiply each digit by ${b}, starting from the ones place. Carry when needed.`,
      {visual:{type:'none'}});}
  const b=rng(3,9),q=rng(20,120),a=b*q+rng(0,b-1);const quo=Math.floor(a/b),rem=a%b;
  return mcq('Division','4.4',`${a} ÷ ${b} = ?`,
    [rem?`${quo} R${rem}`:`${quo}`,`${quo+1}${rem?' R'+rem:''}`,`${quo} R${(rem+1)%b}`,`${quo-1} R${rem}`],
    rem?`${quo} R${rem}`:`${quo}`,`${a} ÷ ${b} = ${quo}${rem?' remainder '+rem:''}. Check: ${b}×${quo}${rem?'+'+rem:''}=${a}.`,
    `How many times does ${b} go into ${a}? Any leftover is the remainder.`);
};

GEN.g4_fracops=()=>{
  const t=rng(0,1);
  if(t===0){const d=pick([4,5,6,8,10]);let n1=rng(1,d-2),n2=rng(1,d-n1);
    const sum=n1+n2;const g=gcd(sum,d);
    return mcq('Add Fractions','4.5',`${n1}/${d} + ${n2}/${d} = ?`,
      [g>1?`${sum/g}/${d/g}`:`${sum}/${d}`,`${sum}/${d*2}`,`${n1+n2}/${d+d}`,`${sum+1}/${d}`],
      g>1?`${sum/g}/${d/g}`:`${sum}/${d}`,`Same denominator: add the tops. ${n1}+${n2}=${sum}, keep /${d}${g>1?`, simplify to ${sum/g}/${d/g}`:''}.`,
      `When denominators match, just add the numerators (tops) and keep the bottom.`);}
  const a=(rng(10,90)/10).toFixed(1),b=(rng(1,Math.floor(a*10-1))/10).toFixed(1);
  const ans=(+a-+b).toFixed(1);
  return mcq('Subtract Decimals','4.5',`${a} − ${b} = ?`,
    [ans,(+ans+0.1).toFixed(1),(+ans-0.1).toFixed(1),(+a+ +b).toFixed(1)],
    ans,`Line up the decimals: ${a} − ${b} = ${ans}.`,
    `Line up the decimal points before subtracting.`);
};

GEN.g4_area=()=>{
  const t=rng(0,1);const l=rng(3,15),w=rng(2,12);
  if(t===0)return mcq('Area','4.7',`A rectangle is ${l} cm long and ${w} cm wide. What is its AREA?`,
    [`${l*w} cm²`,`${2*(l+w)} cm²`,`${l+w} cm²`,`${l*w+2} cm²`],`${l*w} cm²`,
    `Area = length × width = ${l} × ${w} = ${l*w} cm².`,`Area of a rectangle = length × width.`);
  return mcq('Perimeter','4.7',`A rectangle is ${l} m long and ${w} m wide. What is its PERIMETER?`,
    [`${2*(l+w)} m`,`${l*w} m`,`${l+w} m`,`${2*l+w} m`],`${2*(l+w)} m`,
    `Perimeter = 2×(length+width) = 2×(${l}+${w}) = ${2*(l+w)} m.`,`Perimeter = add all 4 sides, or 2×(length+width).`);
};

GEN.g4_measure=()=>{
  const conv=pick([
    ['feet','inches',1,12,'1 foot = 12 inches'],['yards','feet',1,3,'1 yard = 3 feet'],
    ['meters','centimeters',1,100,'1 meter = 100 cm'],['kilometers','meters',1,1000,'1 km = 1000 m'],
    ['pounds','ounces',1,16,'1 pound = 16 ounces'],['gallons','quarts',1,4,'1 gallon = 4 quarts']]);
  const q=rng(2,9);const ans=q*conv[3];
  return mcq('Measurement','4.8',`Convert: ${q} ${conv[0]} = ? ${conv[1]}`,
    [ans,ans+conv[3],ans-conv[3],q+conv[3]],ans,`${conv[4]}. So ${q} × ${conv[3]} = ${ans} ${conv[1]}.`,
    `Remember: ${conv[4]}. Multiply to go from big units to small units.`);
};

GEN.g4_time=()=>{
  const sh=rng(1,10),sm=pick([0,15,30,45]);const dh=rng(1,3),dm=pick([0,15,30,45]);
  let eh=sh+dh,em=sm+dm;if(em>=60){em-=60;eh++;}
  const fmt=(h,m)=>`${h}:${m.toString().padStart(2,'0')}`;
  return mcq('Elapsed Time','4.9',`A movie starts at ${fmt(sh,sm)} and lasts ${dh} hour${dh>1?'s':''} ${dm} minutes. What time does it end?`,
    [fmt(eh,em),fmt(eh+1,em),fmt(eh,(em+15)%60),fmt(eh-1,em)],fmt(eh,em),
    `Add ${dh}h ${dm}min to ${fmt(sh,sm)} → ${fmt(eh,em)}.`,`Add the hours first, then the minutes. Watch for minutes going over 60!`);
};

GEN.g4_angle=()=>{
  const t=pick([['right','exactly 90°',90],['acute','less than 90°','acute'],['obtuse','between 90° and 180°','obtuse']]);
  const deg=t[0]==='right'?90:t[0]==='acute'?rng(20,80):rng(100,170);
  return mcq('Angles','4.10',`An angle measures ${deg}°. What type of angle is it?`,
    ['Acute','Right','Obtuse','Straight'],deg===90?'Right':deg<90?'Acute':'Obtuse',
    `${deg}° is ${deg===90?'exactly 90° = right':deg<90?'less than 90° = acute':'between 90° and 180° = obtuse'}.`,
    `Right = exactly 90°. Acute = less than 90°. Obtuse = more than 90°.`);
};

GEN.g4_shape=()=>{
  const t=rng(0,1);
  if(t===0){const s=pick([['equilateral','all 3 sides equal'],['isosceles','2 sides equal'],['scalene','no sides equal'],['right','has a 90° angle']]);
    return mcq('Triangles','4.12',`A triangle with ${s[1]} is called what?`,
      ['Equilateral','Isosceles','Scalene','Right'],s[0].charAt(0).toUpperCase()+s[0].slice(1),
      `A triangle with ${s[1]} is ${s[0]}.`,`Think about the sides or angles described.`);}
  const q=pick([['square','4 equal sides and 4 right angles'],['rectangle','4 right angles, opposite sides equal'],
    ['rhombus','4 equal sides but not always right angles'],['parallelogram','opposite sides parallel and equal']]);
  return mcq('Quadrilaterals','4.12',`Which quadrilateral has ${q[1]}?`,
    ['Square','Rectangle','Rhombus','Parallelogram'],q[0].charAt(0).toUpperCase()+q[0].slice(1),
    `A ${q[0]} has ${q[1]}.`,`Focus on the specific properties described.`);
};

GEN.g4_prob=()=>{
  const r=rng(2,5),b=rng(2,5),g=rng(1,3);const tot=r+b+g;
  const which=pick([['red',r],['blue',b],['green',g]]);const gd=gcd(which[1],tot);
  return mcq('Probability','4.13',`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of drawing a ${which[0]} marble?`,
    [gd>1?`${which[1]/gd}/${tot/gd}`:`${which[1]}/${tot}`,`${which[1]}/${which[1]}`,`${tot}/${which[1]}`,`${which[1]+1}/${tot}`],
    gd>1?`${which[1]/gd}/${tot/gd}`:`${which[1]}/${tot}`,
    `P(${which[0]}) = favorable ÷ total = ${which[1]}/${tot}${gd>1?` = ${which[1]/gd}/${tot/gd}`:''}.`,
    `Probability = (number you want) ÷ (total number of marbles).`);
};

GEN.g4_data=()=>{
  const cats=['Mon','Tue','Wed','Thu'];const vals=cats.map(()=>rng(2,20));
  const t=rng(0,2);
  if(t===0){const mi=vals.indexOf(Math.max(...vals));
    return mcq('Data','4.14',`A graph shows: ${cats.map((c,i)=>c+'='+vals[i]).join(', ')}. Which day had the MOST?`,
      cats,cats[mi],`${cats[mi]} had the highest value (${vals[mi]}).`,`Find the largest number and its label.`);}
  if(t===1){const total=vals.reduce((a,b)=>a+b,0);
    return mcq('Data','4.14',`A graph shows: ${cats.map((c,i)=>c+'='+vals[i]).join(', ')}. What is the TOTAL?`,
      [total,total+2,total-3,total+5],total,`Add all values: ${vals.join('+')} = ${total}.`,`Add up all the values shown.`);}
  const d=Math.abs(vals[0]-vals[1]);
  return mcq('Data','4.14',`A graph shows: ${cats[0]}=${vals[0]}, ${cats[1]}=${vals[1]}. How many MORE on ${vals[0]>vals[1]?cats[0]:cats[1]} than ${vals[0]>vals[1]?cats[1]:cats[0]}?`,
    [d,d+1,d+2,vals[0]+vals[1]],d,`Difference: |${vals[0]}−${vals[1]}| = ${d}.`,`'How many more' means subtract the two values.`);
};

GEN.g4_pattern=()=>{
  const t=rng(0,1);const start=rng(2,9);
  if(t===0){const step=rng(2,9);const seq=[start,start+step,start+2*step,start+3*step];
    return mcq('Patterns','4.15',`What comes next?   ${seq.join(', ')}, ___`,
      [start+4*step,start+5*step,start+3*step,start+4*step+1],start+4*step,
      `The pattern adds ${step} each time. Next: ${seq[3]}+${step}=${start+4*step}.`,`Find how much is added each time, then continue.`);}
  const mult=rng(2,3);const seq=[start,start*mult,start*mult*mult,start*mult*mult*mult];
  return mcq('Patterns','4.15',`What comes next?   ${seq.join(', ')}, ___`,
    [seq[3]*mult,seq[3]+start,seq[3]*mult+1,seq[3]+seq[2]],seq[3]*mult,
    `The pattern multiplies by ${mult} each time. Next: ${seq[3]}×${mult}=${seq[3]*mult}.`,`Is it adding or multiplying? Check the jump between numbers.`);
};

GEN.g4_eq=()=>{
  const t=rng(0,1);const ans=rng(2,20);
  if(t===0){const b=rng(1,15);
    return mcq('Equations','4.16',`Solve for the box:   □ + ${b} = ${ans+b}`,
      [ans,ans+b,ans-1,ans+2],ans,`To find □, subtract: ${ans+b}−${b}=${ans}.`,`Undo the addition — subtract ${b} from both sides.`);}
  const f=rng(2,9);
  return mcq('Equations','4.16',`Solve for the box:   ${f} × □ = ${f*ans}`,
    [ans,ans+1,ans*2,f],ans,`To find □, divide: ${f*ans}÷${f}=${ans}.`,`Undo the multiplication — divide both sides by ${f}.`);
};

