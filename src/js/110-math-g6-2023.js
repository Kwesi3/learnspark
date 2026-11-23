// ═══════════════════════════════════════════════════════════════
// GRADE 6 — NEW 2023 SOL GENERATORS (coverage gaps)
// ═══════════════════════════════════════════════════════════════

// 6.NS.2 — Integers: represent, compare, order, absolute value
GEN.g6_intns=()=>{
  const t=rng(0,4);
  if(t===0){const a=-rng(1,20);
    return mcq('Absolute Value','6.NS.2',`What is |${a}|  (the absolute value of ${a})?`,
      [String(-a),String(a),'0',String(2*a)],String(-a),
      `Absolute value is the DISTANCE from zero, always positive. |${a}| = ${-a}.`,
      `Absolute value = how far the number is from 0 on a number line. Distance is never negative.`);}
  if(t===1){let a=rng(-15,15),b=rng(-15,15);while(a===b)b=rng(-15,15);
    return mcq('Compare Integers','6.NS.2',`Which symbol makes this true?   ${a} ___ ${b}`,
      ['<','>','='],a<b?'<':'>',
      `On a number line, ${a} is to the ${a<b?'LEFT':'RIGHT'} of ${b}, so ${a} ${a<b?'<':'>'} ${b}.`,
      `On a number line, numbers farther LEFT are smaller. Negatives are less than positives.`);}
  if(t===2){const nums=[-rng(1,9),rng(1,9),-rng(10,18),rng(10,18)];
    const sorted=[...nums].sort((x,y)=>x-y);
    return mcq('Order Integers','6.NS.2',`Order from LEAST to GREATEST:  ${shuf(nums).join(', ')}`,
      [sorted.join(', '),[...sorted].reverse().join(', '),nums.join(', ')],sorted.join(', '),
      `Left-to-right on a number line: ${sorted.join(' < ')}.`,
      `The most negative number is the smallest. Picture a number line.`);}
  if(t===3){const ctx=pick([
      ['a debt of $%d','−%d',8,25],['%d degrees below zero','−%d',3,15],
      ['%d feet below sea level','−%d',10,50],['a gain of %d yards','+%d',3,15]]);
    const v=rng(ctx[2],ctx[3]);
    const phrase=ctx[0].replace('%d',v);const ans=ctx[1].replace('%d',v);
    return mcq('Integers in Context','6.NS.2',`Which integer represents "${phrase}"?`,
      [ans,ans.startsWith('−')?`+${v}`:`−${v}`,'0',ans.startsWith('−')?`−${v+1}`:`+${v+1}`],ans,
      `"${phrase}" is represented by ${ans}.`,
      `Below, loss, and debt are NEGATIVE. Above, gain, and profit are POSITIVE.`);}
  const a=-rng(2,12);
  return mcq('Opposites','6.NS.2',`What is the OPPOSITE of ${a}?`,
    [String(-a),String(a),'0',String(a-1)],String(-a),
    `The opposite of a number is the same distance from 0 on the other side: the opposite of ${a} is ${-a}.`,
    `Opposites are the same distance from zero but on opposite sides.`);
};

