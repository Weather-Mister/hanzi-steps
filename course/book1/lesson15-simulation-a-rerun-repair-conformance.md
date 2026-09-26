# Book 1 Lesson 15 — Simulation A Rerun Repair Conformance

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

## Verdict

**PASS**

Fresh affected-path severity:

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

The SIM-A-RERUN-01 Unit-46 learner-facing repair conforms to the unchanged frozen Gate-B specification. The implementation gate may return to **PASS**. Deterministic QA remains **PENDING** and must be rerun because learner-facing production code changed after the last historical deterministic PASS.

Both historical Simulation-A reports remain evidence only. Simulation A has **not** been rerun after this repair. Simulations B/C remain not run. Release remains locked. Book 1 remains incomplete.

## Audit basis

Freshly checked against PR #69 learner-facing head `d4d5b4cd9f7a09082305c2644a556dc83bb2a315` and the unchanged frozen packet:

- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-activity-spec.md`
- `course/book1/unit45.ts` through `unit48.ts`
- `course/book1/unit07.ts` and `unit24.ts` for canonical expansion ownership
- `course/book2/unit01.ts` for the 一直 / 直 migration
- `course/runtime.ts`, `lib/vocabulary-lookup.ts`, `lib/mega-challenge.ts`, `lib/practice-engine.ts`, and `lib/curriculum.ts` for Search/Mega/practice/handwriting behavior
- current Lesson-15 source ledger and frozen unit specs for dialogue/activity/review requirements
- repair commit `29c694c2385be730e11fee2bfbbcf481ca1b11bf`
- current Feature QA run #631 only as narrow technical evidence, **not** as a full deterministic-QA PASS

The conformance-state commit containing this report changes only state/report/handoff artifacts; it does not alter the audited learner-facing repair.

## Affected-path conformance

### 1. `u46-ji-explain` explicitly teaches the semantic expansion — PASS

The learner-facing step remains exactly:

- `u46-ji-explain`
- type: `phrase`
- phrase: `u46-ji-expansion`

The phrase card explicitly contains:

- **幾 jǐ**
- earlier Unit-7 sense: **“how many?”**
- Lesson-15 expansion: **“a few / several”**
- explicit **statement / non-question** framing
- explicit statement that this is an expansion of the already-owned Unit-7 word, not new canonical vocabulary

The learner-facing example is exactly:

- **她沒有幾個朋友。**
- `Tā méiyǒu jǐ ge péngyǒu.`
- **She does not have many friends / has only a few friends.**

This directly satisfies the frozen Gate-B requirement that the new sense be explained before assessment.

### 2. Explain → recognize → G001 order — PASS

The current `u46-nonspecific` order begins:

1. `u46-ji-explain`
2. `u46-ji-s1`
3. `u46-noncommittal-question-words` / formal G001

`u46-ji-s1` remains unchanged:

- prompt: **Which use of 幾 is the new Lesson-15 sense?**
- answer: **幾 = a few/several in a statement**
- explanation: **Unit 46 adds the non-interrogative few/several sense.**

The assessment is answerable directly from the immediately preceding explanation. Formal G001 remains after the expansion explanation/recognition step and was not collapsed into it.

### 3. Frozen IDs — PASS

Repair commit `29c694c...` changes only:

- the phrase target of existing `u46-ji-explain`, from `u46-g1-source` to `u46-ji-expansion`;
- addition of the dedicated `u46-ji-expansion` phrase record.

It does **not** rename or replace `u46-ji-explain`, `u46-ji-s1`, G001, any lesson ID, or any other frozen assessed step ID.

### 4. Canonical 幾 ownership / Search / Mega / handwriting — PASS

Fresh ownership checks show:

- Unit 7 still canonically owns **幾 jǐ — how many** in `newVocabulary`;
- Unit 46 has **no** `newVocabulary` row for 幾;
- Unit 46 has **no** new-character ownership for 幾;
- the global canonical vocabulary/Search source is assembled only from unit `newVocabulary`;
- Pinyin Search therefore retains the single Unit-7 canonical 幾 row;
- Mega Challenge canonical word eligibility is built from learned canonical vocabulary, so Unit 46 creates no second 幾 Mega word ownership;
- there is no Unit-46 standalone handwriting ownership for 幾.

The Unit-7 interrogative sense remains intact while Lesson 15 supplies only the local semantic expansion.

### 5. Unit 47 `好幾次` prerequisite — PASS

Unit 47 retains:

- `u47-several-times`: **吐了好幾次。**
- note: **Requires the Unit-46 幾 expansion.**
- `u47-stomach-ji-review` / `u47-stomach-x008` before the explicit sense check
- `u47-stomach-s4`: **In 好幾次, 幾 means… → a few/several**
- explanation: **This directly retrieves the Unit-46 semantic expansion.**

Because the repaired Unit-46 explanation now actually teaches that semantic distinction before Unit 47, the previously missing prerequisite is now genuine rather than merely asserted.

## Required regression spot-checks

### A003 source notation and practice isolation — PASS

Unit 48 still presents, before A003 assessment:

- `u48-prescription-support`: **一日4次／3日份／份／飯前／飯後／飯後30分鐘**
- support-only **份 fèn**
- `u48-prescription-visual`: **健康診所｜一日4次｜3日份｜飯後｜飯後30分鐘**
- **健康診所** explicitly contextual/glossed/non-assessed
- **診** explicitly deferred/non-assessed

Both A003 support/source cards remain `practice: false`, so they stay learner-visible while remaining out of productive phrase practice. Neither 份 nor 診 has canonical vocabulary, character, Search, Mega-word, or handwriting ownership.

A003 assessed answers remain exactly:

- `u48-a003-s1` → **四次**
- `u48-a003-s2` → **飯後30分鐘**
- `u48-a003-s3` → **十二包**

### A002 visual roles — PASS

The three distinct source roles/scenes remain:

- `u48-a002-visual-1`: 老李; restroom/lower-abdomen scene; acceptance
- `u48-a002-visual-2`: 小陳; bed scene; acceptance
- `u48-a002-visual-3`: 王先生; throat/neck scene; polite rejection

All retain the shared source suggestion bank without inventing fixed symptom→advice mappings.

### Five semantic-listening repairs — PASS

All five remain semantic assessments with `semanticAnswer: true`:

- `u46-review-l1` — modal 得 **děi = must/have to**
- `u46-review-l3` — identify what is absent from the complete advice bundle
- `u47-stomach-l1` — stomach discomfort + repeated vomiting
- `u48-g7-l1` — separable-verb duration + degree comparison
- `u48-review-l3` — separable duration + much-better comparison

### Support-only 您 — PASS

Unit 46 still explains **您 nín** before source use, explicitly marks it support-only, and retains **好的，謝謝您。**. 您 is absent from canonical NEW vocabulary and formal handwriting ownership.

### Canonical totals and expansion model — PASS

Fresh current totals:

- NEW lexical forms: **12 + 10 + 12 + 8 = 42**
- NEW formal characters: **12 + 9 + 8 + 1 = 30**
- grammar introductions: **2 + 1 + 4 = 7**

The only Lesson-15 lexical semantic expansions remain:

- **幾**: Unit-7 interrogative “how many?” → Lesson-15 non-interrogative “a few / several”
- **跟**: Unit-24 companionship “with” → Lesson-15 recipient/addressee “to”

Neither expansion creates duplicate canonical vocabulary, Search, Mega-word, or handwriting ownership.

### Prerequisites / explain-before-test / handwriting lifecycle — PASS

The narrow repair changes no other prerequisite edge. All 30 NEW characters still have ordered owning-lesson handwriting lifecycle coverage:

**intro → trace → build → complete → memory**

and each has later review `complete` retrieval. Standalone character practice remains progress-gated by completion of the owning non-review lesson.

### All 25 dialogue turns — PASS

Fresh normalized source-to-implementation matching covers all:

- D1T01–D1T12 = **12**
- D2T01–D2T13 = **13**
- total = **25**

Direct-address/name-glyph normalization follows the frozen policy; no source turn is lost.

### A001–A005 — PASS

Current implementation retains:

- A001 exact four-row comparison source data and review transfer
- A002 three source visual roles plus Task 2 and review transfer
- A003 prescription support + three exact answers + review transfer
- A004 all three 把 outcomes with controlled/review/cumulative transfer
- A005 four health-condition questions with review/cumulative transfer

### Review floors / delayed retrieval — PASS

Review counts remain:

- Unit 45: **32** steps / **3** listening
- Unit 46: **34** / **3**
- Unit 47: **34** / **3**
- Unit 48: **58** / **3**

All four unit reviews still retrieve every canonical NEW lexical item. Required 幾 and 跟 sense retrieval remains present. Later review/cumulative items continue to pull material forward across Units 45→46→47→48.

### Search / Mega behavior — PASS

Canonical Pinyin Search and Mega Challenge word ownership continue to derive from canonical vocabulary. Therefore:

- 幾 retains one canonical word owner: Unit 7
- 跟 retains one canonical word owner: Unit 24
- Lesson 15 creates no duplicate canonical Search row or Mega word
- support-only 您 / 份 / 診 do not gain canonical Search/Mega word ownership
- standalone handwriting continues to use canonical character ownership and completion locks

### Unit-48 cumulative closure — PASS

Unit 48 still contains:

- `u48-review-cum1` through `u48-review-cum12`
- `u48-review-cap1` through `u48-review-cap4`
- A001–A005 cumulative function checks
- semantic expansion contrasts
- earlier-unit retrieval and source-era culture closure

The narrow Unit-46 repair does not weaken final cumulative closure.

### 一直 / 直 migration and saved-progress topology — PASS

Current first ownership remains:

- **一直** NEW vocabulary in Book-1 Unit 45
- **直** NEW formal character in Book-1 Unit 45

Book-2 Unit 1 retains:

- **一直** as review vocabulary
- **直** as review character
- no reclaimed first ownership

A fresh comparison with `main` confirms the Book-2 Unit-1 lesson IDs and all step IDs remain unchanged, as does unit order. The ownership migration therefore preserves saved-progress topology.

## Narrow technical verification

Feature QA run **#631** / id **36230154732** ran on pre-conformance-state head `d4d5b4cd9f7a09082305c2644a556dc83bb2a315`.

Relevant affected-path results:

- curriculum generation: **PASS**
- curriculum graph validation: **PASS**
- targeted tests for changed unit modules: **PASS**
- character coverage check: **PASS**
- regression suite: **FAIL**, but the single failure was completion-state schema only:
  - `openFindings[0] must be an object`
- TypeScript and Pages build were skipped after that failure.

The learner-facing repair was not the failing assertion. The completion state had temporarily stored the pending conformance note as a string rather than the controller-required finding object. This conformance transition removes that resolved pending note, restores implementation PASS, and normalizes `openFindings` to an empty array.

Run #631 is **not** claimed as deterministic-QA PASS evidence. A complete deterministic rerun is still mandatory on the new final authored head.

## Final state decision

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR.**

State transition:

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Deterministic QA: **PENDING RERUN**
- Historical Simulation A: **FAIL evidence preserved**
- Historical Simulation A rerun: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR evidence preserved; not rerun after repair**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Next valid action: perform the full deterministic-QA rerun from the updated handoff. Do not reuse any historical deterministic PASS or run #631 as final QA evidence.
