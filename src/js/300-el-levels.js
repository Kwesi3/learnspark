// ═══════════════════════════════════════════════════════════════
// GRADES 1–3 — skills, lessons, games, pictures
// ═══════════════════════════════════════════════════════════════
LEVELS.splice(0,LEVELS.length,[1,'Grade 1','Elementary'],[2,'Grade 2','Elementary'],[3,'Grade 3','Elementary'],[4,'Grade 4','Elementary · Virginia Studies'],[6,'Grade 6','Middle school'],[7,'Grade 7','Middle school'],[8,'Grade 8','Middle school']);
LEVEL_IDS.splice(0,LEVEL_IDS.length,...LEVELS.map(l=>l[0]));
normGrade=function(g){g=+g||4;return g>=8?8:g===7?7:g>=5?6:g<=1?1:g;};
const S=(code,name,desc,gen)=>({code,name,desc,gen});
STRANDS[1]={
  math:[S('1.NS.1','Counting & Coins','Count to 120, skip count, tens & ones, coins','g1_ns1'),S('1.NS.2','Compare Numbers','Compare & order numbers to 120','g1_ns2'),S('1.NS.3','Halves & Fourths','Equal shares','g1_ns3'),
    S('1.CE.1','Add & Subtract','Facts and word problems within 20','g1_ce1'),S('1.MG.1','Compare Length','Measure with paper clips & blocks','g1_mg1'),S('1.MG.2','Shapes','Sides, corners & right angles','g1_mg2'),
    S('1.MG.3','Time & Calendar','Hour, half hour, days & ordinals','g1_mg3'),S('1.PS.1','Picture Graphs','Read picture graphs & tables','g1_ps1'),S('1.PFA.1','Patterns','Repeating & growing patterns','g1_pfa1')],
  read:[S('1.FFR','Phonics','Rhymes, first sounds & short vowels','r1_ffr'),S('1.RV','Vocabulary','Opposites, compound words & meanings','r1_rv'),S('1.RL','Stories','Characters, setting & events','r1_rl'),S('1.RI','Nonfiction','Main topic & text features','r1_ri')],
  sci:[S('1.2','Pushes, Pulls & Sound','How things move and make sound','sc1_2'),S('1.3','Materials','Properties of objects','sc1_3'),S('1.4','Plants','Needs and plant parts','sc1_4'),S('1.5','Animals','Needs and body parts','sc1_5'),
    S('1.6','Sun & Earth','Light, heat & shadows','sc1_6'),S('1.7','Weather & Seasons','How seasons change living things','sc1_7'),S('1.8','Natural Resources','Using resources wisely','sc1_8')],
  write:[S('1.W','Writing Sentences','Complete sentences & describing','w1_w'),S('1.LU','Capitals & Punctuation','Capitals, end marks & nouns','w1_lu')],
  hist:[S('1.1','Classroom Citizenship','Rules, fairness & kindness','h1_1'),S('1.2','Holidays & Traditions','Virginia and national holidays','h1_2'),S('1.3','American Symbols','Flag, Pledge & bald eagle','h1_3'),
    S('1.4','Virginia Long Ago','Werowocomoco, Jamestown & change','h1_4'),S('1.5','Virginia Changemakers','People who shaped Virginia','h1_5'),S('1.6','Map Skills','Maps, globes & directions','h1_6'),
    S('1.7','Geography & History','Rivers, coasts & settlements','h1_7'),S('1.8','Needs & Wants','Goods, services & saving','h1_8')],
};
STRANDS[2]={
  math:[S('2.NS.1','Skip Counting','Count by 2s–100s, even & odd','g2_ns1'),S('2.NS.2','Place Value','Hundreds, tens & ones to 999','g2_ns2'),S('2.NS.3','Fractions','Halves to eighths, unit fractions','g2_ns3'),
    S('2.NS.4','Money','Coins up to $2.00','g2_ns4'),S('2.CE.1','Add & Subtract','Within 100, multistep & missing addends','g2_ce1'),S('2.MG.1','Measurement','Inches, pounds & cups','g2_mg1'),
    S('2.MG.2','Time','To the nearest 5 minutes','g2_mg2'),S('2.MG.3','Symmetry','Lines of symmetry','g2_mg3'),S('2.MG.4','Solid Figures','Faces, edges & vertices','g2_mg4'),
    S('2.PS.1','Bar Graphs','Read bar graphs & pictographs','g2_ps1'),S('2.PFA.1','Number Patterns','Growing patterns','g2_pfa1')],
  read:[S('2.FFR','Phonics','Long vowels, syllables & digraphs','r2_ffr'),S('2.RV','Vocabulary','Prefixes, synonyms & antonyms','r2_rv'),S('2.RL','Stories','Lessons, characters & predictions','r2_rl'),S('2.RI','Nonfiction','Main idea & text features','r2_ri')],
  sci:[S('2.2','Forces & Magnets','Pushes, pulls, gravity & magnets','sc2_2'),S('2.3','States of Matter','Solids, liquids & gases','sc2_3'),S('2.4','Life Cycles','How plants & animals grow','sc2_4'),S('2.5','Habitats','Living things and their homes','sc2_5'),
    S('2.6','Weather','Weather types & tools','sc2_6'),S('2.7','Seasons & Change','How weather changes land & life','sc2_7'),S('2.8','Plants as Resources','How we use plants','sc2_8')],
  write:[S('2.W','Writing','Beginnings, order words & details','w2_w'),S('2.LU','Grammar','Contractions, plurals & verbs','w2_lu')],
  hist:[S('2.1','Rights & Responsibilities','Freedoms and good citizenship','h2_1'),S('2.4','State & National Symbols','Capitals, Liberty Bell & more','h2_4'),S('2.5','Indigenous Peoples','Eastern Woodlands, Plains & Southwest','h2_5'),
    S('2.6','European Explorers','Spain, England & France','h2_6'),S('2.7','Revolutionaries','Washington, Revere, Madison & Henry','h2_7'),S('2.8','Founding the Nation','Colonies & the Declaration','h2_8'),
    S('2.9','A Growing Nation','New capital & the Louisiana Purchase','h2_9'),S('2.10','Changemakers','Inventors, explorers & champions','h2_10'),S('2.11','Map Skills','Oceans, rivers & mountains','h2_11'),
    S('2.12','Landmarks','Memorials, Valley Forge & Yellowstone','h2_12'),S('2.13','Economics','Resources, barter & scarcity','h2_13')],
};
STRANDS[3]={
  math:[S('3.NS.1','Place Value','Numbers to six digits','g3_ns1'),S('3.NS.2','Compare & Order','Whole numbers to 9,999','g3_ns2'),S('3.NS.3','Fractions','Compare, equivalent & mixed numbers','g3_ns3'),
    S('3.NS.4','Money & Change','Up to $5.00','g3_ns4'),S('3.CE.1','Add & Subtract','Within 1,000 and estimating','g3_ce1'),S('3.CE.2','Multiply & Divide','Facts through 10 × 10','g3_ce2'),
    S('3.MG.1','Measurement','U.S. Customary & metric estimates','g3_mg1'),S('3.MG.2','Area & Perimeter','Rectangles and squares','g3_mg2'),S('3.MG.3','Time','Nearest minute & elapsed time','g3_mg3'),
    S('3.MG.4','Polygons','Name & classify polygons','g3_mg4'),S('3.PS.1','Graphs','Bar graphs & two-step questions','g3_ps1'),S('3.PFA.1','Patterns','Increasing & decreasing rules','g3_pfa1')],
  read:[S('3.FFR','Word Study','Syllables, suffixes & vowel teams','r3_ffr'),S('3.RV','Vocabulary','Suffixes, homophones & idioms','r3_rv'),S('3.RL','Stories & Poems','Character change, fables & stanzas','r3_rl'),S('3.RI','Nonfiction','Main idea & text structure','r3_ri')],
  sci:[S('3.2','Forces & Motion','Balanced forces & friction','sc3_2'),S('3.3','Mixtures','Dissolving and mixing','sc3_3'),S('3.4','Adaptations','How living things survive','sc3_4'),S('3.5','Ecosystems','Food chains & habitats','sc3_5'),
    S('3.6','Soil','Layers, humus & worms','sc3_6'),S('3.7','Water Cycle','Evaporation to collection','sc3_7'),S('3.8','Changing Ecosystems','Natural events & people','sc3_8')],
  write:[S('3.W','Paragraphs','Topic sentences & details','w3_w'),S('3.LU','Grammar','Commas, apostrophes & verbs','w3_lu')],
  hist:[S('3.1','Citizenship','Rights & responsibilities','h3_1'),S('3.2','Continents & Oceans','World geography','h3_2'),S('3.3','Ancient Lands','Rivers & landforms of ancient societies','h3_3'),
    S('3.4','Ancient Egypt','Pyramids, pharaohs & hieroglyphics','h3_4'),S('3.5','Ancient China','The Great Wall, silk & paper','h3_5'),S('3.6','Ancient Greece','Democracy, Olympics & the Parthenon','h3_6'),
    S('3.7','Ancient Rome','Republic, Colosseum & aqueducts','h3_7'),S('3.8','Empire of Mali','Mansa Musa, Timbuktu & trade','h3_8'),S('3.9','U.S. Government','Three branches','h3_9'),S('3.10','Economics','Resources, trade & choices','h3_10')],
};
for(const g of [1,2,3])HIST_STRANDS[g]=STRANDS[g].hist;
msStrand=function(gen){for(const g of LEVEL_IDS)for(const s of Object.keys(STRANDS[g]||{}))for(const st of STRANDS[g][s])if(st.gen===gen)return st;return null;};

