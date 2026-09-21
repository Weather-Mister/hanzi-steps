# Hanzi Steps — continue Book 1 without lowering quality

Copy everything below into a tool-enabled GPT-5.6 chat with the Book 1 textbook attached.

---

You are maintaining CURRENT production Hanzi Steps. Continue Book 1 from its actual published endpoint until A Course in Contemporary Chinese Book 1 is fully covered. Work in batches of TWO units, publishing and verifying each batch before starting the next. Do not guess how many units the book needs. Do not begin Book 2.

Production repository: Weather-Mister/hanzi-steps
Production site: https://weather-mister.github.io/hanzi-steps/
Use the current GitHub Pages workflow. Sites/Hatchable is retired. Preserve the existing backend, accounts, UI and learning progress.

Your job is to do the work, not just propose it: verify the source → map coverage → design → implement → independently audit your work → fix → test → publish → verify the live result.

1. Establish current truth on EVERY batch

- Fetch current main and record its commit SHA. Inspect open PRs and incomplete work before choosing unit numbers. Finish or reconcile an incomplete batch first; never create duplicate units or overwrite newer changes.
- Read AGENTS.md if present, ADDING_A_UNIT.md, course/schema.ts, course/manifest.json, the cumulative course index, the immediately preceding unit and its source/audit notes, and the Units 21–25 repair audit.
- Use the cumulative index for context; inspect earlier lessons only to resolve concrete prerequisite or duplication questions. The index is not proof that a form has never been taught: inspect cited earlier examples when an apparently new item is a transparent combination or familiar phrase.
- Do not modify an unrelated project, auth configuration, CSS, deployment provider or backend as part of adding units.

2. Build an evidence-based source coverage map

- The attached A Course in Contemporary Chinese Book 1 is the primary authority. Open the relevant pages, including vocabulary, dialogues, grammar, usage notes and exercises. Distinguish printed page numbers from PDF page numbers. Inspect page images when extracted text is unclear.
- Track each relevant textbook item as already taught, included now, or deliberately deferred to a specified later unit/source section. Include negatives, questions, restrictions and contrastive uses—not just affirmative examples.
- Resolve unfinished items in the current textbook lesson before silently moving to another lesson. Do not call Book 1 complete until this map covers the whole book, with no unexplained gaps.
- Do not invent source references or claim to have read pages you could not access. Flag ambiguity and verify it before teaching; do not publish uncertain material.

3. Design real learning, not a filled template

- Keep six teaching lessons plus one review per unit. Around 10–13 genuinely new words/forms is a flexible pacing target, not a quota.
- Separately report new lexical items, new grammatical uses, transparent combinations, review expressions and new characters. Do not inflate novelty by relabelling phrases already explicitly taught. Move first-teaching declarations when necessary and explain the reconciliation.
- Give each lesson a concrete learner outcome and enough explanation to understand it: meaning, form, position, use/context, common confusion and contrasting examples where useful.
- Teach prerequisites before assessing them. A grammar ID in metadata is not an explanation. A vocabulary list outside the lesson is not proof the learner has encountered a word.
- Include cumulative retrieval and meaningful transfer: change the people, time, place or description while using known vocabulary. Repeating the exact demonstration sentence is guided practice, not proof of mastery.
- Reviews must independently assess every new grammar target, include listening and writing, and sample the vocabulary fairly. The repository now requires at least 18 review activities and 3 review listening activities for Book 1 from Unit 23. These are minimum checks, not a guarantee of quality. Aim for a varied review of roughly 18–22 useful activities, without filler.

4. Audit language and every exercise

- Use Traditional Chinese appropriate for Taiwan, accurate tone-marked pinyin, and correct translations. Follow the textbook's pronunciation conventions consistently. Verify polyphonic characters and contextual audio readings.
- Check Chinese, pinyin and English against each other, including negation scope, comparison direction, time, permissions and quantities.
- Give every multiple-choice question exactly one defensible answer in its stated context. Use plausible distractors, then explain why the key fits. Do not label a valid alternative wrong.
- Check every ordering exercise's token multiplicity and accepted sequence. If other arrangements have the same valid meaning, use supported alternatives or redesign the exercise so the intended answer is unambiguous. Do not assume the renderer accepts alternatives without checking it.
- Inventory all Han characters in vocabulary, assessed phrases and grammar examples—not just declared vocabulary. Proper names are not a loophole: explicitly introduce and support their characters, or use an already taught alternative.
- Separate actual teaching of a new word/sense from merely displaying it in an example. Never test an unsupported prerequisite.

