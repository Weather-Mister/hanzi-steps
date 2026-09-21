# Book 1 Units 21–25 repair audit

Baseline production: `005879781c4abd38a7948801b8340a62b6b75ed8`.
Authority: supplied *A Course in Contemporary Chinese 1*, Lesson 6 pp. 116–118, Lesson 7 pp. 135–145, and Lesson 8 pp. 160–174. The Lesson 8 comparison page was visually checked at PDF page 197 / printed page 170. No textbook scans are shipped.

## Repairs

- Unit 21: correct 午's three-stroke 干 group; stop labelling 候's right group as the complete character 侯 and 對's entire left block as only 丵. Contextualize 空's kòng audio with 有空, using an explicit listening-step override so older listening items keep their existing cues. Add clock/range/softening transfer checks.
- Unit 22: translate 每個週末都不忙 unambiguously as “never busy on weekends”; contrast this with not-every scope. Register 每天 and 剛開始 where they are already explicitly taught. Counts are 13 lexical items plus two transparent combinations, not 15 unrelated new words. Add negation, ongoing-action and time transfer checks.
- Unit 23: classify 每天 and 剛開始 as review; 10 new words/forms remain. Expand permission beyond the repeated game example, with granting, refusing, A-not-A versus 嗎, photo permission and contextual listening. Review now independently assesses all three permission targets.
- Unit 24: add source-supported 又不…又不… teaching/practice and negative 比較 practice; include wishes with 又…又…. Expand listening and review of companionship, method versus evaluation and transport.
- Unit 25: replace template notes and all ten one-tile component exercises with geometry-aligned groups. Preserve licensed paths and their order. For 載, explicitly explain that visual frame grouping interleaves in writing order. Replace the unintroduced proper name 故宮 with known 學校, retaining the old phrase ID for compatibility. Add listening, component questions, comparison-direction transfer, 不比 equality scope, and degree-adverb checks. Use contextual character-card audio for 參/載/差. Correct the inconsistent 不 tone in the 不是 comparison example.

Lesson 8 comparison negation with 不比 and 不是比 and the restriction on 很/真/非常 are explicitly supported on printed p. 170. These were retained, not “corrected” away based on intuition. Source continuation remains unfinished: at least the deliberately deferred 古代 and 不行 need explicit coverage planning before advancing; inspect the complete source coverage, not just this list.

## Geometry inspection

A numbered rendering of all ten existing Unit 25 glyphs was compared with their path order. Component ranges include 騎 馬 0–9 / 奇 10–17, 計 言 0–6 / 十 7–8, and 載 outer group 0,1,2,10,11,12 / inner 車 3–9. For 觀 and 差, metadata follows the actual existing licensed glyph paths; counts were not changed to match a different font or variant. No glyph substitution or new source download is part of this repair.

## Progress compatibility

All published lesson IDs, step IDs and step positions are preserved. Added activities are appended. A frozen pre-repair step-ID fixture tests every partial checkpoint position and each old completion. `previousLessonLengths` records the baseline completion lengths and session validation accepts these exact old completed bounds as well as current bounds. Existing completion credit is retained; learners can replay completed lessons for the added practice. No cloud progress rows are rewritten.

## Prevention and checks

The known generic teaching template is rejected by structural validation. Added regression tests cover the actual former defects: missing phrase/example characters, trivial Unit 25 decomposition, ambiguous scope, novelty misclassification, old progress acceptance, and invalid early completion. Phrase coverage, explanation-before-assessment and review grammar/listening gates extend to future Book 1 units. They supplement, rather than replace, linguistic/manual review.

Local gates: curriculum generation/check, each unit's targeted check, character coverage, regression/validation suite, TypeScript, GitHub Pages production build. The PR's Feature QA and merge-commit deployment are separate required publishing gates. See PR/run records for actual remote results; this document alone is not proof of deployment.

Reusable continuation instructions: `docs/BOOK1_COMPLETION_PROMPT.md`.
