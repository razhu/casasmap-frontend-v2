/**
 * Generate a unique correlation ID for tracking requests
 */
export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get or create correlation ID for the current request
 * Stores in sessionStorage to maintain across requests in the same session
 */
export function getCorrelationId(): string {
  if (typeof window === "undefined") {
    // Server-side: generate new ID
    return generateCorrelationId();
  }

  // Client-side: try to get from sessionStorage
  const key = "x-correlation-id";
  let correlationId = sessionStorage.getItem(key);

  if (!correlationId) {
    correlationId = generateCorrelationId();
    sessionStorage.setItem(key, correlationId);
  }

  return correlationId;
}

/**
 * Clear correlation ID (useful for logout)
 */
export function clearCorrelationId(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("x-correlation-id");
  }
}
