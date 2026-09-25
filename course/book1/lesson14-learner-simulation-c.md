# Book 1 Lesson 14 — Learner Simulation C

Simulation: **Stage 7 — cumulative learner**  
Scope: **Book 1 Lesson 14 / Units 42–44**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Reviewed head: `b1840c3f2865e84375126f3b9648175d83e7328a`

Independence note:
- I did **not** read `course/book1/lesson14-learner-simulation-a.md`.
- I did **not** read `course/book1/lesson14-learner-simulation-b.md`.
- This report is based on the Stage-7 handoff, frozen Lesson-14 blueprint/activity packet, actual Units 42–44, `course/index.json`, and only the shared Search/Mega/practice implementation needed to verify cumulative learner progression.

## Verdict

**FAIL**

Open findings:
- **BLOCKER: 1**
- **MAJOR: 2**
- **MINOR: 0**

PASS requires zero open BLOCKER and zero open MAJOR.

---

## BLOCKER

### C-B01 — Pinyin Search exposes and can open writing practice for future Lesson-14 material before the owning lesson

**Blast radius: CROSS_UNIT**

The frozen activity contract says the 30 canonical NEW vocabulary forms receive normal Search/Mega eligibility **after their owning lesson**.

Mega and adaptive practice honor that timing:
- `learnedVocabulary(completed)` filters vocabulary by `completed.has(item.lessonId)`.
- `eligibleMegaVocabulary` and `learnedPracticeItems` consume that learned-only set.
- Character fallback practice also requires a completed non-review lesson containing the character.

Pinyin Search does not honor the same prerequisite boundary:
- `components/pinyin-search.tsx` calls `searchVocabulary(query, 81)` without learner completion state.
- `searchVocabulary` searches the complete global `vocabularyLookup`, which is built from all course vocabulary.
- Search results expose a Practice action for glyphs with stroke data via `uniquePracticeCharacters(item)` and `onPracticeCharacter`.

Therefore a learner who has not reached Unit 42/43/44 can search a Lesson-14 pronunciation, see the future canonical vocabulary, and for covered glyphs enter character practice before its scheduled introduction. This is not merely early passive indexing; it bypasses the lesson prerequisite sequence and handwriting introduction order.

The 30 Lesson-14 canonical entries themselves are correctly owned in `course/index.json`, and Mega/practice unlock correctly by owning lesson. The defect is specifically the shared Pinyin Search path.

**Why this blocks:** Stage 7 explicitly requires checking whether practice systems expose anything before it is learned. This path does.

---

## MAJOR

### C-M01 — The explicit Lesson-14 capstone tests outcome metadata instead of demonstrating the four Chinese outcomes

**Blast radius: ACTIVITY**

The frozen blueprint requires **B1L14-S001–S004 cumulative retrieval in the Unit-44 capstone/review**.

The four explicit capstone steps are:
- `u44-review-cap1`: “Which task demonstrates the weather/typhoon outcome?”
- `u44-review-cap2`: “Which task demonstrates the seasons/preference outcome?”
- `u44-review-cap3`: “Which task demonstrates the comparison outcome?”
- `u44-review-cap4`: “Which task demonstrates the experience outcome?”

All four are English multiple-choice questions about what a learner *would do* to demonstrate an outcome. They do not require the learner to interpret, select, construct, or retrieve the Chinese language that constitutes those outcomes.

The surrounding Unit-44 review does contain useful Chinese retrieval — weather interview language, comparison items, duration contrast, and imminence — but the artifact explicitly designated as the four-outcome capstone is metacognitive curriculum-label recognition rather than a real four-outcome cumulative performance sample.

**Why this is major:** the content is taught elsewhere, so this is not a source omission, but the final capstone is materially weaker than its stated assessment role and does not itself establish S001–S004 mastery.

---

### C-M02 — Unit-43 delayed/cumulative lifecycle promises are not actually carried into Unit 44 for several targets

**Blast radius: CROSS_UNIT**

The frozen Unit-43 activity spec explicitly assigns delayed/cumulative retrieval as follows:
- **想 “miss” → Unit44 capstone**
- **新年 / 父母 → capstone**
- **十二月底 → capstone plans**
- **明年 / 紅葉 → capstone**

