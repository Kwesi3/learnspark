// ═══════════════════════════════════════════════════════════════
// Study guides — Grade 4 Virginia Studies (2023 Virginia History and Social Science SOL VS.1–VS.13).
// Source: VDOE "History and Social Science Standards of Learning for Virginia Public Schools" (2023),
// Virginia Studies standards and their lettered parts.
// ═══════════════════════════════════════════════════════════════
function sgTimeline(evts){ // [[year,label]] in order
  const a=evts[0][0],b=evts[evts.length-1][0],X=y=>24+(y-a)/Math.max(1,b-a)*300;let r=`<line x1="14" y1="60" x2="338" y2="60" stroke="#1B2A4A" stroke-width="3"/>`;
  evts.forEach(([y,t],i)=>{const x=X(y),up=i%2===0;r+=`<circle cx="${x}" cy="60" r="6" fill="#E4573D" stroke="#1B2A4A" stroke-width="2"/>`+dgText(x,up?44:84,String(y),{s:13})+dgText(x,up?26:102,t,{s:11,c:'#33415E'});});
  return dgSvg(352,112,r,'Timeline: '+evts.map(e=>e[0]+' '+e[1]).join(', '));}

SG.add('vs1',{title:'Virginia’s geography',
  goals:['I can locate Virginia and the states that border it.','I can describe Virginia’s five geographic regions.','I can explain how Virginia’s bodies of water shaped its history and economy.'],
  words:[['region','an area with common features',''],['Fall Line','where rivers drop from the Piedmont to the Coastal Plain, making waterfalls','ships could not sail past it'],['peninsula','land with water on three sides','the Eastern Shore'],['tributary','a smaller river that flows into a bigger one','']],
  pages:[
    {h:'Where Virginia is',p:['Virginia is in the eastern United States, on the Atlantic Ocean.','It borders <b>Maryland</b>, <b>West Virginia</b>, <b>Kentucky</b>, <b>Tennessee</b>, and <b>North Carolina</b>, plus Washington, D.C., across the Potomac River.'],
     ex:{q:'Which state is directly south of Virginia?',steps:['Look at the map: Tennessee and North Carolina are south.','North Carolina is south of most of Virginia, along the coast.'],a:'North Carolina (and Tennessee in the far southwest)'},
     chk:{q:'Which of these states does NOT border Virginia?',a:'Pennsylvania',w:['Kentucky','Maryland','West Virginia'],why:'Virginia’s neighbors are Maryland, West Virginia, Kentucky, Tennessee, and North Carolina.'}},
    {h:'The five regions',p:['From east to west: <b>Coastal Plain</b> (Tidewater) — low, flat land by the ocean and bay. <b>Piedmont</b> — rolling hills in the middle. <b>Blue Ridge Mountains</b> — old, rounded mountains. <b>Valley and Ridge</b> — valleys between ridges, including the Shenandoah Valley. <b>Appalachian Plateau</b> — a small region in the far southwest, rich in coal.','The <b>Fall Line</b> separates the Coastal Plain from the Piedmont. Rivers drop over rocks there, so ships could not sail farther inland — cities like Richmond grew at the Fall Line.'],
     ex:{q:'In which region is the Shenandoah Valley?',steps:['It is a valley between mountain ridges in western Virginia.'],a:'the Valley and Ridge region'},
     chk:{q:'Which region is low, flat land along the Atlantic Ocean and Chesapeake Bay?',a:'Coastal Plain',w:['Piedmont','Blue Ridge Mountains','Appalachian Plateau'],why:'The Coastal Plain (Tidewater) is the low, flat eastern region.'}},
    {h:'Water shaped Virginia',p:['The <b>Atlantic Ocean</b> and the <b>Chesapeake Bay</b> brought ships, trade, fishing, and the Navy.','Four big rivers flow into the bay: the <b>Potomac</b>, <b>Rappahannock</b>, <b>York</b>, and <b>James</b>. Early settlers built farms and towns along them, and goods traveled by water.','Today the ports of Hampton Roads are among the busiest on the East Coast.'],
     ex:{q:'Why did early Virginians settle along rivers?',steps:['Rivers were the “highways” for ships and boats.','They gave water and fertile land for farms.'],a:'for transportation, trade, water, and good farmland'},
     chk:{q:'Which river runs along Virginia’s border with Maryland?',a:'the Potomac River',w:['the James River','the York River','the Roanoke River'],why:'The Potomac forms much of the Virginia–Maryland border.'}}],
  watch:[['Mixing up the Blue Ridge and the Valley and Ridge.','The Blue Ridge is one mountain range; the Valley and Ridge is west of it with long valleys.'],['Forgetting why the Fall Line matters.','Ships had to stop there, so cities grew at the Fall Line.']],
  tips:['Expect a map: you may need to label regions, rivers, or neighboring states.'],
  sum:['Neighbors: MD, WV, KY, TN, NC (and D.C.).','Regions east→west: Coastal Plain, Piedmont, Blue Ridge, Valley and Ridge, Appalachian Plateau.','Fall Line: ships stop; cities grow.','Rivers: Potomac, Rappahannock, York, James.']});

