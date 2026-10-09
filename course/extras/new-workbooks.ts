import type {ExtraWord} from './units.ts';
import type {Lesson,Step,Unit} from '../schema.ts';
import {activity,primer,write,sentence,question,bankFor,mixed} from './workbooks.ts';
type Kind='vegetables'|'countries'|'actions';
const glyphs=(text:string)=>Array.from(text).filter(c=>/[\u3400-\u9fff]/.test(c));
const setting={
 vegetables:{number:4,theme:'teal',label:'Vegetables',title:'A basket from the vegetable stall.',text:'蔬菜',pinyin:'shūcài',goal:'Recognize everyday vegetables and count heads, roots, bunches, and pieces.'},
 countries:{number:5,theme:'blue',label:'Countries',title:'Names from around the world.',text:'國家',pinyin:'guójiā',goal:'Recognize country names, describe nationality, and say where you want to go.'},
 actions:{number:6,theme:'amber',label:'Basic actions',title:'Chinese for the things you do.',text:'動作',pinyin:'dòngzuò',goal:'Recognize everyday actions and use them in simple sentences.'},
} as const;
function usefulSentence(id:string,kind:Kind,word:ExtraWord,words:ExtraWord[],count=1):Step[]{
 if(kind==='countries')return sentence(id,words,['我','想','去',word.text],'Wǒ xiǎng qù '+word.pinyin+'.','I want to go to '+(word.id==='country-usa'||word.id==='country-uk'?'the ':'')+word.meaning.replace('; Turkey','')+'.','我 = I; 想 = want to; 去 = go to. A place name follows 去 directly, without a measure word.');
 if(kind==='actions')return sentence(id,words,['我','想',word.text],'Wǒ xiǎng '+word.pinyin+'.','I want to '+word.meaning.split(';')[0].replace('your ','my ')+'.','我 = I; 想 = want to. Put the action after 想. These expressions describe actions, so do not put a noun measure word before them. '+word.note);
 const number=['','一','兩','三'][count],pronunciation=count===1?word.countedPinyin:['','','liǎng','sān'][count]+' '+word.measurePinyin+' '+word.pinyin;
 const portions:Record<string,[string,string]>={
 'veg-cabbage':['head of cabbage','heads of cabbage'],'veg-bokchoy':['bok choy plant','bok choy plants'],'veg-spinach':['bunch of spinach','bunches of spinach'],'veg-water-spinach':['bunch of water spinach','bunches of water spinach'],'veg-cauliflower':['head of cauliflower','heads of cauliflower'],'veg-broccoli':['head of broccoli','heads of broccoli'],'veg-carrot':['carrot','carrots'],'veg-daikon':['daikon radish','daikon radishes'],'veg-potato':['potato','potatoes'],'veg-sweet-potato':['sweet potato','sweet potatoes'],'veg-onion':['onion','onions'],'veg-corn':['ear of corn','ears of corn'],'veg-cucumber':['cucumber','cucumbers'],'veg-eggplant':['eggplant','eggplants'],'veg-tomato':['tomato','tomatoes'],'veg-pepper':['green bell pepper','green bell peppers'],'veg-pumpkin':['pumpkin','pumpkins'],'veg-mushroom':['mushroom','mushrooms'],'veg-garlic':['garlic bulb','garlic bulbs'],'veg-ginger':['piece of ginger','pieces of ginger'],
 };
 return sentence(id,words,['我','想','買',number,word.measure,word.text],'Wǒ xiǎng mǎi '+pronunciation+'.','I want to buy '+['','one','two','three'][count]+' '+portions[word.id][count===1?0:1]+'.','我 = I; 想 = want to; 買 = buy. Number → measure word → vegetable. Use 兩 before a measure word for two. '+word.note);
}
function worksheet(kind:Kind,word:ExtraWord,words:ExtraWord[],index:number):Lesson{
 const id='extra-'+kind+'-word-'+word.id,bank=bankFor(word,words);
 const chars=[...new Set([...glyphs(word.text),...(word.measure&&words.findIndex(w=>w.measure===word.measure)===index?glyphs(word.measure):[])])];
 const steps=[primer(id+'-study',bank),activity(id+'-picture','picture',word,bank),activity(id+'-word','word',word,bank),activity(id+'-listen-picture','listen-picture',word,bank),activity(id+'-meaning','meaning',word,bank),activity(id+'-text','text-word',word,bank),activity(id+'-listen-word','listen-word',word,bank),activity(id+'-character','character',word,bank,{extra:{mode:'character',wordId:word.id,wordIds:bank.map(w=>w.id),glyph:glyphs(word.text)[0]}}),...write(id+'-write',word,chars)];
 if(word.measure){
  const wrong=['件','雙','頂','副','串','根','條','把','棵','朵','塊','個','顆'].filter(m=>m!==word.measure&&!word.acceptedMeasures?.includes(m)).slice(0,3);
  steps.push(activity(id+'-measure','measure',word,[],{options:[word.measure,...wrong]}),activity(id+'-count','count',word,[],{extra:{mode:'count',wordId:word.id,count:index%3+1}}));
 }
 steps.push(...usefulSentence(id+'-sentence',kind,word,words,index%3+1),mixed(id+'-mixed',bank));
 return {id,unitId:'extra-'+kind,title:word.text+' · '+word.meaning,subtitle:'Pictures, listening, character recognition, required handwriting, and a useful sentence.',chars,minutes:'8–16 min',extraSection:'Word worksheets',steps};
}
function context(kind:Kind,key:string,title:string,words:ExtraWord[],steps:Step[],chars:string[]):Lesson{
 const id='extra-'+kind+'-'+key;
 return {id,unitId:'extra-'+kind,title,subtitle:'Study the examples, use the words, match, listen, and write.',chars,minutes:'8–15 min',extraSection:'Everyday use',steps:[primer(id+'-study',words),...steps]};
}
export function buildSupplementaryUnit(kind:Kind,words:ExtraWord[]):{unit:Unit;lessons:Lesson[]}{
 const meta=setting[kind],prefix='extra-'+kind,get=(id:string)=>words.find(w=>w.id===id)!,lessons=words.map((w,i)=>worksheet(kind,w,words,i));
 const add=(key:string,title:string,steps:Step[],chars:string[])=>lessons.push(context(kind,key,title,words,steps,chars));
 const s=(key:string,tokens:string[],pinyin:string,meaning:string,note:string)=>sentence(prefix+'-'+key,words,tokens,pinyin,meaning,note);
 const q=(key:string,word:ExtraWord,prompt:string,options:string[],answer:string,explanation:string,audio?:string)=>question(prefix+'-'+key,word,prompt,options,answer,explanation,audio);
 if(kind==='vegetables'){
  add('heads-roots','Whole plants, heads, and long roots',[
   ...s('head',['我','想','買','一','顆','高麗菜'],'Wǒ xiǎng mǎi yì kē gāolícài.','I want to buy one head of cabbage.','顆 counts the whole head here. 個 is also natural. 棵 counts a whole plant; 根 highlights a long root or ear of corn.'),
   ...s('plant',['我','有','兩','棵','青江菜'],'Wǒ yǒu liǎng kē qīngjiāngcài.','I have two bok choy plants.','棵 counts whole plants; 兩 counts two before a measure word.'),
   ...s('root',['我','想','買','三','根','紅蘿蔔'],'Wǒ xiǎng mǎi sān gēn hóngluóbo.','I want to buy three carrots.','根 is a natural choice for long roots. 蔔 is neutral tone in 蘿蔔.'),
   q('root-q',get('veg-carrot'),'Choose the amount: three carrots.',['三根紅蘿蔔','兩棵青江菜','一顆高麗菜'],'三根紅蘿蔔','三根紅蘿蔔 names three whole carrots.'),
   activity(prefix+'-head-match','measure-match',get('veg-cabbage'),[get('veg-cabbage'),get('veg-bokchoy'),get('veg-carrot')]),
   ...write(prefix+'-head-write',get('veg-cabbage'),['顆','棵','根']),
  ],['顆','棵','根']);
  add('bunches-pieces','A bunch, a mushroom, or a piece',[
   ...s('bunch',['我','想','買','一','把','菠菜'],'Wǒ xiǎng mǎi yì bǎ bōcài.','I want to buy one bunch of spinach.','把 counts a handful or bunch. It does not tell you how many leaves are in that bunch.'),
   ...s('mushroom',['我','有','兩','朵','蘑菇'],'Wǒ yǒu liǎng duǒ mógu.','I have two mushrooms.','朵 is natural for whole mushrooms; 個 is also used.'),
   ...s('piece',['我','想','買','一','塊','薑'],'Wǒ xiǎng mǎi yí kuài jiāng.','I want to buy one piece of ginger.','塊 counts the irregular piece, rather than individual slices.'),
   q('bunch-listen',get('veg-spinach'),'Choose the amount you hear.',['One bunch of spinach.','Two mushrooms.','One piece of ginger.'],'One bunch of spinach.','一把菠菜 names a bunch of spinach.','我想買一把菠菜。'),
   activity(prefix+'-bunch-match','measure-match',get('veg-spinach'),[get('veg-spinach'),get('veg-mushroom'),get('veg-ginger')]),
   ...write(prefix+'-bunch-write',get('veg-spinach'),['把','朵','塊']),
  ],['把','朵','塊']);
  add('kitchen','What you like to eat',[
   ...s('eat',['我','喜歡','吃','青花菜'],'Wǒ xǐhuān chī qīnghuācài.','I like eating broccoli.','喜歡 + 吃 + vegetable means like eating it. 花椰菜 here is white cauliflower; 青花菜 is green broccoli.'),
   ...s('not-eat',['我','不','喜歡','吃','青椒'],'Wǒ bù xǐhuān chī qīngjiāo.','I do not like eating green bell pepper.','不 before 喜歡 makes the preference negative.'),
   q('kitchen-q',get('veg-broccoli'),'Choose the Chinese word for broccoli.',['青花菜','花椰菜','青椒'],'青花菜','青花菜 is broccoli; 花椰菜 in this collection is cauliflower.'),
   q('potato-q',get('veg-potato'),'Choose the word for potato, rather than sweet potato.',['馬鈴薯','地瓜','南瓜'],'馬鈴薯','馬鈴薯 is potato; 地瓜 is sweet potato; 南瓜 is pumpkin.'),
   ...write(prefix+'-kitchen-write',get('veg-potato'),['薯']),mixed(prefix+'-kitchen-mixed',[get('veg-potato'),get('veg-carrot'),get('veg-tomato'),get('veg-pepper')]),
  ],['薯']);
  add('market','A simple market order',[
   ...s('order',['我','想','買','兩','條','小黃瓜'],'Wǒ xiǎng mǎi liǎng tiáo xiǎohuángguā.','I want to buy two cucumbers.','想 + 買 expresses wanting to buy. 兩條 counts two long whole cucumbers.'),
   ...s('weight',['我','想','買','一','公斤','番茄'],'Wǒ xiǎng mǎi yì gōngjīn fānqié.','I want to buy one kilogram of tomatoes.','公斤 is kilogram, 1,000 g. A weight phrase replaces the individual-item counting phrase; it does not specify the number of tomatoes.'),
   q('weight-q',get('veg-tomato'),'Which phrase states weight?',['一公斤番茄','一顆番茄','兩個番茄'],'一公斤番茄','公斤 gives weight; 顆 and 個 count individual tomatoes.'),
   ...write(prefix+'-market-write',get('veg-tomato'),['公','斤']),mixed(prefix+'-market-mixed',[get('veg-onion'),get('veg-corn'),get('veg-spinach'),get('veg-ginger')]),
  ],['公','斤']);
 }else if(kind==='countries'){
  add('destinations','Where you want to go',[
   ...s('japan',['我','想','去','日本'],'Wǒ xiǎng qù Rìběn.','I want to go to Japan.','想 + 去 + place describes where you want to go. Do not insert 個 before a specific place name.'),
   ...s('turkey',['我','想','去','土耳其'],'Wǒ xiǎng qù Tǔěrqí.','I want to go to Türkiye.','Keep 土耳其 together as one place name.'),
   q('destination-listen',get('country-turkey'),'Where does the speaker want to go?',['Türkiye','Japan','Italy'],'Türkiye','The place name after 去 is 土耳其.','我想去土耳其。'),
   ...write(prefix+'-destination-write',get('country-turkey'),['去']),mixed(prefix+'-destination-mixed',[get('country-japan'),get('country-turkey'),get('country-canada'),get('country-italy')]),
  ],['去']);
  add('nationality','A place name and a person',[
   ...s('nationality-japan',['我','是','日本','人'],'Wǒ shì Rìběn rén.','I am Japanese.','Place name + 人 describes a person from that place; 是 links the person to this noun phrase. 日本 is the place; 日本人 is a Japanese person.'),
   ...s('nationality-usa',['我','是','美國','人'],'Wǒ shì Měiguó rén.','I am American.','美國人 names a person, not a language. Do not assume place name + 語 always gives the ordinary language name.'),
   q('person-q',get('country-japan'),'Which phrase names a Japanese person?',['日本人','日本','美國'],'日本人','人 adds the person meaning to 日本.'),
   ...write(prefix+'-nationality-write',get('country-japan'),['人']),mixed(prefix+'-nationality-mixed',[get('country-usa'),get('country-france'),get('country-korea'),get('country-greece')]),
  ],['人']);
  add('taiwan-names','Names you will see in Taiwan',[
   ...s('italy',['我','想','去','義大利'],'Wǒ xiǎng qù Yìdàlì.','I want to go to Italy.','In Taiwan, use 義大利 for Italy, 紐西蘭 for New Zealand, and commonly 澳洲 for Australia.'),
   ...s('australia',['我','想','去','澳洲'],'Wǒ xiǎng qù Àozhōu.','I want to go to Australia.','澳洲 here means Australia. It does not refer to every country in Oceania.'),
   q('uk-q',get('country-uk'),'In everyday Taiwan usage, 英國 commonly names which country?',['United Kingdom','Germany','France'],'United Kingdom','England specifically is 英格蘭; 英國 commonly names the United Kingdom.'),
   q('nz-q',get('country-new-zealand'),'Choose the standard Taiwan name for New Zealand.',['紐西蘭','新加坡','馬來西亞'],'紐西蘭','紐西蘭 is New Zealand; 新加坡 is Singapore; 馬來西亞 is Malaysia.'),
   ...write(prefix+'-names-write',get('country-italy'),['義']),mixed(prefix+'-names-mixed',[get('country-australia'),get('country-new-zealand'),get('country-singapore'),get('country-malaysia')]),
  ],['義']);
  add('country-count','Counting countries, naming places',[
   ...s('one-country',['這','是','一','個','國家'],'Zhè shì yí ge guójiā.','This is a country.','國家 is the general noun country. You can count it: 一個國家. A specific place name follows 去 directly: 去法國.'),
   ...s('france',['我','想','去','法國'],'Wǒ xiǎng qù Fǎguó.','I want to go to France.','Use 去 + 法國 when naming the destination. The country name does not need 個.'),
   q('country-count-q',get('country-france'),'Choose the phrase for one country.',['一個國家','一國法國','一個去'],'一個國家','Count the general noun 國家 with 個.'),
   ...write(prefix+'-country-count-write',get('country-france'),['國','家','個']),mixed(prefix+'-count-mixed',[get('country-china'),get('country-india'),get('country-thailand'),get('country-vietnam')]),
  ],['國','家','個']);
 }else{
  add('want-like','Want to do it; like doing it',[
   ...s('want-sleep',['我','想','睡覺'],'Wǒ xiǎng shuìjiào.','I want to sleep.','想 + action means want to do that action. Do not put a measure word before 睡覺.'),
   ...s('like-swim',['我','喜歡','游泳'],'Wǒ xǐhuān yóuyǒng.','I like swimming.','喜歡 can be followed directly by an action expression.'),
   ...s('not-like-run',['我','不','喜歡','跑步'],'Wǒ bù xǐhuān pǎobù.','I do not like running.','不 before 喜歡 makes the preference negative.'),
   q('want-listen',get('action-sleep'),'Choose the meaning you hear.',['I want to sleep.','I like swimming.','I do not like running.'],'I want to sleep.','想睡覺 means want to sleep.','我想睡覺。'),
   ...write(prefix+'-want-write',get('action-sleep'),['睡','覺']),mixed(prefix+'-want-mixed',[get('action-sleep'),get('action-swim'),get('action-run'),get('action-dance')]),
  ],['睡','覺']);
  add('right-now','What you are doing now',[
   ...s('now-walk',['我','現在','在','走路'],'Wǒ xiànzài zài zǒulù.','I am walking now.','現在 means now. 在 before an action marks that the action is in progress; here it is not followed by a location.'),
   ...s('now-read',['我','現在','在','看書'],'Wǒ xiànzài zài kànshū.','I am reading a book now.','Subject + 現在 + 在 + action describes what is happening now. Keep 看書 as the action.'),
   q('now-listen',get('action-read'),'What is the speaker doing now?',['Reading a book.','Walking.','Writing characters.'],'Reading a book.','在看書 describes reading in progress.','我現在在看書。'),
   ...write(prefix+'-now-write',get('action-read'),['現','在']),mixed(prefix+'-now-mixed',[get('action-walk'),get('action-read'),get('action-write'),get('action-listen')]),
  ],['現','在']);
  add('daily-sequence','First one action, then another',[
   ...s('wash-eat',['我','先','洗手','再','吃飯'],'Wǒ xiān xǐshǒu zài chīfàn.','I wash my hands first, then eat a meal.','先 marks the first action; 再 marks the action that follows. Keep the subject once, then put the actions in order.'),
   ...s('getup-brush',['我','先','起床','再','刷牙'],'Wǒ xiān qǐchuáng zài shuāyá.','I get out of bed first, then brush my teeth.','先 + action one + 再 + action two gives the sequence. 再 is then here, rather than 在, the action-in-progress marker.'),
   q('sequence-listen',get('action-wash-hands'),'Which action comes first?',['Washing hands.','Eating a meal.','Brushing teeth.'],'Washing hands.','先洗手 places washing hands first.','我先洗手再吃飯。'),
   ...write(prefix+'-sequence-write',get('action-wash-hands'),['先','再']),mixed(prefix+'-sequence-mixed',[get('action-wash-hands'),get('action-eat'),get('action-get-up'),get('action-brush-teeth')]),
  ],['先','再']);
  add('action-contrasts','Choose the precise action',[
   ...s('cycle',['我','想','騎腳踏車'],'Wǒ xiǎng qí jiǎotàchē.','I want to ride a bicycle.','騎 is used for riding a bicycle; 開車 means drive a car.'),
   ...s('cook',['我','想','做飯'],'Wǒ xiǎng zuòfàn.','I want to cook a meal.','做飯 means cook or prepare the meal; 吃飯 means eat it. 休息 means rest and does not necessarily mean sleep.'),
   q('cycle-q',get('action-cycle'),'Choose the action for riding a bicycle.',['騎腳踏車','開車','走路'],'騎腳踏車','Use 騎腳踏車 for riding a bicycle.'),
   q('cook-q',get('action-cook'),'Choose the action for cooking a meal.',['做飯','吃飯','喝水'],'做飯','做飯 is prepare the meal; 吃飯 is eat a meal; 喝水 is drink water.'),
   q('music-q',get('action-listen'),'Which reading belongs to 樂 in 音樂?',['yuè','lè','yào'],'yuè','The 音樂 card teaches yīnyuè: music. 樂 is yuè here.'),
   ...write(prefix+'-contrasts-write',get('action-cycle'),['騎']),mixed(prefix+'-contrasts-mixed',[get('action-cycle'),get('action-drive'),get('action-cook'),get('action-rest')]),
  ],['騎']);
 }
 const reviewId=prefix+'-full-review',review:Step[]=[primer(reviewId+'-study',words)];
 words.forEach((word,i)=>review.push(activity(reviewId+'-recognize-'+word.id,i%2?'word':'picture',word,bankFor(word,words)),activity(reviewId+'-listen-'+word.id,'listen-word',word,bankFor(word,words)),...write(reviewId+'-memory-'+word.id,word,[glyphs(word.text)[0]]).filter(s=>s.extra!.writeMode==='memory')));
 review.push(mixed(reviewId+'-mixed',bankFor(words[0],words)),...usefulSentence(reviewId+'-sentence',kind,words[0],words));
 lessons.push({id:reviewId,unitId:prefix,title:'Full collection review',subtitle:'Retrieve every word, listen, write from memory, and build a sentence.',chars:[],review:true,minutes:'20–30 min',extraSection:'Full collection review',steps:review});
 const chars=[...new Set([...words.flatMap(w=>glyphs(w.text+w.measure)),...lessons.flatMap(l=>l.steps.filter(s=>s.extra!.mode==='writing').map(s=>s.extra!.glyph!))])];
 const unit:Unit={id:prefix,number:meta.number,theme:meta.theme,label:meta.label,title:meta.title,description:'A complete optional workbook: '+words.length+' words, '+lessons.length+' lessons, visual recognition, listening, mandatory handwriting, and useful sentences. Always available; completed lessons count toward your streak and extra progress.',chars,lessonIds:lessons.map(l=>l.id),banner:{text:meta.text,pinyin:meta.pinyin},goal:{text:meta.text,pinyin:meta.pinyin,meaning:meta.goal},grammarIds:[]};
 return {unit,lessons};
}
