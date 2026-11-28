// ═══════════════════════════════════════════════════════════════
// Study guides — Grade 6 Science (2018 Virginia SOL 6.2–6.9).
// Source: VDOE "2018 Virginia Science Standards of Learning Curriculum Framework", Grade Six
// (Central Idea and Essential Knowledge and Practices). Items students are "not responsible
// for" (specific missions, balancing equations, layer altitudes) are left out.
// ═══════════════════════════════════════════════════════════════
function sgAtom(p,n,e,label){ // simple atom: nucleus with protons/neutrons and an electron ring
  let r=`<circle cx="110" cy="80" r="62" fill="none" stroke="#9FB0CC" stroke-width="2" stroke-dasharray="5 4"/>`;
  for(let i=0;i<p+n;i++){const a=i*2.4,rr=6+Math.sqrt(i)*5;r+=`<circle cx="${110+rr*Math.cos(a)}" cy="${80+rr*Math.sin(a)}" r="7" fill="${i<p?'#E4573D':'#9AA5B8'}" stroke="#1B2A4A" stroke-width="1.5"/>`;}
  for(let i=0;i<e;i++){const a=i*2*Math.PI/e-Math.PI/2;r+=`<circle cx="${110+62*Math.cos(a)}" cy="${80+62*Math.sin(a)}" r="6" fill="#2F6FE0" stroke="#1B2A4A" stroke-width="1.5"/>`;}
  r+=`<circle cx="210" cy="40" r="7" fill="#E4573D"/>`+dgText(224,45,`proton (+) × ${p}`,{a:'start',s:12})+`<circle cx="210" cy="70" r="7" fill="#9AA5B8"/>`+dgText(224,75,`neutron × ${n}`,{a:'start',s:12})
   +`<circle cx="210" cy="100" r="6" fill="#2F6FE0"/>`+dgText(224,105,`electron (−) × ${e}`,{a:'start',s:12})+dgText(110,160,label,{s:13});
  return dgSvg(350,170,r,`A model of ${label}: ${p} protons, ${n} neutrons, ${e} electrons`);}
function sgLayers(){const L=[['thermosphere','#E8E0FF'],['mesosphere','#DCE8FF'],['stratosphere (ozone layer)','#D6F0FF'],['troposphere — weather happens here','#E2F6E9']];
  let r='';L.forEach(([n,c],i)=>{r+=`<rect x="10" y="${8+i*34}" width="320" height="32" fill="${c}" stroke="#1B2A4A" stroke-width="1.5"/>`+dgText(170,29+i*34,n,{s:13});});
  r+=`<rect x="10" y="144" width="320" height="14" fill="#8BC34A" stroke="#1B2A4A" stroke-width="1.5"/>`+dgText(170,155,'Earth’s surface',{s:10,c:'#fff'});
  return dgSvg(340,164,r,'Layers of the atmosphere from the ground up: troposphere, stratosphere, mesosphere, thermosphere');}

