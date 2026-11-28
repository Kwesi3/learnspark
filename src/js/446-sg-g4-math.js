// ═══════════════════════════════════════════════════════════════
// Study guides — Grade 4 Mathematics (2023 Virginia SOL).
// Source: VDOE "Instructional Guide to Support 2023 Grade 4 Mathematics Standards of Learning"
// (Understanding the Standard, Skills in Practice). Limits in the guide are kept
// (e.g. fractions with denominators of 12 or less, decimals through thousandths).
// ═══════════════════════════════════════════════════════════════

// small drawings used only by the study guides
function sgPV(num,hi){ // place-value chart for a whole number; hi = index of the digit to highlight
  const names=['hundred millions','ten millions','millions','hundred thousands','ten thousands','thousands','hundreds','tens','ones'];
  const short=['100M','10M','1M','100K','10K','1K','100','10','1'];
  const d=String(num).padStart(9,' ').split(''),w=40;let r='';
  d.forEach((c,i)=>{const x=8+i*w+(i>=3?10:0)+(i>=6?10:0);
    r+=dgText(x+(w-4)/2,18,short[i],{s:11,c:'#4A5874'});
    r+=`<rect x="${x}" y="26" width="${w-4}" height="40" rx="6" fill="${i===hi?'#FFE08A':'#F2F6FC'}" stroke="#1B2A4A" stroke-width="2"/>`+dgText(x+(w-4)/2,54,c.trim(),{s:20});});
  r+=dgText(66,86,'millions',{s:12,c:'#4A5874'})+dgText(196,86,'thousands',{s:12,c:'#4A5874'})+dgText(326,86,'ones',{s:12,c:'#4A5874'});
  return dgSvg(392,94,r,'Place value chart for '+num+': '+names.join(', '));}
function sgNL(a,b,step,marks,lab){ // number line from a to b; marks = [[value,label]]
  const X=v=>20+(v-a)/(b-a)*320;let r=`<line x1="14" y1="50" x2="346" y2="50" stroke="#1B2A4A" stroke-width="3"/>`;
  for(let v=a;v<=b+1e-9;v+=step){const lb=lab?lab(v):String(+v.toFixed(3));r+=`<line x1="${X(v)}" y1="42" x2="${X(v)}" y2="58" stroke="#1B2A4A" stroke-width="2"/>`+dgText(X(v),78,lb,{s:13});}
  (marks||[]).forEach(([v,t])=>{r+=`<circle cx="${X(v)}" cy="50" r="7" fill="#E4573D"/>`+dgText(X(v),30,t,{s:14,c:'#B42318'});});
  return dgSvg(360,90,r,'Number line');}
function sgGrid(tenths,hund){ // 10x10 grid with shading
  let r='';for(let i=0;i<100;i++){const c=i%10,rw=Math.floor(i/10);const on=c<tenths||(c===tenths&&rw<hund);
    r+=`<rect x="${70+c*20}" y="${4+rw*20}" width="20" height="20" fill="${on?'#7FB3FF':'#fff'}" stroke="#1B2A4A" stroke-width="1"/>`;}
  return dgSvg(340,208,r,`Hundred grid with ${tenths*10+hund} of 100 shaded`);}
function sgShape(kind){
  const P={square:'60,20 160,20 160,120 60,120',rectangle:'30,35 200,35 200,115 30,115',rhombus:'110,10 180,70 110,130 40,70',
    parallelogram:'60,30 210,30 170,120 20,120',trapezoid:'70,30 160,30 210,120 20,120'}[kind];
  return dgSvg(240,140,`<polygon points="${P}" fill="#DCE8FF" stroke="#1B2A4A" stroke-width="3.5" stroke-linejoin="round"/>`,'A '+kind);}
function sgLines(){const r=`<line x1="10" y1="30" x2="150" y2="30" stroke="#1B2A4A" stroke-width="3"/><line x1="10" y1="60" x2="150" y2="60" stroke="#1B2A4A" stroke-width="3"/>`+dgText(80,90,'parallel ∥',{s:13})+
  `<line x1="190" y1="45" x2="290" y2="45" stroke="#1B2A4A" stroke-width="3"/><line x1="240" y1="5" x2="240" y2="80" stroke="#1B2A4A" stroke-width="3"/><path d="M240 45 h10 v-10 h-10" fill="none" stroke="#E4573D" stroke-width="2"/>`+dgText(240,98,'perpendicular ⊥',{s:13})+
  `<line x1="320" y1="10" x2="400" y2="80" stroke="#1B2A4A" stroke-width="3"/><line x1="320" y1="80" x2="400" y2="10" stroke="#1B2A4A" stroke-width="3"/>`+dgText(360,98,'intersecting',{s:13});
  return dgSvg(410,104,r,'Parallel, perpendicular and intersecting lines');}
function sgLineGraph(pts,lab){const mx=Math.max(...pts.map(p=>p[1]));const top=Math.ceil((mx+1)/2)*2;const X=i=>50+i*(280/(pts.length-1)),Y=v=>150-v/top*120;
  let r=`<line x1="50" y1="150" x2="340" y2="150" stroke="#1B2A4A" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="150" stroke="#1B2A4A" stroke-width="2"/>`;
  for(let v=0;v<=top;v+=2)r+=`<line x1="46" y1="${Y(v)}" x2="340" y2="${Y(v)}" stroke="#E2E8F2"/>`+dgText(38,Y(v)+4,String(v),{s:11,a:'end'});
  r+=`<polyline points="${pts.map((p,i)=>X(i)+','+Y(p[1])).join(' ')}" fill="none" stroke="#2F6FE0" stroke-width="3"/>`;
  pts.forEach((p,i)=>{r+=`<circle cx="${X(i)}" cy="${Y(p[1])}" r="5" fill="#2F6FE0"/>`+dgText(X(i),168,p[0],{s:11});});
  r+=dgText(195,14,lab,{s:13});return dgSvg(350,176,r,lab);}

SG.add('g4_place',{title:'Place value to hundred millions',
  goals:['I can read and write numbers up to nine digits in standard form and word form.','I can name the place and the value of any digit.','I can use commas to split a number into periods.'],
  words:[['digit','one of the symbols 0–9','347 has three digits'],['place','where a digit sits: ones, tens, hundreds…',''],['value','what a digit is worth in its place','in 5,280 the 5 is worth 5,000'],['period','a group of three places: ones, thousands, millions','commas separate periods'],['standard form','a number written with digits','24,603,115'],['word form','a number written in words','twenty-four million, six hundred three thousand, one hundred fifteen']],
  pages:[
    {h:'Each place is worth 10 times more',p:['Our number system is base 10. Every place is worth <b>10 times</b> the place to its right: ones, tens, hundreds, then thousands, ten thousands, hundred thousands, then millions.','Ten ones make a ten. Ten tens make a hundred. Ten hundreds make a thousand — and it keeps going all the way to hundred millions.'],
     dg:()=>sgPV(316184725,1),
     ex:{q:'What is the value of the 1 in 316,184,725?',steps:['Find the 1: it is the second digit from the left.','Count its place: hundred millions, <b>ten millions</b>.','A 1 in the ten millions place is worth 1 × 10,000,000.'],a:'10,000,000 (ten million)'},
     chk:{q:'In 316,184,725, what is the value of the 8?',a:'80,000',w:['8','8,000','800,000'],why:'The 8 is in the ten thousands place, so it is worth 8 × 10,000 = 80,000.',hint:'Find the 8, then name its place: ones, tens, hundreds, thousands, ten thousands…'}},
    {h:'Periods and commas',p:['Big numbers are split into <b>periods</b> of three digits. A comma goes between periods: millions , thousands , ones.','To read a number, read each period like a small number, then say its name: “316 <b>million</b>, 184 <b>thousand</b>, 725.” You never say “ones” at the end.'],
     ex:{q:'Read 52,009,430 in words.',steps:['Split into periods: 52 | 009 | 430.','52 million.','009 thousand is just “nine thousand”.','430 is “four hundred thirty”.'],a:'fifty-two million, nine thousand, four hundred thirty'},
     chk:{q:'Which shows 7,040,300 in words?',a:'seven million, forty thousand, three hundred',w:['seven million, four thousand, three hundred','seven million, forty thousand, thirty','seventy million, forty thousand, three hundred'],why:'Periods: 7 | 040 | 300 → seven million, forty thousand, three hundred.'}},
    {h:'Zeros hold a place',p:['When you write words as digits, every period except the first must have <b>three digits</b>. If a place is empty, write a <b>0</b> so the other digits stay in the right places.','“Three hundred sixty million, one hundred seven thousand, nineteen” → 360 | 107 | 019 → 360,107,019.'],
     ex:{q:'Write “four million, six thousand, twelve” in standard form.',steps:['Millions period: 4.','Thousands period must have 3 digits: six → 006.','Ones period must have 3 digits: twelve → 012.'],a:'4,006,012'},
     chk:{q:'Write “eighty million, two hundred thousand, five” in standard form.',a:'80,200,005',w:['80,200,5','8,200,005','80,002,005'],why:'80 | 200 | 005 — the ones period needs three digits, so five is written 005.'}}],
  watch:[['Saying the 1 in 16,184,725 is worth 1.','Its value depends on its place: it is in the ten millions place, so it is worth 10,000,000.'],['Writing “six thousand, twelve” as 6,12.','Every period after the first has three digits: 6,012.'],['Saying “ones” or “and” when reading a whole number.','Read each period and its name: “five thousand, two hundred one.”']],
  tips:['Questions may ask for the place OR the value — read carefully which one they want.','Some questions show expanded form, like 4,000,000 + 30,000 + 9.'],
  sum:['Each place is worth 10 times the place to its right.','Periods of three digits are separated by commas.','Zeros hold empty places.','Value = digit × its place.']});

