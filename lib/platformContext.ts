export type IntelligenceRole = "owner" | "admin" | "media_buyer" | "designer" | "viewer";

export type PlatformIntelligenceContext = {
  userId: string;
  workspaceId: string;
  organizationId?: string | null;
  role: IntelligenceRole;
  intelligenceEnabled: boolean;
  billing?: {
    status: "active" | "trial" | "past_due" | "blocked" | "unknown";
    source: "platform" | "legacy";
  };
  integrations?: Record<string, "connected" | "disconnected" | "unknown">;
  source: "platform" | "legacy";
};

export type LegacyIntelligenceContext = {
  userId: string;
  workspaceId: string;
  role?: IntelligenceRole;
};

/**
 * Intelligence consumes identity/workspace/entitlement decisions from Platform.
 * The standalone legacy context is accepted only as a compatibility fallback while
 * Platform integration is being rolled out; it must not become a second source of truth.
 */
export function resolveIntelligenceContext(
  platform: PlatformIntelligenceContext | null | undefined,
  legacy: LegacyIntelligenceContext,
): PlatformIntelligenceContext {
  if (platform) {
    if (!platform.userId || !platform.workspaceId) {
      throw new Error("Invalid Platform Intelligence context");
    }
    return { ...platform, source: "platform" };
  }

  if (!legacy.userId || !legacy.workspaceId) {
    throw new Error("Intelligence requires a user and workspace context");
  }

  return {
    userId: legacy.userId,
    workspaceId: legacy.workspaceId,
    role: legacy.role ?? "viewer",
    intelligenceEnabled: true,
    billing: { status: "unknown", source: "legacy" },
    integrations: {},
    source: "legacy",
  };
}

export function assertIntelligenceEntitled(context: PlatformIntelligenceContext) {
  if (!context.intelligenceEnabled) {
    throw new Error("Spryve Intelligence is not enabled for this workspace");
  }
}
