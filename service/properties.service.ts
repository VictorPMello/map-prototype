import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { FormProperty } from "@/lib/types";

export async function getProperties() {
  return db.select().from(properties);
}

export async function createNewPropertyService(data: FormProperty) {
  await db.insert(properties).values(data);
}
