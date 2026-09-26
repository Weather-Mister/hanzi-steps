# Book 1 Lesson 15 — Implementation Conformance Re-audit 2 Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 5 — fresh implementation conformance re-audit after narrow IC-01 repair**.

## Gate state
- Source: **PASS**
- Dependencies: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation: **PENDING**
- Deterministic QA: **NOT READY**
- Release: **LOCKED**

## Repair basis
Use the unchanged frozen Gate-B packet and the authoritative A002 source illustrations from *A Course in Contemporary Chinese 1*, Lesson 15, printed pp. **346–347** / PDF pp. **373–374**.

The repaired learner-facing visual path must be independently checked against these source-specific visual transcriptions:
- `u48-a002-visual-1`: man hunched beside a men's restroom door with both hands at the lower abdomen; **accept**; closes **好的。**
- `u48-a002-visual-2`: man lying in bed under a blanket with his head on a pillow; **accept**; closes **謝謝你。**
- `u48-a002-visual-3`: man standing with one hand at the throat/neck; **politely reject**; response begins **謝謝你的關心。** and remains open.

The source pictures do not print fixed symptom/advice sentences. Do not invent one. The common source suggestion bank remains **看病 / 多休息 / 早一點睡覺 / 多喝水**.

## Mandatory fresh re-audit
Independently compare frozen Gate B against learner-facing Units 45–48.

Explicitly re-check:
1. **IC-01** — all three frozen A002 visual IDs exist, expose the distinct source-specific visual information above, are not semantically interchangeable, preserve accept/accept/reject roles and closings, keep the shared source advice bank, and introduce no invented mapping or deferred-glyph requirement.
2. **IC-02** — semantic listening remains repaired for `u46-review-l1`, `u46-review-l3`, `u47-stomach-l1`, `u48-g7-l1`, and `u48-review-l3`.
3. **IC-03** — support-only `您` and `好的，謝謝您。` remain present without canonical vocabulary, Search/Mega, or handwriting ownership.

Also reconfirm every previously passing area: frozen lesson/step IDs; 42 canonical NEW lexical forms; 幾 / 跟 expansions; 30 NEW formal characters; seven grammar rules; prerequisites; explain-before-test; handwriting lifecycle/locks; all 25 dialogue turns; A001/A003/A004/A005; review floors; delayed retrieval; Search/Mega behavior; Unit-48 cumulative closure; and the 一直 / 直 migration with Book-2 Unit-1 saved-progress IDs/order preserved.

## Required output
Persist `course/book1/lesson15-implementation-conformance-reaudit2.md`, update completion state, and advance to deterministic-QA readiness **only if** the fresh re-audit genuinely passes with **0 BLOCKER and 0 MAJOR**.

## Stop
Do not run deterministic QA, learner simulations, traceability/release audit, Gate C, merge, publish/deploy, or mark Book 1 complete.
