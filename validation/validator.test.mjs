import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse,curriculumIndex} from './course-io.mjs';
import {validateCourse} from './validate.mjs';
import {learnedPracticeItems} from '../lib/practice-engine.ts';
import {searchLearnedVocabulary} from '../lib/vocabulary-lookup.ts';
const baseline=await loadCourse();
const run=mutate=>{const c=structuredClone(baseline);mutate(c);return validateCourse(c.manifest,c.modules,c.geometry).join('\n')};

test('Current modules pass structural validation and preserve the corrected first-teaching locations',()=>{
 assert.deepEqual(baseline.errors,[]);const index=curriculumIndex(baseline);
 assert.equal(index.vocabulary['可以'][3],'unit-8');assert.equal(index.characters['以'][3],'unit-8');
 assert.equal(index.characters['師'][3],'unit-7');assert.equal(index.grammar['phrase-note:question'][3],'unit-1');
});
test('Coverage uses explicit NEW vocabulary/cards and ignores non-Han symbols',()=>{
 assert.match(run(c=>{c.modules[7].newCharacters=c.modules[7].newCharacters.filter(ch=>ch!=='以')}),/Book 1 \/ Unit 8.*vocabulary 可以: missing first-time character 以/);
 assert.doesNotMatch(run(c=>{c.modules[7].newVocabulary.find(w=>w.text==='可以').text='可以，可以！ABC 123 🙂'}),/missing first-time character/);
 assert.match(run(c=>{c.modules[8].newCharacters.push('以');c.modules[8].characters['以']=c.modules[7].characters['以']}),/duplicate first-teaching declaration; already taught in Book 1 \/ Unit 8/);
});
test('Schema rejects missing lessons, wrong order, duplicate IDs and malformed modules',()=>{
 assert.match(run(c=>c.modules[0].unit.lessonIds.push('missing')),/missing referenced lessons/);
 assert.match(run(c=>c.manifest.books[0].units[1].order=1),/invalid unit ordering/);
 assert.match(run(c=>c.modules[0].lessons[1].id='hello'),/duplicate lesson ID/);
 assert.match(run(c=>c.modules[0].lessons[1].steps[0].id=c.modules[0].lessons[0].steps[0].id),/duplicate activity ID/);
 assert.match(run(c=>c.modules[0].schemaVersion=2),/malformed unit data/);
 assert.match(run(c=>c.modules[0].lessons=null),/missing\/malformed lessons/);
});
test('Schema rejects incomplete words, first-teaching duplicates and invalid REVIEW references',()=>{
 for(const field of ['text','pinyin','meaning'])assert.match(run(c=>c.modules[0].newVocabulary[0][field]=''),new RegExp('missing/invalid '+field));
 assert.match(run(c=>c.modules[1].newVocabulary[0].text='你'),/duplicate first-teaching declaration/);
 assert.match(run(c=>c.modules[0].reviewVocabulary.push('不存在')),/no earlier formal teaching/);
});
test('Character metadata cannot silently fall back to generic teaching or missing geometry',()=>{
 for(const value of ['', 'Remember the shape', 'Follow the highlighted groups in order. Keep the whole character balanced inside the square.'])assert.match(run(c=>c.modules[7].characters['以'].memory=value),/missing character-specific memory/);
 assert.match(run(c=>c.modules[7].characters['以'].parts=[]),/missing character-specific parts/);
 assert.match(run(c=>delete c.geometry['以']),/missing\/malformed handwriting geometry/);
});
test('Activities reject missing correct answers, broken references and incomplete answer banks',()=>{
 assert.match(run(c=>c.modules[0].lessons[0].steps.find(s=>s.type==='select').answer='wrong'),/no valid correct answer/);
 assert.match(run(c=>c.modules[0].lessons[0].steps.find(s=>s.type==='phrase').phrase='absent'),/missing phrase reference/);
 assert.match(run(c=>c.modules[0].lessons[0].steps.find(s=>s.type==='order').tokens=['wrong']),/no valid correct answer; bank missing/);
 assert.match(run(c=>c.modules[1].grammarIntroductions[0].stepId='absent'),/broken teaching lesson\/activity/);
 assert.match(run(c=>c.modules[1].grammarIntroductions.push(c.modules[1].grammarIntroductions[0])),/duplicate first-teaching ID/);
});

