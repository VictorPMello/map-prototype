"use client";

import { useQuery } from "@tanstack/react-query";
import MapComponent from "./MapComponent";
import PropertyForm from "./PropertyForm";
import { Property } from "@/lib/types";
import { fetchProperties } from "@/service/fetchProperties.service";
import { useState } from "react";

export default function ClientHome({
  initialData,
}: {
  initialData: Property[];
}) {
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const { data = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    initialData,
    initialDataUpdatedAt: 0,
    staleTime: 30 * 1000,
  });

  // DOTO: Filter by neighborhood (ADD neighborhood at db), proximity, contract_type

  const filteredData = data.filter((item) => {
    if (!maxPrice) return true;
    return Number(item.price) <= maxPrice;
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <div className="fixed top-20 left-5 z-999 flex flex-col gap-2 px-4 py-2 bg-black text-white rounded-xl">
          <button onClick={() => setMaxPrice(200000)}>Até 200k</button>
          <button onClick={() => setMaxPrice(500000)}>Até 500k</button>

          <button onClick={() => setMaxPrice(null)}>Limpar filtro</button>
        </div>
        <MapComponent properties={filteredData} />
        <PropertyForm />
      </main>
    </div>
  );
}
