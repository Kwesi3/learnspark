// ═══════════════════════════════════════════════════════════════
// GRADE 5 — skills, lessons, math questions (2023 Math SOL, 2018 Science SOL,
// 2023 History SOL: U.S. History to 1865, 2024 English SOL)
// ═══════════════════════════════════════════════════════════════
LEVELS.splice(0,LEVELS.length,[1,'Grade 1','Elementary'],[2,'Grade 2','Elementary'],[3,'Grade 3','Elementary'],[4,'Grade 4','Elementary · Virginia Studies'],[5,'Grade 5','Elementary · U.S. History to 1865'],[6,'Grade 6','Middle school'],[7,'Grade 7','Middle school'],[8,'Grade 8','Middle school']);
LEVEL_IDS.splice(0,LEVEL_IDS.length,...LEVELS.map(l=>l[0]));
normGrade=function(g){g=+g||4;return g>=8?8:g<=1?1:Math.round(g);};
(function(){
const S=(code,name,desc,gen)=>({code,name,desc,gen});
STRANDS[5]={
 math:[S('5.NS.1','Fractions & Decimals','Equivalence; compare & order','g5_ns1'),S('5.NS.2','Prime & Composite','Factors & prime factorization','g5_ns2'),
  S('5.CE.1','Whole Number Problems','Multistep problems, all four operations','g5_ce1'),S('5.CE.2','Fraction Operations','Add, subtract & multiply by a whole number','g5_ce2'),
  S('5.CE.3','Decimal Operations','Add, subtract, multiply & divide decimals','g5_ce3'),S('5.CE.4','Order of Operations','Simplify numerical expressions','g5_ce4'),
  S('5.MG.1','Metric Measurement','Length, mass & liquid volume','g5_mg1'),S('5.MG.2','Perimeter, Area & Volume','Rectangles, right triangles & prisms','g5_mg2'),
  S('5.MG.3','Angles & Triangles','Classify, measure & find missing angles','g5_mg3'),S('5.PS.1','Line Plots & Stem-and-Leaf','Read & build data displays','g5_ps1'),
  S('5.PS.2','Mean, Median, Mode & Range','Measures of center in context','g5_ps2'),S('5.PS.3','Probability','Sample spaces & counting','g5_ps3'),
  S('5.PFA.1','Patterns','Whole number, fraction & decimal patterns','g5_pfa1'),S('5.PFA.2','Variables','Expressions & equations in context','g5_pfa2')],
 read:[S('5.RV','Vocabulary','Roots, affixes, context & figurative language','r5_rv'),S('5.RL','Literary Texts','Theme, character, plot & point of view','r5_rl'),S('5.RI','Informational Texts','Main idea, structure & evidence','r5_ri')],
 sci:[S('5.2','Forms of Energy','Energy can take many forms','sc5_2'),S('5.3','Force & Moving Objects','Force, mass & motion','sc5_3'),S('5.4','Electricity & Magnetism','Circuits, static electricity & electromagnets','sc5_4'),
  S('5.5','Sound','Vibrations, waves & uses of sound','sc5_5'),S('5.6','Light','Reflection, refraction & the spectrum','sc5_6'),S('5.7','Matter','Atoms, mixtures & changes of state','sc5_7'),
  S('5.8','Earth’s Changing Surface','Rocks, plates, weathering & fossils','sc5_8'),S('5.9','Conserving Energy','Energy resources & conservation','sc5_9')],
 write:[S('5.W','Writing','Narrative, opinion & informative writing','w5_w'),S('5.LU','Language Usage','Grammar, punctuation & spelling','w5_lu')],
 hist:[S('USI.1','Geography of North America','Regions, water features, states & capitals','usi1'),S('USI.2','Early Cultures','Archaeology & Indigenous Peoples','usi2'),
  S('USI.3','Exploration','European explorers & interactions','usi3'),S('USI.4','West Africa','West African societies & the slave trade','usi4'),
  S('USI.5','Colonial America','New England, Mid-Atlantic & Southern colonies','usi5'),S('USI.6','The American Revolution','Causes, leaders & key battles','usi6'),
  S('USI.7','A New Nation','Articles, Constitution & first presidents','usi7'),S('USI.8','Westward Expansion & Reform','1801–1861: growth & reform','usi8'),
  S('USI.9','The Civil War','Causes, leaders, battles & effects','usi9'),S('USI Skills','History Skills','Sources, maps, timelines & cause and effect','usi_sk')],
};
HIST_STRANDS[5]=STRANDS[5].hist;
Object.assign(LESSONS,{
 g5_ns1:['Fractions and decimals can name the same amount: 1/4 = 0.25, 3/5 = 0.6.','To compare, change both to decimals (or both to fractions with the same denominator).','Line up the decimal points and compare place by place.'],
 g5_ns2:['A prime number has exactly two factors: 1 and itself.','A composite number has more than two factors.','Prime factorization writes a number as a product of primes: 12 = 2 × 2 × 3.'],
 g5_ce1:['Read carefully: which operation does each step need?','Estimate first, then check that your answer is reasonable.','In division, decide what to do with the remainder.'],
 g5_ce2:['Same denominators: add or subtract the numerators.','Unlike denominators: find a common denominator first.','Whole number × fraction: multiply the whole number by the numerator.'],
 g5_ce3:['Line up decimal points to add or subtract.','When multiplying, count the decimal places in the factors.','When dividing, place the decimal point straight up in the quotient.'],
 g5_ce4:['Order of operations: Parentheses, then multiply and divide left to right, then add and subtract left to right.'],
 g5_mg1:['1 km = 1,000 m; 1 m = 100 cm; 1 cm = 10 mm.','1 kg = 1,000 g; 1 L = 1,000 mL.','To change a larger unit to a smaller one, multiply.'],
 g5_mg2:['Perimeter is the distance around. Area is square units inside.','Area of a right triangle = ½ × base × height.','Volume of a rectangular prism = length × width × height (cubic units).'],
 g5_mg3:['Acute < 90°, right = 90°, obtuse > 90°.','The angles of a triangle add to 180°.','Triangles by sides: equilateral, isosceles, scalene.'],
 g5_ps1:['In a stem-and-leaf plot, the stem is the tens and the leaf is the ones: 3 | 7 means 37.','In a line plot, each X stands for one data value.'],
 g5_ps2:['Mean: add and divide. Median: middle value in order. Mode: most often. Range: greatest − least.'],
 g5_ps3:['A sample space lists every possible outcome.','Fundamental Counting Principle: multiply the number of choices at each step.'],
 g5_pfa1:['Find the rule: how does each term change?','Patterns can use whole numbers, fractions, or decimals.'],
 g5_pfa2:['A variable is a letter that stands for an unknown number.','Write an equation to match the story, then solve.'],
 r5_rv:['Use roots and affixes: “bio” = life, “-ology” = study of.','Context clues: definitions, examples, and contrasts nearby.','Figurative language: similes, metaphors, personification, idioms.'],
 r5_rl:['Theme is the message about life, shown through what characters do and learn.','Point of view: first person (I) or third person (he, she, they).'],
 r5_ri:['The main idea is supported by key details.','Text structures: sequence, compare/contrast, cause/effect, problem/solution.'],
 w5_w:['Opinion writing: state a claim and give reasons with evidence.','Narratives use dialogue, description, and a clear sequence.','Informative writing groups related facts under topics.'],
 w5_lu:['Use commas after introductory words and in a series.','Make subjects and verbs agree.','Use quotation marks around exact words.'],
 sc5_2:['Energy forms include mechanical, sound, light, electrical, chemical, and thermal.','Energy can change from one form to another.'],
 sc5_3:['A force is a push or pull.','More mass needs more force to move the same amount.','Moving objects have kinetic energy.'],
 sc5_4:['Current electricity flows in a closed circuit.','Static electricity is a buildup of charge.','An electromagnet is a coil of wire around iron with current flowing.'],
 sc5_5:['Sound is made by vibrations and travels as waves.','Sound travels fastest through solids and cannot travel through empty space.','Pitch depends on frequency; volume depends on amplitude.'],
 sc5_6:['Light travels in straight lines as waves.','Light can be reflected, refracted, or absorbed.','White light is made of the visible spectrum: red, orange, yellow, green, blue, indigo, violet.'],
 sc5_7:['All matter is made of atoms.','Matter can be a solid, liquid, or gas.','Mixtures can be separated; solutions are mixtures where one substance dissolves.'],
 sc5_8:['The rock cycle: igneous, sedimentary, metamorphic.','Earth’s plates move slowly, causing earthquakes and volcanoes.','Weathering breaks rock; erosion moves it.'],
 sc5_9:['Renewable resources can be replaced; nonrenewable ones run out.','Conserving energy saves resources and money.'],
 usi1:['North America has coastal plains, mountains, plateaus, and a large interior plain.','Major waters: the Mississippi River, the Great Lakes, the Atlantic and Pacific oceans.'],
 usi2:['Archaeologists study artifacts to learn about the past.','Indigenous Peoples adapted to their environments across North America.'],
 usi3:['Spain, France, Portugal, and England explored the Americas for wealth, land, and faith.','Exploration brought both cooperation and conflict.'],
 usi4:['West African kingdoms like Ghana, Mali, and Songhai grew rich from trade.','Millions of Africans were forced across the Atlantic in the Transatlantic Slave Trade.'],
 usi5:['New England, the Mid-Atlantic, and the Southern colonies had different economies.','Geography shaped how people lived and worked.'],
 usi6:['Taxes without representation angered colonists.','The Declaration of Independence (1776) explained why the colonies broke away.','The war ended with victory at Yorktown (1781).'],
 usi7:['The Articles of Confederation created a weak national government.','The Constitution (1787) set up three branches.','The first five presidents: Washington, Adams, Jefferson, Madison, Monroe.'],
 usi8:['The Louisiana Purchase (1803) doubled the nation’s size.','Reform movements worked to end slavery and gain women’s rights.'],
 usi9:['Disagreements over slavery and states’ rights led to the Civil War (1861–1865).','Lincoln led the Union; the war ended at Appomattox in 1865.'],
 usi_sk:['Primary sources come from the time; secondary sources come later.','Use timelines to sequence events.'],
});
HIST_EVENTS[5]=[[1492,'Columbus reaches the Americas'],[1607,'Jamestown is founded'],[1619,'First Africans arrive in English Virginia'],[1620,'Pilgrims land at Plymouth'],[1754,'French and Indian War begins'],[1776,'Declaration of Independence'],[1781,'Victory at Yorktown'],[1787,'Constitution is written'],[1803,'Louisiana Purchase'],[1848,'Seneca Falls Convention'],[1861,'Civil War begins'],[1865,'Lee surrenders at Appomattox']];
WHO[5]=[['Harriet Tubman',['I escaped slavery.','I led others to freedom on the Underground Railroad.','I was called “Moses.”']],
 ['Benjamin Franklin',['I was a printer and inventor.','I helped write the Declaration of Independence.','I got help from France during the Revolution.']],
 ['Frederick Douglass',['I escaped slavery.','I wrote and spoke against slavery.','I published a newspaper called The North Star.']],
 ['Mansa Musa',['I ruled Mali.','I made a famous journey to Mecca.','I was known for my great wealth in gold.']],
 ['Abraham Lincoln',['I was president during the Civil War.','I issued the Emancipation Proclamation.','I gave the Gettysburg Address.']],
 ['Sacagawea',['I was a Shoshone woman.','I guided Lewis and Clark.','I helped them trade for horses.']]];
if(typeof WORD_BANK!=='undefined')WORD_BANK[5]=WORD_BANK[5]||(WORD_BANK[4]||[]).concat(WORD_BANK[6]||[]);
SUBJ_GRADE[5]={hist:['U.S. History to 1865','Early cultures through the Civil War.']};
Object.assign(SK_ART,{
 'math:5.NS.1':'m_dec','math:5.NS.2':'m_squares','math:5.CE.1':'m_ops','math:5.CE.2':'m_frac','math:5.CE.3':'m_dec','math:5.CE.4':'m_eq','math:5.MG.1':'m_measure','math:5.MG.2':'m_volume',
 'math:5.MG.3':'m_geo','math:5.PS.1':'m_data','math:5.PS.2':'m_data','math:5.PS.3':'m_prob','math:5.PFA.1':'m_pattern','math:5.PFA.2':'m_eq',
 'read:5.RV':'r_vocab','read:5.RL':'r_fiction','read:5.RI':'r_nonfic','write:5.W':'w_argue','write:5.LU':'w_edit',
 'sci:5.2':'s_energy','sci:5.3':'s_force','sci:5.4':'s_elec','sci:5.5':'s_waves','sci:5.6':'s_light','sci:5.7':'s_matter','sci:5.8':'s_resources','sci:5.9':'s_resources',
 'hist:USI.1':'h_geo','hist:USI.2':'h_native','hist:USI.3':'h_jamestown','hist:USI.4':'h_mali','hist:USI.5':'h_colonial','hist:USI.6':'h_revolution','hist:USI.7':'h_nation','hist:USI.8':'h_west','hist:USI.9':'h_civilwar','hist:USI Skills':'h_skills'});

// ── Grade 5 math ──
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy','Raj','Ana','Kofi','Grace','Yaw','Ama','Diego','Priya'];
const gcd=(a,b)=>b?gcd(b,a%b):a;const fr=(n,d)=>{const g=gcd(n,d);return d/g===1?String(n/g):`${n/g}/${d/g}`;};
const mix=(n,d)=>{const w=Math.floor(n/d),r=n%d;return w?(r?`${w} ${fr(r,d)}`:String(w)):fr(r,d);};
const c=n=>n.toLocaleString('en-US');const r3=x=>Math.round(x*1000)/1000;const ds=x=>String(r3(x));
const BENCH=[[1,2,0.5],[1,4,0.25],[3,4,0.75],[1,5,0.2],[2,5,0.4],[3,5,0.6],[4,5,0.8],[1,8,0.125],[3,8,0.375],[5,8,0.625],[7,8,0.875],[1,10,0.1],[3,10,0.3],[7,10,0.7],[9,10,0.9],[1,20,0.05],[3,20,0.15],[1,25,0.04],[7,25,0.28]];
const factors=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f;};
const isPrime=n=>n>1&&factors(n).length===2;
const pfac=n=>{const f=[];let m=n;for(let p=2;p<=m;p++)while(m%p===0){f.push(p);m/=p;}return f;};
// 5.NS.1
addGens('g5_ns1',[
 ()=>{const b=pick(BENCH);return mq('g5_ns1',`Write ${b[0]}/${b[1]} as a decimal.`,ds(b[2]),[ds(b[0]/10),`${b[0]}.${b[1]}`,ds(b[2]*10)],`${b[0]} ÷ ${b[1]} = ${ds(b[2])}.`,'Divide the numerator by the denominator.');},
 ()=>{const b=pick(BENCH);return mq('g5_ns1',`Which fraction is equal to ${ds(b[2])}?`,`${b[0]}/${b[1]}`,[`${b[1]}/${b[0]}`,`1/${b[1]+1}`,`${b[0]+1}/${b[1]}`],`${ds(b[2])} = ${b[0]}/${b[1]}.`,'Read the decimal as a fraction, then simplify.');},
 ()=>{const b=pick(BENCH);let d=r3(b[2]+pick([-0.05,0.05,-0.1,0.1,-0.01,0.01]));if(d<=0)d=r3(b[2]+0.05);const s=b[2]>d?'>':'<';return mq('g5_ns1',`Which symbol makes this true? ${b[0]}/${b[1]} ___ ${ds(d)}`,s,['>','<','='].filter(x=>x!==s),`${b[0]}/${b[1]} = ${ds(b[2])}, which is ${s==='>'?'greater':'less'} than ${ds(d)}.`,'Change the fraction to a decimal.');},
 ()=>{const v=[r3(rng(100,999)/1000),r3(rng(10,99)/100),r3(rng(1,9)/10)];while(new Set(v).size<3){v[0]=r3(rng(100,999)/1000);v[1]=r3(rng(10,99)/100);}const s=v.slice().sort((a,b)=>a-b).map(ds);return mq('g5_ns1',`Order from least to greatest: ${shuf(v.map(ds)).join(', ')}`,s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2]].join(', '),[s[0],s[2],s[1]].join(', ')],'Write each with three decimal places, then compare.','Add zeros so all have thousandths.');},
]);
addGens('g5_ns1',[
 ()=>{const p=shuf(BENCH).slice(0,2);const d=r3(rng(20,95)/100);const items=[[`${p[0][0]}/${p[0][1]}`,p[0][2]],[`${p[1][0]}/${p[1][1]}`,p[1][2]],[ds(d),d],[ds(r3(d+0.015)),r3(d+0.015)]];if(new Set(items.map(x=>x[1])).size<4)return mq('g5_ns1','Which is greatest: 0.6, 5/8, or 0.59?','5/8',['0.6','0.59'],'5/8 = 0.625.','Change to decimals.');const s=items.slice().sort((a,b)=>a[1]-b[1]).map(x=>x[0]);return mq('g5_ns1',`Order from least to greatest: ${shuf(items.map(x=>x[0])).join(', ')}`,s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2],s[3]].join(', '),[s[0],s[1],s[3],s[2]].join(', ')],`As decimals: ${items.map(x=>x[0]+' = '+ds(x[1])).join(', ')}.`,'Change every number to a decimal.');},
 ()=>{const b=pick(BENCH.filter(x=>x[1]<=10));const lo=Math.floor(b[2]*10+1e-9)/10;return mq('g5_ns1',`On a number line, ${b[0]}/${b[1]} is between which two tenths?`,Math.abs(Math.round(b[2]*10)-b[2]*10)<1e-9?`It is exactly ${ds(b[2])}.`:`${ds(lo)} and ${ds(r3(lo+0.1))}`,[`${ds(r3(lo+0.1))} and ${ds(r3(lo+0.2))}`,`${ds(r3(Math.max(0,lo-0.1)))} and ${ds(lo)}`,`${b[0]} and ${b[1]}`],`${b[0]}/${b[1]} = ${ds(b[2])}.`,'Change to a decimal first.');},
 ()=>{const n=rng(1,24),d=25;const v=n/d;return mq('g5_ns1',`${pick(NAMES)} answered ${n} of ${d} questions correctly. Write this as a decimal.`,ds(v),[ds(n/100),ds(r3(n/10)),String(n)+'.'+d],`${n}/25 = ${n*4}/100 = ${ds(v)}.`,'Make the denominator 100.');},
],true);
// 5.NS.2
addGens('g5_ns2',[
 ()=>{const n=rng(2,99);const p=isPrime(n);return mq('g5_ns2',`Is ${n} prime or composite?`,p?'prime':'composite',[p?'composite':'prime','neither'],p?`${n} has only two factors: 1 and ${n}.`:`${n} has factors ${factors(n).join(', ')}.`,'Try dividing by 2, 3, 5, and 7.');},
 ()=>{const ps=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];const p=pick(ps);const cs=shuf([4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,27,28,30,33,35,39,49,51,57,91]).slice(0,3);return mq('g5_ns2',`Which number is prime?`,p,cs,`${p} has exactly two factors.`,'A prime has only 1 and itself as factors.');},
 ()=>{const n=pick([12,16,18,20,24,28,30,36,40,42,45,48]);const f=factors(n);return mq('g5_ns2',`How many factors does ${n} have?`,f.length,[f.length-1,f.length+1,f.length+2],`Factors of ${n}: ${f.join(', ')}.`,'List factor pairs.');},
 ()=>{const n=pick([1,0]);return mq('g5_ns2',`Is ${n} prime, composite, or neither?`,'neither',['prime','composite'],`${n} is neither prime nor composite.`,'Primes have exactly two factors.');},
]);
addGens('g5_ns2',[
 ()=>{const n=pick([12,18,20,24,28,30,36,40,42,44,45,48,50,52,54,56,60,63,66,70,72,75,80,84,90,96,98,100]);const f=pfac(n);const wrong1=f.slice();wrong1[wrong1.length-1]=wrong1[wrong1.length-1]*2;return mq('g5_ns2',`What is the prime factorization of ${n}?`,f.join(' × '),[[f[0],n/f[0]].join(' × '),f.slice(1).join(' × ')+(f.length>2?'':' × 1'),wrong1.join(' × ')].filter(x=>x!==f.join(' × ')),`${n} = ${f.join(' × ')}. Every factor is prime.`,'Keep dividing by primes until every factor is prime.');},
 ()=>{const n=pick([21,35,39,51,57,65,77,85,87,91,93,95]);return mq('g5_ns2',`${n} looks like it might be prime. Is it?`,`No — ${n} = ${pfac(n).join(' × ')}.`,['Yes — it is odd.','Yes — it does not end in 5.','Yes — it is greater than 20.'],`${n} = ${pfac(n).join(' × ')}, so it is composite.`,'Odd numbers can still be composite. Try 3, 7, 13.');},
 ()=>{const n=pick([30,42,60,66,70,78,84,90]);const pf=[...new Set(pfac(n))];return mq('g5_ns2',`How many DIFFERENT prime factors does ${n} have?`,pf.length,[pf.length+1,pf.length-1,pfac(n).length+1].filter(x=>x>0),`${n} = ${pfac(n).join(' × ')}. Different primes: ${pf.join(', ')}.`,'Find the prime factorization first.');},
],true);
// 5.CE.1
addGens('g5_ce1',[
 ()=>{const a=rng(120,899),b=rng(12,48);return mq('g5_ce1',`${c(a)} × ${b} = ?`,c(a*b),[c(a*b+a),c(a*b-10*b),c(a*(b+10))],`${a} × ${b} = ${c(a*b)}.`,'Multiply by the ones, then the tens, and add.');},
 ()=>{const q=rng(12,85),d=rng(12,35);return mq('g5_ce1',`${c(q*d)} ÷ ${d} = ?`,q,[q+1,q-1,q+10],`${d} × ${q} = ${c(q*d)}.`,'Estimate first: how many ${d}s fit?'.replace('${d}',d));},
 ()=>{const n=pick(NAMES),p=rng(12,45),k=rng(15,40);return mq('g5_ce1',`A school buys ${k} boxes of markers. Each box costs $${p}. What is the total cost?`,`$${c(p*k)}`,[`$${c(p+k)}`,`$${c(p*k+p)}`,`$${c(p*(k-10))}`],`${k} × $${p} = $${c(p*k)}.`,'Equal groups: multiply.');},
 ()=>{const a=rng(1200,5800),b=rng(300,1900);return mq('g5_ce1',`Estimate ${c(a)} + ${c(b)} by rounding each to the nearest hundred.`,c(Math.round(a/100)*100+Math.round(b/100)*100),[c(Math.round(a/1000)*1000+Math.round(b/1000)*1000),c(a+b),c(Math.round(a/100)*100+Math.round(b/100)*100+100)],`${c(Math.round(a/100)*100)} + ${c(Math.round(b/100)*100)}.`,'Round first, then add.');},
]);
addGens('g5_ce1',[
 ()=>{const per=rng(24,48),n=rng(300,900);const full=Math.floor(n/per),r=n%per;if(!r)return mq('g5_ce1',`${n} students are going on a trip. Each bus holds ${per}. How many buses?`,full,[full+1,full-1,per],`${n} ÷ ${per} = ${full}.`,'Divide.');return mq('g5_ce1',`${n} students are going on a trip. Each bus holds ${per}. How many buses are needed?`,full+1,[full,full+2,r],`${n} ÷ ${per} = ${full} R ${r}. The ${r} extra students need one more bus.`,'Think about the remainder.');},
 ()=>{const t=rng(4,8)*25,a=rng(12,30),b=rng(5,15),k=rng(3,6);return mq('g5_ce1',`${pick(NAMES)} has $${t}. They buy a jacket for $${a*2} and ${k} shirts at $${b} each. How much money is left?`,`$${t-a*2-k*b}`,[`$${t-a*2-b}`,`$${t-a*2+k*b}`,`$${t-(a*2+k)*b}`].filter(x=>!x.includes('-')),`$${a*2} + ${k} × $${b} = $${a*2+k*b}. $${t} − $${a*2+k*b} = $${t-a*2-k*b}.`,'Find the total spent first.');},
 ()=>{const rows=rng(14,28),cols=rng(12,25),broken=rng(15,60),boxes=rng(4,8);const good=rows*cols-broken;const each=Math.floor(good/boxes);return mq('g5_ce1',`A farm packs ${rows} rows of ${cols} eggs. ${broken} break. The rest are split equally into ${boxes} crates. How many full eggs per crate (ignore leftovers)?`,each,[Math.floor(rows*cols/boxes),each+1,good],`${rows} × ${cols} = ${rows*cols}. − ${broken} = ${good}. ÷ ${boxes} = ${each} R ${good%boxes}.`,'Three steps: multiply, subtract, divide.');},
],true);
// 5.CE.2
addGens('g5_ce2',[
 ()=>{const d=pick([6,8,10,12]),a=rng(1,d-2),b=rng(1,d-1-a);return mq('g5_ce2',`${a}/${d} + ${b}/${d} = ?`,fr(a+b,d),[`${a+b}/${2*d}`,fr(a*b||1,d),fr(a+b+1,d)],`${a} + ${b} = ${a+b}, so ${a+b}/${d}${gcd(a+b,d)>1?' = '+fr(a+b,d):''}.`,'Add numerators; keep the denominator.');},
 ()=>{const p=pick([[1,2,1,4],[1,3,1,6],[3,4,1,8],[2,3,1,6],[1,2,3,10],[2,5,1,10],[5,6,1,3],[3,4,1,2]]);const L=p[1]*p[3]/gcd(p[1],p[3]);const s=p[0]*L/p[1]+p[2]*L/p[3];return mq('g5_ce2',`${p[0]}/${p[1]} + ${p[2]}/${p[3]} = ?`,mix(s,L),[`${p[0]+p[2]}/${p[1]+p[3]}`,mix(s+1,L),`${p[0]+p[2]}/${L}`],`Use denominator ${L}: ${p[0]*L/p[1]}/${L} + ${p[2]*L/p[3]}/${L} = ${mix(s,L)}.`,'Find a common denominator.');},
 ()=>{const p=pick([[3,4,1,8],[5,6,1,3],[7,10,1,2],[2,3,1,6],[1,2,1,8],[4,5,3,10]]);const L=p[1]*p[3]/gcd(p[1],p[3]);const s=p[0]*L/p[1]-p[2]*L/p[3];return mq('g5_ce2',`${p[0]}/${p[1]} − ${p[2]}/${p[3]} = ?`,fr(s,L),[`${p[0]-p[2]}/${Math.abs(p[1]-p[3])||1}`,fr(s+1,L),`${p[0]-p[2]}/${L}`],`${p[0]*L/p[1]}/${L} − ${p[2]*L/p[3]}/${L} = ${fr(s,L)}.`,'Make the denominators match first.');},
 ()=>{const w=rng(2,9),p=pick([[1,2],[1,3],[2,3],[3,4],[2,5],[3,8]]);return mq('g5_ce2',`${w} × ${p[0]}/${p[1]} = ?`,mix(w*p[0],p[1]),[`${w*p[0]}/${w*p[1]}`,mix(w+p[0],p[1]),`${p[0]}/${w*p[1]}`],`${w} × ${p[0]} = ${w*p[0]}, so ${w*p[0]}/${p[1]} = ${mix(w*p[0],p[1])}.`,'Multiply the whole number by the numerator.');},
]);
addGens('g5_ce2',[
 ()=>{const d=pick([[4,8],[3,6],[2,4],[5,10]]);const w1=rng(2,5),n1=rng(1,d[0]-1),w2=rng(1,w1-1),n2=rng(1,d[1]-1);const L=d[1];const a=(w1*d[0]+n1)*L/d[0],b=w2*L+n2;if(a<=b)return mq('g5_ce2','3 1/4 − 1 3/8 = ?','1 7/8',['2 2/4','1 1/8','2 1/8'],'3 1/4 = 2 10/8. 2 10/8 − 1 3/8 = 1 7/8.','Regroup a whole if needed.');return mq('g5_ce2',`${w1} ${n1}/${d[0]} − ${w2} ${n2}/${d[1]} = ?`,mix(a-b,L),[mix(a-b+L,L),mix(Math.abs(a-b-1),L),mix(a-b+2,L)],`Change to ${L}ths: ${mix(a,L)} − ${mix(b,L)} = ${mix(a-b,L)}.`,'Use a common denominator; regroup if the top fraction is smaller.');},
 ()=>{const p=pick([[3,4],[2,3],[5,8],[3,5]]),w=pick([6,8,9,10,12,15,20]);return mq('g5_ce2',`A trail is ${w} miles long. ${pick(NAMES)} has hiked ${p[0]}/${p[1]} of it. How many miles is that?`,`${mix(w*p[0],p[1])} miles`,[`${mix(w,p[1])} miles`,`${mix(w*p[1],p[0])} miles`,`${w-p[0]} miles`],`${w} × ${p[0]}/${p[1]} = ${mix(w*p[0],p[1])}.`,'“Of” means multiply.');},
 ()=>{const a=pick([[1,3],[1,4],[2,5],[1,6]]),b=pick([[1,2],[1,4],[3,8]]);const L=a[1]*b[1]/gcd(a[1],b[1]);const used=a[0]*L/a[1]+b[0]*L/b[1];if(used>=L)return mq('g5_ce2','A pizza: Sam eats 1/3 and Mia eats 1/4. How much is left?','5/12',['7/12','2/7','1/2'],'1/3 + 1/4 = 7/12. 1 − 7/12 = 5/12.','Add what was eaten, then subtract from 1.');return mq('g5_ce2',`A tank is full. ${a[0]}/${a[1]} of the water is used on Monday and ${b[0]}/${b[1]} on Tuesday. What fraction is left?`,fr(L-used,L),[fr(used,L),`${a[0]+b[0]}/${a[1]+b[1]}`,fr(L-used+1,L)],`Used: ${fr(used,L)}. Left: 1 − ${fr(used,L)} = ${fr(L-used,L)}.`,'Add the parts used, then subtract from 1 whole.');},
],true);
// 5.CE.3
addGens('g5_ce3',[
 ()=>{const a=r3(rng(1000,9999)/1000),b=r3(rng(100,999)/100);return mq('g5_ce3',`${ds(a)} + ${ds(b)} = ?`,ds(a+b),[ds(a+b+0.1),ds(a+b-0.01),ds(r3(a*10+b)/10)],'Line up the decimal points and add.','Line up the points.');},
 ()=>{const a=r3(rng(500,999)/100),b=r3(rng(105,a*100-50)/100);return mq('g5_ce3',`${ds(a)} − ${ds(b)} = ?`,ds(a-b),[ds(a-b+0.1),ds(a+b),ds(a-b-0.01)],'Line up the decimal points and subtract.','Add zeros so both have the same places.');},
 ()=>{const a=r3(rng(12,99)/10),k=rng(3,9);return mq('g5_ce3',`${ds(a)} × ${k} = ?`,ds(a*k),[ds(a*k*10),ds(a*k/10),ds(a+k)],`${ds(a)} × ${k} = ${ds(a*k)}.`,'Multiply like whole numbers, then place the decimal.');},
 ()=>{const k=rng(2,8),q=r3(rng(11,99)/10);return mq('g5_ce3',`${ds(q*k)} ÷ ${k} = ?`,ds(q),[ds(q*10),ds(q/10),ds(q+0.1)],`${k} × ${ds(q)} = ${ds(q*k)}.`,'Divide as with whole numbers; keep the decimal point in place.');},
]);
addGens('g5_ce3',[
 ()=>{const a=r3(rng(12,95)/10),b=r3(rng(2,9)/10);return mq('g5_ce3',`${ds(a)} × ${ds(b)} = ?`,ds(a*b),[ds(a*b*10),ds(a*b/10),ds(a+b)],`Multiply ${Math.round(a*10)} × ${Math.round(b*10)} = ${Math.round(a*b*100)}, then place 2 decimal places: ${ds(a*b)}.`,'Count the decimal places in both factors.');},
 ()=>{const d=pick([0.2,0.4,0.5,0.25]),q=rng(3,24);return mq('g5_ce3',`${ds(q*d)} ÷ ${ds(d)} = ?`,q,[ds(q*d*d),ds(q/10),q*10],`How many ${ds(d)}s fit in ${ds(q*d)}? ${q}.`,'Multiply both numbers by 10 or 100 to make the divisor whole.');},
 ()=>{const p=r3(rng(125,450)/100),k=rng(3,6),pay=pick([20,25,30]);return mq('g5_ce3',`${pick(NAMES)} buys ${k} sandwiches at $${p.toFixed(2)} each and pays with $${pay}. What is the change?`,`$${(pay-p*k).toFixed(2)}`,[`$${(p*k).toFixed(2)}`,`$${(pay-p).toFixed(2)}`,`$${(pay-p*k+1).toFixed(2)}`],`${k} × $${p.toFixed(2)} = $${(p*k).toFixed(2)}. $${pay} − $${(p*k).toFixed(2)} = $${(pay-p*k).toFixed(2)}.`,'Multiply, then subtract.');},
],true);
// 5.CE.4 order of operations
addGens('g5_ce4',[
 ()=>{const a=rng(2,20),b=rng(2,9),cc=rng(2,9);return mq('g5_ce4',`${a} + ${b} × ${cc} = ?`,a+b*cc,[(a+b)*cc,a+b+cc,a*b+cc],`Multiply first: ${b} × ${cc} = ${b*cc}. Then ${a} + ${b*cc} = ${a+b*cc}.`,'Multiply before you add.');},
 ()=>{const a=rng(2,12),b=rng(2,12),cc=rng(2,6);return mq('g5_ce4',`(${a} + ${b}) × ${cc} = ?`,(a+b)*cc,[a+b*cc,a*cc+b,(a+b)+cc],`Parentheses first: ${a+b}. × ${cc} = ${(a+b)*cc}.`,'Parentheses first.');},
 ()=>{const d=rng(2,9),q=rng(2,9),m=rng(2,8),n=rng(2,8);return mq('g5_ce4',`${d*q} ÷ ${d} + ${m} × ${n} = ?`,q+m*n,[(q+m)*n,d*q/(d+m)*n|0,q+m+n],`${d*q} ÷ ${d} = ${q}. ${m} × ${n} = ${m*n}. ${q} + ${m*n} = ${q+m*n}.`,'Do × and ÷ first, left to right.');},
 ()=>{const a=rng(20,60),b=rng(2,9),cc=rng(2,5);return mq('g5_ce4',`${a} − ${b} × ${cc} = ?`,a-b*cc,[(a-b)*cc,a-b+cc,a-b-cc],`${b} × ${cc} = ${b*cc}. ${a} − ${b*cc} = ${a-b*cc}.`,'Multiply first, then subtract.');},
]);
addGens('g5_ce4',[
 ()=>{const a=rng(2,6),b=rng(2,6),cc=rng(1,5),d=rng(2,4);return mq('g5_ce4',`${a} × [${b} + (${cc+d*2} − ${d*2})] = ?`,a*(b+cc),[a*b+cc,a*(b+cc+d*2),a+b+cc],`Inside first: ${cc+d*2} − ${d*2} = ${cc}. ${b} + ${cc} = ${b+cc}. × ${a} = ${a*(b+cc)}.`,'Work from the innermost grouping out.');},
 ()=>{const a=rng(2,9),b=rng(2,9),cc=rng(2,9);const t=(a+b)*cc;return mq('g5_ce4',`Where do parentheses go to make this true? ${a} + ${b} × ${cc} = ${t}`,`(${a} + ${b}) × ${cc}`,[`${a} + (${b} × ${cc})`,`${a} (+ ${b} ×) ${cc}`,'No parentheses are needed'],`(${a} + ${b}) × ${cc} = ${a+b} × ${cc} = ${t}.`,'Try grouping different parts.');},
 ()=>{const a=rng(3,9),b=rng(2,6),cc=rng(10,30);return mq('g5_ce4',`${pick(NAMES)} buys ${a} packs of ${b} pencils and then gives away ${cc>a*b?a*b-1:cc}. Which expression shows how many are left?`,`${a} × ${b} − ${cc>a*b?a*b-1:cc}`,[`${a} × (${b} − ${cc>a*b?a*b-1:cc})`,`${a} + ${b} − ${cc>a*b?a*b-1:cc}`,`(${cc>a*b?a*b-1:cc} − ${a}) × ${b}`],`Total pencils ${a} × ${b}, then subtract.`,'Write the steps in order.');},
],true);
// 5.MG.1 metric
addGens('g5_mg1',[
 ()=>{const k=rng(2,9);const m=pick([['m','cm',100],['km','m',1000],['kg','g',1000],['L','mL',1000],['cm','mm',10]]);return mq('g5_mg1',`${k} ${m[0]} = ? ${m[1]}`,c(k*m[2]),[c(k*m[2]/10),c(k*m[2]*10),String(k+m[2])],`1 ${m[0]} = ${c(m[2])} ${m[1]}, so ${k} ${m[0]} = ${c(k*m[2])} ${m[1]}.`,'Large to small: multiply.');},
 ()=>{const m=pick([['m','cm',100],['km','m',1000],['kg','g',1000],['L','mL',1000]]);const k=rng(2,9);return mq('g5_mg1',`${c(k*m[2])} ${m[1]} = ? ${m[0]}`,k,[k*10,k*m[2],k/10],`Divide by ${c(m[2])}.`,'Small to large: divide.');},
 ()=>{const o=pick([['the mass of a paper clip','1 g',['1 kg','100 g','1 mg']],['the length of a soccer field','100 m',['100 cm','100 km','10 m']],['water in a drinking glass','250 mL',['250 L','2 mL','25 L']],['the mass of a bicycle','12 kg',['12 g','120 kg','1.2 g']],['the width of a fingernail','1 cm',['1 m','1 km','10 cm']]]);return mq('g5_mg1',`Best estimate for ${o[0]}?`,o[1],o[2],`${o[1]} is reasonable.`,'Picture the object and the unit.');},
]);
addGens('g5_mg1',[
 ()=>{const a=rng(2,4),b=rng(30,a*100-30);return mq('g5_mg1',`A board is ${a} m long. ${pick(NAMES)} cuts off ${b} cm. How much is left in centimeters?`,`${a*100-b} cm`,[`${a*100+b} cm`,`${a-b} cm`,`${a*1000-b} cm`],`${a} m = ${a*100} cm. ${a*100} − ${b} = ${a*100-b} cm.`,'Change to the same unit first.');},
 ()=>{const L=rng(2,5),cups=rng(3,8),ml=rng(150,300);return mq('g5_mg1',`A jug holds ${L} L of juice. ${cups} cups of ${ml} mL are poured. How many mL are left?`,`${c(L*1000-cups*ml)} mL`,[`${c(cups*ml)} mL`,`${c(L*100-cups*ml)} mL`.replace(/^-/,''),`${c(L*1000-ml)} mL`],`${L} L = ${c(L*1000)} mL. ${cups} × ${ml} = ${c(cups*ml)}. ${c(L*1000)} − ${c(cups*ml)} = ${c(L*1000-cups*ml)}.`,'Convert L to mL first.');},
 ()=>{const kg=rng(2,6),g=rng(1200,kg*1000-200);return mq('g5_mg1',`Which is heavier: ${kg} kg or ${c(g)} g? By how much?`,`${kg} kg, by ${c(kg*1000-g)} g`,[`${c(g)} g, by ${c(kg*1000-g)} g`,`${kg} kg, by ${c(g-kg*100)} g`.replace(/-/,''),'They are equal'],`${kg} kg = ${c(kg*1000)} g. ${c(kg*1000)} − ${c(g)} = ${c(kg*1000-g)} g.`,'Change kg to g.');},
],true);
// 5.MG.2 perimeter, area, volume
addGens('g5_mg2',[
 ()=>{const l=rng(2,10),w=rng(2,8),h=rng(2,9);return mq('g5_mg2',`A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume?`,`${l*w*h} cm³`,[`${2*(l*w+l*h+w*h)} cm³`,`${l+w+h} cm³`,`${l*w} cm³`],`V = ${l} × ${w} × ${h} = ${l*w*h}.`,'Volume = length × width × height.');},
 ()=>{const b=rng(2,12)*2,h=rng(3,12);return mq('g5_mg2',`A right triangle has a base of ${b} in and a height of ${h} in. What is its area?`,`${b*h/2} in²`,[`${b*h} in²`,`${b+h} in²`,`${2*(b+h)} in²`],`½ × ${b} × ${h} = ${b*h/2}.`,'Area of a triangle = ½ × base × height.');},
 ()=>{const s=[rng(3,12),rng(3,12),rng(3,12),rng(3,12),rng(3,12)];return mq('g5_mg2',`A pentagon has sides ${s.join(', ')} cm. What is its perimeter?`,`${s.reduce((a,b)=>a+b,0)} cm`,[`${s.reduce((a,b)=>a*b,1)>9999?s[0]*5:s.reduce((a,b)=>a+b,0)+5} cm`,`${s.reduce((a,b)=>a+b,0)-s[4]} cm`,`${s[0]*5} cm`],'Add all the sides.','Perimeter = distance around.');},
 ()=>{const l=rng(4,15),w=rng(3,12);return mq('g5_mg2',`A rectangular garden is ${l} m by ${w} m. What is its area?`,`${l*w} m²`,[`${2*(l+w)} m²`,`${l+w} m²`,`${l*w*2} m²`],`${l} × ${w} = ${l*w}.`,'Area = length × width.');},
]);
addGens('g5_mg2',[
 ()=>{const l=rng(3,10),w=rng(2,8),h=rng(2,9);return mq('g5_mg2',`A prism has a volume of ${l*w*h} cm³. Its base is ${l} cm by ${w} cm. How tall is it?`,`${h} cm`,[`${h+1} cm`,`${l*w} cm`,`${l*w*h-l*w} cm`],`${l*w*h} ÷ (${l} × ${w}) = ${h}.`,'Volume ÷ base area = height.');},
 ()=>{const t=pick([['putting a fence around a yard','perimeter'],['covering a floor with tiles','area'],['filling a fish tank with water','volume'],['putting a ribbon around a picture frame','perimeter'],['painting a wall','area'],['packing cubes into a box','volume']]);return mq('g5_mg2',`Which measure do you need for ${t[0]}?`,t[1],['perimeter','area','volume'].filter(x=>x!==t[1]),`${t[0]} needs ${t[1]}.`,'Around = perimeter; cover = area; fill = volume.');},
 ()=>{const a=[rng(2,5),rng(2,4),rng(2,4)],b=[rng(2,5),rng(2,4),rng(2,4)];const va=a[0]*a[1]*a[2],vb=b[0]*b[1]*b[2];return mq('g5_mg2',`Two boxes are stacked: one is ${a.join(' × ')} and the other is ${b.join(' × ')} (in cm). What is the total volume?`,`${va+vb} cm³`,[`${va*vb} cm³`,`${va} cm³`,`${(a[0]+b[0])*(a[1]+b[1])*(a[2]+b[2])} cm³`],`${va} + ${vb} = ${va+vb}.`,'Find each volume, then add.');},
 ()=>{const s=rng(4,10),h=rng(3,8);return mq('g5_mg2',`A shape is a ${s} × ${s} square with a right triangle on top (base ${s}, height ${h}). What is its total area?`,`${s*s+s*h/2} units²`,[`${s*s+s*h} units²`,`${s*s} units²`,`${4*s+h} units²`],`${s*s} + ½ × ${s} × ${h} = ${s*s+s*h/2}.`,'Square + triangle.');},
],true);
// 5.MG.3 angles & triangles
addGens('g5_mg3',[
 ()=>{const a=rng(15,165);const t=a<90?'acute':a===90?'right':'obtuse';return mq('g5_mg3',`An angle measures ${a}°. Classify it.`,t,['acute','right','obtuse','straight'].filter(x=>x!==t),'Acute < 90°, right = 90°, obtuse between 90° and 180°.','Compare to 90°.');},
 ()=>{const a=rng(30,80),b=rng(20,180-a-20);return mq('g5_mg3',`A triangle has angles of ${a}° and ${b}°. What is the third angle?`,`${180-a-b}°`,[`${360-a-b}°`,`${90-a}°`.replace('-',''),`${180-a}°`],`180 − ${a} − ${b} = ${180-a-b}.`,'Triangle angles add to 180°.');},
 ()=>{const k=pick([['all three sides equal','equilateral'],['exactly two sides equal','isosceles'],['no sides equal','scalene']]);return mq('g5_mg3',`A triangle has ${k[0]}. What kind of triangle is it?`,k[1],['equilateral','isosceles','scalene','right'].filter(x=>x!==k[1]),`A triangle with ${k[0]} is ${k[1]}.`,'Classify by sides.');},
]);
addGens('g5_mg3',[
 ()=>{const top=rng(20,100)*1;const base=(180-top)/2;if(base%1)return mq('g5_mg3','An isosceles triangle has a top angle of 40°. What is each base angle?','70°',['140°','40°','50°'],'(180 − 40) ÷ 2 = 70.','The two base angles are equal.');return mq('g5_mg3',`An isosceles triangle has a top angle of ${top}°. What is each of the two equal base angles?`,`${base}°`,[`${180-top}°`,`${top}°`,`${90-top/2+5}°`],`(180 − ${top}) ÷ 2 = ${base}.`,'The two base angles are equal.');},
 ()=>{const a=rng(20,70);return mq('g5_mg3',`A right triangle has one acute angle of ${a}°. What is the other acute angle?`,`${90-a}°`,[`${180-a}°`,`${a}°`,`${90+a}°`],`90 + ${a} + x = 180, so x = ${90-a}.`,'One angle is already 90°.');},
 ()=>{return mq('g5_mg3','Can a triangle have two obtuse angles?','No — two obtuse angles would add to more than 180°.',['Yes, if it is large','Yes, if it is isosceles','Only in a right triangle'],'Two angles over 90° already exceed 180°.','Think about the sum of the angles.');},
],true);
// 5.PS.1 line plots & stem-and-leaf
const stem=v=>{const g={};v.forEach(x=>{const s=Math.floor(x/10);(g[s]=g[s]||[]).push(x%10);});return Object.keys(g).sort((a,b)=>a-b).map(s=>`${s} | ${g[s].sort((a,b)=>a-b).join(' ')}`).join('; ');};
addGens('g5_ps1',[
 ()=>{const v=Array.from({length:rng(8,11)},()=>rng(21,59));return mq('g5_ps1',`Stem-and-leaf plot (stem = tens): ${stem(v)}. How many data values are there?`,v.length,[v.length+1,v.length-1,new Set(v.map(x=>Math.floor(x/10))).size],'Count every leaf.','Each leaf is one value.');},
 ()=>{const v=Array.from({length:rng(8,11)},()=>rng(21,79));return mq('g5_ps1',`Stem-and-leaf plot: ${stem(v)}. What is the greatest value?`,Math.max(...v),[Math.max(...v)+10,Math.min(...v),Math.floor(Math.max(...v)/10)],'Look at the last leaf on the largest stem.','Largest stem, largest leaf.');},
 ()=>{const vals=[1,2,3,4,5];const cnt=vals.map(()=>rng(0,5));const k=rng(0,4);return mq('g5_ps1',`A line plot shows hours of reading: 1 h: ${'X'.repeat(cnt[0])||'—'}, 2 h: ${'X'.repeat(cnt[1])||'—'}, 3 h: ${'X'.repeat(cnt[2])||'—'}, 4 h: ${'X'.repeat(cnt[3])||'—'}, 5 h: ${'X'.repeat(cnt[4])||'—'}. How many students read ${vals[k]} hours?`,cnt[k],[cnt[k]+1,Math.abs(cnt[k]-1)===cnt[k]?cnt[k]+2:Math.abs(cnt[k]-1),cnt[(k+1)%5]+3],'Count the X marks above that number.','Each X is one student.');},
]);
addGens('g5_ps1',[
 ()=>{const v=Array.from({length:rng(9,12)},()=>rng(21,69));const lim=rng(35,55);const n=v.filter(x=>x>lim).length;return mq('g5_ps1',`Stem-and-leaf plot: ${stem(v)}. How many values are greater than ${lim}?`,n,[n+1,v.length-n,Math.abs(n-1)===n?n+2:Math.abs(n-1)],`Values over ${lim}: ${v.filter(x=>x>lim).sort((a,b)=>a-b).join(', ')||'none'}.`,'Check each leaf.');},
 ()=>{const v=Array.from({length:rng(8,11)},()=>rng(21,69));return mq('g5_ps1',`Stem-and-leaf plot: ${stem(v)}. What is the range?`,Math.max(...v)-Math.min(...v),[Math.max(...v),Math.min(...v),Math.max(...v)-Math.min(...v)+10],`${Math.max(...v)} − ${Math.min(...v)} = ${Math.max(...v)-Math.min(...v)}.`,'Greatest − least.');},
 ()=>{const vals=['1/4','1/2','3/4','1'];const cnt=[rng(1,4),rng(1,4),rng(1,4),rng(1,4)];const tot=cnt[0]*0.25+cnt[1]*0.5+cnt[2]*0.75+cnt[3];return mq('g5_ps1',`A line plot shows rain each day (inches): 1/4: ${cnt[0]} day${cnt[0]>1?'s':''}, 1/2: ${cnt[1]} day${cnt[1]>1?'s':''}, 3/4: ${cnt[2]} day${cnt[2]>1?'s':''}, 1: ${cnt[3]} day${cnt[3]>1?'s':''}. What was the total rainfall?`,`${mix(tot*4,4)} inches`,[`${mix(tot*4+1,4)} inches`,`${cnt.reduce((a,b)=>a+b,0)} inches`,`${mix(tot*4+2,4)} inches`],`${cnt[0]}×1/4 + ${cnt[1]}×1/2 + ${cnt[2]}×3/4 + ${cnt[3]}×1 = ${mix(tot*4,4)}.`,'Multiply each value by how many times it appears, then add.');},
],true);
// 5.PS.2 measures of center
addGens('g5_ps2',[
 ()=>{let v=Array.from({length:5},()=>rng(2,20));const s=v.reduce((a,b)=>a+b,0);v[4]+=(5-s%5)%5;const m=v.reduce((a,b)=>a+b,0)/5;return mq('g5_ps2',`Find the mean: ${v.join(', ')}`,m,[m+1,m-1,v.slice().sort((a,b)=>a-b)[2]===m?m+2:v.slice().sort((a,b)=>a-b)[2]],`Sum ${m*5} ÷ 5 = ${m}.`,'Add all, divide by how many.');},
 ()=>{const v=Array.from({length:7},()=>rng(1,30));const s=v.slice().sort((a,b)=>a-b);return mq('g5_ps2',`Find the median: ${v.join(', ')}`,s[3],[v[3]===s[3]?s[2]:v[3],s[0],s[6]].filter(x=>x!==s[3]).concat([s[3]+1]),`In order: ${s.join(', ')}. The middle is ${s[3]}.`,'Put the numbers in order first.');},
 ()=>{const m=rng(2,12);const v=shuf([m,m,m,rng(13,20),rng(21,30),rng(1,1)]);return mq('g5_ps2',`Find the mode: ${v.join(', ')}`,m,[Math.max(...v),Math.min(...v)===m?m+1:Math.min(...v),v.length],`${m} appears most often.`,'Which number appears most?');},
 ()=>{const v=Array.from({length:6},()=>rng(5,45));return mq('g5_ps2',`Find the range: ${v.join(', ')}`,Math.max(...v)-Math.min(...v),[Math.max(...v),Math.min(...v),Math.max(...v)+Math.min(...v)],`${Math.max(...v)} − ${Math.min(...v)}.`,'Greatest − least.');},
]);
addGens('g5_ps2',[
 ()=>{const m=rng(80,92),a=rng(75,95),b=rng(75,95),cc=rng(75,95);const need=4*m-a-b-cc;if(need>100||need<60)return mq('g5_ps2','The mean of 3 numbers is 10. Two are 8 and 9. What is the third?',13,[10,11,17],'3 × 10 = 30. 30 − 8 − 9 = 13.','Mean × count = total.');return mq('g5_ps2',`${pick(NAMES)} scored ${a}, ${b} and ${cc}. What score on the next test makes the mean exactly ${m}?`,need,[m,need+4,Math.round((a+b+cc)/3)],`4 × ${m} = ${4*m}. ${4*m} − ${a+b+cc} = ${need}.`,'Total needed = mean × number of tests.');},
 ()=>{const v=[rng(10,15),rng(10,15),rng(16,20),rng(16,20)];const out=rng(70,95);return mq('g5_ps2',`Data: ${v.join(', ')}. The value ${out} is added. Which measure changes the MOST?`,'the mean',['the median','the mode','none of them'],'A very large value pulls the mean up a lot.','Which uses every value’s size?');},
 ()=>{const v=[rng(2,9),rng(2,9),rng(10,15),rng(10,15),rng(16,25),rng(16,25)];const s=v.slice().sort((a,b)=>a-b);const med=(s[2]+s[3])/2;return mq('g5_ps2',`Find the median: ${shuf(v).join(', ')}`,String(med),[String(s[2]),String(s[3]),String(med+1)].filter(x=>x!==String(med)),`In order: ${s.join(', ')}. Two middle values: ${s[2]} and ${s[3]}. Median = ${med}.`,'Even number of values: average the two middle values.');},
],true);
// 5.PS.3 probability & counting
addGens('g5_ps3',[
 ()=>{const s=rng(2,5),p=rng(2,4);return mq('g5_ps3',`${pick(NAMES)} has ${s} shirts and ${p} pairs of pants. How many different outfits (1 shirt + 1 pair of pants)?`,s*p,[s+p,s*p+1,s*p*2],`${s} × ${p} = ${s*p}.`,'Multiply the choices.');},
 ()=>{const n=pick([4,6,8]);const k=rng(1,n-1);return mq('g5_ps3',`A spinner has ${n} equal sections numbered 1 to ${n}. What is P(a number ≤ ${k})?`,fr(k,n),[fr(n-k,n),`${k}/${n-k}`,fr(k+1,n)],`${k} of ${n} sections.`,'Favorable ÷ total.');},
 ()=>{return mq('g5_ps3','A coin is tossed and a number cube (1–6) is rolled. How many outcomes are in the sample space?',12,[8,6,36],'2 × 6 = 12.','Multiply the outcomes for each.');},
]);
addGens('g5_ps3',[
 ()=>{const a=rng(2,4),b=rng(2,4),cc=rng(2,3);return mq('g5_ps3',`A lunch menu has ${a} sandwiches, ${b} sides and ${cc} drinks. How many different lunches (1 of each)?`,a*b*cc,[a+b+cc,a*b+cc,a*b*cc*2],`${a} × ${b} × ${cc} = ${a*b*cc}.`,'Fundamental Counting Principle: multiply.');},
 ()=>{return mq('g5_ps3','A coin is tossed and a number cube is rolled. What is P(heads and an even number)?','3/12 (or 1/4)',['1/2','3/6','1/12'],'Heads & 2, 4, 6 = 3 outcomes out of 12.','List the sample space.');},
 ()=>{const c1=pick(['red','blue','green']);return mq('g5_ps3',`Two coins are tossed. What is P(both heads)?`,'1/4',['1/2','2/4','1/3'],'Outcomes: HH, HT, TH, TT. One of four is HH.','List all outcomes.');},
],true);
// 5.PFA.1 patterns
addGens('g5_pfa1',[
 ()=>{const s=r3(rng(1,20)/10),d=pick([0.25,0.5,0.2,0.3]);return mq('g5_pfa1',`What comes next? ${[0,1,2,3].map(i=>ds(s+i*d)).join(', ')}, ___`,ds(s+4*d),[ds(s+5*d),ds(s+3*d+0.1),ds(s+4*d+1)],`Add ${d} each time.`,'Find the difference between terms.');},
 ()=>{const d=pick([2,3,4,8]),n=rng(1,3);return mq('g5_pfa1',`What comes next? ${[0,1,2,3].map(i=>mix(n+i,d)).join(', ')}, ___`,mix(n+4,d),[mix(n+5,d),mix(n+4,d+1),mix(n+3,d)],`Add 1/${d} each time.`,'The denominator stays the same.');},
 ()=>{const s=rng(200,500),d=rng(12,35);return mq('g5_pfa1',`What comes next? ${[0,1,2,3].map(i=>s-i*d).join(', ')}, ___`,s-4*d,[s-5*d,s-3*d,s-4*d+1],`Subtract ${d} each time.`,'Is it increasing or decreasing?');},
]);
addGens('g5_pfa1',[
 ()=>{const s=r3(rng(5,30)/10),d=pick([0.4,0.25,0.15]);return mq('g5_pfa1',`A pattern starts at ${ds(s)} and adds ${d}. What is the 10th term?`,ds(s+9*d),[ds(s+10*d),ds(s+8*d),ds(10*d)],`10th term = ${ds(s)} + 9 × ${d} = ${ds(s+9*d)}.`,'From the 1st to the 10th term is 9 jumps.');},
 ()=>{const s=rng(2,5),m=pick([2,3]);const seq=[s,s*m,s*m*m,s*m**3];return mq('g5_pfa1',`What is the rule? ${seq.join(', ')}`,`multiply by ${m}`,[`add ${seq[1]-seq[0]}`,`multiply by ${m+1}`,`add ${m}`],`Each term is ${m} times the one before.`,'Differences grow, so try multiplying.');},
 ()=>{const d=pick([4,8]),a=rng(3,6);return mq('g5_pfa1',`A plant grows 3/${d} inch each day. It started at ${a} inches. How tall after 4 days?`,`${mix(a*d+12,d)} inches`,[`${mix(a*d+9,d)} inches`,`${a+4} inches`,`${mix(a*d+3,d)} inches`],`4 × 3/${d} = ${mix(12,d)}. ${a} + ${mix(12,d)} = ${mix(a*d+12,d)}.`,'Add the growth for each day.');},
],true);
// 5.PFA.2 variables
addGens('g5_pfa2',[
 ()=>{const n=rng(5,40),a=rng(3,20);return mq('g5_pfa2',`Evaluate n + ${a} when n = ${n}.`,n+a,[n-a,n*a,a],`${n} + ${a} = ${n+a}.`,'Replace n with its value.');},
 ()=>{const a=rng(3,15);return mq('g5_pfa2',`Which expression means “${a} more than a number n”?`,`n + ${a}`,[`n − ${a}`,`${a} − n`,`${a}n`],'“More than” means add.','Add to the number.');},
 ()=>{const x=rng(4,30),a=rng(5,25);return mq('g5_pfa2',`Solve: n + ${a} = ${x+a}`,x,[x+a,a,x-1],`n = ${x+a} − ${a} = ${x}.`,'Subtract to undo addition.');},
 ()=>{const k=rng(3,9),x=rng(3,12);return mq('g5_pfa2',`Solve: ${k} × n = ${k*x}`,x,[k*x-k,k+x,k],`n = ${k*x} ÷ ${k} = ${x}.`,'Divide to undo multiplication.');},
]);
addGens('g5_pfa2',[
 ()=>{const p=rng(3,9),k=rng(3,8),t=p*k+rng(2,15);const n=pick(NAMES);return mq('g5_pfa2',`${n} has $${t} and buys ${k} books that cost p dollars each. ${n} has $${t-p*k} left. Which equation finds p?`,`${t} − ${k}p = ${t-p*k}`,[`${t} + ${k}p = ${t-p*k}`,`${k} − p = ${t}`,`${t} − p = ${t-p*k}`],`Money spent is ${k}p. Starting money − spent = left.`,'Write each step of the story.');},
 ()=>{const k=rng(2,6),b=rng(1,9);const xs=[1,2,3,4];return mq('g5_pfa2',`Input → output: ${xs.map(x=>`${x} → ${k*x+b}`).join(', ')}. Which rule fits?`,`output = ${k} × input + ${b}`,[`output = input + ${k+b}`,`output = ${k+b} × input`,`output = ${k} × input`],`${k} × 1 + ${b} = ${k+b}; ${k} × 2 + ${b} = ${2*k+b}.`,'Test the rule on every pair.');},
 ()=>{const x=rng(3,12),a=rng(2,6),b=rng(1,15);return mq('g5_pfa2',`A number is multiplied by ${a}, then ${b} is added. The result is ${a*x+b}. What is the number?`,x,[x+1,x+2,a*x],`Undo: ${a*x+b} − ${b} = ${a*x}. ${a*x} ÷ ${a} = ${x}.`,'Work backward.');},
],true);
})();

