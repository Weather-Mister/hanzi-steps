# Book 1 Lesson 15 — Fresh Dependency Audit

Lesson: **Book 1 Lesson 15 「我很不舒服」**  
Audit stage: mandatory fresh-context dependency audit  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`  
Production baseline audited: `main@680ed5753382fb72151a1532095bca0a227c0658` through Book 1 Unit 44  
Validated source ledger: `course/book1/lesson15-source-ledger.md`  
Final dependency ledger: `course/book1/lesson15-dependency-ledger.md`

## Scope

Independently audited every Lesson-15 dependency disposition and every prerequisite path against:

- the validated Lesson-15 source ledger;
- the generated cumulative production curriculum through Book 1 Unit 44;
- targeted prior production units where semantic identity or prerequisite behavior required direct verification;
- later Book-2 registry material only to verify the recorded `一直 / 直` ownership collision, never as prior learner knowledge.

The audit covered all **213 pedagogically relevant durable source records**:

- B1L15-F001–F004
- B1L15-D1T01–D1T12
- B1L15-D2T01–D2T13
- B1L15-V001–V044
- B1L15-G001–G007
- B1L15-P001–P009
- B1L15-X001–X044
- B1L15-DR001–DR007
- B1L15-A001–A005
- B1L15-CUL001
- B1L15-S001–S004
- B1L15-CH001–CH063

No Lesson-15 unit split, curriculum blueprint, activity engineering, implementation, merge, or publication was performed.

## Initial findings

### BLOCKER

None.

### MAJOR

#### B1L15-DEP-AUDIT-001 — G002 / G007 prerequisite edges were incomplete

The source-sensitive prerequisite graph did not fully encode the material needed for safe productive use.

For **B1L15-G002 把**, the builder named 把 and completed-action 了 but did not explicitly connect:

- B1L15-V035 別 for the source imperative-negation branch;
- B1L15-X031 definite modifiers / possessives used in the source explanation;
- prior `u39-bu-vs-mei`;
- prior `u31-sentential-le`;
- prior `u41-shibushi` for the source confirmation-question branch.

This mattered because the source's negative 把 examples retain a **sentence-final 了**, while Unit 39 separately teaches that negating a **verbal-了 completed action** removes verbal 了. Without the explicit sentence-final-了 prerequisite and contrast, a learner or later implementation could incorrectly reject the source pattern.

For **B1L15-G007**, the builder referred generically to “new Lesson-15 separable verbs” without durable edges to the new forms used productively in separation contexts.

**Repair:**

- G002 now explicitly depends on B1L15-V017, B1L15-V035, B1L15-X031, `u39-verbal-le`, `u39-bu-vs-mei`, `u31-sentential-le`, and `u41-shibushi`.
- The ledger explicitly distinguishes source sentence-final 了 from negated verbal 了.
- G007 now names B1L15-V011 生病, B1L15-V020 睡覺, B1L15-V029 看病 where productive separation is used, and B1L15-V043 回家 for the source `回了家` example.

**Blast radius:** CURRICULUM dependency metadata only.

#### B1L15-DEP-AUDIT-002 — Activity I had hidden duration and participant-label prerequisites

B1L15-A001's required source table contains:

- `小時` in three travel-duration values;
- `分鐘` in `一個小時四十分鐘`;
- source participant names including 田中 / 如玉 / 安同 / 月美.

The builder prerequisite list named comparison grammar, fractional bowl quantities, transport, rent, and 臺南, but omitted B1L15-V039 小時, B1L15-X039 分鐘, and the contextual/deferred participant-name path.

**Repair:** A001 and the key prerequisite graph now explicitly require B1L15-V039, B1L15-X039, X025/X032 plus the hidden-name rule, while keeping those names contextual/non-assessed rather than turning them into handwriting or vocabulary ownership.

**Blast radius:** CURRICULUM dependency metadata only.

#### B1L15-DEP-AUDIT-003 — dialogue prerequisite traceability was incomplete

The ledger correctly stated that all 25 dialogue turns are new source-integration utterances, but several turn-specific bullets omitted NEW / EXPANSION dependencies actually present in the source turns.

Examples included:

- D2T01: 臉色 / 難看 / 怎麼了;
- D2T02: 肚子 / 吐;
- D2T07: 看病;
- D2T09: 自己 plus 多 + V health advice;
- D2T12: 包 / 睡;
- D2T13: 睡 / 小時.

**Repair:** the ledger now states a dialogue dependency invariant: every literal turn inherits every NEW / EXPANSION formal lexical, support, grammar/pragmatic, and hidden-name/orthography dependency it contains. The non-obvious D1/D2 turn edges were then made explicit.

**Blast radius:** LOCAL dependency-graph traceability.

#### B1L15-DEP-AUDIT-004 — X033 allowed an unsafe deferral destination

B1L15-X033 臺南 was correctly DEFERRED as non-canonical vocabulary, but the builder allowed a “known-place substitution.”

That is unsafe for this source record because B1L15-A001 explicitly requires preservation of the source comparison table and its `怎麼去臺南玩` task family. Replacing 臺南 would silently alter required source content.

**Repair:** 臺南 remains DEFERRED from productive vocabulary ownership, but must be preserved as contextual/glossed source content. Substitution is no longer permitted for A001.

**Blast radius:** CURRICULUM source-preservation metadata only.

### MINOR

#### B1L15-DEP-AUDIT-005 — hidden-name and character-reading precision

Two precision issues did not change the underlying classifications:

1. 玉 was grouped with deferred proper-name glyphs under X001/X025/X032 even though its actual Lesson-15 path is the source name 如玉 and the A005 context rather than one of those exact support records.
2. Character-level KNOWN status could obscure new lexical readings, especially:
   - 差 in B1L15-V008;
   - 覺 in 睡覺, whose `jiào` reading differs from prior 覺得 `juéde`.

**Repair:** 玉 now has an explicit deferred source-name rule, and the character section states that KNOWN glyph status does not imply known Lesson-15 lexical sense or pronunciation.

**Blast radius:** LOCAL dependency-ledger precision.

## Independent classification re-audit

### Formal vocabulary

The cumulative production registry through Unit 44 has exact prior formal lexical ownership for only:

- **B1L15-V026 幾** — prior “how many” → Lesson 15 **EXPANSION** to “a few / several” and indefinite/non-specific uses;
- **B1L15-V032 跟** — prior companionship “with” → Lesson 15 **EXPANSION** to addressee/recipient “to.”

All other Lesson-15 formal lexical entries lack prior Book-1 ownership in the required sense.

Final formal lexical result:

- **NEW: 42**
- **EXPANSION: 2**
- **KNOWN: 0**
- **REVIEW: 0**
- **DEFERRED: 0**
- **Total: 44 / 44**

`一直` is not prior knowledge: its current exact registry ownership is later in Book-2 Unit 1. Lesson 15 therefore correctly owns B1L15-V002 as NEW, with the later Book-2 ownership required to migrate to review before release.

### Formal characters

The cumulative Book-1 production character state through Unit 44 reproduces the ledger exactly:

- **NEW: 30**
- **KNOWN: 33**
- **Total: 63 / 63**

B1L15-CH004 直 is NEW at the Unit-44 baseline even though it is currently first-owned later in Book-2 Unit 1. That later ownership must migrate after Lesson 15 becomes the earlier source owner.

Character familiarity was not treated as lexical ownership.

### Hidden non-formal characters

A literal Han-character scan of the validated source against the formal 63-character set and the actual Book-1 character state leaves exactly:

**白、妳、玉、您、安、烏、龍、北、紐、約、田、李、陳、王、診、份、拒、絕**

All are now accounted for as NEW support or explicit contextual/deferred handling.

No unrecorded hidden glyph remains.

### KNOWN / REVIEW support

Every KNOWN / REVIEW claim was checked against prior production evidence.

Confirmed prior bases include:

- Unit 10 好不好 agreement;
- Unit 14 不能 + V;
- Unit 16 有一點 + state, performance 得, object-repeat 得, 自己;
- Unit 27 應該;
- Unit 28 separable-verb duration;
- Unit 36 Event/Time + 以後;
- Unit 38 一…就…;
- Unit 39 completed-action 了, quantity 一點, and 不 vs 沒（有）;
- Unit 40 question-word totality and 多／少 + V;
- Unit 41 是不是;
- Unit 43 duration-to-now;
- exact prior transport / rent / condition / reaction vocabulary where the ledger marks REVIEW or KNOWN.

No false KNOWN or false REVIEW classification remains.

### EXPANSION boundaries

The audit confirms the Lesson-15 extensions are not falsely flattened into prior knowledge:

- G001: negative non-committal question-word declaratives are distinct from Unit-40 都/也 totality;
- G003: V了…就… is distinct from Lesson-13 一…就… and preserves the source 以後 contrast;
- G004: Vs + 一點 is distinct from 有（一）點 + Vs;
- G005: action comparison with 得 combines previously separate systems;
- G006: 一點 / 得多 / 多了 comparison complements are new extensions;
- G007: the category and new insertion behavior extend beyond Unit-28 duration insertion;
- modal 得 `děi` remains NEW support and is not confused with complement 得 `de`.

### Prescription task

B1L15-A003 now has a complete safe path through:

- B1L15-V014 藥;
- B1L15-V027 次;
- B1L15-V037 包;
- B1L15-X037 一日4次 / 3日份;
- B1L15-X038 飯前 / 飯後;
- B1L15-X039 分鐘 / 飯後30分鐘;
- B1L15-X036 健康診所 as non-assessed/deferred visual support.

The source's 12-packet inference remains arithmetic `4 × 3`, not a new Chinese lexical target.

### Deferrals

All **9 DEFERRED** support records have explicit destinations.

The re-audit specifically confirms that:

- source-only names / orthography do not become hidden handwriting, Search, Mega, or vocabulary obligations;
- source examples with untaught names/glyphs can be glossed or safely adapted where the source does not require exact preservation;
- **臺南 is preserved**, not substituted, in A001 because the source requires that table;
- the prescription header can remain non-assessed;
- culture support stays source-era English comprehension and does not create Chinese lexical ownership.

No deferral silently removes a required Lesson-15 function or activity.

### Future dependencies / duplicate ownership

- No prerequisite edge points to Book 2 or any unpublished future Book-1 unit.
- Book-2 material is never counted as learner knowledge.
- The only later ownership collision is `一直 / 直`, and the ledger records the required migration to Lesson-15 first ownership before release.
- No other formal Lesson-15 NEW vocabulary or character collides with the current registry.

### Circularity

The repaired Lesson-15 graph is acyclic:

- G006 depends on G004, not vice versa;
- G007 depends on lexical availability where new forms are split;
- activities depend on teaching/support nodes and never feed back into those nodes;
- no target depends on a downstream activity, outcome, or future unit.

## Final findings after repair and re-audit

- **BLOCKER: 0 open**
- **MAJOR: 0 open**
- **MINOR: 0 open**

# Result: PASS

The mandatory Lesson-15 dependency gate passes.

The repository may advance only to **curriculum-architecture readiness**. No Lesson-15 unit boundaries, rough split, refined split, final blueprint, learner-facing activities, implementation, merge, or publication were created during this audit.
