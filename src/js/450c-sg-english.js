// ═══════════════════════════════════════════════════════════════
// Study guides — Grades 4 and 6 Reading and Writing (2024 Virginia English SOL:
// RV, RL, RI, W, LU). Source: VDOE "English Standards of Learning for Virginia Public Schools" (March 2024).
// ═══════════════════════════════════════════════════════════════

// ── Grade 4 ──
SG.add('g4_vocab',{title:'Word meanings',
  goals:['I can use roots and endings like -s, -ing, and -ed to figure out words.','I can use the sentence to pick the right meaning or homophone.','I can use synonyms, antonyms, and shades of meaning.'],
  words:[['root word','the main part of a word','play in replayed'],['affix','a prefix or suffix added to a root','re-, un-, -ful, -ing'],['synonym','a word that means almost the same','big / large'],['antonym','a word that means the opposite','hot / cold'],['homophone','words that sound the same but mean different things','their, there, they’re']],
  pages:[
    {h:'Break a word into parts',p:['Find the <b>root word</b>, then look at the parts added to it.','<b>Prefixes</b> come first: <b>un-</b> (not), <b>re-</b> (again), <b>pre-</b> (before). <b>Suffixes</b> come last: <b>-ful</b> (full of), <b>-less</b> (without), <b>-er</b> (one who), <b>-ing</b>/<b>-ed</b> (when it happens).'],
     ex:{q:'What does “unbreakable” mean?',steps:['Root: break.','-able = can be. un- = not.','Put it together: not able to be broken.'],a:'not able to be broken'},
     chk:{q:'What does “rewrite” mean?',a:'to write again',w:['to write badly','to not write','one who writes'],why:'The prefix re- means again.'}},
    {h:'Use the sentence',p:['The words around an unknown word are clues. Look for an example, a definition, a synonym, or an opposite nearby.','Homophones sound the same, so the sentence tells you which one fits: “<b>They’re</b> putting <b>their</b> coats over <b>there</b>.”'],
     ex:{q:'“The trail was so steep and arduous that we had to rest every few minutes.” What does arduous mean?',steps:['Clues: steep, rest every few minutes.','Those describe something tiring and hard.'],a:'very difficult and tiring'},
     chk:{q:'Which word fits? “The dog wagged ___ tail.”',a:'its',w:['it’s','its’','it is'],why:'“Its” shows belonging. “It’s” means “it is.”'}},
    {h:'Synonyms, antonyms, and shades of meaning',p:['Synonyms mean almost the same, but not exactly. <b>Shades of meaning</b> show how strong a word is: whisper → say → shout; warm → hot → scorching.','Picking the exact word makes writing clearer.'],
     ex:{q:'Order from weakest to strongest: furious, annoyed, angry.',steps:['Annoyed is a little upset.','Angry is more.','Furious is very angry.'],a:'annoyed, angry, furious'},
     chk:{q:'Which is an antonym of “ancient”?',a:'modern',w:['old','historic','antique'],why:'Ancient means very old; modern means new.'}}],
  watch:[['Guessing a word’s meaning from its first letters.','Break it into root and affixes, then check the sentence.'],['Mixing up homophones (their/there/they’re).','Their = belongs to them; there = a place; they’re = they are.']],
  tips:['Test questions often ask what a word “most likely” means in the passage — use the sentence.'],
  sum:['Root + prefix + suffix = meaning.','Use clues around the word.','Homophones: let the sentence decide.','Shades of meaning: pick the exact word.']});

