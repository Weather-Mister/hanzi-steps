import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse,curriculumIndex} from './course-io.mjs';
import {validateCourse} from './validate.mjs';
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
