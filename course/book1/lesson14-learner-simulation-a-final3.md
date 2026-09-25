# Book 1 Lesson 14 — Learner Simulation A final-rerun-3

Simulation: **A — strict prerequisite learner**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Implementation head simulated: `9a1d510e4d8ef9b06181fa174f7812fb5ccbf04b`

Fresh-context rule observed: the other FR-001 rerun reports were not read.

## Scope

Simulated Units **42 → 43 → 44** sequentially from the published Unit-41 boundary, with special attention to the repaired A001 personal transfer and the prerequisite-order regressions named in `lesson14-learner-simulation-rerun3-handoff.md`.

## Mandatory checks

### A001 personal transfer

- **PASS — learner-visible assignment.** `u42-home-country-model` explicitly says the sentence is only a model and assigns the learner to describe the climate of their **own** home country/place before continuing.
- **PASS — required content is complete.** The same note requires the learner to state:
  - their own climate;
  - the season they personally like most;
  - the season they personally like least;
  - their own reason using `因為…所以…`.
- **PASS — language is available before `u42-seasons`.**
  - Prior published material supplies `我`, `的`, `國家`, `很`, `熱`, `最`, `喜歡`, `不`, `因為`, `怕`, `所以`, and `比較`.
  - Unit 42 teaches `天氣`, `冷`, all four seasons (`春天 / 夏天 / 秋天 / 冬天`), and weather support such as `下雪 / 下雨` in lessons that occur before `u42-seasons`.
  - The transfer therefore does not require Unit-43 or Unit-44 language.
- **PASS — no untaught country/place name is required.** The learner can use `我的國家` or otherwise describe their own home place without producing a specific proper name.
- **PASS — safe personal wording is permitted.** The note tells the learner to give their own answer and explicitly says not to copy the model unless it is genuinely true for them. It allows speaking the answer aloud or writing it on paper.
- **PASS — fixed model is not the transfer.** `u42-season-reason.note` explicitly says the spring sentence is practice only and not a substitute for the learner's own response.

### Previous prerequisite repairs

- **PASS — no future `明年` in `u43-a002-s2`.** Its distractors are `你在那裡住了多久？`, `你以前住在哪裡？`, and `你在臺灣住了半年嗎？`.
- **PASS — no early standalone handwriting.** New-character work in Units 42–44 consistently follows `intro → trace → build → complete → memory`; no checked character is first exposed through a standalone completion/writing demand.
- **PASS — G001 → G002.** Unit 43 teaches completed duration (`u43-completed-duration`) before duration-to-now (`u43-duration-to-now`).
- **PASS — 快 / 要 → G003.** `u43-kuai-sense` and `u43-yao-sense` are shown before the `u43-imminent` grammar step, and the source sentence using imminence comes afterward.
- **PASS — G004 → G005.** Unit 44 teaches `u44-even-more` before `u44-not-as`.
- **PASS — repaired cross-unit order targets are taught earlier.** The Unit-44 review/order targets referencing `u43-duration-now-source`, `u43-newyear-source`, `u43-return-plan`, `u43-nextyear-source`, `u43-finished-stay`, and `u42-season-reason` all have prior learner-facing phrase exposure in their source units.

## Strict-prerequisite learner result

A learner who knows exactly Units 1–41 can enter Unit 42 and complete the repaired A001 personal transfer without relying on future Lesson-14 material. The repair makes actual personal production explicit at the point where the necessary weather/season language is already available, while preserving the earlier prerequisite-order fixes through Units 43 and 44.

## Findings

### BLOCKER

None.

### MAJOR

None.

### MINOR

None.

## Verdict

**PASS**

PASS criterion satisfied: **zero open BLOCKER and zero open MAJOR findings**.
