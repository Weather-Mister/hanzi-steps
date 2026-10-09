import type {Lesson,Step,Unit} from '../schema.ts';
import {moreClothingWords,moreFruitWords,colorWords} from './word-lists.ts';
import {buildWorkbookLessons,buildColorUnit} from './workbooks.ts';
import {vegetableWords,countryWords,actionWords} from './new-word-lists.ts';
import {buildSupplementaryUnit} from './new-workbooks.ts';
export {colorWords,vegetableWords,countryWords,actionWords};

// Supplementary exposure only. Never assemble these into courseModules,
// canonical vocabulary, characters, phrases, or first-teaching indexes.
export type ExtraWord={
 swatch?:string;category?:'vegetables'|'countries'|'actions';acceptedMeasures?:string[];
 id:string;text:string;pinyin:string;meaning:string;measure:string;measurePinyin:string;
 counted:string;countedPinyin:string;note:string;glyphNotes:string[];
};
const w=(id:string,text:string,pinyin:string,meaning:string,measure:string,measurePinyin:string,counted:string,countedPinyin:string,note:string,glyphNotes:string[]):ExtraWord=>({id,text,pinyin,meaning,measure,measurePinyin,counted,countedPinyin,note,glyphNotes});
const baseClothingWords:ExtraWord[]=[
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
const baseFruitWords:ExtraWord[]=[
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
export const clothingWords=[...baseClothingWords,...moreClothingWords];
export const fruitWords=[...baseFruitWords,...moreFruitWords];
export const extraWords=[...clothingWords,...fruitWords,...colorWords,...vegetableWords,...countryWords,...actionWords];
export const extraWord=(id:string)=>extraWords.find(word=>word.id===id);
export function acceptedExtraMeasure(word:ExtraWord,measure:string):boolean{
 if(!word.measure)return false;
 if(word.measure===measure||word.acceptedMeasures?.includes(measure))return true;
 // The illustrations fix the counting context: a bunch of grapes and pairs
 // of footwear, but individual whole fruits and one whole skirt.
 if(word.id==='banana')return ['根','條','個'].includes(measure);
 if(word.id==='skirt')return ['條','件'].includes(measure);
 if(fruitWords.includes(word)&&word.id!=='grapes')return ['個','顆'].includes(measure);
 return false;
}
const numbers=['','一','兩','三'];
export function extraCountingContext(word:ExtraWord){
 if(word.measure==='雙')return 'one pair (two individual items)';
 if(word.measure==='串')return 'one bunch of grapes';
 if(word.measure==='種')return 'one kind of color';
 if(word.measure==='把')return 'one tied bunch';
 if(word.measure==='棵')return 'one whole plant';
 if(word.measure==='朵')return 'one whole mushroom';
 if(word.measure==='塊')return 'one piece';
 if(word.id==='veg-corn')return 'one ear of corn';
 if(word.id==='veg-garlic')return 'one whole garlic bulb';
 if(['veg-cabbage','veg-cauliflower','veg-broccoli'].includes(word.id))return 'one whole head';
 return 'one whole item';
}
export function countedPhrase(word:ExtraWord,count:number){if(!word.measure||!numbers[count])throw new Error('Invalid counted phrase for '+word.id);return numbers[count]+word.measure+word.text;}
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

const glyphs=(word:ExtraWord)=>Array.from(word.text).filter(c=>/[\u3400-\u9fff]/.test(c));
function writingSteps(prefix:string,word:ExtraWord,chars=glyphs(word)):Step[]{
 return chars.flatMap(glyph=>['trace','complete','memory'].map(writeMode=>step(prefix+'-'+glyph+'-'+writeMode,'writing',[],word.id,{extra:{mode:'writing',wordId:word.id,glyph,writeMode:writeMode as 'trace'|'complete'|'memory'}})));
}
function sentenceSteps(prefix:string,kind:'clothing'|'fruits',word:ExtraWord,count=1):Step[]{
 const number=['','一','兩','三'][count],numberPinyin=['','yī','liǎng','sān'][count];
 const verb=kind==='clothing'?'有':'想買';
 const englishNouns:Record<string,string[]>={
 tshirt:['T-shirt','T-shirts'],shirt:['shirt','shirts'],jacket:['jacket','jackets'],sweater:['sweater','sweaters'],trousers:['pair of trousers','pairs of trousers'],skirt:['skirt','skirts'],dress:['dress','dresses'],shoes:['pair of shoes','pairs of shoes'],socks:['pair of socks','pairs of socks'],hat:['hat','hats'],
 apple:['apple','apples'],banana:['banana','bananas'],orange:['mandarin orange','mandarin oranges'],grapes:['bunch of grapes','bunches of grapes'],watermelon:['watermelon','watermelons'],pineapple:['pineapple','pineapples'],mango:['mango','mangoes'],strawberry:['strawberry','strawberries'],pear:['pear','pears'],papaya:['papaya','papayas'],
 };
 const sentence={text:'我'+verb+countedPhrase(word,count)+'。',pinyin:(kind==='clothing'?'Wǒ yǒu ':'Wǒ xiǎng mǎi ')+(count===1?word.countedPinyin:numberPinyin+' '+word.measurePinyin+' '+word.pinyin)+'.',meaning:(kind==='clothing'?'I have ':'I want to buy ')+['','one','two','three'][count]+' '+englishNouns[word.id][count===1?0:1]+'.',tokens:kind==='clothing'?['我','有',number,word.measure,word.text]:['我','想','買',number,word.measure,word.text],note:(kind==='clothing'?'我 (wǒ) = I; 有 (yǒu) = have. Put the owner first, then 有, then the item.':'我 (wǒ) = I; 想 (xiǎng) = want to; 買 (mǎi) = buy. Put 我 + 想 + 買 before the item.')+' Count it with number + measure word + noun. Use 兩, rather than 二, for two before a measure word. '+word.note,support:[{text:'我',pinyin:'wǒ',meaning:'I'},...(kind==='clothing'?[{text:'有',pinyin:'yǒu',meaning:'have'}]:[{text:'想',pinyin:'xiǎng',meaning:'want to'},{text:'買',pinyin:'mǎi',meaning:'buy'}]),{text:number,pinyin:numberPinyin,meaning:String(count)},{text:word.measure,pinyin:word.measurePinyin,meaning:'counting word'},{text:word.text,pinyin:word.pinyin,meaning:word.meaning}]};
 return ['sentence-learn','sentence-order'].map(mode=>step(prefix+'-'+mode,mode as 'sentence-learn'|'sentence-order',[],word.id,{extra:{mode:mode as 'sentence-learn'|'sentence-order',wordId:word.id,sentence}}));
}
function mixedStep(prefix:string,words:ExtraWord[]):Step{
 const chosen=words.slice(0,4);
 const pairs=chosen.map((word,i)=>({id:word.id,wordId:word.id,left:i===2?word.counted:i===3?'一 __ '+word.text:word.text,...(i===0?{pictureId:word.id}:i===3?{right:word.measure}:{right:i===2?'one '+(word.measure==='雙'?'pair of ':word.measure==='串'?'bunch of ':'')+word.meaning:word.meaning})}));
 return step(prefix,'mixed-match',chosen.map(w=>w.id),undefined,{extra:{mode:'mixed-match',wordIds:chosen.map(w=>w.id),pairs}});
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
  ...(kind==='clothing'?['tshirt','trousers','shoes','hat']:['apple','banana','grapes','strawberry']).map((id,i)=>({...step(prefix+'-count-'+id,'count',[],id),extra:{mode:'count' as const,wordId:id,count:i%2+2}})),
 ]});
 lessons.push({id:prefix+'-listening',unitId:prefix,title:'Hear it, find it',subtitle:'Listen to the noun and choose its picture. Text support is available.',chars:[],minutes:'4–5 min',steps:words.map(word=>step(prefix+'-listen-'+word.id,'listen-picture',words.map(w=>w.id),word.id))});
 lessons.push({id:prefix+'-review',unitId:prefix,title:'Your collection check',subtitle:'A mixed review of pictures, characters, listening, and counting.',chars:[],minutes:'5–7 min',review:true,steps:words.flatMap((word,i)=>[
  step(prefix+'-review-picture-'+word.id,i%2===0?'word':'picture',words.map(w=>w.id),word.id),
  i%2===0?step(prefix+'-review-glyph-'+word.id,'character',words.map(w=>w.id),word.id,{extra:{mode:'character',wordId:word.id,wordIds:words.map(w=>w.id),glyph:Array.from(word.text).find(c=>/[\u3400-\u9fff]/.test(c))}}):i<6?step(prefix+'-review-listen-'+word.id,'listen-picture',words.map(w=>w.id),word.id):step(prefix+'-review-count-'+word.id,'count',[],word.id,{extra:{mode:'count',wordId:word.id,count:2}}),
 ])});
 // Every lesson is directly accessible, so each practice lesson must teach its
 // entire answer bank even when no earlier extra lesson has been completed.
 for(const lesson of lessons.slice(3))lesson.steps.unshift(step(lesson.id+'-collection','learn',words.map(w=>w.id)));

 // Extend the published tails only: saved partial positions keep their meaning.
 // Every lesson now combines visual work with standard retrieval and handwriting.
 const written=new Set<string>();
 groups.forEach((group,index)=>{
  const lesson=lessons[index];
  lesson.steps.push(...group.map(word=>step(lesson.id+'-text-'+word.id,'text-word',group.map(w=>w.id),word.id)));
  for(const word of group){
   const fresh=glyphs(word).filter(char=>!written.has(char));
   lesson.steps.push(...writingSteps(lesson.id+'-write',word,fresh));fresh.forEach(char=>written.add(char));
  }
  lesson.steps.push(...sentenceSteps(lesson.id+'-sentence',kind,group[0],index+1));
  lesson.minutes='10–15 min';
  lesson.subtitle+=' · recognition, handwriting, and a short sentence';
 });
 for(const [index,lesson] of lessons.slice(3).entries()){
  const word=words[[1,0,4,7][index]];
  lesson.steps.push(...words.slice(index,index+3).map(w=>step(lesson.id+'-meaning-'+w.id,index===2?'listen-word':'meaning',words.map(w=>w.id),w.id)));
  lesson.steps.push(mixedStep(lesson.id+'-mixed',index===3?[words[7],words[8],words[9],words[0]]:words.slice(0,4)));
  if(index===1){
   for(const measure of [...new Set(words.map(w=>w.measure))]){
    const example=words.find(w=>w.measure===measure)!;
    lesson.steps.push(...writingSteps(lesson.id+'-write-measure',example,[measure]));
   }
  }else lesson.steps.push(...writingSteps(lesson.id+'-write',word,[glyphs(word)[0]]));
  lesson.steps.push(...sentenceSteps(lesson.id+'-sentence',kind,word,index%2+1));
  lesson.minutes=index===1?'10–15 min':'7–10 min';
 }

 return {unit:{id:prefix,number,theme:kind==='clothing'?'indigo':'orange',label:kind==='clothing'?'Clothing':'Fruits',title,description:'Optional and always available. Learn through pictures, listening, matching, handwriting, and short sentences. Every completed lesson counts toward your streak and extra-unit progress.',chars:[...new Set(words.flatMap(w=>Array.from(w.text+w.measure).filter(c=>/[\u3400-\u9fff]/.test(c))))],lessonIds:lessons.map(l=>l.id),banner:{text:hanzi,pinyin},goal:{text:hanzi,pinyin,meaning:kind==='clothing'?'Recognize everyday clothing and count garments, pairs, and hats.':'Recognize everyday fruit and count whole fruits, bananas, and bunches.'},grammarIds:[]},lessons};
}
const collections=[makeUnit('clothing',1,baseClothingWords,'Open your wardrobe.','衣服','yīfu'),makeUnit('fruits',2,baseFruitWords,'A stop at the fruit stall.','水果','shuǐguǒ')];
for(const [i,collection] of collections.entries()){
 const words=i===0?clothingWords:fruitWords;
 collection.lessons.forEach(lesson=>{lesson.extraSection='Starter path'});
 const worksheets=buildWorkbookLessons(i===0?'clothing':'fruits',words);
 collection.lessons.push(...worksheets);
 collection.unit.lessonIds=collection.lessons.map(lesson=>lesson.id);
 collection.unit.chars=[...new Set([...words.flatMap(word=>Array.from(word.text+word.measure)),...worksheets.flatMap(lesson=>lesson.steps.filter(step=>step.extra?.mode==='writing').map(step=>step.extra!.glyph!))].filter(char=>/[\u3400-\u9fff]/.test(char)))];
 collection.unit.description='A complete optional word-list workbook: '+words.length+' words, '+collection.lessons.length+' lessons, visual recognition, handwriting, counting, listening, and useful sentences. Everything is always available.';
}
collections.push(buildColorUnit(colorWords,clothingWords),buildSupplementaryUnit('vegetables',vegetableWords),buildSupplementaryUnit('countries',countryWords),buildSupplementaryUnit('actions',actionWords));
export const extraUnits=collections.map(c=>c.unit);
export const extraLessons=collections.flatMap(c=>c.lessons);
export const extraPracticeLessons:Lesson[]=[...new Set(collections.flatMap(collection=>collection.unit.chars))].map(glyph=>{
 const word=extraWords.find(word=>word.text.includes(glyph)||word.measure===glyph)||wordsForCollectionGlyph(glyph)[0];
 const unitId=collections.find(collection=>collection.unit.chars.includes(glyph))!.unit.id;
 return {id:'extra-practice-'+glyph,unitId,title:'Practice '+glyph,subtitle:'Trace, finish the strokes, and write from memory.',chars:[glyph],minutes:'3–4 min',steps:[step('extra-practice-'+glyph+'-learn','character-learn',[],word.id,{extra:{mode:'character-learn',wordId:word.id,glyph}}),...writingSteps('extra-practice-'+glyph,word,[glyph])]};
});
function wordsForCollectionGlyph(glyph:string){const unit=collections.find(collection=>collection.unit.chars.includes(glyph))!.unit.id;return wordsForExtraUnit(unit);}
export const isExtraLesson=(id:string)=>[...extraLessons,...extraPracticeLessons].some(lesson=>lesson.id===id);
export function wordsForExtraUnit(unitId:string){return unitId==='extra-clothing'?clothingWords:unitId==='extra-fruits'?fruitWords:unitId==='extra-colors'?colorWords:unitId==='extra-vegetables'?vegetableWords:unitId==='extra-countries'?countryWords:unitId==='extra-actions'?actionWords:[];}
export function extraUnitComplete(unit:Unit,completed:Set<string>){return unit.lessonIds.every(id=>completed.has(id));}
export function extraChoices(step:Step):string[]{
 const activity=step.extra!,word=extraWord(activity.wordId||'');
 if(['learn','character-learn','sentence-learn','sentence-order','writing'].includes(activity.mode))return [];
 if(activity.mode==='question'||activity.mode==='listen-question')return step.options||[];
 if(activity.mode==='mixed-match')return activity.pairs!.map(pair=>pair.id);
 if(activity.mode==='measure'){
  // Alternatives can be natural in real speech; never offer them as wrong.
  const incompatible=(step.options||[]).filter(m=>!acceptedExtraMeasure(word!,m));
  return [word!.measure,...incompatible];
 }
 if(activity.mode==='count')return [1,2,3].map(count=>countedPhrase(word!,count));
 if(activity.mode==='character'){
  const glyphs=[...new Set((activity.wordIds||[]).flatMap(id=>Array.from(extraWord(id)!.text).filter(c=>/[\u3400-\u9fff]/.test(c))))];
  return [activity.glyph!,...glyphs.filter(c=>c!==activity.glyph&&!word!.text.includes(c)).slice(0,3)];
 }
 if(activity.mode==='match'||activity.mode==='measure-match')return activity.wordIds||[];
 // Rotate across the collection; the target must always be in the bank.
 const visual=['picture','word','listen-picture','color-object'].includes(activity.mode);
 const bank=(activity.wordIds||[]).filter(id=>!visual||id===activity.wordId||!ambiguousExtraPair(activity.wordId!,id));
 const index=Math.max(0,bank.indexOf(activity.wordId!));
 return [...new Set([activity.wordId!,...bank.slice(index+1),...bank.slice(0,index)])].slice(0,4);
}
export function ambiguousExtraPair(a:string,b:string):boolean{
 const families=[['trousers','shorts','jeans'],['shoes','sneakers'],['jacket','raincoat'],['orange','sweetorange'],['veg-cauliflower','veg-broccoli'],['veg-spinach','veg-water-spinach'],['color-blue','color-darkblue'],['color-blue','color-lightblue'],['color-yellow','color-gold'],['color-gray','color-silver']];
 return a!==b&&(families.some(family=>family.includes(a)&&family.includes(b))||(a==='color-word'||b==='color-word')&&(a.startsWith('color-')&&b.startsWith('color-')));
}
export function extraAnswer(step:Step){const activity=step.extra!;const word=extraWord(activity.wordId||'');return activity.mode==='question'||activity.mode==='listen-question'?step.answer!:activity.mode==='measure'?word!.measure:activity.mode==='count'?countedPhrase(word!,activity.count!):activity.mode==='character'?activity.glyph!:activity.wordId!;}
