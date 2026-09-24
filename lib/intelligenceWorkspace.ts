import {
  assertIntelligenceEntitled,
  resolveIntelligenceContext,
  type LegacyIntelligenceContext,
  type PlatformIntelligenceContext,
} from "@/lib/platformContext";
import {
  scopedReportInput,
  scopedTaskInput,
  workspaceIdFor,
} from "@/lib/intelligenceWorkspaceScope";
import { persistenceFailureMessage } from "@/lib/persistencePolicy";
import {
  createMediaBuyerReport,
  createWorkspaceTask,
  loadWorkspaceProducts,
  loadWorkspaceReports,
  loadWorkspaceTasks,
} from "@/lib/workspaceData";

async function persistOrFailClosed<T>(
  context: PlatformIntelligenceContext,
  operation: string,
  write: () => Promise<T>,
) {
  try {
    return await write();
  } catch (error) {
    if (context.source === "platform") {
      throw new Error(persistenceFailureMessage(operation), { cause: error });
    }
    throw error;
  }
}

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
    loadProducts: () => loadWorkspaceProducts(workspaceIdFor(context)),
    loadReports: () => loadWorkspaceReports(workspaceIdFor(context)),
    loadTasks: () => loadWorkspaceTasks(workspaceIdFor(context)),
    createMediaBuyerReport: (input: { productName: string; reportData: unknown }) =>
      persistOrFailClosed(context, "Media buyer report", () =>
        createMediaBuyerReport(scopedReportInput(context, input)),
      ),
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
      persistOrFailClosed(context, "Workspace task", () =>
        createWorkspaceTask(scopedTaskInput(context, input)),
      ),
  };
}