SG.add('g6_solar',{title:'The solar system',
  goals:['I can name the parts of the solar system.','I can compare inner and outer planets.','I can explain how gravity keeps planets in orbit, and how our ideas changed over time.'],
  words:[['solar system','the sun and everything that orbits it',''],['gravity','a pulling force between objects with mass',''],['orbit','the curved path of one object around another',''],['asteroid','a rocky object orbiting the sun','most are between Mars and Jupiter'],['comet','an icy object that grows a glowing tail near the sun','']],
  pages:[
    {h:'What is in the solar system',p:['The <b>sun</b> is at the center. Around it orbit the planets and their moons, plus <b>asteroids</b>, <b>comets</b>, and <b>meteoroids</b>.','The four <b>inner planets</b> (Mercury, Venus, Earth, Mars) are small and rocky. The four <b>outer planets</b> (Jupiter, Saturn, Uranus, Neptune) are huge gas planets.'],
     dg:()=>sgPlanets(),
     ex:{q:'How are Mars and Saturn different?',steps:['Mars is an inner planet: small and rocky.','Saturn is an outer planet: a huge gas giant.'],a:'Mars is small and rocky; Saturn is a large gas planet.'},
     chk:{q:'Which object is made mostly of ice and dust and grows a tail near the sun?',a:'a comet',w:['an asteroid','a moon','a gas giant'],why:'Comets are icy; the sun’s heat makes them release gas and dust that form a tail.'}},
    {h:'Gravity keeps planets moving',p:['<b>Gravity</b> is a force that pulls objects toward each other. The more <b>mass</b> an object has, the stronger its pull.','The sun has almost all the mass in the solar system, so its gravity holds the planets in their orbits. Planets farther from the sun take longer to orbit it.'],
     ex:{q:'Why do the planets orbit the sun instead of flying off into space?',steps:['The sun has a huge mass.','Its gravity pulls the planets toward it while they move forward.','Together this makes a curved orbit.'],a:'The sun’s gravity keeps pulling them into orbit.'},
     chk:{q:'What does the strength of gravity depend on?',a:'mass',w:['color','temperature','the number of moons'],why:'Objects with more mass pull more strongly.'}},
    {h:'How our ideas changed',p:['Long ago, many people believed Earth was the center (a <b>geocentric</b> model). Better observations — especially with <b>telescopes</b> — and math showed that the planets orbit the <b>sun</b> (a <b>heliocentric</b> model).','Science changes when new evidence is found.'],
     ex:{q:'What tool helped scientists see evidence for the sun-centered model?',steps:['It made faraway objects look closer, showing details like moons orbiting Jupiter.'],a:'the telescope'},
     chk:{q:'In a heliocentric model, what is at the center?',a:'the sun',w:['Earth','the moon','Jupiter'],why:'“Helio” means sun.'}}],
  watch:[['Thinking gravity only exists on Earth.','Every object with mass has gravity; the sun’s is strongest in the solar system.'],['Thinking all planets are rocky.','Only the inner four are rocky; the outer four are gas giants.']],
  tips:['Scale models are common: the sun is enormous compared with the planets, and the distances are huge.'],
  sum:['Sun + planets + moons + asteroids + comets.','Inner: small, rocky. Outer: huge, gas.','Gravity depends on mass and keeps orbits.','Telescopes and math led to the sun-centered model.']});

SG.add('g6_esm',{title:'Earth, sun, and moon',
  goals:['I can describe what makes Earth able to support life.','I can explain day and night, seasons, and moon phases.','I can explain what causes tides.'],
  words:[['rotation','spinning on an axis — one day',''],['revolution','one orbit around the sun — one year',''],['axial tilt','the lean of Earth’s axis (about 23.5°)',''],['tide','the rise and fall of the ocean caused mainly by the moon’s gravity','']],
  pages:[
    {h:'Earth is just right for life',p:['Earth is rocky, with liquid water in oceans, polar ice caps, and an atmosphere of mostly <b>nitrogen and oxygen</b>.','Earth’s <b>magnetic field</b> shields it from harmful solar radiation. Earth is about 4.5 billion years old.'],
     ex:{q:'Name two features that help life survive on Earth.',steps:['Liquid water for living things.','An atmosphere with oxygen, and a magnetic field for protection.'],a:'liquid water and a protective atmosphere (also the magnetic field)'},
     chk:{q:'What protects Earth from much of the sun’s harmful radiation?',a:'its magnetic field and atmosphere',w:['the moon','its oceans only','its rotation'],why:'Earth’s magnetic field and atmosphere shield the surface.'}},
    {h:'Day, night, and seasons',p:['Earth <b>rotates</b> once a day, so each place turns toward the sun (day) and away (night).','Seasons come from Earth’s <b>tilt</b> as it revolves. When a hemisphere tilts toward the sun, sunlight hits it more directly and for more hours — summer.'],
     ex:{q:'When it is summer in Virginia, what season is it in Australia?',steps:['Virginia is in the Northern Hemisphere, tilted toward the sun.','Australia is in the Southern Hemisphere, tilted away.'],a:'winter'},
     chk:{q:'Why is summer warmer than winter?',a:'Sunlight hits more directly and for more hours each day.',w:['Earth is much closer to the sun.','The sun burns hotter in summer.','The moon blocks less light.'],why:'Tilt changes the angle and length of daylight, not the distance.'}},
    {h:'Moon phases and tides',p:['The moon reflects sunlight. As it orbits Earth about once a month, we see different amounts of its lit half — the <b>phases</b>.','<b>Tides</b> are caused mainly by the moon’s gravity pulling on Earth’s oceans (the sun helps too). Most coasts have two high tides and two low tides a day.'],
     ex:{q:'What mainly causes tides?',steps:['The moon is close to Earth.','Its gravity pulls on the ocean water, making it bulge.'],a:'the moon’s gravity'},
     chk:{q:'Why do we see moon phases?',a:'We see different amounts of the moon’s sunlit half as it orbits Earth.',w:['Earth’s shadow covers part of the moon each night.','The moon changes shape.','Clouds block part of the moon.'],why:'Half the moon is always lit; our view of that half changes as it orbits.'}}],
  watch:[['Saying seasons come from Earth being closer to the sun.','They come from the tilt.'],['Saying Earth’s shadow causes the phases.','That causes eclipses, not phases.']],
  tips:['Expect diagrams of the sun, Earth, and moon in different positions.'],
  sum:['Rotation → day and night.','Tilt + revolution → seasons.','Phases: our view of the lit half.','Tides: mainly the moon’s gravity.']});

