# Dense reading expansion — plan before implementation

Follow-up requirement: every Book 1 unit from 11–48 must have a reading. Fill the
12 uncovered units (12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45) with a four-line,
two-question mini checkpoint, still using the same engine and whole-unit unlock.
Keep all 57 already-authored readings unchanged. This brings the total to 69.

Baseline: main 6f18834, 44 existing readings. Preserve their complete payloads,
IDs, versions, answers, three-reading milestone sets, and Book 2 readings.

Add 13 optional end-of-unit readings, starting at Unit 11. They use the current
ReadingCheckpoint engine and registry, not lesson steps or a second progress model.
Full prior-unit teaching plus the current unit remain required. Nothing is inserted
into a lesson, so existing lesson indices, completion, backend schema and cloud
merge behavior do not need a migration.

| Unit | Format | Reading task |
|---|---|---|
| 11 | Café dialogue | Track two people, drink sizes, and separate takeout orders |
| 14 | Shop dialogue | Compare two phones and distinguish price from capability |
| 17 | LINE-style messages | Reconcile recommendations with food preferences |
| 20 | Campus notice | Locate rooms using floors and reference landmarks |
| 23 | Schedule + notes | Find a usable meeting window and respect permission |
| 26 | LINE-style messages | Distinguish a proposed outing from the agreed plan |
| 29 | Visit itinerary | Track dates, alternatives and conditional plans |
| 32 | Housing notice | Combine room layout, facilities and walking distance |
| 35 | LINE-style messages | Track who pays, study sequence and a hoped-for job |
| 38 | Dialogue | Connect birthday plans to a class-end trigger and meeting place |
| 41 | Birthday messages | Distinguish ordered food, a gift and wishes |
| 44 | Weather notice + messages | Compare conditions and identify the revised plan |
| 47 | Health dialogue | Track symptoms, treatment and an offer of help |

Each is original, self-contained, 8–10 connected lines, four evidence-backed
questions, sentence-by-sentence explanations and reading strategies. Early readings
stay within early language; later ones combine current grammar with older material.
Questions require detail, cross-line synthesis, reference or inference, not simply
matching identical text. Distractors have one unambiguous correct answer.

Presentation is metadata only: dialogue, messages, schedule or notice. Keep tap-word
help, per-word pronunciation reveal, pinyin hidden on open/retry, question submission
gate, evidence anchors and the after-submission walkthrough. Use actual selectable
Chinese, never images of text. Existing unmarked passages retain their current style.

Safety: explicit segmentation + grammar IDs + a vocabulary-boundary audit; avoid
future grammar even when its characters are familiar. No new canonical vocabulary,
handwriting, Search or Mega ownership. Minimal contextual glosses only when needed.
No changes to auth, credentials, RLS, database, RPCs or progress schemas.

Validation: snapshot old reading payloads and curriculum/session shapes; validate
all new tokens, pinyin/help, grammar prerequisites, question/evidence indices and
unique saved keys. Test profile separation, partial resume, completion/replay,
mobile/desktop rendering, fresh-learner locks, no cloud calls caused by readings,
existing sync regressions, TypeScript and Pages build. Reading answers remain
device-local (as before); do not claim new cloud reading-answer sync.
