// ═══════════════════════════════════════════════════════════════
// LEARNING LEVELS — only grades with real content are offered:
// Grade 4 (elementary) and Grades 6, 7, 8 (middle school).
// ═══════════════════════════════════════════════════════════════
const LEVELS=[[4,'Grade 4','Elementary · Virginia Studies'],[6,'Grade 6','Middle school'],[7,'Grade 7','Middle school'],[8,'Grade 8','Middle school']];
const LEVEL_IDS=LEVELS.map(l=>l[0]);
function normGrade(g){g=+g||4;return g>=8?8:g===7?7:g>=5?6:4;}
gradeContent=function(){return normGrade(ST.grade);};
gcNum=gradeContent;

STRANDS[7]={
  math:[
    {code:'7.NS.1',name:'Scientific Notation',desc:'Negative powers of 10 & scientific notation',gen:'g7_ns1'},
    {code:'7.NS.2',name:'Rational Numbers',desc:'Compare & order fractions, decimals, percents',gen:'g7_ns2'},
    {code:'7.NS.3',name:'Square Roots',desc:'Perfect squares and square roots to 400',gen:'g7_ns3'},
    {code:'7.CE.1',name:'Multistep Problems',desc:'Solve problems with rational numbers',gen:'g7_ce1'},
    {code:'7.CE.2',name:'Percents & Proportions',desc:'Discounts, tax, unit rates & proportions',gen:'g7_ce2'},
    {code:'7.MG.1',name:'Volume & Surface Area',desc:'Cylinders and rectangular prisms',gen:'g7_mg1'},
    {code:'7.MG.2',name:'Similar Figures',desc:'Scale factors & scale drawings',gen:'g7_mg2'},
    {code:'7.MG.3',name:'Quadrilaterals',desc:'Classify & find missing angles',gen:'g7_mg3'},
    {code:'7.MG.4',name:'Dilations',desc:'Dilate figures from the origin',gen:'g7_mg4'},
    {code:'7.PS.1',name:'Probability',desc:'Theoretical vs. experimental',gen:'g7_ps1'},
    {code:'7.PS.2',name:'Histograms',desc:'Read & analyze histograms',gen:'g7_ps2'},
    {code:'7.PFA.1',name:'Proportional Relationships',desc:'y = mx, tables, graphs & slope',gen:'g7_pfa1'},
    {code:'7.PFA.2',name:'Expressions',desc:'Evaluate & simplify expressions',gen:'g7_pfa2'},
    {code:'7.PFA.3',name:'Two-Step Equations',desc:'Write & solve equations',gen:'g7_pfa3'},
    {code:'7.PFA.4',name:'Inequalities',desc:'Solve one- and two-step inequalities',gen:'g7_pfa4'},
  ],
  read:[
    {code:'7.4',name:'Vocabulary',desc:'Roots, affixes, connotation & figurative language',gen:'r7_vocab'},
    {code:'7.5',name:'Fiction Analysis',desc:'Conflict, theme, point of view & inference',gen:'r7_fiction'},
    {code:'7.6',name:'Nonfiction Analysis',desc:'Main idea, structure, claims & purpose',gen:'r7_nonfic'},
  ],
  sci:[
    {code:'LS.2',name:'Cells',desc:'Cell theory, organelles & cell division',gen:'ls2'},
    {code:'LS.3',name:'Classification',desc:'Levels of organization & classifying life',gen:'ls3'},
    {code:'LS.4',name:'Photosynthesis & Respiration',desc:'How living things get energy',gen:'ls4'},
    {code:'LS.5',name:'Ecosystems',desc:'Biotic & abiotic factors, cycles, energy flow',gen:'ls5'},
    {code:'LS.6',name:'Populations & Interactions',desc:'Predators, symbiosis & competition',gen:'ls6'},
    {code:'LS.7',name:'Adaptations',desc:'How traits help organisms survive',gen:'ls7'},
    {code:'LS.10',name:'Heredity',desc:'DNA, genes & Punnett squares',gen:'ls10'},
    {code:'LS.11',name:'Change Over Time',desc:'Fossils, variation & natural selection',gen:'ls11'},
  ],
  write:[
    {code:'7.7',name:'Writing',desc:'Thesis, evidence, transitions & style',gen:'w7_write'},
    {code:'7.8',name:'Editing',desc:'Agreement, modifiers & punctuation',gen:'w7_edit'},
  ],
  hist:[
    {code:'CE.1',name:'Constitutional Foundations',desc:'Principles, Articles of Confederation, amendments',gen:'ce1'},
    {code:'CE.2',name:'Federal Government',desc:'Three branches & checks and balances',gen:'ce2'},
    {code:'CE.3',name:'Virginia Government',desc:'General Assembly, Governor & courts',gen:'ce3'},
    {code:'CE.4',name:'Local Government',desc:'Counties, cities, towns & ordinances',gen:'ce4'},
    {code:'CE.5',name:'The Judicial System',desc:'State & federal courts, rights of the accused',gen:'ce5'},
    {code:'CE.6',name:'Citizenship & Rights',desc:'Becoming a citizen, duties & responsibilities',gen:'ce6'},
    {code:'CE.7',name:'Good Citizenship',desc:'Civility, honesty & community service',gen:'ce7'},
    {code:'CE.8',name:'Parties & Elections',desc:'Political parties, voting & the Electoral College',gen:'ce8'},
    {code:'CE.9',name:'The Media',desc:'Free press, bias & evaluating sources',gen:'ce9'},
    {code:'CE.11',name:'Economic Foundations',desc:'Scarcity, choices, supply & demand',gen:'ce11'},
    {code:'CE.12',name:'Government & the Economy',desc:'Public goods, fiscal & monetary policy',gen:'ce12'},
    {code:'CE.13',name:'Personal Finance',desc:'Budgets, credit, insurance & saving',gen:'ce13'},
  ],
};
STRANDS[8]={
  math:[
    {code:'8.NS.1',name:'Real Numbers',desc:'Compare, order & estimate square roots',gen:'g8_ns1'},
    {code:'8.NS.2',name:'Real Number System',desc:'Rational, irrational & number sets',gen:'g8_ns2'},
    {code:'8.CE.1',name:'Percents in Context',desc:'Percent change, tax & simple interest',gen:'g8_ce1'},
    {code:'8.MG.1',name:'Angle Relationships',desc:'Vertical, supplementary & complementary',gen:'g8_mg1'},
    {code:'8.MG.2',name:'Cones & Pyramids',desc:'Volume and surface area',gen:'g8_mg2'},
    {code:'8.MG.3',name:'Transformations',desc:'Translations & reflections',gen:'g8_mg3'},
    {code:'8.MG.4',name:'Pythagorean Theorem',desc:'Right triangles in context',gen:'g8_mg4'},
    {code:'8.MG.5',name:'Composite Figures',desc:'Area & perimeter of combined shapes',gen:'g8_mg5'},
    {code:'8.PS.1',name:'Compound Probability',desc:'Independent & dependent events',gen:'g8_ps1'},
    {code:'8.PS.2',name:'Boxplots',desc:'Median, quartiles & IQR',gen:'g8_ps2'},
    {code:'8.PS.3',name:'Scatterplots',desc:'Relationships & lines of best fit',gen:'g8_ps3'},
    {code:'8.PFA.1',name:'Algebraic Expressions',desc:'Simplify & write equivalent expressions',gen:'g8_pfa1'},
    {code:'8.PFA.2',name:'Functions',desc:'Relations, domain & range',gen:'g8_pfa2'},
    {code:'8.PFA.3',name:'Linear Functions',desc:'Slope, intercepts & rate of change',gen:'g8_pfa3'},
    {code:'8.PFA.4',name:'Multistep Equations',desc:'Variables on both sides',gen:'g8_pfa4'},
    {code:'8.PFA.5',name:'Multistep Inequalities',desc:'Solve & flip the sign when needed',gen:'g8_pfa5'},
  ],
  read:[
    {code:'8.4',name:'Vocabulary',desc:'Roots, connotation & figurative language',gen:'r8_vocab'},
    {code:'8.5',name:'Fiction Analysis',desc:'Foreshadowing, irony, theme & characterization',gen:'r8_fiction'},
    {code:'8.6',name:'Nonfiction Analysis',desc:'Arguments, evidence, sources & techniques',gen:'r8_nonfic'},
  ],
  sci:[
    {code:'PS.2',name:'Atoms & Matter',desc:'Atomic structure & particle theory',gen:'ps2'},
    {code:'PS.3',name:'Properties of Matter',desc:'Physical & chemical changes, conservation',gen:'ps3'},
    {code:'PS.4',name:'Periodic Table',desc:'How elements are organized',gen:'ps4'},
    {code:'PS.5',name:'Energy',desc:'Potential, kinetic & heat transfer',gen:'ps5'},
    {code:'PS.6',name:'Waves & Sound',desc:'Wave properties & sound',gen:'ps6'},
    {code:'PS.7',name:'Light & EM Radiation',desc:'The electromagnetic spectrum',gen:'ps7'},
    {code:'PS.8',name:'Force & Motion',desc:'Newton’s laws, work & speed',gen:'ps8'},
    {code:'PS.9',name:'Electricity & Magnetism',desc:'Circuits, static & electromagnets',gen:'ps9'},
  ],
  write:[
    {code:'8.7',name:'Writing',desc:'Arguments, counterclaims & citing sources',gen:'w8_write'},
    {code:'8.8',name:'Editing',desc:'Voice, mood, parallelism & pronouns',gen:'w8_edit'},
  ],
  hist:[
    {code:'WG.1',name:'Geography Tools',desc:'Maps, GIS, regions & projections',gen:'wg1'},
    {code:'WG.2',name:'Resources',desc:'Natural, human & capital resources',gen:'wg2'},
    {code:'WG.3',name:'United States & Canada',desc:'Landforms, waterways & cultures',gen:'wg3'},
    {code:'WG.4',name:'Latin America',desc:'Andes, Amazon & the Caribbean',gen:'wg4'},
    {code:'WG.5',name:'Europe',desc:'Alps, rivers, climate & the EU',gen:'wg5'},
    {code:'WG.6',name:'Russia & Central Asia',desc:'Urals, taiga & a vast land',gen:'wg6'},
    {code:'WG.7',name:'Sub-Saharan Africa',desc:'Savannas, the Sahel & rivers',gen:'wg7'},
    {code:'WG.8',name:'North Africa & Southwest Asia',desc:'Deserts, the Nile & oil',gen:'wg8'},
    {code:'WG.9',name:'South & Southeast Asia',desc:'Himalayas, monsoons & islands',gen:'wg9'},
    {code:'WG.10',name:'East Asia',desc:'China, Japan & the Ring of Fire',gen:'wg10'},
    {code:'WG.11',name:'Australia & the Pacific',desc:'Outback, reefs & islands',gen:'wg11'},
    {code:'WG.12',name:'Population',desc:'Density, growth & standard of living',gen:'wg12'},
    {code:'WG.13',name:'Migration',desc:'Push and pull factors, refugees',gen:'wg13'},
    {code:'WG.14',name:'Culture',desc:'Cultural patterns & diffusion',gen:'wg14'},
    {code:'WG.15',name:'Cities & Rural Areas',desc:'Urbanization & where cities grow',gen:'wg15'},
    {code:'WG.16',name:'Globalization',desc:'Trade, interdependence & networks',gen:'wg16'},
    {code:'WG.17',name:'Political Geography',desc:'Borders, chokepoints & shared rivers',gen:'wg17'},
  ],
};
HIST_STRANDS[7]=STRANDS[7].hist;HIST_STRANDS[8]=STRANDS[8].hist;

