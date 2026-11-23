// ═══════════════════════════════════════════════════════════════
// MIDDLE SCHOOL MATH — 2023 Virginia Mathematics SOL, Grades 7 and 8
// Each generator returns a fresh question every time.
// ═══════════════════════════════════════════════════════════════
const M=n=>(n<0?'−'+Math.abs(n):String(n));            // display with a true minus sign
const R2=n=>Math.round(n*100)/100;
const fmt=n=>{const r=R2(n);return M(Number.isInteger(r)?r:+r.toFixed(2));};
const sup={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const pow10=e=>'10'+String(e).split('').map(c=>sup[c]||c).join('');
function sci(m,e){return `${m} × ${pow10(e)}`;}

// ---------- GRADE 7 ----------
GEN.g7_ns1=()=>{
  const t=rng(0,3);
  if(t===0){const m=rng(11,99)/10;const e=rng(3,7);const n=Math.round(m*Math.pow(10,e));
    return mcq('Scientific Notation','7.NS.1',`Write ${n.toLocaleString()} in scientific notation.`,
      [sci(m,e),sci(m,e-1),sci(m,e+1),sci(m*10,e-1)],sci(m,e),
      `Move the decimal point ${e} places left to get ${m}, a number from 1 to 10. So ${n.toLocaleString()} = ${sci(m,e)}.`,
      'The first factor must be at least 1 and less than 10. Count how many places the decimal moves.');}
  if(t===1){const m=rng(11,99)/10;const e=-rng(2,5);const n=(m*Math.pow(10,e)).toFixed(-e+1);
    return mcq('Scientific Notation','7.NS.1',`Write ${n} in scientific notation.`,
      [sci(m,e),sci(m,-e),sci(m,e+1),sci(m,e-1)],sci(m,e),
      `Move the decimal point ${-e} places right to get ${m}. Small numbers use a negative power of 10: ${sci(m,e)}.`,
      'Numbers less than 1 have a negative exponent.');}
  if(t===2){const e=rng(1,4);const v='0.'+'0'.repeat(e-1)+'1';
    return mcq('Negative Powers of 10','7.NS.1',`What is the value of ${pow10(-e)}?`,
      [v,'0.'+'0'.repeat(e)+'1',String(Math.pow(10,e)),M(-Math.pow(10,e))],v,
      `${pow10(-e)} = 1 ÷ ${Math.pow(10,e).toLocaleString()} = ${v}.`,'A negative exponent means divide 1 by that power of 10. It is NOT a negative number.');}
  const a=[rng(11,99)/10,rng(2,6)],b=[rng(11,99)/10,rng(2,6)];if(a[1]===b[1])b[1]++;
  const va=a[0]*Math.pow(10,a[1]),vb=b[0]*Math.pow(10,b[1]);
  return mcq('Compare','7.NS.1',`Which is greater: ${sci(a[0],a[1])} or ${sci(b[0],b[1])}?`,
    [sci(a[0],a[1]),sci(b[0],b[1]),'They are equal'],va>vb?sci(a[0],a[1]):sci(b[0],b[1]),
    'Compare the exponents first. The larger power of 10 gives the larger number.','Look at the exponents before the first factors.');
};
GEN.g7_ns2=()=>{
  const t=rng(0,2);
  if(t===0){const d=pick([4,5,8,10]);const n=-rng(1,d-1);const dec=-(rng(1,9)/10);const fv=n/d;
    if(Math.abs(fv-dec)<1e-9)return GEN.g7_ns2();
    return mcq('Compare Rational Numbers','7.NS.2',`Which symbol makes this true?   ${M(n)}/${d} ___ ${M(dec)}`,['<','>','='],fv<dec?'<':'>',
      `${M(n)}/${d} = ${fmt(fv)}. On a number line, ${fv<dec?`${fmt(fv)} is to the left of ${M(dec)}`:`${fmt(fv)} is to the right of ${M(dec)}`}.`,
      'Change the fraction to a decimal. With negatives, the number farther from zero is smaller.');}
  if(t===1){const vals=shuf([[rng(1,9)/10,null],[rng(1,3)/4,'f4'],[rng(10,90)/100,'pct'],[-(rng(1,9)/10),null]]);
    const lab=v=>v[1]==='f4'?`${v[0]*4}/4`:v[1]==='pct'?`${Math.round(v[0]*100)}%`:M(v[0]);
    const uniq=new Set(vals.map(v=>v[0]));if(uniq.size<4)return GEN.g7_ns2();
    const sorted=vals.slice().sort((x,y)=>x[0]-y[0]);
    return mcq('Order Rational Numbers','7.NS.2',`Which list is in order from LEAST to GREATEST?`,
      [sorted.map(lab).join(', '),sorted.slice().reverse().map(lab).join(', '),shuf(sorted).map(lab).join(', '),[sorted[1],sorted[0],sorted[2],sorted[3]].map(lab).join(', ')],
      sorted.map(lab).join(', '),'Change every number to a decimal, then order them. The negative number is least.','Write each one as a decimal first.');}
  const a=rng(2,9),b=rng(2,9);
  return mcq('Absolute Value','7.NS.2',`Which is greater: |${M(-a)}| or ${M(-b)}?`,[`|${M(-a)}|`,M(-b),'They are equal'],`|${M(-a)}|`,
    `|${M(-a)}| = ${a}, which is positive, and ${M(-b)} is negative. Any positive number is greater than a negative number.`,'Absolute value is distance from zero, so it is never negative.');
};
GEN.g7_ns3=()=>{
  const t=rng(0,2);const r=rng(2,20);
  if(t===0)return mcq('Square Roots','7.NS.3',`What is √${r*r}?`,[r,r*2,r+1,r*r/2|0||r+2],r,`${r} × ${r} = ${r*r}, so √${r*r} = ${r}.`,'Which number times itself gives this number?');
  if(t===1){const sq=r*r;const others=[sq+1,sq+r,sq-2].filter(x=>Math.sqrt(x)%1!==0);
    return mcq('Perfect Squares','7.NS.3',`Which number is a perfect square?`,[sq].concat(others.slice(0,3)),sq,`${sq} = ${r} × ${r}, so it is a perfect square.`,'A perfect square is a whole number times itself.');}
  return mcq('Square Roots','7.NS.3',`A square garden has an area of ${r*r} square feet. How long is one side?`,[`${r} ft`,`${r*2} ft`,`${r*r/4|0} ft`,`${r+1} ft`],`${r} ft`,
    `Area = side × side. √${r*r} = ${r}, so each side is ${r} feet.`,'Find the number that times itself equals the area.');
};
GEN.g7_ce1=()=>{
  const t=rng(0,2);
  if(t===0){const s=-rng(2,12),rise=rng(5,15),drop=rng(3,10);const ans=s+rise-drop;
    return mcq('Multistep Problems','7.CE.1',`At 6 a.m. the temperature was ${M(s)}°F. It rose ${rise}° by noon, then fell ${drop}° by evening. What was the evening temperature?`,
      [`${M(ans)}°F`,`${M(s-rise+drop)}°F`,`${M(-s+rise-drop)}°F`,`${M(ans+2)}°F`],`${M(ans)}°F`,`${M(s)} + ${rise} − ${drop} = ${M(ans)}.`,'Start at the first temperature, add the rise, then subtract the drop.');}
  if(t===1){const p=rng(3,9)+pick([0.25,0.5,0.75]);const n=rng(3,6);const paid=Math.ceil(p*n/5)*5+5;const ch=R2(paid-p*n);
    return mcq('Money','7.CE.1',`Ana buys ${n} notebooks for $${p.toFixed(2)} each. She pays with $${paid}. How much change does she get?`,
      [`$${ch.toFixed(2)}`,`$${(ch+p).toFixed(2)}`,`$${R2(p*n).toFixed(2)}`,`$${(ch+0.5).toFixed(2)}`],`$${ch.toFixed(2)}`,
      `${n} × $${p.toFixed(2)} = $${(p*n).toFixed(2)}. $${paid} − $${(p*n).toFixed(2)} = $${ch.toFixed(2)}.`,'Find the total cost first, then subtract from what she paid.');}
  const L=rng(6,12),c=pick([[3,4],[1,2],[2,3]]);const each=R2(L*c[0]/c[1]);const left=R2(L-each);
  return mcq('Fractions in Context','7.CE.1',`A ${L}-foot board is cut. ${c[0]}/${c[1]} of it is used for a shelf. How many feet are left?`,
    [`${fmt(left)} ft`,`${fmt(each)} ft`,`${fmt(L-c[0])} ft`,`${fmt(left+1)} ft`],`${fmt(left)} ft`,
    `${c[0]}/${c[1]} × ${L} = ${fmt(each)} ft used. ${L} − ${fmt(each)} = ${fmt(left)} ft left.`,'Find the part used, then subtract it from the whole board.');
};
GEN.g7_ce2=()=>{
  const t=rng(0,3);
  if(t===0){const p=pick([10,15,20,25,30,40]);const price=rng(4,20)*5;const sale=R2(price*(1-p/100));
    return mcq('Percent Discount','7.CE.2',`A jacket costs $${price}. It is on sale for ${p}% off. What is the sale price?`,
      [`$${fmt(sale)}`,`$${fmt(price*p/100)}`,`$${fmt(price-p)}`,`$${fmt(price*(1+p/100))}`],`$${fmt(sale)}`,
      `${p}% of $${price} is $${fmt(price*p/100)}. $${price} − $${fmt(price*p/100)} = $${fmt(sale)}.`,'Find the discount amount, then subtract it from the price.');}
  if(t===1){const p=pick([5,6,8]);const price=rng(10,60);const tot=R2(price*(1+p/100));
    return mcq('Sales Tax','7.CE.2',`A game costs $${price}. Sales tax is ${p}%. What is the total cost?`,
      [`$${tot.toFixed(2)}`,`$${R2(price*p/100).toFixed(2)}`,`$${(price+p).toFixed(2)}`,`$${R2(price*(1-p/100)).toFixed(2)}`],`$${tot.toFixed(2)}`,
      `Tax = ${p}% × $${price} = $${R2(price*p/100).toFixed(2)}. Total = $${tot.toFixed(2)}.`,'Tax is added to the price.');}
  if(t===2){const rate=rng(40,70);const h=rng(2,5);
    return mcq('Unit Rate','7.CE.2',`A car travels ${rate*h} miles in ${h} hours at a steady speed. How far will it travel in ${h+2} hours?`,
      [`${rate*(h+2)} miles`,`${rate*h+2} miles`,`${rate*(h+1)} miles`,`${rate} miles`],`${rate*(h+2)} miles`,
      `Unit rate: ${rate*h} ÷ ${h} = ${rate} miles per hour. ${rate} × ${h+2} = ${rate*(h+2)} miles.`,'Find miles per hour first.');}
  const a=rng(2,5),b=rng(3,9),k=rng(3,6);
  return mcq('Proportions','7.CE.2',`A recipe uses ${a} cups of flour for every ${b} muffins. How much flour is needed for ${b*k} muffins?`,
    [`${a*k} cups`,`${a+k} cups`,`${b*k-a} cups`,`${a*k+a} cups`],`${a*k} cups`,`${b*k} is ${k} times ${b}, so use ${k} × ${a} = ${a*k} cups.`,'How many times bigger is the new batch?');
};
GEN.g7_mg1=()=>{
  const t=rng(0,2);
  if(t===0){const r=rng(2,6),h=rng(3,10);const v=R2(3.14*r*r*h);
    return mcq('Volume of a Cylinder','7.MG.1',`A cylinder has a radius of ${r} cm and a height of ${h} cm. What is its volume? Use π ≈ 3.14.`,
      [`${fmt(v)} cm³`,`${fmt(3.14*2*r*h)} cm³`,`${fmt(3.14*r*h)} cm³`,`${fmt(3.14*r*r)} cm³`],`${fmt(v)} cm³`,
      `V = πr²h = 3.14 × ${r}² × ${h} = ${fmt(v)} cm³.`,'Volume of a cylinder = area of the circle base × height.');}
  if(t===1){const l=rng(3,10),w=rng(2,8),h=rng(2,8);const sa=2*(l*w+l*h+w*h);
    return mcq('Surface Area of a Prism','7.MG.1',`A rectangular prism is ${l} in. long, ${w} in. wide, and ${h} in. tall. What is its surface area?`,
      [`${sa} in²`,`${l*w*h} in²`,`${l*w+l*h+w*h} in²`,`${2*(l+w+h)} in²`],`${sa} in²`,
      `SA = 2(lw + lh + wh) = 2(${l*w} + ${l*h} + ${w*h}) = ${sa} in².`,'Add the areas of all six faces. Opposite faces match.');}
  const r=rng(2,5),h=rng(4,10);const sa=R2(2*3.14*r*r+2*3.14*r*h);
  return mcq('Surface Area of a Cylinder','7.MG.1',`A can has a radius of ${r} cm and a height of ${h} cm. What is its total surface area? Use π ≈ 3.14.`,
    [`${fmt(sa)} cm²`,`${fmt(3.14*r*r*h)} cm²`,`${fmt(2*3.14*r*h)} cm²`,`${fmt(3.14*r*r+3.14*r*h)} cm²`],`${fmt(sa)} cm²`,
    `SA = 2πr² + 2πrh = ${fmt(2*3.14*r*r)} + ${fmt(2*3.14*r*h)} = ${fmt(sa)} cm².`,'Two circles (top and bottom) plus the label that wraps around.');
};
GEN.g7_mg2=()=>{
  const t=rng(0,1);
  if(t===0){const k=rng(2,4);const a=rng(3,8),b=rng(4,9);
    return mcq('Similar Figures','7.MG.2',`Triangle ABC is similar to triangle DEF. AB = ${a} and DE = ${a*k}. If BC = ${b}, what is EF?`,
      [b*k,b+a*k-a,b*k+k,a*k],b*k,`The scale factor is ${a*k} ÷ ${a} = ${k}. EF = ${b} × ${k} = ${b*k}.`,'Find the scale factor from the matching sides you know.');}
  const s=rng(2,5);const cm=rng(3,9);
  return mcq('Scale Drawings','7.MG.2',`On a map, 1 cm represents ${s} km. Two towns are ${cm} cm apart on the map. How far apart are they really?`,
    [`${s*cm} km`,`${s+cm} km`,`${cm} km`,`${s*cm*10} km`],`${s*cm} km`,`${cm} × ${s} = ${s*cm} km.`,'Multiply the map distance by the scale.');
};
GEN.g7_mg3=()=>{
  const t=rng(0,3);
  if(t===0){const a=rng(60,120),b=rng(60,120),c=rng(50,110);const d=360-a-b-c;if(d<20)return GEN.g7_mg3();
    return mcq('Quadrilateral Angles','7.MG.3',`Three angles of a quadrilateral measure ${a}°, ${b}°, and ${c}°. What is the fourth angle?`,
      [`${d}°`,`${180-((a+b+c)%180)}°`,`${d+10}°`,`${360-a-b}°`],`${d}°`,`The angles of a quadrilateral add to 360°. 360 − ${a} − ${b} − ${c} = ${d}°.`,'All four angles in a quadrilateral total 360°.');}
  if(t===1){const q=pick([['has exactly one pair of parallel sides','Trapezoid'],['always has four congruent sides and four right angles','Square'],['has four congruent sides but may not have right angles','Rhombus'],['has four right angles but its sides may not all be congruent','Rectangle']]);
    return mcq('Classify Quadrilaterals','7.MG.3',`Which quadrilateral ${q[0]}?`,['Trapezoid','Square','Rhombus','Rectangle'],q[1],`A ${q[1].toLowerCase()} ${q[0]}.`,'Think about parallel sides, side lengths, and right angles.');}
  if(t===2){return mcq('Classify Quadrilaterals','7.MG.3','Which statement is ALWAYS true?',['Every square is a rhombus.','Every rhombus is a square.','Every rectangle is a square.','Every trapezoid is a parallelogram.'],'Every square is a rhombus.',
    'A square has four congruent sides, so it is always a rhombus. A rhombus does not always have right angles, so it is not always a square.','Check each statement against the definitions.');}
  const s=rng(4,12);
  return mcq('Rhombus','7.MG.3',`A rhombus has one side that is ${s} cm long. What is its perimeter?`,[`${4*s} cm`,`${2*s} cm`,`${s*s} cm`,`${3*s} cm`],`${4*s} cm`,
    `All four sides of a rhombus are congruent: 4 × ${s} = ${4*s} cm.`,'How many sides are equal in a rhombus?');
};
GEN.g7_mg4=()=>{
  const k=pick([2,3,0.5]);const x=k===0.5?rng(1,6)*2:rng(-5,6),y=k===0.5?rng(1,6)*2:rng(-5,6);
  const P=(a,b)=>`(${M(a)}, ${M(b)})`;
  return mcq('Dilations','7.MG.4',`Point A ${P(x,y)} is dilated by a scale factor of ${k} with the origin as the center. Where is A′?`,
    [P(x*k,y*k),P(x+k,y+k),P(x*k,y),P(y*k,x*k)],P(x*k,y*k),`Multiply both coordinates by ${k}: ${P(x*k,y*k)}.${k<1?' A scale factor less than 1 makes the figure smaller.':' A scale factor greater than 1 makes the figure larger.'}`,
    'With the origin as the center, multiply x and y by the scale factor.');
};
GEN.g7_ps1=()=>{
  const t=rng(0,1);
  const r=rng(2,6),b=rng(2,6),g=rng(1,5);const tot=r+b+g;
  if(t===0)return mcq('Theoretical Probability','7.PS.1',`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of picking a blue marble?`,
    [`${b}/${tot}`,`${b}/${tot-b}`,`${r}/${tot}`,`1/${tot}`],`${b}/${tot}`,`There are ${b} blue out of ${tot} marbles: ${b}/${tot}.`,'Probability = favorable outcomes ÷ total outcomes.');
  const n=pick([20,40,50]);const heads=rng(Math.floor(n*.3),Math.floor(n*.7));
  return mcq('Experimental Probability','7.PS.1',`Jo flipped a coin ${n} times and got heads ${heads} times. What is the experimental probability of heads?`,
    [`${heads}/${n}`,'1/2',`${n-heads}/${n}`,`${heads}/${n-heads}`],`${heads}/${n}`,
    `Experimental probability uses what actually happened: ${heads}/${n}. The theoretical probability is 1/2. With more flips, the results usually get closer to 1/2.`,'Use the results of the experiment, not what you expect.');
};
function dgHist(bins,counts,col){
  const W=360,H=200,x0=40,y0=170,bw=(W-60)/bins.length;const mx=Math.max(...counts);const sc=130/mx;
  let r=`<line x1="${x0}" y1="${y0}" x2="${W-14}" y2="${y0}" stroke="${DG.ink}" stroke-width="2.5"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="24" stroke="${DG.ink}" stroke-width="2.5"/>`;
  for(let v=0;v<=mx;v+=Math.max(1,Math.ceil(mx/5))){const y=y0-v*sc;r+=`<line x1="${x0}" y1="${y}" x2="${W-14}" y2="${y}" stroke="${DG.grid}"/>`+dgText(x0-8,y+5,String(v),{s:12,a:'end'});}
  counts.forEach((c,i)=>{const x=x0+i*bw;r+=`<rect x="${x}" y="${y0-c*sc}" width="${bw}" height="${c*sc}" fill="${col}" stroke="${DG.ink}" stroke-width="2"/>`+dgText(x+bw/2,y0+18,bins[i],{s:11});});
  return dgSvg(W,H+10,r,'Histogram');
}
GEN.g7_ps2=()=>{
  const bins=['0–9','10–19','20–29','30–39','40–49'];const counts=bins.map(()=>rng(1,9));
  const svg=dgHist(bins,counts,'#4C8DF6');const t=rng(0,2);
  if(t===0){const i=rng(0,4);return mcq('Histograms','7.PS.2',`The histogram shows minutes students spent reading. How many students read ${bins[i]} minutes?`,
    [counts[i],counts[i]+1,Math.max(0,counts[i]-1),counts[(i+1)%5]],counts[i],`The bar for ${bins[i]} reaches ${counts[i]}.`,'Read the height of the bar on the vertical axis.',{dgSvg:svg});}
  if(t===1){const tot=counts.reduce((a,b)=>a+b,0);return mcq('Histograms','7.PS.2',`How many students are shown in the histogram in all?`,
    [tot,tot-counts[0],tot+2,counts.length],tot,`Add the bar heights: ${counts.join(' + ')} = ${tot}.`,'Add the height of every bar.',{dgSvg:svg});}
  const mx=Math.max(...counts);if(counts.filter(c=>c===mx).length>1)return GEN.g7_ps2();
  return mcq('Histograms','7.PS.2',`Which interval has the most students?`,bins.slice(),bins[counts.indexOf(mx)],`The tallest bar is ${bins[counts.indexOf(mx)]} with ${mx} students.`,'Find the tallest bar.',{dgSvg:svg});
};
GEN.g7_pfa1=()=>{
  const m=rng(2,9);const xs=[1,2,3,4].map(x=>x*rng(1,2)).sort((a,b)=>a-b);const uniq=[...new Set(xs)];if(uniq.length<3)return GEN.g7_pfa1();
  const t=rng(0,1);const tbl=uniq.map(x=>`(${x}, ${m*x})`).join(', ');
  if(t===0)return mcq('Proportional Relationships','7.PFA.1',`The points ${tbl} show a proportional relationship. Which equation fits?`,
    [`y = ${m}x`,`y = x + ${m}`,`y = ${m+1}x`,`y = ${m}x + 1`],`y = ${m}x`,`Each y is ${m} times x, so y = ${m}x. The slope (unit rate) is ${m}.`,'Divide y by x for each pair. Is it always the same?');
  return mcq('Slope as Rate','7.PFA.1',`A pump fills a tank at a constant rate. After ${uniq[0]} min it holds ${m*uniq[0]} gal; after ${uniq[2]} min it holds ${m*uniq[2]} gal. What is the slope (gallons per minute)?`,
    [m,m*uniq[0],uniq[2],m+1],m,`Slope = change in y ÷ change in x = (${m*uniq[2]} − ${m*uniq[0]}) ÷ (${uniq[2]} − ${uniq[0]}) = ${m}.`,'Slope = rise ÷ run.');
};
GEN.g7_pfa2=()=>{
  const t=rng(0,2);
  if(t===0){const a=rng(2,6),b=rng(1,9),x=rng(-4,6);const v=a*x+b;
    return mcq('Evaluate Expressions','7.PFA.2',`Evaluate ${a}x + ${b} when x = ${M(x)}.`,[M(v),M(a+x+b),M(a*x-b),M(a*(x+b))],M(v),`${a}(${M(x)}) + ${b} = ${M(a*x)} + ${b} = ${M(v)}.`,'Replace x with the number, multiply first, then add.');}
  if(t===1){const a=rng(2,7),b=rng(2,7),c=rng(1,9);
    return mcq('Simplify Expressions','7.PFA.2',`Simplify: ${a}x + ${c} + ${b}x`,[`${a+b}x + ${c}`,`${a+b+c}x`,`${a*b}x + ${c}`,`${a+b}x + ${c}x`],`${a+b}x + ${c}`,`Combine like terms: ${a}x + ${b}x = ${a+b}x. Keep the ${c}.`,'Only terms with the same variable can be combined.');}
  const a=rng(2,6),b=rng(1,8);
  return mcq('Distributive Property','7.PFA.2',`Which expression is equivalent to ${a}(x + ${b})?`,[`${a}x + ${a*b}`,`${a}x + ${b}`,`x + ${a*b}`,`${a+b}x`],`${a}x + ${a*b}`,`Multiply ${a} by each term: ${a}·x + ${a}·${b} = ${a}x + ${a*b}.`,'Multiply the outside number by EVERY term inside.');
};
GEN.g7_pfa3=()=>{
  const a=rng(2,9),x=rng(-6,12),b=rng(-10,15);const c=a*x+b;
  const eq=`${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${M(c)}`;
  return mcq('Two-Step Equations','7.PFA.3',`Solve: ${eq}`,[`x = ${M(x)}`,`x = ${M(x+1)}`,`x = ${M(-x)}`,`x = ${M(Math.round((c+b)/a))}`],`x = ${M(x)}`,
    `${b<0?'Add':'Subtract'} ${Math.abs(b)} on both sides: ${a}x = ${M(c-b)}. Divide by ${a}: x = ${M(x)}. Check: ${a}(${M(x)}) ${b<0?'−':'+'} ${Math.abs(b)} = ${M(c)}.`,
    'Undo the adding or subtracting first, then undo the multiplying.');
};
GEN.g7_pfa4=()=>{
  const a=rng(2,6),x=rng(-4,9),b=rng(1,12);const c=a*x+b;const sym=pick(['<','>','≤','≥']);
  return mcq('Inequalities','7.PFA.4',`Solve: ${a}x + ${b} ${sym} ${M(c)}`,[`x ${sym} ${M(x)}`,`x ${({'<':'>','>':'<','≤':'≥','≥':'≤'})[sym]} ${M(x)}`,`x ${sym} ${M(x+b)}`,`x ${sym} ${M(c-b)}`],`x ${sym} ${M(x)}`,
    `Subtract ${b}: ${a}x ${sym} ${M(c-b)}. Divide by ${a} (positive, so the sign stays the same): x ${sym} ${M(x)}.`,'Solve it like an equation. The sign only flips if you multiply or divide by a negative.');
};

// ---------- GRADE 8 ----------
GEN.g8_ns1=()=>{
  const t=rng(0,2);
  if(t===0){const n=pick([2,3,5,6,7,8,10,11,12,13,14,15,17,18,19,20,22,24,27,30,33,35,40,45,50,55,60,65,70,75,80,90,99]);const lo=Math.floor(Math.sqrt(n));
    if(lo*lo===n)return GEN.g8_ns1();
    return mcq('Estimate Square Roots','8.NS.1',`√${n} is between which two whole numbers?`,[`${lo} and ${lo+1}`,`${lo-1} and ${lo}`,`${lo+1} and ${lo+2}`,`${Math.floor(n/2)} and ${Math.floor(n/2)+1}`],`${lo} and ${lo+1}`,
      `${lo}² = ${lo*lo} and ${lo+1}² = ${(lo+1)*(lo+1)}. ${n} is between them, so √${n} is between ${lo} and ${lo+1}.`,'Find the perfect squares just below and just above the number.');}
  if(t===1){const set=shuf([['π',Math.PI],['3.1',3.1],['√10',Math.sqrt(10)],['22/7',22/7]]);const mx=set.reduce((a,b)=>b[1]>a[1]?b:a);
    return mcq('Compare Real Numbers','8.NS.1',`Which number is the GREATEST?`,set.map(s=>s[0]),mx[0],`As decimals: π ≈ 3.142, 3.1, √10 ≈ 3.162, 22/7 ≈ 3.143. The greatest is ${mx[0]}.`,'Write each number as a decimal to a few places.');}
  const a=rng(2,12);return mcq('Square Roots','8.NS.1',`What are the square roots of ${a*a}?`,[`${a} and ${M(-a)}`,`${a} only`,`${a*a/2|0} and ${M(-(a*a/2|0))}`,`${M(-a)} only`],`${a} and ${M(-a)}`,
    `${a} × ${a} = ${a*a} and (${M(-a)}) × (${M(-a)}) = ${a*a}. A positive number has two square roots.`,'A negative times a negative is positive.');
};
GEN.g8_ns2=()=>{
  const items=[['√16','natural, whole, integer, rational'],['−7','integer, rational'],['0.75','rational'],['√7','irrational'],['π','irrational'],['0','whole, integer, rational'],['2/3','rational'],['−√25','integer, rational'],['0.333…','rational'],['√2','irrational']];
  const it=pick(items);const t=rng(0,1);
  if(t===0){const isIrr=it[1]==='irrational';
    return mcq('Real Number System','8.NS.2',`Is ${it[0]} rational or irrational?`,['Rational','Irrational'],isIrr?'Irrational':'Rational',
      isIrr?`${it[0]} is a non-repeating, non-ending decimal, so it is irrational.`:`${it[0]} can be written as a fraction of integers, so it is rational. It belongs to: ${it[1]}.`,
      'Rational numbers can be written as a fraction. Square roots of non-perfect squares are irrational.');}
  const opts=['natural, whole, integer, rational','whole, integer, rational','integer, rational','rational','irrational'];
  return mcq('Real Number System','8.NS.2',`Which list names ALL the sets that ${it[0]} belongs to?`,opts,it[1],`${it[0]} belongs to: ${it[1]}. Every one of these is also a real number.`,
    'Work from the smallest set (natural numbers) outward.');
};
GEN.g8_ce1=()=>{
  const t=rng(0,2);
  if(t===0){const o=rng(4,20)*5,p=pick([10,20,25,40,50]);const nw=o*(1+p/100);
    return mcq('Percent Increase','8.CE.1',`A club had ${o} members. Membership grew by ${p}%. How many members are there now?`,[nw,o+p,o*p/100,o*(1-p/100)],nw,
      `${p}% of ${o} = ${o*p/100}. ${o} + ${o*p/100} = ${nw}.`,'Find the increase, then add it to the original.');}
  if(t===1){const P=rng(2,20)*100,r=pick([2,3,4,5]),y=rng(2,5);const I=P*r/100*y;
    return mcq('Simple Interest','8.CE.1',`$${P.toLocaleString()} is saved at ${r}% simple interest per year. How much interest is earned in ${y} years?`,
      [`$${I.toLocaleString()}`,`$${(P*r/100).toLocaleString()}`,`$${(P+I).toLocaleString()}`,`$${(P*r*y).toLocaleString()}`],`$${I.toLocaleString()}`,
      `I = P × r × t = ${P} × ${r/100} × ${y} = $${I.toLocaleString()}.`,'Simple interest = principal × rate × time.');}
  const o=rng(5,20)*10,n=o-rng(1,4)*o/10;const pc=Math.round((o-n)/o*100);
  return mcq('Percent Decrease','8.CE.1',`A bike’s price dropped from $${o} to $${n}. What is the percent decrease?`,[`${pc}%`,`${o-n}%`,`${100-pc}%`,`${Math.round((o-n)/n*100)}%`],`${pc}%`,
    `Change = $${o-n}. ${o-n} ÷ ${o} = ${(pc/100).toFixed(2)} = ${pc}%.`,'Percent change = amount of change ÷ ORIGINAL amount.');
};
GEN.g8_mg1=()=>{
  const a=rng(20,160);const t=rng(0,2);
  if(t===0)return mcq('Vertical Angles','8.MG.1',`Two lines cross. One angle measures ${a}°. What is the measure of the angle vertical to it?`,[`${a}°`,`${180-a}°`,`${90-a>0?90-a:a+10}°`,`${360-a}°`],`${a}°`,'Vertical angles are always congruent.','Vertical angles are across from each other at the intersection.');
  if(t===1)return mcq('Supplementary Angles','8.MG.1',`Two angles are supplementary. One measures ${a}°. What is the other?`,[`${180-a}°`,`${a}°`,`${Math.abs(90-a)}°`,`${360-a}°`],`${180-a}°`,`Supplementary angles add to 180°: 180 − ${a} = ${180-a}°.`,'Supplementary = 180°.');
  const b=rng(10,80);return mcq('Complementary Angles','8.MG.1',`Two angles are complementary. One measures ${b}°. What is the other?`,[`${90-b}°`,`${180-b}°`,`${b}°`,`${90+b}°`],`${90-b}°`,`Complementary angles add to 90°: 90 − ${b} = ${90-b}°.`,'Complementary = 90°.');
};
GEN.g8_mg2=()=>{
  const t=rng(0,2);
  if(t===0){const r=rng(2,6),h=rng(3,12);const v=R2(3.14*r*r*h/3);
    return mcq('Volume of a Cone','8.MG.2',`A cone has a radius of ${r} cm and a height of ${h} cm. What is its volume? Use π ≈ 3.14.`,
      [`${fmt(v)} cm³`,`${fmt(3.14*r*r*h)} cm³`,`${fmt(3.14*r*h/3)} cm³`,`${fmt(v*2)} cm³`],`${fmt(v)} cm³`,`V = ⅓πr²h = ⅓ × 3.14 × ${r*r} × ${h} = ${fmt(v)} cm³.`,'A cone holds one-third as much as a cylinder with the same base and height.');}
  if(t===1){const s=rng(3,10),h=rng(3,12);const v=R2(s*s*h/3);
    return mcq('Volume of a Pyramid','8.MG.2',`A square pyramid has a base side of ${s} m and a height of ${h} m. What is its volume?`,
      [`${fmt(v)} m³`,`${s*s*h} m³`,`${fmt(s*h/3)} m³`,`${fmt(s*s*h/2)} m³`],`${fmt(v)} m³`,`V = ⅓Bh = ⅓ × ${s*s} × ${h} = ${fmt(v)} m³.`,'Find the base area first, then multiply by height and divide by 3.');}
  const s=rng(4,10),l=rng(5,12);const sa=s*s+2*s*l;
  return mcq('Surface Area of a Pyramid','8.MG.2',`A square pyramid has a base side of ${s} in. and a slant height of ${l} in. What is its surface area?`,
    [`${sa} in²`,`${s*s+4*s*l} in²`,`${2*s*l} in²`,`${s*s*l} in²`],`${sa} in²`,`Base = ${s}² = ${s*s}. Four triangles = 4 × ½ × ${s} × ${l} = ${2*s*l}. Total = ${sa} in².`,'Add the square base and the four triangle faces.');
};
GEN.g8_mg3=()=>{
  const x=rng(-6,6),y=rng(-6,6);const P=(a,b)=>`(${M(a)}, ${M(b)})`;const t=rng(0,2);
  if(t===0){const dx=rng(-5,5)||2,dy=rng(-5,5)||-3;
    return mcq('Translations','8.MG.3',`Point P ${P(x,y)} is translated ${Math.abs(dx)} units ${dx>0?'right':'left'} and ${Math.abs(dy)} units ${dy>0?'up':'down'}. Where is P′?`,
      [P(x+dx,y+dy),P(x-dx,y-dy),P(x+dy,y+dx),P(x+dx,y-dy)],P(x+dx,y+dy),`Right/left changes x; up/down changes y: ${P(x+dx,y+dy)}.`,'Left and right move x. Up and down move y.');}
  if(t===1)return mcq('Reflections','8.MG.3',`Point P ${P(x,y)} is reflected over the x-axis. Where is P′?`,[P(x,-y),P(-x,y),P(-x,-y),P(y,x)],P(x,-y),`Reflecting over the x-axis keeps x and changes the sign of y: ${P(x,-y)}.`,'Over the x-axis, the point flips up/down.');
  return mcq('Reflections','8.MG.3',`Point P ${P(x,y)} is reflected over the y-axis. Where is P′?`,[P(-x,y),P(x,-y),P(-x,-y),P(y,x)],P(-x,y),`Reflecting over the y-axis changes the sign of x: ${P(-x,y)}.`,'Over the y-axis, the point flips left/right.');
};
GEN.g8_mg4=()=>{
  const tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25]]);const t=rng(0,2);
  if(t===0)return mcq('Pythagorean Theorem','8.MG.4',`A right triangle has legs of ${tr[0]} and ${tr[1]}. How long is the hypotenuse?`,[tr[2],tr[0]+tr[1],tr[2]+1,Math.round(Math.sqrt(tr[0]*tr[1]))],tr[2],
    `a² + b² = c²: ${tr[0]*tr[0]} + ${tr[1]*tr[1]} = ${tr[2]*tr[2]}, and √${tr[2]*tr[2]} = ${tr[2]}.`,'Square both legs, add, then take the square root.');
  if(t===1)return mcq('Pythagorean Theorem','8.MG.4',`A ${tr[2]}-foot ladder leans against a wall. Its base is ${tr[0]} feet from the wall. How high up the wall does it reach?`,[`${tr[1]} ft`,`${tr[2]-tr[0]} ft`,`${tr[2]+tr[0]} ft`,`${tr[1]+1} ft`],`${tr[1]} ft`,
    `${tr[2]}² − ${tr[0]}² = ${tr[2]*tr[2]} − ${tr[0]*tr[0]} = ${tr[1]*tr[1]}. √${tr[1]*tr[1]} = ${tr[1]} ft.`,'The ladder is the hypotenuse. Subtract to find a missing leg.');
  const bad=[tr[0],tr[1],tr[2]+1];const isR=Math.random()<.5;const s=isR?tr:bad;
  return mcq('Right Triangles','8.MG.4',`Can sides of ${s[0]}, ${s[1]}, and ${s[2]} form a right triangle?`,['Yes','No'],isR?'Yes':'No',
    `${s[0]}² + ${s[1]}² = ${s[0]*s[0]+s[1]*s[1]} and ${s[2]}² = ${s[2]*s[2]}. ${isR?'They are equal, so yes.':'They are not equal, so no.'}`,'Check whether a² + b² equals c² for the longest side.');
};
GEN.g8_mg5=()=>{
  const t=rng(0,1);const l=rng(6,14),w=rng(4,10);
  if(t===0){const h=rng(2,8);const A=l*w+l*h/2;
    return mcq('Composite Area','8.MG.5',`A figure is a ${l} ft by ${w} ft rectangle with a triangle on top. The triangle’s base is ${l} ft and its height is ${h} ft. What is the total area?`,
      [`${fmt(A)} ft²`,`${l*w+l*h} ft²`,`${l*w} ft²`,`${fmt(l*w+h)} ft²`],`${fmt(A)} ft²`,`Rectangle: ${l*w}. Triangle: ½ × ${l} × ${h} = ${fmt(l*h/2)}. Total: ${fmt(A)} ft².`,'Split the shape into parts, find each area, then add.');}
  const r=w/2;const A=R2(l*w+3.14*r*r/2);
  return mcq('Composite Area','8.MG.5',`A ${l} m by ${w} m rectangle has a half-circle on one ${w} m side. What is the total area? Use π ≈ 3.14.`,
    [`${fmt(A)} m²`,`${fmt(l*w+3.14*r*r)} m²`,`${l*w} m²`,`${fmt(l*w+3.14*w*w/2)} m²`],`${fmt(A)} m²`,
    `Rectangle: ${l*w}. Half-circle (radius ${fmt(r)}): ½ × 3.14 × ${fmt(r*r)} = ${fmt(3.14*r*r/2)}. Total: ${fmt(A)} m².`,'The half-circle’s diameter is the side it sits on.');
};
GEN.g8_ps1=()=>{
  const r=rng(2,6),b=rng(2,6);const tot=r+b;const t=rng(0,1);
  if(t===0){const n=r*r,d=tot*tot;const g=gcd(n,d);
    return mcq('Independent Events','8.PS.1',`A bag has ${r} red and ${b} blue tiles. You pick one, PUT IT BACK, and pick again. What is P(red, then red)?`,
      [`${n/g}/${d/g}`,`${r*(r-1)/gcd(r*(r-1),tot*(tot-1))}/${tot*(tot-1)/gcd(r*(r-1),tot*(tot-1))}`,`${r}/${tot}`,`${2*r}/${tot}`],`${n/g}/${d/g}`,
      `Replacing the tile makes the picks independent: ${r}/${tot} × ${r}/${tot} = ${n/g}/${d/g}.`,'With replacement, the total stays the same both times.');}
  const n=r*(r-1),d=tot*(tot-1);const g=gcd(n,d);
  return mcq('Dependent Events','8.PS.1',`A bag has ${r} red and ${b} blue tiles. You pick one and DO NOT put it back, then pick again. What is P(red, then red)?`,
    [`${n/g}/${d/g}`,`${r*r/gcd(r*r,tot*tot)}/${tot*tot/gcd(r*r,tot*tot)}`,`${r-1}/${tot-1}`,`${r}/${tot}`],`${n/g}/${d/g}`,
    `Without replacement the events are dependent: ${r}/${tot} × ${r-1}/${tot-1} = ${n/g}/${d/g}.`,'After the first pick there is one less red tile and one less tile in all.');
};
function fiveNum(a){const s=a.slice().sort((x,y)=>x-y);const med=v=>{const m=v.length/2;return v.length%2?v[Math.floor(m)]:(v[m-1]+v[m])/2;};
  const h=Math.floor(s.length/2);return [s[0],med(s.slice(0,h)),med(s),med(s.slice(s.length%2?h+1:h)),s[s.length-1]];}
