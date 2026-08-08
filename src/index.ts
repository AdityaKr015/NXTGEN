import { startBot } from "@/core/bot.js";
import { connectDatabase } from "@/core/database.js";
import { logger } from "@/core/logger.js";
import { connectRedis } from "@/core/redis.js";
import { startServer } from "@/core/server.js";

async function bootstrap() {
  logger.info("🚀 Starting NxtGen bot...");

  // Connect to infrastructure
  await connectDatabase();
  await connectRedis();

  // Start Hono Webhook Server
  startServer();

  // Start Discord Bot
  await startBot();

  // NOTE: In the future, BullMQ workers and Discord slash command
  // registration will be initialized here as well.
}

bootstrap().catch((err) => {
  logger.fatal({ err }, "❌ Unhandled error during bootstrap");
  process.exit(1);
});
