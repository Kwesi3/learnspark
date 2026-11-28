// Skills that have a study guide open it instead of the short lesson (see 445-study-guide.js).
// Kept after the worksheet/video add-ons so their buttons are not added twice.
const _olSG=openLesson;
openLesson=function(subj,code,firstTime){const st=findSkill(subj,code);
  if(st&&STUDY[st.gen])return openStudy(subj,code);return _olSG.apply(this,arguments);};
