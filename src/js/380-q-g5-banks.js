// ── GRADE 5: reading, writing, science and U.S. History to 1865 ──
(function(){
// 5.RV vocabulary
addQ('r5_rv',[
 QI('The Greek root “bio” means life. What does “biography” mean?','the written story of a person’s life',['the study of rocks','a book of maps','a type of poem'],'Bio (life) + graph (write).','Use both word parts.'),
 QI('Which word means “not able to be seen”?','invisible',['visible','visitor','envision'],'In- means not.','Find the prefix that means not.'),
 QI('“The kitten was timid and hid under the bed whenever guests came.” What does timid mean?','shy and easily frightened',['brave','hungry','sleepy'],'It hid from guests.','What does hiding suggest?'),
 QI('Which word is a synonym for “enormous”?','gigantic',['tiny','narrow','quiet'],'Both mean very big.','Same meaning.'),
 QI('Which word is an antonym for “generous”?','selfish',['kind','giving','helpful'],'Generous means giving; selfish is the opposite.','Opposite meaning.'),
 QI('“The classroom was a zoo after the fire drill.” What does this metaphor mean?','The classroom was loud and wild.',['There were animals in the room.','The class visited a zoo.','The room was very clean.'],'Comparing the room to a zoo shows chaos.','How is a zoo noisy?'),
 QH('The Latin root “aud” means hear. Which word means “a group of people who listen”?','audience',['audio-free','auditor of money','laud'],'Aud (hear) + -ience: people who hear.','Who listens at a show?'),
 QH('“Despite the frigid wind, the hikers kept climbing.” What does frigid mean?','extremely cold',['very strong','very warm','gentle'],'Wind that hikers push through “despite” suggests harsh cold.','Think about wind on a mountain.'),
 QH('Which word has a suffix that means “the study of”?','geology',['geography','geometry','geode'],'-ology means the study of; geology is the study of Earth.','Look for -ology.'),
 QH('“The old staircase groaned as we climbed.” What kind of figurative language is this?','personification',['simile','hyperbole','alliteration'],'Stairs cannot really groan; it gives a human action to an object.','Human action, nonhuman thing.'),
 QH('Which word has the most POSITIVE connotation?','determined',['stubborn','pigheaded','bullheaded'],'Determined sounds admirable; the others sound negative.','Which would be a compliment?'),
 QH('The prefix “trans-” means across. What does “transatlantic” mean?','across the Atlantic Ocean',['under the Atlantic','near the Atlantic','without the Atlantic'],'Trans (across) + Atlantic.','Use the prefix.'),
 QH('“I’ve told you a million times!” This is an example of…','hyperbole',['simile','personification','onomatopoeia'],'A huge exaggeration for effect.','Did they really say it a million times?'),
]);
// 5.RL literary texts
const L5A='Every summer, Kwame visited his grandmother in Cape Coast, Ghana. This year, she handed him a small wooden drum. “Your grandfather made this,” she said. “The drum speaks only for those who listen first.” Kwame banged it loudly. The sound was flat and dull. That evening, he sat by the sea and listened to the waves crashing and pulling back. The next morning he tapped the drum softly, then harder, matching the rhythm of the waves. Grandmother came to the door, smiling. “Now,” she said, “it is speaking.”';
const L5B='The fox had never lost a race, so when the turtle challenged him, he laughed. On race day, the fox ran ahead, then stopped to nap under a tree. “Plenty of time,” he yawned. The turtle walked slowly but never stopped. When the fox woke, the crowd was already cheering — for the turtle at the finish line.';
const L5C='I didn’t want to move to Richmond. I didn’t want a new school, a new street, or a new anything. On the first day, I sat alone at lunch and counted the ceiling tiles: forty-two. Then a girl with paint on her sneakers sat down. “I’m Lena,” she said. “Do you like art club?” I shrugged, but I followed her to the art room after school. By the end of the week, I had stopped counting ceiling tiles.';
addQ('r5_rl',[
 QP(L5A,'Where does the story take place?','in Cape Coast, Ghana',['in Richmond, Virginia','on a ship','in a school'],'The first sentence names the setting.','Read sentence 1.'),
 QP(L5A,'Why did the drum sound flat at first?','Kwame banged it without listening.',['The drum was broken.','It was raining.','Grandmother took it away.'],'Grandmother said the drum speaks for those who listen first.','Remember Grandmother’s words.'),
 QP(L5B,'What does the fox think about the turtle at first?','that the turtle cannot win',['that the turtle is fast','that the turtle is his friend','that the race is unfair to the fox'],'He laughs at the challenge.','How does he react?'),
 QP(L5C,'From what point of view is this story told?','first person',['third person','second person','the teacher’s point of view'],'The narrator uses “I.”','Look at the pronouns.'),
 QP(L5A,'What is the theme of the story?','Listening carefully helps you do things well.',['Drums are hard to play.','The sea is loud.','Grandparents give gifts.'],'Kwame succeeds after he listens to the waves.','What changed his drumming?',true),
 QP(L5A,'What does Grandmother mean by “Now it is speaking”?','Kwame finally plays with feeling and rhythm.',['The drum can talk.','The drum is louder.','Someone else is playing.'],'The drum “speaks” when played thoughtfully.','It is figurative.',true),
 QP(L5B,'What lesson does the fable teach?','Steady effort can beat overconfidence.',['Foxes are always fast.','Napping is healthy.','Races are not important.'],'The turtle never stopped; the fox was too sure of himself.','Why did the turtle win?',true),
 QP(L5C,'What does “I had stopped counting ceiling tiles” show?','The narrator is no longer lonely or bored.',['The tiles were removed.','The narrator forgot how to count.','The narrator moved again.'],'Counting tiles showed loneliness; stopping shows change.','Why was the narrator counting at first?',true),
 QP(L5C,'How does Lena affect the narrator?','She helps the narrator feel welcome.',['She makes the narrator move away.','She takes the narrator’s lunch.','She ignores the narrator.'],'She invites the narrator to art club.','What does Lena do?',true),
 QP(L5A,'Why does the author include the waves “crashing and pulling back”?','to show the rhythm Kwame learns from',['to warn of a storm','to describe a boat','to show it is night'],'He matches the drum to the waves’ rhythm.','What does Kwame copy?',true),
]);
// 5.RI informational texts
const I5A='Sea turtles have lived in Earth’s oceans for more than 100 million years. Today, most species are endangered. Female turtles crawl onto beaches at night to lay eggs in the sand. When the babies hatch, they head toward the brightest horizon, which is usually the moonlit ocean. However, bright lights from buildings near the beach can confuse them, leading them away from the water. Many beach towns now ask people to turn off outdoor lights during nesting season. Volunteers also mark nests so that people do not disturb them.';
const I5B='Before 1869, traveling from New York to California could take months by wagon or ship. That year, the Transcontinental Railroad was completed when the last spike was driven at Promontory Summit, Utah. Suddenly, the same trip took about a week. Goods, mail and people moved across the country faster than ever before.';
addQ('r5_ri',[
 QP(I5A,'What is the main idea of the passage?','People can help protect baby sea turtles from dangers like bright lights.',['Sea turtles are 100 million years old.','Turtles lay eggs at night.','Beaches are fun to visit.'],'Most of the text explains a problem and how people help.','What is most of the text about?'),
 QP(I5A,'Why do hatchlings head toward the ocean?','It is usually the brightest horizon.',['They smell the salt.','Their mothers lead them.','They hear the waves.'],'They move toward the brightest horizon.','Find the sentence about babies hatching.'),
 QP(I5B,'Where was the last spike driven?','Promontory Summit, Utah',['New York','California','Richmond, Virginia'],'The passage names the location.','Find the place name.'),
 QP(I5A,'Which text structure does the passage mainly use?','problem and solution',['chronological order','compare and contrast','description of a place only'],'Lights confuse hatchlings (problem); towns and volunteers help (solution).','Look for a problem and how people respond.',true),
 QP(I5A,'What does “endangered” most likely mean?','at risk of dying out',['very old','very fast','living on land'],'The passage goes on to describe threats.','Use context.',true),
 QP(I5B,'Which text structure does this passage use?','cause and effect',['problem and solution only','description','compare and contrast only'],'The railroad (cause) made travel faster (effect).','What happened because of the railroad?',true),
 QP(I5B,'Which detail best shows how the railroad changed travel time?','The same trip took about a week instead of months.',['The last spike was driven in Utah.','Goods were moved.','People used wagons.'],'Months → a week is the key comparison.','Find the time comparison.',true),
 QP(I5A,'Why does the author mention volunteers?','to give another example of how people help',['to describe turtle food','to explain how turtles hatch','to argue that beaches should close'],'Volunteers marking nests is another solution.','What do volunteers do?',true),
 QH('A text has the headings “Life on the Plains,” “Life in the Desert,” and “Life in the Woodlands.” What structure is it likely using?','compare and contrast',['chronological order','problem and solution','cause and effect'],'Several groups are being compared.','Different places side by side.'),
]);
// 5.W writing
addQ('w5_w',[
 QI('Which is the best opinion statement?','Our school should plant a vegetable garden.',['Gardens have plants.','My friend likes carrots.','There is a garden in Richmond.'],'An opinion statement takes a position.','Can someone agree or disagree?'),
 QI('Which detail best supports “Recess should be longer”?','Studies show exercise helps students focus in class.',['Recess is at noon.','Our playground has swings.','I like the color green.'],'A reason with evidence supports the opinion.','Which explains why?'),
 QI('Which transition shows a contrast?','However',['Also','First','For example'],'However shows a different idea.','Which shows “but”?'),
 QI('Which sentence uses dialogue correctly in a narrative?','“Wait for me!” shouted Maya.',['Wait for me! shouted Maya.','“Wait for me! shouted Maya.”','Wait for me, “shouted Maya.”'],'Quotation marks surround the exact words.','Only the spoken words go inside.'),
 QH('Which sentence would be the strongest conclusion for an essay about recycling?','If every family recycles, our town can cut its trash in half and protect our parks.',['That is all about recycling.','Recycling is a word.','I wrote this essay.'],'A strong conclusion restates the point and leaves an impact.','Which sums up and inspires?'),
 QH('Which revision combines the sentences best? “The storm was strong. It knocked down trees. It knocked down power lines.”','The strong storm knocked down trees and power lines.',['The storm was strong it knocked down trees it knocked down power lines.','Strong storm, trees, power lines.','The storm was strong, and it, knocked down trees.'],'Combine repeated parts with “and.”','Avoid repeating.'),
 QH('In an informative essay about volcanoes, which detail does NOT belong?','My cousin wants to be an astronaut.',['Lava can reach 2,000 degrees Fahrenheit.','Volcanoes form where plates meet.','Ash can travel hundreds of miles.'],'It is off topic.','Which is not about volcanoes?'),
 QH('Which sentence shows rather than tells that a character is nervous?','Jamal’s hands shook as he unfolded his speech.',['Jamal was nervous.','Jamal felt very nervous.','Nervous is how Jamal felt.'],'Showing uses actions and details.','Which gives a picture?'),
 QH('What is the best way to begin a research report about Harriet Tubman?','with an interesting fact or question about her life',['with “This report is about Harriet Tubman.”','with a list of sources','with an unrelated joke'],'A strong hook draws readers in.','How do you grab attention?'),
]);
addQ('w5_lu',[
 QI('Which sentence uses a comma correctly after an introductory word?','Yes, I finished my homework.',['Yes I, finished my homework.','Yes I finished, my homework.','Yes I finished my homework,'],'Put a comma after an introductory word.','Where does the pause go?'),
 QI('Which is the correct verb? “Neither of the dogs ___ barking.”','is',['are','were','be'],'“Neither” is singular.','Neither = not one.'),
 QI('Which word is spelled correctly?','separate',['seperate','separete','seprate'],'Separate has “a rat” in the middle.','There is “a rat” in separate.'),
 QI('Which sentence uses the correct pronoun?','Ms. Diaz gave the books to Ana and me.',['Ms. Diaz gave the books to Ana and I.','Ms. Diaz gave the books to me and Ana and I.','Ms. Diaz gave the books to Ana and myself.'],'After “to,” use the object pronoun “me.”','Try it without “Ana and.”'),
 QH('Which sentence is correctly punctuated?','The class read three books: Hatchet, Wonder, and Holes.',['The class read three books, Hatchet, Wonder, and Holes.','The class read: three books Hatchet, Wonder, and Holes.','The class read three books; Hatchet, Wonder and, Holes.'],'A colon can introduce a list after a complete sentence.','What introduces a list?'),
 QH('Which sentence has correct verb tense throughout?','Yesterday we walked to the park and played soccer.',['Yesterday we walk to the park and played soccer.','Yesterday we walked to the park and play soccer.','Yesterday we walking to the park and played soccer.'],'Both verbs are in the past tense.','Keep tenses consistent.'),
 QH('Which sentence uses an interjection correctly?','Wow! That roller coaster was fast.',['That roller coaster wow was fast!','Wow that, roller coaster was fast.','That wow! roller coaster was fast.'],'Interjections show feeling and are often followed by !','Where does strong feeling go?'),
 QH('Which is a correctly written title of a book in your writing?','The Wild Robot (underlined or in italics)',['“The Wild Robot” with no other marks needed in all cases','the wild robot','THE wild Robot'],'Book titles are capitalized and italicized (or underlined by hand).','Books are long works.'),
 QH('Which sentence is NOT a fragment?','Because it rained, the game was canceled.',['Because it rained.','When the game started.','After the long, rainy day.'],'It has a complete independent clause.','Does it express a complete thought?'),
]);
// Grade 5 science
addQ('sc5_2',[
 QI('Which is an example of thermal energy?','heat from a campfire',['a ringing bell','a stretched rubber band','sunlight on a solar panel only'],'Thermal energy is heat.','Hot things.'),
 QI('What kind of energy is stored in a battery?','chemical energy',['sound energy','light energy','nuclear only'],'Batteries store chemical energy.','It changes to electricity.'),
 QI('Which is an example of mechanical energy?','a moving bicycle',['a cup of hot cocoa','a glowing lamp','a firework before it is lit'],'Mechanical energy is energy of motion and position.','Something moving.'),
 QH('A toaster changes electrical energy into…','thermal and light energy',['chemical energy','sound energy only','mechanical energy only'],'The coils get hot and glow.','What does a toaster give off?'),
 QH('Which describes the energy changes when you eat breakfast and then run?','chemical energy in food → mechanical energy in muscles',['light → sound','thermal → electrical','sound → chemical'],'Food stores chemical energy that muscles use to move.','Food to motion.'),
 QH('Why can energy never be “used up” completely?','It changes form instead of disappearing.',['It turns into nothing.','It is created by machines.','It stays the same form forever.'],'Energy is transformed, not destroyed.','Where does it go?'),
 QH('Which energy source powers the water cycle?','the sun (radiant energy)',['wind only','Earth’s core','the moon'],'Sunlight evaporates water.','What heats water?'),
]);
addQ('sc5_3',[
 QI('What is a force?','a push or a pull',['a type of energy only','a kind of matter','a sound'],'Forces push or pull.','Push or pull.'),
 QI('Which needs MORE force to move the same distance?','a full wagon',['an empty wagon','a feather','a balloon'],'More mass needs more force.','Heavier things.'),
 QI('What force slows a sliding hockey puck?','friction',['magnetism','light','electricity'],'Friction acts against motion.','Rubbing surfaces.'),
 QH('Two balls roll at the same speed. One is heavier. Which has more kinetic energy?','the heavier ball',['the lighter ball','they are the same','neither'],'Kinetic energy depends on mass and speed.','More mass, more energy.'),
 QH('A ball is kicked harder. What happens to its speed and kinetic energy?','Both increase.',['Both decrease.','Speed increases but energy decreases.','Nothing changes.'],'More force → more speed → more kinetic energy.','More push.'),
 QH('Why do cars have brakes that rub against the wheels?','Friction changes motion energy into heat to slow the car.',['Brakes add speed.','Brakes use magnets to lift the car.','Brakes reduce gravity.'],'Friction slows motion.','Brakes get hot.'),
 QH('A soccer ball sits still on the grass. What can change its motion?','an unbalanced force, like a kick',['nothing at all','balanced forces','more grass'],'An unbalanced force changes motion.','Something must push it.'),
]);
addQ('sc5_4',[
 QI('What is needed for electric current to flow?','a closed circuit',['an open circuit','a broken wire','no energy source'],'Current needs a complete path.','Closed loop.'),
 QI('Which material is a good conductor?','copper',['rubber','glass','wood'],'Metals like copper conduct electricity.','Wires are made of it.'),
 QI('What happens when you rub a balloon on your hair?','Static electricity builds up.',['The balloon pops.','The balloon becomes a magnet.','Nothing happens.'],'Charges move between hair and balloon.','Your hair stands up.'),
 QH('How can you make an electromagnet stronger?','Add more coils of wire or use a stronger battery.',['Use fewer coils.','Use a plastic core.','Remove the battery.'],'More coils or more current make it stronger.','More wire or power.'),
 QH('What is one advantage of an electromagnet over a regular magnet?','It can be turned on and off.',['It never needs electricity.','It is always weaker.','It only attracts wood.'],'Switching current turns it on/off.','Junkyard cranes.'),
 QH('Which device changes electrical energy into mechanical energy?','an electric motor',['a generator','a battery','a light bulb'],'Motors make things move.','Fans spin.'),
 QH('Benjamin Franklin’s kite experiment helped show that lightning is…','a form of electricity',['a kind of magnetism only','a sound wave','light from the sun'],'Franklin linked lightning and electricity.','What flowed to the key?'),
]);
addQ('sc5_5',[
 QI('What causes sound?','vibrations',['light','magnets','cold air'],'Sound comes from vibrating objects.','Feel your throat when you hum.'),
 QI('Through which does sound travel fastest?','steel',['air','water','outer space'],'Sound is fastest in solids.','Tightly packed particles.'),
 QI('Which describes a high-pitched sound?','a whistle',['a tuba','thunder','a bass drum'],'Whistles vibrate quickly.','High pitch = fast vibration.'),
 QH('Why can’t astronauts hear sound in space without radios?','There is no matter to carry the vibrations.',['Space is too cold.','Space is too bright.','Sound is too slow there.'],'Sound needs a medium.','Needs air, water or solid.'),
 QH('How do bats use sound?','They use echoes to find food and navigate (echolocation).',['They use sound to make light.','They cannot hear.','They use sound to stay warm.'],'Echoes help bats “see” in the dark.','Echoes.'),
 QH('What happens to pitch when a guitar string is shortened?','It gets higher.',['It gets lower.','It stays the same.','It stops making sound.'],'Shorter strings vibrate faster.','Faster vibration.'),
 QH('Which technology uses sound waves?','ultrasound and sonar',['solar panels','light bulbs','magnets'],'Sonar maps the ocean; ultrasound images the body.','Sound bouncing back.'),
]);
addQ('sc5_6',[
 QI('What happens when light hits a mirror?','It reflects.',['It refracts only.','It is absorbed completely.','It stops existing.'],'Mirrors reflect light.','Bounce.'),
 QI('Which color is NOT part of the visible spectrum?','brown',['red','green','violet'],'ROYGBIV does not include brown.','ROYGBIV.'),
 QI('Why does a straw look bent in a glass of water?','Light refracts as it moves from water to air.',['The straw bends.','Water reflects all light.','The glass is curved only.'],'Refraction bends light.','Light bends.'),
 QH('Why do we see a red apple as red?','It reflects red light and absorbs other colors.',['It absorbs red light.','It makes its own red light.','It reflects every color.'],'We see the reflected color.','What bounces off?'),
 QH('A prism separates white light into colors. What does this show?','White light is made of many colors.',['Prisms make color.','Light is only white.','Colors are created by glass.'],'Prisms refract each color differently.','Rainbows.'),
 QH('Which material is translucent?','wax paper',['clear glass','a brick','aluminum foil'],'Translucent lets some light through.','Some light passes.'),
 QH('Light travels faster than sound. What does this explain?','You see lightning before you hear thunder.',['Thunder comes before lightning.','You hear lightning first.','They happen at different times.'],'Light reaches you almost instantly.','Storms.'),
]);
addQ('sc5_7',[
 QI('What are all things made of?','atoms',['cells only','light','energy only'],'All matter is made of atoms.','Tiny particles.'),
 QI('Which is a mixture?','trail mix',['pure water','gold','oxygen gas'],'A mixture combines substances that keep their properties.','Can you pick out parts?'),
 QI('What happens to water at 0°C (32°F)?','It freezes.',['It boils.','It evaporates instantly.','It becomes a gas.'],'Water freezes at 0°C.','Ice forms.'),
 QH('How could you separate a mixture of salt and sand?','Add water, filter out the sand, then evaporate the water to get salt.',['Use a magnet.','Freeze it.','Shake it.'],'Salt dissolves; sand does not.','Use dissolving.'),
 QH('What happens to particles of a substance when it is heated?','They move faster and spread apart.',['They stop moving.','They get smaller.','They disappear.'],'Heat increases particle motion.','More energy.'),
 QH('Which is a solution?','sugar dissolved in water',['sand in water','oil and vinegar','a salad'],'In a solution, one substance dissolves evenly.','Dissolving.'),
 QH('Water vapor turns into liquid on a cold window. What is this change called?','condensation',['evaporation','freezing','melting'],'Gas to liquid is condensation.','Gas to liquid.'),
]);
addQ('sc5_8',[
 QI('Which type of rock forms from cooled lava or magma?','igneous',['sedimentary','metamorphic','fossil rock'],'Igneous rocks form from melted rock.','Fire rocks.'),
 QI('What is weathering?','the breaking down of rock',['moving rock to a new place','making new mountains','cooling lava'],'Weathering breaks rock.','Breaking.'),
 QI('Where are fossils most often found?','in sedimentary rock',['in igneous rock','in lava','in diamonds'],'Fossils form in layers of sediment.','Layers.'),
 QH('What is the difference between weathering and erosion?','Weathering breaks rock; erosion moves it.',['They are the same.','Erosion breaks rock; weathering moves it.','Weathering only happens in deserts.'],'Break vs. move.','Break, then move.'),
 QH('What causes most earthquakes and volcanoes?','movement of Earth’s plates',['the moon','ocean waves','rain'],'Plate tectonics.','Plates.'),
 QH('How does a metamorphic rock form?','Heat and pressure change an existing rock.',['Lava cools quickly.','Sand settles in water.','Plants decay.'],'Meta = change.','Heat + pressure.'),
 QH('In undisturbed layers of sedimentary rock, where are the oldest layers?','at the bottom',['at the top','in the middle','on the sides'],'Layers stack over time.','First down.'),
]);
addQ('sc5_9',[
 QI('Which is a renewable energy resource?','wind',['coal','oil','natural gas'],'Wind will not run out.','It keeps blowing.'),
 QI('Which is a nonrenewable resource?','coal',['sunlight','wind','moving water'],'Coal takes millions of years to form.','Fossil fuel.'),
 QI('Which action conserves energy?','turning off lights when you leave a room',['leaving the TV on','opening the fridge often','using hot water for everything'],'Turning off lights saves electricity.','Save power.'),
 QH('Why are fossil fuels called nonrenewable?','They take millions of years to form and are used up faster.',['They come from the sun.','They are made in factories.','They are always free.'],'Formation is extremely slow.','Time.'),
 QH('What is one drawback of solar power?','It does not work as well at night or on cloudy days.',['It causes smog.','It uses coal.','It is nonrenewable.'],'Sunlight varies.','Night.'),
 QH('Which home change saves the MOST energy over time?','adding insulation to walls and attic',['buying a bigger TV','opening windows in winter','using more lamps'],'Heating and cooling use the most energy.','Keep heat in.'),
 QH('How does a hydroelectric dam produce electricity?','Moving water turns turbines that power generators.',['Burning water','Solar panels on the dam','Wind blowing over the water'],'Water’s motion becomes electrical energy.','Moving water.'),
]);
// Grade 5 U.S. History to 1865
addQ('usi1',[
 QI('Which river is the longest in the United States and flows into the Gulf of Mexico?','the Mississippi River',['the Hudson River','the Columbia River','the James River'],'The Mississippi drains much of the country.','Central U.S.'),
 QI('Which mountains are in the eastern United States?','the Appalachian Mountains',['the Rocky Mountains','the Sierra Nevada','the Cascades'],'The Appalachians run along the East.','Old, worn-down mountains.'),
 QI('Which ocean borders the West Coast of the United States?','the Pacific Ocean',['the Atlantic Ocean','the Arctic Ocean','the Indian Ocean'],'The Pacific is west.','West.'),
 QH('Which landform region lies between the Rocky Mountains and the Appalachian Mountains?','the Interior Lowlands and Great Plains',['the Coastal Plain','the Canadian Shield','the Basin and Range'],'The middle of the country is plains and lowlands.','Middle of the country.'),
 QH('Why were the Great Lakes important to early trade?','They connected inland regions by water to the St. Lawrence River and Atlantic.',['They were saltwater.','They blocked travel.','They were frozen all year.'],'Waterways moved goods.','Water highways.'),
 QH('What is the capital of the United States?','Washington, D.C.',['New York City','Philadelphia','Richmond'],'Washington, D.C. has been the capital since 1800.','D.C.'),
 QH('Which region is very dry and includes deserts in the West?','the Basin and Range',['the Coastal Plain','the Appalachian Highlands','the Interior Lowlands'],'Mountains block rain, creating deserts.','Dry West.'),
]);
addQ('usi2',[
 QI('What do archaeologists study?','artifacts left by people long ago',['only living animals','the weather','modern buildings'],'They study objects from the past.','Digging.'),
 QI('Which site in Virginia is one of the oldest known in North America?','Cactus Hill',['Monticello','Mount Vernon','Yorktown'],'Cactus Hill shows very early human life.','Very old site.'),
 QI('The Pueblo people of the Southwest built homes from…','adobe (sun-dried clay)',['ice blocks','logs only','buffalo skins only'],'Adobe fit the dry climate.','Clay.'),
 QH('How did the Inuit adapt to the Arctic?','They used snow, animal skins and hunted seals and whales.',['They grew corn and beans.','They built adobe homes.','They herded buffalo on plains.'],'They used resources of a cold region.','Cold region.'),
 QH('Why did the Lakota move often?','They followed the buffalo herds.',['They lived on boats.','They farmed one field.','They traded with England.'],'Buffalo provided food and materials.','Buffalo.'),
 QH('The Haudenosaunee (Iroquois) lived in longhouses. Why were these suited to their region?','Forests provided wood and bark, and families lived together.',['Deserts had no trees.','They lived on ice.','They needed portable homes.'],'Eastern Woodlands had forests.','Woodlands.'),
 QH('What can artifacts like pottery tell us?','how people cooked, stored food and traded',['the exact words people spoke','their favorite colors only','nothing useful'],'Objects reveal daily life.','Daily life.'),
]);
addQ('usi3',[
 QI('Why did Europeans explore the Americas? Choose the best answer.','to find wealth, land and new trade routes',['to find snow','to visit friends','to build airports'],'Gold, God and glory.','Riches and routes.'),
 QI('Which explorer claimed land for France along the St. Lawrence River?','Jacques Cartier',['Christopher Columbus','Juan Ponce de León','John Cabot'],'Cartier explored Canada for France.','France.'),
 QI('Which explorer sailed for Spain in 1492?','Christopher Columbus',['Samuel de Champlain','Henry Hudson','John Smith'],'Columbus sailed for Spain.','1492.'),
 QH('What was one effect of European exploration on Indigenous Peoples?','Diseases like smallpox caused many deaths.',['Indigenous populations grew quickly.','Nothing changed.','Europeans left right away.'],'Europeans brought diseases.','Disease.'),
 QH('What was the Columbian Exchange?','the transfer of plants, animals and ideas between the Americas and Europe',['a bank in Spain','a ship race','a peace treaty'],'Corn and potatoes went east; horses came west.','Exchange.'),
 QH('Why did the French and Indigenous Peoples often cooperate?','They traded furs and the French built few large farms.',['The French took all the land.','They spoke the same language.','They never met.'],'The fur trade built partnerships.','Fur trade.'),
]);
addQ('usi4',[
 QI('Which West African empire was famous for Mansa Musa?','Mali',['Rome','Egypt','Aztec'],'Mansa Musa ruled Mali.','Gold.'),
 QI('Which two goods were traded across the Sahara?','gold and salt',['silk and tea','corn and tobacco','oil and coal'],'Gold from the south, salt from the north.','Gold and salt.'),
 QI('Which city was a center of learning in West Africa?','Timbuktu',['Cairo','Jamestown','Athens'],'Timbuktu had libraries and scholars.','Books.'),
 QH('What was the Middle Passage?','the forced voyage of enslaved Africans across the Atlantic',['a trade route in Europe','a mountain pass','a river in Africa'],'It was cruel and deadly.','Across the Atlantic.'),
 QH('How did the Transatlantic Slave Trade affect West Africa?','Millions were taken, harming families and societies.',['It helped West Africa grow.','It ended trade with Europe.','It created new empires.'],'It caused great loss.','Loss.'),
 QH('Which West African empire came after Mali and also traded gold and salt?','Songhai',['Ghana','Rome','Kush'],'Songhai rose after Mali.','After Mali.'),
]);
addQ('usi5',[
 QI('Which colonial region had rocky soil and many fishing and shipbuilding jobs?','New England',['Southern','Mid-Atlantic','Western'],'New England had poor soil and a long coast.','Northeast.'),
 QI('Which region was called the “breadbasket” for growing wheat?','the Mid-Atlantic colonies',['New England','the Southern colonies','Canada'],'Rich soil grew grain.','Grain.'),
 QI('Which colony was founded first?','Virginia (Jamestown, 1607)',['Pennsylvania','Georgia','Massachusetts Bay'],'Jamestown was first.','1607.'),
 QH('Why did the Southern colonies rely on enslaved labor?','Large plantations grew crops like tobacco and rice that needed many workers.',['They had no farms.','They had cold winters.','They fished only.'],'Plantations demanded labor.','Plantations.'),
 QH('Why did the Pilgrims come to Plymouth?','for religious freedom',['to find gold','to fight France','to grow tobacco'],'They wanted to worship their own way.','Religion.'),
 QH('What was the purpose of the town meeting in New England?','Citizens met to make local decisions.',['To choose a king','To trade furs','To build ships only'],'Early self-government.','Local government.'),
 QH('How did geography affect the Mid-Atlantic colonies?','Fertile land and rivers helped farming and trade.',['Mountains blocked all trade.','Deserts made farming impossible.','Ice covered the land.'],'Good land and waterways.','Land and rivers.'),
]);
addQ('usi6',[
 QI('What war ended in 1763 and left Britain in debt?','the French and Indian War',['the Civil War','World War I','the War of 1812'],'Britain taxed the colonies to pay for it.','Before the Revolution.'),
 QI('Who wrote the Declaration of Independence?','Thomas Jefferson',['George Washington','Benjamin Franklin alone','John Adams alone'],'Jefferson was the main author.','Virginian.'),
 QI('Where did the British surrender in 1781?','Yorktown, Virginia',['Boston','Philadelphia','Saratoga'],'Yorktown ended major fighting.','Virginia.'),
 QH('Why was the Battle of Saratoga a turning point?','It convinced France to join the Americans.',['It ended the war.','The British won it.','It was fought in Virginia.'],'French help was critical.','France.'),
 QH('What did “no taxation without representation” mean?','Colonists should not be taxed without a voice in Parliament.',['Taxes should be higher.','Only the king could vote.','Colonies wanted more representatives in France.'],'They had no say in British laws.','No voice.'),
 QH('Which document by Thomas Paine persuaded many colonists to support independence?','Common Sense',['the Constitution','the Bill of Rights','the Mayflower Compact'],'A popular pamphlet in 1776.','A pamphlet.'),
 QH('How did James Armistead Lafayette help win the war?','He spied on the British and gave key information.',['He wrote the Constitution.','He was a British general.','He sailed the French fleet.'],'His intelligence helped at Yorktown.','Spy.'),
]);
addQ('usi7',[
 QI('Who was the first President of the United States?','George Washington',['John Adams','Thomas Jefferson','James Madison'],'Washington took office in 1789.','First.'),
 QI('What was the first plan of government for the United States?','the Articles of Confederation',['the Constitution','the Declaration of Independence','the Bill of Rights'],'It created a weak central government.','First plan.'),
 QI('Who is called the “Father of the Constitution”?','James Madison',['Thomas Jefferson','George Washington','John Adams'],'Madison planned it.','Fourth president.'),
 QH('Why was the Constitution written in 1787?','The Articles of Confederation made the national government too weak.',['To declare independence','To end slavery','To start a war'],'They needed a stronger government.','Too weak.'),
 QH('What did the Louisiana Purchase do, and which president made it?','It doubled the size of the nation; Thomas Jefferson',['It started the Civil War; Lincoln','It ended the Revolution; Washington','It created Virginia; Madison'],'Jefferson bought it from France in 1803.','1803.'),
 QH('What was the Monroe Doctrine?','a warning to Europe not to set up new colonies in the Americas',['a plan to free enslaved people','a treaty with Britain','a new tax'],'President Monroe’s 1823 policy.','Stay out.'),
 QH('Which president led during the War of 1812?','James Madison',['George Washington','John Adams','James Monroe'],'Madison was president 1809–1817.','War of 1812.'),
]);
addQ('usi8',[
 QI('Who explored the Louisiana Purchase?','Lewis and Clark',['Columbus and Cabot','Washington and Adams','Cartier and Champlain'],'Jefferson sent them in 1804.','Corps of Discovery.'),
 QI('Which invention made it easier to clean cotton?','the cotton gin',['the telephone','the light bulb','the airplane'],'Eli Whitney invented it.','Cotton.'),
 QI('What was the Underground Railroad?','a network that helped enslaved people escape to freedom',['an underground train','a mine','a bank'],'Secret routes and safe houses.','Freedom network.'),
 QH('What was the Trail of Tears?','the forced removal of the Cherokee and other nations from their homelands',['a trade route','a railroad','a river'],'The Indian Removal Act forced them west.','Removal.'),
 QH('What was the goal of the Seneca Falls Convention in 1848?','women’s rights, including the right to vote',['ending the Civil War','building canals','starting a railroad'],'Elizabeth Cady Stanton helped lead it.','Women’s rights.'),
 QH('How did the Erie Canal help the nation’s economy?','It connected the Great Lakes to New York City for cheaper shipping.',['It connected the Pacific to the Atlantic.','It ended farming.','It was only for fishing.'],'Water transport lowered costs.','Water route.'),
 QH('What did abolitionists want?','to end slavery',['to expand slavery','to stop all farming','to leave the country'],'Abolish = end.','End.'),
]);
addQ('usi9',[
 QI('Who was President during the Civil War?','Abraham Lincoln',['Jefferson Davis','George Washington','Ulysses S. Grant'],'Lincoln led the Union.','Union president.'),
 QI('Who led the Confederate Army of Northern Virginia?','Robert E. Lee',['Ulysses S. Grant','Stonewall Jackson only','Frederick Douglass'],'Lee was the Confederacy’s top general.','Virginian general.'),
 QI('Where did the war end in 1865?','Appomattox Court House, Virginia',['Gettysburg, Pennsylvania','Fort Sumter, South Carolina','Yorktown, Virginia'],'Lee surrendered to Grant there.','Virginia.'),
 QH('What did the Emancipation Proclamation do?','declared enslaved people in Confederate states free',['ended the war','gave women the vote','created the Confederacy'],'Issued in 1863.','Freedom.'),
 QH('Why was the Battle of Gettysburg important?','It was a turning point that stopped Lee’s invasion of the North.',['It started the war.','It ended the war.','It was in the South.'],'1863 Union victory.','Turning point.'),
 QH('How did economic differences divide the North and South?','The North had factories; the South relied on plantation farming and enslaved labor.',['Both had only farms.','The South had all the factories.','They had the same economy.'],'Different economies led to different interests.','Factories vs. farms.'),
 QH('How did African Americans contribute to the Union victory?','About 180,000 served as Union soldiers, like the 54th Massachusetts.',['They were not allowed to help.','They fought only for the Confederacy.','They stayed neutral.'],'They fought bravely for freedom.','Soldiers.'),
]);
addQ('usi_sk',[
 QI('Which is a primary source about the American Revolution?','a letter written by a soldier in 1777',['a textbook from 2020','a modern movie','an encyclopedia article'],'Primary sources come from the time.','Made then.'),
 QI('On a timeline, which comes first: 1776, 1607, 1865?','1607',['1776','1865','they happened together'],'Smallest year is earliest.','Smallest year.'),
 QH('How many years passed from 1607 to 1865?','258',['248','268','1,607'],'1865 − 1607 = 258.','Subtract.'),
 QH('A map scale shows 1 inch = 100 miles. Two forts are 2.5 inches apart. How far apart are they?','250 miles',['102.5 miles','25 miles','2,500 miles'],'2.5 × 100 = 250.','Multiply by the scale.'),
 QH('Why should historians use more than one source?','to compare viewpoints and check facts',['because one is always false','to save time','to avoid reading'],'Multiple sources reduce bias.','Check.'),
 QH('Which is a cause of the American Revolution?','British taxes on the colonies',['the Civil War','the Louisiana Purchase','the Gold Rush'],'Taxes came before the Revolution.','Before 1776.'),
]);
})();