SG.add('vs2',{title:'Virginia’s Indigenous Peoples',
  goals:['I can explain how archaeologists learn about the past, including at Werowocomoco.','I can describe the Algonquian, Siouan, and Iroquoian language groups.','I can describe how Indigenous Peoples lived around 1600 and today.'],
  words:[['Indigenous Peoples','the first people to live in a place','also called Native Americans'],['archaeologist','a scientist who studies artifacts to learn about the past',''],['artifact','an object made or used by people long ago','tools, pottery, beads'],['language group','nations that spoke related languages','']],
  pages:[
    {h:'How we know: archaeology',p:['Archaeologists dig carefully and study <b>artifacts</b> like tools, pottery, and beads.','<b>Werowocomoco</b>, on the York River, was the capital of the Powhatan chiefdom. Artifacts found there show it was a major center long before the English arrived. Sites like <b>Cactus Hill</b> show people lived in Virginia thousands of years ago.'],
     ex:{q:'What can a piece of broken pottery tell an archaeologist?',steps:['How people cooked and stored food.','When people lived there and what skills they had.'],a:'clues about daily life and when people lived there'},
     chk:{q:'What was Werowocomoco?',a:'the capital of the Powhatan chiefdom',w:['the first English fort','a Spanish mission','a colonial plantation'],why:'Werowocomoco on the York River was the Powhatan capital.'}},
    {h:'Three language groups',p:['<b>Algonquian</b> — mainly the Coastal Plain; the largest was the <b>Powhatan</b> chiefdom.','<b>Siouan</b> — mainly the Piedmont; for example, the <b>Monacan</b>.','<b>Iroquoian</b> — in the southwest (the <b>Cherokee</b>) and the southeast (the <b>Nottoway</b> and <b>Meherrin</b>).','They were many different nations with their own leaders and traditions.'],
     ex:{q:'Which language group lived mostly in the Coastal Plain?',steps:['The Powhatan lived near the bay and rivers of the Coastal Plain.','They spoke an Algonquian language.'],a:'Algonquian'},
     chk:{q:'The Monacan lived mainly in the Piedmont. Which language group were they?',a:'Siouan',w:['Algonquian','Iroquoian','Powhatan'],why:'The Monacan spoke a Siouan language.'}},
    {h:'Life around 1600 — and today',p:['Indigenous Peoples used their environment: they hunted deer, fished, gathered plants, and farmed <b>corn, beans, and squash</b>. They built homes from trees, bark, and reeds and traded with other nations.','Indigenous Peoples still live in Virginia today. Virginia recognizes 11 tribes, and 7 are also recognized by the United States government. They keep their traditions alive through powwows, museums, and education.'],
     ex:{q:'How did the environment affect what Algonquian peoples ate?',steps:['They lived near rivers and the bay.','So fish and shellfish were important foods, along with crops and deer.'],a:'They fished, farmed, and hunted using what was nearby.'},
     chk:{q:'Which crops did many Virginia Indigenous Peoples grow?',a:'corn, beans, and squash',w:['wheat, rice, and tea','tobacco only','apples and oranges'],why:'Corn, beans, and squash were major crops.'}}],
  watch:[['Thinking all Indigenous Peoples were one group.','There were many nations in three language groups.'],['Thinking Indigenous Peoples live only in the past.','Many tribes live in Virginia today.']],
  tips:['Know which language group goes with which region.'],
  sum:['Archaeologists study artifacts (Werowocomoco, Cactus Hill).','Algonquian (Coastal Plain, Powhatan).','Siouan (Piedmont, Monacan); Iroquoian (Cherokee, Nottoway, Meherrin).','Indigenous Peoples live in Virginia today.']});

SG.add('vs3',{title:'Jamestown',
  goals:['I can explain why the English came and why they settled at Jamestown.','I can describe Jamestown’s hardships and how the colonists survived.','I can explain why 1619 was important.'],
  words:[['colony','land settled and ruled by another country',''],['charter','a written grant of rights from the king','the Virginia Company charter, 1606'],['cash crop','a crop grown to sell for money','tobacco'],['representative government','people choose leaders to make laws for them','']],
  pages:[
    {h:'Why the English came',p:['The <b>Virginia Company of London</b> received a <b>charter</b> from King James I on <b>April 10, 1606</b>. Investors hoped to make money from gold, resources, and trade, and England wanted to compete with Spain and spread Christianity.','In <b>1607</b>, the settlers chose a spot on the <b>James River</b>: deep water let ships tie up close to shore, and the peninsula was easy to defend.'],
     dg:()=>sgTimeline([[1606,'charter'],[1607,'Jamestown'],[1612,'tobacco'],[1619,'Assembly']]),
     ex:{q:'Name two reasons the English chose the Jamestown site.',steps:['Deep water close to shore for their ships.','A peninsula that could be defended from attack.'],a:'deep water for ships and a good place to defend'},
     chk:{q:'What gave the Virginia Company the right to start a colony?',a:'a charter from King James I',w:['a treaty with Spain','the Declaration of Independence','a vote by the colonists'],why:'The charter of April 10, 1606, granted the company the right to settle.'}},
    {h:'Hardships and survival',p:['The site was swampy, with bad drinking water and mosquitoes. Many colonists became sick or starved — the worst was the “<b>Starving Time</b>” of 1609–1610.','The <b>Powhatan</b> traded food with the colonists, which helped them survive.','<b>Captain John Smith</b> made a rule: “He who does not work shall not eat.”','<b>John Rolfe</b> grew tobacco as a <b>cash crop</b>, and <b>land ownership</b> gave colonists a reason to work hard.'],
     ex:{q:'How did tobacco help Jamestown survive?',steps:['Tobacco sold for a lot of money in England.','The colony finally earned money, and more settlers came.'],a:'It became a cash crop that made the colony profitable.'},
     chk:{q:'Which group traded food that helped the colonists survive?',a:'the Powhatan',w:['the Spanish','the French','the Dutch'],why:'Trade with the Powhatan was key to the colonists’ survival.'}},
    {h:'1619: a year of change',p:['The <b>General Assembly</b> met in 1619 — the first representative law-making body in English America. Colonists elected representatives to make laws.','The first <b>Africans</b> arrived in Virginia in 1619. They were brought against their will, and their arrival began a history that led to slavery in Virginia.','More <b>women</b> arrived around that time, helping families and a permanent settlement grow.'],
     ex:{q:'Why is the General Assembly of 1619 important today?',steps:['It was the first representative legislature in English America.','Virginia’s General Assembly still meets today.'],a:'It began representative government in America.'},
     chk:{q:'What was the General Assembly of 1619?',a:'the first representative law-making body in English America',w:['the first church in Virginia','the first school in Virginia','a group of ship captains'],why:'Elected representatives met to make laws for the colony.'}}],
  watch:[['Thinking Jamestown was easy and successful from the start.','It nearly failed from disease, starvation, and conflict.'],['Mixing up John Smith and John Rolfe.','Smith: “work to eat” leadership. Rolfe: tobacco.']],
  tips:['Know the order: charter (1606) → Jamestown (1607) → Starving Time (1609–10) → 1619 events.'],
  sum:['Charter April 10, 1606; Jamestown 1607.','Deep water and a defensible peninsula.','Powhatan trade, John Smith, tobacco, land ownership.','1619: General Assembly, first Africans, more women.']});