// questions from the middle-school banks
function msStrand(gen){for(const g of [7,8])for(const s of Object.keys(STRANDS[g]))for(const st of STRANDS[g][s])if(st.gen===gen)return st;return null;}
function msQ(gen){
  const st=msStrand(gen)||{code:'',name:'Practice'};const it=pick(MSB[gen]);
  if(it.t==='multi')return {type:'multi',badge:'Select all',sol:st.code,question:it.q,opts:shuf(it.o.slice()),answers:it.a,explanation:it.e,hint:it.h};
  if(it.t==='order')return {type:'order',badge:'Put in order',sol:st.code,question:it.q,items:it.items,explanation:it.e,hint:it.h};
  const q=mcq(st.name,st.code,it.q,[it.a].concat(it.w),it.a,it.e,it.h);
  if(it.p)q.passage=it.p;return q;
}
const _makeQBase=makeQ;
makeQ=function(gen){return MSB[gen]?msQ(gen):_makeQBase(gen);};

// lessons: key ideas shown before practice
Object.assign(LESSONS,{
 g7_ns1:['Scientific notation writes a number as a factor from 1 to less than 10 times a power of 10, like 4.5 × 10⁴.','Negative exponents mean small numbers: 10⁻³ = 1 ÷ 1,000 = 0.001.','Compare numbers in scientific notation by looking at the exponents first.'],
 g7_ns2:['Change fractions and percents to decimals to compare them.','On a number line, numbers increase to the right. −0.8 is less than −0.75.','Absolute value is distance from zero, so it is never negative.'],
 g7_ns3:['A perfect square is a whole number times itself, like 196 = 14 × 14.','The square root undoes squaring: √196 = 14.'],
 g7_ce1:['Read the problem, decide the operations, then solve step by step.','Estimate first so you can check whether your answer makes sense.'],
 g7_ce2:['Percent means “out of 100.” 20% of 50 = 0.20 × 50 = 10.','Discount: subtract from the price. Tax and tip: add to the price.','A unit rate compares to 1, like miles per hour.'],
 g7_mg1:['Volume of a cylinder: V = πr²h.','Surface area of a rectangular prism: SA = 2lw + 2lh + 2wh.','Surface area of a cylinder: SA = 2πr² + 2πrh.'],
 g7_mg2:['Similar figures have the same shape; corresponding sides are proportional.','The scale factor is new length ÷ original length.'],
 g7_mg3:['The angles of any quadrilateral add to 360°.','Square ⊂ rectangle and rhombus ⊂ parallelogram. A trapezoid has exactly one pair of parallel sides.'],
 g7_mg4:['A dilation with the origin as center multiplies each coordinate by the scale factor.','Scale factor > 1 enlarges; between 0 and 1 shrinks.'],
 g7_ps1:['Theoretical probability = favorable outcomes ÷ total outcomes.','Experimental probability uses actual results. More trials usually bring it closer to the theoretical value.'],
 g7_ps2:['A histogram groups data into equal intervals.','The height of each bar is how many values fall in that interval.'],
 g7_pfa1:['A proportional relationship can be written y = mx. The graph is a straight line through (0, 0).','The slope m is the unit rate: change in y ÷ change in x.'],
 g7_pfa2:['Combine like terms: 3x + 5x = 8x.','Distributive property: a(b + c) = ab + ac.'],
 g7_pfa3:['Undo operations in reverse order: first add or subtract, then multiply or divide.','Check your answer by substituting it back in.'],
 g7_pfa4:['Solve inequalities like equations.','On a number line, use an open circle for < or > and a closed circle for ≤ or ≥.'],
 g8_ns1:['Estimate a square root by finding the perfect squares on either side: √50 is between 7 and 8.','Every positive number has two square roots, one positive and one negative.'],
 g8_ns2:['Natural ⊂ whole ⊂ integers ⊂ rational ⊂ real numbers.','Irrational numbers, like π and √2, are non-repeating, non-ending decimals.'],
 g8_ce1:['Percent change = amount of change ÷ original amount.','Simple interest: I = P × r × t.'],
 g8_mg1:['Vertical angles are congruent.','Supplementary angles add to 180°. Complementary angles add to 90°.'],
 g8_mg2:['Volume of a cone: V = ⅓πr²h. Volume of a pyramid: V = ⅓Bh.','Surface area of a square pyramid = base + 4 triangles.'],
 g8_mg3:['Translation: slide every point the same distance.','Reflect over the x-axis: (x, y) → (x, −y). Over the y-axis: (x, y) → (−x, y).'],
 g8_mg4:['In a right triangle, a² + b² = c², where c is the hypotenuse.','Use it to find a missing side or to check whether a triangle is a right triangle.'],
 g8_mg5:['Split a composite figure into rectangles, triangles, and circle parts.','Add the parts (or subtract a cut-out part).'],
 g8_ps1:['Independent events: multiply the probabilities.','Dependent events: after the first pick, update the numbers before multiplying.'],
 g8_ps2:['A boxplot shows the minimum, Q1, median, Q3, and maximum.','The interquartile range (IQR) = Q3 − Q1 and holds the middle 50% of the data.'],
 g8_ps3:['A scatterplot shows how two variables relate: positive, negative, or no relationship.','A line of best fit can be used to make predictions.'],
 g8_pfa1:['Distribute first, then combine like terms.','Watch negative signs when distributing.'],
 g8_pfa2:['A function pairs each input with exactly one output.','Domain = all inputs (x). Range = all outputs (y).'],
 g8_pfa3:['In y = mx + b, m is the slope and b is the y-intercept.','Slope = (y₂ − y₁) ÷ (x₂ − x₁).'],
 g8_pfa4:['Move variable terms to one side and numbers to the other.','Keep both sides balanced: do the same thing to each side.'],
 g8_pfa5:['Solve like an equation.','When you multiply or divide by a negative number, flip the inequality sign.'],
 r7_vocab:['Use context clues around an unknown word.','Roots and affixes help: trans- = across, aud = hear.','Connotation is the feeling a word gives: thrifty (positive) vs. stingy (negative).'],
 r7_fiction:['Conflict can be internal (inside a character) or external.','Theme is the lesson or message about life.','Point of view: first person uses “I”; third person uses “he” or “she.”'],
 r7_nonfic:['Main idea: what the whole passage is mostly about.','Text structures: sequence, cause and effect, compare and contrast, problem and solution.','A claim is an opinion supported by evidence.'],
 r8_vocab:['Greek and Latin roots unlock many words: chron = time, mal- = bad.','Figurative language says something non-literally.'],
 r8_fiction:['Foreshadowing hints at future events.','Irony is the difference between what is expected and what happens.','Indirect characterization shows character through actions and words.'],
 r8_nonfic:['Strong arguments use relevant evidence and address counterclaims.','Check sources for reliability.','Persuasive techniques include bandwagon, expert opinion, and statistics.'],
 w7_write:['A thesis states your main claim.','Use transitions to connect ideas: however, therefore, for example.'],
 w7_edit:['Indefinite pronouns like each and neither are singular.','Place modifiers next to the word they describe.'],
 w8_write:['Address a counterclaim, then explain why your claim is stronger.','Cite sources to avoid plagiarism.'],
 w8_edit:['Use active voice for clear writing.','Keep items in a list parallel.','Use “were” for imagined situations: If I were…'],
 ls2:['Cell theory: all living things are made of cells, cells are the basic unit of life, and cells come from cells.','Plant cells have a cell wall and chloroplasts; animal cells do not.','Mitosis makes identical cells for growth and repair.'],
 ls3:['Levels: cell → tissue → organ → organ system → organism.','Classification: domain, kingdom, phylum, class, order, family, genus, species.'],
 ls4:['Photosynthesis: carbon dioxide + water + light → glucose + oxygen.','Cellular respiration releases energy from glucose.'],
 ls5:['Biotic = living; abiotic = nonliving.','Only about 10% of energy passes to the next level of an energy pyramid.','Decomposers recycle nutrients.'],
 ls6:['Symbiosis: mutualism (both benefit), commensalism (one benefits, one unaffected), parasitism (one harmed).','Limited resources lead to competition and set the carrying capacity.'],
 ls7:['Structural adaptations are body features; behavioral adaptations are actions.','Camouflage and mimicry help organisms avoid predators.'],
 ls10:['DNA carries genetic information.','Dominant alleles (capital letters) hide recessive alleles.','Punnett squares predict offspring.'],
 ls11:['Fossils show how life has changed over time.','Natural selection: organisms with helpful traits survive and reproduce.'],
 ps2:['Atoms have protons (+), neutrons (0), and electrons (−).','The atomic number is the number of protons.'],
 ps3:['Physical changes do not make new substances; chemical changes do.','Mass is conserved in chemical reactions.'],
 ps4:['The periodic table is ordered by atomic number.','Groups (columns) share similar properties. Metals are on the left.'],
 ps5:['Potential energy is stored; kinetic energy is motion.','Energy changes form but is conserved.','Heat moves by conduction, convection, and radiation.'],
 ps6:['Sound is a longitudinal wave that needs a medium.','Frequency affects pitch; amplitude affects loudness.'],
 ps7:['The electromagnetic spectrum goes from radio waves (long) to gamma rays (short).','EM waves can travel through empty space.'],
 ps8:['Newton’s laws: inertia, F = ma, and action–reaction.','Speed = distance ÷ time. Work = force × distance.'],
 ps9:['Series circuits have one path; parallel circuits have several.','Like poles repel; opposite poles attract.'],
 ce1:['Principles: popular sovereignty, limited government, federalism, separation of powers, checks and balances.','The Constitution replaced the weak Articles of Confederation.'],
 ce2:['Legislative makes laws, executive carries them out, judicial interprets them.','Checks and balances: veto, override, judicial review.'],
 ce3:['Virginia’s General Assembly has the House of Delegates and the Senate.','The Governor leads the executive branch for a four-year term.'],
 ce4:['Local governments get their power from the General Assembly.','Local laws are called ordinances.'],
 ce5:['There are state courts and federal courts.','Criminal cases involve crimes; civil cases settle private disputes.'],
 ce6:['Citizenship comes by birth or naturalization.','Duties are required (obey laws, pay taxes); responsibilities are expected (vote, stay informed).'],
 ce7:['Good citizens show civility, honesty, respect, and responsibility.','Community service promotes the common good.'],
 ce8:['Political parties recruit candidates and inform voters.','A presidential candidate needs 270 of 538 electoral votes.'],
 ce9:['A free press informs citizens and checks government.','Compare sources to spot bias.'],
 ce11:['Scarcity forces choices. Opportunity cost is the next-best choice given up.','Prices are set by supply and demand in a market economy.'],
 ce12:['Government provides public goods like roads and defense.','Fiscal policy = taxing and spending. Monetary policy = the Federal Reserve.'],
 ce13:['A budget plans spending and saving.','Good credit means lower interest rates. Diversify to reduce risk.'],
 wg1:['Latitude measures north–south; longitude measures east–west.','GIS layers data on digital maps.','All flat maps distort Earth.'],
 wg2:['Resources: natural, human, and capital.','Uneven resources lead countries to trade.'],
 wg3:['The Rockies are in the west; the Appalachians in the east.','The St. Lawrence Seaway links the Great Lakes to the Atlantic.'],
 wg4:['The Andes run along western South America.','The Amazon is the largest rainforest.'],
 wg5:['The Alps cross central Europe.','Warm ocean currents give Western Europe a mild climate.'],
 wg6:['Russia is the largest country by area.','The Ural Mountains divide Europe and Asia.'],
 wg7:['Savannas cover much of sub-Saharan Africa.','The Sahel borders the Sahara and faces desertification.'],
 wg8:['The Nile Valley is fertile land in the desert.','Oil is a key resource near the Persian Gulf.'],
 wg9:['The Himalayas include Mount Everest.','Monsoons bring heavy summer rain.'],
 wg10:['Japan lies on the Ring of Fire.','The Yangtze is Asia’s longest river.'],
 wg11:['Most Australians live along the coasts.','Low-lying Pacific Islands face rising seas.'],
 wg12:['Population density = people ÷ area.','GDP per capita helps measure standard of living.'],
 wg13:['Push factors drive people away; pull factors attract them.','Refugees flee war or persecution.'],
 wg14:['Culture includes language, religion, food, and customs.','Cultural diffusion spreads ideas between groups.'],
 wg15:['Urbanization: people moving from rural areas to cities.','Cities often grow near water for trade and transportation.'],
 wg16:['Globalization connects countries through trade and technology.','Countries depend on one another to make goods.'],
 wg17:['Borders can be disputed over resources or history.','Chokepoints like straits and canals control shipping.'],
});