SG.add('g6_energy',{title:'Energy from the sun',
  goals:['I can explain that the sun is the source of most energy on Earth.','I can describe radiation, conduction, and convection.','I can describe energy transformations and Earth’s energy budget.'],
  words:[['radiation','energy moving as waves, even through space','sunlight'],['conduction','heat moving through direct contact','a hot pan handle'],['convection','heat moving as warm fluid rises and cool fluid sinks','boiling water, wind'],['energy transformation','energy changing from one form to another','light → electrical'],['greenhouse effect','gases trapping heat near Earth’s surface','']],
  pages:[
    {h:'The sun powers Earth',p:['Solar radiation includes infrared, visible light, and ultraviolet.','Most energy sources trace back to the sun: plants store it by photosynthesis; coal, oil, and natural gas formed from ancient living things; the sun heats air to make wind.'],
     ex:{q:'How does energy in coal come from the sun?',steps:['Ancient plants captured sunlight by photosynthesis.','Their remains were buried and changed into coal over millions of years.'],a:'Coal stores chemical energy from ancient plants that used sunlight.'},
     chk:{q:'Which energy source does NOT come from the sun?',a:'none of these — they all trace back to the sun',w:['wind','coal','food from plants'],why:'Wind comes from the sun heating air; coal and food store sunlight captured by plants.'}},
    {h:'How heat moves',p:['<b>Radiation</b>: energy travels as waves — the sun warms Earth across empty space.','<b>Conduction</b>: heat moves by touch — a metal spoon gets hot in soup.','<b>Convection</b>: warm, less dense fluid rises and cool, denser fluid sinks, making a loop — like in boiling water or moving air.'],
     ex:{q:'Warm air rises over a sunny beach and cooler air from the ocean moves in. Which kind of heat transfer is this?',steps:['Air is a fluid.','Warm air rises, cool air sinks and moves in.'],a:'convection'},
     chk:{q:'You touch a metal slide on a sunny day and it burns your hand. How did the heat reach your hand?',a:'conduction',w:['convection','radiation','reflection'],why:'Heat moved by direct contact between the slide and your hand.'}},
    {h:'Transformations and the energy budget',p:['Energy changes form: solar panels turn radiant energy into electrical; a power plant turns the chemical energy in coal into thermal, then mechanical, then electrical energy.','Earth’s <b>energy budget</b> compares energy coming in from the sun with energy leaving. Extra carbon dioxide traps more heat — the <b>greenhouse effect</b>.'],
     ex:{q:'Name the energy changes in a solar-powered calculator.',steps:['Sunlight (radiant energy) hits the solar cell.','It becomes electrical energy that runs the calculator.'],a:'radiant → electrical'},
     chk:{q:'What happens when extra carbon dioxide is in the atmosphere?',a:'More heat is trapped near Earth’s surface.',w:['Less sunlight reaches Earth.','Earth stops rotating.','The ozone layer gets thicker.'],why:'Carbon dioxide is a greenhouse gas that traps heat.'}}],
  watch:[['Mixing up conduction and convection.','Conduction = touching. Convection = fluid moving in loops.'],['Thinking energy is used up or destroyed.','Energy changes form; it is not destroyed.']],
  tips:['You may need to trace energy changes in a diagram, like coal → electricity.'],
  sum:['The sun is the source of most energy on Earth.','Radiation (waves), conduction (touch), convection (fluid loops).','Energy transforms from one form to another.','Extra CO₂ traps heat (greenhouse effect).']});

