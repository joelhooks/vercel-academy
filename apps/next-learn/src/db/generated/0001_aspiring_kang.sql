CREATE TABLE "va_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "va_session" ADD CONSTRAINT "va_session_userId_va_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."va_user"("id") ON DELETE cascade ON UPDATE no action;