SG.add('g4_fiction',{title:'Reading stories, plays, and poems',
  goals:['I can summarize the theme of a story, drama, or poem.','I can describe the conflict, the resolution, and the characters.','I can tell first-person from third-person point of view.'],
  words:[['theme','the message or lesson of a story',''],['conflict','the main problem in a story',''],['resolution','how the problem is solved',''],['narrator','the one telling the story',''],['point of view','who is telling the story: first person (I) or third person (he, she, they)','']],
  pages:[
    {h:'Theme: the big lesson',p:['The <b>theme</b> is the message the story teaches. Ask: What did the main character learn? How did they handle a challenge?','A theme is a full idea, like “Honesty builds trust” — not just one word like “honesty.”'],
     ex:{q:'Maya breaks her friend’s kite, hides it, then feels awful and finally tells the truth. Her friend forgives her. What is a theme?',steps:['What did Maya learn? Hiding the truth made things worse.','Telling the truth fixed the friendship.'],a:'Telling the truth is better than hiding a mistake.'},
     chk:{q:'Which is written as a theme?',a:'Working together helps us do hard things.',w:['teamwork','The story is about a soccer team.','Sam scores a goal.'],why:'A theme is a complete message or lesson, not a topic or event.'}},
    {h:'Conflict, resolution, and characters',p:['The <b>conflict</b> is the main problem. The <b>resolution</b> is how it gets solved.','Learn about characters from what they <b>say</b>, <b>do</b>, and <b>think</b>, and how others react to them.'],
     ex:{q:'“Leo’s hands shook as he walked to the stage, but he took a deep breath and began to sing.” What can you tell about Leo?',steps:['Shaking hands show he is nervous.','Taking a breath and singing shows he is brave.'],a:'He is nervous but brave.'},
     chk:{q:'What is the resolution of a story?',a:'how the main problem is solved',w:['where the story happens','the main problem','the first event'],why:'The resolution comes at the end, when the conflict is worked out.'}},
    {h:'Who is telling the story?',p:['<b>First person</b>: the narrator is a character and uses <b>I</b>, <b>me</b>, <b>we</b>.','<b>Third person</b>: the narrator is outside the story and uses <b>he</b>, <b>she</b>, <b>they</b>, and names.','In a poem, the voice is called the <b>speaker</b>.'],
     ex:{q:'“I raced to the bus stop, but the doors closed in my face.” Which point of view?',steps:['The narrator says “I” and “my.”','So the narrator is a character in the story.'],a:'first person'},
     chk:{q:'“She opened the old trunk and gasped.” Which point of view?',a:'third person',w:['first person','second person','no point of view'],why:'The narrator uses “she,” so it is told from outside the character.'}}],
  watch:[['Giving one word as the theme.','Write a full lesson: “Being kind makes friends.”'],['Mixing up the conflict and the resolution.','Conflict = the problem. Resolution = how it is solved.']],
  tips:['Go back to the passage and find the sentence that proves your answer.'],
  sum:['Theme = the lesson, as a full sentence.','Conflict → resolution.','Characters: words, actions, thoughts.','First person “I”; third person “he/she/they.”']});

SG.add('g4_nonfic',{title:'Reading nonfiction',
  goals:['I can find the main idea and the key details that support it.','I can tell fact from opinion.','I can explain text structures, text features, and the author’s purpose.'],
  words:[['main idea','what the whole passage is mostly about',''],['key details','facts that support the main idea',''],['fact / opinion','a fact can be proven; an opinion is a belief',''],['text structure','how a text is organized','cause/effect, compare/contrast, problem/solution'],['text features','headings, captions, bold words, diagrams','']],
  pages:[
    {h:'Main idea and details',p:['The <b>main idea</b> is what the whole passage is mostly about. <b>Key details</b> support it.','Check: does your main idea cover every paragraph, not just one?'],
     ex:{q:'Paragraphs tell how bees make honey, pollinate flowers, and help farmers grow food. What is the main idea?',steps:['Each paragraph shows a way bees help.','The main idea must cover all of them.'],a:'Bees are important to people and plants.'},
     chk:{q:'Which is a DETAIL, not the main idea, of a passage about how penguins survive the cold?',a:'Penguins huddle together in groups.',w:['Penguins have many ways to survive the cold.','The passage is about penguins.','Survival is hard.'],why:'Huddling is one supporting detail about surviving the cold.'}},
    {h:'Fact or opinion?',p:['A <b>fact</b> can be proven true: “The Blue Ridge Mountains are in Virginia.”','An <b>opinion</b> tells what someone thinks or feels — words like <b>best</b>, <b>beautiful</b>, <b>should</b>: “The Blue Ridge is the most beautiful place.”','Good authors back up opinions with reasons and evidence.'],
     ex:{q:'“Dogs are the best pets because they are loyal.” Fact or opinion?',steps:['“Best” is a judgment that cannot be proven.'],a:'opinion'},
     chk:{q:'Which is a fact?',a:'Richmond is the capital of Virginia.',w:['Richmond is the coolest city.','Everyone should visit Richmond.','Richmond has the best food.'],why:'It can be checked and proven.'}},
    {h:'Structure, features, and purpose',p:['Signal words show <b>structure</b>: <b>because, so, as a result</b> (cause/effect); <b>both, however, unlike</b> (compare/contrast); <b>the problem is, one solution</b> (problem/solution); <b>first, next, finally</b> (sequence).','<b>Text features</b> like headings, captions, bold words, and diagrams help you find information fast.','The <b>author’s purpose</b>: to explain, describe, or answer a question — or to persuade or entertain.'],
     ex:{q:'“Because the river flooded, the town built a wall.” What structure?',steps:['“Because” signals a reason.','The flood caused the wall to be built.'],a:'cause and effect'},
     chk:{q:'Which text feature tells what a picture shows?',a:'a caption',w:['a heading','the title page','the index'],why:'A caption explains a picture or diagram.'}}],
  watch:[['Picking one interesting detail as the main idea.','The main idea covers the WHOLE passage.'],['Calling a strong statement a fact.','Can it be proven? If not, it is an opinion.']],
  tips:['Look at headings first — they often show the main ideas.'],
  sum:['Main idea covers everything; details support it.','Fact = provable; opinion = belief.','Signal words show structure.','Text features help you find information.']});

