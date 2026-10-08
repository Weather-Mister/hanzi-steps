import type {Lesson,Step,Unit} from '../schema.ts';

// Supplementary exposure only. Never assemble these into courseModules,
// canonical vocabulary, characters, phrases, or first-teaching indexes.
export type ExtraWord={
 id:string;text:string;pinyin:string;meaning:string;measure:string;measurePinyin:string;
 counted:string;countedPinyin:string;note:string;glyphNotes:string[];
};
const w=(id:string,text:string,pinyin:string,meaning:string,measure:string,measurePinyin:string,counted:string,countedPinyin:string,note:string,glyphNotes:string[]):ExtraWord=>({id,text,pinyin,meaning,measure,measurePinyin,counted,countedPinyin,note,glyphNotes});
export const clothingWords:ExtraWord[]=[
 w('tshirt','T恤','T xù','T-shirt','件','jiàn','一件T恤','yí jiàn T xù','T恤 is a common written label. Also called T恤衫. 件 counts an individual garment.',['恤: the Chinese character in T恤; keep the Latin T.']),
 w('shirt','襯衫','chènshān','button-up shirt','件','jiàn','一件襯衫','yí jiàn chènshān','A button-up shirt; distinguish it from a T恤.',['襯: first character of 襯衫.','衫: a shirt or light upper garment.']),
 w('jacket','外套','wàitào','jacket; coat','件','jiàn','一件外套','yí jiàn wàitào','An outer layer, including jackets and coats.',['外: outside; outer.','套: in 外套, part of the word for an outer garment.']),
 w('sweater','毛衣','máoyī','sweater','件','jiàn','一件毛衣','yí jiàn máoyī','A knitted sweater. It need not be made from wool.',['毛: hair or wool; here part of 毛衣.','衣: clothing; 衣服 is the general word for clothes.']),
 w('trousers','褲子','kùzi','trousers; pants','條','tiáo','一條褲子','yì tiáo kùzi','條 counts the whole garment, even though it has two legs. 子 is neutral tone.',['褲: trousers; note the clothing radical 衤.','子: a common noun suffix; neutral tone in 褲子.']),
 w('skirt','裙子','qúnzi','skirt','條','tiáo','一條裙子','yì tiáo qúnzi','A skirt is separate from a dress. Learn 條 with 裙子 here; 件 is also used for skirts in some contexts.',['裙: skirt; note the clothing radical 衤.','子: neutral-tone noun suffix in 裙子.']),
 w('dress','洋裝','yángzhuāng','dress','件','jiàn','一件洋裝','yí jiàn yángzhuāng','洋裝 is an everyday Taiwan word for a dress.',['洋: in 洋裝, part of the established word for a dress.','裝: dress or clothing; here in 洋裝.']),
 w('shoes','鞋子','xiézi','shoes','雙','shuāng','一雙鞋子','yì shuāng xiézi','雙 counts a pair: one pair contains two shoes. An individual shoe can use 隻.',['鞋: shoe.','子: neutral-tone noun suffix in 鞋子.']),
 w('socks','襪子','wàzi','socks','雙','shuāng','一雙襪子','yì shuāng wàzi','雙 counts a pair of socks. One individual sock can use 隻.',['襪: sock; note the clothing radical 衤.','子: neutral-tone noun suffix in 襪子.']),
 w('hat','帽子','màozi','hat; cap','頂','dǐng','一頂帽子','yì dǐng màozi','頂 counts hats and caps.',['帽: hat.','子: neutral-tone noun suffix in 帽子.']),
];
export const fruitWords:ExtraWord[]=[
 w('apple','蘋果','píngguǒ','apple','個','ge','一個蘋果','yí ge píngguǒ','個 is a common way to count whole apples; 顆 is also possible.',['蘋: recognize it in 蘋果; grass radical 艹 at the top.','果: fruit.']),
 w('banana','香蕉','xiāngjiāo','banana','根','gēn','一根香蕉','yì gēn xiāngjiāo','根 highlights one elongated banana. 條 and 個 can also occur; a bunch is a different counting context.',['香: fragrant; here in 香蕉.','蕉: recognize it in 香蕉; grass radical 艹 at the top.']),
 w('orange','橘子','júzi','mandarin orange; tangerine','個','ge','一個橘子','yí ge júzi','橘子 usually means a mandarin or tangerine. 柳橙 is the usual Taiwan word for a sweet orange.',['橘: mandarin orange; wood radical 木 on the left.','子: neutral-tone noun suffix in 橘子.']),
 w('grapes','葡萄','pútáo','grapes','串','chuàn','一串葡萄','yí chuàn pútáo','串 counts a bunch. One individual grape is 一顆葡萄. The picture shows a bunch.',['葡: first character of 葡萄; grass radical 艹.','萄: second character of 葡萄; grass radical 艹.']),
 w('watermelon','西瓜','xīguā','watermelon','個','ge','一個西瓜','yí ge xīguā','個 counts a whole watermelon. A slice or piece uses 片 or 塊 instead.',['西: west; here part of the fruit name 西瓜.','瓜: melon or gourd.']),
 w('pineapple','鳳梨','fènglí','pineapple','個','ge','一個鳳梨','yí ge fènglí','鳳梨 is the everyday Taiwan word for pineapple. Count a whole pineapple here.',['鳳: phoenix; here in the fruit name 鳳梨.','梨: pear; here part of 鳳梨.']),
 w('mango','芒果','mángguǒ','mango','個','ge','一個芒果','yí ge mángguǒ','個 counts a whole mango; 顆 is also possible.',['芒: first character of 芒果; grass radical 艹.','果: fruit.']),
 w('strawberry','草莓','cǎoméi','strawberry','顆','kē','一顆草莓','yì kē cǎoméi','顆 counts a small round item. 個 is also possible in everyday speech.',['草: grass.','莓: berry; grass radical 艹 at the top.']),
 w('pear','梨子','lízi','pear','個','ge','一個梨子','yí ge lízi','梨子 means pear; 梨 also occurs by itself and in 鳳梨.',['梨: pear; 木 is at the bottom.','子: neutral-tone noun suffix in 梨子.']),
 w('papaya','木瓜','mùguā','papaya','個','ge','一個木瓜','yí ge mùguā','Count a whole papaya here; sliced pieces have a different measure word.',['木: tree or wood; here in the fruit name 木瓜.','瓜: melon or gourd; also seen in 西瓜.']),
];
export const extraWords=[...clothingWords,...fruitWords];
export const extraWord=(id:string)=>extraWords.find(word=>word.id===id);
const numbers=['','一','兩','三'];
export function countedPhrase(word:ExtraWord,count:number){return numbers[count]+word.measure+word.text;}
function step(id:string,mode:NonNullable<Step['extra']>['mode'],wordIds:string[],wordId?:string,other:Partial<Step>={}):Step{
 return {id,type:'extra',extra:{mode,wordIds,...(wordId?{wordId}:{})},...other};
}
function introductionSteps(prefix:string,words:ExtraWord[]):Step[]{
 return words.flatMap((word,index)=>[
  step(prefix+'-learn-'+word.id,'learn',words.map(w=>w.id),word.id),
  step(prefix+'-picture-'+word.id,'picture',words.map(w=>w.id),word.id),
  // Earlier words are intentionally revisited after a new introduction.
  ...(index>0?[step(prefix+'-recall-'+word.id,'word',words.slice(0,index+1).map(w=>w.id),words[index-1].id)]:[]),
 ]);
}
function makeUnit(kind:'clothing'|'fruits',number:number,words:ExtraWord[],title:string,hanzi:string,pinyin:string):{unit:Unit;lessons:Lesson[]}{
 const prefix='extra-'+kind;
 const groups=[words.slice(0,4),words.slice(4,7),words.slice(7)];
 const lessons:Lesson[]=groups.map((group,i)=>({id:prefix+'-learn-'+(i+1),unitId:prefix,title:['Meet the essentials','More to recognize','Finish your collection'][i],subtitle:group.map(w=>w.meaning).join(' · '),chars:[...new Set(group.flatMap(w=>Array.from(w.text).filter(c=>/[\u3400-\u9fff]/.test(c))))],minutes:'4–6 min',steps:introductionSteps(prefix+'-'+(i+1),group)}));
 lessons.push({id:prefix+'-images',unitId:prefix,title:kind==='clothing'?'Find it in the wardrobe':'Find it at the fruit stall',subtitle:'Read a word, recognize a picture, and match the pairs.',chars:[],minutes:'4–5 min',steps:[
  ...words.slice(0,5).map(word=>step(prefix+'-recognize-'+word.id,'word',words.map(w=>w.id),word.id)),
  ...[words.slice(0,4),words.slice(4,7),words.slice(7)].map((group,i)=>step(prefix+'-match-'+i,'match',group.map(w=>w.id))),
 ]});
 lessons.push({id:prefix+'-measures',unitId:prefix,title:'Count what you see',subtitle:'Garments, pairs, whole fruits, and bunches: learn the measure words.',chars:[],minutes:'5–6 min',steps:[
  ...words.filter((word,i)=>words.findIndex(w=>w.measure===word.measure)===i).map(word=>step(prefix+'-measure-intro-'+word.id,'learn',[],word.id)),
  ...words.map(word=>step(prefix+'-measure-'+word.id,'measure',[],word.id,{options:kind==='clothing'?(word.id==='skirt'?['條','雙','頂']:['件','條','雙','頂']):(word.id==='banana'?['根','串','雙']:['個','串','雙'])})),
  step(prefix+'-measure-match','measure-match',words.filter((word,i)=>words.findIndex(w=>w.measure===word.measure)===i).map(w=>w.id)),
  ...words.slice(0,4).map((word,i)=>({...step(prefix+'-count-'+word.id,'count',[],word.id),extra:{mode:'count' as const,wordId:word.id,count:i%2+2}})),
 ]});
 lessons.push({id:prefix+'-listening',unitId:prefix,title:'Hear it, find it',subtitle:'Listen to the noun and choose its picture. Text support is available.',chars:[],minutes:'4–5 min',steps:words.map(word=>step(prefix+'-listen-'+word.id,'listen-picture',words.map(w=>w.id),word.id))});
 lessons.push({id:prefix+'-review',unitId:prefix,title:'Your collection check',subtitle:'A mixed review of pictures, characters, and counting.',chars:[],minutes:'5–7 min',review:true,steps:words.flatMap((word,i)=>[
  step(prefix+'-review-picture-'+word.id,i%2===0?'word':'picture',words.map(w=>w.id),word.id),
  step(prefix+'-review-glyph-'+word.id,'character',words.map(w=>w.id),word.id,{extra:{mode:'character',wordId:word.id,wordIds:words.map(w=>w.id),glyph:Array.from(word.text).find(c=>/[\u3400-\u9fff]/.test(c))}}),
 ])});
 // Every lesson is directly accessible, so each practice lesson must teach its
 // entire answer bank even when no earlier extra lesson has been completed.
 for(const lesson of lessons.slice(3))lesson.steps.unshift(step(lesson.id+'-collection','learn',words.map(w=>w.id)));
 return {unit:{id:prefix,number,theme:kind==='clothing'?'indigo':'orange',label:kind==='clothing'?'Clothing':'Fruits',title,description:'Optional and always available. Learn by looking, listening, and matching. Every completed lesson counts toward your streak and extra-unit progress.',chars:[...new Set(words.flatMap(w=>Array.from(w.text).filter(c=>/[\u3400-\u9fff]/.test(c))))],lessonIds:lessons.map(l=>l.id),banner:{text:hanzi,pinyin},goal:{text:hanzi,pinyin,meaning:kind==='clothing'?'Recognize everyday clothing and count garments, pairs, and hats.':'Recognize everyday fruit and count whole fruits, bananas, and bunches.'},grammarIds:[]},lessons};
}
const collections=[makeUnit('clothing',1,clothingWords,'Open your wardrobe.','衣服','yīfu'),makeUnit('fruits',2,fruitWords,'A stop at the fruit stall.','水果','shuǐguǒ')];
export const extraUnits=collections.map(c=>c.unit);
export const extraLessons=collections.flatMap(c=>c.lessons);
export const isExtraLesson=(id:string)=>extraLessons.some(lesson=>lesson.id===id);
export const wordsForExtraUnit=(unitId:string)=>unitId==='extra-clothing'?clothingWords:unitId==='extra-fruits'?fruitWords:[];
export function extraUnitComplete(unit:Unit,completed:Set<string>){return unit.lessonIds.every(id=>completed.has(id));}
export function extraChoices(step:Step):string[]{
 const activity=step.extra!,word=extraWord(activity.wordId||'');
 if(activity.mode==='learn')return [];
 if(activity.mode==='measure'){
  // Alternatives can be natural in real speech; never offer them as wrong.
  const incompatible=(step.options||[]).filter(m=>m!==word!.measure&&!(word!.measure==='個'&&m==='顆')&&!(word!.measure==='顆'&&m==='個'));
  return [word!.measure,...incompatible];
 }
 if(activity.mode==='count')return [1,2,3].map(count=>countedPhrase(word!,count));
 if(activity.mode==='character'){
  const glyphs=[...new Set((activity.wordIds||[]).flatMap(id=>Array.from(extraWord(id)!.text).filter(c=>/[\u3400-\u9fff]/.test(c))))];
  return [activity.glyph!,...glyphs.filter(c=>c!==activity.glyph&&!word!.text.includes(c)).slice(0,3)];
 }
 if(activity.mode==='match'||activity.mode==='measure-match')return activity.wordIds||[];
 // Rotate across the collection; the target must always be in the bank.
 const bank=activity.wordIds||[];
 const index=Math.max(0,bank.indexOf(activity.wordId!));
 return [...new Set([activity.wordId!,...bank.slice(index+1),...bank.slice(0,index)])].slice(0,4);
}
export function extraAnswer(step:Step){const activity=step.extra!;const word=extraWord(activity.wordId||'');return activity.mode==='measure'?word!.measure:activity.mode==='count'?countedPhrase(word!,activity.count!):activity.mode==='character'?activity.glyph!:activity.wordId!;}