test('Semantic listening answers require an explicit listening-only opt-in',()=>{
 const target=c=>c.modules.find(m=>m.unit.id==='unit-46').lessons.find(l=>l.id==='u46-review').steps.find(s=>s.id==='u46-review-l1');
 assert.doesNotMatch(run(c=>{const s=target(c);s.prompt='Which meaning of 得 is heard?';s.options=['must/have to','performance complement marker','to obtain'];s.answer='must/have to';s.semanticAnswer=true}),/contextual audio must contain only one answer option/);
 assert.match(run(c=>{const s=target(c);s.prompt='Which meaning of 得 is heard?';s.options=['must/have to','performance complement marker','to obtain'];s.answer='must/have to';delete s.semanticAnswer}),/contextual audio must contain only one answer option/);
 assert.match(run(c=>{const s=c.modules[0].lessons[0].steps.find(s=>s.type==='select');s.semanticAnswer=true}),/semanticAnswer is only valid as true on listening exercises/);
});

test('Lesson 15 source visual role cards require complete learner-facing metadata',()=>{
 const unit=c=>c.modules.find(m=>m.unit.id==='unit-48');
 const target=c=>unit(c).lessons.flatMap(l=>l.steps).find(s=>s.id==='u48-a002-visual-1');
 assert.doesNotMatch(run(c=>{const s=target(c);s.type='visual'}),/activity u48-a002-visual-1/);
 assert.match(run(c=>{const s=target(c);delete s.visualRole}),/activity u48-a002-visual-1: missing\/invalid visualRole/);
 assert.match(run(c=>{const s=target(c);delete s.visualCue}),/activity u48-a002-visual-1: missing\/invalid visualCue/);
 assert.match(run(c=>{const s=target(c);s.visualScene='generic'}),/activity u48-a002-visual-1: invalid source-specific visualScene/);
 assert.match(run(c=>{const s=target(c);s.visualSuggestions=[]}),/activity u48-a002-visual-1 visualSuggestions: expected an array of nonempty strings/);
});

test('Lesson 15 A002 cards preserve three distinct source illustration transcriptions',()=>{
 const u48=baseline.modules.find(m=>m.unit.id==='unit-48');
 const step=id=>u48.lessons.flatMap(l=>l.steps).find(s=>s.id===id);
 const cards=['u48-a002-visual-1','u48-a002-visual-2','u48-a002-visual-3'].map(step);
 assert.deepEqual(cards.map(s=>s.visualScene),['restroom','bed','throat']);
 assert.deepEqual(cards.map(s=>s.visualCue),[
  "Source illustration: a man stands hunched beside a men's restroom door with both hands at his lower abdomen.",
  'Source illustration: a man lies in bed under a blanket with his head on a pillow.',
  'Source illustration: a man stands with one hand held at his throat/neck.'
 ]);
 assert.equal(new Set(cards.map(s=>s.visualScene)).size,3);
 assert.deepEqual(cards.map(s=>s.visualClosing),['好的。','謝謝你。','謝謝你的關心。……']);
 assert.ok(cards.every(s=>JSON.stringify(s.visualSuggestions)===JSON.stringify(['看病','多休息','早一點睡覺','多喝水'])));
});

