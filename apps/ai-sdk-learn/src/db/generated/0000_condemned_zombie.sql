CREATE TABLE "va_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "va_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "va_content_resource" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"fields" jsonb DEFAULT '{}'::jsonb,
	"current_version_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "va_content_resource_resource" (
	"resource_of_id" varchar(255) NOT NULL,
	"resource_id" varchar(255) NOT NULL,
	"position" double precision DEFAULT 0 NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "va_content_resource_resource_resource_of_id_resource_id_pk" PRIMARY KEY("resource_of_id","resource_id")
);
--> statement-breakpoint
CREATE TABLE "va_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "va_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "va_account" ADD CONSTRAINT "va_account_userId_va_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."va_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "va_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "type_idx" ON "va_content_resource" USING btree ("type");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "va_content_resource" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "current_version_id_idx" ON "va_content_resource" USING btree ("current_version_id");--> statement-breakpoint
CREATE INDEX "content_resource_id_idx" ON "va_content_resource_resource" USING btree ("resource_of_id");--> statement-breakpoint
CREATE INDEX "resource_id_idx" ON "va_content_resource_resource" USING btree ("resource_id");