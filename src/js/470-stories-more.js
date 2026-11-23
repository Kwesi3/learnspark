// ═══════════════════════════════════════════════════════════════
// MORE STORY TIME BOOKS — 12 new books (3 per level), with painted pictures.
// Pages use picture keys (art/st_<id><n>.webp); until a picture exists, a
// general story picture is shown instead.
// Level 4 is new: Grades 7–8.
// ═══════════════════════════════════════════════════════════════
BOOK_LEVELS[4]={label:'Level 4',grades:'Grades 7–8',color:'#BA5840'};
myLevel=function(){return ST.grade<=2?1:ST.grade<=4?2:ST.grade<=6?3:4;};
// scenes can now be a picture key (string) instead of a drawn SVG scene
const _sceneSVG=scene;
scene=function(sc,alt){
  if(typeof sc!=='string')return _sceneSVG(sc,alt);
  const key=ART_HAVE.has(sc)?sc:'gen_stories';
  return `<img class="scene-img" src="${artSrc(key,!alt||/^Cover/.test(alt))}" alt="${esc(alt||'')}" decoding="async">`;};
// the bookshelf shows all four levels
const _rstV=renderStoriesTab;
renderStoriesTab=function(c){_rstV(c);const lv=_shelfLevel||myLevel();const ch=c.querySelector('.chips');
  if(ch)ch.innerHTML=[1,2,3,4].map(l=>`<button class="chip${l===lv?' on':''}" style="${l===lv?`background:${BOOK_LEVELS[l].color};border-color:${BOOK_LEVELS[l].color}`:''}" onclick="_shelfLevel=${l};renderTab()">${BOOK_LEVELS[l].label} <b>${BOOK_LEVELS[l].grades}</b>${l===myLevel()?' ⭐':''}</button>`).join('');};
const _atpV=applyTextPrefs;
applyTextPrefs=function(){_atpV();const el=document.getElementById('rText');if(el&&READ.book&&READ.book.level===4){
  const mult=[.82,1,1.18,1.36,1.56][ST.settings.readSize??1];el.style.fontSize=(1.1*mult).toFixed(2)+'rem';}};

