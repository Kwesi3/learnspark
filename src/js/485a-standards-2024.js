// ── Align to the current Virginia standards (checked November 2026) ──
// Math: 2023 SOL (full use 2024–25). English: 2024 SOL. Science: 2018 SOL (still current for K–Physics).
// History: 2023 SOL. Grades 1–3 and 5–8 math and history already matched; this file fixes
// Grade 4 math, Grade 4 and 6 science, and the reading/writing codes for Grades 4 and 6–8,
// adds the skills those standards need, and moves saved progress to the new codes.
(function(){
const S=(code,name,desc,gen)=>({code,name,desc,gen});
const R=rng,fmt=n=>n.toLocaleString('en-US');

// ---------- Grade 4 math (2023) ----------
STRANDS[4].math=[
  S('4.NS.1','Place Value','Read, write & find place value to hundred millions','g4_place'),
  S('4.NS.2','Compare & Order Whole Numbers','Up to seven digits, with <, > and =','g4_cmp'),
  S('4.NS.3','Fractions','Compare, order & find equivalent fractions','g4_frac'),
  S('4.NS.4','Decimals','Read, write, compare & order to thousandths','g4_dec'),
  S('4.NS.5','Fractions & Decimals','Halves, fourths, fifths, tenths & hundredths','g4_fdrel'),
  S('4.CE.1','Add & Subtract Whole Numbers','Estimate, regroup & solve multistep problems','g4_addsub'),
  S('4.CE.2','Multiply & Divide','Facts to 12 × 12, factors, multi-digit work','g4_ops'),
  S('4.CE.3','Fraction Operations','Add & subtract like denominators','g4_fracops'),
  S('4.CE.4','Decimal Operations','Add & subtract decimals to thousandths','g4_decops'),
  S('4.MG.1','Measurement','Length, weight & liquid volume; conversions','g4_measure'),
  S('4.MG.2','Elapsed Time','Hours and minutes within 12 hours','g4_time'),
  S('4.MG.3','Area & Perimeter','Rectangles and squares','g4_area'),
  S('4.MG.4','Points, Lines & Angles','Rays, segments, parallel & perpendicular','g4_angle'),
  S('4.MG.5','Quadrilaterals','Classify by sides and angles','g4_shape'),
  S('4.MG.6','Plane & Solid Figures','Faces, edges & vertices','g4_solid'),
  S('4.PS.1','Line Graphs & Data','The data cycle with line graphs','g4_data'),
  S('4.PS.2','Probability','Likelihood and probability as a fraction','g4_prob'),
  S('4.PFA.1','Patterns','Increasing and decreasing patterns','g4_pattern'),
];
LESSONS.g4_cmp=['Line the numbers up by place value. Start at the greatest place and compare digit by digit.','The first place where the digits differ decides which number is greater.','> means greater than, < means less than. The open side faces the bigger number.'];
LESSONS.g4_fdrel=['Tenths and hundredths can be written two ways: 7/10 = 0.7 and 23/100 = 0.23.','Halves, fourths and fifths: change them to tenths or hundredths first. 1/2 = 5/10 = 0.5, 1/4 = 25/100 = 0.25, 1/5 = 2/10 = 0.2.','Read 0.45 as “forty-five hundredths” — that is 45/100.'];
LESSONS.g4_addsub=['Line up the digits by place value, then add or subtract starting with the ones.','Regroup when you need to: 10 ones make 1 ten, 10 tens make 1 hundred.','Estimate first by rounding. If your exact answer is far from the estimate, check your work.'];
LESSONS.g4_decops=['Line up the decimal points before you add or subtract.','Fill empty places with zeros: 4.5 is the same as 4.500.','Bring the decimal point straight down into your answer.'];
LESSONS.g4_solid=['Plane figures are flat (square, rectangle, triangle, circle). Solid figures take up space (cube, prism, pyramid, cylinder, cone, sphere).','A face is a flat surface, an edge is where two faces meet, and a vertex is a corner where edges meet.','A cube has 6 faces, 12 edges and 8 vertices. A square pyramid has 5 faces, 8 edges and 5 vertices.'];

addGens('g4_cmp',[
  ()=>{const a=R(100000,9999999);let b=a+pick([-1,1])*pick([1,10,100,1000,90000,100000]);if(b<0)b=a+1000;const s=a>b?'>':a<b?'<':'=';
    return mq('g4_cmp',`Which symbol makes this true?  ${fmt(a)} ___ ${fmt(b)}`,s,['>','<','='].filter(x=>x!==s),`Compare from the greatest place. The first different digit shows ${fmt(Math.max(a,b))} is greater.`,'Line the numbers up by place value.');},
  ()=>{const base=R(1000000,8999999);const ns=shuf([base,base+R(1,9)*10000,base-R(1,9)*1000,base+R(1,9)*100000]);const asc=[...ns].sort((x,y)=>x-y);
    const ans=asc.map(fmt).join(', ');const w=[[...ns].map(fmt).join(', '),[...asc].reverse().map(fmt).join(', '),[asc[1],asc[0],asc[2],asc[3]].map(fmt).join(', ')];
    return mq('g4_cmp','Order from LEAST to GREATEST:  '+ns.map(fmt).join(',  '),ans,w,'Compare the millions, then the hundred thousands, and so on.','Find the smallest number first.');},
  ()=>{const c=shuf(['Richmond','Norfolk','Roanoke','Lynchburg']).slice(0,3);const v=c.map(()=>R(95000,260000));while(new Set(v).size<3)v[0]+=7;const i=v.indexOf(Math.max(...v));
    return mq('g4_cmp',`Populations: ${c.map((x,k)=>`${x} ${fmt(v[k])}`).join(';  ')}. Which number is the GREATEST?`,fmt(v[i]),v.filter((x,k)=>k!==i).map(fmt).concat([fmt(v[i]-1000)]),'Compare the hundred thousands first, then the ten thousands.','Look at the greatest place first.');},
  ()=>{const a=R(1000000,9999999);const d=pick([1000,10000,100000]);
    return mq('g4_cmp',`Which number is ${d===1000?'one thousand':d===10000?'ten thousand':'one hundred thousand'} MORE than ${fmt(a)}?`,fmt(a+d),[fmt(a+d/10),fmt(a+d*10),fmt(a-d)],`Add 1 to the ${d===1000?'thousands':d===10000?'ten thousands':'hundred thousands'} place.`,'Only one place changes (unless you regroup).');},
]);
addGens('g4_fdrel',[
  ()=>{const [n,d]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[3,10],[7,10],[9,10]]);const v=n/d;const ans=String(v);
    return mq('g4_fdrel',`Write ${n}/${d} as a decimal.`,ans,[String(v/10),`${n}.${d}`,String(+(v+0.1).toFixed(2))],d===10?`${n}/10 is ${n} tenths = ${ans}.`:`${n}/${d} = ${Math.round(v*100)}/100 = ${ans}.`,'Change it to tenths or hundredths first.');},
  ()=>{let h;do{h=R(11,99);}while(h%10===0);const ans=`${h}/100`;
    return mq('g4_fdrel',`Which fraction equals 0.${String(h).padStart(2,'0')}?`,ans,[`${h}/10`,`${h}/1000`,`1/${h}`],`0.${h} is ${h} hundredths = ${h}/100.`,'Two decimal places means hundredths.');},
  ()=>{const h=R(12,88);return mq('g4_fdrel',`A hundred grid has ${h} of its 100 squares shaded. Which shows the shaded part?`,`${h}/100 = 0.${h}`,[`${h}/10 = ${(h/10).toFixed(1)}`,`${h}/100 = ${h}.0`,`100/${h} = 0.${h}`],`${h} out of 100 is ${h}/100, or 0.${h}.`,'Count of shaded squares over 100.');},
  ()=>{const [f,d]=pick([['1/2','0.5'],['1/4','0.25'],['3/4','0.75'],['1/5','0.2'],['4/5','0.8']]);
    return mq('g4_fdrel',`Which decimal is equivalent to ${f}?`,d,[f.replace('/','.'),String(+d+0.5).slice(0,4),'0.'+f.split('/')[1]],`${f} = ${d}.`,'Think of money: 1/4 of a dollar is a quarter.');},
]);
addGens('g4_addsub',[
  ()=>{const a=R(1200,8999),b=R(1100,9999-a>1100?9999-a:1100);const s=a+b;
    return mq('g4_addsub',`${fmt(a)} + ${fmt(b)} = ?`,fmt(s),[fmt(s+10),fmt(s-100),fmt(s+1000)],'Add each place from right to left and regroup when a place reaches 10.','Start with the ones.');},
  ()=>{const a=R(3000,9999),b=R(1001,a-500);const d=a-b;
    return mq('g4_addsub',`${fmt(a)} − ${fmt(b)} = ?`,fmt(d),[fmt(d+10),fmt(d-100),fmt(a+b)],'Subtract each place from right to left; regroup when the top digit is smaller.','Check: add your answer to the number you subtracted.');},
  ()=>{const a=R(2100,8800),b=R(1100,4900);const ra=Math.round(a/1000)*1000,rb=Math.round(b/1000)*1000;
    return mq('g4_addsub',`Estimate by rounding each number to the nearest thousand:  ${fmt(a)} + ${fmt(b)}`,fmt(ra+rb),[fmt(a+b),fmt(ra+rb+1000),fmt(ra+rb-1000)],`${fmt(a)} rounds to ${fmt(ra)} and ${fmt(b)} rounds to ${fmt(rb)}. ${fmt(ra)} + ${fmt(rb)} = ${fmt(ra+rb)}.`,'Round first, then add.');},
  ()=>{const start=R(120000,640000),sold=R(20000,90000),more=R(10000,80000);const ans=start-sold+more;
    return mq('g4_addsub',`A warehouse had ${fmt(start)} boxes. It shipped ${fmt(sold)} and received ${fmt(more)} more. How many boxes now?`,fmt(ans),[fmt(start-sold-more),fmt(start+sold+more),fmt(start-sold)],`${fmt(start)} − ${fmt(sold)} = ${fmt(start-sold)}; then + ${fmt(more)} = ${fmt(ans)}.`,'Do one step at a time.');},
  ()=>{const s=pick([['how many tickets were sold in all at two shows','exact answer'],['about how many people might fit, to plan chairs','estimate'],['the exact change from a $20 bill','exact answer'],['about how far you will drive on a trip','estimate']]);
    return mq('g4_addsub',`Would you use an estimate or an exact answer to find ${s[0]}?`,s[1],[s[1]==='estimate'?'exact answer':'estimate','neither one'],s[1]==='estimate'?'“About” tells you a close number is good enough.':'Money and counts that must be correct need an exact answer.','Does it need to be exactly right?');},
]);
addGens('g4_decops',[
  ()=>{const a=+(R(100,9999)/100).toFixed(2),b=+(R(100,5000)/100).toFixed(2);const s=+(a+b).toFixed(2);
    return mq('g4_decops',`${a.toFixed(2)} + ${b.toFixed(2)} = ?`,s.toFixed(2),[(s+0.1).toFixed(2),(s+1).toFixed(2),(s-0.01).toFixed(2)],'Line up the decimal points, then add like whole numbers.','Line up the decimal points.');},
  ()=>{const a=+(R(2000,9000)/1000).toFixed(3),b=+(R(100,1900)/1000).toFixed(3);const d=+(a-b).toFixed(3);
    return mq('g4_decops',`${a.toFixed(3)} − ${b.toFixed(3)} = ?`,d.toFixed(3),[(d+0.01).toFixed(3),(d-0.1).toFixed(3),(a+b).toFixed(3)],'Line up the decimal points and subtract each place, regrouping when needed.','Thousandths are three places after the point.');},
  ()=>{const a=R(3,9)+R(1,9)/10,b=R(1,9)/100;return mq('g4_decops',`${a.toFixed(1)} + ${b.toFixed(2)} = ?`,(a+b).toFixed(2),[(a+b*10).toFixed(2),(a/10+b).toFixed(2),(a+b+0.1).toFixed(2)],`Write ${a.toFixed(1)} as ${a.toFixed(2)} so both have hundredths, then add.`,'Add a zero so the places match.');},
  ()=>{const p=+(R(120,899)/100).toFixed(2),q=+(R(120,699)/100).toFixed(2);const t=+(p+q).toFixed(2);const pay=t<10?10:20;const ch=+(pay-t).toFixed(2);
    return mq('g4_decops',`A book costs $${p.toFixed(2)} and a pen costs $${q.toFixed(2)}. You pay with $${pay}. How much change do you get?`,'$'+ch.toFixed(2),['$'+t.toFixed(2),'$'+(ch+1).toFixed(2),'$'+(ch-0.1).toFixed(2)],`Total: $${t.toFixed(2)}. Change: $${pay}.00 − $${t.toFixed(2)} = $${ch.toFixed(2)}.`,'Add first, then subtract from what you paid.');},
  ()=>{const a=+(R(100,300)/100).toFixed(2),b=+(R(50,150)/100).toFixed(2);return mq('g4_decops',`A ribbon is ${a.toFixed(2)} m long. Another is ${b.toFixed(2)} m long. How much longer is the first ribbon?`,(a-b).toFixed(2)+' m',[(a+b).toFixed(2)+' m',(a-b+0.1).toFixed(2)+' m',(b-a+2).toFixed(2)+' m'],`${a.toFixed(2)} − ${b.toFixed(2)} = ${(a-b).toFixed(2)}.`,'How much longer means subtract.');},
]);
addQ('g4_solid',[
  QI('How many faces does a cube have?','6',['4','8','12'],'A cube has 6 square faces.','Think of a number cube.'),
  QI('How many vertices does a cube have?','8',['6','12','4'],'A cube has 8 corners (vertices).','Count the corners.'),
  QI('How many edges does a rectangular prism have?','12',['6','8','10'],'A rectangular prism has 12 edges, like a cube.','Count the top, bottom, and sides.'),
  QI('Which solid figure has one circular base and one vertex?','cone',['cylinder','sphere','cube'],'A cone has one circular base and comes to a point (vertex).','Think of an ice cream cone.'),
  QI('Which solid figure has two circular bases?','cylinder',['cone','sphere','square pyramid'],'A cylinder, like a can, has two circular bases.','Think of a soup can.'),
  QI('Which solid figure has no faces, edges, or vertices?','sphere',['cube','cone','cylinder'],'A sphere is perfectly round, like a ball.','Think of a ball.'),
  QI('A square pyramid has how many faces?','5',['4','6','8'],'1 square base + 4 triangular faces = 5 faces.','Count the base, then the sides.'),
  QI('Which is a PLANE figure (flat)?','triangle',['cube','cone','cylinder'],'A triangle is flat; the others are solids that take up space.','Which one could you draw on paper?'),
  QI('What shape are the faces of a cube?','squares',['triangles','circles','rectangles that are not squares'],'All 6 faces of a cube are equal squares.','All the edges of a cube are the same length.'),
  QH('A square pyramid has how many edges?','8',['5','6','12'],'4 edges around the base + 4 edges up to the top = 8.','Count base edges, then slanted edges.'),
  QH('Which solid figure has 6 faces that are all rectangles, and they are not all the same size?','rectangular prism',['cube','square pyramid','cylinder'],'A rectangular prism has 6 rectangular faces; a cube’s faces are all equal squares.','Think of a cereal box.'),
  QH('How are a square and a cube different?','A square is flat; a cube is a solid with 6 square faces.',['A square has more sides.','A cube is flat.','They are the same shape.'],'A square is a plane figure; a cube is a solid figure made of squares.','Plane vs. solid.'),
]);
// Place value to nine digits (2023 4.NS.1)
addGens('g4_place',[
  ()=>{const n=R(100000000,999999999);const s=String(n);const places=['hundred millions','ten millions','millions','hundred thousands','ten thousands','thousands','hundreds','tens','ones'];const i=R(0,5);
    return mq('g4_place',`In ${fmt(n)}, which digit is in the ${places[i]} place?`,s[i],[...new Set(s.split('').filter((d,k)=>k!==i&&d!==s[i]).concat(['0','1','2','3']).filter(d=>d!==s[i]))].slice(0,3),`Count places from the left: ${places.slice(0,i+1).join(', ')}.`,'The greatest place is on the left.');},
  ()=>{const m=R(100,999),t=R(100,999),o=R(100,999);const n=m*1e6+t*1e3+o;
    return mq('g4_place',`How do you read ${fmt(n)}?`,`${m} million, ${t} thousand, ${o}`,[`${m} thousand, ${t} million, ${o}`,`${m} billion, ${t} million, ${o}`,`${m}${t} thousand, ${o}`],'Read each period (group of three digits) and say its name: millions, thousands.','The commas separate millions and thousands.');},
]);
// SOL codes come from the skill lists (the old lookup table had 2010/2017 codes)
strandCode=function(gen){const gs=[gradeContent()].concat(Object.keys(STRANDS).map(Number));
  for(const g of gs){const st=STRANDS[g];if(!st)continue;for(const subj in st){const f=(st[subj]||[]).find(x=>x.gen===gen);if(f)return f.code;}}return '';};
