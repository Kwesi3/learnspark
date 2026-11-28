// ═══════════════════════════════════════════════════════════════
// Study guides — Grade 4 Science (2018 Virginia SOL 4.2–4.8).
// Source: VDOE "2018 Virginia Science Standards of Learning Curriculum Framework", Grade 4
// (Central Idea and Essential Knowledge and Practices). Items the framework says students
// are "not responsible for" are left out.
// ═══════════════════════════════════════════════════════════════
function sgChain(items){ // a food chain: items joined by arrows that point to the eater
  const w=Math.max(70,Math.max(...items.map(t=>t.length))*8.5+18);let r='';
  items.forEach((t,i)=>{const x=8+i*(w+22);r+=`<rect x="${x}" y="20" width="${w}" height="40" rx="10" fill="#EAF6EE" stroke="#1B2A4A" stroke-width="2"/>`+dgText(x+w/2,45,t,{s:13});
    if(i<items.length-1)r+=`<path d="M${x+w+3} 40 h15 m-6 -5 l6 5 l-6 5" fill="none" stroke="#1B2A4A" stroke-width="2.5"/>`;});
  return dgSvg(8+items.length*(w+22),74,r,'Food chain: '+items.join(' to '));}
function sgPlanets(){const P=[['Mercury',5,'#A8A29E'],['Venus',8,'#E7C27D'],['Earth',8,'#4C8DF6'],['Mars',6,'#E4573D'],['Jupiter',22,'#D6A77A'],['Saturn',19,'#E8D29A'],['Uranus',13,'#9AD9E5'],['Neptune',13,'#4466E0']];
  let x=40,r=`<circle cx="-30" cy="70" r="58" fill="#FFC83D"/>`+dgText(8,80,'Sun',{s:13,a:'start'});
  P.forEach(([n,rad,c],i)=>{x+=Math.max(rad+(i?P[i-1][1]:0)+10,46);
    r+=`<circle cx="${x}" cy="70" r="${rad}" fill="${c}" stroke="#1B2A4A" stroke-width="1.5"/>`;
    if(n==='Saturn')r+=`<ellipse cx="${x}" cy="70" rx="${rad+9}" ry="5" fill="none" stroke="#8A6A00" stroke-width="2"/>`;
    r+=dgText(x,i%2?118:30,n,{s:12});});
  return dgSvg(x+40,132,r,'The eight planets in order from the sun');}

