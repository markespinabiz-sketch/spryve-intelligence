export type PersistenceMode = "platform" | "legacy-local";

/**
 * Intelligence must not silently turn a failed database write into a successful
 * local-only write once a canonical Platform workspace is active. Local state
 * remains available only for the explicit standalone compatibility path.
 */
export function shouldUseLocalPersistenceFallback(mode: PersistenceMode) {
  return mode === "legacy-local";
}

export function persistenceFailureMessage(operation: string) {
  return `${operation} could not be saved. Nothing was marked as persisted; retry when the workspace connection is healthy.`;
}