SG.add('vs4',{title:'Life in colonial Virginia',
  goals:['I can explain why agriculture was so important.','I can compare indentured servants and enslaved people.','I can explain why the capital moved to Williamsburg and how people traded.'],
  words:[['plantation','a large farm that grew cash crops like tobacco',''],['indentured servant','a person who worked for a set number of years to pay for the trip to America',''],['enslaved person','a person forced to work for life without pay and without freedom',''],['barter','trading goods without using money','']],
  pages:[
    {h:'A farming colony',p:['Colonial Virginia’s economy depended on <b>agriculture</b>, especially <b>tobacco</b>. Plantations grew along rivers so tobacco could be shipped to England.','Colonial Virginia blended many cultures: Indigenous Peoples; Europeans such as the <b>English</b>, <b>Scots-Irish</b>, and <b>Germans</b>, many of whom settled in the Shenandoah Valley; and <b>Africans</b>.'],
     ex:{q:'Why were plantations built along rivers?',steps:['Tobacco was shipped to England.','Ships could load right from the plantation dock.'],a:'so crops could be shipped easily'},
     chk:{q:'What was the most important cash crop in colonial Virginia?',a:'tobacco',w:['cotton','wheat','rice'],why:'Tobacco was the main cash crop.'}},
    {h:'Indentured servants and enslaved people',p:['<b>Indentured servants</b> agreed to work for about four to seven years in exchange for their trip. Afterward they were free.','<b>Enslaved Africans</b> were captured, shipped across the ocean, and sold. They were forced to work for their whole lives, and their children were enslaved too.','Virginia passed laws that made slavery based on race and passed down from mother to child — taking away rights and freedom.'],
     ex:{q:'What is the biggest difference between an indentured servant and an enslaved person?',steps:['An indentured servant worked for a set number of years, then was free.','An enslaved person was held for life, and so were their children.'],a:'Indentured servants became free; enslaved people did not.'},
     chk:{q:'An indentured servant worked to pay for…',a:'the trip to America',w:['a plantation','their freedom from slavery for life','a seat in the General Assembly'],why:'They worked a set number of years to pay for their passage.'}},
    {h:'A new capital and trade',p:['In <b>1699</b> the capital moved from Jamestown to <b>Williamsburg</b>. Jamestown’s statehouse had burned, the swampy land was unhealthy, and Williamsburg was on higher ground near the College of William & Mary.','People exchanged goods and services by <b>barter</b>, with <b>tobacco</b> used like money, and with coins and paper money when they could get them.'],
     ex:{q:'Give two reasons the capital moved to Williamsburg.',steps:['Jamestown’s statehouse burned.','Williamsburg was healthier, on higher, drier ground.'],a:'fire at Jamestown and a healthier location'},
     chk:{q:'What is bartering?',a:'trading goods or services without money',w:['buying with coins','paying taxes','voting'],why:'Barter is a direct trade, like tobacco for tools.'}}],
  watch:[['Treating indentured servants and enslaved people as the same.','Indentured servants were freed after their term; enslaved people were held for life.'],['Thinking the capital moved straight to Richmond.','Jamestown → Williamsburg (1699) → Richmond (1780).']],
  tips:['Expect “compare” questions about servants and enslaved people.'],
  sum:['Tobacco plantations along rivers.','Many cultures: Indigenous, English, Scots-Irish, German, African.','Indentured servants: set term; enslaved people: for life.','Capital → Williamsburg in 1699; barter and tobacco as money.']});

SG.add('vs5',{title:'Virginia and the American Revolution',
  goals:['I can explain why colonists declared independence.','I can describe the roles of Virginians in the war.','I can explain why the capital moved to Richmond and why Yorktown mattered.'],
  words:[['revolution','a big change, often a fight to replace a government',''],['independence','freedom from another country’s control',''],['Declaration of Independence','the 1776 document saying the colonies were free from Great Britain','written mainly by Thomas Jefferson'],['surrender','to give up in a battle or war','']],
  pages:[
    {h:'Why break away?',p:['After 1763 Great Britain taxed the colonists, who had no representatives in Parliament: “<b>No taxation without representation!</b>”','The <b>Declaration of Independence</b> (1776), written mainly by Virginian <b>Thomas Jefferson</b>, said people have rights to “life, liberty, and the pursuit of happiness,” and that governments get their power from the people.'],
     ex:{q:'Why were colonists angry about British taxes?',steps:['They had to pay taxes.','But they had no vote in the Parliament that made the taxes.'],a:'They were taxed without representation.'},
     chk:{q:'Who wrote most of the Declaration of Independence?',a:'Thomas Jefferson',w:['George Washington','Patrick Henry','James Madison'],why:'Jefferson, a Virginian, was its main author.'}},
    {h:'Virginians in the war',p:['<b>George Washington</b> led the Continental Army. <b>George Mason</b> and <b>James Madison</b> shaped ideas about rights and government.','<b>James Armistead Lafayette</b>, an enslaved African American, spied on the British and helped win at Yorktown. He later gained his freedom.','Women ran farms and businesses and supported the army. Some free and enslaved Black Virginians fought; Indigenous Peoples were also affected and some took part.'],
     ex:{q:'How did James Armistead Lafayette help the Americans?',steps:['He pretended to spy for the British.','He passed British plans to the Americans before Yorktown.'],a:'He spied on the British for the Americans.'},
     chk:{q:'Who led the Continental Army?',a:'George Washington',w:['Thomas Jefferson','Patrick Henry','Lord Cornwallis'],why:'Washington was the commander in chief.'}},
    {h:'Richmond and Yorktown',p:['In <b>1780</b> the capital moved from Williamsburg to <b>Richmond</b>: it was more central and safer from British attack by sea.','In <b>1781</b>, American and <b>French</b> forces trapped the British army of General Cornwallis at <b>Yorktown</b>, Virginia. Cornwallis surrendered — the last major battle of the war, and the victory that led to independence.'],
     dg:()=>sgTimeline([[1765,'taxes'],[1776,'Declaration'],[1780,'Richmond'],[1781,'Yorktown']]),
     ex:{q:'Why was Yorktown so important?',steps:['The British army surrendered there.','It was the last major battle, leading to the end of the war.'],a:'The American victory ended major fighting and led to independence.'},
     chk:{q:'Which country helped the Americans trap the British at Yorktown?',a:'France',w:['Spain','Germany','Canada'],why:'French ships and soldiers helped surround Cornwallis.'}}],
  watch:[['Thinking the war ended in 1776.','1776 was the Declaration; Yorktown was 1781.'],['Forgetting James Armistead Lafayette.','He was a key spy at Yorktown.']],
  tips:['Know who did what: Washington, Jefferson, Mason, Madison, Armistead Lafayette.'],
  sum:['No taxation without representation.','Declaration of Independence, 1776 (Jefferson).','Capital → Richmond, 1780.','Yorktown, 1781: British surrender with French help.']});

