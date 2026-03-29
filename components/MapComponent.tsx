"use client";

import { Property } from "@/lib/types";
import { fetchProperties } from "@/service/fetchProperties.service";
import { useQuery } from "@tanstack/react-query";

export default function MapComponent({
  initialData,
}: {
  initialData: Property[];
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    initialData,
    initialDataUpdatedAt: 0,
    staleTime: 30 * 1000,
  });

  console.log(data, isLoading);
  return <div>Teste</div>;
}
