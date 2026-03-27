import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  phone: text("phone").notNull(),
  price: numeric("price").notNull(),

  contractType: text("contract_type", {
    enum: ["sale", "rent"],
  }).notNull(),

  condoFee: numeric("condo_fee"),

  address: text("address").notNull(),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),

  lat: numeric("lat").notNull(),
  lng: numeric("lng").notNull(),

  type: text("type", {
    enum: ["house", "apartment"],
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
