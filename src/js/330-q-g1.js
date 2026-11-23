// ── GRADE 1: extra questions and Challenge questions ──
(function(){
const NAMES=['Ava','Luca','Mia','Sam','Zoe','Eli','Nia','Max','Ivy','Ben'];
// 1.NS.1 counting & coins
addGens('g1_ns1',[
 ()=>{const n=rng(20,118);return mq('g1_ns1',`What number comes just BEFORE ${n}?`,n-1,[n+1,n-10,n-2],`One less than ${n} is ${n-1}.`,'Count back one.');},
 ()=>{const t=rng(1,11),o=rng(0,9),n=t*10+o;return mq('g1_ns1',`How many tens and ones are in ${n}?`,`${t} tens, ${o} ones`,[`${o} tens, ${t} ones`,`${t} tens, ${o+1} ones`,`${t+1} tens, ${o} ones`],`${n} = ${t*10} + ${o}, so ${t} tens and ${o} ones.`,'The left digit(s) tell the tens.');},
]);
addGens('g1_ns1',[
 ()=>{const q=rng(1,3),d=rng(1,4),n=rng(0,3),p=rng(0,4),v=q*25+d*10+n*5+p;return mq('g1_ns1',`${pick(NAMES)} has ${q} quarter${q>1?'s':''}, ${d} dime${d>1?'s':''}, ${n} nickel${n!==1?'s':''}, and ${p} penn${p===1?'y':'ies'}. How many cents?`,v,[v+5,v-5,v+10,v-1],`Quarters ${q*25}¢ + dimes ${d*10}¢ + nickels ${n*5}¢ + pennies ${p}¢ = ${v}¢.`,'Count the biggest coins first.');},
 ()=>{const s=pick([2,5,10]),start=s*rng(2,8),a=start+s*3;return mq('g1_ns1',`Count by ${s}s: ${start}, ${start+s}, ___, ${start+3*s}. What number is missing?`,start+2*s,[start+2*s+1,start+s+1,a+s],`Each step adds ${s}: ${start+s} + ${s} = ${start+2*s}.`,`Add ${s} each time.`);},
 ()=>{const n=rng(30,110);return mq('g1_ns1',`Count by 10s starting at ${n}. What is the 3rd number you say after ${n}?`,n+30,[n+3,n+20,n+40],`${n} → ${n+10} → ${n+20} → ${n+30}.`,'Add 10 three times.');},
],true);
// 1.NS.2 compare
addGens('g1_ns2',[
 ()=>{const a=rng(10,119);return mq('g1_ns2',`Which number is between ${a} and ${a+2}?`,a+1,[a-1,a+3,a+10],`${a} < ${a+1} < ${a+2}.`,'Count from the smaller number.');},
 ()=>{const s=shuf([rng(10,40),rng(41,80),rng(81,120)]);const lo=Math.min(...s);return mq('g1_ns2',`Which number is the SMALLEST? ${s.join(', ')}`,lo,s.filter(x=>x!==lo).concat([lo+1]),`${lo} has the fewest tens.`,'Compare the tens first.');},
]);
addGens('g1_ns2',[
 ()=>{const a=rng(2,9),b=rng(0,9),n=a*10+b,ten=n+10,one=n-1;return mq('g1_ns2',`Start at ${n}. Add 10, then take away 1. Where do you end?`,ten-1,[ten,one,n+9+1,n+1],`${n} + 10 = ${ten}. ${ten} − 1 = ${ten-1}.`,'Do one step at a time.');},
 ()=>{const s=[rng(20,49),rng(50,79),rng(80,119)];const o=shuf(s.slice());return mq('g1_ns2',`Put in order from least to greatest: ${o.join(', ')}`,s.join(', '),[s.slice().reverse().join(', '),[s[1],s[0],s[2]].join(', '),[s[0],s[2],s[1]].join(', ')],`Least to greatest: ${s.join(', ')}.`,'Find the smallest first.');},
 ()=>{const t=rng(3,9),o=rng(1,8);const n=t*10+o;return mq('g1_ns2',`I have ${t} tens and ${o} ones. Which number is 1 more than me?`,n+1,[n-1,n+10,o*10+t+1],`${t} tens ${o} ones = ${n}. One more is ${n+1}.`,'Build the number first.');},
],true);
// 1.NS.3 halves & fourths
addQ('g1_ns3',[
 QI('A cookie is cut into 2 equal pieces. How many halves make the whole cookie?','2',['1','3','4'],'Two halves make one whole.','Count the equal pieces.'),
 QI('Which picture shows halves?','A circle cut into 2 equal parts',['A circle cut into 2 different-size parts','A circle cut into 4 equal parts','A circle with no lines'],'Halves are 2 EQUAL parts.','The parts must be the same size.'),
 QI('A pizza is cut into 4 equal slices. You eat 1. What part did you eat?','one fourth',['one half','one whole','two fourths'],'1 of 4 equal parts is one fourth.','How many equal parts are there?'),
 QI('Which is bigger: one half of a pie or one fourth of the same pie?','one half',['one fourth','they are the same','you cannot tell'],'Fewer pieces means each piece is bigger. Half is bigger than a fourth.','2 pieces or 4 pieces — which pieces are bigger?'),
 QH('4 friends share 2 sandwiches fairly. How much does each friend get?','half of a sandwich',['one whole sandwich','one fourth of a sandwich','two sandwiches'],'Cut each sandwich in half: 4 halves for 4 friends.','Cut each sandwich so there are 4 pieces.'),
 QH('A rectangle is cut into 4 equal parts. 2 parts are shaded. What is another name for 2 fourths?','one half',['one fourth','one whole','two halves'],'2 of 4 equal parts is the same as half.','Is it half of the shape?'),
 QH('Which is NOT cut into fourths?','A square cut into 4 pieces of different sizes',['A square cut into 4 equal squares','A circle cut into 4 equal slices','A rectangle cut into 4 equal strips'],'Fourths must be 4 EQUAL parts.','Look for parts that are not equal.'),
 QH('You have one half of an apple. How many more halves do you need for a whole apple?','1',['2','0','4'],'Two halves make a whole. You have 1, so you need 1 more.','How many halves make a whole?'),
]);
// 1.CE.1 add & subtract
addGens('g1_ce1',[
 ()=>{const a=rng(5,15),b=rng(1,a-1),n=pick(NAMES);return mq('g1_ce1',`${n} had ${a} balloons. ${b} flew away. How many are left?`,a-b,nearby(a-b).concat([a+b]),`${a} − ${b} = ${a-b}.`,'"Flew away" means take away.');},
 ()=>{const a=rng(2,10),b=rng(2,10);return mq('g1_ce1',`___ − ${b} = ${a}`,a+b,[a,b,a+b+1,a+b-1],`${a} + ${b} = ${a+b}, so ${a+b} − ${b} = ${a}.`,'Think addition: what number minus the second number gives the answer?');},
]);
addGens('g1_ce1',[
 ()=>{const a=rng(3,8),b=rng(2,6),c=rng(1,a+b-1),n=pick(NAMES);return mq('g1_ce1',`${n} has ${a} red cars and ${b} blue cars. ${n} gives away ${c}. How many cars now?`,a+b-c,[a+b,a+b-c+1,a-c+b+2,a+b+c].filter(x=>x>=0),`${a} + ${b} = ${a+b}. ${a+b} − ${c} = ${a+b-c}.`,'Add first, then take away.');},
 ()=>{const a=rng(6,12),b=rng(1,a-2);const n1=pick(NAMES),n2=pick(NAMES.filter(x=>x!==n1));return mq('g1_ce1',`${n1} has ${a} stickers. ${n2} has ${b}. How many MORE does ${n1} have?`,a-b,[a+b,a,b,a-b+1],`Compare: ${a} − ${b} = ${a-b}.`,'"How many more" means subtract.');},
 ()=>{const a=rng(2,9),b=rng(2,9),c=rng(1,9);return mq('g1_ce1',`${a} + ${b} + ${c} = ?`,a+b+c,[a+b+c+1,a+b+c-1,a+b,a+b+c+10],`${a} + ${b} = ${a+b}, + ${c} = ${a+b+c}.`,'Look for a 10 to make it easier.');},
 ()=>{const t=rng(11,19),a=rng(2,9);return mq('g1_ce1',`Which number sentence is TRUE?`,`${a} + ${t-a} = ${t}`,[`${a} + ${t-a} = ${t+1}`,`${t} − ${a} = ${t-a+1}`,`${a} + ${t} = ${t-a}`],`${a} + ${t-a} = ${t}.`,'Check each one.');},
],true);
// 1.MG.1 length
addGens('g1_mg1',[
 ()=>{const a=rng(3,9),b=rng(3,9),c=rng(3,9);const L={'ribbon':a,'string':b,'rope':c};const items=Object.keys(L);const mx=items.reduce((x,y)=>L[x]>=L[y]?x:y);
  if(new Set([a,b,c]).size<3)return mq('g1_mg1',`A shoe is ${a+2} blocks long. A sock is ${a} blocks long. Which is longer?`,'the shoe',['the sock','they are the same'],`${a+2} > ${a}.`,'More blocks means longer.');
  return mq('g1_mg1',`A ribbon is ${a} cubes long, a string is ${b} cubes, and a rope is ${c} cubes. Which is the LONGEST?`,`the ${mx}`,items.filter(x=>x!==mx).map(x=>'the '+x),`The ${mx} has the most cubes: ${L[mx]}.`,'Find the biggest number.');},
]);
addGens('g1_mg1',[
 ()=>{const a=rng(4,9);return mq('g1_mg1',`A book is ${a} paper clips long. A desk is ${a} paper clips longer than the book. How long is the desk?`,2*a,[a,a+1,2*a+1],`${a} + ${a} = ${2*a} paper clips.`,'Add the extra length.');},
 ()=>{return mq('g1_mg1','Sam measured a pencil with paper clips and got 5. Kim measured it with tiny beads. Will Kim get a bigger or smaller number?','bigger',['smaller','the same','zero'],'Smaller units fit more times, so the number is bigger.','More little things fit along it.');},
 ()=>{return mq('g1_mg1',`A crayon is longer than a marker. A pen is shorter than the marker. Which is the SHORTEST?`,'the pen',['the crayon','the marker','they are all the same'],'Crayon > marker > pen, so the pen is shortest.','Put them in order.');},
],true);
// 1.MG.2 shapes
addQ('g1_mg2',[
 QI('How many corners does a triangle have?','3',['4','2','0'],'A triangle has 3 sides and 3 corners.','Tri means three.'),
 QI('Which shape has 4 equal sides?','square',['rectangle that is long and thin','triangle','circle'],'A square has 4 equal sides.','All sides match.'),
 QI('A can of soup is shaped like a…','cylinder',['cube','cone','sphere'],'A can has two circle faces and a curved side: a cylinder.','Look at the top and the side.'),
 QI('A ball is shaped like a…','sphere',['cube','cylinder','cone'],'A ball is round all over: a sphere.','Round everywhere.'),
 QI('An ice cream cone is shaped like a…','cone',['cylinder','cube','sphere'],'A cone has a circle on one end and a point on the other.','It comes to a point.'),
 QH('How many corners do 2 squares have in all?','8',['4','6','10'],'Each square has 4 corners: 4 + 4 = 8.','Count corners on one square, then double.'),
 QH('A shape has 3 sides. One side is longer. Is it still a triangle?','yes',['no','only if all sides match','only if it is upside down'],'Any closed shape with 3 straight sides is a triangle.','What makes a triangle a triangle?'),
 QH('You put two triangles together along a side. Which shape can you make?','a square',['a circle','a cone','a sphere'],'Two right triangles can make a square (or rectangle).','Picture cutting a square corner to corner.'),
 QH('Which flat shape is on the bottom of a cylinder?','circle',['square','triangle','rectangle'],'A cylinder has a circle on each end.','Think of a can.'),
 QH('How many more sides does a hexagon have than a square?','2',['1','3','6'],'A hexagon has 6 sides; a square has 4. 6 − 4 = 2.','Hexagon: 6 sides.'),
]);
// 1.MG.3 time & calendar
addGens('g1_mg3',[
 ()=>{const i=rng(0,6);return mq('g1_mg3',`What day comes right BEFORE ${DAYS[i]}?`,DAYS[(i+6)%7],DAYS.filter((d,j)=>j!==(i+6)%7&&j!==i).slice(0,4),`Before ${DAYS[i]} is ${DAYS[(i+6)%7]}.`,'Say the days backward.');},
 ()=>{const i=rng(0,11);return mq('g1_mg3',`Which month comes right after ${MONTHS[i]}?`,MONTHS[(i+1)%12],[MONTHS[(i+2)%12],MONTHS[(i+11)%12],MONTHS[(i+6)%12]],`After ${MONTHS[i]} comes ${MONTHS[(i+1)%12]}.`,'Say the months in order.');},
]);
addGens('g1_mg3',[
 ()=>{const h=rng(1,10);return mq('g1_mg3',`It is ${h}:00. What time will it be in 2 hours?`,tm(h+2,0),[tm(h+1,0),tm(h+3,0),tm(h,30)],`${h} o’clock plus 2 hours is ${h+2} o’clock.`,'Count 2 hours forward.');},
 ()=>{const i=rng(0,6);return mq('g1_mg3',`Today is ${DAYS[i]}. What day will it be in 2 days?`,DAYS[(i+2)%7],[DAYS[(i+1)%7],DAYS[(i+3)%7],DAYS[(i+6)%7]],`Count 2 days ahead: ${DAYS[(i+1)%7]}, ${DAYS[(i+2)%7]}.`,'Count forward on the calendar.');},
 ()=>{const h=rng(1,11);return mq('g1_mg3',`School lunch starts at ${h}:00 and lasts half an hour. When does it end?`,tm(h,30),[tm(h+1,0),tm(h,0),tm(h+1,30)],`Half an hour after ${h}:00 is ${tm(h,30)}.`,'Half an hour is 30 minutes.');},
],true);
// 1.PS.1 picture graphs
addGens('g1_ps1',[
 ()=>{const L=['Dogs','Cats','Fish'],c=[rng(2,6),rng(2,6),rng(2,6)];const tot=c[0]+c[1]+c[2];return mq('g1_ps1',`A class voted for pets: Dogs ${c[0]}, Cats ${c[1]}, Fish ${c[2]}. How many children voted in all?`,tot,nearby(tot),`${c[0]} + ${c[1]} + ${c[2]} = ${tot}.`,'Add all the votes.',{dgSvg:dgPicto(L,c,'#2D74DA')});},
]);
addGens('g1_ps1',[
 ()=>{const L=['Red','Blue','Green'],c=[rng(3,8),rng(3,8),rng(3,8)];const tot=c[0]+c[1]+c[2];const extra=rng(1,4);return mq('g1_ps1',`Red ${c[0]}, Blue ${c[1]}, Green ${c[2]}. Then ${extra} more ${extra===1?'child votes':'children vote'} Blue. How many votes does Blue have now?`,c[1]+extra,[c[1],c[1]+extra+1,tot],`${c[1]} + ${extra} = ${c[1]+extra}.`,'Add the new votes to Blue.',{dgSvg:dgPicto(L,c,'#2FB37A')});},
 ()=>{const L=['Apple','Pear','Plum'];let c=[rng(2,9),rng(2,9),rng(2,9)];const mn=Math.min(...c),mx=Math.max(...c);return mq('g1_ps1',`Apple ${c[0]}, Pear ${c[1]}, Plum ${c[2]}. How many more chose the MOST popular fruit than the LEAST popular?`,mx-mn,[mx,mn,mx+mn],`Most ${mx} − least ${mn} = ${mx-mn}.`,'Find the biggest and smallest first.',{dgSvg:dgPicto(L,c,'#E36B4E')});},
],true);
// 1.PFA.1 patterns
addGens('g1_pfa1',[
 ()=>{const s=rng(30,90),d=pick([2,5,10]);return mq('g1_pfa1',`What comes next? ${s+3*d}, ${s+2*d}, ${s+d}, ___`,s,[s+d,s-1,s-d*2],`The numbers go down by ${d}.`,'Are the numbers getting bigger or smaller?');},
]);
addGens('g1_pfa1',[
 ()=>{const a=pick(['star','moon','sun']),b=pick(['heart','tree','cloud']);return mq('g1_pfa1',`The pattern is ${a}, ${a}, ${b}, ${a}, ${a}, ${b}… What is the 9th shape?`,b,[a,'circle'],`The pattern repeats every 3: ${a}, ${a}, ${b}. Shapes 3, 6 and 9 are all ${b}.`,'Find the part that repeats.');},
 ()=>{const s=rng(1,5);return mq('g1_pfa1',`A growing pattern: ${s}, ${s+1}, ${s+3}, ${s+6}, ___ (add 1, then 2, then 3…)`,s+10,[s+9,s+8,s+12],`Add 1, 2, 3, then 4: ${s+6} + 4 = ${s+10}.`,'What do you add each time?');},
 ()=>{const s=rng(10,40);return mq('g1_pfa1',`Find the missing number: ${s}, ${s+5}, ___, ${s+15}, ${s+20}`,s+10,[s+6,s+11,s+9],`The rule is +5: ${s+5} + 5 = ${s+10}.`,'What is the rule?');},
],true);
// 1.FFR phonics
addQ('r1_ffr',[
 QI('Which word rhymes with “sun”?','fun',['sit','sand','map'],'Sun and fun both end in -un.','Listen to the ending sound.'),
 QI('Which word begins with the same sound as “fish”?','fan',['van','dish','pan'],'Fish and fan both start with /f/.','Say the first sound.'),
 QI('Which word has the short i sound, like in “pig”?','sit',['bike','sun','cake'],'Sit has short i, like pig.','Listen to the middle sound.'),
 QI('Which word ends with the same sound as “bus”?','yes',['bun','bug','bud'],'Bus and yes both end with /s/.','Say the last sound.'),
 QI('Change the last letter of “cat” to “p.” What word do you make?','cap',['cot','cut','pat'],'c-a-t → c-a-p.','Only the last sound changes.'),
 QI('Which word starts with “sh”?','ship',['chip','sip','hip'],'Ship starts with the sh sound.','Sh sounds like “shhh.”'),
 QH('Which word has a long a sound, like in “cake”?','rain',['ran','cat','hat'],'The ai in rain makes the long a sound.','Long a says its own name.'),
 QH('How many sounds are in the word “stop”? (s-t-o-p)','4',['3','2','5'],'s-t-o-p has 4 sounds.','Tap a finger for each sound.'),
 QH('Which two words rhyme?','bike, hike',['bike, bake','hike, hat','bake, book'],'Bike and hike both end in -ike.','Match the ending sounds.'),
 QH('Add “s” to the front of “nap.” What word do you make?','snap',['naps','spin','pans'],'s + nap = snap.','Put the new sound first.'),
 QH('Which word has the same vowel sound as “boat”?','road',['rod','bat','bit'],'Boat and road both have the long o sound (oa).','oa says /ō/.'),
 QH('Which word has a silent e at the end?','kite',['kit','kitten','kid'],'Kite ends with a silent e that makes the i say its name.','Look for e at the end.'),
]);
// 1.RV vocabulary
addQ('r1_rv',[
 QI('What is the opposite of “up”?','down',['top','high','over'],'Up and down are opposites.','Think of a ball going…'),
 QI('Which word means the same as “happy”?','glad',['sad','mad','tired'],'Happy and glad mean almost the same.','Find a word with the same feeling.'),
 QI('Which two words make “rainbow”?','rain + bow',['ra + inbow','rai + nbow','rainb + ow'],'Rain + bow = rainbow.','Find two small words.'),
 QI('Which word is an animal?','horse',['house','happy','hop'],'A horse is an animal.','Which one is alive and has four legs?'),
 QI('What is the opposite of “fast”?','slow',['quick','run','far'],'Fast and slow are opposites.','A turtle is…'),
 QH('“The puppy was tiny.” What does tiny mean?','very small',['very big','very loud','very fast'],'Tiny means very small.','Think of a baby puppy.'),
 QH('Which word does NOT belong: apple, banana, carrot, grape?','carrot',['apple','banana','grape'],'A carrot is a vegetable; the others are fruits.','Which one is not a fruit?'),
 QH('“I jumped in the puddle and my socks got soggy.” What does soggy mean?','very wet',['very dry','very warm','very clean'],'Puddles make socks wet. Soggy means very wet.','Use the clue “puddle.”'),
 QH('Which word means the OPPOSITE of “empty”?','full',['open','clean','light'],'An empty cup has nothing; a full cup has lots.','Think of a cup.'),
 QH('Which compound word means a ball you kick with your foot?','football',['baseball','snowball','eyeball'],'Foot + ball = football.','Which word has “foot” in it?'),
 QH('Which word goes with “bark, wag, fetch”?','dog',['cat','fish','bird'],'Dogs bark, wag their tails and fetch.','Which animal does all three?'),
]);
// 1.RL stories
const R1A='Lily planted a seed in a pot. Every day she gave it water and put it by the sunny window. After a week, a tiny green sprout poked out. Lily clapped her hands. “It is growing!” she said.';
const R1B='Tom’s kite got stuck in a tall tree. He tried to jump, but he could not reach it. His big sister came with a long stick. She gently pushed the kite down. Tom said, “Thank you!” and ran to fly it again.';
const R1C='It was a snowy day. Rosa put on her coat, hat and mittens. She built a snowman with a carrot nose. When the sun came out in the afternoon, the snowman began to melt. Rosa decided to build a smaller one in the shade.';
addQ('r1_rl',[
 QP(R1A,'What did Lily plant?','a seed',['a tree','a flower she bought','a carrot'],'The story says Lily planted a seed in a pot.','Look at the first sentence.'),
 QP(R1A,'Where did Lily put the pot?','by the sunny window',['in the closet','outside in the rain','under her bed'],'She put it by the sunny window.','Reread the second sentence.'),
 QP(R1B,'What was Tom’s problem?','His kite was stuck in a tree.',['He lost his shoe.','His sister was sad.','It was raining.'],'The kite got stuck in a tall tree.','What went wrong?'),
 QP(R1B,'Who helped Tom?','his big sister',['his dad','a teacher','his dog'],'His big sister came with a long stick.','Find the helper.'),
 QP(R1C,'What is the setting of the story?','outside on a snowy day',['at the beach','in a classroom','at night in bed'],'It was a snowy day and Rosa built a snowman outside.','Where and when does it happen?'),
 QP(R1A,'How did Lily feel at the end?','happy and excited',['sad','angry','scared'],'She clapped her hands and said “It is growing!”','What did she do with her hands?',true),
 QP(R1B,'What lesson does the story teach?','Family members can help you solve problems.',['Kites are bad toys.','Never climb trees.','Jumping is the best way to fix things.'],'Tom’s sister helped him get the kite down.','Think about what the sister did.',true),
 QP(R1C,'Why did the snowman melt?','The sun came out and warmed it.',['Rosa knocked it over.','It started to snow more.','A dog ate the carrot.'],'The sun came out in the afternoon and the snowman began to melt.','What happened in the afternoon?',true),
 QP(R1C,'Why did Rosa build the new snowman in the shade?','so it would not melt as fast',['because the shade is prettier','so her dog could see it','because she was tired'],'Shade keeps snow cooler, so it melts slower.','Think about why the first one melted.',true),
 QP(R1A,'What happened LAST in the story?','Lily said, “It is growing!”',['Lily planted a seed.','Lily watered the pot.','A sprout poked out.'],'The last thing was Lily clapping and saying it was growing.','Look at the end.',true),
]);
// 1.RI nonfiction
const R1N1='Bees are busy insects. They fly from flower to flower to drink nectar. While they visit flowers, they carry pollen. This helps new plants grow. Bees use nectar to make honey in their hive.';
const R1N2='A turtle has a hard shell. The shell keeps the turtle safe. When a turtle is scared, it can pull its head and legs inside. Some turtles live in water and some live on land.';
addQ('r1_ri',[
 QP(R1N1,'What is this text mostly about?','bees',['flowers','honey jars','birds'],'Every sentence tells about bees.','What does each sentence tell about?'),
 QP(R1N1,'What do bees drink from flowers?','nectar',['milk','water from the hive','juice'],'Bees fly to flowers to drink nectar.','Find the word after “drink.”'),
 QP(R1N2,'What keeps a turtle safe?','its hard shell',['its long tail','its fast legs','its sharp teeth'],'The shell keeps the turtle safe.','Reread the second sentence.'),
 QI('In a nonfiction book, where would you look to find which page tells about sharks?','the table of contents',['the cover picture','the last word','the author’s name'],'The table of contents lists topics and page numbers.','It is at the front of the book.'),
 QI('Which is a nonfiction book?','A Book About Real Volcanoes',['The Dragon Who Lost His Hat','The Magic Pencil','A Talking Cat Goes to School'],'Nonfiction tells true facts about real things.','Which one could really happen?'),
 QP(R1N1,'How do bees help new plants grow?','They carry pollen from flower to flower.',['They eat the leaves.','They dig in the soil.','They water the plants.'],'Carrying pollen helps new plants grow.','What do bees carry?',true),
 QP(R1N2,'What does a turtle do when it is scared?','pulls its head and legs inside its shell',['runs very fast','climbs a tree','makes a loud noise'],'It can pull its head and legs inside.','Reread the third sentence.',true),
 QP(R1N2,'Which fact is in the text?','Some turtles live in water and some live on land.',['All turtles live in the ocean.','Turtles have soft shells.','Turtles can fly.'],'The last sentence says some live in water and some on land.','Check each choice against the text.',true),
 QH('A word in a nonfiction book is in dark, bold letters. Why?','It is an important word.',['It is a mistake.','It is the author’s name.','It is a joke.'],'Bold words are important words, often in the glossary.','Why would the writer make it stand out?'),
 QH('Where in a book can you find what a hard word means?','the glossary',['the cover','the title','the table of contents'],'A glossary is a small dictionary at the back of a book.','It is at the back.'),
]);
// Grade 1 science
addQ('sc1_2',[
 QI('Which is a PULL?','opening a drawer',['kicking a ball','pushing a swing','pressing a button'],'Opening a drawer pulls it toward you.','A pull brings something closer.'),
 QI('What happens when you hit a drum?','It vibrates and makes a sound.',['It gets colder.','It turns into water.','It grows bigger.'],'Sound comes from vibrations.','Touch a drum after you hit it.'),
 QI('Which moves by rolling?','a wheel',['a book','a box','a brick'],'Round things like wheels roll.','Which one is round?'),
 QH('You push a toy car harder. What happens?','It goes farther and faster.',['It stops at once.','It goes slower.','Nothing changes.'],'A stronger push makes things move faster and farther.','More push means…'),
 QH('How can you make a loud sound quieter?','cover it or move farther away',['hit it harder','stand closer','shout at it'],'Covering a sound or moving away makes it quieter.','Think about earmuffs.'),
 QH('Which would be easiest to push across the floor?','an empty box',['a box full of books','a heavy chair','a big rock'],'Lighter things are easier to move.','Which one is lightest?'),
 QH('A ball rolls on grass and on a smooth floor. Where does it roll farther?','on the smooth floor',['on the grass','the same on both','it cannot roll on either'],'Grass slows the ball down more than a smooth floor.','Which surface is bumpier?'),
]);
addQ('sc1_3',[
 QI('Which object is made of wood?','a pencil',['a spoon made of metal','a glass cup','a plastic bottle'],'Most pencils are made of wood.','Which comes from trees?'),
 QI('Which object is hard?','a rock',['a pillow','a cotton ball','a sponge'],'A rock is hard.','Which one would not squish?'),
 QI('Which object would a magnet pick up?','a paper clip',['a crayon','a leaf','a rubber band'],'Magnets attract some metals like paper clips.','Magnets like some metals.'),
 QH('Which would be best for keeping rain off your head?','a plastic raincoat hood',['a paper bag','a cotton sock','a tissue'],'Plastic is waterproof.','Which does not soak up water?'),
 QH('You want to sort objects by texture. Which pair goes together?','sandpaper and a rough rock',['sandpaper and a silk scarf','a rock and a pillow','a feather and a brick'],'Texture is how something feels. Sandpaper and a rough rock are both rough.','Texture = how it feels.'),
 QH('Which object will SINK in water?','a metal key',['a cork','a leaf','a rubber duck'],'A metal key is heavy for its size and sinks.','Which one is heavy for its size?'),
 QH('Why are pots made of metal?','Metal lets heat pass through to cook food.',['Metal is soft.','Metal floats.','Metal is see-through.'],'Metal carries heat well.','What do pots need to do?'),
]);
addQ('sc1_4',[
 QI('Which plant part holds the plant up?','the stem',['the flower','the seed','the root hairs'],'The stem holds the plant up.','It is like a straw.'),
 QI('Which part of a plant can grow into a new plant?','the seed',['the leaf','the stem','the bark'],'Seeds grow into new plants.','What do you plant in the ground?'),
 QI('Which is a living thing?','a tree',['a rock','a chair','a toy'],'A tree grows and needs water: it is living.','Does it grow?'),
 QH('A plant is kept in a dark closet for two weeks. What will most likely happen?','It will turn yellow and droop.',['It will grow faster.','It will make more flowers.','Nothing will change.'],'Plants need light to make food.','What do leaves need to make food?'),
 QH('Which plant part do we eat when we eat a carrot?','the root',['the leaf','the flower','the seed'],'A carrot is a root.','Carrots grow under the ground.'),
 QH('Why does a plant have roots that spread out?','to soak up water and hold the plant in the soil',['to catch sunlight','to make seeds','to attract bees'],'Roots take in water and anchor the plant.','Roots are under the ground.'),
 QH('Which plant part makes seeds?','the flower',['the root','the stem','the bark'],'Flowers make seeds.','Bees visit this part.'),
]);
addQ('sc1_5',[
 QI('Which animal has feathers?','a bird',['a dog','a fish','a frog'],'Birds have feathers.','Which one can fly?'),
 QI('Which animal lives in water?','a fish',['a cow','a horse','a cat'],'Fish live in water.','Which one has gills?'),
 QI('What do baby animals need from their parents?','food and protection',['toys','money','homework'],'Young animals need food and to be kept safe.','What keeps them alive?'),
 QH('How does a turtle’s shell help it?','It protects the turtle from enemies.',['It helps it fly.','It keeps it wet.','It helps it see.'],'The hard shell keeps the turtle safe.','What does a shell do?'),
 QH('Why do polar bears have thick fur?','to stay warm in the cold',['to swim faster','to hide in the grass','to climb trees'],'Thick fur keeps polar bears warm.','Where do polar bears live?'),
 QH('Which animal uses its long neck to eat leaves from tall trees?','a giraffe',['a rabbit','a snake','a pig'],'A giraffe’s long neck reaches high leaves.','Which animal is the tallest?'),
 QH('A frog has long, strong back legs. What are they best for?','jumping',['digging','flying','holding food'],'Long, strong legs help frogs jump.','How does a frog move?'),
]);
addQ('sc1_6',[
 QI('Where does the sun appear in the morning?','in the east',['in the west','straight up','under the ground'],'The sun rises in the east.','The sun rises in the…'),
 QI('Which feels warmer on a sunny day?','a black shirt in the sun',['a white shirt in the shade','an ice cube','a snowball'],'Dark colors in sunlight get warm.','Sun + dark color = warm.'),
 QI('When is your shadow longest?','early morning or late afternoon',['at noon','at night','it never changes'],'When the sun is low, shadows are long.','Where is the sun at noon?'),
 QH('Your shadow is in front of you. Where is the sun?','behind you',['in front of you','under you','it is nighttime'],'Shadows form on the side away from the light.','The shadow points away from the light.'),
 QH('Why is it dark at night?','Our side of Earth faces away from the sun.',['The sun turns off.','Clouds cover the sun.','The moon blocks the sun every night.'],'Earth spins; at night our side faces away from the sun.','Earth spins around.'),
 QH('Which object would NOT make a shadow in sunlight?','a clear glass window',['a tree','a person','a dog'],'Light passes through clear glass.','Which one lets light through?'),
 QH('Why does a sidewalk feel hot on a sunny afternoon?','The sun’s energy heated it all day.',['It has a heater inside.','It is made of ice.','Shadows made it hot.'],'Sunlight heats things it shines on.','What warms the Earth?'),
]);
addQ('sc1_7',[
 QI('Which season comes after winter?','spring',['fall','summer','winter again'],'The seasons go winter, spring, summer, fall.','Flowers start to bloom.'),
 QI('Which season is usually the hottest?','summer',['winter','fall','spring'],'Summer is usually the hottest season.','When do people go swimming outside?'),
 QI('What should you wear on a snowy day?','a coat, hat and mittens',['shorts and sandals','a swimsuit','a tank top'],'Warm clothes keep you safe in the cold.','It is cold!'),
 QH('Why do some birds fly south in the fall?','to find warmer weather and food',['to see the ocean','because they are lost','to build snowmen'],'Many birds migrate to find food and warmth.','What is hard to find in winter?'),
 QH('Bears sleep for much of the winter. What is this called?','hibernation',['migration','pollination','recycling'],'Hibernation is a long winter rest to save energy.','It starts with “hi.”'),
 QH('In which season do many trees grow new leaves?','spring',['fall','winter','none'],'In spring, trees grow new leaves.','After the cold season…'),
 QH('A thermometer shows a high number. What is the weather like?','hot',['cold','snowy','freezing'],'A high temperature means hot weather.','High number = hot.'),
]);
addQ('sc1_8',[
 QI('Which is a way to save paper?','use both sides of the paper',['throw paper away after one line','use a new sheet for each word','leave paper in the rain'],'Using both sides saves paper.','Use it more than once.'),
 QI('What should you do with an empty plastic bottle?','recycle it',['throw it in the river','leave it on the ground','bury it in the park'],'Recycling turns old things into new things.','Look for the recycle bin.'),
 QI('Which natural resource do we drink?','water',['oil','rocks','sand'],'Water is a natural resource we drink.','We need it every day.'),
 QH('What does it mean to REUSE something?','use it again',['break it','throw it away','buy a new one'],'Reuse means use again, like using a jar to hold pencils.','Re- means again.'),
 QH('Which is a natural resource that comes from trees?','wood',['plastic','glass','metal cans'],'Wood comes from trees.','What is a pencil made of?'),
 QH('Why should we turn off lights when we leave a room?','to save energy',['to make the room bigger','to help plants grow','to keep bugs away'],'Turning off lights saves electricity.','Lights use electricity.'),
 QH('Which choice REDUCES trash?','bringing a cloth bag to the store',['using a new plastic bag every time','throwing away toys you can fix','buying extra things you do not need'],'Reusing a cloth bag makes less trash.','Reduce means make less.'),
]);
// Grade 1 writing
addQ('w1_w',[
 QI('Which is a complete sentence?','The dog runs fast.',['The dog.','runs fast','Fast the.'],'A sentence tells who and what they do.','Who? Does what?'),
 QI('Which word best finishes the sentence? “The cat ___ on the mat.”','sat',['sit','sitting','sits on'],'“The cat sat on the mat.”','Read each choice in the sentence.'),
 QI('Which word describes the apple? “I ate a ___ apple.”','red',['run','jump','sing'],'Red describes the apple.','A describing word tells how it looks.'),
 QH('Put the words in order: “park / to / We / the / went.”','We went to the park.',['Park the to went we.','We the park went to.','Went we to park the.'],'“We went to the park.” starts with a capital and tells a whole idea.','Start with who.'),
 QH('Which sentence tells MORE about the dog?','The big brown dog barked at the mail truck.',['The dog barked.','Dog.','The dog is.'],'Adding describing words and details tells more.','Which has the most details?'),
 QH('What is the best first word for a story about your day at the zoo?','First',['Last','Finally','The end'],'Stories start with words like “First.”','Which word starts a story?'),
 QH('Which sentence uses a describing word for HOW something sounds?','The thunder was loud.',['The thunder was gray.','The thunder was tall.','The thunder was soft and fuzzy.'],'Loud describes a sound.','Which word is about hearing?'),
]);
addQ('w1_lu',[
 QI('Which word should start with a capital letter?','monday',['dog','apple','run'],'Days of the week start with a capital: Monday.','Names of days need capitals.'),
 QI('Which is an action word (verb)?','jump',['tree','blue','happy'],'Jump is something you do.','Can you do it?'),
 QI('What should end this telling sentence: “I like pizza”','.',['?','!',','],'A telling sentence ends with a period.','It tells something.'),
 QH('Which sentence is written correctly?','My friend Sam lives in Richmond.',['my friend sam lives in richmond.','My friend sam lives in richmond.','my Friend Sam lives in Richmond.'],'Capitals go at the start and on names of people and places.','Look for names.'),
 QH('Which word means more than one box?','boxes',['boxs','boxies','box'],'Words ending in x add -es: boxes.','Say it out loud.'),
 QH('Which sentence shows strong feeling?','Watch out for the ball!',['I see a ball.','Is that a ball?','The ball is red.'],'An exclamation mark shows strong feeling.','Look for the !'),
 QH('Which word is a naming word for a place?','school',['run','pretty','under'],'A school is a place: a noun.','Can you go there?'),
]);
// Grade 1 history & social science
addQ('h1_1',[
 QI('What is a rule?','a guide that tells us how to act',['a kind of game','a snack','a toy'],'Rules guide how we act.','Rules help us.'),
 QI('Which shows fairness?','taking turns on the slide',['cutting in line','grabbing all the crayons','not sharing'],'Taking turns is fair.','Everyone gets a chance.'),
 QI('Who makes rules in the classroom?','the teacher, often with the class',['the principal’s dog','nobody','the bus driver'],'Teachers make class rules, often with students.','Who leads the class?'),
 QH('A classmate drops their books. What would a good citizen do?','help pick them up',['laugh','walk away','take a book'],'Good citizens help others.','What would you want someone to do for you?'),
 QH('What can happen if people do not follow rules?','People can get hurt or treated unfairly.',['Everyone has more fun.','Nothing ever happens.','The rules disappear.'],'Rules keep us safe and fair.','Why do we have rules?'),
 QH('Your class votes on a game. 12 vote tag and 8 vote kickball. What is fair?','play tag, because more people chose it',['play kickball','play nothing','let one person decide'],'Voting lets the most-chosen idea win.','Which got more votes?'),
]);
addQ('h1_2',[
 QI('Which holiday is on the fourth Thursday in November?','Thanksgiving',['Independence Day','Labor Day','Memorial Day'],'Thanksgiving is in November.','Families share a big meal.'),
 QI('Which holiday honors workers?','Labor Day',['Thanksgiving','Veterans Day','Presidents’ Day'],'Labor Day honors workers.','Labor means work.'),
 QI('Which holiday honors George Washington and other presidents?','Presidents’ Day',['Labor Day','Thanksgiving','Memorial Day'],'Presidents’ Day honors U.S. presidents.','The name tells you.'),
 QH('Which holiday remembers people who died while serving in the military?','Memorial Day',['Veterans Day','Labor Day','Independence Day'],'Memorial Day remembers those who died serving.','Memorial means remembering.'),
 QH('Why do we celebrate Independence Day?','It is the birthday of the United States.',['It is the first day of school.','It honors workers.','It is the start of winter.'],'On July 4, 1776, the Declaration of Independence was adopted.','July 4 is…'),
 QH('Veterans Day honors…','all people who have served in the military',['only presidents','farmers','teachers'],'Veterans Day honors everyone who served.','A veteran is someone who served.'),
]);
addQ('h1_3',[
 QI('How many stars are on the American flag?','50',['13','10','100'],'There is one star for each of the 50 states.','One for each state.'),
 QI('What do the 13 stripes on the flag stand for?','the first 13 colonies',['13 presidents','13 holidays','13 rivers'],'The stripes stand for the 13 original colonies.','Think of the first states.'),
 QI('Which is a symbol of the United States?','the Statue of Liberty',['a pizza','a soccer ball','a school bus'],'The Statue of Liberty stands for freedom.','It holds a torch.'),
 QH('Why do Americans say the Pledge of Allegiance?','to promise to be loyal to the country',['to start a game','to order food','to learn to read'],'The Pledge is a promise of loyalty.','Pledge means promise.'),
 QH('What does the bald eagle stand for?','strength and freedom',['speed and fun','rain and snow','sleep'],'The bald eagle is a symbol of strength and freedom.','Why pick a strong bird?'),
 QH('Which colors are on the American flag?','red, white and blue',['green, white and red','black and yellow','purple and gold'],'The flag is red, white and blue.','Think of the stripes and stars.'),
]);
addQ('h1_4',[
 QI('Who lived in Virginia before the English came?','American Indians, like the Powhatan',['astronauts','pirates only','nobody'],'The Powhatan and other American Indians lived in Virginia first.','They were the first people here.'),
 QI('Long ago, how did people get light at night?','candles and lanterns',['light bulbs','phones','TVs'],'Before electricity, people used candles.','No electricity long ago.'),
 QI('How did children get to school long ago?','often by walking',['on airplanes','in electric cars','on buses with Wi-Fi'],'Many children walked long ago.','No buses back then.'),
 QH('Which is the same today as long ago?','People need food, clothes and shelter.',['Everyone has a phone.','People ride horses to the store.','Houses have no windows.'],'Basic needs have not changed.','What do all people need?'),
 QH('Why did the Powhatan live near rivers?','for water, fish and travel by canoe',['to see airplanes','to avoid all water','to play video games'],'Rivers gave water, food and a way to travel.','What do rivers give?'),
 QH('Which tool would a child at Jamestown NOT have used?','a tablet computer',['a bucket','a wooden spoon','a candle'],'Tablets were invented much later.','Which is modern?'),
]);
addQ('h1_5',[
 QI('Who was a famous Virginia president who wrote the Declaration of Independence?','Thomas Jefferson',['George Washington','Abraham Lincoln','Arthur Ashe'],'Jefferson wrote the Declaration of Independence.','He lived at Monticello.'),
 QI('Who was called the “Father of Our Country”?','George Washington',['Thomas Jefferson','Pocahontas','Maggie L. Walker'],'Washington was the first president.','He was the first president.'),
 QH('What was special about Maggie L. Walker?','She started a bank and helped her community.',['She was a pilot.','She was the first president.','She invented the light bulb.'],'Maggie L. Walker founded a bank in Richmond.','She worked with money.'),
 QH('Arthur Ashe is remembered for tennis and for…','helping others and working for fairness',['writing the Constitution','building Jamestown','being king of England'],'Arthur Ashe worked for fairness and helped people.','He used his fame to help.'),
 QH('Which person was a Powhatan girl who helped the English and Powhatan people talk?','Pocahontas',['Maggie L. Walker','George Washington','Arthur Ashe'],'Pocahontas helped the two groups communicate.','She lived near Jamestown.'),
 QH('Why do we learn about people like Maggie L. Walker and Arthur Ashe?','They made a difference and help us learn to be good citizens.',['They were cartoon characters.','They lived on the moon.','They made all the rules.'],'Their lives show good citizenship.','What can we learn from them?'),
]);
addQ('h1_6',[
 QI('What tool shows which way is north?','a compass rose',['a ruler','a clock','a scale'],'A compass rose shows directions.','It looks like a star.'),
 QI('What does blue usually show on a map?','water',['roads','mountains','cities'],'Blue shows water.','What color is water?'),
 QI('A map of your classroom is a drawing from…','above',['under the floor','the side','inside a desk'],'Maps show places from above, like a bird.','Like a bird looking down.'),
 QH('If you walk away from north, which way are you going?','south',['east','west','up'],'South is the opposite of north.','The opposite of north.'),
 QH('On a map, the school is east of the park. Which way do you go from the park to the school?','east',['west','north','south'],'The school is east, so go east.','Read the directions carefully.'),
 QH('A map key shows a tree symbol for parks. You see 3 tree symbols. What does that mean?','There are 3 parks.',['There are 3 houses.','There are 3 rivers.','There are 3 schools.'],'Each symbol stands for one park.','Use the key.'),
]);
addQ('h1_7',[
 QI('Which mountains are in western Virginia?','the Blue Ridge Mountains',['the Rocky Mountains','the Alps','the Andes'],'The Blue Ridge Mountains are in Virginia.','Their name has a color.'),
 QI('What is a river?','a long body of moving water',['a tall hill','a flat field','a frozen lake only'],'A river is moving water.','It flows.'),
 QH('Why did many people build towns near rivers long ago?','to get water and travel by boat',['to avoid water','because rivers are loud','to grow sand'],'Rivers gave water and transportation.','How did people travel before cars?'),
 QH('People who live near the ocean in Virginia might work as…','fishers or boat builders',['miners on a mountain only','desert guides','ski instructors'],'Coasts give jobs with fish and boats.','What is in the ocean?'),
 QH('How do mountains change how people live?','People might farm on hills and dress for cooler weather.',['Mountains make it always hot.','Nobody can live near mountains.','Mountains have no trees.'],'Land affects homes, jobs and clothes.','Mountains are higher and cooler.'),
]);
addQ('h1_8',[
 QI('A doctor helps sick people. Is that a good or a service?','a service',['a good','a want','a coin'],'A service is work done for others.','Is it a thing you can hold?'),
 QI('Which is a good?','an apple',['a haircut','a teacher teaching','a bus ride'],'Goods are things you can touch.','Can you hold it?'),
 QI('Where can people keep money safe?','in a bank',['under a rock','in a mud puddle','in the trash'],'Banks keep money safe.','A safe place for money.'),
 QH('You have $5. A toy costs $8. What can you do?','save money until you have $8',['take the toy','cry','pay $5 and run'],'Saving helps you buy things later.','How can you get more money?'),
 QH('Why can’t people have everything they want?','Money and resources are limited.',['Stores hide everything.','Wants are not real.','Everything is free.'],'People must make choices because money is limited.','Is there enough money for everything?'),
 QH('A farmer sells corn. A mechanic fixes the farmer’s truck. Which is the service?','fixing the truck',['the corn','the truck','the money'],'Fixing the truck is work done for someone: a service.','Which one is work done?'),
 QH('Which is a NEED for every family?','shelter',['a video game','a new bike','candy'],'Shelter is a need.','What do you need to live?'),
]);
})();