SG.add('g4_plants',{title:'How plants and animals survive',
  goals:['I can explain how plants make food by photosynthesis.','I can name what roots, stems, leaves, and flowers do.','I can compare how plants and animals get energy and make offspring.'],
  words:[['photosynthesis','how green plants use sunlight, water, and carbon dioxide to make sugar','oxygen is released'],['chlorophyll','the green substance in leaves that traps sunlight',''],['pollination','moving pollen from the stamen to the pistil','by wind, water, or animals'],['producer','a living thing that makes its own food','plants'],['consumer','a living thing that eats other living things','animals']],
  pages:[
    {h:'Photosynthesis: plants make their own food',p:['Green plants use <b>sunlight</b>, <b>water</b>, and <b>carbon dioxide</b> to make <b>sugar</b> (food). <b>Chlorophyll</b> in the leaves traps the sun’s energy.','The plant gives off <b>oxygen</b> — the oxygen that animals and people breathe.','Photosynthesis traps energy from the sun and turns it into food that other living things can use. Without it, almost no living thing could survive.'],
     ex:{q:'What does a plant need for photosynthesis, and what does it make?',steps:['Needs: sunlight, water, and carbon dioxide (and chlorophyll to trap the light).','Makes: sugar for food.','Gives off: oxygen.'],a:'Sunlight + water + carbon dioxide → sugar + oxygen'},
     chk:{q:'Which gas do plants RELEASE during photosynthesis?',a:'oxygen',w:['carbon dioxide','nitrogen','water vapor only'],why:'Plants take in carbon dioxide and give off oxygen.'}},
    {h:'Plant parts and their jobs',p:['<b>Roots</b> hold the plant in the soil and take in water and nutrients.','<b>Stems</b> hold the plant up and carry water and nutrients.','<b>Leaves</b> are where most photosynthesis happens.','<b>Flowers</b> make seeds. Pollen moves from the stamen to the pistil by wind, water, or animals like bees. Bright colors and sweet smells attract pollinators.'],
     ex:{q:'A bee visits a bright yellow flower. How does this help the plant?',steps:['The color and smell attract the bee.','Pollen sticks to the bee and is carried to another flower’s pistil.','Pollination lets the flower make seeds.'],a:'The bee helps pollinate the flower so it can make seeds.'},
     chk:{q:'Which plant part is the MAIN place where food is made?',a:'leaves',w:['roots','stems','flowers'],why:'Leaves are the main sites of photosynthesis.'}},
    {h:'How animals get energy and survive',p:['Animals cannot make their own food. They are <b>consumers</b>: they eat plants or other animals.','Animals have body parts that help them eat, grow, and stay safe — like a bird’s beak shaped for its food, or a turtle’s shell.','A population must make offspring (babies or seeds) to keep going.'],
     ex:{q:'How is getting energy different for a sunflower and a rabbit?',steps:['The sunflower makes sugar by photosynthesis.','The rabbit must eat plants to get energy.'],a:'Plants make food; animals must eat food.'},
     chk:{q:'Why must a population of animals reproduce?',a:'so the population does not die out',w:['so they can do photosynthesis','so they grow roots','so they stop needing food'],why:'A population must be able to make offspring to survive over time.'}}],
  watch:[['Saying plants get their food from the soil.','Plants MAKE their food (sugar) by photosynthesis; roots take in water and nutrients.'],['Mixing up the gases.','Plants take in carbon dioxide and release oxygen.'],['Thinking only bees pollinate.','Wind, water, and many animals can move pollen.']],
  tips:['You may see a diagram of a plant and need to match each part to its job.'],
  sum:['Photosynthesis: sunlight + water + carbon dioxide → sugar + oxygen.','Roots: anchor and absorb. Stems: support and carry. Leaves: make food. Flowers: make seeds.','Animals are consumers.','Populations must reproduce to survive.']});

