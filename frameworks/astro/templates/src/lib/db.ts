import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.POSTGRES_URL || "postgresql://localhost:5432/postgres";

const client = postgres(connectionString);

export const db = drizzle(client);