SG.add('g4_cmp',{title:'Compare and order whole numbers',
  goals:['I can compare two whole numbers up to seven digits using >, <, or =.','I can order up to four numbers from least to greatest or greatest to least.'],
  words:[['greater than (>)','the open side faces the bigger number','9 > 4'],['less than (<)','the point faces the smaller number','4 < 9'],['equal to (=)','the same amount',''],['not equal to (≠)','not the same amount','5 ≠ 6'],['least to greatest','smallest first','']],
  pages:[
    {h:'Line up the places and start on the LEFT',p:['First count the digits. A number with <b>more digits</b> is greater (1,000,000 has seven digits, 999,999 only six).','Same number of digits? Line them up and compare from the <b>left</b>. The first place where the digits are different decides.'],
     ex:{q:'Compare 4,582,301 and 4,591,000.',steps:['Both have seven digits.','Millions: 4 and 4 — same.','Hundred thousands: 5 and 5 — same.','Ten thousands: 8 and 9 — different! 8 is less than 9.'],a:'4,582,301 < 4,591,000'},
     chk:{q:'Which is true?',a:'1,021,000 > 997,999',w:['997,999 > 1,021,000','1,021,000 < 997,999','1,021,000 = 997,999'],why:'1,021,000 has seven digits and 997,999 has only six, so 1,021,000 is greater — even though 997,999 starts with a 9.'}},
    {h:'Reading the symbols',p:['The symbol always <b>opens toward the bigger number</b>, like a mouth eating the bigger snack.','Read it from left to right out loud: “3,402 <b>is less than</b> 3,420.” Saying it helps you check.'],
     ex:{q:'Fill in: 605,118 ___ 605,181',steps:['Same digits until the tens place.','Tens: 1 and 8. 1 is less.','The point faces 605,118.'],a:'605,118 < 605,181'},
     chk:{q:'Which symbol makes this true? 2,300,450 ___ 2,030,450',a:'>',w:['<','='],why:'Hundred thousands: 3 is greater than 0, so 2,300,450 > 2,030,450.'}},
    {h:'Ordering up to four numbers',p:['Compare the numbers two at a time, or line them all up in a place-value chart.','Then <b>check the direction</b> the question asks: least to greatest means smallest first; greatest to least means biggest first.'],
     ex:{q:'Order from least to greatest: 52,310 · 5,231 · 52,031 · 523,100',steps:['Fewest digits is smallest: 5,231 (four digits).','Two have five digits: 52,031 and 52,310. Hundreds: 0 < 3, so 52,031 comes first.','Six digits is greatest: 523,100.'],a:'5,231 · 52,031 · 52,310 · 523,100'},
     chk:{q:'Which list is from GREATEST to least?',a:'80,400 · 80,040 · 8,400 · 8,040',w:['8,040 · 8,400 · 80,040 · 80,400','80,040 · 80,400 · 8,400 · 8,040','80,400 · 8,400 · 80,040 · 8,040'],why:'Greatest first: 80,400 > 80,040 > 8,400 > 8,040.'}}],
  watch:[['Thinking 997,999 > 1,021,000 because it starts with a 9.','Count digits first — more digits means a bigger whole number.'],['Ordering greatest to least when the question says least to greatest.','Circle the words “least to greatest” before you start.'],['Mixing up < and >.','Read it aloud. The open side faces the bigger number.']],
  tips:['You may have to drag numbers into order, or choose all the true comparisons.'],
  sum:['More digits → greater number.','Same digits → compare from the left.','The open side of > or < faces the bigger number.','Check the order the question asks for.']});

SG.add('g4_frac',{title:'Fractions: compare, order and equivalents',
  goals:['I can name fractions and mixed numbers with denominators of 12 or less.','I can compare and order fractions using models, benchmarks, and like parts.','I can find equivalent fractions.'],
  words:[['numerator','the top number: how many parts you are counting','in ¾, it is 3'],['denominator','the bottom number: how many equal parts make one whole','in ¾, it is 4'],['equivalent fractions','different fractions for the same amount','½ = 2/4'],['mixed number','a whole number and a fraction','1 ¾'],['improper fraction','top is bigger than or equal to the bottom','7/4'],['benchmark','a friendly number to compare with: 0, ½, 1','']],
  pages:[
    {h:'What a fraction means',p:['The <b>denominator</b> tells how many <b>equal</b> parts the whole is cut into. The <b>numerator</b> tells how many of those parts you have.','A fraction is also a division: 3/5 means 3 ÷ 5 — like 3 pizzas shared equally by 5 friends.'],
     dg:c=>dgFractionBar(4,3,c),
     ex:{q:'What fraction of the bar is shaded?',steps:['Count all the equal parts: 4. That is the denominator.','Count the shaded parts: 3. That is the numerator.'],a:'3/4'},
     chk:{q:'A pizza is cut into 8 equal slices. Ana eats 3. What fraction did she eat?',a:'3/8',w:['8/3','3/5','5/8'],why:'8 equal slices make the whole (denominator), and she ate 3 of them (numerator): 3/8.'}},
    {h:'Comparing fractions',p:['<b>Same denominator?</b> The parts are the same size, so the bigger numerator wins: 5/8 > 3/8.','<b>Same numerator?</b> The bigger denominator means <b>smaller</b> pieces: 1/3 > 1/5. More people sharing means less for each!','<b>Different both?</b> Compare each to a benchmark: is it more or less than ½? 3/8 is less than ½, 5/6 is more than ½, so 3/8 < 5/6.'],
     ex:{q:'Compare 2/5 and 2/9.',steps:['The numerators are the same (2).','Ninths are smaller pieces than fifths.','2 small pieces < 2 bigger pieces.'],a:'2/5 > 2/9'},
     chk:{q:'Which is greater: 4/10 or 7/12?',a:'7/12',w:['4/10','They are equal'],why:'4/10 is less than ½ (5/10 is a half). 7/12 is more than ½ (6/12 is a half). So 7/12 is greater.',hint:'Compare each one to ½.'}},
    {h:'Equivalent fractions and mixed numbers',p:['Multiply or divide the numerator AND denominator by the <b>same</b> number to get an equivalent fraction: ½ = 2/4 = 3/6 = 6/12. Cutting pieces smaller does not change the amount.','Improper fractions are more than one whole: 7/4 = 4/4 + 3/4 = 1 ¾.'],
     dg:c=>dgFractionBar(6,3,c),
     ex:{q:'Write an equivalent fraction for 2/3 with a denominator of 12.',steps:['3 × 4 = 12, so multiply by 4.','Multiply the numerator by 4 too: 2 × 4 = 8.'],a:'2/3 = 8/12'},
     chk:{q:'Which is equal to 9/4?',a:'2 ¼',w:['2 ¾','9 ¼','1 ¼'],why:'4/4 + 4/4 = 2 wholes, with 1/4 left over: 9/4 = 2 ¼.'}}],
  watch:[['Thinking a bigger denominator means a bigger fraction (1/8 > 1/4).','Bigger denominator → smaller pieces. 1/4 > 1/8.'],['Ignoring the whole number in mixed numbers.','First sort: less than 1 whole or more than 1 whole? 1 ⅛ is greater than ⅞.'],['Thinking 2/6 is more than 1/3 because it has more pieces.','Splitting pieces does not change the amount: 1/3 = 2/6.']],
  tips:['You may need to place fractions on a number line or drag them into order.','The test only uses denominators of 12 or less.'],
  sum:['Denominator = equal parts in the whole. Numerator = parts counted.','Same denominator → compare numerators.','Same numerator → smaller denominator is bigger.','Use ½ and 1 as benchmarks.','Equivalent: multiply or divide top and bottom by the same number.']});

