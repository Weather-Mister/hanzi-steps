import type {UnitData, Character, Step} from '../schema.ts';

const makeCharacter = (
  hanzi:string, pinyin:string, zhuyin:string, meaning:string, strokes:number,
  memory:string, example:Character['example']
):Character => ({
  hanzi,pinyin,zhuyin,meaning,strokes,
  note:`${hanzi} is taught here as a first-time character inside this unit's Lesson 8 vocabulary.`,
  memory,
  parts:[{
    label:hanzi,
    name:`${hanzi} whole-character stroke sequence`,
    role:'Handwriting structure',
    description:`Practice all ${strokes} strokes of ${hanzi} in the displayed Taiwan Traditional stroke order before writing it from memory.`,
    strokes:Array.from({length:strokes},(_,i)=>i)
  }],
  layout:'whole',
  example
});

const characters:Record<string,Character> = {
  '同': makeCharacter('同','tóng','ㄊㄨㄥˊ','same; together',6,'The outer frame surrounds 一 and 口; keep the box balanced around the center.',{text:'同學',pinyin:'tóngxué',meaning:'classmate'}),
  '參': makeCharacter('參','cān','ㄘㄢ','participate; visit in 參觀',11,'Three 厶-like marks sit above the 人/彡 lower structure; keep the lower strokes open and descending.',{text:'參觀',pinyin:'cānguān',meaning:'visit'}),
  '觀': makeCharacter('觀','guān','ㄍㄨㄢ','observe; view',25,'The dense left phonetic area balances 見 on the right; leave enough width for the final 見 component.',{text:'參觀',pinyin:'cānguān',meaning:'visit'}),
  '騎': makeCharacter('騎','qí','ㄑㄧˊ','ride',18,'馬 fills the left side and 奇 fills the right; keep both halves narrow enough to fit together.',{text:'騎機車',pinyin:'qí jīchē',meaning:'ride a scooter'}),
  '機': makeCharacter('機','jī','ㄐㄧ','machine; vehicle in 機車',16,'木 anchors the left while the 幾-shaped right side is denser; keep the left 木 compact.',{text:'機車',pinyin:'jīchē',meaning:'scooter'}),
  '載': makeCharacter('載','zài','ㄗㄞˋ','carry; give a ride',13,'The 車 element sits inside the larger 戈-like structure; keep the central 車 readable before the sweeping final strokes.',{text:'載我',pinyin:'zài wǒ',meaning:'give me a ride'}),
  '捷': makeCharacter('捷','jié','ㄐㄧㄝˊ','quick; first character of 捷運',11,'扌 is the narrow left component; the right side carries most of the character’s width.',{text:'捷運',pinyin:'jiéyùn',meaning:'MRT'}),
  '公': makeCharacter('公','gōng','ㄍㄨㄥ','public',4,'The two upper strokes spread like 八 above 厶; center the lower turn beneath them.',{text:'公車',pinyin:'gōngchē',meaning:'bus'}),
  '計': makeCharacter('計','jì','ㄐㄧˋ','calculate; first character of 計程車',9,'言 forms the left side and 十 the right; keep the left speech component compact and even.',{text:'計程車',pinyin:'jìchéngchē',meaning:'taxi'}),
  '程': makeCharacter('程','chéng','ㄔㄥˊ','route; journey; measure',12,'禾 is on the left and 呈 on the right; align the lower strokes so the character does not lean.',{text:'計程車',pinyin:'jìchéngchē',meaning:'taxi'}),
  '差': makeCharacter('差','chà','ㄔㄚˋ','differ; short of',10,'The upper 羊-like strokes lead into 工 below; keep the lower 工 centered under the slanting middle stroke.',{text:'差不多',pinyin:'chàbuduō',meaning:'about the same'}),
};

const charSteps=(lessonId:string, chars:string[]):Step[] =>
  chars.flatMap(char=>[
    {id:`${lessonId}-${char}-intro`,type:'intro',char},
    {id:`${lessonId}-${char}-trace`,type:'trace',char},
    {id:`${lessonId}-${char}-build`,type:'build',char},
    {id:`${lessonId}-${char}-complete`,type:'complete',char},
    {id:`${lessonId}-${char}-memory`,type:'memory',char},
  ]);

