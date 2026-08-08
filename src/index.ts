import { logger } from "@/core/logger.js";

async function bootstrap() {
  logger.info("Starting NEXTGEN bot...");
  // Initialize config, db, discord client, webhooks etc. here
}

bootstrap().catch((err) => {
  console.error("Failed to start bot:", err);
  process.exit(1);
});
