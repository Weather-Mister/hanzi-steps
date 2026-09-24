const STAGES = new Set([
  "preflight",
  "source-extraction",
  "source-audit",
  "dependencies",
  "curriculum-architecture",
  "gate-a",
  "activity-engineering",
  "gate-b",
  "implementation",
  "deterministic-qa",
  "learner-simulation",
  "traceability",
  "final-release-audit",
  "gate-c",
  "staging",
  "waiting-for-merge",
  "production-verification",
  "final-book-audit",
  "human-review",
  "complete"
]);

const STAGE_STATUSES = new Set(["pending", "in-progress", "blocked", "pass"]);
const GATE_STATUSES = new Set(["locked", "pending", "pass", "fail"]);

function isInteger(value) {
  return Number.isInteger(value);
}

export function validateBook1CompletionState(state, manifest) {
  const errors = [];

  if (!state || typeof state !== "object" || Array.isArray(state)) {
    return ["completion state must be a JSON object"];
  }

  if (state.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
  if (state.book !== 1) errors.push("book must equal 1");
  if (state.sourceLessonsTotal !== 15) errors.push("sourceLessonsTotal must equal 15 for Book 1");

  if (!isInteger(state.completedThroughSourceLesson) ||
      state.completedThroughSourceLesson < 0 ||
      state.completedThroughSourceLesson > state.sourceLessonsTotal) {
    errors.push("completedThroughSourceLesson must be an integer from 0 through sourceLessonsTotal");
  }

  if (!isInteger(state.completedThroughUnit) || state.completedThroughUnit < 0) {
    errors.push("completedThroughUnit must be a non-negative integer");
  }

  if (!STAGES.has(state.currentStage)) {
    errors.push(`unknown currentStage: ${String(state.currentStage)}`);
  }

  if (!STAGE_STATUSES.has(state.stageStatus)) {
    errors.push(`unknown stageStatus: ${String(state.stageStatus)}`);
  }

  if (typeof state.bookComplete !== "boolean") {
    errors.push("bookComplete must be boolean");
  }

  if (typeof state.humanReviewRequired !== "boolean") {
    errors.push("humanReviewRequired must be boolean");
  }

  if (!state.gates || typeof state.gates !== "object" || Array.isArray(state.gates)) {
    errors.push("gates must be an object");
  } else {
    for (const key of ["source", "dependencies", "curriculum", "activities", "implementation", "release"]) {
      if (!GATE_STATUSES.has(state.gates[key])) {
        errors.push(`gate ${key} has invalid status: ${String(state.gates[key])}`);
      }
    }
  }

  if (!Array.isArray(state.openFindings)) {
    errors.push("openFindings must be an array");
  } else {
    for (const [index, finding] of state.openFindings.entries()) {
      if (!finding || typeof finding !== "object" || Array.isArray(finding)) {
        errors.push(`openFindings[${index}] must be an object`);
        continue;
      }
      if (!["BLOCKER", "MAJOR", "MINOR"].includes(finding.severity)) {
        errors.push(`openFindings[${index}].severity must be BLOCKER, MAJOR, or MINOR`);
      }
      if (typeof finding.summary !== "string" || !finding.summary.trim()) {
        errors.push(`openFindings[${index}].summary must be a non-empty string`);
      }
    }
  }

  if (state.workingUnitRange !== null) {
    if (!state.workingUnitRange || typeof state.workingUnitRange !== "object") {
      errors.push("workingUnitRange must be null or an object");
    } else {
      const { start, end } = state.workingUnitRange;
      if (!isInteger(start) || !isInteger(end) || start <= state.completedThroughUnit || end < start) {
        errors.push("workingUnitRange must contain integer start/end after completedThroughUnit");
      }
    }
  }

  if (state.bookComplete) {
    if (state.completedThroughSourceLesson !== state.sourceLessonsTotal) {
      errors.push("bookComplete requires all source lessons to be complete");
    }
    if (state.currentSourceLesson !== null) {
      errors.push("bookComplete requires currentSourceLesson to be null");
    }
    if (state.currentStage !== "complete") {
      errors.push("bookComplete requires currentStage to be complete");
    }
    if (state.openFindings?.some((f) => f?.severity === "BLOCKER" || f?.severity === "MAJOR")) {
      errors.push("bookComplete cannot coexist with open BLOCKER or MAJOR findings");
    }
  } else {
    const expectedLesson = state.completedThroughSourceLesson + 1;
    if (state.currentSourceLesson !== expectedLesson) {
      errors.push(`currentSourceLesson must equal completedThroughSourceLesson + 1 (expected ${expectedLesson})`);
    }
    if (state.currentStage === "complete") {
      errors.push("currentStage cannot be complete while bookComplete is false");
    }
  }

  if (state.humanReviewRequired && state.currentStage !== "human-review") {
    errors.push("humanReviewRequired requires currentStage to be human-review");
  }

  const book1 = manifest?.books?.find((book) => book.number === 1);
  if (!book1) {
    errors.push("manifest does not contain Book 1");
  } else {
    const maxManifestUnit = Math.max(0, ...(book1.units || []).map((unit) => unit.order));
    if (maxManifestUnit < state.completedThroughUnit) {
      errors.push(
        `manifest only reaches Unit ${maxManifestUnit}, below completedThroughUnit ${state.completedThroughUnit}`
      );
    }

    if (state.workingUnitRange && maxManifestUnit > state.workingUnitRange.end) {
      errors.push(
        `manifest reaches Unit ${maxManifestUnit}, beyond workingUnitRange end ${state.workingUnitRange.end}`
      );
    }
  }

  if (state.gates) {
    if (state.gates.dependencies === "pass" && state.gates.source !== "pass") {
      errors.push("dependency gate cannot pass before source gate");
    }
    if (state.gates.curriculum === "pass" && state.gates.dependencies !== "pass") {
      errors.push("curriculum gate cannot pass before dependency gate");
    }
    if (state.gates.activities === "pass" && state.gates.curriculum !== "pass") {
      errors.push("activity gate cannot pass before curriculum gate");
    }
    if (state.gates.implementation === "pass" && state.gates.activities !== "pass") {
      errors.push("implementation gate cannot pass before activity gate");
    }
    if (state.gates.release === "pass" && state.gates.implementation !== "pass") {
      errors.push("release gate cannot pass before implementation gate");
    }
  }

  return errors;
}
