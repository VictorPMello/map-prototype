import MapComponent from "@/components/MapComponent";
import PropertyForm from "@/components/PropertyForm";
import { getProperties } from "@/service/properties.service";

export default async function Home() {
  const initialData = await getProperties();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1  flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <MapComponent initialData={initialData} />
        <PropertyForm />
      </main>
    </div>
  );
}
