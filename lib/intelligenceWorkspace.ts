import {
  assertIntelligenceEntitled,
  resolveIntelligenceContext,
  type LegacyIntelligenceContext,
  type PlatformIntelligenceContext,
} from "@/lib/platformContext";
import {
  createMediaBuyerReport,
  createWorkspaceTask,
  loadWorkspaceProducts,
  loadWorkspaceReports,
  loadWorkspaceTasks,
} from "@/lib/workspaceData";

/**
 * Intelligence-owned adapter for persisted workspace workflows.
 * Platform remains authoritative for identity, workspace and entitlement decisions.
 */
export function createIntelligenceWorkspace(
  platform: PlatformIntelligenceContext | null | undefined,
  legacy: LegacyIntelligenceContext,
) {
  const context = resolveIntelligenceContext(platform, legacy);
  assertIntelligenceEntitled(context);

  return {
    context,
    loadProducts: () => loadWorkspaceProducts(context.workspaceId),
    loadReports: () => loadWorkspaceReports(context.workspaceId),
    loadTasks: () => loadWorkspaceTasks(context.workspaceId),
    createMediaBuyerReport: (input: { productName: string; reportData: unknown }) =>
      createMediaBuyerReport({
        workspaceId: context.workspaceId,
        productName: input.productName,
        reportData: input.reportData,
        userId: context.userId,
      }),
    createTask: (input: {
      productId?: string | null;
      title: string;
      role: string;
      assigneeId?: string | null;
      assignedToName?: string;
      priority: string;
      status: string;
      taskData?: unknown;
    }) =>
      createWorkspaceTask({
        ...input,
        workspaceId: context.workspaceId,
        userId: context.userId,
      }),
  };
}