Object.assign(LESSONS,{
 g1_ns1:['Skip count by adding the same number each time: 5, 10, 15, 20.','A two-digit number is tens and ones: 47 is 4 tens and 7 ones.','A penny is 1¢, a nickel is 5¢, and a dime is 10¢.'],
 g1_ns2:['Compare the tens first. If the tens are the same, compare the ones.','> means greater than; < means less than.'],
 g1_ns3:['Halves: 2 equal parts. Fourths: 4 equal parts.','Equal shares must be the same size.'],
 g1_ce1:['Count on to add; count back to subtract.','Part + part = whole.'],
 g1_mg1:['Line things up at the same starting point to compare length.','More units means longer.'],
 g1_mg2:['Triangles have 3 sides; squares and rectangles have 4.','Squares and rectangles have 4 right angles.'],
 g1_mg3:['The short hand shows the hour. The long hand shows the minutes.','When the long hand is on 12, it is o’clock. On 6, it is half past.'],
 g1_ps1:['Count the pictures in each row.','Compare rows to see which has more.'],
 g1_pfa1:['Find the part that repeats.','Growing patterns add the same amount each time.'],
 g2_ns1:['Skip count by 2s, 5s, 10s, 25s, and 100s.','Even numbers end in 0, 2, 4, 6, or 8.'],
 g2_ns2:['In 547: 5 hundreds, 4 tens, 7 ones.','Expanded form: 500 + 40 + 7.'],
 g2_ns3:['The bottom number tells how many equal parts.','With unit fractions, more parts means smaller pieces.'],
 g2_ns4:['Quarter 25¢, dime 10¢, nickel 5¢, penny 1¢.','Count the biggest coins first.'],
 g2_ce1:['Add or subtract tens, then ones.','Regroup 10 ones as 1 ten when needed.'],
 g2_mg1:['Inches measure length, pounds measure weight, cups measure liquid.'],
 g2_mg2:['Count by 5s around the clock for minutes.'],
 g2_mg3:['A line of symmetry makes two matching halves.'],
 g2_mg4:['Cubes and rectangular prisms have 6 faces, 12 edges, and 8 vertices.','A sphere has no flat faces.'],
 g2_ps1:['Follow the top of each bar across to the numbers.'],
 g2_pfa1:['Find the rule: how much is added each time?'],
 g3_ns1:['Each place is 10 times the place to its right.','Value = digit × place.'],
 g3_ns2:['Line up the digits and compare from the left.'],
 g3_ns3:['Same denominator: compare numerators.','Same numerator: the smaller denominator is the bigger fraction.','2 1/4 = 9/4.'],
 g3_ns4:['Count up from the price to find change.'],
 g3_ce1:['Add and subtract by place value. Regroup when needed.','Estimate by rounding to check your answer.'],
 g3_ce2:['Multiplication is equal groups.','Division undoes multiplication.'],
 g3_mg1:['Customary: inches, feet, pounds, cups. Metric: centimeters, meters, grams, liters.'],
 g3_mg2:['Area = square units inside. Perimeter = distance around.'],
 g3_mg3:['Elapsed time is how much time passes between start and end.'],
 g3_mg4:['Polygons are closed shapes with straight sides.','Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, octagon 8.'],
 g3_ps1:['Read each bar carefully, then add or subtract.'],
 g3_pfa1:['Decide whether the pattern grows or shrinks, and by how much.'],
 r1_ffr:['Rhyming words end with the same sound.','Say each sound slowly, then blend.'],
 r1_rv:['Opposites mean very different things: hot and cold.','Compound words are two words put together.'],
 r1_rl:['Characters are who the story is about. The setting is where and when.','Retell the beginning, middle, and end.'],
 r1_ri:['The topic is what the text is mostly about.','Titles and captions give clues.'],
 r2_ffr:['A silent e makes the vowel say its name.','Clap to count syllables.'],
 r2_rv:['un- means not; re- means again.','Synonyms mean the same; antonyms mean the opposite.'],
 r2_rl:['The lesson is what a character learns.','Use clues to predict what happens next.'],
 r2_ri:['The main idea is the big point.','Headings, glossaries, and captions help readers.'],
 r3_ffr:['Divide words into syllables to read them.','Suffixes like -ful and -less change meaning.'],
 r3_rv:['Homophones sound the same but have different meanings.','Idioms do not mean exactly what the words say.'],
 r3_rl:['Characters can change from the beginning to the end.','A fable teaches a moral.'],
 r3_ri:['Find the main idea and the details that support it.','Text structure: sequence, cause and effect, compare.'],
 w1_w:['A sentence tells a complete thought.','Telling sentences end with a period.'],
 w1_lu:['Begin sentences and names with capital letters.','Questions end with a question mark.'],
 w2_w:['Stories have a beginning, middle, and end.','Use order words: first, next, then, last.'],
 w2_lu:['Contractions use an apostrophe for missing letters.','Add -s or -es to make plurals.'],
 w3_w:['A paragraph has a topic sentence, details, and a closing sentence.'],
 w3_lu:['Use commas in a list.','Use ’s to show ownership.'],
 sc1_2:['Pushes and pulls make things move.','Sound is made by vibrations.'],sc1_3:['Objects are made of materials like wood, metal, glass, and cloth.'],
 sc1_4:['Plants need water, light, air, and space.','Roots, stems, and leaves each have a job.'],sc1_5:['Animals need food, water, air, and shelter.'],
 sc1_6:['The sun gives Earth light and heat.','Shadows form when light is blocked.'],sc1_7:['Seasons change temperature, plants, and animals.'],sc1_8:['Reduce, reuse, and recycle to save resources.'],
 sc2_2:['Forces push or pull.','Magnets attract iron and steel; like poles repel.'],sc2_3:['Matter can be a solid, liquid, or gas.','Heating and cooling change states.'],
 sc2_4:['Living things grow and change in life cycles.'],sc2_5:['A habitat provides food, water, and shelter.'],sc2_6:['Thermometers, rain gauges, and weather vanes measure weather.'],
 sc2_7:['Weather and seasons change land and living things.'],sc2_8:['Plants give us food, wood, cloth, and oxygen.'],
 sc3_2:['Bigger forces cause bigger changes in motion.','Balanced forces do not change motion.'],sc3_3:['Some solids dissolve in water, especially warm water.'],
 sc3_4:['Physical adaptations are body parts; behavioral adaptations are actions.'],sc3_5:['Food chains start with the sun and producers.'],
 sc3_6:['Topsoil has humus and nutrients.','Clay holds water; sand drains quickly.'],sc3_7:['Evaporation, condensation, precipitation, collection.'],sc3_8:['Natural events and people can change ecosystems.'],
 h1_1:['Good citizens follow rules, take turns, and help others.'],h1_2:['Holidays honor people and events.'],h1_3:['The flag and bald eagle are American symbols.'],
 h1_4:['Werowocomoco was Chief Powhatan’s town. Jamestown was settled in 1607.'],h1_5:['Many Virginians helped shape our state and nation.'],h1_6:['Maps use keys and compass roses.'],
 h1_7:['Settlements grew near water.'],h1_8:['Needs are required to live; wants are nice to have.','Goods are things; services are work done for others.'],
 h2_1:['Citizens have rights and responsibilities.'],h2_4:['Richmond is Virginia’s capital; Washington, D.C., is the nation’s capital.'],h2_5:['Indigenous peoples used the resources of their regions.'],
 h2_6:['Explorers came from Spain, England, and France.'],h2_7:['Revolutionaries worked for America’s freedom.'],h2_8:['The Declaration of Independence was adopted in 1776.'],
 h2_9:['The Louisiana Purchase doubled the size of the U.S.'],h2_10:['Changemakers invented, explored, and worked for fairness.'],h2_11:['Learn the oceans, rivers, and mountains of the U.S.'],
 h2_12:['Landmarks honor people and events.'],h2_13:['Resources are natural, human, or capital.','Scarcity means we must make choices.'],
 h3_1:['Citizens have rights and responsibilities.'],h3_2:['There are 7 continents and 5 oceans.'],h3_3:['Ancient societies grew near rivers.'],
 h3_4:['Egypt: pyramids, pharaohs, hieroglyphics, papyrus.'],h3_5:['China: Great Wall, silk, paper, the Huang He.'],h3_6:['Greece: democracy, the Olympics, the Parthenon.'],
 h3_7:['Rome: republic, roads, aqueducts, the Colosseum.'],h3_8:['Mali: Mansa Musa, Timbuktu, gold and salt.'],h3_9:['Three branches: legislative, executive, judicial.'],h3_10:['Specialization and trade help people get what they need.'],
});

