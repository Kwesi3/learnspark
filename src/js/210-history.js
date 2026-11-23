// ═══════════════════════════════════════════════════════════════
// HISTORY & SOCIAL SCIENCE — Virginia 2023 History and Social Science SOL.
// Grade 4: Virginia Studies (VS.1–VS.13). Grade 6: U.S. History 1865 to the
// Present (USII.1–USII.8). All questions are original.
// Item: [question, answer, [wrong answers], why, hint]
//   or {t:'multi', q, o:[...], a:[...correct], e, h}   (select all that apply)
//   or {t:'order', q, items:[...in correct order], e, h} (put in order)
// ═══════════════════════════════════════════════════════════════
const HIST_STRANDS={
 4:[
  {code:'VS.1',name:'Virginia’s Geography',desc:'Regions, neighbors, and waterways',gen:'vs1'},
  {code:'VS.2',name:'Indigenous Peoples',desc:'Language groups, life around 1600, and today',gen:'vs2'},
  {code:'VS.3',name:'Jamestown',desc:'Why the English came, hardships, 1619',gen:'vs3'},
  {code:'VS.4',name:'Colonial Virginia',desc:'Farming, trade, and daily life',gen:'vs4'},
  {code:'VS.5',name:'The American Revolution',desc:'Causes, Virginians, and Yorktown',gen:'vs5'},
  {code:'VS.6',name:'A New Nation',desc:'Founding documents and government',gen:'vs6'},
  {code:'VS.7',name:'The Civil War',desc:'Causes, battles, and people',gen:'vs7'},
  {code:'VS.8',name:'Reconstruction',desc:'Amendments, Freedmen’s Schools, Jim Crow',gen:'vs8'},
  {code:'VS.9',name:'Growth and Change',desc:'Railroads, industry, and cities',gen:'vs9'},
  {code:'VS.10',name:'Virginians in the 1900s',desc:'World wars and modern leaders',gen:'vs10'},
  {code:'VS.11',name:'Civil Rights in Virginia',desc:'Desegregation and Massive Resistance',gen:'vs11'},
  {code:'VS.12',name:'Mother of Presidents',desc:'Presidents born in Virginia',gen:'vs12'},
  {code:'VS.13',name:'Virginia’s Economy Today',desc:'Products, industries, and ideas',gen:'vs13'},
  {code:'VS Skills',name:'History Skills',desc:'Maps, timelines, and primary sources',gen:'vs_sk'},
 ],
 6:[
  {code:'USII.1',name:'Westward Expansion',desc:'Settlers, railroads, and Indigenous Peoples',gen:'us1'},
  {code:'USII.2',name:'Reconstruction',desc:'Amendments, leaders, and Jim Crow',gen:'us2'},
  {code:'USII.3',name:'Industry and Immigration',desc:'Inventions, cities, and newcomers',gen:'us3'},
  {code:'USII.4',name:'A World Power',desc:'Spanish-American War and World War I',gen:'us4'},
  {code:'USII.5',name:'Early 1900s Change',desc:'Great Migration, 1920s, Depression, New Deal',gen:'us5'},
  {code:'USII.6',name:'World War II',desc:'Causes, turning points, home front',gen:'us6'},
  {code:'USII.7',name:'The Cold War and Beyond',desc:'UN, NATO, Cold War, and 9/11',gen:'us7'},
  {code:'USII.8',name:'Modern America',desc:'Civil rights, science, and society',gen:'us8'},
  {code:'USII Skills',name:'History Skills',desc:'Timelines, sources, cause and effect',gen:'us_sk'},
 ]};
