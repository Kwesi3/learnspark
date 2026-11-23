const src=require('fs').readFileSync(require('path').join(__dirname,'story.js'),'utf8');eval(src.split('(async()=>{')[0]);
let fail=0;const ok=m=>console.log('  ✓',m),bad=m=>{fail++;console.log('  ✗',m);};
(async()=>{
 // device A: two learners with progress
 const A=boot();typeName(A.w,'Ama');A.w.formGrade(4);A.w.formSave();
 A.w.eval('ST.totalQ=120;ST.xp=500;ST.skills.math_x={n:5,c:4,score:60};save()');
 const gid=A.w.eval('ST.id');
 const payload=A.w.eval('JSON.stringify(syncPayload())');
 const code=await A.w.b64z(payload);code.startsWith('LS')?ok('transfer code made ('+code.slice(0,4)+', '+code.length+' chars)'):bad('code');
 const back=await A.w.unb64z(code);back===payload?ok('code decodes to the same progress'):bad('roundtrip');
 // LS1 path with Node's CompressionStream
 global.Blob=require('buffer').Blob;const zA=eval('('+A.w.b64z.toString()+')'),zB=eval('('+A.w.unb64z.toString()+')');
 const c1=await zA(payload);c1.startsWith('LS1:')&&(await zB(c1))===payload?ok(`compressed code works (${c1.length} chars vs ${payload.length})`):bad('LS1');
 // device B: fresh, load the file
 const B=boot();typeName(B.w,'Kofi');B.w.formGrade(6);B.w.formSave();
 B.w.openSync();B.w.syncPreview(payload);const rows=B.d.querySelectorAll('.sync-row');
 rows.length===1&&rows[0].textContent.includes('New on this device')?ok('preview lists Ama as new'):bad('preview '+rows.length);
 B.w.syncImport();const L=B.w.eval('Object.values(PROFILES.list).map(p=>p.name+":"+p.totalQ).sort().join(",")');
 L==='Ama:120,Kofi:0'?ok('Ama loaded beside Kofi: '+L):bad('import '+L);
 // conflict: device B has newer progress for Ama → unchecked by default
 B.w.eval(`activateProfile('${gid}');ST.totalQ=200;save()`);
 B.w.openSync();B.w.syncPreview(payload);const cb=B.d.querySelector('.sync-prev input');
 cb&&!cb.checked&&B.d.querySelector('.sync-row').textContent.includes('newer progress')?ok('newer progress on this device is kept by default'):bad('conflict default');
 // bad input
 B.w.syncPreview('{"hello":1}');B.d.body.textContent.includes('isn’t a LearnSpark')?ok('rejects a non-LearnSpark file'):bad('reject');
 B.w.closeSheet();B.w.openSettings();B.d.body.textContent.includes('Move progress to another device')?ok('Settings has Move progress'):bad('settings entry');
 console.log(fail?`FAILED ${fail}`:'ALL PASSED');process.exit(0);
})();
