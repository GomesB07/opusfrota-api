CREATE TYPE "public"."vehicle_status" AS ENUM('active', 'disabled', 'maintenance');--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"plate" varchar(10) NOT NULL,
	"color" varchar(7),
	"status" "vehicle_status" DEFAULT 'active',
	"owner_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "vehicles_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;