GEN.g8_ps2=()=>{
  const data=Array.from({length:rng(4,5)*2-1},()=>rng(10,60));const [mn,q1,md,q3,mx]=fiveNum(data);const s=data.slice().sort((a,b)=>a-b);
  const t=rng(0,2);
  if(t===0)return mcq('Boxplots','8.PS.2',`Data: ${s.join(', ')}. What is the median?`,[md,q1,q3,Math.round(s.reduce((a,b)=>a+b,0)/s.length)],md,`The median is the middle value of the ordered data: ${md}.`,'Order the data and find the middle number.');
  if(t===1)return mcq('Boxplots','8.PS.2',`A boxplot has minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3}, and maximum ${mx}. What is the interquartile range (IQR)?`,[fmt(q3-q1),fmt(mx-mn),fmt(md-q1),fmt(q3-md)],fmt(q3-q1),`IQR = Q3 − Q1 = ${q3} − ${q1} = ${fmt(q3-q1)}.`,'The IQR is the length of the box.');
  return mcq('Boxplots','8.PS.2',`A boxplot has minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3}, and maximum ${mx}. About what percent of the data is between Q1 and Q3?`,['50%','25%','75%','100%'],'50%',
    'The box (Q1 to Q3) holds the middle half of the data, about 50%.','Each of the four sections holds about 25%.');
};
GEN.g8_ps3=()=>{
  const cases=[['hours studied and test score','positive'],['outside temperature and hot cocoa sales','negative'],['shoe size and favorite color','no'],['age of a car and its value','negative'],['height and arm span','positive'],['hours of TV and hours of sleep','negative']];
  const c=pick(cases);const t=rng(0,1);
  if(t===0)return mcq('Scatterplots','8.PS.3',`What kind of relationship would a scatterplot of ${c[0]} most likely show?`,['Positive','Negative','No relationship'],c[1]==='no'?'No relationship':c[1][0].toUpperCase()+c[1].slice(1),
    `${c[1]==='positive'?'As one goes up, the other tends to go up.':c[1]==='negative'?'As one goes up, the other tends to go down.':'The two have nothing to do with each other.'}`,'Ask: when one increases, what happens to the other?');
  const m=rng(2,6),b=rng(10,40),x=rng(5,12);
  return mcq('Line of Best Fit','8.PS.3',`The line of best fit for a scatterplot is y = ${m}x + ${b}. Predict y when x = ${x}.`,[m*x+b,m*x,m+x+b,(m+1)*x+b],m*x+b,`y = ${m}(${x}) + ${b} = ${m*x+b}.`,'Substitute x into the equation of the line.');
};
GEN.g8_pfa1=()=>{
  const a=rng(2,6),b=rng(2,9),c=rng(1,5),d=rng(1,9);
  return mcq('Equivalent Expressions','8.PFA.1',`Simplify: ${a}(x − ${b}) + ${c}x + ${d}`,[`${a+c}x ${d-a*b<0?'−':'+'} ${Math.abs(d-a*b)}`,`${a+c}x ${d-b<0?'−':'+'} ${Math.abs(d-b)}`,`${a*c}x + ${d+a*b}`,`${a+c}x + ${d+a*b}`],
    `${a+c}x ${d-a*b<0?'−':'+'} ${Math.abs(d-a*b)}`,`Distribute: ${a}x − ${a*b}. Combine: ${a}x + ${c}x = ${a+c}x and −${a*b} + ${d} = ${M(d-a*b)}.`,'Distribute first, then combine like terms. Watch the negative sign.');
};
GEN.g8_pfa2=()=>{
  const t=rng(0,1);const xs=shuf([1,2,3,4,5,6,7]).slice(0,4);
  if(t===0){const isF=Math.random()<.5;const pts=xs.map(x=>[x,rng(-5,9)]);if(!isF)pts[3]=[pts[0][0],pts[0][1]+rng(1,4)];
    return mcq('Functions','8.PFA.2',`Is this relation a function? {${pts.map(p=>`(${p[0]}, ${M(p[1])})`).join(', ')}}`,['Yes','No'],isF?'Yes':'No',
      isF?'Each x-value is paired with exactly one y-value, so it is a function.':`The x-value ${pts[0][0]} is paired with two different y-values, so it is NOT a function.`,'Look for any x-value that repeats with a different y.');}
  const pts=xs.map(x=>[x,rng(-5,9)]);const dom=pts.map(p=>p[0]).sort((a,b)=>a-b);
  return mcq('Domain and Range','8.PFA.2',`What is the domain of {${pts.map(p=>`(${p[0]}, ${M(p[1])})`).join(', ')}}?`,
    [`{${dom.join(', ')}}`,`{${[...new Set(pts.map(p=>p[1]))].sort((a,b)=>a-b).map(M).join(', ')}}`,`{${dom.slice(0,3).join(', ')}}`],`{${dom.join(', ')}}`,
    'The domain is the set of all x-values (inputs).','Domain = inputs (x). Range = outputs (y).');
};
GEN.g8_pfa3=()=>{
  const t=rng(0,2);
  if(t===0){const x1=rng(-3,3),x2=x1+rng(1,4),m=rng(-4,5)||2,b=rng(-5,5);const y1=m*x1+b,y2=m*x2+b;
    return mcq('Slope','8.PFA.3',`What is the slope of the line through (${M(x1)}, ${M(y1)}) and (${M(x2)}, ${M(y2)})?`,[M(m),M(-m),M(y2-y1),M(x2-x1)],M(m),
      `Slope = (${M(y2)} − ${M(y1)}) ÷ (${M(x2)} − ${M(x1)}) = ${M(y2-y1)} ÷ ${x2-x1} = ${M(m)}.`,'Slope = change in y ÷ change in x.');}
  if(t===1){const m=rng(-5,6)||3,b=rng(-9,9);return mcq('Y-Intercept','8.PFA.3',`What is the y-intercept of y = ${M(m)}x ${b<0?'−':'+'} ${Math.abs(b)}?`,[M(b),M(m),M(-b),'0'],M(b),
    `In y = mx + b, b is the y-intercept: ${M(b)}. The line crosses the y-axis at (0, ${M(b)}).`,'Look at the constant term in y = mx + b.');}
  const fee=rng(2,6),per=rng(1,4),mi=rng(3,12);
  return mcq('Linear Functions','8.PFA.3',`A taxi charges $${fee} plus $${per} per mile: y = ${per}x + ${fee}. What does a ${mi}-mile ride cost?`,[`$${per*mi+fee}`,`$${per*mi}`,`$${(per+fee)*mi}`,`$${fee*mi+per}`],`$${per*mi+fee}`,
    `y = ${per}(${mi}) + ${fee} = $${per*mi+fee}. The slope (${per}) is the rate per mile and the y-intercept (${fee}) is the starting fee.`,'Substitute the miles for x.');
};
GEN.g8_pfa4=()=>{
  const x=rng(-5,9),a=rng(4,9),c=rng(1,a-1),b=rng(-8,12);const d=(a-c)*x+b;
  return mcq('Multistep Equations','8.PFA.4',`Solve: ${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${c}x ${d<0?'−':'+'} ${Math.abs(d)}`,[`x = ${M(x)}`,`x = ${M(-x)}`,`x = ${M(x+1)}`,`x = ${M(Math.round((d+b)/(a+c)))}`],`x = ${M(x)}`,
    `Subtract ${c}x from both sides: ${a-c}x ${b<0?'−':'+'} ${Math.abs(b)} = ${M(d)}. Then ${a-c}x = ${M(d-b)}, so x = ${M(x)}.`,'Get the variable terms on one side first.');
};
GEN.g8_pfa5=()=>{
  const a=rng(2,6),x=rng(-5,6),b=rng(1,10);const c=-a*x+b;const sym=pick(['<','>']);const flip=sym==='<'?'>':'<';
  return mcq('Multistep Inequalities','8.PFA.5',`Solve: −${a}x + ${b} ${sym} ${M(c)}`,[`x ${flip} ${M(x)}`,`x ${sym} ${M(x)}`,`x ${flip} ${M(-x)}`,`x ${sym} ${M(c-b)}`],`x ${flip} ${M(x)}`,
    `Subtract ${b}: −${a}x ${sym} ${M(c-b)}. Divide by −${a} and FLIP the sign: x ${flip} ${M(x)}.`,'When you divide both sides by a negative number, flip the inequality sign.');
};


