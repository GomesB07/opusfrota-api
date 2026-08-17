ALTER TABLE "fleetInvite" RENAME COLUMN "invite_user_id" TO "invited_user_id";--> statement-breakpoint
ALTER TABLE "fleetInvite" DROP CONSTRAINT "fleetInvite_invite_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "fleetInvite" ADD CONSTRAINT "fleetInvite_invited_user_id_users_id_fk" FOREIGN KEY ("invited_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;