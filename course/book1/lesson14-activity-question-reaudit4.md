# Book 1 Lesson 14 — Activity Audit 2 Re-audit 4

Reason: Stage 9 hostile release review exposed FR-001: B1L14-A001 had been modeled but not actually assigned as the learner's personal source-transfer task. This fresh-context re-audit independently checks the repaired activity packet before Gate B may re-freeze.

## Independence / scope

Reviewed before consulting the companion re-audit4 verdicts:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- `course/book1/lesson14-source-ledger.md`, especially B1L14-A001 and related Lesson-14 outcomes;
- `course/book1/lesson14-dependency-ledger.md`;
- frozen `course/book1/lesson14-curriculum-blueprint.md`;
- `course/book1/lesson14-activity-spec.md`;
- `course/book1/lesson14-unit42-activity-spec.md`;
- `course/book1/lesson14-unit43-activity-spec.md`;
- `course/book1/lesson14-unit44-activity-spec.md`;
- `ADDING_A_UNIT.md`;
- targeted prior-unit/index evidence only where prerequisite status needed confirmation.

The current Unit-42 implementation was not used to decide the activity verdict. Generic phrase-card rendering was checked only to verify the product contract: `components/learning-app.tsx` renders `phrase.note` visibly on learner-facing phrase steps.

## FR-001 adversarial check

### Learner is actually assigned A001
PASS.

`u42-home-country-model` now explicitly tells the learner, before continuing, to:
1. describe the climate of **their own home country/place** in Chinese;
2. state the season **they personally like most**;
3. state the season **they personally like least**;
4. give **their own reason** with 因為…所以…;
5. say the answer aloud or write it on paper rather than merely copying the fixed model.

This is an instruction to perform the source transfer, not a recognition-only model.

### All source-required A001 components are present
PASS.

The repaired instruction covers the source task fields in B1L14-A001:
- own home-country climate;
- most-liked season;
- least-liked season;
- preference;
- reason;
- explicit 因為…所以… support.

### Prerequisites are available before transfer
PASS.

Before `u42-seasons`, the learner has all four season words and ordinary weather language. Targeted prior-curriculum evidence confirms that 國家, 熱, 最, 喜歡, 怕, and 因為…所以… are already taught before Unit 42. The task therefore recombines available language rather than requiring future Lesson-14 material.

### No forced country or climate
PASS.

The fixed model is explicitly labeled a model, and the learner is told to use their own home country/place and their own information. The task does not require a specific country name, climate, or season choice.

### Fixed model cannot substitute for the learner response
PASS.

The `u42-home-country-model` note says not to copy the model unless it is genuinely true for the learner. `u42-season-reason` separately states that the spring sentence is practice/scaffolding and not a substitute for the learner's personal answer. The `u42-seasons` activity contract also states that fixed-model recognition/order steps do not satisfy A001.

### Learner-facing surface
PASS.

The instruction is stored in a phrase `note`, and the generic phrase-step renderer displays `phrase.note` visibly under “How the phrase works.” The repair is therefore on an actual learner-visible field, not hidden curriculum metadata.

### A001 remains distinct from A005
PASS.

A001 is the learner's own climate + most/least season + personal reason transfer. A005 remains a separate Taiwan-summer task covering weather, a distinctive feature, food/fruit, activity, and written findings. No task ownership is conflated.

### No Gate-A curriculum change
PASS.

The repair changes no source ownership, unit boundary, canonical NEW vocabulary, character ownership, formal grammar ownership, prerequisite edge, Search ownership, or Mega ownership. Gate A remains valid.

## Normal Activity Audit 2 — Units 42–44

### One defensible key / no-answer / distractor attack
PASS.

All select/listening items were re-read adversarially for alternate defensible answers, missing answers, misleading English, accidental clues, and weak distractors. No open BLOCKER or MAJOR was found.

A mechanical consistency pass also confirmed:
- every keyed select/listen answer is present in its option set;
- no duplicated options were found in the specified option banks;
- every explicit order task references an existing phrase and uses the exact phrase token bank.

### Future prerequisites / explain-before-test
PASS.

The frozen prerequisite order is preserved:
- Unit 42 teaches 下雪 and 雨/下雨 before productive 會不會 / 常不常 assessment;
- Unit 43 teaches G001 before G002, explains 對不對 before assessing it, teaches 快/要 senses before G003, and teaches G003 before imminent-event retrieval;
- Unit 44 teaches 濕 before 濕濕的, 大家/小心 before 請大家多小心, 更 before G004, G004 before D2T07, G005 before D2T08, and 慢走 before leave-taking assessment.

No required answer introduces deferred proper-name/support glyphs.

### Listening / order payloads
PASS.

Listening answers match their audio text and prompts. Order token banks preserve the specified phrase-token multiplicity and references across Units 42–44.

### Traditional Chinese / pinyin / Taiwan usage
PASS.

Learner-facing Chinese in the packet is Traditional Chinese. Reviewed pinyin is tone-marked and consistent with the phrase records. The audited constructions and source-derived usage are appropriate to the Taiwan-Mandarin course contract. No Simplified contamination or materially misleading translation was found.

### Search / Mega / handwriting timing contracts
PASS at the activity-spec level.

The packet preserves:
- globally visible canonical Pinyin Search lookup rows;
- writing-practice lock until the owning lesson/character introduction is complete;
- Mega Challenge eligibility gated by owning-lesson completion;
- no duplicate canonical ownership for 想 / 快 / 要;
- the global standalone handwriting-practice lock before first teaching.

No activity-layer change is required.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

## Independent verdict

# PASS

The FR-001 repair is sufficient. Gate A remains valid, and this fresh Activity Audit 2 re-audit4 has zero open BLOCKER/MAJOR findings.

After reaching this independent verdict, the required companion reports were read:
- `course/book1/lesson14-activity-teaching-quality-reaudit4.md` — PASS;
- `course/book1/lesson14-activity-cross-unit-reaudit4.md` — PASS.

With all three re-audit4 activity audits passing and no open BLOCKER/MAJOR, Gate B may be re-frozen and the controller may advance to implementation. No Unit 42/43/44 TypeScript or runtime implementation is changed by this audit.