SG.add('g4_dec',{title:'Decimals through thousandths',
  goals:['I can read and write decimals through thousandths.','I can name the place and value of each digit.','I can compare and order up to four decimals.'],
  words:[['decimal point','separates the whole number from the parts less than one; read as “and”','3.4 = three and four tenths'],['tenths','1 of 10 equal parts','0.1'],['hundredths','1 of 100 equal parts','0.01'],['thousandths','1 of 1,000 equal parts','0.001']],
  pages:[
    {h:'Places after the decimal point',p:['The places to the right of the decimal point are <b>tenths</b>, <b>hundredths</b>, and <b>thousandths</b>. Each one is 10 times smaller than the place before.','A decimal less than one is written with a zero in front: 0.385, not .385.'],
     dg:()=>sgGrid(3,7),
     ex:{q:'In 0.385, what is the value of the 8?',steps:['0 . 3 8 5 → tenths, hundredths, thousandths.','The 8 is in the hundredths place.','8 hundredths = 0.08.'],a:'0.08'},
     chk:{q:'The grid shows 37 of 100 squares shaded. Which decimal is that?',a:'0.37',w:['3.7','0.037','37.0'],why:'37 out of 100 is 37 hundredths = 0.37.'}},
    {h:'Reading and writing decimals',p:['Read the whole number, say “and” for the point, then read the digits after it and name the <b>last</b> place: 4.27 is “four <b>and</b> twenty-seven hundredths.”','“Nine hundred eighty-one thousandths” is 0.981 — the last digit sits in the thousandths place.'],
     ex:{q:'Write “six and forty-two thousandths” as a decimal.',steps:['Six is the whole number: 6.','Thousandths need three places after the point.','42 thousandths → .042.'],a:'6.042'},
     chk:{q:'How do you read 12.05?',a:'twelve and five hundredths',w:['twelve and five tenths','twelve hundred five','twelve and fifty hundredths'],why:'The 5 is in the hundredths place, so it is twelve and five hundredths.'}},
    {h:'Comparing decimals',p:['Line up the <b>decimal points</b>, then compare from the left. Add zeros at the end if it helps: 0.5 = 0.50 = 0.500.','<b>More digits does not mean bigger!</b> 5.3 is greater than 5.087, because 3 tenths beats 0 tenths.'],
     dg:()=>sgNL(0,1,0.1,[[0.3,'0.3'],[0.75,'0.75']]),
     ex:{q:'Order from least to greatest: 0.6 · 0.06 · 0.606 · 0.66',steps:['Write them all with three places: 0.600 · 0.060 · 0.606 · 0.660.','Now compare like whole numbers: 60 < 600 < 606 < 660.'],a:'0.06 · 0.6 · 0.606 · 0.66'},
     chk:{q:'Which is greatest?',a:'4.3',w:['4.087','4.29','4.299'],why:'Compare tenths first: 4.3 has 3 tenths; the others have 0 or 2 tenths.',hint:'Line up the decimal points and compare tenths first.'}}],
  watch:[['Thinking 5.087 > 5.3 because it has more digits.','Compare place by place from the left: 3 tenths > 0 tenths, so 5.3 is greater.'],['Writing “981 thousandths” as 981 or 981,000.','Thousandths go three places after the point: 0.981.'],['Reading the point as “point” in word form.','Say “and”: 2.5 is “two and five tenths.”']],
  tips:['You may see decimals on a meter stick: a millimeter is a thousandth of a meter, a centimeter a hundredth, a decimeter a tenth.'],
  sum:['After the point: tenths, hundredths, thousandths.','The point is read as “and”.','Line up points to compare.','Zeros at the END do not change the value: 0.4 = 0.40.']});

SG.add('g4_fdrel',{title:'Fractions and decimals are the same amount',
  goals:['I can write fractions with halves, fourths, fifths, tenths and hundredths as decimals.','I can match a model to a fraction and a decimal.'],
  words:[['equivalent','the same amount written a different way','½ = 0.5'],['tenths','10 equal parts','3/10 = 0.3'],['hundredths','100 equal parts','25/100 = 0.25']],
  pages:[
    {h:'Tenths and hundredths',p:['Decimals are fractions with a denominator of 10, 100 or 1,000.','3/10 is three tenths = <b>0.3</b>. 45/100 is forty-five hundredths = <b>0.45</b>.'],
     dg:()=>sgGrid(4,5),
     ex:{q:'Write 7/100 as a decimal.',steps:['Hundredths use two places after the point.','7 hundredths → 0.07 (the 7 goes in the hundredths place).'],a:'0.07'},
     chk:{q:'Which decimal equals 6/10?',a:'0.6',w:['0.06','6.10','0.610'],why:'Six tenths is 0.6.'}},
    {h:'Halves, fourths and fifths',p:['Make the denominator 10 or 100 first.','½ = 5/10 = <b>0.5</b> · ¼ = 25/100 = <b>0.25</b> · ¾ = 75/100 = <b>0.75</b>','⅕ = 2/10 = <b>0.2</b>, so ⅖ = 0.4, ⅗ = 0.6, ⅘ = 0.8.'],
     ex:{q:'Write 4/5 as a decimal.',steps:['5 × 2 = 10, so multiply top and bottom by 2.','4/5 = 8/10.','8 tenths = 0.8.'],a:'0.8'},
     chk:{q:'Which is equal to ¾?',a:'0.75',w:['0.34','3.4','0.7'],why:'¾ = 75/100 = 0.75.'}},
    {h:'Mixed numbers and decimals',p:['The whole number stays in front of the point: 1 ¼ = 1.25 and 2 ½ = 2.5.','Improper fractions can become decimals too: 5/4 = 1 ¼ = 1.25.'],
     dg:()=>sgNL(0,2,0.25,[[1.25,'1.25 = 1¼']],v=>String(v)),
     ex:{q:'Write 3 ⅖ as a decimal.',steps:['The whole number is 3.','⅖ = 4/10 = 0.4.'],a:'3.4'},
     chk:{q:'Which fraction equals 1.5?',a:'3/2',w:['1/5','15/100','5/1'],why:'1.5 = 1 ½ = 3/2.'}}],
  watch:[['Writing 4/5 as 0.45 or 4.5.','4/5 = 8/10 = 0.8. Change to tenths or hundredths first.'],['Writing 7/100 as 0.7.','Hundredths need two places: 0.07.'],['Thinking fractions and decimals are different kinds of numbers.','They are two ways to write the same amount.']],
  tips:['Know these by heart: ½ = 0.5, ¼ = 0.25, ¾ = 0.75, ⅕ = 0.2.'],
  sum:['Change the denominator to 10 or 100.','½ = 0.5, ¼ = 0.25, ¾ = 0.75.','⅕ = 0.2, ⅖ = 0.4, ⅗ = 0.6, ⅘ = 0.8.','The whole number stays in front of the point.']});

