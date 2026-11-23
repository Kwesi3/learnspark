// ── SOL-style question formats (technology-enhanced items) ──
// New types: 'input' (type the answer, with keypad), 'sort' (put items into groups),
// 'nline' (place a point on a number line), 'plot' (place a point on a coordinate grid).
// Existing 'multi' (select all) and 'order' are also fed from the banks below.

// Sorting banks: gen -> [[bucket label, [items], optional select-all question], ...]
const SORT_BANK={
  // Science
  sc1_3:[['Found in nature',['wood','wool','cotton','rock','sand'],'Which materials are found in nature?'],['Made by people',['plastic','glass','nylon','steel','paper']]],
  sc1_4:[['Plants need it',['water','sunlight','air','space to grow','nutrients from soil'],'What do plants need to live and grow?'],['Plants do not need it',['candy','toys','music','television','shoes']]],
  sc1_5:[['Fur',['bear','rabbit','dog','fox']],['Feathers',['robin','owl','duck','eagle']],['Scales',['snake','fish','lizard','alligator']]],
  sc1_7:[['Winter',['building a snowman','wearing mittens','bare trees']],['Summer',['swimming outside','long, hot days','wearing sunscreen']],['Fall',['leaves changing color','picking pumpkins','birds flying south']]],
  sc1_8:[['Natural resource',['water','trees','soil','sunlight','rocks'],'Which of these are natural resources?'],['Made by people',['plastic bottle','car','computer','sidewalk','glass jar']]],
  sc2_2:[['A magnet attracts it',['paper clip','iron nail','steel pin','steel screw'],'Which objects would a magnet attract?'],['A magnet does not attract it',['wooden block','rubber eraser','plastic spoon','glass marble','aluminum can']]],
  sc2_3:[['Solid',['ice cube','rock','pencil','wooden spoon']],['Liquid',['milk','juice','rain','melted butter']],['Gas',['steam','air in a balloon','oxygen','water vapor']]],
  sc2_4:[['Part of a frog’s life',['tadpole','froglet','eggs in a jelly clump']],['Part of a butterfly’s life',['caterpillar','chrysalis','eggs on a leaf']]],
  sc2_5:[['Desert',['cactus','camel','rattlesnake']],['Ocean',['whale','coral','octopus']],['Forest',['deer','oak tree','black bear']]],
  sc2_8:[['Food from plants',['apples','rice','corn','potatoes'],'Which of these are foods that come from plants?'],['Materials from plants',['cotton shirt','wooden chair','paper','rope']]],
  sc3_3:[['Dissolves in water',['salt','sugar','drink powder'],'Which of these dissolve in water?'],['Does not dissolve in water',['sand','pebbles','cooking oil','marbles']]],
  sc3_4:[['Physical adaptation',['thick fur','sharp claws','webbed feet','camouflage coloring'],'Which are physical adaptations?'],['Behavioral adaptation',['migrating south','hibernating','living in herds','hunting at night'],'Which are behavioral adaptations?']],
  sc3_5:[['Producer',['grass','oak tree','algae']],['Consumer',['rabbit','hawk','deer']],['Decomposer',['mushroom','earthworm','bacteria']]],
  sc3_6:[['Living or once-living',['humus','earthworms','plant roots','dead leaves'],'Which parts of soil are living or were once living?'],['Never living',['sand','clay','small rocks','silt']]],
  sc3_7:[['Evaporation',['a puddle drying up','wet clothes drying in the sun']],['Condensation',['dew on the grass','drops on a cold glass','clouds forming']],['Precipitation',['rain','snow','hail']]],
  sc3_8:[['Natural change',['wildfire started by lightning','flood','drought']],['Change caused by people',['building a road','cutting down a forest','building a dam']]],
  g4_force:[['Potential energy (stored)',['stretched rubber band','ball at the top of a hill','book on a high shelf']],['Kinetic energy (moving)',['rolling ball','flowing river','swinging bat']]],
  g4_elec:[['Conductor',['copper wire','iron nail','aluminum foil','steel spoon'],'Which materials are good conductors of electricity?'],['Insulator',['rubber','plastic','wood','glass'],'Which materials are insulators?']],
  g4_plants:[['Roots',['take in water from the soil','hold the plant in place']],['Stem',['carries water up the plant','holds the plant up']],['Leaves',['make food using sunlight','take in carbon dioxide']]],
  g4_eco:[['Producer',['sunflower','seaweed','maple tree']],['Consumer',['fox','frog','owl']],['Decomposer',['mushroom','mold','bacteria']]],
  g4_weather:[['Cumulus',['puffy and white like cotton','usually mean fair weather']],['Stratus',['flat gray layer across the sky','can bring drizzle']],['Cirrus',['thin and wispy','very high in the sky']]],
  g4_space:[['Inner planet',['Mercury','Venus','Earth','Mars'],'Which planets are inner planets?'],['Outer planet',['Jupiter','Saturn','Uranus','Neptune'],'Which planets are outer planets?']],
  sc5_2:[['Mechanical energy',['moving car','spinning fan blades','rolling skateboard']],['Chemical energy',['battery','food','gasoline']],['Radiant (light) energy',['sunlight','glow from a firefly','light from a candle flame']]],
  sc5_4:[['Attract',['north pole near south pole','south pole near north pole']],['Repel',['north pole near north pole','south pole near south pole']]],
  sc5_5:[['Higher pitch',['short guitar string','tight drum skin','small bell','mouse squeak']],['Lower pitch',['long guitar string','loose drum skin','large bell','tuba']]],
  sc5_6:[['Transparent',['clear glass','clean water','plastic wrap']],['Translucent',['wax paper','frosted glass','tissue paper']],['Opaque',['wooden door','brick','cardboard']]],
  sc5_7:[['Physical change',['cutting paper','melting ice','folding clothes','dissolving sugar'],'Which are physical changes?'],['Chemical change',['burning wood','rusting nail','baking a cake','milk going sour'],'Which are chemical changes?']],
  sc5_8:[['Igneous rock',['granite','obsidian','pumice']],['Sedimentary rock',['sandstone','limestone','shale']],['Metamorphic rock',['marble','slate','quartzite']]],
  sc5_9:[['Renewable',['solar','wind','moving water','geothermal'],'Which energy sources are renewable?'],['Nonrenewable',['coal','oil','natural gas','uranium'],'Which energy sources are nonrenewable?']],
  g6_energy:[['Conduction',['a metal spoon in hot soup gets hot','touching a hot pan handle']],['Convection',['warm air rising from a heater','boiling water circulating in a pot']],['Radiation',['sunlight warming your face','feeling a campfire from across the room']]],
  g6_solar:[['Rocky (terrestrial) planet',['Mercury','Venus','Earth','Mars'],'Which planets are rocky (terrestrial) planets?'],['Gas giant or ice giant',['Jupiter','Saturn','Uranus','Neptune']]],
  g6_eco:[['Biotic (living)',['fish','algae','frog','bacteria'],'Which are biotic factors?'],['Abiotic (nonliving)',['sunlight','water temperature','rocks','oxygen'],'Which are abiotic factors?']],
  g6_atmo:[['Troposphere',['where weather happens','the layer we live in']],['Stratosphere',['has the ozone layer','where jets often fly']],['Mesosphere',['where most meteors burn up']],['Thermosphere',['where auroras happen']]],
  g6_resource:[['Renewable',['sunlight','wind','trees','fresh water'],'Which resources are renewable?'],['Nonrenewable',['coal','oil','natural gas','uranium'],'Which resources are nonrenewable?']],
  ls2:[['Plant cells only',['cell wall','chloroplasts','large central vacuole']],['Both plant and animal cells',['nucleus','cell membrane','cytoplasm','mitochondria'],'Which parts are found in both plant and animal cells?']],
  ls3:[['Vertebrate',['frog','shark','eagle','snake'],'Which animals are vertebrates?'],['Invertebrate',['spider','jellyfish','earthworm','octopus'],'Which animals are invertebrates?']],
  ls4:[['Goes into photosynthesis',['carbon dioxide','water','light energy'],'What does a plant use for photosynthesis?'],['Made by photosynthesis',['glucose (sugar)','oxygen']]],
  ls5:[['Mutualism',['bees and flowers','clownfish and sea anemone']],['Commensalism',['barnacles on a whale','a bird nesting in a tree']],['Parasitism',['tick on a dog','tapeworm in an animal']]],
  ls6:[['Predator and prey',['owl hunting a mouse','lion chasing a zebra']],['Competition',['two trees reaching for the same sunlight','hawks and foxes hunting the same rabbits']],['Symbiosis',['bees and flowers','tick on a dog']]],
  ls7:[['Physical adaptation',['a cactus’s waxy skin','a polar bear’s thick fat','a giraffe’s long neck'],'Which are physical adaptations?'],['Behavioral adaptation',['geese flying south','bears hibernating','wolves hunting in packs'],'Which are behavioral adaptations?']],
  ls10:[['Inherited trait',['eye color','natural hair color','shape of earlobes','dimples'],'Which traits are inherited?'],['Acquired (learned) trait',['a scar','knowing how to swim','speaking Spanish','dyed hair'],'Which traits are acquired?']],
  ps2:[['Element',['oxygen','gold','carbon','helium']],['Compound',['water','carbon dioxide','table salt','sugar']],['Mixture',['air','salad','salt water','trail mix']]],
  ps3:[['Physical property',['color','density','boiling point','hardness'],'Which are physical properties?'],['Chemical property',['flammability','reacts with acid','ability to rust','reacts with oxygen'],'Which are chemical properties?']],
  ps4:[['Metal',['iron','copper','sodium','aluminum'],'Which elements are metals?'],['Nonmetal',['oxygen','sulfur','nitrogen','chlorine'],'Which elements are nonmetals?']],
  ps5:[['Conduction',['an ice cube melting in your hand','a pot handle getting hot']],['Convection',['sea breezes','hot air balloon rising']],['Radiation',['microwave heating food','sunlight warming a sidewalk']]],
  ps6:[['Mechanical wave (needs a medium)',['sound','ocean waves','seismic waves'],'Which waves need a medium to travel?'],['Electromagnetic wave',['radio waves','visible light','X-rays','microwaves'],'Which are electromagnetic waves?']],
  ps8:[['Newton’s first law (inertia)',['a ball keeps rolling until friction stops it','riders lurch forward when a bus stops']],['Newton’s second law (F = ma)',['an empty cart is easier to push than a full one','a harder kick makes the ball go faster']],['Newton’s third law (action–reaction)',['a rocket pushes gas down and moves up','a swimmer pushes water back to move forward']]],
  ps9:[['Series circuit',['only one path for the current','if one bulb goes out, they all go out']],['Parallel circuit',['more than one path for the current','household outlets are wired this way']]],
  // Reading
  r1_ffr:[['Short a',['cat','hat','map','bag']],['Long a',['cake','rain','play','name']]],
  r2_ffr:[['Short o',['hot','frog','sock','mop']],['Long o',['boat','rope','snow','bone']]],
  r3_ffr:[['un- means “not”',['unhappy','unkind','unsafe','unlock']],['re- means “again”',['redo','reread','rebuild','refill']]],
  r1_rv:[['Things you eat',['apple','bread','carrot','egg']],['Things you wear',['hat','sock','coat','boot']]],
  r2_rv:[['Means big',['huge','giant','enormous']],['Means small',['tiny','little','miniature']]],
  r1_rl:[['Make-believe (fiction)',['a pig that drives a bus','a dragon who bakes cookies','a talking tree']],['Real (nonfiction)',['how bees make honey','facts about the moon','how to plant a seed']]],
  r2_rl:[['Make-believe (fiction)',['a cat who flies a plane','a magic paintbrush','a talking snowman']],['Real (nonfiction)',['how frogs grow','what clouds are made of','the life of George Washington']]],
  r2_ri:[['Fact',['A spider has eight legs.','Richmond is the capital of Virginia.','Water freezes when it gets very cold.'],'Which sentences are facts?'],['Opinion',['Spiders are scary.','Pizza is the best food.','Rainy days are boring.'],'Which sentences are opinions?']],
  r3_ri:[['Fact',['Virginia became a state in 1788.','The James River flows into the Chesapeake Bay.','Bats are mammals.'],'Which sentences are facts?'],['Opinion',['Summer is the best season.','Soccer is more fun than basketball.','Everyone should read this book.'],'Which sentences are opinions?']],
  r3_rl:[['Simile',['as quiet as a mouse','ran like the wind','as busy as a bee']],['Not a simile',['the dog barked loudly','she ran fast','the bee was busy']]],
  g4_vocab:[['Means happy',['joyful','cheerful','glad','content']],['Means sad',['gloomy','miserable','sorrowful','unhappy']]],
  g4_fiction:[['Simile',['as quiet as a mouse','ran like the wind','eyes like stars']],['Metaphor',['the classroom was a zoo','time is a thief','the road was a ribbon']],['Personification',['the wind whispered','the sun smiled down','the old car groaned']]],
  g4_nonfic:[['Fact',['The Blue Ridge Mountains are in Virginia.','A year has twelve months.','Plants need sunlight to make food.'],'Which sentences are facts?'],['Opinion',['Mountains are prettier than beaches.','Math is the hardest subject.','Dogs are better pets than cats.'],'Which sentences are opinions?']],
  r5_rv:[['Root “port” (carry)',['transport','portable','export']],['Root “graph” (write)',['autograph','paragraph','biography']],['Root “spect” (see)',['inspect','spectator','spectacles']]],
  r5_rl:[['Simile',['as cold as ice','swam like a fish','as bright as the sun']],['Metaphor',['the snow was a white blanket','his voice was thunder','the stars were diamonds']],['Personification',['the leaves danced','the thunder grumbled','the flowers nodded']]],
  r5_ri:[['Fact',['George Washington was the first U.S. president.','The Pacific is the largest ocean.','Honeybees live in colonies.'],'Which sentences are facts?'],['Opinion',['Washington was the greatest president.','The ocean is the best vacation spot.','Honey tastes better than jam.'],'Which sentences are opinions?']],
  g6_vocab:[['Root “port” (carry)',['transport','portable','import']],['Root “dict” (say)',['predict','dictionary','contradict']],['Root “struct” (build)',['construct','structure','instruct']]],
  g6_fiction:[['First-person point of view',['I grabbed my bag and ran.','We laughed until our sides hurt.','My heart pounded as I waited.']],['Third-person point of view',['She grabbed her bag and ran.','They laughed until their sides hurt.','His heart pounded as he waited.']]],
  g6_nonfic:[['Claim',['Schools should start later in the morning.']],['Evidence',['A study found teens who slept more earned higher grades.','Doctors say teens need 8 to 10 hours of sleep.']],['Counterclaim',['Some say a later start would make sports practice end too late.']]],
  r7_vocab:[['Positive connotation',['confident','curious','slender','thrifty']],['Negative connotation',['arrogant','nosy','scrawny','stingy']]],
  r7_fiction:[['Character vs. self',['Maya fights her fear of speaking on stage.','Tom struggles to admit he lied.']],['Character vs. nature',['A family races to escape a flood.','Hikers are trapped by a blizzard.']],['Character vs. society',['A girl protests an unfair school rule.','A town’s laws keep Sam from his dream.']]],
  r7_nonfic:[['Fact',['The Chesapeake Bay is the largest estuary in the U.S.','Virginia has 95 counties.'],'Which statements are facts?'],['Opinion',['The bay is the most beautiful place in Virginia.','Every student should visit Jamestown.'],'Which statements are opinions?']],
  r8_vocab:[['Positive connotation',['determined','frugal','youthful','unique']],['Negative connotation',['stubborn','cheap','childish','weird']]],
  r8_fiction:[['Direct characterization',['Lena was generous.','The coach was strict and fair.']],['Indirect characterization',['Lena handed her last dollar to the stranger.','The coach checked every player’s homework before practice.']]],
  r8_nonfic:[['Appeals to logic',['Recycling one ton of paper saves 17 trees.','Our town spends $40,000 a year on trash removal.']],['Appeals to emotion',['Imagine a world with no forests left for your children.','Do you want our beautiful park buried in trash?']]],
  // Writing
  w1_lu:[['Needs a capital letter',['monday','virginia','sam','june']],['No capital needed',['dog','school','apple','tree']]],
  w2_lu:[['Noun',['dog','teacher','park','book']],['Verb',['jump','write','swim','sing']]],
  w3_lu:[['Noun',['river','pencil','sister']],['Verb',['climb','shout','read']],['Adjective',['tall','shiny','quiet']]],
  w2_w:[['Complete sentence',['The bird sang.','We went to the park.'],'Which are complete sentences?'],['Not a complete sentence',['The big red ball.','Running in the yard.']]],
  w3_w:[['Complete sentence',['The bird sang a song.','My brother plays chess.'],'Which are complete sentences?'],['Fragment',['Under the old bridge.','Because it was raining.']]],
  g4_sentence:[['Complete sentence',['The team won the game.','After lunch, we read books.'],'Which are complete sentences?'],['Fragment',['When the bell rang.','The tall girl with red shoes.']],['Run-on',['I like dogs they are fun.','It rained we stayed inside.']]],
  g4_edit:[['Correct',['The dogs bark at night.','She walks to school.'],'Which sentences are written correctly?'],['Needs fixing',['The dogs barks at night.','She walk to school.']]],
  w5_w:[['Time order',['first','next','finally']],['Contrast',['however','on the other hand','instead']],['Cause and effect',['because','as a result','therefore']]],
  w5_lu:[['Correct',['Their dog is friendly.','It’s raining outside.','The team lost its ball.'],'Which sentences use the word correctly?'],['Needs fixing',['There dog is friendly.','Its raining outside.','The team lost it’s ball.']]],
  g6_race:[['Claim',['Students should have a longer recess.']],['Evidence',['Studies show active breaks help students focus.','Our class scored higher after outdoor time.']],['Counterclaim',['Some argue a longer recess means less class time.']]],
  g6_edit:[['Correct',['Each of the students has a book.','Neither Ama nor Kofi is late.'],'Which sentences are written correctly?'],['Needs fixing',['Each of the students have a book.','Neither Ama nor Kofi are late.']]],
  w7_write:[['Claim',['Our school should start a garden.']],['Evidence',['Gardens teach science through hands-on work.','A nearby school’s garden grew 200 pounds of food.']],['Counterclaim',['Some worry a garden costs too much to keep up.']]],
  w7_edit:[['Active voice',['The dog chased the ball.','Maya wrote the report.']],['Passive voice',['The ball was chased by the dog.','The report was written by Maya.']]],
  w8_write:[['Formal style',['The results suggest a clear trend.','Several factors contributed to the decision.']],['Informal style',['The results are super obvious.','A bunch of stuff made them decide.']]],
  w8_edit:[['Active voice',['The committee approved the plan.','Our class planted the trees.']],['Passive voice',['The plan was approved by the committee.','The trees were planted by our class.']]],
  // Math with fixed items
  g4_shape:[['Has four right angles',['square','rectangle']],['Does not have four right angles',['rhombus that is not a square','trapezoid','parallelogram that is not a rectangle']]],
  g8_ns2:[['Rational',['√16','0.75','−3','2/3','0.333…'],'Which numbers are rational?'],['Irrational',['√7','π','√2','0.1010010001…'],'Which numbers are irrational?']],
  g7_mg3:[['Has two pairs of parallel sides',['square','rectangle','rhombus','parallelogram']],['Has exactly one pair of parallel sides',['trapezoid']],['Has no parallel sides',['kite']]],
  g2_mg4:[['Can roll',['sphere','cylinder','cone']],['Cannot roll',['cube','rectangular prism','square pyramid']]],
  g1_mg2:[['Has 3 sides',['triangle']],['Has 4 sides',['square','rectangle','rhombus']],['Has no sides',['circle']]],
};
// Order banks: gen -> list of {q, items (correct order), e}
const ORDER_BANK={
  ps7:[{q:'Put these from longest wavelength to shortest.',items:['radio waves','microwaves','infrared','visible light','ultraviolet','X-rays'],e:'Wavelength gets shorter (and energy gets higher) from radio waves to X-rays.'}],
  sc3_7:[{q:'Put the water cycle in order, starting with water in a lake.',items:['water evaporates','water vapor condenses into clouds','rain falls','water collects in the lake again'],e:'Evaporation, condensation, precipitation, then collection.'}],
  sc2_4:[{q:'Put a frog’s life cycle in order.',items:['egg','tadpole','froglet','adult frog'],e:'A frog starts as an egg, hatches as a tadpole, grows legs as a froglet, then becomes an adult.'},
         {q:'Put a butterfly’s life cycle in order.',items:['egg','caterpillar','chrysalis','adult butterfly'],e:'Egg, larva (caterpillar), pupa (chrysalis), adult.'}],
  ls3:[{q:'Put these from the largest group to the smallest.',items:['kingdom','phylum','class','order','family','genus','species'],e:'Kingdom, phylum, class, order, family, genus, species.'}],
  ps2:[{q:'Put these from smallest to largest.',items:['electron','atom','molecule','cell'],e:'Electrons are inside atoms, atoms join into molecules, and cells are made of many molecules.'}],
  g4_space:[{q:'Put these planets in order from closest to the Sun to farthest.',items:['Mercury','Venus','Earth','Mars','Jupiter','Saturn'],e:'My Very Educated Mother Just Served… Mercury, Venus, Earth, Mars, Jupiter, Saturn.'}],
  g6_solar:[{q:'Put these planets in order from closest to the Sun to farthest.',items:['Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],e:'Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.'}],
  w5_w:[{q:'Put the steps of the writing process in order.',items:['prewrite','draft','revise','edit','publish'],e:'Plan, write a draft, revise ideas, edit mistakes, then publish.'}],
};

(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pickN=(arr,n)=>shuf(arr.slice()).slice(0,n);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const M='−';const sgn=n=>n<0?M+Math.abs(n):String(n);

// ---------- generated sorts (math) ----------
function sortPrime(){const pool=shuf([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,4,6,8,9,10,12,14,15,16,18,20,21,22,25,27,33,35,39,49,51]);
  const p0=n=>{for(let i=2;i*i<=n;i++)if(n%i===0)return false;return n>1;};const it=shuf(pool.filter(p0).slice(0,4).concat(pool.filter(n=>!p0(n)).slice(0,4)));const p=n=>{for(let i=2;i*i<=n;i++)if(n%i===0)return false;return n>1;};
  return mkSort('Sort each number. Is it prime or composite?',[['Prime',it.filter(p)],['Composite',it.filter(n=>!p(n))]],'A prime number has exactly two factors: 1 and itself. A composite number has more than two factors.');}
function sortFactors(){const N=pick([24,30,36,40,48,60]);const f=[];for(let i=1;i<=N;i++)if(N%i===0)f.push(i);
  const non=[];while(non.length<4){const x=R(2,Math.min(N-1,30));if(N%x&&!non.includes(x))non.push(x);}
  return mkSort(`Sort each number. Is it a factor of ${N}?`,[[`Factor of ${N}`,pickN(f.filter(x=>x>1&&x<N),4)],[`Not a factor of ${N}`,non]],`A factor of ${N} divides ${N} with no remainder. The factors of ${N} are ${f.join(', ')}.`);}
function sortHalf(){const fr=[];const seen=new Set();
  while(fr.length<7){const d=pick([2,3,4,5,6,8,10,12]),n=R(1,d-1),k=n+'/'+d;if(!seen.has(k)){seen.add(k);fr.push([n,d]);}}
  if(!fr.some(([n,d])=>2*n===d))fr[0]=[pick([2,3,4,5,6]),0].map((v,i,a)=>i?a[0]*2:v);
  const c=x=>Math.sign(2*x[0]-x[1]);const s=f=>f[0]+'/'+f[1];
  return mkSort('Compare each fraction to 1/2.',[['Less than 1/2',fr.filter(f=>c(f)<0).map(s)],['Equal to 1/2',fr.filter(f=>c(f)===0).map(s)],['Greater than 1/2',fr.filter(f=>c(f)>0).map(s)]],'Double the numerator. If it is less than the denominator, the fraction is less than 1/2; equal means exactly 1/2.');}
function sortDecHalf(){const P=[0.1,0.2,0.3,0.4,0.6,0.7,0.8,0.9,0.05,0.25,0.45,0.55,0.75,0.95,0.38,0.62,0.09,0.51,0.49];
  const it=shuf(pickN(P.filter(x=>x<0.5),3).concat(pickN(P.filter(x=>x>0.5),3),Math.random()<0.6?[0.5]:[]));const s=x=>String(x);
  return mkSort('Compare each decimal to 0.5.',[['Less than 0.5',it.filter(x=>x<0.5).map(s)],['Equal to 0.5',it.filter(x=>x===0.5).map(s)],['Greater than 0.5',it.filter(x=>x>0.5).map(s)]],'Compare the tenths digit first. 0.5 is the same as 0.50.');}
function sortAngles(){const v=new Set();while(v.size<7)v.add(pick([15,30,35,45,60,72,85,89,90,91,100,120,135,150,170,90]));
  const it=[...v];if(!it.includes(90))it[0]=90;
  return mkSort('Sort each angle by its measure.',[['Acute (less than 90°)',it.filter(x=>x<90).map(x=>x+'°')],['Right (exactly 90°)',it.filter(x=>x===90).map(x=>x+'°')],['Obtuse (between 90° and 180°)',it.filter(x=>x>90).map(x=>x+'°')]],'Acute angles are less than 90°, right angles are exactly 90°, and obtuse angles are between 90° and 180°.');}
function sortSquares(){const sq=pickN([1,4,9,16,25,36,49,64,81,100,121,144],4),non=pickN([2,8,12,18,20,24,27,32,40,50,60,75,90,99],4);
  return mkSort('Sort each number. Is it a perfect square?',[['Perfect square',sq.map(String)],['Not a perfect square',non.map(String)]],'A perfect square is a whole number times itself, like 6 × 6 = 36.');}
function sortProducts(){const P=pick([12,18,24,36]);const yes=[];for(let a=2;a<=10;a++)if(P%a===0&&P/a<=12&&P/a>=2)yes.push(a+' × '+P/a);
  const no=[];while(no.length<3){const a=R(2,9),b=R(2,9);if(a*b!==P&&!no.includes(a+' × '+b))no.push(a+' × '+b);}
  return mkSort(`Sort each fact. Is the product ${P}?`,[[`Product is ${P}`,pickN(yes,Math.min(3,yes.length))],[`Product is not ${P}`,no]],`Multiply each pair. Only the facts that make ${P} go in the first group.`);}
function sortQuarter(){return mkSort('Sort each number. Is it equal to 1/4?',[['Equal to 1/4',pickN(['0.25','25%','25/100','2/8','3/12'],3)],['Not equal to 1/4',pickN(['0.4','40%','1/40','0.025','4/10','2.5%'],3)]],'1/4 = 0.25 = 25%. Equivalent fractions like 2/8 also equal 1/4.');}
function sortIneq(){const a=R(2,6),b=R(1,12),op=pick(['>','<','≥','≤']);const t=x=>op==='>'?a*x+b>b+a*3:op==='<'?a*x+b<b+a*3:op==='≥'?a*x+b>=b+a*3:a*x+b<=b+a*3;
  const rhs=a*3+b;const xs=shuf(pickN([-2,-1,0,1,2],3).concat(pickN([4,5,6],2),[3]));
  return mkSort(`Sort each value of x. Does it make ${a}x + ${b} ${op} ${rhs} true?`,[['Solution',xs.filter(t).map(sgn)],['Not a solution',xs.filter(x=>!t(x)).map(sgn)]],`Substitute each value for x. ${a}x + ${b} ${op} ${rhs} simplifies to x ${op} 3.`);}
function sortEven(){const all=[...Array(40).keys()].map(x=>x+11);const it=shuf(pickN(all.filter(x=>x%2===0),4).concat(pickN(all.filter(x=>x%2),4)));
  return mkSort('Sort each number. Is it even or odd?',[['Even',it.filter(x=>x%2===0).map(String)],['Odd',it.filter(x=>x%2).map(String)]],'Even numbers end in 0, 2, 4, 6, or 8.');}
const GEN_SORT={g5_ns2:sortPrime,g4_ops:sortFactors,g5_ce1:sortFactors,g3_ns3:sortHalf,g4_frac:sortHalf,g4_dec:sortDecHalf,g4_angle:sortAngles,g5_mg3:sortAngles,
  g6_exp:sortSquares,g3_ce2:sortProducts,g6_fdp:sortQuarter,g6_ineq:sortIneq,g7_pfa4:sortIneq,g8_pfa5:sortIneq,g2_ns1:sortEven,g2_pfa1:sortEven};

function mkSort(question,cats,expl){
  cats=cats.filter(c=>c[1].length);
  const items=[];cats.forEach((c,ci)=>c[1].forEach(x=>items.push({t:x,c:ci})));
  return {type:'sort',badge:'Sort',question,cats:cats.map(c=>c[0]),items:shuf(items),explanation:expl||cats.map(c=>`<b>${esc(c[0])}:</b> ${c[1].map(esc).join(', ')}`).join('<br>'),hint:'Look at each item one at a time. Tap it, then tap the group where it belongs.'};
}
function bankSort(gen){const B=SORT_BANK[gen];
  const cats=B.length>3?pickN(B,3):B;const per=cats.length===2?4:3;
  return mkSort(cats.length===2?'Sort each item into the correct group.':'Sort each item into the correct group.',cats.map(c=>[c[0],pickN(c[1],Math.min(per,c[1].length))]));}
function bankMulti(gen){const B=SORT_BANK[gen];const withQ=B.filter(c=>c[2]);if(!withQ.length)return null;
  const c=pick(withQ);const others=B.filter(x=>x!==c).flatMap(x=>x[1]);
  const right=pickN(c[1],R(2,Math.min(3,c[1].length))),wrong=pickN(others,Math.min(others.length,5-right.length));
  return {type:'multi',badge:'Select all',question:c[2]+' Choose all that are correct.',opts:shuf(right.concat(wrong)),answers:right,
    explanation:`${right.map(esc).join(', ')} — ${right.length===1?'it fits':'they fit'} the group “${esc(c[0])}.”`,hint:'More than one answer is correct.'};}
function bankOrder(gen){const o=pick(ORDER_BANK[gen]);return {type:'order',badge:'Put in order',question:o.q,items:o.items.slice(),explanation:o.e,hint:'Find the first one, then think about what comes next.'};}

// ---------- number lines ----------
function nlFrac(maxW){const d=pick([2,3,4,6,8].filter(x=>x<=8)),W=maxW||1,steps=d*W;const n=R(1,steps-1);
  const lab=Array.from({length:steps+1},(_,i)=>i%d===0?String(i/d):'');
  const g=gcd(n,d);const show=n>d?`${Math.floor(n/d)} ${n%d}/${d}`.replace(/ 0\/\d+$/,''):`${n}/${d}`;
  return {type:'nline',badge:'Number line',question:`Place ${show} on the number line.`,min:0,max:W,steps,labels:lab,ans:n,
    names:Array.from({length:steps+1},(_,i)=>i%d===0?String(i/d):`${i}/${d}`),explanation:`The space between each whole number is split into ${d} equal parts, so each mark is 1/${d}. Count ${n} marks from 0.`,hint:`Each small mark is 1/${d}.`,answerText:show};}
function nlDec(){const steps=10;const n=R(1,9);const lab=Array.from({length:11},(_,i)=>i===0?'0':i===10?'1':'');
  return {type:'nline',badge:'Number line',question:`Place 0.${n} on the number line.`,min:0,max:1,steps,labels:lab,ans:n,names:Array.from({length:11},(_,i)=>i===10?'1':'0.'+i),
    explanation:`From 0 to 1 is split into 10 equal parts, so each mark is 0.1. Count ${n} marks from 0.`,hint:'Each mark is one tenth.',answerText:'0.'+n};}
function nlDec2(){const a=R(1,9);const n=R(1,9);const steps=10,lo=a/10;const lab=Array.from({length:11},(_,i)=>i===0?(lo).toFixed(1):i===10?((a+1)/10).toFixed(1):'');
  const v=(lo+n/100).toFixed(2);
  return {type:'nline',badge:'Number line',question:`Place ${v} on the number line.`,min:lo,max:(a+1)/10,steps,labels:lab,ans:n,names:Array.from({length:11},(_,i)=>(lo+i/100).toFixed(2)),
    explanation:`From ${lo.toFixed(1)} to ${((a+1)/10).toFixed(1)} is split into 10 parts, so each mark is 0.01.`,hint:'Each mark is one hundredth.',answerText:v};}
function nlInt(lo,hi){const steps=hi-lo;let n;do n=R(lo,hi);while(n===0);
  const lab=Array.from({length:steps+1},(_,i)=>{const v=lo+i;return v%5===0?sgn(v):'';});
  return {type:'nline',badge:'Number line',question:`Place ${sgn(n)} on the number line.`,min:lo,max:hi,steps,labels:lab,ans:n-lo,names:Array.from({length:steps+1},(_,i)=>sgn(lo+i)),
    explanation:n<0?`${sgn(n)} is ${Math.abs(n)} units to the left of 0.`:`${n} is ${n} units to the right of 0.`,hint:'Negative numbers are to the left of 0.',answerText:sgn(n)};}
function nlHalf(){const steps=12;const k=R(0,12);const v=-3+k/2;const name=x=>x===0?'0':(x<0?M:'')+(Number.isInteger(x)?Math.abs(x):Math.floor(Math.abs(x))?`${Math.floor(Math.abs(x))} 1/2`:'1/2');
  if(Number.isInteger(v))return nlHalf();
  return {type:'nline',badge:'Number line',question:`Place ${name(v)} on the number line.`,min:-3,max:3,steps,labels:Array.from({length:13},(_,i)=>i%2===0?sgn(-3+i/2):''),ans:k,names:Array.from({length:13},(_,i)=>name(-3+i/2)),
    explanation:`Each mark is 1/2. ${name(v)} is halfway between ${sgn(Math.floor(v))} and ${sgn(Math.ceil(v))}.`,hint:'Each mark is one half.',answerText:name(v)};}
const GEN_NL={g3_ns3:()=>nlFrac(1),g4_frac:()=>nlFrac(pick([1,2])),g4_dec:nlDec,g5_ns1:()=>pick([nlDec,nlDec2])(),g6_intns:()=>nlInt(-10,10),g6_int:()=>nlInt(-10,10),g7_ns2:nlHalf};

// ---------- coordinate plots ----------
function plotQ(x,y,question,expl){return {type:'plot',badge:'Plot a point',question,R:Math.max(5,Math.abs(x)+1,Math.abs(y)+1)>10?10:Math.max(5,Math.abs(x)+1,Math.abs(y)+1),ans:[x,y],explanation:expl,hint:'Start at the origin. Move left or right for x, then up or down for y.',answerText:`(${sgn(x)}, ${sgn(y)})`};}
function plotNative(){const x=R(-6,6)||3,y=R(-6,6)||-2;return plotQ(x,y,`Plot the point (${sgn(x)}, ${sgn(y)}).`,`Start at (0, 0). Move ${Math.abs(x)} ${x<0?'left':'right'}, then ${Math.abs(y)} ${y<0?'down':'up'}.`);}
const GEN_PLOT={g6_coord:plotNative};

// ---------- conversion of existing multiple-choice questions ----------
const COORD=/^\(\s*([−-]?\d+)\s*,\s*([−-]?\d+)\s*\)$/;
const num=s=>Number(String(s).replace(/−/g,'-').replace(/,/g,''));
function parseNum(s){s=String(s).trim().replace(/−/g,'-').replace(/,/g,'').replace(/^\$/,'').replace(/%$/,'');
  let m=/^(-?\d+) (\d+)\/(\d+)$/.exec(s);if(m)return (+m[1])+(m[1].startsWith('-')?-1:1)*m[2]/m[3];
  m=/^(-?\d+)\/(\d+)$/.exec(s);if(m)return +m[2]?m[1]/m[2]:NaN;
  return /^-?\d*\.?\d+$/.test(s)?+s:NaN;}
// Split an answer into prefix ($), number and unit suffix ("cm", "square feet", "°").
function splitAns(a){a=String(a).trim();const m=/^(\$)?([−-]?\d[\d,]*(?:\.\d+)?(?: \d+\/\d+)?|[−-]?\d+\/\d+)(%|°|\s?[a-zA-Z²³][a-zA-Z²³ .]{0,18})?$/.exec(a);
  if(!m)return null;return {pre:m[1]||'',n:m[2],suf:(m[3]||'').trim()};}
const NO_TYPE=/which|NOT|closest|best|estimate|about how|compare|true|false|simplest|lowest terms|equivalent|reasonable|pattern|rule|expression|equation|order|greatest|least|round|nearest/i;
function toInput(q,gen){
  if(q.type!=='mc'||q.dgSvg||q.passage||NO_TYPE.test(q.question))return null;
  const sp=splitAns(q.answer);if(!sp||isNaN(parseNum(sp.n)))return null;
  // every option should have the same shape, or the question is really about choosing
  if(!q.opts.every(o=>{const s=splitAns(o);return s&&s.suf===sp.suf&&s.pre===sp.pre;}))return null;
  return Object.assign({},q,{type:'input',badge:'Type the answer',pre:sp.pre,suf:sp.suf,num:sp.n,frac:/\//.test(sp.n),opts:undefined,
    hint:q.hint||'Work it out, then type your answer.'});
}
function toPlot(q){if(q.type!=='mc')return null;const m=COORD.exec(String(q.answer));if(!m)return null;const x=num(m[1]),y=num(m[2]);if(Math.abs(x)>10||Math.abs(y)>10)return null;
  const p=plotQ(x,y,q.question.replace(/Where is (it|[A-Z]′?)\??$/,'Plot $1.').replace(/What (are|is) the (new )?coordinates[^?]*\?/,'Plot the new point.'),q.explanation);
  if(!/Plot/.test(p.question))p.question+=' Plot your answer on the grid.';p.sol=q.sol;return p;}

// Make a practice/test question: sometimes a SOL-style format.
window.solFormats=function(gen,q,isTest){
  const subj=(typeof SESSION!=='undefined'&&SESSION.subj)||'';
  const r=Math.random(),pTEI=isTest?0.35:0.3;
  const sources=[];
  if(SORT_BANK[gen])sources.push(()=>bankSort(gen),()=>bankMulti(gen));
  if(ORDER_BANK[gen])sources.push(()=>bankOrder(gen));
  if(GEN_SORT[gen])sources.push(GEN_SORT[gen]);
  if(GEN_NL[gen])sources.push(GEN_NL[gen],GEN_NL[gen]);
  if(GEN_PLOT[gen])sources.push(GEN_PLOT[gen],GEN_PLOT[gen]);
  if(sources.length&&r<pTEI){for(let i=0;i<4;i++){const nq=pick(sources)();if(nq){nq.sol=nq.sol||q.sol;nq.gen=gen;return nq;}}}
  const p=toPlot(q);if(p&&Math.random()<0.7)return p;
  if(q.type==='mc'&&Math.random()<(isTest?0.4:0.3)){const t=toInput(q,gen);if(t)return t;}
  return q;
};
window.SOL_TYPES=['input','sort','nline','plot'];
window.solHas=gen=>!!(SORT_BANK[gen]||ORDER_BANK[gen]||GEN_SORT[gen]||GEN_NL[gen]||GEN_PLOT[gen]);
window._solParseNum=parseNum;
})();

// ── checking ──
function solCheckInput(q,txt){
  const s=String(txt||'').trim().replace(/^\$/,'').replace(/\s+/g,' ').replace(/\s*[a-zA-Z²³°%][a-zA-Z²³°% .]*$/,'').trim();
  if(!s)return false;const v=_solParseNum(s),a=_solParseNum(q.num);
  if(isNaN(v))return false;
  if(q.frac&&/simplest|lowest/i.test(q.question))return s.replace(/-/g,'−')===q.num;
  return Math.abs(v-a)<1e-6;
}
function solSortOK(q,place){return q.items.every((it,i)=>place[i]===it.c);}
function solCorrectText(q){
  if(q.type==='input')return (q.pre||'')+q.num+(q.suf?(q.suf==='%'||q.suf==='°'?'':' ')+q.suf:'');
  if(q.type==='sort')return q.cats.map((c,ci)=>c+': '+q.items.filter(x=>x.c===ci).map(x=>x.t).join(', ')).join(' · ');
  if(q.type==='nline')return q.answerText;
  if(q.type==='plot')return q.answerText;
}

// ── drawing helpers ──
function solKeypad(id,keys){
  keys=keys||['7','8','9','⌫','4','5','6','/','1','2','3','−','0','.','space'];
  return `<div class="kp" role="group" aria-label="Number keypad">${keys.map(k=>`<button class="kp-k${k==='⌫'?' kp-bs':''}" onclick="solKey('${id}','${k}')" aria-label="${k==='⌫'?'Delete':k==='space'?'Space':k==='/'?'Fraction bar':k==='−'?'Negative sign':k}">${k==='space'?'␣':k}</button>`).join('')}</div>`;
}
function solKey(id,k){const el=document.getElementById(id);if(!el||el.disabled)return;
  if(k==='⌫')el.value=el.value.slice(0,-1);else el.value+=(k==='space'?' ':k);
  el.dispatchEvent(new Event('input'));FX.click();}
function solInputHTML(q,id,val){
  const coarse=(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
  return `<div class="ti-row">${q.pre?`<span class="ti-aff">${esc(q.pre)}</span>`:''}<input id="${id}" class="ti-in" type="text" autocomplete="off" spellcheck="false" ${coarse?'inputmode="none"':'inputmode="decimal"'} aria-label="Your answer" value="${esc(val||'')}" placeholder="?">${q.suf?`<span class="ti-aff">${esc(q.suf)}</span>`:''}</div>
    ${solKeypad(id)}<div class="sm-label">${q.frac?'Type a fraction like 3/4, or a mixed number like 1 1/2.':'Type a number.'}</div>`;
}
function solSortHTML(q,place,sel,pre){
  const bank=q.items.map((it,i)=>place[i]==null?`<button class="srt-chip${sel===i?' sel':''}" onclick="${pre}Pick(${i})" aria-pressed="${sel===i}">${esc(it.t)}</button>`:'').join('');
  return `<div class="sm-label">Tap an item, then tap the group where it belongs.</div>
    <div class="srt-bank" aria-label="Items to sort">${bank||'<span class="ph">All sorted — tap Check, or tap an item to move it.</span>'}</div>
    <div class="srt-cols c${q.cats.length}">${q.cats.map((c,ci)=>`<div class="srt-col"><button class="srt-h" onclick="${pre}Drop(${ci})" aria-label="Put the selected item in ${esc(c)}">${esc(c)}</button>
      <div class="srt-in">${q.items.map((it,i)=>place[i]===ci?`<button class="srt-chip in" data-i="${i}" onclick="${pre}Back(${i})">${esc(it.t)}</button>`:'').join('')}</div></div>`).join('')}</div>`;
}
function solNlSVG(q,pick,showAns){
  const W=640,H=130,x0=34,x1=W-34,y=50,n=q.steps,X=i=>x0+(x1-x0)*i/n;
  let s=`<svg viewBox="0 0 ${W} ${H}" class="nl-svg" role="group" aria-label="Number line">
    <line x1="${x0-18}" y1="${y}" x2="${x1+18}" y2="${y}" stroke="#1B2A4A" stroke-width="3"/>
    <path d="M${x0-24} ${y} l10 -7 v14z M${x1+24} ${y} l-10 -7 v14z" fill="#1B2A4A"/>`;
  for(let i=0;i<=n;i++){const big=q.labels[i]!=='';s+=`<line x1="${X(i)}" y1="${y-(big?14:9)}" x2="${X(i)}" y2="${y+(big?14:9)}" stroke="#1B2A4A" stroke-width="${big?4:3}"/>`;
    if(big)s+=`<text x="${X(i)}" y="${y+50}" text-anchor="middle" font-size="30" font-weight="800" fill="#1B2A4A">${q.labels[i]}</text>`;}
  if(showAns)s+=`<circle cx="${X(q.ans)}" cy="${y}" r="14" fill="none" stroke="#16A34A" stroke-width="5"/>`;
  if(pick!=null)s+=`<circle cx="${X(pick)}" cy="${y}" r="12" fill="${showAns?(pick===q.ans?'#16A34A':'#DC2626'):'#2F6FE0'}"/>`;
  return s+'</svg>';
}
function solNlHTML(q,pick,pre){
  return `<div class="nl-wrap">${solNlSVG(q,pick,false)}<div class="nl-hits" style="--n:${q.steps}">${Array.from({length:q.steps+1},(_,i)=>`<button class="nl-hit${pick===i?' on':''}" style="left:calc(${34/640*100}% + ${(572/640*100)*i/q.steps}%)" onclick="${pre}Nl(${i})" aria-label="${esc(q.names[i])}"></button>`).join('')}</div></div>
    <div class="sm-label">Tap a mark on the number line.</div>`;
}
function solGridSVG(q,pt,showAns){
  const Rr=q.R,S=360,c=S/2,u=(S-30)/(2*Rr),P=(x,y)=>[c+x*u,c-y*u];
  let s=`<svg viewBox="0 0 ${S} ${S}" class="cg-svg" data-r="${Rr}">`;
  for(let i=-Rr;i<=Rr;i++){const [a]=P(i,0),[,b]=P(0,i);
    s+=`<line x1="${a}" y1="${c-Rr*u}" x2="${a}" y2="${c+Rr*u}" stroke="${i?'#D5DCE8':'#1B2A4A'}" stroke-width="${i?1:2.5}"/><line x1="${c-Rr*u}" y1="${b}" x2="${c+Rr*u}" y2="${b}" stroke="${i?'#D5DCE8':'#1B2A4A'}" stroke-width="${i?1:2.5}"/>`;
    if(i&&(Rr<=6||i%2===0))s+=`<text x="${a}" y="${c+15}" text-anchor="middle" font-size="11" fill="#475569">${sgn2(i)}</text><text x="${c-7}" y="${b+4}" text-anchor="end" font-size="11" fill="#475569">${sgn2(i)}</text>`;}
  s+=`<text x="${c+Rr*u-4}" y="${c-6}" font-size="13" font-weight="800" text-anchor="end" fill="#1B2A4A">x</text><text x="${c+8}" y="${c-Rr*u+12}" font-size="13" font-weight="800" fill="#1B2A4A">y</text>`;
  if(showAns){const [ax,ay]=P(q.ans[0],q.ans[1]);s+=`<circle cx="${ax}" cy="${ay}" r="10" fill="none" stroke="#16A34A" stroke-width="3.5"/>`;}
  if(pt){const [px,py]=P(pt[0],pt[1]);s+=`<circle cx="${px}" cy="${py}" r="7" fill="${showAns?(pt[0]===q.ans[0]&&pt[1]===q.ans[1]?'#16A34A':'#DC2626'):'#2F6FE0'}"/>`;}
  return s+'</svg>';
}
function sgn2(n){return n<0?'−'+Math.abs(n):String(n);}
function solPlotHTML(q,pt,pre){
  return `<div class="cg-wrap" onclick="${pre}Grid(event,this)">${solGridSVG(q,pt,false)}</div>
    <div class="cg-ctl"><span>Your point: <b>${pt?`(${sgn2(pt[0])}, ${sgn2(pt[1])})`:'none yet'}</b></span>
      <span class="cg-arrows" role="group" aria-label="Move the point">${[['←',-1,0,'left'],['→',1,0,'right'],['↑',0,1,'up'],['↓',0,-1,'down']].map(([a,dx,dy,l])=>`<button class="kp-k" onclick="event.stopPropagation();${pre}Move(${dx},${dy})" aria-label="Move point ${l}">${a}</button>`).join('')}</span></div>
    <div class="sm-label">Tap where the point goes, or use the arrows.</div>`;
}
function solGridPoint(ev,wrap,q){const svg=wrap.querySelector('svg');const r=svg.getBoundingClientRect();
  const S=360,c=S/2,u=(S-30)/(2*q.R);const x=(ev.clientX-r.left)*S/r.width,y=(ev.clientY-r.top)*S/r.height;
  const gx=Math.round((x-c)/u),gy=Math.round((c-y)/u);return [Math.max(-q.R,Math.min(q.R,gx)),Math.max(-q.R,Math.min(q.R,gy))];}

// ── practice: render + check ──
const _rqSol=renderQuestion;
renderQuestion=function(q,body){
  if(!SOL_TYPES.includes(q.type))return _rqSol.apply(this,arguments);
  SESSION.wp=false;
  const col=sessColor();const card=document.createElement('div');card.className='qc';
  const head=`${qHeader(q,col)}<div class="q-text">${esc(q.question).replace(/\n/g,'<br>')}</div><div class="hintbox" id="hintBox">${ic('bulb')} ${q.hint||''}</div>`;
  SESSION.sp={place:q.items?q.items.map(()=>null):null,sel:null,pick:null,pt:null};
  card.innerHTML=head+'<div id="solArea"></div>';body.appendChild(card);solDraw();
  actionBar(body,`<button class="btn btn-sec" onclick="showHint()">${ic('bulb')} Hint</button><button class="btn btn-pri" style="background:${col}" onclick="solCheck()">Check</button>`);
  if(q.type==='input'){const el=document.getElementById('solIn');el.addEventListener('keydown',e=>{if(e.key==='Enter')solCheck();});if(!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))setTimeout(()=>el.focus(),50);}
};
function solDraw(){const q=SESSION.q,sp=SESSION.sp,a=document.getElementById('solArea');if(!a)return;
  if(q.type==='input'){if(!document.getElementById('solIn'))a.innerHTML=solInputHTML(q,'solIn','');return;}
  if(q.type==='sort')a.innerHTML=solSortHTML(q,sp.place,sp.sel,'solS');
  if(q.type==='nline')a.innerHTML=solNlHTML(q,sp.pick,'sol');
  if(q.type==='plot')a.innerHTML=solPlotHTML(q,sp.pt,'sol');
}
function solSPick(i){if(SESSION.answered)return;SESSION.sp.sel=SESSION.sp.sel===i?null:i;FX.click();solDraw();}
function solSDrop(ci){if(SESSION.answered)return;const sp=SESSION.sp;if(sp.sel==null)return;sp.place[sp.sel]=ci;sp.sel=null;FX.click();solDraw();}
function solSBack(i){if(SESSION.answered)return;SESSION.sp.place[i]=null;SESSION.sp.sel=i;solDraw();}
function solNl(i){if(SESSION.answered)return;SESSION.sp.pick=i;FX.click();solDraw();}
function solGrid(ev,w){if(SESSION.answered)return;SESSION.sp.pt=solGridPoint(ev,w,SESSION.q);FX.click();solDraw();}
function solMove(dx,dy){if(SESSION.answered)return;const q=SESSION.q,p=SESSION.sp.pt||[0,0];SESSION.sp.pt=[Math.max(-q.R,Math.min(q.R,p[0]+dx)),Math.max(-q.R,Math.min(q.R,p[1]+dy))];solDraw();}
function solCheck(){
  if(SESSION.answered)return;const q=SESSION.q,sp=SESSION.sp,a=document.getElementById('solArea');let ok=false;
  if(q.type==='input'){const el=document.getElementById('solIn');if(!el.value.trim())return showHint();ok=solCheckInput(q,el.value);el.disabled=true;el.classList.add(ok?'ok':'bad');a.querySelectorAll('.kp-k').forEach(b=>b.disabled=true);}
  if(q.type==='sort'){if(sp.place.some(p=>p==null))return showHint();ok=solSortOK(q,sp.place);
    a.querySelectorAll('.srt-chip.in').forEach(b=>{const i=+b.dataset.i;b.disabled=true;b.classList.add(q.items[i].c===sp.place[i]?'ok':'bad');});a.querySelectorAll('.srt-h').forEach(b=>b.disabled=true);}
  if(q.type==='nline'){if(sp.pick==null)return showHint();ok=sp.pick===q.ans;a.innerHTML=`<div class="nl-wrap">${solNlSVG(q,sp.pick,true)}</div>`;}
  if(q.type==='plot'){if(!sp.pt)return showHint();ok=sp.pt[0]===q.ans[0]&&sp.pt[1]===q.ans[1];a.innerHTML=`<div class="cg-wrap">${solGridSVG(q,sp.pt,true)}</div>`;}
  record(ok,solCorrectText(q),q.explanation);
}

// Practice: use SOL formats when making questions (not in review mode, which replays the saved question).
const _nqSol=nextQuestion;
nextQuestion=function(){
  if(SESSION.mode==='review'||!SESSION.gen)return _nqSol.apply(this,arguments);
  const mk=makeQ;makeQ=function(g){const q=mk.apply(this,arguments);return g===SESSION.gen?solFormats(g,q,false):q;};
  try{return _nqSol.apply(this,arguments);}finally{makeQ=mk;}
};

// ── practice tests ──
startTest=function(){
  const s=T.setup;const subs=s.subj==='mixed'?testSubjects():[s.subj];
  const pool=[];subs.forEach(sj=>skillsFor(sj).forEach(st=>pool.push({subj:sj,st})));
  const order=[];while(order.length<s.n){shuf(pool.slice()).forEach(p=>{if(order.length<s.n)order.push(p);});}
  const OKT=['mc','multi','order'].concat(SOL_TYPES);
  const qs=order.map(p=>{let q;for(let i=0;i<12;i++){q=makeQ(p.st.gen);if(OKT.includes(q.type))break;}
    if(q.type==='mc'||solHas(p.st.gen))q=solFormats(p.st.gen,q,true);
    return {q,subj:p.subj,code:p.st.code,name:p.st.name};}).filter(x=>OKT.includes(x.q.type));
  Object.assign(T,{qs,ans:qs.map(()=>null),flags:new Set(),elim:qs.map(()=>new Set()),i:0,start:Date.now(),
    limit:s.timed?Math.round(qs.length*90):0,label:(s.subj==='mixed'?'Mixed':SUBJ[s.subj].short)+` · ${qs.length} questions`,done:false});
  testDraw();
  _tick=setInterval(()=>{const el=document.getElementById('tTime');if(!el)return;const e=(Date.now()-T.start)/1000;
    if(T.limit){const left=Math.max(0,T.limit-e);el.textContent='⏱ '+clock(left);el.classList.toggle('low',left<60);if(left<=0)submitTest(true);}
    else el.textContent='⏱ '+clock(e);},1000);
};
const _tdSol=testDraw;
testDraw=function(){
  const it=T.qs[T.i],q=it.q;if(!SOL_TYPES.includes(q.type))return _tdSol.apply(this,arguments);
  // Draw an ordinary frame with a stand-in mc body, then swap in our body.
  const real=it.q;it.q={type:'mc',question:'',opts:[]};
  try{_tdSol.apply(this,arguments);}finally{it.q=real;}
  const qc=document.querySelector('.act-body .qc');if(!qc)return;
  qc.querySelector('.q-text')&&qc.querySelector('.q-text').remove();qc.querySelector('.opts')&&qc.querySelector('.opts').remove();
  const a=T.ans[T.i];const div=document.createElement('div');
  div.innerHTML=`<div class="q-text">${esc(q.question)}</div><div id="tSol"></div>`;qc.append(...div.childNodes);
  const area=document.getElementById('tSol');
  if(q.type==='input'){area.innerHTML=solInputHTML(q,'tIn',a||'');const el=document.getElementById('tIn');el.addEventListener('input',()=>{T.ans[T.i]=el.value.trim()?el.value:null;
    const d=document.querySelectorAll('.t-dot')[T.i];if(d)d.classList.toggle('done',!!T.ans[T.i]);});}
  if(q.type==='sort'){const pl=a||q.items.map(()=>null);area.innerHTML=solSortHTML(q,pl,T._sel,'tS');}
  if(q.type==='nline')area.innerHTML=solNlHTML(q,a,'t');
  if(q.type==='plot')area.innerHTML=solPlotHTML(q,a,'t');
};
function tSPick(i){T._sel=T._sel===i?null:i;FX.click();testDraw();}
function tSDrop(ci){if(T._sel==null)return;const q=T.qs[T.i].q;const pl=(T.ans[T.i]||q.items.map(()=>null)).slice();pl[T._sel]=ci;T.ans[T.i]=pl;T._sel=null;FX.click();testDraw();}
function tSBack(i){const pl=T.ans[T.i].slice();pl[i]=null;T.ans[T.i]=pl.every(x=>x==null)?null:pl;T._sel=i;testDraw();}
function tNl(i){T.ans[T.i]=i;FX.click();testDraw();}
function tGrid(ev,w){T.ans[T.i]=solGridPoint(ev,w,T.qs[T.i].q);FX.click();testDraw();}
function tMove(dx,dy){const q=T.qs[T.i].q,p=T.ans[T.i]||[0,0];T.ans[T.i]=[Math.max(-q.R,Math.min(q.R,p[0]+dx)),Math.max(-q.R,Math.min(q.R,p[1]+dy))];testDraw();}
const _giSol=gradeItem;
gradeItem=function(it,a){const q=it.q;if(!SOL_TYPES.includes(q.type))return _giSol.apply(this,arguments);
  if(a==null)return false;
  if(q.type==='input')return solCheckInput(q,a);
  if(q.type==='sort')return a.every(x=>x!=null)&&solSortOK(q,a);
  if(q.type==='nline')return a===q.ans;
  if(q.type==='plot')return a[0]===q.ans[0]&&a[1]===q.ans[1];};
const _ctSol=correctText;
correctText=function(q){return SOL_TYPES.includes(q.type)?solCorrectText(q):_ctSol.apply(this,arguments);};
const _ytSol=yourText;
yourText=function(it,a){const q=it.q;if(!SOL_TYPES.includes(q.type))return _ytSol.apply(this,arguments);
  if(a==null)return 'No answer';
  if(q.type==='input')return a;
  if(q.type==='sort')return q.cats.map((c,ci)=>c+': '+q.items.filter((x,i)=>a[i]===ci).map(x=>x.t).join(', ')).join(' · ');
  if(q.type==='nline')return q.names[a];
  if(q.type==='plot')return `(${sgn2(a[0])}, ${sgn2(a[1])})`;};
// Reading a SOL-format question aloud
const _spqSol=typeof speakQuestion==='function'?speakQuestion:null;
if(_spqSol)speakQuestion=function(){const q=SESSION.q;if(q&&SOL_TYPES.includes(q.type)){let t=plain(q.question);if(q.type==='sort')t+='. The groups are: '+q.cats.join(', ')+'.';speak(t);return;}return _spqSol.apply(this,arguments);};

