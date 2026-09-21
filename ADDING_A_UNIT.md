# Adding one approved Hanzi Steps unit

Read this file, the supplied specification, `course/schema.ts` (the exact types),
and `course/index.json`. Do not reread earlier units or app code. If a presentation
example is needed, read only the immediately preceding unit. Do not research the
textbook during implementation of an already approved specification.

## Pacing when planning a new unit

The user is comfortable with around **10–13 genuinely new vocabulary words or
forms per unit** (2026-09-12). Choose the amount to fit the topic and prerequisites;
this is a flexible range, not a quota or a seven-word limit. Count new words and
new characters separately. Keep six teaching lessons plus a review, and teach
every prerequisite before testing it.

**Standing pacing rule (2026-09-21): textbook lesson boundaries are not Hanzi Steps
unit boundaries.** Do not create a thin or nearly empty unit merely to stop at the
end of a textbook lesson or grammar cluster. Rebalance adjacent Hanzi Steps units
so each has a meaningful lexical and practice load. Once the current textbook
lesson is materially covered, a later Hanzi Steps unit may begin the next textbook
lesson when that produces a better learning unit. If a small number of source items
are blocked by a verified handwriting/source constraint, carry them forward
explicitly in the coverage map rather than padding a unit or silently dropping them;
do not call the earlier textbook lesson complete until those items are resolved.
Never inflate the count with transparent combinations just to hit the target.

## Files to author (normally three)

1. `course/book1/unit09.ts` — one `UnitData` default export. Other books use
   `book2`, `book3`; zero-pad the within-book unit number.
2. `course/book1/unit09.strokes.json` — only that unit's NEW characters, in the
   same order, each `{strokes: string[], medians: [number, number][][]}`. Preserve
   the licensed Taiwan glyphs, their source entries and attribution. An added
   glyph source can require one small provenance file/update in `public/`.
3. `course/manifest.json` — append one entry to the book's `units` array:
   `{"id":"unit-9","order":9,"title":"<approved title>","path":"course/book1/unit09.ts"}`.

The three generated outputs are committed too, but never hand edited:
`course/registry.generated.ts`, `course/index.json`, `lib/stroke-data.json`.
No renderer, progress, navigation, auth, CSS or deployment configuration changes
are needed. The generated runtime module lets Vite bundle curriculum; there is no per-unit
HTTP fetch at startup. Authoring-only indexes/review declarations are excluded
from production, and repeated long strings share build-time constants. `lib/curriculum.ts` is a stable app adapter, not an authoring file.

## UnitData contract

Start the unit with `import type {UnitData} from '../schema.ts'`, assign
`const unit:UnitData = {...}`, and `export default unit`. No imports from other
units, application components or the old compatibility facades are needed.

| Field | Required contents |
|---|---|
| `schemaVersion`, `bookId`, `order` | `1`, existing book ID, within-book position |
| `unit` | All existing `Unit` metadata: stable `id`, `number`, optional `displayNumber`, `theme`, `label`, `title`, `description`, `chars`, `lessonIds`, `banner`, `goal`, `grammarIds`, optional `bookReference` |
| `lessons`, `reviewLessonId` | Ordered complete `Lesson[]`; the review's stable ID. Keep the supplied lesson/activity structure |
| `newVocabulary` | `{text,pinyin,meaning,lessonId,core,note?}[]`; `lessonId` must be in this unit. NEW means first formal teaching of that exact written word/form |
| `reviewVocabulary` | Exact strings already in the earlier vocabulary index; do not add duplicate NEW entries. `core` is the existing frequency-count flag, not NEW/REVIEW |
| `newCharacters`, `characters` | Explicit ordered first-time character cards, and matching `Record<string,Character>` records. Include every previously untaught Han character in NEW vocabulary |
| `reviewCharacters` | Previously taught characters present in `unit.chars`. Reuse their existing records; do not copy or redeclare them |
| `grammarRules` | New unit-owned `GrammarRule` records with stable IDs, title, pattern, explanation, examples, remember, optional words |
| `grammarIntroductions` | For each new rule: `{id,kind:'rule',ref:id,lessonId,stepId}` referencing its actual grammar teaching card |
| `reviewGrammar` | Existing earlier rule IDs referenced by review. Refer to them from steps/phrases; do not redeclare their first teaching |
| `phrases` | Unit-owned `Phrase` records with text, pinyin, meaning, note (may be empty), correct ordered tokens, optional grammarIds |
| `revisionStepIds` | IDs of activities deliberately reviewing prior material; `[]` if none |

`unit.chars` is the guided handwriting selection and may include REVIEW targets.
`newCharacters` drives “This unit's characters”. They are deliberately separate.
Each NEW character needs nonempty, character-specific `note`, `memory` and component
`parts[].description`; generic fallback text is a validation error. Its parts must
cover every stroke exactly once. All current character fields, optional part quiz,
audio text, layout labels, examples and handwriting configuration are supported by
`Character` in the schema.

Use explicit, stable lesson and activity IDs (e.g. `u9-meeting`, `u9-meeting-01`).
Book 1 uses `unit-N`; Book 2 uses `book-2-unit-N`. Never renumber existing IDs or
reorder existing lesson steps: saved progress stores positions. Character practice
IDs remain `practice-字`. Existing retired Unit 7/8 mappings stay in
`lib/lesson-revisions.ts`; do not touch them for an addition. Old Book 2 `number`
values are historical; leave them and their `displayNumber` unchanged.

