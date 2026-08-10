ALTER TABLE "github_pull_requests" ADD COLUMN "head_sha" text;--> statement-breakpoint
ALTER TABLE "github_pull_requests" ADD COLUMN "merge_commit_sha" text;