import { getProperties } from "@/service/properties.service";

export async function GET() {
  const data = await getProperties();
  return Response.json(data);
}