// 4.CE.3 is fractions only; keep decimal items for 4.CE.4
const _mqA=makeQ;
makeQ=function(gen){let q=_mqA.apply(this,arguments);
  if(gen==='g4_fracops'){for(let i=0;i<8&&q&&/\d\.\d/.test(q.question||'');i++)q=_mqA.apply(this,arguments);}
  if(q&&typeof strandCode==='function'){const c=strandCode(gen);if(c)q.sol=c;}
  return q;};

// ---------- Grade 4 science (2018) ----------
STRANDS[4].sci=[
  S('4.2','Plant & Animal Structures','How body parts help living things survive','g4_plants'),
  S('4.3','Ecosystems & Food Webs','Food webs, niches & classification','g4_eco'),
  S('4.4','Weather','Measure, predict & extreme weather','g4_weather'),
  S('4.5','The Planets','Order, size & motion of the planets','g4_space'),
  S('4.6','Earth, Moon & Sun','Day and night, seasons, tides & moon phases','g4_esm'),
  S('4.7','The Ocean','Ocean floor, ocean water & ocean life','g4_ocean'),
  S('4.8','Virginia’s Natural Resources','Water, plants, minerals, soil & land','g4_vares'),
];
LESSONS.g4_esm=['Earth spins (rotates) on its axis once every 24 hours. That makes day and night.','Earth travels (revolves) around the sun once a year, about 365 days. Its tilted axis causes the seasons.','The moon does not make light; it reflects sunlight. Its phases repeat about every 29½ days, and its gravity causes most of the ocean’s tides.'];
LESSONS.g4_ocean=['The ocean floor has a continental shelf, a continental slope, a wide abyssal plain, ridges and deep trenches.','Ocean water is salty. Deeper water is colder, darker, and under more pressure.','Tiny plankton are the base of ocean food webs. Phytoplankton make food from sunlight and give off much of Earth’s oxygen.'];
LESSONS.g4_vares=['Virginia’s natural resources include water, forests, soil, minerals, coal, and land for farming.','Most of Virginia’s land drains into the Chesapeake Bay, the largest estuary in the United States.','Renewable resources (trees, water, sunlight) can be replaced; nonrenewable ones (coal, oil) cannot. Conserve both.'];
LESSONS.g4_plants=(LESSONS.g4_plants||[]).concat(['Animals have structures that help them survive: a bird’s beak fits its food, thick fur keeps out cold, and webbed feet help with swimming.']).slice(-3);
addQ('g4_plants',[
  QI('How do a duck’s webbed feet help it survive?','They help it swim.',['They help it climb trees.','They keep it warm.','They help it dig.'],'Webbed feet push water like paddles.','Where does a duck spend time?'),
  QI('A hawk has sharp talons. What are they used for?','catching prey',['swimming','making nests waterproof','storing water'],'Sharp claws grab and hold food.','Hawks hunt small animals.'),
  QI('Which structure helps a cactus survive in the desert?','a thick stem that stores water',['wide, thin leaves','shallow fur','gills'],'A cactus stores water in its stem for dry times.','Deserts are dry.'),
  QI('What is the main job of a plant’s roots?','take in water and hold the plant in place',['make seeds','catch sunlight','attract insects'],'Roots anchor the plant and absorb water and minerals.','They are underground.'),
  QI('Why do many flowers have bright colors and sweet smells?','to attract pollinators',['to scare animals away','to make food','to hold water'],'Bees and butterflies carry pollen between flowers.','Who visits flowers?'),
  QH('A woodpecker has a strong, pointed beak. How does this help it?','It can drill into wood to find insects.',['It can crack nuts open.','It can strain food from water.','It can tear meat.'],'Beak shape matches the food an animal eats.','Where do woodpeckers find food?'),
  QH('Which part of a plant makes most of its food?','leaves',['roots','stem','flowers'],'Leaves use sunlight, water and carbon dioxide to make sugar (photosynthesis).','Which part catches sunlight?'),
]);
addQ('g4_esm',[
  QI('What causes day and night on Earth?','Earth rotating on its axis',['Earth revolving around the sun','the moon blocking the sun','clouds covering the sun'],'Earth spins once every 24 hours, so each place faces toward and then away from the sun.','Think spin, not orbit.'),
  QI('About how long does it take Earth to revolve once around the sun?','about 365 days',['24 hours','about 29 days','about 7 days'],'One trip around the sun is one year.','How long is a year?'),
  QI('Why does the moon seem to shine?','It reflects light from the sun.',['It makes its own light.','It is on fire.','It reflects light from Earth’s cities.'],'The moon has no light of its own.','Where does sunlight go?'),
  QI('What mainly causes the ocean’s tides?','the moon’s gravity',['wind','earthquakes','fish swimming'],'The moon’s pull (and some from the sun) raises and lowers ocean water.','What pulls on the ocean?'),
  QI('About how long does the moon take to go through all its phases?','about 29½ days',['about 365 days','24 hours','about 7 days'],'From new moon to new moon takes about a month.','It is close to a month.'),
  QI('What causes Earth’s seasons?','the tilt of Earth’s axis as it orbits the sun',['Earth’s distance from the moon','the moon’s phases','Earth spinning faster in summer'],'The tilt changes how directly sunlight hits each half of Earth during the year.','Think about the axis.'),
  QI('Which is the largest: the sun, Earth, or the moon?','the sun',['Earth','the moon','They are the same size.'],'The sun is a star, much larger than Earth; the moon is smaller than Earth.','The sun only looks small because it is far away.'),
  QI('During a full moon, how much of the moon’s lit side can we see?','all of it',['none of it','half of it','a thin sliver'],'At full moon we see the whole sunlit side.','Full means…'),
  QH('In which direction does the sun appear to rise?','east',['west','north','south'],'Earth rotates toward the east, so the sun appears to rise in the east and set in the west.','Sunrise side.'),
  QH('When it is summer in Virginia, which half of Earth is tilted toward the sun?','the Northern Hemisphere',['the Southern Hemisphere','neither half','both halves equally'],'Virginia is in the Northern Hemisphere, which tilts toward the sun in June, July and August.','Virginia is north of the equator.'),
  QH('Why does the moon look like it changes shape?','We see different amounts of its sunlit half as it orbits Earth.',['Earth’s shadow covers part of it every night.','Clouds cover parts of it.','The moon changes size.'],'Phases come from the moon’s position as it orbits, not Earth’s shadow.','Half the moon is always lit.'),
]);
addQ('g4_ocean',[
  QI('What is ocean water like compared with lake water?','It is salty.',['It is always warmer.','It has no living things.','It is fresh water.'],'Ocean water contains dissolved salts.','Why can’t we drink seawater?'),
  QI('Which part of the ocean floor is closest to the shore and fairly shallow?','continental shelf',['abyssal plain','trench','mid-ocean ridge'],'The continental shelf is the gently sloping edge of a continent under the ocean.','Shelf: near the land.'),
  QI('What is the deepest kind of place in the ocean?','a trench',['a continental shelf','a beach','a reef'],'Ocean trenches are long, very deep valleys.','Think of a deep ditch.'),
  QI('As you go deeper in the ocean, what happens?','It gets darker and colder.',['It gets brighter and warmer.','The water becomes fresh.','The pressure goes down.'],'Sunlight cannot reach deep water, and pressure increases with depth.','Light comes from above.'),
  QI('Which tiny living things are the base of most ocean food webs?','plankton',['sharks','whales','sea turtles'],'Plankton are eaten by small animals, which are eaten by bigger ones.','The smallest are at the bottom of the food web.'),
  QI('Where does a river meet the ocean and fresh water mixes with salt water?','an estuary',['a trench','an abyssal plain','a glacier'],'The Chesapeake Bay is an estuary.','Think of the Chesapeake Bay.'),
  QI('What is the wide, flat part of the deep ocean floor called?','abyssal plain',['continental shelf','continental slope','seamount'],'Abyssal plains are flat and very deep.','Abyss means very deep.'),
  QH('Phytoplankton are important because they…','make food from sunlight and give off oxygen',['eat sharks','cause tides','make ocean water salty'],'Like plants, phytoplankton use photosynthesis.','Phyto- means plant.'),
  QH('What is an underwater mountain range where new ocean floor forms?','mid-ocean ridge',['trench','continental shelf','estuary'],'Molten rock rises at mid-ocean ridges and forms new crust.','Ridge = mountain range.'),
  QH('Which ocean is off Virginia’s coast?','the Atlantic Ocean',['the Pacific Ocean','the Indian Ocean','the Arctic Ocean'],'Virginia Beach faces the Atlantic.','East coast.'),
]);
addQ('g4_vares',[
  QI('Which Virginia resource is renewable?','trees in a forest',['coal','oil','natural gas'],'New trees can be planted and grow again.','Can it be replaced in a lifetime?'),
  QI('Where is most of Virginia’s coal found?','in the mountains of southwest Virginia',['on the Eastern Shore','in the Chesapeake Bay','in Richmond'],'Coal is mined in the Appalachian Plateau in southwest Virginia.','Think mountains.'),
  QI('Most of the water that flows through Virginia ends up in…','the Chesapeake Bay',['the Gulf of Mexico','the Pacific Ocean','Lake Erie'],'Most of Virginia’s land is in the Chesapeake Bay watershed.','The largest estuary in the U.S.'),
  QI('Why is soil an important natural resource in Virginia?','Farmers grow crops in it.',['It is used as fuel.','It makes electricity.','It is a type of metal.'],'Good soil supports farms and forests.','What grows in soil?'),
  QI('What is one way to conserve water at home?','turn off the faucet while brushing your teeth',['take longer showers','water the lawn at noon','leave hoses running'],'Saving water helps protect a natural resource.','Use less.'),
  QI('Which is a NONRENEWABLE resource?','coal',['sunlight','wind','trees'],'Coal took millions of years to form and cannot be replaced quickly.','Can people make more of it quickly?'),
  QI('Why are Virginia’s forests valuable?','They provide wood and homes for wildlife.',['They make coal.','They are made of minerals.','They make ocean water salty.'],'Forests provide timber, clean air, and habitats.','Think of what trees give us.'),
  QH('Virginia’s rivers and the Chesapeake Bay support which industry?','fishing and seafood (like crabs and oysters)',['coal mining','gold mining','oil drilling'],'The Bay is famous for blue crabs and oysters.','Think of Chesapeake blue crabs.'),
  QH('What does a watershed mean?','an area of land where all the water drains to the same place',['a shed for storing water','a type of dam','a large lake'],'Rain that falls in a watershed flows to the same river, bay, or ocean.','Water drains downhill.'),
]);