Actual Unit 44 does not provide meaningful delayed retrieval for those promised targets:
- `父母` does not occur in Unit 44.
- `十二月底` does not occur in Unit 44.
- `想家` appears only as a distractor in an unrelated caution-listening item, not as a keyed retrieval of 想 = “miss”.
- `新年`, `明年`, and `紅葉` appear only as distractors/contrast options rather than as the promised cumulative capstone retrieval.
- The explicit capstone contains none of these Unit-43 lexical/sense targets.

By contrast, Unit-43 grammar retention is substantially better:
- G001/G002 remain contrasted in the Unit-44 duration cumulative item.
- G003 survives strongly through `颱風快要來了`.
- `停` is retrieved in the Unit-44 source sequence.

So the defect is not a general failure of Unit-43 retention; it is a mismatch between the frozen Unit-43 lifecycle commitments and what the Unit-44 capstone actually retrieves.

**Why this is major:** the Stage-7 cumulative lifecycle is incomplete for explicitly promised delayed targets, and the inconsistency crosses frozen activity specs.

---

## Checks that passed

### Unit 42 → Units 43/44 retention

PASS.

Unit-42 material is meaningfully retrieved later:
- Unit 43 retrieves summer/rain weather and uses rain with imminence.
- Unit 44 reuses rain, wind, snow questions, all four seasons, seasonal comparison, and weather-interview language.
- Unit-42 material is not confined to its own review.

### Unit 43 duration/imminence → Unit 44

PASS for the formal grammar systems.

- G001/G002 remain distinguishable in Unit 44 through the accumulated-duration item and its completed-duration alternatives.
- G003 receives strong delayed retrieval through the typhoon sequence and Unit-44 review.

### Canonical NEW vocabulary ownership / generated index

PASS.

`course/index.json` contains exactly the intended 30 Lesson-14 canonical NEW forms at their specified owner lessons:
- Unit 42: 11
- Unit 43: 7
- Unit 44: 12

No duplicate canonical ownership was found for `想`, `快`, or `要`; their index ownership remains in earlier units.

### Mega / adaptive practice unlock timing

PASS.

The shared learned-vocabulary path uses completion of the owning lesson, so Lesson-14 canonical vocabulary enters Mega/adaptive practice only after the relevant lesson is complete.

### 想 / 快 / 要 ownership and Lesson-14 sense teaching

PARTIAL PASS, with C-M02 above.

- Prior canonical ownership is preserved.
- Unit 43 explicitly teaches and reviews 想 = “miss”, 快 = “soon/almost”, and 要 as the Lesson-14 imminence/future auxiliary.
- Unit 44 strongly retrieves 快/要 through `快要…了`.
- 想 = “miss” lacks the frozen promised delayed/capstone retrieval.

### NEW character retrieval

PASS.

All 21 NEW characters receive:
- lesson-local introduction/trace/build-or-complete/memory work;
- later `complete` handwriting retrieval in their unit review.

Counts match the frozen ownership:
- Unit 42: 8
- Unit 43: 6
- Unit 44: 7

The shared practice engine also makes learned characters available only after a completed lesson.

### Review balance

PASS overall, aside from the capstone/delayed-retrieval findings above.

- Unit 42 review: weather/seasons + 11 canonical forms + 8 handwriting targets + weather-question bridge.
- Unit 43 review: 7 canonical forms + all three expansion senses + G001/G002/G003 + 6 handwriting targets + Unit-42 delayed retrieval.
- Unit 44 review: 12 canonical forms + G004/G005 + 7 handwriting targets + Unit-42/43 cumulative items + transfer/culture.

### Cumulative comparison system

PASS.

Unit 44 coherently distinguishes and mixes:
- `比較`
- plain `比`
- `比…更…`
- `跟…一樣`
- `沒有…那麼…`

The A003 temperature set uses higher/equal/lower comparisons in a way that requires selecting among the intended systems rather than treating them as interchangeable.

---

## Final Stage-7 Simulation-C status

**FAIL — do not advance on the basis of Simulation C.**

Required controller action under the handoff:
1. Reopen the smallest affected gate for the Search prerequisite exposure.
2. Reopen activity/cross-unit review for the capstone and missing delayed Unit-43 retrieval.
3. Repair in a controller/development context, not in this simulation context.
4. Re-run affected deterministic QA and a fresh cumulative learner simulation after repair.
