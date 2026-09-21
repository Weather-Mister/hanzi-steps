# Units 28–29 rebalancing audit

## Reason for repair

The original published split was structurally valid but pedagogically thin: Unit 28 had
5 new lexical items and Unit 29 had 6. The repair follows the standing project rule that
textbook lesson boundaries are not Hanzi Steps unit boundaries.

## New load after rebalance

### Unit 28 — How Long and When?
- 11 genuinely new vocabulary/forms.
- 8 new characters.
- 4 new grammar targets.
- 22 review activities with 3 listening items.

### Unit 29 — If I Have Time, I’ll Try It
- 11 genuinely new vocabulary/forms.
- 8 new characters.
- 3 new grammar targets: calendar dates, 要是…就…, and VV看.
- 20 review activities with 3 listening items.

No transparent combination is promoted merely to inflate the count. 塊 receives a
new source-supported food-piece sense note but remains REVIEW because the exact written
word was formally taught earlier.

## Source and pedagogy

- Unit 28 finishes the supported Lesson 9 duration system and absorbs the remaining
  supported Lesson 9 lexical first-teaching previously isolated in Unit 29.
- Unit 29 retains its already published date/condition instruction and uses the freed
  lexical capacity to begin Lesson 10 Dialogue I / Vocabulary I and VV看.
- Unit 29 teaches fruit/category words before testing them, separates 香 (smell) from
  甜 (taste), teaches 對 as conversational “right/correct,” and introduces 以前 and
  機會 before using them in transfer.
- VV看 is explained before assessment, including the textbook restriction against
  normally placing an object directly after 看.
- Review items sample the new vocabulary and independently assess all three Unit 29
  grammar targets.

## Handwriting

- Unit 28 takes ownership of the already verified 月、號、就、貓 geometry in addition
  to 年、日、鐘、頭.
- Unit 29 declares AnimCJK graphicsZhHant hydration for 水、果、黃、色、芒、給、香、瓜.
- Character notes and component groups are character-specific and cover every declared
  stroke exactly once.
- 逛 and 臺 remain explicit blockers; no Simplified/Japanese substitution is used.

## Saved-progress compatibility

The first production release of Units 28–29 is treated as a persisted checkpoint.
No existing lesson ID, step ID, or existing step position is renumbered or reordered.
New teaching/practice is appended to published teaching lessons. Unit 29 review keeps
the same 20 IDs and positions while its question content is rebalanced to assess the
expanded unit.

The pre-rebalance complete bounds are recorded in `lib/lesson-revisions.ts`:
- Unit 28: u28-film 5, u28-years-days 14, u28-hours 13, u28-separable 6, u28-review 20.
- Unit 29: u29-date 16, u29-hai 5, u29-maokong 9, u29-condition 10,
  u29-negative 4, u29-integrate 6, u29-review 20.

Old partial indexes therefore continue to point at the same original steps, while old
completed lessons retain completion credit after the append-only extension.

## Remaining source debt

Lesson 9 is not called complete until 逛 and 臺東 are resolved with acceptable verified
Taiwan Traditional handwriting geometry. Lesson 10 is only started here; 紅色 and the
rest of its still-uncovered source material remain for subsequent units.

## Verification requirement

Feature QA must hydrate Unit 29 geometry, regenerate curriculum artifacts, run targeted
tests separately for Unit 28 and Unit 29, character coverage, the regression suite,
TypeScript, and the Pages build. After generated artifacts land, the exact final PR head
must receive a green QA run before merge, followed by a successful Pages build and deploy
for the merge commit.