const unit:UnitData = {
  schemaVersion:1,
  bookId:'book-1',
  order:25,
  unit:{
    id:'unit-25',number:25,theme:'cyan',
    label:'Getting around & explicit comparison',
    title:'Which Way Is Faster?',
    description:'10 new Lesson 8 words and forms. Get around with Taiwan transport vocabulary and compare two choices explicitly with 比.',
    chars:['同','參','觀','騎','機','載','捷','公','計','程','差'],
    lessonIds:['u25-transport','u25-rides','u25-visit','u25-compare','u25-negative','u25-choices','u25-review'],
    banner:{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.'},
    goal:{text:'騎機車比坐公車快嗎？',pinyin:'Qí jīchē bǐ zuò gōngchē kuài ma?',meaning:'Is riding a scooter faster than taking the bus?'},
    grammarIds:['u25-bi-comparison','u25-bi-negation','u25-bi-degree'],
    bookReference:'A Course in Contemporary Chinese 1 · Lesson 8, Vocabulary II and Grammar V, pp. 163–171. This unit teaches a coherent transport/visit subset plus explicit 比; 古代 and 不行 remain for the following source-continuation unit.'
  },
  reviewLessonId:'u25-review',
  lessons:[
    {id:'u25-transport',title:'Classmates and City Transport',subtitle:'Learn classmate, MRT, and the everyday Taiwan word 公車.',chars:['同','捷','公'],minutes:'12–15 min',unitId:'unit-25',review:false,steps:[
      ...charSteps('u25-transport',['同','捷','公']),
      {id:'u25-transport-01',type:'phrase',phrase:'u25-mrt-school'},
      {id:'u25-transport-02',type:'order',phrase:'u25-mrt-school',tokens:['我','坐捷運','去學校']},
      {id:'u25-transport-03',type:'phrase',phrase:'u25-classmate-bus'},
      {id:'u25-transport-04',type:'select',prompt:'Which word is the usual Taiwan Mandarin short form for “bus”?',options:['公車','火車','機車'],answer:'公車',explanation:'公車 is the common short form of 公共汽車 in Taiwan.'},
      {id:'u25-transport-05',type:'select',prompt:'Which word means “classmate”?',options:['同學','朋友','老師'],answer:'同學',explanation:'同學 means classmate; 學 is already familiar from 學生 and 學校.'}
    ]},
    {id:'u25-rides',title:'Ride or Take a Taxi',subtitle:'Talk about scooters, giving someone a ride, and taxis.',chars:['騎','機','載','計','程'],minutes:'14–17 min',unitId:'unit-25',review:false,steps:[
      ...charSteps('u25-rides',['騎','機','載','計','程']),
      {id:'u25-rides-01',type:'phrase',phrase:'u25-classmate-ride'},
      {id:'u25-rides-02',type:'order',phrase:'u25-classmate-ride',tokens:['我同學','騎機車','載我']},
      {id:'u25-rides-03',type:'phrase',phrase:'u25-taxi'},
      {id:'u25-rides-04',type:'select',prompt:'Your classmate takes you somewhere on a scooter. Which verb describes giving you the ride?',options:['載','騎','坐'],answer:'載',explanation:'載 means to carry someone or give someone a ride in or on a vehicle.'},
      {id:'u25-rides-05',type:'select',prompt:'Which word is Taiwan Mandarin for “taxi”?',options:['計程車','捷運','火車'],answer:'計程車',explanation:'計程車 is the standard Taiwan Mandarin word for taxi.'}
    ]},
    {id:'u25-visit',title:'Visit the Palace Museum',subtitle:'Use 參觀 for visiting an institution and 差不多 for a small difference.',chars:['參','觀','差'],minutes:'11–14 min',unitId:'unit-25',review:false,steps:[
      ...charSteps('u25-visit',['參','觀','差']),
      {id:'u25-visit-01',type:'phrase',phrase:'u25-visit-palace'},
      {id:'u25-visit-02',type:'order',phrase:'u25-visit-palace',tokens:['我','跟同學','去參觀故宮']},
      {id:'u25-visit-03',type:'phrase',phrase:'u25-about-same'},
      {id:'u25-visit-04',type:'select',prompt:'Two travel times are roughly the same. Which expression fits?',options:['差不多','比較快','非常慢'],answer:'差不多',explanation:'差不多 means “about the same” here: the difference is small.'},
      {id:'u25-visit-05',type:'select',prompt:'Which verb fits visiting an institution such as the National Palace Museum?',options:['參觀','載','騎'],answer:'參觀',explanation:'參觀 is used for visiting an institution or site.'}
    ]},
    {id:'u25-compare',title:'Compare Two Things',subtitle:'Name both sides explicitly with 比.',chars:[],minutes:'9–11 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-compare-01',type:'grammar',grammar:'u25-bi-comparison'},
      {id:'u25-compare-02',type:'phrase',phrase:'u25-mrt-faster'},
      {id:'u25-compare-03',type:'order',phrase:'u25-mrt-faster',tokens:['坐捷運','比','坐火車','快']},
      {id:'u25-compare-04',type:'select',prompt:'Which sentence explicitly says taking the MRT is faster than taking the train?',options:['坐捷運比坐火車快。','坐捷運比較快。','坐捷運又快又舒服。'],answer:'坐捷運比坐火車快。',explanation:'A 比 B + property explicitly names both items being compared.',grammarIds:['u25-bi-comparison']},
      {id:'u25-compare-05',type:'select',prompt:'In A 比 B 快, which item is described as faster?',options:['A','B','both equally'],answer:'A',explanation:'The property after B describes A relative to B.',grammarIds:['u25-bi-comparison']}
    ]},
    {id:'u25-negative',title:'Not Faster Than',subtitle:'Negate the comparison and avoid a common degree-adverb error.',chars:[],minutes:'9–11 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-negative-01',type:'grammar',grammar:'u25-bi-negation'},
      {id:'u25-negative-02',type:'phrase',phrase:'u25-bus-not-faster'},
      {id:'u25-negative-03',type:'order',phrase:'u25-bus-not-faster',tokens:['坐公車','不比','坐計程車','快']},
      {id:'u25-negative-04',type:'select',prompt:'Which sentence means “Taking the bus is not faster than taking a taxi”?',options:['坐公車不比坐計程車快。','坐公車比不坐計程車快。'],answer:'坐公車不比坐計程車快。',explanation:'不 goes before 比 to negate the comparison.',grammarIds:['u25-bi-negation']},
      {id:'u25-negative-05',type:'grammar',grammar:'u25-bi-degree'},
      {id:'u25-negative-06',type:'select',prompt:'Which basic 比 sentence follows the textbook pattern?',options:['坐捷運比坐火車快。','坐捷運比坐火車很快。'],answer:'坐捷運比坐火車快。',explanation:'In the basic 比 pattern, degree adverbs such as 很 and 非常 do not appear before the property.',grammarIds:['u25-bi-degree']}
    ]},
    {id:'u25-choices',title:'Choose a Ride',subtitle:'Contrast implicit 比較 with explicit 比 and recycle 又…又….',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-choices-01',type:'phrase',phrase:'u25-scooter-question'},
      {id:'u25-choices-02',type:'order',phrase:'u25-scooter-question',tokens:['騎機車','比','坐公車','快嗎']},
      {id:'u25-choices-03',type:'select',prompt:'The comparison target is already understood. Which says “The MRT is relatively faster”?',options:['坐捷運比較快。','坐捷運比快。'],answer:'坐捷運比較快。',explanation:'比較 can leave the comparison target implicit; 比 needs an explicit B.',grammarIds:['u24-bijiao','u25-bi-comparison']},
      {id:'u25-choices-04',type:'select',prompt:'Which sentence gives two qualities of High Speed Rail?',options:['坐高鐵又快又舒服。','坐高鐵比快舒服。'],answer:'坐高鐵又快又舒服。',explanation:'又…又… joins two qualities of the same subject.',grammarIds:['u24-you-you']},
      {id:'u25-choices-05',type:'phrase',phrase:'u25-same-time'}
    ]},
    {id:'u25-review',title:'Unit 25 Review',subtitle:'Transport vocabulary, visiting, and explicit comparison.',chars:['同','參','觀','騎','機','載','捷','公','計','程','差'],minutes:'11–14 min',unitId:'unit-25',review:true,steps:[
      {id:'u25-review-01',type:'match',chars:['同','參','觀','騎','機','載']},
      {id:'u25-review-02',type:'match',chars:['捷','公','計','程','差']},
      {id:'u25-review-03',type:'select',prompt:'Which sentence explicitly compares two transportation choices?',options:['坐捷運比坐火車快。','坐捷運比較快。','坐捷運又快又舒服。'],answer:'坐捷運比坐火車快。',explanation:'比 explicitly names A and B.',grammarIds:['u25-bi-comparison']},
      {id:'u25-review-04',type:'select',prompt:'Which expression means “about the same”?',options:['差不多','參觀','計程車'],answer:'差不多',explanation:'差不多 means about the same.'},
      {id:'u25-review-05',type:'order',phrase:'u25-scooter-question',tokens:['快嗎','坐公車','比','騎機車']},
      {id:'u25-review-06',type:'select',prompt:'Which sentence correctly negates an explicit comparison?',options:['坐公車不比坐計程車快。','坐公車比坐計程車不快。'],answer:'坐公車不比坐計程車快。',explanation:'In this pattern, 不 precedes 比.',grammarIds:['u25-bi-negation']},
      {id:'u25-review-07',type:'memory',char:'觀'},
      {id:'u25-review-08',type:'build',char:'騎'},
      {id:'u25-review-09',type:'memory',char:'程'}
    ]}
  ],
  newVocabulary:[
    {text:'同學',pinyin:'tóngxué',meaning:'classmate',lessonId:'u25-transport',core:true},
    {text:'參觀',pinyin:'cānguān',meaning:'to visit (an institution or site)',lessonId:'u25-visit',core:true},
    {text:'騎',pinyin:'qí',meaning:'to ride',lessonId:'u25-rides',core:true},
    {text:'機車',pinyin:'jīchē',meaning:'scooter; motorcycle',lessonId:'u25-rides',core:true,note:'In Taiwan, 機車 commonly refers to a motor scooter or motorcycle.'},
    {text:'載',pinyin:'zài',meaning:'to carry; give someone a ride in/on a vehicle',lessonId:'u25-rides',core:true},
    {text:'捷運',pinyin:'jiéyùn',meaning:'MRT; metro',lessonId:'u25-transport',core:true,note:'Standard Taiwan Mandarin for a Mass Rapid Transit system.'},
    {text:'比',pinyin:'bǐ',meaning:'than; compared with',lessonId:'u25-compare',core:true},
    {text:'公車',pinyin:'gōngchē',meaning:'bus',lessonId:'u25-transport',core:true,note:'Common Taiwan short form of 公共汽車.'},
    {text:'計程車',pinyin:'jìchéngchē',meaning:'taxi',lessonId:'u25-rides',core:true,note:'Standard Taiwan Mandarin for taxi.'},
    {text:'差不多',pinyin:'chàbuduō',meaning:'about the same; almost',lessonId:'u25-visit',core:true}
  ],
  reviewVocabulary:['坐','火車','跟','玩','怎麼','慢','比較','快','車票','又…又…','舒服','高鐵','學校','朋友','週末','去','可以','很','貴'],
  newCharacters:['同','參','觀','騎','機','載','捷','公','計','程','差'],
  reviewCharacters:[],
  characters,
  grammarRules:{
    'u25-bi-comparison':{id:'u25-bi-comparison',title:'Explicit comparison with 比',pattern:'A + 比 + B + state verb / property',explanation:'Use 比 when you name both things being compared. A is described relative to B.',examples:[{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.'},{text:'我們學校比他們學校遠。',pinyin:'Wǒmen xuéxiào bǐ tāmen xuéxiào yuǎn.',meaning:'Our school is farther away than their school.'}],remember:'比較 can leave the comparison target understood; 比 explicitly names A and B.'},
    'u25-bi-negation':{id:'u25-bi-negation',title:'Negating a 比 comparison',pattern:'A + 不比 / 不是比 + B + property',explanation:'The textbook allows either 不比 or 不是比 to negate an explicit comparison. 不比 says A is not more X than B; 不是比 explicitly rejects the proposed comparison.',examples:[{text:'坐公車不比坐計程車快。',pinyin:'Zuò gōngchē bù bǐ zuò jìchéngchē kuài.',meaning:'Taking the bus is not faster than taking a taxi.'},{text:'坐公車不是比坐計程車快。',pinyin:'Zuò gōngchē bú shì bǐ zuò jìchéngchē kuài.',meaning:'It is not the case that taking the bus is faster than taking a taxi.'}],remember:'Put the negative before 比, not after the comparison target.'},
    'u25-bi-degree':{id:'u25-bi-degree',title:'No 很 inside the basic 比 frame',pattern:'A + 比 + B + property',explanation:'In the basic 比 pattern taught here, degree adverbs such as 很, 真, and 非常 do not appear before the final state verb/property.',examples:[{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.'}],remember:'Say A 比 B 快, not A 比 B 很快.'}
  },
  grammarIntroductions:[
    {id:'u25-bi-comparison',kind:'rule',ref:'u25-bi-comparison',lessonId:'u25-compare',stepId:'u25-compare-01'},
    {id:'u25-bi-negation',kind:'rule',ref:'u25-bi-negation',lessonId:'u25-negative',stepId:'u25-negative-01'},
    {id:'u25-bi-degree',kind:'rule',ref:'u25-bi-degree',lessonId:'u25-negative',stepId:'u25-negative-05'}
  ],
  reviewGrammar:['u24-bijiao','u24-you-you','u24-zuo-transport','u24-gen-company','u24-how-zenme'],
  phrases:{
    'u25-mrt-school':{text:'我坐捷運去學校。',pinyin:'Wǒ zuò jiéyùn qù xuéxiào.',meaning:'I take the MRT to school.',note:'坐 + vehicle + 去 + destination.',tokens:['我','坐捷運','去學校'],grammarIds:['u24-zuo-transport']},
    'u25-classmate-bus':{text:'我跟同學坐公車。',pinyin:'Wǒ gēn tóngxué zuò gōngchē.',meaning:'I take the bus with my classmate.',note:'跟 introduces the companion before the main verb phrase.',tokens:['我','跟同學','坐公車'],grammarIds:['u24-gen-company','u24-zuo-transport']},
    'u25-classmate-ride':{text:'我同學騎機車載我。',pinyin:'Wǒ tóngxué qí jīchē zài wǒ.',meaning:'My classmate gives me a ride on a scooter.',note:'This follows the Lesson 8 dialogue: 騎 names riding the scooter; 載 names carrying/giving someone a ride.',tokens:['我同學','騎機車','載我']},
    'u25-taxi':{text:'我想坐計程車去。',pinyin:'Wǒ xiǎng zuò jìchéngchē qù.',meaning:'I want to take a taxi there.',note:'計程車 is Taiwan Mandarin for taxi.',tokens:['我想','坐計程車','去'],grammarIds:['u24-zuo-transport']},
    'u25-visit-palace':{text:'我跟同學去參觀故宮。',pinyin:'Wǒ gēn tóngxué qù cānguān Gùgōng.',meaning:'I am going with my classmate to visit the National Palace Museum.',note:'參觀 is used for visiting an institution or site.',tokens:['我','跟同學','去參觀故宮'],grammarIds:['u24-gen-company']},
    'u25-about-same':{text:'騎機車跟坐公車差不多。',pinyin:'Qí jīchē gēn zuò gōngchē chàbuduō.',meaning:'Riding a scooter and taking the bus are about the same.',note:'差不多 says the difference is small; the textbook dialogue uses it as the answer to a transport comparison.',tokens:['騎機車','跟','坐公車','差不多']},
    'u25-mrt-faster':{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.',note:'A 比 B + property explicitly compares A with B.',tokens:['坐捷運','比','坐火車','快'],grammarIds:['u25-bi-comparison']},
    'u25-bus-not-faster':{text:'坐公車不比坐計程車快。',pinyin:'Zuò gōngchē bù bǐ zuò jìchéngchē kuài.',meaning:'Taking the bus is not faster than taking a taxi.',note:'不 comes before 比.',tokens:['坐公車','不比','坐計程車','快'],grammarIds:['u25-bi-negation']},
    'u25-scooter-question':{text:'騎機車比坐公車快嗎？',pinyin:'Qí jīchē bǐ zuò gōngchē kuài ma?',meaning:'Is riding a scooter faster than taking the bus?',note:'This mirrors the Lesson 8 dialogue comparison.',tokens:['騎機車','比','坐公車','快嗎'],grammarIds:['u25-bi-comparison']},
    'u25-same-time':{text:'騎機車跟坐公車差不多。',pinyin:'Qí jīchē gēn zuò gōngchē chàbuduō.',meaning:'Riding a scooter and taking the bus are about the same.',note:'A natural answer when the two travel times are close.',tokens:['騎機車','跟','坐公車','差不多']}
  },
  revisionStepIds:['u25-choices-03','u25-choices-04','u25-review-03','u25-review-05','u25-review-06']
};

export default unit;