test('Lesson 15 learner-safe listening payloads stay pinned to the frozen activity specs',()=>{
 const expected={
   "u45-doctor-l1": {
     "unit": "unit-45",
     "audioText": "你哪裡不舒服？",
     "prompt": "What is the speaker asking about?",
     "options": [
       "where the person feels unwell",
       "where the person lives",
       "what the weather is like"
     ],
     "answer": "where the person feels unwell",
     "explanation": "The question asks about the location of discomfort."
   },
   "u45-sick-l1": {
     "unit": "unit-45",
     "audioText": "我生病了，還有一點發燒。",
     "prompt": "Which two ideas are stated?",
     "options": [
       "being sick and having a slight fever",
       "having a good appetite and resting",
       "going to a pharmacy and taking medicine"
     ],
     "answer": "being sick and having a slight fever",
     "explanation": "生病 and 發燒 are both present."
   },
   "u45-duration-l1": {
     "unit": "unit-45",
     "audioText": "大概多久了？已經四、五天了。",
     "prompt": "What information is being exchanged?",
     "options": [
       "duration of the condition",
       "where the pharmacy is",
       "how much medicine costs"
     ],
     "answer": "duration of the condition",
     "explanation": "The question and answer concern how long the condition has lasted."
   },
   "u45-review-l2": {
     "unit": "unit-45",
     "audioText": "頭很痛，胃口很差。",
     "prompt": "Which two problems are mentioned?",
     "options": [
       "head pain and poor appetite",
       "throat inflammation and fever",
       "medicine and rest"
     ],
     "answer": "head pain and poor appetite",
     "explanation": "頭很痛 + 胃口很差."
   },
   "u46-ba-l1": {
     "unit": "unit-46",
     "audioText": "別把我的藥吃了。",
     "prompt": "Which word gives the negative command?",
     "options": [
       "別",
       "把",
       "藥"
     ],
     "answer": "別",
     "explanation": "別 means “don't.”"
   },
   "u46-rec-l1": {
     "unit": "unit-46",
     "audioText": "多喝水，多休息，早一點睡覺。",
     "prompt": "Which three kinds of advice do you hear?",
     "options": [
       "drink more water, rest more, sleep earlier",
       "buy medicine, go home, eat less",
       "vomit, sleep, compare"
     ],
     "answer": "drink more water, rest more, sleep earlier",
     "explanation": "These are the three advice phrases in the audio."
   },
   "u46-visit-l1": {
     "unit": "unit-46",
     "audioText": "請問我得吃藥嗎？",
     "prompt": "What is the patient asking?",
     "options": [
       "whether they have to take medicine",
       "where their head hurts",
       "how many hours they slept"
     ],
     "answer": "whether they have to take medicine",
     "explanation": "得 děi expresses necessity."
   },
   "u47-what-l1": {
     "unit": "unit-47",
     "audioText": "你怎麼了？臉色這麼難看。",
     "prompt": "What observation follows the concern question?",
     "options": [
       "the person's complexion looks bad",
       "the person slept eight hours",
       "the person has insurance"
     ],
     "answer": "the person's complexion looks bad",
     "explanation": "臉色這麼難看 describes the person's appearance."
   },
   "u47-g3-l1": {
     "unit": "unit-47",
     "audioText": "吃了東西就吐。",
     "prompt": "What happened right after eating?",
     "options": [
       "vomiting",
       "sleeping",
       "going to a pharmacy"
     ],
     "answer": "vomiting",
     "explanation": "就 introduces the immediate next event."
   },
   "u47-a005-l1": {
     "unit": "unit-47",
     "audioText": "你真的不去看病嗎？",
     "prompt": "What is being confirmed?",
     "options": [
       "that the person really will not see a doctor",
       "that the person has insurance",
       "that the person slept several hours"
     ],
     "answer": "that the person really will not see a doctor",
     "explanation": "The question confirms refusal to go see a doctor."
   },
   "u47-review-l1": {
     "unit": "unit-47",
     "audioText": "你怎麼了？臉色這麼難看。",
     "prompt": "What concern is expressed?",
     "options": [
       "the person's condition/appearance",
       "the price of medicine",
       "travel time"
     ],
     "answer": "the person's condition/appearance",
     "explanation": "怎麼了 + 臉色這麼難看 is a health concern."
   },
   "u47-review-l2": {
     "unit": "unit-47",
     "audioText": "還吐了好幾次。",
     "prompt": "How often?",
     "options": [
       "several times",
       "one time",
       "for several hours"
     ],
     "answer": "several times",
     "explanation": "好幾次 means several times."
   },
   "u47-review-l3": {
     "unit": "unit-47",
     "audioText": "我陪你去看病，好不好？",
     "prompt": "What is being offered?",
     "options": [
       "accompanying the person to see a doctor",
       "buying insurance",
       "reading a prescription"
     ],
     "answer": "accompanying the person to see a doctor",
     "explanation": "陪你去看病 is the offer."
   },
   "u48-advice-l1": {
     "unit": "unit-48",
     "audioText": "油的、冰的東西最好都別吃。",
     "prompt": "What kind of advice do you hear?",
     "options": [
       "avoid oily and icy foods",
       "eat several packets of medicine",
       "sleep more hours than yesterday"
     ],
     "answer": "avoid oily and icy foods",
     "explanation": "最好都別吃 is negative advice."
   },
   "u48-g4-l1": {
     "unit": "unit-48",
     "audioText": "現在覺得怎麼樣？好一點了嗎？",
     "prompt": "What is the speaker checking?",
     "options": [
       "whether the person feels a little better",
       "how many packets remain",
       "whether the rent is cheaper"
     ],
     "answer": "whether the person feels a little better",
     "explanation": "The health check uses G004."
   },
   "u48-g5-l1": {
     "unit": "unit-48",
     "audioText": "我吃了一包藥以後，睡得比昨天好。",
     "prompt": "What improved compared with yesterday?",
     "options": [
       "sleeping",
       "rent",
       "appetite only"
     ],
     "answer": "sleeping",
     "explanation": "睡得比昨天好 is the action comparison."
   },
   "u48-g6-l1": {
     "unit": "unit-48",
     "audioText": "現在臉色比早上好得多了。",
     "prompt": "How large is the improvement presented?",
     "options": [
       "much better",
       "a tiny amount only",
       "no comparison"
     ],
     "answer": "much better",
     "explanation": "得多 marks a large difference."
   },
   "u48-prescription-l1": {
     "unit": "unit-48",
     "audioText": "這種藥一天吃四次，飯後三十分鐘吃。",
     "prompt": "When is the medicine taken?",
     "options": [
       "30 minutes after meals",
       "before meals",
       "once before sleep"
     ],
     "answer": "30 minutes after meals",
     "explanation": "飯後三十分鐘 gives the timing."
   },
   "u48-review-l1": {
     "unit": "unit-48",
     "audioText": "油的、冰的東西最好都別吃。",
     "prompt": "What advice is heard?",
     "options": [
       "avoid oily and icy things",
       "eat several bowls",
       "buy health insurance"
     ],
     "answer": "avoid oily and icy things",
     "explanation": "最好都別吃 gives the advice."
   },
   "u48-review-l2": {
     "unit": "unit-48",
     "audioText": "我吃了一包藥以後，睡得比昨天好。",
     "prompt": "What is compared?",
     "options": [
       "sleep quality",
       "rent",
       "number of packets"
     ],
     "answer": "sleep quality",
     "explanation": "This is G005 action comparison."
   }
 };
 const step=(unitId,id)=>baseline.modules.find(m=>m.unit.id===unitId).lessons.flatMap(l=>l.steps).find(s=>s.id===id);
 for(const [id,payload] of Object.entries(expected)){
  const actual=step(payload.unit,id);
  assert.ok(actual,id+' missing from learner-facing curriculum');
  assert.deepEqual({audioText:actual.audioText,prompt:actual.prompt,options:actual.options,answer:actual.answer,explanation:actual.explanation},
   {audioText:payload.audioText,prompt:payload.prompt,options:payload.options,answer:payload.answer,explanation:payload.explanation},id+' drifted from the frozen learner-safe assessed payload');
 }
});