SG.add('g4_sentence',{title:'Writing sentences and paragraphs',
  goals:['I can write narrative, expository, and persuasive pieces.','I can write a paragraph with a topic sentence, details, transitions, and a conclusion.','I can combine sentences with conjunctions.'],
  words:[['narrative','writing that tells a story',''],['expository','writing that explains or informs',''],['persuasive','writing that tries to convince',''],['topic sentence','the sentence that tells the main idea of a paragraph',''],['transition','a linking word like first, also, finally, because','']],
  pages:[
    {h:'Three kinds of writing',p:['<b>Narrative</b> tells a story with a problem, events, and an ending.','<b>Expository</b> explains a topic with facts and details.','<b>Persuasive</b> states an opinion and supports it with reasons and facts.'],
     ex:{q:'“Our school should have a longer recess because…” What kind of writing?',steps:['It states an opinion (“should”).','It gives reasons (“because”).'],a:'persuasive'},
     chk:{q:'Which kind of writing explains how volcanoes form?',a:'expository',w:['narrative','persuasive','poetry'],why:'Expository writing explains or informs.'}},
    {h:'Building a strong paragraph',p:['Start with a <b>topic sentence</b> that tells the main idea.','Add <b>details</b>: facts, examples, and describing words.','Use <b>transitions</b> to link ideas: first, also, for example, because, finally.','End with a <b>concluding sentence</b> that wraps it up.'],
     ex:{q:'Write a topic sentence for a paragraph about why dogs make good pets.',steps:['Say the main idea in one sentence.'],a:'Dogs make wonderful pets for many reasons.'},
     chk:{q:'Which sentence would make the best conclusion for a paragraph about recycling?',a:'Recycling is an easy way everyone can help the Earth.',w:['First, rinse the bottle.','Paper is made from trees.','My cousin has a dog.'],why:'A conclusion sums up the main idea.'}},
    {h:'Better sentences',p:['Combine short sentences with conjunctions: <b>and, but, or, so</b> — or <b>because, although, when</b>.','“It rained. We played inside.” → “<b>Because</b> it rained, we played inside.”','Add prepositional phrases for detail: “The cat slept <b>under the porch</b>.”'],
     ex:{q:'Combine: “Sam was tired. He finished his homework.”',steps:['The ideas contrast (tired, but finished).','Use “but” or “although.”'],a:'Sam was tired, but he finished his homework.'},
     chk:{q:'Which sentence is combined correctly?',a:'I wanted to swim, but the pool was closed.',w:['I wanted to swim but, the pool was closed.','I wanted to swim, the pool was closed.','I wanted to swim. But, the pool, was closed.'],why:'Use a comma before “but” when it joins two complete sentences.'}}],
  watch:[['Writing a list of facts with no topic sentence.','Start with a sentence that tells the main idea.'],['Joining two sentences with only a comma.','Add a conjunction: “, but” or “, so.”']],
  tips:['Writing questions may ask which sentence best begins, adds to, or ends a paragraph.'],
  sum:['Narrative tells; expository explains; persuasive convinces.','Topic sentence → details → transitions → conclusion.','Combine with and, but, so, because.','Add details with prepositional phrases.']});

