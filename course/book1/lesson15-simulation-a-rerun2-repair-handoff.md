# Book 1 Lesson 15 — Simulation A Rerun 2 MAJOR Repair Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 Simulation A rerun 2 failed; reopen the smallest affected upstream area at Stage 5 implementation for learner-safe assessment distractors across Units 45–48**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen and unchanged**
- Implementation gate: **REOPENED / PENDING**
- Latest deterministic QA rerun 2: **historical PASS only; must be rerun after this learner-facing repair**
- Historical Simulation A: **FAIL evidence preserved**
- Historical Simulation A rerun: **FAIL evidence preserved**
- Simulation A rerun 2: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Simulation report:
- `course/book1/lesson15-learner-simulation-a-rerun2.md`

Open finding:
- **SIM-A-RERUN2-01 MAJOR — learner-visible assessment distractors expose later Lesson-15 vocabulary and, in several cases, later formal NEW characters before their intended teaching point.**

Blast radius:
- **CROSS_UNIT implementation**
- The frozen activity specs are already learner-safe and do not need redesign.

## Core rule

Do **not** change Gate B.

For affected assessed listening items, restore the learner-facing prompt/options/answer/explanation to the **exact frozen Unit 45–48 activity specification** wherever production drifted into Chinese distractors containing untaught later material.

The repair is not “translate everything to English.” It is:
- compare each live affected item with its frozen assessed payload;
- restore the frozen payload exactly;
- preserve the existing audioText, step ID, lesson ID, source intent, correct semantic answer, and listening behavior unless the frozen spec itself specifies otherwise.

Do not invent substitute distractors.

## Confirmed affected IDs

The fresh strict-prerequisite simulation identified these learner-visible listening steps as requiring repair or explicit adjudication against the frozen spec:

### Unit 45
1. `u45-sick-l1`
   - current distractors expose Unit-46 **休息 / 藥局 / 拿 / 藥** and NEW characters **休 / 息 / 藥 / 局 / 拿**
   - frozen semantic options:
     - **being sick and having a slight fever**
     - **having a good appetite and resting**
     - **going to a pharmacy and taking medicine**
   - frozen answer: **being sick and having a slight fever**

2. `u45-duration-l1`
   - current distractor exposes Unit-46 **藥** and modal **得 děi**
   - frozen options:
     - **duration of the condition**
     - **where the pharmacy is**
     - **how much medicine costs**
   - frozen answer: **duration of the condition**

3. `u45-review-l2`
   - current distractor exposes Unit-46 **拿 / 藥 / 休 / 息**
   - frozen options:
     - **head pain and poor appetite**
     - **throat inflammation and fever**
     - **medicine and rest**
   - frozen answer: **head pain and poor appetite**

### Unit 46
4. `u46-rec-l1`
   - current choices expose Unit-47 **吐 / 次** and Unit-48 **回家**
   - restore the exact frozen semantic listening payload from `lesson15-unit46-activity-spec.md`
   - frozen correct semantic answer remains the complete three-part advice bundle:
     **drink more water, rest more, sleep earlier**

5. `u46-visit-l1`
   - current distractor exposes Unit-48 **小時**
   - frozen options:
     - **whether they have to take medicine**
     - **where their head hurts**
     - **how many hours they slept**
   - frozen answer: **whether they have to take medicine**

### Unit 47
6. `u47-what-l1`
   - current distractors expose later Unit-47 **健康 / 保險** and NEW characters **健 / 康 / 保 / 險**, plus Unit-48 **小時**
   - frozen options:
     - **the person's complexion looks bad**
     - **the person slept eight hours**
     - **the person has insurance**
   - frozen answer: **the person's complexion looks bad**

7. `u47-a005-l1`
   - current distractors expose later material
   - frozen options:
     - **that the person really will not see a doctor**
     - **that the person has insurance**
     - **that the person slept several hours**
   - frozen answer: **that the person really will not see a doctor**

8. `u47-review-l1`
   - current distractor exposes Unit-48 contextual **臺南**
   - frozen options:
     - **the person's condition/appearance**
     - **the price of medicine**
     - **travel time**
   - frozen answer: **the person's condition/appearance**

9. `u47-review-l2`
   - current distractor exposes Unit-48 **小時**
   - frozen options:
     - **several times**
     - **one time**
     - **for several hours**
   - frozen answer: **several times**

10. `u47-review-l3`
    - current distractor **讀藥袋** exposes unsupported **袋**
    - frozen options:
      - **accompanying the person to see a doctor**
      - **buying insurance**
      - **reading a prescription**
    - frozen answer: **accompanying the person to see a doctor**