HIST_EVENTS[1]=[[1607,'Jamestown is settled'],[1776,'Declaration of Independence'],[1789,'George Washington becomes President'],[1903,'Maggie L. Walker opens her bank'],[1968,'Arthur Ashe wins the U.S. Open'],[1989,'L. Douglas Wilder elected governor']];
HIST_EVENTS[2]=[[1492,'Columbus sails for Spain'],[1607,'Jamestown is settled'],[1775,'Paul Revere’s ride'],[1776,'Declaration of Independence'],[1800,'Capital moves to Washington, D.C.'],[1803,'Louisiana Purchase'],[1872,'Yellowstone becomes the first national park'],[1903,'Wright brothers fly'],[1947,'Jackie Robinson joins Major League Baseball'],[1969,'Neil Armstrong walks on the moon']];
HIST_EVENTS[3]=[[1776,'Declaration of Independence'],[1787,'U.S. Constitution written'],[1896,'First modern Olympic Games'],[1969,'First moon landing']];
WHO[1]=[['George Washington',['I was the first President.','I was born in Virginia.','I am on the one-dollar bill.']],['Pocahontas',['I was the daughter of Chief Powhatan.','I helped the English at Jamestown.','I traveled to England.']],
 ['Maggie L. Walker',['I started a bank in Richmond.','I helped people in my community save money.','I was a businesswoman and teacher.']],['Arthur R. Ashe, Jr.',['I was born in Richmond.','I was a tennis champion.','I worked to help others.']],
 ['Thomas Jefferson',['I wrote the Declaration of Independence.','I lived at Monticello.','I was the third President.']]];
