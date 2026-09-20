import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  schemaVersion: 1,
  bookId: 'book-1',
  order: 25,
  unit: {
    id: 'unit-25', number: 25, theme: 'cyan',
    label: 'Transportation details & explicit comparison',
    title: 'Which Way Is Faster?',
    description: '12 new words and forms. Finish Lesson 8 transportation vocabulary and learn explicit comparison with 比.',
    chars: [],
    lessonIds: ['u25-transport','u25-rides','u25-places','u25-compare','u25-negative','u25-choices','u25-review'],
    banner: {text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.'},
    goal: {text:'騎機車比坐公車快嗎？',pinyin:'Qí jīchē bǐ zuò gōngchē kuài ma?',meaning:'Is riding a scooter faster than taking the bus?'},
    grammarIds: ['u25-bi-comparison','u25-bi-negation','u25-bi-degree'],
    bookReference: 'A Course in Contemporary Chinese 1 · Lesson 8, pp. 163–177. Remaining transportation/dialogue vocabulary and grammar V 比; original Hanzi Steps examples and exercises.'
  },
  reviewLessonId: 'u25-review',
  lessons: [
    {id:'u25-transport',title:'Around Town',subtitle:'Add the remaining everyday transportation from Lesson 8.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-transport-01',type:'phrase',phrase:'u25-bus-palace'},
      {id:'u25-transport-02',type:'order',phrase:'u25-bus-palace',tokens:['故宮','我','坐公車','去']},
      {id:'u25-transport-03',type:'phrase',phrase:'u25-mrt-school'},
      {id:'u25-transport-04',type:'order',phrase:'u25-mrt-school',tokens:['去學校','坐捷運','我']},
      {id:'u25-transport-05',type:'select',prompt:'Which word means “MRT”?',options:['捷運','公車','計程車'],answer:'捷運',explanation:'捷運 is the usual Taiwan Mandarin word for the MRT.'},
      {id:'u25-transport-06',type:'select',prompt:'Which short everyday word means “bus”?',options:['公車','機車','火車'],answer:'公車',explanation:'公車 is the common short form for 公共汽車.'}
    ]},
    {id:'u25-rides',title:'Ride or Take a Taxi',subtitle:'Talk about scooters, giving rides, and taxis.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-rides-01',type:'phrase',phrase:'u25-ride-scooter'},
      {id:'u25-rides-02',type:'order',phrase:'u25-ride-scooter',tokens:['機車','我','騎']},
      {id:'u25-rides-03',type:'phrase',phrase:'u25-give-ride'},
      {id:'u25-rides-04',type:'order',phrase:'u25-give-ride',tokens:['我','同學','載']},
      {id:'u25-rides-05',type:'phrase',phrase:'u25-taxi'},
      {id:'u25-rides-06',type:'select',prompt:'Your friend takes you somewhere on a scooter. Which verb describes giving you the ride?',options:['載','騎','坐'],answer:'載',explanation:'載 means to carry or give someone a ride in/on a vehicle.'}
    ]},
    {id:'u25-places',title:'Visit and Decide',subtitle:'Use the remaining Lesson 8 place and response vocabulary.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-places-01',type:'phrase',phrase:'u25-visit-palace'},
      {id:'u25-places-02',type:'order',phrase:'u25-visit-palace',tokens:['故宮','去','參觀','我']},
      {id:'u25-places-03',type:'phrase',phrase:'u25-no-good'},
      {id:'u25-places-04',type:'select',prompt:'A proposed route will not work. Which response fits?',options:['不行。','差不多。','很好。'],answer:'不行。',explanation:'不行 means that something will not do or is not workable.'},
      {id:'u25-places-05',type:'phrase',phrase:'u25-about-same'},
      {id:'u25-places-06',type:'select',prompt:'Two travel times are roughly the same. Which expression fits?',options:['差不多','非常快','比較慢'],answer:'差不多',explanation:'差不多 means about the same or almost the same.'}
    ]},
    {id:'u25-compare',title:'Compare Two Things',subtitle:'Name both sides explicitly with 比.',chars:[],minutes:'9–11 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-compare-01',type:'grammar',grammar:'u25-bi-comparison'},
      {id:'u25-compare-02',type:'phrase',phrase:'u25-mrt-faster'},
      {id:'u25-compare-03',type:'order',phrase:'u25-mrt-faster',tokens:['坐火車','坐捷運','快','比']},
      {id:'u25-compare-04',type:'select',prompt:'Which sentence explicitly says taking the MRT is faster than taking the train?',options:['坐捷運比坐火車快。','坐捷運比較快。','坐捷運又快又舒服。'],answer:'坐捷運比坐火車快。',explanation:'A 比 B + property names both items being compared.',grammarIds:['u25-bi-comparison']},
      {id:'u25-compare-05',type:'select',prompt:'In A 比 B 快, which item is described as faster?',options:['A','B','both equally'],answer:'A',explanation:'The property after B describes A relative to B.',grammarIds:['u25-bi-comparison']}
    ]},
    {id:'u25-negative',title:'Not Faster Than',subtitle:'Negate the comparison and avoid a common word-order error.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-negative-01',type:'grammar',grammar:'u25-bi-negation'},
      {id:'u25-negative-02',type:'phrase',phrase:'u25-bus-not-faster'},
      {id:'u25-negative-03',type:'order',phrase:'u25-bus-not-faster',tokens:['坐計程車','坐公車','不比','快']},
      {id:'u25-negative-04',type:'select',prompt:'Which sentence means “Taking the bus is not faster than taking a taxi”?',options:['坐公車不比坐計程車快。','坐公車比不坐計程車快。'],answer:'坐公車不比坐計程車快。',explanation:'不 goes before 比 to negate the comparison.',grammarIds:['u25-bi-negation']},
      {id:'u25-negative-05',type:'grammar',grammar:'u25-bi-degree'},
      {id:'u25-negative-06',type:'select',prompt:'Which basic 比 sentence follows the textbook pattern?',options:['坐捷運比坐火車快。','坐捷運比坐火車很快。'],answer:'坐捷運比坐火車快。',explanation:'In the basic 比 pattern, do not insert 很 or 非常 before the property.',grammarIds:['u25-bi-degree']}
    ]},
    {id:'u25-choices',title:'Choose a Ride',subtitle:'Combine transportation, 比較, 又…又…, and 比.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:false,steps:[
      {id:'u25-choices-01',type:'phrase',phrase:'u25-scooter-question'},
      {id:'u25-choices-02',type:'order',phrase:'u25-scooter-question',tokens:['坐公車','騎機車','快嗎','比']},
      {id:'u25-choices-03',type:'select',prompt:'The comparison is already understood and you only want to say “The MRT is relatively faster.” Which fits?',options:['坐捷運比較快。','坐捷運比快。'],answer:'坐捷運比較快。',explanation:'比較 makes an implicit comparison; 比 requires an explicit comparison target.',grammarIds:['u24-bijiao','u25-bi-comparison']},
      {id:'u25-choices-04',type:'select',prompt:'Which sentence gives two true qualities of the HSR?',options:['坐高鐵又快又舒服。','坐高鐵比快舒服。'],answer:'坐高鐵又快又舒服。',explanation:'又…又… joins two qualities of the same subject.',grammarIds:['u24-you-you']},
      {id:'u25-choices-05',type:'phrase',phrase:'u25-same-time'}
    ]},
    {id:'u25-review',title:'Unit Challenge',subtitle:'Choose a route and make explicit comparisons.',chars:[],minutes:'8–10 min',unitId:'unit-25',review:true,steps:[
      {id:'u25-review-01',type:'select',prompt:'Which sentence explicitly compares two transportation choices?',options:['坐捷運比坐火車快。','坐捷運比較快。','坐捷運又快又舒服。'],answer:'坐捷運比坐火車快。',explanation:'比 explicitly names A and B.',grammarIds:['u25-bi-comparison']},
      {id:'u25-review-02',type:'select',prompt:'Which expression means “about the same”?',options:['差不多','不行','參觀'],answer:'差不多',explanation:'差不多 says the difference is small enough to count as about the same.'},
      {id:'u25-review-03',type:'order',phrase:'u25-scooter-question',tokens:['快嗎','坐公車','比','騎機車']},
      {id:'u25-review-04',type:'select',prompt:'Which route sentence uses the Taiwan MRT word correctly?',options:['我坐捷運去學校。','我捷運坐去學校。'],answer:'我坐捷運去學校。',explanation:'Use 坐 + vehicle + 去 + destination.'},
      {id:'u25-review-05',type:'select',prompt:'Which sentence correctly negates an explicit comparison?',options:['坐公車不比坐計程車快。','坐公車比坐計程車不快。'],answer:'坐公車不比坐計程車快。',explanation:'For this pattern, 不 precedes 比.',grammarIds:['u25-bi-negation']}
    ]}
  ],
  newVocabulary: [
    {text:'同學',pinyin:'tóngxué',meaning:'classmate',lessonId:'u25-transport',core:true},
    {text:'參觀',pinyin:'cānguān',meaning:'to visit (an institution or site)',lessonId:'u25-places',core:true},
    {text:'古代',pinyin:'gǔdài',meaning:'ancient times; ancient',lessonId:'u25-places',core:false},
    {text:'騎',pinyin:'qí',meaning:'to ride',lessonId:'u25-rides',core:true},
    {text:'機車',pinyin:'jīchē',meaning:'scooter; motorcycle',lessonId:'u25-rides',core:true,note:'In Taiwan, 機車 commonly refers to a motor scooter/motorcycle.'},
    {text:'載',pinyin:'zài',meaning:'to carry; give someone a ride in/on a vehicle',lessonId:'u25-rides',core:true},
    {text:'捷運',pinyin:'jiéyùn',meaning:'MRT; metro',lessonId:'u25-transport',core:true,note:'Standard Taiwan Mandarin for an MRT/metro system.'},
    {text:'比',pinyin:'bǐ',meaning:'than; compared with',lessonId:'u25-compare',core:true},
    {text:'公車',pinyin:'gōngchē',meaning:'bus',lessonId:'u25-transport',core:true,note:'Common short form of 公共汽車 in Taiwan.'},
    {text:'不行',pinyin:'bùxíng',meaning:'will not do; not workable',lessonId:'u25-places',core:true},
    {text:'計程車',pinyin:'jìchéngchē',meaning:'taxi',lessonId:'u25-rides',core:true,note:'Taiwan Mandarin for taxi.'},
    {text:'差不多',pinyin:'chàbuduō',meaning:'about the same; almost',lessonId:'u25-places',core:true}
  ],
  reviewVocabulary: ['坐','火車','跟','玩','怎麼','慢','比較','快','車票','又','舒服','高鐵','學校','朋友','週末','去','可以','很','貴'],
  newCharacters: [], reviewCharacters: [], characters: {},
  grammarRules: {
    'u25-bi-comparison': {id:'u25-bi-comparison',title:'Explicit comparison with 比',pattern:'A + 比 + B + state verb / property',explanation:'Use 比 when you name both things being compared. A is described relative to B: 坐捷運比坐火車快 means taking the MRT is faster than taking the train.',examples:[{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.'},{text:'我們學校比他們學校遠。',pinyin:'Wǒmen xuéxiào bǐ tāmen xuéxiào yuǎn.',meaning:'Our school is farther away than their school.'}],remember:'比較 leaves the comparison target understood; 比 explicitly names A and B.'},
    'u25-bi-negation': {id:'u25-bi-negation',title:'Negating a 比 comparison',pattern:'A + 不比 / 不是比 + B + property',explanation:'To say that A is not more X than B, put 不 before 比. The textbook also allows 不是比 in this pattern.',examples:[{text:'坐公車不比坐計程車快。',pinyin:'Zuò gōngchē bù bǐ zuò jìchéngchē kuài.',meaning:'Taking the bus is not faster than taking a taxi.'},{text:'我的車不比他的車貴。',pinyin:'Wǒ de chē bù bǐ tā de chē guì.',meaning:'My vehicle is not more expensive than his.'}],remember:'Negate before 比, not after the comparison target.'},
    'u25-bi-degree': {id:'u25-bi-degree',title:'No 很 / 非常 in the basic 比 pattern',pattern:'A + 比 + B + property (not 很/非常 + property)',explanation:'The comparison already supplies the degree relationship. In the basic pattern taught here, do not put degree adverbs such as 很, 真, or 非常 before the final property.',examples:[{text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.'}],remember:'Say A 比 B 快, not A 比 B 很快.'}
  },
  grammarIntroductions: [
    {id:'u25-bi-comparison-intro',kind:'rule',ref:'u25-bi-comparison',lessonId:'u25-compare',stepId:'u25-compare-01'},
    {id:'u25-bi-negation-intro',kind:'rule',ref:'u25-bi-negation',lessonId:'u25-negative',stepId:'u25-negative-01'},
    {id:'u25-bi-degree-intro',kind:'rule',ref:'u25-bi-degree',lessonId:'u25-negative',stepId:'u25-negative-05'}
  ],
  reviewGrammar: ['u24-zuo-transport','u24-bijiao','u24-you-you'],
  phrases: {
    'u25-bus-palace': {text:'我坐公車去故宮。',pinyin:'Wǒ zuò gōngchē qù Gùgōng.',meaning:'I take the bus to the Palace Museum.',note:'',tokens:['我','坐公車','去','故宮']},
    'u25-mrt-school': {text:'我坐捷運去學校。',pinyin:'Wǒ zuò jiéyùn qù xuéxiào.',meaning:'I take the MRT to school.',note:'',tokens:['我','坐捷運','去學校']},
    'u25-ride-scooter': {text:'我騎機車。',pinyin:'Wǒ qí jīchē.',meaning:'I ride a scooter.',note:'',tokens:['我','騎','機車']},
    'u25-give-ride': {text:'同學載我。',pinyin:'Tóngxué zài wǒ.',meaning:'My classmate gives me a ride.',note:'',tokens:['同學','載','我']},
    'u25-taxi': {text:'我坐計程車去。',pinyin:'Wǒ zuò jìchéngchē qù.',meaning:'I go by taxi.',note:'',tokens:['我','坐計程車','去']},
    'u25-visit-palace': {text:'我去參觀故宮。',pinyin:'Wǒ qù cānguān Gùgōng.',meaning:'I go visit the Palace Museum.',note:'',tokens:['我','去','參觀','故宮']},
    'u25-no-good': {text:'不行。',pinyin:'Bùxíng.',meaning:'That will not do.',note:'',tokens:['不行']},
    'u25-about-same': {text:'差不多。',pinyin:'Chàbuduō.',meaning:'About the same.',note:'',tokens:['差不多']},
    'u25-mrt-faster': {text:'坐捷運比坐火車快。',pinyin:'Zuò jiéyùn bǐ zuò huǒchē kuài.',meaning:'Taking the MRT is faster than taking the train.',note:'',tokens:['坐捷運','比','坐火車','快'],grammarIds:['u25-bi-comparison']},
    'u25-bus-not-faster': {text:'坐公車不比坐計程車快。',pinyin:'Zuò gōngchē bù bǐ zuò jìchéngchē kuài.',meaning:'Taking the bus is not faster than taking a taxi.',note:'',tokens:['坐公車','不比','坐計程車','快'],grammarIds:['u25-bi-negation']},
    'u25-scooter-question': {text:'騎機車比坐公車快嗎？',pinyin:'Qí jīchē bǐ zuò gōngchē kuài ma?',meaning:'Is riding a scooter faster than taking the bus?',note:'',tokens:['騎機車','比','坐公車','快嗎'],grammarIds:['u25-bi-comparison']},
    'u25-same-time': {text:'騎機車跟坐公車差不多。',pinyin:'Qí jīchē gēn zuò gōngchē chàbuduō.',meaning:'Riding a scooter and taking the bus are about the same.',note:'Use this as a lexical review of 差不多, not as a new comparison grammar rule.',tokens:['騎機車','跟','坐公車','差不多']}
  },
  revisionStepIds: ['u25-choices-03','u25-choices-04','u25-review-04']
};

export default unit;