SG.add('g4_eco',{title:'Ecosystems and food webs',
  goals:['I can describe populations, communities, and ecosystems.','I can read a food web and follow the energy.','I can explain habitat and niche, and use a dichotomous key.'],
  words:[['ecosystem','living and nonliving things interacting in an area',''],['population','all of one kind of organism in one place at one time','all the deer in a forest'],['community','all the populations living together in one place',''],['decomposer','breaks down dead things and returns nutrients to the soil','fungi, bacteria'],['habitat','where an organism lives and finds food, water, shelter, and space',''],['niche','an organism’s role: what it eats and how it interacts','']],
  pages:[
    {h:'Populations, communities, ecosystems',p:['A <b>population</b> is all of one kind of living thing in one place (all the frogs in a pond).','A <b>community</b> is all the populations in that place (frogs, fish, ducks, cattails…).','An <b>ecosystem</b> is the community PLUS the nonliving things: sunlight, water, soil, air, and nutrients.'],
     ex:{q:'Is “all the bluegill fish in Lake Anna” a population or a community?',steps:['It is only one kind of organism.'],a:'a population'},
     chk:{q:'Which is a NONLIVING part of an ecosystem?',a:'sunlight',w:['a mushroom','a hawk','grass'],why:'Sunlight, water, soil, and air are nonliving factors.'}},
    {h:'Food chains and food webs',p:['Energy starts with the <b>sun</b>. <b>Producers</b> (plants and algae) capture it. <b>Consumers</b> eat other organisms. <b>Decomposers</b> break down dead things and return nutrients to the soil.','The arrows in a food chain point <b>to the eater</b> — they show where the energy goes.','A food web is many food chains that overlap. If one population changes, others change too.'],
     dg:()=>sgChain(['grass','grasshopper','frog','snake','hawk']),
     ex:{q:'In the chain grass → grasshopper → frog → snake → hawk, what happens if the frogs disappear?',steps:['Snakes lose food, so the snake population may go down.','Grasshoppers lose a predator, so there may be more grasshoppers.','More grasshoppers may eat more grass.'],a:'Snakes decrease; grasshoppers increase.'},
     chk:{q:'In a food chain, which way do the arrows point?',a:'toward the organism that does the eating',w:['toward the organism being eaten','toward the sun','toward the decomposers only'],why:'Arrows show the flow of energy, so they point to the eater.'}},
    {h:'Habitat, niche, and classifying',p:['A <b>habitat</b> is where an organism lives. A <b>niche</b> is its job: what it eats and how it interacts. No two kinds of organisms have exactly the same niche in a community.','A niche can change during a life cycle: a <b>tadpole</b> lives in water, breathes with gills, and eats plants; an adult <b>frog</b> lives mostly on land, breathes with lungs, and eats insects.','A <b>dichotomous key</b> sorts living things with pairs of choices about how they look.'],
     ex:{q:'A key says: 1a. Has 6 legs → go to 2. 1b. Has 8 legs → spider. 2a. Has wings → fly. 2b. No wings → ant. What is a 6-legged animal with no wings?',steps:['6 legs → go to step 2.','No wings → 2b.'],a:'ant'},
     chk:{q:'How does a frog’s niche change from tadpole to adult?',a:'It moves from eating plants in water to eating insects mostly on land.',w:['It stays exactly the same.','It changes from land to water.','It stops needing food.'],why:'Tadpoles are water-living plant eaters with gills; adult frogs are land-living insect eaters with lungs.'}}],
  watch:[['Drawing food-chain arrows from the eater to the food.','Arrows point to the eater: grass → rabbit.'],['Mixing up population and community.','Population = one kind. Community = all the kinds.'],['Thinking habitat and niche mean the same thing.','Habitat = address (where). Niche = job (role).']],
  tips:['You may need to predict what happens to a food web when one population changes.'],
  sum:['Population → community → ecosystem.','Energy: sun → producers → consumers → decomposers.','Arrows point to the eater.','Habitat = where; niche = role.']});

