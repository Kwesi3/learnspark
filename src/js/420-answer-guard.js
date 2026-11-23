// Guard: no wrong option may equal the answer in value (e.g. 1/2 vs 3/6), and n/1 answers read as whole numbers.
(function(){
  const val=s=>{s=String(s).trim();if(/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))s=s.replace(/,/g,'');let m=/^(-?\d+) (\d+)\/(\d+)$/.exec(s);if(m)return +m[1]+m[2]/m[3];m=/^(-?\d+)\/(\d+)$/.exec(s);if(m)return +m[2]?m[1]/m[2]:null;m=/^-?\d+(\.\d+)?$/.exec(s);return m?+s:null;};
  const SKIP=/simplest|lowest terms|equivalent|same (value|amount)|equal to|NOT|unsimplified|improper|mixed number/i;
  const _mq=makeQ;
  makeQ=function(gen){
    const q=_mq.apply(this,arguments);
    try{
      if(!q||!Array.isArray(q.opts)||SKIP.test(q.question||''))return q;
      let m=/^(-?\d+)\/1$/.exec(String(q.answer));
      if(m){const a=String(q.answer);q.opts=q.opts.map(o=>String(o)===a?m[1]:o);q.answer=m[1];if(q.explanation)q.explanation=q.explanation.split(a).join(m[1]);}
      const va=val(q.answer);if(va==null)return q;
      const used=new Set(q.opts.map(String));
      q.opts=q.opts.map(o=>{
        const vo=val(o);if(String(o)===String(q.answer)||vo==null||Math.abs(vo-va)>1e-9)return o;
        const f=/^(-?\d+)\/(\d+)$/.exec(String(o));
        const tries=f?[`${+f[1]+1}/${f[2]}`,`${+f[1]-1}/${f[2]}`,`${f[1]}/${+f[2]+1}`,`${+f[1]+2}/${f[2]}`]:[String(+(vo+1).toFixed(4)),String(+(vo*2).toFixed(4))];
        for(const t of tries){const vt=val(t);if(!used.has(t)&&vt!=null&&vt>0===va>0&&Math.abs(vt-va)>1e-9&&!q.opts.some(x=>val(x)!=null&&Math.abs(val(x)-vt)<1e-9)){used.add(t);return t;}}
        return o;});
    }catch(e){}
    return q;
  };
})();

// Grammar: "1 tens" → "1 ten", "1 inches" → "1 inch". Applied the same way to question, choices and answer.
(function(){
  const SING={tens:'ten',ones:'one',hundreds:'hundred',thousands:'thousand',days:'day',hours:'hour',minutes:'minute',seconds:'second',weeks:'week',years:'year',
    cups:'cup',feet:'foot',inches:'inch',yards:'yard',miles:'mile',pounds:'pound',ounces:'ounce',quarters:'quarter',dimes:'dime',nickels:'nickel',pennies:'penny',
    dollars:'dollar',cents:'cent',students:'student',apples:'apple',books:'book',groups:'group',rows:'row'};
  const RE=new RegExp('(^|[^\\d.,/−-])1 ('+Object.keys(SING).join('|')+')\\b','g');
  const fix=s=>typeof s==='string'?s.replace(RE,(m,pre,w)=>pre+'1 '+SING[w]):s;
  const _mq=makeQ;
  makeQ=function(){const q=_mq.apply(this,arguments);
    try{if(!q)return q;
      for(const k of ['question','explanation','hint','answer','correct'])if(typeof q[k]==='string')q[k]=fix(q[k]);
      if(Array.isArray(q.opts))q.opts=q.opts.map(fix);if(Array.isArray(q.answers))q.answers=q.answers.map(fix);
    }catch(e){}
    return q;};
})();
