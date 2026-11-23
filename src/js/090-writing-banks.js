// ═══════════════════════════════════════════════════════════════
// WRITING — banks
// ═══════════════════════════════════════════════════════════════
const WRITE_BANK={
  g4_sentence:[
    {words:["The","hungry","dog","chased","the","ball"],correct:"The hungry dog chased the ball"},
    {words:["My","friend","and","I","played","outside"],correct:"My friend and I played outside"},
    {words:["Every","morning","she","reads","a","book"],correct:"Every morning she reads a book"},
    {words:["The","bright","stars","filled","the","sky"],correct:"The bright stars filled the sky"},
    {words:["We","went","to","the","park","yesterday"],correct:"We went to the park yesterday"},
  ],
  g4_edit:[
    {passage:"my brother and me went to the store.",q:"Which is the CORRECT version?",
     o:["My brother and me went to the store.","My brother and I went to the store.","me and my brother went to the store."],
     a:"My brother and I went to the store.",h:"Test it: 'Me went'? or 'I went'? Also capitalize the first word.",
     e:"Use 'I' as the subject, and capitalize 'My' at the start: 'My brother and I went...'"},
    {passage:"the dog runned across the yard",q:"Which is the CORRECT version?",
     o:["The dog runned across the yard.","The dog ran across the yard.","the dog ran across the yard"],
     a:"The dog ran across the yard.",h:"Past tense of 'run' is irregular. Also: capital + period.",
     e:"'Ran' is the correct past tense (not 'runned'), with a capital T and a period."},
    {passage:"she dont like spinach",q:"Which is the CORRECT version?",
     o:["She dont like spinach.","She doesn't like spinach.","she doesnt like spinach"],
     a:"She doesn't like spinach.",h:"She/he/it uses 'doesn't'. Don't forget the apostrophe, capital, and period.",
     e:"'She doesn't' is correct (with apostrophe), capitalized, and ends with a period."},
    {passage:"we saw alot of birds at the lake",q:"Which is the CORRECT version?",
     o:["We saw alot of birds at the lake.","We saw a lot of birds at the lake.","we saw a lot of birds at the lake"],
     a:"We saw a lot of birds at the lake.",h:"'A lot' is TWO words. Also capital + period.",
     e:"'A lot' is always two words, plus a capital W and ending period."},
  ],
  g6_race:[
    {passage:"When wolves were reintroduced to Yellowstone in 1995, they hunted elk, which allowed overgrazed plants to recover. Beavers returned to the healthier streams, and even the rivers changed course as vegetation stabilized the banks. Scientists call this a 'trophic cascade.'",
     q:"How did wolves change the Yellowstone ecosystem? Write a R.A.C.E. response.",
     model:{R:"The question asks how reintroducing wolves changed Yellowstone's ecosystem.",
       A:"The wolves triggered a chain reaction that changed the plants, animals, and even the rivers.",
       C:"The passage states that wolves hunted elk, plants recovered, beavers returned, and rivers changed course — a 'trophic cascade.'",
       E:"This shows that a single species can transform an entire ecosystem. By controlling the elk, the wolves allowed the whole system to rebalance itself."},
     h:"R=restate, A=answer, C=cite from the passage, E=explain how it proves your answer."},
  ],
  g6_edit:[
    {passage:"Their going to the museum, but they forgot there tickets.",q:"Which is the CORRECT version?",
     o:["Their going to the museum, but they forgot there tickets.","They're going to the museum, but they forgot their tickets.","There going to the museum, but they forgot they're tickets."],
     a:"They're going to the museum, but they forgot their tickets.",
     h:"They're = they are. Their = belonging to them. There = a place.",
     e:"'They're' (they are) going; they forgot 'their' (belonging to them) tickets."},
    {passage:"Each of the students have finished there project.",q:"Which is the CORRECT version?",
     o:["Each of the students have finished there project.","Each of the students has finished their project.","Each of the students has finished there project."],
     a:"Each of the students has finished their project.",
     h:"'Each' is singular → 'has'. 'Their' shows possession (not 'there').",
     e:"'Each' is singular, so use 'has'. Use 'their' (possessive), not 'there' (place)."},
    {passage:"Me and him are the fastest runners on the team.",q:"Which is the CORRECT version?",
     o:["Me and him are the fastest runners.","He and I are the fastest runners.","Him and me are the fastest runners."],
     a:"He and I are the fastest runners.",
     h:"Test each alone: 'He is fast' + 'I am fast' → 'He and I'.",
     e:"Subject pronouns 'He and I' are correct (not 'me and him')."},
  ],
};

function makeQ(gen){
  if(typeof HIST_BANK!=='undefined'&&HIST_BANK[gen])return histQ(gen);
  // reading
  if(READ_BANK[gen]){const q=pick(READ_BANK[gen]);
    return {type:'mc',badge:gen.includes('vocab')?'Vocabulary':gen.includes('fiction')?'Fiction':'Nonfiction',
      sol:strandCode(gen),passage:q.p||q.s,question:q.q,opts:shuf(q.o),answer:q.a,explanation:q.e,hint:q.h};}
  // science
  if(SCI_BANK[gen]){const q=pick(SCI_BANK[gen]);
    return {type:'mc',badge:'Science',sol:strandCode(gen),question:q.q,opts:shuf(q.o),answer:q.a,explanation:q.e,hint:q.h};}
  // writing
  if(gen==='g4_sentence'){const q=pick(WRITE_BANK.g4_sentence);
    return {type:'sentence',badge:'Sentence Builder',sol:'4.7',words:q.words,correct:q.correct,hint:'Start with the naming word (who/what), then the action.'};}
  if(gen==='g4_edit'||gen==='g6_edit'){const q=pick(WRITE_BANK[gen]);
    return {type:'mc',badge:'Editing',sol:gen==='g4_edit'?'4.8':'6.8',passage:q.passage,question:q.q,opts:shuf(q.o),answer:q.a,explanation:q.e,hint:q.h};}
  if(gen==='g6_race'){const q=pick(WRITE_BANK.g6_race);
    return {type:'race',badge:'RACE Writing',sol:'6.7',passage:q.passage,question:q.q,model:q.model,hint:q.h};}
  // math generators
  if(GEN[gen])return GEN[gen]();
  return GEN.g4_place();
}
function strandCode(gen){
  const map={g4_vocab:'4.4',g4_fiction:'4.5',g4_nonfic:'4.6',g6_vocab:'6.4',g6_fiction:'6.5',g6_nonfic:'6.6',
    g4_force:'4.2',g4_elec:'4.3',g4_plants:'4.4',g4_eco:'4.5',g4_weather:'4.6',g4_space:'4.7',
    g6_energy:'6.2',g6_solar:'6.3',g6_eco:'6.5',g6_atmo:'6.6',g6_resource:'6.8'};
  return map[gen]||'';
}