SG.add('g4_edit',{title:'Editing: grammar and punctuation',
  goals:['I can make subjects and verbs agree.','I can use commas in series, dates, addresses, and dialogue.','I can use apostrophes for contractions and possession.'],
  words:[['subject-verb agreement','a singular subject takes a singular verb; a plural subject takes a plural verb',''],['contraction','two words joined with an apostrophe','do not → don’t'],['possessive','shows ownership','the dog’s bone'],['quotation marks','marks around the exact words someone says','']],
  pages:[
    {h:'Subjects and verbs agree',p:['One subject → singular verb: “The <b>dog runs</b>.” More than one → plural verb: “The <b>dogs run</b>.”','Watch for words between the subject and verb: “The box of crayons <b>is</b> on the desk” (the subject is box).'],
     ex:{q:'Fix: “The girls in my class plays soccer.”',steps:['Subject: girls (plural).','Plural subject → plural verb: play.'],a:'The girls in my class play soccer.'},
     chk:{q:'Which is correct?',a:'My brother and I walk to school.',w:['My brother and I walks to school.','My brother and I is walking to school.','My brother and I walking to school.'],why:'“My brother and I” is plural, so use “walk.”'}},
    {h:'Commas and quotation marks',p:['<b>Series</b>: “I packed apples, grapes, and crackers.”','<b>Dates and places</b>: “On July 4, 1776, …” and “Richmond, Virginia.”','<b>Dialogue</b>: “Let’s go,” said Ava. / Ava said, “Let’s go.” The comma or period goes inside the quotation marks.'],
     ex:{q:'Fix: She said lets eat lunch',steps:['Add a comma after said.','Put quotation marks around her exact words, capitalize the first word.','Fix “lets” → “Let’s”; add the period inside.'],a:'She said, “Let’s eat lunch.”'},
     chk:{q:'Which date is written correctly?',a:'We moved on May 3, 2024, to Norfolk.',w:['We moved on May, 3 2024 to Norfolk.','We moved on May 3 2024 to Norfolk.','We moved on, May 3, 2024 to Norfolk.'],why:'A comma goes between the day and year, and after the year in a sentence.'}},
    {h:'Apostrophes',p:['<b>Contractions</b>: the apostrophe replaces missing letters: can’t (cannot), it’s (it is), they’re (they are).','<b>Possessives</b>: one owner → ’s (the cat’s toy); more than one owner ending in s → s’ (the cats’ toys).'],
     ex:{q:'Write the possessive: the bikes that belong to the boys.',steps:['“Boys” is plural and ends in s.','Add an apostrophe after the s.'],a:'the boys’ bikes'},
     chk:{q:'Which uses an apostrophe correctly?',a:'The teacher’s desk is neat.',w:['The teachers desk’s is neat.','The teacher’s are nice.','Its’ desk is neat.'],why:'One teacher owns the desk: teacher’s.'}}],
  watch:[['Matching the verb to the nearest noun (“The box of crayons are”).','Find the real subject: box → is.'],['Using an apostrophe to make a plural (“apple’s for sale”).','Plurals do not need apostrophes: apples.']],
  tips:['Editing questions show a sentence with a mistake — find the one choice that fixes it.'],
  sum:['Singular subject → singular verb.','Commas: series, dates, addresses, dialogue.','Punctuation goes inside quotation marks.','Apostrophes: contractions and possession.']});

