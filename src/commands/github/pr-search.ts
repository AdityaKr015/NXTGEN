import { type ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/core/database.js";
import { githubPullRequests } from "@/features/github/schema.js";

export const data = new SlashCommandBuilder()
  .setName("pr-search")
  .setDescription("Search for GitHub Pull Requests")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("Search by title, author, or commit hash")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("state")
      .setDescription("Filter by PR state")
      .addChoices({ name: "Open", value: "open" }, { name: "Closed", value: "closed" }),
  );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const query = interaction.options.getString("query", true);
  const state = interaction.options.getString("state");

  let conditions = or(
    ilike(githubPullRequests.title, `%${query}%`),
    ilike(githubPullRequests.authorLogin, `%${query}%`),
    ilike(githubPullRequests.headSha, `%${query}%`),
    ilike(githubPullRequests.mergeCommitSha, `%${query}%`),
  );

  if (state) {
    conditions = and(conditions, eq(githubPullRequests.state, state));
  }

  try {
    const results = await db
      .select()
      .from(githubPullRequests)
      .where(conditions)
      .orderBy(desc(githubPullRequests.createdAt))
      .limit(5);

    if (results.length === 0) {
      await interaction.reply({
        content: `No pull requests found matching \`${query}\`.`,
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x58a6ff)
      .setTitle(`🔍 PR Search: "${query}"`)
      .setDescription(
        results
          .map((pr) => {
            let emoji = "❌";
            let stateText = "Closed";
            if (pr.state === "open") {
              emoji = "✅";
              stateText = "Open";
            } else if (pr.mergeCommitSha) {
              emoji = "🟪";
              stateText = "Merged";
            }

            return `${emoji} **[#${pr.prNumber} ${pr.title}](${pr.url})**\nBy \`${pr.authorLogin}\` in \`${pr.repoFullName}\` (${stateText})`;
          })
          .join("\n\n"),
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  } catch (_error) {
    await interaction.reply({
      content: "An error occurred while searching for pull requests.",
      ephemeral: true,
    });
  }
}
