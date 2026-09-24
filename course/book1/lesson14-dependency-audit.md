# Book 1 Lesson 14 — Fresh Dependency Audit

Lesson: **Book 1 Lesson 14 「天氣這麼冷！」**  
Audit stage: mandatory fresh-context dependency audit  
Working PR: **#68**  
Production baseline audited: `main@caf8bef722d1bd43a0acaa48e1cc5dffc1010ffb` through Book 1 Unit 41  
Final dependency ledger: `course/book1/lesson14-dependency-ledger.md`

## Scope

Audited the validated Lesson-14 source ledger against the cumulative production curriculum through Unit 41.

The audit covered every pedagogically relevant source record and its disposition:

- B1L14-F001–F004
- B1L14-D1T01–D1T11
- B1L14-D2T01–D2T11
- B1L14-V001–V035
- B1L14-G001–G005
- B1L14-P001–P006
- B1L14-X001–X037
- B1L14-DR001–DR005
- B1L14-A001–A005
- B1L14-CUL001
- B1L14-S001–S004
- B1L14-CH001–CH050

Targeted prior-unit inspection was limited to disputed semantic or prerequisite claims, including Units 4, 7, 16–19, 23–25, 27–28, 30–31, 33, and 38–41.

No Unit 42 design, unit splitting, activity engineering, or implementation was performed.

## Initial findings

### BLOCKER

None.

### MAJOR

#### B1L14-DEP-AUDIT-001 — false REVIEW on mixed 吧 / 呢 support

**Affected record:** B1L14-X027.

The ledger classified the bundled `吧 / 呢 in dialogue contexts` support as REVIEW. Prior production does support inferential/guessing 吧 through Unit 30, but the Lesson-14 occurrence of 呢 in `妳怎麼沒帶傘呢？` is not the Unit-5 follow-up-particle function.

This made the bundled record falsely look wholly known.

**Fix:** B1L14-X027 is now **DEFERRED** as a mixed support record. Inferential 吧 remains REVIEW through B1L14-P003, while this 呢 occurrence remains comprehension-only through B1L14-P004 and may not be productively generalized or assessed.

**Blast radius:** CURRICULUM dependency metadata only.

#### B1L14-DEP-AUDIT-002 — hidden prerequisites in caution / leave-taking support

**Affected record:** B1L14-X032.

The ledger classified `不過 / 可是 / 對了 / 請…多小心 / 小心慢走` as REVIEW even though the bundled formulas contain Lesson-14 NEW items and a prior structural dependency:

- B1L14-V028 大家
- B1L14-V029 小心
- B1L14-V035 慢走
- `u40-more-less-verb` for `多小心`
- B1L14-P005 for the conventional leave-taking value

**Fix:** B1L14-X032 is now **EXPANSION** and the missing prerequisite edges are explicit.

**Blast radius:** CURRICULUM dependency metadata only.

#### B1L14-DEP-AUDIT-003 — durable source IDs were not explicit for all classified records

Many records were referenced only as shortened IDs such as `X027`, `F003`, `CH003`, and the dialogue section assigned one blanket disposition without enumerating all 22 durable turn IDs.

The classifications were semantically present, but exact source-to-dependency traceability could not be mechanically or independently verified item by item.

**Fix:** all dependency references were normalized to full `B1L14-*` durable IDs, all 22 dialogue-turn IDs are explicit, and all four self-assessment IDs are explicit.

**Blast radius:** LOCAL dependency-ledger traceability.

### MINOR

#### B1L14-DEP-AUDIT-004 — lesson-outcome disposition precision

B1L14-F003 and B1L14-F004 were marked NEW even though their foundations are already taught and Lesson 14 broadens/integrates those capabilities.

**Fix:**
- B1L14-F003 → **EXPANSION**
- B1L14-F004 → **EXPANSION**

B1L14-F001 and B1L14-F002 remain NEW.

#### B1L14-DEP-AUDIT-005 — G005 prerequisite edge precision

B1L14-G005 correctly depended on prior `這麼` and degree `那麼`, but the ledger named only their unit locations.

**Fix:** the edge now names `u17-so` and Unit-38 `u38-enthusiastic` explicitly, alongside prior 比, 跟…一樣, and 沒有 support.

## Final re-audit

### Classification checks

- Formal vocabulary B1L14-V001–V035: **35 / 35 classified**.
- Formal characters B1L14-CH001–CH050: **50 / 50 classified**.
- Support records B1L14-X001–X037: **37 / 37 classified**.
- All grammar, pragmatics, dialogue, outcome, drill, activity, culture, and self-assessment records are explicitly traceable by durable source ID.
- Exact source-record coverage after normalization: **174 / 174 records present in the dependency ledger**.

### False-known / duplicate ownership

- No formal Lesson-14 item classified NEW already has exact prior vocabulary ownership.
- B1L14-V006 想, B1L14-V008 快, and B1L14-V022 要 remain EXPANSION rather than duplicate NEW ownership.
- B1L14-G001 remains EXPANSION because production already owns basic duration, object-repeat duration, and verbal 了 separately, while Lesson 14 adds the completed-duration integration.
- B1L14-X029 濕濕的 remains EXPANSION rather than being falsely treated as covered by Unit 30's restricted reduplication examples.

### Hidden vocabulary / character prerequisites

The cumulative character check reproduces the ledger's result:

- all non-deferred formal NEW characters are genuinely new;
- 玉 / 紐 / 約 remain tied only to deferred proper names;
- the 15 untaught non-formal glyphs are fully accounted for;
- 度 is explicit NEW task support through B1L14-X015;
- 飛 / 故 / 宮 / 蓮 / 烏 / 龍 and the other non-formal name/example glyphs are explicitly deferred/adapted rather than silently exposed.

No unclassified hidden Han-character prerequisite remains.

### Prerequisite ordering

Required Lesson-14 internal edges are acyclic:

- B1L14-G001 → B1L14-G002
- B1L14-V008 + B1L14-V022 → B1L14-G003
- B1L14-V027 → B1L14-G004
- prior comparison system + B1L14-G004/B1L14-G005 → mixed comparison transfer
- B1L14-V024 → B1L14-X029
- B1L14-V028 + B1L14-V029 + `u40-more-less-verb` → the `請大家多小心` branch of B1L14-X032
- B1L14-V029 + B1L14-V035 → B1L14-P005 / `小心慢走`

No edge requires Unit 42+, Book 2, or another unpublished dependency.

### Deferrals

All DEFERRED records have an explicit safe destination:

- contextual/glossed proper-name support;
- learner-safe substitution;
- dialogue-only comprehension;
- or adaptation that prevents productive exposure to untaught material.

No deferral silently drops a required Lesson-14 function, grammar target, or communicative outcome.

### Circularity

No circular dependency was found.

## Final findings

- **BLOCKER: 0 open**
- **MAJOR: 0 open**
- **MINOR: 0 open**

All findings discovered by this audit were corrected in the dependency ledger and re-audited.

# Result: PASS

The mandatory dependency gate for Book 1 Lesson 14 passes.

The repository is ready for the **curriculum-architecture stage** only. Unit splitting, Unit 42 design, activity engineering, and implementation have not begun.
