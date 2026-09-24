# Book 1 Lesson 14 — Fresh-Context Source Audit

**Scope:** A Course in Contemporary Chinese 1, Lesson 14 「天氣這麼冷！」, printed pp. 299–321 / PDF pp. 326–348.

**Audit inputs used:** only the authoritative Lesson-14 source range, `course/book1/lesson14-source-ledger.md`, and the source-stage rules in `automation/book1/PROTOCOL.md`.

**Audit question:** what is missing, duplicated, distorted, unsupported, misanchored, or misclassified?

## First pass — FAIL

### BLOCKER

**B1L14-SA001 — Source-support/task requirements were incompletely preserved.**

The reconciled ledger captured the core grammar targets but omitted source details that matter to later dependency and activity work:

- G001/DR001 omitted the source confirmation prompts with **吧** and **對不對**, and omitted the response-support item **一共**.
- G004 omitted the source’s standalone baseline example **星期天我更忙。** that motivates the “even more” value before the lesson narrows to 比…更….
- Activity I did not preserve the explicit “most / least preferred season” task.
- Activity IV did not preserve “ask for additional information” and “write the results in the chart.”
- Activity V did not preserve the instruction to write the findings in Chinese.
- Additional drill support with dependency relevance (**上網**, **生意**, **好喝**) was not explicitly surfaced in the support ledger.

Because the protocol classifies missing required source material as a BLOCKER, the source gate could not pass.

**Resolution:** repaired in `course/book1/lesson14-source-ledger.md` on commit `c6cbc734f066087dffeabe62a1df94b4f157fa32`.

### BLOCKER

**B1L14-SA002 — Two pragmatics records exceeded what the source itself establishes.**

- P003 generalized the dialogue-final **吧** beyond the source-supported “probably/inferential” reading.
- P004 labeled **呢** as concern/surprise even though the source provides the contextual why-question but no explicit particle rule or gloss.

A source-truth artifact must distinguish textbook evidence from external grammatical interpretation.

**Resolution:** P003/P004 were rewritten to record only what the Lesson-14 Chinese/English source directly supports and to prevent downstream generalization.

### MINOR

**B1L14-SA003 — Source-detail fidelity issues.**

- The 玉山 source gloss was truncated; the source also identifies it as the tallest mountain in central Taiwan.
- G005 did not retain the source’s explicit Lesson-13 / Lesson-8 cross-references for equal- and superior-degree comparison.
- The positive A 有 B 那麼／這麼… note was summarized as rare “except in questions” rather than the source’s narrower “except in 嗎 questions.”

**Resolution:** corrected in the reconciled ledger.

## Re-audit after fixes

Rechecked the corrected ledger against the full Lesson-14 source range, including:

- lesson objectives and end self-assessment;
- both dialogues;
- both formal vocabulary/name/phrase lists;
- Grammar I–V functions, structures, questions, restrictions, contrasts, and drill families;
- classroom Activities I–V;
- the Typhoon Days-Off culture reading;
- source anchors and canonical counts affected by the fixes.

### Remaining findings

- **BLOCKER: 0**
- **MAJOR: 0**
- **MINOR: 0**
- **Unresolved source disagreements: 0**

## Final result — PASS

The Lesson-14 source gate satisfies the protocol condition of zero BLOCKER and zero MAJOR findings. The repository may proceed to the **dependency-ledger stage**.

No dependency ledger, unit architecture, learner-facing activity design, or implementation was created during this audit.
