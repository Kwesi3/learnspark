// ═══════════════════════════════════════════════════════════════
// MATH GENERATORS — GRADE 6
// ═══════════════════════════════════════════════════════════════
GEN.g6_ratio=()=>{
  const a=rng(2,8),b=rng(2,8),m=rng(2,5);
  return mcq('Ratios','6.1',`A recipe uses ${a} cups of flour for every ${b} cups of sugar. How much flour for ${b*m} cups of sugar?`,
    [`${a*m} cups`,`${a+m} cups`,`${b*m} cups`,`${a*m+1} cups`],`${a*m} cups`,
    `The ratio ${a}:${b} scales up ×${m}: ${a}×${m}=${a*m} cups.`,`Find how many times the sugar increased, then scale the flour the same way.`);
};
GEN.g6_fdp=()=>{
  const t=rng(0,2);
  if(t===0){const opts=[['1/2','50%'],['1/4','25%'],['3/4','75%'],['1/5','20%'],['1/10','10%'],['3/5','60%']];const c=pick(opts);
    return mcq('Convert F→%','6.2',`What is ${c[0]} as a percent?`,
      [c[1],(+c[1].replace('%','')+10)+'%',(+c[1].replace('%','')-5)+'%',(+c[1].replace('%','')*2)+'%'],c[1],
      `${c[0]} = ${c[1]}. Divide top by bottom, then ×100.`,`Divide the numerator by the denominator, then multiply by 100.`);}
  if(t===1){const p=pick([10,20,25,50,75]);const base=rng(2,20)*4;const ans=base*p/100;
    return mcq('Percent of Number','6.2',`What is ${p}% of ${base}?`,
      [ans,ans+p,ans-2,base-ans],ans,`${p}% = ${p/100}. ${base}×${p/100}=${ans}.`,`Turn the percent into a decimal, then multiply.`);}
  const d=(rng(1,99)/100).toFixed(2);
  return mcq('Decimal→%','6.2',`Write ${d} as a percent.`,
    [`${(+d*100)}%`,`${(+d*10)}%`,`${(+d*1000)}%`,`${d}%`],`${(+d*100)}%`,
    `Move the decimal 2 places right: ${d} = ${+d*100}%.`,`To convert a decimal to a percent, move the decimal point 2 places right.`);
};
GEN.g6_int=()=>{
  const t=rng(0,3);const a=rng(1,15),b=rng(1,15);
  if(t===0)return mcq('Add Integers','6.3',`(−${a}) + (+${b}) = ?`,
    [b-a,a-b,-(a+b),a+b],b-a,`Different signs → subtract, keep sign of larger. ${b>a?b+'−'+a:'−('+a+'−'+b+')'} = ${b-a}.`,`Different signs: subtract and take the sign of the bigger number.`);
  if(t===1)return mcq('Subtract Integers','6.3',`(−${a}) − (−${b}) = ?`,
    [b-a,-(a+b),a-b,a+b],b-a,`Subtracting a negative = adding: −${a}+${b}=${b-a}.`,`Subtracting a negative is the same as adding a positive.`);
  if(t===2)return mcq('Multiply Integers','6.3',`(−${a}) × (−${b}) = ?`,
    [a*b,-(a*b),a+b,-(a+b)],a*b,`Negative × Negative = Positive. ${a}×${b}=${a*b}.`,`Two negatives multiplied together make a positive.`);
  return mcq('Divide Integers','6.3',`(+${a*b}) ÷ (−${b}) = ?`,
    [-a,a,-(a*b),b],-a,`Positive ÷ Negative = Negative. ${a*b}÷${b}=${a}, so −${a}.`,`Different signs in division give a negative answer.`);
};
GEN.g6_exp=()=>{
  const t=rng(0,1);
  if(t===0){const b=rng(2,9);const ans=b*b;
    return mcq('Perfect Squares','6.4',`What is ${b}²?`,
      [ans,b*2,ans+b,ans-1],ans,`${b}² = ${b}×${b} = ${ans}.`,`An exponent of 2 means multiply the number by itself.`);}
  const squares=[[4,2],[9,3],[16,4],[25,5],[36,6],[49,7],[64,8],[81,9],[100,10]];const s=pick(squares);
  return mcq('Square Roots','6.4',`What is √${s[0]}?`,
    [s[1],s[1]+1,s[1]-1,s[0]/2],s[1],`√${s[0]}=${s[1]} because ${s[1]}×${s[1]}=${s[0]}.`,`Ask: what number times itself equals ${s[0]}?`);
};
GEN.g6_ops=()=>{
  const t=rng(0,1);
  if(t===0){const n1=rng(1,5),d1=pick([2,3,4]),n2=rng(1,5),d2=pick([2,3,4]);
    const rn2=n1*n2,rd=d1*d2;const g=gcd(rn2,rd);
    return mcq('Multiply Fractions','6.5',`${n1}/${d1} × ${n2}/${d2} = ?`,
      [g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,`${n1+n2}/${d1+d2}`,`${rn2}/${d1}`,`${n1}/${rd}`],
      g>1?`${rn2/g}/${rd/g}`:`${rn2}/${rd}`,`Multiply tops and bottoms: ${n1}×${n2}=${rn2}, ${d1}×${d2}=${rd}${g>1?', simplify':''}.`,
      `Multiply the numerators together, then the denominators together.`);}
  const a=(rng(10,99)/10).toFixed(1),b=(rng(2,9)/10).toFixed(1);const ans=(+a* +b).toFixed(2);
  return mcq('Multiply Decimals','6.5',`${a} × ${b} = ?`,
    [ans,(+ans+0.1).toFixed(2),(+ans*10).toFixed(2),(+a+ +b).toFixed(2)],ans,
    `Multiply as whole numbers, then count decimal places. ${a}×${b}=${ans}.`,`Count total decimal places in both numbers — that's how many your answer needs.`);
};
GEN.g6_pemdas=()=>{
  const probs=[['3 + 4 × 2',11,'× before +: 4×2=8, then 3+8=11'],
    ['(5 + 3) × 4',32,'Parentheses first: 8×4=32'],['20 − 2 × 6',8,'×first: 2×6=12, 20−12=8'],
    ['2 × 3² − 4',14,'Exponent: 3²=9, then 2×9=18, 18−4=14'],['(10−4)÷2+5',8,'(6)÷2=3, 3+5=8'],
    ['4² − 3 × 2',10,'4²=16, 3×2=6, 16−6=10'],['18 ÷ (3+3) × 2',6,'(6), 18÷6=3, 3×2=6']];
  const p=pick(probs);
  return mcq('Order of Operations','6.6',`Evaluate:   ${p[0]}`,
    [p[1],p[1]+2,p[1]-3,p[1]*2],p[1],`PEMDAS: ${p[2]}.`,`Remember PEMDAS: Parentheses, Exponents, ×÷ (left to right), +− (left to right).`);
};
GEN.g6_eq=()=>{
  const t=rng(0,2);const ans=rng(2,15);
  if(t===0){const b=rng(1,20);return mcq('Solve Equations','6.7',`Solve:   x + ${b} = ${ans+b}`,
    [ans,ans+b,ans-1,ans+2],ans,`Subtract ${b} from both sides: x=${ans}.`,`Undo the +${b} by subtracting ${b} from both sides.`);}
  if(t===1){const f=rng(2,9);return mcq('Solve Equations','6.7',`Solve:   ${f}x = ${f*ans}`,
    [ans,ans+1,ans*2,f],ans,`Divide both sides by ${f}: x=${ans}.`,`Undo the ×${f} by dividing both sides by ${f}.`);}
  const b=rng(1,10);return mcq('Solve Equations','6.7',`Solve:   x − ${b} = ${ans}`,
    [ans+b,ans-b,ans,b],ans+b,`Add ${b} to both sides: x=${ans+b}.`,`Undo the −${b} by adding ${b} to both sides.`);
};
GEN.g6_coord=()=>{
  const x=rng(-6,6),y=rng(-6,6);const t=rng(0,1);
  if(t===0)return mcq('Coordinate Plane','6.8',`Point A is at (${x}, ${y}). Reflect it over the x-axis. New coordinates?`,
    [`(${x}, ${-y})`,`(${-x}, ${y})`,`(${-x}, ${-y})`,`(${y}, ${x})`],`(${x}, ${-y})`,
    `Reflecting over the x-axis flips the y-coordinate's sign: (${x}, ${-y}).`,`Reflecting over the x-axis changes the sign of the y-value only.`);
  const q=x>0&&y>0?'I':x<0&&y>0?'II':x<0&&y<0?'III':'IV';
  return mcq('Coordinate Plane','6.8',`In which quadrant is the point (${x}, ${y})?`,
    ['I','II','III','IV'],q,`(+,+)=I, (−,+)=II, (−,−)=III, (+,−)=IV. (${x},${y}) is in Quadrant ${q}.`,`Quadrants go counterclockwise starting top-right (I).`);
};
GEN.g6_geo=()=>{
  const t=rng(0,2);
  if(t===0){const b=rng(4,20),h=rng(3,15);const ans=b*h/2;
    return mcq('Triangle Area','6.10',`A triangle has base ${b} cm and height ${h} cm. Find the area.`,
      [`${ans} cm²`,`${b*h} cm²`,`${b+h} cm²`,`${ans+b} cm²`],`${ans} cm²`,
      `Area = ½ × base × height = ½ × ${b} × ${h} = ${ans} cm².`,`Triangle area = ½ × base × height.`);}
  if(t===1){const l=rng(2,10),w=rng(2,8),h=rng(2,8);const ans=l*w*h;
    return mcq('Volume','6.10',`A box is ${l}×${w}×${h} cm. Find the volume.`,
      [`${ans} cm³`,`${2*(l*w+l*h+w*h)} cm³`,`${l+w+h} cm³`,`${ans+10} cm³`],`${ans} cm³`,
      `Volume = length × width × height = ${l}×${w}×${h} = ${ans} cm³.`,`Volume of a box = length × width × height.`);}
  const l=rng(2,9),w=rng(2,8),h=rng(2,8);const ans=2*(l*w+l*h+w*h);
  return mcq('Surface Area','6.10',`A box is ${l}×${w}×${h} cm. Find the surface area.`,
    [`${ans} cm²`,`${l*w*h} cm²`,`${l+w+h} cm²`,`${ans-l} cm²`],`${ans} cm²`,
    `SA = 2(lw+lh+wh) = 2(${l*w}+${l*h}+${w*h}) = ${ans} cm².`,`Surface area = 2×(lw + lh + wh) — add up all 6 faces.`);
};
GEN.g6_prop=()=>{
  const a=rng(2,8),m=rng(2,6),c=a*m;const b=rng(2,9),d=b*m;
  return mcq('Proportions','6.12',`Solve the proportion:   ${a}/${b} = ${c}/x`,
    [d,d+m,d-1,c],d,`Cross multiply: ${a}·x=${b}·${c} → x=${d}. (Or notice ${a}→${c} is ×${m}, so ${b}×${m}=${d}.)`,
    `Find what the first fraction was multiplied by, then apply it to the bottom.`);
};
GEN.g6_stat=()=>{
  const data=[rng(2,12),rng(2,15),rng(2,15),rng(2,12),rng(2,10)].sort((a,b)=>a-b);
  const sum=data.reduce((a,b)=>a+b,0);const mean=Math.round(sum/data.length);
  const t=pick([['mean',mean,`Sum=${sum}, ÷${data.length}=${mean}`,`Add all, divide by count.`],
    ['median',data[2],`Sorted middle value = ${data[2]}`,`Sort the data — the middle value is the median.`],
    ['range',data[4]-data[0],`Max−Min = ${data[4]}−${data[0]} = ${data[4]-data[0]}`,`Range = biggest minus smallest.`]]);
  return mcq('Statistics','6.SP',`Data: ${data.join(', ')}\nWhat is the ${t[0]}?`,
    [t[1],t[1]+2,t[1]-1,t[1]+4],t[1],t[2],t[3]);
};

