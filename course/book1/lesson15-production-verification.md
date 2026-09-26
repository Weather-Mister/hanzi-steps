# Book 1 Lesson 15 — Production Verification

Stage: production verification  
Production merge: `062bda490d9704dee2b88ea699d09c61758f89f4`  
PR: **#69**  
Date: **2026-09-26**

## Verdict

**PASS**

No production-only blocker or major defect was found after merging Lesson 15 / Units 45–48.

## Deployment

GitHub Pages workflow:
- workflow: **Deploy Hanzi Steps to GitHub Pages**
- run: **#162**
- run id: `36247133565`
- deployed merge SHA: `062bda490d9704dee2b88ea699d09c61758f89f4`
- build job: **SUCCESS**
- deploy job: **SUCCESS**
- Pages deployment status: **success**
- production URL reported by GitHub Pages: `https://weather-mister.github.io/hanzi-steps/`
- deployed artifact id: `10907229540`

GitHub reported the Pages deployment for the exact merge SHA and then reported **success**.

## Production curriculum/build evidence

The production Pages workflow ran `npm run test:curriculum` before packaging.

Production run #162:
- tests: **163**
- pass: **162**
- fail: **0**
- skipped: **1**
- generated curriculum: **51 units / 355 lessons**
- character coverage: **471 unique first-time characters**
- Pages build: **PASS**
- artifact upload: **PASS**
- deployment: **PASS**

The one skipped test is the repository's intentional existing skip, not a Lesson-15 failure.

## Exact release content

The merged release contains:
- Book-1 Units **45–48**;
- 42 Lesson-15 canonical NEW lexical forms;
- 30 Lesson-15 NEW formal characters;
- seven Lesson-15 grammar systems;
- repaired Unit-45 prerequisite-safe review;
- repaired Unit-47 G003 sequencing;
- repaired learner-safe listening payloads;
- learned-only Pinyin Search progression;
- support/source-data productive-practice isolation;
- all three A004 response outcomes;
- Unit-47 D2T01–D2T07 integrated replay;
- A001–A005 source-transfer content;
- 一直 / 直 first ownership in Book-1 Unit 45 with Book-2 Unit 1 review-only migration.

## Final pre-merge QA applicability

The final PR controller/release head also passed Feature QA:
- Feature QA **#697**
- run id: `36246614169`
- conclusion: **SUCCESS**
- regression suite: **206 tests / 205 pass / 0 fail / 1 intentional skip**
- curriculum generation/check: PASS
- character coverage: PASS
- TypeScript: PASS
- Pages build: PASS

Therefore the production merge did not bypass the complete feature QA suite.

## Progress / migration safety

The Lesson-15 release does not modify any prior Book-1 Unit 1–44 source file.

The Book-1 manifest prefix through Unit 44 is unchanged; Units 45–48 are appended contiguously.

The Book-2 Unit-1 一直 / 直 ownership migration preserves the existing 138 saved-progress IDs and their order, as covered by the Lesson-15 migration/regression checks.

## Search / Mega / handwriting

Production build/regression evidence includes the final progression guards:
- learner-facing Pinyin Search reveals canonical vocabulary only after its owning lesson;
- Search handwriting remains first-teaching gated;
- Mega/adaptive vocabulary remains completion-gated;
- support/source-data phrases marked `practice:false` do not enter productive adaptive/Mega phrase practice;
- all 30 Lesson-15 NEW characters retain full handwriting lifecycles and review retrieval.

## Production-site verification limitation

The external browser available to this audit could not directly open the GitHub Pages URL. Production verification therefore uses GitHub's successful Pages deployment record for the exact merge SHA, the production workflow's complete curriculum tests/build, and the exact deployment artifact metadata. No manual browser interaction is claimed.

## Result

**Production verification: PASS.**

Lesson 15 / Units 45–48 are deployed successfully.
