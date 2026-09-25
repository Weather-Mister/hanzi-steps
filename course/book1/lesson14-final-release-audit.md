# Book 1 Lesson 14 — Stage 9 Fresh Hostile Release Audit

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Audited pre-report head: `f9b9ed4eaa6a5baf98460862ef78d1a7d33af1a7`  
Stage: **9 — final hostile release audit**

## Verdict

**FAIL**

Gate-C entry is blocked.

Open findings:
- **BLOCKER: 1**
- **MAJOR: 0**
- **MINOR: 0**

The release must not be merged or published.

---

# BLOCKER

## FR-001 — Source Activity A001 is modeled but never actually assigned to the learner

Severity: **BLOCKER**  
Confidence: **CLEAR**  
Smallest blast radius: **ACTIVITY** (Unit 42 activity engineering; Gate A architecture does not need to reopen)

### Source requirement

B1L14-A001 **The Four Seasons** is a required Lesson-14 classroom activity. Its source task requires the learner to:
- describe the climate of their own home country;
- identify the season they like most and least;
- state seasonal preferences;
- explain why, with the source worksheet scaffolding using 因為…所以….

The frozen Gate-A blueprint preserves that requirement in Unit 42: the learner is to describe their home-country climate, identify most- and least-liked seasons, and explain the reasons.

The Gate-B umbrella likewise claims A001 coverage as:
- home-country climate;
- most/least preferred seasons;
- reasons.

### Frozen activity-packet defect

The Unit-42 activity packet does not contain a learner-facing A001 transfer instruction comparable to the explicit transfer instructions preserved for A002, A004, and A005.

Instead, `u42-seasons` contains only:
- the fixed model `我的國家夏天很熱，冬天很冷。`;
- a recognition question asking which fixed sentence describes the speaker's home climate;
- the fixed model `因為我怕冷，所以我比較喜歡春天。`;
- a recognition question asking which fixed sentence contains a preference and reason;
- a recognition question for the fixed most/least sentence;
- an order reconstruction of the fixed spring-preference sentence in review.

The relevant phrase notes are descriptive metadata:
- `u42-home-country-model`: “Model for the source A001 home-country climate description…”
- `u42-season-reason`: “Source A001 transfer using prior 因為…所以….”

Neither note instructs the learner to perform the source transfer.

By contrast, A005's `u42-summer-write` explicitly says: “Source-transfer instruction: discuss … then write your findings in Chinese on paper.” A002 and A004 similarly preserve explicit learner actions in their phrase notes.

### Production defect

`course/book1/unit42.ts` faithfully transcribes the defective Gate-B packet. The learner-facing Unit-42 sequence therefore never asks the learner to:
- describe **their own** home-country climate;
- state **their own** most/least-liked seasons;
- explain **their own** reasons.

The final Unit-44 F002 capstone reconstructs the already-taught fixed sentence `因為我怕冷，所以我比較喜歡春天`; it does not repair the missing A001 transfer task.

### Release impact

This is not a wording or polish issue. A required source activity and a frozen blueprint transfer obligation are claimed as covered but are not actually presented as a task the learner must perform.

Therefore:
- B1L14-A001 is not fully resolved source-to-production;
- the Gate-B activity packet is not genuinely complete;
- the implementation-conformance, learner-simulation, and traceability conclusions are not sufficient for release because they inherit the same missing transfer instruction;
- Gate C cannot pass.

### Required repair path

Reopen **Gate B / activity engineering**, not Gate A.

The repair should add an explicit learner-facing A001 transfer instruction to the Unit-42 activity packet and production, requiring the learner to use their own information for all three required parts: home-country climate, most/least season preference, and reason.

After that learner-facing change, rerun the affected Gate-B audits and all downstream release evidence required by the protocol before returning to Stage 9.

---

# MAJOR

None beyond the blocking A001 omission above.

# MINOR

None recorded. Once a BLOCKER was confirmed, the audit stopped as required instead of continuing to accumulate non-release-relevant polish findings.

---

# Explicit strict-prerequisite repair retest

The two mandatory final repair checks themselves remain sound on the audited head:

1. **`u43-a002-s2` — PASS**
   - third distractor is `你在臺灣住了半年嗎？`;
   - no future-owned Lesson-14 form such as 明年 appears;
   - exactly one displayed answer asks for unknown duration.

2. **Standalone `practice-<character>` gating — PASS**
   - `characterPracticeAvailable(char, completed)` requires completion of the first non-review owning lesson;
   - the character-detail Practice button uses that gate;
   - Pinyin Search leaves canonical lookup global but filters writing actions through the same gate;
   - `LearningApp.start()` independently rechecks the gate for every synthetic `practice-<character>` lesson, preventing a direct start bypass.

These repaired invariants do not cure FR-001.

---

# Supporting release checks completed before the blocker was found

The hostile audit independently rechecked the following rather than relying on prior PASS labels:

- canonical Lesson-14 NEW ownership: **30 / 30**, with no duplicate NEW rows;
- Lesson-14 EXPANSION forms 想 / 快 / 要: **0 duplicate canonical rows**;
- NEW character ownership: **21 / 21**, no duplicates, no deferred 玉 / 紐 / 約 / 度 / 北 ownership;
- formal grammar ownership: **5 / 5**;
- production pinyin for all 30 canonical NEW forms matches the source ledger;
- no sampled Simplified-form contamination in the Lesson-14 production payload;
- all 179 select/listen/order/match assessment structures have one stored keyed answer in their option bank where applicable, no duplicate options, and no unresolved order phrase/token reference;
- Unit review sizes remain **25 / 28 / 41**;
- Lesson-14 stroke geometry exists for all 21 NEW characters and generated stroke counts agree with production metadata;
- generated index contains exactly the 30 NEW vocabulary rows, 21 NEW character rows, and 5 formal grammar rows for Units 42–44;
- no learner-facing code changed between the final implementation baseline and the pre-audit head; intervening changes were reports/controller state only;
- current-head Feature QA run **#486** completed successfully, including dependency install, Traditional stroke hydration, curriculum generation/validation, targeted tests, character checks, full regression tests, TypeScript, and Pages build.

These checks show the release is technically coherent, but Gate C still fails because required source Activity A001 is not actually assigned.

# Stage-9 result

**FAIL — 1 open BLOCKER.**

Required controller action:
- keep source/dependency/curriculum gates passed;
- reopen Gate B at activity engineering;
- lock implementation and release;
- do not merge or publish.
