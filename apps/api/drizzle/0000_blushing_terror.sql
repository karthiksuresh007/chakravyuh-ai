CREATE TABLE "actors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	"country_code" varchar(2),
	"description" text,
	"logo_url" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conflict_actors" (
	"conflict_id" uuid NOT NULL,
	"actor_id" uuid NOT NULL,
	"role" varchar(100) NOT NULL,
	"stated_objectives" text,
	"involvement_start" date,
	"involvement_end" date,
	CONSTRAINT "conflict_actors_conflict_id_actor_id_pk" PRIMARY KEY("conflict_id","actor_id")
);
--> statement-breakpoint
CREATE TABLE "conflicts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"status" varchar(50) NOT NULL,
	"intensity" varchar(50) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"region" varchar(100) NOT NULL,
	"sub_region" varchar(100),
	"lat" numeric(9, 6) NOT NULL,
	"lng" numeric(9, 6) NOT NULL,
	"risk_score" numeric(3, 1),
	"overview_text" text,
	"background_text" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "conflicts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "economic_impact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conflict_id" uuid NOT NULL,
	"metric_name" varchar(255) NOT NULL,
	"metric_value" numeric(20, 4),
	"metric_unit" varchar(100),
	"as_of_date" date NOT NULL,
	"source" varchar(500),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "humanitarian_impact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conflict_id" uuid NOT NULL,
	"total_deaths" integer,
	"civilian_deaths" integer,
	"combatant_deaths" integer,
	"idp_count" integer,
	"refugee_count" integer,
	"as_of_date" date NOT NULL,
	"source" varchar(500),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "timeline_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conflict_id" uuid NOT NULL,
	"event_date" date NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(50) NOT NULL,
	"significance" varchar(50) NOT NULL,
	"sources" jsonb,
	"media_url" varchar(1000),
	"media_type" varchar(50),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "conflict_actors" ADD CONSTRAINT "conflict_actors_conflict_id_conflicts_id_fk" FOREIGN KEY ("conflict_id") REFERENCES "public"."conflicts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conflict_actors" ADD CONSTRAINT "conflict_actors_actor_id_actors_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "economic_impact" ADD CONSTRAINT "economic_impact_conflict_id_conflicts_id_fk" FOREIGN KEY ("conflict_id") REFERENCES "public"."conflicts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "humanitarian_impact" ADD CONSTRAINT "humanitarian_impact_conflict_id_conflicts_id_fk" FOREIGN KEY ("conflict_id") REFERENCES "public"."conflicts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_conflict_id_conflicts_id_fk" FOREIGN KEY ("conflict_id") REFERENCES "public"."conflicts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_conflicts_status" ON "conflicts" USING btree ("status","intensity");--> statement-breakpoint
CREATE INDEX "idx_conflicts_region" ON "conflicts" USING btree ("region");--> statement-breakpoint
CREATE INDEX "idx_economic_impact_conflict" ON "economic_impact" USING btree ("conflict_id","metric_name");--> statement-breakpoint
CREATE INDEX "idx_timeline_events_conflict" ON "timeline_events" USING btree ("conflict_id","event_date");