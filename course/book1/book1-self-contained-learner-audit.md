# Book 1 learner-facing self-containment audit

Date: **2026-09-27**

## Why this follow-up exists

The 2026-09-26 whole-book audit proved source coverage, dependency direction,
ownership, handwriting, review, Search/Mega behavior, build integrity, and
production release. It did **not** separately require every learner-facing question
to be answerable without access to the textbook or internal curriculum notes.

A follow-up review found scattered learner-visible phrases such as “the source”,
“Dialogue II”, “the reading”, source turn IDs, and internal labels such as A004 or
G003. In a few places, especially culture/reference activities, the wording assumed
the learner had seen material that Hanzi Steps had not explicitly presented as a
local reference card.

## Scope of this repair

All 48 Book 1 unit modules were re-audited for learner-facing provenance/editor
language. The repair changes wording and local context only.

Preserved unchanged:
- lesson IDs and activity IDs;
- lesson/step order and saved-progress positions;
- Chinese targets, pinyin, answer keys, and assessment semantics;
- vocabulary/character/grammar ownership;
- handwriting geometry and lifecycle;
- Search, Mega Challenge, and adaptive-practice eligibility.

## Repairs

- Removed learner-facing references to invisible source structure such as
  “the textbook”, “Dialogue I/II”, “the source”, source turn codes, and internal
  activity/grammar labels.
- Reworded prompts so they refer to visible Hanzi Steps context rather than an
  external book.
- Unit 40 now presents the tested Taiwanese birthday-culture facts in a visible
  culture summary before the questions that depend on them.
- Unit 44 keeps the historical typhoon-system facts in a visible, explicitly
  historical summary before assessment.
- Unit 48 points comparison, prescription, visual-role, and mask-culture questions
  to the actual visible cards immediately available to the learner.
- Added a whole-Book-1 regression test that rejects future learner-facing leakage
  of source/editor metadata and verifies the key reference cards precede dependent
  assessments.
- Added the same self-containment rule to `ADDING_A_UNIT.md` for future authoring.

## Completion status

This follow-up does not reopen content ownership or lesson completion. It closes a
learner-UX/authoring-quality gap that the prior traceability audit did not model.

Book 1 remains structurally complete; the release is considered learner-facing
self-contained only after the updated regression suite and production deployment
pass.
