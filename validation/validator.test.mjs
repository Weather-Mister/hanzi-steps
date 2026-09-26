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