// ---------- Grade 6 science (2018) ----------
STRANDS[6].sci=[
  S('6.2','The Solar System','Sun, planets, moons & orbits','g6_solar'),
  S('6.3','Earth, Sun & Moon','Seasons, tides, eclipses & phases','g6_esm'),
  S('6.4','Energy','Sources & transfer of energy','g6_energy'),
  S('6.5','Atoms & Elements','Atoms, elements, compounds & reactions','g6_atoms'),
  S('6.6','Water','Water’s special properties','g6_water'),
  S('6.7','Air & Weather','Atmosphere, air pressure & weather maps','g6_atmo'),
  S('6.8','Watersheds & the Bay','Virginia watersheds & the Chesapeake Bay','g6_bay'),
  S('6.9','People & Resources','Resource use, impact & conservation','g6_resource'),
];
LESSONS.g6_esm=['Seasons happen because Earth’s axis is tilted about 23.5° as it orbits the sun.','A solar eclipse happens when the moon passes between the sun and Earth; a lunar eclipse when Earth is between the sun and the moon.','Spring tides (biggest range) happen at new and full moon, when the sun and moon line up; neap tides happen at the quarter moons.'];
LESSONS.g6_atoms=['Atoms are made of protons (+) and neutrons (no charge) in the nucleus, with electrons (−) around it.','An element is made of only one kind of atom (O, H, Fe). A compound is two or more elements chemically joined (H₂O, CO₂).','In a chemical reaction, reactants become products. Atoms are rearranged, not created or destroyed.'];
LESSONS.g6_water=['Water dissolves so many things that it is called the universal solvent.','Water has a high specific heat: it heats up and cools down slowly, which keeps coastal climates mild.','Ice is less dense than liquid water, so it floats. Water molecules stick together (cohesion), causing surface tension.'];
LESSONS.g6_bay=['A watershed is all the land that drains into a body of water.','Virginia has three major watershed systems: the Chesapeake Bay, the North Carolina sounds, and the Gulf of Mexico (through the Mississippi River system).','The Chesapeake Bay is an estuary, where fresh river water mixes with salt water. Runoff with too many nutrients can cause algae blooms and low oxygen.'];
addQ('g6_esm',[
  QI('What causes Earth’s seasons?','the tilt of Earth’s axis',['Earth’s changing distance from the sun','the moon’s gravity','sunspots'],'The tilt changes how directly sunlight strikes each hemisphere.','It is not distance — Earth is closest to the sun in January.'),
  QI('During a solar eclipse, which body is between the other two?','the moon',['Earth','the sun','Mars'],'The moon blocks sunlight from reaching part of Earth.','Solar: the sun gets blocked.'),
  QI('During a lunar eclipse, which body is between the other two?','Earth',['the moon','the sun','Venus'],'Earth’s shadow falls on the moon.','Lunar: the moon gets darkened.'),
  QI('When do spring tides (the largest tidal range) happen?','at new moon and full moon',['only in spring','at first and third quarter moons','only during eclipses'],'The sun and moon line up, so their pulls add together.','Spring tides are not about the season.'),
  QI('Earth’s axis is tilted about how many degrees?','23.5°',['90°','45°','5°'],'The tilt is about 23.5 degrees.','Less than a quarter of a right angle.'),
  QI('What keeps the moon in orbit around Earth?','gravity',['magnetism','wind','sunlight'],'Earth’s gravity pulls on the moon.','The same force that makes things fall.'),
  QH('Neap tides happen when the sun and moon are…','at right angles to each other (quarter moons)',['lined up with Earth','both on the far side of Earth','in an eclipse'],'Their pulls partly cancel, so the tidal range is smallest.','Think first and third quarter.'),
  QH('Why do we always see the same side of the moon?','The moon rotates once in the same time it takes to orbit Earth.',['The moon does not rotate.','Earth blocks the other side.','The other side is always dark.'],'Its spin and orbit take about the same time (about 27 days).','Spin time = orbit time.'),
  QH('On the first day of summer in the Northern Hemisphere (summer solstice), Virginia has…','its longest day of the year',['its shortest day','equal day and night','no sunset'],'The Northern Hemisphere is tilted most toward the sun.','Solstice in June.'),
]);
addQ('g6_atoms',[
  QI('Which particle in an atom has a negative charge?','electron',['proton','neutron','nucleus'],'Electrons are negative; protons are positive; neutrons have no charge.','e for electron, negative.'),
  QI('Where are protons and neutrons found?','in the nucleus',['in the electron cloud','outside the atom','in the air around the atom'],'The nucleus is the dense center of the atom.','The center.'),
  QI('What is an element?','a substance made of only one kind of atom',['a mixture of two liquids','two kinds of atoms joined together','any solid'],'Gold, oxygen and iron are elements.','Only one kind.'),
  QI('Which is a compound?','water (H₂O)',['oxygen (O₂)','gold (Au)','helium (He)'],'Water is hydrogen and oxygen chemically combined.','Two or more different elements joined.'),
  QI('What is the chemical symbol for sodium?','Na',['S','So','Sd'],'Sodium’s symbol comes from its Latin name, natrium.','It is not S (that is sulfur).'),
  QI('In a chemical equation, the substances you start with are called…','reactants',['products','solutions','elements only'],'Reactants → products.','They react.'),
  QI('How many atoms are in one molecule of CO₂?','3',['2','1','4'],'1 carbon + 2 oxygen = 3 atoms.','Count C and O₂.'),
  QH('What does the law of conservation of mass tell us about a chemical reaction?','The total mass of the products equals the total mass of the reactants.',['Mass is lost as heat.','New atoms are created.','Products always weigh more.'],'Atoms are rearranged, not created or destroyed.','Count atoms on both sides.'),
  QH('Which part of an atom takes up most of its space but has very little mass?','the electron cloud',['the nucleus','the protons','the neutrons'],'Electrons move in a large region around a tiny, dense nucleus.','The nucleus is tiny.'),
  QH('The number of protons in an atom tells you its…','atomic number (which element it is)',['mass in grams','number of molecules','state of matter'],'Every carbon atom has 6 protons, so carbon’s atomic number is 6.','It identifies the element.'),
]);
addQ('g6_water',[
  QI('Why is water called the “universal solvent”?','It can dissolve more substances than any other liquid.',['It freezes at 0 °C.','It is found everywhere.','It has no color.'],'Many substances dissolve in water.','Solvent: does the dissolving.'),
  QI('Why does ice float on liquid water?','Ice is less dense than liquid water.',['Ice is heavier than water.','Ice has air bubbles only.','Water pushes all solids up.'],'Water expands when it freezes, so ice is less dense.','Density decides floating.'),
  QI('At what temperature does pure water freeze (at sea level)?','0 °C (32 °F)',['100 °C','10 °C','−32 °C'],'Water freezes at 0 °C and boils at 100 °C at sea level.','Celsius was built around water.'),
  QI('Water heats up and cools down slowly. This property is called…','high specific heat',['surface tension','low density','evaporation'],'It takes a lot of energy to change water’s temperature.','Why are beaches mild?'),
  QI('Why can some insects walk on water?','surface tension',['magnetism','buoyancy of salt','evaporation'],'Water molecules cling together at the surface.','The surface acts like a thin skin.'),
  QI('What is it called when water molecules stick to each other?','cohesion',['adhesion','condensation','evaporation'],'Cohesion: same molecules stick together. Adhesion: water sticks to other things.','Co- means together.'),
  QH('Why do places near large bodies of water often have milder temperatures?','Water warms and cools slowly, so it moderates nearby air.',['Water makes its own heat.','Wind never blows near water.','There is less sunlight near water.'],'High specific heat keeps coastal temperatures steadier.','Think of Virginia Beach in winter.'),
  QH('Water rising up a narrow tube or a paper towel shows which property?','adhesion (capillary action)',['density','evaporation','freezing'],'Water sticks to the tube walls and climbs.','Water sticks to other materials.'),
]);
addQ('g6_bay',[
  QI('What is a watershed?','all the land that drains water into a particular body of water',['a building that stores water','a type of dam','an underground lake'],'Rain falling in a watershed flows to the same river, bay, or ocean.','Drains to one place.'),
  QI('The Chesapeake Bay is the largest ___ in the United States.','estuary',['lake','glacier','desert'],'Fresh river water mixes with salty ocean water in the Bay.','Fresh + salt water.'),
  QI('Which Virginia river flows into the Chesapeake Bay?','the James River',['the New River','the Tennessee River','the Mississippi River'],'The James, York, Rappahannock and Potomac flow to the Bay.','Think of Richmond’s river.'),
  QI('Which is one of Virginia’s three major watershed systems?','the Gulf of Mexico',['the Pacific Ocean','the Great Lakes','Hudson Bay'],'Virginia’s three are the Chesapeake Bay, the North Carolina sounds, and the Gulf of Mexico.','Some western rivers flow toward the Mississippi.'),
  QI('Too much fertilizer washing into the Bay can cause…','algae blooms that lower oxygen in the water',['clearer water','more oysters right away','saltier water'],'Extra nutrients feed algae; when algae die and decay, oxygen is used up.','Nutrients feed algae.'),
  QI('How do wetlands help the Bay?','They filter pollutants and slow flooding.',['They make water saltier.','They create oil.','They speed up erosion.'],'Wetland plants trap sediment and absorb nutrients.','Think of a natural sponge and filter.'),
  QI('Water that is a mix of fresh and salt water is called…','brackish',['distilled','frozen','pure'],'Estuaries like the Bay contain brackish water.','In between fresh and salty.'),
  QH('What is runoff?','rain water that flows over land into streams, carrying soil and pollutants',['water that evaporates','water stored in clouds','groundwater deep underground'],'Runoff picks up fertilizer, oil and sediment from land.','Water running off the land.'),
  QH('Why is the Bay’s water saltier near the Atlantic Ocean than near the rivers?','Salt water enters from the ocean while fresh water flows in from rivers.',['Rivers carry salt.','Rain is salty.','The Bay has no rivers.'],'Salinity rises toward the ocean end of an estuary.','Where does salt water come from?'),
  QH('Which human action helps protect the Chesapeake Bay watershed?','planting trees along stream banks',['dumping oil down storm drains','using extra lawn fertilizer','paving over wetlands'],'Tree buffers hold soil and absorb nutrients before they reach streams.','Roots hold soil.'),
]);
LESSONS.g6_resource=LESSONS.g6_resource||['People use resources like water, soil, forests and fuels.','Using resources has trade-offs for the environment, the economy and communities.','Conservation means using resources wisely so they last.'];