SG.add('g4_weather',{title:'Weather and climate',
  goals:['I can use weather instruments and records to predict weather.','I can identify cumulus, stratus, cirrus, and cumulonimbus clouds.','I can describe extreme weather and how climate is different from weather.'],
  words:[['weather','the day-to-day state of the air',''],['climate','the weather pattern averaged over at least 30 years',''],['meteorologist','a scientist who studies and forecasts weather',''],['air pressure','the weight of the air pushing down','measured with a barometer'],['precipitation','water falling from clouds','rain, snow, sleet, hail']],
  pages:[
    {h:'Measuring the weather',p:['The sun’s heat moves the air and makes weather. Meteorologists measure temperature, air pressure, wind speed, precipitation, and cloudiness to make forecasts.','Tools: <b>thermometer</b> (temperature), <b>barometer</b> (air pressure), <b>rain gauge</b> (rainfall), <b>anemometer</b> (wind speed).','<b>High pressure</b> usually brings clear skies and light winds. <b>Low pressure</b> brings stormy weather and strong winds.'],
     ex:{q:'The barometer shows air pressure dropping fast. What weather is likely?',steps:['Falling pressure → low pressure is coming.','Low pressure brings stormy weather.'],a:'Stormy weather is likely.'},
     chk:{q:'Which tool measures wind speed?',a:'anemometer',w:['barometer','rain gauge','thermometer'],why:'An anemometer has spinning cups that measure how fast the wind blows.'}},
    {h:'Clouds tell a story',p:['<b>Cumulus</b>: white, fluffy, flat bottoms — usually fair weather.','<b>Cumulonimbus</b>: tall, dark-bottomed cumulus clouds — thunderstorms.','<b>Stratus</b>: smooth gray sheet covering the sky — drizzle or light rain.','<b>Cirrus</b>: thin and feathery, high up — fair now, but rain or snow may come within several hours.'],
     ex:{q:'The sky is covered by a flat gray layer and it is drizzling. What clouds are these?',steps:['Flat, gray, covering the whole sky.','Light rain or drizzle.'],a:'stratus clouds'},
     chk:{q:'Which clouds can bring thunderstorms?',a:'cumulonimbus',w:['cirrus','stratus','fog'],why:'Cumulonimbus clouds are tall and dark at the bottom and produce thunderstorms.'}},
    {h:'Extreme weather and climate',p:['<b>Thunderstorms</b> form in warm, humid air and bring short, heavy rain. Lightning always comes before thunder.','<b>Hurricanes</b> form over warm ocean water and have winds of at least 74 miles per hour. Most <b>tornadoes</b> form from thunderstorms when winds change direction and the air spins.','<b>Weather</b> is today. <b>Climate</b> is the pattern averaged over at least 30 years. Climate shapes which plants and animals can live in an ecosystem.'],
     ex:{q:'“Virginia has hot, humid summers and mild winters.” Weather or climate?',steps:['It describes a long-term pattern, not one day.'],a:'climate'},
     chk:{q:'Where do hurricanes form?',a:'over warm ocean water',w:['over cold mountains','in dry deserts','in polar regions'],why:'Hurricanes form over warm tropical ocean water.'}}],
  watch:[['Mixing up weather and climate.','Weather = now. Climate = the 30-year pattern.'],['Thinking cirrus clouds always mean fair weather.','Cirrus can signal rain or snow within several hours.'],['Thinking thunder comes before lightning.','Lightning always comes first.']],
  tips:['You may read a weather data table or graph and make a prediction.'],
  sum:['Thermometer, barometer, rain gauge, anemometer.','High pressure → clear. Low pressure → stormy.','Cumulus fair, cumulonimbus storms, stratus drizzle, cirrus change coming.','Climate = weather averaged over 30+ years.']});

SG.add('g4_space',{title:'Planets and the solar system',
  goals:['I can tell rotation from revolution.','I can name the eight planets in order from the sun.','I can describe each planet and compare the sizes of the sun and planets.'],
  words:[['rotate','spin on an axis','Earth rotates once a day'],['revolve','travel around another object','Earth revolves around the sun once a year'],['orbit','the path of a revolving object',''],['terrestrial planet','a rocky planet','Mercury, Venus, Earth, Mars'],['gas giant','a huge planet with no solid surface','Jupiter, Saturn, Uranus, Neptune']],
  pages:[
    {h:'Rotate and revolve',p:['<b>Rotate</b> = spin. Earth rotates on its axis once every 24 hours, giving us day and night.','<b>Revolve</b> = travel around. Earth revolves around the sun once a year.','Long ago, people thought Earth was the center of everything. Now we know the <b>sun</b> is the center of our solar system.'],
     ex:{q:'What causes day and night?',steps:['Earth spins on its axis.','The side facing the sun has day; the side facing away has night.'],a:'Earth’s rotation'},
     chk:{q:'How long does it take Earth to revolve around the sun once?',a:'about one year',w:['about one day','about one month','about one hour'],why:'One trip around the sun takes about 365 days — one year.'}},
    {h:'The eight planets in order',p:['From the sun: <b>Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</b>. Memory trick: “My Very Educated Mother Just Served Us Nachos.”','The first four are rocky <b>terrestrial</b> planets. The last four are <b>gas giants</b> — and all four gas giants have rings.','Pluto is no longer called a planet because it is small and has an unusual orbit.'],
     dg:()=>sgPlanets(),
     ex:{q:'Which planet is fourth from the sun?',steps:['Mercury (1), Venus (2), Earth (3), Mars (4).'],a:'Mars'},
     chk:{q:'Which group lists only gas giants?',a:'Jupiter, Saturn, Uranus, Neptune',w:['Mercury, Venus, Earth, Mars','Earth, Jupiter, Saturn, Mars','Venus, Saturn, Neptune, Pluto'],why:'The four outer planets are the gas giants.'}},
    {h:'What makes each planet special',p:['<b>Mercury</b>: closest, small, cratered like the moon. <b>Venus</b>: thick clouds trap heat, so it is extremely hot. <b>Earth</b>: liquid water, air, and the right distance for life. <b>Mars</b>: the red planet, with canyons and old riverbeds.','<b>Jupiter</b>: the largest planet, with giant storms. <b>Saturn</b>: famous rings. <b>Uranus</b>: spins on its side. <b>Neptune</b>: very cold and blue.','The <b>sun</b> is a star — far bigger than any planet.'],
     ex:{q:'Why can life exist on Earth but not Venus?',steps:['Venus’s thick clouds trap heat, so it is far too hot.','Earth has liquid water, an atmosphere, and the right distance from the sun.'],a:'Earth has water, air, and a good distance from the sun.'},
     chk:{q:'Which planet is the largest?',a:'Jupiter',w:['Saturn','Earth','Neptune'],why:'Jupiter is the largest planet — about eleven times as wide as Earth.'}}],
  watch:[['Mixing up rotate and revolve.','Rotate = spin (day). Revolve = go around (year).'],['Thinking only Saturn has rings.','All four gas giants have rings; Saturn’s are easiest to see.'],['Calling Pluto a planet.','Pluto is no longer classified as a planet.']],
  tips:['You may need to put the planets in order or match a planet to a description.'],
  sum:['Rotate = spin (day/night). Revolve = orbit (year).','My Very Educated Mother Just Served Us Nachos.','Rocky inner planets; gas giants outside.','The sun is a star at the center.']});

