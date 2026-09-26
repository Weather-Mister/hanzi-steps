# Book 1 Lesson 15 — Curriculum Audit 1: Source Fidelity

Audited artifact:
- `course/book1/lesson15-curriculum-blueprint.md`

Authoritative upstream artifacts:
- `course/book1/lesson15-source-ledger.md`
- `course/book1/lesson15-dependency-ledger.md`
- `course/book1/lesson15-dependency-audit.md`

Scope: curriculum architecture only. This audit independently tests whether every validated Lesson-15 source item has a justified, source-faithful home in proposed Units 45–48. It does not perform the pedagogy or adversarial curriculum audits, freeze Gate A, or begin activity engineering.

## Audit question

Does every required Lesson-15 source item have a justified, source-faithful home in Units 45–48 without omissions, duplicate ownership, lost restrictions, hidden prerequisites, distorted activities, unsafe deferrals, character/count errors, or unsupported source modernization?

## Findings discovered and repaired before final verdict

### B1L15-CUR-SF-001 — three dialogue turns were sequenced before required Lesson-15 material
Severity before fix: **MAJOR**

Three source turns had been attached to lessons that occurred before a required NEW/EXPANSION item in the same turn was introduced:

1. **D2T04** was assigned to U47-L5 while **V041 不用了 / P002** was not scheduled until U47-L6.
2. **D2T08** was assigned to U48-L1 while **V043 回家** was not scheduled until U48-L5.
3. **D2T12** was assigned to U48-L3 while **V037 包** was not scheduled until U48-L6.

This violated the validated dialogue dependency invariant even though the unit-level ownership ranges were otherwise correct.

Resolution:
- moved **不用 了 / P002** into U47-L5 before D2T04–D2T06;
- moved **回家** into U48-L1 before D2T08–D2T10;
- moved **包** into U48-L3 before D2T12;
- later lessons now retrieve those items rather than first-introduce them.

No source/dependency disposition or unit boundary changed.

Status: **resolved**.

### B1L15-CUR-SF-002 — source classroom-task payloads were not explicit enough
Severity before fix: **MAJOR**

The blueprint had correct activity ownership, but several activity entries did not pin enough of the validated source payload to prevent downstream silent truncation.

Resolution:
- **A001** now explicitly preserves the exact source table, participants, the three task families **吃晚飯 / 房租 / 怎麼去臺南玩**, travel-duration comparisons, and exact **臺南** context;
- **A002** now explicitly preserves the three picture-driven role prompts, the two acceptance / one rejection structure, required illustration input, and the patient/doctor role-play;
- **A003** now explicitly preserves all three prescription questions after **一日4次 / 3日份 / 飯後30分鐘** support is available;
- **A004** now explicitly preserves all three required 把 outcomes:
  1. 把這50個小籠包吃了
  2. 把今天的功課寫了
  3. 把我的西瓜吃了
- **A005** now explicitly preserves the sick-at-home 如玉 call and the requirement to ask **four questions** about her condition;
- A004 support wording now distinguishes REVIEW X040–X042 from NEW support X043 instead of blurring their dependency dispositions.

Status: **resolved**.

### B1L15-CUR-SF-003 — G005/G006 distinction needed explicit architecture guardrails
Severity before fix: **MINOR**

The blueprint assigned G005 and G006 to separate lessons, but their source distinctions were only implicit in the upstream IDs.

Resolution:
- **G005** now explicitly preserves both source action-comparison patterns, object-triggered verb repetition, **不 before 比** negation, and **嗎 / 是不是** question routes;
- **G006** now explicitly preserves **一點 / 得多 / 多了** as comparison-degree outcomes;
- the blueprint explicitly keeps G005 action comparison distinct from G006 degree complements.

Status: **resolved**.

## Final source cross-check

### Formal lexical inventory

All **44 / 44** formal source entries have exactly one formal architecture allocation:
- **42 NEW**
- **2 EXPANSION**: V026 幾 and V032 跟
- duplicates: **0**
- omissions: **0**

Unit allocation remains:
- Unit 45: 12
- Unit 46: 10 NEW + 1 EXPANSION
- Unit 47: 12
- Unit 48: 8 NEW + 1 EXPANSION

The Book-2 collision note remains intact: V002 一直 must become canonical Book-1 Unit-45 ownership before release, with the later Book-2 occurrence migrated to review.

### Grammar

All **G001–G007** have exactly one formal owner:
- G001–G002 → Unit 46
- G003 → Unit 47
- G004–G007 → Unit 48

