import test from "node:test";
import assert from "node:assert/strict";
import {
  assertIntelligenceEntitled,
  resolveIntelligenceContext,
  type LegacyIntelligenceContext,
  type PlatformIntelligenceContext,
} from "./platformContext.ts";

const legacy: LegacyIntelligenceContext = {
  userId: "legacy-user",
  workspaceId: "legacy-workspace",
  role: "viewer",
};

const platform: PlatformIntelligenceContext = {
  userId: "platform-user",
  workspaceId: "platform-workspace",
  organizationId: "platform-org",
  role: "owner",
  intelligenceEnabled: true,
  billing: { status: "active", source: "platform" },
  integrations: { adpulse: "connected" },
  source: "platform",
};

test("canonical Platform context wins over legacy fallback", () => {
  const resolved = resolveIntelligenceContext(platform, legacy);
  assert.equal(resolved.source, "platform");
  assert.equal(resolved.userId, "platform-user");
  assert.equal(resolved.workspaceId, "platform-workspace");
  assert.equal(resolved.organizationId, "platform-org");
});

test("legacy context is compatibility fallback only when Platform context is absent", () => {
  const resolved = resolveIntelligenceContext(null, legacy);
  assert.deepEqual(resolved, {
    userId: "legacy-user",
    workspaceId: "legacy-workspace",
    role: "viewer",
    intelligenceEnabled: true,
    billing: { status: "unknown", source: "legacy" },
    integrations: {},
    source: "legacy",
  });
});

test("invalid Platform context fails instead of silently falling back", () => {
  assert.throws(
    () => resolveIntelligenceContext({ ...platform, workspaceId: "" }, legacy),
    /Invalid Platform Intelligence context/,
  );
});

test("disabled Intelligence entitlement fails closed", () => {
  assert.throws(
    () => assertIntelligenceEntitled({ ...platform, intelligenceEnabled: false }),
    /not enabled for this workspace/,
  );
});