### Unit 48
11. `u48-advice-l1`
    - current distractors expose later Unit-48 **包** and later action-comparison material before their teaching point
    - restore the exact frozen semantic listening payload from `lesson15-unit48-activity-spec.md`

12. `u48-g4-l1`
    - current distractor **吃幾包藥** exposes **包** before the later Unit-48 action-lex lesson
    - restore the exact frozen semantic listening payload from `lesson15-unit48-activity-spec.md`

## Mandatory broader scan

Do not assume the list above is exhaustive.

Before editing:
1. inspect **every learner-facing assessed option/distractor in Units 45–48**, especially all `listen` steps;
2. compare each with the frozen Unit activity spec;
3. detect any option that exposes:
   - canonical NEW vocabulary from a later Lesson-15 unit;
   - a later-owned formal NEW character before its owning lifecycle;
   - later grammar/support before explanation;
   - unsupported/deferred glyphs as learner-readable assessed material;
4. repair only genuine production drift by restoring the exact frozen payload.

Do not alter an item merely because a distractor is Chinese. Chinese distractors are allowed when all material is already known at that point and the frozen spec permits them.

## Critical non-regressions

Preserve all currently repaired/passing behavior:

- `u46-ji-explain` explain-before-test repair;
- canonical 幾 ownership remaining Unit 7;
- Unit-47 `好幾次` as retrieval of the taught 幾 expansion;
- repaired A003 Chinese source notation:
  - 一日4次
  - 3日份
  - support-only 份 fèn
  - 飯前 / 飯後 / 飯後30分鐘
  - contextual/glossed/non-assessed 健康診所
  - deferred 診
  - answers 四次 / 飯後30分鐘 / 十二包
  - `practice:false` isolation
- A002 three distinct source-faithful visual roles/scenes and shared suggestion bank;
- the **five designated semantic-listening repairs**:
  - `u46-review-l1`
  - `u46-review-l3`
  - `u47-stomach-l1`
  - `u48-g7-l1`
  - `u48-review-l3`
- support-only 您 / 好的，謝謝您。;
- 42 canonical NEW lexical forms;
- exactly the 幾 / 跟 Lesson-15 semantic expansion model;
- 30 NEW formal characters;
- seven grammar rules;
- all frozen lesson/step IDs;
- prerequisite direction and explain-before-test;
- all 30 handwriting lifecycles/locks;
- all 25 dialogue turns;
- A001–A005 source tasks;
- review floors and delayed retrieval;
- Search/Mega behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration;
- Book-2 Unit-1 saved-progress IDs/order.

## Deterministic protection required

Add the smallest useful regression protection so this defect cannot silently return.

At minimum, deterministic tests should:
- assert the repaired affected listening payloads match their frozen learner-safe options/answers, or otherwise assert they contain no not-yet-taught Lesson-15 canonical vocabulary/NEW characters;
- specifically guard the confirmed IDs above;
- preserve the existing five `semanticAnswer: true` guards and their intended semantics;
- avoid a brittle rule that bans all Chinese distractors globally.

Do not weaken any existing test.

## Narrow verification in repair context

Before stopping, verify:
- each confirmed affected ID is learner-safe at its exact sequence point;
- no later-owned formal character remains visible in those distractors before its owning lifecycle;
- correct answers remain unchanged in meaning;
- audioText remains source-correct;
- no frozen ID changes;
- targeted Unit 45–48 validation passes;
- TypeScript if any shared schema/runtime code changes;
- repaired 幾/A003/A002/semantic-listening/您 paths remain intact.

Do **not** claim full deterministic QA from narrow repair checks.

## Required outputs

After repair:

1. Persist the minimal production/test changes.
2. Update `course/book1/completion.json`:
   - implementation remains pending until fresh affected-path conformance;
   - deterministic QA becomes pending;
   - preserve all three Simulation-A historical failure reports;
   - Simulations B/C remain not run;
   - release remains locked.
3. Prepare:
   - `course/book1/lesson15-simulation-a-rerun2-repair-conformance-handoff.md`

That handoff must require an independent recheck of:
- all repaired distractor IDs;
- the broader no-future-target learner-facing assessment condition across Units 45–48;
- the frozen five semantic-listening repairs;
- 幾 repair;
- A003 repair/isolation;
- A002 visuals;
- 您;
- ownership/characters/handwriting;
- review floors;
- Search/Mega;
- cumulative closure;
- 一直/直 migration.

## Stop condition

Stop after the narrow cross-unit implementation repair and fresh conformance handoff are persisted.

Do **not**:
- perform the fresh conformance check in the repair context;
- run full deterministic QA;
- rerun Simulation A again;
- run Simulations B/C;
- perform traceability or hostile release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