const HIST_BANK={
 vs1:[
  ['Which body of water forms much of Virginia’s eastern border?','The Atlantic Ocean',['The Gulf of Mexico','The Pacific Ocean','Lake Erie'],'Virginia’s Coastal Plain meets the Atlantic Ocean and the Chesapeake Bay.','Think east, toward the beaches.'],
  ['Which region of Virginia is flat, low land along the coast and the Chesapeake Bay?','Coastal Plain (Tidewater)',['Blue Ridge Mountains','Appalachian Plateau','Valley and Ridge'],'The Coastal Plain, also called Tidewater, is low and flat, and tides rise and fall in its rivers.','Its other name has “tide” in it.'],
  ['What is the Fall Line?','Where rivers drop to the Coastal Plain, making waterfalls ships could not pass',['A line of mountains in the west','The border with North Carolina','A railroad line'],'At the Fall Line, rivers tumble over rocks. Ships had to stop, so cities like Richmond grew there.','Picture a river “falling” over rocks.'],
  ['Which region is known for coal mining in southwestern Virginia?','Appalachian Plateau',['Coastal Plain','Piedmont','Blue Ridge Mountains'],'The Appalachian Plateau, Virginia’s smallest region, is known for coal.','It is the farthest west region.'],
  ['The Shenandoah Valley, with rich farmland, is part of which region?','Valley and Ridge',['Coastal Plain','Piedmont','Appalachian Plateau'],'The Valley and Ridge region has fertile valleys like the Shenandoah, good for farming.','The answer has “valley” in its name.'],
  ['Which region lies between the Coastal Plain and the Blue Ridge Mountains, with rolling hills?','Piedmont',['Appalachian Plateau','Valley and Ridge','Tidewater'],'The Piedmont, meaning “foot of the mountains,” has rolling hills and is Virginia’s largest region.','Its name means “foot of the mountain.”'],
  ['Which river flows past Jamestown and Richmond into the Chesapeake Bay?','James River',['Mississippi River','Ohio River','Shenandoah River'],'The James River was a highway for ships and trade from early colonial times.','It is named after an English king.'],
  {t:'multi',q:'Which states border Virginia? Choose all that are correct.',o:['Maryland','North Carolina','Kentucky','Florida','Ohio'],a:['Maryland','North Carolina','Kentucky'],e:'Virginia’s neighbors are Maryland, West Virginia, Kentucky, Tennessee, North Carolina, and Washington, D.C. Florida and Ohio do not touch Virginia.',h:'Florida is far south. Ohio touches West Virginia, not Virginia.'},
  {t:'order',q:'Put Virginia’s regions in order from EAST (the coast) to WEST.',items:['Coastal Plain','Piedmont','Blue Ridge Mountains','Valley and Ridge','Appalachian Plateau'],e:'From the coast going west: Coastal Plain, Piedmont, Blue Ridge Mountains, Valley and Ridge, Appalachian Plateau.',h:'Start at the ocean and walk toward the mountains.'},
 ],
 vs2:[
  ['Which Indigenous language group lived mostly in the Coastal Plain, including the Powhatan?','Algonquian',['Iroquoian','Siouan','Aztec'],'The Powhatan people spoke Algonquian languages and lived in the Coastal Plain.','Think of the people who met the Jamestown settlers.'],
  ['The Monacan people of the Piedmont spoke a language from which group?','Siouan',['Algonquian','Iroquoian','Inca'],'The Monacan lived in the Piedmont and spoke a Siouan language.','Algonquian was the coast. The Monacan lived inland.'],
  ['The Cherokee in southwestern Virginia spoke a language from which group?','Iroquoian',['Algonquian','Siouan','Spanish'],'The Cherokee spoke an Iroquoian language.','It is the group not tied to the coast or Piedmont.'],
  ['What was Werowocomoco?','The capital town of the Powhatan chiefdom',['An English fort','A Spanish ship','A colonial church'],'Werowocomoco, on the York River, was Chief Powhatan’s capital. Archaeologists have studied artifacts found there.','It was home to a powerful chief.'],
  ['What can archaeologists learn from artifacts such as pottery and tools?','How people lived long ago',['What the weather will be tomorrow','How to build a computer','Who will win an election'],'Artifacts are objects people made and used, so they show how people lived.','An artifact is something people made.'],
  ['How did Indigenous peoples of Virginia get food around 1600?','By farming, hunting, fishing, and gathering',['By buying food at stores','Only by trading with England','By importing food from Spain'],'They grew corn, beans, and squash, hunted deer, fished the rivers, and gathered plants.','They used the land and water around them.'],
  ['Which is true about Virginia Indians today?','Indigenous nations still live in Virginia, and several are recognized by the U.S. government',['They all left Virginia in 1607','They no longer exist','They live only in museums'],'Many Indigenous nations, such as the Pamunkey and the Monacan, are part of Virginia today.','The standards ask about the past AND the present.'],
 ],
 vs3:[
  ['In what year was Jamestown, the first permanent English settlement in North America, founded?','1607',['1492','1776','1865'],'English colonists arrived at Jamestown in 1607.','It was more than 150 years before the Declaration of Independence.'],
  ['What was a main reason the Virginia Company sent colonists to Virginia?','To make money, for example by finding gold and new trade',['To build a ski resort','To start a new country right away','To escape a hurricane'],'The Virginia Company of London was a business that hoped to make a profit. Spreading Christianity and competing with Spain were reasons too.','The Virginia Company was a business.'],
  ['Why did the colonists choose the Jamestown site?','The deep water let ships dock close, and it could be defended',['It had no mosquitoes','It had the best farmland in Virginia','It was far from any water'],'The site had deep water for ships and was easy to defend, but its swampy land and bad water caused sickness.','Think about ships and safety.'],
  ['What was the “Starving Time” at Jamestown?','A winter when many colonists died from hunger and disease',['A holiday feast','The time ships brought extra food','A famous play'],'In the winter of 1609–1610, food ran out and most colonists died.','The name tells you what happened.'],
  ['Which crop helped Jamestown survive by making money for the colony?','Tobacco',['Cotton','Rice','Oranges'],'John Rolfe grew a sweeter tobacco that sold well in England, bringing money to the colony.','English people paid a lot for it.'],
  ['Why is the General Assembly of 1619 important?','It was the first elected lawmaking body in English America',['It ended the colony','It was the first Thanksgiving','It started the Civil War'],'In 1619 colonists elected representatives to make laws. Virginia’s General Assembly still meets today.','“Assembly” means people meeting to make decisions.'],
  ['Who helped the Jamestown colonists survive the first years by trading food?','The Powhatan people',['The Spanish army','The French navy','People from China'],'The Powhatan traded corn and other food, though relations also included conflict.','Who already lived nearby?'],
  {t:'multi',q:'Which groups arrived at Jamestown in 1619? Choose all that are correct.',o:['The first recorded Africans','Women recruited to build families','Soldiers from France','Spanish missionaries'],a:['The first recorded Africans','Women recruited to build families'],e:'In 1619 the first recorded Africans were brought to Virginia, and women were recruited to help make the colony permanent.',h:'1619 brought big changes to who lived in Jamestown.'},
 ],
 vs4:[
  ['What was the main crop grown for money (cash crop) in colonial Virginia?','Tobacco',['Wheat bread','Apples','Coffee'],'Tobacco was Virginia’s main cash crop and was even used like money.','It made Jamestown successful too.'],
  ['How was an indentured servant different from an enslaved person?','An indentured servant worked for a set number of years and then became free',['An indentured servant was enslaved for life','There was no difference','Indentured servants were paid a salary'],'Indentured servants agreed to work for several years to pay for their trip. Enslaved people were held for life, and their children were enslaved too.','One had an end date. One did not.'],
  ['Why did the capital move from Jamestown to Williamsburg?','Jamestown’s statehouse burned, and Williamsburg was healthier and on higher ground',['Williamsburg was by the ocean','The king lived in Williamsburg','Jamestown ran out of tobacco'],'After a fire at Jamestown, the capital moved to Williamsburg, which was safer and healthier.','Think about a fire and swampy land.'],
  ['Colonists often traded goods without money. What is this called?','Barter',['Taxes','Banking','Voting'],'Bartering means trading goods or services directly, like tobacco for tools.','It means a direct swap.'],
  ['How did colonial Virginia’s culture blend different groups?','Indigenous, European, and African people shaped food, farming, music, and language',['Only English customs were used','Everyone spoke Spanish','No one shared any customs'],'Corn and canoes came from Indigenous peoples, many farming skills and music from Africans, and laws and language from Europeans.','Think about three groups of people.'],
 ],
 vs5:[
  ['Why were many colonists angry with Great Britain before the Revolution?','They were taxed without having representatives in Parliament',['Britain gave them free land','Britain ended all taxes','Britain moved the capital to Richmond'],'“No taxation without representation” meant colonists wanted a voice in making the laws that taxed them.','Remember the famous slogan about taxes.'],
  ['Which Virginian said, “Give me liberty, or give me death!”?','Patrick Henry',['George Washington','Thomas Jefferson','James Madison'],'Patrick Henry gave this speech in 1775 to push Virginia to prepare for war.','He was known as a powerful speaker.'],
  ['Which Virginian wrote the Declaration of Independence?','Thomas Jefferson',['Patrick Henry','John Smith','Robert E. Lee'],'Thomas Jefferson wrote the Declaration of Independence in 1776.','He later became the third president.'],
  ['What role did George Washington play in the Revolution?','He commanded the Continental Army',['He wrote the Declaration','He was king of England','He was a British general'],'Washington led the American army and later became the first president.','He was a military leader.'],
  ['James Armistead Lafayette, an enslaved Virginian, helped win the war by…','Spying on the British',['Writing the Constitution','Leading the British army','Building the first railroad'],'James Armistead Lafayette pretended to work for the British and passed their plans to the Americans.','His information helped at Yorktown.'],
  ['Why was the Battle of Yorktown important?','The British surrendered there, ending major fighting in the war',['It started the war','The British won it','It was a battle of the Civil War'],'In 1781, the British army surrendered at Yorktown, Virginia.','It was near the END of the war.'],
  ['Why did Virginia’s capital move from Williamsburg to Richmond during the war?','Richmond was more central and safer from British attack',['Richmond was by the ocean','Williamsburg had no roads','The king ordered it'],'Richmond was farther inland and more central for Virginians.','Think about safety during a war.'],
  {t:'order',q:'Put these events in the order they happened.',items:['Colonists protest taxes without representation','Patrick Henry’s “Give me liberty” speech','The Declaration of Independence','British surrender at Yorktown'],e:'Protests over taxes came first, then Patrick Henry’s speech (1775), the Declaration (1776), and Yorktown (1781).',h:'Anger came first, then words, then the end of the war.'},
 ],
 vs6:[
  ['Who is called the “Father of the Constitution”?','James Madison',['George Washington','Patrick Henry','Thomas Jefferson'],'James Madison of Virginia helped plan and write the U.S. Constitution.','He was the fourth president.'],
  ['The Virginia Declaration of Rights, written by George Mason, influenced which U.S. document?','The Bill of Rights',['The Emancipation Proclamation','The Treaty of Paris','The Monroe Doctrine'],'Mason’s list of rights helped shape the Bill of Rights, the first ten amendments.','Both documents list people’s rights.'],
  ['The Virginia Statute for Religious Freedom, by Thomas Jefferson, is about…','People’s right to choose their own religion',['Paying taxes on tea','Moving the capital','Building canals'],'It said government could not force people to follow a religion, an idea later in the First Amendment.','Look at the word “religious.”'],
  ['Which branch of government makes laws?','Legislative',['Executive','Judicial','Military'],'The legislative branch (Congress, or Virginia’s General Assembly) makes laws.','“Legislate” means to make laws.'],
  ['Which branch carries out, or enforces, laws?','Executive',['Legislative','Judicial','Royal'],'The executive branch is led by the president, or the governor in Virginia.','The president and governor lead it.'],
  ['Which branch decides what laws mean and whether they are fair?','Judicial',['Executive','Legislative','Colonial'],'The judicial branch is made up of the courts.','Think of judges.'],
  ['What happened after Nat Turner’s Rebellion in 1831?','Virginia passed harsher laws restricting enslaved and free Black people',['Slavery ended in Virginia','The Civil War began that year','Virginia became a new country'],'After the rebellion, Virginia made laws that limited education, travel, and gatherings of Black Virginians.','The government responded by tightening control.'],
  ['In the early 1800s, why did many Virginians move west?','To find new farmland, helped by new roads, canals, and railroads',['To find the ocean','Because the king ordered it','To escape the Civil War'],'Worn-out soil and new transportation encouraged people to move west for land.','Think about land and transportation.'],
 ],
 vs7:[
  ['What was John Brown’s raid on Harpers Ferry in 1859?','An attempt to start an uprising against slavery',['A battle of the Revolution','A railroad opening','A treaty signing'],'John Brown attacked the arsenal at Harpers Ferry hoping to arm enslaved people. It increased tension before the war.','It was about ending slavery.'],
  ['What was the main cause of the Civil War?','Disagreements over slavery',['Taxes on tea','A fight over fishing rights','The election of George Washington'],'Slavery was the central cause, along with arguments over states’ rights to keep it.','Think about the biggest issue dividing North and South.'],
  ['Why did West Virginia become a separate state?','People in western Virginia disagreed with secession and stayed loyal to the Union',['They wanted to join Mexico','They wanted a new capital at Yorktown','They wanted to leave the United States'],'Western counties broke away from Virginia and became West Virginia in 1863.','They did not want to leave the Union.'],
  ['What was the first major battle of the Civil War, fought in Virginia?','First Battle of Manassas (Bull Run)',['Yorktown','Gettysburg','Jamestown'],'The first major battle was at Manassas in 1861.','It has two names.'],
  ['Where did General Lee surrender to General Grant in 1865?','Appomattox Court House, Virginia',['Richmond Harbor','Jamestown','Boston'],'Lee’s surrender at Appomattox Court House ended the war in Virginia.','It is a court house in central Virginia.'],
  ['William Harvey Carney, who escaped slavery in Norfolk, is remembered because he…','Earned the Medal of Honor for bravery',['Became president','Led the Confederate army','Invented the railroad'],'Sergeant Carney saved his regiment’s flag in battle and received the Medal of Honor.','He was honored for bravery.'],
  ['What was the Underground Railroad?','A secret network that helped enslaved people escape to freedom',['A subway in Richmond','A railroad built underground','A Confederate supply line'],'Harriet Tubman and others guided people north along secret routes and safe houses.','It was neither underground nor a railroad.'],
  ['Which city was the capital of the Confederacy?','Richmond',['Washington, D.C.','Atlanta','Norfolk'],'Richmond, Virginia, was the Confederate capital.','It is Virginia’s capital today too.'],
 ],
 vs8:[
  ['What did the Thirteenth Amendment do?','Ended slavery in the United States',['Gave women the right to vote','Created the Army','Moved the capital'],'Ratified in 1865, the Thirteenth Amendment abolished slavery.','It came right after the war.'],
  ['What did the Fourteenth Amendment do?','Made formerly enslaved people citizens with equal protection of the laws',['Ended the Civil War','Banned all taxes','Created West Virginia'],'The Fourteenth Amendment gave citizenship and equal protection under the law.','Think “citizenship.”'],
  ['What did the Fifteenth Amendment do?','Said men could not be denied the vote because of race',['Gave everyone a free farm','Ended Prohibition','Created the courts'],'The Fifteenth Amendment protected voting rights for men of all races.','It is about voting.'],
  ['What were Freedmen’s Schools?','Schools that helped formerly enslaved people learn to read and write',['Schools for soldiers only','Private schools for the wealthy','Schools for learning to farm tobacco'],'Freedmen’s Schools gave education to people who had been denied it under slavery.','“Freedmen” means formerly enslaved people.'],
  ['What did the Supreme Court decide in Plessy v. Ferguson (1896)?','Separate facilities for Black and white people were allowed if they were “equal”',['Segregation was against the law','Women could vote','Slavery was legal'],'The “separate but equal” ruling allowed segregation, which was unfair in practice.','Remember the phrase “separate but equal.”'],
  ['What were Jim Crow laws?','Laws that segregated Black and white people and limited Black citizens’ rights',['Laws about farming','Laws protecting birds','Laws that ended slavery'],'Jim Crow laws kept people separated in schools, trains, and other places, and made voting harder.','These laws were about segregation.'],
 ],
 vs9:[
  ['How did railroads change Virginia after the Civil War?','They connected cities and helped businesses ship goods',['They stopped all trade','They replaced all farms','They ended the use of rivers completely'],'New railroads carried coal, tobacco, and other goods, helping cities and industries grow.','Think about moving goods.'],
  ['During the late 1800s, many Virginians moved from farms to cities. Why?','To find jobs in new factories and businesses',['Because cities had more farmland','Because farms were moved to cities','To escape the Revolution'],'Factories and railroads created jobs in cities like Richmond and Norfolk.','People follow jobs.'],
  ['Coal from which region helped Virginia’s industries grow?','Appalachian Plateau',['Coastal Plain','Piedmont','Chesapeake Bay'],'Coal mined in the Appalachian Plateau was carried by railroads to ports and factories.','It is in the far southwest.'],
  ['Which city grew as a major port where ships and railroads met?','Norfolk',['Roanoke Mountain','Staunton','Jamestown'],'Norfolk, near the Chesapeake Bay, became a busy port.','It is on the coast.'],
  ['What does it mean that Virginia changed from a rural to an urban society?','More people lived in cities instead of on farms',['Everyone moved to the mountains','Farms got bigger','The population got smaller'],'“Rural” means countryside. “Urban” means city.','Urban = city.'],
 ],
 vs10:[
  ['Woodrow Wilson, born in Staunton, Virginia, was president during…','World War I',['The Revolution','The Civil War','The Cold War only'],'Woodrow Wilson led the nation during World War I and helped plan the League of Nations.','He was president in the 1910s.'],
  ['Richard E. Byrd, a Virginian, is famous for…','Leading flights and expeditions to Antarctica as a Navy aviator and explorer',['Writing the Constitution','Founding Jamestown','Inventing the telephone'],'Byrd was a naval officer and aviator who led expeditions to Antarctica.','Think cold, faraway places.'],
  ['Lewis B. “Chesty” Puller, born in Virginia, is known as…','One of the most decorated Marines in U.S. history',['A famous painter','A president','A colonial governor'],'Puller served in World War II and Korea and received many awards for bravery.','He was in the Marine Corps.'],
  ['George C. Marshall, a graduate of the Virginia Military Institute, created a plan to…','Help rebuild Europe after World War II',['Build the first railroad','Explore the moon','Start the Revolution'],'The Marshall Plan gave aid to rebuild Europe, and Marshall won the Nobel Peace Prize.','It is called the Marshall Plan.'],
 ],
 vs11:[
  ['In 1951, high school student Barbara Johns led a strike at Moton High School in Farmville to protest…','Unequal, overcrowded school buildings for Black students',['A ban on sports','Higher bus fares','The end of summer break'],'Her protest led to a court case that became part of Brown v. Board of Education.','Look at what was unequal.'],
  ['What did the Supreme Court decide in Brown v. Board of Education (1954)?','Segregated public schools were unconstitutional',['Schools must close on Fridays','Segregation was allowed','Only private schools were legal'],'The Court said “separate but equal” schools were not equal and must end.','It overturned the idea from Plessy v. Ferguson.'],
  ['What was “Massive Resistance”?','Virginia leaders’ plan to block school desegregation',['A plan to build more schools','A protest for women’s voting','A World War II battle'],'Some leaders closed schools rather than integrate them. Prince Edward County closed its public schools for five years.','It means resisting a change.'],
  ['In 1989, L. Douglas Wilder made history when he was elected…','The first African American governor of a U.S. state',['The first president from Virginia','A Supreme Court judge in 1607','Mayor of London'],'Wilder was elected governor of Virginia in 1989 and took office in 1990.','He led Virginia’s executive branch.'],
  ['Oliver Hill was an important Virginian in the Civil Rights Era because he…','Was a lawyer who fought segregation in court',['Invented the steamboat','Led the Confederate army','Founded Jamestown'],'Oliver Hill worked on cases challenging school segregation, including one that became part of Brown v. Board.','He worked in the courts.'],
  ['Maggie L. Walker of Richmond is remembered because she…','Was the first woman to charter (start) a bank in the United States',['Was the first female president','Wrote the Declaration of Independence','Explored Antarctica'],'She founded the St. Luke Penny Savings Bank in 1903 to help Black families save and borrow.','Think about money and business.'],
 ],
 vs12:[
  ['Why is Virginia called the “Mother of Presidents”?','More presidents were born in Virginia than in any other state',['All presidents live there','The White House is in Virginia','Every president went to school there'],'Eight presidents were born in Virginia.','Think about where presidents were born.'],
  ['Who was the first president of the United States, born in Virginia?','George Washington',['Abraham Lincoln','John Adams','Woodrow Wilson'],'George Washington was born in Westmoreland County, Virginia.','He commanded the army in the Revolution.'],
  {t:'multi',q:'Which presidents were born in Virginia? Choose all that are correct.',o:['Thomas Jefferson','James Monroe','Abraham Lincoln','Woodrow Wilson','John F. Kennedy'],a:['Thomas Jefferson','James Monroe','Woodrow Wilson'],e:'Virginia-born presidents: Washington, Jefferson, Madison, Monroe, William Henry Harrison, Tyler, Taylor, and Wilson. Lincoln was born in Kentucky and Kennedy in Massachusetts.',h:'Lincoln and Kennedy were from other states.'},
  ['Dolley Madison, wife of James Madison, is famous for…','Saving a portrait of George Washington when the British burned the White House',['Writing the Bill of Rights','Leading the army at Yorktown','Founding Williamsburg'],'During the War of 1812, she rescued the painting before the British arrived.','It happened during the War of 1812.'],
 ],
 vs13:[
  ['Which is an important Virginia product from the Chesapeake Bay?','Seafood such as crabs and oysters',['Coal','Oranges','Gold'],'The Chesapeake Bay supports fishing for blue crabs, oysters, and more.','It comes from the water.'],
  ['Which industry brings many visitors to places like Williamsburg and Virginia Beach?','Tourism',['Mining','Steelmaking','Coal shipping'],'Historic sites, beaches, and mountains make tourism a major industry.','Think about visitors.'],
  ['Northern Virginia has many companies that work with computers and the internet. This is the…','Technology industry',['Fishing industry','Tobacco industry','Textile industry'],'Northern Virginia is home to many tech companies and data centers.','Computers = technology.'],
  ['Why is Hampton Roads important to Virginia’s economy?','It has busy ports and large Navy bases',['It is the largest coal mine','It has the tallest mountains','It grows the most apples'],'The Port of Virginia and the Navy create many jobs there.','It is on the coast.'],
  ['When Virginia sells goods like soybeans and wood to other countries, it is…','Exporting',['Importing','Bartering','Taxing'],'Exports are goods sold to other countries.','“Ex” means out.'],
 ],
 vs_sk:[
  ['On a map, what does the compass rose show?','Directions: north, south, east, and west',['How far apart places are','What the symbols mean','The population'],'The compass rose shows cardinal directions.','Think about “which way.”'],
  ['Which part of a map explains what the symbols mean?','The legend (key)',['The compass rose','The title','The scale'],'The legend, or key, tells what each symbol and color stands for.','It “unlocks” the map.'],
  ['A map scale shows 1 inch = 50 miles. Two towns are 3 inches apart. How far apart are they really?','150 miles',['53 miles','50 miles','3 miles'],'3 × 50 = 150 miles.','Multiply the inches by 50.'],
  ['Which is a PRIMARY source about Jamestown?','A letter written by a colonist living in Jamestown',['A website written today','Your history textbook','A movie made last year'],'A primary source was made by someone who was there at the time.','Who was actually there?'],
  ['Which statement is an OPINION?','Williamsburg was the most beautiful colonial town',['Williamsburg became the capital of Virginia','Jamestown was founded in 1607','Richmond is on the James River'],'An opinion tells what someone feels and cannot be proven.','Look for a feeling word.'],
  ['The capital moved because the statehouse burned. Which part is the CAUSE?','The statehouse burned',['The capital moved','Both are causes','Neither'],'The fire caused the move. The move was the effect.','A cause happens first and makes something else happen.'],
 ],

 us1:[
  ['What did the Homestead Act of 1862 offer settlers?','Free land in the West if they farmed it for five years',['Free train tickets','A job in a factory','Gold mines'],'Settlers could claim 160 acres if they lived on and farmed the land.','“Homestead” means a home and land.'],
  ['Where was the Transcontinental Railroad completed in 1869?','Promontory Summit, Utah',['Richmond, Virginia','New York City','San Antonio, Texas'],'Two railroads met in Utah, linking the East and West.','It was in the West.'],
  ['Which inventions helped settlers farm the Great Plains?','Barbed wire, the steel plow, and windmills',['Airplanes and radios','Computers and phones','Steamboats only'],'Barbed wire fenced land without wood, steel plows cut tough sod, and windmills pumped water.','The Plains had few trees and little water.'],
  ['How did westward expansion affect Indigenous Peoples of the West?','Many lost their land and were forced onto reservations',['They gained more land','Nothing changed for them','They all moved to cities in the East'],'Settlement, wars, broken treaties, and the near-destruction of the buffalo pushed Indigenous Peoples onto reservations.','Think about who already lived on the land.'],
  ['Why did many people move west after the Civil War?','For land, gold and silver, and new opportunities',['To join the Revolution','To avoid the railroad','Because the East had no people'],'Free land, mining booms, and fresh starts drew people west, including formerly enslaved people called Exodusters.','Think about opportunity.'],
  ['What was a result of the Dawes Act of 1887?','Reservation land was broken up and much of it was lost by Indigenous Peoples',['Indigenous nations gained new land','Railroads were banned','Slavery ended'],'The Dawes Act divided tribal land into individual plots, and much “extra” land was sold to settlers.','It changed who owned reservation land.'],
 ],
 us2:[
  ['Who assassinated President Lincoln in April 1865?','John Wilkes Booth',['Robert E. Lee','Ulysses S. Grant','Frederick Douglass'],'Booth, a Confederate sympathizer, shot Lincoln days after the war ended.','He was an actor.'],
  ['What was the purpose of the Freedmen’s Bureau?','To help formerly enslaved people with food, schools, and jobs',['To collect taxes on cotton','To build railroads west','To run the Confederate army'],'The Bureau set up schools and helped people find work and land.','“Freedmen” were formerly enslaved people.'],
  ['Hiram Revels made history in 1870 as…','The first African American U.S. Senator',['The first president','The leader of the Confederacy','The inventor of the light bulb'],'Revels represented Mississippi in the Senate.','He served in Congress.'],
  ['How did Reconstruction end?','A deal after the 1876 election removed federal troops from the South',['The South won a war','The Constitution was replaced','A new king was crowned'],'The Compromise of 1877 gave the presidency to Rutherford B. Hayes and withdrew troops.','Look at the 1876 election.'],
  ['Lincoln’s Ten Percent Plan said a Southern state could rejoin the Union when…','10 percent of its voters swore loyalty to the United States',['It paid a tax of 10 percent','It had 10 new cities','10 percent of land was sold'],'Lincoln wanted a quick, lenient way to reunite the country.','Look at the number in the name.'],
  {t:'multi',q:'Which leaders responded to Jim Crow by fighting for the rights of African Americans? Choose all that are correct.',o:['Ida B. Wells','Booker T. Washington','W.E.B. Du Bois','Andrew Johnson'],a:['Ida B. Wells','Booker T. Washington','W.E.B. Du Bois'],e:'Ida B. Wells exposed lynching, Booker T. Washington promoted education and job skills, and W.E.B. Du Bois helped found the NAACP. Andrew Johnson was the president who opposed many protections.',h:'One choice was a president who opposed civil rights protections.'},
 ],
 us3:[
  ['Who invented a practical electric light bulb?','Thomas Edison',['Alexander Graham Bell','Henry Ford','Andrew Carnegie'],'Edison’s light bulb and power systems changed homes and factories.','He also invented the phonograph.'],
  ['Who invented the telephone?','Alexander Graham Bell',['Thomas Edison','John D. Rockefeller','The Wright brothers'],'Bell patented the telephone in 1876.','Think of a “bell” ringing.'],
  ['Andrew Carnegie built a huge business in which industry?','Steel',['Oil','Cars','Airplanes'],'Carnegie Steel helped build bridges, railroads, and skyscrapers.','It was used for skyscrapers.'],
  ['Many immigrants from Europe arrived in New York at which station?','Ellis Island',['Angel Island','Jamestown','Plymouth Rock'],'Ellis Island processed millions of immigrants. Angel Island was mainly for Asian immigrants on the West Coast.','It is on the East Coast near the Statue of Liberty.'],
  ['What did the Chinese Exclusion Act of 1882 do?','Banned most Chinese immigrants from coming to the U.S.',['Welcomed all immigrants','Built the railroad','Ended child labor'],'It was the first U.S. law to stop immigration from one specific group.','Look at the word “exclusion.”'],
  ['Jane Addams’s Hull House in Chicago helped immigrants by…','Offering classes, child care, and help settling in',['Selling them land in the West','Sending them back home','Running a factory'],'Settlement houses gave immigrants education and support.','It was a helping place.'],
  ['What new ride first appeared at the 1893 Chicago World’s Fair?','The Ferris wheel',['The roller coaster','The airplane','The escalator'],'The fair showed off American inventions, and the Ferris wheel was its star attraction.','It goes around in a big circle.'],
 ],
 us4:[
  ['Which event helped start the Spanish-American War in 1898?','The explosion of the USS Maine in Havana harbor',['The attack on Pearl Harbor','The sinking of the Titanic','The Boston Tea Party'],'Newspapers blamed Spain for the explosion, and “Remember the Maine!” became a slogan.','It was a U.S. Navy ship.'],
  ['What did the U.S. gain after the Spanish-American War?','Puerto Rico, Guam, and the Philippines',['Canada and Mexico','Alaska and Hawaii','England'],'Winning the war made the U.S. a world power with territories overseas.','They were islands.'],
  ['Which project is part of Theodore Roosevelt’s legacy?','Building the Panama Canal',['Writing the Constitution','The Homestead Act','The Transcontinental Railroad'],'Roosevelt pushed to build the Panama Canal and protected land in national parks.','It joined two oceans.'],
  {t:'multi',q:'Why did the United States enter World War I in 1917? Choose all that are correct.',o:['German submarines attacked ships with Americans aboard','The Zimmermann Telegram asked Mexico to attack the U.S.','Japan bombed Pearl Harbor','Spain sank the USS Maine'],a:['German submarines attacked ships with Americans aboard','The Zimmermann Telegram asked Mexico to attack the U.S.'],e:'German submarine warfare (like the sinking of the Lusitania) and the Zimmermann Telegram pushed the U.S. into WWI. Pearl Harbor was WWII, and the Maine was 1898.',h:'Two choices belong to other wars.'},
  ['Which new technology changed fighting in World War I?','Tanks, airplanes, and machine guns',['Muskets and cannons only','Atomic bombs','Drones and satellites'],'New weapons led to trench warfare and huge losses.','Think early 1900s technology.'],
  ['What was President Wilson’s plan for an organization to keep world peace?','The League of Nations',['The United Nations','NATO','The Confederacy'],'The U.S. Senate refused to join, and the League could not stop the next war.','It came before the United Nations.'],
 ],
 us5:[
  ['What was the Great Migration?','The movement of millions of African Americans from the rural South to cities in the North and West',['Settlers moving west for gold','Birds flying south','Immigrants arriving at Ellis Island'],'People moved for jobs and to escape Jim Crow laws and violence.','It was a move north.'],
  ['Which amendment gave women the right to vote in 1920?','The Nineteenth Amendment',['The Thirteenth Amendment','The First Amendment','The Twenty-First Amendment'],'Suffragists like Susan B. Anthony and Alice Paul worked for decades to win it.','It is the 19th.'],
  ['What was Prohibition?','A ban on making and selling alcohol',['A ban on immigration','A ban on cars','A ban on voting'],'The Eighteenth Amendment started it, and the Twenty-First Amendment ended it in 1933.','It “prohibited” something.'],
  ['The Harlem Renaissance was a time of…','African American art, music, and writing in the 1920s',['Factory building in Ohio','Westward railroads','Space exploration'],'Langston Hughes, Zora Neale Hurston, and Duke Ellington were part of it.','It happened in New York City.'],
  ['What caused the Dust Bowl in the 1930s?','A long drought and farming that removed grass holding the soil',['A volcano','Too much rain','A war in Europe'],'Without roots holding it, dry soil blew away in giant dust storms on the Great Plains.','Dry land + no roots.'],
  ['Which event in 1929 helped start the Great Depression?','The stock market crash',['The attack on Pearl Harbor','The end of World War I','The invention of the radio'],'When stock prices fell, banks failed and many people lost jobs and savings.','It happened on Wall Street.'],
  ['President Franklin D. Roosevelt’s programs to fight the Depression were called…','The New Deal',['The Marshall Plan','Reconstruction','The Square Deal'],'New Deal programs created jobs and started Social Security.','It promised a “new” start.'],
 ],
 us6:[
  ['Why did the United States enter World War II?','Japan attacked Pearl Harbor on December 7, 1941',['The USS Maine exploded','Germany sent the Zimmermann Telegram','The stock market crashed'],'The attack on the U.S. Navy base in Hawaii brought the U.S. into the war.','It happened in Hawaii.'],
  ['What was appeasement before World War II?','Giving in to an aggressive leader’s demands to avoid war',['Building more weapons','Joining the League of Nations','Starting a New Deal'],'Britain and France let Hitler take land, but it did not stop him.','To “appease” means to give in to keep someone calm.'],
  ['What was D-Day (June 6, 1944)?','The Allied invasion of Normandy, France',['The bombing of Pearl Harbor','Japan’s surrender','The end of World War I'],'D-Day began freeing Western Europe from Nazi control.','It happened on beaches in France.'],
  ['Which battle was a turning point in the Pacific?','The Battle of Midway',['The Battle of Yorktown','The Battle of Manassas','The Battle of the Bulge'],'In 1942 the U.S. Navy sank four Japanese aircraft carriers at Midway.','It is named after Pacific islands.'],
  ['What was the Holocaust?','Nazi Germany’s organized murder of six million Jews and millions of others',['A U.S. law during the war','A battle in the Pacific','A peace treaty'],'The Nazis targeted Jews and others in a genocide. Remembering it helps us stand against hatred.','It was a crime against millions of people.'],
  ['What was the Manhattan Project?','The secret U.S. program that built the atomic bomb',['A plan to build New York City','A peace plan for Europe','A railroad project'],'The atomic bombs dropped on Hiroshima and Nagasaki led to Japan’s surrender in 1945.','It was top secret science.'],
  {t:'multi',q:'How did Americans on the home front help during World War II? Choose all that are correct.',o:['Rationing food and gas','Women working in factories','Buying war bonds','Joining the League of Nations'],a:['Rationing food and gas','Women working in factories','Buying war bonds'],e:'Families rationed supplies, women like “Rosie the Riveter” built planes and ships, and people bought bonds to pay for the war. The U.S. never joined the League of Nations.',h:'One choice is about a group the U.S. never joined.'},
  {t:'order',q:'Put these World War II events in order.',items:['Germany invades Poland (1939)','Japan attacks Pearl Harbor','D-Day invasion of Normandy','Japan surrenders'],e:'Germany invaded Poland in 1939, Pearl Harbor was 1941, D-Day was 1944, and Japan surrendered in 1945.',h:'The war started in Europe before the U.S. joined.'},
  ['The Tuskegee Airmen were…','African American pilots who served in a segregated unit',['British spies','Navy submarine crews','Confederate soldiers'],'They flew with great skill even while facing discrimination.','Think of pilots.'],
 ],
 us7:[
  ['Which organization was formed in 1945 to keep world peace?','The United Nations',['The League of Nations','The Confederacy','NATO'],'The UN replaced the failed League of Nations.','It still exists today in New York City.'],
  ['What is NATO?','A military alliance of the U.S., Canada, and Western European countries',['A trade company','A space agency','A Soviet army'],'NATO members agreed to defend one another during the Cold War.','It is an alliance.'],
  ['What was the main difference between communism and democracy during the Cold War?','Communist governments controlled the economy and limited freedoms; democracies had free elections and markets',['There was no difference','Democracies had kings','Communist countries had free elections'],'The U.S. stood for democracy and free markets, and the Soviet Union for communism.','Think about who makes decisions.'],
  ['What happened during the Cuban Missile Crisis (1962)?','The U.S. and Soviet Union came close to nuclear war over missiles in Cuba',['The U.S. landed on the moon','The Berlin Wall fell','Cuba joined NATO'],'After 13 tense days, the Soviets removed the missiles.','It was about missiles near Florida.'],
  ['On September 11, 2001, passengers on Flight 93…','Fought back against hijackers, and the plane crashed in Pennsylvania',['Landed safely in Washington','Flew to Cuba','Were part of the Cold War'],'Their actions likely stopped an attack on Washington, D.C.','They are remembered as heroes.'],
  ['How did the U.S. change after the 9/11 attacks?','It created the Department of Homeland Security and increased security',['It ended all air travel forever','It left the United Nations','It ended the military'],'The government reorganized to protect the country and fought terrorism abroad.','Think about security.'],
 ],
 us8:[
  ['What did the Montgomery Bus Boycott, sparked by Rosa Parks in 1955, protest?','Segregated seating on city buses',['High bus fares','The Vietnam War','Taxes on tea'],'Black citizens refused to ride buses for over a year until the law changed.','Rosa Parks refused to give up her seat.'],
  ['What did the Civil Rights Act of 1964 do?','Banned discrimination based on race, color, religion, sex, or national origin',['Gave women the vote','Ended slavery','Created the Peace Corps'],'It outlawed segregation in public places and discrimination in jobs.','It protected civil rights.'],
  ['What happened in July 1969 during Apollo 11?','American astronauts walked on the moon',['The first satellite was launched','The internet was invented','The Space Shuttle exploded'],'Neil Armstrong and Buzz Aldrin walked on the moon.','“One small step…”'],
  ['Which scandal led President Nixon to resign in 1974?','Watergate',['Teapot Dome','The Cuban Missile Crisis','The Dust Bowl'],'Nixon resigned after his staff’s cover-up of a break-in was exposed.','It is named after a building.'],
  ['What does the Americans with Disabilities Act (1990) protect?','The rights of people with disabilities to access jobs, buildings, and services',['The right to vote at 18','Clean air and water','Veterans’ pay'],'It requires things like ramps and fair hiring.','Look at the law’s name.'],
  ['Which agency was created in 1970 to protect the environment?','The EPA (Environmental Protection Agency)',['NASA','The FBI','The UN'],'The EPA works to keep air, water, and land clean.','Look for “environmental.”'],
  {t:'order',q:'Put these events in order.',items:['Brown v. Board of Education','Montgomery Bus Boycott','Civil Rights Act','Apollo 11 moon landing'],e:'Brown v. Board (1954), the bus boycott (1955), the Civil Rights Act (1964), and Apollo 11 (1969).',h:'The school case came first; the moon landing came last.'},
  ['Jackson Ward in Richmond and Vinegar Hill in Charlottesville were thriving Black neighborhoods that were…','Divided or torn down by urban renewal and highway projects',['Turned into national parks','Built during the Revolution','Moved to another state'],'Urban renewal displaced many families and businesses.','Think about highways cutting through neighborhoods.'],
 ],
 us_sk:[
  ['Which is a PRIMARY source about World War II?','A soldier’s letter written in 1944',['A 2020 textbook chapter','A documentary made last year','An encyclopedia article'],'Primary sources come from people who lived through the event.','Who was actually there?'],
  ['In a cause-and-effect chain, the stock market crash of 1929 was a…','Cause of the Great Depression',['Effect of the New Deal','Effect of World War II','Cause of the Civil War'],'The crash helped cause the Depression, which led to the New Deal.','Which came first?'],
  ['A graph shows U.S. city population rising from 1870 to 1920. What is the best conclusion?','More Americans were moving to cities',['Fewer people lived in cities','Farms were growing larger','Population did not change'],'A rising line means the number went up.','Read the direction of the line.'],
  ['Which statement is a FACT?','The 19th Amendment was ratified in 1920',['The 1920s were the best decade','Everyone loved jazz','The New Deal was a bad idea'],'Facts can be checked with evidence.','Can it be proven?'],
  ['When you compare two accounts of the same event, why might they differ?','The writers had different points of view',['One must be a primary source','Dates never matter','History cannot be studied'],'People notice and describe events based on their own experiences.','Think about point of view.'],
 ],
};
// Dated events for timeline questions (generated, so they never run out)
const HIST_EVENTS={
 4:[[1607,'Jamestown is founded'],[1619,'First General Assembly meets'],[1676,'Bacon’s Rebellion'],[1699,'Capital moves to Williamsburg'],[1775,'Patrick Henry’s “Give me liberty” speech'],
    [1776,'Declaration of Independence'],[1781,'British surrender at Yorktown'],[1831,'Nat Turner’s Rebellion'],[1859,'John Brown’s raid at Harpers Ferry'],[1861,'First Battle of Manassas'],
    [1863,'West Virginia becomes a state'],[1865,'Lee surrenders at Appomattox'],[1903,'Maggie Walker opens her bank'],[1954,'Brown v. Board of Education'],[1990,'L. Douglas Wilder becomes governor']],
 6:[[1862,'Homestead Act'],[1865,'Lincoln is assassinated'],[1869,'Transcontinental Railroad completed'],[1877,'Reconstruction ends'],[1882,'Chinese Exclusion Act'],[1898,'Spanish-American War'],
    [1917,'U.S. enters World War I'],[1920,'19th Amendment ratified'],[1929,'Stock market crash'],[1941,'Attack on Pearl Harbor'],[1944,'D-Day'],[1945,'United Nations formed'],
    [1955,'Montgomery Bus Boycott'],[1962,'Cuban Missile Crisis'],[1964,'Civil Rights Act'],[1969,'Apollo 11 moon landing'],[1974,'Nixon resigns'],[1990,'Americans with Disabilities Act'],[2001,'September 11 attacks']]};