WHO[2]=[['Benjamin Franklin',['I flew a kite to learn about electricity.','I helped write the Declaration of Independence.','I started a library.']],['Rosa Parks',['I would not give up my bus seat.','I helped start a bus boycott.','I worked for equal rights.']],
 ['Neil Armstrong',['I was an astronaut.','I was the first person to walk on the moon.','I flew on Apollo 11.']],['Sacagawea',['I helped Lewis and Clark.','I was a Shoshone woman.','I knew the land and languages.']],
 ['Paul Revere',['I was a silversmith.','I rode at night to warn colonists.','I lived in Boston.']]];
WHO[3]=[['Mansa Musa',['I ruled the empire of Mali.','I was very wealthy.','I made Timbuktu a center of learning.']],['A pharaoh',['I ruled ancient Egypt.','Pyramids were built as tombs for rulers like me.','I lived along the Nile.']],
 ['The Great Wall',['I am very long.','I was built in ancient China.','I helped protect against invaders.']],['The Colosseum',['I am a giant arena.','I am in Rome.','Crowds watched events here.']],['The Parthenon',['I am a temple.','I am in Athens, Greece.','I have many columns.']]];
if(typeof WORD_BANK!=='undefined')for(const g of [1,2,3])WORD_BANK[g]=WORD_BANK[g]||WORD_BANK[4];
Object.assign(SUBJ_GRADE,{1:{hist:['History & Social Science','Citizenship, Virginia history, maps, and money.']},2:{hist:['History & Social Science','American people, places, symbols, and economics.']},3:{hist:['History & Social Science','Ancient civilizations, continents, and government.']}});
Object.assign(SK_ART,{
 'math:1.NS.1':'m_place','math:1.NS.2':'m_place','math:1.NS.3':'m_frac','math:1.CE.1':'m_ops','math:1.MG.1':'m_measure','math:1.MG.2':'m_geo','math:1.MG.3':'m_time','math:1.PS.1':'m_data','math:1.PFA.1':'m_pattern',
 'math:2.NS.1':'m_pattern','math:2.NS.2':'m_place','math:2.NS.3':'m_frac','math:2.NS.4':'m_dec','math:2.CE.1':'m_ops','math:2.MG.1':'m_measure','math:2.MG.2':'m_time','math:2.MG.3':'m_geo','math:2.MG.4':'m_squares','math:2.PS.1':'m_data','math:2.PFA.1':'m_pattern',
 'math:3.NS.1':'m_place','math:3.NS.2':'m_place','math:3.NS.3':'m_frac','math:3.NS.4':'m_dec','math:3.CE.1':'m_ops','math:3.CE.2':'m_ops','math:3.MG.1':'m_measure','math:3.MG.2':'m_area','math:3.MG.3':'m_time','math:3.MG.4':'m_geo','math:3.PS.1':'m_data','math:3.PFA.1':'m_pattern',
 'read:1.FFR':'r_vocab','read:1.RV':'r_vocab','read:1.RL':'r_fiction','read:1.RI':'r_nonfic','read:2.FFR':'r_vocab','read:2.RV':'r_vocab','read:2.RL':'r_fiction','read:2.RI':'r_nonfic','read:3.FFR':'r_vocab','read:3.RV':'r_vocab','read:3.RL':'r_fiction','read:3.RI':'r_nonfic',
 'write:1.W':'w_sentence','write:1.LU':'w_edit','write:2.W':'w_sentence','write:2.LU':'w_edit','write:3.W':'w_sentence','write:3.LU':'w_edit',
 'sci:1.2':'s_force','sci:1.3':'s_matter','sci:1.4':'s_plants','sci:1.5':'s_adapt','sci:1.6':'s_space','sci:1.7':'s_weather','sci:1.8':'s_resources',
 'sci:2.2':'s_elec','sci:2.3':'s_matter','sci:2.4':'s_plants','sci:2.5':'s_eco','sci:2.6':'s_weather','sci:2.7':'s_weather','sci:2.8':'s_plants',
 'sci:3.2':'s_force','sci:3.3':'s_matter','sci:3.4':'s_adapt','sci:3.5':'s_eco','sci:3.6':'s_plants','sci:3.7':'s_weather','sci:3.8':'s_pop',
 'hist:1.1':'h_citizen','hist:1.2':'h_nation','hist:1.3':'h_nation','hist:1.4':'h_jamestown','hist:1.5':'h_presidents','hist:1.6':'h_skills','hist:1.7':'h_geo','hist:1.8':'h_econ',
 'hist:2.1':'h_citizen','hist:2.4':'h_nation','hist:2.5':'h_native','hist:2.6':'h_jamestown','hist:2.7':'h_revolution','hist:2.8':'h_nation','hist:2.9':'h_west','hist:2.10':'h_1900s','hist:2.11':'h_geo','hist:2.12':'h_presidents','hist:2.13':'h_econ',
 'hist:3.1':'h_citizen','hist:3.2':'subj_geo','hist:3.3':'h_skills','hist:3.4':'h_egypt','hist:3.5':'h_china','hist:3.6':'h_greece','hist:3.7':'h_rome','hist:3.8':'h_mali','hist:3.9':'h_branches','hist:3.10':'h_econ'});
Object.assign(ART_FALLBACK,{h_egypt:'h_skills',h_china:'h_skills',h_greece:'h_skills',h_rome:'h_skills',h_mali:'h_skills'});

