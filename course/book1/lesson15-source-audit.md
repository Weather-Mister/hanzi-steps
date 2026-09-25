# Book 1 Lesson 15 — Fresh-Context Source Audit

**Scope:** *A Course in Contemporary Chinese 1*, Lesson 15 「我很不舒服」 / “I Don’t Feel Well”, printed pp. 323–350 / PDF pp. 350–377.

**Independent audit inputs:** the authoritative Lesson-15 source range, `course/book1/lesson15-source-ledger.md`, `course/book1/lesson15-source-audit-handoff.md`, and the Stage-1 source-audit rules in `automation/book1/PROTOCOL.md`.

The independent first pass was completed before consulting the prior Lesson-15 extraction/reconciliation artifacts.

**Audit question:** what is missing, duplicated, distorted, unsupported, misanchored, misclassified as formal vs support-only, or incompletely preserved in restrictions, contrasts, negation, questions, pragmatics, drills, activities, visuals, culture, and self-assessment?

## First pass — FAIL

### BLOCKER

**B1L15-SA001 — Required classroom-task and visual inputs were incompletely preserved.**

The reconciled ledger correctly named Activities I–V, but several source-required inputs were compressed enough that later dependency/activity work could not reconstruct the textbook task faithfully:

- **Activity I — Let’s Compare:** the ledger named dinner quantity, rent, transport mode, and travel time, but omitted the source table’s exact values for 田中、如玉、安同、月美.
- **Activity II — Who Is Taking Care of Me?:** the ledger preserved the accept/reject roles but omitted the exact model closing, the printed address forms **老李 / 小陳**, the first two acceptance endings (**好的。 / 謝謝你。**), and the third refusal shell beginning **謝謝你的關心。** with an open completion slot. It also did not explicitly carry forward that the three symptom/advice prompts depend on source illustrations.
- **Activity III — Taking Medication:** the support ledger generalized the prescription to `一日…次 / …日份` and meal/minute notation instead of preserving the exact visual data **一日4次、3日份、飯後30分鐘**, so the three source questions were not fully recoverable from the ledger.
- **Activity IV — Use 把 Construction:** the ledger summarized the three contexts but did not preserve the exact completion frames and required disposal-construction outcomes for the 50 小籠包, today’s 功課, and the speaker’s 西瓜.

Missing required source-task material is a protocol BLOCKER.

**Resolution:** repaired in `course/book1/lesson15-source-ledger.md` on commits `1289327f89a5a84da693847980db84c5b5b53d2b` and `73031f0a60a8b6d2a48f3515e686bbc0f8693f38`.

### BLOCKER

**B1L15-SA002 — The dependency-facing support ledger was too selective across grammar examples and drills.**

The formal grammar records were substantially correct, but several source-attested prompt/example items that can become hidden prerequisites were absent from the X-ledger. Representative omissions included:

- G001 drill support around 房租、一個月、週末快到了、去…玩、臺灣有很多朋友 and 買…東西;
- G002 example/picture support such as 書、咖啡、小籠包、機車 and 老闆;
- G003 question/drill support such as 見面、KTV、紐約、買禮物、足球比賽、日本旅行、開始上課 and 回來;
- G004 drill support around 湯、籃球／網球比賽、工作、房租、學費、衣服 and 臭豆腐;
- G005/G006 drill support around 下雪、從…到…、分鐘、西瓜、芒果 and 玩得開心;
- G007 duration/context support such as 每天、八個鐘頭、新年、放幾天假 and 三小時.

The dependency stage is required to detect hidden vocabulary/grammar prerequisites. Leaving these source-attested supports unrepresented would make that check incomplete.

**Resolution:** expanded the existing X019–X026 support families and activity-support records without promoting them to formal Lesson-15 vocabulary.

### MINOR

**B1L15-SA003 — Two source-detail fidelity issues.**

- V022 **臉色** shortened the source gloss to generic “facial color/complexion,” losing the source’s explicit healthy/sick and pleased/angry range.
- CUL001 paraphrased the first mask-use context as “during cold season,” while the source specifically frames it around **seasons changing**, easy cold transmission via the respiratory system, and crowded buses/MRT.

**Resolution:** restored the fuller source gloss/range and tightened the culture summary to the textbook wording and publication-era scope.

## Re-audit after repairs

The corrected ledger was rechecked against the full Lesson-15 source range, including:

- lesson topic/objectives and end self-assessment;
- all 12 Dialogue-I turns;
- all 13 Dialogue-II turns plus the 如玉下課以後 scene marker;
- both formal vocabulary/phrase inventories;
- Grammar I–VII functions, restrictions, negation, questions, contrasts, English-reference material, examples, and drill families;
- classroom Activities I–V, including comparison-table data, response-role shells, prescription support, picture-based 把 completions, and the four-question phone task;
- the Wearing Surgical Masks culture reading and photo contexts;
- source anchors and canonical source counts;
- the 44 formal lexical entries and 63-character first-appearance inventory.

### Remaining findings

- **BLOCKER: 0**
- **MAJOR: 0**
- **MINOR: 0**
- **Unresolved source disagreements: 0**

## Final result — PASS

The Lesson-15 source gate satisfies the protocol requirement of zero BLOCKER and zero MAJOR findings, with no unresolved source disagreement.

The repository may advance to the **dependency-ledger stage**.

No NEW / KNOWN / REVIEW / EXPANSION / DEFERRED classifications, dependency ledger, Lesson-15 unit boundary, learner-facing activity design, implementation, merge, or publication was created during this audit.
