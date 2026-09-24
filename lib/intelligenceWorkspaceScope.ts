import type { PlatformIntelligenceContext } from "./platformContext.ts";

export function workspaceIdFor(context: PlatformIntelligenceContext) {
  return context.workspaceId;
}

export function scopedReportInput(
  context: PlatformIntelligenceContext,
  input: { productName: string; reportData: unknown },
) {
  return {
    workspaceId: context.workspaceId,
    productName: input.productName,
    reportData: input.reportData,
    userId: context.userId,
  };
}

export function scopedTaskInput<T extends Record<string, unknown>>(
  context: PlatformIntelligenceContext,
  input: T,
) {
  return {
    ...input,
    workspaceId: context.workspaceId,
    userId: context.userId,
  };
}
