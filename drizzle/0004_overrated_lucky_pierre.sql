CREATE TYPE "public"."invite_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "fleetInvite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fleet_id" uuid NOT NULL,
	"invite_user_id" uuid NOT NULL,
	"status" "invite_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "fleetInvite" ADD CONSTRAINT "fleetInvite_fleet_id_fleet_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleetInvite" ADD CONSTRAINT "fleetInvite_invite_user_id_users_id_fk" FOREIGN KEY ("invite_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;