STORIES.push(
// ── Level 1 · Grades 1–2 ──
{id:'kente',title:'Kofi’s Kente Colors',level:1,kind:'Story',sticker:'djembe',names:['Kofi','kente','Mama'],theme:'Ghana',
 cover:'st_kente1',
 words:{weaves:'makes cloth by crossing threads over and under',strip:'a long, thin piece',pride:'a happy feeling about something good'},
 pages:[
  {t:['Kofi lives in Ghana.','His grandpa makes kente cloth.'],art:'st_kente1',alt:'A boy watches his grandfather weave colorful cloth on a wooden loom'},
  {t:['Grandpa weaves gold, then green.','Gold, green, gold, green.'],art:'st_kente2',alt:'Close-up of gold and green kente cloth'},
  {t:['“What comes next?” asks Grandpa.','“Gold!” says Kofi.'],art:'st_kente2',alt:'The pattern of gold and green stripes'},
  {t:['Kofi wants to make a strip too.','He picks red, blue, red, blue.'],art:'st_kente3',alt:'The boy weaves a red and blue strip'},
  {t:['Kofi gives the strip to Mama.','Mama wears it with pride.'],art:'st_kente4',alt:'A smiling mother wears the red and blue strip'},
 ],
 qs:[
  {kind:'Detail',q:'What does Grandpa make?',o:['Kente cloth','Bread','A drum'],a:'Kente cloth',ev:[[0,1]],hint:'Look at the first page.',why:'The story says his grandpa makes kente cloth.'},
  {kind:'Pattern',q:'Gold, green, gold, green. What comes next?',o:['Gold','Red','Blue'],a:'Gold',ev:[[2,1]],hint:'What did Kofi say?',why:'The colors take turns, so gold comes after green.'},
  {kind:'Inference',q:'How does Mama feel about the strip?',o:['Proud and happy','Angry','Sleepy'],a:'Proud and happy',ev:[[4,1]],hint:'How does Mama wear it?',why:'Mama wears it with pride, so she is proud and happy.'},
 ]},
{id:'puddle',title:'Where Did the Puddle Go?',level:1,kind:'Science story',sticker:'kite',names:['Ben'],theme:'Science',
 cover:'st_puddle1',
 words:{puddle:'a small pool of water on the ground',vapor:'water that has turned into a gas in the air'},
 pages:[
  {t:['It rained all night.','In the morning, Ben saw a big puddle.'],art:'st_puddle1',alt:'A boy in rain boots looks at a big puddle'},
  {t:['Ben jumped in the puddle.','Splash!'],art:'st_puddle1',alt:'The boy splashes in the puddle'},
  {t:['The sun came out.','It was hot all day.'],art:'st_puddle2',alt:'The hot sun shines on a smaller puddle'},
  {t:['After lunch, the puddle was small.','By night, it was gone!'],art:'st_puddle3',alt:'The boy looks at a dry spot where the puddle was'},
  {t:['“Where did it go?” Ben asked.','“The sun turned it into water vapor,” said Mom.'],art:'st_puddle4',alt:'Mom and the boy look up at the clouds'},
  {t:['“The water went up into the air,” said Mom.','“Someday it will rain down again!”'],art:'st_puddle4',alt:'Clouds float in the sky'},
 ],
 qs:[
  {kind:'Sequence',q:'What happened FIRST?',o:['It rained all night','The sun came out','The puddle was gone'],a:'It rained all night',ev:[[0,0]],hint:'Look at the first page.',why:'The story begins with rain all night.'},
  {kind:'Cause and effect',q:'What made the puddle go away?',o:['The hot sun','Ben drank it','A dog'],a:'The hot sun',ev:[[2,0],[4,1]],hint:'What did Mom say?',why:'The sun turned the water into water vapor.'},
  {kind:'Detail',q:'Where did the water go?',o:['Up into the air','Under Ben’s bed','Into the house'],a:'Up into the air',ev:[[5,0]],hint:'Read the last page.',why:'Mom says the water went up into the air.'},
 ]},
{id:'library',title:'Nia’s First Library Card',level:1,kind:'Story',sticker:'bee',names:['Nia'],theme:'Everyday',
 cover:'st_library1',
 words:{librarian:'a person who helps people find books',borrow:'to take something and give it back later',form:'a paper you fill in'},
 pages:[
  {t:['Nia went to the library with Dad.','She wanted her very own library card.'],art:'st_library1',alt:'A girl and her dad walk into a library'},
  {t:['Nia wrote her name on a form.','She printed each letter with care.'],art:'st_library2',alt:'The girl writes her name at a desk'},
  {t:['The librarian gave Nia a blue card.','“You can borrow three books,” she said.'],art:'st_library2',alt:'A librarian hands the girl a blue card'},
  {t:['Nia picked a book about frogs, one about stars, and one about trucks.'],art:'st_library3',alt:'The girl holds three books'},
  {t:['At home, Nia read to her baby brother.','He clapped at every picture.'],art:'st_library4',alt:'The girl reads to her baby brother on the couch'},
  {t:['“I will bring them back next week,” Nia said.','“Then I can borrow three more!”'],art:'st_library4',alt:'The girl smiles with her books'},
 ],
 qs:[
  {kind:'Detail',q:'How many books can Nia borrow?',o:['Three','One','Ten'],a:'Three',ev:[[2,1]],hint:'What did the librarian say?',why:'The librarian says she can borrow three books.'},
  {kind:'Detail',q:'Which book did Nia NOT pick?',o:['A book about dogs','A book about frogs','A book about stars'],a:'A book about dogs',ev:[[3,0]],hint:'Read page 4.',why:'She picked frogs, stars and trucks — not dogs.'},
  {kind:'Inference',q:'Why will Nia bring the books back?',o:['So she can borrow more','Because she did not like them','Because Dad said no'],a:'So she can borrow more',ev:[[5,1]],hint:'Read the last page.',why:'She says that then she can borrow three more.'},
 ]},
// ── Level 2 · Grades 3–4 ──
{id:'market',title:'Akosua’s Market Day',level:2,kind:'Story',sticker:'sunflower',names:['Akosua','Makola','Accra','Esi','Auntie','cedis','cedi'],theme:'Ghana',
 cover:'st_market1',
 words:{cedis:'the money used in Ghana',change:'money you get back when you pay more than the price',note:'paper money'},
 pages:[
  {t:['Every Saturday, Akosua helps her aunt sell fruit at Makola Market in Accra, Ghana.','The market is loud, busy and full of color.'],art:'st_market1',alt:'A busy, colorful outdoor market in Ghana'},
  {t:['Auntie Esi sells pineapples for 10 cedis each and mangoes for 5 cedis each.','Cedis are the money used in Ghana.'],art:'st_market2',alt:'A fruit stall with pineapples and mangoes'},
  {t:['A woman asked for two pineapples and one mango.','Akosua added in her head: ten plus ten plus five.','“That will be 25 cedis,” she said.'],art:'st_market2',alt:'The girl helps a customer at the fruit stall'},
  {t:['The woman handed her a 50-cedi note.','Akosua counted up from 25, one note at a time, until she reached 50.'],art:'st_market3',alt:'The girl counts paper money'},
  {t:['“Here is your change: 25 cedis,” Akosua said, smiling.','Auntie Esi raised her eyebrows.','“Who taught you to count change so fast?”'],art:'st_market3',alt:'The aunt looks surprised and proud'},
  {t:['“You did,” Akosua laughed, “every Saturday!”'],art:'st_market4',alt:'The girl and her aunt laugh together at sunset'},
 ],
 qs:[
  {kind:'Detail',q:'How much does one pineapple cost?',o:['10 cedis','5 cedis','25 cedis'],a:'10 cedis',ev:[[1,0]],hint:'Read page 2.',why:'Auntie Esi sells pineapples for 10 cedis each.'},
  {kind:'Evidence',q:'Why did the woman owe 25 cedis?',o:['Two pineapples and one mango cost 10 + 10 + 5','Every fruit costs 25 cedis','She bought 25 mangoes'],a:'Two pineapples and one mango cost 10 + 10 + 5',ev:[[2,0],[2,1]],hint:'Add the prices of what she bought.',why:'10 + 10 + 5 = 25.'},
  {kind:'Detail',q:'How much change did the woman get?',o:['25 cedis','50 cedis','5 cedis'],a:'25 cedis',ev:[[4,0]],hint:'What did Akosua say?',why:'50 − 25 = 25 cedis.'},
  {kind:'Inference',q:'What does Akosua’s answer “You did” show?',o:['She learned by practicing with her aunt each week','She went to a math school','She guessed the answer'],a:'She learned by practicing with her aunt each week',ev:[[5,0]],hint:'When does Akosua help her aunt?',why:'She helps every Saturday, so she learned by practicing.'},
 ]},
{id:'yorktown',title:'The Spy Who Helped Win Yorktown',level:2,kind:'True story',sticker:'clock',names:['James','Armistead','Lafayette','Marquis','de','Kent','Yorktown'],theme:'Virginia history',
 cover:'st_yorktown1',
 words:{spy:'a person who secretly gathers information',reports:'information that is told or written down',surrendered:'gave up'},
 pages:[
  {t:['In 1781, the American Revolution was still being fought in Virginia.','James Armistead was an enslaved man who lived in New Kent County.'],art:'st_yorktown1',alt:'A Virginia farm in 1781'},
  {t:['James wanted to help the Americans win.','He asked to serve with the Marquis de Lafayette, a French general helping the American army.'],art:'st_yorktown2',alt:'James meets General Lafayette in a tent'},
  {t:['Lafayette sent James to the British camp as a spy.','The British thought James was working for them.'],art:'st_yorktown3',alt:'A British army camp with tents and soldiers'},
  {t:['James listened carefully.','He sent secret reports about British plans back to Lafayette.'],art:'st_yorktown3',alt:'James listens quietly near British officers'},
  {t:['His reports helped the Americans and the French trap the British army at Yorktown.','In October 1781, the British surrendered.'],art:'st_yorktown4',alt:'Ships and soldiers at Yorktown'},
  {t:['After the war, James was still enslaved.','Lafayette wrote a letter praising his work, and in 1787 Virginia granted James his freedom.','He took the name James Armistead Lafayette.'],art:'st_yorktown2',alt:'James holds a letter'},
 ],
 qs:[
  {kind:'Detail',q:'Where was the British army trapped?',o:['Yorktown','Boston','Jamestown'],a:'Yorktown',ev:[[4,0]],hint:'Read page 5.',why:'His reports helped trap the British army at Yorktown.'},
  {kind:'Inference',q:'Why did the British talk about their plans near James?',o:['They thought he was working for them','He was a British general','They did not speak English'],a:'They thought he was working for them',ev:[[2,1]],hint:'What did the British think?',why:'The British thought James was working for them.'},
  {kind:'Cause and effect',q:'What was one result of James’s reports?',o:['The British army was trapped and surrendered','The war started','James moved to France'],a:'The British army was trapped and surrendered',ev:[[4,0],[4,1]],hint:'What happened in October 1781?',why:'His reports helped trap the British, who surrendered.'},
  {kind:'Detail',q:'How did James gain his freedom?',o:['Virginia granted it in 1787 after Lafayette praised him','The British freed him','He ran away to France'],a:'Virginia granted it in 1787 after Lafayette praised him',ev:[[5,1]],hint:'Read the last page.',why:'Lafayette praised his work, and Virginia granted his freedom in 1787.'},
 ]},
{id:'tornado',title:'Team Tornado',level:2,kind:'Story',sticker:'kite',names:['Maya','Tornadoes','Rivera','Jada'],theme:'Everyday',
 cover:'st_tornado1',
 words:{defenders:'players who try to stop the other team from scoring',strand:'one thin thread',surrounded:'all around on every side'},
 pages:[
  {t:['Maya was the fastest player on the Tornadoes, her soccer team.','But the Tornadoes had lost three games in a row.'],art:'st_tornado1',alt:'A girls’ soccer team sits sadly on a bench'},
  {t:['Every time Maya got the ball, she tried to score by herself.','Every time, three defenders surrounded her.'],art:'st_tornado2',alt:'A girl dribbles while three defenders surround her'},
  {t:['After practice, Coach Rivera drew circles on a whiteboard.','“Soccer is like a spider web,” she said.','“It is strongest when every strand is connected.”'],art:'st_tornado3',alt:'The coach draws on a whiteboard'},
  {t:['In the next game, Maya saw Jada open on the left.','She passed instead of shooting.'],art:'st_tornado4',alt:'The girl passes the ball to a teammate'},
  {t:['Jada kicked the ball into the corner of the net.','The Tornadoes cheered louder than they had all season.'],art:'st_tornado4',alt:'The team cheers after a goal'},
  {t:['They still did not win every game after that.','But they never lost three in a row again.'],art:'st_tornado3',alt:'The team smiles together'},
 ],
 qs:[
  {kind:'Problem',q:'What was the team’s problem at the start?',o:['They had lost three games in a row','They had no coach','Maya was slow'],a:'They had lost three games in a row',ev:[[0,1]],hint:'Read page 1.',why:'The Tornadoes had lost three games in a row.'},
  {kind:'Figurative language',q:'What did Coach Rivera mean by the spider web?',o:['The team is strongest when players work together','Spiders play soccer','The net needs fixing'],a:'The team is strongest when players work together',ev:[[2,1],[2,2]],hint:'A web is strong when strands are connected.',why:'Connected strands are like teammates working together.'},
  {kind:'Character',q:'How did Maya change?',o:['She started passing to teammates','She quit the team','She became slower'],a:'She started passing to teammates',ev:[[3,1]],hint:'What did she do in the next game?',why:'She passed instead of shooting.'},
  {kind:'Theme',q:'What is the theme of the story?',o:['Teamwork makes a group stronger','Fast players always win','Practice is boring'],a:'Teamwork makes a group stronger',ev:[[2,2],[5,1]],hint:'What changed after Maya passed?',why:'When Maya worked with her team, they did better.'},
 ]},
// ── Level 3 · Grades 5–6 ──
{id:'timbuktu',title:'The Salt Caravan to Timbuktu',level:3,kind:'Historical fiction',sticker:'djembe',names:['Bakari','Moussa','Taghaza','Timbuktu','Mansa','Musa','Sahara','Mali'],theme:'West Africa',
 cover:'st_timbuktu1',
 words:{caravan:'a group of traders traveling together, often with camels',slabs:'thick, flat pieces',spoiling:'going bad',scholars:'people who study and know a great deal'},
 pages:[
  {t:['Bakari had never seen so much sand.','For twenty days, his uncle’s camel caravan had crossed the Sahara, carrying slabs of salt from the mines of Taghaza.'],art:'st_timbuktu1',alt:'A camel caravan crosses golden desert dunes'},
  {t:['“In Timbuktu, salt is worth almost as much as gold,” Uncle Moussa said.','“People need it to keep food from spoiling and to stay healthy in the heat.”'],art:'st_timbuktu1',alt:'The caravan rests under the stars'},
  {t:['When the walls of Timbuktu finally appeared, Bakari gasped.','Traders filled the market, trading salt for gold, cloth and ivory.'],art:'st_timbuktu2',alt:'A busy market in front of a mud-brick mosque'},
  {t:['But what amazed Bakari most were the scholars.','In the shade of the great mosque, students copied books by hand and argued about mathematics, medicine and the stars.'],art:'st_timbuktu3',alt:'Scholars and students study books in the shade'},
  {t:['“Under Mansa Musa, Mali grew rich from trade,” a scholar told him.','“But our greatest treasure is knowledge, because it cannot be stolen.”'],art:'st_timbuktu3',alt:'A scholar speaks to the boy'},
  {t:['On the long journey home, Bakari carried something new: a small book his uncle had traded for.','He decided he would learn to read every page.'],art:'st_timbuktu4',alt:'The boy reads a book on a camel under the stars'},
 ],
 qs:[
  {kind:'Detail',q:'What did the caravan carry to Timbuktu?',o:['Slabs of salt','Barrels of oil','Bags of rice'],a:'Slabs of salt',ev:[[0,1]],hint:'Read page 1.',why:'The caravan carried slabs of salt from Taghaza.'},
  {kind:'Cause and effect',q:'Why was salt so valuable?',o:['People needed it to keep food from spoiling and to stay healthy','It was used to build houses','It was rare in the mines'],a:'People needed it to keep food from spoiling and to stay healthy',ev:[[1,1]],hint:'What did Uncle Moussa say?',why:'Salt kept food from spoiling and helped people stay healthy in the heat.'},
  {kind:'Theme',q:'What does the scholar mean by “knowledge … cannot be stolen”?',o:['What you learn stays with you','Books are always locked up','Thieves cannot read'],a:'What you learn stays with you',ev:[[4,1]],hint:'Can someone take away what you know?',why:'Gold can be taken, but what you learn stays with you.'},
  {kind:'Character',q:'How does Bakari change by the end?',o:['He becomes eager to learn to read','He decides to live in the desert','He wants to sell salt forever'],a:'He becomes eager to learn to read',ev:[[5,1]],hint:'What does he decide on the journey home?',why:'He decides to learn to read every page of his book.'},
 ]},
{id:'blackout',title:'The Night the Lights Went Out',level:3,kind:'Science story',sticker:'rover',names:['Marcus','Ruby','Sparky'],theme:'Science',
 cover:'st_blackout1',
 words:{circuit:'a complete path that electricity flows through',conductor:'a material that lets electricity flow easily',backward:'facing the wrong way'},
 pages:[
  {t:['The ice storm knocked out the power just after dinner.','The house went dark and silent, except for the tick of the clock.'],art:'st_blackout1',alt:'A dark house during an ice storm'},
  {t:['Marcus found a flashlight, but it would not turn on.','When he opened it, he saw that one battery had been put in backward.'],art:'st_blackout2',alt:'A boy looks at batteries inside a flashlight'},
  {t:['“A circuit has to be a complete loop,” he remembered from science class.','“Electricity flows from one end of the battery, through the bulb, and back to the other end.”'],art:'st_blackout2',alt:'The boy thinks about circuits'},
  {t:['He flipped the battery around and clicked the switch.','A bright beam lit up the kitchen.'],art:'st_blackout3',alt:'A flashlight beam lights the kitchen'},
  {t:['His little sister, Ruby, wanted her own light.','Marcus taped a small bulb to a battery with strips of aluminum foil.','When he pressed the foil to the battery, the bulb glowed, and when he lifted it, the light went out.'],art:'st_blackout3',alt:'A tiny bulb glows on a battery with foil'},
  {t:['“You made a switch!” Ruby said.','“The foil is a conductor,” Marcus explained.','“When it touches, the circuit is closed, and when it doesn’t, the circuit is open.”'],art:'st_blackout4',alt:'Brother and sister smile at the glowing bulb'},
  {t:['By the time the power came back, Ruby had named the tiny lamp Sparky.'],art:'st_blackout4',alt:'The tiny lamp glows in the dark'},
 ],
 qs:[
  {kind:'Problem and solution',q:'Why didn’t the flashlight work at first?',o:['One battery was in backward','The bulb was missing','It was full of water'],a:'One battery was in backward',ev:[[1,1]],hint:'What did Marcus see inside?',why:'One battery had been put in backward, so the circuit was not complete.'},
  {kind:'Science',q:'What does a circuit need for electricity to flow?',o:['A complete loop','A magnet','Cold air'],a:'A complete loop',ev:[[2,0]],hint:'What did Marcus remember?',why:'A circuit has to be a complete loop.'},
  {kind:'Inference',q:'Why did the bulb go out when Marcus lifted the foil?',o:['The circuit was open','The battery died','Ruby blew on it'],a:'The circuit was open',ev:[[4,2],[5,2]],hint:'What happens when the foil does not touch?',why:'Lifting the foil broke the loop, so the circuit was open.'},
  {kind:'Vocabulary',q:'Why is aluminum foil called a conductor?',o:['It lets electricity flow through it','It blocks electricity','It makes light by itself'],a:'It lets electricity flow through it',ev:[[5,1],[5,2]],hint:'What happened when the foil touched the battery?',why:'Electricity flowed through the foil and lit the bulb.'},
 ]},
{id:'homefront',title:'Letters from the Home Front',level:3,kind:'Historical fiction',sticker:'clock',names:['Norfolk','June','Papa','Mama','Hall'],theme:'Virginia history',
 cover:'st_homefront1',
 words:{weld:'to join metal by melting it with great heat',scrap:'old pieces that can be used again',ration:'a set amount each person is allowed',troops:'soldiers'},
 pages:[
  {t:['Dear Papa, Norfolk is so crowded now.','Thousands of workers have come to build and fix ships at the Navy Yard, and Mama is one of them!'],art:'st_homefront1',alt:'Women workers at a busy Navy shipyard in the 1940s'},
  {t:['She learned to weld, and she wears a heavy mask and gloves.','She says the sparks look like fireworks.'],art:'st_homefront1',alt:'A welder makes sparks'},
  {t:['Dear Papa, our class collected scrap metal for the war effort.','I gave my old roller skates.','Mrs. Hall says the metal can be melted to make ships and airplanes.'],art:'st_homefront2',alt:'Children add old metal to a big scrap pile'},
  {t:['We use ration stamps now to buy sugar, meat and gasoline.','Mama says everyone must share, so there is enough for the soldiers and sailors.'],art:'st_homefront3',alt:'A ration book on a kitchen table'},
  {t:['Dear Papa, Grandpa and I planted a victory garden behind the house.','Growing our own food means more food can go to the troops.'],art:'st_homefront4',alt:'A girl and her grandfather in a vegetable garden'},
  {t:['I put a pressed flower from our garden in this letter.','Please come home safe.','Love, June'],art:'st_homefront4',alt:'A letter with a pressed flower'},
 ],
 qs:[
  {kind:'Detail',q:'What job did Mama do at the Navy Yard?',o:['She welded metal for ships','She sold tickets','She drove a bus'],a:'She welded metal for ships',ev:[[0,1],[1,0]],hint:'Read pages 1 and 2.',why:'Mama works at the Navy Yard and learned to weld.'},
  {kind:'Cause and effect',q:'Why did people collect scrap metal?',o:['It could be melted to make ships and airplanes','To sell it for candy','To build houses'],a:'It could be melted to make ships and airplanes',ev:[[2,2]],hint:'What did Mrs. Hall say?',why:'The metal could be melted to make ships and airplanes.'},
  {kind:'Purpose',q:'Why did families use ration stamps?',o:['So there was enough for the soldiers and sailors','To get free toys','To mail letters'],a:'So there was enough for the soldiers and sailors',ev:[[3,1]],hint:'What did Mama say about sharing?',why:'Rationing let everyone share so there was enough for the military.'},
  {kind:'Text structure',q:'How is this story told?',o:['As letters from June to her father','As a newspaper article','As a play'],a:'As letters from June to her father',ev:[[0,0]],hint:'How do the pages begin?',why:'Each part begins “Dear Papa” and ends “Love, June.”'},
  {kind:'Inference',q:'How does June feel about her father?',o:['She misses him and worries about him','She is angry with him','She has never met him'],a:'She misses him and worries about him',ev:[[5,1]],hint:'What does she ask at the end?',why:'She asks him to come home safe.'},
 ]},
// ── Level 4 · Grades 7–8 ──
{id:'fair',title:'The Science Fair Mystery',level:4,kind:'Mystery',sticker:'spider',names:['Priya','Malik'],theme:'Science',
 cover:'st_fair1',
 words:{sabotaged:'damaged on purpose to make something fail',rival:'a person you compete against',iodine:'a chemical that turns blue-black when it touches starch',evidence:'facts that show whether something is true'},
 pages:[
  {t:['Priya’s model volcano had erupted perfectly every night that week.','But on the morning of the science fair, when she poured in the vinegar, nothing happened — not a single bubble.'],art:'st_fair1',alt:'A girl frowns at her model volcano at a science fair'},
  {t:['Her friend Malik leaned closer.','“Somebody sabotaged you,” he whispered, glancing at the next table, where her biggest rival was setting up.'],art:'st_fair1',alt:'A boy whispers to the girl'},
  {t:['Priya shook her head.','“A scientist doesn’t accuse anyone without evidence.”','She scooped a little of the white powder from her jar and rubbed it between her fingers.'],art:'st_fair2',alt:'Close-up of white powder and test tubes'},
  {t:['Baking soda feels gritty, she thought, but this powder was smooth and squeaky, like cornstarch.','To be sure, she added a drop of iodine from the chemistry table.','The powder turned blue-black — a test for starch.'],art:'st_fair2',alt:'A drop of iodine turns the powder blue-black'},
  {t:['That afternoon, the mystery was solved at home.','Her little brother had borrowed the baking soda for cookies and refilled the jar with the closest white powder he could find.'],art:'st_fair3',alt:'A little brother in the kitchen with cookies'},
  {t:['Priya didn’t win first prize, but she changed her poster.','Its new title read: “Two White Powders: How Chemical Tests Reveal What Our Eyes Cannot.”','The judges gave her an honorable mention, and her brother gave her a cookie.'],art:'st_fair4',alt:'The girl stands by her new poster with a ribbon'},
 ],
 qs:[
  {kind:'Problem',q:'Why didn’t the volcano erupt at the fair?',o:['The jar held cornstarch instead of baking soda','The vinegar was frozen','Her rival broke it'],a:'The jar held cornstarch instead of baking soda',ev:[[3,2],[4,1]],hint:'What did the iodine test show?',why:'The powder was starch, because her brother refilled the jar with cornstarch.'},
  {kind:'Evidence',q:'Which test showed the powder was starch?',o:['A drop of iodine turned it blue-black','It tasted sweet','It floated in water'],a:'A drop of iodine turned it blue-black',ev:[[3,1],[3,2]],hint:'What did she add from the chemistry table?',why:'Iodine turns blue-black when it touches starch.'},
  {kind:'Character',q:'What does “A scientist doesn’t accuse anyone without evidence” show about Priya?',o:['She relies on facts, not guesses','She is afraid of her rival','She doesn’t care about winning'],a:'She relies on facts, not guesses',ev:[[2,1]],hint:'What does she do instead of blaming someone?',why:'She tests the powder before deciding what happened.'},
  {kind:'Irony',q:'Malik suspected the rival. Who actually caused the problem?',o:['Her little brother, by accident','The rival, on purpose','The judges'],a:'Her little brother, by accident',ev:[[4,1]],hint:'What happened at home?',why:'Her brother refilled the jar without knowing the difference.'},
  {kind:'Theme',q:'Which theme best fits the story?',o:['Careful testing reveals the truth, even when appearances fool us','Never enter a science fair','Rivals always cheat'],a:'Careful testing reveals the truth, even when appearances fool us',ev:[[5,1]],hint:'Read her new poster title.',why:'The powders looked the same; only a chemical test showed the truth.'},
 ]},
{id:'volta',title:'When the River Became a Lake',level:4,kind:'Story',sticker:'turtle',names:['Efua','Adjoa','Akosombo','Volta','Grandma'],theme:'Ghana',
 cover:'st_volta1',
 words:{ferry:'a boat that carries people across water',farmland:'land used for growing crops',resettled:'moved to live in a new place'},
 pages:[
  {t:['The ferry hummed across Lake Volta, and Efua leaned over the rail to watch the water.','“Grandma, how deep is it here?”'],art:'st_volta1',alt:'A ferry crosses a wide lake'},
  {t:['Grandma Adjoa was quiet for a moment.','“Deep enough to cover my village,” she said.','“It is down there, under us.”'],art:'st_volta1',alt:'A grandmother looks out at the lake'},
  {t:['In 1965, Ghana finished building the Akosombo Dam across the Volta River.','The water backed up behind the dam and spread over the land, creating one of the largest human-made lakes in the world.'],art:'st_volta2',alt:'A huge dam holds back a river'},
  {t:['“The government said the dam would bring electricity to the whole country, and it brought a great deal,” Grandma said.','“Factories opened.','Cities lit up at night.”'],art:'st_volta2',alt:'Power lines run from the dam'},
  {t:['“But about 80,000 people had to leave their homes.','We were resettled in a new town with houses in straight rows.','Some families never found farmland as good as what they lost.”'],art:'st_volta3',alt:'A new town with rows of houses'},
  {t:['Efua looked at the lights glowing along the shore.','“So was the dam good or bad?”'],art:'st_volta4',alt:'Lights glow along the lake shore at dusk'},
  {t:['Grandma smiled.','“Both,” she said.','“Big choices can help many people, but they always cost someone something, and a wise country remembers both.”'],art:'st_volta4',alt:'Grandmother and granddaughter on the ferry at dusk'},
 ],
 qs:[
  {kind:'Detail',q:'What created Lake Volta?',o:['The Akosombo Dam backed up the Volta River','A meteor crater','One year of heavy rain'],a:'The Akosombo Dam backed up the Volta River',ev:[[2,0],[2,1]],hint:'Read page 3.',why:'The dam backed up the river, and the water spread over the land.'},
  {kind:'Detail',q:'About how many people had to leave their homes?',o:['About 80,000','About 800','About 8 million'],a:'About 80,000',ev:[[4,0]],hint:'Look for a number on page 5.',why:'Grandma says about 80,000 people had to leave.'},
  {kind:'Inference',q:'What does Grandma mean by “Deep enough to cover my village”?',o:['Her old village is now underwater','The lake is very shallow','She cannot swim'],a:'Her old village is now underwater',ev:[[1,1],[1,2]],hint:'What does she say is “down there”?',why:'Her village was flooded when the lake formed.'},
  {kind:'Author’s purpose',q:'How does the author present the dam?',o:['By showing both its benefits and its costs','Only as a success','Only as a mistake'],a:'By showing both its benefits and its costs',ev:[[3,0],[4,0]],hint:'Compare pages 4 and 5.',why:'The story describes electricity and factories, and also people losing homes and farmland.'},
  {kind:'Theme',q:'Which theme best fits the story?',o:['Big decisions bring both benefits and costs','Dams are always bad','Lakes are better than rivers'],a:'Big decisions bring both benefits and costs',ev:[[6,2]],hint:'What does Grandma say at the end?',why:'Grandma says big choices help many but always cost someone something.'},
 ]},
{id:'debate',title:'The Vote on Phones',level:4,kind:'Story',sticker:'bee',names:['Jordan'],theme:'Everyday',
 cover:'st_debate1',
 words:{divided:'split into groups that disagree',evidence:'facts that support a claim',cited:'named as proof',compromise:'an agreement where each side gives up something'},
 pages:[
  {t:['The student council had one week to decide: should students be allowed to use phones at lunch?','Jordan, the council president, had never seen the eighth grade so divided.'],art:'st_debate1',alt:'Students argue at a student council meeting'},
  {t:['At the first meeting, everyone shouted opinions.','Nobody listened, and nothing was decided.'],art:'st_debate1',alt:'A noisy meeting'},
  {t:['Jordan tried something new.','Each side would present a claim, two pieces of evidence, and an answer to the other side’s strongest point.'],art:'st_debate2',alt:'A whiteboard with claim and evidence columns'},
  {t:['The “yes” side shared a survey: 64 percent of students said they used phones to contact parents about rides.','The “no” side cited a study from another school, where students reported talking with friends more after phones were put away at lunch.'],art:'st_debate2',alt:'Students present charts'},
  {t:['Then the two sides did something surprising.','They looked for common ground.','Both wanted students to be safe and to have real conversations.'],art:'st_debate3',alt:'Students from both sides shake hands'},
  {t:['The council voted on a compromise: phones stay in backpacks during lunch, but students may use them in the front office to contact family.','It passed 9 to 2.'],art:'st_debate4',alt:'Council members raise their hands to vote'},
  {t:['Afterward, Jordan wrote in the council notebook: “Loud voices don’t decide things.','Good reasons do.”'],art:'st_debate4',alt:'A student writes in a notebook'},
 ],
 qs:[
  {kind:'Problem',q:'Why did the first meeting fail?',o:['Everyone shouted and nobody listened','There was no room','The principal canceled it'],a:'Everyone shouted and nobody listened',ev:[[1,0],[1,1]],hint:'Read page 2.',why:'Everyone shouted opinions and nobody listened.'},
  {kind:'Evidence',q:'Which evidence did the “yes” side use?',o:['A survey about contacting parents','A study from another school','A teacher’s opinion'],a:'A survey about contacting parents',ev:[[3,0]],hint:'Read page 4.',why:'They shared a survey showing 64 percent used phones to contact parents.'},
  {kind:'Detail',q:'What did the council decide?',o:['Phones stay in backpacks at lunch, but students can use them in the office to contact family','Phones are banned all day','Phones can be used anywhere'],a:'Phones stay in backpacks at lunch, but students can use them in the office to contact family',ev:[[5,0]],hint:'Read the compromise.',why:'The compromise kept phones put away but allowed calls home from the office.'},
  {kind:'Civics',q:'Why was finding common ground important?',o:['It helped both sides agree on shared goals','It made the meeting longer','It let one side win completely'],a:'It helped both sides agree on shared goals',ev:[[4,1],[4,2]],hint:'What did both sides want?',why:'Both wanted safety and real conversations, so they could agree.'},
  {kind:'Theme',q:'Which theme best fits the story?',o:['Good reasons matter more than loud voices','The loudest side always wins','Voting is unfair'],a:'Good reasons matter more than loud voices',ev:[[6,0],[6,1]],hint:'What did Jordan write?',why:'Jordan wrote that loud voices don’t decide things — good reasons do.'},
 ]},
);