// ── Grade 6 ──
SG.add('g6_vocab',{title:'Word meanings and figurative language',
  goals:['I can use Greek and Latin roots and affixes to predict word meanings.','I can use context to choose among multiple meanings.','I can explain similes, metaphors, personification, and hyperbole.'],
  words:[['root','the core part of a word','“bio” = life'],['affix','a prefix or suffix','“-ology” = study of'],['connotation','the feeling a word carries','thrifty (+) vs. stingy (−)'],['figurative language','words that mean more than their literal meaning',''],['simile / metaphor','a comparison with like/as / a comparison without like/as','']],
  pages:[
    {h:'Greek and Latin roots',p:['Many English words come from Greek and Latin. <b>bio</b> (life), <b>graph</b> (write), <b>tele</b> (far), <b>port</b> (carry), <b>struct</b> (build), <b>dict</b> (say), <b>geo</b> (earth).','Affixes change meaning: <b>-ology</b> (study of), <b>trans-</b> (across), <b>inter-</b> (between), <b>-able</b> (can be).'],
     ex:{q:'What does “biography” mean?',steps:['bio = life.','graph = write.'],a:'a written story of someone’s life'},
     chk:{q:'“Transport” most likely means…',a:'to carry across',w:['to write far away','to build again','to say between'],why:'trans- = across; port = carry.'}},
    {h:'Context, multiple meanings, and connotation',p:['Many words have more than one meaning. The sentence tells which one: “The pitcher threw a fast <b>pitch</b>” vs. “The singer hit a high <b>pitch</b>.”','<b>Connotation</b> is the feeling a word carries: “curious” sounds positive; “nosy” sounds negative.'],
     ex:{q:'“The lawyer will appeal the decision.” What does appeal mean here?',steps:['Lawyers and decisions → a courtroom.','Here it means asking a higher court to change a ruling.'],a:'to ask a higher court to review the decision'},
     chk:{q:'Which word has the most NEGATIVE connotation?',a:'stubborn',w:['determined','persistent','committed'],why:'All mean not giving up, but “stubborn” sounds negative.'}},
    {h:'Figurative language',p:['<b>Simile</b>: compares using like or as — “quiet as a mouse.”','<b>Metaphor</b>: says one thing IS another — “The classroom was a zoo.”','<b>Personification</b>: gives human traits to things — “The wind whispered.”','<b>Hyperbole</b>: extreme exaggeration — “I’ve told you a million times!”'],
     ex:{q:'“The stars danced in the night sky.” Which figurative language?',steps:['Stars cannot really dance.','A human action is given to a thing.'],a:'personification'},
     chk:{q:'“My backpack weighs a ton.” Which figurative language?',a:'hyperbole',w:['simile','personification','metaphor'],why:'It is an extreme exaggeration.'}}],
  watch:[['Calling every comparison a simile.','Only comparisons with like or as are similes; others are metaphors.'],['Ignoring connotation when choosing words.','Words with the same meaning can feel very different.']],
  tips:['Questions often ask what a word or phrase “most likely means” or “suggests” in context.'],
  sum:['Roots: bio, graph, tele, port, struct, dict, geo.','Context picks the right meaning.','Connotation = the feeling of a word.','Simile, metaphor, personification, hyperbole.']});