SG.add('g4_addsub',{title:'Add and subtract whole numbers',
  goals:['I can estimate sums and differences by rounding or using compatible numbers.','I can add and subtract numbers up to 10,000 using the standard algorithm.','I can solve one-step and two-step word problems.'],
  words:[['sum','the answer to an addition','40 + 25 = 65'],['difference','the answer to a subtraction','40 − 25 = 15'],['estimate','a close answer that is easy to find',''],['regroup','trade 10 of one place for 1 of the next place',''],['compatible numbers','friendly numbers that are easy to work with','248 + 752 ≈ 250 + 750']],
  pages:[
    {h:'Estimate first',p:['An estimate tells you about how big the answer should be. Round to the nearest hundred or thousand, or use compatible numbers.','Ask: do I need an <b>exact</b> answer, or is “about” enough? “About how many people came?” only needs an estimate.'],
     ex:{q:'Estimate 4,872 + 3,190 by rounding to the nearest thousand.',steps:['4,872 → 5,000 (the hundreds digit is 8, so round up).','3,190 → 3,000 (the hundreds digit is 1, so round down).','5,000 + 3,000 = 8,000.'],a:'about 8,000'},
     chk:{q:'Which is the best estimate for 6,105 − 2,940?',a:'about 3,000',w:['about 9,000','about 4,000','about 300'],why:'6,105 ≈ 6,000 and 2,940 ≈ 3,000, so 6,000 − 3,000 = 3,000.'}},
    {h:'Add and subtract with regrouping',p:['Line up the places. Start with the <b>ones</b> and move left.','Adding: if a column makes 10 or more, regroup to the next place. Subtracting: if the top digit is too small, regroup from the next place.'],
     ex:{q:'5,006 − 2,348',steps:['Ones: 6 − 8 does not work. The tens and hundreds are 0, so regroup from the thousands: 5,006 = 4 thousands, 9 hundreds, 9 tens, 16 ones.','16 − 8 = 8 · 9 − 4 = 5 · 9 − 3 = 6 · 4 − 2 = 2.','Check: 2,658 + 2,348 = 5,006 ✓'],a:'2,658'},
     chk:{q:'3,475 + 2,689 = ?',a:'6,164',w:['5,064','6,054','6,264'],why:'5+9=14 (write 4, carry 1) · 7+8+1=16 (6, carry 1) · 4+6+1=11 (1, carry 1) · 3+2+1=6 → 6,164.'}},
    {h:'Two-step word problems',p:['Use the plan: <b>understand → plan → solve → check</b>. Think about what is happening in the story instead of hunting for key words.','Two-step problems hide a middle answer you must find first.'],
     ex:{q:'A school had 1,250 books. It bought 375 more and then gave away 140. How many books now?',steps:['Step 1: bought more → add. 1,250 + 375 = 1,625.','Step 2: gave away → subtract. 1,625 − 140 = 1,485.','Check: does it make sense? A little more than it started with. Yes.'],a:'1,485 books'},
     chk:{q:'Sam had $820. He spent $315 on a bike and $45 on a helmet. How much is left?',a:'$460',w:['$505','$1,180','$550'],why:'He spent 315 + 45 = 360 in total, and 820 − 360 = 460.'}}],
  watch:[['Forgetting to regroup across zeros (writing 5,006 − 2,348 = 3,342).','Regroup from the first place that is not zero.'],['Using only some of the numbers in a two-step problem.','List every quantity in the story and check you used each one.'],['Adding every number just because the problem says “in all”.','Picture what is happening, then decide.']],
  tips:['These questions are answered without a calculator.','Word problems can use numbers up to 1,000,000.'],
  sum:['Estimate first to check your answer.','Line up places and start at the ones.','Regroup when you need to.','Check subtraction by adding.']});

SG.add('g4_ops',{title:'Multiply and divide',
  goals:['I can recall multiplication facts through 12 × 12 and the matching division facts.','I can multiply 2-digit by 1-digit, 3-digit by 1-digit, and 2-digit by 2-digit numbers.','I can divide a 2- or 3-digit number by a 1-digit number and explain the remainder.','I can find factor pairs and common factors.'],
  words:[['product','the answer to a multiplication','6 × 4 = 24'],['quotient','the answer to a division','24 ÷ 4 = 6'],['remainder','what is left over after equal groups','25 ÷ 4 = 6 R1'],['factor','a number multiplied to get a product','3 and 8 are factors of 24'],['factor pair','two numbers whose product is the number','(4, 6) for 24'],['greatest common factor','the biggest factor two numbers share','GCF of 12 and 18 is 6']],
  pages:[
    {h:'Facts and factor pairs',p:['Facts get faster with strategies: <b>double</b> (6 × 8 is double 3 × 8), <b>break apart</b> (7 × 12 = 7 × 10 + 7 × 2), and use related facts.','Every multiplication fact has division partners: 8 × 7 = 56, so 56 ÷ 7 = 8 and 56 ÷ 8 = 7.','To find all factor pairs of a number, start at 1 and work up until the pairs repeat.'],
     ex:{q:'List all factor pairs of 36.',steps:['1 × 36','2 × 18','3 × 12','4 × 9','5? No. 6 × 6 — the pairs meet, so stop.'],a:'(1,36) (2,18) (3,12) (4,9) (6,6)'},
     chk:{q:'What is the greatest common factor of 12 and 30?',a:'6',w:['3','2','12'],why:'Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 30: 1, 2, 3, 5, 6, 10, 15, 30. The biggest shared one is 6.'}},
    {h:'Multiplying bigger numbers',p:['Break the larger number into place values and multiply each part (an area model), then add the parts.','For 2-digit × 2-digit, multiply by the ones, then by the tens, then add.'],
     ex:{q:'34 × 26',steps:['34 × 6 = 204','34 × 20 = 680','204 + 680 = 884','Estimate check: 30 × 25 = 750, so 884 is reasonable.'],a:'884'},
     chk:{q:'213 × 4 = ?',a:'852',w:['812','842','8,52'],why:'200 × 4 = 800, 10 × 4 = 40, 3 × 4 = 12. 800 + 40 + 12 = 852.'}},
    {h:'Dividing and remainders',p:['Division makes <b>equal groups</b>. It can find how many in each group, or how many groups.','The remainder must be smaller than the divisor. In a story, decide what the remainder means: round up, drop it, or use it as the answer.'],
     ex:{q:'94 students ride vans that hold 8 each. How many vans are needed?',steps:['94 ÷ 8 = 11 R6.','11 vans carry 88 students. 6 students are still waiting!','They need one more van.'],a:'12 vans'},
     chk:{q:'You share 75 stickers equally among 6 friends. How many does each friend get?',a:'12',w:['13','12 R3','11'],why:'75 ÷ 6 = 12 R3. Each friend gets 12 stickers; 3 are left over.'}}],
  watch:[['Writing 11 ÷ 12 = 132 from 11 × 12 = 132.','The product comes first in division: 132 ÷ 12 = 11.'],['Ignoring the remainder in a story (answering 11 vans).','Ask what the leftover means — sometimes you need one more group.'],['Choosing the operation from key words only.','Ask: am I joining equal groups (×) or splitting into equal groups (÷)?']],
  tips:['Fact questions are answered without a calculator.','You may need to pick an equation that matches a picture of equal groups.'],
  sum:['Know facts to 12 × 12 and their division partners.','Break numbers apart to multiply.','Remainder < divisor.','Decide what the remainder means in the story.']});

SG.add('g4_fracops',{title:'Add and subtract fractions',
  goals:['I can add and subtract fractions and mixed numbers with like denominators (2, 3, 4, 5, 6, 8, 10, 12).','I can simplify my answer.','I can multiply a whole number (12 or less) by a unit fraction.'],
  words:[['like denominators','fractions with the same bottom number','3/8 and 1/8'],['unit fraction','a fraction with 1 on top','1/4'],['simplify','write a fraction with the fewest equal parts','4/8 = 1/2'],['regroup','trade 1 whole for equal parts','1 = 4/4']],
  pages:[
    {h:'Same denominator: add the tops',p:['When the denominators match, the pieces are the same size. Add or subtract the <b>numerators</b> only. The denominator stays the same.','1/5 + 3/5 = 4/5. It is NOT 4/10 — the pieces are still fifths.'],
     dg:c=>dgFractionBar(5,4,c),
     ex:{q:'7/8 − 3/8',steps:['Same denominator (8), so subtract the numerators: 7 − 3 = 4.','Keep the eighths: 4/8.','Simplify: 4/8 = 1/2.'],a:'4/8 = 1/2'},
     chk:{q:'2/6 + 3/6 = ?',a:'5/6',w:['5/12','6/5','1/6'],why:'Add the tops, keep the sixths: 5/6.'}},
    {h:'Mixed numbers and regrouping',p:['Add the whole numbers and the fractions. If the fraction part is more than one whole, regroup: 1 5/4 = 2 1/4.','To subtract when the top fraction is too small, regroup one whole into equal parts: 2 1/4 = 1 5/4.'],
     ex:{q:'2 1/4 − 3/4',steps:['1/4 is less than 3/4, so regroup 1 whole: 2 1/4 = 1 + 4/4 + 1/4 = 1 5/4.','1 5/4 − 3/4 = 1 2/4.','Simplify: 1 2/4 = 1 1/2.'],a:'1 1/2'},
     chk:{q:'3 5/8 + 1 6/8 = ?',a:'5 3/8',w:['4 11/16','4 3/8','5 11/8'],why:'3 + 1 = 4 and 5/8 + 6/8 = 11/8 = 1 3/8, so 4 + 1 3/8 = 5 3/8.'}},
    {h:'Whole number × unit fraction',p:['6 × 1/3 means <b>6 groups of one-third</b>. Count them: 1/3, 2/3, 3/3, 4/3, 5/3, 6/3 = 2.','Multiply the whole number by the numerator only. The denominator stays the same. Also, 4 × 1/4 = 4/4 = 1 whole.'],
     ex:{q:'Each cone needs 1/4 cup of ice cream. How much for 8 cones?',steps:['8 groups of 1/4 = 8 × 1/4.','8 × 1 = 8, so 8/4.','8/4 = 2 whole cups.'],a:'2 cups'},
     chk:{q:'5 × 1/6 = ?',a:'5/6',w:['5/30','1/30','6/5'],why:'5 groups of 1/6 is 5/6. Only the numerator is multiplied.'}}],
  watch:[['Adding the denominators: 1/5 + 3/5 = 4/10.','Keep the denominator: 1/5 + 3/5 = 4/5.'],['Multiplying top and bottom: 4 × 1/4 = 4/16.','Only the top is multiplied: 4 × 1/4 = 4/4 = 1.'],['Regrouping but dropping a piece: 1 1/4 − 3/4 = 1/4.','1 1/4 = 5/4, and 5/4 − 3/4 = 2/4 = 1/2.']],
  tips:['These questions are answered without a calculator.','Answers are usually asked for in simplest form.'],
  sum:['Like denominators: add or subtract the numerators.','The denominator stays the same.','Regroup 1 whole = equal parts when needed.','Whole × unit fraction: multiply the top only.']});