SG.add('vs6',{title:'A new nation',
  goals:['I can explain the roles of George Washington, James Madison, and Patrick Henry.','I can describe the Virginia Declaration of Rights and the Virginia Statute for Religious Freedom.','I can explain westward movement and Nat Turner’s Rebellion.'],
  words:[['constitution','a written plan of government',''],['Bill of Rights','the first ten amendments to the U.S. Constitution',''],['religious freedom','the right to worship, or not, as you choose',''],['rebellion','fighting against those in power','']],
  pages:[
    {h:'Three famous Virginians',p:['<b>George Washington</b> — “Father of Our Country” — led the army and became the first President.','<b>James Madison</b> — “Father of the Constitution” — helped write the U.S. Constitution and the Bill of Rights.','<b>Patrick Henry</b> gave the famous speech “Give me liberty, or give me death!” and pushed for protecting citizens’ rights.'],
     ex:{q:'Why is James Madison called the “Father of the Constitution”?',steps:['He planned much of the U.S. Constitution.','He also wrote the Bill of Rights.'],a:'He was the main planner of the Constitution.'},
     chk:{q:'Who said “Give me liberty, or give me death!”?',a:'Patrick Henry',w:['George Washington','James Madison','George Mason'],why:'Patrick Henry gave that speech in Richmond in 1775.'}},
    {h:'Virginia’s founding documents',p:['<b>George Mason</b> wrote the <b>Virginia Declaration of Rights</b> (1776). Its ideas — freedom of the press, the right to a fair trial — helped inspire the <b>Bill of Rights</b>.','<b>Thomas Jefferson</b> wrote the <b>Virginia Statute for Religious Freedom</b>, which said people could worship as they chose and the state could not force a religion. It inspired the First Amendment.'],
     ex:{q:'How did the Virginia Declaration of Rights affect the whole nation?',steps:['It listed rights of the people.','Those ideas went into the U.S. Bill of Rights.'],a:'Its ideas inspired the Bill of Rights.'},
     chk:{q:'Who wrote the Virginia Statute for Religious Freedom?',a:'Thomas Jefferson',w:['George Mason','Patrick Henry','John Smith'],why:'Jefferson wrote it; Mason wrote the Virginia Declaration of Rights.'}},
    {h:'Moving west, and Nat Turner',p:['In the early 1800s many Virginians moved west for new land. They crossed mountains through the <b>Cumberland Gap</b> and used new canals and railroads.','In <b>1831</b>, <b>Nat Turner</b>, an enslaved man in Southampton County, led a rebellion against slavery. Afterward, Virginia passed even harsher laws limiting enslaved and free Black people — for example, making it illegal to teach enslaved people to read.'],
     ex:{q:'What happened after Nat Turner’s Rebellion?',steps:['White leaders were afraid of more rebellions.','They passed stricter laws on enslaved and free Black people.'],a:'Virginia passed harsher laws restricting Black Virginians.'},
     chk:{q:'What helped settlers cross the Appalachian Mountains?',a:'the Cumberland Gap',w:['the Fall Line','the Chesapeake Bay','the Atlantic Ocean'],why:'The Cumberland Gap was a natural pass through the mountains.'}}],
  watch:[['Mixing up Mason and Jefferson’s documents.','Mason: Declaration of Rights. Jefferson: Statute for Religious Freedom.'],['Thinking Nat Turner’s Rebellion ended slavery.','It led to harsher laws; slavery lasted until 1865.']],
  tips:['Match each person to their nickname or document.'],
  sum:['Washington: Father of Our Country.','Madison: Father of the Constitution; Henry: liberty speech.','Mason → Bill of Rights ideas; Jefferson → religious freedom.','Westward movement; Nat Turner’s Rebellion, 1831.']});

SG.add('vs7',{title:'Virginia and the Civil War',
  goals:['I can explain how slavery caused the Civil War and why Virginia seceded.','I can identify major battles and leaders.','I can describe the roles of Black Virginians and their allies, and how West Virginia was formed.'],
  words:[['secede','to formally leave a country',''],['Confederacy','the southern states that seceded','capital: Richmond'],['Union','the United States (the North) during the war',''],['abolitionist','a person who worked to end slavery','']],
  pages:[
    {h:'The road to war',p:['<b>Slavery</b> was the main cause of the Civil War. States’ rights and economic differences were secondary factors tied to it.','In <b>1859</b>, abolitionist <b>John Brown</b> raided the arsenal at <b>Harpers Ferry</b>, hoping to start a revolt of enslaved people. He failed and was hanged, but the raid made tensions much worse.','The <b>Underground Railroad</b> was a secret network that helped enslaved people escape to freedom. <b>Harriet Tubman</b> led many people north.'],
     ex:{q:'Why did John Brown’s raid matter?',steps:['He tried to arm enslaved people to rebel.','Southerners grew more afraid and angry; Northerners argued about him.'],a:'It increased tensions between North and South.'},
     chk:{q:'What was the main cause of the Civil War?',a:'slavery',w:['taxes on tea','a dispute with Spain','the price of tobacco'],why:'Slavery was the main cause; other issues were tied to it.'}},
    {h:'Virginia secedes, West Virginia forms',p:['Virginia <b>seceded</b> in <b>1861</b> and joined the Confederacy. <b>Richmond</b> became the Confederate capital.','Many people in western Virginia disagreed with secession. They formed the new state of <b>West Virginia</b>, which joined the Union in <b>1863</b>.','Virginians served on both sides: <b>Robert E. Lee</b> and <b>Thomas “Stonewall” Jackson</b> led Confederate armies, while <b>Winfield Scott</b> was a Union general.'],
     ex:{q:'How was West Virginia created?',steps:['Western counties did not want to secede.','They broke away and became a new Union state in 1863.'],a:'Western Virginia split off and joined the Union.'},
     chk:{q:'Which city was the capital of the Confederacy?',a:'Richmond',w:['Williamsburg','Jamestown','Norfolk'],why:'Richmond served as the Confederate capital.'}},
    {h:'Battles, courage, and the end',p:['Major battles in Virginia included <b>First Manassas (Bull Run)</b> in 1861 and <b>Fredericksburg</b> and <b>Chancellorsville</b>. The war ended when Lee surrendered to Grant at <b>Appomattox Court House</b> in <b>1865</b>.','<b>William Harvey Carney</b> and <b>Powhatan Beaty</b>, Black soldiers born in Virginia, earned the <b>Medal of Honor</b>.','<b>Elizabeth Van Lew</b> and <b>Mary Bowser</b> secretly spied for the Union in Richmond.'],
     dg:()=>sgTimeline([[1859,'Harpers Ferry'],[1861,'secession'],[1863,'W. Virginia'],[1865,'Appomattox']]),
     ex:{q:'Where did the Civil War end?',steps:['Lee surrendered to Grant in 1865.','It happened at a small Virginia town.'],a:'Appomattox Court House, Virginia'},
     chk:{q:'Who spied for the Union inside the Confederate capital?',a:'Elizabeth Van Lew and Mary Bowser',w:['Robert E. Lee and Stonewall Jackson','John Smith and John Rolfe','Patrick Henry and George Mason'],why:'Van Lew and Bowser passed secrets to the Union from Richmond.'}}],
  watch:[['Saying the war was mainly about tariffs or states’ rights alone.','Slavery was the main cause.'],['Forgetting that West Virginia was once part of Virginia.','It split off and joined the Union in 1863.']],
  tips:['Put events in order: Harpers Ferry → secession → West Virginia → Appomattox.'],
  sum:['Slavery caused the war; John Brown 1859.','Virginia seceded 1861; Richmond was the capital.','West Virginia formed 1863.','Ended at Appomattox, 1865.']});

