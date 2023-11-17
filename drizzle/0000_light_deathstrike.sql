CREATE TABLE IF NOT EXISTS "ingredents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"recipe_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"duration" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredents" ADD CONSTRAINT "ingredents_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