function dgTimeline(evs,col,hideYears){
  const W=400,x0=34,x1=W-34,lo=evs[0][0],hi=evs[evs.length-1][0];const span=Math.max(1,hi-lo);
  let r=`<line x1="${x0-14}" y1="80" x2="${x1+14}" y2="80" stroke="${DG.ink}" stroke-width="5" stroke-linecap="round"/>`;
  const xs=evs.map(e=>x0+(e[0]-lo)/span*(x1-x0));for(let i=1;i<xs.length;i++)xs[i]=Math.max(xs[i],xs[i-1]+46);
  for(let i=xs.length-2;i>=0;i--)xs[i]=Math.min(xs[i],xs[i+1]-46);
  evs.forEach((e,i)=>{const x=xs[i];const up=i%2===0;
    r+=`<circle cx="${x}" cy="80" r="10" fill="${col}" stroke="${DG.ink}" stroke-width="3"/>`;
    if(!hideYears)r+=dgText(x,up?56:116,String(e[0]),{s:20});
    r+=dgText(x,up?28:146,e[2]||String.fromCharCode(65+i),{s:22,c:col});});
  return dgSvg(W,160,r,'Timeline: '+evs.map(e=>(e[2]||'')+' '+e[0]).join(', '));
}
function dgVaRegions(col){
  // schematic, not to scale: five regions from west (left) to east (right)
  const xs=[20,90,170,215,300,410];const names=['A','B','C','D','E'];
  const fills=['#C9B79C','#9FD18F','#6CAF6A','#CDE7B0','#F2E2A8'];
  const top=x=>Math.max(20,150-x*0.42);
  let r='';
  for(let i=0;i<5;i++){const a=xs[i],b=xs[i+1];
    r+=`<path d="M${a} 180 L${a} ${top(a)} L${b} ${top(b)} L${b} 180Z" fill="${fills[i]}" stroke="${DG.ink}" stroke-width="2.5"/>`;
    r+=dgText((a+b)/2,150,names[i],{s:20,bg:1});}
  r+=`<rect x="410" y="20" width="110" height="160" fill="#BFE0FF"/>`+dgText(465,110,'Atlantic',{s:13,c:'#2F6FE0'})+dgText(465,126,'Ocean',{s:13,c:'#2F6FE0'});
  r+=dgText(260,205,'West  ←                                                  →  East',{s:12,c:'#5B6B85'})+dgText(90,205,'(not to scale)',{s:11,c:'#8090AA',a:'start'});
  return dgSvg(530,212,r,'A simple map of Virginia’s five regions labeled A to E from west to east');
}
const VA_REGIONS=['Appalachian Plateau','Valley and Ridge','Blue Ridge Mountains','Piedmont','Coastal Plain'];
function histQ(gen){
  const g=gen.startsWith('vs')?4:6;const st=HIST_STRANDS[g].find(s=>s.gen===gen);const sol=st?st.code:'';
  // generated question types for variety
  if(gen==='vs1'&&Math.random()<.3){const i=rng(0,4);const svg=dgVaRegions('#14A394');
    return mcq('Map Skills',sol,`Look at the map. Which region is labeled ${'ABCDE'[i]}?`,shuf(VA_REGIONS.slice()).slice(0,3).concat([VA_REGIONS[i]]),VA_REGIONS[i],
      `From west to east the regions are Appalachian Plateau (A), Valley and Ridge (B), Blue Ridge Mountains (C), Piedmont (D), and Coastal Plain (E).`,
      'The Coastal Plain touches the ocean on the east. The Appalachian Plateau is farthest west.',{dgSvg:svg});}
  if((gen==='vs_sk'||gen==='us_sk')&&Math.random()<.55){
    const evs=shuf(HIST_EVENTS[g].slice()).slice(0,4).sort((a,b)=>a[0]-b[0]).map((e,i)=>[e[0],e[1],'ABCD'[i]]);
    const t=rng(0,2);const svg=dgTimeline(evs,'#14A394',false);
    const key=evs.map(e=>`${e[2]} = ${e[1]}`).join('; ');
    if(t===0){const a=evs[1],b=evs[3];const d=b[0]-a[0];
      return mcq('Timeline',sol,`Look at the timeline. ${key}.\nHow many years passed between event ${a[2]} and event ${b[2]}?`,[d,d+10,Math.max(1,d-5),d+1],d,
        `${b[0]} − ${a[0]} = ${d} years.`,'Subtract the earlier year from the later year.',{dgSvg:svg});}
    if(t===1){const pickE=evs[rng(0,3)];return mcq('Timeline',sol,`Look at the timeline. ${key}.\nIn what year did “${pickE[1]}” happen?`,evs.map(e=>String(e[0])),String(pickE[0]),
        `“${pickE[1]}” is event ${pickE[2]}, in ${pickE[0]}.`,'Find the letter, then read its year.',{dgSvg:svg});}
    const pair=shuf(evs.slice()).slice(0,2);const first=pair[0][0]<pair[1][0]?pair[0]:pair[1];
    return mcq('Timeline',sol,`Which happened FIRST: “${pair[0][1]}” or “${pair[1][1]}”?`,[pair[0][1],pair[1][1],'They happened in the same year'],first[1],
      `“${first[1]}” was in ${first[0]}, earlier than the other event.`,'Find each event on the timeline. Earlier is to the left.',{dgSvg:svg});
  }
  const it=pick(HIST_BANK[gen]);
  if(Array.isArray(it))return mcq(st?st.name:'History',sol,it[0],shuf([it[1]].concat(it[2])),it[1],it[3],it[4]);
  if(it.t==='multi')return {type:'multi',badge:'Select all',sol,question:it.q,opts:shuf(it.o.slice()),answers:it.a,explanation:it.e,hint:it.h};
  if(it.t==='order')return {type:'order',badge:'Put in order',sol,question:it.q,items:it.items,explanation:it.e,hint:it.h};
}
LESSONS.vs1=['Virginia has five regions. From the coast going west: Coastal Plain, Piedmont, Blue Ridge Mountains, Valley and Ridge, Appalachian Plateau.','The Fall Line is where rivers drop to the Coastal Plain. Ships stopped there, so cities like Richmond grew.','Neighbors: Maryland, West Virginia, Kentucky, Tennessee, North Carolina, and Washington, D.C.'];
LESSONS.vs2=['Three main language groups: Algonquian (Coastal Plain, like the Powhatan), Siouan (Piedmont, like the Monacan), and Iroquoian (southwest, like the Cherokee).','Artifacts from sites such as Werowocomoco tell us how people lived.','Indigenous nations are part of Virginia today, not only the past.'];
LESSONS.vs3=['1607: Jamestown, the first permanent English settlement, was founded by the Virginia Company to make money.','Hardships: disease, bad water, hunger (the Starving Time). Tobacco and help from the Powhatan helped it survive.','1619: the first General Assembly met, the first recorded Africans arrived, and women were recruited to build families.'];
LESSONS.vs4=['Tobacco was the main cash crop. People often bartered instead of using money.','Indentured servants worked for a set time. Enslaved people were held for life.','The capital moved from Jamestown to Williamsburg after a fire.'];
LESSONS.vs5=['Colonists objected to taxation without representation.','Virginians: Patrick Henry (speeches), Thomas Jefferson (Declaration), George Washington (army), James Armistead Lafayette (spy).','The British surrendered at Yorktown in 1781. The capital moved to Richmond during the war.'];
LESSONS.vs6=['James Madison is the “Father of the Constitution.” George Mason’s Declaration of Rights shaped the Bill of Rights.','Three branches: legislative makes laws, executive carries them out, judicial decides what they mean.','Nat Turner’s Rebellion (1831) led to harsher laws against Black Virginians.'];
LESSONS.vs7=['Slavery was the main cause of the Civil War. Virginia seceded, and West Virginia split away to stay in the Union.','Battles in Virginia: First Manassas, Fredericksburg, Chancellorsville, Petersburg. The war ended at Appomattox Court House.','People: Robert E. Lee, Stonewall Jackson, William Harvey Carney, Harriet Tubman.'];
LESSONS.vs8=['13th Amendment: ended slavery. 14th: citizenship and equal protection. 15th: voting regardless of race.','Freedmen’s Schools gave education to formerly enslaved people.','Plessy v. Ferguson allowed “separate but equal,” and Jim Crow laws enforced segregation.'];
LESSONS.vs9=['After the Civil War, railroads connected cities and carried coal and goods.','Factories created jobs, so many Virginians moved from rural farms to urban cities.'];
LESSONS.vs10=['World War I: Woodrow Wilson (born in Staunton) was president. Richard E. Byrd explored polar regions.','World War II and after: Lewis “Chesty” Puller served bravely. George C. Marshall’s plan rebuilt Europe.'];
LESSONS.vs11=['Barbara Johns led a 1951 student strike that became part of Brown v. Board of Education (1954).','Massive Resistance was a plan to block desegregation. Prince Edward County closed its schools.','L. Douglas Wilder was elected in 1989 as the first African American governor of a U.S. state.'];
LESSONS.vs12=['Eight presidents were born in Virginia: Washington, Jefferson, Madison, Monroe, W. H. Harrison, Tyler, Taylor, and Wilson.','That is why Virginia is called the “Mother of Presidents.”'];
LESSONS.vs13=['Virginia’s economy includes farming, seafood, coal, tourism, technology, ports, and the military.','Exports are goods sold to other countries.'];
LESSONS.vs_sk=['Maps: the compass rose shows directions, the legend explains symbols, and the scale shows real distance.','Timelines: earlier events are on the left. Subtract years to find how long between events.','Primary sources were made by people who were there. Secondary sources were made later.'];
LESSONS.us1=['The Homestead Act (1862) and the Transcontinental Railroad (1869) drew settlers west.','Barbed wire, steel plows, and windmills helped farmers on the Great Plains.','Indigenous Peoples lost land and were forced onto reservations.'];
LESSONS.us2=['Lincoln was assassinated in 1865. The Freedmen’s Bureau helped formerly enslaved people.','The 13th, 14th, and 15th Amendments expanded freedom, citizenship, and voting rights.','Reconstruction ended after the 1876 election. Jim Crow laws followed; leaders like Ida B. Wells and W.E.B. Du Bois fought back.'];
LESSONS.us3=['Inventors like Edison and Bell, and businesses like Carnegie Steel, changed daily life.','Immigrants arrived through Ellis Island and Angel Island. The Chinese Exclusion Act (1882) banned most Chinese immigration.','Cities grew fast, and settlement houses like Hull House helped newcomers.'];
LESSONS.us4=['The Spanish-American War (1898) gave the U.S. Puerto Rico, Guam, and the Philippines.','Theodore Roosevelt: Panama Canal and national parks.','The U.S. entered World War I in 1917. Afterward, the League of Nations failed to keep peace.'];
LESSONS.us5=['Great Migration: African Americans moved north for jobs and freedom from Jim Crow.','1920s: women won the vote (19th Amendment), Prohibition, the Harlem Renaissance.','1929 crash → Great Depression and Dust Bowl → FDR’s New Deal.'];
LESSONS.us6=['Appeasement failed to stop Hitler. Pearl Harbor (1941) brought the U.S. into the war.','Turning points: Midway (Pacific) and D-Day (Europe).','Home front: rationing, women in factories, war bonds. The Holocaust was the murder of six million Jews and millions of others.'];
LESSONS.us7=['After WWII: the United Nations, NATO, and the Marshall Plan.','The Cold War was a struggle between democracy (U.S.) and communism (Soviet Union).','After 9/11 (2001), the U.S. created the Department of Homeland Security.'];
LESSONS.us8=['Civil rights: Brown v. Board (1954), the Montgomery Bus Boycott (1955), the Civil Rights Act (1964).','Apollo 11 (1969), Watergate (1974), the EPA (1970), and the Americans with Disabilities Act (1990).'];
LESSONS.us_sk=['Primary sources come from people who were there. Compare sources and think about point of view.','Cause comes before effect. Facts can be proven; opinions cannot.'];

