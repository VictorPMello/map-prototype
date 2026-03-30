"use client";

import { Property } from "@/lib/types";
import { useEffect, useRef } from "react";

import { mapStyles } from "@/lib/mapStyles";

export default function MapComponent({
  properties,
}: {
  properties: Property[];
}) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // cria o mapa (uma vez)
  const handleRef = (node: HTMLDivElement | null) => {
    if (!node || mapRef.current) return;

    mapRef.current = new google.maps.Map(node, {
      center: { lat: -12.2664, lng: -38.9663 },
      zoom: 14,
      styles: mapStyles,

      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      disableDefaultUI: true,
    });

    infoWindowRef.current = new google.maps.InfoWindow();
  };

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // limpa markers antigos
    markersRef.current.forEach((m) => m.setMap(null));

    markersRef.current = properties.map((item) => {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(item.lat),
          lng: Number(item.lng),
        },
        map: mapRef.current!,
      });

      marker.addListener("click", () => {
        if (!infoWindowRef.current || !mapRef.current) return;

        const images = [
          "https://images.unsplash.com/photo-1723110994499-df46435aa4b3?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1634344656611-0773d8dbbe2c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ];

        const imgId = `img-${item.id ?? Date.now()}`;

        // HTML do InfoWindow (sem JS dentro)
        infoWindowRef.current.setContent(`
          <div style="width:240px;font-family:sans-serif;">
            
            <div style="position:relative;">
              <img 
                id="${imgId}" 
                src="${images[0]}" 
                data-index="0"
                style="width:100%;height:140px;object-fit:cover;border-radius:8px;"
              />

              <button id="prev-${imgId}"
                style="position:absolute;left:5px;top:50%;transform:translateY(-50%);
                background:white;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;">
                ‹
              </button>

              <button id="next-${imgId}"
                style="position:absolute;right:5px;top:50%;transform:translateY(-50%);
                background:white;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;">
                ›
              </button>
            </div>

            <div style="padding:8px 4px;">
              <strong>${item.title ?? "Imóvel"} ${item.type}</strong><br/>
              <strong>${item.phone}</strong><br/>
              💰 R$ ${item.price ?? "N/A"}
            </div>
          </div>
        `);

        // abre o InfoWindow
        infoWindowRef.current.open({
          anchor: marker,
          map: mapRef.current,
        });

        // adiciona eventos do carrossel (DEPOIS que renderiza)
        google.maps.event.addListenerOnce(
          infoWindowRef.current,
          "domready",
          () => {
            const img = document.getElementById(imgId) as HTMLImageElement;
            const prev = document.getElementById(`prev-${imgId}`);
            const next = document.getElementById(`next-${imgId}`);

            if (!img || !prev || !next) return;

            prev.onclick = () => {
              let index = Number(img.dataset.index);
              index = (index - 1 + images.length) % images.length;

              img.src = images[index];
              img.dataset.index = String(index);
            };

            next.onclick = () => {
              let index = Number(img.dataset.index);
              index = (index + 1) % images.length;

              img.src = images[index];
              img.dataset.index = String(index);
            };
          },
        );
      });

      return marker;
    });
  }, [properties]);

  return <div ref={handleRef} className="w-screen h-screen" />;
}
