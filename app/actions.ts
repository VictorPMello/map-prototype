"use server";

import { getLatLngFromAddress } from "@/lib/geocode";
import { createNewPropertyService } from "@/service/properties.service";

export async function createProperty(formData: FormData) {
  const address = formData.get("address") as string;

  const { lat, lng } = await getLatLngFromAddress(address);

  const data = {
    title: formData.get("title") as string,
    phone: formData.get("phone") as string,
    price: formData.get("price") as string,
    contractType: formData.get("contractType") as "sale" | "rent",
    condoFee: (formData.get("condoFee") as string) || null,
    city: (formData.get("city") as string) || null,
    state: (formData.get("state") as string) || null,
    zipCode: (formData.get("zipCode") as string) || null,
    type: formData.get("type") as "house" | "apartment",
  };

  await createNewPropertyService({ ...data, address, lng, lat });
}
