/** Reviewed relationships, never canonical vocabulary or character declarations.
 * Examples refer to existing course phrases: edits keep one source of truth.
 * See docs/cumulative-learning.md for sources and authoring invariants.
 */
export type UsageLink={id:string;words:string[];title:string;explanation:string;phraseIds:string[];grammarIds?:string[];cloze?:{phraseId:string;target:string;answers:string[]}[];source:string};
export const usageLinks:UsageLink[]=[
 {id:'books-ben',words:['書','本'],title:'Counting books',explanation:'Put 本 between the number and 書. Use 兩 before the measure word when counting two books.',phraseIds:['u3-two-books'],grammarIds:['u3-books','u3-two'],cloze:[{phraseId:'u3-two-books',target:'本',answers:['本']}],source:'Book 1 course: Unit 3, u3-books and u3-two.'},
 {id:'drinks-bei',words:['茶','咖啡','杯'],title:'Cups of a drink',explanation:'Count cups with number + 杯 + drink. The drink follows 杯: 三杯茶, 四杯咖啡.',phraseIds:['u12-three-teas','u12-four-coffees'],grammarIds:['u11-cup'],cloze:[{phraseId:'u12-three-teas',target:'杯',answers:['杯']},{phraseId:'u12-four-coffees',target:'杯',answers:['杯']}],source:'Book 1 Lesson 5 shopping; Units 11–12 measure-word retrieval.'},
 {id:'bang-beneficiary',words:['幫'],title:'Doing something for someone',explanation:'幫 + person + action names the person benefiting from the action. In 幫她買茶, 她 is the person the tea is for.',phraseIds:['u13-heat-bun','u13-buy-for-her','u13-buy-help'],grammarIds:['u13-help'],cloze:[{phraseId:'u13-buy-for-her',target:'她',answers:['她']},{phraseId:'u13-buy-help',target:'我',answers:['我']}],source:'Book 1 Lesson 5, grammar II: beneficiary 幫; Unit 13.'},
 {id:'wear-clothes',words:['衣服','穿'],title:'Wearing clothes',explanation:'Use 穿 with clothing. A colour can describe 衣服: 穿黃色的衣服.',phraseIds:['u30-yellow-clothes','u30-red-clothes','u31-red-person'],source:'Book 1 Lesson 10 describing people; Units 30–31.'},
 {id:'ji-few',words:['幾'],title:'幾 in a statement',explanation:'幾 can mean a few or several in a non-question context. 沒有幾個朋友 means not many friends; compare the earlier question sense, how many?',phraseIds:['u46-ji-expansion'],grammarIds:['u46-noncommittal-question-words'],source:'Book 1 Lesson 15 grammar I; u46-ji-explain. Original ownership stays Unit 7.'},
 {id:'gen-recipient',words:['跟','說'],title:'Telling someone',explanation:'In 跟 + person + 說, 跟 marks the person being spoken to. Compare the earlier companion use: going with someone.',phraseIds:['u48-gen-recipient'],source:'Book 1 Lesson 15 dialogue II turn 8; u48-gen-explain-a. 跟 remains owned by Unit 24.'},
 {id:'sleep-duration',words:['睡覺'],title:'A duration inside 睡覺',explanation:'睡覺 can separate: put 了 and the duration after 睡, before 的覺. Learn the whole pattern rather than attaching a duration after the complete word.',phraseIds:['u48-g7-order'],grammarIds:['u48-separable-verbs'],source:'Book 1 Lesson 15 grammar VII; Unit 48.'},
 {id:'route-start-direction',words:['從','往前','走'],title:'Start, direction, movement',explanation:'從 introduces the starting point. 往 gives the direction. Both come before the movement verb 走.',phraseIds:['b2u1-l4-model'],grammarIds:['b2u1-l4-from-toward'],cloze:[{phraseId:'b2u1-l4-model',target:'從',answers:['從']}],source:'Book 2 Lesson 1, printed page 8, grammar I.'},
];