test('Lesson 15 repair preserves semantic listening targets and support-only honorifics',()=>{
 const u46=baseline.modules.find(m=>m.unit.id==='unit-46');
 const u47=baseline.modules.find(m=>m.unit.id==='unit-47');
 const u48=baseline.modules.find(m=>m.unit.id==='unit-48');
 const step=(u,id)=>u.lessons.flatMap(l=>l.steps).find(s=>s.id===id);
 assert.equal(step(u46,'u46-review-l1').answer,'must/have to');
 assert.equal(step(u46,'u46-review-l3').answer,'去買房子');
 assert.equal(step(u47,'u47-stomach-l1').answer,'stomach discomfort and repeated vomiting');
 assert.equal(step(u48,'u48-g7-l1').answer,'separable-verb duration + degree comparison');
 assert.equal(step(u48,'u48-review-l3').answer,'separable duration + much-better comparison');
 for(const id of ['u46-review-l1','u46-review-l3'])assert.equal(step(u46,id).semanticAnswer,true);
 assert.equal(step(u47,'u47-stomach-l1').semanticAnswer,true);
 for(const id of ['u48-g7-l1','u48-review-l3'])assert.equal(step(u48,id).semanticAnswer,true);
 assert.equal(u46.phrases['u46-honorific-nin'].text,'您');
 assert.equal(u46.phrases['u46-thanks-nin'].text,'好的，謝謝您。');
 assert.equal(u46.newVocabulary.some(w=>w.text.includes('您')),false);
 assert.equal(u46.newCharacters.includes('您'),false);
});