SG.add('g4_decops',{title:'Add and subtract decimals',
  goals:['I can estimate decimal sums and differences by rounding to whole numbers.','I can add and subtract decimals through thousandths.','I can solve decimal word problems, like money and measurement.'],
  words:[['decimal point','the dot that separates wholes from parts','3.25'],['line up','put decimal points in one straight column',''],['equivalent decimals','the same value with different zeros','0.5 = 0.50 = 0.500']],
  pages:[
    {h:'Estimate with whole numbers',p:['Round each decimal to the nearest whole number to get a quick estimate: 5.824 ≈ 6.','0.9 + 1.47 ≈ 1 + 1.5 = 2.5 — easy numbers make easy estimates.'],
     ex:{q:'Estimate 7.84 − 2.3.',steps:['7.84 → 8','2.3 → 2','8 − 2 = 6'],a:'about 6'},
     chk:{q:'Which is the best estimate for 3.9 + 4.08?',a:'about 8',w:['about 43','about 0.8','about 7'],why:'3.9 ≈ 4 and 4.08 ≈ 4, so about 8.'}},
    {h:'Line up the decimal points',p:['Write the numbers so the <b>decimal points line up</b>. Fill empty places with zeros.','A whole number has its decimal point at the end: 12 = 12.000.'],
     ex:{q:'12 − 2.803',steps:['Write 12 as 12.000 and line up the points.','Regroup across the zeros: 12.000 = 11 + 0.9 + 0.09 + 0.010.','12.000 − 2.803 = 9.197'],a:'9.197'},
     chk:{q:'0.35 + 0.9 = ?',a:'1.25',w:['0.44','0.125','1.025'],why:'Line up: 0.35 + 0.90 = 1.25.'}},
    {h:'Decimal word problems',p:['Read carefully: is the question asking for the amount <b>used</b> or the amount <b>left</b>?','Estimate first, then check your exact answer is close.'],
     ex:{q:'A ribbon is 5.62 feet long. Mia cuts off 2.5 feet. How much is left?',steps:['Left → subtract.','5.62 − 2.50 = 3.12','Estimate: 6 − 3 = 3. Close!'],a:'3.12 feet'},
     chk:{q:'A notebook costs $2.75 and a pen costs $1.40. What is the total?',a:'$4.15',w:['$3.15','$4.05','$1.35'],why:'2.75 + 1.40 = 4.15.'}}],
  watch:[['Lining up the right-hand digits: 12 + 2.803 = 2.815.','Line up the decimal points: 12.000 + 2.803 = 14.803.'],['Regrouping across zeros wrong: 12 − 2.803 = 10.803.','Write 12.000 and regroup one place at a time.'],['Finding the amount used when the question asks how much is left.','Underline what the question asks for.']],
  tips:['These questions are answered without a calculator.'],
  sum:['Estimate by rounding to whole numbers.','Line up the decimal points.','Add zeros to fill empty places.','Check: is your answer close to the estimate?']});

SG.add('g4_measure',{title:'Length, weight and liquid volume',
  goals:['I can choose a sensible unit to measure length, weight/mass, and liquid volume.','I can measure length to the nearest ½, ¼ or ⅛ inch, and to the nearest mm, cm, or m.','I can convert U.S. units: inches, feet, yards; ounces, pounds; cups, pints, quarts, gallons.'],
  words:[['length','how long something is','inches, feet, yards, miles; mm, cm, m'],['weight or mass','how heavy something is','ounces, pounds; grams, kilograms'],['liquid volume','how much liquid a container holds','cups, pints, quarts, gallons; mL, L'],['equivalent','the same amount in different units','12 inches = 1 foot']],
  pages:[
    {h:'Choose a sensible unit',p:['Small things use small units, big things use big units. A pencil is measured in inches or centimeters; the distance to the beach in miles.','Benchmarks help: a sheet of paper is about 1 foot long, a basketball weighs about 1 pound, a small milk carton holds about 1 cup.'],
     ex:{q:'Which unit is best for the length of a school bus?',steps:['A bus is much longer than a ruler, so inches would be a huge number.','Miles are for long distances like roads.','Feet or yards fit best.'],a:'feet (or yards)'},
     chk:{q:'Which unit would you use for the mass of an apple?',a:'grams',w:['kilograms','liters','meters'],why:'An apple is light, so grams fit. Kilograms are for heavier things; liters and meters measure other things.'}},
    {h:'Measure with a ruler',p:['Put the object at the <b>0 mark</b>, not at the very end of the ruler.','Between inch marks, the longest line is ½, then ¼, then ⅛. Count to the nearest mark.'],
     ex:{q:'A crayon starts at 0 and ends at the third mark after 3 inches on an eighth-inch ruler. How long is it?',steps:['It is past 3 inches.','Three eighth-marks = 3/8.'],a:'3 3/8 inches'},
     chk:{q:'A line ends exactly halfway between 4 and 5 inches. How long is it?',a:'4 ½ inches',w:['4 ¼ inches','5 ½ inches','4 inches'],why:'Halfway between 4 and 5 is 4 ½.'}},
    {h:'Converting U.S. units',p:['<b>12 inches = 1 foot · 3 feet = 1 yard · 36 inches = 1 yard</b>','<b>16 ounces = 1 pound</b>','<b>2 cups = 1 pint · 2 pints = 1 quart · 4 quarts = 1 gallon</b>','Big unit → small unit: multiply. Small unit → big unit: divide.'],
     ex:{q:'How many inches are in 3 feet 6 inches?',steps:['3 feet = 3 × 12 = 36 inches.','Add the extra 6 inches: 36 + 6.'],a:'42 inches'},
     chk:{q:'How many cups are in 2 quarts?',a:'8 cups',w:['4 cups','6 cups','16 cups'],why:'1 quart = 2 pints = 4 cups, so 2 quarts = 8 cups.'}}],
  watch:[['Starting the measurement at the end of the ruler instead of 0.','Line the object up with the 0 mark.'],['Writing 3 feet 6 inches as 36 inches.','3 feet = 36 inches, plus 6 more = 42 inches.'],['Choosing a silly unit (a house measured in miles).','Picture the object and use a benchmark.']],
  tips:['Some equivalences are given on the test, but knowing them saves time.'],
  sum:['Pick units that fit the size of the object.','Start at 0 on the ruler.','12 in = 1 ft, 3 ft = 1 yd, 16 oz = 1 lb.','2 c = 1 pt, 2 pt = 1 qt, 4 qt = 1 gal.']});