SG.add('g4_esm',{title:'Earth, moon, and sun',
  goals:['I can explain day and night and the seasons.','I can name and explain the four main moon phases.','I can connect moon phases to tides, and compare the Earth, moon, and sun.'],
  words:[['axis','an imaginary line Earth spins around','it is tilted'],['tilt','Earth’s axis leans to one side',''],['moon phase','the shape of the lit part of the moon we can see',''],['tide','the daily rise and fall of the ocean','']],
  pages:[
    {h:'Seasons come from the tilt',p:['Earth’s axis is <b>tilted</b>. As Earth revolves around the sun, sometimes our half leans toward the sun and sometimes away.','When our half leans toward the sun, sunlight hits more <b>directly</b>, so it is warmer: summer. Leaning away gives slanted rays and winter.','Seasons are NOT caused by Earth getting closer to the sun.'],
     ex:{q:'It is summer in Virginia. Which way is the Northern Hemisphere tilted?',steps:['Summer means more direct sunlight.','Direct sunlight happens when our half leans toward the sun.'],a:'toward the sun'},
     chk:{q:'What causes Earth’s seasons?',a:'the tilt of Earth’s axis as it revolves around the sun',w:['Earth getting closer to the sun','the moon blocking the sun','clouds covering the sun'],why:'The tilt changes how directly sunlight hits each part of Earth.'}},
    {h:'Moon phases',p:['The moon makes no light. We see <b>sunlight reflected</b> off it.','As the moon orbits Earth, we see different amounts of its lit side. The four main phases are <b>new moon</b>, <b>first quarter</b>, <b>full moon</b>, and <b>last (third) quarter</b>.','At new moon, the moon is between Earth and the sun, so its lit side faces away from us.'],
     ex:{q:'What do we see at a full moon?',steps:['Earth is between the sun and the moon.','The whole lit side faces Earth.'],a:'the whole face of the moon lit up'},
     chk:{q:'Why does the moon seem to shine?',a:'It reflects light from the sun.',w:['It makes its own light.','It reflects light from Earth’s cities.','It is on fire.'],why:'The moon reflects sunlight.'}},
    {h:'Tides, and comparing sun, Earth and moon',p:['Tides are biggest at <b>new and full moon</b>, when the sun, Earth, and moon line up. They are smallest at the quarter moons, when they make a right angle.','The <b>sun</b> is an average-sized yellow star, about 110 times as wide as Earth and about 4.6 billion years old.','The <b>moon</b> is small and rocky, about one-quarter of Earth’s width, with no air or water to support life. <b>Earth</b> has liquid water and an oxygen-rich atmosphere.'],
     ex:{q:'Tides have the biggest difference between high and low today. What phase could the moon be in?',steps:['Biggest tides happen when sun, Earth, and moon line up.','That happens at new moon and full moon.'],a:'new moon or full moon'},
     chk:{q:'About how wide is the moon compared with Earth?',a:'about one-quarter as wide',w:['about the same size','about twice as wide','about 110 times as wide'],why:'The moon’s diameter is about one-fourth of Earth’s.'}}],
  watch:[['Saying seasons happen because Earth gets closer to the sun.','Seasons are caused by the tilt.'],['Thinking the moon makes its own light.','It reflects sunlight.'],['Thinking Earth’s shadow causes moon phases.','Phases come from the moon’s position; Earth’s shadow causes eclipses.']],
  tips:['You may need to match a diagram of sun–Earth–moon positions to a moon phase or tide.'],
  sum:['Day and night: Earth rotates.','Seasons: tilt + revolution.','Phases: new, first quarter, full, last quarter.','Biggest tides at new and full moon.']});

