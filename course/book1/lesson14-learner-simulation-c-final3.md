# Book 1 Lesson 14 — Learner Simulation C final-rerun-3

Simulation: **C — cumulative learner**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Scope: Units **42 → 43 → 44** on the current PR head.

I performed this simulation independently from the other final-rerun-3 learner reports.

## Cumulative simulation

### Unit 42 — weather, seasons, and the repaired A001 transfer

The cumulative learner reaches `u42-seasons-p1` after the season vocabulary and character sequence has already been taught. The learner-facing phrase card for `u42-home-country-model` visibly renders its note, which now says that the fixed sentence is only a model and explicitly instructs the learner, before continuing, to:

- describe the climate of their own home country/place in Chinese;
- state their own most-liked season;
- state their own least-liked season;
- give their own reason with 因為…所以…;
- say the answer aloud or write it on paper rather than simply copying the model.

In this simulation the learner therefore performs A001 in Unit 42 as personal production, rather than only recognizing the fixed model.

The following `u42-season-reason` card explicitly reinforces that its spring sentence is scaffold practice, not a substitute for the learner's personal response. The learner then retrieves the season/reason construction again in Unit 42 controlled and review work.

A005 remains a distinct source-transfer task. `u42-summer-write` separately instructs the learner to discuss Taiwan summer weather, a distinctive feature, fruit/food, and a common activity, then write the findings in Chinese on paper. A001 and A005 therefore remain separate assignments with different outputs.

Unit 42 still owns **11 canonical NEW forms** and **8 NEW characters**. Its review independently retrieves all 11 NEW vocabulary targets and all 8 NEW characters.

### Unit 43 — duration, imminence, and delayed Unit-42 retrieval

Unit 43 still owns **7 canonical NEW forms**, **6 NEW characters**, and three grammar systems:

1. completed duration;
2. duration accumulated up to now;
3. imminence with 快/要…了.

Its review retains delayed Unit-42 weather retrieval through `u43-review-cum1`, while the Unit-43 material itself is retrieved through its own review and later again in Unit 44.

All 6 Unit-43 NEW characters receive review handwriting retrieval.

### Unit 44 — cumulative comparison, delayed retrieval, and capstone

Unit 44 still owns **12 canonical NEW forms**, **7 NEW characters**, and two grammar systems:

1. 比…更…;
2. 沒有…那麼….

The Unit-44 review remains **41 steps**.

Delayed retrieval is intact:

- `u44-review-cum1` retrieves the Unit-42 rain-frequency question;
- `u44-review-cum2` retrieves Unit-43 duration-to-now;
- `u44-review-cum3` retrieves Unit-43 imminence;
- `u44-review-u43-1` through `u44-review-u43-4` reconstruct Unit-43 phrases covering 想家, 新年/父母, 十二月底, and 明年/紅葉.

All 7 Unit-44 NEW characters receive review handwriting retrieval.

The final capstone remains Chinese construction, not English outcome recognition:

- `u44-review-cap1` reconstructs the typhoon/weather outcome;
- `u44-review-cap2` reconstructs the seasons/preference reason outcome;
- `u44-review-cap3` reconstructs the comparison outcome;
- `u44-review-cap4` reconstructs the experience/duration outcome.

Each capstone phrase was taught earlier in the corresponding lesson before being ordered in the final review.

## Repaired A001 → later F002 retention

The repaired A001 is now actual Unit-42 personal production. It is not deferred until the end of Lesson 14.

`u42-home-country-model` occurs at the Unit-42 transfer lesson. The F002 capstone retrieval, `u44-review-cap2`, occurs **287 learner steps later**, after the rest of Unit 42, all of Unit 43, and the Unit-44 teaching sequence.

That means the Unit-44 F002 capstone is genuine delayed retrieval. It is not the learner's first actual A001 production.

The progression is therefore cumulative:

personal A001 production → fixed scaffold/controlled season-reason practice → Unit-42 review → intervening Unit-43 learning and retrieval → Unit-44 cumulative review → delayed F002 Chinese reconstruction.

The repaired personal task adds meaningful productive encoding in Unit 42 while the later fixed construction remains an appropriate delayed retrieval probe.

## Search, handwriting, Mega, and adaptive practice

The cumulative product behavior remains intact.

- Pinyin Search remains a **global canonical lookup** because search results are generated from the full vocabulary lookup rather than filtered by completion.
- Search writing practice is gated through `searchPracticeCharacters(...)` → `characterPracticeAvailable(...)`.
- `characterPracticeAvailable` requires completion of the character's first non-review owning lesson.
- The learning-app `start(...)` function independently blocks any `practice-<character>` lesson until that same gate is satisfied, so direct standalone practice cannot bypass first teaching.
- Character-library exploration may show a character before practice is unlocked, but its writing-practice button remains disabled until the owning lesson is complete.
- Mega Challenge uses `learnedVocabulary(completed)`; Lesson-14 vocabulary therefore becomes eligible only after its owning lesson is completed.
- Adaptive practice is built from `learnedPracticeItems(completed)` and removes items already marked Mega-mastered, preserving learned-only and adaptive behavior.

## Mandatory checks

| Check | Result |
|---|---|
| A001 is genuinely performed in Unit 42 rather than only recognized | PASS |
| Unit-44 F002 capstone is delayed retrieval, not the first actual A001 production | PASS |
| A005 remains separately assigned | PASS |
| All 30 canonical NEW forms remain intact | PASS — 30 total, 30 unique |
| All 21 NEW characters remain intact | PASS — 21 total, 21 unique |
| All five grammar systems remain intact | PASS — 3 in Unit 43, 2 in Unit 44 |
| Delayed Unit-43 retrieval remains intact | PASS |
| Search remains global while writing is first-teaching gated | PASS |
| Handwriting first-teaching gate remains intact | PASS |
| Mega/adaptive learned-only behavior remains intact | PASS |
| Final capstone still covers all four Lesson-14 outcomes | PASS |

## Findings

### BLOCKER

None.

### MAJOR

None.

### MINOR

None.

## Verdict

**PASS**

Simulation C passes with **0 BLOCKER** and **0 MAJOR** findings.
