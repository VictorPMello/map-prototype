"use client";

import { Property } from "@/lib/types";
import { fetchProperties } from "@/service/fetchProperties.service";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export default function MapComponent({
  initialData,
}: {
  initialData: Property[];
}) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    initialData,
    initialDataUpdatedAt: 0,
    staleTime: 30 * 1000,
  });

  const handleMapLoad = (node: HTMLDivElement | null) => {
    console.log("node:", node);
    console.log("google:", window.google);
    if (!node || mapRef.current) return;

    const map = new google.maps.Map(node, {
      center: { lat: -12.2664, lng: -38.9663 },
      zoom: 13,
    });

    mapRef.current = map;

    data.forEach((item) => {
      new google.maps.Marker({
        position: {
          lat: Number(item.lat),
          lng: Number(item.lng),
        },
        map,
      });
    });
  };

  return <div ref={handleMapLoad} className="w-screen h-screen" />;
}
