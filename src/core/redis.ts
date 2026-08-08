import { Redis } from "ioredis";
import { env } from "@/config/env.js";
import { logger } from "@/core/logger.js";

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null, // Required by BullMQ
});

redis.on("error", (error: Error) => {
  logger.error({ err: error }, "❌ Redis connection error");
});

export async function connectRedis() {
  if (redis.status === "ready") {
    logger.info("✅ Connected to Redis");
    return;
  }

  return new Promise<void>((resolve) => {
    redis.once("ready", () => {
      logger.info("✅ Connected to Redis");
      resolve();
    });
  });
}
