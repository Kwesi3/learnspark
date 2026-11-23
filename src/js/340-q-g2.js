// ── GRADE 2: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben','Omar','Lucy'];
const money=c=>c>=100?'$'+(c/100).toFixed(2):c+'¢';
// 2.NS.1 skip counting, even & odd
addGens('g2_ns1',[
 ()=>{const n=rng(11,99),ev=n%2===0;return mq('g2_ns1',`${n} pencils are put into pairs. Will there be one left over?`,ev?'No — the number is even.':'Yes — the number is odd.',[ev?'Yes — the number is odd.':'No — the number is even.','Only if you count by 5s'],`${n} ends in ${n%10}, so it is ${ev?'even':'odd'}.`,'Even numbers end in 0, 2, 4, 6 or 8.');},
 ()=>{const s=rng(1,8)*100;return mq('g2_ns1',`Count by 100s: ${s}, ${s+100}, ${s+200}, ___`,s+300,[s+210,s+201,s+400],'Each number is 100 more.','Only the hundreds digit changes.');},
]);
addGens('g2_ns1',[
 ()=>{const s=rng(1,40)*5+rng(0,1)*0;const st=pick([5,10,25]);const n=rng(4,6);return mq('g2_ns1',`Start at ${s}. Count by ${st}s. What is the ${['','','','','4th','5th','6th'][n]} number you say after ${s}?`,s+st*n,[s+st*(n-1),s+st*(n+1),s+n],`Add ${st} ${n} times: ${s} + ${st*n} = ${s+st*n}.`,`Add ${st} each time.`);},
 ()=>{const a=rng(12,48)*2+1,b=a+2*rng(1,4);const odds=[];for(let i=a;i<=b;i+=2)odds.push(i);return mq('g2_ns1',`How many ODD numbers are there from ${a} to ${b}? (count both)`,odds.length,[odds.length+1,odds.length-1,b-a],`The odd numbers are ${odds.join(', ')}: ${odds.length} numbers.`,'List them and count.');},
 ()=>{const e=rng(10,45)*2;return mq('g2_ns1',`I am an even number. I am greater than ${e-1} and less than ${e+2}. What number am I?`,e,[e+1,e-1,e+2],`Between ${e-1} and ${e+2} are ${e} and ${e+1}. The even one is ${e}.`,'List the numbers in between.');},
],true);
// 2.NS.2 place value
addGens('g2_ns2',[
 ()=>{const h=rng(1,9),t=rng(0,9),o=rng(0,9);const n=h*100+t*10+o;return mq('g2_ns2',`Which is ${n} in expanded form?`,`${h*100} + ${t*10} + ${o}`,[`${h} + ${t} + ${o}`,`${h*100} + ${t} + ${o*10}`,`${h*10} + ${t*100} + ${o}`],`${n} = ${h} hundreds, ${t} tens, ${o} ones.`,'Each digit has a place value.');},
 ()=>{const n=rng(100,989);return mq('g2_ns2',`What is 10 more than ${n}?`,n+10,[n+1,n+100,n-10],`Add 1 to the tens digit: ${n+10}.`,'Only the tens change (unless you regroup).');},
]);
addGens('g2_ns2',[
 ()=>{const h=rng(1,8),t=rng(10,19),o=rng(0,9);const n=h*100+t*10+o;return mq('g2_ns2',`${h} hundreds, ${t} tens and ${o} ones is what number?`,n,[h*100+t+o,h*100+(t%10)*10+o,n+100],`${t} tens = ${t*10}. ${h*100} + ${t*10} + ${o} = ${n}.`,'10 tens make 1 hundred.');},
 ()=>{const d=shuf([rng(1,3),rng(4,6),rng(7,9)]);const big=Number(d.slice().sort((a,b)=>b-a).join(''));const small=Number(d.slice().sort((a,b)=>a-b).join(''));return mq('g2_ns2',`Use the digits ${d.join(', ')} once each. What is the GREATEST number you can make?`,big,[small,Number(d.join('')),big-1],'Put the biggest digit in the hundreds place, then the next biggest.','Biggest digit goes first.');},
 ()=>{const n=rng(110,890);const r=Math.round(n/10)*10;return mq('g2_ns2',`${n} is closest to which ten?`,r,[r+10,r-10,Math.round(n/100)*100===r?r+20:Math.round(n/100)*100],`Look at the ones digit (${n%10}). ${n} rounds to ${r}.`,'5 or more rounds up.');},
],true);
// 2.NS.3 fractions
addGens('g2_ns3',[
 ()=>{const d=pick([2,3,4,6,8]);return mq('g2_ns3',`How many 1/${d} pieces make one whole?`,d,[d-1,d+1,1],`${d} pieces of 1/${d} make a whole.`,'The bottom number tells how many equal parts.');},
]);
addGens('g2_ns3',[
 ()=>{const d=pick([3,4,6,8]),n=rng(1,d-1);return mq('g2_ns3',`A pizza has ${d} equal slices. ${n} slice${n>1?'s are':' is'} eaten. What fraction is LEFT?`,`${d-n}/${d}`,[`${n}/${d}`,`${d}/${d-n}`,`1/${d}`],`${d} − ${n} = ${d-n} slices are left out of ${d}: ${d-n}/${d}.`,'Count the slices that are not eaten.');},
 ()=>{const a=pick([2,3,4]),b=pick([6,8]);return mq('g2_ns3',`Which is LESS: 1/${a} or 1/${b} of the same sandwich?`,`1/${b}`,[`1/${a}`,'They are equal'],`More pieces means smaller pieces, so 1/${b} is less.`,'Think about cutting into more pieces.');},
 ()=>{return mq('g2_ns3','Which fraction is the same as one whole?','4/4',['1/4','3/4','2/4'],'4 out of 4 equal parts is the whole thing.','All the pieces together.');},
],true);
// 2.NS.4 money
addGens('g2_ns4',[
 ()=>{const p=rng(15,95),n=pick(NAMES);return mq('g2_ns4',`${n} has 1 dollar. A pencil costs ${p}¢. How much change will ${n} get?`,money(100-p),[money(100-p+5),money(p),money(100-p-10)].filter(x=>!/-/.test(x)),`100¢ − ${p}¢ = ${100-p}¢.`,'1 dollar = 100 cents.');},
]);
addGens('g2_ns4',[
 ()=>{const a=rng(2,6)*5,b=rng(2,8)*5,n=pick(NAMES);const t=a+b;return mq('g2_ns4',`${n} buys a sticker for ${a}¢ and a bookmark for ${b}¢. ${n} pays with a dollar. How much change?`,money(100-t),[money(t),money(100-a),money(100-t+10)],`${a} + ${b} = ${t}¢. 100 − ${t} = ${100-t}¢.`,'Add the prices, then subtract from 100¢.');},
 ()=>{const c=rng(3,7)*25;return mq('g2_ns4',`Which coins make ${money(c)} with the FEWEST coins?`,`${c/25} quarters`,[`${c/5} nickels`,`${c/10|0} dimes and ${c%10===5?'1 nickel':'0 nickels'}`,`${c} pennies`],'Quarters are worth the most, so you need the fewest of them.','Use the biggest coin.');},
 ()=>{const d=1,q=rng(1,3),dm=rng(1,4),pn=rng(1,4);const t=100+q*25+dm*10+pn;return mq('g2_ns4',`How much money? 1 dollar bill, ${q} quarter${q>1?'s':''}, ${dm} dime${dm>1?'s':''}, ${pn} penn${pn>1?'ies':'y'}`,money(t),[money(t-100),money(t+10),money(t-1)],`100 + ${q*25} + ${dm*10} + ${pn} = ${t}¢ = ${money(t)}.`,'Start with the dollar.');},
],true);
// 2.CE.1 add & subtract
addGens('g2_ce1',[
 ()=>{const a=rng(20,60),b=rng(10,39),n=pick(NAMES);return mq('g2_ce1',`${n} read ${a} pages on Monday and ${b} pages on Tuesday. How many pages in all?`,a+b,nearby(a+b,[10,-10,1,-1]),`${a} + ${b} = ${a+b}.`,'In all means add.');},
 ()=>{const a=rng(10,60),s=rng(15,39);return mq('g2_ce1',`${a} + ___ = ${a+s}`,s,[s+10,s-1,a+s],`${a+s} − ${a} = ${s}.`,'Subtract to find the missing part.');},
]);
addGens('g2_ce1',[
 ()=>{const a=rng(40,90),b=rng(12,a-15),c=rng(5,20);return mq('g2_ce1',`A bus has ${a} riders. At the first stop ${b} get off. At the next stop ${c} get on. How many riders now?`,a-b+c,[a-b,a-b-c,a+b+c].filter(x=>x>=0),`${a} − ${b} = ${a-b}. ${a-b} + ${c} = ${a-b+c}.`,'Do the steps in order.');},
 ()=>{const a=rng(51,99),b=rng(17,a-10);return mq('g2_ce1',`${a} − ${b} = ?`,a-b,[a-b+10,a-b-10,b-a+100],`Regroup if needed: ${a} − ${b} = ${a-b}.`,'Check by adding back.');},
 ()=>{const a=rng(25,45),x=rng(5,15),n1=pick(NAMES),n2=pick(NAMES.filter(v=>v!==n1));return mq('g2_ce1',`${n1} has ${a} marbles. ${n2} has ${x} more than ${n1}. How many do they have together?`,a+a+x,[a+x,a+a,2*(a+x)],`${n2} has ${a} + ${x} = ${a+x}. Together: ${a} + ${a+x} = ${2*a+x}.`,'First find how many the second child has.');},
 ()=>{const a=rng(20,50),b=rng(20,49);return mq('g2_ce1',`Which has the SAME answer as ${a} + ${b}?`,`${b} + ${a}`,[`${a} − ${b}`,`${a} + ${b+1}`,`${a+10} + ${b+10}`],'You can add in any order. The sum stays the same.','Switch the order.');},
],true);
// 2.MG.1 measurement
addQ('g2_mg1',[
 QI('About how long is a new crayon?','4 inches',['4 feet','40 inches','4 pounds'],'A crayon is about 4 inches long.','An inch is about the width of a quarter.'),
 QI('Which tool measures how heavy something is?','a scale',['a ruler','a cup','a clock'],'A scale measures weight.','Think of a bathroom scale.'),
 QI('How many cups are in 1 pint?','2',['4','1','3'],'1 pint = 2 cups.','Pint is a bit bigger than a cup.'),
 QI('Which weighs about 1 pound?','a loaf of bread',['a car','a feather','a paper clip'],'A loaf of bread is about 1 pound.','Not too heavy, not too light.'),
 QH('A ribbon is 12 inches. You cut it into 3 equal pieces. How long is each piece?','4 inches',['3 inches','6 inches','9 inches'],'12 inches split 3 ways is 4 inches each.','Share 12 into 3 equal groups.'),
 QH('How many cups are in 1 quart?','4',['2','8','1'],'1 quart = 2 pints = 4 cups.','A quart is 2 pints.'),
 QH('A puppy weighed 9 pounds. Now it weighs 16 pounds. How much did it gain?','7 pounds',['25 pounds','6 pounds','9 pounds'],'16 − 9 = 7 pounds.','Subtract to compare.'),
 QH('Mia measured her desk with a ruler and got 24 inches. Is that more or less than 2 feet?','exactly 2 feet',['less than 2 feet','more than 2 feet','about 24 feet'],'1 foot = 12 inches, so 24 inches = 2 feet.','How many inches in a foot?'),
 QH('Which is the best estimate for how much water a bathtub holds?','about 40 gallons',['about 4 cups','about 1 pint','about 2 quarts'],'A bathtub holds a lot — gallons, not cups.','Gallons are the biggest unit.'),
 QH('A plant was 5 inches tall. It grew 2 inches each week for 3 weeks. How tall is it now?','11 inches',['7 inches','10 inches','15 inches'],'2 × 3 = 6 inches of growth. 5 + 6 = 11.','Add 2 three times.'),
]);
// 2.MG.2 time
addGens('g2_mg2',[
 ()=>{const h=rng(1,11),m=pick([0,15,30,45]);const words={0:`${h} o’clock`,15:`quarter past ${h}`,30:`half past ${h}`,45:`quarter to ${h+1}`};return mq('g2_mg2',`Which time is the same as ${tm(h,m)}?`,words[m],Object.values(words).filter(x=>x!==words[m]),`${tm(h,m)} is ${words[m]}.`,'Quarter = 15 minutes, half = 30 minutes.');},
]);
addGens('g2_mg2',[
 ()=>{const h=rng(1,10),m=pick([10,15,20,25,30]),d=pick([15,20,30,45]);const e=h*60+m+d;return mq('g2_mg2',`Soccer practice starts at ${tm(h,m)} and lasts ${d} minutes. When does it end?`,tm(Math.floor(e/60),e%60),[tm(Math.floor(e/60)+1,e%60),tm(h+1,m),tm(Math.floor((e+5)/60),(e+5)%60)],`${tm(h,m)} + ${d} minutes = ${tm(Math.floor(e/60),e%60)}.`,'Count on by 5s.',{dgSvg:dgClock(h,m)});},
 ()=>{const h=rng(1,10),m=pick([0,30]),hh=h+rng(1,2);return mq('g2_mg2',`A movie starts at ${tm(h,m)} and ends at ${tm(hh,m)}. How long is the movie?`,`${hh-h} hour${hh-h>1?'s':''}`,[`${hh-h+1} hours`,`${(hh-h)*30} minutes`,`${hh} hours`],`From ${tm(h,m)} to ${tm(hh,m)} is ${hh-h} hour${hh-h>1?'s':''}.`,'Count the hours.');},
 ()=>{return mq('g2_mg2','School starts at 8:00 in the morning. Is that a.m. or p.m.?','a.m.',['p.m.','both','neither'],'Times from midnight to noon are a.m.','Morning = a.m.');},
],true);
// 2.MG.3 symmetry
addQ('g2_mg3',[
 QI('How many lines of symmetry does a square have?','4',['2','1','0'],'A square has 4 lines of symmetry: up, across and two diagonals.','Fold it different ways.'),
 QI('Which letter has a line of symmetry?','H',['F','J','L'],'H can be folded so both halves match.','Fold it down the middle.'),
 QI('Which picture has a line of symmetry?','a butterfly',['a shoe','the letter R','a question mark'],'A butterfly’s wings match on both sides.','Both sides match.'),
 QH('How many lines of symmetry does a circle have?','more than you can count',['1','2','0'],'Any line through the center splits a circle evenly.','Try folding a circle many ways.'),
 QH('Which word has a vertical line of symmetry for EVERY letter?','MOM',['DAD','CAT','BOB'],'M, O and M each have a vertical line of symmetry.','Check each letter.'),
 QH('How many lines of symmetry does a rectangle (that is not a square) have?','2',['4','1','0'],'Only up-and-down and side-to-side folds match.','Diagonal folds do not match.'),
 QH('Which number has a line of symmetry?','8',['2','4','7'],'8 can be folded across the middle and match.','Fold it top to bottom.'),
]);
// 2.MG.4 solids
addQ('g2_mg4',[
 QI('Which solid figure looks like a box of cereal?','rectangular prism',['sphere','cone','cylinder'],'A cereal box is a rectangular prism.','6 flat faces.'),
 QI('Which solid figure has no flat faces?','sphere',['cube','cylinder','cone'],'A sphere is round all over.','Think of a ball.'),
 QI('How many edges does a cube have?','12',['6','8','4'],'A cube has 12 edges.','Count the lines where faces meet.'),
 QH('Which solid can both roll and stack?','cylinder',['sphere','cube','pyramid'],'A cylinder rolls on its side and stacks on its flat ends.','It has flat and curved parts.'),
 QH('A square pyramid has how many faces?','5',['4','6','8'],'1 square base + 4 triangle faces = 5.','Count the base too.'),
 QH('Which has MORE vertices: a cube or a cone?','a cube',['a cone','they have the same','neither has any'],'A cube has 8 vertices; a cone has 1.','Count the corners.'),
 QH('What flat shape do you get if you trace the face of a cube?','square',['circle','triangle','rectangle that is long'],'All faces of a cube are squares.','Cube faces are all the same.'),
]);
// 2.PS.1 graphs
addGens('g2_ps1',[
 ()=>{const L=['Art','Music','Gym','Math'],c=L.map(()=>rng(3,12));const mx=Math.max(...c);const top=L[c.indexOf(mx)];if(c.filter(x=>x===mx).length>1)c[c.indexOf(mx)]++;const m2=Math.max(...c),t2=L[c.indexOf(m2)];return mq('g2_ps1',`Which class got the MOST votes?`,t2,L.filter(x=>x!==t2),`${t2} has the tallest bar (${m2}).`,'Find the tallest bar.',{dgSvg:dgBars(L,c,'#2D74DA','Favorite class')});},
]);
addGens('g2_ps1',[
 ()=>{const L=['Art','Music','Gym','Math'],c=L.map(()=>rng(3,12));const i=rng(0,3),j=(i+rng(1,3))%4;return mq('g2_ps1',`How many votes did ${L[i]} and ${L[j]} get together?`,c[i]+c[j],nearby(c[i]+c[j]),`${c[i]} + ${c[j]} = ${c[i]+c[j]}.`,'Read both bars, then add.',{dgSvg:dgBars(L,c,'#2FB37A','Favorite class')});},
 ()=>{const L=['Dogs','Cats','Fish','Birds'],c=L.map(()=>rng(2,6)*2);const tot=c.reduce((a,b)=>a+b,0);return mq('g2_ps1',`Each picture stands for 2 votes. How many votes in all?`,tot,[tot/2,tot+2,tot-2],`Add the votes: ${c.join(' + ')} = ${tot}.`,'Remember each picture is 2 votes.',{dgSvg:dgPicto(L,c.map(x=>x/2),'#E36B4E','Each ● = 2 votes')});},
 ()=>{const L=['Red','Blue','Green','Yellow'],c=L.map(()=>rng(4,14));const mn=Math.min(...c),mx=Math.max(...c);return mq('g2_ps1',`How many more votes did the most popular color get than the least popular?`,mx-mn,[mx,mn,mx+mn],`${mx} − ${mn} = ${mx-mn}.`,'Find the tallest and shortest bars.',{dgSvg:dgBars(L,c,'#9B5DE5','Favorite color')});},
],true);
// 2.PFA.1 patterns
addGens('g2_pfa1',[
 ()=>{const s=rng(150,300),d=pick([5,10,100]);return mq('g2_pfa1',`What is the rule? ${s}, ${s+d}, ${s+2*d}, ${s+3*d}`,`add ${d}`,[`add ${d===5?10:5}`,`subtract ${d}`,`add ${d*2}`],`Each number is ${d} more than the one before.`,'Subtract two numbers next to each other.');},
]);
addGens('g2_pfa1',[
 ()=>{const s=rng(2,10);const seq=[s,s+2,s+6,s+12];return mq('g2_pfa1',`What comes next? ${seq.join(', ')}, ___ (add 2, then 4, then 6…)`,s+20,[s+18,s+14,s+24],'The jumps grow by 2: +2, +4, +6, +8.','Look at how the jumps change.');},
 ()=>{const s=rng(60,99),d=pick([3,4,6]);return mq('g2_pfa1',`Find the missing number: ${s}, ${s-d}, ___, ${s-3*d}`,s-2*d,[s-2*d+1,s-d+1,s-2*d-d],`The rule is subtract ${d}: ${s-d} − ${d} = ${s-2*d}.`,'Is it going up or down?');},
 ()=>{const d=pick([2,5,10]),start=rng(1,20);const tenth=start+9*d;return mq('g2_pfa1',`A pattern starts at ${start} and adds ${d} each time. What is the 10th number?`,tenth,[start+10*d,start+8*d,10*d],`The 10th number is ${start} + 9 × ${d} = ${tenth}.`,'You add the rule 9 times to get to the 10th.');},
],true);
// Grade 2 reading
addQ('r2_ffr',[
 QI('Which word has the long e sound, like in “tree”?','beach',['bed','best','bell'],'The ea in beach says long e.','Long e says its name.'),
 QI('How many syllables are in “butterfly”?','3',['2','4','1'],'but-ter-fly has 3 syllables.','Clap each part.'),
 QI('Which word has the “ch” sound?','lunch',['ship','think','phone'],'Lunch ends with ch.','Ch sounds like a train: choo-choo.'),
 QI('Which word has the long o sound?','snow',['top','cot','hot'],'The ow in snow says long o.','Long o says its name.'),
 QH('Which word has the same vowel sound as “cow”?','house',['show','mop','cool'],'Cow and house both have the /ow/ sound.','Ow as in “ouch.”'),
 QH('Which word has a “ph” that sounds like f?','phone',['chip','shop','path'],'Ph says /f/ in phone.','Ph can sound like f.'),
 QH('How many syllables are in “watermelon”?','4',['3','2','5'],'wa-ter-mel-on has 4 syllables.','Clap each part.'),
 QH('Which word is split into syllables correctly?','rab-bit',['ra-bbit','rabb-it','r-abbit'],'Split between double consonants: rab-bit.','Split between the two b’s.'),
 QH('Which word has the r-controlled vowel “ar,” like in “car”?','star',['stair','stir','store'],'Star has the /ar/ sound like car.','Listen for “ar.”'),
 QH('Which word has a vowel team that makes the long a sound?','play',['plan','pat','pal'],'Ay in play says long a.','Look for ai or ay.'),
]);
addQ('r2_rv',[
 QI('What does the prefix “re-” mean in “reread”?','again',['not','before','under'],'Re- means again: read again.','Reread = read …'),
 QI('Which word is an antonym of “loud”?','quiet',['noisy','big','soft-colored'],'Loud and quiet are opposites.','Opposite of loud.'),
 QI('Which word is a synonym of “start”?','begin',['finish','stop','end'],'Start and begin mean the same.','Same meaning.'),
 QH('What does “unlock” mean?','to open a lock',['to lock again','to lock before','to break a lock'],'Un- means the opposite: unlock opens it.','Un- = not or opposite.'),
 QH('“The hikers were exhausted after climbing the mountain.” What does exhausted mean?','very tired',['very happy','very hungry','very cold'],'Climbing a mountain makes you very tired.','Use the clue “after climbing.”'),
 QH('What does the suffix “-ful” mean in “helpful”?','full of',['without','again','not'],'Helpful means full of help.','Careful, joyful, helpful…'),
 QH('Which word has a prefix that means “before”?','preview',['review','unhappy','careful'],'Pre- means before: see before.','Pre- = before.'),
 QH('“The tiny ant carried a crumb that was gigantic compared to its body.” Which word means the opposite of gigantic?','tiny',['ant','carried','body'],'Gigantic means huge; tiny means very small.','Find the opposite in the sentence.'),
 QH('Which word means “without fear”?','fearless',['fearful','fearing','feared'],'-less means without.','-less = without.'),
]);
const S2A='Maya wanted to win the art contest. She worked on her painting every day after school. Her little brother spilled juice on it the day before the contest. Maya was upset, but she did not give up. She stayed up late and painted a new picture of her family. She did not win first place, but the judges gave her a ribbon for “Most Heart.” Maya smiled. She was proud of herself.';
const S2B='Owl and Squirrel both wanted the last acorn on the oak tree. They argued all morning. While they argued, a jay flew down and took the acorn away. Owl looked at Squirrel. “If we had shared,” he said, “we would each have had half.”';
addQ('r2_rl',[
 QP(S2A,'What was Maya’s problem?','Juice spilled on her painting.',['She did not like art.','She lost her brushes.','Her brother won the contest.'],'Her brother spilled juice on her painting the day before.','What went wrong?'),
 QP(S2A,'What did Maya paint the second time?','her family',['a flower','her school','a dog'],'She painted a new picture of her family.','Look near the middle.'),
 QP(S2B,'What did Owl and Squirrel both want?','the last acorn',['the oak tree','a new home','the jay’s nest'],'They both wanted the last acorn.','Read the first sentence.'),
 QP(S2A,'Which word BEST describes Maya?','determined',['lazy','mean','careless'],'She did not give up and painted a new picture.','What did she do after the spill?',true),
 QP(S2A,'How did Maya change from the middle to the end?','She went from upset to proud.',['She went from proud to upset.','She was angry the whole time.','She stopped caring about art.'],'She was upset at first, then proud at the end.','Compare her feelings.',true),
 QP(S2B,'What is the lesson of this fable?','Sharing is better than arguing.',['Owls are smarter than squirrels.','Always eat acorns fast.','Jays are mean birds.'],'Owl says they would each have had half if they shared.','What does Owl say at the end?',true),
 QP(S2B,'Why did the jay get the acorn?','Owl and Squirrel were busy arguing.',['Owl gave it to the jay.','The jay was bigger.','Squirrel did not like acorns.'],'While they argued, the jay took it.','What were they doing?',true),
 QP(S2A,'Why did the judges give Maya a special ribbon?','Her painting showed love and effort.',['She painted the fastest.','She was the oldest.','Her painting was the biggest.'],'“Most Heart” rewards feeling and effort.','What does “Most Heart” mean?',true),
]);
const N2A='Spiders are not insects. Insects have six legs and three body parts. Spiders have eight legs and two body parts. Most spiders spin silk to make webs. The sticky web catches flies and other bugs for the spider to eat. Some spiders, like the wolf spider, do not make webs. They hunt for food on the ground.';
addQ('r2_ri',[
 QP(N2A,'How many legs does a spider have?','eight',['six','ten','four'],'Spiders have eight legs.','Find the number in sentence 3.'),
 QP(N2A,'What do spiders use to make webs?','silk',['mud','leaves','string from people'],'Spiders spin silk.','Read sentence 4.'),
 QP(N2A,'What is the main idea?','Spiders are different from insects and catch food in different ways.',['Wolf spiders are scary.','Flies are insects.','Webs are sticky.'],'The text compares spiders to insects and tells how they get food.','What is the whole text about?',true),
 QP(N2A,'How is a wolf spider different from most spiders?','It hunts on the ground instead of making a web.',['It has six legs.','It is an insect.','It eats leaves.'],'Wolf spiders hunt on the ground.','Read the last two sentences.',true),
 QP(N2A,'Which fact tells why a spider is NOT an insect?','It has eight legs and two body parts.',['It eats flies.','It lives outside.','It can be small.'],'Insects have 6 legs and 3 parts; spiders have 8 legs and 2 parts.','Compare the legs and body parts.',true),
 QI('Which text feature shows a picture with labels for each part?','a diagram',['a title','a page number','a table of contents'],'Diagrams use labels to name parts.','It has lines pointing to parts.'),
 QH('You want to know when frogs lay eggs. Which heading would help most?','Frog Life Cycle',['What Frogs Eat','Where Frogs Live','Frog Colors'],'The life cycle section would tell about eggs.','Eggs are part of growing up.'),
 QH('What is the author’s purpose in a book called “How to Plant a Garden”?','to teach the reader how to do something',['to make the reader laugh with a story','to sell seeds','to describe a dream'],'“How to” books teach steps.','“How to” means…'),
]);
// Grade 2 science
addQ('sc2_2',[
 QI('What is a force?','a push or a pull',['a kind of rock','a color','a sound'],'A force is a push or pull.','It makes things move.'),
 QI('Which will a magnet NOT attract?','a wooden block',['an iron nail','a steel paper clip','a metal washer made of iron'],'Magnets do not attract wood.','Magnets attract iron and steel.'),
 QI('A north pole and a south pole of two magnets are put close together. What happens?','They pull together (attract).',['They push apart.','Nothing happens.','They melt.'],'Opposite poles attract.','Opposites attract.'),
 QH('Why does a ball rolling on grass slow down and stop?','Friction from the grass slows it.',['Gravity pushes it forward.','Magnets pull it.','The ball gets tired.'],'Friction is a force that slows moving things.','Rough surfaces slow things.'),
 QH('A magnet can pull a paper clip through a sheet of paper. What does this show?','Magnetic force can act through some materials.',['Paper is magnetic.','Paper clips are made of paper.','Magnets only work on paper.'],'Magnetism can pass through thin paper.','The magnet did not touch the clip.'),
 QH('You throw a ball up. Why does it come back down?','Gravity pulls it toward Earth.',['Air pushes it down.','The ball is magnetic.','Friction pulls it.'],'Gravity pulls everything toward Earth.','What pulls things down?'),
 QH('Two toy cars are the same. One gets a gentle push and one gets a strong push. Which goes farther?','the one with the strong push',['the one with the gentle push','they go the same','neither moves'],'A bigger force makes more motion.','More push = more motion.'),
]);
addQ('sc2_3',[
 QI('Which is a solid?','a rock',['milk','air','steam'],'A solid keeps its own shape.','It does not flow.'),
 QI('A liquid takes the shape of its…','container',['color','smell','weight'],'Liquids flow to fill the shape of their container.','Pour juice into a cup.'),
 QI('Which is a gas?','the air in a balloon',['a pencil','orange juice','an ice cube'],'Air is a gas.','You cannot see it, but it fills the balloon.'),
 QH('What is it called when a liquid turns into a gas?','evaporation',['freezing','melting','condensation'],'Evaporation turns liquid water into water vapor.','Puddles disappear on sunny days.'),
 QH('Water droplets form on the outside of a cold glass. What is this called?','condensation',['evaporation','melting','boiling'],'Water vapor in the air cools and turns to liquid.','Gas turning to liquid.'),
 QH('A puddle is gone after a sunny day. Where did the water go?','It evaporated into the air.',['It froze.','It turned into rock.','A dog drank it all.'],'The sun’s heat made it evaporate.','Heat turns liquid into gas.'),
 QH('Which change can be undone by freezing?','melting ice into water',['burning paper','baking a cake','cooking an egg'],'Water can freeze back into ice.','Which one can go back?'),
]);
addQ('sc2_4',[
 {t:'order',q:'Put the life cycle of a plant in order.',items:['seed','sprout (seedling)','adult plant','flower makes new seeds'],e:'A seed sprouts, grows into a plant, and its flower makes new seeds.',h:'Start with the seed.'},
 {t:'order',q:'Put the life cycle of a chicken in order.',items:['egg','chick','young chicken','adult hen'],e:'Chickens hatch from eggs, grow as chicks, and become adults.',h:'What comes first?'},
 QI('What does a tadpole grow into?','a frog',['a fish','a butterfly','a turtle'],'Tadpoles grow legs and become frogs.','It lives in a pond.'),
 QI('What hatches from a butterfly egg?','a caterpillar (larva)',['a butterfly','a chrysalis','a bird'],'A caterpillar hatches from the egg.','It is long and crawls.'),
 QH('In which stage does a caterpillar change into a butterfly?','chrysalis (pupa)',['egg','adult','tadpole'],'Inside the chrysalis, the caterpillar changes.','It is wrapped up.'),
 QH('Which animal does NOT look like its parent when it is born?','a frog',['a puppy','a kitten','a calf'],'A tadpole looks very different from an adult frog.','Think of a tadpole.'),
 QH('Why do plants make seeds?','so new plants can grow',['so birds have toys','to keep the soil warm','to make the plant heavier'],'Seeds grow into new plants and continue the life cycle.','What do seeds grow into?'),
]);
addQ('sc2_5',[
 QI('Which animal lives in a desert habitat?','a camel',['a penguin','a whale','a beaver'],'Camels live in hot, dry deserts.','Where is it hot and dry?'),
 QI('Which habitat is very cold and icy?','the Arctic',['the desert','the rainforest','a pond'],'The Arctic is icy and cold.','Polar bears live there.'),
 QI('What do all habitats give animals?','food, water and shelter',['toys and games','money','cars'],'Habitats meet animals’ needs.','What do animals need?'),
 QH('A beaver builds a dam across a stream. How does this change the habitat?','It makes a pond where new plants and animals can live.',['It makes the stream disappear forever.','It turns the water into ice.','It makes the area a desert.'],'Beaver dams create ponds.','Water backs up behind the dam.'),
 QH('Why would a fish not survive in a desert?','It needs water to breathe and live.',['It is too hot for sand.','Fish only eat cactus.','Deserts have too much water.'],'Fish need water.','Where do fish live?'),
 QH('How does a cactus survive in the desert?','It stores water in its thick stem.',['It drinks from rivers.','It grows only in winter.','It has huge thin leaves.'],'Cacti store water for dry times.','Deserts are dry.'),
 QH('In a forest food chain, what does a rabbit eat?','plants',['foxes','hawks','rocks'],'Rabbits eat plants; foxes and hawks eat rabbits.','Rabbits are plant eaters.'),
]);
addQ('sc2_6',[
 QI('Which tool measures temperature?','a thermometer',['a rain gauge','a ruler','a scale'],'Thermometers measure how hot or cold it is.','Thermo- means heat.'),
 QI('Which tool measures wind speed?','an anemometer',['a thermometer','a rain gauge','a magnet'],'An anemometer has cups that spin in the wind.','It spins.'),
 QI('Which clouds are white and puffy, like cotton balls?','cumulus',['cirrus','stratus','fog'],'Cumulus clouds are puffy.','Puffy clouds.'),
 QH('What should you do if a tornado warning is announced?','Go to a basement or an inside room without windows.',['Go outside to look.','Stand by a window.','Get in a swimming pool.'],'Inside rooms on the lowest floor are safest.','Stay away from windows.'),
 QH('A thermometer reads 90°F. What would you wear?','shorts and a T-shirt',['a winter coat','snow boots','a wool hat'],'90°F is hot.','90 is a high number.'),
 QH('Thin, wispy clouds high in the sky are called…','cirrus',['cumulus','stratus','thunderheads'],'Cirrus clouds are thin and wispy.','They look like feathers.'),
 QH('Why do weather forecasters study the weather?','to help people prepare and stay safe',['to make it rain','to stop storms','to change the seasons'],'Forecasts help people plan and stay safe.','Why check the weather before a trip?'),
]);
addQ('sc2_7',[
 QI('What happens to many trees’ leaves in fall?','They change color and fall off.',['They grow bigger.','They turn into flowers.','Nothing happens.'],'Many trees drop leaves in fall.','Raking leaves.'),
 QI('Which season has the shortest days?','winter',['summer','spring','fall'],'Winter has the fewest daylight hours.','It gets dark early.'),
 QI('How can water change the land?','It can wash soil away (erosion).',['It makes mountains grow.','It turns sand to gold.','It makes rocks soft and fluffy.'],'Moving water carries soil away.','Think of rain on a hill.'),
 QH('Why do some animals grow thicker fur in fall?','to stay warm in winter',['to look nice','to swim faster','to hide in summer'],'Thicker fur keeps animals warm.','What is coming next?'),
 QH('A hill has no plants. After heavy rain, what is likely to happen?','Soil washes down the hill.',['The hill gets taller.','Flowers grow instantly.','Nothing changes.'],'Without roots, soil erodes easily.','What holds soil in place?'),
 QH('Why do many plants grow fast in spring?','There is more sunlight and warmer weather.',['It is colder.','There is less rain.','The days are shorter.'],'More sun and warmth help plants grow.','What do plants need?'),
]);
addQ('sc2_8',[
 QI('Which food comes from a plant?','an apple',['an egg','cheese','fish'],'Apples grow on trees.','Which grows on a tree?'),
 QI('Cotton clothes come from…','cotton plants',['sheep','rocks','oil'],'Cotton grows on plants.','The name tells you.'),
 QI('What do plants give off that people need to breathe?','oxygen',['smoke','sand','sugar'],'Plants give off oxygen.','We breathe it in.'),
 QH('How do trees help keep a hillside from washing away?','Their roots hold the soil in place.',['Their leaves stop the rain completely.','They make the hill taller.','They pull water uphill.'],'Roots hold soil and prevent erosion.','What is under the tree?'),
 QH('Which product does NOT come from plants?','a metal spoon',['paper','a cotton shirt','maple syrup'],'Metal comes from rocks (ore), not plants.','Which one is from the ground?'),
 QH('Why should people plant new trees after cutting some down?','to replace them for the future',['to make more plastic','to stop the rain','because trees are toys'],'Planting trees keeps the resource available.','Trees take years to grow.'),
]);
// Grade 2 writing
addQ('w2_w',[
 QI('Which word tells the order of steps?','Next',['Happy','Blue','Because'],'Next is an order word.','First, next, then, last.'),
 QI('Which sentence is a good ENDING for a story about a lost puppy?','At last, the puppy was home and safe.',['Once upon a time there was a puppy.','First, the puppy woke up.','Puppies have four legs.'],'Endings tell how things finished.','Which one finishes the story?'),
 QI('Which detail BEST fits a story about a day at the beach?','The waves splashed over my toes.',['I did my math homework.','It snowed all day.','We went to the dentist.'],'Waves fit the beach topic.','Stay on the topic.'),
 QH('Which sentence does NOT belong in a paragraph about how to brush your teeth?','My favorite color is green.',['First, put toothpaste on your brush.','Next, brush in small circles.','Last, rinse your mouth.'],'Your favorite color is off topic.','Which one is not a step?'),
 QH('Which sentence uses the best describing words?','The fluffy white kitten purred softly.',['The kitten.','The kitten was there.','A cat is a cat.'],'Fluffy, white and softly add detail.','Which paints a picture?'),
 QH('You are writing to tell your opinion about recess. Which is the best reason?','Recess helps us get exercise and rest our brains.',['Recess is at 11:00.','Our school has a playground.','I had recess yesterday.'],'A reason explains WHY.','Which one tells why recess is good?'),
 QH('Which is the best title for a story about a dog who learns to swim?','Rex Takes the Plunge',['My Lunch','Cats Are Fun','The Big Test'],'The title should match the story.','What is the story about?'),
]);
addQ('w2_lu',[
 QI('What is the contraction for “I am”?','I’m',['Im','I’am','Iam'],'I + am = I’m.','The apostrophe replaces the a.'),
 QI('What is the plural of “baby”?','babies',['babys','babyes','baby’s'],'Change y to i and add -es.','Y to i, add es.'),
 QI('Which word is an adjective?','shiny',['run','car','quickly'],'Shiny describes a noun.','It describes.'),
 QH('Which is correct? “The children ___ in the yard yesterday.”','played',['plays','play','playing'],'Yesterday means past tense: played.','When did it happen?'),
 QH('What is the plural of “mouse”?','mice',['mouses','mousies','meese'],'Mouse has an irregular plural: mice.','It changes completely.'),
 QH('Which sentence uses an apostrophe to show ownership correctly?','That is Sam’s backpack.',['That is Sams backpack.','That is Sams’ backpack.','That is Sam,s backpack.'],'Sam’s shows the backpack belongs to Sam.','Add ’s to show who owns it.'),
 QH('Which contraction means “they are”?','they’re',['their','there','theyr’e'],'They + are = they’re.','The apostrophe replaces the a.'),
 QH('Which sentence is a question?','Where did you put my book?',['I put the book on the desk.','Put the book away.','What a great book!'],'A question asks something and ends with ?','Which one asks?'),
]);
// Grade 2 history & social science
addQ('h2_1',[
 QI('Which is a responsibility at school?','doing your homework',['staying up late','eating candy','skipping class'],'Doing your work is a responsibility.','What are you expected to do?'),
 QI('Which is a right that Americans have?','freedom of speech',['the right to take things from others','the right to break laws','the right to skip all rules'],'Americans have freedom of speech.','You can say what you think.'),
 QH('Why do citizens vote?','to choose leaders and make decisions',['to get free toys','to skip school','to make the weather change'],'Voting lets people choose.','What happens in an election?'),
 QH('How can a second grader be a good citizen in their community?','pick up litter at the park',['write on walls','ignore neighbors','take things without asking'],'Helping the community is good citizenship.','What helps everyone?'),
 QH('Why is it important to respect people who are different from you?','Everyone deserves fair and kind treatment.',['So you can win games.','Because it is a law to be the same.','It is not important.'],'Respect helps a community work together.','How would you want to be treated?'),
 QH('Which is BOTH a right and a responsibility?','voting',['eating dessert','watching TV','going on vacation'],'Voting is a right, and citizens should use it responsibly.','Citizens are expected to do it.'),
]);
addQ('h2_4',[
 QI('What city is the capital of Virginia?','Richmond',['Norfolk','Virginia Beach','Washington, D.C.'],'Richmond is Virginia’s capital.','It is on the James River.'),
 QI('What is the Virginia state bird?','the cardinal',['the bald eagle','the robin','the blue jay'],'The cardinal is Virginia’s state bird.','It is bright red.'),
 QI('Where do the President and family live?','the White House',['the Capitol','the Lincoln Memorial','Monticello'],'The President lives in the White House.','It is a white building.'),
 QH('In which city is the Liberty Bell?','Philadelphia',['Richmond','Boston','New York City'],'The Liberty Bell is in Philadelphia.','The Declaration was signed there too.'),
 QH('Where does Congress meet to make laws?','the U.S. Capitol',['the White House','the Statue of Liberty','Mount Vernon'],'Congress meets in the Capitol building.','It has a big dome.'),
 QH('What is the Virginia state flower?','American dogwood',['rose','sunflower','tulip'],'The dogwood is Virginia’s state flower and tree.','It blooms in spring.'),
 QH('The Statue of Liberty was a gift from which country?','France',['England','Spain','Canada'],'France gave the Statue of Liberty to the U.S.','A country in Europe.'),
]);
addQ('h2_5',[
 QI('What did Eastern Woodlands peoples often build homes from?','trees and bark',['adobe bricks','snow blocks','buffalo skins only'],'They used wood and bark from forests.','They lived in forests.'),
 QI('Which region has a hot, dry climate where the Pueblo lived?','the Southwest',['the Eastern Woodlands','the Arctic','the Plains'],'The Pueblo lived in the hot, dry Southwest.','Desert land.'),
 QH('Why did many Plains peoples live in tipis?','Tipis could be moved to follow the buffalo.',['Tipis were made of stone.','They never moved.','Tipis kept out snow better than houses.'],'Tipis were portable homes.','They followed the buffalo herds.'),
 QH('How did the environment affect what Pueblo people built?','They used clay and mud (adobe) because there were few trees.',['They used ice.','They used lots of wood from forests.','They used metal.'],'The Southwest had clay and few trees.','What was available?'),
 QH('Which crop was important to many Indigenous peoples, including the Powhatan and Pueblo?','corn',['wheat from Europe','rice only','oranges'],'Corn (maize) was a key crop.','It is yellow and grows on stalks.'),
 QH('How did the Lakota use the buffalo?','for food, clothing, tools and shelter',['only for rides','only as pets','they did not use buffalo'],'They used nearly every part of the buffalo.','Think of many uses.'),
]);
addQ('h2_6',[
 QI('Christopher Columbus sailed for which country?','Spain',['England','France','Portugal'],'Spain paid for Columbus’s voyage.','King Ferdinand and Queen Isabella.'),
 QI('Which country explored and claimed land in Canada?','France',['Spain','China','Mexico'],'French explorers claimed land in Canada.','Think of Quebec.'),
 QH('What were explorers hoping to find?','new trade routes, riches and land',['snow','new holidays','dinosaurs'],'Explorers wanted riches, land and routes to Asia.','Why take a long, risky trip?'),
 QH('Why was sailing across the ocean dangerous in the 1400s and 1500s?','Storms, sickness and running out of food',['There were too many airplanes.','Ships had engines that broke.','The ocean was frozen.'],'Long voyages were risky.','Wooden ships and long trips.'),
 QH('What did Europeans bring to the Americas that changed life there?','horses and new diseases',['airplanes','cars','computers'],'Europeans brought horses and also diseases.','Think of animals.'),
]);
addQ('h2_7',[
 QI('Who was the leader of the army during the American Revolution?','George Washington',['Paul Revere','James Madison','Patrick Henry'],'Washington led the Continental Army.','He became the first president.'),
 QI('Patrick Henry was a famous…','speaker who wanted freedom',['inventor','pilot','baseball player'],'He gave famous speeches for liberty.','“Give me liberty…”'),
 QH('Why is James Madison called the “Father of the Constitution”?','He helped write and plan the Constitution.',['He was the first president.','He rode a horse at night.','He found gold.'],'Madison did much of the work on the Constitution.','The Constitution is a plan for government.'),
 QH('What message did Paul Revere carry?','that British soldiers were coming',['that the war was over','that gold was found','that school was closed'],'He warned colonists the British were coming.','He rode at night.'),
 QH('What did these leaders want for the colonies?','freedom from British rule',['to join France','to have a king','to move to Canada'],'They wanted independence from Britain.','What was the Revolution about?'),
]);
addQ('h2_8',[
 QI('What year was the Declaration of Independence adopted?','1776',['1492','1607','1865'],'July 4, 1776.','The year we celebrate on July 4.'),
 QI('Which country ruled the 13 colonies before independence?','Great Britain',['Spain','France','Mexico'],'The colonies belonged to Great Britain.','King George III.'),
 QH('Why were colonists angry with Great Britain?','They had to pay taxes without having a vote.',['They wanted more taxes.','They wanted a king.','They wanted to move back to England.'],'“No taxation without representation.”','Taxes and no say.'),
 QH('What did the Declaration of Independence tell the world?','The colonies were free from Great Britain.',['The colonies joined France.','The war was over.','The colonists wanted a king.'],'It declared independence.','Declare = announce.'),
 QH('Which document describes how the U.S. government works?','the Constitution',['the Declaration of Independence','the Pledge of Allegiance','a map'],'The Constitution is the plan for government.','It begins “We the People.”'),
]);
addQ('h2_9',[
 QI('Which president bought the Louisiana Territory?','Thomas Jefferson',['George Washington','Abraham Lincoln','James Madison'],'Jefferson made the Louisiana Purchase in 1803.','He wrote the Declaration too.'),
 QI('What did the Louisiana Purchase do to the size of the U.S.?','It almost doubled it.',['It made it smaller.','Nothing changed.','It cut it in half.'],'It nearly doubled the country.','It was a huge area.'),
 QH('Why did Lewis and Clark explore the West?','to map the land and learn about its people, plants and animals',['to find a new ocean only','to start a war','to build a city'],'They explored and mapped the new land.','What would Jefferson want to know?'),
 QH('How did Sacagawea help Lewis and Clark?','She guided them and helped them talk with Native peoples.',['She built their boats.','She was a soldier.','She drew all the maps alone.'],'She was a guide and interpreter.','She knew the land and languages.'),
 QH('Why was Washington, D.C. chosen as the capital?','It was in a central spot between the North and South.',['It was the biggest city.','It was in Canada.','It had the most gold.'],'It was chosen as a middle location.','Think about fairness.'),
]);
addQ('h2_10',[
 QI('Who invented the telephone?','Alexander Graham Bell',['Thomas Edison','the Wright brothers','George Washington Carver'],'Bell invented the telephone.','Bell → telephone ring.'),
 QI('Who was the first American woman in space?','Sally Ride',['Rosa Parks','Amelia Earhart','Neil Armstrong'],'Sally Ride flew in 1983.','Her name sounds like a trip.'),
 QI('Who was a famous pilot who flew across the Atlantic Ocean alone?','Amelia Earhart',['Sally Ride','Rosa Parks','Thomas Edison'],'Earhart flew solo across the Atlantic.','She was a pilot.'),
 QH('Why is Jackie Robinson important?','He helped end segregation in baseball.',['He invented baseball.','He flew to the moon.','He wrote the Constitution.'],'He broke the color barrier in Major League Baseball.','Think fairness in sports.'),
 QH('What do Thomas Edison and Alexander Graham Bell have in common?','Both were inventors.',['Both were presidents.','Both were astronauts.','Both played baseball.'],'Both invented important things.','Light bulb and telephone.'),
 QH('How did Rosa Parks help change unfair laws?','She peacefully refused to give up her bus seat.',['She became president.','She invented the bus.','She moved to another country.'],'Her peaceful protest helped start the Montgomery Bus Boycott.','What did she do on the bus?'),
]);
addQ('h2_11',[
 QI('Which ocean is on the EAST coast of the United States?','Atlantic Ocean',['Pacific Ocean','Arctic Ocean','Indian Ocean'],'The Atlantic is on the east coast.','Virginia’s beaches touch it.'),
 QI('Which country is SOUTH of the United States?','Mexico',['Canada','Brazil','Spain'],'Mexico is south of the U.S.','Look below the U.S. on a map.'),
 QI('How many continents are there?','7',['5','4','10'],'There are 7 continents.','Africa, Asia, Europe…'),
 QH('Which mountains are in the WESTERN United States?','the Rocky Mountains',['the Appalachian Mountains','the Blue Ridge','the Alps'],'The Rockies are in the west.','They are very tall.'),
 QH('Which river flows from the north to the Gulf of Mexico?','the Mississippi River',['the James River','the Nile River','the Amazon River'],'The Mississippi flows south to the Gulf.','The longest U.S. river.'),
 QH('On which continent is the United States?','North America',['South America','Europe','Asia'],'The U.S. is in North America.','With Canada and Mexico.'),
 QH('Which is the largest ocean?','Pacific Ocean',['Atlantic Ocean','Indian Ocean','Arctic Ocean'],'The Pacific is the largest ocean.','West of the U.S.'),
]);
addQ('h2_12',[
 QI('Which memorial is a tall white tower honoring the first president?','the Washington Monument',['the Lincoln Memorial','the Statue of Liberty','the Liberty Bell'],'The Washington Monument is a tall obelisk.','It is very tall.'),
 QI('Where is Yellowstone National Park famous for geysers like Old Faithful?','in the western U.S. (mostly Wyoming)',['in Virginia','in Florida','in Canada'],'Yellowstone is mostly in Wyoming.','It is in the West.'),
 QH('Why is Valley Forge important?','Washington’s army survived a hard winter there and grew stronger.',['The war ended there.','It was the first capital.','It is where the Declaration was signed.'],'The army trained and survived there.','A hard winter, 1777–1778.'),
 QH('Why do we build memorials?','to remember and honor important people and events',['to make money','to block roads','for people to live in'],'Memorials help us remember.','Memorial = remember.'),
 QH('Which landmark honors President Abraham Lincoln and shows a large statue of him sitting?','the Lincoln Memorial',['Mount Rushmore','the White House','the Capitol'],'The Lincoln Memorial has a giant seated statue.','It has his name.'),
]);
addQ('h2_13',[
 QI('What are natural resources?','things from nature that people use',['things made in factories','toys','money'],'Water, trees and soil are natural resources.','They come from nature.'),
 QI('Which is a capital resource?','a hammer',['a tree','a river','a teacher'],'Tools made by people are capital resources.','Something made to help do work.'),
 QI('What is a consumer?','someone who buys or uses goods and services',['someone who only makes things','a kind of tree','a bank'],'Consumers buy and use things.','You are a consumer when you buy a snack.'),
 QH('Why did people barter long ago?','They traded goods they had for goods they needed.',['They had too much money.','Barter was a holiday.','They liked to argue.'],'Barter is trading without money.','No money? Trade!'),
 QH('What does scarcity mean?','not having enough of something for everyone',['having too much','a kind of money','a holiday'],'Scarcity means limited resources.','There is not enough.'),
 QH('A baker uses flour, an oven and her skills to make bread. Which is the HUMAN resource?','the baker',['the flour','the oven','the bread'],'Human resources are people doing work.','Which one is a person?'),
 QH('You have $3. You want a book for $3 and a toy for $3. What must you do?','choose one',['buy both','take both','get both for free'],'Scarcity means you must make a choice.','You only have enough for one.'),
]);
})();