// ── Strategy of the day ──
const STRATEGIES=[
 {ic:'🔎',t:'Find the evidence',d:'After you choose an answer, point to the sentence, number, or detail that proves it.',go:['stories']},
 {ic:'💡',t:'Main idea',d:'Ask: what is this MOSTLY about? Check that your answer fits the whole passage, not just one sentence.',go:['skill','read']},
 {ic:'🧩',t:'Vocabulary in context',d:'Stuck on a word? Read the sentences around it. They often explain what it means.',go:['skill','read']},
 {ic:'❓',t:'What is the question asking?',d:'In a word problem, find the numbers and units, then say what you need to find before you solve.',go:['skill','math']},
 {ic:'📊',t:'Read the data',d:'Before answering, read the title, the labels, the units, and the scale of the graph or table.',go:['skill','math']},
 {ic:'⏳',t:'Sequence',d:'What happened first, next, and last? Look for dates and signal words like “then” and “finally.”',go:['skill','hist']},
 {ic:'🔗',t:'Cause and effect',d:'Ask: why did this happen (cause)? What happened because of it (effect)?',go:['skill','hist']},
 {ic:'🕵️',t:'Make an inference',d:'Combine clues from the text with what you know. The answer is hinted, not written.',go:['stories']},
 {ic:'⚖️',t:'Compare',d:'How are two ideas alike? How are they different? Make a quick T-chart in your head.',go:['skill','sci']},
];
function strategyToday(){const d=new Date();const n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);return STRATEGIES[n%STRATEGIES.length];}
function strategyGo(){
  const s=strategyToday();if(s.go[0]==='stories'){switchTab('stories');return;}
  const subj=s.go[1];const list=skillsFor(subj);if(!list.length)return;
  const x=list.slice().sort((a,b)=>scoreOf(subj,a.code)-scoreOf(subj,b.code))[0];startSkill(subj,x.code);
}
// ── wire History & Social Science into the app ──
SUBJ.hist={card:'History',label:'History & Social Science',short:'History',icon:'🏛️',color:'#0E8A7E',dk:'#0A6158',lt:'#D5F3EE',band:'#14A394'};
STRANDS[4].hist=HIST_STRANDS[4];STRANDS[6].hist=HIST_STRANDS[6];
SUBJ_ART.hist=`<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M16 28 L56 18 L96 28 L136 18 V96 L96 106 L56 96 L16 106Z" fill="#FFF3D6"/><path d="M56 18 V96 M96 28 V106" stroke-width="3"/>
    <path d="M28 78 q14 -26 30 -10 t34 -18" fill="none" stroke="#E8559A" stroke-width="3.5" stroke-dasharray="7 6"/>
    <path d="M108 50 l6 -12 l6 12 l-6 -3Z" fill="#14A394"/><circle cx="114" cy="56" r="10" fill="#fff"/><path d="M114 46 V66 M104 56 H124" stroke-width="2.5"/>
    <circle cx="30" cy="80" r="5" fill="#FFC83D"/><path d="M118 92 l3 -8 l3 8" fill="#FFC83D" stroke-width="2"/>
  </g>`;


