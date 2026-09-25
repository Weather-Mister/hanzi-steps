# Book 1 Lesson 15 — Independent Curriculum Audit 2 Handoff: Pedagogy

Working repository: Weather-Mister/hanzi-steps  
Working draft PR: #69  
Working branch: book1-lesson15-source-a  
Published Book-1 endpoint before Lesson 15: Unit 44

Current checkpoint: Stage 3 design passes are complete. Proposed architecture is Units 45–48. Gate A is still PENDING.

## Read in a fresh context

1. automation/book1/PROTOCOL.md, especially Stage 3 / Curriculum architecture and Gate A.
2. ADDING_A_UNIT.md, especially pacing and prerequisite-before-test rules.
3. course/book1/lesson15-dependency-ledger.md.
4. course/book1/lesson15-dependency-audit.md.
5. course/book1/lesson15-curriculum-blueprint.md.
6. course/index.json through Book 1 Unit 44.
7. Targeted prior unit files only when necessary to verify a disputed prerequisite or prior teaching claim.
8. course/book1/completion.json.

Do not read another Lesson-15 curriculum-audit verdict before completing your own pedagogy pass.

## Audit lens

Independently answer:

**Can a strict Unit-44 learner progress through proposed Units 45–48 without hidden prerequisites, bad sequencing, artificial boundaries, or unreasonable cognitive load?**

Audit:
- unit boundaries;
- six-lesson sequencing;
- lexical load and character load;
- review balance;
- grammar ordering;
- support-item timing;
- dialogue timing;
- source-task timing;
- character first-introduction order;
- deliberate pull-forwards;
- cumulative coherence.

Attack these specific risks:

1. Unit 45 has 12 NEW words + 12 NEW characters but no formal grammar. Is that genuinely teachable rather than a character dump?
2. Unit 46 pulls V026 幾 and V035 別 forward. Verify both pull-forwards are pedagogically justified and occur before G001/G002.
3. Verify G002 is not taught before every repaired prerequisite, especially V035, X031, verbal-了 vs sentence-final-了, negation, and 是不是 support.
4. Unit 47 must not use 好幾次 before both V026 and V027.
5. G003 must build on prior verbal 了 / 一…就… / 以後 without collapsing their contrasts.
6. Unit 48 has only 9 formal lexical learning targets but four formal grammar targets. Verify that the low lexical count is justified and that the unit is not conceptually overloaded.
7. Verify G004 precedes G006.
8. Verify V011 生病, V020 睡覺, V029 看病, and V043 回家 are available before productive G007 separation.
9. Verify X039 分鐘 is taught before A001 as well as A003.
10. Verify X035 fractional bowl quantities are taught before A001.
11. Verify prescription support X037/X038/X039 is taught before A003.
12. Verify A002 is not attempted before 最好 / 應該 / acceptance-rejection / 關心 support is available.
13. Verify the proposed dialogue split does not create unnatural repetition or comprehension before teaching.
14. Verify deferred names/glyphs cannot become hidden handwriting, Search, Mega, or answer prerequisites.
15. Verify the planned Unit-45 first ownership of 一直 / 直 does not rely on Book 2.

Check for:
- overloaded units;
- thin units;
- grammar taught after use;
- too many unrelated concepts in one lesson;
- lexical sequencing that fights the communicative arc;
- character order that forces unseen glyphs;
- missing review bridges;
- false prior-knowledge assumptions;
- future prerequisites;
- circular intra-Lesson dependencies;
- unjustified source reordering.

## Output

Return:
- BLOCKER findings
- MAJOR findings
- MINOR findings
- PASS / FAIL

PASS requires BLOCKER = 0 and MAJOR = 0.

If a curriculum defect is found, repair the smallest affected rough/refined/blueprint artifact and re-audit until the pedagogy result genuinely passes. Do not silently modify upstream source/dependency classifications.

Persist the final audit as:
- course/book1/lesson15-curriculum-pedagogy-audit.md

Update course/book1/completion.json to record the audit result, but **do not pass Gate A** unless all three independent curriculum audits have passed.

## Stop condition

Stop after the pedagogy audit artifact and controller update.

Do not:
- perform the source-fidelity audit in this context;
- perform the adversarial audit;
- freeze Gate A;
- begin activity engineering or implementation;
- merge or publish.