SG.add('g6_fiction',{title:'Analyzing literature',
  goals:['I can identify the theme and how details develop it.','I can trace plot structure and types of conflict.','I can analyze characters, point of view, and author’s craft.'],
  words:[['plot structure','exposition, rising action, climax, falling action, resolution',''],['internal / external conflict','a struggle inside a character / with an outside force',''],['dynamic / static character','a character who changes / one who stays the same',''],['protagonist / antagonist','the main character / the one who opposes them',''],['third person omniscient','an all-knowing narrator who knows every character’s thoughts','']],
  pages:[
    {h:'Theme and plot',p:['The <b>theme</b> is the story’s message about life. Details — especially how the main character changes — reveal it.','Plot: <b>exposition</b> (characters, setting) → <b>rising action</b> → <b>climax</b> (the turning point) → <b>falling action</b> → <b>resolution</b>.'],
     ex:{q:'In a story, the climax is when Jada must choose between winning the race and helping a fallen runner. She helps. What is a likely theme?',steps:['The turning point is a choice about values.','She chooses kindness over winning.'],a:'Kindness matters more than winning.'},
     chk:{q:'What is the climax of a story?',a:'the turning point of the main conflict',w:['the introduction of the characters','the ending after the problem is solved','the title'],why:'The climax is the moment of greatest tension where things turn.'}},
    {h:'Conflict and characters',p:['<b>External conflict</b>: character vs. character, nature, society, or technology. <b>Internal conflict</b>: character vs. self.','A <b>dynamic</b> character changes; a <b>static</b> character stays the same.','The <b>protagonist</b> is the main character; the <b>antagonist</b> opposes them.'],
     ex:{q:'Omar can’t decide whether to tell the coach he broke the rule. What type of conflict?',steps:['The struggle is inside Omar’s mind.'],a:'internal conflict (character vs. self)'},
     chk:{q:'A hiker struggles to survive a blizzard. What type of conflict?',a:'character vs. nature',w:['character vs. self','character vs. society','character vs. technology'],why:'The blizzard is a force of nature.'}},
    {h:'Point of view and craft',p:['<b>First person</b>: a character narrates (I). <b>Third person limited</b>: the narrator knows one character’s thoughts. <b>Third person omniscient</b>: the narrator knows everyone’s thoughts.','Authors create <b>tone</b> through imagery, figurative language, and word choice. Poets use rhyme, rhythm, repetition, alliteration, and onomatopoeia.'],
     ex:{q:'“Lena was terrified, but her brother secretly thought the storm was exciting.” Which point of view?',steps:['We know BOTH characters’ thoughts.','The narrator is outside the story and knows everyone’s feelings.'],a:'third person omniscient'},
     chk:{q:'“Buzz! Crash! Sizzle!” is an example of…',a:'onomatopoeia',w:['alliteration','rhyme','metaphor'],why:'Onomatopoeia words sound like what they describe.'}}],
  watch:[['Stating the theme as a topic (“friendship”).','Make it a message: “True friends stand by you.”'],['Mixing up third person limited and omniscient.','Limited = one character’s thoughts. Omniscient = everyone’s.']],
  tips:['Use evidence: questions ask which detail BEST supports an answer.'],
  sum:['Theme = message, shown through details and change.','Exposition → rising action → climax → falling action → resolution.','Internal vs. external conflict; dynamic vs. static.','POV: first, third limited, third omniscient.']});

SG.add('g6_nonfic',{title:'Analyzing informational text',
  goals:['I can summarize main ideas and how details develop them.','I can trace an argument and judge whether claims are supported by evidence.','I can explain text features, author’s purpose, and perspective.'],
  words:[['claim','a statement the author argues is true',''],['evidence','facts, data, examples, or quotes that support a claim',''],['author’s purpose','why the author wrote: inform, persuade, entertain',''],['perspective','the author’s point of view on a topic','']],
  pages:[
    {h:'Main ideas and summaries',p:['A <b>summary</b> gives the main ideas in your own words, briefly, without opinions.','Look at how details, examples, and anecdotes build each main idea.'],
     ex:{q:'What does a good summary leave out?',steps:['It keeps the main ideas.','It drops small details and your own opinions.'],a:'minor details and personal opinions'},
     chk:{q:'Which is the best summary sentence for an article about how the Chesapeake Bay is being cleaned up?',a:'Scientists, farmers, and volunteers are working together to reduce pollution in the Bay.',w:['I love visiting the Bay.','Crabs have ten legs.','The Bay is in Maryland and Virginia, and I think it is pretty.'],why:'It states the main idea briefly with no opinion.'}},
    {h:'Claims and evidence',p:['A <b>claim</b> is what the author argues. <b>Evidence</b> (facts, statistics, expert quotes, examples) supports it.','Strong evidence is <b>relevant</b> (it actually proves the claim) and <b>reliable</b>. Some claims have no support — notice them.'],
     ex:{q:'Claim: “Schools should start later.” Which is the strongest evidence?',steps:['Look for facts that directly support starting later.','A study showing teens learn better with more sleep fits best.'],a:'research showing students score higher when they get more sleep'},
     chk:{q:'Which statement is NOT supported by evidence?',a:'Everyone agrees that video games are bad.',w:['A survey of 500 students found 60% play video games daily.','The study measured reaction times before and after gaming.','Researchers compared two groups of students.'],why:'“Everyone agrees” is a sweeping claim with no evidence.'}},
    {h:'Features, purpose, and perspective',p:['<b>Text features</b> — boldface, italics, headings, subheadings, photos, graphs — highlight important ideas.','<b>Author’s purpose</b>: inform, persuade, or entertain. <b>Perspective</b>: how the author sees the topic, shown by word choice.','Comparing two authors? Look for where they agree and where they disagree.'],
     ex:{q:'An article calls a new mall “a reckless waste of green space.” What is the author’s perspective?',steps:['“Reckless” and “waste” are negative words.'],a:'The author is against the mall.'},
     chk:{q:'Why might an author put a word in bold?',a:'to show it is an important term',w:['to show it is spelled wrong','to make the page longer','to show it is a quote'],why:'Bold type draws attention to key terms.'}}],
  watch:[['Treating every statement as evidence.','Evidence must be facts or data that prove the claim.'],['Putting opinions in a summary.','A summary is neutral and brief.']],
  tips:['Questions may ask which sentence BEST supports the author’s claim.'],
  sum:['Summaries: main ideas, brief, no opinion.','Claim + relevant, reliable evidence.','Text features highlight key ideas.','Word choice shows perspective.']});