## Activity payloads (all have `id` and `type`)

| Type | Data / correct-answer source |
|---|---|
| `intro`, `trace`, `complete`, `memory` | `char`; teaching/recognition uses the character record and geometry |
| `build` | `char`; correct component order comes from `parts[].strokes` |
| `parts` | `char`, `prompt`, `options`, `answer`, `explanation` (or the character's `partQuestion`) |
| `select` | `prompt`, `options`, `answer`, `explanation`; optional `char`, `grammarIds` |
| `listen` | `char`, `options`, `answer`, `explanation`; prompt optional |
| `match` | `chars`; correct pairs use those characters' meanings |
| `grammar` | `grammar` ID |
| `phrase` | `phrase` ID |
| `order` | `phrase` ID and `tokens` bank; the phrase's tokens are the correct answer. Include repeated tokens with their exact multiplicity; extra distractors are allowed |

Every referenced character, phrase and rule must exist in this or an earlier unit.
Explain before testing as required by the approved specification. Validators check
structure; they do not certify nuanced Chinese, pinyin, translation or pedagogy.

## Index and course order

`course/index.json` uses named `columns` plus one compact row per vocabulary word,
character and grammar concept. Each row identifies its first book/unit/lesson;
character lesson is null if formally taught on the unit's standalone character
cards. Grammar also names its teaching activity. Unit 1's original phrase-note
teaching is indexed under `phrase-note:*` without changing the UI. Grammar identity
is explicit, not a software guess about semantic equivalence.

Order is the manifest's books, then each book's units, then lesson/activity order.
For an insertion, only earlier entries count as already taught. Get the relevant
small view with `npm run course:context -- --book book-1 --before 9`.
The full index also reveals later-book declarations. If an approved specification
moves a later book's first teaching earlier, validation reports that conflict;
resolve it explicitly within that approval, never silently edit old content.
`course/legacy/` preserves standalone practice retained by the live rebalance;
these entries are not falsely counted as formally taught.

## Check, build and publish

### Local/manual path

When a shell is available, run:

```sh
npm run course:generate
npm run course:check
npm run course:test -- unit-9
npm run check:characters
node --experimental-strip-types --test tests/vocabulary-lookup.test.mjs tests/mega-challenge.test.mjs validation/*.test.mjs
npx tsc --noEmit
npm run build:pages
```

Generation validates before writing. Validation fails if generated files are stale.
The targeted check validates the curriculum graph, the changed unit's navigation/checkpoints/practice,
and the lossless compatibility fixtures.

### Remote/autonomous path — REQUIRED when no local shell is available

Do **not** stop or report that the unit cannot be completed merely because the current agent cannot
run npm locally. The repository's pull-request workflow is the supported remote execution path.

1. Read the latest `main` and verify the current published Book 1 endpoint.
2. Work on a fresh branch from that exact `main` commit. If an earlier automation branch/PR is incomplete,
   resume and finish it instead of creating duplicate units.
3. Author the unit module(s), handwriting JSON, audit/source notes when used by surrounding units, and update
   `course/manifest.json`. Resolve any legitimate later-book first-teaching conflict explicitly and minimally.
4. Open a pull request to `main`. The permanent **Feature QA** workflow will:
   - install dependencies,
   - run `course:generate`,
   - run `course:check`,
   - run targeted tests for every changed unit module,
   - run character coverage,
   - run regression/validation tests,
   - run TypeScript,
   - run the GitHub Pages build,
   - and commit the generated curriculum artifacts back to the PR branch if they changed.
5. Inspect the workflow result. If any step fails, read the failing job log, fix the real defect on the same branch,
   and repeat until the **latest PR head** has a successful QA run. Never merge a red or untested head.
6. Confirm the PR diff contains only the intended curriculum/integration changes. Then merge the PR.
7. Wait for **Deploy Hanzi Steps to GitHub Pages** on the merge commit and require both build and deploy jobs to succeed.
8. Verify `main` contains the new units and generated artifacts after deployment. Perform a final live smoke check when
   the production URL is available to the agent.

The production repository is `Weather-Mister/hanzi-steps`. Production is GitHub Pages; the old ChatGPT Sites/Hatchable
deployment path is retired for Hanzi Steps and must not be used.

The user has already authorized publishing verified curriculum additions. Do not ask for another confirmation once all
required QA is green.


## Quality guardrails after the Units 21–25 audit

Read `docs/BOOK1_COMPLETION_PROMPT.md` for the full source and learner-quality workflow.
Passing the schema/build is insufficient: audit negatives, questions, restrictions,
new/review classifications, all example characters, and actual component usefulness.
The regression gates now check Book 1 phrase/example character coverage from Unit 21,
explanation before referenced assessments, and from Unit 23 a review with at least
18 activities, three listening tasks and assessment of every new grammar target.
These floors do not justify filler. Do not weaken the tests to fit thin content.

`course:test` accepts ONE unit ID per invocation. Run it separately for every changed
unit. When appending to published lessons, preserve all historical complete bounds as
well as partial step positions; existing `previousLessonLengths` records must not be
overwritten by later extensions. Use an explicit migration if sequence changes are needed.