test('Lesson 15 幾 expansion is taught before testing without stealing Unit-7 ownership',()=>{
 const u46=baseline.modules.find(m=>m.unit.id==='unit-46');
 const u47=baseline.modules.find(m=>m.unit.id==='unit-47');
 const lesson=u46.lessons.find(l=>l.id==='u46-nonspecific');
 const ids=lesson.steps.map(s=>s.id);
 assert.ok(ids.indexOf('u46-ji-explain')>=0);
 assert.ok(ids.indexOf('u46-ji-explain')<ids.indexOf('u46-ji-s1'));
 const explain=lesson.steps.find(s=>s.id==='u46-ji-explain');
 assert.equal(explain.type,'phrase');
 assert.equal(explain.phrase,'u46-ji-expansion');
 const expansion=u46.phrases['u46-ji-expansion'];
 assert.equal(expansion.text,'她沒有幾個朋友。');
 assert.equal(expansion.pinyin,'Tā méiyǒu jǐ ge péngyǒu.');
 assert.equal(expansion.meaning,'She does not have many friends / has only a few friends.');
 assert.match(expansion.note,/Unit 7/);
 assert.match(expansion.note,/how many/);
 assert.match(expansion.note,/a few \/ several/);
 assert.match(expansion.note,/statement or other non-question context/);
 assert.match(expansion.note,/semantic expansion/);
 const check=lesson.steps.find(s=>s.id==='u46-ji-s1');
 assert.equal(check.answer,'幾 = a few/several in a statement');
 const index=curriculumIndex(baseline);
 assert.deepEqual(index.vocabulary['幾'],['jǐ','how many','book-1','unit-7','u7-v2-numbers']);
 assert.equal(index.characters['幾'][3],'unit-7');
 assert.equal(u46.newVocabulary.some(w=>w.text==='幾'),false);
 assert.equal(u46.newCharacters.includes('幾'),false);
 assert.equal(u46.lessons.flatMap(l=>l.steps).some(s=>s.char==='幾'),false);
 assert.equal(u47.newVocabulary.some(w=>w.text==='幾'||w.text==='好幾次'),false);
 assert.equal(u47.newCharacters.includes('幾'),false);
 const stomach=u47.lessons.find(l=>l.id==='u47-stomach');
 const stomachIds=stomach.steps.map(s=>s.id);
 assert.ok(stomachIds.indexOf('u47-stomach-ji-review')<stomachIds.indexOf('u47-stomach-s4'));
 assert.equal(u47.phrases['u47-several-times'].text,'吐了好幾次。');
 assert.equal(u47.phrases['u47-several-times'].note,'Requires the Unit-46 幾 expansion.');
 assert.equal(stomach.steps.find(s=>s.id==='u47-stomach-s4').answer,'a few/several');
});


