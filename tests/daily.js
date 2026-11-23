const src=require('fs').readFileSync(require('path').join(__dirname,'story.js'),'utf8');eval(src.split('(async()=>{')[0]);
let fail=0;const ok=m=>console.log('  ✓',m),bad=m=>{fail++;console.log('  ✗',m);};
for(const grade of [2,4,6]){
 const {w,d}=boot();typeName(w,'Kid');w.formGrade(grade);w.formSave();w.switchTab('learn');
 const dp=d.querySelector('.dp');dp&&dp.querySelectorAll('.dp-step').length>=3?ok(`grade ${grade}: plan shows ${dp.querySelectorAll('.dp-step').length} steps`):bad('plan missing');
 // Fact sprint, all correct
 w.startFactSprint();w.fsGo();const FS=w.eval('FS');
 for(let i=0;i<FS.qs.length;i++){const el=d.getElementById('fsIn');el.value=String(FS.qs[i].a);w.fsSubmit();w.eval('FS.lock=false;FS.i++;FS.i<FS.qs.length?fsDraw():fsEnd()');}
 d.body.textContent.includes('20 of 20 correct')?ok(`grade ${grade}: Fact Sprint 20/20 scored`):bad('sprint score '+d.querySelector('#fsCard').textContent.slice(0,80));
 grade>=3?(d.querySelectorAll('.fs-grid i').length>0?ok(`grade ${grade}: times-table map drawn`):bad('grid')):0;
 w.fsQuit();w.switchTab('learn');
 d.querySelector('.dp-step.done')?ok(`grade ${grade}: warm-up step checked off`):bad('warm not done');
 // skill step: answer 8
 const D=w.eval('ST.extras.daily');w.eval(`DP_STEP='skill';startSkill('${D.skill.subj}','${D.skill.code}')`);
 if(!w.eval('SESSION.gen'))w.eval(`beginPractice('${D.skill.subj}','${D.skill.code}')`);
 for(let k=0;k<8;k++){w.eval('record(true,"x","y");SESSION.answered=false;');}
 w.eval('ST.tab="learn";renderDash()');
 d.querySelectorAll('.dp-step.done').length>=2?ok(`grade ${grade}: practice step checked off after 8 questions`):bad('skill step '+d.querySelectorAll('.dp-step.done').length);
 // read step: mark a book read today
 w.eval(`rstate().books['${D.book}']={done:1,stars:2,last:Date.now()};ST.tab="learn";renderDash()`);
 d.querySelectorAll('.dp-step.done').length>=3?ok(`grade ${grade}: reading step checked off`):bad('read');
 // fix step
 if(D.fix.type==='fix'){w.eval('ST.extras.fixedTotal=(ST.extras.fixedTotal||0)+5');}else{w.eval(`beginPractice('${D.fix.subj}','${D.fix.code}')`);for(let k=0;k<8;k++)w.eval('record(true,"x","y");SESSION.answered=false;');}
 const st0=w.eval('ST.stars');w.eval('ST.tab="learn";renderDash()');
 d.querySelectorAll('.dp-step.done').length===d.querySelectorAll('.dp-step').length&&w.eval('ST.extras.daily.bonus')&&w.eval('ST.stars')===st0+2?ok(`grade ${grade}: all steps done → +2 stars bonus once`):bad('all done');
 w.eval('ST.tab="learn";renderDash()');w.eval('ST.stars')===st0+2?0:bad('bonus twice');
 w.switchTab('arcade');d.querySelector('.fs-promo')?ok(`grade ${grade}: Fact Sprint card in Arcade`):bad('arcade promo');
}
console.log(fail?`FAILED ${fail}`:'ALL PASSED');process.exit(0);
