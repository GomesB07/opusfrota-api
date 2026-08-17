CREATE TYPE "public"."user_role" AS ENUM('owner', 'collaborator');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('active', 'disabled', 'maintenance');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "user_role",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"year" varchar NOT NULL,
	"plate" varchar(10) NOT NULL,
	"color" varchar(7),
	"status" "vehicle_status" DEFAULT 'active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "vehicles_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
CREATE TABLE "fleet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