SG.add('vs8',{title:'Reconstruction in Virginia',
  goals:['I can explain what the 13th, 14th, and 15th Amendments did.','I can describe Freedmen’s Schools and life after the war.','I can explain Plessy v. Ferguson and Jim Crow laws.'],
  words:[['Reconstruction','rebuilding the South after the Civil War','1865–1877'],['amendment','a change to the Constitution',''],['segregation','separating people by race',''],['Jim Crow laws','laws that enforced segregation','']],
  pages:[
    {h:'Three amendments',p:['<b>13th Amendment</b> (1865): ended slavery.','<b>14th Amendment</b> (1868): made formerly enslaved people citizens and promised equal protection of the laws.','<b>15th Amendment</b> (1870): said the right to vote could not be denied because of race.'],
     ex:{q:'Which amendment ended slavery?',steps:['Count: 13 — ended slavery; 14 — citizenship; 15 — voting.'],a:'the 13th Amendment'},
     chk:{q:'What did the 15th Amendment do?',a:'protected the right to vote regardless of race',w:['ended slavery','made women able to vote','created the Freedmen’s Bureau'],why:'It said voting rights could not be denied because of race.'}},
    {h:'Rebuilding lives',p:['Virginia’s cities, farms, and railroads were badly damaged. Formerly enslaved people looked for family members, work, and land.','<b>Freedmen’s Schools</b>, many started with help from the Freedmen’s Bureau, taught African Americans to read and write. Hampton Institute (now Hampton University) opened in 1868.','<b>John Mercer Langston</b> became Virginia’s first African American member of Congress, taking his seat in 1890.'],
     ex:{q:'Why were Freedmen’s Schools so important?',steps:['It had been illegal to teach enslaved people to read.','Education opened doors to jobs, voting, and leadership.'],a:'They gave African Americans the education they had been denied.'},
     chk:{q:'Who was Virginia’s first African American member of Congress?',a:'John Mercer Langston',w:['Booker T. Washington','Frederick Douglass','Nat Turner'],why:'Langston represented Virginia in Congress starting in 1890.'}},
    {h:'Segregation and Jim Crow',p:['After Reconstruction, Virginia and other states passed <b>Jim Crow laws</b> that separated Black and white people in schools, trains, and other public places.','In <b>1896</b>, the Supreme Court’s <b>Plessy v. Ferguson</b> decision allowed “separate but equal” facilities. In reality, facilities for Black Virginians were rarely equal.','Poll taxes and literacy tests kept many Black Virginians from voting.'],
     ex:{q:'What did “separate but equal” mean in practice?',steps:['The law said separate places had to be equal.','In reality, Black schools and facilities got far less money.'],a:'Segregation with unequal facilities.'},
     chk:{q:'Which Supreme Court case allowed “separate but equal”?',a:'Plessy v. Ferguson',w:['Brown v. Board of Education','Morgan v. Virginia','Marbury v. Madison'],why:'Plessy v. Ferguson (1896) allowed segregation.'}}],
  watch:[['Mixing up the three amendments.','13 free, 14 citizens, 15 vote.'],['Thinking Plessy ended segregation.','Plessy allowed it; Brown v. Board (1954) began to end it in schools.']],
  tips:['Memory trick: 13 = free, 14 = citizen, 15 = vote.'],
  sum:['13th: ended slavery. 14th: citizenship. 15th: voting.','Freedmen’s Schools brought education.','John Mercer Langston in Congress, 1890.','Plessy (1896) → Jim Crow segregation.']});

