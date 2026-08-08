import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/config/env.js";
import { logger } from "@/core/logger.js";
import * as schema from "@/db/schema/index.js";

// Disable prefetch as it is not supported for "Transaction" pool mode
const queryClient = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(queryClient, { schema, logger: env.NODE_ENV === "development" });

export async function connectDatabase() {
  try {
    // Just a simple query to verify the connection
    await queryClient`SELECT 1`;
    logger.info("✅ Connected to PostgreSQL");
  } catch (error) {
    logger.fatal({ err: error }, "❌ Failed to connect to PostgreSQL");
    process.exit(1);
  }
}
