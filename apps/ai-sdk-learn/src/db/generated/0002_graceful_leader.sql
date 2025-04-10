CREATE TABLE "va_resource_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"resource_id" varchar(255) NOT NULL,
	"is_complete" boolean DEFAULT false,
	"progress_percent" double precision DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "va_resource_progress" ADD CONSTRAINT "va_resource_progress_user_id_va_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."va_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "va_resource_progress" ADD CONSTRAINT "va_resource_progress_resource_id_va_content_resource_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."va_content_resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rp_user_id_idx" ON "va_resource_progress" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "rp_resource_id_idx" ON "va_resource_progress" USING btree ("resource_id");