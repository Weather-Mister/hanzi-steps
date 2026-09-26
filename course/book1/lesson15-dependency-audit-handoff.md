# Book 1 Lesson 15 — Fresh-context Dependency-Audit Handoff

Working repository: `Weather-Mister/hanzi-steps`

Working draft PR: **#69**

Working branch: `book1-lesson15-source-a`

Production baseline: `main` at `680ed5753382fb72151a1532095bca0a227c0658`.

Current published endpoint: Book 1 Source Lesson 14 / Hanzi Steps Unit 44.

Current protocol checkpoint: **fresh dependency audit required**.

## Completed before this handoff

The Lesson-15 source gate has passed.

The dependency-builder pass has now created:

- `course/book1/lesson15-dependency-ledger.md`

The ledger compares the validated Lesson-15 source against the actual cumulative production curriculum through Unit 44 and classifies every pedagogically relevant source record as NEW / KNOWN / REVIEW / EXPANSION / DEFERRED where applicable.

Builder checks covered:
- false KNOWN classifications;
- semantic lookalikes;
- hidden vocabulary prerequisites;
- hidden character prerequisites;
- hidden grammar/pragmatics prerequisites;
- future dependencies;
- duplicate NEW ownership;
- circular prerequisite edges;
- support-language leakage;
- formal-vs-support drift;
- prescription-image support;
- source-only names / labels / orthography.

Builder status:
- open BLOCKER: **0**
- open MAJOR: **0**
- dependency gate: **PENDING**
- curriculum/activity/implementation/release gates: **locked**

No Lesson-15 Hanzi Steps unit boundaries have been designed.

## Builder decisions that require hostile re-checking

Do not trust these merely because the builder recorded them. Verify them independently.

1. **B1L15-V026 幾** is EXPANSION, not KNOWN:
   - prior: interrogative “how many”;
   - Lesson 15: “a few” / indefinite use, including 好幾次 and G001 environments.

2. **B1L15-V032 跟** is EXPANSION, not KNOWN:
   - prior Unit 24: companionship “with”;
   - Lesson 15: addressee/recipient “to” in 跟老師說.

3. **B1L15-X006 得 + V** is NEW support:
   - modal `děi` “must/have to”;
   - it must not be confused with prior complement marker `de`.

4. **B1L15-G001** is EXPANSION:
   - preserve the non-committal, non-specific question-word declarative under negation;
   - do not flatten it into Unit-40 question-word + 都/也 totality.

5. **B1L15-G002 把** is NEW:
   - verify definite-reference bias;
   - bare outward-transitive action-verb restriction;
   - rejection of inward verbs;
   - negation before 把;
   - source question forms;
   - source-significant “do with/to” interpretation.

6. **B1L15-G003 V了…就…** is EXPANSION:
   - verify its contrast with Lesson-13 一…就…;
   - preserve the 以後 compatibility and rejected `*一吃了藥以後…` pattern;
   - do not allow ordinary A-not-A questions.

7. **B1L15-G004–G007** are EXPANSION rather than wholly KNOWN:
   - Vs + 一點 vs 有（一）點 + Vs;
   - action comparison with 得;
   - 一點 / 得多 / 多了 comparison complements;
   - separable-verb insertion beyond the previously taught duration pattern.

8. **Formal characters:** builder result is **30 NEW / 33 KNOWN**. Recheck against Book-1 production through Unit 44, not against Book 2.

9. **一直 / 直 future ownership collision:**
   - the Unit-44 learner does not know them, so Lesson 15 records them NEW;
   - the current registry later first-owns them in Book-2 Unit 1;
   - verify that the ledger’s required migration to Lesson-15 first ownership is sufficient to prevent duplicate NEW ownership and does not turn Book 2 into a prerequisite.

10. **Hidden support glyphs:**
   - NEW support: 您, 份;
   - deferred/adapted source-only glyphs include 妳, proper-name characters, 烏/龍, 北/紐/約, 診, and instructional-label 拒/絕.
   - verify that no literal dialogue, drill, or activity path still exposes untaught material without support.

11. **Activity III prescription dependency:**
   - verify `健康診所`, `一日4次`, `3日份`, `飯後30分鐘`, and the source’s 12-packet inference;
   - ensure no support item is silently treated as prior vocabulary.

## Mandatory next action — fresh dependency audit

Use a **new ChatGPT context**.

Read:

1. `automation/book1/PROTOCOL.md`, especially Stage 2 / Dependency ledger.
2. `course/book1/lesson15-source-ledger.md`.
3. `course/book1/lesson15-dependency-ledger.md`.
4. `course/book1/completion.json`.
5. `course/index.json` as the generated cumulative production evidence through Unit 44.
6. Targeted prior Book-1 unit files only when needed to verify a disputed classification, function, character, or prerequisite.
7. Consult later Book-2 registry/unit material only when necessary to verify the recorded 一直 / 直 ownership collision; never count it as prior learner knowledge.

The source ledger is authoritative. Do not silently redefine, merge, broaden, or discard its items during the audit.

## Audit task

Independently audit every NEW / KNOWN / REVIEW / EXPANSION / DEFERRED classification and every prerequisite edge.

Search specifically for:

- false KNOWN classifications;
- false REVIEW classifications;
- semantic lookalikes incorrectly treated as equivalent;
- hidden vocabulary prerequisites;
- hidden character prerequisites;
- hidden grammar or pragmatic prerequisites;
- future dependencies;
- duplicate NEW ownership;
- bad or unsupported DEFERRED decisions;
- circular prerequisite edges;
- support language that leaks untaught material;
- formal-vs-support classification drift;
- source records with no disposition;
- dispositions with no production evidence;
- character classifications that confuse character familiarity with lexical ownership;
- any path where a source activity requires material that the ledger has not made available.

Pay particular attention to:
- G001 negative non-committal question-word declaratives;
- G002 introductory 把 restrictions;
- G003 V了…就… vs 一…就…;
- G004 Vs + 一點 vs 有（一）點 + Vs;
- G005 action comparison with 得;
- G006 一點 / 得多 / 多了;
- G007 separable-verb insertion;
- modal 得 vs complement 得;
- the prescription task;
- proper-name/source-orthography handling;
- 一直 / 直 first-ownership migration.

## Required audit output

Return:
- BLOCKER findings;
- MAJOR findings;
- MINOR findings;
- PASS / FAIL.

**PASS requires BLOCKER = 0 and MAJOR = 0.**

If defects are found:
- repair `course/book1/lesson15-dependency-ledger.md`;
- re-audit until the dependency stage genuinely satisfies the protocol;
- persist the final audit as `course/book1/lesson15-dependency-audit.md`;
- update `course/book1/completion.json` accordingly.

The dependency gate may pass only when the fresh audit confirms:
- BLOCKER = 0;
- MAJOR = 0;
- classifications are internally consistent;
- no future prerequisite remains;
- no unresolved duplicate NEW ownership remains;
- no bad DEFERRED item silently loses source coverage;
- no circular dependency remains.

If and only if the dependency gate passes, advance the controller to curriculum-architecture readiness and stop.

## Stop condition for the audit chat

Do **not**:
- design Lesson-15 Hanzi Steps unit boundaries;
- create a rough split;
- create a curriculum blueprint;
- create learner-facing activities;
- edit the live application;
- merge PR #69;
- publish anything.

The fresh dependency-audit chat ends after the dependency audit artifact/controller update and readiness handoff only.