test('Lesson 15 A003 source notation stays visible while support-only material remains non-canonical',()=>{
 const u48=baseline.modules.find(m=>m.unit.id==='unit-48');
 const support=u48.phrases['u48-prescription-support'];
 const visual=u48.phrases['u48-prescription-visual'];
 assert.equal(support.text,'一日4次／3日份／份／飯前／飯後／飯後30分鐘');
 assert.equal(visual.text,'健康診所｜一日4次｜3日份｜飯後｜飯後30分鐘');
 assert.equal(support.practice,false);
 assert.equal(visual.practice,false);
 assert.equal(support.tokens.join(''),support.text);
 assert.equal(visual.tokens.join(''),visual.text);
 const steps=u48.lessons.flatMap(l=>l.steps);
 const ids=steps.map(s=>s.id);
 assert.ok(ids.indexOf('u48-prescription-support')<ids.indexOf('u48-a003-s1'));
 assert.ok(ids.indexOf('u48-prescription-visual')<ids.indexOf('u48-a003-s1'));
 assert.equal(steps.find(s=>s.id==='u48-a003-s1').answer,'四次');
 assert.equal(steps.find(s=>s.id==='u48-a003-s2').answer,'飯後30分鐘');
 assert.equal(steps.find(s=>s.id==='u48-a003-s3').answer,'十二包');
 const index=curriculumIndex(baseline);
 for(const glyph of ['份','診']){
  assert.equal(Object.hasOwn(index.vocabulary,glyph),false,glyph+' must not become canonical vocabulary');
  assert.equal(Object.hasOwn(index.characters,glyph),false,glyph+' must not become a canonical character');
  assert.equal(u48.newVocabulary.some(w=>w.text===glyph),false);
  assert.equal(u48.newCharacters.includes(glyph),false);
  assert.equal(steps.some(s=>s.char===glyph),false,glyph+' must not gain handwriting ownership');
 }
});


test('Lesson 15 final strict-prerequisite fixes keep 回家 out of Unit 45 and withhold full G003 source until teaching',()=>{
 const u45=baseline.modules.find(m=>m.unit.id==='unit-45');
 const u47=baseline.modules.find(m=>m.unit.id==='unit-47');
 const review45=u45.lessons.find(l=>l.id==='u45-review');
 const f1=review45.steps.find(s=>s.id==='u45-review-f1');
 assert.deepEqual(f1.options,['哪裡不舒服？','大概多久了？','什麼東西都不想吃？']);
 assert.equal(f1.answer,'哪裡不舒服？');
 assert.equal(f1.options.some(option=>option.includes('回家')),false);

 const g3=u47.lessons.find(l=>l.id==='u47-vle-jiu');
 const ids=g3.steps.map(s=>s.id);
 const review=g3.steps.find(s=>s.id==='u47-g3-review');
 const grammar=g3.steps.find(s=>s.id==='u47-vle-jiu');
 const source=g3.steps.find(s=>s.id==='u47-g3-p1');
 assert.equal(review.phrase,'u47-g3-prereq-review');
 assert.equal(source.phrase,'u47-d2t02-full');
 assert.ok(ids.indexOf('u47-g3-review')<ids.indexOf('u47-vle-jiu'));
 assert.ok(ids.indexOf('u47-vle-jiu')<ids.indexOf('u47-g3-s1'));
 assert.ok(ids.indexOf('u47-g3-s4')<ids.indexOf('u47-g3-p1'));
 assert.ok(ids.indexOf('u47-g3-p1')<ids.indexOf('u47-g3-s5'));
 assert.ok(ids.indexOf('u47-g3-l1')<ids.indexOf('u47-g3-p2'));
 assert.ok(ids.indexOf('u47-g3-p2')<ids.indexOf('u47-g3-o1'));
 assert.equal(g3.steps.find(s=>s.id==='u47-g3-p2').phrase,'u47-g3-order');
 assert.equal(u47.phrases['u47-g3-prereq-review'].practice,false);
 assert.doesNotMatch(u47.phrases['u47-g3-prereq-review'].text,/吃了東西就吐/);
 assert.equal(u47.phrases['u47-d2t02-full'].text,'昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。');
});


