import type { APIRoute } from "astro";

type StatusLevel = "ok" | "warn" | "error";

interface DiagnosticsResponse {
  timestamp: string;
  env: {
    POSTGRES_URL: boolean;
    BETTER_AUTH_SECRET: boolean;
    GOOGLE_CLIENT_ID: boolean;
    GOOGLE_CLIENT_SECRET: boolean;
    OPENROUTER_API_KEY: boolean;
  };
  database: {
    connected: boolean;
    schemaApplied: boolean;
    error?: string;
  };
  auth: {
    configured: boolean;
  };
  ai: {
    configured: boolean;
  };
  storage: {
    configured: boolean;
    type: "local" | "remote";
  };
  overallStatus: StatusLevel;
}

export const GET: APIRoute = async () => {
  const env = {
    POSTGRES_URL: Boolean(import.meta.env.POSTGRES_URL),
    BETTER_AUTH_SECRET: Boolean(import.meta.env.BETTER_AUTH_SECRET),
    GOOGLE_CLIENT_ID: Boolean(import.meta.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: Boolean(import.meta.env.GOOGLE_CLIENT_SECRET),
    OPENROUTER_API_KEY: Boolean(import.meta.env.OPENROUTER_API_KEY),
  };

  let dbConnected = false;
  let schemaApplied = false;
  let dbError: string | undefined;

  if (env.POSTGRES_URL) {
    try {
      const postgres = (await import("postgres")).default;
      const client = postgres(import.meta.env.POSTGRES_URL!);

      await client`SELECT 1 as ping`;
      dbConnected = true;

      try {
        await client`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user')`;
        schemaApplied = true;
      } catch {
        schemaApplied = false;
        dbError = "Schema not applied. Run: npm run db:migrate";
      }

      await client.end();
    } catch (e) {
      dbConnected = false;
      schemaApplied = false;
      dbError = "Database not connected. Please start your PostgreSQL database and verify your POSTGRES_URL in .env";
    }
  } else {
    dbError = "POSTGRES_URL is not set";
  }

  const authConfigured =
    env.BETTER_AUTH_SECRET && env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET;
  const aiConfigured = env.OPENROUTER_API_KEY;

  const storageConfigured = Boolean(import.meta.env.BLOB_READ_WRITE_TOKEN);
  const storageType: "local" | "remote" = storageConfigured ? "remote" : "local";

  const overallStatus: StatusLevel = (() => {
    if (!env.POSTGRES_URL || !dbConnected || !schemaApplied) return "error";
    if (!authConfigured) return "error";
    if (!aiConfigured) return "warn";
    return "ok";
  })();

  const body: DiagnosticsResponse = {
    timestamp: new Date().toISOString(),
    env,
    database: { connected: dbConnected, schemaApplied, ...(dbError && { error: dbError }) },
    auth: { configured: authConfigured },
    ai: { configured: aiConfigured },
    storage: { configured: storageConfigured, type: storageType },
    overallStatus,
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