// 6.MG.1 — Circles: radius, diameter, circumference, area (use π ≈ 3.14)
GEN.g6_circle=()=>{
  const t=rng(0,4);
  if(t===0){const r=rng(2,12);
    return mcq('Radius & Diameter','6.MG.1',`A circle has a radius of ${r} cm. What is its DIAMETER?`,
      [`${2*r} cm`,`${r} cm`,`${r*r} cm`,`${r+2} cm`],`${2*r} cm`,
      `Diameter = 2 × radius = 2 × ${r} = ${2*r} cm.`,
      `The diameter goes all the way across — it's twice the radius.`);}
  if(t===1){const d=rng(4,24);
    return mcq('Diameter & Radius','6.MG.1',`A circle has a diameter of ${d} cm. What is its RADIUS?`,
      [`${d/2} cm`,`${d} cm`,`${2*d} cm`,`${d/2+1} cm`],`${d/2} cm`,
      `Radius = diameter ÷ 2 = ${d} ÷ 2 = ${d/2} cm.`,
      `The radius is half the diameter (center to edge).`);}
  if(t===2){const r=rng(2,10);const d=2*r;const c=(3.14*d).toFixed(2);
    return mcq('Circumference','6.MG.1',`Find the CIRCUMFERENCE of a circle with radius ${r} cm. (Use π ≈ 3.14)`,
      [`${c} cm`,`${(3.14*r).toFixed(2)} cm`,`${(3.14*r*r).toFixed(2)} cm`,`${d} cm`],`${c} cm`,
      `C = π × d = 3.14 × ${d} = ${c} cm. (The diameter is 2 × ${r} = ${d}.)`,
      `Circumference = π × diameter. Remember diameter = 2 × radius.`);}
  if(t===3){const r=rng(2,10);const a=(3.14*r*r).toFixed(2);
    return mcq('Area of a Circle','6.MG.1',`Find the AREA of a circle with radius ${r} cm. (Use π ≈ 3.14)`,
      [`${a} cm²`,`${(3.14*2*r).toFixed(2)} cm²`,`${(3.14*r).toFixed(2)} cm²`,`${r*r} cm²`],`${a} cm²`,
      `A = π × r² = 3.14 × ${r}² = 3.14 × ${r*r} = ${a} cm².`,
      `Area = π × radius². Square the radius FIRST, then multiply by π.`);}
  const parts=[['chord','a segment whose endpoints are both on the circle'],
    ['diameter','a chord that passes through the center'],
    ['radius','a segment from the center to a point on the circle'],
    ['circumference','the distance around the circle']];
  const p=pick(parts);
  return mcq('Parts of a Circle','6.MG.1',`Which part of a circle is ${p[1]}?`,
    ['Chord','Diameter','Radius','Circumference'],p[0].charAt(0).toUpperCase()+p[0].slice(1),
    `A ${p[0]} is ${p[1]}.`,
    `Think about where the segment starts and ends relative to the center.`);
};

// 6.MG.4 — Congruence of segments, angles, polygons
GEN.g6_congr=()=>{
  const t=rng(0,3);
  if(t===0)return mcq('Congruence','6.MG.4',`Two figures are CONGRUENT when they have...`,
    ['The same size and the same shape','The same shape but different sizes','The same color','The same area only'],
    'The same size and the same shape',
    `Congruent figures match exactly — same size AND same shape.`,
    `Congruent means you could lay one exactly on top of the other.`);
  if(t===1){const n=pick([[3,'triangle'],[4,'square'],[5,'pentagon'],[6,'hexagon'],[8,'octagon']]);
    return mcq('Regular Polygons','6.MG.4',`A regular ${n[1]} has how many lines of symmetry?`,
      [String(n[0]),String(n[0]+1),String(n[0]-1),'2'],String(n[0]),
      `A regular ${n[1]} has ${n[0]} sides, and a regular polygon has as many lines of symmetry as sides: ${n[0]}.`,
      `A REGULAR polygon has one line of symmetry for each side.`);}
  if(t===2){const s=rng(3,12);
    return mcq('Congruent Segments','6.MG.4',`Segment AB is ${s} cm long. If segment CD is congruent to AB, how long is CD?`,
      [`${s} cm`,`${2*s} cm`,`${s/2} cm`,`${s+1} cm`],`${s} cm`,
      `Congruent segments have EQUAL length, so CD = ${s} cm.`,
      `Congruent segments are exactly the same length.`);}
  const ang=rng(30,150);
  return mcq('Congruent Angles','6.MG.4',`Angle P measures ${ang}°. Angle Q is congruent to angle P. What is the measure of angle Q?`,
    [`${ang}°`,`${180-ang}°`,`${ang+10}°`,`${ang/2}°`],`${ang}°`,
    `Congruent angles have EQUAL measures, so angle Q = ${ang}°.`,
    `Congruent angles are exactly equal in measure.`);
};

