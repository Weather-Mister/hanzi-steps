# Book 1 Lesson 14 — Learner Simulation A

Simulation: **Stage 7 Learner A — strict prerequisite learner**

Working PR: **#68**  
Branch: `book1-lesson14-source-a`  
Simulated learner state: knows exactly the published curriculum through **Unit 41**, then completes **Units 42 → 43 → 44** in order with no later knowledge available early.

## Verdict

**FAIL**

Open findings:
- **BLOCKER: 1**
- **MAJOR: 1**
- **MINOR: 0**

PASS requires zero open BLOCKER and zero open MAJOR.

## BLOCKER findings

### A-B1 — Unit 42 listening assessment exposes untaught 秋天 and diverges from the frozen activity spec

**Location:** `course/book1/unit42.ts`, step `u42-spring-l1` in `u42-spring-winter`

Actual learner-facing options are:

- `春天`
- `冬天`
- `秋天`

At this point in the sequence, the strict learner has completed the Spring/Winter teaching but has **not** begun `u42-summer-autumn`. Therefore `秋天` is not yet taught, and the NEW character `秋` has not yet received its lifecycle.

This is also an implementation-conformance defect: the frozen Unit-42 activity spec specifies the options as English `spring / winter / autumn`, not the Chinese forms. The implementation change therefore introduces a future lexical/character prerequisite that the frozen activity packet did not authorize.

The keyed answer remains `春天`, so the answer itself is not wrong, but the learner-facing assessment violates strict prerequisite sequencing and the frozen implementation contract.

**Severity:** BLOCKER  
**Smallest likely blast radius:** **LOCAL**  
**Likely affected gate:** implementation conformance / affected deterministic QA

## MAJOR findings

### A-M1 — Unit 44 tests against G005 before G005 is taught

**Location:** `u44-even-more`, step `u44-g4-s1`  
**Frozen spec and implementation both contain the defect.**

The step asks which sentence means “This year is even colder than last year?” and gives:

- `今年比去年更冷。`
- `今年跟去年一樣冷。`
- `今年沒有去年那麼冷。`

The first option uses the just-taught G004 `比…更…`. The second uses previously published `跟…一樣`. The third, however, uses Lesson-14 G005 `沒有…那麼…`, which is formally owned by the **next lesson**, `u44-not-as`, and has not yet been explained to the strict learner.

A strict prerequisite learner therefore cannot interpret every answer choice using only material taught up to that point. This is a hidden future-grammar dependency inside an assessed item. Because the defect is already present in the frozen Unit-44 activity specification, it is not a local transcription issue.

**Severity:** MAJOR  
**Smallest likely blast radius:** **ACTIVITY**  
**Likely affected gate:** Gate B / activity engineering

## Checks that did not produce additional BLOCKER or MAJOR findings

- Unit 42 teaches `下雪` and `雨 / 下雨` before productive `會不會下雪` / `常不常下雨` assessment.
- Unit 43 preserves G001 → G002 ordering, explains `對不對` before testing it, teaches the Lesson-14 senses of `快` and `要` before G003 assessment, and teaches `停` only after imminence is available.
- Unit 44 teaches `大家` and `小心` before `請大家多小心`, teaches `更` before G004, and teaches `可怕` / `慢走` before their assessed uses.
- The deferred proper-name forms are not made productive answer requirements.
- Unit reviews otherwise occur after their owned NEW vocabulary, grammar, and handwriting targets have been taught.

## Final result

**FAIL — 1 BLOCKER and 1 MAJOR remain open.**

Per the Stage-7 handoff, this simulation does **not** repair curriculum, activity specifications, or implementation.