SG.add('vs9',{title:'Virginia grows and changes',
  goals:['I can explain how railroads, waterways, industries, and cities grew in the late 1800s.','I can describe Virginia’s change from rural to more urban.'],
  words:[['industry','businesses that make goods','factories, mines'],['rural','in the country, on farms',''],['urban','in cities',''],['port','a harbor where ships load and unload','Norfolk']],
  pages:[
    {h:'Railroads and waterways',p:['After the Civil War, new <b>railroads</b> connected Virginia’s farms, mines, and towns to the rest of the country.','Coal from southwest Virginia traveled by train to ports like <b>Norfolk</b> and Newport News, where ships carried it around the world.'],
     ex:{q:'How did railroads help coal miners in southwest Virginia?',steps:['Coal is heavy and hard to move.','Trains carried it to ports to be sold far away.'],a:'Railroads moved coal to markets and ports.'},
     chk:{q:'Which kind of transportation grew fastest in Virginia in the late 1800s?',a:'railroads',w:['airplanes','highways','canals only'],why:'Railroads expanded quickly after the war.'}},
    {h:'New industries',p:['Factories grew: tobacco products and cigarettes in Richmond, textile mills, iron works, and shipbuilding in Newport News.','Coal mining grew in the Appalachian Plateau.','These jobs drew people from farms into cities.'],
     ex:{q:'Name two industries that grew in Virginia in the late 1800s.',steps:['Coal mining in the southwest.','Tobacco factories and shipbuilding.'],a:'coal mining and tobacco factories (also shipbuilding, textiles)'},
     chk:{q:'Where did shipbuilding grow?',a:'Newport News',w:['the Shenandoah Valley','Roanoke’s mountains','Cumberland Gap'],why:'Newport News, on the water in Hampton Roads, became a shipbuilding center.'}},
    {h:'From farms to cities',p:['Cities like <b>Richmond</b>, <b>Norfolk</b>, and <b>Roanoke</b> (a railroad town) grew quickly.','More people moved from <b>rural</b> farms to <b>urban</b> cities for factory jobs. Life became more connected, but cities also faced crowding.'],
     ex:{q:'Why did Roanoke grow quickly?',steps:['Railroad lines met there.','Railroad shops and jobs brought many workers.'],a:'It became a railroad center.'},
     chk:{q:'Why did many Virginians move to cities in the late 1800s?',a:'to find jobs in factories and industries',w:['to start tobacco farms','because farms were outlawed','to escape the ocean'],why:'New industries created city jobs.'}}],
  watch:[['Thinking Virginia stayed entirely rural.','It became more urban as industries grew.'],['Forgetting why railroads mattered.','Railroads moved coal and goods to ports and connected farms to cities.']],
  tips:['Look for cause and effect: railroads → industry → city growth.'],
  sum:['Railroads connected Virginia.','Coal, tobacco factories, shipbuilding grew.','Richmond, Norfolk, Roanoke grew.','Rural → more urban.']});

SG.add('vs10',{title:'Virginia in the World Wars',
  goals:['I can describe how Virginia prepared for World War I and World War II.','I can describe the contributions of Virginia veterans and Medal of Honor recipients.'],
  words:[['veteran','a person who served in the military',''],['Medal of Honor','the highest U.S. military award for bravery',''],['home front','life and work at home during a war',''],['rationing','limiting how much of some goods people could buy','']],
  pages:[
    {h:'Virginia helps win the wars',p:['Virginia’s location made it important. <b>Hampton Roads</b> grew into a huge Navy and shipbuilding center; Naval Station Norfolk opened in 1917 during World War I.','Training camps and shipyards brought thousands of workers and soldiers.','During World War II, the <b>Pentagon</b>, headquarters of the U.S. military, was built in Arlington, Virginia.'],
     ex:{q:'Why was Hampton Roads important in the World Wars?',steps:['It has a deep, protected harbor on the Atlantic.','The Navy and shipyards were based there.'],a:'It was a major Navy and shipbuilding center.'},
     chk:{q:'What military headquarters was built in Arlington during World War II?',a:'the Pentagon',w:['the White House','the Capitol','Monticello'],why:'The Pentagon was built in Arlington, Virginia, in the early 1940s.'}},
    {h:'The home front',p:['Virginians at home supported the war: women took factory and shipyard jobs, families planted victory gardens, and people bought <b>war bonds</b>.','<b>Rationing</b> limited goods like sugar, gasoline, and rubber so the military had enough.'],
     ex:{q:'How did rationing help the war effort?',steps:['Some goods were needed for soldiers and weapons.','Limiting what families bought saved those goods for the military.'],a:'It saved supplies for the military.'},
     chk:{q:'What did many women do during World War II?',a:'worked in factories and shipyards',w:['stopped working entirely','ran for president','moved to Europe'],why:'Women filled jobs while many men served overseas.'}},
    {h:'Courage and sacrifice',p:['Thousands of Virginians served. The town of <b>Bedford</b> lost more soldiers on D-Day (1944), for its size, than almost any other American community.','<b>Desmond Doss</b> of Lynchburg, an Army medic who refused to carry a weapon, earned the <b>Medal of Honor</b> for saving many wounded soldiers on Okinawa.'],
     ex:{q:'Why is Bedford, Virginia, remembered?',steps:['Many young men from Bedford landed on D-Day.','The town lost an unusually large number of them that day.'],a:'for its great sacrifice on D-Day'},
     chk:{q:'What is the Medal of Honor?',a:'the highest U.S. military award for bravery',w:['an award for good grades','a sports trophy','a medal for voting'],why:'It honors exceptional bravery in combat.'}}],
  watch:[['Thinking only soldiers helped win the wars.','People on the home front worked, saved, and bought war bonds.'],['Thinking the Pentagon is in Washington, D.C.','The Pentagon is in Arlington, Virginia.']],
  tips:['Know what “home front”, rationing, and war bonds mean.'],
  sum:['Hampton Roads: Navy and shipbuilding.','The Pentagon built in Arlington.','Home front: jobs, rationing, war bonds.','Bedford Boys; Medal of Honor heroes like Desmond Doss.']});

