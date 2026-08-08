## Pull Request Checklist

Before submitting your PR, please review the following checklist:

- [ ] **Title Convention**: My PR title follows the [Conventional Commits](https://www.conventionalcommits.org/) format (e.g., `feat(github): add PR webhook handler`).
- [ ] **Testing**: I have tested my changes locally (e.g., tested slash commands in a dev server, verified webhooks).
- [ ] **Linting & Types**: I have run `pnpm check` and `pnpm typecheck` and fixed any errors.
- [ ] **Database Migrations**: If I modified Drizzle schemas, I ran `pnpm db:generate` and included the migration SQL files in this PR.
- [ ] **Documentation**: I have updated the documentation (e.g., `README.md`, command help strings) if necessary.

## Description

Please include a summary of the changes, including any new Discord commands, database tables, API routes, or BullMQ background jobs introduced. 

Fixes # (issue)

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (e.g., changing slash command arguments or database schema)
- [ ] Infrastructure/Tooling change (e.g., Docker, TypeScript config)

## Screenshots & Embeds (if applicable)

If this PR includes changes to Discord embeds, messages, or UI components, please provide screenshots of how the bot looks in Discord.
