# Hanzi Steps

Traditional Chinese and Taiwanese Mandarin.

**Curriculum authoring starts at [ADDING_A_UNIT.md](ADDING_A_UNIT.md).**
The live curriculum is isolated in `course/book1/` and `course/book2/`, with
`course/manifest.json`, a generated compact index and structural validation.
The descriptions below document the original foundation units.

Unit 1 keeps its original four lessons and review: 68 short activities around
你、好、我、是、學、生、嗎. Unit 2 adds six lessons and a review: 100 activities,
13 new words/forms, and 11 characters (他、她、們、也、不、的、一、個、人、有、沒).
Unit 3 adds six lessons and a review: 113 activities, 13 words/forms, and 13
characters (這、那、什、麼、書、本、兩、很、大、小、在、裡、都), with its own plum palette.
Unit 4 adds six lessons and a review: 119 activities, 13 words/forms, and 13
characters (去、來、哪、看、和、中、文、英、說、聽、想、要、會), with an amber palette.
Character introductions, component explanations, tracing, missing strokes,
independent handwriting, matching, listening, and sentence building all continue.
Every character also has standalone practice. Lesson content is original.

Unit 2 introduces pronoun plurals, 也, 不 versus 沒有, possession with 的, counting
with 個, 有, and yes/no answers before testing those patterns. Unit 3 adds pointing
with 這 / 那, 什麼 questions, 本 for books, 兩 before classifiers, adjective
descriptions with 很, 不 + adjective, locations with 在, and 都 for all or both.
Each rule appears before it is tested; vocabulary and writing stay the focus.
Unit 4 builds action + object sentences, destinations with 去 / 來, questions
with 哪裡, noun coordination with 和, language names, wishes with 想, intentions
with 要, and learned ability with 會. It introduces 學 as an independent word
while reusing its familiar writing from Unit 1. Negation and question forms
are explained explicitly, without introducing past-event or progressive markers.
The Notes tab keeps
each unit’s vocabulary and explanations available for review. Exercise pattern
hints count as supported practice. The first vocabulary goal is 100 common words,
expanding toward about 500 one unit at a time. Selection uses Sinica’s top-frequency
word/POS table plus useful everyday forms. The progress bar counts unique taught
surface words from that table; a multi-character word is counted once.
After Unit 4 there are 46 taught words/forms, including 32 unique entries from
the frequency table. Useful supporting words also count in the unit word lists.

## Running and verifying

Use the Sites project installation and build scripts described by the Sites skills.
`npm run db:generate` produces migrations after a schema change. `npm test` builds
and verifies the curriculum, character geometry, the actual stroke matcher, and
checkpoint validation. `npx tsc --noEmit` checks types. The progress tests exercise the actual route
in a local Workers runtime with persisted D1, including an email-only identity,
old and new lesson checkpoints, offline recovery, and account separation.

## Structure

- `course/`: per-unit curriculum, schema, manifest, generated indexes and glyph sources.
- `lib/curriculum.ts`: stable curriculum adapter and checkpoint validation.
- `validation/`: structural checks, generation and lossless migration guards.
- `lib/stroke-data.json`: 44 unchanged Taiwan glyphs from AnimCJK's `graphicsZhHant.txt`.
- `components/writing-pad.tsx`: Hanzi Writer integration with progressive guidance.
- `lib/writer-target.ts`: pointer input and listener cleanup using the library's render-target extension.
- `components/learning-app.tsx`: unit navigation, lesson flow, character library, grammar notes, and results.
- `app/api/progress/route.ts`: authenticated D1 lesson checkpoints.
- `db/schema.ts` and `drizzle/`: persistence schema and versioned migrations.
- `public/credits.txt`: data provenance, attribution, and license links.

On GitHub Pages, Hanzi Steps uses lightweight username profiles instead of OAuth.
Usernames are normalized to lowercase and may contain letters, numbers, and underscores.
There is intentionally no password: entering the same username opens the same cloud
progress profile on another device. Existing Google-linked progress is backfilled to a
username derived from the old email local-part when the username migration is applied.
Anonymous visitors can still practice without an account. Checkpoints update monotonically,
so an older network request cannot replace a later completed exercise. Browser storage
contains display preferences, the remembered username, and unsynced checkpoint drafts for recovery.

Audio uses an available Taiwanese Mandarin system voice. When none is available,
listening offers a pinyin alternative and records the exercise as supported practice.
Animation-only study and writing hints also count as supported, not independent,
practice. Stroke recognition does not force-accept a stroke after repeated errors.

No generated imagery is used. Glyphs and component diagrams render licensed stroke
paths directly. Character memorization notes are labelled as aids rather than
claimed historical etymologies. Strokes follow AnimCJK's Taiwan-specific variant.

## Expanding the curriculum

Follow [ADDING_A_UNIT.md](ADDING_A_UNIT.md). Normal additions change one unit
module, its glyph file and one manifest entry; generated outputs are automatic.