SG.add('vs11',{title:'Civil rights in Virginia',
  goals:['I can explain how Black Virginians were kept from voting and from equal schools.','I can explain Brown v. Board of Education and Massive Resistance.','I can describe Virginians who led the fight for civil rights.'],
  words:[['civil rights','the rights of all citizens to equal treatment',''],['desegregation','ending the separation of people by race',''],['Massive Resistance','Virginia leaders’ plan to block school desegregation',''],['disenfranchise','to take away the right to vote','']],
  pages:[
    {h:'Fighting unfair laws',p:['Virginia’s <b>1902 constitution</b> added <b>poll taxes</b> and <b>literacy tests</b> that kept most Black Virginians from voting.','<b>Maggie Walker</b> of Richmond became the first woman in the U.S. to start (charter) a bank, creating opportunity in her community.','<b>Irene Morgan</b> refused to give up her bus seat in 1944. In <b>Morgan v. Virginia</b> (1946), the Supreme Court ruled segregation on buses traveling between states was unconstitutional. <b>Samuel Wilbert Tucker</b> led a 1939 sit-in at the Alexandria library.'],
     ex:{q:'How did poll taxes keep people from voting?',steps:['Voters had to pay a fee.','Many poor citizens, especially Black Virginians, could not afford it.'],a:'They made voting cost money many could not pay.'},
     chk:{q:'Who was the first woman in the United States to charter a bank?',a:'Maggie Walker',w:['Barbara Johns','Irene Morgan','Harriet Tubman'],why:'Maggie Walker founded the St. Luke Penny Savings Bank in Richmond.'}},
    {h:'Barbara Johns and Brown v. Board',p:['In <b>1951</b>, 16-year-old <b>Barbara Johns</b> led a student strike at <b>Robert Russa Moton High School</b> in Farmville, protesting its poor, overcrowded building.','Lawyers <b>Oliver W. Hill, Sr.</b> and Spottswood Robinson took their case to court. It became part of <b>Brown v. Board of Education</b> (<b>1954</b>), when the Supreme Court ruled that segregated public schools were unconstitutional.'],
     ex:{q:'How did students in Farmville help change the nation?',steps:['Barbara Johns led a strike over unequal schools.','Their case became part of Brown v. Board of Education.'],a:'Their case helped end legal school segregation.'},
     chk:{q:'What did Brown v. Board of Education (1954) decide?',a:'Segregated public schools are unconstitutional.',w:['“Separate but equal” is allowed.','Women can vote.','Slavery is illegal.'],why:'Brown overturned “separate but equal” in public schools.'}},
    {h:'Massive Resistance — and progress',p:['Many Virginia leaders answered Brown with <b>Massive Resistance</b>: some schools were closed rather than desegregated. Prince Edward County closed its public schools from 1959 to 1964.','Courts struck down Massive Resistance, and schools slowly desegregated.','Later leaders showed change: Governor <b>A. Linwood Holton, Jr.</b> sent his children to integrated public schools (1970); <b>L. Douglas Wilder</b> became the first elected African American governor in the U.S. (1989); <b>Arthur Ashe</b> of Richmond became a tennis champion and activist.'],
     ex:{q:'What did Prince Edward County do during Massive Resistance?',steps:['It refused to desegregate.','It closed all its public schools for five years.'],a:'It closed its public schools (1959–1964).'},
     chk:{q:'Who became the first elected African American governor in the U.S.?',a:'L. Douglas Wilder',w:['Oliver Hill','Linwood Holton','Arthur Ashe'],why:'Wilder was elected governor of Virginia in 1989.'}}],
  watch:[['Thinking schools desegregated right after Brown.','Virginia resisted for years with Massive Resistance.'],['Mixing up Plessy and Brown.','Plessy (1896) allowed segregation; Brown (1954) ruled school segregation unconstitutional.']],
  tips:['Match each person to what they did.'],
  sum:['Poll taxes and literacy tests blocked voting.','Barbara Johns (1951) → Brown v. Board (1954).','Massive Resistance closed schools.','Leaders: Walker, Morgan, Tucker, Hill, Holton, Wilder, Ashe.']});

SG.add('vs12',{title:'Mother of Presidents',
  goals:['I can explain why Virginia is called the “Mother of Presidents.”','I can name the eight presidents born in Virginia.'],
  words:[['president','the leader of the executive branch of the U.S. government',''],['nickname','another name that describes something','“Mother of Presidents”'],['Monroe Doctrine','President Monroe’s warning to Europe not to start new colonies in the Americas','1823']],
  pages:[
    {h:'Eight presidents',p:['Virginia is called the “<b>Mother of Presidents</b>” because <b>eight</b> U.S. presidents were born here — more than in any other state.','They are: <b>George Washington, Thomas Jefferson, James Madison, James Monroe, William Henry Harrison, John Tyler, Zachary Taylor,</b> and <b>Woodrow Wilson</b>.'],
     ex:{q:'Why is Virginia called the “Mother of Presidents”?',steps:['Count the presidents born there: eight.','That is more than any other state.'],a:'Eight presidents were born in Virginia, the most of any state.'},
     chk:{q:'How many U.S. presidents were born in Virginia?',a:'8',w:['4','12','2'],why:'Washington, Jefferson, Madison, Monroe, W. H. Harrison, Tyler, Taylor, and Wilson.'}},
    {h:'The early four',p:['Four of the first five presidents were Virginians: <b>Washington</b> (1st), <b>Jefferson</b> (3rd), <b>Madison</b> (4th), and <b>Monroe</b> (5th).','Monroe is known for the Monroe Doctrine, warning Europe not to start new colonies in the Americas.'],
     ex:{q:'Which of the first five presidents was NOT from Virginia?',steps:['1 Washington (VA), 2 John Adams (Massachusetts), 3 Jefferson (VA), 4 Madison (VA), 5 Monroe (VA).'],a:'John Adams'},
     chk:{q:'Who was the first president of the United States?',a:'George Washington',w:['Thomas Jefferson','James Monroe','Woodrow Wilson'],why:'Washington, a Virginian, was the first president.'}},
    {h:'The later four',p:['<b>William Henry Harrison</b> (9th) served only one month before he died. <b>John Tyler</b> (10th) then became president. <b>Zachary Taylor</b> (12th) was a war hero.','<b>Woodrow Wilson</b> (28th), born in Staunton, led the country during World War I.'],
     ex:{q:'Which Virginia-born president led the U.S. in World War I?',steps:['World War I was 1914–1918.','Woodrow Wilson was president then.'],a:'Woodrow Wilson'},
     chk:{q:'Which president was born in Staunton, Virginia?',a:'Woodrow Wilson',w:['John Tyler','James Madison','Zachary Taylor'],why:'Wilson was born in Staunton in 1856.'}}],
  watch:[['Counting presidents who lived in Virginia but were born elsewhere.','“Mother of Presidents” counts presidents BORN in Virginia.'],['Thinking all of the first five presidents were Virginians.','John Adams (2nd) was from Massachusetts.']],
  tips:['Learn the eight names as a list: Washington, Jefferson, Madison, Monroe, Harrison, Tyler, Taylor, Wilson.'],
  sum:['8 presidents were born in Virginia — the most of any state.','Early: Washington, Jefferson, Madison, Monroe.','Later: W. H. Harrison, Tyler, Taylor, Wilson.','Wilson led during World War I.']});

