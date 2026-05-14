import { useEffect, useState } from "react";

type DiagnosticsResponse = {
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
  overallStatus: "ok" | "warn" | "error";
};

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function SetupChecklist() {
  const [data, setData] = useState<DiagnosticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnostics", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as DiagnosticsResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load diagnostics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const steps = [
    {
      key: "env",
      label: "Environment variables",
      ok: !!data?.env.POSTGRES_URL && !!data?.env.BETTER_AUTH_SECRET && !!data?.env.GOOGLE_CLIENT_ID && !!data?.env.GOOGLE_CLIENT_SECRET,
      detail: "Requires POSTGRES_URL, BETTER_AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET",
    },
    {
      key: "db",
      label: "Database connected & schema",
      ok: !!data?.database.connected && !!data?.database.schemaApplied,
      detail: data?.database.error ? `Error: ${data.database.error}` : undefined,
    },
    {
      key: "auth",
      label: "Auth configured",
      ok: !!data?.auth.configured,
    },
    {
      key: "ai",
      label: "AI integration (optional)",
      ok: !!data?.ai.configured,
      detail: !data?.ai.configured ? "Set OPENROUTER_API_KEY for AI chat" : undefined,
    },
    {
      key: "storage",
      label: "File storage (optional)",
      ok: true,
      detail: data?.storage
        ? data.storage.type === "remote"
          ? "Using Vercel Blob storage"
          : "Using local storage (public/uploads/)"
        : undefined,
    },
  ] as const;

  const completed = steps.filter((s) => s.ok).length;

  return (
    <div className="p-6 border rounded-lg text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Setup checklist</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completed}/{steps.length} completed
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Re-check"}
        </button>
      </div>

      {error ? <div className="text-sm text-red-600 mb-3">{error}</div> : null}

      <ul className="space-y-2">
        {steps.map((s) => (
          <li key={s.key} className="flex items-start gap-2">
            <div className="mt-0.5 shrink-0">
              <StatusIcon ok={Boolean(s.ok)} />
            </div>
            <div>
              <div className="font-medium text-sm">{s.label}</div>
              {s.detail ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.detail}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {data ? (
        <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Last checked: {new Date(data.timestamp).toLocaleString()}
        </div>
      ) : null}
    </div>
  );
}
