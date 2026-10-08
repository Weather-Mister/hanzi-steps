import type {ExtraWord} from './units.ts';
import type {ExtraSentence,Lesson,Step,Unit} from '../schema.ts';
type Kind='clothing'|'fruits'|'colors';
const support:Record<string,{pinyin:string;meaning:string}>={
'我':{pinyin:'wǒ',meaning:'I'},'你':{pinyin:'nǐ',meaning:'you'},'這':{pinyin:'zhè',meaning:'this'},'是':{pinyin:'shì',meaning:'is; be'},'有':{pinyin:'yǒu',meaning:'have'},'沒有':{pinyin:'méiyǒu',meaning:'do not have'},'想':{pinyin:'xiǎng',meaning:'want to'},'買':{pinyin:'mǎi',meaning:'buy'},'穿':{pinyin:'chuān',meaning:'wear clothing or footwear'},'戴':{pinyin:'dài',meaning:'wear an accessory'},'背':{pinyin:'bēi',meaning:'carry on the back'},'喜歡':{pinyin:'xǐhuān',meaning:'like'},'吃':{pinyin:'chī',meaning:'eat'},'不':{pinyin:'bù',meaning:'not'},'的':{pinyin:'de',meaning:'links a description to its noun'},'一':{pinyin:'yī',meaning:'one; changes tone in a phrase'},'兩':{pinyin:'liǎng',meaning:'two before a measure word'},'三':{pinyin:'sān',meaning:'three'},
'件':{pinyin:'jiàn',meaning:'individual garment'},'條':{pinyin:'tiáo',meaning:'long item or garment'},'雙':{pinyin:'shuāng',meaning:'pair'},'頂':{pinyin:'dǐng',meaning:'hat measure word'},'個':{pinyin:'ge',meaning:'general counting word'},'顆':{pinyin:'kē',meaning:'small round item'},'根':{pinyin:'gēn',meaning:'long thin item'},'串':{pinyin:'chuàn',meaning:'bunch or string'},'副':{pinyin:'fù',meaning:'set; eyeglasses measure word'},'隻':{pinyin:'zhī',meaning:'one individual shoe or glove'},'片':{pinyin:'piàn',meaning:'slice'},'塊':{pinyin:'kuài',meaning:'piece; chunk'},'盒':{pinyin:'hé',meaning:'box'},'斤':{pinyin:'jīn',meaning:'Taiwan market weight unit: 600 g'},'公斤':{pinyin:'gōngjīn',meaning:'kilogram: 1,000 g'},'種':{pinyin:'zhǒng',meaning:'kind; type'},'什麼':{pinyin:'shénme',meaning:'what'},
};
const english:Record<string,string[]>={
tshirt:['T-shirt','T-shirts'],shirt:['shirt','shirts'],jacket:['jacket','jackets'],sweater:['sweater','sweaters'],trousers:['pair of trousers','pairs of trousers'],skirt:['skirt','skirts'],dress:['dress','dresses'],shoes:['pair of shoes','pairs of shoes'],socks:['pair of socks','pairs of socks'],hat:['hat','hats'],shorts:['pair of shorts','pairs of shorts'],jeans:['pair of jeans','pairs of jeans'],sneakers:['pair of sneakers','pairs of sneakers'],raincoat:['raincoat','raincoats'],swimsuit:['swimsuit','swimsuits'],scarf:['scarf','scarves'],gloves:['pair of gloves','pairs of gloves'],belt:['belt','belts'],glasses:['set of eyeglasses','sets of eyeglasses'],backpack:['backpack','backpacks'],
apple:['apple','apples'],banana:['banana','bananas'],orange:['mandarin orange','mandarin oranges'],grapes:['bunch of grapes','bunches of grapes'],watermelon:['watermelon','watermelons'],pineapple:['pineapple','pineapples'],mango:['mango','mangoes'],strawberry:['strawberry','strawberries'],pear:['pear','pears'],papaya:['papaya','papayas'],guava:['guava','guavas'],dragonfruit:['dragon fruit','dragon fruits'],kiwi:['kiwifruit','kiwifruit'],sweetorange:['sweet orange','sweet oranges'],lemon:['lemon','lemons'],peach:['peach','peaches'],plum:['plum','plums'],cherry:['cherry','cherries'],lychee:['lychee','lychees'],pomelo:['pomelo','pomelos'],
};
function activity(id:string,mode:NonNullable<Step['extra']>['mode'],word:ExtraWord,words:ExtraWord[]=[],other:Partial<Step>={}):Step{
 return {id,type:'extra',extra:{mode,wordId:word.id,wordIds:words.map(word=>word.id)},...other};
}
function primer(id:string,words:ExtraWord[]):Step{return {id,type:'extra',extra:{mode:'learn',wordIds:words.map(word=>word.id)}};}
function write(id:string,word:ExtraWord,chars=Array.from(word.text)):Step[]{
 return chars.filter(char=>/[\u3400-\u9fff]/.test(char)).flatMap(glyph=>['trace','complete','memory'].map(writeMode=>activity(id+'-'+glyph+'-'+writeMode,'writing',word,[],{extra:{mode:'writing',wordId:word.id,glyph,writeMode:writeMode as 'trace'|'complete'|'memory'}})));
}
function sentence(id:string,words:ExtraWord[],tokens:string[],pinyin:string,meaning:string,note:string,question=false):Step[]{
 const word=words.find(word=>tokens.includes(word.text))||words[0];
 const data:ExtraSentence={text:tokens.join('')+(question?'？':'。'),tokens,pinyin,meaning,note,support:tokens.map(text=>{const word=words.find(word=>word.text===text);const info=word?{pinyin:word.pinyin,meaning:word.meaning}:support[text];if(!info)throw new Error('Unexplained sentence token '+text);return {text,...info};})};
 return ['sentence-learn','sentence-order'].map(mode=>activity(id+'-'+mode,mode as 'sentence-learn'|'sentence-order',word,[],{extra:{mode:mode as 'sentence-learn'|'sentence-order',wordId:word.id,sentence:data}}));
}
function question(id:string,word:ExtraWord,prompt:string,options:string[],answer:string,explanation:string,audioText?:string):Step{
 return activity(id,audioText?'listen-question':'question',word,[],{prompt,options,answer,explanation,...(audioText?{audioText}:{})});
}
function safePair(a:string,b:string){
 return ![['trousers','shorts','jeans'],['shoes','sneakers'],['jacket','raincoat'],['orange','sweetorange'],['color-blue','color-darkblue'],['color-blue','color-lightblue'],['color-yellow','color-gold'],['color-gray','color-silver']].some(family=>a!==b&&family.includes(a)&&family.includes(b))&&!(a!==b&&(a==='color-word'||b==='color-word')&&a.startsWith('color-')&&b.startsWith('color-'));
}
function bankFor(word:ExtraWord,words:ExtraWord[]){
 if(word.id==='color-word')return [word,...words.filter(item=>item.id!==word.id).slice(0,3)];
 const bank=[word];
 for(const item of words)if(bank.length<4&&!bank.some(w=>w.id===item.id)&&bank.every(w=>safePair(w.id,item.id)))bank.push(item);
 return bank;
}
function mixed(id:string,words:ExtraWord[]):Step{
 return {id,type:'extra',extra:{mode:'mixed-match',wordIds:words.map(word=>word.id),pairs:words.map((word,i)=>({id:word.id,wordId:word.id,left:i===2&&word.measure?word.counted:i===3&&word.measure?'一 __ '+word.text:word.text,...(i===0&&word.id!=='color-word'?{pictureId:word.id}:i===3&&word.measure?{right:word.measure}:{right:i===2?(word.measure?word.countedPinyin:word.pinyin):word.meaning})}))}};
}
function wordWorksheet(kind:Kind,word:ExtraWord,words:ExtraWord[],index:number):Lesson{
 const id='extra-'+kind+'-word-'+word.id,bank=bankFor(word,words),number=index%3+1;
 const steps:Step[]=[primer(id+'-study',bank)];
 if(word.id!=='color-word')steps.push(activity(id+'-picture','picture',word,bank),activity(id+'-word','word',word,bank),activity(id+'-listen-picture','listen-picture',word,bank));
 steps.push(activity(id+'-meaning','meaning',word,bank),activity(id+'-text','text-word',word,bank),activity(id+'-listen-word','listen-word',word,bank),...write(id+'-write',word));
 if(word.measure){
  const incompatible=['件','條','雙','頂','副','串','根','種'].filter(measure=>measure!==word.measure&&!(word.id==='banana'&&['條','個'].includes(measure))&&!(word.id==='skirt'&&measure==='件')).slice(0,3);
  steps.push(activity(id+'-measure','measure',word,[],{options:[word.measure,...incompatible]}));
  if(kind!=='colors')steps.push(activity(id+'-count','count',word,[],{extra:{mode:'count',wordId:word.id,count:number}}));
 }
 const count=['','一','兩','三'][number],countPinyin=['','', 'liǎng','sān'][number];
 if(kind==='colors'){
  const tokens=word.id==='color-word'?['我','喜歡','這','種',word.text]:['我','喜歡',word.text];
  steps.push(...sentence(id+'-sentence',words,tokens,word.id==='color-word'?'Wǒ xǐhuān zhè zhǒng yánsè.':'Wǒ xǐhuān '+word.pinyin+'.',word.id==='color-word'?'I like this kind of color.':'I like '+word.meaning+'.','我 = I; 喜歡 = like. A color name can follow 喜歡 directly. 這種顏色 means this kind of color; 種 counts kinds, not garments.'));
 }else{
  const tokens=kind==='clothing'?['我','有',count,word.measure,word.text]:['我','想','買',count,word.measure,word.text];
  steps.push(...sentence(id+'-sentence',words,tokens,(kind==='clothing'?'Wǒ yǒu ':'Wǒ xiǎng mǎi ')+(number===1?word.countedPinyin:countPinyin+' '+word.measurePinyin+' '+word.pinyin)+'.',(kind==='clothing'?'I have ':'I want to buy ')+['','one','two','three'][number]+' '+english[word.id][number===1?0:1]+'.','Subject → 有 (have), or 想 + 買 (want to buy) → number + measure word + noun. Use 兩 before a measure word for two. '+word.note));
 }
 if(bank.length>=3)steps.push(mixed(id+'-mixed',bank));
 return {id,unitId:'extra-'+kind,title:word.text+' · '+word.meaning,subtitle:'Study the word and its characters, recognize it, listen, write, and build a sentence.',chars:Array.from(word.text).filter(char=>/[\u3400-\u9fff]/.test(char)),minutes:'8–14 min',extraSection:'Word worksheets',steps};
}
function lesson(kind:Kind,key:string,title:string,words:ExtraWord[],steps:Step[],chars:string[]=[]):Lesson{
 const id='extra-'+kind+'-'+key;
 return {id,unitId:'extra-'+kind,title,subtitle:'Examples first, then recognition, matching, handwriting, and short constructions.',chars,minutes:'8–15 min',extraSection:'Counting and everyday use',steps:[primer(id+'-study',words),...steps]};
}
function finalReview(kind:Kind,words:ExtraWord[]):Lesson{
 const id='extra-'+kind+'-full-review';
 const steps:Step[]=[primer(id+'-study',words)];
 for(const [index,word] of words.entries()){
  const bank=bankFor(word,words);
  steps.push(activity(id+'-recognize-'+word.id,word.id==='color-word'?'meaning':index%2?'picture':'word',word,bank),activity(id+'-listen-'+word.id,'listen-word',word,bank),...write(id+'-memory-'+word.id,word,[Array.from(word.text)[0]]).filter(step=>step.extra!.writeMode==='memory'));
 }
 const target=words[0];
 steps.push(mixed(id+'-mixed',bankFor(target,words)));
 if(kind==='colors')steps.push(...sentence(id+'-sentence',words,['我','喜歡',target.text],'Wǒ xǐhuān '+target.pinyin+'.','I like '+target.meaning+'.','A color name can follow 喜歡, like.'));
 else steps.push(...sentence(id+'-sentence',words,['我','想','買','一',target.measure,target.text],'Wǒ xiǎng mǎi '+target.countedPinyin+'.','I want to buy one '+english[target.id][0]+'.','我 = I; 想 = want to; 買 = buy. Count the item with number + measure word + noun.'));
 return {id,unitId:'extra-'+kind,title:'Full collection review',subtitle:'Retrieve every word, hear it, and write key characters from memory.',chars:[],review:true,minutes:'20–30 min',extraSection:'Full collection review',steps};
}
export function buildWorkbookLessons(kind:'clothing'|'fruits',words:ExtraWord[]):Lesson[]{
 const result=words.map((word,index)=>wordWorksheet(kind,word,words,index));
 const get=(id:string)=>words.find(word=>word.id===id)!;
 if(kind==='clothing'){
  const wearing=[
   ...sentence('extra-clothing-wear-shirt',words,['我','穿','一','件','T恤'],'Wǒ chuān yí jiàn T xù.','I wear a T-shirt.','穿 is used for garments and footwear: tops, trousers, dresses, shoes, and swimsuits.'),
   ...sentence('extra-clothing-wear-hat',words,['我','戴','一','頂','帽子'],'Wǒ dài yì dǐng màozi.','I wear a hat.','戴 is used for accessories: hats, gloves, scarves, and eyeglasses.'),
   ...sentence('extra-clothing-carry',words,['我','背','一','個','背包'],'Wǒ bēi yí ge bèibāo.','I carry a backpack on my back.','The verb 背 is bēi; the noun 背包 is bèibāo. Learn the readings in their full contexts.'),
   question('extra-clothing-wear-q1',get('sneakers'),'Which verb means wear in the sports-shoe example?',['穿','戴','背'],'穿','Use 穿 for footwear. 戴 is for accessories; 背 is for carrying on the back.'),
   question('extra-clothing-wear-q2',get('glasses'),'Which verb means wear for eyeglasses?',['穿','戴','背'],'戴','Eyeglasses are worn with 戴.'),
   ...write('extra-clothing-wear-glyphs',get('tshirt'),['穿','戴','背']),
  ];
  result.push(lesson(kind,'wearing','Wear it: 穿, 戴, 背',words,wearing,['穿','戴','背']));
  result.push(lesson(kind,'single-pair','One item, a pair, or a set',words,[
   ...sentence('extra-clothing-single',words,['我','有','一','隻','鞋子'],'Wǒ yǒu yì zhī xiézi.','I have one individual shoe.','一隻鞋子 is one shoe. 一雙鞋子 is one pair containing two shoes. 一副眼鏡 is one set of eyeglasses.'),
   ...sentence('extra-clothing-pair',words,['我','有','一','雙','鞋子'],'Wǒ yǒu yì shuāng xiézi.','I have one pair of shoes.','雙 counts a pair; the number counts pairs, not individual shoes.'),
   ...sentence('extra-clothing-set',words,['我','有','一','副','眼鏡'],'Wǒ yǒu yí fù yǎnjìng.','I have one set of eyeglasses.','副 counts the complete set of eyeglasses.'),
   question('extra-clothing-single-q',get('shoes'),'Choose the label for one individual shoe.',['一隻鞋子','一雙鞋子','兩雙鞋子'],'一隻鞋子','隻 counts the individual shoe; 雙 counts a pair.'),
   question('extra-clothing-pair-q',get('gloves'),'Choose the label for two pairs of gloves.',['一雙手套','兩雙手套','一隻手套'],'兩雙手套','兩雙 is two pairs, totaling four individual gloves.'),
   ...write('extra-clothing-single-write',get('shoes'),['隻','雙','副']),
   mixed('extra-clothing-count-mixed',[get('shirt'),get('hat'),get('glasses'),get('trousers')]),
  ],['隻','雙','副']));
  result.push(lesson(kind,'have-want','Have it, want it, or do not have it',words,[
   ...sentence('extra-clothing-have',words,['我','有','一','條','皮帶'],'Wǒ yǒu yì tiáo pídài.','I have a belt.','Use 有 for having something.'),
   ...sentence('extra-clothing-not-have',words,['我','沒有','皮帶'],'Wǒ méiyǒu pídài.','I do not have a belt.','沒有 is the negative of 有. The noun can stand without a counted amount when you mean you have none.'),
   ...sentence('extra-clothing-buy',words,['我','想','買','一','條','圍巾'],'Wǒ xiǎng mǎi yì tiáo wéijīn.','I want to buy a scarf.','想 + 買 expresses wanting to buy. Keep the counting phrase after 買.'),
   question('extra-clothing-have-listen',get('belt'),'Choose the meaning you hear.',['I have a belt.','I do not have a belt.','I want to buy a scarf.'],'I do not have a belt.','沒有 means do not have.','我沒有皮帶。'),
   ...write('extra-clothing-have-write',get('belt'),['帶']),
   mixed('extra-clothing-have-mixed',[get('scarf'),get('belt'),get('backpack'),get('glasses')]),
  ]));
  result.push(lesson(kind,'names','General names and specific garments',words,[
   ...sentence('extra-clothing-jeans-sentence',words,['我','有','一','條','牛仔褲'],'Wǒ yǒu yì tiáo niúzǎikù.','I have a pair of jeans.','褲子 is the broad name; 短褲 is shorts; 牛仔褲 is jeans. 鞋子 is broad; 運動鞋 is sports shoes.'),
   question('extra-clothing-jeans-name',get('jeans'),'Choose the specific word for jeans.',['牛仔褲','短褲','運動鞋'],'牛仔褲','牛仔褲 specifically means jeans.'),
   question('extra-clothing-short-name',get('shorts'),'Choose the specific word for shorts.',['短褲','雨衣','圍巾'],'短褲','短 means short; 短褲 is shorts.'),
   question('extra-clothing-shoe-name',get('sneakers'),'Choose the specific word for sports shoes.',['運動鞋','手套','泳衣'],'運動鞋','運動鞋 specifically names sports shoes.'),
   ...write('extra-clothing-names-write',get('jeans'),['仔','褲']),
  ]));
 }else{
  result.push(lesson(kind,'whole-bunch','Whole fruit, a bunch, or one grape',words,[
   ...sentence('extra-fruits-bunch',words,['我','想','買','一','串','葡萄'],'Wǒ xiǎng mǎi yí chuàn pútáo.','I want to buy one bunch of grapes.','串 counts a bunch. 顆 counts an individual grape. 個 or 顆 can count many whole fruits, depending on usage.'),
   ...sentence('extra-fruits-one-grape',words,['我','有','一','顆','葡萄'],'Wǒ yǒu yì kē pútáo.','I have one grape.','A bunch and one berry are different amounts: 一串葡萄 versus 一顆葡萄.'),
   question('extra-fruits-grape-q',get('grapes'),'Choose the label for one bunch of grapes.',['一串葡萄','一顆葡萄','兩顆葡萄'],'一串葡萄','The requested amount is a bunch, so use 串.'),
   ...write('extra-fruits-bunch-write',get('grapes'),['串','顆']),
   mixed('extra-fruits-bunch-mixed',[get('apple'),get('banana'),get('grapes'),get('strawberry')]),
  ]));
  result.push(lesson(kind,'pieces-boxes','Slices, pieces, and boxes',words,[
   ...sentence('extra-fruits-slice',words,['我','想','買','一','片','西瓜'],'Wǒ xiǎng mǎi yí piàn xīguā.','I want to buy a slice of watermelon.','片 counts a slice. 塊 counts a chunk or piece. 盒 counts a box; it does not state the number of individual fruits inside.'),
   ...sentence('extra-fruits-piece',words,['我','有','一','塊','鳳梨'],'Wǒ yǒu yí kuài fènglí.','I have a piece of pineapple.','一塊鳳梨 is a piece; 一個鳳梨 is a whole fruit.'),
   ...sentence('extra-fruits-box',words,['我','想','買','一','盒','草莓'],'Wǒ xiǎng mǎi yì hé cǎoméi.','I want to buy a box of strawberries.','盒 counts the box, not the strawberries individually.'),
   question('extra-fruits-slice-q',get('watermelon'),'Which label names one slice of watermelon?',['一片西瓜','一個西瓜','一盒草莓'],'一片西瓜','片 names a slice; 個 names a whole watermelon here.'),
   question('extra-fruits-box-q',get('strawberry'),'Which label names one box of strawberries?',['一盒草莓','一顆草莓','一串葡萄'],'一盒草莓','盒 counts the box.'),
   ...write('extra-fruits-pieces-write',get('watermelon'),['片','塊','盒']),
  ],['片','塊','盒']));
  result.push(lesson(kind,'market-weight','Buying fruit by weight',words,[
   ...sentence('extra-fruits-kilo',words,['我','想','買','一','公斤','蘋果'],'Wǒ xiǎng mǎi yì gōngjīn píngguǒ.','I want to buy one kilogram of apples.','公斤 is kilogram, 1,000 g. In Taiwan markets, 斤 usually means the 台斤, 600 g. A weight phrase replaces the individual-fruit measure phrase: 一公斤蘋果 versus 一個蘋果.'),
   ...sentence('extra-fruits-jin',words,['我','想','買','兩','斤','芭樂'],'Wǒ xiǎng mǎi liǎng jīn bālè.','I want to buy two Taiwan jin of guavas.','斤 counts weight, not individual fruits. Two Taiwan jin is 1,200 g. The point here is recognizing the unit in a market phrase.'),
   question('extra-fruits-weight-q',get('apple'),'Choose the phrase for one kilogram of apples.',['一公斤蘋果','一個蘋果','一盒草莓'],'一公斤蘋果','公斤 states weight; 個 counts an individual fruit.'),
   question('extra-fruits-weight-listen',get('guava'),'Choose the amount you hear.',['Two Taiwan jin of guavas.','One kilogram of apples.','One box of strawberries.'],'Two Taiwan jin of guavas.','兩斤芭樂 names two Taiwan jin of guavas.','我想買兩斤芭樂。'),
   ...write('extra-fruits-weight-write',get('guava'),['公','斤']),
  ],['公','斤']));
  result.push(lesson(kind,'names-preferences','Similar names and what you like',words,[
   ...sentence('extra-fruits-like',words,['我','喜歡','吃','芭樂'],'Wǒ xǐhuān chī bālè.','I like eating guava.','喜歡 + 吃 + fruit means like eating that fruit. 不 before 喜歡 makes a negative statement. 橘子 is mandarin; 柳橙 is sweet orange. 鳳梨 is pineapple; 梨子 is pear. 李子 is plum, lǐzi; 梨子 is pear, lízi.'),
   ...sentence('extra-fruits-not-like',words,['我','不','喜歡','吃','檸檬'],'Wǒ bù xǐhuān chī níngméng.','I do not like eating lemon.','不 + 喜歡 means do not like. This is a preference, not a claim about what everyone eats.'),
   question('extra-fruits-orange-name',get('sweetorange'),'Choose the word for sweet orange.',['柳橙','橘子','梨子'],'柳橙','柳橙 is sweet orange; 橘子 is usually mandarin or tangerine.'),
   question('extra-fruits-plum-name',get('plum'),'Which fruit has the reading lǐzi?',['李子','梨子','桃子'],'李子','李子 is lǐzi, plum; 梨子 is lízi, pear.'),
   activity('extra-fruits-plum-listen','listen-word',get('plum'),[get('plum'),get('pear'),get('peach'),get('cherry')]),
   ...write('extra-fruits-names-write',get('plum'),['李','梨']),
  ]));
 }
 result.push(finalReview(kind,words));return result;
}
export function buildColorUnit(words:ExtraWord[],clothing:ExtraWord[]):{unit:Unit;lessons:Lesson[]}{
 const lessons=words.map((word,index)=>wordWorksheet('colors',word,words,index));
 const get=(id:string)=>[...words,...clothing].find(word=>word.id===id)!;
 const noun=get('tshirt'),hat=get('hat'),blue=get('color-blue'),red=get('color-red'),topic=get('color-word');
 const borrowed=[...words,noun,hat];
 lessons.push(lesson('colors','ask','Ask and name the color',words,[
  ...sentence('extra-colors-ask',words,['這','是','什麼','顏色'],'Zhè shì shénme yánsè?','What color is this?','這 = this; 是 = is; 什麼 = what; 顏色 = color. Replace 什麼顏色 with the color name to answer.',true),
  ...sentence('extra-colors-answer',words,['這','是','藍色'],'Zhè shì lánsè.','This is blue.','這是 + color name identifies a color.'),
  question('extra-colors-ask-q',topic,'Which line asks what color this is?',['這是什麼顏色？','這是藍色。','這是紅色。'],'這是什麼顏色？','什麼顏色 asks what color.'),
  ...write('extra-colors-ask-write',topic,['顏','色']),
 ]));
 lessons.push(lesson('colors','describe','Put the color before the object',borrowed,[
  ...sentence('extra-colors-shirt',borrowed,['我','想','買','一','件','藍色','的','T恤'],'Wǒ xiǎng mǎi yí jiàn lánsè de T xù.','I want to buy a blue T-shirt.','Use number + object measure word + color + 的 + noun. 件 counts the garment; the color itself has no garment measure word.'),
  ...sentence('extra-colors-hat',borrowed,['我','有','一','頂','紅色','的','帽子'],'Wǒ yǒu yì dǐng hóngsè de màozi.','I have a red hat.','紅色的帽子 is a red hat; 頂 still counts the hat.'),
  activity('extra-colors-shirt-picture','color-object',blue,[blue,red,get('color-green'),get('color-white')],{extra:{mode:'color-object',wordId:blue.id,wordIds:[blue.id,red.id,'color-green','color-white'],nounId:noun.id}}),
  ...write('extra-colors-describe-write',blue,['藍','紅']),
 ]));
 lessons.push(lesson('colors','shades','Dark and light shades',words,[
  ...sentence('extra-colors-dark',words,['我','喜歡','深藍色'],'Wǒ xǐhuān shēnlánsè.','I like dark blue.','深 = dark/deep; 淺 = light/pale. Both are blue. The two swatches compare brightness within the same blue family.'),
  ...sentence('extra-colors-light',words,['我','喜歡','淺藍色'],'Wǒ xǐhuān qiǎnlánsè.','I like light blue.','Choose 淺藍色 for the pale blue shade, and 深藍色 for the dark one.'),
  activity('extra-colors-dark-choice','picture',get('color-darkblue'),[get('color-darkblue'),get('color-lightblue'),red,get('color-green')]),
  activity('extra-colors-light-choice','listen-picture',get('color-lightblue'),[get('color-lightblue'),get('color-darkblue'),red,get('color-green')]),
  question('extra-colors-shade-q',get('color-lightblue'),'Choose the name for a light/pale blue shade.',['淺藍色','深藍色','紅色'],'淺藍色','淺 means light or pale; 深 means dark or deep.'),
  ...write('extra-colors-shade-write',get('color-darkblue'),['深','淺']),
 ]));
 lessons.push(lesson('colors','kinds','Kinds of color and appearance',words,[
  ...sentence('extra-colors-kinds',words,['我','喜歡','兩','種','顏色'],'Wǒ xǐhuān liǎng zhǒng yánsè.','I like two kinds of color.','種 counts kinds: 兩種顏色. Count an object with its own measure word instead. 金色 and 銀色 describe appearance; they do not promise gold or silver material.'),
  question('extra-colors-kinds-q',topic,'Choose the counting word for kinds in 兩 __ 顏色.',['種','件','雙'],'種','種 counts kinds; 件 counts garments; 雙 counts pairs.'),
  question('extra-colors-gold-q',get('color-gold'),'What does 金色 describe?',['A gold-colored appearance.','An object guaranteed to be pure gold.','A silver-colored appearance.'],'A gold-colored appearance.','金色 is a color description, not a guarantee of material.'),
  activity('extra-colors-metal-listen','listen-word',get('color-silver'),[get('color-silver'),get('color-gold'),red,blue]),
  ...write('extra-colors-kinds-write',topic,['種','金','銀']),
 ]));
 lessons.push(finalReview('colors',words));
 const chars=[...new Set([...words.flatMap(word=>Array.from(word.text+word.measure)),...lessons.flatMap(lesson=>lesson.steps.filter(step=>step.extra!.mode==='writing').map(step=>step.extra!.glyph!))])];
 const unit:Unit={id:'extra-colors',number:3,theme:'teal',label:'Colors',title:'A world of color.',description:'An always-available color workbook: common colors, dark and light shades, individual word worksheets, handwriting, listening, matching, and useful descriptions.',chars,lessonIds:lessons.map(lesson=>lesson.id),banner:{text:'顏色',pinyin:'yánsè'},goal:{text:'藍色的T恤',pinyin:'lánsè de T xù',meaning:'Recognize color names, distinguish shades, and describe colored objects.'},grammarIds:[]};
 return {unit,lessons};
}