SG.add('g4_ocean',{title:'The ocean',
  goals:['I can describe features of the ocean floor.','I can explain salinity and how currents move water.','I can describe how ocean organisms move and form food chains.'],
  words:[['continental shelf','the shallow ocean floor next to land',''],['trench','a very deep valley in the ocean floor',''],['salinity','how much salt is dissolved in water',''],['current','a river of moving water in the ocean','the Gulf Stream'],['plankton','tiny floating organisms','']],
  pages:[
    {h:'The ocean floor',p:['Moving out from land: the shallow <b>continental shelf</b>, the steep <b>continental slope</b>, the <b>continental rise</b>, and the flat, deep <b>abyssal plain</b>. <b>Trenches</b> are the deepest places.','Most of the ocean floor is covered with sediment like sand and mud.'],
     ex:{q:'Where is the ocean shallowest: the continental shelf or a trench?',steps:['The shelf is next to land and is shallow.','Trenches are very deep valleys.'],a:'the continental shelf'},
     chk:{q:'Which ocean-floor feature is deepest?',a:'a trench',w:['the continental shelf','a beach','the continental slope'],why:'Ocean trenches are the deepest parts of the ocean.'}},
    {h:'Ocean water and currents',p:['Ocean water is a mix of water, dissolved gases (that sea life needs), and dissolved salts.','<b>Salinity</b> changes with evaporation (more salty), melting icebergs and river runoff (less salty), and depth.','<b>Currents</b>, like the <b>Gulf Stream</b>, are pushed by wind and by differences in temperature. They mix ocean water, affect where plants and animals live, and affect ship routes.'],
     ex:{q:'A river pours fresh water into the ocean. What happens to the salinity near the river’s mouth?',steps:['Fresh water has little salt.','Mixing it in lowers the amount of salt per amount of water.'],a:'Salinity goes down.'},
     chk:{q:'What mainly drives ocean currents?',a:'wind and differences in water temperature',w:['the moon only','fish swimming','ships'],why:'Wind patterns and temperature differences drive currents like the Gulf Stream.'}},
    {h:'Life in the ocean',p:['<b>Producers</b> in the ocean include plants and floating <b>algae</b>.','Ocean organisms can be <b>floating</b> (plankton), <b>swimming</b> (fish, whales), or <b>non-moving</b> and attached to the floor (coral, barnacles).','All of them are part of ocean food chains.'],
     dg:()=>sgChain(['algae','krill','fish','seal','shark']),
     ex:{q:'Is a barnacle stuck to a rock floating, swimming, or non-moving?',steps:['It is attached to one place.'],a:'non-moving'},
     chk:{q:'Which is a producer in the ocean?',a:'algae',w:['shark','crab','jellyfish'],why:'Algae make their own food from sunlight.'}}],
  watch:[['Thinking the ocean is the same depth everywhere.','It is shallow on the shelf and very deep in trenches.'],['Mixing up currents and tides.','Currents are steady flows driven by wind and temperature; tides are the rise and fall caused by the moon.']],
  tips:['You may label an ocean-floor diagram or build a marine food chain.'],
  sum:['Shelf (shallow) → slope → rise → abyssal plain; trenches are deepest.','Salinity = dissolved salt.','Wind and temperature drive currents.','Floating, swimming, and non-moving organisms.']});