5. Handwriting must be authentic and useful

- Use licensed Taiwan Traditional geometry with recorded source file, revision and attribution. Preserve existing validated geometry. Never fabricate paths or silently substitute Simplified/Japanese forms. If a glyph cannot be verified, resolve it or select another source-supported item.
- Check declared stroke counts, path counts, medians, coordinate orientation and rendered shape. Visually inspect new glyphs and component highlights.
- Write character-specific notes and memory cues. Every component label and description must match the actual highlighted strokes. Cover each stroke exactly once, with no omissions, overlaps or out-of-range indexes.
- For decomposable characters, provide meaningful component groups. Never make 騎, 計 or another clear compound a single whole-character tile merely to pass validation. Whole-character grouping is acceptable only when pedagogically justified for the actual character.
- Distinguish visual grouping from chronological stroke order when a surrounding component is written in separate stages. Explain interleaving clearly.
- “Practice all N strokes…” and “remember the shape” are not character teaching, even when the character name is substituted into the sentence.

6. Protect saved progress

- Existing lesson IDs, step IDs and step positions are persisted data. Do not renumber or reorder published sequences without an explicit compatibility migration and regression tests.
- Appending exercises can invalidate old completed checkpoints too. Preserve every historical completion length and verify old complete AND partial sessions. Do not overwrite an earlier compatibility record when adding another revision.
- Preserve login, saving, streaks and navigation. Make only necessary, bounded implementation changes.

7. Verify beyond “tests are green”

Perform a separate review pass after authoring. Review the unit as a learner and recheck it against the textbook, rather than rereading your own audit claims. Record concrete findings and fixes. Inspect explanation depth, load distribution, missing source items, repeated examples, distractors, audio targets, component usefulness and review coverage.

Run the repository's required gates on the final code:

- npm run course:generate
- npm run course:check
- npm run course:test -- <unit-id> separately for EACH changed unit; this command takes one unit, not a list
- npm run check:characters
- node --experimental-strip-types --test tests/vocabulary-lookup.test.mjs tests/mega-challenge.test.mjs validation/*.test.mjs
- npx tsc --noEmit
- npm run build:pages

Use current repository instructions if the commands evolve. Add a focused regression check for a newly discovered repeatable failure where useful. Never delete, weaken or rewrite a test expectation just to make faulty content pass. Structural tests do not certify Chinese or pedagogy.

Inspect the actual rendered learning experience: grammar cards, choices, ordering banks, component building, handwriting and review. Check narrow/mobile layout where possible. Never claim a browser/audio/handwriting check you did not perform. If device audio cannot be exercised, report that specific limitation.

8. Publish safely and carry work forward

- Create a focused branch/PR from the latest main. Inspect the complete diff.
- Require Feature QA success for the exact final PR head. If CI commits generated files, verify the resulting head too. Resolve real failures on the same branch.
- Merge the verified changes, then require the GitHub Pages build AND deploy jobs to succeed for the merge commit. Verify the new units and assets on the live site before advancing.
- If this environment cannot run local commands, use the repository's supported Feature QA workflow and inspect its logs; do not stop merely because a shell is unavailable. Never claim a command ran if only a remote equivalent ran.
- If context or execution limits stop the run, leave a durable checkpoint with exact branch, commit, PR, unit/source coverage, passed checks, unresolved defects and the next action. Report incomplete work honestly. Do not jump ahead or mark a half-finished unit complete.
- Continue batch by batch while execution permits. An unavailable source or failed safety/quality gate is a reason to resolve the problem, not to fabricate completion.

Final report after each published batch: unit numbers/titles; honest new-word and new-character counts; textbook sections covered and deferred; important corrections; checks actually performed; PR/commit and deployment result; remaining limitations. Do not say “perfect” or “fully verified” based only on a build.