Source-sensitive checks pass:
- **G001** remains negative/non-specific and distinct from Unit-40 question-word totality.
- **G002** preserves definite-reference bias, bare outward-transitive action-verb restriction, rejection of inward verbs, sentence-final 了 behavior, 沒/別-before-把 negation, and source question forms.
- **G003** preserves immediate succession, the 一…就… contrast, 以後 compatibility, and the source question restriction.
- **G004** preserves 一點 + NP, Vs + 一點, 有（一）點 + Vs, and 一點點 distinctions.
- **G005** preserves action comparison with 得, both source patterns, negation, and questions.
- **G006** preserves 一點 / 得多 / 多了 comparison-degree contrasts and remains distinct from G005.
- **G007** preserves verbal-了 insertion, recipient/object insertion, and duration insertion.

### Dialogue

All **25 / 25** dialogue turns have a unit home:
- D1T01–D1T05 → Unit 45
- D1T06–D1T12 → Unit 46
- D2T01–D2T07 → Unit 47
- D2T08–D2T13 → Unit 48

After repair, no literal source turn is scheduled before its required Lesson-15 NEW/EXPANSION material:
- D2T04 now follows 不用了/P002;
- D2T08 now follows 回家;
- D2T12 now follows 包;
- D2T13 remains split safely: its G006 degree branch appears before G007, while productive separable-verb treatment waits for U48-L5.

### Pragmatics

All **P001–P009** have explicit homes or review treatment:
- P001/P002 → Unit 47
- P003 REVIEW → Unit 47
- P004/P005/P006/P008/P009 → Unit 48
- P007 → Unit 46 with NEW-support 您

No pragmatic function is collapsed into a misleading literal gloss.

### Support records

All **X001–X044** remain routed:
- X001–X005 → Unit 45
- X006–X007, X019–X020, X029, X031, X040–X043 → Unit 46
- X008–X011, X014, X021–X022, X029–X030 → Unit 47
- X012–X018, X023–X029, X032–X039, X044 → Unit 48

DEFERRED support remains non-productive:
- proper-name glyphs stay contextual;
- 妳 remains source orthography, with learner-facing normalization permitted;
- 北 / 紐 / 約 / 烏 / 龍 stay contextual/glossed or substitution-safe where the ledger permits;
- 診 remains prescription-header-only;
- 拒 / 絕 remain instructional-label-only;
- 臺南 is preserved exactly for A001 but is not promoted to vocabulary/handwriting/Search/Mega ownership.

NEW support is not silently converted to REVIEW:
- 您 is explicitly introduced before literal doctor-patient productive use;
- 份 is explicitly introduced before prescription reading;
- X043 is explicitly explained before A004.

### Grammar drill families

All **DR001–DR007** remain attached to their owning grammar lessons:
- DR001–DR002 → Unit 46
- DR003 → Unit 47
- DR004–DR007 → Unit 48

No drill family is used as a substitute for teaching its grammar target.

### Classroom activities

All **A001–A005** have a source-faithful home:
- A001 → Unit 48 after G005/G006, V039, X035, X039, transport/rent review, and contextual-name support
- A002 → Unit 48 after health-advice and accept/reject support
- A003 → Unit 48 only after prescription support
- A004 → Unit 46 after G002 and X040–X043 support
- A005 → Unit 47 after F001/F002 health-inquiry/symptom support

Special checks pass:
- **A001** preserves the exact source comparison-table requirement, 臺南, durations, and fractional bowl quantities.
- **A003** has **一日4次 / 3日份 / 飯後30分鐘** available before the three source questions; 12 packets remains an arithmetic inference, not lexical ownership.
- **A004** preserves all three required 把 outcomes.
- **A005** preserves the four-question health call.

### Culture

**CUL001** remains Unit-48 textbook-era culture only. The blueprint does not modernize the source into present-day health guidance or policy claims.

### Outcomes and self-assessment

- F001 is established in Unit 45 and completed in Unit 47.
- F002 is established in Unit 45 and completed across Units 46–47.
- F003 is established in Unit 46 and completed in Unit 48.
- F004 is established in Unit 47 and completed in Unit 48.
- S001–S004 are retrieved in the Unit-48 capstone.

### Characters

The validated formal-character count remains exact:
- **63 / 63** formal lexical characters accounted for
- **30 NEW** characters assigned exactly once
- **33 KNOWN** characters reused without re-ownership

NEW-character allocation:
- Unit 45: 12
- Unit 46: 9
- Unit 47: 8
- Unit 48: 1

The Book-2 collision for **CH004 直** remains explicitly identified for later ownership migration. No deferred name/support glyph becomes a handwriting/Search/Mega requirement.

## Unsupported additions / source distortion check

No unsupported formal vocabulary or grammar target was added.

The repairs only:
- moved already-validated Lesson-15 lexical/pragmatic items earlier within their existing unit so dialogue prerequisites are satisfied;
- made validated source-task and grammar constraints explicit.

No upstream source or dependency classification was changed.

## Final findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

The proposed Units 45–48 architecture passes **Independent Curriculum Audit 1 — Source Fidelity** after the repairs above.

This does **not** pass Gate A. The independent pedagogy and adversarial curriculum audits remain pending. Activity engineering and implementation remain locked.
