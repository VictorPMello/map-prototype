import { http } from "@/lib/http";
import { Property } from "@/lib/types";

export async function fetchProperties(): Promise<Property[]> {
  return http<Property[]>(`${process.env.NEXT_PUBLIC_APP_URL}/api/properties`);
}