// Retired skills (no longer in these grades' standards): drop their extra question banks.
// Force/motion and electricity are Grade 5 (5.3, 5.4); equations are Grade 5 (5.PFA.2); ecosystems are Grade 4 and Life Science.
['g4_force','g4_elec','g6_eco','g4_eq'].forEach(g=>{delete XB[g];delete XG[g];});

// ---------- English (2024): strand codes ----------
const ENG={vocab:'RV',fiction:'RL',nonfic:'RI'};
for(const g of [4,6,7,8]){const st=STRANDS[g];if(!st)continue;
  (st.read||[]).forEach(s=>{const k=Object.keys(ENG).find(k=>s.gen.endsWith(k));if(k)s.code=g+'.'+ENG[k];});
  (st.write||[]).forEach((s,i)=>{s.code=g+'.'+(/edit/.test(s.gen)?'LU':'W');});
}

// ---------- Move saved progress to the new codes ----------
const MOVE={
  '4:math':{'4.1':'4.NS.1','4.2':'4.NS.3','4.3':'4.NS.4','4.4':'4.CE.2','4.5':'4.CE.3','4.7':'4.MG.3','4.8':'4.MG.1','4.9':'4.MG.2','4.10':'4.MG.4','4.12':'4.MG.5','4.13':'4.PS.2','4.14':'4.PS.1','4.15':'4.PFA.1'},
  '4:sci':{'4.4':'4.2','4.5':'4.3','4.6':'4.4','4.7':'4.5','4.2':null,'4.3':null},
  '6:sci':{'6.2':'6.4','6.3':'6.2','6.6':'6.7','6.8':'6.9','6.5':null},
  '4:read':{'4.4':'4.RV','4.5':'4.RL','4.6':'4.RI'},'4:write':{'4.7':'4.W','4.8':'4.LU'},
  '6:read':{'6.4':'6.RV','6.5':'6.RL','6.6':'6.RI'},'6:write':{'6.7':'6.W','6.8':'6.LU'},
  '7:read':{'7.4':'7.RV','7.5':'7.RL','7.6':'7.RI'},'7:write':{'7.7':'7.W','7.8':'7.LU'},
  '8:read':{'8.4':'8.RV','8.5':'8.RL','8.6':'8.RI'},'8:write':{'8.7':'8.W','8.8':'8.LU'},
};
function migrateStandards2024(p){
  if(!p||!p.skills||(p.extras&&p.extras.std2024))return false;
  const out={},retired={};
  for(const [k,v] of Object.entries(p.skills)){
    const m=/^(\d+):(\w+):(.+)$/.exec(k);const map=m&&MOVE[m[1]+':'+m[2]];
    if(map&&m[3] in map){const to=map[m[3]];if(to===null){retired[k]=v;continue;}
      const nk=m[1]+':'+m[2]+':'+to;out[nk]=out[nk]&&out[nk].n>v.n?out[nk]:v;}
    else if(!(k in out))out[k]=v;}
  p.skills=out;p.extras=p.extras||{};p.extras.std2024=1;if(Object.keys(retired).length)p.extras.retiredSkills=Object.assign(p.extras.retiredSkills||{},retired);
  (p.missed||[]).forEach(x=>{const map=MOVE[(x.grade||p.grade)+':'+x.subj];if(map&&x.code in map&&map[x.code])x.code=map[x.code];});
  return true;}
window.migrateStandards2024=migrateStandards2024;
if(typeof syncImport==='function'){const _siStd=syncImport;syncImport=function(){
  (SYNC_IN||[]).forEach(p=>{try{migrateStandards2024(p);}catch(e){}});return _siStd.apply(this,arguments);};}
const _lpStd=loadProfiles;
loadProfiles=function(){const r=_lpStd.apply(this,arguments);let ch=false;
  try{Object.values(PROFILES.list).forEach(p=>{if(migrateStandards2024(p))ch=true;});if(ch)persistProfiles();}catch(e){}
  return r;};
})();