SG.add('g6_race',{title:'Argument writing and RACE responses',
  goals:['I can write a claim and support it with reasons and evidence.','I can organize multi-paragraph writing with a thesis, transitions, and a conclusion.','I can answer text questions with the RACE strategy.'],
  words:[['thesis','a sentence that states the main claim of an essay',''],['claim','your position',''],['counterclaim','an opposing argument',''],['RACE','Restate, Answer, Cite, Explain','']],
  pages:[
    {h:'Claims, reasons, and evidence',p:['A <b>claim</b> states your position clearly: “Students should have a longer lunch period.”','Support it with <b>reasons</b> and <b>evidence</b> — facts, examples, quotations — grouped logically.','Strong writers address a <b>counterclaim</b> and explain why their claim is still stronger.'],
     ex:{q:'Write a clear claim about school uniforms.',steps:['Take a side.','State it in one sentence.'],a:'Our school should not require uniforms because students learn to express themselves through clothing.'},
     chk:{q:'Which is the strongest claim?',a:'Cities should add more bike lanes to make streets safer.',w:['Bikes are cool.','Some people ride bikes.','I wonder about bike lanes.'],why:'It takes a clear, arguable position with a reason.'}},
    {h:'Organizing an essay',p:['<b>Introduction</b> with a <b>thesis</b> statement.','<b>Body paragraphs</b>: each with a topic sentence, evidence, and explanation.','<b>Transitions</b>: furthermore, however, as a result, for example.','<b>Conclusion</b> that restates the claim in a new way.'],
     ex:{q:'Which transition shows a contrast?',steps:['Contrast means showing a difference.'],a:'however'},
     chk:{q:'Where does the thesis statement usually go?',a:'in the introduction',w:['in the conclusion only','in the middle of every paragraph','in the title'],why:'The thesis introduces the essay’s main claim.'}},
    {h:'RACE for text questions',p:['<b>R</b> — Restate the question. <b>A</b> — Answer it. <b>C</b> — Cite evidence from the text. <b>E</b> — Explain how the evidence proves your answer.'],
     ex:{q:'Question: How does Kai feel about moving? (Text: “Kai stared out the window as the only home he had ever known shrank behind them.”)',steps:['R: Kai feels about moving…','A: …sad.','C: The text says he “stared out the window as the only home he had ever known shrank behind them.”','E: Staring at his shrinking home shows he is sad to leave.'],a:'Kai feels sad about moving, because he stares at his home as it disappears.'},
     chk:{q:'In RACE, what does the E step do?',a:'explains how the evidence proves the answer',w:['ends with a question','edits the spelling','estimates the answer'],why:'Explain connects your evidence to your answer.'}}],
  watch:[['Quoting evidence without explaining it.','Always add the E: why does this prove your answer?'],['Writing a claim that is just a fact.','A claim must be arguable.']],
  tips:['Writing items may ask which sentence best supports a claim or best concludes a paragraph.'],
  sum:['Clear claim + reasons + evidence.','Address a counterclaim.','Intro (thesis) → body → conclusion, with transitions.','RACE: Restate, Answer, Cite, Explain.']});