SG.add('vs13',{title:'Virginia’s economy today',
  goals:['I can name major products and industries in Virginia.','I can explain how Virginians’ ideas and innovations reach the world.'],
  words:[['economy','how people make, buy, and sell goods and services',''],['industry','a group of businesses that make similar goods or services',''],['export','something sold to another country',''],['innovation','a new idea or invention','']],
  pages:[
    {h:'What Virginia produces',p:['Agriculture is still important. <b>Chickens</b> (broilers) are one of Virginia’s top farm products; others include beef cattle, soybeans, dairy, and tobacco.','Forests provide lumber and wood products. The <b>Port of Virginia</b> in Hampton Roads ships goods all over the world.'],
     ex:{q:'How do Virginia’s products reach other countries?',steps:['Goods travel by train and truck to Hampton Roads.','Ships at the Port of Virginia carry them overseas.'],a:'through the Port of Virginia'},
     chk:{q:'Which is one of Virginia’s top farm products?',a:'chickens (broilers)',w:['oranges','rice','coffee'],why:'Broilers are one of Virginia’s biggest agricultural products.'}},
    {h:'Major industries',p:['<b>Government and the military</b>: the Pentagon and Naval Station Norfolk, the world’s largest naval base.','<b>Technology</b>: Northern Virginia has one of the world’s largest concentrations of data centers that power the internet.','<b>Shipbuilding</b> (Newport News builds aircraft carriers and submarines) and <b>tourism</b> (historic sites, beaches, mountains).'],
     ex:{q:'Why does the government provide so many jobs in Virginia?',steps:['Virginia is next to Washington, D.C.','It has the Pentagon and major military bases.'],a:'Its location near D.C. and its military bases'},
     chk:{q:'Which industry is Northern Virginia especially known for today?',a:'data centers and technology',w:['coal mining','cotton farming','whaling'],why:'Northern Virginia has one of the world’s largest concentrations of data centers.'}},
    {h:'Ideas that reach the world',p:['Virginians create new technology, medicine, and businesses that are used around the globe.','Universities and research centers in Virginia train workers and invent new things. Trade connects Virginia to the global economy.'],
     ex:{q:'How can an idea from Virginia affect the world?',steps:['A company invents a new product or service.','It is sold or used in other countries.'],a:'Innovations are shared and sold worldwide.'},
     chk:{q:'What is an export?',a:'a product sold to another country',w:['a product bought from another country','a tax on goods','a kind of farm'],why:'Exports go out of the country; imports come in.'}}],
  watch:[['Thinking Virginia’s economy is only farming.','It includes government, military, technology, shipbuilding, ports, and tourism.'],['Mixing up exports and imports.','Exports go out to other countries; imports come in.']],
  tips:['Know examples of products and industries for each region.'],
  sum:['Farm products: chickens, beef, soybeans, dairy.','Government and military; Naval Station Norfolk.','Technology and data centers; shipbuilding; tourism.','The Port of Virginia connects to the world.']});

SG.add('vs_sk',{title:'History skills',
  goals:['I can read maps using a compass rose, legend, and scale.','I can read and make timelines.','I can tell primary from secondary sources and explain cause and effect.'],
  words:[['primary source','made by someone who was there at the time','a letter, diary, photo'],['secondary source','made later by someone who was not there','a textbook'],['compass rose','shows directions on a map','N, S, E, W'],['legend (key)','explains the symbols on a map',''],['cause and effect','why something happened, and what happened because of it','']],
  pages:[
    {h:'Reading maps',p:['The <b>compass rose</b> shows north, south, east, and west.','The <b>legend</b> (key) explains the symbols and colors.','The <b>scale</b> shows how distance on the map compares to real distance.'],
     ex:{q:'A map scale says 1 inch = 50 miles. Two cities are 3 inches apart. How far apart are they really?',steps:['Each inch stands for 50 miles.','3 × 50 = 150.'],a:'150 miles'},
     chk:{q:'Which map part explains what the symbols mean?',a:'the legend',w:['the compass rose','the scale','the title'],why:'The legend (key) tells what each symbol and color means.'}},
    {h:'Timelines',p:['A timeline shows events in order. Earlier dates are on the left.','To find how long between two events, subtract the years.'],
     dg:()=>sgTimeline([[1607,'Jamestown'],[1619,'Assembly'],[1699,'Williamsburg'],[1781,'Yorktown']]),
     ex:{q:'How many years passed between Jamestown (1607) and Yorktown (1781)?',steps:['Subtract: 1781 − 1607.'],a:'174 years'},
     chk:{q:'Which event happened first?',a:'Jamestown is founded',w:['the Battle of Yorktown','the capital moves to Williamsburg','the General Assembly first meets'],why:'Jamestown was 1607 — the earliest date.'}},
    {h:'Sources, and cause and effect',p:['A <b>primary source</b> comes from the time: a diary, letter, photo, or artifact. A <b>secondary source</b> was made later by someone who studied it, like a textbook.','<b>Cause</b>: why something happened. <b>Effect</b>: what happened as a result. Words like “because” and “so” are clues.'],
     ex:{q:'Is John Smith’s own map of Virginia from 1612 a primary or secondary source?',steps:['John Smith made it himself at the time.'],a:'primary source'},
     chk:{q:'Tobacco sold for a lot of money, so more settlers came to Virginia. What is the cause?',a:'Tobacco sold for a lot of money.',w:['More settlers came to Virginia.','Jamestown was founded.','The capital moved.'],why:'The cause is why it happened; more settlers coming is the effect.'}}],
  watch:[['Calling a textbook a primary source.','Textbooks are secondary sources — written later.'],['Reading a timeline from right to left.','Earlier events are on the left.']],
  tips:['Skills questions use maps, charts, timelines, and quotes from primary sources.'],
  sum:['Compass rose, legend, scale.','Timelines: earlier on the left; subtract to find years between.','Primary = from the time; secondary = written later.','Cause → effect.']});

['vs1','vs2','vs3','vs4','vs5','vs6','vs7','vs8','vs9','vs10','vs11','vs12','vs13','vs_sk'].forEach(g=>{SG_SPRITE[g]='sg_g4hist';});
