# Book 1 Lesson 15 — Independent Curriculum Audit 1 Handoff: Source Fidelity

Working repository: Weather-Mister/hanzi-steps  
Working draft PR: #69  
Working branch: book1-lesson15-source-a  
Published Book-1 endpoint before Lesson 15: Unit 44

Current checkpoint: Stage 3 design passes are complete. Proposed architecture is Units 45–48. Gate A is still PENDING.

## Read in a fresh context

1. automation/book1/PROTOCOL.md, especially Stage 3 / Curriculum architecture and Gate A.
2. course/book1/lesson15-source-ledger.md.
3. course/book1/lesson15-dependency-ledger.md.
4. course/book1/lesson15-dependency-audit.md.
5. course/book1/lesson15-curriculum-blueprint.md.
6. course/book1/lesson15-curriculum-rough.md and lesson15-curriculum-refined.md only when needed to understand a design decision.
7. course/book1/completion.json.

Do not read any Lesson-15 curriculum-audit verdict from another audit context before finishing your own source-fidelity pass.

## Audit lens

Independently answer:

**Does every required Lesson-15 source item have a justified, source-faithful home in the proposed Units 45–48 architecture?**

Audit all validated records:
- F001–F004
- D1T01–D1T12
- D2T01–D2T13
- V001–V044
- G001–G007
- P001–P009
- X001–X044
- DR001–DR007
- A001–A005
- CUL001
- S001–S004
- CH001–CH063

Search specifically for:
- source omissions;
- duplicate source ownership;
- changed meanings or lost restrictions;
- grammar named but not actually supported;
- dialogue turns assigned before their required material is available;
- activities named but with source-required data/prompts silently removed;
- accidental promotion of support-only material to formal ownership;
- bad handling of DEFERRED names/glyphs;
- loss of the exact 臺南 Activity-I table requirement;
- prescription support missing before A003;
- culture silently modernized into present-day health/policy claims;
- any V/CH count mismatch;
- any source item with no proposed home.

Special source-sensitive checks:
- G001 remains negative/non-specific and distinct from Unit-40 totality.
- G002 preserves definite-reference bias, outward-verb restriction, negation, questions, and sentence-final 了 behavior.
- G003 preserves the 一…就… contrast and 以後 compatibility.
- G004 preserves Vs + 一點 vs 有（一）點 + Vs.
- G005/G006 preserve action comparison and degree-complement distinctions.
- G007 preserves all three separation types.
- A001 preserves its exact source table, names contextually, 臺南, durations, and fractional bowl quantities.
- A003 preserves 一日4次 / 3日份 / 飯後30分鐘 before the three questions.
- A004 preserves the three required 把 outcomes.
- A005 preserves the four-question health call.

## Output

Return:
- BLOCKER findings
- MAJOR findings
- MINOR findings
- PASS / FAIL

PASS requires BLOCKER = 0 and MAJOR = 0.

If a curriculum defect is found, repair the smallest affected architecture artifact and re-audit the corrected blueprint. Do not silently change the validated source/dependency ledgers; a genuine upstream defect must reopen the affected upstream gate under the protocol.

Persist the final audit as:
- course/book1/lesson15-curriculum-source-fidelity-audit.md

Update course/book1/completion.json to record the audit result, but **do not pass Gate A** unless all three independent curriculum audits have passed.

## Stop condition

Stop after the source-fidelity audit artifact and controller update.

Do not:
- perform the pedagogy audit;
- perform the adversarial audit;
- freeze Gate A;
- begin activity engineering;
- create Unit 45–48 implementation;
- merge or publish.
