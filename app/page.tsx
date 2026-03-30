import ClientHome from "@/components/ClientHome";
import { getProperties } from "@/service/properties.service";

export default async function Home() {
  const initialData = await getProperties();

  return <ClientHome initialData={initialData} />;
}
