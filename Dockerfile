FROM node:26-alpine AS builder

# Prevent pnpm from trying interactive prompts (no TTY in Docker build)
ENV CI=true

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files and install all dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and config files
COPY . .

# Build the project
RUN pnpm build

# Migrator - has full devDependencies (drizzle-kit) + built code + drizzle config
# Not deployed as the running service; run explicitly as a one-off task
FROM builder AS migrator

CMD ["pnpm", "db:migrate"]

# Production
FROM node:26-alpine AS runner

ENV CI=true

RUN npm install -g pnpm

WORKDIR /app

# Install only production dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built code from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