SG.add('g4_vares',{title:'Virginia’s natural resources',
  goals:['I can explain what a watershed is and name Virginia’s major watersheds.','I can describe why plants, animals, minerals, forests, and soil matter.','I can explain how we can protect resources.'],
  words:[['natural resource','something from nature that people need or use','water, soil, forests'],['watershed','land where water drains to one place','the Chesapeake Bay watershed'],['erosion','wearing away and moving soil',''],['mineral / ore','natural solids used for building, fuel, and metals','']],
  pages:[
    {h:'Watersheds: we all live downstream',p:['A <b>watershed</b> is the land where surface water flows to one collection point.','About half of Virginia drains to the <b>Chesapeake Bay</b>. The other major watersheds drain to the <b>Gulf of Mexico</b> and the <b>North Carolina sounds</b>.','Pollution put in the water upstream travels down to everyone below — “we all live downstream.”'],
     ex:{q:'Fertilizer washes off a farm into a creek in the Chesapeake Bay watershed. Where can it end up?',steps:['The creek flows into a river.','The river flows to the Chesapeake Bay.'],a:'in the Chesapeake Bay'},
     chk:{q:'About how much of Virginia’s land drains into the Chesapeake Bay?',a:'about half',w:['almost none','about a tenth','all of it'],why:'The Chesapeake Bay watershed covers about half of Virginia’s land.'}},
    {h:'Living resources: plants and animals',p:['Plants hold soil in place, which reduces <b>erosion</b> and keeps water clean. They give us food, building materials, habitats, and oxygen.','Animals give us food, fiber (like wool), and leather.','Virginia’s water resources include lakes, rivers, bays, and the Atlantic Ocean.'],
     ex:{q:'Why do farmers plant grass and trees along stream banks?',steps:['Roots hold soil in place.','Less soil washes into the stream (less erosion).'],a:'to stop erosion and keep the water clean'},
     chk:{q:'How do plants help water quality?',a:'Their roots hold soil and reduce erosion.',w:['They add salt to water.','They make rivers flow faster.','They use up all the rain.'],why:'Less soil washing away means cleaner water.'}},
    {h:'Rocks, minerals, forests, and land',p:['<b>Minerals, ores, and rocks</b> are used for building materials and fuel. Coal, for example, is a fuel found in Virginia.','<b>Forests</b>, natural and planted, give us lumber, fuel, and habitats.','<b>Soil and land</b> grow our food and give us places to live, work, and play.'],
     ex:{q:'Name two ways people use Virginia’s forests.',steps:['Trees are cut for lumber and paper.','Forests are habitats and places for recreation.'],a:'building materials and habitats (also fuel and recreation)'},
     chk:{q:'Which natural resource is mostly used as a building material or fuel?',a:'rocks and minerals',w:['plankton','clouds','sunlight'],why:'Rocks, minerals, and ores are used for building and fuel.'}}],
  watch:[['Thinking pollution only affects the place where it starts.','Water carries it downstream through the watershed.'],['Thinking natural resources never run out.','Many are limited and must be protected.']],
  tips:['You may need to read a watershed map and decide where water flows.'],
  sum:['Watershed: land draining to one place.','About half of Virginia drains to the Chesapeake Bay.','Plants stop erosion and clean water.','Minerals and forests give building materials and fuel.']});

['g4_plants','g4_eco','g4_weather','g4_space','g4_esm','g4_ocean','g4_vares'].forEach(g=>{SG_SPRITE[g]='sg_g4sci';});