SG.add('g4_time',{title:'Elapsed time',
  goals:['I can find how much time has passed between a start time and an end time.','I can find an end time or a start time when I know the elapsed time.','I can work across noon or midnight (a.m. to p.m.).'],
  words:[['elapsed time','how much time passes from start to end',''],['a.m.','from midnight to noon',''],['p.m.','from noon to midnight',''],['timeline','a number line for time','']],
  pages:[
    {h:'Count on with a timeline',p:['Jump from the start time to the next full hour, then jump whole hours, then the extra minutes.','Add up the jumps to get the elapsed time.'],
     dg:()=>dgClock(4,35),
     ex:{q:'From 4:35 p.m. to 6:15 p.m., how much time passes?',steps:['4:35 → 5:00 is 25 minutes.','5:00 → 6:00 is 1 hour.','6:00 → 6:15 is 15 minutes.','25 + 15 = 40 minutes, plus 1 hour.'],a:'1 hour 40 minutes'},
     chk:{q:'A movie starts at 2:50 p.m. and ends at 4:20 p.m. How long is it?',a:'1 hour 30 minutes',w:['2 hours 30 minutes','1 hour 70 minutes','2 hours 10 minutes'],why:'2:50 → 3:00 is 10 min, 3:00 → 4:00 is 1 hour, 4:00 → 4:20 is 20 min. Total 1 hour 30 minutes.'}},
    {h:'Finding the end time',p:['Add the hours first, then the minutes. If the minutes reach 60 or more, trade 60 minutes for 1 hour.','Watch for crossing <b>noon</b>: 11:00 a.m. + 2 hours = 1:00 <b>p.m.</b>'],
     ex:{q:'Practice starts at 10:45 a.m. and lasts 2 hours 30 minutes. When does it end?',steps:['10:45 + 2 hours = 12:45 p.m. (we crossed noon).','12:45 + 30 minutes = 1:15 p.m.'],a:'1:15 p.m.'},
     chk:{q:'A trip starts at 9:20 a.m. and lasts 3 hours 50 minutes. When does it end?',a:'1:10 p.m.',w:['12:70 p.m.','1:10 a.m.','12:10 p.m.'],why:'9:20 + 3 h = 12:20 p.m. Then + 50 min = 1:10 p.m.'}},
    {h:'Working backward to a start time',p:['Start at the end time and jump <b>back</b>: subtract the hours, then the minutes.','Check your answer by counting forward again.'],
     ex:{q:'Dinner ended at 7:10 p.m. It lasted 1 hour 25 minutes. When did it start?',steps:['7:10 − 1 hour = 6:10 p.m.','6:10 − 10 minutes = 6:00; 15 more minutes back = 5:45 p.m.','Check: 5:45 + 1 h 25 min = 7:10 ✓'],a:'5:45 p.m.'},
     chk:{q:'A show ended at 3:05 p.m. after 2 hours 15 minutes. When did it start?',a:'12:50 p.m.',w:['1:50 p.m.','12:50 a.m.','5:20 p.m.'],why:'3:05 − 2 h = 1:05 p.m. Then − 15 min = 12:50 p.m.'}}],
  watch:[['Subtracting hours and minutes separately (4:35 to 6:15 = 2 h 20 min).','Count on with a timeline instead: 1 h 40 min.'],['Forgetting a.m. changes to p.m. after noon.','When you pass 12:00, switch a.m. to p.m.'],['Leaving out a part of a multistep trip.','List every part of the trip, then add them all.']],
  tips:['Elapsed time questions stay within a 12-hour period.'],
  sum:['Count on: to the hour, by hours, then minutes.','60 minutes = 1 hour.','Noon switches a.m. to p.m.','Work backward to find a start time, then check.']});

SG.add('g4_area',{title:'Area and perimeter',
  goals:['I can find the perimeter of rectangles and squares.','I can find the area of rectangles and squares.','I can tell when a problem needs area and when it needs perimeter.'],
  words:[['perimeter','the distance all the way around a shape','add all the sides'],['area','the number of square units that cover a shape','measured in square units'],['square unit','a square 1 unit on each side','1 sq in.'],['adjacent sides','two sides that meet at a corner','a length and a width']],
  pages:[
    {h:'Perimeter is the fence',p:['Perimeter is the distance <b>around</b> a shape. Add all the sides.','Rectangle: P = length + width + length + width = 2 × length + 2 × width. Square: P = 4 × side.'],
     dg:()=>dgRect(8,5,'ft'),
     ex:{q:'Find the perimeter of a rectangle 8 ft by 5 ft.',steps:['There are two 8 ft sides and two 5 ft sides.','8 + 5 + 8 + 5 = 26.'],a:'26 feet'},
     chk:{q:'A square has sides of 7 cm. What is its perimeter?',a:'28 cm',w:['49 cm','14 cm','21 cm'],why:'A square has 4 equal sides: 4 × 7 = 28 cm.'}},
    {h:'Area is the carpet',p:['Area is how many <b>square units</b> cover the shape. Rows × columns of squares = length × width.','Square: A = side × side. Always write square units: sq ft, sq cm.'],
     dg:()=>dgRect(6,4,'in',{inside:'6 × 4 = 24 sq in'}),
     ex:{q:'Find the area of a rectangle 6 in by 4 in.',steps:['4 rows of 6 squares.','6 × 4 = 24.'],a:'24 square inches'},
     chk:{q:'A rug is 9 ft long and 5 ft wide. How much floor does it cover?',a:'45 square feet',w:['28 feet','45 feet','14 square feet'],why:'Covering a floor is area: 9 × 5 = 45 square feet.'}},
    {h:'Which one does the problem need?',p:['Going <b>around</b> (fence, border, frame, trim) → perimeter.','<b>Covering</b> (carpet, tiles, paint, grass) → area.','Two rectangles can have the same perimeter but different areas.'],
     ex:{q:'A garden has an area of 24 sq ft. One side is 6 ft. How long is the other side?',steps:['Area = length × width, so 6 × ? = 24.','24 ÷ 6 = 4.'],a:'4 feet'},
     chk:{q:'Lily puts a ribbon around a picture frame that is 10 in by 8 in. How much ribbon?',a:'36 inches',w:['80 inches','18 inches','80 square inches'],why:'Around the frame is perimeter: 10 + 8 + 10 + 8 = 36 inches.'}}],
  watch:[['For a rectangle labeled 2 in and 1 in, adding only the two labels: 2 + 1 = 3.','Every side counts, even unlabeled ones: 2 + 1 + 2 + 1 = 6 inches.'],['Multiplying all four sides for area.','Area uses two adjacent sides only: length × width.'],['Finding perimeter when the problem asks about covering a floor.','Covering = area. Around = perimeter.']],
  tips:['Units matter: perimeter is in units (ft), area is in square units (sq ft).'],
  sum:['Perimeter = add all sides.','Area = length × width.','Square: P = 4 × side, A = side × side.','Around → perimeter. Covering → area.']});

SG.add('g4_angle',{title:'Points, lines, rays and angles',
  goals:['I can identify and draw points, lines, line segments, rays, and angles.','I can name them with symbols.','I can find parallel, perpendicular, and intersecting lines.'],
  words:[['point','an exact location, named with a capital letter','point A'],['line','goes on forever in both directions','line AB'],['line segment','part of a line with two endpoints','segment AB'],['ray','has one endpoint and goes on forever one way','ray AB'],['angle','two rays that share an endpoint (the vertex)','∠ABC'],['vertex','the shared endpoint of an angle','']],
  pages:[
    {h:'Lines, segments and rays',p:['A <b>line</b> has arrows on both ends: it never stops. A <b>line segment</b> has two endpoints. A <b>ray</b> has one endpoint and one arrow.','Endpoints are called endpoints — not dots.'],
     ex:{q:'A figure starts at point P and has an arrow through point Q. What is it?',steps:['One endpoint (P).','It goes on forever in one direction.'],a:'ray PQ'},
     chk:{q:'Which has exactly two endpoints?',a:'a line segment',w:['a line','a ray','an angle'],why:'A line segment is a piece of a line that stops at two endpoints.'}},
    {h:'Angles',p:['An angle is made of two rays that share an endpoint called the <b>vertex</b>.','Name an angle with three letters (vertex in the middle), one letter (the vertex), or a number: ∠ABC, ∠B, or ∠1.','A right angle is a square corner (90°). Acute angles are smaller than a right angle; obtuse angles are bigger than a right angle but smaller than a straight line.'],
     dg:c=>dgAngle(55,c),
     ex:{q:'An angle is made of rays BA and BC. Name it.',steps:['The rays share point B, so B is the vertex.','The vertex goes in the middle.'],a:'∠ABC (or ∠CBA, or ∠B)'},
     chk:{q:'In ∠XYZ, which point is the vertex?',a:'Y',w:['X','Z','all three'],why:'The vertex is always the middle letter.'}},
    {h:'Parallel, perpendicular, intersecting',p:['<b>Intersecting</b> lines cross at exactly one point.','<b>Perpendicular</b> lines intersect to make right angles (⊥).','<b>Parallel</b> lines never meet and stay the same distance apart (∥) — like train tracks.'],
     dg:()=>sgLines(),
     ex:{q:'The two side edges of a door. What kind of lines are they?',steps:['They go the same direction.','They never meet.'],a:'parallel'},
     chk:{q:'The corner where a wall meets the floor makes which kind of lines?',a:'perpendicular',w:['parallel','they do not intersect','curved'],why:'They meet at a right angle, so they are perpendicular.'}}],
  watch:[['Mixing up line, ray, and segment.','Count the endpoints: line 0, ray 1, segment 2.'],['Putting the vertex at the end of an angle name.','The vertex letter goes in the middle: ∠ABC.'],['Thinking all intersecting lines are perpendicular.','Perpendicular lines must make right angles.']],
  tips:['Know the symbols: ∥ parallel, ⊥ perpendicular, ∠ angle.'],
  sum:['Line: no endpoints. Ray: 1. Segment: 2.','Angle = two rays + a vertex.','Perpendicular = right angles.','Parallel lines never meet.']});