SG.add('g6_atoms',{title:'Atoms, elements, and compounds',
  goals:['I can describe protons, neutrons, and electrons.','I can explain what makes elements different and read chemical symbols.','I can read chemical formulas and explain that atoms are conserved.'],
  words:[['atom','the basic building block of all matter',''],['proton','positive particle in the nucleus',''],['neutron','particle with no charge in the nucleus',''],['electron','negative particle outside the nucleus',''],['element','a substance made of only one kind of atom','oxygen (O)'],['compound','two or more elements bonded together','water (H₂O)']],
  pages:[
    {h:'Inside an atom',p:['Atoms are made of three particles. <b>Protons</b> (+) and <b>neutrons</b> (no charge) are packed in the center, the <b>nucleus</b>. <b>Electrons</b> (−) move around the nucleus.','The number of <b>protons</b> decides which element an atom is. Every carbon atom has 6 protons; every oxygen atom has 8.'],
     dg:()=>sgAtom(6,6,6,'a carbon atom'),
     ex:{q:'An atom has 8 protons. Which element is it?',steps:['The number of protons identifies the element.','Every oxygen atom has 8 protons.'],a:'oxygen'},
     chk:{q:'Which particle has a negative charge?',a:'electron',w:['proton','neutron','nucleus'],why:'Electrons are negative; protons are positive; neutrons have no charge.'}},
    {h:'Elements and their symbols',p:['An <b>element</b> is made of only one kind of atom. Each has a <b>chemical symbol</b>: H (hydrogen), O (oxygen), C (carbon), N (nitrogen), Na (sodium), Cl (chlorine), Fe (iron).','A handful of elements make up most of Earth: oxygen and silicon in the crust; nitrogen and oxygen in air; hydrogen and oxygen in water; carbon, hydrogen, oxygen, and nitrogen in living things.'],
     ex:{q:'What is the chemical symbol for iron?',steps:['Some symbols come from Latin names: iron is “ferrum”.'],a:'Fe'},
     chk:{q:'Which gas makes up most of the air?',a:'nitrogen',w:['oxygen','carbon dioxide','hydrogen'],why:'About 78% of air is nitrogen; about 21% is oxygen.'}},
    {h:'Compounds, formulas, and equations',p:['Atoms join with <b>bonds</b> (made by electrons) to form <b>compounds</b>.','A <b>chemical formula</b> shows the atoms: H₂O has 2 hydrogen atoms and 1 oxygen atom (the small number, a <b>subscript</b>, counts the atom in front of it). CO₂ has 1 carbon and 2 oxygen.','A chemical equation shows a chemical change. Atoms are not created or destroyed — they are rearranged.'],
     ex:{q:'How many atoms are in one molecule of CO₂?',steps:['C has no subscript → 1 carbon.','O₂ → 2 oxygen.','1 + 2 = 3.'],a:'3 atoms (1 carbon, 2 oxygen)'},
     chk:{q:'How many hydrogen atoms are in C₆H₁₂O₆ (sugar)?',a:'12',w:['6','24','1'],why:'The subscript after H is 12.'}}],
  watch:[['Thinking electrons decide the element.','The number of protons decides the element.'],['Reading the subscript as belonging to the next atom.','A subscript counts the atom right before it: H₂O has 2 H.'],['Thinking atoms disappear in a chemical change.','They are rearranged; the same atoms are there before and after.']],
  tips:['You may compare models of two atoms or count atoms in a formula.'],
  sum:['Protons (+) and neutrons in the nucleus; electrons (−) outside.','Protons decide the element.','Formulas use subscripts to count atoms.','Atoms are conserved in chemical changes.']});

