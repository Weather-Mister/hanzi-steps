import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateBook1CompletionState } from "../automation/book1/validate-state.mjs";

async function readJson(path) {
  return JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
}

const state = await readJson("../course/book1/completion.json");
const manifest = await readJson("../course/manifest.json");

test("Book 1 completion controller state is internally valid", () => {
  const errors = validateBook1CompletionState(state, manifest);
  assert.deepEqual(errors, []);
});

test("controller rejects skipping source gate before dependency gate", () => {
  const mutated = structuredClone(state);
  mutated.gates.source = "pending";
  mutated.gates.dependencies = "pass";
  const errors = validateBook1CompletionState(mutated, manifest);
  assert.ok(errors.some((error) => error.includes("dependency gate cannot pass before source gate")));
});

test("controller rejects false Book 1 completion", () => {
  const mutated = structuredClone(state);
  mutated.completedThroughSourceLesson = Math.max(0, state.sourceLessonsTotal - 1);
  mutated.bookComplete = true;
  mutated.currentSourceLesson = null;
  mutated.currentStage = "complete";
  const errors = validateBook1CompletionState(mutated, manifest);
  assert.ok(errors.some((error) => error.includes("all source lessons")));
});

test("controller rejects overlapping working unit range", () => {
  const mutated = structuredClone(state);
  mutated.workingUnitRange = { start: 41, end: 45 };
  const errors = validateBook1CompletionState(mutated, manifest);
  assert.ok(errors.some((error) => error.includes("workingUnitRange")));
});

test("controller requires explicit human-review stage", () => {
  const mutated = structuredClone(state);
  mutated.humanReviewRequired = true;
  const errors = validateBook1CompletionState(mutated, manifest);
  assert.ok(errors.some((error) => error.includes("humanReviewRequired")));
});