SG.add('g4_shape',{title:'Quadrilaterals',
  goals:['I can describe parallelograms, rectangles, squares, rhombi, and trapezoids by their sides and angles.','I can classify a quadrilateral in more than one way.'],
  words:[['quadrilateral','a polygon with 4 sides',''],['parallelogram','both pairs of opposite sides parallel and congruent',''],['rectangle','a parallelogram with 4 right angles',''],['rhombus','a parallelogram with 4 congruent sides',''],['square','4 congruent sides AND 4 right angles',''],['trapezoid','exactly one pair of parallel sides',''],['congruent','exactly the same size','']],
  pages:[
    {h:'Parallelograms',p:['A <b>parallelogram</b> has two pairs of parallel sides. Its opposite sides are also congruent.','Rectangles, rhombi, and squares are all special parallelograms.'],
     dg:()=>sgShape('parallelogram'),
     ex:{q:'A shape has two pairs of parallel sides but no right angles and not all sides equal. What is it?',steps:['Two pairs of parallel sides → parallelogram.','No right angles → not a rectangle or square.','Sides not all equal → not a rhombus.'],a:'parallelogram'},
     chk:{q:'Which shape has exactly ONE pair of parallel sides?',a:'trapezoid',w:['rhombus','rectangle','square'],why:'A trapezoid has exactly one pair of parallel sides. The others have two pairs.'}},
    {h:'Rectangles, rhombi and squares',p:['<b>Rectangle:</b> 4 right angles.','<b>Rhombus:</b> 4 congruent sides.','<b>Square:</b> both! 4 right angles and 4 congruent sides. A square is a rectangle AND a rhombus.'],
     dg:()=>sgShape('rhombus'),
     ex:{q:'Name every group a square belongs to.',steps:['4 sides → quadrilateral.','2 pairs of parallel sides → parallelogram.','4 right angles → rectangle.','4 congruent sides → rhombus.'],a:'quadrilateral, parallelogram, rectangle, rhombus, square'},
     chk:{q:'Which statement is ALWAYS true?',a:'Every square is a rectangle.',w:['Every rectangle is a square.','Every rhombus is a square.','A trapezoid is a parallelogram.'],why:'A square has 4 right angles, so it is always a rectangle. A rectangle does not always have 4 equal sides.'}},
    {h:'Read the markings',p:['Small tick marks show <b>congruent</b> sides. Arrows show <b>parallel</b> sides. A small square in a corner shows a <b>right angle</b>.','A turned square is still a square — not a “diamond”.'],
     dg:()=>sgShape('trapezoid'),
     ex:{q:'A shape has 4 tick marks (all sides the same) and no right-angle boxes. What is it?',steps:['4 congruent sides → rhombus.','No right angles → not a square.'],a:'rhombus'},
     chk:{q:'A square is turned so it stands on a corner. What is it called?',a:'a square',w:['a diamond','a trapezoid','a triangle'],why:'Turning a shape does not change its sides or angles. It is still a square (and a rhombus).'}}],
  watch:[['Calling a turned square a “diamond”.','Use math names: it is still a square (and a rhombus).'],['Thinking a square is not a rectangle.','A square has all the rectangle properties, plus equal sides.'],['Calling any 4-sided shape with a slant a trapezoid.','A trapezoid needs exactly one pair of parallel sides.']],
  tips:['Questions may ask you to sort shapes into a Venn diagram or choose ALL names that fit.'],
  sum:['Parallelogram: 2 pairs of parallel sides.','Rectangle: 4 right angles. Rhombus: 4 equal sides.','Square: both, so it is also a rectangle and a rhombus.','Trapezoid: exactly 1 pair of parallel sides.']});

SG.add('g4_solid',{title:'Plane and solid figures',
  goals:['I can identify cubes, rectangular prisms, square pyramids, spheres, cones, and cylinders.','I can count faces, edges, and vertices.','I can compare plane (flat) figures and solid figures.'],
  words:[['plane figure','a flat shape with 2 dimensions','square, circle, triangle'],['solid figure','a 3-dimensional shape','cube, sphere'],['face','a flat surface of a solid',''],['edge','where two faces meet',''],['vertex','a corner where edges meet','plural: vertices']],
  pages:[
    {h:'Flat or solid?',p:['A <b>plane figure</b> is flat, like a drawing on paper: circle, square, triangle, rectangle.','A <b>solid figure</b> takes up space: sphere, cube, square pyramid, rectangular prism. A circle is flat; a sphere is a ball.'],
     ex:{q:'Is a basketball a circle or a sphere?',steps:['A basketball is round in every direction and takes up space.'],a:'a sphere'},
     chk:{q:'Which is a plane figure?',a:'triangle',w:['cube','cone','cylinder'],why:'A triangle is flat. The others are solid figures.'}},
    {h:'Faces, edges, vertices',p:['<b>Cube:</b> 6 square faces, 12 edges, 8 vertices.','<b>Rectangular prism:</b> 6 rectangle faces, 12 edges, 8 vertices (a cube is a special one).','<b>Square pyramid:</b> 1 square base + 4 triangle faces = 5 faces, 8 edges, 5 vertices.','<b>Sphere:</b> no faces, edges, or vertices.'],
     dg:()=>dgPrism(4,3,2,'cm','#7C3AED'),
     ex:{q:'How many faces, edges, and vertices does a square pyramid have?',steps:['Faces: the square bottom plus 4 triangles = 5.','Edges: 4 around the base + 4 going up = 8.','Vertices: 4 on the base + 1 on top = 5.'],a:'5 faces, 8 edges, 5 vertices'},
     chk:{q:'How many edges does a cube have?',a:'12',w:['6','8','4'],why:'A cube has 4 edges on top, 4 on the bottom, and 4 going up the sides: 12.'}},
    {h:'Cones and cylinders',p:['A <b>cylinder</b> has two circle bases joined by a curved surface, like a can.','A <b>cone</b> has one circle base and a point (apex), like an ice-cream cone.'],
     ex:{q:'A soup can is what solid figure?',steps:['Two circle ends that are the same size.','A curved side between them.'],a:'cylinder'},
     chk:{q:'Which solid has one circle base and comes to a point?',a:'cone',w:['cylinder','sphere','square pyramid'],why:'A cone has one circle base and an apex.'}}],
  watch:[['Mixing up circle and sphere, or square and cube.','Flat → circle/square. Takes up space → sphere/cube.'],['Forgetting hidden faces and edges in a drawing.','Imagine turning the solid around, or count on a real box.']],
  tips:['You may need to match a solid to its number of faces, edges, or vertices.'],
  sum:['Plane = flat. Solid = takes up space.','Cube and rectangular prism: 6 faces, 12 edges, 8 vertices.','Square pyramid: 5 faces, 8 edges, 5 vertices.','Cylinder: 2 circles. Cone: 1 circle + a point.']});