// games and timelines for middle school
HIST_EVENTS[7]=[[1776,'Declaration of Independence'],[1781,'Articles of Confederation ratified'],[1787,'Constitution written'],[1791,'Bill of Rights ratified'],[1803,'Marbury v. Madison'],
  [1868,'14th Amendment ratified'],[1870,'15th Amendment ratified'],[1913,'Federal Reserve created'],[1920,'19th Amendment ratified'],[1954,'Brown v. Board of Education'],
  [1965,'Voting Rights Act'],[1971,'26th Amendment lowers voting age to 18'],[1974,'Nixon resigns after Watergate']];
HIST_EVENTS[8]=[[1869,'Suez Canal opens'],[1914,'Panama Canal opens'],[1945,'United Nations founded'],[1947,'India gains independence'],[1957,'European Economic Community formed'],
  [1960,'Many African nations gain independence'],[1969,'First moon landing'],[1989,'Fall of the Berlin Wall'],[1991,'Soviet Union dissolves'],[1993,'European Union established'],[1999,'Euro introduced'],[2007,'Smartphones spread worldwide']];
WHO[7]=[
 ['James Madison',['I am called the “Father of the Constitution.”','I helped write The Federalist Papers.','I was the fourth president.']],
 ['John Marshall',['I was Chief Justice of the Supreme Court.','My decision in Marbury v. Madison set up judicial review.','I was from Virginia.']],
 ['George Mason',['I wrote the Virginia Declaration of Rights.','My ideas shaped the Bill of Rights.','I refused to sign the Constitution without a bill of rights.']],
 ['Thurgood Marshall',['I argued Brown v. Board of Education before the Supreme Court.','I became the first African American Supreme Court justice.','I fought for equal rights under the law.']],
 ['Sandra Day O’Connor',['I was the first woman on the U.S. Supreme Court.','I was appointed in 1981.','I came from Arizona.']],
 ['The Governor of Virginia',['I lead Virginia’s executive branch.','I serve a four-year term.','I can sign or veto bills passed by the General Assembly.']],
 ['The Federal Reserve',['I am the central bank of the United States.','I help control the money supply.','I can raise or lower interest rates.']],
 ['A Supreme Court justice',['I am appointed by the President.','The Senate must confirm me.','I can serve for life.']],
];
WHO[8]=[
 ['The Nile River',['I am the longest river in Africa.','I flow north to the Mediterranean Sea.','Ancient Egypt grew along my banks.']],
 ['The Amazon',['I am the largest rainforest on Earth.','Most of me is in Brazil.','I am home to millions of species.']],
 ['The Sahara',['I am the largest hot desert in the world.','I cover much of North Africa.','The Sahel lies along my southern edge.']],
 ['The Himalayas',['I am the highest mountain range on Earth.','Mount Everest is part of me.','I separate South Asia from the Tibetan Plateau.']],
 ['The Panama Canal',['I connect two oceans.','Ships use me to avoid sailing around South America.','I opened in 1914.']],
 ['Australia',['I am both a country and a continent.','My dry interior is called the Outback.','The Great Barrier Reef is off my coast.']],
 ['Russia',['I am the largest country by area.','I stretch across 11 time zones.','The Ural Mountains cross me.']],
 ['The Alps',['I am a mountain range in central Europe.','Switzerland and Austria are in my peaks.','I am famous for skiing.']],
];
if(typeof WORD_BANK!=='undefined'){WORD_BANK[7]=WORD_BANK[7]||WORD_BANK[6];WORD_BANK[8]=WORD_BANK[8]||WORD_BANK[6];}

// grade-aware subject titles and descriptions
const SUBJ_GRADE={
  7:{sci:['Life Science','Cells, ecosystems, heredity, and adaptation.'],hist:['Civics & Economics','Government, citizenship, and economic choices.']},
  8:{sci:['Physical Science','Matter, energy, waves, forces, and electricity.'],hist:['World Geography','World regions, people, resources, and trade.']},
  6:{hist:['U.S. History','The United States from 1865 to the present.']},
  4:{hist:['Virginia Studies','Virginia’s geography, people, and history.']}};
function subjTitle(k){const o=(SUBJ_GRADE[gradeContent()]||{})[k];return o?o[0]:(SUBJ[k].card||SUBJ[k].label);}
function subjDesc(k){const o=(SUBJ_GRADE[gradeContent()]||{})[k];return o?o[1]:(CL_DESC[k]||'');}


