export type Property = {
  id: string;
  title: string;
  phone: string;
  price: string;

  contractType: "sale" | "rent";

  condoFee: string | null;

  address: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;

  lat: string;
  lng: string;

  type: "house" | "apartment";

  createdAt: Date;
  updatedAt: Date;
};