SG.add('g4_data',{title:'Line graphs and the data cycle',
  goals:['I can ask a question that can be answered with data.','I can make a line graph with a title, labeled axes, and a good scale.','I can read a line graph to find greatest, least, and change over time.'],
  words:[['data','information that is collected',''],['line graph','shows how numbers change over time',''],['axis','the number lines along the side and bottom of a graph','plural: axes'],['scale','the numbers on an axis, counting by the same amount','0, 2, 4, 6'],['trend','the general direction the data is going','']],
  pages:[
    {h:'The data cycle',p:['1. <b>Ask</b> a question. 2. <b>Collect</b> data. 3. <b>Organize</b> it in a graph. 4. <b>Analyze</b> and share what you found.','Line graphs are for numbers that <b>change over time</b>, like a plant’s height each week. Favorite colors belong on a bar graph instead.'],
     ex:{q:'Which question fits a line graph?',steps:['A line graph needs a number that changes over time.','“How tall is my bean plant each week?” changes over time.'],a:'How tall is my bean plant each week?'},
     chk:{q:'Which data should go on a line graph?',a:'the temperature at noon each day for a week',w:['favorite fruits in our class','the number of boys and girls in each class','the colors of cars in a parking lot'],why:'Temperature changes over time. The others are categories, which go on bar graphs.'}},
    {h:'Making a line graph',p:['Time goes along the <b>bottom</b> (horizontal axis). The measurement goes up the <b>side</b> (vertical axis).','Give the graph a title and label both axes. Count the scale by 1s, 2s, 5s, 10s, or 100s, and go one step past the biggest value.'],
     dg:()=>sgLineGraph([['Wk 1',2],['Wk 2',5],['Wk 3',6],['Wk 4',10],['Wk 5',11]],'Bean plant height (cm)'),
     ex:{q:'The biggest value is 11 cm. Which scale fits best?',steps:['Counting by 1s up to 12 is a lot of lines, but works.','Counting by 2s up to 12 is neat and goes one step past 11.'],a:'0 to 12, counting by 2s'},
     chk:{q:'On a line graph of growth over weeks, where do the weeks go?',a:'along the bottom (horizontal axis)',w:['up the side (vertical axis)','in the title','nowhere'],why:'Time always goes along the horizontal axis.'}},
    {h:'Reading a line graph',p:['The <b>steepest</b> part of the line shows the biggest change. A flat part means no change.','To find “how much more”, subtract the two values.'],
     dg:()=>sgLineGraph([['Wk 1',2],['Wk 2',5],['Wk 3',6],['Wk 4',10],['Wk 5',11]],'Bean plant height (cm)'),
     ex:{q:'Between which weeks did the plant grow the most?',steps:['Wk 1→2: 3 cm. Wk 2→3: 1 cm. Wk 3→4: 4 cm. Wk 4→5: 1 cm.','The steepest line is week 3 to week 4.'],a:'week 3 to week 4 (4 cm)'},
     chk:{q:'How much did the plant grow from week 1 to week 5?',a:'9 cm',w:['11 cm','13 cm','2 cm'],why:'11 − 2 = 9 cm.'}}],
  watch:[['Asking a category question for a line graph (favorite recess game).','Line graphs need numbers that change over time.'],['Looking at one point and missing the trend.','Also look at the whole line: is it going up, down, or flat?'],['Picking the highest point as the biggest change.','The biggest change is the steepest segment.']],
  tips:['Line graphs on the test have 10 or fewer data points.'],
  sum:['Ask → collect → organize → analyze.','Line graphs show change over time.','Title + labeled axes + even scale.','Steepest = biggest change; flat = no change.']});

SG.add('g4_prob',{title:'Probability',
  goals:['I can describe how likely something is: impossible, unlikely, equally likely, likely, certain.','I can list all the possible outcomes.','I can write a probability as a fraction from 0 to 1.'],
  words:[['probability','how likely something is to happen',''],['outcome','one possible result','heads'],['impossible','can never happen; probability 0',''],['certain','will always happen; probability 1',''],['equally likely','has the same chance as the others','']],
  pages:[
    {h:'How likely is it?',p:['Probability goes from <b>0</b> (impossible) to <b>1</b> (certain).','In between: <b>unlikely</b> (less than half), <b>equally likely</b> (exactly half), <b>likely</b> (more than half).'],
     dg:()=>sgNL(0,1,0.5,[[0,'impossible'],[0.5,'equally likely'],[1,'certain']],v=>['0','½','1'][v*2]),
     ex:{q:'A bag has 9 red marbles and 1 blue. How likely is picking red?',steps:['Red is 9 out of 10 — much more than half.'],a:'likely'},
     chk:{q:'A spinner has only blue sections. How likely is landing on yellow?',a:'impossible',w:['unlikely','equally likely','certain'],why:'There is no yellow, so it can never happen.'}},
    {h:'List all the outcomes',p:['An outcome is one possible result. Flip a coin: heads or tails (2 outcomes). Roll a number cube: 1, 2, 3, 4, 5, 6 (6 outcomes).','Use a list or a table so you do not miss any.'],
     ex:{q:'List the outcomes for spinning a spinner with red, blue, green, and yellow equal parts.',steps:['Write each color once.'],a:'red, blue, green, yellow — 4 outcomes'},
     chk:{q:'How many outcomes are there for rolling a number cube?',a:'6',w:['1','12','3'],why:'The cube can land on 1, 2, 3, 4, 5, or 6.'}},
    {h:'Probability as a fraction',p:['Probability = <b>favorable outcomes ÷ total outcomes</b>.','In grade 4, leave the fraction as it is — do not simplify a probability.'],
     dg:()=>dgMarbles({red:3,blue:5}),
     ex:{q:'A bag has 3 red and 5 blue marbles. What is the probability of picking red?',steps:['Favorable (red): 3.','Total: 3 + 5 = 8.'],a:'3/8'},
     chk:{q:'A number cube is rolled. What is the probability of rolling a number greater than 4?',a:'2/6',w:['4/6','2/4','1/6'],why:'Greater than 4 means 5 or 6: 2 outcomes out of 6. Written as 2/6.'}}],
  watch:[['Saying “impossible” when there is only one red section.','One red is unlikely, not impossible — it can still happen.'],['Using the wrong total (only counting the other color).','The denominator is ALL the outcomes.'],['Simplifying probability fractions in grade 4.','Write it as favorable over total, like 2/6.']],
  tips:['Probability questions use 24 or fewer outcomes.'],
  sum:['0 = impossible, 1 = certain, ½ = equally likely.','List every outcome.','Probability = favorable ÷ total.','One chance is unlikely, not impossible.']});

SG.add('g4_pattern',{title:'Increasing and decreasing patterns',
  goals:['I can find the rule of a pattern that uses +, −, or ×.','I can extend a pattern and find missing terms.','I can use input/output tables.'],
  words:[['pattern','numbers or shapes that follow a rule',''],['rule','what you do to get from one term to the next','add 4'],['term','one number in a pattern',''],['input/output table','a table where a rule changes each input into an output','']],
  pages:[
    {h:'Find the rule',p:['Look at how each number changes to the next. Is it adding, subtracting, or multiplying?','<b>Check the rule on every pair</b>, not just the first two numbers.'],
     ex:{q:'1, 3, 9, 27, 81 — what is the rule?',steps:['1 → 3 could be “+2” or “×3”.','Test +2: 3 + 2 = 5, but the next number is 9. ✗','Test ×3: 3 × 3 = 9, 9 × 3 = 27, 27 × 3 = 81. ✓'],a:'multiply by 3'},
     chk:{q:'What comes next: 95, 88, 81, 74, ___?',a:'67',w:['70','64','81'],why:'The rule is subtract 7: 74 − 7 = 67.'}},
    {h:'Input/output tables',p:['Compare each <b>input</b> with its <b>output</b> in the same row — not just down one column.','Once you know the rule, use it forward for a missing output, or backward (undo it) for a missing input.'],
     ex:{q:'Rule: × 6. The output is 42. What was the input?',steps:['Something × 6 = 42.','Undo it: 42 ÷ 6 = 7.'],a:'7'},
     chk:{q:'Input 2 → 9, input 5 → 12, input 10 → 17. What is the rule?',a:'add 7',w:['multiply by 4','add 3','add 5'],why:'2 + 7 = 9, 5 + 7 = 12, 10 + 7 = 17. The same rule works for every row.'}},
    {h:'Patterns in stories',p:['A pattern can describe a real situation: saving $5 each week, or a plant growing 2 cm every day.','Make a table to see the pattern, then extend it.'],
     ex:{q:'Maya has $12 and saves $5 each week. How much after 4 weeks?',steps:['Week 1: 17 · Week 2: 22 · Week 3: 27 · Week 4: 32.'],a:'$32'},
     chk:{q:'A tower has 3 blocks on the first day and gets 4 more blocks each day. How many on day 5?',a:'19',w:['15','23','20'],why:'3, 7, 11, 15, 19 — adding 4 each day.'}}],
  watch:[['Choosing “+2” for 1, 3, 9, 27 after looking at only two numbers.','Test the rule on every pair.'],['Looking only down the output column of a table.','Compare each input with its output in the same row.'],['Multiplying instead of dividing to find a missing input.','Work backward with the opposite operation.']],
  tips:['Patterns use only addition, subtraction, or multiplication of whole numbers.'],
  sum:['Find the change from term to term.','Check the rule on every pair.','In tables, compare input to output row by row.','Undo the rule to find a missing input.']});

['g4_place','g4_cmp','g4_frac','g4_dec','g4_fdrel','g4_addsub','g4_ops','g4_fracops','g4_decops','g4_measure','g4_time','g4_area','g4_angle','g4_shape','g4_solid','g4_data','g4_prob','g4_pattern'].forEach(g=>{SG_SPRITE[g]='sg_g4math';});
