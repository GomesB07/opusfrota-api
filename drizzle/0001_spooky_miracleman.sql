CREATE TYPE "public"."user_role" AS ENUM('owner', 'collaborator');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'collaborator' NOT NULL;