# Fresh Audit Handoffs — Book 1

These handoffs preserve audit independence without paid API calls.

A fresh auditor should not be shown the builder's chain of reasoning or previous reviewers' praise.

## 1. Source auditor

Give:
- authoritative source lesson
- reconciled source ledger
- source-item schema/rules

Ask:
"Independently audit this ledger against the authoritative source. Find omissions, duplicates, distortions, unsupported additions, bad source anchors, and misclassifications. Do not redesign the curriculum. Return BLOCKER/MAJOR/MINOR findings and a pass/fail verdict. Pass requires zero BLOCKER and zero MAJOR."

## 2. Dependency auditor

Give:
- validated source ledger
- cumulative production curriculum index
- dependency ledger

Ask:
"Audit NEW/KNOWN/REVIEW/EXPANSION/DEFERRED classifications and prerequisite ordering. Search for false-known items, hidden prerequisites, future dependencies, duplicate NEW ownership, bad deferrals, and circularity. Do not redesign unit boundaries. Return structured findings and pass/fail."

## 3. Curriculum source-fidelity auditor

Give:
- validated source ledger
- final proposed blueprint

Ask:
"Check whether every required source item has exactly one justified disposition in the blueprint and whether the blueprint introduces unsupported material. Do not judge teaching style except where it creates source loss or distortion."

## 4. Curriculum pedagogy auditor

Give:
- dependency ledger
- final proposed blueprint
- Hanzi Steps unit rules

Ask:
"Audit sequencing, unit load, prerequisites, coherence, vocabulary/grammar balance, character progression, review balance, and communicative goals. Identify anything a learner would meet before being prepared for it."

## 5. Curriculum adversarial auditor

Give:
- source ledger
- dependency ledger
- final proposed blueprint

Ask:
"You did not create this plan. Assume it contains subtle flaws. Try to prove it should not pass Gate A. Look specifically for omissions, duplicate ownership, hidden prerequisites, artificial splits, overloaded/thin units, bad deferrals, and cross-unit inconsistencies."

## 6. Activity teaching-quality auditor

Give:
- frozen blueprint
- complete activity specification

Ask:
"Check that every important target is actually taught rather than merely exposed. Verify explanation, recognition, controlled practice, contextual use, retrieval, delayed retrieval, cumulative mixing, handwriting where relevant, review, Pinyin Search, and Mega Challenge coverage."

## 7. Activity question/adversarial auditor

Give:
- frozen blueprint
- learner-facing activity specification

Ask:
"Attack every question and example for ambiguity, multiple correct answers, no correct answer, bad answer keys, accidental clues, untaught language, unnatural Taiwan Mandarin, bad Traditional characters, bad tone-marked pinyin, misleading English, and weak distractors. Pass requires zero BLOCKER and zero MAJOR."

## 8. Implementation conformance auditor

Give:
- frozen activity specification
- changed implementation
- generated curriculum/index output

Ask:
"Compare the implementation against the frozen specification. Find omitted, added, altered, or relocated learner-facing content. Treat unexplained divergence as a BLOCKER. Do not redesign curriculum."

## 9. Final hostile release auditor

Give:
- authoritative source packet
- validated source ledger
- dependency ledger
- frozen blueprint
- frozen activity spec
- implementation
- deterministic QA report
- learner simulation reports
- bidirectional traceability report

Ask:
"Find a defensible reason this release should be blocked. Do not trust previous verdicts. Independently inspect source fidelity, pedagogy, learner prerequisites, learner-facing correctness, traceability, and implementation consistency. PASS only with zero BLOCKER and zero MAJOR."

## Learner simulations

### Strict prerequisite learner
"You know exactly the published curriculum through the previous unit and nothing beyond it. Attempt the new units in order. Flag anything that requires knowledge you were never taught."

### Adversarial test taker
"Try to break every exercise. Look for alternate valid answers, invalid keys, loopholes, clues that bypass learning, ambiguity, and distractors that are accidentally correct."

### Cumulative learner
"Complete the entire source-lesson batch sequentially. Focus on progression, retention, delayed retrieval, cumulative review, Search, Mega Challenge, and whether earlier concepts remain usable."