SG.add('g6_water',{title:'The properties of water',
  goals:['I can explain why water is called the universal solvent.','I can describe cohesion, adhesion, surface tension, and why ice floats.','I can explain how water changes state, weathers rock, and moderates climate.'],
  words:[['solvent','a substance that dissolves other substances','water dissolves salt and sugar'],['cohesion','water molecules sticking to each other',''],['adhesion','water sticking to other materials',''],['surface tension','the “skin” on water made by cohesion',''],['weathering','breaking rock into smaller pieces','']],
  pages:[
    {h:'Special properties of water',p:['Water dissolves more substances than any other liquid — it is called the <b>universal solvent</b>.','<b>Cohesion</b>: water sticks to itself, making drops and <b>surface tension</b> (why some insects can walk on water). <b>Adhesion</b>: water sticks to other things, like a glass.','Ice is <b>less dense</b> than liquid water, so ice floats. Lakes freeze from the top down, protecting the life below.'],
     ex:{q:'Why does ice float on a lake?',steps:['When water freezes, its molecules spread into an open pattern.','So ice is less dense than liquid water.'],a:'Ice is less dense than liquid water.'},
     chk:{q:'A water strider walks on a pond. Which property makes this possible?',a:'surface tension',w:['adhesion to rocks','evaporation','weathering'],why:'Cohesion creates surface tension, a thin “skin” that can hold up light insects.'}},
    {h:'Changing states',p:['Water is the only common substance found naturally on Earth as a <b>solid, liquid, and gas</b>.','Adding thermal energy melts ice and evaporates water. Removing it makes vapor condense and water freeze.','Water can absorb a lot of heat while its temperature changes only a little.'],
     ex:{q:'Puddles disappear on a sunny afternoon. What happened?',steps:['The sun added thermal energy.','The liquid water became water vapor.'],a:'evaporation'},
     chk:{q:'Which change needs thermal energy to be ADDED?',a:'melting ice',w:['freezing water','condensing vapor into dew','making ice cubes'],why:'Melting needs heat added; freezing and condensing release heat.'}},
    {h:'Weathering, climate, and people',p:['Water breaks down rock: in <b>physical weathering</b>, water freezes in cracks and expands, splitting the rock. In <b>chemical weathering</b>, water dissolves or changes minerals.','Large bodies of water <b>moderate climate</b>: places near the ocean or Chesapeake Bay have milder winters than places far inland.','About 97% of Earth’s water is salt water. We need fresh water for drinking, farming, power plants, and public health.'],
     ex:{q:'Why are winters usually milder in Virginia Beach than in the mountains?',steps:['The ocean stores lots of heat.','It slowly releases the heat in winter.'],a:'The nearby ocean moderates the temperature.'},
     chk:{q:'About how much of Earth’s water is salt water?',a:'about 97%',w:['about 50%','about 3%','about 75%'],why:'About 97% is salty ocean water; only a small part is fresh water.'}}],
  watch:[['Thinking ice sinks because it is solid.','Ice is less dense than liquid water, so it floats.'],['Mixing up cohesion and adhesion.','Cohesion = water to water. Adhesion = water to other things.']],
  tips:['You may analyze winter temperatures in different Virginia regions and explain the pattern.'],
  sum:['Water is the universal solvent.','Cohesion, adhesion, surface tension; ice floats.','Heat in: melt and evaporate. Heat out: condense and freeze.','Water weathers rock and moderates climate.']});

SG.add('g6_atmo',{title:'The atmosphere and weather',
  goals:['I can describe what air is made of and the layers of the atmosphere.','I can explain how air pressure and temperature change with altitude.','I can use air pressure, fronts, and weather maps to predict weather.'],
  words:[['atmosphere','the layer of gases around Earth',''],['troposphere','the lowest layer, where weather happens',''],['ozone','a gas in the stratosphere that blocks ultraviolet rays',''],['air pressure','the weight of air pushing on a surface','measured with a barometer'],['humidity','the amount of water vapor in the air',''],['front','the boundary between two air masses','']],
  pages:[
    {h:'Air and the layers above us',p:['Air is a mixture: mostly <b>nitrogen</b> (about 78%) and <b>oxygen</b> (about 21%), with small amounts of argon, carbon dioxide, and water vapor.','From the ground up: <b>troposphere</b> (all our weather), <b>stratosphere</b> (the <b>ozone</b> layer that blocks ultraviolet rays), <b>mesosphere</b>, <b>thermosphere</b>.'],
     dg:()=>sgLayers(),
     ex:{q:'A storm cloud forms. Which layer is it in?',steps:['Almost all weather happens in the lowest layer.'],a:'the troposphere'},
     chk:{q:'Which layer contains the ozone that protects us from ultraviolet rays?',a:'stratosphere',w:['troposphere','mesosphere','thermosphere'],why:'The ozone layer is in the stratosphere.'}},
    {h:'Air pressure and altitude',p:['Air pressure is the weight of the air above you. The higher you go, the less air is above you, so <b>air pressure decreases with altitude</b>.','That is why your ears “pop” on a mountain or in a plane. Air is also thinner up high.'],
     ex:{q:'Is air pressure higher at the beach or on top of a mountain?',steps:['At the beach, more air is stacked above you.'],a:'at the beach'},
     chk:{q:'What happens to air pressure as you climb a mountain?',a:'It decreases.',w:['It increases.','It stays the same.','It becomes zero.'],why:'There is less air above you, so it pushes down less.'}},
    {h:'Predicting weather',p:['The sun heats Earth unevenly. Air moves from <b>high pressure</b> to <b>low pressure</b> — that is wind. High pressure usually means clear weather; low pressure means clouds and storms.','A <b>cold front</b> (cold air pushing under warm air) often brings thunderstorms and then cooler weather. A <b>warm front</b> often brings long, steady rain.','Meteorologists use temperature, pressure, humidity, and weather maps to forecast.'],
     ex:{q:'A cold front is moving toward your town. What weather should you expect?',steps:['Cold air pushes warm, moist air up quickly.','That makes tall clouds and storms, then cooler air.'],a:'storms, then cooler temperatures'},
     chk:{q:'Which way does wind blow?',a:'from high pressure toward low pressure',w:['from low pressure toward high pressure','only from north to south','only upward'],why:'Air moves from where pressure is high to where it is low.'}}],
  watch:[['Thinking oxygen is most of the air.','Nitrogen is about 78%; oxygen about 21%.'],['Thinking air pressure increases as you go up.','It decreases with altitude.'],['Mixing up warm and cold fronts.','Cold front: quick storms. Warm front: long, steady rain.']],
  tips:['You will likely read a weather map with fronts and pressure symbols (H and L).'],
  sum:['Air: about 78% nitrogen, 21% oxygen.','Troposphere (weather), stratosphere (ozone), mesosphere, thermosphere.','Air pressure drops with altitude.','Wind: high → low pressure; fronts change the weather.']});

