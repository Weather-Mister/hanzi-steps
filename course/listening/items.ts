import type {ListeningItem} from '../materials/schema.ts';
/** Each correct interpretation is resolved from the course phrase, not copied.
 * English distractors are reviewed against the full sentence. Payload fixtures
 * must be re-reviewed when any source or option changes. */
export const listeningItems:ListeningItem[]=[
 {id:'identity',source:{kind:'phrase',id:'identity'},modes:['meaning','pinyin'],reason:'The speaker identifies themself as a student.',distractors:[
  {text:'Are you a student?',rationale:'The audio is a statement, not a question about you.'},
  {text:'I am not a student.',rationale:'There is no negative in the audio.'}]},
 {id:'two-books',source:{kind:'phrase',id:'u3-two-books'},modes:['meaning','pinyin'],reason:'The speaker has two books; listen for the number and measure word.',distractors:[
  {text:'I have one book.',rationale:'The quantity is two, not one.'},
  {text:'I do not have any books.',rationale:'The statement is positive.'}]},
 {id:'swimming-opinion',source:{kind:'phrase',id:'u8-fun'},modes:['meaning','pinyin'],reason:'This is an opinion about swimming being fun, not a plan or dislike.',distractors:[
  {text:'I think swimming is not fun.',rationale:'There is no negation of the description.'},
  {text:'I think taking photos is fun.',rationale:'The activity is swimming, not photography.'}]},
 {id:'buy-for-her',source:{kind:'phrase',id:'u13-buy-for-her'},modes:['meaning','pinyin'],reason:'The request is to buy one cup of tea for her; the beneficiary matters.',distractors:[
  {text:'Please buy a cup of tea for me.',rationale:'The beneficiary is her, not the speaker.'},
  {text:'Please buy two cups of tea for her.',rationale:'Only one cup is requested.'}]},
 {id:'spicy-noodles',source:{kind:'phrase',id:'u16-spicy-noodles'},modes:['meaning','pinyin'],reason:'Both clauses matter: the beef noodles taste good, but are a little spicy.',distractors:[
  {text:'This bowl of beef noodles is delicious and not spicy.',rationale:'The second clause says a little spicy.'},
  {text:'This bowl of beef noodles is a little expensive.',rationale:'The stated problem is spiciness, not price.'}]},
 {id:'shop-location',source:{kind:'phrase',id:'u19-shop-location'},modes:['meaning','pinyin'],reason:'The shop is near the school, not inside it.',distractors:[
  {text:'That shop is inside the school.',rationale:'Near does not mean inside.'},
  {text:'That shop is far from the school.',rationale:'The location is nearby, not far away.'}]},
 {id:'game-end',source:{kind:'phrase',id:'u22-game-end'},modes:['meaning','pinyin'],reason:'The game ends at half past six. Do not confuse ending with starting.',distractors:[
  {text:'The game starts at 6:30.',rationale:'The verb is end, not start.'},
  {text:'The game ends at 4:30.',rationale:'The hour is six, not four.'}]},
 {id:'mrt-faster',source:{kind:'phrase',id:'u25-mrt-faster'},modes:['meaning','pinyin'],reason:'The MRT is the faster of the two compared forms of transport.',distractors:[
  {text:'Taking the train is faster than taking the MRT.',rationale:'This reverses the comparison.'},
  {text:'Taking the MRT and taking the train are equally fast.',rationale:'The sentence expresses a difference, not equality.'}]},
 {id:'last-month',source:{kind:'phrase',id:'u31-hotel'},modes:['meaning','pinyin'],reason:'The time is last month and the place is a hotel.',distractors:[
  {text:'Next month I will stay at a hotel.',rationale:'The time expression refers to last month.'},
  {text:'Last month I stayed at school.',rationale:'The place is a hotel, not school.'}]},
 {id:'finished-dinner',source:{kind:'phrase',id:'u39-le-positive'},modes:['meaning','pinyin'],reason:'The action of eating dinner is presented as completed.',distractors:[
  {text:'I did not eat dinner.',rationale:'There is no negative; the action is completed.'},
  {text:'I want to eat dinner.',rationale:'The sentence reports the action rather than a wish.'}]},
 {id:'few-friends',source:{kind:'phrase',id:'u46-ji-expansion'},modes:['meaning','pinyin'],reason:'In this statement, the quantity is small; it is not a how-many question.',distractors:[
  {text:'How many friends does she have?',rationale:'This is a statement, not a question.'},
  {text:'She has many friends.',rationale:'This reverses the small-quantity meaning.'}]},
 {id:'recipient',source:{kind:'phrase',id:'u48-gen-recipient'},modes:['meaning','pinyin'],reason:'The teacher is being addressed: this is the recipient use of the word.',distractors:[
  {text:'Speak about the teacher.',rationale:'The teacher is the addressee, not the topic.'},
  {text:'Listen to the teacher.',rationale:'The action is speaking, not listening.'}]},
 {id:'directions',source:{kind:'phrase',id:'b2u1-l4-model'},modes:['meaning','pinyin'],reason:'The route begins here and goes forward.',distractors:[
  {text:'Walk back here.',rationale:'This reverses the direction and endpoint.'},
  {text:'Turn right here.',rationale:'There is no right turn in this instruction.'}]},
 {id:'simultaneous',source:{kind:'phrase',id:'b2u4-l2-model'},modes:['meaning','pinyin'],reason:'The same people eat noodles and look at the map at the same time.',distractors:[
  {text:'They look at the map after eating noodles.',rationale:'The actions overlap, rather than happening in sequence.'},
  {text:'They eat noodles without looking at the map.',rationale:'Both actions are happening.'}]},
];
/** Representative existing scenes. No copied transcripts or new vocabulary. */
export const listeningSceneIds=['reading-unit-13','reading-unit-31','reading-book-2-unit-4'];
