import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";

export async function getProperties() {
  return db.select().from(properties);
}
