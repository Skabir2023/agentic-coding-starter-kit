import { createAuthClient } from "better-auth/react";

export function createAuthClient() {
  return createAuthClient({
    baseURL: import.meta.env.PUBLIC_APP_URL || "http://localhost:4321",
  });
}