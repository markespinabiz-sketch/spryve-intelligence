import test from "node:test";
import assert from "node:assert/strict";
import {
  persistenceFailureMessage,
  shouldUseLocalPersistenceFallback,
} from "./persistencePolicy.ts";

test("canonical Platform workspaces never silently fall back to local persistence", () => {
  assert.equal(shouldUseLocalPersistenceFallback("platform"), false);
});

test("legacy standalone compatibility may still use local persistence", () => {
  assert.equal(shouldUseLocalPersistenceFallback("legacy-local"), true);
});

test("persistence failures tell operators the write was not persisted", () => {
  assert.match(persistenceFailureMessage("Media buyer report"), /could not be saved/);
  assert.match(persistenceFailureMessage("Media buyer report"), /Nothing was marked as persisted/);
});
