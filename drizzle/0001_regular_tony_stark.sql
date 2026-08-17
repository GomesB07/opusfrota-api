ALTER TABLE "users" ADD COLUMN "fleet_id" uuid;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "fleet_id" uuid;--> statement-breakpoint
ALTER TABLE "fleet" ADD COLUMN "owner_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_fleet_id_fleet_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fleet_id_fleet_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleet"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet" ADD CONSTRAINT "fleet_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;