test('Lesson 15 support and source-data phrases stay out of productive adaptive and Mega practice',()=>{
 const completed=new Set(
  baseline.modules
   .filter(m=>m.bookId==='book-1'&&m.order>=45&&m.order<=48)
   .flatMap(m=>m.lessons.map(l=>l.id))
 );
 const ids=new Set(learnedPracticeItems(completed).map(item=>item.id));
 for(const phraseId of [
  'u46-thanks-nin',
  'u46-a004-support-sorry',
  'u46-a004-response-1',
  'u46-a004-response-2',
  'u46-a004-response-3',
  'u47-d2t01-07-integrated',
  'u48-minute-support',
  'u48-a001-table',
  'u48-prescription-support',
  'u48-prescription-visual',
 ]){
  assert.equal(ids.has('phrase:'+phraseId),false,phraseId+' must not enter productive practice');
 }
});

test('Pinyin Search learner results unlock only after the owning lesson',()=>{
 assert.equal(searchLearnedVocabulary('yisheng',new Set()).some(item=>item.traditional==='醫生'),false);
 assert.equal(searchLearnedVocabulary('yisheng',new Set(['u45-doctor'])).some(item=>item.traditional==='醫生'),true);
 const through47=new Set(
  baseline.modules
   .filter(m=>m.bookId==='book-1'&&m.order<=47)
   .flatMap(m=>m.lessons.map(l=>l.id))
 );
 assert.equal(searchLearnedVocabulary('huijia',through47).some(item=>item.traditional==='回家'),false);
 through47.add('u48-advice');
 assert.equal(searchLearnedVocabulary('huijia',through47).some(item=>item.traditional==='回家'),true);
});

test('Lesson 15 A004 preserves all three frozen response outcomes without promoting them to practice',()=>{
 const u46=baseline.modules.find(m=>m.unit.id==='unit-46');
 const lesson=u46.lessons.find(l=>l.id==='u46-doctor-visit');
 const expected=[
  ['u46-a004-r1','u46-a004-response-1','好的，沒有問題。'],
  ['u46-a004-r2','u46-a004-response-2','太好了。'],
  ['u46-a004-r3','u46-a004-response-3','對不起，我不知道是你的。'],
 ];
 for(const [stepId,phraseId,text] of expected){
  const step=lesson.steps.find(s=>s.id===stepId);
  assert.ok(step,stepId+' missing');
  assert.equal(step.phrase,phraseId);
  assert.equal(u46.phrases[phraseId].text,text);
  assert.equal(u46.phrases[phraseId].practice,false);
 }
});

test('Lesson 15 assessed prompts and choices do not require hidden grammar IDs',()=>{
 for(const unit of baseline.modules.filter(m=>m.bookId==='book-1'&&m.order>=45&&m.order<=48)){
  for(const step of unit.lessons.flatMap(l=>l.steps)){
   if(!['select','listen','order'].includes(step.type))continue;
   const learnerText=[step.prompt,...(step.options||[]),step.answer].filter(Boolean).join(' ');
   assert.doesNotMatch(learnerText,/\bG00[1-7]\b/,step.id+' exposes an internal grammar ID');
   assert.doesNotMatch(learnerText,/lexically available before/i,step.id+' tests curriculum sequencing metadata');
  }
 }
});

test('Unit 47 integrated replay preserves D2T01 through D2T07 cumulatively',()=>{
 const u47=baseline.modules.find(m=>m.unit.id==='unit-47');
 const lesson=u47.lessons.find(l=>l.id==='u47-refuse-help');
 const step=lesson.steps.find(s=>s.id==='u47-integrated');
 assert.equal(step.phrase,'u47-d2t01-07-integrated');
 const phrase=u47.phrases['u47-d2t01-07-integrated'];
 assert.equal(phrase.practice,false);
 for(const turn of [
  '你怎麼了？臉色這麼難看。',
  '昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。',
  '你這麼不舒服，我陪你去看病，好不好？',
  '不用了。我在臺灣沒有健康保險。',
  '我陪你去學校的健康中心。那裡的醫生很好，對學生也很客氣。',
  '謝謝你。我想去藥局買藥就好了。',
  '你真的不去看病嗎？',
 ]) assert.ok(phrase.text.includes(turn),turn+' missing from integrated replay');
});
