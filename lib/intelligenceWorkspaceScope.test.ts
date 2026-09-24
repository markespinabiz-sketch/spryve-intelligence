import test from "node:test";
import assert from "node:assert/strict";
import type { PlatformIntelligenceContext } from "./platformContext.ts";
import {
  scopedReportInput,
  scopedTaskInput,
  workspaceIdFor,
} from "./intelligenceWorkspaceScope.ts";

const context: PlatformIntelligenceContext = {
  userId: "platform-user",
  workspaceId: "platform-workspace",
  organizationId: "platform-org",
  role: "owner",
  intelligenceEnabled: true,
  source: "platform",
};

test("workspace reads use the canonical Platform workspace", () => {
  assert.equal(workspaceIdFor(context), "platform-workspace");
});

test("persisted reports carry canonical workspace and user identity", () => {
  assert.deepEqual(
    scopedReportInput(context, { productName: "Product A", reportData: { roas: 3.2 } }),
    {
      workspaceId: "platform-workspace",
      productName: "Product A",
      reportData: { roas: 3.2 },
      userId: "platform-user",
    },
  );
});

test("persisted tasks cannot override canonical workspace or user identity", () => {
  const scoped = scopedTaskInput(context, {
    title: "Investigate CPA",
    role: "media_buyer",
    workspaceId: "foreign-workspace",
    userId: "foreign-user",
  });

  assert.equal(scoped.workspaceId, "platform-workspace");
  assert.equal(scoped.userId, "platform-user");
  assert.equal(scoped.title, "Investigate CPA");
});