export type CharacterFamily={id:string;kind:'phonetic'|'semantic'|'visual';members:string[];title:string;explanation:string;prompt:string;answer:string;source:string};
export const characterFamilies:CharacterFamily[]=[
 {id:'ma-sound',kind:'phonetic',members:['媽','嗎'],title:'Same sound clue, different meaning clues',explanation:'媽 mā and 嗎 ma share 馬 as a sound component. 女 in 媽 connects with mother; 口 in 嗎 connects with speech. The shared sound clue does not guarantee the same tone, and neither word means horse.',prompt:'Which character is the neutral-tone question particle?',answer:'嗎',source:'CUHK Multi-function Chinese Character Database, 媽 and 嗎: https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=媽 ; https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=嗎'},
 {id:'ta-pronouns',kind:'semantic',members:['他','她'],title:'Same sound, different written pronouns',explanation:'他 and 她 both sound tā and share 也 on the right. 亻 marks the person form 他; 女 distinguishes 她. This is a useful written contrast, not a claim that 也 yě predicts the modern sound tā.',prompt:'Which written pronoun means she or her?',answer:'她',source:'Existing reviewed Unit 2 character records: 他 and 她, semantic components and shared 也.'},
 {id:'da-tai',kind:'visual',members:['大','太'],title:'One dot changes the character',explanation:'大 dà has three strokes. 太 tài adds a dot below the centre. Use this as a writing contrast; it is not a literal explanation of the word meanings.',prompt:'Which character has the extra dot below the centre?',answer:'太',source:'Existing reviewed Traditional stroke records and character parts: 大 and 太.'},
 {id:'wen-jian',kind:'visual',members:['問','間'],title:'Look inside the frame',explanation:'問 wèn has 口 inside 門; 間 jiān has 日 inside 門. 日 has an extra horizontal stroke. This comparison describes visible shapes, not an etymology or a pronunciation rule.',prompt:'Which character contains 日 inside the outer frame?',answer:'間',source:'Existing reviewed Traditional stroke records: 問 and 間.'},
];

/** Explicit cross-unit grammar links, checked by a human; no substring inference. */
export const phraseGrammarLinks:Record<string,string[]>={
 'u13-buy-for-her':['u11-cup'],
 'u13-buy-help':['u3-two'],
 'u31-red-person':['u2-pronouns'],
 'b2u3-l2-model':['u39-verbal-le'],
 'b2u3-l5-model':['u3-two'],
 'b2u4-l5-model':['u39-verbal-le','u3-two'],
 'b2u4-l6-model':['u39-verbal-le','u3-two'],
};
export const grammarContrasts:string[][]=[['u2-have','u2-no-have'],['u10-none','u10-not-all'],['u24-gen-company','u41-gen-yiyang'],['u31-sentential-le','u39-verbal-le']];

/** Line-bound links reveal only AFTER comprehension; they never award mastery. */
export const readingKnowledgeLinks:Record<string,{line:number;conceptIds:string[]}[]>={
 'reading-unit-10':[{line:0,conceptIds:['grammar:u10-not-all','grammar:u3-all']}],
 'reading-unit-13':[{line:2,conceptIds:['usage:bang-beneficiary','usage:drinks-bei','grammar:u13-help']}],
 'reading-unit-16':[{line:2,conceptIds:['grammar:u16-a-little']},{line:3,conceptIds:['grammar:u16-object-repeat']}],
 'reading-unit-31':[{line:1,conceptIds:['usage:wear-clothes','grammar:u31-clause-modifier']},{line:2,conceptIds:['grammar:u31-yinwei-suoyi']}],
 'reading-unit-40':[{line:0,conceptIds:['grammar:u39-verbal-le']}],
 'reading-unit-48':[{line:3,conceptIds:['grammar:u47-vle-jiu']}],
 'reading-book-2-unit-4':[{line:3,conceptIds:['usage:route-start-direction','grammar:b2u1-l4-from-toward']},{line:4,conceptIds:['grammar:b2u4-l2-simultaneous']}],
};

/** Authored segmentation of already taught rule examples, for rules without an
 * existing reconstructable phrase. Text/pinyin/meaning stay in the source rule. */
export const grammarExampleLinks:{grammarId:string;example:number;tokens:string[]}[]=[
 {grammarId:'b2u2-l4-evaluative',example:1,tokens:['這個菜','吃起來','不辣']},
 {grammarId:'b2u2-l4-evaluative',example:2,tokens:['這個菜','吃起來','怎麼樣']},
 {grammarId:'u5-answers',example:0,tokens:['你','要不要','喝茶','要']},
 {grammarId:'u12-to-ten',example:0,tokens:['八','九','十']},
 {grammarId:'u15-many',example:0,tokens:['很多人','喜歡','吃麵']},
 {grammarId:'u17-agree',example:0,tokens:['這家店','很有名','—','是啊']},
 {grammarId:'u18-place',example:0,tokens:['這個地方','很美']},
 {grammarId:'u18-go-or-at',example:0,tokens:['我','去','學校','上課']},
 {grammarId:'u18-go-or-at',example:1,tokens:['我','在','學校','上課']},
 {grammarId:'u25-bi-degree',example:0,tokens:['坐捷運','比','坐火車','快']},
 {grammarId:'u48-a-little-degree',example:1,tokens:['好','一點']},
];
