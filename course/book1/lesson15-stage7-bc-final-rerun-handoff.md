# Book 1 Lesson 15 — Stage 7 B/C Final Rerun Handoff

Working PR: **#69**
Branch: `book1-lesson15-source-a`

Current checkpoint:
- Simulation A final rerun 2: PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR
- Initial Simulation B: historical FAIL — 3 MAJOR
- Initial Simulation C: historical FAIL — 2 MAJOR
- All five B/C findings repaired
- Repair conformance + full deterministic QA: PASS
- Feature QA #690 / id 36243000967: SUCCESS
- 206 tests / 205 pass / 0 fail / 1 intentional skip
- TypeScript PASS
- Pages build PASS
- generated-only follow-up: f7f083c65ae616e3187c4a20e2708e1167561f4c
- follow-up #691: action_required / no executable QA job
- release LOCKED
- Book 1 incomplete

Important: the historical files
- `lesson15-learner-simulation-b.md`
- `lesson15-learner-simulation-c.md`
remain the original failure reports and must NOT be overwritten.

## Simulation B final rerun

Persist:
- `course/book1/lesson15-learner-simulation-b-final.md`

Run in a fresh chat. Do not read Simulation A/C or the historical B failure report before completing the independent review.

Audit the latest PR state after the B/C repairs. Attack every learner-facing assessed payload across Units 45–48 for wrong keys, ambiguity, clues, malformed distractors, token/order problems, pinyin/Traditional errors, semantic-listening mismatch, unsupported material, future-target leakage, hidden curriculum metadata, and divergence from current/frozen specs.

Explicitly retest:
- support-only/source-data phrases do not enter adaptive/Mega productive practice;
- A004 shows all three response outcomes: 好的，沒有問題。 / 太好了。 / 對不起，我不知道是你的。;
- assessed prompts no longer require hidden G001/G003/G006/G007 IDs or curriculum sequencing metadata;
- Pinyin Search does not expose unlearned canonical vocabulary;
- Unit-47 integrated D2T01–D2T07 replay is complete and learner-facing;
- corrected u45-review-f1;
- Unit-47 G003 sequencing;
- 20 learner-safe listening repairs;
- five protected semantic-listening items;
- A001–A005;
- Unit-48 cumulative/capstone.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR. Do not repair anything.

## Simulation C final rerun

Persist:
- `course/book1/lesson15-learner-simulation-c-final.md`

Run in a separate fresh chat. Do not read Simulation A/B or the historical C failure report before completing the independent review.

Simulate cumulative completion of Units 45→46→47→48, then review, Pinyin Search, adaptive practice, handwriting, and Mega Challenge.

Explicitly verify:
- all 42 canonical NEW lexical forms appear in learner-facing Search/Mega only at/after owning lesson;
- 幾/跟 keep earlier canonical ownership but Lesson-15 expansions are taught/retrieved;
- 一直/直 first-own in Unit 45 and Book-2 Unit 1 remains review-only;
- support-only/deferred 您/對不起/份/分鐘/診/source names remain non-canonical and outside productive practice;
- all 30 NEW characters complete recognition/handwriting/retrieval;
- delayed retrieval works across units;
- all 25 dialogue turns survive cumulatively;
- Unit-47 integrated D2T01–D2T07 replay is complete;
- A001–A005 survive;
- repaired listening distractors remain future-safe;
- Unit-48 review closes Lesson 15;
- Pinyin Search, adaptive practice, Mega and handwriting expose nothing prematurely and omit nothing intended afterward.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR. Do not repair anything.

## Controller after both reports

If both final reruns PASS:
- mark Stage 7 PASS;
- advance immediately to Stage 8 bidirectional traceability;
- keep release locked until traceability + fresh hostile release audit + Gate C.

If either finds BLOCKER/MAJOR:
- reopen only the smallest affected gate and repair in one compressed repair → conformance → full deterministic QA loop.