SG.add('g6_bay',{title:'Watersheds and the Chesapeake Bay',
  goals:['I can explain what a watershed is and how ridgelines divide watersheds.','I can describe the Chesapeake Bay as an estuary.','I can use water-quality indicators to judge the health of a watershed.'],
  words:[['watershed','all the land that drains into a body of water',''],['ridgeline','high land that separates watersheds',''],['estuary','where fresh river water mixes with salty ocean water','the Chesapeake Bay'],['wetland','land covered by shallow water some or all of the time',''],['turbidity','how cloudy the water is','']],
  pages:[
    {h:'Watersheds and ridgelines',p:['A <b>watershed</b> is all the land that drains into a body of water. <b>Ridgelines</b> — high ground — separate one watershed from the next.','Virginia’s watersheds drain to the <b>Chesapeake Bay</b>, the <b>North Carolina sounds</b>, or the <b>Gulf of Mexico</b>. Everything on the land — soil, fertilizer, trash — can wash into the water.'],
     ex:{q:'Rain falls on the west side of a ridge. Which watershed does it join?',steps:['Ridgelines divide watersheds.','Water flows downhill on whichever side it lands.'],a:'the watershed on the west side of the ridge'},
     chk:{q:'What separates one watershed from another?',a:'a ridgeline (high ground)',w:['a road','a state line','a bridge'],why:'Water flows downhill away from high ridges into different watersheds.'}},
    {h:'The Chesapeake Bay estuary',p:['An <b>estuary</b> is where fresh water from rivers mixes with salt water from the ocean. The Chesapeake Bay is the largest estuary in the United States.','Estuaries are <b>nurseries</b> for many fish, crabs, and birds. <b>Wetlands</b> filter sediment and pollution, store floodwater, and provide habitat.'],
     ex:{q:'Why is the water in the Bay saltier near the ocean than near the rivers?',steps:['Salt water enters from the Atlantic Ocean at the mouth.','Fresh water enters from rivers at the top.'],a:'Salt water comes in from the ocean and mixes with fresh river water.'},
     chk:{q:'How do wetlands help a watershed?',a:'They filter pollution and store floodwater.',w:['They make water saltier.','They speed up erosion.','They block all fish.'],why:'Wetlands act like natural filters and sponges.'}},
    {h:'Is the water healthy?',p:['Scientists test water-quality indicators: <b>pH</b>, <b>temperature</b>, <b>salinity</b>, <b>dissolved oxygen</b>, <b>turbidity</b> (cloudiness), and <b>macroinvertebrates</b> (small animals like insect larvae).','Too much fertilizer can feed algae blooms. When the algae die and decay, they use up dissolved oxygen, and fish and crabs can suffocate.'],
     ex:{q:'A stream has many mayfly and stonefly larvae. What does that tell you?',steps:['These macroinvertebrates need clean, oxygen-rich water.'],a:'The stream is probably healthy.'},
     chk:{q:'Why can extra fertilizer harm the Bay?',a:'It causes algae blooms that use up dissolved oxygen.',w:['It makes the water too cold.','It adds too much salt.','It stops the tides.'],why:'Decaying algae use up oxygen that fish and crabs need.'}}],
  watch:[['Thinking only people living on the water affect the Bay.','Everyone in the watershed affects it — water drains from all that land.'],['Thinking cloudy (turbid) water is healthy.','High turbidity blocks sunlight and often means sediment pollution.']],
  tips:['You may read water-quality data and decide whether a stream is healthy.'],
  sum:['A watershed drains to one body of water; ridgelines divide them.','The Chesapeake Bay is an estuary: fresh + salt water.','Wetlands filter and store water.','Test pH, temperature, salinity, oxygen, turbidity, and macroinvertebrates.']});

