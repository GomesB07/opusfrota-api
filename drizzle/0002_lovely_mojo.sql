ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_fleet_id_fleet_id_fk";
--> statement-breakpoint
ALTER TABLE "fleet" DROP CONSTRAINT "fleet_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "fleet_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fleet" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fleet_id_fleet_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet" ADD CONSTRAINT "fleet_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;