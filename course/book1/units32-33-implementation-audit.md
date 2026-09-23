# Units 32–33 implementation audit

## Curriculum design
- Unit 32: 14 formal NEW vocabulary items, 14 first-taught characters, 2 new grammar rules, six teaching lessons + review.
- Unit 33: 13 formal NEW vocabulary items, 14 first-taught characters, 3 new grammar rules, six teaching lessons + review.
- Both reviews contain 22 activities and at least three contextual listening items.
- The split now follows the textbook dialogue boundary exactly: Unit 32 completes Dialogue I; Unit 33 begins with Dialogue II.

## Source/content corrections made during audit
- Corrected a serious room-layout error: the textbook says **廚房在左邊** and **右邊有浴室**; it does not say 客廳在左邊.
- Restored 捷運站 to the nearby-environment sentence.
- Restored 房間裡面可以上網嗎 and the landlord's 怎麼樣 / 想租嗎 decision sequence.
- Moved 再 into Unit 32 because it belongs to Dialogue I's closing line 我回去想想，再打電話給你.
- Promoted 等 děng “wait for” to genuine NEW Vocabulary II rather than falsely treating it as earlier vocabulary.
- Restored the source's **得 děi = must / have to** in 不過你得自己付錢 and explicitly distinguished it from 得 de.
- Corrected 像 to the 14-stroke Traditional AnimCJK geometry used by the hydrator.
- Tightened existential 有 to the textbook's indefinite-subject rule, 沒有 negation, and information-focus contrast.
- Tightened 會 to the textbook distinction: acquired skill vs possibility/likelihood.
- Tightened zero-pronoun teaching to all three source cases: context-predictable subject, previously mentioned subject, previously mentioned object.


- The textbook's context-predictable zero-pronoun example 請進 uses 進, which Hanzi Steps has not taught yet. The learner exercise uses already-taught 請坐 for the same omitted-你 function; the source concept is preserved without violating teach-before-test.

## Traditional Chinese
Learner-facing content is regression-checked against common Simplified leaks. Traditional forms such as 廳、廚、間、線、視、關、經、慣、這、裡、話、東 are required.

Stroke ownership was reconciled so moved first-teaching characters do not remain duplicated in later Book 2 or legacy handwriting files. The hydrator prefers Traditional AnimCJK rows and may only fall back to geometry for the identical Unicode character; it must never substitute a Simplified character.

## First-teaching migration
Book 2 retains all stable lessons and activities, while 走、左、右、路、超、過、再 are reclassified there as previously taught characters. 再 is REVIEW vocabulary in Book 2 Unit 3. Legacy 房 handwriting ownership moves to Unit 32.

## Validation required before merge
The exact final PR head must pass:
- declared stroke hydration;
- curriculum generation + graph validation;
- targeted Unit 32 and Unit 33 tests separately;
- character coverage;
- the full regression suite including this source/Traditional audit;
- TypeScript;
- Pages build.

If Feature QA writes generated artifacts/strokes and changes the PR head, the resulting head must receive another complete successful Feature QA run before merge.

## Exact-head recheck
A fresh Feature QA run is required on this post-audit head; generated stroke/curriculum artifacts must be committed by CI and the resulting head must pass again before merge.

## Final exact-head gate
The generated curriculum/stroke artifacts were refreshed by Feature QA after the full curriculum and regression suite passed. A final human-authored no-curriculum-change commit is used only to trigger the exact generated state through Feature QA again; CI should report the artifacts already current and must not alter the head before merge.