SG.add('g6_resource',{title:'Natural resources and people',
  goals:['I can tell renewable from nonrenewable resources.','I can compare energy sources and their effects on health and safety.','I can explain how conservation and policies protect resources.'],
  words:[['renewable resource','a resource that is replaced naturally in a short time','sunlight, wind, water'],['nonrenewable resource','a resource that takes millions of years to form','coal, oil, natural gas'],['fossil fuel','fuel formed from ancient living things','coal, oil, natural gas'],['conservation','using resources carefully so they last',''],['stewardship','taking responsibility for caring for the environment','']],
  pages:[
    {h:'Renewable or nonrenewable?',p:['<b>Renewable</b> resources are replaced naturally: sunlight, wind, moving water, and trees (if replanted).','<b>Nonrenewable</b> resources take millions of years to form, so they can run out: coal, oil, and natural gas (fossil fuels).'],
     ex:{q:'Is natural gas renewable or nonrenewable?',steps:['It formed from ancient living things over millions of years.','We use it much faster than it forms.'],a:'nonrenewable'},
     chk:{q:'Which is a renewable resource?',a:'wind',w:['coal','oil','natural gas'],why:'Wind is replaced naturally all the time.'}},
    {h:'Energy choices have trade-offs',p:['Fossil fuels are the main energy source in industrialized countries. They are reliable, but burning them pollutes the air and adds carbon dioxide.','Solar and wind power make little air pollution, but they depend on weather and need land and materials. Every choice has <b>costs and benefits</b>.','Clean air and clean water protect people’s health and safety.'],
     ex:{q:'Give one benefit and one cost of a coal power plant.',steps:['Benefit: steady, reliable electricity.','Cost: air pollution and carbon dioxide.'],a:'reliable power vs. pollution'},
     chk:{q:'Which is a benefit of solar power?',a:'It produces almost no air pollution while running.',w:['It works the same at night.','It never needs any land.','It is a fossil fuel.'],why:'Solar panels make electricity without burning fuel.'}},
    {h:'Protecting resources',p:['<b>Preventing</b> pollution usually costs less than cleaning it up later.','Laws and rules, rewards (incentives), and each person’s choices — reduce, reuse, recycle, save energy and water — all help.','Communities weigh costs and benefits when they make rules about land, water, and energy.'],
     ex:{q:'Name two things a family can do to conserve resources.',steps:['Turn off lights and electronics not in use.','Fix leaks and take shorter showers; recycle.'],a:'save energy and water (and recycle)'},
     chk:{q:'Why is preventing pollution usually better than cleaning it up?',a:'It usually costs less and avoids harm.',w:['Cleanup is always free.','Pollution never causes harm.','Prevention is against the law.'],why:'Stopping pollution before it happens is cheaper and protects health.'}}],
  watch:[['Calling trees nonrenewable.','Trees are renewable if they are replanted and managed.'],['Thinking renewable energy has no downsides.','Every energy source has costs and benefits.']],
  tips:['You may compare energy sources in a table and pick the best choice for a situation.'],
  sum:['Renewable: sun, wind, water, managed trees.','Nonrenewable: coal, oil, natural gas.','Every energy choice has costs and benefits.','Prevention and stewardship protect resources.']});

['g6_solar','g6_esm','g6_energy','g6_atoms','g6_water','g6_atmo','g6_bay','g6_resource'].forEach(g=>{SG_SPRITE[g]='sg_g6sci';});
