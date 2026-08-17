ALTER TABLE "fleetInvite" RENAME TO "inviteFleet";--> statement-breakpoint
ALTER TABLE "inviteFleet" DROP CONSTRAINT "fleetInvite_fleet_id_fleet_id_fk";
--> statement-breakpoint
ALTER TABLE "inviteFleet" DROP CONSTRAINT "fleetInvite_invited_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "inviteFleet" ADD CONSTRAINT "inviteFleet_fleet_id_fleet_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inviteFleet" ADD CONSTRAINT "inviteFleet_invited_user_id_users_id_fk" FOREIGN KEY ("invited_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;