SG.add('g6_edit',{title:'Editing: grammar and mechanics',
  goals:['I can write simple, compound, and complex sentences and avoid run-ons and comma splices.','I can use pronoun-antecedent and subject-verb agreement.','I can use often-confused verbs and punctuate dialogue and quotations.'],
  words:[['complex sentence','an independent clause plus a dependent clause','Because it rained, we stayed in.'],['comma splice','two sentences joined only by a comma',''],['antecedent','the noun a pronoun replaces',''],['indefinite pronoun','a pronoun like everyone, each, someone','usually singular']],
  pages:[
    {h:'Sentences: no run-ons or splices',p:['<b>Simple</b>: one complete thought. <b>Compound</b>: two joined with , and / , but / , so or a semicolon. <b>Complex</b>: a main clause plus a clause starting with because, although, when, if.','A <b>comma splice</b> joins two sentences with only a comma. Fix it with a period, a semicolon, or a comma plus a conjunction.'],
     ex:{q:'Fix: “The game was over, we went home.”',steps:['Two complete sentences joined by just a comma = comma splice.','Add a conjunction: , so.'],a:'The game was over, so we went home.'},
     chk:{q:'Which sentence is punctuated correctly?',a:'I studied hard; I passed the test.',w:['I studied hard, I passed the test.','I studied hard I passed the test.','I studied, hard I passed the test.'],why:'A semicolon can join two complete sentences.'}},
    {h:'Agreement',p:['Pronouns must agree with their <b>antecedents</b>. Indefinite pronouns like <b>everyone</b>, <b>each</b>, and <b>someone</b> are singular: “<b>Each</b> of the girls brought <b>her</b> lunch.”','Subjects and verbs agree even with phrases in between: “<b>Neither</b> of the boys <b>was</b> late.”'],
     ex:{q:'Fix: “Each of the trees lost their leaves.”',steps:['The antecedent is “each” (one tree at a time), so it is singular.','A tree is a thing, so use “its.”'],a:'Each of the trees lost its leaves.'},
     chk:{q:'Which is correct?',a:'One of the books is missing.',w:['One of the books are missing.','One of the books were missing.','One of the books be missing.'],why:'The subject is “one” (singular), not “books.”'}},
    {h:'Tricky verbs and dialogue',p:['<b>Lie</b> (to rest) / <b>lay</b> (to put something down). <b>Sit</b> / <b>set</b> (set something down). <b>Rise</b> (go up by itself) / <b>raise</b> (lift something).','Dialogue: punctuation goes inside the quotation marks, and start a new paragraph for each new speaker.'],
     ex:{q:'Choose: “Please (lay/lie) the book on the table.”',steps:['You are putting something (the book) down.'],a:'lay'},
     chk:{q:'Which is correct?',a:'The sun rises every morning.',w:['The sun raises every morning.','The sun rised every morning.','The sun raise every morning.'],why:'The sun goes up by itself, so use “rises.”'}}],
  watch:[['Joining two sentences with only a comma.','Use a period, a semicolon, or a comma + conjunction.'],['Using a plural pronoun with “each” for things.','Each of the trees lost its leaves.'],['Mixing up lie and lay.','Lay needs an object: lay the book. Lie = rest.']],
  tips:['Editing items often hide one error — read the whole sentence carefully.'],
  sum:['Simple, compound, complex — no comma splices.','Indefinite pronouns are singular.','Agreement skips the phrase in between.','Lie/lay, sit/set, rise/raise; punctuation inside quotes.']});

['g4_vocab','g4_fiction','g4_nonfic','g4_sentence','g4_edit'].forEach(g=>{SG_SPRITE[g]='sg_g4eng';});
['g6_vocab','g6_fiction','g6_nonfic','g6_race','g6_edit'].forEach(g=>{SG_SPRITE[g]='sg_g6eng';});
