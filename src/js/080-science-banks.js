// ═══════════════════════════════════════════════════════════════
// SCIENCE — question banks
// ═══════════════════════════════════════════════════════════════
const SCI_BANK={
  g4_force:[
    {q:"A ball rolls down a hill and speeds up. What force is pulling it down?",o:["Gravity","Magnetism","Friction"],a:"Gravity",e:"Gravity pulls objects toward Earth, making the ball speed up as it rolls down.",h:"What force pulls everything toward the ground?"},
    {q:"Which surface would create the MOST friction for a sliding box?",o:["Smooth ice","Rough carpet","Polished glass"],a:"Rough carpet",e:"Rough surfaces create more friction, which slows objects down. Carpet is the roughest.",h:"Friction is bigger on rough surfaces. Which is roughest?"},
    {q:"What is needed to change an object's motion (start, stop, or turn it)?",o:["A force","A color","A sound"],a:"A force",e:"A force (a push or pull) is needed to change how an object moves.",h:"What do we call a push or a pull?"},
  ],
  g4_elec:[
    {q:"Which material is the BEST conductor of electricity?",o:["Copper wire","Rubber band","Wooden stick"],a:"Copper wire",e:"Metals like copper conduct electricity well. Rubber and wood are insulators.",h:"Conductors are usually metals. Which one is metal?"},
    {q:"In a series circuit, one bulb burns out. What happens to the others?",o:["They stay on","They all go out","They get brighter"],a:"They all go out",e:"In a series circuit there's only one path, so if one bulb breaks, the whole circuit stops.",h:"A series circuit has just one path for electricity."},
    {q:"What must a circuit be for electricity to flow?",o:["Open","Complete (closed)","Broken"],a:"Complete (closed)",e:"Electricity only flows through a complete, closed loop.",h:"Electricity needs an unbroken loop to travel around."},
  ],
  g4_plants:[
    {q:"Which plant part absorbs water and nutrients from the soil?",o:["Leaves","Roots","Flowers"],a:"Roots",e:"Roots absorb water and nutrients and anchor the plant in the soil.",h:"Which part is underground?"},
    {q:"What do plants make during photosynthesis?",o:["Food (sugar) and oxygen","Only water","Soil"],a:"Food (sugar) and oxygen",e:"Plants use sunlight, water, and CO₂ to make food (sugar) and release oxygen.",h:"Photosynthesis makes food for the plant and a gas we breathe."},
    {q:"Which part of the plant makes food using sunlight?",o:["Roots","Leaves","Stem"],a:"Leaves",e:"Leaves contain chlorophyll and carry out photosynthesis using sunlight.",h:"Which green part catches sunlight?"},
  ],
  g4_eco:[
    {q:"In a food chain, what is a plant called?",o:["Consumer","Producer","Decomposer"],a:"Producer",e:"Plants make their own food using sunlight, so they are producers.",h:"Which organism makes its own food?"},
    {q:"A polar bear's thick white fur is an example of a(n):",o:["Adaptation for survival","Weakness","Food source"],a:"Adaptation for survival",e:"White fur camouflages and thick fur insulates — adaptations that help it survive the Arctic.",h:"A body feature that helps survival is called this."},
    {q:"What do decomposers (like mushrooms) do in an ecosystem?",o:["Break down dead matter","Hunt other animals","Make sunlight"],a:"Break down dead matter",e:"Decomposers break down dead plants and animals, returning nutrients to the soil.",h:"What happens to dead leaves and animals over time?"},
  ],
  g4_weather:[
    {q:"What causes water in a puddle to disappear on a sunny day?",o:["Condensation","Evaporation","Precipitation"],a:"Evaporation",e:"The sun's heat turns liquid water into water vapor — this is evaporation.",h:"Heat turns liquid water into a gas. What's that step called?"},
    {q:"Which cloud type usually brings thunderstorms?",o:["Cumulonimbus","Cirrus","Stratus"],a:"Cumulonimbus",e:"Tall, dark cumulonimbus clouds bring heavy rain and thunderstorms.",h:"The tall, dark storm clouds have this name."},
    {q:"What is the correct order of the water cycle?",o:["Evaporation → Condensation → Precipitation","Rain → Sun → Snow","Wind → Cloud → Fog"],a:"Evaporation → Condensation → Precipitation",e:"Water evaporates, condenses into clouds, then falls as precipitation.",h:"Start with water rising as vapor from the ground."},
  ],
  g4_space:[
    {q:"What causes day and night on Earth?",o:["Earth's rotation on its axis","The moon moving","Clouds covering the sun"],a:"Earth's rotation on its axis",e:"Earth spins on its axis once every 24 hours, creating day and night.",h:"Earth spins like a top — how long does one spin take?"},
    {q:"Why do we see different moon phases?",o:["The moon changes shape","We see different amounts of the moon's lit side as it orbits Earth","Clouds cover parts of the moon"],a:"We see different amounts of the moon's lit side as it orbits Earth",e:"The moon is always half-lit; as it orbits, we see different portions of that lit side.",h:"The moon orbits Earth — we see different amounts of its sunny side."},
    {q:"What is at the CENTER of our solar system?",o:["Earth","The Sun","The Moon"],a:"The Sun",e:"The Sun is at the center, and all planets orbit around it.",h:"Everything in our solar system orbits around this star."},
  ],
  g6_energy:[
    {q:"A ball at the top of a hill has the MOST of which energy?",o:["Kinetic energy","Potential energy","Sound energy"],a:"Potential energy",e:"At the top (highest point, not moving), it has maximum stored potential energy.",h:"Stored energy due to height is called what?"},
    {q:"When you rub your hands together and they warm up, what energy transformation occurs?",o:["Light → Sound","Kinetic (motion) → Thermal (heat)","Chemical → Light"],a:"Kinetic (motion) → Thermal (heat)",e:"The motion of rubbing (kinetic) transforms into heat (thermal) energy through friction.",h:"Movement turns into warmth — which two energy types?"},
    {q:"Which is an example of chemical energy?",o:["A stretched rubber band","Food in your body","A moving car"],a:"Food in your body",e:"Food stores chemical energy that your body converts to power movement and life.",h:"What stored energy does your body get from eating?"},
  ],
  g6_solar:[
    {q:"What causes Earth's seasons?",o:["Earth's distance from the sun changing","Earth's tilt on its axis","The moon blocking sunlight"],a:"Earth's tilt on its axis",e:"Earth's 23.5° tilt causes different hemispheres to get more direct sunlight at different times — creating seasons.",h:"It's not distance — it's the angle Earth is tilted at."},
    {q:"Why does the moon appear to change shape over about a month?",o:["It orbits Earth, so we see different parts of its lit side","It grows and shrinks","Earth's shadow always covers it"],a:"It orbits Earth, so we see different parts of its lit side",e:"As the moon orbits Earth (~29.5 days), we see varying amounts of its sunlit half.",h:"The moon's orbit changes how much of its lit side we can see."},
    {q:"Which planets are the ROCKY inner planets?",o:["Mercury, Venus, Earth, Mars","Jupiter and Saturn","Uranus and Neptune"],a:"Mercury, Venus, Earth, Mars",e:"The four inner planets (Mercury, Venus, Earth, Mars) are small and rocky. The outer ones are gas giants.",h:"The four planets closest to the sun are small and rocky."},
  ],
  g6_eco:[
    {q:"About how much energy passes to the next level of a food chain?",o:["About 10%","About 90%","100%"],a:"About 10%",e:"Only ~10% of energy transfers up each trophic level; 90% is lost as heat.",h:"Most energy is lost as heat — only a small percent passes up."},
    {q:"A bee pollinates a flower while getting nectar. Both benefit. This relationship is:",o:["Mutualism","Parasitism","Competition"],a:"Mutualism",e:"When both organisms benefit, it's mutualism (bee gets food, flower gets pollinated).",h:"When BOTH sides benefit, what's it called?"},
    {q:"In the carbon cycle, which process REMOVES carbon dioxide from the air?",o:["Photosynthesis","Burning fuel","Breathing out"],a:"Photosynthesis",e:"Plants absorb CO₂ during photosynthesis, removing it from the atmosphere.",h:"Which process do plants use to take in CO₂?"},
  ],
  g6_atmo:[
    {q:"What is the difference between weather and climate?",o:["They are the same","Weather is short-term; climate is the long-term average","Climate changes daily"],a:"Weather is short-term; climate is the long-term average",e:"Weather is day-to-day conditions; climate is the average over many years (30+).",h:"One is today's conditions, the other is the long-term pattern."},
    {q:"Warm air does what compared to cold air?",o:["Rises (it's less dense)","Sinks","Stays still"],a:"Rises (it's less dense)",e:"Warm air is less dense, so it rises. This drives weather patterns and convection.",h:"Think about a hot air balloon — which way does warm air go?"},
    {q:"Which gas makes up MOST of Earth's atmosphere?",o:["Oxygen","Nitrogen","Carbon dioxide"],a:"Nitrogen",e:"Nitrogen makes up about 78% of the atmosphere; oxygen is about 21%.",h:"It's not oxygen — it's the gas that's about 78% of the air."},
  ],
  g6_resource:[
    {q:"Which of these is a RENEWABLE resource?",o:["Coal","Solar energy","Natural gas"],a:"Solar energy",e:"Solar energy is renewable — the sun won't run out. Coal and gas are nonrenewable.",h:"Which resource will never run out?"},
    {q:"Why are fossil fuels called NONRENEWABLE?",o:["They form faster than we use them","They take millions of years to form and are being used up","They come from the sun"],a:"They take millions of years to form and are being used up",e:"Fossil fuels form over millions of years, so once used, they can't be quickly replaced.",h:"How long do coal and oil take to form?"},
    {q:"Which action best CONSERVES natural resources?",o:["Recycling and reusing materials","Throwing everything away","Using more electricity"],a:"Recycling and reusing materials",e:"Recycling and reusing reduce the need to extract new resources, conserving them.",h:"Which action reduces how much new material we need to take from Earth?"},
  ],
};

