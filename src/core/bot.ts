import { Client, GatewayIntentBits } from "discord.js";
import { env } from "@/config/env.js";
import { logger } from "@/core/logger.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", (c) => {
  logger.info(`🤖 Bot is online! Logged in as ${c.user.tag}`);
});

export async function startBot() {
  try {
    await client.login(env.DISCORD_TOKEN);
  } catch (error) {
    logger.fatal({ err: error }, "❌ Failed to start Discord bot");
    process.exit(1);
  }
}