// 6.PS.1 — Circle graphs / data cycle
GEN.g6_circgraph=()=>{
  const t=rng(0,2);
  const cats=pick([['Soccer','Basketball','Tennis','Swimming'],['Pizza','Tacos','Pasta','Salad'],
    ['Reading','Gaming','Sports','Music'],['Dogs','Cats','Birds','Fish']]);
  // percentages that sum to 100
  const p1=pick([25,50,20,40]);const rest=100-p1;
  const p2=Math.round(rest/2/5)*5;const p3=Math.round((rest-p2)/2/5)*5;const p4=rest-p2-p3;
  if(p4<5||p3<5||p2<5)return GEN.g6_circgraph();
  const data=[[cats[0],p1],[cats[1],p2],[cats[2],p3],[cats[3],p4]];
  const dataStr=data.map(d=>`${d[0]} ${d[1]}%`).join(', ');
  if(t===0){const mx=data.reduce((a,b)=>b[1]>a[1]?b:a);
    return mcq('Read a Circle Graph','6.PS.1',`A circle graph shows: ${dataStr}. Which category is the LARGEST?`,
      cats,mx[0],`${mx[0]} has the biggest slice at ${mx[1]}%.`,
      `The biggest percentage takes up the biggest slice of the circle.`);}
  if(t===1){const total=rng(4,10)*20;const cat=data[0];const count=total*cat[1]/100;
    return mcq('Circle Graph Values','6.PS.1',`In a survey of ${total} people, the circle graph shows ${cat[0]} = ${cat[1]}%. How many people chose ${cat[0]}?`,
      [count,count+total/10,count-5,cat[1]],count,
      `${cat[1]}% of ${total} = ${cat[1]/100} × ${total} = ${count} people.`,
      `Turn the percent into a decimal, then multiply by the total number of people.`);}
  const sum=data[0][1]+data[1][1];
  return mcq('Circle Graph Totals','6.PS.1',`A circle graph shows: ${dataStr}. Together, what percent chose ${cats[0]} or ${cats[1]}?`,
    [`${sum}%`,`${sum+5}%`,`${100-sum}%`,`${sum-10}%`],`${sum}%`,
    `Add the two slices: ${data[0][1]}% + ${data[1][1]}% = ${sum}%.`,
    `Add the two percentages together. (A full circle is always 100%.)`);
};

// 6.PFA.4 — Inequalities on a number line
GEN.g6_ineq=()=>{
  const t=rng(0,3);const v=rng(1,12);
  if(t===0){const sym=pick(['>','<','≥','≤']);
    const desc={'>':'greater than','<':'less than','≥':'greater than or equal to','≤':'less than or equal to'}[sym];
    return mcq('Inequality Symbols','6.PFA.4',`Which symbol means "${desc}"?`,
      ['>','<','≥','≤'],sym,`"${desc}" is written as ${sym}.`,
      `"or equal to" adds a line under the symbol (≥ or ≤).`);}
  if(t===1){const sym=pick(['>','<','≥','≤']);
    const phrase={'>':`more than ${v}`,'<':`fewer than ${v}`,'≥':`at least ${v}`,'≤':`at most ${v}`}[sym];
    return mcq('Write an Inequality','6.PFA.4',`You must be "${phrase}" to enter. Which inequality shows the allowed values of x?`,
      [`x ${sym} ${v}`,`x ${sym==='>'?'<':sym==='<'?'>':sym==='≥'?'≤':'≥'} ${v}`,`x = ${v}`,`x ${sym} ${v+1}`],`x ${sym} ${v}`,
      `"${phrase}" translates to x ${sym} ${v}.`,
      `"At least" means ≥. "At most" means ≤. "More than" means >. "Fewer than" means <.`);}
  if(t===2){const sym=pick(['>','≥']);
    return mcq('Solutions to Inequalities','6.PFA.4',`Which value is a SOLUTION to  x ${sym} ${v}?`,
      [String(v+rng(1,5)),String(v-rng(1,5)),String(v-rng(6,10)),'0'],String(v+rng(1,5)),
      `x ${sym} ${v} means x must be ${sym==='≥'?'at least':'greater than'} ${v}. Only a value above ${v} works.`,
      `Test each number: does it make x ${sym} ${v} true?`);}
  const sym=pick(['<','≤']);
  return mcq('Solutions to Inequalities','6.PFA.4',`Which value is a SOLUTION to  x ${sym} ${v}?`,
    [String(v-rng(1,Math.max(1,v-1))),String(v+rng(1,5)),String(v+rng(6,10)),String(v+20)],String(v-rng(1,Math.max(1,v-1))),
    `x ${sym} ${v} means x must be ${sym==='≤'?'at most':'less than'} ${v}. Only a value below ${v} works.`,
    `Test each number: does it make x ${sym} ${v} true?`);
};

// Update strandCode map so reading/science tags stay correct (unchanged codes)


