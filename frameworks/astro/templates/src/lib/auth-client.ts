import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export function createAuthClient() {
  return createBetterAuthClient({
    baseURL: import.meta.env.PUBLIC_APP_URL || "http://localhost:4321",
  });
}