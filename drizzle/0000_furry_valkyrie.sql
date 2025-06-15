CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" varchar(32) NOT NULL,
	"provider_user_id" varchar(64) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(128),
	"avatar" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
