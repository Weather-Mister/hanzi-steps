import type {Lesson,Phrase,Step} from '../course/schema.ts';

export type LineExercise={
 stepId:string;
 unitId:string;
 incomingPhraseId:string;
 sender:string;
 setup:string;
 task:string;
};

// Occasional, authored exchanges within ordinary lessons. Every Chinese
// message and answer comes from existing course content; no steps are inserted
// or reindexed, so saved progress and grading keep their existing contracts.
export const lineExercises:readonly LineExercise[]=[
 {stepId:'hello-2',unitId:'unit-1',incomingPhraseId:'hello',sender:'Classmate',setup:'A classmate sends you a greeting on LINE.',task:'Greet them back.'},
 {stepId:'u3-here-question-1',unitId:'unit-3',incomingPhraseId:'u3-is-book-there',sender:'Classmate',setup:'Your classmate is checking where your book is.',task:'Your book is not there. Reply no.'},
 {stepId:'u6-review-5',unitId:'unit-6',incomingPhraseId:'u6-ask-brother',sender:'Classmate',setup:'You are chatting about your families.',task:'Say yes, you have one older brother.'},
 {stepId:'u8-v2-review-11',unitId:'unit-8',incomingPhraseId:'u8-invite',sender:'Classmate',setup:'Your classmate suggests swimming together tomorrow.',task:'Accept the invitation.'},
 {stepId:'u11-here-16',unitId:'unit-11',incomingPhraseId:'u11-here-question',sender:'Café',setup:'The café is confirming your order by message.',task:'Say it is for here, and thank them.'},
 {stepId:'u15-favorite-10',unitId:'unit-15',incomingPhraseId:'u15-favorite-food',sender:'Classmate',setup:'Your classmate asks about your favorite food.',task:'Say beef noodles are your favorite food.'},
 {stepId:'u18-review-07',unitId:'unit-18',incomingPhraseId:'u18-where-now',sender:'Classmate',setup:'Your classmate messages to find you.',task:'Tell them you are at school now.'},
 {stepId:'u21-review-08',unitId:'unit-21',incomingPhraseId:'u21-when-free',sender:'Classmate',setup:'You are finding a time to meet.',task:'Say you are free from seven in the morning until noon.'},
 {stepId:'u24-review-04',unitId:'unit-24',incomingPhraseId:'u24-how-school',sender:'Classmate',setup:'Your classmate asks about your journey to school.',task:'Say you take the train to school.'},
 {stepId:'u27-review-16',unitId:'unit-27',incomingPhraseId:'u27-suggestion-question',sender:'Classmate',setup:'Your classmate asks for an idea for going out.',task:'Recommend going to a night market.'},
 {stepId:'u30-review-08',unitId:'unit-30',incomingPhraseId:'u30-guess',sender:'Classmate',setup:'Your classmate sees your fruit photo and guesses correctly.',task:'Confirm that their guess is right.'},
 {stepId:'u33-review-o2',unitId:'unit-33',incomingPhraseId:'u33-install',sender:'Tenant',setup:'You are replying to a tenant about cable TV.',task:'Say yes, but they have to pay for it themselves.'},
 {stepId:'u36-review-o3',unitId:'unit-36',incomingPhraseId:'u36-hard-find',sender:'Classmate',setup:'You said you hope to find a job after going home. Your classmate asks what you will do if it is hard to find one.',task:'Say that then you will come back to Taiwan to study Chinese.'},
 {stepId:'u39-review-g2',unitId:'unit-39',incomingPhraseId:'u39-le-question',sender:'Classmate',setup:'Your classmate checks whether you have eaten dinner.',task:'Say you did not eat dinner.'},
 {stepId:'u42-spring-o1',unitId:'unit-42',incomingPhraseId:'u42-weather-cold',sender:'Classmate',setup:'Your classmate comments on the cold weather.',task:'Say you are sensitive to the cold and prefer spring.'},
 {stepId:'u45-runny-o1',unitId:'unit-45',incomingPhraseId:'u45-health-inquiry',sender:'Classmate',setup:'You said you feel unwell. Your classmate asks about it.',task:'Say you have continuously had a runny nose.'},
 {stepId:'u48-advice-s3',unitId:'unit-48',incomingPhraseId:'u48-d2t09',sender:'Classmate',setup:'Your classmate sends a caring message while you are unwell.',task:'Thank them for their concern.'},
 {stepId:'b2u2-l7-order-3',unitId:'book-2-unit-2',incomingPhraseId:'b2u2-l5-model',sender:'Classmate',setup:'Your classmate needs to find an ATM.',task:'Tell them the convenience store over there has an ATM.'},
];

const byStep=new Map(lineExercises.map(exercise=>[exercise.stepId,exercise]));
export function lineExerciseForStep(step:Step,lesson:Lesson,phrases:Record<string,Phrase>):LineExercise|undefined{
 const exercise=byStep.get(step.id);
 if(!exercise||exercise.unitId!==lesson.unitId||!phrases[exercise.incomingPhraseId])return undefined;
 return step.type==='order'||step.type==='select'?exercise:undefined;
}
