CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"phone" text NOT NULL,
	"price" numeric NOT NULL,
	"contract_type" text NOT NULL,
	"condo_fee" numeric,
	"address" text NOT NULL,
	"city" text,
	"state" text,
	"zip_code" text,
	"lat" numeric NOT NULL,
	"lng" numeric NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
